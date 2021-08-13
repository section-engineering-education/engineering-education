### Introduction

In this tutorial, we'll look at the docker machine in-depth, what it does, its key difference from docker, and build a simple application.

### Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Requirements](#requirements)
- [Objective](#objective)
- [Getting started with a docker-machine](#getting-started-with-a-docker-machine)
- [What’s the difference between Docker Engine and Docker Machine?](#whats-the-difference-between-docker-engine-and-docker-machine)
- [Installing Docker Machine](#installing-docker-machine)
- [Using Docker Machine to run Docker containers](#using-docker-machine-to-run-docker-containers)
- [Run containers and experiment with Machine commands](#run-containers-and-experiment-with-machine-commands)
- [Conclusion](#conclusion)

### Requirements
Docker engine installed on your local machine.
- In this tutorial, we'll be using Linux based operating system (Ubuntu 20.04) `focal fossa` and VirtualBox as our virtualization machine.  

### Objective

This tutorial aims to introduce you to the concepts of the docker-machine. I will show you how to install and run docker on Ubuntu. We'll then proceed to provision and manage multiple docker remote docker hosts. Additionally, we'll also provision swarm clusters.
### Getting started with a docker-machine
 Docker machine is a tool that helps developers create/ install docker engines in a virtualized environment. These newly created docker engines can then be managed using the `docker-machine commands.
 In general terms, you can use this docker machine to create Docker hosts in a local machine or even in the cloud e.g AWS, Azure, etcetera.  

### What’s the difference between Docker Engine and Docker Machine?

Whenever you hear the term `docker`, it typically refers to the `docker engine`.when you run a command such as the one shown below, you're simply interacting with the docker engine command-line interface.

```bash
docker run <image>
```

Now, imagine a situation where you have multiple dockerized Angular applications. it would hard to independently manage these applications, running docker commands each time you need to manage a given host. That's where the docker-machine comes in.  
As discussed earlier, it's used to provision and manage these dockerized hosts. How it works is that this machine is installed in a local machine. You then use it to install the docker engine in a virtualized environment.

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
>   && sudo mv /tmp/docker-machine /usr/local/bin/docker-machine \
>   && chmod +x /usr/local/bin/docker-machine
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   633  100   633    0     0    511      0  0:00:01  0:00:01 --:--:--   511
100 26.8M  100 26.8M    0     0   374k      0  0:01:13  0:01:13 --:--:--  318k
```
To check that the docker-machine has been successfully installed, run the following command on your terminal:

```bash
docker-machine --version
```

Output Example:

```bash
# note that this version is at the time of this writing
docker-machine version 0.16.0, build 702c267f
```

### Using Docker Machine to run Docker containers

Let's now look at how the docker-machine can be used to manage docker containers. Start by running this command to list down your docker machines.  

```bash
 $ docker-machine ls
 # no output since we've not created any machine.
 NAME   ACTIVE   DRIVER   STATE   URL   SWARM   DOCKER   ERRORS
```

Let's proceed and create on machine by executing the commands below:

```bash
docker-machine create --driver virtualbox default
# you notice we've included a driver flag passed the name of our machine
```

Output:

```bash
# the output while installing the docker-machine
Running pre-create checks...
Creating machine...
(default) Copying /home/username/.docker/machine/cache/boot2docker.iso to /home/username/.docker/machine/machines/default/boot2docker.iso...
(default) Creating VirtualBox VM...
(default) Creating SSH key...
(default) Starting the VM...
(default) Check network to re-create if needed...
(default) Waiting for an IP...
Waiting for the machine to be running, may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
Detecting the provisioner...
Provisioning with boot2docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking the connection to Docker...
Docker is up and running!
To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env default


```

Now that we've successfully created a docker-machine, let's proceed and check whether this machine exists, by running the following command:  

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

### Run containers and experiment with Machine commands

Now that we've set everything ready, let's proceed and verify our installation by running the following commands:

```bash
# donwloads docker-machine and prints hello John doe
docker run busybox echo hello John doe
```

Output:

```bash
# it downloads busybox and prints hello John doe
Unable to find image 'busybox:latest' locally
latest: Pulling from library/busybox
b71f96345d44: Pull complete 
Digest: sha256:0f354ec1728d9ff32edcd7d1b8bbdfc798277ad36120dc3dc683be44524c8b60
Status: Downloaded newer image for busybox:latest
hello John doe

```

Next, get your VirtualBox IP address by running the following commands:

```bash
# run this command to get the IP address of our default docker machine
docker-machine ip default
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
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
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
curl $(docker-machine ip default):8000
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

And that's how simple and easy to use a docker-machine to create and manage multiple hosts using virtual and docker machines.

### Conclusion

In this tutorial, we've discussed the key concepts of docker machines. We've seen how we can this tool to manage multiple dockerized applications.  
Hopes it helps you build a strong foundation towards managing your applications.  

