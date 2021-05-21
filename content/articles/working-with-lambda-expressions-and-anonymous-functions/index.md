---
layout: engineering-education
status: publish
published: true
url: /working-with-lambda-expressions-and-anonymous-functions/
title: Working with Lambda Expressions and Anonymous Functions
description: Lambda expressions can be challenging to understand. This article aims to simplify the concept behind lambda expressions and how to use them.
author: raphael-ndonga
date: 2021-03-21T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/working-with-lambda-expressions-and-anonymous-functions/hero.png
    alt: Lambda expressions and Anonymous functions image
---
Lambda expressions can be challenging to understand. Types that look like this: `(Int) -> String` are not intuitive to many developers. This article aims to simplify the concept behind lambda expressions and how to use them.
<!--more-->
### Introduction
A lambda expression is a function that you pass only as an expression. Lambda expressions have the following structure: `{}`. They are a specialized language construct that helps represent functions in Kotlin.
### Prerequisites
Before we continue it is important to have the following:
1. A basic understanding of the Kotlin programming language.
2. Either IntelliJ IDEA or access to [Kotlin Playground](https://play.kotlinlang.org/)

### Table of contents
1. What is a lambda expression.
2. A use case of lambda expressions.
3. Summary.

### What is a Lambda Expression?
Unlike in Java, functions in Kotlin are first class. This means that you can store them as variables and in data structures. You can pass them as arguments and can they also be a return value.

Since you can store them as variables, they must have a type. Kotlin uses function types to represent them. Function types have the following structure:

`(parameterType) -> returnType`

Variables that are function types expect a lambda expression as demonstrated below:

- `val a:Int` expects a value such as `1`,`2` or `3`.

- `val b:String` expects a value such as `"string"` or `"name"`.

- `val c:Boolean` expects a value such as `true` or `false`.

In that spirit:

- `val d:() -> Int` expects a value such as `{1}` or `{2}`

- `val e:() -> String` expects a value such as `{"string"}` or `{"name"}`

When we introduce parameters:

`val f:(Int) -> String` expects a value such as `{"string"}` or `{"name"}`

>**Note**: You don't have to use the value passed in the parameter. But you have to respect the return type and return the appropriate value.

Higher-order functions are functions that can have lambda expressions passed into them. They can also return lambda expressions. You can find these definitions in the [official docs](https://kotlinlang.org/docs/lambdas.html)

When working with all functions, there are 3 main steps to follow:

**Step 1. Creating the function:** this involves giving the function its name, parameters, and return type.

**Step 2. Implementing the function:** this is where you define the task that the function should execute.

**Step 3. Calling the function:** here you call the function and give it the parameters it requires to perform its task.

> **Note**: This article refers to functions in the context of functional programming. In object-oriented programming, you can use interfaces and abstract classes. They can postpone function implementation. Later, you can override the function when you implement the interface or inherit the class.

### A use case of lambda expressions
Regular functions are created in the same place where they implement their functionality. 

Have a look at this function:

```kotlin
fun add(a:Int, b:Int){
    val sum = a + b
    println("The sum is $sum")
}

fun main(){
    add(1,2)
}
```

The function is created and the implementation of the task is then added after the lambda `{`. We then call the `add` function and the `main` function.

`output: The sum is 3`

Lambda expressions are created in one place, but they can implement their functionality elsewhere. 

In the code below, there are 2 functions to keep track of.

1. `add` is a higher-order function because it takes `printer` as a parameter.
2. `printer` is our lambda expression which is of type `(Int)->Unit`.

Change the `add` function as follows in your your editor:

```kotlin
fun add(a:Int, b:Int, printer:(Int) -> Unit){
    val sum = a+b
    printer(sum)
}
```

We will notice that in the code above:

- `add` has been created and implemented as a regular function should be. It is yet to be called in the `main` function. This allows `add` to use the same implementation to carry out different calls.

- `printer` has been handled differently. It was created and called, but its implementation is not available yet. It will be implemented in the `main()` function as we call the `add` function.

In the final step add this code to your main function:

```kotlin
fun main(){
    add(2,4,{ value-> println("The sum is $value") })
    add(3,5,{value-> println("The addition gives $value") })
}
```

In the code above, we pass in the implementation of our lambda expression through the higher-order function. We also give the parameter passed into the lambda the name `value`. This shows that the implementation of a lambda expression can be easily changed. 

The expected output should be:

`The sum is 6`

`The addition gives 8`

#### Summary
Lambda expressions allow you to treat functions as variables in different ways. They even allow you to pass different operations as the implementation of the function, as you would pass different values to a variable. Go ahead and explore other use cases for lambda expressions!

Happy coding.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
