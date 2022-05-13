---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-hookstate/
title: Getting Started with HookState Library
description: In this article, we will learn about HookState library. We will also build a simple Todo application to understand how it is working.
author: mary-njeri
date: 2022-02-22T00:00:00-01:24
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-hookstate/hero.png
    alt: Getting Started with HookState library example image
---
React.js is a mature JavaScript library for declarative and dynamic user interfaces. React.js breaks the UI into components. The concept of state is critical in React.js programming.
<!--more-->
We need to know what a state is, how to maintain it efficiently, and how to deal with increasing complexity as the application expands.

In this article, we will learn the basics of state management in React.js using the [Hookstate](https://hookstate.js.org/) library.

### Table of contents
- [Pre-requisites](#pre-requisites)
- [Understanding state management](#understanding-state-management)
- [Why use state management libraries?](#why-use-state-management-libraries)
- [Application setup](#application-setup)
- [Create the global state](#create-the-global-state)
- [Create `AddTodo` component](#create-addtodo-component)
- [The `TodoList` component](#the-todolist-component)
- [The `App.js` component](#the-appjs-component)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Pre-requisites
As a pre-requisite, the reader must have the following:
- A web browser such as [Google Chrome](https://www.google.com/chrome/browser-tools/).
- A code editor such as [VS Code](https://code.visualstudio.com/) or any preferred IDE.
- Knowledge of the [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) programming language.
- Basics of the [React library](https://reactjs.org/).
- Have a [Node.js]((https://nodejs.org/en/download/)) LTS or later version on your development environment.

### Understanding state management
In a nutshell, state management is a pattern in which we control the communication and sharing of data across the reusable components of the modern [frontend frameworks](https://www.sitepoint.com/most-popular-frontend-frameworks-compared/).

Our application encapsulates data in a data structure that reflects the logical state of the application that we can use to access and change to transition between various states.

The status of the application ("state") changes as a result of the user's actions.

A case study can be an e-commerce application. For example, an e-commerce website can have components such as `Button`, `Cart`, `Checkout`, `Login`, and many more.

When a user adds an item to the `Cart` component or performs a successful login, these actions will alter the state of our component and hence the entire application.

### Why use state management libraries?
In modern frontend applications, we break the UI into logical reusable components. These components often need dynamic data to share and pass around.

In an extensive application, keeping track of the global state while avoiding `prop` drilling can be difficult. That is where state management libraries come in.

Unlike [redux](https://react-redux.js.org) which uses reducers, dispatch, and actions that can sometimes be confusing, the Hookstate library takes the concept of state in React to a new level.

The Hookstate library wraps the idea of the declarative React `useState` to a global version and extends it with extra features.

Some of its core features include:
- A plugin system to persist and state validate to extend the library features.
- Hookstate's standard TypeScript support for state management.
- Support for asynchronous and partial state updates in deeply nested components and more.

### Application setup
To scaffold a new React application, we will use a new frontend build tool, [Vite](https://vitejs.dev/).

Vite optimizes the build process for developers by bundling the pre-configured code using [Rollup](https://rollupjs.org/guide/en/) rather than [Webpack](https://webpack.js.org).

To start a Vite app with a basic React template, type the following command:

```bash
npm init vite@latest hookstate-demo -- --template react
```

Next, navigate inside the `hookstate-demo` folder on the terminal and execute the `npm install` command:

```bash
npm install
```

Next, add the `hookstate` and `uuid` packages to the project as shown:

```bash
npm install --save @hookstate/core uuid
```

Lastly, spin up a development server on your browser by running the command:

```bash
npm run dev
```

![terminal output](/engineering-education/getting-started-with-hookstate/terminal.png)

If we switch to our browser and access the URL `http://localhost:3000/`, we should see something similar to this:

![browser demo](/engineering-education/getting-started-with-hookstate/initial-browser-screen.png)

### Create the global state
To create and manage a global state, add a folder in your `src` directory and name it `states`.

Now, we'll create a `TaskState.js` file under the `states` folder containing a custom hook. Our function will invoke Hookstate's method `createState([])` to create a new state and return it.

Import the `uuid` and the `@hookstate/core` package to create a global state.

```js
import { createState, useState } from "@hookstate/core";
import {v4 as uuid} from "uuid";
```

> Note: The `useState` hook resembles React's built-in hook. When accessing hooks simultaneously in a single file, an alias is helpful to eliminate ambiguity.

Below the library import, instantiate the `createState` to create a new state.

```js
// Initial state - empty array.
const taskState = createState([]);
```

Lastly, let's create a custom hook to reuse when manipulating the state in our components. Create and export the `useTaskState` function:

```js
export function useTaskState() {
}
```

Inside the function body, add the `state` variable to initiate the state from the `useState`:

```js
// assign state
const state = useState(taskState);
```

Finally, return the following functions:

```js
return {
    // addTask method takes the new state and returns a new state using the .set(method)
    addTask(newTask) {
        return state.set((tasks) => [...tasks, { newTask, id: uuid() }]);
    },
    // filter task lists to remove a list item
    removeTask(id) {
        return state.set((tasks) => tasks.filter((task) => task.id !== id));
    },
    // state.get() retieves the Todo list state
    get getTasks() {
        return state.get();
    }
};
```

Let's briefly dissect the above code snippet:
- The `addTask` method accepts a `newTask` parameter that represents the user value in the input field. Finally, the function returns `state.get` from Hookstate to perform mutations and add a new task.
- `getTasks` method will access the global store by returning the `state. get` method that works the same as React's in-built `setState` hook.
- Finally, the `removeTask` method accesses the global state and filters out the task by ID.

### Create AddTodo component
The `AddTodo` component handles the user input to render a new to-do item. Define the `AddTodo.jsx` file inside the `components` folder.

Our component will reuse the previous custom `useTaskState` to access the global state:

```js
import { useTaskState } from "../states/TaskState";
```

Inside our return statement, we add an input form that accepts a new to-do item. When a user submits the form, we invoke the `onSubmit` event handler to add the new item.

Create the `AddTodo` function as shown below:

```js
const AddTodo = () => {
    const taskState = useTaskState();
    return (
        <div>
            <form
                onSubmit={(e) => {
                e.preventDefault();
                // trim white spaces
                if (!e.target["toDo"].value.trim()) {
                return;
                }
                // add new to-do item
                taskState.addTask(e.target["toDo"].value);
                e.target["toDo"].value = "";
                }}
            >
                {/*An input element and a button */}
                <input name="toDo" />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};
```

Finally, export our function by default:

```js
export default AddTodo;
```

### The TodoList component
The `TodoList` component contains our `todo` items. Inside your `components` folder, add the `TodoList.jsx` file with the code below:

```js
import { useTaskState } from "../states/TaskState";

const ToDoList = () => {
    const taskState = useTaskState();
    const state = taskState.getTasks;
    return (
        <ul>
            {state.length > 0 &&
            state.map((todo) => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    {/*Add a delete button*/}
                    <button onClick={() => taskState.removeTask(todo.id)}>
                    Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ToDoList;
```

In the above code, we do the following:
- First, we import the `useState` custom hook from our `states` folder.
- `const state = taskState.getTasks;` is the variable to access our state.
- Inside the JSX, we return an `<ul>` element with lists of available tasks by looping over them.

### The App.js component
Our main `App.js` file is quite minimal. All we need to add is the `ToDoList` component, `AddTodo` component, and `useTaskState`.

```js
import { useTaskState } from "./states/TaskState";
import ToDoList from "./components/ToDoList";
import AddTodo from "./components/AddTodo";
```

Finally, export the `App` component with the components mapped to the JSX.

```js
export default function App() {
    const taskState = useTaskState();
    return (
        <div className="App">
            <h1>TODO APP</h1>
            <AddTodo />
            <ToDoList />
        </div>
    );
}
```

### Demo
To run the program, spin up a development server on your terminal with the command:

```bash
npm run dev
```

If we head back to our browser at `http://localhost:3000/`, our final app should look similar to this:

![todo demo](/engineering-education/getting-started-with-hookstate/demo1.png)

### Conclusion
This tutorial introduced you to state management in React with Hookstate. To generate the global state and access the state store, we built a Todo app that uses the library's APIs.

You can find the project source code on [GitHub](https://github.com/marienjus/hookstate-demo).

Happy coding!

### Further reading
- [Hookstate docs](https://hookstate.js.org/).
- [Hookstate vs Redux](https://levelup.gitconnected.com/hookstate-the-simplest-state-management-tool-b02f7d3b01a4).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)