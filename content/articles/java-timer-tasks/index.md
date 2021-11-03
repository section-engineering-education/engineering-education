---
layout: engineering-education
status: publish
published: true
url: /java-timer-tasks/
title: Implementing Timer Tasks in Java
description: This article will guide the reader on how to implement Timer Tasks in Java. This class allows one to schedule the execution of different processes.
author: joseph-ongoma
date: 2021-11-03T00:00:00-11:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-timer-tasks/hero.jpg
    alt: Java Timer Tasks Hero Image
---
Java programming language provides a class utility known as Timer Task. It allows one to schedule different tasks.
<!--more-->
In other words, a task can be executed after a given period or at a specified date and time.

A `Timer` in Java is a process that enables threads to schedule tasks for later execution.

Scheduling is done by keeping a specific process in the queue such that when the execution time comes, the processor can suspend other processes and run the task.

### Table of contents
- [Prerequisites](#prerequisites)
- [Java timer task methods](#java-timer-task-methods)
    - [Cancel() Method](#cancel-method)
    - [Run() Method](#run-method)
    - [ScheduleExecutionTime() Method](#scheduleexecutiontime-method)
- [Code example](#code-example)
- [Conclusion](#conclusion)

### Prerequisites
To understand this article better you will need to:
- Have a basic understanding of [Java](https://www.w3schools.com/Java/default.asp)
- Have a code editor such as [Intellij Idea](https://www.jetbrains.com/idea/download/#section=windows).

### Java Timer task methods
There are three Java Timer Task Methods:
- `cancel()` method
- `run()` method
- `ScheduleExecutionTimer`

##### Cancel() method
This method cancels a scheduled task in Java. It means that no task will be executed in a particular period.

##### Run() method
The `run()` method is responsible for running the scheduled task.

##### ScheduleExecutionTime() Method
This method returns the scheduled execution time for the latest task in memory.

### Code example
When you have finished downloading IntelliJ IDEA, run it as administrator and then follow the prompts on the screen to finish setting it up. 

After installing the IDE, launch it and click on `New Project`, as shown in the figure below:

![New](/engineering-education/java-timer-tasks/new.jpg)

Select `java` then click `Next`:

![Java](/engineering-education/java-timer-tasks/java.jpg)

Check the `Create project from template` and click  `Next`:

![Project template](/engineering-education/java-timer-tasks/commandline.jpg)

On the next screen, enter the project name as `TimerTask` and click `Finish`. We will be able to write our code on the next screen. The environment should look like this:

![Enviroment](/engineering-education/java-timer-tasks/environ.jpg)

Let's create an example that schedules a task and displays the message `Happy Birthday John Doe` when the date is `October 30th, 2021 at midnight`.

```java
package com.company;
import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;
public class Main {
    public static void main(String[] args) {
        Timer T = new Timer();
        TimerTask Birthday = new TimerTask(){
            @Override
            public void run(){
                System.out.println("Happy Birthday John Doe");
            }
        };
        Calendar date = Calendar.getInstance();
        date.set(2021, Calendar.OCTOBER, 31, 0, 0, 0);
        T.schedule(Birthday, date.getTime());
    }
}
```

The output of the above code will be:

```bash
Happy Birthday John Doe
```

In the above code, we are importing the `Calendar`, `Timer`, and `TimerTask` utilities.

`Timer T = new Timer()` is the instance of a timer that keeps track of time. `Birthday` is the task to be executed by the TimerTask.

When the time is up, the `run` function of the `TimerTask` instance is executed.

The `schedule` function links the task to the timer. This method references the task that will be executed.

In the following example, we will create an instance of `Calendar Date` and set the `YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE`, and `SECOND` that the task will be executed.

We can also include a count-down timer in the project so that our timer starts counting before the task executes. 

This can be achieved using `if` statements and `decrement` operators as shown below:

```java
package com.company;
import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;
public class Main {
    public static void main(String[] args) {
        Timer T = new Timer();
        TimerTask Birthday = new TimerTask(){
            int i = 5;
            @Override
            public void run(){
                if(i>0){
                    System.out.println(i);
                    i--;
                }
                else{
                    System.out.println("Happy Birthday John Doe");
                    T.cancel();
                }
            }
        };
        Calendar date = Calendar.getInstance();
        date.set(2021, Calendar.OCTOBER, 30,23, 59, 54);
       T.scheduleAtFixedRate(Birthday, date.getTime(), 1000);
    }
}
```

The output of the code now is shown below:

```bash
55
56
57
58
59
Happy Birthday John Doe
```

To enable the counter to count at a rate of 1 second, we are using `T.scheduleAtFixedRate (Birthday, date.getTime(), 1000);` instead of `T.schedule(Birthday, date.getTime());`. `1000 milliseconds` represents the count period.

The variable `i` is initialized to `5`. This implies that the task will be executed after five seconds. 

The time `OCTOBER, 30,23, 59, 54` indicates that the counter will begin on October 30<sup>th</sup>, at 23:59 hours, and at the 54<sup>th</sup> second.

The `cancel()` method is used to cancel the execution of the task to prevent it from being executed again once the task is completed.

### Conclusion
This tutorial has taken you through the concept of Timer Tasks in Java.

You should, therefore, have a better understanding of Timer Tasks and can incorporate them into your projects.

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)