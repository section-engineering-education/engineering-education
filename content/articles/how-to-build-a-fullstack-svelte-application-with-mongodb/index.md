---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-fullstack-svelte-application-with-mongodb/
title: Building a fullstack Svelt Application with MongoDB
description: This tutorial will teach the readers more about Svelte and how to create a Svelte application with MongoDB.
author: joseph-chege
date: 2021-12-30T00:00:00-05:03
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-fullstack-svelte-application-with-mongodb/hero.jpg
    alt: Building a fullstack Svelt Application with MongoDB Hero Image
---

Svelte is a new fronted JavaScript approach to building user interfaces. This introduces a new alternative that we can use besides React, Angular, Vue. However, Svelte is a compiler, whereas the other alternatives are frameworks/libraries. 
 <!--more-->
When you build your apps with Svelte, you run the Svelte compiler that automatically goes over your code and files. This creates bundled JavaScript instructions that execute in the DOM at runtime. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.

With such an amazing frontend technology, connecting to backend services and accessing data from a server will be essential. This guide teaches more about Svelte and how to create a Svelte application with MongoDB.

### Prerequisites
To follow along with this article, it is helpful to have the following;
- [Postman](https://www.postman.com/downloads/) installed on your computer.
- [MongoDB server](https://www.mongodb.com/try/download/community) installed on your computer.
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge using Postman, Node.js, MongoDB, and Svelte.

### Setting up a Node.js backend API with MongoDB
Create a directory in your desired project folder and name it `server`. Navigate to the `server` directory using the command;

```bash
cd server
```

Initialize a Node.js application with default configurations;

```bash
npm init -y
```

Below are the packages we need to set up a Node.js MongoDB backend.

- [Express](https://www.npmjs.com/package/express): Fast and easy to work with Node.js framework while creating minimalist servers.
- [Mongoose](https://www.npmjs.com/package/mongoose): Provide MongoDB Object modelling tool for Node.js.
- [Nodemon](https://www.npmjs.com/package/nodemon): A Node.js development library for automatically restarting when adding new code blocks to a Node.js development server.
- [Cors](https://www.npmjs.com/package/cors): For enabling cross-origin communication between Svelte client and the Node.js server

Use the following command to install the above-listed Node.js packages.

```bash
npm i express mongoose cors
```

```bash
npm i --save-dev nodemon
```

To use the Nodemon artifacts, we need to modify the `package.json` file. To do this, add the following script tag in the `package.json` `scripts` section,

```js
"dev":"nodemon ./src/server.js"
```

We will use the command above to run and restart the Node.js server that we will build.

### Setting up a primary express Todo server
Create an `src` directory within your `server` directory.

```bash
mkdir src
```

Here we will create and set up a Node.js Express server. Inside `src`, create a `server.js` file and;

- Set up a basic Express application as follows;

```js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Initiate MongoDB and start server
app.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your_preferred_db_name', { useNewUrlParser: true }).then((response) => {
        console.log(`Connected to MongoDB and server started on PORT ${PORT}`);
    }).catch((err) => {
        console.log(err);
    })
});
```

This snippet will set up an Express application by Initializing Express middleware to parse incoming requests with JSON payloads; It will also initialize a MongoDB connection and start the server on a localhost port. Start your development server by running the command below;

```bash
npm run dev
```

This command will trigger the Nodemon script that we set in the `package.json`. Any code you add to your server code base will automatically restart without running the NPM server script.

- Define the `Todo` schema;

```js
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title: String,
    description: String,
});
const Todo = mongoose.model('Todo', todoSchema);
```

- Setup a route for getting all todos;

```js
app.get('/api/todos', async (req, res, next) => {
    const todos = await Todo.find();
    return res.json(todos);
});
```

- Setup a route for adding a new todo;

```js
app.post('/api/todos', async (req, res, next) => {
    const todo = new Todo(req.body);
    // save todo to database
    await todo.save();
    return res.json(todo);
});
```

- Setup a route for deleting an existing todo;

```js
// Delete a todo
app.delete('/api/todos', async (req, res, next) => {
    // find todo by id and delete
    await Todo.findByIdAndDelete(req.body.id);                   

    return res.json({
        message: 'Todo deleted successfully',
        success: true,
    });
});
```

Ensure that the development server is still running, then open Postman and send a `POST` request to `http://localhost:4000/api/todos`. Then, select `Raw` at the body's tab, set `JSON` as the body format, add the following sample data, and hit `Send`.

```JSON
{
"title":"Coding in JavaScript",
"description":"I am coding in JavaScript"
}
```

The response on the Postman `Body` section should be similar to;

![adding-todos-response](/engineering-education/how-to-build-a-fullstack-svelte-application-with-mongodb/adding-todos-response.png)

You can also send a `GET` request to `http://localhost:4000/api/todos` to fetch the added data.

![getting-todos-response](/engineering-education/how-to-build-a-fullstack-svelte-application-with-mongodb/getting-todos-response.png)

### Setting up a Svelte application
To set up a Svelte application, we will use [vite](https://vitejs.dev/). So, in the project folder (outside the `server` folder), create a new directory, name it `client`. 

We will create the Svelte backend within this `client` directory. Then, run the following command to initialize the Svelte application.

```bash
npm init vite@latest
```

This command creates an interactive command interface that will let you create a basic Svelte application. To do so;

- Enter the project name as `svelte-todos-app`.
- Select `svelte` as the base framework.
- For the listed variant, select `svelte`.

This will create a Svelte application within a `svelte-todos-app` directory. Navigate to your project;

```bash
cd svelte-todos-app
```

Then install the project dependencies using this command;

```bash
npm install
```

Finally, start the Svelte development server by running the following command.

```bash
npm run dev
```

You can access your basic Svelte application on your browser using `http://localhost:3000`.

![default-svelte-landing-page](/engineering-education/how-to-build-a-fullstack-svelte-application-with-mongodb/default-svelte-landing-page.png)

### Creating Svelte components
We will be writing three Svelte components;

- `Todo`: This will be the component that will render the data as passed as a prop from the `Todos` component.
- `Todos`: This will be the component that will retrieve the list of components from the backend and render each through the `Todo` component.
- `AddTodo`: This will be the component that will get the user data through a form and pass it to the backend API.

Go ahead and create `Todo.svelte`, `Todos.svelte`, and `AddTodo.svelte` files inside the `lib` directory and start setting up your component.

#### Setting up the Todo component
In the *Todo.svelte* file, start by creating a prop used to render data.

```js
<script>
    export let todo;
    async function deleteTodo(todo) {
const response = await fetch('http://localhost:4000/api/todos/', {
        method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: todo._id
    })
});
    const data = await response.json();
    if(data.success){
        window.location.href = '/';
    }
}
</script>
```

Then render the data the way we want to display it on a web page.

```js
<article>
    <div class="todo-info">
        <h1>{todo.title}</h1>
        <p>
            {todo.description}
        </p>
    </div>
    <div class="todo-actions">
        <button on:click={
            () => deleteTodo(todo)
        }>Delete</button>
</article>
```

Finally, add some little CSS styling to arrange the page components.

```css
article {
    width: 100%;
    margin: 10px 5px;
    padding: 10px;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    display: flex;
    justify-content: space-between;
}

.todo-actions button {
    background: #f5f5f5;
    border: 1px solid #d4d4d5;
    border-radius: 3px;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    text-transform: uppercase;
}
```

#### Setting up the Todos component
In the `Todos.svelte` file, begin by importing the `onMount()` method and the `Todo` component.

```js
<script>
import {onMount} from "svelte";
import Todo from "Todo.svelte";
```

- Define the variable to hold our todos.

```js
let todos = [];
```

- Define an `async` `onMount()` function to fetch the todos when the component is rendered.

```js
onMount(async () => {
    await fetch(`http://localhost:4000/api/todos/`)
        .then(r => r.json())
        .then(data => {
            todos = data;
        });
});

</script >
```

- Iterate through each todo retrieved and pass them through as a prop to the `Todo` component.

```js
{ #if todos }
{ #each todos as todo }
<ul>
    <li>
        <Todo {todo} />
    </li>
</ul>
{/each}
{:else }
<p class="loading">loading...</p>
{ /if}
```

This will check whether the `todos` data is retrieved, if yes, then we can iterate them over, sending each as a prop to the `Todo` component. If the data has not been retrieved yet, we show a `loading` action.

- Add the following styles.

```css
<style>ul {
    width: 80%;
    margin: 10px auto;
    list-style-type: none;
    padding: 0px;
}

li {
    display: block
}

.loading {
    opacity: 0;
    animation: 0.5s 0.6s forwards fade-in;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

</style>
```

#### Setting up the AddTodo component
This component will provide a form where users will enter new todo details. In `AddTodo.svelte` file, add a function in the `script` section to handle `onsubmit`.

```js
<script>
    async function onSubmit(e) {

    // Get the data from the form
    const formData = new FormData(e.target)
    const data = { };
    for (let field of formData) {
        const [key, value] = field;
    data[key] = value;    
    }
    // Send data to the API
    await fetch('http://localhost:4000/api/todos/',{
        method:'POST',
    body: JSON.stringify(data),
    }).then(
        () => {
        // reload current page
        window.location.href = '/';
        }
    )     
}
</script>
```

Then show this form to a web page.

```js
<div class="form-container">
    <form on:submit|preventDefault={onSubmit}>
    <div class="form-group">
        <input
            type="text"
            id="title"
            name="title"
            placeholder="Title of todo."
        />
    </div>
    <div class="form-group">
        <textarea
            id="description"
            name="description"
            placeholder="Todo's description"
            cols="30"
        />
    </div>
    <div class="form-group">
        <button type="submit">Submit</button>
    </div>
</form>
</div >
```

Finally, add some CSS styling.

```css
<style>.form-container {
    width: 80%;
    margin: 10px auto;
}

form {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}

.form-group {
    margin: 10px;
    width: 30%;
}

.form-group input[type="text"] {
    padding: 10px;
}

.form-group textarea {
    padding: 10px;
}

button {
    background: #f5f5f5;
    border: 1px solid #d4d4d5;
    border-radius: 3px;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    text-transform: uppercase;
}

</style>
```

### Bundling up the components
We will render our application through the main component, `App.svelte`. Rewrite the `App.svelte` component as follows;

```js
<script>
  import Todos from './lib/Todos.svelte';
  import AddTodo from './lib/AddTodo.svelte';
</script>

<main>
  <h1>Todo List</h1>
  <AddTodo />
  <Todos />
</main>

<style>
  main {
    padding: 1rem;
    width: 80%;
    margin: 0px auto;
  }
  h1 {
    text-align: center;
  }
</style>
```

Ensure your development server is up and running and go to `http://localhost:3000` to test if the todos application is working.

![todos-homepage](/engineering-education/how-to-build-a-fullstack-svelte-application-with-mongodb/todos-homepage.png)

### Conclusion
Svelte is used to build frontend applications like React, Angular, and Vue. There might be a need to connect to a backend server that uses a database such as MongoDB. 

This guide helped you build a complete full-stack reactive Svelte-inspired application. I hope that was of assistance to you.

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)