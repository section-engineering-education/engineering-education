---
layout: engineering-education
status: publish
published: true
url: /client-side-auth-with-express-cookie-parser/
title: Client Side Authentication with Express Cookie Parser
description: This article will guide the reader on how to create a cookie-based authentication system with Express. It will also discuss how to secure cookies using a session secret.
author: arafat-olayiwola
date: 2022-02-14T00:00:00-05:20
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/client-side-auth-with-express-cookie-parser/hero.png
    alt: Client-side Authentication with Express Cookie Parser
---
Cookies are small pieces of data that can be stored, or sent to the web browser in a request. They are commonly used as a storage medium.
<!--more-->
For example, cookies can be used to keep clients logged in, store user preferences such as languages, location, and other tracking information.

Cookies are stored in the web browser as key-value pairs. The key serves as the signature of the client data, or the name given to the specific cookie. The value represents the specific data that is required.

In this article, we will build an interactive client-side authentication app using *Express and cookie parser*.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Overview of web browser cookies](#overview-of-web-browser-cookies)
- [Browser cookies properties](#browser-cookies-properties)
- [Client side authentication with cookie parser library](#client-side-authentication-with-the-cookie-parser-library)
- [Securing browser cookies](#securing-browser-cookies)

### Prerequisites
To follow along with this tutorial, you need:
- An understanding of the JavaScript programming language.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- [Node.js](https://nodejs.org/en//) installed.
- An understanding of [Express.js](https://expressjs.com/).

### Objectives
In this tutorial, we will learn client-side authentication with web browser cookies using the *Express cookie parser* library. 

We will also learn and apply the following sections to the project:

- An overview of web browser cookies.
- The different browser cookie properties.
- Client-side authentication with the cookie parser library.
- Securing browser cookies from attacks.

### Overview of web browser cookies
Web browser cookies can be found under the *application storage* tab in the browser's *DevTools*.

Both the client-side and server-side are useful when it comes to setting cookies. Specifically, we want the browser to always remember a bit of information. This is why cookies are quite useful.

Cookies are set in the browser whenever the `set-cookie` header is attached to the request `headers`. 

This `set-cookie` header has the properties of `key-value` pairs where the `key` represents the `name`, and the `value` is the cookie `data` to be set.

Furthermore, let's demonstrate how to set a cookie on the client-side by navigating to `https://example.com`. 

On this domain page, right-click anywhere, and open the console.

You can set the cookie on the client-side of this domain by running the following code in the console.

```javascript
document.cookie="example=domain"
```

In the above code, the `example` is the `key`, while the `domain` is the `value`. Note that, this can be anything of your choice. The image below is a description of the cookie setting.

![Example Cookie](/engineering-education/client-side-auth-with-express-cookie-parser/cookie.png)

### Browser cookies properties
Cookies are sent on each client request to the server. Every domain name serves as a bucket that stores all the created cookies. 

For instance, when we sent a request to the domain `example.com` earlier, no cookie came with it. But we later injected one through the console and that filled the `name`, and `value` properties.

Browser cookies have different properties that developers can exploit. Each attribute can be filled either through client injection in the console or on the server whenever there is a request to the backend. 

The following are some properties of cookies:

#### 1. Name
This is the name given to the particular cookie saved in the browser. This can be filed using the `key` in the cookie data.

#### 2. Value
In the same instance, it stores the value of the cookie data. This is the main information that we want the browser to remember.

#### 3. Domain
It stores whatever URL the client request was sent to. That is the domain name that fetches the cookie data to the browser.

#### 4. Path
It denotes the specific path or URL that will push the cookie to the browser if requested.

#### 5. Expires
Developers use this option to set the maximum time that the cookie will last in the client browser. This can be set on the server then stored on the client-side when a request is made.

### Client-side authentication with the cookie parser library
Under this section, we will explore how to authenticate a client from the backend using the cookie parser library.

Launch your terminal and execute the following commands to create some files:

```bash
cd Desktop

mkdir project && cd project

touch server.js index.html
```

You navigated to `~/Desktop`, then created a `project` directory and changed to it. Inside the folder, you made 2 files, `server.js` and `index.html`. These are for the *server-side* code and client-side HTML.

Now, you need to install some dependencies that are required to set up the server. From the `node js` installed locally, you should have access to the `npm` library.

Run the following commands:

```bash
npm init

npm install express cookie-parser body-parser crypto --save
```

Open the `index.html`, and `server.js` file in your code editor and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
</head>
<body>
    <div>
        <h1>Welcome: Kindly login to your bank account</h1>
        <form action="/login" method="POST">
            <div>
                <label for="username">Username</label>
                <input type="text" name="username"/>

            </div>
            <br><br>
            <div>
                <label for="passsword">Password</label>
                <input type="password" name="password" id=""/>
            </div>
            <br><br>
            <button type="submit">Submit</button>
        </form>
    </div>
</body>
</html>
```

This HTML template shows the form page where the user enters their `username`, and `password`. There is a `button` for data submission and a welcoming message.

```javascript
const express = require('express')
const bodyParser = require('body-parser');
const { createReadStream } = require('fs')

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // to parse the data sent by the client

// temporary database for users
const USERS = {
    'user1': 'password1',
    'user2': 'password2'
}

// hompage route
app.get('/', (req, res) => {
  createReadStream('index.html').pipe(res);
})

// routing for the login page
app.post('/login', (req, res) => {

  const username = req.body.username; // get username from the client form data
  const password = USERS[username]

// only if the passwords are equal
  if (password === req.body.password){
    res.send('Logged in successfully!')
  }
  res.send('Failed to login!') //   else condition

})

app.listen(process.env.port || 3000); // Server lisening to localhost and port 3000
```

In the code above, we set up two routes both the `get` and `post` methods for the *home page* and the *login page* respectively. 

Under the `get` method, we read the stream created from the `index.html` and send it to the server.

Furthermore, the `post` method retrieves client form data and checks for the validity of the input password from the temporary database. The client will get a response based on the provided conditions.

Open your browser and navigate to *localhost:3000*, to see the *welcome message* on the *home page*:

![Login Page](/engineering-education/client-side-auth-with-express-cookie-parser/login.png)

> Note: If the user details that were entered are different from those in the temporary database in the backend, then the login attempt will fail.

We need to make use of the `cookie-parser` library to store the client username in the browser cookie. 

This library allows both the response and request from the server to make use of `cookie()` and `cookies()` methods.

The `cookie()` method can be called on the response argument in the callback function. It allows one to save data on the browser cookie. 

The `cookies()` method is used to reference the saved cookie data from the browser.

To implement these methods, add the following code in the `server.js` file:

```javascript
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createReadStream } = require('fs')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser()); // initializing the lib

// temporary database
const USERS = {
    'user1': 'password1',
    'user2': 'password2'
}

const BALANCES = {
  'user1': 500,
  'user2': 1000
}

// routing for  the homepage
app.get('/', (req, res) => {
  const username = req.cookies.username;  // getting stored username from the browser cookies
     const balance = BALANCES[username];
  // checks for the username if it exists
  if (username) {
    res.send(`Hi ${username}! Your balance is $${balance}.`);
  }
  else{
    createReadStream('index.html').pipe(res);
  }

})

// routing for the login page
app.post('/login', (req, res) => {
  const username = req.body.username; // getting username from the client parsed data
  const password = USERS[username]

// passwords check validity
  if (password === req.body.password){
    res.cookie('username', username); // storing username after passwords validity
    res.send('Nice! You are successfully logged in.'); // response after
  }
  else{
    res.send('Failed to log in!');  // if password checks fail
  }

})

// routing for logout
app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/')
})

app.listen(process.env.port || 3000); // Server lisening to localhost and port 3000
```

When you submit the form data, you should get the response after the password check is passed. Navigate to *localhost:3000* to confirm whether you are truly logged in or not.

If you are properly logged in, you should see the same page with the image below. Open the console and check for the saved username under the *cookies* section.

![Succesful Login Page](/engineering-education/client-side-auth-with-express-cookie-parser/loggedin.png)

> One problem that arises relates to the cookie's security. An intruder can easily edit the cookie data to something else.


### Securing browser cookies
To secure browser cookies, we will implement a cookie secret on each request. This secret will serve as the cookie signature that signs all the client requests to the data.

Instead of storing the username plainly in the cookie, we can make a session identity. That is, a `sessionId` that keeps changing for every client. 

In addition, every session identity will be stored in the database and gets cleared once the client is logged out or no longer in session.

Replace the code in the `server.js` with the following:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createReadStream } = require('fs');
const { randomBytes } = require('crypto');

const COOKIE_SECRET = 'dashldhe128ewhgcvasdy7et2hvhwytt2';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(COOKIE_SECRET));

// sessionID -> username
const SESSIONS = {}

// temporary database
const USERS = {
    'user1': 'password1',
    'user2': 'password2'
}

const BALANCES = {
  'user1': 500,
  'user2': 1000
}

// routing for  the homepage
app.get('/', (req, res) => {
  const sessionId = req.cookies.sessionId
  // getting stored username from the browser cookies
  const username = SESSIONS[sessionId];
  
  // checks for the username if it exists
  if (username) {
    const balance = BALANCES[username];
    res.send(`Hi ${username}! Your balance is ${balance}.`)
  }
  else{
    createReadStream('index.html').pipe(res);
  }
})

// routing for the login page
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = USERS[username]

  if (password === req.body.password){
    // getting the next sessionId from crypto lib
    const nextSessionId = randomBytes(16).toString('base64')
    // storing username after passwords validity
    res.cookie('sessionId', nextSessionId);
    SESSIONS[nextSessionId] = username;
    res.redirect('/');
  }
  else{
    // if password checks fail
    res.send('Failed to log in!')
  }

})

// routing for logout
app.get('/logout', (req, res) => {
  const sessionId = req.cookies.sessionId;
  // deleting the sessionId from temporary database
  delete SESSIONS[sessionId];
  // clearing the stored cookies sessionId
  res.clearCookie('sessionId');
  res.redirect('/');
})

// Server lisening to localhost and port 3000
app.listen(process.env.port || 3000);
```

To test the implementation, clear out the stored cookies session, and then navigate to *localhost:3000/login* on your browser. 

Enter client data that corresponds to that stored in the temporary database in the backend. When you open the browser cookie on the browser, you should see the session identity stored properly.

Let's open the *incognito* mode of the browser and log in to another user. You will receive different session identities that can not be changed. 

The following image displays an instance of what the session identity looks like:

![Session Page](/engineering-education/client-side-auth-with-express-cookie-parser/session.png)

### Conclusion
Authenticating clients from web browser cookies can be complex and time-consuming. In this tutorial, we have outlined how one can perform authentication using the *cookie-parser* library.

We also discussed an overview of browser cookies and their attributes, as well as how to store client data with cookies.

Finally, we looked at how to prevent attacks by signing cookie data with a session id.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)