---
layout: engineering-education
status: publish
published: true
url: /understanding-the-downsides-of-load-balancing/
title: Understanding the Downsides of Load Balancing
description: This article will explain load balancing in terms of its methods, challenges, and possible solutions to the challenges.
author: martha-ngugi
date: 2021-12-07T00:00:00-17:30
topics: [cloud computing]
excerpt_separator: <!--more-->
images:

  - url:  /engineering-education/understanding-the-downsides-of-load-balancing/hero.jpg
    alt: Load Balancing Example Image
---
Load balancing involves distributing incoming network traffic across several backend servers. Modern web applications handle millions of concurrent requests from visitors. They must respond in the shortest time possible with the right resource that has been requested.
<!--more-->

A single server cannot handle all the workload of a given application. It is likely to experience issues with performance, availability, and economics. In order to handle increased traffic, we have to increase the capability of processing requests and can be achieved either by scaling up or scaling out.

However, the machine fails at times, and the cost of using a high specification machine may be huge even to afford. Spreading the workload over multiple machines may be a better approach and therefore [load balancing](https://www.citrix.com/solutions/app-delivery-and-security/load-balancing/what-is-load-balancing.html) is recommended, but this approach comes with several challenges. In this article, we will cover some of the challenges and possible solutions.

### Article overview

1. [Concept of load balancing](#concept-of-load-balancing)
2. [Load balancing methods](#load-balancing-methods)
3. [The advanced challenges of load balancing and possible solutions](#the-advanced-challenges-of-load-balancing-and-possible-solutions)
4. [Conclusion](#conclusion)
5. [Further reading](#further-reading)

### Concept of load balancing
Load balancing involves distributing incoming network traffic across several backend servers. Modern web applications handle millions of concurrent requests from visitors. They must respond in the shortest time possible with the right resource that has been requested. Practically, the solution would be adding more servers to handle the requests.

A load balancer works the same as the traffic officer since it is placed in the front of servers routing client requests across all the servers capable of handling those requests. It ensures that no server is overloaded with the request hence maximizing speed at optimized performance. In the case one server is down, a load balancer will redirect the requests to the remaining online servers. Also, when a new server is added, a load balancer would start routing requests to it.

### Load balancing methods
These load-balancing algorithms specify how the server load will be distributed across a server pool. There are several methods to achieve load balancing and in each method, there is a specific criterion used to route the incoming traffic.

The following are some of the commonly used methods used to achieve load balancing:
#### Round-robin
In this algorithm, several servers are programmed to handle the load in a rotating sequential manner where each device is assumed that it can process the same number of requests. The algorithm does not account for active connections.

#### Weighted round-robin
Here, the servers are categorized according to the number of requests each can handle meaning that the servers with high ratings are assigned more requests.

#### Least connections
This algorithm assumes that all the connections generate an equal amount of server load. In this method, the server with a fewer number of connections receives the requests.

#### Weighted least connections
Here, the servers are categorized according to their processing capabilities. The server load is then assigned according to server capacities and the number of active connections each server has.

#### Source IP hash
It generates the hash key by combining both source and destination IP addresses, then the key is assigned to a specific server. In case there was a dropped connection that returns online, it is reassigned to the original server that was handling it.

### The advanced challenges of load balancing and possible solutions
There are some issues and challenges associated with load balancing that may require special attention to solve. Some of these challenges are highlighted below:
#### Geographically distributed nodes
It is well known that data centers and servers in the cloud are geographically distributed worldwide in cloud computing. These distributed nodes are supposed to be treated as a single location system to execute user requests efficiently.

Some load-balancing algorithms are designed for small areas. Factors such as communication delays, network delays, the distance between the distributed nodes, and the distance between the user and resources are not considered. The nodes located at distant locations pose a challenge as the algorithms cannot handle them since they are not suited for such environments. The possible solution is that the algorithms that cater to distantly located nodes should be designed and used in this scenario.

#### Single point of failure
Some of the dynamic load balancing algorithms designed have some techniques that do not support distributed nodes. This leads to some of the load balancing decisions being made from a central node and in case of the central node crashing, then a whole computing environment is as well affected. An algorithm that supports distributed nodes needs to be developed to curb this challenge to avoid a single central node controlling the whole computing environment.

#### Virtual Machine migration
Virtualization enables the users to create several Virtual Machines (VMs) on a single physical machine. These VMs are independent and have different configurations. If the physical machine gets overloaded, some VMs may transfer to a distant location using the VM live migration approach. The [VM live migration](https://www.vmware.com/in/products/vsphere/vmotion.html) comes with the challenge of high bandwidth requirements as the vast VM image size cannot be transmitted at low bandwidths, leading to high latency levels.

The challenge of heavy workloads can be addressed by filtering and reducing techniques to ensure that data is allocated evenly, leading to the workload being shared equally. Also, the network bandwidth challenge can be solved by dynamically allocating the network bandwidth for the VM to utilize it.

#### Heterogeneous nodes
In cloud computing, user requirements often change and require execution on heterogeneous nodes to ensure practical resource usage and minimize response time. However, there is a challenge of not having efficient algorithms for heterogeneous environments. More research should be conducted on the same curb this challenge.

#### Storage management
In recent times, cloud computing does not use the traditional storage systems that require personal management and high cost of hardware. Cloud computing stores the data in heterogeneous nodes where access to data poses no challenge. Cloud storage is constantly increasing and requires storing replicated data for efficient data access and consistency.

Full data replications are not efficient due to the policy on duplicate data on replication points. Partial replication can be enough but faces the challenge of dataset availability and increasing the load balancing algorithms complexity. There is a need for an efficient load balancing technique that allows the distribution of application and other related data on a partial replication system to face this challenge.

#### Load-balancer scalability
The on-demand availability and scalability of cloud services enable the users to access the service at any time. Also, it gives the users the ability to scale up or down the services depending on their needs. A good load balancer should ensure the changes in demands, whether computing power, storage, or system topologies, are met.

#### Complexity of Algorithm
The complexity of load balancing algorithms heavily affects the overall performance of the system. The algorithm may seem simple, but in terms of migration time, fault tolerance and response time may give poor performance, and the opposite may be the truth. Load balancing algorithms should be optimized to deliver the best system performance regardless of the server load.

### Conclusion
Load balancing ensures the visitor gets the best user experience. It is possible to achieve higher resource usage through numerous load balancing algorithms, hence reducing system response time, thereby increasing the user experience. However, there is still room for improvement in increasing the system's performance in the future by using new load balancing algorithms. Therefore, there is a need to analyze new load balancing algorithms from different categories based on various load balancing metrics to check their effectiveness before deploying them.

### Further reading
- [Overview of load balancing](https://avinetworks.com/what-is-load-balancing).
- [Understanding load balancing metrics](https://blog.appoptics.com/an-in-depth-guide-to-load-balancer-monitoring).
- [The benefits of load balancing](https://www.webwerks.in/blogs/what-cloud-load-balancing-and-what-are-its-benefits).
- [Load balancing of Heterogeneous workloads](https://www.researchgate.net/publication/273568664_Load_Balancing_of_Heterogeneous_Workloads_in_Memcached_Clusters).

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
