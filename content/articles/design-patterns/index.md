---
layout: engineering-education
status: publish
published: true
url: /design-patterns/
title: Understanding Design Patterns in Java
description: This articles will discuss what a design pattern is. A desgin pattern is a reusable solution to a commonly occurring problem in software design. They can be thought of as guidelines for how to structure your objects and the relationships between them. 
author: kiplangat-erick
date: 2021-01-24T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/design-patterns/hero.jpg
    alt: Design patterns
---
A design pattern is a reusable solution to a commonly occurring problem in software design. They can be thought of as tried and tested approaches; guidelines for how to structure your objects and the relationships between them. These guidelines are not too opinionated, they are implementation specific and are meant to be used with any programming language while designing any kind of system.
<!--more-->
### What are design patterns?
[Design patterns](https://en.wikipedia.org/wiki/Design_Patterns) were invented by a group of software engineers known as The [Gang of Four](https://www.journaldev.com/31902/gangs-of-four-gof-design-patternss) in their book, Elements of Reusable Object-Oriented Software. 

They created 23 design patterns and revolutionized the way people design software. Though the book was written in a C++ context, it is still relevant to Java programmers. Let us discuss some of the most popular design patterns and how to implement them in Java using simple examples.

### The Singleton pattern
The Singleton pattern is perhaps the most popular and controversial design pattern. It is the design pattern where only one instance of a class is allowed to exist globally. This single instance is used wherever it is needed without creating a new one. 

The class is responsible for preventing any other objects from creating new instances of it. It is also responsible for presenting the single instance to any class that might need it. This pattern is useful in situations such as, when working with a database where having more than one object might bring about inconsistencies.

Let's see how we can implement it in Java:
```java
public class Database {
    private static Database _instance = null;

    private Database() { //make the constructor private so that only code that's inside this class can call it.
    }

    public static Database getInstance() {
        if (_instance == null) { // check if the instance already exists. If it has not been instantiated, create the instance.
            _instance = new Database();
        }

        return _instance; //if the instance is not empty, return the instance that exists.
    }
}
```

When you are using multiple threads, this style of creating a Singleton is not the best; multiple threads might get a hold of different instances of our singleton.

There are two ways we can avoid this:
1.  Find a way to make the getInstance method synchronized.
2.  Create the instance of the Singleton class as soon as the class is loaded to the JVM.

#### Limitations of the Singleton pattern
Singletons introduce a global state that brings about tight coupling, which makes unit testing difficult. Coupling is the degree of interdependence between software modules. A tightly coupled system is one where classes are highly dependent on one another.
 
### The Factory pattern
This pattern separates the process of creating concrete objects from the client that uses said objects; the client does not know about the creation logic.
It reduces the dependency of the client on the implementations.

To implement a simple factory, we need at least three things:
1. A factory.
2. The products a factory makes.
3. The client that uses it.

Here is a basic example of how the factory pattern can be implemented. Say you wanted to create smartphones in an object-oriented, non-modular way.

To keep our example super simple, we'll start with only three types of phones:
```java
enum PhoneType {
    SAMSUNG, IPHONE, BLACKBERRY
}
```

Then your Phone class looks like this:
```java
abstract class Phone {
    PhoneType type = null; 

    @Override
    public String toString() {
        return "Phone Type -" + type;
    }

    abstract void construct();
}
```

The phone class is an abstract class because we want its children to inherit some base functionalities (please note that this is just a simplified example, you might have complex real-world objects in your project).

It's children are:
```java
class Samsung extends Phone {
    Samsung() {
        this.type = PhoneType.SAMSUNG;
    }

    @Override
    void construct() {
        System.out.println("created a new Samsung!");
    }
}

class Iphone extends Phone {
    Iphone() {
        this.type = PhoneType.IPHONE;
    }

    @Override
    void construct() {
        System.out.println("created a new Iphone!");
    }
}

class BlackBerry extends Phone {
    BlackBerry() {
        this.type = PhoneType.BLACKBERRY;
    }

    @Override
    void construct() {
        System.out.println("created a new Blackberry!");
    }
}
```

The next thing we are going to create is a `PhoneFactory` class:

In the `PhoneFactory` class below, you'll notice that the getPhone method takes a parameter representing which class to instantiate.
```java
class PhoneFactory {
    static Phone getPhone(PhoneType type) {
        Phone phone = null;
        phone = switch (type) {
            case IPHONE -> new Iphone();
            case BLACKBERRY -> new BlackBerry();
            case SAMSUNG -> new Samsung();
        };
        return phone;
    }
}
```

The instantiation logic is hidden from the client, all the client has to do is make a call to the factory class, and the factory class instantiates the object then returns it:
```java
/*
in your client class, say you wanted to create a new Blackberry phone,
*/
Phone blackberry = PhoneFactory.getPhone(PhoneType.BLACKBERRY);
```
### Limitations of the Factory pattern
As you've seen above, the Factory pattern makes code less readable as it introduces a layer of abstraction.
You're also forced to add some decision logic when deciding which object to create, which adds a bit of ugliness to your code (think of a situation where you have more than 10 different types of phones to create, and the number of if statements you'd have to write!)

