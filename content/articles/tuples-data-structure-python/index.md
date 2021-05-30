---
layout: engineering-education
status: publish
published: true
url: /tuples-data-structure-python/
title: Tuple Data Structure in Python
description: This article serves as an introduction to Tuples are similar to lists but vary in the following aspects they are immutable, (they cannot be changed) unlike lists which are mutable (they can be changed).
author: saiharsha-balasubramaniam
date: 2020-11-25T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/tuples-data-structure-python/hero.jpg
    alt: Tuple data structure example image
---
A tuple is an ordered collection of items. An ordered collection keeps the items in the order you insert or initialize them. In other words, the order is preserved. This is in contrast to dictionaries or sets, where the order is not preserved (unordered collections).
 <!--more-->
Tuples are like lists but vary in the following aspects: They are immutable, (we cannot change them) unlike lists which are mutable (we can change them). Let us learn more about tuples and their related methods. We’ll also learn to effectively use them in Python.

For more background on the different data structures in Python, check out the following articles:
- [Introduction to Data Structures](/data-structures-python-part-1/)
- [List](/list-data-structure-python/)
- [Stack](/stack-data-structure-python/)
- [Queue](/queue-data-structure-python/)
- [Linked Lists](/linked-list-data-structure-python/)
- [Binary Trees](/binary-tree-data-structure-python/)
- [Heaps](/heap-data-structure-python/)
- [Graphs](/graph-data-structure-python/)

*Note: Prerequisites -- Make sure you have basic Python knowledge before diving into this article. It also might be a good idea to check out some linear data structures. (links are given above)*

