---
layout: engineering-education
status: publish
published: true
url: /data-streams-in-quarkus-using-reactive-streams-operator/
title: Getting Started With Quarkus
description: This tutorial will provide a step by step guide on how to build a Quarkas application using reactive stream operators
author: chris-mutua
date: 2021-11-02T00:00:00-08:50
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/hero.png
    alt: Quarkus project image example
---
A data stream is the continuous data sent from a source to a destination. Data Streams are essential in many applications.
<!--more-->
This is because some data types come in bits. An example of such data is that from weather forecasting instruments or a live video stream.

Since data streams are fetched continuously, they can be filtered to give the required output.

In this article, you will learn how to use SmallRye Reactive Streams Operator to work with data streams in a Quarkus project.

### Table of Contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#pre-requisites)
- [Create a new Quarkus project](#create-a-new-quarkus-project)
- [Add SmallRye-Reactive dependency to the project](#add-smallrye-reactive-dependency-to-the-project)
- [Reactive operators](#reactive-operators)
- [Ways in which one can work with Reactive Streams](#ways-in-which-one-can-work-with-reactive-streams)
- [Reactive operators types and examples](#reactive-operators-types-and-examples)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways
At the end of this article, you will have gained the following knowledge:
- Setting up SmallRye Reactive Streams Operator in Quarkus
- Implementing various operations using Reactive Streams Operator in Quarkus

### Prerequisites
To follow along, you need:
- Some knowledge of Java language.
- A Java IDE such as IntelliJ.
- A stable internet connection.

> Note that we will be using IntelliJ ultimate edition and JDK version 17 in this project.

### Create a new Quarkus project
Open the IDE and navigate to `file` section to create a new project. In the window displayed, input the following:

`Name`: quarkus-reactive-stream

`Group`: com.stream


![new quarkus project](/engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/new-quarkus-project.png)

Select the following as the dependencies:

![new quarkus project dependencies](/engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/new-quarkus-project-dependencies.png)
 
Finally, click on the `Finish` button.

#### Folder Structure
The following is the folder structure:

![folder structure](/engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/folder-structure.png)

### Add SmallRye-Reactive dependency to the project
To do this, copy the code below into the `pom.xml` file in the project under the `dependencies` tags:

```xml
<dependency>
  <groupId>io.smallrye.reactive</groupId>
  <artifactId>smallrye-reactive-streams-operators</artifactId>
</dependency>
```
Reload the project to add it automatically. You can do this by right-clicking on the `pom.xml` file, and under the `Maven` section, select `Reload project`:

![Reload project](/engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/reload-project.png)

Rename the `ExampleResource` class and the file to `StreamResource`.

Run the application on your terminal to check if the installation was successful:

```shell
./mvnw quarkus:dev
```

The installed dependencies are as shown below:

![Installed Quarkus dependencies](/engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/quarkus-dependencies.png)

To stop the operation, press `q` or a combination of `Ctrl + C`.

### Reactive Operators
Reactive operators introduce a set of types that allow the creation of Reactive streams.

They are as shown in the table below:

| The Reactive Streams  | Their Reactive Stream Operators  |
|---|---|
| Publisher  | PublisherBuilder  |
| Processor  | ProcessorBuilder  |
| Subscriber | SubscriberBuilder |

All Reactive Stream Operators are terminated using `build()`.

### Ways in which one can work with Reactive Streams
There are numerous ways in which one can work with Reactive Streams. These include injecting them into the project as Beans, and integrating them directly into the application.

In this section, we will discuss how to get started with Reactive Streams. 

#### Working with Reactive Streams directly in the application

##### Create a simple asynchronous stream
This asynchronous stream will be accessed through a GET request.

Inside the `StreamResource` class, copy the following code:

```java
    @GET
    @Path("/async")
    @Produces(MediaType.TEXT_PLAIN)
    public CompletionStage<String> helloAsync() {
        return ReactiveStreams.of("h","e","l","l","o")
        .map(s -> s.toUpperCase())
                .toList().run().thenApply(l -> l.toString());
    }
```

The above code will allow the `https://localhost:8080/hello/async` endpoint to generate an asynchronous stream.

The stream will then:
- Generate a stream of the characters `'h','e','l','l','o'` each being separate from the other
- Transform them to uppercase using the `.map()` function
- Lists all outputs
- Make them into a continuous string


Run the application. Then, on a separate terminal, run `curl http://localhost:8080/hello/asyncs`.

The result is as shown in the image below:

![Asynchronous stream display](/engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/async-display.png)

##### Working on an individual main class file
Create a new folder inside the `java/org` folder named `data`. Then, create a new Java class file called `Demo`.

Next, create a Reactive Stream that outputs the following words, "Hello Dev! Want to code today?". 

The code is as shown below:

```java
package org.data;

import org.eclipse.microprofile.reactive.streams.operators.PublisherBuilder;
import org.eclipse.microprofile.reactive.streams.operators.ReactiveStreams;

public class Demo {

    public static void main(String[] args) {

        /* A reactive stream that generates the words in uppercase and displays them */
        ReactiveStreams.of("Hello", "Dev!", "Want", "to", "code", "today?")
                .map(String::toUpperCase) // Transform the words to uppercase
                .filter(s -> s.length() > 1) // Filter the Stream items
                .forEach(word -> System.out.println(">>> " + word)) // Terminal operation
                .run(); // Run it (create the streams, and subscribe to it for output...)

    }
}
```
To run the application, navigate into the inbuilt terminal and launch a bash script as follows:

```shell
./mvnw compile exec:java -Dexec.mainClass=org.data.Demo
```

The above command will execute the necessary main class. Just reference it quickly using the package name or location.

The output is as follows:

![Quick quarkus class run](/engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/quick-quarkus-class-run.png)

#### Working with Reactive Streams as a Bean in the application
This section shall briefly deal with injecting a Java Bean into the application.

Inside the folder containing the `ExampleResource` file, create a new file and name it `StramBean.java`.

In the file, add the `ApplicationScoped` annotation to make it visible throughout the application:

```java
package com.stream;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamBean {


}
```

Next, add some functions used to create a counter that automatically increases, generates random numbers, and adds them together

```java
AtomicInteger counter = new AtomicInteger();

    Random rand = new Random(); //instance of random class
    int upperbound = 25;

    public int showRandom(){
        //generate random values from 0-24
        int int_random = rand.nextInt(upperbound);
        return int_random;
    }

    public int myNumber(){
        int x;
        x=counter.incrementAndGet() + showRandom();
        return x;
    }
```

Implement the below the `myNumber` function:

- Create a Publisher that outputs a continuous stream in a String form.
- It shall output a Streamflow that brings out results every 100 milliseconds.
- It also generates a random number.
- It then processes the data stream being generated e.g. by use of `filter()`, `takeWhile()`, `distinct()`, and `limit()` functions. These concepts shall be covered later in the article.

```java
    // It produces a stream
    public Publisher<String> stream() {

    // The output shall be displayed after every 100 millseconds as a continous stream
        return Flowable.interval(100, TimeUnit.MILLISECONDS)
                .map(i -> myNumber())
                .filter(i -> i>30).skip(41).takeWhile(i -> i<100)
                .distinct()
                .limit(5).map(i -> i + 1)
                .map(i -> i.toString());
    }
```

Import all the needed dependencies into the file using the IDE. Then, inject the Bean into the application by adding the following code under the `StreamResource` class:

```java
    @Inject
    StreamBean bean;
```

Next, add an `EndPoint` to allow the generation of the stream from the Bean when accessed as shown below:

```java
    /* 
     * Create a GET request that produces Server-Sent Events as the output
     * Its output will be the output from the Bean created
    */
    @GET
    @Path("/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Publisher<String> helloStream() {
        return bean.stream();
    }
```

> It produces an output of type `SERVER_SENT_EVENTS`.

Run the application to see the output that is generated in the terminal.

The above examples show that Reactive streams can also be produced directly or injected as a Bean into the application.

If one uses or wants to work with Camel applications or Vert.X application, check the [official docs](https://smallrye.io/smallrye-reactive-streams-operators/#_using_reactive_streams_operators_in_a_vert_x_application) for further details.

### Reactive Operators types and examples
Since we now understand basic aspects of Reactive Streams in a Quarkus application, let's discuss some common operator types and examples.

These operators are classified according to functionality. The table below shows the classification of the SmallRye Reactive Streams Operators:

| Category  | Usages and Examples  |
|---|---|
| **Creation of Streams** | It allows the API to create Streams using the PublisherBuilder  |
| **Processing of Streams** | Operators in this category transform Stream items |
| **Actions in Streams** | These operators allow one to react to different events happening in an application |
| **Error management of Streams** | These operators allow recovery after a stream failure |

#### Creation of streams
Operators in this category include the ones that do the following:

- Creation of empty streams.
- Creation of streams from elements.

| Operator  | Description | Operators |
|---|---|---|
| **Creation of empty streams** | This creates an empty Stream. It has no items of any type in it. | .empty() |
| **Creating streams from elements** | This creates a stream of either 0, 1 or n elements. | .of(), .ofNullable() |
| **Creation of failing streams** | These streams are meant to fail | .failed() |
| **Creation of streams from CompletionStage** | This operator creates a stream of either 0 or 1 element produced when the passed _CompletionStage_ is completed. | .fromCompletionStage(), .fromCompletionStageNullable() |
| **Creation of streams from collections** | This operator creates a stream that emits elements from the passed iterable, then sends the completion signal back. | .fromIterable() |
| **Wraps a Reactive Stream Publisher** | The operator creates a stream that emits the elements from the passed Publisher. | .fromPublisher() |
| **Generation of infinite streams** | The operator in this instance creates a stream using the generator method. Then the number of generated elements depends on the _request_. | .generate(), .iterate() |

Let's focus on the popular operators highlighted in the above table. We will add them to the 'Demo' class that we created earlier.

##### Creating streams from elements
Open the file in the IDE and paste the following code into it:

```java
// Utilizes the '.of()' operator to return an output of ten elements
ReactiveStreams.of(0,1,2,3,4,5,6,7,8,9)
        .forEach(number -> System.out.println(">>> " + number))
        .run();
```

This code generates a stream of many numbers. It then prints them on the console.

Next, create a publisher using the `PublisherBuilder()` method. Its return type will be of the 'Integer' type. It will be built from the above stream as follows:

```java
PublisherBuilder<Integer> streamOfMany = (PublisherBuilder<Integer>) ReactiveStreams.of(0,1,2,3,4,5,6,7,8,9)
        .forEach(number -> System.out.println(">>> " + number))
        .run();
```

##### Generation of infinite streams
One can generate infinite streams by using the `.iterate()` operator. One can also generate it using the following steps:

In the `GreetingResource.java` file, add the following code:

```java
    // Gets the output from the Bean
    // The output is of Integer type
    @GET
    @Path("/stream2")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Publisher<Integer> helloStream2() {
        return bean.stream2();
    }
```

Add the code below in the `StreamBean.java` file:

```java
// Generates infinite loop of numbers each 50 ms
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber());
        }
```

Run the main application using `./mvnw quarkus:dev`. You can access it on a new terminal using `curl http://localhost:8080/hello/stream2`.

#### Processing of Streams
As mentioned earlier, this kind of operator transforms Stream items that are transiting. Examples of this kind of operator are shown below:

| Operator | Description | Operators |
|---|---|---|
| **Creation of a processor** | The processor is a component from Reactive Streams that is both a Publisher and a Subscriber. It can consume and emit elements. | ProcessorBuilder<I, O> |
| **Filtering of elements** | These are quite popular. They filter items that are transiting in the stream (produces only the desired output) | .dropWhile(), .distinct(), .skip(), .filter(), .takeWhile(), .limit() |
| **Composition of asynchronous actions** | These operators produce a stream for each element of the stream. It then flattens (serializes) the stream that is returned | .flatMap(), .flatMapIterable(), .flatMapCompletionStage(), .flatMapRsPublisher() |
| **Transformation of items** | They produce a value synchronously | .map() |
| **Combination of a Processor** | It forwards the items to a Processor or a ProcessorBuilder() function | .via()  |

Now, let's get into popular and common Stream Processors.

##### Creation of a processor and Combination of a Processor
As mentioned earlier, its expected outcome is a processor that takes in an input and gives an output.

Inside the 'Demo' class, add the following code. It generates a processor with this format `processor(I, O)`; where `I` is the input and `O` the output.

```java
// Create a processor called 'SimpleProcessor'.
ProcessorBuilder<Integer, String> SimpleProcessor = ReactiveStreams
.<Integer>builder().map(i -> Integer.toString(i));

// Combine it to the application, and subscribe to it so that the outcome can be visible
ReactiveStreams.of(10, 20)
.via(SimpleProcessor)
.forEach(x -> System.out.println("-- " + x))
.run(); // ("10", "20")
```

This code will create a new processor. It also uses it to fetch the input and display it.

##### Filtering of elements
This type is widely used in Streams. It customizes the items to fit one's needs. The operators include:

Inside the infinite stream in the main application, add the following filters under the 'StreamBean.java' file:

-**filter**: This operator selects the element using a set of rules.

```java
// Will only output values above 30 but below 60
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber())
        .filter(i -> i>30);//filter
        }
```

**skip**: It neglects some elements in its input e.g. `.skip(41)`

```java
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber())
        .filter(i -> i>30)
        .skip(41);
        }
```

**takeWhile**: It acts like the `.filter()` function in some way. An example is shown below:

```java
public Publisher<Integer> stream2(){
    return Flowable.interval(50, TimeUnit.MILLISECONDS)
    .map(i -> myNumber())
    .filter(i -> i>30).takeWhile(i -> i<100);
    }
```
**distinct**: It makes sure that the output items in the stream are distinct from one another.

```java
/* In case the output was 1, 1, 1, 2, 3; then the output is 1,2,3 */
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber())
        .filter(i -> i>30).takeWhile(i -> i<100)
        .distinct(); //distinct
        }
```

**limit**: It stops adding elements to the stream after the size reaches the input value.

```java
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber())
        .filter(i -> i>30).takeWhile(i -> i<100)
        .distinct()
        .limit(5).map(i -> i + 1)
        .map(i -> i.toString());
        }
```

##### Composition of asynchronous actions
**flatMap**: It automatically returns a `PublisherBuilder()` and serializes the elements in the returned stream.

It looks as follows:

```java
ReactiveStreams.of(1, 2, 3)
    .flatMap(i -> ReactiveStreams.of(i, i, i)); // ((1, 1, 1, 2, 2, 2, 3, 3, 3)

ReactiveStreams.of(1, 2, 3)
    .flatMapIterable(i -> Arrays.asList(i, i, i))
     .forEach(x -> System.out.println("[ " + x + " ]"))
    .run(); // (1, 1, 1, 2, 2, 2, 3, 3, 3)
```

##### Transformation of items
The `.map()` operator is the most commonly used operator. It's used in the creation of a synchronous stream.

An example is shown below:

```java
        ReactiveStreams.of(1, 2, 3)
        .map(i -> i + 11)
        .forEach(i -> System.out.println("( " + i + " )"))
        .run(); // (12, 13, 14)
```

#### Action Reactive Stream operators
The most commonly used operator is the `.peek()`. It's called for each item. 

It does not alter the stream output but instead creates a separate small stream and performs as specified in its arguments. Its usage looks as follows:

```java
ReactiveStreams.of(1, 2, 3)
                .peek(i -> System.out.println("Receiving: " + i))
                .ignore()
                .run();
```

#### Reactive Error management operators
Let's now learn about Error management operators. They are essential since `Asynchronous streams` do not allow the usage of the Java _try/catch_ to catch on errors. 

Some of its categories are discussed below:

| Name | Description | Operators |
|---|---|---|
| **Error management operators based on events** | These facilitate reaction to various events e.g. when an element is received, an error or when the stream completes. | .onErrorResumeWith(), .onErrorResume(), .onErrorResumeWithRsPublisher() |
| **A Terminal operator and computation asynchronous result** | These Reactive operators act as subscribers. They produce a result that can be computed asynchronously. One can then retrieve a CompletionStage object. | '\<CompletionStage>' |
| **Cancellation of a stream** | As long as one is subscribed to a stream, the results of the publisher will continuously be shown. This operator cancels this subscription | .cancel() |
| **Ignoring of elements** | It ignores all elements transiting on the streams | .ignore() |
| **Result collection** | They accumulate the results, then does a batch processing of the whole items. | .collect(), .toList() , .reduce() |
| **Getting Streams first element** | If there are any item in the stream, it returns the first item | .findFirst() |
| **Execution of a method for each element**  | This is a terminal operation, unlike .peek(), that executes a method for each stream element. |  .forEach() |
| **Passing to a Reactive Streams Subscriber**  | It forwards the elements of a stream to a Subscriber or .SubscriberBuilder(). | .to()  |

Let's look at some common stream operators:

##### Ignoring elements
In the code below, the stream is on, but nothing will be displayed.

```java
ReactiveStreams.of( 1, 2, 3, 4, 5, 6, 7, 8, 9)
                .ignore()
                .run() // Subscribe
                .thenAccept(x -> System.out.println("Streaming is Done!"));
```

##### Result collection
It adds up all the streams together after the stream ends.

```java
ReactiveStreams.of(10, 20, 30, 40)
                .collect(Collectors.summingInt(x -> x))
                .run()
                // Produces 100
                .thenAccept(result -> System.out.println("Result is: " + result));
```

##### Getting the first element in a stream
This operator can be easily applied as follows:

```java
ReactiveStreams.of(9, 8, 7, 6, 5)
                .findFirst()
                .run()
                // Produces [9]
                .thenAccept(number -> System.out.println(number));
```

##### Execution of a method for each element
This operator acts as an iterator in some way, as shown below:

```java
ReactiveStreams.of(9, 8, 7, 6, 5)
                .forEach(z -> System.out.println("The app is Receiving " + z))
                .run();
```

##### Passing to a Reactive Streams Subscriber
Lastly, this is how one can pass stream items to a `Reactive Subscriber`:

```java
        SubscriberBuilder<Integer, Optional<Integer>> SimpleSubscriber = ReactiveStreams.<Integer>builder()
        .map(i -> i + 1)
        .findFirst();

        ReactiveStreams.of(9, 8, 7, 6, 5)
        .to(SimpleSubscriber)
        .run()
        // Produces [10] since 1 is added to the first element
        .thenAccept(optional -> optional.ifPresent(result -> System.out.println("Result: " + result)));
```
*****

### Conclusion
In this article, we have learned:
- What Reactive Stream Operators are.
- Setting up SmallRye Reactive Streams Operator in Quarkus
- Some Operations that can be done using Reactive Streams Operator in Quarkus
- Classification of the SmallRye Reactive Stream Operators based on functionality

### Further reading
- [Quarkus Documentation](https://quarkus.io/guides/)
- Quarkus SmallRye Reactive Streams Operators [documentation](https://smallrye.io/smallrye-reactive-streams-operators/#_using_reactive_streams_operators_in_a_vert_x_application)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)
