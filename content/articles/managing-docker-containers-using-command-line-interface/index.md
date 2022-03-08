---
layout: engineering-education
status: publish
published: true
url: /managing-docker-containers-using-command-line-interface/
title: Managing Docker Containers using the Command Line Interface
description: In this article, we will learn some of the most effective techniques to manage Docker Containers directly from the command line interface.
author: ruth-ngonyo
date: 2021-08-17T00:00:00-14:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/managing-docker-containers-using-command-line-interface/hero.png
    alt: Managing Docker Containers using the Command Line Interface
---
In this article we will discuss some of the most effective techniques to manage Docker Containers directly from the command line interface. We will look at some real-world examples of the most often used but very effective and efficient Docker commands. These docker commands make your Docker system organized and save up disk space by deleting unneeded Docker containers, images, volumes, and networks.
<!--more-->
### Introduction
With Docker, you can build, test, and deploy applications in the form of portable containers that can be used nearly anywhere. When using Docker, you might quickly get a huge number of useless items, which take up a lot of disk space and clog up the Docker command output. Unless you specifically instruct Docker to delete, it will not delete these unneeded items like containers, images, volumes, and networks.

### Table of contents
- [Using interactive shell to run a docker container](#using-interactive-shell-to-run-a-docker-container)
- [Remove all the dangling volumes](#remove-all-the-dangling-volumes)
- [Removing docker containers and images](#removing-docker-containers-and-images)
- [Using aliases](#using-aliases)
- [Examining Docker containers](#examining-docker-containers)
- [Conclusion](#conclusion)

### Using interactive shell to run a docker container
In most circumstances, an `interactive shell` reads and writes to the user's terminal. Interactive behavior is enabled when the bash command is used without any non-option arguments, unless the option is a text to read from or the shell is started to read from standard input. In this case, positional parameters can be provided.

Assume you have used the following command to get an Ubuntu image from Docker Hub:

```bash
sudo docker pull ubuntu
```

Now you want to use an interactive shell to execute the Ubuntu container. After downloading the Docker Ubuntu image from the official Docker [registry](https://hub.docker.com/_/ubuntu/), you will use bash on the Ubuntu OS to edit and install packages. The Docker registry is a platform that hosts images. You may do so by using the `-I` flag to execute the Docker Container in interactive mode.

To do this, use the following command:

```bash
sudo docker run -it ubuntu
```

### Remove all the dangling volumes
Docker volumes may be mounted with Docker Containers to share files and directories among many Docker Containers. When you delete Docker Containers, the Docker volumes linked with them remain. Volumes in Docker are precisely what they sound like. 

With the following command, you can get a list of all dangling docker volumes:

```bash
sudo docker volume ls -f dangling=true
```

> To avoid leaving dangling volumes while deleting Docker volumes, use the `-v flag`.

```bash
sudo docker rm -v <name-of-the-container>
```

To list the Docker containers that are currently executing, use the following sequence of instructions. Stop the specific container and remove it with the `-v` flag to prevent it from leaving dangling volumes behind.

>One by one, run the commands below:

```bash
sudo docker container ls
sudo docker stop my-container-01
sudo docker rm -v my-container-01
```

The first command shows a list of all Docker containers that are currently running. After viewing the names of all the Docker containers, you can stop a specific container using the second command `sudo docker stop my-container-01`. The name of the container is written after the word `stop`.

### Removing Docker containers and images
Docker containers are not automatically deleted when they are stopped. They only get deleted using the `—rm` parameter. But, before deleting a Docker container, you must first ensure that it is not operating. 

Containers can be stopped and deleted with the following instructions:

```bash
sudo docker ps -a
sudo docker stop <name-of-the-container>
sudo docker rm <name-of-the-container> 
```

The first command lists all your system's containers. The container's state may be found in the status column. Stopping the container before removing it is required if it has not been exited. You must know the container ID of the container you want to delete before you delete them. The abbreviation `rm` represents remove.

Remove all the containers linked with a Docker image before removing it using the command below:

```bash
sudo docker rmi <The-ID-of-the-image>
```

From the command above, `sudo` permits users to run programs with another user's security rights. The `docker` command shows that we are executing the command to a docker. The `rmi` command removes the docker objects specified by the name given.

### Using aliases
There are times when we must repeat the same command-line instruction, which is made more difficult if the command in question contains parameters. More so if we must change the output to make it legible. Most of us end up making some sort of cheat sheet to keep track of all those complicated commands in case we need to execute them again.

We may save time and effort by utilizing an `alias` command to avoid typing or duplicating the same command over and over again. Aliases allow us to execute a command or a group of instructions using a pre-defined 'string' that we can tailor to our liking.

To handle aliases, create and use aliases in your `/.bashrc` file and mention them.

```bash
alias dockrm='docker rm'
alias docklist='docker ps -a'
```

Each of the commands above is used to create an alias. The first command creates an alias to remove a docker container and the second command is used to create an alias to display all the docker containers specifying both running and not running containers when called in the `/.bashrc`. The `ps` represents the process state while `-a` prompts the docker containers that are not running to appear in the list.

### Examining Docker containers 
The Docker `inspect` command may be used to get information about a specific Docker container. It provides you with all the information about the container, including the path, creation date, status, driver, and so on. The container name is required to check the container.

```bash
sudo docker container ls 
sudo docker container ls -a
sudo docker container inspect <name-of-the-container>
```

The command `sudo docker container ls` shows a list of all Docker containers that are currently running. To view the Docker containers that are not running, add `-a` after the `ls` command. The `ls` symbol in a terminal displays all directories of the specified item.

### Conclusion
In this article, we learned about using the command-line interface to manage Docker containers. We accomplished this by running a Docker container in an interactive shell, removing all the dangling volumes, Docker containers and images. We then inspect the Docker containers, and we learned about using aliases. 

I would urge a reader to use the knowledge gained from this article to keep their Docker system organized and save up disk space by deleting unneeded docker containers, images, and volumes.

Happy learning!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
