### Introduction
 
Java is an object-oriented programming language since it provides Java developers with the ability to implement objects as real-life entities. OOP (object-oriented programming) is a programming paradigm built around objects and their properties (attributes) and behaviors (methods). So, generally, software design using object-oriented principles is focused on objects and operations on them. Amongst many features of object-oriented programming is the fact that it encourages code reusability and extensibility. We will explain these two terms in detail later. In this article, we will explain two core OOP principles in inheritance and polymorphism.
 
### Prerequisites
 
The reader should have:
- A basic understanding of Java programming
- Java installed on their computer
- An IDE of their choice
 
### Objectives
 
At the end of this tutorial, the reader should understand:
- What is an inheritance
- Multiple inheritances
- Inheritance hierarchy
- What is polymorphism
- The importance of polymorphism and inheritance
- Implementation of inheritance and polymorphism in Java
 
To get started, read [this article](https://www.section.io/engineering-education/oop-in-java-abstraction-and-encapsulation/) to have an understanding of how to create objects from classes.
 
### What is inheritance?
 
Imagine you want to design a class to create Car objects such as Toyota, Benz, Rolls Royce, etc. All car objects have the same properties and behaviors. All cars can move (drive), honk, accelerate, and they all have a name and engine number. Instead of creating these classes individually, a general car class (superclass) that has all the attributes and behaviors of a car can be used to model all car objects. The other classes then inherit or are created based on the superclass attributes and methods. In a nutshell, inheritance lets you build classes based on other classes, and avoid duplication and repeating code. Here is some code to explain the above illustration:
 
```java
// Declare a car superclass
public class Car {
    private int speed;
    private String name;
    private String color;
    private int enginePower;

    public Car() {

    }

    public void accelerate() {
        System.out.println("The car is accelerating…");
    }

    public void setSpeed(int speed) {
        System.out.println("The car is " + speed);
    }

    public int getSpeed() {
        return speed;
    }
}

// Declare a sub car class
public class Toyota extends Car {
    private int registrationNumber;
    private int engineNumber;


    public Toyota() {
        // Toyota constructor calling the constructor of the superclass
        super();
    }
}
```
 
The keyword `extends` implies that the `Toyota` class inherits from and is a child of the Car class. The Toyota class has both the attributes and methods of the Car class as well as its own. This is the core principle of inheritance; it supports the concept of code reusability. The code snippet below shows how the `Toyota` object can access both the attributes and methods in the superclass `Car`:
 
```java
public class Main {
    public static void main(String[] args) {
        // This is the setSpeed() and accelerate() method in the Car class being accessed by the Toyota object.
        Toyota myToyota = new Toyota();
        myToyota.setSpeed(3);
        myToyota.accelerate();
    }
}
```
 
It is proper to say that a subclass is a specialized version of the superclass. As a generally accepted Java programming approach, before we create an object, it must be declared as a given type, that is the class that the object is an instance of. Inheritance changes this through the *polymorphic substitution* principle. The polymorphic substitution principle states that wherever an object of a given type is needed in an expression, it can be substituted for by an object which is a subclass of the given type. Below is a code snippet to illustrate the polymorphic substitution principle:
 
```java
Car myToyota = new Car();
// An object of type Car is assigned to a variable of type Car or
Car myToyota1 = new Toyota();
```

An object of type Toyota is assigned to a variable of type Car. This is possible because Toyota is a subclass or a descendant of Car. The principle of polymorphic substitution cannot hold in the reverse direction. That is, a Car object can not be used in place of a Toyota object. For instance, the code below will cause a compilation error:
 
```java
Toyota myToyota = new Car();
/* Every Toyota is a Car but not every car is a Toyota */
```
It is now time to look at types of inheritance but before that, let me make one point clear. When a method in the superclass is overridden in the subclass, the superclass method is accessible in the base class using the `super` keyword followed by a period. The code snippet below illustrates this:
 
```java
public class Toyota extends Car{
    public void accelerate() {
        super.accelerate();
        System.out.println("Toyota is accelerating");
    }
}
```
### Types of Inheritance
 
These are the types of inheritance in Java:
 
1. Single Inheritance
2. Multiple inheritance
3. Multi-level inheritance
4. Hierarchical inheritance
 
#### Single Inheritance
 
In this kind of inheritance, the subclass only inherits properties and methods from a single parent class. The subclass can also add more features to the existing code. The example below illustrates single inheritance:
 
```java
public class SectionStudent {
    // Declare your instance variables and methods here
}

public class SectionInheritance extends SectionStudent {
    // Declare your instance variables and methods here
}
```
In single inheritance, the class `SectionInheritance` only inherits from `SectionStudent`.
 
#### Multiple Inheritance
 
In Java, multiple inheritance is not allowed although it can be implemented through the use of interfaces. Multiple interfaces can be implemented in Java but only one class can be extended.
 
#### Multi-level Inheritance
 
In multi-level inheritance, a subclass serves also as a base class for yet another subclass. For instance, say a vehicle class is serving as a superclass for every moving machine including a car, and a car also serves as a superclass for specific kinds of cars like Toyota, Benz, etc. This is the concept of multi-level inheritance. The code snippet below illustrates this:
 
```java
public class Vehicle {
    // Do something
}
public class Car extends Vehicle {
    // Do something
    // At this point Car is a subclass of Vehicle
}
public class Benz extends Car {
    // Here car is now a superclass
}
```
#### Hierarchical Inheritance
 
This is a type of inheritance in which more than one class is based on a superclass. For instance, a `Benz` class inherits from a `Car`, a `Toyota` class inherits from a `Car` and the list continues. In simpler terms, hierarchical inheritance is the kind of inheritance in which the parent is inherited by different classes:
 
```java
public class Car {
    // Write your methods here
}
public class Benz extends Car {
    // Write your methods here
}

public class Porsche extends Car {
    // Write your methods here
}
```
 
#### Notes on Inheritance
 
1. Constructors are not inherited
2. Private members of a class are not inherited
3. Final methods are inherited but cannot be overridden
4. All public and protected members and fields are inherited
 
We’ve been able to explain inheritance and the inheritance hierarchy. Now let us focus on polymorphism.
 
### Polymorphism and its Implementation
 
Polymorphism, as the name implies, is the ability to take multiple forms or shapes. Polymorphism is an object-oriented programming concept that allows you to treat objects that share the same superclass, whether directly or indirectly, as though they were objects of the superclass. In inheritance, we inherit superclass methods while polymorphism makes use of the methods in different forms.
 
Suppose we create a program that mimics the movement of animals. Classes `Dog`, `Fish`, `Bird`, and `Snake` for example, move differently even though they all implement the `move` method in the superclass animal. The code snippet below gives a vivid illustration to the statement above:
 
```java
public class Animal {
    public void animalMove() {
        System.out.println("Animal move");
    }
}

public class Dog extends Animal{
    public void animalMove() {
        System.out.println("Dog is running");
    }
}

public class Fish extends Animal{
    public void animalMove() {
        System.out.println("Fish is swimming");
    }
}

public class Bird extends Animal{
    public void animalMove() {
        System.out.println("Bird is flying");
    }
}

public class Snake extends Animal{
    public void animalMove() {
        System.out.println("Snake is crawling");
    }
}
```
To test whether the above code applies polymorphism let’s use the main method to test it.
 
```java
public static void main(String[] args) {
    Animal animal = new Animal();
    animal.animalMove();

    Animal dog = new Dog();
    dog.animalMove();

    Animal fish = new Fish();
    fish.animalMove();

    Animal bird = new Bird();
    bird.animalMove();

    Animal snake = new Snake();
    snake.animalMove();

}
```
The following will be printed out on our console when we run this application:
 
```
Animal move
Dog is running
Fish is swimming
Bird is flying
Snake is crawling
```
### Types of Polymorphism 
 
There are two types of polymorphism and they are listed below:
 
1. Compile-time polymorphism
2. Run-time polymorphism 
 
#### Compile-time Polymorphism
 
At compile time, when the compiler encounters a method call, it checks the object’s type to determine if it can make that call. If the class contains the method or inherits one, then the program is compiled. One major application of compile-time polymorphism is in Java’s *method overloading*.
 
#### Method Overloading
 
This is a concept in which methods are declared with the same name but with different parameter types. The method called is determined at compile time hence the words *compile-time* in the name. Here is an example:
 
```java
public class MathAddition {
    public int sum(int a, int b, int c) {
        return a + b + c;
    }

    public int sum(int x, int y) {
        return x + y;
    }
}
```
From the above code snippet, the method `sum` was declared twice. Assuming `sum` was called by an object of type `MathAddition`, which do you think will be invoked? The answer is simple, the method invoked is determined by the number of arguments passed at compile-time, as shown below:
 
```java
public static void main(String []args){
    MathAddition addition = new MathAddition();
    System.out.println(addition.sum(3, 3, 3));
}
```
The result of the above method call will be `9`. Remember we have two methods with the same name and different parameters but at invocation, three arguments were passed into the method so the method with the three parameters was executed. This is compile-time polymorphism.
 
#### Runtime Polymorphism
 
This is the kind of polymorphism that occurs at runtime. In runtime polymorphism, two methods with the same name exist in two different classes, unlike compile-time polymorphism where both methods existed in the same class. In runtime polymorphism, one class is the parent class and another the subclass. A perfect application of runtime polymorphism is seen in *method overriding*.
 
#### Method Overriding
 
This is a concept in which a method declared in the parent class is given a different implementation in the subclass. At runtime, the method invoked is determined by the object being created and not by the reference type. This code snippet illustrates method overriding:
 
```java
public class Animal {
    public void animalRun() {
        System.out.println("Animal is running");
    }
}

public class Bird extends Animal {
    public void animalRun() {
        System.out.println(“Bird is running”);
    }
}

public class Main {
    public static void main(String[] args) {

        // This will invoke the method in the Animal superclass
        Animal newAnimal = new Animal();
        newAnimal.animalRun();

        // This will invoke the method in the Bird subclass
        Animal birdAnimal = new Bird();
        birdAnimal.animalRun();

    }
}
```
 
At runtime, the `birdAnimal` object will invoke the method `animalRun()` in the `Bird` subclass since the object created is of type `Bird`.
 
Now that we have exhaustively talked about inheritance, polymorphism, and their types, let us go ahead and talk about the difference between them.
 
### The Difference Between Inheritance and Polymorphism
 
In inheritance, we create new classes that inherit features of the superclass while polymorphism decides what form of method to execute. Inheritance applies to classes whereas polymorphism applies to methods.
 
### The Importance of Polymorphism and Inheritance
 
Below are a few reasons why polymorphism and inheritance are important OOP concepts:
- Inheritance encourages class hierarchy
- Inheritance encourages code reusability
- Polymorphism makes for simplicity
- Polymorphism encourages code extensibility
 
### Conclusion
 
In this article, we have learned about the concept of inheritance and polymorphism. We talked about the types of inheritance and polymorphism and their implementation. We also talked about their differences.
 
### References
 
- Java - How to program 10th Ed-Early Object Version- Deitel
- [OOP in Java - Getting Started with Abstraction and Encapsulation](https://www.section.io/engineering-education/oop-in-java-abstraction-and-encapsulation/)
