
React.js has undergone massive developments in recent times, resulting in various state management libraries. With React projects making use of an enormous code base, there is a need to centralize and maintain code and handle data flow across the application. State Management manages code and data maintenance, improving code quality and data sharing between application components. 


### Goal

In JavaScript web applications, state refers to the the object that holds information generated through user actions. Since in modern applications we break the UI in components, this components depend on dynamic data. In this article, we will discuss Hookstate library and how it simplifies state management in React functional components.

### Prerequisites

- A browser such as Google Chrome
- A code editor such as VS Code or an IDE.
- Knowledge of the JavaScript programming language.
- Basics of the React library.
- Have a Node.js LTS or later version on your development environment.

### Understanding State and Hookstate

Hookstate uses React hook to do state management so developers can be familiar with it.

### Application setup
To scaffold a React app, we will use the `create-react-app` CLI utility.

```bash
npx create-react-app hookstate-demo
```
And install other dependencies we need for the project.

```bash
npm install --save @hookstate/core
```

###  Creating the Global Store


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


### Conclusion

Choosing the right state management library for your project will be a huge factor in development of your React applications. 
With Hookstate library wrapping React Hooks to tackle the state management challeng, React developers ...
