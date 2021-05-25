---
layout: engineering-education
status: publish
published: true
url: /constructors-destructors/
title: Constructors and Destructors (C++)
description: Learn the difference between Constructors and Destructors with the help of code snippets. Understand the usage of explicit call, implicit call and constructor overloading.
author: kanishkvardhan-a-n
date: 2020-08-05T00:00:00-05:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/constructors-destructors/hero.jpg
    alt: extending classes example image
---

While programming, the objects which hold certain data members and member functions have to be initialized before operating on them. This is usually done by member functions that initialize data members to predefined values. But there is a special member function in which the object initializes itself automatically when it is first constructed. This special member function is called a **constructor**.

<!--more-->

Substantially, a constructor defines a value to data members of the class. **A constructor is a special member function that is used to initialize objects of a class instantaneously when it is constructed.**

### Using and Declaring a Constructor
- A constructor is a member function that has the same name as that of the class.
- It is defined as any other member functions (both inside or outside) of the class.
- Since a constructor just defines the value to a data member, there's no return type to it.
- They are called automatically when the objects are created.
- They should be declared in the public section of the class.
- **Declaration Syntax:** Consider the class name and constructor name to be **demo**. Let **a** and **b** be two integer variables.

```C
class demo
	{
		private:
			int a,b;
		public:
			demo()
				{
				a=1;
				b=2;
				}
	};
```

##### C++ program to demonstrate the use of a constructor
Consider the program to find the area of a circle. The name of the class will be **demo**. The two member functions will be declared, one for **input** and one for **output**. Since the name of the constructor should be the same as that of the class, the name of the constructor will also be **demo**. When the constructor demo is declared, the initialization of the class objects is done automatically.

```C
#include <iostream>
#include<conio.h>
using namespace std;

class demo
{
  private:
     double radius, pi;
   public:
     void input(double r);
     double output();
     demo();
};

demo::demo(void)    //constructor definition outside the class
{
   pi=3.142;
}
void demo::input(double r)
{
  radius=r;
}
double demo::output(void)
{
  return (pi*radius*radius);
}

int main()
{
  demo d1;

  d1.input(5.5);
  cout<<"Area of the circle is : "<<d1.output()<<"sq.units"<<"\n";
  return 0;
  getch();
}
```

The output of the above program is:

```bash
Area of the circle is : 95.0455sq.units

```

The above program can also be written by defining the constructor inside the class. The code segment for defining the constructor inside the class is as follows:

```C
class demo
{
   private:
      double radius, pi;
    public:
      void input(double r);
      double output();
      demo()        //constructor definition inside the class
            {
                pi=3.142;
            }
};
```

### Types of Constructors
#### Default Constructor
*A constructor which does not have any arguments is called a Default Constructor*, or a ‘Zero Argument Constructor’. In a default constructor, every object in the class is initialized to the same set of values. It is not possible to initialize different objects with different initial values. This is one of the disadvantages of a default constructor.

**Syntax:** Consider a class with the name **world**. The default constructor for this class would be:

```C
world :: world()   //default constructor without any arguments
```

**Note:** Any constructor with arguments is not a default constructor.

#### Parameterized constructor
*To avoid the infeasibility of default constructor to accept arguments, we use Parameterized Constructor, which is a constructor that can accept one or more arguments.* It works the same way as a default constructor, but the difference is that it can hold arguments. They are also called automatically once the objects are created. Another attribute of parameterized constructors is that they can be overloaded.

**Syntax:** Consider a class with the name world. The parameterized constructor for this class would be:

```C
world :: world(int a, int b)     //parameterized constructor with arguments
```

#### Copy Constructor
*Copy Constructor is a type of parameterized constructor in which the properties of one object can be copied to another object.* It is used to initialize an object with the values of already existing objects. A copy constructor is invoked when an existing object is passed as a parameter.

**Note:** Copy constructors cannot be invoked explicitly.

**Syntax:** Consider a class with the name **world**. The copy constructor for this class would be:

