### Introduction
DevOps is practices or stages that every application will go through before and after deployment in the industry. This ensures both continuous integration and deployment of the application, by allowing a series of updates in the code repository.

There are varieties of tools that can be used to automate these practices. All stages of DevOps will be defined in this tutorial. 

Docker packages applications into images and stores them as containers with their configurations defined in the `DockerFile`. These images are being managed with cloud build and container registry. These tools are the set of infrastructures given by the Google Cloud Platform.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Define the stages of DevOps pipelines](#define-the-stages-of-devOps-pipelines)
- [Create a Git Repository](#create-a-git-repository)
- [Create Python Application for Demo](#create-a-simple-python-application)
- [Test your Web Application in Cloud Shell](#test-your-web-application-in-cloud-shell)
- [Define a Docker build](#define-a-docker-build)
- [Manage Docker images with Cloud Build and Container Registry](#manage-docker-images-with-cloud-build-and-container-registry)
- [Automate builds with Triggers](#automate-builds-with-triggers)
- [Test your build changes](#test-your-build-changes)
- [Conclusion](#conclusion)


### Prerequisites
To follow along with this tutorial with ease, one should meet the following requirements.
- Have a basic understanding of git repository and programming languages like Python.
- A pre-installed [Python](https://www.python.org/downloads/)
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- A basic understanding of [Docker](https://www.docker.com/products/docker-desktop).
- A basic understanding of [Flask](https://flask.palletsprojects.com/en/2.0.x/).


### Objectives
In this tutorial, we will be learning how to automate DevOps pipelines using the cloud build. You will learn how to perform the following tasks;

1. Define the stages of DevOps pipelines 
2. Create a Git Repository
3. Create a Simple Python Application
4. Test your Web Application in Cloud Shell
5. Define a Docker build
6. Manage Docker images with Cloud Build and Container Registry
7. Automate builds with Triggers
8. Test your build changes


#### Define the stages of DevOps Pipelines 
There are different stages involved in building pipelines from development to production. These are defined development and operations pipelines in the industry. The picture below describes all the pre-defined;

![DevOps Stages](/devops-pipelines-automation-with-cloud-build-and-triggers/stages.png)

Every industry begins the development of application with the following set of practices;
1. `Plan`
Without a proper plan, no one can successfully develop an application. An adequate plan must be put in place before embarking on the journey of development. This is the stage where the justifications shall be given to tech stacks and other things required.
 
2. `Code`
Developers embark on the coding part after the requirements have been set in stage one. They will work on the application by collaborating through a single source of a repository. 

3. `Build`
In this stage, the application developed shall be packaged and built into images using their choice of a package manager like `Docker`. The application will also be shipped into containers with the configurations file required for its start-up.

4. `Test`
A Series of tests will run through the application for better performance. Tests like `unit`, `integrating` etc will be conducted during development.

Other tests can be accomplished by the testers and quality assurance engineers. Several tools are capable of doing this but the most popular is `Selenium`. Other stages are done by the operation team and they are as follows;

6. `Release`
This is where the stage of continuous integration begins. This stage will be repeated countless times whenever there is any update in the application. The popular tools used for this in the industry are `Jenkins`, `GitHub Actions`, `Team City`, and more. 

7. `Deploy`
An application that passed the continuous integration stage will proceed to the deployment stage. Staging will be the first thing here before deployment using tools like `Ansible`, `Puppet` or `Chef`. 

8. `Operate` 
The deployment will begin fully in this stage using tools like `terraform` etc. The refined application will then be deployed and its operations will be monitored. 

9. `Monitor`
The deployed application will be monitored in terms of performance. Logs will be generated while it's been monitored.

Above are the practices that applications undergo in the industry. A skilled person in terms of all these is said to be a `DevOps Engineer`. The

All of these stages aside the coding and planning parts can be done in the cloud.

In this tutorial, I am going to walk you through these pipelines by building a demo application. You will experience the development and operation part of `DevOps` architecture.  


#### Create a git repository

First, you will create a free trial account on the google cloud console. This free account will run through the span of a year with a sum of the amount for billing purposes. Click on the link below to the create account;

[Cloud Console](https://console.cloud.google.com/)

Having successfully created the account, you will be redirected to the dashboard page. This looks like the page in the image below;

![Dashboard](/devops-pipelines-automation-with-cloud-build-and-triggers/dashboard.png)

Before any resources can be consumed in the cloud, a project must be created. You can create the project by clicking on the dropdown menu in the navigation bar. Then tap on the `New Project` button inside the pop-up page.

Note that every project created is under an organization which is optional when creating the project. A project has both `name` and an `ID`, and such id is automatically assigned using the name provided.

Furthermore, we will make use of the cloud source repository provided. The cloud source repository is used to keep track of the code repository while in the cloud. This provides the same functionality with other platforms like 'Github', `Gitlab`, `Bitbucket`, and more.

Eventually, you will create a build trigger that starts a continuous integration pipeline when code is pushed to it. To create a repository in the source, follow the steps below;

1. In the cloud console menu, click `Source Repositories`.
2. Click on the button `Add repository`.
3. Select Create new repository and click Continue.
4. Name the repository `devops-repo`
5. Select your current project ID from the list.
6. Click Create.

The image below is the redirection page having created the repository.

Return to the Source Repositories page and refresh the repository to verify that your changes were uploaded.
7. Return to the Cloud console dashboard, and click `Activate Cloud Shell` (Cloud Shell) in the top menu bar.

For the first time, you would have to set your project in the shell using the following command.
```
gcloud config set project 
```
8. If prompted, click Continue.
9. Enter the following commands in Cloud Shell to create a folder called `learning-devops`, change the directory to it, and clone the empty repository created:

```bash
$ mkdir learning-devops
$ cd learning-devops
$ gcloud source repos clone devops-repo
```
Note:) The cloned repository can be seen in the `Source Repository` under the navigation menu.

#### Create Python Application for Demo
We will create a Flask application for demonstration. The application will be good enough to test the pipeline that you are going to build. Below are the set of instructions for the application;

1. In the Cloud Shell, click `Open Editor` to open the code editor.
2. Select the `learning-devops > devops-repo` folder in the explorer tree on the left.
3. On the File menu, click `New File` and name the file `main.py`
4. Paste the following into the file you just created:

```Flask
from flask import Flask, render_template, request
app = Flask(__name__)
@app.route("/")
def main():
    model = {"title": "Hello DevOps Fans."}
    return render_template('index.html', model=model)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True, threaded=True)
```
5. Save your changes.
6. Right-click on the devops-repo folder and add a new folder called templates.
7. In that folder, add a new file called `layout.html`.
8. Add the following code and save the file as you did before:

```HTML
<!doctype html>
<html lang="en">
<head>
    <title>{{model.title}}</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        {% block content %}{% endblock %}
        <footer></footer>
    </div>
</body>
</html>
```

9. Also in the templates folder, add another new file called `index.html`.
10. Add the following code and save the file as you did before:

```HTML
{% extends "layout.html" %}
{% block content %}
<div class="jumbotron">
    <div class="container">
        <h1>{{model.title}}</h1>
    </div>
</div>
{% endblock %}
```
11. In Python, application prerequisites are managed using pip. Now you will add a file that lists the requirements for this application. In the `devops-repo` folder `not the templates folder`, create a file called `requirements.txt`.
12. Add and save the command below to that file.

```Flask
Flask==1.1.2
```
13. You have some files now, so save them to the repository. First, you need to add all the files you created to your local Git repo. In Cloud Shell, enter the following code:

```git
cd ~/learning-devops/devops-repo
 git add --all
```
14. To commit changes to the repository, you have to identify yourself. Enter the following commands, but with your information (you can just use your Gmail address or any other email address):

```git
git config -g user.email "you@example.com"
git config -g user.name "Your Name"
```
15. Now, commit the changes locally:

```git
git commit -a -m "Initial Commit"
```
16. You committed the changes locally, but have not updated the Git repository you created in Cloud Source Repositories. Enter the following command to push your changes to the cloud:

```git
git push origin master
```
Note:) Refresh the Source Repositories web page. You would see the files created.


#### Test your web application in the Cloud Shell
You need to make sure the code works. It can be tested using Cloud Shell. The following are the steps for testing with the shell;

1. Back in Cloud Shell, make sure you are in your application's root folder, and then install the Flask framework using pip:

```
cd ~/learning-devops/devops-repo
sudo pip3 install -r requirements.txt
```
2. To run the program, type:

```
python3 main.py
```
Note:} The program is configured to run on port 8080. You can see this if you look at the main.py file. At the bottom, when the app server runs, the port is set.

3. To see the program running, click `Web Preview` in the toolbar of Cloud Shell. Then, click `Preview on port 8080`. The program would be displayed in a new browser tab.

![Result of deployment](/devops-pipelines-automation-with-cloud-build-and-triggers/result1.png)

4. To stop the program, return to the Cloud Console and press Ctrl+C in Cloud Shell.
5. In the code editor, expand the `learning-devops/devops-repo` folder in the explorer pane on the left. Then, click main.py to open it.
6. In the main() function, change the title to something else (whatever you want), as shown below.

```Flask
@app.route("/")
def main():
    model={"title": "Whatever you want."}
    return render_template('index.html', model=model)
```

7. On the Code Editor toolbar, on the File menu, click Save to save your change.
8. In the Cloud Shell window at the bottom, commit your changes using the following commands:

```
cd ~/gcp-course/devops-repo
git commit -a -m "Second Commit"
```

9. Push your changes to the cloud using the following command:

```
git push origin master
```

10. Return to the Source Repositories page and refresh the repository to verify that your changes were uploaded.


#### Define a Docker Build
The first step to using Docker is to create a file called `DockerFile`. This file defines how a Docker container is constructed. It also described the various dependencies required by the application before it starts working locally.

The following are the set of commands required by our flask application inside the DockerFile;

1. In the Cloud shell code editor, expand the `learning-devops/devops-repo` folder.  Click on `New File` and the name it `DockerFile`. 
2. At the top of the file, enter the following;

```
FROM python:3.7
```
This is the base image. You could choose many base images. In this case, you are using one with Python already installed on it.
3. Enter the following:

```
WORKDIR /app
COPY . .
```
These lines copy the source code from the current folder into the `/app` folder in the container image.
4. Enter the following:

```
RUN pip install gunicorn 
RUN pip install -r requirements.txt
```
This uses the `pip` package manager to install the requirements of the Python application into the container. Gunicorn is a Python web server that will be used to run the web app.
5. Enter the following:

```
ENV PORT=80
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 main:app
```
The environment variable sets the port that the application will run on `in this case, 80`. The last line runs the web app using the gunicorn web server.
6. Verify that the completed file looks as follows and save it:

``` Docker
    FROM python:3.7
    WORKDIR /app
    COPY . .
    RUN pip install gunicorn 
    RUN pip install -r requirements.txt
    ENV PORT=80
    CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 main:app
```


#### Manage Docker images with Cloud Build and Container Registry
The Docker image would be created and store in the registry. This image would be wrapped up with the start-up commands in the container.

The Cloud build is the infrastructure provided by the Google cloud platform for building Docker images. While the Container Registry stores the images built and can be accessed from there. You will use Cloud Build and Container Registry.

Note:) The Docker image can also be stored in the Docker Hub and then be pulled from there.

1. Return to Cloud Shell. Make sure you are in the right folder:
```
cd ~/learning-devops/devops-repo
```
2. The Cloud Shell environment variable `DEVSHELL_PROJECT_ID` automatically has your current project ID stored. The project ID is required to store images in Container Registry. Enter the following command to view your project ID:
```
echo $DEVSHELL_PROJECT_ID
```
3. Enter the following command to use Cloud Build to build your image:
```
gcloud builds submit --tag gcr.io/$DEVSHELL_PROJECT_ID/devops-image:v0.1 .
```
Notice the environment variable in the command. The image will be stored in Container Registry.
4. If asked to enable Cloud Build in your project, type Yes. Wait for the build to complete successfully.

Note:) If you receive the error `INVALID_ARGUMENT: unable to resolve source` wait a few minutes and try again.
In Container Registry, the image name always begins with `gcr.io/`, followed by the project ID of the project you are working in, followed by the image name and version.
The period at the end of the command represents the path to the Dockerfile: in this case, the current directory.

5. Return the Cloud Console and on the Navigation menu, click Container Registry. Your image should be on the list.
6. Now navigate to the Cloud Build service, and your build should be listed in the history. You will now try running this image from a Compute Engine virtual machine.
7. Navigate to the Compute Engine service.
8. Click Create Instance to create a VM.
9. On the Create an instance page, specify the following, and leave the remaining settings as their defaults:
```
Property  - Value
Container -  Deploy a container image to this VM instance
Container image - gcr.io/<your-project-id-here>/devops-image:v0.1 (change the project ID where indicated)
Firewall  - Allow HTTP traffic
```
10. Click `Create`.
11. Once the VM starts, create a browser tab and request this new VM's external IP address. The program should work as before.
12. You will now save your changes to your Git repository. In Cloud Shell, enter the following to make sure you are in the right folder and add your new Dockerfile to Git:
```
cd ~/learning-devops/devops-repo
git add --all
```
13. Commit your changes locally:
```
git commit -am "Added Docker Support"
```
14. Push your changes to Cloud Source Repositories:
```
git push origin master
```
15. Return to Cloud Source Repositories and verify that your changes were added to source control.



#### Automate builds with Triggers
Here we will make some changes to the application and then automate the build using the `triggers`. This helps to update application versions.

1. On the menu, navigate to `Container Registry`. At this point, you should have a folder named `devops-image` with at least one container in it.
2. On the Navigation menu, click `Cloud Build`. The Build history page should open, and one or more builds should be in your history.
3. Click the `Triggers` link on the left and then click on the `Create trigger` button.
4. Name the trigger `devops-trigger`
5. Select your `devops-repo` Git repository.
6. Select `.*(any branch)` for the branch.
7. Choose `Dockerfile` for Build Configuration and select the default image.

Note:) The image below describes the way your build configurations will be.

![Configuration](/devops-pipelines-automation-with-cloud-build-and-triggers/automate.png)

8. Accept the rest of the defaults, and click `Create`.
9. To test the trigger, click `Run` and then `Run trigger`.
10. Click the `History` link and you should see a build running. Wait for the build to finish, and then click the link to it to see its details.
11. Scroll down and look at the logs. The output of the build here is what you would have seen if you were running it on your machine.
12. Return to the Container Registry service. You should see a new folder, `devops-repo`, with a new image in it.
13. Return to the Cloud Shell Code Editor. Find the file main.py in the `learning-devops/devops-repo` folder.
14. In the main() function, change the title property to `This is from build trigger.` as shown below:

```Flask
@app.route("/")
def main():
    model={"title": "This is from build trigger."}
    return render_template('index.html', model=model)
```
16. Commit the change with the following command:
```
cd ~/learning-devops/devops-repo
git commit -a -m "build trigger test
```
17. Enter the following to push your changes to Cloud Source Repositories:
```
git push origin master
```
18. Return to the Cloud Console and the Cloud Build service. You should see another build running.


#### Testing Build Changes
1. When the build completes, click on it to see its details. Under Execution Details, copy the image link, the format should be `gcr.io/<your-project-id>/devops-repoxx34345xx`.
2. Go to the Compute Engine service. As you did earlier, create a new virtual machine to test this image. Click on the box to deploy a container image to the virtual machine, and paste the copied image.
3. Select Allow HTTP traffic.
4. When the new machine is created, you can test your changes by requesting the virtual machine's external IP address in your browser. Your new message would be displayed.

Note:) You might have to wait a few minutes after the VM is created for the Docker container to start.


#### Conclusion
In this tutorial, you built a continuous integration pipeline using the Google Cloud tools Cloud Source Repositories, Cloud Build, build triggers and Container Registry.

Happy hacking!
