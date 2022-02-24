---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-scala-collections/
title: Getting Started With Scala Collections
description: This article will cover collections in Scala programming language. Collections are containers for things that contain an arbitrary number of elements.
author: kelvin-munene
date: 2021-10-21T00:00:00-07:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-scala-collections/hero.png
    alt: Getting Started with Scala Collections Hero Image
---
Collections are containers for things that contain an arbitrary number of elements. Both mutable and immutable collections are included, and these, in turn, vary functionally with Val and Var.
<!--more-->
Scala collections additionally offer a wide variety of flexible built-in methods that may be used to execute different operations like transformations & actions directly on the data.

### Prerequisites
- Run Scala programs [here](https://scalafiddle.io/).
- Understand that Scala framework is not supported by .NET Framework (Windows Operating system).

### Table of contents
- [Overview of Scala programming language](#overview-of-scala-programming-language)
- [Understanding Scala collection framework](#understanding-scala-collection-framework)
- [Understanding Mutable and Immutable Collections](#understanding-mutable-and-immutable-collections)
- [Conclusion](#conclusion)

### Overview of Scala programming language
Scala is a multi-paradigm, general-purpose programming language. It is designed at a high level. Functional programming can also be done in this purely object-oriented programing language.

In Scala, there is no such thing as a primary data type; everything is an object. Typographical safety and refinement are the goals of this programming language.

`Java Virtual Machine` (JVM) applications in Scala may execute as bytecodes (Java Virtual Machine). `Scalable language` is what the acronym Scala stands for.

This package also provides the Javascript runtime. Scala is heavily inspired by Java when it comes to programming languages, but it also borrows from other families like Lisp, Haskell, and Pizza.

The program below shows an example of Scala code:

```Scala
object demo {

def main(args: Array[String])
{

    println("Hi, Welcome to section engineering!")
}
}
```

The code above, gives the following output:

```bash
Hi, Welcome to section engineering!
```

#### Why use Scala programming language
The popularity of Scala among programmers may be attributed to many factors.

Here are a few of them:
- Learning Scala is simple since it is a high-level language, similar to Java, C, and C++. As a result, anybody can pick up Scala quickly. Scala is simpler to learn if you are familiar with Java.
- **Useful, scalable, and productive**: Scala includes the most exemplary characteristics of other languages such as the C and C++ programming languages, and the Java programming language.
- Scala is tightly integrated with Java, thanks to innovative source code architecture that allows the Scala compiler to understand Java classes. In addition, the compiler may make use of frameworks, Java Libraries, and other additional tools and resources, etc. Applications written in Scala may run on the JVM after compilation.
- Web-based and desktop application development are supported by compiling JavaScript for web apps. The JVM bytecode is generated in the same way for desktop apps.

- Most well-known organizations, such as Apple, Twitter, Walmart, and Google, have migrated their majority of their code to Scala from other languages. This is because Scala is scalable and would be used in backend processes, it is a good choice.

> Scala is often misunderstood as a Java add-on. However, this is untrue. Scala works flawlessly with Java. The Java Byte Code is generated from Scala applications when successfully compiled and executed on the JVM (Java Virtual Machine).

### Understanding Scala collection framework
Collections include `Seq,` `Set,` and `Map` at the most granular level. They are all the offsprings of a characteristic that may be passed from person to person.

To simplify implementation in the code sample, all Traversable (Parent) children are Traits, not classes. This eliminates creating the object before invoking it.

Let's take a closer look at it as follows:

![Scala framework](/engineering-education/getting-started-with-scala-collections/scala-framework.png)

- **Reference-book**: Introduction to Scala, Object-Oriented, and Functional Programming for Complete Beginners
- **Traversable**: This supports traversal of the whole Collection, as well as behavior that is common to all collections, regardless of the kind of information included in them. It implies that for each function, Traversable allows us to iterate through the collections.
- **Iterable**: allows you to cycle over a collection's items one by one using an iterator.

> It is impossible to traverse a collection more than once using an iterator since each element is consumed in the iteration.

### Understanding mutable and immutable collections
The Scala programming language gives only two types of collections, namely: `mutable` and `immutable collections.` There are systematic differences between Scala collections that are changeable and those that are immutable.

A changeable collection can be changed or expanded while still being used. As a result, you can change, add to, or delete items from, an anthology.

Collections that are immutable never change. It will be possible to do operations that seem like additions, removals, and updates, but they will return a new collection, leaving the previous one unchanged.

Scala collection contains all collection classes, whether they are mutable, immutable, or generic.

Most client-side collection classes are found in the `Scala.collection`, `scala.collection.immutable`, and `scala.collection.mutable` packages.

Package `scala.collection` contains the most often used collection classes. The degree of mutability varies across the variants.

**Mutable collections** - It is possible to update this kind of collection, but it appends new elements to the existing ones.

The items of the changeable collection may be added, updated, or removed. Examples of mutable collections include: AnyRefMap, ArrayBuffer, ArrayStack, BitSet, ArrayBuilder, ArraySeq, HashSet, LinkedHashMap, LinkedHashSet, LinkedList, DoubleLinkedList, HashMap etc.

The code below is an example of a mutable collection:

```scala
object mutable {
def main(args: Array[String]) {
val ls = (10 to 14).toList
println("Outcome is: " + ls);
}
}
```

The outcome of the code is

```bash
Outcome is: 10 11 12 13 14
```

As you can see from the code above, a list is immediately created and the list of items is discovered when you try to use it.

> Appending and reassigning to mutable collections is not possible because mutable collections lack the `+=` function.

**Immutable collections** - It is impossible to alter a collection of this kind. The methods for adding, updating, and deleting items from the collection are still visible.

Internally, however, a new group is created; the previous Collection is not affected.

Examples of immutable collections include HashSet, LongMap, Stack, ListMap, NumericRange, StreamIterator, TreeSet, ListSet, List, Vector, TreeMap, Stream, etc.

The code below is an example of an immutable collection:

```scala
object Immutable {
def main(args: Array[String]) {
val ls = (9 to 12).toList
println(" "+ls);
}
}
```

Output
List(9, 10, 11, 12)

### String & lazy collection in Scala
When we apply data transformations to collections, such as filtering, mapping, min/maxing, reducing, folding, etc., we are essentially creating a new group.

Depending on the resources available, this may be possible.

A new collection is instantly formed when items are evaluated and memory is promptly allocated for those elements in strict transformations.

The transformations in a lazy collection do not generate another collection right away. When you say "memory-on-demand," you imply that memory wont be available right away.

Creating a view on a collection transforms it into a Lazy Collection.

The code below is an example of lazy Collection:

```scala
object Demo {
def main(args: Array[String]) {
val ls = (1 to 10).toList
val lsLazy = ls.view
println("View: " + lsLazy);
}
}
```

Output

```bash
View: SeqView(...)
```

> The code above does not allocate memory when establishing a view on the existing list since it just creates a view of the list. No additional operations, such as foreach, min, or max, are being done.

To make the code complete the compilation process, we will add `.max` in the line `println("View: " + lsLazy)`. The full line of code will be `println("View: " + lsLazy.max)` to output `max 10`.

### Conclusion
From the information above, we have learned an introduction to Scalable language. We have also looked at the collections - mutable and immutable collections and how they are different.

I hope you find this helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
