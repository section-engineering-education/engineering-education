### Introduction
For most of the projects that you work on, you are required to store data. You can use SQL or NoSQL databases with the server, which would require you to do some setup.However, in this article, we will explore on TinyDB, which is built entirely in Python and has a plethora of essential utilities for querying and editing database files.

TinyDB does not accept SQL-style queries; instead, it retrieves database files by using its python API. It is not necessary to set up a database server since everything may be accessible directly through files saved on a storage device without the need for a server connection.
### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Outline of TinyDB:](#outline-of-tinydb)
  - [Why use TinyDB](#why-use-tinydb)
  - [Why not use TinyDB](#why-not-use-tinydb)
- [Installation](#installation)
- [How to use TinyDB](#how-to-use-tinydb)
- [Inserting data in TinyDB](#inserting-data-in-tinydb)
- [Retrieving data from TinyDB data](#retrieving-data-from-tinydb-data)
- [Updating and deleting data in TinyDB](#updating-and-deleting-data-in-tinydb)
  - [Updating data in TinyDB](#updating-data-in-tinydb)
  - [Deleting data from TinyDB](#deleting-data-from-tinydb)
- [Conclusion](#conclusion)


### Outline of TinyDB:
TinyDB is a compact, document-oriented database designed fully in Python, ideal for simple personal projects. It has a nice, clean API that is simple to use.

#### Why use TinyDB
TinyDB is perfect for personal projects where you need to install some data. It is `Tiny` with less documentation. As highlighted above, it's `document oriented` meaning you can store any document like `.json`.It is written in pure Python and does not need any external server to execute. TinyDB is the best choice for small projects.

#### Why not use TinyDB
TinyDB is not the right solution if you require advanced functionality for your applications. Creating indexes for tables, for example, is one of the advanced features.

### Installation
TinyDB is simple to set up in your computer. To install, type the following command at the console.

```
pip install tinydb
```
As recently indicated, there are no external requirements, so after we've completed the installation, we're ready to start coding.


### How to use TinyDB
TinyDB is mostly used for database CRUD operations, such as 
'Create': inserting data into the database, 
'Read': Thisrefers to the process of reading or obtaining data from a database,
'Update': means to make changes to the database's data,
'Delete': This command deletes data from a database.

Now that everything is in place, we must import the TinyDB library's essential classes. We will open use the Python Terminal to assist us in our coding.
```python
from tinydb import TinyDB, Query
db = TinyDB("students_db.json")
```
After that, we're ready to start coding. The initial step in running our application is to import TinyDB and Query. The next step is to construct a TinyDB instance and provide the filename to it. This will produce a "students db.json" JSON file in which our data will be stored.


### Inserting data in TinyDB
Since we are working with `JSON` the data that we are adding will be `python Dictionary`. Let's see how we insert data into the database.
```python
>>> items = {`name`: `Kennedy`, `Course`: `Nursing`, `year`: 3}
>>> db.insert(item)
1
```
To begin, we generated a new dictionary named 'items' and set the variables of 'name,' 'Course,' and 'year' to 'Kennedy,' 'Nursing,' and '3', respectively.Then we used the `insert()` function to insert the data into the database. The `insert()` function returns the `id` `1` of the newly created object.
After running the above code, a new `JSON` file called `students_db.json` will be created. The data is entered in the way described below.

```
{"_default": {"1": {"name": "Kennedy", "Course": "Nursing", "year": 3}}}
```
`_default` is the name of the set table, and `1` is the `id` of the newly created object.
We'll use the `db.insert_multiple (items)` function to insert multiple items. Here's an illustration of how that is done.
```python
>>> items = [
... {`name`: `Catherine`, `Course`: `Law`, `year`: 4},
... {`name`: `Anthony`, `Course`: `Computer science`,`year`: 1},
... {`name`: `Caroline`, `Course`: `Education`,`year`: 3}
... {`name`: `Moris`, `Course`: `Education`,`year`: 3}
... ]
>>> db.insert_multiple(items) [2, 3, 4, 5]
```
In the above code, we built a collection of dictionaries named 'items' and added items using the 'insert multiple()' function.
The output in our `JSON` file will appear as shown below.
```
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
### Retrieving data from TinyDB data
There are several ways to retrieve data from TinyDB.
First, we'll use the `get()` function, which will return only one piece of matching data. Here's how it works.
```python
>>> db.get(Students.name == 'Catherine')
{"name": "Catherine", "Course": "Law", "year": 4}
>>> db.get(Students.name == 'Ian') 
>>> 
```
In the above second get example it does not find any names matching `Ian` in the database, therefore it returns none.

We can also retrieve data from TinyDB by using `db.search()` function. If no data matches the search, it returns an empty list.  Below is a demonstration of how to search for data in TinyDB. 
```python
>>> db.search(Students.course == 'Nursing')
[{"name": "Kennedy", "Course": "Nursing", "year": 3}]
>>> db.search( Students.year == 5 ) 
[]
>>>
```
`count()` function can also be used to get the number of documents matching our query.
```python
>>> db.count(Students.course == 'Education') 
2
>>>
```

### Updating and deleting data in TinyDB

#### Updating data in TinyDB
`update()` function is used to update data in the TinyDB database. You can change the value of an existing database field. It sends the values to be adjusted as the first parameter to the update function, followed by the query as the second.
```python
>>> db.update({'year': 5}, Students.name == 'Catherine')
[1]
>>>db.update({'course': Engineering}, Students.name == 'Caroline')
[4]
```
The above code has updated the year of `Catherine` from year `4` to year `5 and the course of `Carilone` from `Education` to `Engineering`.
We can be required to update all the data in a given database, `db.all` Method is used to update. For instance, we can set the year of all students to year `1` as shown below.
```python
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
To delete data, we use `remove()` function. If it matches the optional condition and an optional list of data `id`s matches, the data is deleted.
```python
>>> db.remove(Students.name == 'Kennedy')                              
[1]
>>> db.all()                      
[{`name`: `Catherine`, `Course`: `Law`, `year`: 1},
{`name`: `Anthony`, `Course`: `Computer science`,`year`: 1},
{`name`: `Caroline`, `Course`: `Education`,`year`: 1}
{`name`: `Moris`, `Course`: `Education`,`year`: 1}]
>>> db.remove(Students.name == 'Ian')
[]
>>> 
```
To delete everything from database we use `truncate()` function as demonstrated below.
```python
>>> db.truncate()
>>> db.all()
[]
>>>
```

### Conclusion
In this article we have learnt about TinyDB and  how to perform CRUD operations on the database. You can learn more about TinyDB [here](https://tinydb.readthedocs.io/en/latest/).


Happy coding!
