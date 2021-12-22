---
layout: engineering-education
status: publish
published: true
url: /introduction-to-kotlin-coroutines/
title: Introduction to Kotlin Coroutines
description: This article shows you some of the basics of writing asynchronous code using coroutines. Coroutines help us consecutively write asynchronous code while not using callbacks.
author: peter-kayere
date: 2021-01-25T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-kotlin-coroutines/hero.jpg
    alt: Kotlin Coroutines example image
---
Coroutines were introduced in Kotlin 1.1. They brought about a new way of writing asynchronous, non-blocking code. An asynchronous code (from asynchronous programming) is code that runs parallel to others. It is also called `non-blocking` since it does not block the main thread. Asynchronous programming helps in running multiple unrelated tasks faster. In synchronous programming, the code is executed line by line.
<!--more-->
### Introduction
This means that in a program of five statements, the fifth statement is only executed after all the other statements are done. However, asynchronous programs run each statement/function parallel to each other. This article goes through some of the basics of writing asynchronous code using coroutines.

### Prerequisites
To follow through this tutorial, you will need to:
- Have IntelliJ installed.
- Have a basic understanding of the Kotlin programming language.

### Step 1 — Creating a Kotlin project
In this step, we are going to create a console kotlin project that is managed by `gradle`.

Open IntelliJ and select `new project`.

On the next window, select kotlin, console application.

Choose the project JDK, download one if none is installed.

![New project](/engineering-education/introduction-to-kotlin-coroutines/new-project.png)

Give the project a name and click `next`. Leave the next screen to default settings and click finish.

Wait for the project build to finish.

Open the `build.gradle` file and add the following dependency.
```bash
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.2")
```

We are all set. Let's now create our first coroutine.

### Step 2 — Creating our first coroutine
A coroutine is like a lightweight thread. All coroutines run on a pool of threads. Coroutines help us sequentially write asynchronous code.

Write the following code inside the main function.
```Kotlin
GlobalScope.launch {
        delay(2000)
        print("World")
    }
println("Hello ")
Thread.sleep(3000)
```

Upon running the main function, `World` appears two seconds after `Hello`.

We use the `launch` coroutine builder to launch a coroutine. The coroutine needs to be launched in a scope.

A scope is used to control the lifecycle of a coroutine. Here, we have used the `GlobalScope`, that means that the coroutine will be limited to the lifecycle of the application.

The `delay` function is a suspending function. We will talk about suspending functions later in the article. The `delay` function pauses the coroutine rather than the thread. Pausing a thread is performance-costly since all tasks in the thread will be paused.

We have used the `Thread.sleep` function to wait for the coroutine to finish. If you leave it out. The main function will finish execution before the coroutine does, thus the output will be `Hello`. However, since we have to avoid sleeping the thread, we can use another coroutine builder known as `runBlocking`. The `runBlocking` coroutine builder blocks the thread until the coroutine has finished executing.

Replace `Thread.sleep` with:
```Kotlin
runBlocking { delay(3000) }
```

This does the same task but using delay rather than `Thread.sleep`.

### Step 3 — Joining and canceling coroutines
In the previous step, we saw how to launch a coroutine. However, the code above fires and forgets. It just lets the coroutine run. We can neither wait for it nor cancel it. 

We used `delay` to force the main thread to wait for the coroutine to finish. This works for the example but cannot be applied in real-world applications. This is because we cannot determine how long the coroutine will take to finish execution.

Joining a coroutine can be seen as waiting for it. A coroutine builder returns a `Job` object. It is on this object that we can use the `join` function to wait on the coroutine. Let's try that out.

Go back to the main function. Store the coroutine job in a variable.
```Kotlin
val job: Job = GlobalScope.launch {
    delay(2000)
    print("World")
}
```

Now use the variable to call the `join` function below it.
```Kotlin
job.join()
```

Oops! we get an error after adding that function. This is because the `join` function is a suspending function, and suspending functions can only be called in a coroutine or other suspending functions. 

