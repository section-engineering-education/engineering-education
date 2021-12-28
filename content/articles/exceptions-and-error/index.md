---
layout: engineering-education
status: publish
published: true
url: /exceptions-and-error/
title: Exceptions and Error Handling in Python
description: This article will look at some significant errors in Python and how to handle them using the “try-except block”.
author: rabo-james-bature
date: 2021-12-28T00:00:00-10:40
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/exceptions-and-error/hero.jpg
    alt: Exceptions and Error Handling in Python Image
---
Over the years, Python has gained acceptance in the programming world because of its simplicity and application across diverse areas, ranging from game development to web development, data science, and cyber security.
<!--more-->
### Introduction
Though Python is simple to work with, it is not that gracious to errors. Whenever an error occurs during a program execution. The program will halt and show a “traceback” error message which includes a report about the exception raised.

Exceptions are special objects that manage errors raised during program execution; they can be handled with “try-except blocks,” which tells Python what to do when such when an error occurs.
This article will look at some significant errors in Python and how to handle them using the “try-except block”.

### Key takeaways
By the end of this article, the reader should understand exceptions and how to handle them in Python.

### Prerequisites
To better understand this article, the reader is expected to have a basic understanding of Python and be familiar with working with any code editor. In this article, the Jupyter notebook will be used. 

