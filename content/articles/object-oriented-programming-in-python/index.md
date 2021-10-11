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

Many modern languages like Java, C# is Object-Oriented Languages or have support for using the Object-Oriented Programming (OOP) paradigm, Python is not exempted. In this tutorial, you would learn how to use OOP with Python.

### Prerequisites

Basic knowledge of Python is required. Also, python should be installed on your local machine, I recommend at least from version `3.7` upwards.

### Project Overview

For this tutorial, this would be the project we'll be using to explain most of the OOP principles found in the Python Programming Language.

```py
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

### Class Definition

A class can be referred to as the blueprint of an object. It serves as the underlying framework from which we can build an object. From the example above given in the project overview, we have a class with the name `University`. From this class, we can then create separate objects from it.

```py
class University():  # creating a class (class definition)
    pass

## Creating several object from a class
Harvard = University()
MIT = University()
```

Right now, the class is empty, however, the power of using techniques like this is when we start adding attributes and methods to our class, which we'll consider in the next section.

### Attributes and Method

Attributes can serve as properties for a given class. For example, our `University` class can have several attributes that we can use to identify a University (name, founded, location).

In addition, methods can serve as functions for a given class. And a function is used to perform a particular task repeatedly.

```py
class University():

    # Attributes
    location = "United Kingdom"

    # methods
    def sayHello():
        print("Hello World")
```

**What's Happening Here?**

1. We added three attributes to our `University` class (name, founded, and location).
2. We also added a method called `sayHello` to the `University class`.

> We can also pass attributes inside the method

Let's create two objects from the class `University`.

```py
Harvard = University()
Cambridge = University()

print(Harvard.location)
print(Cambridge.location)

# calling a method from an object
Harvard.sayHello()
```

__Output:__

```py
United Kingdom
United Kingdom
Hello World
```

Notice that by printing the `location`, it prints out `United Kingdom` for both objects. This is quite limited, `Harvard` is not located in `United Kingdom`, it would be nice if we could uniquely give an attribute to each object of a class. This can be possible using the `__init__` method which we'll be considering in the next section. 

### The __init__() Method

The `__init__` method is used to instantiate an object with unique attributes, the first parameter inside this method must start with a `self` keyword. This method is called immediately a new object is created.

```py
class University():

    def __init__(self, location):
        self.location = location

Harvard = University("United States")
Cambridge = University("United Kingdom")

print(Harvard.location)
print(Cambridge.location)
```

__Output:__

```py
United States
United Kingdom
```

Using the `__init__` method, each object we create has its own unique attribute. However, we have to pass this attribute inside the object while creating it, as seen above.

### Getters and setters

The recommended way of accessing and modifying attributes or properties in an object is by using `getters` and `setters`. In this section, we'll be discussing them with examples.

```py
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

**What's Happening Here?**

1. We created a method called `getName`. This method serves as a `getter` method in accessing the location attribute from an object.
2. We created a method called `setName`. This method serves as a `setter` method in modifying the location attribute from an object.

```py
Harvard = University("United States")

Harvard.getLocation()
Harvard.setLocation("Africa")
Harvard.getLocation()
```

__Output:__

```py
United States
Africa
```

### Inheritance

Inheritance is a very fundamental concept that makes using the Object-Oriented Programming approach very powerful. The basic ideology about inheritance is that we have a __base__ or __parent__ class, and another class which we usually refer to as a __child__ or __derived__ class can thereby inherit some properties and methods from the base class. 

This is very useful if the child class shares some characteristics with the parent class. For instance:

```py
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
```

```py
college_of_medicine = College('Africa', '1980')

college_of_medicine.getLocation()
```

__Output:__

```py
Africa
```

**What's Happening Here?**

1. We created a child class called `College` which inherits from the `University` class.
2. Take note of the `super` method, this is very important when we want to have access to the attributes of the parent class from the child class.

### Method Overriding

The child class in retrospect can also have things unique to it, therefore we can also override the parent method either to modify it or completely change it.

```py
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

```py
college_of_medicine = College('Africa', '1980')

college_of_medicine.sayHello()
```

__Output:__

```py
Hello
```

**What's Happening Here?**

1. The `College` class which inherits from the parent class `University` modifies the `sayHello` function.

### Conclusion

In this tutorial, you were introduced to the world of Object-Oriented Programming in Python. Concepts covered included `attributes`, `methods`, `inheritance`, `getters` and `setters` among others.

Happy coding!

---

Peer Review Contributions by:
