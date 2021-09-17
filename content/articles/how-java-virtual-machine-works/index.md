---
layout: engineering-education
status: publish
published: true
url: /how-java-virtual-machine-works/
title: How the Java Virtual Machine Works
description: In this article, we will discuss Java Virtual Machine which is used to compile Java code. We will understand the various types of virtual machines and discuss them in detail.
author: geofrey-mwangi
date: 2021-09-17T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

   -url: /engineering-education/how-java-virtual-machine-works/hero.jpg
    alt: Java Virtual Machine example image
---
The Java Virtual Machine (JVM) allows a computer to interpret or run Java programs. It acts as a compiler for generating machine code. All Java programs require a Runtime Environment. 
<!--more-->
 
### Introduction
As a run-time engine for Java applications, JVM (Java Virtual Machine) is a must. The Java Virtual Machine (JVM) is responsible for calling the main method in java code. JRE includes JVM (Java Runtime Environment). WORA is a term for Java applications (Write Once Run Anywhere). Therefore, Java code can be developed on one system and run on any other Java-enabled system without any modifications. 

JVM makes all of this possible. As part of the Java compiler's process of compiling a `.java` file,`.class` files (which contain bytecode) with the same class names are generated. When we run this `.class` file, it goes through a series of steps. These steps describe the JVM as a whole, and we will discuss them in this article.

### Types of virtual machines
1. **System-based virtual machines (SVM)**: As a replacement for physical computers, SVMs were developed. A host computer runs them and uses their hardware resources.
2. **Application-based virtual machines (AVM)**: The host machine allows a single process to execute as an application without involving any hardware whatsoever. Process-based virtual machines are another name for them. JVMs belong to this group of VMs, which we will discuss at length in this article.
3. **Application-level virtual machine (AVM)**: allows a single process to execute as an application on the host machine without any hardware components. Thus, they are also known as process-based virtual machines. 

This `.class` file breaks down the JVM into numerous phases that describe how it works:
1. ClassLoader
2. JVM Memory 
3. Execution Engine 
4. Java Native Interface (JNI)
5. Native Method Libraries
We will now discuss all of these phases below starting from the first one.
### Class loader subsystem
There are three components of the class loaders:
- Application class loader
- Extension class loader
- Bootstrap class loader

As one of the phases of JVM, class loader mainly consists of three activities which are listed below:

1. **Loading**: `.class` files are loaded into the method area by the ClassLoader, which generates the binary data corresponding to the class file. The method area of each `.class` file in JVM contains the following information which is essential.
- Class name and its immediate parent class.
- `.class` files can be classified as Class or Interface.
- There is a lot of detail on the modifier, variables, and method.

For each `.class` file loaded, JVM produces a Class object to represent it in heap memory. One should note that this class object generated belongs to the `Java.lang` package's. If the programmer wants information about a class such as its name, its parent, or any methods/variables associated with it, they can use these Class objects. The getClass() function of the Object class can be used specifically to retrieve theses object references.
The class object built by JVM to represent the `.class` file in memory is demonstrated in this Java application below.
```java
import java.lang.reflect.Field;
import java.lang.reflect.Method;
public class Test {
    public static void main(String[] args)
    {
        pupil p1 = new pupil();
        Class cl1 = p1.getClass();
        System.out.println(cl1.getName());
        Method m[] = cl1.getDeclaredMethods();
        for (Method method : m)
            System.out.println(method.getName());
        Field f[] = cl1.getDeclaredFields();
        for (Field field : f)
            System.out.println(field.getName());
    }
}
//Using the Class object, we can retrieve information about a sample class.
class pupil {
    private String name;
    private int roll_No;
  
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getRoll_no() { return roll_No; }
    public void setRoll_no(int roll_no)
    {
        this.roll_No = roll_no;
    }
}
```
**Output**
```
pupil
getName
setName
getRoll_no
setRoll_no
name
roll_No
```
> Note that each `.class` file loaded creates only one object of the class.
> 
2. **Linking**:
Executes three operations, including:
- **Preparation**: It allocates memory and initializes it to default settings for class variables.
- **Verification**: A file is correct as long as it has been correctly formatted and created by a valid compiler. The `java.lang` run-time exception is thrown when the verification fails. In this case, the component ByteCodeVerifier is responsible. After that, the class file is ready to be compiled.
- **Resolution**: There is a straightforward substitution for the sorts of symbolic references as the name suggests. Searching for the referenced entity in the method area is how it is accomplished.

> Delegation-Hierarchy principle is used by JVM to load classes. Loading requests are delegated to extension classloaders, which in turn delegate requests to bootstrapping classloaders by system classloaders. Any other requests that are not routed through an extension class loader are routed through the system class loader (if found in the bootstrap path). As a last resort, `java.lang` run-time errors are thrown when the system class loader cannot load the class that was supplied.
> 
### JVM Memory 
The `Runtime Data Area` is another name for the memory area. As defined by the JVM specification, some run-time data regions are required throughout the program's execution. A few of these are created when the JVM is booting up. 

Another type of object is a thread-specific object, formed just when a thread is created and destroyed when the thread is destroyed. It's usually used to keep track of instructions. In total, JVM is broken down into five sub-areas:
1. **Method area**: Class information such as the class name, parent class name and methods are preserved in the method area.
2. **Heap area**: In the heap area, all objects' information is saved. There is also a Heap Area for each Java Virtual Machine and It's also conciderd as a resource that's shared.
3. **Stack area**: Every block of this stack is termed an activation record/stack frame, and it stores method calls in each of the blocks there in. There is a frame for each local variable. JVM will destroy a thread's run-time stack after it has terminated and due to this, it is not an accessible resource to the general public.
4. **PC registers**: Store the address of the thread's current instruction. Each thread has its PC Registers, as you might expect.
5. **Native method area**: Every thread has its native stack that stores information about a native method's parameters.
### Execution Engine
To run a `.class` file, you need an execution engine. For example, reading bytecode from a file, using data from various memory areas, then executing instructions. It consists of three components named below:
1. **Interpreter**: Essentially, the interpreter takes bytecode and translates it to machine code. Interpreters may be faster at running one line of bytecode than they are at executing the entire code. Also, a fresh interpretation must be provided each time the same method is invoked.
2. **JIT Compiler (Just In Time compiler)**: Execution engines use the interpreter to execute byte code. The JIT compiler will be used instead of the execution engine to detect that a method is repeated. JIT compiler consists of the following;
- Intermediate Code Generator.
- Code Optimizer.
- Target Code Generator.
- Profiler.
3. **Garbage Collector(GC)**: Objects that are not referenced can be removed by the garbage collector as a background process, freeing up space on the heap.
### Java Native Interface (JNI)
Interacting with Native Method Libraries and providing native libraries (C, C++) for execution, a hardware-specific C/C++ library can call and be called from the JVM as a result.
> Native Method Libraries are a set of native libraries (C, C++) that are required by the Execution Engine.
### Conclusion
Virtual machines are not based on reality, but they can make you feel as though they are. When it comes time to compile Java code, the machines does so using the Java Virtual Machine and allows Java apps to run.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
