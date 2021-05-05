---
layout: engineering-education
status: publish
published: true
url: /engineering-education/running-and-managing-docker/
title: Managing and Running Docker Containers
description: This tutorial will give the readers a overview on how to run and manage Docker containers. We will look at securing Docker containers, limiting memory and CPU usage and removing containers.
author: terrence-aluda
date: 2021-04-28T00:00:00-10:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/running-and-managing-docker/hero.jpg
    alt: Docker Container Example Image
---
On exposure to any container technology, the first thing to interact with is most probably a container image. This is a binary package that contains all files necessary to run an application inside a container.
<!--more-->

Containers are tools that simulate an Operating System environment and allows us to deploy our applications without necessarily worrying much about different configuration systems.

We may decide to build an image from scratch from our local machines or decide to pull one from an image registry. Either way, you can run the image to produce a running application inside a container.

You can get a nice introduction to Docker from these articles by [Francisca Adekanye](/engineering-education/authors/francisca-adekanye/):

- [Understanding Docker Concepts](/engineering-education/docker-concepts/)
- [Getting Started with Docker](/engineering-education/getting-started-with-docker/)

A Docker image is made up of a series of layers(File System Layers) in which each layer can either add, delete or modify a file from the preceding layer. This creates an overlay filesystem. To explain this in detail, we will look at the following figures:

```
.
└── container F: a machine's OS such as ArchLinux
    └── container G: build upon F, by adding library1 v2.1.15
        └── container H: build upon G, by adding library2 v1.9

```

Here, we have three containers: F, G, and H. G and H are created from F and share container F's files.

You can also inherit from any inner layer. For example, if we inherit from container B by adding other versions of dependencies, we get such a diagram:

```
. (continuing from above)
└── container B: build upon #A, by adding library1 v2.1.15
    └── container D: build upon #B, by adding library3 v4.2.8
        └── container E: build upon #B, by adding library4 v3.2.1

```

The images are combined with a configuration file providing instruction on setting up the environment and executing an application endpoint. 

#### Building application images using Dockerfiles
A `Dockerfile` is a text file that defines a container image and can be used to automate the creation of the image.

Let's look at the example below for creating a lightweight image:

```docker
FROM alpine
MAINTAINER <your-name> <your-email>
COPY <application-directory> <destination>
ENTRYPOINT ["<entrypoint>"]
```

The first line indicates we are creating the container from the slimmest image available.

The second line just shows the author's details: name and email.

The third line copies the files from the application directory on your system into the application directory on the Docker container.

The last statement contains the command(`ENTRYPOINT`) used to start the application running in the container from where you've pointed the application to be. In this case, where you copied to.

You can give the text file a name `DockerFile`.

We can then create the image using the command format below:

```bash
$ docker build -t <image-name>:<image-version> .
```

This command builds a Docker image from a `Dockerfile`.

`-t` defines the tag of the image. The other arguments will be the image name and the version.

For example:

```bash
$ docker build -t sectionio-image:2.0 .
```

#### Image security
We should take much consideration for our images' security and follow the best practices and recommendations.
For example, we should not build containers with passwords put in any layer of the image because an enterprising attacker may create an image from layers containing the passwords and start some malicious activity.

#### Optimizing image sizes
We also need to take care of the space our images take up. Consider the diagram below:

```
.
└── layer F: contains a large file named 'MegaFile'
    └── layer G: removes 'MegaFile'
        └── layer H: builds on G
```

`MegaFile` is still present in layer A, meaning that whenever you push or pull the image, it is still transmitted through the network.

Another tradeoff that we may experience is in caching and building our images. Each layer is an independent delta from the layer below it and that each time you change a layer, it changes every layer that comes after it. That means that they need to be rebuilt, pushed, and pulled again to deploy your image to production.

To understand this more, consider these two figures:

```
.
└── layer A: contains anaconda configuration
    └── layer B: adds source code 'keras-test.py'
        └── layer C: installs the 'matplotlib' library
```

VERSUS:

```
.
└── layer A: contains anaconda configuration
    └── layer B: installs the 'matplotlib' library
        └── layer C: adds source code 'keras-test.py'
```

It seems that both of these images will behave identically, and when pulled for the first time they do. 

However, consider what happens when `keras-test.py` changes. In the first figure, it is only the change that needs to be pulled or pushed. In the other image, both `keras-test.py` and the layer providing the `matplotlib` package need to be pulled and pushed, since the `matplotlib` layer is dependent on the `keras-test.py` layer.

In general, we order our layers from the least likely to change to the most likely to change to optimize the image size for pushing and pulling.

#### The Docker container runtime
Docker has a CLI tool used to deploy containers. Here is an example of running an image:

```bash
$ docker container run -p 8080:80 <yourimage>
```

This command starts the image and maps TCP ports 80 on your `localhost` to listen on your machine. 

Click [here](https://phoenixnap.com/kb/docker-run-command-with-examples) to read more on the `docker run` command.

#### Limiting memory and CPU usage
We can restrict our resource utilization to make it possible for multiple applications to coexist in the same hardware to ensure fair usage.

To limit memory usage, we use the `--memory` and `--memory-swap` flags together with the `docker run` command. 

For example:

```bash
$ docker run -d --name <your-image> \
--publish 8080:8080 \
--memory 200m \
--memory-swap 1G \
```

Here we have limited our image to 200MB of memory and a swap space of 1 GB.

We can also restrict CPU utilization by using the `--cpu-shares` and `--cpu-period` flags.

Consider three containers: A, B and C. A has a cpu-share of 1024 while B and C have a cpu-share setting of 512 each. When processes in all the containers attempt to use 100% of CPU, container A would receive 50% of the total CPU time while the rest get 25% each.

```bash
$ docker run -d --name <your-image> \
--memory 200m \
--memory-swap 1G \
--cpu-shares 1024 
```

For the `--cpu-period`, we set the period of CPUs to limit the container’s CPU. It works hand in hand with the `--cpu-quota` which is used to allocate the amount of time in microseconds that a container has access to the CPU resources as a function specified by `--cpu-period`. 

For example, to set 50% CPU worth of run-time every 50ms we use this command:

```bash
$ docker run -d --cpu-period=50000 --cpu-quota=25000 <your-image>
```

Click [here](https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources) to read more on resource utilization.

#### Cleanup
You can delete an image once done using the `docker rmi` command:

```bash
$ docker rmi <tag-name>
```

OR

```bash
$ docker rmi <image-id>
```

#### Conclusion
This article gave us a brief overview on Docker container images and how to manage them. Hope you got some insights on application images and how you may optimize them for improved performance. Please click on the links provided to read more.

Have a good one.

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
