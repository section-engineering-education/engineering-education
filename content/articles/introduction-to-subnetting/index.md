---
layout: engineering-education
status: publish
published: true
url: /introduction-to-subnetting/
title: Introduction to Internet Protocol and Subnetting
description: Subnetting is a partition process of splitting a single-page network into two or more strands. This process enhances the efficiency of the computer network. This article will cover subnetting, internet protocol, and the terminologies behind computer networking.
author: anyebe-blessing-ene
date: 2021-05-20T00:00:00-10:30
topics: [Networking]
excerpt_separator: <!--more-->
images:
  -url: /introduction-to-subnetting/hero.jpg
  alt: Subnetting image example
---
In this article, we will get to understand important terms of the Network.
<!--more-->

### Table of Contents
- Internet Protocol (IP)
- IPV4 Structure
- IP Classes
- Public vs Private IP
- IP Routing
- Subnet Mask

### Prerequisites
One simply requires basic network knowledge of the internet. 

Let’s dive right in by defining a couple of terms.

**Subnetting** is the process of partitioning a network into two or more networks based on utilization. It is a logical process of splitting a single-page network into more strands. Subnetting came into the internet in 1981. 

A **protocol** is a set of standards and rules that define the language that devices can use to communicate. There are several existing protocols used in networking such as TCP, UDP, IP and, ICMP. In this article, we will only discuss the IP.

### Internet Protocol (IP)

An IP is a distinctive identifier. It is the foundational protocol that allows the internet to work. It is situated in the internet layer of the TCP/IP model. They are 32- bit numbers. An example is Google’s IPV4 IP in the format of 216.58.216.164.

#### Internet Protocol Version 4 (IPV4) Structure

