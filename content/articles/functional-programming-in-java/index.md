---
layout: engineering-education
status: publish
published: true
url: /functional-programming-in-java/
title: Functional Programming in Java
description: This article will go over the basic idea behind functional programming, and some tools Java gives us to code in this style.
author: john-amiscaray
date: 2020-10-23T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/functional-programming-in-java/hero.jpg
    alt: Function programming in Java image

---
In this article, we will go over functional programming in Java. This article assumes that you have foundational knowledge up to Java 7. All the features addressed below were introduced from Java 8.
<!--more-->
### Introduction
#### What is Functional Programming
It's essential to have a solid understanding of functional programming and its advantages. Functional Programming is a programming paradigm centered on the structure and use of functions. Simultaneously, it emphasizes ensuring the code is safe to use anywhere.

It does this by creating **pure functions**, i.e., functions that don't cause any global side effects or have consistent outputs for the same input. Additionally, it uses immutable data structures to avoid changes that cause side effects.

This programming paradigm also has the concept of using functions as objects. Consequently, this allows us to have functions that accept other functions or **higher-order functions**. In some cases, the use of these functions helps us to condense our code, as seen later. This article will focus on this aspect as it is the least intuitive concept.

Functional programming can have huge advantages in some cases. One such case is in a multi-threaded environment. Because of the emphasis on avoiding global side effects, our operations become isolated. This isolation makes conflicts between threads impossible.

Another advantage of functional programming is the convenience it provides when manipulating data. This is especially important in a world where data is plentiful and critical for society.

It is worth noting that Java technically does not have functions. This is because functions are not linked to any class or object. Being strictly object-oriented, Java does not have a feature to create a function outside of a class block.

Instead, Java has methods, which are identical to functions but associated with a class or object. This distinction is not very significant for this guide, and we may use the terms "function" and "method" interchangeably.

### An Overview of Java’s Support for Functional Programming
Java was never initially developed to support functional programming. The one thing lacking was a way to use functions as objects, and subsequently, create higher-order functions. Java 8, however, provided the tools necessary to use these features and improve on the other aspects of functional programming. These tools include UnmodifiableCollections, lambda expressions, streams, and method reference.

### Unmodifiable Collections
Ordinary Collections such as Lists are mutable by nature. Thus if one is not careful, it is easy to make an unwanted modification. There are many static methods in the Collections class to create Collections that we cannot change. These methods take the naming convention of Unmodifiable Collection type. As an argument, they accept the Collection object you wish to make unchangeable.

As an example:

```java

List<String> strings = Collections.unmodifiableList(new ArrayList<>(Arrays.asList("Hello", "World")));

strings.add("Illegal");

System.out.println(strings);

```

We convert an otherwise modifiable List into an unmodifiable version. Since the Collection is unmodifiable, running this code throws an UnsupportedOperationException.

Although modifications result in an exception, immutability is not guaranteed. For instance, take the following example (note that the Point Class is from the java.awt package):

```java

Point a = new Point(5,9);

List<Point> points = Collections.unmodifiableList(new ArrayList<>(Arrays.asList(a)));

a.setLocation(20,20);

System.out.println(points);

```

Running the code outputs the following:

> [java.awt.Point[x=20,y=20]]

As you can see, we can change an element using a reference pointing to the same object. **To ensure that the List is genuinely immutable, it must only contain objects that are also immutable.**

*Note:* Java 9 added a less verbose way to create these immutable Collections, following the basic syntax:

```java

List<String> strings = List.of("Hello", "World");

```

There are many other methods of the Collection subclasses of this fashion, such as Maps and Sets' corresponding methods.

### Lambda Expressions
A lambda expression is an expression used to create a method in-line. They have object-like qualities and we use them as arguments (in fact, they are their own objects, but we will explain that later). As an example of the syntax of these expressions, say we had this simple method:

