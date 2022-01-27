---
layout: engineering-education
status: publish
published: true
url: /python-metaclasses-for-metaprogramming/
title: Understanding Metaclasses in Python
description: This tutorial discusses how to use python's metaclasses for metaprogramming. This process involves writing code that manipulates other code. 
author: dickson-gitau
date: 2021-12-23T00:00:00-14:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-metaclasses-for-metaprogramming/hero.jpg
    alt: Python Metaclasses for Metaprogramming Hero Image
---
Metaprogramming is the practice of writing code that manipulates other code by modifying, wrapping, or recreating existing code.
Programs can utilize other programs as data by using metaprogramming, a programming method. In this article, we will implement metaprogramming using metaclasses. Working with classes in Python is simple since it is an object-oriented language. A metaclass in object-oriented programming is a class with other classes instances.

### Prerequisites
To follow along with this article, you need to have:
- Knowledge of decorators 
- Object-oriented programming concepts in Python.

### Table of contents
- [What are metaclasses](#what-are-metaclasses)
- [Understanding metaclasses with examples](#understanding-metaclasses-with-examples)
- [Reasons to use metaclasses instead of functions](#reasons-to-use-metaclasses-instead-of-functions)
- [Instances to use metaclasses](#instances-to-use-metaclasses)
- [Customizing metaclasses](#customizing-metaclasses)
- [Using a metaclass to fix an issue](#using-a-metaclass-to-fix-an-issue)
- [Conclusion](#conclusion)

### What is a metaclass?
A class is a metaclass in its own right. Metaclasses in Python are classes of classes that specify the behavior of a class. Python's metaprogramming relies on the metaclass. Classes of this kind store the instructions for generating code in the background while another program performs. Creating an object of a class is as simple as drawing a blueprint from the class itself. Like a class's instance, a metaclass is a blueprint for the class as a whole. Defining the attributes of other classes is what a metaclass is all about. A metaclass allows us to specify which features should be included in any new classes we create in our program.

### Understanding metaclasses with examples
Every module and function in Python has a type given to it.  If the user requests to get the type of the data, a corresponding data type is returned. For instance, an `int` will denote an integer value of a variable and the use of `type()` function is to determine the type of any object.

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

Python's class system is in charge of defining all of the language's types. The above example uses class `int,` `list,` or `str`, unlike other basic data types that include `int,` `char,` and `float`, as found in C and Java.

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

In Python, a class is also an object, and as such, it is an instance of Metaclass, just like other objects. The metaclasses uniqueness is in the form of class in charge of constructing classes and class objects. If a person searches for the type of the `City` class, for example, they will discover that it is `type.`

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
Since `metaclass` takes any callable, understand why classes exist. Here are some of the reasons:
- In a metaclass, it is clear what comes next.
- OOP is an option. Metaclasses can override parent methods and inherit from metaclasses. Metaclasses can employ metaclasses.
- Instead of a metaclass function, you can define a metaclass class. Metaclass-classes rather than metaclass-functions can be used to define a class's subclasses.
- You can enhance your code structure. Metaclasses are useless for a basic example. It's usually used for challenging tasks. Grouping several methods into a single class dramatically simplifies the code.
- You can connect to the `new`, `init`, and call functions. Some people prefer the familiarity of `init` while we can do everything in `new`.

### Instances to use metaclasses
The developers seldom utilize metaclasses since they are primarily employed in complex scenarios. However, metaclasses may be used in the following limited number of situations:
- Metaclasses are inherited via the hierarchies of inheritance.  All subclasses will be affected; therefore, metaclasses should run code whenever a base class is subclassed.
- Metaclasses can be used to automatically alter the class while verifying whether the class has been defined appropriately. 
- Metaclasses can be utilized to build APIs(application programming interface).
- Utilizing a subclass, we may annotate or edit the class's features before using it. We can validate classes using a metaclass. You may also set the class's attributes using the class.
- Metaclasses can detect errors when importing modules.

### Customizing the Metaclass
The user-created metaclass must inherit the type metaclass and, in most cases, override it, such as:

- `__new__()`: This method comes before `__int__()` in the class hierarchy. With this method, we can create and return the object. Remember that we can override it to control how objects are created.

- `__int__()`: This function enables the initialization of the objects that have been created, and therefore, to call the object, you have to pass it as an argument

The type() function may be used directly by users to define classes. You may use the type() function in the following ways:

1. The user may call it with just one parameter, as demonstrated in the preceding example, returning the type.
2. The type() function may be called with three arguments by the user. The class will be created by its (type() function). It takes the following arguments:

- Class name
- The tuple of base classes that the class has inherited
- Class dictionary: Some functions and variables occupy this namespace, which the class will use.

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
Decorators `def debug(funct):` and `debug methods(clas):` are used in the following code to use the debug decorator for the debug classes. Debug-enabled objects are sent to the debug method through the metaclass shown in the code `class debug Meta(type):.`

Subclasses of the base class with debugging Meta metaclass are debugged with the code `class Base(metaclass = debug Meta)`. Now that we have used the debugging function, we can pass down both the base class and the calculator to our child classes using the line `class Calculator(Base):`. Finally, the `Calc2` object will display the debugging result.

The prior procedure must first apply the decorator function to all subclasses descended from the `Calc` class. Then, decorators must be added to each subclass individually, as shown in the previous example with the `Calc` class.

A time-consuming and challenging process is implementing the decorator function for each subclass of the class. However, if the debug property is present in all subclasses, metaclasses can solve this issue.

### Conclusion
This tutorial covered the different aspects of metaclasses and understanding what metaclasses entail. Then, it went through how to customize metaclasses. Finally, it applied these concepts in solving selected problems.

Happy learning!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
