---
layout: engineering-education
status: publish
published: true
url: /how-to-write-efficient-python-code/
title: How to write efficient Python code
description: This tutorial provides the reader with a detailed guide on how to use List Comprehensions, Lambda functions, and Array functions to write efficiently as a python developer.
author: samuel-torimiro
date: 2021-06-21T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-write-efficient-python-code/hero.jpg
    alt: Python example image
---
As a developer starting out your programming journey, writing efficient code might not be your immediate goal but rather to learn the basic syntax and flow of the language, as well as how to think like a programmer. However, things start to get interesting when moving from a newbie to an intermediate-level developer.
<!--more-->

One of the ways of advanicng in your programming journey is to write efficient code. Here, efficient code entails code readability and writing code in a much quicker way.

This tutorial focuses on teaching you how to write efficient [Python](https://www.python.org/) code. At the end of going through this tutorial, you'll be equipped with the tools needed to improve your productivity as a Python developer. 

Topics covered in this tutorial includes: List comprehension, Lambda functions, Map, Filter, and Reduce.

### Prerequisite

To follow along with this tutorial, a basic understanding of the Python programming language is required. Also, [download](https://www.python.org/downloads/) and install the latest version of python.

### List comprehension

List comprehension in Python enables you to create a list that contains data with a single line of code. This technique is common in various programming language.

Let's go over the syntax:

```bash
result = [transform iteration filter]
```

The **result** is the name of the list to be created, **transform** is the value of each data in the list; it keeps on changing as the value of the **iterator** changes. The **iteration** is a loop that populate the list with the specified number of data. And finally, the **filter** which is optional; as the name suggests, it is used to filter out unwanted data.

Below is an example of generating a list containing data without the use of a list comprehension.

```python
nums = []
for x in range(10):
    nums.append(x)

print(nums)
```

**Output:**

```bash
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

This took about 3 lines of code. Let's create the same list using list comprehension.


```python
nums = [x for x in range(10)]

print(nums)
```

**Output:**

```bash
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

This took one line of code to acheive earlier result. Hence, using this approach can lead to code efficiency.

Let's take a look at another example.

```python
nums = [x for x in range(20) if x % 2 != 0]

print(nums)
```

**Output:**

```bash
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
```

Here, you're using **filter**, which checks and adds only odd numbers to the list starting from 0 to 20.

__Another Example:__

```python
nums = ['True' if x % 2 == 0 else 'False' for x in range(10)]

print (nums)
```

**Output:**

```bash
['True', 'False', 'True', 'False', 'True', 'False', 'True', 'False', 'True', 'False']
```

Here, you added an `if/else`  statement, that gives a default value for each true or false condition.

> 📝 __Note:__ `elif` statement cannot be used within a list comprehension.

### Lambda functions

Lambda function is a technique in Python that can used to create single line functions. It is usually regarded to as anonymous/nameless functions. 

> 📝 **Note:** Lambda functions are not suited for complex functions. Also, just like list comprehension, they make your code small and concise.

Let's take a look at the syntax:

```bash
lambda arguments: expression
```

The value at the left is referred to as the argument, while the value at the right is the expression. Let's break the syntax further:

```bash
lambda arguments: value_to_return if condition else value_to_return
```

Below is an example of creating a function in Python without the use of `lambdas`.

```python
def even_or_odd(n):
    if n % 2 == 0:
        return "Even"
    else:
        return "Odd"

print(even_or_odd(10))
```

**Output:**

```bash
Even
```

This took about five lines of code. Let's now use `lambdas`:

```python
print((lambda n: "Even" if n % 2 == 0 else "Odd")(10))
```

**Output:**

```bash
Even
```

It only took us one line of code.

The lambda function can be stored inside a variable, as shown below. You can then use that variable to call the function.

```python
even_or_odd = lambda n: "Even" if n % 2 == 0 else "Odd"

print(even_or_odd(10))
```

**Output:**

```bash
Even
```

By storing the `lambda` function inside a variable, you don't need to wrap parenthesis around them and the argument. 

> 📝 **Note:** The variable serve as the identifier to call the function.

### Map, filter and Reduce

When working with a list that contains data; `map`, `filter` and `reduce` gives you the ability to perform common list manipulations tasks.

#### Map

Using the `map` function, your list can be modified in many ways.

For instance:

```python
nums = [1, 2, 3, 4, 5]

squared_nums = list(map(lambda x: x * x, nums))

print(squared_nums)
```

**Output:**

```bash
[1, 4, 9, 16, 25]
```

The `map` function takes two arguments:

1. The function that would modify the list 
2. The list itself

> 📝 **Note:** In this example, you're using a `lambda` function. However, you could have used a regular function as shown below.

```python
nums = [1, 2, 3, 4, 5]

def square_num(n):
    return n * n

squared_nums = list(map(square_num, nums))

print(squared_nums)
```

The `map` function coupled with the `lambda` function allows you to modify your list with just one line of code.

> 💡 **Information:** A `list` function was used to convert the `map` object back to a list.

#### Filter

The `filter` function is used to remove unwanted data from the list.

For example:

```python
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

even_nums = list(filter(lambda x: True if x % 2 == 0 else False, nums))

print(even_nums)
```

**Output:**

```bash
[2, 4, 6, 8, 10]
```

Here, you're filtering out odd numbers from the initial list.

#### Reduce

Using the `reduce` function, you can lessen the items in the list to a single value.


For instance:

```python
from functools import reduce

nums = [5 ,6 , 7 ,8 , 9, 10]

sum_of_nums = reduce(lambda a,b: a + b, nums)

print(sum_of_nums)
```

**Output:**

```bash
45
```

Here, you're using the `reduce` function to add up all the data in the list.

> 📝 **Note:** You have to import `reduce` from `functools` before it can be used.

> 💡 **Information:** The `map`, `filter` and `reduce`, can save you time from creating your own list manipulation function. They are useful for many common use cases.

### Conclusion

You can use the concepts introduced in this tutorial in your next Python project, and this will improve your efficiency as a Python developer.

Happy coding!








---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
