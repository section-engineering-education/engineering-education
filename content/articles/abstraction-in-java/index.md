---
layout: engineering-education
status: publish
published: true
url: /abstraction-in-java/
title: Abstraction in Java
description: This article will go through how we can accomplish complete data abstraction using interfaces and Java abstract class and methods. Abstraction refers to process of exposing the vital elements of a software while obscuring the background details from the user.
author: wato-sole
date: 2021-08-22T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/abstraction-in-java/hero.jpg
    alt: Abstraction in Java  Hero Image
---
### Introduction
**Abstraction** refers to the process of exposing the vital elements of software while obscuring the background details from the user. Only the essential details are displayed to the user while the non-essential or trivial are hidden because the user is not required to know them. 
<!--more-->
**Data abstraction** is the process of displaying only the [necessary components of an object while eliminating all other information](https://www.geeksforgeeks.org/abstraction-in-java-2). 

An object's characteristics and behaviors differentiate it from other objects of the same type, as well as classify and group them. 

Using a simple example, we can think of abstraction like driving a vehicle. We only deal and know what is required of us but don’t know the mechanism behind the movement. 

Interfaces and abstract classes are [used in Java to achieve abstraction](https://astikanand.github.io/techblogs/java/object-oriented-programming). This article will go through how we can accomplish complete data abstraction using interfaces and Java abstract class and methods.

### Prerequisites
Before you begin reading this article, you will need the following:
- A basic understanding of Java.
- An IntelliJ integrated development environment.

### Table of contents
1. [Ways to achieve data abstraction](#ways-to-achieve-data-abstraction)
2. [Java abstract class](#java-abstract-class)
3. [Java abstract method](#java-abstract-method)
4. [Interfaces in Java](#interfaces-in-java)
5. [Advantages of abstraction](#advantages-of-abstraction)
6. [Encapsulation vs Data Abstraction](#encapsulation-vs-data-abstraction)

Let us jump right into it:

### Ways to achieve data abstraction
As we had mentioned earlier, we can achieve data abstraction using two ways:
1.	Abstract class (0 to 100%)
2.	Interface (100%)

### Java abstract class
An abstract class is a class that is declared as `abstract`. Methods that are both abstract and non-abstract can be used. 

It requires expansion and implementation of its method. It isn't possible to instantiate it.

Here are a few points to note about abstract classes in Java:
- The abstract keyword must be used when declaring an abstract class.
- Methods that are both abstract and non-abstract can be used.
- It isn't possible to instantiate it.
- Constructors and static methods may also be included. The abstract class can have parameterized constructors, but it will always have a default constructor.
- There can't be any objects in an abstract class. So, we cannot use the new operator to explicitly instantiate an abstract class.
- This can have end methods, which prevent the subclass from altering the body of the function.

#### Syntax of abstract class

```Java
abstract class M{} 
``` 
We simply use the `abstract` keyword before the class keyword in the class declaration to create an abstract class.

### Abstract method in Java
The term "abstract method" refers to a [method that is declared but not implemented](https://astikanand.github.io/techblogs/java/object-oriented-programming). 

A method that is specified as abstract must always be redefined in the subclass, [forcing overriding or making the subclass abstract](http://web.archive.org/web/20210418171932/https://www.geeksforgeeks.org/abstraction-in-java-2). 

If you want a method in a class, but the implementation of that method to be determined by child classes, make the method an abstract in the parent class.

#### The abstract method's syntax

```Java
abstract void displayStatus();//no method body and abstract 

```

To define a method abstract, in the method declaration, place the abstract keyword before the method name. an abstract method is terminated with a semicolon `;` instead of curly braces, 

### When should you utilize abstract classes and methods?
In certain circumstances, we'll want to create a superclass that declares the structure of abstraction without implementing all its methods. 

That is, there will be occasions when we wish to construct a superclass that defines a generalization form that all its subclasses will use. This leaves it up to the subclasses to fill in the blanks.

#### Example to demonstrate when to use abstract class and method
Consider the traditional "shape" example, which could be found in a computer-aided design system or a gaming simulation. 

"Shape" is the base type, and each form has its color, size, and other attributes. Specific sorts of shapes-circle, square, triangle, and so on-are derived(inherited) from this, each of which may have extra properties and behaviors. 

Certain shapes, for example, can be flipped. When you wish to determine the area of a shape, for example, some characteristics may be different. The type hierarchy encapsulates both the differences and similarities amongst the shapes.

```Java
// Java code that demonstrates
// how to implement abstraction

// Abstract class
abstract class Shapes {
	String color;

	// Here are abstract methods
	abstract double area();
	public abstract String toString();

	// Abstract class constructor
	public Shapes(String color)
	{
		System.out.println("Calling the shapes constructor");
		this.color = color;
	}

	//Concrete method
	public String getColor() { return color; }
}
class Circles extends Shapes {
	double radius;

	public Circles(String color, double radius)
	{

		// Shapes constructor called
		super(color);
		System.out.println("Calling the circles constructor");
		this.radius = radius;
	}

	@Override double area()
	{
		return Math.PI * Math.pow(radius, 2);
	}

	@Override public String toString()
	{
		return " The circle color is " + super.getColor()
			+ "and the area is : " + area();
	}
}
class Rectangles extends Shapes {

	double l;
	double w;

	public Rectangles(String color, double l,
					double w)
	{
		// Shapes constructor call
		super(color);
		System.out.println("Calling the rectangles constructor");
		this.l = l;
		this.w = w;
	}

	@Override double area() { return l * w; }

	@Override public String toString()
	{
		return "Color of rectangles is " + super.getColor()
			+ "and area is : " + area();
	}
}
public class Test {
	public static void main(String[] args)
	{
		Shapes s1 = new Circles("Red", 2.2);
		Shapes s2 = new Rectangles("Yellow", 2, 4);

		System.out.println(s1.toString());
		System.out.println(s2.toString());
	}
}
```

The output will be:

```bash
Calling the shapes constructor
Calling the circles constructor
Calling the rectangles constructor
The circle color is Red and the area is: 15.205308443374602
Color of rectangles and area is: 8.0
```

### Interfaces in Java
Methods and variables can be declared in an interface, like they can in a class, but the [methods declared in an interface are abstract by default](https://dev.to/kuljeet/multiple-inheritance-in-java-1fmo).

Here are some points to note on interfaces in Java:
- Interfaces define what a class must do, not how it must do it. It is the course's plan.
- A Player, for example, is an interface that any class that implements must be able to (or must implement) movement. As a result, it provides a [suite of methods that must be implemented by a class](https://www.studocu.com/en-us/document/creighton-university/data-structures/data-structures-study-guide/6072883).
- The class must be abstracted if it implements an interface but does not include method bodies for all the interface's functions.

A Java library such as `Comparator Interface` is an example. This interface is used to sort a collection if a class applies it.

#### The syntax of interfaces is as follows:
```Java
interface <interfacename> {
    // declaration of constant fields
    // declaration of methods that are abstract 
    // by default.
}
```

An interface is [declared with the interface keyword](http://www.geocities.ws/rajindery/java/cert/jnotes.txt). Its purpose is to attain the highest level of abstraction possible.

All fields in an interface are [public, static, and final by default, and all methods in an interface are public and defined with an empty body](http://www.geocities.ws/rajindery/java/cert/jnotes.txt). 
 
All the interface's functions must be implemented by a class that conforms to the interface. We use the keyword `implement` to describe the implementation of an interface.

#### What's the point of utilizing a user interface?
It's a technique for achieving complete abstraction. Because java does not provide multiple inheritances in the case of classes, [multiple inheritances can be achieved by using interfaces](https://astikanand.github.io/techblogs/java/object-oriented-programming). 

It is also used for loose coupling.

#### Example to demonstrate the use of interfaces

```Java
// Java program to illustrate the working of
// interface.
import java.io.*;

// Interface
interface Int1
{
	// public, static and final
	final int a = 20;

	// abstract and public
	void display();
}
// Interface implementation using class
class TestClass implements Int1
{
	// Extending the interface's functionality.
	public void display()
	{
		System.out.println("Example");
	}

	// Our driver Code
	public static void main (String[] args)
	{
		TestClass t = new TestClass();
		t.display();
		System.out.println(a);
	}
}
```
The output will be:

```bash
Example
20
```

The program above shows how we can create an interface and a class that implements the interface. The `Testclass` implements our interface `int1`.

### Advantages of Abstraction
1.	Only important details are shown to the user, which helps to increase the security of an application or software.
2.	It simplifies the process of seeing things.
3.	Reduces duplication of code and improves reusability.

### Encapsulation vs Data Abstraction
1.	Encapsulation hides data (information), whereas abstraction hides details (implementation hiding).
2.	Whereas encapsulation binds together data and methods that act on it, data abstraction is concerned with exposing the user interface while obscuring implementation details.

### Conclusion
We've come to the end of our guide. In this article, we went through how to implement abstraction using abstract classes and methods. 

We have also looked at how interfaces achieve complete data abstraction. I trust this article will be an aid in getting you started with Java abstraction.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)	