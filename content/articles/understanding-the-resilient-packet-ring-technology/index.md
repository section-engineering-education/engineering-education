---
layout: engineering-education
status: publish
published: true
url: /understanding-the-resilient-packet-ring-technology/
title: Understanding the Resilient Packet Ring Technology
description: This article will provide a basic understanding of resilient packet ring technology. It will go through fundamental aspects such as the traffic queues, class of service, adopted types of transmission media, and the applications of this technology. 
author: eunice-wanjiku
date: 2021-12-18T00:00:00-05:58
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-the-resilient-packet-ring-technology/hero.jpg
    alt: Resilient Packet Ring Example Image
---
RPR is standardized by IEEE 802.17 and is a protocol for the transmission of data through fiber-optic ring networks. It works in the MAC layer of the OSI model. It is packet-based and is built on creating efficiency of IP services and ethernet.
<!--more-->
With the deployment of resilient packet rings, the network has better utilization of bandwidth, throughput, higher deployment speed, optimization of operational cost and equipment. RPR was developed because the traditional ethernet cannot handle or offer business-class reliability. Also, it cannot deal with latency adequately and the quality of services for voice packets.  

In this article, we will look at the basics of resilient packet ring technology. We will go through an overview of this technology, traffic queues, adopted types of transmission media, and its key applications.

### Table of contents
- [Basics of Resilient Packet Ring (RPR)](#basics-of-resilient-packet-ring-rpr)
- [Traffic queues and class of service in Resilience Packet Ring](#traffic-queues-and-class-of-service-in-resilience-packet-ring)
- [Adopted types of transmission media](#adopted-types-of-transmission-media)
- [Applications of Packet Ring Technology](#applications-of-packet-ring-technology)
- [Limitations of Resilient Packet Ring](#limitations-of-resilient-packet-ring)
- [Conclusion](#conclusion)
- [Resources](#resources)

### Basics of Resilient Packet Ring (RPR)
A resilient packet ring station is established where fiber installation is done in a ringway. It has developed from Ethernet and SONET that were previously installed. It is generally a media access control packet that helps in numerical multiplexing over spatial reuse infrastructure. The spatial reuse infrastructure allows continued utilization of freed space to maximize the traffic being carried across. It meets the packet-based metropolitan area network requirements.

Nodes are used for effective bandwidth communication through wrapping and steering. During steering, in case of nodes damage, traffic is directed to the last node before the damaged one. If any of the lines break, the ring is changed so that either of the rings becomes a return node. This way, the architecture has a shorter recovery time and hence less downtime.

### Traffic queues and class of service in Resilience Packet Ring
In computer networking, a queue is when data packets are aligned in a sequence or in order awaiting to be transmitted. Queues consist of several packets and are transmitted based on a predefined network algorithm. Such algorithms include *First In First Out* or *Last In First Out*, among others.

The traffic present in this RPR technology is associated with a *class of service*, which is categorized into classes A, B, and C. They signify high, medium, and low traffic simultaneously.

Class A is a virtual circuit bandwidth that offers support to low latency applications such as video. Class B is a combination of the bandwidth for the virtual circuit as well as the intensity of the burst that is higher than the CIR. Class C is the most effective effort traffic that is highly flexible as it integrates any available bandwidth supporting the access traffic of the internet.

### Adopted types of transmission media
In this section, we will first discuss what transmission media is so that it can be easy to understand the second section.

#### What is transmission media?
In networking, a transmission media is any channel that is used to transfer information or packets from point A (source) to another point B (destination). The main aim of communication media is to carry data in the form of bits over a network. Transmission media can also be referred to as paths that exist between the sender and receiver in data communication. Transmission media are considered as layer one components in the Open System Interconnection (OSI) model.

#### Which transmission media is used in RPR?
Media Access Control panels are the hardware required for interaction with wireless or wired transmission medium. It has a logical link control associated with the data link layer that offers control of the flow and multiplexing of the medium of transmission.

During data transfers, MAC captures frames adding synchronization for effective transmission. A code for error detection is then added to the frame. MAC also compensates for collisions through re-originating transmission after detection of a jam signal. It ensures data integrity is maintained through the verification of the sequence for the sender’s frame check.  

### Applications of Packet Ring Technology
Resilient packet ring is a fairly new technology that is being adopted fast and widely. The network architecture is commonly applied in the following ways:

#### National SONET, metropolitan, and ethernet carrier networks
This architecture is normally incorporated into the SONET networks so that they can gain the ability to transfer packets. This is because, the technology, RPR, offers the network statistical multiplexing that is fault-tolerant

#### Efficiency Improvement
RPR is a network architecture that is developed in such a way that it can achieve the needs of a packet-based Metropolitan Area Network based on packets. This network design is made up of packet-switching nodes that are connected to adjacent nodes using a pair of fibers. In addition to that, it has two counter-rotating rings. It is this design that makes sure that the architecture offers maximum efficiency to the users.

#### Fault Tolerance in RPR
To achieve fault tolerance, a resilient packet ring employs the use of two counter-rotating rings. Both of these rings are connected by fiber forming a ring topology. The nodes forming the RPR on the other hand both transmit packets in opposing directions. The two nodes, that is inner and outer rings, function simultaneously and in the event one fails, only the capacity of traffic transferred is decreased but there is no unavailability.

### Limitations of Resilient Packet Ring
The following are the major limitations of RPR:

#### Spatial Reuse
One of the major limitations of RPR was the inability to support spatial reuse for frame transmission from or to media access control addresses which is not available in ring topologies. This was however fixed using a spatially-aware sublayer commonly known as SAS. This technology provides a way to reuse frame transmissions from or to media access control addresses not available in ring topologies.

#### RPR Algorithm
Resilient packet ring architecture uses an algorithm that determines how traffic will be distributed across the nodes. Despite the fairness and simpleness of this algorithm, it still poses some critical aspects that are concerning. For instance, there is a noticeable oscillation of allocated bandwidth on scenarios with unbalanced traffic.

Such oscillations are a hindrance when it comes to achieving the high bandwidth utilization and reuse of spatial. Additionally, this algorithm has a very high level of sensitivity to its parameters.

### Conclusion
RPR technology aims at providing users with smart metro technology that offers traditional time-division multiplexing. In addition to that, it offers a new packet-data service. Both of these features come at very high efficiencies. It can be summarized as a protocol (data-link) for layer two which offers media access control for packets that are delivered using ring topology.

The resilient packet ring technology is complementary to various Layer 1 technologies such as SONET. It operates at Layer 2 and can function over Ethernet or SONET. It helps service providers to ensure scalability and have efficient metro networks while using physical layers such as Ethernet. It is easy to integrate this technology with the other existing technologies. This powers it into offering a significant-based approach, building efficient metro networks.

### Resources
- [RPR](https://www.pcmag.com/encyclopedia/term/rpr)
- [Resilient Packet Ring basics](https://www.networkworld.com/article/2339177/resilient-packet-ring-basics.html)
- [Resilient Packet Ring (RPR) - IEEE 802.17](https://www.tutorialspoint.com/resilient-packet-ring-rpr-ieee-802-17)

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
