### Introduction
Metadata refers to binary information saved in memory or a language runtime portable executable file. When you compile code from a portable executable file, data is added to another file section. The code is converted to MSIL' (Microsoft Intermediate Language) before moving to another file partition. All of the data types and members defined and referenced in the Assembly are contained in the metadata.

When the C# code is executed' at runtime, the metadata is loaded from memory. Defined and referenced information in either a module or Assembly is within the description of metadata. Thus, modules and assemblies work seamlessly with metadata assistance.
 
In this article, roles and types of metadata will be discussed in detail, and working with metadata will be made simpler for the reader.

### Table of contents
- [Roles played by metadata in C#](#roles-played-by-metadata-in-c#)
- [Basic examples of working with metadata](#basic-examples-of-working-with-metadata)
- [Categories of metadata](#categories-of-metadata)
- [Type metadata](#type-metadata)
- [Metadata-described types](#metadata-described-types)
- [Conclusion](#conclusion)



### Roles played by metadata in C#
1. Data mining.
This entails the process of pattern discovery in large data combinations using methods from machine learning, statistics, and database systems. A necessary process that employs methods of intelligence to excavate data patterns. It is a micro branch in computer science that is multidisciplinary.

2. Dataload function-The Load' function creates and loads a database from an input data file. It can load a database for the first time or as part of a database restructuring process.

3. Metadata as a tool for data extraction. Metadata helps retrieve and collect disparate data from a pool of unstructured or poorly organized sources.

4. Metadata as online analytical processing (OLAP)' tool in data warehousing. It helps the support system find data warehouse contents and assists in data mapping during data transformation to the data warehouse environment from the operational environment.

5. Metadata as a data transformation tool. Data transformation can be constructive(adding and replicating), malignant transformation(deleting), or structural(moving and renaming data in a database). This allows for improved data formating and data compatibility for data used for compound roles.

6. Metadata as a query tool in the data warehouse. This allows you to create assembled listings, perform regular reports running, and execute cross-tabular reporting and querying.

7. Metadata has a role as a source function. It assists users in locating relevant information and resources.

### Basic examples of working with metadata
#### First example
In this example, we will use the dision of three numbers. We are going to devide 50 by 2, and 5 in this part. As illustrated below, when we want metadata or binary data, we can see the compiler inside machine-generated code, which is always encrypted and therefore incomprehensible to humans.

```C#
using System;
public class Division
{
    public static int Main()
    {
        int k = 50, j = 2, t = 5;;
        Console.WriteLine("The division of {0},{1} and {2} is {3}", k, j, t, division(k, j, t));
        return 0;
    }
    public static int division(int k, int j, int t)
    {
        return (k / j / t);
    }
}
```

Output:

```bash
The division of 50,2 and 5 is 5
```

#### Second Example.
We will find the area of a rectangle. It is worth noting that actual data is viewable from about, unlike in the first example. When we want metadata or binary data, the compiler inside machine-generated code is seen, always encrypted, and therefore incomprehensible to humans.

```C#
using System; 
public class AreOfRectangle
{
    public static int Main()
    {
       
        int y = 14;
        
        Console.WriteLine("The rectangle area is {0}:", areaOfrectangle(y));
        return 0;
    }
    public static int areaOfrectangle(int y)
    {
        return (y + y) * 2;
    }
}
```

Output

```bash
The rectangle area is 56:
```

### Categories of metadata
In the Csharp programming language, there are three metadata types: business, technical and operational metadata.

1.  **Business metadata**- Using business metadata, your data warehouse may communicate with your company's end users. Business users, not just IT pros, should be aware of what's in the data warehouse and how to utilize it.
As with a road map or a user-friendly information directory, business metadata shows what's inside and provides directions for getting there. An executive tour guide and road map both fulfill the purpose of this document.

2. **Technical metadata**- Provides computer systems with information on the format and structure of data. Examples include data lineage, access permissions, and database tables.

3. **Operational metadata**- Data currency and data lineage are included. The currency of data describes whether or not the information is current, archived, or deleted. The history of data movement and transformation is referred to as the data lineage.

### Type metadata
After writing, a C# program is compiled. An assembly is generated as a result of the compilation, and this assembly is used as the NET's basis. The extension `*.dll or *.exe` denotes an assembly file. Parts are the building blocks of your Assemblies. One of the Assembly's components is its metadata, which describes the types defined in the program.

It is expected that, for example, the software implements a class called MyClass, and the built Assembly metadata defines it.
Type information is extensively utilized in inter-program communication. A list of these uses include:

1. `Object serialization,`- In order to save or transport an object, serialization converts it into a stream of bytes. This stream may be stored in memory, a database, or a file. Its primary function is to save the current state of an object so that it may be restored at a later time. 


2. `Application distribution`- A notice email is sent to users who sign up for App Distribution, and the interface is user-friendly. The app manager makes it simple for testers to set up and access all of the applications and versions they're working with.
3. `Remote work`- Working from home or telecommuting are other terms for remote work, which is any job done outside of an office setting.
4. `Extensive Markup Language(XML) function`- With the XML standard, information formats may be created and shared electronically across the public Internet and business networks alike. The World Wide Web Consortium's (W3C) XML code is similar to HTML code in that it is a formal guideline.
5. `IDE interlanguage interaction`- This is the interaction between different progamming languages IDE.

### Metadata-described types
The following types are described using metadata in C#.NET:

- enumerations 
- interfaces 
- delegates 
- classes 
- structures 

#### The following are used to obtain type information in C#:
By using `ildasm.exe,` which is a command-line utility. The ildasm.exe utility reads type metadata to access assembly items via reflection. Ideas is a C# utility that parses any. NET Framework DLL and displays Assembly information in a human-readable format. 

`ildasm.exe` also displays namespaces, types, and their interfaces. For this reason, Ildasm.exe displays more than only the code written in 'Microsoft intermediate language' (MSIL). The ILdasm.exe program also analyzes some native assemblies, such as Mscorlib.dll, in addition to NET Framework assemblies that have been provided by others or created by yourself.

By using programs/programmatically. This method has different ways, which include:

- `System.Object.GetType()` method.This method is used to determine and define the type of object. As it is widely known, the base class for .NET classes is the System. Object. Using the System's tools, get type metadata. In this case, the Object class's GetType() function is utilized, and its basic syntax looks like this.

```C#
public System.Type GetType();
```

- Using the `typeof() operator`.This method enables you to define type information without having to create an object. It has the following general formula
```C#
typeof(someType)
```

- Using `System.Type.GetType()` method.Using metadata, you can determine information about a type based on its name in a process called string representation. It also uses the late binding mechanism, unlike the first two methods where information type is unknown at compile time as the compiler contains reflection-based code. The general formula is as follows: 
```C#
public System.Type GetType()
```

### Conclusion
Metadata in C# is used to learn more about the data. This is all encrypted into `binary format,` which is incomprehensible to humans, so we convert binary code into regular code and analyze the logic.
