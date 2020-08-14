---
layout: engineering-education
status: publish
published: true
url: /engineering-education/extending-classes/
title: Extending Classes (C++)
description: This article introduces the basic concepts of Inheritance, different types of class derivations and friend functions with code snippets in C++.
author: kanishkvardhan-a-n
date: 2020-08-06T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/extending-classes/hero.jpg
    alt: extending classes example image

---
Inheritance is one of the important characteristics of [Object Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming) (OOP). It acts as the foundation for the concept of extending classes (or derived classes). C++ supports this concept. **Inheritance is the ability to inherit properties from one class (base class) to another class (derived class).**
<!--more-->

C++ allows the user to construct new classes from the existing classes. The new class derives all the properties and features from its parent class and also has additional properties and features of its own.
- **Base class**: The parent class whose properties are inherited by another class. It is also called **‘Super class’.**
- **Derived class**: The class in which the properties are inherited from the parent class. It is also called **‘Sub class’.**

### Advantages of Inheritance
- When a subclass is formed, it derives all the properties from super class. Therefore, the existing code is reused.
- There will not be any wastage of memory space because the same properties are inherited and not duplicated.
- This also leads to faster progression and development time.
- Code enhances maintenance and memory utilization.

### Visibility Modes
**Visibility mode defines whether the properties of super class are privately derived, publicly derived or protected derived.** The visibility mode plays an important role in controlling the access specifiers. They make sure that the properties are inherited accurately to the derived class. The properties of the base class are inherited in the following manner:

![Visibility Modes](/engineering-education/extending-classes/ec.jpg)

The above chart shows how properties are inherited and in which state they will be if the base class and derived class are private, public or protected respectively.

### Defining Derived Classes
Declaring a subclass or derived class is as easy as declaring a superclass. By using a colon (:) after class (subclass) name, one can indicate that it (subclass) has been derived from another class (superclass).

##### The Syntax:

>class subclass_name:visibility_mode superclass_name
{
	    *...members of the derived class...*
};

This is the syntax to declare a derived class. Here:
- **class** is the keyword.
- **subclass_name** is the name of the derived class.
- **:** is the symbol that indicates that the subclass is derived from superclass.
- **visibility_mode** defines the kind of derivation.
- **superclass_name** is the name of the base class.

Like the superclass, the subclass holds its own data members and member functions (mentioned as *...members of the derived class…* in the syntax). Also the declaration of the subclass should be ended by using a **semicolon (;)**.

**Note**: If visibility mode is not mentioned, then it is considered to be private by default.

### Examples for derived classes:
Consider **abc()** and **def()** as base class and derived class with two data members of **int** and **char** type respectively. The two member functions for base class will be **demo1()** and **demo2()** and two member functions for derived class will be **demo3()** and **demo4()**.

- ##### Private Derived Class
```C
class abc
{
				private:
					int x;
					char y[10];
				public:
					void demo1();
					void demo1();
};
class def : private abc
{
		private:
			int p;
			char q[10];
		public:
			void demo3();
			void demo4();
};
```

- ##### Public Derived Class
```C
class abc
{
				private:
					int x;
					char y[10];
				public:
					void demo1();
					void demo1();
};
class def : public abc
{
		private:
			int p;
			char q[10];
		public:
			void demo3();
			void demo4();
};
```

- ##### Protected Derived Class
```C
class abc
{
				private:
					int x;
					char y[10];
				public:
					void demo1();
					void demo1();
};
class def : protected abc
{
		private:
			int p;
			char q[10];
		public:
			void demo3();
			void demo4();
};
```

### Differentiating between Derived Classes
In all the above examples, the data members are private to the base class. So they do not get inherited into the derived class. 
**Note:** The visibility mode of the sub-class has nothing to do with the inheritance of data members(only if they are private in the base class).

##### Private Inheritance
The data members of the base class can be inherited because they are public. The public members become private to the sub-class. Protected members stay protected after inheritance. This implies that everything from the base class becomes exclusive to the derived class.
##### Public Inheritance
This is the most used inheritance mode. Public members again become public to the sub-class. This is helpful if another class inherits data members from the former one. This applies to all the data members. But to avoid that case, some members can be protected. By doing so, protected members stay protected after inheritance. 
##### Protected Inheritance
Data members become protected members of the derived class. This is regardless of data members being public or protected in the base class. In this type of inheritance, data members are accessed only by the objects of the same class.


### Friend Function
Now, we have learned that private and protected data members of the base class cannot be accessed from outside (of the base class). It means that the member functions which are declared **outside** the base class are prohibited to act on the data members which are declared **inside** the base class. For this to be allowed, the base class should be made publicly accessible.

C++ has an option where private and protected data members can be accessed outside the class without the need of making the base class public. This is where *‘Friend Function’* comes into the picture. The common function can be shared between two classes by making that function as a friend.

**A Friend Function is a non-member function that is a friend to base class**. It is declared inside a class by using the keyword **friend** before the class name. It is defined outside the class *without* using the keyword. Now, it can access private and protected members from outside the class.

**Note**: A friend function is not a member function but a normal external function that has access to the private and protected members.

### C++ program to demonstrate Friend Function
Consider the program to calculate the area of a circle. The class will be defined with the name **area()**. Let **input()** be the member function which transfers the value to another variable. **calculate()** will be the friend function with return type *double*.

```C
#include<iostream>
#include<conio.h>
using namespace std;
class area
{
	private:
		int a;
	public:
		void input(int x);
		friend double calculate(area demo);
};

void area :: input(int x)
{
	a=x;
}

double calculate(area demo)
{
	return (3.14*demo.a*demo.a);
}

int main()
{
	area example;
	example.input(5);
	cout<<"The area of the circle is: "<<calculate(example)<<"sq.units."<<"\n";
	return 0;
	getch();
}
```
**Note:** Friend function cannot access the data members directly. So it has to use an object.
**Syntax to access data members using an object**:
>name.membername

In the code, **demo** is the name and variable **a** is the member name.


The output of the above program is:
```
The area of the circle is: 78.5sq.units.
```

#### Additional Resources
[C++ Inheritance](https://www.tutorialspoint.com/cplusplus/cpp_inheritance.htm)
[Inheritance in C++](https://www.geeksforgeeks.org/inheritance-in-c/)
