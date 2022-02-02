### Introduction
Interfaces in Java allow the developer to build reusable, testable, extensible, and coupled components. Interfaces play a significant role when used in classes(for instance) that depend on each other. 

For instance, let's assume we have two classes,  X and Z, where class X depends on class Z. If we change class Z, X will be affected. To reduce this impact, we put interfaces between the classes such that when we change the code in class Z, we don't affect the code in class X.

In a sizeable complex application with lots of classes depending on each other, we can use interfaces to decouple the classes. This will reduce the impact on other classes when we change a single line of code in one class.

### Prerequisites
In this article, I will assume that:
- You have some basic knowledge of Java classes and Inheritance.
- You have IntelliJ IDEA installed

### Table of Content
- [What is an interface in java?](#1-what-is-an-interface-in-java)
    - [How to create an interface.](#how-to-create-an-interface)
- [ Benefits of Implementing Interfaces](#2-benefits-of-implementing-interfaces)
- [Interface segregation principle.](#3-interface-segregation-principle)
### 1. What is an interface in java?
An interface is a collection of methods that several classes can inherit.
#### 1.1 How to create an interface.
To create an interface, you need to use the keyword `interface` like this:
```java
public interface MyInterface {
    void method1();
    void method2();
    void method3();
}
```
In the above example, we have an interface called `MyInterface,` and we defined three methods.
#### 1.2 Interfaces and classes
An interface is supposed to say what should be done by the class that implements it, while a class should explain how it should be done.

To understand this, let us look at the code snippets below:
```Java
public interface bird {
    void sound();
}
```
In the above snippet, we have an interface named bird. This interface has one method named sound. 

We have different types of birds that make different sounds. For instance, a Crow makes a sound like "Caw Caw."
```java
public class Crow implements bird {
   @Override  #  override keyword is used to tell the compiler that the method sound is implementing an interface method
    public void sound() {
        System. out.println("Caw Caw");
    }
}
```
Another bird parrot makes a sound like "Kwi Kwi Kwi".
```java
public class parrot implements bird {
    @Override
    public void sound() {
        System.out.println("Kwi Kwi Kwi");
    }
}
```
In the above snippet, both `Crow` and `parrot` implement the interface `bird  .`However, the two birds have different sounds. This means that the bird's class uses the interface method independently.

The interface is responsible for producing the sound of the bird while the class shows how the sound will be produced.("Caw Caw" and "Kwi Kwi Kwi")

>Note. When a class sound implements an interface bird, it is obligated to include all the methods in the interface.
That means that the moment you implement an interface, it's like you have opened up a "contract" between the class and the interface. You have to include all the methods in the interface.
#### 1.3 Rules for Declaring an Interfaces
- The ``@Override annotation`` should be used on all the methods that the interface has implemented.
- Interfaces are said to be a contact between them and the classes that implement them. Whenever an interface is edited, the classes that implement it should be edited as well.
- Interfaces can inherit other multiple interfaces.
- Interfaces methods are always public.
- Interfaces can't have constructors. They can not create an object.
### 2. Benefits of Implementing Interfaces
Interfaces come with several benefits. Some of them are:
- Ability to extend your applications. 
- Ability to test a class in isolation. 
- Ability to reuse the code in different classes.
- Catch the bugs in the code. Interfaces can catch any bug in your code. For instance, if you forget to include any method in the interface in your class, the compiler will let you know.
#### 2.1 Demonstrating Interface in code 
To do this, open your IntelliJ IDEA and create a New directory `interface.`
Create an interface file `sound` in `/interface` and add the snippet below:
```Java
public interface sound {
    void noisy();
    void soft();
}
```
In the above interface snippet, we have two methods: ' noisy,` and the other is `soft.`

Now, lets create  `Cat` and `dog` classes in the directory `/interface`,  add the snippets below respectively:
```java
public class cat implements sound{
    public static void main(String args[]){
        cat ex = new cat();
        ex.noisy();
        ex.soft();
    }
   @Override //  helps java to keep track on what is being implemented in the interface
    public void noisy() {
        System.out.println("purrs");
    }
    @Override
    public void soft(){
        System.out.println("meow");
    }
}
```
```java
public class dog implements sound{
    public static void main(String args[]){
    dog ex = new dog();
    ex.noisy();
    ex.soft();
    }
    @Override
    public void noisy() {
        System.out.println("Noisy voice: "+" woof");
    }
    @Override
    public void soft() {
        System.out.println("soft voice: "+" bark");
    }
}
```
To execute the snippet`(e.g., dog. class)`, open the terminal in the IntelliJ IDEA and type the following commands:
```java
$ javac dog.java
$ java dog
```
The output will be:
```bash
Noisy voice:  growl
soft voice:  bark
```
### 3. Interface segregation principle(ISP)
To understand this principle, let us relate it to a mobile charger with multiple charging ports—type C port, USB port 1, USB port 2, etc.  

All these kinds of ports are connected to one mobile charger. Though the charger has many ports, only one port is required to charge a single phone. 

This means that the other ports should be `segregated` and only `remain` with the used port.

`Interface segregation principle(ISP) ` states that interfaces should not have methods that are not required by the class that implements them.

Extensive interfaces should be divided into smaller ones where each performs a different task.
#### 3.1 ISP Demonstration
Let us Create a new directory `hotel` in IntelliJ IDEA. In `/hotel`  create an interface `/hotel/main.java` and add the snippet below:
```java
public interface hotel1 {
    void room();
    void food();
    void drink();
}
```
In the above interface snippet, we have three methods: ' room,` and the other two are `food` and `drink.`
This means we can get a room, food, and drink in the hotel1.

Let us create a class beverages in `/hotel1` and add the snippet below:
```java
public class Beverages {
    public void drink(hotel1  drinking){
        drinking.drink();
        System.out.println("Ordering coffee");
    }
}
```
In the snippet above, the class `Beverages` is dependent on the interface hotel1. If we change the interface hotel1, the class will be affected. Let us edit our interface as shown below:
```Java
public interface hotel1 {
    void room(int size);
    void food();
    void drink();
}
```
Changing the capability `void room()` will affect the class `beverages`  and other classes coupled to the interface.
To avoid this, we use the `ISP` principle.

Let us divide our interface into smaller interfaces,  where each interface will focus on a different capability.
```java
public interface Drinking {
    void drink();
}
```
On generating a new interface, our old interface will be as shown below:
```java
public interface hotel1 {
    void room(int size);
    void food();
}
```
We have now generated a lightweight interface (`Drinking`) that will only focus on drinking capability.
### Conclusion
When dealing with large applications with multiple classes that depend on each other, it is wise to use interfaces as they will help you debug your code and make your code more maintainable.
