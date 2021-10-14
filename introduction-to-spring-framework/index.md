### Introduction
The Pivotal Software Company invented and built Spring, a Java-based application framework. Spring can be said to be a programming framework for enterprise application development. 

Because of its extensive library and features, we can easily construct web-based apps. We'll talk about Spring 5 in this, which is the most recent and updated version of the traditional Spring framework.
### Table of content

- [Dependency Injection](#dependency-injection)

- [Benefits of the spring framework](#benefits-of-the-spring-framework)

- [Modules](#modules)

- [How to Make a Spring Application](#how-to-make-a-spring-application)

### Dependency Injection
Dependency Injection can also be referred to as inversion of control (IOC)

Dependency Injection feature allows the Spring container to put objects into other objects. Simply put, loose coupling of components is enabled, and the duty for component management is shifted to the container.

let us use the following code to understand:
```java
class teacher
{  
Address address;  
Employee()
   {  
address=new Address();  
   }  
}
```
In this example, the teacher and the Address are intertwined (tight coupling). This is how we accomplish it in the Inversion of Control scenario in the code below.
```java
class teacher
{  
Address address;  
teacher(Address address)
   {  
this.address=address;  
   }  
}
```
As a result of IOC, the code is loosely connected. If our logic is moved to a different environment, there will be no need to update the code. 

In the spring framework, injection of dependencies is carried out by the IOC container.

We, therefore, provide some metadata to the IOC container in form of an XML file or even an annotation.

### The Benefits of Dependency Injection
1. Makes it easy to maintain the code because it is loosely connected

2. Makes it simple to test the code
### Benefits of the Spring Framework
1. `Interconnecting of the various components`

Spring apps are loosely connected thanks to dependency injection. 

2. `Speed Development`

Spring Framework's Dependency Injection feature, as well as its ability to integrate with a variety of frameworks, makes for faster development of Java applications.

3. `Powerful abstraction `  

It makes abstraction powerful for JavaEE specifications such as JPA, JMS, JDBC, and JTA.

4. `They are simple to put to the test`

Spring frameworks are simple to put to the test because of the effect of the dependency injection, the application can be readily tested. 

In contrast to EJB or Struts applications, which require a server to execute, Spring framework applications do not.

5. `They are Lightweight`

The Spring framework is lightweight due to its Plain Old Java Object(POJO)implementation. 

Programmers are not supposed to inherit or even implement any classes or interfaces when interacting with the Spring Framework. It's because of this that it's referred to as non-invasive.

6. `The predefined template feature `

Templates for technologies like Java Database Connectivity(JDBC), Hibernate, and Java Persistence API(JPA) are included in the Spring framework. 

As a result, writing a lot of code isn't necessary. It obfuscates the basic steps of these technologies.

There will be no need to write a code to handle exceptions, create connections, build statements, commit transactions, or even close connections if you use JdbcTemplate as an example. 

Only the query execution code has to be written. As a consequence, this will save a more significant amount of JDBC code.

7. `Declarative support`

The declarative support steps in to support caching, validation, transactions, and formatting declaratively.

### Modules
These are some of the fundamental components of spring frameworks.

Spring framework entails various modules which include Test, Core Container, Aspect-Oriented Programming(AOP), Web (MVC / Remoting), Aspects, Instrumentation, and also Data Access and Integration.
1. `Test module`

For testing, this layer includes JUnit and TestNG capability.

2. `The Spring Core module's container`

The spring core container comprises several modules such as context, expression language, core, and beans.

3. `Beans and the Core module`

IOC and Dependency Injection are provided by the core and beans modules.

4. `The context module`

Internationalization (I18N), EJB, JMS, and Basic Remoting are all supported by the context.

5. `The Expression Language module`

It's an EL extension specified by JSP. Among other things, it lets you set and retrieve property values, invoke methods, access collections, and indexers, use named variables, logical and arithmetic operators, and retrieve objects by name.

6. `AOP, Aspects, and Instrumentation module`

Instrumentation, Aspects, and AOP These modules make it easier to create aspect-oriented programming using Advice, Pointcuts, and other decoupling approaches.

AspectJ integration is supported through the aspects module. The instrumentation module supports class instrumentation and also the classloader implementations.

7. `The Integration or Data Access module`

JDBC, ORM, OXM, JMS, and Transaction modules are all included in this category. These modules primarily provide a means of interacting with the database.

8. `web module`

Web, Web-Servlet, Web-Struts, and Web-Portlet are all part of this category. The creation of web apps is aided by these components.

Let's dive into the following example.
### How to Make a Spring Application

**We will begin by creating a class**
```java
package com.martin;  
  
public class lecturer
  {  
private String fName;  
  
public String getfName()
   {  
    return fName;  
   }  
  
public void setfName(String fName) {  
    this.fName = fName;  
}  
  
public void displayInfo(){  
    System.out.println("Hello: "+fName);  
}  
} 
``` 
This is a straightforward bean class with only one property fName and getter and setter methods. This class also contains a displayInfo() function that prints the lecturer's name next to the hello message.
 XML file creation

**After creating the class, let's go ahead creating an XML file**

The bean element is used to specify the bean for the given class. The property sub-element of bean demonstrates the property of the lecturer class's name. The IOC container will therefore set the value shown in the property element of the class object i.e lecturer.

**Let's now create or develop a test class**

Using the BeanFactory's getBean() function, we can retrieve the lecturer class object from the IOC container.
Now let's dive into the example below
```java
package com.martin;  
  
import org.springframework.beans.factory.BeanFactory;  
import org.springframework.beans.factory.xml.XmlBeanFactory;  
import org.springframework.core.io.ClassPathResource;  
import org.springframework.core.io.Resource;  
  
public class TestExample {  
public static void main(String[] args) {  
    Resource res=new ClassPathResource("applicationContext.xml");  
    BeanFactory factory=new XmlBeanFactory(res);  
      
    lecturer lec=(lecturer)factory.getBean("lecturerbean");  
    lecturer.displayInfo();  
}  
}
```  
Load the spring framework files you'll need

### Three files are required:

1. org.springframework.core-3.0.1.RELEASE-A
2. com.springsource.org.apache.commons.logging-1.1.1
3. org.springframework.beans-3.0.1.RELEASE-A

Run the test class

The output Hello: Shariff Ray will be seen.
### Conclusion
Spring framework deals with major challenges in java. Because of its advantages of a lightweight, easy to test, powerful abstraction, loose coupling, and fast development makes developers prefer the spring framework to develop applications through the use of POJO and POJI model programming.

 Before you learn the spring framework you need to have a piece of basic knowledge on java programming since it incorporates java features.