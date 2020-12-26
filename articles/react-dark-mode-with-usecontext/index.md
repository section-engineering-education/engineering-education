In this tutorial, we'll use the React Context API in a react application to maintain state for the theme of the application (dark/light).

### Goals
By the end of this tutorial, you’ll know:

- How the React Context API works.

- When to use the Context API instead of Redux.

- How to implement dark mode in a React application using React's Context API.

### Prerequisites
The fundamentals of React will not be covered in this tutorial. If you are not comfortable with the fundamentals, this is a [helpful tutorial](https://reactjs.org/tutorial/tutorial.html) that you can go through before beginning with this project.

### Overview
We'll be going through these steps in this article:

- What is a context.
- What is a reducer.
- Redux vs Context API.

### Context API
According to the official documentation of React, Context provides a way to pass data through the component tree without having to pass props down manually at every level.

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
return <Context.Provider value={value}>{props.children}</Context.Provider>;
```
To subscribe to the context object, we will use the `useContext` hook and pass the context object created by `createContext`.

When a component subscribes to the context object, it will read the current context value from the closest matching Provider above it in the tree.

```JSX
const context = useContext(Context);
```

### When to use React's Context API intead of Redux
If you don't know about Redux, check out [this article](https://www.valentinog.com/blog/redux/) to learn about it.

If you are building a small application that won't benefit a lot from using Redux, you can use the Context API. The context API is also easier to implement.

This will result in a smaller bundle size and improved project maintainability.

But, the Context API (currently) is not built for high-frequency updates. You should only use it for low frequency updates like theme, authentication, etc. This is because whenever the value of the context changes, the descendant components of the Provider will be re-rendered.

### What is a Reducer.
A Reducer is a function that takes 2 arguments, the current state and an action. Based on the type of action, the function will return a new state.

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

The `useReducer` hooks takes 2 arguments, the reducer funtion and the initial state. It will return the current state value and a function called `dispatch` which should be used to manipulate the state.

```JSX
const [state, dispatch] = useReducer(reducer, initialState);
```

If you pass this state and dispatch to the value prop of the Context Provider, you can consume the state and update it using the dispatch from any consumer.

### Cloning the starter code
To focus more on the use of the context API and reducers, I've prepared a starter code. You can clone it [from this repository](https://github.com/zolomohan/react-context-dark-mode-starter) on GitHub. Follow the Repository's README for instructions.

If you'd like to take a look at the final code, please refer to [this GitHub Repository](https://github.com/zolomohan/reactcontext--dark-mode-final).

In the starter code, I've set up a simple screen with text and a button to switch to dark mode. I've also written all the CSS styles required for the dark mode and the light mode.

