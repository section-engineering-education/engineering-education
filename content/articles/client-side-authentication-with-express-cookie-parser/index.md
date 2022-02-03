### Introduction
Cookies are small pieces of data that can be stored, and also sent to the web browser in each request. They are used as a storage medium, session management that keeps client logged in, and user personalization like choosing a language, tracking information e.t.c.

These are also stored in the web browser as key-value pairs. The key serves as the signature of the client data, or the name given to the specific cookie. The value is said to be the particular data required, be it for authentication or more.

In this article, we will experience building an interactive client-side authentication using express cookies parser.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Overview of web browser cookies](#overview-of-web-browser-cookies)
- [Browser cookies properties](#browser-cookies-properties)
- [Demo of client side authentication with cookies parser library](#demo-of-client-side-authentication-with-cookies-parser-library)
- [Making browser cookies secured from attacks](#making-browser-cookies-secured-from-attacks)

### Prerequisites
To follow along with this tutorial, you are required to meet the following requirements:
- An understanding of the JavaScript programming language.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- [Node.js](https://nodejs.org/en//) installed.
- An understanding of [Express.js](https://expressjs.com/).

### Objectives
In this tutorial, we will be learning client-side authentication with web browser cookies using the express cookie parser library. In addition, you will learn and apply the following to your project.

- An overview of web browser cookies.
- The different browser cookie properties.
- Client-side authentication with the cookie parser library.
- Securing browser cookies from attacks.

### Overview of web browser cookies
The web browser cookies can be found under the application storage tab in the browser DevTools. Cookies are a medium of storage that is used for varieties of things like client authentication, language settings, tracking information, and more.

There are two main ways of setting the browser cookies. Both the client-side and server-side are useful when it comes to saving the cookies. Specifically, we want the browser to always remember a bit of information, and that is why cookies are mainly useful.

In addition, cookies are set in the browser whenever the `set-cookie` header is attached to the request `headers`. This `set-cookie` header has the properties of `key-value` pairs where `key` represents the `name`, and `value` is the cookie `data` to be set.

Furthermore, let us demonstrate how to set a cookie at the client-side by navigating to the domain called `example.com`. On this domain page, right-click anywhere, and open to the console.

You can set the cookie at the client side of this domain by typing the snippet below in the console.

```javascript
document.cookie="example=domain"
```

The `example` in the snippet above serves as the `key`, while the `domain` is the `value`. Note that, this can be anything of your choice. The image below is a description of the cookie setting.

![Example Cookie](/engineering-education/client-side-auth-with-express-cookies-parser/cookie.png)

### Browser cookies properties
You need to know that cookies are sent on every client request to the server. Every domain name serves as a bucket that any cookie created can be sent to. For instance, when we sent a request to the domain `example.com` earlier, no cookie came with it. But we later injected one through the console and that filled the `name`, and `value` properties.

Browser cookies have different properties that developers can make use. Every attribute can be filled either through client injection in the console or the server whenever there is a request to the backend. Let us go through the feature of cookies together.

#### Name
This is the name given to the particular cookie saved in the browser. This can be filed through the `key` in the cookie data.

#### Value
In the same instance, it stores the value of the cookie data. This is the main information that we want the browser to remember for our pieces of stuff. 

#### Domain
This always stores whatever URL the client request was sent to. That is the domain name that fetches the cookie data to the browser.

#### Path
One has the option to set the path also. This denotes the specific path that will generate the cookie to the browser if requested.

#### Expires
This is the option required to set the maximum age that the cookie will last in the client browser. This can be set from the server which gets saved on request.

We will experience how to store each of these properties later in the tutorial. Stay put!

### Demo of client-side authentication with cookies parser library 
Under this section, we will explore how to authenticate a client's login from the backend with the library.

Open your terminal and execute the following command to make some files.

```bash
cd Desktop

mkdir project && cd project

touch server.js index.html
```

You just changed to `Desktop`, then made a directory of `project` and changed to it. Inside the folder, you made 2 files, `server.js` and `index.html`. These are for the server-side code file and template HTML file respectively.

Now you have to install some dependencies required to set up the server. From the `node js` installed locally, you should have access to the `npm` library.

Run the following commands.

```bash
npm init

npm install express cookie-parser body-parser crypto --save
```

Open the `index.html`, and `server.js` file in your code editor and add the codes snippet below.

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

This `html` template shows the form page where the user enters both the `username`, and `password`. There is a `button` for data submission, and the welcoming message.

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

In the code above, we set up two routes both the `get` and `post` methods for home and the login page respectively. Under the get method, we read the stream created from the `index.html` and send it straight to the server.

Furthermore, the POST method gets client form data and check for validity of the input password from the temporary database. The client will get a response based on the condition stated.

Open your browser at <localhost:3000>, and confirm the welcome message from the home page. When you navigate to the URL <localhost:3000/login>, the page should have a form like the image below.

![Login Page](/engineering-education/client-side-auth-with-express-cookies-parser/login.png)

> Note: If the user details entered are different from the temporary database in the backend, then such a client will fail to log in.

Now let us make use of the `cookie-parser` library to store the client username in the browser cookie. This library will allow both the response and request from the server to make use of `cookie()` and `cookies()` methods.

The `cookie()` method can be called on the response argument in the callback function, and this allows to save data in the browser cookie. While the `cookies()` method is called on the request callback args. The method is used to reference the saved cookie data from the browser.

To implement these methods from the library, replace the code in the `server.js` file with the code below;

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

When you submit the form data, you should get the response after the password checks got passed. Navigate to <localhost:3000> to confirm whether you are truly logged in or not.

If you are properly logged, you should see the same page with the image below. Open to the console and check for the saved username under the cookies section.

![Succesful Login Page](/engineering-education/client-side-auth-with-express-cookies-parser/loggedin.png)

> Note: There is one bug at this time, and that is about the security of the cookie. It is not well secured because an intruder can just edit the cookie data to something else.

So how do I make the client data secured from the browser cookie?

### Making browser cookies secured from attacks
In order to make the browser cookies secured, we will implement a cookie secret for every request. This secret will serve as the cookie signature that signs all of the client requests to the data.

Instead of storing the username plainly in the cookie, we can make a session identity. That is, a `sessionId` that keeps changing for every client. In addition, every session identity will be stored in the database and gets cleared once the client is no longer in session or logged out.

Furthermore, the session identity will be made strong such that no intruder can guess the specific identity easily. 

Now replace the code in `server.js` with the following.

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

To test the implementation, first, clear out the stored cookies session, and then open to the <localhost:3000/login>. Enter client data that corresponds to the temporary database in the backend. Then navigate to the browser cookie, you should see the session identity stored in a proper way.

In addition, open the incognito mode of the browser, and log in to another user. You will definitely receive different session identities that can not be changed. The image below displays an instance of what the session identity looks like.

![Session Page](/engineering-education/client-side-auth-with-express-cookies-parser/session.png)

### Conclusion
Authenticating clients from the web browser cookies can be a little bit tedious and tasking. In this tutorial, we have implemented one of the nice ways that you can make use.

We talked about the overview of browser cookies and their attributes. Also, we discussed how to store client data with cookies, and finally looked at how to secure data from attacks by signing every cookie data with session identity.

Happy coding!
