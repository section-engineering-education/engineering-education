#**The concept of OOP In Java Getting Started with ABSTRACTION and ENCAPSULATION**

In Java, everything is considered an object and is treated as such; a real-life entity.

Object-Oriented Programming(OOP) unlike Procedural programming is an approach or a programming paradigm where everything is treated as Classes(Logical construct) and Objects(Real-life entities or instances of a class).

Class is a template from which objects are created. 
The process of creating Objects from a class is referred to as Instantiation

In this tutorial, you will learn about Abstraction and Encapsulation and build more on your already existing knowledge of the concept of OOP, and to say the least, this will be a nice piece to start with for absolute java beginners.

## Prerequisites
The reader should have:
- [At least a basic knowledge of Java]
- [Have Java installed on your computer]
- [Have any IDE of your choice]

## Objectives
At the end of this first OOP tutorial series readers should be able to:
- [Differentiate between classes and objects]
- [Understand Abstraction and Encapsulation]
- [Create objects from classes]
- [Have a working knowledge of what OOP is about]
- [Create abstract classes and interfaces]


###**CLASS**
A class is a template from which an object is created. A class serves as a blueprint for object creation.
Class has instance variables as attributes or properties and instance methods as their behaviors or actions
Instance Variables: These are variables declared in the class, outside of methods and constructors. Instance variables have a global scope.

###**Instance Methods**: This is a method that can be invoked only by an Object of its class.

It is the class that defines what an object data fields or variables and methods will be.



Example of a class

For instance, a circle class
A circle has a radius from just this simple information we can create different real life objects of type circle with this attribute define by the Circle class and with a few action or methods.

```java
public class Circle {
//instance variable
  private double radius=2.5;

//No argument constructor
public Circle(){

}

//argument Constructor

public Circle(double radius){
this.radius = radius;
}

//method
public double getArea(){
	return Math.PI*radius*radius; 

    }

//method
public  double getPerimeter(){
return Math.PI*(2*radius);

   }
}
```

With this, we’ve created a very simple class called Circle, the same goes for every other class like Car, Human, Animal, etc. Creating a class means you have a template or blueprints from which you can create different Objects of the same class.A class in simple term is a model. I hope you get this.

###**OBJECTS**
An object is an actual entity that has attributes and behaviors defined by its model.
For example circle, dog, fish, human, etc. 
Now that we’ve succeeded in creating a template for a Circle, creating circles of different sizes of our choice becomes easy.

```java
public class CircleSize {
  //entry point to every Java application
     public static void main(String[] args){

	    Circle smallCircle = new Circle();
        /*The new keyword used here means a new object of type class is created and saved in the variable smallCircle of reference type Circle*/

        //to get the area of your newly created circle
      System.out.println("The area of this circle is " + smallCircle.getArea());


        /*you can also decide to use an arg constructor to construct your new circle*/

       Circle bigCircle = new Circle(2.5);
        System.out.println("The area of this circle is " + bigCircle.getArea());

   }
}
```

The same thing applies if you want to create an Object of Dog.
The dog should have a name, color, age, and breed.
The dog should be able to sleep, eat, run, or bark.

```java
public class Dog {

    private String name;
    private int age;
    private String color;
    private String breed;


    //Dog arg constructor
    public Dog(String name, int age, String color, String breed) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.breed = breed;
    }

    public boolean isSleeping(){
        System.out.println("Sleeping");
        return true;
    }

    public boolean isEating(){
        System.out.println("Eating");
        return true;
    }

    public boolean isbarking(){
        System.out.println("Dog barking...");
        return true;
    }

    public boolean isRunning(){
        System.out.println("Dog running");
        return true;	
    }   
}
```

To create a new dog object

```java
public class Dog_Main {
   public static void main(String[] args) {
       Dog littleDog = new Dog("Bingo", 6,"Brown", "German Shepherd");
       System.out.println("Is the dog running:? "+ littleDog.isrunning());

       System.out.println();

       System.out.println("is the dog sleeping:? " + littleDog.isSleeping());

       System.out.println();

       System.out.println("Is the dog barking:? " + littleDog.isbarking());

       System.out.println();

       System.out.println("Is the dog eating:? " + littleDog.iseating());

       System.out.println();

       System.out.println("The dog name is:  " + littleDog.name);
   }
}
```

Now you see, we’ve created a new dog with the name Bingo, you can go on to create as many dogs with different states or attributes.


Here is the output

Dog running
Is the dog running:? true

Sleeping
is the dog sleeping:? true

Dog barking...
Is the dog barking:? true

Eating
Is the dog eating:? true

The dog name is: Bingo

Now that we’ve got this out of the way, let's talk about Abstraction and Encapsulation properly.

#**ABSTRACTION**
Who could have imagined that Abstraction will be a thing in programming? Who? But right now you can’t talk about OOP without mentioning Abstraction. It is a major building block of OOP. So then, what is Abstraction? In this section, I will explain what Abstraction is and how to use it as a Java developer.

In Abstraction, only the useful attributes of an object are on display or accessible while the unnecessary details are “hidden” or abstracted. For example, while you’re typing on your computer keyboard you’re only interested in punching the keys and believing that it produces results on your screen but you know nothing about the mechanism that produces the result and I’m sure you haven’t even thought about it. Have you? Another example to make things clearer,  imagine a car driver, he is only interested in starting, moving, and stopping the car. Accelerate or change gear and brake but he is not interested in the mechanism that works internally to perform all the above functions. Simply speaking, in abstraction the implementation details are hidden from the user while the functionality is exposed to the user hence the user will only know what a function(method in java) does but not how it does it.

