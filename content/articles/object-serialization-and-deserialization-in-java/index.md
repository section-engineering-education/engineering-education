### Introduction
In this tutorial, I'll explain how serialization works and how we can implement it. I will also include examples of how we can serialize a data structure and how we can use different java concepts to serialize.
A deserialized object can be read from a file and reconstructed in memory utilize the entity's metadata and bytes that constitute its contents.

### Table of contents
- [Concept of Serialization and Deserialization](#concept-of-serialization-and-deserialization)
- [Characteristics of serialization](#characteristics-of-serialization)
- [Benefits of serialization](#benefits-of-serialization)
- [How to serialize and deserialize with help of examples](#how-to-serialize-and-deserialize-with-help-of-examples)
- [How to use Inheritance to Serialize object in Java](#how-to-use-inheritance-to-serialize-object-in-java)
- [Serialization with Aggregation](#serialization-with-aggregation)
- [Serialization with Static Data Member](#serialization-with-static-data-member)
- [Transient members](#transient-members)

### Concept of Serialization and Deserialization
The idea of `serialization in Java` is a byte-stream representation of an entity's state. All of the entity's data is contained inside the stream of bits.

`Deserialization` is the reversal of serialization, in which a byte data type stream is turned back to a memory object. The best thing about both techniques is that they're both JVM-agnostic, which means you can serialize on one JVM and de-serialize on another.

### Characteristics of serialization
- Machine Independent: Any encapsulated item can be deserialized on a separate device.
- Inheritance: When a parent class is designated as Serializable, all of its subclasses become Serializable as well.

**Why Serialization?**
- Objects are transferred through a network.
- To keep Java objects in memory,
- Java objects are saved in files.

### Benefits of serialization
- It's used to organize troops (by travelling the status of a network attribute).
- The status of an entity is saved or persistent.
- Independent of the JVM
- Simple to comprehend and personalize

**When utilizing serialization in Java, please remember the following:**
- There are no methods or data members in the serialization interface.
- Only the serializable interface can be used to serialize an object.
- A class's fields must all be serializable; otherwise, the temporary keyword should be used.
- The child class is not necessary to implement the Serializable interface if its parent class does.
- During the serialization process, only non-static data members are preserved; static and temporary data members are not.
- The String and its wrapper classes have the Serializable interface implemented by default.

### How to serialize and deserialize with help of examples
To perform serialization, use the ObjectOutputStream class's `writeOurObject() method`, and for deserialization, use the InputObjectStream class's `readOurObject() method`.
> The (.ser) extension is usually used when serializing an entity to a directory in Java.

Method syntax of (writeOurObject) :

```java
public final void writeOurObject(OurObject o) caste InputOutput Exception

```

Method syntax (readOurObject) :

```java
public final Object readOurObject() caste InputOutputException, ExceptionClassNotDiscovered

```

**A Serialization example**
Consider this, `Link` class, which contains two data members: `commons` and `favorites`. This is how we will define it:

```java
class Link
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

To Serialize the aforementioned class, we will incorporate the `java.io.Serializable` interface and designate it as Serializable.

```java
class Link implements Serializable
```

Then we create the method that follows:

```java

public static void serializeLink(Link inputsLink, String filetitle) {
    try {
        FileOutputsStream file = new FileOutputsStream(filetitle);
        ObjectOutputsStream out = new ObjectOutputsStream(file);

        out.writeObject(inputsLink);

        out.close();
        file.close();
    } catch (IOException excp) {
        System.out.println("InputOutputException occures");
    }
}
```

**Description:**
This function serializes a Link object parameter that is submitted as a parameter. The serialized bytes are then written to a file whose name is specified as the second parameter.
Serialization is handled via `out.writeOurObject(inputLink)`.By calling `file.close()`, we terminate the filehandle. once the bytes have been written to the file.

**Deserialization example**
We can now use the method below to deserialize the serialized object.

```java
public static void deserializeLink(Link putoutLink, String filestitle) {
    try {
        FilesInputStream files = new FilesInputStream(filestitle);
        ObjectsInputStream on = new ObjectsInputStream(files);

        putoutlink = (Link) on .readObject();
    } catch (IOException excp) {
        System.out.print("Our IOException has Occured");
    } catch (ClassNotFoundException excp) {
        System.out.print("OurClassNotFound has Occured");
    }
}
```

**Description:**
The `deserializeLink()` method has two parameters: putoutLink, which is a blank `Link` object (which can be initialized earlier, but the original values will be replaced by this method), and filename, which is the location where the deserialized object will be saved.
1. The file will be opened in Input mode using this procedure.
2. Deserialization will be performed by in.readObject().
3. After that, the outcome will be specifically classiﬁed into Link (Link).

If the item is not present, the above procedure may throw an IOException. When the expected class is not found, the ClassNotFoundException is issued.

**Object Serialization and Deserialization Example**

```java

import java.io.*;
  
class Stu implements Serialized {
protected static final short serialformUID =
                                 6376S;
    transient int q;
    static int w;
    String title;
    int period;
  
    
public Emp(String title, int period, int q, int w)
    {
        this.title = title;
        this.period = peroid;
        this.q = q;
        this.w = w;
    }
  
}
  
public class SerialSample {
public static void printdata(Stu object01)
    {
  
        System.out.println("title = " + object01.title);
        System.out.println("period = " + object01.period);
        System.out.println("q = " + object01.q);
        System.out.println("w = " + object01.w);
    }
  
public static void main(String[] args)
    {
        Stu obj = new Stu("qw", 10, 3, 1100);
        String filetitle = "serialize text";
  
        try {
            
            FilePutoutStream file = new FilePutoutStream
                                           (filetitle);
            ObjPutoutOutStream out = new ObjectPutoutStream
                                           (file);
          
            out.writeObject(object);
  
            out.close();
            file.close();
  
            System.out.println("Serialization of the obeject has been done\n"
                              + "Before Deserialization of the data.");
            printdata(object);
  
            object.w = 1100;
        }
  
        catch (InputOutputException excp) {
            System.out.println("Input Output exception caught");
        }
  
        object = null;
       
        try {
  
            FileInputStream file = new FileInputStream
                                         (filetitle);
            ObjInputStream in = new ObjInputStream
                                         (file);
            object = (Stu)in.readObject();
  
            in.close();
            file.close();
            System.out.println("Derialization of the obeject has been done\n"
                                + "After Deserialization of the data.");
            printdata(object);
        catch (InputOutputException excp) {
            System.out.println("Input Output exception got");
        }
  
        catch (ExceptionClassNotDiscovered excp) {
            System.out.println("ExceptionClassNotDiscovered" +
                                " is got");
        }
    }
}
```

**Output**:

```java
Serialization of the object has been done
Before Deserialization of the data.
title = qw
period = 10
q = 3
w = 1100
Deserialization of the object has been done
After Deserialization of the data
title = qw
period = 10
q = 0
w = 1100

```

### How to use Inheritance to Serialize object in Java
When a parent class is designated Serializable, all of its subclasses are marked Serializable as well, even if they don't implement the Serializable interface explicitly.

**Example**
```java
class Link implements Serial {
    private String commons;
    private int enjoys;

    public Link(String commons, int enjoys) {
        this.commons = commons;
        this.enjoys = enjoys;
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

**Description:**
There are two classes in the example above: `Link` and `SerialLink`. `SerialLink` derives from `Link` and has a `commits` data member that contains all of the commits left on the link.
Due to the concept of Multilevel Inheritance, `Link` implements Serializable, and so `SerialLink` will become Serializable as well.

> However, this idea does not operate in reverse as a result, when a childclass implements the Serializable interface, the Parent class is unaffected.

### Serialization with Aggregation
In Java, aggregation is used to create a `HAS-A` relationship, which means that one class can reference multiple other classes. Only when all of the references within these classes are Serializable will they become serializable. Otherwise, `NotSerializableException` shall be dropped when attempting to serialize these types.

**Example**
```java
class Ourlink {
    protected String heading;
    private String commons;

    public String getOurlink() {
        return this.commons + " : " + this.Ourlink;
    }
}

class Seriallink {
    protected link link;
    protected int enjoys;
}

```

**Description:**
In the illustration above if a client wants to serialize the `SerialLink` object in this preceding example, a NotSerizalizableException will be produced because the `link` object is not Serializable unless it implements the `Serializable` interface.

>When properties aren't serialized, there are a few things to consider:
1. Static members
2. Transient members
### Serialization with Static Data Member
Any static data members of a class will not be serialized because static is a class property, not an object property.

```java
class Student implements Serializable
{  
 int no;  
 String title;  
 static String college="faculty`"; 
 public Lecturer(String title, int no) {  
  this.no = no;  
  this.title = title;  
 }  
} 
```

### Transient members
In some circumstances, the client does not desire all of the data members of an entity to be serialized. For this use scenario, Java includes the keyword `transient`; any data member declared as transient in the serialized object will have a default value for its data type.

**Example:**

```java
class OurLink implements Serial {
    public String content;
    public transient int comment;

    public Link(String content, int comment) {
        this.content = content;
        this.comment = comment;
    }

    public void printLink() 
    {
        System.out.println(String.format("OurLink; This includes our first comment.", this.content, this.comment));
    }
}
```

**Output**:

```java
Before Serialization : 
OurLink: "This includes our first comment" with 05 comments.
After Serialization : 
OurLink: "This includes our first comment" with 0 comments.
```

**Description:**
After serialization, the numbers of our comments went from 5 to null which is a 0. This occurred since the comments were marked as temporary, thus their value is set to the int datatype's default value of 0.

**Case in Point**

Some variables may have big values that are difficult to convey over a network. As a result, those numbers can be classified as temporary. Furthermore, if a client does not wish to publish or save a variable's parameter considering it just too minor or too personal, those variables can be marked as transient.

### Conclusion
In this tutorial we have gone over serialization and deserialization with you, giving examples where we can apply distinct Java principles. Serialization has been discussed in conjunction with inheritance and aggregation, as well as circumstances when properties are not serialized.