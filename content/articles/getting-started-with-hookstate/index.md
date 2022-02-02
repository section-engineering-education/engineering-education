React is a mature JavaScript library that we use to create declarative and dynamic UIs. React breaks the UI into components. However, over a large codebase, these components will need to share data between them. For this reason, the concept of state in React development is crucial. We need to understand - what it is, how to properly manage it, and how to handle complexity as the application grows.

### Table of Contents
- [Goal](#goal)
- [Pre-requisites](#pre-requisites)
- [Understanding State and Hookstate](#understanding-state-and-hookstate)
- [Application setup](#application-setup)
- [Create Global State](#create-global-state)
- [Create `AddTodo` component](#create-addtodo-component)
- [The `TodoList` component](#the-todolist-component)
- [The `App.js` Component](#the-appjs-component)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)
  
<!-- more -->
### Goal
In JavaScript web applications, state refers to the object that holds information generated through user actions. This article will cover the essentials of state management and the efficiencies that the Hookstate library provides in React applications.

### Pre-requisites
- A web browser such as [Google Chrome](https://www.google.com/chrome/browser-tools/).
- A code editor such as [VS Code](https://code.visualstudio.com/) or an IDE.
- Knowledge of the [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) programming language.
- Basics of the [React library](https://reactjs.org/).
- Have a Node.js LTS or later version on your development environment. You can download [here](https://nodejs.org/en/download/).

### Understanding State and Hookstate
In a nutshell, state management is a pattern in which we control the communication and sharing of data across the reusable components of the modern [frontend frameworks](https://www.sitepoint.com/most-popular-frontend-frameworks-compared/). To achieve this, our application wraps data in a data structure that will represent our application's logical state that we can access and manipulate to transition between these states. Often, the changes are made depending on the user's actions.

A case study can be an e-commerce application. To build such an app, we can break the UI into components such as `Button`, `Cart`, `Checkout`, `Login`, and more. When a user adds an item to the `Cart` component or performs a successful login, these actions will alter the state of the component and hence the entire application. 

In modern frontend applications, we break the UI into logical reusable components. These components often need dynamic data to share and pass around to other components. In a large application, it can become tedious work to track the global state while still avoiding props drilling. This is where state management libraries come in. Unlike redux which uses reducers, dispatch, and actions that can at times be confusing, the Hookstate library takes the concept of state in React to a new level. The library wraps the concept of the declarative React `useState` to a global version and extends it with useful features. Some of its core features include:

- A plugin system such as persistence and state validation plugin to extend the library features.
- Hookstate's standard Typescript support for managed state
- Support for asynchronous and partial state updates in deeply nested components and more

### Application setup
To scaffold a new React application, we will use a new frontend build tool, [Vite](https://vitejs.dev/). Vite optimizes the build process for developers by bundling the pre-configured code using [Rollup](https://rollupjs.org/guide/en/) rather than Webpack.

On your terminal, execute the following command to start a Vite app with a basic React template.

```bash
npm init vite@latest hookstate-demo -- --template react
```

Next, navigate inside the `hookstate-demo` folder on your terminal and execute `npm install`.

```bash
npm install
```

Next, add the `hookstate`, and `uuid` packages on the project as:
```bash
npm install --save @hookstate/core uuid
```

To test that everything is working, start the development server using the command:
```bash
npm run dev
```

![terminal output](/engineering-education/getting-started-with-hookstate/terminal.png)

If we switch to our browser and access the URL `http://localhost:3000/`, we should see the boilerplate app:

![browser demo](/engineering-education/getting-started-with-hookstate/initial-browser-screen.png)

With our setup done, let's head over to our `./src` folder to build our global state and components.

###  Create Global State

To create and manage a global state, add a folder in your `src` directory and name it `states`. Inside the `states` folder, we will create a `TaskState.js` file where we will have a custom hook. Our function will invoke Hookstate's method(`createState([])`) to create a new state and return it. This is how we create a global state of an application using the library. 

To create a global state, import the `uuid`, and the `@hookstate/core` package. 

```js
import { createState, useState } from "@hookstate/core";

import {v4 as uuid} from "uuid";
```

> Note: The `useState` hook is very similar to React's built-in hook. When accessing hooks simultaneously in a single file, an alias is useful to eliminate ambiguity.

Below the library import, instantiate the `createState` to create a new state, our initial state will be an empty array.

```js
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

- The `addTask` method takes accepts a `newTask` parameter that represents the user value in the input field. The function returns `state.get` from Hookstate to perform mutations and add a new task.
- `getTasks` method will access the global store by returning the `state.get` method that works the same as React's in-built `setState` hook.
- Finally, the `removeTask` method accesses the global state and filters out the task by ID.

### Create `AddTodo` component
The `AddTodo` component handles the user input to render a new to-do item. Define the `AddTodo.jsx` file inside the `components` folder. Our component will reuse the previous custom `useTaskState` to access the global state:

```js
import { useTaskState } from "../states/TaskState";
```

Inside our return statement, we have an input form that accepts a new to-item. When a user submits the form, we invoke the `onSubmit` event handler to add the new item. Create the `AddTodo` function as below:

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

Finally, export our function as default:
```js
export default AddTodo;
```

### The `TodoList` component

Our `TodoList` component acts as the container for our todos. Inside your `components` folder, add the `TodoList.jsx` file with the code below.

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

In the above code:
- First, we import the `useState` custom hook from our `states` folder.
- `const state = taskState.getTasks;` is the variable to access our state. 
- Inside the JSX, we return a `<ul>` element with lists of available to-do items by looping over them.

### The `App.js` Component
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
Our final app should look like this:

![todo demo](/engineering-education/getting-started-with-hookstate/demo1.png)

For more, check the project source code on [GitHub](https://github.com/marienjus/hookstate/).

### Conclusion
In this tutorial, we have built a simple Todo app with Hookstate. The library provides a flexible, customizable, and easy to learn API that wraps the inbuilt React Hooks. We can create and track the application's state more predictably. The library simplifies how we organize our application structure when tackling state management in React development. Happy coding!

### Further reading

- [Hookstate docs](https://hookstate.js.org/).
- [Hookstate vs Redux](https://levelup.gitconnected.com/hookstate-the-simplest-state-management-tool-b02f7d3b01a4).
