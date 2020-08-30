---
layout: engineering-education
status: publish
published: true
url: /engineering-education/functions-in-cpp/
title: Functions in C++
description: Functions in C++, what are they? How do they work? In this article we will be going over one of the most fundamental idea in programming.
author: Parampreet Singh
date: 2020-08-30T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/functions-in-cpp/hero.jpg
    alt: functions Function C++ cpp 
---
Let us continue from where we left off in the previous article [*Introduction to C++*](/engineering-education/intro-to-c-part1/). We started by going over the importance of C++ as a programming language, and where it is being used today. Most importantly, we tried to go over the basic concepts of the C++ language that any developer would need to get started. If you haven't had a chance to read it already, make sure you do to get a better understanding as we move forward. 
<!--more-->
Let us continue from where we left off in the previous article [*If Else and Loops*](/engineering-education/if-else-loops/). We talked about If Else and Loops in the previous article. If you haven't had a chance to read it already, make sure you do to get a better understanding as we move forward. In this article, we will be going over the topic of Functions.

## Functions in C++

### **What are Functions?**

Functions have a name and take zero or more parameters. The parameters are how information gets sent to the function. The function only cares about the order of the parameters. It doesn't know or care about the names of the variables in your program. 

The only way to send information to a function is through parameters. And the only way a function can send information back is by returning the value.

**Why do we need function?**

* To write a task once that you'll use a bunch of times.
* To break the task of writing a big program into smaller, more easily handleable pieces.
* To create a library of operations for use in multiple programs

Let's write a function that returns the largest of the three parameters:

```C
int max_of_three (int one, int two, int three) {

//If one is greater than or equal to two and three: return one
if (one>=two && one>=three)
   return one;

//If two is greater than or equal to one and three: return two
else if (two>=one && two>=three)
  return two;

//If none of the above statements is true, then three would be the highest: return three
else
  return three;
}
```
The function max_of_three would take three parameters and return the largest of the three parameters.

Now let's see how to call (implement) this function in main. 

```C
#include<iostream>
using namespace std;
int main() {
cout<<"enter the three number to compare:"<<endl;
int one, two, three;
cin>>one>>two>>three;

//Yes, Just that's how you can call any function in the main
max_of_three (one, two, three);

return 0;
}
```
That's how we write and implement functions in C++. 

Let's go through another example of functions where we will be printing a rectangle of * character.

When writing functions, you should ask yourself some questions.

1. What should be the name of the function?
2. What parameter should I use?
3. What do I return?

```C
void print_rectangle (int num_rows, int num_cols) {
    for (int i=0; i<num_rows; i++){
       for (int j=0; j<num_cols; j++){
             cout<<"*";
       }
cout<<endl;
    } 
}
```

Now let's see how to call (implement) this function in main. 

```C
#include<iostream>
using namespace std;
int main() {

cout<<"enter the number of rows:"<<endl;
int rows;
cin>>rows;

cout<<"enter the number of columns:"<<endl;
int cols;
cin>>cols;

//Now call the function
print_rectangle (rows, cols);

return 0;
}
```

Let's see what the output would be, and then we will go into some details.

```C
Enter the number of rows: 5
Enter the number of columns: 5

*****
*****
*****
*****
*****
```

The only new thing for us in the above function is **void print_rectangle**. Usually, we write **int** but why **void** this time? 

It's because of the fact that this function doesn't mean to return anything. And for these kinds of functions, we use **void** instead of **int**.

That's how easy it is to write functions. It is a must for a developer to hold a strong grasp on how to write functions as one doesn't write whole main programs during competitive programming and technical interviews.  

Everything is already given to the developers. Developers only tend to write functions. 

I would suggest working on some practice problems to get better. You can try working on the following questions:

Write a function to find the square root of two numbers.
Write a function to find the sum and division of two numbers.

## Conclusion

In this article, we covered one of the most important concepts of programming interviews and competitive programming. In the upcoming articles, we would be moving to some intermediate programming concepts such as Data Structures and Algorithms
