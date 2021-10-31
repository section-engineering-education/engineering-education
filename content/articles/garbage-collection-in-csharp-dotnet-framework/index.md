---
layout: engineering-education
status: publish
published: true
url: /garbage-collection-in-csharp-dotnet-framework/
title: Garbage Collection in C# .NET Framework
description: In this article, the reader will be walked through garbage collection in C# dotnet framework.
author: elijah-maina
date: 2021-10-17T00:00:00-04:21
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/garbage-collection-in-csharp-dotnet-framework/hero.jpg
    alt: Garbage collection in c# dotnet framework image
---

Garbage collection in the C#. Dotnet framework is used to manage memory automatically. In runtime, heap storage space can be allocated to an object class. If the software has completed all the activities related to the object, the memory location will be a waste since it will not be usable.
<!--more-->
### Introduction
Garbage collection is a critical approach in the .Net framework for releasing unused handled code objects from Memory and allowing the process to run faster. In this tutorial, we will go over the fundamentals of garbage collection.

### Table of contents
- [Overview on Garbage Collection](#overview-on-garbage-collection)
- [Garbage Collections Different phases](#garbage-collections-different-phases)
- [Garbage Collection Heap generation](#garbage-collection-heap-generation)
- [Methods in Garbage Collection Class](#methods-in-garbage-collection-class)
- [Stand out advantages of Garbage Collection](#stand-out-advantages-of-garbage-collection)

### Overview on garbage collection
In a .Net model, memory management is usually automated through the help of Garbage collection. A stack storage space is assigned only when a runtime class object is generated. Whenever the software completes all the activities connected with the thing, the memory linked to it will not be helpful as it will not be utilized.

Memory space that is not required is freed up with the help of garbage collection, which makes it worthwhile to use. The in-built scripting engine, `Optimization Engine` found in the managed heap, is always used in garbage collection. When at least one of several conditions is met, garbage collection occurs.

The following are the circumstances:
- When the primary storage becomes limited, garbage collection becomes useful.
- Whenever a stack memory surpasses a certain threshold, garbage collection becomes useful and starts when the amount of Memory differs from each object.
- It is only when `GarbageC.Collect` is initiated that garbage collection happens. Because the waste collection is typically automated, this method is only employed in exceptional instances.

### How garbage collection works
The .Net framework must support implicit garbage collection. When an item is formed, it is assigned to Generation 0. Garbage collection employs an algorithm that examines the items in the generation; when the object's life period expires, it is removed from Memory.

There are two types of things; live objects and dead objects. The garbage collection mechanism collects any unutilized objects in the generation that are dead instances.

If a living item has been running for a long time, it will be shifted to the next generation, depending on how long it has been running. The object cleanup in the generation will still not occur after the life period of the specific objects has expired. Therefore, implementing the sweeping algorithm to clear the spaces for the procedure takes a bit of time.

### Garbage collections different phases
We have different phases of garbage collection. We will discuss the three steps.
The illustration below shows how garbage collection occurs in a different hierarchy.

![The diagram shows garbage collection phase](/engineering-education/garbage-collection-in-csharp-net-framework/garbage.jpg)

1. Marking phase: During marking, the records of all the items found are kept. By keeping track of all the references to the root objects, will ensure that marking is done. Heap memory deletes live entities that are not on the list.
2. All connections to live items in the queue are updated during the relocating phase to refer to during the compaction step; the items will be transferred to a new location.

### Garbage collection heap generation
Garbage collections will use different generations to manage a variety of items with other lifetimes. The Common Language Runtime (CLR) will provide RAM to a generation based on the size of a project used. Then, using the `Optimization Engine`, the collection means the method will check where items will be placed. Either in generation one or two.

![Heap Generation in Garbage Collection](/engineering-education/garbage-collection-in-csharp-net-framework/heap.jpg)

**1. Generation 0;**
 Generation 0 refers to a newly generated item that has never been tagged for collection. All of the brief lifespan objects, like temporary attributes, are stored in the heap storage generation 0. Unless they are massive objects, all newly allocated entities are implicitly generation 0 objects. For the most part, garbage collection is only needed for generation 0.

**2. Generation 1;**
 The first generation discovers a GC-survivor object tagged for collections but not destroyed due to heap space constraints. If particular generation 0 items are not released during a trash collection process, they are transferred to generation 1. Thus, this generation's objects serve as a buffer between generation 0's short-lived and generation 2's long-lived items.

**3. The Generation 2;**
Generation 2 identifies an item that has been swept by the GC more than once. If things in generation 1 here are not released, they will migrate to generation 2, where they can be published. The reason for this is because the items will exist primarily in heap memory for a long time. One illustration of this is the existence of static objects in generation 2.

**Remember:** To dispose of Garbage properly, we need to think about it in terms of generations. All of the previous generations' components and those from succeeding generations can be employed freely when this occurs. Since all the items in the heap memory are deleted, generation 2 is also referred to as full garbage collection.

> Furthermore, Generation 2 will have more Memory than Generation 1, and Generation 1 will have more Memory than Generation 0.

The following is a script that shows how many heap generations there are in garbage collection employing the GC—the GC class's MaxGeneration property.

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
To determine the maximum number of generations that a machine can withstand, the `GarbageC.MaxGenertion` attribute is used. This is shown in the above example. Note that the result will differ in different machines.

### Methods in garbage collection class
The Garbage Collector class is in charge of the system's garbage collector. The methods of the Garbage Collector class are as follows:

**Method garbage Collector.GetGeneration()** : This function returns the target object's generation number. It just takes one parameter; this is the item for which a manufacturing number is required.

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
Only one parameter is accepted in the above program, which returns the generation number of the object on target.

**GarbageCollection.GetTotalMemory function**
The number of bytes assigned in the scheme is returned by this method. It only requires a single binary decision parameter, indicating that the process wants to wait for garbage collection before returning, and false indicating the contrary.

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

The result of our illustration code:

```bash
Total Memory of the device:2840
The object generation number is: 0
Total Memory of the device:9984
```

*Explanation*
It is important to remember that the output is always dependent on the system you are using, which means you might get a different result than we did.
The number of bytes assigned in the system will be returned by the function above. It uses a boolean entity, where true indicates that the function will wait for garbage collection to begin before returning it, while false indicates the reverse.

**Garbage Collection.Collect function**
The GC.Collect() function can be used to enforce garbage collection in the system. Only one variable is required for this method: the value of the oldest generation about which garbage collection is performed.

To demonstrate how to take advantage of the GC.Collect() method, below is a sample script.

```C#
using System;
public class Garbage
 {
    public static void Main(string args[])
    {
        GarbageC.Collects(0);
        Console.WriteLine("Generation 0 ; our garbage collection equals:" +     GarbageC.CollectionCount(0));
    }
}
```

Here is the end outcome:

```bash
Generation 0; our garbage collection equals: 1
```

Garbage collection is enforced into the system utilizing the above approach in the code snippet above. A single argument, the oldest generation, will be required by the method.

### Stand out advantages of garbage collection
- When it is unnecessary, garbage collection will dynamically release memory space, obviating the requirement for manual memory emptying.
- With Garbage Collection, objects in primary Memory are made better by collecting Garbage in successive generations.
- To prevent objects from mistakenly using another entity's attributes, garbage collection guarantees that memory allocation is done correctly.
- Garbage collection removes objects from Memory that have been released initially, removing the need for constructors of recently established objects to use the entire data field as a result of garbage collection.

### Conclusion
We learned about the garbage collector (GC) in this tutorial, which is autonomous memory management. We have also looked at how the garbage collector manages an application's memory allocation and release. This means that you do not have to create code to handle memory management duties if you deal with managed programs.

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
