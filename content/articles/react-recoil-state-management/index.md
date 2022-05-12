---
layout: engineering-education
status: publish
published: true
url: /react-recoil-state-management/
title: Getting Started with Recoil as a State Management Library for React Applications
description: In this article, we will look at how we can manage state in our React applications using Recoil.
author: anne-mwangi
date: 2021-12-06T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-recoil-state-management/hero.jpg
    alt: react recoil State Management React Applications image
---
Managing state in your web application is essential, as it helps ensure that data displayed across different pages is consistent. React by default provides the `useState()` hook that we can use to store and modify the application's state. 
<!--more-->
The disadvantage of this hook is that we have to pass the state from one component to another, and as the project becomes more extensive, passing too many props might become hectic.

State management libraries solve this problem by creating a global store where each component can access the data it needs. With a state management library, data flows from your app to the state and vice versa, and you can access the data from any component without passing it as props.

We will go through the steps to use Recoil to manage the state of our React web applications. We will then create a Todo application that allows the user to add tasks, mark them as complete, delete them, and filter between the completed and the uncompleted ones. 

#### Prerequisites
The following will be needed to follow along:
- Intermediate knowledge of [React](https://reactjs.org), a JavaScript library for building user interfaces.
- Understanding of React functional components and the `useState` hook.
- A code editor and a browser.

#### Goal
By the end of this article, you should be able to:
- Manage state in your React application using Recoil.
- Have an understanding of Recoil atoms and selectors.

#### Getting started
Before we get started, we need to familiarize ourselves with the following terms:
- An `atom` - An atom is a piece of state. We can import an atom into our components, which allows us to use and update it from our component. 

Every time an update is made to an atom, the component using the atom re-renders with the updated value.

An atom is created as shown below:
```JavaScript
const atomName = atom({
  key: 'atomName',
  default: <defaultValue>,
});
```

Each atom should have a key that must be unique and a default value.

- A `selector` - A selector is a function. Like normal functions, it accepts input (in this case, other selectors and atoms) and gives output. It is used to get derived data based on a state.

Selectors are defined as shown below:
```JavaScript
const selectorName = selector({
  key: 'selectorName',
  get: ({get}) => {
    // code goes in here
  },
});
```  

Each selector also has a unique key and a `get` property, the function to be computed. To access the values of the inputs to the selector, the `get` keyword is used. 

More information about atoms and selectors can be found [here](https://recoiljs.org/docs/introduction/core-concepts).

#### Creating our project
To create our app, `cd` into the directory you want to create your project and run the following commands in the terminal:
```bash
npx create-react-app react-recoil-todoapp

cd react-recoil-todoapp

code .
```

This creates a React application. Proceed and open it in your code editor.

Next, open a terminal and run the following command to install recoil as a dependency:
```bash
npm install recoil
```

#### Creating the recoil folder
Create a new folder in the `src` folder and name it `recoil`. In the folder, create a new file and call it `atom.js`. We will create our atom and selectors in this file.

Input the code given below into the `atom.js` file:
```JavaScript
//import atom and selctor from the recoil package through object destructuring
import { atom, selector } from "recoil";

//create an atom that will be used to store all tasks entered by the user.
const allTasks = atom({
    key: "allTasks",
    default: []
})

//create an atom that will be used to toggle between different values in the filtered tasks selector
const tasksFilter = atom({
    key: "tasksFilter",
    default: "Show All"
  });
 
 //create a selector to help in toggling between all, completed and uncompleted tasks
const filteredTasks = selector({
   key: "filteredTasks",
    get: ({ get }) => {
      const filter = get(tasksFilter);
      const list = get(allTasks);
  
      switch (filter) {
        case "Show Completed":
          return list.filter((item) => item.isDone);
        case "Show Uncompleted":
          return list.filter((item) => !item.isDone);
        default:
          return list;
      }
    }
  });


//export our atoms and selector
export {
    allTasks,
    tasksFilter,
    filteredTasks
}
```

In the above code, we first import atom and selector from recoil. We then create our `allTasks` atom that will store the tasks added by the user.

We create the `tasksFilter` atom that will help in the `filteredTasks` selector when filtering all completed and uncompleted tasks. Then, we create a `filteredTasks` selector that accesses our atoms and stores them in constants (`filter` and `list`).

It then uses the `switch` statement to return a list of tasks based on the selected criteria. In our case, completed, uncompleted, and all (all is represented by the default, which returns the whole list of the tasks).

#### Creating our components
To create our components, in the `src` folder, create a new folder and name it `components`.

Inside this components folder, create four files, namely:
- `Input.js` - This will contain the form we will use to add new tasks.
- `Tasks.js` - This will contain a list of all tasks.
- `Task.js`  - This will represent each task.
- `TaskFilters.js` - This will contain a dropdown menu that we will use to select between all completed and uncompleted tasks.

#### Creating our todo application
Now that we have everything set up, open the `App.css` file and paste in the code below to apply basic styling:
```css
.App{
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Next, open the `App.js` file and paste in the code below:
```JavaScript
import { RecoilRoot } from "recoil";
import './App.css';

import Input from "./components/Input";
import TaskFilters from "./components/TaskFilters";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="App">
      <h2>Todo App with React and Recoil</h2>
      <RecoilRoot>
        <TaskFilters />
        <Input />
        <Tasks />
      </RecoilRoot>
    </div>
  );
}

