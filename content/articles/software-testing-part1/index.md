---
layout: engineering-education
status: publish
published: true
url: /engineering-education/software-testing-part1/
title: Introduction to Unit Testing
description: This article will be an introduction to software testing, going over popular examples such as integration testing, unit testing, system testing, and regression testing. This article will mainly focus on unit testing.
author: quadri-sheriff
date: 2020-12-08T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/software-testing-part1/Hero.jpg
    alt: unit testing example image
---
Software testing is a very important software development process. It helps improve the quality of your software, and also ensures you do not ship bug-filled software to your end-user. 
<!--more-->
There are different types of software testing available today, each type with its specific use case, tools, benefits, and limitations. Popular examples are integration testing, unit testing, system testing, regression testing, etc. 

In this article, we will talk about unit testing, how to run unit tests, the benefits, and the limitations. This article is the first part of our software testing series, where we discuss popular software testing techniques.

All the code samples in this tutorial are written in Python and the tests are done with the pytest framework. Basic knowledge of python or pytest will be nice to have but is not required to understand this article. 

***Visit [python.org](https://www.python.org/) to learn more about python and [pytest.org](https://docs.pytest.org/en/stable/getting-started.html) to learn more about the pytest framework.***

### Introduction to unit testing
Unit testing is a type of software testing where you test each of your code units (the smallest functioning part of your code - typically an individual method, function, or class) as independently as possible to ensure they behave as they are expected to.

Unit testing is part of the whiteboard testing techniques where the internal implementation of the software being tested is known to the tester. 

Unit tests are mainly used to validate the functionality of your code units. Unit testing can be manual or automated. 

- Manual tests are written inside your code and are mostly used for small projects where the cost of setting up a testing framework is not necessary. 
- Automated testing is done with testing frameworks. [Pytest](https://docs.pytest.org/en/stable/getting-started.html) is an automated unit testing library built for Python programming language. You can check out a full listing of automated testing frameworks [here](https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks). 

### When to write unit tests
When you write unit tests, you are isolating and testing your code units individually. You should write unit tests for the following parts of your codebase.

- Parts of your codebase that are very complex and could break.
- Parts of your codebase with a lot of bugs.
- All your business logic.
- Any part of your codebase that you think will probably have errors or bugs.

Do not write unit tests for external parts of your software like databases, your presentation layer, or any code that will not be actively maintained.

### How to run unit tests
To run unit tests, you provide a sample input into your code unit, and then check the output to see if you are receiving the right output i.e. it upholds its end of the contract.

For example, say you have a Python function that calculates the factorial of a number in your codebase that you would like to test.

First, we would create our testing enviroment as follows.

```bash
$ mkdir factorial_testing
$ cd factorial_testing
$ python3 -m venv virtual && source virtual/bin/activate
```

Then we create our testing file and function file.

```bash
$ touch _test.py factorial.py
```

Finally, we install pytest.

```bash
pip install pytest
```

Our factorial function will be added to our `factorial.py` file, while our tests will be written inside our `_test.py` file.

***Visit [pytest.org](https://docs.pytest.org/en/stable/getting-started.html) to learn more on how to set up testing enviroments and testing files.***

```python
#  Factorial

def  find_factorial(num):
    factorial = 1

    if num == 1:
        return factorial
    elif  num == 0:
        return factorial
    elif num < 0:
        return  ValueError
    else:
        for i in range(1, (num + 1)):
            factorial = factorial * i
        return factorial
```

To perform unit testing, you have to test every output of your code unit with their expected return value to confirm if they adhere to their contract. 

```python
# _test.py

from factorial import find_factorial

def test_find_factorial_of_zero():
    num = 0
    assert find_factorial(num) == 1

def test_find_factorial_of_one():
    num = 1
    assert find_factorial(num) == 1

def test_find_factorial_of_negative_numbers():
    num = -1
    assert find_factorial(num) == ValueError

def test_find_factorial():
    num = 5
    assert find_factorial(num) == 120
```

Run your tests to confirm if your code unit is working as expected.

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 4 items                                                              

_test.py ....                                                            [100%]

============================== 4 passed in 1.89s ===============================
```

Now, say you were to change the expected output of your test to a wrong value.

```python
#  _test.py

from factorial import find_factorial

def test_find_factorial_of_zero():
    num = 0
    assert find_factorial(num) == 2
```

You get an AssertionError error because your code unit can’t uphold its contract as expected in your tests. This error will notify you about the part of your code unit that is breaking thereby allowing you to fix all your errors easily. 

```bash
$ py.test

======================= test session starts ========================
platform linux -- Python 3.6.9, pytest-6.1.2, py-1.9.0, pluggy-0.13.1
rootdir: /home/murage/reviews/factorial_testing
collected 4 items

_test.py F...                                                [100%]

============================= FAILURES =============================
___________________ test_find_factorial_of_zero ____________________

    def test_find_factorial_of_zero():
        num = 0
>       assert find_factorial(num) == 2
E       assert 1 == 2
E        +  where 1 = find_factorial(0)

_test.py:5: AssertionError
===================== short test summary info ======================
FAILED _test.py::test_find_factorial_of_zero - assert 1 == 2
=================== 1 failed, 3 passed in 0.09s ====================
```

### Benefits of running unit tests
- Code refactoring: Unit testing removes the fear of refactoring or re-writing your code. If you have implemented good unit testing, you can refactor with confidence without the fear of breaking any of the other functionalities in your code.

- Adding new features: Unit testing makes it easier to add new features to your codebase. Whenever you add a new feature to your codebase, you just re-run all your tests to see if your other features are still working as expected.  

- Code reuse: Unit testing forces you to write modular code, that helps in content reuse as your features are separated into independent modules. If you want to copy a feature to another codebase, just copy the module and tests to the new codebase, then rerun the tests to check if anything is broken.

- Documentation: Well written unit tests should provide accurate documentation for your codebase. Unit tests should describe how your code works, their input, and output. Unit tests are also updated whenever your code is updated, this ensures that your documentation is never out of date.

- Early bug discovery: Writing unit tests ensures that you think through every piece of code before writing it, this allows you to catch all breaking changes before deploying your software thus saving you time and money. 

### Limitations of unit testing
Unit tests are the lowest form of testing and are very specific with a narrow use case. Unit tests will not catch all the bugs in your software, you still have to run higher-level testing like integration or system testing before you are confident in the quality of your software.

Unit tests can also take a lot of time to write, and be very hard to master. You often need to write 3 - 5 lines of tests for every line of code depending on how complex your code is. This can lead to a massive increase in the codebase you will have to maintain compared to writing untested code.

### Conclusion
This article was meant to serve as an introduction to unit testing, how to run unit tests, the benefits, and the limitations.
Hope this helps better understand when it would be beneficial to use unit testing.

### Additional resources
- [softwaretestingfundamentals.com](https://softwaretestingfundamentals.com/unit-testing/)
- [tutorialspoint.com](https://www.tutorialspoint.com/software_testing_dictionary/unit_testing.htm)
- [smartbear.com](https://smartbear.com/learn/automated-testing/what-is-unit-testing/)
- [developer.android.com](https://developer.android.com/training/testing/unit-testing)
- [softwaretestinghelp.com](https://www.softwaretestinghelp.com/unit-testing/)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
