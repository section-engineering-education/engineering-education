---
layout: engineering-education
status: publish
published: true
url: /engineering-education/functions-in-cpp/
title: Functions in C++
description: Functions in C++, what are they? How do they work? In this article we will be going over one of the most fundamental idea in programming.
author: parampreet-singh
date: 2020-09-03T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/functions-in-cpp/hero.jpg
    alt: functions Function C++ cpp
---
Let us continue from where we left off in the previous article [*Introduction to C++*](/engineering-education/intro-to-c-part1/). We started by going over the importance of C++ as a programming language, and where it is being used today. Most importantly, we tried to go over the basic concepts of the C++ language that any developer would need to get started. If you haven't had a chance to read it already, make sure you do to get a better understanding as we move forward.
<!--more-->

### Functions in C++

#### Why do we Need Functions?
- To write a task once that you will use multiple times.
- To break the task of writing a big program into smaller, more easily manageable pieces.
- To create a library of operations to use in multiple programs.

#### What are Functions?
Functions have a name and take zero or more parameters. The parameters are how information gets sent to the function. The function only cares about the order of the parameters, and it doesn't know or care about the names of the variables in your program.

The only way to send information to a function is through parameters, and the only way a function can send information back to the scope above is by returning the value.

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

The function ` max_of_three ` would take three parameters and returns the largest of the three parameters.

Now let's see how to call (implement) this function in main.

```C
#include<iostream>
using namespace std;
int main() {
cout<<"enter the three number to compare:"<<endl;
int one, two, three;
cin>>one>>two>>three;

//Yes, that's how you can call any function in the main
max_of_three (one, two, three)<<endl; //so it prints something

return 0;
}
```

That's how we would write and implement functions in C++.

Let's go through another example of functions where we will be printing a rectangle of * characters.

When writing functions, you should ask yourself some questions.

1. What should the name of the function be?
2. What parameter(s) should I use?
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

Let's see what a sample output could be, and then we will go into some details.

```C
Enter the number of rows: 5
Enter the number of columns: 5

*****
*****
*****
*****
*****
```

The only big difference in the function above is **void print_rectangle**. Usually, we write **int** but why did we write **void** this time?

This is because of the fact that this function doesn't return anything. For these kinds of functions, we use **void** instead of **int**. Functions that aren't supposed to return anything are of type **void** and functions that are supposed to return something are of type **int**.

That's how easy it is to write functions. It's a must for any developer to have a strong grasp or understanding on how to write functions. As typically a developer wouldn't write their entire program in the main function, let's say for example, during a competitive programming event and/or during any technical interviews.   

Moving forward, I would suggest working on some practice problems to get better and more familiar with functions. You can try working on the following example problems:

- Write a function to find the square root of two numbers.
- Write a function to find the sum and division of two numbers.

### Conclusion
We covered one of the most important concepts of programming, *functions* - how do they work, what they are used for, and how they can be helpful in interviews and/or competitive programming events. In the upcoming articles, we will be moving to some intermediate programming concepts such as Data Structures and Algorithms.

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)
