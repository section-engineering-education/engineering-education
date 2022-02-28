---
layout: engineering-education
status: publish
published: true
url: /understanding-duck-typing-in-python/
title: Understanding Duck Typing in Python
description: Duck Typing is a dynamic language type system. This article compares static and dynamic types by looking at typing and duck typing in several programming languages.
author: samuel-irungu
date: 2022-02-14T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/understanding-duck-typing-in-python/hero.jpg
   alt: Understanding Duck Typing image
---

Duck Typing is a dynamic language type system. The method an object specifies is more important than its type. Therefore, we don't use Duck Typing. Instead, we seek a technique or property. If anything looks like a duck and quacks like a duck, it is a duck.

<!--more-->

### Introduction 
This article compares static vs dynamic types by looking at typing and duck typing in several programming languages. So let's see how this great notion might be implemented in real-world projects.

### Prerequisites
To understand the content of this article correctly, have the following:
- Have prior knowledge of Python programming
- Have a Python compiler installed or use the [online compiler](https://www.onlinegdb.com/online_python_compiler) to run the code snippets.

### Table of content
- [Understanding the static and dynamic typing](#Understanding-the-static-and-dynamic-typing)
- [Concept Of Duck Typing](#concept-of-duck-typing)
- [How to apply iteration in duck typing ](#how-to-apply-iteration-in-duck-typing )
- [Implementation Of Custom len() Function](#implementation-of-custom-len()-function)
- [Conclusion](#conclusion)

### Understanding the static and dynamic typing
Type checking is performed in real-time through Dynamic Typing. Python, for example, is dynamically typed. It implies a variable's type might vary over time. Likewise, Perl, Ruby, PHP, Javascript, and others are dynamically typed.

Let's examine whether a variable may change type in Python:

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

The code above assigns the variable `b`  to the string hurry and an integer value of 4. This ensures that Python correctly infers the variable's type.

Contrarily, Dynamic Typing. Static Typing checks types during compilation. Compile-time knows a variable's type. Some languages (e.g., C, C++, Java) specify a variable's type, whereas others enable type inference (e.g., Scala, Haskell). Static Typing avoids variable retyping.

Consider a basic statically typed language example.

```py
String b;
b = "Programming is the best choice";
```

The code above output an error message below:

```bash   
File "main.py", line 8
    String b;
           ^
SyntaxError: invalid syntax
```

The first line declares b as a string. In line 2, b is not a string. It will warn about incompatible types if we say b = 4.

#### Static and dynamic typing in Python

When it comes to computer languages, typing is a widely studied topic. So let's compare the basic type principles to grasp the notion better.

A computer program's objects and elements are stored in memory and have variable names. So, when you create an object of a particular class, you're just allocating memory for it and calling it by its variable name.

Consider this memory space as a box or container. In this situation, a box. So now we have two items, an item and its packaging.

A box must be built to hold the thing it contains (i.e., a box made for keeping pens will not be optimal for carrying textiles, and vice versa, even if it is technically possible). On consensus, object and box must be the same.

This is called static typing. That is, both the object and the variable name (the box) must have the same "type." That's why in statically typed languages like Java/C++, you must declare a variable's type. Even if the variable is empty, you may designate it as a box. Unfortunately, Python doesn't allow it.

However, Python is a dynamically typed language. The variable name is more like a store price tag than a box. So the label is blank. If you ask its type, it will probably choose the tagged object. A clothing tag can be reused on another garment. As a result, Python does not explicitly type variables. A variable's type is the type of the object to which it is now bound. Typing is dynamic.

### Concept of duck typing
We construct three classes: duck, goose, and hippo. They all swim. The duck and goose fly, but the hippo walks. Then we define the `swim_fly()` function, which accepts an animal and writes its description with a swim and fly. A creature missing `swim_fly()` will fail the duck test due to a variable type issue.

Let's look at an example of duck typing.

```Py
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

Of the three classes, the duck can swim and fly. It's the same with the `goose` class, which includes the necessary swim fly function. However, the hippo class lacks the swim fly method; therefore, its instance fails the test.

This gives us a basic notation for duck typing. Custom types are more about implementing features than data types. Even though a goose isn't an actual duck, the smim_fly function turns it into one.


### Practical examples 

Let us now consider some of the usages of duck typing that we can employ in our projects.

#### How to apply iteration in duck typing 
Iteration allows us to modify lists in Python. The `for` loops are a systematic approach to establishing an iteration.

Duck typing is used here. Due to duck type, these objects are handled the same regardless of their application. Iteration requires __iter__() and __next__() methods. Python is becoming more versatile by not tightly typing these classes. We may even design our iterator for outputting square numbers, using methods like __iter__() and __next__().

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

In the above code sample, we utilized the `iter()` and `next()` methods to create iterators of the custom class Number squared. The square numbers to be computed are regulated between 2 and 6 using the for a loop.


#### Implementation of custom len() function
Custom `len()` method uses `sort()` to sort a list. It's a magic function since it utilizes the `len()` technique. For example, consider sorting a list of ducks by name length. Here's how duck typing works.

```Py
def length(iterator):
   count = 0
   for item in iterator:
    
      count += 1
   return count
if __name__ == "__main__":
   iterator = input("Enter a string:- ")
   print(f"Length of {iterator} is {length(iterator)}")
```
   
The code above prompts the user to enter a string, calculates the length of the string entered by the user, and outputs the result. 

The line of code `def length(iterator)` is used to declare the function to get the length of the iterator and sets the count to zero using the line `count =0`. The for loop increments the count by adding one after every count and returns the count to the function. The line `iterator = input("Enter a string:- ")` prompt user enter the string  and finally output the length of the string using `print(f"Length of {iterator} is {length(iterator)}")`.

### Conclusion
Duck typing was brought up as an example of dynamic typing in Python. Remember that duck typing prioritizes related functionality over specific data types.

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
