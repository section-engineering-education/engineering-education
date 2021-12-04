A constructor is a quick and easy technique to set up class properties. It's also known as a specific member function that's invoked when a new object is formed. Note: If the programmer does not define the constructor, the compiler is designed to generate a default one.

This article explains the basic structure of a constructor, the two types of constructors, then the init block, and when to use it. Finally, we'll also discuss the best practices of object-oriented programming.

### Topics

- [What is a constructor?](#what-is-a-constructor)
- [How to instatiate objects using constructors](#how-to-use-constructors-to-create-an-object)
- [Types of constructors in kotlin](#types-of-constructors-in-kotlin)
- [Best practices for object-oriented programming](#Best-practices-for-object-oriented-programming)
- [When to use the init block in kotlin](#When-to-use-the-init-block-in-kotlin)

### Prerequisites

To fully understand the article, you are required to have the following:

- The Java Development Kit (JDK) installed on your computer
- A basic understanding of programming languages
- The IntelliJ code editor

### What is a constructor?

A constructor is a piece of code that is similar to a procedure or a method, usually declared alongside the class. They are mostly used when you need to initialize variables while creating an object.

### How to use constructors to create an object

As a function, the primary constructor is defined with the same name as the class, followed by parenthesis. However, the secondary constructor must be expressed with the `constructor` keyword.

### Types of Constructors in Kotlin

There are two different sorts of constructors in Kotlin, which are:

- The primary constructor
- The secondary constructor

#### Primary constructors

The primary constructor is a component of the class header. The primary constructor is found after the class name and parameters of that specific object in the class header that contains data types and constants. 

The example below exemplifies the definition:

```kotlin
class student Constructor(name:string,age:Int,Email:string)
 { 
     ///code to be processed
}
```

In the preceding example, the class student takes the parameters: "name" of type int, and "email" of type string. If you've not defined the access to use, i.e. (public, private, protected), then it won't be a must to use the constructor keyword, as shown below:

```kotlin
class student(name:string,age:Int,Email:string){ }
```

#### Secondary constructor

In Kotlin, a secondary constructor is created using the constructor keyword and can also be created in one or more classes. The example below shows how you can declare two constructors of a student having two parameters (name and year). 

```kotlin
class student{ 
    constructor(name: Int){ 

    } 
    constructor(year:Int, id: Int){ 

    } 
}
```

Also, the secondary constructor can assign the values while the object of the class is created at the start. The example below illustrates this property:

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

```kotlin
Name = Alex 
Id = 200
```

Kotlin also offers room for using a primary constructor with a secondary constructor in the same class. You need to use the `this` keyword for authorization as shown below:

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

```kotlin
Name = Alex Email = Alex@gmail
```

Constructors can also be called by another secondary constructor of the same class:

```kotlin
class myStudent{
     constructor(name:String,id:Int): this(name,id,"Alex@gmail"){

      } constructor(name:string, id:Int mail:string ) 
      { 
          println("Name = ${name}") 
          println("Id" = ${id})
           println("Email = ${mail}")
            }
         } fun main(args:Array<string>){
                 val mystudent = myStudent("Alex",200) 
}
```
The output of the following code is:

```kotlin
Name = Alex 
Id = 200
Email = Alex@gmail
```

### init block

Init short for initializer. It is a piece of code that is executed every time the class is instantiated. To declare one, use the `init` keyword:

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
Output:

```kotlin
Name = ALEX 
Id =200
```

### The difference between a primary constructor and a secondary constructor

The main difference between a primary and secondary constructor is that the former resides in the class declaration header, whereas the latter is declared inside the Kotlin class body. Secondary constructors may have several ways in which it exists.

### Best practices for object-oriented programming

- Minimize visibility of properties, i.e., private, public, protected. It allows you to control where your class members can be accessed from.
- Combine property declaration. This is achieved through taking a property and setting it, effectively to a constructor parameter.
- Improve variable naming. This is achieved by using variable naming rules; your variables should: 
  - Be based on the variable's purpose so it's clear what the variable is for.
  - Have no spaces between words. Ex. myClass.
  - Always start the variable name with an underscore. For example, _class.
  - You are not permitted to use a single character.
  - Special prefixes or suffixes (e.g. name_, mName, s_name, and kName), are not used except in the case of backing properties.

### Conclusion

In this article, we have covered various ways of creating constructors using Kotlin as our language, and when to use the init block. We also learned that the init block is called just after the primary constructor, and the secondary constructor is called using the `this` keyword. Finally, we went through best practices in object-oriented programming. 
