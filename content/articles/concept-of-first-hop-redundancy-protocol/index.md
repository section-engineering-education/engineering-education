
# Concept of First Hop Redundancy Protocol 

![Hero Image](/engineering-education/concept-of-first-hop-redundancy-protocol/hero.jpeg)
[source](https://unsplash.com/photos/7wBFsHWQDlk)

## Table of contents
- [Concept of First Hop Redundancy Protocol](#concept-of-first-hop-redundancy-protocol)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Goals](#goals)
    - [Prerequisite](#prerequisite)
    - [Requirements](#requirements)
    - [Default gateway](#default-gateway)
    - [First Hop Redundancy Protocol (FHRP)](#first-hop-redundancy-protocol-fhrp)
  - [Various First Hop Redundancy Protocols](#various-first-hop-redundancy-protocols)
      - [Host Standby Router Protocol (HSRP)](#host-standby-router-protocol-hsrp)
      - [Gateway Load Balancing Protocol (GLBP)](#gateway-load-balancing-protocol-glbp)
      - [ICMP Router Discovery Protocol (IRDP)](#icmp-router-discovery-protocol-irdp)
    - [HSRP features.](#hsrp-features)
      - [HSRP preemption](#hsrp-preemption)
    - [Steps to configuring HSRP](#steps-to-configuring-hsrp)
    - [Configuring HSRP protocol on a Cisco router](#configuring-hsrp-protocol-on-a-cisco-router)
    - [Conclusion](#conclusion)
    - [Activity File](#activity-file)
    - [Further reading](#further-reading)

## Introduction
Organizations use various protocols to prevent a single point  failure in their works, one of these protocols is the First Hop redundancy Protocol (FHRP) which presents a virtual default gateway to the organization's network to provide a near- 100 percent network uptime.
In this article, we are going to look at how FHRP is used to achieve redundancy in networks, variety of FHRP and then configure Hot Standby Redundancy Protocol (HSRP), which is a Cisco propriety protocol use in the implementation of FHRP.

## Goals
At the end of this article, the reader is expected to learn:
- What FHRP is
- Various FHRP options available
- How to configure HSRP on a Cisco router.
  
### Prerequisite
To better understand this article, the reader is expected to have a basic understanding of the Cisco Command Line Interface (CLI)

### Requirements
The Cisco packet tracer software will be used for this tutorial which can be downloaded at [Download Packet Tracer](https://www.netacad.com/portal/resources/packet-tracer)

### Default gateway
In a network environment, devices are required to communicate with each other within the network and outside the network. For a device to communicates with over devices outside its network or subnet, it requires a default gateway.
A default gateway is a network node that allows seamless communication between networks, allowing one device to communicate with another on a different network or subnet. It is the first route taken by an Internet Protocol (IP) packets to ensure that internet requests are sent to the right destination.
The node serving as a default gateway is usually is configured with an Internet Protocol (IP) address. Each client in the network or subnet is configured with the same IP address, because of this, if the router or the layer 3 switch serving as a default gateway fails, all devices connected to it will be isolated from the outside network.
To mitigate such failures from occurring, the First Hop Redundancy Protocol (FHRP) was developed.

### First Hop Redundancy Protocol (FHRP)
FHRP is used to prevent network failure at a default gateway. This is achieved by configuring multiple routers with the same IP address and Mac address, thus presenting an illusion of a single virtual router to the hosts in a Local Area Network (LAN).
The IP address of the virtual router is configured on all hosts in that network or subnet as their default gateway. 
When an IP packet is sent from host devices on that network, the host uses Address Resolution Protocol (ARP) to resolve the MAC address associated. The packet sent to this MAC address is processed by any physically active router within the router group. By so doing, if one router goes down, the IP packet will be processed and forwarded by the next active router.
FHRP uses a mechanism known as First Hop Redundancy to determine which router takes an active role in forwarding traffic and when a standby router should take over this active role.

## Various First Hop Redundancy Protocols
There are various First Hop Redundancy Protocols available, some of these protocols are proprietary, while others are standard protocols.

#### Host Standby Router Protocol (HSRP)
HSRP is a Cisco Proprietary FHRP that uses a large set of routers known as standby group or HSRP group to present the illusion of a single virtual router to a host. In this standby group, a single router is elected to take over as the active router if the active router fails.
HSRP active and standby routers send periodic HSRP messages once the election process has been completed.

#### Gateway Load Balancing Protocol (GLBP)
Gateway load balancing protocol, just like Hot standby routing protocol, is a proprietary protocol that provides gateway redundancy while at the same time support load balancing over multiple routers (gateway).
In GLBP, all routers in the GLBP group share the same virtual IP address but uses different MAC addresses with all the virtual routers participating in the forwarding of packets.

#### ICMP Router Discovery Protocol (IRDP)
IRDP is a legacy FHRP that uses Internet Control Message Protocol (ICPM) to allow hosts to discover routers on their network using **router advertisement** message to provide IPv4 connectivity to other non-local IPv4 networks.
IRDP does not provide authentication to its advertisement messages because of this, the protocol is insecure as hosts running IRDP can be spoofed.

### HSRP features.
HSRP uses both active and standby routers to make a failover looks seamless in a network, thus providing redundancy.
To determine the active and standby router, HSRP by default uses the numerically highest IPv4 address as it the active router. For better control of the election, HSRP uses the "HSRP priority" option to determine the active router. 
The router configured with the highest priority value is elected as the active router, but in a situation whereby all routers have equal priorities, the router with the highest numerical IP address will be the Active router.

#### HSRP preemption
An active router is first elected using the priority value that is configured on the routers and then by the IP address, in each situation, a higher value is of greater priority.
A router elected as the active router will continue to function as the active router even when a new router with a higher priority value and IP address comes online, this makes it impossible for the newly added router to take over the processing and forwarding of IP packets.
To enable a new election process, the **standby preempts** interface command is used.

### Steps to configuring HSRP
When configuring HSRP on a Cisco router, the following steps are used:
- Configure HSRP version using the ```Standby version``` interface command
- Configure the virtual IP address for the HSRP group using the ```standby group number``` followed by the IP-address
- Use the ``` standby [group-number] priority``` followed by the priority value
- To ensure that a new election is triggered when another router with higher priority is added to the HSRP group, use the ```standby preempt``` interface command

### Configuring HSRP protocol on a Cisco router
![Topology used in this tutorial](/engineering-education/concept-of-first-hop-redundancy-protocol/topo.jpeg)

The topology above will be used to configure HSRP for a better understanding of this tutorial.

To configure HRSP on the active router, the following steps are used:
1.	Configure the HSRP version using the ```standby version 2``` interface command on the interface gigabit 0/0. This command will enable the HSRP version on the interface.
2.	To configure the HSRP IP address, using the ```standby 2 ip 172.10.1.10```. This command set the standby group number to 2, and the virtual address, which will be the default gateway for all devices on this group is set to '172.10.1.10'.
3.	The ```standby 2 priority 150``` command set the active router's priority to 150 is allows the router to be elected as the **active router** because it has the highest priority value in the standby group.
4.	Use the ```standby preempt``` to ensure that a new election is triggered when another router with higher priority is added to the standby group.
![Active router configuration on a Cisco router](/engineering-education/concept-of-first-hop-redundancy-protocol/topo.jpeg)
The image above shows the configuration of an active routeer.

Configuring HSRP on the **standby router**
The following steps are used to configure a standby router.
1.	Configure the HSRP version using the ```standby version 2``` interface command on the interface gigabit 0/0. This command will enable the HSRP version on the interface.
2.	To configure the HSRP IP address, using the ```standby 2 ip 172.10.1.10``` . This command set the standby group number to 2, and the virtual address, which will be the default gateway for all devices on this group is set to '172.10.1.10'.
This router takes over the forwarding of the packet only when the active router fails.
![standby router configuration on a Cisco router](/engineering-education/concept-of-first-hop-redundancy-protocol/stanby.jpeg)
The image above shows the configuration of a standby router
To summarize, the reader has learned the following:
- What a default gateway is
- What FSRP is and various FSRP options available
- What HSRP is and how to configure it on a Cisco router.
  
### Conclusion
Having a network with a good uptime help organization to offer effective services to their customers. Various redundant protocols have been developed and are being implemented to ensure the availability of these  services, organizations should use protocol like FHRP to help reduce the rate of network downtime so as to provide effective services.

### Activity File
The configuration file used for this turturail can be accessed from this Github repository [Activity File](https://github.com/raboba2re/config/blob/main/hsrp.pkt)

### Further reading 
- [First Hop Redundancy protocol](https://www.expertnetworkconsultant.com/configuring/understanding-first-hop-redundancy-protocols-fhrp/)
- [Gateway Load Balancing Protocol](https://en.wikipedia.org/wiki/Gateway_Load_Balancing_Protocol)
- [Hot Standby Router Protocol](https://en.wikipedia.org/wiki/Hot_Standby_Router_Protocol)
