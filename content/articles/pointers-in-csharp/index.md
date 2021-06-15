---
layout: engineering-education
status: publish
published: true
url: /pointers-in-csharp/
title: Pointers in C#
description: In this tutorial, we will learn about C# pointers, how to declare them, how to use them with arrays, structures, and a lot more. Pointers are applied in queue and stack data types.
author: kelvin-munene
date: 2021-06-15T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pointers-in-csharp/hero.png
    alt: C# with a computer
---
In C#, data types are categorized into three categories: `pointer types`, `value types`, and `reference types` based on how they store their value in the memory.
<!--more-->
### Introduction
We store the memory address of other kinds in a pointer-type variable. Since it lacks an individual variable, a reference-type contains a pointer to another memory location that holds the data. Examples of reference types are Classes, Objects, Arrays, Indexers, Interfaces, etc.

We explicitly included data types within the value data form. Integers, characters, and floating-point numbers, as well as the alphabet and numbers, are examples of value data types.

### Table of contents
- [Making a pointer style declaration](#making-a-pointer-style-declaration)
- [How to run unsafe codes](#how-to-run-unsafe-codes)
- [Safe and unsafe codes](#safe-and-unsafe-codes)
- [Pinning an object](#Pinning-an-object)
- [Pointers and methods](#pointers-and-methods)
- [Conversions and pointers](#conversions-and-pointers)
- [Pointers and arrays](#pointers-and-arrays)
- [Pointers and structure](#pointers-and-structure)

### Making a pointer style declaration
In C#, we declare pointers as illustrated below:

```c#
type *variable_name;
```

Where `*` is called the de-reference administrator. The de-reference administrator or de-reference operator is used for getting the value from the address that the pointer refers to.

Consider the following example: 

```c#
public class Program
    {
        static unsafe void Main(string[] args)
        {
            int w = 76;
            int* ptr = &w;
            Console.WriteLine((int)ptr);
            Console.WriteLine(*ptr);
        }
    }    
```

`w` is a pointer variable that can hold the position of an `int` sort. The operator `&` is known as a reference operator, and it is used to get a variable address. 

The memory address of the variable `w`, which can be assigned to a pointer variable, is specified by the symbols `&w`.

### How to run unsafe codes
Let's learn how to allow the use of unsafe codes in your [VS code](https://code.visualstudio.com/):

1. Go to the View tab. Then choose Solution Explorer from the drop-down menu.
2. Double-click the Property option in the Solution Explorer to expand it.
3. Check the "Allow unsafe code" option.

![output](/engineering-education/pointers-in-csharp/activating_unsafe_code.png)

### Safe and unsafe codes
**Safe codes** are C# keywords that run under the `Common Language Runtime's supervision (CLR)` while **Unsafe codes** are C# keywords that execute outside the management of the CLR. 

Unlike C++ and C programming languages, which use safe codes with pointers, the C# programming language only allows the use of unsafe codes.

The unsafe codes may be used as a modifier or to label a group of statements as unsafe. Common language Runtime translates safe codes into software instructions, which are then executed by the computer's CPU.

The example below uses the unsafe codes:

```C#
using System;
namespace UnsafeCodeApplication

{
    class Demo
    {
        public void Method()
        {
            unsafe
            {
                int m = 60,n=30;
                int* ptr1 = &m, ptr2 = &n;
                Console.WriteLine(*ptr1);    
                Console.WriteLine(*ptr2);    
                Console.WriteLine((int)ptr1); 
                Console.WriteLine((int)ptr2); 
            }
        }
    }
    class Example
    {
        public static void Main()
        {
            Demo d = new Demo();
            d.Method();
        }
    }
} 
```

And the output is:

```bash
60
30
1605887284
1605887280
```

> The addresses output may differ from machine to machine, it is determined by the values addresses in your computer. 

There are various methods for executing statements as unmanaged, such as using a Modifier or a Constructor. A collection of statements has been marked as unsafe in the example above. 

We used two variables, `a` and `b` with the values of 60 and 30 respectively, and the pointers contain their addresses. Then we displayed them.

### Pinning an object 
Pinning an object in C# entails restricting an object from moving into the [garbage collector](https://www.geeksforgeeks.org/garbage-collection-in-c-sharp-dot-net-framework/). 

Garbage collection (GC) is one of the services provided by the CLR to control an application's memory allocation and release. It allocates memory by allocating an adjacent region of address space for the operation, known as an unmanaged heap, and keeping a pointer to the address where the heap's next object will be allocated.

On the managed heap, reference types are managed. 

After performing a list, the GC releases the memory for the object that is no longer in use to deallocate memory. Each application's roots are set to null or refer to an object on the managed heap. The GC has access to the active root list that the JIT compiler and runtime keep track of.

For the unmanaged resource, we explicitly have to call the disposal method to remove the objects from the memory. 

For example:

```c#
using System;
namespace UnsafeCodeApplication

{
    class Demo
    {
        public unsafe static void Main()
        {
            int[] array = { 5, 6, 7, 8, 9 };    
            fixed (int* ptr = array)                
            for (int k=0; k< 5; k++)
            {
                Console.WriteLine("Value of array[{0}]={1}", k, *(ptr + k));
                Console.WriteLine("Address of array[{0}]={1}", k, (int)(ptr + k));
            }
            Console.ReadKey();
        }

    }

}
```

And the output is:

```bash
Value of array[0]=5
Address of the array[0]=-773935792
Value of array[1]=6
Address of the array[1]=-773935788
Value of array[2]=7
Address of the array[2]=-773935784
Value of array[3]=8
Address of the array[3]=-773935780
Value of array[4]=9
Address of the array[4]=-773935776
```

We used `fixed (int* ptr = array)` to restrict the objects in the array to a fixed memory allocation.

### Pointers and methods
In C#, the pointers can be passed as the following:

```c#
using System;
namespace UnsafeCodeApplication
{
    class Demo
    {
        public unsafe void Method()
        {
            int x = 60,y = 30;
            int* ptr1 = &x,ptr2 = &y;
            Console.WriteLine(*ptr1);       
            Console.WriteLine(*ptr2);       
            Console.WriteLine((int)ptr1);   
            Console.WriteLine((int)ptr2);   
        }
    }
    class Example
    {
        public static void Main()
        {
            Demo d = new Demo();
            d.Method();
        }
    }   
}
```

The output is:

```bash
60
30
1748493636
1748493632
```

> The addresses output may differ from machine to machine, it is determined by the values addresses in your computer.


Unmanaged codes are used with the method which has two variables `x` and `y` with values 50 and 20 respectively. Pointers `*ptr1` and `*ptr2` point to their memory addresses.

### Conversions and pointers
Pointer types do not inherit from objects in C#, and there is no way to convert pointer types to objects. As a result, pointers do not help boxing and unboxing. Conversions between different pointer types, as well as pointer types and integral types, are supported in C#.

C# upholds explicit and implicit pointers changes inside unmanaged settings. In implicit pointers, conversions are from null type to pointer type and also from any pointer type to type void * type.

For explicit pointers, the cast operator (()) is essential. 

The conversion is in this instance:
1. The type of pointer to other forms of the pointer.
2. To other pointer types: byte, sbyte, short, ushort, int, uint, long, ulong.
3. Pointer type to sbyte, byte, uint, int, long, ulong, short, ushort types.

Let's make an example of pointer conversion:

```c#
char k = 'U';  
char *pk = &k;  
void *px = pk; 
int *pj = (int *) px; 
```

`void *px = pk;` carry out an implicit conversion from pointer type to void * type. `int *pj = (int *) px;` carry out an explicit conversion using casting operator from pointer type to int type.

### Pointers and arrays
An array is a combination of data of a similar data type only distinguished by the position they are kept in it. 

Pointers notations are used to access arrays in the C# program:

```c#
using System;
namespace UnsafeCodeApplication

{
    class Demo
    {
        public unsafe static void Main()
        {
            int[] array = { 10, 20, 30, 40, 50 };
            fixed (int* ptr = array)
                for (int i = 0; i < 5; i++)
                {
                    Console.WriteLine("Value of array[{0}]={1}", i, *(ptr + i));
                    Console.WriteLine("Address of array[{0}]={1}", i, (int)(ptr + i));
                }
            Console.ReadKey();
        }

    }

}
```

And the output is:

```bash
Value of array[0]=10
Address of the array[0]=-521514320
Value of array[1]=20
Address of the array[1]=-5215143224
Value of array[2]=30
Address of the array[2]=-521514328
Value of array[3]=40
Address of the array[3]=-521514332
Value of array[4]=50
Address of the array[4]=-521514336

```

> The addresses output may differ from machine to machine, it is determined by the values addresses in your computer.

The above code contains unmanaged statements. We declared an array of five elements and used `Console.Writeline()` to display the memory address and value data type of the array. 

We previously had discussed pinning of objects, where we pinned the array to a fixed memory allocation. The output of the above code will contain every element in the array and its address simultaneously.

### Pointers and structure
In C#, structures are only made up of value types. Pointers should only be used in systems that have value types as their primary members. 

For example:

```c#
using System;
namespace UnsafeCodeApplication

{

    struct student
    {

        public int studentID;
        public double fees;
        public student(int a, double b)
        {
            studentID = a;
                fees = b;
            
        }
    };
    class Program
    {

        static void Main(string[] args)
        {
            unsafe
            {
                student A1 = new student(005, 45000), A2 = new student(006, 43333);

                student* A1_ptr = &A1, A2_ptr = &A2;
                Console.WriteLine("Student details 1");
                Console.WriteLine("student ID: {0} Fees: {1}",
                A1_ptr->studentID, A1_ptr->fees);
                Console.WriteLine("Student datails 2");
                Console.WriteLine("student ID: {0} Fees: {1}",
                A2_ptr->studentID, A2_ptr->fees);
            }
        }
    }
}
```

The output is:

```bash
Students details 1
Student ID: 5 Fees: 45000
Students details 2
Student ID: 6 Fees: 43333
```

The structure `student` with student ID and fees configure the builder to initialize values. Pointers indicate structures that contain primitive value-type rather than reference-type structures. 

There are two main method variables for students and fees pointers, initialized with `A1` and `A2` addresses. Console.writeline() is used to display student's details and fees.

### Conclusion
Pointers show the memory address and execute unmanaged codes, as we have discovered. The reason behind why the unsafe statements are used is that the garbage collector does not track memory addresses in an unmanaged environment. Pointers are applied in queue and stack data types.

Till next time, happy coding!

### Further reading
1. [Introduction to C#](https://www.section.io/engineering-education/introduction-to-csharp/)
2. [Getting Started with Windows Forms Using C#](https://www.section.io/engineering-education/getting-started-with-windows-forms-using-c-sharp/)
3. [Variables, Data Types and Control Statements in C#](https://www.section.io/engineering-education/variables-data-types-and-control-statements-in-csharp/)
4. [Getting Started with Inheritance using C#](https://www.section.io/engineering-education/getting-started-with-inheritance-using-c/)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
