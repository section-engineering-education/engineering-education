### Creating Applet with Thread in Java
### Table of content
- [Prerequisite](#prerequisite)
- [Intrоduсtiоn](#intrоduсtiоn)
- [Why Threads for Applet](#why-threads-for-applet)
- [Creating a Thread with the Thread Class](#creating-a-thread-with-the-thread-class)
- [Writing Applet with Threads](#writing-applet-with-threads)
- [Program code for creating Applets with Threads](#program-code-for-creating-applets-with-threads)
- [Using a Thread to Perform One-Time Initialization](#using-a-thread-to-perform-one-time-initialization)
- [Conclusion](#conclusion)
### Prerequisite
For one follow this tutorial, you should have a basic understanding of the following concepts:

- Should understand what Threads are in Java.
- Have basic skills in Java programming.
- Be aware of what Applets are.
### Intrоduсtiоn
In this article, we are going to discuss how to make Applets using Threads in Java language. We will also show how to create Threads with Threads class.

### Why Threads for Applet
Threads make it possible for the software to execute more effectively by allowing it to do numerous tasks at once. Threads can be utilized to conduct complex activities in the background without interfering with the main program. Even if the browser creates a distinct thread for each applet, it makes sense to put any time-consuming operations in an applet-created thread so that the applet can execute other tasks while the time-consuming ones are being finished.

### Creating a Thread with the Thread Class
The Thread class is one of several essential tools in Java for developing multithreaded systems. The Thread class is used to create a class that behaves like a thread. When building a functional thread, a subclass of Thread must be declared. After you've developed the subclass, you'll need to override Thread's run() method. The run() method causes the Thread class to behave like a thread, defining the class execution thread. We start the thread with the start() function after the run() method has been invoked and the class has been instantiated.
```java
import java.awt.*;
import java.lang.*;
import java.applet.Applet;
public class LineApplet extends Applet  {
   Thread t;
   boolean running = false;
   // we set the size of the applet
   public void init() {
    resize(300,300);
    t = new LineThread(this);
    t.start();
    running = true;
   }
   public boolean mouseUpward(Event ev, int x1, int x2) {
    if (running) {
     running = false;
     t.suspend();
     repaint(); 
    
    }
    else {
     running = true;
     t.resume();
    }
    return true;
   };
   public void destroy() {
    t.stop();
    try {
       t.join();
    }
    catch (InterruptedException e) { }
   }
}
class LineThread extends Thread {
   Applet b;
   public LineThread(Applet b) {
  this.b = b;
   }
   public void run() {
    // Gives the dimension data of the applet...
    double width = (double) b.size().width;
    double height = (double)b.size().height;
    // Lood and draw lines ...
    while (true) {
     Graphics g = b.getGraphics();
     // Randomly gives color...
     Color c = new Color((int)(255.255 * Math.random()),
      (int)(255.255 * Math.random()),
      (int)(255.255 * Math.random()) );
     g.setColor(c);
     g.drawLine((int)(width * Math.random()),
      (int)(height * Math.random()),
      (int)(width * Math.random()),
      (int)(height * Math.random()) );
     // Sleep some...
     try {
      sleep(100);
     }
     catch (InterruptedException e) { }
    }
   }
}

```
### Writing Applet with Threads
To design an applet that uses threads, you must make four changes. Among these changes are:
- Create a class definition.
- Update your applet class's signature to add the phrases that implement Runnable.
- Include an instance variable to hold the thread of this applet.
- Change your start() method to do nothing more than spawn a thread and start it up.
- Write a run() function that contains the actual code that launches your applet.
To write an applet utilizing thread, you must perform several things, none of which are difficult. The first modification is to define the first line in the class definition as shown:
```java
public class MyAppletClass extends java.applet.Applet 
{
    ...
}
```
You need to change the signature of your applet class as shown:
```java
public class MyAppletClass extends java.applet.Applet implements Runnable
{
    ... 
}
```
In the applet, the program above supports the Runnable interface. Remember that interfaces are a mechanism to aggregate method names that are shared by multiple classes, which can then be combined and implemented within different classes that need to implement behavior. The default definition for the run() method is provided by the Runnable interface. The following step is to create an instance variable to hold the applet thread. Third, add a start() function to the existing one that does nothing but create a new thread and launch it. Here's an example of the start() method:
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
When you change the start() to do nothing but spawn a thread, the body of the applet moves to a new method, run(), which look like this:
```java
public void run() 
{
 // what your applet does
}
```
run() method contains things you may want to run in a separate thread that is initialization code, the previous loop for your applet, or anything you that runs in its thread. By doing so one can create new objects and call methods from inside run(), and the objects can run inside the thread as well. The run method is the heart of the applet. After running the threads we need to stop them so that we suspend the execution of the thread. This can only be done by including the stop(), method as shown in these lines of code:
```java
public void stop() 
 {
 if (runner != null) 
 {
 runner.stop();//stops execution
 runner = null;//srets variable to value nulll
 }
 }
 ```
The stop() method in the preceding code achieves two things:
- Disables the thread's execution.
- Sets the variable (runner) of the thread to null.
Setting the variable to null causes the thread object to use its previously contained variable for garbage collection, resulting in the applet being erased from memory after a predetermined amount of time. When the reader returns to the page, the start method generates a new thread and restarts the applet. And thus we make a thread that runs on his applet.

### Program code for creating Applets with Threads
```java
//file: UpdateApplet.java
public class UpdateApplet extends java.applet.Applet  
    implements Runnable {  
    private Thread updateThread;  
    int updateInterval = 1000;  
    public void run( ) {  
        while ( updateThread != null ) {  
            try {    
                Thread.sleep( updateInterval );   
            }
            catch (InterruptedException e ) { 
                return;
            }  
            repaint( );  
        }  
    }  
    public void start( ) {  
        if ( updateThread == null ) {  
            updateThread = new Thread(this);  
            updateThread.start( );  
        }  
    }  
    public void stop( ) {  
        if ( updateThread != null ) {  
            Thread runner = updateThread;
            updateThread = null;  // flag to quit
            runner.interrupt( );   // wake up if asleep
        }  
    }  
}


```
### Using a Thread to Perform One-Time Initialization

For your applet to perform the initialization task, one needs to consider ways of performing the initialization in a thread. One of the examples is for something to require a network connection, it should load in a background thread.
### Conclusion
Finally, we learned how to use threads to create applets in Java. We also spoke about why people make applets with threads. We've also gone over part of the code that demonstrates how to build Threads in Java, as well as the one-time initialization of Threads.