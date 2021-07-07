---
layout: engineering-education
status: publish
published: true 
url: /engineering-education/inversion_of_control_principle/
title: Inversion of control principle
description: Inversion of Control(IoC) is a software design principle used in object-oriented programming to reverse control and achieve loose coupling of classes. Coupling measures how closely connected software modules are to each other, while control refers to any other additional responsibility a class has apart from its primary responsibility. Remember the S in SOLID principles of object-oriented design? Let me help you: Singularity of Purpose—that is the objective of IoC. Loose coupling in software engineering is often a sign of testable, well-structured, maintainable, and readable software.
author: love-otudor
date: 2021-07-16T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/inversion_of_control_principle/hero.jpeg
    alt: Inversion of control principle cover image 
---

Inversion of Control(IoC) is a software design principle. It helps to reverse control in object-oriented programming. Control here is any extra responsibility a class has besides its main responsibility. IoC passes the control of an object’s creation, the flow of an application, etc. to a container or framework.

IoC inverts the control of creating and managing objects from the programmer to a container. This container manages the creation and lifecycle of objects in the application. IoC helps us create large systems by eradicating the responsibility of creating objects.

Imagine this: suppose you have a bakery that specializes in making egg rolls. What is an egg roll without an egg? Right. So eggs are essential in the making of egg rolls. Why egg rolls you may ask? Well, you could call it plain nepotism. So how do we get a bakery that obeys the IoC principle? Well, rather than having a poultry farm and involving yourself with all the poultry-related tasks, you order the eggs and get them delivered to you. This time, you don't have to worry about the chicks and the eggs being healthy, or if you are using the right feed, and all. With this new design, you can focus on making egg rolls, which results in a more effective baking process. This is the big idea behind IoC: separating concerns.

### Here are some of the benefits of using IoC:
* Easy to switch between different implementations of a particular class at runtime.
* It increases the modularity of the program.
* It manages an object’s lifecycle and configuration. Some objects can be singletons, while we can create others per request.

Before we look at some code, here are some things you should have in mind:

### 1. Coupling
Coupling is a measure of how closely bound software modules are to one another. It is the degree to which changes made to a component force a need for a change in other components or modules. Tight coupling is when a change in component A requires a change in component B. Loose coupling means that components A and B are independent. Thus a change in component A would not affect B.
Loose coupling is often a sign of testable, well-structured, maintainable, and readable software. Tight coupling leads to code fragility and code rigidity. Code fragility is the likelihood that a software will break in many places every single time there is a change. Code rigidity is the degree of difficulty in making changes to the software. 

### 2. Abstraction
When you call something abstract, it means that it is incomplete or not clearly defined. Abstraction is a programming approach that hides implementation details. Revealing only the functionality (relevant operations) to the user. It is one of the basic concepts in object-oriented programming.

### 3. Single Responsibility Principle
This principle states that every function, or class, or module, should have a single reason to change. They must have only one responsibility.
#### Advantages:
a. It makes the code easy to understand, fix, and maintain.
b. Classes are less coupled and more resilient to change.
c. More testable design.

### 4. Dependency Inversion Principle
The Dependency Inversion Principle (DIP) enables us to create loosely coupled systems. Making them easy to change and maintain. DIP states that:
* High-level modules shouldn't depend on low-level modules. They should rather depend on abstractions.
* Abstractions shouldn't depend on details. Details should depend on abstractions.
**High-Level modules** are modules written to solve problems and use cases. They are abstract and map to the business domain(business logic). Their concern is with what the software should do and not how they should do it.
**Low-Level Modules** are implementation details required to execute the business policies (logic). They are the plumbing or internals of a system, and they tell us how the system(software) should do various tasks. They tend to be very concrete.

![dependency flow](/engineering-education/ioc_principle/dependecy_inversion_principle_image_1.png)

For Class A to work, it depends on two low-level modules: Class B and Class C.
This doesn't follow the dependency inversion principle. This is because Class A, which is a high-level module, depends on Class B and C, which are low-level modules.
To make this code obey the DI principle, extract the interface for the low-level modules. This would give us something that looks like this:

 ![dependency flow](/engineering-education/ioc_principle/dependecy_inversion_principle_image_2.png)

