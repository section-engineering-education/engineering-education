---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-network-management/
title: Introduction to Network Monitoring and Management
description: In this article, we will look at an overview of Network Management System. We will discuss Network Management Requirements, Network Management Systems, and Simple Network Management protocols.
author: miller-juma
date: 2021-02-16T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-network-management/hero.jpg
    alt: Introduction to Network Monitoring example image
---
In this article, we're going to discuss the fundamental principles of network monitoring and management while discussing the protocols and architectures involved. 
<!--more-->
### Core concepts we will go over:
- Definition of network  management
- Network Management requirements
- Network Management systems
- Simple Network Management protocol  

### What is network management?
Management refers to the set of activities or principles well defined to perform a particular task effectively. It involves controlling, organizing, planning, and monitoring resources to achieve the organization's goals.

Network management, therefore, includes all the mechanisms put in place to monitor, control, and coordinate network activities within an organization. These activities include network protocol analysis, distributed database management, and so many other tasks.  

In essence, network management as a service provides network managers with several applications, tools, and devices to ensure smooth network management and monitoring.  

### Network management requirements
The network management requirements are categorized into 5 distinct groups. 
- Fault Management
- Security Management
- Performance Management
- Accounting Management
- Configuration & Name Management   

### 1. Fault management 
Imagine working as a network administrator at a big company, say a bank, and the network fails in all branches country-wide and there's no way to identify the problem?

The network administrator would be pressured by top management to get the network back up or else the organization will suffer a massive financial loss. 

To avoid such issues from arising, complex networks require the proper design, with each component's role well defined.

But what's a fault in networking? Is it the same as a network error? If you guessed that they are not the same? You'd be right.  

***Network Fault*** - refers to the condition which causes a network to fail at performing its task and it requires management action to repair or restore.

An example of a networking fault may result due to a telephone cable physically cut, preventing signals from passing through it.  

In case of a networking fault, the following general steps are followed to restore a network:    
- First try and determine exactly where the fault is coming from.
- Separate the rest of the network from the failure. This will ensure that the network continues to work without interference.
- At this point now, you can try to modify the network and reconfigure without the failed component.  
- Finally, repair or replace (in case it's too badly damaged to work) the failed component.
- Restore the network to its initial state.  

Normally, users depending on an internet connection will not tolerate occasional outages that take too long to restore. Sometimes when they do occur, it could be hard to resolve them without proper fault detection systems. Which may lead to many more network issues for end users.

An organization is therefore recommended to have measures in place to restore networks or to act as swiftly as possible in cases of faults, and in this can be done by installing ***Fault Detection and Diagnosis systems***. This provides a very efficient fault resolution, by restoring or solving problems as soon as they occur.  

### 2. Security management
The organization you work at, is in one way or the other a target to hackers. Security management is therefore concerned with how the ***encryption keys*** are being generated, distributed, and stored. This may involve passwords, authorization keys, and access control information that are usually distributed and requires maintenance.  

Security management is also concerned with computer network access. It involves monitoring and controlling the network. One of the most important tools in security management is ***Network Logs***. Network logs records every single activity or event on the network. Storing user details, process calls, and authentication attempts.

Security will always provide guaranteed user information and network resources protection. An organization should ensure these security facilities are made available to authorized users only. This is an important requirement in network management and should be treated seriously.  

### 3. Performance management
Most communication network components are varied, but at the same time, are required to communicate with each other, share data and resources. Sometimes, it can be critical to have your application run within a certain performance limit.  

Performance management of any computer network is comprised of 2 broad functional categories:  
1. Monitoring
2. Controlling

As we had discussed previously, while network monitoring involves tracking the activities on the network, controlling a network involves making some network adjustments to improve its performance.  

Some network performance issues include:
- Utilization level.
- Traffic - is traffic within our network excess?
- Bottlenecks - are there problems with our network?
- Response time.
- Throughput - has it been reduced or is it within acceptable limits?

As a network manager, you must put in place measures on what resources to monitor as you're assessing their performance level.  

The perfect example of performance management, would be how [Section](section.io) manages its applications (or site). There are many users on this site who may be searching for articles, now let's imagine this current article you're reading took ages to load? 

Would you be patient enough to wait?

Users always want to know the average and the worst-case scenario response time for the site to load. Therefore, performance must be known in detail for the system administrator/support staff to be in a position to respond to some user queries.  

### Network management systems
#### Network management architecture
A network management system is comprised of network monitoring and control tools that are integrated to meet a certain objective. It has both the hardware and the software.

The software is mostly used in host computers and communication processors such as front-end processors, cluster processors, bridges, routers et cetera) to accomplish network management tasks.  

A network management system is always designed and developed for the end-user to view the entire network as a single architecture.  

### Fig.1 Network management system

![Network-Management-System](/engineering-education/getting-started-with-network-management/hierarchical-nms.jpg)

There are 3 types of network architectures:  

#### 1. Hierarchical network management architecture  
- In this architecture, multiple sets of network management systems are installed at the Network Operations Center (NOC).
- Each is in turn used to monitor and manage the whole network.  
- It has Manager of Manager (refer to Figure 1), a layer that sits at the highest level, requesting data from the domain managers.
- This architecture is scalable since it's possible to add additional Manager of Managers (MoM) layers.  
   
#### 2. Centralized network management architecture  
- Unlike hierarchical architecture, it has a single Network Management System (NMS) installed to help in monitoring the whole network.  
- It can contain one or more servers and it will only be considered centralized if all the servers are located in the same Network Operations Center (NOC).  
- It may also comprise of one or more clients distributed in all regions, communicating via Dynamic Circuit Network to a central server.  

#### 3. Distributed network management architecture
- Just like Hierarchical architecture. It has several Network Management Systems installed to monitor the network.  
- Each NMS is usually installed to monitor the network of a particular geographical region.  
- Using Figure 1 above, it is comprised of 3 Network Management System (NMS) Servers with each being located at its Network Operations Center (NOC).
- In this architecture, clients are located in all regions.  

There are several features such as architecture selection criteria which we have not discussed in this part. Feel free to follow up on them.  

### Simple Network Management Protocol (SNMP)
This is a protocol that was solely developed to work with NMS operating Transmission Control Protocol (TCP/IP). Simple Network Management Protocol (SNMP) refers to the protocol that runs on the Application Layer of the Open Systems Interconnection (OSI) Model, which's used to monitor and manage networks. 

This protocol is whats sets the rules for routers, servers, printers et cetera on how to communicate with each other on the network.  

In-Network Management System (NMS), the key elements of an SNMP include:

- Management Station: As we had seen earlier, it's also known as a manager that is used to monitor the network.

- SNMP Agent: A piece of the program installed on managed devices such as routers to aid in their management.  

- Management Information Base: This is where all the managed resources in a network are stored. They are usually organized in a hierarchical order.

### Conclusion
In this article, we have looked at an overview of Network Management System. We discussed Network Management Requirements, Network Management Systems, and Simple Network Management protocol.

This is just an introductory part of network management, but enough to get you started.

---
Peer Review Contributions by: [Aakash Rawal](/engineering-education/authors/aakash-rawal/)

