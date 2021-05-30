---
layout: engineering-education
status: publish
published: true
url: /function-overloading/
title: Function Overloading (C++)
description: A brief introduction to the Function Overloading, Polymorphism and Inline functions with code snippets. Object Oriented Programming is a fundamental method of programming which helps to develop programs using a modular approach.
author: kanishkvardhan-a-n
date: 2020-08-04T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/function-overloading/hero.jpg
    alt: Function Overloading (C++) computer image

---
Object Oriented Programming is a fundamental method of programming that helps to develop programs using a modular approach. This approach treats data as the main element. The data is attached or linked to a function that acts and operates on it. Other functions cannot indulge in modifying this data. The functions only act on those data elements that are linked to them. This whole collection of data elements and functions is considered to be an object.
<!--more-->

An object is one of the characteristics of Object Oriented Programming (OOP). This article introduces another characteristic feature of OOP - **Polymorphism** -  through the concept of function overloading.

### Polymorphism in Function Overloading
Polymorphism is the occurrence of different forms under certain given conditions. In computing, polymorphism is a property of object oriented programming in which a function can take different forms based on the number of arguments and their data types. All the functions will have the same name, but they will differ in their arguments.

**Note:** Function overloading is independent of the return type. Two functions with the same return types can qualify as function overloading if and only if they differ in their type of arguments and number of arguments.

### Need for Function Overloading
When the user declares different functions with different names, calling has to be done for each function. But in function overloading, the function can be called only one time. The compiler resolves the relevant function by contrasting the arguments.
- The program is executed faster.
- The flow of the code is smooth and simple.
- Handling and preserving the code is easy.
- Code becomes shorter, hence easy to interpret and understand.
- The interface between real world objects and the code enhances comprehension.

### Differentiating Overloaded Functions
#### Example 1
```
int demo(int a, int b);
int demo(int c, int d, int e);
```

Here, the name of the function is **demo()**. There are two functions with the same name. But, they differ in their argument list. This is an example of Function Overloading with different number of arguments.

#### Example 2
```
int demo(int a, int b);
int demo(float c, float d);
```
Here, the name of the function is **demo()**. There are two functions with the same name. But, they differ in the type of arguments used. This is an example for Function Overloading with different data types of arguments.

We can mix and match the number of arguments and the data types used, it doesn’t matter as long as no two functions have the same argument list.

**Note:** If the return type is not mentioned before the function name, it is considered to be a void function (i.e. a function that does not return any value).

#### C++ program to demonstrate Function Overloading
Consider the program to calculate the area of 3 geometrical figures, namely Circle, Square and Rectangle. 3 functions will be defined with the same name **area()**. But their number and type of arguments will be different.

```C
#include<iostream>
#include<conio.h>
using namespace std;
class demo
{
	public:
		double area(double r)
		{
			return (3.142*r*r);
        }
        int area(int a)
		{
			return (a*a);
        }
        double area(double l, double b)
		{
			return (l*b);
        }
};

int main()
{
	demo d;
	cout<<"Area of the Circle is: "<<d.area(2.5)<<"sq.units"<<"\n";
	cout<<"Area of the Square is: "<<d.area(5)<<"sq.units"<<"\n";
	cout<<"Area of the Rectangle is: "<<d.area(3,7.8)<<"sq.units"<<"\n";
	getch();
}
```

Here, a class is created with the name **demo**. All the functions and data elements are restricted to this class itself.

Three functions are defined inside the public domain. All the functions have the same name but are different in their parameter list. This makes the function **demo()** overloaded. The class is publicly derived. So, even though the functions are defined outside the **main()** function, they can be invoked (or called) from the inside.

The functions are declared in the main function and relevant values have been passed through the function declaration itself. This type of passing is called *call by value* method. The other method is the *call by reference* method where the values are inserted during the run time of the program. **d** is the class variable that invokes the member functions.

The output of the above program is:
```bash
Area of the Circle is: 19.6375sq.units
Area of the Square is: 25sq.units
Area of the Rectangle is: 23.4sq.units
```

### Inline Function
There are functions which are defined both inside and outside of the class. There is one such function that is defined inside the class. That is the ‘Inline Function’.

The inline function is a short function. As stated by the name itself, the function call is replaced by the body of the function. The function is *in-line* the main function of a program. To make use of this function, the keyword **inline** has to be written before the function definition. It should be defined before the function that calls it.

#### C++ program to demonstrate Inline Function
Consider this program to calculate area of the circle. The functions will be defined with the name **area()**. But here the function is in-line with the main function.

```C
#include<iostream>
#include<conio.h>
using namespace std;
inline double area(double r)
	{
		return (3.142*r*r);
        	}

int main()
{
	double a;
    a=area(2.5);
	cout<<"Area of the Circle is: "<<a<<"sq.units"<<"\n";
	getch();
}
```

Here, the keyword inline indicates that the function is an inline function. When the function **area()** is invoked, the compiler replaces the function call **area(2.5)** with the body of the function itself. Then the result is stored in the variable **a.**

**NOTE:** Inline function does not work with recursive or looping constructs.

The output of the above program is:
```bash
Area of the Circle is: 19.6375sq.units
```

##### Additional Resources
[Function Overloading in C++](https://www.geeksforgeeks.org/function-overloading-c/)
[Overloaded Functions cpp](https://beginnersbook.com/2017/08/cpp-function-overloading/)
