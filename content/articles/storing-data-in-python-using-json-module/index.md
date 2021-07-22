---
layout: engineering-education
status: publish
published: true
url: /storing-data-in-python-using-json-module/
title: Storing Data in Python Using the JSON Module
description: In this article, we will understand how JSON module has helped in storing data in Python. We will explore different methods like dump(), dumps(), load(), loads(), and their differences.
author: felix-maina
date: 2021-07-07T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/storing-data-in-python-using-json-module/hero.jpg
    alt: Python JSON module image
---
Certain programs might require different types of data to be accepted by the user. Whatever the aim of the program is, you'll need data structures like lists and dictionaries to store them. You will always want to save the data that users enter before they close your program. The simplest way to do this is to use the JSON module to store your data.
<!--more-->
In this tutorial, we'll look at how to store data in Python using the JSON module. We shall also learn how to use the `json.dump()` and `json.dumps()` methods, `json.load()` and `json.loads()` methods, and their differences. Finally, we shall look at how to serialize and deserialize JSON to Object in Python.

### Prerequisites
Have some basic knowledge of Python programming language.

### Why store data in Python using the JSON module?
1. Enables developers to dump simple data structures into a file and load them when needed
2. Data can be shared between Python programs using JSON
3. The JSON format is platform or language-independent. When you store data in JSON format, you can use them easily in other programming languages too
4. It's simple to learn and comes in a portable format

### Using json.dump()
To use `json.dump()` function import the `json` module first. To import `json` module, use `import json`. The `json.dump()` helps writing data into a JSON file.

**Syntax:**

```python
json.dump(data, file)
```

The `json.dump()` function takes in two arguments:

1. Data that needs to be written to a JSON file.
2. A file object that can be used to save the data

Let's develop a quick program to save a set of numbers in a JSON file. To save the set of numbers, we will use the `json.dump()` function:

```python
import json

numbers = [10, 20, 30, 70, 191, 23]  #create a set of numbers
filename = 'numbers.json'          #use the file extension .json
with open(filename, 'w') as file_object:  #open the file in write mode
 json.dump(numbers, file_object)   # json.dump() function to stores the set of numbers in numbers.json file
```

In this program, we store the set of numbers in `numbers.json`. The extension `.json` shows that the file contains data in JSON format.

We then access the file in `'w'` mode (*write mode*), to make enable data to be written into a JSON file. Finally, the `json.dump()` function stores the set of numbers in the file `numbers.json` file.

This program has no terminal output, but when we open the file `numbers.json` we see the following data:

```bash
[10, 20, 30, 70, 191, 23]
```

### Using json.dumps()
The `json.dumps()` can be used for converting a Python object into a JSON string.

**Syntax:**

```python
json.dumps(data)
```

The `json.dumps()` function takes one parameter, which is the data to be converted into JSON string.

Let's have a look at the example below:

```python
import json
data = {
    'Name' : 'Felix',
    'Occupation' : 'Doctor'
}
dict_1 = json.dumps(data) # converting dictionary to JSON
print(dict_1)   # {'Name' : 'Felix','Occupation' : 'Doctor'}
```

### Difference between json.dumps() and json.dump()
1. The `dump()` method takes two parameters (data and file), while the `dumps()` method takes only one parameter (data)
2. The `dump()` method is combined with file operations, unlike the `dumps()` method.

### Using json.load()
We use the `json.load` function to read a JSON file.

The `json.load()` function takes one argument which is the file object.

**Syntax:**

```python
json.load(file_object)
```

Suppose, we have a JSON file named `student.json`, which contains JSON objects.

```bash
{
    "name": "Felix",   
    "Subjects": ["English", "Political Science"]  
}  
```

Let's write a code to read the data stored in `student.json` file using the `json.load` function.

```python
import json  
  
with open(r,'student.json') as file_object:  
  data = json.load(file_object)  
print(data)   # {"name": "Felix", "Subjects": ["English", "Political Science"]}
```

The `json.load()` function parses the JSON file and returns a dictionary named `data`.

### Using json.loads()
We use the `json.loads()` method to parse a JSON string and return a Python object such as a dictionary. The `json.loads()` method takes the file contents as a string.

**Syntax:**

```python
json.loads(json_string)
```

**Example:**

```python
import json
  
# JSON string:
dict_1 = {
    "Name": "Felix Maina",
    "Contact Number": 0712345678,
    "Email": "fely@gmail.com",
    }
  
# parse dict_1:
y = json.loads(dict_1)
# the result is a Python dictionary:
print(y)   #{ "Name": "Felix Maina", "Contact Number": 0712345678,"Email": "fely@gmail.com", }
```

Here, the string `dict_1` is parsed using `json.loads()` method which returns a dictionary named `y`.

> Note: The main  difference between `json.loads()` and `json.load()` is that `json.loads()` reads strings while `json.load()` is used to read files.

### Serializing JSON data in Python
Serialization is the process of converting a native data type to the JSON format.

The `JSON`  module converts a Python dictionary object into a JSON object. The `json.dump()` and the `json.dumps()` methods are used to serialize Python data to JSON format.

Let's take a look at an example using the `json.dump()` method:

```python
import json
# Data to be written
details = {
        "name": "Felix Maina",
        "years": 21,
        "school": "Makerere"
}
# Serializing JSON and writing JSON file
with open("details.json", "w") as file_object:
    json.dump(details, file_object)  # {"name": "Felix Maina", "years": 21, "school": "Makerere"}
```

Here, we convert a python dictionary to a JSON formatted file named `details.json`.

The `json.dumps()` method converts a Python object into a JSON string as illustrated below:

```python
import json
# Data to be written
details = {
        "name": "Felix Maina",
        "years": 21,
        "school": "Makerere"
}
# Serializing JSON
json_string = json.dumps( details )
print( json_string )  #{"name": "Felix Maina", "years": 21, "school": "Makerere"}
```

### Deserialize JSON to Object in Python
Deserialization is the process of converting JSON data into a native data type. Here, we convert JSON data back to a dictionary in Python.

We use the `json.loads()` method to deserialize JSON data to a Python object. The `json.load()` method is also used to  deserialize a JSON formatted file to a Python object.

**Example**: Deserialization using the `loads()` # importing the module

```python
# importing the module
import json
  
# creating the JSON data as a string
data = '{"Name" : "Felix", "status" : "married"}'
print("data before deserailizing")
print(data) #json string
   
# deserailizing the data
h = json.loads(data)
print("data after deserailizing")
print(h) #python dictionary
```

**Output**:

```bash
data before deserailizing
{"Name" : "Felix", "status" : "married"}
data after deserailizing
{'status': 'married', 'Name': 'Felix'}
```

Let create a file and name it `cars.json`. This file should have the following data:

```bash
 {
    "name": "Suzuki",
    "year": 2001,
    "model": "GDF10"
}
```

Now let's deserialize this file using the `load()` function:

```python
import json
# opening the JSON file 
data = open('cars.json','r') 
print("Datatype before deserialization : ")
print(data) # prints the contents of the file
     
# deserailizing the data
h = json.load(data) 
print("Datatype after deserialization : ")
print(h)  # prints a python dictionary
```

### Conclusion
In this article we have learned the following:

- Reasons for storing data in Python using the JSON module
- Using `json.dump()`, `json.dumps()` and their difference
- Using `json.load()`, `json.loads()` and their difference
- Serializing and deserializing JSON data in Python

### Further reading
For more information about the JSON module in Python, see the links below:

- [Python JSON module](https://www.askpython.com/python-modules/python-json-module)
- [Introduction to JSON module in Python](https://dyclassroom.com/python/python-json-module)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)