### Table of Contents
- [Tuples: Let's Code](#tuples-lets-code)
  - [Creating a Tuple](#creating-a-tuple)
  - [Accessing Items in a Tuple](#accessing-items-in-a-tuple)
  - [Modifying Tuples](#modifying-tuples)
  - [Tuple Methods](#tuple-methods)
- [Applications of Tuples](#applications-of-tuples)
- [Further Reading](#further-reading)

### Tuples: Let's Code
As we discussed, a Tuple is a collection of items that are immutable. Let's start by creating a tuple.

#### Creating a Tuple
A tuple can be created in multiple ways. The simplest way of creating a tuple is by setting a variable to a pair of empty parantheses.

```py
# Set the tuple1 variable to an empty tuple
tuple1 = ()

# Check if the tuple is initialized properly
print(type(tuple1))

# Output : <class 'tuple'>
```

The code above snippet gives an output of `<class: 'tuple'>`, which indicates that the tuple has been created successfully. We can also create a tuple by using the in-built `tuple()` method in Python.

```py
# Set the tuple2 variable to an empty tuple by using the tuple() method
tuple2 = tuple()

# Check if the tuple is initialized properly
print(type(tuple2))

# Output : <class 'tuple'>
```

While initializing a tuple, we can also specify what data exists inside it.

```py
# tuple3 consists of values 40, 50, 60
tuple3 = (40, 50, 60)

# tuples can also consist of different datatypes
tuple4 = (45, "55", "Hello World", True, 42.6)

# we can also create a tuple of lists
tuple5 = ([10, 20], [30, 40], [50, 60])
```

#### Accessing Items in a Tuple
Tuples follow [zero indexing](https://en.wikipedia.org/wiki/Zero-based_numbering). In zero indexing, the first element of the tuple has the index '0', the second element of the tuple has the index '1', and so on.

##### Positive Indexing
For example, let's create a tuple, `tuple1`. Tuple elements can be accessed the same way as a list element.

```py
tuple1 = (0, 1, 2, 3)

print(tuple1[0]) # Output: 0

print(tuple1[1]) # Output: 1
```

This tuple follows zero indexing.

![Tuple Positive Indexing](/engineering-education/tuples-data-structure-python/tuple-positive-index.png)

*Tuple Positive Indexing: Source -- [GeeksforGeeks](https://www.geeksforgeeks.org/python-tuples/)*

##### Negative Indexing
Similar to lists, we can also use negative indexing on a tuple. Therefore, '-1' refers to the Nth element of a tuple, -2 refers to the (N-1)th element, and so on (where N is the length of the tuple).

```py
tuple1 = (30, 40, 50, 60)

print(tuple1[-1]) # Output: 60

print(tuple1[-3]) # Output: 40
```

![Tuple Negative Indexing](/engineering-education/tuples-data-structure-python/tuple-negative-index.png)

*Tuple Negative Indexing*

##### Slicing
In Python, slicing is used to return a range of values. Like lists, tuples can also be sliced.

```py
tuple1 = (1, 2, 3, 5, 8, 13)

print(tuple1[0:3]) # Output: (1, 2, 3)

print(tuple1[4:]) # Output: (8, 13)
```

As per the examples shown above, if we slice a range of \[a : b\), it would return from tuple index a to tuple index (b - 1). For more tricks on Python slicing, check out [this page](https://stackoverflow.com/questions/509211/understanding-slice-notation).

#### Modifying Tuples
Tuples are immutable. 

For example:
```py
tuple1 = (2000, 3000, 4000)

tuple1[1] = 1000
```

If we execute the code above, the Python interpreter throws the following error:

```bash
Traceback (most recent call last):
    File "main.py", line 3 in <module>
        tuple1[1] = 1000
TypeError: 'tuple' object does not support item assignment
```

This is because a tuple is designed to be immutable. However, we can change a tuple that contains mutable objects. 

For example, let us take a tuple of lists.

```py
tuple1 = ([10, 20], [30, 40], [50, 60])

tuple1[1][0] = 70

print(tuple1) # Output: ([10, 20], [70, 40], [50, 60])
```

This works perfectly because we are modifying the list within a tuple (which is mutable). We can also create new tuples from existing ones.

```py
tuple1 = ([10, 20], [30, 40], [50, 60])
tuple2 = ([100, 200], [300, 400])

# Creating a new tuple from tuple1 and tuple2
tuple3 = tuple1 + tuple2

print(tuple3) # Output: ([10, 20], [30, 40], [50, 60], [100, 200], [300, 400])
```

#### Tuple Methods
Tuples have the following in-built methods that make them extremely powerful:

- **`cmp(tuple1, tuple2)`**
- **`len(tuple)`**
- **`min(tuple)`**
- **`max(tuple)`**
- **`tuple(list)`**
- **`t.count(el)`**
- **`t.index(el)`**

##### cmp(tuple1, tuple2)
*Note: The cmp() method existed in python2. It wasn't included in python3. Therefore we define our own compare method.*

The compare method analyses two tuples element by element. 

It compares them and returns the following:
- If tuple1 > tuple2: the method returns 1.
- If tuple2 > tuple1: the method returns -1.
- If tuple1 == tuple2: the method returns 0.

```py
def cmp(t1, t2):
    return bool(t1 > t2) - bool(t1 < t2)
    """
    When both tuples are equal,
        bool(t1 > t2) = 0
        bool(t1 < t2) = 0
        Therefore, 0 - 0 = 0

    When both tuple1 > tuple2,
        bool(t1 > t2) = 1
        bool(t1 < t2) = 0
        Therefore, 1 - 0 = 1

    When both tuple2 > tuple1,
        bool(t1 > t2) = 0
        bool(t1 < t2) = 1
        Therefore, 0 - 1 = -1
    """
tuple1 = (100, 200)
tuple2 = (300, 400)

print(cmp(tuple1, tuple2))
# Output: -1

print(cmp(tuple2, tuple1))
# Output: 1

tuple1 = (100, 200)
tuple2 = (100, 200)

print(cmp(tuple2, tuple1))
# Output: 0

tuple1 = (100, 300)
tuple2 = (200, 100)

print(cmp(tuple2, tuple1))
# Output: 1
# This is because the tuple comparison is done left to right. When tuple2[0] > tuple1[0], no further comparisons are made and the output is returned as zero. This is how the cmp() method works in Python.
```

##### len(tuple)
The length method returns the length of the tuple.

```py
tuple1 = (10, 20, 30, 40, 50)

print(len(tuple1))
# Output: 5
```

##### min(tuple)
The min method returns the smallest element in the tuple.

```py
tuple1 = (3, 9, 1, 90, 200)

print(min(tuple1))
# Output: 1
```

##### max(tuple)
The max method returns the largest element in the tuple.

```py
tuple1 = (3, 9, 1, 90, 200)

print(max(tuple1))
# Output: 200
```

##### tuple(list)
The tuple method converts the list that is passed as parameter into a tuple.

```py
list1 = [23, 34, 45, 56]

print(tuple(list1))
# Output: (23, 34, 45, 56)
```

##### t.count(el)
The count method returns the count of the element passed as parameter.

```py
tuple1 = (1, 24, 45, 54, 6, 34, 24)

print(tuple1.count(24))
# Output: 2
```

##### t.index(el)
The index method returns the index of the first occurence of the element in a tuple.

```py
tuple1 = (1, 24, 45, 54, 6, 34, 24)

print(tuple1.index(1))
# Output: 0
```

You can also return the index of the last occurence of the element by using this method.

```py
tuple1 = (1, 24, 45, 54, 6, 34, 24)

print(tuple1.index(24, -1))
# Output: 6
# The second parameter specifies which index to start the search from
# -1 refers to the last element in the tuple, so it searches in reverse
```

It's also possible to specify a range to search.

```py
tuple1 = (1, 24, 45, 54, 24, 6, 34, 24)

print(tuple1.index(24, 2, 5))
# Output: 4
# The second paramter is the starting index, third parameter is the ending index
```

### Applications of Tuples
- Tuples are especially used as protection against modification. Since they are immutable, we can use tuples to write-protect data.

- When iterating over a tuple, a considerable performance gain is observed when we compare it to lists. This is more evident when the size of the tuple is large. Using the `timeit` module in Python, we see that tuples are considerably faster to iterate when compared to lists.

![Tuple Performance](/engineering-education/tuples-data-structure-python/tuples-performance.png)

*Note: For more in-depth analysis of why tuples perform better, check out [this](https://stackoverflow.com/questions/68630/are-tuples-more-efficient-than-lists-in-python#comment2117930_68817) StackOverflow thread.*

- The dictionary data structure has an immutable key. Therefore tuples can be used as a key in a dictionary.

- Tuples can be used to group related data. For example, a row in a database table can be grouped together and stored in a tuple.

### Further Reading
We have looked at the tuple data structure, its implementation and methods. To get a better grip with tuples, take a look at these resources. You can find more about tuples in the Python official [documentation](https://docs.python.org/3/library/stdtypes.html#tuple).

- Ways to Shuffle a Tuple: [GeeksforGeeks](https://www.geeksforgeeks.org/ways-to-shuffle-a-tuple-in-python/)

- Sort List of Tuple based on Sum: [GeeksforGeeks](https://www.geeksforgeeks.org/python-sort-list-of-tuple-based-on-sum/)

- Named Tuple: [Python Docs](https://docs.python.org/3.3/library/collections.html#collections.namedtuple)

- Tuples: [HackerRank](https://www.hackerrank.com/challenges/python-tuples/problem)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

