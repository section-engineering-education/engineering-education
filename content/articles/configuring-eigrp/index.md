---
layout: engineering-education
status: publish
published: true
url: /configuring-eigrp/
title: Configuring EIGRP on a Router
description: In this article, we will look at Enhanced Interior Gateway Routing Protocol (EIGRP), how to configure it on a Cisco router and verify it on a Cisco router. 
author: rabo-james-bature
date: 2021-11-04T00:00:00-15:46
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/configuring-eigrp/hero.jpg
    alt: Configuring EIGRP on a Router Hero Image
---
Routers exchange routing information using static or dynamic routing protocols. Configuring a static route on a network requires great administrative overhead and tends to be error-proned. 
<!--more-->
That is why dynamic routing protocols are used to reduce these overheads and errors. In this article, we will look at Enhanced Interior Gateway Routing Protocol (EIGRP) and how to configure it on a Cisco router. 

By the end of the article, the reader would have learned: 
1. What EIGRP is.
2. How to configure EIGRP for the Internet Protocol version 4 (IPv4) on a Cisco router.
3. How to verify EIGRP on a Cisco router. 

### Prerequisites
For a better understanding of this tutorial, the reader is expected to have:
- A basic knowledge of the Cisco Command Line Interface (CLI).
- A basic knowledge of Network subnetting.
- The Cisco Packet tracer which can be downloaded [here](https://www.netacad.com/portal/resources/packet-tracer).

### Table of contents
- [Introduction](#introduction)
- [Enhanced Interior Gateway Routing Protocol (EIGRP)](#enhanced-interior-gateway-routing-protocol-eigrp)
- [EIGRP Features](#eigrp-features)
- [Configuring EIGRP](#configuring-eigrp)
- [Steps to configure EIGRP for IPv4](#steps-to-configure-eigrp-for-ipv4)
- [Configuring EIGRP for IPv4](#configuring-eigrp-for-ipv4)

### Enhanced Interior Gateway Routing Protocol (EIGRP) 
Routing is the process in which algorithms are used to facilitate the exchange of information for path selection along which data can be transferred from a source to destination. It is done by a routing device known as a Router. 

These algorithms use routing metrics and costs to determine the best path to be used in the forwarding of traffic. Dynamic routing protocols use a set of algorithms and messages for the exchange of routes and routing information. These include remote routes, best paths, and up-to-date routing information. 

Enhanced Interior Gateway Routing Protocol (EIGRP), is a Cisco proprietary dynamic routing protocol that was initially released in 1992. But, in 2013, Cisco released a basic functionality of EIGRP, hence allowing other vendors to install EIGRP on their routers. 

### EIGRP features 
EIGRP combines both links state and distance vector protocols features for its operations. As such, it is considered to be an advanced distance routing protocol. 

Some of these features include:
- Diffusing update algorithm (DUAL).
- Reliable transport protocol.
- Equal and unequal load balancing.
- Authentication.
- Autonomous System (AS) number. 

#### Diffusing update algorithm (DUAL) 
Diffusing Update Algorithm (DUAL) is an algorithm used by EIGRP to choose and maintain the best routes for packet delivery from one router to another within a local or remote network. This algorithm is at the heart of EIGRP operation, as it guarantees loop-free paths and backup routes if the primary route fails. 

It is also used to perform the following:
1. Support variable length (VLS) subnetting. 
2. Send out queries for alternate routes.
3. Perform dynamic route discoveries.  

#### Reliable transport protocol 
Different static and dynamic routing protocols use either **Transport Control Protocol (TCP)** or **User Datagram Protocol (UDP)** for data and route exchange. EIGRP does not use either of these protocols, rather, it uses Cisco’s developed protocol called **Reliable Transport Protocol (RTP)**. 

RTP is used for communication between EIGRP configured routers. It ensures that route information are delivered using five packets types:
- Updates packets: EIGRP uses the updates packets to send routing updates whenever there is a topology change. These packets can either be reliable multicast or reliable unicast, which is used when only one neighbor is discovered. 
- Hello packets: Hello packets are used to discover routes to neighboring EIGRP routers. This packet does not need an acknowledgment from the receiver. 
- Acknowledgment (ACK) packets: These are packets sent by an EIRGP router in response to a route update and it is always a unicast message sent unreliably. 
- Query: Query packets are sent by EIGRP routers when they lose path to a particular network and need a backup route. 
- Reply packets: Whenever a query is sent by a router requesting an alternate route, the router that receives this request sends a reply packet. The packet contains information about the alternate route. 

### Equal and unequal load balancing
EIGRP supports both equal and unequal load balancing, unlike other routing protocols. Equal load balancing allows routers to distribute traffic between two or more routes having equal metrics. 

For unequal load balancing, the paths to the destination network do not need to have equal metrics or cost to provide load balancing. Unlike other routing protocols that support only equal load balancing, EIGRP supports both equal and unequal load balancing.

### Authentication 
Routes information is distributed over networks, which makes them susceptible to attacks. EIGRP, like other routing protocols, supports authentication to ensure that only authentic routing information is transmitted. 

### Autonomous system (AS) number
EIGRP uses `AS` numbers to enable the EIGRP process on a router. This number is only significant to the EIGRP domain as it functions as an EIGRP process ID to keep track of each EIGRP process. This is because more than one EIGRP instance can be configured on a router. 

This number is not the same as the `AS` number assigned by the Internet Assigned Numbers Authority (IANA). The IANA `AS` number is assigned to a collection of networks under the administrative control of a single organization representing a common routing policy on the internet. 

### Configuring EIGRP 
EIGRP has two implementations, one for Internet Protocol Version 4 (IPv4) and another for Internet Protocol version 6 (IPv6). In this section, we will look at the IPv4 implementation.

### Steps to configure EIGRP for IPv4
To configure EIGRP on the router, use the global configuration command.   

- `Router eigrp autonomous-system number` - It is used to enable the EIGRP process. This AS-number is a 16-bit value between 1 and 65,535. The value chosen must be the same for all routers within a given EIGRP routing domain. 

After configuring the AS number, the following steps should be used to implement EIGRP on a Cisco router: 
- Use the `eigrp router ipv4 address` to configure the router’s ID - this address can be any IPv4 address, except for `0.0.0.0` and `255.255.255.255`. It should be unique for each router as it is used to identify the router in a given EIGRP routing domain. 

- Enable EIGRP on an interface using the `network ipv4-address` command - this command will enable any interface on the router that matches the specified address and include it in the EIGRP routing update. 

In the situation where you do not want to include all interfaces within a network, then you can use a wildcard mask to exempt such network using the command: 

```bash
network ipv4-address wildcard mask 
```

- Configure passive interfaces using the `passive-interface interface-id` command - this command will allow EIGRP routing updates on these interfaces. But, it will not allow any neighbor adjacencies to form. This is necessary on interfaces that are not within the EIGRP routing domain or connect to an ISP to increase security controls. 

#### Topology used

![Topology used](/engineering-education/configuring-eigrp/topo.png)

Source: Author

The figure above is the topology used for this tutorial. For a better understanding, the Packet tracer activity file used for this tutorial can be downloaded from this [activity file](https://github.com/raboba2re/config/blob/main/EIGRP.pkz). 

The reader can use this to practice the configuration of EIGRP on routers 1 and 2 because only router 3 will be configured in this tutorial.

### Configuring EIGRP for IPv4 
Configure the EIGRP process using the ` router eigrp 2` - this will enable the EIGRP process on the router and it should be the same for all routers within this EIGRP domain.

Configure the router ID using  ` eigrp router 3.3.3.3` - this ID should be unique to each router as it is used to identify routers in a given EIGRP domain. 

Enable networks 172.10.1.4, 172.10.1.12, and 172.10.1.9 using:

- ` network 172.10.1.4`
- ` network 172.10.1.9`
- ` network 172.10.1.12`

This command will enable any interface on the router that matches the specified addresses to be included in the EIGRP routing update. 

Configure serial interface 0/0/0 using the ` passive-interface s0/0/0 ` - this command will allow EIGRP routing updates on **interface s0/0/0** but will not allow any neighbor adjacencies to form. 

This is because this interface is connected to an **Internet service provider (ISP)** which is not under the administrative control of the organization. This is necessary to increase security controls.

![configuration commands on a Cisco router](/engineering-education/configuring-eigrp/config.jpg)

### Verifying configurations
To verify that eigrp has been successfully configured, the following commands can be used:
- ` show ip route eigrp` - this command is used to verify that the router recognizes EIGRP routes to any of its neighbors. 
- ` show ip route` - this command is used to verify all internet protocol routes configured in the router. 
- `show running-config`- this command is used to view all running configurations in the router including EIGRP configurations. 

### Conclusion 
EIGRP is one of the most used dynamic routing protocols in existence. This is because it offers more functionalities than other dynamic routing protocols. 

The choice of the routing protocol to be used depends on the organization and the network administrator’s choice. Having a good understanding of various protocols will give the administrator many options.

Happy learning!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)