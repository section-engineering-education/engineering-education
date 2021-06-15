<<<<<<< HEAD
### Prequesties

The readers should know:

- [Network traffic](https://www.fortinet.com/resources/cyberglossary/network-traffic)

- [Layers 3 of the OSI Model](https://www.infoblox.com/glossary/layer-3-of-the-osi-model-network-layer/)

### Understanding Quality of Service (QoS)

Networks have become an important asset in todays world. Users of a network can share files, data and other types of information with oneanother over a network. Thus one can optimize their network to ensure that it performs at its full potential. QoS is an essential set of technologies that allows one to optimize their network so that it can run at its full potential. The importance of having a peak-performing network is it ensures that intensive applications run efficiently due to the availability of adequate network resources.
=======
---
layout: engineering-education
status: publish
published: true
url: /understanding-quality-of-service(QoS)/
title: Understanding Quality of Service (QoS)
description: In this article, we will explore Quality of Service and its importance to a network.
author: sudi-david
date: 2021-06-14T00:00:00-16:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /understanding-quality-of-service(QoS)/hero.jpg
    alt: QoS example image
---
QoS is an essential set of technologies that allows one to optimize their network to run at its full potential. The importance of having a peak-performing network is it ensures that intensive applications run efficiently due to the availability of adequate network resources.
<!--more-->

### Understanding Quality of Service (QoS)

People optimize their networks to ensure that the networks perform at full potential. QoS is an essential set of technologies that allows one to optimize their network to run at its full potential. The importance of having a peak-performing network is it ensures that intensive applications run efficiently due to the availability of adequate network resources.
>>>>>>> 09ae04da4b4049bb39de8ced0c2dfc30e156e294

### What Is QoS 

**QoS** is a group of technologies that allow people to manage their network’s traffic, thus guaranteeing the optimum performance of essential applications in their workplace or home. Through QoS, one can be able to prioritize network traffic, control jitters, and lower latency. Furthermore, QoS allows one to optimize the performance of specific applications on their network and gain visibility into their network’s bit rate and packet rate. Lastly, one can configure how packets are routed in their network to avoid transmission delays.
<<<<<<< HEAD
>- Bit rate is the number of bits that are sent over a network per second while packet rate is the number of packets being sent per second. 

### How Does QoS Work

QoS utilizes a set of various techniques to guarantee the optimal performance of critical applications such as VoIP, video confrencing,and online gaming. Some of these techniques are the resource reservation protocol (RSVP),queuing, and traffic marking.  

#### **a.	Traffic Marking**
QoS works by identifying the various applications or activities that would benefit from managing a network’s traffic. After identifying these applications, QoS marks the specific traffic that needs managing. Marking the network’s traffic allow routers to create separate virtual queues for each application. There are various ways in which routers mark network traffic. These ways include Class of Service (CoS) and Differentiated Services Code Point (DSCP). 

#### i.	Class of Service (CoS)


COS marks a network’s traffic at layer two by altering the class of service bits found in frame headers. Altering the class of service bits allows QoS to know what traffic to manipulate and how to manipulate the traffic. Thus, bandwidth-intensive applications will fall first in the queue as routers will reserve the network’s bandwidth for these applications.

#### ii.	Differentiated Service Code Point (DSCP)	 
=======

### How Does it Work

QoS utilizes a set of various techniques to guarantee the optimal performance of critical applications. Some of these techniques are the resource reservation protocol (RSVP), queuing, and traffic marking.  

#### Traffic Marking
QoS works by identifying the various applications or activities that would benefit from managing a network’s traffic. After identifying these applications, QoS marks the specific traffic that needs managing. Marking the network’s traffic allow routers to create separate virtual queues for each application. There are various ways in which routers mark network traffic. These ways include Class of Service (CoS) and Differentiated Services Code Point (DSCP). 

##### Class of Service (CoS)

>**Note:** Class of service usually is accessible within an MPLS (Multi-Protocol Label Switching) provision.

CoS marks a network’s traffic at layer two by altering the class of service bits found in frame headers. Altering the class of service bits allows QoS to know what traffic to manipulate and how to manipulate the traffic. Thus, bandwidth-intensive applications will fall first in the queue as routers will reserve the network’s bandwidth for these applications.

##### Differentiated Service Code Point (DSCP)	 
>>>>>>> 09ae04da4b4049bb39de8ced0c2dfc30e156e294

**DSCP** is a section in an IP packet that assigns varying levels of services to a network’s traffic. Assigning varying levels of service is achieved through tagging a DSCP code to each packet on the network and matching it with the equivalent level of service. DSCP marks packets in the layer three packet header.

>**Note:** DSCP constitutes the IP Precedence and Type of Service fields. Thus, DSCP can be used in old routers that solely support IP precedence as DSCP values are synonymous with the IP precedence fields.

<<<<<<< HEAD
#### **b.	Queuing**

Queuing is the process of making policies that provide special treatment to various data streams over others. The process is made possible by utilizing special high-performance memory buffers found in switches and routers called queues. 

#### i.	What is a Queue
=======
#### Queuing

Queuing is the process of making policies that provide special treatment to various data streams over others. The process is made possible by utilizing special high-performance memory buffers found in switches and routers called queues. 

##### What is a Queue
>>>>>>> 09ae04da4b4049bb39de8ced0c2dfc30e156e294


A **Queue** is a high-performance buffer in a router or a switch that holds traffic until it can be processed or serialized. Routers and switches have two types of hardware queues, ingress (inbound) and egress (outbound) queues.

>**Note:** An ingress queue holds packets till a router’s CPU pushes the data to a suitable interface. An egress queue holds packets that a router serializes onto an Ethernet cable.


<<<<<<< HEAD
Hardware queues are characterised as standard or strict priority queues. The standard queues treat all traffic as equal. In these queues, no traffic receives special treatment. On the contrary, the strict priority queues are dedicated to high priority traffic; thus, QoS-enabled interfaces utilize this type of queue to process high priority packets.


#### ii.	How High Priority Traffic is Processed

Routers direct any traffic marked with a higher DSCP or IP value into the strict priority queues. Here, traffic marked as high priority is processed faster than other traffic, thus increasing one’s network performance and reducing the chances of routers dropping packets during congestion.

#### **c.	Resource Reservation Protocol (RSVP)**
RSVP is a transport layer protocol that reserves network resources to get varying Quality of Services (QoS) for an application’s data streams. The protocol accomplishes its task by sending out RSVP messages from a source to a receiver and vice versa. RSVP messages are classified into two: path and reservation messages.
=======
Hardware queues are characterized as standard or strict priority queues. The standard queues treat all traffic as equal. In these queues, no traffic receives special treatment. On the contrary, the strict priority queues are dedicated to high priority traffic; thus, QoS-enabled interfaces utilize this type of queue to process high priority packets.


##### How High Priority Traffic is Processed

Routers direct any traffic marked with a higher DSCP or IP value into the strict priority queues. Here, traffic marked as high priority is processed faster than other traffic, thus increasing one’s network performance and reducing the chances of routers dropping packets during congestion.

#### Resource Reservation Protocol (RSVP)**
RSVP is a transport layer protocol that reserves network resources to get varying Quality of Service levels for an application’s data streams. The protocol accomplishes its task by sending out RSVP messages from a source to a receiver and vice versa. RSVP messages are classified into two: path and reservation messages.
>>>>>>> 09ae04da4b4049bb39de8ced0c2dfc30e156e294

- **Path messages** are sent from a source to a receiver by storing the path state at each node in the message’s path. The path states direct a receiver to reserve network resources on each node that it passes on the network.

- **Reservation messages** are sent from a receiver to a sender along the route of the path message. These messages identify the resources required by a data stream.

<<<<<<< HEAD
#### **Importance of QoS**

1.	It guarantees the optimal performance of applications that need high bandwidth for real-time traffic. Applications such as video conferencing applications, VoIP, streaming applications, and online gaming are some of the special applications that are bandwidth-intensive and highly sensitive to jitters and latency.

2.	QoS helps prevent delays in sensitive applications operating on a network. These applications usually utilize UDP protocol in favor of TCP protocol. The UDP protocol is favored over TCP because packets get transmitted in an ordered stream. 
Furthermore, the UDP protocol differs from the TCP protocol because the protocol does not retransmit data packets that get corrupted or lost during transmission. The lack of retransmission in UDP applications creates the need for a QoS-supported network that has low instances of jitters and minimum latency, thus reducing delays that can result in choppy audios in an IP call or sketchy videos in a video stream. 

3.	QoS brings the possibility to plan and manage their network resources. Planning allows a person to prioritize traffic, applications, data flows, users, and network resources, thus ensuring optimal performance. Additionally, planning reduces costs and the need to invest in link expansion.

4.	QoS enhances user experience. Since QoS guarantees the optimal performance of critical applications like VoIP, enterprises that utilize the technology can see an increase in task completion due to improved user experience.
=======
### Importance of QoS

1.	It guarantees the optimal performance of applications that need high bandwidth for real-time traffic. Applications such as video conferencing applications, VoIP, streaming applications, and online gaming are some of the special applications that are bandwidth-intensive and highly sensitive to jitters and latency.

	QoS helps prevent delays in sensitive applications operating on a network. These applications usually favor UDP protocol over TCP protocol. The UDP protocol is favored over TCP because packets get transmitted in an ordered stream. 
Furthermore, the UDP protocol differs from the TCP protocol because the protocol does not retransmit data packets that get corrupted or lost during transmission. The lack of retransmission in UDP applications creates the need for a QoS-supported network that has low instances of jitters and minimum latency, thus reducing delays that can result in choppy audios in an IP call or sketchy videos in a video stream.

QoS makes it possible to plan and manage network resources. Planning allows a person to prioritize traffic, applications, data flows, users, and network resources, thus ensuring optimal performance. Additionally, planning reduces costs and the need to invest in link expansion.

4.	QoS enhances user experience. Since QoS guarantees the optimal performance of critical applications, enterprises that utilize the technology report an increase in employee performance and satisfaction. This results in tasks being completed to the required standards and in due time. 
>>>>>>> 09ae04da4b4049bb39de8ced0c2dfc30e156e294

5.	The technology prevents packet loss. During transit, packets may be dropped due to network failure or inefficiency, network congestion, a defective router or switch, loose connection, or poor signal. QoS prevents packet loss by prioritizing traffic and allocating a proper bandwidth for the optimal running of high-performance applications.

### Conclusion
 
In this article, we learned what Quality of service (QoS) is, how QoS utilizes techniques such as traffic marking, queuing, and the resource reservation protocol to guarantee the optimal performance of critical applications on a network. Additionally, the article identifies the importance of QoS on a network.
<<<<<<< HEAD

### Further reading
- [Learn more about network layers.](https://www.geeksforgeeks.org/layers-of-osi-model/)

- [Learn more about data packets.](https://www.techrepublic.com/article/exploring-the-anatomy-of-a-data-packet/) 

- [Learn more about jitters and latency](https://www.itprc.com/jitter-vs-latency/)
=======
>>>>>>> 09ae04da4b4049bb39de8ced0c2dfc30e156e294
