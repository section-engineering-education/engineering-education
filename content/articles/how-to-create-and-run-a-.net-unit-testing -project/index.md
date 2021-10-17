Any programming language must include some form of testing. We will use Visual Studio to test ASP.Net apps and write a test code in Visual Studio and run it. It becomes much easier to check for faults in an ASP.Net application this way. The testing module in Visual Studio provides the built-in capability.

### Table of contents
- [What is unit testing](#what-is-unit-testing)
- [Types of approaches to unit testing](#types-of-approaches-to-unit-testing)
- [Techniques for Testing Units](#techniques-for-testing-units)
- [Benefits of Unit testing](#benefits-of-unit-testing)
- [Creating a project](#creating-a-project)
- [How to create a unit-testing project](#how-to-create-a-unit-testing-project)
- [Make a test class](#make-a-test-class)
- [Prerequisites for the test class](#prerequisites-for-the-test-class)
- [Developing a test method](#developing-a-test-method)
- [Create the test and execute it](#create-the-test-and-execute-it)

### What is unit testing

Unit testing determines if components or individual software units correspond to the designed specifications and testing, accompanying data, and usage procedures.
A unit is a short piece of code that performs a specific task. The unit test is a brief script or code that verifies a specific unit's behavior and returns a pass or fail result.

The goal of the unit test is for developers to be able to run as many unit tests as feasible to find potential flaws.

Other types of testing will be required after the application has passed unit testing for further validation.

All .net languages utilize NUnit, a widely known unit-testing framework. It's a free and open-source program that lets you manually code scripts. It allows for the performance of simultaneous data-driven tests.

### Types of approaches to unit testing

The available unit testing methods include:
- **Manual**- You need to create an explanatory document describing each step in the process for those who use a manual approach.
- **Automated**- Automated unit tests are still the most popular approach. When using an automated method, you create test cases inside a testing framework.

All failed tests will be noted and reported, as well as the description of all successful tests.

### Techniques for Testing Units

Black box testing involves testing the user interface and input and output, while White box testing focuses on the functional behavior of the software application.

Test suites, methods, test cases, and risk assessments are all carried out using gray box testing. The user interface of a software program is tested via black box testing.

The following are the unit testing techniques:

- Statements included in the scope
- Coverage of the decision-making process
- Coverage of Different Branches
- Coverage of the Situation
- Coverage by a Finite State Machine

### Benefits of Unit testing

- **More rapid development:**
When developers write unit tests, they spend less time debugging and, as a result, have better confidence in making code changes. Developers will be more confident of adding new features to the product and subsequently refactor the code, which would not be possible without unit testing because confidence to act might be a problem if they are unfamiliar with what might break.

- **Improved Design:**
When developers build unit tests, they focus on how the System will utilize their code throughout, leading to better design.

- **A More Effective Feedback Mechanism:**
Once all of the unit tests have been completed, the state of the System may be assessed. These tests allow developers to assess other aspects of the code, such as whether it is complete or still being worked on. While changes in the test environment may influence the code base, the feedback mechanism can help signal how the test environment is doing.

- **Tool for Pre-Regression:**
Once developers have run all of the unit tests, they will be able to do any substantial refactoring or reorganization of code with good simplicity. Developers may be confident that their modifications will not impact other modules or the rest of the System in this way.

- **Cost-cutting:**
If a bug is detected late in the development process, it can be exceedingly costly to fix. A well-designed set of unit tests can detect fundamental defects (which could have a significant influence on the System later) early in the development process, lowering the cost of future maintenance.

### Creating a project

1. When creating a new project, we will use Visual Studio and create a new project from the start menu.
2. Once we've done that, we'll need to locate our.NET Core's C# console app project template and click the icon that appears there.
3. Decide on a name for your endeavor and then get to operate. Either the.NET Core 3.1 or.NET 5 target framework will have to be selected.

   As you work on the School project, the Program.cs file will be open in the code editor.

   > If you are unable to access the Program.cs file directly, you may do so by double-clicking it in Solution Explorer.

4. To use the 'CollegeFinance' class, add the following C# code to Program.cs:

```C#
using System;
namespace CollegeFinanceNS
{   
  public class CollegeFinance
  {
    private readonly string n_studentName;
    private double n_admNo;
    private CollegeFinance() { }
    public CollegeFinance(string studentIdentity, double admNo)
    {
      n_studentIdentity = studentIdentity;
      n_admNo = admNo;
    }
    public string StudentIdentity
    {
      get { return n_studentIdentity; }
    }
    public double admNo
    {
      get { return n_admNo; }
    }
    public void Fees (double total)
    {
      if (total > n_admNo)
      {
        throw new ArgumentOutOfRangeException("total");
      }
      if (total < 0.0)
      {
        throw new ArgumentOutOfRangeException("total");
      }
      n_admNo += total; // purposefully wrong code
    }
    public void Fees (double total)
    {
      if (total < 0.0)
      {
        throw new ArgumentOutOfRangeException("fees";
      }
      n_admNo += total;
    }
    public static void Main()
    {
      CollegeFinance ba = new CollegeFinance("Anthony Lincons", 3235);
      ba.Balance(754.50);
      ba.Fees(2345.00);
      Console.WriteLine("Current Balance is ${0}", ba.Balance;
    }
  }
}
```

5. Right-click on the file in Solution Explorer and select Build Solution from the Build menu (or Ctrl + SHIFT + B) to rename it to 'CollegeFinance.cs.
We have a project that we can now be put to the test.

### How to create a unit-testing project

1. Add a new project simply from File Menu.
2. You have to choose the language of choice, which in our case is C#, then proceed after you have selected the unit test project for the .NET Core template.
3. Rename such as CollegeTests, then proceed by clicking next.
4. Create a new CollegeTests project with the desired architecture (.NET Core 3.1 or.NET 5) selected. We've integrated CollegeTests into the School solution.
5. Make sure the CollegeTests project contains a mention of the College project. In Solution Explorer, go to CollegeTests and add a dependency by clicking Dependencies under CollegeTests.
6. When you open the Reference Manager dialog box, expand Projects, select Solution, and select College from the Reference Manager drop-down menu. Click OK to continue.

### Make a test class

In this phase, we'll rename the file as CollegeFinanceTests.cs which is more informative rather than reusing the template as per the project for testing the CollegeFinance class.

Add the following code to the CollegeFinanceTests.cs file:

```C#
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace collegeTests
{
  [TestsClass]
  public class CollegeFinanceTests
  {
    [TestMethod]
    public void TestsMethod01()
    {
    }
  }
}
```

**Make sure to include a using clause.**

If you wish to call into the test project without properly qualified identifiers, add a using line to the test class. Add the following to the class file's header:

```C#
using CollegeFinanceNS;
```

### Prerequisites for the test class

A test class must meet the following requirements:

- The `[TestClass]` property is required for any class that has unit testing methods and wants to execute in Test Explorer.

- Every test method you want Test Explorer to detect must have the `[TestMethod]` property.

Classes without the `[TestClass]` property can be included in your unit test project, as functions in test classes without the `[TestMethod]` attribute. These new classes and methods can be called from your test code using your test methods.

In the following approach, we will create unit testing methods to verify the `Fees` method of the `CollegeFinance` class's behavior.

### Developing a test method

As a first step, we'll ensure that a valid payment has been made to the account. Class `CollegeFinanceTests` should have method:

```C#
[TestMethod]
public void Fees_WithValidTotal_UpdatesAdmNo()
{ 
  double beginningAdmNo = 277389;
  double FeesTotal = 3257;
  double expected = 1245;
  CollegeFinance finance = new CollegeFinance("Antony Lincons", beginningAdmNo);
  finance.Fees(feesTotal);
  double actual = finance.AdmNo;
  Assert.AreEqual(expected, actual, 2334, "Fees not summed correctly");
}
```

After passing the initial round of tests, it's safe to assume the device is up and running correctly. To put it another way, it creates an entirely new `CollegeFinance` object, starting with the account number, and pays a fair amount to that account number. The final `AdmNo` is as expected when using the `Assert.AreEqual` technique.

#### Specifications for the test technique

A test method must satisfy the following conditions:

- It has the [TestMethod] attribute on it.
- It gives a void result.
- It isn't allowed to have parameters.

### Create the test and execute it

1. Choose Build Solution from the Build drop-down menu.
2. If Test Explorer isn't already open, go to test > Windows, then select Test Explorer from the main menu.
3. Run the test from the Run All section. While running the test, a progress bar appears and changes color. In the event that all tests are successful, then the bar is green; otherwise, it is red.
The test will fail if we assume our worst-case scenario.
4. To explore more about a technique, open Test Explorer and click on the technique's name.

#### Then re-test when you've fixed the code
An explanation for the failure is included in the test findings. It's easy to see what was expected and what was really obtained by using the `AreEqual` method's message. The balance grew rather than decreased as a result of the sum paid.

During the unit test, an issue was discovered: instead of being deducted, the sum paid is added to the account admNo.

#### Correct the problem.
Replace the line in the `CollegeFinance.cs` file to fix the problem:

```C#
m_admNo += total;
```

With:

```C#
m_admNo -= total;
```

### Conclusion

As evident in this tutorial, Unit testing is the first level of testing in an ASP.Net project. Unit testing is a test of an component's functioning. The purpose of the testing is to guarantee that the application performs as planned. Opening Visual Studio and creating a test project is the first step. The test project will have all of the code required to test the application.
