---
layout: engineering-education
status: publish
published: true
url: /understanding-the-downsides-of-load-balancing/
title: Understanding the Downsides of Load Balancing
description: This article will discuss methods used in load balancing, related challenges, as well as possible solutions.
author: martha-ngugi
date: 2021-12-21T00:00:00-04:30
topics: []
excerpt_separator: <!--more-->
images:

  - url:  /engineering-education/understanding-the-downsides-of-load-balancing/hero.jpg
    alt: Load Balancing Example Hero Image
---
Load balancing involves distributing incoming network traffic across several backend servers. Modern web applications handle millions of concurrent requests from visitors. 
<!--more-->
These servers must respond in the shortest time possible with the right resource as requested.

A single server cannot handle all the workload of a particular application. It is likely to experience issues with performance, availability, and economics. 

To handle more traffic, we have to enhance the processing capability. This can be achieved either by scaling up or scaling out.

However, a server may fail at times and the cost of using a machine may be huge even to afford. 

Spreading the workload over multiple machines may be a better approach. This is why [load balancing](https://www.citrix.com/solutions/app-delivery-and-security/load-balancing/what-is-load-balancing.html) is recommended.

However, load balancing comes with several challenges. In this article, we will cover some of these challenges, as well as possible solutions.

### Table of contents
- [the load balancing concept](#the-load-balancing-concept)
- [Load balancing methods](#load-balancing-methods)
- [Challenges of load balancing and possible solutions](#challenges-of-load-balancing-and-possible-solutions)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### The load balancing concept
Load balancing involves distributing incoming network traffic across several backend servers. Modern web applications handle millions of concurrent requests from visitors. 

They must respond in the shortest time possible with the right resource. Practically, the solution would be adding more servers to handle the requests.

A load balancer is placed in the front of servers thus, routing client requests across all servers capable of handling those operations. 

A load balancer ensures that no server is overloaded with the request. This boosts speed and optimizes performance. 

In case one server is down, a load balancer will redirect the requests to the remaining servers. Also, when a new server is added, a load balancer would start routing requests to it.

### Load balancing methods
These load-balancing algorithms specify how the server load will be distributed across a server pool. 

There are several methods and criteria to achieve load balancing, as well as routing the incoming traffic.

The following are some of the commonly used methods to achieve load balancing:

#### Round-robin
In this algorithm, several servers are programmed to handle the load in a rotating sequential manner. 

Each device is assumed that it can process the same number of requests. The algorithm does not account for active connections.

#### Weighted round-robin
Servers are categorized according to the number of requests each can handle. This means that servers with high ratings are assigned more requests.

#### Least connections
This algorithm assumes that all the connections generate an equal amount of server load. In this technique, the machine with a fewer number of connections receives the requests.

#### Weighted least connections
Servers are characterized according to their processing capabilities. The server load is then assigned according to server capacities and the number of active connections.

#### Source IP hash
It generates the hash key by combining both source and destination IP addresses, then the key is assigned to a specific server. 

In case a terminated connection comes back online, it is reassigned to the original server that was handling it.

### Advanced challenges of load balancing and possible solutions
There are several issues and challenges associated with load balancing that may require special attention to solve. Some of these challenges are highlighted below:

#### Geographically distributed nodes
Data centers and servers in the cloud are geographically distributed worldwide in cloud computing. 

These distributed nodes are supposed to be treated as a single location system to execute user requests efficiently.

Some load-balancing algorithms are designed for small areas. Factors such as communication delays, network delays, the distance between distributed nodes, and the distance between the user and resources are not considered. 

Nodes located at distant locations pose a challenge as algorithms cannot handle them because they are not suited for such environments. 

The possible solution is that algorithms that cater to distantly located nodes should be designed and used in this scenario.

#### Single point of failure
Some of the dynamic load balancing algorithms have techniques that do not support distributed nodes. 

This leads to some of the load balancing decisions being made from a central node and in case of the central node crashing, then the whole computing environment is also affected. 

An algorithm that supports distributed nodes needs to be developed to curb this challenge to avoid a single central node controlling the whole computing environment.

#### Virtual Machine migration
Virtualization enables users to create several Virtual Machines (VMs) on a single physical machine. 

These VMs are independent and have different configurations. If the physical machine gets overloaded, some VMs may transfer to a distant location using the VM live migration approach. 

The [VM live migration](https://www.vmware.com/in/products/vsphere/vmotion.html) requires high bandwidth. The vast VM image size cannot be transmitted at low bandwidths which leads to high latency levels.

The challenge of heavy workloads can be addressed by filtering and reducing techniques to ensure that data is allocated evenly. This allows the workload to be shared equally. 

Besides, the network bandwidth challenge can be solved by dynamically allocating more bandwidth for the VM to utilize it.

#### Heterogeneous nodes
In cloud computing, user requirements often change and should be executed on heterogeneous nodes to ensure practical resource usage and low response time. 

However, there is a challenge of not having efficient algorithms for heterogeneous environments. More research is needed in this area to curb this challenge.

#### Storage management
In recent times, cloud computing does not use traditional storage systems that require personal management and expensive hardware. 

Cloud computing stores data in heterogeneous nodes where there is no challenge when accessing it. This field is growing rapidly and requires data for efficient performance.

Full data replications are not efficient due to the policy on duplicate data. Partial replication can be enough but faces the challenge of dataset availability, as well as load balancing complexity. 

There is a need for efficient load balancing techniques that allow app distribution and other related data on a partial replication system.

#### Load-balancer scalability
On-demand availability and scalability of cloud services enable users to access the service at any time. 

It also gives users the ability to scale up or down the services depending on their needs. 

A good load balancer should meet consumer demands, computing power, storage, and system capabilities.

#### Complexity of algorithms
The complexity of load balancing algorithms heavily affects the overall system performance. The algorithm may seem simple, but in terms of migration time, fault tolerance, and response time, it may give poor performance. 

Load balancing algorithms should be optimized to deliver the best system performance regardless of the server load.

### Conclusion
Load balancing ensures the visitor gets the best user experience. It is possible to achieve higher resource usage through numerous load balancing algorithms.

However, there is still room for improving the system's performance in the future by using new load balancing algorithms. 

Therefore, there is a need to analyze new load balancing algorithms from different categories based on various metrics to check their effectiveness before deploying them.

### Further reading
- [Overview of load balancing](https://avinetworks.com/what-is-load-balancing).
- [Understanding load balancing metrics](https://blog.appoptics.com/an-in-depth-guide-to-load-balancer-monitoring).
- [Benefits of load balancing](https://www.webwerks.in/blogs/what-cloud-load-balancing-and-what-are-its-benefits).
- [Load balancing of Heterogeneous workloads](https://www.researchgate.net/publication/273568664_Load_Balancing_of_Heterogeneous_Workloads_in_Memcached_Clusters).

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
