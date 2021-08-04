---
layout: engineering-education
status: publish
published: true
url: /generic-programming-in-csharp/
title: Generic Programming in C#
description: This tutorial will guide you on how to deal with generic collections in C#. Some of the generic collections that will be discussed include lists, dictionaries, and hashsets.
author: elijah-ndungu
date: 2021-08-04T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/generic-programming-in-csharp/hero.jpg
    alt: generic programming in csharp example image
---
Collections in C# are classes that hold together groups of objects. The .NET libraries provide useful system-defined classes that provide various collections and functionalities.
<!--more-->
### Goal
In this article, we will discuss generic collections, which include lists, dictionaries, and hashsets.

### Introduction
In any modern system, data handling is one of the major goals. Developers deal with data in a variety of ways.

Some systems go for a generic approach which includes the use of lists, dictionaries, and hashset. Other languages prefer non-generic collections which are arrays, arraylists, and bit arrays.

Non-generic programming represents an ordered collection of an object that can be indexed individually.

> Note that generic programming is strongly typed while non-generic programming is not. This means that generic programming enforces strict rules on handling different data types.

Today, software systems handle large amounts of data. This is more useful than storing individual entries. However, it is much more difficult to process all this data. C# introduced generic collections to help solve this problem. 

`Generic classes` give users the ability to define `classes` and `methods` with the placeholder.

### Understanding collections
In C#, `collections` are classes that hold together groups of objects. 

The `.NET` libraries provide useful system-defined classes such as collection namespace that provide different functionalities.

The three common generic collections in the C# namespace are discussed below:

### 1. List
A list is the most commonly used generic collection. It's an excellent substitute for an array.

A list is a general data structure with each entry occupying a specific position known as an index. Lists are flexible since they can automatically resize every time data is added.

Another advantage of lists is that they are easy to manipulate. They contain numerous powerful methods that abstract complex work from the user. 
 
A list stores data in sequence but can also accept duplicate entries.

A generic list class in C# is declared, as shown below:

```c#
public class genericList<T>

{
   // Code goes here 
    void add(T input){}
}
```

Lists can store different data types which include integers and strings, as highlighted below:

```c#
using System;
using System.collection.generic; // A system namespace for implementing generic lists.

private class genericListExample static void Main () {
   
    GenericList<int> list1 = new GenericList<int>(); // This declares a list of type int.
    
    GenericList<string> list2 = new GenericList<string>(); //This declares a list of type string.
     
}

```

Here is a simple implementation of a generic list in c#:

```c#
using System;
using System.Collections.Generic; // A system namespace for implementing generic lists.

namespace GenericListExample
{
    public class Generic<T>  // Declare Generics.
    {
        public void GenFunction(T printvalue)
        {
            Console.WriteLine(printvalue);
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
            genString.GenFunction("hallo there");
            
        }
    }
}
```

> Note that `Generic<T>` is a placeholder that is replaced by a specific data type at compile time.

### 2. Hashsets
Unlike lists, sets store data or entries in no particular order. 

Hashsets are based on the discrete mathematic's idea of a 'set', which is the grouping of entries that contain one, two, or many distinct items. 

We use hashset when dealing with a large amount of unsorted data. Sorting in a hash set is impossible because entries do not have specific indexes.

Here is a program to help you understand hashsets:

```c#
using System;
using System.Collections.Generic;
  
public class MyHashSet {

    static public void Main(){
        // code goes here
        // Creating HashSet
     
        HashSet<string> myhash1 = new HashSet<string>();
  
        // Add the elements in HashSet
  
        myhash1.Add("Chemistry");
        myhash1.Add("Maths");

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

Hashsets do not support the following operations:
- Adding an object at a specific position.
- Replacing an item at a particular index.
- Retrieving all items is possible but the sequence is indeterminate.

### 3. Dictionaries
Dictionaries are slightly different from lists and sets because instead of individual objects, they store data in pairs; a `key` and a `value`.

The `key` contains the address to the pair while the `value` stores the required information.

Dictionaries have a wide application. For instance, an address book can use `keys` as people's names, and `values` as the address, phone, email, or other contact details.

Duplicate keys are not permitted in dictionaries. A huge advantage of dictionaries is that they store unordered items which can be sorted using their unique keys. 

Here is a simple program to help you understand dictionaries:

```c#
using System;
using System.Collections.Generic;  
  
public class MyDictinary {
    static public void Main () {
          // code goes here.
      
        //  Creating a dictionary using Dictionary <TKey,TValue> class
        Dictionary<int, string> My_dict1 = new Dictionary<int, string>(); 
            
          // Adding <key/value> pair in the Dictionary using Add() method
          My_dict1.Add(1123, "Welcome");
          My_dict1.Add(1124, "Hello");
          My_dict1.Add(1125, "World");
            
          foreach(KeyValuePair<int, string> ele1 in My_dict1){
              Console.WriteLine("{0} and {1}", ele1.Key, ele1.Value);
          }
          Console.WriteLine();
            
          // Creating another dictionary
 
      Dictionary<string, string> My_dict2 = new Dictionary<string, string>(){
                                  {"a.1", "CSharp"},
                                  {"a.2", "Java"},
                                {"a.3", "Python"} }; 
           
          foreach(KeyValuePair<string, string> ele2 in My_dict2){
              Console.WriteLine("{0} and {1}", ele2.Key, ele2.Value);
          }
    }
}
```

### Conclusion
In this tutorial, we have learned generic collections in C#, as well as their advantages. Some of the discussed collections are lists, dictionaries, and hashsets. 

You can, therefore, use this knowledge to build powerful C# applications.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)