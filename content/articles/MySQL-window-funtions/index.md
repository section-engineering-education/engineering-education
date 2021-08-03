### The five common pitfalls of MySQL window functions and how to avoid them

A MySQL window function is a function that manipulates values from one or more rows to give value returns for every row using basal queries. Window functions usually have an OVER clause, hence any function that lacks the clause is not a window function. The OVER clause has the following potentials:
- It defines a grouping of rows using the PARTITION BY clause
- It orders rows within their respective groups using the ORDER BY clause

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

There are 3 types of window functions as stated below:
1. Aggregate window functions- Are used with the OVER clause during database querying. Below are some instances of  Aggregate window functions used in MySQL.
- SUM( )-It manipulates a table row and returns the total after adding the values in the row or column as stipulated.
- MAX( )- It manipulates a row or column and returns the largest value as stipulated. Other Aggregate window functions are MIN() and COUNT() each responsible for returning the smallest value and the number of values in a row or column respectively.
3. Value window function- Are used to generate queries that manipulate rows of data and returns values for each row. Some examples of Value window function are the LEAD and LAG functions which are discussed below. Other examples are the FIRST_VALUE( ) and the LAST_VALUE( ) functions also used in the examples below.
4. Ranking window functions- Some instances of this function are the ROW_NUMBER(), the DENSE_RANK(), and finally the RANK() which are discussed in detail in the examples below.

The value window functions and the ranking window functions are collectively called the Built-in window function.

Below are some of the examples of MySQL window functions that are commonly used in database manipulation discussed at length:

### Examples of MySQL window functions


1. LEAD( )

This function is used to compute a value in group rows. They mainly achieve comparisons between rows and columns.


           SELECT
           cloth_type, week, sales_value,
           LEAD(sales_value) OVER(PARTITION BY cloth_type ORDER BY week)
           AS next_week_value
           FROM cloth_type;
This function will give out the value of the clothes sold in the "sales_value" column.

2. RANK( )

This function is mainly used in report creation. It computes the ranks for each row in a specified order. Ranks are usually numbers starting from 1. In a case where multiple rows sharing the same value, the rows are assigned the same rank. This causes skipping of numbers in the next row hence the values returned by the RANK( ) function are not usually consecutive numbers.


           SELECT
           RANK () OVER(ORDER BY score) AS number-ranked,
           name, score
           FROM sales:


This outputs a list of sales items ranked according to ranking_score.

3. LAG( )

LAG( ) function is almost similar to the LEAD( ) function hence the both compute row differences. As LEAD( ) returns value for subsequent row, LAG( ) returns the values of the previous row.

4. DENSE-RANK( )

This clause is similar to the RANK() function only that it doesn't allow gaps as in the RANK() function.


         SELECT
         DENSE_RANK( ) OVER(ORDER BY score DESC) AS dense_number_ranked,
         name, score
         FROM sales:



5. ROW NUMBER( )

Row Numbers are assigned to rows in their order of appearance. The rows are first ordered In ascending order after which the consecutive numbers are assigned. Rows with the same values are not assigned a common number. This means ties are not concidered while giving the row numbers.


      SELECT
      ROW_NUMBER() OVER(ORDER BY score) AS number,
      name, score
      FROM sales;


This outputs a list of sales arranged in ascending order using the 'ranking score'. Each item is given a ranking number starting from 1.

 OVER( )

This clause describes how to partition and order table rows. This clause is included in all the window functions and is seen above. other commonly used clauses are the 'Frame' clause and the 'ORDER BY' clause.

### Advantages of MySQL window functions over Aggregate functions

1. Unlike aggregate functions, MySQL window functions retain row identities and add aggregate values to each row.

Although MySQL window functions are showing great promise in the database manipulation, some concerns have been registered hence proving that the functions are not perfect as is everything else.
The concerns are discussed below and some suggestive avoidance mechanisms have also been touched on for each concern. 

### Pitfalls of MySQL window Functions

### 1. MySQL Window functions cannot be used in some clauses
MySQL window functions can not be used in the first five clauses in the list below but can only be used in SELECT and ORDER BY. This is due to the difference in the logical order of operations in a query and syntax. Below is the order in which the operations are processed in SQL:

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

 From the above list, we gather that the clauses WHERE, GROUP BY and HAVING are processed before the window functions in the list hence at the time of their processing, window functions will still be unprocessed hence no references can be made to them whatsoever.
Hence we realize that window functions are not accessible to the above-mentioned clauses and can not be used with them.

### How to avoid 

Despite this challenge, there is a workaround that can enable us to use window functions in the above-mentioned clauses;
This can be achieved by the use of A WITH QUERY EXPRESSION or a sub-query as illustrated in the example below.


          WITH student_marks AS
          (
          SELECT student_id, student_name, marks,
          row_number( ) over (PARTITION BY  student _id ORDER BY marks DESC ) 
          AS rn           
          FROM student
          )
          SELECT student_id, student_name, marks
          FROM student_marks WHERE rn = 1;

### Explanation
Columns are selected from the student table using the WITH query and row number values processed for every row.  This is done in the sub-query. The row number referred to as the "rn"  is used for row filtering in the main query.

