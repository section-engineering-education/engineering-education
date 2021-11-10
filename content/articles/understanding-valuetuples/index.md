---
layout: engineering-education
status: publish
published: true
url: /understanding-valuetuples/
title: Understanding ValueTuples in C#
description: This article will help the reader understand how to implement ValueTuples in C#. These components allow one to group unrelated data values.
author: michelle-ngei
date: 2021-11-10T00:00:00-02:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-valuetuples/hero.jpg
    alt: ValueTuples in C# Hero Image
---
ValueTuples are used to return several values from a method. Since these components are mutable, you can assign new values to them after they have been declared.
<!--more-->
ValueTuples are available only in C# version `7.0` (.NET Framework 4.7). If you don't see ValueTuple in your project, it means that you have to install the `ValueTuple` package.

### Creating and initializing ValueTuples
You can create ValueTuples using the following methods:
 
1. Using a constructor.

The following code allows one to create a ValueTuple using a constructor. We will use this component to generate two elements.

```C#
  class ConstructorExample
{
    static public void Main()
    {
     ValueTuple<string, string,> valueTuple =
      new ValueTuple<string,string,>("Name", "School",);  
    }
} 
```

2. Using the `create` method.

This method can generate a ValueTuple with up to `8` elements using the `create` method.

Example:

```C#
class Create{
  
     static public void Main()
    {
        //  0-ValueTuple using Create() Method
        var valueTuple0 = ValueTuple.Create();
  
        // 2-ValueTuple using Create(T1, T2,) Method
        var valueTuple3 = ValueTuple.Create(12, 30, 40,);
    }
}
``` 

3. Using parenthesis.
  
The use of parenthesis is the simplest way of creating and initializing a ValueTuple. This is because you will specify values within the parenthesis. 

Example of using parenthesis with named members:

```c#
class Parenthesis {
    static public void Main()
    {  //  named members
        (int age, string Name, string Lang) student = (23, "Sonia", "C#");
    }
}
```

Example of using parenthesis with unnamed members:

```C#
class Parenthesis {
    static public void Main()
    {
            //unnamed member
       ValueTuple<string, string > student = ("Mark", "C#");
    }
}
```

### Accessing ValueTuple named and unnamed members
Unnamed ValueTuple members have default item property names. In other words, you can access these members using their default names.

Example:

```C#
    class Unnamed
    {
        public static void Main()
        {
            var patient = (2020, "Michael Williams", "Tanzania");
            Console.WriteLine("Year:" + patient.Item1);
            Console.WriteLine("Patient:" + patient.Item2);
            Console.WriteLine("Country:" + patient.Item3);
        }
    }
```
Output:
```bash
Year:2020
Patient: Michael Williams
Country: Tanzania
```

We will first assign names to the ValueTuple properties. Then we will access the named members. The following code shows how to assign names:

```c#
 var student = (Student_id : 4567, Student_name : "Mary Kims",Course: "Computer Science");
```

Now that we have assigned new names, let's access the members. 

We will use the new names that we assigned to the members instead of the default name, as shown below:

```c#
 class Program {
  
    static public void Main()
    {
       var student = (Student_id : 4567, Student_name : "Mary Kims",Course: "Computer Technology");
      
        Console.WriteLine("Student id: {0}", student.Student_id); 
        Console.WriteLine("Student Name: {0}", student.Student_name);
        Console.WriteLine("Course: {0}", student.Course);
    }
}
```
Output:
```bash
Student id:4567
Student Name: Mary Kims
Course: Computer Technology
```

### Returning ValueTuple from a method
We can return multiple values from a method. In the example below, we will not use the `ref` or `out` parameters.

```c#
class Returntype
    {
        public static void Main()
        {
            var student = GetStudentInformation();
            Console.WriteLine("Student Information");
            Console.WriteLine("Id :{0}", student.Item1);
            Console.WriteLine("Name:{0}", student.Item2);
            Console.WriteLine("Age:{0}", student.Item3);
            Console.WriteLine("Course:{0}", student.Item4);
            Console.ReadLine();
        }
        public static (int, string, int, string) GetStudentInformation()
        {
            var student = (55, "Robert", 25, "Computer Science");
            return student;
        }
    }
```
Output:
```bash
Student Information
Id:55
Name:Robert
Age:25
Course:Computer Science
```

### ValueTuple deconstruction
Individual members can be obtained by deconstructing a ValueTuple. A deconstruction declaration syntax assigns each component to a new variable. 

In C#, there are numerous ways to deconstruct a ValueTuple's elements and assign them to local variables. 

To create a discrete variable for each element, we can use the `parenthesis()` method to specify each element's type.

```C#
 class deconstruction
    {
        static void Main(string[] args)
        {
            var (Idnumber, Name, Age) = GetPersonalInformation();
            Console.WriteLine("Personal Information");
            Console.WriteLine("Idnumber:{0}", Idnumber);
            Console.WriteLine("Name:{0}", Name);
            Console.WriteLine("Age:{0}", Age);
            Console.ReadLine();
        }
        public static (int, string, int) GetPersonalInformation()
        {
            return (2795, "Michelle Williams", 35);
        }
    }
}
``` 
Output:
```bash
Personal Information
Id:2795
Name:Michelle Williams
Age:35  
```  

### ValueTuple structure
A ValueTuple structure has static methods that enable you to create values with up to `8` components. 

It also has helper methods that allow one to create elements without defining the type of each component. 
 
**Methods:**
 
- `CompareTo()`

This method is used to compare ValueTuples' instances. Since these instances do not have elements, they are considered to be equal.

- `Equals()`

The commonly applied functions are `Equals(ValueTuple)` and `Equals(object)`. These methods apply to several products like `.NET` Framework

1. `Equals(ValueTuple)` is used to determine whether two ValueTuple instances are equivalent.

2. `Equals(object)` is used to determine whether the ValueTuple instance currently in use is equivalent to a specific object. 

- GetHashCode()

This method is used to return the hash code of a ValueTuple instance. 

- ToString ()

This function returns a string representation of a ValueTuple instance. It applies to .`NET`, `.NET Core`, `.NET` framework.

- Create() 

This function is used to create a ValueTuple that has zero components.

- Create<T1,>(T1);

This method creates a ValueTuple that has one component (a singleton) where "T1" is the type of the first ValueTuple.

- Create<T1, T2>(T1, T2);

 This function creates a new ValueTuple that has two components (a pair) where "T2" is the type of the second ValueTuple.

### Conclusion
In this tutorial, we have learned:
- How to create and initialize ValueTuples.
- How to access ValueTuple named and unnamed members.
- How to return ValueTuple from a method.

You can, therefore, use this knowledge to build other quality applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
