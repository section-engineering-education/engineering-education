---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-navigation-in-flutter/
title: How to Handle Navigation in Flutter
description: This article will show you how to navigate between different pages in Flutter. We will be building a simple app that uses an organized Navigation Named route.
author: nathaniel-dauda-wobin
date: 2021-06-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-navigation-in-flutter/hero.jpg
    alt: Handling Navigation in Flutter
---
One of the core concepts in all mobile applications is navigation. It allows a user to move between different pages or activities. Navigation increases an app's functionality. It enables developers to include numerous features on different screens.
<!--more-->
 
### What is Docker
[Docker](https://www.docker.com/) is among the most popular containerization technologies. It has quickly become the de facto standard when talking about containers.
 
Docker is a technology that allows you to package an application together with all of its dependencies into a single, compact, and isolated container. This process is known as containerization.
 
### Why containerizing an app is important
Containerizing an app allows it to execute in the same way regardless of the workspace or computer that it is deployed on.
 
A small difference in the version of an external library can change the functionality of your application, thus, causing it to behave differently.
 
The beauty of Docker is that if you containerize your application and transfer the image to your colleague's computer, you can be sure that the application will have the same performance on both devices. This is because the container includes all the application's dependencies.
 
### Images and containers
Docker files, which are read-only templates, are used to create containers. Therefore, images and containers are inextricably linked, and both are required to run the Docker software platform. For more information on Docker images, visit this [page](stackify.com/docker-image-vs-container-everything-you-need-to-know/amp/).
 
### Goal
In this article, you will learn how to build a simple python application using Flask and Docker compose. Docker Compose helps to manage containers and other related services.
 
### Prerequisites 
- Basic understanding of Python and Flask.
- Basic understanding of the command line.
- A code editor(IDE) such as VS code or Pycharm.
 
Install Docker, Docker Compose via the links below:
- [Docker](www.docker.com) 
- [Docker compose](https://docs.docker.com/compose/)
 
### Step 1 - Application structure 
Our application will look like this at the end
 
```
    |---- docker-compose.yml
    |---- app
           |---- app.py
    |---- requirements.txt
```
    
We will create a new repository for our project called `docker` using our command line.
 
Open your command prompt and enter the following line. You can use the command line that comes with VS code after its installation.
 
```bash
mkdir docker && cd docker
```

Next, we will create our `Docker compose` file in the `docker` directory. In a moment, we'll create our application's services using the `Docker Compose` file.

```bash
touch docker-compose.yml
```

Our project's structure should now look like this.

```
docker
 |---- docker-compose.yml
```  

Before we go further, let's develop our `Flask` application.
 
### Step 2 - Building our Flask App
Flask is a lightweight python framework used in building web applications with lightweight codebase.
We will create a flask web application that displays 'Flask Dockerized' on the browser when we run the web application.

Create a new directory called `flask` and then navigate into it using the following command.

```
cd flask
```

Inside the `flask` directory, create a new folder and name it `app`. Inside this folder, create your `app.py`, file, this will contain our `Flask` application.

The Flask application will look as shown below.
 
**app.py**
```
from flask import Flask
app = Flask(__name__)
 
@app.route('/')
def hello_world():
    return 'Flask Dockerized'
 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
```

That's our flask app that returns 'Flask Dockerized’ when we run it.

let’s have an overview of the code whats in our **flask application**:

* from flask import Flask - Firstly we imported the flask class.
* app = Flask(__name__) - We then make a flask instance.
* @app.route('/') - We now tell Flask the URL the will call our function.
* def hello_world() - This returns 'Flask Dockerized', which is displayed in our browser.
* if __name__ == '__main__': - onces this statement is true the app.run(debug=True, host='0.0.0.0') function will be executed.
* app.run(debug=True, host='0.0.0.0') - this starts the server on your local machine.



 
### Step 3 - Create our Requirements file
next we create a **requirements.txt** file.
we can run the command below to create our **requirements.txt** file.
The requirements.txt file contains the dependencies or packages required to run our applications
```
pip freeze > requirements.txt
```
Open the requirements.txt file and you should see this
```
click==8.0.1
colorama==0.4.4
Flask==2.0.1
itsdangerous==2.0.1
Jinja2==3.0.1
MarkupSafe==2.0.1
Werkzeug==2.0.1

```
### Step 4 - Create Dockerfile
 
Dockerfile is used to create an image for our application, this image can now run on any host or environment with **Docker** installed on it and it is guaranteed to run the same way in any environment. Image can be used to deploy the application everywhere. 
For each image built a Dockerfile is created, in our application, we will only be building one image, which is for our flask application.
 
```
touch Dockerfile
```
In the Dockerfile created we include the following instructions and arguments.
 
**Dockerfile** 
```
FROM python:3.8
 
WORKDIR /app
COPY . /app
 
RUN pip install -r requirements.txt
 
ENTRYPOINT ["python"]
CMD ["app.py"]
```
Dockerfile is a text file written in a specific format that Docker can understand. It is in an instruction and argument format with instructions on the left in uppercase and arguments on the right in lowercase.
 
let’s have an overview of whats in our **Dockerfile**:
* FROM python:3.8 - All Dockerfile must start with a FROM instruction with an argument that has another image, the FROM instruction pulls the python:3.8 image.
* WORKDIR /app - It is similar to **cd command**. It sets our working directory as /app, which is will be at the root of our container. It runs any instruction that follows it in the Dockerfile such as **COPY**, **RUN**, **ADD**, **CMD**, or **ENTRYPOINT**. 
* COPY  . /app - This copies files from the local system unto the docker image. it copies it from the current folder denoted with . to the  /app directory inside the docker image.
* RUN pip install -r requirements.txt - Install all dependencies or packages in our **requirements.txt** file.
* ENTRYPOINT ["python"] - Specify a command that will be run when the image is specified as a container.
 
* CMD ["app.py"] - Stands for command and defines the program that will be run within the container when it starts.
 
ENTRYPOINT is like the CMD instruction, as in you can specify the program that will be run when the container starts.
 
Whatever you specify on the CMD instruction, in our case **app.py** will get appended to the ENTRYPOINT instruction, which is **python**.
 
So the command that will run when the container starts will be: 
 
```
docker run python app.py
 
```
That is the difference between CMD instruction and ENTRYPOINT instruction.
 
The last step is to build our **docker-compose.yml** file.
 
### Step 5 - Docker Compose
Docker Compose is a powerful tool that allows you to define and run multi-container Docker applications. You configure your application's services with docker compose using a YAML file.
 
If you need to setup complex application running multiple services, a better way to do it is to use docker compose.
 
With docker-compose, we can create a configuration file in YAML format called docker-compose.yml and put together the different services and the options specific to running them in YAML file
 
Then we can simply run a docker compose up command like the one below to bring out the entire application stack.
 
It is easier to implement, run and maintain as all changes are always stored in the docker compose configuration file.
```
docker compose up
```
 
We're only going to talk about some of its basics in this guide, but you can read more about it [here](https://docs.docker.com/compose/) to get a better understanding of how it works, its features, options, and versions.
 
Open the docker-compose.yml file created and add the following:
 
**docker-compose.yml**
```
version: "3.7"
 
services:
  helloworld:
    build:
      context: ./
    ports:
      - 5000:5000  
      
```
Let's quickly have an overview of what we have above.
 
Every **docker-compose.yml** file must start with the version you are intending to use except when using version 1.You must specify the version at the top of the file, in this case **version:3.7** then followed by the applicaton services we want to build using **services:** and put all services underneath it, in our case its our flask application with **helloworld**.
 
 Then let’s have an overview of other options in our **docker-compose** file
* build: ./ - This specifies the location of the directory which contains the dockerfile with instruction to build a docker image. In our case, it is the root directory.
* ports: This will enable us to access our application on the browser.  
 
 
 
Now let’s go into our terminal. We're going to build and test our app.
 
### Step 5 - Building and Testing
To build the services, run the following command in the same directory as **docker-compose.yml**:
```
docker-compose up
```
The command below also does the same job like the one above:
```
docker-compose up --build
```
You'll notice we didn’t have to pass a filename to the command. Compose will look in the current directory for a docker-compose.yml file to build.
 
In your web browser enter http://localhost:5000/ to see your Flask app in action. You should see:
```
Flask Dockerized!
```
To stop the service, hit **Ctrl + c**.
 
### Step 6 - Docker Compose Commands
 
**docker-compose** comes with quite a large number of commands and options which can be found by running:
```
docker-compose
```
Run the following to list any running images:
```
docker-compose images
```

 
**docker-compose ps** will list any running containers:
```
docker-compose ps
```
 
To stop our services enter:
```
docker-compose stop
```
### Step 10 - Making Changes
If you make any changes to the application, you'll need to rebuild the images using the following command:
```
docker-compose up --build
```
 
Once your application is running fine on the development server, you can test it locally by building the services with Docker Compose.
 
### Conclusion
This guide served as an introduction to building a simple flask application and using dockerfile and docker compose to build our image and hence containerizing our application.
 
