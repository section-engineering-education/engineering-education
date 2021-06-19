﻿### Introduction
Debugging an application involves detecting and removing existing and potential errors known as bugs in a code that can cause it to work unexpectedly or even crash.

Debugging allows the developers to find and resolve bugs or defects in the application to prevent incorrect and unwanted operations.

In this tutorial, we will build a Node.js application with a bug in it, run it in a Docker container and use Visual Studio Code debugging tools for Node.js to debug it. The tutorial can be used by developers as a reference when building their applications.

Developers and the readers ought to have prior knowledge of [JavaScript programming](https://www.javascript.com/learn/) and Docker containers.

### Prerequisites
- Prior knowledge of [Docker containers](https://www.docker.com/resources/what-container) and [Node.js](https://nodejs.dev/learn) 
- [Docker](https://www.docker.com/products/docker-desktop) installed
- [Node.js](https://nodejs.org/en/) installed
- [Microsoft Visual Studio Code](https://code.visualstudio.com/download) installed
- A working web browser, preferably [Google Chrome](https://www.google.com/chrome)

### Initializing to-do Application
We will create a simple to-do list application that allows the users to add and delete tasks. We will also introduce a minor bug when coding the application and use Visual Studio Code to address the issue and fix it.

The knowledge gained in this tutorial will help the reader be able to debug their applications.

**Step 1**

Open a new terminal window, we browse to the project’s directory, and run the below command:

```bash
$mkdir TodoApp
$cd TodoApp
```

**Step 2**

Initialize the project by executing the below command:

```bash
$npm init -y
```

The above command will generate a file named [package.json](https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json) in the root folder. The `package.json` file contains information related to the Node.js project. It also gives information to [npm](https://docs.npmjs.com/getting-started) and allows it to work with the project's dependencies. The file will look like this:

![packagejson](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/packagejson.PNG)

### Creating to-do Application
Next, we will build our to-do application using [express](https://expressjs.com/), a fast, popular and lightweight web framework for Node.js.

Express package makes the development of web applications easier.

**Step 1**

We will install `express` and few other prerequisites needed by the application by running the below command:

```bash
$npm install express body-parser cookie-session ejs --save
```

**Step 2**

Then we will create a file named `app.js` in the root directory with the below code:

```JavaScript
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('cookie-session')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 3000

app.use(session({ secret: process.env.SECRET }))
  .use(function (req, res, next) {
    if (typeof (req.session.todolist) == 'undefined') {
      req.session.todolist = []
  }
    next()
  })

  .get ('/todo', function (req, res) {
    res.render('todo.ejs', { todolist: req.session.todolist })
  })

  .post ('/todo/add/', urlencodedParser, function (req, res) {
    if (req.body.newtodo != '') {
      req.session.todolist.push(req.body.newtodo)
    }
    res.redirect('/todo')
  })

  .get ('/todo/delete/:id', function (req, res) {
    if (req.params.id != '') {
      req.session.todolist.splice(req.params.id, 1)
    }
    res.redirect('/todo')
  })

  .use (function (req, res, next) {
    res.redirect('/todo')
  })


  .listen(port, () => console.log(`MyTodo app is listening on port ${port}!`))
``` 

**Step 3** 

Next will be to create the file named `./views/todo.ejs` and paste the following code in it: 

```html
<!DOCTYPE html>

<html>
    <head>
        <title>My todolist</title>
        <style>
            a {text-decoration: none; color: black;}
        </style>
    </head>

    <body>
        <h1>My todolist</h1>

        <ul>
        <% todolist.forEach(function(todo, index) { %>
            <li><a href="/todo/delete/<%= index %>">✘</a> <%= todo %></li>
        <% }); %>
        </ul>

        <form action="/todo/add/" method="post">
            <p>
                <label for="newtodo">What should I do?</label>
                <input type="text" name="newtodo" id="newtodo" autofocus />
                <input type="submit" />
            </p>
        </form>
    </body>
</html>
```

**Step 4**

We start the webserver by executing the below command:

```bash
$SECRET=bestkeptsecret; node app.js
```

A success message that the server is running and listening to the specified port will be displayed on the console window.

### Creating a Docker Image
Now we have successfully created a Node.js application. Next, we will be creating a [Docker image](https://jfrog.com/knowledge-base/a-beginners-guide-to-understanding-and-building-docker-images/) for it.

A Docker container is built from a Docker image that contains the necessary information needed to deploy and run the application with Docker.

To run a Docker container, we can either create our own Docker image or download an already built Docker image.

In our case, we will create our own Docker image. A Docker image comprises multiple layers, which are a read-only file system.

Docker works in a way that it creates a [layer](https://dzone.com/articles/docker-layers-explained) for every instruction contained in a Dockerfile. Each new layer resides on top of the previous layers. 

For the application's code that often changes, it is recommended to place it towards the end of the file.

**Step 1**

We create a file named [Dockerfile](https://thenewstack.io/docker-basics-how-to-use-dockerfiles/) in the project’s root directory with the below lines of code into it:

```dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run" , "start-debug" ]
```

We look closer to the file we have just created.

- **FROM**: sets the base image. Everything that will be added later will be based on this image. We are going to use `Node.js version 14` in this tutorial.
- **WORKDIR**: the working directory for the commands `COPY`, `RUN` and `CMD` is set here.
- **RUN**: it executes the `npm install` command in a Docker container.
- **COPY**: it copies the files to the Docker image from the build context.
- **EXPOSE**: it ensures that a process running in a Docker container is listening to port 3000. It helps forward the ports to the container from the host.
- **CMD**: it executes the `node app.js` command inside our Docker container after the container has started.

**Step 2**

As we do not want to send large files to the build context and speed up the system, we use the `.dockerignore` file.

It is a text file the same as that of `.gitignore`, and it contains the name of the directories and files that should not be added to the build. The file `.dockerignore` will contain the following content:

```dockerfile
node_modules
npm-debug.log
```

**Step 3**

Next, we will execute the `docker build` command with the below parameters to build our Docker image: 

- `-t`: it specifies the name of the image
- The path to the context points to the set of files we want to reference from our Docker file.

The command will look like below:

```bash
$docker build -t to-do-app .
```

As discussed earlier, the `docker build` command adds a new layer in every command in the Dockerfile.

Docker deletes the intermediate containers once the command executes successfully.

**Step 4**

With our Docker image in place, we can now run it by executing the `docker run` command and pass it the below arguments:

- `-p` is the port on the host. In our case, we will use port 3001 that will be forwarded to the container port 3000 and separated by `:` 
- `-e` will create an environment variable. In our case, we use the name `SECRET` and assign it the value to `bestkeptsecret`
- `-d` ensures the container will execute in the background
- The name of the image in this case `to-do-app`

The whole command will look like below:

```bash
$docker run -p 3001:3000 -e SECRET=bestkeptsecret -d to-do-app
```

**Step 5**

We can verify that our Docker container is running with:

```bash
$docker ps
```

The output will appear as below:

![docker container](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/docker-container-up.PNG)

**Step 6**

To inspect the logs, we execute the `docker logs` command followed by the `id` of the container:

```bash
$docker logs 9a8a8e6a13ae
```

The output will appear as below:

![docker-container-logs](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/docker-container-logs.PNG)

**Step 7**

Now that our application is up and running. We can browse to the link <http://localhost:3001>, and we try to add a new todo. As can be seen below, the application displays an error on line: `todolist.forEach(function(todo, index)` of the `todo.ejs` file.

![app-error](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/app-error.PNG)

In the below steps, we will look at how to debug the above error using Visual Studio Code.

**Step 8**

First, we have to stop the container from running by executing the below command:

```bash
$docker kill 9a8a8e6a13ae
```

### Debugging using Visual Studio Code
Visual Studio Code comes loaded with debugging tools for the Node.js applications running inside a Docker container. Below are the steps to be followed to enable this feature:

**Step 1**

We edit the `Dockerfile` by replacing the below line:

```dockerfile
CMD ["node", "app.js"]
```

With:

```dockerfile
CMD ["npm","run", "start-debug"]
```

Our updated `Dockerfile` will appear as below:

![docker-file-edited](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/docker-file-edited.PNG)

**Step 2**

We will edit the `package.json` file by adding the below line of code:

```json
"start-debug": "node --inspect=0.0.0.0 app.js"
```

The above line of code initializes the Node.js process to listen to a debugging client running on port 9229.

The updated `package.json` file appears as below: 

![packagejson-updated](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/packagejson-updated.PNG)

**Step 3**

Note that every time the `Dockerfile` gets updated, we must build the Docker image again:

```bash
$docker build -t to-do-app .
```

Also, note that Docker will now run the `npm run start-debug` command as we earlier updated.

**Step 4**

To debug using Visual Studio Code, we must forward port 9229. It is done by running the below command:

```bash
$docker run -p 3001:3000 -p 9229:9229 -e SECRET=bestkeptsecret22222 -d to-do-app
```

The above command will output:

![docker-containerupdated](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/docker-containerupdated.PNG)

**Step 5**

We can then check the logs by running the `docker logs` command and specifying the `id` of the container as below:

![docker-container-log-debug](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/docker-container-log-debug.PNG)

Note that the debugger is now listening to port 9229. Next, we will configure Visual Studio Code to debug our application.

### Steps for debugging the application using Visual Studio Code

**Step1**

Launch Visual Studio Code and open the project directory as below:

![project-directory](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/project-directory.PNG)

**Step 2**

The debug configuration in Visual Studio Code is stored in a file known as `launch.json`. To access it, press `Ctrl+Shift+P` and then search for `Debug: Open launch.json` and open it.

**Step 3**

Edit the `launch.json` file with the below code snippet:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Docker: Attach to Node",
            "type": "node",
            "request": "attach",
            "port": 9229,
            "address": "localhost",
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/usr/src/app",
            "protocol": "inspector",
            "skipFiles": [
              "${workspaceFolder}/node_modules/**/*.js",
              "<node_internals>/**/*.js"
            ]
        }
    ]
  }
```

Since we do not want to go through the code in the `node_modules` directory and inbuilt Node.js core modules, we have used the `skipFiles` attribute.

**Step 4**

Now that we have everything set up, we can start debugging the application. If we can recall earlier, we had an error in the `view/todo.ejs` file, in which the below line of code goes over the `todolist` array:

```JavaScript
todolist.forEach(function(todo, index)
```

In the `app.js` file, the `todo.ejs` file gets rendered at this line `res.render('todo.ejs', { todolist: req.session.todolist })`. We will put a breakpoint at that line and check the value of the `todolist` variable as below:

![breakpoint](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/breakpoint.PNG)

**Step 5**

Press `Shift+Ctrl+D` to change to the Debug view. Then click on the `Debug` and `Run` button as shown below:

![debug-run](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/debug-run.PNG)


**Step 6**

To check the value of `the req.session.todolist` variable, we will insert an expression to watch. It is done by selecting the `+` sign under watch on the sidebar of the window and then entering the name of the variable (`req.session.todolist`) as below:

![debug-watch](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/debug-watch.PNG)

**Step 7**

Next, we switch to the web browser and refresh the page http://localhost:3001/todo as shown below:

![waiting for localhost](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/chrome-wait-localhost.PNG)

The `Waiting for localhost` message will appear at the bottom left of the page, meaning that the breakpoint we created has paused execution, and we can check the value of the `req.session.todolist` variable.

Moving back to visual studio to get the details as shown:

![debug-watch-value](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/debug-watch-value.PNG)

So the `req.session.todolist` variable is `undefined`. Is it possible to fix the bug? The answer is in the following steps.

**Step 8**

The `ejb` template goes through the `todolist` array and ought to be placed in the current session. However, we did not initialize the array, so it is undefined. 

To fix the bug we will add the below lines of code to the `.use` function:

```JavaScript
    if (typeof (req.session.todolist) == 'undefined') {
      req.session.todolist = []
  }
```

The code snippet should be pasted just above the next function line of code. Our `.use` function will look as below:

```JavaScript
app.use(session({ secret: process.env.SECRET }))
  .use(function (req, res, next) {
    if (typeof (req.session.todolist) == 'undefined') {
      req.session.todolist = []
  }
    next()
  })
```

**Step 9**

Next will be to retrieve the `id` of our running container by executing the `docker ps` command as below:

![docker-container-id-debug](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/docker-container-id-debug.PNG)

**Step 10**

We stop the container by running the `docker kill` command followed by its `id` as below:

![docker-kill-debug](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/docker-kill-debug.PNG)

**Step 11**

To apply the changes we made earlier, we must rerun the `docker build` command as below: 

```bash
$docker build -t to-do-app .
```

**Step 12**

Next, we run the container using the below command:

```bash
$docker run -p 3001:3000 -p 9229:9229 -e SECRET=bestkeptsecret22222 -d to-do-app
```

**Step 13**

We reload the https://localhost:3001/todo page in the browser and check the results as shown below:

![todo-app-success](/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/todo-app-success.PNG)

### Wrapping Up
We have successfully written a to-do list Node.js application, executed it in a Docker container and utilized Visual Studio Code debugging tools to fix the issue.

The tutorial can be helpful to the developers who want to build their Node.js application in a Docker container and use the Visual Studio code debugging tools to fix the issues.

The code snippets and files used in this tutorial can be accessed at [GitHub Repo](https://github.com/verah-tech/TodoApp).