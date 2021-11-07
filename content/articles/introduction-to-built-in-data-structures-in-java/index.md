---
layout: engineering-education
status: publish
published: true
url: /introduction-to-built-in-data-structures-in-java/
title: Introduction to Built-in Data Structures in Java
description: An introduction to various built-in data structures in Java and a comparison on how it differs from user-defined data structures.
author: srishilesh-p-s
date: 2021-02-03T00:00:00-16:00
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
> According to Wikipedia, a data structure is a data organization, management, and storage format that enables efficient access and modification. 

More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.

#### Built-in vs. User-defined data structures
Data structures like Stack or Queue can be created on our own using other basic data structures. For example, Stacks can be created using Arrays or Linked lists. These are known as User-defined data structures.

Built-in data structures do not require the creation of a data structure from scratch. But, we can make use of prebuilt methods that abstract the working of the data structure.

Using built-in data structures, has improved the productivity of the developer, since writing operations for the user-defined data structures is time consuming, and cannot guarantee the efficiency. Also, built-in data structures are generally written with the most efficient time and space complexities.

Time and space complexities are measures of code that ensures the effective usage of time and memory while running a code snippet. By reducing these complexities, the efficiency of data structures can be improved.

### Data structures
Now, let's have a look at a few built-in data structures, and we'll see how to work with them.

#### ArrayList
In the `java.util` package, `ArrayList` is a built-in data structure very similar to `Array`.

The difference between `Array` and `ArrayList` is the size. In `Array`, the length is fixed, so the memory allocated for storing values is fixed. Whereas, in `ArrayList`, the list is resizable, that allows the developer to choose a dynamic size. Here, the memory is created dynamically.

Syntax for creating ArrayList:

```java
import java.util.ArrayList; // Import the ArrayList class

ArrayList<String> list1 = new ArrayList<String>(); // Create an ArrayList object
```

Before we proceed on with the built-in methods, let's build a user-defined function for displaying all the elements of an `ArrayList`.

```java
void printArrayList(ArrayList<String> list) {
  for (int i = 0; i < list.size(); i ++) {
    System.out.print(list.get(i) + " ");
  }
  System.out.println();
}
```

#### Add elements
When using an `Array`, we have to manually assign the values or variables to the particular index. But, in `ArrayList` adding elements to the list is made simpler with the use of the `add()` method.

Example:

```java
list1.add("Hello"); // Add "Hello" to the ArrayList
printArrayList(); // OUTPUT: list1 = ["Hello"]
list1.add("World"); // Add "World" to the ArrayList
printArrayList();  // OUTPUT: list1 = ["Hello", "World"]
```

**Output:**

```bash
Hello
Hello World
```

#### Update Elements
Updating the elements in `Array` is similar to addition, where the index of the array is found and replaced with the desired value.

In `ArrayList`, we use the `set(index, value)` method to replace the element `value` at a particular `index`.

Example:

```java
list1.set(1, "Welcome"); // Replaces "World" with "Welcome" in list1
printArrayList();  // OUTPUT: list1 = ["Hello", "Welcome"]
```

**Output:**

```bash
Hello Welcome
```

#### Removing elements
In `Array`, the removal of elements is not possible, since the memory allocated is fixed.

In `ArrayList`, the removal of elements can be done using the `remove(int index)` method. On specifying the `index`, the `ArrayList` removes the element from the memory, and the remaining elements are moved to fill up space. Thus, it is more memory efficient.

Example:

```java
list1.remove(0); // Removes "Hello" from list1
printArrayList(); // OUTPUT: list1 = ["Welcome"]
list1.remove(1); // Remove element from Empty list
printArrayList(); // Exception
```

**Output:**

```bash
Welcome
java.lang.IndexOutOfBoundsException: Index 1 out of bounds for length 0
```

#### Linked lists
Linked lists are linear data structures that are connected using pointers, and holds data. Pointers are used to store and manage the addresses of dynamically allocated blocks of memory. The memory allocation is not contiguous which makes it better than the use of Arrays.

While creating linked lists in Java, we have to create a class to define the structure of every node of the linked list. A sample class demonstrating the creation of pointers in an user-defined linked list is shown below:

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

In the `java.util` package, we simplify the tasks of manually creating memory handling by using the `LinkedList` data structure. It contains pre-defined methods for building a linked list data structure.

Syntax for creating `LinkedList` data structure:

```java
import java.util.LinkedList; // Import package

LinkedList<String> list2 = new LinkedList<String>(); // Create new object
```

Before we proceed with the built-in methods, let's build a user-defined function for displaying all the elements of a `LinkedList`.

```java
void printLinkedList(LinkedList<String> list) {
  for (int i = 0; i < list.size(); i ++) {
    System.out.print(list.get(i) + " ");
  }
  System.out.println();
}
```

#### Adding elements
In the user-defined linked list data structure, when adding new data, we have to manually move the pointers and assign data. Whereas, in the `LinkedList` data structure, we make use of the `add(Object)` or `add(int index, Object)` methods for adding new elements.

Example:

```java
list2.add("Hello"); // Add "Hello" to the LinkedList list2
printLinkedList(); // OUTPUT: ["Hello"]
list2.add("World"); // Add "World" to the LinkedList list2
printLinkedList(); // OUTPUT: ["Hello", "World"]
list2.add(1, "Computer"); // Add "Computer" to the LinkedList list2 at index 1
printLinkedList(); // OUTPUT: ["Hello", "Computer", "World"]
```

**Output:**

```bash
Hello
Hello World
Hello Computer World
```

