---
layout: engineering-education
status: publish
published: true
url: /understanding-quality-of-service/
title: Understanding Quality of Service (QoS)
description: In this article, we will explore Quality of Service and its importance to a network.
author: sudi-david
date: 2021-06-27T00:00:00-09:00
topics: [Networking]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/understanding-quality-of-service/hero.png
    alt: QoS example image
---
QoS is an essential set of technologies that allows one to optimize their network to run at its full potential. The importance of having a peak-performing network is it ensures that intensive applications run efficiently due to the availability of adequate network resources.
<!--more-->

### Prerequisites
Before reading any further, I recommend that you should have some understanding on:

- [Network traffic](https://www.fortinet.com/resources/cyberglossary/network-traffic)

- [IP Packets](https://networklessons.com/quality-of-service/ip-precedence-dscp-values)

- [Layers of the OSI model](https://www.networkworld.com/article/3239677/the-osi-model-explained-and-how-to-easily-remember-its-7-layers.html) (focus on layers 2 and 3)

- [UDP and TCP protocols](https://www.guru99.com/tcp-vs-udp-understanding-the-difference.html)

- [IP precedence and type of service fields](https://networklessons.com/quality-of-service/ip-precedence-dscp-values)

### Definition of terms
Below are some of the terms you shall encounter through this article:

- Buffers - these are physical storage areas that temporarily hold data as it’s transferred from one location to another.

- Jitters - this refers to the delay inconsistency between packets that differs over time when a signal wanes.

- Latency - latency is the time it takes for a packet to be sent from its source to its destination.

- Bit rate - the number of bits sent over a network per second.

- Packet rate - the number of packets being sent per second.

- An ingress queue - it holds packets till a router’s CPU pushes the data to a suitable interface.

- An egress queue - it holds packets that a router serializes onto an Ethernet cable.

### Understanding Quality of Service (QoS)
Networks have become an important asset in today’s world. Networks allow their users to share files, data, and other types of information. Thus, you can optimize your network to ensure that it performs at its full potential. QoS is an essential set of technologies that allows a user to optimize their network so that it can run at its full potential.

The importance of having a peak-performing network is it ensures that intensive applications run efficiently due to the availability of adequate network resources. In this article, we will explore what is Quality of Service and its importance to a network.

### What Is QoS
**QoS** is a group of technologies that allow a user to manage their network’s traffic, thus guaranteeing the optimum performance of essential applications in their workplace or home. Through QoS, you can be able to prioritize network traffic, control jitters, and lower latency.

Furthermore, QoS allows you to optimize the performance of specific applications on their network and gain visibility into their network’s bit rate and packet rate. Lastly, you can configure how packets are routed in your network to avoid transmission delays.

### How Does QoS Work
QoS utilizes a set of various techniques to guarantee the optimal performance of critical applications such as VoIP, video conferencing, and online gaming. Some of these techniques are the resource reservation protocol (RSVP), queuing, and traffic marking.  

#### Traffic Marking
QoS works by identifying the various applications or activities that would benefit from managing a network’s traffic. After identifying these applications, QoS marks the specific traffic that needs managing. Marking the network’s traffic allow routers to create separate virtual queues for each application.

There are various ways in which routers mark network traffic. These ways include Class of Service (CoS) and Differentiated Services Code Point (DSCP).

##### Class of Service (CoS)
Class of service is a 3-bit field found in an Ethernet frame header when one uses the 802.1q networking standard that supports virtual local area networks (VLAN) on an 802.3 Ethernet network.

CoS marks a network’s traffic at layer two by altering the class of service bits found in frame headers. Adjusting the class of service bits allows QoS to know what traffic to manipulate and how to manipulate the traffic. 

Thus, bandwidth-intensive applications will fall first in the queue as routers will reserve the network’s bandwidth for these applications.

##### Differentiated Service Code Point (DSCP)  
**DSCP** is a section in an IP packet that assigns varying levels of services to a network’s traffic. Giving varying levels of service is achieved through tagging a DSCP code to each packet on the network and matching it with the equivalent level of service. DSCP marks packets in the layer three packet header.

#### Queuing
Queuing is the process of making policies that provide special treatment to various data streams over others. The process is made possible by utilizing special high-performance memory buffers found in switches and routers called queues.

##### What is a Queue
A **Queue** is a high-performance buffer in a router or a switch that holds traffic until it can be processed or serialized. Routers and switches have two types of hardware queues, ingress (inbound) and egress (outbound) queues.

Hardware queues are characterized as standard or strict priority queues. The standard queues treat all traffic as equal. In these queues, no traffic receives special treatment.

On the contrary, the strict priority queues are dedicated to high priority traffic; thus, QoS-enabled interfaces utilize this type of queue to process high priority packets.

##### How High Priority Traffic is Processed
When routers receive traffic, any packets marked with a higher DSCP or IP value than others are directed into the strict priority queues. 

Here, traffic marked as high priority is processed faster than other traffic, thus increasing your network’s performance and reducing the chances of routers dropping packets during congestion.

#### Resource Reservation Protocol (RSVP)
RSVP is a transport layer protocol that reserves network resources to get varying Quality of Service levels for an application’s data streams. The protocol accomplishes its task by sending out RSVP messages from a source to a receiver and vice versa. 

RSVP messages are classified into two: path and reservation messages.

- **Path messages** are sent from a source to a receiver by storing the path state at each node in the message’s path. The path states direct a receiver to reserve network resources on each node that it passes on the network.

- **Reservation messages** are sent from a receiver to a sender along the route of the path message. These messages identify the resources required by a data stream.

### Importance of QoS
1.  It guarantees the optimal performance of applications that need high bandwidth for real-time traffic. 

     Applications such as video conferencing applications, VoIP, streaming applications, and online gaming are some of the particular applications that are bandwidth-intensive and highly sensitive to jitters and latency.

2. QoS helps prevent delays in sensitive applications operating on a network. These applications usually favor UDP protocol over TCP protocol. The UDP protocol is favored over TCP because packets get transmitted in an ordered stream.

     Furthermore, the UDP protocol differs from the TCP protocol because the protocol does not retransmit data packets that get corrupted or lost during transmission. 

     The lack of retransmission in UDP applications creates the need for a QoS-supported network that has low instances of jitters and minimum latency, thus reducing delays that can result in choppy audios in an IP call or sketchy videos in a video stream.

3. QoS makes it possible to plan and manage network resources. Planning allows a person to prioritize traffic, applications, data flows, users, and network resources, thus ensuring optimal performance. Additionally, planning reduces costs and the need to invest in link expansion.

4. QoS enhances the user experience. Since QoS guarantees the optimal performance of critical applications, enterprises that utilize the technology report an increase in employee performance and satisfaction. This results in tasks being completed to the required standards and in due time.

### Conclusion
In this article, we learned what Quality of Service (QoS) is, how QoS utilizes techniques such as traffic marking, queuing, and the resource reservation protocol to guarantee the optimal performance of critical applications on a network.

Additionally, we learned the importance of having QoS enabled on a network. I consider QoS as an essential technology that should be in-built into any router or switch that will be produced in the future. I found learning about these technologies to be fascinating. I hope you gained some insight on how you can speed up your network without the need to upgrade your network's bandwidth.

Until next time, happy reading!

### Further reading
1. [Learn more about network layers.](https://www.geeksforgeeks.org/layers-of-osi-model/)

2. [Learn more about data packets.](https://www.techrepublic.com/article/exploring-the-anatomy-of-a-data-packet/)

3. [Learn more about jitters and latency](https://www.itprc.com/jitter-vs-latency/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
