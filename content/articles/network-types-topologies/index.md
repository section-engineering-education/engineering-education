---
layout: engineering-education
status: publish
published: true
url: /network-types-topologies/
title: Introduction to Network Types and Network Topologies
description: This article will go over an introduction to network types and network topologies, some of their features, disadvantages, and advantages.
author: kanishkvardhan-a-n
date: 2020-10-22T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/network-types-topologies/hero.jpg
    alt:  network topologies example image
---
Computers are used in almost every aspect of life. They are easy to work with, can handle multiple tasks, and output accurate results. This makes agencies, enterprises, businesses, and workplaces dependent on them. Yet, the fact that they can also store and share data with other computers makes them more useful.
<!--more-->
This enables people to access them from anywhere around the world (securely of course). For this to work, computers are interlinked with one another. This interconnection between two or more computers forms a [computer network](https://en.wikipedia.org/wiki/Computer_network).

They are categorized based on their:

-  Geographical spread of network strength.
-  Type of usage and applications.
-  Mode of transmission and some other factors.

A typical networking setup requires two types of devices: **Servers and Workstations.**
[Servers](https://en.wikipedia.org/wiki/Server_(computing)) are the computers responsible for powering the network. [Workstations](https://en.wikipedia.org/wiki/Workstation) are the devices that make up the network. Some of those devices could be printers, laptops, smartphones, etc.

Data transfer and resource sharing is done from the servers. The shared materials are downloaded on the workstations in the form of data packets. The process of transferring those data packets from servers to workstations is a type of network transmission.

In some types of network transmission, wires and coaxial cables are used which allows us to share data within a building. To expand the transmission range, bridges and repeaters are used, and to expand them even further satellite communications are then used. By doing so the network extent is immensely increased from a few meters to thousands of kilometers. Here are some of the most popular types of networks in use.

### Network Types
#### Local Area Network (LAN)
Computer networks that are restricted to a small localized area are called [LANs](https://en.wikipedia.org/wiki/Local_area_network). These types of networks are used to share resources and transfer data within buildings such as schools, offices, net cafes, etc. Routers, switches, and hubs are some of the devices used to operate a LAN. All the devices that are powered by LAN, are near to each other and present in the same room or building.

Due to this reason, cables are used as a transmission medium. Ethernet cables are supported by many devices that have the same interface. They are also the most commonly used cables for connecting modems, routers, etc. Their signal strength is consistent and the communication network is also stable. Thus making them a practical choice when using a wired LAN.

![Example of LAN](/engineering-education/network-types-topologies/lan.jpg)

#### Wireless Local Area Network (WLAN)
[WLAN(Wireless LAN)](https://en.wikipedia.org/wiki/Wireless_LAN) works the same way as a LAN. The network is spread across a limited area. But this type of network does not require any cables or optic fibers. Unlike the LAN, here the mode of transmission is wireless.

To achieve this wireless transmission, [Wi-Fi(Wireless Fidelity)](https://en.wikipedia.org/wiki/Wi-Fi) is used. Workstations can be connected to the internet with the help of Wi-Fi Routers and Adapters. Devices that support wireless transmission can also share data from their memory drives. Some of the devices that support wireless transmission are smartphones, smart-watches, speakers, or laptops, etc.

![Example of WLAN](/engineering-education/network-types-topologies/wlan.jpg)

#### Metropolitan Area Network (MAN)
The reason for having [MANs](https://en.wikipedia.org/wiki/Metropolitan_area_network) is similar to LANs. One of the differences is in the geographical spread of the network area or range. As mentioned above, LANs are confined to small areas. But, as the name suggests, MAN’s are spread across an entire metropolitan city. They can be used to share data from one point of the city to another.

The way MANs are spread across an entire metropolitan city is the type of transmission medium they use. Since telephone lines are used in the propagation of MAN signals [Modem s(Modulator-Demodulators)](https://en.wikipedia.org/wiki/Modem) are used to connect between two or more servers. Another way of communicating through MAN is by using DSL (Digital Subscribers Line). Business establishments, telephone companies, cable TV’s use this type of networks. Unlike LANs, ownership of MANs is taken over by 2 or more companies/firms.

![Example of MAN](/engineering-education/network-types-topologies/man.jpg)

#### Wide Area Network (WAN)
This type of network is currently the most commonly used. [WAN](https://en.wikipedia.org/wiki/Wide_area_network) is nothing but a collection of several LANs linked together. These networks are spread across countries and other parts of the world. Some of them are connected through optic fibers while some are connected through satellites.

WANs are used by government agencies and multinational companies in order to exchange information overseas. Since the network is spread across the world, it is maintained by many firms and companies. When the network is this big, it is prone to failures and system shutdowns once in a while. The biggest WAN in existence is the Internet.   

![Example of WAN](/engineering-education/network-types-topologies/wan.jpg)

Configuring a computer network can also depend on the extent of the network, the distance between devices and the number of devices used. While LANs, WLANs, and WANs are most commonly used, there are some [other](https://www.belden.com/blog/smart-building/network-types) computer networks that can also be used based on the network parameters.

### Network Topologies
The arrangement of components or parts in a specific way is called a **Topology.** In [network topologies](https://en.wikipedia.org/wiki/Network_topology), the components are arranged in a systematic order for *smooth data flow* in a communication network. Here, the components may be devices, workstations, etc. that are also referred to as **nodes**. While some are used by commercial establishments and industrial sectors, some are used by schools and for household purposes.

#### Linear Topology
This type of topology also goes by the name **Bus Topology**. The name itself states that, *the nodes or components of a system are connected in a linear manner*. All the nodes are connected to one bus (cable) in which the data runs linearly from the start point to the endpoint. [Terminators](https://en.wikipedia.org/wiki/Electrical_termination) are attached at both ends to define the length of the bus. All the nodes are connected to the bus within the two terminators. So there is a *bidirectional* flow of data. This topology is generally not used much today due to these disadvantages that seem to have a poor impact on its performance. Switching to newer and better topologies is recommended rather than improving it.

##### Advantages:
- The arrangement of bus topology is very simple and direct.
- Since only one transmission medium is used, the data is easily accessible.
- Due to its simple architecture, the extension of bus topology becomes easier.
##### Disadvantages:
- Since a single cable is used, when two workstations send data simultaneously they may hit one another. This leads to an increase in network traffic.
- Adding new devices and components may slow down the data transfer rate.
- During data transfer, the data has to pass through all the workstations between the source computer and the destination computer. Due to this, data security would be at risk.

![Linear Topology](/engineering-education/network-types-topologies/bus.jpg)

#### Ring Topology
Ring topology is a special kind of bus topology. _It is a linear topology in which both ends are joined together and form a **Ring Topology**_. Thus no terminators are used and the data flow is *unidirectional*. Due to this, for the data to reach from the first node to the last it has to traverse through all the nodes.
Since the connection of nodes is continuous, data flows indefinitely throughout the topology until one node removes it.

##### Advantages:
- Like linear topology, the structure and arrangement of nodes is very simple.
- Due to its compact architecture, the configuration of nodes becomes easier.
- Data transfer is unidirectional - so no collision of data packets.
- Data transfer speeds are higher.

##### Disadvantages:
- Since the nodes are connected in a loop, unpredictable troubleshooting problems may appear.
- To repair or fix one crashed node, the whole system has to be taken down.
- It is difficult to shut down one node and keep the rest of the system functional.
- Like the linear topology, adding new devices and components may slow down the data transfer rate.

![Ring Topology](/engineering-education/network-types-topologies/ring.jpg)

#### Mesh Topology
Mesh topology is the solution to the problem found within ring topology. Unlike ring topology, in mesh, *every node is connected with every other node present in the network*. In the case of a single node failure, the rest of the system would still be functional.

Since one node connects with many other nodes, data is shared through any one of the many paths available. This makes mesh arrangement a suitable network for industries and business establishments.
A mesh topology in which all the nodes are connected is called a full connectivity topology, and the mesh topology in which only some nodes are connected is called partial connectivity.

##### Advantages:
- Mesh topology increases the network flow and data can be shared faster.
- It also records a lesser number of network breakages and system breakdowns.
- Multiple paths are setup between the workstations. So data is transferred through the direct path.
- If one path has higher traffic, the data can be handled to choose the next shortest and fastest path.

##### Disadvantages:
- Since all the nodes are connected to each other, each node (to a certain degree) acts as a router to another node and so on. Hence, the structure becomes delicate.
- This will increase power consumption to a larger extent.
- Mesh topology needs lots of proper planning and requires greater maintenance.
- Due to many links, high network latency may be an issue.

![Mesh Topology](/engineering-education/network-types-topologies/mesh.jpg)

#### Star Topology
*This topology consists of an extra part, i.e. the hub or switch, is in the center of the topology that connects all the nodes*. A hub or switch is a networking device that transfers data from one device to another device. It acts as a transmission medium. While both may be used depending on their operations and use cases, some [differences](https://www.geeksforgeeks.org/difference-between-hub-and-switch/) may affect the way they perform. Since many workstations are connected to a hub, the data transmission becomes centralized.

All the data has to come from the central hub itself. If the workstation fails to acquire the data, it can be received by any other workstation. Also, that central hub can act as a workstation for any other hub making the network scalable. Making the star topology, the most [commonly used topology](https://www.solarwindsmsp.com/blog/most-effective-types-of-network-topology-a-quick-guide-for-msp#:~:text=Star%20topology%20is%20by%20far,creating%20a%20star%2Dlike%20shape.).

##### Advantages:
- In a network failure emergency, identifying the damaged node(s) becomes easier.
- A single hub connects all the nodes.
- During a shut down of a single node, the rest of the nodes would still be functional.

##### Disadvantages:
- If the hub is damaged then all the nodes connected to that hub will be shut down for reconstruction.
- Expensive to install and requires more cabling.
- Extra care has to be taken when working with  hardware devices such as hubs, switches etc.

![Star Topology](/engineering-education/network-types-topologies/star.jpg)

#### Tree Topology
Tree topology is a special kind of bus topology. Here *central nodes or central hubs are connected to the main bus*. These nodes or hubs are also called **root nodes**. The other peripheral nodes are connected to those nodes or hubs. These peripheral nodes are called **descendant nodes**.

Like the bus topology, terminators are attached at both ends to define the length of the main bus. This type of topology is used in database systems, where the data has to be shared in a hierarchical manner. Fun fact, some file systems such as [NTFS (NT File System)](https://en.wikipedia.org/wiki/NTFS) and [HFS (Hierarchical File System)](https://en.wikipedia.org/wiki/HFS_Plus) are based on [B-Trees](https://en.wikipedia.org/wiki/B-tree) (a kind of data structure, that are designed with the help of tree topology).

##### Advantages:
- If one branch or one descendant node has problems it will not affect the entire network.
- Adding more branches to the main bus becomes easier.
- Existing network can be expanded using tree topology.

##### Disadvantages:
- The main bus connects many sub-branches and if it has any complications, it affects the whole network. It may also lead to network shut down.
- More cabling is required.
- It is hard to arrange and group the nodes.
- It is expensive to install this type of topology.
- Difficult to configure and maintain the network.

![Tree Topology](/engineering-education/network-types-topologies/tree.jpg)

### Conclusion
Every topology has its benefits and drawbacks. Various factors come into the picture during setting up a network such as its expanse, number of users, cost, data security, and so on. Every detail has to be taken care of before configuring a network. No feature of any topology makes it superior or inferior to others. The crucial thing is to form a network that satisfactorily fulfills users' needs and provides quality performance.

##### Additional Resources
[Network Types](https://www.javatpoint.com/types-of-computer-network)
[Network Topologies](https://www.javatpoint.com/computer-network-topologies)
