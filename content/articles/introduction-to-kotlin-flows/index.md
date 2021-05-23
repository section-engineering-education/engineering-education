---
layout: engineering-education
status: publish
published: true
url: /introduction-to-kotlin-flows/
title: Introduction to Kotlin Flows
description: This article will serve as an introduction to Kotlin Flows. A flow is a stream of multiple, asynchronously computed values. Flows emit values as soon as they are done computing them. A flow consists of a producer and a consumer. As the names suggest, a producer emits values while the consumer receives the values. 
author: peter-kayere
date: 2021-02-08T00:00:00-20:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-kotlin-flows/hero.jpg
    alt: Kotlin Flows example image
---
### Introduction
Suspending functions and/or coroutines launched with the `async` builder return single values. These values can be strings, integers, boolean, or even lists. But, what if we want to return multiple asynchronously computed values? Take the case of loading a large list from a database. 
<!--more-->
Using the default coroutine builders will return the whole list at once. However, this will take longer, and making our program slow. The best approach in this case would be to return single values after computation rather than the whole list. That's where flows come in.

### Prerequisites
To follow through with this tutorial, you will need to:
1. Have IntelliJ IDEA installed.
2. Have a basic understanding of [Kotlin](/kotlin-collections/) programming language.
3. Have a basic understanding of coroutines. Check this [article](/introduction-to-kotlin-coroutines/) to get started.

### What is a flow
A flow is a stream of multiple, asynchronously computed values. Flows emit values as soon as they are done computing them. A flow consists of a producer and a consumer. As the names suggest, a producer emits values while the consumer receives the values. 

Let's see how we can create and use flows in a Kotlin program.

### Step 1 — Creating a Kotlin project
In this step, we are going to create a Kotlin console project managed by Gradle.

Open IntelliJ and select `New Project`. On the next window, select Kotlin, console application. Choose the project JDK, download one if none is installed. 

![New project](/engineering-education/introduction-to-kotlin-flows/new-project.png)

Give the project a name and click next. Leave the next screen to default settings and click finish.

Wait for the project build to finish.

Flows are built on top of coroutines. 

Open the `build.gradle` file and add the following dependency.
```Gradle
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.2")
```

### Step 2 — Creating a producer
To create a flow, we need a producer. As we mentioned earlier, a producer emits values as soon as they are computed. Well, how do we create a producer? Open your `main.kt` file and replace the main function with the code below.

```Kotlin
suspend fun main() {
    val flow = flow {
        for (i in 1..10){
            delay(1000)
            emit(i)
        }
    }
}
```

We have marked the main function as suspending since it is later going to call other suspending functions. We use the flow builder to create a flow producer. The builder takes in an optional explicit type parameter. The type parameter is set to the emit value if none was explicitly typed. For our case, the flow emits an integer, therefore, the flow type is integer.

Our flow emits the integer values 1 to 10. We have used `delay` to simulate a long-running task. However, that's not enough. Running the main function now won't give you any output. First, we have to create a consumer to receive the values.

### Step 3 — Creating a consumer
A flow is a cold stream. Ooh, right, we mentioned that a flow is a stream, but we didn't say it was cold. 

What is a cold stream? 🤔

We have two types of streams, a cold and a hot stream. A cold stream does not start producing values until one starts to collect them. A hot stream on the other hand starts producing values immediately.

A flow is an example of a cold stream. Therefore, in order to get the values, we need to collect them. The flow builder gives us a special function `collect` to collect the values emitted by it. 

Add the following code in the main function.
```Kotlin
val job = GlobalScope.launch {
    flow.collect {
      println(it)
    }
}

job.join()
```

The `collect` function needs to be called inside a coroutine. Therefore, we launch a coroutine for it. The `collect` function takes in a lambda function that is called every time a value is received. In our case, we just print the value to the console. 

Run the main function. You should see a value displayed after one second.

That's it, you have created your first flow.

### Step 4 — Testing backpressure
One important feature that flows has is that they support backpressure. Backpressure occurs when a consumer consumes data slower than how the producer produces it. This can lead to a loss of data when the producer is not aware of backpressure. Luckily, flows are aware of backpressure. 

Let's prove that.

Add a delay of two seconds in the collect lambda function.
```Kotlin
delay(2000)
```

The function should look like this.
```Kotlin
val job = GlobalScope.launch {
    flow.collect {
      delay(2000)
      println(it)
    }
}
```

Run the main function. Notice that all values are displayed but with a delay of three seconds rather than two. This is because the producer and consumer run on the same coroutine by default. Thus, the delays sum up. To solve this, we use the `buffer` function, i.e, we run the consumer on a separate coroutine.

Replace the collect function with the following code.
```Kotlin
val job = GlobalScope.launch {
    flow.buffer().collect {
      delay(2000)
      println(it)
    }
}
```

Run the main function again. This time the delay is of two seconds which is what we expected.

However, the most important thing is that we have not lost any values, which means that flows really support backpressure.

### Conclusion
In this article, we have gone through the basics of flows in Kotlin. We have seen how flows are created and consumed. We have also proved that flows are aware of backpressure. This is all you need to get started with flows. Check their official [documentation](https://kotlinlang.org/docs/reference/coroutines/flow.html) for more details. 

Otherwise, I cant wait to see what you do with flows.

Happy coding!

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
