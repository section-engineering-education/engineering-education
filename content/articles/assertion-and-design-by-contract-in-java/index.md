---
layout: engineering-education
status: publish
published: true
url: /assertion-and-design-by-contract-in-java/
title: Assertion and Design by Contract in Java
description: In this article, we will look at assertions which are the assumptions you make as a programer. This assumption should be correct to avoid errors in the functionality of the program. 
author: paul-mwangi
date: 2021-08-14T00:00:00-06:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/assertion-and-design-by-contract-in-java/hero.jpg
    alt: Assertion and design by contract in Java
---
The technique of design by contract specifies the interaction between various components of an application. This concept was first discovered and introduced in the Eiffel programming language. 
 <!--more-->
For interaction between various components to be achieved, a contract based on the components of the application to communicate with each other is defined by the concept. 

Assertions are used in the Design by contract technique to check if the requirements specified in the defined contract are met by the application. They are used to test the assumptions made by the programmer.

### Prerequisites
Before going through this tutorial, you need to have basic knowledge of Java. You also need to be able to work with IDEs such as [Netbeans](https://netbeans.apache.org/download/index.html) and [IntelliJ](https://www.jetbrains.com/idea/download/download-thanks.html). 

### Design by contract
This technique allows a programmer to provide a detailed specification to create software based on the user requirements. Based on the given specifications a programmer will develop the software. 

The Design by Contract technique has three various types of assertions used in checking the software compliance based on the specification given.

The types of assertions are:
1. **Precondition:** The specified conditions must be satisfied by the application before calling an external component.
2. **Postcondition:** The specified condition must be satisfied by the application after an external condition has been executed.
3. **Invariant:** The specified condition must be satisfied by the application.

To understand the techniques of assertions we will consider the operations of a stack. 

A stack should not be empty when extracting an element from the stack. This condition is thus checked before extracting an element from the stack. This condition is called a precondition.

Pushing an element into the stack, we need to check whether the element is correctly added to the specified index. This condition is referred to as postcondition. 

An invariant condition is when a stack's number of elements should not exceed its carrying capacity or be equals to empty zero.

### Implementing Assertion
An `assertion` is a statement with a boolean expression assumed by the programmer to be true. Thus, the  execution of the program continues if the expression is false. Assumptions are made that the program is correct and free from errors.

An `AssertionError` exception is thrown once the expression is false and contains details of the bug. That is the line number and file in which the errors are in the program. 

To implement assertions in Java we use the assert statement. The assert statement can be implemented in two ways.

```Java
assert Expression 1;
```
The expression is a boolean, if the boolean report is false, the assertion error is thrown without information about bugs that happened in the program.

```Java
assert Expression 1; Expression 2;
```

The first expression is boolean and the second is the value passed to the Exception of the `AssertError`. We can use the assert statement as:

```Java
public void division()
{
    double a = b / c;  ///c should not be equal to zero
}
``` 

The above comment can be replaced using the assert statement:

```Java
public void division()
{
    assert c != 0  /// this assert statement states that c should not be equal to zero
    double a = b / c
}
```

If the expression of the assert statement is false, an error is thrown specifying that the program has errors. This is referred to as `assertion failure`.

### Enabling and disabling assertions
Java provides command line parameters that allow us to enable and disable assertions. Assertions enabling is done using the following parameters:

```Java
-ea
or 
-enableassertions
``` 

Enabling assertions from a file `Myfile.java`, we use the command:

```Java
java -enableassertions Myfile.java
```
or

```Java
java -ea Myfile.java
```
Disabling assertions, we use the command-line parameter:

```Java
-da
or
disableassertions
```
Disabling assertions from a file `Myfile.java`, we use the command:

```Java
java -disableassertions Myfile.java
```

or

```Java
java -da Myfile.java
```

### Command lines to enable assertions
1. `Java -ea`- This command-line is enabled in all classes except the system classes.
2. `Java -ea Main`- This command-line enables assertions for all the main classes.
3. `Java -eaTestClass Main`- This command-line enables the only assertion in one class -`TestClass` in the main program.
4. `Java -ea...Main`- This command is used to enable assertions for the working class in the main directory

### Assertion Rules
Since assertions are used to check on the validation of assumptions made by the programmer at the time of execution, some rules govern their use:
1. Checking the method arguments passed.
2. Using the assertion in the default case of the switch statement.
3. Making use of an assertion descriptive.
4. Avoid processing in an assertion condition.
5. Avoid catching an assertion-related exception.
6. Avoid the use of more than one condition in an assertion

### Creating a Java program
This program helps the learner to implement assertion by dividing two numbers.

```Java 
public class division
{
    void assertcheck(int b,int c)
    {
        assert c != 0: "The value c cannnot be zero"; /// ensures that thevalue of c should not be zero
        double a = b / c;
        System.out.println("the result is:" + a);
    }
    public static void main(String args[])
    {
        division div = new division();
        div.assertcheck(5, 0);
    }
}
```

The program above performs a division test of two variables, ensuring the denominator is not equal to zero, using the assert statement.

Since the value of `c` is equal to zero an `Assertionerror` is thrown.

### Differences between assertions and exceptions
1. Assertions are intended to detect the programming errors that occur while an exception is used to indicate other kinds of errors such as missing files and invalid user inputs.
2. Assertion tests the condition assumed by the programmer ensuring the program runs correctly while assertion will test the abnormal condition and does not ensure the efficient running of the program.
3. Assertion is used to check on something that shouldn't happen while an exception is supposed to check on something that can or may happen.

### Conclusion 
In this article, we have looked at assertions which are the assumptions you make as a programmer. 

These assumptions should be correct to avoid errors in the functionality of the program. You need to understand as a programmer how to apply and use assertions to ensure the correct flow of your programs.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
