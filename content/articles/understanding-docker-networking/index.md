Containers are a popular way of deploying applications quickly and reliably. Containers run in a set of servers or a platform. For containers to communicate with each other, it is vital to use docker networking. Docker takes care of all networking aspects so that containers can talk with each other and the Docker host.

Docker has a networking model that allows containers to communicate automatically. Also, it enables communication to the same or different hosts and the outside world. This article will give an understanding of how to manage connections between containers.

In the current world, containerization is popular among enterprises. Therefore, good networking skills are needed. As a result, networking is a significant component of container deployment and management. This article will review the networking aspects of Docker.

### Table of contents
[Docker Networking](#docker-networking)
[Why Docker Networking is Important](#why-docker-networking-is-important)
[Container Network Models](#container-network-models)
[Network Drivers](#network-drivers)

### Prerequisites
A comprehensive understanding of [Docker](https://www.section.io/engineering-education/docker-concepts/) is needed to follow along with this article. Also, go through the [networking overview](https://docs.docker.com/network/) on Docker documentation.

### Docker networking
Networking involves communication among processes. This communication entails a process updating another process that some event has occurred. In addition, communication entails transferring and exchanging data from one process to another.

Networking in Docker is no different. Docker networking initiate communication between Docker containers and the external world through the [host machine](https://docs.docker.com/network/host/). Docker utilizes a container network model (CNM) for networking. This blueprint regulates the steps needed to provide networking for containers using drivers.

Docker has various [network drivers](https://www.docker.com/blog/understanding-docker-networking-drivers-use-cases/) that enable container networking. 

Depending on how you want your container to function, you can select your Docker network. So you can connect a docker container to a specific network. The Docker network provides complete isolation to the Docker containers. So you can run different containers in distinct networks. The purpose of doing isolations is to have proper networking and executions.

The Docker Networking design philosophy is around two key areas, portability and extensibility. The portability aspect is applications behave the same way in different environments.

With extensibility, Docker provides a tremendous amount of functionality and technology. Also, they add the capability with the help of APIs and their plugin infrastructure, which you extend and include extra functionality.

### Why Docker networking is important
In the world of Docker, network administrators can configure multiple networks and add containers to one or more of these networks. However, it is important to note that containers communicate on the same network or in different networks. Therefore, strong networking skills are required while configuring a container.

Let us go through this scenario to understand why Docker networking is essential. You have an application that works well in your system and with no issues. But the same application does not work on another person's system. Now, what could be the issue? Because the application is working on one machine but not on the other.

The application does not work on another system because there is a difference in the computer systems. Also, it may be because of differences in hardware and software. The differences are possible in two different machines. The ideal solution to this problem is Docker networking.

Docker networking enables containers to talk to other containers, and once applied, it should run applications across different systems. With Docker networking, the application works fine and can work on any system. Docker networking is a crucial concept when different containers run in various networks. So it resolves most problems. You can have multiple containers running in the same network or particular networks.

### Container network models (CNM)
CNM is a [libnetwork](https://github.com/moby/libnetwork). Libnetwork is a remote network driver for connecting containers. The objective is to provide a CNM that enables programmers to provide the abstraction of network libraries.

Docker and the Docker community drive it. CNM introduces interoperation between networks. It conceptualizes the steps needed to administer networking for containers. 

CNM needs a distributed key-value store like a console to reserve the network configurations. It has configurations for [IPAM plugins](https://www.cni.dev/plugins/current/ipam/static/) and network plugins. IPAM plugin APIs are used to add or remove address ports and assign or reassign IP addresses.

The network plugins are used to create or delete networks and add or remove containers from the network. The CNM comprise of the following objects:
- Network - a set of endpoints that can talk directly with each other
- Network controllers - gives entry into the libnetwork
- Network drivers - provides the actual implementation that makes the network work 
- End Point - provides the connectivity for applications in a container network 
- Sandbox - represents container network configuration.

### Network drivers
Docker does a substantial job regarding connecting containers amidst each other and with the host. Pluggable network drivers power this functionality. Seamless network integration is a critical factor for container portability. Applications run inside containers or non-containerized systems on the network.

Docker implements a pluggable network system to provide maximum flexibility. As a result, plugins do the most work to enhance networking in Docker. Plugins are the network drivers. They execute the definite networking functionality.

The network drivers consist of the bridge, overlay, macvlan, host, and none networks.

#### Bridge networking
When you create a Docker network to enable communication between containers, a bridge network `bridge` is created by default. Also,  all newly started containers connect to it by default. Thus, bridge networks enable communication for containers on the same Docker host.

The bridge network creates an IP address on the host machine, so each container is assigned. The containers access each other using this IP. Suppose it is needed to access the containers from the outside world. Then port forwarding of these containers is performed to map the port onto the docker host.

#### Overlay networking
Overlay networking is for containers on different networks or hosts. For example, if you want to run Docker on distributed networks, an overlay network is the right choice. This is because it enables containers on different hosts to communicate directly with one another. 

The overlay driver creates a private network to Docker nodes in the Docker swarm cluster. Docker Swarm enables the creation of a new overlay network. 

Docker swarm makes an internal private network to span every node in the swarm cluster. Then attach containers to this driver using the network option and get containers to communicate with each other.

#### Macvlan networking
Macvlan driver simplifies the communication processes between containers. The network allocates a MAC address to the docker containers. Therefore, the Macvlan driver is relevant when connecting the container directly to a physical network rather than a Docker host.

#### Host networking
It is a public network. The host network uses the host's IP address and TCP port to interact with the service running in the Docker container. Suppose you want to connect to a container and use an IP address accessible from the outside world. Then host network driver gets into the picture.

The host network driver effectively disables the network isolation linking the Docker host and the containers. This means that a user cannot run many containers on one host using the host driver. This is because the IP address is assigned only once and not many times. Unlike the bridge driver, where each container is set its IP address. The host network IP address does not change. Thus there are some restrictions.

#### None networking
 In a none network, Docker containers have no access to external networks nor communication with other containers. Total isolation and private containers are done when using this network driver. The None driver is used when you want to disable the networking functionality for a specific container.

### Conclusion
Docker networking is essential and valuable. When deploying Docker containers, you need to link them to the same network. This article has covered Docker networking. To summarize, you have learned:
- Docker networking
- Why it is important
- Container network model
- Network drivers

That should give an excellent overview of how Docker networking functions in different types of network drivers.