---
layout: engineering-education
status: publish
published: true
url: /containerizing-an-angular-app-featuring-nginx-web-server-using-docker/
title: How to Containerize an AngularJS Application Featuring Nginx Using Docker Containers
description: This article will guide you on how to dockerize an AngularJS application and Nginx web server using Docker compose. This technique allows the app to run the same way on different platforms.
author: rose-waitherero
date: 2021-07-02T00:00:00-05:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/hero.png
    alt: Containerizing an AngularJS Application using Docker
---
[Docker](https://www.docker.com/) is a platform that enables you to build, manage, and ship applications. These applications are usually installed in specific areas known as containers. Unlike traditional VMs, Docker containers are super light and less resource-intensive. 
<!--more-->
### Introduction
Docker containers allow developers to package an application along with all of its necessary components, including dependencies and other libraries and distribute it as a single package. This enables the software to function the same way on different platforms or operating systems. In this article, we will learn how to containerize an AngularJS application.

[AngularJS](https://angular.io/) is a JavaScript front-end framework for building innovative and advanced web apps. It uses the same technologies as React.js and Vue.js. AngularJS can also be used to create back-end APIs, as well as full-stack applications.

### Objective
In this guide, we'll set up a simple [Docker-compose](https://docs.docker.com/compose/) script to containerize our AngularJS application

### Setting the local environments
To start with, install Docker on your computer. You can follow this [tutorial](https://www.section.io/engineering-education/getting-started-with-docker/) to get started with Docker.

If you are using Windows OS, you can download and install `Docker desktop` from [here](https://www.docker.com/products/docker-desktop). 

Next, run `docker version` in your command line to confirm if Docker was successfully installed. 

If the installation was successful, you should see the following message:

![Install docker version](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-version.png)

Go ahead and download the AngularJS application from this [repository](https://github.com/Rose-stack/dockerizing-an-angular-app). 

Alternatively, you can clone the repository using the following command:

```bash
git clone https://github.com/Rose-stack/dockerizing-an-angular-app.git
```

After a successful clone, install the dependencies of the application by running:

```bash
npm install
```

### Creating a Dockerfile
A [Dockerfile](https://docs.docker.com/engine/reference/builder/) is a text file that contains instructions for creating a Docker image. 

At the root of the cloned AngularJS project, create a `Dockerfile`, as shown below.

![Angular dockerfile](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/dockerfile.png)

Some of the important `Docker` commands that we will use include:
- `FROM` - It creates a build process and pulls the most recent image from DockerHub.
- `RUN` - It executes and adds a new layer to the base image.
- `WORKDIR` - It specifies the preferred working folder in which the configuration files will be stored. If the path cannot be found, the directory will be created.
- `COPY` - This command copies the project's source files from the host's root folder to the container's working directory.
- `EXPOSE` - It specifies a network port to notify Docker that a container will listen on a specific port number at runtime.

Let's write down the Dockerfile instructions.

### Step 1 - Setting up Node.js
Add the following commands inside the Dockerfile:

```bash
    FROM node:14.17.0-alpine as build-step
    RUN mkdir -p /app
    WORKDIR /app
    COPY package.json /app
    RUN npm install
    COPY . /app
    RUN npm run build --prod
```

In the commands above, we are:
- Retrieving a [Node.js image](https://hub.docker.com/_/node) from [DockerHub](https://hub.docker.com) version 14.17.0.
- Then, we are creating a `directory` called `app`.
- Navigating to the `app` folder.
- Copying the `package.json` file from our `project` directory to the `app` directory.
- Inside the `app` folder, we are installing the dependencies by running the `npm install` command.
- Copying the other contents of the project folder to the app folder.
- Finally, we build the project in the app folder.

### Step 2 - Setting up Nginx server
[Nginx](https://nginx.org/) is a C-based open-source web browser server that also functions as a reverse proxy and load balancer. In this article, we are observing Angular files using the Nginx server.

```bash
    FROM nginx:1.20.1
    COPY --from=build-step /app/dist/ng-docker-example /usr/share/nginx/html
    EXPOSE 4200:80
```

In the commands above, we are:
- Getting an [Nginx image](https://hub.docker.com/_/nginx) from Dockerhub version `1.20.1`.
- Copying all the `build` contents to the configured `Nginx HTML` folder.
- Exposing `4200` as our container `port` and `80` as our host port.

### Setting up a docker-compose.yml file

At the root of the project, create a file and name it `docker-compose.yml`.

![Angular docker-compose file](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-compose.png)

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

Let's now understand what the above components do:

- We will use `version 3.7` for the compose file.
- In the `services` section, we define our application's services which in our case is `angular-service`. We also state the container name, the build folder, as well as appropriate ports.

### Testing the containerized AngularJS application
From your terminal (at the root of the project), build your image by running:

```bash
    docker-compose build <name_of_your_service>
```

> Enter the name of the service specified in the `docker-compose` file as the <name_of_your_service>. In our case, it is `angular-service`.

The build command should look as shown below:

```bash
docker-compose build angular-service
```

![Angular docker build](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-build.png)

After all the steps are finalized, run the following command to initialize all the `services` specified in the `docker-compose` file:

```bash
docker-compose up
```

![Angular docker-compose up](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-compose-up.png)

The dockerized AngularJS application is now up and running. You can access the containerized application from your browser by navigating to `http://localhost:4200`.

![Dockerized AngularJS app](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/dockerized-angular-app.png)

You can confirm your `Docker build image` by running the following command:

```bash
docker images
```

![Angular docker images](/engineering-education/containerizing-an-angular-app-featuring-nginx-web-server-using-docker/docker-images.png)

With the image set, you can deploy it to Dockerhub or share it with teammates.

### Conclusion
Docker virtualization is indeed an incredible technology. It can be used to virtualize almost any sort of application. AngularJS is mainly used to develop frontend web designs. However, you can still use it with backend technologies such as [Node.js](https://www.section.io/engineering-education/building-a-nodejs-application-using-docker/). The fun part is that you can still dockerize it as a full-stack application. 

### Further reading
- [Getting Started with Docker](/engineering-education/getting-started-with-docker/)
- [Managing and Running Docker Containers](/engineering-education/running-and-managing-docker/)
- [Building A Node.js Application Using Docker](/engineering-education/building-a-nodejs-application-using-docker/)
- [Getting Started with MariaDB Using Docker and Node.js](/engineering-education/getting-started-with-mariadb-using-docker-and-nodejs/)
- [Containerizing WordPress with Docker-Compose](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/)
- [How to Deploy Docker Container to a Kubernetes Cluster](/engineering-education/deploy-docker-container-to-kubernetes-cluster/)
- [How to Share Data Between Docker Containers](/engineering-education/sharing-data-between-docker-containers/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
