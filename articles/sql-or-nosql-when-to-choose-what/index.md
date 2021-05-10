---
layout: engineering-education
status: publish
published: true
url: /engineering-education/sql-or-nosql-when-to-choose-what/
title: SQL or NoSQL - Which Database is Ideal
description: This article will dive into SQL and NoSQL databases, understand their structures, explore them in-depth, and understand how they work.
author: joseph-chege
date: 2020-10-10T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sql-or-nosql-when-to-choose-what/hero.jpg
    alt: date-fns library JavaScript
---
Knowing which database structure to use is critical in building outstanding applications. SQL or NoSQL? In this article we will dive into these two databases, understand their structures, explore them in-depth, and understand how they work. This guide will give you an overview of which database structure will fit your application model.
<!--more-->
### Table of Contents
- [Table of Contents](#table-of-contents)
- [What is SQL?](#what-is-sql)
- [What is NoSQL?](#what-is-nosql)
- [SQL vs NoSQL (High-Level Differences)](#sql-vs-nosql-high-level-differences)
  - [Relation](#relation)
  - [Schema](#schema)
  - [Scalability](#scalability)
- [SQL vs NoSQL (When to Choose What)](#sql-vs-nosql-when-to-choose-what)
  - [When to use SQL?](#when-to-use-sql)
  - [When to use NoSQL?](#when-to-use-nosql)
- [StackOverflow Database Insights](#stackoverflow-database-insights)
- [Conclusion](#conclusion)

### What is SQL?
SQL is the most popular database structure. SQL (commonly pronounced as 'see quell') stands for the Structured Query Language. SQL is a language used for writing query statements to interact and communicate with relational databases. A relational database is a database that has a tabular **schema** to store data in terms of rows and columns.

Each column contains data called **attributes**, and each row is called a **record**. The data in the tables can be related to each other, hence the 'relational database'. A collection of these multiple tables in a database is called a **schema**. A relation is simply a fancy phrase for a table.
Relations can exit in different ways, such as:

- One to One - exists when a record in table A can only relate to one record of table B.
- One to Many - exists when a record of table A relates to one or more records of table B.
- Many to Many - exists when a record in table A relates to many records of table B and vice versa.

SQL statements will help you perform CRUD operations such as CREATE, READ, UPDATE, and DELETE. These operations will help you retrieve and modify data. Here is an example of a SQL statement;

```sql
SELECT * FROM TABLE1.
```

This statement will query and display all the **records** of Table1. If we were to have a student information database, this is how we would represent a relation in an SQL database.

![SQL database table](/engineering-education/sql-or-nosql-when-to-choose-what/tables.png)

[*Image Source*](http://cdn.ipenywis.com/upload/images/123abd458.png)

*SQL Relation Output*

| ID | first_name | last_name | username | courses                 |
|----|------------|-----------|----------|-------------------------|
| 1  | Alex       | Brooks    | alex09_b | Web Dev, React JS        |
| 2  | Amy        | Jonathan  | amy      | Photoshop, UI/UX Design |

SQL is a simple language that is extremely powerful. You can create multiple databases with multiple tables to store data with foreign key mapping. A foreign key is a field that links two related tables to ensure referential integrity. A table with a foreign key column is called a child table. In the student information database, "SQL Relation Output" is a child table of tables Student and Course.

Each row in an SQL database has specific value characters, such as texts, varchar, and integers.

![Relations](/engineering-education/sql-or-nosql-when-to-choose-what/relations.png)

SQL databases need a server that runs a database management system (DBMS). DBMS is a software interface that connects end-users and databases to manage and manipulate data in a structured way. Some of the common SQL databases include [MySQL](https://www.mysql.com/why-mysql/), [Oracle Database](https://www.oracle.com/database/), [PostgreSQL](https://www.postgresql.org/about/), [Microsoft SQL Server](https://www.microsoft.com/en-gb/sql-server/), and [MariaDB](https://mariadb.org/documentation/).

### What is NoSQL?
It is a non-SQL database structure with a non-relational mechanism for storing and retrieving data. Its data model does not have tabular **schema** as used in relational databases.

You do not need to create tables (no rows or columns). NoSQL databases store and manage data in ways that allow high operational speed and great flexibility. It is used to build real-time web apps and big data to handle large quantities of unstructured and semi-structured data.

They are designed to perform high levels of read and write while scaling horizontally. JSON is a common representation of non-structured data. JSON (JavaScript Object Notation) is a schema-less data presentation format with readable texts for storing and transmitting data between servers and web apps.

Below is a NoSQL example context:

```sql
Database --> Collection(s) --> Objects(s)
```

If we refer back to SQL, the collection would be the table, and the object will be the rows and columns. Just like SQL, where a database has several tables, NoSQL creates multiple collections. In this case, there are no relations between the collections. Rows and columns will be the objects of the NoSQL.

Like SQL, NoSQL has a unique ID that uniquely identifies a specific object within a collection. Nested objects and array are supported where an object can be inside another object. If we were to represent the SQL student information database in NoSQL, this how it would look:

```json
{
"Student": {
        "_id": "Objectld('14s5gg98we9d’)",
        "firstName": "Alex",
        "lastName": "Brooks",
        "username": "alex09_b",
        "Courses": "[{"name": "Web Dev"}, {"name": "React JS"}]"
    }
}
```

Some of the common NoSQL databases include [MongoDB](https://www.mongodb.com/what-is-mongodb), [Apache Cassandra](https://cassandra.apache.org/doc/latest/getting_started/index.html), [Google Cloud BigTable](https://cloud.google.com/bigtable), [Apache HBase](https://hbase.apache.org/), and [Redis](https://redis.io/).

### SQL vs NoSQL (High-Level Differences)

#### Relation
SQL employs a kind of relationship that exists between two or more database tables. As we have explained above, NoSQL is non-relational.

To understand this point, think of two towns. Let's say town A, and town B. Take town A, where the residents understand only one language. They use it to do all sorts of communication and interaction around them day in day out. To change the language of this town will bring a lot of confusion and disruptions among the residents.

Take town B, where the residents speak different languages. Everyone communicates and interacts with the world around them differently. There is no universal way to understand each other. When a new resident is introduced to this town, this new resident's language will affect no one.

Town A represents the relational SQL, and Town B represents the non-relational NoSQL. SQL is powerful and versatile. On the other hand, they are restrictive and structured with a pre-defined schema.

If you choose to use them, your data must use and follow the same structure. As in Town A, changing its structure would be difficult. It will disrupt your whole system. The language of SQL is tabular with rows and columns. You can only follow that structure.

On the other hand, NoSQL, like town B has a dynamic, unstructured schema flexible to any new resident. This data can be:

- Document-oriented
- Column-oriented
- Graph base or
- Key-value store

It is extremely flexible.

- Each document you add has no defined structure.

- Each document has its own distributed structure.

- To add files in a document as you go.

#### Schema
Schema is a blueprint of how data is organized in a database. These two database models have a completely different database schema representation. To understand this further, check out this joke.

![Databases Schema](/engineering-education/sql-or-nosql-when-to-choose-what/database-admins.jpg)

If these admins walked into an SQL bar, they would have definitely found a table to enjoy their drink. This points out that NoSQL has no tabular schema and SQL does.

#### Scalability
Think of a building near your neighborhood. Pretend to be the architect and check the possibility of adding more floors to the existing building to host more rooms. Would you propose adding more floors to the existing building, or would you build a new one? If you will add more floors, what are the chances of this building remaining stable? That the case here.

SQL is scaled vertically. This means that server capacity can be increased by increasing specks such as [CPU](https://en.wikipedia.org/wiki/Central_processing_unit), [RAM](https://en.wikipedia.org/wiki/Random-access_memory), and disk size (more floors will be added to the existing building).

Vertical scaling adds more power to your existing server. Of course, the downside of that is that there will be a limit point on how much power you can stretch on your server. That is one of the restrictions of an SQL database approach that makes scaling difficult.

On the contrary, NoSQL databases are scaled horizontally. You don't need to worry much about RAMs, CPUs, and disk size (create more buildings around your neighborhood). Split the data across multiple servers. NoSQL will help you handle large and constantly changing data.

### SQL vs NoSQL (When to Choose What)
How do you decide which database model to choose? The quickest answer to this question depends on your project. Below are use-cases to consider the database pattern applications.

#### When to use SQL?
- The benefit of SQL is seen when your system needs a structured relational system. SQL thrives in circumstances that need high-quality and well-managed relational database systems.

- Multi-row transactions with complex queries and reporting, such as accounting and budget systems.

- Pre-defined data structure with multi-row transactions that have set **schemas** such as inventory system that have distinct entities. SQL provides perfect nominalizations and simple queries that comply with ACID.

#### ACID represents:
- A: (**Atomicity**) a database process transaction is either wholly executed or not executed at all.
- C: (**Consistency**) only valid data is recorded to the database, and if a transaction was invalid, this database reverts to its former state. The inconsistent transaction is aborted, and an error is created into the error log.
- I: (**Isolation**) a transaction is securely and independently processed without interfering with another transaction.
- D: (**Durability**) if a transaction process is completed successfully, all its changes are stored permanently.

- Data integrity consistency. A SQL database system is designed to handle specific data types, i.e., integer, varchar, text, Boolean, date value, etc.

#### When to use NoSQL?
- When there is a rapid growth of data, especially when dealing with unstructured information. Rapid data growth needs highly flexible data models to scale out the needs of that application.
- When the application model has no defined **schema** or the data requirements, and the schemas are constantly evolving.
- When dealing with IoT technology, NoSQL offers real-time insights for sensor data.
- For real-time transaction pieces of information such as customer behaviors, analytics information, financial markets, and trading activities. NoSQL check and watch real-time information transactions.
- When your application needs fast reads and writes access to big data.

### StackOverflow Database Insights
Let’s look at the 2020 [Annual Developer Survey](https://insights.stackoverflow.com/survey) trends conducted by StackOverflow, involving over 65,000 respondents from over 180 countries. These are the insights the respondents gave regarding the databases they use.

- *[Most Popular](https://insights.stackoverflow.com/survey/2020#technology-databases-all-respondents4) databases*

![Most Popular Databases](/engineering-education/sql-or-nosql-when-to-choose-what/most-popular.png)

[*Image Source*](https://insights.stackoverflow.com/survey/2020#technology-databases-all-respondents4)

Relational MYSQL, MariaDB, and Microsoft SQL Server dominate the list.

- *[Most Popular Databases Among Professionals](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-wanted4) developers*

![Most Popular Databases Among Professionals](/engineering-education/sql-or-nosql-when-to-choose-what/popular-among-professionals.png)

[*Image Source*](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-wanted4)

- *[Most Loved](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-loved4) databases*

![Most Loved Databases](/engineering-education/sql-or-nosql-when-to-choose-what/most-loved.png)

[*Image Source*](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-loved4)

Taking the list of the most loved database technologies, non-relation databases such as Redis and MongoDB seem to be among the most loved databases.

- *[Most Wanted](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-wanted4) databases*

![Most Wanted Databases](/engineering-education/sql-or-nosql-when-to-choose-what/most-wanted.png)

[*Image Source*](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-wanted4)

MongoDB is a database technology that most developers want to learn more about.

### Conclusion
Both SQL and NoSQL database structures store data, but the approach they take to do this differs. Outline the application to decide the database model that fits data structures such as schema, relation, scalability, and data size. Migrating from one to the other is costly and time-consuming, and hence the differences should be considered while architecting software.

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/) & [Sophia Raji](/engineering-education/authors/sophia-raji/)
