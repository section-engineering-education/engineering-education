---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-streams-in-java/
title: Getting Started with Streams in Java
description: This article will help the reader better understand the concepts of streams in Java. A stream is a collection of objects piped together to generate a particular outcome.
author: erastus-muriithi
date: 2022-03-31T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-streams-in-java/hero.png
    alt: Getting Started with Streams in Java cover image
---
Streams are one of Java's powerful features that allow developers to process data collection declaratively, making code cleaner and concise.
<!--more-->
A stream is a collection of objects piped together to generate a particular outcome. We create streams from either a collection, arrays, or an arbitrary number of objects.

### Prerequisites
For this tutorial, the reader should have:
- Basic knowledge of Java programming language.
- An IDEA installed. I will be using [IntelliJ IDEA](https://www.jetbrains.com/idea/).

### Table of contents
- [Imperative vs. Functional Programming](#1-imperative-vs-fuctional-programmimg)
- [Creating a stream](#2-creating-a-stream)
- [Mapping Elements](#3-mapping-elements)
- [Obtaining Unique Elements](#4-obtaining-unique-elements)

### Why use streams?
- **Minimum code errors**: Streams are performed step-by-step, preventing unnecessary bugs and code errors.
- **Code is more intuitive**: A code with streams is easier to understand and does not require much thinking.
- **Reduce verbose code**: By using stream, you can chop off some lines of code, making the code less verbose.

### Imperative vs. functional programmimg
Before we start looking at the streams, we need to understand the kind of problem they solve. Let us say we have a `class book` with the `title`, the `author` of the book, and the number of `pages`. We want to count the number of books titles with more than 600 pages in this 'class book.'

We will create a new directory, `Streams` in the IntelliJ IDEA, to perform this task. Create a `book.java` class and `main.java` class in `/Streams`, and add the following code snippets.

```java
public class book {
    private String title;
    private String author;
    private int pages;
    // generating a Constructor
    public book(String title, String author, int pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    // generating a getter
    public int getPages() {
        return pages;
    }
}
```

>Note: To generate the constructor in the snippet above, right-click and select the `generate` option. In `/generate/constructor`, choose the fields you want the constructor to initialize and click ok. In our case, we will select all.

```java
import java.util.List;
public class main {
    public static void show(){
        List<book> books= List.of(
                new book("x", "Paul", 578),
                new book("y", "James", 800),
                new book("z", "Rich", 400),
                new book("v", "Ann", 600)
        );
        // The type of code below is called imperative programming
        int count = 0; // initializing count to zero
        for( var book : books) // looping over the collection of books.
            if(book.getPages() > 600) //condition statement
                count++;
    }
}
```

We have created a list of `books` in the main class. We have used `List.of();` to initialize four books and the `Imperative programming` method to get books with more than 600 pages.

Imperative programming is a style of programming where we have a statement that specifies how the number of books should be counted. We use the `Streams` to process data collection in a declarative/functional programming approach. 

Functional programming brings in some additional concepts. Add the code snippet below after the `count++` increment in the main class. The snippet uses a functional programming approach.

```java
// declarative/ functional programming approach
var count1 = books.stream()
                .filter(book -> book.getPages() > 600)
                .count();
```

In the example above (declarative programming), we have used a stream object with several methods. For example, ` filter(predicate)`, which filters data based on the given condition. i.e. (`book -> book.getPages() > 600`).

>Note: A **predicate** is a function that takes an object and returns a boolean.

The `.count() ` method counts the number of movies. Unlike imperative programming, in functional programming, we do not have statements like `int count = 0;` or `count++`, which makes our code cleaner and easier to understand.

#### Step one: Creating a stream
We have looked at the problem that streams solve. Let us now focus on creating a stream. Streams are created in different ways. 

These include:
- From collection.
- From arrays.
- From an arbitrary number of objects.

#### From collection
In the `/Streams` directory, create the `howToCreateStream.java` class and add the snippet below:

```java
import java.util.Collection;
public class howToCreateStream {
    public static void show(){
        Collection<Integer> p = null;
        p.stream();
    }
}
```

#### From arrays
Modify `howToCreateStream.java` file to replace the snippet with the one below:

```java
mport java.util.ArrayList;
import java.util.Collection;
public class howToCreateStream {
    public static void show(){
        var list = new ArrayList<>(); //creating an array list
        list.stream(); //  getting array list
    }
}
```

In this snippet, we have created an array list. If we have an array called cars, for instance, our snippet would be as shown below:

```java
import java.util.Arrays;
public class howToCreateStream {
    public static void main(String [] args){
        String[] cars = { "BMW", "Toyota", "Nissan"};
        Arrays.stream(cars)
                .forEach(n -> System.out.println(n));
    }
}
```

Right-click on the file and select `Run` to execute the snippet. The output of the snippet will be:

```bash
BMW
Toyota
Nissan
```

#### From an arbitrary number of objects
To understand how this work, let's look at the snippet below:

```java
import java.util.stream.Stream;
public class howToCreateStream {
    public static void main(String [] args){
        var stream = Stream.generate(() -> Math.random());
        stream
                .forEach(n -> System.out.println(n));
    }
```

The `Math.random()` object generates infinite random numbers. The `.foreach` method requests a new number from the stream and prints it. On executing the snippet, you will get an infinite random number generated. We can call the `limit()` method and define the random numbers we want to generate to prevent this. 

For instance, let's generate five random numbers:

```java
import java.util.stream.Stream;
public class howToCreateStream {
    public static void main(String [] args){
        var stream = Stream.generate(() -> Math.random());
        stream
                .limit(5) //set the limit of random numbers to generate
                .forEach(n -> System.out.println(n)); //to terminate the stream
    }
}
```

The output of the snippet will be:

```bash
0.6114976782845492
0.5602715647461322
0.7918521867890812
0.4306881679048976
0.10413495837663422
```

#### Step two: Mapping elements
Mapping elements is the transformation of stream objects to new objects, using the `map()` and `flatMap()` methods. In `book.java` class, let us generate another getter called `getAuthor()` that returns the book's authors as shown below:

```java
  public String getAuthor() {
        return author;
    }
```

In the main class, where we have a list of books, let's create a stream of authors. Modify the code in the main class to create a stream of authors:

```java
import java.util.List;
public class main {
    public static void main(String [] args){
        List<book> books= List.of(
                new book("x", "Paul", 578),
                new book("y", "james", 800),
                new book("z", "Rich", 400),
                new book("v", "Ann", 600)
        );
        books.stream()
                .map(movies -> movies.getAuthor())
                .forEach(author-> System.out.println(author));
    }
}
```

The `books.stream()` object creates a stream from the list of books. The `.map()` gets the book's object and extracts the author. 

The output of the snippet should be:

```bash
Paul
james
Rich
Ann
```

Let us now use the `flatMap()`. Modify the code snippet in the main class to look similar to the one below:

```java
import java.util.List;
import java.util.stream.Stream;
public class main {
    public static void main(String [] args){
        var stream = Stream.of(List.of("mango", "orange" , "passion"),
                List.of("mango-juice", "sprite", "crest"));
        stream.forEach(list-> System.out.println(list));
    }
```

Output:

```bash
[mango, orange, passion]
[mango-juice, sprite, crest]
```

We have created a stream using the `stream.of()` method in the above example. We have passed two list objects. That is a list of fruits and drinks. What if we do not want to work with the list? What if we are going to work with individual fruits and drinks? 🤔 This is where the `flatMap()` comes to the rescue. 

Modify the code snippet in the main class to look smilar to the one below:

```java
import java.util.List;
import java.util.stream.Stream;
public class main {
    public static void main(String [] args){
        var stream = Stream.of(List.of("mango", "orange" , "passion"),
                List.of("mango-juice", "sprite", "crest"));
        stream
                .flatMap(list -> list.stream())
                .forEach(n -> System.out.println(n));
    }
}
```

The output of the snippet will be:

```bash
mango
orange
passion
mango-juice
sprite
crest
```

In the snippet, we have used the `.flatMap()` method to convert the list of objects to a stream of individual objects.

#### Step three: Obtaining unique elements
The `.distinct()` method removes duplicate elements from the stream. Let's run the snippet below to understand this concept.

```java
import java.util.List;
public class main {
    public static void main(String [] args){
        var books =List.of(
                new book("w", "Paul", 900),
                new book("x", "Paul", 578),
                new book("y", "James", 900),
                new book("z", "Rich", 400),
                new book("v", "Ann", 900)
        );
        books.stream() //returning a stream of books
                .map(n -> n.getPages()) //returning a stream of integers
                .forEach(System.out::println);
    }
}
```

The output of the snippet will be:

```bash
900
578
900
400
900
```

In the output, we have a duplicate of 900. To get a unique 900, let's add  `.distinct()` method before the `forEach()` method.

```java
import java.util.List;
public class main {
    public static void main(String [] args){
        var books =List.of(
                new book("w", "Paul", 900),
                new book("x", "Paul", 578),
                new book("y", "James", 900),
                new book("z", "Rich", 400),
                new book("v", "Ann", 900)
        );
        books.stream() //returning a stream of books
                .map(n -> n.getPages()) //returning a stream of integers
                .distinct() // new line
                .forEach(System.out::println);
    }
}
```

On rerunning, we get the output below:

```bash
900
578
400
```

### Wrapping up
In this tutorial, we looked at the basic concepts of streams. For instance, we learned how to create a stream from a collection. Java streams represent a data pipeline and the functions used to manipulate the data.

Happy coding! 🚀

### Further reading
1. [Primitive Type Streams in Java 8](https://www.baeldung.com/java-8-primitive-streams)
2. [Interface Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
