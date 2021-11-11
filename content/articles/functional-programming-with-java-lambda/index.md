---
layout: engineering-education
status: publish
published: true
url: /functional-programming-with-java-lambda/
title: Functional Programming with Java Lambda
description: In this article we will look at the concept of functional programming in Java. We will also explain how a function can be used as a value.
author: popoola-tunde
date: 2021-11-11T00:00:00-12:03
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/functional-programming-with-java-lambda/hero.jpg
    alt: Functional Programming with Java Lambda Hero Image
---
Java is an object-oriented programming language. It promotes the encapsulation of all variables and methods of the class. That is, code blocks before Java version 8 are written by binding classes with variables, methods, and objects.
<!--more-->
The process of passing a behavior to methods takes extra work and load. This is because we are passing a class with another attribute. In Java 8, Lambda was introduced to represent the functional interface of Java. This means that the Lambda expression is the expression of a functional interface.

The introduction of functional programming was to implement behavior code. This code makes it easier to create a function that performs a specific task. Also, this code does not belong to any class thus it is treated as a value.

In this article, the reader will understand Java's functional programming and learn how to assign lambdas to an interface. We will work with lambda expressions using a different number of parameters.

The reader will be able to convert the object or a class's method to lambdas function with less code. The reader will also understand the importance of using functional programming.

### Prerequisites
To follow along with this tutorial, the reader should have:
- A basic knowledge of Java.
- [Java](https://www.oracle.com/java/technologies/downloads/) installed.
- Any Java IDE of their choice.
- An understanding of class's and static methods.

### Passing a function as a value
Let us assign a value to our variable:

```java

 String name = “foo”;

 Double pi = 3.145;

```

The variable `name` takes a single string value of `foo` and a variable `pi` takes a single double value of `3.14`. The question is, can a block of code be assigned as a value to a variable name without creating an instance of the class?

This is not possible in Java, as only an instance of an object can be assigned to a variable. Let us imagine a block code is assigned to a variable.

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

From our code above, we can see that the access modifier and return type are removed. This is because they are not required in the expression.

The lambda expression has a very simple, unique, and flexible syntax. This syntax also follows the normal syntax of the assignment of a value to a variable in Java. That is, assigning a variable with a data type and the expression as a value.

Java is a strongly typed programming language because every variable must be declared with a data type. The method of assigning a variable name to a lambda expression must also have a data type of the class's interface.

```java

 myfunction ablockOfCode

```

The syntax of the value which is the expression consists of three parts which are:
1. Expression body - This can either be a single expression or a block of code. If the body of the function contains a single expression, the braces are not required which means it is optional.
2. Parameter - These are functional methods that match with the signature of a function declared in the interface. Defining the information kind of parameter is discretionary but the number of parameters must coordinate with the signature declared in the interface.
3. The Lambda operator `->` - This separates the input parameters on the left side from the lambda body on the right side.

```java

() -> System.out.print(“Hello world”)

```

To use Lambda expressions, you can create your functional interface or use Java's already defined interface. The interface used must match the signature of the function you want to use. An interface with a single abstract method is called a `@FunctionalInterface`.

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

The first line of the code above is an interface with the name `Hello`. The interface declares an abstract method called `sayHello`. The method takes one parameter called `greet` which is of the data type `string` and thus its return type will be a string.

The fourth line creates a new class called `LambdaAlgorithmTest` which contains the main method. The method declares a function called `hello` with the type `Hello` interface. 

We also have another method that takes one parameter called `message` with two variables `str1` and `str2` which are both of the type `string`. The first variable `str1` takes a value `Welcome`, the second variable `str2` concatenates `str1`, and the parameter `message`. The function returns the variable `str2`.

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

The first line of the above code, `@FunctionalInterface` is an annotation that ensures the functional interface does not have more than one abstract method. The second line declares an interface with the name `MyFunctionalInterface`. 

The interface declares a method called `sayHello`, which takes no parameters. The method will return the typed string.

The third line creates a new class called `Example` which contains the main method. The method declares a function `msg` with type `MyFunctionalInterface` interface. The result of the function will print `Hello`.

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
 MyFunctionalInterface foo = (num) -> num+5;
 System.out.println(f.incrementByFive(22));

 }
}

```

The first line of the above code, `@FunctionalInterface` is a Java annotation that ensures the functional interface does not have more than one abstract method. The second line is an interface with the name `MyFunctionalInterface`. The interface declares an abstract method called `increaseByFive`, which takes one parameter. The method will return the type int.

The third line creates a new class called `LambdaSingleParam`. The class contains the main method. The main method declares a function `foo` with the type `MyFunctionalInterface` interface. The result of the function will print `27`.

#### Lambda example with many parameters

```java

interface StringConcat {
 String strConcat(String a, String b);
}
public class LambdaMultipleParameter {
 public static void main(String args[]) {
 // lambda expression with many arguments
 StringConcat str = (str1, str2) -> str1 + str2;
 System.out.println("Result: "+ str.strConcat("Hello ", "World"));

 }

}

