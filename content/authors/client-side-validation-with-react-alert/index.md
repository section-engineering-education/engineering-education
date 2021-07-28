Having a way to check if the data that a user is sending to the webserver of a web application is correct or valid is a feat that JavaScript enables on the web.

This feature gives frontend developers the ability to create logic that checks the data that users type into the input fields of web apps.

In this article, we’re going to have a look at how to do this by using an npm package called [react-alert](package link). react-alert makes it easier to render the error messages from the logic that developers create.

You should have an idea of the following before you read this article any further so that there wouldn’t be any form of confusion.

1. We’d be needing [NodeJs](https://nodejs.org) since we’re making use of an npm package called react-alert

2. An idea of how conditional statements works in react/JavaScript

3. How npm works and how to install npm packages as dependencies in your projects

4. A little understanding of DOM Manipulation

### Overview

Before React, vanillaJS was the “go-to” solution for client-side validation. One would need to understand the fundamentals of DOM manipulation and event handling.
Since the aim of this validation process is to check if the data or information sent by the user to the server is appropriate by listening to the events that take place on the webpage.

These events range from the click of a button `onClick`, the mouse hovering effect on a particular element on the page `onMouseOver`, the submission of details entered into a webform via the `onSubmit` event and many more that I can’t mention. If you want to know more about events in JavaScript, you should check them out [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events).

Performing these tasks (DOM manipulation) in vanillaJS isn’t a big deal because the DOM is available. But in React, the DOM isn’t available a virtual DOM is available instead.

Although, manipulating the DOM in React undergoes the same process of doing that in vanillaJS but there are some quirks to it. One of them is how the `document` object isn’t available in React since it is being bundled with nodejs which doesn’t run on the client-side of a web browser.

Getting Started
We’ve had a look at what we’d be needing in this article in the first section. To be able to perform client-side validation in React, in the scope of this article, let’s start by installing the necessary `npm` dependencies.

I’d be making use of NextJS to bootstrap my react application because of its simplicity, its folder structure, and many other benefits of using it.

You don’t need to make use of NextJS if you don’t want to, you can decide to make use of [create-react-app](https://create-react-app.dev/) or bootstrapping your react app with [ParcelJS](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-parcel). Feel free to make use of any approach that’d be most convenient for you.

To get started with NextJS, type the command below into your terminal, it will install all the dependencies that you’d need to create a React application.

`npx create-next-app name-of-your-app`

Since this article focuses on the use of “react-alert” for client-side validation in react. We need to also add it to the list of dependencies that’d be used in the project. The command below will handle that for us.

`npm install react-alert –save-dev`

Foundational knowledge of conditional statements in JavaScript will speed up the process of writing/creating these conditions or checks on the input fields that’d be getting the data that’s being entered into them.

A basic conditional statement is shown below, the `if()` statement. It is the most used one in JavaScript, it checks if the value that is passed as an argument is true, if it isn’t, it returns false.

```js
if (username) {
  console.log(username);
}
```

There are cases where the conditional statement doesn’t just stop at the closing curly braces. If there are other conditions that need to be checked, we can add the next conditional statements until a satisfactory result is obtained

The other conditional statements that go _hand-in-hand_ with the `if()` statement are `else` and `else if()`. As their naming convention implies, `else` is used whenever there is no condition left to be checked, while `else if` is used when there are more conditions to be checked.

It is this same principle that we’re going to use in implementing the client validation in this project.

Setting up the validation script

Before creating the validation script, let’s have a look at the folder structure of the app so that the process of traversing the app system/architecture doesn’t get confusing or ambiguous as we proceed.

```
|--pages
| |--_app.js
| |--index.js
|--src
| |--container
|   |--App
|	|--index.js
|--utils
  |--checks.js
  |--alert-template.js
```

The structure above is an excerpt of what the real application structure looks like. But, for the sake of brevity and the level of importance of the files that we’d be interacting with, the structure above fits the scope of this article.

The structure above shows that `checks.js` is inside the `utils` folder. `checks.js` is where we’d have all the client-side validation logic.

Since we’d be interacting/writing this logic for web forms... we need to look for a way to target the input elements that are receiving data from the user at the client side. Luckily for
us, the browser has provided some DOM APIs that we can use to achieve that. Take a look at an example below:

```html
<input type="”text”" name="”fullname”" id="”fullname”" className="”fullname”" />
```

```js
const fullnameInputField = document.querySelector(“#fullname”)

console.log(fullnameInputField)
```

The snippet above logs the HTML code to the console. You can check the result by open the developer tools of your browser, on Google chrome, this shortcut brings the console up. `ctrl + shift + i`.

If we were to target the input element via its `className`, the snippet above would now be:

```js
const fullnameInputField = document.querySelector(“.fullname”)
```

Note that the pound sign `(#)` has changed to the period sign `(.)` because we’re targeting that DOM node via its className property.

Now let’s have a look at the validation snippet below:

```js
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
    if (password != confirmPassword) {
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

Wow! I know that might be your reaction right now, but do not fret, We’d have a breakdown of what each snippet does as we move on.

- **Passing form values as props**
  The snippet above is a helper function that performs validation on the type of data that gets into the form field before it is sent to the backend server. The function accepts the `email`, `password`, `confirmPassword`, and `alert` as arguments.

```js
let errMsg;

const validateSignUp = (email, password, confirmPassword, alert) => {};
```

We’re passing `alert` as an argument to the function so that we can have access to it when it is imported into the app component. The same thing goes for the other arguments too.

The `errMsg` variable serves as the container that stores and thus displays the error message from the logic. That is why we declared it with the `let` statement, so it can be reassigned to any other value in the code execution process.

- **The conditional statements**

  - The first condition checks if the email field is empty, if it is, an alert error message is rendered in the user interface due to the execution of `alert.error()`

  The string inside the parenthesis is what will be displayed on the UI, and the browser makes sure that the input field is in focus so that it catches the attention of the user.

  ```js
  if (!email) {
    alert.error("Please input your email address");
    emailInput.focus();
    errMsg = false;
  }
  ```

  - The next condition checks if the user enters any password at all. If there’s no value in the form field, an error pops up in the browser, while the next one checks for the validity of the password’s length.

  ```js
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

  - This conditional statement checks if there is a match between the first and second passwords. The logic below employs the use of closures in JavaScript to perform this particular validation.

  ```js
  else if (typeof password !== "undefined" && typeof confirmPassword !== "undefined") {
      if (password != confirmPassword) {
          alert.error("Passwords don't match");
          confirmPasswordInput.focus();
          errMsg = false;
      }
  }
  ```

  It runs a conditional execution on both password fields to see/make sure that both of them are not undefined (i.e that, they have string values in them). If this first condition passes, the next one will run, if not the next one wouldn’t.

  - If all the conditions stated, have been checked, the alert window comes up with successful text

### Using the validator

Now that we have the validation script set up, and have gotten a grasp of what is going on in the script, it is time to get it inside the app itself. We’d have a look at the step-by-step process of accomplishing that.

First, we need to have it (the validation script) imported into the App component, alongside the react-alert dependency. For brevity’s sake, I wouldn’t be doing much of an explanation on the React component structure, since it is among the pre-requisites of this article.

```js
import React from “react”
import { withAlert } from "react-alert";
import validateSignUp from "../../utils/check.js";

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
    <section className={style.signup__root}>
        <div className={style.form__wrapper}>
            <form onSubmit={handleSubmit}>
               <div className={style.form__group}>
                <p>Email Address</p>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control`}
                    defaultText="youremail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className={style.form__group}>
                <p>Enter Password</p>
                  <input
                    name="password"
                    id="pwd"
                    className={`form-control`}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className={style.form__group}>
                <p>Confirm Password</p>
                <input
                  name="confirm__pwd"
                  id="pwd__conf"
                  className={`form-control`}
                  placeholder="enter your password again"
                  value={pwdConfirm}
                  onChange={(e) => setPwdConfrim(e.target.value)}
                />
                <button className={`btn-primary`}>Sign up</button>
            </form>
        </div>
    </section>
  );
};

