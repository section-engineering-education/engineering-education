# Getting-started-with-inheritance-using-c#

### Introduction

inheritance is a very unique concept in (OOP) object-oriented programming, it allows the definition of multiple classes using the properties of other classes. Inheritance allows us to maintain modify and boost our code, it also provides the reusability of code functionality and gives better performance.

We create classes by inheriting the functions and variables of a base class, then we add new functions to enhance its performance, we call it a derived class because it inherits the properties of a base class. Without inheritance, the code will be unstructured harder to read, and complex
### Table of Contents

1. Base classes vs Derived classes.

1. Protected vs Internal members.

1. Learn about the relationship between classes.

1. How constructors and destructors get executed.


### Prerequisites
Before we begin this tutorial, you should have the following:

- A basic understanding of C# programming language. 

- A basic understanding of how Classes work.

### Base classes vs Derived classes

A **Base** class produces derived classes that inherit the properties of the base class.

Inheritance forms a tree-like Hierarchy:

![inheritance tree](/engineering-education/Getting-started-with-inheritance-using-c#/tree-of-inheritance.jpg)

 **In inheritance**, an object is often an object of another class and all derived classes are objects of their base class,
 also, note that constructors are not inherited. This is how you specify a class child derived from class father: `class child: father`.



### Protected members vs Internal members

A derived class can access the **protected members** of a base class, on the other hand
**Internal members** Can only be accessed by a class declared within the same domain.



### The proper way to use inheritance
Before we dig into the code we should always include the word **Override** if we need to reuse a method in a derived class inherited from a base class,
also, the word **Virtual** is needed before the method in a base class if we are going to override it in a derived class.



The following example will calculate the area and perimeter of a circle using inheritance. 

in this piece of code, we will define two private point coordinates, then we will define a constructor that takes two integers from the main.

**Note** that Output statements use a reference (This) to implicitly call the ToString method.

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
  Here we define the set and get Accessors to access the private members of the class, then we will override the ToString method.
  
  **Note** that the ToString method will return a string representation of class Point.
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
   The following class is the Derived class of class point.
   
   In class Circle, we don't need to define the point coordinates because they're already inherited as we can see
   
   `: base(xcoordinate,ycoordinate)`. Now we define the radius of the circle the constructor and the Accessors.
   
   
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
   
   
   Now we need to define the functions that will help us
   calculate the area and perimeter of the circle, then we will override the ToString method, just like we did in class Point.
   
   
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
      
   Take a look at the following code:
   
   ```c#
   static void Main(string[] args)
        {
            Circle c = new Circle(6,8,4);

            Console.WriteLine("Area : " + c.Area());
            Console.WriteLine("Perimeter : " + c.Perimeter());
        }
   ```
   
   The output after execution:
   
   ```c#
   point constructor: Center= [6, 8]; Radius = 0
   Circle constructor: Center= [6, 8]; Radius = 4
   Area : 50.2654
   Perimeter : 25.1327
  ```
   
  ### Constructors and Destructors in derived classes
  
   The constructor of a base class will be called implicitly or explicitly when Instantiating a derived class,
   this will cause a chain reaction when a base class is also a derived class.
   
   
   When a destructor is called, it executes its function and then invokes the derived class base class constructor.
   
   
   Let’s look at the code sample below to learn how to define a destructor.
   
   **Note** that you need to include this piece of code inside the class Point.
   
   ```c#
      ~Point()
      {
         Console.WriteLine( "Point destructor: {0}", this );
      }    
   ```
   
   **Note** that you need to include this piece of code inside the class Circle.
   
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

In this tutorial, we have learned the importance of inheritance, how to define a base class and inherit its properties,
and understand the relationship between classes. However, it's just the start! we will learn more about inheritance in the upcoming tutorials.
Also, don't forget to test out the code to fully understand how it works.
