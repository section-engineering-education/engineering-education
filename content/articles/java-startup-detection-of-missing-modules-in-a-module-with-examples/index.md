### Introduction
This article introduces the learner to java modules used in java programming. We will make use of easy-to-learn module codes. Java 9, the latest java release, introduced java modules to the world of programming. Earlier versions of java used packages and access modifiers to associate related classes and hide certain classes and packages from other classes.

The problem arose when explicit dependencies declared using ‘import’ statements were called at runtime time. The application could not detect missing modules until runtime, when the application would call the missing module. Dependencies are compiled at compile time, making room for a missing module to be reported early compared to when the application is at runtime.

Let us dive into Java modules.

### Table of Contents

- [Prerequisite](#prerequisite)
- [Overview of Java Modules](#overview-of-java-modules)
- [Java Module categories](#java-module-categories)
- [Creating Java Module](#creating-java-module)
- [Writing Modular Code](#writing-modular-code)
- [Exporting Packages and Importing Modules](#exporting-packages-and-importing-modules)
- [Missing Module scenario](#missing-module-scenario)
- [Conclusion](#conclusion)

### Prerequisite
- The learner should have basic knowledge of programming. They should be equipped with knowledge of the [Java programming language](https://github.com/in28minutes/java-a-course-for-beginners)
- Running python codes requires a Java IDE. For this article, we will use NetBeans. Netbeans is available for [download here](https://netbeans.apache.org/download/index.html).

### Overview of Java Modules
A java module is a package-like mechanism that contains the java code and information about the module. It specifies how it should relate to other modules regarding visibility and use. If another Java module is required for the application, a java module must contain information about this module.
A modular JAR (Java ARchieve) file packages the java modules, the module-info class, and descriptors.

As mentioned above, java modules were introduced in the latest java release, java 9, through the JPMS (Java Platform Module System) to;
- Improve on a configuration where java modules enable explicit dependency declaration making it easier for the modules to be recognized at compile time and runtime
- Strengthen encapsulation (binding code elements to hide implementation details of a module). A java module must determine which internal modules are visible to external modules.
- Stabilize abstraction (hide essential details of a module from the user). We can do it by using interfaces only to show the modularity function.

### Java Module categories
There are four different java modules in java 9. They include;
- Application modules are used by developers when building application modules. They contain module-info class, explicit dependent modules, and packages needed in the application. Application modules cannot access unnamed modules.

- Unnamed modules. The JAR file or class is not added on the module path in unnamed modules but rather on the classpath. This means it does not have any name. Hence it cannot export or read all modules.

- Automatic modules. They are placed on the module path, but they lack the module-info class. They can access all modules. 
Let us look at how to write modular code.

- The Java Development Kit provides platform/Java SE/JDK  modules.

### Creating Java Module
The above content introduces you to java modules. Now we can write a modular code using NetBeans Integrated Development Environment. The following steps will walk you through creating and later writing a java modular code.
-  Create a modular java project

![project](/engineering-education/java-startup-detection-of-missing-modules-in-a-module-with-examples/project.png)

We start by creating a java project to house our java modules. Creating a code is to make organized source code, tests, and libraries that are portable, small, and reliable. We name our java project `JavaModule`.

![project2](/engineering-education/java-startup-detection-of-missing-modules-in-a-module-with-examples/project2.png)

- Create a new java module

![module](/engineering-education/java-startup-detection-of-missing-modules-in-a-module-with-examples/module.png)

Java modules should have a unique name and should only contain full stops. The module creates a default package that contains the module-info.java class. The module-info.class is used to declare the dependencies within our java module project.

- Create a java package

![package](/engineering-education/java-startup-detection-of-missing-modules-in-a-module-with-examples/package.png)

A java module can contain one or more packages, whereas in our case, the hellolearner module will contain the default package and the com.javamodule.demo. The `com. ` prefix is used to name packages in java which means commercial. Java package name prefixes can vary. Edu., gov., net., org., or more.
Within the module, we create a java class named HelloLearner.java. This class will be the main class function used in our java code.

![class](/engineering-education/java-startup-detection-of-missing-modules-in-a-module-with-examples/class.png)

Repeat the above process from creating a new model under the Java Module project. The code project structure should look like this;

![structure](/engineering-education/java-startup-detection-of-missing-modules-in-a-module-with-examples/strucure.png)

### Writing Modular Code
We can now write our java modular code using the above java modules.

```java
 //hellolearner/module-info.java
module hellolearner 
{
}
```

We leave the `hellolearner-module-info.java` class blank for later use in exporting the module package.

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

We leave the learn-module-info.java class blank for later use of importing the `com.javamodule.demo`.

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

Both hellolearner and leaner modules are currently independent.

### Exporting Packages and Importing Modules
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

We can use the `HelloLearner.java` class from the above codes by exporting the `com.javamodule.demo` package containing the `HelloLearner.java` class from the hellolearner module. We can only access this package from other modules if it is explicitly exported. `requires hellolearner` includes the hellolearner module in the learning module.

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

Now we can use the HelloLearner.java class inside the Learner.java class. `HelloLearner.welcomelearner();` calls the `welcomelearner()` function imported from the `HelloLearner.java` class. This outputs the above result.

### Missing Module scenario
Above, we mentioned how earlier versions of java encountered problems when explicit dependencies declared using ‘import’ statements were called at runtime time. When the application tried using a module and discovered that it was missing, it would raise an error and crash. Java 9 made things much easier when dealing with java modules.

Suppose we failed to import the hellolearner module and intended to use the `HelloLearner.welcomelearner()` function in the `Learner.java` class. The compiler would throw an error `package com.javamodule.demo` is not visible.

### Conclusion
Modules have a lot of benefits, as seen above. They mainly come in handy when the developer comes across non-modular applications.

Happy Coding!