#### Updating elements
To update elements in the user-defined linked list, we have to traverse the whole linked list from the "HEAD" pointer to update the particular data.

`LinkedList` data structure abstracts the whole process with the `set(index, data)` method.

Example:

```java
list2.set(0, "Welcome"); // Update the string at index 0 to "Welcome"
printLinkedList(); // OUTPUT: ["Welcome", "Computer", "World"]
```

**Output:**

```bash
Welcome Computer World
```

#### Removing elements
Similarly, when deleting an element in a user-defined linked list can be cumbersome, where the pointer of the previous element is pointed to the address of the next element. When working with huge data, working with pointers is not simple.

Deletion of an element in a user-defined linked list happens as mentioned in the steps below:
- Initialize a pointer `node` as `node = head`.
- Traverse the linked list until you reach the element (`node.next.val != value`) that you wish to delete.
- On reaching the node, we point the `node` to `node.next.next`, which means, we point the previous node to the next node. `node = node.next.next`.

By using built-in data structures, we can avoid using the `remove(Object)` method to delete elements from the linked list.

Example:

```java
list2.remove(1); // Removes "Computer" from list2
printLinkedList(); // OUTPUT: ["Welcome", "World"]
list2.remove(0); // Remove "Welcome" from list2
list2.remove(0); // Remove "World" from list2
printLinkedList(); // Empty list
list2.remove(0); // Remove elements from Empty list
```

**Output:**

```bash
Welcome World

java.lang.IndexOutOfBoundsException: Index 0 out of bounds for length 0
```

#### HashMap
A Map is a data structure that helps us in mapping Key and Value pairs. Similarly, in Java, we make use of `HashMap`, which hashes the Key by an index. By hashing, we will be able to access the Value by specifying the index.

Syntax for creating a `HashMap`:

```java
import java.util.HashMap; // Importing package

HashMap<Integer, String> map1 = new HashMap<Integer, String>(); // Creating a HashMap object
```

#### Adding elements
`HashMap` is an important data structure, when mapping the key and the value helps access the elements with very little average time complexity of O(1). To map a key with a value, we can make use of the `put(key, value)` method.

The average time complexity for adding or accessing or removing an element using `HashMap` is O(1).

Example:

```java
map1.put(0, "A"); // Map (0, "A") and hash the key
map1.put(1, "B"); // Map (1, "B") and hash the key
System.out.println(map1); // OUTPUT: map1 = {0="A", 1="B"}
```

**Output:**

```bash
{0=A, 1=B}
```

#### Updating elements
Similarly, when updating elements, we again can make use of the same method that we used when adding a new element.

Example:

```java
map1.put(0, "B"); // Map (0, "B") and hash the key
map1.put(1, "C"); // Map (1, "C") and hash the key
System.out.println(map1); // OUTPUT: map1 = {0="B", 1="C"}
```

**Output:**

```bash
{0=B, 1=C}
```

#### Removing elements
When removing the mapping from the `HashMap`, we will make use of the `remove(index)` method to remove the value for the mentioned index.

Example:

```java
map1.remove(0); // Remove mapping (0, "B") from map1
System.out.println(map1); // OUTPUT: map1 = {1="C"}
```

**Output:**

```bash
{1=C}
```

#### Stack
A `Stack` is a linear data structure that is very similar to that of the `ArrayList`. But, it is based on the principle of Last-In-First-Out (LIFO). In simpler words, LIFO can be explained as whichever element is added last, must be removed first.

Since it is a linear data structure based on the LIFO principle, accessing the last element is not possible by specifying the index. The series of steps for accessing values at a particular index can be avoided by making use of the `Stack` data structure.

Syntax for building a `Stack` data structure:

```java
import java.util.Stack; // Import Stack package

Stack<Integer> stack = new Stack<Integer>(); // Creating object for Stack
```

#### Adding elements
Adding elements is also known as "PUSH". Since the stack works only based on a single pointer, only 2 operations can be performed. To push a value into a `Stack`, we make use of the `push(value)` method.

Example:

```java
stack.push(10); // Push value 10 into Stack
stack.push(11); // Push value 11 into Stack
// OUTPUT: stack = [10, 11]
```

#### Removing elements
Similarly, to remove an element from `Stack`, we will make use of the `pop()` method. Here, we need not specify the index, since, by default, it removes the last added element, according to the principle.

Example:

```java
stack.pop(); // Removes 11 from Stack
// OUTPUT: stack = [10]
stack.pop() // Remove 10 from Stack
// OUTPUT: EmptyStackException
```

If your `Stack` is empty i.e. `(stack.size() == 0)`, then popping of elements is not possible. If you still proceed with the `pop()` method, then it would raise an exception called `EmptyStackException`.

#### Queue
Alternatively, the `Queue` is a linear data structure, that works on the First-In-First-Out (FIFO) principle. The element that is added first into a queue, should be removed first from the queue.

Syntax for creating `Queue` data structure:

```java
import java.util.Queue; // Import Queue package

Queue<Integer> queue = new Queue<Integer>(); // Create new object
```

#### Adding elements
Adding elements to the queue can be done by making use of the `add(value)` method.

Example:

```java
queue.add(1); // 1 added to queue
queue.add(2); // 2 added to queue
// OUTPUT: queue = [1, 2]
```

#### Removing elements
In `Queue`, removing elements is referred to as "Polling". Polling can be performed on one end of the queue, called the "Rear" end. Similarly, adding can be performed on the opposite end called the "Front" end.

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

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
