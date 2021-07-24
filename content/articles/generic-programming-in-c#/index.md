Tittle: Generic programming in c#

Description: Collections according to C# are classes that hold together groups of objects. The .NET libraries provide useful system defined classes, like **collection** namespace, which provide various collections and their functionalities.
In this article lists, dictionaries and hashsets collections are worked into and explained in detailed and easily understandable manner.


### Introduction

In any modern system, data handling is one of the major and vital goals. The way data is handled is what makes the total difference. Some systems go for a generic approach which includes the use of lists, dictionaries, and hashset(A type of collection that holds data without any particular order).Others prefer non-generic which are arrays, array lists, and bit arrays.

Non-generic programming represents an ordered collection of an object that can be indexed individually.Note that generic programming is strongly typed while non- generic programming is not strongly typed, which means generic programming enforces strict rules on blending of values with different data types.

But due to the great advancement of technology in the 21st century, many software systems require to store large groups of data. This is more useful than storing individual entries. The concept of non-generic data handling can't fully solve this problem.To solve this problem, C# introduced generic collections. Generic is a class that gives users the ability to define classes and methods with the placeholder.

### Collections
The **Collections** according to C# are classes that hold together groups of objects. The `.NET` libraries provide useful system-defined classes, like collection namespace, which provide various collections and their functionalities. The use of non-generic collections is normally discouraged therefore my article fully focuses on generic collections.

We have three common generic collections incorporated in the C# namespace.

### 1. LIST

A list is the most commonly used generic collection.Its because it's a very advantageous substitute for an array.
A list is a general data structure with each entry occupying a specific position known as an index.They are very flexible as they automatically resize every time data is added.

Lists are very easy to manipulate. They contain many powerful methods that abstract complex work from the user. Manipulating a list is as easy as calling these methods.
 
A list stores data in sequence, although the sequence oughtn't to have to be particular. It can also accept duplicate entries.
Below is a pictorial explanation of a list. A generic list class is declared as shown:

```
c sharp

public class genericList<T>

{
   // Code goes here 
    void add(T input){}
}
```

On the same note, a list can be of integer or string data type. They are declared differently but the syntax is the same as shown:
```
c sharp
using system;

{
private class genericListExample
static void Main ()
{
   // Code goes here 
    genericlist<int> list1 = new genericlist<int>(); // This declares a list of type int.
    
     genericlist<string> list2 = new genericlist<string>(); //This declares a list of type string.
     
      genericlist<int> list1 = new genericlist<int>(); //This declares a list of type int.
}
}
```

A simple implementation of a generic list in c# might help you understand:

```
c sharp
using system;
using system.collection.generic; // A system namespace for implementing generic lists.

namespace GenericListExample
{
    public class Generic<T>  // Declare Generics.
    {
        public void GenFunction(T printvalue)
        {
            Console.WriteLine(printvalue)
        }
    }
    public class program
    {
        public static void Main(string [] args)
        {
         // Code goes here 
            Console.WriteLine("Printing integer value");
            Generic<int> gen = new Generic<int>();
            gen.GenFunction(10);
            
            Console.WriteLine("Printing string value");
            Generic<string> genString = new Generic<string>();
            gen.GenFunction("Hello world");
            
        }
    }
}
```

Note that **<T\>** is a placeholder that is replaced by a data type at compile time.

### 2. Hashsets
This is an implementation of a set. A set is like a big bag of entries with no particular order unlike a list. They are based on the discrete mathematic's idea of a 'set', which is the grouping of entries that can contain one, two, or many distinct items.Sorting in a hash set is impossible because the entries haven't been arranged. Use of a hash set is very much applicable where we have to store a large amount of data that doesn't have to be sorted. Example storing the identity of cars passing through an entrance gate.Here is an example program to help you understand this concept:

```
c sharp
 using System;
using System.Collections.Generic;
  
class MyHashSet {

    static public void Main()
    {
        // code goes here
        // Creating HashSet
     
        HashSet<string> myhash1 = new HashSet<string>();
  
        // Add the elements in HashSet
  
        myhash1.Add("Ndung'u");
        myhash1.Add("Elijah");

        // Creating another HashSet
     
        HashSet<string> myhash2 = new HashSet<string>();
        myhash2.Add("Section");
        myhash2.Add("Git");
   
  
        // Using ExceptWith method
        myhash1.ExceptWith(myhash2);
        foreach(var ele in myhash1)
        {
            Console.WriteLine(ele);
        }
    }
}
```

We note that many operations available for the list are available for hash sets except that:

* We **cannot** add an object at a specific position since the elements are not in any order.
* We cannot replace an item for the same reason, although we can add and delete another.
* Retrieving all the items is possible but the sequence is indeterminate.
* It's meaningless to find what position an element is or rather to sort.

#### 3. Dictionaries
Dictionaries are slightly different from lists and sets because instead of individual objects, they store pairs; a key and a value.
The key contains the address to the pair. The value is the piece of information associated with the key.
Dictionaries have a very wide market application. For instance an address book in which keys are people's names, and the values are address, phone, email, etc.
Duplicate keys are not permitted though values are. Also, a dictionary doesn't store items in order, but it can be sorted in order of keys to store a sorted dictionary. Here is a simple program to illustrate:
```
c sharp
using System;
using System.Collections.Generic;  
  
class MyDictinary {
    static public void Main () {
          // code goes here.
      
        //  Creating a dictionary using Dictionary <TKey,TValue> class
        Dictionary<int, string> My_dict1 = new Dictionary<int, string>(); 
            
          // Adding <key/value> pair in the Dictionary using Add() method
          My_dict1.Add(1123, "Welcome");
          My_dict1.Add(1124, "Hello");
          My_dict1.Add(1125, "World");
            
          foreach(KeyValuePair<int, string> ele1 in My_dict1)
          {
              Console.WriteLine("{0} and {1}", ele1.Key, ele1.Value);
          }
          Console.WriteLine();
            
          // Creating another dictionary
 
      Dictionary<string, string> My_dict2 = new Dictionary<string, string>(){
                                  {"a.1", "CSharp"},
                                  {"a.2", "Java"},
                                {"a.3", "Python"} }; 
           
          foreach(KeyValuePair<string, string> ele2 in My_dict2)
          {
              Console.WriteLine("{0} and {1}", ele2.Key, ele2.Value);
          }
    }
}
```

### Conclusion
In summary, we learned what are generics in c#, its advantages, and gave some example programs to illustrate this. We also went through the difference between generic and non-generic programming where both can add, delete, populate and sort Generic List. Lists, dictionaries, and hash sets are automatically resized every time an item is added or deleted.

With the knowledge of generic programming in c# obtained in this article, you can be able to choose the right collection for data storage. For instance when storing data that that doesn't need to be sorted, one can use a hashset. 





