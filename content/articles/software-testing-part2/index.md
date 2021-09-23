---
layout: engineering-education
status: publish
published: true
url: /software-testing-part2/
title: Introduction to Test-Driven Development
description: This article will be an introduction to test driven development (TDD), how to write in TDD, the benefits of TDD, and the limitations of TDD. All the code samples in this tutorial are written in python.
author: quadri-sheriff
date: 2020-12-09T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/software-testing-part2/hero.jpg
    alt: unit testing example image
---
In the first article of our software testing series, we talked about unit testing, how to run unit tests, their benefits, and limitations. 

If you have not read the article and you would like to learn more about unit testing, check the article out the previous article called [Introduction to Unit Testing](/software-testing-part1).
<!--more-->
In this article, we are going to discuss Test-driven development (TDD), how to write in TDD, the benefits of TDD, and the limitations of TDD. All the code samples in this tutorial are written in Python and the tests are done with the pytest framework. Basic knowledge of Python or pytest will be nice to have but is not required to understand this article. 

***Visit [python.org](https://www.python.org/) to learn more about Python and [pytest.org](https://docs.pytest.org/en/stable/getting-started.html) to learn more about the pytest framework.***

### Introduction to Test-Driven Development
Test-Driven Development(TDD) is a well-defined software development process where you create and run tests first before writing any code. 

TDD follows a RED - GREEN - REFACTOR cycle, where you:
- Create a test first for your requirements and make sure the tests fail in the red phase.
- Write enough code just to make your test pass in the green phase.
- Refactor your code to look clean while making sure your tests are still passing in the refactor phase.

There are 3 laws created by [Mr. Bob Martin](https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) that helps to explain the TDD process better. 

These laws state that:
1. You are not allowed to write any production code unless it's to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

### How to use Test-Driven Development
TDD advocates for writing tests first before you write any code. This means that you have to define all your use cases and requirements first, then write tests that will fail for these use cases, write enough code to make these tests pass, then refactor the code while ensuring your tests are still passing.

Use the following sequence to run TDD:
- Understand your objectives and list out your testing conditions.
- Then you write a test to pass your first testing condition.
- Confirm if your tests fail and write code just enough to pass these tests.
- Refactor your code to look clean and nice.
- Move on to the next testing condition.

For example, say we are trying to create a Python function that calculates the factorial of a number, the function will have to:
- Return 1 if the input is 0.
- Return 1 if the input is 1.
- Return value error if the input is less than 0.
- Calculate the factorial of all number greater than 1.

After listing our testing conditions, we can create our testing enviroment:
```bash
$ mkdir TDD_tutorial
$ cd TDD_tutorial
$ python3 -m venv virtual && source virtual/bin/activate
```

Then we create our testing file and function file.

```bash
$ touch _test.py factorial.py
```

Finally, we install pytest:
```bash
$ pip install pytest
```

Our factorial code will be in our `factorial.py` file, while our test code will be written in our `_test.py` file.

***Visit [pytest.org](https://docs.pytest.org/en/stable/getting-started.html) to learn more on how to set up testing enviroments and testing files.***

Then, we create a first test that fulfills our first condition.

- Return 1 if the input is 0.

```python
# _test

from factorial import find_factorial

def test_find_factorial_of_zero():
    num = 0
    assert find_factorial(num) == 1
```

When we run our test with `py.test`, we will get an assertion error. 

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 1 item                                                               
 
_test.py F                                                               [100%]
 
=================================== FAILURES ===================================
_____________________________ test_find_factorial ______________________________
 
    def test_find_factorial():
        num = 0
>       assert find_factorial(num) == 1
E       assert None == 1
E        +  where None = find_factorial(0)
 
_test.py:7: AssertionError
============================== 1 failed in 0.15s ===============================
```

This is expected since we don’t even have a function to test yet. The next step will be to write just enough code to pass our test. 

For our example, that will be:
```python
#  factorial 

def find_factorial(num):
    if num == 0:
        return 1
```   

Now when we run our test again, we get a pass output after that we move on to our next condition.

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 1 item                                                               
 
_test.py .                                                               [100%]
 
============================== 1 passed in 0.08s ===============================
```

- Return 1 if the input is 1.

First, we also design a test to pass these condition.

```python
# _test
from factorial import find_factorial

def test_find_factorial_of_one():
    num = 1
    assert find_factorial(num) == 1
```

We run our test to confirm if it fails.

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 2 items                                                              
 
_test.py .F                                                              [100%]
 
=================================== FAILURES ===================================
__________________________ test_find_factorial_of_one __________________________
 
    def test_find_factorial_of_one():
        num = 1
>       assert find_factorial(num) == 1
E       assert None == 1
E        +  where None = find_factorial(1)
 
_test.py:11: AssertionError
========================= 1 failed, 1 passed in 0.12s ==========================
``` 

Then we add just enough code to pass this test into our function.

```python
#  factorial 

def find_factorial(num):
    if num == o:
        return 1
    if num == 1:
        return 1 
```

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 1 item                                                               
 
_test.py .                                                               [100%]
 
============================== 1 passed in 0.08s ===============================
```

Before moving on to our next testing condition, we have to run our first test again to confirm if it's not broken and our two testing conditions can pass together at the same time.

```python
# _test
from factorial import find_factorial

def test_find_factorial_of_zero():
    num = 0
    assert find_factorial(num) == 1

def test_find_factorial_of_one():
    num = 1
    assert find_factorial(num) == 1
```

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 2 items                                                              
 
_test.py ..                                                              [100%]
 
============================== 2 passed in 0.06s ==============================
```

After that, we move to our third testing condition.

- Return ValueError if input is less than 0.

First we must create our tests.

```python
# _test
from factorial import find_factorial

def test_find_factorial_of_negative_numbers():
    num = -1
    assert find_factorial(num) == ValueError
```

Then we run our tests to confirm if it fails.

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 1 item                                                               
 
_test.py F                                                               [100%]
 
=================================== FAILURES ===================================
___________________ test_find_factorial_of_negative_numbers ____________________
 
    def test_find_factorial_of_negative_numbers():
        num = -1
>       assert find_factorial(num) == ValueError
E       assert None == ValueError
E        +  where None = find_factorial(-1)
 
_test.py:15: AssertionError
============================== 1 failed in 0.31s ===============================
```

Then we add just enough code to our function to just pass our failing test.

```python
#  factorial 

def find_factorial(num):
    if num == o:
        return 1
    if num == 1:
        return 1
    if num < 0:
        return ValueError
```
```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 1 item                                                               
 
_test.py .                                                               [100%]
 
============================== 1 passed in 0.08s ===============================
```

After that, we run all of our testing conditions together to confirm if they are still passing.

```python
# _test
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
```

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 3 items                                                              
 
_test.py ...                                                             [100%]
 
============================== 3 passed in 0.07s ===============================
```

Then, we move to our last testing condition.

- Calculate the factorial of all numbers greater than 1.

First we write our tests.

```python
# _test
from factorial import find_factorial

def test_find_factorial():
    num = 5
    assert find_factorial(num) == 120
```

Then we confirm if our test fails.

```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 1 item                                                               
 
_test.py F                                                               [100%]
 
=================================== FAILURES ===================================
_____________________________ test_find_factorial ______________________________
 
    def test_find_factorial():
        num = 5
>       assert find_factorial(num) == 120
E       assert None == 120
E        +  where None = find_factorial(5)
 
_test.py:19: AssertionError
============================== 1 failed in 0.08s ===============================
```

We will write just enough code just to pass our test.

```python
#  factorial 

def find_factorial(num):
    if num == 0:
        return 1
    if num == 1:
        return 1
    if num < 0:
        return ValueError
    if num > 1:
        return num * find_factorial(num - 1)
```
```bash
py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 1 item                                                               
 
_test.py .                                                               [100%]
 
============================== 1 passed in 0.08s ===============================
```

Then we confirm if our other testing conditions are still passing.

```python
# _test
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
```bash
$ py.test

============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 4 items                                                              
 
_test.py ....                                                            [100%]
 
============================== 4 passed in 0.16s ===============================
```

After writing the complete code that passes all our testing conditions, we can now refactor our function to look clean and well structured.

```python
#  factorial 

def find_factorial(num):
    if num == 0:
        return 1
    elif num == 1:
        return 1
    elif num < 0:
        return ValueError
    else:
        return num * find_factorial(num - 1)
```

We must also make sure to run all our tests after refactoring our code to confirm that nothing is broken in our function.

```bash
$ py.test

 ============================= test session starts ==============================
platform darwin -- Python 3.7.6, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: /Users/salius/Python_testing
plugins: requests-mock-1.8.0, hypothesis-5.5.4, arraydiff-0.3, remotedata-0.3.2, openfiles-0.4.0, mock-3.3.1, doctestplus-0.5.0, astropy-header-0.1.2, cov-2.8.1
collected 4 items                                                              
 
_test.py ....                                                            [100%]
 
============================== 4 passed in 0.16s ===============================
```

### Benefits of using Test-Driven Development
- TDD reduces development time: Test-driven development involves writing short tests for narrow pieces of code with instant feedback from your tests. This process prevents you from worrying about the system-wide impact of your code when writing code units which in turn makes your development faster.
- TDD helps write good unit tests: TDD tests are mostly unit tests i.e. they are laser-focused on specific functionality and implementation of your code. Also, because you have to write tests first before writing any code, TDD helps to increase the coverage of your unit tests.
- TDD helps cut bugs and refactor quicker: Code written with TDD is very reliable and refactorable, you can add new functionality, change existing functionality, or reuse the code without any fear of breaking anything in your codebase.
- TDD helps enforce good coding practices: TDD is very strict in forcing you to think deeper about the implementation of every code-unit in your codebase as you create them. This allows your code to become clean, well organized, and well structured.

### Limitations of Test-Driven Development
TDD works well in projects with well-defined requirements and objectives. However, it's almost impossible to predict most use cases of new projects. Also, objectives and requirements can change on a whim even in well-planned projects, these changes no matter how small can force you to rewrite most of your tests and code which can lead to double the amount of work.

### Conclusion
Using TDD for your software development projects has a lot of benefits and limitations. We should not treat TDD as a dogma that must be used in every situation, but as a best practice that can help you write better and cleaner code.

We should only use TDD for stable software projects with clear business requirements. Using TDD for new and unstable projects can lead to a lot of frustrations because of ever-changing requirements and objectives.

### Additional Resources
- [agiledata.org](http://agiledata.org/essays/tdd.html)
- [agilealliance.org](https://www.agilealliance.org/glossary/tdd/)
- [tutorialspoint.com](https://www.tutorialspoint.com/software_testing_dictionary/test_driven_development.htm)
- [developer.ibm.com](https://developer.ibm.com/devpractices/software-development/articles/5-steps-of-test-driven-development/)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
