# Getting Started with Docker

Docker is in the rage these days, and for some good reason. It allows you to run instances of an application inside of a container. A container is similar to a virtual machine, but instead of running a full operating system, it runs the minimal runtime requirements of an application or set of applications.

## Versions

Docker comes in two different versions:

Docker-CE is the Community Edition, which is free to use but does not come with any paid support. If you have any issue you will have to use the community forums and read through the documentation.

Docker-EE is the Enterprise Edition, which is the licensed version and allows for support contracts with Docker (the company), SLAs, Image management, and other features.

# Installation

- *For Ubuntu*:

First, update your packages:

```
 sudo apt update
```

Next, install docker with apt-get:

```
 sudo apt install docker.io
```

Finally, verify that docker is installed correctly:

```
 sudo docker version
```
You should see the installation details. It gives you information about the Client and Server version, the Go-lang version, and so on and so forth.

If the output of your command is somehow like the one below, Congrats!!!!!
```
Client: Docker Engine - Community
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12
 Git commit:        633a0ea838
 Built:             Wed Nov 13 07:25:58 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.12.12
  Git commit:       633a0ea838
  Built:            Wed Nov 13 07:24:29 2019
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.2.10
  GitCommit:        b34a5c8af56e510852c35414db4c1f4fa6172339
 runc:
  Version:          1.0.0-rc8+dev
  GitCommit:        3e425f80a8c931f88e6d94a8c831b9d5aa481657
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683

```

