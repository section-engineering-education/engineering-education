---
layout: engineering-education
status: publish
published: true
url: /advanced-concepts-of-programming-using-dart/
title: Advanced Concepts of Programming using Dart 
description: In this tutorial we will learn to appreciate some advanced concepts of programming using Dart, a language that can be both robust and rigid to use.
author: emmanuel-ezenagu
date: 2021-11-18T00:00:00-12:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/advanced-concepts-of-programming-using-dart/hero.jpg
    alt: Advanced Concepts of Programming using Dart Hero Image
---
Programming is a way of writing syntaxes that instructs a computer to perform specific tasks the way we want it to achieve a specific task. For a developer to program better, certain concepts like function declaration and usage, conditional situation handling, variable declaration - assignment - and reassignment, and looping all provide a way to achieve better programming practices. 
<!--more-->
We can classify the concepts listed as basic programming concepts and are essential knowledge needed for other advanced concepts within programming. We will discuss some of those advanced concepts that make programming a lot better and more fun to use.

### Goal
By the end of this tutorial, the reader should be able to:
- Write codes of situations that will help us understand advanced concepts of programming.
- Learn about advanced concepts of programming such as classes, objects, abstraction, polymorphism, encapsulation, inheritance, access modifiers, and static classes.
- Learn the concepts needed while using dart as the language of choice. However, the concepts are the same for any programming language we can think of, only that they are represented using different syntaxes.

### Prerequisites
To follow this tutorial, the reader should have the following:
- Basic understanding of programming and basic programming concepts in any programming language such as Java, Python, or JavaScript.
- Basic knowledge of Dart programming syntax that will be the language used as a sample in this tutorial. 
 
