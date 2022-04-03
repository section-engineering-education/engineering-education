---
layout: engineering-education
status: publish
published: true
url: /understanding-duck-typing-in-python/
title: Understanding Duck Typing in Python
description: This article will help the reader understand static and dynamic types by evaluating Duck typing in Python.
author: samuel-irungu
date: 2022-03-04T00:00:00-04:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/understanding-duck-typing-in-python/hero.jpg
   alt: Understanding Duck Typing image
---
Duck typing is a dynamic language system type. The method an object specifies is more important than its type. Therefore, we do not use Duck typing. 
<!--more--> 
This article compares static vs dynamic types by looking at typing and Duck typing in several programming languages.

### Prerequisites
To understand this article, you need to have:
- Some knowledge of Python programming
- A Python compiler installed. Alternatively, you can use the [online compiler](https://www.onlinegdb.com/online_python_compiler) to run the code snippets.

### Table of contents
- [Understanding the static and dynamic typing](#Understanding-the-static-and-dynamic-typing)
- [Concept of Duck typing](#concept-of-duck-typing)
- [How to apply iteration in Duck typing ](#how-to-apply-iteration-in-duck-typing )
- [Implementation of custom len() function](#implementation-of-custom-len()-function)
- [Conclusion](#conclusion)

### Understanding the static and dynamic typing
Type checking is performed on a real-time basis using dynamic Typing. For example, Python is dynamically typed. 

This implies that a variable's type might vary over time. Likewise, Perl, Ruby, PHP, and JavaScript are dynamically typed.

Let's examine how a variable may change type in Python:

```py
b ="hurry"
print(type(b))
b = 4
print(type(b))
```

```bash
<class 'str'>
<class 'int'> 
```

The code above assigns the variable `b`  to the string `hurry` and an integer value of `4`. This ensures that Python correctly infers the variable's type.

Static Typing checks types during compilation. Some languages such as C, C++, and Java specify a variable's type, whereas others like Scala and Haskell enable type inference. Static typing avoids variable retyping.

Below is a basic example of a statically typed language:

```py
String b;
b = "Programming is the best choice";
```

The code above outputs the following error message:

```bash   
File "main.py", line 8
    String b;
           ^
SyntaxError: invalid syntax
```

The first line declares `b` as a `string`. In `line 2`, `b` is not a string. It will, therefore, warn about incompatible types if we state that `b = 4`.

#### Static and dynamic typing in Python
A computer program's objects and elements are stored in memory and have variable names. When an object of a particular class is created, it will be allocated memory and invoked by its variable name.

You can consider this memory space as a box or container. This means that we have two components; an item and its packaging.

A box must be built to hold the thing it contains (i.e., a box made for keeping pens will not be optimal for carrying textiles). An object and box must be the same.

This is called static typing because both the object and the variable name (the box) must have the same *type*. 

This explains why in statically typed languages like Java/C++, you must declare a variable's type. Even if the variable is empty, you may designate it as a box. Python does not support this functionality.

Python is a dynamically typed language. The variable name is more like a store price tag than a box. So the label is blank. If you ask its type, it will probably choose the tagged object. 

A clothing tag can be reused on another garment. As a result, Python does not explicitly type variables.

### Concept of Duck typing
We construct three classes: duck, goose, and hippo. They all swim. The duck and goose fly, but the hippo walks. 

Next, we define the `swim_fly()` function, which accepts an animal and outputs its characteristics. 

A creature missing the `swim_fly()` function will fail the Duck test due to a variable type issue.

Let's look at an example of Duck typing:

```py
class Duck:  
   def swim_fly(self):  
         print("I am a duck, and I can swim and fly.")  
   
class Goose:  
     def swim_fly(self):  
         print("I am a Goose, and I can swim and fly.")  
   
class Hippo:  
     def walk(self):  
         print("I am a Hippo, and I can swim but can't fly.")  
   
for obj in Duck(), Goose(), Hippo():
    obj.swim_fly()
``` 

```bash
I am a duck, and I can swim and fly.
I am a Goose, and I can swim and fly.
Traceback (most recent call last):
  File "main.py", line 21, in <module>
    obj.swim_fly()
AttributeError: 'Hippo' object has no attribute 'swim_fly'
```

In the three classes above, the `duck` and `goose` can swim and fly. However, the `hippo` class lacks the swim fly method. Therefore, its instance fails the test.

This gives us a basic notation for Duck typing. Custom types are more about implementing features than data types. Even though a goose isn't an actual duck, the `swim_fly` function turns it into one.

### Practical examples 
Let's now consider some of the usages of Duck typing that we can apply in our projects.

#### How to apply iteration in Duck typing 
Iteration allows us to modify lists in Python. The `for` loops are a systematic approach to establishing an iteration.

Due to Duck typing, these objects are handled the same regardless of their application. Iteration requires __iter__() and __next__() methods. 

In Python, we can design our iterator for outputting square numbers using methods like __iter__() and __next__().

```py
class Number_squared:
  def __init__(identity, l=0, x=-1):
    identity.x = x
    identity.y = l
  def __iter__(identity):
    return identity
  def __next__(identity):
    if identity.y < identity.x:
      s = identity.y ** 2
      identity.y += 1
      return s
    else:
      raise StopIteration    
for k in Number_squared(2, 6):
  print(k)
```

```bash
4
9
16
25
```

In the above code, we utilized the `iter()` and `next()` methods to create iterators of a custom class. 

The square numbers to be computed are between `2` and `6`. We use a `for` loop to go through these numbers.

#### Implementation of custom len() function
Custom `len()` method uses the `sort()` method to sort a list. For example, consider sorting a list by name length. Here's how Duck typing works.

```py
def length(iterator):
   count = 0
   for item in iterator:
    
      count += 1
   return count
if __name__ == "__main__":
   iterator = input("Enter a string:- ")
   print(f"Length of {iterator} is {length(iterator)}")
```
   
The code above prompts the user to enter a string. It then calculates the length of the string and returns the result. 

`def length(iterator)` is used to declare the function to retrieve the length of the iterator and sets the `count` to zero using `count =0`.

The `for` loop increments the `count` by adding one after every count and returns the value to the function. 

`iterator = input("Enter a string:- ")` prompts the user to enter a string and returns the length of the string using `print(f"Length of {iterator} is {length(iterator)}")`.

### Conclusion
Duck typing is a perfect example of dynamic typing in Python. It prioritizes related functionality over specific data types.

You can, therefore, use the knowledge gained from this article to craft other high-quality applications.

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)