---
layout: engineering-education
status: publish
published: true
url: /working-with-metadata-in-csharp/
title: Working with Metadata in C#
description: This article will show the reader how to work with metadata in C#. Metadata refers to binary information that is saved in memory.
author: john-njoka
date: 2021-10-28T00:00:00-13:13
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-metadata-in-csharp/hero.png
    alt: Working with metadata in C# hero image
---
Metadata refers to binary information saved in memory or a language runtime portable executable file.
<!--more-->
When you compile code from a portable executable file, data is added to another file section. The code is converted to `MSIL` (Microsoft Intermediate Language) before moving to another file partition.

All data types and members defined and referenced in the assembly are contained in the metadata.

When C# code is executed, the metadata is loaded from memory. Defined and referenced information in either a module or assembly is contained within the metadata's description. Therefore, this component allows modules and assemblies to work seamlessly.

In this article, we will discuss the roles and types of metadata in detail.

### Table of contents
- [Roles played by metadata in C#](#roles-played-by-metadata-in-csharp)
- [Basic examples of working with metadata](#basic-examples-of-working-with-metadata)
- [Categories of metadata](#categories-of-metadata)
- [Type metadata](#type-metadata)
- [Metadata-described types](#metadata-described-types)
- [Conclusion](#conclusion)

### Roles played by metadata in Csharp
1. Data mining - This is the pattern discovery process in large data combinations using methods from machine learning, statistics, and database systems. A necessary process that employs intelligent methods to excavate data patterns. Data mining is a multidisciplinary branch of computer science.

2. Dataload function - The `Load function` creates and loads a database from an input data file. It can load a database for the first time or as part of a database restructuring process.

3. Metadata as a tool for data extraction. It helps retrieve and collect disparate data from a pool of unstructured or poorly organized sources.

4. Metadata as online analytical processing (OLAP) tool in data warehousing. It helps the support system find data warehouse contents. It also assists in data mapping during data transformation to the data warehouse from the operational environment.

5. Metadata as a data transformation tool - Data transformation can be constructive (adding and replicating), malignant transformative (deleting), or structural (moving and renaming data in a database). This allows for improved data formatting and compatibility.

6. Metadata as a query tool in the data warehouse - This allows you to create assembled listings, perform regular reports running, and execute cross-tabular reporting and querying.

7. Metadata has a role as a source function - It assists users in locating relevant information and resources.

### Basic examples of working with metadata
#### First example
In this example, we will use the division of three numbers. We are going to divide 50 by 2, and 5. 

As illustrated below, when working with metadata or binary data, we can see the compiler's machine-generated code. This code is always encrypted and, therefore, incomprehensible to humans.

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
The division of 50 by 2 and 5 is 5
```

#### Second Example
In this example, we will find the area of a rectangle. It's worth noting that actual data is viewable, unlike in the first example. 

```C#
using System; 
public class AreOfRectangle
{
    public static int Main()
    {
       
        int y = 14;
        
        Console.WriteLine("The rectangle area is {0}:", areaOfRectangle(y));
        return 0;
    }
    public static int areaOfRectangle(int y)
    {
        return (y + y) * 2;
    }
}
```

Output:

```bash
The rectangle area is 56:
```

### Categories of metadata
In the C#, there are three types of metadata: `business`, `technical`, and `operational` metadata.

1. **Business metadata** 

Business metadata allows your data warehouse to communicate with end-users. 

Business users, not just IT professionals, should be aware of what's in the data warehouse and how to utilize it.

Business metadata is also user-friendly. It shows what's inside a directory and provides directions for getting there. Think of it as an executive tour guide or road map.

2. **Technical metadata** 

It provides computer systems with information on data format and structure. Examples include data lineage, access permissions, and database tables.

3. **Operational metadata** 

Data currency and data lineage are included in this metadata. The data currency describes whether or not the information is current, archived, or deleted. 

The history of data movement and transformation is referred to as the data lineage.

### Type metadata
A C# program is compiled after writing. Assembly code is generated as a result of the compilation. This assembly file is used as the NET's basis. 

The extension `*.dll or *.exe` denotes an assembly file. These parts are the building blocks of your assemblies. 

One of the assembly's components is its metadata, which describes the types defined in the program.

For example, the software can implement a class called MyClass, and the built assembly metadata defines it.

Type information is extensively utilized in inter-program communication. Some of these use cases are discussed below:

1. `Object serialization` 

To save or transport an object, it needs to be serialized, 

Serialization converts it into a stream of bytes. This stream may be stored in memory, a database, or a file. 

Its primary function is to save the current state of an object so that it may be restored at a later time. 

2. `Application distribution` 

A notification email is sent to users who sign up for App distribution. The interface is also user-friendly. The app manager makes it simple for testers to set up and access all applications.

3. `Remote work`

This component allows individuals to work from home and still share information effectively.

4. `Extensive Markup Language(XML) function` 

With the XML standard, information formats may be created and shared electronically across the public Internet and private networks. 

The World Wide Web Consortium's (W3C) XML code is similar to HTML code in that it's a formal guideline.

5. `IDE interlanguage interaction` 

This is the interaction between different programming languages IDE.

### Metadata-described types
The following types are described using metadata in C#.NET:

- Enumerations
- Interfaces
- Delegates
- Classes
- Structures

**The following components are used to obtain type information in C#:**

The `ildasm.exe`, which is a command-line utility, reads type metadata to access assembly items via reflection. 

`Ideas` is a C# utility that parses any .NET framework DLL. It also displays assembly information in a human-readable format.

`ildasm.exe` also displays namespaces, types, and their interfaces. For this reason, It presents more information on the code written in `Microsoft Intermediate Language` (MSIL). 

`ildasm.exe` analyzes some native assemblies, such as `Mscorlib.dll`, in addition to .NET framework assemblies that have been provided by others or created by yourself.

This program has different methods which include:

The `System.Object.GetType()` method is used to determine and define the type of object. The base class for .NET classes is the System. 

In this case, the Object's `GetType()` function is utilized, and its basic syntax looks like this:

```C#
public System.Type GetType();
```

Using the `typeof() operator`. This method allows you to define type information without having to create an object. It has the following general syntax:

```C#
typeof(someType)
```

Using `System.Type.GetType()` method or metadata allows one to determine information about a type based on its name in a process called string representation. 

It also uses the late binding mechanism, unlike in `System.Object.GetType()` and `GetType()` methods where the information type is unknown at compile time since the compiler contains reflection-based code. 

The general syntax is as follows: 

```C#
public System.Type GetType()
```

### Conclusion
Metadata in C# is used to learn more about the data. However, this is encrypted into `binary format,` which is incomprehensible to humans. So we convert binary code into regular code and then analyze the logic.

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
