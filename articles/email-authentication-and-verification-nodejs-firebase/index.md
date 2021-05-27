### Introduction
Email verification is a mechanism to ensure that a system does not stack its database with fake email addresses. An account remains unverified until the user verifies it through a unique link sent to his email address.
In the meantime, the system restricts the account from the core functionalities of the application.

### Table of contents
- [Introduction](#introduction)
- [Goal](#goal)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
- [Building the server-side](#building-the-server)
  - [Import the dependencies](#import-the-dependencies)
  - [Routing](#creating-the-application-routes)
- [Building the UI](#the-user-interface)
- [Adding Firebase to the application](#adding-firebase-to-the-application)
- [Create Account Function](#create-account-function)
- [Login Functionality](#login-function)
- [Sending Verification Link Email](#send-email-verification-link)
- [Running the server](#starting-the-server)
- [Conclusion & Further Reading](#conclusion-and-further-reading)

### Goal
By the end of this article, you will understand the logic of email verification. We will go through a stepwise implementation of the same using NodeJs, Firebase, and Express. 

### Prerequisites
To effectively follow along with me in this tutorial,
- You will need to have [Node.js](https://nodejs.org/en/) installed on your computer.
- A basic understanding of Node.js
- A suitable code editor. I will go with [Visual studio code](https://code.visualstudio.com/download).

### Project setup
We will set up the project just like any other `Node.js` project. Execute the command below to get started.
```bash
npm init -y
```
> Next, we will install the required dependencies. We need `express` for our backend, `body-parser` to handle HTTP  requests, `ejs` to render our HTML files, and `nodemon` to constantly update the changes as we develop the application.

Execute the command below to install the dependencies:
```bash
npm install –save express, body-parser, ejs, nodemon
```
Next, we will create all the files and directories for the project. The project structure should be as below.
```bash
    ┣ node-modules
    ┣ static
    ┣ views
    ┃   ┣ login.html
    ┃   ┣ profile.html   
    ┃   ┗ signup.html
    ┣ index.js
    ┣ package-lock.json
    ┣ package.json
    
```
### Building the server 
The `index.js` file is the entry point of the application. It will also act as the server file for the project. 

#### Import the dependencies
To bring in the dependencies, add the snippets below to your `index.js` file.
```js
//Express
const express = require('express');

//body-parser
const bodyParser = require('body-parser');

//ejs
const ejs = require('ejs');

//using express 
const app = express();

//using bodyparser
app.use(bodyParser.json())

app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));
```

### Creating the application routes
We need three routes for this project:
- The default route is the `signup` where the user registers and automatically logs in to their account.  

```js
    //sign up route
    app.get("/signup", function (req, res) {
        res.render("signup.html");
    });
```

- The next route is the `login` route  which takes the user to the login page. In the login page,  the user logs into thier account using an email and password supplied during registration.
```js
    //login route
    app.get("/login", function (req, res) {
        res.render("login.html");
    });
```

- Th last route is the `profile` route take the user to his profile page where the user can see his account status and request a verification link.
```js
    //user profile route
    app.get("/profile", function (req, res) {
        res.render("profile.html");
    });
```
### The User Interface
In the `views` folder, create three HTML files named `login.html`, `signup.html`, and `profile.html`. 
You can find  the files for the user interface in [this link.](https://replit.com/@PhinaKersly/Email-verification)

#### Login page user interface
![Login Page](/engineering-education/content/articles/email-authentication-and-verification-nodejs-firebase/login.png)

#### Sign up page user Interface
![Ceate Account Page](/engineering-education/content/articles/email-authentication-and-verification-nodejs-firebase/register.png)

#### Profile page user interface
![Ceate Account Page](/engineering-education/content/articles/email-authentication-and-verification-nodejs-firebase/homepage.png)

### Adding Firebase to the application
In the next phase, we will get to the core functions of the application. To use firebase, we need to obtain authorization for firebase to know who is accessing the firebase functions. We need to generate a `config` object for use with the application. To generate `config` object, check out [this guide](https://firebase.google.com/docs/web/setup#node.js-apps_1). Your final firebase `config` object should look like this:
```js
    var config = {
        apiKey: "YOUR API KEY",
        authDomain: "YOUR AUTH DOMAIN",
        databaseURL: "YOUR DATABASE URL",
        projectId: "YOUR PROJECT ID",
        storageBucket: "STORAGE BUCKET,
        messagingSenderId: "5MESSAGE SENDER ID",
        appId: "YOUR APPLICATION ID"
    };
```

### Create Account Function
This function calls firebase auth to create a new account with the supplied email and password. After a successful, account creation, the function automatically logs the user into thier account and redirects them to the profile page.
```js
    // initialize firebase
    firebase.initializeApp(config);
    function createAccount(){
        // obtain user email and user password from HTML
        var userEmail = document.getElementById("email_field").value;
        var userPass = document.getElementById("password_field").value;
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch((error) =>{
            //error code
            var errorCode = error.code

            //error message
            var errorMessage = erorr.message                
        }).then(() => {
            //redirect the user to profile page
            window.location.assign("/profile");
        });
    }
```

### Login Function
The login function takes the user's email and password and calls firebase to authenticate the user. It returns an error if the user does not exist or the password is wrong. 
Add the snippets below in the `script` tag of the login page.
```js
    // initialize firebase
    firebase.initializeApp(config);
    function login(){
        // obtain user email and user password from HTML
        var userEmail = document.getElementById("email_field").value;
        var userPass = document.getElementById("password_field").value;  
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
            //error code
            var errorCode = error.code

            //errod message
            var errorMessage = erorr.message    

            //show error message
            window.alert("Error : " + errorMessage);
        }).then(() => {
            //redirect the user to profile page
            window.location.assign("/profile");
        });
    }
```

### Send Email Verification Link
This function is responsible for extracting the user email from the database and sending a unique link to the email used during account creating. 
Before the verification, the account verified status reads false meaning that the account is not verified.
```js
    //initialize firebase
    firebase.initializeApp(config); 
    const user = firebase.auth().currentUser; 

    // send verification email
    function sendVerificationEmail(){
        // extracting the user from the firebase
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
            window.alert("Verification link sent to your email. Kinldy check to verify your account")
        }).catch(function(error) {
        // An error happened.
        });                
    }  
```
After the function is executed successfully, a link is sent to the email supplied during registration as shown below.
![Email link ](/engineering-education/content/articles/email-authentication-and-verification-nodejs-firebase/link-in-email.png)

Upon clicking the link, the user is redirected to a new page. The page shows the verification process status as below: 
![Email verification redirect](/engineering-education/content/articles/email-authentication-and-verification-nodejs-firebase/link-redirect.png)

When the user gets back to their account, the account verified status changes to `true`.
![Account Verified](/engineering-education/content/articles/email-authentication-and-verification-nodejs-firebase/account-verified.png)

### Starting the server
In this phase, we will test out application by running the command `nodemon start` in the terminal. We need to add the below code  in the `index.js` file:
```js
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
```

### Conclusion and Further Reading
In This tutorial, we learned how email authentication and verification are done using firebase. Through the tutorial, we can appreciate how useful this functionality can be in ensuring that users are legit before accessing the resources of a given system.
You can find the entire source code of the application [here](https://replit.com/@PhinaKersly/Email-verification). Just be sure to replace the firebase `config object` with your own.

To find more about the topic, you can check the resources in the following links:
- Adding Firebase to Node.js: https://firebase.google.com/docs/web/setup
- Managing firebase users: https://firebase.google.com/docs/auth/web/manage-users

