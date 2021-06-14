---
layout: engineering-education
status: publish
published: true
url: /mysql-query-performance-optimization-tips/
title: MySQL Query Performance Optimization Tips
description: This article will focus on the optimization of individual SQL statements and database structure as data volume grows.
author: benson-kariuki
date: 2020-10-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/mysql-query-performance-optimization-tips/hero.jpg
    alt: MySQL query optimizing tips image
---
This article goes through common tips for optimizing MySQL queries. As data volume in your database grows, retrieving data from the database and other database operations become complex. This also requires more computing resources.
<!--more-->
### Introduction
Most applications are database driven. Poorly designed SQL queries can significantly downgrade the performance of database-driven applications. According to this [MySQL developers guide](https://dev.mysql.com/doc/refman/8.0/en/optimize-overview.html), you can be proactive and plan for optimizations or troubleshoot queries and configurations after experiencing problems. This article will focus on the optimization of individual SQL statements and database structure.

### Prerequisites
To fully understand this article, prior knowledge of the MySQL database is essential. An understanding of different SQL queries and how they work is critical. Free MySQL tutorials for beginners are available on [MySQL tutorial](https://www.mysqltutorial.org/) and [tutorials point](https://www.tutorialspoint.com/mysql/index.htm).

### Benefits of MySQL Database Queries Optimization
We optimize for speed and resources. Optimized queries can run faster and require less computing power.

### Tips for MySQL Queries Optimization
Fast queries are about response time. The goal is to have queries return the required result in the shortest time possible. How much time does a query take to execute? Most of the tools used to query a MySQL database give details on time taken to run a query.

The most straightforward query cost metrics used in MySQL are query response time, the number of rows scanned, and the number of rows returned. The more the number of rows read, the higher the cost of the query. The screenshots below show the time taken to run a query in both CLI and MySQL Workbench.

![mysql-command-line-interface-query-time-screenshot](/engineering-education/mysql-query-performance-optimization-tips/mysql-cli-query-time-screenshot.jpg)

![mysql-workbench-query-time-screenshot](/engineering-education/mysql-query-performance-optimization-tips/mysql-workbench-query-time-screenshot.jpg)

#### Optimizing Queries with EXPLAIN
The EXPLAIN statement provides information about how MySQL executes a statement. According to the [MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/using-explain.html), EXPLAIN works alongside SELECT, DELETE, INSERT, REPLACE, and UPDATE statements. It displays information from a built-in MySQL optimizer regarding the statement execution plan and the number of rows scanned in each table. Thus we can determine the cost of the query. The query below shows how EXPLAIN works with the SELECT statement.

```sql
EXPLAIN SELECT * FROM world_x.city LIMIT 5000;
```

![mysql-explain-query-screenshot](/engineering-education/mysql-query-performance-optimization-tips/mysql-explain-query-screenshot.jpg)
MySQL EXPLAIN query output

#### MySQL Query Log
In MySQL, slow queries are logged in an built-in query log. Once you find the slow queries in the query log, use the EXPLAIN statement to determine why the queries are slow and optimize them.

#### Optimizing Database Schema
The database structure is very crucial in performance optimization. There are several ways in which we can optimize database structure, including:

- Limiting the number of columns: MySQL has a limit of 4096 columns per table. Use fewer columns for better performance. If possible, do not use more than a hundred columns unless your business logic requires that. Tables with more columns require more CPU time to process.
- Normalize Tables: Normalizing keeps all data non-redundant. The database that is in this state is called 3NF (third normal form). The 3NF ensures that lengthy values such as names, addresses, categories, and contact details are not repeated. Instead, they are represented as IDs across multiple smaller tables. For more details on database normalization, refer [here](https://www.guru99.com/database-normalization.html).
- Use the Most Appropriate Data Types: There are more than 20 different data types in MySQL designed for different uses.  Some of the data types include Timestamp, DateTime, Integer, ENUM, Float, Double, Char, LongText, and Text. Tables should be designed to minimize space used on a disk. Tables that occupy less disk space results in smaller indexes that can be processed in a shorter duration. For example, if a table will host less than 100 records, you should use the TINYINT data type for the unique ID as it takes less space than INT.
- Avoid Null Values. Declare columns to be NOT NULL where possible. This enables better use of indexes. NULL values increase the processing power needed for testing whether each value is NULL, making SQL operations slower.

#### Use Indexes
Think of records as content in a book. If you want to learn on a particular subtopic, you would go to the index pages, look for the subtopic you want, then get the page where the subtopic is. Indexes work the same way. They are used to find rows with specific column values much faster. Without using an index, MySQL must begin searching in the first row and go through the whole table to find the required records. Tables with a huge amount of data are more costly to query.

With the use of an index, MySQL can faster determine the position to seek in the middle of the data file. This is done without going through all the rows and is much faster than reading every row sequentially. Refer to the [MySQL developer](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html) guide for more information on indexes.

You can create a single-column or multiple column indexes, as shown below, respectively.

```sql
CREATE INDEX tablename_columnname_idx ON tablename (columnname);
```

```sql
CREATE INDEX tablename_column1name_column2name_idx ON tablename (column1name, column2name);
```

#### Use Wildcards at the End of a Phrase
In MySQL, wildcards are used in conjunction with the LIKE operator and NOT LIKE operator. They are used to search for data matching some search criteria. You can learn more about wildcards [here](https://www.guru99.com/wildcards.html).

Wildcards result in the most expansive scan when searching for data, which is very inefficient. Leading wildcards are the most inefficient, especially when combined with ending wild cards. In such a case, MySQL has to search all the records for a match. Thus you should avoid leading wild cards. See the queries below, one is using a leading wildcard and another one is using an ending wildcard.

```sql
SELECT * FROM city WHERE name LIKE '%Al%';
```

```sql
SELECT * FROM city WHERE name LIKE 'Al%';
```

#### Specify Columns in SELECT Function
SELECT * (select all) is used as a shortcut to query all columns available in a table. This requires more resources than using a SELECT statement with only the columns you need for that specific query. For example, a customer table with 20 different columns and a hundred thousand entries. If you want to select a city with ID and Name only; try to use

```sql
SELECT ID, Name, District FROM city;
```

instead of

```sql
SELECT * FROM city;
```

The second example will take more time to run to completion.

#### Avoid SELECT DISTINCT
DISTINCT is used to remove duplicate rows with SELECT statements. The DISTINCT command requires more sorting and reading of the database, which requires more processing power. DISTINCT can be replaced with GROUP BY to get the same results. See the two queries below.

```sql
SELECT col1, col2 FROM table GROUP BY col1, col2;
```

```sql
SELECT DISTINCT col1, col2 FROM table;
```

#### Use LIMIT
Sometimes we need a specified number of rows from a result set. The LIMIT clause is used in the query to specify the number of rows instead of fetching the whole result set. Fetching the entire result set requires more resources compared to fetching a specified number of rows. See the queries below, one without LIMIT, another one with the LIMIT clause.

```sql
SELECT ID, Name, District FROM city;
```

```sql
SELECT ID, Name, District FROM city LIMIT 10;
```

#### MySQL Query Caching
MySQL Query Caching provides database caching functionality. The SELECT statement text and the retrieved result are stored in the cache. When you make a similar query to the one already in the cache, MySQL will respond and give a query already in the cache. In this way, fewer resources are used, and your query runs faster.

This works best with a database where more select queries are made. Once the table is updated, the cached query and result become invalid. Thus, caching may not work with an application that updates the table frequently.

The command below is used to check if query cache is enabled in MySQL.

```sql
SHOW VARIABLES LIKE 'have_query_cache';
```

If the query cache is not set, set the query cache by following guidelines on [MySQL Documentation](https://dev.mysql.com/doc/refman/5.6/en/query-cache-configuration.html#:~:text=To%20set%20the%20size%20of,default%20for%20query_cache_type%20of%200.).

#### Converting OUTER JOINs to INNER JOINs
An INNER JOIN returns rows that contain columns from both tables. Unlike INNER JOIN, OUTER JOIN returns rows where no matches have been found on both tables. Therefore, OUTER JOIN does more work than INNER JOIN, increasing total execution time.

Use INNER JOIN whenever possible. It would be a waste of performance to use OUTER JOIN when you don't need the data outside specified columns. We have a sample database with two tables as follows:
1. student - student_id, first_name, last_name
2. orders - id, date, amount, customer_id

An INNER JOIN query to the table would be as it is shown below.

```sql
SELECT  C.id, C.name, O.amount, O.date FROM customers C
  INNER JOIN orders O ON O.customer_id = C.id;
```

An OUTER JOIN query to the table would be as it is shown below.
*NOTE: MySQL does not support FULL OUTER JOIN, but other SQL dialects such as [PostgreSQL](https://www.postgresql.org/) do.*

```sql
SELECT  C.id, C.name, O.amount, O.date FROM customers C
  FULL OUTER JOIN orders O ON O.customer_id = C.id;
```

#### Optimize LIKE Statements with UNION Clause
The OR operator is used to combine two Boolean expressions and return true when either of the conditions is met. When using comparison operator 'or' in a query, MySQL optimizer may incorrectly choose a full table scan to retrieve the result set. This makes the query run slower. A UNION clause runs faster and gives the same result.

Consider the query below:

```sql
SELECT * FROM city WHERE Name LIKE 'C%' or District LIKE 'C%';
```

Below are the optimized versions of the query above using the UNION ALL and UNION operators, respectively.

```sql
SELECT * FROM city WHERE Name LIKE 'C%' UNION ALL SELECT * FROM city WHERE District LIKE 'C%';
```

```sql
SELECT * FROM city WHERE Name LIKE 'C%' UNION SELECT * FROM city WHERE District LIKE 'C%';
```

In the first query above, we used UNION ALL, while the second one, we have used UNION. By default, UNION returns distinct rows while UNION ALL allows duplicate rows. UNION generally runs faster than UNION ALL.

### Conclusion
MySQL development is ongoing. More tips to optimize queries are developed every day. This article is a guide on how to make better queries and make more stable database applications. Query with no doubt.

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