### Table of contents
- [Advanced Concepts of Programming using Dart](#advanced-concepts-of-programming-using-dart)
    - [Introduction](#introduction)
    - [Goals](#goals)
    - [Prerequisite](#prerequisite)
    - [Table of Content](#table-of-content)
    - [Dart programming language](#dart-programming-language)
    - [Classes & Objects](#classes--objects)
    - [Instantiating an Object](#instantiating-an-object)
    - [Constructors](#constructors)
    - [Static classes vs. Instance variables](#static-classes-vs-instance-variables)
    - [Inheritance](#inheritance)
    - [Encapsulation](#encapsulation)
    - [Abstraction](#abstraction)
    - [Polymorphism](#polymorphism)
    - [Conclusion](#conclusion)
    - [Further Reading](#further-reading)

### Dart programming language
Dart is an optimized client-sided multi-platform programming language used to develop fast apps developed by Google to a flexible runtime execution platform. The Dart language is type-safe, so we must specify the data type to be stored in memory whenever we declare variables or modifiers, referred to as good typing.

While types are essential, in dart, type stipulations are optional due to type inference. This provides us with a flexible way to define our variables and can be very useful because we may be unsure about the data type we are expecting.

Using the keyword `dynamic` alongside type comparison during runtime, we can accommodate the unknown type whenever it comes.
 
### Classes & Objects
Object-oriented programming (OOP) enables us to develop large-scale software, and a principal concept of OOP is Classes. A class is a programmable concept that defines Objects' properties and behaviors and can be represented in coding syntax. 

They are a blueprint or definitions that describe the capabilities of an object. An object cannot perform any capability or function that is not defined in its class. A class is a template, blueprint, or contract that defines an Objects data field or methods.
 
For example:

```dart
    class Person {
        String name = ‘Andrew’;
        Int age = 23;

        String speak (String words){
            print(“What I am trying to say is, ” + words);
            return (“What I am trying to say is, ” + words);
        }
        String sayAge (int myAge ){
            print(“My age is, ” + myAge);
            return (“My age is, ” + myAge);
        }
    }
```
 
Data fields define the properties or attributes of that class (known as the object's state).

`String name` and `int age` are both data fields that become the properties of the simple class `Person`. The behavior or actions of the object created from that class are represented as methods/functions. A default method that is the same name as the class used in creating an instance of that class is called the "constructor" function.
 
`String speak` and `String sayAge` are both behaviors the class `Person` can perform. Methods represent them.
 
These both make sense because if we look at things holistically when we create an instance of a person, Object representation is an individual who is a person. He/She has properties and attributes like a name and age and can perform behaviors such as speaking words, expressing their age, etc.

Objects to be of the same type are defined using a standard class. An object created from a class is called an instance of a class. It possesses its own unique identity, data fields, and functions that, as a reaffirmation, are different from other objects instantiated from the same class. Every object is instantiated from a class. All classes descend from the object except for NULL in the dart programming language.
 
So from the Class Person example above, if we instantiate an object or multiple objects from this class, each will have unique properties (name, age) and unique behaviors (speak, sayAge).
 
#### Instantiating an object
In other programming languages like Java, we use a unique keyword called "new" to instantiate an object from a class. However, in dart, its desire to accommodate programmers coming from a tightly typed language such as Java. Also programmers that come from a loosely typed one such as JavaScript, we can instantiate an object without using the "new" keyword as of version 2 of the Dart programming language. Hence, we can create objects from the Person class using any of the following means.
 
``` dart
var P1 = Person();
```

or

```dart
var P2 = new Person();
```

We can then call that object's individual properties and behaviors using the individual instance variables P1 or P2.

```dart
P1.name
P1.age
```

Result - Andrew, 23
 
```dart
P2.name
P2.age
```

Result - Andrew, 23
 
Notice that in this case, they both give the same result as output. Though the output is the same, they are not the same values. P1 is a private entity with the name "Andrew" and an age "23". Similarly, P2 is another private entity with the name "Andrew" and age "23".

The above is not a problem, and we can create other person entities with different names and age specified using the constructor method we established exists within every class.
 
### Constructors
As stated, every class has a hidden default method called the constructor function to instantiate a given class. We can specify our constructor function, which has to follow the following directives to be tagged a constructor function:
- Must be the method//function.
- Must have the same name as the class itself.
- Can not have a return type specified.
- Can take in parameters in its function brackets. 

When parameters are specified, the constructor is the custom constructor. If no parameters are specified in the function brackets, the stated constructor overwrites the default constructor method provided by dart and executes its own method body.
 
```dart
    class Person {
        String name = ‘Andrew’;
        Int age = 23;
        Person(){
		    this.name = this.name.toUpperCase();
		    this.age = this.age + 3;
        };
        Person(String nameNew, Int ageNew) {
	        this.name = nameNew;
            this.age = ageNew;
        };
        Person (this.name, this.age);
    }
```

In the example above, we have three constructor functions: our custom constructors.
 
The first Person constructor overwrites the default constructor anytime the Person class is used to create an object. So any object created using the Person class will have a name property of “ANDREW” and an age of “26”.
	
```dart
    var P1 = Person();
	P1.name;   -  result = “ANDREW”
	P1.age;    -  result = 26
```
 
The second Person constructor specifies that we can create a Person object with the values we want for both data fields name and age. When parameters are passed, it updates the data fields. The `this` keyword specified refers to the class itself, in this case, class `Person`.
 
```dart
	var P2 = Person(“Moses”, 30);
	P2.name;   -  result = “Moses”
	P2.age;    -  result = 30
```

The third Person constructor specifies that we can create a Person object with the values we want for both data fields name and age, which is very similar to our second constructor. It is our second constructor, but here dart provides us with a shorthand writing method. This constructor is called **Named Constructor**.

```dart	
	var P3 = Person(“David”, 28);
	P3.name;   -  result = “David”
	P3.age;    -  result = 28
```
				
### Access modifiers
Access/Visibility modifiers can be used to specify the visibility of a class and its member. In a programming language like Java, public, protected, and private keywords can be utilized to specify the visibility scope for data fields or methods of a class. 

However, there is no specific keyword in dart that describes data fields and methods to be public, private, or protected. Dart instead provides us with a way to handle this. All data fields are public by default but can be restricted to private modifiers by adding an underscore "_" before the specified modifier.

Any modifier starting as such will be processed as a private access level data type and is used only inside a Dart library. A Dart library is a single Dart file that can be used in another file by using the "import" keyword to fetch it.
 
// student.dart
```dart
    class Student{
        String fullName;
        String email;
        String _password;
        Student(this.fullName, this.email, this._password);
    }
    
    // main.dart
    import student.dart
    void main (){
        Student s1 = Student(“Naomi”, “naomiAdama@gmail.com”, “Abcd1234”);
        print(s1.fullName);    // returns = Naomi
        print(s1.email);	// returns = naomiAdama@gmail.com
        print(s1._password);	// returns a compile error that the setter or getter is not defined for the class.
    }
```

s1.password returns an error because we are trying to access a private data field outside its library (its file). To solve this, we will need to perform an encapsulation (discussed later).
 
### Static classes vs. Instance variables
All the examples we have worked on so far have all been scenarios that dealt with instance variables. Instance variables hold an object; they are created with or without the new keyword in dart and with the new keyword in Java. Properties and functions called on instance variables are all instance variable properties and instance variable functions.
 
```dart
    var P1 = Person();
    P1.name;   -  result = “ANDREW”
    P1.age;    -  result = 26
```

`P1.name` and `P1.age` are both instance properties of the P1 variable.
 
Static classes are classes that have properties and functions that are specified statically. When a data field or function is specified static, we instruct that the particular property or function belongs to the class itself and not to any instance object. 

It is accessible without creating an object. The static keyword allows properties and functions of a class to persist values across all class instances.

```dart
class Staff {
  static var staffDept;
  var staffName;

  Static void displayDetails() {
    print("Name of Staff is: ${staffName}");
    print("Staff Department is: ${staffDept}");
  }
}

// Main function
void main() {
  Staff stf1 = Staff();
  Staff stf2 = new Staff();
  Staff.staffDept = "HR"; // Static property called
  
  stf1.staffName = “Saul”;
  Staff.displayDetails(); 
}
```

There is no need to instantiate an object to access a static data field or call a static method: to call a static member of a class, attach the name of the class before the static data field or function name to use them. 

As seen in the example above, `Staff.displayDetails()` is called a static variable of the staff class.
 
### Inheritance
Inheritance, like in real-life representation, is a way classes can obtain properties and methods defined in another class. Enabling the creation of a new class from an already existing class. The class inherited from is known as the superclass, while the class inheriting is called the sub-class. 

Inheritance is simulated in dart by the @override metatag and is achieved using an extended keyword.

```dart
class Animal{
void movement(String moveMode){
    print("Movement is through  " + moveMode);
  }
}

class Dog extends Animal{
    // No implementation
}
  
class Bird extends Animal{    
    // No implementation
}
  
class Fish extends Animal{
    // No implementation
}


void main() {
  var animal1 = new Dog(“Running on Four legs”);
  animal1.movement();

  var animal2 = new Bird(“Flying with wings”);
  animal2.movement();

 var animal3 = new Fish(“Swimming with Fins”);
  animal3.movement();
}
```

Here because classes Dog, Bird, and Fish all extend from class `Animal`, they all have access to properties and methods defined in their parent. Hence classes Dog, Bird, and Fish can call the movement method in the Animal class without any error. 

The idea behind inheritance is that classes with standard functionalities and properties can be declared and implemented in a single location/class and used in any other file of choice.

### Encapsulation
Encapsulation is a paradigm of OOP that enables us to hide the values of data fields of a class by preventing direct access to them by external operations in such a way that could expose hidden implementation details. In a nutshell, encapsulation allows the programmer to hide and restrict access to data. 

To achieve encapsulation: Declare the data fields using the private access modifier. In the case of dart, the underscore prefix modifier("_"). Create public getters and setters that allow indirect access to those variables.

Using the same example as in the Access Modifier section:

```dart
// student.dart
class Student{
	String fullName;
	String email;
	String _password;
	Student(this.fullName, this.email);
 
	void setPassword(String pass){
		this._password = pass
	}
	String getPassword(){
		return this._password
	}
}
```
_password of the Student class cannot be edited or modified outside of the class Student, which ensures that the data is protected.

### Abstraction	
Class abstraction is the separation of class implementation from the use of a class. The internal implementation is encapsulated and hidden from us. A typical example of this is dart's internally created methods which are offered to us for usage. For example, `toUpperCase()` of a String type or `.map()` of Dart’s array methods.

```dart
String name = “Tems Vibes”;
name.toUpperCase();
```

The implementations of these methods are unknown to us. The data fields used and how it executes its functionalities are hidden, and we need not concern ourselves with them. We only need to know how the function works, what it needs as a parameter, and what it returns.
				
### Polymorphism
Polymorphism is the ability of an object to exist in more than one form. The most prominent use of polymorphism in dart is when a subclass instance object is instantiated using a superclass reference type.

From our example above:

```dart
class Animal{
void movement(String moveMode){
    print("Movement is through  " + moveMode);
  }
}

class Dog extends Animal{
    // No implementation
}

class Bird extends Animal{    
    // No implementation
}
  
class Fish extends Animal{
    // No implementation
}


void main() {
  var animal1 = new Dog(“Running on Four legs”);
  animal1.movement();

  var animal2 = new Bird(“Flying with wings”);
  animal2.movement();

 var animal3 = new Fish(“Swimming with Fins”);
  animal3.movement();
}
```

Due to polymorphism, because classes Bird, Dog, and Fish extend from Animal class, objects of any child classes can be created using the parent class as a reference type.

```dart
Animal animal4 = Bird(“Flying with wings”);
Animal animal5 = new Dog(“Running on Four legs”);
Animal animal6 = Fish(“Swimming with Fins”);
```

All these will create an instance object of the individual child classes.

### Conclusion
This tutorial gives an in-depth description of the concepts of programming. All these concepts are crucial concepts we will need going into interviews and while developing software in our everyday lives. 

Whatever the programming language used, the concepts remain the same. Mastery of these concepts can qualify us to be real advanced-level software developers.
 
### Further reading
For further reading, check out the following references:
 - [Dart language tour - classes](https://dart.dev/guides/language/language-tour#classes)
 - [GeeksForGeeks Dart](https://www.geeksforgeeks.org/dart-tutorial/)
 - [GeeksForGeeks Static Keyword](https://www.geeksforgeeks.org/dart-static-keyword/)
 - Introduction to Java Programming By Y. Daniel Liang pdf

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
