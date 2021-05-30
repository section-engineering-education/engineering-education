---
layout: engineering-education
status: publish
published: true
url: /introduction-to-friend-functions-in-c++/
title: Introduction to Friend Functions in C++
description: In this article, we will learn about friend functions and friend class, what they and where they are used."Friendly" functions and classes reduce having the number of functions and help create programs that are maintainable.
author: dawe-daniel
date: 2021-01-09T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-friend-functions-in-c++/hero.jpg
    alt: Introduction to Friend Functions in C++ Hero Image
---
Non-member functions of a class will not have access to the private data of another class. There could be situations where we want two classes to share some functions and the data members. In that case, we can make the function a friend of these classes, and that will enable the function to access the private and protected data members of the classes. In this article, we will look at how to make a non-member function friend to a class.
<!--more-->

### Prerequisites
To follow along with this article, you’ll need to have:

- [Codeblocks IDE](http://www.codeblocks.org/downloads) to run the code.

- A basic understanding of the C++ language.

- A basic understanding of functions.

### Overview
1. [Definition of Friend functions](#what-is-a-friend-function)
2. [Importance of Friend functions](#why-do-we-need-friend-functions)
3. [Syntax of Friend functions](#syntax-of-friend-functions)
4. [Friend function declaration](#friend-function-declaration)
5. [Friend class](#friend-class)

### What is a friend function?
A friend function is a function that is specified outside a class but has the ability to access the class members' [protected and private data](https://www.xspdf.com/resolution/59954476.html). A friend can be a member's function, function template, or function, or a class or class template, in which case the entire class and all of its [members are friends](https://www.xspdf.com/resolution/10067734.html).

### Why do we need friend functions?
In special cases when a class’s private data needs to be accessed directly without using objects of that class, we need friend functions. For instance, let's consider two classes: `Director` and `Doctor`. We may want the function `gross_salary` to operate the objects of both these classes. The function does not need to be a member of either of the classes.

They are also used in operator overloading because they are more intuitive. The binary arithmetic operator that is commonly used can be overloaded the friend function way. Go ahead and check out [operator overloading using a friend function](https://www.geeksforgeeks.org/types-of-operator-overloading-in-c/) for more information.

### Special features of friend functions:
- A friend function does not fall within the scope of the class for which it was declared as a friend. Hence, functionality is [not limited to one class](https://www.xspdf.com/resolution/58547943.html).

- The friend function can be a member of another class or a function that is [outside the scope of the class](https://www.scribd.com/doc/45584877/c-and-c).

- A friend function can be declared in the private or public part of a class [without changing its meaning](https://www.scribd.com/doc/45584877/c-and-c).

- Friend functions are not called using objects of the class because they are not within the class's scope.

- Without the help of any object, the friend function can be [invoked like a normal member function](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_functions_qa1.htm).

- Friend functions can use objects of the class as arguments.

- A friend function cannot explicitly access member names directly. Every member name has to use the object's name and dot operator`.`. For example,  `Doctor.pay` where `pay` is [the object name](https://www.xspdf.com/resolution/1749311.html).

#### Syntax of friend functions:
To make a function that is declared outside the class "friendly" to that class, we have to declare the function as a friend function, as seen below:

```c++
class className{
  // Other Declarations
  friend returnType functionName(arg list);
};
```

As we can see above, the friend function should be declared inside the class whose private and [protected members are to be accessed](https://www.softwaretestinghelp.com/friend-functions-in-cpp).

Let's breakdown the syntax:

- `friend` is a keyword to denote that this function is a friend function.

- `returnType` is the function's return type.

- `functionName` is the name of the function being made a friend of the class.

- `arg list` is the arguments that are passed.

The friend function definition is found outside the class like a normal member function. The friend function is not defined using the `friend` keyword or use the scope resolution operator`::` as it is not a member of the [class in which it has been declared](https://www.xspdf.com/resolution/1749311.html). A friend function can be declared in several classes.

#### Friend function declaration

```c++
// Program to illustrate friend function

#include<iostream>

using namespace std;

class integer
{
  int a, b;
  public:
    void set_value()
    {
    a=50;
    b=30;
    }
  friend int mean(integer s);  //declaration of friend function
};

int mean(integer s)
{
  return int(s.a+s.b)/2.0; //friend function definition
}
int main()
{
  integer c;
  c.set_value();
  cout<< "Mean value:" <<mean(c);
  return 0;
}
```

The output of our program will be: `Mean value: 40`

Let's break down the program below:

We have declared the friend function `mean` that takes objects as arguments. The function definition is outside the scope of the class. The function uses the dot membership operator `.` and the object passed as an argument to it to access the variables of the class `a` and `b`. The function call `mean(c)` passes by value the object `c`  to the friend function.

Through the use of the `friend` keyword, member functions of one class can also be made friend functions of another class by defining the function using the scope resolution operator as shown below:

```c++
class className1{
  // Other Declarations
  int functionName1(); // member function of className1
};

class className2
{
  // Other Declarations
  friend int className1::functionName();	//The functionName1() is a friend of className2
};
```

The function `functionName1()` which is a member of class `className1` has been made a friend of class `className2`. 

#### Friend Class
A friend class can have access to the data members and functions of another class in [which it is declared as a friend](https://www.xspdf.com/resolution/52369155.html). They are used in situations where we want a certain class to have access to another class's private and protected members. 

Classes declared as friends to any another class will have all the member functions become friend functions to the friend class. Friend functions are used to work as a link between the classes.

#### Syntax of friend class:
```c++
class S; //forward declaration

class P{
  // Other Declarations
  friend class S;
};

class S{
  // Declarations
};
```

In the illustration above, `class S` is a friend of `class P`. As a result `class S` can access the private data members of `class P`. However, this does not mean that `class P` can access private data members of `class S`. A forward declaration informs the compiler about an entity's existence before the entity is explicitly defined. 

We have declared `class S` using forward declaration to inform the compiler of its existence, allowing us to use the objects of `class S` in `class P`.
 
**Note:** Class friendship is neither inherited nor mutual [unless we make it so](https://www.softwaretestinghelp.com/friend-functions-in-cpp). This means that because class S is a friend of class P, it will be a friend of the sub-classes of class P.

Example of a program to illustrate friend class:
```c++
#include <iostream>
using namespace std;

// forward declaration
class ClassY;

class ClassX {
  int digit1;

  // friend class declaration
  friend class ClassY;

  public:
      // constructor to initialize num1 to 10
      ClassX() : digit1(10) {}
};

class ClassY {
    int digit2;

    public:
        // constructor to initialize num2 to 5
        ClassY() : digit2(5) {}

    // member function to multiply num1
    // from ClassX with num2 from ClassY
    int multiply() {
        ClassX m;
        return m.digit1 * digit2;
    }
};

int main() {
    ClassY n;
    cout << "Multiplication: " << n.multiply();
    return 0;
}
```

The output will be: `Multiplication: 50`

In the program above, we have declared two classes: X and Y. `ClassY` is a friend class of `ClassX`. Therefore, `ClassY` has access to the member function of `ClassX`. In `ClassY`, we have created a function` multiply()` that returns the multiplication of `digit1` and `digit2`. 

`ClassY` being a friend class enables us to create objects of `ClassX` inside of `ClassY`. This is possible through forward declaration of the `ClassY`. 

#### Here are some important points on friend functions and classes: 
- Friend functions should be used for restricted purposes only. Having excessive friend functions and classes can reduce the object-oriented programming feature of encapsulation in a program.

- Friendship is not reciprocal. If class X is Y’s friend, then Y does not automatically become X’s friend.

- Friendship cannot be inherited.

### Conclusion
In this article, we learned about friend functions and friend classes, what they are and where they are used for. By making a function and class “friendly” we reduce having too many functions, and in the process creating programs that are maintainable and easy to read.

### Additional Resources
- [Friend class and friend functions in C++](https://codevidyalay.blogspot.com/2019/09/friend-class-and-friend-function-in-c.html)

- [Friend functions](https://mounanaravani.files.wordpress.com/2017/02/17-friend-functions.pdf)

- [Friend functions in C++](https://www.softwaretestinghelp.com/friend-functions-in-cpp)

- [Friend function of base classs and derived class](https://www.iditect.com/how-to/10227802.html)

- [C++ friend Function and friend Classes](https://www.programiz.com/cpp-programming/friend-function-class)

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
