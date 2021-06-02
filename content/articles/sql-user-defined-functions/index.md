---
layout: engineering-education
status: publish
published: true
url: /sql-user-defined-functions/
title: Working with User-Defined Functions in SQL Server
description: This tutorial will discuss user-defined functions in SQL Server. The concept of functions in SQL is similar to other programming languages like Python. The major difference being the way they are implemented.  
author: rahul-banerjee
date: 2021-02-01T00:00:00-19:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sql-user-defined-functions/hero.jpg
    alt: SQL Functions image
---
In this tutorial, we will be discussing user-defined functions in SQL Server. More specifically, we will be discussing Scalar functions and Table-Valued functions.
<!--more-->
When writing code, one must aim to follow the DRY Principle (Don’t Repeat Yourself). One way to avoid a srepetition of code is to put chunks of code inside functions and invoke them as required.

The concept of functions in SQL is similar to other programming languages like Python. The major difference being the way they are implemented. There are two main types of user-defined functions in SQL based on the data they return:

1. **Scalar functions:** These types of functions return a single value, i.e float, int, varchar, datetime, etc.

2. **Table-Valued functions:** These functions return tables.

### Table of contents
- Prerequisites.

- Creating functions.

- Using functions in Statements.

- Update/Delete functions.

- Using Variables, Conditional Statements inside functions.

- Conclusion.

### Prerequisites  
- A basic understanding of SQL.

- A SQL Server with a database.

- [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) to connect to your database.

### Creating functions
#### Scalar functions
Below is the definition of a simple function. It takes in two numbers and returns their sum. Since this function returns a number, it is a scalar function.

```sql
    CREATE FUNCTION scalar_func
    (
	    @a AS INT, -- parameter a
	    @b AS INT -- parameter b
    )
    RETURNS INT -- return type
    AS
    BEGIN
	    RETURN @a + @b -- return statement
    END;
```

- We use the `Create function` command to define functions. It is followed by the name of the function. In the above example, the name of the function is `scalar_func`.

- We need to declare the parameters of the function in the following format.

`@VariableName AS Data Type`

In our above example, we have defined two integer parameters `a` and `b`.

- The return type of the result has to be mentioned below the definition of the parameters. In the above example, we are returning the sum that is an integer.

- After the return statements, we create a `BEGIN ... END` block that contains the logic of our function. Although in this case, we have a single return statement, we don't need a `BEGIN ... END` block.

#### Table-valued functions
Before creating a table-valued function, we will create a simple table.
  
```sql
    -- Creating new table
    CREATE TABLE TEST(
	    num1 INT,
	    num2 INT
    );
    
    -- Inserting values into new table
    INSERT INTO TEST
    VALUES
    (1,2),
    (2,3),
	(4,5);
```

The table contains 2 columns. We will create a function that returns a new table with an extra column. This extra column will contain the sum of numbers in the column `num1` and column `num2`.

```sql
    CREATE FUNCTION table_valued_func()
    RETURNS TABLE
    AS
    RETURN
	    -- statement to calculate sum
	    SELECT num1 , num2, num1 + num2 AS 'SUM'
	    FROM TEST;
```

- The function above does not take in any parameter.

- The SQL statement simply calculates the sum and stores it in a new column named `SUM`.

### Using functions in Statement
#### Scalar functions
```sql
    -- invoking previously created scalar function
    SELECT dbo.scalar_func(1,2);
```

When using functions in statements, we will need to prefix our functions with the database schema it is associated with. The default schema in Microsoft SQL Server is `dbo`. If the database schema is not mentioned, SQL will give an error,

#### Table-valued functions
Since the function returns a table, we will need to select the columns we are interested in.
```sql
    -- invoking previously created table valued function
    SELECT * FROM dbo.table_valued_func();
```

Like scalar functions, we will need to mention the database schema.

### Update/delete functions
The syntax to update/delete scalar and table-valued functions are the same.

#### Update
We will update our table-valued function to add 10 to the existing sum and change the name of the column to `New_Sum`.
```sql
    ALTER FUNCTION table_valued_func()
    RETURNS TABLE
    AS
    RETURN
	    -- updating statement to add 10 to sum
	    SELECT num1 , num2, num1 + num2 + 10 AS 'NEW_SUM'
	    FROM TEST;
```

The `Alter` Keyword is used to update the function.

#### Drop
```sql
    -- dropping previously created scalar function
    DROP FUNCTION dbo.scalar_func;
    -- dropping previously created tabular function
    DROP FUNCTION dbo.table_valued_func;
```   

> Note: Do not put parenthesis after the function name.

### Using variables and conditional statements inside functions
#### Variables

Below is the syntax to declare and initialize variables.
```sql
    -- declaring integer variable
    DECLARE @result AS INT;
    -- initializing created varaible
    SET @result = @a + @b;
```

The `DECLARE` keyword is used to create a variable and the `SET` keyword is used to initialize a variable.

We have an example below of a scalar function using a variable.
```sql
    CREATE FUNCTION scalar_func
    (
	    @a AS INT,
	    @b AS INT
    )
    RETURNS INT
    AS
    BEGIN
	    -- using variables inside function
	    DECLARE @result AS INT
	    SET @result = @a + @b
	    RETURN @a + @b
    END;
```

#### IF...ELSE Statements
The syntax for `IF...ELSE` Statements is like `IF...ELSE` statements in Python or C++.
```sql
    DECLARE @num AS INT;
    SET @num = 4;
    -- if condition
    IF @num % 2 = 0    
	    BEGIN
		    SELECT 'Number is Even'
	    END
    -- else condition
    ELSE
	    BEGIN
		    SELECT 'Number is Odd'
	    END
```

The piece of code above checks whether the value in variable `num` is even or odd. Based on the value, the `IF` or the `ELSE` Block is executed.

Listed below is a function using an `IF...ELSE` Block.

```sql
    CREATE FUNCTION is_even(@num AS INT)
    RETURNS BIT
    AS
    BEGIN
	    DECLARE @result AS BIT
	    -- set variable to 1 if number is even
	    IF @num % 2 = 0
		    SET @result = 1
	    -- set variable to 0 if number is odd
	    ELSE
		    SET @result = 0
	    RETURN @result
    END;
```

#### Case statements
When you are dealing with multiple if statements, it is better to use case statements. They make your code easier to read. Below is the general syntax for case statements.
```sql
	CASE
	    WHEN  condition1  THEN  result1  
		WHEN  condition2  THEN  result2  
		.
		.
		.  
		ELSE  result  
	END
```

Like switch cases, all the cases are checked and if multiple cases are satisfied, the respective code blocks will be executed.

Below we have a function that uses case statements.
```sql
    CREATE FUNCTION is_greater
	( 
		@a AS INT,
		@b AS INT
	)
	RETURNS VARCHAR(30)
	AS
	BEGIN
	RETURN( 'A is' + 
	CASE
		-- Case 1
		WHEN @a > @b THEN 'Greater than'
		-- Case 2
		WHEN @a < @b THEN 'Smaller than'
		ELSE 'Equal to'
	END
	+ 'B')
	END;
```

It compares two integers and returns a string based on the comparison result.

### Conclusion
As I mentioned above, try to follow the DRY Principle while writing SQL Statements. When you see the same piece of code being used in multiple statements, consider putting it inside a function. Functions make your statements look much cleaner and shorter. 

Happy Coding!

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)