This abstraction could be an interface or an abstract class. Now we can head back to the main focus—Inversion of Control.
 


Inversion of control only provides design guidelines and not implementation details.
A design principle is not constricted to any programming language. You can implement it whichever way you please. However, Design patterns recommend a definite implementation. Design patterns are more like reusable solutions to a problem in a given scenario.
 
Thus, we can apply IoC in object-oriented programming in many ways. Some of which are:
* Dependency injection pattern
* Strategy design pattern
* The service locator pattern, and many others.
Let's look into dependency injection and strategy design patterns.
 
### 1. Dependency Injection (DI)
Dependency Injection is a design pattern mostly used with the Dependency Inversion Principle. It makes it possible for dependent objects to be created outside of a class. It then provides those objects to the class.
If we have a class `LoginManager` that depends on an implementation of `UserRepository`.
 
 ```kotlin

class LoginManager {

    val userRepository: UserRepository = UserRepositoryImpl()
 
}
```

We can see that there is a high dependency between `LoginManager` and `UserRepository`. `LoginManager` is directly dependent on the `UserRepository` because `UserRepository` handles its creation. This violates the dependency inversion and Single Responsibility Principle. The result is a tight couple between `LoginManager` and `UserRepository`.

There are a couple of ways to fix this:

**a. Using public setters:** This is not a recommended approach. This is because it might leave objects in an uninitialized state.

```kotlin
class LoginManager {
    lateinit var userRepository: UserRepository
  
}

fun main(args: Array) {

    val loginManager = LoginManager()
    loginManager.userRepository = UserRepositoryImpl()

}
```


**b. Declare all the dependencies in the component's constructor.** This would look like this:

```kotlin
class LoginManager (val userRepository: UserRepository){

	//Do something...
}
fun main(args: Array) {

// In the caller function, create an instance of UserRepository
    val userRepository = UserRepositoryImpl()

// use the UserRepository instance to construct an instance of LoginManager
    val loginManager = LoginManager(userRepository)

}
```


`LoginManager` now has a constructor that accepts `UserRepository` abstraction as a parameter. `LoginManager` can now make use of `UserRepository` whichever way it pleases. This is because `UserRepository` is now a field in the `LoginManager` class.
`LoginManager` is no longer responsible for creating its own dependencies. It is now the caller’s job in this case—the main function. The main function provides the required dependency which is `UserRepositoryImpl`. This way, we can have different implementations of `LoginManager` and easily test it in different contexts.

Let’s look at a more complex scenario:

![dependency flow](/engineering-education/ioc_principle/dependency_injection.png)

We can see that Class A and B have no dependencies. Class C is dependent on Class A. Class D is dependent on Class B and Class E is dependent on both Class C and D. 
If we want to call a method on or create an instance of class E, we would have to create all its required dependencies. We would need to create concrete instances of Classes A, B, C, and D in a particular order. Firstly, we would create instances of Class A and Class B. This is because they have no dependencies. Next, we would create instances of classes C and D. This is because we have instances of their respective dependencies A and B. Finally, we can create an instance of Class E.
Whew! Right? This is a simple example with just 5 classes. Imagine what would happen with real-life projects. There could be hundreds of classes that have to be instantiated every single time. That would be a whopping load of redundant work. Dependency injection is a great technique needed for achieving loosely coupled classes. But we can see here that doing it manually is not such a good idea.

Also, if you want to consider the lifecycle of these objects. Supposing you want Class C to be a singleton, and create D on every request. Handling this manually would involve a lot of logic and redundant codes. This is where manual dependency injection comes in. With manual DI, you can create your own dependencies container class. This container will house your application’s dependencies. The IoC or DI Container now controls the creation and lifecycle of the objects. This way, you don't have to create instances of these objects every single time you need them anymore. 
Dagger and hilt can automate this process and generate the necessary code for you.

