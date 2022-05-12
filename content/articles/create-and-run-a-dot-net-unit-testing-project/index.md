---
layout: engineering-education
status: publish
published: true
url: /create-and-run-a-dot-net-unit-testing-project/
title: How to Create and Run a .Net Unit Testing Project
description: This tutorial will help the reader understand about Unit Testing and how to create a project with unit testing un .NET.
author: gitau-kimani
date: 2021-11-26T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/create-and-run-a-dot-net-unit-testing-project/hero.jpg
    alt: How to create and run a .Net Unit Testing Project Image
---
All applications must undergo some form of testing. A unit test is utilized when testing a unit of the application. A unit is a portion of code that can be separated logically in a system.
<!--more-->
In this tutorial, we will use Visual Studio to test ASP.Net apps. It's also used to run an ASP.Net application's test code. It becomes much easier to check for faults in an ASP.Net application this way. 

The testing module in Visual Studio provides the built-in capability. A test for an ASP.Net project is run right immediately.

### Table of contents
- [What is unit testing](#what-is-unit-testing)
- [Types of approaches to unit testing](#types-of-approaches-to-unit-testing)
- [Techniques for Testing Units](#techniques-for-testing-units)
- [Benefits of Unit testing](#benefits-of-unit-testing)
- [Creating a project](#creating-a-project)
- [How to create a unit-testing project](#how-to-create-a-unit-testing-project)
- [Make a test class](#make-a-test-class)
- [Prerequisites for the test class](#prerequisites-for-the-test-class)
- [Creating a method for testing](#creating-a-method-for-testing)
- [Create the test and execute it](#create-the-test-and-execute-it)

### Prerequisites
To follow along with this tutorial, you'll need the following:
- A basic understand of C#.
- A basic understanding of ASP.Net.
- A text editor like [Visual Studio](https://visualstudio.microsoft.com/downloads/).

### What is unit testing
Unit testing determines if components or individual software units correspond to the designed specifications and testing, accompanying data, and usage procedures.

A unit is a short piece of code that performs a specific task. The unit test is a brief script or code that verifies a particular unit's behavior and returns a pass or fail result.

The goal of the unit test is for developers to be able to run as many unit tests as feasible to find potential flaws.

Other types of testing will be required after the application has passed unit testing for further validation.

All .net languages utilize NUnit, a widely known unit-testing framework. It's a free and open-source program that lets you manually code scripts. It allows for the performance of simultaneous data-driven tests.

### Types of approaches to unit testing
The available unit testing methods include:

- **Manual:** You need to create an explanatory document describing each step in the process for those who use a manual approach.

- **Automated:** Automated unit tests are still the most popular approach. When using an automated method, it's usual to create test cases inside a testing framework.

All failed tests will be noted and reported, as well as a description of all successful tests.

### Techniques for testing units
Black box testing involves testing the user interface and input and output, while White box testing focuses on the functional behavior of the software application.

Test suites, methods, test cases, and risk assessments are carried out using gray box testing. The user interface of a software program is tested via black-box testing.

The following are unit testing techniques:
- Statements included in the scope.
- Coverage of the decision-making process.
- Coverage of Different Branches.
- Coverage of the Situation.
- Coverage by a Finite State Machine.

### Benefits of unit testing
- **A greater rate of progress:** Writing unit tests saves developers time by reducing the amount of time they spend troubleshooting. Adding new features to the product and then refactoring the code will be easier for developers if they have confidence in what may fail. This is impossible without unit testing.

- **New and improved concept:** Creating unit tests helps developers see how their code will be used across the system, leading to a better overall design.

- **The use of a more robust feedback mechanism:** It will be possible to evaluate the current status of the system after all unit tests have been performed. These tests provide programmers a better idea of the state of the code, such as whether it's finished or not. Test environment modifications may impact the code base, but the feedback system can assist in communicating how the test environment is doing.

- **It is a useful pre-regression tool:** Developers will be able to restructure or reorganize code with ease after all unit tests have been completed. Developers may rest easy knowing that their changes won't harm other modules or the whole system.

- **Cost-cutting:** An expensive patch may be required if a problem is found late in the development process. Early detection of fundamental issues (which may have a significant impact on the system later on) using a well-designed set of unit tests helps keep maintenance costs down in the long run.

### Creating a project
1. When creating a new project, we will use Visual Studio and create a new project from the start menu.

![create a new project](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image1.png)

2. Once we've done that, we'll need to locate our.NET Core's C# console app project template and click the icon that appears there.

![create a console project](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image2.png)

3. Decide on a name for your endeavor. For this project, I decided to call it `Collegefinance`. Either the.NET Core 3.1 or.NET 5 target framework will have to be selected.

As you work on the school project, the `Program.cs` file will be open in the code editor.

![Naming the project](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image2.png)

> If you can't open the Program.cs file directly; you may do so in Solution Explorer by double-clicking it.

4. To use the `CollegeFinance` class, add the following C# code to `Program.cs`:

```C#
using System;
namespace BankAccountNS
{
    public class CollegeFinance
    {
        private readonly string n_studentIdentity;
        private double n_Remainder;
        private CollegeFinance() { }
        public CollegeFinance(string studentIdentity, double Remainder)
        {
            n_studentIdentity = studentIdentity;
            n_Remainder = Remainder;
        }
        public string studentIdentity
        {
            get { return n_studentIdentity; }
        }
        public double Remainder
        {
            get { return n_Remainder; }
        }
        public void Arrears(double total)
        {
            if (total > n_Remainder)
            {
                throw new ArgumentOutOfRangeException("total");
            }
            if (total < 0)
            {
                throw new ArgumentOutOfRangeException("total");
            }
            n_Remainder += total; // intentionally incorrect code
        }
        public void Solvency(double total)
        {
            if (total < 0)
            {
                throw new ArgumentOutOfRangeException("total");
            }
            n_Remainder += total;
        }
        public static void Main()
        {
            CollegeFinance dc = new CollegeFinance("Anthony Lincons", 12.88);
            dc.Solvency(6.88);
            dc.Arrears(12.54);
            Console.WriteLine("Current remainder is ${0}", dc.Remainder);
        }
    }
}
```

5. Right-click on the file in Solution Explorer and select Build Solution from the Build menu (or Ctrl + SHIFT + B) to rename it to `CollegeFinance.cs`. We now have a project that we can put to the test.

### How to create a unit-testing project
1. Add a new project simply from File Menu.

![create a new project](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image1.png)

2. You have to choose the language of choice, which in our case is C#, then proceed after you have selected the unit test project for the .NET Core template.

![Unit Test Project](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image4.png)

3. Rename such as `CollegeTests` then proceed by clicking next.

![Project naming](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image5.png)

4. Create a new CollegeTests project with the desired architecture (.NET Core 3.1 or.NET 5) selected. We've integrated `CollegeTests` into the `Collegefinance`.

5. Make sure the CollegeTests project contains a mention of the College project. In the project created click to View in the menu bar, click Solution Explorer from the list, click dependencies, and then add dependencies by right-clicking the reference option.

6. Expand Projects, then Solution, and finally Collegefinance in the Reference Manager dialog box.

![Reference](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image6.png)

### Make a test class
In this phase, we will rename the file `CollegeFinanceTests.cs` which is more informative rather than reusing the template as per the project for testing the `CollegeFinance` class.

Add the following code to the CollegeFinanceTests.cs file:

```C#
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace CollegeTests
{
 [TestClass]
 public class CollegeFinanceTests
 {
   [TestMethod]
   public void TestMethodl()
 }
}
```

***Make sure to include a using clause***

If you wish to call into the test project without suitably qualified identifiers, add a using line to the test class. 

Add the following to the class file's header:

```C#
using CollegeFinanceNS;
```

### Prerequisites for the test class
A test class must satisfy the following criteria:
- Any class with unit testing methods that wish to run in Test Explorer must have the `[TestClass]` attribute.
- This property must be present in every method `[TestMethod]` you plan on using in Test Explorer so that it can be recognized by the tool.

You may use functions in test classes without the `[TestMethod]` attribute in your unit test project instead of types with the `[TestClass]` property. You may use your test methods to invoke these new classes and functions from your test code.

In the following approach, we will create unit testing methods to verify the `Fees` method of the `CollegeFinance` class's behavior.

### Creating a method for testing
As a first step, we'll ensure that a valid payment has been made to the account. 

Class `CollegeFinanceTests` should have this method:

```c#
[TestMethod]
public void Arrears_WithValidTotal_UpdatesRemainder()
{
    double beginningRemainder = 12.11;
    double ArrearsTotal = 5.11;
    double anticipated = 6.33;
    CollegeFinance account = new CollegeFinance("Anthony Lincons", beginningRemainder);
    account.Arrears(ArrearsTotal);
    double attested = account.Remainder;
    Assert.AreEqual(anticipated, attested, 0.002, "The account has not been charged appropriately.");
}
```

The function is simple: it creates a new CollegeFinance object with a starting remainder and then withdraws a valid amount. It checks if the ending remainder is as predicted using the Assert.AreEqual function. Assert is an example of a method.

#### Specifications for the test technique
A test method must satisfy the following conditions:
- It has the [TestMethod] attribute on it.
- It gives a void result.
- It isn't allowed to have parameters.

### Create the test and execute it
1. Choose Build Solution from the Build drop-down menu.

![Build](/engineering-education/create-and-run-a-dot-net-unit-testing-project/image7.png)

2. If Test Explorer isn't already open, go to test> Windows, then select Test Explorer from the main menu.
3. Run the test from the Run All section. While running the test, a progress bar appears and changes color. If all tests are successful, then the bar is green; otherwise, it is red. The test will fail if we assume our worst-case scenario.
4. To explore more about a technique, open Test Explorer and click on the technique's name.

#### Then re-test when you have fixed the code
An explanation for the failure is included in the test findings. It's easy to see what was expected and what was obtained by using the `AreEqual` method's message. The remainder grew rather than decreased as a result of the sum paid.

During the unit test, an issue was discovered: instead of being deducted, the sum paid is added to the account Remainder.

#### Correct the problem.
Replace the line in the `CollegeFinance.cs` file to fix the problem:

```C#
n_Remainder += total;
```

With:

```C#
n_Remainder -= total;
```

### Conclusion
As evident in this tutorial, Unit testing is the first level of testing in an ASP.Net project. Unit testing is a test of an application's functioning. The purpose of the testing is to guarantee that the application performs as planned. 

Opening Visual Studio and creating a test project is the first step. The test project will have all of the code required to test the application.

Happy coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
