---
layout: engineering-education
status: publish
published: true
url: /engineering-education/kotlin-basics/
title: Kotlin Programming for Beginners 
description: Learn Kotlin Programming, its basics, and Fundamentals from scratch.
author: stephen-chacha
date: 2021-01-12T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kotlin-basics/hero.png
    alt: kotlin basics image
---

#### Introduction
Learn Kotlin Programming, its basics, and Fundamentals from scratch.

Kotlin was announced in 2017 by google, and it supported the features that were presented by Java.
Kotlin is a statically typed language. It is also known as JVM(Java Virtual Machine)language because it needs JVM to execute its bytecode. Since kotlin is a JVM language, it's interoperable with languages like Java. It supports null pointer exception and immutability. It is object-oriented, supports functions and has less code making it cleaner than other JVM languages.

#### Prerequisites
For you to follow along with this tutorial:
- You need to have Kotlin editor preferably [IntelliJ](https://www.jetbrains.com/idea/download/#section=windows) installed on your machine
- Or refer to **repl.it** [click here](https://repl.it/join/uovhpspi-stephenchacha).

### Topics to be covered
1. Data Types and Variables
2. Constants, Variables, and Data Types
3. Control Flow Statements
4. Loop Control Statements
5. Functions and Interoperability
6. Object Oriented Programming in Kotlin
7. Functional Programming in Kotlin
8. Kotlin NULL Safety
 
```kotlin
fun main(args: Array<String>) {
    print("Hello World")
}

// Output: Hello world
```

### 1. Defining Variables

#### `val`
val is used to declare a variable. It can be assigned a value only once. They are immutable variables.

``` kotlin
fun main(args: Array<String>) {
    val x = 2
    println("value x is : $x")
}

// Output: 2
```

 #### `var`
var is also used to declare a variable but can be reassigned a value after being assigned locally. They are mutable.

```kotlin
fun main() {
    var y = 10
    y += 2
    println(y)
}

// Output: 12
```
#### Comments
Like in other programming languages comments are used to explain or highlight what you are talking about. It helps in the documentation for developers. They are ignored during code compilation.

Comments can be written in two ways:

* Using block comments
```kotlin
/*
* This is comment line 1
* This is comment line 2
* */

```

* By use of double forward slashes
```kotlin
// This is a comment
```


### Data types
In kotlin data, types are all objects. They include:

| Data type         | size          |
|-------------------|:-------------:|
| Boolean           | 1 bit         |
| Byte              | 8 bit         |
| Char              | 16 bit        |
| Short             | 16 bit        |
| Int               | 32 bit        |
| Long              | 64 bit        |
| Float             | 32 bit        |
| Double            | 64 bit        |

#### Numbers
Kotlin provides a set of built-in types that represent numbers.
For integer numbers, there are four types with different sizes and, hence, value ranges.

```kotlin
fun main() {
    val num1= 1 //Int
    val One_Billion=1000000000 //Long
    val num1 = 53L // Long
    val num2 = 3.14 // Double  
    var marks: Float = 287.4F

    var age: Int = 10 // immidiate assignment
    var myAge = 10   // int type is inferred
    
    println(num1)
    //1
    println(num2)
    //3.14

    println(myAge)
    // 10
    println(marks)
    // 287.4
}
```


#### Characters
Characters are represented by the use of the keyword `Char`. They can not be treated directly as numbers

```kotlin
fun main() {
    var gender: Char = 'M'
}
```

#### Boolean
Kotlin also contains Boolean types. The values can either be `false` or `true`

```kotlin
fun main() {
    var isAlive: Boolean = true
}
```
 #### String
```kotlin
fun main() {
    var name: String
    name = "Steve"
    println(name)
}

// Output: Steve
```

##### String Interpolation in Kotlin
You can add variables in between a string using string interpolation.

```kotlin
fun main(){
    val age = 20
    println("I am $age years old")
}
```

Expressions and operations can also be added to a string provided they return a value.

```kotlin
fun main(){
    val age = 20
    println("Tomorrow I will be ${age + 1} years old")
}
```
### Control Statements

#### 1. `If` as Expression
In Kotlin, `if` is an expression, i.e. it returns a value. Therefore there is no ternary operator (condition ? then
: else), because ordinary if works in this role.

```kotlin
fun main(){ 
    val a = 6 
    val b = 10 
    var maxValue: Int = 
        if (a > b) { 
            print("a is greater")
            a 
        } else { 
            print("b is greater")
            b 
        }
    
    println(maxValue) 
}
```

#### 2. When Expression 
It is a replacement of the `switch` statement found in C or other languages  like Java, C++

```kotlin
fun main() {
    val x = 100
    val str: String = when (x) {
        1 -> "x is 1"
        2 -> "x is 2"
        else -> "x value is unknown"
    }
    println(str)
}
    
// Output: x value is unknown
```

#### Iterators

 #### 1. `for` loop

 Syntax

 ```kotlin
 for(initializer in ranges/collection){
     //put your code here
 }
 ```
 The flow of for loop is as follows
 Initialize-> condition check -> Code Execute -> Increement

 ```kotlin
fun main() {

    for (i in 1..10) {
        if (i % 2 == 0) {
            println(i)
        }
    }
    // output: 2,4,6,8,10

    for (i in 10 downTo 0) {
        if (i % 2 == 0) {
            println(i)
        }
    }

    // Output : 8,6,4,2,0
}
```

 #### 2. `While` Loop

 Syntax

 ```kotlin
 // Initialize your counter
 while(condition){
     //Put your code here
     //increment or decrement your counter
 }
 ```

The flow of for loop is as follows:

`condition check -> Code Execute -> Increament`

```kotlin 
fun main(args: Array<String>) {

    var i = 0
    while (i <= 10) {
        if (i % 2 == 0) {
            println(i)
        }
        i++
    }

    println(i)
    //Output: 2,4,6,8,10,11

    var j = 10
    while (j >= 0) {
        if (j % 2 == 0) {
            println(j)
        }
        j--
    }
    
    println(j)
    // Output: 10,8,6,4,2,0,-1
}
```

 #### 3. `do while` loop

 Syntax
 ```kotlin
 // Initialize counter
 do(condition){
     //Put your code here
     //increment or decrement counter
 } while (condition)
 ```

```kotlin 
fun main() {
    
    var i = 0
    do {
        if (i % 2 == 0) {
            println(i)
        }
        i++
    } while (i <= 10)
    
    // Output : 0,2,4,6,8,10

    var j = 10
    do {
        if (j % 2 == 0) {
            println(j)
        }
        j--
    } while (j >= 0)
    
    // Output : 10,8,6,4,2,0
}
```

 #### Break and Continue in loops
 
  #### Break
  
 Break terminates the nearest enclosing loop

 * `break` Keyword in a labelled `for` loop

```kotlin
fun main(args: Array<String>) {

    for (i in 0..4) {
        println(i)
        if (i == 2) {
            break
        }
    }
    
    Loop@ for (i in 1..3) {
        for (j in 1..3) {
            println("$i  $j")
            if (i == 2 && j == 2)
                break@Loop
        }
    }
}

/**
* Output
* 0
* 1
* 2
* 1  1
* 1  2
* 1  3
* 2  1
* 2  2
*/
```
#### Continue
It proceeds to the next step of the nearest enclosing loop

* `cotinue` Keyword in a labelled `for`

```kotlin
fun main() {
    for (i in 1..10) {
        if (i == 3)
            continue
        println(i)
    }
    
    // Output : 1,2,4,5,6,7,8,9,10
}
```

```kotlin
fun main(args: Array<String>) {
    Loop@ for (i in 1..3) {
        for (j in 1..3) {
            if (i == 2 && j == 2) {
                continue@Loop
            }
            println("$i  $j")
        }
    }
}

/**
* Output
* 1  1
* 1  2
* 1  3
* 2  1
* 3  1
* 3  2
* 3  3
*/
```
 #### Functions
Functions in Kotlin are declared using the `fun` keyword:

```kotlin
fun main(args: Array<String>) {
    var sum = add(2, 4)
    println("Sum is " + sum)
}

fun add(a: Int, b: Int): Int {
    return a + b
}

// Output: sum is 6
```

 ####  Default parameters
 We use `@JvmOverloads` for interoperability for kotlin since it was not available in java. This allows for default parameters to be used in case they are not provided when the function is called.

```kotlin
fun main(args: Array<String>) {
    var result = findVolume(6, 5)
    print(result)
}

@JvmOverloads
fun findVolume(length: Int, breadth: Int, height: Int = 12): Int {
    return length * breadth * height
}

// Output: 360
```
####  Functions as Expressions

```kotlin
fun main(args: Array<String>) {
    var largeValue = max(4, 6)
    println("The greater number is $largeValue")
}

fun max(a: Int, b: Int): Int = if (a > b) a else b

// Output : The greater number is 6 

```               

#### Named Parameters
It is a pure kotlin feature since it's not available in java. Kotlin allows you to assign arguments names when passing them into a function.

```kotlin
fun main() {
    var result = findTheVolume(breadth = 6, length = 5)
    print(result)
}

fun findTheVolume(length: Int, breadth: Int, height: Int = 10): Int {
    return length * breadth * height
}

// Output: 360
```

#### Extension Functions
The purpose of the extension function in kotlin is to add a new function to the pre-defined classes. The new functions added behave like `static` functions. The advantage of using extension functions is that they have few properties hence they reduce the code making it cleaner

* Example 1 :
```kotlin
fun main() {
    var student = Student()
    println("Pass status: " + student.hasPassed(57))
    println("Scholarship Status: " + student.isLearner(57))
}

fun Student.isLearner(marks: Int): Boolean {
    return marks > 95
}

// Our custom class
class Student {       
    fun hasPassed(marks: Int): Boolean {
        return marks > 40
    }
}
```

* Example 2:   
```kotlin
fun main(args: Array<String>) {

    var str1: String = "Hello "
    var str2: String = "World"
    var str3: String = "Hey "
    
    println(str3.add(str1, str2))

    val x: Int = 6
    val y: Int = 10
    
    println(x.greaterValue(y))
}


fun String.add(s1: String, s2: String): String {
    return this + s1 + s2
}

fun Int.greaterValue(other: Int): Int {
    if (this > other)
        return this
    else
        return other
}

// Output : Hey Hello World
// Output: 10
```

#### Infix Functions
Infix functions must satisfy the following requirements:

* They are member functions or extension functions
* They  have a single parameter
* They have a prefix of `infix`
* The parameter must not accept a variable number of arguments and must have no default value.

```kotlin
fun main(args: Array<String>) {
    val x: Int = 6
    val y: Int = 10

    val greaterVal = x findGreaterValue y   // x.findGreaterValue(y)

    println(greaterVal)
}

infix fun Int.findGreaterValue(other: Int): Int {
    if (this > other)
        return this
    else
        return other
}

// Output : 10
```

1. All infix functions are extension functions but all extension functions are not infix
2. Infix functions have one parameter

```kotlin
import java.math.BigInteger

/*
*   Tailrec Function : Recursive Functions
*       -> Prevents Stackoverflow Exception
*
*   Fibonacci Series
*       0  1  1  2  3  5  8  13  21 ...
* */

fun main() {

    println(getFibonacciNumber(10000, BigInteger("1"), BigInteger("0")))
}

tailrec fun getFibonacciNumber(n: Int, a: BigInteger, b: BigInteger): BigInteger {

    if (n == 0)
        return  b
    else
        return getFibonacciNumber(n - 1, a + b, a)
}
```

### Classes
Classes in kotlin are declared using a keyword `class` .Class declaration consists of `class name`, `class header`, and `class body`. 

```kotlin
class Model { }
```
#### Constructors 
A class in Kotlin can have a primary constructor and one or more secondary constructors. The primary constructor is part of the class header: it goes after the class name (and optional type parameters).


```kotlin
 class Person constructor(firstName: String) { }
```

### Secondary constructors
The class can also declare secondary constructors, which are prefixed with the `constructor` keyword:

```kotlin
class Person {
    var children = mutableListOf<Person>()
    constructor(parent: Person) {
        parent.children.add(this)
    }
}
```

### Class members
Classes can contain:

* Constructors and initializer blocks
* Functions
* Properties
* Nested and Inner Classes
* Object Declarations

```kotlin
fun main() {
    var student = Student("Steve", 10)
    println(student.id)
}

class Student(var name: String) {

    var id: Int = -1
    init {
        println("Student has got a name as $name and id is $id")
    }

    constructor(n: String, id: Int): this(n) {
        // The body of the secondary constructor is called after init block
        this.id = id
    }
}
```

### Inheritance

```kotlin 
fun main(args: Array<String>) {

    var dog = Dog()
    dog.bread = "labra"
    dog.color = "black"
    dog.bark()
    dog.eat()

    var cat = Cat()
    cat.age = 7
    cat.color = "brown"
    cat.meow()
    cat.eat()

    var animal = Animal()
    animal.color = "white"
    animal.eat()
}

open class Animal {         
    // Super class / Parent class /  Base class
    var color: String = ""
    fun eat() {
        println("Eat")
    }
}

class Dog : Animal() {      
    // Sub class / Child class / Derived class
    var bread: String = ""
    fun bark() {
        println("Bark")
    }
}

class Cat : Animal() {
    // Sub class / Child class / Derived class
    var age: Int = -1
    fun meow() {
        println("Meow")
    }
}
```

**1. Method Overriding**
   
As we mentioned before, we stick to making things explicit in Kotlin. So, Kotlin requires explicit modifiers for
overridable members (we call them open) and for overrides:

```kotlin
open class Shape {
open fun draw() { /*...*/ }
fun fill() { /*...*/ }
}
class Circle() : Shape() {
override fun draw() { /*...*/ }
}
```

   **2. Property Overriding**

   Overriding properties works in a similar way to overriding methods; properties declared on a superclass
that is then redeclared on a derived class must be prefaced with ``override``, and they must have a
compatible type. Each declared property can be overridden by a property with an initializer or by a property
with a get method.

```kotlin
open class Shape {
open val vertexCount: Int = 0
}
class Rectangle : Shape() {
override val vertexCount = 4
}
```

```kotlin
fun main() {

    var dog = MyDog()

    println(dog.color)

    dog.eat()
}

open class MyAnimal {

    open var color: String = "White"

    open fun eat() {
        println("Animal Eating")
    }
}

class MyDog : MyAnimal() {

    var bread: String = ""

    override var color: String = "Black"

    fun bark() {
        println("Bark")
    }

    override fun eat() {
        super<MyAnimal>.eat()
        println("Dog is eating")
    }
}
```

 ####  Inheritance with Primary and Secondary Constructors

```kotlin 
fun main() {

    var dog = TheDog("Black", "Pug")
}

open class TheAnimal {      
    // Super class / Parent class /  Base class 

    var color: String = ""

    constructor(color: String) {
        this.color = color
        println("From Animal: $color")
    }
}

class TheDog : TheAnimal {   
     // Sub class / Child class / Derived class

    var bread: String = ""

    constructor(color: String, breed: String): super(color) {
        this.bread = breed

        println("From Dog: $color and $breed")
    }
}
```

 ####  Abstract Class

 A class and some of its members may be declared abstract. An abstract member does not have an
implementation in its class. Note that we do not need to annotate an abstract class or function with open – it
goes without saying.
We can override a non-abstract open member with an abstract one

```kotlin
open class Polygon {
open fun draw() {}
}
abstract class Rectangle : Polygon() {
abstract override fun draw()
}
```

```kotlin
fun main() {

//    var person = MyPerson()   // Not allowed. You cannot create instance of abstract class

    var person = Indian()       // Allowed. Abstract Super class reference variable
                                // pointing to child class object.
    person.name = "Steve"
    person.eat()
    person.goToSchool()
}

abstract class MyPerson {     // you cannot create instance of abstract class

    abstract var name: String

    abstract fun eat()      // abstract properties are 'open' by default

    open fun getHeight() {} // A 'open' function ready to be overridden

    fun goToSchool() {}     // A normal function
}

class Indian: MyPerson() {

    override var name: String = "dummy_indian_name"

    override fun eat() {
        // Our own code
    }
}
```

 ####  INTERFACE
 
 Interfaces in Kotlin can contain declarations of abstract methods, as well as method implementations. What
makes them different from abstract classes is that interfaces cannot store state.  They can have properties
but these need to be abstract or to provide accessor implementations.
An interface is de ned using the keyword interface

```kotlin
interface MyInterface {
fun bar()
fun foo() {
// optional body
}
}
Implementing Interfaces
A class or object can implement one or more interfaces
class Child : MyInterface {
override fun bar() {
// body
}
}
```

```kotlin
fun main(args: Array<String>) {

    var myButton = MyButton()
    myButton.onTouch()
    myButton.onClick()
}

interface MyInterfaceListener {     // You cannot create the instance of interface

    fun onTouch()                   // Methods in interface are abstract by default

    fun onClick() {                 // Normal methods are public and open by default but NOT FINAL
        println("MyInterfaceListener: onClick")
    }
}

interface MySecondInterface {       // You cannot create the instance of interface

    fun onTouch() {                 // Normal Method
        println("MySecondInterface: onTouch")
    }

    fun onClick() {                 // Normal methods are public and open by default but NOT FINAL
        println("MySecondInterface: onClick")
    }

}

class MyButton: MyInterfaceListener, MySecondInterface {

    override fun onTouch() {
        super<MyInterfaceListener>.onClick()
        super<MySecondInterface>.onClick()
    }

    override fun onClick() {
        super.onTouch()
    }
}

```

 #### Data Class

 We frequently create classes whose main purpose is to hold data. In such a class some standard
functionality and utility functions are often mechanically derivable from the `data`. In Kotlin, this is called a
data class and is marked as `data` :

```kotlin
data class User(val name: String, val age: Int)
```

```kotlin
fun main() {

    var user1 = User("Sam", 10)

    var user2 = User("Sam", 10)

    println(user1.toString())

    if (user1 == user2)
        println("Equal")
    else
        println("Not equal")

    var newUser = user1.copy(id = 25)
    println(newUser)
}

data class User(var name: String, var id: Int)

```

 ####  1. Object Declaration
 
```kotlin
fun main() {

    CustomersData.count = 98
    CustomersData.typeOfCustomers()

    println(CustomersData.typeOfCustomers())

    CustomersData.count = 109
    println(CustomersData.count)

    CustomersData.myMethod("hello")
}

open class MySuperClass {

    open fun myMethod(str: String) {
        println("MySuperClass")
    }
}

object CustomersData: MySuperClass() {     
     // Object Declaration

    var count: Int = -1             
    // Behaves like a STATIC variable

    fun typeOfCustomers(): String { 
        // Behaves like a STATIC method
        return "Indian"
    }

    override fun myMethod(str: String) { 
        // Currently, behaving like a STATIC method
        super.myMethod(str)
        println("object Customer Data: $str")
    }
}
```

 ####  1. Companion Object

 An object declaration inside a class can be marked with the `companion` keyword:
 
 ```kotlin
class MyClass {
companion object Factory {
fun create(): MyClass = MyClass()
}
}
```

```kotlin
fun main() {

    MyClass.count      // You can print it and check the result

    MyClass.typeOfCustomers()
}

class MyClass {

    companion object {

        var count: Int = -1  // Behaves like STATIC variable

        @JvmStatic
        fun typeOfCustomers(): String { // Behaves like STATIC method
            return "Indian"
        }
    }
}
```
   
 **EXAMPLE ONE**

  1. Lambda Expression
  2. Higher-Order Function
  
```kotlin
fun main(args: Array<String>) {

    val program = Program()

    program.addTwoNumbers(2, 7)     // Simple way... for better understanding

    program.addTwoNumbers(2, 7, object : MyInterface {   // Using Interface / OOPs way

        override fun execute(sum: Int) {
            println(sum)    // Body
        }
    })

    val test: String = "Hello"

    val myLambda: (Int) -> Unit = { s: Int -> println(s)}   // Lambda Expression [ Function ]
    program.addTwoNumbers(2, 7, myLambda)
}

class Program {

    fun addTwoNumbers(a: Int, b: Int, action: (Int) -> Unit) {  // High Level Function with Lambda as Parameter

        val sum = a + b
        action(sum)     // println(sum)
//        println(sum)  // Body
    }

    fun addTwoNumbers(a: Int, b: Int, action: MyInterface) {    // Using Interface / Object Oriented Way
        val sum = a + b
        action.execute(sum)
    }

    fun addTwoNumbers(a: Int, b: Int) {                         // Simple way.. Just for Better Understanding

        val sum =  a + b
        println(sum)
    }
}

interface MyInterface {
    fun execute(sum: Int)
}
```

 EXAMPLE TWO

  1. Lambda Expression
  2. Higher-Order Function

  A higher-order function is a function that takes functions as parameters, or returns a function.

```kotlin

fun main() {

    val program = MyProgram()

//    val myLambda: (Int, Int) -> Int = { x, y -> x + y}  // Lambda Expression [ Function ]
// OR,
//    program.addTwoNumbers(2, 7, { x, y -> x + y })
// OR,
    program.addTwoNumbers(2, 7) {x, y -> x + y}
}

class MyProgram {

    fun addTwoNumbers(a: Int, b: Int, action: (Int, Int) -> Int) {  // High Level Function with Lambda as Parameter

        val result = action(a, b)
        println(result)
    }
}
```

  #### 1. Closures
  
  A lambda expression or anonymous function (as well as a local function and an object expression) can
access its closure, i.e. the variables declared in the outer scope. The variables captured in the closure can be
modified in the `lambda`:

```kotlin
fun main(args: Array<String>) {

    val program = TheProgram()

    var result = 0

    program.addTwoNumbers(2, 7) {x, y -> result = x + y}

    println(result)
}

class TheProgram {

    fun addTwoNumbers(a: Int, b: Int, action: (Int, Int) -> Unit) {  // High Level Function with Lambda as Parameter

        action(a, b)
    }
}
```

### 1. 'it' keyword
  
```kotlin
fun main() {

    val program = Programs()
    program.reverseAndDisplay("hello", { it.reversed() })
}

class Programs {

    fun reverseAndDisplay(str: String, myFunc: (String) -> String) {  // High Level Function with Lambda as Parameter

        val result = myFunc(str)    // it.reversed() ==> str.reversed() ==> "hello".reversed() = "olleh"
        println(result)
    }
}

```

  ###  1. 'with' function
  ###  2. 'apply' function

```kotlin
fun main() {

    var person = Perrson()

    with(person) {
        name = "Steve"
        age = 23
    }

    person.apply {
        name = "Steve"
        age = 23
    }.startRun()

    println(person.name)
    println(person.age)
}

class Person {

    var name: String = ""
    var age: Int = -1

    fun startRun() {
        println("Now I am ready to run")
    }
}
```

### 1. Arrays

An array is an indexed collection of items that all have the same type. To create an array, we use the `arrayOf ` function

Arrays in Kotlin are represented by the Array class, which has to get and set functions (that turn into [] by
operator overloading conventions), and size property, along with a few other useful member functions:

####  Creating array

```kotlin

val Continents = arrayOf("Africa", "Europe", "Asia")
```

 #### Accesing array

 ```kotlin
val firstContinent = Continents[0] // firstContinent= "Africa"
```

#### Repacing of index

```kotlin

Continents[0] = "Australia"
```
  
  ```kotlin
fun main() {

    // Elements :   32  0   0   54  0
    // Index    :   0   1   2   3   4

    var myArray = Array<Int>(5) { 0 }   // Mutable. Fixed Size.
    myArray[0] = 32
    myArray[3] = 54
    myArray[1] = 11

    for (element in myArray) {              // Using individual elements (Objects)
        println(element)
    }

    println()

    for (index in 0..myArray.size - 1) {
        println(myArray[index])
    }
}

```
 ### 1. List and ArrayList 
 
```kotlin

fun main() {

    // Elements :
    // Index    :   0   1   2   3   4

//    var list = mutableListOf<String>()  // Mutable, No Fixed Size, Can Add or Remove Elements
//    var list = arrayListOf<String>()    // Mutable, No Fixed Size, Can Add or Remove Elements
    var list = ArrayList<String>()      // Mutable, No Fixed Size, Can Add or Remove Elements
    list.add("Yogi")        // 0
    list.add("Manmohan")    // 1
    list.add("Vajpayee")    // 2

//    list.remove("Manmohan")
//    list.add("Vajpayee")

    list[1] = "Modi"

    for (element in list) {             // Using individual elements (Objects)
        println(element)
    }
}
```

 ###  1. Map and HashMap

```kotlin
fun main() {

    // Map Tutorial: Key-Value pair
//    var Map = HashMap<Int, String>()      // Mutable, READ and WRITE both, No Fixed Size
//    var Map = mutableMapOf<Int, String>() // Mutable, READ and WRITE both, No Fixed Size
    var Map = hashMapOf<Int, String>()      // Mutable, READ and WRITE both, No Fixed Size

    Map.put(4, "Yogi")
    Map.put(43, "Manmohan")
    Map.put(7, "Vajpayee")

    Map.put(43, "Modi")

    for (key in Map.keys) {
        println("Element at $key = ${Map[key]}")  // Map.get(key)
    }
}
```
 ###  1. Set and HashSet
 
   `Set` contains unique elements
   `HashSet` also contains unique elements but sequence is not guaranteed in output
   
```kotlin
 fun main(args: Array<String>) {
 
    var Set = mutableSetOf<Int>( 2, 50, 3, 1, 0, 9, 9, 9, 8)   // Mutable Set, READ and WRITE both
    var Set2 = hashSetOf<Int>( 2, 54, 3, 1, 0, 9, 9, 9, 8)     // Mutable Set, READ and WRITE both

    Set.remove(50)
    Set.add(90)

      Set2.remove(3)
    Set2.add(10)

    for (element in Set) {
        println(element)
    }

    for (element in Set2) {
        println(element)
    }
}
```
  ### FILTER
  
  Returns a list containing only elements matching the given `predicate`

  You can lter maps with the filter() function as well as other collections. When calling filter() on a
map, pass to it a predicate with a Pair as an argument. This enables you to use both the key and the value
in the ltering predicate.

```kotlin
val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key11" to 11)
val filteredMap = numbersMap.filter { (key, value) -> key.endsWith("1") && value > 10}
println(filteredMap)
```

### PREDICATES

 ```kotlin
fun main(args: Array<String>) {

    val Numbers = listOf(2, 3, 4, 6, 23, 90)

    val Predicate = { num: Int -> num > 10 }

    val check1 = Numbers.all( Predicate )       // Are all elements greater than 10?
    println(check1)

    val check2 = Numbers.any(Predicate)         // Does any of these elements satisfy the predicate?
    println(check2)

    val totalCount: Int = Numbers.count(Predicate) // Number of elements that satify the predicate.
    println(totalCount)

    val num = Numbers.find(Predicate)           // Returns the first number that matches the predicate
    println(num)
}
```
 
### MAP

  Returns a list containing the results of applying the given [transform] function
  to each element in the original collection
  In maps, types of both keys and values are user-de ned. Key-based access to map entries enables various
map-specific processing capabilities from getting a value by key to separate filtering of keys and values.

```kotlin
fun main() {

    val Numbers: List<Int> = listOf(2, 3, 4, 6, 23, 90)

    val SmallNums = Numbers.filter { it < 10 }    // OR { num -> num < 10 }
    for (num in SmallNums) {
        println(num)
    }

    val SquaredNums = myNumbers.map { it * it }     // OR { num -> num * num }
    for (num in SquaredNums) {
        println(num)
    }

    var people = listOf<Pperson>(Pperson(10, "Steve"), Pperson(23, "Annie"), Pperson(17, "Sam"))
    var names = people.filter { person ->person.name.startsWith("S") }.map { it.name }

    for (name in names) {
        println(name)
    }
}

class Pperson(var age: Int, var name: String) {
    // Some other code...
}
```

###  Null safety

A reference must be explicitly marked as `nullable` when `null` value is possible.
Return null if str does not hold an integer:

1. Safe Call ( ?. )
    Returns the length if 'name' is not null else returns NULL
    Use it if you don't mind getting NULL value
    
```kotlin
fun main() {

   // WAP to find out the length of the name

    val name: String? = "Steve"
    println("The length of name is ${name?.length}")
```

 2. Safe Call with let ( `?.let` )
    It executes the block ONLY IF name is NOT NULL
    
```kotlin
  fun main(args: Array<String>) {

         name?.let {
        println("The length of name is ${name.length}")
    }

 }
```

 3. Elvis-operator ( `?:` )
 When we have nullable reference 'name', we can say "is name is not null", use it,
 otherwise use some non-null value"
 
```kotlin
    fun main(args: Array<String>) {
    val len = if (name != null)
        name.length
    else
        -1

    val length = name?.length ?: -1
    println("The length of name is ${length}")

    }
```

 4. Non-null assertion operator ( `!!` )
  Use it when you are sure the value is NOT NULL
Throws NullPointerException if the value is found to be NULL

```kotlin
    fun main(args: Array<String>) {
    println("The length of name is ${name!!.length}")
}
```
### Lazy delegation and `lateinit` vs `lazy`

### `Lateinit` keyword

 lateinit used only with mutable data type `var`
 lateinit used only with non-nullable data type
 lateinit values must be initialized before you use it
 If you try to access lateinit variable without initializing it then it throws Uninitialized Property Access Exception

```kotlin
fun main() {

    val country = Country()
    country.setup()
}

class Country {

    lateinit var name: String

    fun setup() {
        name = "Kenya"
        println("The name of country is $name")
    }
}

```

### `Lazy` delegation 

 Lazy initialization’ was designed to prevent unnecessary initialization of objects.
 Your variables will not be initialized unless you use them in your code
 It is initialized only once. Next time when you use it, you get the value from cache memory.

 It is thread safe
 It is initialized in the thread where it is used for the first time.
 Other threads use the same value stored in the cache

 The variable can be var or val.
 The variable can be nullable or non-nullable


```kotlin
val pi: Float by lazy {
    3.14f
}
```

```kotlin
fun main() {

    println("Some initial code.....")

    // pi is not initialized yet

    val area1 = pi * 4 * 4      // pi gets initialised and assigned the value of 3.14f for the first time

    val area2 = pi * 9 * 9      // The value pi is loaded from cache memory

    println("Some more code....")
}
```

### Conclusion

In this tutorial we have learned the basics of Kotlin programming language. Kotlin skills can be applied in a bunch of fields not limted to Android development and backend systems programming. 

