### Introduction
For most of the projects that you work on, you are required to store data. You can use SQL or NoSQL databases with the server, which would require you to do some setup.However, in this article, we will explore TinyDB, which is built entirely in Python and has a plethora of essential utilities for querying and editing database files.

TinyDB does not accept SQL-style queries; instead, it retrieves database files using its Python API. It is not necessary to set up a database server since everything may be accessible directly through files saved on a storage device without the need for a server connection.

### Prerequisites: 
- Basic Python Knowledge
- Basic JSON understanding
- Basic Database understanding

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Outline of TinyDB:](#outline-of-tinydb)
  - [Why use TinyDB](#why-use-tinydb)
  - [Why not use TinyDB](#why-not-use-tinydb)
- [Installation](#installation)
- [How to use TinyDB](#how-to-use-tinydb)
- [Inserting data in TinyDB](#inserting-data-in-tinydb)
- [Getting data from TinyDB data](#getting-data-from-tinydb-data)
- [Updating and deleting data in TinyDB](#updating-and-deleting-data-in-tinydb)
  - [Updating data in TinyDB](#updating-data-in-tinydb)
  - [Deleting data from TinyDB](#deleting-data-from-tinydb)
- [Conclusion](#conclusion)

### Outline of TinyDB
TinyDB is a compact, document-oriented database designed fully in Python, ideal for simple personal projects. It has a nice, clean API that is simple to use.

#### Why should you use TinyDB?
TinyDB is perfect for personal projects where you need to install some data. It is `Tiny` with less documentation. As highlighted above, it's `document oriented` meaning you can store any document like `.json`.It is written in pure Python and does not need any external server to execute. TinyDB is the best choice for small projects.

#### Why not use TinyDB?
TinyDB is not the right solution if you require advanced functionality for your applications. Creating indexes for tables, for example, is one of the advanced features.

### Installation
TinyDB is simple to set up on your computer. To setup, use the command prompt to execute the following command:
```python
pip install tinydb
```
As recently indicated, there are no external requirements, so after we've completed the installation, we're ready to start coding.

### How to use TinyDB
TinyDB is mostly used for database CRUD operations, such as
'Create': inserting data into the database,
'Read': This refers to the process of reading or obtaining data from a database,
'Update': means making changes to the database's data,
'Delete': This command deletes data from a database.
Now that everything is in place, we must import the TinyDB library's essential classes.We will utilize the Python Terminal to help us in our coding.
```python
from tinydb import TinyDB, Query
db = TinyDB("students_db.json")
```
After that, we're ready to start coding. The initial step in running our application is to import TinyDB and Query. The next step is to construct a TinyDB instance and provide the filename to it. This will produce a "students db.json" JSON file in which our data will be stored.

### Inserting data in TinyDB
Since we are working with `JSON` the data that we are adding will be `python Dictionary`. Let's look at how we go about inserting data into the database.
```python
# inserting only one data in the database
>>> items = {`name`: `Kennedy`, `Course`: `Nursing`, `year`: 3}
>>> db.insert(item)
# function of the newly created object
1
```
To begin, we generated a new dictionary named 'items' and set the variables of 'name,' 'Course,' and 'year' to 'Kennedy,' 'Nursing,' and '3', respectively. The data was then inserted into the database using the 'insert()' function. The 'id 1' of the newly generated object is returned by the 'insert()' function.
After running the above code, a new `JSON` file called `students_db.json` will be created. The data is entered in the way described below.

```json
{"_default": {"1": {"name": "Kennedy", "Course": "Nursing", "year": 3}}}
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
In the above code, we built a collection of dictionaries named 'items' and added items using the 'insert multiple()' function.
The output in our `JSON` file will appear as shown below.
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
First, we'll use the `get()` function, which will return only one piece of matching data. Here's how it works.
```python
# searching data using get() function
>>> db.get(Students.name == 'Catherine')
{"name": "Catherine", "Course": "Law", "year": 4}
# searching none existance data 
>>> db.get(Students.name == 'Ian') 
>>> 
```
In the above second example, it does not find any names matching `Ian` in the database, therefore it returns none.

We can also retrieve data from TinyDB by using `db.search()` function. If no data matches the search, it returns an empty list. Below is a demonstration of how to search for data in TinyDB. 
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
`update()` function is used to update data in the TinyDB database. You can change the value of an existing database field. It sends the values to be adjusted as the first parameter to the update function, followed by the query as the second.
```python
# updating data in the database 
>>> db.update({'year': 5}, Students.name == 'Catherine')
[1]
>>>db.update({'course': Engineering}, Students.name == 'Caroline')
[4]
```
The above code has updated the year of `Catherine` from year `4` to year `5` and the course of `Carilone` from `Education` to `Engineering`.
We can be required to update all the data in a given database, `db.all` method is used to update all the data. For instance, we can set the year of all students to year `1` as shown below.
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
To delete data, we use `remove()` function. The data is removed if it matches the optional condition and an optional list of data'id's.
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
To delete everything from the database, we use the `truncate()` function as demonstrated below.
```python
# deleting all data in the database using truncate() function
>>> db.truncate()
>>> db.all()
# output
[]
>>>
```
Every CRUD operation shown above is demonstrated with its corresponding operations, which are simple and clear to understand. The learner is able to run the code and generate output without much struggle.

The complete code is available [here] (https://github.com/cathy-254/getting-started-with-tinydb-in-python).

### Conclusion
We learned about TinyDB and how to conduct CRUD operations on the database in this article. More information about TinyDB can be found [here] (https://tinydb.readthedocs.io/en/latest/).

Happy Coding!
