---
layout: engineering-education
status: publish
published: true
url: /creating-applet-with-threads/
title: Creating Applet with Thread in Java
description: In this article, we are going to discuss how to make applets using threads in the Java programming language.
author: andrew-odera
date: 2021-12-16T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-applet-with-threads/hero.jpg
    alt: Creating Applet with Thread in Java Hero Image
---
Threads allow programs to run more efficiently by allowing them to perform many tasks at once. They are used in the background to perform complex tasks without interfering with the main program. Threads improve the operation in a browser.

### Table of content
- [Prerequisites](#prerequisites)
- [Creating a thread with class](#creating-a-thread-with-class)
- [Writing Applet with threads](#writing-applet-with-threads)
- [Program to create an applet with threads](#program-to-create-an-applet-with-threads)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you should:
- Have basic knowledge of threads.
- Have basic skills in Java programming.
- Have an understanding of applets.

### Creating threads using a class
Java has several essential tools. A thread class is one used in developing multithreaded systems. 

Thread classes are used to create a subclass that behaves like the threads themselves. The subclass is declared when building a function thread. 

After developing the subclass, the thread `run()` method is overridden, thus causing it to make the thread class behave like a thread, defining the class execution thread. The `Start()` function is used to invoke the `run()` method and a class is instantiated.

### Writing applets with threads
To design an applet that uses threads, you must make changes. These are:
- Create a class definition.
- Update your applet class's signature to add the phrases that implement `Runnable`.
- Know the instance variable to hold in the thread applet.
- Change your `start()` method to do nothing more than spawn a thread and start it up.
- Write a `run()` method that contains the actual code that launches your applet.

To write an applet using a thread, you must perform several things. First, we need to define the first line in the class definition as shown below:

```java
//defines the class of the applet as public
public class AppletClass extends java.applet.Applet
{
    ...
}
```

You need to change the signature of your applet class as shown below:

```java
public class AppletClass extends java.applet.Applet implements Runnable
{
    ...
}
```

The program class above supports the runnable interface. Remember that interfaces are a mechanism to add method names that are shared by many classes.  They can then be combined and implemented within different classes that need to implement `behavior`. 

The `run()` method is identified by the runnable interface then we add a `start()` function. For example:

```java
public start()
 {
 if (runner == null);
 {
  runner = new Thread(this);
  runner.start();
 }
 }
```

Once users modify the `start()` method, it does nothing but regenerate a thread. The applet's body is switched to a new method, `run()`.

```java
public static void run()
{
 // what your applet does
}
```

The `run()` method contains things you may want to run in a separate thread. Such as initialization code, the previous loop for your applet, or anything else that runs in its thread. This allows you to create new objects and call methods from within `run()` while also allowing the objects to pass within the thread. 

Thread execution is stopped after running the threads. This can only be accomplished by including the `stop()` method as shown below:

```java
public void stop()
{
if (runner != null)
{
runner.stop();//stops execution
runner = null;//sets variable to value nulll
}
}
```

The `stop()` method in the preceding code achieves two things:
- Disables the thread's execution.
- Sets the variable (runner) of the thread to null - When a variable is set to null, the thread object uses its previously contained variable for garbage collection. This results in the applet being erased from memory after a predetermined amount of time. The start method sets a new thread and reloads the page. As a result, we create a thread that runs on this applet.

### Program to create an applet with threads

```java
import java.applet.applet;
import java.awt;
public class Thread extends MyApplet() {
    int w, h;
    int z = 0;
    boolean thread;
    Thread t = null;
public void init(){
    system.out.println("init(): begin");
    w = getSize().w;   // Defines the width
    h = getSize().h;
    setBg( color.#FFFF00 );
    system.out.println("init(): stop");
}
public void destroy(){
    system.out.println("kill()");
}
public void start() {
    system.out.println("begin(): begin");
    if ( t == null){
        system.out.println("begin(): created thread");
       t = new Thread();
       system.out.println("begin(): starting thread");
       t = false;
       t.start();
    }
    else{
        if(thread){
            thread = true;
            system.out.println("begin(): notifies thread");
            synchronized(this){
                notify();
            }
        }
    }
    system.out.println("begin(): stop");
}
}
```

### Conclusion
In this article, we learned how to use threads in Java to create applets. We also discussed why people create applets with threads.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)