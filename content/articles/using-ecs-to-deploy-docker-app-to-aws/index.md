---
layout: engineering-education
status: publish
published: true
url: /using-ecs-to-deploy-docker-app-to-aws/
title: Using ECS to deploy a docker app to AWS
description: This article will cover deploying Docker containers to AWS using ECS. Docker is a software platform that allows you to create and deploy applications and services as containers. We use the Flask framework to build a simple application and deploy it via Docker.
author: victor-elvis
date: 2021-06-24T00:00:00-09:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-ecs-to-deploy-docker-app-to-aws/hero.jpg
    alt: AWS Docker image example
---
[Elastic Container Service (ECS)](https://searchaws.techtarget.com/definition/Amazon-EC2-Container-Service) is a cloud computing service provided by Amazon Web Services (AWS) to manage containers and allow developers to run applications in the Cloud without having to configure an environment for the code to run.
<!--more-->
ECS was developed by Amazon in response to the rise of containerization. ECS enables developers to easily use Docker containers for a wide range of activities from hosting to running complex microservices that require many containers.

[Docker](https://www.docker.com/products/docker-desktop) is a containerization technology that allows packaging of an application and its libraries into one so that the application can easily be run without the need to do further configurations.

[Amazon Web Services](https://aws.amazon.com/) (AWS) is a cloud computing platform for deploying and hosting web applications. Besides cloud services, AWS also provides distributed computing services. One of the services is Elastic Container Services (ECS).

### Goal
In this article, we will understand how to deploy a Docker-based application to Amazon Web Services using Elastic Container Service (ECS).

[Flask](https://flask.palletsprojects.com/en/2.0.x/) is a python framework for building web applications. We need Flask to create a small web project to deploy to AWS. I prefer flask for its simplicity and besides, it does not require any special tools to work with.

By the end of the tutorial, you will be able to understand how to create, dockerize and deploy a flask app.

### Prerequisites
You will need the following for the tutorial:
1. A text editor to create the flask application. I use [VSCode](https://code.visualstudio.com/Download).
2. A basic understanding of Python and Flask Framework.
3. [Docker](https://www.docker.com/products/docker-desktop) installed on your computer.
4. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed.
5. An AWS account. You call follow [this guide](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) to create one.

### Creating the flask app
To create the flask app, we need to install `flask`. In the directory of the project, run the command below:

```bash
pip install flask
```

Next, create two files, `requirements.txt` to hold the project libraries, and its dependencies, and `app.py`.

Add the following code to the `app.py` file:

```py
from flask import Flask, render_template
import flask
app = Flask(__name__)
# Index route
@app.route('/')
def index():
    return render_template('index.html')
    # We are telling flask to look for a file named index in the templates folder
    #then render it to the user interface. Note that by default flask looks for templates in a folder named templates.
if __name__ == '__main__':
    app.run(debug=True)
```

Create a folder named `templates` which contains the HTML files rendered on the webpage. In this folder, create a file named `index.html`, then add the snippets below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker | AWS Index</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
    <div class="jumbotron text-center">
        <h2>FLASK APP DEPLOYED TO AWS USING DOCKER</h4>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum officia asperiores impedit possimus quas 
        officiis expedita velit, at architecto iusto natus modi quaerat, nulla laboriosam atque odio amet debitis 
        et voluptas ea! Pariatur autem tempora placeat saepe doloribus minus ab maxime excepturi neque illo. Ratione,
        sapiente magnam? Perspiciatis, molestias nihil.</p>
    </div>
    </div>   
    </div> 
</body>
</html>
```

Now, let us run the flask app to see if it works. In the terminal, execute the command below:

```bash
set FLASK_APP='app.py'
flask run -p 5000
```

You should have the information below in the terminal:

```bash
* Environment: production
WARNING: This is a development server. Do not use it in a production deployment.
Use a production WSGI server instead.
* Debug mode: off
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Now, head over to the browser on  `http://127.0.0.1:5000/` to see if the application is running.

![App running locally](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/app-running.png)

### Dockerizing the flask app
Now that our application is up and running, we need to dockerize it. Dockerization is packaging the application and its environmental libraries and dependencies into one so that the app can run anywhere without having to perform new environmental configurations.

First, we need to create a `dockerfile`. The docker file is used by the Docker engine to create a new docker image of the application container. It sets up an environment needed to run the application.

Create a file called `Dockerfile` and add the snippets below:

```py
# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8
# working directory
WORKDIR /user/src/app
# copy all files to the container
COPY .  .
# Install pip requirements
RUN python -m pip install --no-cache-dir -r requirements.txt
# port number to expose
EXPOSE 5000
# run the command
CMD ["python", "./app.py"]
```

### Running the container
In this phase, we will combine all the files and run the docker container.

Startup the `Docker Desktop` then, execute the command below:

```bash
docker build -t app 
```

Docker will execute each line of the `Dockerfile` as shown below:

![Docker Build](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/build-app.png)

Next, execute the command below to run the docker container:

```bash
docker run -p 8888:5000 -t app
```

### Creating a user in ECS 
Head over to `IAM` to create a user and grant the user `AmazonEC2ContainerRegistryFullAccess` permissions.

You can follow this [link](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console) for a guide on user creation.

Execute the command below to set up the user via terminal:

```shell
aws configure
```

Insert the `Access key ID` of the user you created above and the access key. Strike the enter key to leave the remaining settings as default.

You should have the details set as the following:

```shell
AWS Access Key ID [****************TIEH]: YOUR ACCESS KEY ID
AWS Secret Access Key [****************QkxN]: YOUR ACCESS KEY
Default region name [us-east-1]:
Default output format [a]:
```

### Create an Elastic Container Service repository
Next, we need to create a new ECS repository as shown below:
1. In the ECS console, head over to Elastic Container Registry (ECR).
2. Click on get started.
3. Enter the repository name. I called mine `test`.
4. Leave the remaining settings as default the click on `Create repository`.

You should have a screen like the below:

![Creating a task](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/repository-created.png)

### Uploading the Docker image to the repository
Next, we need to upload the docker image we created to ECR.

First, log in to the user by retrieving an authentication and using the token to authenticate the user.

Execute the command below:

```bash
aws ecr get-login-password --region YOUR REGION | docker login --username AWS --password-stdin YOUR ID.dkr.ecr.YOUR REGION.amazonaws.com
```

Building the Docker image:

```bash
docker build -t test 
```

Tag the built image so that you can upload it to the created repository:

```bash
docker tag test:latest YOUR ID.dkr.ecr.YOUR REGION.amazonaws.com/test:latest
```

Finally, we need to push the image to the AWS repository:

```bash
docker push YOUR ID.dkr.ecr.YOUR REGION.amazonaws.com/test:latest
```

![Docker push command](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/upload-to-repository.png)

These commands can be found in the repository by clicking on the `view push commands` button on the repository page.

### Creating ECS clusters
1. In the AWS console, head over to ECS.
2. Click the `create cluster` button.
3. Select `EC2 Linux + Networking` then proceed to the next step.
4. On the next page, insert the cluster name. I called mine `test`.
5. Set `Provisioning Model` as `On-Demand Instance`.
6. For `EC2 Instance type`, select `t3a.micro`.
7. Under networking, set the VPC to the default VPC.
8. Set the `Subnets` to the first subnet in the dropdown.
9. Set the `Auto-assign public IP` to `Enabled`.
10. For the `Security group`, use the default value.
11. Click on create then wait for the process to finish.

If the procedure is successful, then you should see a window as below:

![Creating the ECS Cluster](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/creating-cluster.png)

### Creating task definitions
1. Click `view cluster` then in the left sidebar, click on `Task Definitions`.
2. Click on `Create new Task DefiniTion` and select `EC2` then proceed to the next page.
3. Enter the task name. I used `testAppTask` as my task name.
4. Fill in the details as you desire then click `add container`.
5. In the next container, enter the container name. I used `testAppContainer`. Enter the container image URL.
6. Scroll down to port mappings. In the `Host port`, enter `8888`, and in the `Container port` enter `5000`.
7. Click `add` then scroll down to `create`.

![Creating a task](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/creating-task.png)

### Deploy the created task
1. In the left sidebar, click clusters.
2. Select the created cluster.
3. In the cluster page click the `tasks` tab then run a `new task`.
4. On the next page, select `EC2` as the launch type.
5. Under `task definition`, select the task you created above. It automatically fills in.
6. In the `cluster name` enter the name of the cluster we created.
7. Last, scroll down to run the task.

If you head back to the cluster page and click the created cluster, you should see the task status as below:

![Rask Running](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/task-running.png)

### Testing the URL
Now, we are almost done. We need to test our application deployment status.
1. In the EC2 instances, go to network and security. 
2. Under the security groups, select the default.
3. Scroll down to `edit inbound rules`.
4. Click on the `Add rule` button. 
5. In the `protocol` select `TCP`, enter `8888` for the `Port range`, then use `0.0.0.0/0` for the `source info` to be accessed from anywhere.

Your configurations should be as below before clicking the save button:

![Edit inbound rules](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/edit-inbound-rules.png)

For the selected instance, copy the public DNS URL. The instance public DNS is displayed on the page. Paste it into a new tab of your browser on port `8888`.

If you did everything correctly, your app should be up and running!

### Conclusion
In this tutorial, we went over a successful deployment of a Docker application to AWS using Elastic Container Service. We started by building a mini flask application.

You can find the source code for the application [here.](https://github.com/victorelvice/Flask-app)

Next, we dockerized the application in readiness for deployment and uploaded the docker image to an ECR repository.

Lastly, we deployed the application to AWS.

### Further Reading
Please check out the links below for a further understanding of Docker, AWS, and Elastic Container Services:
- [Linux Containers vs Docker](https://www.section.io/engineering-education/lxc-vs-docker-what-is-the-difference-and-why-docker-is-better/)
- [Fundamentals of Container Security](https://www.section.io/engineering-education/fundamentals-of-container-security/)
- [How to Deploy Docker Container to a Kubernetes Cluster](https://www.section.io/engineering-education/deploy-docker-container-to-kubernetes-cluster/)
- [How to Share Data Between Docker Containers](https://www.section.io/engineering-education/sharing-data-between-docker-containers/)
- [Managing and Running Docker Containers](https://www.section.io/engineering-education/running-and-managing-docker/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
