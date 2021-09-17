---
layout: engineering-education
status: publish
published: true
url: /introduction-to-solid-principle/
title: Introduction to the Solid Principle
description: This tutorial will serve as an introduction to the SOLID principle. Which is a design principle and pattern intended to make software designs more understandable, flexible, and maintainable.
author: adetu-ridwan
date: 2021-01-09T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-solid-principle/hero.jpg
    alt: Solid principle image example

---
Writing clean code is one of the core precepts of software development. There are various software design approaches to ensure an understandable, flexible, and maintainable code base. This article explains one of the object-oriented programming design principles that assist you as a software developer in writing clean code.
<!--more-->
This principle's application will be from a universal point of view towards understanding the concept of the SOLID principle, not in relation to any specific programming language.

### What is the Solid principle?
The SOLID principle is a design principle and pattern intended to make software designs more understandable, flexible, and maintainable. When creating an object, the object's design is essential in the software development process, notably in deciding the accessibility scope.

The object case scenario might confuse newbies in software development. Here's a better analogy; imagine if cups had their handles at the top rather than at the side. How accessible or comfortable would it be to use this cup (object)? But if the handle remains at the side, they remain readily accessible and comfortable to use.

In a software development lifecycle, the decision on how accessible and flexible an object is during this object's design phase will ensure its usability, simplicity, ease of implementation, and accessibility towards making reliable software.

SOLID principles have been tested and trusted by software developers, and the underlying technique of this principle, when applied correctly, can aid in developing standard object-oriented software applications.

### Benefits of SOLID principle
The following are the five advantages of the SOLID principle when incorporated in your software design process:

#### Accessibility
The SOLID Principle ensures easy access and control to object entities. The integrity of stable object-oriented applications provides easy access to objects, eliminating the risks of unintended inheritance.

#### Ease of refactoring
Software change over time. Therefore developers need to build applications while keeping in mind the possibility of future changes. Poorly structured software applications make it difficult to refactor, but it is quite effortless to refactor your codebase with the SOLID principle.

#### Extensibility
Software go through phases of upgrades, including extra features. If extending the features of an application is not done tactfully, this could affect existing functionalities and cause unintended problems.

The procedure of extensibility could be a gruesome process, as you need to build on functionalities that already exist in the codebase, and if the existing functionalities are not adequately designed, this makes it even more difficult to add extra features. But the application of SOLID principles makes the extensibility process easier.

#### Debugging
Debugging is a crucial part of the software development process. When software applications are not adequately designed, and the codebase is clustered like spaghetti, it is hard to debug applications. The SOLID principle incorporates the feature of ensuring that the debugging process of software is much more comfortable.

#### Readability
A well-designed codebase can be easy to understand and read. Readability is also an essential element in software development because it makes the debugging and refactoring operations easier, especially in open-source projects.
The SOLID principle approach ensures that your code is relatively easier to read and understand.

