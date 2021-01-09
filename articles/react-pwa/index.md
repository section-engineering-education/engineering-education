In this tutorial, we will create a React Todo Progressive Web App. A progressive web app refers to an enhanced web application having the same capabilities as a native platform-specific application by utilizing the emerging browser APIs. The Progressive Web Apps are intended to be fast, reliable, and engaging.

### Prerequisites

1. Knowledge of the [JavaScript programming language](https://www.w3schools.com/js/DEFAULT.asp).

2. Basics of React library. Check documentation [here](https://www.reactjs.org).

3. A basic knowledge of [NPM](https://www.npmjs.com/).

4. A code editor, I will use [VS Code](https://code.visualstudio.com/download).

### Getting started
You should have Node.js installed on your computer. You can download the latest version [their website](https://www.nodejs.org). Node.js runtime comes pre-installed with the Node.js package manager (NPM).

To confirm that Node.js has been installed, open the terminal and execute the below command:

```bash
node --version
```

This will show the version of Node.js running on your system and that will confirm that Node.js is installed in your system.

First, we should create a new React application using the `create-react-app` command-line utility. On your terminal, execute the following command:

```bash
npx create-react-app react-pwa
```

This will create a folder named `react-pwa`. You can now open the project in your favorite code editor.

The folder structure will initially look similar to this:

```bash
node_modules/
public/
|--- favicon.ico
|--- index.html
|--- logo192.png
|--- manifest.json
|--- robots.txt
src/
|--- App.js
|--- App.css
|--- App.test.js
|--- index.js
|--- index.css
|--- serviceWorker.js
|--- logo.svg
.gitignore
package.json
README.md
yarn.lock
```

Our React code will be in the `src` folder. Inside this folder, delete the `logo.svg` and remove everything in the `App.css` file and the `App.js` file before we start building the application.

### Creating UI components
We'll have to break our application into components that represent the logical parts of the application.

We'll have four functional components:

1. The App component.

2. The Form component.

3. The TodoList component.

4. The Todo component.

### The App component 
Let's start with the `App` component since it is the parent component of the `TodoList` and the `Form` components.

```javascript
import React, { useState } from 'react';

// components
import Form from './components/Form';
import TodoList from './components/TodoList';

// CSS files
import './App.css'

const App=()=>{
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  }
  
  return (
    <div>
      <h1>TODO PWA</h1>
      <Form addTodo={addTodo}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
```

The App component walkthrough:

- We import the `TodoList` and `Form` component which we will create in the next steps. The CSS file named `App.css` is for basic styling of the application.

- Inside the component, we'll create our state for the list of todos to using the `useState` hook.

- The `addTodo` is a function that is used to add a new todo by calling the `setTodos` method to update the state. The component which is calling the `addTodo` function should pass the new todo to the function.

- We use JSX to return a div containing `<h1>` tag as the header, the `Form` and the `TodoList` components. Let us now create the components in the below steps.

### Form component
This component will be used to add new todos. In your `src/` folder, create a new folder named `components`. Inside the `components` folder, create a file named `Form.js`. 

This is the code for the `Form.js`:

```javascript
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = ({addTodo}) =>{
    
    const [inputText,setInputText]=useState("");

    const inputTextHandler=(e)=>{
        setInputText(e.target.value);
    }
    
    const submitTodoHandler=(e)=>{
        e.preventDefault();
        if(inputText){
          addTodo({text:inputText,completed:false,id:uuidv4()});
        } 
        setInputText("");
    }

    return(
        <form onSubmit={submitTodoHandler}>
            <input type="text" value={inputText} placeholder="Add Todo" onChange={inputTextHandler}/>
            <button type="submit" className="add-btn">
                Add
            </button>
        </form>
    );
};

export default Form;
```

The Form component walkthrough:

- The method `inputTextHandler` set to the `onChange` property of the input tag is invoked every time the value of the input element changes.

- When the submit event is fired on the form, the function `submitTodoHandler` is executed. We are checking that the input is not empty before creating a new todo using the `addTodo` function passed down from `App` component.

- The method `setInputText` with an empty string as its argument inside the `submitTodoHandler` will reset the input tag.

The todo object that we pass the `addTodo` function should have a structure like:

```javascript
{
  id: v4(),
  task: task,
  complete: false
}
```

In the Todo object that we are passing to the `addTodo` function:  

- The ID is a unique identifier or key for a specific todo task. I am using the `uuid` library to generate a unique id.

  You can install the `uuid` package from the `npm` registry using this command in your terminal:

  ```bash
  npm install uuid
  ```

- The complete property in the object is a boolean that is used to track whether the todo task is completed or not. If the task is complete, we'll use a CSS class that adds a strike-through on the todo task marking it as complete.

### Creating the TodoList Component
This is the component that acts as a container to the list of the todo items.

You need to create a new file named `TodosList.js` inside the components folder. Since our `Todo` component is a child of the `TodoList` component, we should create the `TodoList` component first.

The `TodoList` component is recieving the list of todos from the App component. We have [lifted its state up](https://reactjs.org/docs/lifting-state-up.html) in the App component so that our `TodoList` can access it via props.

To create this component, go into your components folder and create a new file named `TodoList.js`.

This is the code for the `TodoList.js`:

```javascript
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, setTodos }) => {

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.completed=!todo.completed;
      }
      return todo;
    })
    setTodos(updatedTodos);
  };
  
  const removeTodo=(id)=>{
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo key={todo.id}
            todo={todo}
            completeTodo={completeTodo} 
            removeTodo={removeTodo}/>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

In this component:

- The `TodoList` is receiving `todos` as an array of objects from the `App` component as a prop.
  
- We map through the `todos` and return a JSX syntax with a new Todo component as the todo item.
  
- The `removeTodo` is a function which accepts an `id` that uniquely identifies the `todo` in our list.

- We will use the `completeTodo` method to toggle between not completed and completed state using the ID of the todo that we recieve as an argument when the function is called.

### The Todo component
You need to add a new file and name it `Todo.js` in the components folder.

We created the functions that perform the complete and delete operations in our `TodoList` component. 

This is the code for the `Todo.js`:

```javascript
import React from 'react';

const Todo=({ todo, completeTodo, removeTodo}) => {
    
    const HandleComplete = () => {
      completeTodo(todo.id);
    }
    const HandleDelete = () => {
      removeTodo(todo.id);
    }

    return(
      <div>
        <div className="todo">
        <li className={todo.completed ? "checked" : ""}>
            {todo.text}
        </li>
        <button onClick={HandleComplete} className="check-btn">{todo.completed?"Uncheck":"Check"}</button>
        <button className="delete-btn" onClick={HandleDelete}>Delete</button>
        </div>
      </div>
    );
}

export default Todo;
```

### Application Styling
This CSS file should be named `App.css` which should be in the `src/` folder like our `App.js` file.

```css
body{
  background-color: rgb(72, 72, 247);
  font-size: 1.2rem;
  max-width: 100vw;
  max-height: 100vh;
}

input{
  padding:1.3rem 5rem;
  border:none;
  font-size: 1.1rem;
}
.add-btn{
  padding: 1.3rem;
  font-size: 1.1rem;
}

button{
  border:none;
  margin-right: 5px;

}

button:hover{
  transform: scale(0.98);
  transition: linear 0.8s;
  cursor: pointer;
}
.checked{
  color:rgb(240, 240, 247);
  text-decoration: line-through;
}
.todo{
  display: flex;
}

.check-btn{
  color:rgb(14, 14, 14);
  background-color: rgb(95, 130, 245);
}
.delete-btn{
  color: rgb(247, 238, 242);
  background-color: rgb(255, 38, 38);
}
```

### The React Application so far
So far, your applicaation should look like this:

![React-PWA-image](/engineering-education/react-pwa/react-pwa1.png)

![React-PWA-image2](/engineering-education/react-pwa/react-pwa2.png)


### Adding functionality to make it a Progressive Web App
In this part, we will implement the Progressive Web App features. Some features of a progressive web app include:

1. A Progressive web App must be able to work offline.
   
2. It must be discoverable and installable.

3. Safety as it should rely on the HTTPS protocol.

4. Should look and feel like native apps i.e run on a fullscreen mode etc.
  
Our application will add functionalities such as running the application offline, caching assets by registering service workers, and also installing it on the end user's device home screen.

### Registering a service worker
A service worker is a script that runs in the browser's background. It handles network intercepts from requests and managing caching for offline availability.

Inside our `public` folder, open the index.html file. Below the file, add the following code. The code below will be inside a script tag.

```html
<script>
  if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
      navigator.serviceWorker.register('./serviceworker.js')
      .then(registration=>console.log('Success',registration.scope))
      .catch(err=>console.log("Error",err))
    })
  }
</script>
```

In the above code:

- The `if statement` is checking if the browser supports service workers.

- This should return a boolean. When this is returns true, a service worker is registered pointing to the file named `serviceWorker.js` on the `load` event listener.

Now that our service worker is registered, we will create the worker file named `serviceworker.js` inside the `public` directory.

The `serviceworker.js` file will have the following code.

```javascript
const CACHE_NAME = "version-1"
const urlsToCache = [" index.html","offline.html"]

const self = this;

// istall service worker
self.addEventListener("install",(e)=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log("Opened cache...")
      return cache.addAll(urlsToCache)
    })
  )
})

