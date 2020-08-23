# Express.js

[Node.js]() is a javascript run time environment which can be used to create server side applcations and tools. Node.js is fast, portable and written in Javascript. Common tasks such as handling requests, serving files, handling HTTP verbs (`GET`, `POST`, ...) are not directly supported by Node, this is where Node's rich ecosystem comes to our aid. 

**Express.js is a light web framework which which sits on top of Node and it adds functionality ([middleware]() , [routing](), etc)and simplicity to Node.js.**

When creating a Node.js web application, we write a single javascript application which listens to resquests from the browser, based on the request the function will send back some data or a HTML web page. 

![flow of a request](node.png)

A *request handler* is a javascript function which takes a request and sends an appropriate response. 

Node.js APIs can get complex and writing how to handle a single request can get upto 50 lines of code. Express makes it easier to write web applications with Node.js.

![flow with express](express.png)

### Advantages of using Express with Node

- Using Express lets you abstract away a lot of Node's complexities and adding helpful functions to Node's HTTP server. 
- Instead of a large request handler function, Express allows us to handle requests by writing many small modular and maintainable functions. 
- Express is *not opinionated*, meaning Express does not enforce any "right way" of doing things. You can use any compatible middleware, structure app as you wish and so on, it is flexible. 
- We can integrate with [view rendering engine](https://www.digitalocean.com/community/tutorials/nodejs-express-template-engines) of our choice like Jade, Pug, EJS, etc. A template engine enables you to use static template files and at runtime change the values of variables in those files. 
- Set up ["middleware"](https://expressjs.com/en/guide/using-middleware.html) for request processing. 

### Basic Express App

Install express via npm

    npm install express --save

Lets create a basic Express example app. 

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

The above code creates a basic express application. To run this script, go to your command prompt and enter the command `node app.js` in the project directory. In the console we can see `Application started and Listening on port 3000` and if we visit `http://localhost:3000/` we can see `HELLO WORLD`. 

Lets look at what the above code does. 

The first line imports the express module. The second line creates an Express application, by calling the top level `express()` function. Our `app` variable (express application) has methods for handling requests and configuring how the application behaves. We can create multiple apps this way, each with their own requests and responses.

The code under 2 `app.get()` is a function ,called *route definition*, which tells express app how to handle a HTTP `GET` request to our server. This function takes 2 main parameters, the first is the route or path which is the relative path from the root of the server; the second is a function that is invoked whenever there is a request to that path. In this case we are listening for `GET` requests to `/` which is the root of the website. 

The second parameter, the callback function, has two arguments `req` and `res`. `req` represents the **request** sent from the browser to the server. `res` represents the **response** that the server sends back. 

The code under 3 starts a server on the port 3000. You can go to `localhost:3000` to view your response. 

## Core Parts of Express

### Middleware

Middleware is a set of functions that sit between a raw request and the final intended route. Middleware functions have access to *all* the http requests coming to the server. Middleware can handle tasks such as logging, sending static files, authorization, session management, etc.  

In Node.js the request and response object are passed to one function (request handler) that we write, in Express these objects are passed through a set of functions, called the **middleware stack**. Express will start at the first function in the stack and execute in order down the stack. Every function in the stack takes three argumnets `request`, `response` and `next`. `next` is a function, when called Express executes the next function in stack. This is a subtle differece between middleware and a route handler which we saw above. 

Lets look at a basic static file server to understand middleware. Initialize a npm project and install express. Create a directory named `static` and copy-paste *any* available static files into the folder (text, images, etc). 

```
npm init -y
npm install express
mkdir static
touch static/dummy_file.txt
touch app.js
```


```javascript
//app.js


```





### Conclusion 
The minimalistic philosophy of Express may not be suited for everyone's needs, because you can make mistakes and make more descisions about your applications infrastrucutre. 
