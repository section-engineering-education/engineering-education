---
layout: engineering-education
status: unpublish
published: false
url: /object-oriented-programming-in-python/
title: Object Oriented Programming in Python
description: This tutorial would guide the reader about object-oriented programming principles using the python programming language.
author: joseph-abiola
date:
topics: [Languages]
excerpt_separator: <!--more-->
images:
    - url: /engineering-education/object-oriented-programming-in-python/hero.jpg
      alt: OOP Python example image
---

Many modern languages like Java, C# are object-oriented or have support for using the object-oriented programming (OOP) paradigms. Python is not exempted.

In this tutorial, you'll learn how to use object-oriented programming concepts with Python. OOP is a technique that can be used for structuring your code. Its philosophy is that it creates reusable objects from a class that shares some similarities. These objects can also have some peculiarities about them or share similarities with other objects. In addition, they can also inherit additional properties from another class. The power of using this paradigm is when you're working on a medium to a large project. This technique's clearer when an example is considered which will be shown below.

OOP became popular because of its way of reusing code, therefore, avoiding duplicated business logic.

### Table of contents
- [Prerequisites](#prerequisites).
- [Project Overview](#project-overview).
- [Class Definition](#class-definition).
- [Attributes and Methods](#attributes-and-method).
- [The \__init__() Method](#the-init-method).
- [Getters and setters](#getters-and-setters).
- [Inheritance](#inheritance).
- [Method Overriding](#method-overriding).
- [Conclusion](#conclusion).

### Prerequisites
Python should be installed on your local machine. I recommend at least from version `3.7` or newer.

Some knowledge of Python is also required.

### Project overview
For this tutorial, you'll be creating a `University` class and a `College` class with methods and attributes which can be seen below.

This project will be helpful in explaining most of the OOP principles found in the Python programming language.

At the end of this tutorial, we will have the following code. The code can be ignored for now.

```python
class University():

    def __init__(self, location):
        self.location = location

    def getLocation(self):
        print(self.location)

    def setLocation(self, location):
        self.location = location

    def sayHello(self):
        print("Hello World")

class College(University):

    def __init__(self, location, founded):
        self.founded = founded
        super().__init__(location)

    def sayHello(self):
        print("Hello")
```

Other concepts covered in this guide are `inheritance`, `getters`, `setters` and `method overiding`. However, let's take a look at what a class definition is.

### Class definition
A class can be referred to as the blueprint for an object. It serves as the underlying structure from which we can build an object.

From the example above given in the project overview, we have a class with the name `University`. From this class, we can then create separate objects from it.

```python
class University():  # creating a class (class definition)
    pass

## Creating several object from a class
Harvard = University()
MIT = University()
```

Right now, the class is empty. However, the power of using techniques like this will be seen when we start adding attributes and methods to our class.

### Attributes and methods
Attributes can serve as properties for a given class. For example, our `University` class can have several attributes that we can use to identify a University (name, founded, location).

In addition, methods can serve as functions for a given class. A function is used to perform a particular task repeatedly.

```python
class University():

    # Attributes
    location = "United Kingdom"

    # methods
    def sayHello():
        print("Hello World")
```

#### What's happening here?
1. We added three attributes to our `University` class (name, founded, and location).
2. We also added a method called `sayHello` to the `University class`.

> We can also pass attributes inside the method.

Let's create two objects from the class `University`.

```python
Harvard = University()
Cambridge = University()

print(Harvard.location)
print(Cambridge.location)

# calling a method from an object
Harvard.sayHello()
```

__Output:__

```
United Kingdom
United Kingdom
Hello World
```

Notice that by printing the `location`, it prints out `United Kingdom` for both objects. This is quite limited, `Harvard` is not located in `United Kingdom`. It would be nice if we could uniquely give an attribute to each object of a class.

This can be possible using the `__init__` method which we'll be considering in the next section. 

### The \__init__() method
The `__init__` method is used to instantiate an object with unique attributes, the first parameter inside this method must start with a `self` keyword. This method is called immediately a new object is created.

```python
class University():

    def __init__(self, location):
        self.location = location

Harvard = University("United States")
Cambridge = University("United Kingdom")

print(Harvard.location)
print(Cambridge.location)
```

__Output:__

```
United States
United Kingdom
```

Using the `__init__` method, each of the object we create has its own unique attribute.

However, we have to pass this attribute inside the object while creating it, as seen above. Also, the `__init__` method are referred to as __magic methods__, other magic methods include `__str__`, `__len__` among others.

### Getters and setters
The recommended way of accessing and modifying attributes or properties in an object is by using `getters` and `setters`. In this section, we'll be discussing them with examples.

```python
class University():

    def __init__(self, location):
        self.location = location

    def getLocation(self):
        print(self.location)

    def setLocation(self, location):
        self.location = location

    def sayHello():
        print("Hello World")

```

### What's happening here?
1. We created a method called `getName`. This method serves as a `getter` method in accessing the location attribute from an object.
2. We created a method called `setName`. This method serves as a `setter` method in modifying the location attribute from an object.

We can now create two objects from the class `University`.

```python
Harvard = University("United States")

Harvard.getLocation()
Harvard.setLocation("Africa")
Harvard.getLocation()
```

__Output:__

```
United States
Africa
```

### Inheritance
Inheritance is a very fundamental concept that makes using the object-oriented programming approach very powerful.

The basic ideology about inheritance is that we have a **base** or **parent** class, and another class which we usually refer to as a **child** or **derived** class can thereby inherit some properties and methods from the base class.

This is very useful if the child class shares some characteristics with the parent class.

For instance:

```python
class University():

    def __init__(self, location):
        self.location = location

    def getLocation(self):
        print(self.location)

    def setLocation(self, location):
        self.location = location


class College(University):
    def __init__(self, location, founded):
        self.founded = founded
        super().__init__(location)


college_of_medicine = College('Africa', '1980')

college_of_medicine.getLocation()
```

**Output:**

```
Africa
```

> You can also inherit from multiple classes.

#### What's happening here?
We created a child class called `College` which inherits from the `University` class.

Take note of the `super` method, this is very important when we want to have access to the attributes of the parent class from the child class.

### Method overriding
The child class in retrospect can also have things unique to it, therefore we can also override the parent method either to modify it or completely change it.

```python
class University():

    def __init__(self, location):
        self.location = location

    def getLocation(self):
        print(self.location)

    def setLocation(self, location):
        self.location = location

    def sayHello(self):
        print("Hello World")


class College(University):
    def __init__(self, location, founded):
        self.founded = founded
        super().__init__(location)

    def sayHello(self):
        print("Hello")


college_of_medicine = College('Africa', '1980')

college_of_medicine.sayHello()
```

__Output:__

```py
Hello
```

#### What's happening here?
The `College` class which inherits from the parent class `University` modifies the `sayHello` function.

### Conclusion
In this tutorial, you were introduced to the world of object-oriented programming in Python.

The concepts covered included `attributes`, `methods`, `inheritance`, `getters` and `setters` among others.

Happy coding!

---
Peer Review Contributions by:
