---
layout: engineering-education
status: publish
published: true
url: /mysql-query-optimization-using-indexes-with-examples/
title: Tutorial on MySQL Database Optimization using Indexes
description: This article is a comprehensive tutorial on how to understand MySQL database optimization using indexes.
author: benson-kariuki
date: 2020-10-13T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mysql-query-optimization-using-indexes-with-examples/hero.jpg
    alt: MySQL Database Optimization using Indexes
---
This article is a comprehensive tutorial on MySQL database optimization using indexes. If you have interacted with any SQL based relational database, maybe you have come across indexes. Unfortunately, most beginners in SQL based databases don't know how to use indexes.
<!--more-->
### Introduction
This article will help you not only to understand them but also to implement them with examples.

#### Prerequisites
The target reader for this article is anyone who wants to learn about MySQL indexes. You may need prior knowledge in any SQL based relational database. The demos used here will work in both [Maria DB](https://mariadb.org/) and [MySQL](https://www.mysql.com/).

Prior Knowledge of [MySQL](https://www.mysql.com/) database is essential. Free MySQL tutorials for beginners are available on [MySQL tutorial](https://www.mysqltutorial.org/) and [Tutorialspoint](https://www.tutorialspoint.com/mysql/index.htm).

I would recommend you go through the related article on [MySQL Query Performance Optimization Tips](/mysql-query-performance-optimization-tips/).

### Introduction to MySQL indexes
An [index](https://www.mysqltutorial.org/mysql-index/) is a data structure used to locate data without scanning all the rows in a table for a given query. Indexes help retrieve data faster. Indexes are not visible to the users. They help speed up queries that require a search.


### How MySQL index is used in database optimization
Imagine trying to find a specific book on a shelf in a multistoried library. It would be easier to search for the book in the catalog. The catalog will direct you to the specific shelf where the book is.

This would save you a lot of time and effort. On the other hand, if the library is small with a couple of books, it would be easier to scan the shelf and get the book you are looking for. This is the same when searching a database.

It may not be too hard for MySQL to search row by row from a single table with a few thousands of rows for the required information. When the data grows to millions of records, it will take some considerable amount of time to search row by row for a particular record.

What about when we have millions of records in several tables whereby we have to use JOINs to get the desired results? Searching row by row becomes even slower. By the use of indexes, we can speed up the queries.

Data in an indexed column is stored in some order, in a separate location called the index. Numeric data types are stored in numeric order, text data types are stored in alphabetical order, and date data types are in date order. This way, data search is easier and faster.

### How to choose best indexes for MySQL query optimization
We need to know which operations use indexes so that we will be able to choose the best indexes.

MySQL uses indexes in the following operations:
- To find rows using the `WHERE` clause.
- To rule out rows from the search set. When you use multiple indexes, MySQL has to choose the most selective index, that searches from the smallest set of rows.
- To perform `JOIN` to retrieve data from related rows. For indexes to be effective on `JOIN`, the `JOIN` columns should be of the same data type and size. Consider the query below:

```sql
    SELECT students.first_name, grades.grade FROM students
    JOIN grades ON grades.student_id = students.student_id
```

The data type used on `grades.student_id` and `students.student_id` columns should be of the same type and size.
- To find the minimum and maximum value for a specific column using `MIN()` and `MAX()`, respectively.
- To sort or group items in a table.

All you need to do is to look through your queries and index the columns that will be searched.

#### MySQL index syntax
Below are the commonly used queries when interacting with indexes in MySql and MariaDB.

#### Creating an index
The SQL below creates an index named `idx_firstname` on the column `firstname`, in the `users` table. Index naming depends on your naming standards.

For example `idx_columnname`.

```sql
CREATE INDEX idx_firstname ON users (firstname);
```

#### Creating an index on multiple columns
MySQL allows up to 16 columns multi-index. More than likely you will not need all 16 indexes. As a rule of thumb, up to 5 columns is recommended. Multi-column indexes can also be created.

See the syntax below.

```sql
CREATE INDEX index_name ON TableName (Col1, COL2, COl3);
```

#### Drop index syntax
```sql
ALTER TABLE table_name DROP INDEX index_name;
```

#### Rename index syntax

```sql
ALTER TABLE table_name RENAME INDEX index_name TO new_index_name;
```

#### Show indexes syntax
```sql
SHOW INDEX FROM tableName;
```

### Indexes practical example
In this demo, we will use MySQL/MariaDB. The information can be applied to other relational databases with similar indexing structures. We will create a database and define a table using the query below.

```sql
CREATE DATABASE fake;
```

```sql
CREATE TABLE fake.`Employees` (
  `Name` VARCHAR(50)  NOT NULL,
  `Email` VARCHAR(255)  NOT NULL,
  `City` VARCHAR(50)  NOT NULL,
  `State` VARCHAR(50)  NOT NULL,
  `Wage` double  NOT NULL,
  `DOB` Date,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);
```

After creating the table, we need to populate it with sample data. In this case, we will populate the table with fake data. I used the [TestDataGenerator](https://github.com/Tsanguu/TestDataGenerator) python code available on GitHub and forked from this [source](https://github.com/testingworldnoida/TestDataGenerator).

You can follow this [video tutorial](https://www.youtube.com/watch?v=2lWDCZiXCoo) on how to use the code to generate sample data. There are also other tools for sample data generation, including the [dbForge Data Generator for MySQL](https://www.devart.com/dbforge/mysql/data-generator/).

We will run SQL queries in a database with 2 million records and record the time taken by each query to run. The table below shows some of the records populated.

```sql
+----------------+-----------------------------+-----------------------+---------------+-------+------------+----+
| Name           | Email                       | City                  | State         | Wage  | DOB        | id |
+----------------+-----------------------------+-----------------------+---------------+-------+------------+----+
| Rodney Stewart | birdcharles@gmail.com       | Tinatown              | Indiana       | 33400 | 1991-06-26 | 11 |
| Susan Allen    | dana54@yahoo.com            | South Samanthaborough | New Jersey    | 13400 | 2016-02-19 | 12 |
| Emily Irwin    | rbriggs@hotmail.com         | Carpenterville        | Kansas        | 23400 | 2015-07-07 | 13 |
| Michael Case   | alexanderjennifer@yahoo.com | Vanessaside           | Louisiana     | 63400 | 2009-08-30 | 14 |
| Collin Proctor | hollandjames@hotmail.com    | Gonzalezstad          | Massachusetts | 33400 | 1997-03-26 | 15 |
+----------------+-----------------------------+-----------------------+---------------+-------+------------+----+

```

#### Test 1
Note the time taken to run the queries below.

```sql
mysql> SELECT COUNT(*) FROM Employees;
+----------+
| COUNT(*) |
+----------+
|  10000000 |
+----------+
1 row in set (0.72 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE State = 'Kansas';
+----------+
| COUNT(*) |
+----------+
|    40174 |
+----------+
1 row in set (0.66 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE State = 'Alaska';
+----------+
| COUNT(*) |
+----------+
|    40088 |
+----------+
1 row in set (0.69 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE State = 'Indiana';
+----------+
| COUNT(*) |
+----------+
|    39760 |
+----------+
1 row in set (0.67 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE DOB BETWEEN '1982-01-01' AND '1992-01-01';
+----------+
| COUNT(*) |
+----------+
|   393573 |
+----------+
1 row in set (0.69 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE DOB = '1982-01-01';
+----------+
| COUNT(*) |
+----------+
|      113 |
+----------+
1 row in set (0.60 sec)
```

```sql
mysql> SELECT MAX(Wage) FROM Employees;
+-----------+
| MAX(Wage) |
+-----------+
|    103400 |
+-----------+
1 row in set (0.67 sec)
```

```sql
mysql> SELECT MIN(Wage) FROM Employees;
+-----------+
| min(Wage) |
+-----------+
|         0 |
+-----------+
1 row in set (0.64 sec)
```

The queries above took between 0.72 sec and 0.62 seconds to execute. Now, let's create indexes, do a second test, and compare the times.

#### Create indexes
In the queries above, the `WHERE` clause is using City, DOB, and Wage columns to select the desired results.

Therefore, we will create indexes for these three columns only.

```sql
mysql> CREATE INDEX State_idx ON Employees (State);
Query OK, 0 rows affected (7.87 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

#### Test 2
```sql
mysql> SELECT COUNT(*) FROM Employees WHERE State = 'Kansas';
+----------+
| COUNT(*) |
+----------+
|    40174 |
+----------+
1 row in set (0.02 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE State = 'Alaska';
+----------+
| COUNT(*) |
+----------+
|    40088 |
+----------+
1 row in set (0.02 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE State = 'Indiana';
+----------+
| COUNT(*) |
+----------+
|    39760 |
+----------+
1 row in set (0.02 sec)
```

After creating indexes, the query execution time was reduced from an average of 0.70 seconds to 0.02 seconds. That was a great improvement. Creating an index for the 'City' column does not impact the query execution time of the queries below.

```sql
SELECT COUNT(*) FROM Employees WHERE DOB BETWEEN '1982-01-01' AND '1992-01-01';
```

```sql
SELECT COUNT(*) FROM Employees WHERE DOB = '1982-01-01';
```

```sql
SELECT MAX(Wage) FROM Employees;
```

```sql
SELECT MIN(Wage) FROM Employees;
```

The queries below do not have indexes to help. We need to create an index on columns DOB and Wage to increase speed. We need to create indexes for the two columns as well.

```sql
CREATE INDEX DOB_idx ON Employees (DOB);
```

```sql
CREATE INDEX Wage_idx ON Employees (Wage);
```

Run the queries again

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE DOB BETWEEN '1982-01-01' AND '1992-01-01';
+----------+
| COUNT(*) |
+----------+
|   393573 |
+----------+
1 row in set (0.15 sec)
```

```sql
mysql> SELECT COUNT(*) FROM Employees WHERE DOB = '1982-01-01';
+----------+
| COUNT(*) |
+----------+
|      113 |
+----------+
1 row in set (0.00 sec)
```

```sql
mysql> SELECT MAX(Wage) FROM Employees;
+-----------+
| MAX(Wage) |
+-----------+
|    103400 |
+-----------+
1 row in set (0.00 sec)
```

```sql
mysql> SELECT MIN(Wage) FROM Employees;
+-----------+
| MIN(Wage) |
+-----------+
|     13400 |
+-----------+
1 row in set (0.00 sec)
```

After creating indexes, the queries execution time was reduced to 0.00 seconds in some of the queries. Now you have a reference on how to create indexes.

### Advantages of SQL indexes
- Indexes result in faster data retrieval, especially for a `SELECT` statement and `UNIQUE` Queries.
- Indexes are the ideal choice for Online Analytical Processing (OLAP). OLAP systems run complex queries.

### Disadvantages of SQL indexes
Indexes can also slow down `UPDATE`, `INSERT`, or `DELETE` queries. Every time there is a change in the table (`UPDATE`, `INSERT`, or `DELETE`), MySQL has to recreate the indexes.

Index creation is a resource-intensive process and takes a lot of time. This can hurt your database performance.  Therefore, indexes may not be appropriate if you have tables that you modify (`UPDATE`, `INSERT`, or `DELETE`) more than you read (`SELECT`).

Indexes create additional tables and require extra storage.

### Conclusion
In summary, indexes speed up searches of your database by allowing MySQL to organize your data in the best way for different queries. Indexes implementation may not have significant performance improvements on small databases. As the number of data increases, indexes can be much help in speeding up database reads. Avoid incorrect use of indexes.

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
