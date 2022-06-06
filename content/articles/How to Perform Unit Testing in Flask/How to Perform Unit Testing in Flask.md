### How to Perform Unit Testing in Flask

### Prerequisites
To get along the reader should ;
- Have a clear knowledge about flask in python.
- Have learned and understood the basics of python, you can click here; [Introduction to python](https://www.w3schools.com/python/python_intro.asp) to learn the basics of python programming language.

### Introduction
Flask unit testing is a way of determining the suitability for use of individual pieces of source code that consist of several modules programmed simultaneously. These tests are carried out by software engineers to check that the part of code created for a specific purpose achieves the task in question while also meeting the design and behavior requirements. These are usually automated tests that focus on certain functions or operations.

To execute a unit test, it's important to realize that if a module doesn't have any unit test cases, it's assumed that the program isn't running properly or hasn't been updated according to coding standards. In short, if the unit testing component is unavailable, there is a negative impression. It is always recommended that an environment be developed that makes maintenance simple and facilitates the import of smaller modules of code from one application into another.

### Table of contents
- [What's unit testing?](#What's-unit-testing?)
- [Store the Unit Tests](#store-the-unit-tests)
- [Generate the basic unit test file](#generate-the-basic-unit-test-file)
- [Execution of the Tests](#execution-of-the-unit-tests)
- [Code coverage](#code-coverage)
- [Flask Unit Testing examples](#flask-unit-testing-examples)
- [Conclusion](#conclusion)

### What's unit testing?
This is a form of software testing in which the smallest module of software is evaluated independently during the first test phase. The primary goal is to detach each component of the system in order to identify, analyze, and correct any flaws in the initial stages of the software development cycle.

Failing to do unit testing or performing limited unit testing will inevitably result in greater defect resolving charges during system testing, integration testing, and even beta testing once the product is finished.

Furthermore, unit testing aids software developers in understanding the code base, validating the quality of the developed code, reusing the code, and making code changes more quickly. You may test your Flask application in a variety of ways. They include; Pytest, UnitTest, and Nose

To perform unit testing in Flask the following procedures will be used:

### Store the Unit Tests
Although the unit test case files can be stored anywhere on the system, it is advisable to keep them in the project's "tests" directory. It's on the same level as the test files.

project Z

├── __init__.py

├── users.py

├── TIM

├── ZEF

├── ROM

├── tests

│     ├── test_TIM.py

│     ├── test_ZEF.py

│     ├── test_ROM.py

│     └── test_users.py

From the above tree, we can see that the 'tests' folder is in the same location as the components to be tested and that all of the unit tests are contained within the 'tests' folder.

### Generate the basic unit test file
After we've completed the processes for storing unit cases, it's important that we create an environment that allows us to write test cases quickly before writing unit test cases. The environment includes 'helper' utilities that make writing unit test cases easier.

This unit test case file is made up of a class and multiple methods specified within the class, all of which are used to test code components. Some unit case methods such as setup() and teardown() methods must be included. setup () is called before the unit test case is executed, and teardown () is called after the unit test case has finished running.  

### Execution of the Tests
To guarantee that we run basic sanity tests on the environment we've constructed before adding further functions to expand the coverage we'll try running the newly produced unit test file using  the `python<python file name.py>` command.

Remember to use the flask application's top-level folder. We may need to import app, database-like objects, and hence must give a place that is freely accessible by the Python interpreter.

We'll then check for the required features by testing the helper functions. It will return a positive or negative confirmation, as per the requirement of the type of functionality.

### Code coverage
You can install coverage using the code coverage
command pip install coverage. You can then consider using the coverage module to get the Flask function that determines the coverage.

![Install coverage](/engineering-education/how-to-perform-unit-testing-in-flask/instal.png)

> The above is a picture of how your screen should be when you run the command
We use `coverage run <python file name>` to execute the associated coverage command, and `coverage report <python file name>` to run the report command once the data has been gathered.



### Flask Unit Testing example
Here is a code example of flask unit testing.

> Code
![Flask Unit test code](/engineering-education/how-to-perform-unit-testing-in-flask/cov.jpg)

> Output
![Flask Unit testing](/engineering-education/how-to-perform-unit-testing-in-flask/unittestt.jpg)

### Conclusion
Performing unit testing is very essential in the Flask application, each part must execute its purpose for the program to run smoothly. With this tutorial, you as a reader will be able to establish a baseline to begin your experiments.
