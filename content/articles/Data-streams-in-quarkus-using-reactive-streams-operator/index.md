---
layout: engineering-education
status: publish
published: true
url: /data-streams-in-quarkus-using-reactive-streams-operator/
title: Getting Started With Quarkus
description: In this tutorial, we will get started on Quarkus data streams and learn how to build a Quarkas application using recative stream operators
author: chris-mutua
date: 2021-10-15T00:00:00-11:50
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/data-streams-in-quarkus-using-reactive-streams-operator/hero.png
    alt: Quarkus project image example
---

_Data Streams_ can be defined as continuous data sent or received from a data source to a destination. Data Streams are essential in applications.
This importance is because some data types come in bits as time goes by.
An example of such data is that from weather forecasting instruments or that from a live video stream.
Since the data streams will be fetched continuously, they can be filtered to give the required output as pleased.

This article will teach one how to use SmallRye Reactive Streams Operator to work with data streams in a Quarkus project.

### Table of Contents

- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [Create a new Quarkus project](#create-a-new-quarkus-project)
  - [Folder Structure](#folder-structure)
- [Add SmallRye-Reactive dependency to the project](#add-smallrye-reactive-dependency-to-the-project)
- [Reactive Operators](#reactive-operators)
- [Ways in which one can work with Reactive Streams](#ways-in-which-one-can-work-with-reactive-streams)
  - [Work with Reactive Streams directly in the application](#work-with-reactive-streams-directly-in-the-application)
    - [Create a simple asynchronous stream](#create-a-simple-asynchronous-stream)
    - [Work on an individual main class file](#work-on-an-individual-main-class-file)
  - [Work with Reactive Streams as a Bean in the application](#work-with-reactive-streams-as-a-bean-in-the-application)
- [Reactive Operators types and examples](#reactive-operators-types-and-examples)
  - [Creation of Streams](#creation-of-streams)
    - [Creating streams from elements](#creating-streams-from-elements)
    - [Generation of infinite streams](#generation-of-infinite-streams)
  - [Processing of Streams](#processing-of-streams)
    - [Creation of a processor and Combination of a Processor](#creation-of-a-processor-and-combination-of-a-processor)
    - [Filtering of elements](#filtering-of-elements)
    - [Composition of asynchronous actions](#composition-of-asynchronous-actions)
    - [Transformation of items](#transformation-of-items)
  - [Action Reactive Streams operators](#action-reactive-streams-operators)
  - [Reactive Error management operators](#reactive-error-management-operators)
    - [Ignoring of elements](#ignoring-of-elements)
    - [Result collection](#result-collection)
    - [Getting Streams first element](#getting-streams-first-element)
    - [Execution of a method for each element](#execution-of-a-method-for-each-element)
    - [Passing to a Reactive Streams Subscriber](#passing-to-a-reactive-streams-subscriber)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways

At the end of this article, one will have gained the following knowledge:

- Setting up SmallRye Reactive Streams Operator in Quarkus
- Some Operations that can be done using Reactive Streams Operator in Quarkus
- Apply the operations in the project
- Running the application

### Pre-requisites

The basics of the article include the following:

- Java language knowledge and use
- A Java IDE is set up in the machine. The recommendation is the use of IntelliJ ultimate edition, the latest version.
- A stable internet connection.

> **NOTE**: The screenshot images found in this project are from the IntelliJ ultimate edition version `2021.2.2`.
> JDK version 17 was used in the project.

### Create a new Quarkus project

- Open the IDE and navigate to create a new project. In the window displayed, input the following:

`Name`: quarkus-reactive-stream

`Group`: com.stream

The above is in the image below:

![new quarkus project](/engineering-education/work-on-data-streams-in-a-quarkus-project-using-reactive-streams-operator/new-quarkus-project.png "new quarkus project")

- Select the following as the dependencies as shown below:

![new quarkus project dependencies](/engineering-education/work-on-data-streams-in-a-quarkus-project-using-reactive-streams-operator/new-quarkus-project-dependencies.png "new quarkus project dependencies")

- Click on the Finish button.

#### Folder Structure

The following is the folder structure:

![folder structure](/engineering-education/work-on-data-streams-in-a-quarkus-project-using-reactive-streams-operator/folder-structure.png "folder structure")

### Add SmallRye-Reactive dependency to the project

- To do this, copy the code below into the 'pom.xml' file in the project under the `dependencies` tags:

```xml
<dependency>
  <groupId>io.smallrye.reactive</groupId>
  <artifactId>smallrye-reactive-streams-operators</artifactId>
</dependency>
```

- Reload the project to add it automatically. Do it by right-clicking on the pom.xml file, and under the Maven section, select Reload project.
  Look at it in the image below:

![Reload project](/engineering-education/work-on-data-streams-in-a-quarkus-project-using-reactive-streams-operator/reload-project.png "Reload project")

- Rename the `ExampleResource` class and the file to `StreamResource`.
- Run the application to see if the installation is successful. Run it by opening the internal terminal and run:

```shell
./mvnw quarkus:dev
```

The installed dependencies are as shown below:

![Installed Quarkus dependencies](/engineering-education/work-on-data-streams-in-a-quarkus-project-using-reactive-streams-operator/quarkus-dependencies.png "Installed Quarkus dependencies")

- To stop it, press `q` or a combination of `Ctrl + C`.

### Reactive Operators

These introduce a set of types that allow the creation of Reactive streams.
They are  as shown in the table below:

| The Reactive Streams  | Their Reactive Stream Operators  |
|---|---|
| Publisher  | PublisherBuilder  |
| Processor  | ProcessorBuilder  |
| Subscriber | SubscriberBuilder |

All the Reactive Stream Operators are terminated using `build()`.

### Ways in which one can work with Reactive Streams

There are numerous ways in which one can work with Reactive Streams. These include injecting them into the project as Beans, integrating them directly into the application, among many more.
In this section, one will tackle how to get started with the Reactive Streams quickly. They can be used as Beans or directly into the application. By doing this, it enables the developer to have practical examples of some of these operators.

#### Work with Reactive Streams directly in the application

##### Create a simple asynchronous stream

This asynchronous stream will get accessed through a GET request.
- Inside the StreamResource class, copy the following code:

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

This code will allow the `https://localhost:8080/hello/async` endpoint to generate an asynchronous stream.

The following will happen to the stream:
- It generates a stream of the characters `'h','e','l','l','o'` each being separate from the other
- It transforms them to uppercase using the `.map()` function
- It lists all outputs
- It then makes them into a continuous string


- Run the application.
- On a separate terminal, run `curl http://localhost:8080/hello/asyncs`.

The result is as shown in the image below:

![Asynchronous stream display](/engineering-education/work-on-data-streams-in-a-quarkus-project-using-reactive-streams-operator/async-display.png "Asynchronous stream display")

##### Work on an individual main class file

- Create a new folder inside the `java/org` folder named `data`.
- Create a new java class file called Demo
Create a Reactive Stream that outputs the following words, "Hello Dev! Want to code today?". The code is as shown below:

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

- Run the application by first navigating into the inbuilt terminal and running a Bash script as follows:

```shell
./mvnw compile exec:java -Dexec.mainClass=org.data.Demo
```

The above will execute the necessary main class. Just reference it quickly using the package name or location. The class name follows this.
After the execution, it will stop the application.

The output is as follows:

![Quick quarkus class run](/engineering-education/work-on-data-streams-in-a-quarkus-project-using-reactive-streams-operator/quick-quarkus-class-run.png "Quick quarkus class run")

#### Work with Reactive Streams as a Bean in the application

This section shall briefly deal with injecting a Java Bean into the application.

- Inside the location of the ExampleResource file, create a new file and name it `StramBean.java`.
- In the file, add the `ApplicationScoped` annotation to be visible throughout the application. This addition is as shown below:

```java
package com.stream;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StreamBean {


}
```

- Add some functions used to generate a counter that automatically increases every run, random numbers, and adds them together

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

Do this below the _myNumber_ function:
- Create a Publisher that outputs a continuous stream in a String form.
- It shall output a Streamflow that brings out results every 100 milliseconds
- It generates a random number
- It then processes the stream of data being generated e.g. by use of filter(), takeWhile(), distinct(), and limit() functions. These shall be covered later on in the article.

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

- Import all the needed dependencies into the file using the IDE
- Inject the Bean into the application by adding the line below under the StreamResource class:

```java
    @Inject
    StreamBean bean;
```

- Add an EndPoint to allow the generation of the stream from the Bean when accessed as shown below:

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

- Run the application to see the output generated at the terminal.

The above examples show that the Reactive streams can also be produced directly or injected as a Bean into the application.

If one uses or wants to work with Camel applications or Vert.X application, check the [docs](https://smallrye.io/smallrye-reactive-streams-operators/#_using_reactive_streams_operators_in_a_vert_x_application) for more help.

### Reactive Operators types and examples

Since one can now know some ways of starting with these Reactive Streams in a Quarkus application, we can see some common operator types and examples.

These operators are classified according to functionality. The table below shows clearly this classification of the SmallRye Reactive Streams Operators:

| Category  | Usages and Examples  |
|---|---|
| **Creation of Streams** | It allows the API to create Streams by use of PublisherBuilder  |
| **Processing of Streams** | The operators in this category transform Stream items transiting |
| **Actions in Streams** | These operators allow one to react to the different events happening in the streams in an application |
| **Error management of Streams** | These operators allow recovery after a failure in a Stream |

#### Creation of Streams

The operators in this category include the ones that do the following:
- Creation of empty streams: This creates an empty Stream. It has no items of any type in it.
- Creation of streams from elements

| Operator  | Description | Operators |
|---|---|---|
| **Creation of empty streams** | This creates an empty Stream. It has no items of any type in it. | .empty() |
| **Creating streams from elements** | This creates a stream of either 0, 1 or n elements. | .of(), .ofNullable() |
| **Creation of failing streams** | These streams created are just meant to fail | .failed() |
| **Creation of streams from CompletionStage** | This operator creates a stream of either 0 or 1 element produced when the passed _CompletionStage_ is completed. | .fromCompletionStage(), .fromCompletionStageNullable() |
| **Creation of streams from collections** | This operator creates a stream that emits the elements from the passed iterable, then sends the completion signal back. | .fromIterable() |
| **Wraps a Reactive Stream Publisher** | The operator creates a stream that emits the elements from the passed Publisher. | .fromPublisher() |
| **Generation of infinite streams** | The operator in this instance creates a stream using the generator method. Then the number of generated elements depends on the _request_. | .generate(), .iterate() |

Let us focus on the popular operators used among those mentioned above. Use some on the 'Demo' class initially created.

##### Creating streams from elements

- Open the file in the IDE
- Paste the following code in it:

```java
// Utilizes the '.of()' operator to return an output of ten elements
ReactiveStreams.of(0,1,2,3,4,5,6,7,8,9)
        .forEach(number -> System.out.println(">>> " + number))
        .run();
```

This code generates a stream of many numbers. It then prints them on the console.

- Create a publisher using the `PublisherBuilder()` that was pointed out previously. Its return type will be of the 'Integer' type. It will be built from the above stream as follows:

```java
PublisherBuilder<Integer> streamOfMany = (PublisherBuilder<Integer>) ReactiveStreams.of(0,1,2,3,4,5,6,7,8,9)
        .forEach(number -> System.out.println(">>> " + number))
        .run();
```

##### Generation of infinite streams

One can generate infinite streams by using the `.iterate()` operator. One can also generate it by simply doing the following in the main application:
- Inside the 'GreetingResource.java' file, add the following:

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

- Add the following inside the 'StreamBean.java' file:

```java
// Generates infinite loop of numbers each 50 ms
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber());
        }
```

- Run the main application using `./mvnw quarkus:dev`.
- Access it on a new terminal using `curl http://localhost:8080/hello/stream2`.

#### Processing of Streams

As mentioned earlier, this kind of operator transforms Stream items that are transiting in the stream. Examples of this kind of operator are as shown below:

| Operator | Description | Operators |
|---|---|---|
| **Creation of a processor** | The processor is a component from Reactive Streams that is both a Publisher and a Subscriber. It can consume and emit elements. | ProcessorBuilder<I, O> |
| **Filtering of elements** | These are very popular in use. They filter items that are transiting in the stream (produces only the desired output) | .dropWhile(), .distinct(), .skip(), .filter(), .takeWhile(), .limit() |
| **Composition of asynchronous actions** | These operators produce a stream for each element of the stream. It then flattens (serializes) the stream that is returned | .flatMap(), .flatMapIterable(), .flatMapCompletionStage(), .flatMapRsPublisher() |
| **Transformation of items** | They produce a value synchronously | .map() |
| **Combination of a Processor** | It forwards the items to a Processor or a ProcessorBuilder() function | .via()  |

Now let us get into popular and common Stream Processors.

##### Creation of a processor and Combination of a Processor

As mentioned earlier, its expected outcome is a processor that takes in an input and gives out an output.

- Inside the 'Demo' class, add the following code. It generates a processor with this format `processor(I, O)`; where I is the input and O the output.

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

This type is super widely used in Streams. It customizes the items to fit one's needs. The operators include:

In the infinite stream initially created in the main application created, under the 'StreamBean.java' file, add the following filters:

- **filter**: This operator selects the element using a set of rules. Add this line to it: `.filter(i -> i>30)`. It looks as shown below:

```java
// Will only output values above 30 but below 60
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber())
        .filter(i -> i>30);
        }
```

- **skip**: It neglects element in its input e.g. `.skip(41)`

```java
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber())
        .filter(i -> i>30)
        .skip(41);
        }
```
- **takeWhile**: It acts like the .filter() function in some way. An example is as shown below:

```java
public Publisher<Integer> stream2(){
    return Flowable.interval(50, TimeUnit.MILLISECONDS)
    .map(i -> myNumber())
    .filter(i -> i>30).takeWhile(i -> i<100);
    }
```

- **distinct**: It makes sure that the output items in the stream are distinct from one another. Add this code, `.distinct()`, to the initial code as shown below:

```java
/* In case the output was 1, 1, 1, 2, 3; then the output is 1,2,3 */
public Publisher<Integer> stream2(){
        return Flowable.interval(50, TimeUnit.MILLISECONDS)
        .map(i -> myNumber())
        .filter(i -> i>30).takeWhile(i -> i<100)
        .distinct();
        }
```

- **limit**: Shall stop adding elements to the stream after the size reaches the input value.

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

- **flatMap**: It automatically returns a PublisherBuilder() and serializes the elements in the returned stream.
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

The .map() operator is the most commonly used operator. Its use is for the creation of a synchronous stream.
An example is as shown below:

```java
        ReactiveStreams.of(1, 2, 3)
        .map(i -> i + 11)
        .forEach(i -> System.out.println("( " + i + " )"))
        .run(); // (12, 13, 14)
```

#### Action Reactive Streams operators

The most commonly used is the `.peek()` operator that is called for each item. It does not alter the stream output but instead creates a separate small stream and performs as specified in the arguments passed to it. Its usage looks as follows:

```java
ReactiveStreams.of(1, 2, 3)
                .peek(i -> System.out.println("Receiving: " + i))
                .ignore()
                .run();
```

#### Reactive Error management operators

Moreover, let us learn about Error management operators. They are essential since Asynchronous streams do not allow the usage of the Java _try/catch_ to catch on errors. Some of its categories according to functionality are as shown below:

| Operator | Description | Operators |
|---|---|---|
| **Error management operators based on events** | These facilitate reaction to various events e.g. when an element is received, an error or when the stream completes. | .onErrorResumeWith(), .onErrorResume(), .onErrorResumeWithRsPublisher() |
| **A Terminal operator and computation asynchronous result** | These Reactive operators act as subscribers. They produce a result that can be computed asynchronously. As the result is computed asynchronously, one retrieves a CompletionStage object. | '\<CompletionStage>' |
| **Cancellation of a stream** | As long as one is subscribed to a stream, the results of the publisher will continuously be seen. This operator is for the purpose of cancelling this subscription | .cancel() |
| **Ignoring of elements** | It ignores all the elements transiting on the streams | .ignore() |
| **Result collection** | They accumulate the results, then does a batch processing of the whole items. | .collect(), .toList() , .reduce() |
| **Getting Streams first element** | If there are any item in the stream, it returns the first item | .findFirst() |
| **Execution of a method for each element**  | This is a terminal operation, unlike .peek(), that executes a method for each element of a stream. |  .forEach() |
| **Passing to a Reactive Streams Subscriber**  | It forwards the elements of a stream to a Subscriber or .SubscriberBuilder(). | .to()  |

Let us look at some common operators among those mentioned above:

##### Ignoring of elements

In the code below, the stream is on, but nothing will be output.

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

##### Getting Streams first element

This operator can be easily applied as follows below:

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

Lastly, this is how one can pass stream items to a Reactive Subscriber:

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

In conclusion, one has been able to attain the following knowledge:

- What are Reactive Stream Operators
- Setting up SmallRye Reactive Streams Operator in Quarkus
- Some Operations that can are done using Reactive Streams Operator in Quarkus
- Classification of the SmallRye Reactive Stream Operators based on functionality
- Application of the operations in the project
- Running the application

### References

- [Quarkus Documentation](https://quarkus.io/guides/)
- Quarkus SmallRye Reactive Streams Operators [documentation](https://smallrye.io/smallrye-reactive-streams-operators/#_using_reactive_streams_operators_in_a_vert_x_application)
