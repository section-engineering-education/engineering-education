---
layout: engineering-education
status: publish
published: true
url: /polymorphism-in-java/
title: Polymorphism in Java
description: This article will help you understand Polymorphism in java.
author: meshack-kimosop
date: 2022-02-02T00:00:00-00:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/polymorphism-in-java/hero.jpg
    alt: Polymorphism in Java
---

`Polymorphism` is the ability of an object to have more than one form. In this article, we will introduce polymorphism and give some examples to understand more about polymorphism. We will further discuss the two types of polymorphism which are `static` and `dynamic` polymorphism. Furthermore, we will take a look at the advantages of polymorphism and lastly the characteristics of polymorphism.
Let's now get into the details.

Polymorphism is where an object has more than one form. We can also say that polymorphism is a feature that allows one task to be performed in more than one way.
To get the idea better, we will use the examples below.

Polymorphism examples include:
* A human has one body, but inside the body, there are various organs that perform different tasks. The heart pumps blood, the stomach digests food, the lungs are used for breathing, etc.
In this example, you can note that the human body allows more than one task to take place inside body.

* Another example is the man. A man can have different tasks depending on the role he plays. He can be a father in a family and perform fatherly roles. He can be a boss at work and similarly perform a boss's job. Lastly, he can be studying and he becomes a student for that matter.
From the above, you can note that the man can be a father, a boss, and a student. That shows how polymorphic the man can be.

