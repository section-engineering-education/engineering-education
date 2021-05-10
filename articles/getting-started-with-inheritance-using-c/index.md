---
layout: engineering-education
status: publish
published: true
url: /engineering-education/getting-started-with-inheritance-using-c/
title: Getting Started with Inheritance using C#
description: This tutorial will go over the basics of Inheritance using C#, including the relationship between classes and how constructor are executed.
author: mohamed-alghadban
date: 2020-12-01T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-inheritance-using-c/hero.jpg
    alt: inheritance example image c#
---
Inheritance is a unique concept in (OOP) object-oriented programming. It allows the definition of multiple classes using the properties of other classes. We create classes by inheriting the functions and variables of a base class. Then we add new functions to enhance its performance.
<!--more-->
### Introduction
Inheritance allows us to maintain, modify, and further improve our code. It provides us the ability to reuse code functionality. Without inheritance, our code will be unstructured, difficult to read, and complex.

A derived class inherits the properties of a base class.

### Table of contents
1. Base classes vs. Derived classes.

2. Protected vs. Internal members.

3. The relationship between classes.

4. How constructors and destructors get executed.

### Prerequisites
Before we begin this tutorial, it's recommended the reader have the following:

- A basic understanding of C# programming language.

- A basic understanding of how Classes work.

### Base classes vs. Derived classes
A **base** class produces derived classes that inherit the properties of the base class.

Inheritance forms a tree-like hierarchy:

![inheritance tree](/engineering-education/getting-started-with-inheritance-using-c/tree-of-inheritance.png)

**In inheritance**, an object is often the object of another class, and all derived classes are objects of their base class, also note that constructors are not inherited.

This is how you would specify a class child derived from class father: `class child: father`

### Protected members vs. Internal members
A derived class can access the **protected members** of a base class. On the other hand
**internal members** can only be accessed by a declared class within the same domain.

### The proper way to use inheritance
Before we dig into the code, we must include the word **Override** when we need to reuse a method in a derived class inherited from a base class.

If we override a method in a derived class, we can use the word **Virtual** before the base class method.

Below we have an example where we calculate the area and perimeter of a circle using inheritance.

In this piece of code, we'll define two private point coordinates. Then we'll define a constructor that takes two integers from the main.

**Note** that the Output statements use a reference (`this`) to implicitly call the ToString method.

```c#
    public class Point
    {
      private int x, y;

      public Point( int xcoordinate, int ycoordinate )
      {
         X = xcoordinate;
         Y = ycoordinate;
         Console.WriteLine("point constructor: {0}", this);}
  ```
**Note**: Be aware that you can't run the code above without putting the incoming code snippets together.

Here we define the set and get Accessors to access the private members of the class. Then we'll override the `ToString` method.

**Note** that the ToString method will return a string representation of the class Point.

  ```c#
      public int X
      {
         get
         {return x;}
         set
         {x = value;}
      }

      public int Y
      {
         get
         {return y;}
         set
         {y = value;}
      }

      public override string ToString()
      {return "[" + X + ", " + Y + "]";}
    } // end class Point
   ```

The following class is the derived class of the class `Point`.

In the class `Circle`, we don't need to define the Point coordinates because they've been inherited.

`: base(xcoordinate,ycoordinate)`.

Now we'll define the *radius* of the circle, the *constructor*, and the *Accessors*.

   ```c#
       public class Circle: Point
    {
       private double radius;

      public Circle( int xcoordinate, int ycoordinate, double radiuscircle )
         : base( xcoordinate, ycoordinate )
      {Radius = radiuscircle;
      Console.WriteLine("Circle constructor: {0}", this);}

      public double Radius
      {
         get
         {return radius;}
         set
         {radius = value;}
      }

   ```

We need to define the functions that will help us calculate the *area* and *perimeter* of the circle. We'll then override the `ToString` method, just like we did in the class `Point`.

   ```c#
      public double Diameter()
      {return Radius * 2;}

      public double Perimeter()
      {return Math.PI * Diameter();}


      public virtual double Area()
      {return Math.PI * Math.Pow( Radius, 2 );}

      // Return string representation of Circle
      public override string ToString()
      {
      // Using the ToString method with extra additions
         return "Center= " + base.ToString() +"; Radius = " + Radius;   
      }
   } // end class Circle
   ```
**Note** that in c# all methods have to be wrapped inside a class, including the main method.
You can replace the class made by default with the following class, or copy & paste what is inside the main method into yours.

Let's take a look at the following code:

   ```c#
 public class Example
 {
    static void Main(string[] args)
    {
        Circle c = new Circle(6,8,4);
        Console.WriteLine("Area : " + c.Area());
        Console.WriteLine("Perimeter : " + c.Perimeter());
    }
 }

   ```
You can run the previous code online by clicking [here](https://repl.it/@mohamedgh16/example-1).

The output after execution should look like:

   ```c#
   point constructor: Center= [6, 8]; Radius = 0
   Circle constructor: Center= [6, 8]; Radius = 4
   Area : 50.2654
   Perimeter : 25.1327
  ```

### Constructors and Destructors in derived classes
A base class's constructor will be called implicitly or explicitly when *Instantiating* a derived class. This will cause a chain reaction when a base class is a derived class as well.

When a destructor is called, it executes its function and then invokes the derived class base class constructor.

Let’s look at the code snippet below to learn how we define a destructor.

**Note**: We need to include this piece of code inside the class `Point`.

   ```c#
      ~Point()
      {
         Console.WriteLine( "Point destructor: {0}", this );
      }    
   ```

**Note**: We need to include this piece of code inside the class Circle.

   ```c#
      ~Circle()
      {
         Console.WriteLine( "Circle destructor: {0}", this );
      }
   ```   

This is an example of how constructors and destructors work:

   ```c#
   static void Main( string[] args )
      {
         Circle c1 = new Circle(6,8,4);
         Circle c2 = new Circle(16,18,8);
      }
   ```

The output in order is given as follows:

   ```c#
point constructor: Center= [6, 8]; Radius = 0
Circle constructor: Center= [6, 8]; Radius = 4
point constructor: Center= [16, 18]; Radius = 0
Circle constructor: Center= [16, 18]; Radius = 8
Circle destructor: Center= [16, 18]; Radius = 8
Point destructor: Center= [16, 18]; Radius = 8
Circle destructor: Center= [6, 8]; Radius = 4
Point destructor: Center= [6, 8]; Radius = 4

   ```

### Conclusion
In this tutorial, we have learned the importance of inheritance, how to define a base class and inherit its properties, and understand the relationship between classes.

However, it's just the start! We will learn more about inheritance in the upcoming tutorials. Don't forget to test out the code to fully understand how it works.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
