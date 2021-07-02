---
layout: engineering-education
status: publish
published: true
url: /list-data-structure-python/
title: Using the List Data Structure in Python
description: The list data structure is one of the most fundamental and powerful data structures in Python, allowing you to cut down on the lines of code you write.
author: saiharsha-balasubramaniam
date: 2020-07-15T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/list-data-structure-python/hero.jpg
    alt: list, python data structures

---
Python lists are extremely powerful features that cut down the lines of code and the time taken to write your code. In this article, we'll look at various ways to use the Python list data structure to create, update, and delete lists, along with other powerful list methods.
<!--more-->

*For more background on the different types of data structures in Python, check out my [previous article](/data-structures-python-part-1/).*

### Table of Contents
- [Creating a List](#creation)
- [Accessing Various Elements](#accessing-various-elements)
- [List Slicing and Reversing](#list-slicing-and-reversing)
- [List Methods](#list-methods)
- [List Comprehension](#list-comprehension)
- [Conclusion](#conclusion)

### Creation
In Python, lists are represented by **square brackets**. Therefore, we create a list as follows.

```python
colors = ['red', 'blue', 'green']
```
The above list, `colors` is stored in memory as shown below.

![List, Visualization](/engineering-education/list-data-structure-python/list-vis.png)

We can also create a list that contains multiple data types, like strings, integers, and floats.

```python
type = ['hello', 3.14, 420]
```

### Accessing Various Elements
Python lists follow a **zero indexing** structure, meaning the list index starts from 0. Nested lists are accessed using **nested indexing**.

```python
# List Initialization and Assignment
colors = ['red', 'blue', 'green']

# Output: 'red'
print(colors[0])

# Nested List
nest = [[0, 1, 2], [3, 4, 5]]

# Output: 4
print(nest[1][1])

# Error Thrown: IndexError
print(colors[3])

# Error Thrown: TypeError
print(colors[1.0])
```

Python has a very handy **negative indexing** feature as well, which starts from the end of the list:

```python
colors = ['red', 'blue', 'green']

# Output: 'green'
print(colors[-1])
```

### List Slicing and Reversing
We can reverse and slice lists using list indices, as follows

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# This notation slices from start index -> stop index - 1
# Output: [0, 1, 2, 3]
print(nums[0:4])

# The third number in the notation defines the step (indices to skip)
# By default, step is 1.
# Output: [0, 2]
print(nums[0:4:2])

# If step is a negative number, it slices from the end of list (reverse)
# Output: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
print(nums[::-1])

# Output: [0, 1, 2, 3, 4] (beginning to 4th)
print(nums[:-5])

# Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(nums[:])
```
For more information regarding list slicing, refer to this [link](https://stackoverflow.com/questions/509211/understanding-slice-notation).

### List Methods

#### list.index()
`list.index()` returns the index of a specified element in the list.
The syntax is: `list.index(element, start, end)`
```python
# vowels list
vowels = ['a', 'e', 'i', 'o', 'i', 'u']

# index of 'e' in vowels
index = vowels.index('e')
# Output: 1
print(index)

index = vowels.index('x')
# Output: Throws ValueError exception
```

#### list.append()
The `list.append()` method adds an item at the end of a list.
```python
fruits = ['apple']
fruits.append('orange')

# Output: ['apple', 'orange']
print(fruits)
```

#### list.extend()
`list.extend()` extends the list by appending items.
```python
animals = ['lion', 'tiger']
animals1 = ['wolf', 'panther']
animals.extend(animals1)
print(animals)
# Output: ['lion', 'tiger', 'wolf', 'panther']
```

#### list.insert()
`list.insert()` inserts an element into the mentioned index.
```python
nums = [1, 2, 3, 4, 5]
nums.insert(5, 6)
# Note: the element 6 is inserted in the index 5
print(nums)
# Output: [1, 2, 3, 4, 5, 6]
```

#### list.remove()
`list.remove()` removes the first element that matches from the specified list.
```python
languages = ['english', 'tamil', 'french']
languages.remove('tamil')
print(languages)
# Output: ['english', 'french']

# Throws not in list exception
languages.remove('tamil')
```

#### list.count(x)
`list.count()` returns the number of times that 'x' appears in the list.
```python
counts = [0, 1, 2, 3, 2, 1, 4, 6, 2]
print(list.count(2))
# Output: 3
```

#### list.pop()
The `list.pop()` method removes and returns the element specified in the parameter. If the parameter is not specified, it removes and returns the last element in the list.
```python
alpha = ['a', 'b', 'c', 'd', 'e']
x = alpha.pop()

# Output: 'e'
print(x)
# Output: ['a', 'b', 'c', 'd']
print(alpha)
```

#### list.reverse()
The `list.reverse()` method reverses the list, and updates it. It has no return value.
```python
alpha = ['a', 'b', 'c', 'd', 'e']
alpha.reverse()
# Output: ['e', 'd', 'c', 'b', 'a']
print(alpha)
```

#### list.sort()
The `list.sort()` method sorts the elements of the given list using the syntax: `list.sort(key= , reverse= )`
```python
# vowels list
vowels = ['e', 'a', 'u', 'o', 'i']

# sort the vowels
vowels.sort()

# print vowels
print(vowels)
# Output: ['a', 'e', 'i', 'o', 'u']

# sort in reverse
vowels.sort(reverse=True)

# print vowels
print(vowels)
# Output: ['u', 'o', 'i', 'e', 'a']
```

#### list.copy()
The `list.copy()` method copies the list into another list.
```python
list1 = [1, 2, 3]
list2 = list1.copy()

# Output: [1, 2, 3]
print(list2)
```

#### list.clear()
The `list.clear()` method empties the given list.
```python
l = ['hello', 'world']

# Output: ['hello', 'world']
print(l)

# Clearing the list
l.clear()

# Output: []
print(l)
```

### List Comprehension
List Comprehensions are advanced features in Python that enable you to create a new list from an existing list, and it consists of expressions within a for statement inside square brackets.

For example:
```python
# The below statement creates a list with 5, 10, ...
p = [5 + x for x in range(5)]

# Output: [5, 10, 15, 20, 25]
print(p)
```

### Conclusion
Lists are one of the most commonly used and most powerful data structures in Python. If one manages to master lists, he/she will perform very well in programming interviews. Once you're done reading and using the list methods, check out the below links and start solving programs based on lists.

- List - Problems on [LeetCode](https://leetcode.com/tag/array/)
- Arrays - Problems on [HackerRank](https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=arrays)
