---
layout: engineering-education
status: publish
published: true
url: /composition-in-java/
title: Getting Started with Composition in Java
description: In this tutorial the reader will learn how to use Composition in Java, some of the applications and the benefits.
author: emmanuel-kipchumba
date: 2021-11-24T00:00:00-15:50
topics: [Langugaes]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/composition-in-java/hero.jpg
    alt: Getting Started with Composition in Java Image
---
Like most OOP languages, Java does not allow multiple inheritances. This problem limits the programmer from applying code re-use with more objects with strong relationships or similar properties.
<!--more-->
To solve this problem, there is a property called `Composition`. Composition in Java exists when two or more objects relate to each other. One object, in that case, exists due to the existence of another.
### Composition in Java
It also occurs when a class references one or more objects of other classes in a single instance. For example, a `Class Car` is a composition of class Engine and class wheels and a `Class Body` is a composition of the class Heart, class Stomach, etc.
 
The examples above show that neither the class Engine nor the class Wheels can exist without the class Car. Likewise, the class Heart and Class stomach both depend on the class Body to exist.

There are two categories of classes. First, the `Parent class` is usually independent. For instance, the Class Car and the  Class Body are parent classes.

However, there is the dependent class that cannot exist without the presence of the parent class. This class is known as the `child class`. For example, `Class Engine`, `Class Wheels` from the parent `Class Car`, `Class Heart`, and the `Class Stomach` are child classes of the parent `class Body`.

### Features of Composition
Below are some of the common features available when interacting with composition.

1. It provides a `has-a` relationship between objects: Let us use the example of the car and the Engine to understand this. Both the car and the Engine are objects, but the Engine is contained in the car, meaning every car has an engine. In composition, one object must have the other hence the has-a relationship.

2. Code Re-use: This feature ensures code re-use. From the above example, the class engine, once written can be re-used on another object car. Since it will still contain the Engine and will require the engine class. This saves the programmer having to code the engine class for every car even though the attributes of the cars may be different.

### Implementation on Java
Now, we are going to learn how composition is applied in problem-solving. We will be using the `Intellij` IDE with the Java language. If you do not have [Intellij](https://www.jetbrains.com/idea/download/#section=windows), you can download it from the Jetbrains official Webpage.

We will create three classes: the Main Class, the Parent class, and the child class. We will be running the programs at the Main class and creating the methods and attributes at the parent and child classes. Therefore, ensure that all your classes are in the same package for a swift code execution.

```java
package org.kimcode.composition;

public class Engine {
    private String model;
    private int weight;
    private String color;
    private int price;


    public Engine(String model, int weight, String color, int price) {
        this.model = model;
        this.weight = weight;
        this.color = color;
        this.price = price;
    }

    public Engine(String rpm, int weight, String silver) {
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

```
We have created a class named `Engine` from the above code. We have allocated some attributes and given all the access specifiers `private` to make it only accessible by the class itself or via the getters from another class. We also have getters and setters to enable the attributes accessible from an outside class.

We will now create the parent class, which is the class Vehicle. Finally, we will link the `Class Engine` with the `Class Vehicle` by creating an Engine attribute.

```java
package org.kimcode.composition;

public class Vehicle {
    private String name;
    private String color;
    private int price;
    private int wheels;
    private Engine engine;


    public Vehicle(String name, String color, int price, int wheels, Engine engine) {
        this.name = name;
        this.color = color;
        this.price = price;
        this.wheels = wheels;
        this.engine = engine;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getWheels() {
        return wheels;
    }

    public void setWheels(int wheels) {
        this.wheels = wheels;
    }

    public Engine getEngine() {
        return engine;
    }

    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}

```

We have treated the child class Engine as an attribute, even though it is not. So we have initialized it, created a constructor for it, and created a getter and setter for it, just like any other attribute. Let us now create the Main class where we will run and implement the code. 

```java
package org.kimcode.composition;

public class Main {
    public static void main(String[] args) {
        Vehicle benz = new Vehicle("benz", "black", 200, 4,
                new Engine("high", 24,"silver"));
        Engine engine = benz.getEngine();
        System.out.println("I have a "+ benz.getColor()+" "+ benz.getName());
        System.out.println("With a weight of "+ benz.getEngine().getWeight()+" TONNES");
        System.out.println("The Price is "+ engine.getPrice());
    }
}
```

The Main class, java, enables you to run all the code in the package specified. You first create an object, the vehicle; for our case, we have a **Benz**. We also created an Engine. 

A preview of the full code as in the Intellij is as shown below:

![Main Page](/engineering-education/composition-in-java/main.png)

The output of the code is derived through composition.

### Difference between Composition and Inheritance
`Inheritance` is a property where an object acquires all the attributes and behaviour with similar properties, commonly known as `parent object`. 

Composition differs from inheritance in the following ways:
- Composition is based on a `has-a` relationship, while inheritance is based on an `is-a` relationship.
- With inheritance, you can extend your code to only one interface, but with composition, you can re-use your code multiple times.
- With composition, we can re-use code even with the final class, but it cannot be achieved with inheritance. 

Let us now use a code snippet to show how composition is evaluated.

```java
class Vehicle{
   String name="V8";
}
class Car extends vehicle {
   String type="Car";
   public static void main(String args[]){
      Car c=new Car();
      System.out.println("Name:"+c.name);
      System.out.println("Type:"+c.type);
   }
}
```

```java
public class Student {
}
public class College {
   private Student student;
   public College() {
      this.student = new Student();
   }
}
```

### Conclusion
This article went through how composition can be pretty helpful while coding. By utilizing code re-use, one can have a cleaner and more organized code with maximum characters. 

Composition helps locate bugs in your code since the neat arrangement enables straightforward code interpretation. Below are a few other critical concepts that we went over in the tutorial:
- Introduction to composition in Java.
- Features available in composition.
- Implementation of Composition using an example.
- Difference between Composition and Inheritance.

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
