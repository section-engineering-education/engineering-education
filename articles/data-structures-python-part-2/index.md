---
layout: engineering-education
status: publish
published: true
slug: data-structures-python-part-2
title: List, Data Structures in Python
description: An overview of data structures in this article, and move on to learn about every data structure, and its implementation in Python throughout this series.
author: saiharsha-balasubramaniam
date: 2020-07-03T00:00:00-12:00
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-structures-python-part-2/hero.jpg
    alt: list, python data structures

---
Python Lists are amazing, with extremely powerful features that cut down the lines of code and the time taken to write the code. Let us start looking into various list creation, updating, and deletion and other powerful list methods. Let us resume this series with the most fundamental and powerful Data Structure in Python, the list which is similar to arrays.
<!--more-->

![Array, Meme](/engineering-education/data-structures-python-part-2/array-mindexpands.png)

### Table of Contents
- [Creating a List](#creation)
- [Accessing Various Elements](#accessing-various-elements)
- [List Slicing and Reversing](#list-slicing-and-reversing)
- [List Methods](#list-methods)
- [List Comprehension](#list-comprehension)
- [Conclusion](#conclusion)

### Creation
In Python, lists are represented by **square brackets**. Therefore, we create a list as follows.

```
colors = ['red', 'blue', 'green']
```
The above list, ```colors``` is stored in memory as shown below.

![List, Visualization](/engineering-education/data-structures-python-part-2/list-vis.png)

We can also create a list with multiple data types, like strings, integers and floats in them.

```
type = ['hello', 3.14, 420]
```

### Accessing Various Elements
Python Lists follow a **Zero Indexing**, and the list index starts from 0. Nested Lists are accessed using **nested indexing**.

```
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

Python has a very handy **negative indexing** feature as well!

```
colors = ['red', 'blue', 'green']

# Output: 'green'
print(colors[-1])
```

### List Slicing and Reversing
We can reverse and slice lists using list indices, as follows

```
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
For more information regarding list slicing, refer to this [link](https://stackoverflow.com/questions/509211/understanding-slice-notation)

### List Methods

#### list.index()
Returns the index of specified element in the list.
The syntax is,  ```list.index(element, start, end)```
```
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
This method adds an item at the end of a list.
```
fruits = ['apple']
fruits.append('orange')

# Output: ['apple', 'orange']
print(fruits)
```

#### list.extend()
Extends the list by appending items.
```
animals = ['lion', 'tiger']
animals1 = ['wolf', 'panther']
animals.extend(animals1)
print(animals)
# Output: ['lion', 'tiger', 'wolf', 'panther']
```

#### list.insert()
Insert an element into the mentioned index.
```
nums = [1, 2, 3, 4, 5]
nums.insert(5, 6)
# Note: the element 6 is inserted in the index 5
print(nums)
# Output: [1, 2, 3, 4, 5, 6]
```

#### list.remove()
Remove the first element that matches from the specified list.
```
languages = ['english', 'tamil', 'french']
languages.remove('tamil')
print(languages)
# Output: ['english', 'french']

# Throws not in list exception
languages.remove('tamil')
```

#### list.count(x)
Returns the number of times that 'x' appears in the list.
```
counts = [0, 1, 2, 3, 2, 1, 4, 6, 2]
print(list.count(2))
# Output: 3
```

#### list.pop()
The pop() method removes and returns the element specified in the parameter. If the parameter is not specified, it removes and returns the last element in the list.
```
alpha = ['a', 'b', 'c', 'd', 'e']
x = alpha.pop()

# Output: 'e'
print(x)
# Output: ['a', 'b', 'c', 'd']
print(alpha)
```

#### list.reverse()
This method reverses the list, and updates it. It has no return value.
```
alpha = ['a', 'b', 'c', 'd', 'e']
alpha.reverse()
# Output: ['e', 'd', 'c', 'b', 'a']
print(alpha)
```

#### list.sort()
The sort method sorts the elements of the given list. Syntax: ```list.sort(key= , reverse= )```
```
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
This method copies the list into another list.
```
list1 = [1, 2, 3]
list2 = list1.copy()

# Output: [1, 2, 3]
print(list2)
```

#### list.clear()
This method empties the given list.
```
l = ['hello', 'world']

# Output: ['hello', 'world']
print(l)

# Clearing the list
l.clear()

# Output: []
print(l)
```

### List Comprehension
List Comprehensions are advanced features in Python that enable you to create a new list from an existing list and it consists of expressions within a for statement inside square brackets.

For example,
```
# The below statement creates a list with 5, 10, ...
p = [5 + x for x in range(5)]

# Output: [5, 10, 15, 20, 25]
print(p)
```

### Conclusion
Therefore, lists are one of the most commonly used and most powerful data structures in Python. If one manages to master lists, he/she would perform very well in programming interviews. Once you're done reading and using the list methods, check out the below links and start solving programs based on lists.

- List - Problems on [LeetCode](https://leetcode.com/tag/array/)
- Arrays - Problems on [HackerRank](https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=arrays)

Stay Tuned for the next part in the series!
