---
layout: engineering-education
status: publish
published: true
url: /implementation-of-dependency-injection-in-csharp/
title: Implementations of Dependency Injection in C#
description: This article will take the reader through implementations of dependency injection in C#. Dependency injection is a powerful technique for handling class interactions in any application.
author: james-bundi
date: 2022-05-04T00:00:00-11:15
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementation-of-dependency-injection-in-csharp/hero.png
    alt: Implementations of Dependency Injection in C# Hero Image
---
Dependency occurs when an object(a client) relies on another object(a service) to exist. An injector passes the service code to the client.
<!--more-->
The client object does not build a new object that it requires. Instead, it mocks the service object through an injector. This is known as dependency injection.

An injection, that is, passing a service to the client, is a primary key for this pattern. The client does not have to create or find the service.

Dependency injection makes unit testing (testing single units of the source code to ensure they are fit for use) efficient. It also improves code readability and reuse.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [An overview of dependency injection](#an-overview-of-dependency-injection)
- [Interfaces](#interfaces)
- [Implementing dependency injection using constructor injection](#implementing-dependency-injection-using-constructor-injection)
- [Implementing dependency injection using method injection](#implementing-dependency-injection-using-method-injection)
- [Implementing dependency injection using property injection](#implementing-dependency-injection-using-property-injection)
- [Implementing dependency injection using interface-based injections](#implementing-dependency-injection-using-interface-based-injections)
- [Merits of dependency injection](#merits-of-dependency-injection)
- [Demerits of dependency injection](#demerits-of-dependency-injection)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you should:
- Have basic knowledge of programming.
- Be equipped with knowledge of the c-sharp programming language.
- Have [Visual Studio](https://visualstudio.microsoft.com/downloads/) installed.

### An overview of dependency injection
A class that depends on a client class generates a client class object. This complicates the code in a way that:
- The code becomes coupled such that the inner class becomes dependent on the client class.
- Testing the class becomes hard since testing the client class is not easy.
- Changes to the client class will affect the inner class it depends on.
- The inner class cannot be reused since it is tied to the client class.

Dependency injection allows one to write loosely coupled code where two objects are independent of each other. This is achieved by separately creating the client's dependency on its behavior.

Introducing dependency injection in the above example results in loosely coupled code, the inner class will not be dependent on the client class.

### Interfaces
**Suppose** a client class A requires two service classes, class B and class C, but cannot directly instantiate them. A programmer can introduce an abstraction, i.e., `IClass`, to client class A rather than implementing classes B and C. This allows one to change IClass interface implementation at any time (for any number of times) without affecting class A's code.

The client expects an interface to be its dependency. The client is only required to know its name and interface. The client is also not affected by changes made to the interface.

Dependency injection can be implemented using:
- Constructor injection
- Method injection
- Property injection
- Interface based injection

### Implementing dependency injection using constructor injection
This is the most extensively used dependency injection technique. A parameterized constructor is required in this constructor dependency requiring an argument to be passed during object creation.

A constructor is a method called when a class object is created. In constructor injection, the client is required to provide a parameter. This makes sure the client instance/object is in a valid state.

The dependency is passed as a constructor argument. The injection component can be used anywhere in the class.

The following is a c-sharp code implementing constructor injection:

```c#
using System;
using System.Text;
using System.Linq;
using System.Collections.Generic;

// Get the dependency relationship for the service element
public interface IClass {
 // Initialize the method dependecy for class resource1 and resource2
 void Serve();
}
// Initialize Resource1
public class Resource1: IClass{
 public void Serve() {
     Console.WriteLine("Resource1 is Initialized");
 }
}
// Initialize Resource2
public class Resource2: IClass {
 public void Serve() {
     Console.WriteLine("Resource2 is Initialized");
 }
}
//  create an instance of Iclass
public class Client {
 private IClass _service;
 public Client(IClass service) {
    _service = service;
 }
 public void Serve() {
    _service.Serve();
 }
}
class Program {
 static void Main(string[] args){
 Resource1 r1 = new Resource1();
 Client cA=new Client(r1);
 cA.Serve();

 Resource2 r2 = new Resource2();
 // Passing the dependency
 cA = new Client(r2);
cA.Serve();
 }
}
```

Output:

```bash
Resource1 is Initialized
Resource2 is Initialized

```

`public interface IClass` becomes the client class's dependency with the method `serve()` used to inject the dependency to class service1 and service2.

Class service1 and service2 implement the Iclass interface as seen in `public class Resource1: IClass` and `public class Resource2: IClass`. They contain a `string` message to be passed during the `serve()` method call in object creation.

```c#
 Resource1 r1 = new Resource1();
 Client cA=new Client(sA);
 cA.Serve();

 Resource2 r2 = new Resource1();
 cA = new Client(r2);
cA.Serve();
```

Here, we create objects of class service1 and service2, which are passed as parameters to the object of the client class. The client class object c1 calls the `serve()` method that prints the string.

The client class takes an object of type IClient in the constructor where the injection happens, bypassing the service implementing the IClass interface. The dependency is passed during the creation of the client object.

### Implementing dependency injection using method injection
There's a seldom-used approach to inject dependencies through a client class's public function. A client class implemented interface declares which method will deliver the dependency. 

The injector delivers the dependence to the client class using the interface implemented by the client class. This method is suitable only when one method in a class needs dependence.

The following is a c-sharp code implementing method injection:

```c#
using System;

public interface IClass {
 void Serve();
}
// Initialize the Resource1
public class Resource1: IClass {
 public void Serve() {
       Console.WriteLine("Resource1 is Called");
   }
}
// Initialize the Resource2
public class Resource2: IClass {
 public void Serve() {
       Console.WriteLine("Resource1 is Called");
   }
}
// create an instance of Iclass
public class Client {
 private IClass _service;
 public void Start(IClass service) {
     service.Serve();
   }
}
class Program{
 static void Main(string[] args){
 // Create an object Resource1
 Resource1 r1 = new Resource1();
 // pass the dependency to resource1
 Client client = new Client();
 client.Start(r1);

 // Create an object Resource2
 Resource2 r2 = new Resource2();
 // pass the dependency to resource2
 client.Start(r2);
 }
}
```

Output:

```bash
Resource1 is Called
service is Called
```

From the code above, we have:

```c#
public class Client {
 private IClass _service;
 public void Start(IClass service) {
     service.Serve();
   }
```

This block of code is used to supply the injection with a `start()` method used by the client class implemented interface to supply the dependency.

```c#
client.Start(r1);
client.Start(r2);
```

The client class object passes the service classes objects to the start() method.

Service classes 1 and 2 implement the Iclass interface, including the serve() method. The injector client class uses this method to inject services 1 and 2.

The client class includes the `start()` method to set the object of the type class. The dependency is passed during the creation of the client object.

### Implementing dependency injection using property injection
Setter injection adds a dependency on a client class's public property. No new object creation or update is required.

The dependency can also be passed through:
- Using a setter method that stores the dependency in a variable.
- Making use of lazy loading - That is, not initializing the concrete class until the property of the dependent class is called.

The following is a c-sharp code implementing property injection:

```c#
using System;
using System.Text;
using System.Linq;
using System.Collections.Generic;

// Get the dependency relationship for the service element.
public interface IClass{
 // Initialize the method dependecy for class resource1 and resource2.
 void Serve();
}
// Initialize serviceA
public class ServiceA : IClass{
 public void Serve() {
    Console.WriteLine("ServiceA is Called");
 }
}
// Initialize serviceB
public class ServiceB : IClass{
 public void Serve() {
    Console.WriteLine("ServiceB is Called");
 }
}
public class Client {
 private IClass _service;
 public IClass Service {
 set {
    _service = value;
 }
 }
 public void Serve() {
     _service.Serve();
 }
}
class Program{
 static void Main(string[] args){
 Client client = new Client();

 ServiceA sA = new ServiceA();
 client.Service = sA;
 client.Serve();

 ServiceB sB = new ServiceB();
 client.Service = sB;
 client.Serve();
 }
}
```

Output:

```bash
ServiceA is Called
serviceB is Called
```

From the above code, we have:

```c#
public class Client {
 private IClass _service;
 public IClass Service {
 set { _service = value;}
 }
 public void Serve() {_service.Serve();}
}
```

Client class is dependent on the property of type IClient through the `Iclass _service`. The set method sets the object property where the dependency is injected.

We inject the dependency via a client class property. In this case, we will utilize a setter method. The dependency is then passed during client object creation.

Property dependency injection is used when we intend to create the dependency object when it is required.

### Implementing dependency injection using interface-based injections
Interface-based injection injects a dependency into a client via an interface. The dependency becomes the injector.

An interface-based injection is similar to property injection, using default getter and setter methods. However, interface-based injection sets the interface property using an explicit setter-getter interface.

The following is a c-sharp code implementing property injection:

```c#
//interface-based.
using System;
public interface IClass 
{
    string Serve();
}
public class Service: IClass
{
    public string Serve()
    {
        return "Service is called.";
    }
}
interface IClassA
{
    void Client(IClass service);
}
public class Idependency: IClassA
{
    IClass _service;
    public void Client(IClass service)
    {
        _service = service;
        Console.WriteLine(_service.Serve());
    }
}
class program
{
     public static void Main(String[] args)
     {
        Idependency interA = new Idependency();
         Service sA= new Service();
        interA.Client(sA);
    }
}
```

Output:

```bash
Service is called.
```

From the above code, we have:

```c#
interface IClassA{
    void Client(IClass Serve);
}
```

This interface provides the injector method that injects the dependency into the client class, making the dependence the injector. The dependency is then passed during the creation of the interface class object.

### Merits of dependency injection
As we have seen above:
- Dependency injection helps reduces class coupling (where alterations in one class do not force other classes to change).
- Dependency injection increases code reuse, and maintainability and improves testing.
- Dependency injection can be implemented in various ways, injecting dependency on the application.

### Demerits of dependency injection
Though dependency injection comes a long way in writing loosely coupled and easily maintained code, critics argue that:
- Clients demand configuration where defaults are available.
- Separating a client's behavior from its dependency makes it difficult to trace the code.
- It affects the automation of the integrated development environment since it implements dynamic programming.
- It contributes to framework dependency.

### Conclusion
Dependency injection is a powerful technique for handling class interactions in any application. The method is seemingly everywhere and is essential in several frameworks and domains.

Objects and services in dependency injection are easier to create, maintain, and flexible to changes.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)