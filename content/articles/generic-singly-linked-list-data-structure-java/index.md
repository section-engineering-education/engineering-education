---
layout: engineering-education
status: publish
published: true
url: /generic-singly-linked-list-data-structure-java/
title: Implementing a Generic Singly Linked List Data Structure in Java
description: In this article, we will look at implementing a generic singly linked list data structure in Java.
author: lynn-mumo
date: 2021-12-07T00:00:00-13:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/generic-singly-linked-list-data-structure-java/hero.jpg
    alt: Generic Singly linked list Data Structure in Java Hero Image
---
A `linked list` is used to hold node-based data. Data in a linked list is spread across many locations rather than being stored in a single memory location like in an array. Each node has a reference section where the address of the next node is maintained. In addition, the brief linked list has links connecting some of the nodes.
<!--more-->
An array data structure is improved by addressing its limitations, such as the need for contiguous memory and the difficulty of array insertion and deletion. Additionally, a linked list makes it simpler to add and remove items as needs change.

The simplest type of linked list, known as a Singly Linked List, will be covered in this article. Linked Lists can be used in a wide range of applications, from simple to complex. We will take a look at them one at a time.

### Prerequisites
1. Before proceeding with this tutorial you should have a good knowledge of the Java programming language.
2. For server-side Java development, have **IntelliJ IDEA** as the IDE.

