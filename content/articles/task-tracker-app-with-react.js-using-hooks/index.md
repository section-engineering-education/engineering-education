Task tracker app with React hooks

##Introduction

In our everyday lives, we all have tasks we plan on completing before the day runs out. Often, we use task tracking applications to keep track of everything we have to do.

In this article, you will learn how to build a task tracker with React that allows you to add, retrieve, update, and delete tasks. You will also learn how to use hooks, manage states and make use of props in React.

##Getting started

First, create a react app; here is a link to learn how to do that <https://reactjs.org/docs/create-a-new-react-app.html>.

After completing your react app and setting up your code editor, we create our component folder. Our app will consist of three main components, which are TodoForm.js,TodoList.js, Todo.js.

All our functionality will be in our App.js, which will serve as an entry point for our app. For styling purposes, we will use material UI instead of our regular CSS. Visit material UI to install material UI<https://mui.com/getting-started/installation/> if you don’t have it installed already.

##TodoForm

TodoForm will be responsible for rendering the form necessary for us to add a to-do to the list. Using the short form, which is import react and export TodoForm, define a function called TodoForm.

In this TodoForm function, go ahead and return a form element with an input and a button inside of it. Inside the TodoForm, you need to import useState because we need to define some state to keep track of input from the user.

Inside the TodoForm function, you need to define a state called todo, setTodo as the function initialize as an object with three properties, id which is a string, task which is also a string, and completed which is a boolean. Completed will be used to track whether or not the Todo is marked as completed, and the task will describe the Todo.

We need to define a function for when a user types in input for a Todo to keep track of it in our state. We will create a function called handleTaskInputChange that takes in an event as the parameter. This function will be responsible for updating the task property on our Todo object.

In this function, we will call setTodo and pass in a new object with the old Todo property and update the task property with the new value from the event target value. In this case, the event target value contains the new input text from the user.

Our return statement will define the onChange function to run our new handleTaskInputChange function every time the event fires. In this case, onChange will fire every time the input value changes. Also, we set the input value to be todo task because that’s what is updated every time the handleTaskInputChange is called. We also give our button a type called to submit. So now that we have some input data to work with, we need to handle the case when we want to add a new todo to the list. 

 

In app.js we are going to create a function called addTodo that will take a new todo and add it to the array of todos, to add the to-do to the list we are going to create a new to-do array by calling the setTodos function and then passing in an array with the new todo, add it to the beginning, and the old todo array spread over it.

We will pass our new addTodo function to the to-do form component as a prop; now, in our todo form component, we will destructure the add todo function from the props parameter, which in this case is the first one. 

When the user submits the form, we want to then add the forms todo from the state to the list of to-dos; in other to do this, we are going to create a handleSubmit function which also takes in an event from the Dom, here we going to call the prevent default function from preventing default browser form submit functionality then we are going to write an if statement that only gets called if the todos task is not empty by calling the trim function on our todo.task.trim  which will remove white space from the string.

Then inside the if statement, we will call our new addTodo function with an object that has the todo spread onto it and update the id property. We are going to get this id from a package called uuid, which will generate one for us. To install this, open the console and type in yarn add uuid or npm add uuid, then in our todoForm file, import uuid and call v4 to generate the todo id. Then after we add the todo we want to reset the form by calling setTodo with a new object that has the old property spread onto it and then update the task property with an empty string. We can now take this handleSubmit function and have it fire when the form is submitted by defining the forms onSubmit property to be our new handleSubmit function.


```javascript
 import { Button, TextField } from "@material-ui/core";
 
 import React, { useState } from "react";import uuid from "uuid"; 
 
 function TodoForm({ addTodo }) {  
     const [todo, setTodo] = useState({    
         id: "",    
         
         task: "",    
         completed: false  
    });   
         
         
function handleTaskInputChange(e) {    
     // e.target.value contains new input from onChange   
      // event for input elements    
     setTodo({ ...todo, task: e.target.value });
     }   
     
     function handleSubmit(e) {    e.preventDefault(); 
     // prevents browser refresh    
     // trim() gets rid of string whitespace    
     if (todo.task.trim()) {      
         
         addTodo({ ...todo, id: uuid.v4() });      setTodo({ ...todo, task: "" });    
         }  
        }   
        
        return (    <form className="todo-form" onSubmit={handleSubmit}>      
        <TextField        
        label="Task"        
        type="text"        
        name="task"        
        value={todo.task}        
        onChange={handleTaskInputChange}      
        />      
        <Button type="submit">Submit</Button>    
        </form>
      );
     } 
     
     export default TodoForm;
```

##TodoList

TodoList will be responsible for rendering the list of todos in an array. As usual, using the short form import react and export TodoList. From the component props, we will destructure TodoList and then render an unordered list in the return statement.

Inside this unordered list, we will map over todo by inserting some javascript in curly braces and using the map array function. Inside our map, I’m going to return our Todo component with the todo object passed in as a prop.

Note that when rendering a JSX element in an array map, each item should have a unique key attached to the parent element returned from the map.

The next thing we will do is to define how our Todo will look:



```javascript
import { List } from "@material-ui/core";import React from "react";
import Todo from "./Todo"; 


function TodoList({ todos, removeTodo, toggleComplete }) {  
    return (    
        <List>      
        {todos.map(todo => (        
            <Todo          
            key={todo.id}          
            todo={todo}          
            removeTodo={removeTodo}         toggleComplete={toggleComplete}        />      
            ))}    
        </List>  
    );
 } 

 export default TodoList;
```
 


## Todo

Todo will render a todo from the list. Our Todo will have three main elements, the check box, the task, and the delete button. As usual, using the short form import react and export Todo.js.

