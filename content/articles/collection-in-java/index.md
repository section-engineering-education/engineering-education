---
layout: engineering-education
status: publish
published: true
url: /collection-in-java/
title: Collection in Java
description: This article will introduce collection in Java and discuss using various examples of how we can manipulate data at runtime without specifying storage or size.
author: meshack-koros
date: 2022-01-08T00:00:00-03:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/collection-in-java/hero.jpg
    alt: Collection in Java Hero Image Hero Image
---
Before introducing the collection framework, popular ways of grouping objects were arrays, vectors, and other ways. The only disadvantage of all the collections mentioned above is that they had no standard interface.
<!--more-->
When implementing these collections, they have to be defined independently. It also posed a challenge to developers since it was challenging to recall methods, syntax, and constructors present in every class. Therefore, this called for the introduction of the **Collection framework**.

A developer can now easily access any interface without knowing the code written or the classes involved. Let us now implement the various features mentioned above using collection in Java.

### Table of contents
- [Introduction](#introduction)
- [Implementing arrays and vectors](#implementing-arrays-and-vectors)
- [Methods of the collection interface](#methods-of-the-collection-interface)
- [Diagramatic representation of the collection framework](#diagramatic-representation-of-the-collection-framework)
- [Summary](#summary)

### Introduction
**Collection in Java** organizes data to make storing, accessing, and editing of data easier. What is an interface? - An Interface is a system where related or unrelated entities can interact. 

For our case, the collection of objects created will interact with the library of existing classes, which can be achieved successfully through the interfaces availed by the JDK.

Examples of interfaces include:
- java.util.Collection - This is the collection interface.
- java.util.Map - This is the Map interface.

#### Implementing arrays and vectors
Let us look at how the aforementioned collections were implemented without the collection framework.

```java
import java.util.ArrayList;
import java.util.Vector;
public class Main {
    public static void main(String[] args) {
        ArrayList<String> studentNames = new ArrayList<>();
        Vector<Integer> age = new Vector<>();
        // Creating instances of ArrayList and Vector
        studentNames.add("Kimosop");
        studentNames.add("Somehalder");
        studentNames.add("James");
        age.addElement(22);
        age.addElement(31);
        age.addElement(14);
        // Adding objects into the containers
        System.out.println(studentNames.toArray().length);
        System.out.println(studentNames.get(1));
        System.out.println(age.elementAt(0));
        // Outputting the integer and name of the array at the index stated
        studentNames.remove(0);
        //removing a name from the list
        System.out.println(studentNames.get(0));
        System.out.println(studentNames.toArray().length);
        // Checking the output after modifying the objects in the list 
    }
}
```

![Output](/engineering-education/collection-in-java/output.png)

```java
import java.util.Hashtable;
public class Main {
    public static void main(String[] args) {
        Hashtable<Integer, String> students = new Hashtable<>();
        students.put(22,"Kimosop");
        students.put(25, "Stewie");
        System.out.println(students.get(22));
        System.out.println(students.get(25));
    }
}
```

### Methods of the collection interface
Now we will look at some primary methods used in the collection interface:
- `add(Object)` - This method adds an object into the collection.
- `contains(Object O)` - The output for this is `true` if a particular object is contained in the collection and `false` for vice versa. It mainly deals with boolean outputs.
- `isEmpty()` - This method also returns a boolean. It outputs true if the collection has an element specified.
- `toArray()` - This method converts the elements in the collection into an array.
- `size()` - This method checks the size of the elements in a collection.
- `max()` - This returns the maximum value in a collection.
- `removeIf(Predicate filter)` - This method removes elements in a collection that satisfies a specified predicate.

#### Diagramatic representation of the collection framework
The collection framework can be categorized into interfaces and classes. On top of the hierarchy stands the iterable interface. This interface acts as a root for all the other interfaces and classes since they all extend this class.

Below the Iterable interface is the collection interface which contains different interfaces such as list, queue, deque, set, and many others. Every interface has different classes that serve different purposes, as shown below:

![Hierarchy](/engineering-education/collection-in-java/hierarchy.png)

From the diagram we have seen above. The collection hierarchy diagram consists of `interfaces` and `classes`. The interfaces extend other interfaces in the tree towards the tree's root, which is the `Iterable interface`.

Let us now take a look at the interfaces individually.

1. **Iterable Interface**
The iterable interface is the baseline interface in the hierarchy tree. It contains the methods that any class in the hierarchy tree can call.

It can be implemented as shown below.

```java
Iterator<T> iterator()  
```

2. **Collection Interface**
You can consider the collection framework as the heart of the collection framework since the method declaration of all classes happens here.

Method in the collection framework include: `clear()`, `add()`, `size()`.

3. **Array List**
This class helps when dealing with dynamic arrays. A `dynamic array` is an array whose size is unpredictable since it keeps adding up. Other arrays usually have a fixed size where you have to state the number of elements to be stored. 

The dynamic array, on the other hand, supports automatic resizing using the `resizing.ArrayList` method which is located at the `java.util package`, which means that you import the package every time you want to form an `ArrayList.util` package. You can achieve this as shown in the example below:

We have further created object names and added a list of names to the array from the above.

```java
  import java.util.ArrayList
```

In the example above, we have imported `java.util` package since we will be using its classes when creating the `ArrayList`.

```java
  import java.util.ArrayList
  ArrayList students = new ArrayList("Bob", "Kimosop", "Keen");
```

From the snippet above, we have further created object names and added a list of names to the array. We can also add names to the array, as shown below:

```java
  ArrayList students = new ArrayList();

  students.add("Bob");
  students.add("Kimosop");
  students.ass("Keen");
```

```bash
// Output
Bob
Kimosop
Keen
```

The difference between the above method of adding elements to the list in the array and the former is that you can add or remove elements during run time.

4. **Set**
We use a set interface to avoid duplication and store objects uniquely. Some set interface classes are `HashSet`, `Tree set`, `LinkedHashSet`, and many others. Below is a syntax to instantiate the set:

```java
Set<data-type> set1 = new HashSet<data-type>();  
Set<data-type> set2 = new TreeSet<data-type>();  
```

5. **Hashset**
The example below will help us understand `HashSet` better:

```java
import java.util.HashSet;
import java.util.Iterator;
public class Main {
    public static void main(String[] args) {
        HashSet<String> hashSet = new HashSet<>();
        hashSet.add("Lebron");
        hashSet.add("is");
        hashSet.add("for");
        hashSet.add("Lakers");
        Iterator<String> itr = hashSet.iterator();
        while (itr.hasNext()) {
            System.out.println(itr.next());
        }
    }
}
```

```bash
//Output
Lebron
for
Lakers
is
```

We have first instantiated the `HashSet` class, which automatically imports methods in the `HashSet` class and `Iterator interface`. You can now add names easily to the `HashSet` by calling the `hashset.add` method. Lastly, instantiate the `Iterator interface` to import all its methods and decide how to output the names.

### Summary
In this tutorial, we covered the following.
1. Introduced and understood Collection.
2. Implementation of arrays and vectors.
3. Methods in the Collection interface.
4. Diagramatic representation of Collection framework.
5. Interfaces
   - Iterable Interface.
   - Collection Interface
      - List
      - Queue and Deque
      - Set
6. Classes
      - Array list
      - Hash set.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
