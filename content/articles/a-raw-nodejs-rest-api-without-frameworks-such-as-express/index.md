---
layout: engineering-education
status: publish
published: true
url: /a-raw-nodejs-rest-api-without-frameworks-such-as-express/
title: A Vanilla Node.js REST API without Frameworks such us Express
description: In this article, we will build a simple REST API using functionalities core to Node.js itself. We will use the bare-bones of vanilla Node.js with the HTTP module to create and manage a server.
author: rose-waitherero
date: 2021-05-29T00:00:00-14:00
topics: [Node.js, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/hero.png
    alt: Vanilla Node.js image example
---
Node.js is a very popular JavaScript framework. It shines most when used to build back-end services and APIs. Node.js developers often utilize open-source [frameworks and libraries](/engineering-education/most-useful-nodejs-packages/) like [Express.js](/engineering-education/express/) to develop applications. These libraries are readily available in the NPM registry.
<!--more-->
Whenever you use such packages, there is a lot of abstraction; hence you don't utilize the core functionalities of Node.js. The low-level logic Node.js of your application is hidden from you as these packages process and execute raw Node.js behind the scenes.

One key thing to note is that these packages make [Node.js a popular technology](/engineering-education/why-node-js-is-popular/). On the other side, you can opt to use core Node.js to develop your applications. This way, you make use of the [Vanilla Node.js](/engineering-education/pure-node-js-no-frameworks-or-packages/) functionalities. This blog will teach you how to use vanilla Node.js with no frameworks to build simple APIs.

### Goal
In this guide, we'll build a simple REST API using functionalities core to Node.js itself. We're just using the bare-bones of [vanilla Node.js](https://nodejs.dev/learn) with the [HTTP module](https://nodejs.org/api/http.html#http_http) for creating and managing a server. 

This means we won't use NPM. Therefore no NPM associated dependencies, no `package.json`, no `package-lock.json`, and no `node_module` folder. 

The goal is to show you how Node.js works in its purest form and how you may use it without external libraries or frameworks.

> **Note**: When working on any actual project, it is best to use Node.js libraries and packages. This way, you'll take full advantage of the readily available code to make your development workflow easier and faster.

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/en/) and [Postman](https://www.postman.com/) installed on your computer.
- Be familiar with how to use [Postman](https://www.youtube.com/watch?v=uWrw0Bh7BVM).
- Basic knowledge of [Node.js](https://www.w3schools.com/nodejs/default.asp).
- Basic understanding of [REST APIs](/engineering-education/rest-api/) and [CRUD operations](/engineering-education/mysql-with-node-js/).
- Basic understanding of [JavaScript](https://www.w3schools.com/js/default.asp). This guide uses [ES6](https://www.w3schools.com/js/js_es6.asp) features and syntax, such as the [arrow function](/engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/) (=>).

### Setting up a simple HTTP server
Before creating the REST API, let's create a simple [HTTP API](https://nodejs.org/en/docs/guides/getting-started-guide/) to serve a **Hi there** statement.

Create a project folder and an `app.js` file.

1. The first thing to do is to pull the [HTTP module](https://nodejs.org/api/http.html#http_http) from Node.js using `require()` method. This module is native to Node.js. You don't need any extra packages or libraries to access it, just Node.js runtime installed on your computer.

```Javascript
const http = require("http");
```

This way, we make the necessary methods and functions available to set up a server.

2. Once available, define the port you want the server to run on, as shown below.

```js
const PORT = process.env.PORT || 5000;
```

3. To create the server, you need to call the `createServer` method from the HTTP module. i.e, `http.createServer`. Pass a response and a request that serves up your information. 

Then use:
- `req.url` to set the request access route/URL.
- `req.method`.
- `res.writeHead` to set any response headers.
- `res.write()` to send the actual content for the response.
- `res.end()` to end the response.

```Javascript
const server = http.createServer(async (req, res) => {
    //set the request route
    if (req.url === "/api" && req.method === "GET") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        res.write("Hi there, This is a Vanilla Node.js API");
        //end the response
        res.end();
    }

    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});
```

4. Call the `listen()` method and pass in the `PORT` variable. Then add a `console.log()` message that will indicate the server is up and running.

```Javascript
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
```

5. The server is well set. Run `node app.js` to test it. This will log the `console.log()` message on your command screen.

![A simple server api](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/a-simple-server-api.jpg)

6. If you open `http://localhost:5000/api` on a browser, you'll be served the response as defined in the `res.write()`

![A simple server response](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/a-simple-server-response.jpg)

### Setting up the REST API
Let's now see how to set up a REST API using raw Node.js. We'll use a todos boilerplate to demonstrate this.

Below is the project structure.

```bash
\---vanilla-nodejs-rest-api
|   app.js
|   controller.js
|   data.js
|   utils.js

No sub-folders exist
```

#### Adding test data
**data.js**: Holds some temporary test data. The information is kept in a todos array. Every todo has a unique id, a todo title, a short description, and a Boolean value that marks a completed todo.

```Javascript
//data.js
/** Todos List*/
const todos = [
    {
        id: 1,
        title: "Coding in Javascript",
        description: "Working with functions in JavaScript",
        completed: false,
    },
    {
        id: 2,
        title: "Cooking Supper",
        description: "Preparing rice and chicken",
        completed: false,
    },
    {
        id: 3,
        title: "Taking a walk",
        description: "Easy time at the park",
        completed: false,
    },
    {
        id: 4,
        title: "Watching Netflix",
        description: "Enjoying the new premiered series",
        completed: false,
    },
];
module.exports = todos;
```

#### Setting up the controllers
**controllers.js**: this manages the actual functionality and the logic behind each route used in this application. It is made up of the `Controller` class, which will have the following major HTTP methods:

- `getTodos()`: to get and list down all todos as listed in the temporary `data.js` file.
- `getTodo()`: to get and list a single todo by its unique id.
- `createTodo()`: to create a new temporary todo.
- `updateTodo()`: to update the values of an existing todo.
- `deleteTodo()`: to remove a todo from the list.

```Javascript
// controller.js
// Logic behind the functionalities
const data = require("./data");

class Controller {
    // getting all todos
    async getTodos() {
        // return all todos
        return new Promise((resolve, _) => resolve(data));
    }

    // getting a single todo
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            if (todo) {
                // return the todo
                resolve(todo);
            } else {
                // return an error
                reject(`Todo with id ${id} not found `);
            }
        });
    }

    // creating a todo
    async createTodo(todo) {
        return new Promise((resolve, _) => {
            // create a todo, with random id and data sent
            let newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                ...todo,
            };

            // return the new created todo
            resolve(newTodo);
        });
    }

    // updating a todo
    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            //else, update it by setting completed to true
            todo["completed"] = true;
            // return the updated todo
            resolve(todo);
        });
    }

    // deleting a todo
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            // else, return a success message
            resolve(`Todo deleted successfully`);
        });
    }
}
module.exports = Controller;
```

#### Utility settings
**utils.js**: Controls a standard Web API use case. It includes the `getReqData()` function, which retrieves data from the client on the server.

```Javascript
//utils.js
function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = { getReqData };
```

#### Setting the server and routes
**app.js**: This contains;
- Initialization and configuration of the server.
- The appropriate routes listening to the varying HTTP methods of a server.
- A PORT number to listen and set the server live on a browser.
  
```Javascript
//app.js
const http = require("http");
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    // /api/todos : GET
    if (req.url === "/api/todos" && req.method === "GET") {
        // get the todos.
        const todos = await new Todo().getTodos();
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(todos));
    }

    // /api/todos/:id : GET
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            // get todo
            const todo = await new Todo().getTodo(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(todo));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/todos/:id : DELETE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete todo
            let message = await new Todo().deleteTodo(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/todos/:id : UPDATE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            // update todo
            let updated_todo = await new Todo().updateTodo(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_todo));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/todos/ : POST
    else if (req.url === "/api/todos" && req.method === "POST") {
        // get the data sent along
        let todo_data = await getReqData(req);
        // create the todo
        let todo = await new Todo().createTodo(JSON.parse(todo_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the todo
        res.end(JSON.stringify(todo));
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
```

### Testing the app
The Vanilla Node.js REST API is now set and ready to test to see if everything is working. Now you need to start the server by running the following command:

```bash
node app.js
```

This will set and run the server on port 5000.

![A simple server api](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/a-simple-server-api.jpg)

### Explore the API using Postman
Let's test the different methods set in the API using Postman. If you are new to Postman API testing, please go over this [tutorial](https://www.youtube.com/watch?v=uWrw0Bh7BVM) to get started.

#### Fetch all todos
**/API/todos GET**: This will fetch all the todos listed in the `data.js`. 

To test this GET request:
- Go over to Postman and **SEND** a `GET` request. The request URL as `http://localhost:5000/api/todos` as shown below:

![Get all todos](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/postman-get-all-todos.jpg)

- This will log a response in the Postman response section, with all the todos as listed in `data.js`

![Get all todos](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/get-todos.png)

#### Fetch a todo by id
**/API/todos/:id GET**: This will fetch only one todo specified with the value of the todo's id. 

To test this GET request:
- Go over to Postman and **SEND** a `GET` request. Enter the request URL as `http://localhost:5000/api/todos/:id`, where `:id` is the id of the single todo you want to fetch, as shown below.

![Get a single todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/postman-get-a-todo.jpg)

- The request will log a single todo to the Postman response section.

![Get a single todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/get-todo.png)

#### DELETE a todo
**/API/todos/:id DELETE**: This will perform a `DELETE` request of a single todo. You will just receive a response message because the data is temporary and not stored in a database. 

To put it to the test:
- Go over to Postman and **SEND** a `DELETE` request. Enter the request URL as `http://localhost:5000/api/todos/:id`, where `:id` is the id of the single todo you want to delete, as shown below.

![Delete a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/postman-delete-a-todo.jpg)

- This will log a `Todo deleted successfully` message in your Postman response console.

![Delete a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/del-todo.png)

#### UPDATE a todo
**/API/todos/:id PATCH**: This will update a todo to indicate that the task is completed, i.e., `true` or `false`. You will see the effect on the postman response console. 

To see how well it works:
- Go over to Postman and **SEND** a `PATCH` request. Enter the request URL as `http://localhost:5000/api/todos/:id`, where `:id` is the id of the single todo you want to update, as shown below.

![Update a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/postman-update-a-todo.jpg)

- The Postman response console should look like this:
  
![Update a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/update-todo.png)

#### ADD a new todo
**/API/todos POST**: This will create a new todo item. The new todo will be returned as a response, but it will not be recorded in the `data.js`. 

To put it to the test, do the following:
- Go over to Postman and open a new tab, select a `POST` request and enter the request URL as `http://localhost:5000/api/todos`.

![Add a new todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/postman-add-a-new-todo.jpg)

Go over to the `Body` tab section, select `raw`, and select' JSON' from the dropdown options to the right.

![Add a new todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/adding-a-new-todo.jpg)

- Add the new todo's contents (title, the description, and completed). 

Here is a simple illustration:

```Javascript
{
   "title": "Vannila Node.js REST API",
    "description": "Working with responses and requests",
    "completed": false
}
```

- After filling the above details, hit the **SEND** button to start the POST request, and the newly added todo will be logged in the Postman console.

![Add a new todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-express/create-todo.jpg)

> **Note**: Because the id is generated randomly, it may vary every time you make a new POST request.

There you have it: a straightforward REST API written entirely in Vannila Node.js. I hope you have found this tutorial instructive, informative, and helpful.

Happy coding!!!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)