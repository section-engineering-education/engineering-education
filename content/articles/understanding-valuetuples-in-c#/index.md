### Introduction.
ValueTuple is used to return several values from a method. Since these components are mutable, you can assign new values to them after they've been declared.
 
ValueTuple is available only in C# version `7.0` (.NET Framework 4.7). If in your project you don't see ValueTuple, it means that you have to install the ValueTuple package.

### Creating and initializing ValueTuple.
You can create value tuples using the followig ways:
 
1. Using a constructor.

The following code allows one to create a ValueTuple using a constructor. We will use the constructor to generate two elements.

```C#
  class constructorExample
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
  
The use of parenthesis is the simplest way of creating and initializing a ValueTuple.This is because you will specify values within the parenthesis. 

Example of using parenthesis with named members:

```c#
class Paranthesis {
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

### Accessing ValueTuple named and unnamed members.
Unnamed ValueTuple members are members that are named with the default item property names. You can access these members using their default names.

Example.
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
    OUTPUT
    Year:2020
    Patient: Michael Williams
    Country: Tanzania

We will first assign names to the value tuple properties. Then we will access the valuable named members. Below is a snippet of a code showing how to assign the name
```C#
 var student = (Student_id : 4567, Student_name : "Mary Kims",Course: "Computer Science");
```
Now that you have assigned new names let us access the members. You will use the new names that you have assigned to the members instead of using the default name. As shown in the code snippet below
```C#
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
    OUTPUT
    Student id:4567
    Student Name: Mary Kims
    Course: Computer Technology

### Returning ValueTuple from a method.
You can return multiple values from a method. In the example below you are not going to use the ref or out parameters.

```C#
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
    OUTPUT
    Student Information
    Id:55
    Name:Robert
    Age:25
    Course:Computer Science

### ValueTuple deconstruction.
Individual members can be obtained by deconstructing a ValueTuple. A deconstruction declaration syntax deconstructs a ValueTuple and assigns each component to a new variable. 

In C#, there are numerous ways to deconstruct the ValueTuple object's elements and assign them to local variables. 

To create a discrete variable for each element in the tuple, we can use the parenthesis () to specify the type of each element.

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
        OUTPUT 
        Personal Information
        Id:2795
        Name:Michelle Williams
        Age:35    


### ValueTuple structure.
Value tuple structure has static methods that enable you to create value tuple types with upto 8 components. Value tuple structure has helper methods that allow you to create value tuples without defining the type of each component. 
 
Methods
 
- CompareTo()

This method is used to compare a value tuple instances. Since value tuple instances do not have elements when two instances are compared, they are considered to be equal.

- Equals()

In the Equals() there is Equals(ValueTuple) and Equals (object). This methods apply to several products like .NET and .NET Framework

1.Equals(ValueTuple) is used to find out wheteher two value tuple instances are equivalent.

2.Equals(object) is used to determine whether the value tuple instance currently in use is equivalent to a certain object. If it finds that the object is equivalent to the value tuple instance it returns True and if not it returns False

- GetHashCode()

This method is used to return the harsh code( is a value used in identifying an object during equivalence testing) of a valuetuple instance.This methods returns a zero

- ToString ()

This method is used to return the representation of a string of a value tuple instance. This method applies to .NET, .NET Core, .NET Framework and lastly .NET Standard

- Create() 

This method is used to create a new value tuple that has zero components.


Create<T1,>(T1);
This method creates a new value tuple that has one component where <T1> is the type of the first value tuple and (T1) is the value of the first value tuple component.

Create<T1, T2>(T1, T2);

 This method creates a new value tuple that has two components where <T2,> is the type of the second value tuple and (T2) is the value of the second value tuple component.

Create<T1, T2, T3>(T1, T2, T3); 

This method creates a new value tuple that has three components  where <T3,> is the type of the third value tuple and (T3) is the value of the third value tuple component.

Create<T1, T2, T3, T4>(T1, T2, T3, T4);

This method creates a new value tuple that has four components  where <T4,> is the type of the forth value tuple and (T4) is the value of the forth value tuple component.

Create<T1, T2, T3, T4, T5>(T1, T2, T3, T4, T5); 

This method creates a new value tuple that has five components  where <T5,> is the type of the fifth value tuple and (T2) is the value of the fifth value tuple component. 

Create<T1, T2, T3, T4, T5, T6>(T1, T2, T3, T4, T5, T6);

This method creates a new value tuple that has six components where <T6,> is the type of the sixth value tuple and (T6) is the value of the sixth value tuple component. 

Create<T1, T2, T3, T4, T5, T6, T7>(T1, T2, T3, T4, T5, T6, T7);

This method creates a new value tuple that has seven components  where <T7,> is the type of the seventh value tuple and (T7) is the value of the seventh value tuple component. 

Create<T1, T2, T3, T4, T5, T6, T7, T8>(T1, T2, T3, T4, T5, T6, T7, T8); 

This method creates a new value tuple which has eight components where <T8,> is the type of the eighth value tuple and (T8) is the value of the eighth value tuple component.

    NB
    You use the value tuple<T1, T2, T3, T4, T5, T6, T7, TRest>, constructor, when you want to create a value tuples that have more than 8 components.

### Conclusion.
In summary, we have learned; 
- How to create and initialize value tuple.
- How to access value tuple named and unnamed members.
- How to return value tuple from a method.
- ValueTuple deconstruction.
- ValueTuple structure.

We have also learned that value tuples have a simplified syntax and perform better than Tuples. They also can alter data members and give them meaningful names. Therefore we can say that it is best to use value tuples.

