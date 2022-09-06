---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-reusable-react-form/
title: How to Create a Reusable React Form component
description: In this article, we will create a reusable form which can be rendered in any component..
author: gerald-ezenagu
date: 2022-08-12T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-a-reusable-react-form/hero.png
    alt: How to Create a Reusable React Form component Hero Image
---

### Prerequisites
In this tutorial, one ought to have the following:
- Basic React and Javascript knowledge.
- Understanding of npm and how to install from npm
- [Atom](https://atom.io) or [Visual studio code](https://code.visualstudio.com/) and npm installed on a pc.

### Table of contents
- React Forms
- Setting up our Application
- Creating the Reusable Input component
- Creating a React hook component
- Creating the Contact Form and Signup/Login component
- Adding Routes to show our contents

### Goal
- To create a reusable form which can be rendered in any component.
- To create a custom React hook function.

Let's begin.

### React Forms and Input
A form contains data. React forms are data gotten from the front-end (the browser) and are handled by the components within the React code.

`Input` is a HTML element used in creating interactive controls that accept and get data from the user.

In React, we use JSX which stands for Javascript XML. This allows us to write HTML in React.

#### Step 1 - Setting up our Application
First, we need to open a folder in our code editor either atom or visual studio code. We open the terminal in our code editor and type the following commands to install React and some its dependencies.

```bash
npx create-react-app my-form
```
Press enter to install. 

Type in the terminal, `cd my-form` to go into `my-form` folder. Next, we type `npm start` to start our development server. Our React application can be seen on `http://localhost:3000`.

We need to change the pre-defined React code written by default during installation.

Go to `http://localhost:3000` in your browser, a website showing the React logo will appear.

Let's change the React code.

First we open the `app.js` file in our visual studio code editor. Next, we delete all code within the `div` tag and add the following codes below.

```javascript
import React from 'react'; //for React and EJX
import './App.css' // for styles

const App = () => {
  return (
    <div className={/*style name*/}>
      {/*Our codes will be added here */}
    </div>
  );
}

export default App;
```

#### Step 2 - Creating the Reusable Input component
A Reusable component is a piece of User Interface that can be used in many parts of an application to build and render different User Interface instances.

We first create a `component` folder within the `src` folder and inside the component folder we create a file called `Input.js`.

Inside the Input.js file, at the top of the file, we first import React from react. Then, we create a function called `Input` that has props as a parameter.

It should look like this:

```javascript
import React from 'react';

const Input = (props) => {
    return(
    );
}

export default Input;
```

We create a constant that checks using a ternary operator, if an `input` or a `textarea` element should be rendered in our Input component. We use props to get the values from the component that is being rendered on the DOM at that moment.

```javascript
const element = props.element === "input" ? (
      <input name={props.name} type={props.type} 
         placeholder={props.placeholder} value=""
       />
    ) : (
        <textarea name={props.name} rows= "4"value=""
        />
    );
```

We then return a `div` that contains a label element and our element constant.

```javascript
const Input = (props) => {
    return(
        <div>
        <label htmlFor={props.id}> {props.label}</label> 
          {element}
        </div>
    )
}

export default Input;
```
Afterwards, we can now add our state logic. We will use `useReducer` to handle state logic in this tutorial. We can use `useState` as well but if you want to handle multiple state, `useReducer` is best

`useReducer` is a React hook that accept two arguments, a reducer and an initialState. The reducer contains your state logic, similar to `setState` while the initialState is your initial state. `useReducer` also returns your current state and a dispatch method which is used to trigger the state logic.

We first import it from React, then define a constant to hold our reducer outside the Input function.

```javascript
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return { ...state, value: action.val };
        default:
            return state;
    }
} 
```
We use a `switch` statement to check if a case is met before our logic is triggered. The `inputReducer` function accepts two parameters, a state and action. The state is our current state while the action holds the values from our dispatch function.

Within the input function, we define our Reducer state and pass `inputReducer` as an arguement, we can add other values or items to our state.
Then use array destruction to assign two values to our useReducer.

As shown below:

```javascript
const [inputState, dispatch] = useReducer(inputReducer, {value: ''}); 
```
We then define a function that will hold the dispatch that will trigger a change in state.

```javascript
const changeHandler = event => {dispatch({type: 'CHANGE', val: event.target.value}); }
```
We then add a new property to our input called `onChange` and pass the `changeHandler` to it.

The Input.js file:

![Input](/engineering-education/how-to-create-a-reusable-react-form/input.png)

#### Step 3 - Creating a React hook component
We need to create a customized React hook in our project to avoid code duplication. Creating a customized hook is all about using a React hook within a function that we can use multiple times rather than having duplicate codes performing the same function. This will hold our `useReducer` and return values we can use in any file within our project, since we will be using `useReducer` in our components.
 
So in our component folder, we create a new folder called hooks and within it, we create a javascript file called `form-hook.js`.
 
Just like in our input file, the useReducer needs to have a constant that defines the logic of how our state should change.

```javascript
import {useReducer} from 'react';

const formReducer = (state, action) => {
    switch(action.type) { case 'INPUT_CHANGE':
       return { ...state, inputs: { ...state.inputs, [action.inputId]: {value: action.value} }
            };
        default:
            return state
    }    
}
```
Then, we create a function and name it as `useForm`.

NOTE: when creating a custom hook, we must use small letter then a capital letter.

Within it, we define our Reducer function and a function to dispatch our action

```javascript
export const useForm = (initialInput) => {
    const [formState, dispatch] = useReducer(formReducer, {inputs: initialInput });
    
    const inputHandler = (id, value) => { dispatch(
      {type: 'INPUT_CHANGE', value: value, inputId: id})
    }

    return [formState, inputHandler];
}
```
We recieve the necessary values as props which we called initialInput. It will serve as our initialState for our logic. We then return our `formState`, which holds the initial state and inputHandler which holds our dispatch function.

A screenshot of our form-hook.js file:

![useForm](/engineering-education/how-to-create-a-reusable-react-form/useForm.png)

#### Step 4 - Creating the Contact Form and Signup/Login component
We first create a `Contact.js` file and an `Auth.js` file within the component folder. In the Contact.js file we first import React, since we will be using our Input component in this file, we also need to import Input component and useForm into our application.

We create a function that returns a form element, within the form element we render the Input and pass the required properties as props.
We also need to create a handler that will handle the submit action, lets call it `submitHandler`. In this function we can request or get the events that occured within the form inputs. We pass the `submitHandler` to our form element, so that it gets called when the submit event occurs

```javascript
import React from 'react'; //for React and EJX
import Input from './input'; //our Reusable component
import { useForm } from './hook/form-hook';
const Contact = (props) => {

     const submitHandler = (event) => { event.preventDefault();
        console.log(formState.inputs);
    }
  return (
     <form onSubmit={submitHandler}>
        <Input id="name" element="input" type="text" label="Name"
        />
        <Input id="email" element="input" type="e-mail" label="E-mail"
        />
        <Input id="description" element="textarea" label="Description"
        />
        <Input id="address" element="input" type="text" label="Address"
        />
         <Input id="number" element="input" type="number" label="Number"
        />
        <button type="submit"> SUBMIT</button>
     </form>
  );
}

export default Contact;
```
Then, we extract the functions returned from useForm using array destructioning. Within our useForm hook, we pass our initial state 

```javascript
 const [formState, inputHandler] = useForm({
        name: {value: ''},
        email: {value: ''},
        description: {value: ''},
        address: {value: ''},
        number: {value: ''}
    });
```
More inputs can be added to our state so long as the input is among our current state.

Now, we pass a property to our input that will trigger the dispatch in our useForm, let's call it `onInput`. `onInput` will trigger the dispatch for that input.

```javascript
 <form onSubmit={submitHandler}>
         <Input id="name" element="input" type="text" label="Name"
            onInput={inputHandler}
        />
         <Input id="email" element="input" type="e-mail" label="E-mail"
            onInput={inputHandler}
        />
        <Input id="description" element="textarea" label="Description"
            onInput={inputHandler}
        />
          <Input id="address" element="input" type="text" label="Address"
            onInput={inputHandler}
        />
         <Input id="number" element="input" type="number" label="Number"
            onInput={inputHandler}
        />
        <button type="submit"> SUBMIT</button>
     </form>
```
A screenshot of our contact.js file:

![Contact](/engineering-education/how-to-create-a-reusable-react-form/contact.png)

Since we are passing an unknown property to the input, we need to handle it in our `input.js` file We then go back to our input.js file and import `useEffect` to handle the changes in our input.

`useEffect` is a hook that accepts a callback function and dependencies as an argument. This manage the side-effects in a functional component.

So in our input.js file within our input function. We also import `useEffect` and pass our `onInput` as the callback function. So that on every change, `useEffect` will handle it. By doing this, we also need to extract the exact values needed using object destructuring and use `useCallback` in our form-hook so as to prevent unnecessary changes that will trigger an infinite loop.

```javascript
import {useEffect} from 'react';

const {id, onInput} = props;
  const {value} = inputState;

  useEffect(() => {
    onInput(id, value)
  }, [id, onInput, value])

```
Also in our form-hook file we import useCallback to handle the inputHandler, since that is what is passed on to our onInput.

```javascript
import {useCallback} from 'react';
   const inputHandler = useCallback(id, value) => {
        dispatch({type: 'INPUT_CHANGE', value: value, inputId: id})
    }

```

Next, we create a new file within the component folder called Auth.js. In this file, we be create a sign up and login page with our Input component and use state to switch between sign up and login so that one of them gets rendered on the screen. This file will be similar to our Contact.js file with little difference.

Just like we did when creating the Contact.js, we first import React and {useState}. As is the case in Contact.js, we will use `useForm` and `useState`

```javascript
  import {useState} from 'react';
  import { useForm } from './hook/form-hook';
   
   const Auth = (props) => {
   const [formState, inputHandler] = useForm({
        email: { value: ''}, password: {value: ''}
    })

      const [isLoginMode, setIsLoginMode] = useState(true);

     const submitHandler = (event) => { event.preventDefault();
        console.log(formState.inputs);
    }
```

We use `useState` to set our login mode so as to render either a login or signup page in the browser.

```javascript
return ( 
        <>
           <form onSubmit={submitHandler}>
            {!isLoginMode && (
              <Input element="input" id="name" type="text" label="Your Name"                 
                onInput={inputHandler}
              />
            )}
           <Input id="email" element="input" type="email" label="E-mail" onInput={inputHandler}
           />
            <Input id="password" element="input" type="password" label="Password"
                onInput={inputHandler}
            />
            <button type="submit">{isLoginMode ? 'LOGIN' : 'SIGNUP'}</button>
            <button type="button" onClick={} 
            >SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'} </button>
            </form>
        </> 
     );
export default Auth;
```
In our Auth file, we need to handle different state changes. When signing up, we need three inputs and state. When logging in, we need two inputs and state. So, we need a new case and dispatch in our useForm that will be used in our Auth.js.

To achieve this, we will add a new handler after the inputhandler that will set our form data, this handler will recieve the form data from our Auth.js file.

```javascript
 const setFormData = useCallback((inputData) => {
        dispatch({type: 'SET_DATA', inputs: inputData})
    }, []);
```
Then we return setFormData as well so as to use it in our Auth.js file.
We extract it using array destructioning just like we did in our Contact page 
```javascript
 const [formState, inputHandler, setFormData] = useForm({
        email: { value: ''},
        password: {value: ''}
    })
```
But, before we can use it, we to create a function that will switch the `isLogged` state and change the initial state being sent to useForm.

```javascript
 const switchModeHandler = () => {
        if(!isLoginMode) {
            setFormData({
                name: undefined
            })
        } else {
            setFormData({
                ...formState.inputs,
                name: {value: ''}
            })
        }
        setIsLoginMode(prevMode => !prevMode);
    };   
```
We then pass our `switchModeHandler` function to our button onclick event. This will trigger the function whenever the button is clicked, then the function checks the isLogged state and switch the inputData that's sent to the useForm.  

A screenshot of our auth.js file:

![Auth](/engineering-education/how-to-create-a-reusable-react-form/auth1.png)
![Auth](/engineering-education/how-to-create-a-reusable-react-form/auth2.png)

#### Step 5 - Adding Routes to show our contents
We need to add Routes to our application. In order to see our components since we don't want to have our sign up and contact components on the home page, we need to create a route for the Auth file while the contact gets rendered in the App.js file.

To add Routes to our App.js file, we first need to install and import it from `react-router-dom` into our `app.js` file. To install `react-router-dom`, we write in the terminal the following:

```bash
`npm install react-router-dom`
```

Press enter to install it.

Next, we then import BrowserRouter, Routes and Route from react-router-dom. We wrap BrowserRouter in opening and closing tags, within it we wrap Routes also with opening and closing tags and wrap the Route with a self closing tag. We can't render our element in Route without wrapping it with Routes.
When rendering Route, we need to add two properties called element and path, the element accepts the component we want to render to the DOM and the path accepts the location we want our component to be rendered.

As shown below:

```javascript
import {Route, BrowserRouter, Routes} from 'react-router-dom';

const App = () => {
  return (
    <div className={/*style name*/}>
      <BrowserRouter>
        <Routes>
            <Route/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```
Then we import our Auth.js and Contact file into the App.js file and render it within the return bracket. In our browser DOM when we visit `localhost:3000`, we'll see the Contact page. When we visit `localhost:3000/auth`, we'll see the Auth page.

Our App.js file should look like this below:

```javascript
import {Route, BrowserRouter, Routes} from 'react-router-dom';

const App = () => {
  return (
    <div className={/*style name*/}>
      <BrowserRouter>
        <Routes>
            <Route path='/auth' element={<Auth/>}/>
            <Route path="/" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

![App](/engineering-education/how-to-create-a-reusable-react-form/app.png)

#### Conclusion
In this tutorial, we created a reusable form.
This was done by having the form input logic in one component and rendering it in another. 
In the tutorial above, rather than writing the form logic every time, we defined  the logic in a file and use that logic where we want it.
We got the information to be displayed through props and handled the values and state through React hooks.
 
Feel free to add CSS styles and more functionality.

Goodluck guys!!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
