### Introduction
Unit tests are used in the software testing process where specific sections of a program (usually methods,fuctions or classes) are tested to ensure that they performs as intended. A unit test is a piece of code written by a developer to test small pieces of a larger program's functionality.  Unit testing is designed to be simple.

In most situations, the test cases are defined as methods that evaluate and assess if a returned result from a Unit Test is equal to the value you expected when you wrote the method.

### Table of contents
- [Prerequisites](#prerequisites)
- [Why do we need a Unit test](#why-do-we-need-a-unit-test)
- [Create a simple Unit test](#create-a-simple-unit-test)
- [MS Unit tests](#ms-unit-tests)
- [The `TestClass` and  `TestMethod` attributes](#the-testclass-and-testmethod-attributes)
- [Naming conventions](#naming-conventions)

### Prerequisites
For you to follow up with this article, you should be familiar with:
- C# Language
- Visual Studio

### Why do we need a Unit test
- It increases the code quality and promoting a clean code.
- Unit testing helps us to maintain our code in the development process and make the development fast.
- It helps a programmer to better his skills, thus delivering good services to the clients.
- Unit testing makes our code reusable and reliable.
- It saves time as you will be sure the code works as expected.

In C#, there are many frameworks for unit testing, but there are three that are considered favorable:
- Microsoft Testing (MSTest)/Visual Studio
- NUnit
- xUnit .Net

This article will use the **Microsoft Testing (MSTest)** framework for our unit test.

### Create a simple Unit test
In C#, we can follow different approaches where we can first create a simple code then test if it works as intended. We can alternatively develop the code to implement the test first, then design the test, that is, Test Driven Development(TDD). You can decide which approach to use, but in our case, we shall make a simple code then test its efficiency.

For better understanding, let's create a simple console program for multiplying two numbers. We shall name our program *TestTutorial*.

```cs
using System;
namespace TestTutorial
{
    public class Multiplication
    {
        public static void Main(string[] args)
        {
            Multiplication mul = new Multiplication();
            Console.WriteLine(mul.multiply(3,6));
        }
        public int multiply(int firstNumber, int secondNumber)
        {
            return firstNumber * secondNumber;
        }
    }
}
```
We have created a class that takes in two inputs and returns its product from the code above.

### Microsoft Testing (MSTest)
To test our code above, we will use the MSTest framework installed with Visual Studio. Follow the steps below to test our code:

From our solution explorer, let's open a new project:

![new project](/engineering-education/new-project.png)

Select **Unit Test Project** from the list of possible templates and type the project's name:

![unit test project](/engineering-education/unit-test-project.png)

In our case, we shall call our unit test *TestTutorial.UnitTests*. We should add suffixes such as *test* or *unitTest* to the name of the unit test to differentiate it from our main program. 

Visual Studio will automatically generate some C# code for you.

### The `TestClass` and  `TestMethod` attributes
The class that contains test methods must be decorated with this attribute. Otherwise, the unit testing framework will not be able to discover the unit tests.

The methods in our unit test must be decorated with the `TestMethod` attribute and in the `TestClass.` Otherwise, the unit testing framework will not discover the method as a unit test method.

Both `TestClass` and `TestMethod` attributes are present in `Microsoft.VisualStudio.TestTools.UnitTesting` namespace.

**Note:** You can only apply one instance of a TestClass on a class. Similarly, you can only use one case of TestMethod on a method. Otherwise, you will get a compile-time error.

### Naming conventions

- A good naming test provides all the information about the test, e.g., **Roy Osherove's naming strategy for unit tests** that is, `[UnitOfWork_StateUnderTest_ExpectedBehavior].`
- We should rename our test to show the purpose of the tests. 

- The name should not have spaces, i.e., one should use underscore.

Let's rename our test class `UnitTest1` to `MultiplyTest` by pressing **Ctrl+R+R**. Let's also rename our test method `TestMethod1()` to `Multiply_Two_Numbers()`:
```cs
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TestTutorial.UnitTests
{
    [TestClass]
    public class MultiplyTest
    {
        [TestMethod]
        public void Multiply_Two_Numbers()
        {          
        }
    }
}
```
 We shall use the basic principle called **triple AAA**: Arrange, Act and Assert.
- The **arrange** section is where we prepare our objects for testing by initializing them.
- The **act** section is where we act on the object by calling the method to test. That is, we should invoke our method.
- The Assert part is where we verify if the method being tested behaves as expected. 

Let's use the principle in our code:

```cs
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace TestTutorial.UnitTests
{
    [TestClass]
    public class MultiplyTest
    {
        [TestMethod]
        public void Multiply_Two_Numbers()
        {
            //Arrange
            int a = 6;
            int b = 2;
            int expected = 12;
            //Act
            int actual = TestTutorial.Multiplication.multiply(a, b);
            //Assert
            Assert.AreEqual(expected, actual);  //to assert if the result is true
        }
    }
}

```
As we have noticed, our code raised a red flag since the `Multiplication()`  class was not found. This error means we have to reference our project to make use of the class:

![Adding reference to our project](/engineering-education/add-refence.png)

From the example above, we have used the `Assert` class contained in the MSTest, and it contains a batch of static methods that help us make an assertion. These methods include `AreEqual()`, `IsFalse()`, `IsTrue()`. For more about the `assert` class, explore this [documentation](https://docs.microsoft.com/en-us/dotnet/api/microsoft.visualstudio.testtools.unittesting.assert?view=visualstudiosdk-2019).

To run our test, we shall go to the Test Menu -> Run -> All or click **Ctrl+R, A**.

This opens a test explorer window, which displays the test run, which will consist of only one passed test. It will fail if you alter the first parameter to Assert.AreEqual().

### Conclusion
In this article, we have seen the benefits of unit tests and creating our unit test with MSTest in C#.
