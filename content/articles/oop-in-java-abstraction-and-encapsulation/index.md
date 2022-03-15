---
layout: engineering-education
status: publish
published: true
url: /oop-in-java-abstraction-and-encapsulation/
title: OOP in Java - Getting Started with Abstraction and Encapsulation
description: In this article we will learn about abstraction, encapsulation, objects, and classes. The concept of OOP will be a nice piece to grab for absolute Java beginners. 
author: frank-joseph
date: 2021-08-25T00:00:00-16:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/oop-in-java-abstraction-and-encapsulation/hero.jpg
    alt: OOP in Java example
---
Object-Oriented Programming (OOP) is a programming paradigm (approach), or as is procedural programming. Unlike procedural programming, we model everything as objects (real-life entities). Java, as an object-oriented programming language, was designed to follow this pattern.
<!--more--> 
Objects come from a class, a form of generalization, but a real thing is an object. What exactly is a class? A class is a template to create objects.

The process of creating objects from a class is called instantiation.
 
In this tutorial, the reader will learn about abstraction, encapsulation, objects, and classes. The concept of OOP will be a nice piece to grab for absolute Java beginners.

### Prerequisites
The reader should have:
- At least a basic knowledge of Java.
- Have Java installed on your computer.
- Have any IDE of your choice.
 
### Objectives
At the end of this OOP tutorial series, readers should be able to:
- Differentiate between classes and objects.
- Understand abstraction and encapsulation.
- Create objects from classes.
- Have a working knowledge of what OOP is about.
- Create abstract classes and interfaces.
 
### Class
A class is a template or a blueprint for object creation. To represent attributes or properties, classes use instance variables whereas, for behaviors or actions, it uses instance methods.
 
#### Instance variables
These are variables declared in the class, outside of methods and constructors. Instance variables have a global scope.
 
#### Instance methods
These are methods that only an object of its class can invoke. It is the class that defines what an object data field or variables and methods will be.

An example of a class is a circle class. A circle has a radius from which we can create different objects of type circle.
The following code snippet explains this idea.
 
```java
 
public class Circle {

    //instance variable

    private double radius = 2.5;

    //no-argument constructor

    public Circle() {

    }

    //argument constructor

    public Circle(double radius) {
        this.radius = radius;
    }

    //method

    public double getArea() {
        return Math.PI * radius * radius;
    }

    //method

    public double getPerimeter() {
        return Math.PI * (2 * radius);
    }

}
 
```
 
With this, we have created a class called Circle. The same goes for every other class like Car, Human, Animal, etc. A class in simple terms is a model. 

### Objects
An object is an actual entity with attributes and behaviors defined by its model, such as a circle, dog, fish, human, etc.
Now that we’ve created a template for a Circle, creating circles of different sizes becomes easier.
 
```java
 
public class CircleSize {

    //entry point to every Java application

    public static void main(String[] args) {

        Circle smallCircle = new Circle();

        /*The new keyword used here means a new object of type class is created and saved in the variable smallCircle of reference type Circle*/

        //to get the area of the circle created

        System.out.println("The area of this circle is " + smallCircle.getArea());

        /*you can also decide to use an arg constructor to construct your new circle*/

        Circle bigCircle = new Circle(2.5);

        System.out.println("The area of this circle is " + bigCircle.getArea());

    }

}
 
```
 
The same thing applies if you want to create an object of type Dog. The dog should have a name, color, age, and breed. The dog should be able to sleep, eat, run, or bark.

 
```java
 
public class Dog {

    private String name;

    private int age;

    private String color;

    private String breed;

    //Dog arg constructor

    public Dog(String name, int age, String color, String breed) {

        this.name = name;

        this.age = age;

        this.color = color;

        this.breed = breed;

    }

    public boolean isSleeping() {

        System.out.println("Sleeping");
        return true;
    }

    public boolean isEating() {

        System.out.println("Eating");
        return true;

    }

    public boolean isbarking() {

        System.out.println("Dog barking...");
        return true;
    }

    public boolean isRunning() {

        System.out.println("Dog running");
        return true;
    }

}
 
```
 
