# Python Database Programming : SQLite
SQLite is a lightweight database that can provide a relational database management system with zero-configuration, In general, it is a server-less database that you can use within almost all programming languages including Python.

## Why SQLite?
- Scalability
- Concurrency
- centralization
- Control

### In this tutorial, you’ll learn how to:
- **Install** SQLite and getting started.
- **Connect** SQLite with Python.
- **Creating** Tables.
- **Perform** common database queries using a Python application.

## Install SQLite:
for **Windows** users use this command in your terminal :
```
pip install db-sqlite3
```
for **Linux** users you can use :
```
sudo apt-get install sqlite
```
we are going to use **DB Browser for SQLite**, you can download it from [here](https://sqlitebrowser.org/dl/)

You are ready to go, Let's get started!

## Connect to a Database :
After importing SQLite3 ,to connect to a database, you have to create a Connection object that represents the database using the connect() function of the sqlite3 module.
For example, the following Python program connects to the database "Database.db".
```python
import sqlite3
try:
   connection = sqlite3.connect("Database.db")
   print("Connection to SQLite DB successful")

except:
    print("Error")
```
When you connect to an SQLite database file that does not exist, SQLite automatically creates the new database for you.

## Creating Tables :
Now we are going to create a students table containing three columns **ID**(Integer),**NAME**(Chars with a max length of 20) and **AGE**(Integer)
```python
cur = connection.cursor()
Create_Students_Table ='''CREATE TABLE STUDENTS(
                          ID INT,
                          NAME CHAR(20) NOT NULL,
                          AGE INT
                         )'''
cur.execute(Create_Students_Table)   
```
A database cursor is a control structure that enables traversal over the records in a database, using the methods of it you can execute SQL statements, fetch data from the result sets, and call procedures.

**Now let's make a look at how our database looks like** 

Open **DB Browser for SQLite** then click on open database, after choosing our file "database.db" you will see what tables it contains 

![](/engineering-education/python-database-programming-sqlite/first-pic.jpg)

## Database Queries :

### INSERT 
To insert records into your SQLite database. First, you have to store your **INSERT INTO** query in a string. Then, you can pass the query string to the execute. Let’s insert three records into the **Students** table
```python
Insert_Students ='''INSERT INTO STUDENTS(ID,NAME,AGE)
                    VALUES('1','Ahmad',20),
                          ('2','James',22),
                          ('3','Eva',19)
                 '''
cur.execute(Insert_Students)
```
To take a look at our data just click on **Browse Data**

![](/engineering-education/python-database-programming-sqlite/second-pic.jpg)

### SELECT
To retrieve data after executing a SELECT statement, you can either treat the cursor as an iterator, call the cursor’s fetchone() method to retrieve a single matching row, or call fetchall() to get a list of the matching rows.

- Calling fetchall():
```python
cur.execute('''SELECT * FROM STUDENTS''')  
result = cur.fetchall()
print(result)
```
the result will be :
```
[(1, 'Ahmad', 20), (2, 'James', 22), (3, 'Eva', 19)]
```
- Treat the cursor as an iterator:
```python
for row in cur.execute('''SELECT * FROM STUDENTS'''):
    print(row)
```
the result will be :
```
(1, 'Ahmad', 20)
(2, 'James', 22)
(3, 'Eva', 19)
```
The SELECT statement is the most complex and important one in SQLite. here what you can use to make it a more specific statement:
- Use **ORDER BY** clause to sort the result set
- Use **DISTINCT** clause to query unique rows in a table
- Use **WHERE** clause to filter rows in the result set
- Use **GROUP BY** to get the group rows into groups and apply aggregate function for each group.
- Use **HAVING** clause to filter groups

Now let's create a complex example to let you get the idea 
```python
cur.execute('''SELECT NAME FROM STUDENTS WHERE ID<3 ORDER BY AGE DESC''')  
result = cur.fetchall()
print(result)
```
the result will be :
```
[('James',), ('Ahmad',)]
```
in that example we are searching for names in table students where the **ID** is less than 3, also use **ASC** or **DESC** to specify whether the values in the specified column should be sorted in ascending or descending order. The **ASC** sorts the result from the lowest value to the highest value while the **DESC** sorts the result set from the highest value to the lowest one.

## UPDATE
Updating records in SQLite is pretty straightforward. you can update the **AGE**  of the **Students** with an id of 2 by:
```python
Update_Students ='''
                 Update students
                 set AGE=35
                 WHERE ID=2
                 '''
cur.execute(Update_Students)
```
Now, if you execute the SELECT query(SELECT * FROM STUDENTS), you should see the following result:
```python
[(1, 'Ahmad', 20), (2, 'James', 35), (3, 'Eva', 19)]
```
## DELETE
You have learned how to **insert** a new row into a table, **update** existing data, and **SELECT** data from a table. Sometimes, you need to remove rows. In this case, you use SQLite **DELETE** statement.
As an example, try to delete the student with an id of 3:
```python
Delete_Student = '''DELETE FROM STUDENTS WHERE id = 3'''
cur.execute(Delete_Student)
```
Now, if you select all the records from the **STUDENTS** table, you’ll see that the Third student has been deleted.
```
[(1, 'Ahmad', 20), (2, 'James', 35)]
```
In the end we have to commit our changes in the database, this method commits the current transaction. If you don’t call this method, anything you did since the last call to commit() is not visible from other database connections. If you wonder why you don’t see the data you’ve written to the database, please check you didn’t forget to call this method.
```python
connection.commit()
```
Then we have to close the connection to the database by using :
```python
connection.close()
```
When the connection is closed explicitly by code or implicitly by program exit then any outstanding transaction is rolled back. (The rollback is actually done by the next program to open the database.) If there is no outstanding transaction open then nothing happens.
This means you do not need to worry too much about always closing the database before process exit, and that you should pay attention to transactions making sure to start them and commit at appropriate points.

## Conclusion
In this tutorial, you’ve learned how to use Python SQLite library, how to interact with it, and execute queries within a python application.
However, this is just the tip of the iceberg! In the future, You’ll learn more about SQLite library as an advanced tutorial in our [Languages](https://www.section.io/engineering-education/topic/languages/) section.