### Table of contents
- [The building blocks](#the-building-blocks)
- [Differences between a linked list and an array](#differences-between-a-linked-list-and-an-array)
- [What a generic linked list is and how it is used](#what-a-generic-linked-list-is-and-how-it-is-used)
    - [Primary linked list member functions](#primary-linked-list-member-functions)
- [Singly-linked list](#singly-linked-lists)
- [Testing a Java singly-linked list](#testing-a-java-singly-linked-list)
- [Applications of singly-linked list](#applications-of-a-singly-linked-list)
- [Conclusion](#conclusion)

### The building blocks
A linked list is made up of the following components:
1. **Nodes**: The list's elements are represented by nodes. Object-Oriented Programming can be used to create nodes. A node class must be defined before you can create an instance for each node you want to link to.

```java
class Node(object):
	def __init__(self, num):
		self.num = num
		self.next = None
```

2. **Links between nodes via pointers**: It is one of the primary characteristics of Linked Lists that nodes are linked by pointers. For convenience and sequentiality, each node stores a pointer to its "neighbors."

Let us look at the example below:

```java
self.next # Pointer to the right node
self.prev # Pointer to the left node
```

> Since the **HEAD** node is the first node in the list, it does not have another node immediately to its left, so **self.prev** would be **None**. There is no immediate neighbor for the **TAIL** node, so it would have **None** as itself. Next, using the pointers that connect the nodes, you can move from node to node until you find the one you are looking for.

### Differences between a linked list and an array
A linked list and an array differ in various ways that are listed below:
- There is only one memory address for a complete array. Whereas a linked list stores various elements at different memory locations.
- A linked list's data items can be added to or removed from at any time, whereas the size of an array's array is specified at the time of declaration and cannot be changed afterwards.
- The only place we store an array is in a large free block of space due to contiguous allocation, while in a linked list, different elements are stored in different locations. So, linked lists can be created in small free space chunks.
- A linked list uses less space than an array because pointers can be stored close to nodes instead of in the middle of the list.
- In a linked list, only linear search is performed, but linear search and binary search are used in an array.

### What a generic linked list is and how it is used
There are many ways to create a generic linked list because they can carry any form of data. Implementation of linked lists that may store any data type is known as a generic linked list. Integers are stored in one linked list, while floats are stored in the other.

#### Primary linked list member functions
These are the functions that can be performed on a linked list:
- `Sort` - Sorts the linked list's nodes.
- `Search` - Chooses one of the related nodes and clicks on it.
- `Deletion` - Gets rid of everything that is already there.
- `Insertion` - Extends the linked list by one element.
- `Traversal` - Accesses the connected list's elements one by one.

### Singly-linked lists
This is a linked list that can only be traversed in one direction from the head to its end node, which is called a singly-linked list (tail). In a linked list, each element is called a node. List structures can be maintained by using nodes that contain data and a link to the next node.

This section will explore how generics can be used to implement a singly linked list in a type-safe, parameterized fashion. We will use the Java program below to generate our own type-safe linked list.

```Java
import java.io.*;
public class Main {
public static void main(String[] args)
    {
class node<T> {
    T data;
    node<T> next;
    node(T data)
    {
        this.data = data;
        this.next = null;
    }
}
class list<T> {
// Instances of a generic node type.
    node<T> head;
    private int newlength = 0;
    list() { this.head = null; }
    void add(T data)
    {
        node<T> newtemp = new node<>(data);
        // If the list has no items, then a new value is assigned to the head node.
        if (this.head == null) {
            head = newtemp;
        }
        else {
            node<T> X = head;
            while (X.next != null) {
                X = X.next;
            }
            // Topping off the list with an extra, higher-valued node
            X.next = newtemp;
        }
        newlength++;
    }
    void add(int newposition, T data)
    {
        if (newposition > newlength + 1) {
            return;
        }
        if (newposition == 1) {
            node<T> newtemp = head;
            head = new node<T>(data);
            head.next = newtemp;
            return;
        }
        // node for traversal
        node<T> newtemp = head;
        // Dummy node
        node<T> prev = new node<T>(null);
        while (newposition - 1 > 0) {
            prev = newtemp;
            newtemp = newtemp.next;
            newposition--;
        }
        prev.next = new node<T>(data);
        prev.next.next = newtemp;
    }
    void remove(T key)
    {
        // Dummy node with null value
        node<T> prev = new node<>(null);
        prev.next = head;
        node<T> next = head.next;
        node<T> newtemp = head;
        boolean exists = false;
        if (head.data == key) {
            head = head.next;
            exists = true;
        }
        while (newtemp.next != null) {
            if (String.valueOf(newtemp.data).equals(
                    String.valueOf(key))) {
                prev.next = next;
                exists = true;
                break;
            }
            prev = newtemp;
            newtemp = newtemp.next;
            next = newtemp.next;
        }
        if (exists == false
            && String.valueOf(newtemp.data).equals(
                String.valueOf(key))) {
            prev.next = null;
            exists = true;
        }
        if (exists) {
            newlength--;
        }
        else {
            System.out.println(
                "The linked list does not contain the given value.");
        }
    }
    void clear()
    {
        head = null;
        newlength = 0;
    }
  // It is the value that determines if the value to be erased is already there or not.
    boolean empty()
    {
        if (head == null) {
            return true;
        }
        return false;
    }
  // Returning the length of Linked List
    int newlength() { return this.newlength; }
// method
    public String toString()
    {
        String S = "{ ";
        node<T> X = head;
        if (X == null)
            return S + " }";
        while (X.next != null) {
            S += String.valueOf(X.data) + " -> ";
            X = X.next;
        }
        S += String.valueOf(X.data);
        return S + " }";
    }
}
}}
```

Go ahead and run the code [here](https://replit.com/@Calvin49/2Implementing-a-Generic-Singly-linked-list-Data-Structure-in).

Output:

```bash
 javac -classpath .:/run_dir/junit-4.12.jar:target/dependency/* -d . Main.java
 java -classpath .:/run_dir/junit-4.12.jar:target/dependency/* Main
>
```

> For the sake of simplicity, we use a dummy node to represent the prior one in singly-linked lists, since going backwards is impossible.
> To represent the node before the current one, we create a dummy node. Because there isn't a previous node for the head node, it is assigned the null value.

Here is an example:

```Java
// Node that has no data in it
        node<T> prev = new node<>(null);
        // head-pointing dummy node
        prev.next = head;
        // The node after the current node that points forward
        node<T> next = head.next;
```

Take advantage of Generics' SinglyLinkedList. `Node<T>` will be the type of node variable. Now that we have covered the basics, let's get down to business by implementing the methods below:
- We'll use add (T data).
- Add the element at the top of the list.
- Add an element to a specific location, use add (T data, int index).

### Testing a Java singly-linked list
Since we have a working linked list implementation, we can construct a test program to view its performance.

```Java
public class Cal {
    public static void main(String[] args)
    {
        // Creating new empty Integer linked list
        list<Integer> list1 = new list<>();
        System.out.println(
            "Created a linked list of integers: List1 :");
        list1.add(10);
        list1.add(20);
        list1.add(30);
        System.out.println(
            "list1 after adding 10,20 and 30 :");
        System.out.println(list1);
        list1.remove(20);
        System.out.println("list1 after removal of 20 :");
        System.out.println(list1);
    // An empty String-linked list is created.
        list<String> list2 = new list<>();
    // displaying message
        System.out.println(
            "\nString LinkedList created as list2");
        list2.add("Hey");
        list2.add("There");
    // displaying message
        System.out.println(
            "list2 after adding hey and There :");
        System.out.println(list2);
        list2.add(2, "Cal");
    // displaying message
        System.out.println(
            "list2 after adding Cal at newposition 2 :");
        System.out.println(list2);
        list<Float> list3 = new list<>();
        System.out.println(
            "\nFloat LinkedList created as list3");
    // Adding elements
        list3.add(10.25f);
        list3.add(10.42f);
        list3.add(10.99f);
        System.out.println(
            "list3 after adding 10.25, 10.42 and 10.99 :");
        System.out.println(list3);
        System.out.println("Clearing list3 :");
    // clearing this list
        list3.clear();
    // displaying the list again
        System.out.println(list3);
    }
}
```

Go ahead and run the code [here](https://replit.com/@Calvin49/Implementing-a-Generic-Singly-linked-list-Data-Structure-in).

Output:

```bash
Created a linked list of integers: List1 :
list1 after adding 10,20 and 30 :
{ 10 -> 20 -> 30 }
list1 after removal of 20 :
{ 10 -> 30 }
String LinkedList created as list2
list2 after adding hey and There :
{ Hey -> There }
list2 after adding Cal at newposition 2 :
{ Hey -> Cal -> There }
Float LinkedList created as list3
list3 after adding 10.25, 10.42 and 10.99 :
{ 10.25 -> 10.42 -> 10.99 }
Clearing list3 :
{  }
```

### Applications of a singly-linked list
A linked list can be used in the following ways:
- Besides representing graphs as adjacent matrices, linked lists can also be used to represent them in a more space-efficient way when compared to an array. O(N2) and O(N) are the memory consumptions for an array and a linked list for a graph with `N` nodes, respectively (N).
- Each bucket of the hash table can be a linked list usually when implementing the hash table.
- Photoshop and Microsoft Word's undo features rely on linked lists.
- In a Linked List, accessing the next element is faster than in an Array. Due to the nature of linked lists, they work well with caches because of their ability to take advantage of the locality of reference.

This brings us to the end of our article on utilizing generics to build a linked list in Java. A circular linked list or a double linked list in Java may be implemented as a follow-up question, depending on the interviewer's taste. As an alternative, you can use them as a coding exercise to improve your skills.

Implementing various linked list methods such as inserting and deleting nodes from the beginning, middle, and end of a linked list is of interest to an interviewer. In addition, sorting and finding elements inside an array of linked lists is also used widely in interviews.

Several code tasks use the linked list in this part, but remember to learn how to create a singly-linked list in Java before moving on.

### Conclusion
The linked list is a standard data structure used in programming and many interview questions focus on linked lists. However, you do not need to create your own linked list to write production code.

Regardless, all these interview questions typically have you to create a linked list in Java to meet the coding challenges presented by the Java API or the JDK. Unless you are confident in your ability to build linked lists, solving issues like reversing a linked list or finding the middle member of a linked list in a single pass would be tough.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)