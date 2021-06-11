[Docker](https://www.docker.com/) is a lightweight virtual machine (VM) that lets you specify virtual computers known as containers. These containers are made up of software images provided by various official software vendors. These containers, unlike traditional VMs, are super light and are not resource-intensive. Multiple containers can usually run in parallel with little impact on the host machine's resources. And that is absolutely what Docker containers are made for. The lightweight Docker containerization philosophy separates each service that your application requires and runs them in isolated environments.

Docker makes it simple to set up these environments. With a single yml file, you'll be able to build several containers that will all work together within a single network and communicate with each other to create a single functioning application. Containers allow developers to package an application along with all of its necessary components, including dependencies and other libraries and distribute it as a single package.

On the other hand, [Angular](https://angular.io/) is a single-page app design JavaScript front-end framework and a development platform for building innovative and advanced apps. Similar to React and Vue used to run the application on the client-side. Angular is also often used with back-end APIs to create powerful full-stack applications, such as making HTTP requests to a MERN stack.

In this guide, we'll set up a simple [docker-compose](https://docs.docker.com/compose/) script to get you up and to run with Docker, docker-compose, and a local Angular environment on your computer featuring Nginx for reverse proxy. No need to install [Angular CLI](https://angular.io/cli) locally. Docker-compose will help us lay down some instructions to get Angular containerized and ready to run some code.

Let's dive in and create a Docker image of an Angular application.

### Setting the local environments

To start with, install Docker on your computer. In this case, I am using windows OS [download and install Docker desktop](https://www.docker.com/products/docker-desktop) on your computer. Next, run `docker version` to confirm if Docker was successfully installed. If this was a success, you would get a log of the Docker version installed.

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

Happy Hacking!!