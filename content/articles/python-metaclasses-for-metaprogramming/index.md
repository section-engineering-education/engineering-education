### Introduction
Metaprogramming is the practice of writing code that manipulates other code. It refers to a computer program's capacity to comprehend or regulate itself.  As a rule of thumb, metaprogramming can be done via decorators and metaclasses. For example, Python's metaclasses are a kind of class metaprogramming.

The object-oriented programming(OOPS)  concept is essential for Python programming. So even if you are not aware of it, you are already using metaprogramming when using OOP. Some of the prerequisites include decorators in Python and `OOPS concepts in Python.`

### Table of contents
- [What are metaclasses](#what-are-metaclasses)
- [Understanding metaclasses with examples](#understanding-metaclasses-with-examples)
- [Reasons to use metaclasses nstead of functions](#reasons-to-use-metaclasses-instead-of-functions)
- [Instances to use metaclasses](#instances-to-use-metaclasses)
- [Customizing the metaclass](#customizing-the-metaclass)
- [Using a metaclass to fix an issue](#using-a-metaclass-to-fix-an-issue)
- [Conclusion](#conclusion)

### What are metaclasses?
Metaclasses are classes whose instances are other classes used to build objects.

Metaclasses can be created by modifying how classes are created. We need to add additional code or processes to the Metaclass framework. Although end-users seldom use Metaclasses, they are essential in some programming problems.

### Understanding metaclasses with examples
Every module and function in python has a type given to it.  If the user requests to get the type of the data, a corresponding data type is returned. The `type()` function is used to determine the type of any object.

```python
number = 15  
print("Sort of number is:", type(number))  
   
list = [5, 9, 10]  
print("Sort of list is:", type(list))  
   
name = "John Doe"  
print("Sort of name is:", type(name))
```

#### Output
```python
Sort of number is: <class 'int'>
Sort of list is: <class 'list'>
Sort of name is: <class 'str'>
```

Python's class system is in charge of defining all of the language's types. The above example uses class `int,` `list,` or `str`, unlike other basic data types that include `int,` `char,` and `float` as found in C and Java.

New data types may be generated using user-defined classes. We will use the `Town` class as a new object in an example.

```python
class Town:  
    pass  
Town_object = Town()  
print("Sort of Town_object is:", type(Town_object))
```

#### Output
```python
Sort of Town_object is: <class '__main__.Town'>
```

A class is an instance of Metaclass since it is an object in Python. Therefore, various class types can be found via the Metaclass, where we establish new Classes and Class objects. For instance, `town` search `type,`.

```python
class Town:  
    pass   
print("Sort of Town class is:", type(Town)) 
```

#### Output
```python
Sort of Town class is: <class 'type'>
```

We can alter the classes since they are also objects. For example, user-created properties and methods may be added or removed from the class.

```python
class Town:  
    pass  
Town.b = 70
Town.foo = lambda persona: print('Dusk')
enjoyerobject = Town()  
   
print(enjoyerobject.b)  
enjoyerobject.foo() 
```

#### Output

```python
70
Dusk
```

We may proceed by starting with a class that does not utilize any methods or variables from the class. Then, the method variables and class methods will be specified in the following steps. In the end, we will create the final object.

### Reasons to use metaclasses instead of functions
- It is apparent what the goal is.  In `UpperAttrMetaclass(type)`, it is clear what comes next.
- OOP is an option. Metaclasses may inherit the parent method.
- A class's subclasses are instances of its metaclass if the metaclass-class is given, but not the metaclass function.
- You may improve the organization of your code. Using metaclasses for a simple example like this is a waste of time. It is usually reserved for a more difficult task. Making several methods and grouping them into a single class makes the code more readable.
- It is possible to hook on `new`, `init`, and `call` hooks. So you may do other things, as a result.

### Instances to use metaclasses
The general public seldom utilizes metaclasses since they are primarily employed in complex scenarios. However, metaclasses may be used in the following limited number of situations.
- While generating down the hierarchies for inheritance.
- If the user wishes to alter the class automatically.
- If the user is a developer of application programming interfaces.

### Customizing the Metaclass
The user-created Metaclass must inherit the type metaclass and, in most cases, override it, such as:

- `__new__()`: This method comes before `__int__()` in the class hierarchy. With this method, we can create and return the object. Remember that we can override it to control how objects are created.
- `__int__()`: This function enables the initialization of the objects that have been created, and therefore, to call the object, you have to pass it as an argument

The `type()` function may be used directly by the user to construct classes, and there are possibilities of utilizing this function in different ways.

The preceding example shows that the type may be sent in as a single parameter. It may be called with three different arguments by the user. Creating the class will be done by this. Some of the arguments include:
- Class name
- Pass the tuple of base classes that class has inherited
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

We will create the basic class then use the `type()` method to generate the city class dynamically. We will put the City type there and construct a City class instance. The inherited method will be called next. The City class method is what we will be using here. Finally, we will see the variable.

### Using a metaclass to fix an issue
Some of the challenges users face may be addressed with the help of metaclasses and decorators. However, a metaclass is the only approach to address specific issues. For example, when debugging, the body of class functions should always be executed before the fully qualified name is displayed.

```python
from functools import wraps  
def debugg(funct):  
    '''The debugging decorator for passing functions'''  
    @wraps(funct)  
    def wrapperr(*args, **kwargs):  
        print("This function's full name is:", funct.__qualname__)  
        return funct(*args, **kwargs)  
    return wrapperr  
def debug_methods(clas):  
    '''class decorator make use of debug decorator  
       for debuging the class functions '''  
    for key, value in vars(clas).items():  
        if callable(value):  
            setattr(clas, key, debugg(value))  
    return clas 
@debugmethods  
class Calc:  
    def add(own, x, y):  
        return x+y  
    def mul(own, x, y):  
        return x*y  
    def div(own, x, y):  
        return x/y 
       
enjoyer_cal = Calc()  
print(enjoyer_cal.add(6, 4))  
print(enjoyer_cal.mul(8, 9))  
print(enjoyer_cal.div(30, 5)) 
```

#### Output

```python
10
72
6.0
```

The prior procedure must first apply the decorator function to all subclasses descended from the `Calc` class. Then, decorators must be added to each subclass individually, as shown in the previous example with the `Calc` class.

A time-consuming and challenging process is implementing the decorator function for each subclass of the class. However, if the debug property is present in all subclasses, metaclasses can solve this issue.

### Conclusion
In this tutorial, we have covered the different aspects of metaclasses and understanding what metaclasses entail. Then, we have gone through how to customize metaclasses. Finally, we applied this concept in solving selected problems.

Happy learning!
