## If Else and Loops in C++

Let's move forward from where we left off from the previous article. The next most important concept that comes right after the basic concepts of programming is If Else.

### Why do you need If Else
Suppose you want an algorithm that makes a choice. In case you want the program to do one thing **If** a particular situation is true and **Else** if it's false.

Let's write a program that takes a numerical score and tells you if you're passing (>60) or failing (<60):

  #include<iostream>
  using namespace std;
  int main () {
  cout<<"Enter your score?"<<endl;
  double score;
  cin>> score;
     if(score >= 60) {
      cout<<"You passed"<<endl;
     }
     else{
      cout<<"You failed"<<endl;
     }
  return 0;
  }

This program will print "You passed" if your score is more than 60 and "You failed" if your score is less than 60.

The If-Else statement is just as simple as writing an English sentence. 

There are some operations available in C++ to compare. Such as:

* **<** - less than

* **>** - greater than 

* **<=** - less than or equal to

* **>=** - greater than or equal to

* **==** - are they equal

Some questions to work on for practice would be:

1. Write a program to check whether a number is positive or negative.
2. Write a program to check whether a year is a leap year or not.
   
### Loops

One of the most important features of the programming language is the loop. What is it? Why do we need it?

It sends the flow of the control backward. It lets us repeat the lines of our program. There are three kinds of loops.

* While loop
* For loop
* Do while loop

But most of the time, we will be using **While** and **For Loop** only. Let's see what the differences are between them and how they are different from **If-Else** statements.

**While Loop** 

There is a True-False condition at the top. We only enter the block if the test is true, and do the whole block only and if the test is true.
And the difference between If-Else and while loop is that at the end of the block we jump back and do the test again. There is no else to a while statement.

Let's see an example where you want the user to input a positive number, and if he doesn't, you can ask him again and again until he or she does. Here's the code to it:

  while (x<=0) {
  cout<<"No, silly! Enter a positive number"<<endl;
  cin>>x;
  }

**For Loop**

For loops are managed by a counting variable (often named as i, j or similar) and have three main parts:

* The initialization of the counting variable before the test.
* The test of the counting variable, to see if we go into the loop.
* The increment of the counting variable which we do before going back to the test.

Let's consider an example where you want to write your name ten times. Being a programmer, you won't just write your name ten times. Instead, you would write an algorithm that does that for you. Here's the code for it:

  for (int i=0; i<10; i++) {
    cout<<"Section.io"<<endl;
  }

This program will write Section.io ten times while taking i as an initializer and incrementing until i is less than 10.

The best way to practice looping would be by actually practicing it. Here are some questions that you should consider working on:

* Write a program to accept a number from the user. And calculate the sum of all numbers between 1 and the given number.
* Write a program to print a multiplication table of a given number.

### Takeaway

In this article, we covered the most important topics that one needs in his/her career. The concept of If-Else and Loops are the bottom layer of Competitive Programming that one needs to master before moving forward. In the next article, we will be covering some more important topics such as Functions and File Handling. Stay tuned!
