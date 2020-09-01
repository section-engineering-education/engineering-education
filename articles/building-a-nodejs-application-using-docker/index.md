# Building A Node.js Application Using Docker

[Docker](https://www.docker.com/) allows us to run our applications as *containers*. A container is a standalone executable package which is lightweight and has everything needed to run an application be it libraries, tools, runtime, setting or code.

In this tutorial, we will build a Node.js application, create an image and also build a container using the image. Enjoy!


## Dockerize the Node.js Application

To start this tutorial, we need to make sure Docker and [Node.js](https://nodejs.org/en/download/package-manager/) is installed on our system. If Docker is not, you can refer to the links below to download:
- [Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntu/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [MacOS](https://docs.docker.com/docker-for-mac/install/)

In order to dockerize a Node.js Application we need to follow these steps:

- Creating A Node.js Application
- Create A DockerFile
- Building your Docker Image
- Expose

## Step 1 - Creating a Node.js Application

First, we will start by creating a directory for our project then install some dependencies for our simple Hello World Website.
```bash
 mkdir node-web-app
 cd node-web-app
```

## Install npm and Express Framework

Install npm and express framework, which is a Node.js framework. Then, initialize npm in our directory.
```
 npm init
```
npm creates a `package.json` that holds the dependencies of the app. Next, install the express framework dependency.
```
 npm install express --save
```
Result:
```js
{
  "name": "web-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {},
  "description": ""
}

```
Create a `app.js` file with an HTTP server that will set up the Hello World site:
```js
//Load express module with `require` directive
var express = require('express')
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World!')
})

//Launch listening server on port 8080
app.listen(8080, function () {
  console.log('app listening on port 8080!')
})
```

### Run The Application

The app is ready to launch:
```
$ node app.js
```
Go to `http://localhost:8080/` in your browser to view it.

## Step 2 - Create A DockerFile

Create a file in the directory called `Dockerfile`

The first thing is to define which image we want to build from. Here we will use version `9` of `node` available from Docker Hub:
```
FROM node:9
```
Next, create the working directory for your application
```
# Create app directory
WORKDIR /app
```
Install the app dependencies using the `npm` binary
```
# Install app dependencies
COPY package*.json ./

RUN npm install
```
Copy the rest of the application to the app directory
```
COPY /app
```
Expose the port and start the application
```
Expose 8080

CMD ["npm", "start"]
```
Your `Dockerfile` should look like this:
```bash
FROM node:9

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copying rest of the application to app directory
COPY . /app
 
# Expose the port and start the application
Expose 8080

CMD ["npm","start"]
```
*NB: Above you will notice we used two distinct COPY command to reduce the application rebuild time*

## .dockerignore file

Create a `.dockerignore` file so as not to copy unneccessary files to the container:
```
node_modules
npm-debug.log
```
This prevents the local module and debug logs from being copied onto your Docker image.

## Step 3 - Building your Docker Image

Building your Docker image is quite easy and can be done using a single command.
```
docker build -t <docker-image-name> <filepath>
```
*The `-t` flag lets you tag your image so its easier to find later*

For Example:
```
docker build -t cisca .
```
Result:
```
Sending build context to Docker daemon  19.97kB
Step 1/7 : FROM node:9
9: Pulling from library/node
d660b1f15b9b: Pull complete 
46dde23c37b3: Pull complete 
6ebaeb074589: Pull complete 
e7428f935583: Pull complete 
eda527043444: Pull complete 
f3088daa8887: Pull complete 
1ded38ff7fdc: Pull complete 
da44c9274f48: Pull complete 
Digest: sha256:cddc729ef8326f7e8966c246ba2e87bad4c15365494ff3d681fa6f022cdab041
Status: Downloaded newer image for node:9
 ---> 08a8c8089ab1
Step 2/7 : WORKDIR /app
 ---> Running in cad30dfd3fdb
Removing intermediate container cad30dfd3fdb
 ---> 97cdf5dffbfd
Step 3/7 : COPY package*.json ./
 ---> fc4fa5670f19
Step 4/7 : RUN npm install
 ---> Running in 2e3c38322fd4
Removing intermediate container 2e3c38322fd4
 ---> 6b9912b8f798
Step 5/7 : COPY . /app
 ---> 33d29aad9ebe
Step 6/7 : EXPOSE 8080
 ---> Running in 8b2a54h557cc
Removing intermediate container 8b2a5ah557cc
 ---> 13b95635c201
Step 7/7 : CMD ["npm","start"]
 ---> Running in 50a5824edf5e
Removing intermediate container 50a5824edf5e
 ---> faa3092e5595
Successfully built faa3092e5595
Successfully tagged cisca:latest
```
You should get something similar to the output above after executing the command. This means that the docker image was created successfully and the app is working fine.

Now that the build is complete you can check your image:
```
docker image ls
```
Result:
```
REPOSITORY                    TAG                 IMAGE ID            CREATED             SIZE
cisca                         latest              faa3092e5595        4 minutes ago       675MB
node                          12-alpine           08a8c8089ab1        2 weeks ago         673MB
```

## Step 4 - Run a Container

Now we can run the docker image using the command:
```
docker run -d -p <Host port>:<Docker port> <docker-image-name>
```
-d flag indicates the docker container is running in the background. The -p flag specifies which host port will be connected to the docker port.

Example:
```
docker run -d -p 8080:8080 cisca 
```
Result:
```
34fe3040ff6b9d1b593a3c5d650ef0f16d53a989fe41816634456dd7f1341183
```

## Conclusion

Use the `docker ps` command to check the running container.
```
docker ps -a
```
Result:
```
CONTAINER ID        IMAGE         COMMAND           CREATED              STATUS                          PORTS                    NAMES
34fe3040ff6b        cisca        "npm start"       About a minute ago   Exited (1) About a minute ago    0.0.0.0:8080->8080/tcp      intelligent_hofstadter
```

This tutorial has helped you with the basics of running a simple Node.js application using Docker and using a Dockerfile to build a Docker image.

## Resources

[Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

[Dockerize](https://buddy.works/guides/how-dockerize-node-application)
