### Collections in Java

Before the collection framework was introduced, a popular way of grouping objects was `Arrays`, `Vectors`, etc. The only disadvantage of all the collections mentioned above is that they had no common interface. When implementing these collections, they have to be defined independently. Also, it posed a challenge to developers since it was challenging to recall methods, syntax, and constructors present in every class.

This, therefore, called for the introduction of the `Collection Framework`. The developer can now easily access any interface without having to know the code written or the classes involved.
Let us now take a look at how all the above mentioned happens with collection in java

We will be looking at how collection in java was achieved before and after the Collection Framework was introduced which happens to be with JDK 1.2. You can also see it as a collection in java before and after JDK 1.2.

#### Introduction

A set of objects put together to act as a single unit is known as **collection**.

For Clarity, a `Framework` is a platform that contains code libraries, a compiler, etc. A framework makes the developers' work easier by providing the libraries for this case the collection library.

But what is an Interface? -
An `Interface` is a system where related or unrelated entities can interact.
For our case, the collection of objects created will have to interact with the library of existing classes. This can be achieved successfully through the interfaces availed by the JDK.

Some of the common interfaces for the java collection classes include:
- `java.util.Collection`- which is the collection interface.
- `java.util.Map` - This is the Map interface.

#### Implementing Arrays, Vectors

Before Java Framework come into place, grouping java objects was achieved by the use of Arrays, Vectors, or Hashtables. The above collections had no common interface. This made it harder for the collection to be implemented as a unit.
Let us take a look at how the collections mentioned above were implemented with the absence of Java Framework.

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


### Methods of the Collection Interface
Now we are going to take a look at some major methods used in the collection interface.

`add(Object)` - This is a method that adds an object into the collection.


`contains(Object O)` - The output for this is true if a certain object is contained in the collection and false for the vice versa. It mostly deals outputs boolean.

`equals(Object O)` - The method mentioned compares a certain object with the collection to ensure equality.


`isEmpty()` - This method also returns a boolean. It outputs true if the collection has an element specified.


`toArray()` - This method converts the elements in the collection into array.

`size()` - This method checks the size of the elements in a collection.

`max()` - This returns the maximum value in a collection/

`removeIf(Predicate filter)` - This method removes elements in a collection that satisfies a specified predicate.

### Hierarchy of Collection Framework
The collection framework has an interface known as **iterable interface**. The iterable interface serves to provide the iterator that iterates through all the collections. This interface also acts as the root for the collection framework. All the other collections in the tree extend the collection interface this means that they extend all the properties of the iterator.

Below is a diagrammatic representation of the Hierarchy of the collection framework.

![Hierarchy](/engineering-education/collection-in-java/hierarchy.png)

From the diagram, we have seen above. The collection hierarchy diagram consists of `interfaces` and `classes`. The interfaces extend other interfaces in the tree towards the root of the tree which is the `Iterable interface`. Classes on the other hand implement the interfaces linked to them.

Let's now take a look at the interfaces individually.

1. **Iterable Interface**

This is the baseline interface in the hierarchy tree. It contains the methods that can be called by any of the classes in the hierarchy tree. 

It can be implemented as shown below.
```java
Iterator<T> iterator()  
```

2. **Collection Interface**

You can consider the collection framework as the heart to where the collection framework form. This is because the collection interface declares the methods that every class must-have.

Method in the collection framework include:  `clear()`, `add()`, `size()`.

3. **list Interface**

This is a sub-class of the collection interface. This type of interface deals with data of the type list. The list interface can be implemented via different classes as listed below. The classes include `Arraylist`, `Linkedlist`, `Vector`, `Stack`.

```java
List <data-type> arrayList = new ArrayList<> ();
List <data-type> linkedList = new LinkedList<> ();
List <data-type> stack = new Stack<> ();
List <data-type> vector = new Vector<> ();
// Where data-type is the type in the collection.
```

4. **Array List**

The class helps when dealing with dynamic arrays.

A `dynamic array` is the array whose size is unpredictable since it keeps adding up. Other arrays, usually have a static size where you have to state the number of elements to be stored. The dynamic array on the other hand supports automatic resizing.

We'll now use a code snippet to understand how the array list achieves automatic resizing.

```java
import java.util.ArrayList;
import java.util.Iterator;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        //Creating an arraylist
        
        names.add("Kolbe");
        names.add("Kimosop");
        names.add("Baker");
        //Adding elements/objects into the array

        Iterator itr = names.iterator();

        while (itr.hasNext()) {
            System.out.println(itr.next());

        }
    }
}
```
```bash
Kolbe
Kimosop
Baker
//Output
```

From the above example, as you have noted, we have imported methods from the class Arraylist and the Interface the Iterator. We have utilized the commands:

- `import java.util.ArrayList;`
- `import java.util.Iterator;`

In the main method, we did not have to write the entire code to perform a specific action. We just called it after importing their respective classes.
An example of a method we only had to call is the `hasNext()` method. We only had to call it from the Iterator interface. We achieved so by creating an object of the iterator `Iterator itr = names.iterator();` and used the object to call the Iterator interface.

5. **Queue and Deque**

`Queue` interface follows the first-in-first-out(FIFO) policy. In the Queue interface, we only add elements from one side.

`Deque` interface on the other hand extends the Queue interface. **Deque** stands for Double-Ended-Queue. Unlike Queue, you can add elements from any end.

Below is how to instantiate Queue:
```java
Queue<String> q1 = new PriorityQueue();  
Queue<String> q2 = new ArrayDeque();  
```


We can instantiate Deque as follows:
```java
Deque dq = new ArrayDeque();  
```

6. **Set**

A **set** is a collection of unordered objects where a duplicate is not stored. When we want to avoid duplication and aim to store objects uniquely, we use a set interface.
Below are some of the classes of the set interface.
`Hashset`, `Treeset`, `LinkedHashSet`, etc.

Below is a syntax to instantiate the set.
```java
Set<data-type> set1 = new HashSet<data-type>();  
Set<data-type> set2 = new LinkedHashSet<data-type>();  
Set<data-type> set3 = new TreeSet<data-type>();  
```

7. **Hashset**

It is used with a collection that uses a hash table for storage. The elements inserted into the hashcode are saved according to the elements' hash code.
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

```bash
//Output
Lebron
for
Lakers
is
```

### Summary
In this tutorial, we have been able to cover the following.
1. Introduced and Understood Collection.
2. Implementation of Arrays and Vectors.
3. Methods in the Collection Interface.
4. Hierarchy of Collection Framework
5. Interfaces
   - Iterable Interface.
   - Collection Interface
      - List
      - Queue and Deque
      - Set
6. Classes
      - Array List
      - Hash set.
