---
layout: engineering-education
status: publish
published: true
url: /running-ubuntu-os-and-containerizing-python-application-on-windows-powershell-core/
title: Running Ubuntu Machine and Containerizing Python Application on Windows Powershell Core
description: This article will help the reader understand how to run Ubuntu Docker Machine and containerize Python applications on Windows Powershell Core.
author: arafat-olayiwola
date: 2022-05-25T00:00:00-04:20
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/running-ubuntu-os-and-containerizing-python-application-on-windows-powershell-core/hero.png
    alt: Running Ubuntu Machine and Containerizing Python Application on Windows Powershell Core
---
Before containers came into the picture, developers used to worry about operating system differences while testing applications. 
<!--more-->
Additionally, the operations team used to worry about application libraries before running on different platforms. 

Ubuntu is one of the major Linux distros. It is required to run containers in both development and production. In this tutorial, we will walk through the steps of running the Ubuntu machine on Windows.

### Table of contents
-[Prerequisites] (#prerequisites)
- [Objectives](#objectives)
- [Setting up the Ubuntu OS on Windows Powershell Core through Docker containers](#setting-up-the-ubuntu-os-on-windows-powershell-core-through-docker-containers)
- [Guide to containerizing Python Flask application](#guide-to-containerizing-python-flask-application)
  - [Making the flask application](#making-the-flask-application)
  - [Containerizing the application](#containerizing-the-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need:
- An understanding of the Windows PowerShell commands.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- A pre-installed [Powershell core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2).
- [Python](https://python.org) installed.
- An understanding of [Docker](https://docs.docker.com/get-docker/).

### Objectives
In this tutorial, you will learn how to set up the Ubuntu operating system on Windows. In addition, you will learn and apply the following to your project.

- Setting up the Ubuntu OS on Windows Powershell Core using Docker containers.
- Guide to containerizing Python Flask application

### Setting up the Ubuntu OS on Windows Powershell Core using Docker containers
Different operating system configurations play a major role in the application testing environment. This is due to the dependencies required by applications.

A change in the operating environment can affect an app's behaviour and performance. Setting up the Linux environment on Windows can be done in multiple ways. 

In this article, we will discuss the major way to use the Ubuntu distro container.

Open up the Windows Powershell, and check for the Docker version installed using the command below:

```bash
docker --version
```

First, you will download the Ubuntu Docker image from the container registry. Docker engine will pull down this image to your local machine.

Next, you will run the Ubuntu container from the downloaded image. Paste the following commands into the Powershell environment:

```bash
docker pull ubuntu
docker run -i -t ubuntu /bin/bash
```

In addition, the Ubuntu virtual machine will start globally inside the directory `/bin/bash`. Therefore, before you begin executing Linux commands, ensure that you update the packages by pasting the code below:

```bash
apt-get update
```

### Guide to containerizing Python Flask application
Application containerization is widely adopted because it helps in packaging appropriate dependencies.  An app, therefore, runs without any extra configuration in any environment with Docker installed. 

The most widely used containerization platform is `Docker`. It solves the problem of operating system differences due to the various dependencies needed by the newly made application. 

To containerize an application, we need to be familiar with the following terms:

- Dockerfile - This file is required to build the application image on top of the pre-built image of the language used. 

- Image - A `Docker Image` is the snapshot of the application built from a `Dockerfile`. It keeps track of dependencies needed and commands to run the application. This image is reused by storing it in the registry.

- Containers - A container runs sets of application docker images with the dependency packages. It contains all the required pieces of information required by the application to run both locally and in production.

- Container Registry - It is the hub that stores different sets of images for future reference. All built-in images are well documented and stored in the registry.

#### Making the Flask application
Having introduced the above terms, we can now begin to containerize a Python application. In this project, we will make a Flask `drinks` API endpoints that return mock data.

To get started, we need to prepare our virtual environment with the following syntaxes:

```bash
mkdir drinksapi
cd drinksapi
python -m venv env
source env/Scripts/activate 
```

You will install the dependencies for the application in the project. Then, you will make the `requirements.txt` file to track the application dependencies.

```py
pip install flask
touch requirements.txt
touch app.py
pip freeze > requirements.txt
code . 
```

> Note: The `code .` command opens the current directory in the Visual Studio Code editor.

Add the following code to the `app.py` file:

```py
from flask import Flask
from datetime import datetime
app = Flask(__name__)

data = {
    "drinks": [
        {
            "name": "Grape", 
            "description": "Delicious grape fruit drink",
            "date": datetime.now()
            },
            {
            "name": "Lemon", 
            "description": "Undiluted lemon fruit drink",
            "date": datetime.now()
            },
            {
            "name": "Mango", 
            "description": "This is a mango fruit",
            "date": datetime.now()
            }
    ]
} 

@app.route("/")
def index():
        return "Welcome To My Drink API!"
        
@app.route("/api/v0/drinks")
def get_drinks():
    return data
    

if __name__ == "__main__":
    app.debug = True
    app.run()
```

In the above code, there are just two endpoints `/` and `/api/v0/drinks`. The first one routes to the home page while the other returns the *drinks* data. 

We save the code and run the app using the following command:

```bash
python app.py
```

The command above will start the Flask server locally and respond to the requests coming from the endpoints.

> Note: Open the browser to `localhost:8000/api/v0/drinks` to access the retrieved data.


##### Containerizing the application
The first step is to make a Dockerfile, then build the image from the file, and run the container from it. Make a `Dockerfile` in the current working directory, and paste the code below:

```Dockerfile
FROM python:3.7
WORKDIR /app
COPY .  .
RUN pip install -r requirements.txt
ENV PORT=80
```

The application image is on top of the `Python:3.7` pre-built image. Then you copied the current working directory into the existing image directory. Also, the running container will install the requirements and expose the application to the port of 80.

Now you need to build the application `image` from the Dockerfile. This is achieved using the `docker build` command with the' latest-image' tag. 

```bash
docker build -t latest-image .
```

> Note that the period `.` indicates that Dockerfile exists in the global working directory.

The next thing is to start the application container. This container contains the built image and the application dependencies, which will start running in the background with the following command:

```bash
docker run -p 8000:80 latest-image
```

Every request to `localhost:8000` is forwarded to the container port, and the application displays the index page. The container detects the type of image for a specific request using both the *port* and *tag*.

### Conclusion
In this tutorial, we set up Ubuntu on Windows Powershell using the Docker image. Running the operating system in that process will require less memory and disk space than the virtual machine on the host hardware.

We also discussed the four basic terms in the container world, as well as walked through the steps of containerizing a Python Flask application. 

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)