---
layout: engineering-education
status: publish
published: true
url: /deploy-docker-container-to-kubernetes-cluster/
title: How to Deploy Docker Container to a Kubernetes Cluster
description: This tutorial explains how to containerize a Flask application and deploy to a Kubernetes cluster. We will then deploy the app to the Kubernetes cluster using Minikube.
author: samuel-zabastian
date: 2021-06-10T00:00:00-10:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/deploy-docker-container-to-kubernetes-cluster/hero.jpg
   alt:  How to deploy Docker container to a Kubernetes cluster
---
Containerization involves the packaging of code and its dependencies together. To better understand containerization with Docker and Kubernetes, this guide provides an example of developing a simple application, containerizing, and deploying it to a Kubernetes cluster.
<!--more-->

### Prerequisites
You will need the following for the tutorial:
1. A text editor to create the Flask application. I'll be using [VS Code](https://code.visualstudio.com/Download).
2. [Docker Desktop](https://www.docker.com/products/docker-desktop) installed on your computer.
3. [Kubernetes CLI](https://kubernetes.io/docs/tasks/tools/) installed.
4. [Minikube](https://minikube.sigs.k8s.io/docs/start/) Installed in your computer. You call follow [this guide](https://minikube.sigs.k8s.io/docs/start/) for the installation procedure.

### Understanding Docker & containers
Docker is an open-source containerization tool that packages applications into small units called containers. A Docker container image is a standalone software package that contains all the requirements for an application to run. 

Without Docker, a developer can send a running code to a tester, but upon running, the code might not run on the tester's system. However, with Docker, an application is packaged with all the requirements and dependencies, hence a Docker container can run on any platform with Docker runtime.

### What is Kubernetes?
Kubernetes assists in the orchestration of containerized applications to run on a cluster of hosts. It automates the deployment and management of Dockerized applications in cloud platforms. It levies the deployment team in the manual processes of deployment and scaling applications.

### Creating the application
We will create a simple Flask application that generates random numbers and displays them on a webpage. To create the Flask app, we need to install `flask`. 

In the directory of the project, run the command below:
```bash
pip install flask
```

Next, create two files `requirements.txt` to point to libraries and dependencies for and `app.py`. 

Add the scripts below to the `app.py` file:
```py
from flask import Flask, render_template
import flask
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
```

Create a folder named `templates` which contains the HTML files rendered on the webpage. In the folder, create a file named `index.html` then add the snippets below.

```html

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Docker App</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet">

    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar navbar-dark bg-success">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">SECTION</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                </div>
            </div>
        </nav><br><br>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    AWESOME ARTICLE
                </div>
                <div class="card-body">
                    <h5 class="card-title">DEPLOY DOCKER CONTAINER TO KUBERNETES CLUSTER</h5>
                    <p class="card-text">
                        Docker is an open-source containerization tool that packages applications 
                        into small units called containers. 
                        A docker container image is a standalone software package that contains all 
                        the requirements for an application to run. 
                        Without docker, a developer can send a running code to a tester but upon running,                        the code might not run on the tester's system. 
                        However, with Docker, an app is packaged with all the requirements and dependencies hence a Docker container can run on any platform.
                    </p>
                    <a href="#" class="btn btn-success ">view article</a>
                </div>
            </div>
        </div>
    </body>
</html>
```

### Requirements file
This file specifies the dependencies needed to run the application. In the root directory of the app, create a file named `requirements.txt`. Our application only requires flask and unicorn. 

So we need to include the two in the `requirements.txt` file as below:

```py
flask==1.1.2
gunicorn==20.0.4
```

### Creating a Dockerfile
The Dockerfile is used by the Docker engine to create a new Docker image of the application container. It sets up an environment needed to run the application. 

Create a file called `Dockerfile` and add the snippets below:
```py
# We need python 3.8
FROM python:3.8

# make the working directory in the container
RUN mkdir /app

# specify where to install the app
WORKDIR /app/

# add all files to the working directory
ADD . /app/

# Install the dependencies in the requirements file.
RUN pip install -r requirements.txt

# Run the app
CMD ["python", "/app/app.py"]
```

### Generating the application image
Startup the Docker desktop, then execute the command below:

```bash
    docker build --tag flask-test-app:latest .
```

![Creating a Docker Image](/engineering-education/deploy-docker-container-to-kubernetes-cluster/creating-image.png)

### Deploying the Docker image
Now that we have a Docker container image, we need to create a deployment file. In the root directory, create a new file called `deployment.yaml`. This file will deploy the application to the Kubernetes engine. 

Add the following snippets to the file:

```yaml

apiVersion: v1
kind: Service
metadata:
  name: flask-test-service
spec:
  selector:
    app: flask-test-app
  ports:
  - protocol: "TCP"
    port: 6000
    targetPort: 5000
  type: LoadBalancer

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: flask-test-app
spec:
  selector:
    matchLabels:
      app: flask-test-app
  replicas: 5
  template:
    metadata:
      labels:
        app: flask-test-app
    spec:
      containers:
      - name: flask-test-app
        image: flask-test-app
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 5000
```

The file has two parts:

1. `Service` - The service acts as the load balancer. A load balancer is used to distribute requests to the various available servers.

2. `Deployment` will act as the intended application. The user request hits the load balancer, then the load balancer distributes the request by creating the number of replicas defined in the `deployment.yaml` file. For example, in our case, we have five replicas for scalability, meaning that we will have 5 instances running at a time.

The benefit of multiple replicas is that if an instance crashes, the other application instances continue running.

The `deployment.yaml` file is connected to the Docker image created earlier, therefore to deploy the application to the Kubernetes cluster, we use the Docker image. The image will automatically create containers for the application when we deploy the application.

### Deploying to Kubernetes service
We have dockerized our Flask application, and now we need to deploy it to a Kubernetes engine. 

Execute the command below in your terminal:

```bash
kubectl apply -f deployment.yaml
```

This command will deploy our service and application instances to the Kubernetes engine. After executing this command, we should be able to see that the `flask-test-service` and the `flask-test-app` are created successfully.

![Deploying to Kubernetes](/engineering-education/deploy-docker-container-to-kubernetes-cluster/deployment.png)

### The deployment dashboard
Minikube and Kubernetes provide a dashboard to visualize the deployment. To see our deployment in that dashboard, execute the command below in your terminal.

```bash
minikube dashboard
```

This command should yield a dashboard as shown below. 

![Deployment dashboard](/engineering-education/deploy-docker-container-to-kubernetes-cluster/dashboard.png)

We can see that our Flask application was deployed and we can see the number of running instances. If a request is made, the load balancer distributes the number of hits the request had on the instances.

### Accessing the application
We can access the application using the command below:

```bash
minikube start service: flask-test-service
```

This command will open the application in a browser as shown below:

![Deployed app](/engineering-education/deploy-docker-container-to-kubernetes-cluster/app-deployed.png)

### Conclusion
In this tutorial, we created a web application using the Flask framework. We went ahead and created a Docker image of the application. 

Finally, we successfully deployed the app to the Kubernetes cluster using Minikube.

This tutorial should help a beginner to get started with containerization using Docker containers and Kubernetes clusters.

You can find the source code for the application in [this](https://github.com/bastian-zab/flask-app-with-docker-and-kubernetes) link.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
