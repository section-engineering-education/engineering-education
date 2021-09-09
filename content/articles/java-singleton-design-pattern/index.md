---
layout: engineering-education
status: publish
published: true
url: /java-singleton-design-pattern/
title: Java singleton design pattern
description: This article introduces the reader to the singleton design pattern in Java. Singleton is a combination of rules and programs that assures that only one entity of its type exists and gives other code a single point of access to it.
author: caroline-wanjiku
date: 2021-09-09T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/java-singleton-design-pattern/hero.jpg
    alt: Java singleton design pattern Hero Image
---

Singleton is a combination of rules and programs that assures that only one entity of its type exists and gives other code a single point of access to it. Singletons have nearly the same advantages and disadvantages as global variables.
<!--more-->
They are quite useful, yet they violate the modularity of the code. We utilize this model framework to limit any number of instances a class can be instantiated in the Java Virtual Machine, guaranteeing that always a single class instance occurrence exists.

### Table of contents
- [Overview on Singleton design pattern](#overview-on-singleton-design-pattern)
- [Loading singleton object with Eager](#loading-singleton-object-with-eager)
- [Loading lazy singleton object](#loading-lazy-singleton-object)
- [Synchronization of thread in lazy loading](#synchronization-of-thread-in-lazy-loading)
- [Lazy loading using Thread double-locking technique](#lazy-loading-using-thread-double-locking-technique)
- [Enum with Singleton Pattern](#enum-with-singleton-pattern)

### Overview on Singleton design pattern
The term "singleton" refers to a component that only has one instance and gives a global instance. By preventing the construction of a class, it guarantees that just one entity of that category of class resides within Java virtual machine.
In Java, a Singleton class facilitates the creation of just one instance and this one object or instance provides global access to all other classes. Fields that are unique to each case If we have such a feature like a class, such as the unique or static components, will only be used once.

#### Purpose of using a singleton class function.
One of the fundamental goals that a singleton type has is to reduce the number of entities that would be created to just one. This typically guarantees that acquire the components, like a socket or database connection, is controlled.
Because it restricts instance creation, there is no memory space waste when using a singleton class. Since this object will only be created once rather than whenever the latest proposal is submitted.
This single object can be used multiple times depending on the requirements. This is why the Singleton design in Java is commonly used in multi-threaded and database operations for cache, debugging, thread pools, and security configurations.

#### Singleton class design
For us to style a singleton class, it will require us the following things.

- To begin, we will use a private keyword to declare the Singleton class's constructor. We define it as private so that no other classes can use it to create or instantiate objects.
- A class with a private variable happens to be the only class with instance type.
- Construct a static main function that has the singleton class's objects as the return type.

#### Singleton class differences with normal class
1. When it comes to the technique of instantiating the class's entity, a Singleton class differs from other classes. Java constructors create a standard class. But moreover, if we want to initialize a class object of singleton type, we utilize the getInstance() function.
2. Another distinction is that a regular class disappears in the terminal of an application's lifecycle, whereas a singleton class does not.

If we create our class as (blueprint) and references for it, we will have the following;

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

When you create multiple instances, the values for both reference variables will be different. As a result, it is not a Singleton object. In the example above, r1 and r2 are two reference elements with different values.
If an object is null, lazy and eager design trends produce a new singleton entity or any specific entity, however, if the entity is not empty, they have to return another singleton entity objects alternatively other specific elements of the object.

We shall start with eager loading, for which we will need to remember a few guidelines for building eager loading entities.

### Loading singleton object with Eager
The Singleton keyword is the very first thing that springs to mind when thinking of making a class Singleton, however, no singleton is a principle in Java that can only be created by following the procedures listed below.

- A private class is a default constructor.
- Make any protected static class type object with the value null.
- Assign a parameter to the constructor of the singleton class type (as we did in step two).
- Initialize a public static getObject or getInstance function with a class object as the return value.

This is an example of how we can implement these above guidelines for object creation;

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

The result will be ;

```bash

Initial string:

LEARN TO USE EAGER INITIALIZATION
lowercase string example

learn to use eager initialization

```

In the example above we have created a private default constructor because a private constructor will not allow the creation of new objects.
The second step will be a creation of a private static class type variable, this will be a static variable because we will have to use it within the function to make the object.

The other step, use the class type variable we have obtained from the second step to create the object.

The last step is to structure getInstance to bring our object of singleton type because getInstance will be a static function that will produce just one instance of the class each time it is used.

The above illustration is known as eager loading, but there are some drawbacks to it: the reference object  is a category of static, which implies that it will be created and will  be available in memory when the class is loaded, making it a global variable since this object is available in local memory when any class is loaded. That is the disadvantage because if an object is bulky, it wastes memory and computing power. We employ the concept of lazy loading to get around this.

It is good to note that if we try to generate more Singleton instances, we will be unable to do so because one object was created previously and the singleton design pattern prohibits us from having more than one instance.

### Loading lazy singleton object
We already understand that when utilizing the `Eager Initialization` approach to generate the singleton class, we can result in the construction of an object that isn't needed, regardless of whether the application uses it or not. So, to get around this issue, you can use the `Lazy Initialization` technique to build a singleton class object.
The lazy Initialization technique postpones the class's creation until it is required. To put it another way, the object is only generated if it is required. This function prevents the class instance from being created twice.

Lazy initialization requires us to follow some procedure or steps, below are the steps to follow:
- Making the class's constructor not to be accessed by any other function outside its scope.
- Create a function that will not be used by other functions outside the function scope of the class and does not use the function.
- Create a factory method as the last step. This method initially determines whether or not the instance attribute is null. This will construct a singleton instance to be used and it will return it since it is not null; else, this will not construct any instance.

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

We will have our result as ;

```bash

We will show:
How to use lazy initialization

```

By constructing an object at the point of using the getInstance() method, this solution avoids the disadvantage of eager loading.

The first step in the preceding example is to establish a private default constructor, as a protected construct method inhibits' recent parameters from being generated. Then establish a protected static value. This must be non-changeable data because it is utilized when building objects within the constructor. We construct a getInstance function in the third and final stage to return the singleton class object based on criteria.

We should note that if we try to generate more Singleton instances, we will not be able to operate because the object is produced when the getInstance() method is called.

### Synchronization of thread in lazy loading
If we would have many instances, they have to make the objects to solve the flaw of the implementation above. When we first call getInstance, the object is null, so a new object is created; however, if we call it again and because we have an object, the earlier one will be given back since it will not be executed.

In a multithreaded context, a singleton class is created by a thread-safe singleton technique. The getInstance() method must be marked as synchronized. When we want to prevent many threads from accessing this technique at a similar moment we have to configure the method to be synchronized.

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

In the above code; two threads, r1 and r2, are specified, both of which call the same procedure, and both are initialized at an equal moment.

We should note that with thread, we may use synchronized with the `getInstance` method; however, making a method synchronized results in a lot of work, as the getInstance() function performs a lot of work, and it will reduce performance by a proportion of about one hundred, which is the issue with synchronized.

### Lazy loading using Thread double-locking technique
To solve the disadvantages of the earlier method with its time complexity, we can employ the idea of Double-Check Locking, which entails checking the object value twice that is.
1. Simply-if(object ==null)
2. In the Synchronized block

We can implement synchronized while generating objects to minimize the duration sophistication by synchronization by the`getInstance` function. As a result, rather than waiting about seventy milliseconds, we can wait as little as about four to three milliseconds.

The example below shows how to use a thread double-locking technique ;

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

In the example, we find a remedy for this issue of synchronous code overhead. This function's `GetInstance` is not synchronized, but the component that creates the instance is, thus only a few threads must wait the first time.

### Enum with Singleton Pattern
We have another way of creating a singleton pattern that overcomes the disadvantages of all four above implementations. From Java 1.5, there is just another technique for creating a singleton design pattern, which is thread-safe and uses fewer resources. This approach can only work if one uses Java 1.5 or higher.

Here is the syntax of an enum with a singleton pattern.

```java
 enum IJK
  {
      Instance; //private constructor (which should be inbuilt)
  }

```

Below is an example,

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

This will be the result.

```bash
15
25

```

There is an idea of decoding, despite the, we are dealing with Double-Check Locking (DCL). The readObject method will return a new object even if the class is a singleton.

When we are working with enums, there is a method called readResolve that will not generate a new object and instead uses the existing one.

### Conclusion
In this tutorial, We have seen that this class only has one item in it. We can create a Singleton using private constructors and the getInstance constructor function. We have also discussed how to construct a singleton design pattern using eager and lazy loading strategies, as well as thread, double-check locking, enum and the differences between singleton class and normal class.

Thank you for reading!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)