### INTRODUCTION

The Java programming language provides a class utility known as `Timer Task`. This class enables task scheduling, a task to be executed after a given period or at a specified date and time.

A timer in Java is a facility that enables threads to schedule tasks for later execution. Timer tasks, therefore, are tasks that can be scheduled for later execution, either once or repeatedly.

Timer Tasks are important since they enable a program to be scheduled for later execution in the event where the processor is held and busy executing some other tasks. This is done by keeping the process to be executed in the queue such that when the time of execution comes, the processor may be able to suspend other processes and execute the task in the queue.

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
- have a basic understanding of [Java](https://www.w3schools.com/Java/default.asp)
- have a code editor such as Intellij Idea, which can be downloaded from [this](https://www.jetbrains.com/idea/download/#section=windows) Jetbrains site.

### Java timer task methods
There are three Java Timer Task Methods. They include;
- cancel() method
- run() method
- ScheduleExecutionTimer

##### Cancel() Method
This is a boolean data type. The method cancels a scheduled task in Java. This method means that no task will be executed if it is called before the task is executed, or that no other task will run if the task is to be executed repeatedly.

##### Run() Method
The `run() method renders the task to be executed active.

##### ScheduleExecutionTime() Method
This method returns the scheduled execution time for the latest actual execution of the task in memory.

### Code example
Now, when you have finished downloading Intellij Idea, run it as administrator and then follow the steps on the screen to finish setting it up. After installing the IDE, launch it and click on `New Project` as in the figure below.

![New](/engineering-education/java-timer-tasks/new.jpg)

Select `java`  then under Java, and click `Next` as in the figure below.

![Java](/engineering-education/java-timer-tasks/java.jpg)

Check the `Create project from template` and click  `Next` as in the figure below.

![Project template](/engineering-education/java-timer-tasks/comandline.jpg)

On the next screen, enter the name of the project that is `TimerTask` and click `Finish`. Now, the next screen is where you will be able to write your code. The environment should look like this.

![Enviroment](/engineering-education/java-timer-tasks/environ.jpg)

Now you will have an example that schedules a task and alerts the message `Happy Birthday John Doe` when the date is `October 30th, 2021 at midnight.

```Java
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

The ouput of the code above when time is up will be;

```
Happy Birthday John Doe
```

From the code above, you are importing the `Calendar`, `Timer`, and the `TimerTask` utilities.

The line `Timer T = new Timer()` is the instance of a timer that keeps track of the time and the term `Birthday` is the task to be executed by the TimerTask.

When time is up, the `run` function of the `TimerTask` instance is executed.

The `schedule` function links the task to the timer. This function has a function `task` which is the task to be executed, i.e. `Birthday` and `time` which specifies the time the task is to be executed.

In this example, you will create an instance of Calendar Date and set the `YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE`, and `SECOND` the task is to be executed.

You can also include a count-down timer in the above example so that our timer starts counting before the task executes. This can be done by including "if statements` and `decrement` operators as shown below.

```Java
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

The output of the code now is as below;

```
55
56
57
58
59
Happy Birthday John Doe
```

To enable the counter to count at a rate of 1 second, you are using the line `T.scheduleAtFixedRate (Birthday, date.getTime(), 1000);` instead of `T.schedule(Birthday, date.getTime());` by adding `1000 milliseconds`, which represents the count period.

The variable `i` is initialized to `5` which implies that when the value of `i` counts for five seconds before the task is executed. The time `OCTOBER, 30,23, 59, 54` indicates that the counter will begin counting on October 30<sup>th</sup>, at 23:59 hours, and at the 54<sup>th</sup> second.

The cancel() method is used to cancel the execution of the task to prevent it from being executed again once the task is completed.

### Conclusion
This tutorial has taken you through the concept of Timer Tasks in Java, and therefore, you should be able to get a better understanding of Timer Tasks and create your timer that alerts or displays a given message when time is up.
