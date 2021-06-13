### Enums and Constants
Sometimes, a developer can find this confusing because Enums and Constants tend to do the same work but, is there any major difference between them?. When should we use enums instead of constants and vice versa?

 ### Constants
A constant is a variable of any data type that won't change the value throughout the program while Enums are user-defined of a specific data type that can be changed.
 ### Enums
In C# language, `enum`  (also called enumeration) is a user-defined value type used to represent a list of named integer constants. It is created using the `enum` keyword inside a class, structure, or namespace. It improves a program's readability, maintainability and reduces complexity.

**Syntax**

The basic syntax of declaring an `enum` is:
```cs
enum enum_name {
   enumeration list 
};
```
- **enum_name** is the name you want to give to your enum list.
- **NB:** We use comma(,) to separate the items in the enumeration list.

**Example**

For example, January, February, March, May, and June are months of the year. Therefore, this becomes an enumeration with the name year and January, February, March, May, and June as its elements.
```cs
enum year
{
    // items of the enum
    January,
    February,
    March,
    April,
    May,
    June 
} 
```

### Enum Values
If we do not assign values to the `enum` items, the items are assigned an integer value by the compiler by default starting from 0. The first item will be assigned 0 and increment by one each time we add an item.
```cs
enum year
{
    // items of the enum
    January,    //0
    February,   //1
    March,      //2
    April,      //3
    May,        //4
    June        //5
} 
```
### Assigning our values
We can change the values to the enum item. If we change a value to one of the months e.g March to 10. Then the compiler will assign the others sequentially i.e it will increment by one from 10:
```cs
enum year
{
    // items of the enum
    January,    //0
    February,   //1
    March,      //10
    April,      //11
    May,        //12
    June        //13
} 
```

### Access an Enum
We access an `enum` item using the **dot** syntax:
```cs
enum year
{
    // items of the enum
    January,
    February,
    March,
    April,
    May,
    June  
}

Console.WriteLine(year.January); // January
Console.WriteLine(WeekDays.February); // February
Console.WriteLine(WeekDays.March); // March
Console.WriteLine(WeekDays.April); // April
Console.WriteLine(WeekDays.May); // May
Console.WriteLine(WeekDays.June); // June
```
### Convert an enum to an Integer
We need to [Explicitly convert](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/types/casting-and-type-conversions) an item in the `enum` to get an integer value.

**Example**

Let's look at a program to illustrate how to convert the items to an integral value:

```cs
using System;
namespace EnumerationExample {

enum year
{
  
    // items of the enum
    January,
    February,
    March,
    April,
    May,
    June
  
}
  
class Program {

    static void Main(string[] args)
    {
          
        // Printing out the integer values of the items
        Console.WriteLine("The value of January in year " + "enum is " + (int)year.January);
        Console.WriteLine("The value of February in year " + "enum is " + (int)year.February);
        Console.WriteLine("The value of March in year " + "enum is " + (int)year.March);
        Console.WriteLine("The value of April in year " + "enum is " + (int)year.April);
        Console.WriteLine("The value of May in year " + "enum is " + (int)year.May);
        Console.WriteLine("The value of June in year " + "enum is " + (int)year.June);
    }
}
}
```
When we compile and execute our code, we get our output as:
```bash
The value of January in year enum is 0
The value of February in year enum is 1
The value of March in year enum is 2
The value of April in year enum is 3
The value of May in year enum is 4
The value of June in year enum is 5
```
From the above program, we have not specified a value to the items, the compiler assigns January 0 and starts to increment by one, gives February 1, and so on. 

### Convert an enum to a String
We use the `ToString()` method to convert an enum to a string.

**Example**

Let's look at an example of how we can convert an enum item to a string:
```cs
//Convert an enum item to string  
Console.WriteLine(year.January.ToString());  
Console.WriteLine(year.February.ToString());  
Console.WriteLine(year.March.ToString()); 
```
### Interesting facts and rules about the initialization of enum.
1. We can assign one value to two `enum` names.

**Example**
```cs
enum color
{
    Blue = 1,
    Green = 1,
    Yellow = 2
}
```
2. The compiler assigns values to the enum items if we fail to assign them. The first item is assigned 0 and the compiler increments by one.
3. We can only assign integral values to the enum names. We should not assign strings as values.

### Conclusion
In this article, we have looked at what are enums and how to apply them in our programs. We have seen that constants are used for declaring a single value while in enums, we can represent a a list of items in one enum. We can now easily use enums to represent a list of named integer constants.
