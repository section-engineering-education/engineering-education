title: Functional Programming in Java

description: A beginner's guide to functional programming in Java. This includes immutable Collections, lambda expressions,
Stream API, and method reference.

### Introduction
In this article, we will go over functional programming in Java. This article assumed that you have foundational knowledge up to Java 7. All the features addressed below were introduced from Java 8.

### What is Functional Programming
It's essential to have a solid understanding of functional programming and its advantages. Functional Programming is a programming paradigm centered on the structure and use of functions. Simultaneously, it emphasizes ensuring the code is safe to use anywhere, even in parallel processes. It does this by creating pure functions, i.e., functions that don't cause any global side effects and have consistent outputs for the same input. The use of immutable data structures is recommended to avoid modification of data, which would cause a global side effect. The emphasis on preventing global side effects makes functional programming ideal for a multi-threaded environment; you don't have to worry about weird interactions between threads because of the operations' isolated nature. As well, functional programming excels at cleanly and efficiently manipulating data, which is essential during an age in which data is becoming plentiful and critical for society. This programming paradigm also has the concept of using functions as objects, which was not in Java until version 8. Subsequently, a function that takes other functions as objects is known as a higher-order function, which can help condense code in some situations, as seen later. This article will focus on using functions as objects and `higher-order functions`, as using this aspect is not exactly intuitive. It is also worth noting that Java technically does not have functions. This is because functions are not linked to any class or object. Being strictly object-oriented, Java does not have a feature to create a function outside of a class block. Instead, Java has methods, which are identical to functions but associated with a class or object. This distinction is not very significant for this guide, and we may use the terms "function" and "method" interchangeably.

### An Overview of Java’s Support for Functional Programming
Java was never initially developed to support functional programming. You could definitely create pure functions and have immutable objects and data structures, but there was no real way to use functions as objects, and subsequently, create higher-order functions. Java 8, however, provided the tools necessary to use these features, which has some applications to help the life of a Java developer. These tools include the introduction of UnmodifiableCollections, the lambda expression, Streams, and method reference.


### Unmodifiable Collections
Ordinary Collections such as Lists are mutable by nature, and so if one is not careful, it is easy for them to make an unwanted modification. Within the Collections class, there exist many static methods used to create `UnmodifiableCollections` out of Collection objects. These static methods take the naming convention of unmodifiable and take the Collection object you wish to make unchangeable. As an example:


```java
List<String> strings = Collections.unmodifiableList(new ArrayList<>(Arrays.asList("Hello", "World")));  

strings.add("Illegal");  

System.out.println(strings);
```

We convert an otherwise modifiable List into an unmodifiable version. Attempting to run this example would throw
UnsupportedOperationException, preventing you from modifying the Collection as attempted here.

Even though an Exception is thrown for adding or removing elements, it is not guaranteed the Collection is immutable. For
instance, take the following example (note that the Point Class is from the java.awt package):

```java
Point a = new Point(5,9);  

List<Point> points = Collections.unmodifiableList(new ArrayList<>(Arrays.asList(a)));  
a.setLocation(20,20);

System.out.println(points);
```

Running the code outputs the following:
```
[java.awt.Point[x=20,y=20]]
```

As you can see, an object within the List was modified using a reference pointing to the same object. To ensure that the List is genuinely immutable, it must only contain objects that are also immutable.

Note Java 9 added a less verbose way to create these immutable Collections, following the basic syntax:

```java
List<String> strings = List.of("Hello", "World");
```
There are many other static methods within the Collection subclasses of this fashion, such as Maps and Sets' corresponding methods.

### Lambda Expressions
A lambda expression is an expression used to create a method in-line. These lambda expressions have object-like qualities in that they are passed into higher-order functions (in fact, they are their own objects, but we will explain that later). As an example of the syntax of these expressions, say we had this simple method:

```java
public static boolean isEven(int num){
    return num % 2 == 0;
}
```

