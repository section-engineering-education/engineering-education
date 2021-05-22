---
layout: engineering-education
status: publish
published: true
url: /introduction-to-kotlin-ktor/
title: Introduction to Kotlin Ktor
description: In this article, we will take a short look on how to set up a restful Ktor service. We will explore the basic architecture of applications using this framework.
author: linus-muema
date: 2021-02-21T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-kotlin-ktor/hero.jpg
    alt: Kotlin ktor image example
---
Kotlin is used to create different applications for different platforms. Server-side applications are no exception. Just like Java, Kotlin can be used to set up and run server side applications. There are several frameworks that can be used with Kotlin. For instance, all frameworks used with Java like [Spring](https://spring.io/) and [Spark](https://sparkjava.com/) have support for Kotlin. 
<!--more-->
Then there are those specifically meant to be use with Kotlin. One of them is [Ktor](https://ktor.io/). Ktor was created by Jetbrains, the same open source company that brought us Kotlin 😄.

Ktor is used to create server side applications with asynchronous programming in mind. Ktor is lightweight and has a great support for coroutines. 

It also has support for [Kotlin Multiplatform](https://kotlinlang.org/docs/reference/multiplatform.html); allowing cross platform capabilities.

In this article, we will take a quick look on how to set up a restful Ktor service. We will explore the basic architecture of applications using this framework.

### Prerequisites
You will need:
1. A basic understanding of the Kotlin programming language
2. A basic understanding of HTTP methods
3. IntelliJ IDE
4. Postman or an equivalent software.

### Step 1: Getting started
The first thing to do is to check whether the IDE has [Ktor plugin](https://plugins.jetbrains.com/plugin/10823-ktor) installed. It will help us create a new ktor project.

Open your IDE and select "New Project". Then go to the Ktor section to create a new ktor project. Ensure the settings are similar to the ones below.

![starter](/engineering-education/introduction-to-kotlin-ktor/start.png)

We are using `Gradle` and [`Netty`](https://netty.io/) engine for our server functionality. Gradle will handle our third party dependencies.

Once gradle build finishes, open the project's `build.gradle` file and add the Kotlin serialization plugin. This library is used to convert Java objects to JSON and vice versa. You can also use Gson or Moshi but in this article, we will be using the serialization library.

```bash
plugins {
    ...
    id 'org.jetbrains.kotlin.plugin.serialization' version "$kotlin_version"
}

dependencies {
    // Ktor core
    implementation "io.ktor:ktor-server-core:$ktor_version"

    // Netty
    implementation "io.ktor:ktor-server-netty:$ktor_version"

    // Ktor serialization support
    implementation "io.ktor:ktor-serialization:$ktor_version"

    // Serialization
    implementation "org.jetbrains.kotlinx:kotlinx-serialization-json:1.0.1"

}
```

Then open the `application.conf` file. This file configures the port and entry point of our application. For now we have only one module found in the `Application.kt` file.

### Step 2: Setting up data
We can use the kotlin `data class` to define our data models. Go ahead and create a file named task and add the following code.

```kotlin
@Serializable
data class Task(val id: Int, val name: String, val description: String)
```

The `Serializable` annotation allows the serialization library to convert this data class to Json and vice versa.

For now we will be using an `in-memory` database. This means that our data will be lost once the application closes. Add the following code inside the `Application.kt` file.

```kotlin
private val tasks = mutableListOf<Task>()
```

We will perform CRUD operations on the data in this list.

### Step 3: Defining routes
Routes are added to the `routing` lambda inside the module. Add the following code in the `Application.module` function.

```kotlin
fun Application.module(testing: Boolean = false) {
    install(ContentNegotiation){json()}
    routing {
        tasks()
    }

    // Bootstrap our application
    for (i in 0..5)
        tasks.add(Task(i, "Task $i", "Work on task $i"))
}
```

Since we will be posting data in the form of JSON, we add the content negotiation feature and enable JSON support. Content negotiation checks the `Accept` header in our requests to see whether the server can handle the data type used.

We also add a few dummy records in our list once the server starts.

To resolve the error in the routing object, create an extension function for the `Route` object. This will allow us to create endpoints for a specific route.

```kotlin
fun Route.tasks() {
    route("/tasks"){
    }
}
```

Here, we create an endpoint `/tasks`. We can then pass in the required HTTP methods in this route.

### Step 4: Paths and HTTP methods
You can define paths for an endpoint as functions inside the route lambda with the corresponding HTTP method.

1. Add the following method to get all the records.
```kotlin
// Get all Tasks
get {
    if (tasks.isNotEmpty())
        call.respond(tasks)
    else
        call.respondText("No Tasks available", status = HttpStatusCode.NotFound)
}
```

We first check if the list is not empty in order to return the data, otherwise, return an error. The `call` which is of type [`ApplicationCall`](https://ktor.io/docs/calls.html) gives us access to the request and response of the client.

> Test the endpoint on GET: http://0.0.0.0:8080/tasks

2. To get one `Task` using the id:
```kotlin
// Get one Task
get ("{id}"){
    val id = call.parameters["id"]?.toInt()
    val task = tasks.find { it.id == id }
    if (task == null)
        call.respondText("No task with that id exists", status = HttpStatusCode.NotFound)
    else
        call.respond(task)
}
```

In this path, we get the id parameter passed in the url. It is received as a string so we convert it to the required data type(Int). We then use it to get the task from our list.

> Test the endpoint on GET http://0.0.0.0:8080/tasks/1

3. To add `Task` objects to our list:
```kotlin
post {
    val task = call.receive<Task>()
    tasks.add(task)
    call.respondText("Task added successfully", status = HttpStatusCode.Accepted)
}
```

> Test the endpoint on POST:http://0.0.0.0:8080/tasks.
> Pass in the required JSON conforming to the data type in the request body.

4. To delete a `Task` using the id
```kotlin
delete ("{id}"){
    val id = call.parameters["id"]?.toInt()
    if (tasks.removeIf{it.id == id})
        call.respondText("Task deleted successfully", status = HttpStatusCode.Accepted)
    else
        call.respondText("No task with that id exists", status = HttpStatusCode.NotFound)
}
```

> Test the endpoint on DELETE:http://0.0.0.0:8080/tasks/1

You can go ahead and test all the endpoints on Postman.

### Conclusion
That is how create a restful service using ktor. It is very easy to set up and understand. You can go ahead and try other HTTP methods inside the `/tasks` route.

***NOTE: The route paths are character sensitive. The forward slash at the end of the endpoint is not ignored hence you should be careful when creating and testing the endpoints***

The full code of the tutorial can be found on [GitHub](https://github.com/LinusMuema/kotlin-ktor). Feel free to raise any issue or PR.

Happy coding.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
