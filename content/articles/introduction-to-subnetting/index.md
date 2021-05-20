---
layout: engineering-education
status: publish
published: true
url: /introduction-to-subnetting/
title: Introduction to Subnetting
description: Subnetting is a partition process of splitting a single-page network into two or more strands. This process enhances the efficiency of the computer network. This article will give good detail on how subnetting works and the terminologies behind computer networking.
author: anyebe-blessing-ene
date: 2021-05-20T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:
  -url: /engineering-education/introduction-to-subnetting/hero.jpg
  alt: Subnetting image example
---
In this article, we will get to understand important terms of the Network.
<!--more-->
### Table of Contents
- Internet Protocol (IP) Address
- IPV4 Diagram
- IP Classes
- Public vs Private IP
- IPV4 vs IPV6
- Subnet Mask
- Routing
- Classless Inter-Domain Routing (CIDR)
- Broadcast ID 

Let’s dive right in.

**Subnetting** is the process of partitioning a network into two or more networks based on utilization. It is a logical process of splitting a single-page network into more strands. Subnetting came into the internet in 1978. 

A protocol is a set of standards and rules that define the language that devices can use to communicate. There are several existing protocols used in networking such as TCP, UDP, IP and, ICMP. In this article, we will only discuss the IP.

### Internet Protocol address (IP Address)

An IP is a distinctive identifier. It is the foundational protocol that allows the internet to work. It is situated in the internet layer of the TCP/IP model. There are  32- bits numbers.
Example; 216.58.216.164 (Google’s IPV4 IP).

#### IPV4 Structure (Internet Protocol Version 4)

