---
layout: engineering-education
status: publish
published: true 
url: /exception-handling-in-java/
title: Exception Handling in Java
description: This article will go through the fundamentals of exception handling in Java. Exception handling is the mechanism used to deal with run-time errors.
author: dawe-daniel
date: 2021-08-11T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/exception-handling-in-java/hero.jpg
    alt: Exception Handling in Java Hero Image 
---
### Introduction 
Errors can occur at any time in our programs. However, what matters is how we catch and rectify them to maintain the normal flow of our application. 
<!--more-->
In this article, we will use Java because it is a widely used object-oriented programming language. Java has a robust error and exception handling system.

**Exception handling** in Java is among the most effective methods for resolving run-time errors. Some of these errors are `ClassNotFoundException`, `IOException`, `SQLException`, and `RemoteException`, among others.

Effective exception handling makes your program more robust and easier to debug. 

This article will go through the fundamentals of exception handling in Java.

### Prerequisites
To follow through this article, the reader should:
- Have [IntelliJ](https://www.jetbrains.com/idea/) IDE installed.
- Have basic knowledge of using Java programming language for development.

### What is Exception handling?
An exception is an [issue that occurs during the execution of a program](https://dotnettutorials.net/lesson/basic-exception-handling-interview-questions-csharp).

`Exception handling` is the mechanism [used to deal with Java run-time errors](https://www.coursehero.com/file/80142600/UNIT-5pdf).

An exception occurs for several reasons such as if a user [has invalid data or a file that needs to be accessed cannot be found](http://what-when-how.com/Tutorial/topic-1244cri0/Java-in-60-Minutes-a-Day-360.html).

In such instances, a system failure may occur; thus handling it is vital.

#### Comparison between errors and exceptions
- Errors are impossible to recover, whereas exceptions are recoverable.
- Exceptions will be either checked or unchecked, whereas errors are always unchecked.
- Errors occur at run-time whereas exceptions can occur during the compilation or the execution process.
- Exceptions are triggered by the program, whereas errors result from the environment in which it executes.

### Exception hierarchy 
All exception and error types are [subclasses of the class throwable which is the base class of the hierarchy](https://rkhindi.blogspot.com/2018/09/exceptions-in-java.html).

One branch is headed by exception, a class used for exceptional situations that the user program can handle. For example, `NullPointerException` and `RuntimeException`.

The Java run-time system uses other branch errors to identify [errors related to the run-time environment](http://web.archive.org/web/20210307154442/https://iq.opengenus.org/exceptions-java). Examples are virtual machine errors or stack overflow errors.

Now, how does an exception get handled by the Java virtual machine?

When a method throws an exception, the method creates an object called the exception object. This object provides to the run-time framework.

This exception object stores the attribute of the exception and the program's current location where the exception occurred. Also, it creates and delivers the exception object to the run-time system for exception handling.

Using `try-catch-finally` method handles these exceptions. 

This is how the JVM handles exceptions internally.

### Types of Exceptions 
There are two types of exceptions:
- Checked
- Unchecked

##### Checked exceptions
These are exceptions that happen at compile time and are checked by the compiler.

##### Unchecked exceptions
These are exceptions that occur during the execution process. They are built-in exceptions in Java.

### Exception handling keywords/methods
As we mentioned earlier, exceptions give ways to shift a program's control from one part to another. The three keywords that Java uses to handle exceptions are:
- `try` - It specifies where to enclose the code. It has to be accompanied by either `catch` or `finally`.
- `catch` - This handles the exception that occurs. It has to come after the `try` block.

Syntax:

```Java
try{
	// Code that could throw an exception}
catch(Exception x){
	// The rest of the code}
	}
```

- `finally` - This block is used to execute the necessary code of our program. It is executed whether or not the exception is thrown. 

Syntax:

```Java
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

Let us glance at some examples to understand the content better.

#### Example 1: Exception handling using the try-catch block

```Java
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

The program above generates an exception. We need to divide 8 by 0.

We placed the statement `8 / 0` in the `try` block for exception handling. Every other code inside the `try` block is skipped whenever an exception is thrown. Afterward, the `catch` block is executed.

If none of the statements in the `try` block throws an exception, the catch block is bypassed.

#### Example 2: Exception Handling using finally block

```Java
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

In the program above, we are dividing 8 by 0 inside the `try` block. The code throws an `ArithmeticException`. The catch block catches the exception and the finally block is then executed.

> Note: Using the finally block is an excellent habit to form. This is due to its capability of containing vital cleanup code.

#### Example 3: Exception Handling using throw keyword
When an exception is thrown, the program flow shifts from the `try` to the `catch` block.

```Java
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

#### Example 4: Exception Handling using throws keyword
The `throws` keyword can declare the various types of exceptions that may occur within a function. We use this in the declaration of the method.

```Java
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

When we run the program above, the file `test.txt` does not exist. As a result, a `FileNotFoundException` is thrown by the `FileInputStream` class, which extends the `IOException` class.

When using the `findFile()` method, an `IOException` can be thrown.

The `main()` method invokes this method, which handles any exceptions that are thrown.

When a method does not handle exceptions, the `throws` clause must define the types of exceptions that can occur.

### Conclusion
This article has gone through exception handling in Java along with a few examples.

Knowing how to handle exceptions is an essential skill that a developer should have.

Hope this article helps you get started with Java exception handling.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
