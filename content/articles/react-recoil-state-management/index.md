---
layout: engineering-education
status: publish
published: true
url: /react-recoil-state-management/
title: Getting Started with Recoil as a State Management Library for React Applications
description: In this article, we will look at how we can manage state in our React applications using Recoil.
author: anne-mwangi
date: 2021-11-29T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-recoil-state-management/hero.jpg
    alt: react recoil img
---
Managing state in your web application is essential as it helps ensure that data displayed across different pages is consistent.
<!--more-->
React by default provides the `useState()` hook that we can use to store and modify the application's state. The disadvantage of this hook is that we have to pass the state from one component to another, and as the project becomes more extensive, passing too many props might become hectic.

State management libraries solve this problem by creating a global store where each component can access the data it needs. With a state management library, data flows from your app to the state and vice versa, and you can access the data from any component without passing it as props.

In this article, we will look at how we can manage state in our React applications using Recoil. We will create a Todo application that allows the user to add todos, mark them as complete, delete them, and filter between the completed and the uncompleted ones. 

#### Prerequisites
The following are needed to be able to follow along:
- Intermediate knowledge of [React](https://reactjs.org),a JavaScript library for building user interfaces.
- Understanding of React functional components and the useState hook.
- A code editor and a browser.

#### Goal
By the end of this article, you should be able to:
- Manage state in your React application using Recoil.
- Have an understanding of Recoil atoms and selectors.

#### Getting Started
Before we get started, we need to familiarize ourselves with the following terms:
- An `atom` - An atom is a piece of state. It can be updated and subscribed to(used in a component). Updating an atom causes the subscribed component to re-render with the new value.

An atom is created as shown below:
```javascript
const atomName = atom({
  key: 'atomName',
  default: <defaultValue>,
});
```

Each atom should have a key that must be unique and a default value.

-A `selector` - It is a function and it accepts atoms and other selectors as input. They are used to get derived data based on a state.

Selectors are defined as shown below:
```javascript
const selectorName = selector({
  key: 'selectorName',
  get: ({get}) => {
    // code goes in here
  },
});
```  

Each selector also has a unique key and a `get` property that is, the function to be computed. A selector uses the `get` argument passed to it to access the value of atoms and other selectors. 

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
In the `src` folder, create a new folder and name it to `recoil`. In the folder, create a new file and call it `atom.js`. We will create our atom and selectors in this file.

Open the file and paste in the following code:
```javascript
import { atom, selector } from "recoil";

const todosState = atom({
    key: "todosState",
    default: []
})

const todosFilterState = atom({
    key: "todosFilterState",
    default: "Show All"
  });
  
const filteredTodosState = selector({
   key: "filteredTodosState",
    get: ({ get }) => {
      const filter = get(todosFilterState);
      const list = get(todosState);
  
      switch (filter) {
        case "Show Completed":
          return list.filter((item) => item.isComplete);
        case "Show Uncompleted":
          return list.filter((item) => !item.isComplete);
        default:
          return list;
      }
    }
  });

export {
    todosState,
    todosFilterState,
    filteredTodosState
}
```

In the above code, we first start by importing atom and selector from recoil. We then create our `todosAtom` that will store the todos added by the user.

We create the `todosFilterState` atom that will help when filtering between all completed and uncompleted todos. 

Then, we create a `filteredTodosState` selector that accesses our atoms and stores them in constants. It then uses the `switch` statement that uses the filter method to return a list of todos based on the selected criteria.

In our case, completed, uncompleted, and all(all is represented by the default, which returns the whole list of the todos).

#### Creating our components
To create our components, in the `src` folder, create a new folder and name it `components`.

Inside this components folder, create four files, namely:
- `Input.js` - This will contain the form we will use to add new tasks(todos).
- `Todos.js` - This will contain a list of all todos.
- `Todo.js`  - This will represent each todo.
- `TodoFilters.js` - This will contain a dropdown menu that we will use to select between all completed and uncompleted todos.

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
```javascript
import { RecoilRoot } from "recoil";
import './App.css';

import Input from "./components/Input";
import TodoFilters from "./components/TodoFilters";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <h2>Todo App with React and Recoil</h2>
      <RecoilRoot>
        <TodoFilters />
        <Input />
        <Todos />
      </RecoilRoot>
    </div>
  );
}

export default App;
```

In the code above, we import `RecoilRoot` and wrap our entire app(the components that need to access the state) around it. It acts as a provider so that all our components can access the atoms and selectors.

#### Working on the add todo functionality
Open the `Input.js` file and add the code below:
```javascript
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { todosState } from '../recoil/atom'

const Input = () => {

    const [input, setInput] = useState("")
    const setTodos = useSetRecoilState(todosState);

    const addTodo = (e) => {
        e.preventDefault();
        setTodos((oldTodos) => [
            ...oldTodos, {
                id: Math.floor(Math.random() * 1000),
                text: input,
                isComplete: false
            }
        ])
        setInput("")
    }

    return (
        <div>
            <form>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit' disabled={!input} onClick={(e) => addTodo(e)}>Add</button>
            </form>
        </div>
    )
}

export default Input
```

In the above code, we import the React `useState` hook that will help us to keep track of the value entered by the user.

We have import the Recoil `useSetRecoilState` hook that will allow us to add todos to our `todosState` atom, which we have also imported in our file.

We also have created a constant `setTodos = useSetRecoilState(todosState);` which gives us a function that we can use to modify our `todosState` atom

In our `return`  section, we have a `div` that contains an input field and a button that calls the `addTodo()` function when clicked. 

The `addTodo()` function uses the `setTodos` function that we created earlier to add new items to our atom. The `setTodos` function takes the value of the items previously contained in our atom and returns an array with the newly added item.

#### Reading data from the atoms
To read data from the previously created atoms and display it on a web page, open the `Todos.js` file and paste in the code below:
```javascript
import React from 'react'
import { useRecoilValue } from "recoil";
import { filteredTodosState } from '../recoil/atom';
import Todo from './Todo';

const Todos = () => {

    const todos = useRecoilValue(filteredTodosState);

    return (
        <div>
            {todos.map((todo, index) => (
                <Todo todo={todo} key={index} />
            ))}
        </div>
    )
}

export default Todos
```

In the above code, we have imported `useRecoilValue` to read data from the atoms. In addition, we have also imported the `filteredTodosState` atom that contains the data we want to access.

Using `const todos = useRecoilValue(filteredTodosState);`, we have been able to read the data contained in the `filteredTodosState` atom and store it in a constant named `todos`.

In the `return` section, we have mapped through the `todos` and passed the data to our `Todo` component. 

More information about the map method can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).


