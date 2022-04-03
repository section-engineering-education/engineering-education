---
layout: engineering-education
status: publish
published: true
url: /docker-containers-on-compute-engine/
title: Running Docker container on Google Compute Engine
description: In this article, the reader will be walked through creating a Flask application, creating a Docker-based container for the application and deploying the container to a virtual machine on Google.
author: victor-elvis
date: 2021-09-21T00:00:00-00:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url:  /engineering-education/docker-containers-on-compute-engine/hero.png
    alt: Running docker containers on Google computer Engine Image
---

Google Compute Engine(GCE) is a high-end compute service that allows developers to create and run virtual machines on the underlying secure and reliable infrastructure of Google. Using GCE takes advantage of the complex computing capabilities and heavy workload without acquiring them physically.
<!--more-->
Docker allows the encapsulation of an application and its modules into a single independent package. This practice enables you to run the application on any platform without the need for further configurations of the deployment environment.

### Table of content
- [Project Goal](#project-objective)
- [Prerequisites](#prerequisites)
- [Creating the Flask app](#creating-the-flask-app)
- [Dockerizing the app](#dockerizing-the-application)
- [Building a container image](#building-the-container-image-and-pushing-to-google-container-registry)
- [Firewall configuration](#configure-a-firewall-rule)
- [Creating the virtual machine](#creating-the-gce-vm-instance)
- [Configuration of the VM](#working-in-the-google-vm)
- [Uploading the container to the VM](#uploading-the-container-to-the-vm)
- [Deploying the container to GCE](#deploying-the-container-to-gce)
- [Testing the deployment](#testing-the-application)
- [Conclusion](#conclusion)

### Project Objective

In this article, the reader will be walked through creating a Flask application, creating a Docker-based container from the application and deploying the container to a virtual machine on Google. 

By the end of the article, the reader should understand the procedure and the skills to execute them efficiently.

### Prerequisites
A reader will need the following to follow along with this tutorial.
1. A suitable text editor. I prefer [VS Code](https://code.visualstudio.com/Download).
2. Basic Python skills.
4. An understanding of the Flask Framework.
4. [Docker](https://www.docker.com/products/docker-desktop) software running.

### Creating the Flask app
The initial step is creating the Flask application to be used for the project. I chose Flask because it's easy to understand, simple, and it does not require any special tools to work with. 

Next, initiate the process of creating your application by running this command that installs Flask.

```bash
pip install Flask
```

In the next step, create two files. The first file is named `requirements.txt` and `app.py` to hold the libraries and dependencies of the project. The `app.py` is the driver code of the application.

Add the following code to the `app.py` file:

```py
from Flask import Flask, render_template
import Flask
app = Flask(__name__)
# Index route
@app.route('/')
def index():
   return render_template('index.html')
if __name__ == '__main__':
   app.run(debug=True)
```

Create a new directory and call it `templates`. This directory will contain the view files rendered on webpage user interface. In the  folder, create a new file named `index.html`, then add the snippet below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>RUNNING DOCKER CONTAINERS ON GCE</title>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
   <div class="container">
   <div class="jumbotron text-center">
     <h2>RUNNING DOCKER CONTAINERS ON GCE</h4>
   <p>TIn this article, the reader will be walked through creating a Flask application, creating a docker based container out of the article and deploying the Docker container to Google Compute Engine. By the end of the article, the reder should have an understanding of the procedure and the skills to execute them effecinstly.</p>
   </div>
   </div>  
   </div> 
</body>
</html>
```

### Dockerizing the application
Dockerization involves encapsulating the application and the modules it requires to run, into one unit. The newly created unit can now be configured to run anywhere without the need to run new installations.

To set up our container, we begin with creating a new file called `dockerfile`. The file specifies the commands to be executed once the application is uploaded to the platform. First, add the snippets below to the Dockerfile.

```py
FROM python:3.8
# specify the current wd
WORKDIR /user/src/app

# migrate all local files in the computer to the remote container
ENV APP /app
WORKDIR $APP_HOME
COPY . ./

# Use pip to install the project requirements
RUN python-pip install Flask gunicorn

# Run the web server upon startup with eight threads 
CMD exe gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
```

Now that we have successfully created our Dockerfile, we need to make the file executable by running the command below in the terminal.

```bash
chmod +x Dockerfile
```

### Building the Container Image
We will build and publish our container image to Google Container Registry(GCR). The container image masks the application and its requirements into a single container to run on GCE. 

Since we intend to use the `gcloud command-line tool`, we need to open up the console, and upon prompt, we allow the cloud shell application to access the API key.

![Authorize use of API key](/engineering-education/docker-containers-on-compute-engine/authorize-api-key.png)

To create the container, run the command below:

```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/sectionapp
```
> You need to provide a tag to associate with the container image. For our case, I called mine `sectionapp`.

![Creating a docker image](/engineering-education/docker-containers-on-compute-engine/image-build.png)
![Image Created](/engineering-education/docker-containers-on-compute-engine/image-created.png)

### Configure a firewall rule
We will set up a firewall to allow traffic through a specific port. In our case, the port is 8080.

On the sidebar, head over to the networking tab ⇾ VPC network ⇾ select firewall. Then, click on `CREATE FIREWALL BUTTON`.

- Name : `allow-http-8080`
- Targets: `Specified target tags`
- Target tags: `http-server-8080`
- Source-ip: `0.0.0.0/0`
- TCP: `8080`

![Select firewall](/engineering-education/docker-containers-on-compute-engine/select-firewall.png)

### Creating the GCE VM instance.
From the sidebar menu in the console, go to COMPUTE ⇾ Compute Engine ⇾ VM instances, then click `CREATE INSTANCE`.

![Creating a virtual machine instance](/engineering-education/docker-containers-on-compute-engine/creating-vm-instance.png)

- Name : section-instance
- Machine configuration(Series): N1
- Machine configuration(Machine type): f1-micro
- Boot Disk: Debian GNU/Linux 10 (buster)
- Click the `Management, security, disks, networking, sole tenancy` link to expand the available options. 
- Click on the `Networking` tab.
- For `Network tags`, enter `HTTP-server-8080` that we set up in the firewall creation.

To check for the running instances associated with this project, execute the command below:

```bash
gcloud compute instances list
```
![Running instances](/engineering-education/docker-containers-on-compute-engine/running-intances.png)

### Working in the Google VM
Next, we need to log into the virtual machine to install our application and its modules. So we will use another `gcloud` command as below:

```bash
gcloud compute ssh section-instance --zone us-central1-a
```
> Note that we specify the instance name and the zone as well. Then, when prompted to create an ssh key, strike the `enter` key to go with the defaults.

Next, we will update the system package list by running the command:

```bash
sudo apt-update
```
Next, as this project runs on the Flask, we will need pip to install Flask using the command:

```bash
apt install python3-pip 
```

### Uploading the container to the VM
Use `CTRL+D` to log out of the VM. Next, we need to copy our application files into the virtual machine using the `secure copy` command.

```bash
gcloud computer scp --recursive section section-instance: --zone us-central1-a
```

### Deploying the container to GCE
I prefer deploying my containers to the VM instance from the Google Cloud Platform Console using the `gcloud` command-line tool with the command:

```bash
gcloud compute instances create-with-container section-instance --container-image gcr.io/PROJECT-ID/sectionapp
```

In the command above, ensure you replace the PROJECT-ID with your project-id.

### Testing the application
- In the running instances, we will select the instance we created `section instance`. - The instance has two IP addresses; an `internal IP` and an `external IP`.
- Copy the external IP address, then run the application on port 8080. 
- Our application runs as shown below:

Now, if we navigate a browser with `http://your-external-ip-address/8080` link, we will see our container running below.

![App running ](/engineering-education/docker-containers-on-compute-engine/app-running.png)

### Conclusion
In this article, we built a web application from scratch using a Flask. Then, we went ahead and containerized the application using Docker in the Google command line. Finally, we took a step further and deployed the container to a virtual machine using compute engine. In doing so, we are utilizing Google infrastructure to run our application.

Take note that for you to run an application on Google's platform, you have to provide billing details and once the application is done, shut down the running instances to avoid incurring extra charges.

You can find the code for the Flask application [here.](https://github.com/victorelvice/gce-flask-app)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
