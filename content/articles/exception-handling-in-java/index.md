---
layout: engineering-education
status: publish
published: true 
url: /exception_handling_in_java/
title: Exception handling in Java
description: Errors can occur at any time in programs but what matters is how we handle them and rectify them to maintain the normal flow of our application. Java being the most major object-oriented programming language provides a powerful mechanism to handle these errors and exceptions. This article will go through the fundamentals and various methods of java exception handling.
author: dawe-daniel
date: 2021-07-23T00:00:00-03:13
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/exception-handling-in-java/hero.jpg
    alt: Exception Handling in Java Hero Image 
---

### Introduction 
Errors can occur at any time in programs but what matters is how we handle them and rectify them to maintain the normal flow of our application. Java being the most major object-oriented programming language provides a [powerful mechanism to handle these errors and exceptions](https://www.edureka.co/blog/java-exception-handling). 

**Exception handling** in Java is one of the most powerful tools for dealing with run-time errors like `ClassNotFoundException`, `IOException`, `SQLException`, and `RemoteException`, among others. Effective exception handling makes your program more robust and easier to debug. 

This article will go through the fundamentals and various methods of java exception handling.

### Prerequisites
To follow through this article, the reader should:
- Have [IntelliJ](https://www.jetbrains.com/idea/) integrated development environment (IDE).
- Have basic knowledge in using Java programming language for development.

### What is Exception handling?
An Exception is a [problem that occurs during the execution of a program](https://everythingwhat.com/what-are-the-two-exception-classes-in-hierarchy-of-java-exception-class). `

Exception handling` is the mechanism used to deal with Java run-time errors. An exception occurs for several reasons: if a user has entered [invalid data or a file which needs to be opened cannot be found](https://www.sololearn.com/Discuss/160333/what-is-exception). In such instances, this leads to a system failure; therefore, handling it is vital. 

### Comparison between errors and exceptions
- Errors are impossible when it comes to recovery, but exceptions are recoverable by handling them.
- Errors are of unchecked type, while exceptions can be either checked or unchecked type.
- Errors occur at run-time, while exceptions can occur during the compilation process or the execution process.
- Errors are caused by the environment in which the application runs, while exceptions are caused by the application.

### Exception hierarchy 
All exceptions and errors types are [subclasses of the class throwable which is the base class of hierarchy](https://rkhindi.blogspot.com/2018/09/exceptions-in-java.html). Here One branch is headed by exception, which is a class that is used for exceptional situations that the user program can handle. For example, NullpointErexception and RuntimeException. Other branch errors are used by the Java runtime system to indicate the errors that has to do with the run-time environment (JRE) itself. Examples are virtual machine error or stack overflow error.

So how is exception handled by the Java virtual machine. If an exception occurs inside a method, the method generates an object called the exception object and passes it to the run-time framework. This exception object contains the [name and description of the exception and also the current of the program where exception has occurred](https://www.jillmarzion.com/2021/03/09/47ndyqpi). It also creates the exception object and sends it to the runtime system for handling (throwing an exception). Using try catch finally methods these exceptions can be handled. So this is how the JVM handles exceptions internally.

### Types of Exceptions 
There are of two types:
- Checked
- Unchecked

Checked exceptions
These are exceptions that happen at compile time and are checked by the compiler during this time.

Unchecked exceptions
These are exceptions that occur during execution. They are built-in exceptions in Java.

### Exception handling keywords/methods
As we have already said, exceptions give a way to shift the control of one program from a part to another. The three keywords upon which exception java handles exceptions are:

- `try` - It is used to specify where to enclose the code. It has to be accompanied by either catch or finally therefore we cannot use it on its own.

- `catch` - This used to handle the exception that occurs. It has to come before the `try` block therefore we cannot use it on its own. The syntax is shown below:

```java
try{
	// Code that may raise exception}
catch(Exception e){
	// Rest of the program}
	}
```

- `finally` - This block is used to execute the important code of our program. It is executed if either the exception is handled or not. The syntax is shown below:

```java
try{
	//program
}
catch(Exception e){
	// catch block code
}
finally{
	// finally block executes
}
```

- `throw` - It is used to throw an exception.

- `throws` - It is used to declare exceptions.

Let’s take a look the example below to understand the content better:

Example 1: Exception handling using try-catch block
```java
class Main {
public static void main(String[] args) {

try {

// code that generate exception
int divideByZero = 8 / 0;
System.out.println("Program in try block");
}
catch (ArithmeticException e) {
System.out.println("ArithmeticException => " + e.getMessage());
}
}
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Exception-handling-using-try-catch-block#Main.java).

Output:

```bash
ArithmeticException=> / by zero
```
In the program above, the code generates an exception. We want to divide the number 8 by 0. In order for it to handle the exception we have placed the code `5/0` inside the `try` block. When an exception occurs, every other program which is inside the `try` block is skipped. Afterwards the `catch` block catches the exception and the code inside it is executed.The `catch` block is skipped if any of the statements in the `try` block throw an `exception`.
Example 2 : Exception Handling using finally block
```java
class Main {
public static void main(String[] args) {
try {
// code that generates exception
int divideByZero = 8 / 0;
}

catch (ArithmeticException e) {
System.out.println("ArithmeticException = " + e.getMessage());
}
finally {
System.out.println("It is the finally block");
}
}
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Example-2-Java-Exception-Handling-using-finally-block#Main.java).

Output:

```bash
ArithmeticException= / by zero
It is the finally block
```

In the program above, we are dividing the number 8 by 0 inside the `try` block. The code generates an `ArithmeticException`. The catch block catches the exception. The finally block is then executed.

**Note:** Using the finally block is a good habit to form. It's because it's capable of containing vital cleanup codes. Such as, code that could be skipped by the return, continue, or split commands when closing a file or link
Example 3 : Exception Handling using throw keyword
When an exception is thrown, the program flow shifts from the try to the catch blocks.
```java
class Main {
public static void divideByZero() {

// throw an exception
throw new ArithmeticException("Dividing by 0");
}

public static void main(String[] args) {
divideByZero();
}
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Exception-handling-using-java-throw).

Output:

```bash
Exception in thread “main” java.lang.ArithmeticException: Trying to divide by 0
		at Main.divideByZero(Main.java:5)
		at Main.main(Main.java:9)
```

In the program above, we are throwing the `ArithmeticException` using the `throw` keyword. 

Example 3 : Exception Handling using throws keyword
The throws keyword is often used to announce the types of exceptions that might occur within the method. It's used in the declaration of the method.

```java
import java.io.*;

class Main {
// declaring the type of exception
public static void findFile() throws IOException {

// code that may generate IOException
File newFile = new File("test.txt");
FileInputStream stream = new FileInputStream(newFile);
}

public static void main(String[] args) {
try {
findFile();
}
catch (IOException e) {
System.out.println(e);
}
}
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/EXception-handling-using-throws-keyword#Main.java).

Output:

```bash
java.io.FileNotFoundException: test.txt (The system cannot find the file specified)
```

In the program above, when we run it, the file `test.txt` does not exist. As a result, a FileNotFoundException is thrown by FileInputStream, which extends the IOException class. When using the findFile() method, an IOException can be thrown. The main() method invokes this method, which handles any exceptions that are thrown. If a method does not manage exceptions, the throws clause must specify the types of exceptions that can occur.

### Conclusion
In this article we have gone through exception handling in java. What we have just discussed is the extent to which a programmer will need to know and what standard college classes teach when it comes to exception handling. I hope you find this article useful in your future programs.

Happy coding!
