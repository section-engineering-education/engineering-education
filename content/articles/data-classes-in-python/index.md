---
layout: engineering-education
status: publish
published: true
url: /data-classes-in-python-3.7+/
title: Data Classes in Python 3.7+
description: In this tutorial, we will look at implementing data classes in Python 3.7. Data classes are classes that are declared using @dataclass decorator.
author: oruko-pius
date: 2021-03-25T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-classes-in-python-3.7+/hero.jpg
    alt: Data Class Python 3.7+ example Image
---
The main function of a Python class is to contain and represent data. In previous Python versions, the `__init__()` function stores values on the instance of the class. This is a common pattern that brings up the question; why must we explicitly store each argument on the object? Well, in Python 3.7 we don't.
<!--more-->
A new feature called a data class, which solves this was introduced. A data class helps to automate the creation and management of classes that mostly exist just to hold data.

### Prerequisites
To get started with data classes, you must have `Python 3.7` or newer installed, since previous versions don't have its support. You can get the latest python versions from the official website [here](https://www.python.org/downloads/).

The reader should also be able to work with Python classes and objects for a better understanding of the article. If you would like to brush your skills on classes be sure to visit this [site](https://docs.python.org/3/tutorial/classes.html) to familiarize yourself with the concepts.

### Defining a data class
A Python class is a program used to create objects and their properties. We use the keyword `class` to create a class in Python. 

For class attributes to be initialized, we use a constructor method called `__init__()` which is called when an object is created in a Python class.

Let's implement a Python class.

```python
class Student:
    def __init__(self, name, course, gpa):
        self.name = name
        self.course = course
        self.gpa = gpa

# create instances
student1 = Student('James', 'Comp Science', 3.7)
student2 = Student('Angie', 'Bcom', 4.0)

print(student1.course)
print(student2.name)
```

In the class above, our `__init__()` method takes in four arguments. The `self` keyword represents the instance of the class and allows us to access any property defined in the class. Our attributes, in this case, are `name`, `course`, and `gpa`. 

We use `self` together with the attribute to access its instance. For example, `self.name` accesses the name attribute. We then create two objects `student1` and `student2` and create an instance of our class. We then print them out.

This is how we used to define classes in previous Python versions. In Python 3.7 +, data classes were introduced to simplify the creation of classes. Let's work on an example and see what changed.

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    course: str
    gpa: float

# create instances
student1 = Student('James', 'Comp Science', 3.7)
student2 = Student('Angie', 'Bcom', 4.0)

#access fields
print(student1.course)
print(student2.name)

# print student1 itself
print(student1)
```

We first import the `dataclass`. We prefix our class with the `@dataclass` decorator from the imported dataclass. In our class, we define our fields with their data type. 

For example, `name` and `course` are strings. We use the `str` to represent their data type. Our `gpa` will be a decimal so we use a `float`.

By running the `dataclass()` decorator, the properties of the class are initialized by a built-in `__init__()` function. The output is similar to the one in the previous example. 

Let's add another method in our class and see how we can change fields.

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    course: str
    gpa: float

    def studentinfo(self):
        return f"{self.name} had {self.gpa}"

# create instances
student1 = Student('James', 'Comp Science', 3.7)
student2 = Student('Angie', 'Bcom', 4.0)

#access fields
print(student1.course)
print(student2.name)

# print student1 itself
print(student1)

# Change some fields
student1.name = "Clark"
student1.gpa = 3.9

print(student1.studentinfo())
```

We've created a method, `studentinfo()` which returns a formatted name and gpa as a string. We define a method in a dataclass like any other. 

We then change the `name` attribute of `student1` and his `gpa`. We then print the student information of the first student using the `studentinfo()` method. We can see the output changes. 

This shows how we can change various fields using the Python data classes. Next, we will look at how to use the `__post_init__()` function.

### Using post initialization
The `__post_init__()` function allow us to customize additional attributes that we do not want at the time of object initialization.

Let's go ahead and see how this works:

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    course: str
    gpa: float

    def __post_init__(self):
        self.description = f"{self.name} from {self.course} has {self.gpa} gpa"

#create instances
student1 = Student("James", "Comp Science", 3.7)
student2 = Student("Angie", "Bcom", 4.0)

print(student1.description)
print(student2.description)
```

We pass a new property, `description` to the `__post_init__()` function. We use the attributes already defined by the `__init__()` function to create a formatted string. 

Using our already created variables; `student1` and `student2` we execute the `__post_init__()` function. Using post initialization is useful when you want to add or customize properties to your dataclass.

### Using default values
Data classes also allow us to define the default value of our attributes when they are declared. The snippet below shows how to go about this.

```python
from dataclasses import dataclass, field
import random

def gpa_range():
    return float(random.randrange(2, 5))

@dataclass
class Student:
    name: str = "No Name"
    course: str = "No Course"
    gpa: float = field(default_factory=gpa_range)

# create a default student object
student1 = Student()
print(student1)

# Create a specified book, gpa is set by field operator
student1 = Student('James', 'Comp Science')
student2 = Student('Angie', 'Bcom')

print(student1)
print(student2)
```

In our class object, we indicate the default value by using an equal sign with the corresponding data type. We pass `"No Name"` and `"No Course"` for the string data types and pass a field with a defined function `gpa_range()` to generate random GPA values to the gpa attribute. 

The `default_factory` allow us to use mutable default values using the `field()` specifier. The `gpa_range()` function generate random values between 2 and 5. 

We then create an instance of Student class by passing the `name` and `course` attribute. The `gpa` property is set by the field operator which we imported. Running the file outputs a Student object with all the properties.

### Immutable data classes
Immutable data classes are classes that do not allow us to change their values and throws an exception when modified. Why use immutable classes? 

Well, first, immutable classes are thread-safe since their content cannot be changed. It also improves clarity and accuracy when reading one's code. The snippet below explains how to go about it.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ImmutableDataClass:
    val1: str = "This value"
    val2: int = 0

obj = ImmutableDataClass()
print(obj.val1)

obj.val1 = "Another value"
print(obj.val1)
```

We create a new class, `ImmutableDataClass()` and define two attributes: `val1` and `val2`. We assign default values to both: `"This value"` and `0` respectively. We create a variable `obj` and print `val1`. `"This value"` is displayed. 

If we try to modify `val1` by assigning it another value, `" Another value"` we get an exception, `FrozenInstanceError`. 

This is because the class is immutable. In our decorator we pass `Frozen=True` to the `dataclass()` decorator. This make the Python objects to be immutable. 

The frozen classes can't modify themselves either. For instance the `func()` function in the `ImmutableDataClass` cannot be modified too. 

Try running the snippet below.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ImmutableDataClass:
    val1: str = "This value"
    val2: int = 0

    def func(self, newval):
        self.val2 = newval


obj = ImmutableDataClass()
print(obj.val1)

obj.func(12)
print(obj.func)
```

### Conclusion
In this tutorial, we have covered how to use data classes to reduce the amount of junk code required to develop data-centric objects.

For more on data classes in Python check out the [official documentation](https://docs.python.org/3/library/dataclasses.html#module-dataclasses) and this [source](https://realpython.com/python-data-classes/).

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