export default withAlert()(SignUp);
```

Taking a look at the `handleSubmit` function, you’d notice how the arguments from the `signUpCheck` validator are being utilized. In the function, another condition must be met before the form can be submitted.

```js
const validate = validateSignUp(email, password, pwdConfirm, alert ||" ");

    if (validate) {
      alert.success("You've signed up successfully. Proceed to login");
    }
};
```

- **Setting up the alert template**

This step involves providing the `react-alert` template API to our application. Without this, the error messages wouldn’t be displayed on the webpage. Let’s start by taking a look at the setup below.

We’d start by creating a component that’d serve as a container for the error messages. In the `utils` folder, we’d add all the logic of the alert-template.

```js
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

This snippet below shows a conditional statement but in a ternary syntax. What this translates to, is: when the `options.type` is “success”, add a CSS class of “msg-success”, if not, add a CSS class of “msg-error”.

The “msg-success” gives the alert template/modal a green background while “msg-error” adds a red background to the template.

Once that is complete, we’d go-ahead to add the template as a parent element in the app component. That can be done by editing the content of `_app.js`

```js
import React from “react”
import Message from "../src/utils/Message";
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
       </Head>
       <Message>
          <Component {...pageProps} />
       </Message>
      </React.Fragment>
    );
}

export default App;
```

Wrapping it up
You’d have noticed that we didn’t dive into the styling of this project, that is because I do not want the article to be too long. You can go on ahead to any styling that befits this project. You can still check out react-alert’s [documentation](https://github.com/schiehll/react-alert) so you have a full understanding of how the package works.

Thank you for reading this article, I hope it helped you!