IoC Containers are mostly used in an application for objects like:
* Services,
* Data Access, or
* Controllers.

 You mustn't create instances of entities, data transfer, or value objects in containers. You can always create new instances of them when needed. This is okay from an architectural point of view.


### 2. Strategy design pattern
Strategy Pattern is a behaviour design pattern. It makes it possible to change the behavior of a class or its algorithm at run time.
Assuming we have an interface called `LaundryBot`. The `LaundryBot` will have methods for washing, drying, and folding. Different fabric types will use this interface. An example is the CashmereLaundryBot and SilkLaundryBot used for laundering cashmere and silk.

We should have in mind that:
a. All items supplied to the laundry can either be hand-washed or machine-washed.
b. All items supplied to the laundry can either be sun-dried or dried using a dryer.
c. All items are being folded in the same way. This means that fold will be a default method in the `LaundryBot` interface.

```kotlin
interface LaundryBot{
   fun wash()
   fun dry()
   fun fold(){
       //fold items
   }
}
```

We said an item can either be hand or machine washed and can either be sun-dried or dried using a dryer (machine dried). This means that any `laundryBot` class would have either of these methods. So if we have a DenimLaundryBot, and a CottonLaundryBot. They would both have the same piece of code for their wash and dry implementations of `LaundryBot`. This is because both denim and cotton will be machine washed and machine dried. How do we take care of this code duplication? Now, this is where the strategy pattern comes in.
The Strategy pattern encapsulates a set of algorithms that are interchangeable at runtime. How do we implement this in `LaundryBot`?
To do this, we would remove the wash() and dry() methods from the `LaundryBot` interface. We would then make them interfaces called `Wash` and `Dry`. These interfaces would have methods wash() and dry() respectively.

```kotlin
interface Wash{
   fun wash()
}
interface Dry{
   fun dry()
}
```

Next, we provide concrete implementations of these interfaces. This way, we can encapsulate the different behaviors for each case of wash and dry. To do this, create classes called `MachineWash` and `HandWash` that inherit from `Wash`. In the same way, `MachineDry` and `SunDry` will inherit from `Dry`.
 
```kotlin
object MachineWash: Wash{
   override fun wash() {
       //Perform Machine Wash
   }
 
}
 
object HandWash: Wash{
   override fun wash() {
       //Perform Hand Wash
   }
 
}
 
object SunDry: Dry{
   override fun dry() {
       //Perform Sun Dry
   }
 
}
 
object MachineDry: Dry{
   override fun dry() {
       //Perform Machine Dry
   }
 
}
```

We have successfully created a family of algorithms for wash and dry.
 
![dependency flow](/engineering-education/ioc_principle/dry_algorithm_family.png)

![dependency flow](/engineering-education/ioc_principle/wash_algorithm_family.png)

 
We have created strategies, now it's time for us to see how it works.
Remember we removed the wash() and dry() methods from the `LaundryBot` interface. This time, rather than having methods of wash() and dry(), we would create fields of type `Wash` and `Dry`.

```kotlin
interface LaundryBot {
   val wash: Wash
   val dry: Dry
   fun fold() {
       //fold items
   }
}
```

This way, any class that inherits from `LaundryBot` can choose the particular behavior it wants from the algorithm family.
Let's see how this works:
Say we want to create a `CashmereLaundryBot`. What behaviors of `Wash` and `Dry` do we choose from? It is advised to wash cashmere by hand to avoid tears and snags, thus we would use the `HandWash` behavior. For drying, cashmere isn't suitable for `MachineDry`. This is because the heat could shrink or damage its follicles. The `Dry` behavior to use for a cashmere then is the `SunDry`. Let’s see how this looks like in code:

```kotlin
class CashmereLaundryBot: LaundryBot{
   override val wash: Wash = HandWash
   override val dry: Dry = SunDry
 
}
```

See how the strategy pattern has made it easy to change the behavior of this class? Nice!
 
 
It's been a long article, but I sure hope this helped you as much as it did me.
Thank you!
 
 
