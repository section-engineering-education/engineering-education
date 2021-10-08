---
layout: engineering-education
status: publish
published: true
url: /core-concepts-of-redux-store-management/
title: Core Concepts of Redux Store Management
description: This tutorial will guide you on how to set up and integrate Redux into an application. We will also discuss how to connect an application to Redux flow.
author: arafat-olayiwola
date: 2021-09-14T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/core-concepts-of-redux-store-management/hero.png
    alt: Redux Store Management Hero Image.
---
This article discusses the core concepts of Redux store management. We will understand how to manage state in applications, reference components, as well as perform asynchronous operations.
<!--more-->
Let's first discuss what Redux is all about and how it can be integrated into an application.

### Key takeaways 
The following subtopics are covered in this article:
- What is Redux and store management?
- How to set up the Redux store.
- Actions and reducers in Redux Data Flow.
- Connecting an application to the Redux store.
- Making asynchronous calls with Redux Thunk.

### What is Redux and store management?
Redux is a JavaScript library that depicts how an application's state should be managed and accessed. 

It supports state management via a centralized store. 

Though there are many libraries like Flux that support state management, data flow in Redux is clear and easier to integrate. 

### Application state
The application state refers to data collected and stored for reference by components. 

Data required to load each component or the entire application is stored in the state.

In the past, state management was quite challenging. Redux helps to resolve some of the problems that developers usually experience.

A `store`, in this context, is a container provided by Redux for managing, accessing, and monitoring the dynamic state of an application.

Remember that the state is not static, simply because every request that comes into the application manipulates the state and prompts re-rendering of the whole application.

Not only is the application state managed by the Redux Store, but also the actions triggered by the client.

### Setting up Redux store
During development, Redux DevTools can be set up in the browser for a better experience.

To install it, search for `Redux Extension` in the `Google Chrome` store.

Before accessing the Redux store, we need to install Redux. This can be through the application package manager or locally on the computer.

Redux requires a JavaScript package manager `npm` or `yarn` to be installed and configured.

In each Redux application, we will initialize the `npm` project.

```bash
$ npm init
```

Redux can also be integrated with different JavaScript frameworks like `JQuery`, `React`, `Vue`, `Angular`, and `TypeScript`.

Inside the application root directory, open your terminal or bash window and run the following command:

```bash
# NPM
$ npm install redux 

# YARN
$ yarn install redux
```
To save the `Redux DevTools` in the project modules, type the following command:

```bash 
$ npm install --save-dev redux-devtools-extension
$ npm install redux-thunk
```

Having installed the required dependencies, we can now connect the Redux store with the application state.

In the root directory, we can make a folder named `Store` and then add a `store.js` file with the following configurations:

```js
    import { createStore, applyMiddleware } from 'redux';
    import { composeWithDevTools } from 'redux-devtools-extension';
    import thunk from 'redux-thunk';

    import rootReducers from './reducers';

    const initialState = {};
    const middleware = [thunk];

    const store = createStore(
        rootReducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );

    export default store;
```

In this file, we are destructuring some methods from their classes. 

The `createStore` function creates the Redux store which requires parameters like `rootReducers`, `initialState`, and `composeWithDevTools`.

The `initialState`, as the name implies, is an empty object that stores the whole application state.

The `rootReducers` is also an object from the `reducer` file which connects all reducer functions with the store. 

Lastly, `composeWithDevTools` is a function that requires an `applyMiddleware` to showcase the application state and actions triggered in the browser having the `redux extension`.

The store file exports the variable `store` which makes it accessible across the entire application when it is connected.

Finally, connecting the configured store depends on the type of framework that we are targeting.

Assuming we are building a `React` project, we have to install a `react-redux` to connect with the Redux Store.

```bash
$ npm install react-redux
```

The connection is made inside an `index.js` file, as illustrated below:

 We are importing `Provider` from `react-redux` as a component that requires a compulsory `store` parameter.

```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    import App from './App';
    import store from './Store/store';

    ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
           <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
    );
```

However, doing this will make the Redux store accessible by the browser and all activities associated with the state will be monitored.

To reference the Redux dev tools, press `CTRL+SHIFT+i` on windows or `CMD+SHIFT+i` on Mac inside your browser.

### Action and reducers in Redux data flow
Each client's action can trigger a specific activity that binds with the reducer.

The store is called by the reducer to update the state based on the data sent. It then re-renders the user interface to display the changes.

#### What is Action?
In Redux data flow, action is a JavaScript function that returns an object with `type` and `payload` properties.

The action `type` describes the kind of operation to be performed by the reducer, while the action `payload` refers to the data received from the client for each action.

Note that `payload` can also be an object itself. A demo can be found below and all actions are included in the `action.js` file. Note that you can change this file name.