- *For MacOSX*: you can follow this [link](https://docs.docker.com/docker-for-mac/install/).

- *For Windows*: you can follow this [link](https://docs.docker.com/docker-for-windows/install/).


With the basic installation of Docker you’ll need to run the `docker` command as `sudo`. However, you can add your user to the `docker group`, and you’ll be able to run the commands without `sudo`.
```
 sudo usermod -aG docker ${USER}
 su - ${USER}
```

Running these commands will add you user to the `docker group`. To verify this, `run $ id -nG` and if you get back an output with your username in the list rest assured you did everything right.


# Creating Your First Docker Image

Now, let's create our first docker image by pulling it from Docker Hub. First let's search the Hub for an image called "hello-world"

```
docker search hello-world
```
This will list all the available images called "hello-world". At the top of the list you should see an image called "hello-world". Let's pull that image and test it out.

```
docker pull hello-world
```
Result:
```
Using default tag: latest
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete 
Digest: sha256:49a1c8800c94df04e9658809b006fd8a686cab8028d33cfba2cc049724254202
Status: Downloaded newer image for hello-world:latest
docker.io/library/hello-world:latest                                       
```

We just pulled our first docker image from the Docker Hub.

## Docker Commands

Now it’s time to get our hands dirty with Docker commands, for which we all have been waiting till now.

### docker create 
Creates a container from an image.

```
 docker create hello-world
```
Result:
```
fa622c1b5eec67139c97a0c0db2a0b306012c504ddfdf53eee7b0c143945667a
```
NOTE: When a container is created, it is given a unique ID.

### docker ps 
Lists running containers, optional -a flag to list all containers.
```
 docker ps -a
```
Result:
```
CONTAINER ID        IMAGE                        COMMAND                CREATED             STATUS                      PORTS               NAMES
1a203a1e19a2        dockerinaction/hello_world   "echo 'hello world'"   12 minutes ago      Exited (0) 12 minutes ago                       distracted_elion
1e752a38edab        hello-world                  "/hello"               26 minutes ago      Exited (0) 25 minutes ago                       reverent_mcclintock
fa622c1b5eec        hello-world                  "/hello"               31 minutes ago      Created                                         tender_lichterman
6ff606cb1715        fce289e99eb9                 "/hello"               13 days ago         Exited (0) 13 days ago                          sharp_cori
57f793054be9        fce289e99eb9                 "/hello"               10 months ago       Exited (0) 10 months ago                        cool_chaplygin

```

### docker start 
This command starts any stopped container(s).

Some of the examples of using this command are shown below:
```
docker start fa622
```
In the above example, Docker starts the container beginning with the container ID fa622.
```
docker start cass_ubuntu
```
Whereas in this example, Docker starts the container named cass_ubuntu.

### docker stop
This command stops any running container(s).It is similar to the docker start command.

We can stop the container either by specifying the first few unique characters of its container ID or by specifying its name.
```
 docker stop fa622
```

###  docker run 
This command first creates the container, and then it starts the container. In short, this command is a combination of the docker create and the docker start command.

```
docker run ubuntu /bin/echo 'Hello world'
```
Result:
```
Unable to find image 'ubuntu:latest' locally  
latest: Pulling from library/ubuntu  
6b98dfc16071: Pull complete  
4001a1209541: Pull complete  
6319fc68c576: Pull complete  
b24603670dc3: Pull complete  
97f170c87c6f: Pull complete  
Digest:sha256:5f4bdc3467537cbbe563e80db2c3ec95d548a9145d64453b06939c4592d67b6d  
Status: Downloaded newer image for ubuntu:latest  
Hello world
```

### docker images
This command lists out all the Docker Images that are present on your Docker Host.
```
 docker image ls

REPOSITORY                    TAG                 IMAGE ID            CREATED             SIZE
hello-world                   latest              bf756fb1ae65        6 months ago        13.3kB
hello-world                   <none>              fce289e99eb9        19 months ago       1.84kB
dockerinaction/hello_world    latest              a1a9a5ed65e9        4 years ago         2.43MB
kitematic/hello-world-nginx   latest              03b4557ad7b9        5 years ago         7.91MB
```

### docker container rm
This command delete container(s). To remove one or more Docker containers, use the `docker container rm` command, followed by the IDs of the containers you want to remove.
```
 docker container rm 1a203a1e19a2
```
*NB: The containers need to be in a stopped state in order to be deleted*.

### docker image rm
This command delete image(s). To remove one or more Docker images first you need to find the images IDs. Use the `docker images ls` command to find the IDs.
```
 docker image rm fce289e99eb9
```
*NB: To remove the image, you will have to remove the container first.*

You can also get help by simply asking for it.
```
docker --help
```
This above line with list out all available commands, here is a sample output.

```
Usage:	docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default
                           "/root/.docker")
  -c, --context string     Name of the context to use to connect to the
                           daemon (overrides DOCKER_HOST env var and
                           default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level
                           ("debug"|"info"|"warn"|"error"|"fatal")
                           (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           "/root/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default
                           "/root/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default
                           "/root/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  engine      Manage the docker engine
  image       Manage images
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

```


# Writing Your First Dockerfile

A DockerFile is a text file that contains instructions on how to to build a docker image. A  DockerFile is a text file that contains instructions on how to to build a docker image. To build a Docker image, you need to create a Dockerfile. Below are some Dockerfile instructions that you should know:

- FROM — set the base image
- RUN — execute a command in the container
- COPY — supports the basic copying of local files into the container
- ENV — set environment variable
- WORKDIR — set the working directory
- ENTRYPOINT — set the image’s main command, allowing that image to be run as though it was that command 
- VOLUME — create mount-point for a volume
- CMD — set executable for container

For eample, let's see what a Dockerfile for a Go application could look like:
```
FROM golang:1.11-alpine 

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["app"]
```

*Be sure to always indicate a specific version of the base image you would like to use because you never know when the ‘Latest’ image will be changed*. 

You can then build and run the Docker image:
```
 docker build -t my-golang-app 
```
This command will create an image tagged `my-goland-app` from your Dockerfile

```
 docker run -it --name my-running-app my-golang-app
```
With this,the container/image is in production ready.

# Conclusion

Docker is a powerful tool for creating and running distributable, lightweight applications both locally and in production.Many CI/CD tools like Jenkins, CircleCI, TravisCI, etc. are now fully support and integrated with Docker, which makes diffusing your changes from environment to environment is now a breeze.This tutorial has just scratched the surface of the Docker world.

## Resources

[Docker Guide](https://docs.docker.com/get-started/)

[Docker Cheatsheet](https://medium.com/statuscode/dockercheatsheet-9730ce03630d)

[Dockerfile Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

[Play with Docker](https://labs.play-with-docker.com/), which is an online playground for Docker. It allows users to practice Docker commands immediately, without having to install anything on your machine. The best part is it’s simple to use and available free of cost.