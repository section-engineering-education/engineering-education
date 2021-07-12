To comprehend what `Docker` is and why it is used, it is necessary to first understand what `containers` are and what problems they solve. Containers are completely isolated environments built on top of an existing operating system to provide a `virtual barrier` between the app running inside and the rest of the world. Docker, on the other hand, is a piece of software that allows us to manage the lifetime of these containers.

### Table of content
 
- [Container terminologies](#container-terminologies)

- [Introduction to docker/docker engine](#introduction-to-docker-/-docker-engine) 
 
- [Reasons why we use dockers](#reasons-why-we-use-dockers)

- [Docker Windows framework necessities and establishments](docker-windows-framework-necessities-and-establishments) 

- [Conclusion](#conclusion) 

### Container terminologies

1. **Container**: A container is a Container Image that is installed during runtime. It's constructed on top of the Base machine. 
2. **Container image**: A container image is a self-contained piece of software that contains all of the code, tools, and resources needed to execute.
3. **Docker file**: It is a book record that contains directions for building a Docker picture.
4. **Docker Hub**: It is a cloud-based registry that allows you to download Docker images created by other communities.
5. **Repository**: A Docker repository is a collection of Docker images that all have the same name but differ in tags or versions.
6. **Registry**: The library is assistance liable for facilitating and circulating pictures.
7. **Docker Engine**: Docker Engine, is a piece of software that allows us to manage the lifecycle of containers, describe how they will be set up, what applications/software/services they will run within them, their networking and storage needs, and if necessary, how to quickly destroy and restart them.
8. **Docker Compose**: Docker Compose is an order line instrument for building and running applications made out of numerous Docker containers.
9. **Orchestration and cluster management**: Orchestration is a tool that monitors and manages the system. In huge compartment arrangements, tooling is crucial for screen and oversee pictures, containers, and hosts through a Command line interface (CLI) or a Graphical user interface(GUI). 
10. **Volumes**:  Volumes are documents that are mounted on the host and can be imported to different compartments. In addition, it is where all progressions are made to the host filesystem.

### Introduction to docker/docker-engine 
`Docker`, or `Docker Engine`, is a piece of software that allows us to manage the lifecycle of containers, describe how they will be set up, what applications/software/services they will run within them, their networking and storage needs, and if necessary, how to quickly destroy and restart them.

Docker runs processes within containers using `Docker images`. A Docker image is a file that a Docker container uses to run programs. Docker images, like a template, serve as a collection of instructions for constructing a Docker container. When utilizing Docker, Docker images also serve as a starting point. In `virtual machine` (VM) settings, an image is similar to a snapshot.

> Because containerization is a Linux OS feature, docker can only be installed on Linux operating systems such as Ubuntu, Fedora, Redhat, and so on. If you wish to use docker on a Windows operating system, you'll need to create a Linux virtual machine. The Docker Windows Application creates a virtual computer and runs the Docker engine on top of it automatically.

In a client-server architecture, Docker or Docker Engine is made up of three components:

1. A daemon process on a server (docker)

2. An API that allows applications to communicate with the Docker daemon process.

3. A Docker command-line interface (CLI), that allows us to run docker commands. This allows us perform various tasks on the docker daemon process.
 
The API is used by the command-line interface to interact with the Docker daemon process. Docker objects such as containers, images, networks, and volumes are created and managed by the docker daemon.

### Reasons why we use dockers

Recently, Docker has grown highly popular in the software industry. It lets developers and system admins construct and operate applications in containers, thanks to the growing need for microservices and DevOps. Here are some of the factors that contribute to Docker's popularity:

1. **It's Versatile**: You may execute a basic hello world program within a docker container, a web server such as Apache HTTP Server, or Nginx within a docker container, any heavy-weight application within a docker container, and even an operating system within a docker container. Although Docker does not advise running an operating system within a container, it is still possible to do so.

2. **Containers in Docker are freely linked.**: A container is a self-contained entity with its resource quota, networking configuration, and other features that make it easier for system administrators to replace or update one container without impacting the others.

3. **Highly secure**: Docker's Highly Secure feature ensures that containers are entirely isolated from outside processes.

4. **Docker containers are small and portable**: Docker containers are lighter than virtual machines since they just establish separate userspace and use the underlying OS Kernel of the system on which they are run.

5. **It is portable**: When we finish building an application on our local workstation and need to deploy it to production, we run into several problems with environment configuration. However, if you use Docker, you can describe the container setup procedures, and Docker will ensure that the environment is set up the same way every time you run it.

### Docker Windows framework necessities and establishments

Docker is an OS-level virtualization programming stage that assists clients with building and overseeing applications in the Docker climate with all its library conditions. Before we examine the idea of Docker Installation on Windows, let us first comprehend the arrangement/necessities to introduce Docker for Windows. 

#### Docker Windows OS system requirements:

For Dockers work area application to run as planned, your PC ought to meet the following requirements: 

1. A Windows 10 64-bit OS. Also, the `Virtualization and Containers` Windows feature should be enabled.

2. A minimum of 4GB system RAM is recommended. 

> When Hyper-V is activated on Windows, any designed VirtualBox on your framework will quit working. 

#### Docker Installation on Windows Step-By-Step. 

1. Download the docker work area for windows executable record. To download the official file, [click here](https://docs.docker.com/docker-for-windows/install).

2. Double click on the `Docker Desktop Installer.exe` to start the installation. After you have started the installation, you may be prompted to enable the `Hyper-V and Containers Windows` feature. Please ensure that you do so.

3. Accept the Terms and Agreement to allow the installation cycle to finish.

4. After completion of the installation process, click Finish and launch the Docker Desktop application.

You have successfully launched a Docker Desktop application!

### Conclusion

We learned about containers, containerization, docker or docker-engine, docker client-server architecture, and why Docker is so popular in the software business these days in this article. I urge the reader to dig deeper into docker to be a better person in software development.
