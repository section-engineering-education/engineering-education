---
layout: engineering-education
status: publish
published: true
url: /internet-protocols/
title: Understanding IPV4 and IPV6 protocols
description: This article will be a walk through on the IPv4 and IPv6 Internet protocols which make communication on the internet possible. IPv4 and IPv6 are the actual protocols tasked with data transmission in the form of packets and datagrams.
author: mackrine-awino
date: 2021-05-27T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/internet-protocols/hero.jpg
    alt: Internet Protocols Hero Image
---
Internet protocols are what make communication on the internet possible. Every device connected to the internet is assigned an IP address. This enables the identification and location of networked computers on the internet. 
<!--more-->
Internet protocols also enable the transportation of data items on the internet. The data items are transmitted in form of independent messages whose contents are not guaranteeted.

These messages are called datagrams. Datagrams are transmitted from one device to another without connections to one another by using internet protocols. The datagrams are transmitted with utmost independence from all others.

There are two versions of internet protocol, i.e., internet protocol version 4 and internet protocol version 6, used at the network layer of the [OSI model](https://www.imperva.com/learn/application-security/osi-model/). 

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction to IPv4 and IPv6](#introduction-to-IPv4-and-IPv6)
3. [Internet protocol version 4](#internet-protocol-version-4)
4. [Internet protocol version 6](#internet-protocol-version-6)
5.  [Similarities between IPv4 and IPv6](#similarities-between-IPv4-and-IPv6)
6. [Differences between IPv4 and IPv6](#differences-between-IPv4-and-IPv6)
7. [Why does IPv6 take preference to IPv4?](#Why-does-IPv6-take-preference-to-IPv4)
8. [Conclusion](#conclusion)

### Prerequisites
To understand the content of this article, a reader should have the following:
- A beginner's understanding of computer networking.
- Basic knowledge of internet communication and data transmission.

### Introduction to IPv4 and IPv6
IPv4 and IPv6 are the actual protocols tasked with data transmission in the form of packets and datagrams. 

IPv4 protocol is mainly used with [ethernets](https://en.wikipedia.org/wiki/Ethernet)	during packet switching in the link-layer networks.	

IPv6 protocol being more newfangled has improved capabilities as compared to IPV4. Hence it can even have infinite addresses replacing IPV4 due to the daily growth in technology and increased number of networks being set up.

### Internet protocol version 4
Internet protocol version 4, just as its name suggests, was the fourth version of the IP suite developed by the [DARPA](https://www.darpa.mil/work-with-us/technology-demonstrations#:~:text=DARPA%20is%20developing%20technologies%20to,deriving%20insights%20from%20diverse%20datasets.&text=The%20electromagnetic%20spectrum%20functions%20as,and%20voice%20of%20modern%20society.) and released for use in 1982. It is a significant protocol of the standard networking protocols on the internet and all the other packet switching networks. 

#### IP Header
![IPv4 Communication Protocol](/engineering-education/internet-protocols/version_two.jpeg)

[Image from Wikipedia](https://www.wikipedia.org/)


IPv4 still controls the internet traffics despite the development of IPv6 using a 32bit address space providing over four million unique addresses.

IPv4 being a connectionless protocol, does not guarantee if data is delivered, neither does it arrange the data packets properly. Some packets may also have duplicates, so the organization is all addressed by the layer that handles transport, i.e., [TCP](https://www.sdxcentral.com/resources/glossary/transmission-control-protocol-tcp/#:~:text=Transmission%20Control%20Protocol%20(TCP)%20%E2%80%93,referred%20to%20as%20TCP%2FIP.) or the [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol). IPv4 also has special and multicast addresses for [private](https://en.wikipedia.org/wiki/Private_network) networks with approximately eighteen million addresses.

IPv4 address digits are separated with decimal points as shown below:

#### Examples of IPv4 addresses
```bash
               172.16.254.1

               169.254.255.255 
```

### IPv4 addressing
Three different types of addressing modes supported in IPv4, namely:

- Unicast addressing mode

Unicast addressing mode only allows for data to be sent to a specific host at a time. The address of the data destination is a 32-bit IP address of the host device.

- Broadcast addressing mode

Broadcast addressing mode involves the transmission of a data packet to a network of hosts with the address of the destination indicated as a special broadcast address. The packet sent can be processed by any host on the network.

- Multicast addressing mode

This involes the use of both Unicast addressing mode and Broadcast addressing mode. The packet is not addressed to any specific host or any network of hosts and is processed by more than one host device on the network.
                        
### Internet protocol version 6
[Internet protocol version 6](https://www.section.io/engineering-education/why-ipv6-transition-is-important/) is the newest version of the internet protocol suite as of now developed to replace the fourth version, the IPv4. 

IPv6 was brought into existence by the [IETF](https://www.ietf.org/blog/ipv6-internet-standard/) because IPv4 had exhausted its addresses. IPv6 was intended to replace IPv4. However, this has not been the case; IPv4 has continued to live on.

#### IP Header
![IPv6 Communication protocol](/engineering-education/internet-protocols/version_one.jpeg)

[Image from Wikipedia](https://www.wikipedia.org/)

IPv6 uses an address of 128 bits hence allowing 2^128 addresses. IPv6 is not designed to work together with IPv4; thus, there can not be any communication.	

In IPv6, addresses are represented in 8 groups with colons in between every four digits that are to base 16, i.e., [hexadecimal](https://simple.wikipedia.org/wiki/Hexadecimal#:~:text=The%20hexadecimal%20numeral%20system%2C%20often,numbers%20and%20six%20extra%20symbols.) digits. The address is a long line of digits that can be shortened using a shortening technique to not cause confusion. 

#### Example
```bash
        2001:0db8:0001:0000:0000:0ab9:COA8:0102 is shortened to 2001:db8:1::ab9:COA8:102. both the addresses refer to the same machine on the internet only difference is one is condensed to reduce its length.
```

There are three methods of transition from IPv4 to IPv6, as stated below:
1. Dual stacking- This involves having both the IPv4 and IPv6 on the same device.
2. Tunneling- Involves communication of users with IPv6 to users with IPv4 to reach IPv6.
3. Network Addressing Translation- Involves communication of hosts with different IP versions. 

### Similarities between IPv4 and IPv6
Despite being different protocols which cannot communicate with each other, IPv4 and IPv6 have specific qualities that bind them. 
These qualities are discussed below:	
1. They both are internet protocols that used communication on the internet.
2. Both of the IP versions are connectionless protocols that packet switch.
3. They both have the packet header section.
4. Both IPv4 and IPv6 allow for the manual assignment of IP addresses.

### Differences between IPv4 and IPv6
1. IPv6 has a packet flow identification in the header while IPv4 offers no packet flow information.
2. IPv6 uses 128-bit hexadecimal, i.e., base 16 IP addresses, while IPv4 uses 32-bit IP addresses written in a decimal number system which is a base 10.
3. IPv4 supports dynamic host configuration protocol setup, while IPv6 supports renumbering address setup.
4. IPv4 has no connection integrity, whereas IPv6 has end-to-end connection integrity.
5. IPv4 uses the decimal representation of addresses, while IPv6 uses hexadecimal representation.

### Why does IPv6 take preference to IPv4?
Other than having larger addressing space, IPv6 has other beneficial features discussed below:
- It allows for the address allocated to be done in a hierarchy enhancing supernetting.
- It increases the [multicast](https://en.wikipedia.org/wiki/Multicast_address#:~:text=From%20Wikipedia%2C%20the%20free%20encyclopedia,for%20a%20designated%20network%20service.) addressing and helps with the adjustment of service delivery.
- IPv6 ensures the portability and security of its host devices.


### Conclusion
The rapidly growing population of the world is pushing for the gradual phase-out to Ipv4. In addition, the frequent advancement in technology in almost every sector in the community has led to the development of more networks.

Leading to the depletion of all IPv4 addresses, IPv6 is slowly becoming the future of the internet IP addressing system.	

Blissful reading!

---
Peer Review Contributions by: [Willies Ogola](/authors/willies-ogola/)

