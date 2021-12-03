---
layout: engineering-education
status: publish
published: true
url: /understanding-docker-networking/
title: Understanding Docker Networking
description: This article will discuss the importance of Docker containers. It also highlights some of the key networking drivers.
author: pauline-mwangi
date: 2021-07-07T00:00:00-06:15
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-docker-networking/hero.jpg
    alt: Understanding Docker Networking Hero Image
---
Containers are a popular way of deploying applications on different platforms. In some cases, containers need to communicate with one another. This process can be achieved through [Docker networking](https://docs.docker.com/config/containers/container-networking/).
<!--more-->
Docker has a networking model that allows containers to communicate automatically. Furthermore, it supports communication to the same or different hosts and the outside world. This article will help you understand how to manage connections between Docker containers.

Networking is a critical aspect of container deployment and management. Therefore, having excellent networking skills can help you become more productive.

### Table of contents
- [Docker networking](#docker-networking)
- [Why Docker networking is important](#why-docker-networking-is-important)
- [Container network models](#container-network-models)
- [Network drivers](#network-drivers)

### Prerequisites
To follow along with this article, you need a comprehensive understanding of [Docker](https://www.section.io/engineering-education/docker-concepts/). You can learn more about Docker networking from [here](https://docs.docker.com/network/).

### Docker networking
Docker networking initiates communication between Docker containers and the external world through the [host machine](https://docs.docker.com/network/host/). This is achieved through the use of a container network model (CNM). The model outlines the required steps to provide networking for containers using drivers.

Docker relies on several [drivers](https://www.docker.com/blog/understanding-docker-networking-drivers-use-cases/) for networking. They include bridge, overlay, and Macvlan network drivers. 

The criteria for choosing a network depends on the purpose and function of your container. A huge advantage of the Docker network is that it isolates containers from the internet. This, therefore, serves as an extra layer of security. Network isolation also ensures that everything is executed the right way.

The Docker networking design focuses on two major areas; portability and extensibility. The portability aspect aims at allowing applications to behave the same way in different environments.

Docker also provides a tremendous amount of functionality and technology through extensibility. For instance, APIs and other resources can be connected to containers through networking.

### Why Docker networking is important
Docker allows network administrators to configure multiple networks and add containers to one or more of these networks. 

One issue that Docker seeks to resolve is incompatibility. For instance, you have an application that works well on your computer but fails to display the same performance on another person's system. In such cases, the application's performance is affected by the different hardware and software properties. This issue can be resolved quickly through Docker networking. 

Docker networking helps to reduce the amount of workload on a system. Therefore, the extra processing power can be used to perform other operations.

### Container network models (CNM)
CNM can be regarded as a [libnetwork](https://github.com/moby/libnetwork). 'Libnetwork' is basically a remote network driver for connecting containers. Its objective is to provide a CNM that enables programmers to provide the abstraction of network libraries.

The libnetwork is managed by Docker in collaboration with its intensive community. CNM introduces interoperation between networks. It conceptualizes the steps needed to provide networking for containers. 

CNM needs a distributed key-value store like a console to reserve the network configurations. It supports both [IPAM plugins](https://www.cni.dev/plugins/current/ipam/static/) and [network plugins](https://docs.docker.com/engine/extend/plugins_network/). IPAM plugin APIs are used to add or remove address ports, as well as assign or reassign IP addresses.

Network plugins are used to create or delete networks. They can also help to add or remove containers from the network. The CNM includes the following objects:

- Network - A set of endpoints that can talk directly with one another.
- Network controller - It grants entry into the libnetwork.
- Network drivers - It provides the actual implementation that makes the network work.
- End Point - It provides connectivity for applications in a container network. 
- Sandbox - It represents container network configuration.

### Network drivers
Docker uses network plugins to connect containers with the host. This seamless network integration is a critical factor for container portability. Applications can run inside containers or non-containerized systems on the network.

Docker implements a pluggable network system to provide maximum flexibility. As a result, plugins do the most work to enhance Docker networking. Examples of drivers include bridge, overlay, macvlan, host, and none networks.

#### Bridge networking
A bridge network `bridge` is created by default whenever you create a Docker container. Bridge network drivers support communication for containers on the same Docker host.

The bridge network creates and assigns containers with an IP address on the host machine. The containers can then communicate with each other using this IP address. 

#### Overlay networking
Overlay network drivers focus on containers on different networks or hosts. For example, if you want to run Docker on distributed networks, an overlay network is the right choice. This is because it enables containers on different hosts to communicate directly with one another. [Docker Swarm](https://docs.docker.com/engine/swarm/) is responsible for the creation of an overlay network. 

Docker swarm makes an internal private network to span every node in the swarm cluster. It then attaches containers to this driver using the network option and thus allows containers to communicate with each other.

#### Macvlan networking
Macvlan driver simplifies the communication process by allocating a MAC address to Docker containers. Therefore, the Macvlan driver is relevant when connecting the container directly to a physical network rather than a Docker host.

#### Host networking
The host network uses the host's IP address and TCP port to interact with the service running in the Docker container. In other words, host networking allows you to connect containers to the internet.

The host network driver effectively disables the network isolation thus, connecting the Docker host and the containers. This means that the host driver does not support multiple containers on one instance. This is because the IP address is only assigned once. Unlike the bridge driver, where each container has its IP address, the host network IP address does not change.

#### None networking
In a None network, Docker containers have no access to external networks nor communication with other containers. This network driver puts these containers in total isolation. Therefore, the None driver is used when you want to disable the networking functionality for a specific container.

### Conclusion
Docker networking is indeed essential and valuable. When deploying Docker containers, you need to link them to the same network. This article has covered the basics of Docker networking. You can, therefore, use this knowledge to manage containers more effectively. 

#### Further reading
- [Deploying a Simple Streamlit app using Docker](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/)
- [Top 5 Docker Logging Practices](/engineering-education/top-5-docker-logging-practices/)
- [How to Containerize a Python Application](/engineering-education/how-to-containerize-a-python-application/)
- [Using ECS to deploy a docker app to AWS](/engineering-education/using-ecs-to-deploy-docker-app-to-aws/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
