---
layout: engineering-education
status: publish
published: true
slug: intro-to-C++-part01
title: Introduction to C++
description: This intro is about C++ and goes through topics such as why C++?, who uses C++in the industry, basic implementation.
author: Parampreet Singh
date: 2020-08-17T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/intro-to-C++-part01/hero.jpg
    alt: image example
---
There are many languages in the industry at the moment, but C++ has been used for a long time now(back to 1979). It is being used by companies from young startups to well-established companies like Facebook and Google.
<!--more-->
### Why C++?
C++ is a powerful language. It allows a developer to have a lot of control as to how they use their computer resources. It is considered remarkably cheap and fast. Therefore, Developers always prefer C++ to build web browsers, game engines, games, and desktop apps.

Some of the best applications built with C++ are:

- Apple OS X Operating System
- Microsoft Operating System including Microsoft Office, Internet Explorer, and Visual Studio
- MySQL Server
- Mozilla Firefox
- Adobe System
- Google Chrome
- PayPal
- Amazon

And the list goes on. You can count the applications built using C++ for days.

C++ is a beginner-friendly language that anybody can start learning with or without any prior programming experience. The online community is so strong that you will never feel left out of any resources or lack any help regarding C++.

In this series of guides, will we go from basics to the more advanced levels.
So let's jump straight into learning.

### What do you need beforehand
- A working PC or a Computer
- An IDE

The first question that comes to mind would be, what is an IDE? It is an Integrated Development Environment where you will write your C++ code and run it.
To get started, you can download [Visual studio code](https://code.visualstudio.com/) as it is a simple and beginner-friendly text editor software.

Let's dive into coding:

### Hello World
Let's write a Hello World program. We will break it down line by line:

1. // This is a sample C++ Program
2. #include<iostream>
3. using namespace std;
4. int main() {
5. cout<<"Hello World"<<endl;
6. return 0;
7. }


This program will print Hello World to the screen. Let's examine it line by line to see what it means.

- Line 1 - **//This is a sample C++ Program**

Any line of a program that begins with a "//" is a comment. The compiler will ignore this line.

Comments are there to be read by people. You should always write comments for each major step of the algorithm to explain something weird or cool that is happening. That way, anyone working along with you or for you would be able to understand what you were trying to do.

- Line 2 - **#include<iostream>**

C++, by itself, cannot do input or output, so we add functionality to C++ by including libraries. For example, :<iostream> is a library that has commands for input from the keyboard and output to the screen.

- Line 3 - **using namespace std;**

It is something that you cannot avoid and have to write in every single program that you will write in your whole life. As defined by Danoja Das on [medium](https://medium.com/breaktheloop/why-using-namespace-std-is-used-after-including-iostream-dc5ae45db652), when we run a program to print something, “using namespace std” says if you find something that is not declared in the current scope go and check std. using namespace std; are used. It is because computer needs to know the code for the cout, cin functionalities and it needs to know which namespace are defined.

- Line 4 - **int main ( ) {**

The aforementioned line tells the compiler that this is the beginning of the main program. **{** means the start of the block of the program.

- Line 5 - **cout<<"Hello World"<<endl;**

**cout** is our "output to the screen" statement. **"endl"** takes you the next line. **";"** ends a C++ statement.

- Line 6 - **return 0**

This means that this is the end of our program.

- Line 7 - **}**

The line above is our closing bracket to end the program.

Congratulations! You just wrote your first C++ program.

Let's write another program that would read two numbers and output the sum of them.
`  

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

Here's what the output would like to this program:

         enter your first number to add: 7

         enter your second number to add: 13

         7+13 = 20

Let's discuss the things that are new to us in this program above.

1. **int num_one** - This means that we are reserving space in memory to hold an integer (int). And we are naming that space num_one.

Integers hold positive as well as negative values (and 0) and include non-decimal numbers up to about +-2 billion, which gives you an exact value between +- 2 billion.

Just like int, we also have double. It can hold large as well as small numbers. It can also be an exponent. Here is how we use it in a program.

`double first_one;`   

2. **cin>>num_one** - This is the way of accepting an input from the user in the same memory location that we reserved earlier.

And that is all you need to know to write basic programs in C++. We will go over other new things as we continue.

The best way to get more of a grasp on how to go about writing basic C++ programs would be to practice some questions on your own.
Why don't you work on some practice problems before moving forward? For example you could try to:

- Write a program to convert a temperature from Fahrenheit to Celsius?
And
- Write a program to implement a small multiplication table?

### Takeaway
In this article, we got to explore the importance of C++ and why and where it is being used. Most importantly, we learned about the basics of the C++ language and broke down a simple Hello World example. In the next article, we will be moving forward with If Else and Loops. Stay tuned!