export default App;
```

We import `RecoilRoot` and wrap our entire app (the components that need to access the state) around it in the code above. It acts as a provider so that all our components can access the atoms and selectors.

#### Working on the add task functionality
In the `Input.js` file, use the code below. This will help to add new tasks to our atom.

```JavaScript
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { allTasks } from '../recoil/atom'

const Input = () => {
    //Track the value of the input field
    const [input, setInput] = useState("")
    //Use the useSetRecoilState hook to update the allTasks atom
    const setTasks = useSetRecoilState(allTasks);

    //function to be called on the click of the add button.
    const addTask = (e) => {
        //prevent default form behavior on the click of add button
        e.preventDefault();
        //update the allTasks atom with the contents of the input field 
        setTasks((oldTasks) => [
            ...oldTasks, {
                id: Math.floor(Math.random() * 1000), //generate a random id for the new task
                text: input,
                isDone: false //set task completion to false by default
            }
        ])
        setInput("") //clear the contents of the input field
    }

    return (
        <div>
            {/* create a form that will be used to add a task */}
            <form>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                {/* Disable the button when the input field is empty */}
                <button type='submit' disabled={!input} onClick={(e) => addTask(e)}>Add</button>
            </form>
        </div>
    )
}

export default Input
```

In the above code, we import the React `useState` hook that will help us to keep track of the value entered by the user. We have import the Recoil `useSetRecoilState` hook that will allow us to add tasks to our `allTasks` atom, which we have also imported in our file.

We also have created a constant `setTasks = useSetRecoilState(allTasks);` which gives us a function that we can use to modify our `allTasks` atom. In our `return`  section, we have a `form` that contains an input field and a button that calls the `addTask()` function when clicked. 

The `addTask()` function uses the `setTasks` function that we created earlier to add new items to our atom. The `setTasks` function takes the value of the items previously contained in our atom and returns an array with the newly added item.

#### Reading data from the atoms
Use the code provided below in `Tasks.js`:
```JavaScript
import React from 'react'
import { useRecoilValue } from "recoil";
import { filteredTasks } from '../recoil/atom';
import Task from './Task';

function Tasks() {
    //read the default return value(which is a list of all tasks) of the filtered tasks selector and assign it to a constant tasks
    const tasks = useRecoilValue(filteredTasks);
    return (
        <div>
            //map through the tasks array and call the Task component for each element. Also pass the value of each element to the Task component
            {tasks.map((task, index) => (
                <Task task={task} key={index} />
            ))}
        </div>
    )
}
export default Tasks
```

In code above, we have imported `useRecoilValue` to read data from the atoms. In addition, we have also imported the `filteredTasks` selector that contains the data we want to access.

Using `const tasks = useRecoilValue(filteredTasks);`, we can read the data contained in the `filteredTasks` selector and store it in a constant named `tasks`. The default return value of the `filteredTasks` selector lists all tasks.

In the `return` section, we have mapped through the `tasks` array and passed the data to our `Task` component. More information about the map method can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

Next, open the `Task.js` file and paste in the code below:
```JavaScript
import React from 'react'
import { useRecoilState } from 'recoil';
import { allTasks } from '../recoil/atom';

