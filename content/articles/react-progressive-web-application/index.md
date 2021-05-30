---
layout: engineering-education
status: publish
published: true
url: /react-progressive-web-application/
title: React Progressive Web Application
description: In this tutorial, we will create a Todo application using React and convert it into a Progressive Web Application using service workers.
author: wilson-gichuhi
date: 2021-01-14T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-progressive-web-application/hero.jpg
    alt: React Progressive Web Application example Image
---
In this tutorial, we will create a React Todo Progressive Web App. A progressive web app refers to an enhanced web application having the same capabilities as a native platform-specific application by utilizing the emerging browser APIs. The Progressive Web Apps are intended to be fast, reliable, and engaging.
<!--more-->

### Prerequisites
1. Knowledge of the [JavaScript programming language](https://www.w3schools.com/js/DEFAULT.asp).

2. Basics of React library. Check documentation [here](https://www.reactjs.org).

3. A code editor. I will be using [VS Code](https://code.visualstudio.com/download).

4. Node.js installed on your computer. You can download the latest version [here](https://www.nodejs.org).

### Getting started
Let's start by creating a new React application using `create-react-app` command-line utility. On your terminal, execute the following command:

```bash
npx create-react-app react-pwa --template cra-template-pwa
```

This will create a folder named `react-pwa`. The argument `--template cra-template-pwa` is added to create an app with a service worker for Progressive Web App functionality since version 4 or later will not provide a built-in service worker.

You can now open the project in your favorite code editor. 

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
|--- service-worker.js
|--- serviceWorkerRegistration.js
|--- setupTest.js
|--- logo.svg
.eslintcache
.gitignore
package.json
package-lock.json
README.md
```

Our React code will be in the `src` folder. Inside this folder, delete the `logo.svg` and remove everything in both `App.css` and `App.js` files before we start to build the application.

### Creating UI components
We will have to break our application into components that represent the logical parts of the application.

We'll have four components:

1. The App component.

2. The Form component.

3. The TodoList component.

4. The Todo component.

### The App component 
Let's start with the `App` component since it is the parent component of the `TodoList` and the `Form` components.

This is the code for the `App.js`:

```javascript
import React,{useState} from 'react';

// components
import Form from './components/Form';
import TodoList from './components/TodoList';

// CSS files
import './App.css'

const App=()=>{

  const [todos,setTodos]=useState([]);

  const addTodo= todo=>{
    const newTodos=[todo,...todos];
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

In this component:

- We import the `TodoList` and `Form` component which we will create in the next steps.

- The `useState` hook is used to create the `todos` state which is an array of all the todos that are tracked. The `setTodos` function is used to set the `todos` state with a new value.

- The `addTodo` is a function that is used to add a new todo by calling the `setTodos` method to update the state.

- We return a div containing `<h1>` tag as the header. The `Form` and `TodoList` components are mounted with appropriate props.

- Add this code to the `App.css` file. This CSS file will style our application as we are importing this file in the `App.js`.

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

### Form component
This component will be used to add new todos. 

In your `src/` folder, create a new folder named `components`. Inside the `components` folder, you should create a file named `Form.js`. 

This is the code for the `Form.js`:

```javascript
import React,{useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const Form =({addTodo})=>{
    
    const [inputText,setInputText]=useState("");

    const inputTextHandler=(e)=>{
        setInputText(e.target.value);
    }
    
    const submitTodoHandler=(e)=>{
        e.preventDefault();
        if(inputText){
          addTodo({text:inputText, completed:false, id:uuidv4()});
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

In this component:

- The method `inputTextHandler` is set to the `onChange` property of the input tag and is invoked every time when the value of the input element changes.

- The input element is a controlled component that will be tracked by the `inputText` state. 

- When the submit event is fired on the form, the function `submitTodoHandler` is called. We are checking whether the input is not empty before creating a new todo using the `addTodo` function that's passed down from the `App` component.

- We are setting the input's value to an empty string at the end of the `submitTodoHandler` function.

The todo will be an object with a structure like:

```javascript
{
  id: v4(),
  task: inputText,
  complete: false
}
```  

- The ID is a unique identifier for a specific todo task. I am using the `uuid` library to generate a unique ID.

- You can install the `uuid` package from the `npm` registry using this command in your terminal:

```bash
npm install uuid
```

- The complete property in the object is a boolean that checks whether our todo task is completed or not. If the task is complete, we will use a CSS class that adds a strike-through on the todo task marking it as complete.

### Creating the TodoList component
This is the component that acts as a container to the list of the todo items.

You should create a new file named `TodosList.js` inside the components folder. Since our Todo component is a child of the TodoList component, we should first create the `TodoList` component.

The TodoList component is recieving todos state from the App component. We have [lifted its state up](https://reactjs.org/docs/lifting-state-up.html) in the App component so that our `TodoList` can access it via props.

To create this component, go into your components folder and create a new file named `TodoList.js`.

This is the code for the `TodoList.js`:

```javascript
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, setTodos }) => {
  const completeTodo = (id) => {
      let updatedTodos=todos.map(todo=>{
          if(todo.id===id){
              todo.completed=!todo.completed;
          }
          return todo;
      })
      setTodos(updatedTodos);
  };
  
  const removeTodo=(id)=>{
    setTodos(todos.filter(todo=>todo.id!==id));
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
- The `TodoList` is receiving `todos` as an array of objects from the `App` component as props.
  
- We map through the `todos` and return a JSX syntax with a new `Todo` component as the todo item.
  
- The `removeTodo` is a function that accepts an `id` that uniquely identifies the `todo` in the list. Todos that does not match the provided `id` are filtered and stored in the state, thus eliminating the todo with given `id`.

- We will use the `completeTodo` method to toggle between marked and completed state to determine the class to style it. 

### The Todo component
You should create a new file and name it `Todo.js` in the components folder.

This is the code for the `Todo.js`:

```javascript
import React from 'react';

const Todo=({todo,completeTodo,removeTodo})=>{
    
    const HandleComplete=()=>{
        completeTodo(todo.id);
    }
    const HandleDelete=()=>{
        removeTodo(todo.id);
    }

    return(
        <div>
            <div className="todo">
            <li className={todo.completed?"checked":""}>
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

In this component:
- Clicking the *Check* button will invoke the `HandleComplete` function that will call the `completeTodo` function from the `props` and pass the `id` of the todo.

- Clicking the *Delete* button will invoke The `HandleDelete` method will call the `removeTodo` function from `props` and pass the `id` of the todo.


### The React application so far
Your app so far should look like this:

![React-PWA-image](/engineering-education/react-progressive-web-application/react-pwa1.png)

![React-PWA-image2](/engineering-education/react-progressive-web-application/react-pwa2.png)


### Adding functionality to make it a Progressive Web App
Some features of a progressive web app include:

- A Progressive Web App must be able to work offline.

- It must be discoverable and installable.

- Safety as it should rely on the HTTPS protocol. 

- Should look and feel like native apps i.e run on a fullscreen mode etc.
  
Our application will need functionalities to run offline, caching assets by registering service workers, and also installing it on the end user's device home screen.

### Registering a service worker
A service worker is a script that runs in the browser's background. It handles network intercepts from requests and managing caching for offline availability. 

The `create-react-app` provided all the tools needed to create a Progressive Web App in React. To configure this to run offline, we should register the generated service worker file. In the project, open the file named `index.js` and find the code that looks like:

```javascript
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister() 
```

To opt in using the service worker, change the `serviceWorkerRegistration.unregister()` to `serviceWorkerRegistration.register()`. 

[Workbox](https://developers.google.com/web/tools/workbox) is a set of tools and libraries that help manage service workers and caching with the `CacheStorage` API. The Workbox handles the compiling and injection of service worker [lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle) into the app's pre-caching list. The default precaching strategy in Workbox in the `create-react-app` is cache-first. 

The Workbox tool has helped us reduce the boilerplate needed every time when working with service workers such as installations, precaching, strategies, requests routing, and activation. As this will always be generated for you, that resolves the part on how to create a service worker using React.

### Configuring the Web App Manifest
I will use these default icons in the `public/` folder. The `favicon.ico`, `logo192.png`, and `logo512.png` are icons that the user will see on the tab of a mobile or a desktop device.

The `manifest.json` is a JSON file that has metadata to describe how the app will appear to the user.

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
}
```

The functionality of these attributes in the manifest are:
- The attributes `"short_name"` and `"name"` are used within the users' home screens and icon banners respectively.
  
- The `"icons"` is an array containing the set of icons used on home or splash screens.

- The `"start_url"` is the page displayed on startup. In this case the home page.
  
- The `"display"` property will be responsible for the browser view. When standalone, the app hides the address bar and runs in a new window like a native app.
  
- Property `"theme_color"` is the color of the toolbar in the app.

- Property `"background_color"` is the color of the splash screen.

We will should link the manifest file to the `index.html` as `<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />`and add the icon that will point to the apple devices home screen as `<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />`. 

The `index.html` markup should look like:

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React Progresive Web App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

### Performance of the App
I have used lighthouse to generate an audit report. [Lighthouse](https://developers.google.com/web/tools/lighthouse) is an open-source, automated tool used for improving the quality of web pages. It has audits for performance, accessibility, progressive web apps, SEO and more. 

To test this, we should generate the production build by running `npm run build` on the terminal. When in developement mode, a static server may be used. Install one via npm by running the command `npm install serve`. To start the static server, run the command `serve -s build` and open your browser on `http://localhost:5000`.

> Note that this will not pass the HTTPS audit in the development environment. So if you need hosting, make sure the production web-server supports HTTPS. 

Try to simulating an offline experience. In your browser DevTools, in the Network tab, enable the offline checkbox and reload the app. The application should be able to work offline.

The development version performance:
![PWA Performance](/engineering-education/react-progressive-web-application/pwa-performance.png)

![Requirements for PWA](/engineering-education/react-progressive-web-application/requirements.png)

Our app is now installable by clicking the plus (+) icon on Google Chrome near bookmarks icon and available for offline use.

![PWA install](/engineering-education/react-progressive-web-application/install.png)

Check the deployed app on [Netlify](https://reactify-pwa.netlify.app/) and the project source code in the repository [here](https://github.com/ReactifyStudio/React-Progressive-Web-App).

### Summary
We learned how to create a Todo app using the React library. We created a Form input and functionality to add todo tasks, mark them as complete and delete the todo tasks. We then explored some introduction to Progressive Web Apps and turned our Todo app into a PWA.

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
