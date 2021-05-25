---
layout: engineering-education
status: publish
published: true
url: /python-database-programming-sqlite/
title: Python Database Programming - SQLite
description: In this tutorial we will learn how to use the Python SQLite library, how to interact with it, and execute queries within a Python application.
author: ahmad-mardeni
date: 2020-10-19T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-database-programming-sqlite/hero.png
    alt: SQLite example image Python SQLite library
---
[SQLite](https://www.sqlite.org/docs.html) is an open-source and simple database engine that allows you to create a relational database and interact with it. In general, it is very lightweight and can be used within almost all programming languages including Python.
<!--more-->

### Why SQLite?
- Simple: SQLite does not require any "setup" process and there is no need to start, stop, or configure any server to work on.
- Concurrency: it gives the ability to execute multiple queries or access multiple database files simultaneously in a single connection.
- Reliability: it can face any maliciously designed database files and **SQL** strings.
- Control: the content can be accessed and updated using powerful **SQL** queries.
- Scalability: SQLite is scalable, as long as you don't need it for multi-user in high availability cases, and I don't recommend using it in production with big data.

### Prerequisites
1. Basic understanding of Python programming language.
2. Basic understanding of how **SQL** queries work.
3. **DB Browser for SQLite**, you can download it from [here](https://sqlitebrowser.org/dl/).

You are ready to go, let's get started!

#### In this tutorial, you’ll learn how to:
- **Install** SQLite.
- **Connect** SQLite with Python.
- **Create** tables.
- **Perform** common database queries with Python application.

### Install SQLite:
For **Windows** users use this command in your terminal:

```bash
pip install db-sqlite3

```

For **Linux** users you can use:

```bash
sudo apt-get install sqlite
```

### Connect to a Database
After importing SQLite3, in order to connect to a database, we have to create a connection object to represent the database by using the connect() function.

For example, the following Python program connects to the database `Database.db`.

```python
import sqlite3
try:
   connection = sqlite3.connect("Database.db")
   print("Connection to SQLite DB successful")

except:
    print("Error")
```

If we are trying to connect to an SQLite database that does not exist, then SQLite will create it automatically for us.

### Creating Tables
Now we are going to create a students table containing three columns **ID**(Integer),**NAME**(Chars with a max length of 20), and **AGE**(Integer).

```python
cur = connection.cursor()
Create_Students_Table ='''CREATE TABLE STUDENTS(
                          ID INT,
                          NAME CHAR(20) NOT NULL,
                          AGE INT
                         )'''
cur.execute(Create_Students_Table)   
```

A database cursor is a control structure that is used to execute statements in order to communicate with the SQLite database and fetch data from it.

**Now let's take a look at what our database looks like**

Open the **DB Browser for SQLite** then click on open database, after choosing our file `database.db` you will see what tables it contains.

![](/engineering-education/python-database-programming-sqlite/first-pic.jpg)

### Database Queries
#### INSERT
To insert records into your SQLite database. You need to store your **INSERT INTO** query in a string. After that, you can pass the query string to the execute.

Let’s insert three records into the **Students** table:

```python
Insert_Students ='''INSERT INTO STUDENTS(ID,NAME,AGE)
                    VALUES('1','Ahmad',20),
                          ('2','James',22),
                          ('3','Eva',19)
                 '''
cur.execute(Insert_Students)
```

To take a look at our data just click on **Browse Data** and here they are!

![](/engineering-education/python-database-programming-sqlite/second-pic.jpg)

#### SELECT
Now if we want to retrieve data after executing a SELECT statement, we have to treat the cursor as an iterator, or we can call fetchall() to get a list of the matching rows.

Here is how we call the fetchall():

```python
cur.execute('''SELECT * FROM STUDENTS''')  
result = cur.fetchall()
print(result)
```
The result will be:

```python
[(1, 'Ahmad', 20), (2, 'James', 22), (3, 'Eva', 19)]
```

Treat the cursor as an iterator:

```python
for row in cur.execute('''SELECT * FROM STUDENTS'''):
    print(row)
```

The result will be:

```python
(1, 'Ahmad', 20)
(2, 'James', 22)
(3, 'Eva', 19)
```

The SELECT statement is the most important and complex one in SQLite. Here's what you can use to make it a more specific statement:
- Use **ORDER BY** clause to sort the result set.
- Use **DISTINCT** clause to delete the duplicate rows in the results.
- Use **WHERE** clause to make a condition while fetching the data from tables.
- Use **GROUP BY** to gather data from multiple records and group the results by columns.
- Use the **HAVING** with **GROUP BY** clause in order to filter the result based on a condition.

Now let's create a complex example to get a better idea:

```python
cur.execute('''SELECT NAME FROM STUDENTS WHERE ID<3 ORDER BY AGE ASC''')  
result = cur.fetchall()
print(result)
```

The result will be:

```python
[('James',), ('Ahmad',)]
```

In that example, we are searching for names in table **students** where the **ID** is less than 3, and we used **ASC** to sort the column in ascending order(from the lowest value to the highest one).

Also, you can use **DESC** to sort the column in descending order(from the highest value to the lowest one).

### UPDATE
Updating records in SQLite is very simple. We can update the **AGE**  of the **Students** with an ID of 2 by:

```python
Update_Students ='''
                 Update students
                 set AGE=35
                 WHERE ID=2
                 '''
cur.execute(Update_Students)
```

Now, if we execute the SELECT query(SELECT * FROM STUDENTS), we can see the following result:

```python
[(1, 'Ahmad', 20), (2, 'James', 35), (3, 'Eva', 19)]
```

### DELETE
So far, we covered how to **insert** new data into a table, **update** an existing row, and **SELECT** data from a table. Sometimes, you need to delete data from a table.

Let's go over how to delete data.

As an example, try to delete the student with an ID of 3:

```python
Delete_Student = '''DELETE FROM STUDENTS WHERE id = 3'''
cur.execute(Delete_Student)
```

Now, if you take a look at the **STUDENTS** table, you’ll see that the third student has been deleted.

```python
[(1, 'Ahmad', 20), (2, 'James', 35)]
```

In the end, we have to commit our changes in the database. Not calling this method, will make anything you did after the last commit() not visible for the other database connection. So you have to make sure that you used this method before closing the connection.

```python
connection.commit()
```

Then we have to close the connection to the database by using:

```python
connection.close()
```

When the connection is closed, any transaction will be considered as an un-committed change and in the next connection to the database, a ROLLBACK will happen, which means that the database will return to the last state before the last commit.

That means you have to pay attention when starting the transactions and committing them at appropriate points without worrying about closing the connection.

### Conclusion
In this tutorial, you’ve learned how to use Python SQLite library, how to interact with it, and execute queries within a python application.
However, this is just the tip of the iceberg! In the future, you’ll learn more about SQLite library as an advanced tutorial in our [Languages](/topic/languages/) section.
