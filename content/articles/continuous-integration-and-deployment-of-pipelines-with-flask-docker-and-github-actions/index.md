### Introduction
DevOps is practices or stages that every application will go through before and after deployment in the industry. 
It ensures both continuous integration and deployment of the application, by allowing a series of updates in the code repository.

GitHub Actions is an automation tool provided by Github that makes continuous integration very smooth and easier. In this article, we will experience building an interactive application
Docker packages applications into images and stores them as containers with their configurations defined in the `DockerFile`. 

### Table of Contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Development and Operations Overview](#define-the-stages-of-devOps-pipelines)
- [Clone a Flask Application](#clone-a-flask-application)
- [CI and CD Pipelines Architecture](#ci-cd-pipelines-architecture)
- [Continuous Integration and deployment with Github Actions](#continuous-integration-and-deployment-with-github-actions)
- [Docker Images and Containers Basics](#docker-images-and-container-basics)
- [Conclusion](#conclusion)


### Prerequisites
To follow along with this tutorial with ease, one should meet the following requirements.
- Have a basic understanding of git repository and programming languages like Python.
- A pre-installed [Python](https://www.python.org/downloads/)
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- A basic understanding of [Docker](https://www.docker.com/products/docker-desktop).
- Docker Hub Account [Docker Hub](https://hub.docker.com/)
- A basic understanding of [Flask](https://flask.palletsprojects.com/en/2.0.x/).


### Objectives
In this tutorial, we will be learning the continuous integration and deployment with docker, selenium, and GitHub actions. You will learn the following and apply them to the project;

-  Development and Operations Overview
-  Clone a Flask Application
-  CI and CD Pipelines Architecture
-  Continuous Integration and deployment with Github Actions
-  Docker Images and Containers Basics 

#### Development and Operations Overview
There are different stages involved in building pipelines from development to production. These are the defined development and operations pipelines in the industry. The picture below describes all the pre-defined;


Every industry begins the development of application with the following set of practices;
-  `Plan`
Without a proper plan, no one can successfully develop an application. An adequate plan must be put in place before embarking on the journey of development. This is the stage where the justifications shall be given to tech stacks and other things required.
 
-  `Code`
Developers embark on the coding part after the requirements have been set in stage one. They will work on the application by collaborating through a single source of a repository. 

-  `Build`
In this stage, the application developed shall be packaged and built into images using their choice of a package manager like `Docker`. The application will also be shipped into containers with the configurations file required for its start-up.

- `Test`
A Series of tests will run through the application for better performance. Tests like `unit`, `integrating` etc will be conducted during development.

Other tests can be accomplished by the testers and quality assurance engineers. Several tools are capable of doing this but the most popular is `Selenium`. Other stages are done by the operation team and they are as follows;

-  `Release`
This is where the stage of continuous integration begins. This stage will be repeated countless times whenever there is any update in the application. The popular tools used for this in the industry are `Jenkins`, `GitHub Actions`, `Team City`, and more. 

-  `Deploy`
An application that passed the continuous integration stage will proceed to the deployment stage. Staging will be the first thing here before deployment using tools like `Ansible`, `Puppet` or `Chef`. 

-  `Operate` 
The deployment will begin fully in this stage using tools like `terraform` etc. The refined application will then be deployed and its operations will be monitored. 

-  `Monitor`
The deployed application will be monitored in terms of performance. Logs will be generated while it's been monitored.

Above are the practices that applications undergo in the industry. A skilled person in terms of all these is said to be a `DevOps Engineer`.


### Clone a Flask Application
You are required to clone a Flask application in this [repository](https://github.com/Horlawhumy-dev/flask-drinksapi). This contains a simple Flask API that we will work on within this tutorial. The following are the set of commands that will walk you through the cloning.

```git
$ git clone git@github.com:Horlawhumy-dev/flask-drinksapi.git
$ cd flask-drinksapi
$ source venv/Scripts/activate
$ pip install -r requirements.txt
$ python3 app.python
```

Following these commands, you used the first one to clone from the remote repository into your local computer. Then you change the directory into the folder cloned with the following command. 

Every python application needs a `virtual environment` in order to activate the dependency. Inside the folder cloned, there is a folder `venv` that contains the environment and you used the third command to activate it.

Furthermore, you installed the dependencies inside the `requirements.txt` file. You then start the server with the last command on the snippet above.


### CI and CD Pipelines Architecture
The continuous integration and deployment of pipelines are software development practices used in the industry to develop and maintain every application. 

Developing applications from the ground up requires so many practices and keeping track of every change in order not to break the already deployed application.

Then the continuous integration server is going to trigger the automated build test job. This is to check whether the pushed code is reliable or not. If the code is reliable, then it will be integrated, built, and sent to the deployment server. Successful notifications will be sent too and this is referred to as automation.

If otherwise, the pushed codes fail to build, another notification will be sent. So that the developer can fix the bugs and then re-commit the code. The continuous integration tool will then start building the code again. This is the reason why the continuous integration and deployment stages are still considered a `waterfall` model.


### Continuous Integration with Github Actions
Github Actions automate the build process whenever there is a push to the code repository. This helps to reduce the problem of a manual building of the jobs and always notify if the build is not complete. This

This follows a workflow using a different language package file. In this tutorial, we cloned a Python application built with the Flask framework. Therefore, the workflow that we are going to define will be for the Python package.

Navigate to [Project](https://github.com/Horlawhumy-dev/flask-drinksapi), click on the `action` link, and then you should receive the image below.

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


### Docker Images and Containers Basics
In the past, the default way to deploy applications was to spin up a `virtual machine`. This copies the necessary binaries' artifact and the execution in the background. 

In essence, a virtual machine is composed of a host operating system with the sets of default packages installed. The application will use the operating system files and resources to run successfully.

Additionally, the virtual machine provides the benefits of infrastructure through the `hypervisor`. This hypervisor allows many virtual machines to run and is also used to create them on the operating system.

However, the trade-off behind is the replication of the operating system. The more virtual machines run, the higher the space consumed in the host operating system. To optimize the backlog of this concept, the industry introduced the containerization of applications.

Containers are the lightweight and reliable technique to deliver a product to consumers while having better use of available resources. Instead of having multiple virtual machines, we can have one hosting system that runs multiple containers. The processes in the containers are isolated and they have access to the file system with packages on the host operating system.

The creation and execution of the containers are delegated to a container management tool such as `Docker`. This OS-level virtualization unlocks the benefits of running multiple applications by using the containers.

In the following section, we would look at how to containerize applications using `Docker` and `Dockerfile` dependency. Create a `Dockerfile` inside the project folder and paste the docker commands below.

``` dockerfile
    FROM python:3.8
    WORKDIR /app
    COPY . .
    RUN pip install -r requirements.txt
    ENV PORT=80
```

Furthermore, We have to build the docker image and then push it to the docker hub for storage. But before that, create a new repository in the docker hub and that will store your docker image from the build actions.

You will add your docker hub account details to the GitHub secrets. You can do that by going to your GitHub account, clicking on the `settings` button, and tapping the `secrets`. Add the following to the name and values;

``` 
DOCKER_USERNAME: <whatever-your-username>
DOCKER_PASSWORD: <your-password>
DOCKER_HUB: <whatever-your-username>/<your-repository>
```

Having done all the steps above, navigate to the Github repository for the application, edit the workflow with the codes below. This will build the docker image and send it to your docker hub repository.

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
