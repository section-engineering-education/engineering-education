---
layout: engineering-education
status: publish
published: true
url: /engineering-education/intro-to-c-part1
title: Introduction to C++
description: This introduction is about C++ and goes through topics such as why C++?, who uses C++ in the industry, and basic implementation.
author: parampreet-singh
date: 2020-08-19T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/intro-to-c-part1/hero.jpg
    alt: intro to C++
---
There are many languages being used in the industry at the moment, but C++ has been used for a long time now (been around since 1979). It is being used by companies from young startups to well-established companies like Facebook and Google.
<!--more--> 

### Why C++?
C++ is a powerful language. It allows a developer to have a lot of control as to how they use their computer resources. It is considered remarkably cheap and fast. Therefore, many developers prefer C++ to build web browsers, game engines, games, and desktop apps due to high performance, full control over system resources, ability to design layout of data structures, and portability.

Some of the better known applications built with C++ are:

- Apple OS X Operating System
- Microsoft Operating System including Microsoft Office, Internet Explorer, and Visual Studio
- MySQL Server
- Mozilla Firefox
- Adobe System
- Google Chrome
- PayPal
- Amazon

And the list goes on. You can count the applications built using C++ for days.

C++ is a beginner-friendly language that anybody can start learning, with or without any prior programming experience. The online community is so strong that you will never feel left out of any resources or lack any help regarding C++.

I highly recommend checking out this [Github repo](https://github.com/danistefanovic/build-your-own-x), which teaches us about different things that we can build using C++.

In this series of guides, will we go from basics to the more advanced levels. So let's jump straight into learning.

### Prerequisites
- A working computer
- An IDE

The first question that comes to mind would be, what is an IDE? It is an Integrated Development Environment where you will write your C++ code and run it. To get started, you can download [Visual Studio Code](https://code.visualstudio.com/), as it is a simple and beginner-friendly text editor software.

Let's dive into coding.

### Hello World
Let's write a Hello World program. We will break it down line by line:

```C {linenos=inline,linenostart=1}
// This is a sample C++ Program
#include<iostream>
using namespace std;
int main() {
cout<<"Hello World"<<endl;
return 0;
}
```


This program will print Hello World to the screen. Let's examine it line by line to see what it is doing.

- Line 1 - **//This is a sample C++ Program**

Any line of a program that begins with a "//" is a comment. The compiler will ignore this line.

Comments are there to be read by people. A comment is a programmer-readable explanation or annotation in the source code of a computer program. That way, anyone working along with you is able to understand what you were trying to do.

- Line 2 - **#include<iostream>**

C++, by itself, cannot do input or output, so we add functionality to C++ by including libraries. For example, :<iostream> is a library that has commands for input from the keyboard and output to the screen.

- Line 3 - **using namespace std;**

Using **namespace std,** tells the compiler to use the standard namespace. Namespace collects identifiers used for class, object, and variables. NameSpace can be used in two ways in a program, either by the use of using statement at the beginning (just as we used in the above sentence) or by using the name of namespace as a prefix before the identifier with scope resolution (::) operator. You can read more about it on [medium](https://medium.com/breaktheloop/why-using-namespace-std-is-used-after-including-iostream-dc5ae45db652)

- Line 4 - **int main ( ) {**

The aforementioned line tells the compiler that this is the beginning of the C++ program. It is the point at which execution of program is started. When a C++ the program is executed, the execution control goes directly to the main() function. **{** means the start of the block of the program.

- Line 5 - **cout<<"Hello World"<<endl;**

**cout** is our "output to the screen" statement. **"endl"** takes you the next line. **";"** ends a C++ statement.

- Line 6 - **return 0**

This means that this is the end of our program.

- Line 7 - **}**

The line above is our closing bracket to end the program.

Congratulations! You just wrote your first C++ program.

Let's write another program that reads two numbers and outputs the sum of them.
  
```C
// program to add two numbers

#include <iostream>
using namespace std;

int main(){
cout<<"enter your first number to add"<<endl;
int num_one;
cin>>num_one;

cout<<" Enter your second number to add"<<endl;
int num_two;
cin>>num_two;

int sum;
sum = num_one + num_two;
cout<<num_one<<"+"<<num_two<<"="<<sum<<endl;

  return0;
 }`  
 
 ```

Here's what the output of this program would like:

```C
enter your first number to add: 7

enter your second number to add: 13

7+13 = 20
 
```

Let's discuss the things that are new to us in this program above.

1. **int num_one** - This means that we are reserving space in memory to hold an integer (int). And we are naming that space num_one.

Integers hold positive as well as negative values (and 0) and include non-decimal numbers up to about +-2 billion, which gives you an exact value between +- 2 billion.

Just like int, we also have double. It can hold large as well as small numbers. It can also be an exponent. Here is how we use it in a program.
```C
double first_one;
```  

2. **cin>>num_one** - This is the way of accepting an input from the user in the same memory location that we reserved earlier.

And that's some of the important basics to get started in C++. The best way to get more of a grasp on how to go about writing basic C++ programs would be to practice some questions on your own. Why don't you work on some practice problems before moving forward?

For example you could try to write a program to:

- Convert a temperature from Fahrenheit to Celsius
- Implement a small multiplication table

### Takeaway
In this article, we got to explore the importance of C++ and why and where it is being used. Most importantly, we learned about the basics of the C++ language and broke down a simple Hello World example. In the next article, we will be moving forward with If Else and Loops. Stay tuned!
