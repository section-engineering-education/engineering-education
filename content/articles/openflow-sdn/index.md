---
layout: engineering-education
status: publish
published: true
url: /openflow-sdn/
title: Introduction to OpenFlow Protocol   
description: This article will serve as an introduction to OpenFlow protocol. The OpenFlow (OF) protocol is a standard in software-defined networking (SDN) architecture. This protocol defines the communication between an SDN controller and the network device/agent.
author: aakash-rawal
date: 2021-02-07T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/openflow-sdn/hero.png
    alt: open source vs vendor networking solutions
---
In this article, we will get to know the basics of OpenFlow protocol, which is the standard protocol in traditional software-defined networks. This article will go through the basics of Software Defined Networking (SDN) and OpenFlow (OF), the working of OF protocol and some terminologies, advantages over traditional networking architecture, and alternatives to OpenFlow be used in SDN.  
<!--more-->
As a prerequisite to the article, the reader should be aware of traditional networks, OSI model, and related technologies like switching, routing, etc. The reader also needs to understand network automation, data plane, and control plane. 

### Table of contents
1. [What is the OpenFlow Protocol?](#what-is-the-openflow-protocol)
2. [Background on traditional SDN](#background-on-traditional-sdn)
3. [Basics of OpenFlow](#basics-of-openflow)
4. [Advantages of using OpenFlow](#advantages-of-using-openflow)
5. [Alternatives and other means to SDN](#alternatives-and-other-means-to-sdn)

### What is the OpenFlow protocol? 
The **OpenFlow (OF) protocol** is a standard in software-defined networking (SDN) architecture. This protocol defines the communication between an SDN controller and the network device/agent. Before delving deep into the OpenFlow protocol, here is a background on SDN.

Before moving further, the term "switch" denotes any network device capable of using OF protocol and not the Layer 2 device. In layer 2 of the [OSI model](https://en.wikipedia.org/wiki/OSI_model), layer 2 refers to the data layer where the traditional switches reside. They are responsible for forwarding **ethernet 'frames'** on the wire. Several features like VLANS, STP, and port aggregation can be implemented at layer 2. 

### Background on traditional SDN
**Software-Defined Networking** is a novel concept for the network engineering field, enabling traditional networks to be controlled through a separate centralized entity, usually an SDN controller. In simple terms, **SDN is defined as separating the *control plane* (or the brain) of the network and the *data/forwarding plane* (or the brawn)**.

The SDN controller is a centralized physical/virtual device that communicates with all the "dumb" network devices and updates them on how to forward traffic. This southbound communication occurs through means like an SSH connection, APIs, and most commonly through the OpenFlow(OF) protocol. This protocol defines the requirements and the standards for communication between an SDN controller and the "agent" network device.

In traditional SDN architecture, there are three layers:
1. **Application layer**: This is where the applications will run and decide how the traffic should move in a network. For example, routing protocols like OSPF, BGP, Firewall application, etc. 
2. **Control Layer**: This is where the controller resides. The controller acts as a bridge between the application and the switches. It relays the information from the application and converts them into network "flows" that are entered in the switch's "flow table." 
3. **Data/Infrastructure layer**: This is the forwarding plane that has the actual hardware devices. These devices refer to the flow entries in their flow table to forward packets through the network. 

### Basics of OpenFlow
As mentioned, the OpenFlow protocol lays out the foundation for communication between an SDN controller and a dumb network device. This protocol was developed first by researchers at Stanford University in 2008 and was first adopted by [Google](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/42948.pdf) in their backbone network in 2011-2012. It is managed now by the [Open Networking Foundation (ONF)](https://opennetworking.org/sdn-definition/). The latest version used in the industry is V1.5. 

OpenFlow is the standard southbound protocol used between the SDN controller and the switch. The SDN controller takes the information from the applications and converts them into flow entries, which are fed to the switch via OF. It can also be used for monitoring switch and port statistics in network management.

**NOTE:** The OpenFlow protocol is only established between a controller and the switch. It does not affect the rest of the network. If a packet capture were to be taken between two switches in a network, both connected to the controller via another port, the packet capture would not reveal any OF messages between the switches. It is strictly for the use between a switch and the controller. The rest of the network is not affected.

#### Initiation of OpenFlow channel 
OpenFlow protocol works on the TCP protocol. The standard protocol is TCP 6633 for OF V1.0 and 6653 for OF V1.3+. There needs to be IP connectivity between the controller and the switches to establish an OF connection. OF channel is formed only after a successful TCP 3-way handshake. 

- The switch sends a "HELLO" packet to introduce it to the controller to start the OF channel communication. The switch also sends information like the highest version of OF it supports. The controller replies to the hello message with its highest supported OF version. Then, the switch negotiates on the highest level of the OpenFlow version that they both support.

- Once the version is negotiated, the controller sends a "FEATURE_REQUEST" message. This message essentially asks the switch for its supported OF capabilities like the number of flow tables supported, supported actions, etc. The switch replies to it with a "FEATURE_REPLY" message stating all its capabilities along with its unique identifier or Datapath ID (DPID).

After this, it is said that the OpenFlow channel is successfully established between the switch and the controller. The connection between the controller and switch is essential as it is the only way for a switch to communicate with a controller. 

To secure this connection, a protocol like TLS can also be used instead of a TCP connection. Here, the controller and switch need to have the proper certificates and keys for a successful TLS connection. This prevents snooping on the OF channel.

#### OpenFlow tables and Flow entries
Flow tables are like a traditional switch's MAC/CAM table that stores the hosts' hardware addresses. Flow tables store flow entries or flows that tell the SDN switch what to do with a packet when it comes to an incoming port. 

The switch will match specific parameters like IP address, port number, MAC address, VLAN ID, etc. and select the best matching flow entry from the table and execute the action associated with that entry. Actions could be to drop the packet, forward it out a different port, flood the packet, or send it to the controller to further inspect it.

If a switch does not have an entry for a packet, the switch might have a default entry or "TABLE_MISS" entry. This entry has the lowest priority, and the actions can either be to drop the packet or send it to the controller. 

When the controller receives this kind of packet from a switch, it sends it to the application running at the application layer, which processes the packet and let the controller know if a new flow entry needs to be inserted in the switch's flow table. If that's the case, the controller will insert a flow entry on the switch.

The next packet of the same kind will be dealt with by the switch at the Data layer as it already has an entry, and appropriate actions would be taken. This improves the efficiency of the network by a huge factor.

### Advantages of using OpenFlow
There are several advantages of OpenFlow and SDN rather than traditional networks:
- SDN enables separation of control and data plane, which means switches can use all their hardware resources in just forwarding data instead of computing routes. 
- OpenFlow provides an easy way of communication between controller and switch, easily implemented in an existing network. 
- Most current devices support OpenFlow, it is not enabled by default, but we can easily enable and use it to transition to SDN. 
- It provides security with a TLS connection to prevent snooping and DoS attacks on the controller and/or the network. 
- OpenFlow does **NOT** change the configuration for a switch. It just updates the flow tables, which define the path for a packet.

### Alternatives and other means to SDN 
Although it seems that OpenFlow is ingrained with SDN, it is just an industry-standard practice to implement SDN in an organization efficiently. There are several other means to program the SDN switches and insert flow entries in its flow tables.

- **REST APIs:** REST APIs are the most popular choice after OpenFlow to communicate with the switches. All the controller applications also have a REST module supported with them. The user can query the switch database to POST or GET data. "Curl" is one of the most popular tools for this. 

An example of a REST call on the RYU controller to get all the switches in your network would be:

`curl -XGET http://localhost:8080/stats/switches`

- **Management protocols:** Protocols like SSH, NETCONF, and SNMP could also manage an OF enabled switch from the controller. This method is generally used for old devices that do not support OpenFlow.

### Conclusion
In this article, we got to know the basics of OpenFlow protocol. We went through the basics of Software Defined Networking (SDN) and OpenFlow (OF), the working of OF protocol and some terminologies, advantages over traditional networking architecture, and alternatives to OpenFlow be used in SDN.  

I hope you have found this article useful. 

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
