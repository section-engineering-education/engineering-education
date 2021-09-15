### Introduction
`Producer-consumer` synchronization problem happens when one or more threads generate and store their data in a buffer and then simultaneously consume data from that buffer. This can lead to a race situation, in which the threads compete for the ability to complete their tasks. In this instance, nothing prevents people from using many procedures at the same time and getting erroneous findings. Due to the lack of inter-thread communication, the consumer may attempt to withdraw a piece even if the buffer is empty, because there is no communication between threads. While the buffer is full, the producer may attempt to add another piece.
In this article, we will examine at the possible solution utilizing `BlockingQueue`.
### Some possible solutions for Producer-Consumer 
1. Checking the buffer size before removing and adding appears to be a viable method. In most produce-consumer systems, an infinite while loop is used. It would be inefficient to check the size for each loop iteration. Thread-safety cannot be guaranteed, either. As a result, this approach isn't used.

2. Inter-thread communication can be established using the wait() and notify() functions.

3. BlockingQueue is a thread-safe alternative to wait() and notify that is less complicated (). An in-depth look at this strategy is provided in this article. 
### BlockingQueue
It waits until the queue is not empty before retrieving and removing elements from it, and when adding an element, it waits until there is room in the queue. The java.util.concurrent package also includes it.

- UnblockingQueue will stop the producer until the consumer removes the element.
- An empty BlockingQueue will also stop the consumer thread until a producer adds an element to the queue.

There are two main methods in BlockingQueue namely:
1. `Put()`

Inserts the provided element into this queue, waiting for space to open up if necessary. InterruptedException is thrown by void put(E e). The element to be added is e. While waiting, an InterruptedException is thrown if the thread is interrupted.

2. `Take()`

If the queue has a head, this function is used to retrieve it and remove it. If there are no items in the queue, it will wait for one to become available before proceeding. When working with threads and using BlockingQueue, this way is more efficient. InterruptedException is thrown by E take(), returns the first position in the queue and if the thread is interrupted while waiting, an InterruptedException is thrown.

> Add(E e) and delete() functions are likewise available in BlockingQueue. However, these methods should not be utilized to solve produce-consumer issues because add throws an IllegalStateException if the queue is full and remove returns a boolean when an element is expected.

### BlockingQueue implementation
We can't construct an object for BlockingQueue because it's an interface. Instead, we can use one of the classes that implement BlockingQueue to construct objects. ArrayBlockingQueue will be used in this presentation.
#### ArrayBlockingQueue
When an array is used as the backing for a bound blocking queue in the Queue class, ArrayBlocking is used. The term `bounded` refers to the Queue's size being fixed. The capacity cannot be modified once it has been created. Operation is halted if you attempt to put an element into a queue that is full. ThIn the Java Collections Framework, a Java library, this class can be found as a subclass.

- It's obvious from its name that an array blocking queue uses an array data structure as a buffer.
- Because it's an array, its capacity is fixed once it's declared.
- In addition, it allows for the possibility of fairness. First-come-first-served indicates that threads have equal access to the buffer. By default, fairness is turned off. As a boolean value, true can be sent to the constructor.
### Production-Consumer Solution
The BlockingQueue concept and its usage is now clear. We can now solve the producer-consumer issue using this knowledge. Produce and consume are two subproblems that can be separated for convenience. They'll be handled by independent threads, but will share a BlockingQueue buffer.
Producer class will produce numbers (as the name suggest) of a range of [1,5]. This data will be placed in the BlockingQueue buffer.
```Java
class produce implements Runnable {
  
    BlockingQueue<Integer> object;
  
    public produce(BlockingQueue<Integer> object)
    {
        // consider accepting the constructor's ArrayBlockingQueue object

        this.object = object;
    }
  
    @Override public void run()
    {
          
         // [1,5] numbers should be Produced number: in the buffer.
        for (int i = 1; i < 6; i++) {
            try {
                object.put(i);
                System.out.println("Produced number: number:  " + i);
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```
The BlockingQueue buffer will be used by the Consumer to get the data it needs. This info will be printed in our case.
```Java
class consumer implements Runnable {
  
    BlockingQueue<Integer> object;
    int taken = -1;
  
    public consumer(BlockingQueue<Integer> object)
    {
        // consider accepting the constructor's ArrayBlockingQueue object
        this.object = object;
    }
  
    @Override public void run()
    {
  
        while (taken != 5) {
            try {
                taken = object.take();
                System.out.println("Consumed number: number:  " + taken);
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```
Here we will establish an array blocking queue object, with one thread for each producer and consumer. Then we may execute the solution.
### Solution for the Producer-Consumer Problem.
Every time you run the application, the production and consumption orders may change. The important thing to remember is that all the numbers Produced number: will be utilized and there will be no inter-thread communication concerns. For example, 5 in the example below is a `poison element`, signaling that the Production-Consumption cycle has ended. A LinkedBlockingQueue can be utilized if you don't know how many components there are.

Below is a simple Java program that will show you how to solve your producer-consumer problem.
```Java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
  
// Main class 
public class Main {
    public static void main(String[] args)
    {
  
        // Creation of an ArrayBlockingQueue object 
        BlockingQueue<Integer> bqueue
            = new ArrayBlockingQueue<Integer>(5);
  
        
        produce p = new produce(bqueue);
        consume c = new consume(bqueue);
  
        // For each producer and consumer, create a separate thread, and pass them the objects they need to function.

        Thread produceThread = new Thread(p);
        Thread consumeThread = new Thread(c);
  
        
        produceThread.start();
        consumeThread.start();
    }
}
  
class producer implements Runnable {
  
    BlockingQueue<Integer> obj;
  
    public producer(BlockingQueue<Integer> obj)
    {
        this.obj = obj;
    }
  
    @Override public void run()
    {
        for (int i = 1; i <6; i++) {
            try {
                obj.put(i);
                System.out.println("Produced number: number:  " + i);
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
  
class consumer implements Runnable {
  
    BlockingQueue<Integer> obj;
  
    int taken = -1;
  
    public consumer(BlockingQueue<Integer> obj)
    {
        this.obj = obj;
    }
  
    @Override public void run()
    {
        while (taken != 5) {
            try {
                taken = obj.take();
                System.out.println("Consumed number: number:  " + taken);
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```
**OUTPUT**
```
Produced number: 1
Produced number: 2
Produced number: 3
Produced number: 4
Consumed number: 1
Consumed number: 2
Consumed number: 3
Consumed number: 4
```
### Conclusion
In multiprocess synchronization, the Producer-Consumer Problem is a well-known problem that is used to synchronize many processes. Production and Consumption Problems: A Producer produces something and a Consumer consumes the product that the Producer has created.

I hope you find this helpful!