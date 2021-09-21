Garbage collection in the C#.Net framework is used to manage memory automatically. In runtime, heap storage space can be allocated to an object class. If the software has completed all the activities that are related to the object the memory location will be a waste since it will not be usable.

### Introduction
Garbage collection is a critical approach in the .Net framework for releasing unused handled code objects from memory and allowing the process to run faster. In this tutorial, we will go over the fundamentals of garbage collection.

### Table of Contents
- [Overview on Garbage Collection](#overview-on-garbage-collection)
- [Garbage Collections Different phases](#garbage-collections-different-phases)
- [Garbage Collection Heap generation](#garbage-collection-heap-generation)
- [Methods in Garbage Collection Class](#methods-in-garbage-collection-class)
- [Benefits of Garbage Collection](#benefits-of-garbage-collection)

### Overview on Garbage Collection
In a .Net model, memory management is usually automated through the help of Garbage collection. A stack storage space is assigned only when a runtime class object is generated. Whenever the software completes all the activities that are connected with the object, the memory that is connected to it will not be useful as it will not be utilized.

Memory space that is not required is freed up with the help of garbage collection which makes it useful to use. Inbuilt scripting engine, the `Optimization Engine` found in the managed heap is always used in garbage collection.
When at least one of several conditions is met, garbage collection occurs. 

The following are the circumstances:
- When the primary storage becomes limited, garbage collection becomes useful.
- Whenever a stack memory surpasses a certain threshold, garbage collection becomes useful and starts when the amount of memory becomes different from each object.
- It is only when `GarbageC.Collect` is initiated that garbage collection happens. Because the waste collection is normally automated, this method is only employed in exceptional instances.

#### How garbage collection works;
The .Net framework must support implicit garbage collection. When an item is formed, it is assigned to Generation 0. Garbage collection employs an algorithm that examines the items in the generation; when the object's life period expires, it is removed from memory. There are two types of objects. The first is Live Objects, while the second is Dead Objects. The Garbage Collection mechanism collects any unutilized objects in the generation that are dead instances. If a living item has been running for a long time, it will be shifted to the next generation depending on how long it has been running.

The object cleanup in the generation will still not occur exactly after the life period of the specific objects has expired. Implementing the sweeping algorithm to clear the spaces for the procedure takes a bit of time.

### Garbage Collections Different phases
We have different phases of garbage collection. We will discuss the three phases.
The illustration below shows how garbage collection occurs in a different hierarchy.

![The diagram shows garbage collection phase](engineering-education/garbage-collection-in-c#-net-framework/garbage.jpg)

1. Marking phase: During the time of marking, the records of all the items found are kept. By keeping track of all the references to the root objects, will ensure that marking is done. Heap memory deletes live entities that are not on the list.
2. All connections to live items in the queue are updated during the relocating phase to refer during the compaction step, the items will be transferred to a new location.

### Garbage Collection Heap generation
Garbage collections will use different generations to manage a variety of items with different lifetimes. The Common Language Runtime (CLR) will be able to provide RAM to a generation based on the size of a project used. Using the `Optimization Engine` the collection means the method will be utilized to check where items will be placed. Either in generation one or two.

![Heap Generation in Garbage Collection](engineering-education/garbage-collection-in-c#-net-framework/heap.jpg)

**1. Generation 0;**
 Generation 0 refers to a newly generated item that has never been tagged for collection. All of the brief lifespan objects, like temporary attributes, are stored in the heap storage generation 0. Unless they are huge objects, all newly allocated entities are implicitly generation 0 objects. In general, garbage collection occurs most frequently in generation 0.

**2. Generation 1;**
 The first generation discovers a GC-survivor object that was tagged for collections but not destroyed due to heap space constraints. If certain generation 0 items are not released during a trash collection process, they are transferred to generation 1. This generation's objects serve as a buffer among both generation 0's short-lived objects and generation 2's long-lived items.

**3. The Generation 2;** 
Generation 2 identifies an item that has been swept by the GC more than once. In a garbage collection cycle, items can remain unreleased in generation 1 and this will make them migrate to generation 2. This happens because the items will remain in the heap memory, The items found in generation 2 always have a long life span, an example is the static objects. 

**Remember**
All succeeding generations have a waste collection that comprises garbage pickup for one generation. This means that all things from that generation, as well as succeeding generations, can be used without restriction. Generation 2 is also known as full garbage collection since all the things in the heap memory are deleted.

Furthermore, Generation 2 will have more memory than Generation 1, and Generation 1 will have more memory than Generation 0.

The following is a script that shows how many heap generations there are in garbage collection employing the GC. The GC class's MaxGeneration property.

```C#
using System;

public class garbage 
  {

    public static void Main(string[] args)
    {
        Console.WriteLine(" The Generation number is: " +
        GarbageC.MaxGeneration);
      }
  }

```
Our output will be as below;

```bash
The generation number is: 1

```
*Description ;*
To determine the maximum number of the generations that a machine can withstand which is 2, GarbageC.MaxGenertion attribute is used. This is shown in the above example. Note that the result will differ in different machines.

### Methods in Garbage Collection Class
The Garbage Collector class is in charge of the system's garbage collector. The methods of the Garbage Collector class are as follows:

**Method Garbage Collector.GetGeneration()** : This function returns the target object's generation number. It just takes one parameter, this is the item for which a manufacturing number is required.

Below is the demonstration of garbage collection `GarbageC.GetGeneration`.

```C#
using System;

public class Garbage
 {

    public static void Main(string[] args)
    {
        Garbage objec = new Garbage();
        Console.WriteLine("Our object generation number: "
        + GarbageC.GetGenerations(objec));
    }
}

```
The following is the program's output:

```bash
Our object generation number: 0

```
*Explanation ;* 
Only one parameter is accepted in the above program which returns the generation number of the object on target.

**GarbageCollection.GetTotalMemory function**
The number of bytes assigned in the scheme is returned by this method. It only requires a single binary decision parameter, true indicating that the method wants to wait for garbage collection to occur before having to return, and false indicating the contrary.

A program that shows how to use the GC. The following is the code for the GetTotalMemory() method:

```C#
using System;

public class Garbage {

    public static void Main(string[] args)
    {
        Console.WriteLine("Total Memory of the device:" + GC.GetTotalMemory(false));

        Garbage objec = new Garbage();

        Console.WriteLine("The Object generation number is: "   + GC.GetGeneration(objec));

        Console.WriteLine("Total Memory of the device:" + GC.GetTotalMemory(false));
    }
}

```
The result of our illustration code.

```bash
Total Memory of the device:2840
The object generation number is: 0
Total Memory of the device:9984

```
*Explanation* 
It's important to remember that the output is always dependent on the system you are using, which means you might get a different result than we did.
The number of bytes assigned in the system will be returned by the function above. It makes use of a boolean entity, where true indicates that the function will wait for garbage collection to begin before returning it, while false indicates the reverse.

**Garbage Collection.Collect function**
The GC.Collect() function can be used to enforce garbage collection in the system. Only one variable is required for this method: the value of the oldest generation about which garbage collection is performed.

The following is a script that shows how to use the GC.Collect() method:

```C#
using System;

public class Garbage
 {

    public static void Main(string args[])
    {
        GarbageC.Collects(0);
        Console.WriteLine("Generation 0 ; the garbage collection is:" + GarbageC.CollectionCount(0));
    }
}

```
Here is the end outcome:

```bash

Generation 0; the garbage collection is: 1

```
Garbage collection is enforced into the system utilizing the above approach in the code snippet above. A single argument, the oldest generation, will be required by the method.

### Benefits of Garbage Collection
- Garbage Collection uses generations of garbage collection to optimally utilize things on the main memory.
- Garbage collection dynamically discharges memory space when it is no longer necessary, thus no manual memory emptying is needed.
- Garbage collection ensures that memory allocation is handled correctly, ensuring that no objects accidentally utilize the resources of another entity.
- Garbage collection clears the memory of previously released objects, removing the requirement for constructors of freshly formed objects to consume the entire data field.

### Conclusion
We learned about the garbage collector (GC) in this tutorial, which is autonomous memory management. We have also looked at how the garbage collector manages an application's memory allocation and release. This means that you do not have to create code to handle memory management duties if you are dealing with managed programs.
