---
layout: engineering-education
status: publish
published: true
url: /python-metaclasses-for-metaprogramming/
title: A look into Python's metaclasses for metaprogramming
description: Metaprogramming is the practice of writing code that manipulates other code. Metaprogramming can be implemented using metaclasses. This tutorial discusses how to use python's metaclasses for metaprogramming.
author: dickson-gitau
date: 2021-12-12T00:00:00-14:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-metaclasses-for-metaprogramming/hero.png
    alt: Python metaclasses for metaprogramming Image
---

### Introduction
Metaprogramming is the practice of writing code that manipulates other code. It refers to a computer program's capacity to comprehend or regulate itself.  In Python,  metaprogramming can be done via decorators and metaclasses. For example, Python's metaclasses are a kind of class metaprogramming.
<!--more-->
Object-oriented programming(OOPS) is essential for Python, which uses metaprogramming. So even if you are not aware of it, you are already using metaprogramming when using OOP. 

### Prerequisites
Some of the prerequisites for this tutorial include:
Decorators in Python
OOPS, concepts in Python.

### Table of contents
- [What are metaclasses](#what-are-metaclasses)
- [Understanding metaclasses with examples](#understanding-metaclasses-with-examples)
- [Reasons to use metaclasses instead of functions](#reasons-to-use-metaclasses-instead-of-functions)
- [Instances to use metaclasses](#instances-to-use-metaclasses)
- [Customizing the metaclasses](#customizing-the-metaclass)
- [Using a metaclass to fix an issue](#using-a-metaclass-to-fix-an-issue)
- [Conclusion](#conclusion)

### What are metaclasses?
Metaclasses are classes whose instances are other classes used to build objects. Metaclasses can be created by modifying how classes are instantiated. We need to add additional code or processes to the Metaclass framework. Although end-users seldom use Metaclasses, they are essential in some programming problems.

### Understanding metaclasses with examples
Every module and function in Python has a type given to it.  If the user requests to get the type of the data, a corresponding data type is returned. The `type()` function is used to determine the type of any object.

```python
number = 11  
print("The list is classified as follows::", type(number))  
   
list = [4, 6, 9, 10]  
print("The list is classified as follows::", type(list))  
   
name = "Dickson Gitau"  
print("The list is classified as follows::", type(name))
```

#### Output
```python
The list is classified as follows:: <class 'int'>
The list is classified as follows:: <class 'list'>
The list is classified as follows:: <class 'str'>
```

Python's class system is in charge of defining all of the language's types. The above example uses class `int,` `list,` or `str`, unlike other basic data types that include `int,` `char,` and `float` as found in C and Java.

New data types may be generated using user-defined classes. We will use the `Town` class as a new object in an example.

```Python
class Town:  
    pass  
Town_object = Town()  
print("Sort of Town_object is:", type(Town_object))
```

#### Output
```python
Sort of Town_object is: <class '__main__.Town'>
```

A class is an instance of metaclass since it is an object in Python. Therefore, various class types can be found via the metaclass. This, therefore, establishes new classes and class objects. For instance, `town's` type can be found as below:

```Python
class Town:  
    pass   
print("Sort of Town class is:", type(Town)) 
```

#### Output
```python
Sort of Town class is: <class 'type'>
```

We can alter the classes since they are also objects. For example, user-created properties and methods may be added or removed from the class.

```Python
class Town:  
    pass  
Town.b = 70
Town.foo = lambda persona: print('Dusk')
enjoyerobject = Town()  
   
print(enjoyerobject.b)  
enjoyerobject.foo() 
```

#### Output

```Python
70
Dusk
```

We may proceed by starting with a class that does not utilize any methods or variables from the class. Then, the method variables and class methods will be specified in the following steps. In the end, we will create the final object.

### Reasons to use metaclasses instead of functions
Although we have equally useful functions, we need metaclasses for the following reasons.
- The aim of metaclasses is precise. At the point when you read `UpperAttrMetaclass(type)`, you know what will follow
- You can utilize OOP. Metaclasses may inherit the parent method.
- A class's subclasses are instances of its metaclass if the metaclass-class is given, but not the metaclass function.
- You may improve the organization of your code. Using metaclasses for a simple example like this is a waste of time. It is usually reserved for a more difficult task. Making several methods and grouping them into a single class makes the code more readable.
- It is possible to hook on `new`, `init`, and `call` hooks. 

### Instances to use metaclasses
The general public seldom utilizes metaclasses since they are primarily employed in complex scenarios. However, metaclasses may be used in the following limited number of situations:
- While generating down the hierarchies for an inheritance, you can employ a metaclass. This will have an impact on all subclasses as well. If the user finds themselves in such a scenario, they can use the metaclass.
- To change the class automatically, they can utilize a metaclass when it is made.
- Assuming the user is an application programming interface designer, they can utilize metaclasses for that reason.

### Customizing the Metaclass
The user-created metaclass must inherit the type metaclass and, in most cases, override it, such as:

- `__new__()`: This method comes before `__int__()` in the class hierarchy. With this method, we can create and return the object. Remember that we can override it to control how objects are created.

- `__int__()`: This function enables the initialization of the objects that have been created, and therefore, to call the object, you have to pass it as an argument

The `type()` function may be used directly by the user to construct classes, and there are possibilities of utilizing this function in different ways.

The preceding example shows that the type may be sent in as a single parameter. It may be called with three different arguments by the user. Creating the class will be done by this. Some of the arguments include:
- Class name
- The tuple of base classes that the class has inherited
- Class dictionary: Some functions and variables occupy this namespace, which the class will use itself.

```python
def Town_method(persona):  
    print("Town class method!")
class Base:  
    def enjoyerfunction(persona):  
        print("Inherited method!")
Town = type('Town', (Base, ), dict(b = "John Doe", enjoyer_method = Town_method))
print("The Sort of Town class: ", type(Town))
Town_object = Town()  
print(" The Sort of Town_object: ", type(Town_object)) 
Town_object.enjoyerfunction() 
Town_object.enjoyer_method() 
print(Town_object.b) 
```

#### Output

```python
The Sort of Town class:  <class 'type'>
The Sort of Town_object:  <class '__main__.Town'>
Inherited method!
Town class method!
John Doe
```

We will create the basic class then use the `type()` method to generate the town class dynamically. We will put the Town type there and construct a Town class instance. The inherited method will be called next. The Town class method is what we will be using here. Finally, we will see the variable.

### Using a metaclass to fix an issue
Some of the challenges users face may be addressed with the help of metaclasses and decorators. However, a metaclass is the only approach to address specific issues. For example, when debugging, the body of class functions should always be executed before the fully qualified name is displayed.

```Python
from functools import wraps  
   
def debugg(funct):  
    @wraps(funct)  
    def wrapperr(*args, **kwargs):  
        print("The Function's full name:", funct.qualname)  
        return funct(*args, **kwargs)  
    return wrapperr  
   
def debug_methods(clas):
       
    for key, value in vars(clas).items():  
        if callable(value):  
            setattr(clas, key, debugg(value))  
    return clas  
   
class debug_Meta(type):  
    def new(clas, clasname, bases, clasdict):  
        object = super().new(clas, clasname, bases, clasdict)  
        object = debug_methods(object)  
        return object  
         
class Base(metaclass = debug_Meta):pass  
   
class Calc(Base):  
    def add(self, x, y):  
        return x+y  
  
class Calc2(Calc):  
    def mult(self, x, y):  
        return x*y  
  
user_cal = Calc2()  
print(user_cal.add(4, 6))  
user_cal = Calc2()  
print(user_cal.mult(4, 6)) 
```

#### Output

```Python
10
24
```

#### Description
Decorators `def debug(funct):` and `debug methods(clas):` are used in the following code to use the debug decorator for the debug classes. Debug-enabled objects are sent to the debug method through the metaclass shown in the code `class debug Meta(type):` 

Subclasses of the base class with debugging Meta metaclass are debugged with the code `class Base(metaclass = debug Meta)`. Now that we have used the debugging function, we can pass down both the base class and the calculator to our child classes using the line `class Calculator(Base):`. Finally, the `Calc2` object will display the debugging result.

The prior procedure must first apply the decorator function to all subclasses descended from the `Calc` class. Then, decorators must be added to each subclass individually, as shown in the previous example with the `Calc` class.

A time-consuming and challenging process is implementing the decorator function for each subclass of the class. However, if the debug property is present in all subclasses, metaclasses can solve this issue.

### Conclusion
This tutorial covered the different aspects of metaclasses and understanding what metaclasses entail. Then, It went through how to customize metaclasses. Finally, it  applied thess concepts in solving selected problems.

Happy learning!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
