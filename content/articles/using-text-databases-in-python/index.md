---
layout: engineering-education
status: publish
published: true
url: /using-text-databases-in-python/
title: How to use Text Databases in Python
description: This tutorial will show the reader how to use text databases in Python. We will read the contents of the file we will use the `json.loads()` method and convert the JSON string to a list of dictionaries.
author: geoffrey-mungai
date: 2021-12-23T00:00:00-19:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-text-databases-in-python/hero.jpg
    alt: How to use Text Databases in Python
---
One of the main ways of storing data is by the use of a database. A database is a collection of data organized in a way that makes easier to access and manipulate.
<!--more-->
Although databases are often used to store data, they are not the only way to store data. You can store data in a structured way inside a file. The file will allow you to write and retrieve data for use in your program. Some of the most used files are **Text** files and **JSON** files.

### Using .txt file as a database
Text files are one of the most used file formats in the world today. One of the main reasons text files are used is their simplicity. Text files don't require any special software to be used. They don't even require any formatting knowledge, unlike databases.

Text files can be used to store all sorts of data. Mostly, they are used to store simple text that requires no special formatting. For example, a text file can be used to export a list of names, emails, or a combination of both.

#### Writing data to a text file using write()
In Python, reading and writing text files are supported by default and require no additional libraries.

To demonstrate how we can use a text file to store data, let's build a simple program that will store a list of employees in a text file. Create a new file `app.py` somewhere on your machine and open it on your code editor. 

Add the following code:

```python
employees = ['John', 'Mary', 'Bob', 'Jane']

file = open('employees.txt', "a")

for employee in employees:
    file.write(employee + '\n')

file.close()
```

We first create a list containing the names of employees. Then, we open a file called `employees.txt`. It's important to note that if a file with the same name already exists, items will be appended to it. If it doesn't exist, a new file will be created.

We then loop through the list and write each employee's name to the file using the `write()` method. We use the `\n` character to separate each employee's name with a new line. Finally, we close the file.

#### Writing data to a text file using writelines()
The `writelines()` method is similar to the `write()` method, only that it takes a list of strings as an argument.

To demonstrate how this works, run the code below:

```python
items = ['John', 'Mary', 'Bob', 'Jane']
employees = []

def separator(list):
    for item in list:
        item += '\n'
        employees.append(item)

separator(items)

file = open('employees.txt', "w")

file.writelines(employees)
file.close()
```

We use the `separator` function to append a newline (`/n`) to each item in the list. Then, we open a file called `employees.txt` in write mode (`w`) and write the list of employees to the file. The file is overwritten (existing content is cleared then new content is written) each time we run the program.

#### Reading data from a text file using read()
To read data from a text file, we use the `read()` method. This method returns a string containing the contents of the file.

```python
file = open('employees.txt', "r")
content = file.read()

print("content type: " + type(content).__name__ + "\n")
print(content)

file.close()
```

We open the file in read mode(`r`) and then print the content of the file. We use the `type()` method to get the type of the content. We can see that the content is a string. 

When we print the content, it is broken into multiple lines. This is due to the `\n` character that we appended when writing the file. Using the `read()` method is not the best way to read files. This is because most of the time, you need to use the file content somewhere in your program.

To fix this, we can use the `readlines()` method.

#### Reading data from a text file using readlines()
The `readlines()` method returns a list of strings, each string representing a line in the file.

```python
file = open('employees.txt', "r")
content = file.readlines()

print("content type: " + type(content).__name__ + "\n")

for line in content:
    print(line.strip())

file.close()
```

We use the `readlines` method to get a list of the lines in the file. We loop through the list printing each line. The `strip()` method removes the newline character from the end of each line. 
To use the line content in your program, you can now add the items to a list.

```python
file = open('employees.txt', "r")
content = file.readlines()

employees = []

for line in content:
    name = line.strip()
    employees.append(name)

print(employees)

file.close()
```

We loop through the list appending each line to the `employees` list. You can now use this list in your program. This implementation is quite basic. Assume you want to store objects in a text file. How would you do this?

#### Storing objects in a text file
To store objects in a text file, we need to convert them to strings before writing them to a file.

