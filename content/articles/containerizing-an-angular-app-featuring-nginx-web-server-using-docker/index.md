---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-navigation-in-flutter/
title: How to Handle Navigation in Flutter
description: This article will show you how to navigate between different pages in Flutter. We will be building a simple app that uses an organized Navigation Named route.
author: 
date: 2021-06-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-navigation-in-flutter/hero.jpg
    alt: Handling Navigation in Flutter
---
[Docker](https://www.docker.com/) is a platform that enables you to build, manage, and ship applications. These applications are usually installed in specific areas known as containers. Unlike traditional VMs, Docker containers are super light and less resource-intensive. 
<!--more-->
### Introduction
Docker containers allow developers to package an application along with all of its necessary components, including dependencies and other libraries and distribute it as a single package. This enables the software to function the same way on different platforms or operating systems. In this article, we will learn how to containerize an AngularJS application.

[AngularJS](https://angular.io/) is a JavaScript front-end framework for building innovative and advanced web apps. It uses the same technologies as React.js and Vue.js. AngularJS can also be used to create back-end APIs, as well as full-stack applications

### Objective
In this guide, we'll set up a simple [Docker-compose](https://docs.docker.com/compose/) script to containerize our AngularJS application

### Setting the local environments
To start with, install Docker on your computer. You can follow this tutorial(https://www.section.io/engineering-education/getting-started-with-docker/) to get started with Docker.

In this case, I am using Windows OS [download and install Docker desktop](https://www.docker.com/products/docker-desktop) on your computer. 

Next, run `docker version` to confirm if Docker was successfully installed. If this was a success, you would get a log of the Docker version installed.

![Install docker version](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-version.png)

Go ahead and clone [this Angular GitHub repository](https://github.com/Rose-stack/dockerizing-an-angular-app) to get a basic working Angular App. Then, run the following command to clone the repository to your local computer.

```bash
git clone https://github.com/Rose-stack/dockerizing-an-angular-app.git
```

After a successful clone, install the dependencies of the application by running;

```bash
npm install
```

at the project root.

All is now set, and we can start writing Docker instructions to set up a dockerize Angular application.

### Setting Angular application Dockerfile

At the root of the cloned project, create a `Dockerfile` as shown below.

![Angular dockerfile](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/dockerfile.png)

A [Dockerfile](https://docs.docker.com/engine/reference/builder/) is a text file describing all of the guidelines a developer needs to create a Docker image. Docker reads instructions from a Dockerfile and builds images for you automatically. For example, you will come across the following commands.

- FROM - Creates a build process and pulls the most recent image from DockerHub as the base image to set up a system related to the dockerized application configurations.
- RUN- Executes and Adds a new layer to the base image.
- WORKDIR - Specifies the preferred working folder in which the configuration files will be run. If the path cannot be found, the directory is created.
- COPY - Copies the project's source files from the host computer's root folder to the container's working directory path.
EXPOSE- Specifies a port network to tell Docker that a container will listen on a specific port number at runtime.

Let's write down Dockerfile instructions.

#### Step 1: Setting up Node.js

Specifies the following Node.js command inside the Dockerfile.

```bash
FROM node:14.17.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
```

From above;

- First, we are getting a [Node.js image](https://hub.docker.com/_/node) from [DockerHub](https://hub.docker.com) version 14.17.0.
- Then, we are creating a directory called app.
- Transitioning to the app folder.
- Copying the `package.json` file from our project directory to the app directory.
- Inside the app folder, we are installing the dependencies by running `npm install`.
- Copying the other contents of the project folder to the app folder.
- Building the project in the app folder.

#### Step 2: Setting up Nginx server

[Nginx](https://nginx.org/) is a C-based open-source web browser server that also functions as a reverse proxy and load balancer. We are observing Angular files using the Nginx server to serve ngi=ular to the web.

```bash
FROM nginx:1.20.1
COPY --from=build-step /app/dist/ng-docker-example /usr/share/nginx/html
EXPOSE 4200:80
```

From above, we are;

- Getting an [Nginx image](https://hub.docker.com/_/nginx) from Dockerhub version 1.20.1.
- Copying all the build contents to the configured Nginx HTML folder.
- Exposing `4200` as our container port and `80` as our host port.

We've defined a Dockerfile that will install and run all of the requisite environments for building an Angular app.

### Setting up a docker-compose.yml file

At the root of the project, create the `docker-compose.yml` file.

![Angular docker compose file](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-compose.png)

Add the following contents to the file:

```yml
version: "3.7"
services:
    angular-service:
       container_name: ng-docker-example
       build: .
       ports:
           - "4200:80"
```

From above;

- The `version` is the version we will use for the compose file.
- In the `services`, we define our application's services.
- For this case, we have `angular-service` but feel free to rename it to any name.

In the service, we specify the following;

- The container name: This is the preferred name of our container.

- The build: This is the folder location of the `Dockerfile`.

- The ports: This is the exposed combination of the container port and host port.

### testing the containerize Angular application

From your terminal (at the root of the project), build your image by running;

```bash
docker-compose build <name_of_your_service>
```

> Enter the name of the service specified in the docker-compose file as the <name_of_your_service>, for example, `angular-service`.

In this, the build command will be;

```bash
docker-compose build angular-service
```

![Angular docker build](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-build.png)

After all the steps are finalized, run the following command:

```bash
docker-compose up
```

All of the services specified in the docker-compose file will be started when you run the command above.

![Angular docker-compose up](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-compose-up.png)

The dockerize Angular application is up and running. You can access the containerized application from your browser by keying `http://localhost:4200`.

![Dockerized angular app](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/dockerized-angular-app.png)

You can confirm your Docker build image by running the following command.

```bash
docker images
```

![Angular docker images](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-images.png)

With the image all set, you can deploy it to Dockerhub or share it with teammates.

### Conclusion

The concept of Docker virtualization is an incredible technology. It can be used to virtualize almost any sort of application you can think of. Angular is used to customize frontend web designs and appearance. However, you can still use it with backend technologies such as [Node.js](/building-a-nodejs-application-using-docker/), and the fun part is that you can still dockerize it as a whole full-stack application. Check out this fantastic tutorial to more about docker.

### Further reading
[Getting Started with Docker](/getting-started-with-docker/)
[Managing and Running Docker Containers](/engineering-education/running-and-managing-docker/)
[Building A Node.js Application Using Docker](/building-a-nodejs-application-using-docker/)
[Getting Started with MariaDB Using Docker and Node.js](/getting-started-with-mariadb-using-docker-and-nodejs/)
[Containerizing WordPress with Docker-Compose](/docker-wordpress-containerizing-wordpress-with-docker-compose/)
[How to Deploy Docker Container to a Kubernetes Cluster](/deploy-docker-container-to-kubernetes-cluster/)
[How to Share Data Between Docker Containers](/sharing-data-between-docker-containers/)

Happy Hacking!!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)