### Introduction
Abstraction refers to  process of exposing the vital elements of a software while obscuring the background details from the user. Only the essential details are displayed to the user while the non-essential or trivial are hidden because the user is not required to know them. Data abstraction is the process of identifying only the necessary components of an object while eliminating all other information. 

An object's characteristics and behaviors differentiate it from other objects of the same type, as well as classify and group them. Using a simple example, we can think of abstraction like driving a vehicle. We only deal and know what is required of us but don’t know the mechanism behind the movement. Interfaces and abstract classes are [used in Java to achieve abstraction](Retrieved from https://astikanand.github.io/techblogs/java/object-oriented-programming). This article will go through how we can accomplish complete data abstraction using interfaces and Java abstract class and methods.

### Prerequisites
Before you begin reading this article, you will need the following:
- A basic understanding of Java.
- An Intellij ntegrated development environment.

### Table of Contents
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
An abstract class is one that has been declared as abstract. Methods that are both abstract and non-abstract can be used. It requires expansion and implementation of its method. It isn't possible to instantiate it.
Here are a few points to note about abstract classes in Java:
- The abstract keyword must be used when declaring an abstract class.
- Methods that are both abstract and non-abstract can be used.
- It isn't possible to instantiate it.
- Constructors and static methods may also be included. The abstract class can have parameterized constructors, but it will always have a default constructor.
- There can't be any objects in an abstract class. On the other hand, we cannot use the new operator to explicitly instantiate an abstract class.
- This can have end methods, which prevent the subclass from altering the body of the function.

#### Syntax of abstract class

```Java
abstract class M{} 
``` 
We simply use the `abstract` keyword before the class keyword in the class declaration to create an abstract class.

### Abstract method in Java
The term "abstract method" refers to a method that is declared but not implemented. A method that is specified as abstract must always be redefined in the subclass, forcing overriding OR making the subclass abstract. If you want a method in a class, but the implementation of that method to be determined by child classes, make the method an abstract in the parent class.

#### The abstract method's syntax

```Java
abstract void displayStatus();//no method body and abstract 

```

To define a method abstract, in the method declaration, place the abstract keyword before the method name. an abstract method is terminated with a semicolon `;` instead of curly braces, 

### When should you utilize abstract classes and methods?
In certain circumstances, we'll want to create a superclass which declares the structure of an abstraction without implementing all of its methods. That is, there will be occasions when we wish to construct a superclass that defines a generalization form that all its subclasses will use. This leaves it up to the subclasses to fill in the blanks.

#### Example to demonstrate when to use abstract class and method
Consider the traditional "shape" example, which could be found in a computer-aided design system or a gaming simulation. The base type is "shape," and each form has its color, size, and other characteristics. Specific sorts of shapes-circle, square, triangle, and so on-are derived(inherited) from this, each of which may have extra properties and behaviors. Certain shapes, for example, can be flipped. When you wish to determine the area of a shape, for example, some characteristics may be different. Both the similarities and distinctions between the shapes are embodied in the type hierarchy.

```Java
// Java code that demonstrates
// concept of Abstraction

// Abstract class
abstract class Shapes {
	String colour;

	// Here are abstract methods
	abstract double area();
	public abstract String toString();

	// Constructor in our abstract class
	public Shapes(String colour)
	{
		System.out.println("Calling the shape constructor");
		this.colour = colour;
	}

	//Concrete method
	public String getColour() { return colour; }
}
class Circles extends Shapes {
	double radius;

	public Circles(String colour, double radius)
	{

		// Shapes constructor called
		super(colour);
		System.out.println("Calling the circle constructor");
		this.radius = radius;
	}

	@Override double area()
	{
		return Math.PI * Math.pow(radius, 2);
	}

	@Override public String toString()
	{
		return " The circle color is " + super.getColour()
			+ "and area is : " + area();
	}
}
class Rectangle extends Shapes {

	double length;
	double width;

	public Rectangle(String colour, double length,
					double width)
	{
		// calling the Shapes constructor
		super(colour);
		System.out.println("Calling the rectangle constructor");
		this.length = length;
		this.width = width;
	}

	@Override double area() { return length * width; }

	@Override public String toString()
	{
		return "Colour of rectangle is " + super.getColour()
			+ "and area is : " + area();
	}
}
public class Test {
	public static void main(String[] args)
	{
		Shapes s1 = new Circles("Red", 2.2);
		Shapes s2 = new Rectangle("Yellow", 2, 4);

		System.out.println(s1.toString());
		System.out.println(s2.toString());
	}
}
```

The output will be:

```bash
Calling the shape constructor
Calling the circle constructor
Calling the rectangle constructor
The Circle color is Red and area is: 15.205308443374602
Colour of rectangle and area is: 8.0
```

### Interfaces in Java
Methods and variables can be declared in an interface, just like they can in a class, but the methods declared in an interface are abstract by default.
Here are some points to note on interfaces in Java:
- Interfaces define what a class must do, not how it must do it. It is the course's plan.
- A Player, for example, is an interface that any class that implements must be able to (or must implement) movement. As a result, it specifies a set of methods that must be implemented by the class.
- The class must be abstracted if it implements an interface but does not include method bodies for all of the interface's functions.
A Java library such as Comparator Interface is an example. This interface is used to sort a collection if a class implements it.

#### The syntax of interfaces is as follows:
```Java
interface <interfacename> {
    // declaration of constant fields
    // declaration of methods that are abstract 
    // by default.
}
```

An interface is declared with the interface keyword. Its goal is to achieve perfect abstraction.By default, all fields in an interface are public, static, and final, and all methods in an interface are declared with an empty body and are public. A class that implements the interface must implement all of the interface's functionalities. The keyword implements is used to describe the implementation of an interface.

#### What's the point of utilizing a user interface?
It's a technique for achieving complete abstraction. Because java does not provide multiple inheritances in the case of classes, multiple inheritances can be achieved by using interfaces. It is also used for loose coupling.

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
We've come to the end of our guide. In this article, we went through how to implement abstraction using abstract classes and methods. We have also looked at how interfaces achieve complete data abstraction. I trust this article has been helpful in getting you started with Java abstraction.
	