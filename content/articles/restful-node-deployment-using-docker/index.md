### Introduction
Express is a tool for the backend enabling the implementation of the client-server architecture. With its flexibility, it allows for the customization of the API endpoints, consequently, fitting our needs.  
In this tutorial, I'll show you how to build RESTful APIs using Node.js Express, test it locally using docker compose. We'll then proceed to deploy this application to cloud.  

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Node.js application setup](#Node-application-setup)


### Prerequisites
To follow along this tutorial, you need the following:
- Node.js dlownloaded and installed in your local development environment.
- Basic knowledge in Node.js' Express framework.
- RESTful APIs design.

### Objectives
By the end of this article, you should be able to create a complete dynamic Express application and deploy to the cloud using Docker.

### Node application setup
Let's start by importing required modules and create a running server:  

```js
//this node application is located in the index.js file
const http = require("http");

http.createServer(function (req, res) {
  
   res.writeHead(200, {'Content-Type': 'text/plain'});
 
   res.end('Hello World\n');
   
}).listen(8000);

console.log('Server started at http://127.0.0.1:8000/');
```
Now execute this application by running the command on the command-line:

```bash
node index.js
```

Execution output:
```bash
Server started at http://127.0.0.1:8000/
```


