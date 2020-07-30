---
layout: engineering-education
status: publish
published: true
slug: data-science-libraries-python
title: Popular Data Science Libraries in python
description: This is an article about the popular data science libraries in python, and how developers are using them for analysis.
author: richu-thomas
date: 2020-07-14T00:00:00-07:00
topics: [security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-science-libraries-python/hero.jpg
    alt: hero image visual data science python
---
Before Jumping directly to the data science Libraries. If you are a newbie then let’s learn about what is data science before getting started. If you already know about this you can skip this part.
<!--more-->

### Data Science
Data science is a multidisciplinary field focused on finding actionable insights from large sets of raw and structured data. The field tries to find answers to the things we don’t know. Data science experts use several different techniques to get answers, incorporating computer science, predictive analytics, statistics, and machine learning to parse through massive datasets to establish solutions to problems that haven’t been thought of yet.


### Why is Python so popular when people start their coding Journey?
Python provides developers with all the necessary tools to carry out this process with dedicated libraries for each step. It comes with powerful statistical and numerical libraries such as Pandas, Numpy, Matplotlib, SciPy, scikit-learn, etc. and advanced deep learning libraries such as Tensorflow, PyBrain, etc.
Moreover, Python has emerged as the default language for AI and ML, as data science has come to an intersection with Artificial Intelligence.  This interpreter-based high-level programming language is not only easy to use, but it also equips data scientists to implement solutions and, at the same time, follow the standards of required algorithms

Python is easy to learn and it is often the first language taught in many Schools and Colleges to students who are beginning their journey in Programming. The language is close to what humans understand in comparison with [R Language](https://www.r-project.org/). Since it is a general-purpose language it can be used in web development.
Popular frameworks like Django and Flask and R are somewhat difficult to learn for people who are beginning to start their programming career since it is more inclined to the scientific community. But there is a catch, Python is a slower programming language in comparison with C++ which means more work for the computer.

Next, we will be talking about  Numpy, Scipy, Matplotlib, and Pandas

### NumPy
[Numpy](https://numpy.org/) is the foundation library for most of the scientific computing in Python, and several other libraries are dependent on NumPy arrays as their basic inputs and outputs. It also provides routines that allow developers to perform advanced mathematical and statistical functions on multidimensional arrays and matrices with very few lines of code. The core functionality of NumPy is its ‘ndarray’, or n-dimensional array data structure. These arrays are typed and must match all the elements of the array to be of the same type.

```python
# Python program using NumPy for some basic mathematical operations

import numpy as np

# Creating two arrays of rank 2
x = np.array([[5, 3], [7, 9]])
y = np.array([[5, 6], [4, 5]])

# Creating two arrays of rank 1
v = np.array([7, 5])
w = np.array([2, 3])

# Inner product of vectors
print(np.dot(v, w), "\n")

# Matrix and Vector product
print(np.dot(x, v), "\n")

# Matrix and matrix product
print(np.dot(x, y))
```
*Output*
```
29

[50 94]

[[37 45]
 [71 87]]
 ```

### Scipy
[Scipy](https://www.scipy.org/) is a python library that is useful in solving many mathematical equations and algorithms. It is designed on the top of Numpy library that gives more of an option when finding scientific mathematical formulas like Matrix Rank, Inverse, polynomial equations, LU Decomposition, etc. Using its high-level functions will significantly reduce the complexity of the code and it also helps in better analyzing the data. It has many user-friendly, efficient and easy-to-use functions that help to solve problems like numerical integration, interpolation, optimization, linear algebra and statistics.

```python
# Python script using Scipy for calculating the determinant

# import numpy library
import numpy as np
A = np.array([[1,2,3],[4,5,6],[7,8,8]])

# importing linalg function from scipy
from scipy import linalg

# Compute the determinant of a matrix
linalg.det(A)
```
*Output*
```
3.0
```


### Matpoltlib
[Matplotlib](https://matplotlib.org/) is a very popular Python library used for data visualization. It particularly comes in handy when a programmer wants to visualize the patterns in the data. It is a 2D plotting library used for creating 2D graphs and plots. A module named pyplot makes it easy for programmers that need plotting done as it provides features to control line styles, font properties, formatting axes, etc. It provides various kinds of graphs and plots for data visualization, viz., histogram, error charts, bar charts, etc,

```python
#  Python program using Matplotib for forming a linear plot

# importing the necessary packages and modules
import matplotlib.pyplot as plt
import numpy as np

# Prepare the data
x = np.linspace(0, 10, 100)

# Plot the data
plt.plot(x, x, label ='linear')

# Add a legend
plt.legend()

# Show the plot
plt.show()
```

*Output* </br>

!["linear plot"](/engineering-education/data-science-libraries-python/matplotlib.png)

### Pandas
[Pandas](https://pandas.pydata.org/) is a popular Python library for data analysis. It has been developed specifically for data extraction and preparation. It provides high-level data structures and a wide variety of tools for data analysis. It is built on the Numpy package and its key data structure is called the DataFrame. DataFrames allow you to store and manipulate tabular data in rows of observations and columns of variables. It provides many inbuilt methods for grouping, combining and filtering data.

```python
# Python program using Pandas for arranging a given set of data into a  table

# importing pandas as pd
import pandas as pd

data = {"country": ["Brazil", "Russia", "India", "China", "South Africa"],
       "capital": ["Brasilia", "Moscow", "New Dehli", "Beijing", "Pretoria"],
       "area": [8.516, 17.10, 3.286, 9.597, 1.221],
       "population": [200.4, 143.5, 1252, 1357, 52.98] }

data_table = pd.DataFrame(data)
print(data_table)

```
*Output*
```
        country    capital    area  population
0        Brazil   Brasilia   8.516      200.40
1        Russia     Moscow  17.100      143.50
2         India  New Dehli   3.286     1252.00
3         China    Beijing   9.597     1357.00
4  South Africa   Pretoria   1.221       52.98
```

There are many libraries in Python for data science and analysis which has not been covered in this article but I will provide some more info and links below as additional resources.

### Additional Resources
- [Tensorflow](https://www.tensorflow.org/)
- [Scikit-learn](https://scikit-learn.org/stable/index.html)
- [Keras](https://keras.io/)
- [PyTorch](https://pytorch.org/)
