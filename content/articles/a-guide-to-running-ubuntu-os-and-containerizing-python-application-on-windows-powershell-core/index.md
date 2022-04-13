Before containers came into the picture, developers used to worry about operating system differences while testing an application developed on another operating system locally. Additionally, the operations team used to worry about application libraries before running on a different platform. 
!—more-->
Ubuntu is one of the major Linux distros widely used and required to run containers in both development and production.  You will be walking through the steps of running the Ubuntu machine on Windows.

Table of contents
-[Prerequisites] (# prerequisites)
- [Objectives](#objectives)
- [Setting up the Ubuntu OS on the Windows Powershell core through Docker containers](#setting-up-the-ubuntu-os-on-Windows-Powershell-core-through-Docker-containers)
- [Guide to containerising Python Flask application](#guide-to-containerising-python-flask-application)

### Prerequisites
To follow along with this tutorial, you are required to have the following:
- An understanding of the Windows PowerShell commands.
- A pre-installed IDE, preferably [Visual Studio Code] (https://code.visualstudio.com/download).
- A pre-installed [Powershell core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2).
- [Python](https://python.org) installed.
- An understanding of [Docker](https://docs.docker.com/get-docker/).

### Objectives
In this tutorial, you will be learning how to set up the ubuntu operating system on Windows.  In addition, you will learn and apply the following to your project.

1. Setting up the Ubuntu OS on Windows Powershell Core through Docker containers.
2. Guide to containerising Python Flask application


### Setting up the Ubuntu OS on Windows Powershell Core through Docker containers
Historically, different operating system configurations play a major role in the application testing environment. Due to dependencies required by applications, a change in environment when running affects its behaviour and performance of it. Setting up the Linux environment on Windows can be done in multiple ways. Here we will discuss the major way to use the ubuntu distro container.

Open up the Windows Powershell, and check for the docker version installed. 

```PowerShell
docker --version
```

First of all, you will download the Ubuntu docker image from the container registry. This image will be pulled down to your local machine.

Now you will run the ubuntu container from the downloaded image. Paste the following code snippet into the Powershell environment.

```PowerShell
 docker pull ubuntu
 docker run -i -t ubuntu /bin/bash
```

In addition, the Ubuntu virtual machine will start globally inside the directory `/bin/bash`. Before you start typing various Linux commands, ensure that you update the packages by pasting the below snippet.

```Linux
apt-get update
```

### Guide to containerising Python Flask application
Industrially, the concept of the containerizing application is widely adopted because it helps in packaging dependencies as required to start running an application.  In the past, developers used to worry about the operating system differences when starting an application developed on a different platform.

The most widely used containerization platform is the `Docker`. It solves the problem of operating system differences due to the various dependencies needed by the newly made application. To containerise an application, we need to be familiar with the following terms;

1. `Dockerfile`
    It is the file required to build the application image on top of the pre-built image of the language used. The file highlights step by step instructions required.

2. `Image`
    A `Docker Image` is the snapshot of the application built from a `Dockerfile` which keeps track of dependencies needed and commands to run the application. This image is always reused by storing it in the registry.

3. `Containers`
    A container runs sets of application docker images with the dependency packages. It contains all the required pieces of information as needed by the application to run both locally and in production.

4. `Container Registry`
    It is the hub that stores different sets of images for future reference. All built images are well documented and for reusability purposes in the registry.


#### Making the flask application
Having introduced the above terms, we can begin with the steps required to containerise a Python application. In this project, you will be making Flask `drinks` API endpoints that return all mock data.

Now open your editor and code along with me. To get started, we need to prepare our virtual environment with the following syntaxes.

```bash
mkdir drinksapi
cd drinksapi
python -m venv env
source env/Scripts/activate 
```

You will install the dependencies for the application in the project. You will make the `requirements.txt` file to track the application dependencies.

```py
pip install flask
touch requirements.txt
touch app.py
pip freeze > requirements.txt
code . 
```

- Note: The `code .` opens the current directory in the code editor.

Copy and paste the following snippets into the `app.py` file in the directory.

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

There are just two endpoints `/` and `/api/v0/drinks`. The first one routes to the home page while the other returns the drinks data. Now you save the code and run the app with the following command;

```bash
python app.py
```

The command above will start the Flask server locally and respond to the requests coming from the endpoints.

- Note: Open the browser to `localhost:8000/api/v0/drinks` to receive the data returned.


##### Containerising the application
Firstly, you will make the Dockerfile, build the image from the file, and run the container from it. 

Make a `Dockerfile` in the current working directory, and paste the snippet below.

```Dockerfile
FROM python:3.7
WORKDIR /app
COPY .  .
RUN pip install -r requirements.txt
ENV PORT=80
```

The application image is on top of the `Python:3.7` pre-built image. Then you copied the current working directory into the existing image directory. Also, the running container will install the requirements and expose the application to the port of 80.

Now you need to build the application `image` from the Dockerfile. This will be done through the `docker build` command with the tag `latest-image` provided. 

```docker
docker build -t latest-image .
```

- Note that the period `.` indicates that Dockerfile exists in the global working directory.

The next thing is to start the application container. This container contains the built image and the application dependencies, which will start running in the background with the following command:

```docker
docker run -p 8000:80 latest-image
```
Every request to `localhost:8000` is been forwarded to the container port and the application displays the index page. The container detects the type of image for a specific request using both the port and the tag.


### Conclusion
In this tutorial, we discussed the setting up of Ubuntu on Windows Powershell using the Docker image. Running the operating system in that process will require less memory and disk space than the virtual machine on the host hardware.

You learned the four basic terms in the container world. You also walked through the steps of containerizing a Python Flask application. 

Thanks for reading!!