In our return statement, we will create an input which is a checkbox with list items with the todo task and a button all inside a div. We will attach custom styles by specifying the style prop of custom camel-case properties that contains style types. We are going the div a display of flex to align elements next to each other horizontally.

Also, for the list style, we will give the text-decoration style a value of line-through if the Todo is completed by using a ternary expression. If we run the code we have written, we can see that we can add a todo to our list, and our UI will update every time we submit our form. However, if we refresh the page, all our Todo will be lost. We need to utilize the local browser storage to fix this so that our state will not reset.

In App.js we are going to import a function called useEffect. useEffect is a handy hook that provides functionalities that respond to specific data or functions in our code. Every time our todo array changes, we want to store that new data inside of local storage. To do that, we will define an effect that takes in a function and a dependent array with a Todo state inside of it.

Next, we will define a unique local storage key that we can use to store the todos. In this effect, we will call the setItem function on the global-local storage variable provided with our custom local storage key and todo array stringify with JSON.stringify.

Next, we want to add Todo when app renders. To do that, we are going to define a useEffect with an empty dependency array. Inside the effect, we will get the todos from local storage and store them in a variable by calling getItem on local storage using the LOCAL_STORAGE_KEY. Then pass the string returned from that into JSON using JSON.parse. Now we are going to call setTodo on this value, but only if it is null.

If we rerun the app, we will see that the Todos do not go away when refreshing the browser. We now need to be able to perform actions on the actual Todo. The two actions that we need to implement are toggleComplete and delete. 

Back to App.js we will create a new function under addTodo called toggleComplete, which takes in the id of a todo. To update the todo, we will call setTodos, and we will parse a new todos array that we will get by performing a mapping. We map each todo to check if the ID of that todo marches the one passed in. if it does, we will return a new object with the completed property.

This will cause false to become true and true to become false when the function is run on a particular id. Now we take this function and pass it to the todoList component so we can reference it there.

Now in todoList.js, we can destructure the complete toggle function from the properties and use it to map over the todos by parsing it again to our todo component. We want the toggle complete function to fire when we click on the todos checkbox. To do this, we will create a function called handle checkbox click inside the todoList component, which will call toggle complete with the id of the todo.

Then we will fill out checkbox inputs onClick property to use our handle todo click function instead.

Going back to App.js we can now implement for deleting a todo. We will create a function called removeTodo which takes in an ID from the todo. Inside this function, we will call setTodos with a new todos array passed to with a removeTodo.

Lucky for us, there is a handy prototype function for arrays called filter, which is excellent for removing items from an array. The Filter takes a function which it will then use to determine whether or not it should keep an element in the array. In this case, we want to keep the todo if the ID is not the one we are looking for; otherwise, remove the todo from the list. 

The return value for this filter is another of todos with two of the same ID as a parameter removed from the array. Just like before, we want to pass this new function to todoList as a prop so each todo has access to destructure this new property into todoList and give it to the Todo component. Now in the todo component, we can grab the function from the props and use it for our remove button.

Just like before, we will create a function called handleRemove click, which will call removeTodo with the todo ID. Now we can use this function as the onClick functionality for a todo remove button.

If we run the app, we can now add, remove and toggle todos to complete.
![Remove](/engineering-education/task-tracker-app-with-react-hooks/Remove.jpg) 

With the functionality implemented, let us make our app look better. We will use material UI. for this project by running the following commands in the terminal :

 

```javascript
// install material UI with npm
npm install @material-ui/core

//install material UI with yarn
yarn add @material-ui/core
```

```javascript
//install material UI with npm
npm install @material-ui/icons

//install material UI with yarn
yarn add @material-ui/icons
```

In App.js, we will start by removing the header element and adding the typography component for material UI, then change our paragraph tag to a typography component and set its variant to h1 with some padding added to it.

In todoForm, we will import a button and text field from material UI, then replace our input with textField and add a label property to it. Then we will place the regular button with the material UI button instead.

Lastly, we are going to give the form a className that we can style. Then in todoList we will replace the UL tag with a list component material UI.

In the todo component, we will import the icon button, checkbox, list item, close icon, and typography for material UI then we will replace the regular list item element with a typography component and set the variant to body1 then we will replace the input element with checkbox component and give it a checked property that corresponds to the todoCompleted property and an onClick function that call checkbox click.

We will replace the remove button with an icon button and place the close icon inside of it.

Finally, we will add some style to App.CSS to align everything to the center, set the element height to 100%, and center the todoForm elements vertically.

If we go back to our browser, we will see our app in its completed state:


```javascript

 import { Checkbox, IconButton, ListItem, Typography } from "@material-ui/core";   import CloseIcon from "@material-ui/icons/Close";import React from "react"; 


 function Todo({ todo, toggleComplete, removeTodo }) {  
    function handleCheckboxClick() {    toggleComplete(todo.id);  
    }   
    
    
    function handleRemoveClick() {    
        removeTodo(todo.id);  
    }   
    
    return (    
        <ListItem style={{ display: "flex" }}>      <Checkbox checked={todo.completed} onClick={handleCheckboxClick} />      <Typography        
        variant="body1"        
        style={{          
            textDecoration: todo.completed ? "line-through" : null        
            
        }}      
        >        
         {todo.task}      
       </Typography>      
       <IconButton onClick={handleRemoveClick}>        <CloseIcon />      
       </IconButton>    
       </ListItem>  
       );
    } 
    
    export default Todo; 
```


##Conclusion

This article serves as a stepping stone for people getting started with React. In this article, we learned how to create a task tracker app with React hooks, and we saw how to use states, effects, and pass props.

Also, we saw how easy and fast it was to use material UI to style our app. Looking to develop the task tracker application even further, improve the functionality or check out example code? Check out the GitHub repo https://github.com/prince-joel/Task-Tracker.

