---
layout: engineering-education
status: publish
published: true
url: /deconstructing-shared-nothing-and-shared-disk-clustering-architectures/
title: Deconstructing Shared Nothing and Shared Disk Clustering Architectures
description: This article will be an overview on shared nothing and shared disk clustering architectures. Clustering involves using multiple processors to handle problems better, faster, and more reliable than a single computer.
author: eric-kahuha
date: 2021-02-04T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/deconstructing-shared-nothing-and-shared-disk-clustering-architectures/hero.jpg
    alt: Shared Nothing and Shared Disk Clustering image
---
When business shifted to the digital realm, there arose a need to keep the business running around the clock. Unlike physical shops, the internet never sleeps, and online shops operate day and night. Any company operating online knows that any disruptions, for any reason whatsoever, might be detrimental to the sales and growth of the business. This need gave rise to the usage of clustering.
<!--more-->
Many companies have embraced clustering as a way to increase the computing capabilities and availability of their hardware. Clustering involves using multiple processors to handle problems better, faster, and more reliable than a single computer.

Organizations considering clustering options are keen to know what architectures and technologies offer the best approach to clustering. In this case, we discuss shared nothing and shared disk clustering architectures.

### Why use clusters?
The two main reasons any online business turns to the use of clusters is that: it helps increase sales by improving the company's scalability and it also enhances the enterprise&#39;s accessibility into the virtual realm. Since clusters involve several processors, when one fails, there are others to take up that workload, and the receiver on the other end using the platform will not experience any downtime.

Its scalability is expansive in that you can always upgrade by adding a new processor so that you can handle the incoming workload. With greater scalability your business is more exposed to the public, you can score more prospects, convert them into clients. All while the extra processors ensure a smooth running experience even as the numbers of users keep growing. Clusters are available as packages offered by big companies in the computer industry like [IBM](https://www.ibm.com/) and [Microsoft](https://www.microsoft.com/).

### Types of clustering
There are several clustering types, but in this piece, we will focus on shared-nothing and shared-disk clustering architectures.

#### Shared-nothing clustering
The shared-nothing clustering involves processors that are entirely independent of each other. The memory is not shared in any way such that each disk has its own space. This type of architecture transmits data through a network interlinked to the computers.

When a customer sends an inquiry or order, that information is transmitted directly to the system that owns that disk or memory. Only one of the clustered system holds one resource at a time. But in the event of a failure, this resource is automatically switched to another processor in the structure.

One of the best things about the shared-nothing clustering is its scalability, the fact that it can hold an extra network of clusters. So that, as you grow, you are at liberty to add more processors to the network.

#### Shared-disk clustering
This second type of clustering entails a network linked to one common disk device. Although the disks have one address, the processors have their own memory space, which is the shared disk. All nodes directly link to the same data and have a controlling facility that enables this shared data to get equally utilized by all the nodes.

It is perfect for sectors in an industry that use data that cannot be partitioned, and it needs to be in one place for processing. And these syndicates should require only a limited transfer of data at a time.

On the downside, the shared-disk clustering architecture model is not as scalable as shared-nothing clustering since each node updates at a time. The way to get around this downside is by using optimization techniques that enable large-scale businesses to expand without a problem.

### Differences between Shared nothing and Shared disk clustering architectures
#### Scalability according to performance
Shared-nothing is very practical to expand according to the size of a business. That is because you can easily add a new node into the already existing cluster. 

The disadvantage of scaling up is that performance may decrease significantly because the nodes have to cross-communicate and coordinate data back and forth. This means you can only expand to a limited level before you see a drop in performance.

Shared-disk, as mentioned above, is challenging when it comes to scaling up. This is because the data transmitted don't need to be partitioned. Even so, when the right optimization steps are taken, the process of data transmission steadily rises, and the scalability opportunity is unlimited.

#### Scalability according to capacity
Shared-nothing is easy to scale up in terms of capacity. You have to add a new node to the cluster to get more space.

The shared disk clustering architecture, that uses one disc device with separate memories, can be upgraded memory-wise, increasing the capacity. Data transmission speed is not affected in any way.

#### Availability
Shared-nothing clustering architecture is highly available. This is attributed to the fact that it can scale up quickly and cheaply. The availability of shared-disk can be limiting because the hardware used is costly compared to the shared-nothing clustering architecture.

#### Data storage
Shared-nothing clustering deals with data that is independently stored in separate nodes, that means that the data being stored can be partitioned and summoned when needed. Shared-disk works with information that cannot be separated.

#### Load balancing
[Load balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing)#) is the process that a computer or processor uses to distribute tasks over specific system resources. The aim is usually to make this transmission more efficient. On that note, shared-nothing clustering architecture has a fixed load balancing, whereas the shared-disk clustering architect has a dynamic loading balancing, which is progressive.

### Summary of features
| Feature | Shared Nothing | Shared Disk |
| --- | --- | --- |
| Scalability according to performance | It can only expand to a limited level | Scalability is unlimited when the right optimization steps are taken |
| Scalability according to capacity | Easily scalable | It can be upgraded memory-wise |
| Availability | Highly available | Has a limited availability |
| Data storage | Data can be partitioned and summoned | Data cannot be separated |
| Load balancing | Has a fixed load balancing | has a dynamic loading balancing |

### Conclusion
The shared-nothing and the shared-disk clustering architecture systems have different features, and each has its pros and cons. One has better scalability with a counteracting factor in reducing performance when scaling is expanded to a certain level. The other has commendable prowess on dynamic loading balance but needs expensive hardware to work.

That said, one may be suited for one type of business and fail in another sector. The shared-nothing is perfect for computing and database tasks that call for the analytical processing of information stored in multiple data warehouses. While shared-disk is ideal to be used in an establishment that analyses data that has to be in one place and never partitioned. 

As we can see, both are fundamental.

Happy coding!


---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