// listen request
self.addEventListener("fetch",(e)=>{
  e.respondWith(
    caches.match(e.request)
    .then(()=>{
      return fetch(e.request)
              .catch(() => caches.match('offline.html'))
    })
  )
})

// activate service worker
self.addEventListener("activate",(e)=>{
    const cacheWhitelist=[]
    cacheWhitelist.push(CACHE_NAME);

    e.waitUntil(
      caches.keys().then((cacheNames)=>Promise.all(
        cacheNames.map((cacheName)=>{
          if(!cacheWhitelist.includes(cacheName)){
            return caches.delete(cacheName)
          }
      })
    ))
  )
})
```

This code does the following:

- We are starting with the install step. At this step, we are trying to cache some static assets that will be available offline.

- This returns a promise to install the service worker when we've cached our assets.

- The activate listener will manage our old caches and activate the service worker. 

- The `CACHE_NAME` variable will help us fetch resources from the cache when offline. The `offline.html` file is the fallback markup file when there is no cache.

- The `self` in the `self.addEventListener` references this keyword of the global service worker itself.

### Editing index.html file and Manifest
I will use these default icons that is already in the `public` folder. The `favicon.ico`, `logo192.png`, and `logo512.png` are icons that the user will see on the tab of a mobile or a desktop device.

`manifest.json` is a JSON file that has metadata to describe how the app will appear to the user.

```HTML
<link rel="manifest" href="./manifest.json" />
```

In our `manifest.json` file, the code contains icons used as images of different sizes
on the home screen.

```JSON
{
  "short_name": "React PWA",
  "name": "A React Todo PWA",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#F4BD42",
  "background_color": "#2B2929",
  "scope":"/"
}