How to implement Abstraction in Java
In Java, abstraction is implemented in either of these two ways
-[1]: by using the non-access modifier ‘abstract’ keyword. 
-[2]: Interface


- 1: Non-Access Modifier keyword “Abstract” Implementation
The abstract access modifier keyword can only be used with classes, methods but not with variables. Methods with the keyword abstract are methods without implementation.

To implement an abstract class in Java, use the abstract keyword immediately before the class keyword preceding the class name e.g public abstract class Circle, where Circle is the class name. Use this pattern for abstract method implementation, public abstract returnType methodName() i.e public abstract double getArea().

Code snippet
```java
public abstract class Dog {
	
	public abstract void run();


}
```

With the above code snippet, we've created an abstract class and an abstract method but one pertinent feature of abstract classes is that objects cannot be instantiated or created from it.But don’t forget, classes only exist for the purpose of creating an object. To be able to create an object from an abstract class we have to create a new class that inherit from the superclass(base, parent) class by using the extends keyword.

Code snippet
```java
public class MainDog extends Dog {

    //abstract method body definition
	public void run(){
		//in this class the method is implemented
	    System.out.println(“Dog is running”);
    }
	
	public static void main(Strings [] args){
		
		MainDog dog = new MainDog();

		//abstract method invocation
		dog.run();
    }

}
```

-[2]: Interface implementation
An interface contains public, abstract method signatures (methods without implementation). It is also important to note that interfaces have no constructor and may contain final and static variables. Abstraction implementation by the interface method is made possible by the use of the Implements keyword.
A parent class is inherited by a child class known as the client code which overrides the parent’s method signature and provides a method body.

```java
public interface Car{
	public void start();

    public void stop();
} 

public Benz implements Car{
    
    /*@Override to override the stop method in the car class that has no implementaion*/

	@Override 
	public void start(){
	    System.out.println(“I started my Benz car ”);
	}

    /*to override the stop method in the car class that has no implementaion*/

    @Override 
	public void stop(){
		System.out.println(“I stopped my Benz car”)
    }
}
```

To run this program, we need another class and the main method,the latter is the entrance to every Java application.

```java
public class Main{
	public static void main(){
		Car car = new Benz();
		car.start();
		car.stop();
    }
}
```

In the main method, Car represents the interface class or superclass, Benz represents the concrete class or child class, the child class gives its memory to the Car object to have access to its implemented methods. The Benz class implemented the start and stop behaviors of the Car class in the manner it wanted. This makes for application robustness, we can easily change or add a requirement to our application without necessarily breaking down the application, for instance, we want to add another car that stops or start differently, we can easily create a car class say Toyota that implements class Car, override it stop and start method and implement it the way we want our Toyota to start and stop. There is no need to go into the Car class to change our code whenever there is a new requirement.

Now, that we’ve finally gotten abstraction off the list, on to the next one, Encapsulation.


#**ENCAPSULATION**

Imagine, you are building an application and the user can directly access and manipulate your data fields, how costly would that be? The outcome is better left to imagine than experience it.
  
Apart from Inheritance and Polymorphism which I will write about in my next article and Abstraction, Encapsulation is another fundamental concept of OOP that every OOP developer needs to get familiar with.

Encapsulation is simply the process of encapsulating and hiding the details of a class implementation from the user. Encapsulation is achieved by wrapping the class attributes or fields(variables) and the methods(i.e the codes that manipulate the attributes)together as a unit.

Encapsulation makes for the security of an application as the user of a code cannot access the private variables of an encapsulated class except through its public methods which in most cases are the accessor and mutator methods.
Let’s use a simple code to explain that.

Code snippet

```java
public class Human{
	private String name;
	private int age;
	private String gender;
}
```

From the code snippet above, all fields or attributes of the class are declared private and so the client or in simple terms, the user cannot use or access the class attributes or fields except through the accessor or mutator methods popularly known as ‘Getter’ and ‘Setter’ methods respectively. So, for instance, to set and get the name of an object from the human class, declare the following methods in the Human class.

```java
public void setName(String name){
    this.name = name;
}

public String getName(){
	return name;
}
```


So because these methods are declared with a public access modifier, other classes can set and get names whenever an object is created from the human class. So encapsulation adds security to our code by reducing how clients access our data or class contract.

In general, these two steps can be used to implement Encapsulation:

- [1]: Declare class attributes as private as we did in the code above
- [2]: Provide public setter and getters to access or manipulate instance variables, remember the setName() and getName method?

###**Difference between Abstraction and Encapsulation**

The obvious differences between abstraction and encapsulation are:
Abstraction hides the internal details of a program and shows only the functionality
Encapsulation wraps both code and data together
Abstraction hides complexity while encapsulation hide the internal working

#**Conclusion**

To this point, we’ve demystified the concept of OOP starting with Classes, Objects, Abstraction, and Encapsulation and how they are implemented in Java. To say the least, abstraction and encapsulation are two sides of the same coin. I hope you find this insightful. I hope to write about Inheritance and Polymorphism in my next OOP concept article.


### References
Java- How to program 10th Ed-Early Object Version- Deitel
Introduction to Java Programming(10th ed) Comprehensive Version [Liang- 2014-01-06]


![](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)
![](https://docs.oracle.com/javase/tutorial/java/concepts/index.html)
![]([https://www.w3schools.com/java/java_abstract.asp)
![](https://www.w3schools.com/java/java_encapsulation.asp)


