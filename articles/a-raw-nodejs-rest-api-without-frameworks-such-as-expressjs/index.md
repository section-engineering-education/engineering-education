Node.js is a popular very JavaScript framework. Node.js has been used to create applications of all levels. It shines most when used to build back-end services and APIs.

In most cases, when building APIs with Node.js, developers use open-source [Node.js libraries and frameworks](/engineering-education/most-useful-nodejs-packages/) such as [Express.js](/engineering-education/express/). These libraries are readily available in the NPM registry.

Whenever you use such packages, there is a lot of abstraction as you don't utilize the core functionalities of Node.js. The low-level logic Node.js of your application is hidden from you as these packages process and execute raw Node.js behind the scenes.

One key thing to note is that these packages make [Node.js a popular technology](/engineering-education/why-node-js-is-popular/). On the other side, you can opt to use core Node.js to develop your applications. This way, you make use of the [vanilla Node.js](/engineering-education/pure-node-js-no-frameworks-or-packages/) functionalities. This blog will teach you how to use vanilla Node.js with no frameworks to build simple APIs.

### Goal
In this guide, we'll build a simple REST API skeleton using functionalities core to Node.js itself. We're just using the barebones of [vanilla Node.js](https://nodejs.dev/learn) with the [HTTP module](https://nodejs.org/api/http.html#http_http) for creating and managing a server. This means we won't use NPM. Therefore no NPM associated dependencies, no `package.json`,  no `package-lock.json`, and no `node_module` folder. The reason is to demonstrate and give you an overview of how raw Node.js works/can be used without frameworks.

> Note: When working on any actual project, it is best to use Node.js libraries and packages. This way, you'll take full advantage of the readily available code to make your development workflow easier and faster.

### Prerequisites
- Be familiar with how to use [Postman](https://www.youtube.com/watch?v=uWrw0Bh7BVM).
- Basic knowledge of [Node.js](https://www.w3schools.com/nodejs/default.asp).
- Basic understanding of [REST APIs](/engineering-education/rest-api/) and [CRUD operations](/engineering-education/mysql-with-node-js/) (Create, Read, Update and Delete).
- Basic understanding of [JavaScript](https://www.w3schools.com/js/default.asp) knowledge. This guide uses [ES6](https://www.w3schools.com/js/js_es6.asp) features and syntax, such as the [arrow function](/engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/) (`=>`).

Ensure that you have the following installed:
- [Node.js](https://nodejs.org/en/).
- [Postman](https://www.postman.com/).

### Setting up  a simple HTTP server
Before creating the REST API, let's create a simple [HTTP API](https://nodejs.org/en/docs/guides/getting-started-guide/) to serve just a **Hi there** statement.

Create a project folder and an `app.js` file.

1. The first thing is to pull is [HTTP module](https://nodejs.org/api/http.html#http_http) from the Node.js using `require()`. This module is native to Node.js. You don't need any extra packages or libraries to access it, just Node.js runtime installed on your computer.

```js
const http = require("http");
```

This way, we make the necessary methods and functions available to set up the server API.

2. Once that is available, define the port that you want the server to run on, as shown below.

```js
const PORT = process.env.PORT || 5000;
```

3. To create the server, you just need the HTTP module and then call the `createServer` method. I.e, `http.createServer`. Pass a response and a request that serves up your information. Then use;

- `req.url` to set the request access route/URL.
- `req.method` 
- `res.writeHead` to  set any response headers.
- `res.write()` to send the actual content for the.response.
- `res.end()`  to end the response.

```js
const server = http.createServer(async (req, res) => {

//set the request route
  if (req.url === "/api" && req.method === "GET") {
    //response headers
    res.writeHead(200, { "Content-Type": "application/json" });
    //set the response
    res.write('Hi there, This is a Vanilla Node.js API');
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

4. Call the `listen()` method and pass in the `PORT` variable. The add a `console.log()` message that will indicate the server is up and running.

```js
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
```

5. The server is well set. Run `node app.js` to test it. This will log the `console.log()` message on your command screen.

![A simple server api](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/a-simple-server-api.jpg)

6. If you open `http://localhost:5000/api` on a browser, you'll be served the response as defined in the `res.write()`

![A simple server response](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/a-simple-server-response.jpg)

### Setting up the REST API

Let's now see how to set up a REST API using raw Node.js. We'll use a Todos boilerplate to demonstrate this.

Below is the project structure.

```bash
\---vanilla-nodejs-rest-api
|   app.js
|   controller.js
|   data.js
|   utils.js

No subfolders exist
```

#### Adding test data

**data.js**: Contains the temporary test data. The data is stored in a todos array. Each todo has an `id`, `title`, `description`, and `completed` value.

```js
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

#### setting up the controllers

**controllers.js**: Handles the logic behind each route. Comprises of a class `Controller`. The class has the following methods:

- `getTodos()`: To fetch all todos.
- `getTodo()`: To fetch a single todo.
- `createTodo()`: To create a todo.
- `updateTodo()`: To update a todo.
- `deleteTodo()`: To delete a todo.

```js
//controller.js
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

**utils.js**: Handle simple use cases in the API. It contains the `getReqData()` function, which gets the data sent by the client.

```js
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

**app.js**: It contains;
- the server configurations,
- how different routes are listened to by the server,
- the port the server is started on,
- and the functionality to start the server.

```js
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

To start the server, run the following command from your terminal:

```bash
node app.js
```

This will set up the server up and running.

![A simple server api](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/a-simple-server-api.jpg)

### Explore the API using Postman
Let's test the different methods set in the API using Postman.

If you are not familiar with Postman, check out this [tutorial](https://www.youtube.com/watch?v=uWrw0Bh7BVM).

#### Get all todos
**/API/todos GET**: This will fetch all the todos listed in the `data.js`. To test it:

- Head over to Postman, open a new tab, and **SEND** a `GET` request to URL `http://localhost:5000/api/todos`.

![Get all todos](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/postman-get-all-todos.jpg)

- The response should resemble the following:

![Get all todos](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/get-todos.png)

#### Get a todo by id
**/API/todos/:id GET**: This will fetch a single todo. To test it:

- Open a separate tab in Postman and **SEND** a `GET` request to `http://localhost:5000/api/todos/:id`. Replace `:id` with and id of the todo you want to fetch.

![Get a single todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/postman-get-a-todo.jpg)

- The response should resemble the following:

![Get a single todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/get-todo.png)

#### DELETE a todo
**/API/todos/:id DELETE**: This will delete a single todo. Since the data is temporary and not (saved) in a database, you will only receive a response message. To test it:

- Open a separate tab in Postman and **SEND** a `DELETE` request to `http://localhost:5000/api/todos/:id`. Where `:id` represents the todo you want to delete.

![Delete a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/postman-delete-a-todo.jpg)

- The response should resemble the following:

![Delete a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/del-todo.png)

#### UPDATE a todo
**/API/todos/:id PATCH**: This will update a to indicate that the task complete, i.e., `true` or `false`. You will see the effect on the postman response console. To test it:

- Open a separate tab in Postman and **SEND** a `PATCH` request to `http://localhost:5000/api/todos/:id`. Where `:id` represents the todo (task) you want to mark as completed.

![Update a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/postman-update-a-todo.jpg)

- The response should resemble the following:
![Update a todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/update-todo.png)

#### ADD a new todo
**/API/todos POST**: This will add a new todo. The new todo will be sent back as a response but won't be saved in the `data.js`. To test it:

- Open a separate tab in Postman.
- Select `POST`.
- Enter URL `http://localhost:5000/api/todos`.

![Add a new todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/postman-add-a-new-todo.jpg)

- In the `Body` tab, under `raw`, select `JSON` in the dropdown to the right and enter data of the new todo (title, the description, and completed). For example;

```js
{
   "title": "Vannila Node.js REST API",
    "description": "Working with responses and requests",
    "completed": false
}
```

![Add a new todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/adding-a-new-todo.jpg)

- After filling, hit the **SEND** button.
- The response should resemble the following:

![Add a new todo](/engineering-education/a-raw-nodejs-rest-api-without-frameworks-such-as-expressjs/create-todo.jpg)

>Note: The id may differ each time you send a request because it is generated randomly.

And there you have it, a simple, pure Node.js REST API. I hope you found this tutorial helpful.

Happy Coding!!!