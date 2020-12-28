---
layout: engineering-education
status: publish
published: true
url: /engineering-education/python-generators/
title: A look at Python Generators
description: In this article we will go over the concepts of generators in Python. Generators are useful when working with complex datasets and performing memory-intensive tasks.
author: odhiambo-paul
date: 2020-11-16T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-generators/hero.jpg
    alt: Python example image
---
Generators are functions that return an iterable set of items that can be iterated through one at a time. They were introduced with Python Enhancement Proposal 255 [(PEP 255)](https://www.python.org/dev/peps/pep-0255/). Python Enhancement Proposal 255 is a design document that provides information to the Python developer community describing the concept of generators in Python.
<!--more-->
Python generators are objects that can be looped over similar to that of a list. Unlike lists, lazy iterator contents are not stored in the memory. The efficient way to iterate through large datasets is through the use of generators.

### Prerequisites
You'll need to have a basic understanding of Python to get started. This will help guide you through each of the functions and the keywords. All the functions and code used can be found on [repl.it](https://repl.it/@paulodhiambo962/PythonGenerators/).

To execute various functions, click on RUN.

You will now be able to access the variables and the function return values from the Python interpreter.

**A generator function** is defined like a normal function, but rather than returning a value from the return keyword, it produces and returns a value via the yield keyword. If we find the keyword yield in the function, it becomes a generator function and returns a generator object.

**Generator Object** uses lazy evaluations to yield sequences. To get values from the generator object, call the `next()` method on the generator object or loop through the generator object.

**A yield** statement pauses the execution of the function and returns the value to the caller, but maintains the status of the function to allow the function to continue execution from where it is left off. When resumed, the function continues execution immediately after the last run of the yield. This generates a set of values over time, rather than computing them at once and sending them back as a list.

**Generator Expressions** are a memory-efficient and high-performance generalization of list comprehensions and generators as discussed later in the article.

### Generator Expressions versus List Comprehensions
```python
list_comprehension = ['List Comprehension' for n in range(4)]
generator_expression = ('Generator expression' for n in range(4))
```

Unlike list comprehensions, generator expressions don’t construct list-objects, they generate values “just in time” as a generator function or class-based iterator would. Class-based iterator and generator functions implement the iterators which makes it possible to construct a list object by calling the `next()` object.

You need to call `next()` or loop through the generator object to access the values produced by the generator expression. When there isn't the next value in the generator object, a `StopIteration` exception is thrown.

```python
>>> next(generator_expression)
'List Comprehension'
>>> next(generator_expression)
'List Comprehension'
>>> next(generator_expression)
'List Comprehension'
>>> next(generator_expression)
'List Comprehension'
>>> next(generator_expression)
StopIteration
```

A for loop can be used to iterate the generator object.

```python
for expression in generator_expression:
    print(expression)
```

Given a range of n numbers to filter out odd numbers. We could solve the problem using three different methods listed below.

1. Using function.

```python
def even_integers_function(n):
    result = []
    for i in range(n):
        if i%2==0:
            result.append(i)
    return result
```

```python
>>>even_integers_function(10)
[0,2,4,6,8,10]
```

2. Using Generator function.
The generator function below yields a generator object that we can iterate through to get a list of even numbers.

```python
def even_integer_generator(n):
    for i in range(n):
        if i % 2 == 0:
            yield i
```

A generator function returns a generator object that can be iterated to get the values.

```python
>>>even_integer_generator(10)
<generator object even_integer_generator at 0x1036c3200>
```

```python
>>>list(even_integer_generator(10))
[0,2,4,6,8,10]
```

3. Using Generator expression.

```python
>>> even_integers = (i for i in range(10) if i%2==0)
>>> list(even_integers)
[0,2,4,6,8]
```

Given a list of names, we can convert each name in the list to uppercase using the following code:
```python
name_list = ["Adam","Eve","John","Doe","Peter","Paul","Kevin"]
```

1. Use of functions.

```python
def names_to_uppercase(names):
    uppercase_names = []
    for name in names:
        name.upper()
        uppercase_names.append(name)
    return uppercase_names
```

2. Use of generator functions.

```python
def names_to_uppercase_generator(names):
    for name in names:
        name.upper()
        yield name
```

3. Use of generator expressions.

```python
>>> uppercase_names = (name.upper() for name in name_list)
>>> list(uppercase_names)
['ADAM', 'EVE', 'JOHN', 'DOE', 'PETER', 'PAUL', 'KEVIN']
```

### Profiling Generator Performance
```python
>>> import sys
# Square root of numbers in a range using list comprehension.
>>> nums_squared_list = [n * 2 for n in range(10000)]
>>> sys.getsizeof(nums_squared_list)
87724
# Square root of numbers in a range using generator functions.
>>> nums_squared_generator = (n ** 2 for n in range(10000))
>>> print(sys.getsizeof(nums_squared_generator))
125
```

List comprehension uses 87724 bytes of memory while the generator function uses only 125 bytes of memory. By using generators we save memory when compared to list comprehension where a lot of memory is used.

The `getsizeof()` object returns the amount of memory that holds the `nums_squared_list` list compared to `len()` object that would return the total number of items with the `nums_sqaured_list` list.

```python
>>>len(nums_squared_list)
10000
```

**Generating the Fibonacci sequence using generator functions.**
The Fibonacci sequence is a series of numbers where the next number is identified by adding the two previous numbers.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

```python
def fibonacci_gen():
    trailing,leading = 0,1
    while True:
        yield leading
        trailing,leading = leading, trailing+leading
```

To get the first value of the Fibonacci sequence that we generated using generator function above we call the `fibonacci_gen()` function and assign it to variable fib, we then call `next()` on the `fib` variable, `fib.next()` to get the next number in the sequence.

```python
>>>fib = fibonacci_gen()
>>>fib.next()
```

To get the list of the first 10 values for the `fibonacci_gen()` function we call the `fib.next()` inside a for loop with a range of 10:

```python
for _ in range(10):
    fib.next()
```

### Building Generator pipelines
Data pipelines allow you to string together code to process large datasets or streams of data without maxing out your machine’s memory.

**When working with pipelines:**
- Several pipes can be linked together.

- Items flow one by one through the entire pipeline.

- We can package pipeline functionality into a callable function.

To get the longest name from the text file [names.txt](https://repl.it/@paulodhiambo962/PythonGenerators#text/names.txt), we create two generator methods.

- The first generator method `full_names` yields names line by line stripping off the new line from each line.
- The second generator method lengths yield a tuple with a name and an integer representing its length.
- To get the longest name we use max and pass in the lengths generator object and pass a key for the lengths.

```python
def get_longest_name():
	full_names = (name.strip() for name in open("text/names.txt"))
	lengths = ((name,len(name)) for name in full_names)
	longest = max(lengths,key=lambda x:x[1])
```
### Conclusions
In this article we went over the concepts of generators in Python.  They are useful when working with complex datasets and performing memory-intensive tasks. You can find more on Python generators from the Python [wiki](https://wiki.python.org/moin/Generators/). These will help you create better applications with cleaner code and offer alternatives to creating nested for loops and working with list comprehensions that are memory intensive.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
