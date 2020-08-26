---
layout: engineering-education
status: publish
published: true
url: /engineering-education/if-else-loops/
title: If Else and Loops in C++
description: If Else Loops, what are they? How do they work? In this article we will be going over some programming basics such as while loops, and for loops.
author: Parampreet Singh
date: 2020-08-25T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/if-else-loops/hero.jpg
    alt: If Else Loops C++ image example
---
Let's continue from where we left off in the [previous article](https://www.section.io/engineering-education/intro-to-c-part1/). If you haven't had a chance to read it already, make sure you do to get a better understanding as we move forward. The previous article walked us through the importance of C++ as a programming language, the why and where it is being used today. Most importantly, we tried to go over the basic concepts of the C++ language that any developer would need to get started.
<!--more-->
The next most logical step would be for us to go over would be the concepts of **If Else**.

### Why do you need If Else
Suppose you want an algorithm that makes a choice. In that case what we want the program to do is:

One thing **If** a particular situation is true and **Else** if it's false.

For our example, let's write a program that takes a numerical score and tells you if you're passing (>60) or failing (<60):

```C
  #include<iostream>
  using namespace std;
  int main () {

  cout<<"Enter your score?"<<endl;
  double score;
  cin>> score;

     if(score >= 60) {
      cout<<"Congratulation! You passed"<<endl;
     }
     else{
      cout<<"Ohh! You failed"<<endl;
     }

  return 0;
  }
  ```

This program will print "Congratulation! You passed" if your score is greater than or equal to 60 and "You failed" if your score is less than 60.

Here’s what the output of this program would look like:

```C
Enter your score?: 75

Congratulations! You Passed
```

The If-Else example statement should be as simple as writing an ordinary English sentence.

Lets explore some operations available in C++ to compare the statement. Such as:

- **<** - less than

- **>** - greater than

- **<=** - less than or equal to

- **>=** - greater than or equal to

- **==** - are they equal

Some practice questions for your to try could be:

1. Write a program to check whether a number is positive or negative.
2. Write a program to check whether a year is a leap year or not.

The next important concept to review after **If Else** would be  **Loops**

### Loops
One of the most important features of the C++ programming language is the loop. What is it? What can we do with it?

It sends the flow of the control backward. To state it another way it lets us repeat the lines of our program. There are three kinds of loops.

- While loop
- For loop
- Do while loop

Most of the time, we will be using **While** and **For Loop**. Let's see what the differences are between these two and how they differ from **If-Else** statements.

**While Loop**
There is a True-False condition at the top. We only enter the block if the test is true, and do the whole block only if the test is true.
And the difference between If-Else and While loop is that at the end of the block we jump back and do the test again.

There is no else to a while statement.

Let's look at an example where you want the user to input a positive number, and if he/she doesn't, you can ask him/her again and again until he or she does. Here's the code snippet to it:

```C
  while (x<=0) {
  cout<<"No, silly! Enter a positive number"<<endl;
  cin>>x;
  }
  ```

**For Loop**
For loops are managed by a counting variable (often named as i, j or similar) and have three main parts:

- The initialization of the counting variable before the test.
- The test of the counting variable, to see if we go into the loop.
- The increment of the counting variable which we do before going back to the test.

Let's consider an example where you want to write your name ten times. Being the savvy programmer that you are, you wouldn't just write your name ten times. Instead, you would write an algorithm that does just that for you.

Here's the code snippet for it to help get you started:

```C
  for (int i=0; i<10; i++) {
    cout<<"Section.io"<<endl;
  }
  ```

This program will write Section.io ten times while taking `i` as an initializer and incrementing until `i` is less than 10.

The best way to practice loops would be by actually doing it. Here are some questions that you should consider working on as well:

- Write a program to accept a number from the user. And calculate the sum of all numbers between 1 and the given number.

- Write a program to print a multiplication table of a given number.

### Takeaway
In this article, we covered some basic and important topics such as **If Else** and **Loops**, that pave the foundation for Competitive Programming. The concept of If-Else and Loops are the bottom layer of Competitive Programming that any one would need to master before moving forward. In the following article, we will be covering other important topics such as Functions and File Handling. Stay tuned!
