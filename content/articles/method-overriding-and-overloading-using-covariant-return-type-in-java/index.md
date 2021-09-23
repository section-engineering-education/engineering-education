---
layout: engineering-education
status: publish
published: true
url: /method-overriding-and-overloading-using-covariant-return-type-in-java/
title: Method Overriding and Overloading using Covariant Return Type in Java
description: Using covariant return type, we can override a method in Java. As a result, the programmer is relieved of the burden of typecasting. This article will cover how to use covariant return type and its advantages in this tutorial.

author: mark-moki
date: 2021-09-16T00:00:00-15:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/method-overriding-and-overloading-using-covariant-return-type-in-java/hero.jpg
    alt: Method Overriding and Overloading using Covariant Return Type in Java
---

### Introduction
In an object-oriented programming language, `return type covariance` means that a method's return type can be replaced with a narrower one when it is overridden in a subclass or child class. It eliminates the need to cast or validate the return type when limiting the return type of a custom method. Only non-primitive return types can use a covariant return type.  Subclass methods can override base class methods by altering the return type of the overriding method. The term 'method overloading' refers to the process of altering a method's arguments, which will be discussed further in the article.
Table of content:
- [The Covariant Return type](#the-covariant-return-type)
- [Rules regarding covariant return type](#rules-regarding-covariant-return-type)
- [@override annotation](#override-annotation)
- [Advantages of Covariant Return Type](#advantages-of-covariant-return-type)
- [Method Overloading](#method-overloading)
### The Covariant Return type
The return statement returns control to the method's caller. Every Java method must have a return type stated before it can be used. A primitive type like int, float, a reference type, or a void type can be the return value. As we said earlier, covarint return type means that a method's return type can be replaced with a narrower one when it is overridden in a subclass or child class. Here we will will look deeper on how we can override methods using covariant return types.
### Rules regarding covariant return type
For covariant return types, there are primarily three rules to keep in mind. Following is a list of them.
1. A subclass' overriding method should match its superclass or subclass' return type if the overriding method returns the same type.

2. Underlining methods in subclasses should not override methods in the parent class, and vice versa.

3. The covariant return type can only be used for object types, not primitive ones.

To demonstrate covariant return type, let's look at how we can override a method by adjusting its return type.
```Java
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
> The application above fails when the Base and Derived return types are swapped.
### @override annotation
Method overriding is the act of declaring a method in a subclass that is already existent in the parent class. Overriding is used to allow a child class to override a parent class's implementation of a method. Overriding a method with an exception will require you to follow these three crucial guidelines while using Java. These are a few of them:

1. Overridden methods can't throw checked or compile-time exceptions or unchecked or runtime exceptions if the overriding method doesn't use the throws clause.
2. Overridden methods that throw unchecked or runtime exceptions can throw any unchecked or runtime exception, or the same exception as the overridden method.
3. Exceptions thrown by superclass methods can be subclassed by subclass methods, but superclass exceptions cannot be subclassed by subclass methods, and subclass methods can throw any unchecked or run-time exception.

If you don't utilize the `@Override annotation`, it won't cause any problems. This means that when a superclass method (an overridden method) says it can throw an exception, then any overrides must declare that they can throw the same type of exception or a subtype of that exception. It also has some advantages which we will see below:
- It facilitates the reading of the code.
- It simplifies the program's maintenance.
- As a result, the return types are more explicit, reducing the need for typecasting.
- This code prevents ClassCastExceptions from happening to avoid the ClassCastException, which indicates that an object has been attempted to be cast to subclasses of which it is not an instance.

Let us now have an example based on @override annotations
```Java
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
**OUTPUT**
```
Derived class method from Base class.
```
> Because classes are non-primitive return types, covariant types are only conceivable and by so you should note this.

### Advantages of Covariant Return Type
1. Making the code more accessible, legible, and manageable .

2. As a result of the covariant return type, the method overriding might have more specific return types.

3. ClassCastExceptions on returns can be prevented by using a covariant return type at runtime.
### Method Overloading
Method overloading refers to the process of changing the parameters of a method as indicated earlier.
The `Java Virtual Machine` (JVM) has always supported overloading based on the return type. Because the JVM looks up or resolves a method's entire signature, this is acceptable in the JVM. Multiple methods of the same type may exist in the same class. Covariant return types are supported and implemented by the java compiler (javac).
On the other hand, you can use the Java class file disassembler Javap to verify the code. The covariant return type in Java is made possible thanks to Javac's adoption of this method. To support covariant return types, the JVM does not require any changes.
> It's impossible for you to change only return type while method overloading. If we merely alter the return type, the compiler will have a difficult time determining which function to use. As a result, changing the return type isn't an option.
#### Disassembled Red class code
This code was generated by javac based on previous examples of Color and Red classes.
```
class Red extends Color {
  Red();
  public Red getColor();
  public Color getColor();
}
```
### Conclusion
By declaring methods in java as a child class or derived class and it has to have a name that is the same as the parent class or base class and with the same amount of parameters then the overriding method is said to be `invariant` in terms of the return type.
Only if the return type is a subclass of the overridden method's return type can we override a method by modifying its return value.

