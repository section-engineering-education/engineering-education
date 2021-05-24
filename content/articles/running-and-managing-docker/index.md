---
layout: engineering-education
status: publish
published: true
url: /running-and-managing-docker/
title: Managing and Running Docker Containers
description: This tutorial will give the readers an overview of how to run and manage Docker containers. We will look at securing Docker containers, limiting memory and CPU usage, and removing containers.
author: terrence-aluda
date: 2021-05-24T00:00:00-13:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/running-and-managing-docker/hero.jpg
    alt: Docker Container Example Image
---
Containers are tools that simulate an Operating System environment and allow us to deploy our applications without necessarily worrying (too much) about different configuration systems.
<!--more-->
On exposure to any container technology, the first thing to interact with is most probably a container image. This is a binary package that contains all files necessary to run an application inside a container.

We may decide to build an image from scratch from our local machines or decide to pull one from an image registry. Either way, you can run the image to produce a running application inside a container.

You can get a nice introduction to Docker from these articles by [Francisca Adekanye](/engineering-education/authors/francisca-adekanye/):

- [Understanding Docker Concepts](/engineering-education/docker-concepts/)
- [Getting Started with Docker](/engineering-education/getting-started-with-docker/)

A Docker image is made up of a series of layers (File System Layers) in which each layer can either add, delete, or modify a file from the preceding layer. This creates an overlay filesystem. 

To explain this in detail, we will look at the following figures:

```bash
.
└── container F: a machine's OS such as ArchLinux
    └── container G: build upon F, by adding library1 v2.1.15
        └── container H: build upon G, by adding library2 v1.9

```

Here, we have three containers: F, G, and H. G and H are created from F and share container F's files.

You can also inherit from any inner layer. For example, if we inherit from container G by adding other versions of dependencies, we get such a diagram:

```bash
. (continuing from above)
└── container G: build from #F, by adding library1 v2.1.15
    └── container I: inherited from #G and uses library3 v4.2.8
        └── container J: inherited from #I and uses library4 v3.2.1

```

The images are combined with a configuration file providing instructions on setting up the environment and executing an application endpoint. 

#### Building application images using Dockerfiles
A `Dockerfile` is a text file containing commands specified by a user (a developer) when building an image.

Let's look at the example below when creating a lightweight image:

```docker
FROM alpine
MAINTAINER <your-name> <your-email>
COPY <application-directory> <destination>
ENTRYPOINT ["<entrypoint>"]
```

The first line indicates we are creating the container from the slimmest image available.

The second line just shows the author's details: name and email.

The third line copies the files from the application directory on your system into the application directory on the Docker container.

The last statement contains the command (`ENTRYPOINT`) used to start the application running in the container from where you've pointed the application to be. 

In this case, where you copied it to.

You can give the text file the name `DockerFile`.

We can then create the image using the command format below:

```bash
$ docker build -t <image-name>:<image-version> .
```

`-t` defines the tag of the image. The other arguments will be the image name and the version.

For example:

```bash
$ docker build -t sectionio-image:2.0 .
```

#### Image security
We should take careful consideration with our images' security and follow the best practices and recommendations. For example, we should not build containers with passwords put in any layer of the image because an attacker may build an image from layers containing the passwords and start some malicious activity.

#### Optimizing image sizes
We also need to take care of the space our images take up. 

Consider the diagram below:

```bash
.
└── layer F: contains a large file named 'MegaFile'
    └── layer G: removes 'MegaFile'
        └── layer H: builds on G
```

`MegaFile` is still contained in layer F implying that it goes through the network traffic which will eventually cuts down on the performance.

> When an image is removed, it is still available in the cluster but not accessible.

Another challenge that we may experience is in building and caching our images. Each time a layer is changed, all other layers below it change. That means that they need to be rebuilt, pushed, and pulled again to deploy your image to production.

To understand this more, consider these two figures:

```bash
.
└── layer F: contains anaconda configuration
    └── layer G: adds source code 'keras-test.py'
        └── layer H: installs the 'matplotlib' library
```

VERSUS:

```bash
.
└── layer F: contains anaconda configuration
    └── layer G: installs the 'matplotlib' library
        └── layer H: adds source code 'keras-test.py'
```

Consider some changes done on `keras-test.py`. In the first figure, only this change will be pulled or pushed while in the other image, both `keras-test.py` and the layer containing the `matplotlib` package need to be pulled and pushed, since the `matplotlib` layer is not independent of the `keras-test.py` layer which is above it.

It's a good practice to consider the frequency of changes to the layers in our images and order them appropriately to enhance the performance.

#### The Docker container runtime
Docker has a CLI tool for deploying its containers. 

Here is an example command syntax of running an image:

```bash
$ docker container run --publish 8080:80 <image-name>
```

After starting the image, it maps port 8080 on our localhost to port 80 in our container. 

Click [here](https://phoenixnap.com/kb/docker-run-command-with-examples) to read more on the `docker run` command.

#### Limiting memory and CPU usage
We can restrict our resource utilization and enforce fair usage of our hardware resources.

To limit memory usage, we place the `--memory` and `--memory-swap` flags in the `docker run` command. 

For example:

```bash
$ docker run -d --name <your-image> \
--publish 8080:80 \
--memory 600m \
--memory-swap 2G \
```

Here we have limited our image to use 600MB of RAM and 2 GB of swap space.

We do the same for the CPU by using the `--cpu-shares` and `--cpu-period` flags.

Consider four containers: W, X, Y, and Z. W has a cpu-share of 1024 while the rest have a share of 512 each. When all the containers attempt to use 100% of CPU at the same time, W would receive 50% of the total CPU time while the rest get 16.667% each.

```bash
$ docker run -d --name <your-image> \
--memory 600m \
--memory-swap 2G \
--cpu-shares 1024 
```

The `--cpu-period` sets the usage period of the CPU by the images. It works hand in hand with the `--cpu-quota` which is used to allocate the amount of time in microseconds that a container has access to the CPU resources as a function specified by `--cpu-period`. 

For example, to set 50% CPU worth of run-time every 25ms we use this command:

```bash
$ docker run -d --cpu-period=25000 --cpu-quota=12500 <your-image>
```

Click [here](https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources) to read more on resource utilization.

#### Cleanup
Deleting an image can be done by using the `docker rmi` command:

```bash
$ docker rmi <tag-name>
```

OR

```bash
$ docker rmi <image-id>
```

#### Conclusion
This article has given us a brief overview of Docker container images and how to manage them. Hope you got some insights on application images and how you may optimize them for improved performance. Follow the links provided in the article to read more.

Have a good one.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
