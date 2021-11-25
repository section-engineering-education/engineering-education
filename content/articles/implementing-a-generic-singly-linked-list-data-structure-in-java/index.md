---
layout: engineering-education
status: publish
published: true
url: /implementing-a-generic-singly-linked-list-data-structure-in-java/
title: Implementing a Generic Singly linked list Data Structure in Java
description: In this article, we will look at how to implement a generic singly linked list data structure in Java.
author: lynn-mumo
date: 2021-11-18T00:00:00-12:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-a-generic-singly-linked-list-data-structure-in-java/hero.jpg
    alt: Implementing a Generic Singly linked list Data Structure in Java Hero Image
---
A `linked list` is used to hold node-based data. Data in a linked list is spread across many locations rather than being stored in a single memory location like in an array. 
<!--more-->
Each node has a reference section where an address of the next node is maintained. The brief linked list has links connecting some of the nodes. 

An array data structure is improved by addressing array obstacles such as the need for contiguous memory and the difficulty of array insertion and deletion. A linked list, on the other hand, makes it simple to add and remove items as your needs change.    

### Table of contents
- [Differences between a linked list and an array](#differences-between-a-linked-list-and-an-array)
- [What a generic linked list is and how it is used](#what-a-generic-linked-list-is-and-how-it-is-used)
  - [Primary linked list member functions](#primary-linked-list-member-functions)
- [Implementation of a Java single-linked list](#implementation-of-a-java-single-linked-list)
- [Conclusion](#conclusion)

### Differences between a linked list and an array
A linked list and an array differ in various ways that are listed below:
1. There is only one memory address for a complete array. Whereas, a linked list stores various elements at different memory locations.
2. A linked list's data items can be added to or removed from at any time, whereas the size of an array's array is specified at the time of declaration. And, cannot be changed afterward.
3. The only place an array can be stored is in a large free block of space due to contiguous allocation, while in a linked list different elements are stored in different locations. So, linked lists can be created in small free space chunks.
4. A linked list uses less space than an array because pointers can be stored close to nodes instead of in the middle of the list.
5. In a linked list, only linear search is performed, but in an array, linear search and binary search are both used.

### What a generic linked list is and how it is used
There are many different ways to create a generic linked list because they can carry any form of data. Implementation of linked lists that may store any data type is known as a generic linked list. Integers are stored in one linked list, while floats are stored in the other.

#### Primary linked list member functions
These are the functions that can be performed on a linked list:
- `Sort` - Sorts the linked list's nodes.
- `Search` - Chooses one of the related nodes and clicks on it.
- `Deletion` - Gets rid of everything that's already there.
- `Insertion` - Extends the linked list by one element.
- `Traversal` - Accesses the connected list's elements one by one.

### Implementation of a Java single-linked list
In this section, we'll explore how generics can be used to implement a singly linked list in a type-safe, parameterized fashion. We will use the Java program below to generate our own type-safe linked list in the Java programming language.

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

			// Topping off the list with an additional, higher-valued node
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
  // Returning the length of LinkedList
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
Go ahead and run the code [here](https://replit.com/@Calvin49/2Implementing-a-Generic-Singly-linked-list-Data-Structure-in)

Output:

```bash
 javac -classpath .:/run_dir/junit-4.12.jar:target/dependency/* -d . Main.java
 java -classpath .:/run_dir/junit-4.12.jar:target/dependency/* Main
>
```

> For the sake of simplicity, we use a dummy node to represent the prior one in singly-linked lists since going backwards is impossible. 

To represent the node before the current one, we create a dummy node. Because there isn't a previous node for the head node, then it's assigned the value null. 

Here is an example:

```Java
// Node that has no data in it
        node<T> prev = new node<>(null);

        // head-pointing dummy node
        prev.next = head;

        // The node after the current node that points forward
        node<T> next = head.next;

```

### Testing a Java singly-linked list
Now that we have a working linked list implementation, we can construct a test program to see how it performs.

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
    // An empty String linked list is created.
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

Go ahead and run the code [here](https://replit.com/@Calvin49/Implementing-a-Generic-Singly-linked-list-Data-Structure-in)

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

This brings us to the end of our article on utilizing Generics to build a linked list in Java. A circular linked list or a double linked list in Java may be implemented as a follow-up question, depending on the interviewer's taste. As an alternative, you can use them as a coding exercise to improve your skills.

For an interviewer, implementing various linked list methods such as inserting and deleting nodes from the beginning, middle, and end of a linked list is of interest. As well as sorting and finding elements inside an array of linked lists.

Several code tasks are using the linked list in this part, but remember to learn how to create a single linked list in Java first before moving on.

### Conclusion
The linked list is a common data structure used in programming and many interview questions focus on linked lists. To write production code, you do not need to put in place your own linked list. 

Nonetheless, all these interview questions demand you to code in Java a linked list to answer the coding challenges provided by the Java API or the JDK. Unless you are confident in your ability to build linked lists, solving issues like reversing a linked list or finding the middle member of a linked list in a single pass would be tough.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
