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
- **Perform** common database queries with Python application.

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
After importing SQLite3, in order to connect to a database, we have to create a connection object to represent the database by using the connect() function.
For example, the following Python program connects to the database "Database.db".

```python
import sqlite3
try:
   connection = sqlite3.connect("Database.db")
   print("Connection to SQLite DB successful")

except:
    print("Error")
```
If we are trying to connect to an SQLite database that does not exist, then SQLite will create it automatically for us.

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
A database cursor is a control structure that enables traversal over the records in a database, using the methods of it allow you to execute SQL statements, fetch data from the result sets, and call procedures.

**Now let's make a look at how our database looks like** 

Open **DB Browser for SQLite** then click on open database, after choosing our file "database.db" you will see what tables it contains 

![](https://github.com/ahmadmardeni1/Python-Database-Programming-SQLite/blob/main/DB%20Browser%20for%20SQLite%202%20(2).jpg)

## Database Queries :

### INSERT 
To insert records into your SQLite database. you have to store your **INSERT INTO** query in a string. after that, you can pass the query string to the execute. Let’s insert three records into the **Students** table
```python
Insert_Students ='''INSERT INTO STUDENTS(ID,NAME,AGE)
                    VALUES('1','Ahmad',20),
                          ('2','James',22),
                          ('3','Eva',19)
                 '''
cur.execute(Insert_Students)
```
To take a look at our data just click on **Browse Data**

![](https://github.com/ahmadmardeni1/Python-Database-Programming-SQLite/blob/main/DB%20Browser%20for%20SQLite%203.jpg)

### SELECT
Now if we want to retrieve data after executing a SELECT statement, we have to treat the cursor as an iterator, or we can call fetchall() to get a list of the matching rows.

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
The SELECT statement is the most important and complex one in SQLite. here what you can use to make it a more specific statement:
- Use **ORDER BY** clause to sort the result set
- Use **DISTINCT** clause to remove the duplicate rows in the result set.
- Use **WHERE** clause to make a condition while fetching the data from tables.
- Use **GROUP BY** to gather data from multiple records and group the results by columns.
- Use **HAVING** with **GROUP BY** clause in order to filter the result based on a condition.

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
In that example, we are searching for names in table students where the **ID** is less than 3, and we used **ASC** to sort the column in ascending order(from the lowest value to the highest one)

Also, you can use **DESC** to sort the column in descending order(from the highest value to the lowest one).

## UPDATE
Updating records in SQLite is very simple. we can update the **AGE**  of the **Students** with an id of 2 by:
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
## DELETE
so far, You have learned how to **insert** a new row into a table, **update** an existing data, and **SELECT** data from a table. Sometimes, you need to delete data from a table. Let's learn how to do it.
As an example, try to delete the student with an id of 3:
```python
Delete_Student = '''DELETE FROM STUDENTS WHERE id = 3'''
cur.execute(Delete_Student)
```
Now, if you take a look at **STUDENTS** table, you’ll see that the Third student has been deleted.
```
[(1, 'Ahmad', 20), (2, 'James', 35)]
```
In the end, we have to commit our changes in the database. Not calling this method, will make anything you did after the last commit() not visible for the other database connection. please make sure you call this method before closing the connection. 

```python
connection.commit()
```
Then we have to close the connection to the database by using :
```python
connection.close()
```
When the connection is closed then any outstanding transaction is rolled back. (The ROLLBACK statement cancels the database changes that are made by the current transaction) If there is no outstanding transaction open then nothing happens.
That means you do not need to worry too much about always closing the database before the end of the program, and you should make sure to start the transactions and commit them at appropriate points.

## Conclusion
In this tutorial, you’ve learned how to use Python SQLite library, how to interact with it, and execute queries within a python application.
However, this is just the tip of the iceberg! In the future, You’ll learn more about SQLite library as an advanced tutorial in our [Languages](https://www.section.io/engineering-education/topic/languages/) section.
