# The concept of OOP In Java Getting Started with ABSTRACTION and ENCAPSULATION

In Java, everything is an object and as such; a real-life entity.

Object-Oriented Programming (OOP) unlike Procedural programming is an approach. Or a programming paradigm where everything is an Object (Real-life entities). OOP tries to model real-life objects.
Objects come from class, a form of generalization but the real thing is the Object. What then is a class?

Class is a template from which objects are created 

The process of creating Objects from a class is Instantiation

In this tutorial, you will learn about Abstraction, Encapsulation, Objects, and classes. 
The concept of OOP, to say the least, will be a nice piece to grab for absolute java beginners.

## Prerequisites

The reader should have:

- At least a basic knowledge of Java

- Have Java installed on your computer

- Have any IDE of your choice

## Objectives

At the end of this first OOP tutorial series readers should be able to:

- Differentiate between classes and objects

- Understand Abstraction and Encapsulation

- Create objects from classes

- Have a working knowledge of what OOP is about

- Create abstract classes and interfaces

### CLASS

A class is a template from which an object is created. A class serves as a blueprint for object creation.

The Class has instance variables as attributes or properties and instance methods as their behaviors or actions

Instance Variables: These are variables declared in the class, outside of methods and constructors. Instance variables have a global scope.

### Instance Methods: 

This is a method that can be invoked only by an Object of its class.

It is the class that defines what an object data fields or variables and methods will be.

Example of a class

For instance, a circle class

A circle has a radius from this, we can create different real-life objects of type circle. 

```java

public class Circle {

    //instance variable

 private double radius=2.5;

    //No argument constructor

    public Circle(){

    }

    //argument Constructor

    public Circle(double radius){

    this.radius = radius;

    }

    //method

    public double getArea(){

    return Math.PI*radius*radius; 

    }

    //method

    public  double getPerimeter(){

    return Math.PI*(2*radius);

    }

}

```

With this, we’ve created a very simple class called Circle,
The same goes for every other class like Car, Human, Animal, etc.
Creating a class means you have a template or blueprints from which you can create different Objects of the same class. A class in simple terms is a model. I hope you get this.

### OBJECTS

An object is an actual entity that has attributes and behaviors defined by its model.

For example circle, dog, fish, human, etc. 

Now that we’ve succeeded in creating a template for a Circle, creating circles of different sizes of our choice becomes easy.

```java

public class CircleSize {

 //entry point to every Java application

    public static void main(String[] args){

       Circle smallCircle = new Circle();

       /*The new keyword used here means a new object of type class is created and saved in the variable smallCircle of reference type Circle*/

       //to get the area of your newly created circle

     System.out.println("The area of this circle is " + smallCircle.getArea());

       /*you can also decide to use an arg constructor to construct your new circle*/

      Circle bigCircle = new Circle(2.5);

       System.out.println("The area of this circle is " + bigCircle.getArea());

    }

}

```

The same thing applies if you want to create an Object of Dog.

The dog should have a name, color, age, and breed.

The dog should be able to sleep, eat, run, or bark.

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

   public boolean isSleeping(){

       System.out.println("Sleeping");

       return true;

   }

   public boolean isEating(){

       System.out.println("Eating");

       return true;

   }

   public boolean isbarking(){

       System.out.println("Dog barking...");

       return true;

   }

   public boolean isRunning(){

       System.out.println("Dog running");

       return true;    

   }   

}

```

To create a new dog object

```java

public class Dog_Main {

