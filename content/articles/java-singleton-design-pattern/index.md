---
layout: engineering-education
status: publish
published: true
url: /java-singleton-design-pattern/
title: Java Singleton Design Pattern
description: This article introduces the reader to the singleton design pattern in Java. Singleton is a combination of rules and programs that assures that only one entity of its type exists, and gives other code a single point of access to it.
author: caroline-wanjiku
date: 2021-09-20T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-singleton-design-pattern/hero.jpg
    alt: Java Singleton Design Pattern Hero Image
---
Singleton is a combination of rules and programs that assures that only one entity of its type exists, and gives other code a single point of access to it. Singletons have similar advantages and disadvantages as global variables.
<!--more-->
They are quite useful yet violate the modularity of the code. We use this model framework to limit the number of instances of a class that can be created in the Java Virtual Machine. This model guaranties that only a single class instance exists.

### Table of contents
- [Overview of Singleton design pattern](#overview-of-singleton-design-pattern)
- [Loading singleton object with Eager](#loading-singleton-object-with-eager)
- [Loading lazy singleton objects](#loading-lazy-singleton-objects)
- [Synchronization of thread in lazy loading](#synchronization-of-thread-in-lazy-loading)
- [Lazy loading using Thread double-locking technique](#lazy-loading-using-thread-double-locking-technique)
- [Enum with Singleton pattern](#enum-with-singleton-pattern)

### Overview of Singleton design pattern
The term _singleton_ refers to a component that only has one instance. By preventing the construction of a class, it guarantees that only one entity of the class resides within the Java virtual machine.

In Java, a Singleton class facilitates the creation of only one instance. Tis one object or instance provides global access to all other classes.

Fields that are unique to each other and have such a feature like a class, such as the unique or static components, will only be used once.

#### Purpose of using a Singleton class function
One of the fundamental goals that a singleton type has is to reduce the number of entities that would be created to only one. This guarantees that access to components, such as a socket or database connection, is controlled.

Because it restricts instance creation, there is no memory space waste when using a singleton class. Since this object will only be created once rather than whenever the latest proposal is submitted.

This single object can be used several times depending on the requirements. This is why the Singleton design in Java is commonly used in multi-threaded and database operations for cache, debugging, thread pools, and security configurations.

#### Singleton class design
For us to style a singleton class, we will need the following:
1. A private keyword to declare the Singleton class's constructor. We define it as private so that no other classes can use it to create or instantiate objects.
2. A class with a private variable; that happens to be the only class with instance type.
3. Construct a static main function that has the singleton class's objects as the return type.

#### Singleton class differences with normal class
- When it comes to the technique of instantiating the class's entity, a Singleton class differs from other classes. Java constructors create a standard class. Moreover, if we want to initialize a class object of singleton type, we use the `getInstance()` function.
- A regular class disappears in the terminal of an application's lifecycle whereas a singleton class does not.

If we create our class as `blueprint` and add references, we will have the following:

```java
public class BluePrint
   {
    public static void main(String [] args)
    {
        blueprint p01 = new blueprint();
        blueprint p02 = new blueprint();
    }
}
```

When you create multiple instances, the values for both reference variables will be different. As a result, it will not be a Singleton class.

If an object is null, lazy, and eager, design trends produces a new singleton entity or any specific entity.

But, if the entity is not empty, they have to return another singleton entity object or other specific elements of the object. We will start with eager loading, for which we will need to remember a few guidelines for building eager loading entities.

### Loading Singleton object with Eager
The keyword `Singleton` is the very first thing that springs to mind if we are thinking of making a Singleton class. However, singleton is a principle in Java that can only be created when:
1. A private class has a default constructor.
2. Any protected static class type object is declared with the null value.
3. A parameter is assigned to the constructor of the singleton class type (as we did in step two).
4. We initialize a public static `getObject` or `getInstance` function with a class object as the return value.

Below is an example of how we can implement the guidelines above for object creation:

```java
public class EagerInitializations
{

  private static EagerInitializations object = new EarlyInitializations();
  public String string;

      private EagerInitializations()
      {
        string = "LEARN TO USE EAGER INTIALIZATION";
       }
         public static EagerInitializations getInstances()
         {
          return object;
          }
          public static void main(String args[])
            {
             EagerInitializations text = EagerInitializations.getInstances();

             System.out.println("Initial string:");
             System.out.println(text.string);
             System.out.println("lower case string example");
             text.string = (text.string).toLowerCase();
             System.out.println(text.string);
            }
            private static class EarlyInitializations extends EagerInitialization
           {
             public EarlyInitializations()
           {
        }
    }
}
```

The output will be:

```bash
Initial string:

LEARN TO USE EAGER INITIALIZATION
lowercase string example

learn to use eager initialization
```

In the example above, we have first created a private default constructor. This is because a private constructor will not allow the creation of new objects.

The second step is the creation of a private static class type variable. This will be a static variable because we will have to use it within the function to make the object.

The third step is to use the class type variable we have obtained from the second step to create the object.

The last step is to structure `getInstance` function to bring our object of singleton type. This is because `getInstance` function will be a static function that will produce only one instance of the class each time it is called.

There are some drawbacks to eager loading. One is that the reference object is a category of static, which implies that it will be created and will be available in memory when the class is loaded.

This makes it a global variable since this object is available in local memory when any class is loaded. This is a disadvantage because if an object is bulky, it wastes memory and computing power.

We use the concept of lazy loading to get around this. It is good to note that we can not generate more Singleton instances since one object was created before.

### Loading lazy Singleton objects
We already saw that if we use the `Eager Initialization` technique to create the singleton class, it results in the construction of an object that isn't needed, regardless of whether the application uses it or not.

To get around this issue, we can use the `Lazy Initialization` technique to build a singleton class object. The lazy Initialization technique postpones the class's creation to when it is required.

Lazy initialization requires us to follow the following procedures:
1. Make the class's constructor not accessible by any other function outside its scope.
2. Create a class function that will not be used by functions that are outside the class' scope.
3. Create a factory method as the last step. This method determines whether the instance attribute is null. If instance is null, a Singleton instance will be created. Otherwise, the available instance will be returned.

```java
public class UseLazyInitialization
  {
     private static UseLazyInitialization instances;
     public String strings;
     private UseLazyInitialization ()
         {
         string = "How to use lazy initialization";
           }
             public static UseLazyInitialization getInstances()
               {
              if (instances = null)
               {

               instances = new UseLazyInitialization ();
               }
              return instances;
             }
             public static void main(String [] args)
           {
           UseLazyInitialization message = UseLazyInitialization .getInstance();

           System.out.println("WE will show:");
           System.out.println(message.strings);
       }
    }
```

The output will be:

```bash
We will show:
How to use lazy initialization
```

By constructing an object at the point of using the `getInstance()` method, we avoid the disadvantage of eager loading.

The first step in the preceding example is to establish a private default constructor since a protected constructor method inhibits' recent parameters from being generated. Then, establish a protected static value.

This must be non-changeable data because it is utilized when building objects within the constructor. We construct a `getInstance()` function in the third and final stage to return the singleton class object based on a criteria.

### Synchronization of thread in lazy loading
If we have many instances, we have to make the objects solve the flaw of the implementation above. When we first call the `getInstance()` method, the object will be null, so a new object will be created.

If we call it again, the already created object will be returned. In a multi-threaded context, a singleton class is created by a thread-safe singleton technique.

The `getInstance()` method must be marked as synchronized. We do this when we want to prevent many threads from accessing this function at the same time.

```java
class OurSingleton
   {
    protected static OurSingleton object1;

    protected OurSingleton() {}

    public static synchronized OurSingleton getInstances()
    {
        if (object1 == null) {
            object1 = new OurSingleton();
        }
        return object1;
    }
}

public class BluePrint
{
    public static void main(String args[])
     {
        Threads r1 = new Threads(new Runables()
         {
            public void run()
            {
                OurSingleton a1 = OurSingleton.getInstances();
            }
        });

        Threads r2 = new Threads(new Runnables()
         {
            public void run()
            {
                OurSingleton a1 = OurSingleton.getInstances();
            }
        });

        r1.start();
        r2.start();
    }
}
```

In the code above, two threads r1 and r2 are specified, and both call the same procedure. They are initialized at the same time. We should note that when we have a thread, we should use synchronization with the help of a get `getInstance` method.

However, making a method synchronized results in a lot of work, as the `getInstance()` function performs a lot of work. Moreover, it will reduce performance by a proportion of about one hundred, which is the issue with synchronized threading.

### Lazy loading using thread double-checked locking technique
To solve the disadvantages of the earlier method with its time complexity, we can use the idea of Double-Checked Locking.

It entails checking the object value twice:
- Simply-if (object == null)
- In the synchronized block

We can implement synchronized threading while generating objects. This is to cut the duration sophistication by synchronization of the `getInstance` function.

As a result, we can wait for as little as about three to four milliseconds, rather than waiting about seventy milliseconds.

The example below shows how to use a thread double-checked locking technique:

```java
class OurSingleton {
    private static OurSingleton object1;

    private OurSingleton() {}

    public static synchronized OurSingleton getInstances()
    {
        if (object1 == null)
         {
            synchronized(OurSingleton.class)
            {
                if (object1 == null)
                    object1 = new OurSingleton();
            }
        }
        return object1;
    }
}

public class BluePrint
{
    public static void main(String args[])
    {
        Threads r1 = new Threads(new Runnable() {
            public void run() {
                OurSingleton a1 = OurSingleton.getInstances();
            }
        });

        Threads r2 = new Threads(new Runnable()
        {
            public void run() {
                OurSingleton a1 = OurSingleton.getInstances();
            }
        });

        r1.start();
        r2.start();
    }
}
```

In the example above, we find a solution to the issue of synchronous code overhead. This function's `GetInstance` is not synchronized, but the component that creates the instance is. Therefore, only a few threads must wait the first time.

### Enum with Singleton pattern
This is a way of creating a singleton pattern that overcomes the disadvantages of all the implementations that we looked at.

From Java 1.5, there is only one other technique for creating a singleton design pattern that is thread-safe and uses fewer resources. This approach can only work if one uses Java 1.5 or higher.

Here is the syntax of an enum with a singleton pattern:

```java
 enum IJK
  {
      Instance; //private constructor (which should be inbuilt)
  }
```

Below is an example:

```java
enum OurSingleton {
    INSTANCE;
    int y;
    public void show() {
        System.out.println(y);
    }
}

public class BluePrint
 {
    public static void main(String args[])
    {
        OurSingleton object2 = OurSingleton.INSTANCE;
        object2.y = 15;
        object2.show();

        OurSingleton object2 = OurSingleton.INSTANCE;
        object3.y = 25;
        object2.show();
    }
}
```

This will be the result:

```bash
15
25
```

When we are working with enums, there is a method called `readResolve` that will not generate a new object and instead uses the existing one.

### Conclusion
In this tutorial, we have seen that a Singleton class has only one item in it. We can create a Singleton using private constructors and the `getInstance` constructor function.

We have also discussed how to construct a singleton design pattern using eager and lazy loading techniques. As well as, thread, double-checked locking, enum, and the differences between singleton class and normal class.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
