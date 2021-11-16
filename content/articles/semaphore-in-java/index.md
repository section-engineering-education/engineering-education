### Itroduction
Semaphores in Java are the subject of this article. For thread synchronization, Java uses Semaphores. Several constructors and methods in the Semaphore class govern the access of several threads to the same shared resource.

We can avoid race circumstances by using a semaphore. To limit access to a shared resource, a semaphore can be used.

There is also a semaphore to ensure that any missed signals are not avoided. When multiple processes are running at the same time, semaphore variables can be used to keep them in sync.

To keep track of who has access to a shared resource, semaphores are utilized. If the counter is greater than zero, the user is permitted access. If the number is zero, access is denied. The counter keeps track of permissions to utilize the shared resource. As a result, the semaphore must allow a thread to access this data.
### Semaphore Operation
1. Using counters, we can deduce that a semaphore manages access to the shared resource. Some value can be found on the counter.
2. When the counter rises over zero, the thread is granted access to the resource, and the counter's value decreases.
3. The thread is denied access to the resource if the counter is zero.
4. The number is incremented when a thread completes its work in the resources or no longer needs the resource, and the permit is released.
> In the **Java.util.concurrent** package, there is a Semaphore class that implements this method, so you don't need to develop your own implementation. There is no need to implement the Semaphore class manually because it provides all of the functionality.
### Java's Semaphore class 
Semaphore class has two constructors:
```Java
Semaphore(int number)
Semaphore(int number, boolean how)
```
**Number** specifies the initial number of permits that can be issued. To use a shared resource, a thread must have a sufficient number of peers. If the resource is one, only one thread can access it at a time. All awaiting threads are granted permission in an undefined order per the default behavior. False option **how** can be used to restrict how access is given to waiting threads.
#### Semaphore-class methods:
Semaphore class has the following methods:
- The acquire() method obtains the permit and waits for one to become available before returning true or returning false.
- A permit can be released using the release() method.
- AvailablePermits() method returns the current number of permits that are currently available.

### Semaphore implementation in Java
Let us see how we can implement semaphores in the following code below:
```Java
package com.techvidvan.semaphore;
import java.util.concurrent. * ; 
class ResourceToBeShared {
  static int myCounter = 0;
}

class MyNewThread extends Thread {
  Semaphore mySemaphore;
  String nameOfThread;
  public MyNewThread(Semaphore mySemaphore, String nameOfThread) {
    super(nameOfThread);
    this.mySemaphore = mySemaphore;
    this.nameOfThread = nameOfThread;
  }@Override
  public void **run()** {
    if (this.getName().equals("Thread1")) {
      System.out.println("Starting " + nameOfThread);
      try {
        //  getting permit. 
        System.out.println(nameOfThread + " -> permit waiting."); 
        mySemaphore.acquire();

        System.out.println(nameOfThread + " -> getting permit.");

        for (int b = 0; b < 5; b++) {
          ResourceToBeShared.myCounter++;
          System.out.println(nameOfThread + ": " + ResourceToBeShared.myCounter);

          Thread.sleep(10);
        }
      }
      catch(InterruptedException exc) {
        System.out.println(exc);
      }
      System.out.println(nameOfThread + " -> releasing permit.");
      mySemaphore.release();
    }

    else {
      System.out.println("Starting-> " + nameOfThread);
      try {
    
        System.out.println(nameOfThread + " -> permit waiting..");

        mySemaphore.acquire();

        System.out.println(nameOfThread + " -> getting permit.");

        // As at this moment, the shared resource can be used. To unlock the lock, this thread must do so, as well as any other threads that are waiting in line.
        for (int b = 0; b < 5; b++) {
          ResourceToBeShared.myCounter--;
          System.out.println(nameOfThread + ": " + ResourceToBeShared.myCounter);

          Thread.sleep(10);
        }
      }
      catch(InterruptedException exc) {
        System.out.println(exc);
      }
      
      System.out.println(nameOfThread + " -> releasing permit.");
      mySemaphore.release();
    }
  }
}

public class Demosemaphores {
  public static void main(String args[]) throws InterruptedException {
    
    Semaphore mySemaphore = new Semaphore(1);

    
    MyNewThread b1 = new MyNewThread(mySemaphore, "My Thread 1");
    MyNewThread b2 = new MyNewThread(mySemaphore, "My Thread 2");

    b1.start();
    b2.start();

    b1.join();
    b2.join();

    //It will always be 0 when both threads have finished their work.
    System.out.println("My counter: " + ResourceToBeShared.myCounter);
  }
}
```
> The output of the above program can vary from one run to the next, but the counter variable's ultimate value will always be 0.

### A description of the program

In the Shared class, the count variable is static, and the program uses a semaphore to regulate access to it.

Thread b1 increments and decrements the **Shared.counter** counter five times each. As a safeguard, access to **Shared.counter** can only be granted once a semaphore has granted permission for it. Upon completion, the permission is released. We can see in the output that only one thread at a time is accessing **Shared.counter**.

**Sleep()** is called within the **run()** method of thread class. Semaphore synchronizes access to **Shared.counter**, thus we utilize it as proof of this. Between each visit to the counter, the **sleep()** method is called in the **run()** method. Because of this, the second thread can continue. After all accesses by the first thread have been completed, a semaphore prevents any other thread from obtaining permission until the first has released it. A total of five times, threads b1 and b2 each increment and decrement the **Shared.counter**, respectively. Assembly code does not mix up the increments and decrements.

Without the semaphore, accesses to **Shared.counter** by both threads would occur concurrently, and there would be a mix of increments and decrements. You can test this by omitting the calls to **acquire()** and **release()** in your script. This means that you won't always get a count of 0 when you run the program because access to the shared counter is no longer synchronized.
### Semaphore Types
#### 1. Counting Semaphores

Counting semaphores are in handy when multiple processes are vying for control of a single vital section at the same time.
It is the take() method that is used to implement Semaphore.
#### 2. Bounded Semaphores

The maximum number of signals that can be stored in counting semaphores is unbounded. As a result, the upper bound is set using bounded semaphores.
#### 3. Timed Semaphores

Timers are semaphores that can be programmed to run at specific intervals for predetermined lengths of time. If you wait until the timer goes out for this long, all of your permissions will be released.
#### 4. Binary Semaphores

Unlike counting semaphores, binary semaphores can only take one of two possible values: 0 or 1. The binary semaphore is easier to implement than the counting semaphore. For the signal action to succeed, the value must be at least 1. Otherwise, it fails.
### Using Semaphores as Locks
A bounded semaphore can also be used as a lock. Take() and release() methods should be called in this case, as the higher limit must be set to 1.
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
A counter on a semaphore restricts access to a shared resource. Access is granted if the counter is higher than zero. Zero indicates that access has been denied. Permits that allow access to the shared resource are being counted by the counter. As a result, a thread needs a semaphore permit to access the resource in question.

Our study of Java Semaphores comes to an end here. With the examples, we learned about the fundamentals of Semaphores, including how they work and the many types of Semaphores.

We hope that you have now grasped the concept of semaphores and how they work in practice.