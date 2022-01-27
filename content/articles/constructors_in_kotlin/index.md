A constructor is a quick and easy technique to set up class properties. It's also known as a specific member function that's invoked when a new object is formed.


Note: If the programmer does not define the constructor, the compiler is designed to generate a default one.

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
The primary constructor must be defined with the same name as the class, followed by parentheses. However, the secondary constructor must be expressed with the `constructor` keyword.

#### Primary constructors
The primary constructor is a section of the class header that comes after the class name, using the `constructor` keyword. The example below exemplifies the definition:

```kotlin
class student Constructor(name:string,age:Int,Email:string)
 { 
     ///code to be processed
}
```
The constructor keyword can be ignored if the primary constructor has no annotations or accessibility modifiers:

The example below explains:
```kotlin
class AtmMachine(_moneyInMachine:Boolen,_location:string){
    ///code to be exercuted
}
```
In the preceding example, we don't use the `constructor` keyword. By default, all constructors are public which means they are visible everywhere in the class. Therefore we don't have to include the `constructor` keyword, as shown below:

```kotlin
class student(name:string,age:Int,Email:string){ }
```

#### Secondary constructor
In Kotlin, a secondary constructor is created using the `constructor` keyword. In addition, the secondary constructor can be used to call the primary constructor. The example below shows how you can declare two constructors with a student having two parameters (name and year). 

```kotlin
class student{ 
    constructor(name: Int){ 

    } 
    constructor(year:Int, id: Int){ 

    } 
}
```

Also, the secondary constructor can assign values to fields while the class is instantiated. The example below illustrates this property:

```kotlin
class myStudent{ 
    constructor(name:String,id:Int{
         println("Name=${name}") 
         println("Id=${id}")
    } 
         
    fun main(args: Array <string>) { 
        val mystudent=myClass("Alex",200) 
    }
}
```

The output of the above code will look like this:

```
Name = Alex 
Id = 200
```

Kotlin also offers room for using a primary constructor with a secondary constructor in the same class. You need to use the `this` keyword for authorization to call the primary constructor:

```kotlin
class myStudent(email:String){ 
    constructor(name:String,id:Int,email:string):this(email){
         println("Name = ${name}") 
         println("Email= ${email}") 
    } 
    
    fun main(args:Array<string>){
         val mystudent = myStudent("Alex","alex@gmail") 
    }      
}
```

This outputs:

```
Name = Alex Email = Alex@gmail
```

Constructors can also be called by another secondary constructor of the same class:

```kotlin
class myStudent{
     constructor(name:String,id:Int): this(name,id,"Alex@gmail"){
        println("Name=${name}")
         println("Id=${id}")
    }
    constructor(name:string, id:Int, mail:string ) 
      { 
          println("Name = ${name}") 
          println("Id" = ${id})
           println("Email = ${mail}")
     }
}    
     fun main(args:Array<string>){
     val mystudent = myStudent("Alex",200) 
    
}
```
The output of the above code is:

```
Name = Alex 
Id = 200
Email = Alex@gmail
```

### Init blocks
Init is short for initializer. It is a block of code that is executed every time the class is instantiated. They are used when you need to add a block of code that cannot be added to the constructor, simplifying a lot for the programmer. Init blocks are called immediately after the primary constructor. To declare one, use the `init` keyword:

```kotlin
init
{ 
    //code to be executed
}
```

Here is an example of a primary constructor with an init block:

```kotlin
class person(name:string,id:Int){ 
    val pName :String 
    val pId:Int 
    init{ 
        pName= name.capitalize() 
        pId=id println("Name = ${pName}") 
        println("Id=${PId}") 
        } 
    } fun main(args:Array<Strings>){ 
        val Person=person("Alex",200) 
}
```

When a person object is created, the parameters name and id accept the values `Alex` and `200`. The properties name and id are not properties of the Person class because they are not preceded by `val` or `var`. After the constructor is called, the initializer block is executed which initializes `pname` and `pId`. When run this would be the output:

```
Name = Alex
Id =200
```

### The difference between a primary constructor and a secondary constructor
The main difference between a primary and secondary constructor is that the former resides in the class declaration header, whereas the latter is declared inside the Kotlin class body. Additionally, a secondary constructor may call the primary constructor.

### Best practices for object-oriented programming
The clean use of classes is required for effective Kotlin. We learned about constructors above but never discussed best practices with them. We can make the following changes to our code to make it more readable while using constructors:
- Minimize the visibility of properties, i.e., when using the private, public, protected keywords. It allows you to control where your class members can be accessed from.
- Combine property declaration. This is achieved by taking a property and setting it to a constructor parameter.
- Improve variable naming. This is achieved by using variable naming rules; your variable names should: 
  - Be based on the variable's purpose so it's clear what the variable is for.
  - Have no spaces between words. Ex. myClass.
  - Be greater than a single character.
  - Not use special prefixes or suffixes (e.g. `name_`, `mName`, `s_name`, and `kName`), except in the case of backing properties.
  

Note: The init block is called just after the primary constructor, and the secondary constructor is called using the `this` keyword.

### Conclusion
In this article, we have covered various ways of creating constructors using Kotlin as our language, and when to use the init block. We also learned when the init block is executed vs when the primary constructor is executed, along with how secondary constructors are invoked. Finally, we went through best practices in object-oriented programming as it relates to constructors.
