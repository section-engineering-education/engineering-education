---
layout: engineering-education
status: publish
published: true
url: /engineering-education/debug-node-docker/
title: Debugging a Node.js app running in Docker
description: This article is about debugging a Node.js app running in a Docker container. You need to add a debug script in your package.json to enable debugging in your Node.js app.
author: geoffrey-mungai
date: 2020-09-11T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/debug-node-docker/hero.jpg
    alt: image Node.js debugger docker
---
Docker is one of the tools used by many developers today. You do not need to have Node.js installed in your machine to build Node.js apps. You only need Docker. Running a Node.js app in Docker can be done easily. What about debugging? Let us look at how you can debug a Node.js app running in a Docker container.
<!--more-->

### Introduction
[Docker](https://www.docker.com/) is used to build, run, and deploy apps in [containers](/engineering-education/history-of-container-technology/). This way, all libraries, and dependencies can be packaged and deployed as a single package. Now you don't need to install Node.js to run or build a Node.js app. You just need Docker.

If you have ever worked on a project in a team, you're *probably* familiar with the "It works on my machine" problem. Docker took care of that too.

 If you are new to Docker, I recommend you go through the following articles. They will give you better understanding on Docker.

 1. [A Brief History of Container Technology](/engineering-education/history-of-container-technology/)

 2. [Understanding Docker Concepts](/engineering-education/docker-concepts/)

 3. [Getting Started with Docker](/engineering-education/getting-started-with-docker/)

 4. [Building a Node.js Application Using Docker](/engineering-education/building-a-nodejs-application-using-docker/)

### Prerequisites
To follow along with this tutorial, you will need the following:

- A Docker [installation](https://docs.docker.com/engine/install/) on your machine. For Linux users, you can install using [this](/engineering-education/getting-started-with-docker/) guide.
- [Visual Studio Code](https://code.visualstudio.com/download) and/or a chromium-based browser .eg. [Google Chrome](https://www.google.com/chrome/).
- Basic knowledge of Node.js and Docker concepts.

By the end of this tutorial, you will be able to debug your Node.js app using VS Code and Chrome DevTools.

### Step 1 -- Update your Dockerfile configuration
If you have been running your Node.js apps in a Docker container, your Dockerfile *probably* looks something like this:

```docker
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]
```

To be able to debug a Node.js app running in a Docker container, you need to update your run command. Edit your Dockerfile `CMD` entry to look like this:

```docker
CMD ["npm", "start"]
```

### Step 2 -- Update your package.json configuration
The next step is to add a Node.js debug command under the scripts part of your `package.json` file.

Your scripts part of your `package.json` *probably* looks like this:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Edit it to look like this:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node --inspect=0.0.0.0 index.js"
  },
```

You have added a script named "start" that executes "`node --inspect=0.0.0.0 index.js`".

> **Note**: The normal `--inspect` flag used in Node.js can't be used since the app is running in a container and not directly on your machine. Basically, your app is running in a "remote" machine. We use `--inspect=0.0.0.0` instead to allow access from any IP address.

### Step 3 -- Set up Nodemon

> *This step is optional*. It's suitable for a development environment.

[Nodemon](https://nodemon.io/) is a tool to restart your app every time a change is made to your app. It is very useful in a development environment.

To use Nodemon with your app, you need to edit your Dockerfile and package.json.
Add this line below the `RUN npm install` line.

```docker
RUN npm install -g nodemon
```

Change `node --inspect=0.0.0.0 index.js` to `nodemon --inspect=0.0.0.0 index.js` in your package.json.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --inspect=0.0.0.0 index.js"
  },
```

> You can use `--inspect-brk=0.0.0.0` to pause code execution until a debugger is attached.

### Step 4 -- Debug with Chrome [DevTools](https://developers.google.com/web/tools/chrome-devtools)
Build your Docker image.

```bash
$ docker build -t <your-image-name> .
```

Since your app will be running in a container, you need to map the ports inside the container to ports on your machine.

```bash
$ docker run --rm -d  -p 3000:3000 -p  9229:9229  image:tag
```

The above command runs your container in detached mode (`-d`) and maps remote ports 3000 and 9229 to localhost ports 3000 and 9229 respectively.

> Port 9229 is the default debug port for Node.js but you can change it if necessary.

Finish up debugging your app in Chrome DevTools [here](/engineering-education/debug-node-devtools/#step-2----open-chrome-devtools).

### Step 5 -- Debugging with VS Code
To debug your app in VS Code, make sure **Node: Auto Attach** setting is on. It enables VS Code to connect to your running app. To enable it, open the **Command Pallete**(`Ctrl+Shift+P`) and search for `Debug: Toggle Auto Attach`.

![Enable auto attach VS Code](/engineering-education/debug-node-docker/enable-auto-attach.jpg)

You will also require **Docker Extension**. Open the **Extensions** tab and search for Docker and install it. The extension comes in handy in managing Docker images and containers.

![Docker extension in VS Code](/engineering-education/debug-node-docker/docker-extension.jpg)

Configure your `launch.json` to look like the snippet below. You can create a `launch.json` file by opening Command Pallete and searching for `Debug: Open launch.json`.

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
            "protocol": "inspector"
        }
    ]
}

```

If you are using Nodemon, add `"restart":true` under `configurations`. It will allow VS Code to automatically re-attach when your app reloads.

Build your Docker image using Docker extension or use the command `docker build -t <your-image-name> .`

![Building Docker image VS Code](/engineering-education/debug-node-docker/build-docker-image.jpg)

Then, run it in a terminal exposing your ports:

```bash
$ docker run --rm -d  -p 3000:3000 -p  9229:9229  image-name:tag
```

> The `-d` flag is used to run the container in "detached" mode. Therefore, you can use the same terminal to execute other commands.

Open your file and set breakpoints by clicking on the left side of the number line. A red dot appears when a breakpoint has been set.

![Setting breakpoints VS Code](/engineering-education/debug-node-docker/set-breakpoints-vscode.jpg)

Open the debug panel by clicking on the bug icon in the activity bar. Click the play button or press `F5` to attach VS Code to your running app. The bottom bar in VS Code will turn orange on a successful attach.

![Attach process VS Code](/engineering-education/debug-node-docker/attach-to-node-docker.gif)

Open or reload the listening port for your app in a browser. You can also use [curl](https://curl.haxx.se/) command to achieve the same effect.

```bash
$ curl http://127.0.0.1:3000
```

![Start debug session](/engineering-education/debug-node-docker/start-debug.gif)

On hitting `Enter`, VS Code starts the debug session and pauses on the first breakpoint. You can use the continue button on the floating controls bar or `F5` to resume execution. You can also watch variables in the **watch** pane.

### Conclusion
In this tutorial, we looked at how you can debug your Node.js app running in a Docker container. You will need to add a debug script in your package.json to enable debugging in your Node.js app. We have looked at how you can use Nodemon to restart your app after making changes. Nodemon is useful in a development environment but not really useful in a production environment.

Debugging in Chrome DevTools doesn't require many configurations. The only configurations are in the Dockerfile and package.json. It is suitable for one time debugging. On the other hand, VS Code does require extra configurations. It's more suitable for long-term debugging. You won't have to open as many windows to debug your app.
