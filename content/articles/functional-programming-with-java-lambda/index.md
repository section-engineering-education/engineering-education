### Introduction to functional Programming

Java has been an Object-Oriented-programming language. It recommends encapsulation of all variables and methods of the class. That is, code blocks before Java 8 are done with classes and objects. The process of passing a behaviour to methods takes extra work and load. This is because we are passing a class with another attribute.

In java 8, Lambda was introduced to represent the Functional interface of java. This means that lambdas expression is the expression of functional interface. Lambda was introduced to implement behaviour code. This code makes it easier through the creation of a function that performs a specific task. Also, this code does not belong to any existing class thus treated as a value.

At the end of the article, the reader will be able to understand java functional programming. assigning lambdas to an interface. working with lambda expression with a different number of parameters. the reader will also be able to convert the object or class method to lambdas function with less code. The reader will also understand the importance of using function programming

### Prerequisites

The reader should have:

At least a basic knowledge of Java.

Have Java installed on your computer

Have any IDE of your choice.

Understanding class and static methods will also be of great help.

##Function as value

Let assign value to a variable:

```java

 String name = “foo”;

 Double pi = 3.145;

```

The variable name takes a single string value of “foo” and also variable "pi" take a single double value of 3.14. The question is, can a block of code be assigned as a value to a variable name without creating an instance of the class. This is not possible in Java as the only instance of an object can only be assigned to a variable. Let's imagine a block class method is assigned to a variable.

```java

myfunction ablockOfCode = public void perform(){

 System. out.print(“Hello world”);

}

```

But with Java functional programming assigning a block of code to a variable is possible. Let's consider the code above with lambdas expressions.

To represent the code above in lambdas expression, a lot of elements in the block of code can be removed.

```java

myfunction ablockOfCode = () -> System.out.print(“Hello world”);

```

From our code above, access modifier and return type are also not required in the expression.

The lambda express has a very simple, unique syntax and flexible way of representing the function and the syntax. which also follow the normal syntax of the assignment value to a variable in java. That is assigning a variable with data type and the expression as a value

Since java is a strong type of language, which explains that all variables must have a type. The method of assigning a variable name to lambda expression must also have a data type of class interface.

```java

 myfunction ablockOfCode

```

The syntax of the value which is the expression consists of three-part. A parenthesis set of parameters, an arrow, and then an expression body.

Expression body: This can either be a single expression or a block of code. if the body of the function contains a single expression the braces are not required. which means it is optional.

Parameter: These are functional methods and that match with the signature of a function declared in the interface. Defining the information kind of parameter is discretionary. But the number of parameters must coordinate with the signature declare in the interface

->: This addresses the lambda expression operator

```java

() -> System.out.print(“Hello world”)

```

To use Lambda expression, you either need to make your functional interface or use the already defined interface(given by Java). That matches the signature of the function you want to use. An interface with a single abstract method is called a functional interface

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

From the first line of the above code is an interface with the name Hello. Which declare a method called `sayHello`, the method takes one parameter of `greet`. Which is of type string and will return type string. The fourth line creates a new class called `LambdaAlgorithmTest` which contain the main method. The method declares a function `hello` with the type `Hello` interface. And the method function has one parameter of `(message)`with two-variable `str1` and `str2` which both are of type string. The first variable `str1` takes a value `Welcome`. And the second variable `str2` concatenate `str1` and `message` together. And the function return `str2`.

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

From the first line of the above code. `@FunctionalInterface` is an annotation ensuring functional interface does not have more than one abstract method. the second line is an interface with the name ` MyFunctionalInterface`,. which declare a method called called `sayHello`, the method takes no parameter. the method will return a type of string. the third line creates a new class called `Example` which contain the main method. The method declares a function `msg` with type `MyFunctionalInterface`interface. And the function result will print `Hello`.

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

### Lambda Stream Pipeline

Streams are objects of classes that implement interface Stream. the stream is either from or one of the specific streams interfaces for preparing collections of int, long or double values. Stream enables you to act on the collection of elements with lambda.

Lambda Stream pipeline is a sequence of processing steps from the data source(from collections). The pipeline performs two main operations which is an intermediate or terminal operation. Which formed a chain method calls.

#### Intermediate and Terminal Operation

