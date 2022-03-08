---
layout: engineering-education
status: publish
published: true
url: /c-sharp-collections/
title: Introduction to Collections in C#
description: In this article, we will be exploring the C-sharp Collections Framework. We will be looking at the different collection types, and how to use them.
author: geoffrey-mwangi
date: 2021-08-25T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/c-sharp-collections/hero.jpg
   alt: C# Collections hero
---

In C#, we can create and manage related objects in various ways. For example, through the use of [arrays](https://www.tutorialspoint.com/csharp/csharp_arrays.htm) or collections.
<!--more-->
### What are Collections in C#?
A collection is a set of objects of similar type on which we may perform operations such as insert, delete, update, sort, and so on. 

Collections, compared to arrays, are a more efficient method of handling a set of related items or objects.

The goal of this article is to guide you on how to use collections (type) in the C# programming language. 

Collections are commonly used to handle and manage a set of similar data types. Arrays are also used to manage similar types of data, but collections offer additional flexibility when dealing with grouped items of different types.

### Types of collections
C# collections are categorized into 3 main namespaces:
- `System.Collections.Generic classes (Generic)`
- `System.Collections.Concurrent classes (Concurrent)`
- `System.Collections classes (Non-Generic)`

To add elements to a collection, we declare an instance of a class. 

For example, when we are using elements of the same data type, we declare `System.Collections.Generic` namespace which will import all the [required classes](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-5.0).

### System.Collections.Generic classes (Generic)
In case the elements are of the same data type, we use one of the classes in the `System.Collections.Generic` namespace. The generic collection only accepts one data type and no other data type.

The classes provided by the Generic collections include:
- `List`
- `Stack`
- `Queue`
- `LinkedList`
- `HashSet`
- `SortedSet`
- `Dictionary`
- `SortedDictionary`
- `SortedList`

### System.Collections.Concurrent classes (Concurrent)
Concurrent collections are supported in the `.NET` Framework 4 with the `System.Collections.Concurrent` namespace. They help with access to collection objects from several threads.

If many threads need to access a collection at the same time, the concurrent collections should be used instead of non-generic and generic collections.

The classes provided by the concurrent collections include:
- `BlockingCollection`
- `ConcurrentBag`
- `ConcurrentStack`
- `ConcurrentQueue`
- `ConcurrentDictionary`
- `Partitioner`
- `OrderablePartitioner`

### System.Collections classes (Non-Generic)
Unlike the generic collection, non-generic collections accept elements of different data types and utilize the `System.Collections` namespace.

The classes provided by the Non-Generic collections include:
- `ArrayList`
- `Stack`
- `Queue`
- `Hashtable`

Let's look at each one of them:

### ArrayList
Unlike an `Array` which has a fixed size, an `ArrayList` is dynamic. Thus, it does not have a fixed size. An `ArrayList` expands as more elements are added to the collection and can hold elements of different data types.

Let's look at an example of an `ArrayList`.
```cs
using System;
using System.Collections;

class MainClass
{
    public static void Main(string[] args)
    {

        var data = new ArrayList();

        data.Add(" ArrayList"); // adding elements in a collection
        data.Add(221);
        data.Add(23);
        data.Add(new OurArrayList());
        data.Remove(23);

        foreach (object el in data)
        {
            Console.WriteLine(el); // displaying the elements
        }
    }
}

class OurArrayList {}
```
Running the above snippet will display the following:
```bash
ArrayList
221
OurArrayList
```

In the code above, we have created an `ArrayList` and added elements of different data types, that is, `string`, `int`, and a class object.

Here is the code break down:
```cs
using System.Collections;
```

We have used `System.Collections` to utilize the `ArrayList` collection.

```cs
var data = new ArrayList();
```

We've made an `ArrayList` collection.

```cs
data.Add(" ArrayList"); // for adding elements in a collection
data.Add(221);
data.Add(23);
data.Add(new OurArrayList()); // It adds a class 
```

We have used the `Add()` method to add elements to the collection.

```cs
data.Remove(23);
```

Here, we have used the `Remove()` method to remove an element from the collection.

### The Stack
The Stack is a good example of a collection that reflects the idea of "last in, first out". As a result, the last element to enter the queue will be the first to exit. This approach is mostly applied in calculators.

Let's look at an example of a Stack.

```cs
using System;
using System.Collections;

class MainClass
{
    public static void Main(string[] args)
    {

        Stack myStk = new Stack(); // Creating a stack

        // Adding Items to the top most of the stack
        myStk.Push(1); //The Push() method is used to add items to the top most of the stack
        myStk.Push(4);
        myStk.Push(3);
        myStk.Push(6);
        myStk.Push(4);

        Console.WriteLine(myStk.Pop()); // The pop() method removes the top item from the stack and returns it.
        Console.WriteLine(myStk.Peek()); //The Peek() method just returns the items at the top of the list without deleting them.
        Console.WriteLine(myStk.Peek());

        Console.WriteLine();

        foreach (int i in myStk)
        {
            Console.WriteLine(i);
        }
    }
}
```
Running the snippet above will display the following:
```bash
4
6
6

6
3
4
1
```

### The Queue 
The `Queue` is a good example collection that reflects the idea of "first in, first out". As a result, the first element to enter the queue will be the first to exit.

Let's look at an example of a Queue:

```cs
using System;
using System.Collections;

class MainClass
{
    public static void Main(string[] args)
    {
        Queue animals = new Queue();
        animals.Enqueue("Animal 3"); //adds items at the end of the queue
        animals.Enqueue("Animal 4");
        animals.Enqueue("Animal 5");

        Console.WriteLine(animals.Dequeue()); // removes the top item from the queue and returns it.
        Console.WriteLine(animals.Peek());
        Console.WriteLine(animals.Peek());

        Console.WriteLine();

        foreach (string anml in animals)
        {
            Console.WriteLine(anml);
        }
    }
}
```
Running the snippet above will display the following:
```bash
Animal 3
Animal 4
Animal 4

Animal 4
Animal 5
```
### Hashtable
A `Hashtable` is similar to `ArrayList` in that it stores things as a key-value pair.

Let's look at an example of Hashtable.

```cs
using System;
using System.Collections;
class MainClass
{
    public static void Main(string[] args)
    {
        Hashtable ht = new Hashtable();  //Creating a Hashtable
                                         // Adding elements in the Hashtable
        ht.Add("msg", "Message 1");
        ht.Add("car", "BMW");
        ht.Add("ct", "Cat");
        ht.Add("asp", "asp.net");

        foreach (DictionaryEntry d in ht)
        {
            Console.WriteLine(d.Key + " " + d.Value);
        }
    }
}
```
Running the snippet above will display the following:
```bash
car BMW
ct Cat
msg Message 1
asp asp.net
```
The order of the output doesn't matter in this context.

### Conclusion
In this article, we have looked at the basics of the common collections in C#. Collections help to manage a collection of data.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
