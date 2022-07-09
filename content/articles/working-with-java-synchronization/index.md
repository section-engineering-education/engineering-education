---
layout: engineering-education
status: publish
published: true
url: /working-with-java-synchronization/
title: Working with Java Synchronization
description: This article explains the concept of synchronization in the context of Java along with its implementation.
author: grace-wanjiru
date: 2022-06-29T00:00:00-13:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/working-with-java-synchronization/hero.jpg
   alt: working with synchronization in Java
---
Synchronization in computing is the practice of keeping a group of data or files identical across many locations. It enables several threads to access a common resource such as external files, class variables, and database information. 
<!--more-->
Synchronization is common in multithreaded code. It enables your code to execute on a single thread uninterrupted.

### Table of contents
- [An insight into synchronization in Java](#an-insight-into-synchronization-in-java)
- [Different types of synchronization](#different-types-of-synchronization)
- [The race condition](#the-race-condition)
- [Understanding synchronized methods and synchronized blocks](#understanding-synchronized-methods-and-synchronized-blocks)
- [Implementing synchronization in Java](#implementing-synchronization-in-java)
- [Conclusion](#conclusion)

### An insight into synchronization in Java
Several threads querying the same resource might lead to unexpected results. Synchronization is required to prevent several threads from accessing a resource allowing only one thread at a time. Java's synchronized blocks, denoted by the `synchronized` keyword, allow you to handle several threads at once. In each case, a thread must acquire and release a lock on the method or block.

Controlling problems with mutual exclusion in a multithreading system is the goal of synchronization. 

Take note of the following:
- Immutable objects in Java do not need synchronization.
- Variables cannot be synchronized in Java. This will cause a compilation error.

### Different types of synchronization
Below are the two forms of synchronization:

1. **Process Synchronization**: It is the task phenomenon of coordinating the execution of processes in such a manner that no two processes may access the same common data and resources.

2. **Thread Synchronization**: This synchronization ensures that only one thread may access a shared resource at a time.

### The race condition
A race condition may occur in Java due to the use of several threads to implement applications concurrently. In some ways, the race condition resembles deadlock since it is caused by multi-threading and may lead to serious consequences. 

Threads that are working on the same object or data without sufficient synchronization might result in overlapping operations, which is what causes race conditions. To better understand let's first look at the types of race conditions:

There are several different sorts of racing situations. `Critical` and `non-critical` are two categories that characterize the impact of a race condition on a system:

1. A `critical race condition` changes the device, system, or software end state. For example, turning two light switches connected to a shared light at the same time blows the circuit. A catastrophic race condition occurs when a circumstance leads to an unforeseen or undefined issue.
2. A `non-critical race condition` has no effect on the system, device, or program's outcome. In the light example, if the light is off and flipping both switches simultaneously turns it on, it is a non-critical race condition. Non-critical race conditions do not cause software bugs.

Electronics and programming aren't the only critical and non-critical race condition circumstances. They can occur in many race-condition systems. In the case of programming, race condition circumstances occur in code that is executed by several threads or processes. There are several possible outcomes when numerous threads/processes try to read the same variable and then act on it.

Let us now look at possible error scenarios involving race conditions:

1. **Read-modify-write condition:** This happens when two threads/processes read a program's value and write it back. It frequently results in a software flaw. Like in the previous example, the two threads/processes are expected to happen sequentially. The first process produces a value, and the second reads it and returns another.

For example, if checks against a checking account are processed consecutively, the system will first check for sufficient money to process check A, then check again for sufficient funds to process check B. If the two checks are processed simultaneously, the system may interpret the same account balance for both transactions producing an overdraft.

2. **Check-then-act condition:** This race scenario occurs when two threads/processes verify the same value for an external operation. Both threads/processes check the value, but only one can accept it. The subsequent thread/process will read it as null. As a result, the program's next action is determined by an out-of-date or unavailable observation. For example, map applications that need the same location data can't use each other's data if they're running at the same time. The data is treated as null in the subsequent stage.

The example program below illustrates race conditions:

You can see the increased value of an integer variable in this basic example. One by one the variable's value is incremented and shown in ten different ways. Each thread will be numbered from one to nine.

```java
public class Example {
    int check = 0;

    public void incrementCheck() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        check++;
    }

    public int getCheck() {
        return check;
    }

    public static void main(String[] args) {
        Example zy = new Example();
        for (int x = 1; x < 6; x++) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    zy.incrementCheck();
                    System.out.println("The output of the thread is : " + Thread.currentThread().getName() + " - " + zy.getCheck());
                }
            }).start();
        }
    }
}
```

```bash
The output of the thread is : Thread-0 - 3
The output of the thread is : Thread-1 - 3
The output of the thread is : Thread-2 - 3
The output of the thread is : Thread-4 - 5
The output of the thread is : Thread-3 - 4
```

As shown above, the threads are chosen in an unpredictable order, and the value is incorrect. The value should rise by 1 but that is not the case. Usually, the output is 3. Threads 0, 1, and 2 share the same value thus showing a race condition. After understanding what a race condition is, let's now look at how to refrain from it.

It is evident that the crucial element (code that changes shared resources) must be limited. Additionally, with Java's `synchronized` keyword we can synchronize access to the shared resource. 

This prevents thread interference during atomic operations. The term *atomic operation* refers to a set of operations that are always performed in unison. All of the atomic actions must be completed at the same time, or none of them can be completed at all.

Synchronizing the method call should avoid the race problem:

```java
public class Example2 {
    int check = 1;

    public void incrementCheck() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        check++;
    }

    public int getCheck() {
        return check;
    }

    public static void main(String[] args) {
        Example2 zy = new Example2();
        int x;
        for (x = 1; x < 6; x++) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    synchronized (zy) {
                        zy.incrementCheck();
                        System.out.println("The output of the thread is : " + Thread.currentThread().getName() + " - " + zy.getCheck());
                    }
                }
            }).start();
        }
    }
}
```

```bash
The output of the thread is : Thread-0 - 2
The output of the thread is : Thread-4 - 3
The output of the thread is : Thread-3 - 4
The output of the thread is : Thread-2 - 5
The output of the thread is : Thread-1 - 6
```

From the results of the threads above, no thread shares a value. Our aim of avoiding a race condition was fulfilled.

### Understanding synchronized methods and synchronized blocks
To understand the two, let us first look at each separately:

#### Synchronized methods
These consist of the following properties:
- A synchronized method locks down the whole object. No other thread may access synchronized methods in the object while the method is executing. With static methods, they are locked by their class.
- Synchronized methods need locks on the current object or, in the case of static methods, the whole class. This is because the lock is obtained when the thread enters and released when the thread quits (naturally or by throwing an exception).
- Synchronized methods keep the lock for the method scope.
- A synchronized static function prevents instances from being changed. 

#### Synchronized blocks
The synchronized block may be used to perform synchronization on any specified resource of the method.

Suppose we have 100 lines of code in our method, but we want to synchronize only 10 lines, in such cases, we can use synchronized block. If we put all the codes of the method in the synchronized block, it will work the same as the synchronized method.

Let us look at an example program that uses synchronized blocks.

Save it as `TestSynchronizedBlock1.java`

```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
 
 class Table
 {
     void printTable(int n){
         synchronized(this){//synchronized block
             for(int i=1;i<=5;i++){
                 System.out.println(n*i);
                 try{
                     Thread.sleep(10);
                 }catch(Exception e){System.out.println(e.getMessage());}
             }
         }
     }//end of the method
 }
 class MyThread1 extends Thread{
     Table t;
     MyThread1(Table t){
         this.t=t;
     }
     public void run(){
         t.printTable(5);
     }
 }
 class MyThread2 extends Thread{
     Table t;
     MyThread2(Table t){
         this.t=t;
     }
     public void run(){
         t.printTable(100);
     }
 }
 public class TestSynchronizedBlock1{
     public static void main(String[] args) throws ExecutionException, InterruptedException {
         ScheduledThreadPoolExecutor scheduler = new ScheduledThreadPoolExecutor(2);
         Table obj = new Table();//only one object
         MyThread1 t1=new MyThread1(obj);
         MyThread2 t2=new MyThread2(obj);
         /*
         Forcing the execution order of the threads by setting a delay of when they may run.
         Even though we synchronized so that only one thread can access the critical section
         at a time (using the synchronized block/method), the scheduling order of the threads
         is still unpredictable
          */
         scheduler.schedule(t1, 0, TimeUnit.MILLISECONDS);
         scheduler.schedule(t2, 20, TimeUnit.MILLISECONDS);
         scheduler.shutdown();
     }
 }
 ```
The above code will output the following

```bash
5
10
15
20
25
100
200
300
400
500
```

The following is all that it entails:
- The synchronized keyword is used to identify blocks that are part of a synchronized thread in Java. In Java, a synchronized block is one that is tied to a specific object. There can only be one thread operating in all synchronized blocks synchronized on the same object. When the synchronized block is exited, all subsequent threads trying to enter it are stalled until that thread quits.
- Synchronized blocks utilize the object as a lock. When a method is marked as synchronized, the thread owns the monitor or lock object. In this case, you are blocked until the other thread releases the monitor.
- Using a synchronized block enables you to fine-tune lock control by mutually excluding important section code.
- The lock gets unlocked when the thread leaves the synchronized block.
- A synchronized block may produce a `NullPointerException` if a parameter expression evaluates to null, while synchronized methods do not.
- The lock is only held throughout the block scope of the synchronized block. 
- A static method may lock an object inside the parenthesis of a synchronized block.

### Implementing synchronization in Java
To provide internal synchronization, Java's lock concept is employed. In Java, each object has its own lock. In this case, the lock idea will be brought into play anytime we utilize the synchronized keyword.

A thread with the lock on the object must execute any synchronized methods on it. Post-lock, a thread may invoke any synchronized method on the object. Upon successful completion of the synchronized method, the thread is responsible for releasing the lock. 

No other threads may perform synchronized methods on the same object while a thread is executing one. However, any non-synchronized procedure may be executed concurrently by the remaining threads. Note that this idea of a lock may be applied on the object level rather than the method level.

Let's look at an example program:

```java
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
 
 class Synchronization {
    public synchronized void greet(String tag) {
       int x;
       for (x = 1; x <= 2; x++) {
          System.out.println("Hello : ");
          try {
             Thread.sleep(10);
          } catch (InterruptedException ignored) {
          }
          System.out.println(tag);
       }
    }
 }
 
 class OurThreadExample extends Thread {
    Synchronization b;
    String tag;
    public OurThreadExample(Synchronization b, String tag) {
       super();
       this.b = b;
       this.tag = tag;
    }
    public void run() {
       b.greet(tag);
    }
 }
 
 public class SynchImp {
    public static void main(String[] args) {
       ScheduledThreadPoolExecutor scheduler = new ScheduledThreadPoolExecutor(2);
       Synchronization b1 = new Synchronization();
       OurThreadExample mt1 = new OurThreadExample(b1, "SECTION");
       OurThreadExample mt2 = new OurThreadExample(b1, "ENGINEERING");
       /*
         Forcing the execution order of the threads by setting a delay of when they may run.
         Even though we synchronized so that only one thread can access the critical section
         at a time (using the synchronized block/method), the scheduling order of the threads
         is still unpredictable
          */
       scheduler.schedule(mt1, 0, TimeUnit.MILLISECONDS);
       scheduler.schedule(mt2, 20, TimeUnit.MILLISECONDS);
       scheduler.shutdown();
    }
 }
 ```

The code will output:

```bash
Hello : 
SECTION
Hello : 
SECTION
Hello : 
ENGINEERING
Hello : 
ENGINEERING
```

### Conclusion
Synchronization is required to ensure that only one thread may access resources at a time. We have looked at how to work with synchronization and the various aspects of this concept.

Happy coding!

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
