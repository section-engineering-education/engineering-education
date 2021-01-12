### Kotlin Programming  for Beginners 
Learn Kotlin Programming, its basics, and Fundamentals from scratch. 

### Topics to be covered

1. Data Types and Variables 
    - Data Types and Variables
    - String, Literals and String Interpolation
    - Comments 

2. Constants, Variables and Data Types

3. Control Flow Statements 
    - IF ELSE 
    - IF Expressions
    - WHEN Expressions

4. Loop Control Statements 
    - What are Iterators?
    - FOR Loop and how it works
    - WHILE Loop
    - DO WHILE Loop 
    - BREAK statements 
    - CONTINUE keyword 
    - Labelled FOR Loop 

5. Functions and Interoperability 
    - Declaring functions 
    - Interoperability with Java code 
    - Function as Expressions 
    - Extension Functions
    - Infix Functions
    - Default Parameters
    - Named Parameters
    - Tailrec Functions 

6. Object Oriented Programming in Kotlin 
    - Defining Class and creating Objects
    - INIT block
    - Primary and Secondary Constructors 
    - Properties ( Field variables )
    - Inheritance
    - Method and Property Overriding 
    - Polymorphism 
    - Abstract Class, Property and Method
    - Interface 
    - Data Class
    - Object Declaration
    - Companion Object

7. Functional Programming in Koltin
    - Lambdas
    - Higher-Order Functions
    - Closures
    - 'it' keyword
    - 'with' function
    - 'apply' function

8. Collections in Kotlin
    - Arrays
    - List
    - Map and HashMap
    - Set and HashSet  

9. Sorting and Filtering
    - "filter" function
    - "map" function
    - Predicates: all, any, find, count. 

10. Kotlin NULL Safety
    - Safe call
    - with Let
    - Elvis
    - Lateinit keyword
    - Lazy delegation and 'lateinit' vs. 'lazy'


```kotlin
// Hello World 

fun main(args: Array<String>) {

    print("Hello World")
}

```

```kotlin
Output 

Hello World

```

 ### Defining Variable 

#### val 

It can be assigned a value only once 
They are immutable string
``` kotlin

fun main(args: Array<String>) {

    val x=2
    println( value x is : $x)
}

```

```kotlin
Output
2 
```

 #### Var

It can be reassigned a value after assigned locally
They are mutable string

```kotlin

fun main() {
    var y = 10
    y += 2

    println(y)
}
```

```
Output
12
```

#### Comments

Like in other programming languages comments are used to explain or highlight what you are talking about. It helps in the documentation for developers
Comments are ignored during code compilation

Comments are written in two version

### Using block comments

```kotlin

/*
* This is comment line 1
* */

```

``` kotlin
fun main(args: Array<String>) {    

     // This is an inline comment ...
    print("Hello World")
}

```

By use of double slashes `//`

```kotlin
fun main (){

    // This is a comment
}

```

### Data types

In kotlin data, types are all objects.
They include 

```kolin

Data types              Size   
     
Boolean                 1 bit
Byte                    8 bit
Char                    16 bit
Short                   16 bit
Int                     32 bit
Long                    64 bit
Float                   32 bit
Double                  64 bit

```

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
Characters are represented by the use of the keyword ``Char```. They can not be treated directly as numbers

```kotlin

fun main() {

    var gender: Char = 'M'

}

```

#### Boolean
Kotlin also contains Boolean types. It has two values of ``false`` and ``true``

```kotlin

fun main() {
    
    var isAlive: Boolean = true
}

```
 #### String

```kotlin

fun main(args: Array<String>) {

    var name: String
    name = "Steve"
    printlin(name)
}

```

```
Output 
Steve
```

#### Arrays

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

###  String Interpolation in Kotlin

```kotlin

fun main() {

    var rect = Rectangle()
    rect.length = 8
    rect.breadth = 5

    print("The length of the rectangle is ${rect.length} and breadth is 5. The area is ${rect.length * rect.breadth}")

}
```

```
Output
 The length of the rectangle is 8 and the breadth is 5. The area is 40

