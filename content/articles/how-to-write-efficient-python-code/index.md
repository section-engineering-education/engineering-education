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

Writing efficient python code is one of the ways a beginner programmer can advance to become an intermediate programmer and appreciate code readability coupled with the productivity of a developer.
<!--more-->
This tutorial is focused on teaching you how to write efficient python code. By the end of this tutorial, you will be equipped with the tools needed to improve your productivity as a developer. Tools we would be using include `list comprehension`, `lambda`, etc.

### Prerequisites
To follow along with this tutorial, a basic understanding of python is required. A python interpreter should be installed in your local environment.

### List Comprehension
List comprehension is a technique of creating a list containing data with a single line of code. It's common in various programming languages including Python. 

Let's go over the syntax of list comprehension;

*result* = [*transform* *iteration* *filter*]

The __result__ would be the final list containing our data, the __transform__ is the value of each data in our list, it keeps on changing as the value of the iterator changes. The __iteration__ is basically a loop that helps populate our list with the required amount of data. Finally, the __filter__ (optional) is used to filter out the data that we don't want.

Before we take a look at an example of list comprehension, let's take a look at the traditional way of generating a list with data so we can compare the two ways.

```python
nums = []
for x in range(10):
    nums.append(x)

print(nums)
```
It took us about 3 lines of code. Let's try to be more efficient using `list comprehension`.

```python
nums = [x for x in range(10)]

print(nums)
```
Voilà, just one line of code to achieve the earlier result. It is way quicker to write once you understand the syntax and flow of `list comprehension`.

Let's take a look at two more complex examples by adding __filters__.

```python
nums = [x for x in range(20) if x % 2 != 0]

print(nums)

nums = ['True' if x % 2 == 0 else 'False' for x in range(20)]

print(nums)
```

With these two examples above, we added the ability to use `if/else` statement in our list comprehension. It should be noted that `elif` statement can't be used within list comprehension.

In this section, we learnt about using list comprehension to generate our list for us with data with ease. In the next section, we will be taking a look at `lambda` functions.


### Lambda Functions
`Lambda` functions is a technique in Python of written our functions on a single line. They are regarded as anonymous (nameless) functions. They are also not suited for complex functions. Just like with list comprehension, they make our code small and concise.

Let's take a look at the syntax;

__lambda__ arguments: expression

The value at the left is referred to as the arguments, while the values at the right are the expression. Let's break the syntax further.

__lambda__ arguments: value_to_return __if__ condition __else__ value_to_return

Before we take a look at an example of lambda functions, let's take a look at an example of a regular function in Python so we can compare the two ways.

```python
def even_or_odd(n):
    if n % 2 == 0:
        return "Even"
    else:
        return "Odd"

print(even_or_odd(10))
```
This took us about five lines of code to write, with `lambdas` I'm happy to say that it'll only take only one line.

```python
print((lambda n: "Even" if n % 2 == 0 else "Odd")(9))
```
We can also store them inside variables.

```python
even_or_odd = lambda n: "Even" if n % 2 == 0 else "Odd"
even_or_odd(8)
```
If we store them inside a variable, we don't need to wrap parenthesis around the `lambda` function and the argument. The variable serves as the identifier to call the function.

In this section, we looked at `lambdas` a very quick way of writing function. They don't work well for very complex functions. In the next section, we'll take a look at three very useful functions namely `map`, `filter`, and `reduce`.

### Map, Filter and Reduce
When working with a list filled with data, `map`, `filter`, and `reduce` gives us the ability to perform common list manipulation tasks that'll take a few lines of code to implement.

The first on the list is `map`. With the `map` function we can modify our list however we want. 

Let's take a look at an example.

```python
# Example of a map function
nums = [1, 2, 3, 4, 5]

squared_nums = list(map(lambda x: x * x, nums))

print(squared_nums)
```

The map function takes two arguments, the function that would modify the data, and the data itself. In our example, we used the lambda function but we could as well have used it without lambdas.

The `map` function coupled with lambda function allows us to modify our list with just one line of code.

Note that we use the `list` function to convert map object back to a list.

The second is `filter`, the filter function is used to filter out unwanted data from our list.

Let's take a look at an example.

```python
# Example of a filter function
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

even_nums = list(filter(lambda x: True if x % 2 == 0 else False, nums))

print(even_nums)
```
In our example, we are filtering out all odd numbers.

Note that we use the `list` function to convert filter object back to a list.

And finally, the `reduce` function, helps to reduce the items in our list to just one value

Let's take a look at an example.

```python
# Example of a reduce function
from functools import reduce

nums = [5 ,6 , 7 ,8 , 9, 10]

sum_of_nums = reduce(lambda a,b: a + b, nums)

print(sum_of_nums)
```
In our example, we used the reduce function to add up all the data in our list.

Note that we have to import `reduce` from `functools` before we can use it.

The `map`, `filter` and `reduce` saves us time from creating our own list manipulation function. They are useful for many common cases.

### Conclusion
I am glad that you have reached the end of this article, I implore you to start using all this concept you have been introduced within your next python project and check out how it does improve your efficiency as a developer.

Happy coding!

---
Peer Review Contributions by: 