IPV4 is the first version of IP for the internet. The Defense Advanced Research Projects Agency (https://www.darpa.mil/ "DARPA") developed IPV4 in 1981. They deployed for use in the ARPANET in 1983. 

An IPV4 is a 32-bits logical number displayed in decimal notation and divided into 8bits each (1 octet). 

A particular address consists of; 

i. Host identity 

ii. Network identity.

#### Diagram of IPV4

216     . 172      . 16     . 1

↓         ↓        ↓           ↓
11011000.10101100.00010000.00000001
↓ 
One byte = Eight bits = One octet
             ↓ 
Thirty-two bits (4 x 8) = 4 bytes = 4 octet

#### IP Classes

Classes are how you can identify network addresses on the internet. The network class an IP address fits into is ascertained by the binary numbers. IP classes are in 5 parts ranging from class A - E. Class A-C are the major used classes.

|class | Range  | Parts of the class | Network IDs | Host IDs | Start address | End address | Leading bits | Size of network number bit field |
| ---- | ------ | ------------------ | ----------- | -------- | ------------- | ----------- | ------------ | ------------------- |
| A    | 1 -126 | N|H|H|H  | 128  | 16,777,216  | 0.0.0.0 | 127.255.255.255 | 0 | 8 |
| B    | 128 -191 | N|N|H|H  | 16,384 | 65,536 | 128.0.0.0 | 191.255.255.255 | 10 | 16 |
| C    | 192-223 | N|N|N|H  | 2,097,152 | 256 | 192.0.0.0 | 223.255.255.2555 | 110 | 24 |
| D    | 224-239 | Not deThe network class an IP address fits into is ascertained by the binary numbersfined | Not defined | Not defined | 224.0.0.0 | 1110 | Not defined |
| E    | 240-255 | Not defined | Not defined | Not defined | 240.0.0.0 | 1111 | Not defined |
(Robles, 2021)
**Note:** 127 is not included in the range as it's considered a loopback address. Any packet sent to this address loops back, there are over 16 million possible addresses here. Used to set up many server applications on the host, while they all listen to the same port number. Hence they resulted in calling it *localhost*. 

#### According to the parts of the Class

In a Class A network, 8 bits are for the network address. While the rest 24 bits are for the host parts of the address. In a Class B network, the initial 16 bits are the network part of the address. While the rest 16 bits are the host parts of the address. In a Class C network, 24 bits are for the network address while the remaining 8 bits are for the host parts of the address. 
Class D networks (Multicast) Utilized in the multicasting of applications. Multicasting is the process where a single source communicates with many receivers.
Class E networks (Reserved): Most network implementations recognize this address as undefined.

#### Public vs Private IP 

Public addresses are the ones used to connect to the internet. With a public IP, you can organize your server (VPN, FTP, WEB, etc), and access any other devices from anywhere on the globe.
Private IP addresses are limited. They cannot receive traffic from the internet. Used to work within the local network. 
        Example:
        i.10.0.0.1 - 10.255.255.255 
        ii.ii. 172.16.0.0 - 172.32.255.255 
        iii.iii. 192.168.0.0 - 192.168.255.255.

#### IPV4 vs IPV6

Tabular representation of the differences between both versions of the internet protocol.

| IPV4                    |     IPV6             |
| ----------------------- | -------------------- |
| The oldest version of the internet protocol | The newest version of the internet protocol |
| 32 bits logical address  |  128 bits logical address  |
| Uses dot-decimal notations, less suitable for mobile |  Uses hexadecimal colon-separated notations, best suited for mobile. |
| Internet protocol security is optional  |  Internet protocol security is mandatory  |
| The latest packet size is 576 bytes | The least packet size is 1208 bytes |
| Its security depends on applications | Has its own security protocol called IPSec | 
| Networks configured with DHCP | Has its auto-configuration capabilities |
| It is a numeric address method | It is an alphanumeric address method |
| Has 5 different classes from A - E | Allows an unlimited number of IP addresses to be stored. |

### Subnet Mask

This is a term to denote the number of bits given to the network and the number given to the host. It is the process of setting the host bits to 0s and setting the network bits to 1s.  Here is the formula to calculate subnet;     
        For Network = 2^n where n = number of desired bits. 
        For Hosts = 2^n+2 
        Example  to calculate subnets and hosts:
        Borrow 2 bits  (I.e n = 2)
| S   | S   | H   | H   | H   | H   | H   | H   |
| --- | --- | --- | --- | --- | --- | --- | --- |
        Number(#) of subnets = 22 = 4. 
        Subnet mask = 2bits = 128 + 64 = 192
        Range of hosts = 2^6 = 64   

|        | Range      | Usable Range |
| ------ | ---------- | ------------ |
| Network ID | 0-63 | 65 - 126 |
|     |  64-127 | 129 - 190 |
| Broadcast Address | 192 - 255 |     |

To calculate subnets, networks, host ranges you will use a calculator. 
IPSubnet Mask 	Calculator for IPV4: 
(https://www.site24x7.com/tools/ipv4-subnetcalculator.html) 

### Routing

This is the specialized process of connecting different IP networks. Hosts of different networks cannot communicate with each other until routed. 

  ![routing](/introduction-to-subnetting/routing.jpg)
  
  [Image source](https://computernetworkingnotes.com)

IP routing process relies on two types of protocols; 
Routed protocol and Routing protocol.

**Routed Protocol:** This is a network protocol used to send user data between networks. It carries data such as web traffic, flies, messages, etc.
**Routing Protocol**: A routed protocol finds paths (routes) for the IP and the routed protocol. Routing protocols run on Routers, Firewalls, Network servers with Network Operating Systems.

Routing Protocols and the relating Routed Protocol (Bonaventure, 2018)
| Routing Protocol   | Routed Protocol  |
| ---------------- | ----------------- |
| RIP, IGRP, OSPF, EIGRP | IP |
| RIP, NLSP, EIGRP  | IPX  |
| RMTP, AURP, EIGRP | Appletalk  |

Routing is categorized into 3 places; i. Static ii.Default iii. Dynamic

**Static Routing (Non-adaptive):** An administrator assigns the path. It is a route configured by adding to the routing table by an administrator. 

**Default Routing:** This sends packets to IP addresses that do not have exact routes. Using the hop devices, regardless of their network type.

**Dynamic Routing(Adaptive):** A router learns dynamic routing by running routed protocols. It adds information to the routing table from connected users immediately.

#### Advantages and disadvantages of each type of routing

| Type of routing  | Advantages  | Disadvantages  |
| ---------------- | ----------- | -------------- |
| Static    | * It has no bandwidth usage between the routers. | * It becomes daunting to handle the chore it is to handle this manually |
             | * Provides security, only the administrator is allowed to have control over the routing network. | * Lots topography is needed. |
             | * Has no overhead CPU usage on the router. |
| Default   | * They establish routes that will never go down | * They require a great deal of CPU power |
| Dynamic   | * It is easier to configure | * It is less secure compared to static and default routing. |
            | * It is effective in selecting the best route to a destination network. | It is more expensive in terms of bandwidth and CPU. |

**Classless Inter-Domain Routing (CIDR):** CIDR is based off on the idea of subnet masks. It makes it possible to create supernets adding to subnets. CIDR helps extend the number of available addresses. The CIDR stores as a suffix in the IP address like so; 201.105.34.7/24 (/24) is the CIDR in this address.

**Broadcast Network:** The last ID of a subnet range used to communicate to the host bits within that network. 255.255.255.255 (Broadcast IP).

### Benefits of Subnetting

- Conservation of IP addresses.
- Controls network growth. 
- Enhances network security. 
- Easier administration. 
- Enhances performance and speed.   
- Reduces network traffic. 
- It simplifies the network.

### References

1. [Bonaventure, O. (2018, September 7). Basic of IP Routing Explained with Example](https://www.computernetworkingnotes.com/ccna-study-guide/basic-of-ip-routing-explained-with-example.html)

2. [Robles, G. (2021, April 14). IT: Explained: IP address](https://www.paessler.com/it-explained/ip-address)
