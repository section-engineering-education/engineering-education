---
layout: engineering-education
status: publish
published: true
slug: choosing-between-firebase-and-mongo-db
title: Choosing Between Firebase and MongoDB
description: Respective history and pros and cons of using Firebase or MongoDB in a tech stack.
date: 2020-11-09T00:00:00-07:00
topics: [databases][mongodb][firebase]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/choosing-between-firebase-and-mongo-db/hero.jpg
    alt: Relational Databases
---

### MongoDB vs Firebase
Databases play an important role in determining the functionality and quality of an application or a website. For an app to be successful,
the developer will have to consider the users of the application or the website.
The quantity of data stored and retrieved from the application is one of the factors considered when choosing a database.
Other factors considered when choosing the right database for an application or a website are:
1. Latency.
Latency refers to the response time of the database and to the end-to-end response time of the application. 
2.structure of the data. Choosing the right database for an application or a website involves the developer understanding the right data structures for storage and retrieval of data. Various applications deal with data of various formats In this article, I am going to focus on Firebase and MongoDB while highlighting its differences.
### History of MongoDB
10gen company which is now MongoDB Inc developed MongoDB in the year 2007. The 10gen main language was server-side JavaScript.10gen company started to develop as a Platform as a service ( PAAS) product, but they experienced scalability issues with the existing relational database systems. They developed a document-oriented database system called MongoDB.
### Introduction to MongoDB
MongoDB is an open-source document-oriented database that stores data in JSON-like formats. MongoDB makes use of documents and collections instead of using tables and rows. It supports the dynamic schema design. MongoDB is a document-oriented server developed in a C++ programming language.
### Features of MongoDB
1. Native Replication.
MongoDB provides a replication feature by distributing data across different machines through a replica set topology.According to [Congruent Solutions](https://www.congruentsolutions.com/blogposts/mongodb-replication-approach-setup-using-arbiter/),A replica set is a group of MongoDB instances that host the same data set.In a replica set one node is primary node that receives all write operations and all other nodes acts as secondaries. Replica set can have only one primary node.After each successive writes to the primary node, MongoDB will replicate the same data to all the secondary nodes present in the replica set.
2. Supports Ad-hoc Queries.
MongoDB supports ad-hoc queries by indexing the Binary JSON ( BSON) documents.
3. It is schemaless.
MongoDB is considered flexible since its database is written in the C++ programming language.
4. High Performance.
MongoDB's performance is high as compared to other databases due to its scalability, and it has a faster query response because of replication and indexing thus making it a better choice for real-time applications.
5. Indexing.
MongoDB indexes improve search performance.
### Advantages of MongoDB
1. It contains heterogeneous data.
2. It provides high performance, scalability, and availability.
3. It can be integrated with Big Data Hadoop.
4. MongoDB's documentation has an extensive collection of literature and MongoDB tutorials for new users.
5. MongoDB has high data security since there is no risk of SQL injection.
### Disadvantages of MongoDB
1. There is high data consumption because of denormalization.
2. It has no joins. We need to make many queries and join data.
3. MongoDB has a limited data size.
4. Indexing and searching in MongoDB is not powerful.
### History of Firebase
Firebase is a cloud service provider and backend as a service company based in San Francisco, California, founded in September 2011 by James Tamplin and Andrew Lee as Envolve. It provided developers with an Application Programming Interface(API) that enabled the integration of online chat functionality into their website. It provided developers with an Application Programming Interface(API) that enabled the integration of online chat functionality into their website.
### What is firebase
According to [Cypress](https://www.cypressoft.com/post/choose-firebase-over-backend-development/),Firebase is a toolkit and infrastructure that aims at supporting the process of building better applications and websites.
Firebase is a Back-end as a service owned by Google which provides a server-less backend to app and web developers. Firebase offers a wide range of backend functionalities which include authentication,real-time database, storage, analytics, crash reporting, and dynamic links.
### Features of Firebase
1. Real-Time Database
2. Hosting
3. Authentication
Firebase comes with a built-in authentication module. It supports Facebook, Gmail, Twitter, and password login support.
4. Firebase Storage
5. Firebase Analytics
### Advantages of Firebase
1. It is free.
Developers can create as more than one project in Firebase for free. Developers don't need to buy a premium license to use Firebase.
2. Concise Documentation
Firebase SDK is documented and has plenty of examples over its website.
3. Improved Database
Firebase is an improved database since it provides better performance by storing large chunks of data in JSON format.
4. It is fast.
Applications and websites developed using Firebase are faster because its cloud services lead to faster fetching and displaying of data on the screens.
### Disadvantages of using Firebase
1. Hosted solution
Firebase is a hosted solution so the user doesn't have any root access to the location where the data is stored.
2. Costs
Firebase free plan limits up to 50 connections and 1,000 Megabytes of storage.
3. Data Migration Problem.
Firebase stores its data in JSON format so managing large amounts of structured data need the developer to write powerful queries in SQL.
4. Inconvenient Data Storage
Firebase cannot handle complex query structures. It limits the developer to combine query options. Because of this limitation, one needs to arrange the documents by date or filter them using a search query.
5. No staging environment.
Firebase does not allow the developer to test the database in a staging environment.
### Differences betweeen MongoDB and Firebase
According to [GeeksforGeeks](https://www.geeksforgeeks.org/difference-between-firebase-and-mongodb/), the main differences between MongoDB  and Firebase are:
|MongoDB|Firebase|
|---|---|
|MongoDB Inc developed MongoDB.| Google developed Firebase|
|MongoDB supports C, C#, Java, JavaScript, PHP, Lau, Python, R, Ruby as programming languages. | Firebase supports  Objective C, Java and JavaScript as programming languages.|
|MongoDB is a Platform-as-a-Service solution.| Firebase is a Backend-as-a-Service solution.|
|MongoDB is suitable for large-scale applications.| Firebase is suitable for small-scale applications.|
|MongoDB is an open-source database. | Firebase is an open-source database.|
|Proprietary protocol using JSON are used as APIs and other access methods.|Android, iOS, JavaScript API, RESTful HTTP API are used as APIs and other access methods.|
|Server operating systems for MongoDB are Solaris, Linux, OS X, Windows. | Server operating systems for Firebase are hosted.|
### Conclusion
Every database has its unique features, and it is designed to provide solutions for different problems. The choice of each database depends on its benefits and drawbacks, and also the business requirements. Both MongoDB and Firebase have their pros and cons. After all the advantages, and disadvantages, comparisons and the description, the developer will have to choose which database they can integrate into their application or website.
