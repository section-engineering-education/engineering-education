---
layout: engineering-education
status: publish
published: true
url: /mobile-databases-in-networking/
title: Understanding Mobile Databases in Networking
description: A mobile database is connected to a computer device over a wireless mobile network. This article will cover mobile databases in networking.
author: christine-muthoni
date: 2021-12-10T00:00:00-12:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mobile-databases-in-networking/hero.jpg
    alt: mobile databases in networking Hero Image
---
Mobile databases make data from database applications available to mobile users, and they support applications that involve data processing. In general, a mobile database enables a connection between computing devices across a wireless mobile network.
<!--more-->
Mobile computing makes it possible for users to communicate while on the move.

### Table of contents
- [Properties of mobile databases](#properties-of-mobile-databases)
- [Types of mobile databases](#types-of-mobile-databases)
- [Advantages of mobile databases](#advantages-of-mobile-databases)
- [Disadvantages of mobile databases](#disdvantages-of-mobile-databases)
- [Characteristics of mobile environments](#characteristics-of-mobile-environments)
- [Requirements of mobile databases](#requirements-of-mobile-databases)
- [Transaction management in mobile database systems](#transaction-management-in-mobile-database-systems)
- [Existing mobile databases](#existing-mobile-databases)
- [Conclusion](#conclusion)

### Properties of mobile databases
- It resides on mobile devices.
- It provides a communication link between a central database server and other mobile links that allow a transfer.
- The mobile database connects the database of the central system.
- A mobile database enables users to view information while on the move.
- Mobile databases analyze data on mobile devices.

### Types of mobile databases
#### Client-server mobile database
In the client-server, the database server connects the client machine with the running application programs that users are using. The client machines have running application programs that users are using. The programs are the ones in charge of query generation. 

The computer network makes it possible for the generated query to get accessed by the database. The database server will check the query, the required data for the query processing, which user has sent the query, and the respective authenticity of the new use. 

The processed result is allocated to the respective client machine, which displays the result to the user. The central server checks the syntax of the commands from the client's queries. The server system is hidden so that the user does not know about the server's hardware and software.

#### Peer-to-peer mobile database
It is a database stored in the users of a mobile peer-to-peer network. The database maintenance activities get distributed among clients. Each device has a mobile database that stores data items, which forms the mobile peer-to-peer database. 

The peer clients forward the request as many times as possible until the data items are found. The concept of a peer-to-peer database proposes searching local information like information of a temporary nature. 

For example, if there is the availability of a parking slot in a specific geographical area. Applications that use peer-to-peer mobile databases are:
- Social networks.
- Airport application.
- Mobile E-commerce.
- Transport safety and efficiency.

### Advantages of mobile databases
- Limited bandwidth of wireless networks.
- It needs low power.
- It should enhance mobility.
- Disconnections.
- It does not require many resources.

### Disadvantages of mobile databases
- It is less secure.
- Bandwidth is limited.
- The mobile database consumes more power.

### Characteristics of mobile environments
- Limited bandwidth of wireless networks.
- It needs lower power.
- It should enhance mobility.
- Disconnections.
- It doesn't require many resources.

### Requirements of mobile databases
1. Memory footprint is the primary memory size a process is taking up. The size of the mobile database affects the amount of memory a process will take. Mobile databases should have a small print since mobile devices have limited memory.
2. Flash optimized storage system- Mobile database needs to be optimized to use the new storage devices. 
3. Data synchronization - Mobile database should have the synchronize functionality to maintain consistency within the data.
4. Security - Mobile database should implement complete end security to ensure secure data transfer.
5. Low power consumption- Optimization needs to be done in mobile databases for efficient power consumption.
6. Self-management - Mobile databases need to understand its responsibilities and perform the database administrator tasks.
7. Embeddable - Databases must be embeddable as a Dynamic Link Library file so that administrators can have direct access to mobile devices.

### Transaction management in mobile database systems
- A transaction is a unit of work carrying out instructions within a database management system. In a mobile environment, one should consider a restricted bandwidth because of the mobility of the host.
- If the bandwidth is high, information is easily accessed as there is a strong connection, while there is a weak connection if the bandwidth is low. Mobile transaction checks if the bandwidth is high or low, it can switch from a powerful connection to an inadequate connection or conversely. With this, mobile users start transactions from anywhere, maintaining consistency.

#### Mobile transaction models
1. Report and co-transaction model
2. Pre-serialization transaction model
3. Two-tire transaction model
4. Moflex transaction model

For more inquiries about transaction models, visit [Overview of transaction models](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.22.2097&rep=rep1&type=pdf).
 
### Mobile database recovery
Mobile database systems can store actual databases at one or multiple locations. In case of failure, recovery of the mobile database system is possible. Mobile database recovery is more complex than the traditional database.

#### Factors that affect recovery
1. The mobile device might be broken, stolen, or gets lost.
2. There are areas with a poor network connection.
3. There may be network problems like weak wireless connections.
4. Mobility.

The new recovery scheme is more suitable for mobile databases than the traditional one. The main types of traditional schemes are the lazy and pessimistic approaches.

#### New scheme
Its main goal is managing and maintaining any changes made to the data. It focuses on the recovery of the mobile unit at the time of conveyance. One should note the changes made to the data as they can help when trying to recover the mobile unit in case of failure. 

The new scheme considers two conditions for recovery:
- 1st condition: If the device recovers in the same base station where it crashed.
- 2nd condition: If the device moves to a Designated Base Station as you try to recover it, the old base station is unrecognized.

The old base station notifies the new base station about the mobile device's data. A query is sent to the DBS requesting information about the mobile device and the data that was on it.

#### Pros and cons of the new scheme
##### Pros
- It avoids numerous copies of data.
- Data gets saved at one central place for faster recovery reducing recovery time.
- Maintained data on the previous base station becomes an updated version of recovery.

##### Cons
- The base stations have the same DBS, and data stored on one DBS gets overloaded sometimes.

#### Existing mobile databases
- Sybase SQL Anywhere.
- Oracle lite.
- Microsoft SQL server compact.
- SQ lite.
- IBM DB2 everyplace (DB2e).
 
### Conclusion
In conclusion, every device we use has a working database that makes data available to the users. After reading the article, users should know how configuration occurs in mobile databases.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
