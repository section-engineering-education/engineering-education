### INTRODUCTION

The Java programming language provides a class utility known as `Timer Task`. This class enables task scheduling to be executed after a given period or at a specified date and time.

A timer in Java is a facility that enables threads to schedule tasks for later execution. Timer tasks, therefore, are tasks that can be scheduled for later execution, either once or repeatedly.

Timer Tasks are important since they enable a program to be scheduled for later execution in the event where the processor is held and busy executing some other tasks. This is done by keeping the process to be executed in the queue such that when the time of execution comes, the processor may be able to suspend other processes and execute this one.

### Prerequisites

To understand this article better the reader needs to:

- have a basic understanding of Java
- have a code editor such as Intellij Idea, which can be downloaded from [this](https://www.jetbrains.com/idea/download/#section=windows) Jetbrains site.

#### Java Task Timer Methods

There are three Java Timer Task Methods. They include:

- cancel() method
- run() method
- ScheduleExecutionTimer

##### Cancel() Method

This is a boolean data type.

This method cancels a scheduled task in Java. This method means that no task will be executed if it was called before the task was executed, or that no other task will run if the task was to be executed repeatedly.

##### Run() Method

The `run() method` renders the task being executed active.

##### ScheduleExecutionTime() Method

This method returns the scheduled execution time for the latest actual execution of the task in memory.

Once you have finished downloading Intellij Idea, run it as administrator and then follow the steps on the screen to finish setting it up. After installing the IDE, launch it and click on `New Project`.

Select `java`  then under Java select `Groovy` and click next.

Check the `Create project from template` and click next.

On the next screen, enter the name of the project that is `JavaTimerTask` and click `Finish`. Now, the next screen is where you will be able to write your code.

Now you will have an example that schedules a task and alerts the message `Happy Birthday Joseph` when the date is `October 30th, 2021 at midnight`.

```JAVA
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
                System.out.println("Happy Birthday Joseph");
            }
        };
        Calendar date = Calendar.getInstance();
        date.set(2021, Calendar.OCTOBER, 31, 0, 0, 0);
        T.schedule(Birthday, date.getTime());
    }
}
```

From the code above, you are importing the `Calendar`, `Timer`, and the `TimerTask` utilities.

The line `Timer T = new Timer()` is the instance of a timer that keeps track of the time and the term `Birthday` is the task to be executed by the TimerTask.

When time is up, the `run` function of the `TimerTask` instance is executed.

The `schedule` function links the task to the timer. This function has a function `task` which is the task to be executed, i.e. `Birthday` and `time` which specifies the time the task is to be executed.

In this example, you shall create an instance of Calendar Date and set the `YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE`, and `SECOND` the task is to be executed.

You can also include a timer in the above example so that our timer starts counting downwards before the task executes. This can be done by including "if statements` and `decrement` operators as shown below.

```JAVA
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
                    System.out.println("Happy Birthday Joseph");
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

To enable the counter to count at a rate of 1 second, you used the line `T.scheduleAtFixedRate (Birthday, date.getTime(), 1000);` instead of `T.schedule(Birthday, date.getTime());` by adding `1000 milliseconds`, which represents the count period.

The variable `i` is initialized to `5` which implies that when the value of `i` counts to zero, the counter stops, and the task is executed. The time `OCTOBER, 30,23, 59, 54` indicates that the counter will begin counting on October 30<sup>th</sup>, at 23:59 hours, and at the 54<sup>th</sup> second.

The cancel() method is used to cancel the execution of the task to prevent it from being executed again once the task is completed.

##### Conclusion

This tutorial has taken the reader through the concept of Timer Tasks in Java, and therefore, the reader should be able to get a better understanding of Timer Tasks and create his or her timer that alerts or displays a given message when time is up.