### 2. A window frame with an implicit RANGE option is gotten when calculating running totals.

This occurs during the calculation of running totals when a user specifies the window order clause but does not specify the window frame units such as then ROWS or RANGES and its related window frame extents. This will logically results in a  bug as well as problems with database perfomance.
Example 1 below has the ROWS window frame unit specified.

      SELECT  book_id, borrowing_id, value,
      SUM ( value) OVER (PARTITION BY book_id
      ORDER BY borrowing_id  ROWS UNBOUNDED PRECEDING ) 
      AS total
      FROM dbo.Booking;


Example 2 below has a RANGE window frame unit 
specified.



     SELECT  book_id, borrowing_id, value,
     SUM ( value) OVER (PARTITION BY book_id
     ORDER BY borrowing_id
     RANGE UNBOUNDED PRECEDING ) AS total
     FROM dbo.Booking;


Example 3 below no window frame unit is specified.


     SELECT  book_id, borrowing_id, value,
     SUM ( value) OVER (PARTITION BY book_id
     ORDER BY borrowing_id
     ROWS UNBOUNDED PRECEDING ) AS total
     FROM dbo.Booking;


Hence example three in example three you will get the RANGE UNBOUNDED PRECEDING by default as dictated by the SQL standard. 
### How to avoid
This can however be averted in the following ways.

- Always clearly specify the window order clause as either ROW or RANGE  according to your needs to avoid default settings. You are however advised to specify ROW and avoid RANGE.


### 3. An implicit frame is defined for the FIRST_VALUE  and the  LAST_VALUE

The [FIRST_VALUE](https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions057.htm)  and the  [LAST_VALUE](https://www.sqlservertutorial.net/sql-server-window-functions/sql-server-last_value-function/) are window functions belonging to the offset clause and they usually return expressions from the first and last row in the frame. Although most first-timers usually believe that these functions operate on the whole window, the FIRST_VALUE  and the  LAST_VALUE only support a frame and this should be made clear. These being functions that support a frame, specification of window order plane and the associated extent is necessary to avoid getting the RANGE UNBOUNDED PRECEDING.

Example 1 below shows a sample code showing the 
FIRST_VALUE  and the  LAST_VALUE in use

        SELECT buyer_id, date_of_order, order_id, order_value,
        FIRST_VALUE(order_value) OVER (PARTITION BY buyer_id 
        ORDER BY date_of_order, order_id) AS firstorder_value,
        LAST_VALUE(order_value) OVER (PARTITION BY buyer_id 
        ORDER BY date_of_order, order_id) AS laststorder_value, 
        FROM Sales.order_value
        ORDER BY buyer_id, date_of_order, order_id;
`

For the FIRST_VALUE function, the expected results will be achieved however for the LAST_VALUE function, the value from the current row will be returned on top of a no disk penalty. With such results, a first-timer may think that the server is corrupted with bugs. This is however not the case because the results at hand are a result of the SQL standards default settings.

### How to avoid

This can however be avoided by just putting the following into place:

-  Always be explicit with the specifications in window frame cases to avoid default settings as per the SQL standards.
-  To avoid a no disk penalty with FIRST_VALUE function, use the  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  frame to get the values of the first row.
- To avoid a no disk penalty with LAST_VALUE function, use the  ROWS BETWEEN  CURRENT ROW AND UNBOUNDED PRECEDING  frame to get the values of the last row.

### 4. MySQL Window functions cannot be used to update or delete  statements

 According to MySQL standards, window functions are not to be used for the deletion or updating of a statement in a row. This is mainly because the [DELETE](https://mariadb.com/kb/en/drop-function-udf/) and [UPDATE](https://www.w3schools.com/sql/sql_update.asp)  clauses aren't compatible with the SELECT and ORDER. The UPDATE statement uses SET hence SELECT cannot be in the same query level as it.
### How to solve
This can however be made possible by:
-  Using the DELETE and UPDATE functions as sub-queries of the main query as shown below

        WITH student_marks AS
        (
        SELECT [ marks],  LAG( [ marks]) OVER (ORDER BY [student_id]) AS marks_lag         
        FROM student
        )
        UPDATE  student_marks
        SET [marks] = marks_lag


With this, the UPDATE function used in the sub-query the update is made possible and the same is true for the DELETE function


### 5. Some window function constructs are recognized by the parser even though they are not supported

Some windows frame units like the GROUPS frame are parsed during query processing only to begin throwing error messages later on. Below are the rest of the window frame units that are parsed but are not supported by MySQL
1. IGNORE NULLS
2. FROM LAST
3. EXCLUDE

Although these window frame units are not supported by MySQL, some of them are supported and they are stated below:
1. ROWS AND RANGE
2. RESPECT NULL
3. FROM FIRST

### How to avoid

Therefore to avoid the errors and thrown due to the lack of MySQL support we should be keen to use only window frame units that are supported by MySQL. This is the only way these errors can be countered.

### Conclusion

Despite the several pitfalls that we have seen associated with window functions, they still play an important role in executing MySQL queries and various solutions are even being given out in an attempt to solve the above-discussed problems. This, therefore, shows how critical window functions are to the MySQL queries.

Blissful reading!