To create a new dog object.
 
```java
 
public class Dog_Main {

    public static void main(String[] args) {

        Dog littleDog = new Dog("Bingo", 6, "Brown", "German Shepherd");

        System.out.println("Is the dog running:? " + littleDog.isrunning());

        System.out.println();

        System.out.println("is the dog sleeping:? " + littleDog.isSleeping());

        System.out.println();

        System.out.println("Is the dog barking:? " + littleDog.isbarking());

        System.out.println();

        System.out.println("Is the dog eating:? " + littleDog.iseating());

        System.out.println();

        System.out.println("The dog name is:  " + littleDog.name);

    }

}
 
```
 
Now you see, we’ve created a new dog with the name `Bingo`. You can go on to create as many dogs with different states or attributes.
 
Here is the output:
 
```bash
  Dog running
 
  Is the dog running:? true
 
  Sleeping
 
  is the dog sleeping:? true
 
  Dog barking...
 
  Is the dog barking:? true
 
  Eating
 
  Is the dog eating:? true
 
  The dog name is: Bingo
```
 
Now that we’ve got this out of the way let's talk about abstraction and encapsulation.
 
### Abstraction 
Who could have imagined that abstraction will be a thing in programming? Who? But right now, you can’t talk about OOP without mentioning abstraction. 

It is a significant building block of OOP. So then, what is abstraction? This section will explain what abstraction is and how to use it as a Java developer.

In abstraction, only the useful attributes of an object are on display or accessible. The low-level details are *hidden*. For example, imagine you’re typing on your computer. 

You’re interested in punching the keys believing that it produces results on your screen. You know nothing about the mechanism that produces the result, and I’m sure you haven’t even thought about it yet. Have you?
 
Here's another example to make things clearer: imagine car drivers. They are only interested in starting, moving, and stopping the car, speed, or changing gear and brake. 

They are not interested in the mechanism that allows them to do this. In abstraction, we hide the implementation details from the user while exposing the functionality.
 
This way, the user will only know what a function (method in java) does but not how it does it.
 
### How to implement abstraction in Java
In Java, abstraction is implemented using either of these two ways:
1. By using the non-access modifier *abstract* keyword or
2. Interface
 
#### Working with the abstract keyword
You can only use the abstract access modifier keyword with classes and methods but not with variables. Methods with the keyword *abstract* are methods without implementation.
 
To implement an abstract class in Java, use the abstract keyword, e.g., `public abstract class Circle`, where Circle is the class name. 

Let's demonstrate this using this code snippet:
 
```java
 
public abstract class Dog {

    public abstract void run();

}
 
```
 
With the code snippet above, we've created an abstract class and an abstract method. One pertinent feature of abstract class is that objects cannot be instantiated or created from it. But don’t forget, classes only exist to create an object. 

To be able to create an object from an abstract class, we must create a new class that inherits from the superclass (base/parent). 

You can do this using the `extends` keyword. Abstract methods are implemented to avoid compilation errors that the compiler will throw when the abstract method is not implemented.
 
Here is a code snippet to illustrate the `extends` keyword:
 
```java
 
public class MainDog extends Dog {

    //abstract method body definition
    @Override
    public void run() {
        //in this class the method is implemented
        System.out.println(“Dog is running”);

    }

    public static void main(Strings[] args) {

        MainDog dog = new MainDog();

        //abstract method invocation

        dog.run();

    }

}
 
```
 
#### Interface implementation
An interface contains public, abstract method signatures (methods without implementation). It is also important to note that interfaces have no constructors and may contain final and static variables. 

Implementating abstraction by the interface method is possible by the use of the `implements` keyword. Since methods in an interface do not have a body, the class implementing it must implement all the methods in the interface. The child class inherits the parent class, overrides its method signatures, and provides a method body.
 
