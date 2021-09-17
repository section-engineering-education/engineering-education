![hero](/core-concepts-of-redux-store-management/hero.png)

#### Intoduction

Welcome to the Core Concept of Redux Store Management article!. In this article, I will be discussing the concepts and essentials of Redux store management. By the time you finished reading this article, you should be confident to tell what Redux is all about and how it is been used.

#### Keys Takeaway 
In this article, I will be covering these sub-topics been the most essentials of the Redux itself. Join me to explore more on this journey.

* What is Redux and Store Management?
* How to set up the Redux Store.
* Concepts of Action and Reducers in Redux Data Flow.
* Connecting an application with Redux Store.
* Finally, How to make asynchronous calls with Redux Thunk.

### What is Redux and Store Management?
Generally speaking, Redux is said to be a JavaScript library that depicts how the state of the application should be managed and accessed. Redux manages every application state, by providing a centralized store that needs to be accessed throughout the application. There are many libraries like flux, ember, etc but Redux data flow is clear and easy to integrate with. What is the application state?

The application state refers to the data collected and stored for reference by the components. The whole data required to load each component or the entire application are stored in the state. It is with the help of Redux that the concept of store management came to the rescue because managing the whole state for an application has been a problem before. Now, What is Store?

A store is a container provided by Redux for managing, accessing, and monitoring the dynamic state of the application using it. Remember that the state is not static, simply because every request that comes into the application manipulates the state and prompts re-rendering of the whole application for a better experience. Not only has the application state is been managed by the Redux Store, but the actions triggered by the client that changes the state.


### Setting Up Redux Store
For a better experience, while keeping track of the application state in the development mode, a Redux DevTools can be set up with browser and Redux extension to be installed. Search for `Redux Extension` in `Google Chrome` and install it.

As a developer that works with Redux, this extension will provide ease usage of Redux in the application that you are working on. Before the Redux store can be accessed, Redux itself has to be installed by it in the application package manager or locally on the computer.

Redux requires a JavaScript package manager `npm` or `yarn`. It is from this package that Redux will be installed and configured. So for every Redux application, we initialize the `npm` project first.

```bash
$ npm init .
```

Furthermore, Redux can be integrated with different frameworks of JavaScript like `JQuery`, `React`, `Vue`, `Angular` e.t.c and with the superscript of JavaScript called `TypeScript`. But in any framework, installation is the same as the command below. Inside the application root directory, open your terminal or bash window.

```bash
# NPM
$ npm install redux 

# YARN
$ yarn install redux
```
To save the `Redux DevTools` in the project modules, this is achieved by typing the following command.

```bash 
$ npm install --save-dev redux-devtools-extension
$ npm install redux-thunk
```
Having installed the dependencies required, now we have to connect the Redux store with the application state. In the root directory, we can make a folder `Store` and inside it name a file `store.js` with these configurations below.

```JavaScript
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
In this file, we are just destructuring some methods from their classes. The `createStore` function creates the Redux store which requires parameters like `rootReducers`, `initialState`, and `composeWithDevTools`.

The `initialState` as the name implies is an empty object that stores the whole state for the application. The `rootReducers` is also an object from the `reducer` file which connects all reducer functions with the store. 

Lastly, `composeWithDevTools` is a function that requires an `applyMiddleware` to showcase the application state and actions triggered in the browser having the `redux extension. The store file exports the variable `store` and this makes the store accessible across the entire application when it is connected.

Finally, connecting the configured store shall be carried out based on the type of framework building the application on. Assuming the `React` project, we have to install a `react-redux` to connect with the Redux Store.

```bash
$ npm install react-redux
```
And the connection is made inside an `index.js` file as below. We are pulling out `Provider` from `react-redux` as a component that requires a compulsory `store` parameter.

```JavaScript
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

However, doing this will make the Redux store finally accessible by the browser and all activities going on with the state can be monitored. To reference the Redux dev tools added, press `CTRL+SHIFT+i` on windows or `CMD+SHIFT+i` on Mac inside your local browser.

### Action and Reducers In Redux Data Flow

Referring back to the picture used in this article, that tells virtually everything regarding how data flows in the Redux application. Every action of clients on the applications triggers a specific action type that binds with the reducer.

While the store is been called by the reducer to update the state, based on the data sent or needed, and then re-renders the client user interface for changes to take effect.

## What is Action?
In Redux data flow, action is a JavaScript function that returns an object having both the `type` and `payload` properties. The action `type` describes the kind of operation to be performed by the reducer. While the action `payload` refers to the data received from the client for every action type sent.

Note that `payload` can also be an object itself. A demo can be found below and all actions shall be inside a file known as `action.js` though you can name it the way you prefer.

```JavaScript
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

