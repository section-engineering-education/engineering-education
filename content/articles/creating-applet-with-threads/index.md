### Creating Applet with Thread in Java
### Table of content
- [Prerequisites](#prerequisite)
- [Reasons for having Threads](#reasons-for-having-threads)
- [Creating a Thread with Class](#creating-a-thread-with-class)
- [Writing Applet with Threads](#writing-applet-with-threads)
- [Conclusion](#conclusion)
### Prerequisite
One needs to have a basic understanding in:
- Should have basic knowledge in Threads.
- Have basic skills in Java programming.
- Understand applets.
### Intrоduсtiоn
In this article, we are going to discuss how to make Applets using Threads in Java language. In this article, we will create a thread with many thread classes.
### Reasons for having Threads
Threads allow the software to run more efficiently by allowing it to perform multiple tasks at once. They are used in the background to perform complex tasks without interfering with the main program. Threads improve the operation in a browser. 
### Creating a Thread with Class
Java has several essential tools, such as a thread class,  used in developing multithreaded systems. Thread classes are used to create a subclass that behaves like the threads themselves. The subclass is declared when building a function thread. After developing the subclass, the Thread run() method is overridden, thus causing the run() method to make the thread class behave like a thread, defining the class execution thread. Start() function is used to invoke the run() method, and a class is instantiated.

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

Once users modify the start() method to it does nothing but regenerate a thread, the applet's body is switched to a new method, run().
```java
public static void run() 
{
 // what your applet does
}
```
The run() method contains things you may want to run in a separate thread, such as initialization code, the previous loop for your applet, or anything else that runs in its thread. This allows you to create new objects and call methods from within run() while also allowing the objects to pass within the thread. Thread execution is stopped after running the threads. This can only be accomplished by including the stop() method, as shown in the following lines of code:

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
When a variable is set to null, the thread object uses its previously contained variable for garbage collection, which results in the applet being erased from memory after a predetermined amount of time.The start method sets a new thread and reloads the page. As a result, we create a thread that runs on his applet.



### program to create Applet with Threads
```java
import java.applet.applet;
import java.awt;
public class Thraed extends MyApplet() {
    int w, h;
    int z = 0;
    boolean thread;
    Thread t = null;
public void init(){
    system.out.println("init(): begin");
    w = getSize().w;// Defines the widht
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
Finally, we learned how to use threads in Java to create applets. We also discussed why people create applets with Threads
