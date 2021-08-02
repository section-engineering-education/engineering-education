### Introdution
With Docker, you can build, test, and deploy applications in the form of portable containers that can be used nearly anywhere. When using Docker, you might quickly get a huge number of useless items, which take up a lot of disk space and clog up the Docker command output. Unless you specifically instruct Docker too, it will not delete unneeded items like containers, images, volumes, or networks. Some of the most effective techniques to manage Docker Containers directly from the Command Line Interface are discussed in this article. We will look at some real-world examples of the most often used but very effective and efficient Docker commands that will make your Docker system organized and save up disk space by deleting unneeded Docker containers, images, volumes, and networks.

### Table of contents
- [Using Interactive Shell to Run a Docker Container](#using-interactive-shell-to-run-a-docker-container)
- [Remove all the Dangling Volumes](#remove-all-the-dangling-volumes)
- [Removing Docker Containers and Images](#removing-docker-containers-and-images)
- [Using Aliases](#using-aliases)
- [Inspecting Docker Containers](#inspecting-docker-containers)
- [Conclusion](#conclusion)

### Using Interactive Shell to Run a Docker Container
An interactive shell reads and writes to a user's terminal in most cases. Interactive behavior is enabled when the bash command is used without any non-option arguments, unless the option is a text to read from or the shell is started to read from standard input, in which case positional parameters can be provided.

Assume you have used the following command to get an Ubuntu image from Docker Hub:

```bash
sudo docker pull ubuntu
```

Now you want to use an interactive shell to execute the Ubuntu container. To change or install packages, you will use bash on the Ubuntu OS after obtaining a Docker Ubuntu Image from the official `Docker registry`. The Docker registry is a platform that hosts images. You may do so by using the `-I` flag to execute the Docker Container in interactive mode.

To accomplish this, use the following command:

```bash
sudo docker run -it ubuntu
```

### Remove all the Dangling Volumes
Docker Volumes may be mounted with Docker Containers to share files and directories among many Docker Containers. When you delete Docker Containers, the Docker Volumes linked with them remain. Docker Volumes are exactly what they sound like. A list of all Dangling Docker Volumes may be obtained with the following command:

```bash
sudo docker volume ls -f dangling=true
```

> While deleting Docker Volumes, you may use the `-v` flag to avoid leaving behind Dangling Volumes.

```bash
sudo docker rm -v <name-of-the-container>
```

To list the Docker Containers that are now executing, use the following sequence of instructions. Stop the specific Container and Remove it with the -v flag to prevent leaving Dangling Volumes behind.

> Run the following commands one at a time.

```bash
sudo docker container ls
sudo docker stop my-container-01
sudo docker rm -v my-container-01
```

### Removing Docker Containers and Images
Docker containers are not automatically deleted when they are stopped unless they are started using the —rm parameter. However, before deleting a Docker Container, you must first ensure that it is not operating. Containers can be stopped and deleted with the following instructions.

```bash
sudo docker ps -a
sudo docker stop <name-of-the-container>
sudo docker rm <name-of-the-container> 
```

The first command lists all of your system's Containers. The Container's state may be found in the Status column. Stopping the Container before removing it is required if it has not been exited. You must know the Container ID of the containers you want to delete before you may delete them.
Remove all the Containers linked with a Docker Image before removing it using the command below:

```bash
sudo docker rmi <The-ID-of-the-image>
```

### Using Aliases
There are times when we must repeat the same command-line instruction, which is made more difficult if the command in question contains parameters, and much more so if we must change the output to make it legible. Most of us end up making some sort of cheat sheet to keep track of all those complicated commands in case we need to execute them again.

We may save time and effort by utilizing an `alias command` to avoid typing or duplicating the same command over and over again. Aliases allow us to execute a command or a group of instructions using a pre-defined `string` that we can tailor to our liking.

Simply create and use aliases in your `/.bashrc file` and mention them to manage utilizing aliases.

```bash
alias dockrm='docker rm'
alias docklist='docker ps -a'
```

### Inspecting Docker Containers 
The Docker Inspect Command may be used to acquire information about a specific Docker Container. It provides you with all of the information about the Container, including the path, creation date, status, driver, and so on. The Container Name is required to check the Container.

```bash
sudo docker container ls 
sudo docker container <name-of-the-container>
```

### Conclusion
In this article, we learned ways of managing Docker containers using the command line interface. We accomplished this by running a Docker Container in Interactive Shell, removing all the Dangling Volumes, removing Docker containers and images, inspecting docker containers, and finally by using Aliases. I would urge the reader to use the knowledge gained from this article to keep their docker system organized and save up disk space by deleting unneeded Docker containers, images, and volumes
