---
layout: engineering-education
status: publish
published: true
url: /java-vs-csharp/
title: Java vs C#
description: In this article we will go over the various distinguishing characteristics of Java and C#.
author: alice-wangari
date: 2021-06-30T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-vs-csharp/hero.jpg
    alt: Java C# example image
---
Java and C# are both Object-Oriented languages used when developing Web applications, Networking applications, Database applications, Mobile applications, Video games, Service applications and so much more.
<!--more-->
### Introduction
In this article, we will be looking at the:
- History of Java and C#.
- Characteristics of Java and C#.
- The basic and main differences between Java and C# in terms of:
    1. Syntax
    2. Installation
    3. Cross-platform
    4. Application

### History of Java
Java is an object-oriented programming language used when developing a desktop application and web application. It needs the Java Runtime Environment (JRE) to run on a machine. 

In Java, developers can use the "write once, run anywhere" principle. Java was created back in 1995 and it requires Java Development Kit (JDK) to run on a machine.

### History of C#
C# (C sharp) is a modern Object-Oriented Programming language which is used for developing softwares of many computer systems due to its portability. C# was invented in 2002. Programs written in C# utilize the .NET Framework to run on a machine.

### Characteristics of Java
1. It is Simple - Java is simple compared to other languages.
2. It Is Object-Oriented - Java is an Object-Oriented Programming language, everything revolves around the object.
3. It is Interpreted - To execute Java programs, you'll require an interpreter. The programs are compiled into [bytecode](https://techterms.com/definition/bytecode) which is the Java Virtual Machine (JVM) code. The bytecode is platform-independent, meaning it can run on any machine with a Java interpreter (part of the JVM).
4. It is Robust - By robust we mean it is reliable, as a rule of thumb, no programming language can assure reliability. Java puts a lot of emphasis on checking for possible errors early, as Java compilers can detect many problems that would otherwise show up during execution time in other languages.
5. It is Secure - This is because Java programs run inside a sandbox which is a virtual machine.
6. It is Portable - Java is architecture-neutral. Meaning, it does not need to be recompiled to run on any platform, making it portable.

### Characteristics of C#
1. Simple - C# language is rich in sets of library functions, data types and provides a structured approach that helps to break problems into parts.
2. It Is Object-Oriented - C# is also an Object-Oriented Programming language that provides all the features of Object-Oriented programming like polymorphism, data abstraction, encapsulation, and inheritance.
3. It is Fast Speed - The C# language is fast during its compilation and execution.
4. It is a Modern Programming Language - This is because C# provides exception handling and garbage collection.
5. It is Secure - C# language provides many built-in features and is part of .NET runtime.
6. It is portable - This is due to its ability to create software to be used on many computer systems.

Let us now dive deeper into the differences between Java and C#:

### Syntax comparison
Java and C# use the basic syntax of the C language but there are still some syntactic differences between them. Let's look at an example program for each and compare them directly.

#### Java
```java
 import java.lang.*;
 class Program{  
    public static void main(String args[]){  
     System.out.println("Hello Java");  
    }  
} 
```
 
In Java, we use `*`(asterisk) to import all content in a [package](https://www.javatpoint.com/package). If we don't use `*`, we will have to import a class in the package individually.

#### C#
```cs
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello C#!");
        }
    }
}
```

The `using` [directive](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive) enables us to use types from a namespace without having to specify how they should be used in that namespace.

In C# language, to output a text, we use `Console.WriteLine()` while in Java, we use `System.out.println()`.

### Installation comparision
This is another consideration that every programmer should look at i.e the requirement of each language to run on a machine. Let's look at what each language requires for it to run on a machine. 

#### Java
Java requires JDK (Java Development Kit) to run it on a machine and executes on JRE (Java Runtime Environment). Java source code is converted into bytecode, which is then compiled into machine code for it to run on a machine. 

To install Java on a machine, look at [this](https://www.liquidweb.com/kb/how-to-install-java-on-ubuntu-windows-and-macos/) article.

#### C#
C# utilizes the .NET Framework to run on a machine and executes on CLR (Common Language Runtime). C# source code is interpreted into bytecode which is then compiled into machine code by the CLR. 

For a C# installation process, look at [this](https://www.section.io/engineering-education/introduction-to-csharp/) article.

### Cross-platform 
In this section, we will ask ourselves, which of these languages is easily compatible with other platforms?. Cross-platform is the ability of a software to be used on different types of platforms or with different software packages.


#### Java
Java's byte code makes it extremely cross-platform i.e when a Java program is compiled, it can run on all platforms. This keeps in the principle of "write once, run everywhere".

#### C#
C# could stand to improve on this feature when compared to Java. As it does not run on all platforms.

### Application
In this part, we shall look at where each of these languages can be used.

#### Java
Java is efficient and good when building [highly concurrent applications](https://www.quora.com/What-are-some-examples-of-highly-concurrent-systems) because it works with several threads to achieve parallel processing.

Concurrency helps to perform certain task faster, as these tasks can be divided into subtasks, and these subtasks can be executed in parallel. Java is also good in web-based applications, [distributed applications](https://techvidvan.com/tutorials/applications-of-java/).

#### C#
C# is efficient and widely used for Mobile development, Game development, and developing Desktop applications. Most of the games today are programmed using the [Unity game engine](https://unity.com/) which is supported by C# language.

### Conclusion
From the comparison above, it is evident that one Language may work on one project but may not work on another different project. Thus, when choosing between Java and C#, it is important to consider the needs and requirements of the two languages.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
