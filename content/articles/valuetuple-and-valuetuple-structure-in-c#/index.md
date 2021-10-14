### Introduction.
 ValueTuple is a lightweight type that may be used to return several values from a method.   As value tuples are mutable, you can assign new values to their components after they've been declared.
 
 ValueTuple is available only in C# 7.0 (.NET Framework 4.7). If in your project you don't see Value tuple it means you have to install the Value tuple package.
 ### Creating and initializing ValueTuple.
 Using the following ways, you can create value tuples;
 
- Use of a constructor.

 Below is a code for using a constructor to create a value tuple. We are going to be using the constructor for creating two elements
  ```C#
  class Constructor
{
    static public void Main()
    {// ValueTuple with two element
     ValueTuple<string, string,> valueTuple =
      new ValueTuple<string,string,>("Name", "School",);  
    }
} 
  ```
- Use of the create method.

 To create ValueTuple using the create method, you are going to use the Create a static method. This method can create ValueTuple with up to 8 elements as shown in the code snippet below 
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
  - Use of parenthesis.

 The use of parenthesis is the simplest way of creating and initializing a ValueTuple.This is because you will specify the values within the parenthesis. As shown below.
Example of using parenthesis with named members ;

```c#
  class Paranthesis {
    static public void Main()
    {  //  named members
        (int age, string Name, string Lang) student = (23, "Sonia", "C#");
    }
}
```
Example of using parenthesis with unnamed members ;
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
Unnamed ValueTuple members are those that are named with the default item property names, such as Item1, Item2. To access these members you are going to use the default names as shown in the code snippet below 
```C#
class Program {
  
    // Main Method
    static public void Main()
    {
        // ValueTuple with 2 elements
        var student = (20, "Tuby");
        // Using default Item property
        Console.WriteLine("Age:" + student.Item1);
        Console.WriteLine("Name:" + student.Item2);
    }
}
```
    OUTPUT
    Age:20
    Name:Tuby

We will first assign names to the value tuple properties. Then we will access the valuable named members. Below is a snippet of a code showing how to assign the name
```C#
 var student = (Student_id : 4567, Student_name : "Mary Kims",Course: "Computer Science");
```
After assigning the name now you are going to access the ValueTuple named member. You will use the new names that you have assigned to it instead of using the default name. As shown in the code snippet below
```C#
 class Program {
  
    static public void Main()
    {
      // ValueTuple with 3 elements
       var student = (Student_id : 4567, Student_name : "Mary Kims",Course: "Computer Technology");
      // Accessing the ValueTuple named members
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
 In C#, it is possible to  use value tuple to return multiple values from a method without using the ref or out parameters. As shown in the code snippet below
```C#
class Returntype
   {
      static void Main(string[] args)
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
         var student = (55, "Robert", 25,  "Computer Science");
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
Deconstructing a ValueTuple allows you to get individual members. A deconstruction declaration syntax divides a ValueTuple into its constituent pieces and assigns each portion to a new variable. In C#, you can deconstruct the ValueTuple object's elements and assign them to local variables in a variety of ways. To establish a discrete variable for each element in the tuple, we can specifically declare the type for each element inside the parenthesis (), as shown below.
```C#
 class Program
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
A tuple with no elements is represented by the ValueTuple structure. It's most helpful for its static methods, which allow you to generate and compare value tuple types. Its helper methods allow you to create value tuples without having to define the type of each component individually. You can build value tuples with 0 to 8 components by invoking its static Create methods. You must use the ValueTupleT1,T2,T3,T4,T5,T6,T7,TRest> constructor for value tuples with more than 8 components.
 
 Methods.
 
Create(); this method creates a new value tuple that has zero components.

Create<T1>(T1); this method creates a new value tuple that has one component.

Create<T1, T2>(T1, T2); this method creates a new value tuple that has two components.

Create<T1, T2, T3>(T1, T2, T3); this method creates a new value tuple that has three components

Create<T1, T2, T3, T4>(T1, T2, T3, T4); this method creates a new value tuple that has four components.

Create<T1, T2, T3, T4, T5>(T1, T2, T3, T4, T5); this method creates a new value tuple that has five components 

Create<T1,T2,T3,T4,T5,T6>(T1, T2, T3, T4, T5, T6) ; this method creates a new value tuple that has six components 

Create<T1, T2, T3, T4, T5, T6, T7>(T1, T2, T3, T4, T5, T6, T7); this method creates a new value tuple that has seven components. 

Create<T1, T2, T3, T4, T5, T6, T7, T8>(T1, T2, T3, T4, T5, T6, T7, T8); this method creates a new value tuple which has eight components 

### Conclusion.
Value tuples have a simplified syntax and perform better than Tuples, as well as the ability to alter data members and give them meaningful names. In summary, there are numerous advantages to utilizing Value tuples rather than Tuples.
