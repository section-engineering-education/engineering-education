### Key differences between Kotlin and Java

### Introduction
It has been quite a while since Kotlin came out, and it has been progressing nicely. Since it was made explicitly as an alternative to Java in the application development, Kotlin has normally been contrasted with Java in numerous regards like syntax among others.

Java is a programming language and platform for computers. Most back-end development projects, notably those involving big data and Android development, employ it as the server-side language.

 Kotlin, on the other hand, is a free, open-source, statically typed programming language that mixes object-oriented and functional programming capabilities. It was created with the JVM (Java Virtual Machine) and Android in mind. Priorities include interoperability, safety, clarity, and tools support.

In this article, we will have a deep look into the following areas of specialization so that we can finally have a piece of first-hand information on what makes these two languages differ.
1. Syntax comparison
2. Lambda expressions
3. Model classes
4. Global variables
5. Concurrency
### Syntax comparison
Although these two languages are both used in application development, they have some bit of differences in their syntax. One clear difference is that the presence of semicolons at the end of a statement is enhanced while in Kotlin semicolons are not enhanced.

Java example
```java
public class myClass
{
    public void Name(String Name){
        String Name= Name " ";
        System.out.println("My name is :" + Name );
}
public void age()
{
    int age=30;
    System.out.println("I am " + age + "years old");
}
public static void main(string [] args)
{
    myClass my=new myClass();
    my.Name("Ben");
    my.age();
}
}
```
Kotlin example
```kt
class myClass
{
    fun FullName(firstName:string , lastName:String)
    {
        var fullName="$firstName $lastName"
        println("My name is  :$fullName")
    }  
}
fun age()
    {
        var age : Int
        age=30
        println("My age is : $age")
    }
    fun main(args :Array<String>)
    {
         myClass().FullName("Ben White")
         age()
   }
   ```
Clear distinctions are that Java has more lines of code than Kotlin and this comes about because Java enforces the concept of object-oriented programming in detail whereas Kotlin does not strictly enforce this OOP paradigm.

Apart from minor variations in syntactic patterns, Kotlin and Java are very similar in terms of syntax patterns, but Kotlin is more versatile in some ways.
### Expressions in Labda
Lambdas Expressions are simply anonymous functions that we may treat as values, passing them as arguments to methods, returning them, and doing whatever else we could do with a regular object.

In Java, when implementing Lambda expressions, parenthesis is preferred, but if there is only one parameter, parenthesis is unnecessary.
 
 Syntax
```java
parameter -> expression
(parameter a, parameter b) -> {code}
```
Java example
```java
interface Drawable{  
    public void draw();  
}  
  
public class LambdaExpressionExample {  
    public static void main(String[] args) {  
        int height=50;  
           //lambda implementation  
        Drawable d2=()->{  
            System.out.println("Draw "+height);  
        };  
        d2.draw();  
    }  
}  
```
 In Kotlin, curly brackets are required instead when implementing Lambda expressions.
 
 Kotlin syntax
 ```kt
 val lambdaName : Type = { argumentList -> codeBody }
 ```
 Kotlin example
 ```kt
 val square = { number: Int -> number * number }
 val nine = square(3)
 ```
 Even though the use of Lambda expressions minimizes the lines of code, the readability of the code later becomes a challenge. But in matters concerning what language to use in such a situation, Kotlin is much preferred because it promotes the use of brackets to aid in readability.
### Model classes
 The model class represents a data object that can be used to transfer data in a Java program. It encapsulates direct access to object data and ensures that all data is obtained through getter methods. 

To adhere to the encapsulation concept, properties in Java are defined as private. Java employs Getters and Setters to access these attributes, as well as the isEqual and toString methods as necessary
```java
public class Employee {

     private String name;
     private Integer age;
     // Default constructor
     public Employee() { }

     public void setName(String name) {
         this.name = name;
     }

     public String getName() {
         return name;
     }
     
     public void setAge(Integer age) {
         this.age = age;
     }

     public Integer getAge() {
         return age;
     }
}
```
Data classes are added on the Kotlin side for the specific purpose of model classes. Data classes make it possible to access properties directly. They also have several built-in utility functions like equals(), toString(), and copy ().
```kt
//Kotlin data class
data class Student(var name: String = "", var age: Int = 0)

//Example
var Employee: Employee = Employee("Ben White", 30)
```
Therefore, data classes are one of the best things Kotlin offers. They're designed to cut down on the amount of boilerplate code required for ordinary model classes.
### Global Variables
A global variable can be seen and used throughout the application. 

Because it is not contained as an Object, the static keyword in Java is used to supply global variables at the start of the program's execution. This indicates that it can be utilized without the need to first build an object.
 ```java
 public class myClass {
    public static int global number = 19;
}
// it can be called without initializing the class
myClass.globalNumber;
 ```
The static keyword is replaced in Kotlin by a companion object, which is similar to a singleton. It enables you to use to have access to various features like extensions and interfaces.
```kt
class myClass {
    companion object {
        val globalNumber = 19
    }
}
myClass.globalNumber
```
### Concurrency
This refers to a programming language's capacity to perform multiple tasks at once.

Java threads are mostly used to support concurrency. Making a thread in Java necessitates creating a class that extends the built-in Java thread class. The rest of its application should be uncomplicated.
```java
// Creating a thread in Java by extending    //the Thread class 
class MultithreadingDemo extends Thread 
{ 
    public void run() 
    { 
        try
        { 
            // Displaying the thread that is running 
            System.out.println ("Thread " + 
                  Thread.currentThread().getId() + 
                  " is running"); 
                  } 
        catch (Exception e) 
        { 
            // Throwing an exception 
            System.out.println ("An exception is caught"); 
        } 
    } 
} 
  // Main Class 
public class Multithread 
{ 
    public static void main(String[] args) 
    { 
        int x = 30; // Number of threads 
        for (int i=0; i<x; i++) 
        { 
            MultithreadingDemo object = new MultithreadingDemo(); 
            object.start(); 
        } 
    } 
} 
```
In Kotlin, threads are also available but what is used out of them is their coroutines. They are lightweight threads that excel in short non-blocking tasks.
```kt
for (x in 1..500)
    GlobalScope.launch {
        println(x)
    }
```
### Learning curve
Both Kotlin and Java have major differences in their implementations of various concepts in the application developments. But despite these differences, Java still reigns supreme in the community aspect which makes it easier to learn and get help. 
### Conclusion
In this article, we have seen clearly the differences between these two languages. However, Java takes the upper hand when it comes to the development of applications because it is easier to learn and implement.
