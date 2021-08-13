---
layout: engineering-education
status: publish
published: true
url: /mysql-window-functions/
title: MySQL Window Functions
description: This article takes the reader through MySQl window functions. It focusses on the five common pitfalls of MySQL window functions and how to avoid them.
author: elphaze-sedah
date: 2021-08-12T00:00:00-08:30
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mysql-window-functions/hero.png
    alt: Mysql Window Functions Hero Image
---
A MySQL window function is a function that uses basic queries to manipulate row values. Window functions must have an `OVER` clause. Therefore, any function without an `OVER` clause is not a window function.
<!--more-->
The `OVER` clause has the following potentials:
- It defines a grouping of rows using the `PARTITION BY` clause.
- It orders rows in respective groups using the `ORDER BY` clause.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Examples of MySQL window functions](#examples-of-mysql-window-functions)
4. [Advantages of MySQL window functions over Aggregate functions](#advantages-of-mysql-window-functions-over-aggregate-functions)
5. [Pitfalls of MySQL window Functions](#pitfalls-of-mysql-window-functions)
6. [Conclusion](#conclusion)

### Prerequisites
A reader should have prior knowledge of the following to understand this article:
- A basic understanding of databases and the functions used in MySQL.
- A beginner's understanding of MySQL window functions.

### Introduction
There are 3 types of window functions:
1. Aggregate window functions - They are used with the OVER clause during database querying. Below are some instances where Aggregate window functions are used in MySQL:
- `SUM( )`- It manipulates a table row or column and returns the total after adding the values in the row or column.
- `MAX( )`- It manipulates a row or column and returns the largest value. Other Aggregate window functions are `MIN()` and `COUNT()`; each responsible for returning the smallest value and the number of values in a row or column respectively.
3. Value window function - They are used to generate queries that manipulate rows of data and returns values for each row. Some examples of value window functions are the `LEAD` and `LAG` functions which are discussed below. Other examples are the `FIRST_VALUE( )` and the `LAST_VALUE( )` functions also used in the examples below.
4. Ranking window functions- Some instances of this function are the `ROW_NUMBER()`, the `DENSE_RANK()`, and the `RANK()` function. Both functions are discussed in detail in the examples below.

The value window functions and the ranking window functions are collectively called the Built-in window function.

Below are some of the examples of MySQL window functions that are commonly used in database manipulation:

### Examples of MySQL window functions
#### 1. LEAD
This function is used to compute a value in group rows. They mainly achieve comparisons between rows and columns.

```sql
SELECT
cloth_type, week, sales_value,
LEAD(sales_value) OVER(PARTITION BY cloth_type ORDER BY week)
AS next_week_value
FROM cloth_type;
```

The function above will give out the value of the clothes sold in the `sales_value` column.

#### 2. RANK
This function is mainly used in report creation. It computes the ranks for each row in a specified order. Ranks are usually numbers starting from 1.

In a case where multiple rows share the same value, the rows are assigned the same rank. This causes skipping of numbers in the next row hence the values returned by the `RANK( )` function are not usually consecutive numbers.

```sql
SELECT
RANK () OVER(ORDER BY score) AS number-ranked,
name, score
FROM sales:
```

The function above outputs a list of sales items ranked according to `ranking_score`.

#### 3. LAG
`LAG( )` function is almost similar to the `LEAD( )` function since they both compute row differences. As `LEAD( )` returns value for subsequent row, `LAG( )` returns the values of the previous row.

#### 4. DENSE-RANK
This clause is similar to the `RANK()` function; only that it does not allow gaps.

```sql
SELECT
DENSE_RANK( ) OVER(ORDER BY score DESC) AS dense_number_ranked,
name, score
FROM sales:
```

#### 5. ROW NUMBER
Row Numbers are assigned to rows in their order of appearance. The rows are first ordered in ascending order after which the consecutive numbers are assigned.

Rows with the same values are not assigned a common number. This means that ties are not considered when giving the row numbers.

```sql
SELECT
ROW_NUMBER() OVER(ORDER BY score) AS number,
name, score
FROM sales;
```

The function above outputs a list of sales arranged in ascending order using the `ranking score`. Each item is given a ranking number starting from 1.

#### 6. OVER
`OVER` clause describes how to partition and order table rows. This clause is included in all the window functions above.

Other commonly used clauses are the `Frame` clause and the `ORDER BY` clause.

### Advantage of MySQL window functions over Aggregate functions
Unlike aggregate functions, MySQL window functions retain row identities and add aggregate values to each row.

Although MySQL window functions are showing great promise in the database manipulation, some concerns have been registered hence proving that the functions are not perfect.

The concerns are discussed below and some suggestive avoidance mechanisms have also been touched on for each concern.

### Pitfalls of MySQL window Functions
#### 1. MySQL Window functions cannot be used in some clauses
MySQL window functions can not be used in the first five clauses in the list below. They can only be used in `SELECT` and `ORDER BY`.

This is due to the difference in the logical order of operations in a query and syntax.

Below is the order in which the operations in SQL are processed:

```sql
1. FROM
2. WHERE
3. GROUP BY
4. AGGREGATED FUNCTIONS
5. HAVING
6. WINDOW FUNCTIONS
7. SELECT
8. DISTINCT
9. EXCEPT
10. ORDER BY
11. OFFSET
12. FETCH
```

From the list above, we gather that the clauses `WHERE`, `GROUP BY` and `HAVING` are processed before the window functions.

Therefore, at the time of their processing, window functions will still be unprocessed hence no references can be made to them whatsoever.

##### How to avoid
Despite this challenge, there is a workaround that can enable us to use window functions in the above-mentioned clauses;

This can be achieved by the use of a `WITH QUERY EXPRESSION` or a sub-query as illustrated in the example below.

```sql
WITH student_marks AS
(
SELECT student_id, student_name, marks,
row_number( ) over (PARTITION BY  student _id ORDER BY marks DESC )
AS rn
FROM student
)
SELECT student_id, student_name, marks
FROM student_marks WHERE rn = 1;
```

##### Explanation
Columns are selected from the student table using the `WITH` query and row number values processed for every row. This is done in the sub-query.

The row number referred to as the "rn" is used for row filtering.

#### 2. A window frame with an implicit RANGE option is gotten when calculating running totals.
This occurs during the calculation of running totals. It occurs when a user specifies the window order clause but does not specify the window frame units such as the ROWS or RANGES and its related window frame extents.

This will logically result in a bug as well as problems with database performance.

The example below has the `ROWS` window frame unit specified.

```sql
SELECT  book_id, borrowing_id, value,
SUM ( value) OVER (PARTITION BY book_id
ORDER BY borrowing_id  ROWS UNBOUNDED PRECEDING )
AS total
FROM dbo.Booking;
```

The example below has a `RANGE` window frame unit specified.

```sql
SELECT  book_id, borrowing_id, value,
SUM ( value) OVER (PARTITION BY book_id
ORDER BY borrowing_id
RANGE UNBOUNDED PRECEDING ) AS total
FROM dbo.Booking;
```

In the example below, no window frame unit is specified.

```sql
SELECT  book_id, borrowing_id, value,
SUM ( value) OVER (PARTITION BY book_id
ORDER BY borrowing_id
ROWS UNBOUNDED PRECEDING ) AS total
FROM dbo.Booking;
```

In example three, you will get the `RANGE UNBOUNDED PRECEDING` by default as dictated by the SQL standard.

##### How to avoid
This can however be averted in the following ways:
- Always specify the window order clause as either `ROW` or `RANGE` according to your needs to avoid default settings. However, you are advised to specify `ROW` and avoid `RANGE`.

#### 3. An implicit frame is defined for the FIRST_VALUE and the LAST_VALUE
The [FIRST_VALUE](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions057.htm) and the [LAST_VALUE](https://www.sqlservertutorial.net/sql-server-window-functions/sql-server-last_value-function/) are window functions that belong to the offset clause and usually return expressions from the first and last row in the frame.

Although most first-timers usually believe that these functions operate on the whole window, the `FIRST_VALUE` and the `LAST_VALUE` only support a frame.

These being functions that support a frame, specification of window order plane and the associated extent is necessary to avoid getting the `RANGE UNBOUNDED PRECEDING`.

The example below shows the `FIRST_VALUE` and the `LAST_VALUE` in use:

```sql
SELECT buyer_id, date_of_order, order_id, order_value,
FIRST_VALUE(order_value) OVER (PARTITION BY buyer_id
ORDER BY date_of_order, order_id) AS firstorder_value,
LAST_VALUE(order_value) OVER (PARTITION BY buyer_id
ORDER BY date_of_order, order_id) AS laststorder_value,
FROM Sales.order_value
ORDER BY buyer_id, date_of_order, order_id;
```

For the `FIRST_VALUE()`, the expected results will be achieved. However, for the `LAST_VALUE()`, the value from the current row will be returned on top of a no disk penalty.

With such results, a first-timer may think that the server is corrupted with bugs. This is however not the case because the results at hand are a result of the SQL standards default settings.

##### How to avoid
This pitfall can be avoided by just putting the following into place:
- Always be explicit with the specifications in window frame cases to avoid default settings as per the SQL standards.
- To avoid a no disk penalty with `FIRST_VALUE()`, use the `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` frame to get the values of the first row.
- To avoid a no disk penalty with `LAST_VALUE()`, use the `ROWS BETWEEN CURRENT ROW AND UNBOUNDED PRECEDING` frame to get the values of the last row.

#### 4. MySQL window functions cannot be used to update or delete statements
According to MySQL standards, window functions are not to be used to delete or update a statement in a row. This is mainly because the [DELETE](https://mariadb.com/kb/en/drop-function-udf/) and [UPDATE](https://www.w3schools.com/sql/sql_update.asp) clauses aren't compatible with the `SELECT` and `ORDER`. The `UPDATE` statement uses `SET` hence `SELECT` cannot be in the same query level as it.

##### How to solve
This can be solved by:
- Using the `DELETE()` and `UPDATE()` as sub-queries of the main query as shown below:

```sql
 WITH student_marks AS
 (
 SELECT [ marks],  LAG( [ marks]) OVER (ORDER BY [student_id]) AS marks_lag
 FROM student
 )
 UPDATE  student_marks
 SET [marks] = marks_lag
```

With this, the `UPDATE` function used in the sub-query is made possible; same applies to the DELETE function.

#### 5. Some window function constructs are recognized by the parser even though they are not supported
Some windows frame units like the `GROUPS` frame are parsed during query processing only to begin throwing error messages later on.

Below are the rest of the window frame units that are parsed but are not supported by MySQL:

```sql
1. IGNORE NULLS
2. FROM LAST
3. EXCLUDE
```

Although these window frame units are not supported by MySQL, some of them are supported:

```sql
1. ROWS AND RANGE
2. RESPECT NULL
3. FROM FIRST
```

##### How to avoid
To avoid the errors thrown due to lack of MySQL support, we should be keen to use only window frame units that are supported by MySQL.

This is the only way these errors can be countered.

### Conclusion
Despite the several pitfalls that we have seen associated with window functions, they still play an important role in executing MySQL queries and various solutions are even being given out in an attempt to solve the above-discussed problems.

This therefore shows how critical window functions are to the MySQL queries.

Blissful reading!

---
Peer Review Contributions by: [Atonya Dennis](/engineering-education/authors/atonya-dennis/)
