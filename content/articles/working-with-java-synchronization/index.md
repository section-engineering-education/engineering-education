Synchronization in computing is the practice of keeping a group of data or files identical across many locations. It enables several threads to access a common resource such as external files, class variables, and database information. Synchronization is common in multithreaded code. It enables your code to execute on a single thread uninterrupted.

### Table of contents
- [An insight on java synchronization](#an-insight-on-java-synchronization)
- [Different types of synchronization](#different-types-of-synchronization)
- [The race condition](#the-race-condition)
- [Understanding synchronized method and synchronized block](#understanding-synchronized-methods-and-synchronized-blocks)
- [Implementing synchronization in Java](#implementing-synchronization-in-java)
- [Conclusion](#conclusion)

### An insight on java synchronization
Several threads querying the same resource might lead to unexpected results. Synchronization is required to prevent several threads from accessing a resource allowing only one thread at a time. Java's synchronized blocks, denoted by the `synchronized` keyword, allow you to handle several processes at once.  In each case, a thread must acquire and release a lock on the method or block.

Controlling problems with mutual exclusion in a multithreading system is the goal of synchronization. Take note of the following:

- Immutable objects in Java do not need synchronization.
- Variables cannot be synchronized in Java. This will cause a compilation error.

### Different types of synchronization
Below are the two forms of synchronization:

1. **Process Synchronization**: We are executing many threads or processes simultaneously to commit to a series of operations.

2. **Thread Synchronization**: This synchronization ensures that only one thread may access a shared resource at a time.

### The race condition
A race situation may occur in Java due to the use of several threads to implement applications concurrently. Because Java is a multithreaded programming language, race conditions are more likely to occur. In some ways, the race situation resembles Java's deadlock since it is caused by multi-threading and may lead to serious consequences. Threads that are working on the same object or data without sufficient synchronization might result in overlapping operations on each other, which is what causes race conditions.

To understand further lets first look at the types of race condition:

1. **Check-then-act**: If the value of the variable is dependent on the actions of the thread, this might be a problem. Thread's behavior may diverge if it reads an incorrect value.

2. **Read-modify-write**: The read-modify-write (RMW) operation is a subclass of the atomic operations that concurrently read a memory region and write a new value into it. They prevent race situations in multi-threaded programs. Mutexes and semaphores are common applications for them. Non-blocking synchronization makes extensive use of these atomic activities.

Let us now look at an error scenario involving race conditions:

A race issue may cause an executing thread to read an old value from a shared object:

1. A problem may develop if the thread determines the variable's value. Thread's behavior may diverge if it reads an incorrect value. This type of problem is known as the **check-then-act condition**.

2. A thread must read, modify, and store the current value. A race situation allowed a thread to access and modify a stale value. This type of problem is known as the **read-modify-write condition**.

The example program below illustrates race conditions:

You can see the increased value of an integer variable in this basic example. One by one the variable's value is incremented and shown in ten different ways. Each thread will be numbered from one and nine.

Save as **Example.java**

```Java
public class Example {
  int check = 0;
  public  void CheckBoost(){
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    check++;
  }
  public int obtainCheck(){
    return check;
  }
  public static void main(String[] args) {
    Example zy = new Example();
    for(int x = 1; x < 6; x++){
      new Thread(new Runnable() {			
        @Override
        public void run() {
          zy.CheckBoost();
          System.out.println("The output of the thread is : " + Thread.currentThread().getName() + " - " + zy.obtainCheck());
        }
      }).start();
    }
  }
}
```

```
The output of the thread is : Thread-0 - 3
The output of the thread is : Thread-1 - 3
The output of the thread is : Thread-2 - 3
The output of the thread is : Thread-4 - 5
The output of the thread is : Thread-3 - 4
```

As shown above, the threads are chosen at random, and the value is incorrect. The value should rise by 1 but that is not the case. Usually, the output is 3. Threads 0, 1, and 2 share the same value thus showing a race condition. After understanding what a race condition is, lets now look at how to refrain from it.

It is evident that the crucial element (code that changes shared resources) must be limited. Java's synchronized keyword synchronizes shared resource access. This prevents thread interference during atomic operations.

Synchronizing the method call should avoid the race problem:

```Java
public class Example2 {
  int check = 1;
  public  void CheckBoost(){
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    check++;
  }
  public int obtainCheck(){
    return check;
  }
  public static void main(String[] args) {
    Example2 zy = new Example2();
    int x;
    for(x = 1; x < 6; x++){
      new Thread(new Runnable() {			
        @Override
        public void run() {
          synchronized(zy){
            zy.CheckBoost();
            System.out.println("The output of the thread is : " + Thread.currentThread().getName() + " - " + zy.obtainCheck());
          }
        }
      }).start();
    }	
  }
}

```

```
The output of the thread is : Thread-0 - 2
The output of the thread is : Thread-4 - 3
The output of the thread is : Thread-3 - 4
The output of the thread is : Thread-2 - 5
The output of the thread is : Thread-1 - 6
```

From the results of the threads above, no thread shares a value. Our aim of avoiding a race condition is fulfilled.

### Understanding synchronized methods and synchronized blocks
To understand the two, let us first look at each separately:

#### Synchronized methods
These consist of the following properties:

- A synchronized method locks down the whole object. No other thread may access synchronized methods in the object while the method is executing.
- In non-static methods, this locks them whereas static methods are locked by their class.
- Synchronized methods need locks on the current object or the class level lock if they are static. This is because the lock is obtained when the thread enters and released when the thread quits (naturally or by throwing an Exception).
- Synchronized methods keep the lock for the method scope.
- A synchronized static function locks the class object.

#### Synchronized blocks
The following is all that it entails:

- This keyword locks synced blocks on the item between parentheses. Locked objects are only accessible to the synchronized block's threads.
- Synchronized blocks utilize it as a lock.
- Using a synchronized block enables you to fine-tune lock control by mutually excluding important section code.
- The lock gets unlocked when the thread leaves the synchronized block.
- A synchronized block may produce a `NullPointerException` if a parameter expression evaluates to null, while synchronized methods do not.
- The lock is only held throughout the block scope of the synchronized block. 
- A static method may lock an object inside the parenthesis of a synchronized block.

### Implementing synchronization in Java
To provide internal synchronization, Java's lock concept is employed. In Java, each object has its own lock. In this case, the lock idea will be brought into play anytime we utilize the synchronized keyword.

First, a thread with the lock on the object must execute any synchronized methods on it. Post-lock, a thread may invoke any synchronized method on the object. Upon successful completion of the synchronized method, the thread is responsible for releasing the lock. No other threads may perform synchronized methods on the same object while a thread is executing one. However, any non-synchronized procedure may be executed concurrently by the remaining threads. Note that this idea of a lock may be applied on the object level rather than the method level.

let's look at an example program:

```Java
class Implementation {

	public synchronized void wish(String tag) {
	    int x;
		for ( x = 1; x <= 2; x++) {
			System.out.println("Hello : ");
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {

			}
			System.out.println(tag);
		}
	}

}

class OurThreadExample extends Thread {
	Implementation b;
	String tag;

	public OurThreadExample(Implementation b, String tag) {
		super();
		this.b = b;
		this.tag = tag;
	}

	public void run() {
		b.wish(tag);
	}
}

public class SynchImp {
	public static void main(String[] args) {

		Implementation b1 = new Implementation();
		OurThreadExample mt1 = new OurThreadExample(b1, "SECTION");
		OurThreadExample mt2 = new OurThreadExample(b1, "ENGINEERING");
		mt1.start();
		mt2.start();
	}
}
```

The code will output:

```
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
Synchronization is required to ensure that only one thread may access the resource at a time. We have looked at how to work with synchronization and the various aspects of this concept.

Happy learning!
