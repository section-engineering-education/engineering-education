---
layout: engineering-education
status: publish
published: true
url: /docker-machine/
title: Docker Machine Tutorial
description: This tutorial introduces the concept of docker machine.
author: vincent-oriyo
date: 2021-08-28T00:00:00-05:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/docker-machine/hero.png
    alt: docker machine image
---
Typically, we create services that run in containers which we then subsequently access via the local host. Docker machine brings a new way of managing and accessing these services.
<!--more-->
It allows developers to create docker engines on the virtual hosts and expose them via a specified port.  

In this tutorial, I will walk you through the concept of docker-machine and discuss how it exposes its services running in the virtual machine.

### Table of contents
- [Requirements](#requirements)
- [Objective](#objective)
- [Getting started with a docker-machine](#getting-started-with-a-docker-machine)
- [Differences between docker machine & docker engine](#differences-between-docker-machine--docker-engine)
- [Installing docker machine](#installing-docker-machine)
- [Using docker-machine to run docker containers](#using-docker-machine-to-run-docker-containers)
- [Run containers and experiment with machine commands](#run-containers-and-experiment-with-machine-commands)
- [Conclusion](#conclusion)

### Requirements
- Basic knowledge of docker.
- Docker engine installed on your local machine.
- Virtual machine installed on your development environment. We will be using VirtualBox in this tutorial.

### Objective
This tutorial aims to introduce you to the concepts of the docker machine. 

First, I will show you how to install and run the docker machine on Ubuntu. We'll then proceed to provision and manage multiple remote Docker hosts.   

### Getting started with a docker-machine
A Docker machine runs on the virtual host, local development environment, cloud, or even on a server somewhere.

We know that the Docker daemon does all the work of creating and executing the containers with docker knowledge. 

You can manage your containers and images using the docker command-line tool in this normal setup process.

With the introduction of a docker-machine, you can easily set up as many containers as possible, deploy them to virtual hosts such as VirtualBox. This host then exposes an IP address, as we'll see in a minute, and provide you with an environment to manage these containers. 

The advantage of this docker-machine that we cannot achieve using just docker is that it allows for a simple interactive environment to manage several containers.

### Differences between Docker Machine & Docker Engine
Whenever you hear the term `docker`, it typically refers to the `docker engine`. When you run a command such as the one shown below, you're simply interacting with the docker engine command-line interface.

```bash
docker run <image>
```

Now, imagine a situation where you have multiple dockerized Java applications. It would be hard to manage these applications independently. That's where the docker machine comes in.  

As discussed earlier, docker-machine is used to provision and manage these dockerized hosts. How it works is that this machine is installed on a local machine. It's then used to install the docker engine in a virtualized environment.

### Installing Docker Machine
```bash
# run this command to check your installed version
docker --version
```

Proceed and download docker machine by running the following command:

```bash
# this installs the docker machine for Linux
base=https://github.com/docker/machine/releases/download/v0.16.0 \
  && curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine \
  && sudo mv /tmp/docker-machine /usr/local/bin/docker-machine \
  && chmod +x /usr/local/bin/docker-machine
```

Output:

```bash
# when you run the above command, you're supposed to see something like this
# you notice it moves the docker-machine to a new directory
# then sets the access mode to allow for execution

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   633  100   633    0     0    511      0  0:00:01  0:00:01 --:--:--   511
100 26.8M  100 26.8M    0     0   374k      0  0:01:13  0:01:13 --:--:--  318k
```

To check that you have successfully installed docker-machine, run the following command on your terminal:

```bash
docker-machine --version
```

Output Example:

```bash
# note that this version is at the time of this writing
docker-machine version 0.16.0, build 702c267f
```

### Using docker-machine to run docker containers

Let's now look at how the docker-machine is used to manage docker containers. Start by running this command to list down your docker machines.  

```bash
 $ docker-machine ls
 # no output since we've not 
 # created any machine.
 
 NAME   ACTIVE   DRIVER   STATE   URL   SWARM   DOCKER   ERRORS
 
```

Let's proceed and create on machine by executing the commands below:

```bash
docker-machine create --driver VirtualBox default
# you notice we've included a driver flag passed the name of our machine
```

Output:

```bash
# the result while installing the docker-machine
Running pre-create checks...
Creating machine...
#... some output goes here
Waiting for the machine to be running, may take a few minutes...
# here the OS you're currently using for installation is being detected
Detecting operating system of created instance...
# ssh connection setup
Waiting for SSH to be available...
# detecting the provisioner
Detecting the provisioner...
Provisioning with boot2docker...
Copying certs to the local machine directory...
# here you notice we're connected to virtual machine
# a remote machine hence certs are being generated and 
# configured
Copying certs to the remote machine...
# docker configuration process
Setting Docker configuration on the remote daemon...
#... installation complete
Docker is up and running!
#...

```

Now that we've successfully created a docker-machine, let's proceed and check whether this machine exists by running the following command:  

```bash
  docker-machine ls
 # this command lists down the list of machines available
```

Output:

```bash

NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER      ERRORS
default   -        virtualbox   Running   tcp://192.168.99.102:2376           v19.03.12  
```

Let's set environmental command for our virtual machine as shown below:

```bash
# a command to create an env command
docker-machine env default
```

Output:

```bash
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.102:2376"
export DOCKER_CERT_PATH="/home/jumamiller/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell: 
# eval $(docker-machine env default)
```

Lastly, let's connect our shell to our virtualized environment by running the command given in the previous step output;

```bash
# configuring the shell
eval $(docker-machine env default)
```

### Run containers and experiment with machine commands

Now that we've set everything ready, let's proceed and verify our installation by running the following commands:

```bash
# donwloads docker-machine and prints hello John doe
docker run busybox echo hello John doe
```

Output:

```bash
# it downloads busybox and prints hello John doe
# if the image is not locally available, you should it is pulled
b71f96345d44: Pull complete 
Digest: sha256:0f354ec1728d9ff32edcd7d1b8bbdfc798277ad36120dc3dc683be44524c8b60
#...
Hello John Doe

```

Next, get your VirtualBox IP address by running the following commands:

```bash
# run this command to get the IP address of our default docker-machine
docker-machine IP default
```

IP Address Output:

```bash
# It's important to note that this may vary from your local machine
192.168.99.102

```

We can then proceed and run the Nginx container by running the following commands:

```bash
# note that if you don't have this image, it will be pulled!
docker run -d -p 8000:80 nginx
```

Expected Output:

```bash
#...pulling image
33847f680f63: Pull complete 
dbb907d5159d: Pull complete 
8a268f30c42a: Pull complete 
b10cf527a02d: Pull complete 
c90b090c213b: Pull complete 
1f41b2f2bf94: Pull complete 
Digest: sha256:8f335768880da6baf72b70c701002b45f4932acae8d574dedfddaf967fc3ac90
Status: Downloaded newer image for nginx:latest
d74c42d4e75403d4e4bd0031b293df6bbe0040e1a94a2ebdf1960caa6698b808

```

We can now hit the server on port 8000 defined above by using CuRL as shown below:

```bash
curl $(docker-machine IP default):8000
```

Output:

```html
<!-- note that this an output on the bash -->
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
 ...
    
</style>
...
</body>
</html>
```

And that's how simple and easy it is to use a docker machine to create and manage multiple hosts using virtual and docker machines.

### Conclusion
Deploying Docker-ready cloud servers does not get much easier than with Docker Machine. The simplicity and ease of use will help you save time and money whether you wish to quickly test a developing container or build an on-demand scalable cluster.

In this tutorial, we've discussed the critical concepts of docker machines. We've seen how we can provide this tool to manage multiple dockerized applications.  

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
