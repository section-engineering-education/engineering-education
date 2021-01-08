In this era of Big Data, companies are using data-driven approaches to improve various aspects of their businesses. Data used by these businesses is complex, huge and evolving, which requires an effective tool for managing it. Teradata is an open and scalable database management system that can enable businesses to improve their outcomes using data management tools. This system is used in various industries such as manufacturing, health care, and transport to optimize their processes. 

This article takes you through this system and provides an overview of various aspects such as the importance, features, and architecture of Teradata. It also explains how Teradata works and highlights its real-life applications. 

### Introduction
Teradata is an open RDBMS (relational database management system) that runs on operating systems such as Windows, Unix, and Linux. Teradata supports huge data warehouse applications. Teradata database consists of broad options for deployment. This system can support various users from multiple client platforms (concurrently). The application of Teradata exists on a parallel architecture. 

It supports strategic intelligence, which provides queries, intelligence tools, and utilities for strategic decision making. For example, users can use Teradata to generate complex reports such as business trends. These reports can be used to make useful future predictions, which improves decision making in an organization. Teradata offers operational intelligence tools that enhance front-line or operational decision making.

### Why You Should Use Teradata

* It can support a huge volume of data (more than 50 petabytes).
* It can be integrated with various business intelligence (BI) tools.
* It consists of many deployment options that can be used to fetch the same data.
* Users can perform complex analytics because it supports OLAP (online analytical processing).
* The application consists of diverse queries that offer flexibility to users.
* Teradata provides a suite of services (full) relating to data warehousing. 

### Features of Teradata 
Teradata database has the following features.

* **Structured Query Language (SQL):** Teradata provides an extension for SQL, which interacts with data.
* **Linear scalability:** The system of Teradata can be scaled up linearly to increase the number of nodes. An increased number of nodes improves system performance. 
* **Unlimited Parallelism:** This feature enables huge tasks to be divided into smaller tasks. These tasks can be run in a parallel manner. 
* **Automatic distribution:** The distribution of data in the disks does not require manual intervention (It is automatic).
* **Mature Optimizer:** Teradata has an advanced optimizer that can support many joins in one query. 
* **Total cost of ownership (TCO):** It provides a low TCO. This is because of the easy setup, administration, and maintenance. 
* **Robust Utilities:** It consists of robust utilities such as Multiload, FastExport, TPT, and FastLoad. These utilities enable users to import or export data (from or to the Teradata system).
* **Connectivity:** Teradata system allows connectivity with other systems such as mainframes and network-attached systems. 
* **Load and Unload utilities:** It consists of load utilities that can carry data into the Teradata system. It also consists of unload utilities that carry data out of the system. 
* **Shared nothing architecture:** This database consists of a shared-nothing architecture where disks, Teradata nodes, and AMPs (Access Module Processors) are independent. This does not allow the sharing of resources, which optimizes performance in a given task.
  
### Architecture of Teradata
The following diagram shows the architecture of Teradata.

![Teradata Architecture](/engineering-education/an-overview-of-teradata-rdbms/teradata-architecture.png)

