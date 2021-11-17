---
layout: engineering-education
status: publish
published: true
url: /working-with-pythons-unittest/
title: Working with Pythons Unittest
description: In this article, we'll see how we can use the unittest module to perform regression testing. Regression testing refers to retesting software to ensure that it works well after a change has been made.
author: stephen-mwangi
date: 2021-03-22T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-pythons-unittest/hero.png
    alt: Working with Pythons Unittest
---
In software engineering, a unit test refers to a program used to automatically check for bugs in individual parts/units of software. Unit testing is an important phase of the software development life cycle. To carry out a test, a developer specifies a set of testcases and their expected results for comparison.
<!--more-->
### Introduction
Most programming languages provide inbuilt unit testing frameworks. In this article, we will focus on Python's unittest.
Regression testing refers to retesting software to ensure that it works well after a change has been made (after refactoring code). In this article, we'll see how we can use the unittest module to perform regression testing.

### Prerequisites
To follow along you will need:
1. A basic understanding of Python functions and classes.
2. A text editor. I'll be using [Visual Studio Code](https://code.visualstudio.com/).
3. [Python](https://www.python.org/downloads/) installed.

Let's get started by creating two files: `mathfns.py` and `main.py` using the project structure shown below.

```bash
project-root
    |
    --- mathfns.py
    --- main.py
```

### Let's code
The `mathfns.py` file will store the units that we will perform unit testing on.
The units are basic maths functions used to double a given number `x`, get the square of a number `x`, and divide two numbers `num`(numerator) and `den`(denominator).

```python
# mathfns.py

def double(x):
   return 2 * x

def square(x):
   return x * x

# divide numerator by denominator
def divide(num, den):
   return num / den
```

#### Unit tests

```python
# main.py

from mathfns import double, square, divide
import unittest

class TestMathFunctions(unittest.TestCase):
   def test_double(self):
      # used to check that double(8) returns 16
      self.assertEqual(double(8), 16)

      # used to check that double(8) returns a number not equal to 15
      self.assertNotEqual(double(8), 15)
 
    def test_square(self):
       # used to check that square(7) returns 49
       self.assertEqual(square(7), 49)
    
    def test_divide(self):
       # we want to make sure that the divide unit raises a ZeroDivisionError
       # when one attempts to divide a number by zero.
       with self.assertRaises(ZeroDivisionError):
         divide(42, 0)

if __name__ == '__main__':
   # unittest.main() serves as the main entry point to run the unit tests.
   # unit tests are not performed without this function call
   unittest.main()
```

The `main.py` file will store the unit tests that we have. We import the units `double`, `square`, and `divide` from the `mathfns` script defined above. We then import the `unittest` module from Python's standard library.

The class `TestMathFunctions` inherits unit testing capabilities from the `unittest.TestCase` class. 

It provides three methods:
1. `test_double` which does unit tests for the `double` unit.
2. `test_square` which does unit tests for the `square` unit.
3. `test_divide` which does unit tests for the `divide` unit.

The following naming convention is used to make the unit tests self-descriptive: the test names should be in the `test_UnitName` format. In this case, `UnitName` refers to the unit being tested. Inside each of the unit tests, we use the assert methods to check for any report errors.

To run the unit tests, proceed as follows:
```bash
>>> python3 -m unittest main.py
```

The output will show that all three tests were executed correctly:

```bash
>>> python3 -m unittest main.py
...
----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
```

#### Output types
After running a test, the unittest module will have two types of outputs:
1. `OK`: This shows that all tests ran successfully as demonstrated above.
2. `FAILED (failures=n)`: This shows that `n` tests failed. unittest then prints the associated failure information.

#### Failure example
We have seen what happens when the unit tests run correctly. Now, let us take a look at what happens when one of the unit tests fails. For this, we change the `double` function to quadruple the number `x` instead of doubling it as shown below:

```python
def double(x):
   return 4 * x
```

When we run the unit tests, we get the following output:

```bash
>>> python3 -m unittest main.py
.F.
======================================================================
FAIL: test_double (__main__.TestMathFunctions)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "main.py", line 8, in test_double
    self.assertEqual(double(8), 16)
AssertionError: 32 != 16

----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=1)
```

Of the 3 tests that we performed, `self.assertEqual(double(8), 16)` produces an error since `32 != 16`. This demonstrates how unit tests are used for regression testing.

To see more detailed information, use the `-v` flag before the file holding the unit tests. The `v` stands for `verbose`.

```bash
>>> python3 -m unittest -v main.py
test_divide (tests.TestMathFunctions) ... ok
test_double (tests.TestMathFunctions) ... FAIL
test_square (tests.TestMathFunctions) ... ok

======================================================================
FAIL: test_double (tests.TestMathFunctions)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "main.py", line 8, in test_double
    self.assertEqual(double(8), 16)
AssertionError: 32 != 16

----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=1)
```

#### Error messages
Error messages are very useful for future code debugging. They also provide documentation for quality assurance testers and other developers.

For instance, to add an error message to `self.assertEqual(double(8), 16)`, change your code to match this:

```python
   def test_double(self):
      self.assertEqual(double(8), 16, "the function should return two times the number provided")
```

The output will be:

```bash
>>> python3 -m unittest main.py
.F.
======================================================================
FAIL: test_double (__main__.TestMathFunctions)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "main.py", line 8, in test_double
    self.assertEqual(double(8), 16, "the function should return two times the number provided")
AssertionError: 32 != 16 : the function should return two times the number provided

----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=1)
```

As demonstrated above, the error message we added describes the `AssertionError` better. This has made it more understandable.

#### Assert methods
So far, we've seen the `assertEqual(a, b)` method, the `assertNotEqual(a, b)` method, and the `assertRaises(x)` method. Apart from these, the unittest module provides these extra assert methods:

| Method                    | Result                                                                                                                                                            |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| assertTrue(x)             | checks that a boolean value  `x`  equals  `True`                                                                                                                  |
| assertFalse(x)            | checks that a boolean value  `x`  equals  `False`                                                                                                                 |
| assertIn(a,b)             | checks that a value  `a`  exists in a list  `b` . For instance, this check should pass when  `a=2`  and  `b=[1,2,3]`                                              |
| assertNottIn(a,b)         | checks that a value  `a`  does not exist in a list  `b` . For instance, this check should fail when  `a=2`  and  `b=[1,2,3]`  since  `2`  exists in the list  `b` |
| assertIsNone(x)           | checks that a value `a` equals `None`                                                                                                                             |
| assertIsNotNone(x)        | checks that a value `a` does not equal `None`                                                                                                                     |
| assertIs(a, b)            | checks that `a` and `b` are the same object                                                                                                                       |
| assertIsNot(a, b)         | checks that `a` and `b` are different objects                                                                                                                     |
| assertIsInstance(a,b)     | checks that `a` is an instance of class `b`. For instance, if `a="Hello"`, and `b=str`, the check should pass since `a` is a string.                              |
| assertNotIsInstance(a, b) | checks that `a` is not an instance of class `b`                                                                                                                   |

### Benefits of unit testing
Unit testing is an essential step of the software development life cycle and provides benefits such as:

- An efficient and automated way to discover bugs.
- Ensuring that a unit works properly after refactoring (regression testing).
- Detecting bugs during the early phases of development reduces project costs.
- It can help new developers familiarize themselves with the working of the units.
- It provides code quality assurance since they show it is functioning correctly.

### unittest and other Python testing frameworks
The most popular third-party unit testing frameworks include pytest and nose in that order. Yet, unittest is more beginner-friendly since it has a shallow learning curve. 

For instance, it does not use the complex annotations used in a framework like pytest. Furthermore, it does not require an installation since it's inbuilt into Python's standard library.

The unittest does have some limitations compared to the third-party frameworks. 

These include:
- It requires more boilerplate code to get started.
- It does not support plugins.

### Conclusion
In this article, we learned about unit testing, regression testing, and how to use Python's unittest module. You can find a working implementation of the project [here](https://replit.com/@StephenMwangi1/unit-testing) which you can execute by clicking the run button. You can also click the fork button to create a copy that you can modify.

For more information, check the [unittest documentation](https://docs.python.org/3/library/unittest.html).

Happy coding!

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
