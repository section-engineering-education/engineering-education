---
layout: engineering-education
status: publish
published: true
url: /language-integrated-query-in-c-sharp/
title: Getting started with LINQ in C#
description: In this tutorial we will learn how to use language integrated queries to perform native queries in C#
author: amos-njoroge
date: 2021-09-29T00:00:00-23:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/language-integrated-query-in-c-sharp/hero.jpg
    alt: Getting started with LINQ in C# example image
---

The term `Language-Integrated Query` (LINQ) refers to a group of technologies that incorporate query capabilities directly into the C# programming language. Querying data has traditionally been plain text, with no type checking or IntelliSense assistance at build time. 
<!--more-->
LINQ access data from objects, data sets, SQL Server, and XML, among other things.

### Project setup
1. Open Visual studio, select `New Project` on the start window.
2. On the `Create a new project` window, enter or type the console in the search box. Next, choose C# from the Language list, and then select Windows from the Platform list.
3. In the `Configure your new project window`, type LinqProject in the Project name box. Then, choose Create.

### Generating sequences with LINQ
Consider a collection of cards. A set of cards used in various games usually comprises four suites, each with thirteen values. Typically, we would consider starting with a Card class and manually filling a compilation of those cards objects. 

With LINQ, one can see a long text with fewer words than we can with the traditional way of generating a pack of playing cards. A class called `Card` may be initiated, but Suits and rankings are represented by sequence. We will write a pair of straightforward iterator methods to generate the rankings and suits as `IEnumerable<T>s` of strings.
  
```c#
using System;
using System.Collections.Generics;
using System.Linq;
static IEnumerable<String> Suits()
{
    yield returns "diamonds";
    yield returns "hearts";
    yield returns "spades";
    yield returns "clubs";
}
static IEnumerable<string> Ranks()
{
    yield returns "seven";
    yield returns "eight";
    yield returns "ten";
    yield returns "nine"; 
    yield returns "six";
    yield returns "five";
    yield returns "four";
    yield returns "three"; 
    yield returns "two";
    yield returns "king";
    yield returns "ace";
    yield returns "jack";
    yield returns "queen";
}
```
The order of the generated sequences is crucial to achieving our goals. 

The first element in the first source sequence (Suits) is related to every element in the second series (Ranks). As a result, all thirteen cards of the first suit are created. The initial sequence's elements are all treated to the same method (Suits). The final product is a park of playing cards arranged by suit, then by value.

```c#
static void Main(string[] args)
{
    var initialPart=from s in Suitx()
                     from r in Ranky()
                     select new { Suitx=s,Ranky=r};
    foreach(var card in initialPart)
    {
        Console.WriteLine("card");
    }                 
                    
}
```
In `Program.cs` file, add the code snippet above after the Main method. 

Both of these methods use the yield return syntax to generate a sequence as they execute. The compiler creates an object that implements `IEnumerableT>` and generates the specified sequence of strings.
  
### Changing the order of Suits
Think about how we would mix the cards in the deck. Splitting the deck in half is the first step in any decent shuffle. This capability is provided by the LINQ APIs' `Take` and `Skip` functions.
  
```c#
public static void Main(string[] args)
{
    var initialPart = from s in Suits()
                       from r in Ranks()
                       select new { Suit = s, Rank = r };

    foreach (var x in initialPart)
    {
        Console.WriteLine(x);
    }
    var top = initialPart .Take(26);
    var bottom = initialPart.Skip(26);
}
```
However, the standard library does not have a shuffle method. Therefore, we will develop our own. Because the shuffle method we will be writing demonstrates various strategies we will use with LINQ-based programming. We will break down each step.

We will need to create extension methods to extend how we can work with the IEnumerable returned by LINQ queries. In a nutshell, an extension method is a static method with a specific purpose that adds additional functionality to an existing type without needing the original type to be changed.
```c#
using System;
using System.Collections.Generic;
using System.Linq;

namespace myShuffle
{
    public static class Extension1
    {
        public static IEnumerable<T> InterleaveSequenceWith<T>(this IEnumerablex<T> FirstInLine, IEnumerablex<T> NextInLine)
        {
             // Your code shall be written here
        }
    }
}
```
### Identifying the difference between an eager and a lazy evaluation.
**Lazy evaluation** means that each call to the iterator only processes a single element from the source collection. Depending on the circumstances, an iterator can be a custom class, a `foreach`, or a while loop.
  
```c#
public static class Fibonacci
{
    public static IEnumerable<long> Series()
    {
        long prevX1 = 1;
        long prevX2 = 1;

        yield return prevX1;

        yield return prevX2;

        while(true)
        {
            long temp = prevX1 + prevX2;
            prevX1 = prevX2;
            prevX2 = temp;
            yield return temp;
        }
    }
}
```
**Eager evaluation** is the evaluation method used by most conventional programming languages.
  ```c#
IEnumerable<int> myMethod()
{
    for(int i=0; i <=900; i++)
    {
        yield return I;
    }
}
...

var ex = myMethod.Take(2);
var list = ex.ToList();
```
The yield keyword allows the collection to be evaluated gradually. **Eager evaluation** is the process of forcing the entire collection into memory. When we call ToList, `ToDictionary`, or ToArray, the enumeration is evaluated immediately, and all elements are returned in a collection.
                         
The sample we created above performs an out shuffle, with the top and bottom cards remaining unchanged on every run. Let us make one alteration. Instead of an out shuffle, we will employ an in the shuffle, in which all 52 cards shift positions. 

As a result, the top half's final card becomes the bottom half's final card. Switch the Take and Skip locations in the current shuffle query to update it. The top and bottom half of the deck will now be in reverse order.
                         
```c#
shuffle = shuffle.Skip(26).InterleaveSequenceWith(shuffle.Take(26));
```
Once we execute the program, we will note that the deck takes 52 iterations to reshuffle itself. Several factors contribute to this. 

First, we may address one of the critical causes of this reduction in performance which is the inefficient, lazy evaluation. Note that we used a LINQ query to create the original deck. 

The three queries of LINQ on the previous deck are used to generate each shuffle. All of this occurs at a glacial speed. When we reach the fifty-second iteration, we will have regenerated the initial deck several times, i.e. more than once. Let us make a log to show how this works. Then we will take care of it.
                         
Copy the method below into our `Extensions.cs` file. This extension method creates a new file named.log in our project directory and logs the query that is presently being run. We can use this extension method to indicate the completion of a query.
                         
```c#
public static IEnumerable<T> LogQuery<T>
    (this IEnumerable<T> sequence, string x)
{
   
    using (var program = File.AppendText("debug.log"))
    {
        program.WriteLine($"Executing Query {x}");
    }

    return sequence;
}
```
In the above code, do not forget to add the input-output extension so that the program will execute.
```c#
using System.IO;
```
### Conclusion
In conclusion, we have got to see some working functionalities of the LINQ in C# and how to implement them in a program or solve real-life problems.
  
---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)
