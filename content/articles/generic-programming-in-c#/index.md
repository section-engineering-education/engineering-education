
### Introduction

In any modern system, data handling is one of the major and vital goals. The way data is handled is what makes the total difference. Some systems go for generic one which includes lists, dictionaries, and hash.

Others prefer non-generic which are arrays, array lists, and bit arrays. Non- generic programming represents an ordered collection of an object that can be indexed individually. As a matter of fact, generic programming is strongly typed while non- generic programming is not strongly typed, which means generic programming enforces strict rules on blending of values with different data types.

But due to the great advancement of technology in the 21st century, many software systems require to store large groups of entities
rather than individual entry. The concept of non-generic data handling can't fully solve this problem therefore in C#, generic collections are designed to solve this problem. Generic is a class that gives users the ability to define classes and methods with the placeholder.

### Collections
**Collections** according to C# are classes that hold together groups of objects. The `.NET` libraries provide useful system-defined classes, like collection namespace, which provide various collections and their functionalities. The use of non-generic collections is normally discouraged therefore my article fully focuses on generic collections.

We have three common generic collections incorporated in the C# namespace.

## 1. LIST

A list is the most commonly used generic collection. Its because they are much more convenient when they are used instead of an array.
A list is a very general data structure with each entry occupying a specific position known as an index. Lists are very flexible as they automatically resize every time data is added.

Lists are very easy to manipulate. This is because many methods have been created and abstracted, meaning the bulky work is already done for the user. The user only has to call the method and manipulate the list.
 
A list stores data in sequence, although the sequence oughtn't to have to be particular. It can also accept duplicate entries.
Below is a pictorial explanation of a list. A generic list class is declared as shown:

```
public class genericList<T>

{
    
    void add(T input){}
}
```

On the same note, a list can be of integer or string data type. They are declared differently but the syntax is the same as shown:
```
using system;

{
private class genericListExample
static void Main ()
{
    genericlist<int> list1 = new genericlist<int>(); //This declares a  list of type int.
    
     genericlist<string> list2 = new genericlist<string>(); //This declares a list of type string.
     
      genericlist<int> list1 = new genericlist<int>(); //This declares a list of type int.
}
}
```

A simple c# example of generic list implementation might help in understanding.

```
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

Note that _<T>_ is a placeholder for data types and replaced by datatype at compile time.

### 2. Hashsets
This is an implementation of a set. A set is like a big bag of entries with no particular order rather than a list. They are based on the discrete mathematic's idea of a 'set', which is the grouping of entries that can contain one, two, or many distinct items.  Sorting in a hash set is impossible because the entries have to be sorted. Use of a hash set is very much applicable where we have to store a large amount of data that doesn't have to be sorted eg storing the identity of cars passing through an entrance gate. A program example:

```
 using System;
using System.Collections.Generic;
  
class MyHashSet {

    static public void Main()
    {
  
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

* We CANNOT add an object at a specific position since the elements are not in any order.
* We cannot replace an item for the same reason, although we can add and delete another.
* Retrieving all the items is possible but the sequence is indeterminate.
* It's meaningless to find what position an element is or rather to sort.

### 3. Dictionaries
Dictionaries are slightly different from lists and sets because instead of individual objects, they store pairs; a key and a value.
The key contains the address to the pair. The value is the piece of information associated with the key.
Dictionaries have a very wide market application for instance an address book in which keys are people's names, and the values are address, phone, email, etc.
Duplicate keys are not permitted though values are. Also, a dictionary doesn't store items in order, but it can be sorted in order of keys to store a sorted dictionary. A simple program to illustrate:

```
using System;
using System.Collections.Generic;  
  
class MyDictinary {
    static public void Main () {
          
      
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

## Conclusion
In summary, I have explained what are generics in c#, its advantages, and a complete programming example   
I also explained the comparison between generic and non - generic programming where both can add, delete, populate and sort Generic List. Lists, dictionaries, and hash sets are automatically resized every time an item is added or deleted.






