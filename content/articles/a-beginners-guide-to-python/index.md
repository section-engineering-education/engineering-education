---
layout: engineering-education
status: publish
published: true
url: /a-beginners-guide-to-python/
title: A Beginners Guide to Python
description: This article will serve as a beginners guide to Python. We will introduce the reader to the Python programming language and basic Python features like loops, variables, and classes.
author: michael-barasa
date: 2021-02-04T00:00:00-07:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-beginners-guide-to-python/hero.jpg
    alt: Python example image
---
Python is among the most popular programming languages in the world. It is ranked high in different StackOverflow programming surveys each year. This article helps beginners familiarize themselves with the basic concepts of Python. According to the official [documentation](https://www.python.org/), Python is a high-level and general-purpose programming language.
<!--more-->
### Introduction
It is a preferred programming language for many developers due to its wide range of libraries. Individuals can use these libraries to create complex applications rather than building everything from scratch. Other reasons why developers love Python is because of its simplicity, flexibility, and versatility. Today, Python is being used in upcoming fields such as machine learning and artificial intelligence.

### What you will learn
In this tutorial, you will learn how to define and use the following elements:
-  Variables
-  Methods
-  Loops
-  Lists and Arrays
-  Classes

### Prerequisites
For simplicity, we will be using IDLE (Integrated Development and Learning Environment) in this tutorial. IDLE is the default Python code editor and compiler. You can download it from [here](https://www.python.org/downloads/). Also, note that this tutorial is based on Python 3.9 rather than the 3.6 version.

### Understanding variables
Variables are simply declarations that are used to store certain values. For instance, the variable `name` can hold the value of `John Smith.` Several rules need to be considered when declaring variable names. For starters, a variable name cannot begin with a number. 

`
2name = incorrect #incorrect
`

`
name = correct  #correct
`

Variable names are case sensitive. This means that the variable `school` is not the same as `School`.

Variables can hold different data types. This includes strings, integers, Booleans, long, lists, and arrays.

In Python, we do not need to declare the data type while writing a variable. This is because the code is compiled and interpreted later. The compiler will throw an error in case there is a mismatch in the data types.

Let’s talk about the different data types.

1. Strings

Strings are usually presented in a text format. We will declare a string variable, as shown below.
```python
name = “john”
school = “Alliance Francaise”
```

When we run `print(name)`, the output will be `john`.

2. Integers

These variables hold numeric values, as shown below.
```python
math = 90
chemistry = 100
biology = 70
```

We can find the total of the variables above using the following statement.
```python
print(math+chemistry+biology)
```

The total is `260`.

A TypeError is thrown when you try to add a string to an integer, as shwon below.

```python
var1 = "30" #string
var2 = 20 #integer

print(var1+var2)#type error
```

We can sum `var1` and `var2` by converting `var1` to an integer using the `int()` function. The following code will execute successfully.

```python
var1 = "30" #string
var2 = 20 #integer

print(int(var1)+var2) # Output: 50
```

> Make sure that the variable stores a value that can be converted to an integer before using the int() method.

3. Booleans

There are only two Boolean values: `True` and `False`. In other words, something can either be true or false. We declare these values, as shown below. Please note that Python is case sensitive.

```python
isOn = True
isChecked = False
```

A `bool()` method can help convert a value to a boolean. The code snippets below showcase how a `bool()` function can be used.

```python
print(bool("abc")) #returns True
print(bool(0))  #returns False
```

The `bool()` function returns False when there are no parameters.

4. Float

This data type consists of numbers that have a decimal place. A perfect example of a float variable is highlighted below.

```python
Bmi = 45.7
```

### Understanding lists
Lists allow us to store numerous elements in a particular variable. For instance, we can have a list that stores all the student names in a class. We use `[]` to define a list.

```python
students = [] #list example
```

Elements in a list are usually separated by a comma, as shown below.
```python
students = [“john”, “Mary Thomas”, “John Smith”]
```

Each element in the above `students` list has an index. By default, the first index is 0. So the item at index [0] is `john`, while the value at index `1` is `Mary Thomas`. A list of integers will look as follows.

```python
student_marks = [90, 78, 90, 78]
```

We can access different list functionalities using built-in functions. For instance, to add a value to the `student_marks` list, we use the `append` function.

```python
student_marks.append("Guardian Angel")
print(student_marks)
```

The above function adds `Guardian Angel` at the end of the `student_marks` list. 

When we print the list it shows:
```python
#output
[90, 78, 90, 78, 'Guardian Angel']
```

We use `len(student_marks)` to determine the length of the list. We use the `remove()` function to delete something from the list. For instance, we can remove `90` from the `student_mark` list as shown below.

```python
student_marks.remove(90)
print(student_marks)
```

In lists, negative indices allow us to count elements starting from the last one. For instance, the element with an index of `-1` in the above `student_marks` list is `"Guardian Angel"`. The second last element `78` has an index of `-2`.

### Understanding functions or methods
Methods are quite critical in programming. They help store reusable code. This means that a person can call already declared methods rather than writing statements from scratch repeatedly. This saves significant time, that can be invested in other productive activities. 

In Python, we use the `def` keyword to declare a function. An example of a python method is shown below.
```python
def readData():
    print('success')
```

The above function prints `success` when it’s invoked. We can also pass data to a method, perform some calculations, and return the results. This is demonstrated in the code snippet below.

```python
def calculateTotal(chem, bio):
    return chem+bio

print(calculateTotal(90,80))
```

The `calculateTotal` method takes in two parameters (chem, bio). The function then returns the sum of the two values. It is important to take note of the data types when passing parameters. For instance, the `calculateTotal` method will not work when we pass in a string as a parameter. This is because the program cannot sum up an integer and a string. As shown above, we can call the `calculateTotal` method directly from our print statement.

```python
print(calculateTotal(90,80))
```

The `return` keyword ensures that the method returns a result after execution.

>Note that a function can also call another method. This is illustrated below.

```python
def readData(chem, bio):
    return chem+bio

def getTotal():
    print(readData(90,80)) #calls the readData method

getTotal()
```

### Understanding loops
Loops are critical because they allow us to iterate through lists, check for different conditions, and continuously execute various statements. The main loops are `for` and `while`.

1. For loops
As noted, we can use a for loop to iterate through a list, as shown below:

```python
student_list = [“John Doore”,”Matu Smith”]
for x in student_list:
    print(x)
```

The `for` loop above will print every item in the student_list.

2. While loops
A while loop can help us check for a particular condition. For instance, while something is true specific statements can be executed. Here is an example of a while loop in action.

```python
isChecked = false
while isChecked == true:
    print('Hallo there')
```

> Note that the while loop above will be executed indefinitely until isChecked is set to false. You can press ctrl+c to stop the loop.

### Classes
Classes are a vital component of object-oriented programming. When creating a class, you must use the `class` keyword. Other elements are then nested in the class. Here is an example of a Python class.

```python
class Farmer: # a class with the name farmer
    name = "John" # A variable
    produce = "1000kgs" # A variable

farmer = Farmer() #instatiating the class as an object. 
print(farmer.name) # accessing the properties of the Farmer class.
```

Classes can help as group things with similar characteristics. We can also assign values to class variables using the `init` function.

```python
class Farmer:
  def __init__(self, farmername, produce):
    self.farmername = farmername
    self.produce = produce

farmer = Farmer("Carry Sminson", "10,000kgs")

print(farmer.farmername, farmer.produce)
```

In the above `Farmer` class, the `self` keyword represents an instance of an object. In other words, it allows us to access the different methods and attributes defined in the class.

You can also declare a method in a class and use it later, as shown below.

```python
class Farmer:
  def __init__(self, farmername, produce):
    self.farmername = farmername
    self.produce = produce

  def printDetails(self): # Method
      print(self.farmername, self.produce)

farmer = Farmer("Carry Sminson", "10,000kgs")

farmer.printDetails()
```

### Conclusion
We have learned how to define and use variables, methods, classes, loops, and lists from this tutorial. You can learn more about other concepts from [here](https://docs.python.org/3/). The secret to becoming a Python expert is to regular practice.

Happy coding!

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)