```java
 
public interface Car {

    public void start();

    public void stop();
}

public Benz implements Car {

    /*This stop method will execute independent of the @Override annotation but the annotation tell the compiler we are overriding a superclass method*/

    @Override
    public void start() {
        System.out.println(“I started my Benz car”);
    }

    /*This stop method will execute independent of the @Override annotation but the annotation tell the compiler we are overriding a superclass method*/

    @Override
    public void stop() {
        System.out.println(“I stopped my Benz car”)
    }

}
 
```
 
To run this program, we need another class and the main method. The latter is the entrance to every Java application.
 
```java
 
public class Main {

    public static void main() {

        Car car = new Benz();

        car.start();

        car.stop();

    }

}
 
```
 
In the main method, `Car` represents the interface class, and `Benz` represents the concrete class or child class. The child class gives its memory to the `Car` object to access its implemented methods. 

The `Benz` class implemented the start and stop behaviors of the `Car` class in the manner it wanted. This makes our application robust. We can change or add requirements to our application without breaking down the application.
 
For instance, we want to add another car that stops or starts differently. We can create a car, e.g. `Toyota`, that implements the class `Car`, overrides its `stop()` and `start()` methods, then implements them the way we want our `Toyota` to start and stop. 

There is no need to go into the `Car` class to change our code whenever there are new requirements. Now, that we’ve finally gotten abstraction off the list, on to the next one, encapsulation.
 
### Encapsulation
Imagine you are building an application, and the user can directly access and manipulate your data fields. How costly would that be? The outcome is better left to imagine than experience it.
 
Apart from inheritance and polymorphism *which I will write about in my next article*, encapsulation is another fundamental concept of OOP that every developer needs to get familiar with.
 
Encapsulation is simply the process of encapsulating and hiding the details of a class implementation from the user. Encapsulation is achieved by wrapping the class attributes or variables and the methods together as a unit.
 
Encapsulation makes for the security of an application as the user of a program cannot access the private variables. They can only do so using its public methods, usually accessor and mutator methods.
 
#### Accessor methods
These are methods that can access private variables of a class when they are called.
 
#### Mutator methods
These are methods that can set or give value to private variables whenever they are called.
 
Let’s use the following simple code snippet to explain this.
 
```java
 
public class Human {

    private String name;

    private int age;

    private String gender;

}
 
```
 
In the code snippet above, we declare all the fields and attributes of the class as private. This way, the client or the user can only access them using accessor or mutator methods. 

Accessor and mutator methods are known as **getter** and **setter** methods. So, for instance, to set and get the name of an object from the `Human` class, declare the following methods in the `Human` class.
 
```java
 
public void setName(String name) {
    this.name = name;
}

public String getName() {
    return name;
}
 
```
 
Since these methods are public, other classes can set and get names whenever an object is created from the Human class. Encapsulation secures our code by reducing how clients access our data or class contract.
 
You can use these two steps to implement encapsulation:
1.  Declare class attributes as private as we did in the code above.
2.  Provide public setter and getter methods.
 
### Differences between Abstraction and Encapsulation
The apparent differences between abstraction and encapsulation are:
- Abstraction hides the internal details of a program and shows only the functionality.
- Encapsulation wraps both code and data together.
- Abstraction hides complexity while encapsulation hides the internal working.
 
### Conclusion
In this article, we have learned the concept of abstraction and encapsulation, how to declare a class and create an object. 

We talked about how to implement abstraction and encapsulation, and we have also seen the differences between abstraction and encapsulation.

Happy coding!
 
### References
- Java - How to program 10th Ed-Early Object Version- Deitel
- Introduction to Java Programming (10th ed) Comprehensive Version [Liang- 2014-01-06]
- [Oracle java docs abstract methods and classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)
- [Oracle java docs OOP concept](https://docs.oracle.com/javase/tutorial/java/concepts/index.html)
- [w3schools abstract class](https://www.w3schools.com/java/java_abstract.asp)
- [w3schools encapsulation](https://www.w3schools.com/java/java_encapsulation.asp)

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)