```

We need to link the manifest file to the `index.html` file.

The `index.html` file should look like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="./favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Todo Web App on PWA"
    />
    <link rel="apple-touch-icon" href="./logo192.png" />
    <link rel="manifest" href="./manifest.json" />
    <title>React Todo PWA</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script>
      if("serviceWorker" in navigator){
        window.addEventListener("load",()=>{
          navigator.serviceWorker.register('./serviceworker.js')
          .then(registration=>console.log('Success',registration.scope))
          .catch(err=>console.log("Error",err))
        })
      }
    </script>
  </body>
</html>
```

### Performance of the App
I have used [lighthouse](https://developers.google.com/web/tools/lighthouse) to generate an audit report. Lighthouse is an open-source automated tool for improving the quality of web pages. It has audits for performance, accessibility, progressive web apps,SEO and more. In the current versions of Google Chrome, the tool will come pre-installed in the developer tools. Our App scores 89/100 on performance.


> Note: This application will not pass the HTTPS audit in the development environment. So if we need hosting, make sure the production web-server supports HTTPS.

Here is the final version of the App:

![PWA Performance](/engineering-education/react-pwa/performance.png)

![PWA install](/engineering-education/react-pwa/install.png)

![Requirements for PWA](/engineering-education/react-pwa/requirements.png)

Our app is now installable by clicking on the plus(+) icon in google chrome. The cache will make it available for offline use.

Check the deployed app on [netlify](https://reactify-pwa.netlify.app/) and the project in my repository [here](https://github.com/ReactifyStudio/React-Progressive-Web-App).

### Summary
In summary, we learned how to create a Todo app using the React library, with outstanding features such as React Hooks and functional components. We created a Form input and functionality to add todo tasks, mark them as complete and delete the todo tasks. We then explored some introduction to Progressive Web Apps and turned our Todo app into a PWA.
