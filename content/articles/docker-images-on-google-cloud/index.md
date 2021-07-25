---
layout: engineering-education
status: publish
published: true
url: /docker-images-on-google-cloud/
title: Docker images on Google cloud
description: This tutorial will go through the creation and deployment of Docker containers on Google cloud.
author: dolores-merceline
date: 2021-07-24T00:00:00-15:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/docker-images-on-google-cloud/hero.png
   alt: Docker images on Google cloud example image
---

If you are using docker and you push docker images to hub.docker.com, by default, the docker images are pushed into a public repository. This means that everyone can access your docker images. However, we need to ensure that our docker images are very secure so that only applications existing in a given project have the access to the docker images. 
<!--more-->
Google provides a solution to this using Google Cloud, where you can store private docker images.

### Table of Contents
- [Goal](#goal)
- [Google Container Registry](#google-container-registry)
- [Working on Google Cloud Shell](#working-on-google-cloud-shell)
- [Creating an application](#creating-an-application)
- [Creating the Docker File](#creating-the-docker-file)
- [Creating a Docker Image](#creating-a-docker-image)
- [Uploading the Docker Image](#upload-&-verify-the-upload)
- [Deploy the image](#deploy-the-image)
- [Conclusion](#conclusion)

### Goal
This article focuses on creating a docker image and pushing it to a private repository in Google using Google Container Registry. It explains how to ensure that a given docker image is only accessible to the projects within a given repository. We will create a flask application, create its docker image, then deploy the created image to Google Cloud.

### Google Container Registry
Google Container Registry is space for managing Docker images on the Google Cloud Platform. It ensures clearance for access of Docker images hosted on the registry by deciding who can access what docker image at any instance. The majority of the people use Docker Hub as a central registry, but with GCR, there is privacy factored in.

### Working on Google Cloud Shell
Google Cloud Shelly is the free environment that provides command-line access to resources during cloud development. It provides a virtual machine based on Linux. 

Instead of working locally, we will use Google Cloud shell. To open the shell click the top right icon shown in the image below:
![Google Cloud Shell](/engineering-education/docker-images-on-google-cloud/shell.png)

### Creating an application
To create the application, we need one folder for the templates, a `dockerfile`, `requirement.txt` file for use when building a docker image, and the main entry point of the application i.e, `app.py`. 

Here is a table of all the files and folders for the application and the command to create them in Google Cloud Shell.

| file/folder | directory | command |
|-----------------|----------------|--------------------|
| flask-app | root | `mkdir flask-app` |
| templates | flask-app | `mkdir templates` |
| app.py | flask-app | `touch app.py` |
| Dockerfile | flask-app | `touch Dockerfile` |
| index.html | templates | `touch index.html` |

Use the command `nano filename` to open any file.

In the `app.py` file, add the following code the press `CTRL + X` then `Y` to save.

```py
import os
from flask import Flask, render_template
import flask
app = Flask(__name__)

# Index
@app.route('/')
def index():
   return render_template('index.html')

if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
```

In the `index.html` file, add the code below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Docker | Google Cloud</title>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
   <div class="container">
     <br><br><br><br><br>
   <div class="jumbotron text-center">
     <h2>Google Cloud Deployed!!!</h4>
   </div>
    </div>  
   </div> 
</body>
</html>
```

### Creating the Docker File
In the `Dockerfile` add the code below:

```py
FROM python:3.8

# working directory
WORKDIR /user/src/app

# copy all files to the container
COPY . .

# Install pip requirements
RUN python -m pip install --no-cache-dir -r requirements.txt

# port number to expose
EXPOSE 5000

# run the web service on the container using gunicorn
CMD exec gunicorn --build :$PORT --worker 1 --threads 8 --timeout 0 app:app
```

In the requirements.txt file, add the code below:
```py
# flask 
flask==1.1.2

# gunicorn
gunicorn==20.0.4
```

Next, we need to make the `Dockerfile` executable. Run the command below.

```bash
chmod +x Dockerfile
```
### Creating a Docker Image
When using the docker hub, we would use the command `docker build --tag app .` to generate the docker image. However, here is where things get different with Google Container Registry. 

When creating the docker image using GCR, you should specify the project name, the project ID, and the tag name for the docker image. For our case, we will run the command below to build the image.

```shell
gcloud builds submit --tag gcr.io/your-project-id/flask-app
```

### Upload & Verify the Upload
To verify whether the image was successfully deployed, head over to Google Cloud Storage on the left sidebar menu. You should see your app deployed like the one shown below. You will see two records; one is an image, while another is the actual application.
![Google Cloud Storage](/engineering-education/docker-images-on-google-cloud/storage.png)
![Confrim Upload](/engineering-education/docker-images-on-google-cloud/confirm-upload.png)


### Deploy the image
Run the command below to deploy the docker image. Under region, select the number that corresponds to your desired location. Click enter for any prompt given further.
```shell
gcloud run deploy --image gcr.io/project-id/flask-app
```
![Docker Image Deployment Processes](/engineering-education/docker-images-on-google-cloud/deploying.png)

You should see the container deployed as below:
![Deployed Docker Image](/engineering-education/docker-images-on-google-cloud/deployed.png)

Click the deployment service URL link to see your app running!

If we go to the Google Container Registry Page, we will find a list of our containers and their visibility set as private. 

This shows that our docker images are only accessible to applications created within the Google console project. Now we are sure that our images have access control.
![Private Images](/engineering-education/docker-images-on-google-cloud/private.png)

### Conclusion
In this tutorial, we learned how to deploy docker images to Google Container Registry, created a simple flask application, dockerized it, and deployed it to GCR. We also learned how to use Google Cloud Shell during the process. 

Now go ahead and try doing it with your application.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
