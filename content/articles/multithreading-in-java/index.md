---
layout: engineering-education
status: publish
published: true
url: /multithreading-in-java
title: Multithreading in Java
description: In this article we will learn how to create threads in your programs. A thread is a lightweight process. Multithreading is the process of executing many threads concurrently. 
author: geoffrey-mwangi
date: 2021-05-29T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/multithreading-in-java/hero.jpg
    alt: Multithreading in Java image
---
A thread in Java is a small and light process. Many threads can run in a single process and each thread **must** be part of a process as it cannot exist on its own.
<!--more-->
### Multithreading
Multithreading is the process of executing many threads concurrently. It makes sure that the CPU is utilized to the maximum extent. This means that one process can do many tasks at once.

For example, one thread can be reading data from the database while another thread is writing the data to a file at the same time.

### Multitasking
Multitasking is the process of executing several tasks simultaneously. It assists to reduces the CPU idle time. Multitasking deals with multiple processes to perform multiple tasks simultaneously while multithreading deals with multiple threads in a single process to execute multiple tasks.

### Benefits of multithreading
- Enables us to perform two or more tasks simultaneously.
- Threads are independent and do not affect the performance of concurrent threads.
- An execution of one thread will not interrupt other threads. This is useful for serving multiple clients, multiplayer games, or other mutually independent tasks.
- We can divide a program into threads and execute them in parallel thus increasing the speed of the program execution.

### Life cycle of a thread
The following are the steps undergone by a thread during its execution:
1. **`New`**: a thread has not started executing.
2. **`Runnable`**: a thread has called the `start()` method but has not yet been allocated the CPU.
3. **`Running`**: a thread has been allocated to the CPU for execution.
4. **`Blocked`**: if a thread is blocked from entering the runnable state and into the running state, it is said to be in a blocked state.
5. **`Terminated`**: a thread has finished executing.

### Creating a thread
We can use the following two ways to create a thread:
1. By extending the [`Thread`](https://www.javatpoint.com/creating-thread) class.
2. By implementing the [`Runnable`](https://www.javatpoint.com/creating-thread) interface.
Java contains a `java.lang` package that provides a `Thread` class and `Runnable` interface.

### 1. By extending the thread class
A thread created using this method follows the following syntax.
```java
public class Main extends Thread {
  public void run() {
    //statement
  }
}
```
The `public void run()` method is used to execute a task for a thread. It contains the code to be executed.

### 2. By implementing Runnable
A thread that 'implements' the `Runnable` interface follows the syntax below.

```java
public class Main implements Runnable {
  public void run() {
    //statement
  }
}
```

### Starting a thread
We use the `start()` method to start a thread. Let's use the `start()` method in an example to start a thread:

1. **By extending the `Thread` class**
By extending the `Thread` class, we can create an instance of a class and call the start() method:

```java
public class Main extends Thread {
  public static void main(String[] args) {
    Main thread = new Main();    // creates the class instance
    thread.start();
  }
  public void run() {
    System.out.println("This is a running thread");
  }
}
```

Execution of a Java program starts from the `main` method. A thread is created by JVM to start the execution of the code in the `main` method and it is referred to as the main thread. The other threads are produced from the main thread and must always be the last to finish the execution.

2. **By implementing the `Runnable` interface**
We create instances of threads using the `new` keyword. We then specify a class that is a subclass of `Thread` i.e. `Main` as an argument to the `new` keyword. 

Then finally we call the `start()` method:

```java
public class Main implements Runnable {
  public static void main(String[] args) {
    Main obj = new Main();       // creates the class instance
    Thread t1 = new Thread(obj); // creates the thread instance
    t1.start();                  // starts the thread
  }
  public void run() {
    System.out.println("This is a running thread");
  }
}
```

### The isAlive() method
The `isAlive()` method is used to check if a thread has finished executing. If the thread is still running, it returns true, otherwise false. If we use `isAlive` method before the start method, then it will print false but after the start method, it will print true. 


Let's look at an example where we use the `Runnable` interface:

```java
public class Main implements Runnable {
   public void run() {
      Thread t = Thread.currentThread();
      // checks if this thread is alive
      System.out.println(t.isAlive());
   }
   public static void main(String args[]) throws Exception {
      Thread t = new Thread(new Main());
      // this statement will call the run() method
      t.start();
      // makes the thread to sleep for 500 milliseconds
      t.sleep(500);
      // checks if this thread is alive
      System.out.println(t.isAlive());
   }
}
```

Output:
```bash
 true
 false
```

### Common methods used in the thread class
1. `public void run()`: Used to execute a certain task for a thread.
2. `public void start()`: Execution of a thread starts here.
3. `public void sleep(long milliseconds)`: Makes the executing thread sleep temporarily for a specified time.
4. `public void join()`: Used to wait for a thread to finish its execution.
5. `public void join(long milliseconds)`: Used to wait for a thread to finish its execution for a specified number of milliseconds.
6. `public int setPriority(int priority)`: A thread is allocated to the CPU based on its priority. Whenever we create a thread, it is assigned priority by the JVM or we can assign it directly using the `setPriority(int priority)` method.
7. `public int getPriority()`: The priority of a thread is shown by this method.
8. `public String getName()`: This shows the name of the thread.
9. `public void setName(String name)`: The name of a thread is changed using this method.

### Conclusion
Threads are independent and can perform multiple tasks at the same time. We have looked at the various stages of a life cycle of a thread, the various ways to create a thread, and how to start the thread. 

Happy coding!

---

Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
