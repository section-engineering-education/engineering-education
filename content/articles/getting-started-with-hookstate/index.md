
The React library has undergone massive developments in recent times, resulting in various state management libraries. With React projects making use of an enormous code base, there is a need to centralize and maintain code and handle data flow across the application. State Management manages code and data maintenance, improving code quality and data sharing between application components. 

One of the most important concepts for every React developer to understand is state – what it is, how to properly use it, and how to avoid common pitfalls as you build your applications.

### Goal

In JavaScript web applications, state refers to the the object that holds information generated through user actions. Since in modern applications we break the UI in components, this components depend on dynamic data. This article will cover the essentials of state management and the efficiencies that the Hookstate library provides in React applications.

### Prerequisites

- A web browser such as [Google Chrome](https://www.google.com/chrome/browser-tools/).
- A code editor such as [VS Code](https://code.visualstudio.com/) or an IDE.
- Knowledge of the [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) programming language.
- Basics of the [React library](https://reactjs.org/).
- Have a Node.js LTS or later version on your development environment. You can download [here](https://nodejs.org/en/download/).

### Understanding State and Hookstate

In a nutshell, state management is a pattern in which we control the communication and sharing of data across the reusable components of the modern [frontend frameworks](https://www.sitepoint.com/most-popular-frontend-frameworks-compared/). To achieve this, our application wraps data in a data structure that will represent our application logical state that we can access and manipulate to transition between these states. Often, the changes are made depending on the user's actions.

A case study can be an e-commerce application. To build such app, we can break the UI into components such as `Button`, `Cart`, `Checkout`, `Login`, and more. When a user adds an item to the `Cart` component, or performs a successful login, this actions will alter the state of the component and hence the entire application. In large application, it can become a tedious work to track the global state while still [prop drilling] is complicated and redundant. This is where state management libraries comes in.

Hookstate library takes the management of state in React to a new level. The library wraps the concept of the declarative React `useState` to a global version and extends it with useful features.

### Application setup

To generate a new React app, we will use the `create-react-app` CLI utility.

```bash
npx create-react-app hookstate-demo
```

Next, navigate inside the `hookstate-demo` folder on your termnial and install the `hookstate` package. Run the command:

```bash
npm install --save @hookstate/core
```

###  Creating the Global Store

We use the createState function to create a global state.

We call get to get the current state.
And we call set to set the new state.

<!-- Note: If you are using useState from both React and hookstate, make sure to alias useState from @hookstate/core to eliminate a naming conflict with React’s useState. -->

`TaskState.js`

```js
import { createState, useState } from "@hookstate/core";
const { v4: uuidv4 } = require("uuid");

const taskState = createState([]);

export function useTaskState() {
  const state = useState(taskState);

  return {
    addTask(text) {
      return state.set((tasks) => [...tasks, { text, id: uuidv4() }]);
    },
    removeTask(id) {
      return state.set((tasks) => tasks.filter((task) => task.id !== id));
    },
    get getTasks() {
      return state.get();
    }
  };
}
```

<!-- The store folder will hold our state. We’ll create a AuthStore file and it will implement a global state and will act as a Model in MVC Pattern
Our stores will expose react hook: useAuthState() that can be used on our page later. -->

<!-- createState
Creates a new state and returns it. This is mainly used to create a global state of an application. Unlike useState you can destroy this state by calling destroy() method to delete the state(only applicable for special scenarios). -->

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


### Demo

![todo demo]()

![todo task demo]()

For more, check the project source code on [GitHub](https://github.com/marienjus/hookstate/).


### Conclusion
Choosing the right state management library for your project will be a huge factor in development of your React applications. The Hookstate library provides a flexible, customizable, and easy to lwarn API that wraps the inbuilt React Hooks. 
It allows us to track the application's state in a more predictable manner making it easy tackle the state management for React developers. Happy coding!
