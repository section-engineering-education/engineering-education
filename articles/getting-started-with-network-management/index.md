## Introduction to Network Monitoring and management
In this tutorial, we're going to discuss the fundamentals and principles of network monitoring and management while discussing the protocols and architectures involved.  

### Core Concepts to familiarise with:-
* Definition of network  management
* Network Management Requirements
* Network Management Systems
* Simple Network Management protocol  

### What is Network Management?
Management simply refers to the set of activities or principles well defined to perform a given task effectively.  
It involves controlling, organizing, planning, monitoring, controlling resources to achieve the organization's goals.

Network management, therefore, includes all the mechanisms put in place to monitor, control, and coordinate network activities within an organization.  
These activities include network protocol analysis, distributed database management, and so many other tasks.  

In essence, network management as a service provides network managers with several applications, tools, and devices to ensure there is smooth network management and monitoring.  


### Network Management Requirements

The network management requirements are categorized into 5 distinct groups. 
* Fault Management
* Security Management
* Performance Management
* Accounting Management
* Configuration & Name management.

In this tutorial we will discuss the following:-  

#### ```1.Fault Management``` 
Imagine if working as a network administrator at a big company, let's say a bank, and then network fails in all branches country-wide and you're not in a position to identify the problem, what will you do?  

Imagine if working as a network administrator at a big company, say a bank, and the network fails in all branches country-wide and there's no way to identify the problem?
The network administrator would be pressurized from the senior management to get the network back up or else the organization will suffer financial losses. 
To avoid these kinds of situation, proper design, documentation and management of network is paramount.

To avoid such issues from arising, complex networks require proper design, with each component's role well defined.

But what's a fault in networking? is it the same as a network error? you guessed they are not the same? you're right.  

```Network Fault```- refers to the condition that causes the network to fail to perform its task and it requires management action to repair or restore.  
An example of a networking fault may result due to a telephone cable physically cut, this will prevent signals from passing through it.  

To solve a networking fault, follow these simple steps:-  

* Try and determine exactly where the fault is coming from.
* Separate the rest of the network from the failure. This will ensure that the network continues to work without interference.
* At this point now, you can try to modify the network and reconfigure without the failed component.  
* Finally, repair or replace(in case it's badly damaged to work) the failed component.
* Restore the network to its initial state.  

Normally, users who depend on an internet connection will not tolerate occasional outages that take long to restore.  
Sometimes when they do occur, it could be hard to resolve them without proper fault detection systems leading to so many issues with clients/ your network end users.  

An organization is therefore recommended to put in place measures to restore networks or act as swiftly as possible in case of faults, and in this by installing ``` Fault Detection and Diagnosis``` systems.  
This provides a very efficient fault resolution, hence restoring or solving problems as soon as they occur.  


#### ```2.Security Management```

Your organization where you work is in one way or the other a target by hackers.  
Security management is therefore concerned with how the ``` encryption keys``` are being generated, distributed, and stored.  
This may involve passwords, authorization keys, and access control information which are usually distributed and requires maintenance.  

Security management is also concerned with computer network access.  Who is accessing our network? where is he coming from? what is he doing on our network?  
It simply involves monitoring and controlling the network.  

One of the most important tools in security management is ```Network Logs```.
It records every single activity or event on the network. Storing user details, process calls, and authentication attempts.  

Security will always provide a guaranteed user information and network resources protection.  
An organization should ensure these security facilities are made available to authorized users only.  

In some situations, users will ask questions, take, for example, e-commerce sites, some will need your credit/debit card details, what are their security policies, and are the security systems secure themselves.  

This is an important requirement in network management and should be treated seriously.  

#### ```3.Performance management```

Communication networks have evolved, many technologies are developed each day.  
This means that most communication network components are varied, but at the same time, they are required to communicate with each other, share data and resources.
Sometimes, it can be critical to have your application run within a certain performance limit.  

Performance management of any computer network is comprised of 2 broad functional categories:-  
* Monitoring
* Controlling

As we had discussed previously, network monitoring involves tracking the activities on the network while controlling involves making some network adjustments to improve its performance.  

Some of the network performance issues include:-  
* Utilization level.
* Traffic - is traffic within our network excess?
* Bottlenecks- are there problems with our network?
* Response time.
* Throughput-has it been reduced or it's within acceptable limits?

As a network manager, you must put in place measures on what resources to monitor as you're assessing their performance level.  

The perfect example of performance management is to do with applications such as [section](section.io).  
There are many users on this site who search for tutorials or articles, now imagine this tutorial you're currently reading took ages to load? Will you be here?  
Users always want to know the average and the worst-case scenario response time for the site to load.  

Therefore, we can all agree that the performance must be known in detail for you to be in a position to respond to some users' queries.  

###  Network Management Systems

#### ```Network Management Architecture```
A network management system comprises of network monitoring and control tools integrated to meet a certain objective. It has both the hardware and the software.

Software is mostly used in host computers and communication processors such as front-end processors, cluster processors, bridges, routers et cetera) to accomplish network management tasks.  

A network management system is always designed and developed for the end-user to view the entire network as a single architecture.  

##### FIG 1 NMS 
![Network-Management-System](/engineering-education/getting-started-with-network-management/hierarchical-nms.jpg)


There are 3 types of network architectures:-  
* Hierarchical Network Management Architecture  

   - In this architecture,  multiple sets of network management systems are installed at the Network Operations Center(NOC).
   - Each is in turn used to monitor and manage the whole network.
   - It has Manager of Manager (refer to figure 1), a layer that sits at the highest level, requesting data from the domain managers.
   - This architecture is scalable since it's possible to add additional Manager of Managers(MoM) layers.  
   
* Centralised Network Management Architecture  

    - Unlike hierarchical architecture, it has a single Network Management System installed to help in monitoring the whole network.  
    - It can contain one or more servers and it will only be considered centralize if all the servers are located in the same Network Operations Center.  
    - It may also comprise of one or more clients distributed in all regions, communicating via Dynamic Circuit Network to a central server.  

* Distributed Network Management Architecture
    - Just like Hierarchical architecture. it has several Network Management Systems installed to monitor the network.  
    - Each NMS is usually installed to monitor the network of a particular geographical region.  
    - Using figure 1 above, comprises 3 NMS Servers with each being located at its own Network Operations Center.
    - In this architecture, clients are located in all regions.  

There are several features such as architecture selection criteria which we have not discussed in this part. Feel free to search for them.  


### Simple Network Management Protocol (SNMP)
This is a protocol that was solely developed to work with NMS operating Transmission Control Protocol(TCP/IP).  
SNMP refers to the protocol that runs on the Application Layer of the OSI Model, which's used to monitor and manage networks.  

This protocol is whats sets the rules for routers, servers, printers et cetera on how to communicate with each other on the network.  

In NMS, the key elements of an SNMP include:- 

* Management Station 
    - As we had seen earlier, it's also known as a manager that is used to monitor the network.

* SNMP  agent.
    - A piece of the program installed on managed devices such as routers to aid in their management.  

* Management Information Base
    - This is where all the resources that are to be managed in a network are stored. They are usually organized in a hierarchical order.

## Conclusion
In this tutorial, we have been looking at an overview of the Network Management System.  
We have discussed  Network Management Requirements,
Network Management Systems and  Simple Network Management protocol.

This is just an introductory part of network management, but enough to get you started.
