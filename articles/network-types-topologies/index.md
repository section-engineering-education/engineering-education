---
layout: engineering-education
status: publish
published: true
url: /engineering-education/network-types-topologies/
title: Introduction to Network Types and Network Topologies
description: This article will go over Introduction to Network Types and Network Topologies
author: kanishkvardhan-a-n
date: 2020-10-16T00:00:00-05:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/network-types-topologies/hero.jpg
    alt:  example image
---
Computers are used in almost every aspect of life. They are easy to work with, can handle multiple tasks, and output accurate results. This makes agencies, enterprises, businesses, and workplaces dependent on them. Yet, the fact that they can also store and share data with other computers makes them more useful.
<!--more-->
This enables people to access them from anywhere around the world (securely of course). For this to work, computers are interlinked with one another. This interconnection between two or more computers forms a [computer network](https://en.wikipedia.org/wiki/Computer_network).

They are categorized based on their:

-  Geographical spread of network strength.
-  Type of usage and applications.
-  Mode of transmission and some other factors.

A typical networking setup requires two types of devices: **Servers and Workstations.**
[Servers](https://en.wikipedia.org/wiki/Server_(computing)) are the computers responsible for powering the network. [Workstations](https://en.wikipedia.org/wiki/Workstation) are the devices that make up the network. Some of those devices could be printers, laptops, smartphones, etc. Data transfer and resource sharing is done from the servers. The shared materials are downloaded on the workstations in the form of data packets. While some can be used across countries, others can barely be used within a building. Here are some of the most popular types of networks in use.

### Network Types
#### Local Area Network (LAN)
Computer networks that are restricted to a small localized area are called [LANs](https://en.wikipedia.org/wiki/Local_area_network). These types of networks are used to share resources and transfer data within buildings such as schools, offices, net cafes, etc. Routers, switches, and hubs are some of the devices used to operate a LAN. All the devices that are powered by LAN, are near to each other and present in the same room or building.
Due to this reason, cables are used as a transmission medium. Ethernet cables are supported by many devices that have the same interface. They are also the most commonly used cables for connecting modems, routers, etc. Their signal strength is consistent and the communication network is also stable. Thus making them a practical choice for using wired LAN.

![Example of LAN](/engineering-education/network-types-topologies/lan.jpg)

#### Wireless Local Area Network (WLAN)
[WLAN(Wireless LAN)](https://en.wikipedia.org/wiki/Wireless_LAN) works the same way as the LAN. The network is spread across a limited area. But this type of network does not require any cables or optic fibers. Unlike the LAN, here the mode of transmission is wireless. To achieve this wireless transmission, [Wi-Fi(Wireless Fidelity)](https://en.wikipedia.org/wiki/Wi-Fi) is used. Workstations can be connected to the internet with the help of Wi-Fi Routers and Adapters. Devices that support wireless transmission can also share data from their memory drives. Some of the devices that support wireless transmission are smartphones, smart-watches, speakers, laptops etc.

![Example of WLAN](/engineering-education/network-types-topologies/wlan.jpg)

#### Metropolitan Area Network (MAN)
The point of having [MANs](https://en.wikipedia.org/wiki/Metropolitan_area_network) is similar to LANs. One of the differences is the geographical spread of the network area or range. As mentioned above, LANs are confined to small areas. But, as the name suggests, MAN’s are spread across an entire metropolitan city. They can be used to share data from one point of the city to another. Business establishments, telephone companies, cable TV’s use this type of networks.  

![Example of MAN](/engineering-education/network-types-topologies/man.jpg)

#### Wide Area Network (WAN)
This type of network is currently the most commonly used. [WAN](https://en.wikipedia.org/wiki/Wide_area_network) is nothing but a collection of several LANs linked together. These networks are spread across countries and other parts of the world. Some of them are connected through optic fibers while some are connected through satellites. WANs are used by government agencies and multinational companies for exchanging information overseas. Since the network is spread across the world, it is maintained by many firms and companies. When the network is this big, it is prone to failures and system shutdowns once in a while. The biggest WAN in existence is the Internet.   

![Example of WAN](/engineering-education/network-types-topologies/wan.jpg)

Configuring a computer network can also depend on the extent of the network, the distance between devices and the number of devices used. While LANs, WLANs, and WANs are most commonly used, there are some [other](https://www.belden.com/blog/smart-building/network-types) computer networks that can also be used based on our networking parameters.

### Network Topologies
Arrangement of components or parts in a specific way is called a **Topology.** In [network topologies](https://en.wikipedia.org/wiki/Network_topology), the components are arranged in a systematic order for *smooth data flow* in a communication network. Here, the components may be devices, workstations, etc. that are also referred to as **nodes**. Many topologies are used based on their applications, structure, and efficiency. While some are used by commercial establishments and industrial sectors, some are used by schools and for household purposes.

#### Linear Topology
This type of topology also goes by the name **Bus Topology**. The name itself states that, *the nodes or components of a system are connected in a linear manner*. All the nodes are connected to one bus (cable) in which the data runs linearly from the start point to the endpoint. Terminators are attached at both ends to define the length of the bus. All the nodes are connected to the bus within the two terminators. So there is a *bidirectional* flow of data.

The arrangement of bus topology is very simple and direct. Since only one transmission medium is used, the data is easily accessible. Due to its simple architecture, the extension of bus topology becomes easier. Since a single cable is used, when two workstations send data simultaneously they may hit one another. This leads to an increase in network traffic. Also, adding new devices and components may slow down the data transfer rate.

![Linear Topology](/engineering-education/network-types-topologies/bus.jpg)

#### Ring Topology
Ring topology is a special kind of bus topology. _A linear topology in which both the ends are joined together and form a **Ring Topology**_. Thus no terminators are used and the data flow is *unidirectional*. Because of that, for the data to reach from the first node to the last it has to traverse through all the nodes.

Since the connection of nodes is continuous, data flows infinitely throughout the topology until one node removes it. Like a linear topology, the structure and arrangement of nodes are very simple. Due to its compact architecture, the configuration of nodes becomes easier.

Since the nodes are connected in a loop, unpredictable troubleshooting problems may appear. To repair or fix one crashed node, the whole system has to be taken down. It is difficult to shut down one node and keep the rest of the system functional. Like the linear topology, adding new devices and components may slow down the data transfer rate.

![Ring Topology](/engineering-education/network-types-topologies/ring.jpg)

#### Mesh Topology
Mesh topology is the solution to the problem with ring topology. Unlike ring topology, here *every node is connected with every other node present in the network*. In the case of a single node failure, the rest of the system can still be functional. Since one node connects with many other nodes, data is shared through any one of the many paths available. This makes mesh arrangement a suitable network for industries and business establishments.

A mesh topology in which all the nodes are connected to each other is called a full connectivity topology, and the mesh topology in which only some nodes are connected to each other is called partial connectivity.
Mesh topology increases the network flow and data can be shared faster. It also records a lesser number of network breakages and system breakdowns. But since all the nodes are connected to each other, each node acts as a router to another node and so on. This increases power consumption to a larger extent. Mesh topology needs lots of proper planning and requires high maintenance. Due to many links, high network latency may be an issue.

![Mesh Topology](/engineering-education/network-types-topologies/mesh.jpg)

#### Star Topology
*This topology consists of an extra part, i.e. hub or switch, in the center of the topology which connects all the nodes*. A hub or switch is a networking device that transfers data from one device to another device. It acts as a transmission medium. While both may be used depending on their operations and use case, some [differences](https://www.geeksforgeeks.org/difference-between-hub-and-switch/) may affect the way they perform. This is the most commonly used topology.

In an emergency network failure, identifying the damaged node becomes easier. This is because a single hub connects all the nodes. Here, the damaged node will be shut down and the rest of the nodes can still be functional. But if a hub is damaged then all the nodes connected to that hub will be shut down for reconstruction.

![Star Topology](/engineering-education/network-types-topologies/star.jpg)

#### Tree Topology
Tree topology is a special kind of bus topology. Here *central nodes or central hubs are connected to the main bus*. These nodes or hubs are also called **root nodes**. The other peripheral nodes are connected to those nodes or hubs. These peripheral nodes are called **descendant nodes**. Like the bus topology, terminators are attached at both ends to define the length of the main bus. This type of topology is used where the data has to be shared in a hierarchical manner.

If one branch or one descendant node has problems it will not affect the entire network. Adding more branches to the main bus becomes easier. But the main bus connects many sub-branches and if it has any complications, then it affects the whole network. This may also lead to network shut down. Thus, it becomes hard to arrange and group the nodes. It also costs quite a lot to install this type of topology network.

![Tree Topology](/engineering-education/network-types-topologies/tree.jpg)

##### Additional Resources
[Network Types](https://www.javatpoint.com/types-of-computer-network)
[Network Topologies](https://www.javatpoint.com/computer-network-topologies)
