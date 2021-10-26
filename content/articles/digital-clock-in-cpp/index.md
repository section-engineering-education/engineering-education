---
layout: engineering-education
status: publish
published: true
url: /digital-clock-in-cpp/
title: Digital clock in cpp
description: In this tutorial, we will learn how to create a digital watch using the C++ programming language in a step-by-step manner.
author: sabina-nyambura
date: 2021-10-26T00:00:00-18:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/digital-clock-in-cpp/hero.png
    alt: Digital clock in cpp Hero Image
---
A **digital clock**, as opposed to  an analog clock, shows the time digitally (in numbers or other symbols). There is a misconception that digital watches and electronic drives are synonymous.
 <!--more-->
But, this is not true. The term "digital" only describes the time display, not the actual campaign itself. In this tutorial, we will learn how to create a digital watch using the C++ programming language in a step-by-step manner.

Bjarne Stroustrup developed C++ in 1979 while working at Bell Labs. With its mix of high-level and low-level language characteristics, C++ is known as a medium language. Since C++ is a superset of C, it's possible to write a valid C++ program.

### Prerequisites
To follow along with this tutorial, the reader should:
- Have basic knowledge of the C++ programming language. Check the article on [introduction to C++](https://www.section.io/engineering-education/intro-to-c-part1/) to learn about the C++ programming language.
- Have an IDE installed. Click [here](https://code.visualstudio.com/)
 to install Visual studio code. 

> Visual studio code supports almost every major programming language. That is why I recommend using it as our IDE.

### Table of contents
- [An overview of our project](#an-overview-of-our-project)
- [Obtain the system current time](#obtain-the-system-current-time)
- [Utilize struct attributes](#utilize-struct-attributes)
- [Display the digital clock](#display-the-digital-clock)
- [How to increment the time](#how-to-increment-the-time)
- [A complete demo of our project](#a-complete-demo-of-our-project)
- [Conclusion](#conclusion)

### An overview of our project
To build our digital watch, we will use a c++ program. Conditions and loops are two important c++ programming concepts that we will practice here. 

We'll use the `time()` function to get the local time. To initialize our variables, we will use the `tm` structure, which contains data and time characteristics. An excellent C++ digital clock application will be built using an endless `while` loop.

Let's break down the digital clock program into more miniature stages to make it easier to understand and complete. These are the actions that must be taken:
- Use the `time()` method to find out what time it is right now on your machine.
- Initialize the `tm` structure with the hours, minutes, and seconds declarations.
- In an endless while loop, show the current time on a digital clock.
- Increase the hours, minutes, and seconds variables depending on the current situation and the input.
- Add a delay and then delete all prior times from the screen.

### Obtain the system current time
To be able to get the system current time, use the following procedure:
- Use the time library's `time()` method in C++. It provides an object of type time `t` with the current time as a value.
- Use the `local time()` method to convert a time to identifier's reference to a `tm` identifier.
An identifier is a name used to identify a single thing or a single class of objects. The `object` or class may be a concept, a countable physical object, or a physical noncountable substance.
- Declare a `timePtr` tm type pointer to hold the `localtime()` function's result.

A pointer is a kind of object in computer programming that keeps track of a memory location. Other values in computer memory or memory-mapped devices may serve as examples of this.

- Using the `tm` structure type, we can manipulate time by using characteristics like `tm sec`, `tm min`, `tm hour`, and so on.

The syntax below is used to get the local time.

```c++
time_t t = time(NULL);
    tm *timePtr = localtime(&t)
```

### Utilize struct attributes
- The arrow operator may be used to retrieve the properties of `timeptr`, a pointer to a struct to object.
- Set the time `sec` property to the value of the `sec` variable you declared.
- Initialize the variable `min` with the `tm min` attribute before declaring another one with the same name.
- Use the `tm` hour property to set the hours variable to zero.
- Declare an AM/PM `timestr` variable.

The code below stores the local time in the variables using the pointers. And, the `if` condition is used to change the local time to the 12-hour clock format.

```c++
    time_t t = time(NULL);
    tm *timePtr = localtime(&t);

    int seconds = (timePtr->tm_sec);
    int minutes = (timePtr->tm_min);
    int hrs = (timePtr->tm_hour);

```

### Display the digital clock
To achieve the idea of showing the user the working digital watch, I used the `while` loop condition. The procedure below gives an idea of how to output the clock.
- To construct an endless loop, use a while loop with actual instead of any condition.
- Print the variable hours, minutes, and seconds.
- To make it appear suitable, print appropriate gaps and lines.

Use the loop below:

```c++
while (true)
    {
        system("cls");

        cout << "The digital time is:";

        cout << "      |" << hrs << " : " << minutes << " : " << seconds << " " << endl;
    }
```

Since we have created our digital clock, the next step changes the time on our digital clock.

### How to increment the time
Follow the procedure below to increment the time in our digital clock:
- Increment the `sec` variable on every iteration of the while loop.
- Once the sec value reaches 60, increment the `min` variable by one and set the `sec` back to one.
- In the same way, when the `min` reaches 60, increment hours by one and set the `min` variable to 0.
- Set the hours to 00 when it reaches 24. This is because the standard time in the 24-hour system ranges from one to twenty-four repeatedly.

Use the code below to accomplish the time increment.

```c++
 while (true)
    {
        // This increases the seconds
        sec++;
        if (seconds >= 60)
        {
            seconds = 1;
            minutes++;
        }
        // This increases the minutes
        if (minutes >= 60)
        {
            minutes = 0;
            hrs++;
        }
        // This increases the hours
        if (hrs >= 24)
        {
            hrs = 00;
        }
    }
```

After incrementing, the last step is to ask ourselves how to add delay and clear the screen simultaneously. To achieve this, we will use the steps below:
- Use `system(cls)` to remove the prior staff from view.
- To give our digital clock software some slack, we'll use the `sleep()` function.
- Add a one-second delay by entering a value of 1000.
- The `window.h` header has a `sleep()` method.

```c++
while (true)
    {
        system("cls");

        cout << "The digital time is:";

        cout << "      |" << hrs << " : " << minutes << " : " << seconds << " " << endl;
        //increment sec min and hours
        sec++;
        if (seconds >= 60)
        {
            seconds = 1;
            minutes++;
        }
        // This increases the minutes
        if (minutes >= 60)
        {
            minutes = 0;
            hrs++;
        }
        // This increases the hours
        if (hrs > 24)
        {
            hrs = 00;
        }

        Sleep(1000);
    }

```

### A complete demo of our project

```c++
#include <iostream>
#include <ctime>
#include <windows.h>
using namespace std;

int main()
{
    time_t t = time(NULL);
    tm *timePtr = localtime(&t); // stores the local time of the computer.

    int seconds = (timePtr->tm_sec);
    int minutes = (timePtr->tm_min);
    int hrs = (timePtr->tm_hour);


while (true)
    {
        system("cls");

        cout << "The digital time is :";
        // This output the message "The digital time is :"

        cout << "      |" << hrs << " : " << minutes << " : " << seconds << " " << endl;
        //increment sec min and hours
        seconds++;
        if (seconds >= 60)
        {
            seconds = 1;
            minutes++;
        }
        // This increases the minutes
        if (minutes >= 60)
        {
            minutes = 0;
            hrs++;
        }
        // This increases the hours
        if (hrs > 24)
        {
            hrs = 00;
        }

        Sleep(1000);
    }

    return 0;
}
```

The output will be:

![The digital clock](/engineering-education/digital-clock-in-c++/digital-clock.png)

> The time to be displayed will differ depending on the local time on your device.

### Conclusion
From the tutorial above, we learned the steps to create a digital clock. At the end we were able make an example clock to experiment with the knowledge learned in the article. Also, we gained some knowledge on using `if` statements and also the loops using the `while` loop.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)