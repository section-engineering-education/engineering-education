---
layout: engineering-education
status: publish
published: true
url: /basics-of-the-object-model/
title: The Basics of the Object Model
description: This article will cover the basics of the object modeling. Object models refer to a visual representation of software or systems' objects, attributes, actions, and relationships.
author: judy-nduati
date: 2020-12-01T00:00:00-19:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/basics-of-the-object-model/hero.jpg
    alt: Object model image example
---
The object Model sees an information system as a set of objects and classes. The reader will get an in-depth understanding of the object model and its elements. We will also look into object-oriented programming (OOP), object-oriented design (OOD), and object-oriented analysis (OOA).
<!--more-->
### Table of contents
[Defining the Object Model](#defining-the-object-model)

[Understand OOP, OOD, and OOA](#understand-oop-ood-and-ooa)

[Elements of the Object Model](#elements-of-the-object-model)

### Defining the Object model
Object Model refers to a visual representation of software or systems' objects, attributes, actions, and relationships. The basic factors of an object model are classes and objects.

#### Object
An object is a physical component in the object-oriented domain. An object may be tangible such as a person, car, or intangible such as a project.

#### Class
A class is a representation of objects. It represents a group of objects that have similar properties and exhibit an expected behavior.

Below is an example of a class and a few objects.

Class (Car Brand) = Objects (Toyota, Subaru, Hyundai, Audi, Volkswagen)

An object model uses various diagrams to show how objects behave and perform real-world tasks. The diagrams used include use-case diagram and sequence diagram.

The object model describes objects in object-oriented programming, object-oriented analysis, and object-oriented design.

### Understanding OOP, OOD, and OOA
#### Object-Oriented Programming (OOP)
OOP is a programming paradigm with a view of objects and classes. OOP incorporates properties/attributes and functions/methods into an element called an object. These objects are grouped into classes.

This programming style exists in programming languages such as C++, Java, JavaScript, Python, etc. These languages help structure and organize systems and software programs quickly.

Developers use Object-Oriented Languages when creating large, complex, and actively updated programs.

OOP is based on four principles, i.e., Encapsulation, Abstraction, Inheritance, and Polymorphism.

1. [Encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)): It's the bundling of data and methods to control access into the object. It's also known as information/data hiding. In other words, the data is not available to the outside world. Therefore, only those methods that are within the class can access it.
2. [Abstraction](https://stackify.com/oop-concept-abstraction/#): It hides implementation details while presenting the attributes to the outer world. It reduces code complexity, hides the facts, and expose the essential parts.

For example:

A database system details how a database is created while hiding how data is stored and maintained. The user only sees the database results on the screen.

3. [Inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)): It's a technique of creating a new class from an existing one. A sub-class derives features from the parent class(base class).

There are various [types of inheritance in OOP](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)):
- [Single Inheritance](https://www.techopedia.com/definition/22104/single-inheritance#)

- [Multiple Inheritance](https://en.wikipedia.org/wiki/Multiple_inheritance#)

- [Hierarchical Inheritance](http://www.trytoprogram.com/cplusplus-programming/hierarchical-inheritance/)

- [Multilevel Inheritance](https://www.w3schools.com/cpp/cpp_inheritance_multilevel.asp)

- [Hybrid Inheritance](https://www.oreilly.com/library/view/object-oriented-programming/9789332503663/xhtml/head-0487.xhtml)

4. [Polymorphism](https://www.tutorialspoint.com/java/java_polymorphism.htm#): The term polymorphism refers to the occurrence of something in many forms. Objects can be represented in many forms. In other words, it means an object can perform many functions and work differently.

For example:

A person in this scenario is the object, performing different functions, and behaving in distinct ways.
While in church, the person behaves like a follower.
While in the market, a person behaves like a customer.
While in a rented house, the person behaves like a tenant.
While heading an organization, the person behaves like a boss.

#### Object-Oriented Analysis (OOA)
Object-Oriented Analysis assesses the system requirements. It recognizes the classes and objects and determines the relationship between them.

The primary purpose of OOA is identifying the application domain and gathering the requirements of the system. It mainly focuses on what the system will do rather than how it performs the task.

There are three OOA components: Object Modeling, Dynamic Modeling, and Functional Modeling.

1. Object Modeling: Objects are occurrences in a class.

Object Modeling develops the constant formation of the system concerning the object.

It recognizes the objects and the relationship between them. It identifies the attributes and functions of each class.

2. [Dynamic Modeling](https://www.wisdomjobs.com/e-university/object-oriented-analysis-and-design-tutorial-2107/ooad-dynamic-modeling-26532.html): It explains how objects respond to events.
3. [Functional Modeling](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_functional_modeling.htm#:~:text=Functional%20Modelling%20gives%20the%20process,Data%20Flow%20Diagrams%20(DFDs).) indicates the processes executed in an object and how data changes when it moves to objects.

#### Object-Oriented Design (OOD)
In OOD, a system is a group of objects. It involves designing the objects, classes, and relationships between classes.

Terms in Object-Oriented Design:

- Instance Variables: Data attributes that are specific to an object.
- Instance method: Operations that are specific to an object.
- Class Variables: Data attributes that are not specific to an object.
- Class Method: Operations that are not specific to an object.
- Constructors: A unique method that creates and initializes the objects for a class to perform some operations.

### Elements of the Object model
Here are the significant features of the object model.

#### Abstraction
Abstraction reduces complexity. It comes from the recognizing similarities between objects. Abstraction takes place when the system stress details those that are important to the user. It focuses mostly on the outside view of the object. Data is abstracted when protected by a set of methods, and only those methods can access data in the object.

#### Encapsulation
Encapsulation is achieved through information hiding or data hiding to used to reduce complexity and increase reusability. The user cannot see the inside of an object or a class, but the object can be accessed by calling the object's methods.

Encapsulation and Abstraction are complementary concepts. In Abstraction, the system focuses on object behavior and functionality. Encapsulation focuses on implementation that gives rise to action.

#### Hierarchy
The hierarchy shows the order in which objects in a system are put together. It also explains the relationship between different parts of a system. Different properties and functions form a class of the hierarchy.

A hierarchy class is composed of a base class (parent class) and derived classes (subclass). A derived class inherits the properties of a parent class.

Through hierarchy, a class can be composed of inter-related sub-classes, that can have their sub-classes until the smallest level of components is reached.

Here is an example of a class of hierarchy:

![Class of Hierarchy](/engineering-education/basics-of-the-object-model/hierarchy.gif)<br>

*[Image Source](http://www.dba-oracle.com/t_object_class_hierarchies_design.htm)*

In the scenario above, the vehicle is the base class. The objects car, boat, and aircraft inherit properties of the base class (vehicle). Objects like truck and van inherit properties from the car. Sailboat and yacht inherit from the class boat, and helicopter and blimp inherit properties from class aircraft.  

#### Modularity
Modularity refers to dividing a program into components or modules to reduce the problem's complexity. Modularity takes place on broad and powerful applications with multiple classes.

The modules help to manage complexity. Modularity focuses on implementation. Making modularity and Encapsulation related.

Modularity can be viewed as a way of matching encapsulated abstraction into basic components. This takes place after the partitioning of a system into modules.

### Conclusion
The object model is built on a collection of models. The object model describes these objects well in OOP, OOA, and OOD. The major elements of the object model are also well explained to the reader.

That's all there is for this article. I hope this article  will shed some light on the object model and its techniques. Good luck!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
