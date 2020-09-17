---
layout: engineering-education
status: publish
published: true
slug: node-testing
title: Testing Node.js Applications
description: Testing Node.js application - Node.js is used to develop applications ranging from a simple portfolio website to complex APIs and applications used by millions. Testing is an important part of that process.
author: rohan-reddy
date: 2020-08-13T00:00:00-11:00
topics: [node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-testing/hero.jpg
    alt: node testing example text image
---
[Node.js](http://nodejs.org/) is used to develop applications ranging from a simple portfolio website to complex APIs and applications used by millions. As the size of the application grows, the risk of bugs also grows. An application is not complete until it is tested. A test can be a simple `console.log` to a function to see if it is working as intended.
<!--more-->



Express.js

[Node.js](http://nodejs.org/) is a javascript run time environment which is used to create server-side applications and tools. Node.js is fast, portable and written in Javascript. Node does not directly support common tasks such as handling requests, serving files, handling HTTP verbs (`GET`, `POST`, ...), this is where Node's rich ecosystem comes to our aid.  

**Express.js is a light web framework which sits on top of Node and it adds functionality ([middleware](https://expressjs.com/en/guide/writing-middleware.html) , [routing](https://en.wikipedia.org/wiki/Routing), etc) and simplicity to Node.js.**

When creating a Node.js web application, we write a single javascript application which listens to requests from the browser, based on the request the function will send back some data or an HTML web page. 

![flow of a request](node.png)

A *request handler* is a javascript function which takes a request and sends an appropriate response. 

Node.js APIs can get complex and writing how to handle a single request can get up to 50 lines of code. Express makes it easier to write web applications with Node.js.

![flow with express](express.png)

### Advantages of using Express with Node

- Using Express lets you abstract away a lot of Node's complexities and adding helpful functions to Node's HTTP server. 
- Instead of a large request handler function, Express allows us to handle requests by writing many small modular and maintainable functions. 
- Express is *not opinionated*, meaning Express does not enforce any "right way" of doing things. You can use any compatible middleware, structure app as you wish and so on, it is flexible. 
- We can integrate with [view rendering engine](https://www.digitalocean.com/community/tutorials/nodejs-express-template-engines) of our choice like Jade, Pug, EJS, etc. A template engine enables you to use static template files and at runtime change the values of variables in those files. 
- Set up ["middleware"](https://expressjs.com/en/guide/using-middleware.html) for request processing. 

### Basic Express App

Install express via npm

    $ npm install express --save

Let's create a basic Express example app. 

```javascript
//app.js
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

The above code creates a basic express application. To run this script, go to your command prompt and enter the command `node app.js` in the project directory. In the console, we can see `Application started and Listening on port 3000` and if we visit `http://localhost:3000/` we can see `HELLO WORLD`. 

Let's look at what the above code does. 

The first line imports the express module. The second line creates an Express application by calling the top-level `express()` function. Our `app` variable (express application) has methods for handling requests and configuring how the application behaves. We can create multiple apps this way, each with their own requests and responses.

The code under 2 `app.get()` is a function ,called *route definition*, which tells express app how to handle an HTTP `GET` request to our server. This function takes 2 main parameters, the first is the route or path which is the relative path from the root of the server; the second is a function that is invoked whenever there is a request to that path. In this case, we are listening for `GET` requests to `/` which is the root of the website. 

The second parameter, the callback function, has two arguments `req` and `res`. `req` represents the **request** sent from the browser to the server. `res` represents the **response** that the server sends back. 

The code under 3 starts a server on the port 3000. You can go to `localhost:3000` to view your response. 

## Core parts of Express

### Middleware

Middleware is a set of functions that sit between a raw request and the final intended route. Middleware functions have access to *all* the HTTP requests coming to the server. Middleware can handle tasks such as logging, sending static files, authorization, session management, etc.  

In Node.js the request and response objects are passed to one function (request handler) that we write, in Express these objects are passed through a set of functions, called the **middleware stack**. Express will start at the first function in the stack and execute in order down the stack. Every function in the stack takes three arguments `request`, `response` and `next`. `next` is a function, when called Express executes the next function in the stack. This is a subtle difference between middleware and a route handler which we saw above. 

Let's look at a basic static file server to understand middleware. Initialize an npm project and install express. Create a directory named `static` and copy-paste *any* available static files into the folder (text, images, etc.). 

```
$ npm init -y
$ npm install express
$ mkdir static
$ touch static/dummy_file.txt
$ touch static/dummy_file2.txt
$ echo file1 > static/dummy_file.txt
$ echo file2 > static/dummy_file2.txt
$ touch app.js
```

Our app will have a [*logger*](https://en.wikipedia.org/wiki/Log_file) function and a static file serving function. 


```javascript
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

If we run this file using `node app.js` and go to `localhost:3000/dummy_file.txt`, we can see on the screen `file1`. If we go to the URL `localhost:3000`, we see an error `Cannot GET /` because we did not configure a route handler for that path. Let's look at the code.

The logger logs every request that comes into the server. `app.use` is used to define a middleware function, it takes a function. The `next()` function call tells Express to move onto the next function in the stack (remove the `next()` call in your script, you will observe that it takes forever for the page to load, this is because the request gets stuck on this middleware function). 

We are using the [path module](https://nodejs.org/api/path.html) to join the relative url (from the request) and the directory name. The [fs module](https://nodejs.org/api/fs.html) provides an API for interacting with the file system. We are checking if the file exists, if it does not go to next function in the stack if it does return that file using `res.sendFile`. 


#### Using Third-Party Middleware

We can write our own middleware functions or import them similar to importing modules in Node.js using `require`. Let's use a popular open-source logger called [morgan](http://expressjs.com/en/resources/middleware/morgan.html) instead of writing our own logging function. 

Install it using npm.

`$ npm install morgan`

We can call the `use()` on the Express app object to add the middleware to the stack.

```javascript

var express = require("express");
var logger_morgan = require("morgan");

var app = express();
...
app.use(logger_morgan("short")); // logs short notation of requests
...
```

Express comes with **`express.static`** middleware bundled with it, it can be used to serve static files instead of the function in the previous section. It provides better security and performance than the function that we wrote. 

```javascript
app.use(express.static("static") //relative path
```

Any requested files in the directory "static" are served. `localhost:3000/dummy_file.txt` will show the same result as above. We can call `static()` multiple times. If the file is not there in one directory, then the request is passed onto the next `static()` call. When your app gets a request like `/hello.html`, it returns the hello.html file in the public directory. 



### Routing 

Express makes request handling easier by mapping requests to different request handlers. A request handler is a function which handles all the requests to a specific path with a specific HTTP verb. In the basic example above, we saw how to handle a `GET` request. As an application grows in size the routes as well as the request handlers increase. Lets see how we can use [Routers](http://expressjs.com/en/4x/api.html#router) to split a large app into smaller, maintainable functions. According to the documentation, a Router is "an isolated instance of middleware and routes. Routers can be thought of as “mini” applications only capable of performing middleware and routing".

Routers can be used like middleware functions, they can be “`.use()`d”. A simple example:

```javascript
//app.js the main file

var express = require("express");
var apiRouter = require("./routes/api_router");

var app = express();

app.use("/api", apiRouter);

app.listen(3000);
```

```javascript
//routes/api_router.js
var express = require("express");
var router = express.Router();

router.get("/route1", function(req, res, next){
        res.send("Success !!");
        next();
});

module.exports = router;

```
When you start the app and visit the URL `localhost:3000/api/route1` you can see `Success !!`. See all router functions [here](http://expressjs.com/en/4x/api.html#router). 

#### Useful Routing Tips

**Grabbing route parameters**

Suppose you are building a website for a company that showcases their products, each product has a *productID*. You want the URL for product 1 to be `/product/1`. Instead of defining a route for every product, you can define a single route for everything that of the form `product/productID` and then return a file based on the productID. 

```javascript
var express = require("express");
var app = express();

//use a colon to grab a parameter

app.get("/product/:productId", function(req, res){
    var pid = parseInt(req.params.userid, 10);
    //res.send   manipulate string to get file with name as productID or something and use a static file server
    };
```

**Using Regular Expressions to match routes**

[Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) are patterns used to match character combinations in strings. We can use RE to match parameters and define our routes. For example in the above example if we want the productId to be only an integer we can do the following:

```javascript
...
app.get(/^\/products\/(\d+)$/, function(req, res) {
    var productId = parseInt(req.params[0], 10);
    ...
});
...
```

### Template Engines

Websites are built with HTML, you can dynamically generate HTML pages using Express. Dynamically generated HTML pages are useful when you want to show real time data or change a page's details based on the user. A template engine allows you to use static template files and at runtime replace variables in a template file with Actual data. There are different template engines available like [Pug](https://pugjs.org/), Jade, and [EJS](https://ejs.co/). Lets see a basic template using EJS. 

Install it using npm. `npm install ejs` and create a directory called `views` for storing your templates and HTML files.

```javascript
//app.js
var express = require("express");

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
If you go to the webpage you can see `Hello and Welcome !!!`. You can write javascript expressions inside `<%= exp %>`. Look at the [docs](https://ejs.co/#docs) for complete syntax and rules.

**Testing Express Applications**.

Testing is an important part of developing software. Read [this post (Section.io/engineering-education)](https://www.section.io/engineering-education/node-testing/) where testing Node.js applications is explained using Mocha and Chai.

### Conclusion 
The minimalistic philosophy of Express may not be suited for everyone's needs, because you can make mistakes and make more decisions about your applications infrastructure. One of the best practice is to have a directory structure like this or something like this for your express app 
```
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

Express is an unopinionated framework which works best by making use of third party software to make a full-fledged application. Simplicity is the high level goal for software in general, when writing Express applications keep this in mind. 

### References

- Express in Action, Manning 2016.
- [http://expressjs.com/](http://expressjs.com/)
- [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [Github](https://github.com/expressjs/express)
- [Wiki](https://en.wikipedia.org/wiki/Express.js)
- [Article](https://www.digitalocean.com/community/tutorials/nodejs-express-basics)

