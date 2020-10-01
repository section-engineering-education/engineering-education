---
layout: engineering-education
status: publish
published: true
url: /engineering-education/binary-search/
title: All About Binary Search
description: Walk-through of a simple Binary Search implementation in Python and discussion of binary search time and space complexity.
author: sophia-raji
date: 2020-05-04T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/binary-search/hero.jpg
    alt: binary search magnifying glass
---
A **binary search** is an algorithm that finds the position of a target value in a *sorted* list. It has [several uses in practice](https://stackoverflow.com/questions/540165/where-is-binary-search-used-in-practice):
- Finding entries in sorted arrays, including sorted collections from language libraries like Java, .NET, C++ STL;
- Hunting for errors during the debugging process, which is faster than single-stepping large parts of the code (even Git has a [git-bisect command](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git#Binary-Search));
- Retrieving 3D game displays according to position and camera.
<!--more-->

### Process
1. Compare target to middle number, since the last is sorted – this tells us whether the target will be in the left or right half of the list.
2. We now ignore the other half of the list, seeing as we have divided the problem in half.
3. Repeat the same process, with the middle of the new half of the list we are using, until finding the target value, or not finding it in the list.

### Benefits
- Reduces time complexity of linear search from `O(n)` to `O(log n)` in sorted list – this is because the search interval decreases by a power of two each time (halving the lists).
- Includes cost of `insert()`, `delete()`, and `lookup()`
- Space complexity is O(1), meaning it requires constant time to perform operations, as we just need to store three values (upper, middle, and lower bounds)
- More efficient for searching for specific target from large input
- Simple to program for lists

**Fun fact:** You could search all the names in the world (written in order) and find a specific name in a maximum of [35 iterations](https://www.hackerearth.com/practice/algorithms/searching/binary-search/tutorial/)

### Disadvantages
- It only works on sorted lists that are kept sorted
- More complicated to implement than a linear search – it requires a three-way update of low and high index, and potentially an additional check if the target wasn't found
- Overkill for smaller lists
- The recursive implementation requires more stack space
- Loss of efficiency if the list does not support random-access

Additionally, using interpolating search to predict where to start searching when the elements are distributed evenly gets us to our destination more quickly than a binary search tree, i.e. `O(log(log(n)))` instead of `O(log(n))`; and there are further improvements over binary search for sorted arrays that are uniformly distributed (sorted but unindexed on-disk datasets). However, when list size increases exponentially, interpolation search time complexity is `O(log(n))`, the worst case, as it has to go to different locations according to the value of what is being searched.

### Implementation

```python shell
def binary_search(target, input):
    # We use variables low and high as bounds around our target
    low = -1 # set low as -1 to start bound to the left of 0th index
    high = len(input)
    # We know the target must not be in the input when there isn't
    # at least one element between low and high indices
    while low + 1 < high:
        # calculate middle index by taking average of bounds
        distance = high - low
        # integer division used so we don't get a 'half index'
        # flors result
        middle = distance // 2
				# move new guess index by adding middle to low index
        guess_index = low + middle
        guess_value = input[guess_index]
        if guess_value == target:
            return True
        if guess_value > target:
            # target is to the left, so move high index to the left
            high = guess_index
        else:
            # target is to the right, so move low index to the right
            low = guess_index
    return False
```

### Python-Specific Modules and Features
The above implementation takes a target and a set of elements as an input. What if our target was a string value and we wanted to search by index instead? In that case, you can use an `index` parameter:
```python shell
def binary_search(target, input, index = identity):
```
By using the `index` parameter, we lose the ability to search by value. We could assign index a default value of `None` and then check whether it was supplied, but a simpler solution uses an inline function:
```python shell
def binary_search(target, input, index = lambda x: x)
```
Here we use `lambda` to create an anonymous function (one not bound to an identifier). Instead of including a “return” statement like a regular function, it returns an expression.
  - **lambda**: shortcut for declaring small anonymous functions; can take many arguments but return only one expression

In addition, there are useful functions and modules we can use to implement binary search in Python such as:
  - **recursive()**: an inner function that can access both elements and value parameters even though they’re defined in the enclosing scope

This is potentially useful when manually implementing a recursive binary search algorithm.

  - **bisect()**: a build-in module that helps you find an index of an element or add a new element in an already sorted list, via `insort()`, `insort_left()`, or `insort_right()`

This helps avoid having to sort the list after each insertion.

### Example using bisect():
```python shell
>>> def grade(score, breakpoints=[60, 70, 80, 90], grades='FDCBA'):
        i = bisect(breakpoints, score)
        return grades[i]
>>> [grade(score) for score in [33, 99, 77, 70, 89, 90, 100]]
['F', 'A', 'C', 'C', 'B', 'A', 'A']
```
