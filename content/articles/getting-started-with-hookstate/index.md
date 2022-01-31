
React is a mature JavaScript library that we use to create declarative and dynamic UIs. React breaks the UI into components. However, over a large codebase, these components will need to share data between them. For this reason, the concept of state in React development is crucial. We need to understand - what it is, how to properly manage it, and how to handle complexity as the application grows.

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

Scaffold a new React application using the `create-react-app` command-line tool. Open your terminal and run the command.

```bash
npx create-react-app hookstate-demo
```

Next, navigate inside the `hookstate-demo` folder on your terminal and install the `hookstate`, and `uuid` packages. Run the command:

```bash
npm install --save @hookstate/core uuid
```

With our setup done, let's head over to our `./src` folder to build our global state and components.

###  Creating the Global State

To create and manage a global state, add a folder in your `src` directory and name it `states`. Inside the `states` folder, we will create a `TaskState.js` file where we will have a custom hook. Our function will invoke Hookstate's method(`createState([])`) to create a new state and return it. This is how we create a global state of an application using the library. 

To create a global state, import the `uuid`, and the `@hookstate/core` package. 

```js
import { createState, useState } from "@hookstate/core";
const { v4: uuidv4 } = require("uuid");
```

>>>Note: The `useState` hook is very similar to React's the built-in hook. When accessing hooks simultaneously in a single file, an alias is useful to eliminate ambiguity.

Below the library import, instantiate the `createState` to create a new state, our state is an empty array.

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

To manage a global state, Hookstate provides the `get` method and `set` methods on the newly created state to access and manipulate it. The `uuid` module generates a random ID for each item on the to-do list.

### Create `AddTodo` component

Define the `AddTodo.jsx` file inside the `components` folder. Our component will reuse the previous custom `useTaskState` to access global state:

```js
import { useTaskState } from "../states/TaskState";
```

The `AddTodo` component returns JSX with a form to add a new to-do item. Create the `AddTodo` function:

```js
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
	{/*An input element and a button to add a to-do item.*/}
        <input name="toDo" />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
```

Finally, and export it on the same line:
```js
// Export component: AddTodo
export default AddTodo;
```

### The `TodoList` component

In our `TodoList` component, we will loop over our array of to-do lists and display them. Check the entire code below.

```js
import React from "react";
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
  // console.log(taskState.getTasks);
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
![todo demo](/engineering-education/getting-started-with-hookstate/demo1.png)

For more, check the project source code on [GitHub](https://github.com/marienjus/hookstate/).

### Conclusion

In this tutorial, we have built a simple Todo app with Hookstate. The library provides a flexible, customizable, and easy to learn API that wraps the inbuilt React Hooks. We can create and track the application's state more predictably. The library simplifies how we organize our application structure when tackling state management in React development. Happy coding!
