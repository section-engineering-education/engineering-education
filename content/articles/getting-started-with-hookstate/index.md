The React library has undergone massive developments in recent times, resulting in various state management libraries. With React projects making use of an enormous code base, there is a need to centralize and maintain code and handle data flow across the application. State Management manages code and data maintenance, improving code quality and data sharing between application components. 

The concept of state in React development is crucial - what it is, how to properly manage it, and how to handle complexity as the application grows.

### Goal

In JavaScript web applications, state refers to the object that holds information generated through user actions. Since in modern applications we break the UI into components, these components depend on dynamic data. This article will cover the essentials of state management and the efficiencies that the Hookstate library provides in React applications.

### Prerequisites

- A web browser such as [Google Chrome](https://www.google.com/chrome/browser-tools/).
- A code editor such as [VS Code](https://code.visualstudio.com/) or an IDE.
- Knowledge of the [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) programming language.
- Basics of the [React library](https://reactjs.org/).
- Have a Node.js LTS or later version on your development environment. You can download [here](https://nodejs.org/en/download/).

### Understanding State and Hookstate

In a nutshell, state management is a pattern in which we control the communication and sharing of data across the reusable components of the modern [frontend frameworks](https://www.sitepoint.com/most-popular-frontend-frameworks-compared/). To achieve this, our application wraps data in a data structure that will represent our application's logical state that we can access and manipulate to transition between these states. Often, the changes are made depending on the user's actions.

A case study can be an e-commerce application. To build such an app, we can break the UI into components such as `Button`, `Cart`, `Checkout`, `Login`, and more. When a user adds an item to the `Cart` component or performs a successful login, these actions will alter the state of the component and hence the entire application. In a large application, it can become tedious work to track the global state while still [prop drilling] is complicated and redundant. This is where state management libraries come in.

Hookstate library takes the management of state in React to a new level. The library wraps the concept of the declarative React `useState` to a global version and extends it with useful features.

### Application setup

To generate a new React app, we will use the `create-react-app` CLI utility.

```bash
npx create-react-app hookstate-demo
```

Next, navigate inside the `hookstate-demo` folder on your terminal and install the `hookstate`, and `uuid` packages. Run the command:

```bash
npm install --save @hookstate/core uuid
```

With our setup done, let's head over to our `./src` folder to build our global state and components.

###  Creating the Global Store

To create and manage a global state, add a folder in your `src` directory and name it `states`. Inside the states folder, we will create a `TaskState.js` file where we will 

Creates a new state and returns it. This is mainly used to create a global state of an application. Unlike useState you can destroy this state by calling destroy() method to delete the state(only applicable for special scenarios).

To create a global state, import the `uuid`, and the `@hookstate/core` package. 

```js
import { createState, useState } from "@hookstate/core";
const { v4: uuidv4 } = require("uuid");
```

Notice that the `useState` hook is similar to React's built-in hook. Where we are using both hooks in one file, we can use an alias to remove the conflicting cases.

Belo our imports, instantiate the `createState` to create and a new state, it is an empty array.

```js
const taskState = createState([]);
```

Lastly, create and export the `useTaskState` custom hook:

```js
export function useTaskState() {

  // assign state
  const state = useState(taskState);

  return {
    // addTask method takes the new state and returns a new state using the .set(method)
    addTask(text) {
      return state.set((tasks) => [...tasks, { text, id: uuidv4() }]);
    },

    // we can filter task lists to remove a list item
    removeTask(id) {
      return state.set((tasks) => tasks.filter((task) => task.id !== id));
    },

    // state.get() retieves the Todo list state 
    get getTasks() {
      return state.get();
    }
  };
}
```

With global state, Hookstate provides the `get` method on the newly created state, and the `set` method to set a new state. In our case, we will manipulate a list of todo tasks. The `uuid` module generates a random ID for each item on the todo list. This simplifies the way we need to organise our application structure. 

### The `AddTodo` component

```js
import React from "react";
import { useTaskState } from "../states/TaskState";

const AddTodo = () => {
  const taskState = useTaskState();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.target["toDo"].value.trim()) {
            return;
          }
          taskState.addTask(e.target["toDo"].value);
          e.target["toDo"].value = "";
        }}
      >
        <input name="toDo" />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
```

### The `TodoList` component

```js
import React from "react";
import { useTaskState } from "../states/TaskState";

const ToDoList = () => {
  const taskState = useTaskState();
  const state = taskState.getTasks;
  return (
      <ul>
        {state.length > 0 &&
          state.map((toDo) => (
            <li key={toDo.id}>
              <span>{toDo.text}</span>
              <button onClick={() => taskState.removeTask(toDo.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
  );
};

export default ToDoList;
```

### The `App.js` Component

```js
import { useTaskState } from "./states/TaskState";
import ToDoList from "./components/ToDoList";
import AddTodo from "./components/AddTodo";

// 

export default function App() {
  const taskState = useTaskState();
  console.log(taskState.getTasks);
  return (
    <div className="App">
      <AddTodo />
      <ToDoList />
    </div>
  );
}

```

### Demo

![todo demo]()

![todo task demo]()

For more, check the project source code on [GitHub](https://github.com/marienjus/hookstate/).


### Conclusion
Choosing the right state management library for your project will be a huge factor in the development of your React applications. The Hookstate library provides a flexible, customizable, and easy to learn API that wraps the inbuilt React Hooks. It allows us to track the application's state in a more predictable manner making it easy to tackle the state management for React developers. Happy coding!
