---
layout: engineering-education
status: publish
published: true
url: /overview-of-container-technology/
title: Overview of Container Technology
description: This article aims to discuss container technology. It will go through the basics of containers and how do they are different from virtual machines.
author: julie-ruguru
date: 2021-07-02T00:00:00-18:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/overview-of-container-technology/hero.jpg
    alt: Container Technology image example
---
Container technology is growing at a tremendous rate. Several decades ago, we could only deploy a single application on a single operating system (OS). If you wanted to deploy many applications, you required more servers or operating systems. Around a decade ago, they introduced [virtualization](https://en.wikipedia.org/wiki/Virtualization) technology.
<!--more-->
It used hypervisor software that could split up the server to host more than one OS. Servers got the option of hosting more than one application but still had only one application per operating system.

Go through this [article](/engineering-education/history-of-container-technology/) to explore the history of container technology.

This article aims to discuss container technology. It will go through the basics of containers and how do they are different from virtual machines.

### Table of contents
- [Container technology](#container-technology)
- [Understanding containers](#understanding-containers)
- [Difference between containers and virtual machines](#difference-between-containers-and-virtual-machines)
- [Classifications of containers](#classifications-of-containers)
- [Advantages of containers](#advantages-of-containers)
- [Disadvantages of containers](#disadvantages-of-containers)

### Prerequisites
A thorough understanding of [containers](/engineering-education/topic/containers/) is essential before reading this article.

### Understanding containers
A container is a standard unit of software that functions like a fully provisioned machine installed with all the software needed to run an application. Think of a computer within a computer. It is a way of packaging software so that applications and their dependencies have a self-contained environment to run in.

Containers enable an application and its dependencies to run efficiently. They are widely used because of their services. 

Below are services containers offer:
- Containers are lightweight. Therefore, they can easily be deployed and run on different computing environments.
- Containers take up less disk space and are relatively faster in executing the applications.
- Containers run the applications in an isolated manner.
- Containers are highly secure. Container policies ensure all applications are highly secure.
- Containers are portable and can run anywhere across the docker ecosystem.
- Containers save time in the deployment process of an application.

### Container technology
Container technology makes it easy and more appropriate to design, develop and deploy applications. It allows enterprises to place applications in a container, and many containers can run on a single OS.

Enterprises and major cloud computing platforms, including Google Cloud, Amazon Web Services (AWS), and Microsoft Azure, have embraced container technology. This is because container technology allows enterprises to put applications in containers and run on a single operating system. 

They offer [Container-as-a-Service (CaaS)](/engineering-education/getting-started-with-container-as-a-service/) products as well.

That increases the efficiency of the servers and makes apps' deployment faster. Think of having multiple containers on one OS, and many operating systems on your server.

Moving applications from one computing environment to another can be a problem. This may be due to the differences in computer systems, hardware, and software. Containers are the solution to this problem. They enable the applications to run seamlessly and reliably.

To solve this problem. A container is made up of an application and its dependencies (libraries, binaries, and configuration files) bundled into one package. Therefore it works efficiently in different computing environments.

In simpler terms, containers allow software or applications to run consistently from one computing environment to another.

### Difference between containers and virtual machines
Virtualization is the technology of running a virtual instance of a computer system like hardware, software, storage devices, and computer network resources on the cloud. A virtual machine is an isolated computing environment that allows developers to use an OS via a computer system.

Containerization and virtualization are two different ways to deploy applications and micro-services in a computing environment.

Virtual machines (VMs) include the entire operating system along with the application. Also, the hypervisor is needed to run along with the applications to control the VM.

![Containers vs Virtual Machines](/engineering-education/overview-of-container-technology/containers-vs-virtual-machines.jpg)

[Image source](https://www.weave.works/blog/a-practical-guide-to-choosing-between-docker-containers-and-vms)

Below is a tabular comparison of containers and virtual machines:
| Containers      | Virtual Machines     |
| :------------- | -----------: |
|  Have good performance | Have unstable performance    |
| Data volumes are shared and used among many containers   | Data volumes cannot be shared |
| High-efficiency | Low efficiency
| Easily portable across different platforms | Have compatibility issues while moving across different platforms

Containers are efficient unlike VMs, containers consist of applications that are easily portable across different platforms.

### Classifications of containers
Containers are classified into application containers and operating system containers.

#### Application containers
Application containers are designed to package and run services as a single process. Container technologies such as Docker and Rocket are examples of application containers.

Docker is the widely adopted container service provider. It encapsulates the files, dependencies, and libraries of an application to run on an OS. On the other hand, Rocket enables better security, flexibility, and portability of image sharing.

#### Operating System containers
OS containers play the same role as virtual machines. They share the host OS kernel and provide application isolation.

OS containers allow you to install and run different applications and libraries. Applications running in each container use resources that are allocated to only that container.

OS containers run multiple processes and services at the same time on the same OS. Therefore, container technologies such as LXC, Solaris zones, Linux VServer, and OPEN VZ are suitable for creating OS containers.

### Advantages of containers
1. No external dependencies: containers lack external dependencies for containers to run. They are just used to host and run the applications.
2. Portability: containers are quickly shipped to other computers and executed in different computer environments regardless of their host OS.
3. Data is easily shared among multiple containers.
4. Isolation: applications are executed in isolation regardless of sharing the OS kernel with other containers.
5. Enhance productivity: containers increase developers' productivity by automating services and removing conflicts and service dependencies.
6. Easy deployment and configuration: containers speed up the process of deployment and configuration.

### Disadvantages of containers
1. Containers work well on Linux. Windows has a container environment but is not supported nearly as much as Linux.
2. Containers share the OS kernel. If the kernel becomes vulnerable, all containers are affected as well.
3. [Container monitoring](https://www.section.io/adaptive-edge-engine/) is not an easy task.

### Conclusion
Container technology has gained great popularity due to its operational efficiency.
To summarize: 
- You have learned what container technology entails.
- You have also understood what containers are, how they are classified, and their pro and cons.

Happy learning!

### Resources
- [What is a Container](https://www.docker.com/resources/what-container)
- [Virtualization](https://en.wikipedia.org/wiki/Virtualization)

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
