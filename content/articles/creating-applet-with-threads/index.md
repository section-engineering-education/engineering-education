---
layout: engineering-education
status: publish
published: true
url: /creating-applet-with-threads/
title: Creating an Applet with Threads in Java
description: In this article we will discuss how to make applets using threads in the Java programming language. Threads allow programs to run more efficiently by allowing them to perform many tasks at once.
author: andrew-odera
date: 2022-01-06T00:00:00-11:05
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-applet-with-threads/hero.jpg
    alt: Creating an Applet with Threads in Java Hero Image
---
Threads allow programs to run more efficiently by allowing them to perform many tasks at once. They are used in the background to perform complex tasks without interfering with the main program. 
<!--more-->
Threads improve the operations performed when using a browser.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating a thread class](#creating-a-thread-class)
- [Creating an applet with threads](#creating-an-applet-with-threads)
- [Program to create an applet with threads](#program-to-create-an-applet-with-threads)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you should:
- Have basic knowledge of [threads](https://www.w3schools.com/java/java_threads.asp).
- Have basic skills in [Java](https://www.w3schools.com/java/) programming.
- Understand [applets](https://www.javatpoint.com/java-applet).

### Creating a thread class
Java has several essential tools. A thread class is one used in developing multithreaded systems. Thread classes are used to create a subclass that behaves like the threads themselves. The subclass is declared when building a function thread. 

After developing the subclass, the thread `run()` method is overridden causing it to make the thread class behave like a thread, defining the class execution thread. The `start()` function is used to invoke the `run()` method and a class is instantiated.

```java
// We use this format to create a thread class
public class ThreadClass extends Thread{
    public void run(){
        super.run();
        //Type your code here
    }
}

public class Main{
    public static void main(String args[]){
        ThreadClass thread = new ThreadClass();
        thread.start();//calls the ThreadClass created
    }
}
```

### Creating an applet with threads
To design an applet that uses threads, we have to make a few changes:
- Create a class definition.
- Update your applet class's signature to add the phrases that implement `Runnable`.
- Know the instance variable to hold in the thread applet.
- Change your `start()` method to do nothing more than spawn a thread and start it up.
- Write a `run()` method that contains the actual code that launches your applet.

To create an applet with threads, you must perform several actions. We need to define the first line in the class definition as shown below:

```java
//Defines the class of the applet as public
public class AppletClass extends java.applet.Applet
{
    ...
}
```

You need to change the signature of your applet class as shown:

```java
public class AppletClass extends java.applet.Applet implements Runnable
{
    ...
}
```

The program class above supports the runnable interface. Remember that interfaces are a mechanism to add method names that are shared by many classes. They can then be combined and implemented within different classes that need to implement `behavior`. 

The `run()` method is identified by the runnable interface then we add a `start()` function. For example:

```java
// Function called when the thread execution starts.
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

The `run()` method contains things you may want to run in a separate thread. Such as the initialization code, the previous loop for your applet, or anything else that runs in its thread. This allows you to create new objects and call methods from within `run()` while also allowing the objects to pass within the thread. 

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
1. Disables the thread's execution.
2. Sets the variable (runner) of the thread to null - When a variable is set to null, the thread object uses its previously contained variable for garbage collection. This results in the applet being erased from memory after a predetermined amount of time. The start method sets a new thread and reloads the page. As a result, we create a thread that runs on this applet.

### Program to create an applet with threads

```java
// Applet window or skeleton is developed.
import java.applet.*;
import java.awt.*;
public class Thread extends Applet() {
    float h, w;
    boolean thread;
    Thread t = null;
public void init(){
    //initialization takes place
    system.out.println("init(): start");
    w = getSize().w;// Defines the width
    h = getSize().h;//defines the Height
    setBackground(color.gray);
    system.out.println("init(): stop");
}
// Function called when the applet is terminated or stopped to excute.
public void destroy(){
    //performs shutdown action to the thread.
    system.out.println("destroy()");
}
 // Function called when the applet is started.
public void start() {
    system.out.println("start(): start");
    if ( t == null){
        system.out.println("start(): created thread");
       t = new Thread();
       system.out.println("start(): starting thread");
       t = false;
       t.start();
    }
    else{
        if(thread){
            thread = true;
            system.out.println("start(): notifies thread");// Sends information to the thread
            synchronized(this){
                show();
            }
        }
    }
    system.out.println("start(): stop");
}
}
```

### Create an HTML file to execute your applet code
For one to execute an applet program, one needs to create a HTML file that will execute the program in a command line interface (CLI).

```html
<html>
  <head>
    <title>MyApplet</title>
    <!--Write the name of the file you created here at MyApplet  -->
  </head>
  <body>
    <applet code="MyApplet.class" width="1024" height="750"></applet>
  </body>
</html>
```

After writing the code, we compile the applet program and a display of the applet we created will be loaded.

### Conclusion
In this article, we learned how to use threads in Java to create applets. We looked at the various changes needed for one to create an applet using threads. We also learned how to execute an applet using an HTML file.

Happy coding!

---

Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)