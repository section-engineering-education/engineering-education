---
layout: engineering-education
status: publish
published: true
url: /collection-in-java/
title: Collection in Java
description: This article will introduce collection and discuss using various examples of how we can manipulate data at runtime without specifying storage or size.
author: koros-wkd
date: 2021-12-21T00:00:00-12:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/collection-in-java/hero.jpg
    alt: Collection in Java Hero Image Hero Image
---
Before introducing the collection framework, a popular way of grouping objects was Arrays, Vectors, and other ways. 
<!--more-->
The only disadvantage of all the collections mentioned above is that they had no standard interface. When implementing these collections, they have to be defined independently.

Also, it posed a challenge to developers since it was challenging to recall methods, syntax, and constructors present in every class. Therefore, this called for the introduction of the Collection Framework. 

The developer can now easily access any interface without knowing the code written or the classes involved. Let us now take a look at how all the above-mentioned happen with collection in java.

### Table of Contents

-[Introduction](#introduction)
-[Implementing arrays and vectors](#implementing-arrays-and-vectors)
-[Methods of the collection interface](#methods-of-the-collection-interface)
-[Diagramatic representation of the collection framework](#diagramatic-representation-of-the-collection-framework)
-[Summary](#summary)

### Introduction
**Collection in java** organizes data to make it easier to store, access, and edit the data.

On the other hand, a framework makes the developers' work more accessible by providing the code libraries, the collection library.

However, what is an Interface? - An Interface is a system where related or unrelated entities can interact. For our case, the collection of objects created will interact with the library of existing classes, which can be achieved successfully through the interfaces availed by the JDK.

Examples of interfaces include:
- java.util.Collection- which is the collection interface.
- java.util.Map - This is the Map interface.

#### Implementing arrays and vectors
Before the collection framework, organizing data was achieved through arrays and vectors. The above collections had no standard interface, making it harder to implement collection as a unit. Let us look at how the collections mentioned above were implemented with the absence of a collection framework.

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

![Output](/engineering-education/collection/output.png)

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
- `contains(Object O)` - The output for this is true if a certain object is contained in the collection and false for vice versa. It mostly deals with boolean outputs.
- `isEmpty()` - This method also returns a boolean. It outputs true if the collection has an element specified.
- `toArray()` - This method converts the elements in the collection into an array.
- `size()` - This method checks the size of the elements in a collection.
- `max()` - This returns the maximum value in a collection/
- `removeIf(Predicate filter)` - This method removes elements in a collection that satisfies a specified predicate.

#### Diagramatic representation of the collection framework
The collection framework can be categorized into interfaces and classes.
On top of the hierarchy stands the iterable interface. This interface acts as a root for all the other interfaces and classes since they all extend this class.

Below the Iterable interface is the collection interface which contains different interfaces such as list, queue, deque, set, and many others.

Every interface has different classes that serve different purposes, as shown below:

![Hierarchy](/engineering-education/collection/hierarchy.png)

From the diagram we have seen above. The collection hierarchy diagram consists of `interfaces` and `classes`. The interfaces extend other interfaces in the tree towards the tree's root, which is the `Iterable interface`.

Let us now take a look at the interfaces individually.

1. **Iterable Interface**

This is the baseline interface in the hierarchy tree. It contains the methods that any of the classes in the hierarchy tree can be called.

It can be implemented as shown below.

```java
Iterator<T> iterator()  
```

2. **Collection Interface**
You can consider the collection framework as the heart of the collection framework since the method declaration of all classes happens here.

Method in the collection framework include:  `clear()`, `add()`, `size()`.

3. **Array List**
The class helps when dealing with dynamic arrays.

A `dynamic array` is an array whose size is unpredictable since it keeps adding up. Other arrays usually have a fixed size where you have to state the number of elements to be stored. The dynamic array, on the other hand, supports automatic resizing.

We'll now use a code snippet to understand how the array list achieves automatic resizing.

```java
import java.util.ArrayList;
import java.util.Iterator;
public class Main {
    public static void main(String[] args) {
    
        ArrayList<String> names = new ArrayList<>();
        //Creating an arraylist
        
        names.add("Kolbe");
        names.add("Byrant");
        names.add("Isles");
        //Adding elements objects into the array
        
        Iterator itr = names.iterator();
        while (itr.hasNext()) {
            System.out.println(itr.next());
        }
    }
}
```

//Output
- Kolbe
- Bryant
- Isles

As you have noted, from the above example, we have imported methods from the class Arraylist and the Interface the Iterator. We have utilized the commands: 
- `import java.util.ArrayList;`
- `import java.util.Iterator;`

We did not have to write the entire code in the main method to perform a specific action. We just called it after importing their respective classes. An example of a method we only had to call is the `hasNext()` method. We only had to call it from the Iterator interface. We achieved so by creating an object of the iterator `Iterator itr = names.iterator()` and using the object to call the Iterator interface.

4. **Set**
We use a set interface when we want to avoid duplication and aim to store objects uniquely. Some of the classes of the set interface are: HashSet, Tree set, LinkedHashSet, etc.
Below is a syntax to instantiate the set:

```java
Set<data-type> set1 = new HashSet<data-type>();  
Set<data-type> set2 = new TreeSet<data-type>();  
```

5. **Hashset**
The example below will help us understand HashSet better.

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

//Output
Lebron
for
Lakers
is

We have first instantiated the HashSet class, which automatically imports methods in the HashSet class and Iterator interface. You can now add names easily to the HashSet by calling the `hashset.add` method. Lastly, instantiate the Iterator interface to import all its methods and decide how you want to output the names.

### Summary
In this tutorial, we have been able to cover the following.
1. Introduced and Understood Collection.
2. Implementation of Arrays and Vectors.
3. Methods in the Collection Interface.
4. Diagramatic representation of Collection Framework
5. Interfaces
   - Iterable Interface.
   - Collection Interface
      - List
      - Queue and Deque
      - Set
6. Classes
      - Array List
      - Hash set.