```java

public static boolean isEven(int num){

    return num % 2 == 0;

}

```

We can express this same logic as a lambda expression as follows:

```java

(num) -> { return num % 2 == 0; }

```

We write the arguments in brackets and the method body in curly brackets.

These two separated with a `->`.

Since there is only one argument within the brackets, we can simplify the expression:

```java

num -> { return num % 2 == 0; }

```

Since the method body only contains a return statement, we can simplify it even further:

```java

num -> num % 2 == 0

```

At this point, you may be wondering why we omitted the types of the parameter and returned value. With Java being a statically typed language, it may not be very intuitive to you why this is the case. Yet, lambda expressions are strongly and statically typed, even though we don't show types. We will explain this in more detail later.

### Lambda Expressions vs Anonymous Inner Classes
Lambda expressions, being a way to create "methods" in-line, draws some comparison to anonymous inner classes. As you may recall, anonymous inner-classes provide a way to build objects on the fly for use as arguments. We often use anonymous inner classes to pass event listeners into swing components:

```java

JButton b1 = new JButton("Hello World");

b1.addActionListener(new ActionListener() {

    public void actionPerformed(ActionEvent e) {

        System.out.println("This is pretty cool");

    }

});

```

With the anonymous inner-class, we create the class in-line as it lacks any re-usability. Lambda expressions work almost the same way; they are also used to create single-use objects in-line. These objects being instances of wrapper classes for the methods we use. Behind the scenes, lambda expressions are implementations of what is called `functional interfaces`.

#### Functional Interfaces
Functional interfaces are interfaces that contain one unimplemented method. This allows the compiler to map lambda expressions into them. The idea is that they represent a specific functionality and not some kind of entity.

If you carefully read that description, you will notice that the ActionListener interface follows this. It has only one method to implement and represents a functionality, i.e., a response to an action. As such, we may express it as a lambda expression:

```java

JButton b1 = new JButton("Hello World");

b1.addActionListener(event -> {

    System.out.println("This is pretty cool");

});

```

Since there is only one method to implement, the only meaningful code is its implementation. With the lambda expression being only the implementation, we can use it to reduce boilerplate code.

This leads back to the question about type safety. In our example, the addActionListener method requires an ActionListener implementation. With this, the compiler knows the lambda expression's parameter and return types.

After all, the ActionListener interface has one method, which must be the method we are implementing. Since it knows what method we are trying to implement, it can know the types from the interface's declaration. This allows us to omit the parameter and return types, unlike traditional methods.

**Note**: *Functional interfaces often have their argument and return types as generics. In this case, the method accepting it specifies the types.*

### Stream API
One common use of lambda expressions is to pass them into higher-order functions to manipulate data structures' values. It would be impossible to talk about this application without mentioning streams.

In this context, we can think of a stream as a conveyor belt. This conveyor belt takes objects from a source, typically some data structure, and then inputs the objects into methods. After interacting with an object in this conveyor belt, you cannot go back to that object and as it has already gone through.

Thus, we cannot use the conveyor belt as storage since objects pass through them. Hence, the conveyor belt doesn't have a capacity as it doesn't store objects. It is important to note that since we can only visit each element once, we cannot reuse the stream. If we accidentally reuse the Stream, the application throws an IllegalStateException.

You may create Streams out of Collections by invoking their `stream` method. Using the Stream, you can perform various operations on the elements in a clean way. These Streams abide by the principle of not causing any side effects; they do not change the original Collection. They instead gather the data into another source, that is usually a new stream.

Methods of the Stream interface can be divided into two categories: **intermediate** and **terminal** methods. The intermediate methods return new streams to manipulate further, whereas terminal methods return a final result or do something with it.

As a simple example, the code below takes a list and uses Streams to create a new list with all the odd elements removed.

```java

List<Integer> nums = List.of(2, 3, 4, 9, 11, 14, 16);

List<Integer> result = nums.stream()
    .filter(num -> num % 2 == 0)
    .collect(Collectors.toList());

System.out.println(result);

```

