---
layout: engineering-education
status: publish
published: true
url: /switch-vs-router-vs-hub/
title: Differences between a Hub, a Switch, and a Router
description: In this article, we are going to discuss the differences between a switch, a router, and a hub. In addition, we will discuss their functionalities in a network.
author: jedidah-mwangi
date: 2021-07-16T00:00:00-12:15
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/switch-vs-router-vs-hub/hero.jpg 
    alt: Differences between a Hub, Switch, and Router example image
---  

In networking, the terms `switches`, `hubs`, and `routers` are sometimes used interchangeably which is wrong.
<!--more--> 
Despite them being similar, there are differences in how they handle data. These three components may be integrated into a single device making it hard for a student to distinguish between them.

In this article, we are going to discuss each device and its functionalities in a network.

### Table of contents
- [What is a Switch?](#what-is-a-switch)
- [What is a Hub?](#what-is-a-hub)
- [What is a Router?](#what-is-a-router)
- [The component's layer in the OSI model](#the-components-layer-in-the-osi-model)
- [Function of each device](#function-of-each-device)
- [Application of each device](#application-of-each-device)
- [Modes of data transmission](#modes-of-data-transmission)
- [Addresses used in each device](#addresses-used-in-each-device)
- [Transmission of Data](#transmission-of-data)

### What is a Switch?
A switch is a multicast networking device that works under the Datalink layer of the OSI model and connects a bunch of computers or devices in a network. It's mainly used to send a private message and it does not waste data. 

A switch can easily identify which device is connected to which port by using a MAC address giving it the ability to deliver the message to a particular machine. 

#### Advantages of using a Switch
- It's secure since it delivers data to the specified node.
- It lowers the chances of frame collisions domains.
- It increases the bandwidth in a network.
- It increases the number of ports needed to connect the nodes available in a network.
- It operates under full-duplex.

#### Disadvantages of using Switches
- They are more expensive compared to hubs and other devices used in a network.
- To deal with multicast parcels, proper planning is required.
- Problems may arise when broadcasting traffic.

### What is a Hub?
A Hub is a simple and cheap networking device that works under the physical layer of the OSI model and connects a bunch of computers in a Local Area Network(LAN).  It is considered less intelligent because it does not filter data and does not know where the data is to be sent.

All information sent to a hub is automatically sent to all ports of the devices connected to it. This leads to wastage of bandwidth. 
 
#### Advantages of using hubs
- They have the ability to connect to the network using different physical media.
- They can be used to increase the network distance.
- Hubs are relatively cheap compared to switches and other devices in the network.

#### Disadvantages of using a hub
- It increases the chances of collision domains between packets when being transferred from one device to another.
- Hubs operate under half-duplex. Only one device can send or receive data at a time
- Hubs share data to all the devices in a network thus making the network insecure.
- Hubs waste lots of bandwidth when transmitting data.

### Switch vs Hub
- A Hub is a broadcast device that sends data from one node to all nodes but a Switch is a multicast device that can send data to a particular node.
- A Hub supports half-duplex i.e., only one device can send or receive data at a time while a switch supports full-duplex i.e., both devices can send and receive data at the same time.
- A switch is located on the second layer of the OSI model while a Hub is located on the first layer.

### What is a Router?
A Router is a networking device that operates under the network layer of the OSI model and is used to connect two or more networks. It is a device that establishes a common link between networks to enable data flow between them. 

#### Advantages of Routers
- With the aid of dynamic routing algorithms, it can choose the best path in the internetwork.
- It creates collision domains to reduce network traffic.
- It provides connections between different network architectures.

#### Disadvantages of Routers 
- They are expensive compared to hubs and switches.
- They need to analyze data. This makes them slower.
- They have low bandwidth because of their dynamic router communication.

Let's look at their differences on the OSI model.

### The component's layer in the OSI model
The [Open Systems Interconnection Model](https://www.imperva.com/learn/application-security/osi-model/)(OSI Model) is a 7 layer model that is used to describe, in a pictorial way, how computer systems communicate. A switch, a router, and a hub each operate on a different layer.

**A switch** is located on the OSI model's Data Link layer i.e., the second layer. The link layer is specific to the medium over which the packet is traveling. The Ethernet and Mac Address are part of this layer.

**A router** resides in the Network Layer of the OSI model i.e., the third layer.

**A hub** is located in the Physical Layer of the OSI model i.e., the first layer.

### Functions of each device
#### Switch
- It allows various connections of many devices in the same network and the management of port and VLAN security settings.
- **Learning** - This is the process of collecting the MAC address of linked devices.
- **Forwarding** - This is the process of transferring network traffic from one device connected to one port of a network switch to another device connected to another port.
- **Preventing Layer 2 Switching Loops** - In a Local Area Network, redundant connections are built to prevent the entire network from failing if one link fails. Layer 2 switching loops and broadcast storms can be caused by redundant connections. A network switch's job is to prevent layer 2 switching loops and broadcast storms.

#### Router
- Its major purpose is to connect many types of networks at the same time using adaptive and non-adaptive routing. 
- The router is connected to at least two networks and decides how to deliver each data packet depending on its current knowledge of the network status.
- If a packet is traveling to the LAN, the router bounces it back. The packet will be toured depending on the routing table if this is not the case. 

#### Hub
- A hub is a simple and cheap networking device that allows a bunch of computers to be connected to a single network 
- When a hub receives a data packet (an Ethernet frame) from a network device at one of its ports, it broadcasts (repeats) the packet to all of its ports,i.e, to all other network devices. A collision occurs when two network devices on the same network try to send packets at the same time.

### Applications of each device
#### Switch
- It is commonly used in local area networks for connecting many nodes.
- **Forwards a message to a specific host** - On each port, a switch, like a bridge, employs the same forwarding or filtering logic. When a host or switch on the network transmits a message to another host or switches on the same network, the switch receives the frames and decodes them to read the physical (MAC) address component of the message.
- **Increase LAN bandwidth** - A switch divides a LAN into many collision domains, each with its broadband connection, considerably improving the LAN's bandwidth.

#### Router
- It is commonly used in Local Area Network and Metropolitan Area Network (MAN).
- **It manages traffic** by forwarding data packets to their proper IP addresses. Traffic between these networks may be managed.
- It determines the best path to send packets.

#### Hub
- It is similar to a switch because it is used in the Local Area Network (LAN).
- It is used for network monitoring.
- They are also used in organizations to provide connectivity.
- It can be used to create a device that is available throughout the network.

### Modes of data transmission
They define the direction in which data flows between two communicating devices. There are three types of transmission modes:

1. **Simplex** - In this mode of transmission, data can only move to one direction i.e., a device can only send data but cannot receive and the receiver can only receive but cannot send the data.
2. **Half-Duplex** - In this mode, only one device can send or receive data at a time but not both at the same time.
3. **Full-Duplex** - In this mode, a device can send and receive data at the same time.

Read this [documentation](https://afteracademy.com/blog/what-are-the-data-transmission-modes-in-a-network) for more information on the different modes of data transmission.

Both **switches** and **routers** support full-duplex transmission. Thus, a bunch of computers can send data at the same time.

**Hubs** support half-duplex transmission. Thus, only one node can send data at a time.

### Addresses used in each device
A **switch** stores and uses the MAC address of a device to transfer data while a **router** uses the IP address of the device to transfer data between networks. 

A **hub** on the other hand does not store any MAC/IP address to transfer data.

### Transmission of data
A **switch** transmits data from one device to another in form of [frames](https://en.wikipedia.org/wiki/Frame_(networking)) while a **router** transmits data from one network to another in form of [packets](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/).

A **hub** transmits data from one device to another in form of binary bits.

### Conclusion
In this article, we have looked at hubs, switches, and routers. We have also looked at their functionalities and applications of each device as used in networking. 

I hope the article has been of great assistance to you.

---

Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