```

The first line of the above code, `interface StringConcat` declares a new interface `StringConcat`. The interface declares an abstract method called `strConcat`. The method takes two-parameter. The method will return the typed string.

The third line creates a new class called `LambdaMultipleParameter`. The class contains the main method which serves as the entry point of the code. The method declares function `str` with type `StringConcat`interface.

The last line of code print concatenation of string `Result` with the result of the method call `str.strConcat("Hello ", "World")`. The result of the function will print `Result: Hello World`.

### Lambda stream pipeline
Streams are objects of classes that implement the interface `stream`. The stream is either from one of the specific stream interfaces for preparing collections of primitive data values. Stream enables you to act on the collection of elements with lambda.

Lambda Stream pipeline is a sequence of processing steps from the data source (from collections). The pipeline performs two main operations which is an intermediate or terminal operation. The operations form a chain method.

#### Intermediate and terminal operation
An intermediate operation is an activity that plays out a particular task on a stream element and the result of the task forms a new stream. Intermediate operations are also called `Lazy` operations which implies that the operation is not performed until a terminal operation is called.

| Operation | Description                                                                             |
| --------- | --------------------------------------------------------------------------------------- |
| filter    | The filter method allows us to get elements of the stream that meet certain conditions. |
| distinct  | The distinct method returns distinct elements of the stream.                            |
| limit     | The limit method returns elements of the stream with the given number or limit.         |
| map       | The map method allows us to map elements of one stream to elements of another stream.    |
| sorted    | Returns elements of the stream in a given order.                                        |

#### The intermediate operation
A terminal operation starts the processing of intermediate operations performed on a stream and produces a result. Terminal operations are known as `eager` operations. Eager operations are operations that carry out the requested tasks whenever called.

| Operation | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| forEach   | Loops through the stream to operate on each element.                        |
| count     | Returns the total number of elements that operations are performed on.      |
| average   | Returns the average of element numerical elements of the stream.            |
| min       | Returns the smallest element of numbers in the stream.                      |
| max       | Returns the largest element of numbers in the stream.                       |
| forEach   | Loops through the stream to operate on each element.                        |
| collect   | Creates a new container for the operation on an immediate stream operation. |
| findAny   | Returns any elements of the stream based on the intermediate operation.     |
| findFirst | Returns the first element of the streams that match the predicate.          |
| anyMatch  | Checks if any stream matches the predicate.                                 |
| reduce    | Returns a single value of all the elements in the stream using an accumulator. |
| allMatch  | Checks if all the elements match a specified predicate.                     |

#### Example of stream operation

```java

public static void main(String[] args) {
        List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");
        myList.stream()
                .filter(s -> s.startsWith("c"))
                .map(String::toUpperCase)
                .sorted()
                .forEach(System.out::println);
    }

```

The first line of the code above declares the main method. The main method serves as the entry point of the code to the Java interpreter. The second line of the code declares an ArrayList `myList` that takes an array value. 
- `Arrays.asList()` converts the array to a list. 
- `myList.stream()` converts the list to a stream. 
- `filter(s -> s.startsWith("c"))` filters the element of the list that start with `c`. 
- `map(String::toUpperCase)` converts the elements that meet the filter condition to capital letters. 
- The `sorted()` method returns sorted elements in ascending order by default.
- The `forEach(System.out::println)` loops through all the elements in the stream and prints the elements that meet all requirements specified in the pipeline.

### The benefits of lambda in Java
- Lambda expressions improve code readability and do not require interpretation.
- Lambdas allow you to write concise code.
- It encourages the use of functional programming.
- It simplifies variable scope and encourages code reusability.
- Lambdas allow you to use parallel processing.

### Conclusion
In this article, we looked at the concept of functional programming in Java. We explained how a function can be used as a value. We also looked at how to create a functional program and how to work with different parameters in lambda. 

Lastly, we explained the concept of a stream pipeline by giving insight into the intermediate and terminal operations. The article also touches on the benefit of lambda functional programming.

> The stream pipeline concept explained in this article is an introduction. To learn more about stream, check out [Java version 16 documentation on stream](http://https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/stream/package-summary.html).

### References
- [Java version 16 documentation on stream](http://https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/stream/package-summary.html)
- [JRebel](https://www.jrebel.com/blog/pros-and-cons-of-lambdas-in-java-8)
- [Theserveside blog](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Benefits-of-lambda-expressions-in-Java-makes-the-move-to-a-newer-JDK-worthwhile)
- [Stackity stream guide](https://stackify.com/streams-guide-java-8/)
- [Winterbe](https://winterbe.com/posts/2014/07/31/java8-stream-tutorial-examples/)
- [Java 16 documentation on function API](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/function/package-summary.html)
- Java - How to Program 10th Ed - Early Objects Version by Pual Deitel and Harvey Deitel
- Introduction to Java Programming, Comprehensive Version by Y. Daniel Liang of Armstrong Atlantic State University

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)