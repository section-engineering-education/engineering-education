A `linked list` is used to hold node-based data. Data in a linked list is spread across multiple locations rather than being stored in a single location in memory like in an array. Each node has a reference section where an address or the address of the next node is maintained.

The brief linked list has links connecting some of the nodes. By removing the challenges of an array, such as the requirement for contiguous memory and the difficulty of array insertion and deletion, an array data structure is improved.
A linked list, on the other hand, makes it simple to add and delete items as your requirements change.
### Table of contents
- [Differences between a linked list and an Array](#differences-between-a-linked-list-and-an-array)
- [What a generic linked list is and how it is used](#what-a-generic-linked-list-is-and-how-it-is-used)
    - [Primary linked list member functions](#primary-linked-list-member-functions)
- [Implementation of a Java single-linked list](#implementation-of-a-java-single-linked-list)
- [Conclusion](#conclusion)
### Differences between a linked list and an Array
A linked list and an Array differ in various ways that you should be aware of. They are listed below:
1. There is only one memory address for a complete array, whereas a linked list stores various elements at different memory locations.
2. A linked list's data items can be added to or removed from at any time, whereas the size of an array's array is specified at the time of declaration and cannot be changed afterward.
3. The only place an array can be stored is in a large free block of space due to contiguous allocation, while in a linked list different elements are stored in different locations, so linked lists can be created in small free space chunks.
4. A linked list uses less space than an array because pointers can be stored close to nodes instead of in the middle of the list.
5. In a linked list, only linear search is performed, however in an array linear search and binary search are both used.

### What a generic linked list is and how it is used
There are many different ways to create a generic linked list because they can carry any form of data. An implementation of linked lists that may store any data type is known as a generic linked list. Integers are stored in one linked list, while floats are stored in the other.
#### Primary linked list member functions
These are functions that can be performed on a linked list:
- Sort: Sort the linked list's nodes.
- Search: choose one of the related nodes and click on it.
- Deletion: gets rid of everything that's already there.
- Insertion: extends the linked list by one element.
- Traversal: access the connected list's individual elements one by one.

### Implementation of a Java single-linked list
In the next section, we'll explore how generics can be used to implement a singly linked list in a type-safe, parameterized fashion. Use this Java program to generate your own type-safe linked list in the Java programming language. It's available for download here.

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

There is something to note here, for the sake of simplicity, we use a dummy node to represent the prior one in Singly Linked Lists since when going backward is impossible. To represent the node before the current one, we create a dummy node. Because there isn't a previous node for the head node, then it's assigned the value null. Here is an example:

```Java
// Node that has no data in it
        node<T> prev = new node<>(null);
 
        // head-pointing dummy node
        prev.next = head;
 
        // The node after the current node that points forward
        node<T> next = head.next;
 
```

### Testing a Java Singly-Linked List
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

OUTPUT:

```bash
 Our Singlylinkedlist contains: Student-->Name-->Class 
length of Our Singlylinkedlist is: 3 
is Our Singlylinkedlist empty? : false 
Our Singlylinkedlist: 202-->404 
length of Our Singlylinkedlist : 2
```

This finishes our look at utilizing Generics to build a linked list in Java. A circular linked list or a double linked list in Java may be implemented as a follow-up question, depending on the interviewer's taste. As an alternative, you can use them as a coding exercise to improve your skills.

For the Interviewer, implementing various linked list methods such as inserting and deleting nodes from the beginning, middle, and end of a linked list, as well as sorting and finding elements inside an array of linked lists is of interest.

There are several code tasks using the linked list in this part, but remember to learn how to create a single linked list in Java first before moving on.

### Conclusion
The linked list is a common data structure used in programming, and many interview questions focus on linked lists. In order to write production code, you do not need to implement your own linked list; nonetheless, all of these interview questions demand you to code in Java a linked list in order to answer the coding challenges provided by the Java API or the Java Development Kit (JDK). Unless you are confident in your ability to build linked lists, solving issues like reversing a linked list or finding the middle member of a linked list in a single pass would be tough.
