
Certain programs might require different types of data to be accepted from the user. Whatever the aim of the program is, you'll need data structures like lists and dictionaries to store them. You will always want to save the data that users enter before they close your program. The simplest way to do this is to use the JSON module to store your data.

In this tutorial, we'll look at how to store users' data in Python using the JSON module. We shall also learn how to use the JSON module to save and read user-generated data.

### Prerequisites
Have some basic knowledge of Python programming language.

### Why store data in Python using JSON module?

 1. Enables developers to dump simple data structures to a file and afterward load that data the next time the application runs.
 2. Data can be shared between Python programs using JSON.
 3. JSON format is platform or language-independent. When you store data in JSON format, you can use them easily in other programming languages too.
 4. It's simple to learn and comes in a portable format.

### Using json.dump() 
To use `json.dump()` function import the `json` module first.

The `json.dump()` function takes two arguments:
 1. Piece of information to save (known as function arguments or the data to be saved)
 2. File object that can be used to save the information

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

```
[10, 20, 30, 70, 191, 23]
```

### Using json.load()
Let's construct a program that reads the set of numbers back into memory using `json.load()` function, considering the previous example:

```python
import json

filename = 'numbers.json'  #make sure is the same file you wrote to  
with open(filename,'r') as file_object:  #open in read mode
 numbers = json.load(file_object)#use json.load to load data and store it in the variable numbers

print(numbers)     #print the set of numbers
```

The `json.load()` function takes one argument which is the file object. 

Ensure that you read from the same file that you wrote to. Python only requires to read out of that file hence open it in *read mode*.

In the above program, the `json.load()` function loads the information stored in `numbers.json`, and then stores it in the variable *numbers*. Then we print the set of numbers:

```bash
[10, 20, 30, 70, 191, 23]
```

This is a simple technique for two programs to share data.

### How to Write JSON to a File
After importing the JSON Python module, you can write JSON onto a file. The `json.dump()` function allows writing JSON to file with no conversion.

**Example:**
In the code below, we are creating a file named `example.json` and converting a dictionary into a JSON object using the `json.dump()` method.

```python
import json
# Initializing dictionary
dic_exm ={
"name" : "Simplilearn",
"roll_no" : 1,
"cgpa" : 9.68,
"phone_num" : "1231252123"
}

with open("example.json", "w") as file_obj:
    json.dump(dic_exm, file_obj)
```

This program has no terminal output but when we open the file `example.json` file, we will see the following data:

```bash
{"phone_num": "1231252123", "cgpa": 9.68, "name": "Simplilearn", "roll_no": 1}
```

### How to read JSON file in Python
We use the `json.load` function to read a JSON file.

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
print(data)
```

The `json.load()` function is parsed the JSON file and returns the dictionary named `data`.

When we run the above code, we get the following output:

```bash
 {"name": "Felix", "Subjects": ["English", "Political Science"]}
```

### Saving and reading user-generated data
When dealing with data provided by users, storing data with JSON is helpful since if you don't save your user's data in some way, you'll lose everything when your program terminates.

Consider the following case: we ask the user to register using their first name when they execute our program, and then remember their first name and print a welcome back message.

First, let's save their first name:

```python
import json

firstname = input("Enter your first name to register? ")
filename = 'firstname.json'
with open(filename, 'w') as file_obj:
     json.dump(firstname, file_obj)
     print("Thank you for registering in our community " + firstname + "!")
```

In this program, we ask for the first name to register the user.

We use `json.dump()` to store the first name in the file `firstname.json`. 

The user will then see a notification stating that he or she has been registered.

```
Enter your first name to register? Felix
Thank you for registering in our community Felix!
```

Let's now create a new program that welcomes a user whose first name has been registered.

```python
import json

filename = 'firstname.json'
with open(filename,'r') as file_obj:
 firstname = json.load(file_obj)
 print("Welcome back, " + firstname + " Thank you for registering!")
 ```

Here we use the `json.load()` to read the data saved in `firstname.json` into the variable *firstname*. We can finally welcome them back now that we've recovered their first name:

```
Welcome back, Felix  Thank you for registering!
```


### Conclusion
In this article we have learned the following:
 - Reasons for storing data in Python using json module
 - Using json.dump() 
 - Using json.load()
 - How to Write JSON to a File
 - How to read JSON file 
 - Saving and reading user-generated data


### Further reading
For more information about the JSON module in Python, see the links below:
- [Python JSON module](https://www.askpython.com/python-modules/python-json-module)
- [Introduction to JSON module in Python](https://dyclassroom.com/python/python-json-module)