### Introduction

A constructor is a quick and easy technique to set up class properties. It's also known as a specific member function that's invoked when a new object is formed. Note: If the programmer does not define the constructor, the compiler is designed in such a way that it will generate a default constructor.

This article explains the basic structure of a constructor. We are also going to cover the two types of constructors. Then we are going to cover the Init block and when to use the block, and finally, the best practices of object oriented programming.

### Topics
- [What is a constructor?](#what-is-a-constructor)
- [How to instatiate object using constructors](#How-to-instatiate-object-using-constructors)
- [Types of constructors in kotlin](#types-of-constructors-in-kotlin)
- [Best practices for object oriented programming](#Best-practices-for-object-oriented-programming)
- [When to use the init block in kotlin](#When-to-use-the-init-block-in-kotlin)
### Prerequisite
To fully understand the article, you are required to have the following in place.

- Java Devolopment kit(JDK) installed in your computer
- A basic understanding of programming languages
- Install the IntelliJ code editor.
### What is a constructor?

It is a code that is similar to a procedure or a method, and it is usually declared as a class. They are mostly used when you need to initialize variables while creating an object.

### How to use constructors to create an object

Like a function, the primary constructor is defined with the same name as the class, followed by parenthesis '(...)'.howeve the secondary constructor must be expressed with the constructor keyword.

### How to use constructors to create an object

There are two different sorts of constructors in Kotlin, which are:

- The primary constructor
- The secondary constructor
### Primary constructors

The primary constructor is a component of the class header. The primary constructor is found after the class name and parameters of that specific object in the class header that contains data types and constants. 

The example below exemplifies the definition.
```kotlin
class student Constructor(name:string,age:Int,Email:string)
 { 
     ///code to be processed
}
```
- In the preceding example, the class student takes parameters named "of type int" and "email," which is a string.
- If you've not defined the method access to use, i.e. (public, private, protected), then it won't be a must to use the constructor keyword.
- As shown below,
```kotlin
class student(name:string,age:Int,Email:string){ }
```
### Secondary constructor
- In Kotlin, a secondary constructor is created using the constructor keyword and can also be created in one or more classes. The example below shows how you can declare two constructors of a student having two parameters (name and year).
```kotlin
class student{ 
    constructor(name: Int){ 

    } constructor(year:Int,id: Int){ 

    } 
}
```
Also, the secondary constructor can assign the values while the object of the class is created at the start. The example below illustrates this property.
```kotlin
class myStudent{ 
    constructor(name:String,id:Int{
         println("Name= ${name}") 
         Println("Id=${id}")
          } 
        } 
          fun main(args: Array <string>) { 
              val mystudent=myClass("Alex",200) 
    }
    ```

The output of the above code will look like this.
```kotlin
Name = Alex 
Id = 200
```
Kotlin also offers a room for using a primary constructor together with a secondary constructor in the same class, but you need to use the this () keyword for the purpose of authorization as shown below.
```kotlin
class myStudent(email:String){ 
    constructor(name:String,id:Int,email:string):this(email){
         println("Name = ${name}") 
         println("Email= ${email}") 
         } 
    }
          fun main(args:Array<string>){
               val mystudent = myStudent("Alex","alex@gmail") 
               
}
```
output
```kotlin
Name = Alex Email = Alex@gmail
```
- Constructors can also be called by another secondary constructor of the same class, as shown in the example below.
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

Init is a short form of initializer.It is a piece of code that is executed every time the class is instatiated and uses the init keyword.

An example of init block syntax
```kotlin
init
{ 
    //code to be exercuted
 }
```
An example of a primary constructor with an init block
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

The main difference is that the primary constructor resides in the class declaration header, whereas the secondary constructor is declared inside the Kotlin class body and may have a number of ways in which it exists.

### Best practices for object-oriented programming

- Minimize visibility of properties, i.e., private, public, protected. It allows you to control where your class members can be accessed from.

- Combine property declaration This is achieved through taking a property and setting it, effectively to a constructor parameter.

- Improve variable naming Naming This is achieved by using variable naming rules, which are:your variables should

- Based on the particulars of the subject area, so that the variable name expresses the variable's purpose clearly.
- There should be no spaces between words. i.e. myClass
- Always start the variable name with an underscore. For example, _class
- You are not permitted to use a single character, i.e., a
- Special prefixes or suffixes (e.g. name_, mName, s_name, and kName),are not used except in the case of backing properties.
### Conclusion
In this article, we have covered various ways of creating constructors using Kotlin as a language. We also covered when to use the init block. We also learnt that the init block is called just after the primary constructor the secondary constructor is called using this keyword and lastly Best practices in object oriented programming. 