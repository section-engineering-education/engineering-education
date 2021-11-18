### Creating Applet with Thread in Java
### Table of content
- [Creating Applet with Thread in Java](#creating-applet-with-thread-in-java)
- [Table of content](#table-of-content)
- [Prerequisite](#prerequisite)
- [Intrоduсtiоn](#intrоduсtiоn)
- [Why Threads for Applet](#why-threads-for-applet)
- [Creating a Thread with the Thread Class](#creating-a-thread-with-the-thread-class)
- [Writing Applet with Threads](#writing-applet-with-threads)
- [Program code for creating Applets with Threads](#program-code-for-creating-applets-with-threads)
- [Conclusion](#conclusion)
### Prerequisite
One needs to have a basic understanding in:
- Be able to understand what threads.
- Have basic skills in Java programming.
- Understand applets.
### Intrоduсtiоn
In this article, we are going to discuss how to make Applets using Threads in Java language. In this article we will create a thread with many thread class.

### Why Threads for Applet
Threads allow the software to run more efficiently by allowing it to perform multiple tasks at once. They are used in the background to perform complex tasks without interfering with the main program. Even if the browser creates a separate thread for each applet, it makes sense to put any time-consuming operations in applet-created threads as the time-consuming ones are left aside while simple ones are handled.
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
     Color c = new Color((int)(255.128 * Math.random()),
      (int)(255.128 * Math.random()),
      (int)(255.128 * Math.random()) );
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
- Know the instance variable to behold in the thread applet.
- Change your start() method to do nothing more than spawn a thread and start it up.
- Write a run() function that contains the actual code that launches your applet.
To write an applet utilizing thread, you must perform several things, none of which are difficult. The first modification is to define the first line in the class definition as shown:
```java
//defines the class of the applet as public
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
The program class above supports the runnable interface. Remember that interfaces are a mechanism to aggregate method names that are shared by multiple classes, which can then be combined and implemented within different classes that need to implement behavior. The run() method is identified by the runnable interface then we add a start() function. For example: 
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
The run() method contains things you may want to run in a separate thread, such as initialization code, the previous loop for your applet, or anything else that runs in its thread. By doing so, one can create new objects and call methods from within run(), and the objects can run within the thread as well. After running the threads, we must stop them so that the thread's execution can be suspended. This can only be accomplished by including the stop() method, as shown in the following lines of code:
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
- Disables the Thread's execution.
- Sets the variable (runner) of the Thread to null.
When a variable is set to null, the thread object uses its previously contained variable for garbage collection, which results in the applet being erased from memory after a predetermined amount of time. The start method creates a new thread and restarts the page. As a result, we create a thread that runs on his applet.
### Program code for creating Applets with Threads
```java
//file: UpdateApplet.java
public class UpdateApplet extends java.applet.Applet  
    implements Runnable {  
    private Thread updateThread;  
    int updateInterval = 100;  
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
### Conclusion
Finally, we learned how to use threads in Java to create applets. We also discussed why people create applets with Threads