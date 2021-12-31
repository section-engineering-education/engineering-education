---
layout: engineering-education
status: publish
published: true
url: /task-tracker-app-with-react-hooks/
title: Task Tracker Application with React Hooks
description: In this article the reader will learn how to build a task tracker with React that allows us to add, update, and delete tasks. The reader will also learn how to use hooks, manage states, and use props in React.
author: prince-joel
date: 2021-12-31T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/task-tracker-app-with-react-hooks/hero.jpg
    alt: task tracker image
---
We all have tasks we plan on completing before the day runs out in our everyday lives. Often, we use task tracking applications to keep track of everything we have to do.
<!--more-->
In this article, you will learn how to build a task tracker with React that allows you to add, update, and delete tasks. You will also learn how to use hooks, manage states, and use props in React.

### Getting started
First, create a React application. Follow [this](https://reactjs.org/docs/create-a-new-react-app.html) link for more details.

After setting up your React app, proceed and create a component folder. Your app will consist of three main components: ` TodoForm.js`, `TodoList.js`, and `Todo.js`.

All your functionality will be in your `App.js`, which serves as an entry point for your app. 

> NOTE: In this tutorial, we use material UI for styling purposes. You may download it [here](https://mui.com/getting-started/installation/) if you don't have it installed already.

### TodoForm
In the `TodoForm` component, create a function called `TodoForm()`. The`TodoForm` component will be used to create forms required to add a `to-do` to the list. Remember to import `React` and export `TodoForm()`.

In this `TodoForm()` function, go ahead and return a form element with an input and a button inside of it. In the `TodoForm()`, import `useState` because you need to define some state to keep track of input from the user.

To keep track of user input, define a state called `to-do`. Then `setTodo()` as the function initialize as an object with three properties, ID, which is a string, task, which is also a string, and completed, which is a boolean. 

The `completed` status will be used to track whether or not the `to-do` has been marked as complete, and the task will describe the `to-do`. It would be best to define a function for when a user types in input for a `to-do` to keep track of it in your state.

You need to create a function called `handleTaskInputChange()` that takes an event as the parameter. This function will be responsible for updating the task property on your `to-do` object.
In this function, you will call `setTodo`, pass in a new object with the old `to-do` property, and update the task property with the new value from the event target value. 

In this case, the event target value contains the new input text from the user. Your return statement will define the `onChange()` event function to run your new `handleTaskInputChange()` function every time the event fires. In this case, `onChange()` will fire every time the input value changes. 

Also, you set the input value to be `todo.task` because that is what's updated every time the `handleTaskInputChange()` is called. Then, you also give your button a type called to submit. 
So now that you have some input data to work with, you need to handle the case when you want to add a new `to-do` to the list. 

In `app.js`, you will define a single state called `todos`, an array. Next, you need to create a function called `addTodo()` that will take a new `to-do` and add it to the array of `todos`. To add the `to-do` to the list, call the `setTodos()` function and then pass in an array containing the new `to-do`, add it to the beginning, and the old `todos` array spread over it.

You need to pass your new `addTodo()` function to the `TodoForm` component as a prop. Now, in your `TodoForm` component, you need to destructure the `addTodo()` function from the props parameter, the first one. 

When the user submits the form, you need to add the forms `to-do` from the state to the list. To do this, you will create a `handleSubmit()` function that also takes in an event from the DOM. You need to call the `preventDefault()` function to prevent the default browser from submitting automatically.

Then you need to write an if statement that only gets called if the `to-do.task` is not empty. You will do this by calling the `trim()` function on your `to-do.task.trim()`, which will remove white space from the string. Then inside the if statement, you need to call your new `addTodo()` function with an object with the `to-do` spread and update the ID property. You will get this ID from a UUID package, which will generate one for us. 

To install this, open the console and type in yarn add UUID or npm add UUID, then in your `TodoForm` file, import UUID and call v4 to generate the `to-do` ID. Then after you add the `to-do`, you want to reset the form by calling `setTodo` with a new object that has the old property spread onto it and then updates the task property with an empty string. 

You can now take this `handleSubmit()` function and have it fire when the form gets submitted by defining the` onSubmit` property as your new `handleSubmit()` function.

```javascript
 import { Button, TextField } from "@material-ui/core";
 import React, { useState } from "react";
 import uuid from "uuid"; 
 
 function TodoForm({ addTodo }) {  
     const [to-do, setTodo] = useState({    
         id: "",    
         
         task: "",    
         completed: false  
    });   
         
         
function handleTaskInputChange(e) {    
     // e.target.value contains new input from onChange   
      // event for input elements    
     setTodo({ ...to-do, task: e.target.value });
     }   
     
     function handleSubmit(e) {    e.preventDefault(); 
     // prevents browser refresh    
     // trim() gets rid of string whitespace    
     if (to-do.task.trim()) {      
         
         addTodo({ ...to-do, id: uuid.v4() });   
            // reset task input
         setTodo({ ...to-do, task: "" });    
         }  
        }   
        
        return (    
            <form className="todo-form" onSubmit={handleSubmit}>      
        <TextField        
        label="Task"        
        type="text"        
        name="task"        
        value={to-do.task}        
        onChange={handleTaskInputChange}      
        />      
        <Button type="submit">Submit</Button>    
        </form>
      );
     } 
     
     export default TodoForm;
```

### TodoList
`TodoList` will be responsible for rendering the list of `todos` in an array. Using the short form, import react and export `TodoList`. You need to destructure `todos` from the component props and then render an unordered list in the return statement.

Inside this unordered list, you need to map over `todos` by inserting some JavaScript in curly braces and using the map array function. Then you need to return your `Todo` component with the `to-do` object passed in as a prop inside your map.

>Note that when rendering a JSX element in an array map, each item should have a unique key attached to the parent element returned from the map.

The next thing you need to do is to define how your `Todo` component will look:
```javascript
import { List } from "@material-ui/core";
import React from "react";
import Todo from "./Todo"; 


function TodoList({ todos, removeTodo, toggleComplete }) {  
    return (    
        <ul>      
        {todos.map(to-do => (        
            <Todo          
            key={to-do.id}          
            to-do={to-do}          
            removeTodo={removeTodo}         
            toggleComplete={toggleComplete}        />      
            ))}    
        </ul>  
    );
 } 

 export default TodoList;
```
 
### Todo
`Todo` will render a `to-do` from the list. Your `Todo` needs to have three main elements, the checkbox, the task, and the delete button. Using the short form, import react and export `Todo.js`.

In your return statement, you need to create an input: a checkbox with a list of items having the `to-do.task` and a button all inside a div. Next, you will attach custom styles by specifying the style prop of custom camel-case properties that contains style types. 

Then, you will give the div a display of flex to align elements next to each other horizontally. Also, for the list style, you need to give the text-decoration style a value of line-through when the `to-do` gets completed by using a ternary expression. 

If you run the code you have written, you can see that you can add a `to-do` to your list, and your UI will update every time you submit your form. However, all your `Todo` will be lost if you refresh the page. Therefore, you need to utilize the local browser storage so that your state will not reset.

In `App.js`, you need to import a function called `useEffect()`. `useEffect` is a handy hook that provides functionalities that respond to specific data or functions in your code. Every time your `todos` array changes, you want to store that new data inside of local storage. 

To do that, you need to define an effect that takes in a function and a dependent array with a `todos` state inside of it. Next, you need to define a unique local storage key that you can use to store the `todos`. 

To this effect, you need to call the `setItem()` function on the global-local storage variable provided with your custom local storage key and `todos` array stringify with `JSON.stringify()`. Next, you want to add `todos` when the app renders. 

To do that, you will define a `useEffect` with an empty dependency array. Inside the effect, you need to get the `todos` from local storage and store them in a variable by calling `getItem` on local storage using the `LOCAL_STORAGE_KEY`. Then pass the string returned from that into `JSON` using `JSON.parse`. 

Now, you need to call `setTodos` on this value, but only if null. If you execute the app again, you will see that the `Todos` do not disappear when refreshing the browser. Instead, you will need to perform actions on the actual `to-do`, `toggleComplete`, and `delete`. 

Back to `App.js`, you need to create a new function under `addTodo` called `toggleComplete()`, which takes in the ID of a `to-do`. Then, to update the `to-do`, you need to call `setTodos`, and You need to pass a new `todos` array that you will get by performing a mapping. 

You map each `to-do` to check if the ID of that `to-do` marches the one passed in. If it does, you need to return a new object with the completed property. This will cause false to become true and true to become false when the function is run on a particular ID. You take this function and pass it to the `TodoList` component to reference it there.

In `TodoList.js`, you can destructure the `togglecomplete()` function from the properties and map over the `todos` by parsing it again to your `Todo` component. For example, you want the `togglecomplete()` function to fire when clicking on the `to-do` checkbox. 

To do this, you need to create a function called `handlecheckboxclick()` inside the `Todo` component, which will call `togglecomplete()` with the ID of the `to-do`. Then you need to fill out checkbox inputs `onClick` property to use your `handleTodoClick()` function instead.

Going back to `App.js`, you can now implement when deleting a `to-do`. First, you will create a `removeTodo()` function, which takes an ID from the `to-do`. Inside this function, you need to call `setTodos` with a new `todos` array passed to `removeTodo`.

Lucky for us, there is a handy prototype function for arrays called `Filter`, which is excellent for removing items from an array. The `Filter` takes a function which it will then use to determine whether or not it should keep an element in the array. 

In this case, you want to keep the `to-do` if the ID is not the one you are looking for; otherwise, remove the `to-do` from the list. The return value for this Filter is another `todos` with `to-do` of the same ID as a parameter removed from the array. Like before, you want to pass this new function to `TodoList` as a prop, so each `to-do` has access to it.

Destructure this new property into `TodoList` and give it to the `Todo` component. Now in the `Todo` component, you can grab the function from the props and use it for your remove button.
Like before, you need to create a function called `handleRemoveclick()`, which will call `removeTodo` with the `to-do.ID`. Now you can use this function as the `onClick` functionality for a `to-do` remove button.

If you run the app, you can now add, remove and toggle `todos` to complete.

![Remove](/engineering-education/task-tracker-app-with-react-hooks/Remove.jpg) 

With the functionality implemented, your app will look better. You will use material UI for this project by running the following commands in the terminal:
```bash
# install material UI with npm
npm install @material-ui/core

#install material UI with yarn
yarn add @material-ui/core
```

```bash
#install material UI with npm
npm install @material-ui/icons

#install material UI with yarn
yarn add @material-ui/icons
```

In `App.js`, you need to remove the header element and add the typography component for material UI. Then change your paragraph tag to a typography component and set its variant to `h1` with some padding added.

In `TodoForm`, import a button and text field from material UI, replace your input with `textField` and add a label property. Then replace the regular button with the material UI button instead.

You will then give the form a `className` that you can style. Then in `TodoList`, you need to replace the `UL` tag with a list component for material UI. In the `Todo` component, import the icon button, checkbox, list item, close icon, and typography for material UI. Then replace the regular list item element with a typography component and set the variant to `body1`.

Replace the input element with a checkbox component and give it a checked property corresponding to the `to-do.Completed` property and an `onClick()` function that calls checkbox click. Also, replace the remove button with an icon button and place the close icon inside it.

Now, you need to add some style to `App.CSS` to align everything to the center, set the element height to 100%, and vertically center the `TodoForm` elements.

If you go back to your browser, you will see your app in its completed state:
```javascript 
 import { Checkbox, IconButton, ListItem, Typography } from "@material-ui/core";   import CloseIcon from "@material-ui/icons/Close";import React from "react"; 


 function Todo({ to-do, toggleComplete, removeTodo }) {  
    function handleCheckboxClick() {    toggleComplete(to-do.id);  
    }   
    
    
    function handleRemoveClick() {    
        removeTodo(to-do.id);  
    }   
    
    return (    
        <ListItem style={{ display: "flex" }}>      <Checkbox checked={to=do.completed} onClick={handleCheckboxClick} />      <Typography        
        variant="body1"        
        style={{          
            textDecoration: to-do.completed ? "line-through" : null        
            
        }}      
        >        
         {to-do.task}      
       </Typography>      
       <IconButton onClick={handleRemoveClick}>        <CloseIcon />      
       </IconButton>    
       </ListItem>  
       );
    } 
    
    export default Todo; 
```

### Conclusion
This article serves as a stepping stone for people getting started with React. You learned how to create a task tracker app with React hooks, and you saw how to use states, effects, and pass props.

You also saw how easy and fast it was to use material UI to style your app. Looking to develop the task tracker application further, improve the functionality or check out example code? Check out this [GitHub repo](https://github.com/prince-joel/Task-Tracker).

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
