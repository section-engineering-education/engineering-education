---
layout: engineering-education
status: publish
published: true
url: /object-serialization-and-deserialization-in-java/
title: Serialization and deserialization in Java
description: This article explains the concept of serialization and deserialization in the context of Java.
author: grace-wanjiru
date: 2021-09-27T00:00:00-14:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/object-serialization-and-deserialization-in-java/hero.png
   alt: Serialization and deserialization diagram
---
In this tutorial, I'll explain how serialization works and how we can implement it. I will also include examples of how we can serialize a data structure using various Java concepts in doing so.
<!--more-->

You can read a deserialized object from a file and reconstruct it in memory. This utilizes the entity's metadata and bytes that constitute its contents.

### Table of contents

- [The concept of Serialization and Deserialization](#the-concept-of-serialization-and-deserialization)
- [Characteristics of serialization](#characteristics-of-serialization)
- [Benefits of serialization](#benefits-of-serialization)
- [How to serialize and deserialize with the help of examples](#how-to-serialize-and-deserialize-with-the-help-of-examples)
- [How to use inheritance to serialize an object in Java](#how-to-use-inheritance-to-serialize-an-object-in-java)
- [Serialization with aggregation](#serialization-with-aggregation)
- [Serialization with static data members](#serialization-with-static-data-members)
- [Transient members](#transient-members)

### The concept of serialization and deserialization

The idea of **serialization in Java** is a byte-stream representation of an entity's state. All the entity's data is inside the stream of bits.

**Deserialization** is the reversal of serialization, in which a byte data type stream is turned back to a memory object. The best thing about both techniques is that they're both JVM-agnostic, which means you can serialize on one JVM and de-serialize on another.

### Characteristics of serialization

- Machine Independent: On a separate device you can deserialize any encapsulated item.
- Inheritance: When a parent class is serializable, all its subclasses become serializable as well.

#### Why serialization?

- To transfer objects through a network.
- To keep Java objects in memory.
- To save Java objects in files.

### Benefits of serialization

- It's used to organize troops (by traveling the status of a network attribute).
- The status of an entity becomes saved or persistent.
- Independent of the JVM.
- It's simple to comprehend and personalize.

#### When utilizing serialization in Java, please remember the following:

- There are no methods or data members in the serialization interface.
- Only use the Serializable interface to serialize an object.
- A class's fields must all be serializable; otherwise, use the temporary keyword.
- The child class does not need to implement the `Serializable` interface if its parent class does.
- During the serialization process, only preserve non-static data members; static and temporary data members are not.
- The String and its wrapper classes have the `Serializable` interface implemented by default.

### How to serialize and deserialize with the help of examples

To perform serialization, use the `ObjectOutputStream` class's `writeObject` method. For deserialization, use the `InputObjectStream` class's `readObject` method.
> The (.ser) extension is usually used when serializing an entity to a directory in Java.

Method syntax of (writeOurObject):

```java
public final void writeOurObject(Object o) caste InputOutput Exception

```

Method syntax (readOurObject):

```java
public final Object readObject() caste InputOutputException, ExceptionClassNotDiscovered

```

> We are going to use sections of the full code which will follow later. Below are the sections of the full code. 

#### A Serialization example

Consider this, `Link` class, which contains two data members: `commons` and `favorites`. This is how we will define it:

```java
import java.io.*;
class Link implements Serializable {
  {
    private String commons;
    protected int favorites;
    public Link(String commons, int favorites) {
        this.commons = commons;
        this.favorites = favorites;
    }
    public void printLink() {
        System.out.println("Link : " + this.commons);
    }
}
```

To serialize this class, we first need to implement the `java.io.Serializable` interface to mark it as serializable.

```java
class Link implements Serializable
```

We then propose the following method:

```Java

public static void serializeLink(Link inputsLink, String filetitle) {
    try {
        FileOutputsStream file = new FileOutputsStream(filetitle);
        ObjectOutputsStream out = new ObjectOutputsStream(file);
        out.writeObject(inputLink)
        out.close();
        file.close();
    } catch (IOException ex) {
        System.out.println("There was an IOException");
    }
}
```

#### Description

This function will serialize a `Link` object submitted as a parameter. The serialized bytes are then written to a file in which we will specify the name as the second parameter.  Handle Serialization via `out.writeObject(inputLink)`.  By calling `file.close()`, we terminate the file handle.

#### Deserialization example

The serialized object may now be deserialized by using the technique listed below.

```java
public static deserializeLink(String filestitle) {
    try {
        FileInputStream file = new FileInputStream(filetitle);
        ObjectInputStream on = new ObjectInputStream(file);
        return (Link) on .readObject();
    } catch (IOException ex) {
        System.out.print("Our IOException has Occured");
    } catch (ClassNotFoundException ex) {
        System.out.print("Our ClassNotFound has Occured");
    }
}
```

#### Description

The `deserializeLink()` method has two parameters. The first of which, putoutLink, is a blank `Link` object (which we can initialize earlier, but the original values we replace by this method). The second parameter, filename, is the location where we save the deserialized object.

1. The file will open in input mode using this procedure.
2. We perform deserialization using `in.readObject()`.
3. After that, the outcome will be classiﬁed as a Link object.

If the item is not present, the above procedure may throw an `IOException`. When the expected class is not found, we issue `ClassNotFoundException`.

#### Object Serialization and Deserialization Example
> This is the full code from the previous sections of serialization and deserialization.

**Serialization.java**

```java
import java.io.*;
class Link implements Serializable {
    private String commons;
    private int favorites;
    public Link(String commons, int favorites) {
        this.commons = commons;
        this.favorites = favorites;
    }
    public void printLink() {
        System.out.println("Link : " + this.commons);
    }
}
public class Serialization {
    public static void serializeLink(Link inputLink, String filetitle) {
        try {
            FileOutputStream file = new FileOutputStream(filetitle);
            ObjectOutputStream out = new ObjectOutputStream(file);

            out.writeObject(inputLink);

            out.close();
            file.close();
        } catch (IOException ex) {
            System.out.println("There was an IOException");
        }
    }
    public static Link deserializeLink(String filetitle) {
        try {
            FileInputStream file = new FileInputStream(filetitle);
            ObjectInputStream on = new ObjectInputStream(file);
            return (Link) on .readObject();
        } catch (IOException ex) {
            System.out.println("IOException has Occured");
        } catch (ClassNotFoundException ex) {
            System.out.println("ClassNotFound has Occured");
        }
        return null;
    }
    public static void main(String[] args) {
        Link randomLink = new Link("My first link", 0);
        final String filename = "example.bin";
        System.out.println("Prior to Serialization : ");
        randomLink.printLink();
        serializeLink(randomLink, filename);
        Link linkFromFile = deserializeLink(filename);
        System.out.println("Following Serialization : ");
        linkFromFile.printLink();
    }
}
```

#### Output

```

Before Serialization : 
Link : My first link
After Serialization : 
Link : My first link

```

### How to use inheritance to serialize an object in Java

When we mark a parent class as serializable, all its subclasses are implicitly serializable. Thus, don't need the subclasses to implement the Serializable interface directly.

#### Example

```java
class Link implements Serial {
    private String commons;
    private int favorites;
    public Link(String commons, int enjoys) {
        this.commons = commons;
        this.favorites = favorites;
    }
    public void printLink() {
        System.out.println("link : " + this.commons);
    }
}
class SerialLink extends Link {
    protected String commits;
    public addCommit(String newCommit)
    {
        if (this.commits == null) commits = "";
        this.commits += (newCommit + ",");
    }

    public getCommit() {
        return this.commits;
    }
}

```

#### Description

There are two classes in the example above: `Link` and `SerialLink`. `SerialLink` derives from `Link` and has a `commits` data member that contains all the commits left on the link. Due to the concept of Multilevel Inheritance, `Link` implements `Serializable`, and so `SerialLink` will become serializable as well.

> However, this idea does not operate in reverse as a result. When a child class implements the Serializable interface, the Parent class is not affected.

### Serialization with aggregation

To establish a `HAS-A` connection in Java, we utilize aggregation. This implies that a single class may refer to many different other classes. These classes won't be serializable until all of their references are of type `Serializable`. Any attempt to serialize these types fails due to `NotSerializableException`.

#### Example

```java
class Link {
    private String heading;
    private String commons;
    public String getlink() {
        return this.commons + " : " + this.link;
    }
}
class Seriallink {
    private link link;
    private int favorites;
}

```

#### Description

In the illustration above, if a client wants to serialize the `SerialLink` object, a `NotSerizalizableException` will be produced. Since `link` cannot be Serialized until the `Serializable` interface has been implemented, this error has occurred.

> When properties aren't serialized, there are a few things to consider:

1. Static members
2. Transient members

### Serialization with static data members

Any static data members of a class will not be serialized because static denotes a class property, not an object property.

```java
class Link implements Serializable
{  
    public int no;  
    public String title;  
    static String college="faculty`"; 
    public Lecturer(String title, int no) {  
        this.no = no;  
        this.title = title;  
    }  
} 
```

### Transient members

In some circumstances, the client does not desire all the data members of an entity for serialization. For this use scenario, Java includes the keyword `transient`. Any data member declared as transient in the serialized object will have a default value for its data type.

#### Example

```java
class Link implements Serial {
    public String commons;
    public transient int commits;
    public Link(String commons, int commits) {
        this.commons = commons;
        this.commits = commits;
    }
    public void printLink() 
    {
        System.out.println(String.format("OurLink; This includes our first comment.", this.commons, this.commits));
    }
}
// Use the class as in our previous serialization example
```

#### Output

```
Before Serialization : 
OurLink: "This includes our first comment" with 05 comments.
After Serialization : 
OurLink: "This includes our first comment" with 0 comments.
```

#### Description

After serialization, the number of comments went from 5 to null which is a 0. This occurs since the comments are marked as temporary, thus their value is set to the int datatype's default value of 0.

#### Case in Point

Some variables may have big values that are difficult to convey over a network. As a result, we classify those numbers as temporary. Furthermore, if a client does not wish to publish or save a variable's value, considering it too minor or too personal, we can mark those variables as transient.

### Conclusion

In this tutorial, we have gone over serialization and deserialization. We solidified this knowledge using examples where we can apply distinct Java principles. Along the way, we went through the OOP concept of inheritance and aggregation. Finally, we discussed the circumstances when properties are not serialized.

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
