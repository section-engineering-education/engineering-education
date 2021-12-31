### Polymorphism in Java

### Table of Contents
* [Introduction](#introduction)
* [What is Polymorphism](#what-is-polymorphism)
* [Types of Polymorphism](#types-of-polymorphism)
* [Adantages of Polymorphism](#advantages-of-polymorphism)
* [Charactaristics of Polymorphism](#charactaristics-of-polymorphism)
* [Difference between Static and Dynamic Polymorphism](#difference-between-static-and-dynamic-polymorphism)

Java is an Object-oriented programming language.
But what is OOP commonly known for?. Yeah, the four pillars of Object-Oriented Programming.

The four pillars include:
* Abstraction
* Inheritance
* Encapsulation
* Polymorphism

To breakdown the four pillars of OOP:
* `Abstraction` - This is the process of hiding the less important functionalities to the user and displaying what is only important. This fundamental gives the user the knowledge of *what a program does* rather than *how a program does* it.

* `Inheritance` - This is where one class, normally the *child class* inherits the properties of another class known as the *parent class*

* `Encapsulation` - This is a fundamental where related data is bound together into a single unit.

* `Polymorphism` - The simplest way to understand polymorphism is **having many forms**. We will discuss more on polymorphism in this tutorial.


### Introduction
Polymorphism is where an object has more than one form. We can also say that polymorphism is a feature that allows one task to be performed in more than one way.

Let us take a look at some examples of Polymorphism.
* A human has one body, but inside the body, there are various organs that perform different tasks. The heart pumps blood, the stomach digests food, the lungs if for breathing, etc.
In this example, you can note that the human body allows more than one task to take place in the body.

* Another example is the chameleon. The chameleon can camouflage into different colors depending on the environment. On a green surface, it can turn to color green, turn brown on a brown surface, and so on. We can say that the chameleon has more than one form and that is polymorphism.

### What is Polymorphism 
Polymorphism is a Greek word where two words are combined to give one meaning. Funny, You can say the word is polymorphic.

The two words are `poly` and `morph` where *poly means many* and *morph means one or more forms*

### Types of Polymorphism
There are two types of polymorphism. **Static Polymorphism** and **Dynamic Polymorphism.**

#### Static Polymorphism

> **Static Polymorphism** - This is a type of polymorphism that is resolved during compile time by the compiler. In other terms, it is referred to as `compile-time polymorphism`.
Examples include Overloading also known as Method overloading or Function overloading.

For clarity:

`Method overloading` - This is a feature that allows multiple methods to share the same name but have different parameters.

Let us use a code snippet to try to understand more about static polymorphism.

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

```java
//Output
Building new house that is 10 feet tall
House is 10 feet tall
overloaded method: House is 10 feet tall
bricks
```

#### Dynamic Polymorphism

> **Dynamic Polymorphism** - This is polymorphism where a conflict to an overridden method is resolved at run time. It can also be referred to as `run time polymorphism`.
An example of dynamic polymorphism is Method Overriding

`Method overriding` - This is a feature where a method is implemented by both the child class and the parent class but the method is modified by the child class.

Below is a snippet that explains the concept in detail.
```java

class Vehicle {
    public void move() {
        System.out.println("Vehicles can move");
    }
}
class Car extends Vehicle {
    public void move() {
        System.out.println("Car Moves with 4 wheels");
    }
}
public class Main {
    public static void main(String[] args) {
        Vehicle a = new Vehicle();
        Vehicle b = new Car();

        a.move(); //runs the method in Vehicle class
        b.move(); //runs the method in Car class

    }
}

```

```java
//Output
Vehicles can move
Car Moves with 4 wheels
```

### Advantages of Polymorphism
We are now going to look at the advantages of each of the types of polymorphism.

**Dynamic Polymorphism**

1. `Support for Method Overriding` - This particular feature is essential for run time polymorphism and it is made possible with dynamic polymorphism.
2. `Method specification - This allows for child classes to make modifications or improvements to the parent class before implementation.

### Characteristics of Polymorphism

1. *Polymorphic Coercion* - Implicit type conversion
2. *Operator Overloading* - This is where the same symbol or operator has more than one meaning even when used in the same code. Below is an example to explain operator overloading.
```java
String str = "5"+5;
int sum = 5+5;

System.out.println("str=%s sum=%d",str,sum);
```

```java
//Output
str = 55
str = 10
```

In the above example, you can note that the `+` operator is not only used as a mathematical operator for addition, it is also used string concatenation by linking together a string and an integer.
As seen in the output, the output is different even though the operator used is the same. This shows how Operator overloading happens.

3. *Polymorphic parameters* - This particular characteristic allows a name of a parameter or method to be associated with different data types either locally or globally.

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

In the above example, we have declared the legs globally as a string and then declared them locally as an integer. Normally variable hiding would have occurred. But to solve for that, we have used a global reference `this` to point to the global variables within the local context.

### Difference between Static and Dynamic Polymorphism

1. Static Polymorphism deals with method overloading while Dynamic Polymorphism relates to method overriding.
2. In static polymorphism, errors are resolved at compile time by the compiler while in dynamic polymorphism, errors are resolved at the run time hence the name compile and run time polymorphism respectively.

### Summary
From this tutorial, we have gone through the following:
1. Introduced and gone through some examples of polymorphism
2. Types of Polymorphism
      * Static Polymorphism
      * Dynamic Polymorphism
3. Advantages of Polymorphism
4. Characteristics of Polymorphism
      * Polymorphic Coercion
      * Operator Overloading
      * Polymorphic parameters
5. Difference between Static and Dynamic Polymorphism.