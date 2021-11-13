---
layout: engineering-education
status: publish
published: true
url: /method-overriding-and-overloading-using-covariant-return-type-in-java/
title: Method Overriding and Overloading using Covariant Return Type in Java
description: This tutorial will cover how to use a overriding and overloading method using covariant return type in java and its advantages.
author: mark-moki
date: 2021-10-12T00:00:00-17:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/method-overriding-and-overloading-using-covariant-return-type-in-java/hero.jpg
    alt: Method Overriding and Overloading using Covariant Return Type in Java
---
In an object-oriented programming language, return type covariance means that a method's return type can be replaced with a narrower one when overridden in a subclass or child class. It eliminates the need to cast or validate the return type when limiting the return type of a custom method. 
<!--more-->
Only non-primitive return types can use a covariant return type. Subclass methods can override base class methods by altering the return type of the overriding method. The term 'method overloading' refers to changing a method's arguments, which the article will discuss further.

### Table of contents
- [The Covariant Return type](#the-covariant-return-type)
- [Rules regarding covariant return type](#rules-regarding-covariant-return-type)
- [@override annotation](#override-annotation)
- [Advantages of Covariant Return Type](#advantages-of-covariant-return-type)
- [Method Overloading](#method-overloading)


### The covariant return type
The return statement returns control to the method's caller. Every Java method must have a return type stated before being used. A primitive type like `int`, `float`, `reference`, or `void` type can be the return value. 

As we said earlier, covariant return type means that a method's return type can be replaced with a narrower one when overridden in a subclass or child class. Here we will look deeper into how we can override methods using covariant return types.

#### Rules regarding covariant return type
For covariant return types, there are primarily three rules to keep in mind. 

Following is a list of them:
1. A subclass' overriding method should match its superclass or subclass' return type if the overriding method returns the same type.
2. Underlining methods in subclasses should not override methods in the parent class and vice versa.
3. A developer can only use the covariant return type for object types, not primitive ones.

To demonstrate covariant return type, let's look at how we can override a method by adjusting its return type.

```java
//base class
class Color{
    // method getcolor returns an object of type color
    public Color getColor(){
        Color s = new Color();
        
        return s;
    }
}
//this class will inherit from the class color and will override the getcolor() method returning the object of the type red class
class Red extends Color{
    @Override
    public Red getColor(){
        Red s = new Red();
        
        return s;
    }
}
```

The application above fails when the Base and Derived return types are swapped.

### @override annotation
Method overriding is declaring a method in a subclass that is already existent in the parent class. Overriding is used to allow a child class to override a parent class's implementation of a method. 

Overriding a method with an exception will require you to follow these three crucial guidelines while using Java. 

These are a few of them:
- Overridden methods can't throw checked or compile-time exceptions or unchecked or runtime exceptions if the overriding method doesn't use the throws clause.
- Overridden methods that throw unchecked or runtime exceptions can throw any uncontrolled runtime exception or the same exception as the overridden method.
- Subclass methods can subclass exceptions thrown by superclass methods, but subclass methods cannot subclass superclass exceptions, and subclass methods can throw any unchecked or runtime exception.

Suppose you don't utilize the `@Override annotation`. In that case, it won't cause any problems, meaning that when a superclass method (an overridden method) says it can throw an exception, any overrides must declare that they can throw the same type of exception or a subtype of that exception. 

It also has some advantages, which we will see below:
- It facilitates the reading of the code.
- It simplifies the program's maintenance.
- As a result, the return types are more explicit, reducing the need for typecasting.
- This code prevents `ClassCastExceptions` from happening to avoid the ClassCastException, which indicates the attempt of an object being cast to subclasses of which it is not an instance.

Let us now have a look at an example based on @override annotations:

```java
class Vehicle {
    Vehicle getObject() {
        System.out.println("The Base class method.");
        return new Vehicle(); 
    }
}

class Car extends Vehicle {
    //Overriding getObject method.
    @Override
    Car getObject() {
        System.out.println("Derived class method from Base class.");
        return new Car(); .
    }
}

public class Main {
    public static void main(String[] args) {
        Car lexus = new Car(); 
        lexus.getObject(); 
    }
}

```

#### Output

```bash
Derived class method from Base class.
```

Because classes are non-primitive return types, covariant types are only conceivable, and by so, you should note this.

#### Advantages of covariant return type
- It makes the code more accessible, legible, and manageable.
- As a result of the covariant return type, the method overriding might have more specific return types.
- `ClassCastExceptions` on returns are preventable by using a covariant return type at runtime.

### Method overloading
Method overloading refers to the process of changing the parameters of a method, as indicated earlier. The Java Virtual Machine (JVM) has always supported overloading based on the return type. 

Because the JVM looks up or resolves a method's full signature, this is acceptable in the JVM. Multiple methods of the same kind may exist in the same class. Covariant return types are supported and implemented by the java compiler (javac).

On the other hand, you can use the Java class file disassembler Javac to verify the code. The covariant return type in Java is made possible thanks to javac's adoption of this method. To support covariant return types, the JVM does not require any changes.

You can't only change the return type during method overloading. If we merely alter the return type, the compiler will have difficulty determining which function to use. As a result, changing the return type isn't an option.

The following are some advantages of method overloading:
- Overloading in Java is the ability to construct numerous methods with the same name but different parameters.
- The key benefit of this is that the code is more organized.
- The use of method overloading improves the readability of the application.

#### Disassembled Red class code
This code was generated by javac based on previous examples of Color and Red classes.

```java
class Red extends Color {
  Red();
  public Red getColor();
  public Color getColor();
}
```

### Conclusion
By declaring methods in Java as a child class or derived class and having a name that is the same as the parent class or base class and with the same amount of parameters, the overriding method is said to be invariant in terms of the return type. 

If the return type is a subclass of the overridden method's return type, we can override a method by modifying its return value. The primary method can be overloaded in Java, but the JVM only runs the original primary method; it never calls the overloaded main method.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
