---
layout: engineering-education
status: publish
published: true
url: /java-startup-detection-of-missing-modules/
title: Java Startup Detection of Missing Modules
description: This article introduces the learner to java modules used in java programming. Java Startup Detection of Missing Modules in a module with examples.
author: mercy-chebet
date: 2022-07-01T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-startup-detection-of-missing-modules/hero.jpg
    alt: Java startup detection of missing modules in a module with examples
---
Java 9, the latest Java release, introduced Java modules to the programming world. Earlier versions of Java used packages and access modifiers to associate related classes and hide certain classes and packages from others.
<!--more-->
The problem arose when explicit dependencies declared using import statements were called at runtime. The application could not detect missing modules until runtime, when the application would call the missing module. 

Dependencies are compiled at compile-time, allowing for a missing module to be reported earlier, compared to when the application is at runtime. This article introduces Java modules used in Java programming. We will make use of easy-to-learn module codes.

### Table of contents
- [Prerequisites](#prerequisites)
- [Overview of Java modules](#overview-of-java-modules)
- [Java module categories](#java-module-categories)
- [Creating Java Module](#creating-java-module)
- [Writing modular code](#writing-modular-code)
- [Exporting packages and importing modules](#exporting-packages-and-importing-modules)
- [Missing module scenario](#missing-module-scenario)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should have the following:
- Basic knowledge and understanding of [Java programming language](https://github.com/in28minutes/java-a-course-for-beginners).
- An IDE installed NetBeans preferably. Netbeans is available for [download here](https://netbeans.apache.org/download/index.html).

### Overview of Java modules
A **Java module** is a package-like mechanism that contains the java code and information about the module. It specifies how it should relate to other modules regarding visibility and use. If another java module is required for the application, a java module must contain information about this module. A modular JAR (Java ARchive) file packages the java modules, the module-info class, and descriptors.

As mentioned above, java modules were introduced in the latest java release, java 9, through the JPMS (Java Platform Module System) for the following reasons:
- To improve on a configuration where java modules enable explicit dependency declaration making it easier for the modules to be recognizable at compile time and runtime.
- Strengthen encapsulation (binding code elements to hide module implementation details). A java module must determine which internal modules are visible to external modules.
- Stabilize abstraction (hide essential details of a module from the user). We can do it by using interfaces only to show the modularity function.

### Java module categories
There are four different java modules in java 9. 

These include:
1. Application modules are used by developers when building application modules. They contain module-info class, explicit dependent modules, and packages needed in the application. Application modules cannot access unnamed modules.
2. Unnamed modules. The JAR file or class is not added on the module path in unnamed modules but rather on the classpath; therefore, it does not have any name. Hence it cannot export or read all modules.
3. Automatic modules are placed on the module path but lack the module-info class. They can access all modules.
4. Platform modules contain parts of the modified modular structure JDK are called platform modules.

Let us look at how to write modular code.

> Note: The Java Development Kit provides platform/Java SE/JDK modules.

#### Creating a Java module
The above content introduced you to java modules. Now we can write modular code using [NetBeans Integrated Development Environment](https://netbeans.apache.org/download/index.html). The following steps will walk you through creating and later writing java modular code.

##### Step one: Create a modular java project

![project](/engineering-education/java-startup-detection-of-missing-modules/project.PNG)

In this step, we will create a java project to house our java modules. Create a new Java project and name it `JavaModule`.

![project2](/engineering-education/java-startup-detection-of-missing-modules/project2.PNG)

##### Step two: Create a new java module

![module](/engineering-education/java-startup-detection-of-missing-modules/module.PNG)

Java modules should have a unique name and should only contain full stops. The module creates a default package that contains the module-info.java class. The module-info.class is used to declare the dependencies within our java module project.

![package](/engineering-education/java-startup-detection-of-missing-modules/package.PNG)

A java module can contain one or more packages, whereas in our case, the hellolearner module will contain the default package and the com.javamodule.demo. The `com. ` prefix is used to name packages in java which means commercial. 

Java package name prefixes can vary. Edu., gov., net., org., or more. Within the module, we will create a java class named HelloLearner.java. This class will be the main class function used in our java code.

![class](/engineering-education/java-startup-detection-of-missing-modules/class.PNG)

Repeat the above process from creating a new model under the Java Module project. The code project structure should look like this:

![structure](/engineering-education/java-startup-detection-of-missing-modules/strucure.PNG)

### Step three: Writing modular code
We can now write our java modular code using the above java modules.

```java
 //hellolearner/module-info.java
module hellolearner 
{
}
```

We leave the `hellolearner-module-info.java` class blank for later use when exporting the module package.

```java
//HelloLearner.java
package com.javamodule.demo;

public class HelloLearner 
{
    public static void welcomelearner() 
    {
        System.out.println("Hello learner. Welcome to section engineering java module tutorial.");
    }
}
```

The `com.javamodule.demo` package is our user-defined package that houses the `HelloLearner.java` class. We create the main function, `welcomelearner()`, inside the `HelloLearner.java` class.

```java
//learn/module-info.java
module learn 
{
}
```

We leave the learn-module-info.java class blank for later, when we need to import the `com.javamodule.demo`.

```java
//Learner.java
package com.learn;

public class Learner 
{
    public static void main(String[] args) 
    {
    }
}
```

We leave the Learner.java class blank. This class will be used to call the `welcomelearner()` function in the `hellolearner-HelloLearner.java` class.

Both hellolearner and learner modules are currently independent.

### Step four: Exporting packages and importing modules
Above, we mentioned that java modules could use explicitly mentioned packages from other modules. The packages are exported using the `export` statement. The `requires` statement includes the imported module and shows the dependency.  

```java
//hellolearner/module-info.java
module hellolearner
{
    exports com.javamodule.demo;
}
```

```java
//learn/module-info.java
module learn 
{
    requires hellolearner;
}
```

We can use the `HelloLearner.java` class from the above codes by exporting the `com.javamodule.demo` package containing the `HelloLearner.java` class from the hellolearner module. 

We can only access this package from other modules if it is explicitly exported. `requires hellolearner` includes the hellolearner module in the learning module.

```java
//Learner.java
package com.learn;

import com.javamodule.demo.HelloLearner;

public class Learner 
{
    public static void main(String[] args) 
    {
        HelloLearner.welcomelearner();
    }
}
```

```bash
Hello learner. Welcome to section engineering java module tutorial.
```

Now we can use the HelloLearner.java class inside the Learner.java class. `HelloLearner.welcomelearner();` calls the `welcomelearner()` function imported from the `HelloLearner.java` class. The above result is the output.

### Step five: Missing module scenario
We mentioned how earlier versions of java encountered problems when explicit dependencies declared using `import` statements were called at runtime time. When the application tried using a module and discovered that it was missing, it would raise an error and crash. Java 9 made things much easier when dealing with java modules.

Suppose we failed to import the `hellolearner` module and intended to use the `HelloLearner.welcomelearner()` function in the `Learner.java` class. The compiler would throw an error package that `com.javamodule.demo` is not visible.

### Wrapping up
Modules have many benefits, as explained above. They mainly come in handy when the developer comes across non-modular applications.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