As you can see, using streams for this problem provides a concise solution. First, we create a stream of the list of integers by invoking the stream method. Then, we invoke the filter method using a simple lambda expression as an argument.

This lambda expression implements a functional interface called `Predicate`. The method it implements takes a value (in this case, it is of type integer as are the elements) and returns a boolean. The filter method inputs each element into this method.

If the method returns false, then the filter method removes it from the resulting stream. Notice in the example we have a chain of Stream methods. These methods are intermediate methods that allow us to do this.

Each call within the chain manipulates the elements of the resulting stream from the previous call. By convention, we put each method in the chain on their own lines and separate indentation levels. After calling the filter method, we invoke the collect method. The argument: `Collectors.toList()`, specifies to collect the elements into a List.

**Note:** *To perform these operations asynchronously, invoke the `parallelStream` method instead of the stream method.*

### Some Common Stream Methods
The Stream interface has a large number of methods to provide useful tools when manipulating data. Some of the more commonly used methods we will go into detail about are the `map`, `forEach`, and `reduce` methods.

To learn more about the Stream interface, you should find all you need to know from the [documentation](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html).

The map method takes each element from the stream, manipulates it as we specify, and then returns a new stream of the resulting values. The resulting values do not have to be of the same type as the original values. There also exist some methods in the Stream interface that behave like the map method but return a Stream of a particular type.

These methods follow the basic naming convention: `mapTo<DataType>`.

The forEach method takes each element of the Stream and expects you to perform some kind of action with them, such as a method invocation. The return type is void making it a terminal method.

The reduce method takes each element of the stream, cumulatively performing an operation we define to reduce it into a single result. For example, you may pass a lambda expression to add two elements and return the result.

In this case, the reduce method would repeatedly add two elements in the stream, and return the sum of all the elements.

**Note:** *the lambda expression passed must take two elements of the stream as arguments.*

### Method Reference
The one drawback of lambda expressions is their lack of re-usability. This is completely fine for a single method call, as they are often used for. What if we had a method we would like to reuse, but also wanted the option to use it as an argument?

To get the best of both worlds, method reference is your best option. With method reference, you can pass ordinarily defined methods into higher-order functions. The basic syntax for method reference is as follows: `<Class/ObjectName>::<method>`.

Instead of using the ordinary dot syntax to reference a method, we use two colons to specify, not to call the method. You may even call the constructor of classes with this syntax: `<ClassName>::new`. We would use this to take elements of a stream, input each as constructor arguments, and output a new stream of instances of the corresponding class.

As an example, say we had the following Person class:

```java

package com.john.amiscaray.functional.examples.models;

public class Person {

    private String name;

    public Person(String name){

        this.name = name;

    }

    public String getName() {

        return name;

    }

    public void introduce(){

        System.out.println("Hello my name is " + name);

    }

}

```

If we had a list of names we wanted to create Person objects out of, and then invoke the introduce method on each of them, we can solve this problem trivially:

```java

List<String> names = List.of("John", "Dane", "Jane");

names.stream()
    .map(Person::new)
    .forEach(Person::introduce);

```

Here, we first create a stream out of the list of names, then we call the map method to create Person instances, using each String as the name field. Then we call the forEach method to invoke the introduce method of each Person.

### Summary and Conclusion
To summarize this article, we went over the basic idea behind functional programming, and some tools Java gives us to code in this style. This includes UnmodifiableCollections, functional interfaces, lambda expressions, stream API, and method reference. Knowing how to use these tools gives us the versatility to code in a functional style, that may be the most effective solution in some cases.

### Additional Resources
[Official Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)

[GeeksforGeeks](https://www.geeksforgeeks.org/functional-programming-in-java-with-examples/)

[What is Java](https://www.java.com/en/about/whatis_java.jsp)

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
