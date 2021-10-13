---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-generics-in-java/
title: Getting Started with Generics In Java
description: This article will describe how to get started on working with generics in the Java language. A generic type is a generic class or interface that is parameterized over types. The idea is to allow type (Integer, String, … etc, and user-defined types) to be a parameter to methods, classes, and interfaces.
author: emmah-lashly
date: 2021-10-13T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/getting-started-with-generics-in-java/hero.png
    alt: Getting started with generics in Java cover image
---
This tutorial is essential for beginners in the Java programming language who want to learn Generics. In Java, Generics have various advantages that make their usage significant. Generic classes execute faster than non-generic classes since they have reduced boilerplate (unnecessary code) codes. Just to mention, generic methods allow code reusability which saves the programmer from creating various methods.
<!--more-->

### Table of contents

This article will cover:

- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What are Generics](#what-are-generics)
- [Advantages of Using Generics in Java](#advantages-of-using-generics-in-java)
- [How to Create Generic Classes](#how-to-create-generic-classes)
- [How to Create Generic Methods](#how-to-create-generic-methods)
- [Generic Interface](#generic-interface)
- [Wildcards](#wildcards)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial as a beginner, intermediate, or even an expert in Java, you will require:

- A suitable Integrated Development Environment (IDE), either [IntelliJ IDEA](https://www.jetbrains.com/idea/download/#section=windows) or [NetBeans IDE](https://netbeans.apache.org/download/index.html).
- A basic understanding of creating classes in [Java](https://docs.oracle.com/en/java/).
- Knowledge in implementing methods in Java.
- A basic understanding of creating interfaces in Java.
- A minimum of version 1.8 [JDK](https://www.oracle.com/java/technologies/downloads/) (Java Development Kit) installed.

### Goals
By the end of this tutorial, the learner should be conversant with:

- Creating a [Generic](https://docs.oracle.com/javase/tutorial/java/generics/types.html) class.
- Implementing Generic interfaces.
- Implementing Generic methods.
- Advantages of using Generics.

### What are Generics
Generics in Java allow the use of parameterized types. A parameterized type is instantiated using actual type arguments.

A reference type with one or more type parameters is known as a generic type. When the generic type is specified, these type parameters are substituted with type arguments. Generic classes and methods allow parameterized types which include the wrapper classes.

With generics, it is possible to create classes that allow different data types. Wrapper classes include: `Integer`, `Double`, `Float`, `String`, and `Character`.

### Advantages of using generics in Java

Generics have various advantages in Java programming:

1. Generics ensure type safety.

Generics allow the holding of only one type of object. This helps in detecting errors at compile time whenever an argument of a different type is passed.

2. Generics allow code reuse.

For example, when you want to create a class that shows the class of parameterized type either Integers, Doubles, Strings, or even Characters, you will be forced to create different classes while with generics there will be only one class.

3. Generics don’t require individual-type casting.

When using generics, there is no need for type casting since generics provide the parameterized type which references an argument.

4. Generics help in detecting errors at compile time rather than at the run time.

It is a good programming practice to handle errors/problems at compile time rather than at the run time which might lead to uncertainties.

### How to create generic classes
A generic class is a class that can reference any type. With generics, one can refer to any parameterized type.

In creating a generic class, a parameterized type is wrapped inside the `<>` (angular brackets). The parameterized type can have one or more parameters separated by commas.

Consider the example below:

```java
public class MyGenericClass <T> {
}
```

`T` is usually used to represent `type` which must be the parameterized type `Integer`, `String`, `Float`, `Double`, or `Character`. Primitive types like `int`, `char`, `float`, `double`, and `string` must not be used to represent `T`.

To create an instance (object) of a generic, the following syntax is used:

```java
MyGenericClass <T> object = new MyGenericClass<>();
```

Below is a complete Java generic class:

```java
public class MyGenericClass <T> {

    T value;

    public MyGenericClass(T value){
        this.value = value;
    }
    public T getValue(){
        return this.value;
    }
    public static void main(String[] args) {
        MyGenericClass <Integer> object = new MyGenericClass<>(4);
        System.out.println("value: "+ object.getValue());
    }
}
```

Parameterized `T` has been replaced with wrapper class `Integer` which allows only the values of type integer.

### How to create generic methods
Just like generic classes, generic methods are methods that allow any type of argument by referencing the parameterized types. In generic methods, the scope of the argument is local to the method in which it is defined. Generics allow both static and non-static methods.

Below is a Java generic method:

```java
public class GenericMethod {
    // Generic method to display the Parametrized types
    public static <T> void displayParameterizedType(T type){
        System.out.println(type.getClass().getName()+ " = "+ type);
    }
    public static void main(String[] args) {
        displayParameterizedType(25);
        displayParameterizedType("John Doe");
        displayParameterizedType('a');
        displayParameterizedType(10.00);
        displayParameterizedType(20.0f);
    }
}
```

Output:

```java
java.lang.Integer = 25
java.lang.String = John Doe
java.lang.Character = a
java.lang.Double = 10.0
java.lang.Float = 20.0
```

### Generic interface
The generic interface is created the same way as generic classes but some conditions must be observed while implementing generic interfaces.

The conditions include:

**1. A class that implements a generic interface MUST be generic.**

If implementing class of generic interface is not generic, there will be a compile-time error because the parameterized type is not known.

Here's a sample generic Interface:

```java
public interface PersonGenericInterface <E> {
    void setPersonName(E name);
    public E getName();
}
```

Implementing Class:

```java
public class NameGenericClass <E> implements PersonGenericInterface <E>{

    E name;
    @Override
    public void setPersonName(E name) {
        this.name = name;
    }

    @Override
    public E getName() {
        return name;
    }

    public static void main(String[] args) {
        NameGenericClass<String> myName = new NameGenericClass<>();
        myName.setPersonName("John Doe");
        System.out.println("My name is: "+ myName.getName());
    }
}
```

**2. A non-generic class can be used if a specific parameterized type (`Integer`, `String`, `Double`, `Character`, `Float`) is provided with the interface while implementing.**

See the example below:

```java
public class NameGenericClass implements PersonGenericInterface <String>{

    String name;
    @Override
    public void setPersonName(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }

    public static void main(String[] args) {
        NameGenericClass myName = new NameGenericClass();
        myName.setPersonName("John Doe");
        System.out.println("My name is: "+ myName.getName());
    }
}
```

**3. The generic class implementing a generic interface can have other parameterized type parameters.**

The generic class can have more than one parameterized type argument as shown below:

```java
public class NameGenericClass <E, T> implements PersonGenericInterface <E>{

    E name;
    T age;

    @Override
    public void setPersonName(E name) {
        this.name = name;
    }

    @Override
    public E getName() {
        return name;
    }

    public void setAge(T age){
        this.age = age;
    }

    public T getAge(){
        return age;
    }

    public static void main(String[] args) {
        NameGenericClass <String, Integer> person = new NameGenericClass<>();
        person.setPersonName("John Doe");
        person.setAge(25);
        System.out.println("My name is "+ person.getName()+ ", "+ person.getAge()+ " years old.");
    }
}
```

### Wildcards
A wildcard allows reference to unknown types. It is denoted by a `?` character and it can reference any object like generic classes.

#### Upper bounded wildcard
The upper bounded wildcard is defined by the wildcard character `?` then followed by an `extends` keyword and finally its `upper bound`.

For example:

```java
public static <T> void numbers(Set<? extends Number> set){
    // Your code here
}
```

#### Lower bounded wildcard
A lower bounded wildcard is defined by the wildcard character `?` followed by the `super` keyword and then its `lower bound`.

For example:

```java
public static void additionOfNumbers(List<? super Integer> numbers){
    for (int i = 1; i < 10; i++){
        numbers.add(i);
    }
}
```

#### Unbounded wildcard
It is only defined using the wildcard character `?`. It is useful when:

- Writing a method that can be used with the functionality provided in Object class.
- The code uses generic class methods that aren't dependent on the type parameter.

> Note:
> Bounded wildcards do not allow multiple bounds for a generic parameter. Hence only one bound can be provided as an argument.

### Conclusion
In this tutorial we have learned how to use Generics, to perfect your skills with generics you should do more practice and try the sample codes provided as well. Using generics in java is a good practice as it provides less boilerplate code and increases the efficiency of the program.

Happy Coding!

Peer Review Contributions by: [Ruth Mare](/engineering-education/authors/ruth-mare/)
