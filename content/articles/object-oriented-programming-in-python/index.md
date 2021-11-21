---
layout: engineering-education
status: publish
published: true
url: /object-oriented-programming-in-python/
title: Object Oriented Programming in Python
description: This article will show the reader how to implement object-oriented programming in Python. We will create a simple project to demonstrate these concepts.
author: joseph-abiola
date: 2021-11-04T00:00:00-02:30
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/object-oriented-programming-in-python/hero.jpg
    alt: Object-oriented Programming Python Hero Image
---
In this tutorial, you will learn how to use object-oriented programming (OOP) concepts in Python. OOP is a technique that developers use to structure code.
<!--more-->
Modern languages like Java and C# support object-oriented programming (OOP) paradigms. This functionality is also available in Python.

Object-oriented programming creates reusable objects from a class. These objects can also have unique features or share similarities with other classes.

The OOP paradigm is quite important when working on large projects. It allows one to reuse code, save time, and minimize boilerplate.

### Table of contents
- [Prerequisites](#prerequisites)
- [Project Overview](#project-overview)
- [Class Definition](#class-definition)
- [Attributes and Methods](#attributes-and-methods)
- [The __init__() Method](#the-init-method)
- [Getters and setters](#getters-and-setters)
- [Inheritance](#inheritance)
- [Method Overriding](#method-overriding)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you need:
- Python installed on your local machine. I recommend version `3.7` or newer.
- Some basic knowledge of Python.

### Project overview
In this tutorial, you'll be creating `University` and `College` classes with several methods and attributes.

This project will help explain most of the OOP principles found in the Python programming language.

At the end of this tutorial, we will have the following code:

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

Other concepts covered in this guide are `inheritance`, `getters`, `setters`, and `method overriding. However, let's first take a look at the class definition.

### Class definition
A class can be referred to as the blueprint for an object. It serves as the underlying structure from which we can build an object.

In the above example, we have a class with the name `University`. We can create separate objects from this class.

```python
class University():  # creating a class (class definition)
    pass

## Creating several object from a class
Harvard = University()
MIT = University()
```

Currently, the class is empty. However, we will see the power of using this technique when we start adding attributes and methods to our class.

### Attributes and methods
Attributes can serve as properties for a particular class. For example, our `University` class can have attributes such as `name`, `founded`, `location`.

Methods can also be added to a class. They help in performing specified tasks repeatedly.

```python
class University():

    # Attributes
    location = "United Kingdom"

    # methods
    def sayHello():
        print("Hello World")
```

In the above code:
1. We added three attributes to our `University` class. These are `name`, `founded`, and `location`.
2. We also added a method called `sayHello` to the `University class`.

> We can also pass attributes inside the method.

Let's create two objects from the `University` class:

```python
Harvard = University()
Cambridge = University()

print(Harvard.location)
print(Cambridge.location)

# calling a method from an object
Harvard.sayHello()
```

__Output:__

```bash
United Kingdom
United Kingdom
Hello World
```

Notice that by printing the `location`, it prints out `United Kingdom` for both objects. This object is, therefore, quite limited. 

`Harvard` is not located in `United Kingdom`. It would be nice if we could add attributes to each class object.

This can be possible using the `__init__` method. 

### The \__init__() method
The `__init__` method is used to instantiate an object with unique attributes.

The first parameter inside this method must start with a `self` keyword. This method is called immediately a new object is created.

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

```bash
United States
United Kingdom
```

When we use the `__init__` method, each of our objects has its unique attributes.

However, we have to pass this attribute inside the object while creating it, as shown above.

Methods like `__init__` are referred to as __magic methods__, other magic methods include `__str__` and `__len__`.

### Getters and setters
The recommended way of accessing and modifying an object's attributes or properties is by using `getters` and `setters`. We'll be discussing these concepts in this section.

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

In the above code:
1. The `getName`function is the `getter`. It's used to access the location attribute from an object.
2. The `setName` method serves as a `setter`. It modifies the location attribute from an object.

We can now create two objects from the `University` class.

```python
Harvard = University("United States")

Harvard.getLocation()
Harvard.setLocation("Africa")
Harvard.getLocation()
```

__Output:__

```bash
United States
Africa
```

### Inheritance
Inheritance is a very fundamental concept that makes object-oriented programming very powerful.

In inheritance, we have a **base** or **parent** class, and another class which we usually refer to as a **child** or **derived** class.

We can, therefore, inherit some properties and methods from the base class.

Inheritance is useful when the child class shares some characteristics with the parent class.

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

```bash
Africa
```

> You can also inherit from multiple classes.

In the above code:
We created a child class called `College` which inherits from the `University` class.

Take note of the `super` method. It's very important when we want to access the attributes of the parent class from the child class.

### Method overriding
The child class in retrospect can also have things unique to it. This means that we can override the parent method to modify or change it completely.

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

```bash
Hello
```

In the above example, we modified the `sayHello` function in the `College` class. This method was inherited from the parent `University` class.

### Conclusion
In this tutorial, we have learned different aspects of object-oriented programming in Python.

Some of the concepts that we have covered include `attributes`, `methods`, `inheritance`, `getters`, and `setters`.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
