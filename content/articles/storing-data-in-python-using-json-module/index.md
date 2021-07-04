
Certain programs might require different types of data to be accepted from the user. Whatever the aim of the program is, you'll need data structures like lists and dictionaries to store them. You will always want to save the data that users enter before they close your program. The simplest way to do this is to use the JSON module to store your data.

In this tutorial, we'll look at how to store data in Python using the JSON module. We shall also learn how to use the `json.dump()` and `json.dumps()` methods, `json.load()` and `json.loads()` methods, and their differences. Finally, we shall look at how to serialize and deserialize JSON to Object in Python.

### Prerequisites
Have some basic knowledge of Python programming language.

### Why store data in Python using JSON module?

 1. Enables developers to dump simple data structures to a file and afterward load that data the next time the application runs.
 2. Data can be shared between Python programs using JSON.
 3. JSON format is platform or language-independent. When you store data in JSON format, you can use them easily in other programming languages too.
 4. It's simple to learn and comes in a portable format.

### Using json.dump() 
To use `json.dump()` function import the `json` module first. The `json.dump()`function is used for writing to a JSON file.

**Syntax:**

```python
json.dump(data, file)
```

The `json.dump()` function takes two arguments:
 1. Data that needs to be written to a JSON file. 
 2. File object that can be used to save the data


Let's develop a quick program to save a set of numbers in a JSON file. To save the set of numbers, we will use the `json.dump()` function:

```python
import json

numbers = [10, 20, 30, 70, 191, 23]  #create a set of numbers
filename = 'numbers.json'          #use the file extension .json
with open(filename, 'w') as file_object:  #open the file in write mode
 json.dump(numbers, file_object)   # json.dump() function to stores the set of numbers in numbers.json file
```

In this program, we store the set of numbers in the file `numbers.json`. The extension `.json` shows that the file contains data in JSON format.

We then access the file in `'w'` mode (*write mode*), to make JSON capable of writing data to a file. Finally,the `json.dump()` function stores the set of numbers in the file `numbers.json` file.

This program has no terminal output, but when we open the file `numbers.json` we see the following data:

```bash
[10, 20, 30, 70, 191, 23]
```

### Using json.dumps()
The `json.dumps()` method is used for converting a Python object into a JSON string.

**Syntax:**

```python
json.dumps(data)
```

The `json.dumps()` function takes one parameter which is the data to be converted into JSON string.

Let's have a look at the example below:

```python
import json
data = {
    'Name' : 'Felix',
    'Occupation' : 'Doctor'
}
dict_1 = json.dumps(data)
print(dict_1)   # {'Name' : 'Felix','Occupation' : 'Doctor'}
```

### Difference between json.dumps and json.dump
1. The `dump()` method takes two parameters while the `dumps()` method takes only one parameter.

2. The `dump()` method is combined with file operations unlike the `dumps()` method.

### Using json.load()
We use the `json.load` function to read a JSON file.

The `json.load()` function takes one argument which is the file object. 

**Syntax:**

```python
json.load(file_object)
```

Suppose, we have a JSON file named `student.json`, which contains JSON objects.

```bash
{"name": "Felix",   
"Subjects": ["English", "Political Science"]  
}  
```

Let's write a code to read this data stored in `student.json` file using the `json.load` function.

```python
import json  
  
with open(r,'student.json') as file_object:  
  data = json.load(file_object)  
print(data)   # {"name": "Felix", "Subjects": ["English", "Political Science"]}
```

The `json.load()` function is parsed the JSON file and returns the dictionary named `data`.


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

>Note:The main  difference between `json.loads()` and `json.load()` is that `json.loads()` used to read strings while `json.load()` is used to read files.

### Serializing JSON data in Python
Serialization is the process of converting a native data type to the JSON format. The `JSON`  module converts a Python dictionary object into JSON object. The `json.dump()` and the `json.dumps()` methods are used to serialize Python data to JSON format.

Let's take a look at an example using the `json.dump()` method:

```python
import json
# Data to be written
details = {
        "name": "Felix Maina",
        "years": 21,
        "school": "Makerere"
}
# Serializing json and  Writing json file
with open( "details.json" , "w" ) as file_object:
    json.dump( details , file_object )  # {"name": "Felix Maina", "years": 21, "school": "Makerere"}
```

Here converting a python dictionary and writing it into a JSON file named `details.json`.

The `json.dumps()` method converts a Python object into a JSON string as illustrated below:

```python
import json
# Data to be written
details = {
        "name": "Felix Maina",
        "years": 21,
        "school": "Makerere"
}
# Serializing json
json_string = json.dumps( details )
print( json_string )  #{"name": "Felix Maina", "years": 21, "school": "Makerere"}
```

### Deserialize JSON to Object in Python
Deserialization is the process of converting JSON data into a native data type. Deserialization converts JSON data into a dictionary in Python.

We use the `json.loads()` method to deserialize JSON data to a Python object. The `json.load()` method is also used to  deserialize a JSON formatted file to a Python object.

**Example**: Deserialization using the `loads()`# importing the module


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
print("Datatype before deserailization : ")
print(data) #prints the contents of the file
     
# deserailizing the data
h = json.load(data) 
print("Datatype after deserailization : ")
print(h)  #prints a python dictionary
```


### Conclusion
In this article we have learned the following:
 - Reasons for storing data in Python using json module
 - Using json.dump(), json.dumps() and their difference
 - Using json.load(), json.loads() and their difference
 - Serializing and deserializing JSON data in Python


### Further reading
For more information about the JSON module in Python, see the links below:
- [Python JSON module](https://www.askpython.com/python-modules/python-json-module)
- [Introduction to JSON module in Python](https://dyclassroom.com/python/python-json-module)