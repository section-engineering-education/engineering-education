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
Errors can occur at any time in our programs. What matters is how we handle them and rectify them to maintain the normal flow of our application. Because Java is one of the most used object-oriented programming languages, it has a robust way of dealing with errors and exceptions.

**Exception handling** in Java is among the most effective methods for resolving run-time errors. These errors are like `ClassNotFoundException`, `IOException`, `SQLException`, and `RemoteException`, among others. Effective exception handling makes your program more robust and easier to debug. 

This article will go through the fundamentals and various methods of java exception handling.

### Prerequisites
To follow through this article, the reader should:
- Have [IntelliJ](https://www.jetbrains.com/idea/) integrated development environment (IDE).
- Have basic knowledge in using Java programming language for development.

### What is Exception handling?
An exception is an issue that arises while a program is being executed.

`Exception handling` is the mechanism used to deal with Java run-time errors. An exception occurs for several reasons: if a user has[entered invalid data or a file that needs to be opened cannot be found](http://what-when-how.com/Tutorial/topic-1244cri0/Java-in-60-Minutes-a-Day-360.html). In such instances, this leads to a system failure; thus, handling it is vital. 

### Comparison between errors and exceptions
- Errors are impossible when it comes to recovery, but exceptions are recoverable by handling them.
- Exceptions will be either checked or unchecked, whereas errors are unchecked.
- Errors occur at run-time, while exceptions can occur during the compilation process or the execution process.
- Exceptions are triggered by the program, while errors are created by the environment in which it executes.

### Exception hierarchy 
All exceptions and errors types are [subclasses of the class throwable, which is the base class of the hierarchy](https://rkhindi.blogspot.com/2018/09/exceptions-in-java.html).

Here, one branch is headed by exception, which is a class used for exceptional situations that the user program can handle. For example, `NullpointErexception` and `RuntimeException`. The Java run-time system uses [other branch errors to indicate the errors that have to do with the run-time environment itself](https://edureka1.rssing.com/chan-41921600/all_p26.html). Examples are virtual machine errors or stack overflow errors.

Now, how does an exception get handled by the Java virtual machine?

When a method throws an exception, the method creates an object called the exception object. This object provides to the run-time framework. The name and description of the exception, as well as the current of the program where the exception occurred, are all stored in this exception object. Also, it creates and delivers the exception object to the run-time system for exception handling (throwing an exception). Using `try-catch` finally methods these exceptions. 

This is how the JVM handles exceptions internally.

### Types of Exceptions 
There are two types:
- Checked
- Unchecked

##### Checked exceptions
These are exceptions that happen at compile time and are checked by the compiler.

##### Unchecked exceptions
These are exceptions that occur throughout the execution process. They are built-in exceptions in Java.

### Exception handling keywords/methods
As we have already said, exceptions give ways to shift one program's control from one part to another. The three keywords upon which exception java handles exceptions are:

- `try` - It specifies where to enclose the code. It has to be accompanied by either `catch` or `finally`. Thus, we cannot use it on its own.
- `catch` - This handles the exception that occurs. It has to come before the `try` block; thus, we cannot use it on its own. The syntax is shown below:

```java
try{
	// Code that could throw an exception}
catch(Exception x){
	// The rest of the code}
	}
```

- `finally` - This block is used to execute the necessary code of our program. It is executed if either the exception is handled or not. The syntax is shown below:

```java
try{
	//program
}
catch(Exception x){
	// catch block code
}
finally{
	// finally block executes
}
```

- `throw` - It throws an exception.
- `throws` - It declares exceptions.

Let us glance at an example to understand the content better:

#### Example 1: Exception handling using try-catch block

```java
class Main {
public static void main(String[] args) {

try {

// code that generates exception
int divideByZero = 8 / 0;
System.out.println("Program in the block try");
}
catch (ArithmeticException x) {
System.out.println("ArithmeticException => " + x.getMessage());
    }
  }
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Exception-handling-using-try-catch-block#Main.java).

Output:

```bash
ArithmeticException=> / by zero
```

In the program above, the code generates an exception. We want to divide the number 8 by 0. 

We've put the code 5/0 inside the `try` block for exception handling. Every other program inside the `try` block is skipped whenever an exception arises. Afterward, the `catch` block catches the exception, and the code inside it is executed. The `catch` block is skipped when any of the [statements throw an exception in the `try` block](https://slideplayer.com/slide/5000898). 

#### Example 2: Exception Handling using finally block
```java
class Main {
public static void main(String[] args) {
try {
// code that throws an exception
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

In the program above, we are dividing the number 8 by 0 inside the `try` block. The code throws an `ArithmeticException`. The catch block catches the exception. The finally block is then executed.

**Note:** Using the finally block is a good habit to form. It's because it's capable of containing vital cleanup codes. Such as, code that could be skipped by the return, continue, or split commands when closing a file or link

### Example 3: Exception Handling using throw keyword
When an exception is thrown, the program flow shifts from the `try` to the `catch` blocks.

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

Using the `throw` keyword, we can see how the program above throws the `ArithmeticException`.

### Example 4: Exception Handling using throws keyword
The `throws` keyword is used to declare the different types of exceptions that could arise within a function. It is used in the declaration of the method.

```java
import java.io.*;

class Main {
// specifying the exception's type
public static void findFile() throws IOException {

// code that throws IOException
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
java.io.FileNotFoundException: test.txt (The system is unable to locate the given file.)
```

In the program above, when we run it, the file `test.txt` does not exist. As a result, a FileNotFoundException is thrown by `FileInputStream`, which extends the `IOException` class. When using the `findFile()` method, an `IOException` can be thrown. The `main()` method invokes this method, which handles any exceptions that are thrown. If a method does not manage exceptions, the throws clause must specify the type of exceptions that can occur.

### Conclusion
This article has gone through exception handling in java along with a few examples. What we have just discussed is the extent to which a programmer will need to know and what standard college classes teach. Knowing how to handle exceptions is an important skill that a developer should have. I wish you find this article useful in your future programs.

Happy coding!
