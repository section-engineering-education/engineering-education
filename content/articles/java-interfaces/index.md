---
layout: engineering-education
status: publish
published: true
url: /java-interfaces/
title: Getting started with Java Interfaces
description: This article will cover java interfaces used to build loosely-coupled, extensible, testable, and reusable components.
author: erastus-muriithi
date: 2022-02-21T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-interfaces/hero.png
    alt: Getting started with Java Interfaces cover image
---
Interfaces in java allow the developer to build reusable, testable, extensible, and coupled components. Interfaces play a significant role when used in classes, for instance, those that depend on each other.
<!--more-->
Let us assume we have two classes, X and Z, where class X depends on class Z. If we change class Z, X will be affected. To reduce this impact, we put interfaces between the classes such that when we change the code in class Z, it does not affect the code in class X.

In a sizeable complex application with lots of classes depending on each other, we can use interfaces to decouple the classes, which will reduce the impact on other classes when we change a single line of code in one class.

### Prerequisites
For this article, it is advisable to have:
- Basic knowledge and understanding of Java programming language.
- Basic knowledge of Java classes and inheritance.
- Have [IntelliJ](https://www.jetbrains.com/idea/) IDEA installed.

### Table of contents
- [What is an interface in java?](#1-what-is-an-interface-in-java)
- [ Benefits of Implementing Interfaces](#2-benefits-of-implementing-interfaces)
- [Interface segregation principle.](#3-interface-segregation-principle)

### 1. What is an interface in java?
An interface is a collection of methods that several classes can inherit.

To create an interface, you need to use the keyword `interface` as illustrated below:

```java
public interface MyInterface {
    void method1();
    void method2();
    void method3();
}
```

In the above example, we have an interface called `MyInterface`, with three defined methods.

#### Interfaces and classes
An interface states what is done by the class that implements it, while a class explains how it should be implemented.

To understand this, let us look at the code snippets below:

```java
public interface bird {
    void sound();
}
```

In the above snippet, we have an interface named `bird`. This interface has one method named `sound`.

We have different types of birds that make different sounds. For instance, a Crow makes a sound like "Caw Caw."

```java
public class Crow implements bird {
   @Override  #  override keyword instructs the compiler that the method sound is implementing an interface method
    public void sound() {
        System. out.println("Caw Caw");
    }
}
```

Another bird parrot makes a sound like "Kwi Kwi Kwi".

```java
public class parrot implements bird {
    @Override
    public void sound() {
        System.out.println("Kwi Kwi Kwi");
    }
}
```

In the above snippet, both `Crow` and `parrot` implement the interface `bird`. However, the two birds have different sounds, meaning that the `bird` class uses the interface method independently.

The interface is responsible for producing the sound of the bird while the class shows the production of sound ("Caw Caw" and "Kwi Kwi Kwi").

>Note: When a class sound implements an interface bird, it is obligated to include all the methods in the interface, meaning that the moment you implement an interface, it is like you have opened up a "contract" between the class and the interface. You have to include all the methods in the interface.

#### Rules for declaring interfaces
- The `@Override annotation` should be used on all the methods that the interface has implemented.
- Interfaces are said to be a contact between them and the classes that implement them. Whenever an interface is edited, the classes that implement it should be edited as well.
- Interfaces can inherit other multiple interfaces.
- Interfaces methods are always public.
- Interfaces cannot have constructors. They can not create an object.

### 2. Benefits of implementing interfaces
Interfaces come with several benefits. Some of them are:
- Ability to extend your applications.
- Ability to test a class in isolation.
- Ability to reuse the code in different classes.
- Catch the bugs in the code. Interfaces can catch any bug in your code. For instance, if you forget to include any method in the interface in your class, the compiler will let you know.

#### Demonstrating interface in code
To do this, open your IntelliJ IDEA and create a new directory interface. Create an interface file `sound` in `/interface` and add the snippet below:

```java
public interface sound {
    void noisy();
    void soft();
}
```

In the above interface snippet, we have two methods: `noisy`, and the other is `soft`.

Now, let's create `Cat` and `dog` classes in the directory `/interface`,  add the snippets below respectively:

```java
public class cat implements sound{
    public static void main(String args[]){
        cat ex = new cat();
        ex.noisy();
        ex.soft();
    }
   @Override //  helps java to keep track on what is being implemented in the interface
    public void noisy() {
        System.out.println("purrs");
    }
    @Override
    public void soft(){
        System.out.println("meow");
    }
}
```

```java
public class dog implements sound{
    public static void main(String args[]){
    dog ex = new dog();
    ex.noisy();
    ex.soft();
    }
    @Override
    public void noisy() {
        System.out.println("Noisy voice: "+" woof");
    }
    @Override
    public void soft() {
        System.out.println("soft voice: "+" bark");
    }
}
```

To execute the snippet `(e.g., dog. class)`, open the terminal in the IntelliJ IDEA and type the following commands:

```bash
$ javac dog.java
$ java dog
```

The output will be:

```bash
Noisy voice:  growl
soft voice:  bark
```

### 3. Interface segregation principle(ISP)
To understand this principle, let's relate it to a mobile charger with multiple charging ports—type C port, USB port 1, USB port 2, and many others. All these kinds of ports are connected to one mobile charger head. Though the charger has many ports, only one port is required to charge a single phone.

The `Interface segregation principle(ISP)` states that interfaces should not have methods that are not required by the class that implements them. Extensive interfaces should be divided into smaller ones where each performs a different task.

#### ISP demonstration
Let us create a new directory `hotel` in IntelliJ IDEA. In `/hotel` create an interface `/hotel/main.java` and add the snippet below:

```java
public interface hotel1 {
    void room();
    void food();
    void drink();
}
```

In the above interface snippet, we have three methods: `room`, `food`, and `drink` meaning we can get a room, food, and drink in the class `hotel1`. Let us create the class `Beverages` in `/hotel1` and add the snippet below:

```java
public class Beverages {
    public void drink(hotel1  drinking){
        drinking.drink();
        System.out.println("Ordering coffee");
    }
}
```

In the snippet above, the class `Beverages` is dependent on the interface `hotel1`. If we change the interface `hotel1`, the class will be affected. Let us edit our interface as shown below:

```java
public interface hotel1 {
    void room(int size);
    void food();
    void drink();
}
```

Changing the capability `void room()` will affect the class `beverages`  and other classes coupled to the interface. To avoid this, we use the `ISP` principle. Let us divide our interface into smaller interfaces, where each interface will focus on a different capability.

```java
public interface Drinking {
    void drink();
}
```

On generating a new interface, our old interface will be as shown below:

```java
public interface hotel1 {
    void room(int size);
    void food();
}
```

We have now generated a lightweight interface (`Drinking`) that will only focus on drinking capability.

### Conclusion
When dealing with large applications containing multiple classes that depend on each other, it's wise to use interfaces as they will help you debug your code and make your code more maintainable.

Happy Learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