  public static void main(String[] args) {

      Dog littleDog = new Dog("Bingo", 6,"Brown", "German Shepherd");

      System.out.println("Is the dog running:? "+ littleDog.isrunning());

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

Now you see, we’ve created a new dog with the name Bingo, you can go on to create as many dogs with different states or attributes.

Here is the output

Dog running

Is the dog running:? true

Sleeping

is the dog sleeping:? true

Dog barking...

Is the dog barking:? true

Eating

Is the dog eating:? true

The dog name is: Bingo

Now that we’ve got this out of the way, let's talk about Abstraction and Encapsulation properly.

# ABSTRACTION

Who could have imagined that Abstraction will be a thing in programming? Who? But right now you can’t talk about OOP without mentioning Abstraction. It is a major building block of OOP. So then, what is Abstraction? In this section, I will explain what Abstraction is and how to use it as a Java developer.

In Abstraction, only the useful attributes of an object are on display or accessible. The unnecessary details are “hidden”.
For example, while you’re typing on your computer. You’re only interested in punching the keys believing that it produces results on your screen but you know nothing about the mechanism that produces the result and I’m sure you haven’t even thought about it yet. Have you? 
Another example to make things clearer,  imagine a car driver, he is only interested in starting, moving, and stopping the car. Accelerate or change gear and brake but he is not interested in the mechanism that works internally to perform all the above functions. Simply, in abstraction, the implementation details are hidden from the user while the functionality is exposed to the user. 
The while the user will only know what a function(method in java) does but not how it does it.

How to implement Abstraction in Java

In Java, abstraction is implemented in either of these two ways

- By using the non-access modifier ‘abstract’ keyword. 

- Interface

- Non-Access Modifier keyword “Abstract” Implementation

The abstract access modifier keyword can only be used with classes, methods but not with variables. Methods with the keyword abstract are methods without implementation.

To implement an abstract class in Java, use the abstract keyword e.g public abstract class Circle, where Circle is the class name. 
Use this pattern for abstract method implementation, public abstract returnType methodName() i.e public abstract double getArea().

Code snippet

```java

public abstract class Dog {

   public abstract void run();

}

```

With the above code snippet, we've created an abstract class and an abstract method but one pertinent feature of abstract class is that objects cannot be instantiated or created from it. But don’t forget, classes only exist to create an object. To be able to create an object from an abstract class. We have to create a new class that inherits from the superclass(base, parent) class by using the extends keyword.

Code snippet

```java

public class MainDog extends Dog {

   //abstract method body definition

   public void run(){

       //in this class the method is implemented

       System.out.println(“Dog is running”);

   }

   public static void main(Strings [] args){

       MainDog dog = new MainDog();

       //abstract method invocation

       dog.run();

   }

}

```

- Interface implementation

An interface contains public, abstract method signatures (methods without implementation). It is also important to note that interfaces have no constructor and may contain final and static variables. Abstraction implementation by the interface method is made possible by the use of the Implements keyword.

A parent class is inherited by a child class known as the client code which overrides the parent’s method signature and provides a method body.

```java

public interface Car{

   public void start();

   public void stop();

} 

public Benz implements Car{

   /*@Override to override the stop method in the car class that has no implementation*/

   @Override 

   public void start(){

       System.out.println(“I started my Benz car ”);

   }

   /*to override the stop method in the car class that has no implementation*/

   @Override 

   public void stop(){

       System.out.println(“I stopped my Benz car”)

   }

}

```

To run this program, we need another class and the main method, the latter is the entrance to every Java application.

```java

public class Main{

   public static void main(){

       Car car = new Benz();

       car.start();

       car.stop();

   }

}

```

In the main method. The Car represents the interface class. Benz represents the concrete class or child class. The child class gives its memory to the Car object to have access to its implemented methods. The Benz class implemented the start and stop behaviors of the Car class in the manner it wanted. This makes our application robust. We can change or add requirements to our application without breaking down the application.
For instance, we want to add another car that stops or starts differently, we can create a car class say Toyota that implements class Car. Override its stop, start methods and implements it the way we want our Toyota to start and stop. There is no need to go into the Car class to change our code whenever there are new requirements.

Now, that we’ve finally gotten abstraction off the list, on to the next one, Encapsulation.

# ENCAPSULATION

Imagine, you are building an application and the user can directly access and manipulate your data fields, how costly would that be? The outcome is better left to imagine than experience it.

Apart from Inheritance and Polymorphism which I will write about in my next article. Encapsulation is another fundamental concept of OOP that every developer needs to get familiar with.

Encapsulation is simply the process of encapsulating and hiding the details of a class implementation from the user. Encapsulation is achieved by wrapping the class attributes or variables and the methods together as a unit.

Encapsulation makes for the security of an application as the user of a code cannot access the private variables of an encapsulated class except through its public methods which in most cases are the accessor and mutator methods.

Let’s use a simple code to explain that.

Code snippet

```java

public class Human{

   private String name;

   private int age;

   private String gender;

}

```

From the code snippet above, all fields or attributes of the class are declared private and so the client or in simple terms, the user cannot use or access the class attributes or fields except through the accessor or mutator methods popularly known as ‘Getter’ and ‘Setter’ methods respectively. So, for instance, to set and get the name of an object from the human class, declare the following methods in the Human class.

```java

public void setName(String name){

   this.name = name;

}

public String getName(){

   return name;

}

```

As these methods are public other classes can set and get names whenever an object is created from the human class. Encapsulation secures our code by reducing how clients access our data or class contract.

In general, these two steps can be used to implement Encapsulation:

-  Declare class attributes as private as we did in the code above

-  Provide public setter and getter methods. To access or manipulate instance variables, remember the setName() and getName method?

### Difference between Abstraction and Encapsulation

The obvious differences between abstraction and encapsulation are:

Abstraction hides the internal details of a program and shows only the functionality

Encapsulation wraps both code and data together

Abstraction hides complexity while encapsulation hides the internal working

# Conclusion

To this point, we’ve demystified the concept of OOP. To say the least, abstraction and encapsulation are two sides of the same coin. I hope you find this insightful. I hope to write about Inheritance and Polymorphism in my next OOP concept article.

### References

Java- How to program 10th Ed-Early Object Version- Deitel

Introduction to Java Programming (10th ed) Comprehensive Version [Liang- 2014-01-06]

[oracle java docs](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)

[oracle java docs](https://docs.oracle.com/javase/tutorial/java/concepts/index.html)

[w3schools]([https://www.w3schools.com/java/java_abstract.asp)

[w3schools](https://www.w3schools.com/java/java_encapsulation.asp)