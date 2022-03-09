Customize generic Data structure with Object-Oriented Programming

### Introduction

Java generic is a concept in programming that allows type and method to perform an operation on any variable type or object. Java introduced generic in 2004 to extend the type system of java programming lanuage.

Java generic method and classes allow you to declare a method that could be used to manipulate any data type

The generic data structure is a container that can hold any type of data. This means a class or method can be declared for different types of variables or objects without overloading the method.

### Prerequisites

The prerequisites to follow along in this tutorial, the reader should have the following:
Basic knowledge of Java.
[Java](https://www.oracle.com/java/technologies/downloads/) installed.
Any Java IDE of their choice.
An understanding of collections and their methods.
[Basic understanding of generic](https://www.section.io/engineering-education/getting-started-with-generics-in-java/)

The motivation of generic methods and classes

Method overloading is a concept often used to perform operations that has similar syntax but work on different data types. With the generic concept. The implementation of the algorithm that works with different collection types can be customized. The implementation is type-safe and easy to understand. This means that generic help in implementing a single method that can function with any data type.

Method overloading

```java

public class OverLoadMethod {

public static void printElement(Integer[] inputElement){

for (Integer element: inputElement){

System.out.printf("%s ",element);

}

System.out.println();

}

public static void printElement(Double[] inputElement){

for (Double element: inputElement){

System.out.printf("%s ",element);

}

System.out.println();

}

public static void printElement(Character[] inputElement){

for (Character element: inputElement){

System.out.printf("%s ",element);

}

System.out.println();

}

public static void main(String[] args) {

Integer[] integerElement = {1,2,3,4,5,6};

Double[] doublesElement = {1.0,2.0,3.3,4.2,5.1,6.9};

Character[] charactersElement = {'W','E','L','C','O','M','E'};

System.out.printf("Array integerElement contains: %n");

printElement(integerElement);
System.out.printf("Array doubleElement contains: %n");
printElement(doublesElement);

System.out.printf("Array characterElement contains: %n");

printElement(charactersElement);

}

}```

From the code above, we declare a class called `OverLoadMethod`. The class contain three overloading method of `printElement`. Each method used parameter of type-wrapper of arrays of Integer, Double and Character and return void. In each of the methods, we used an enhanced loop to loop through the array of each method and print the content of the array with a print format. `System.out.println()` is used to print empty lines and give space to the output. `public static void main(String[] args)` declare the main method which serves as the entry point of the code. The method contains array declaration of type-wrapper of Integer, Double and Character. In the main method, the `printElement` method was called perform operation on each array declare.

Note: we could as well use the primitive data type for the operation. Because we operate on generic methods and classes which only reference data types.

Generic Implementation of the Method

```java

public class GenericMethod {

public static <T> void printElement(T[] inputElement){

for (T element: inputElement){

System.out.printf("%s ",element);

}

System.out.println();

}

public static void main(String[] args) {

Integer[] integerElement = {1,2,3,4,5,6};

Double[] doublesElement = {1.0,2.0,3.3,4.2,5.1,6.9};

Character[] charactersElement = {'W','E','L','C','O','M','E'};

System.out.printf("Array integerElement contains: %n");

printElement(integerElement);

System.out.printf("Array doubleElement contains: %n");

printElement(doublesElement);

System.out.printf("Array characterElement contains: %n");

printElement(charactersElement);

}

}

```

We created a class called `GenericMethod`. The class declares a generic method called `printElement` which take the generic type of arrays as a parameter and return void. `for (T element: input element)` the loop through the array to print out each element of the array. `System. out.print("%s ",element)` print each element with print format.

We also create a main method that serves as an entry point for the application. The main method has three arrays of different types of wrappers such as Integer, Double and Character. Each of the arrays is used as an argument to process the `printElement` method.

### Generic Data Structure

The generic data structure is a way of format organizing, retrieving, storing and processing data of any data type in a single structure. This means that the data structure can take in any data type.

In the tutorial, we will be discussing Generic memory Allocation, List, LinkedList, Exception, Stack in different forms, Queue And Tree.

#### Generic Memory Allocation

In creation, usage and maintaining of generic need allocation of memory. This allocation is done dynamically at the time of execution. This is time to store a new node and release the node which is no longer needed by the program. The release of the node which is no longer used by the program is done by Java Automatic Garbage collection. Garbage collection clean object which reference is no longer used in the program. The limit to the memory allocation can be determined by the size of the physical memory or virtual memory of the computer. But because different applications share the memory space available. The memory allocation of the Generic data structure is limited to smaller space.

```java

Node<Integer> newNodeToAdd = new Node<Integer>(10);

```

In the declaration, we allocate Node<Integer> and assign reference to newNodeToAdd.

With the Allocation, if the memory available is low the program throws an exception of `OutOfMemoryError`.

#### Implementing Generic List and LinkedList

```java
class ListNode<T> {

T data;

ListNode<T> nextNode;

public ListNode(T object) {

this(object, null);

}

public ListNode(T object, ListNode<T> node) {

this.data = object;

this.nextNode = node;

}

public T getData() {

return data;

}

public ListNode<T> getNextNode() {

return nextNode;

}

}
```

In the above code, we declare a class called `ListNode`. The class has two variables which are data with type generic and nextNode of generic list. We declare a first constructor which takes the ‘object` parameter of type generic. We also declare another constructor of a two-parameter. Which are `object` and node list, both of type generic. The code has two getter methods which are `getData` and `getNextNode` which both respectively return data and nextNode(List).

#### Implementing list
```java
import excepton.EmptyListException;

public class List<T> {

private ListNode<T> firstNode;

private ListNode<T> lastNode;

private final String name;

public List()

{

this("list");

}

// constructor creates an empty list with a name

public List(String listName)

{

name = listName;

firstNode = lastNode = null;

}

public void addToTheFront(T insertItem){

if (isEmpty()){

firstNode = lastNode = new ListNode<T>(insertItem);

} else firstNode = new ListNode<>(insertItem, firstNode);

}

public void addToTheBack(T insertItem) {

if (isEmpty()){

firstNode = lastNode = new ListNode<T>(insertItem);}

else lastNode = lastNode.nextNode = new ListNode<>(insertItem);

}

public T removeFromFront() throws EmptyListException

{

if (isEmpty()){

throw new EmptyListException(name);

}

T removedItem = firstNode.data;

if (firstNode == lastNode)

firstNode = lastNode = null;

else

firstNode = firstNode.nextNode;

return removedItem;

}

public T removeFromBack() throws EmptyListException {

if (isEmpty()){

throw new EmptyListException(name);

}

T removeItem = firstNode.data;

if (firstNode==lastNode){

firstNode=lastNode=null;

}else{

firstNode = firstNode.nextNode;

}

return removeItem;

}

public void print() {

if (isEmpty()){

System.out.printf("Empty %s%n", name);

}

System.out.printf("This %s is: ", name);

ListNode<T> current = firstNode;

while(current !=null){

System.out.printf("%s ", current.data);

current = current.nextNode;

}

System.out.println();

}

boolean isEmpty() {

return firstNode==null;

}

}
```

From the code above the class imports exceptions from the customised exception class. Next, we declare a class List with type holder <T>. The class contain three instance variable. Two of the variable are List variable which reference ListNode(firstNode And lastNode) and the last variable is of type string. The code has two constructors, which are the no-argument constructor and one-argument constructor. we also declare six methods that perform different tasks and functions.

The first method `addToTheFront` take one parameter of a generic object and return void. We check if the list is empty `if (isEmpty())`. `firstNode = lastNode = new ListNode<T>(insertItem)` we assign the reference of the first last node to the first node and the lastNode both hold reference to a new ListNode object. And if the list is not empty, we assign the reference of new ListNode to firstNode. This action is perform with this expression `else firstNode = new ListNode<>(insertItem, firstNode);`.

The second method `addToTheBack` take one parameter of a generic object and return void. We check if the list is empty `if (isEmpty())`. `firstNode = lastNode = new ListNode<T>(insertItem);` we assign the reference of the lastnode.nextNode to lastNode and the lastnode.nextNode hold reference to a new ListNode object. And if the list is not empty, we assign the reference of new ListNode. This is done with this expression `else firsstNode = new ListNode<>(insertItem, firstNode);`. The third and fourth methods are removeFromFront and removeFromBack respectively. Both methods have similar functions and working details but were repeated for the clarity of the reader.

The method returns a type of generic. The method checks if the list is empty and throws exceptions. The methods declare a new variable of type generic and assign firstNode.data to it. The code checks if the first and last node is the same both nodes should be null. if it is not empty firstNode.nextNode should be assigned firstNode and return the remove removeItem.

The fifth method checks if the list is not empty and prints the elements of the list. The last method is a predicate method to check if the list is empty. This method returns true or false.

#### Implementing List Test

List Test is a class that allows us to test and debug our code by creating an object of the List generic class. Using the object to perform different tasks and actions. The class served as the entry point of our code with the help of the main method.
```java
import excepton.EmptyListException;

public class ListTest {

public static void main(String[] args) {

List<Integer> list = new List<>();

list.addToTheFront(0);

list.print();

list.addToTheFront(2);

list.print();

list.addToTheBack(-1);

list.print();

list.addToTheBack(1);

list.print();

try{

int removedItem = list.removeFromFront();

System.out.printf("%n%d removed%n", removedItem);

list.print();

removedItem = list.removeFromFront();

System.out.printf("%n%d removed%n", removedItem);

list.print();

removedItem = list.removeFromBack();

System.out.printf("%n%d removed%n", removedItem);

list.print();

removedItem = list.removeFromBack();

System.out.printf("%n%d removed%n", removedItem);

list.print();

} catch (EmptyListException e) {

e.printStackTrace();

}

}

}
```

ListTest main method create list<Integer> object from the generic List<T> class. And start by adding elements to the list by using a list object to call the two `list.addToTheFront();` and `list.addToTheBack();` which was explain above. Using `list.print()` to print space between the list element. The method contains a try and catch block that declares int variable removeItem. `list.removeFromFront()` and list.removeFromBack()` to remove item from front and back . `System.out.printf("%n%d removed%n", removedItem)` the method uses string formatting in printing out the result. `catch (EmptyListException e) { e.printStackTrace();}`. This method used custumize exception in catch the error or abnormality of the system.

### stack Data Structure

Stack is a sequence data collection that uses the LIFO principle in the manipulation of data. LIFO means Last In First Out, this process gives higher priority to the last in element. This is also called FILO(First In Last Out) approach. Stack is an abstract data type structure that only allows a way to add and removing of elements from the stack.

#### Stack Basic operation

Push() - Adding or storing elements in the collection.

Pop() - removing or de-initilizing element in the collection.

Peek() - checking the last element in the collection.

isFull()- check if the stack is full.

isEmpty() - check if the stack is empty.

Implementing Stack Data Structure

In this tutorial, stack implementation will be explained in two major object-oriented ways. There are inheritance and composition.

#### Implementing Stack Data Structure with Inheritance
```java
import excepton.EmptyListException;

public class StackInheritance<T> extends List<T> {

public StackInheritance() {

super("stack");

}

public StackInheritance(String listName) {

super(listName);

}

public void push(T insertItem){

super.addToTheBack(insertItem);

}

public T pop() throws EmptyListException {

return super.removeFromFront();

}

@Override

public void print() {

super.print();

}

@Override

boolean isEmpty() {

return super.isEmpty();

}

}
```
From the above code, `import exceptions.EmptyListException`. This declaration is used to import from our customise exception class. Class `StackInheritance<T> extends List<T>` was created to inherit from List<T> class. This class inherit two constructors from the parent. The two constructors are the no-argument constructor and One argument constructor. The no-argument constructor `public StackInheritance() {super("stack");}` take a string "stack". Also the One argument constructor takes in one argument of String listName. The class has four methods, two of the method is declared and two is overridden. The declared method Push and pop both call the superclass method addToTheBack and removeFromTheBack . The overridden method print() and isEmpty() also call the superclass method print() and isEmpty() .

#### Stack Inheritance Test
```java
import excepton.EmptyListException;

public class StackInheritanceTest {

public static void main(String[] args) {

StackInheritance<Integer> stack = new StackInheritance<>();

stack.push(-1);

stack.print();

stack.push(0);

stack.print();

stack.push(5);

stack.print();

stack.push(1);

stack.print();

try

{

int removedItem;

while (true)

{

removedItem = stack.pop(); // use pop method

System.out.printf("%n%d popped%n", removedItem);

stack.print();

}

}

catch (EmptyListException emptyListException)

{

emptyListException.printStackTrace();

}

}

}
```
ListTest class import exception from the customise exception class. The class has a main method that serves as the entry point of the program to the JVM. the class create a new stack object from the stackInherientance class. The object type is an Integer type wrapper, which represents an object integer.

The stack object call method from StackInherientance, which is `push()` and print(). The method contains a try and catch block that declares int variable removeItem. `removedItem = stack.pop();` the method assign element of `stack.pop()` to removeItem variable

#### Stack Implementation with composition
```java
import excepton.EmptyListException;

public class StackComposition<T>{

private final List<T> stackList;

public StackComposition() {

stackList = new List<T>("stack");

}

public void push(T object)

{

stackList.addToTheFront(object);

}

public T pop() throws EmptyListException

{

return stackList.removeFromFront();

}

public boolean isEmpty()

{

return stackList.isEmpty();

}

public void print()

{

stackList.print();

}

}
```
From the above code, `import exceptions.EmptyListException`. This declaration was used to import from our customise exception class. Class `StackComposition<T> compose List<T>` class. This class inherit a constructor which is a no-argument constructor. The no-argument constructor `public StackComposition() {super("stack");}` take a string stack. The class has four declared methods. The declared method push and pop both call methods from List<T> addToTheBack and removeFromTheBack . The method print() and isEmpty() also call the method print() and isEmpty() of the List<T> class respectively.

#### Stack Inheritance Test
```java
import excepton.EmptyListException;

public class StackInheritanceTest {

public static void main(String[] args) {

StackInheritance<Integer> stack = new StackInheritance<>();

stack.push(-1);

stack.print();

stack.push(0);

stack.print();

stack.push(5);

stack.print();

stack.push(1);

stack.print();

try

{

int removedItem;

while (true)

{

removedItem = stack.pop(); // use pop method

System.out.printf("%n%d popped%n", removedItem);

stack.print();

}

}

catch (EmptyListException emptyListException)

{

emptyListException.printStackTrace();

}

}

}
```
`StackInheritanceTest` class imports exception from the customise exception class. The class has a main method that serves as the entry point of the program to the JVM. the class create a new stack object from the `stackComposition` class. The object type is an Integer type wrapper, which represents an object integer.

The stack object call method from StackComposition, which is `push()` and print(). The method contains a try and catch block that declares int variable removeItem. `removedItem = stack.pop();` the method assign element of `stack.pop()` to removeItem variable

### Queue Data Structure

The Queue collection is a data structure that uses the FIFO(first-in-first-out) principle in the collection, arranging or organising of data. This principle only allows elements to be added from the back of the data structure and the removing of elements in the data structure is only possible from the front. That is, the first element that enters the queue is the first element that leaves the queue.

#### Basic Operations of Queue

A queue is an object (an abstract data structure - ADT) that allows the following operations:

Enqueue: Add an element or object to the end of the queue

Dequeue: Remove or delete an element from the front of the queue

IsEmpty: Check if the queue is empty

IsFull: Check if the queue is full

Peek: Get the value of the front of the queue without deleting the element

#### Implementing Queue
```java
import excepton.EmptyListException;

public class Queue<T> {

private final List<T> queueList;

public Queue()

{

queueList = new List<T>("queue");

}

public void enqueue(T object){

queueList.addToTheBack(object);

}

public T dequeue() throws EmptyListException {

return queueList.removeFromFront();

}

public boolean isEmpty(){

return queueList.isEmpty();

}

public void print(){

queueList.print();

}

}
```
The class above imports `exceptions` from the custom exception class. The class has a constructor with no argument. The class also declares four methods enqueue(), dequeue(), isEmpty() and print(). Each function has a reference to the List<T> class by calling appropriate methods in the List<T> class. The first method ` public void enqueue(T object)` takes an argument object with Type generic. This method returns void and the method uses List<T> reference and calls the List<T> method `addToTheBack(object)` which types in argument objects. `public T dequeue() throws EmptyListException` . This method returns a generic data type and throws an exception to take care of the unplanned event. The method reference object is called List<T> method removeFromFront(), to remove an element from the front. The other two methods isEmpty() and print() both calling methods of reference object which is, isEmpty() and print() respectively. public boolean isEmpty() this method is called a predicate method. It returns only the boolean type while public void print() returns void.

#### Queue Testing
```java
import excepton.EmptyListException;

public class QueueTest {

public static void main(String[] args) {

Queue<Integer> queue = new Queue<>();

queue.enqueue(-1);

queue.print();

queue.enqueue(0);

queue.print();

queue.enqueue(1);

queue.print();

queue.enqueue(5);

queue.print();

try

{

int removedItem;

while (true)

{

removedItem = queue.dequeue(); // use dequeue method

System.out.printf("%n%d dequeued%n", removedItem);

queue.print();

}

}

catch (EmptyListException emptyListException)

{

emptyListException.printStackTrace();

}

}

}
```
QueueTest class imports exceptions from the customized exception class. The class has a main method that serves as the entry point of the program to the JVM. the class creates a new stack object from the `Queue` class. The object type is an Integer type wrapper, which represents an object integer.

The stack object call method from Queue, which is `enqueue()` and print(). The enqueue method is used to add elements to the queue. The method contains a try and catch block that declares int variable removeItem. `removedItem = queue.dequeue;` the method assigns an element of `queue.dequeue` to removeItem variable. The dequeue method is used to remove or dequeue elements from the queue

### TREE Data Structure

A tree data structure is a non-linear, recursive two-dimensional collection with special properties. In tree data structure each node consists of data and references to a list of nodes. Unlike other data structures e.g arrays, Linked List, Stack and queue which are linear data and store data sequentially. In tree data structure each node element is connected by an edge of another element.

#### Terminology in Tree Data Structure

Path- Path is a list of sequence nodes along the edge of the tree.

Root - is the first node along any path. Each tree contained only one root at the top

Parent - any that has a node upward is except the root

Child - the node that is connected to a parent node downward is called chard node

Leaf - Leaf is a node that has no child node

Subtree- subtree is a node that consists of a node descendant.

Visiting- visiting means checking the value of a node when the node is active

Traversing- moving through the node in a particular order.

Level - refer to the generation that a node belongs to.

Keys- Key is a value of node on which search operation is based on.

The basic operation of Tree

Insert - insert an element in a tree

Search - Searching for element in a tree

Preorder Traversal- walking through a tree in a pre-order manner

Postorder Traversal- walking through a tree in a post-order manner

Inorder Traversal- walking through a tree in an orderly manner

![generic Tree](./generic_tree.png)

### Implementing a Generic Tree

In the implementation of tree data structure with generic. We separate the implementation into two classes which are TreeNode and Tree. The TreeNode declare only one method which is inserted () method while TreeNode name method for tree basic operations.

#### Implementing TreeNode class

// class TreeNode definition
```java
class TreeNode<T extends Comparable<T>>{

// package access members

TreeNode<T> leftNode;

T data; // node value

TreeNode<T> rightNode;

// constructor initializes data and makes this a leaf node

public TreeNode(T nodeData){

data = nodeData;

leftNode = rightNode = null; // node has no children

}

// locate insertion point and insert new node; ignore duplicate values

public void insert(T insertValue){

// insert in the left subtree

if (insertValue.compareTo(data) < 0){

// insert new TreeNode

if (leftNode == null){

leftNode = new TreeNode<>(insertValue);

}else { // continue traversing left subtree recursively

leftNode.insert(insertValue);

}

// insert in the right subtree

}else if (insertValue.compareTo(data) > 0){

// insert new TreeNode

if (rightNode == null){

rightNode = new TreeNode<>(insertValue);

}else{ // continue traversing right subtree recursively

rightNode.insert(insertValue);

}

}

}

}
```
From the code above, class `TreeNode` was declared as a package identifier. We declare three instance variables which two are references to TreeNode. `data` as the third variable with generic type T. We have a constructor that set `data` variable to `nodeData`. The constructor also set firstNode and lastNode to null with this expression `leftNode = rightNode = null;`. This means that the node has no children at setting time. We create a method `insert`. This method used comparable interface to check if the insert value is  data. We check if the leftNode is null. Using the expression to insert new value `leftNode = new TreeNode<>(insertValue)`. And if the leftNode is not null, we continue to element to the left using this leftNode.insert(insertValue).

#### Implementing Tree class
```java
public class Tree<T extends Comparable<T>> {
   private TreeNode<T> root;

   public Tree()
   {
       root = null;
   }
   // inserting a new node in the search tree
   public void insertNode(T insertValue){
       if (root == null)
           root = new TreeNode<T>(insertValue); // create root node
       else
           root.insert(insertValue); // call the insert method
   }
   // begin preorder traversal
   public void preorderTraversal()
   {
       preorderHelper(root);
   }
   // recursive method to perform preorder traversal
   private void preorderHelper(TreeNode<T> node) {
       if (node == null)
           return;
       System.out.printf("%s ", node.data); // output node data
       preorderHelper(node.leftNode); // traverse left subtree
       preorderHelper(node.rightNode); // traverse right subtree
   }
   // begin inorder traversal
   public void inorderTraversal()
   {
       inorderHelper(root);
   }
   // recursive method to perform inorder traversal
   private void inorderHelper(TreeNode<T> node)
   {
       if (node == null)
           return;
       inorderHelper(node.leftNode); // traverse left subtree
       System.out.printf("%s ", node.data); // output node data
       inorderHelper(node.rightNode); // traverse right subtree
   }
   // begin postorder traversal
   public void postorderTraversal()
   {
       postorderHelper(root);
   }
   // recursive method to perform postorder traversal
   private void postorderHelper(TreeNode<T> node)
   {
       if (node == null)
           return;
       postorderHelper(node.leftNode); // traverse left subtree
       postorderHelper(node.rightNode); // traverse right subtree
       System.out.printf("%s ", node.data); // output node data

   }
} // end class Tree
```



We declare a class called Tree which extends a comparable method. We also declare a private variable of root with reference to TreeNode class. We declare a constructor and the Constructor initializes the node with the null value. We declare a method insertNode which take a parameter of insertValue. The parameter is of type generic. The method checks if the root is null on initialization. If the root is null, new TreeNode<T>(insertValue) is assign to the root. If the root is not null root.insert(insertValue). We declear six other methods three of which make a recursive call to itself, using it to traverse to left or right as the case may be. The three methods are preorderHelper, inorderHelper and postorderHelper. The other three methods are called to reference the last three respectively.

### Conclusion
In this article, we learn about how to customize data structure with generic  and we discussed the motivation of generic, overloading of generic, memory allocation and control in generic. We also explained different data structure and their implementation in generic. The data structure discussed are as follow List and LinkedList, Stack, Queue and tree. We also Make sure all implementations are explained in detail.

Generic in Java is an important part of the programming language giving you the power to manipulate data of different data types.

The code for this project is available on the Github repo.


### References
- [Java version 16 documentation on stream](http://https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/stream/package-summary.html)
- Java - How to Program 10th Ed - Early Objects Version by Pual Deitel and Harvey Deitel
- Introduction to Java Programming, Comprehensive Version by Y. Daniel Liang of Armstrong Atlantic State University