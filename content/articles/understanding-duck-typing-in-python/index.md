### Introduction 
Duck Typing is a dynamic language type system. The method an object specifies is more important than its type. We don't use Duck Typing. We seek a technique or property. If anything looks like a duck and quacks like a duck, it is a duck.

This article compares static vs dynamic types by looking at typing and duck typing in several programming languages. So let's see how this great notion might be implemented in real-world projects.

### Preliquisuite
To understand the content of this article properly have the following:
- Have prior knowledge of python programming
- Have a python compiler installed or use the [online compile](https://www.onlinegdb.com/online_python_compiler) to run the code snippets.

### Table of content
- [Preliquisuite](#preliquisuite)
- [Understanding the static and dynamic typing](#Understanding-the-static-and-dynamic-typing)
- [Concept Of Duck Typing](#concept-of-duck-typing)
- [How to apply iteration in duck typing ](#how-to-apply-iteration-in-duck-typing )
- [Implementation Of Custom len() Function](#implementation-of-custom-len()-function)
- [Conclusion](#conclusion)

### Understanding the static and dynamic typing
Type checking is performed in real-time through Dynamic Typing. Python, for example, is dynamically typed. It implies a variable's type might vary over time. Perl, Ruby, PHP, Javascript, and others are dynamically typed.

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

The code above assigns the variable `b`  to the string hurry and also to an integer value 4. This ensures that Python correctly infers the variable's type.

Contrarily, Dynamic Typing. Static Typing checks types during compilation. Compile-time knows a variable's type. Some languages (e.g. C, C++, Java) specify a variable's type, whereas others enable type inference (e.g. Scala, Haskell). Static Typing avoids variable retyping.

Consider a basic statically typed language example.

```py
String b;
b = "programming is the best choice";
```

The code above output an error message below:

```bash   File "main.py", line 8
    String b;
           ^
SyntaxError: invalid syntax
```

The first line declares b as a string. In line 2, b is not a string. It will warn about incompatible types if we say b = 4.

**Now we compare static and dynamic typing in Python.**

When it comes to computer languages, typing is a hot topic, although its basic meaning is frequently. So let's compare the basic type principles to better grasp the notion.

A computer program's objects and elements are stored in memory and have variable names. So, when you create an object of a certain class, you're just allocating memory for it and calling it by its variable name.

Consider this memory space as a box or container. In this situation, a box. So now we have two items, an item and its packaging.

A box must be built to hold the thing it holds (i.e., a box made for keeping pens will not be optimal for carrying textiles, and vice versa, even if it is technically possible). On consensus, object and box must be the same.

This is called static typing. That is, both the object and the variable name (the box) must have the same "type." That's why in statically typed languages like Java/C++, you must declare a variable's type. Even if the variable is empty, you may designate it as a box. Python doesn't allow it.

However, Python is a dynamically typed language. The variable name here is more like a store price tag than a box. So the label is blank. If you ask it its type, it will probably choose the tagged object. A clothing tag can be reused on another garment. As a result, Python does not explicitly type variables. A variable's type is the type of the object to which it is now bound. Typing is dynamic.


### concept of duck typing
We construct three classes: duck, goose, and hippo. They all swim. The Duck and Geese fry, but the hippo walks. Then we define the swim_fry() function, which accepts an animal and writes its description with a swim and fry. A creature missing swim fry() will fail the duck test due to a variable type issue.

Let's look at an example of duck typing.

```Py
class Duck:  
   def swim_fry(self):  
         print("I am a duck, and I can swim and fry.")  
   
class Geese:  
     def swim_fry(self):  
         print("I am a Geese, and I can swim and fry.")  
   
class Hippo:  
     def walk(self):  
         print("I am a Hippo, and I can swim but can`t fry.")  
   
for obj in Duck(), Geese(), Hippo():
    obj.swim_fry()
``` 

```bash
I am a duck, and I can swim and fry.
I am a Geese, and I can swim and fry.
Traceback (most recent call last):
  File "main.py", line 21, in <module>
    obj.swim_fry()
AttributeError: 'Hippo' object has no attribute 'swim_fry'
```

Of the duck, the class can swim and fry. It's the same with the geese class, which includes the necessary swim fry function. However, the hippo class lacks the swim fry method, therefore its instance fails the test.

This gives us a basic notation for duck typing. Custom types are more about implementing features than data types. Even though a geese isn't a true duck, the smim_fry function turns it into one.


**Practical examples**

Let us now consider some of the usages of duck typing that we can employ in our projects.

### How to apply iteration in duck typing 
Iteration allows us to modify lists in Python. The `for` loops are a systematic approach to establishing an iteration.

Duck typing is used here. Due to duck type, these objects are handled the same regardless of their application. Iteration requires __iter__() and __next__() methods. Python is becoming more versatile by not tightly typing these classes. We may even design our iterator for outputting square numbers, using methods like __iter__() and __next__().

```py
class Number_squred:
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
for k in Number_squred(2, 6):
  print(k)
```

```bash
4
9
16
25
```

In the above code sample, we utilized the iter() and next() methods to create iterators of the custom class Number squared. The square numbers to be computed are regulated between 2 and 6 using the for a loop.


### Implementation of custom len() function
Custom len() method that uses sort() to sort a list. It's a magic function since it utilizes the len() technique. Consider sorting a list of ducks by name length. Here's how duck typing works.

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
The code above prompts the user to enter a string, the code then calculates the length of the string entered by the user and outputs the result. 

The line of code `def length(iterator)` is used to declare the function to get the length of the iterator and sets the count to zero using the line `count =0`. The for loop is used to increment the count by adding one after every count and then returning the count to the function. The line `iterator = input("Enter a string:- ")` prompt user enter the string  and finally output the length of the string using `print(f"Length of {iterator} is {length(iterator)}")`.

### Conclusion
Duck typing was brought up as an example of dynamic typing in Python. It taught you Python duck type. Remember that duck typing prioritizes related functionality over specific data types.

Happy cording!
ind