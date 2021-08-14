Javascript supports a feature to verify if the data sent by a user from a web application to a web server is valid or not.

This feature gives front-end developers the ability to verify a user's input data. Before the data gets sent to the webserver.

In this article, we’re going to look at how to verify input data using an npm package [react-alert](https://www.npmjs.com/package/react-alert). `react-alert` makes it easier to render the error messages back to the user, in case of invalid user input data.

### Prerequisites

To follow along with this tutorial, you'll need:

1. [Nodejs](https://nodejs.org) 10.x or newer.

2. [NPM ](https://www.npmjs.com/package/npm5) 5.10 or newer.

3. Knowledge of conditional statements in Javascript.

4. Basic knowledge of React JS.

5. Basic knowledge of DOM Manipulation.

### Overview

Before React, vanilla JS was the go-to solution for client-side validation. One would need to understand the fundamentals of DOM manipulation and event handling.

The aim of this validation process is to check if the data sent by the user to the server is appropriate. Event listeners will help us listen to events that take place on the webpage.

These events range from the click of a button `onClick`. The mouse hovering effect on a particular element on the webpage `onMouseOver`. The submission of details entered into an input form using the `onSubmit` event, and much more.

If you want to learn more about events in JavaScript. Visit [Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events).
Performing DOM manipulation in vanilla JS isn’t a big deal because the DOM is available. But in React, the DOM isn’t available, a virtual DOM is available instead.

Although, manipulating the DOM in React undergoes the same process of doing that in vanillaJS but there are some quirks to it. One of them is how the `document` object isn’t available in React since it is being bundled with nodejs which doesn’t run on the client-side of a web browser.

### Getting Started

We’ve had a look at what we’d be needing in this article in the first section. To be able to perform client-side validation in React, in the scope of this article, let’s start by installing the necessary `npm` dependencies.

I will be using Next.JS to bootstrap my React application. Because of its simplicity, its folder structure, and many other benefits.

You don’t need to use Next.JS. You can either:
1. Create a React app using [create-react-app](https://create-react-app.dev/). 
2. Or bootstrap your React app with [ParcelJS](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-parcel). 
Feel free to make use of any approach that would be most convenient for you.
To get started with Next.JS. In your workspace, open the terminal and run the command below.

`npx create-next-app name-of-your-app`
This will install Next.JS all the dependencies needed to create a React application.
Because this article focuses on the use of `react-alert` for client-side validation in react. We need to also add `react-alert` package to the list of dependencies needed in the project. The command below will handle that for us.

`npm install react-alert –save-dev`

Foundational knowledge of conditional statements in JavaScript will speed up the process of writing/creating these conditions or checks on the input fields that’d be getting the data that’s being entered into them.

A basic conditional statement is as shown below, the `if` statement. It is one of the most used in JavaScript, it checks if the value passed as an argument is true, if it is not, it returns false.

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

First, we need to import the validation script into the App component, alongside the react-alert dependency. For brevity’s sake, I wouldn’t be doing much of an explanation on the React component structure, since it is among the pre-requisites of this article.

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

Taking a look at the `handleSubmit` function, you’d notice how the arguments from the `signUpCheck` validator are being utilized. In the function, all conditions must be met before the form can be submitted.

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

Once that is complete, we’d go ahead and add the template as a parent element in the app component. This can be done by editing the content of `_app.js` file.

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

### Wrapping it up

You have noticed we didn’t dive into the styling of this project, that is because I do not want the article to be too long. You can go ahead and style your project to your own liking.

You can also check out react-alert’s [documentation](https://github.com/schiehll/react-alert) so you get a good understanding of how the package works.

Thank you for reading this article, I hope it helped you!
