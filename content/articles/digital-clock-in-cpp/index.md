---
layout: engineering-education
status: publish
published: true
url: /digital-clock-in-cpp/
title: Digital Clock in C++
description: In this tutorial, we will learn how to create a digital watch using the C++ programming language.
author: sabina-nyambura
date: 2021-11-18T00:00:00-10:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/digital-clock-in-cpp/hero.png
    alt: Digital clock in C++ Hero Image
---
A digital clock, as opposed to an analog clock, shows the time digitally (in numbers or other symbols). In this tutorial, we will develop a digital clock using C++.
 <!--more-->
Bjarne Stroustrup developed C++ in 1979 while working at Bell Labs. With its mix of high and low-level language characteristics, C++ is regarded as a medium language. 

### Prerequisites
To follow along with this tutorial, the reader should have:
- Some basic knowledge of C++ programming language. Check this article on [introduction to C++](https://www.section.io/engineering-education/intro-to-c-part1/).
- An IDE installed. We will use [Visual studio code](https://code.visualstudio.com/) in this 

### Table of contents
- [Project overview](#project-overview)
- [Obtaining the system current time](#obtaining-the-current-system-time)
- [Utilizing struct attributes](#utilizing-struct-attributes)
- [Displaying the digital clock](#displaying-the-digital-clock)
- [How to increment the time](#how-to-increment-the-time)
- [A complete demo of our project](#a-complete-demo-of-our-project)
- [Conclusion](#conclusion)

### Project overview
Conditions and loops are two important C++ concepts that we will practice when building the digital clock. 

We'll use the `time()` function to get the local time. 

To initialize our variables, we will use the `tm` structure, which contains data and time characteristics. 

Let's break down the digital clock program into smaller steps to make it easier to understand and complete. 

The following actions must be implemented:
- Use the `time()` method to determine the current system time.
- Initialize the `tm` structure with the hours, minutes, and seconds declarations.
- Show the current time on a digital clock using a `while` loop.
- Increase the hours, minutes, and seconds variables depending on the current situation and the input.
- Add a delay and then delete content from the screen.

### Obtaining the current system time
We use the following procedure to obtain the current time:
- Use the time library's `time()` method in C++. It provides an object of type time with the current time as a value.

- Use the `localtime()` method to convert a time to a `tm` identifier. An identifier is a name used to refer to a class of objects. 

- Declare a `timePtr` type pointer to hold the value returned by the `localtime()` function.

- The `tm` type allows us to manipulate time using characteristics such as `tm sec`, `tm min`, `tm hour`, and so on.

The following syntax is used to retrieve the local time:

```c++
time_t t = time(NULL);
    tm *timePtr = localtime(&t)
```

### Utilizing struct attributes
The arrow operator may be used to retrieve the properties of `timeptr`.

Set the time `sec` property to the value of the `sec` variable that you declared.

Initialize the variable `min` with the `tm min` attribute before declaring another one with the same name.

Use the `tm` hour property to set the hours variable to zero. Then, declare an AM/PM `timestr` variable.

The code below stores the local time in variables using pointers. The `if` condition is used to change the local time to the 12-hour clock format.

```c++
    time_t t = time(NULL);
    tm *timePtr = localtime(&t);

    int seconds = (timePtr->tm_sec);
    int minutes = (timePtr->tm_min);
    int hrs = (timePtr->tm_hour);

```

### Displaying the digital clock:
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
- Once the `sec` value reaches `60`, increment the `min` variable by `one`. Reset the `sec` back to one.
- In the same way, when the `min` reaches `60`, increment hours by `one` and reset the `min` variable to `0`.
- Set the hours to `00` when it reaches 24. This is because the standard time in the 24-hour system ranges from one to twenty-four.

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

After incrementing, the last step is to  add a delay and clear the screen simultaneously. 

To achieve this functionality, we will use the following steps:
- Use `system(cls)` to clear the `view`.
- We will add a `1000` ms delay using the `sleep()` function.

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
Here is the complete code for the digital clock application:

```c++
#include <iostream>
#include <ctime>
#include <windows.h>
using namespace std;

int main(){
    time_t t = time(NULL);
    tm *timePtr = localtime(&t); // stores the local time of the computer.

    int seconds = (timePtr->tm_sec);
    int minutes = (timePtr->tm_min);
    int hrs = (timePtr->tm_hour);


while (true){
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

![The digital clock](/engineering-education/digital-clock-in-cpp/digital-clock.png)

> Note that the displayed time will differ depending on your location.

### Conclusion
In the above tutorial, we have learned the steps required to create a digital clock. We also gained some knowledge on using `if` statements and `while` loops.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
