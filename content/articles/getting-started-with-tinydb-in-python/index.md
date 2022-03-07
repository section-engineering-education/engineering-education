---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-tinydb-in-python/
title: How to Get Started with TinyDB in Python
description: This tutorial will walk you through how to get started with TinyDB in Python. With TinyDB there is no need to set up a database server since everything is accessible directly through files saved on a storage device.
author: catherine-karimi
date: 2022-03-07T00:00:00-16:55
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-tinydb-in-python/hero.jpg
    alt: TinyDB in Python Hero Image
---
In this article, we will learn about TinyDB, which is built entirely in Python and has a plethora of essential utilities for querying and editing database files.
<!--more-->
As a developer, most of the projects you may work on will require you to store data. TinyDB does not accept SQL-style queries, instead it retrieves the database files using a Python API. 

There's no need to set up a database server since everything is accessible directly through files saved on a storage device without the need for a server connection.

### Prerequisites
To follow along with this tutorial, the reader will need the following:
- A basic Knowledge of Python.
- A basic Knowledge of JSON.
- Have an understanding of databases.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [What is TinyDB?](#what-is-tinydb)
- [Advantages of TinyDB](#advantages-of-tinydb)
- [Disadvantage of TinyDB](#disadvantage-of-tinydb)
- [Installation of TinyDB](#installation-of-tinydb)
- [How to use TinyDB](#how-to-use-tinydb)
- [Inserting data in TinyDB](#inserting-data-in-tinydb)
- [Getting data from TinyDB](#getting-data-from-tinydb)
- [Updating and deleting data in TinyDB](#updating-and-deleting-data-in-tinydb)
  - [Updating data in TinyDB](#updating-data-in-tinydb)
  - [Deleting data from TinyDB](#deleting-data-from-tinydb)
- [Conclusion](#conclusion)

### What is TinyDB?
TinyDB is a compact, document-oriented database designed in Python. It has a nice and clean API that is simple to use, it is also good for building simple personal projects. 

### Advantages of TinyDB?
- It is perfect for personal projects where you need to install some data. 
- It is `Tiny` with less documentation. 
- It is `document oriented` meaning you can store any file with `.json` extension. 
- TinyDB is written entirely in Python and does not require the use of an external server to run. 
- It is the best choice for small projects.

### Disadvantage of TinyDB?
TinyDB is not the right choice for building advanced features for your application, such as creating indexes for tables.

### Installation of TinyDB
TinyDB is easy to set up on your computer. Open your the command prompt and run:

```bash
pip install tinydb
```

After you have completed the installation, you're ready to start coding.

### How to use TinyDB
TinyDB is mostly used for database CRUD operations, such as:
- **Create:** inserting data into the database.
- **Read:** this refers to the process of reading or obtaining data from a database.
- **Update:** to make changes to the database's data.
- **Delete:** to delete data from a database.

Now that everything is in place, we must import the TinyDB library's essential classes. We will utilize the Python Terminal to help us in our coding.

```python
from tinydb import TinyDB, Query
db = TinyDB("students_db.json")
```

With the code above you've just imported TinyDB and Query. 

Next, construct a TinyDB instance and provide the name of the file to it. This will generate a `students db.json` file where our data will be stored.

### Inserting data in TinyDB
Since we are working with "JSON", the data that we will be adding is a "python Dictionary". Let's look at how we go about inserting data into the database.

```python
# inserting only one data in the database
>>> items = {`name`: `Kennedy`, `Course`: `Nursing`, `year`: 3}
>>> db.insert(item)
# function of the newly created object
1
```

To begin, we generated a new dictionary named 'items' and set the variables of 'name,' 'Course,' and 'year' to 'Kennedy,' 'Nursing,' and '3', respectively. The data is then inserted into the database using the `insert()` function. 

The 'id 1' of the newly generated object is returned by the 'insert()' function.
After running the above code, a new "JSON" file called `students_db.json` will be created. The data is entered in the way described below.

```json
{ 
  "_default": {
   "1": {"name": "Kennedy", "Course": "Nursing", "year": 3}
   }
 }
```

`_default` is the name of the set table, and `1` is the `id` of the newly created object.

We'll use the `db.insert_multiple (items)` function to insert multiple items. Here's an illustration of how that is done.

```python
# inserting multiple data in the database
>>> items = [
... {`name`: `Catherine`, `Course`: `Law`, `year`: 4},
... {`name`: `Anthony`, `Course`: `Computer science`,`year`: 1},
... {`name`: `Caroline`, `Course`: `Education`,`year`: 3}
... {`name`: `Moris`, `Course`: `Education`,`year`: 3}
... ]
# function to use for multiple data
>>> db.insert_multiple(items) [2, 3, 4, 5]
```

In the code above, we built a collection of dictionaries named `items` and added items using the `insert multiple()` function.

The output in our "JSON" file will appear as shown below.

```json
{
  "_default": {
  "1": { "name": "Kennedy", "Course": "Nursing", "year": 3},
  "2": { "name": "Catherine", "Course": "Law", "year": 4 },
  "3": { "name": "Anthony", "Course": "Computer science","year": 1},
  "4": { "name": "Caroline", "Course": "Education","year": 3}
  "5": { "name": "Moris", "Course": "Education","year": 3}
  }
}
```

### Getting data from TinyDB
TinyDB data can be recovered in various ways.

We'll use the `get()` function, which will return only one piece of matching data. Here's how it works.

```python
# searching data using get() function
>>> db.get(Students.name == 'Catherine')
{"name": "Catherine", "Course": "Law", "year": 4}
# searching none existance data 
>>> db.get(Students.name == 'Ian') 
>>> 
```

Here, it does not find any names matching `Ian` in the database, therefore it returns none.

We can use the `db.search()` function to retrieve data. If no data matches the search, it gives you an empty list as a result. Below is a demonstration of how to search for data in TinyDB. 

```python
# searching data using search() function
>>> db.search(Students.course == 'Nursing')
[{"name": "Kennedy", "Course": "Nursing", "year": 3}]
>>> db.search( Students.year == 5 ) 
[]
>>>
```

To get the number of data that matches our query, we can use the `count()` function.

```python
# searching matching data using count() function
>>> db.count(Students.course == 'Education') 
2
>>>
```

### Updating and deleting data in TinyDB
#### Updating data in TinyDB
The `update()` function is used to update data in the TinyDB database. You can change the value of an existing database field. It sends the values to be adjusted as the first parameter to the update function, followed by the query as the second.

```python
# updating data in the database 
>>> db.update({'year': 5}, Students.name == 'Catherine')
[1]
>>>db.update({'course': Engineering}, Students.name == 'Caroline')
[4]
```

The above code has updated the year of `Catherine` from year `4` to year `5` and the course of `Carilone` from `Education` to `Engineering`. We can be required to update all the data in a given database, `db.all` method is used to update all the data. For instance, we can set the year of all students to year `1` as shown below.

```python
# updating all data in the database using all() function
>>> db.update({'year': 1}) 
[1, 2, 3, 4, 5]
>>> db.all()
{`name`: `Kennedy`, `Course`: `Nursing`, `year`: 1}
{`name`: `Catherine`, `Course`: `Law`, `year`: 1},
{`name`: `Anthony`, `Course`: `Computer science`,`year`: 1},
{`name`: `Caroline`, `Course`: `Education`,`year`: 1}
{`name`: `Moris`, `Course`: `Education`,`year`: 1}
```

#### Deleting data from TinyDB
To delete data, we use `remove()` function. The data is removed if it matches the optional condition and an optional list of the data's id.

```python
# deleting data in the database using remove() function
>>> db.remove(Students.name == 'Kennedy')                              
[1]
>>> db.all() 
# output                     
[{`name`: `Catherine`, `Course`: `Law`, `year`: 1},
{`name`: `Anthony`, `Course`: `Computer science`,`year`: 1},
{`name`: `Caroline`, `Course`: `Education`,`year`: 1}
{`name`: `Moris`, `Course`: `Education`,`year`: 1}]
>>> db.remove(Students.name == 'Ian')
[]
>>> 
```

To delete everything from the database, use the `truncate()` function as shown below.

```python
# deleting all data in the database using truncate() function
>>> db.truncate()
>>> db.all()
# output
[]
>>>
```

Every CRUD operation shown above is demonstrated with its corresponding example, which is simple and clear to understand.

The complete code is available [here](https://github.com/cathy-254/getting-started-with-tinydb-in-python).

### Conclusion
In this tutorial, we learned about TinyDB and how to perform CRUD operations on the database. [Here](https://tinydb.readthedocs.io/en/latest/) is where you can learn more about TinyDB.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
