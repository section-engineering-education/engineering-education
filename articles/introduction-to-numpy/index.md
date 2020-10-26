---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-numpy/
title: A Not-So-Gentle Introduction to NumPy
description:
author:
date: 2020-10-22T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-numpy/hero.jpg
    alt: NumPy example image
---
One of the most fundamental libraries in the Machine Learning and Data Science landscape is unarguably NumPy (which stand for Numerical Python). Its significance has led to many other (similar) libraries like Pandas, SciPy, and Matplotlib (all based on NumPy). Let us delve into the workings and the various functions of the first import line in 99.78% of [Kaggle notebooks](https://www.kaggle.com/docs/notebooks).
<!--more-->
### Introduction
The Python programming language is the [most versatile language](https://codeinstitute.net/blog/what-are-the-six-most-popular-programming-languages-today) to have ever lived. Yes, lived. Python provides a rich set of high-level data structures, lists for a collection of objects, dictionaries to build hash tables, etc.

However, these structures are not suited for [high-performance numeric computation](https://www.scribd.com/document/182500663/NumPY-Array).

```py
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy as sc
```

### Table Of Contents
1. [Introduction](#introduction)
2. [Reason for the NumPy Library](#reason-for-the-numpy-library)
3. [Enter NumPy](#enter-numpy)
4. [NumPy Functions](#numpy-functions)
5. [How is NumPy so fast?](#how-is-numpy-so-fast)
6. [Conclusion](#conclusion)

### Reason for the NumPy Library
To back that statement up, let’s use one of Python’s fundamental data structure, a list, and multiply every element in the list with a constant, let's say 5.

```py
import time

#Create a list
list_a = []

#Append 100,000 elements to the list
for i in range(100000):
    list_a.append(i)

start_time = time.time()

#Multiply every element in list_a with 5
list_b = [5*number for number in list_a]

#Calculate time taken to multiply every element
end_time = time.time() - start_time

print("Tim" taken for a list: ), end_time

#Output - Time taken for a list - 0.0039899349212646484s
```

In a real-world setting like that of a processing chip within a self-driving car, 0.03 seconds for 100,000 multiplication operations is highly ineffective.

There could be millions of multiplication and addition operations to be done in a second, and those 0.03 seconds could result in a life or death situation.

### Enter NumPy
A NumPy array is a multidimensional, uniform collection of elements. Unlike a normal array of fixed shape MxN (a matrix), NumPy arrays can have any dimensionality. NumPy arrays are a way of describing one or more blocks of computer memory so that the numbers represented can be manipulated.

Let’s dive into that statement a little deeper, but before that, let's import the NumPy library.

```py
#Import the NumPy library
import numpy as np

#Check Version
print(np.__version__)

#Output - 1.18.4
```

np.\_\_version\_\_ returns the version of NumPy being used.

### NumPy Functions
Creating a NumPy array can be done in one of two ways – convert a list to a NumPy array or initializing a NumPy array.

```py
import numpy as np

#Method 1 - Converting a list to a NumPy array

list_a = [1,2,3,4,5,6]

print(type(list_a))
#Output - <class 'list'>

np_list_a = np.array(list_a)
print(type(np_list_a))

#Output - <class 'np.ndarray'>
```

Initializing a linear NumPy array can go one of many ways:

```py
array_of_zeroes = np.zeros(10)
print(array_of_zeros)
#Output - [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

array_of_ones = np.ones(10)
print(array_of_ones)
#Output - [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

array_of_random_numbers = np.random.rand(5)
print(array_of_random_numbers)
#Output - [0.84692907 0.58108508 0.77377301 0.95796771 0.61382531]
```

A NumPy array of random integers can be generated using the `numpy.random.randint` method. This method takes three inputs:

- **low** (lower bound of the range; inclusive; default value is 0),  
- **high** (upper bound of the range; exclusive) and  
- **size** (size of the array).

The method returns random integers from the discrete distribution of integers in the half-open interval `\[low, high)`. If high is None, the results are from `\[0, low)`.

```py
#With all three parameters - low, high and size
array_of_random_integers = np.random.randint(low = 1, high = 100, size = 10)
print(array_of_random_integers)
#Output - [37 31 98 78 67 10 9 42 39 45]

#With high as None
array_of_random_integers = np.random.randint(low = 5, high = None, size = 10)
print(array_of_random_integers)
#Output - [3 4 1 4 4 1 3 1 3 2]
```

Yet another way to initialize a linear NumPy array is `linspace`, that returns an evenly spaced sequence in a specified interval.

This function takes the following parameters:
- **start** (starting value of the sequence),  
- **stop** (end value of the sequence, unless endpoint is set to false),  
- **num** (number of samples to be generated; default of 50), and  
- **endpoint** (if true, ‘stop’ is the last sample; default is True)

Return a numpy.ndarray with `num` equally spaced samples in the closed interval `\[start,stop\]` if the endpoint is True. If the endpoint is False, it returns `num` in equally spaced samples in the half-open interval `\[start, stop)`.

```py
even_spaced_array = np.linspace(start = 0, stop = 50, num = 5, endpoint = True)
print(even_spaced_array)
#Output - [ 0.  12.5 25.  37.5 50. ]


even_spaced_array = np.linspace(start = 0, stop = 50, num = 5, endpoint = True)
print(even_spaced_array)
#Output - [ 0. 10. 20. 30. 40.]
```

Below are a few more array operations in that are self-explanatory:

![Self Explanatory Functions](/engineering-education/introduction-to-numpy/numpyfunc.jpg)

Apart from mathematical computations, there will be a constant need to reshape or manipulate data in arrays. One simple transformation that can be done is to transpose a matrix. A tedious process like transforming a list of lists (a matrix) is done as follows:

```py
#Initialize Matrix to a set of values
matrix_A = [[1,2,3,4] for _ in range(4)]

print(matrix_A)

"""
Output - [[1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4]]
"""
#Loop over every element in the matrix
for i in range(4):
    for j in range(i,4):
#Swap the elements
        matrix_A[i][j], matrix_A[j][i] = matrix_A[j][i], matrix_A[i][j]

print(matrix_A)

"""
Output - [[1, 1, 1, 1],
          [2, 2, 2, 2],
          [3, 3, 3, 3],
          [4, 4, 4, 4]]
"""
```

How does this work out in NumPy? Well, it’s pretty simple.

```py
#Initialize Matrix to a set of values
matrix_A = [[1,2,3,4] for _ in range(4)]

print(matrix_A)

"""
Output - [[1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4]]
"""
#Convert it into a NumPy array
np_matrix_A = np.array(matrix_A)

#And transpose!
np_matrix_A = np_matrix_A.T
"""
Output - [[1, 1, 1, 1],
          [2, 2, 2, 2],
          [3, 3, 3, 3],
          [4, 4, 4, 4]]
"""


```

You can find more such functions on the [NumPy official documentation](https://numpy.org/doc/).

With all that being said, let’s address the elephant in the room.

### How is NumPy so fast?
Let's analyze the example where we transposed a matrix. One key point to remember is – in any scripting language, a major performance dipper is the use of unnecessary for loops. Loops when used to perform a single operation (in this case, swapping two elements) on a large dataset increases the complexity a significant amount.

Upon crunching a few numbers, transposing a (10000 x 10000) matrix using for loops takes 58.8596s and using NumPy it takes significantly lesser time. The reason behind such high performance is a tiny concept called [vectorization](https://www.geeksforgeeks.org/vectorization-in-python/) that NumPy implements. Vectorization groups element-wise operations together. Such a vectorized approach applies to all elements in an array.

![Vectorized](/engineering-education/introduction-to-numpy/vectorized.jpg)

*Figure: [Vectorized Operations](https://lappweb.in2p3.fr/~paubert/ASTERICS_HPC/6-6-1-985.html)*

This is the under-the-hood reason why NumPy’s calculations are off the charts.
The overhead of making sure the memory blocks line up correctly before pouring an nd-array into a C, compiled NumPy function will overwhelm any time advantage if the array isn't relatively large.

Let's compare Numpy arrays and Python lists. As shown in the chartbelow, as the number of elements increases, the breakeven size is around 200 elements.

 ![Graph](/engineering-education/introduction-to-numpy/numpyGraph.jpg)

 *Figure: [NumPy array vs Python List ](https://github.com/Pballer/dc-ds-071519/blob/master/blogs/array_vs_list/numpy_array_vs_py_list.ipynb)*

Like all things that come full circle, let’s try to wrap this up with a performance comparison with our first example – multiplying every element of an array by 5.

But this time, the NumPy way:

```py
import time as time
#Create a NumPy array having 100000 elements
list_a = np.array([i for i in range(100000)])

start = time.time()

#Multiply by 5 the vectorized way
list_b = list_a * 5

print(time.time() - start)
#Output - 0.0004646778106689453        

```

### Conclusion
NumPy is one of the most fundamental libraries in Machine Learning and Data Science. It is coded in Python and it uses the vectorized form to perform calculations at an incredible speed. It supports various built-in functions that come in handy for a programmer.