### The Abstract Factory pattern
The Abstract Factory pattern introduces another layer of abstraction over the Factory pattern. It uses a Factory of Factories that creates other Factories. Using our example from earlier on, let's say we wanted to add the production of generic cellphones to our system, again this example might not reflect a real-life use case but for the sake of learning, let's go with it.

Cellphones are the ones we used before smartphones took over, they share some functionalities with modern smartphones but they lack some features. To be clear on the distinction, we are going to have two factories, one for SmartPhones, another for CellPhones. 

We'll store the types in an enum:
```java
enum FactoryType {
    SMART_PHONE_FACTORY, CELL_PHONE_FACTORY
}
```

Let's create the Factory classes, we're going to use an abstract Phone Factory class so that the `PhoneFactory` classes will inherit some shared functionalities that they might have.
```java
abstract class AbstractPhoneFactory{
   abstract Phone getPhone(PhoneType type);
}

```
The SmartPhone Factory class:
```java
class SmartPhoneFactory extends AbstractPhoneFactory {

    @Override
    Phone getPhone(PhoneType type) {
        Phone phone = switch (type){
            case IPHONE -> new Iphone();
            case SAMSUNG -> new Samsung();
            case BLACKBERRY -> new BlackBerry();
            default -> null;
        };
        return phone;
    }
}
```

The CellPhone Factory class:
```java
class CellPhoneFactory extends AbstractPhoneFactory{

    @Override
    Phone getPhone(PhoneType type) {
        return null;
    }
}
```

These factory classes are the same we used before; they each have methods that take in a PhoneType object and some decision logic used when creating new Instances.

Next we are going to create a Factory generator class:
```java
class FactoryGenerator{
    static AbstractPhoneFactory getFactory(FactoryType factoryType){
        switch (factoryType){
            case CELL_PHONE_FACTORY :
                return new CellPhoneFactory();
            case SMART_PHONE_FACTORY :
                return new SmartPhoneFactory();
        }
        return null;
    }
}
```

This generator class has a static method that takes in a FactoryType object, makes some decisions then returns instances of the required factory. As you can see, it looks just like the Factory classes used to create the Products i.e Phones, only that it creates Factories.

When using it within a client class, say we want to create a new Blackberry Phone:
```java
Phone blackberry = FactoryGenerator.getFactory(FactoryType.SMARTPHONEFACTORY).getPhone(PhoneType.BLACKBERRY);
```
### Limitations of the Abstract Factory pattern
One drawback of this is pattern is extensibility; it is difficult to extend abstract factories to produce new kinds of products. 

### Conclusion
In this article, we introduced three design patterns and how to implement them in Java. Learning about design patterns can help you become a better developer and may give you an edge over others in an interview.

Since this article is by no means exhaustive, I hope it has helped get your feet wet as there's a whole world of design patterns out there.

To get the full picture, a deeper understanding, and perhaps prep for an interview, here are a few relevant links:
1. [Design Patterns](https://sourcemaking.com/design_patterns)
2. [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8)
3. [Free course](https://courses.caveofprogramming.com/p/java-design-patterns-and-architecture)

---
Peer Review Contributions by: [Mike White](/engineering-education/authors/mike-white/)