An intermediate operation is an activity that plays out a particular task on a stream element and the result of the task form a new stream. Intermediate operations are also called Lazy operations. Which implies that the operation isn't performed until a terminal operation is called.

| Operation  |                           Description                           |
| ---------- | :-------------------------------------------------------------: |
| filter     | the filter method allows us to get elements of the stream that  |
|            |                     meet certain conditions                     |
| ---------- | :-------------------------------------------------------------: |
| distinct   |   the distinct method return distinct elements of the stream    |
| ---------- | :-------------------------------------------------------------: |
| limit      |  the limit method return elements of the stream with the given  |
|            |                         number or limit                         |
| ---------- | :-------------------------------------------------------------: |
| map        |  the filter method allow us to get elements of the stream that  |
|            |                     meet certain conditions                     |
| ---------- | :-------------------------------------------------------------: |
| sorted     |         return elements of the stream in a given order          |
| ---------- | :-------------------------------------------------------------: |

# # # # The intermediate operation

A Terminal Operation starts processing of intermediate operation perform on stream and produce the result. Terminal operations are known as eager operations because they carry out the requested task when they are called.

| Operation  |                           Description                           |
| ---------- | :-------------------------------------------------------------: |
| forEach    |       Loop through the stream to operate on each element        |
| ---------- | :-------------------------------------------------------------: |
| count      |     return the total number of elements that operation are      |
|            |                          performed on                           |
| ---------- | :-------------------------------------------------------------: |
| avarage    | return the average of element numerical elements of the stream  |
|            |                                                                 |
| ---------- | :-------------------------------------------------------------: |
| min        |       return the minimum element of number in the streams       |
| ---------- | :-------------------------------------------------------------: |
| max        |         return the maximum element of number in streams         |
| ---------- | :-------------------------------------------------------------: |
| forEach    |       Loop through the stream to operate on each element        |
| ---------- | :-------------------------------------------------------------: |
| collect    |  create a new container for the operation on immediate stream   |
|            |                            operation                            |
| ---------- | :-------------------------------------------------------------: |
| findAny    |   return any elements of the stream base on the intermediate    |
|            |                            operation                            |
| ---------- | :-------------------------------------------------------------: |
| findFirst  |     return the first element of the streams that match the      |
|            |                            predicate                            |
| ---------- | :-------------------------------------------------------------: |
| anyMatch   |            check if any stream matches the predicate            |
| ---------- | :-------------------------------------------------------------: |
| reduce     |     return a single value of all the elements in the stream     |
|            |                        using accumulator                        |
| ---------- | :-------------------------------------------------------------: |
| allMatch   |      check if all the elements match a specified predicate      |
|            |                                                                 |
| ---------- | :-------------------------------------------------------------: |

#### Example of Stream operation

```java

List String myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");

myList

 .stream()

 .filter(s - s.startsWith("c"))

 .map(String::toUpperCase)

 .sorted()

 .forEach(System.out::println);

```

# # # The benefit of lambda in java

1. The interface used is directly identified by looking at each function

2. Lambda expressions are readable without interpretation

3. Lambda allow you to write concise code

4. Lambda Encouragement of functional programming

5. It simplified variable scope

6. It encourages code reusability

7. Lambda make Parallel processing possible

### Conclusion

In this article, we explain the concept of Functional programming in java. we also explain how use function can be used as a value. we able to explain how to create a functional program. And how to work with different parameters in lambda. Explaining the concept of a stream pipeline by given insight on the intermediate and terminal operation. the article also touches on the pros and cons of lambda functional programing.

Note: the stream pipeline explain in this article is the introduction part of it, to learn more above stream

### Refrence

[java version 16 documentation on stream](http://https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/stream/package-summary.html)

[JRebel](https://www.jrebel.com/blog/pros-and-cons-of-lambdas-in-java-8)

[theserveside blog](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Benefits-of-lambda-expressions-in-Java-makes-the-move-to-a-newer-JDK-worthwhile)

[stackity stream guide](https://stackify.com/streams-guide-java-8/)

[Winterbe](https://winterbe.com/posts/2014/07/31/java8-stream-tutorial-examples/)

[java i6 documentation on function api](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/function/package-summary.html)

Java - How to Program 10th Ed - Early Objects Version by Pual Deitel and Harvey Deitel

Introduction to Java Programming, Comprehensive Version by Y. Daniel Liang of Armstrong Atlantic State University
