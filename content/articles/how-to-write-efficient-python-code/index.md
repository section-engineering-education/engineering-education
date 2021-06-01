---
layout: engineering-education
status: draft
published: false
url: /how-to-write-efficient-python-code/
title: How to write efficient Python code
description: Learn how to write efficiently as a python developer.
author: samuel-torimiro
date: 2021-05-06T00:00:00-09:00
topics: [Python]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-write-efficient-python-code/hero.jpg
    alt: Python example image
---
As a beginner programmer, writing efficient python code is not the main goal but rather to learn the basic syntax, the flow of the language and how to think like a programmer. But things get interesting when you are trying to advance to an intermediate level developer and really become a true nerd, no pun intended.

Writing efficient python code is one of the ways a beginner programmer can advance to become an intermediate programmer and really appreciate code readability coupled with the productivity of a developer.
<!--more-->
This tutorial is focused on writing efficient python code. By the end of this tutorial, you will be equipped with the tools needed to improve your productivity as a developer.

### Prerequisites
To follow along with this tutorial a basic understanding of python is required as well a python interpreter should be installed on your local environment.

### List Comprehension
One of the tools that would assist you in writing efficient python code is `list comprehension`. List comprehension allows you to populate a list filled with data with a single line of code. It however does not improve performance whatsoever, but it's a cleaner and more concise way of writing code for our program. It as well improves our efficiency as a developer.

Generating a list of numbers from 0 all the way up to 20 using list comprehension:

```py
nums = [x for x in range(20)] 
```

Making a list of only odd numbers:

```py
nums = [x for x in range(20) if x % 2 != 0]
```

In this final example, we'll append the string `True` when the number is divisible by two; otherwise, we'll append the string `False`:

```py
nums = ['True' if x % 2 == 0 else 'False' for x in range(20)]
```

If we were to do all this the traditional way that is via `loops` it takes more lines of code.

To recap, comprehension is great for quick imputation of data. However, it becomes more complex when the conditions are larger. Note that, list comprehensions don't provide for the use of elif statements, only `if/else` statements.


### Lambda Functions
Another function that makes us efficient in writing our python program is `lambda` functions otherwise known as __anonymous functions__ because they are nameless. They are one-line functions in python. Again just with list comprehension, they might not improve performance but they improve efficiency. It, however, does not work for complex functions but helps to improve the readability of smaller functions.

It should be noted that lambdas return the expression by default, so we don't need to use the keyword `return`.

Note also, that when using lambdas without storing them into a variable, you need to wrap parenthesis around the function, as well as any arguments being passed in.

```py
# using a lambda to square a number
(lambda x:x ** 2)(4)

# passing multiple arguments into a lambda
(lambda x,y: x / y)(20, 4)

# saving a lambda function into a variable
multiply = lambda x,y: x * y
multiply(4, 3)

# Using if/else statements within a lambda to return the lesser number
lesser = lambda x,y: x if x < y else y
lesser(5,8)
```

Note also that when the functions are stored inside of variables, the variable name acts as the function call.

All the functions writing above can be writing the traditional way, but with `lambdas` it saves us time especially for very simple and basic functions.

### Map, Filter and Reduce
As you work with data in your program, you'll most likely need to be able to modify, filter, or calculate an expression from the data.

The map function is used to iterate over a data collection and modify it.

```py
# Example of a map function
nums = [1,2,3,4,5]
squared_nums = list(map(lambda x: x * x, nums))
print(squared_nums)
```
The map function takes two arguments, the function that would modify the data, and the data itself. In our example, we used the lambda function but we could as well have used it without lambdas.

Note that we use the `list` function to convert map object back to a list.

The filter function is used to iterate over a data collection, and filter out data that doesn't meet a condition.
```py
# Example of a filter function
nums = [1,2,3,4,5,6,7,8,9,10]
even_nums = list(filter(lambda x: True if x % 2 == 0 else False, nums))
print(even_nums)
```
In our example, we are filtering out all odd numbers.

Note that we use the `list` function to convert filter object back to a list.

The reduce function takes a data collection and condenses it down to a single result.
```py
# Example of a reduce function
from functools import reduce

nums = [5,6,7,8,9,10]
sum_of_nums = reduce(lambda a,b: a + b, nums)
print(sum_of_nums)
```
In our example, we used the reduce function to add up all the data in our list.

Note that we have to import `reduce` from `functools` before we can use it.

The `map`, `filter` and `reduce` saves us time from creating our own list manipulation function. They are useful for many common cases.

### Recursive Functions and Memoization
As a bonus section, we would be talking about recursion.

Recursion is a concept in programming where a function calls itself one or more times.

All recursive functions must have what is known as a 'base case'. Without this, the function call would never end.

```py
# Example of a recursive function
def factorial(n):
  # base case
  if n <= 1:
    return 1
  else: 
    return n * factorial(n-1)

print(factorial(5))
```

As soon as the base case is reached, it can begin to return all the calculated values back to the original call.

They're used often in algorithms that involve __searching__ and __sorting__ because of the repeated tasks that occur.

These types of functions can often run into problems with speed, however, due to the function constantly calling itself. Enter `memoization`.

Memoization helps this process by storing values that were previously calculated to be used later.

In computing, memoization is an optimization procedure used primarily to speed up computer programs by storing the results of previously called functions and returning the saved result when trying to calculate the same sequence.

```py
# Using memoization with the factorial example
from functools import lru_cache

@lru_cache()
def factorial(n):
  # base case
  if n <= 1:
    return 1
  else: 
    return n * factorial(n-1)

print(factorial(5))
```

We are using `lru_cache` function, Python's built-in memoization/caching system. This program would be very much faster than the previous factorial function we wrote earlier without `memoization`.

### Conclusion
I am glad that you have reached the end of this article, I implore you to start using all this concept you have been introduced within your next python project and check it out how it does improve your efficiency as a developer.

Happy coding!

---
Peer Review Contributions by: 