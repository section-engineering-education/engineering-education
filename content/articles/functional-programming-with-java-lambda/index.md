---
layout: engineering-education
status: publish
published: true
url: /functional-programming-with-java-lambda/
title: Functional Programming with Java Lambda
description: In this article, we will look at the concept of Functional programming in Java. we will also explain how a function can be used as a value.
author: popoola-tunde
date: 2021-10-12T00:00:00-10:03
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/functional-programming-with-java-lambda/hero.jpg
    alt: Functional Programming with Java Lambda Hero Image
---
Java is an object-oriented programming language. It provides for the encapsulation of all variables and methods of the class. 
<!--more-->
That is, code blocks before Java version 8 are done with classes and objects. The process of passing a behavior to methods takes extra work and load. This is because we are passing a class with another attribute.

In Java 8, Lambda was introduced to represent the functional interface of Java. This means that the Lambda expression is the expression of a functional interface. 

Lambda was introduced to implement behavior code. This code makes it easier through the creation of a function that performs a specific task. Also, this code does not belong to any existing class thus treated as a value.

In this article, the reader will be able to understand Java's functional programming and learn how to assign lambdas to an interface. We will work with lambda expressions using a different number of parameters. 

The reader will be able to convert the object or a class's method to lambdas function with less code. The reader will also understand the importance of using functional programming.

