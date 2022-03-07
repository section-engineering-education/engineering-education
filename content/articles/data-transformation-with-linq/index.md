
### Introduction
 LINQ is a C# module that mainly deals with data. In this article, we will learn several things concerning Language Integrated Query. It is a module that performs various functionalities, some of which will be covered in this article.
### LINQ overview
LINQ (Language-Integrated Query) is used for more than just data retrieval. It's also a valuable tool for data transformation. New output may be gotten using LINQ by capturing source sequences and converting them in various ways.

Grouping and sorting are techniques that usually change the sequence of a query, but the exact change can be achieved without using those techniques. It is achievable when a learner or a programmer uses the `select` clause. For example, a programmer may perform or carry out some of the following tasks.
1. In creating one output query consisting of another type, a programmer can combine several input queries.
2. A programmer may still opt to take a few elements from each element in the source sequence to create an output sequence.
3. By considering the results of operations on source data and several other things, an output sequence can still be obtained.

### Table of contents
- [Creating a Single Output Sequence with Multiple Inputs](#creating-a-single-output-sequence-with-multiple-inputs)
- [Subsets of each Source Element are chosen](#subsets-of-each-source-element-are-chosen)
- [Operations that are performed on source elements](#operations-that-are-performed-on-source-elements)
- [In-memory objects-XML transformation](#in-memory-objects-xml-transformation)
- [Conclusion](#conclusion)
- [What next](#what-next)
### Creating a Single Output Sequence with Multiple Inputs
The description in the example below explains how we can bring together more than one in-memory data structure. Consider the two sorts of classes listed below.
 
```c#
class Employer
{
    public string FirstName{(set; get;)}
    public string LastName{(set; get;)}
    public int JobNo{(set; get;)}
    public string city{(set; get;)}
}
class Employee
{
     public string FirstName{(set; get;)}
    public string LastName{(set; get;)}
    public int JobNo{(set; get;)}
    public string city{(set; get;)}
    
}
```
The query is described below.
```C#
class DataTransformations
{
    static void Main()
    {
        // data source 1
        List<Employer> employerList=new List<Employer>()
        {
            new Employer{
                FirstName="Henry",
                LastName="Melisa";
                JobNo="1815",
                city="The red city",
            
            },
            new Employer{
                FirstName="Mary",
                LastName="Kakai";
                JobNo="1919",
                city="The Black city",
            },
        };
        // Lets create the second data Source
        List<Employee> employeeList= new List<Employee>()
        {
           
            new Employee{
                FirstName="Jacob",
                LastName="Kilman";
                JobNo="1304",
                city="The RedBull city",
            
            },
            new Employee{
                FirstName="Mercy",
                LastName="Cate";
                JobNo="!401",
                city="The Blackpool city",
            }, 
        };
        //Lets now create the query
        var peopleInBlackCity=(employerList in Employer
        where employerList.City=="The Black city"
        select employerList.FirstName)
        .Concat(from employeeList in Employee
                where employeeList.City="The Black city"
                select employeeList.FirstName
        );
        Console.WriteLine("The following are the residents of the city");
         foreach (var person in peopleInTheBlackCity)
         {
             Console.WriteLine(Individual);
         }
         Console.WriteLine("You can press any key and exit!");
         Console.ReadKey();
          }
}
```
The main aim of the above code description is to generate a single output from more than one input. The classes involved are defined, and in our case, class Employer and class Employee are used together with the details that appertain to both employers and employees. Data sources are then created of both the classes, but their precise details are specified, e.g., FirstName="Mark." Then a query to generate, e.g., an employee's name with the city they reside is created.
### Subsets of each Source Element are chosen
 Various factors are considered to understand what subset is supposed to be chosen and from what source sequence.
1. An initializer of an object can be employed, and that may appear in two forms.
- Named type
- Anonymous type

And by doing so, it shall produce the elements with multiple properties from the source element. The description in the example below employs an anonymous type to encapsulate features of each element of the Employer
```c#
var query = from empl in Employer  
            select new {Name = empl.Name, City = empl.City};
```
2. The other way is to implement the dot functionality, which will only select one member from a source element. 

By taking an assumption of an object Employer which constitutes several public attributes and one of the public attributes is string city. A string sequence will be displayed as the output when the query is executed.
```c#
var query = from empl in Employer 
            select empl.City;
```
### Activities carried out in the source elements
There is a probability that there may be a lack of the elements or the elements themselves contained in the source sequence in the final output sequence. However, the input features of the source components might be the ones that are included in the output sequence.

Using each radius to display area as the output, a query must be selected. The perfect query to be used will be that query that will have the capability of taking a number series to represent the semi-circle radii. Then, a computed area will be returned as a string. 

Interpolation will hence be employed in the query to format every string presenting the outcome. All the actions that will have to be performed will be done in-between the curly braces of the text that will be interpolated. Then before the first quotation, a dollar sign is inputted in the interpolated string. The outcomes of those surgeries will be merged after they are completed.
```c#
class FormatQuery1
{
    static void Main()
    {
        // below is the data source
        double[] radii = {  3, 4 ,5};
        // The query is then demonstraed as below
        IEnumerable<string> output = 
            radii.Select(R => $"Area for a semi-circle with a radius of '{R}' = { 0.5* R * R * Math.PI}");
        foreach (string s in output)
        {
            Console.WriteLine(s);
        }
            
        
        Console.WriteLine("exit when a random key is pressed.");
        Console.ReadKey();
    }
}
```
A point of concern regarding performing operations on source elements is that if a query is translated to some other domain, then methods that will be called in such query operations shall not be accepted. In describing this, we shall take a function that is possessed by C#. 

If one wants to translate the function to LINQ, it will not be done directly because the modules in C# are not guaranteed in LINQ, and in the same manner, LINQ functions may not be now translated to SQL due to the same reason.
### In-memory objects - XML transformation
 When it comes to data transference from one module to another, it is achieved in more superficial ways when transforming data between SQL databases, in-memory data structures, XML documents, .NET datasets, and many more. And LINQ queries account and cater for this simplicity. The conversion is of an XML element derived from an in-memory data structure from the example described below.
```c#
class XMLTransformation
{
    static void Main()
    {
        
        List<Employer> empl = new List<Employer>()
        {
            new Employer {FirstName="Jacob", LastName="Harvey", JobNo=1912, 
            new Employer {FirstName="Claire", Last="Donnell", JobNo=1312, 
            
        };
        // Query creation
        var emplToXML = new XElement("Root",
            from empl in Employers
            let JobNo = string.Join(",", empl.JobNo)
            select new XElement("empl",
                       new XElement("FirstName", empl.FirstName),
                       new XElement("LastName", empl.LastName),
                       new XElement("JobNo", JobNo)
                    ) 
                ); 
        
        Console.WriteLine(emplToXML);
        
        Console.WriteLine("Press any key to exit.");
        Console.ReadKey();
    }
}
```
### Conclusion
In conclusion, we have seen and looked at how LINQ aids in data transformation using C# as a programming language using several examples in the description. How to create a single output sequence using multiple inputs, choose a subset of each source element, perform operations on source elements, and transform XML into in-memory objects.
### What next
After a careful study on this topic, do not stop here; continue digging deep into other C# programming and SQL areas to have a vast knowledge of programming with C# and other programming languages in general.

**Be proud to be a programmer**
