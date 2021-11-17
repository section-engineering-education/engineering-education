---
layout: engineering-education
status: publish
published: true
url: /concept-of-first-hop-redundancy-protocol/
title: Concept of First Hop Redundancy Protocol
description: In this article, we will discuss FHRP in detail and how it is used to achieve redundancy in networks. First Hop redundancy Protocol (FHRP) presents a virtual default gateway to the organization's network to provide a near 100 percent network uptime. 
author: rabo-james-bature
date: 2021-06-21T00:00:00-10:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/concept-of-first-hop-redundancy-protocol/hero.jpg
    alt: First Hop Redundancy Protocol example image
---
Organizations use various protocols to prevent a single point failure in their networks. One of these protocols is the First Hop Redundancy Protocol (FHRP) which presents a virtual default gateway to the organization's network to provide a near 100 percent network uptime.
<!--more-->
This article will look at how FHRP is used to achieve redundancy in networks, variety of FHRP, and then configure Hot Standby Redundancy Protocol (HSRP), a Cisco proprietary protocol used to implement FHRP.

### Table of contents
- [Goals](#goals)
- [Prerequisite](#prerequisite)
- [Requirements](#requirements)
- [Default gateway](#default-gateway)
- [First Hop Redundancy Protocol (FHRP)](#first-hop-redundancy-protocol-fhrp)
- [Various First Hop Redundancy Protocols](#various-first-hop-redundancy-protocols)
  - [Host Standby Router Protocol (HSRP)](#host-standby-router-protocol-hsrp)
  - [Gateway Load Balancing Protocol (GLBP)](#gateway-load-balancing-protocol-glbp)
  - [ICMP Router Discovery Protocol (IRDP)](#icmp-router-discovery-protocol-irdp)
- [HSRP features](#hsrp-features)
  - [HSRP preemption](#hsrp-preemption)
- [Steps to configuring HSRP](#steps-to-configuring-hsrp)
- [Configuring HSRP protocol on a Cisco router](#configuring-hsrp-protocol-on-a-cisco-router)
- [Conclusion](#conclusion)
- [Activity File](#activity-file)
- [Further reading](#further-reading)

### Goals
At the end of this article, the reader is expected to learn:
- What FHRP is? 
- Available FHRP Options
- Configuring HSRP on a Cisco router.
  
### Prerequisite
To better understand this article, the reader is expected to have a basic understanding of the Cisco Command Line Interface (CLI).

### Requirements
We will use the Cisco packet tracer software for this tutorial which one can download at [Download Packet Tracer](https://www.netacad.com/portal/resources/packet-tracer)

### Default gateway
In a network environment, devices must communicate with each other within the network and outside the network. A device that communicates with other devices outside its network or subnet requires a default gateway.

A default gateway is a network node that allows seamless communication between networks, allowing one device to communicate with another on a different network or subnet. It is the first route taken by an Internet Protocol (IP) packets to ensure that internet requests are sent to the right destination.

The node serving as a default gateway is configured with an Internet Protocol (IP) address. Each client in the network or subnet is configured with the same IP address. Because of this, if the router or the layer three switch serving as a default gateway fails, all devices connected to it will be isolated from the outside network.

To mitigate such failures from occurring, the First Hop Redundancy Protocol (FHRP) was developed.

### First Hop Redundancy Protocol (FHRP)
FHRP is used to prevent network failure at a default gateway. This is achieved by configuring multiple routers with the same IP address and Mac address, thus presenting an illusion of a single virtual router to the hosts in a Local Area Network (LAN). The IP address of the virtual router is configured on all hosts in that network or subnet as their default gateway.

When an IP packet is sent from host devices on that network, the host uses Address Resolution Protocol (ARP) to resolve the MAC address associated. Any physically active router processes the packet sent to this MAC address within the router group. By doing so, if one router goes down, the IP packet will be processed and forwarded by the next active router.

FHRP uses a mechanism known as First Hop Redundancy to determine which router takes an active role in forwarding traffic and when a standby router should take over this active role.

### Various First Hop Redundancy Protocols
There are various First Hop Redundancy Protocols available. Some of these protocols are proprietary, while others are standard protocols.

#### Host Standby Router Protocol (HSRP)
HSRP is a Cisco Proprietary FHRP that uses a large set of routers known as standby group or HSRP group to present the illusion of a single virtual router to a host. In this standby group, a single router is elected to take over as the active router if the active router fails.

HSRP active and standby routers send periodic HSRP messages once the election process has been completed.

#### HSRP features
HSRP uses both active and standby routers to make a failover seamless in a network, thus providing better redundancy. HSRP uses the numerically highest IPv4 address as the active router to determine the active and standby router. HSRP uses the "HSRP priority" option to determine the active router for better control of the election. 

The router configured with the highest priority value is elected as the active router. Still, in a situation whereby all routers have equal priorities, the router with the highest numerical IP address will be the Active router.

#### HSRP preemption
An active router is first elected using the priority value configured on the routers and then by the IP address. In each situation, a higher value is of greater priority.

A router elected as the active router will continue to function as the active router even when a new router with a higher priority value and IP address comes online. This makes it impossible for the newly added router to take over the processing and forwarding of IP packets.

To enable a new election process, the **standby preempts** interface command is used.

#### Gateway Load Balancing Protocol (GLBP)
Gateway Load Balancing Protocol, just like Hot standby routing protocol, is a proprietary protocol that provides gateway redundancy while supporting load balancing over multiple routers (gateway).

In GLBP, all routers in the GLBP group share the same virtual IP address but uses different MAC addresses with all the virtual routers participating in the forwarding of packets.

#### ICMP Router Discovery Protocol (IRDP)
IRDP is a legacy FHRP that uses Internet Control Message Protocol (ICPM) to allow hosts to discover routers on their network using **router advertisement** message to provide IPv4 connectivity to other non-local IPv4 networks.

IRDP does not provide authentication to its advertisement messages; thus, the protocol is insecure as hosts running IRDP can be spoofed.

### Steps to configuring HSRP
When configuring HSRP on a Cisco router, the following steps are used:
- Configure HSRP version using the `Standby version` interface command.
- Configure the virtual IP address for the HSRP group using the `standby group number` followed by the IP-address.
- Use the `standby [group-number] priority` followed by the priority value.
- To ensure that a new election is triggered when another router with higher priority is added to the HSRP group, use the `standby preempt` interface command.

### Configuring HSRP protocol on a Cisco router

![Topology used in this tutorial](/engineering-education/concept-of-first-hop-redundancy-protocol/topo.JPG)

The topology above will be used to configure HSRP for a better understanding of this tutorial.

To configure HRSP on the active router, the following steps are used:
1.	Configure the HSRP version using the `standby version 2` interface command on the interface gigabit 0/0. This command will enable the HSRP version on the interface.
2.	To configure the HSRP IP address, using the `standby 2 ip 172.10.1.10`. This command sets the standby group number to 2, and the virtual address, which will be the default gateway for all devices on this group, is set to '172.10.1.10'.
3.	The `standby 2 priority 150` command sets the active router's priority to 150 and allows the router to be elected as the **active router** because it has the highest priority value in the standby group.
4.	Use the `standby preempt` to ensure that a new election is triggered when another router with higher priority is added to the standby group.

![Active router configuration on a Cisco router](/engineering-education/concept-of-first-hop-redundancy-protocol/active.JPG)

The image above shows the configuration of an active router.

### Configuring HSRP on the standby router
The following steps are used to configure a standby router.
1.	Configure the HSRP version using the `standby version 2` interface command on the interface gigabit 0/0. This command will enable the HSRP version on the interface.
2.	To configure the HSRP IP address, using the `standby 2 ip 172.10.1.10` . This command sets the standby group number to 2, and the virtual address, which will be the default gateway for all devices on this group, is set to '172.10.1.10'.

This router takes over the forwarding of the packet only when the active router fails.

![standby router configuration on a Cisco router](/engineering-education/concept-of-first-hop-redundancy-protocol/standby.JPG)

The image above shows the configuration of a standby router.

To summarize, the reader has learned the following:
- What a default gateway is.
- What FSRP is and various FSRP options available.
- What HSRP is and how to configure it on a Cisco router.
  
### Conclusion
Having a network with a good uptime help organization offer effective services to their customers. Various redundant protocols have been developed and are being implemented to ensure the availability of these services. 

Organizations should use a protocol like FHRP to help reduce the rate of network downtime to provide effective services.

### Activity file
The readers can access the configuration file used for this tutorial from this Github repository [Activity File](https://github.com/raboba2re/config/blob/main/hsrp.pkt).

Happy coding!

### Further reading 
- [First Hop Redundancy protocol](https://www.expertnetworkconsultant.com/configuring/understanding-first-hop-redundancy-protocols-fhrp/)
- [Gateway Load Balancing Protocol](https://en.wikipedia.org/wiki/Gateway_Load_Balancing_Protocol)
- [Hot Standby Router Protocol](https://en.wikipedia.org/wiki/Hot_Standby_Router_Protocol)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
