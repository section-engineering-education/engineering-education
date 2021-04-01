---
layout: engineering-education
status: publish
published: true
url: /engineering-education/border-gateway-protocol/
title: Border Gateway Protocol - Why do we need it and how does it work?
description: A brief introduction to the Internet's Border Gateway Protocol, its functioning, capabilities and importance. 
author: shreya-a-n
date: 2020-07-08T00:00:00-12:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/border-gateway-protocol/hero.jpg
    alt: border gateway protocol

---
[Border Gateway Protocol(BGP)](https://en.wikipedia.org/wiki/Border_Gateway_Protocol) is a *standardized exterior gateway protocol designed to exchange routing and reachability information among autonomous systems (AS) on the Internet*. In the most basic sense, BGP is a routing protocol that holds the Internet together. It is responsible for choosing the best route for a packet from its source to destination via multiple autonomous systems.
<!--more-->

### What is BGP?
When the concept of the Internet was first formulated, and for a few more years that followed, the Internet was a tiny cloud. Consequently, connectivity was achieved at the expense of static routes, i.e. routing tables on the routers were configured beforehand and no dynamic changes were entertained.

But as the Internet proliferated, static routes were no longer enough. Routing protocols faced the need to be more dynamic and incorporate new routes/changes in existing routes depending on various factors like traffic levels, number of router hops, bandwidth, reliability, etc. This ability to compensate for changes in network topology made dynamic routing foundational for the Internet.

### What are Autonomous Systems?
As the number of devices on the Internet increased, so did the number of routes. When it became increasingly difficult to keep track of this profusion of routes, the networking world decided to use autonomous systems.

The concept of autonomous systems stems from the basic [definition of the Internet](https://en.wikipedia.org/wiki/Internet), which is *global system of interconnected computer networks*. An **Autonomous System(AS)** on the Internet is a network or a group of networks using the same routing policy and usually serviced by the same Internet Service Provider (ISP). Each autonomous system is allocated a unique identification number called **Autonomous System Number(ASN)** which is used by various routing protocols.

BGP allows different autonomous systems on the Internet to share routing information. The gateways of autonomous systems are called **Autonomous System Boundary Routers (ASBR)**. ASBRs are responsible for collecting routing information from their neighbors, maintaining BGP routing tables, and further advertising them to their peers.

Let us consider a simple example to understand how BGP binds the Internet together. AS 51 and AS 49 are BGP peers and have established a neighborship aimed at exchanging routing information with each other. AS 49 and AS 234, AS 51 and AS 110, AS 234, and AS 110 have similar neighborships established. BGP allows each peer to collect routing information from its neighboring peer and later advertise that information, in its entirety, further. As a result, the ASBR in AS 51 knows how it can route packets to AS 234 even though they aren’t directly connected. *BGP is a path-vector routing protocol because routing tables in ASBRs contain mappings of network prefixes to lists of autonomous systems making up the path.*

![BGP: Example image](/engineering-education/border-gateway-protocol/BGP.jpg)

Let us assume that device 1, stationed in India wants to connect to device 2, stationed in the US. Device 1 has subscribed to the services of an ISP whose network has an autonomous number of 51 and device 2 has subscribed to the services of an ISP whose network has an autonomous number of 234. When connecting to Device 2, Device 1 sends packets with source IP being its own IP address and destination IP being Device 2’s IP address. The packet first reaches AS 51’s gateway and the router there concludes that the packet’s destination is not in its own network. It routes this packet through AS 51’s internal routers.

*Note that the routing process internal to autonomous systems is achieved using protocols like Interior Gateway Routing Protocol(IGRP), Open Shortest Path First(OSPF), Routing Information Protocol(RIP), Intermediate System to Intermediate System (IS-IS), all of which, unlike BGP, cannot be used externally.*

In the example topology, observe that there are two routes to AS 234 from AS 51.

- AS 51 -> AS 49 -> AS 234
- AS 51 -> AS 110 -> AS 234

When there are multiple paths to a destination, **BGP has the ability to rank all the paths from most preferred to least preferred** according to the information collected by an organization’s routing policy, which is based on metrics like load, delay, reliability, cost, etc. These metrics are dynamic in nature and consequently, BGP routing tables reflect the best path to a destination based on the existing network conditions. ASN 51’s ASBR looks up the path to the packet’s destination and forwards it via either AS 49 or AS 110, whichever is the most preferred then. Without BGP, ASN 51’s ASBR would never know which path to forward the packet on so that it reaches its destination.

### How secure is BGP?
It is important to note that BGP was designed to create a global mesh of networks, and security wasn’t an important aspect then. Consequently, BGP does very little on its own to thwart attacks and exploitation. Route hijacking is one of the more common BGP attacks wherein the attacker uses BGP to advertise false/harmful routes to the peers and thereby, easily disrupts the internet by causing cyberattacks, shutting down services, or creating reliability issues. 

To secure BGP, the Internet Engineering Task Force (IETF) advocates ISPs and enterprises to enter a chain of trust starting from the Internet Assigned Numbers Authority(IANA) and register their authorized routes with autonomous systems that are BGP peers. AS 51 and AS 49 enter an agreement that curtails them from exchanging false routes. In addition to this, an ISP conventionally configures packet inspectors and filters at its ASBRs to exercise caution. BGP, thus, provides an ISP with more control over the routes it advertises and the routes it accepts from its peers. For this reason, among many others, one can undoubtedly say that **BGP is the Internet’s leading Exterior Gateway Protocol**.

### Additional Resources
- [Border Gateway Protocol - Wikipedia](https://en.wikipedia.org/wiki/Border_Gateway_Protocol)
- [Dynamic Routing Protocols](https://www.ciscopress.com/articles/article.asp?p=24090&amp;seqNum=6)
- [BGP Security: No Quick Fix](https://www.networkcomputing.com/networking/bgp-security-no-quick-fix)
