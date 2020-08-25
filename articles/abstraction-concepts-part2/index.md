---
layout: engineering-education
status: publish
published: true
url: /engineering-education/abstraction-concepts-part2/
title: Understanding Abstraction in Python, Part 2
description: A concise look at abstraction principles with corresponding code examples. Polymorphism, encapsulation, methods and attributes, subclasses and superclasses, and inheritance.
author: sophia-raji
date: 2020-05-07T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/abstraction-concepts-part2/hero.jpg
    alt: python ball face
---
Like C++, Java, Smalltalk, and many others, Python is an object-oriented language. Python, however, is multi-paradigmatic, meaning that you can choose the paradigm best suited for the task, but its central paradigm is object-oriented programming.
<!--more-->

The term *object* refers to a collection of data (attributes) with a set of methods for accessing and modifying that data.  We discussed global variables and functions in [Part 1](/engineering-education/abstraction-concepts/), but here we describe abstraction concepts relevant to objects.

### Objects and Classes
**Objects** consist of attributes and methods. **Attributes** are variables that are part of an object, and **methods** are somewhat like functions stored in an attribute.

Object-oriented design is useful when thinking of the relationships classes and objects might have with one another and related functionality. It is appropriate in cases where implementing patterns leading to software reuse.

In order to plan out what classes and methods to use, it may be helpful to think of the description of the problem and relate nouns with possible classes, verbs with methods, and adjectives with attributes.

**Classes** are a set of objects. Similar to the namespace definitions that we covered in [Part 1](/engineering-education/abstraction-concepts/), class namespaces refer to the special namespace that all the code in the `class` statement will execute.

### Inheritance
**Inheritance** involves creating specialized classes of objects from general ones. One class may be the **subclass** of one or even multiple classes (**multiple inheritance**). By using more than one superclass (a class from which subclasses can be created), you can create *orthogonal* pieces of functionality that are independent and distinct.

#### Example
To identify a superclass, we write it in the parentheses after the class name.

```python shell
class Censor:
    def init(self):
        self.erased = []
    def bleep(self, sequence):
        return [x for x in sequence if x not in self.erased]
class Bleep(Censor): # Subclass of Censor
    def init(self): # Overrides init method from Filter superclass
        self.erased = ['CENSORED']
```
`Censor` on its own is a general class and does not actually censor anything. However, it becomes useful when we can use it as a base class that bleeps out 'CENSORED' words from sequences once the `bleep` method is inherited and `init` overwritten.

**Abstract base classes**, also known as the `abc` module in Python, is useful in identifying the functionality a class should be able to provide, without actually implementing it.

#### Example
``` python shell
from abc import ABC, abstractmethod
class Print(ABC):
		@abstractmethod
		def echo(self):
				pass
```
`@abstractmethod` is a decorator that marks the method as abstract, and therefore as one that must be implemented in a subclass. We can subclass it and instantiate it by overwriting the `echo` method:

```python shell
class Typewriter(Print):
		def echo(self):
				print("Overwriting the base class!")
```
After instantiating `Typewriter` object `t`, we can access its `echo` method:

```python shell
>>> t = Typewriter()
>>> isinstance(t, Typewriter)
True
>>> t.echo()
Overwriting the base class!
```
However, if we create another class that is not a subclass of `Print`, we still pass type checking:

```python shell
class Scribe:
		def echo(self):
				print("Sample Text")
```

It passes as a `Typewriter` object, yet isn't one:

```python shell
>>> s = Scribe()
>>> isinstance(s, Print)
False
```
Sometimes it isn't possible to subclass, such as when importing `Scribe` from someone else's module, for instance. In this case, we can register `Scribe` as a `Typewriter` as follows:

```python shell
>>> Typewriter.register(Scribe)
<class '__main__.Scribe'>
>>> isinstance(s, Typewriter)
True
>>> issubclass(Scribe, Typewriter)
True
```
One caveat is that while any instances of a subclass of an abstract class we register will return `True` as an instance, it will not have its attribute `echo`, and this is in keeping with **duck typing** (the type or the class of an object is less important than the methods it defines).

![Image of Duck Typing Quote](https://www.thebraziltimes.com/photos/29/19/52/2919525-B.jpg)

### Polymorphism
**Polymorphism** comes from the Greek word for "having many forms." It is the ability to treat objects of different types and classes similarly. Concretely, this means you can use the same operations on objects of different classes without knowing the specifics of its class implementation.

The benefit is loose coupling, more flexibility, and easier refactoring. However, when we need to find out what methods or attributes an object has, we can use **interfaces** and certain functions.

#### Example
The `repr()` function returns a printable representational string of the given object. It is different than `str()` because it is used primarily for debugging (calculating precise values and printing strings exactly as represented); whereas `str()` is for output purposes.

```python shell
def text_length(x):
    print("The length of", repr(x), "is", len(x))
```
`repr()` is an example of polymorphism because it works regardless of the input type:

```python shell
>>> text_length('Test String')
The length of 'Test String' is 11
>>> text_length([90, 32, 12, 09])
The length of [90, 32, 12, 09] is 4
```
### Encapsulation
**Encapsulation** is hiding unimportant details of how objects work from the outside world. Objects can have their internal states (attributes) hidden. This makes attributes available only through methods. In Python, however, all attributes are publicly available, which means programmers can accidentally make the state inconsistent.

#### Example
Here we create an object and bind variable `c` to it. Suppose we write a `HiddenObject` class to encapsulate a name within the object using an attribute instead of a global variable.

```python shell
>>> pcbh = HiddenObject()
>>> pcbh.set_name('Princess Consuela Banana')
>>> pcbh.get_name()
'Princess Consuela Banana'
```
After creating another object, we see that the original object `h` retains its name because it has its own state which can be changed using class methods.

```python shell
>>> cb = HiddenObject()
>>> cb.set_name('Quack')
>>> cb.get_name()
'Quack'
>>> pcbh.get_name()
'Princess Consuela Banana'
```
