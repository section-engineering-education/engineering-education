---
layout: engineering-education
status: publish
published: true
url: /constructors-in-kotlin/
title: Constructors in Kotlin
description: In this article we will discuss constructors and init blocks in Kotlin along with best practices in using them.
author: simon-ngaruiya
date: 2022-02-10T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/constructors-in-kotlin/hero.jpg
    alt: constructors in kotlin
---

A constructor is a quick and easy technique to set up class properties. It's also known as a specific member function that's invoked when a new object is formed.

<!--more-->

This article explains the basic structure of a constructor, the two types of constructors, then the init block. Finally, we'll also discuss some best practices related to object-oriented programming.

### Table of Contents
- [What is a constructor?](#what-is-a-constructor)
- [How to use constructors to create an object](#how-to-use-constructors-to-create-an-object)
- [Types of constructors in Kotlin](#types-of-constructors-in-kotlin)
- [Init blocks](#init-blocks)
- [Best practices for object-oriented programming](#best-practices-for-object-oriented-programming)

### Prerequisites
To fully understand the article, you are required to have the following:
- The Java Development Kit (JDK) installed on your computer
- A basic understanding of programming languages
- The IntelliJ code editor

### What is a constructor?
A constructor is a block of code that is similar to a procedure or a method, usually declared alongside the class. They are mostly used when you need to initialize variables while creating an object.

### Types of constructors in Kotlin
There are two different kinds of constructors in Kotlin, which are:
- The primary constructor
- The secondary constructor

#### How to use constructors to create an object
The primary constructor must be defined with the same name as the class, followed by parentheses. However, the secondary constructor must be expressed with the `constructor` keyword. Note: If the programmer does not define the constructor, the compiler is designed to generate a default one.

#### Primary constructors
The primary constructor is a section of the class header that comes after the class name, using the `constructor` keyword. The example below exemplifies the definition:

```kotlin
class Student constructor(name: String, age:Int, Email:String){
    //code to be processed
}
```

The constructor keyword can be ignored if the primary constructor has no annotations or accessibility modifiers:

The example below explains:

```kotlin
class AtmMachine(moneyInMachine:Boolean,location:String){
    //code to be executed
}
```

In the preceding example, we don't use the `constructor` keyword. By default, all constructors are public which means they are visible everywhere in the class. Therefore we don't have to include the `constructor` keyword, as shown below:

```kotlin
class Student(name:String,age:Int,email:String){ }
```

#### Secondary constructor
In Kotlin, a secondary constructor is created using the `constructor` keyword. The example below shows how you can declare two constructors with a student having two parameters (name and year).

```kotlin
class Student
{
    constructor(name: Int){
    }
    constructor(year:Int, id: Int){
    }
}
```

Kotlin also offers room for using a primary constructor with a secondary constructor in the same class. You need to use the `this` keyword for authorization to call the primary constructor:

```kotlin
class MyStudent(email:String)
{
    constructor(name:String,id:Int,email:String):this(email)
    {
        println("Name=${name}")
        println("Email=${email}")
        println("Id=${id}")
    }
}
fun main(args:Array<String>)
{
    val myStudent = MyStudent("Alex",101,"alex@gmail")
}
```

This outputs:

```
Name=Alex
Email=alex@gmail
Id=101
```

Secondary constructors can also be called by another secondary constructor of the same class:

```kotlin
class MyStudent
{
    constructor(name:String,id:Int): this(name,id,"Alex@gmail")
    {
        println("Name=${name}")
        println("Id=${id}")
        // executes last
    }
    constructor(name:String, id:Int, mail:String)
    {
        println("Name=${name}")
        println("Id=${id}")
        println("Email=${mail}")
        // executes first
    }
}

fun main(args:Array<String>)
{
    val myStudent = MyStudent("Alex",200)
}
```

The output of the above code is:

```
Name=Alex
Id=200
Email=Alex@gmail
Name=Alex
Id=200
```

### Init blocks
Init is short for initializer. It is a block of code that is executed every time the class is instantiated. They are used when you need to add a block of code that cannot be added to the constructor, simplifying a lot for the programmer. Init blocks are called immediately after the primary constructor. To declare one, use the `init` keyword:

```kotlin
init
{
    // code to be executed
}
```

Here is an example of a primary constructor with an init block:

```kotlin
class Person(name:String, id:Int)
{
    private val pName:String
    private val pId:Int
    init
    {
        pName = name
        pId = id
        println("Name=${pName}")
        println("Id=${pId}")
    }
}

fun main(args:Array<String>)
{
    val person=Person("Alex",200)
}
```

When a person object is created, the parameters name and id accept the values `Alex` and `200`. The properties name and id are not properties of the Person class because they are not preceded by `val` or `var`. After the constructor is called, the initializer block is executed which initializes `pName` and `pId`. When run this would be the output:

```
Name=Alex
Id=200
```

### The difference between a primary constructor and a secondary constructor
The main difference between a primary and secondary constructor is that the former resides in the class declaration header, whereas the latter is declared inside the Kotlin class body. Additionally, a secondary constructor may call the primary constructor.

### Best practices for object-oriented programming
The clean use of classes is required for effective Kotlin. We learned about constructors above but never discussed best practices with them. We can make the following changes to our code to make it more readable while using constructors:
- Minimize the visibility of properties, i.e., when using the private, public, protected keywords. It allows you to control where your class members can be accessed from.
- Combine property declaration. This is achieved by taking a property and setting it to a constructor parameter.
- Improve variable naming. This is achieved by using variable naming rules; your variable names should:
  - Be based on the variable's purpose so it's clear what the variable is for.
  - Be greater than a single character.
  - Not use special prefixes or suffixes (e.g. `name_`, `mName`, `s_name`, and `kName`), except in the case of backing properties.

### Conclusion
In this article, we have covered various ways of creating constructors using Kotlin as our language, and when to use the init block. We also learned when the init block is executed vs when the primary constructor is executed, along with how secondary constructors are invoked. Finally, we went through best practices in object-oriented programming as it relates to constructors.

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
