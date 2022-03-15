---
layout: engineering-education
status: publish
published: true
url: /python-decorators/
title: Getting Started with decorators in Python
description: This tutorial will be a brief dive into the concept of python decorators. How to use them and their advantages to programmers.
author: mia-roberts
date: 2021-08-11T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-decorators/hero.jpg
    alt: Python decorators image
---
Python decorators are a design pattern that allows the developer to modify the structure of a function without changing the functions code structure. 
<!--more-->
This concept is useful when you want to change the behavior of a function, so rather than going in and changing the entire code, you create a Python decorator which will allow you to use a single line of code to change the behavior of all different functions.

### Table of contents
- [Prerequisites](#prerequisites)
- [Understanding what decorators](#understanding-what-decorators)
- [Core pillars of decorators](#core-pillars-of-decorators)
- [Creating Python decorators](#creating-python-decorators)
- [Passing parameters to decorators](#passing-parameters-to-decorators)
- [Debugging Python decorators](#debugging-python-decorators)
- [Using multiple decorators](#using-multiple-decorators)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
Appreciating that everything in Python programming comes as an object is a key to understanding this concept. The reader should be well conversant with Python, although the explanations are simple and precise for beginners.

Besides that, you need:
- A working installation of Python on your computer.
- A code editor to try out the snippets.

### Understanding what decorators are
The concept of Python decorators is unclear to many people, even though it's simple. For this reason, you can consider Python decorators as high-level functions in Python which that takes another function as its argument and returns another function as a return value.

Python decorators show how the Python programming language packs several features in your small and beneficial package. Decorators can be applied to classes and functions to make programming fascinating. They can speed up the performance, shorten and completely change the dynamics of what the code can do.

### Core pillars of decorators
Since everything in Python is an object, functions are objects as well, and because of that, they can be assigned to variables, and the functions are accessed from the same variables to which they are assigned. 

```py
# the first function
def first_function():
    print('The first function')

x = first_function

# calling the function from the variable
x()
```

**Output:**

```bash
The first function
```

Secondly, because a function is an object, it can be nested within another function such that when the outer function is called, the inner function will be executed as well. 

```py
# Outter function
def umbrella_function():

    # inner function
    def inner_function():
        print('I am the inner function')

    # Executing the inner function inside the umbrela function.
    inner_function()

# calling the outer function calls the inner as well
umbrella_function()
```

**Output:**

```bash
I am the inner function
```

The third pillar; a function can be another function's return value because we can assign them to variables and nest them within other functions. 

```py
def umbrella_function():
   
    name = 'Mia Roberts'
    def inner_function():
        print(name)
    # return a function
    return inner_function

x = umbrella_function()

# calling the function via a variable
x()
```

**Output:**

```bash
Mia Roberts
```

Next, a function can be passed to another function as an argument, just as we could pass variables as parameters.

```py

# main function
def main_function(func):
    func()

#parameter function
def parameter_function():
    print('I am the parameter function')

# call main function passing another functions as a parameter
main_function(parameter_function)
```

**Output:**

```bash
I am the parameter function
```

### Creating Python decorators
The explanation may look abstract, but if we take an example, it will be manageable. Let's demonstrate these by writing two different functions and using them to explore the concept of Python decorators.

For instance, if we take our function above, we can decorate it as shown in the snippets below.

```py
def umbrella_function(function):
   
    name = 'Mia Roberts'
    def inner_function():
        print(name)
        function()
    return inner_function

def another_function():
    print('I am a computer science student')

x = umbrella_function(another_function)

x()
```

**Output:**

```bash
Mia Roberts
I am a computer science student
```

In the example above `umbrella_function()` was a decorator but when we say `x = umbrella_function(another_function)` the function `another_function()` got decorated and the returned function was assigned to  the variable `x`.

To decorate a function in Python, we use the `@` symbol alongside the name of the decorator function and place it immediately above the function definition. 

For instance:

```py
@umbrella_function
def another_function():
    print('I am a computer science student')
```

The above is the same as: 

```py
def another_function():
    print('I am a computer science student')

x = umbrella_function(another_function)
```

### Passing parameters to decorators
Sometimes we may need to define a decorator function that accepts parameters. We can achieve this by passing the parameters to the wrapper function, which we then pass to the function that is being decorated.

```py
def umbrella_function(function):
   
    def inner_function(args1, args2):   
        print("Arguments passed are: {0}, {1}".format(args1,args2))     
        function(args1, args2)
    return inner_function

@umbrella_function
def another_function(name, age):
   print ('So, {name} is {age} years old and she is a {occupation}'
   .format(name = name, age = age, occupation = 'programmer'))

another_function('Mia', 18)
```

**Output:**

```bash
Arguments passed are: Mia, 18
So, Mia is 18 years old, and she is a programmer
```

### Debugging Python decorators
As observed, decorators wrap functions. The original function and its parameter are all masked by the wrapper. This issue poses a challenge on debugging and calls for the need to solve this challenge. 

However, Python provides a `functools.wraps()` decorator that copies the metadata from the undecorated function to the decorated wrapper function. Let's see how to do this.

If we try to print out the metadata of the umbrella function without the `functools.wraps()`, the name of the wrapper is returned instead of the umbrella.
```py
def umbrella_function(function):
    """I am the umbrella function """
    # @functools.wraps(function)    
    def inner_function(args1, args2):  
        """Inner docs""" 
        print("Arguments passed are: {0}, {1}".format(args1,args2))     
        function(args1, args2)
    return inner_function

@umbrella_function
def another_function(name, age):
    """I am the another function """
    print('So, {name} is {age} years old and she is a {occupation}'
   .format(name = name, age = age, occupation = 'programmer'))

print(another_function.__name__)
print(another_function.__doc__)
```

**Output:**

```bash
inner_function
Inner docs
```

However, if we use the `functools.wraps()`,  the metadata becomes accessible.

```py
def umbrella_function(function):
    """I am the umbrella function """
    @functools.wraps(function)    
    def inner_function(args1, args2):  
        """Inner docs""" 
        print("Arguments passed are: {0}, {1}".format(args1,args2))     
        function(args1, args2)
    return inner_function

@umbrella_function
def another_function(name, age):
    """I am the another function """
    print('So, {name} is {age} years old and she is a {occupation}'
   .format(name = name, age = age, occupation = 'programmer'))

print(another_function.__name__)
print(another_function.__doc__)
```

**Output:**

```bash
another_function
I am another function 
umbrella_function
I am the umbrella function
```

### Using multiple decorators
Python allows the use of multiple decorators together. This process involves decorating a single function more than once with the same or different decorators.

To use several decorators, we place the decorators just above the desired function. Python automatically does the chaining of the decorators. 

```py
def umbrella_function(function):
   
    def inner_function(args1, args2):   
        print("The first argument is: {0}".format(args1))     
        function(args1, args2)
    return inner_function

def umbrella_function2(function):

    def inner_function(args1, args2):   
        print("The second argument passed is: {0}".format(args2))     
        function(args1, args2)
    return inner_function


@umbrella_function
@umbrella_function2
def another_function(name, age):
   print ('So, {name} is {age} years old and she is a {occupation}'
   .format(name = name, age = age, occupation = 'programmer'))

another_function('Mia', 18)
```

**Output:**

```bash
The first argument is: Mia
The second argument passed is: 18
So, Mia is 18 years old, and she is a programmer
```

### Conclusion
As we have seen above, Python decorators dynamically change the properties of a function, method, or class without changing the code snippet directly. Decorators ensure that your code is not redundant and may be used to write cleaner code.

Happy coding!

### Further reading
To learn more about Python decorators, consider checking out how the concept is discussed in the [Python's Decorator Library](https://wiki.python.org/moin/PythonDecoratorLibrary).

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
