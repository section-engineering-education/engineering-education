### How to Perform Threading Timer in Python

Threading allows multiple tasks to run concurrently. When task **A** is running I do not have to wait for it to complete, meanwhile task **B**, **C** will also be running. When the tasks are running simultaneously they require multiple CPUs.
To run thread concurrently *Python* uses a technique known as task switching. Python switches between each task rapidly making it **seem** like multiple tasks are running in parallel making it useful in event-driven tasks.
Thread being lightweight they require less memory hence  saving on CPU resources.
A thread has an entry, an execution, and an exit point.
In the Python library, the timer is a subclass of the **“threading”** class that is used for code execution after a specified period of time. Threading in Python Timer() starts following the delay defined as an argument within the threading. The Timer class thus calls itself delaying the execution of the following operation by the same amount of time specified.

-  [Prerequisites](#prerequisites)
-  [Python Timer Functions ](#python-timer-functions)
-  [Creating and Using Timer Class](#creating-and-using-timer-class)
 -  [Working with Python Decorator](#working-with-python-decorator)
 - [Conclusion](#Conclusion)

### Prerequisites
- You have to be familiar with Python basics and get started with it. Refer to this article to [a beginners guide to python](/engineering-education/a-beginners-guide-to-python/)


### Python Timer Functions
After every specified number of seconds, a timer class function is called.
**start()** This function is used to initialize a timer. Ending or quitting  the timer one has to use a **cancel()** function.
Importing the threading class is necessary for one to use the threading class. 
 The calling thread can be suspended for  seconds using the function  **time.sleep(secs)**.
 - To understand further I will be illustrating by use of a code snippet and also with the expected output inform of a screenshot.
 ## Instance #1
 **code:**
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
  - After the code is run it takes five minutes to display **SECTION FOR LIFE** as the output.
  ![start](/engineering-education/how-to-perform-threading-timer-in-python/start.png)
  
   ## Instance #2
In this second example, I will be showing you how to implement  the suspend method ``cancel()`` which ealier we had seen was to end a thread. 
**code:**
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
 - When the program is executed the line **PROGRAM TERMINATION** is displayed, this is because the object *th.Timer* gets canceled just before it has executed the **"sctn"** function.
 - Below is the output of the above program:
 ![cancel](/engineering-education/how-to-perform-threading-timer-in-python/cancel.png)
 
### Creating and Using Timer Class
The beauty of threading is that you can tell the computer to perform a task some other time or do it at the same time. You can also execute the code at the same time on different threads making it extremely powerful. A timer class always runs in intervals. The Python Timer class is used when we want to perform an operation or have a function run after a specified period of time has passed. The threading class has a subclass called class timer. We will create Timer objects when we need time-bound actions (methods), in technical terms.
To use Timer class we will first have to import the time module. 
**args** parameter is used to give arguments to the functions to be called.
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
Under working with python decorator, you will know how to extend the python Timer for it to be reused. The importance of using decorators is that it gets implemented once and the function gets timed every time.
 - To begin, we will have the Python Timer called before the decorated function and after the call ends terminate the Python Timer.
Follow the code illustration below:

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
When the code is run the output is:
``TIME PASSED IS: 0.59 SECS``

### Conclusion
We have gained the following insights from this article:
1. Python Timer Functions	
   - Using functions such as cancel() to stop execution even before it starts.
2. Creating and Using Timer Class
   - Timer class is a subclass of class Thread
3. Working with Python Decorator
    - The decorator is used once but the function gets timed on and on.

Enjoy timing your threads.







































