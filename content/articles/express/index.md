---
layout: engineering-education
status: publish
published: true
url: /express/
title: Introduction to Express.js
description: Express is a lightweight framework on top of Node.js, it adds functionalities like middleware, template engines, and routing.
author: rohan-reddy
date: 2020-09-23T00:00:00-09:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/express/hero.jpg
    alt: expressjs example text image
---
[Node.js](https://www.section.io/engineering-education/history-of-nodejs/) is a JavaScript run time environment which is used to create server-side applications and tools. Node.js is fast, portable, and written in JavaScript but it does not directly support common tasks such as handling requests, serving files, and handling HTTP methods such as `GET` and `POST`. This is where Node.js's [rich ecosystem](/most-useful-nodejs-packages/) comes to our aid.
<!--more-->

**Express.js (Express) is a light web framework which sits on top of Node.js and it adds functionality like ([middleware](https://expressjs.com/en/guide/writing-middleware.html), [routing](https://en.wikipedia.org/wiki/Routing), etc.) and simplicity to Node.js.**

When creating a Node.js web application, we write a single JavaScript application which listens to requests from the browser, based on the request, the function will send back some data or an HTML web page.

![flow of a request](/engineering-education/express/node.png)

[Image Credit](https://www.manning.com/books/express-in-action)

A *request handler* is a JavaScript function which takes a request and sends an appropriate response.

Node.js APIs can get complex and writing how to handle a single request can end up being over 50 lines of code. Express makes it easier to write Node.js web applications.

![flow with express](/engineering-education/express/express.png)

[Image Credit](https://www.manning.com/books/express-in-action)

### Advantages of using Express with Node.js
- Express lets you take away a lot of the complexities of Node.js while adding helpful functions to a Node.js HTTP server.

- Instead of a large request handler function, Express allows us to handle requests by writing many small modular and maintainable functions.

- Express is *not opinionated*, meaning Express does not enforce any "right way" of doing things. You can use any compatible middleware, and you can structure the app as you wish, making it flexible.

- We can integrate with a [template rendering engine](https://www.digitalocean.com/community/tutorials/nodejs-express-template-engines) (also called a view rendering engine in some articles) of our choice like Jade, Pug, EJS, etc.

A template engine enables you to use static template files and at runtime change the values of variables in those files.

- You can set up ["middleware"](https://expressjs.com/en/guide/using-middleware.html) for request processing.

### Basic Express Application
Let's create a basic Express example app. To use Express, we first need to install it via npm using the command below.

```bash
$ npm install express --save
```

Next, let's write the code for our example app. Create a file called `app.js`.

```JavaScript
//in app.js
var express = require("express");
var app = express();

//2
app.get("/", function(req, res){
  res.send("HELLO WORLD");
  });

//3
app.listen(3000, function(){
  console.log("Application started and Listening on port 3000");
  });
```

The code above creates a basic Express application. To run this script, go to your command prompt and enter the command `node app.js` in the project directory.

In the console, we can see `Application started and Listening on port 3000` and if we visit `http://localhost:3000/` we can see `HELLO WORLD`.

Let's look at what the code above is doing.

The first line imports the express module. The second line creates an Express application by calling the top-level `express()` function.

Our `app` variable (express application) has methods for handling requests and configuring how the application behaves. We can create multiple apps this way, each with their own requests and responses.

Lets examine the code in section two. `app.get()` is a function, called *route definition*, which tells the express app how to handle an HTTP `GET` request to our server.

This function takes two main parameters, the first is the route or path which is the relative path from the root of the server; the second is a function that is invoked whenever there is a request to that path.

In this case, we are listening for `GET` requests to `/` which is the root of the website.

The second parameter, the callback function, has two arguments `req` and `res`. `req` represents the **request** sent from the browser to the server. `res` represents the **response** that the server sends back.

The code in section three starts a server on the port 3000. You can go to `localhost:3000` to view your response.

### Core parts of Express

#### Middleware
Middleware is a set of functions that sit between a raw request and the final intended route. Middleware functions have access to *all* the HTTP requests coming to the server. Middleware can handle tasks such as logging, sending static files, authorization, and session management, etc.  

In Node.js, the request and response objects are passed to one function (request handler) that we write, in Express these objects are passed through a set of functions, called the **middleware stack**.

Express will start at the first function in the stack and execute in order down the stack.

Every function in the stack takes three arguments `request`, `response` and `next`. `next` is a function, that when called Express executes the next function in the stack. This is a subtle difference between middleware and a route handler which we saw above.

Let's look at a basic static file server to understand middleware. Initialize a new npm project. Then create a directory named `static` and copy-paste *any* available static files into the folder (text, images, etc.).

Execute the following commands in the terminal. The `touch` command creates an empty file.

```bash
$ npm init -y
$ npm install express
$ mkdir static
$ touch static/dummy_file.txt
$ touch static/dummy_file2.txt
$ echo file1 > static/dummy_file.txt
$ echo file2 > static/dummy_file2.txt
$ touch app.js
```

Our app will have a [logger](https://en.wikipedia.org/wiki/Log_file) function and a static file serving function.

```JavaScript
//app.js

var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();


//1. Logging
app.use(function(req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next();
});


//2. File Server
app.use(function(req, res, next) {
    var filePath = path.join(__dirname, "static", req.url);
    fs.stat(filePath, function(err, fileInfo) {
    if (err) {
        next();
        return;
    }
    if (fileInfo.isFile()) {
        res.sendFile(filePath);
    } else {
        next();
    }
  });
});


app.listen(3000, function() {
    console.log("App started on port 3000");
});

```

If we run this file using `node app.js` and go to `localhost:3000/dummy_file.txt`, we can see on the screen `file1`.

If we go to the URL `localhost:3000`, we see an error `Cannot GET /` because we did not configure a route handler for that path. Let's look at the code.

The logger logs every request that comes into the server. `app.use` is used to define a middleware function, it takes a function.

The `next()` function call tells Express to move onto the next function in the stack (remove the `next()` call in your script, you will notice that it takes forever for the page to load, this is because the request gets stuck on this middleware function).

We are using the [path module](https://nodejs.org/api/path.html) to join the relative URL (from the request) and the directory name.

The [fs module](https://nodejs.org/api/fs.html) provides an API for interacting with the file system. We are checking if the file exists, if it does not, we will go to next function in the stack if it does we will return that file using `res.sendFile`.

#### Using Third-Party Middleware
We can write our own middleware functions or import them similar to how we imported our modules in Node.js using `require`.

Let's use a popular open-source logger called [morgan](http://expressjs.com/en/resources/middleware/morgan.html) instead of writing our own logging function.

Install it using npm.

```bash
$ npm install morgan
```

We can call the `use()` on the Express app object to add the middleware to the stack.

```JavaScript

var express = require("express");
var logger_morgan = require("morgan");

var app = express();

app.use(logger_morgan("short")); // logs short notation of requests

app.listen(3000);
```

Express comes with **`express.static`** middleware bundled with it, it can be used to serve static files instead of the function in the previous section. It provides better security and performance than the function we wrote.

`JavaScript
app.use(express.static("static"); //relative path
`

Any requested files in the directory "static" are served. `localhost:3000/dummy_file.txt` will show the same result as above.

We can call `static()` multiple times to use multiple static asset directories. For example, consider we have two directories `static` and `public` with static files and we wrote the following code:

`JavaScript
app.use(express.static("static");
app.use(express.static("public");
`

Suppose you make a request like `localhost:3000/hello.html`, Express looks up the files in the `static` directory then `public` directory if the file exists then returns `hello.html`.

### Routing
Express makes request handling easier by mapping requests to different request handlers. A request handler is a function which handles all the requests to a specific path with a specific HTTP method.

In the basic example above, we saw how to handle a `GET` request. As an application grows in size the routes grow as well as do the request handlers.

Lets see how we can use [Routers](http://expressjs.com/en/4x/api.html#router) to split a large app into smaller, maintainable functions.

According to the documentation, a Router is "an isolated instance of middleware and routes. Routers can be thought of as “mini” applications only capable of performing middleware and routing".

Routers can be used like middleware functions, they can be added to middleware stack using the `app.use()` function. A simple example:

```JavaScript
//app.js the main file

var express = require("express");
var apiRouter = require("./routes/api_router");

var app = express();

app.use("/api", apiRouter);

app.listen(3000);
```

Create a folder called `routes` and a file called `api_router.js` inside it.

```JavaScript
//routes/api_router.js
var express = require("express");
var router = express.Router();

router.get("/route1", function(req, res, next){
        res.send("Success !!");
        next();
});

module.exports = router;

```

When you start the app and visit the URL `localhost:3000/api/route1` you can see `Success!!`. Take a look at all the router functions [here](http://expressjs.com/en/4x/api.html#router).

#### Useful Routing Tips
**Grabbing route parameters**

Suppose you are building a website for a company that showcases their products, each product has a *productID*. You want the URL for product 1 to be `/product/1`.

Instead of defining a route for every product, you can define a single route for everything in the form of `product/productID` and then return a file based on the productID. Here's a rough example below that you can modify for your use case.

```JavaScript
var express = require("express");
var app = express();

// use a colon to grab a parameter

app.get("/product/:productId", function(req, res){
    var pid = parseInt(req.params.productId, 10);
    //Use res.send to manipulate string to get file with name as productID or something and use a static file server
    });
app.listen(3000);
```

**Using Regular Expressions to match routes**

[Regular Expressions (RE)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) are patterns used to match character combinations in strings. We can use RE to match parameters and define our routes.

For example, using the example above, if we wanted the productId to be only an integer we can try the following:

```JavaScript
var express = require("express")
app = express();

app.get(/^\/products\/(\d+)$/, function(req, res) {
    var productId = parseInt(req.params[0], 10);
    console.log("The user is asking for product"+productId);
    //we can send a file related to request
    var filename = "product" + productId + ".html"; // change this based on your setup
    res.sendFile(filename);    
});
app.listen(3000);
```

For the full example code, visit this [gist](https://gist.github.com/rohanreddych/137c59f7e57edbfbc839dcd440f0daeb).

### Template Engines
Websites are built with HTML, you can dynamically generate HTML pages using Express. Dynamically generated HTML pages are useful when you want to show real time data or change a page's details based on the user.

A template engine allows you to use static template files and at runtime replace variables in a template file with actual data.

There are different template engines available like [Pug](https://pugjs.org/), Jade, and [EJS](https://ejs.co/). Let's see a basic template using EJS.

First let's install it using npm. Type `npm install ejs` and then create a directory called `views` to store your templates and HTML files.

```JavaScript
//app.js
var express = require("express");
var app = express();

app.set("view engine", "ejs"); //set view engine to ejs
app.set("views", "views");     //set views directory

app.get("/", function(req, res){   //res.render() renders a view and send the HTML to the client
        res.render("index", {
                message: "Hello and Welcome !!!" // this can be any thing you want
        });
});

app.listen(3000);
```

Create a file called `index.ejs` in the views directory.

```html
<html>
    <head>
        <meta charset="utf-8">    
    </head>

    <body>
        <%= message %>
    </body>
</html>
```

If you go to the webpage you can see `Hello and Welcome !!!`. You can write JavaScript expressions inside the `<%= exp %>`. Look at the [docs](https://ejs.co/#docs) for the complete syntax and rules.

**Testing Express Applications**.

Testing is an important part of developing software. Read [this article](/node-testing/) where I discuss testing Node.js applications using Mocha and Chai.

### Conclusion
The minimalistic philosophy of Express may not be suited for everyone's needs, because you can make mistakes while you are making those decisions about your applications infrastructure.

One of the best practices is to have a directory structure like this or something similar to this for your Express app

```bash
app/
├── public/
│   ├── bootstrap.css
|   ├── favicon.ico
├── views/
│   ├── hello.ejs
│   └── index.html
└── routes/
|   ├── api.js
|   └── router.js
├── app.js
├── package.json
├── tests/
└── bin/
```

Express is an unopinionated framework which works best by making use of third party software to create a full-fledged application. Simplicity is a high level goal for software in general, when writing Express applications keep this in mind.

### References
- Express in Action, Manning 2016.
- [http://expressjs.com/](http://expressjs.com/)
- [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [Github](https://github.com/expressjs/express)
- [Wiki](https://en.wikipedia.org/wiki/Express.js)
- [Article](https://www.digitalocean.com/community/tutorials/nodejs-express-basics)

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
