---
layout: engineering-education
status: publish
published: true
url: /adding-custom-methods-for-linq-queries/
title: Adding Custom Methods to LINQ Queries in C#
description: This article will explain how to add custom methods to LINQ queries and how to customize LINQ queries. We will develop an application that retrieves JSON data from an API, query the data using the LINQ queries.
author: joshua-wainaina
date: 2021-10-13T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/adding-custom-methods-for-linq-queries/hero.jpg
    alt: Adding custom methods to LINQ queries in C#
---
By introducing extension methods to the IEnumerable interface, you may expand the set of methods available for LINQ queries. For example, you can convert any data sequence into one value by creating your custom aggregate method in SQL Server. 
<!--more-->
You can also build a method that returns a new series of values and acts as a custom filter or a specialized data transform for a sequence of variables. 

### Adding custom methods for LINQ queries (C#) 
### Introduction
A few examples include the Distinct and Skip techniques, as well as the Reverse technique.

You may apply your methods to any enumerable collection when you extend the IEnumerable interface. In this article, we shall look at various custom methods used in LINQ queries in C#.

### Adding an aggregate method
When a set of values is aggregated, a single value can be generated. Average, Min, and Max are just a few of the aggregate techniques available in LINQ. By introducing an extension method to the IEnumerable interface, you can design your aggregate method.

Median is an extension method that computes the median of a sequence of double-valued numbers.
```c#
public static class LINQExtensionExample
{
    public static double Median(this IEnumerable<double>? source)
    {
        if (!(source?.Any() ?? false))
        {
            throw a new InvalidOperationException("A null or empty set cannot be used to compute the median..");
        }

        var sortedList = (from numberX in source
                          orderby numberX
                          select numberX).ToList();

        int itemIndex = sortedList.Count / 2;

        if (sortedList.Count % 2 == 0)
        {
            // Rerurning an even number of objects or items
            return (sortedList[itemIndex] + sortedList[itemIndex - 1]) / 2;
        }
        else
        {
            // Rerurning an odd number of objects or items
            return sortedList[itemIndex];
        }
    }
}
```

There is no difference between calling this extension method from the IEnumerable interface and calling any other aggregate function.

On a double array, the following code demonstrates using the Median method:

```c#
double[] numbers1 = { 0.9, 5, 2, 9.3, 2.6, 7, 3.3, 4 };

var query = numbers1.Median();

Console.WriteLine("double: Median = " + query1);
/*
 The output of the above code is as shown below

 Double: Median = 5.95
*/
```
  
### An aggregate method is overloaded by accepting a variety of types
To accept sequences of different types, you can overload your aggregate method. Overloading each type is the typical technique. However, it's also possible to use a delegate to build an overload for a generic type. Combining both approaches is also an option.
  
### To build a type overload
We can create a separate overload for each kind we want to support. Here's an int-type overload of the Median method, which you can see in the following code example.
  
```c#
//Overload of int
public static double Median(this IEnumerable<int> source) =>
    (from numX in source select (double)numX).Median();
With the new Median overloads available for both integer and double types, the following code shows how to use them:
double[] numbers2 = {  0.9, 5, 2, 9.3, 2.6, 7, 3.3, 4};

var query2 = numbers2.Median();

Console.WriteLine("double: Median = " + query2);

int[] numbers3 = { 14, 16, 15, 13, 11, 10, 9 };

var query3 = numbers3.Median();

Console.WriteLine("int: Median = " + query3);
/*
 Here's what it looks like when it runs:

 The Double part: Median = 5.95
 The Integer part: Median = 13
*/
```

### Initiating a generic overflow
A list of generic objects can also be used as an input to an overload if you want to do that. Delegate is supplied as a variable in this overload which converts the generic objects into a specific type using the delegate.

An overload of Median's Func T, TResult delegate is shown in the following code. An object of generic type T is passed to this delegate, and it returns a double-type object as a result.

