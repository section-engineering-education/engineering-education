### Introduction
A non-member function cannot have access to the private data of a class.  However, there could be a situation where we would like two classes to share a particular function.  C++ allows the common function made friendly with both the classes, thereby allowing the function to have access to the private data of these classes. in this article, we will take a look at how to make a non-member function friend to a class.

#### Prerequisites
To follow this article, you’ll need:
- [Codeblocks](http://www.codeblocks.org/downloads) IDE to run the code.
- Basic understanding of C++ language.
- Basic understanding of functions.

#### What we’ll go through
1. [Definition of Friend functions](#what-is-a-friend-function)
2. [Importance of Friend functions](#why-do-we-need-friend-functions)
3. [Syntax of Friend functions](#syntax-of-friend-functions)
4. [Friend function declaration](#friend-function-declaration)
5. [Friend class](#friend-class)

#### What is a friend function?
A friend function is a function that is defined outside that class's scope but it has the right to access all private and protected members of the class. A friend may be a function, function template, or function of a member, or a template of a class or class, in which case friends are the whole class and all its members.

#### Why do we need friend functions?
In special cases when a class’s private data needs to be accessed directly without using objects of that class. For example, consider a case where two classes, director and doctor have been defined. We would like to use a function `income_tax` to operate the objects of both these classes. Such a function need not be a member of any of these classes.

#### Special characteristics of friend functions:
- A friend function is not in the scope of the class to which it has been declared as a friend. Hence, functionality is not limited to one class.
- A friend function can be a global function or a member of another class.
- A friend function can be declared either in the public or the private part of a class without affecting its meaning.
- A friend function cannot be called using objects of the class, since it is not in the scope of the class.
- A friend function can be invoked like a normal function without the aid of any object.
- Friend functions use objects of the class as arguments.
- Unlike member functions, it cannot access the member names directly and has to use an object name and dot membership operator with each member name. e.g  `A.x` where x is the object.

##### Syntax of friend functions:
To make an outside function “friendly” to a class, we have to simply declare this function as a friend of the class as shown below:

```c++
class className{

 ……

 friend returnType functionName(arg list);
 };
```
As shown above, the friend function is declared inside the class whose private and protected data members are to be accessed.

We can breakdown the syntax as follows:
- `friend` is a keyword  to denote this a friend function.
- `returnType` is the return type of the function.
- `functionName` is the name of the function being made friendly.
- `arg list` is the arguments passed into the function.

The function is defined elsewhere in the program like a normal function in C++. The function definition does not use a scope resolution  operator`::` or have the `friend` keyword.  A function can be declared as a friend in any number of classes.

#### Friend function declaration

```c++
//Program to illustrate 
//Friend function

#include<iostream>

using namespace std;

class sample
{
int x, y;
public:
void set_value()
{
x=20;
y=40;
}
friend float mean(sample s);  //declaration of friend function
};

float mean(sample s)
{
return float(s.x+s.y)/2.0; //friend function definition
}
int main()
{
sample v;
v.set_value();
cout<< "Mean value:" <<mean(v);
return 0;
}
```
The output of our program will be:
Mean value: 30

Let's break down the program below:

We have declared the friend function  `float mean` that takes objects as arguments. The friend function has been defined outside the class. The friend function thus accesses the variables of the class `x` and `y`, by using the dot operator`.` and the object passed to it. The function call mean(v) passes the object `v` by value to the friend function.

Through the use of the `friend` keyword, we can make member functions of one class be friend functions of another class. In such cases, they are defined using the scope resolution operator, as shown below:

```c++
class x
{
…….
…….
int fun1();    // member function of X
…….
};

class Y
{
…….

…….

friend int X::fun1();	//fun1() of X
…….			//is a friend of y

};
```

The function `fun()` is a member of `class X` and a friend of `class Y`.

#### Friend Class

 A friend class can access private and protected members of other classes in which it is declared as a friend. It is sometimes useful to allow a particular class to access private members of another class. Friend functions are used to work as a link between the classes.

##### Syntax of friend class:

```c++
class A{
……
friend class B;
};
class B{
……..
};
```
As illustrated above, `class B` is a friend of `class A`. So `class B` can access the private and protected data members of `class A`. But this does not mean that `class A` can access private and protected data members of `class B`.
 
**Note:** Friendship is not mutual unless we make it so. likewise, class friendship is not inherited. This means that as class B is a friend of class A, it will not be a friend of the sub-classes of class A.

Example of a program to illustrate friend class:
```c++
//Program to illustrate
//Friend class

#include<iostream>

using namespace std;

class ABC;       //forward declaration

class EFG
{
int x;

public:
void set_value(int i)
{
x=i;
}
friend void max(EFG, ABC);  //declaration of friend function
};
class ABC
{
int a;

public:
void set_value(int i)
{
    a=i;
}
friend void max(EFG, ABC);
};

void max(EFG m, ABC n)  // definition of friend
{
if(m.x > n.a)
    cout<<m.x;
else
    cout<<n.a;
}
int main()
{
ABC abc;
abc.set_value(10);
EFG efg;
efg.set_value(20);
max(efg,abc);
return 0;
}

The output will be:
20

```
The function `max()` has arguments from both class EFG and ABC. When the function `max()` is declared as a friend for the first time, the compiler will not acknowledge the presence of ABC unless its name is in the beginning as `class ABC;`. This is known as forward declaration.

As pointed out earlier, a friend function can be called by reference. In this case, local copies of the objects are not made. Instead, a pointer to the address of the object is passed and the called function directly works on the actual object used in the call.

This method can be used to alter the values of the private members of a class. Remember, altering the values of private members is against the basic principles of data insulation. It should be used only when necessary.

#### Here are some important points to note on friend functions and classes: 

- Friend functions should be used for restricted purposes only. This because having too many friend functions and classes can compromise the OOP feature of encapsulation in our program.
- Friendship is not reciprocal. If class X is Y’s friend, then Y does not automatically become X’s friend.
- Friendship cannot be inherited.

### Conclusion
In this article, we got to explore friend functions and friend class, what they and where they are used. By making a function and class "friendly" we reduce having too many functions therefore, we have programs that are  maintainable and easy to read.