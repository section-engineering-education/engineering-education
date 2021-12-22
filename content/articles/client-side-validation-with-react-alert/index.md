---
layout: engineering-education
status: publish
published: true
url: /client-side-validation-with-react-alert/
title: Client Side Validation with React Alert
description: In this article, we’re going to look at how to verify input data using the npm package react-alert. react-alert makes it easier to render the error messages back to the user, in case of invalid user input data.
author: caleb-olojo
date: 2021-08-21T00:00:00-09:06
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/client-side-validation-with-react-alert/hero.jpg
    alt: Client Side Validation with React Alert Hero Image
---

Javascript supports a feature to verify if the data sent by a user from a web application to a web server is valid or not.

This feature gives front-end developers the ability to verify a user's input data before the data gets sent to the webserver.

In this article, we’re going to look at how to verify input data using the npm package [react-alert](https://www.npmjs.com/package/react-alert). `react-alert` makes it easier to render the error messages back to the user, in case of invalid user input data.

### Prerequisites

To follow along with this tutorial, you'll need:

1. [Node.js](https://nodejs.org) 10.x or newer.
2. [NPM](https://www.npmjs.com/package/npm5) 5.10 or newer.
3. Knowledge of conditional statements in Javascript.
4. Basic knowledge of React.js.
5. Basic knowledge of DOM Manipulation.

### Overview

Before React, vanilla JS was the go-to solution for client-side validation. One would need to understand the fundamentals of DOM manipulation and event handling.

This validation process aims to check if the data sent by the user to the server is appropriate. Event listeners will help us listen to events that take place on the webpage.

These events range from the click of a button `onClick`, the mouse hovering effect on a particular element on the webpage `onMouseOver`, the submission of details entered into an input form using the `onSubmit` event, and much more.

> If you want to learn more about events in JavaScript [click here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events).

Performing DOM manipulation in vanilla JS isn’t a big deal because the DOM is available. But in React, the DOM isn’t available, a virtual DOM is available instead.

Although manipulating the DOM in React works the same way in vanilla JS, there are some quirks to it. One is that the Document object is not available in React. This is because it is being bundled with Node.js which doesn’t run on the client-side of a web browser.

### Getting started

To be able to perform client-side validation in React, let’s start by installing the necessary `npm` dependencies.

I will be using Next.js to bootstrap my React application. Because of its simplicity, its folder structure, and many other benefits.

You don’t need to use Next.js. You can either:

1. Create a React app using [create-react-app](https://create-react-app.dev/).
2. Or bootstrap your React app with [Parcel.js](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-parcel).
   
Feel free to use the approach that you feel comfortable with.

To get started with Next.js, in your workspace, open the terminal and run the command below.

```bash
npx create-next-app name-of-your-app
```

This will install Next.js and all the dependencies needed to create a React application.
Because this article focuses on the use of `react-alert` for client-side validation in React. We need to also add `react-alert` package to the list of dependencies needed in the project. The command below will handle that for us.

```bash
npm install react-alert –save-dev
```

A basic knowledge of how conditional statements operate in JavaScript will speed up the process of writing the validation function(s) on the client-side of your project.

A basic conditional statement is as shown below, the `if` statement. It is one of the most used statements in JavaScript, it executes the code only if the passed argument is true.

```javascript
if (username) {
  console.log(username);
}
```

The code snippet above checks for the validity of the `username` variable. If it is not defined, a reference error is displayed on the console "`username is not defined`".

```javascript
const username = "Malete";
if (username) {
  console.log(username);
}

// Malete is printed on the console.
```

The code above prints `Malete` on the console, since `username` is defined.

There are cases where the conditional statement doesn’t stop at the closing curly braces. If other conditions need checking, we can chain the next conditional statements until we get the desired result.

Other conditional statements that go _hand-in-hand_ with the `if` statement are `else` and `else if`. As their naming convention implies, `else` is used whenever there is no condition left to be checked. While `else if` is used when there are more conditions to be checked.

It is the same principle that we’re going to use in implementing the client validation in this project.

### Setting up the validation script

Before creating the validation script, let’s have a look at the app's folder structure. So that the process of traversing the app structure doesn’t get confusing or ambiguous as we proceed.

```bash
|--pages
| |--_app.js
| |--index.js
|--src
| |--container
|   |--App
|    |--index.js
|--utils
  |--checks.js
  |--alert-template.js
```

The structure above is an excerpt of what the real application structure looks like. But, for the sake of brevity and the level of importance of the files that we’d be interacting with, the structure above fits the scope of this article.

The structure above shows that the `checks.js` file is inside the `utils` folder. `checks.js` is where we’d have all the client-side validation logic.

Since we’d be interacting/writing this logic for web forms, we need to look for a way to target the input elements that are receiving data from the user at the client-side.
Luckily for us, the browser has provided some DOM APIs that we can use to achieve that. Take a look at an example below:

```html
<input type="”text”" name="”fullname”" id="”fullname”" className="”fullname”" />
```

```javascript
const fullnameInputField = document.querySelector(“#fullname”)

console.log(fullnameInputField)
```

The code above logs the HTML code to the console. You can check the result by opening the developer tools of your browser. On Google chrome, the shortcut `ctrl + shift + i` opens the console.

If we were to target the input element via its `className`, the snippet above would change to:

```javascript
const fullnameInputField = document.querySelector(“.fullname”)
```

> Note that the hash symbol `(#)` has changed to the period symbol `(.)` because we’re targeting that DOM node through its className property.

Now let’s have a look at the validation snippet below:

```javascript
// utils/check.js file

let errMsg;

const validateSignUp = (email, password, confirmPassword, alert) => {
  // targeting all form fields
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#pwd");
  const confirmPasswordInput = document.querySelector("#pwd_conf");

  if (!email) {
    alert.error("Please input your email address");
    emailInput.focus();
    errMsg = false;
  } else if (password === "") {
    alert.error("Please provide your password!");
    passwordInput.focus();
    errMsg = false;
  } else if (password.value <= 7) {
    alert.error("Your password must have 8 characters or greater");
    passwordInput.focus();
    errMsg = false;
  } else if (
    typeof password !== "undefined" &&
    typeof confirmPassword !== "undefined"
  ) {
    if (password !== confirmPassword) {
      alert.error("Passwords don't match");
      confirmPasswordInput.focus();
      errMsg = false;
    }
  } else {
    alert.success("You've signed up successfully. Proceed to login");
    errMsg = true;
  }
  return errMsg;
};

export default signUpCheck;
```

We will have a breakdown of what each snippet does as we move on.

- #### Passing form values as props
  The snippet above is a helper function that performs validation on the input form data before it gets sent to the backend server. The function accepts the email, password, confirmPassword, and alert as arguments.

```javascript
let errMsg;

const validateSignUp = (email, password, confirmPassword, alert) => {};
```

We’re passing `alert` as an argument to the function so that we can have access to it when it is imported into the app component. The same thing goes for the other arguments too.

The `errMsg` variable stores the error messages from our validation logic. That is why we declared it with the `let` keyword, so it can be reassigned to any other value in the code execution process.

- #### The conditional statements

  - The first condition checks if the email field is empty, if it is, an alert error message is rendered to the user interface using the `alert.error()` method.

  The `alert.error()` method takes a string as a parameter. The string is what will be displayed on the user interface, and the browser makes sure that the input field is in focus so that it catches the attention of the user.

  ```javascript
  if (!email) {
    alert.error("Please input your email address");
    emailInput.focus();
    errMsg = false;
  }
  ```

  - The next condition checks if the user has entered any password at all. If there’s no value in the password form field, an error pops up in the browser. While the next condition checks for the validity of the password’s length.

  ```javascript
  else if (password === "") {
      alert.error("Please provide your password!");
      passwordInput.focus();
      errMsg = false;
  } else if (password.value <= 7) {
      alert.error("Your password must have 8 characters or greater");
      passwordInput.focus();
      errMsg = false;
  }
  ```

  - The conditional statement below, checks if there is a match between the first and second passwords. The logic employs the use of closures in JavaScript to perform this particular validation.

  ```javascript
  else if (typeof password !== "undefined" && typeof confirmPassword !== "undefined") {
      if (password != confirmPassword) {
          alert.error("Passwords don't match");
          confirmPasswordInput.focus();
          errMsg = false;
      }
  }
  ```

  It runs a conditional execution on both password fields to make sure that both of them are not undefined, i.e. They are not empty fields. If this first condition passes, the next one will run. If not, the next one would not run.

  - If all the conditions stated have been checked, the alert window comes up with successful text.

### Using the validator

Now that we have the validation script set up, and have gotten a grasp of what is going on in the script, it is time to get it inside the app itself. We will have a look at the step-by-step process of accomplishing that.

First, we need to import the validation script into the app component, alongside the react-alert dependency. For brevity’s sake, I wouldn’t be doing much of an explanation on the React component structure, since it is among the pre-requisites of this article.

```javascript
// src/App/index.js file

import React from “react”
import { withAlert } from "react-alert";
import validateSignUp from "../../utils/checks";

const SignUp = ({ alert }) => {
    const [fullname, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pwdConfirm, setPwdConfrim] = React.useState("");


    // handles the submit event once the user clicks on the button
    const handleSubmit = (e) => {
        e.preventDefault();

        const validate = validateSignUp(email, password, pwdConfirm, alert || " ");

        if (validate) {
            alert.success("You've signed up successfully. Proceed to login");
        }
    };

return (
    <section>
        <div>
            <form onSubmit={handleSubmit}>
               <div>
                <p>Email Address</p>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="youremail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div>
                <p>Enter Password</p>
                  <input
                    name="password"
                    id="pwd"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div>
                <p>Confirm Password</p>
                <input
                  name="confirm__pwd"
                  id="pwd__conf"
                  placeholder="enter your password again"
                  value={pwdConfirm}
                  onChange={(e) => setPwdConfrim(e.target.value)}
                />
                <button>Sign up</button>
                </div>
            </form>
        </div>
    </section>
  );
};

export default withAlert()(SignUp);
```

Taking a look at the `handleSubmit` function, you’d notice how the arguments from the `signUpCheck` validator are being used. In the function, all conditions must be met before the form can be submitted.

```javascript
const validate = validateSignUp(email, password, pwdConfirm, alert ||" ");

    if (validate) {
      alert.success("You've signed up successfully. Proceed to login");
    }
};
```

- #### Setting up the alert template

This step involves providing the `react-alert` template API to our application. Without this, the error messages wouldn’t be displayed on the webpage. Let’s start by taking a look at the setup below.

We’d start by creating a component that’d serve as a container for the error messages. In the `utils` folder, we’d add all the logic of the alert-template.

```javascript
// alert-template.js file

import React from "react";

import { transitions, positions, Provider as AlertProvider } from "react-alert";

const AlertTemplate = ({ message, options }) => {
  return (
    <div className={options.type === "success" ? "msg-success" : "msg-error"}>
      <p>{message}</p>
    </div>
  );
};

// this component serves as the container
// that holds/displays the error messages due to the validation
// script that runs on all the app components that have an
// input field
const Message = ({ children }) => {
  const options = {
    position: positions.TOP_RIGHT,
    timeout: 3500,
    offset: "0px",
    transition: transitions.SCALE,
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      {children}
    </AlertProvider>
  );
};

export default Message;
```

The snippet above shows a conditional statement in ternary format. If `options.type` is "success", it sets the className to `msg-success` else it sets the className to `msg-error`.

The `msg-success` gives the alert template/modal a green background while `msg-error` adds a red background to the template.

Let's now go ahead and add the template as a parent element in the app component. This can be done by editing the content of `_app.js` file.

```javascript
// _app.js file

import React from “react”
import Message from "../src/utils/alert-template";
import Head from “next/head”

function App({ Component, pageProps }) {
    return (
      <React.Fragment>
       <Head>
         <link rel="icon" href="#" />
         <meta
           name="viewport"
           content="minimum-scale=1, initial-scale=1, width=device-width"
         />
         <title>React alert example</title>
       </Head>
       <Message>
          <Component {...pageProps} />
       </Message>
      </React.Fragment>
    );
}

export default App;
```

We have provided the alert template to the app component. Now let's import the SignUp form component into `pages/index.js`

```javascript
import React from "react";
import SignUp from "../src/container/App";

export default function IndexPage() {
  return <SignUp />;
}
```

### Wrapping it up

You have noticed we didn’t dive into the styling of this project. You can go ahead and style your project as you like.

You can also check out react-alert’s [documentation](https://github.com/schiehll/react-alert) to get a good understanding of how the package works.

I have provided a link to the GitHub [repository](https://github.com/Caleb335/react-alert-test), check it out to see how it works.

Happy Coding!

---
Peer Review Contributions by: [Espira Marvin](/engineering-education/authors/espira-marvin/)