### Prerequisites
To follow along with this tutorial, the reader should have:
- A basic knowledge of Java.
- [Java](https://www.oracle.com/java/technologies/downloads/)  installed.
- Any Java IDE of their choice.
- An understanding of class's and static methods.

### Function as value
Let us assign a value to a variable:

```java

 String name = “foo”;

 Double pi = 3.145;

```

The variable "name" takes a single string value of “foo” and a variable "pi" takes a single double value of 3.14. The question is, can a block of code be assigned as a value to a variable name without creating an instance of the class? 

This is not possible in Java as the only instance of an object can only be assigned to a variable. Let us imagine a block class method is assigned to a variable.

```java

myfunction ablockOfCode = public void perform(){

 System. out.print(“Hello world”);

}

```

With Java functional programming, assigning a block of code to a variable is possible. Let us consider the code above with lambdas expressions.

To represent the code above in lambdas expression, a lot of elements in the block of code can be removed.

```java

myfunction ablockOfCode = () -> System.out.print(“Hello world”);

```

From our code above, we can also see that access modifiers and return types are also not required in the expression.

The lambda expression has a very simple, unique syntax and flexible way of representing the function and the syntax. This also follows the normal syntax of the assignment of a value to a variable in java. That is, assigning a variable with a data type and the expression as a value.

Java is a strongly typed programming language because every variable must be declared with a data type. The method of assigning a variable name to a lambda expression must also have a data type of the class's interface.

```java

 myfunction ablockOfCode

```

The syntax of the value which is the expression consists of three-parts which are:

1. Expression body - This can either be a single expression or a block of code. If the body of the function contains a single expression, the braces are not required which means it is optional.

2. Parameter - These are functional methods that match with the signature of a function declared in the interface. Defining the information kind of parameter is discretionary but the number of parameters must coordinate with the signature declared in the interface.

The Lambda operator `->` - This separates the input parameters on the left side from the lambda body on the right side.

```java

() -> System.out.print(“Hello world”)

```

To use Lambda expressions, you either need to make your functional interface or use the already defined interface (provided the by Java language) that matches the signature of the function you want to use. An interface with a single abstract method is called a `functional interface`.

```java

interface Hello {

String sayHello(String greet);

}

public class LambdaAlgorithmTest {

 public static void main(String[] args) {

 Hello hello = (message) -> {

 String str1 = "Welcome ";

 String str2 = str1 + message;

 return str2;

 };

 System.out.println(hello.sayHello("Lambda Tutorial"));

 }

}

```

From the first line of the code above is an interface with the name `Hello` which declares a method called `sayHello`.  The method takes one parameter called `greet` which is of the data type `string` and thus return it's return type will be a string.

The fourth line creates a new class called `LambdaAlgorithmTest` which contains the main method. The method declares a function called `hello` with the type `Hello` interface. We also have another method which takes one parameter called `message` with two variables `str1` and `str2` which are both of the type `string`.

 The first variable `str1` takes a value `Welcome`, the second variable `str2` concatenates `str1` and the parameter `message`. The function returns the variable `str2`.


### Working with different Lambda parameter
#### Lambda example that takes no parameter

```java

@FunctionalInterface

interface MyFunctionalInterface {

 //A method with no parameter

 String sayHello();

}

public class Example {

 public static void main(String args[]) {

 // lambda expression

 MyFunctionalInterface msg = () -> "Hello";

 System.out.println(msg.sayHello());

 }

}

```

From the first line of the above code, `@FunctionalInterface` is an annotation that ensures the functional interface does not have more than one abstract method. The second line is an interface with the name `MyFunctionalInterface`, which declares a method called `sayHello`, that takes no parameters. The method will return the type string.

The third line creates a new class called `Example` which contains the main method. The method declares a function `msg` with type `MyFunctionalInterface`interface and the function result will print `Hello`.

#### Lambda example with a single parameter

```java

@FunctionalInterface

interface MyFunctionalInterface {

 //A method with a single parameter

 int incrementByFive(int a);

}

public class LambdaSingleParam {

 public static void main(String args[]) {

 // lambda expression with single parameter num

 MyFunctionalInterface f = (num) -> num+5;

 System.out.println(f.incrementByFive(22));

 }

}

```

#### Lambda example with many parameters

```java

interface StringConcat {

 String strConcat(String a, String b);

}

public class LambdaMultipleParameter {

 public static void main(String args[]) {

 // lambda expression with many arguments

 StringConcat s = (str1, str2) -> str1 + str2;

 System.out.println("Result: "+ s.sconcat("Hello ", "World"));

 }

}

```

### Lambda stream pipeline
Streams are objects of classes that implement the interface `stream`. The stream is either from one of the specific stream interfaces for preparing collections of `int`, `long` or `double` values. Stream enables you to act on the collection of elements with lambda.

Lambda Stream pipeline is a sequence of processing steps from the data source (from collections). The pipeline performs two main operations which is an intermediate or terminal operation. Which formed a chain method calls.

#### Intermediate and terminal Operation
An intermediate operation is an activity that plays out a particular task on a stream element and the result of the task forms a new stream. Intermediate operations are also called `Lazy` operations which implies that the operation isn't performed until a terminal operation is called.

| Operation  |                           Description                           |
| ---------- | :-------------------------------------------------------------: |
| filter     | The filter method allows us to get elements of the stream that  |
|            |                     meet certain conditions.                     |
| ---------- | :-------------------------------------------------------------: |
| distinct   |   The distinct method returns distinct elements of the stream.    |
| ---------- | :-------------------------------------------------------------: |
| The limit method returns elements of the stream with the given  |
|                                number or limit.                                            |
| ---------- | :-------------------------------------------------------------: |
| map        |  The filter method allows us to get elements of the stream that  |
|            |                     meet certain conditions.                     |
| ---------- | :-------------------------------------------------------------: |
| sorted     |         Returns elements of the stream in a given order.          |
| ---------- | :-------------------------------------------------------------: |

#### The intermediate operation
A terminal operation starts processing of intermediate operations performed on a stream and produces a result. Terminal operations are known as `eager` operations because they carry out the requested tasks whenever they are called.

| Operation  |                           Description                           |
| ---------- | :-------------------------------------------------------------: |
| forEach    |       Loops through the stream to operate on each element.        |
| ---------- | :-------------------------------------------------------------: |
| count      |     Returns the total number of elements that operations are      |
|            |                          performed on.                           |
| ---------- | :-------------------------------------------------------------: |
| average    | Returns the average of element numerical elements of the stream.  |
|            |                                                                 |
| ---------- | :-------------------------------------------------------------: |
| min        |       Returns the minimum element of numbers in the stream.      |
| ---------- | :-------------------------------------------------------------: |
| max        |         Returns the maximum element of number in the streams.    |
| ---------- | :-------------------------------------------------------------: |
| forEach    |       Loops through the stream to operate on each element.        |
| ---------- | :-------------------------------------------------------------: |
| collect    |  Creates a new container for the operation on an immediate stream   |
|            |                            operation.                            |
| ---------- | :-------------------------------------------------------------: |
| findAny    |   Returns any elements of the stream based on the intermediate    |
|            |                            operation.                            |
| ---------- | :-------------------------------------------------------------: |
| findFirst  |     Returns the first element of the streams that match the      |
|            |                            predicate.                            |
| ---------- | :-------------------------------------------------------------: |
| anyMatch   |            Checks if any stream matches the predicate.            |
| ---------- | :-------------------------------------------------------------: |
| reduce     |     Returns a single value of all the elements in the stream     |
|            |                        using accumulator.                        |
| ---------- | :-------------------------------------------------------------: |
| allMatch   |      Checks if all the elements match a specified predicate.      |
|            |                                                                 |
| ---------- | :-------------------------------------------------------------: |

#### Example of stream operation

```java

List String myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");

myList

 .stream()

 .filter(s - s.startsWith("c"))

 .map(String::toUpperCase)

 .sorted()

 .forEach(System.out::println);

```

### The benefits of lambda in Java
- The interface used is directly identified by looking at each function.
- Lambda expressions are readable without interpretation.
- Lambda allows you to write concise code.
- Lambda Encouragement of functional programming.
- It simplified variable scope.
- It encourages code reusability.
- Lambda makes parallel processing possible.

### Conclusion
In this article, we looked at the concept of functional programming in Java. We explained how a function can be used as a value. We also looked at how to create a functional program and how to work with different parameters in lambda. Lastly, we explained the concept of a stream pipeline by giving insight on the intermediate and terminal operations. The article also touches on the benefit of lambda functional programming.

> The stream pipeline explain in this article is the introduction part of it, to learn more above stream

### References
[Java version 16 documentation on stream](http://https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/stream/package-summary.html)

[JRebel](https://www.jrebel.com/blog/pros-and-cons-of-lambdas-in-java-8)

[Theserveside blog](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Benefits-of-lambda-expressions-in-Java-makes-the-move-to-a-newer-JDK-worthwhile)

[Stackity stream guide](https://stackify.com/streams-guide-java-8/)

[Winterbe](https://winterbe.com/posts/2014/07/31/java8-stream-tutorial-examples/)

[Java i6 documentation on function api](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/function/package-summary.html)

Java - How to Program 10th Ed - Early Objects Version by Pual Deitel and Harvey Deitel

Introduction to Java Programming, Comprehensive Version by Y. Daniel Liang of Armstrong Atlantic State University

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