```c#
// Let us take a look
public static double Median<T>(this IEnumerable<T> numbersY,
                       Func<T, double> selector) =>
    (from num in numbersY select selector(num)).Median();
```

When working with sequences of objects of any type, you may now use the Median technique. We must pass in a delegate parameter if the type does not have its overload of the procedure. Lambda expressions are available in C# for this purpose. Using Aggregate or Group By clauses instead of a method call is only true in Visual Basic.

You can use the following code to call the Median method on a string array and an integer array. Using an array of strings, a median is derived for each string's lengths in the array. 

Use the Median method's delegate parameter for each scenario in the code. Use the Median method's delegate parameter for FuncT, TResult for each scenario in which it's used.

```c#
int[] numbers4 = { 14, 16, 15, 13, 11, 10, 9 };

/*
   In this case, the compiler will implicitly convert num=>num's value to double when you pass it as a parameter to the Median method.
   Otherwise, the compiler will give the user an error message.
*/
var query4 = numbers4.Median(num => num);

Console.WriteLine("int: Median = " + query3);

string[] numbers5 = { "fourteen", "sixteen", "fifteen", "thirteen", "eleven", "ten", "nine" };

// A number of object properties are available with the generic overload.

var query5 = numbers5.Median(str => str.Length);

Console.WriteLine("String: Median = " + query5);

/*
Here's what it looks like when it runs:
 Integer: Median = 13
 String: Median = 13
*/
```

### Adding a method that returns a sequence
IENumerableT can be extended with custom query methods to return a sequence of values. A collection of IEnumerableT must be returned in this scenario. Filters or data transformations can be applied to a sequence of values using these methods.

Using the AlternateElements Extension Method, every other element in a collection, starting with the first element, is returned.

```c#
//The IEnumerableT> interface has an extension method.
// Every other element in a sequence is returned by the method.
public static IEnumerable<T> AlternateElements<T>(this IEnumerable<T> source)
{
    int y = 3;
    foreach (var element in source)
    {
        if (y % 2 == 1)
        {
            yield return element;
        }
        y++;
    }
}
```

This function can be used to extend any enumerable collection.

```c#
string[] strings = { "u", "v", "w", "x" };

var query4 = strings.AlternateElements();

foreach (var element in query6)
{
    Console.WriteLine(element);
}
/*
Here's what it looks like when it runs:
 u
 w
 
*/
```

As a practical example, let us look at the example below. The example uses JSON to serialize some databases. Then the JArray. Parse will store some data, after which we will then apply JSON to LINQ query to read the data.

```c#
using System;
using System.Linq;
 
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
 
namespace JSON_LINQ_TOJSON
{
class ProgramExample
{
    static void Main(string[] args)
    {
       
        // Here you are going to get the data in JSON serialized form
        
        string WorkersData = JsonConvert.SerializeObject(new WorkersDatabase(),Formatting.Indented);
        
 
        
        // This will convert the JSON string into an array
        JArray workersArray = JArray.Parse(WorkersData);
 
 
    
       // The total number of workers is read
 
        var resWorkers = (from w in workersArray
                           select w["WorkersName"]).ToList();
 
        Console.WriteLine("Only Workers Names");
        foreach (var item in resWorkers)
        {
            Console.WriteLine(item.Value<string>().ToString());
        }
 
        // Then one will get the work or the Job details
        Console.WriteLine();
        var result = (from w in workersArray.Workers()["Job"]
                      select w).ToList();
 
        Console.WriteLine("Job Details");
        foreach (var item in result.Wokers().ToList())
        {
            Console.WriteLine(item.ToObject<Job>().JobId + "\t" + item.ToObject<Job>().JobType);
        }
          Console.ReadLine();
    }
}
}
```

### Conclusion
We have seen how we can make use of LINQ queries in our C# applications. Develop an application that retrieves JSON data from an API, query the data using the LINQ queries.

Happy coding!
  
---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)
