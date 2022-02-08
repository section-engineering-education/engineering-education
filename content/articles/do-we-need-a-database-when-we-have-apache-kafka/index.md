---
layout: engineering-education
status: publish
published: true
url: /do-we-need-a-database-when-we-have-apache-kafka/
title: Do We Need a Database When We Have Apache Kafka?
description: In this tutorial, we will get an overview of Apache Kafka and databases. We will compare the two in terms of handling transactions, data processing, and storage.
author: jayden-kiprotich
date: 2022-02-08T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/do-we-need-a-database-when-we-have-apache-kafka/hero.jpg
    alt: Apache Kafka image alt
---
Apache Kafka is more than just a better message broker. The framework implementation has features that give it database capabilities. It's now replacing the relational databases as the definitive record for events in businesses.
<!--more-->
It gives the impression of turning the database inside out because you do not need to read and write a traditional database. Instead, you append events to Apache Kafka and read from downstream views.

It is possible to implement the architecture that supports reading and writing in Apache Kafka. But doing so would mean dealing with the challenges experienced in database management systems.

You are likely to undertake the process of writing a full-fledged database management system in your application. You will deal with the challenges of write skew, dirty reads, and the symptoms of a hastily created database.

This article provides an overview of Apache Kafka and databases and compares how the two handle transactions, data querying, processing, and storage. It also explains the ACID guarantees in both Kafka and databases.