This same basic logic can be expressed as a lambda expression as follows:

```java
(num) -> { return num % 2 == 0; }
```

We write the brackets' arguments and the method body within curly brackets, these two separated with a `->`.

Since there is only one argument within the brackets, we can simplify the expression further:

```java
num -> { return num % 2 == 0; }
```

Since the method body only contains a return statement, it can also be simplified even further:

```java
num -> num % 2 == 0
```

At this point, you may be wondering why we omit the types of the parameter and returned value. With Java being a statically typed language, it may not be very intuitive to you why this is the case. Yet, lambda expressions are strongly and statically typed, even though we don't show types. This will be explained in more detail later.

### Lambda Expressions vs Anonymous Inner Classes
Lambda expressions, being a way to create "methods" in-line, draws some comparison to anonymous inner-classes, a way to build objects on the fly. We often use anonymous inner classes  to pass event listeners into swing components:


```java
JButton b1 = new JButton("Hello World");

b1.addActionListener(new ActionListener() {

    public void actionPerformed(ActionEvent e) {

        System.out.println("This is pretty cool");

    }

});
```

With the anonymous inner-class, we create the class in-line as it does not have any re-usability afterward. Lambda expressions work almost the same way; they are also used to create objects in-line to be used only once. These objects are essentially instances of wrapper classes for the methods we are interested in using. Behind the scenes, lambda expressions are implementations of what is called `functional interfaces`.

### Functional Interfaces
Functional interfaces are essentially interfaces that contain one unimplemented method. This allows the compiler to map lambda expressions into them. The idea is that they represent a specific functionality and not some kind of entity.

If you carefully read that description, you will notice that the ActionListener interface follows this description; it has only one method to implement and represents a functionality, i.e., a response to an action. In that case, you would be entirely correct; the ActionListener interface is a functional interface and thus can be passed as a lambda expression:

```java
JButton b1 = new JButton("Hello World");

b1.addActionListener(event -> {
    System.out.println("This is pretty cool");
});
```

Since there is only one method to implement, the only meaningful code is its implementation; the lambda expression allows us only to show the implementation of that one method, removing boilerplate code.

Going back to the question about type safety, the compiler knows that the lambda expression is an implementation of the ActionListener interface since the addActionListener method expects one. Consequently, it knows that the type of the parameter must be of ActionEvent, as the lambda expression implements a method requiring it. The compiler also knows that the method being implemented has a return type of void. If the implementation were supposed to return a String, the compiler would expect this, even without explicitly saying that it should, as with normal methods. Note: functional interfaces often have their argument and return types as generics. In this case, the type of the arguments and return value would be specified by the method accepting it.


### Stream API
One common use of lambda expressions is to be passed into higher-order functions to manipulate data structures' values. It would be impossible to talk about this application without mentioning streams. In this context, we can think of a stream as a conveyor belt. This conveyor belt takes objects from a source, typically some data structure, and then inputs the objects into methods. After interacting with an object in this conveyor belt, you cannot go back to that object and as it has already gone through. Thus, we cannot use the conveyor belt to store objects as they pass through them to be put into methods. As well, the conveyor belt doesn't have a capacity as it does not store objects. It is important to note that since the objects from the stream can only be visited once, they cannot be reused upon using a stream. If a stream is accidentally reused, an IllegalStateException is thrown.

You may create Streams out of Collections by invoking their stream method. Using the stream, you can perform various operations on the elements within the Collection in a clean way. These streams abide by the principle of not causing any side effects; they do not change the original Collection. They instead gather the data into another source, which is usually a new stream. Methods of the Stream interface can be divided into two categories: intermediate and terminal methods. The intermediate methods return new streams to manipulate further, whereas terminal methods return a final result or do something with it. As a simple example, the code below takes a list and uses streams to create a new list with all the odd elements removed.


