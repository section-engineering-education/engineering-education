---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-database-testing/
title: An Overview of Database Testing
description: This article will be an overview of the fundamentals of database testing. It would also explore the various types of database testing and the tools used.
author: onesmus-mbaabu
date: 2021-02-06T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-database-testing/hero.jpg
    alt: Database Testing image
---
A database is a crucial element in software applications because it enables users to store and retrieve data. Nowadays, complex applications that require huge data have increased the need for more secure and robust databases.
<!--more-->
These databases need to be tested to ensure that the huge data stored in them is handled seamlessly. Database testing is important because it verifies the quality, accuracy, and security of data in databases. It establishes whether there are errors in the database systems to enhance the consistency, performance, and reliability of these systems. 

In this article, we look at the fundamental aspects of database testing. These include the definition of database testing, its importance, and types of database testing. This article will also provide an overview of the main stages of database testing and popular testing tools.

### What is database testing?
Understanding the concept of database testing requires the knowledge of the terms 'data' and 'databases'. Data is a term used for describing facts, information, or statistics collected for various purposes. A database is a collection of data that is organized and stored for access (usually using a computer system). Some of the examples of databases include MySQL, Oracle, dBASE, and FileMaker. 

Database testing is the process of validating data that exists in a database by substantiating the elements that affect the data and other related functionalities. It can also be referred to as back-end testing. Some of the tests conducted during database testing include data validity checks, data integrity tests, tests for procedures, triggers, performance checks, and database functions.

This validation process is used in an [online analytical processing (OLAP)](https://en.wikipedia.org/wiki/Online_analytical_processing) system. OLAP is a system used for data modeling and multidimensional data analysis. Some of the tools that can be used for database testing include Selenium and QuickTest Professional (QTP). 

Let’s consider a database that stores the daily transactions of users in a retail store. In this case, database testing can be done to check whether:
- All the information relating to a transaction is in the database. 
- Accurate transaction information is provided to the user.
- Only complete transactions have been stored in the database. The application should abort all incomplete transactions.
- There is any unapproved access to the database and the data stored in it. 
- Some or all the information loaded to the database is lost.

### Why database testing is important
Database testing is important because it enables users to validate data mapping, data integrity, ACID (atomicity, consistency, isolation, and durability) properties, and business rules conformity. 

These aspects can be explained as follows:
- **Data Mapping:** In database systems, data travels from the user interface (front-end) to the database (back-end). This movement can also be in the opposite direction. Database testing verifies whether data appearing in a table at the user interface is mapped well in the database (at a corresponding table).
- **Data Integrity:** Data integrity tests involve an evaluation of the operations, methods, and processes used for managing, updating, and accessing the database. These operations are commonly known as CRUD (create, retrieve, update, and delete).
- **ACID properties:** Database testing ensures that ACID properties are validated as well. 
These properties can be described as follows:
    - **Atomicity:** The transaction can generate two main types of results: pass or fail.
    - **Consistency:** This indicates that the validity of the database will remain once the transaction is finalized.
    - **Isolation:** Various transactions can be done without affecting each other. 
    - **Durability:** Any changes regarding a transaction will be saved without adverse effects from external factors (eg. loss of power). 
- **Business Rule:** Database testing helps in testing whether the database conforms to business rules. Testers use SQL queries to validate components such as triggers, procedures, and relational constraints. 
  
### Types of database testing
Database testing consists of three main types: structural, functional, and non-functional testing. 

![Types of Database Testing](/engineering-education/an-overview-of-database-testing/types-of-database-testing.jpg)

[Image Source: Wisdom Jobs](https://www.wisdomjobs.com/userfiles/testingtypes.PNG)

#### Structural testing
This type of testing involves data repository elements and storage components that cannot be changed by users. 

It consists of the following tests:
- **Schema/Mapping testing:** This test verifies whether data objects on the user interface are correctly mapped in the database (back-end). It points out objects that have not been mapped. 
- **Stored procedures test:** This test validates stored procedures and establishes whether error handling is done well. It also establishes whether the stored procedures generate the required or expected triggers. 
- **Tables and column testing:** This test establishes whether the database fields in the database (back-end) is compatible with the user interface of the application. 
- **Trigger testing:** This test helps in checking whether the execution of triggers conforms to the required action. It validates various operations such as insert, upload, and delete. 
- **Server check:** The database server is checked to perform user verification and to verify the ability of the server to handle the desired number of transactions. 
  
#### Functional testing
Functional testing is done to verify whether transactions and processes done by users conform to business specifications. This type of testing can be divided into two: black box testing and white box testing.
- **Black box testing:** This test involves testing functionalities by evaluating database integration. The database functionality is tested using various techniques such as equivalence partitioning, cause-effect graphing, and boundary-value technique. 
- **White box testing:** This test involves verifying logical views and database triggers. It conducts the module testing of SQL queries and database functions. It validates data models, schema, and tables. Some of the techniques used for this type of testing include statement coverage and condition coverage. 

#### Non-functional testing
Non-functional testing involves performing various tests that establish risks and enhance optimized database performance. Load testing and stress testing are the main types of testing in this category.
- **Load testing:** This test verifies the performance of running transactions. It verifies the time taken for the transactions to be executed. 
- **Stress testing:** This test can also be referred to as fatigue testing. It is used to establish the breakpoint of the system. This is a point where the database system fails or cannot handle a certain number of users concurrently. WinRunner and LoadRunner are common examples of tools used for stress testing. 
  
### Stages of database testing
The following are the main stages of database testing.
- **Set up fixture:** This step involves evaluating the initial state of the system and setting test fixtures. A test fixture describes an environment for testing data objects. Data can be inserted into the database to enhance testing.
- **Performing tests:** In this stage, defined test cases are run to meet specific testing objectives. 
- **Outcome verification:** This stage involves verifying the outcome of the tests performed in the second stage. The outcome is compared with the expected results. 
- **Tear down:** This stage involves either continuing with testing or terminating it. If the expected outcome in the third stage is achieved, the test will be terminated. If the expected outcome is not attained, testing will be repeated. 
   
### Popular database testing tools
The following is a description of the various tools for database testing and their examples. 
- **Load testing tools:** These tools check whether the database system capability conforms to your business needs. Examples include Mercury and Rad View.
- **Data security tools:** These tools impose standards that enhance data security. Examples include IBM Optim Data Security and Protegrity Data Security. 
- **Test data management tools:** These tools check the software quality of the related database by comparing actual outcomes with expected outcomes. Examples include IBM Optim Test Data Management and Informatica.
- **Test data generator tools:** The test data is generated using these tools. These tools are ideal when you have a huge volume of data and a sample of the data is required for database testing. Examples of these tools include DataProf and Turbo Data. 
- **Unit testing tools:** These tools test whether each element of a database object works as required. Examples include SQLUnit, DBfit, and DBUnit. 
  
### Conclusion
Database testing is an important process that helps when validating data and checking the functionality of databases. This process consists of various validations such as data mapping, business rules conformity, data integrity, and ACID properties. Structural, functional, and non-functional testing are the main types of database testing. 

Databases should be tested to ensure the key database operations are functioning optimally. This will minimize the risk of a system crash. Database testing is an effective way of enhancing the quality and durability of databases. Organizations should choose reliable database testing tools that align with their business goals. 

### Resources 
[Reference](https://www.reference.com/world-view/databases-important-f0fe51a39eb47be0)

[360 Logica](https://www.360logica.com/blog/what-is-database-testing/)

[Tutorials Point](https://www.tutorialspoint.com/database_testing/database_testing_scenarios.htm)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)