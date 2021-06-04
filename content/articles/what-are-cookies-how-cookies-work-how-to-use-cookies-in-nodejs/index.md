Websites usually store a small amount of data on the browsers. There are three main kinds of browser-based storage: session storage, local storage, and cookie storage. This guide will discuss what a cookie is, how it works and how to use HTTP cookies in a Node.js application.

### Prerequisites

- Basic knowledge of [Node.js](https://www.youtube.com/watch?v=fBNz5xF-Kx4&t=1s)
- [Node.js installed](https://nodejs.org/en/) on your computer.
- Basic understanding of[ how to create an HTTP server using Express](/engineering-education/express/).

### What are cookies

A cookie is usually a tiny text file stored in your web browser. A cookie was initially used to store information about the websites that you visit. But with the advances in technology, a cookie can track your web activities to get your web content preferences. On more than one occasion, while accessing different websites, you have come across a popup screen similar to the one shown below.

![Accept cookies website popup](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/accept-cookies-website-popup.png)

This will help the website you have visited to know more about you and customize your future experience.

For example;

- Cookies save you language preferences. This way, when you visit that website in the future, the language you used will be remembered by that cookie, and it will serve you with the language you previously selected to read the content on that website.

- Probably you have visited an e-commerce website. When you select items into your shopping cart, a cookie will remember your choices, and when you come back to this website, your shopping list item will still be there. Basically, a cookie is used to remember data from the user.

Beyond the basic understanding, as a developer, cookies are small strings that contain key-value pairs of information sent from the webserver to the browser to get information about the user. The browser will save them to the current domain the user is in. This way, subsequent requests can be made to the server to immediately update user content on the website depending on the previous requests that a user made to the server. A cookie is HTTP generated; thus, called an HTTPcookie.

### A brief history of cookies

The first HTTP cookie was created in [1994 by Lou Montulli](https://en.wikipedia.org/wiki/Lou_Montulli#Career), an employee of [Netscape Communications](https://en.wikipedia.org/wiki/Netscape), the company that created the Netscape browser. Lou was creating an online store for a company that said their servers were getting full from storing each user's shopping cart data. He had to figure out a way not to store the contents of the shopping cart on the server. He came with an idea to save the shopping cart info on the user's computer using cookies to save server space. He borrowed this concept of HTTP cookies from a computing token called the [magic cookie](https://en.wikipedia.org/wiki/Magic_cookie) used to identify a user when logging into a system. The user data were stored in tiny bits of information on the user computer. So when the user makes the login request, the server would read this information from a user's computer and log in the user.

Lou recreated this concept and implemented it in a web browser. In 1994 the Netscape browser implemented cookies, followed by Internet Explorer in 1995. And that marked the birth of the modern web browser HTTP cookies.

### How cookies works

When a user visits a cookies-enabled website for the first time, the browser will prompt the user that this web page uses cookies and request the user to accept cookies to be saved on their computer. Typically, when a user makes a request to the server, the server sends back a cookie (among many other things). This cookie is going to be stored in the user's browser. When a user visits the website or sends another request, that request will be sent back together with the cookies. The cookie will have certain information about the user that the server can use to make decisions on any other subsequent requests.

Let's take the example of accessing Facebook from a browser. When you want to access your Facebook account, you have to log in with the correct credentials to be granted the proper access. But in this case, it would be tiresome to continuously log in to Facebook every time you come back.

When you first make a login request and the server verifies your credentials, the server will send your Facebook account content. It will also send cookies to your browser. The cookies are then stored on your computer and submitted to the server with every request you make to that website. A cookie will be saved with a unique identifier that is unique to that user. When you come back to Facebook, the request you make, the saved cookie, and the server will keep track of your login session and remember who you are and thus keep you logged in.

There different types of cookies

- Session cookies - store user's information for a short period. When the current session ends, that session cookie is deleted from the user's computer.

- Persistent cookies - a persistent cookie has an expiration date, and it is saved long as the webserver administrator sets it.

- Secure cookies - are used by encrypted websites to offer protection from any possible threats from a hacker.

Third parties - are cookies used by websites that show ads on their pages or track website traffic. They grant access to external parties to decide the types of ads to show depending on the user's previous preferences.

### The main difference between a session and a cookie

The major difference between [sessions](/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/) and cookies is that sessions live on the server-side (the webserver), and cookies live on the client-side (the user browser). Sessions have sensitive information such as usernames and passwords, that why they are stored on the server. For that reason, they are stored securely, for example, in a database. The session can identify and validate which user is making a request.

As we have explained, cookies are stored in the browser, and no sensitive information can be stored in them. They are typically used to save user's preferences.

### Setting up cookies with Node.js

Let's dive in and check how we can implement a cookie concept using Node.js. We will create and save a cookie in the browser, update and delete a cookie.

Go ahead and create a project directory on your computer. Initialize Node.js using `npm init -y` to generate a `package.json` file to manage Node.js project dependencies.

We will use the following NPM packages.

- **[Express](/engineering-education/express/)** - this is an opinionated server-side framework for Node.js that helps you create and manage HTTP server REST endpoints.

- **[Cookie parser](https://www.npmjs.com/package/cookie-parser)** - cookie parser looks at the headers in between the client and the server transactions, reads this header, parses out the cookies being sent, and saves them in a browse. Cookie parser will help us create and manage cookies depending on the request a user makes to the server.

Run the following command to install these NPM packages

```bash
npm install express cookie-parser
```

We will create a simple express server and use a simple example to demonstrate how cookies work.

#### Step 1: Import the installed packages

To set up a server and save cookies, import the cookie parser and express modules to your project. This will make necessary functions and objects accessible to setup an HTTP cookie.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
```

#### Step:2 Get your application to use the packages

You need to use the above modules as middleware inside your application, as shown below.

```js
//setup express app
const app = express()

// let’s you use the cookieParser in your application
app.use(cookieParser());
```

This will make your application use the cookie parser and Express.

#### Step:3 Set a simple route to start the server

```js
//set a simple for homepage route
app.get('/', (req, res)=>{
    res.send('welcome to a simple HTTP cookie server');
});
```

#### Step 4: Set a port number

This is a port number that the server should listen to when it is running. This will help us to be able to access our server locally. This server will listen to port 8000, as shown below.

```js
//server listening to port 8000
app.listen(8000, () => console.log('The server is running port 8000...'))
```

Now we have a simple server set. Run `node app.js` to test if it is working.

![Running an Express server](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/a-running-server.png)

And if you access the localhost port 8000 (`http://localhost:8000/`), you should get an HTTP response sent by the server. Now we’re ready to start implementing cookies.

### Setting cookies

Let's add routes and endpoints that will help us create, update and delete a cookie.

#### Step:1 Set a cookie

We will set a route that will save a cookie in the browser. In this case, the cookies will be coming from the server to the client browser. This means the cookie will be served to the browser response. To do this, use the `res` object and pass `cookie` as the method, i.e. `res.cookie()` as shown below.

```js
//a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});
```

When the above route is executed from a browser, the client sends a get request to the server. But in this case, the server will respond with a cookie and save it in the browser.

Go ahead and run `node app.js` to serve the above endpoint. Open `http://localhost:8000/getcookie` your browser and access the route.

To confirm that the cookie was saved, go to your browser's inspector tool 🡆 select the application tab 🡆 cookies 🡆 select your domain URL. I.e.,

![Saving a cookie in the browser](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/cookie-saved.png)

#### Step:2 Set a cookie

If the server sends this cookie to the browser, this means we can iterate the incoming requests through `req.cookies` and check the existence of a saved cookie. You can log this cookie to the console or send the cookie request as a response to the browser. Let's, do that.

```js
// get the cookie incoming request
app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});
```

Again run the server using `node app.js` to expose the above route (`http://localhost:8000/getcookie`). And you can see the response on the browser.

![A saved cookie](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/saved-cookie.png)

As well as on your console logs.

![Cookie saved in the console](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/cookie-saved-console-log.png)

#### Step:3 Secure cookies

One precaution that you should always take when setting cookies is security. The above cookie can be deemed insecure.

For example, you can access this cookie on a browser console using JavaScript (`document.cookie`). This means that this cookie is exposed and can be negatively exploited through cross-site scripting (XXS) methods.

If you open the browser inspector tool and execute the following in the console.

```js
document.cookie
```

The saved cookie values can be seen through the browser console.

![Browser console](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/browser-console.png)

As a precaution, you should always try to make your cookies inaccessible on the client-side using JavaScript. XXS can access this user's cookies and manipulate them.

We can add some attributes to make this cookie more secure.

- `HTTPonly` - ensures that a cookie is not accessible using the JavaScript code. This will the most crucial form of protection against cross-scripting attacks.

- `secure` - You can also add a secure attribute that ensures that the browser will reject cookies unless the connection happens over HTTPS.
- `sameSite` attribute - improves cookie security and avoids privacy leaks.

By default, `sameSite` was initially set to `none` (`sameSite = None`). This allowed third parties to track users across sites. Currently, by default, it is set to `Lax` (`sameSite = Lax`). Meaning a cookie is only set when the domain in the URL of the browser matches the domain of the cookie, eliminating the third party's domains. `sameSite` can also set to be `Strict` (`sameSite = Strict`). This will restrict cross-site sharing even between different domains that the same publisher owns.

- You can also add the maximum time you want a cookie to be available in the user browser. When the set time elapses, the cookie will be automatically be deleted from the browser.

Check [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) guide to learn more attributes and how you can use them in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) and [Node.js](https://www.npmjs.com/package/set-cookie-parser).

```js
//a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date('01 12 2021'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});
```

In this case, we are accessing the server on localhost, which is served on a non-HTTPS secure origin. For the sake of testing the server, you can set `secure: false`. However, always use `true` value when you want cookies to be created on an HTTPS secure origin.

If you run the server again (`node app.js`) and access the `http://localhost:8000/setcookie` on the browser, you can see that the values of the cookie have been updated with security values.

![Cookies updated security values](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/cookies-updated-security-values.png)

Furthermore, you cannot access the cookie using JavaScript, i.e., `document.cookie`.

![Cookie not accessed with JavaScript](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/cookie-not-accessed-with-javascript.png)

#### Step:4 Delete a cookie

Typically, cookies can be deleted from the browser depending on the request that a user makes. For example, if cookies are used for login purposes, when a user decides to log out, the request should be accompanied by a response that would delete the cookies used to authenticate that user.

Here is how we can delete the cookie we have set above in this example. Use `res.clearCookie()` to clear all cookies.

```js
// delete the saved cookie
app.get('/deletecookie', (req, res) => {
    //show the saved cookies
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
});
```

Open `http://localhost:8000/deletecookie`, and the saved cookie will be deleted.

![A saved cookie deleted](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/cookie-deleted.png)

### A use case: How to authenticate a user with cookies

Let's have a simple authentication example that uses cookies to allow access when a user first logs in to a website.

This is a boilerplate demonstrating a simple login. So no much explanation of what happens behind the scenes of the code. The aim is to show you how to use cookies to process a simple authentication.

#### Step:1 The project structure

Create a new project folder and initialize the Node.js project with `npm init -y`. Set up your project, as shown below in this structure.

```bash
└───node-js-auth-cookies
    ├───public
    │ styles.css
    │
    └───src
        │ index.js
        │
        └───views
                home.ejs
                login.ejs
                welcome.ejs
```

#### Step:2 Setting the project dependencies

This project will use the following pm packages.

- **[Cookie-parser](https://www.npmjs.com/package/cookie-parser)** - For parsing cookies from the response object to the request object.
- **[Express](/engineering-education/express/)** - Web framework for Node.js
- **[Ejs](/engineering-education/nodejs-ejs/)** - For rendering the views.
- **[Helmet](https://www.npmjs.com/package/helmet)** - For secure HTTP requests.
- **[Nodemon](https://www.npmjs.com/package/nodemon)** - For restarting the server during development.

Install the above packages using the command below.

```bash
npm i --save cookie-parser express ejs helmet nodemon
```

Since we are using nodemon to watch the server files, go ahead and change the `scripts` tag inside your `package.json` file as shown below.

```json
"scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
}
```

This will help us start the server with `npm run dev`, and nodemon will watch our file, restart the server whenever you make, and save changes in your server files.

#### Step:3 Setting up the server

We will set up the express server—assuming you already know how to set up one. The comments included inside the different lines on the code will help you figure out if you get stuck.

```js
// src/index.js

// import all the modules/packages
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");

// allow the app to use express
const app = express();

// allow the app to use cookieparser
app.use(helmet());

// allow the app to use cookieparser
app.use(cookieparser());

// allow the express server to process POST request rendered by the ejs files 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow the express server to read and render the static css file
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");

// render the ejs views
app.set("views", path.join(__dirname, "views"));

// a port number to expose the server
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  // render the home page
  return res.render("home");
});

app.get("/login", (req, res) => {
  // check if there is a msg query
  let bad_auth = req.query.msg ? true : false;

  // if there exists, send the error.
  if (bad_auth) {
    return res.render("login", {
      error: "Invalid username or password",
    });
  } else {
    // else just render the login
    return res.render("login");
  }
});

app.get("/welcome", (req, res) => {
  // get the username
  let username = req.cookies.username;

  // render welcome page
  return res.render("welcome", {
    username,
  });
});

app.post("/process_login", (req, res) => {
  // get the data
  let { username, password } = req.body;

  // fake test data
  let userdetails = {
    username: "Bob",
    password: "123456",
  };

  // basic check
  if (
    username === userdetails["username"] &&
    password === userdetails["password"]
  ) {
    // saving the data to the cookies
    res.cookie("username", username);
    // redirect
    return res.redirect("/welcome");
  } else {
    // redirect with a fail msg
    return res.redirect("/login?msg=fail");
  }
});

app.get("/logout", (req, res) => {
  // clear the cookie
  res.clearCookie("username");
  // redirect to login
  return res.redirect("/login");
});

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
```

#### Step:4 Setting the EJS views

The server will render the following EJS views.

1. A home page - the first page the user will access when a request is made to the endpoint `http://localhost:4000/`.

```html
<!-- src/views/home.ejs -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Home</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div class="welcome">
            <h4>
                Hello there, welcome.
            </h4>
            <a href="/login">Login</a>
        </div>
    </body>
</html>
```

2. A login page- once a user selects `Login` on the home page, will be redirected to a login page at endpoint `http://localhost:4000/login`.

```html
<!-- src/views/login.ejs -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Login</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div class="form">
            <form action="/process_login" method="post">
                <h2>Login</h2>
                <% if(locals.error) {%>
                <p class="text-danger"><%=error%></p>
                <%}%>                
                <div class="input-field">
                    <input type="text" name="username" id="username" placeholder="Enter Username">
                </div>
                <div class="input-field">
                    <input type="password" name="password" id="password" placeholder="Enter Password">
                </div>
                <input type="submit" value="LogIn">
            </form>
        </div>
    </body>
</html>
```

3. A welcome page- If a user successfully login, he will be redirected to access the webpage on the endpoint `http://localhost:4000/welcome`. From here, a user can log out and be redirected back to the Home page.

```html
<!-- src/views/welcome.ejs -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Welcome</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div class="welcome">
            <h4>
                Hi <%=username%>, you are welcome here
            </h4>
            <a href="/logout">Logout</a>
        </div>
    </body>
</html>
```

Add some CSS to style the above views.

```css
/* src/public/styles.css */

body {
  display: flex;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
}

.text-danger {
  color: red;
}

.input-field {
  position: relative;
  margin-top: 2rem;
}

.input-field input {
  padding: 0.8rem;
}

form .input-field:first-child {
  margin-bottom: 1.5rem;
}

form input[type="submit"] {
  background: linear-gradient(to left, #4776e6, #8e54e9);
  color: white;
  border-radius: 4px;
  margin-top: 2rem;
  padding: 0.4rem;
}
```

#### Step:5 Running the application

To start the server, run `npm run dev`.

![A login server running](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/login-server-running.png)

#### Step:6 Testing the application

Let's now test the application and see if everything is working.

- Open `http://localhost:4000/` in a browser, and you will be served this home page.

![A Home page](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/home-page.png)

- Click log in on the above home page, and this will redirect you to this login page.

![A login page](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/login-page.png)

- Enter the username and password. Since this is a simple demonstration, we have not used a database to save the login credentials. We have saved them inside the local server. Check `index.js` at

```js
  // fake test data
  let userdetails = {
    username: "Bob",
    password: "123456",
  };
```

Use `Bob` as the username and `123456` as the password. If the credentials are correct, you will be served with this welcome page.

![A welcome page](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/welcome-page.png)

We are using cookies here, so when `Bob` logs in successfully, a cookie with Bod's login user name will be saved in his browser. Go to your browser inspector tool 🡆 application 🡆cookies 🡆 select your domain `http://localhost:4000/`.

![Bob login cookie](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/bob-login-cookie.png)

Now that this cookie is saved, When Bob accesses this domain later, he will not have to provide the login credentials again. When Bob requests to access the page, the server will respond with a cookie with the same values as the cookies saved in Bob's browser, and since they got the same values, Bob will be logged in immediately and served with a welcome page. Go ahead and try if this works when you access the home route (`http://localhost:4000/`).

Bob may decide to log out. If he does, the server will send a response to clear the saved login cookie in the browser.

Try to log out and see what happens.

![Logout clear cookies](/engineering-education/what-are-cookies-how-cookies-work-how-to-use-cookies-in-nodejs/logout-clear-cookies.png)

The saved cookie will be cleared, and thus Bob will have to log in again when he wants to access the pages of this domain.

### What are cookies used for?

As a developer, you might wonder how cookies are helpful and why developers need to use them. Here are a few use cases that explain the importance of collecting and saving user preferences and useful information in a cookie.

#### Session cookie

This track downs the sessions a user has interacted with within a website. Any kind of information that the server needs to remember about you is included in [session management](/session-management-in-nodejs-using-expressjs-and-express-session/). For example, shopping websites. Every cookie is unique to a specific user. An E-commerce website can use cookies to make sure your shopping cart stays with you, even when you revisit the page.

Also, a case such as an online game, cookies, and session can be used to save scores. When you just hit your high score, cookies make sure your score stays with you.

#### Personalization

This saves user preferences such as themes, languages, and different website settings. Cookies data can be used to personalize and make sure the user gets the experience they are looking for.

#### Tracking user activities

This tracks any user behavior on a website, such as the pages you access, the links you click, and how long you interact with a web page. This tracking is mostly done by third parties to analyze a website. Since a cookie is specific to one user, this can track how many unique users visit a website, which web pages have more users access, and how long a user stays on a single page. In simple terms, this data is used to analyze website traffic. The data can also be used for marketing where third parties can show targeted ads depending on what the user searches on the internet.

### Conclusion

Cookies are not intended for transmitting sensitive data. It is your job as a developer to ensure the response you send to a client request does not contain sensitive information such as passwords. A cookie is saved on a browser, and it can be manipulated if it falls on the wrong hand. Ensure your website's cookies don't have such information.

They are [Cookies regulations](https://www.cookielaw.org/the-cookie-law/) that make sure cookies are not used in the wrong way and the data that a cookie can get from a user to avoid compromising user privacy.

There are rules that govern the usage of [third-party cookies](https://www.ionos.com/digitalguide/websites/digital-law/what-do-eu-cookie-laws-mean-for-you/), depending on the country. Organizations with European Union (EU) consumers, for example, must comply with the [General Data Protection Regulation (GDPR)](https://gdpr.eu/what-is-gdpr/) and the [ePrivacy](https://en.wikipedia.org/wiki/EPrivacy_Regulation) Directive.

According to GDPR, internet identifiers such as cookies are considered personal data, and organizations can only exploit them with the client's permission. This the reason why cookie opt-in prompts are so common when you visit a website.