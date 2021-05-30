---
layout: engineering-education
status: publish
published: true
url: /abstraction-concepts/
title: Understanding Abstraction in Python, Part 1
description: An introduction to abstraction in Python through the concepts of parameters, scoping, and recursion.
author: sophia-raji
date: 2020-04-24T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/abstraction-concepts/hero.jpg
    alt: python ball hiding
---
Abstraction is the art of hiding unnecessary details. It is a fundamental object-oriented programming concept which allows us to only show relevant features of an object and conceal the rest. In doing so, we make our programs more abstract and don't do unnecessary work. We achieve this in Python through the use of classes and interfaces, which we'll discuss in Part 2 of this series, after reviewing some important fundamentals.
<!--more-->

### Parameters
Parameters are the variables that are set when a function is called. We refer to formal parameters as those we write after the function name in `def` statements, whereas actual parameters (also known as arguments) are the values we supply when *calling* the function.

It is important to distinguish between mutable and immutable data structures. Mutable data structures, such as a list, can change parameters; whereas strings, numbers, and tuples are immutable, meaning that you can't modify them, but rather only replace them with new values.

One convenient way of removing complexity through abstraction is using functions to initialize a data structure.

#### Example: Initializing a Simple Data Structure:

```Python shell
def init(data):
		data['full_name'] = {}
		data['phone'] = {}
		data['addr'] = {}
		data['email'] = {}
```

By moving the initialization statements inside a function, we make the code more readable and loosely coupled:

```python shell
>>> customers = {}
>>> init(customers)
>>> customers
{'first': {}, 'last': {}, 'phone': {}, 'addr': {}}
```

In addition, there are two kinds of parameters: positional and keyword parameters. Positional parameters are simply those whose positions are important. The order may vary when using a dictionary, as keys themselves don't have a specific order. So, using the Python module `OrderedDict` is useful in these cases.

Parameters are kept in a local scope, which brings us to another fundamental concept: scoping.

### Scoping

In Python, a namespace is a mapping of names to objects. A scope is the textual place where a namespace is accessible. Think of namespaces as a way of safely organizing your variables and preventing collision, and scoping as a concept tied to the lifetime of a variable.

Variables defined inside a function (also called function or method scope) are local variables and generally life for the life of the function. They are in the local scope and can only be accessed inside that function. Variables defined outside of functions are global variables and are accessible everywhere. These live for the lifetime of the compilation unit.

NOTE: Python does not have block level scope as do some other languages like Java or C#. All local variables are assigned to the function scope.

In addition to the global scope, each function call creates a new scope. In Python, functions can rebind a variable locally, but if you declare the same variable in the global namespace, this doesn't affect its value in the outer scope. In other words, you will have no problem accessing a global variable inside a function, but assigning a value to a variable inside a function automatically makes it local.

If a local variable or parameter has the same name as a global variable you are trying to access, the global variable will be shadowed by the local one. In this case, you can use the function `globals` (returns a dictionary of global variables) to gain access to the global variable.

#### Example: Preventing Shadowing using Globals

```Python shell
>>> def join(parameter):
... 		print(parameter + globals()['parameter'])
...
>>> parameter = 'flower'
>>> combine('Sun')
Sunflower
```
***Nested scopes***, also known as ***closures***, refer to putting one function inside another. The outer function returns the inner one, though the function itself is only _returned_, not called. The returned function carries the environment and associated local variables with it. Closures enable data privacy, as the enclosed variables are only in scope in the outer function. They can also be replaced with an object implementing a specific interface, which results in more brevity.

### Recursion

A recursion is simply a function calling itself. A loop beginning with `while True` and containing no `break` or `return statements` will lead to infinite recursion. While this should theoretically run forever, every time the function is called, it takes up memory space. So, after a while there is no more room, and the program ends with `maximum recursion depth exceeded`.

For a recursive function to be useful, it consists of two parts:
1. **Base case**: solving the smallest possible problem and returning a value directly
2. **Recursive case**: one or more recursive calls on smaller parts of the problem

Next, we will look at an example for calculating powers with and without recursion.

#### Example: Powers
Calculating powers like the built-in function `pow` (operator)

**Non-recursive way of writing a power function (using a loop)**:

```python shell
def power(x, n):
		result = 1
		for i in range(n):
				result *= x
		return result
```

Raising x to the power of n is equivalent to multiplying a number times itself n-1 times. So, power(2, 3) is 2 multiplied with itself twice (2 x 2 x 2 = 8)

**Recursive way of writing a power function**:

```python shell
def power(x, n):
		if n == 0:
				return 1
		else:
				return x * power(x, n - 1)
```

 **Base case**: power(x, 0) = 1 for all numbers x

 **Recursive case**: power(x, n) for n > 0 is the product of x and power(x, n-1)

While we could solve these problems using loops, recursion is often times more readable and can even reduce time complexity with proper memorization (saving the value of results used in later calculations).

We have seen how parameters, scoping, and recursion are the foundations for using abstraction effectively. In Part 2, we'll discuss how we can build on this foundation to design large functional units with classes and interfaces.