### Table of contents
- [Keyboard interrupt error](#keyboard-interrupt-error)
- [Python exceptions](#python-exceptions)
- [Handling exceptions](#handling-exceptions)
- [Handling multiple exceptions in one block of code](#handling-multiple-exceptions-in-one-except-block) 
- [The “Finally Block”](#the-finally-block)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

Python 3 has 63 defined built-in exceptions, with all of them arranged to form a “tree-type” of hierarchy. Some of these exceptions are general while others are concrete. The general ones include other exceptions within them while the concrete ones exist independently.

![exception_hierarchy](/engineering-education/exceptions-and-error/exception_hierarchy.png)

[Source](https://w3.cs.jmu.edu/lam2mo/cs240_2014_08/lab05-exceptions.html)

The image above shows the Python exception hierarchy.

The tree form starts from the root going up. At the top of this tree is the most general exception called the “Base exception”. After the base exception, the next ones in this hierarchy are; system exit, exception, general exit, and keyboard interrupt.  

This article will focus more on the “Exception” branch because most of the errors you will encounter in your day-to-day work with Python are from this branch. Before that, let us look at the keyboard interrupt briefly. 

### Keyboard interrupt error
The keyboard interrupt error is raised when a user hits the hot-key “ctrl-c of ctrl-z”. This error is raised no matter how much the user wants to avoid it and at any program execution stage. We will cover how to handle this error in a subsequent section.

### Python exceptions
The exception error is the branch with the most errors you will encounter often as a programmer while working with Python. This branch is subdivided into attribute error, EOR error, name error, lookup error, OS error, type-error, and value. 

Here, we will look at attribute error, name error, type-error, arithmetic error, and its branches, and then the lookup error and its branches (index error and key error). 

![The Exception branch](/engineering-education/exceptions-and-error/except.png)

The image above shows the exception branch in Python.

#### The attribute error
This error is raised when you call an attribute that a particular object or data type does not support. For example, if you call the `key()` method on a list, it will raise an attribute error because the list does not support the `key()` method. 

Instead, it is a dictionary method that returns the keys of the specified dictionary. So whenever you get an attribute error, it shows that you are using the wrong attribute on a particle data type or object.

#### The name error
Name error is raised when a wrong variable name is called. For instance,  if the name called has not been declared or when a wrong function name is called. 

This means that a variable or function can only be called or used after being created. This error can also be raised when you define a variable in a local scope and try to access it in the global scope.  
 
```python
Names  =  [“James”, “Peter”, “June”, “Jane”] 
names.lower()
```

![Name Error](/engineering-education/exceptions-and-error/nameerror.jpg)

The image above shows a name error received when using the wrong variable name. You will get a **name error** when you run the code above because the list created was stored in variable “Names”, not “names”. Python is case sensitive, so it sees “Names” and “names” as two different variables, with one declared the other undeclared.
 
![Local and variable scope](/engineering-education/exceptions-and-error/local.jpg)


In the above image, we got a name error because the variable called was declared within a function, and we tried to access it outside the function, which is not allowed in Python. 

### Type error
A type error is raised when you try to perform an operation not supported by an object or function. 

```python
name = “James”
Name / 2
```

We assigned **James**  to the variable name in the code above and performed a division operation. Unfortunately, we will get a “TypeError” because “name” is a string that does not support that division type of operation. 

![Type error](/engineering-education/exceptions-and-error/type.jpg)

The image above shows the type error message.

#### Arithmetic error
The arithmetic error occurs when an error is encountered during numeric calculations in Python. This includes Zerodivision Error and Floating point error. In addition, zero division error is raised when you divide a numeric value by zero. 
 
```python
number  = 6
ZeroErro = 6 / 0
```

When we run this code, we will get a ZeroDivision error. In mathematics, this is said to be undefined.

![ZeroDivisionError](/engineering-education/exceptions-and-error/zero.jpg)

#### Lookup error
Lookup error is the base class for key error and index error. The key error is raised when a wrong key is used to access a dictionary value, i.e., using a key that is not in the dictionary. This error means that the key you use to access a dictionary is wrong. 

```python
 gender = { “June’ : “female”, “John” : “male” , “Kim”: “female”}
 gender(“James”)
```

![KeyError](/engineering-education/exceptions-and-error/key.jpg)

In the example above, we passed the name “James” to obtain James’ gender, and this will return a key error because the key used was not found in the dictionary. The index error is raised when you try to access a sequence (index) of a list that does not exist or is out of range. 

```python
name  = [“James”, “Peter”, “Max”, “Brown”]
print(name[4])
```

You will get an index error when you run this code because “4” is out of range. Though there are four items in the list we created, Python starts indexing from zero to show how far a list item is from the beginning of the list. 

![Index error](/engineering-education/exceptions-and-error/index.jpg)

### Handling exceptions
In the first part of this article, we covered some exceptions; though these are not all the exceptions in Python, they are commonly encountered. In the second part of this article, we will discuss how to handle these exceptions in a Python program such that the program will continue running when these errors are encountered. 
 
To handle exceptions, Python has four major defined components: Try, except, else, and finally.

![The try-except bl0ck](/engineering-education/exceptions-and-error/try.png)

[Source](https://www.datacamp.com/community/tutorials/exception-handling-python)

The image above shows how the four components are used in exception handling.

1. Try: The try block specifies the code to “try” for an exception.
2. Except: With the except, you specify the expected exception that you want your try block to search for and the message you want to be displayed should this be caught.
3. Else: This block contains code that you will want to execute if the except block fails to catch an exception. Consider this a fall backplane/code.
4. Finally: This code block is executed irrespective of what happens in the above blocks. 

Using the steps above, we will detail how to handle some specific exceptions in Python. 

### Lookup error

```python
try:
      details =  [{'name':'James', 'gender':'male','age': 23},
                 {'name' : 'Peter','gender': 'male', 'age': 35},
                 {'name':'Jane', 'gender' : 'female', 'age':29}]
except  LookupError:
    print('Wrong key used')
else:
    print(‘Thank you’)

```

In the code block above, we used the LookupError exception, the base exception for key and index errors. Therefore, if any exceptions are encountered, **except** block will be executed. Likewise, the **else** block will be executed if none of them are encountered. 

Using a general or base exception is a disadvantage because you will not know which specific error was captured. For example, if we try to access the dictionary using the wrong key in the code above, we get that error and access it using the wrong index. We will get the same error as shown below. 

```python
 details[1]['location']
```

In the code above, we tried to access the dictionary, which contains a list of workers’ personal information. However, the index is right, but the key is wrong hence the exception message will be printed. Also, if we provide the wrong index but the right key, the same exception will be printed. 
To have these exceptions handled separately, we use the specific exceptions in our except block like this: 

```python
try:
      details =  [{'name':'James', 'gender':'male','age': 23},
                 {'name' : 'Peter','gender': 'male', 'age': 35},
                 {'name':'Jane', 'gender' : 'female', 'age':29}]
except  KeyError:
    print('Wrong key used')
else:
    print(‘Thank you’)

```

When you run this code and provide a wrong key, the except block will capture it and be executed, but if you provide a wrong index, the else block will be executed. 

```python
try:
    countries = [“USA”, “China”, “UK”, “Nigeria”,” South Korea”]
except  IndexError:
    print(“wrong Index used”)
else:
    print(“You are welcome”)
```

Whenever a wrong index is used, the program will print “wrong index used”. 
 
### Working with multiple exceptions in one block of code
Python provides you with multiple exceptions within a single block of code. This simplifies your work and avoids unfavorable code growth in your program. 

```python
try:
  :
except  first exception:
  :
except second exception:
  :
except: 
```

If the try block encounters an exception as specified in the first except block, that block will handle it. Likewise, the “except second exception” will handle it if it raises the second exception. However, if the exception raised was not specified by either of these blocks, the last block will be executed. Though this block is optional, it is essential. 

```python
try:
    first_number = int(input(“Enter the first number:”))
    second_number = int(input(“Enter the second number:”))
    sum = first_number + second_number
    division =  first_number / second_number
except ZeroDivisionError:
    print(“You can not divide by zero”)
except ValueError:
    print(“Please enter an integer value, not an alphabet or any special character”)
except :
    print(“An error occurred”)
print(“Goodbye”)
```

When the interpreter encounters an exception, it goes through the except blocks, and when it finds a matching exception, it executes that particular “except block”. 

If you input “0” as your second number in the code above, the first except block is executed, and the remaining blocks are skipped.

### Handling multiple exceptions in one except block 
In Python, you can have one except block to handle multiple exceptions at once. The problem with this method is that the “print message” is the same for all exceptions making it difficult to know which error was raised.  

```python
try:
    first_number = int(input(“Enter the first number:”))
    second_number = int(input(“Enter the second number:”))
    sum = first_number + second_number
    division =  first_number / second_number
except( ZeroDivisionError, ValueError):
    print(“ Sorry, an error was encountered”)
except:
    print(“An error occurred”)
print(“Goodbye”)
```

If any of the exceptions listed within the parenthesis is encountered, the print statement within the except block will be executed, if the exception encountered is not among the listed exceptions, the last **except** block will be executed, and if there is no exception in the **try** block, the last **print** statement will be executed. 

### The finally block
Optionally, Python provides you with a “finally block”. This block is executed no matter the outcome of the **try block**. Meaning whether the interpreter **captured the exceptions raised by your interpreter try block** or not, the **finally block** will be executed. 

```python
try:
    first_number = int(input(“Enter the first number:”))
    second_number = int(input(“Enter the second number:”))
    sum = first_number + second_number
    division =  first_number / second_number
except ZeroDivisionError:
    print(“You can not divide by zero”)
except ValueError:
    print(“Please enter an integer value, not an alphabet or any special character”)
except :
    print(“An error occurred)
finally:
   print(“You are welcome”)
```

Whether or not an exception was captured in the code above, the print statement “You are welcome” will be printed.

### Conclusion
Murphy’s law states that anything that will go wrong, will go wrong. This is true for Python because it is not gracious to errors. It is important to know how to handle these errors as it is impossible to avoid all of them. This article covers some of the primary exceptions in Python and how to handle them. 

Happy learning!

### Further reading
- [Python KeyError](https://realpython.com/python-keyerror/)
- [ How to access a dictionary key value present inside a list](https://stackoverflow.com/questions/6521892/how-to-access-a-dictionary-key-value-present-inside-a-list?newreg=d4d7b888275840f38d28f2c2d191f38e)
- [Python - Error types](https://www.tutorialsteacher.com/python/error-types-in-python)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
