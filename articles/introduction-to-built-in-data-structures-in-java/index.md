---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-built-in-data-structures-in-java/
title: Introduction to built-in data structures in Java
description: An introduction to various built-in data structures in Java and a comparison on how it differs from user-defined data structures.
author: srishilesh-p-s
date: 2021-02-00T00:00:00-00:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-built-in-data-structures-in-java/hero.jpg
    alt: Introduction to built-in data structures in Java
---
In this article, we will understand various built-in data structures used in Java. By the end of this article, you will get an overview of how built-in data structures are more efficient than user-defined data structures in Java.
<!--more-->
You will also learn how to work with built-in data structures.

### Table of contents

- [Introduction](#introduction)
- [Data Structures](#data-structures)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Introduction

> According to Wikipedia, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.

#### Built-in vs. User-defined Data Structures

Data structures like Stack, or Queue can be created on our own using other basic data structures. For example, Stacks can be created using Arrays or Linked lists. These are known as User-defined data structures.

While built-in data structures do not require the creation of a data structure from scratch. But, we can make use of prebuilt methods that abstract the working of the data structure.

By using built-in data structures, we can improve productivity by writing the operations of data structures from scratch. Also, built-in data structures are generally written with the most efficient time and space complexities.

Time and space complexities are measures of code that ensures the effective usage of time and memory while running a code snippet. By reducing these complexities, the efficiency of data structures can be improved.

### Data Structures

Now, let's have a look at a few built-in data structures, and we'll see how to work with them.

#### ArrayList

In the `java.util` package, `ArrayList` is a built-in data structure very similar to `Array`.

The difference between `Array` and `ArrayList` is the size. In `Array`, the length is fixed, so the memory allocated for storing values is fixed. Whereas, in `ArrayList`, the list is resizable, which allows in choosing of dynamic size. Here, the memory is created dynamically.

Syntax for creating ArrayList:

```java
import java.util.ArrayList; // Import the ArrayList class

ArrayList<String> list1 = new ArrayList<String>(); // Create an ArrayList object
```

##### Add Elements

When using an `Array`, we have to manually assign the values or variables to the particular index. But, in `ArrayList` adding elements to the list is made simpler with the use of the `add()` method.

Example:

```java
list1.add("Hello"); // Add "Hello" to the ArrayList
// OUTPUT: list1 = ["Hello"]
list1.add("World"); // Add "World" to the ArrayList
// OUTPUT: list1 = ["Hello", "World"]
```

##### Update Elements

Updation of elements in `Array` is similar to addition, where the index of the array is found and replaced with the desired value.

In `ArrayList`, we use the `set(index, value)` method to replace the element `value` at a particular `index`.

Example:

```java
list1.set(1, "Welcome"); // Replaces "World" with "Welcome" in list1
// OUTPUT: list1 = ["Hello", "Welcome"]
```

##### Remove Elements

In `Array`, removal of elements is not possible, since the memory allocated is fixed.

In `ArrayList`, the removal of elements can be done using the `remove(int index)` method. On specifying the `index`, the `ArrayList` removes the element from the memory, and the remaining elements are moved to fill up space. Thus, it is more memory efficient.

Example:

```java
list1.remove(0); // Removes "Hello" from list1
// OUTPUT: list1 = ["Welcome"]
```

#### LinkedList

Linked lists are linear data structures that are connected using pointers, and holds data. The memory allocation is not contiguous which makes it better than the use of Arrays.

While creating linked lists in Java, we have to create a separate class for working and managing the pointers. A sample class demonstrating the creation of pointers in user-defined linked list is shown as below:

```java
class Node { // Node class containing a single pointer and data
  Node next; // 'next' is used as pointer
  int data; // 'data' is used for storing values in the node
  // Constructor for initializing the variables
  Node() { 
    next = null;
    data = 0;
  }
}
```

In the `java.util` package, we simplify the tasks of manual creation for memory handling, by using `LinkedList` data structure. It contains pre-defined methods for building a linked list data structure.

Syntax for creating `LinkedList` data structure:

```java
import java.util.LinkedList; // Import package

LinkedList<String> list2 = new LinkedList<String>(); // Create new object
```

##### Add Elements

In the user-defined linked list data structure, for adding new data, we have to manually move the pointers and assign data. Whereas, in the `LinkedList` data structure, we make use of `add(Object)` or `add(int index, Object)` methods for adding new elements.

Example:

```java
list2.add("Hello"); // Add "Hello" to the LinkedList list2
// OUTPUT: ["Hello"]
list2.add("World"); // Add "World" to the LinkedList list2
// OUTPUT: ["Hello", "World"]
list2.add(1, "Computer"); // Add "Computer" to the LinkedList list2 at index 1
// OUTPUT: ["Hello", "Computer", "World"]
```

##### Update Elements

To update elements in the user-defined linked list, we have to traverse the whole linked list from the "HEAD" pointer to update the particular data.

`LinkedList` data structure abstracts the whole process with the `set(index, data)` method.

Example:

```java
list2.set(0, "Welcome"); // Update the string at index 0 to "Welcome"
// OUTPUT: ["Welcome", "Computer", "World"]
```

##### Remove Elements

Similarly, for deletion of an element in a user-defined linked list is cumbersome, where the pointer of the previous element is pointed to the address of the next element. When working with huge data, working with pointers is not easy.

`LinkedList` data structure uses `remove(Object)` methods for deletion of elements from the linked list.

Example:

```java
list2.remove(1); // Removes "Computer" from list2
// OUTPUT: ["Welcome", "World"]
```

#### HashMap

A Map is a data structure that helps us in mapping Key and Value pairs. Similarly, in Java, we make use of `HashMap`, which hashes the Key by an index. By hashing, we will be able to access the Value by specifying the index.

Syntax for creating a `HashMap`:

```java
import java.util.HashMap; // Importing package

HashMap<Integer, String> map1 = new HashMap<Integer, String>(); // Creating a HashMap object
```

##### Adding Elements

`HashMap` is one of the important data structures, where mapping the key and the value helps in accessing the elements with very little time complexity. To map a key with a value, we make use of the `put(key, value)` method.

Example:

```java
map1.put(0, "A"); // Map (0, "A") and hash the key
map1.put(1, "B"); // Map (1, "B") and hash the key
// OUTPUT: map1 = {0="A", 1="B"}
```

##### Updating Elements

Similarly, for updating elements, we again make use of the same method which we used for adding a new element.

Example:

```java
map1.put(0, "B"); // Map (0, "B") and hash the key
map1.put(1, "C"); // Map (1, "C") and hash the key
// OUTPUT: map1 = {0="B", 1="C"}
```

##### Removing Elements

For removing the mapping from the `HashMap`, we make use of the `remove(index)` method to remove the value for the mentioned index.

Example:

```java
map1.remove(0); // Remove mapping (0, "B") from map1
// OUTPUT: map1 = {1="C"}
```

#### Stack

A `Stack` is a linear data structure that is very similar to that of `ArrayList`. But, it is based on the principle of Last-In-First-Out (LIFO). In simple words, LIFO can be explained as whichever element is added, at last, must be removed first.

Since it's a linear data structure based on the LIFO principle, accessing the last element is not possible by specifying the index. The series of steps for accessing values at a particular index can be avoided by making use of the `Stack` data structure.

Syntax for building a `Stack` data structure:

```java
import java.util.Stack; // Import Stack package

Stack<Integer> stack = new Stack<Integer>(); // Creating object for Stack
```

##### Adding Elements

Adding elements is also known as "PUSH". Since the stack works only based on a single pointer, only 2 operations can be performed. To push a value into a `Stack`, we make use of the `push(value)` method.

Example:

```java
stack.push(10); // Push value 10 into Stack
stack.push(11); // Push value 11 into Stack
// OUTPUT: stack = [10, 11]
```

##### Removing Elements

Similarly, to remove an element from `Stack`, we make use of the `pop()` method. Here, we need not specify the index, since, by default, it removes the last added element, according to the principle.

Example:

```java
stack.pop(); // Removes 11 from Stack
// OUTPUT: stack = [10]
```

#### Queue

Alternatively, the `Queue` is a linear data structure, which works on the First-In-First-Out (FIFO) principle. The element that is added first into a queue, should be removed first from the queue.

Syntax for creating `Queue` data structure:

```java
import java.util.Queue; // Import Queue package

Queue<Integer> queue = new Queue<Integer>(); // Create new object
```

##### Adding Elements

Adding elements to the queue can be done by making use of the `add(value)` method.

Example:

```java
queue.add(1); // 1 added to queue
queue.add(2); // 2 added to queue
// OUTPUT: queue = [1, 2]
```

##### Removing Elements

In `Queue`, removing elements is referred to as "Polling". Polling can be performed on one end of the queue, called the "Rear" end. Similarly, adding can be performed on the opposite end, called the "Front" end.

Example:

```java
queue.poll(); // Removes 1 from the queue
// OUTPUT: queue = [2]
```

### Conclusion

To conclude, we have learned about various built-in data structures available in Java. We have also learned how to work with them.

To summarize:

- We learned about various built-in data structures.

- We compared them with user-defined data structures.

- We learned how to work with each built-in data structure.

### Further reading

- [Oracle Documentation on ArrayList](https://docs.oracle.com/javase/7/docs/api/java/util/ArrayList.html)
- [Oracle Documentation on LinkedList](https://docs.oracle.com/javase/7/docs/api/java/util/LinkedList.html)
- [Oracle Documentation on HashMap](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)
- [Oracle Documentation on Stack](https://docs.oracle.com/javase/7/docs/api/java/util/Stack.html)
- [Oracle Documentation on Queue](https://docs.oracle.com/javase/7/docs/api/java/util/Queue.html)