```python
employees = [
    {'name': 'John', 'age': 30},
    {'name': 'Mary', 'age': 25},
    {'name': 'Bob', 'age': 40},
    {'name': 'Jane', 'age': 45}
]

file = open('employees.txt', "a")

for employee in employees:
    string = "{name}||{age}\n".format(**employee)

    file.write(string)

file.close()
```

We first create a list of dictionaries containing the employees. Then, we loop through the list and create a string for each employee. We use the `format()` method and the `**` operator to create the string and unpack the dictionary respectively. Let's now convert this string back to its original form.

#### Reading objects from text files
To get back our original objects, we have to read the file line by line. Then, we can use the `split()` method to split the string into a list of strings.

```python
file = open('employees.txt', "r")
content = file.readlines()

employees = []

for line in content:
    name, age = line.strip().split('||')

    employees.append({'name': name, 'age': int(age)})

print(employees)

file.close()
```

We loop through the content list and split each line into two variables `name` and `age`. We then convert the two variables into a dictionary and append them to the `employees` list. You can now use this list in your program.

> To build, store and read large structures using text files, you might consider using the `pickle` module. It provides a way to serialize and deserialize Python objects for storage in files.

If using text files feels a little messy for you, you might consider using JSON files.

### Using a JSON file as a database
JSON is a human-readable data format that's easy to read and is natively supported in almost all major programming languages. In Python, we can use the `json` module to work with JSON files. The `json` module provides a simple way to read and write JSON files. JSON stores data in a key-value pair format. 

Here's an example of a JSON object:

```json
{
    "name": "John",
    "age": 30,
    "is_developer": true
}
```

To demonstrate how we can write to JSON files, run the code below:

```python
import json

employees = [
    {
        "name": "Carol",
        "age": 30,
        "is_developer": True
    },
    {
        "name": "Erastus",
        "age": 30,
        "is_developer": False
    }, {
        "name": "Eric",
        "age": 20,
        "is_developer": True
    }
]

json_obj = json.dumps(employees, indent=4)

file = open("employees.json", "w")
file.write(json_obj)

file.close()
```

We need to create the `employees` list of dictionaries. We then use the `json.dumps()` method to convert the list to a JSON string. We then write the JSON string to a file. We use the `indent=4` parameter to format the JSON string.

To read the JSON file, we use the `json.loads()` method that converts the JSON string to a list of dictionaries.

> It's necessary to use the `indent=4` parameter when writing JSON files. This will make the JSON file human-readable.

```python
import json

file = open("employees.json", "r")

content = file.read()
employees = json.loads(content)

for employee in employees:
    print(employee['name'])

file.close()
```

We open the file in read mode and read the content. We then use the `json.loads()` method to convert the JSON string to a list of dictionaries. We finally loop through the list printing the name of each employee before closing the file.

#### Updating a JSON file
To update a JSON file, we have to first read the file, update the file content, then write the updated content back to the file. Let's add a new employee to our file.

```python
import json

file = open("employees.json", "r")

content = file.read()
employees = json.loads(content)

another_employee = {
    "name": "Jeff",
    "age": 12,
    "is_developer": True
}

employees.append(another_employee)

json_obj = json.dumps(employees, indent=4)

file = open("employees.json", "w")
file.write(json_obj)

file.close()
```

We first read the contents of the file. Using the `json.loads()` method, we convert the JSON string to a list of dictionaries. We then added a new employee to the list. We finally wrote the updated employees list back to the file.

### Conclusion
Text files can serve a variety of purposes. You can use them to store simple text and even structured data. You can parse the text files to get back the structured data, for use in your program.

It's important to note that when parsing integers, you have to convert them back to integers using the `str()` method. JSON files can be used to store structured data in a human-readable format. They don't need parsing, as the `json` module provides a simple way to read and write JSON files.

It's also important to note that you can't rely on these files when working with a high-speed application. In such cases, a database would be the optimal choice.

Happy coding!

### Further reading
1. [JSON encoder and decoder - Python3 Docs](https://docs.python.org/3/library/json.html#json.JSONEncoder)
2. [Python object serialization with  Pickle- Python3 Docs](https://docs.python.org/3/library/pickle.html)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