### A brief review on interfaces and concrete classes
An [interface is a blueprint](https://medium.com/heuristics/interface-vs-abstract-class-vs-concrete-class-196f20c3af9a#:~:text=Interface%20is%20a%20blueprint%20for,static%20members%20and%20method%20signatures.) for your class that can be used to implement a class (abstract or not).

A concrete classes are the [final implementation of a blueprint](https://medium.com/heuristics/interface-vs-abstract-class-vs-concrete-class-196f20c3af9a#:~:text=Interface%20is%20a%20blueprint%20for,static%20members%20and%20method%20signatures.) in case you are extending it some abstract super class. A concrete class is complete in itself and can extend and can be extended by any class. 

If we are following the inversion principle, developers should lean towards using interfaces over importing classes because it results in a structured and cleaner code.

It is recommended that your code should rely on abstract classes rather than concrete classes.

### The SOLID principle and its implementation
#### Single responsibility principle
The single responsibility principle states that a class should have only a single reason to change throughout its lifetime. This principle ensures that a class exists only for a single reason but can have multiple methods to carry out distinct functions.

By following the single responsibility principle, a class should only resolve one aspect of your code.

Let's take a brief look at the pseudocode implementation of the single responsibility principle. Lets say we have a factory where cars are manufactured and where cars are also painted. 

Below is an illustration implementing such a feature using the single responsibility principle:
```bash
class DatabaseManagement {
 public function store(argument1, argument2) {
 //store information to the database
 }
 
 public function fetch(argument1) {
 //store information to the database
 }
 
 public function Edit(argument1) {
 //edit information in the database
 }
 
}
class CarManufacturer {
 
 public function create(argument1, argument2) {
 //create Car logic
 }
 
 public function fetch(argument) {
 //fetch details about a single car
 }
 
 public function fetchAll() {
 //fetch all cars in the system
 }
 
 public function delete(argument1) {
 //delete a car
 }
}
class PaintManufacturer {
 public function create(argument1, argument2) {
 //create paint 
 }
 
 public function fetch(argument) {
 //fetch details about a single paint
 }
 
 public function fetchAll() {
 //fetch all paints in the system
 }
 
 public function delete(argument1) {
 //delete a paint
 }
}
```

From the pseudocode above, we have a separate class to handle the database logic, and each class has only a single responsibility. 

The CarManufacturer class only has the responsibility of handling car logic. The PaintManufacturer class only has the responsibility of creating paints for cars. The DatabaseManagement class only has the responsibility of handling the database logic.

The solid responsibility principle ensures that each class in our pseudocode only has a reason to change if there is a change in their single responsibility.

### Open and close principle
This principle states that objects should be open for extension but closed for modification. The open and close principle ensures our code is easily extensible without editing or rewriting the existing codebase.

This principle relieves the developer of the strain of going through existing code and where it has been used before extending it, which can be a tedious process. Designing software applications using this principle ensures extensibility and the reusability of objects.

Let's take a brief look at the pseudocode implementation of the single responsibility principle. Using the analogy of building a trip costing system for a travel agency, a travel agency has a costing system that calculates your trip's costs and the food you eat during the trip.

The pseudocode below calculates travel and food costs during our trip in the `calculateRoadTripTotalCost()` function.

```bash
class TravelCosting {
 public function calculateRoadTripTotalCost() {
 //calculate’s cost of food,trip fare and return total cost
 }
}
```

What if the travel agency needed to change how they calculate their food cost from the code above? To do this, the entire function would have to be reworked. 

The way to reimplement the pseudocode above to ensure extensibility and reusability would be:

```bash
class TravelCosting {
 public function calculateFoodCost() {
 //calculate cost of food
 }
public function calculateTripCost() {
 //calculate cost of trip fare
 }
public function calculateTotalCost() {
 //use results from calculateFoodCost and calculateTripCost to return total cost
 }
}
```

The code above ensures that we don't have to rewrite the costing criteria' functions to write new costing criteria, this is how you apply the open and close principle.

### LISKOV substitution principle
This principle illustrates that if a section of your code is extending a superclass, then all subclasses of the superclass should be able to replace the superclass in your code. A section of your code does not have to know which class it is as far as it is a superclass subclass. 

The LISKOV substitution principle analogy might seem confusing, but what it implies is that functions that use pointers of references to a base class must use the derived class objects without knowing it. The application of this principle ensures the easy integration of classes.

Below is an application of this concept, but without the use of the LISKOV substitution principle:
```bash
class CheesPiece {
 // class to create a chess piece
}
class Queen extends ChessPiece {
 // class representing bishop piece
}
class Bishop extends ChessPiece {
 // class representing bishop piece
}
import Bishop
class MoveBishopPiece {
 public function moveRight(){
 //move the chess piece to the right
 return new bishop;
 }
}
import Bishop
class MoveQueenPiece {
 public function moveRight(){
 //move the chess piece to the right
 return new bishop;
 }
}
```

The code above has a lot of redundancy and repetition. Let's see how this is resolved by applying the LISKOV substitution principle.

```bash
import Bishop
class MoveChessPiece {
 public function moveRight(ChessPiece chessPiece){
 //move the chess piece to the right
 }
}
```

With the implementation above, our code becomes more concise and also easier to debug. 

### Dependency inversion principle
The dependency inversion principle ensures that classes should not depend on solid classes but should only depend on abstraction (abstract classes or interfaces). By following this approach, it makes the interchanging of modules and classes or services simple.

Throughout the software development process, there is a likelihood of depending on external libraries, and several of them end up redundant. The dependency inversion principle makes changing dependencies easier.

To illustrate the application of the dependency inversion principle, we would use the car analogy of the single responsibility principle, but without the adoption of the dependency inversion principle.

```bash
class MySQLDatabaseManagement {
 protected function store(argument1, argument2) {
 //store information to the database
 }
 
 protected function delete(argument1) {
 //delete information in the database
 }
 
}
class CarManufacturer {
 
 public function create(argument1, argument2) {
 //create Car logic and stores it using MySQLDatabaseManagement store method
 }
 
 public function delete(argument1) {
 //delete a car from the database using MySQLDatabaseManagement the delete method
 }
}
```

Above, we applied the MySQLDatabaseManagement class for performing database operations, and it carries out its function. The problem with the code above, would be in the case that we decided to change our database type from MySQL to Postgres.

To change our database type, we would have to write another class and would also need to edit the CarManufacturer class to reflect our change in the database class.

The problem with this approach is that if you had used the MySQLDatabaseManagement class in many parts of the code, you would have to change it everywhere. This is not an effortless task and can be avoided by applying the dependency inversion principle.

Let’s solve this problem using the dependency inversion principle:

```bash
interface DatabaseManagement {
 public function store();
}
class MySQLDatabaseManagement implents DatabaseManagement {
 public function store(argument1, argument2) {
 /store information to the database
 }
 public function delete(argument1) {
 //delete information in the database
 }
}
class CarManufacturer {
 public function create(argument1, argument2) {
 //create Car logic and stores it using DatabaseManagement store method
 }
 
 public function delete(argument1) {
 //delete a car from the database using DatabasedManagement the delete method
 }
}
```

In the implementation above, the CarManufacturer class does not rely on a concrete class. Instead, it relies on an interface. Therefore, if we intend to change the database technology, we can change the class that implements the DatabaseManagement interface.

By following the dependency inversion principle, we do not have to change our code, that helps over code readability and extensiveness.

### Conclusion
You now have a firm understanding on the benefits of using the SOLID principle, a brief review of interfaces and concrete classes, and implementing the SOLID principle in the software development process.

I recommend you read more about design patterns. They would build on the knowledge you've gained here and help further improve your code to make it cleaner.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
