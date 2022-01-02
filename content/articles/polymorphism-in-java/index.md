### Polymorphism in Java

### Table of Contents
* [Introduction](#introduction)
* [What is Polymorphism](#what-is-polymorphism)
* [Types of Polymorphism](#types-of-polymorphism)
* [Adantages of Polymorphism](#advantages-of-polymorphism)
* [Charactaristics of Polymorphism](#charactaristics-of-polymorphism)

Java is an Object-oriented programming language.
But what is OOP commonly known for?. Yeah, the four pillars of Object-Oriented Programming.

The four pillars include:
* Abstraction
* Inheritance
* Encapsulation
* Polymorphism

To breakdown the four pillars of OOP:
* `Abstraction` - This is the process of hiding the less important functionalities to the user and displaying what is only important. This fundamental gives the user the knowledge of *what a program does* rather than *how a program does* it.

* `Inheritance` - This is where one class, normally the *child class* inherits the properties of another class known as the *parent class*

* `Encapsulation` - This is a fundamental where related data is bound together into a single unit.

* `Polymorphism` - The simplest way to understand polymorphism is **having many forms**. We will discuss more on polymorphism in this tutorial.


### Introduction
Polymorphism is where an object has more than one form. We can also say that polymorphism is a feature that allows one task to be performed in more than one way.

Polymorphism examples include:
* A human has one body, but inside the body, there are various organs that perform different tasks. The heart pumps blood, the stomach digests food, the lungs if for breathing, etc.
In this example, you can note that the human body allows more than one task to take place in the body.

* Another example is the chameleon. The chameleon can camouflage into different colors depending on the environment. On a green surface, it can turn to color green, turn brown on a brown surface, and so on. We can say that the chameleon has more than one form and that is polymorphism.

### What is Polymorphism 
Polymorphism is a Greek word where two words are combined to give one meaning. Funny, You can say the word is polymorphic.

The two words are `poly` and `morph` where *poly means many* and *morph means one or more forms*

### Types of Polymorphism
Polymorphism can be divided into two:

#### 1. Static Polymorphism

> **Static Polymorphism** - When you are writing a code, probably creating a method, and you by chance create two or more methods with the same name, you will get an alert that you have a duplicate method in your code. This error is called `Compile-time error`. The ability to receive alerts on errors in your code is made possible by the **compiler**. When the compiler resolves conflict on matters regarding polymorphism, it is regarded as `Compile-time Polymorphism`
Examples include Overloading also known as Method overloading or Function overloading.

For clarity:

`Method overloading` is achieved by having multiple methods to have the same name but different parameters. The parameters can differ by having different arguments, having different types of data types, or having different sizes the arguments. This will avoid the compile-time error.

Let us use a code snippet to try to understand more about static polymorphism.

```java

class MyClass {
    int height;

    MyClass() {
        System.out.println("bricks");
        height = 0;
    }
    MyClass(int i) {
        System.out.println("Building new house that is "+i+" feet tall");
        height =i;
    }
    void info() {
        System.out.println("House is "+height+" feet tall");
    }
    void info(String s) {
        System.out.println(s+": House is " +height+ " feet tall");
    }
}
public class Main {
    public static void main(String[] args) {
        MyClass t = new MyClass(10);
        t.info();
        t.info("overloaded method");

        //Overloaded Constructor
        new MyClass();
    }
}

```

```java
//Output
Building new house that is 10 feet tall
House is 10 feet tall
overloaded method: House is 10 feet tall
bricks
```

In the example above, you can see that we created two methods, both of which share the same name `MyClass`. 
You will further note that the classes have different parameters. When the first class is called, it gives a void output of the string stated since there is no specific 
data type stated to be returned. On the other hand, the second class, MyClass, has a parameter of an integer. When we call it, the output will not only have the printed output but will also recognize an integer included in the output.

#### 2. Dynamic Polymorphism

> **Dynamic Polymorphism** - This is a type of polymorphism wherein the case when you call an overridden method, this conflict is resolved when you run the code, normally known as run time. It can also be referred to as `run time polymorphism`.

Method Overriding is an example of dynamic polymorphism.

`Method overriding` is a feature where you can have a parent method and a child method. Both the parent and child methods have the same name but the child method will tend to modify or override the parent method.

Below is a snippet that explains the concept in detail.
```java
public class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Woof");
    }
}
```

```java
public class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("Meou");
    }
}
```

```java
public class Main() {
    public static void main(String[] args) {
        
        Animal a = new Dog();
        Animal b = new Cat();
        
        a.sound();
        b.sound();
    
    }
}
```
```
// Output
Woof
Meou
```
In the example above, we have created two classes, the dog class, and the cat class. Both the classes extend the class animal. You can note that when we called the object dog and cat, we receive the outputs for the methods in their respective classes. This indicates that the method in the class animal was overridden. This gives a good example of dynamic polymorphism.

### Advantages of Polymorphism
We are now going to look at the advantages of each of the types of polymorphism.

**Dynamic Polymorphism**

1. `Support for Method Overriding` - This is the feature where a child method can modify the specifications of the parent method. This also enables the creation of one method and modification to serve more than one method.
2. `Method specification` - This allows for child classes to make modifications or improvements to the parent class before implementation.
3. `Method Overloading` - This allows the use of the same method name on different methods but modifying the parameters and arguments to avoid a compile-time error.

### Characteristics of Polymorphism

1. *Polymorphic Coercion* - **Coercion** is the automatic conversion of data types from one form to another. An instance of the process mentioned is the conversion of a double into an integer. The above can also be reffed to as implicit type conversion.

The example below will indicate how java achieves coercion.
```java
// Explicit type conversion
double x;
x=(double)2;
```
```java
// Implicit type conversion
double x;
x=2;
```
In the first example, you first have to initialize the data type, and then when allocating the variable, you specify the type of the variable. The case is different in Implicit type conversion. After you initialize the data type, you only have to allocate the variable and the compiler will automatically recognize it as a double.

2. *Operator Overloading* - This is where the same symbol or operator has more than one meaning even when used in the same code. Below is an example to explain operator overloading.
```java
String str = "5"+5;
int sum = 5+5;

System.out.println("str=%s sum=%d",str,sum);
```

```java
//Output
str = 55
str = 10
```

In the above example, you can note that the `+` operator is not only used as a mathematical operator for addition, it is also used string concatenation by linking together a string and an integer.
As seen in the output, the output is different even though the operator used is the same. This shows how Operator overloading happens.

3. *Polymorphic parameters* - This particular characteristic allows a name of a parameter or method to be associated with different data types either locally or globally.

```java
public class Dog extends Animal {
    private string legs;
    public String setDogLegs(){
        int legs = 4;
        this.legs = this.legs + legs;
    }
}
```

Declaring of polymorphic parameters can lead to `variable hiding`.

**Variable hiding** occurs where the declaration of a local variable overrides the global variable with the same name.

In the above example, we have declared the legs globally as a string and then declared them locally as an integer. Normally variable hiding would have occurred. But to solve for that, we have used a global reference `this` to point to the global variables within the local context.

### Summary
From this tutorial, we have gone through the following:
1. Introduced and gone through some examples of polymorphism
2. Types of Polymorphism
      * Static Polymorphism
      * Dynamic Polymorphism
3. Advantages of Polymorphism
4. Characteristics of Polymorphism
      * Polymorphic Coercion
      * Operator Overloading
      * Polymorphic parameters