IPV4 is the first version of IP for the internet. The [Defense Advanced Research Projects Agency](https://www.darpa.mil) developed IPV4 in 1981. They deployed for use in the ARPANET in 1983. An IPV4 is a 32-bit logical number displayed in decimal notation and divided into 8 bits each (1 octet). 

A particular address consists of; 

1. Host identity 

2. Network identity.

Below is a diagram of IPV4

![IPV4](/introduction-to-subnetting/diagram-of-IPV4.jpeg)

[image-Source](https://study.com/academy/lesson/ipv4-address-structure-classes-and-types.html)



#### IPV4 vs IPV6

There are two versions of the internet protocol. The second version is known as IPV6. Below is a table comparing both versions of the internet protocol.

|  **IPV4**  | **IPV6**  |
| ------------ | ------------- |
| Uses dot-decimal notations, less suitable for mobile |  Uses hexadecimal colon-separated notations, best suited for mobile. |
| Internet protocol security is optional  |   Internet protocol security is mandatory  | 
|  The latest packet size is 576 bytes  |  The latest packet size is 1208 byte  | 
| Its security depends on applications  |  Has its own security protocol called IPSec  |
|  Networks configured with DHCP  |  Has its auto-configuration capabilities  |
|  It is a numeric address method  |  It is an alphanumeric address method  |
|  Has 5 different classes from A - E  |  Allows an unlimited number of IP addresses to be stored |


#### IP Classes

Classes are how you can identify network addresses on the internet. The network class an IP address fits into is ascertained by the binary numbers. IP classes are in 5 parts ranging from class A - E. Class A-C are the major used classes.

<<<<<<< HEAD
 ![Ip-Classes](/introduction-to-internet-protocol-and-subnetting/classes-ip.jpg)
 (Robles, 2021)
 


**Note:** 127 is not included in the range as it's considered a loopback address. Any packet sent to this address loops back, there are over 16 million possible addresses here. Used to set up many server applications on the host, while they all listen to the same port number. Hence they resulted in calling it *localhost*. 
=======
|class | Range  | Parts of the class | Network IDs | Host IDs | Start address | End address | Leading bits | Size of network number bit field |
| ---- | ------ | ------------------ | ----------- | -------- | ------------- | ----------- | ------------ | ------------------- |
| A | 1-126 | N|H|H|H | 128 | 16,777,216 | 0.0.0.0 | 127.255.255.255 | 0 | 8 |
| B | 128-191 | N|N|H|H | 16,384 | 65,536 | 128.0.0.0 | 191.255.255.255 | 10 | 16|
| C | 192-223 | N|N|N|H | 2,097,152 | 256 | 192.0.0.0 | 223.255.255.255 | 110 | 24 |
| D | 224-239 | Not defined | Not defined | Not defined | 224.0.0.0 | 239.255.255.255 | 1110 | Not defined |
| E | 240-255 | Not defined | Not defined | Not defined | 240.0.0.0 | 255.255.255.255 | 1111 | Not defined |

**Note:** 127 is not included in the range as it's considered a loopback address. Any packet sent to this address loops back, there are over 16 million possible addresses here. It is used to set up many server applications on the host, while they all listen to the same port number. Hence they resulted in calling it *localhost*. 
>>>>>>> 2b254977e9e081d94f2bb427632c197e961ecc82

#### According to the parts of the Class

You should note that N stands for Network while H refers to the Host.

In a Class A network, 8 bits are for the network address. The remaining 24 bits are for the host parts of the address. Hence N|H|H|H.
In a Class B network, the initial 16 bits are the network part of the address. While the rest 16 bits are the host parts of the address. Hence N|N|H|H.
In a Class C network, 24 bits are for the network address while the remaining 8 bits are for the host parts of the address. Hence N|N|N|H.
Class D networks (Multicast) Utilized in the multicasting of applications. Multicasting is the process where a single source communicates with many receivers.
Class E networks (Reserved): Most network implementations recognize this address as undefined.

#### Network ID and Host explained. 

The network IDs recognize the network section the host fits in. The host IDs recognizes the single hosts in the same particular network section.
A host can only communicate with other hosts on the same network section. In simple words, think of the network ID as the city you live in and the host as the particular place in the city you live in.


[Network and Host IDs](/introduction-to-subnetting/network-host-id.gif)

[image source](http://www.firewall.cx/networking-topics/protocols/protocols-ip/165-protocols-ip-network-id.html)

#### Public vs Private IP 

Public addresses are the ones used to connect to the internet. With a public IP, you can organize your server (VPN, FTP, WEB, etc), and access any other devices from anywhere on the globe.
Private IP addresses are limited. They cannot receive traffic from the internet. They work within the local network. 
        These private addresses are:

        1. 10.0.0.1 - 10.255.255.255 

        2. 172.16.0.0 - 172.32.255.255 

        3. 192.168.0.0 - 192.168.255.255.

### Routing

This is the specialized process of connecting different IP networks. Hosts of different networks cannot communicate with each other until routed. 

  ![routing](/introduction-to-subnetting/routing.jpg)

  [Image source](https://computernetworkingnotes.com)

IP routing process relies on two types of protocols; routed protocol and routing protocol.

**Routed Protocol:** This is a network protocol used to send user data between networks. It carries data such as web traffic, flies, messages, etc.

**Routing Protocol**: A routed protocol finds paths (routes) for the IP and the routed protocol. Routing protocols run on Routers, Firewalls, Network servers with Network Operating Systems.

Routing Protocols and the relating Routed Protocol (Bonaventure, 2018)
![types-of-routing](/introduction-to-internet-protocol-and-subnetting/routing-protocol.jpg)

To read more on these two protocols, follow this [link](https://www.omnisecu.com/cisco-certified-network-associate-ccna/what-is-the-difference-between-routing-protocols-and-routed-protocols.php).

Routing is then split into 3 categories: 

1. Static 
2. Default 
3. Dynamic

**Static Routing (Non-adaptive):** An administrator assigns the path. It is a route configured by adding to the routing table by an administrator.

**Default Routing:** This sends packets to IP addresses that do not have exact routes. Using the hop devices, regardless of their network type.

**Dynamic Routing(Adaptive):** A router learns dynamic routing by running routed protocols. It adds information to the routing table from connected users immediately.

#### Advantages and disadvantages of each type of routing

|Type of Routing | Advantages | Disadvantages |
|--------------- |------------|---------------|
| Static        | * It has no bandwidth usage between the routers. | * It becomes daunting to handle the chore. Handles this manually. |
| Static       | * Provides security, only the administrator is allowed to have control over the routing network. | * Lots of topography is needed|
| Default      | * They establish routes that will never go down | * They require a great deal of CPU power |
| Dynamic      | * It is easier to configure | * It is less secure compared to static and default routing. |
| Dynamic      | * It is effective in selecting the best route to a destination network. | * It is more expensive in terms of bandwidth and CPU. |

### Subnet Mask

This is a term to denote the number of bits given to the network and the number given to the host. It is the process of setting the host bits to 0s and setting the network bits to 1s.  Here is the formula to calculate subnets;    
        For Network = 2<sup>n</sup> where n = number of desired bits. 
        For Hosts = 2<sup>n+2</sup>
        Example  to calculate subnets and hosts:
To calculate subnets, networks, host ranges you will use a calculator.
Try the IPSubnet Mask Calculator for IPV4 [here](https://www.site24x7.com/tools/ipv4-subnetcalculator.html). 

### Benefits of Subnetting

- Conservation of IP addresses. 
- Controls network growth. 
- Enhances network security. 
- Easier administration. 
- Enhances performance and speed.   
- Reduces network traffic. 
- It simplifies the network.

### Conclusion

The internet today is an integral part of our lives. As such it is important that we are familiar with the core aspects of the network of things. Through this article, we have covered internet protocol, routing, and introduced subnetting. Thank you for reading!

### References

1. [Bonaventure, O. (2018, September 7). Basic of IP Routing Explained with Example](https://www.computernetworkingnotes.com/ccna-study-guide/basic-of-ip-routing-explained-with-example.html)

2. [Robles, G. (2021, April 14). IT: Explained: IP address](https://www.paessler.com/it-explained/ip-address)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