## What is Reducer all about?
As said earlier, Redux reducers are been called whenever an action is triggered. So, Reducers are JavaScript functions that require both the `state`, `action`, and return part of the application state changed based on the type of action received. 

However, a reducer should never mutate the whole application state directly rather copy out the part of the state that needs update and returns it if updated. Also, there must not be any asynchronous operations in reducers like performing `API` calls.

We use a conditional statement to switch between the action types and each type return their updated state.

Note that the number of reducer functions depends on how bulky the application developing. But if there is more than one reducer, then you need a `rootReducers` that will combine all reducers to one for the `store`. This is achieved by making use of the `combineReducers` function from `redux` installed and pass in the reducers.

Reducers live in their folder and the root reducers are exported to the store. Take for instance, inside the `reducers` folder, we can have different files for each reducer and one `index.js` file for the `rootReducer`.

```JavaScript
    import { combineReducers } from "redux";
    import leads from './leads';
    import auth from './auth';

    export default combineReducers({
        leadsReducer: leads,
        authReducer: auth
    })
```
However, the Redux reducer logic instance goes thus below.

```JavaScript
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
Furthermore, notice the `...state` command used, which is called a `spread operator` in JavaScript. What that does is to copy the whole state, so that the part needed can be referenced.


### Connecting the Redux Store With The Application Components

Although the Redux store has been connected with the application, there is a need for each component of the application to reference the state directly. In this context, we will require a module named `connect()` from `react-redux` installed earlier.

This `connect()` function requires four optional parameters named `mapStateToProps`, `mapDispatchToProps`, `mergeProps` and `options`. This only provides the component its pieces of data needed from the Redux store and it does not for once modify the component rather returns a new component that is wrapped with.

In the component that needs to connect with the store, the connection can be made like below. Note the optional symbol `?` used.

```JavaScript
    export default connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)(COMPONENT)
```
Let us break down each parameter and learn more about them.

```JavaScript
    mapStateToProps? : (state, ownProps?) => object
```
If this parameter is used, the new component will subscribe to the store for updates. What `mapStateToProps` does is to connect the store's state with the props of the component that wraps the `connect()` module. This takes in a maximum of two parameters with `state` compulsory. If not used, kindly put `null` or `undefined` at its position.


```JavaScript
    mapDispatchToProps?: Object | (dispatch, ownProps?) => Object
```

This `mapDispatchToProps` may either be an object, function, or not supplied and with a maximum of two parameters. If used, the component will receive the dispatch of the action triggers from the store. And if not needed, put `null` in its place.


```JavaScript
    mergeProps?: (stateProps, dispatchProps, ownProps) => Object
```

This should be specified with a maximum of three parameters and by default the component receives `{ ...ownProps, ...stateProps, ...dispatchProps }` if not specified.

```JavaScript
    options?: Object
```

In version6 `v6` of `react-redux`, this allows every connected component to pass a context object. And the context can be sent through the `options` parameter.

```JavaScript
    {
        context?: object
    }
```

### Making Asynchronous Calls

There are so many types of async calls that can be done in Redux, but today I want to reference an API call. Performing async operations like API calls must never be done in `reducers` as warned earlier.

However, every asynchronous call involves a function that can take parameters from the component calling them and returns another function with `dispatch()` and `getState()?` arguments returned. 

The data to be received from the API shall be dispatched as the payload together with the specific action type. Every dispatch methods call the Redux store which triggers the reducers based on the type of action received. Then the reducer returns the updated state required by the caller which gets to the component in form of properties i.e `Props`.

To demonstrate an instance of asynchronous calls in the Redux application, I came up with the codes below.

```JavaScript
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

Here, the `loadUser` function is returning another arrow function that has both the `dispatch()` and `getState` as arguments needed in the async call. Again I used `axios` and referenced the  `get` HTTP method to have a specific user having the `token` from the state.

If the API is successfully called and such a user exists, then the `dispatch()` function returns both the action type and the data as payload. But if otherwise, the `catch()` dispatches an action type for the error.


### Conclusion

Redux as a library allows the flow of data right from the client actions on the application which prompts the Redux store through the dispatch method. So the reducers are the middlemen that switch the action type and return the part of the updated state to the store. 

For further reference and more insights on this article, you can reach out to the official documentation here [Redux Docs](/https://redux.js.org/introduction/getting-started).

Thanks for coming!!