```C
world :: world(world &ptr)        //copy constructor
```

Where, `ptr` is the pointer to the class object.

### Invoking (Calling) Constructors
#### Explicit Call
Explicit call is a method of invoking constructors in which the declaration of an object is done by using **assignment operator(=)**, constructor name followed by argument list.

**Syntax:**

```
constructor_name object_name=constructor_name(argument list);
```

##### C++ program to demonstrate the use of explicit call
Consider the program to calculate the area of the circle. The name of the class and constructor will be **demo**. The constructor will be parameterized by taking one argument. Here, **d1** acts as the object which transfers the value **5.5** explicitly to the constructor.

```C
#include <iostream>
#include<conio.h>
using namespace std;

class demo
{
	private:
		double radius, area;
	public:
		demo(double r)
	{
	radius=r;
	}
	void output()
	{
	area=3.142*radius*radius;
	cout<<"The area of the circle is: "<<area<<"sq.units"<<"\n";
	}
};

int main()
{
	demo d1=demo(5.5);
	d1.output();
	return 0;
	getch();
}
```

The output of the above program will be:

```bash
The area of the circle is: 95.0455sq.units
```

#### Implicit Call
Implicit call is a method of invoking constructors in which the declaration of an object is done and is then followed by an argument list.

**Syntax:**

```
constructor_name object_name(argument list);
```

##### C++ program to demonstrate the use of implicit call
Consider the program to calculate the area of the circle. The name of the class and constructor will be **demo**. The constructor will be parameterized by taking one argument. Here, **d1** acts as the object which transfers the value **5.5** implicitly to the constructor.

```C
#include <iostream>
#include<conio.h>
using namespace std;

class demo
{
	private:
		double radius, area;
	public:
		demo(double r)
	{
	radius=r;
	}
	void output()
	{
	area=3.142*radius*radius;
	cout<<"The area of the circle is: "<<area<<"sq.units"<<"\n";
	}
};

int main()
{
	demo d1(5.5);
	d1.output();
	return 0;
	getch();
}
```

The output of the above program will be:

```bash
The area of the circle is: 95.0455sq.units
```

**Note:** For different values, different objects have to be initialized in the main function.

### Constructor Overloading
We know that constructors are used for initializing data members of the class. They can also be used for initializing specific input values to the data members. But this cannot be done by using default constructors, since they do not take any arguments. So, for this to happen the default constructors have to be overloaded, i.e. they should be initialized with additional arguments. The object initialization has to be done by keeping the number of arguments in mind. The compiler then decides which constructor to invoke depending on the argument list.

Look at this simple segment. Consider the class name and constructor name to be **demo**.

```C
class demo
	{
		private:
			... data members of the class...
		public:
			demo()                 //default constructor
			{ }
			demo(argument list)   //parameterized constructor
			{
			...operations on the variables...
			}
	};
```

Consider **d1** and **d2** to be the objects. When the object **d1** is created, default constructor is invoked, and when the object **d2** is created with some arguments, parameterized constructor is invoked.

```C
int main()
{
	demo d1(), d2(argument list)
	return 0;
	getch();
}
```

### Destructors
As mentioned in the introduction, constructor is a special member function which is instantaneously called whenever an object is created. Likewise, **a destructor is a type of function which is instantaneously called whenever an object is destroyed.** By doing so, it deallocates the values initialized to a variable and also its memory. They have no return value. They do not take any arguments and so they cannot be overloaded. It has the same name as the class (like a constructor), but is preceded by **tilde mark** (symbolized as ~). Look at the following code snippet to see how a destructor works.

```C
class demo
	{
		private:
			int a,b,c;
		public:
			demo();         //constructor
			~demo();       //destructor
	};
```

### Additional Resources
- [C++ Class Constructor and Destructor](https://www.tutorialspoint.com/cplusplus/cpp_constructor_destructor.htm)
- [Difference between Constructor and Destructor in C++](https://www.geeksforgeeks.org/difference-between-constructor-and-destructor-in-c/)
