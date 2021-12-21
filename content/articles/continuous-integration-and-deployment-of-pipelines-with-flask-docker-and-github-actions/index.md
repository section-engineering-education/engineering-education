### Introduction
DevOps is practices or stages that every application will go through before and after deployment in the industry. It ensures both continuous integration and deployment of the application, by allowing a series of updates to the code repository.

The CI and CD pipelines are the set of practices used in the industry to develop and maintain every deployed application. Developing applications from the ground up requires so many practices and keeping track of every change in order not to break the already deployed application in the production.

GitHub Actions is an automation tool provided by Github that makes continuous integration very smooth and easier. Applications' docker containers are packaged into the swarm.

In this article, we will experience building an interactive application.

Docker packages applications into images and stores them as containers with their configurations defined in the `DockerFile`.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Development and operations overview](#development-and-operations-overview)
- [Setting a Flask Project](#setting-a-flask-project)
- [CI and CD Pipelines Architecture](#ci-and-cd-pipelines-architecture)
- [Continuous Integration and deployment with Github Actions](#continuous-integration-and-deployment-with-github-actions)
- [Docker Images and Containers Basics](#docker-images-and-containers-basics)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, one should meet the following requirements.
- An understanding of a GitHub repository and the Python programming language.
- [Python](https://www.python.org/downloads/) installed.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- An understanding of [Docker](https://www.docker.com/products/docker-desktop).
- Docker Hub Account [Docker Hub](https://hub.docker.com/)
- An understanding of [Flask](https://flask.palletsprojects.com/en/2.0.x/).

### Objectives
In this tutorial, we will be learning the continuous integration and deployment with Docker, selenium, and GitHub actions. You will learn the following and apply them to the project:

-  Development and operations overview.
-  Cloning a Flask application.
-  CI and CD Pipelines architecture.
-  Continuous Integration and deployment with Github Actions.
-  Docker images and container basics.

#### Development and operations overview
There are different stages involved in building pipelines from development to production. These are the defined development and operations pipelines in the industry.

The picture below describes all the pre-defined stages.

![DevOps Stages](/continuous-integration-and-deployment-of-pipelines-with-flask-docker-and-github-actions/stages.png)

Every industry begins the development of applications with the following set of practices:

#### Plan
Without a proper plan, no one can successfully develop an application. An adequate plan must be put in place before embarking on the journey of development. This is the stage where the justifications shall be given to tech stacks and other things required.
 
#### Code
Developers embark on the coding part after the requirements have been set in stage one. They will work on the application by collaborating through a single source of a repository. 

#### Build
In this stage, the application developed shall be packaged and built into images using their choice of a package manager like Docker. The application will also be shipped into containers with the configurations file required for its start-up.

#### Test
A Series of tests will run through the application for better performance. Tests like `unit`, `integrating` etc will be conducted during development.

Other tests can be accomplished by the testers and quality assurance engineers. Several tools are capable of doing this but the most popular is Selenium. Other stages are done by the operation team and they are as follows:

##### 1. Release
This is where the stage of continuous integration begins. This stage will be repeated countless times whenever there is any update in the application. The popular tools used for this in the industry are Jenkins, GitHub Actions, Team City, and more.

##### 2. Deploy
An application that passed the continuous integration stage will proceed to the deployment stage. Staging will be the first thing here before deployment using tools like Ansible, Puppet or Chef.

##### 3. Operate
The deployment will begin fully in this stage using tools like Terraform etc. The refined application will then be deployed and its operations will be monitored. 

##### 4. Monitor
The deployed application will be monitored in terms of performance. Logs will be generated while it's been monitored.

Above are the practices that applications undergo in the industry. A skilled person in terms of all these is said to be a DevOps Engineer.

### Setting a Flask Project
Open your favorite code editor and navigate to the terminal. Type the following snippets to setup your project workflow;

```bash
cd ~/Desktop
mkdir flaskdrinks
cd flaskdrinks
python3 -m venv env
source env/Scripts/activate
pip install flask
pip freeze > requirements.txt
```
You changed directory to `Desktop` and then made a new directory called `flaskdrinks`. Every python application requires a virtual environment with `env` being the file for this project.

Furthermore, you installed flask dependency with the python package manager called `pip`. You also tracked the dependencies with a file called `requirements.txt`.

Create a file called `app.py` and paste the code snippets below;

```python
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
        return "Welcome To My Drinks API"
        
@app.route('/drinks')
def get_drinks():
    return data
    

if __name__ == "__main__":
    app.debug = True
    app.run()
```

Now start the server with the command `python app.py` in the terminal. Open your browser to the root domain and confirm the `welcome message`. You can also route to `/drinks` and get the `API` data.


### CI and CD Pipelines Architecture
The continuous integration and deployment of pipelines are software development practices used in the industry to develop and maintain every application. 

Developing applications from the ground up requires so many practices and keeping track of every change in order not to break the already deployed application.

The continuous integration server is going to trigger the automated build test job. This is to check whether the pushed code is reliable or not. If the code is reliable, then it will be integrated, built, and sent to the deployment server. Successful notifications will be sent too and this is referred to as automation.

If otherwise, the pushed codes fail to build, another notification will be sent. So that the developer can fix the bugs and then re-commit the code. The continuous integration tool will then start building the code again. This is the reason why the continuous integration and deployment stages are still considered a waterfall model.

### Continuous integration and deployment with Github Actions
Github Actions automates the build process whenever there is a push to the code repository. This helps to reduce the problem of a manual building of the jobs and always notify if the build is not complete. This

This follows a workflow using a different language package file. Earlier, we cloned a Python application built with the Flask framework. Therefore, the workflow that we are going to define will be for the Python package.

Navigate to [project](https://github.com/Horlawhumy-dev/flask-drinksapi), click on the `action` link, and then you should receive the image below.

![Python Package](/continuous-integration-and-deployment-of-pipelines-with-flask-docker-and-github-actions/package.png)

Now select the `Publish Python Package` and click on the `Set up this workflow`. You will then be redirected to the `python-publish.yml` editing page. Inside the editor, paste the workflow below and tap on `start commit`.

```YAML
name: Python Package

on:
    push:
      branches: [ master ]

jobs:
    deploy:
       runs-on: ubuntu-latest
       strategy:
         fail-fast: false
         matrix:
            python-version: [3.8]
       steps:
        - uses: actions/checkout@master
        - name: Initialize Python 3.7
          uses: actions/setup-python@v1
          with:
            python-version: ${{matrix.python-version}}
        - name: Install dependencies
          run: |
            python -m pip install --upgrade pip
            pip install -r requirements.txt
```

Every workflow package defined for the Github action has three major steps globally. They are the `name`, `on` and `jobs`. The name defines the tag given to the whole process, and this can be anything as far as it is meaningful.

The `on` describes when the automation is going to start. According to the above workflow, at every code push into the repository, the actions will start building the code and then move on to the next step.

Now the `jobs` are what to do at every step. In this, we want to deploy on the `ubuntu-latest` machine.  Deploying the code requires the steps as defined. This step will run by installing some dependencies described, and on successful build, you have all the steps marked. Something like the image below;

![Successful Build](/continuous-integration-and-deployment-of-pipelines-with-flask-docker-and-github-actions/publish.png)

### Docker images and containers basics
In the past, the default way to deploy applications was to spin up a `virtual machine`. This copies the necessary binaries' artifact and the execution in the background. 

In essence, a virtual machine is composed of a host operating system with the sets of default packages installed. The application will use the operating system files and resources to run successfully.

Additionally, the virtual machine provides the benefits of infrastructure through the `hypervisor`. This hypervisor allows many virtual machines to run and is also used to create them on the operating system.

However, the trade-off behind is the replication of the operating system. The more virtual machines run, the higher the space consumed in the host operating system. To optimize the backlog of this concept, the industry introduced the containerization of applications.

Containers are the lightweight and reliable technique to deliver a product to consumers while having better use of available resources.

Instead of having multiple virtual machines, we can have one hosting system that runs multiple containers. The processes in the containers are isolated and they have access to the file system with packages on the host operating system.

The creation and execution of the containers are delegated to a container management tool such as `Docker`. This OS-level virtualization unlocks the benefits of running multiple applications by using the containers.

In the following section, we will look at how to containerize applications using Docker and the `Dockerfile` dependency. 

Create a `Dockerfile` inside the project folder and paste the docker commands below.

```dockerfile
FROM python:3.8
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENV PORT=80
```

Furthermore, We have to build the docker image and then push it to the docker hub for storage. But before that, create a new repository in Docker hub that will store your Docker image from the build actions.

You will add your Docker hub account details to the GitHub secrets. You can do that by going to your GitHub account, clicking on the `settings` button, and tapping the `secrets`.

Add the following to the name and values:

```yaml
DOCKER_USERNAME: <whatever-your-username>
DOCKER_PASSWORD: <your-password>
DOCKER_HUB: <whatever-your-username>/<your-repository>
```

Having done all the steps above, navigate to the Github repository for the application, edit the workflow with the codes below. This will build the docker image and send it to your docker hub repository.

```yaml
name: Python Package

on:
    push:
      branches: [ master ]

jobs:
    deploy:
       runs-on: ubuntu-latest
       strategy:
         fail-fast: false
         matrix:
            python-version: [3.8]
       steps:
        - uses: actions/checkout@master
        - name: Initialize Python 3.8
          uses: actions/setup-python@v1
          with:
            python-version: ${{matrix.python-version}}
        - name: Install dependencies
          run: |
            python -m pip install --upgrade pip
            pip install -r requirements.txt
        - name: Check docker installed or not
          run: docker run hello-world
        - name: Push to docker hub
          uses: docker/build-push-action/@v1
          with:
            username: ${{secrets.DOCKER_USERNAME}}
            password: ${{secrets.DOCKER_PASS}}
            repository: ${{secrets.DOCKERHUB_REPO}}
            tag_with_ref: true
```

Upon successful building of the docker image, you have something like the image below;

![Successful Docker image Build](/continuous-integration-and-deployment-of-pipelines-with-flask-docker-and-github-actions/dockerhub.png)

### Conclusion
In this tutorial, we saw the overview of DevOps and built an automated pipeline. We cloned already made project and configured its pipeline with Github actions. 
We went ahead to build its docker image through these Github actions and then pushed it to the docker hub for proper storage.

Thank you!
