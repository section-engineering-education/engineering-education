---
layout: engineering-education
status: publish
published: true
url: /sealed-classes-in-kotlin/
title: Sealed Classes in Kotlin
description: This article provides a step by step guide on how to use Sealed classes in Kotlin. These classes are powerful and can save significant time.
author: raphael-ndonga
date: 2021-04-13T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/sealed-classes-in-kotlin/hero.jpg
    alt: Sealed Classes in Kotlin
---
We can define a sealed class as a unique blend of an enum and an abstract class. Our tutorial will start by creating an enum class. As it grows more complex, we will be forced to switch to an abstract class.
<!--more-->
The sealed class will then finally step in, proving to be more powerful and convenient.
### Goal
This tutorial will demonstrate the best use case for a sealed class. 

### Prerequisites
1. A basic understanding of the Kotlin programming language.
2. A basic understanding of object-oriented programming concepts.
3. IntelliJ IDEA is preferred. If unavailable, the [Kotlin Playground](https://play.kotlinlang.org/) can be used.

### Table of contents
- What is an enum class
    - Example of an enum class use case
    - Summary of the enum class use case
- What is an abstract class
    - Using an abstract class for state management
    - Summary of the abstract class use case
- What is a sealed class
    - Using a sealed class for state management
    - Utilizing the full power of sealed classes
- Summary

### What is an enum class?
'Enum' is the short form of 'Enumerated type'. 'Enumerated type' comes from the English word 'enumerate'. To enumerate means to list things one by one. An enumerated type in programming is a type that contains a list of elements of the same type as the enumerated type.

### Example of an enum class use case
Open `main.kt`

Add the following code:
```kotlin
enum class LoadState{
    SUCCESS,
    LOADING,
    ERROR,
    IDLE
}
```

You have created an `enum` class that can keep track of the load state. 

Create a function `getStateOutput(loadState:LoadState)` next to `fun main()`. It will print a different string depending on the load state.

```kotlin
fun getStateOutput(loadState:LoadState){
    return when (loadState){

    }
}
```

Use the project quick fix to add the remaining branches.

> **Note** : The project quick fix is only available in IntelliJ IDEA. To access it click on the red-underlined `when` keyword. Press Alt+Enter in Windows or Option+Enter in Mac. Alternatively, you can click on the `lightbulb` that pops up. 

Select `add remaining branches`

Add the following strings to the branches.

```kotlin
fun getStateOutput(loadState:LoadState){
    return when(loadState){
        LoadState.SUCCESS -> {
            println("Successfully loaded data")
        }
        LoadState.LOADING -> {
            println("Still loading...")
        }
        LoadState.ERROR -> {
            println("ERROR")
        }
        LoadState.IDLE -> {
            println("IDLE")
        }
    }
}
```

Create a repository singleton that will mimic the fetching of data. Create the singleton using the `object` keyword as shown:

```kotlin
object Repository{
    private var loadState:LoadState = LoadState.IDLE
    //Data to be fetched when we startFetch()
    private var dataFetched:String? = null
    fun startFetch(){
        loadState = LoadState.LOADING
        dataFetched = "data"
    }
    fun finishFetch(){
        loadState = LoadState.SUCCESS
        //Return data fetched to its original state
        dataFetched = null
    }
    fun errorFetch(){
        loadState = LoadState.ERROR
    }
    fun getLoadState(): LoadState {
        return loadState
    }
}
```

Now play around with these methods in `fun main()`:

```kotlin
fun main(){
    Repository.startFetch()
    getStateOutput(Repository.getLoadState())
    Repository.finishFetch()
    getStateOutput(Repository.getLoadState())
    Repository.errorFetch()
    getStateOutput(Repository.getLoadState())
}
```

`output:`
```bash
    Still loading...

    Successfully loaded data

    ERROR
```

### Summary of the enum class use case
Enum classes are clearly useful when it comes to handling state. They easily keep track of things.

Now consider the following scenario:

What if you wanted to print a unique success message depending on the data fetched? You may also want to catch unique exceptions in errors. 

To implement the above functionality:
- `SUCCESS` will have to emit a unique string
- `ERROR` will have to emit a unique exception
- `LOADING` and `IDLE` remain generic. 

Using enum classes, we would have to do this:

```kotlin
enum class LoadState{
    SUCCESS(val data:String),
    LOADING,
    ERROR(val exception:Exception),
    NOTLOADING
}

```

The code above produces an error. This is because you can not represent `constants` differently in an enum class.

To solve this problem, you can inherit from an abstract class. This allows you to represent states differently.

### What is an abstract class?
An abstract class is a class whose functionality has not yet been implemented. It can be used to create specific objects that conform to its protocol.

### Using an abstract class for state management
Replace the enum class `LoadState` with the code below:

```kotlin
abstract class LoadState

data class Success(val dataFetched:String?):LoadState()
data class Error(val exception: Exception):LoadState()
object NotLoading:LoadState()
object Loading:LoadState()
```

`Success` can now emit a unique string `dataFetched`. `Error` can now emit a unique exception `exception`. All the states conform to the type LoadState. However, they are very different from each other.

Replace the code in `fun getStateOutput` with this:

```kotlin
fun getStateOutput(loadState:LoadState){
    return when(loadState){
        is Error-> {
            println(loadState.exception.toString())
        }
        is Success -> {
            //If the dataFetched is null, return a default string.
            println(loadState.dataFetched?:"Ensure you startFetch first")
        }
        is Loading-> {
            println("Still loading...")
        }
        is NotLoading -> {
            println("IDLE")
        }
        //you have to add an else branch because the compiler cannot know whether the abstract class is exhausted.
        else-> println("invalid")
    }
}
```

Replace the code in the `Repository` with this:
```kotlin
object Repository {
    private var loadState:LoadState = NotLoading
    private var dataFetched:String? = null

    fun startFetch(){
        loadState = Loading
        dataFetched = "Data"
    }
    fun finishFetch(){
        //passing the dataFetched to Success state.
        loadState = Success(dataFetched)
        dataFetched = null
    }
    fun errorFetch(){
        //passing a mock exception to the loadstate.
        loadState = Error(Exception("Exception"))
    }
    fun getLoadState(): LoadState {
        return loadState
    }
}
```

Run `fun main()` again.

`output: `
```bash
    Still loading...
    Data
    java.lang.Exception: Exception
```

### Summary of the abstract class use case
By extending an abstract class instead of using enums, you acquire the liberty to represent your states differently.

Sadly, there was something essential you lost along the way. The restricted set of types of enums. Now, the kotlin compiler is in a fix. It cannot tell whether the `when` statement's branches were exhaustive. That is why you had to add `else` as a branch.

This is where sealed classes come in. They provide the best of both worlds. You get the freedom to represent your states differently and also the restrictions that are typical of enums.

### What is a sealed class
A sealed class is an abstract class with a restricted class hierarchy. Classes that inherit from it have to be in the same file as the sealed class. 

This provides more control over the inheritance. They are restricted but also allow freedom in state representation.

### Using sealed classes for state management
In your code, replace the `abstract` keyword in `abstract class LoadState` with `sealed`.

After that, head over to the `else` branch in `fun getStateOutput()`. 

IntelliJ IDEA has the following error:
```bash
    'when' is exhaustive so 'else' is redundant here
```

This is because a sealed class is restricted. The compiler can tell when all the branches in the `when` statement have been listed. This means you can safely remove the redundant `else` branch.

### Utilizing the full power of sealed classes
Sealed classes can nest data classes, classes, objects, and also other sealed classes. The autocomplete feature shines when dealing with other sealed classes. This is because the IDE can detect the branches within these classes.

In your sealed class `LoadState`, replace the data class `Error` with this sealed class:

```kotlin
sealed class Error:LoadState(){
    data class CustomIOException(val ioException: IOException):Error()
    data class CustomNPEException(val npeException:NullPointerException):Error()
}
```

In the `fun getStateOutput()` delete the `is Error` branch and allow the IDE to fill the remaining branches. 

The final code of the function will look like this:

```kotlin
fun getStateOutput(loadState:LoadState){
    return when(loadState){
        is Success -> {
            //If there dataFetched is null, return this default string.
            println(loadState.dataFetched?:"Ensure you startFetch first")
        }
        is Loading-> {
            println("Still loading...")
        }
        is NotLoading -> {
            println("IDLE")
        }
        is Error.CustomIOException -> {
            println(loadState.ioException.toString())
        }
        is Error.CustomNPEException -> {
            println(loadState.npeException.toString())
        }
    }
}

```

In the `Repository`, delete the function `fun errorFetch()`. 

Add the following attributes:

```kotlin
    private val npeException = NullPointerException("There was a null pointer exception")
    private val ioException = IOException("There was an IO exception")
```

The attributes are exceptions that we will pretend to catch.

Add these functions to `Repository`:

```kotlin
    fun ioErrorFetchingData(){
        loadState = Error.CustomIOException(ioException)
    }
    fun npeErrorFetchingData(){
        loadState = Error.CustomNPEException(npeException)
    }

```

In `fun main()` replace `Repository.errorFetch` with the following code:
```kotlin
    Repository.ioErrorFetchingData()
    getStateOutput(Repository.getLoadState())
    Repository.npeErrorFetchingData()
    getStateOutput(Repository.getLoadState())
```

After running, the output will look like:
```bash
    Still loading...
    Data
    java.io.IOException: There was an IO exception
    java.lang.NullPointerException: There was a null pointer exception
```
### Summary
You started with enum classes. You saw how to take advantage of their restriction when handling state. 

Next, you encountered a limitation in enum classes. They lack the freedom to represent your states differently. You solved this issue by introducing abstract classes.

Lastly, you realized that you lost something essential. The restriction of enum classes. You got this back by replacing the abstract class with a sealed class. 

Hopefully, this article shines some light on sealed classes in Kotlin. For more information on sealed classes, check out the Android Developers Youtube video [Sealed classes-Kotlin Vocabulary](https://www.youtube.com/watch?v=OyIRuxjBORY).

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
