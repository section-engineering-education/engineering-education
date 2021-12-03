---
layout: engineering-education
status: publish
published: true
url: /docker-push-for-publishing-images-to-docker-hub/
title: Docker Push for Publishing Images to Docker Hub
description: This article guides the reader on how to create a Dockerfile, create an account in Docker Hub,and how to push Docker images to a registry.
author: oruko-pius
date: 2021-07-31T00:00:00-06:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/docker-push-for-publishing-images-to-docker-hub/hero.jpg
    alt: Docker Push for Publishing Images to Docker Hub example image
---

Dockerfiles use has been on the rise in creating Docker containers. The untouched bit on Dockerfiles that rarely gets a mention is its trivial advantage in creating a Docker image to which users can push to an online repository in Docker Hub. 
<!--more-->
This makes it easy to share Docker images across various public and private repositories, and registries. This gives users more flexibility in creating earlier versions of Docker images. 

In this article, we'll discuss how to create a Dockerfile, and create an account in Docker Hub from where we'll create a repository. We'll also cover how to push Docker images to a registry.

This article will be beneficial for individuals who already have knowledge in Docker and readers with fundamentals of container technology.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Creating a Dockerfile](#creating-a-dockerfile)
3. [Creating a repository on Docker Hub](#creating-a-repository-on-docker-hub)
4. [Build Docker Image using Docker Hub and for organization](#build-docker-image-using-docker-hub-and-for-organization)
5. [Pushing Docker image](#pushing-docker-image)
6. [Pushing the Docker image to a Non-Docker-Hub registry](#pushing-the-docker-image-to-a-non-docker-hub-registry)
7. [Conclusion](#conclusion)

### Prerequisites
To get started, we have to install Docker on our system. Check out this amazing [article](/engineering-education/getting-started-with-docker/) on Getting Started with Docker.

> Note that we will be using `Ubuntu 20.04` in this tutorial.

If you're not using Ubuntu be sure to review the official [documentation](https://docs.docker.com/engine/install/) on how to install Docker on your Operating System environment.

### Creating a Dockerfile
Before we publish a Docker image, it will be appropriate to build one. First, let's understand what a Dockerfile entails. 

A Dockerfile is a content file comprising of specific commands used to generate a Docker image. Let's proceed and create one. In your terminal, create a directory and move into the directory created with the command below:

```
mkdir TestDocker
cd TestDocker
```
Create a file called `Dockerfile` with the command below:

```
touch Dockerfile
```

Since the file we created is empty, open it via a text editor of your choice and update the file as shown below:

```
FROM linux

MAINTAINER testUser

RUN apt-get update

CMD ["echo", "Welcome to Dockerfile"]
```

* **FROM** - specifies the prop of the created image. It can start from the base image or the root image.
* **MAINTAINER** - Defines the author of that particular image. It can take a first name, last name, or email. 
* **LABEL** attribute can be used to highlight more about the image. Its use is optional depending on how applicable it is when creating your Dockerfile.
* **RUN** - It is a command that carries the set of instructions for executing the Dockerfile while building the image.
* **CMD** - The command provides a revert for a Dockerfile that's executing.

To check the content of the `Dockerfile` you can use the `cat` command in the terminal:

```
oruko@oruko-ThinkPad-T520:~/Documents/TestDocker$ cat Dockerfile
FROM ubuntu

MAINTAINER testUser

RUN apt-get update

CMD ["echo", "Welcome to Dockerfile"]
```

### Creating a repository on Docker Hub
Now that we have created our Dockerfile let's create a repository within Docker before we push it to an online repository.
If you're well-acquainted with the way Github works, then Docker hub isn't that different from it. 

So head over to [Docker Hub](https://hub.docker.com/) and register an account. After signup, click the `Repositories` tab in the navbar, you'll see a form like the one shown below:

![repository](/engineering-education/docker-push-for-publishing-images-to-docker-hub/repo.jpg)

Create a repository called `docker-push` as that is the example we'll be using throughout the article. Now that our repository is set, let's create an image from Docker and push it to the repository we created earlier.

### Build Docker Image using Docker Hub
To build an image in Docker the command below is used:
 ```
 docker build -t username/repository_name .
 ```

The `-t` flag helps when dealing with various images in identifying which name they belong to. The `username` is your Docker hub name, and the `repository_name` in this case is `docker-push`; the repository we created earlier. We add a period in the folder of the Dockerfile.

With this hindsight, let's proceed and build our Docker image. Execute the command below changing the username with yours as it appears in the Docker hub and the repository with `docker-push`:

```
docker build -t bullet08/docker-push .
```

For more about Docker Hub commands check this [documentation](https://docs.docker.com/docker-hub/repos/).

The same approach is used when building Docker images for organizations. All you need to do is change the username with the organization's account name and Docker hub repository of the organization.

### Pushing Docker image
Before we push the Docker image, we need to log into Docker hub. We can do this effortlessly using the command-line:

```
docker login
```

Once validated, we can push our container to the Docker hub.
To push our container to the Docker hub, we use the commands below:

```
docker push bullet08/docker-push
```
With that done, our Docker image is now available in Docker Hub. You can see it by visiting your repository.

### Pushing the Docker image to a Non-Docker-Hub registry
A Docker registry is a memory board for Docker images that enable Docker users to pull built images to their local machines and push new images to the registry. 

So far, we have covered how to build a Docker image using our username. As this is important for individuals using the Docker Hub registry service, the procedures change a bit when pushing to the non-Docker-Hub registry. 

We append our registry to our username when building for the non-Docker-Hub-Registry. The example below shows an example of building an image for a registry at `registry.test.com`.

```
docker build -t registry.test.com/bullet08/docker-push .
```

We use the same command when logging into our Docker Hub before pushing our image:

```
docker login registry-test.com
```

To push our built image to the Docker repository,  we use the command we used earlier but now we change it to be our registry:

```
docker push registry.test.com/bullet08/docker-push
```

We have not only succeeded in pushing our Docker images we created earlier, but also other registries.

### Conclusion
In this article, we learn about the Docker Hub, building Docker images for both our usernames and organization. We then pushed those Docker images to our Docker Hub repository and the non-Docker Hub. 

For more information on getting to understand Docker Hub, check out their official [documentation](https://docs.docker.com/docker-hub/).

Happy Coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
