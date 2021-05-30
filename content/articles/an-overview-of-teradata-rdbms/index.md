---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-teradata-rdbms/
title: An Overview of Teradata RDBMS (Relational Database Management System)
description: This article will be an introduction to Teradata. Which is an open RDBMS (relational database management system) that runs on operating systems such as Windows, Unix, and Linux. Teradata supports huge data warehouse applications.
author: onesmus-mbaabu
date: 2021-01-21T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-teradata-rdbms/hero.jpg
    alt: Teradata RDBMS Image
---
In this era of Big Data, companies are using data-driven approaches to improve various aspects of their businesses. These businesses data is complex, huge, and evolving. This requires an effective tool for managing it. Teradata is an open and scalable database management system, that can enable businesses to improve their outcomes using data management tools.  
<!--more-->
This system is used in various industries such as manufacturing, health care, and transport to optimize their processes.
This article takes you through this system and provides an overview of various aspects such as the importance, features, and architecture of Teradata. It will also explain how Teradata works and highlights its real-life applications. 

### Introduction
Teradata is an open RDBMS (relational database management system) that runs on operating systems such as Windows, Unix, and Linux. Teradata supports huge data warehouse applications. Teradata database consists of broad options for deployment. This system can support various users from multiple client platforms (concurrently). The application of Teradata exists on a parallel architecture. 

It supports strategic intelligence, that provides queries, intelligence tools, and utilities for strategic decision making. For example, users can use Teradata to generate complex reports such as business trends. These reports can be used to make useful future predictions, that improve decision making in an organization. Teradata offers operational intelligence tools that enhance front-line or operational decision making.

### Why you should use Teradata
- It can support a massive volume of data (more than 50 petabytes).
- It can be integrated with various business intelligence (BI) tools.
- It consists of many deployment options that can be used to fetch the same data.
- Users can perform complex analytics because it supports OLAP (online analytical processing).
- The application consists of diverse queries that offer flexibility to users.
- Teradata provides a suite of services (full) relating to data warehousing. 

### Features of Teradata 
Teradata database has the following features:
- **Structured Query Language (SQL):** Teradata provides an extension for SQL, that interacts with data.
- **Linear scalability:** The Teradata system can be scaled up linearly to increase the number of nodes. An increased number of nodes improves overall system performance. 
- **Unlimited parallelism:** This feature enables huge tasks to be divided into smaller tasks. One can run these tasks in a parallel manner. 
- **Automatic distribution:** The disks' distribution of data does not require manual intervention (it is automatic).
- **Mature optimizer:** Teradata has an advanced optimizer that can support many joins in one query. 
- **Total cost of ownership (TCO):** It provides a low TCO. This is because of the easy setup, administration, and maintenance. 
- **Robust Utilities:** It consists of robust utilities such as Multiload, FastExport, TPT, and FastLoad. These utilities enable users to import or export data (from or to the Teradata system).
- **Connectivity:** Teradata system allows connectivity with other systems such as mainframes and network-attached systems. 
- **Load and unload utilities:** It consists of load utilities that can carry data into the Teradata system. It also consists of unload utilities that carry data out of the system. 
- **Shared nothing architecture:** This database consists of a shared-nothing architecture where disks, Teradata nodes, and AMPs (Access Module Processors) are independent. This does not allow the sharing of resources, which optimizes performance in a given task.
  
### The architecture of Teradata
The following diagram shows the architecture of Teradata.

![Teradata Architecture](/engineering-education/an-overview-of-teradata-rdbms/teradata-architecture.png)