```

 ### Ranges

 Check if a number is within a range using `in` operator:

```kotlin 

fun main() {

    var range1 = 1..5
    // This range contains number 1, 2, 3, 4, 5

    val range2 = 5 downTo 1
    // This range contains number 5, 4, 3, 2, 1

    val range3 = 5 downTo 1 step 2
    // This range contains number 5, 3, 1

    val range4 = 'a'..'z'
    // This range contains the values from "a", "b", "c" . . . "z"

    var isPresent = 'c' in r4

    var countDown = 10.downTo(1)
    // This range contains number 10, 9, 8, 7, 6, 5, 4, 3, 2, 1

    var moveUp = 1.rangeTo(10)
    // This range contains number 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    
}

```

### Control Statements: if, when, for, while

#### A). `If` as Expression

In Kotlin, `if` is an expression, i.e. it returns a value. Therefore there is no ternary operator (condition ? then
: else), because ordinary if works in this role.

```kotlin

fun main()
    val a = 6

    val b = 10

    var maxValue: Int = if (a > b) {
                            print("a is greater")
                            a
                        } else {
                            print("b is greater")
                            b
                        }

    println(maxValue)
}

```

```kotlin

Output 

b is greater than 6

```

#### B). When Expression 

It is a replacement of the ``switch ``statement found in c or other languages  like Java, C++

```kotlin

