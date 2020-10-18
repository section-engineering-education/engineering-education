### A Not-So-Gentle Introduction to NumPy

One of the most fundamental libraries in the Machine Learning and Data Science landscape is unarguably NumPy. Its significance has led to many other libraries like Pandas, Scipy and Matplotlib having based off NumPy. Let us delve into the workings and the various functions of the first import line in 99.78% of Kaggle notebooks.

``` python3
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy as sc
```

#### Table Of Contents
1. [Introduction](#introduction)
2. [Intuition for the NumPy Library](#intuition-for-the-numpy-library)
3. [Enter NumPy](#enter-numpy)
4. [NumPy Functions](#numpy-functions)
5. [How is NumPy so fast?](#how-is-numpy-so-fast)
6. [TL; DR](#tl-dr)

#### Introduction 

The Python programming language is the most versatile language to have ever lived. Yes, lived. Python provides a rich set of high level data structures – lists for enumerating a collection of objects, dictionaries to build hashtables, etc. However, these structures are not ideally suited to high-performance numeric computation.

#### Intuition for the NumPy Library

To back that statement up, let’s use one of Python’s fundamental data structure, a list and multiply every element in the list with a constant, say 5.

``` python3
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
0.03 seconds may seem insignificant, but in a real-world setting like in the processing chip of a self-driving car, 0.03 seconds for 100,000 multiplication operations is highly ineffective, given there would be millions of multiplication and addition operations to be done in a second.

#### Enter NumPy
A NumPy array is a multidimensional, uniform collection of elements. Unlike a normal array of fixed shape MxN (a matrix), NumPy arrays can have any dimensionality. NumPy arrays are just a convenient way of describing one or more blocks of computer memory, so that the numbers represented can be easily manipulated.

Let’s dive into that statement a little deeper, but before that, let us import the NumPy library.

``` python3
#Import the NumPy library
import numpy as np

#Check Version
print(np.__version__)

#Output - 1.18.4
```

np.\_\_version\_\_ returns the version of NumPy being used.

#### NumPy Functions

Creating a NumPy array can be done in one of two ways – convert a list to a NumPy array or initializing a NumPy array.

``` python3
import numpy as np

#Method 1 - Converting a list to a NumPy array

list_a = [1,2,3,4,5,6]

print(type(list_a))
#Output - <class 'list'>

np_list_a = np.array(list_a)
print(type(np_list_a))

#Output - <class 'np.ndarray'>
```

Initializing a linear NumPy array can go one of many ways –

``` python3
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
A NumPy array of random integers can be generated using the numpy.random.randint method. This method takes three inputs –

**low** (lower bound of the range; inclusive; default value is 0),  
**high** (upper bound of the range; exclusive) and  
**size** (size of the array).

The method returns random integers from the discrete uniform distribution of integers in the half-open interval \[low, high). If high is None, the results are from \[0, low).

``` python3
#With all three parameters - low, high and size
array_of_random_integers = np.random.randint(low = 1, high = 100, size = 10)
print(array_of_random_integers)
#Output - [37 31 98 78 67 10 9 42 39 45]

#With high as None
array_of_random_integers = np.random.randint(low = 5, high = None, size = 10)
print(array_of_random_integers)
#Output - [3 4 1 4 4 1 3 1 3 2]
```

Yet another way to initialize a linear NumPy array is linspace, which returns an evenly spaced sequence in a specified interval.

This function takes the following parameters –

**start** (starting value of the sequence),  
**stop** (end value of the sequence, unless endpoint is set to false),  
**num** (number of samples to be generated; default of 50), and  
**endpoint** (if true, ‘stop’ is the last sample; default is True)

and returns a numpy.ndarray with ‘num’ equally spaced samples in the closed interval \[start,stop\] or the half-open interval \[start, stop), depending on whether endpoint is True or False.

``` python3
even_spaced_array = np.linspace(start = 0, stop = 50, num = 5, endpoint = True)
print(even_spaced_array)
#Output - [ 0.  12.5 25.  37.5 50. ]


even_spaced_array = np.linspace(start = 0, stop = 50, num = 5, endpoint = True)
print(even_spaced_array)
#Output - [ 0. 10. 20. 30. 40.]
```

A few more array operations in brief that are self-explanatory –

![Self Explanatory Functions](/engineering-education/introduction-to-numpy/numpyfunc.jpg)
  
Apart from mathematical computations, there will be the constant need to reshape or manipulate data in arrays. One simple transformation that can be done is to transpose a matrix. A tedious process like transforming a list of lists (a matrix) is done as follows –
``` python3
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

``` python3
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
        
You can find more such functions at [https://numpy.org/doc/](https://numpy.org/doc/)

With all that being said, let’s address the elephant in the room.


#### How is NumPy so fast?
Let us analyse the example where we transposed a matrix. One key point to remember is – in any scripting language, a major performance dipper is the use of unnecessary for loops, especially when it is used to perform a single operation (in this case, swapping two elements) to each element on a large dataset.
Upon crunching a few numbers, transposing a (10000 x 10000) matrix using for loops takes 58.8596s and NumPy takes significantly lesser time. The reason behind such high performance is a tiny concept called vectorization that NumPy implements, wherein it groups element-wise operations together. Such a vectorized approach applies to all elements in an array.
![Vectorized](/engineering-education/introduction-to-nummpy/Vectorized.jpg)
 
This is the under-the-hood reason why NumPy’s calculations are off the charts.
Not to mention, the overhead of making sure the memory blocks line up correctly before pouring a ndarray into a C - compiled NumPy function will overwhelm any time benefit if the array isn't relatively large. When compared the performance of NumPy arrays vs Python lists as the number of elements increases is shown in the chart, with the breakeven size observed to be around 200 elements.
 ![Graph](/engineering-education/introduction-to-nummpy/numpyGraph.jpg)
Like all things come full circle, let’s try to wrap this up with a performance comparison to our first example – multiplying every element of an array by 5.
But this time, the NumPy way.
``` python3
import time as time
#Create a NumPy array having 100000 elements
list_a = np.array([i for i in range(100000)])

start = time.time()

#Multiply by 5 the vectorized way
list_b = list_a * 5

print(time.time() - start)
#Output - 0.0004646778106689453        

```


#### TL; DR
Numpy has been known to be one of the  most fundamental libraries in Machine Learning and Data Science. It is coded in python and it uses the vectorized form in order to perform calculations at an incredible speed. It supports various inbuilt functions that come in handy for a programmer.
 

