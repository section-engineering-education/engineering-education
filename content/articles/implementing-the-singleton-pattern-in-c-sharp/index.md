---
layout: engineering-education
status: publish
published: true
url: /implementing-the-singleton-pattern-in-c-sharp/
title: Implementing the Singleton Pattern in C#
description: This article will discuss how the singleton pattern can be implemented in C#. It will look at the benefits and problems of the pattern, and also explain the different ways in which the singleton pattern can be applied.
author: winnie-mwende
date: 2021-10-19T00:00:00-11:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-the-singleton-pattern-in-c-sharp/hero.jpg
    alt: Implementing the Singleton Pattern In C# Hero Image
---
Design patterns are a set of coding conventions for resolving recurring issues in software development. As the name implies, singleton pattern creates an individual instance of the class.
<!--more-->
The restriction should be applied when only one of the instances of a class can exist. It is recommended to have only one instance of caches, thread pools, and registries.

Singleton pattern was created to give a standard means of supplying a specific instance of an element all across the life of an application. Put it in another way; if the application isn't restarted, the model will remain the same.

### Table of contents
- [Overview of what is Csharp singleton design pattern.](#overview-of-what-is-csharp-singleton-design-pattern)
- [Advantages and disadvantages of using Csharp singleton pattern.](#advantages-and-disadvantages-of-using-csharp-singleton-pattern)
- [Static methods Vs singleton class.](#static-methods-vs-singleton-class)
- [Fully lazy instantiation.](#fully-lazy-instantiation)
- [Performance vs laziness. ](#performance-vs-laziness)
- [Exceptions.](#exceptions)

### Overview of what is Csharp singleton design pattern
One of the commonly used design patterns in C# is the singleton pattern. This design pattern uses a single instance of a class to enable global access to the class members.

Instead of having several instances of the same class, singletons have just one instance, and provide convenient access to that single instance.

A singleton pattern can be implemented in C# in several ways, and they have the following qualities in common:
- A static and open method of obtaining the instance's reference.
- Single constructor with no parameters in the public domain.
- Holds references to the single newly produced instance in a static variable.
- Class is kept secret.

### Advantages and disadvantages of using Csharp singleton pattern
Let us examine the benefits and drawbacks of using the singleton pattern.

#### Benefits of the singleton pattern of design
1. Interfaces can be implemented using the singleton approach.
2. Lazy loading is possible, and static initialization is used.
3. It aids in the concealment of underlying dependence.
4. In this way, it's simple to maintain because it only has one access point.

#### Problems with the singleton pattern
The following are some of the drawbacks of using the singleton pattern:
1. Since unit testing brings a global state to an application, it can be challenging.
2. Locking reduces the amount of parallelism that can exist within a program.

### Static methods Vs. singleton class.
A comparison of the singleton class and static methods is as follows:
- It is not possible to extend a static Class, although it is possible to develop a class in singleton form.
- Even though static class cannot be created, it can be initialized by a singleton class.
- When a program containing a static class is loaded, the Common Language Runtime (CLR) automatically loads the class into memory for you.

We can implement the singleton pattern in different ways, which include the following:
1. Safe singleton with no thread.
2. Singleton for thread-safety.
3. Using double-check locking to ensure thread safety in a singleton.
4. No lock thread-safe
5. Using the Lazy <T> type from .NET 4.

#### 1. Using a safe singleton with no thread

```C#
public closed class OurSingleton01 {
    private OurSingleton01() {

    }
    private static OurSingleton01 instances = null;
    public static OurSingleton01 Instances {
        get {
            if (instances == null)
             {
                instances = new OurSingleton01();
            }
            return instances;
        }
    }
}
```

**Explanation**

The code above is not designed to run in a multi-threaded environment.

Whenever two concurrent threads determine that the condition (if instance == null) to true, they both construct instances of the class which violates the singleton framework pattern.

> There is no way to guarantee that a new instance variable will be observed by other threads even if the expression has already been run. This is due to how memory architecture works.

#### 2. Using a singleton for Thread-Safety

```C#
public closed class OurSingleton01
{
    private static OurSingleton01 instances = null;
    protected static readonly obj1 codelock = new obj1();

    OurSingleton01()
    {
    }

    public static OurSingleton01 Instances
    {
        get
        {
            lock (codelock)
            {
                if (instances == null)
                {
                    instances = new OurSingleton01();
                }
                return instances;
            }
        }
    }
}
```

**Explanation**

This version is thread-safe. A lock of a sharing entity is obtained and a duplicate check is performed before generating an instance.

Having a lock prohibits various threads from generating the same class object, because locking ensures that all read operations occur logically after the lock has been acquired on a particular item.

Unlocking ensures that all writes happen logically before the lock releases.

Since only a single thread can be in that particular area of the code, the first thread will already create the instance; hence the expression evaluates to false.

Obtaining a lock each time an instance is requested degrades performance.

Instead of locking on the type (Singleton), this method locks on the static value of a class variable.

If you close an element that other classes can acquire and lock on, one may have a stalemate.

Class-specific objects, as a general rule, should be kept out of the public eye. As a result, writing thread-safe programs is a lot easier now.

#### 3. Using double-check locking to ensure thread safety in a singleton

```C#
public closed class OurSingleton01
{
    protected static OurSingleton01 instances = null;
    protected static readonly obj codelock = new obj();

    OurSingleton01()
    {
    }

    public static OurSingleton01 Instances
    {
        get
        {
            if (instances == null)
            {
                lock (codelock)
                {
                    if (instances == null)
                    {
                        instances = new v();
                    }
                }
            }
            return instances;
        }
    }
}
```

**Explanation**

By not using locks, this approach aims to be more thread-safe than previous iterations.

The pattern seems to have the following drawbacks:

1. In Java, it's a non-starter. The singleton paradigm in Java is helpful for C# programmers and Java programmers.

Therefore, it is worth understanding that if we ever use it, there is no guarantee that the constructor will complete it before the new object's reference is allocated to an instance; in the Java memory model.

Despite revisions to the Java memory framework in version 1.5, double-check locking remains problematic due to the lack of a volatile variable (like in C#).

2. The ECMA CLI protocol has the same problem because there are no memory boundaries. Using .NET memory architecture (which happens to be better than the ECMA specification) may make it safe. If we want it to work, we can make the instance variables volatile or use explicit memory blocking calls.

3. Making a mistake is relatively easy. If the pattern does not follow what was specified, any substantial alterations will influence performance or accuracy.

4. It's still not up to the later ones in terms of performance.

#### 4. Using a no lock thread-safe function

```C#
public closed class OurSingleton01
{
    private static readonly OurSingleton01 instances = new OurSingleton01();


    static OurSingleton01()
    {
    }

    private OurSingleton01()
    {
    }

    public static OurSingleton01 Instances
    {
        get
        {
            return instances;
        }
    }
}
```

**Explanation**

Even though it was so simple to see, why was it thread-safe? And how lazy was it to boot up in the background?

Once per AppDomain, the static constructor of C# runs when a new instance of the object or a static component is instantiated or linked.

A new type check must be performed independent of what else is going on. This check will then be faster than its predecessor instances' additional checking because it is checking for a freshly created type.

However, there are a few points to note:
- This differs from the other implementations, in that it works harder. A static element besides an instance must first be created before it can be used.
- Things get difficult if a static constructor invokes another static constructor, which calls the original. Static constructors have implications, and it is essential to be aware of them. In a cycle, for example, they keep referring to one another.
- The .NET assures lazy category initializers if, indeed, the type is not marked with the `beforefieldinit` unique flag. The C# compiler, however, tags as `beforefieldinit`, those types that do not have a static constructor.

> You can eliminate the property by making instances public static read-only variables. The actual skeleton code is now tiny. While Just-in-time inlining may improve speed, many people prefer a variable in case subsequent action is required. Note that lazy requires the static constructor.

#### 5. Using the Lazy <T> type from .NET 4
System.Lazy <T> makes laziness super-simple in .NET 4 (and higher) applications. You must use a lambda expression to pass a delegate to a constructor that references the Singleton constructor:

```C#
public closed class OurSingleton01
{
    private static readonly Lazy<OurSingleton01> lazy =
        new Lazy<OurSingleton01>(() => new OurSingleton01());

    public static OurSingleton01 Instances { get { return lazy.Values; } }

    private OurSingleton01()
    {
    }
}
```

**Explanation**

It will be easy to use and reliable. You may also have to use the `IsValueCreated` property to see if the instance has been created or not - if it will be necessary.

For the `LazySingleton,` the default thread-safety mode is `LazyThreadSafetyMode.ExecutionAndPublication`. You may want to try out several methods to see if they meet your needs.

### Full lazy instantiation

```C#
public closed class OurSingleton01
{
    private OurSingleton01()
    {
     }

          public static OurSingleton01 Instances { get { return Nested.instances; }
          }

             protected class Nested
            {

             static Nested()
           {
        }

        static readonly OurSingleton01 instances = new OurSingleton01();
    }
}
```

**Explanation**

An instance of the very first incidence seems to be the only place where instantiation can be initiated by the nested object; a static element.

The original concept of the version will be in a lazy manner and have all performance gains. It is not necessarily true that although nested classes can access the secret members of their parent, they can still access them in the other way (reverse).

A class that has been private is not a problem because the code is somewhat more complex to make the instantiation to be lazy.

### Performance vs. laziness
Unless your class setup is extremely time-consuming or has unforeseen consequences elsewhere, we probably won't need the explicit static constructor.

By allowing the Just-in-time compiler to make a single request (for example, at the beginning of a method), we can certify that this category has been initialized.

Creating an application using a singleton instance and a tight loop can have a substantial impact on performance. It determines if lazy instantiation is necessary or not.

### Exceptions
A singleton constructor must be used for tasks that can raise an exception but are not fatal to the application.

There's a chance that the app can fix the issue, so you could want to give it another shot!

At this point, using the category of initializers to build the singleton is troublesome. However, the intended action (running the type initializer afresh) is not always done by different runtimes, and when it is done, the code becomes wrong on other runtimes.

### Conclusion
In this tutorial, we have seen that the singleton pattern refers to a class that only allows the development of a single instance, and typically offers easy accessibility to that instance.

We have also discussed how useful the singleton pattern is in the C# language and how to implement it differently.

I hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