[Image Source: EDUCBA](https://cdn.educba.com/academy/wp-content/uploads/2020/04/Components-of-Teradata-Architecture.png)

The architecture of Teradata is based on MPP (massively parallel processing). It can be divided into two main parts: storage architecture and retrieval architecture. The entire architecture is comprised of four parts: passing engine, AMPs, BYNET, and disks. The first two components form the storage architecture, while the last two form the retrieval architecture. 

#### Storage architecture
This architecture is used when the client makes a storage query. The following diagram shows the storage architecture of Teradata.

![Storage Architecture](/engineering-education/an-overview-of-teradata-rdbms/storage-architecture.png)

[Image Source: JavatPoint](https://static.javatpoint.com/tutorial/teradata/images/teradata-architecture2.png)

##### Parsing engine
The following are the specific roles of a parsing engine in the storage architecture:
- It receives the queries (SQL) made by clients. 
- It checks the queries to establish whether there are syntax errors.
- It checks the existence of objects utilized in SQL. 
- It formulates the execution plans for these queries. It then sends them to BYNET.
- It collects the results of the SQL query from the AMPs and passes them to the client.  
  
##### Access Module Processor (AMP)
This is a virtual processor that is connected to BYNET. Every AMP consists of a specific disk that allows it to read and write. 

An AMP performs the following tasks:
- It works on a section of a table.
- It checks records made on disks.
- It performs functions relating to the generation of the final result. These include aggregation, joining, and sorting. 
- It conducts space and lock management. 
  
#### Retrieval architecture
This architecture is used when a client makes a retrieval query. The diagram below shows the retrieval architecture of Teradata.

![Retrieval Architecture](/engineering-education/an-overview-of-teradata-rdbms/retrieval-architecture.png)

[Image Source: JavatPoint](https://static.javatpoint.com/tutorial/teradata/images/teradata-architecture3.png)

##### BYNET
This component links the parsing engine to the Access Module Processor. It is a message-passing layer. BYNETS exist in two main forms: BYNET 0 and BYNET 1. If one of the BYNETS fails to function well, the other one can replace it. Both forms can be employed if the amount of data used is enormous.

##### Disk
This is a storage area for AMPs. They are termed as Vdisks or Virtual disks. 

### How Teradata works
Teradata works through the four components mentioned above. The operation of the system depends on the type of query made by the client. If the client wants to insert records, the storage architecture will be used. In this case, the parsing engine will receive the storage query (insert records) for processing. 

The parsing engine consists of four main elements that work systematically on the query: the parser, session handler, optimizer, and dispatcher. 

The systematic process in the parsing engine can be described as follows:
- **Parser:** This evaluates the syntax and passes the query to the next element (system handler).
- **System handler:** This evaluates whether the user has the right logging credentials to execute the query. 
- **Optimizer:** This establishes the optimum plan for executing the SQL query.
- **Dispatcher:** This passes the query to the Access Module Processor. 
  
The table rows are distributed on all the available AMPs. The AMPs lock the table and execute the plan made by the parsing engine. When the execution is done, the AMPs will complete the transaction and store records on their specific disks.  

If the client wants to retrieve data, the retrieval architecture will be used. The related query will be sent to the parsing engine. The parsing engine generates a request and sends it to BYNET. BYNET will then forward the request to the AMPs. The AMPs will perform a parallel search and locate the desired records. These will be forwarded to the parsing engine via BYNET. The parsing engine will then forward the records to the client. 

### Applications of Teradata 
The following are some of the industries in which Teradata is used.

#### Finance
Teradata enables financial companies to improve their customer experience through data-led decision making and personalized services. It also enables organizations to prepare quality financial reports. 

#### Manufacturing
Teradata supports manufacturing analytics, that help in generating resourceful insights for innovation and growth. The insights generated from various data sources help manufacturing companies reduce costs, improve supply efficiency, and optimize processes. 

#### Health care
This system offers healthcare analytics solutions to various healthcare providers. These solutions help them to collect accurate data from patients, which improves the quality of healthcare service. Teradata enables health providers to integrate data from various sources to develop meaningful insights that eliminate various health-related challenges. 

#### Retail
The retail industry is experiencing immense transformation because of increased competition, changing demand patterns, and the pressure to increase profit margins. Teradata provides retail companies with retail analytics that enable them to optimize demand forecasting and their customer experience. This system enables these companies to use a data-driven approach in solving various business problems. 

#### Transport
Various transport operators use Teradata to capture and organize data relating to their customers, business operations, logistics, and business strategies. Teradata helps these operators use a data-driven approach to optimize crew planning, marketing, and distribution. 

### Conclusion
Teradata is a practical database system that enables businesses to use data when improving their processes and outcomes. Many organizations choose this system because it is scalable and can support huge volumes of data. The system consists of exciting features that add value in terms of the low cost of ownership, high performance, and parallel processing. 

Teradata is used in various industries such as healthcare, finance, manufacturing, retail, and transport. Digital transformation is changing the way data is managed. In the future, Teradata will consist of diverse tools used in a wide variety of sectors. 

### Resources
- [Techopedia]( https://www.techopedia.com/definition/25987/teradata#:~:text=Teradata%20is%20a%20fully%20scalable%20relational%20database%20management,widely%20used%20to%20manage%20large%20data%20warehousing%20operations.)

- [Teradata]( https://www.teradata.com/About-Us)

- [Slide Share](https://www.slideshare.net/bigclasses/introduction-to-teradata-how-teradata-works)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