```java
List<Integer> nums = List.of(2, 3, 4, 9, 11, 14, 16);

List<Integer> result = nums.stream()  
    .filter(num -> num % 2 == 0)  
    .collect(Collectors.toList());  

System.out.println(result);
```

As you can see, using streams for this problem provides a concise solution. First, we create a stream of the list of
integers by invoking the stream method, then we invoke the filter method using a simple lambda expression as an argument.
This lambda expression implements a functional interface called “Predicate.” The method it implements takes a value (in
this case, it is of type integer as are the elements), and returns a boolean. The filter method inputs each element into
the method. If false is returned, then the element is removed from the resulting stream. Note that since the intermediate
methods return new streams, we can chain methods of the stream interface when performing multiple operations. Each call
within the chain manipulates the elements of the resulting stream from the previous call. By convention, we put each method
in the chain on their own lines and on separate indentation levels. After calling the filter method, we invoke the collect
method with the argument: “Collectors.toList()”, to collect each element in the stream into a new list.

Note: to perform these operations asynchronously, invoke the parallelStream method instead of the stream method.

### Some Common Stream Methods
The Stream interface has a large amount of methods to provide useful tools when manipulating data. Some of the more commonly
used methods I will go into detail about are the map, forEach and reduce methods of the Stream interface. If you are
interested in learning more about the Stream interface, you should find all you need to know from the documentation.

The map method takes each element from the stream, performs some manipulation specified by the method argument, and then
returns a new stream of the resulting values. The resulting values do not have to be of the same type of the original
values. There also exists some methods in the Stream interface that behave like the map method, but must return a Stream
of a particular type. These methods follow the basic naming convention of: mapTo<DataType>.

The forEach method takes each element of the Stream and expects you to perform some kind of action with each element, such
as a method invocation. The return type is void as it is a terminal method.

The reduce method takes each element of the stream, cumulatively performing an operation we define to reduce it into a
single result. For example, you may pass a lambda expression to add two elements and return the result. In this case the
reduce method would repeatedly add two elements in the stream, and return the sum of all the elements. Note: the lambda
expression passed must take two elements of the stream as arguments.

### Method Reference
Going back to our description of lambda expressions, a lambda expression is an expression used to create a “method” on
the fly. The one drawback is that lambda expressions lack the re-usability of normal methods. The question then arises,
what if you had a method you would like to reuse, but also wanted the option to pass it into a higher-order function?
To get the best of both worlds, method reference is your best option. With method reference, you can pass ordinarily
defined methods into higher-order functions. The basic syntax for method reference is as follows:
<Class/ObjectName>::<method>. Instead of using the ordinary dot syntax to reference a method, we use two colons to
specify not to call the method. You may even call the constructor of classes using the following structure: <ClassName>::new.
This is used to take elements of a stream, input each as constructor arguments, and output a new stream of instances of
the corresponding class. As an example, say we had the following Person class:

```java
package com.john.amiscaray.functional.examples.models;  

public class Person {  

    private String name;  

    public Person(String name){  

        this.name = name;  

    }  
    public String getName() {  
        return name;  
    }  
    public void introduce(){  

        System.out.println("Hello my name is " + name);  

    }  

}
```

If we had a list of names we wanted to create Person objects out of, and then invoke the introduce method on each of them,
we can solve this problem trivially:

```java
List<String> names = List.of("John", "Dane", "Jane");  

names.stream()  
    .map(Person::new)  
    .forEach(Person::introduce);
```

Here, we first create a stream out of the list of names, then we call the map method to create Person instances, using each
String as the name field. Then we call the forEach method to invoke the introduce method of each Person.


### Summary and Conclusion
To summarize this article, we went over the basic idea behind functional programming, and some tools Java gives us
to code in this style. This includes UnmodifiableCollections, functional interfaces, lambda expressions, stream api and
method reference. Knowing how to use these tools gives us versatility to code in a functional style, which may be the most
effective solution in some cases.
