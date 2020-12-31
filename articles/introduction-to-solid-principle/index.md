# Introduction to Solid Principle
Writing clean code is one of the core precepts of software development. There are various software design approaches to ensure an understandable, flexible, and maintainable code base.

This article explains one of the object-oriented programming design principles that assist you as a software developer towards writing clean code.

The application of this principle will be from a universal point of view towards understanding the concept of the SOLID principle, and not in relation to any specific programming language.

# What is Solid Principle?
The SOLID principle is a design principle and pattern intended to make software designs more understandable, flexible, and maintainable. In the software development process, when creating an object, the object's design is essential, notably in deciding the accessibility scope.

The object case scenario might confuse newbies in software development. Here's a better analogy; imagine if cups had their handles at the top rather than at the side. How accessible or comfortable would it be to use this cup (object)? But if the handle remains at the side, they remain readily accessible and comfortable to use.

In a software development lifecyle, the decision on how accessible and flexible an object is during thsi object's design phase will ensure its usability, simplicity, ease of implementation and accessibility towards making reliable software.

SOLID principles have been tested and trusted by software developers, and the underlying technique of this principle, when applied correctly, can aid in developing standard object-oriented software applications.

# Benefits of SOLID Principle
The following are the five advantages of the SOLID principle when incorporated in your software design process:

## Accessibility
The SOLID Principle ensures easy access and control to object entities. The integrity of stable object-oriented applications provides easy access to objects, eliminating the risks of unintended inheritance.

## Ease of refactoring
Software change over time. Therefore developers need to build applications while keeping in mind the possibility of future changes. Poorly structured software applications make it difficult to refactor, but there is effortlessness in refactoring your codebase with the SOLID principle.

## Extensibility
Software go through phases of upgrades, including the addition of extra features. If extending the features of an application is not done tactfully, this could affect existing functionalities and cause unintended problems.

The procedure of extensibility could be a gruesome process, as you need to build on functionalities that already exist in the codebase, and if the existing functionalities are not adequately designed, this makes it even more difficult to add extra features. But the application of SOLID principles makes the extensibility process easier.

## Debugging
Debugging is a crucial part of the software development process. When software applications are not adequately designed, and the codebase is clustered like spaghetti, it is hard to debug applications. The SOLID principle incorporates the feature of ensuring that the debugging process of software is much easier.

## Readability
A well-designed codebase can be easy to understand and read. Readability is also an important element in software development because it makes debugging and refactoring operations easier, especially in open-source projects.
The SOLID principle approach ensures that your code is relatively easier to read and understand.

# A Brief Review On Interfaces and Concrete Classes
The difference between interfaces and concrete classes is a topic worth its page. However, limiting this to this article, interfaces are both interface and abstract classes. By following the inversion principle, software developers should lean towards using interfaces rather than importing classes because it results in a structured and cleaner code.

It is recommended that your code should rely on abstract classes rather than concrete classes.

# SOLID Principle and Its Implementation

### Single Responsibility Principle
The single responsibility principle states that a class should have only a single reason to change throughout its lifetime. This principle ensures that a class exists only for a single reason but can have multiple methods to carry out distinct functions.

By following the single responsibility principle, a class should only resolve one aspect of your code.

Let's take a brief look at the pseudocode implementation of the single responsibility principle. In a factory where cars, car paints are manufactured and where cars are also painted. Below is an illustration implementing such a feature using the single responsibility principle:
```
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

From the above pseudocode, we have a separate class to handle the database logic, and each class has only a single responsibility. 

The CarManufacturer class only has the responsibility of handling car logic. The PaintManufacturer class only has the responsibility of creating paints for cars. The DatabaseManagement class only has the responsibility of handling the database logic.

The solid responsibility principle ensures that each class in our pseudocode only has a reason to change if there is a change in their single responsibility.

### Open and Close Principle
This principle states that objects should be open for extension but closed for modification. The open and close principle ensures that our code is easily extensible without editing or rewriting the existing codebase.

This principle relieves the developer of the strain of going through existing code and where it has been used before extending it, and this can be a tedious process. But, designing software applications using this principle ensures extensibility and the reusability of objects.

Let's take a brief look at the pseudocode implementation of the single responsibility principle. Using the analogy of building a trip costing system for a travel agency, a travel agency has a costing system that calculates your trip's costs and the food you eat during the trip.

The pseudocode below calculates travel and food costs during our trip in the `calculateRoadTripTotalCost()` function.

```
class TravelCosting {
 public function calculateRoadTripTotalCost() {
 //calculate’s cost of food,trip fare and return total cost
 }
}
```
What if the travel agency needs to change the way they calculate their food cost from the above code? To do this, the entire function has to be reworked. The way to reimplement the above pseudocode to ensure extensibility and reusability is:

```
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
The above code ensures that to write new costing criteria, we don't have to rewrite the costing criteria' functions, which is how you apply the open and close principle.

### LISKOV Substitution Principle
This principle illustrates that if a section of your code is extending a superclass, then all subclasses of the superclass should be able to replace the superclass in your code. A section of your code does not have to know which class it is as far as it is a subclass of the superclass. 

The LISKOV substitution principle analogy might seem confusing, but what it is simply implying is that; functions that use pointers of references to a base class must be able to use the derived class objects without knowing it. The application of this principle ensures the easy integration of classes.

Below is an application of this concept, but without the use of the LISKOV substitution principle:
```
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
The above code has a lot of redundancy and repetition. Let's see how this is resolved by applying the LISKOV substitution principle.

```
import Bishop
class MoveChessPiece {
 public function moveRight(ChessPiece chessPiece){
 //move the chess piece to the right
 }
}
```

With the above implementation, our code becomes more concise and also easier to debug. 

### Dependency Inversion Principle
The dependency inversion principle ensures that classes should not depend on solid classes but should only depend on abstraction (abstract classes or interfaces). By following this approach, it makes the interchanging of modules and classes or services simple.

Throughout the software development process, there is a likelihood of depending on external libraries, and quite a several of them end up redundant. The dependency inversion principle makes changing dependencies easier.

To illustrate the application of the dependency inversion principle, we would use the car analogy of the single responsibility principle, but without the adoption of the dependency inversion principle.

```
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

Above, we applied the MySQLDatabaseManagement class for performing database operations, and it carries out its function. The problem with the code above is if we decide to change our database type from MySQL to Postgres.

To change our database type, we would have to write another class and would also need to edit the CarManufacturer class to reflect our change in the database class.

The problem with this approach is that if you had used the MySQLDatabaseManagement class in many parts of the code, you would have to change it everywhere. This is not an effortless task and can be avoided by applying the dependency inversion principle.

Let’s solve this problem using the dependency inversion principle:

```
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

In the above implementation, the CarManufacturer class does not rely on a concrete class. Rather it relies on an interface. Therefore, if we intend to change the database technology, we can change the class that implements the DatabaseManagement interface.

By following the dependency inversion principle, we do not have to change our code, which helps in our code readability and extensiveness.

# Conclusion
At the end of this article, you now have a firm understanding of the benefits of using the SOLID principle, a brief review of interfaces and concrete classes, and implementing the SOLID principle in the software development process.

I recommend you read more about design patterns. They would build on the knowledge you've gained here and improve your code and make it cleaner.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
