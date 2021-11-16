---
layout: engineering-education
status: publish
published: true
url: /deploy-flutter-to-google-computer-engine/
title: Deploying a Flutter Web Application to Google Computer Engine
description: This article will show you how to deploy a Flutter web application to Google Compute Engine(GCE).
author: paul-romans
date: 2021-09-16T00:00:00-04:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/deploy-flutter-to-google-computer-engine/hero.png
    alt: Deploying a Flutter web application to GCE Hero Image
---
Based on the type of application that one wants to deploy, Google provides various web hosting options to a developer. Deciding on this depends on whether your application is dynamic or static. 
<!--more-->
For static sites, Google offers Cloud storage and Firebase hosting. 

However, dynamic applications have a different set of options, including Compute Engine, App Engine, and Cloud Run. 

This article will focus on the deployment of a Flutter web app to the Google Compute Engine(GCE). 

### Table of contents
- [Creating a project on Google Cloud](#creating-a-project-on-google-cloud)
- [Setting up the virtual machine](#setting-up-the-virtualmachine)
- [Server stack deployment](#server-stack-deployment)
- [The Flutter application](#the-flutter-application)
- [Deployment to the Compute Engine](#deployment-to-the-compute-engine)
- [Testing the deployment](#testing-the-deployment)
- [Conclusion](#conclusion)

### Creating a project on Google Cloud
Every Google cloud service API requires an API key. We have to create a new Google Cloud Platform project and enable the Google Compute Engine API to get started. 

Make sure that you set up billing to use the Google Compute Engine API.

Google provides you with $300 free credit to use for 90 days as you try out different products. 

However, make sure that you shut down your running instances if you do not want to incur extra charges after the 90 days.

After creating our project, we need to install the Google Cloud SDK using a command-line tool. 
```bash
./google-cloud-sdk/install.sh
./google-cloud-sdk/bin/gcloud init
```

Lastly, update the Google cloud components.

```bash
gcloud components update
```

### Setting up the virtual machine
Google Compute Engine(GCE) is a high-end compute service that allows developers to create and run virtual machines on Google's secure and reliable infrastructure. 

GCE allows developers to take advantage of complex computing capabilities and thus, reduce heavy workload.

Next, we add the engine by creating a new instance using the following steps:

- Go to the Navigation menu ⇾ Compute Engine ⇾ VM instance ⇾ Create Instance.
- Choose a unique instance name, and for the rest of the fields, set them, as shown below:
    - Machine family: General-purpose
    - Machine type: e2-micro
- If you have an existing domain name, click the `Management, security, disks, networking, sole tenancy` link to expand the available options. 
- Click on the `Networking` tab.
- In the `Hostname` field, add your domain name.
- On the sidebar, head over to the networking tab ⇾ VPC network ⇾ External IP addresses, then change the `IP address` type to `static`.

You will see the following running instance:

![Running instance](/engineering-education/deploy-flutter-to-google-computer-engine/running-instance.png)

### Server stack deployment
Most of the popular open-source web applications are running the LAMP stack. 

LAMP (Linux Apache MySQL and PHP) stack is a collection of open source software that facilitate hosting of dynamic applications.

We will use the LAMP stack for our deployment. First, we need to [install it](https://cloud.google.com/community/tutorials/setting-up-lamp) to the virtual machine we just created.

To install LAMP, launch a new terminal, then run the commands below:

```bash
sudo apt-get update
sudo apt-get install apache2 php libapache2-mod-php
```

![New terminal](/engineering-education/deploy-flutter-to-google-computer-engine/console.png)

We can test LAMP deployment by navigating to `HTTP://[your-external-ip-address]` url. You should see the default page of Apache2.

Next, install MariaDB on the running virtual machine instance, as highlighted below:

```bash
sudo apt-get update
sudo apt-get install MariaDB-server PHP PHP-MySQL
```
Start the MariaDB service on the virtual machine instance.

```bash
sudo systemctl start MariaDB
```

### The Flutter application
Our Flutter app entails a simple landing page built using the section.io theme. It has a navigation bar, a landing page image, and a dummy button to request coffee. 

Writing the code and describing every piece of the source code would make this tutorial quite long. So, I have created and uploaded the project files to an online repository. You can download it from [Repl.it](https://replit.com/@paulromans/flutter-web#).

### Deployment to the Google Compute Engine
The first thing to do after cloning the project is ensuring that it runs by executing the following Flutter command:

```bash
flutter run -d chrome
```

Next, build an uploadable web version of the project that we will deploy to GCE.

```bash
flutter build web
```

If the application compiles and runs well, you can proceed to the next step.

Compress the application folder, then obtain a `web.zip` file inside the `build` folder.

Head over to your virtual machine instance, then click `SSH tools` to upload the file.

![Select upload file](/engineering-education/deploy-flutter-to-google-computer-engine/upload-file.png)

Google's virtual machine provides the upload function to deploy the application to the VM. 

Select the `web.zip` file, as shown below:

![Web zip file](/engineering-education/deploy-flutter-to-google-computer-engine/select-web.png)

You can also use the gcloud command if you have installed Cloud SDK in your workstation.

```bash
gcloud compute scp [LOCAL_FILE_PATH] root@lamp-tutorial:/var/www/html
```

Next, we move the zip folder to the `/var/www/html` directory to be dynamically served by the LAMP stack.

```bash
sudo mv web.zip /var/www/html
```

At this moment, the application cannot run because it's still a zip file. Since our virtual machine is empty, we can't unzip the folder unless we install an application for that. 

We will install `unzip` using the command below:

```bash
sudo apt-get install unzip
```

Theun nzip the web folder of the application:

```bash
sudo unzip web.zip
```

Navigate to the directory of your application using `cd web`, then execute the command below:

```bash
sudo mv * ../
cd ..
sudo rm -r web
```

### Testing the deployment
Now, if you head over to your browser and navigate to `http://your-external-ip`. You should see your application running.

![Application running on Google computer engine](/engineering-education/deploy-flutter-to-google-computer-engine/app-live.png)

### Conclusion
In this article, we demonstrated how to deploy a Flutter web application on Google's compute engine. 

It's so satisfying that we can use the GCE to explore the Google infrastructure in web applications. 

### Further reading
- [Installing SSL certificate](https://www.linux.com/topic/networking/how-install-ssl-certificate-linux-server/).

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
