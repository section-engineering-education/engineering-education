---
layout: engineering-education
status: publish
published: true
url: /how-to-containerize-a-python-application/
title: How to Containerize a Python Application
description: This article will guide you on how to build a simple Flask application and containerize it using Docker Compose.
author: emmanuel-alege
date: 2021-06-24T00:00:00-09:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-containerize-a-python-application/hero.jpg
    alt: How to Containerize a Python Application
---
[Docker](https://www.docker.com/) is among one of the most popular containerization technologies around. It allows you to package an application together with all of its dependencies into a single, compact, and isolated container. This process is known as containerization.
<!--more-->
### Why containerizing an app is important
A small difference in the version of an external library can change the functionality of your application, thus, causing it to behave differently. Therefore, containerizing an app allows it to execute in the same way regardless of the workspace or computer that it is deployed on.
 
The beauty of Docker is that if you containerize your application and transfer the image to your colleague's computer, you can be sure that the application will have the same performance on both devices. This is because the container includes all the application's dependencies.
 
### Images and containers
Docker files, which are read-only templates, are used to create containers. Therefore, images and containers are inextricably linked, and both are required to run the Docker software platform. For more information on Docker images, visit this [page](/engineering-education/search/?q=docker).
 
### Goal
In this article, you will learn how to build a simple Python application using Flask and Docker Compose. Docker Compose helps to manage containers and other related services.
 
### Prerequisites 
- Basic understanding of Python and Flask.
- Basic understanding of the command line.
- A code editor (IDE) such as VS Code or Pycharm.
 
Install Docker and Docker Compose via the links below:
- [Docker](www.docker.com) 
- [Docker Compose](https://docs.docker.com/compose/)
 
### Step 1 - Application structure 
Our application will look like this at the end:
 
```bash
    |---- docker-compose.yml
    |---- app
           |---- app.py
    |---- requirements.txt
```
    
Using our command line, we'll make a new folder for our application named `docker`.
 
Go to your command prompt and input the line below. 

You can use the integrated command line in your IDE.
 
```bash
mkdir docker && cd docker
```

Next, we will create our `Docker Compose` file in the `docker` directory that we created above.

```bash
touch docker-compose.yml
```

Our project's structure should now look like this.

```bash
docker
 |---- docker-compose.yml
```  

Before we go further, let's develop our `Flask` application.
 
### Step 2 - Building our Flask app
Flask is a lightweight Python framework used for building web applications. In this tutorial, we will create a Flask web application that displays a 'Flask Dockerized' message on the browser.

Create a new folder called `flask` and run the command below to open it.

```bash
cd flask
```

Within the `flask` directory, create a new folder and call it `app`. Inside the `app` directory, create an `app.py` file. We will write the code for our Flask application in this file.

Here is the code for our simple Flask application.
 
#### app.py

```py
from flask import Flask # importing the flask class
app = Flask(__name__) # creating an instance of the Flask class
 
@app.route('/') # The primary url for our application
def hello_world(): # This method returns 'Flask Dockerized', which is displayed in our browser.
    return 'Flask Dockerized'
 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') # This statement starts the server on your local machine.
```

### Step 3 - Outlining key requirements
In this step, we need to create a `requirements.txt` file. It contains the dependencies or packages required to run our application.

To create this file, we'll use the command below.

```bash
pip freeze > requirements.txt
```

When you open the `requirements.txt` file, you should see the following lines:

```bash
  click==8.0.1
  colorama==0.4.4
  Flask==2.0.1
  itsdangerous==2.0.1
  Jinja2==3.0.1
  MarkupSafe==2.0.1
  Werkzeug==2.0.1
```

### Step 4 - Creating a Dockerfile
A Dockerfile is used to create an image for our application. This image will run on any host or environment with `Docker` installed. Our web application can, therefore, be deployed everywhere using an image. 

> Note that a Dockerfile is generated for every image. In this tutorial, we will only be building one image for our Flask application.
 
```bash
touch Dockerfile
```

We need to include the following instructions and arguments in the generated Dockerfile.
 
#### Dockerfile

```bash
FROM python:3.8
 
WORKDIR /app
COPY . /app
 
RUN pip install -r requirements.txt
 
ENTRYPOINT ["python"]
CMD ["app.py"]
``` 

The above `Dockerfile` contains the commands needed to assemble our image. 
 
Let’s have an overview of whats in our `Dockerfile`:

- `FROM python:3.8` - A Dockerfile must start with a `FROM` instruction with an argument that has another image. The `FROM` instruction pulls the python:3.8 image.

- `WORKDIR /app` - It is similar to the `cd command`. It sets our working directory as `/app`. This will be the root of our container. It runs any instruction that follows it in the Dockerfile such as `COPY`, `RUN`, `ADD`, `CMD`, or `ENTRYPOINT`. 

- `COPY  . /app` - This command copies files from the local system onto the Docker image. In our case, it will copy files from the current folder denoted with `.` to the  `/app` directory.

- `RUN pip install -r requirements.txt` - This command installs all dependencies or packages defined in our `requirements.txt` file.

- `ENTRYPOINT ["python"]` - This command is executed when the image is run as a container.

- `CMD ["app.py"]` - This command specifies the program or file that will be executed when the container initializes.
 
- `ENTRYPOINT` is similar to the CMD instruction in that it allows you to define the application that will run once the container starts. Whatever you include in the `CMD`, in our case `app.py` will get appended to the `ENTRYPOINT` instruction, which is `python`.
 
Here is the command that is executed when the container is launched:
 
```bash
docker run python app.py
```

The last step is to build our `docker-compose.yml` file.
 
### Step 5 - Docker Compose
Docker Compose is a powerful technique used for developing and running multi-container Docker applications. You can configure your application's services with Docker Compose using a `YAML` file.
 
Docker Compose is the best way to set up a complex application running multiple services. All we need is to create a `docker-compose.yaml` file and specify the required services. 

We can then run a Docker Compose command to build the application stack using the code below. You can visit this [link](https://docs.docker.com/compose/) to learn more about Docker Compose.

```bash
docker compose up
```

Open the `docker-compose.yml` file we created and then add the following services:
 
#### docker-compose.yml
```bash
version: "3.7"
 
services:
  helloworld:
    build:
      context: ./
    ports:
      - 5000:5000  
      
```

Let's quickly have an overview of the above commands.
 
- Each `docker-compose.yml` file must start with the `version` that you are intending to use except when using `version 1`. The version must be specified at the top of the file, in this case, `version: "3.7"`. We also need to outline the application's services in the `services section`, as shown above.

- The `build: ./` option specifies the location of the directory which contains the Dockerfile. In our case, the file is in the root folder.

- The `ports` option enables us to access our application on the browser via the defined ports (5000:5000).  
 
### Step 5 - Building and testing
Run the command below in the same folder that contains **docker-compose.yml**: 

```bash
docker-compose up
```
The above command displays the output  of each container. 

This can also be achieved using the following command:

```bash
docker-compose up --build
```

There is no need to specify a file name when using the above commands. Docker Compose should check for a **docker-compose.yml** file inside the current working folder.
 
You can navigate to `http://localhost:5000/` to access your Flask web application. 

A `Flask Dockerized` message should be displayed in your browser:

On Windows, use `Ctrl + c` to stop the Docker service.
 
### Step 6 - Docker Compose commands
You can view all Docker Compose commands and parameters by executing the command below:

```bash
docker-compose
```

To list any running images, use the `docker-compose images` command:

`docker-compose ps` command will list any running containers. We can stop all services using `docker-compose stop`.

If you make any changes to the application, you'll need to rebuild the images using the `docker-compose up --build` command.

### Conclusion
This guide served as an introduction to build a simple Flask application and containerizing it using a Dockerfile and Docker Compose. 

You can now use this knowledge to build and containerize more powerful applications.

Happy coding!

### Further resources
- [Docker Info](stackify.com/docker-image-vs-container-everything-you-need-to-know/amp/).
 

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)