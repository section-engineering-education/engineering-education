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

By removing the challenges of an array, such as the need for contiguous memory and the difficulty of array insertion and deletion, an array data structure is improved. A linked list, but, makes it simple to add and delete items as your requirements change.    

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
These are functions that can be performed on a linked list:
- `Sort` - Sorts the linked list's nodes.
- `Search` - Chooses one of the related nodes and clicks on it.
- `Deletion` - Gets rid of everything that's already there.
- `Insertion` - Extends the linked list by one element.
- `Traversal` - Accesses the connected list's elements one by one.

### Implementation of a Java single-linked list
In this section, we'll explore how generics can be used to implement a singly linked list in a type-safe, parameterized fashion. We will use the Java program below to generate our own type-safe linked list in the Java programming language.

```Java
public class NewnewSinglyLinkedList {
// first will be the first node in our New newSinglyLinkedList
// Generic node instance
    private Node first;

    public boolean isEmpty(){
        return length() == 0;
        }
        /// Parameterized constructor to assign value
         public void append(T data){
             if(first == null){
                 // Storing value of node
                 first = new Node(data);
                 return;
                 }
                 // Storing address of next node
                 tail().next = new Node(data);
         }
         private Node tail() {
             Node tail = first;
             while(tail.next != null){
                 tail = tail.next;
                 }
                 return tail;
                 }


    @Override
    public String toString(){
        StringBuilder newStringBuilder = new StringBuilder();
        Node ourCurrentNode = first;
        // // If list already exists
        while(ourCurrentNode != null){
            newStringBuilder.append(ourCurrentNode).append("--&gt;");
            // Iterating till end of the List
            ourCurrentNode = ourCurrentNode.next;
            }
            if(newStringBuilder.length() &amp;gt;=5){
                newStringBuilder.delete(newStringBuilder.length() - 5, newStringBuilder.length());
                }
                return newStringBuilder.toString();
                }

    public int length() {
         int length = 0;
         Node ourCurrentNode = first;
         // It will Start counting from our first node
         while(ourCurrentNode != null){
             // Increasing length after adding new node
             length ++;
             ourCurrentNode = ourCurrentNode.next;
             }
              return length;
        }

        private static class Node {
            private Node next;
             private T data;
             // Adding new valued node at the end of the list
             public Node(T data) {
                 this.data = data;
                  }

    @Override
    public String toString() {
        return data.toString();
        }
    }
}
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
public class NewLinkedListTest {
     public static void main(String args[]) {

           SinglyLinkedList newSinglyLinkedList = new SinglyLinkedList();
           newSinglyLinkedList.append("Student");
           newSinglyLinkedList.append("Name");
           newSinglyLinkedList.append("Class");
        // Displaying elements message only
           System.out.println(" Our Singlylinkedlist contains: " + newSinglyLinkedList);
           // Displaying  length message only
           System.out.println("length of Our Singlylinkedlist is: " + newSinglyLinkedList.length());
           // Displaying message if Our Singlylinkedlist empty
           System.out.println("is Our Singlylinkedlist empty? : " + newSinglyLinkedList.isEmpty());

           newSinglyLinkedList iList = new newSinglyLinkedList();
           //iList.append("one"); i.e compilation error

           // Attempting to insert a String into an integer list
           iList.append(202);
           iList.append(404);
           // Displaying message
           System.out.println("Our Singlylinkedlist : " + iList);
           System.out.println("length of Our Singlylinkedlist : " + iList.length());
    }
}
```

Output:

```bash
 Our Singlylinkedlist contains: Student-->Name-->Class
length of Our Singlylinkedlist is: 3
is Our Singlylinkedlist empty? : false
Our Singlylinkedlist: 202-->404
length of Our Singlylinkedlist : 2
```

This brings us to the end of article on utilizing Generics to build a linked list in Java. A circular linked list or a double linked list in Java may be implemented as a follow-up question, depending on the interviewer's taste. As an alternative, you can use them as a coding exercise to improve your skills.

For an interviewer, implementing various linked list methods such as inserting and deleting nodes from the beginning, middle, and end of a linked list is of interest. As well as sorting and finding elements inside an array of linked lists.

Several code tasks are using the linked list in this part, but remember to learn how to create a single linked list in Java first before moving on.

### Conclusion
The linked list is a common data structure used in programming and many interview questions focus on linked lists. To write production code, you do not need to put in place your own linked list. 

Nonetheless, all these interview questions demand you to code in Java a linked list to answer the coding challenges provided by the Java API or the JDK. Unless you are confident in your ability to build linked lists, solving issues like reversing a linked list or finding the middle member of a linked list in a single pass would be tough.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
