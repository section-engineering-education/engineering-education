---
layout: engineering-education
status: publish
published: true
url: /raising-exceptions/
title: Raising Exceptions
description: This article will go over how to manually throw exceptions in Python and use assertions for better debugging. Raising exceptions allows us to distinguish between regular events and something exceptional, such as errors.
author: sophia-raji
date: 2020-07-29T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/raising-exceptions/hero.jpg
    alt: computer image example raising exception
---
*“It’s easier to ask for forgiveness than permission.” - Grace Hopper*

Errors come in two forms: syntax errors and [exceptions](https://docs.python.org/3/tutorial/errors.html).

While syntax errors occur when Python can't parse a line of code, raising exceptions allows us to distinguish between regular events and something exceptional, such as errors (e.g. dividing by zero) or something you might not expect to handle. Using conditionals to check for every possible event is not only inefficient and inflexible, but it also compromises readability. Fortunately, Python offers powerful exception-handling mechanisms to resolve this.
<!--more-->

**Exception**: Exception objects represent exceptional conditions
- When Python encounters an error, it _raises_ an exception.
- If the exception object is not _caught_, the program terminates with a **traceback** (error message).

The benefit of using exceptions is that rather than just getting error messages, you can trap the error and do something instead of letting the whole program fail.

### raise Statement
Use `raise` with an argument that is either a class (subclasses `Exception`) or an instance.

Using a class creates an instance automatically:

```shell
>>> raise Exception('hyperdrive overload')
Traceback (most recent call last):
   File "<stdin>", line 1, in ?
Exception: hyperdrive overload
```

```shell
>>> raise ArithmeticError
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
ArithmeticError
```

#### Examples of Built-in Exceptions
- `Exception`: base class
- `AttributeError`: attribute reference or assignment fails
- `OSError`: OS can't perform a task (i.e. file)
- `IndexError`: nonexistent index on a sequence (subclass of `LookupError`)
- `KeyError`: nonexistent key on mapping (subclass of `LookupError`)
- `NameError`: Name (variable) not found
- `SyntaxError`: syntax error in code
- `TypeError`: built-in operation or function applied to object of wrong type
- `ValueError`: built-in operation or function applied to object of correct type but with inappropriate value
- `ZeroDivisionError`: second argument of division or modulo operation is 0

A more complete list is available in the official [Python documentation](https://docs.python.org/3/library/exceptions.html).

#### When do you create custom exception classes?

Sometimes an error message is insufficient, so you can selectively handle certain types of exceptions based on their class.

Creating an exception class involves subclassing `Exception` or any of its subclasses in the form:

```shell
class NewCustomException(Exception): pass
```
### Catching Exceptions

It's possible to catch exceptions using a [`try/except` statement](https://www.educative.io/edpresso/how-is-tryexcept-used-in-python).

Exceptions not caught where a function is called will propagate to the top level of the program. If you called an exception already but want to raise it again, you can call `raise` without any arguments or supply the exception explicitly.

In an interactive session with a user, it is useful to create a class, whereas when used internally in a program, raising an exception is better. When raising a different exception, the exception that took you into `except` will be stored as context and be part of the final error message:

```shell
>>> try:
...     1/0
... except ZeroDivisionError:
...     raise ValueError
...
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ZeroDivisionError: division by zero
During handling of the above exception, another exception occurred:
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
ValueError
```

### More than one except clause

```shell
try:
    x = int(input('Enter the first number: '))
    y = int(input('Enter the second number: '))
    print(x / y)
except ZeroDivisionError:
    print("The second number can't be zero!")
```

Entering a nonnumeric value will prompt another exception to occur, but because the `except` clause only looked for `ZeroDivisionError`, this one slipped through and crashed the program.

Adding another exception solves this:

```shell
try:
    x = int(input('Enter the first number: '))
    y = int(input('Enter the second number: '))
    print(x / y)
except ZeroDivisionError:
    print("The second number can't be zero!")
except TypeError:
    print("That wasn't a number.")
```

Using an `if` statement here would be more difficult because you would have to define what kind of value can be used in division, while using exception handling doesn't clutter the code and allows us to check for multiple errors.

Specifying more than one exception type in one block can be done with a tuple:

```shell
except (ZeroDivisionError, TypeError, NameError):
```
It's possible to bundle this exception object comprised of two arguments. This is useful if you want to keep the program running but log the error for later:

```shell
try:
    x = int(input('Enter the first number: '))
    y = int(input('Enter the second number: '))
    print(x / y)
except (ZeroDivisionError, TypeError) as e:
    print(e)
```

Even if you handle several types of exceptions, you may not foresee all of them. What happens if we press Enter at the prompt in our sample program?

The ***stack trace*** (information about what went wrong) is as follows:
```shell
Traceback (most recent call last):
  ...
ValueError: invalid literal for int() with base 10: ''
```

#### Options:
- Crash the program immediately so you can see what's wrong rather than hide exception with `try/except` statement that won't catch it
- Omit the exception class from the except clause

```shell
try:
    x = int(input('Enter the first number: '))
    y = int(input('Enter the second number: '))
    print(x / y)
except:
    print('An error occurred')
```

This is risky because it hides both errors you anticipated and those you did not. The user will also have to terminate the program's execution with CTRL-C and functions with `sys.exit`.

Some cases might benefit from using `except Exception as e` and checking the exception on the object `e` to allow the few exceptions that don't subclass to slip through.

### When Things Go Right

It can also be useful to have a block of code execute unless something bad happens using an `else` clause:

```shell
while True:
    try:
        x = int(input('Enter the first number: '))
        y = int(input('Enter the second number: '))
        value = x/y
        print('x / y is', value)
    except:
        print("Invalid input. Please try again.")
    else:
        break
```

The loop is broken only when no exception is raised. The program runs as long as something wrong happens by asking for new input. How would we catch all exceptions of the Exception class by printing more informative error messages?

We modify our earlier code:

```shell
while True:
    try:
        x = int(input('Enter the first number: '))
        y = int(input('Enter the second number: '))
        value = x/y
        print('x / y is', value)
    except Exception as e:
        print("Invalid input:", e)
        print("Please try again.")
    else:
        break
```

### finally Clause

The keyword `finally` is used to do housekeeping after a possible exception. This guarantees the `finally` clause is executed no matter what exceptions occur in the `try` clause, namely for closing files or network sockets.

```shell
x = None
try:
    x = 1/0
finally:
    print('Cleaning up...')
    del x
```

We initialize x before the `try` clause so the cleanup comes before the program ends, and because if we put it within the `try` clause, it would never be assigned a value due to `ZeroDivisionError`, so you would not catch this error.

### Warnings
Warnings are displayed only once and can be suppressed or filtered using the `filterwarnings` function in the `warn` module. Possible actions include "error" and "ignore". You can specify a different warning category that is a subclass of `Warning`.

```shell
from warnings import filterwarnings
filterwarnings("ignore")
warn("Anyone out there?")
filterwarnings("error")
warn("Something is wrong!")
```
```shell
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
UserWarning: Something is very wrong!
```
