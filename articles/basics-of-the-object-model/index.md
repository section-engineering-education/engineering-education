### Introduction

The Object Model sees an information system as a set of objects and classes. This article will give you an in-depth understanding of the Object model and its elements. Also, we will look into object-oriented programming, object-oriented analysis, and object-oriented design.

### Table of Contents

[Defining the Object Model](#defining-the-object-model)

[Understand OOP, OOD, and OOA](#understand-oop-ood-and-ooa)

[Elements of the Object Model](#elements-of-the-object-model)

### Defining the Object Model

Object Model refers to a visual representation of software or systems objects, attributes, actions, and relationships. Classes and objects are the basic building blocks of the Object model.

#### Object

An Object is a real-world component in the object-oriented domain. An object may be tangible such as a person, car, or intangible such as a project.

#### Class

A class is a template or a blueprint for objects. It represents a group of objects having similar characteristic properties that exhibit an expected behaviour.

Below is an example of a class and objects.

Class (Car Brand) = Objects (Toyota, Subaru, Hyundai, Audi, Volkswagen)

An Object model uses various diagrams to show how objects behave and perform real-world functions and tasks. The diagrams used include use-case diagram, sequence diagram, class diagram, activity diagram, etc.

The object model describes objects in Object-oriented programming, Object-oriented Analysis, and Object-oriented design.

### Understand OOP, OOD, and OOA

#### Object-Oriented Programming (OOP)

OOP is a programming technique with the concept of classes and objects. OOP incorporates properties or attributes and functions or methods into an element called an object. These objects are grouped into classes.

This programming style generally exists in programming languages such as C++, Java, JavaScript, and python. These languages help to structure and organize systems and software programs quickly. Developers use Object-Oriented Languages when creating large, complex, and actively updated programs.

OOP is based on four principles, encapsulation, abstraction, inheritance, and polymorphism.

- [Encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)): It is the bundling of data and methods into a single unit or a class. It is also known as information or data hiding. In other words, the data is not available to the outer world. Therefore, only those methods that are bundled in the class can access it.
- [Abstraction](https://stackify.com/oop-concept-abstraction/#:~:text=Abstraction%20is%20one%20of%20the,unnecessary%20details%20from%20the%20user.&amp;text=That&#39;s%20a%20very%20generic%20concept,everywhere%20in%20the%20real%20world.): It hides implementation details while presenting the attributes to the outer world. It reduces code complexity, hides the facts, and expose the essential parts.

For example;

A database system details how a database is created, how data is stored and maintained are hidden. The user only sees the database results on the screen.

- [Inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)): It is a technique of getting a new class from an existing class. A sub-class derive features from the parent class or base class.

There are various [types of inheritance in OOP](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)):

- Single inheritance
- Multiple inheritance
- Hierarchical Inheritance
- Multilevel inheritance
- Hybrid Inheritance.

- [Polymorphism](https://www.tutorialspoint.com/java/java_polymorphism.htm#:~:text=Polymorphism%20is%20the%20ability%20of,to%20a%20child%20class%20object.&amp;text=In%20Java%2C%20all%20Java%20objects,and%20for%20the%20class%20Object.): The term polymorphism means many forms. Objects can be represented in many forms.

For example,

The world has many continents. Each continent consists of many countries, and each state is made of cities.

#### Object-Oriented Analysis (OOA)

Object-Oriented Analysis assesses the system requirements. It recognizes the classes and objects and determines the relationship between classes and objects.

The primary purpose of OOA is identifying the application domain and gathering the requirements of the system. It mainly focuses on what the system will do rather than how the system will perform the functions.

There are three OOA components, Object Modelling, Dynamic Modelling, and Functional Modelling.

- Object Modelling: Objects are instances of a class.

Object Modelling develops the static formation of the system concerning the object.

It recognizes the objects and the relationship in objects and classes. It identifies the attributes and functions of each class.

- [Dynamic Modelling](https://www.wisdomjobs.com/e-university/object-oriented-analysis-and-design-tutorial-2107/ooad-dynamic-modeling-26532.html): It explains how objects respond to events
- [Functional Modelling](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_functional_modeling.htm#:~:text=Functional%20Modelling%20gives%20the%20process,Data%20Flow%20Diagrams%20(DFDs).) indicates the processes executed in an object and how data change when it moves to objects.

#### Object-Oriented Design (OOD)

In OOD, a system is a group of objects. It involves designing the objects, classes, and relationships between classes.

Terms in Object-Oriented Design:

- Instance Variables: Data attributes that are specific to an object.
- Instance method: Operations that are specific to an object.
- Class Variables: Data attributes that are not specific to an object.
- Class Method: Operations that are not specific to an object.
- Constructors: A unique method that creates and initializes the objects for a class to perform some operations.

### Elements of the Object Model

Here are the significant elements of the Object Model.

#### Abstraction

Abstraction reduces complexity. Abstraction comes about from the recognition of similarities between objects. Abstraction takes place when the system stress details that are important to the user. It focuses mostly on the outside view of the object. Data is abstracted when protected by a set of methods, and only those methods can access data in the object.

#### Encapsulation

Encapsulation is achieved through information hiding or data hiding to reduce complexity and increase reusability. The user cannot see the inside of an object or a class, but the object can be accessed by calling the object's methods. Encapsulation and Abstraction are complementary concepts. In Abstraction, the system focus on object behaviour and functionality. Encapsulation focus on implementation that gives rise to action.

#### Hierarchy

Different properties and functions form a class of the hierarchy. Through hierarchy, a class can be composed of inter-related sub-classes, which can have their sub-classes until the smallest level of components is reached. Upper-most classes more general, and classes at the base are more specific.

#### Modularity

Modularity is the act of dividing a program into individual components or modules to reduce the problem's complexity. Modularity takes place on broad and powerful applications with multiple classes. The modules help to manage complexity. Modularity focuses on implementation. Therefore, modularity and encapsulation are related.

### Conclusion

That's all there is for this article. I hope this article gives you an understanding of the object model and its techniques.