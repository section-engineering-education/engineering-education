### Adding custom methods for LINQ queries (C#) 
### Introduction
By introducing extension methods to the IEnumerableT> interface, you may expand the set of methods available for LINQ queries. Any data sequence can be converted into one single value by creating your custom aggregate method in SQL Server. 

You can also build a method that returns a new series of values and acts as a custom filter or a specialized data transform for a sequence of variables. 

A few examples include the Distinct and Skip techniques, as well as the Reverse.

You may apply your methods to any enumerable collection when you extend the IEnumerableT> interface. In this article, we shall deeply take a look at various custom methods that are used in LINQ queries in C#.
### Adding an aggregate method
When a set of values is aggregated, a single value can be generated. Average, Min, and Max are just a few of the aggregate techniques available in LINQ. By introducing an extension method to the IEnumerableT> interface, you can design your aggregate method.

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
There is no difference between calling this extension method from the IEnumerableT> interface and calling any other aggregate function.

On a double array, the following code demonstrates using the Median method
```c#
double[] numbers1 = { 0.9, 5, 2, 9.3, 2.6, 7, 3.3, 4 };

var query = numbers1.Median();

Console.WriteLine("double: Median = " + query1);
/*
 The output of the above code is as shown below

 Double: Median = 5.95
*/
```
### An aggregate method is overloaded by accepting a variety of types.
To accept sequences of different types, you can overload your aggregate method. Overloading each type is the typical technique. It's also possible to use a delegate to build an overload for a generic type. Combining both approaches is also an option.
### To build a type overload
A separate overload for each kind you want to support can be created. Here's an int-type overload of the Median method, which you can see in the following code example.
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

An overload of Median's FuncT,TResult> delegate is shown in the following code. An object of generic type T is passed to this delegate, and it returns a double-type object as a result.
```c#
// Let us take a look
public static double Median<T>(this IEnumerable<T> numbersY,
                       Func<T, double> selector) =>
    (from num in numbersY select selector(num)).Median();
```
When working with sequences of objects of any type, you may now use the Median technique. A delegate parameter must be passed in if the type does not have its overload of the procedure. Lambda expressions are available in C# for this purpose. When using Aggregate or Group By clauses instead of a method call, this is only true in Visual Basic.

You can use the following code to call the Median method on a string array as well as an integer array. Using an array of strings, a median is derived for each string's lengths in the array. Use the Median method's delegate parameter for each scenario in the code. Use the Median method's delegate parameter for FuncT, TResult> for each scenario in which it's used.
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
IENumerableT can be extended with custom query methods to return a sequence of values. A collection of IEnumerableT> must be returned in this scenario. Filters or data transformations can be applied to a sequence of values using these methods.

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
### Conclusion
In conclusion, we have looked at how one as a programmer can add custom methods for LINQ queries in c#.