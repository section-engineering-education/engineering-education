---
layout: engineering-education
status: publish
published: true
url: /engineering-education/react-dark-mode-with-context-api-and-hooks/
title: React Dark Mode With Context API and Hooks
description: This tutorial will give readers a detailed guide on how to use context api with reducers to implement dark mode in a react application.
author: mohan-raj
date: 2020-12-26T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-dark-mode-with-context-api-and-hooks/hero.jpg
    alt: React Native Agora Livestreaming App
---
In this tutorial, we will use the React Context API in a react application to maintain the state for the theme of the application (dark/light).
<!--more-->

### Goals
By the end of this tutorial, you’ll know:

- How the Context API works.

- When to use the Context API instead of Redux.

- How to implement dark mode in a React application using React's Context API.

### Prerequisites
The fundamentals of React will not be covered in this tutorial. If you are not comfortable with the fundamentals, this is a [helpful tutorial](https://reactjs.org/tutorial/tutorial.html) that you can go through before beginning with this project.

### Overview
We'll be going through these steps in this article:

- [Context API](#context-api).
- [When to use the Context API instead of Redux](#When-to-use-React's-Context-API-instead-of-Redux).
- [Reducers](#reducers).
- [Cloning the starter code](#Cloning-the-starter-code).
- [Adding the Context and Reducer](#Adding-the-Context-and-Reducer).
- [Consuming the Context](#Consuming-the-Context).
- [Recap](#Let's-Recap).

### Context API
According to the [official documentation](https://reactjs.org/docs/context.html), Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In other words, React’s Context API is there to solve a simple problem. How to manage state that is required in multiple components (not necessarily a direct child component) without passing it all the way down.

The context API generally consists of three building blocks:

- A Context Object.

- A Context Provider.

- A Context Consumer.

We need to create a context object using the `createContext` method.

```JSX
const Context = createContext();
```

Every context object comes with a Provider component. The Provider component accepts a `value` prop to be passed to consuming components. All the consuming components must be a descendant of the provider component.

```JSX
<Context.Provider value={value}>
  {/* Children */}
</Context.Provider>;
```
To subscribe to the context object, we will use the `useContext` hook and pass the context object created by `createContext` to it.

When a component subscribes to the context object, it will read the current context value from the closest matching Provider above it in the tree.

```JSX
const context = useContext(Context);
```

### When to use the Context API instead of Redux
If you don't know about Redux, it serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion. Redux is an external library. Redux can also be used with other frameworks like [Angular](https://angular.io/), [Flutter](https://flutter.dev/), etc.

If you want to learn more about Redux, check out [this tutorial](https://redux.js.org/tutorials/fundamentals/part-1-overview).

If you are building a small application that won't benefit a lot from using Redux, you can use the Context API. The context API is also easier to implement. This will result in smaller bundle size and improved project maintainability.

But, the Context API (currently) is not built for high-frequency updates. You should only use it for low-frequency updates like the theme, authentication, etc. This is because whenever the value of the context changes, the descendant components of the Provider will be re-rendered.

### Reducers
A Reducer is a function that takes 2 arguments, the current state, and an action. Based on the type of action, the function will return a new state.

For example:

```JSX
const reducer = (state, action) => {
  switch (action.type) {
    case "TYPE_1":
      return manipulated_state;

    case "TYPE_2":
      return manipulated_state;

    default:
      return state;
  }
};
```

The `useReducer` hooks take 2 arguments, the reducer function, and the initial state. It will return the current state value and a function called `dispatch` which should be used to manipulate the state.

```JSX
const [state, dispatch] = useReducer(reducer, initialState);
```

If you pass this state and dispatch to the value prop of the Context Provider, you can consume the state and update it using the dispatch from any consumer.

### Cloning the starter code
To focus more on the use of the context API and reducers, I've prepared a starter code. You can clone it [from this repository](https://github.com/zolomohan/react-context-dark-mode-starter) on GitHub. Follow the Repository's README for instructions.

If you'd like to take a look at the final code, please refer to [this GitHub Repository](https://github.com/zolomohan/react-context-dark-mode).

In the starter code, I've set up a simple screen with text and a button to switch to dark mode. I've also written all the CSS styles required for the dark mode and the light mode. Take a look at them or feel free to edit them in `src/App.css`.

![Starter Screen](lightmode.png)

### Adding the Context and Reducer
Let's create a new file called ThemeContext.js. 

Now, Let's create a context object for the theme. We need to export this object from this file so that we can import it into the component from where we want to consume this context.

```JSX
export const ThemeContext = createContext();
```

Now, We should write a HOC (Higher Order Component) that'll be used to wrap any component with the Context provider.

In this HOC, we need to use the `useReducer` hook to produce a state and the dispatch function to update that state and pass it to the provider component.

We need to write a reducer function to switch between dark mode and light mode. 

> Realistically, you won't need a reducer for this simple state update. You can just use a normal `state` and `setState` from the `useState` hook. But, just for the sake of learning how to use reducers along with the Context API, I'll be using reducers to update the theme state.

The initial state will be:

```JSX
const initialState = { darkMode: false };
```

The reducer function will be:

```JSX
const themeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };
    default:
      return state;
  }
};
```

Now, we need to pass this `themeReducer` function and the `initialState` to the `useReducer` hook.

```JSX
const [state, dispatch] = useReducer(themeReducer, initialState);
```

Now, let's write the HOC and export it from this file. We should pass the state and the dispatch function to the value prop of the Provider.

```JSX
export function ThemeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</ThemeContext.Provider>;
}
```

### Consuming the Context
We should use the ThemeProvider HOC to wrap it around the component we want to consume the context from. Since the theme is supposed to affect the application globally, let's wrap it around the App component.

In index.js, let's import the ThemeProvider.

```JSX
import { ThemeProvider } from "./ThemeContext";
```

Now, let's wrap `<App></App>` with `<ThemeProvider></ThemeProvider>`.

```JSX
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

This will make the Theme Context available for all the descendant components of the App component.

Now, in the *App.js* file, let's import the `ThemeContext` and the `useContext` hook.

```JSX
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
```

We need to pass the `ThemeContext` object to the `useContext` hook.

```JSX
const theme = useContext(ThemeContext);
```

The `useContext` hook will return the object that we passed to the value prop of the provider.

So, to access the dark mode state, we need to access it like `theme.state.darkMode`.

```JSX
const darkMode = theme.state.darkMode;
```

Now, we can use this state to alternate between the CSS classes that we need to apply for the elements.

For example,

```HTML
<div className={`bg ${darkMode ? "bg-dark" : "bg-light"}`}>
```

Now, do the same for the `h1` and the `p` tags.

```HTML
<h1 className={`heading ${darkMode ? "heading-dark" : "heading-light"}`}>
  {darkMode ? "Dark Mode" : "Light Mode"}
</h1>
<p className={`para ${darkMode ? "para-dark" : "para-light"}`}>
  ...
</p>
```

Now, we need to use the dispatch function to update the state between dark mode and light mode.

In Button.js, let's import the `ThemeContext` and the `useContext` hook.

```JSX
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
```

Similar to what we did in the App.js file, we need to pass the `ThemeContext` object to the `useContext` hook.

```JSX
const theme = useContext(ThemeContext);
const darkMode = theme.state.darkMode;
```

When the user clicks the button, we need to call the dispatch function with the correct type. If the current state is in light mode, the dispatch type should be of dark mode and vice-versa.

Let's write a function for when the user clicks on the button and pass it to the `onClick` property of the button.

```JSX
export default function SwitchButton() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    if (darkMode)
      theme.dispatch({ type: "LIGHTMODE" });
    else
      theme.dispatch({ type: "DARKMODE" });
  };

  return (
    <button className={`btn ${darkMode ? "btn-dark" : "btn-light"}`} onClick={onClick}>
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
```

Now, when you click on the button, the theme should change.

![Toggle Mode](toggle.gif)

### Let's Recap

- We learned about the Context API.

- We learned about when to use Context API.

- We learned about Reducers and how to use them along with the Context API.

- We built an application that uses context API and reducers to implement dark mode for the application.

Congratulations, :partying_face: You did it.

Thanks for reading!