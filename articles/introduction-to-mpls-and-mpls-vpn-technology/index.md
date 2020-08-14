---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-mpls-and-mpls-vpn-technology/
title: Introduction to MPLS and MPLS VPN technology
description: This article briefly introduces Multi-protocol Label Switching(MPLS) and talks about how Virtual Private Networks running on MPLS cores offer reliability, security and enhanced performance.
author: shreya-a-n
date: 2020-07-30T00:00:00-09:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-mpls-and-mpls-vpn-technology/hero.jpg
    alt: VPN example image laptop

---
**Multi-Protocol Label Switching(MPLS)** is a method of switching packets using labels instead of IP addresses or Layer 3 information. It is protocol-agnostic and speeds up packet forwarding and routing. Back when MPLS was first introduced, it showed a considerable boost in speed and took substantial load off networks by laying off IP address inspection. Today, MPLS is used not only to facilitate higher speed requirements but to develop advanced and augmented applications and services over the existing network infrastructure.
<!--more-->

### How does MPLS work?
**IP forwarding/routing** is a concept you might already be familiar with. *It is the process of a router forwarding/routing a packet using information stored in its routing tables. It is a layer 3 protocol.*

When a router receives a packet, it examines its IP header, fetches the destination IP and decides which path to forward the packet onto, such that it reaches its intended destination, based on the routing table. **MPLS technology aims to do the same but without IP header inspection. Instead, it uses MPLS labels.**

Let us understand how MPLS works using an example. The figure depicts an IPv4 network topology with four routers.

![MPLS:example](/engineering-education/introduction-to-mpls-and-mpls-vpn-technology/mpls.jpg)

`Note: The routers in an MPLS network are called Label Switch Routers(LSRs).`

The process of packet forwarding in an MPLS network can be broadly divided into 4 steps:
1. **Routers choose an MPLS label for every route on the network.** For instance, routers R1, R2, R3 and R4 have labels 100, 200, 300 and 400 for the network 10.10.10.1/32, respectively.<br>
`Note: The label field is 20 bits in length. Hence, the label can take values from 0 to 2^20–1 (1,048,575). However, the first 16 label values i.e. from 0 to 15 are reserved for special usage.`

2. **Routers then exchange the labels they have chosen for every route in the network with their neighbouring routers. Label Distribution Protocol(LDP) is used to exchange labels.** R2 tells R1 and R3 that its MPLS label for 10.10.10.1/32 is 200.

3. Using the label advertisements from neighbouring routers, **each router builds an MPLS forwarding table**. Notice that R2 receives MPLS label advertisements from both R1 and R3.  
    - R1 tells R2 that the MPLS label for 10.10.10.1/32 is 100.
    - R3 tells R2 that the MPLS label for 10.10.10.1/32 is 300.<br><br>
    In this case, R2 refers to its **IPv4 unicast routing table** to identify the next hop in the route to 10.10.10.1/32. By doing so, R2 gets to know that R3 is the next hop and consequently, updates its MPLS forwarding table with R3’s MPLS label i.e 300. *This way, when MPLS is implemented on an IPv4 network, every router in the network will know the MPLS labels of its neighbouring routers for all IPv4 routers in that network.*

4. Now the routers are ready to use labels to forward packets. **Each router swaps the existing label with the next hop’s MPLS label.** When a packet intended for 10.10.10.1/32 enters the MPLS network through R1, it analyses its destination IP and adds an MPLS header to the packet containing MPLS label of the next hop i.e. 200 before forwarding it to R2. R2 swaps the existing MPLS header with R3’s and this process goes on until the packet reaches its destination. **The packet’s IP header information is never analyzed and forwarding occurs solely by the inspection of MPLS labels.**


### 2.5 layer protocol
**The MPLS header sits between Layer 2 and Layer 3 headers and is thus called the 2.5 Layer protocol or the shim protocol.** It forwards packets with the speed of Layer 2 protocols while preserving the scalability and dynamic capabilities of Layer 3. The routers using MPLS forwarding tables do not find the need to open Layer 3 headers of packets, thereby saving resources and time.  