```js
    export const YOUR_TYPE = (name) => {
        return {
            type: "YOUR_TYPE",
            payload: {
                id: 1,
                value: name 
            }
        }
    }
```

### What Reducer is all about
As stated, Redux reducers can be called whenever an action is triggered.

Therefore, Reducers are JavaScript functions that require both the `state`, `action`, and 'return' part of the application state to change based on the received action. 

However, a reducer should never mutate the whole application state directly. Alternatively, they can copy out the part of the state that needs to be changed and return it once it's updated.

Asynchronous operations such as API calls are not allowed in reducers.

We use a conditional statement to switch between action types and each type returns its updated state.

Note that the number of reducer functions depends on the size of the application. If there is more than one reducer, then you need `rootReducers`. This component will combine all reducers for the `store`.

This is achieved by making use of the `combineReducers` function from `redux` and passing in the reducers.

Normal reducers are constrained to a specific folder while root reducers are exported to the store. 

For instance, in the `reducers` folder, we can have different files for each reducer and one `index.js` file for the `rootReducer`:

```js
    import { combineReducers } from "redux";
    import leads from './leads';
    import auth from './auth';

    export default combineReducers({
        leadsReducer: leads,
        authReducer: auth
    })
```
The Redux reducer logic instance is highlighted below:

```js
    import * as actionTypes from './actions';

    const initialState = {
        leads: []
    }

    const leads = function(state=initialState, action){
        switch(action.type) {
            case actionTypes.YOUR_TYPE_1:
                return {
                    ...state, 
                    leads: action.payload 
                }
            case actionTypes.YOUR_TYPE_2:
                return{
                    ...state,
                    leads: [...state.leads, action.payload]
                }
            default:
                return state;
        }
    }

    export default leads;
```
The `...state` command or `spread operator` copies the whole state object, so that the required part can be referenced.

#### Connecting the Redux Store to app components
Although the Redux store has been connected to the application, each app component should reference the state directly.

In this context, we will require a module named `connect()` from `react-redux`.

This `connect()` function requires four optional parameters named `mapStateToProps`, `mapDispatchToProps`, `mergeProps` and `options`.

This only provides the component with data from the Redux store. 

```js
    export default connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)(COMPONENT)
```
Let us break down each parameter and learn more about them.

```js
    mapStateToProps? : (state, ownProps?) => object
```

If this parameter is used, the new component will subscribe to the store for updates. `mapStateToProps` connects the store's state with the component props that also wrap the `connect()` module.

This takes in a maximum of two parameters. The `state` parameter is compulsory. Therefore, if it is not used, use `null` or `undefined`.

```js
    mapDispatchToProps?: Object | (dispatch, ownProps?) => Object
```

`mapDispatchToProps` may either be an object, function or undefined. It requires a maximum of two parameters.

Moreover, if used, the component will receive the action triggers from the store.

``js
    mergeProps?: (stateProps, dispatchProps, ownProps) => Object
```

`mergeProps` should be specified with a maximum of three parameters and by default, the component receives `ownProps`, `stateProps`, and `dispatchProps` if not specified.

```js
    options?: Object
```

In version `v6` of `react-redux`, the code above allows every connected component to pass a context object. The context can be sent through the `options` parameter.

```js
    {
        context?: object
    }
```

### Making asynchronous calls
There are so many types of asynchronous calls that can be done in Redux.

As noted, performing async operations like API calls must never be done in `reducers`.

Each asynchronous call involves a function that takes parameters from the component calling them and returns another function with `dispatch()` and `getState()?` arguments. 

The data from the API will be dispatched as the payload together with the specific action type. 

Every dispatch method calls the Redux store which triggers the reducers based on the type of action received. 

The reducer then returns the updated state required by the caller, which gets to the component in form of properties i.e `props`.

The following code demonstrates an instance of asynchronous calls in a Redux application:

```js
    import axios from 'axios';
    import * as actionTypes from '../actions/types'

    export const loadUser = () => (dispatch, getState) => {
        // calling loading action
        dispatch({type: actionTypes.USER_LOADING});
        axios.get('http://localhost/8000/api/auth/user', tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: actionTypes.USER_LOADED,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: actionTypes.AUTH_ERROR
                })
            })
    }
```

Here, the `loadUser` function is returning another arrow function that has both the `dispatch()` and `getState` as arguments.

We used `axios` and referenced the `get` HTTP method to have a specific user access a `token` from the state.

If the API is successfully called and such a user exists, then the `dispatch()` function returns both the `action type` and the `data` as payload. If this process fails, the `catch()` dispatches an action type for the error.

### Conclusion
Redux allows the flow of data triggered by client actions through the application which prompts the Redux store.

Reducers act as intermediaries that switch the action type and return part of the updated state to the store. 

You can read more about Redux from [here](https://redux.js.org/introduction/getting-started).

Happy coding!

---

Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