[Image Source: EDUCBA](https://cdn.educba.com/academy/wp-content/uploads/2020/04/Components-of-Teradata-Architecture.png)

The architecture of Teradata is based on MPP (massively parallel processing). It can be divided into two main parts: storage architecture and retrieval architecture. The entire architecture comprises four parts: passing engine, AMPs, BYNET, and disks. The first two components form the storage architecture while the last two form the retrieval architecture. 

#### Storage Architecture
This architecture is used when the client makes a storage query. The following diagram shows the storage architecture of Teradata.

![Storage Architecture](/engineering-education/an-overview-of-teradata-rdbms/storage-architecture.png)

[Image Source: JavatPoint](https://static.javatpoint.com/tutorial/teradata/images/teradata-architecture2.png)

##### Parsing engine
The following are the specific roles of a parsing engine in the storage architecture:

* It receives the queries (SQL) made by clients. 
* It checks the queries to establish whether there are syntax errors.
* It checks the existence of objects utilized in SQL. 
* It formulates the execution plans for these queries. It then sends them to BYNET.
* It collects the results of the SQL query from the AMPs and passes them to the client.  
  
##### Access Module Processor (AMP)
This is a virtual processor that is connected to BYNET. Every AMP consists of a specific disk that allows it to read and write. An AMP performs the following tasks.

* It works on a section of a table.
* It checks records made on disks.
* It performs functions relating to the generation of the final result. These include aggregation, joining, and sorting. 
* It conducts space and lock management. 
  
#### Retrieval Architecture
This architecture is used when a client makes a retrieval query. The diagram below shows the retrieval architecture of Teradata.

![Retrieval Architecture](/engineering-education/an-overview-of-teradata-rdbms/retrieval-architecture.png)

[Image Source: JavatPoint](https://static.javatpoint.com/tutorial/teradata/images/teradata-architecture3.png)

##### BYNET
This component links the parsing engine to the Access Module Processor. It is a message passing layer. BYNETS exist in two main forms: BYNET 0 and BYNET 1. If one of the BYNETS fails to function well, the other one can replace it. Both forms can be employed if the amount of data used is very huge.

##### Disk
This is a storage area for AMPs. They are termed as Vdisks or Virtual disks. 

### How Teradata Works
Teradata works through the four aforementioned components. The operation of the system depends on the type of query made by the client. If the client wants to insert records, the storage architecture will be used. In this case, the parsing engine will receive the storage query (insert records) for processing. 

The parsing engine consists of four main elements that work systematically on the query: the parser, session handler, optimizer, and dispatcher. The systematic process in the parsing engine can be described as follows.

* **Parser:** This evaluates the syntax and passes the query to the next element (system handler).
* **System handler:** This evaluates whether the user has the right logging credentials to execute the query. 
* **Optimizer:** This establishes the optimum plan for executing the SQL query.
* **Dispatcher:** This passes the query to the Access Module Processor. 
  
The table rows are distributed on all the available AMPs. The AMPs lock the table and execute the plan made by the parsing engine. When the execution is done, the AMPs will complete the transaction and store records on their specific disks.  

If the client wants to retrieve data, the retrieval architecture will be used. The related query will be sent to the parsing engine. The parsing engine generates a request and sends it to BYNET. BYNET will then forward the request to the AMPs. The AMPs will perform a parallel search and locate the desired records. These will be forwarded to the parsing engine via BYNET. The parsing engine will then forward the records to the client. 

### Applications of Teradata 
The following are some of the industries in which Teradata is used.

#### Finance
Teradata enables financial companies to improve customer experience through the data-led decision making and personalized services. It also enables organizations to prepare quality financial reports. 

#### Manufacturing
Teradata supports manufacturing analytics, which helps in generating resourceful insights for innovation and growth. The insights generated from various data sources help manufacturing companies to reduce costs, improve supply efficiency, and optimize processes. 

#### Health Care
This system offers healthcare analytics solutions to various healthcare providers. These solutions help them to collect accurate data from patients, which improves the quality of healthcare service. Teradata enables health providers to integrate data from various sources to develop meaningful insights that eliminate various health-related challenges. 

#### Retail
The retail industry is experiencing immense transformation because of increased competition, changing demand patterns, and the pressure to increase profit margins. Teradata provides retail companies with retail analytics that enable them to optimize demand forecasting and their customer experience. This system enables these companies to use a data-driven approach in solving various business problems. 

#### Transport
Teradata is used by various transport operators to capture and organize data relating to their customers, business operations, logistics, and business strategies. Teradata helps these operators to use a data-driven approach in the optimization of crew planning, marketing, and distribution. 

### Conclusion
Teradata is an effective database system that enables businesses to use data to improve their processes and outcomes. Many organizations choose this system because it is scalable and can support huge volumes of data. The system consists of exciting features that add value in terms of the low cost of ownership, high performance, and parallel processing. 

Teradata is used in various industries such as healthcare, finance, manufacturing, retail, and transport. Digital transformation is changing the way data is managed. In the future, Teradata will consist of diverse tools that will be used in a wide variety of sectors. 

### Resources

[Techopedia]( https://www.techopedia.com/definition/25987/teradata#:~:text=Teradata%20is%20a%20fully%20scalable%20relational%20database%20management,widely%20used%20to%20manage%20large%20data%20warehousing%20operations.)

[Teradata]( https://www.teradata.com/About-Us)

[Slide Share](https://www.slideshare.net/bigclasses/introduction-to-teradata-how-teradata-works)





