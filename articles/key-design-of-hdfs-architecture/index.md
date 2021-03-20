---
layout: engineering-education
status: 
published: 
url: /engineering-education/key-design-of-hdfs-architecture/
title: Key Design of HDFS architecture
description: This article will describe a brief introduction to Big data Framework, the general Design of HDFS architecture, ways of configuring HDFS Data Storage policies, Colocation and it's benefits in HDFS.
author: ruth-mare
date: 2021-03-19T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/key-design-of-hdfs-architecture/hero.jpg
    alt: HDFS Architecture cover image 
---
HDFS (Hadoop Distributed File System) is a big data distributed file system storage by Apache that is implemented within the hadoop framework and that needs to have several features of design implemented to work effectively in processing, distibuting and storing big data.

<!--more-->

### Overview
This article will cover:
- [ntroduction to Big Data Framework](#Introduction-to-Big-Data-framework)
- [General Design of HDFS architecture](#General-Design-of-HDFS-architecture)
- [Configuring HDFS data storage policies](#Configuring-HDFS-data-storage-policies)
- [Colocation and its benefits in HDFS](#Colocation-and-its-benefits-in-HDFS)

### 1) Introduction to Big Data Framework
Big data is data in sets that are of high volume and complexity beyond what traditional data processing software applications can deal with.

Big data framework is characterized by 4Vs namely; Variety (data is of various forms and types), Velocity (data processing speed is high), Value (low data value density), and Volume (massive amount of data).

Among the frameworks that can do the processing of data with the above characteristics, is Apache Hadoop. Within the Hadoop framework is the Hadoop Distributed File System (HDFS).
HDFS is a distributed file system of the Hadoop technical framework that is developed based on the Google File System (GFS) and is used to manage files on multiple independent physical servers.

It is applied in the following scenarios:
-	Ecosystem data storage.
-	Website user data behavior data storage.
-	Meteorological data storage.

### 2)	General Design of HDFS architecture
The HDFS has design features of its architecture that enable its efficient working among which are the following;

***Federation storage:*** HDFS creates a distinction between the namespace and storage. The two are separated to create a block storage layer.

***High Availability:*** HDFS supports features such as data replication which enhances the availability of the system. A single block of data is replicated in 3 nodes so that should a single node fail, a client can access the block from 2 other nodes.
Data can still be accessed normally even when a failure occurs on the DataNode or NameNode.

***Multiple access modes:*** Within HDFS data can be accessed through HTTP on an HTTP browser, Java API for applications, or any other command shells.

***Space reclamation:*** Space that had been released in HDFS can be reclaimed.
This is implemented by a recycle bin mechanism where data that had been deleted can be restored from the recycle bin to occupy its initial space. The number of replicas can also be dynamically set.

***NameNode/DataNode in master/slave mode:*** HDFS consists of NameNodes and DataNodes that work in a master/slave architecture. A single cluster consists of only one NameNode which regulates data access by clients and manages the namespace within the file system.

The DataNode receives instructions from the NameNode on when to Create, Delete and replicate data blocks.

***Unified file system Namespace:*** HDFS is presented externally as a coherent file system.
Any external process perceives the system as one unified system.

***Data replication:*** In HDFS, a file’s blocks are replicated for fault tolerance and the number of replicas can be specified by an application. This can be done at creation time but is subject to change at will.

***Metadata persistence:*** The HDFS NameNode stores the namespace. The NameNode consistently records every change that occurs in file system metadata in a transaction log file called the EditLog. Whenever a new file is created in HDFS, the NameNode inserts a record into the EditLog indicating the creation of the new file.

This information is also synchronized between the Active and the Standby NameNode periodically.

***Robustness:*** HDFS stores data reliably even when failures occur. Its robustness takes into account the 3 common types of failures: DataNode failure, NameNode failure, and network failures.

***Data organization:*** Data is stored by blocks of size 64MB in HDFS.

***HDFS Data Integrity Assurance:*** HDFS ensures the completeness of the stored data by implementing reliability processing in case of failure of each component. HDFS accomplishes this by doing the following;

- Reconstructs data replicas in invalid data disks - the DataNode periodically reports blocks’ messages to the NameNode, if one replica (block) is failed, the NameNode will start the procedure to recover lost replicas
- Ensures data balance among DataNodes - the HDFS architecture is configured with the data balance mechanism, which ensures the even distribution of data among all DataNodes.
- Ensures metadata reliability - the transaction log mechanism is used to operate metadata, which is stored on both active and standby NameNodes. The snapshot mechanism of the file system ensures that data can be recovered promptly when a misoperation occurs.
- Provides the security mode - HDFS provides a unique security mode to prevent a fault from spreading when a DataNode or hard disk faulty.

***Data storage policy:*** HDFS supports 6 storage policies namely;
- Hot – Storage on DISK.
- Warm – Storage on both DISK and ARCHIVE.
- Cold – Storage on ARCHIVE.
- One_SSD – Storage of a single replica on SSD and other replicas on DISK.
- All_SSD – Storage of all replicas on SSD.

### 3) Configuring HDFS data storage policies
The HDFS NameNode automatically selects DataNodes to store data replicas by default. This can be done by the following scenarios:

+ *Layered storage*
Select a proper storage device for layered data storage from multiple devices on a DataNode.

The HDFS layered storage architecture provides four types of storage devices: RAM_DISK (memory virtualization hard disk), DISK (mechanical hard disk), ARCHIVE (high-density and low-cost storage media), and SSD (solid-state disk).

Storage policies for different scenarios are formulated by combining the four types of storage devices.

+ *Tag storage*
Select a proper DataNode according to directory tags indicate data importance levels.

+ *Node Group Storage*
Store key data in highly reliable node groups because the DataNode cluster uses heterogeneous servers.


### 4) Colocation and its benefits in HDFS
Colocation is the storage of associated data or data that will be associated on the same storage node.

This is implemented as a solution to the great consumption of network resources during a massive migration of data that affects the processing speed of massive data and system performance greatly.

**Benefits of colocation**
+	Reduces network bandwidth and resource consumption.
+	Enhances easy and quick access to data.


### To wrap up
HDFS is similar to other distributed file systems except for some distinct differences that serve as strengths of HDFS over other Distributed File Systems. These distinct differences are such as, fault-tolerance, high throughput, and ability to be deployed on low-cost hardware and support large data sets.

### Relevant resources
- [HDFS Architecture Guide](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html)
- [Characteristics of HDFS](https://www.geeksforgeeks.org/characteristics-of-hdfs/)
- [Big Data Huawei](http://support.huawei.com/learning/Certificate!showCertificate?lang=en&pbiPath=term1000025450&id=Node1000011796)

---