Next, open the `Todo.js` file and paste in the code below:
```javascript
import React from 'react'
import { useRecoilState } from 'recoil';
import { todosState } from '../recoil/atom';

const Todo = ({ todo }) => {
    const [todos, setTodos] = useRecoilState(todosState);
    const index = todos.findIndex((todoItem) => todoItem === todo);

    const replaceItemAtIndex = (arr, index, newValue) => {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    };

    const removeItemAtIndex = (arr, index) => {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    };

    const toggleTodoCompletion = () => {
        const newTodos = replaceItemAtIndex(todos, index, {
          ...todo,
          isComplete: !todo.isComplete
        });
        setTodos(newTodos)
    };

    //Delete a todo
    const deleteTodo = () => {
        const newTodos = removeItemAtIndex(todos, index);

        setTodos(newTodos);
    }

    console.log(index)

    return (
        <div>
            <span>{todo.text}</span>
            <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={toggleTodoCompletion}
            />
            <button onClick={deleteTodo}>X</button>
        </div>
    )
}

export default Todo
```

In this component, we accept the props passed from the `Todos.js` file through object destructuring. 

Using the passed props, we return a `span` that contains the text, a checkbox that we can use to toggle between item completion, and a button that we can use to delete a todo. 

The checked value of the checkbox is based on whether the todo is marked as complete or incomplete.

On the click of the checkbox, we are calling the `toggleTodoCompletion()` function.

The `toggleTodoCompletion()` calls the `replaceItemAtIndex()` and passes the todos array, the index of the item clicked on and the item clicked on itself(the item is spread out using the spread operator so that its contents can be modified. After spreading it out, the current value of `isCompleted` is appended) as arguments.

We get the index of the items from this function, `const index = todos.findIndex((todoItem) => todoItem === todo)`. 

The `replaceItemAtIndex()` function takes in the arguments passed to it and returns an array modified using the slice method.

The `toggleTodoCompletion()` stores the array received from the `replaceItemAtIndex()` function in constant named `newTodos`. It then calls the `setTodos()` function and passes the `newTodos`.

 The `setTodos()` function updates our atom with the new array.


With the click of the delete button, we are calling the `deleteTodo()` method. This method calls the `removeItemAtIndex()` function and passes the todos array and the item's index being clicked on as arguments.

The `removeItemAtIndex()` takes in the arguments passed to it and returns an array modified using the JavaScript's `slice()` method. The `deleteTodo()` stores the returned array in a constant named `newTodos`. 

It then calls the `setTodos()` function and passes the newTodos which updates our `todosState` atom.

#### Implementing filters
As we can now add, delete and toggle item completion, we can implement filters that will help us display todos based on specific criteria. 

To do this, open the `TodoFilters.js` file and paste in the code below:
```javascript
import React from 'react'
import { useRecoilState } from "recoil";
import { todosFilterState } from '../recoil/atom';

const TodoFilters = () => {

    const [filter, setFilter] = useRecoilState(todosFilterState);

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

export default TodoFilters
```

In the above code, we have a dropdown menu that has three options. On changing the option, we pass the value of the currently selected option to the `setFilter()` function that references the `todosFilterState` atom. 

On passing the filter, the switch statement in the `filteredTodosState` selector matches the filter against the defined cases and returns only the todos that match the predefined criteria.

#### Running our application
To run the app, open the integrated terminal and run the command below:
```bash
npm start
```

On your browser, open the link `localhost:3000,` and you will see your todo app. You can be able to add todos, delete them, mark them as complete or incomplete, and filter between completed, uncompleted, and all todos.

### Conclusion
This is a basic implementation of Recoil in our React app. After understanding the concepts discussed above, you can go ahead and implement Recoil in your project. You can also work on this project and take it to the next level.

Happy Coding!!!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