### An overview of Apache Kafka and databases
[Apache Kafka](https://kafka.apache.org/) is not just a publisher/subscriber messaging system that sends data from one point to another. It's an event streaming platform. Associating databases with messaging solutions such as Kafka is a bit skewed. But Kafka has database-like features that make it primed to replace databases.

Kafka concepts like partitions, replication, guaranteed messaging order, and distributed commit logs make it fit into the Atomicity, Consistency, Isolation, Durability ([ACID](/engineering-education/ensuring-acid-compliance-in-database-transactions/)) transaction properties of a database.

On that basis, one can regard Apache Kafka as a type of hybrid database that provides ACID guarantees. But at the same time, it's not a replacement of databases but rather a complementary tool.

A simple definition of a database is an organized collection of data that is electronically accessible on a computer system.

Database management systems have similar functions as Kafka but differ in some approaches to data storage. Notably, they organize data in relational layers. Even so, both arrange their data in rows and columns in a series of tables.

Essentially, Kafka and databases share several features and functions, but Kafka differentiates itself as an event streaming platform.

### Data storage in Kafka
Kafka's data storage is a little different from how a database functions.

Because of its streaming services, users consume data on this platform using tail reads. It does not rely much on disk reads as a database would because it wants to leverage the page cache to serve the data. Only older data is likely to have disk storage at any given time.

Kafka has a two-tiered storage approach constituting local and remote storage. The local tier still relies on local disks to store log segments, but the new remote tier system uses Hadoop Distributed File System or S3 database to store completed log segments.

When the remote tier is active, the local tier experiences reduced retention ranging from days to a few hours. But the retention for the remote tier is usually much longer. It can take weeks to months.

It's possible to scale Apache Kafka's storage independent of memory and CPU, making this platform a long-term storage solution. In that regard, it beats the databases because they are less scalable than Kafka. Thus, there is less need to store much data locally on Kafka brokers.

Like in a database, it is also possible to [partition data](https://kafka.apache.org/081/documentation.html) in Apache Kafka.

In a database, you can divide the storage into sections that constitute data, indexes, transaction logs, and configuration files. Each partition contains specific data.

In Kafka, the system organizes data into topics. Following partitioning, a topic can take more than one partition. Partitioning is vital to Kafka because it facilitates scalability and allows client apps to read data from different brokers.

These partitions are also crucial in enhancing elasticity and fault tolerance.

### Queries and processing in Kafka
Kafka and databases differ in querying and processing.

Kafka has local and remote components used to the state of your application interactively. An app can query a locally managed portion of the state and its local state stores. This querying is read-only to protect the underlying state stores from record tampering.

Using the remote state to query the condition of your application entails connecting query local state stores, [discovering](https://kafka.apache.org/10/documentation/streams/developer-guide/interactive-queries.html) all running instances of your app in the network, and communicating these instances over the network.

Kafka utilizes interactive queries to facilitate stream processing. It allows you to directly query the state of your stream processing app without having to wait for linkage between state and external databases. Thus, this feature guarantees the convergence of processing with storage, making app usage easy.

The concept of interactive queries first began with the databases. However, the implementation of the feature is unsuitable for modern apps. These queries require you to write an entire code in SQL and then deploy it into the server.

The process is complex and has a high likelihood of errors. Kafka bypassed this challenge when designing stream processing. It simplified processing by keeping the overall architecture simple.

A database uses query processing to extract data. But unlike Apache Kafka, interactive querying here is minimal if not absent currently. That is one of the reasons that Kafka remains a more modernized version of databases.

Query processing in a database takes four major steps. It begins with parsing and translation. When a user enters a query, it undergoes translation to a high-level database language such as Structured Query Language (SQL).

The next step is optimization.

In Optimization, the database system modifies the user's query to generate an efficient evaluation plan that minimizes cost. After optimization, evaluation begins, and it entails using relational algebra expressions to evaluate an operation.

Finally, the query execution engine generates the output from the given query and subjects it to processing. Processing in a database includes transforming data into a useful output. The output takes the form of reports and documents.

In a database, the output obtained from processing is simpler.

### Transactions in Kafka
The handling of Apache Kafka transactions occurs on the producer's side instead of the consumer's side. The consumer reads while the producer takes up the role of coordinating the transaction.

This approach reduces the performance overload of the consumer but at the cost of the producer. On a distributed database system, the message broker/producer manages the transactions by default. Such transactions are known as [broker-coordinated](https://www.ibm.com/docs/en/integration-bus/9.0.0?topic=behavior-message-flow-transactions) transactions.

Kafka and database transactions share similarities because they possess the ACID capability. They guarantee atomicity, consistency, isolation, and durability.

Atomicity refers to all the elements that constitute a complete database transaction. Consistency refers to the rules that maintain data points in a correct state following a transaction.

Isolation separates the effect of a transaction from others until it commits, and durability ensures that data changes become permanent after they are committed.

### Kafka and ACID guarantees
Kafka, like databases, guarantees ACID. Its transactional systems implement atomicity, consistency, isolation, and durability.

A transaction behaves like a single unit that can either succeed or completely fail. Observers can see all the effects of a transaction at the same moment. Also, once the system commits a given transaction, it remains in that state even in cases of downtimes.

How does Kafka meet the ACID guarantees? It guarantees durability by retaining records in several copies across replicated partitions in a disk-based file system. It may back those records to a remote location to prevent loss in case of a disaster.

Apache guarantees atomicity by writing records to an immutable log in an all-or-nothing manner. So, cache and search indices remain independent of each other in the log.

Kafka achieves isolation by building transaction logic into a stream processor to prevent the transactions from interfering with the concatenation of other records.

Apache fulfills the consistency guarantee by ensuring at-least-once delivery. This concept means that all messages from the producer will reach the intended target at least once or more.

Even so, it is notable that Kafka faces the potential challenge of a failure that can break ACID compliance. For instance, in the case of an under-replicated partition accompanied by an unforeseen power shortage, data loss would be inevitable. Such a transaction will lose its integrity.

### Conclusion
A database is an organized collection of data that is electronically accessible on a computer system. Data collection remains significant to businesses. Most databases rely on conventional approaches to grant data access, which does not befit current big data firms like social media platforms.

Kafka has been the solution to the challenges that came with using databases. It is a streaming service platform that offers database-like functions. Modern firms are now favoring this system because of its superior capabilities. It is more of a hybrid database system.

To summarize, Apache Kafka can do the following:
- Offers similar capabilities as databases, such as:
	- Data storage and retrieval.
    - ACID guarantees.
    - Partitioning
- Stores data for a long time in a durable manner.
- It is more fault-tolerant than databases.
- Unlike databases, it is possible to scale Kafka’s storage independent of memory and CPU. Thus, it is a long-term storage solution due to its higher flexibility than databases.
- Facilitates interactive querying. Databases use conventional querying that requires writing an entire code in SQL before deploying it to the server. This process is hectic and increases the chances of errors.

### Further reading
- [Introduction to Kafka](/engineering-education/introduction-to-kafka/)
- [ACID Compliance in Database Transactions](/engineering-education/ensuring-acid-compliance-in-database-transactions/)
- [Breaking Down Kafka vs. Pulsar](/engineering-education/breaking-down-kafka-vs-pulsar/)
- [Visual Database Design with MySQL Workbench](/engineering-education/visual-database-design-with-mysql-workbench/)
- [Transaction management in a database](/engineering-education/transaction-management-in-database/)

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