fun main() {

    val x = 100

    val str: String  = when (x) {

        1 -> "x is 1"
        2 -> "x is 2"
        else -> {
            "x value is unknown"
            "x is an alien"
        }
    }

```

```kotlin

    output 
    x is an alien 

```

#### Iterators[LOOPS]

 #### A). `for` loop

 Syntax

 ```kotlin

 for(initializer in ranges){
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

    println(i)
    // 2,4,6,8,10

    for (i in 10 downTo 0) {

        if (i % 2 == 0) {
            println(i)
        }
    }
}

```

 #### B). `While` Loop

 Syntax

 ```kotlin

 // Initialize Counter
 while(condition){
     //Put your code here
     //Incremen or Decrement Counter
 }

 ```
  The flow of for loop is as follows

 condition check -> Code Execute -> Increement

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
    //2,4,6,8,10

    var j = 10
    while (j >= 0) {
        if (j % 2 == 0) {
            println(j)
        }
        j--
    }
}

```

 #### C). `do while` loop

 Syntax

 ```kotlin
 // Initialize Counter
 do(condition){
     //Put your code here
     //Incremen or Decrement Counter
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

    println()

    var j = 10

    do {
        if (j % 2 == 0) {
            println(j)
        }
        j--
    } while (j >= 0)
}
```

 #### Break and Continue in loops
  #### Break
 Break-terminates the nearest enclosing loop

 ``BREAK ``Keyword and Labelled ``FOR ``Loop

```kotlin
fun main(args: Array<String>) {

    for (i in 0..4) {
        println(i)

        if (i == 2) {
            break
        }
    }

    println(i) 
    //

    Loop@ for (i in 1..3) {
        for (j in 1..3) {
            println("$i  $j")
            if (i == 2 && j == 2)
                break@Loop
        }
    }
}

output
1  1
1  2
1  3
2  1
2  2


````
  #### Continue
It proceeds to the next step of the nearest enclosing loop

``CONTINUE`` Keyword and Labelled FOR Loop

```kotlin
fun main(args: Array<String>) {

    for (i in 1..10) {
        if (i == 3)
            continue
    }
        println(i)
  
    }

    output
    // 1,2,4,5,6,7,8,9
```
```kotlin
// CONTINUE Statement
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
// We skipped 2 2
Output
1  1
1  2
1  3
2  1
2  3
3  1
3  2

```
 #### FUNCTIONS 

 Function declarations
Functions in Kotlin are declared using the ``fun`` keyword:


```kotlin
fun main(args: Array<String>) {


    var sum = add(2, 4)

    println("Sum is " + sum)
}

fun add(a: Int, b: Int): Int {
    return a + b
}

Output
sum is 6
```

 ####  Default Functions
 We use @JvmOverloads for interoperability for kotlin since it was not available in java

```kotlin

fun main(args: Array<String>) {

    var result = findVolume(6, 5)
    print(result)
    
}
@JvmOverloads
fun findVolume(length: Int, breadth: Int, height: Int = 12): Int {

    return length * breadth * height
}

Output 

360

```
####  FUNCTIONS as Expressions



```kotlin
fun main(args: Array<String>) {

    var largeValue = max(4, 6)

    println("The greater number is $largeValue")
}

fun max(a: Int, b: Int): Int
                    = if (a > b) {
                        println("$a is greater")
                        a
                    } else {
                        println("$b is greater")
                        b
                    }

  ```  
  The greater number is 6                

   #### Named Parameters
   It is a pure kotlin feature since it's not available in java

```kotlin
fun main(args: Array<String>) {

    var result = findTheVolume(breadth = 6, length = 5)
    print(result)
}

fun findTheVolume(length: Int, breadth: Int, height: Int = 10): Int {

    return length * breadth * height
}

output
360

```
  #### Extension Functions: EXAMPLE ONE
  The purpose of the extension function in kotlin is to add a new function to the pre-defined classes
  The new functions added behaves like ``static``
  The importance of extension function they have few properties hence it reduces the code and makes it cleaner


```kotlin
fun main(args: Array<String>) {

    var student = Student()
    println("Pass status: " + student.hasPassed(57))

    println("Scholarship Status: " + student.isLearner(57))
}

fun Student.isLearner(marks: Int): Boolean {
    return marks > 95
}

class Student {         // OUR OWN CLASS

    fun hasPassed(marks: Int): Boolean {
        return marks > 40
    }
}

```
   #### Extension Functions: EXAMPLE TWO
```kotlin
fun main(args: Array<String>) {

    var str1: String = "Hello "
    var str2: String = "World"

    var str3: String = "Hey "

    println(str3.add(str1, str2))

    val x: Int = 6
    val y: Int = 10

    val greaterVal = x.greaterValue(y)

    println(greaterVal)
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

output 
10
```
   #### INFIX FUNCTIONS
  Infix`functions must satisfy the following requirements:

   They are member functions or extension functions;

   They  have a single parameter
   They have a prefix of ``infix``

   The parameter must not accept a variable number of arguments and must have no default value.

  


```kotlin
fun main(args: Array<String>) {

    val x: Int = 6
    val y: Int = 10

    val greaterVal = x findGreaterValue y   // x.findGreaterValue(y)

    println(greaterVal)
}

infix fun Int.findGreaterValue(other: Int): Int {       // INFIX and Extension Func

    if (this > other)
        return this
    else
        return other
}
      1. All INFIX Functions are Extension functions
        But all Extension functions are not INFIX
      2. INFIX Functions just have ONE PARAMETER

```

```kotlin
import java.math.BigInteger

/*
*   Tailrec Function : Recursive Functions
*       -> Prevents Stackoverflow Exception
*
*   Fibonacci Series
*       0  1  1  2  3  5  8  13  21 ......
* */
fun main(args: Array<String>) {

    println(getFibonacciNumber(10000, BigInteger("1"), BigInteger("0")))
}

tailrec fun getFibonacciNumber(n: Int, a: BigInteger, b: BigInteger): BigInteger {

    if (n == 0)
        return  b
    else
        return getFibonacciNumber(n - 1, a + b, a)
}

````

#### Class, Primary Constructor, Secondary Constructor, and Init Block


#### class in kotlin are declared using a keyword ``class``

class declaration consists of ``class name``, ``class header ``and ``class body``. 

```kotlin
class Model {  .....}
```
### Constructors 
We have a primary constructor and one or more secondary constructors

A class in Kotlin can have a primary constructor and one or more secondary constructors. The primary constructor is part of the class header: it goes after the class name (and optional type parameters).


```kotlin
 class Person constructor(firstName: String) {
     /*...*/ }
     

```
### Secondary constructors
The class can also declare secondary constructors, which are prefixed with ```constructor```:

```kotlin
class Person {
var children: MutableList<Person> = mutableListOf<>()
constructor(parent: Person) {
parent.children.add(this)
}
}
```
Class members
Classes can contain:

— Constructors and initializer blocks

— Functions

— Properties

— Nested and Inner Classes

— Object Declarations

```kotlin
fun main(args: Array<String>) {

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
  ####  Inheritance

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

class Cat : Animal() {      // Sub class / Child class / Derived class

    var age: Int = -1

    fun meow() {
        println("Meow")
    }
}
````

   1. Method Overriding
   As we mentioned before, we stick to making things explicit in Kotlin. So, Kotlin requires explicit modi ers for
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

   2. Property Overriding

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
fun main(args: Array<String>) {

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

````
 ####  Inheritance with Primary and Secondary Constructors

```kotlin 
fun main(args: Array<String>) {

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
fun main(args: Array<String>) {

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
functionality and utility functions are often mechanically derivable from the ``data ``. In Kotlin, this is called a
data class and is marked as ``data`` :

```kotlin
data class User(val name: String, val age: Int)
```
```kotlin
fun main(args: Array<String>) {

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
fun main(args: Array<String>) {

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

 An object declaration inside a class can be marked with the ``companion ``keyword:
 ```kotlin
class MyClass {
companion object Factory {
fun create(): MyClass = MyClass()
}
}
```
```kotlin
fun main(args: Array<String>) {

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
   
   
 EXAMPLE ONE

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
fun main(args: Array<String>) {

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
modified in the ``lambda ``:
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

  #### 1. 'it' keyword
```kotlin
fun main(args: Array<String>) {

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
fun main(args: Array<String>) {

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
  ```kotlin
fun main(args: Array<String>) {

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
fun main(args: Array<String>) {

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
fun main(args: Array<String>) {

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
   ``Set `` contains unique elements
   ``HashSet`` also contains unique elements but sequence is not guaranteed in output
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
  Returns a list containing only elements matching the given ``predicate``

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
fun main(args: Array<String>) {

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

A reference must be explicitly marked as ``nullable`` when ``null`` value is possible.
Return null if str does not hold an integer:

1. Safe Call ( ?. )
    Returns the length if 'name' is not null else returns NULL
    Use it if you don't mind getting NULL value
```kotlin
fun main(args: Array<String>) {

   // WAP to find out the length of the name

    val name: String? = "Steve"
    println("The length of name is ${name?.length}")


   ```

 2. Safe Call with let ( ?.let )
    It executes the block ONLY IF name is NOT NULL
```kotlin
  fun main(args: Array<String>) {

         name?.let {
        println("The length of name is ${name.length}")
    }

 }
```

 3. Elvis-operator ( ?: )
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
 4. Non-null assertion operator ( !! )
  Use it when you are sure the value is NOT NULL
Throws NullPointerException if the value is found to be NULL
```kotlin
    fun main(args: Array<String>) {


    println("The length of name is ${name!!.length}")
}
```
 ### Lazy delegation and `` lateinit `` vs. ``lazy``

 ### `` Lateinit`` keyword

 lateinit used only with mutable data type [ var ]
 lateinit used only with non-nullable data type
 lateinit values must be initialized before you use it
 If you try to access lateinit variable without initializing it then it throws Uninitialized Property Access Exception

```kotlin
fun main(args: Array<String>) {

    val country = Country()

//    country.name = "Kenya"
//    println(country.name)

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
### ``Lazy`` delegation 

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
fun main(args: Array<String>) {

    println("Some initial code.....")

    // pi is not initialized yet

    val area1 = pi * 4 * 4      // pi gets initialised and assigned the value of 3.14f for the first time

    val area2 = pi * 9 * 9      // The value pi is loaded from cache memory

    println("Some more code....")
}

```