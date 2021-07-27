---
layout: engineering-education
status: publish
published: true
url: /working-with-docker-in-vscode/
title: Working with Docker in VS Code
description: In this article, we will look at how we can intergrate and work with Docker containers and images in VS Code. We will use dockerize a simple Express.js server to show how we can work with Docker in VS Code.
author: magdaline-kariuki
date: 2021-07-20T00:00:00-02:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/working-with-docker-in-vscode/hero.png
   alt: Docker VS Code Example Image
---
Microservices and containers are the two major new software development trends nowadays.

A microservice is an architectural approach in which a system is divided into discrete services, each with a single, narrowly defined feature that is accessible to the rest of the system as well as external parties such as web and mobile apps via an API.
<!--more-->
A container is an excellent method to bundle your program, its dependencies, and settings into a single, portable image file.

A container image is a small, discrete executable bundle of software that contains everything required to run it, including code, environment, tools, system libraries, and preferences. A container is an architecture that groups code and requirements together at the app layer.

Docker is a well-known container technology that makes it simple to package, deploy, and consume services. You can generate images using Docker by defining step-by-step commands in a `Dockerfile`, which is simply a text file carrying the build instructions.

### Prerequisites
Docker and Visual Studio Code must be installed on your computer in order to follow along with this tutorial.

Here are some tutorials to help you with your Docker installation.

1. [Getting started with Docker on Linux](/engineering-education/getting-started-with-docker/).
2. [Installing Docker desktop on Mac](https://docs.docker.com/docker-for-mac/install/).
3. [Installing Docker desktop on Windows](https://docs.docker.com/docker-for-windows/install/).

### Hello Docker
Confirm that you have a Docker installation on your machine by checking the Docker version.

Open a terminal and run the command below.

```docker
$ docker --version
```

To verify that your installation is working correctly, run the `hello-world` Docker image.

```bash
$ docker run hello-world
```

If the above command executes without errors, then you can proceed to the next step because everything has installed correctly.

### The Docker extension
A Docker extension for VS Code is used to provide support for Docker. To install the Docker extension, search and install it from the extensions pane.

![Docker Extension In VS Code](/engineering-education/working-with-docker-in-vscode/docker-extension.png)

Let's build a simple Node.js server to demonstrate how we can use VS Code to work with Docker containers and images.

### Creating the sample project
Make a folder on some location on your machine where you want your project to reside.

```bash
$ mkdir dockervscode
$ cd dockervscode
```

To keep things very simple, I will be using the [Hello World example server](https://expressjs.com/en/starter/hello-world.html) provided by Express.js.

Initiate this project using the command below.

```bash
$ npm init -y
$ npm install express --save
```

Then, create a new file `index.js` where we will put our Express.js server code.

```bash
$ touch index.js
```

Now open this folder with VS Code.

```bash
$ code .
```

Then paste the code below inside `index.js`.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
```

### Manually writing the Dockerfile
As we said earlier, to build Docker images, you need a `Dockerfile`.

Because VS Code understands Dockerfiles' format as well as the relevant set of instructions, creating these files should be simple.

Make a new file called `Dockerfile` in your working directory.

Open this new file in the editor and press ^Space on Mac or `Control+Space` on other machines, to bring up the IntelliSense dialog. This dialog shows a list of `Dockerfile` snippets.

You can use the IntelliSense feature provided by VS Code when creating and editing Dockerfiles by hand.

### Generating Dockerfiles using VS Code
Manually writing Docker and docker-compose files can be difficult and can take a lot of time. VS Code recognizes this, thus it comes with a feature to generate the appropriate Docker files for your project.

Open the Command Palette by pressing ⇧⌘P on Mac or `Control+Shift+P` on other machines. To create a `Dockerfile`, a `docker-compose.yml`, and a `docker-compose.debug.yml` for this project, run the Docker: Add Docker files to Workspace command. Select `Node.js` for the application platform and fill in the required details.

![Add files to workspace](/engineering-education/working-with-docker-in-vscode/docker-add-files.png)

### A look at the Dockerfile
VS Code creates the Dockerfile by obtaining the newest Node.js container from the Docker hub.

The generated Dockerfile will look similar to the one below.

```dockerfile
FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

The configuration above tells Docker to:

- Use the `node:12.18-alpine` image from the Docker Hub.
- Set the environment variable `NODE_ENV` to `production`.
- Make port 3000 accessible from outside the container.
- Run the command `npm install --production --silent && mv node_modules ../` before serving the app.
- Use the command `node index.js` to run the program.

You can use the `.dockerignore` file to keep your build scope as small as possible. A `.dockerignore` is a text file similar to `.gitignore` and is used to contain the files and folders that are not supposed to be copied when building the image.

### Building and running the Docker image
To build the Docker image, right click the Dockerfile in the navigation panel and select `Build image`. Alternatively, you can open the Command Palette and execute `Docker Images: Build Image`.

To run the created image, open a terminal on the same directory and run the command below:

```bash
$ docker run -d -p 3000:3000 dockerserver
```

The command above tells the Docker to run the container in detached mode. This way, you can re-use the terminal. The container operates on port 3000 and is locally mapped onto port 3000.

You can access your now running web server by 'curling' <http://localhost:3000>.

```bash
$ curl http://127.0.0.1:3000
```

The command above should print a simple "Hello World!".

By switching to the Docker extension pane, you can easily manage your existing containers, [container registries](https://code.visualstudio.com/docs/containers/quickstart-container-registries) and images.

### Common Docker commands
You can use most of the required commands needed to work with your Docker images, containers from the Command Palette. You can find all the Docker commands by typing `Docker :`.

![Common Docker commands](/engineering-education/working-with-docker-in-vscode/docker-commands.png)

### Conclusion
By using the VS Code Docker extension, you can be able to do most of the Docker tasks like generating Docker files and building images with a single click.

### Further reading
- [Debugging a Node.js app running in Docker](/engineering-education/debug-node-docker/)
- [Docker Security - Best Practices to Secure a Docker Container](/engineering-education/best-practices-to-secure-a-docker-container/)
- [Top 7 Docker Monitoring Tools](/engineering-education/top-7-docker-container-monitoring-tools/)

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