To solve this error, wrap the whole code in a `runBlocking` coroutine builder as shown.
```Kotlin
runBlocking {
    val job = this.launch {
        delay(2000)
        print("World")
    }
    println("Hello ")
    job.join()
}
```

Now run the program. The program runs as expected; `Hello` appears first then `World` appears after two seconds.

Coroutines are automatically canceled when they finish their 'job'. However, we might want to cancel an ongoing coroutine due to certain reasons, such as the coroutine running for a long time. The `Job` object gives us the `cancel` function. As the name suggests, it cancels the coroutine. Let's see it in practice.

Replace the main function with the following code.
```Kotlin
runBlocking {
    val job = this.launch {
        delay(10000)
        print("World")
    }
    println("Hello ")
    delay(5000)
    job.cancel()
    job.join()
}
```

The program above prints `Hello` and stops after five seconds. We use `delay` to simulate a long-running task. The coroutine that should display `World` delays for ten seconds whereas the main coroutine delays for five seconds. This indicates that the function expects the coroutine to finish in five seconds, which is not the case. 

Therefore, we cancel the coroutine since it has taken more time than expected. Notice that we have also used the `join` function. This waits for the coroutine to finish canceling. Since these two methods are used together most of the time, a function that combines these two steps was created. It is called `cancellAndJoin`. It does the same task but with less code.

### Step 4 — Returning values from a coroutine
Not all coroutines are fire and forget, we sometimes need to return a value from a coroutine. To do this, we use the `async` coroutine builder. This builder returns a `Deferred` object of the type returned by the coroutine. We use the `await` function of the deferred object to get the result. Let's look at an example.

Copy the following code in the main function.
```Kotlin
runBlocking {
    val job1 = this.async {
        delay(2000)
        500
    }

    val job2 = this.async {
        delay(2000)
        700
    }
    print(job1.await() + job2.await())
}
```

In the code above, we create two jobs. These jobs return deferred integer values. We use the delay function to simulate a heavy operation. By using the `await` function, the program waits for the coroutines to return their results before doing the addition.

### Step 5 — Suspending functions
Through the previous steps, we have seen how to start and manage coroutines. However, how can we extract the workload of a specific coroutine to a function? Well, that's very simple. 

We use the `suspend` keyword to declare a function as a coroutine. Marking a function as a suspending function gives it the ability to call other suspending functions like `delay`. This also restricts them to be called inside coroutines or other suspending functions only.

The alternative to wrapping our main code in a `runBlocking` builder, is to mark it as suspending. This will allow it to call other suspending functions.

This is how our main functions will look like.
```Kotlin
suspend fun main() {
    val job1 = GlobalScope.async {
        delay(2000)
        500
    }

    val job2 = GlobalScope.async {
        delay(2000)
        700
    }
    print(job1.await() + job2.await())
}
``` 

It will still give the same result.

#### Concurrency test
Let's test whether the coroutines run in parallel.

Write the following code in the main function.
```Kotlin
suspend fun main() {
    val timeTaken = measureTimeMillis {
        val jobs = (1..1000).map {
            GlobalScope.launch {
                delay(2000)
            }
        }
        jobs.joinAll()
    }
    println(timeTaken)
}
```

Here, we create an array of one thousand coroutines. Each coroutine delays for two seconds. We have used the `measureTimeMillis` method to measure the time taken to complete the tasks. If the coroutines don't run in parallel, our function will take two thousand seconds to complete. However, the function takes about two seconds to run on my machine. This clearly shows that these coroutines do run in parallel.

### Conclusion
This article has gone through the basics of writing asynchronous code using coroutines. Coroutines help us consecutively write asynchronous code. We don't use callbacks as in other libraries. We have seen how coroutines are launched, joined to, and canceled. 

We have also seen how we can obtain values from coroutines and how to create suspending functions. This artice is meant to be a foundation for coroutines. You can discover other features from their [documentation](https://kotlinlang.org/docs/reference/coroutines-overview.html). I hope you find this useful. 

Happy coding!

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
