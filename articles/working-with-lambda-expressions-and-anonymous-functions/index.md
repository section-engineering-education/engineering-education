### Introduction
Lambda expressions can be challenging to understand. Types that look like this: `(Int)->String` are not intuitive to many developers. This article aims to simplify the concept behind them.

### Prerequisites
1. A basic understanding of the Kotlin programming language.

2. Either IntelliJ IDEA or access to Kotlin Playground(link below):
https://play.kotlinlang.org/

### Table of Contents
1. What is a lambda expression.
2. An example use case of a lambda expression.
3. Summary.

### What is a Lambda Expression?
A lambda expression is a function that you pass only as an expression. Lambda expressions have the following structure: `{}`. They are a specialized language construct that help represent functions in Kotlin.
Kotlin functions are first class, unlike in Java. This means that they you can store them as a variable and in data structures. You can pass them as arguments and can also be a return value. 
Since they can you can store as variables, they must have a type.
Kotlin uses function types to represent these functions.
Function types have the following structure:
`(parameterType)->returnType`

Variables that are function types expect a lambda expression as demonstrated below:

* `val a:Int` expects a value such as `1`,`2` or `3`.

* `val b:String` expects a value such as `"string"` or `"name"`.

* `val c:Boolean` expects a value such as `true` or `false`.

In that spirit:

* `val d:()->Int` expects a value such as `{1}` or `{2}`

* `val e:()->String` expects a value such as `{"string"}` or `{"name"}`

When we introduce parameters:

`val f:(Int)->String` expects a value such as `{"string"}` or `{"name"}`

Note that you don't have to use the value passed in the parameter. But you have to respect the return type and return the appropriate value.

Higher order functions are functions that can have lambda expressions passed into them. They can also return lambda expressions.
You can find these definitions in the official docs:
https://kotlinlang.org/docs/lambdas.html

When working with all functions, there are 3 main steps to follow:

Step 1. Creating the function. This involves giving the function its name,  parameters and return type.

Step 2. Implementing the function. This is whereby you code the task that the function should perform.

Step 3. Calling the function. Here you call the function and give it the parameters it requires to perform its delegated task.

> **Note**: This article refers to functions in the context of functional programming. In object oriented 
programming, you can use interfaces and abstract classes. They can postpone function implementation. Later, you can override the function when you implement the interface or inherit the class.

### Example

Regular functions are created in the same place where they implement their functionality. 
Have a look at this function:
```kotlin
//The function is created (Step 1)
fun addAndPrintWithoutLambdas(a:Int,b:Int){
//The function implementation starts after  the lambda'{' (Step 2)
 val sum = a + b
 println(“The sum is $sum”)
}
fun main(){
add(1,2)
//The function has been called. (Step 3)
}
```
`output: The sum is 3`

Lambda expressions are created in one place, but they can implement their functionality elsewhere.
Note that in the code below, there are 2 functions to keep track of.
1. `addAndPrintUsingLambdas` is a higher order function because it takes `lambdaPrinter` as a parameter.
2. `lambdaPrinter` is our lambda expression which is of type `(Int)->Unit`.

Add the following function to your editor:

```kotlin
//addAndPrintUsingLambdas is created(Step 1).
fun addAndPrintUsingLambdas(a:Int,b:Int,lambdaPrinter:(Int)->Unit){
 //lambdaPrinter function has been created in the parameters of addAndPrintUsingLambdas.(Step 1)
 val sum = a+b
    lambdaPrinter(sum)
 //lambdaPrinter function has been called.(Step 3)
//addAndPrintUsingLambdas has been implemented.(Step 2)
}
```

Note that in the code above:
- `addAndPrintUsingLambdas` has been created and implemented, as a regular function should behave. 
It is yet to be called in `fun main()`. This is allows `addAndPrintUsingLambdas` to use the same implementation to carry out different calls. 
- `lambdaPrinter` has been handled differently. It was created and called, but its implementation is 
not available. It is yet to be implemented in `fun main()` within `addAndPrintUsingLambdas`. This 
allows `addAndPrintUsingLambdas` to use the same call to carry out different implementations.

In the final step add this code to your main function:

```kotlin
fun main(){
//addAndPrintUsingLambdas is finally called.(Step 3)
    addAndPrintUsingLambdas(2,4,{sum->
        //Note that passing 'sum' this way is accessing the paramter passed in lambdaPrinter(sum)
        println("The sum is $sum")

        //The lambda expression is finally implemented through the higher order function.(Step 2)
    })
    addAndPrintUsingLambdas(3,5,{sum->
        println("The addition gives $sum")
    })
//This is to show that implementation of a lambda expression can be changed.(Step 2)
}
```
`output: The sum is 6`

`output: The addition gives 8`

#### Summary
Lambda expression allow you to treat functions as variables in every way. They even allow you to pass different operations as the implementation of the function,  as you would pass different values to a variable.