const Task = ({ task }) => {
    const [tasks, setTasks] = useRecoilState(allTasks);
    const index = tasks.findIndex((taskItem) => taskItem === task);

    const replaceItemAtIndex = (arr, index, newValue) => {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    };

    const removeItemAtIndex = (arr, index) => {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    };

    const toggleTaskCompletion = () => {
        const newTasks = replaceItemAtIndex(tasks, index, {
          ...task,
          isDone: !task.isDone
        });
        setTasks(newTasks)
    };

    //Delete a task
    const deleteTask = (id) => {
        const newTasks = removeItemAtIndex(tasks, index);

        setTasks(newTasks);
    }

    return (
        <div>
            <span>{task.text}</span>
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={toggleTaskCompletion}
            />
            <button onClick={deleteTask}>X</button>
        </div>
    )
}

export default Task
```

This component accepts the props passed from the `Tasks.js` file through object destructuring. Using the passed props, we return a `span` that contains the text, a checkbox that we can use to toggle between item completion, and a button that we can use to delete a task. 

The checked value of the checkbox is based on whether the task is marked as complete or incomplete. On the click of the checkbox, we are calling the `toggleTaskCompletion()` function.

The `toggleTaskCompletion()` calls the `replaceItemAtIndex()` and passes the tasks array, the index of the item clicked on, and the item clicked on itself (the item is spread out using the spread operator so that its contents can be modified. After spreading it out, the current value of `isDone` is appended) as arguments.

We get the index of the items from this function, `const index = tasks.findIndex((taskItem) => taskItem === task)`. The `replaceItemAtIndex()` function takes in the arguments passed to it and returns an array modified using the slice method.

The `toggleTaskCompletion()` stores the array received from the `replaceItemAtIndex()` function in constant named `newTasks`. It then calls the `setTasks()` function and passes the `newTasks`.

The `setTasks()` function updates our atom with the new array. With the click of the delete button, we are calling the `deleteTask()` method. This method calls the `removeItemAtIndex()` function and passes the tasks array and the item's index being clicked on as arguments.

The `removeItemAtIndex()` takes in the arguments passed to it and returns an array modified using the JavaScript's `slice()` method. The `deleteTask()` stores the returned array in a constant named `newTasks`. It then calls the `setTasks()` function and passes the newTasks which updates our `allTasks` atom.

#### Implementing filters
We can now add, delete and toggle item completion, we can implement filters that will help us display tasks based on specific criteria. 

To do this, open the `TaskFilters.js` file and paste in the code below:
```JavaScript
import React from 'react'
import { useRecoilState } from "recoil";
import { tasksFilter } from '../recoil/atom';

const TaskFilters = () => {

    const [filter, setFilter] = useRecoilState(tasksFilter);

    return (
        <div>
            Filter:
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="Show All">All</option>
                    <option value="Show Completed">Completed</option>
                    <option value="Show Uncompleted">Uncompleted</option>
                </select>
        </div>
    )
}

export default TaskFilters
```

In the above code, we have a dropdown menu with three options. On changing the option, we pass the value of the currently selected option to the `setFilter()` function that references the `tasksFilter` atom. 

On passing the filter, the switch statement in the `filteredTasks` selector matches the filter against the defined cases and returns only the tasks that match the predefined criteria.

#### Running our application
To run the app, open the integrated terminal and run the command below:
```bash
npm start
```

On your browser, open the link `localhost:3000,`. You can add tasks, delete them, mark them as complete or incomplete, and filter between completed, uncompleted, and all tasks.

### Conclusion
This was a basic implementation of Recoil in our React app. After better understanding the concepts discussed above, you can implement Recoil in your project. 

You can also work on this project and take it to the next level.

Happy coding!!!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