### Table of Contents
* [Introduction](#introduction)
* [What is Polymorphism](#what-is-polymorphism)
* [Types of Polymorphism](#types-of-polymorphism)
* [Adantages of Polymorphism](#advantages-of-polymorphism)
* [Characteristics of Polymorphism](#characteristics-of-polymorphism)
* [Conclusion](#conclusion)
* [Further Reading](#further-reading)

### Introduction
Java is an Object-Oriented programming language.
But what is OOP commonly known for?. Yeah, the four pillars of Object-Oriented Programming.

The four pillars include:

* `Abstraction` - Is the process of hiding the less important functionalities from the user and displaying what is only important. This fundamental gives the user the knowledge of *what a program does* rather than *how a program does* it.

* `Inheritance` - Is where one class, normally the *child class* inherits the properties of another class known as the *parent class*.

* `Encapsulation` - Is a fundamental where related data is bound together into a single unit.

* `Polymorphism` - The simplest way to understand polymorphism is **having many forms**. We will discuss more on polymorphism in this tutorial.

### What is Polymorphism 
Polymorphism is a Greek word where two words are combined to give one meaning. Funny, you can say the word is polymorphic.

The two words are `poly` and `morph` where *poly means many* and *morph means one or more forms*.

### Types of Polymorphism
Polymorphism can be divided into two types:

#### 1. Static Polymorphism

**Static Polymorphism** is the linking of a function or a method with the object when compiling the code. This is before running the code.

To understand what compile-time error and compile-time polymorphism is, let's take a case. When you are writing a code, probably creating a method, and you by chance create two or more methods with the same name. You will get an alert that you have a duplicate method in your code.

This error is called `Compile-time error`. The ability to receive alerts on errors in your code is made possible by the **compiler**. When the compiler resolves conflict on matters regarding polymorphism, it is regarded as `Compile-time Polymorphism`.

An example includes Method overloading or Function overloading.

For clarity:

`Method overloading` is achieved by having multiple methods with the same name but different parameters or having different sizes of arguments. The parameters can differ by having different arguments, having different types of data types, or having different sizes of the arguments. This will avoid the compile-time error.

Let us use a code snippet to understand more about static polymorphism.

```java
class MyClass {
    int height;

    MyClass() {
        System.out.println("bricks");
        height = 0;
    }
    MyClass(int i) {
        System.out.println("Building new house that is "+i+" feet tall");
        height =i;
    }
    void info() {
        System.out.println("House is "+height+" feet tall");
    }
    void info(String s) {
        System.out.println(s+": House is " +height+ " feet tall");
    }
}
public class Main {
    public static void main(String[] args) {
        MyClass t = new MyClass(10);
        t.info();
        t.info("overloaded method");

        //Overloaded Constructor
        new MyClass();
    }
}
```

```bash
//Output
Building new house that is 10 feet tall
House is 10 feet tall
overloaded method: House is 10 feet tall
bricks
```
In the example above, you can see that we created two methods, both of which share the same name `MyClass` but have different parameters. When the first class is called, it will avoid the output of the string stated since there is no specific data type stated to be returned.

On the other hand, the second class, MyClass, has a parameter of an integer. When we call it, the output will not only have the printed output but will also recognize an integer included in the output. The example shows that we can have multiple methods having the same name but different parameters and that is known as method overloading.

#### 2. Dynamic Polymorphism

**Dynamic Polymorphism** is a type of polymorphism wherein the case when you call an overridden method, this conflict is resolved when you run the code, normally known as runtime. It can also be referred to as `run time polymorphism`.

Method Overriding is an example of dynamic polymorphism.

`Method overriding` is a feature where you can have a parent method and a child method. Both the parent and child methods have the same name, but the child method will tend to modify or override the parent method.

Below is a snippet that explains the concept in detail.

```java
class Animal {
    public void sound() {
        System.out.println("Animals make sound");
    }
}
class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Woof");
    }
}
class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("Meow");
    }
}
public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();
        Animal b = new Dog();
        Animal c = new Cat();

        a.sound();
        b.sound();
        c.sound();
    }
}

```
```bash
// Output
Animals make sound
Woof
Meow
```

In the example above, we have two classes, the dog class, and the cat class which both extend the class animal. You can note that when we called the object dog and cat, we receive the outputs for the methods in their respective classes.

This indicates that the method in the class animal was overridden by the child class. Normally, for easier understanding of the code, we use `@Override` keyword to indicate which method is overriding the parent method. This gives a good example of dynamic polymorphism.

### Advantages of Polymorphism
We are now going to look at the advantages of polymorphism.

1. `Support for Method Overriding` - This is the feature where a child method can modify the specifications of the parent method. This also enables the creation of one method and modification to serve more than one method.
2. `Method specification` - This allows for child classes to make modifications or improvements to the parent class before implementation.
3. `Method Overloading` - This allows the use of the same method name on different methods but modifying the parameters and arguments to avoid a compile-time error.

### Characteristics of Polymorphism

1. `Polymorphic Coercion` - **Coercion** is the automatic conversion of data types from one form to another. An instance of the process mentioned is the conversion of a double into an integer. The above can also be referred to as implicit type conversion.

The example below will indicate how java achieves coercion.
```java
// Explicit type conversion
double x;
x=(double)2;
```
```java
// Implicit type conversion
double x;
x=2;
```
In the first example, you first have to initialize the data type, and then when allocating the variable, you specify the type of the variable. The case is different in Implicit type conversion. After you initialize the data type, you only have to allocate the variable and the compiler will automatically recognize it as a double.

2. `Operator Overloading` - This is where the same symbol or operator has more than one meaning even when used in the same code. Below is an example to explain operator overloading.
```java
String str = "5"+5;
int sum = 5+5;

System.out.println("str=%s sum=%d",str,sum);
```

```bash
//Output
str = 55
str = 10
```

In the above example, you can note that the `+` operator is not only used as a mathematical operator, for addition, it is also used as a string concatenation by linking together a string and an integer.
As seen in the output, the output is different even though the operator used is the same. This shows how operator overloading happens.

3. `Polymorphic parameters` - This particular characteristic allows a name of a parameter or method to be associated with different data types either locally or globally.

```java
public class Dog extends Animal {
    private string legs;
    public String setDogLegs(){
        int legs = 4;
        this.legs = this.legs + legs;
    }
}
```

Declaring of polymorphic parameters can lead to `variable hiding`.

**Variable hiding** occurs where the declaration of a local variable overrides the global variable with the same name.

In the above example, we have declared the legs globally as a string and then declared them locally as an integer. Normally, variable hiding would have occurred. But to solve that, we have used a global reference `this` to point to the global variables within the local context.

### Conclusion
From this article, you can now acknowledge that polymorphism is indeed a pillar of not only java but also any OOP language. The different types of polymorphism show how polymorphism can be executed in different ways. Knowing compile-time and run-time polymorphism will greatly help since it applies in the major programming languages.

### Further reading
In this tutorial, you have learned one of the major pillars of OOP languages, you might want to know more about the other ones:
- [Abstraction](https://www.w3schools.com/java/java_abstract.asp)
- [Encapsulation](https://www.tutorialspoint.com/java/java_encapsulation.htm#:~:text=Encapsulation%20in%20Java%20is%20a,methods%20of%20their%20current%20class.)
- [Inheritance](https://www.geeksforgeeks.org/inheritance-in-java/)

---
Peer Review Contributions by: [Mohamed Alghadban](/engineering-education/authors/mohamed-alghadban/)
