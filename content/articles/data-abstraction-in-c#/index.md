### Introduction
The feature of data abstraction is that just the most important details are displayed to the user. The user is not shown the units that are trivial or non-essential.
It is the process of identifying only the properties of an item that are required while ignoring the rest. An item's characteristics and behaviours enable it to be distinguished from other items of the same type, as well as categorize and group them. An object's properties and actions distinguish it from other objects.

Table of content
- [Types of abstraction](#types-of-abstraction)
- [Abstract classes](#abstract-classes)
- [Abstract method](#abstract-method)
- [Use of abstract classes and abstract methods](#use-of-abstract-classes-and-abstract-methods)
- [Encapsulation vs data abstraction.](#encapsulation-vs-data-abstraction)
- [Advantages of abstraction](#advantages-of-abstraction)

### Types of abstraction
There are two types of abstraction **Data Abstraction** and **Control abstraction**. Data abstraction refers to the concealment of data specifics, while control abstraction refers to the concealment of implementation details. 

Both data and functions can be abstracted using an object-oriented approach. In OOP, however, classes are typically built in such a way that the data is concealed from the outside world and the functions serve as the public interface. That is, other functions outside the class can directly access the class's functions, and these functions can indirectly access the class's concealed data. Data abstraction enhances data security by preventing unintentional changes or manipulations by other sections of the program because the internal features of the class are hidden from the outside world.


### Abstract classes.
The term **abstract** refers to a notion or idea that has no physical form of its own but serves as a foundation for other things. In C#, an abstract class is a specific type of class that can not be instantiated, which means you can not make objects from it. An abstract class aims to create a skeleton framework from which other classes can derive. Abstract classes do not have their implementation. Developers and programmers must inherit from the abstract class and build atop the skeleton structure, i.e. design their implementation. Abstract method declarations can also be seen within an abstract class. These techniques, once again, cannot be defined. 

>With the aid of abstract classes, abstraction is done in C# and an abstract class can not be instantiated directly

The term abstract comes before the declaration in the syntax for declaring abstract classes and methods as shown in the syntax below:
 
```c#
abstract class ClassName
{
public abstract void MethodName();
}
```

Remember that abstract methods can not be defined. As a result, the abstract method declarations are terminated by a semicolon. It is only possible to declare them. Definitions must be supplied in non-abstract derived classes.

Abstract classes work by asking the abstract keyword to tell the compiler that the class is a skeletal structure for derived classes to implement. If the compiler encounters a class that derives from the abstract base class, it examines the derived class to see if all of the abstract methods and properties have been overridden and implemented.

### Abstract method
There is nobody in a given abstract method and it is just specified in the abstract class. The override keyword must be used to implement an abstract method in all non-abstract classes. The abstract method is now in the non-abstract class after being overridden. This class can be derived from another class, which can then override the same abstract method. To offer functionality to the abstract functions, it is required to create/derive a subclass from the abstract class.

Abstract methods are frequently stated where two or more subclasses are anticipated to fulfil the same task differently. Because subclasses are frequently needed to implement an interface, the abstract superclass may provide multiple interface methods while leaving it to the subclasses to implement their variations of the abstract methods.

The rules for abstract methods and abstract classes in C# are as follows:
1. If a method isn't abstract, extern, or partial, it should be designated abstract using the abstract modifier; otherwise, a compile-time error will occur: must declare a body because it isn't abstract, extern, or partial.

```c#
public class Demo

{

    void k1(); 
}
```

2. If a class has an abstract method, it must be declared as such with the keyword abstract; otherwise, a compile-time error will occur: Although the method ‘Demo.k1()' is abstract, it is included within the non-abstract class ‘Demo‘.

```c#
public class Demo
{
 
    public abstract void k1();
}
```

The correct syntax is

```c#
public abstract class Demo
{
    public abstract void k1();
}
```

3. If an abstract class is declared, it cannot be instantiated, resulting in a compile-time error.
public abstract class Demo

```c#
{
    public abstract void k1();
    public static void Main(String[] args)
    {
        Demo e = new Demo();
    }
}
```

4. Sub-classes of an abstract class must override all abstract methods or the class must be declared abstract; otherwise, the following compile-time error will occur:

```c#
namespace AbstractDemo
{
    public abstract class Demo
    {
        public abstract void k1();
        public abstract void k2();
    }

    public class Sample : Demo
    {
        public override void k1()
        {
            Console.WriteLine("k1 method");
        }
    }
}
```

Solutions:
As demonstrated below, declare the class as abstract.

```c#
public abstract class Sample : Demo
{
    public override void k1()
    {
        Console.WriteLine("k1 method");
    }
}
```

As seen below, override both abstract methods.

```c#
public class Sample : Demo
{
    public override void k1()
    {
        Console.WriteLine("k1 method");
    }
    public override void k2()
    {
        Console.WriteLine("k2 method");
    }
}
```

Demo to show the use of abstract methods in C#:

```c#
using System;
namespace Abstractmethod
{
    public abstract class Plan
    {
        protected double rate;
        public abstract void getRate();
        public void calculation(int units)
        {
            Console.Write("BILL AMOUNT FOR " + units + " UNITS is: USD.");
            Console.WriteLine(rate * units);
        }
    }
    class CommercialPlan : Plan
    {
        public override void getRate()
        {
            rate = 5.00;
        }
    }
    class DomesticlPlan : Plan
    {
        public override void getRate()
        {
            rate = 2.50;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Plan p;
            Console.WriteLine("COMMERCIAL CONNECTION");
            p = new CommercialPlan();
            p.getRate();
            p.calculation(250);
            Console.WriteLine("DOMESTIC CONNECTION");
            p = new DomesticlPlan();
            p.getRate();
            p.calculation(150);
            Console.ReadKey();
        }
    }
}
```

The output of the program is shown below:

```bash
COMMERCIAL CONNECTION
BILL AMOUNT FOR 250 UNITS is: USD.1250
DOMESTIC CONNECTION
BILL AMOUNT FOR 150 UNITS is: USD.375
```

#### Characteristics of abstract methods:
Abstract methods in c# have the following characteristics:

- In an abstract method, a virtual method is implicit.
- Only abstract classes can declare abstract methods.
- There is no method body in an abstract method declaration because it does not give any actual implementation; the method declaration merely ends with a semicolon rather than a typical method block.
- All abstract methods are required to use the abstract class's derived classes. If a virtual method from a base class is inherited by an abstract class, an abstract method could be used to override the virtual method.

### Use of abstract classes and abstract methods
In some cases, we want to build a superclass that declares the structure of abstraction without providing a complete implementation of all methods. That is, there are instances when we wish to design a superclass that just defines a generalized form that all of its subclasses will share, leaving each subclass to fill in the specifics.

Consider the traditional `shape` example, which could be found in a computer-aided design system or a gaming simulation. The base type is `shape`, and each form has its colour, size, and other characteristics. Specific sorts of shapes-circle, square, triangle, and so on-are derived(inherited) from this, each of which may have extra properties and behaviours. Certain shapes, for example, can be flipped. Certain behaviours may differ, for as when calculating the area of a square.

The code below shows the use of abstract classes and abstract methods:

```c#

using System;

namespace abstraction
{


    abstract class Shape
    {


        public abstract int perimeter();
    }


    class Square : Shape
    {


        private int side;


        public Square(int y = 0)
        {
            side = y;
        }


        public override int perimeter()
        {
            Console.Write("Perimeter of the square is: ");
            return (side + side)*2;
        }
    }


    class abstraction
    {


        static void Main(string[] args)
        {


            Shape sh = new Square(13);


            double result = sh.perimeter();

            Console.Write("{0}", result);

        }
    }
}
```

The output of the program above is:

```bash
Perimeter of the square is: 52
```

### Encapsulation vs data abstraction.
**Encapsulation** is the technique of hiding unneeded data from the user, or you might say it's a method of data protection.
When it comes to C# abstraction, it's the polar opposite of encapsulation. It's a system that only displays information to the user that is relevant to them.

### Advantages of abstraction
- It simplifies the process of seeing things.
- Reduces duplication of code and improves reusability.
- The user shows only significant information that helps to improve the safety of a program or application.

### Conclusion
I hope this article will help the reader to understand what it entails in data abstraction in C# regarding it as identifying only the properties of an item that are required while ignoring the rest.
In this article, the reader will manage to understand the different types of abstraction, abstract classes and methods with relevant examples and also the relationship between abstraction and data encapsulation.

