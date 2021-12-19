### Collections in Java

Before the collection framework was introduced, a popular way of grouping objects was `Arrays`, `Vectors`, etc. The only disadvantage of all the collections mentioned above is that they had no common interface. When implementing these collections, they have to be defined independently. Also, it posed a challenge to developers since it was challenging to recall methods, syntax, and constructors present in every class.

This, therefore, called for the introduction of the `Collection Framework`. The developer can now easily access any interface without having to know the code written or the classes involved.
Let us now take a look at how all the above mentioned happens with collection in java


#### Introduction

**Collection in java** is a way of organizing data, to make it easier to store, access, and edit the data.

A framework, on the other hand, makes the developers' work easier by providing the code libraries for this case the collection library.

But what is an Interface? -
An `Interface` is a system where related or unrelated entities can interact.
For our case, the collection of objects created will have to interact with the library of existing classes. This can be achieved successfully through the interfaces availed by the JDK.

Examples of interfaces include:
- `java.util.Collection`- which is the collection interface.
- `java.util.Map` - This is the Map interface.

#### Implementing Arrays, Vectors

In the early technological time before the collection framework, organizing data was achieved through arrays, vectors, etc. The above collections had no common interface. This made it harder for the collection to be implemented as a unit.
Let us take a look at how the collections mentioned above were implemented with the absence of a collection Framework.

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


`contains(Object O)` - The output for this is true if a certain object is contained in the collection and false for the vice versa. It mostly deals with boolean outputs.

`equals(Object O)` - The method mentioned compares a certain object with the collection to ensure equality.


`isEmpty()` - This method also returns a boolean. It outputs true if the collection has an element specified.


`toArray()` - This method converts the elements in the collection into an array.

`size()` - This method checks the size of the elements in a collection.

`max()` - This returns the maximum value in a collection/

`removeIf(Predicate filter)` - This method removes elements in a collection that satisfies a specified predicate.

#### Diagramatic representation of the Collection Framework
The collection framework can be categorized into interfaces and classes.
On top of the hierarchy stands the iterable interface. This interface acts as a root for all the other interfaces and classes since they all extend this class.

Below the Iterable interface is the collection interface which contains different interfaces such as list, queue, deque, set, etc.

Every interface has different classes that serve different purposes as shown below:

![Hierarchy](/engineering-education/collection-in-java/hierarchy.png)

From the diagram, we have seen above. The collection hierarchy diagram consists of `interfaces` and `classes`. The interfaces extend other interfaces in the tree towards the root of the tree which is the `Iterable interface`. 


Let's now take a look at the interfaces individually.

1. **Iterable Interface**

This is the baseline interface in the hierarchy tree. It contains the methods that can be called by any of the classes in the hierarchy tree. 

It can be implemented as shown below.
```
Iterator<T> iterator()  
```

2. **Collection Interface**

You can consider the collection framework as the heart to where the collection framework form since method declaration of all classes happens here.

Method in the collection framework include:  `clear()`, `add()`, `size()`.

3. **Array List**

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
```
//Output
Kolbe
Bryant
Isles
```

From the above example, as you have noted, we have imported methods from the class Arraylist and the Interface the Iterator. We have utilized the commands:

- `import java.util.ArrayList;`
- `import java.util.Iterator;`

In the main method, we did not have to write the entire code to perform a specific action. We just called it after importing their respective classes.
An example of a method we only had to call is the `hasNext()` method. We only had to call it from the Iterator interface. We achieved so by creating an object of the iterator `Iterator itr = names.iterator();` and used the object to call the Iterator interface.

4. **Set**

When we want to avoid duplication and aim to store objects uniquely, we use a **set interface**.
Below are some of the classes of the set interface.
`HashSet`, `Tree set`, `LinkedHashSet`, etc.

Below is a syntax to instantiate the set.
```
Set<data-type> set1 = new HashSet<data-type>();  
Set<data-type> set2 = new TreeSet<data-type>();  
```

5. **Hashset**

The example below will help us understand HashSet better.

```
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

```
//Output
Lebron
for
Lakers
is
```
 We have first instantiated the HashSet class. This automatically imports methods in the HashSet class and Iterator interface.
 You can then now add names easily to the HashSet by calling the `hashset.add` method.
 Lastly, instantiate the Iterator interface to import all its methods and decide a way you would want to output the names.


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