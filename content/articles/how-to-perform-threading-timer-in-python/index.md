---
layout: engineering-education
status: publish
published: true
url: /how-to-perform-threading-timer-in-python/
title: How to Perform Threading Timer in Python
description: This tutorial will guide the reader on how to create a threading timer in Python using the threading module. Threading allows multiple tasks to run concurrently.
author: jacob-oduor
date: 2021-11-24T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-perform-threading-timer-in-python/hero.png
    alt: How to Perform Threading Timer in Python
---
Threading allows multiple tasks to run concurrently. For example, when task **A** is running, I do not have to wait for it to complete. Meanwhile, tasks **B**, **C** will also be running. When the tasks are running simultaneously, they require multiple CPUs.
<!--more-->
To run threads concurrently *Python* uses a technique known as task switching. As a result, Python switches between each task rapidly. Making it **seems** like multiple tasks are running in parallel, making it useful in event-driven tasks. The thread being lightweight, it requires less memory thereby saving on CPU resources.

### How to perform threading timer in Python
A thread has an entry, an execution, and an exit point. The Python library contains a timer, a subclass of the **“threading”** class used for code execution after a limited period. 

Threading in Python Timer() starts following the delay defined as an argument. The Timer class thus calls itself delaying the execution of the following operation by the same amount of time specified.

### Table of contents
- [How to Perform Threading Timer in Python](#how-to-perform-threading-timer-in-python)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Python Timer Functions](#python-timer-functions)
  - [Instance #1](#instance-1)
  - [Instance #2](#instance-2)
- [Threading Module Overview](#threading-module-overview)
- [Creating and Using Timer Class](#creating-and-using-timer-class)
- [Working with Python Decorator](#working-with-python-decorator)
- [Importance of using Threads](#importance-of-using-threads)
- [Conclusion](#conclusion)
 

### Prerequisites
To follow along the reader will need the following:
- Some basic knowledge in Python. You can refer to this article [beginners guide to python](/engineering-education/a-beginners-guide-to-python/) to get started with Python.

### Python timer functions
After every specified number of seconds, a timer class function is called. **start()** is a function that is used to initialize a timer. To end or quit the timer, one must use a **cancel()** function. Importing the threading class is necessary for one to use the threading class. The calling thread can be suspended for seconds using the function **time.sleep(secs)**.

- To better understand this, I will be illustrating it with the use of a code snippet and also with the expected output inform of a screenshot.

 #### Instance 1

 ```py
 ## How class threading.Timer() in python works  
import threading as th  
 ## Defining a method  
def sctn():  
    print("SECTION FOR LIFE \n")  
S = th.Timer(5.0, sctn)  
S.start()  
print("Exit Program\n")
```

- After the code is run, it takes five minutes to display `SECTION FOR LIFE` as the output.

![start](/engineering-education/how-to-perform-threading-timer-in-python/start.png)
  
#### Instance 2
In this second example, I will show you how to implement the suspend method `cancel()`, which we had seen earlier to end a thread. 

```py
##Illustrating the use of cancel() method in class Timer.  
import threading as th  
## Defining of a method  
def sctn():  
    print("SECTION FOR LIFE \n")  
S = th.Timer(5.0, sctn)  
S.start()  
print("PROGRAM TERMINATION\n")  
S.cancel()
```

- When the program is executed, the line **PROGRAM TERMINATION** is displayed. This is because the object *th.Timer* gets canceled just before it has executed the **"sctn"** function.
- Below is the output of the above program:

![cancel](/engineering-education/how-to-perform-threading-timer-in-python/cancel.png)
 
### Threading module overview
The latest threading module included with the current Python 2.4 provides a much more powerful and higher-level support for threads than the previous thread module.

The threading module exposes all the methods of the thread module and provides some additional functions as depicted below:
```bash
  thread.activeCount() − Returns how many thread objects are active.
  thread.currentThread() − Returns how many thread objects in the caller's thread control.
  thread.enumerate() − Returns an overview list of all thread objects that are currently active.
``` 

### Creating and using the timer class
The beauty of threading is that you can tell the computer to perform a task some other time or do it simultaneously. You can also execute the code simultaneously on different threads, making it extremely powerful. A timer class always runs in intervals.

The Python Timer class is used to perform an operation or have a function run after a specified period has passed. The threading class has a subclass called the class timer. In technical terms, we will create Timer objects when we need time-bound actions (methods), in technical terms.

To use Timer class we will first have to import the time module. The **args** parameter is always preferably used to declare arguments to the functions to be called.

```py
##Timers  
##Execute code at timed intervals  
##Imports and Displays  
import time  
from threading import Timer  
def display(msg):  
    print(msg + ' ' + time.strftime('%H:%M:%S'))  
  
##Basic timer  
def run_once():  
    display('run_once:')  
    t=Timer(10,display,['Timeout:'])  
    t.start()#Here run is called  
run_once()  
##Runs immediately and once  
print('Waiting.....')  
  
##Lets make our timer run in intervals  
##Put it into a class  
##Making it run until we stop it  
##Just getting crazy.Notice We have multiple timers at once!  
class RepeatTimer(Timer):  
    def run(self):  
        while not self.finished.wait(self.interval):  
            self.function(*self.args,**self.kwargs)  
            print(' ')  
##We are now creating a thread timer and controling it  
timer = RepeatTimer(1,display,['Repeating'])  
timer.start() #recalling run  
print('Threading started')  
time.sleep(10)#It gets suspended for the given number of seconds  
print('Threading finishing')  
timer.cancel()

```

- Below is the output:

![threading](/engineering-education/how-to-perform-threading-timer-in-python/threading.png)

### Working with Python Decorator
While working with a Python decorator, will know how to extend the Python Timer for it to be reused. The importance of using decorators is that it gets implemented once, and the function gets timed every time.

- To begin, we will have the Python Timer called before the decorated function, and after the call ends, terminate the Python Timer.

```py
import functools  
import time  
  
 def timer(meth):  
    @functools.wraps(meth)  
    def timer_container(*args, **kwargs):  
        click = time.flow()  
        value: object = meth(*args, **kwargs)  
        clock = time.flow()  
        time_passed = click - clock ##getting the time spent
        print(f"TIME PASSED IS: {time_passed:0.2f} SECS")  ##displaying time passed to 2 decimal places
        return value  
  
    return timer_container()
```

When the code is run the output should be:

```bash
TIME PASSED IS: 0.59 SECS
```

### Importance of using Threads
- Threads can be operated concurrently, multithreaded programs can run quicker on computer systems with several CPUs.
- A program can continue to respond to input. This is true on a single CPU as well as several CPUs.
- Threads in a process can share global variable memory. When a global variable is modified in one thread, it affects all threads. Local variables can also exist in a thread.
- Handling of threads in an operating system is easier than handling processes. As a result, they're sometimes referred to as lightweight processes.
- It can be interrupted hence allowing for high priority processes.
- It can temporarily be put on hold (at times referred to as in sleeping mode) while other threads are running - this is called **yielding**.

### Conclusion
In this article we have learned the following:
1. Python Timer Functions: How to use functions such as cancel() to stop execution even before it starts.
2. Creating and Using Timer Class: The Timer class is a subclass of class Thread
3. Working with Python Decorator: The decorator is used once but the function gets timed on and on.

Enjoy timing your threads.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
