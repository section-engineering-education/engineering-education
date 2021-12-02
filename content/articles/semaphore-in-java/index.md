Semaphores in Java are the subject of this article. In Java, a semaphore uses a counter to manage access to a shared resource. It is a thread synchronization construct that is used to communicate between threads in order to avoid missing signals or to protect a critical section.
### Prerequisite
1. Before beginning this tutorial, you should be familiar with the Java programming language.
2. For server-side Java development, have __IntelliJ IDEA__ as the IDE.
### Table of contents
- [Uses of semaphores](#uses-of-semaphores)
- [Semaphore operation](#semaphore-operation)
- [Semaphore class](#semaphore-class)
- [Semaphore implementation ](#semaphore-implementation)
- [How the application works ](#how-the-application-works)
- [Semaphore types](#semaphore-types)
- [Using semaphores as locks](#using-semaphores-as-locks)
- [Conclusion](#conclusion)
### Uses of semaphores
- When multiple processes are running at the same time, semaphore variables can be used to keep them in sync.
- We can avoid race circumstances by using a semaphores. 
- Semaphores ensure that any missed signals are not avoided. 
- Semaphores are used to track who has access to a common resource. To enter, the user needs to have a counter that is greater than 0. Access is denied in this situation. There's a counter in the shared resource that keeps track of who has access to it. For this circumstance, a thread's access to the data is required by the semaphore.
### Semaphore operation
1. A semaphore is in charge of restricting access to a resource, as we may infer from the usage of counters. Some value can be found on the counter.
2. It is possible that the thread will gain access to the resource if its counter increases over zero.
3. The thread is denied access to the resource if the counter is zero.
4. The number is incremented when a thread completes its work in the resources or no longer needs the resource, and the permit is released.
> Instead of creating your own semaphore classes, use the `Java.util.concurrent` library. There is no need to implement the Semaphore class manually because it provides all of the functionality.
### Semaphore class 
The Semaphore class has two constructors:
```Java
Semaphore(int number)
Semaphore(int number, boolean how)
```
__Number__ specifies the initial number of permits that can be issued. If you want to use a shared resource, you must have a sufficient number of peers for the thread in question. When a resource is shared by multiple threads, only one can access it simultaneously. As is the default behavior, all waiting threads are granted permission in an undetermined order, with the first thread granted permission first. False option __how__ can be used to restrict how access is given to waiting threads.
#### Semaphore-class methods:
Semaphore class has the following methods:
- The `acquire()` method obtains the permit and waits for one to become available before returning true or returning false.
- A permit can be released using the `release()` method.
- Available `Permits()` method returns the current number of permits that are currently available.

### Semaphore implementation 
Let us see how we can implement semaphores in the following code below:
```Java
import java.util.concurrent. * ; 
class ResourceBeingShared {
  static int myCounter = 0;
}

class newThread extends new Thread {
  Semaphore mySemaph;
  String myThreadName;
  public newThread(Semaphore mySemaph, String myThreadName) {
    super(myThreadName);
    this.mySemaph = mySemaph;
    this.myThreadName = myThreadName;
  }@Override
  public void **run()** {
    if (this.getName().equals("Thread1")) {
      System.out.println("Starting " + myThreadName);
      try {
        //  getting permit. 
        System.out.println(myThreadName + " -> permit waiting."); 
        mySemaph.acquire();

        System.out.println(myThreadName + " -> getting permit.");

        for (int b = 0; b < 5; b++) {
          ResourceBeingShared.myCounter++;
          System.out.println(myThreadName + ": " + ResourceBeingShared.myCounter);

          new Thread.sleep(10);
        }
      }
      catch(InterruptedException exc) {
        System.out.println(exc);
      }
      System.out.println(myThreadName + " -> releasing permit.");
      mySemaph.release();
    }

    else {
      System.out.println("Starting-> " + myThreadName);
      try {
    
        System.out.println(myThreadName + " -> permit waiting..");

        mySemaph.acquire();

        System.out.println(myThreadName + " -> getting permit.");

        // As at this moment, the shared resource can be used. To unlock the lock, this thread must do so, as well as any other threads that are waiting in line.
        for (int b = 0; b < 5; b++) {
          ResourceBeingShared.myCounter--;
          System.out.println(myThreadName + ": " + ResourceBeingShared.myCounter);

          new Thread.sleep(10);
        }
      }
      catch(InterruptedException exc) {
        System.out.println(exc);
      }
      
      System.out.println(myThreadName + " -> releasing permit.");
      mySemaph.release();
    }
  }
}

public class Demosemaphores {
  public static void main(String args[]) throws InterruptedException {
    
    Semaphore mySemaph = new Semaphore(1);

    
    newThread b1 = new newThread(mySemaph, "My new Thread 1");
    newThread b2 = new newThread(mySemaph, "My new Thread 2");

    b1.start();
    b2.start();

    b1.join();
    b2.join();

    //It will always be 0 when both threads have finished their work.
    System.out.println("My counter: " + ResourceBeingShared.myCounter);
  }
}
```
> Counter variable's final value will always be 0 in this program.
### How the application works 
When accessing the count variable in the Shared class, a semaphore is utilized to keep track of how many people are looking at it.

Thread `b1` increments and decrements the __Shared.counter__ counter five times each. As a safeguard, access to __Shared.counter__ can only be granted once a semaphore has granted permission for it. Upon completion, the permission is released. One thread at a time attempts to access the __Shared.counter__, as can be seen in the output

In addition to their `run()` methods, thread classes provide a built-in `Sleep()` function that can be used from within them. Semaphore, which synchronizes access to __Shared.counter__, is used to demonstrate this. The `sleep()` method is invoked in the `run()` method between each visit to the counter. This means that the second thread can proceed. No other threads can access the resource until the first thread releases the semaphore. A total of five times, threads `b1` and `b2` each increment and decrement the __Shared.counter__, respectively. Assembly code does not mix up the increments and decrements.

The semaphore is used to prevent both threads from concurrently accessing __Shared.counter__. You can test this by omitting the calls to `acquire()` and `release()` in your script. There is no longer synchronized access to the common counter, therefore you will not always get a starting count of 0.
### Semaphore types
#### 1. Counting Semaphores

Counting semaphores are in handy when multiple processes are vying for control of a single vital section at the same time.
It is the `take()` method that is used to implement Semaphore.
#### 2. Bounded Semaphores

The maximum number of signals that can be stored in counting semaphores is unbounded. As a result, the upper bound is set using bounded semaphores.
#### 3. Timed Semaphores

Timers are semaphores that can be programmed to run at specific intervals for predetermined lengths of time. If you wait until the timer goes out for this long, all of your permissions will be released.
#### 4. Binary Semaphores

Unlike counting semaphores, binary semaphores can only take one of two possible values: 0 or 1. The binary semaphore is easier to implement than the counting semaphore. For the signal action to succeed, the value must be at least 1. Otherwise, it fails.
### Using semaphores as locks
A bounded semaphore can likewise be used as a lock, as demonstrated here. `Take()` and `release()` methods should be called in this case, as the higher limit must be set to 1.
Let's see an example below:
```Java
BoundedSemaphore ourBoundedSemaphore = new BoundedSemaphore(1);

ourBoundedSemaphore.take();
try {
}
finally {
  ourBoundedSemaphore.release();
}
```
### Conclusion
A counter on a semaphore restricts access to a shared resource. If the counter is greater than zero, the user is permitted access. Access has been denied if the number is zero. There is a tally on the counter that shows how many licenses have been given out for the shared resource. As a result, a thread must have a semaphore permit in order to access the resource.

Our study of Java Semaphores comes to an end here. With the examples, we learned about the fundamentals of Semaphores, including how they work and the many types of Semaphores.

We hope that you have now grasped the concept of semaphores and how they work in practice.
