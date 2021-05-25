---
layout: engineering-education
status: publish
published: true
url: /aggregation-in-dbms/
title: Aggregation in Database Management Systems (DBMS)
description: This article will be an introduction to Database Management Systems and how systems function properly through the concept of aggregation. It also explains why aggregation is needed and how it functions. 
author: onesmus-mbaabu
date: 2021-01-08T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/aggregation-in-dbms/hero.jpg
    alt: DBMS Database Management Systems Image
---
Database management systems (DBMS) have replaced the traditional filing system by providing an easy, secure, efficient, and reliable way of storing, retrieving, accessing, and sharing data within databases. 
<!--more-->

DBMS is advantageous over the file system because it reduces [data redundancy](https://en.wikipedia.org/wiki/Data_redundancy) (through [database normalization](https://en.wikipedia.org/wiki/Database_normalization)) and enhances [data integrity](https://en.wikipedia.org/wiki/Data_integrity). It also offers flexibility, privacy, and data security.

A DBMS consists of entities whose data can be stored. They can be people, things, objects, or places. Two or more entities are joined through a relationship, that is simply a way of connecting data sets. Some entities in a DBMS may have little value, which makes it difficult to use them for certain operations. 

In such situations, we can combine these entities with other entities to form a complex one that makes sense. We can do this operation through a process called aggregation. Aggregation in DBMS links trivial entities through relationships to ensure that the entire system functions well.

This article takes you through important aspects regarding aggregation in DBMS. It also explains why it is needed and how it takes place. 

### Table of contents
- [Introduction to Database Management Systems (DBMS)](#introduction-to-database-management-systems-dbms)

- [Aggregation in DBMS](#aggregation-in-dbms)

- [Reasons for Using Aggregation in DBMS](#reasons-for-using-aggregation-in-dbms)

- [Process Flow for Aggregation in DBMS](#process-flow-for-aggregation-in-dbms)

- [Example of Aggregation in DBMS](#example-of-aggregation-in-dbms)

- [Conclusion](#conclusion)

### Introduction to Database Management Systems (DBMS)
Before learning what DBMS is, we need to understand two important terms: data and database. Data refers to facts, figures or statistics gathered for various uses, including analysis or future reference. A database refers to a collection of organized or related data. 

A good example of a database is a collection of cities within a country. This is regarded as a database because all the data in that collection is related. 

A Database Management System (DBMS) is a software package that is used for managing databases. A DBMS facilitates operations such as accessing, updating, administering, fetching, manipulating, creating and deleting the database system. It also enables users to share data with other applications or users. 

The main aim of this software is to enhance the storage and retrieval of data. Some of the examples of database management systems include MySQL, Oracle, SQLite, MS Access, and MariaDB. 

The following are the main characteristics of DBMS:
- **Access:** DBMS enables multiple users to gain access to the same data. 
- **Sharing:** It enables users to share data with other applications and users. 
- **Security:** Data sharing is done in the form of data encryptions, which ensure that there is no security threat. 
- **Back up:** DBMS has a backup and recovery feature that enables it to restore the consistent state in the event of a system crash. 
- **Data independence:** Any changes to the data do not affect the application.
- **Restricted Access:** A DBMS consists of defined roles, which enhances restricted access for specific data. This boosts the level of data security within the system. 

### Aggregation in DBMS
Aggregation refers to the process by which entities are combined to form a single meaningful entity. The specific entities are combined because they do not make sense on their own. To establish a single entity, aggregation creates a relationship that combines these entities. The resulting entity makes sense because it enables the system to function well. 

When using data in the form of numerical values, the following operations can be used to perform DBMS aggregation:
- **Average (AVG):** This function provides the mean or average of the data values. 
- **Sum:** This provides a total value after the data values have been added. 
- **Count:** This provides the number of records.
- **Maximum (Max):** This function provides the maximum value of a given set of data.
- **Minimum (Min):** This provides the minimum value of a given set of data. 
- **Standard deviation (std dev):** This provides the dispersion or variation of the sets of data. Let's take a simple example of a database of student marks. If the standard deviation is high, it means the average is obtained by lower number of students than usual, and the lowest and highest marks are higher.

### Reasons for using aggregation in DBMS
Aggregation is used when the DBMS has the following characteristics.

- **Many trivial entities:** A DBMS may consist of many entities that are not significant enough to provide meaningful information. In such a case, the trivial entities can be combined into one complex entity through aggregation. For example, many trivial entities called *rooms* can be combined to form a single entity called *hotel*.
- **One trivial entity:** Aggregation is also needed if a DBMS has a single trivial entity that should be used for multiple operations. In this case, the trivial entity is used to form relationships with other entities. This may lead to many aggregation entities depending on the operations required. For example, an employee in an organization may be given an insurance policy that covers his dependants. The entity *dependants* is a trivial entity because it cannot exist without the entity *employee*. 
- **Inapplicable entity-model relationship:** The entity-model relationship cannot be applied to certain entities within the system. These specific entities can be combined with other entities to allow the application of the entity-model relationship in the entire system. This ensures that all the entities in the system are utilized. For example, the entity-model relationship for students can only be applied if students enroll in a class. The entity *grade* can only be formed if the relationship *enroll* exists.

### Process flow for aggregation in DBMS
Aggregation in DBMS can be explained using [the entity-relationship model (ER model)](https://www.tutorialspoint.com/dbms/er_model_basic_concepts.htm). This is a conceptual diagram that represents the structure of a database and its components. It contains the relationships, attributes, and entities in a DBMS. This is similar to the columns, rows, and tables in a database. 

The following are the main types of relationships in an ER model:
- **One-to-one:** Here, the trivial entity forms a relationship with only one other entity. For example, one employee can work in only one department of an organization. 
- **One-to-many:** In this relationship, one entity forms a relationship with multiple entities. For example, an employee can work in multiple departments within the same organization.
- **Many-to-one:** Here, multiple entities in a certain entity set can form a relationship with only one entity. For example, many employees can work in only one department. 
- **Many-to-many:** In this category, multiple entities from a certain entity set, that can form a relationship with many entities from another entity set. For example, many employees can work in multiple departments within the same organization.
  
The following diagram shows a simple ER model that can be used to explain the process flow for aggregation in DBMS.

![Process Flow for Aggregation in DBMS](/engineering-education/aggregation-in-dbms/process-flow-for-aggregation.jpg)

[Image Source: EDUCBA](https://cdn.educba.com/academy/wp-content/uploads/2020/03/aggregation-in-dbms.jpg)

In this ER model, A, B, and C represent entities. A and B should be combined into a single complex entity. R1 is the relationship that is formed after A and B are linked. R1 needs to form a relationship with other entities for other DBMS operations to be successful. 

This operation generates a new relationship (R2). R2 is linked to another entity C to enhance its functionality. This entity is also formed through aggregation. 

### Example of aggregation in DBMS
Let's assume that there is a patient who has visited a doctor in the hospital to seek treatment for a certain type of illness. The following diagram shows the process flow for aggregation in the hospital. 

![Example of Aggregation](/engineering-education/aggregation-in-dbms/example-of-aggregation.jpg)

[Image Source: EDUCBA](https://cdn.educba.com/academy/wp-content/uploads/2020/03/aggregation-in-dbms0.jpg)

We will follow the simple ER model described above. In the diagram above, there are three entities: patient history, the doctor, and the patient. Filing and diagnosis represent relationships. The doctor performs a diagnosis on the patient. 

The database stores data regarding this diagnosis and any other patient data. Filing is required to make it easier for the doctor to retrieve the patient's information in the future. 

In this example, the patient cannot work on his own. He has to form a relationship with the doctor to get a diagnosis. The doctor also cannot perform a diagnosis without the patient. In the future, the doctor will need data about the patient's history, that will require him to collect it from a filing system. 

The last entity (patient's history) ensures that the entire system is functional. Getting the patient's history cannot be done without a diagnosis from the doctor and a filing system. 

### Conclusion
Aggregation in database management systems helps at ensuring that all entities are utilized within the system. Without this operation, the trivial entities may become inoperative. Multiple aggregations within a DBMS ensures that the entire system is fully functional. Advanced database technologies will improve the efficiency and reliability of DBMS aggregation in the future.   

### Resources
- [Tutorials Point](https://www.tutorialspoint.com/dbms/er_model_basic_concepts.htm)

- [Javat Point](https://www.javatpoint.com/dbms-aggregation)

- [Study Tonight](https://www.studytonight.com/dbms/generalization-and-specialization.php)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)