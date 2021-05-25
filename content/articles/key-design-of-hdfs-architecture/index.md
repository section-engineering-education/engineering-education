---
layout: engineering-education
status: publish
published: true
url: /key-design-of-hdfs-architecture/
title: Key Design of HDFS Architecture
description: This article will be a brief introduction to big data framework, the general design of HDFS architecture, ways of configuring HDFS data storage policies, co-location and it's benefits in HDFS.
author: ruth-mare
date: 2021-03-31T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/key-design-of-hdfs-architecture/hero.jpg
    alt: HDFS Architecture cover image 
---
HDFS (Hadoop Distributed File System) is a big data distributed file system storage by Apache. It is implemented within the Hadoop framework and it needs to have several features of design implemented to work effectively in processing, distributing, and storing big data.
<!--more-->
HDFS (Hadoop Distributed File System) is similar to other distributed file systems except for some key differences such as, fault-tolerance, high throughput, and ability to be deployed on low-cost hardware.

### Overview
This article will cover:
- [Introduction to Big data framework](#introduction-to-big-data-framework)
- [General design of HDFS architecture](#general-design-of-hdfs-architecture)
- [Configuring HDFS data storage policies](#configuring-hdfs-data-storage-policies)
- [Colocation and its benefits in HDFS](#colocation-and-its-benefits-in-hdfs)

### Introduction to Big data framework
Big data is data in sets that are of high volume and complexity beyond what traditional data processing software applications can deal with.
Big data framework is characterized by 4Vs namely:
1. Variety (data is of various forms and types)
2. Velocity (data processing speed is high)
3. Value (low data value density)
4. Volume (massive amount of data)

Apache Hadoop is among the frameworks that can do the processing of data with the characteristics described above. Within the Hadoop framework is the Hadoop Distributed File System (HDFS).

HDFS is a distributed file system of the Hadoop technical framework that was developed based on the Google File System (GFS) and is used to manage files on multiple independent physical servers.

It is applied in the following scenarios:
-	Ecosystem data storage.
- Website user data behavior data storage.
- Meteorological data storage.

### General design of HDFS architecture
The HDFS has design features of its architecture that enable its efficient working among which are the following:

***Federation storage:*** HDFS creates a distinction between the namespace and storage. The two are separated to create a block storage layer.

***High Availability:*** HDFS supports features such as data replication which enhances the availability of the system. A single block of data is replicated in 3 nodes, so that even if a single node fail, a client can access the block from 2 other nodes.

Data can still be accessed normally even when a failure occurs on the 'DataNode' or 'NameNode'.

>A *'NameNode'* is a primary component within the HDFS framework that stores meta-data of files, manages and maintains 'DataNodes', and assigns them tasks. It is also known as the master node.

>A *'DataNode'* is a node that stores the actual data within HDFS and does creation, deletion,  and replication of data blocks. It also serves read and write requests for clients and is usually known as the slave node.

***Multiple access modes:*** Within HDFS data can be accessed through HTTP on an HTTP browser, Java API for applications, or any other command shells.

***Space reclamation:*** Space that had been released in HDFS can be reclaimed. This is implemented by a recycle bin mechanism where data that had been deleted can be restored from the recycle bin to occupy its initial space. The number of replicas can also be dynamically set.

***NameNode/DataNode in master/slave mode:*** HDFS consists of `NameNodes` and `DataNodes` that work in a master/slave architecture. A single cluster consists of only one `NameNode` which regulates data access by clients and manages the namespace within the file system.

The `DataNode` receives instructions from the `NameNode` on when to create, delete, and replicate data blocks.

***Unified file system Namespace:*** HDFS is presented externally as a coherent file system. Any external process perceives the system as one unified system.

***Data replication:*** In HDFS, a file’s blocks are replicated for fault tolerance and the number of replicas can be specified by an application. This can be done at creation time but is subject to change at will.

***Metadata persistence:*** The HDFS `NameNode` stores the namespace. The `NameNode` consistently records every change that occurs in file system metadata in a transaction log file called the 'EditLog'.

Whenever a new file is created in HDFS, the `NameNode` inserts a record into the 'EditLog' indicating the creation of the new file.

This information is also synchronized between the active and the standby `NameNode` periodically.

***Robustness:*** HDFS stores data reliably even when a failure occurs. 

Its robustness takes into account the 3 common types of failures:
1. DataNode failure
2. NameNode failure
3. Network failure

***Data organization:*** Data is stored by blocks of size 64MB in HDFS.

***HDFS Data Integrity Assurance:*** HDFS ensures the completeness of the stored data by implementing reliability processing in case of failure of each component. 

HDFS accomplishes this by doing the following:
- Reconstructing data replicas in invalid data disks - the `DataNode` periodically reports blocks’ messages to the `NameNode`, if one replica (block) fails, the `NameNode` will start the procedure to recover lost replicas.
- Ensures data balance among `DataNodes` - the HDFS architecture is configured with the data balance mechanism, which ensures the even distribution of data among all `DataNodes`.
- Ensures metadata reliability - the transaction log mechanism is used to operate metadata, which is stored on both active and standby `NameNodes`. The snapshot mechanism of the file system ensures that data can be recovered promptly when a misoperation occurs.
- Provides the security mode - HDFS provides a unique security mode to prevent a fault from spreading when a `DataNode` or hard disk is faulty.

***Data storage policy:*** 
HDFS supports 5 storage policies namely:
1. Hot – Storage on DISK.
2. Warm – Storage on both DISK and ARCHIVE.
3. Cold – Storage on ARCHIVE.
4. One_SSD – Storage of a single replica on SSD and other replicas on DISK.
5. All_SSD – Storage of all replicas on SSD.

### Configuring HDFS data storage policies
The HDFS NameNode automatically selects DataNodes to store data replicas by default. 

This can be done in the following scenarios:

#### Layered storage
Select a proper storage device for layered data storage from multiple devices on a DataNode.

The HDFS layered storage architecture provides four types of storage devices:
1. RAM_DISK (memory virtualization hard disk)
2. DISK (mechanical hard disk)
3. ARCHIVE (high-density and low-cost storage media)
4. SSD (solid-state disk)

To formulate storage policies for different scenarios, the four types of storage devices are combined.

#### Tag storage
Select a proper DataNode according to directory tags which indicates data importance levels.

#### Node Group Storage
Stores key data in highly reliable node groups because the DataNode cluster uses heterogeneous servers.

### Colocation and its benefits in HDFS
Colocation is the storage of associated data or data that will be associated on the same storage node.

This is implemented as a solution to the great consumption of network resources during a massive migration of data that affects the processing speed of massive data and system performance greatly.

#### Benefits of colocation
-	Reduces network bandwidth and resource consumption.
- Enhances easy and quick access to data.

### To wrap up
As mentioned earlier HDFS is similar to other distributed file systems except for some distinct differences that serve as strengths of HDFS over other Distributed File Systems. 

These distinct differences are, its fault-tolerance, its high throughput, and its ability to be deployed on low-cost hardware and support large data sets.

Happy learning.

### Relevant resources
- [HDFS Architecture Guide](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html)
- [Characteristics of HDFS](https://www.geeksforgeeks.org/characteristics-of-hdfs/)
- [Big Data Huawei](http://support.huawei.com/learning/Certificate!showCertificate?lang=en&pbiPath=term1000025450&id=Node1000011796)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
