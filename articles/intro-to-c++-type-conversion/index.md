---
layout: engineering-education
status: publish
published: true
url: /engineering-education/intro-to-c++-type-conversion/
title: Introduction to C++ Type Conversion
description: This article goes through type conversion, as well as a step-by-step demonstration of achieving it. Type conversion refers to the conversion of variables from one type to another.
author: dawe-daniel
date: 2021-04-22T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/intro-to-c++-type-conversion/hero.jpg
    alt: C++ Type conversion Image Example
---
### Introduction
Conversion of variables from one type to another is known as [type conversion](https://www.oreilly.com/library/view/c-14-quick/9781484217276/9781484217269_Ch26.xhtml). Type conversion's ultimate aim is to make variables of one data type work with variables of another data type. It is carried out to take benefit from some of the aspects of type representations and hierarchies. So, when will a type conversion be beneficial? `Type conversion` can be used to force the correct type of mathematical computation to be performed. Finding the sum of two variables, one of `int` type and the other of the `float` type is a good [example to demonstrate the use of type conversion](https://findanyanswer.com/what-is-type-conversion-in-c-how-it-is-achieved-in-user-defined-data-types). To get the sum of the two variables, you have to convert the `int` variable to `float`. This article will go through type conversion, as well as a step-by-step demonstration of achieving it.
<!--more-->
### Prerequisites
You will need the following to go through this article:
- Have [codeblocks IDE]() installed.
- Have an understanding of the C++ language.

### Overview
1. [c++ type conversion ](#c++-type-conversion)
2. [Implicit Type Conversion](#implicit-type-conversion)
3. [Explicit Type Conversion](#explicit-type-conversion)
4. [Conversion using the cast operator](#conversion-using-the-cast-operator)<br/>
   4.1 [Static cast](#static-cast)<br/>
   4.2 [Dynamic cast](#dynamic-cast)<br/>
   4.3 [Const cast](#const-cast)<br/>
   4.4 [Reinterpret Cast](#reinterpret-cast)<br/>
5. [Conversion using the assignment operator](#conversion-using-the-assignment-operator)

### C++ type conversion 
We have two forms of `type conversion`:
- Implicit type conversion
- Explicit type conversion

Let's get started!

### Implicit type conversion
Implicit type conversion also known as automatic type conversion is carried out by the compiler without the need for a user-initiated action. It takes place when an expression of more than one data type is present which in such an instance type conversion takes place to avoid data loss. Every variables' data type is changed to the [data type of the variable with the largest data type](http://web.archive.org/web/20200804084844/https://www.geeksforgeeks.org/implicit-type-conversion-in-c-with-examples).

The order of the automatic type conversion is listed below:

```
bool -> char -> short int -> int -> 

unsigned int -> long -> unsigned -> 

long long -> float -> double -> long double
```
When a signed type is implicitly converted to an unsigned type, information such as signs is lost, and when a long is implicitly converted to a float, overflow will occur.

Let's look at an example to see how implicit type conversion in C++ works:

```c++
// C++ program to demonstrate
// Implicit type conversion
#include <iostream>
using namespace std;

int main()
{
  int m = 50; // integer x
  char n = 'x'; // character c

  // n is implicitly converted to int. ASCII
  // value of 'x' is 120
  m = m + n;

  // x is implicitly converted to float
  float a = m + 3.0;

  cout << "m = " << m << endl
    << "n = " << n << endl
    << "a = " << a << endl;

  return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Implicit-type-conversion#main.cpp).

Output:
```bash
m = 170
n = x
a = 173
```
In the above program, we can see how `n` is implicitly converted to `int` and `x` to `float` using the order of automatic type conversion listed above.
 
### Explicit type conversion
Explicit type conversion is also known as [type casting and is user-initiated](https://findanyanswer.com/what-is-type-conversion-in-c-how-it-is-achieved-in-user-defined-data-types). In explicit type conversion, the [user can typecast to convert a variable of one type to another data type](https://www.edureka.co/blog/type-conversion-in-cpp).

In C++, explicit type conversion can be accomplished in two ways:
- Conversion using the cast operator, and
- Conversion using the assignment operator.
Let's take a look at each of the ways for explicitly casting one type to another.

### Conversion using the assignment operator
The required type is explicitly specified before the parenthesis in this type of conversion. Explicit type casting causes data loss. It's referred to as "forced casting."
Syntax:
```c++
(type) expression
```
`Type` denotes the final data type of the result.
Let's look at an example to see how conversion using the assignment operator works:
```c++
// C++ program to demonstrate
// explicit type conversion

#include <iostream>
using namespace std;

int main()
{
  double m = 3.0;

  // Explicit conversion from double to int
  int sum = (int)m + 1;

  cout << "Sum = " << sum;

  return 0;
}

Go ahead and run the code [here](https://replit.com/@Dawe7/Conversion-using-the-assignment-operator#main.cpp).
Output:
```bash
sum = 4
```
In the program above, we can see how explicit type conversion occurs. `double` is converted to `int` because the user typecast the result.

### Conversion using the cast operator
A `cast operator` is a unary operator that forces the conversion of one data type to another. We have four types of casts provided by the c++ language. These are:

- `Static cast` - This is the most basic form of cast available. It can do both upcasts and downcasts. It's a cast that takes a long time to compile. Throughout the conversion process, no checks are made to make sure the object you're converting is a complete object of the target type.
- `Dynamic cast` - It guarantees that the [result of type conversion is a complete, valid object of the target pointer type](https://www.programmersought.com/article/88123785241).
- `Const cast` – It determines if the object should be constant or non-constant. This means the constant must either be set or removed.
- `Reinterpret cast` - Every pointer type can be converted to another pointer type, even though they are from different classes. It does not examine whether the data pointed by the pointer and the pointer type are similar.

Let's look at how conversion using the cast operator works:

**Static cast**
This is the most basic form of cast available. It works during compiling. It can also call explicit conversion functions and [perform implicit type conversions like `int` to `float` or `pointer` to `void*`](https://findanyanswer.com/what-is-type-conversion-in-c-how-it-is-achieved-in-user-defined-data-types).

C++ program to illustrate how static cast works:
```c++
#include <iostream>
using namespace std;
int main()
{
  float m = 6.5;

  // using cast operator
  int n = static_cast<int>(m);

  cout << n;
}

Go ahead and run the code [here](https://replit.com/@Dawe7/Static-cast#main.cpp).
Output:
```bash
6
```
**Dynamic cast**
Polymorphism is handled with this cast. It's only necessary to use when casting to a derived class. This is only to be used when typecasting from a parent class to a derived in inheritance. The dynamic cast will fail if the cast is invalid because [the actual type of the object pointed to isn't the desired subclass' type](https://www.cprogramming.com/reference/typecasting/dynamiccast.html).

We have two types of dynamic cast:
- Pointer dynamic cast - If a pointer is cast and it fails, the cast returns `NULL`. This is a quick and easy way to see if a given object is of a certain dynamic type.

Syntax:

`<type> *xsubclass = dynamic_cast<<type> *>( xobject );`

- Reference dynamic cast
It is not possible to return a NULL pointer to signify failure when casting a reference; [a dynamic cast of a reference variable would throw the `std::bad cast` (from the `typeinfo>` header) exception](https://www.xspdf.com/resolution/52556957.html).

Syntax:

`<type> subclass = dynamic_cast<<type> &>( ref_obj );`

Program to illustrate how dynamic casts works:

```c++
#include<iostream>
using namespace std;
class ClassA {
   public:
      virtual void display()const {
         cout << "This is from ClassA\n";
      }
};
class ClassB {
   public:
      virtual void display()const {
         cout << "This is from ClassB\n";
      }
};
class ClassC: public ClassA, public ClassB {
   public:
      void display()const {
         cout << "This is from ClassC\n";
      }
};
int main(){
   ClassA* x = new ClassA;
   ClassB* y = new ClassB;
   ClassC* z = new ClassC;
   x -> display();
   y -> display();
   z -> display();
   y = dynamic_cast< ClassB*>(x); //This cast will fail
   if (y)
      y->display();
   else
      cout << "No ClassB\n";
   x = z;
   x -> display(); //Displaying from ClassC
   y = dynamic_cast< ClassB*>(x); // There will be Successful casting done here
   if (y)
      y -> display();
   else
      cout << "No Class B\n";
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Dynamic-cast#main.cpp).

Output:
```bash
This is from ClassA
This is from ClassB
This is from ClassC
no ClassB
This is from ClassC
This is from ClassC
```
**Const cast**
It is used to cast away the immutability of variables. Inside a const member function, non-const class members can be modified with the cast.

Program to illustrate how const cast works:

```c++
#include <iostream>
using namespace std;

class employee
{
private:
  int rol;
public:
  // constructor
  employee(int r):rol(r) {}

  // A const function that changes rol with the help of const_cast
  void fun() const
  {
    ( const_cast <employee*> (this) )->rol = 10;
  }

  int getRoll() { return rol; }
};

int main(void)
{
  employee s(5);
  cout << "Old rol no: " << s.getRoll() << endl;

  s.fun();

  cout << "New rol no: " << s.getRoll() << endl;

  return 0;

}
```
Run the code [here](https://replit.com/@Dawe7/Const-cast#main.cpp).

Output:
```bash
Old rol no: 5
New rol no: 10
```
The compiler treats this as `const` **employee**, const this within const member function `fun()`, i.e. This is a constant pointer to a constant object, and therefore the compiler does not allow changing the data members by this pointer. The form of this pointer is changed to **employee** const this by `const cast`.

**Reinterpret Cast**

This is used to convert a pointer of one type to another of any type, regardless of whether the classes are related. It does not check [if the pointer type and the data that the pointer points to are the same](https://www.edureka.co/blog/type-conversion-in-cpp). There isn't a return type for it. It simply changes the type of the pointer. It only accepts one parameter, which is the source pointer variable for example:

```c++
// C++ program to illustrate the working of
// reinterpret_cast
#include <iostream>
using namespace std;

int main()
{
  int* m = new int(65);
  char* ch = reinterpret_cast<char*>(m);
  cout << *m << endl;
  cout << *ch << endl;
  cout << m << endl;
  cout << ch << endl;
  return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Reinterpret-Cast#main.cpp).

Output:
```bash
65
A
0xe2ee70
A
```
### Conclusion
This takes us to the conclusion of this C++ type conversion article. Through the use of type conversion provided by the c++ language, we can easily convert a data type from one type to another. I hope you found this article to be both insightful and useful in your day-to-day work as a developer.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)