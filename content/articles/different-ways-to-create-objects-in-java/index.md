### Introduction
Java is an object-oriented programming language for developing a desktop application, android application, hardware application, and web application. In Java, everything revolves around the object. A class is a template for objects from which they are created.

In Java, Objects are created in various ways:

1. [Using a new keyword](https://www.javatpoint.com/new-keyword-in-java#:~:text=The%20Java%20new%20keyword%20is,to%20create%20the%20array%20object.)
2. [Using `newInstance`() method of Class class](https://www.javatpoint.com/new-instance()-method)
3. [ Using newInstance() method of Constructor class](https://www.javainterviewpoint.com/java-constructor-newinstance-method-example/)
4. [ Using Object Serialization and Deserialization](https://www.studytonight.com/java/serialization-and-deserialization.php)
5. [Using clone() method](https://www.geeksforgeeks.org/clone-method-in-java-2/)

### 1. Using a new keyword
This is the most common and basic way of creating an object in Java and almost every Java Developer use this method. In this method, we can call any constructor i.e parameterized or no-argument constructors. The `new` keyword creates a new object that occupies space in the heap to store the created object.

**Syntax**
```java
class_name object_name = new class_name();
```

**Example**

In this example, we shall create an object using the `new` keyword.
```java
public class Main
{ 
    String s = "Hello World"; 
    public static void main(String args[])  
    { 
Main a = new Main(); 
System.out.println(a.s); //Outputs Hello World
    } 
}
```
### 2. Using newInstance() method of Class class
In this method, no-arg constructor (the constructor is not parameterized) is called by the `newInstance()` method to create an object. The newInstance() method is also known as  reflective way to create object since it belongs to **java.lang.reflect.Constructor** class. As the `newInstance()` method is used to create object, the `Class.forName() ` is used for loading the [class dynamically](https://www.javainterviewpoint.com/use-of-class-forname-in-java/).

 **Syntax**
 ```java
 public T newInstance() throws InstantiationException,IllegalAcccessException  
 ```
- If the method or class is not accessible, it returns the **IllegalAccessException**. 
- If the Class represents a primitive data type, an interface, an abstract, an array class, or if the class does not have a no-arg constructor, it throws **InstantiationException**.

**Example**

Below is an example to help us understand the `newInstance()` method.
```java
public class Main
{ 
    String a = "Hello World"; 
    public static void main(String[] args) 
    { 
        try
        { 
            Class b = Class.forName("Main"); 
Main c = (Main) b.newInstance(); 
System.out.println(c.a); 
        } 
        catch (ClassNotFoundException ex) 
        { 
ex.printStackTrace(); 
        } 
        catch (InstantiationException ex) 
        { 
ex.printStackTrace(); 
        } 
        catch (IllegalAccessException ex) 
        { 
ex.printStackTrace(); 
        } 
    } 
}
```
### 3. Using newInstance() method of Constructor class
This method also has the `newInstance`() method. The `newInstance() method is provided by the constructor and is used for creating an object.  This time, the constructor is parameterized.

**Syntax**
```java
public T newInstance(Objects...initargs)  
```
The following exceptions are returned by the newInstance() method:

- Incase the constructor cannot be accessed, the method throws **IllegalAccessException**.
- If the number in the formal and actual parameters differ, it throws **IllegalArgumentException**.
- If an exception is thrown by the constructor, it throws **InvocationTargetException**.
- If the provoked initialization fails in this method, it throws **ExceptionInInitializerError**.

**Example**

Let's look at an example of how to use the `newInstance`() method.
```java
import java.lang.reflect.Constructor;  
import java.lang.reflect.Constructor;  
public class Main  
{  
String str="Hello World";  
public static void main(String args[])  
{  
try  
{  
Constructor<Main> obj =Main.class.getConstructor();  
Main myObj = obj.newInstance();  
System.out.println(myObj.str);  
}  
catch(Exception ex)  
{  
ex.printStackTrace();  
}  
}  
}  
```
### 4. Using Object Serialization and Deserialization
 A new separate object is created when we serialize and then deserialize an object. To create an object, the method does not need any constructor. In this method, we shall use [**Serializable** interface in java](https://www.softwaretestinghelp.com/marker-interfaces-java/) for serializing and deserializing new objects.

### Object Serialization
The mechanism of converting object state into a [byte stream](https://docs.oracle.com/javase/tutorial/essential/io/bytestreams.html) is called **Serialization**. We use  `writeObject`() method for serializing an Object

**Syntax for serializing an object**
```java
public final void writeObject(Object obj) throws IOException  
```

### Object Deserialization
 Deserialization is the process of using the byte stream to recreate an object in Java. We shall use the `readObject`() method for deserializing an object.

**Syntax for deserializing an object**
```java
public final Object readObject() throws IOException  
```

**Example**

In this example, we are using the Serialization and deserialization method to create an object.
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
public class Example1   
{   
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
### 5. Using clone() method
Whenever the clone() method is called by Java, it creates a new object and then gets all the content in the old object copied to it. A constructor does not get invoked when we use the clone() method to create an object. We implement the `Cloneable` class to use the clone() method.

**Syntax**
```java
object.clone()
```

**Example**

Let's look at an example of how to create an object using this method.

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
  
Student s2=(Student)s1.clone();  
  
System.out.println(s1.regno+" "+s1.name);  
System.out.println(s2.regno+" "+s2.name);   
}
catch(CloneNotSupportedException c){}
}  
}  
```
### Conclusion
In this article, we have looked at the different ways to create objects in Java. We can now easily create Objects in Java without using the `new` Keyword method.