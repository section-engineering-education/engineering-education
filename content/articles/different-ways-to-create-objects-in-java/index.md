---
layout: engineering-education
status: publish
published: true
url: /different-ways-to-create-objects-in-java/
title: How to Create Objects in Java
description: This article will show you the different ways of creating objects in Java. They include using the new keyword, newInstance(), as well as Object Serialization, and Deserialization.
author: moses-mwangi
date: 2021-06-22T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/different-ways-to-create-objects-in-java/hero.jpg
    alt: Different Ways of Creating Objects in Java
---
Java is an object-oriented programming language used when developing desktop, mobile, and web applications. In Java, everything revolves around the object. A Java class can, therefore, be regarded as an object template.
<!--more-->
In Java, we can create Objects in various ways:

- [Using a new keyword](https://www.javatpoint.com/new-keyword-in-java#:~:text=The%20Java%20new%20keyword%20is,to%20create%20the%20array%20object.)
- [Using the `newInstance`() method of the Class class](https://www.javatpoint.com/new-instance()-method)
- [Using the newInstance() method of the Constructor class](https://www.javainterviewpoint.com/java-constructor-newinstance-method-example/)
- [Using Object Serialization and Deserialization](https://www.studytonight.com/java/serialization-and-deserialization.php)
- [Using the clone() method](https://www.geeksforgeeks.org/clone-method-in-java-2/)

### Using a new keyword
This is the most common and basic way of creating an object in Java. In this method, we can call constructors with parameters or with no arguments. The `new` keyword allows us to create a new object.

**Syntax**

```java
class_name object_name = new class_name();
```

**Example**

In this example, we will create an object using the `new` keyword.

```java
public class Main{ 
    String s = "Hello World"; 

    public static void main(String args[]) { 
    Main a = new Main(); //creating an object
    System.out.println(a.s); //Outputs Hello World
    } 
}
```
### Using the newInstance() method of the Class
In this method, a no-argument constructor is called by the `newInstance()` function to create an object. The `newInstance()` method is regarded as a reflective way to create an object since it belongs to the `java.lang.reflect.Constructor` class. 

The `Class.forName()` is used to load the [class](https://www.javainterviewpoint.com/use-of-class-forname-in-java/) dynamically.

The `newInstance()` method uses the following syntax:

```java
 public T newInstance() throws InstantiationException,IllegalAcccessException  
```

- If the method or class is not accessible, it returns the `IllegalAccessException`. 
- If the Class represents a primitive data type, an interface, an abstract, an array class, or if the class does not have a no-arg constructor, it returns an `InstantiationException` message.

The example below helps us understand the `newInstance()` method.

```java
public class Main
{ 
    String a = "Hello World"; 
    public static void main(String[] args) { 

            try{ 
                Class b = Class.forName("Main"); 
                Main c = (Main) b.newInstance(); 
                System.out.println(c.a); 
            } catch (ClassNotFoundException ex) { 
                    ex.printStackTrace(); 
            } catch (InstantiationException ex){ 
                    ex.printStackTrace(); 
            } catch (IllegalAccessException ex) { 
                    ex.printStackTrace(); 
            } 
    } 
}
```
### Using the newInstance() method of the Constructor Class
This method also uses the `newInstance()` function which is provided by the constructor and used when creating an object. This time the constructor is parameterized.

**Syntax**

```java
public T newInstance(Objects...initargs)  
```

The following exceptions are returned by the `newInstance()` method:
- Incase the constructor cannot be accessed, the method throws **IllegalAccessException**.
- If the number in the formal and actual parameters differ, it throws **IllegalArgumentException**.
- If an exception is thrown by the constructor, it throws **InvocationTargetException**.
- If the provoked initialization fails, it throws **ExceptionInInitializerError**.

**Example**

Let's look at an example of how to use the `newInstance`() method.

```java
import java.lang.reflect.Constructor;  
import java.lang.reflect.Constructor;  
public class Main {  
String str="Hello World";  
    public static void main(String args[]) {  
        try{  
            Constructor<Main> obj =Main.class.getConstructor();  
            Main myObj = obj.newInstance();  
            System.out.println(myObj.str);  
        }catch(Exception ex) {  
            ex.printStackTrace();  
        }  
    }  
}  
```

### Using object serialization and deserialization
A new separate object is created when we serialize and then deserialize an object. To create an object, this method does not need any constructor. 

We shall use the [Serializable interface in Java](https://www.softwaretestinghelp.com/marker-interfaces-java/) for serializing and deserializing new objects.

#### Object serialization
Serialization involves converting an object state into a [byte stream](https://docs.oracle.com/javase/tutorial/essential/io/bytestreams.html). We use the `writeObject()` method to serialize an Object.

**Syntax when serializing an object**

```java
public final void writeObject(Object obj) throws IOException  
```

#### Object deserialization
Deserialization is the process of using the byte stream to recreate an object in Java. We shall use the `readObject()` method to deserialize an object.

**Syntax when deserializing an object**

```java
public final Object readObject() throws IOException  
```

**Example**

In this example, we are using the serialization and deserialization method to create an object.

```java
import java.io.*;
class Main implements Serializable
{
    public int a;
    public String b;
    public Main(int a, String b)
    {
        this.a = a;
        this.b = b;
    }
}
class Example1 {
    public static void main(String[] args)
    {
        Main obj = new Main(5, "Engineering Education");
        String filename = "OurExample.ser";       //name of the file which should have .ser  
        /*-----------------Serialization----------*/
        try
        {
            FileOutputStream newFile = new FileOutputStream(filename);  //We are saving the object in the file  
            ObjectOutputStream out = new ObjectOutputStream(newFile);
            out.writeObject(obj);            //object being serialized   
            out.close();                   //ObjectOutputStream closed
            newFile.close();                   //File closed  
            System.out.println("We have serialized the Object ");
        }
        catch(IOException ex)
        {
            ex.printStackTrace();
        }
        Main obj1 = null;
        /*-----------------Deserialization--------*/
        try
        {
            FileInputStream newFile = new FileInputStream(filename); // Here, we are reading the object from the file   
            ObjectInputStream is = new ObjectInputStream(newFile);
            obj = (Main)is.readObject();        //object deserialized 
            is.close();                     //ObjectInputStream closed  
            newFile.close();                   //File closed    
            System.out.println("We have deserialized the Object");
            System.out.println("number = " + obj.a);
            System.out.println("string = " + obj.b);
        }
        catch(IOException ex)
        {
            System.out.println("Am an IOException");
        }
        catch(ClassNotFoundException ex)
        {
            System.out.println("Am an ClassNotFoundException");
        }
    }
} 
```
### Using the clone() method
Whenever the `clone()` method is called, it creates a new object, and then gets all the content in the old object copied to it. 

> A constructor does not get invoked when we use the `clone()` method to create an object. We implement the `Cloneable` class to use the` clone()` method, as shown below.

**Syntax**

```java
object.clone()
```

**Example**

Let's look at an example of how to create an object using the clone method.

```java
class Student implements Cloneable{
    int regno;
    String name;

    Student(int regno,String name){
        this.regno=regno;
        this.name=name;
    }

    public Object clone()throws CloneNotSupportedException{
        return super.clone();
    }

    public static void main(String args[]){
        try{
            Student s1=new Student(203,"Geoffrey");

            Student s2=(Student)s1.clone(); //cloning the s1 object 

            System.out.println(s1.regno+" "+s1.name); //prints the name from the original object
            System.out.println(s2.regno+" "+s2.name); //prints the name from the cloned object
        }
        catch(CloneNotSupportedException c){
            // this error is throne when the cloning process fails
        }
    }
}  
```

### Conclusion
In this article, we have looked at the different ways to create objects in Java. We can now easily create Objects in Java without using the `new` Keyword method.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)