![MPLS:Header](/engineering-education/introduction-to-mpls-and-mpls-vpn-technology/mplsHeader.jpg)

**MPLS creates virtual paths between networks called Label Switch Paths(LSPs).**
*An LSP can be defined as the sequence of Label Switch Routers(LSRs) that transmit the packet within an MPLS network. Basically, LSP is a predefined path that the packet takes during transmission.*

### MPLS VPN
**MPLS Virtual Private Network, or MPLS VPN,** *is the most sought-after and widespread implementation of MPLS technology.* Wikipedia says that a [virtual private network](https://en.wikipedia.org/wiki/Virtual_private_network) extends a private network across a public network and enables users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network.
*It does so by constructing a virtual tunnel between the endpoints. Transportation of data between these ends is achieved by encapsulating an entire data packet into a datagram, thereby allowing a safe exchange of data across public or shared networks.*

VPN technology has been around longer than MPLS. ATM or Frame Relay technologies providing VPN facilities at Layer 2 were very popular. In such a network, the service provider runs ATM or Frame Relay to provide connectivity, which typically forms the backbone network. **In case of MPLS VPN, MPLS forms the backbone network over which VPN services are provided.** *A virtual network built on top of existing network infrastructure(Underlay) is called an Overlay.* This technique of overlaying a virtual network on an underlay increases the scalability of the network and supports multi-tenancy, modularity and virtualization.

![MPLS:VPN](/engineering-education/introduction-to-mpls-and-mpls-vpn-technology/mplsVPN.jpg)

A typical MPLS VPN model consists of **Provider Edge(PE) routers, Provider( P) routers, Customer Edge(CE) routers and Customer( C) routers.**
The PE and CE are directly connected at Layer 3. In the service provider’s network, *all PE and P routers run MPLS VPN as a service.*
They are equipped to send and receive packets with MPLS labels and take routing decisions accordingly.
Therefore, routing and forwarding is carried out with the help of Label Switch Paths(LSPs).
*Customer networks run Layer 3 routing protocols internally. CE routers need not run MPLS.*

The CE from Customer Network 1 sends a packet to the provider network’s ingress PE which adds two labels to the incoming packet.
1. VPN label - to specify corresponding egress PE router that is the packet receiver.
2. MPLS label - to route the packet using MPLS.

`Note: The MPLS label is stacked over the VPN label.`

*At every router hop in the LSP, the MPLS label is read and swapped with the next hop’s MPLS label.*
The router that is second to last in the LSP pops the MPLS label off and forwards the packet to the intended egress PE based on the address enclosed in the VPN label.

The egress PE uses IP routing at Layer 3 to forward the packet to the CE router of Customer Network 2.  
*It is vital that P routers in the provider network do not receive a packet with just the VPN label. They are not configured to handle such a packet, thereby resulting in its drop.*

### MPLS BGP
**MPLS can be used to efficiently exchange routes using the Border Gateway Protocol(BGP).** You can read more about BGP [here](engineering-education/border-gateway-protocol/). BGP can be deployed at the edge of a network with an MPLS core. MPLS provides end to end transport for BGP routes. The PEs in the provider network using MPLS BGP use the Multiprotocol-Border Gateway Protocol (MP-BGP) to dynamically communicate with each other. This MPLS BGP model enhances the efficiency and scalability of routing/forwarding features of the underlying network infrastructure.


#### Additional Resources
- "MPLS Fundamentals" by Luc De Ghein, Cisco Press, 02-Aug-2016
- [Multiprotocol Label Switching(MPLS) Explained | by Mayank Tripathi](https://towardsdatascience.com/multiprotocol-label-switching-mpls-explained-aac04f3c6e94)
- [MPLS: Layer 3 VPNs Configuration Guide, Cisco IOS Release 15M&T - Multiprotocol BGP](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/mp_l3_vpns/configuration/15-mt/mp-l3-vpns-15-mt-book/mp-bgp-mpls-vpn.html)
- [Border Gateway Protocol - Why do we need it and how does it work?](https://www.section.io/engineering-education/border-gateway-protocol/)
- [MPLS Border Gateway Protocol(BGP)](https://www.mplsinfo.org/border-gateway-protocol-bgp.html)
