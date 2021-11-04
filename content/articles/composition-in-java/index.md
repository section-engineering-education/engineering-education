### Composition in Java
Like most OOP languages, Java does not allow multiple inheritances. This problem limits the programmer from enjoying the property of code re-use with two objects or more objects with a strong relationship or similar properties.

 To solve for that, we have the property called `Composition`. 
 Composition in Java exists when two or more objects relate to each other. One object, in that case, exists due to the existence of another object.
 
 ***Example of Composition***
 
 Let us take a look at some examples of how composition comes to effect.
 - A class car is a composition of class Engine and class wheels.
 - A class body is a composition of the class Heart, class Stomach, etc.
 
 The examples above show that neither the class Engine nor the class Wheels can exist without the class Car. Likewise, the class Heart and Class stomach both depend on the class Body to exist.
 
 ### Introduction
 
As we have learned from the example above, there are two categories of classes. First, the `parent class` is usually independent.

- From the example we used, the Class car and the  Class body are both parent classes.

Moreover, there is the dependent class that cannot exist without the presence of the parent class. This class is known as the `child class`.

- By now, you know that the child class will be the Class Engine, Class Wheels from the parent class Car and Class Heart, and the Class Stomach child classes of the parent class Body.

### Features of Composition
Below are some of the common features available when interacting with composition.

1. Provides for a `has-a` relationship between objects - Let us use the example of the car and the Engine to understand this.

 Both the car and the Engine are objects, but the Engine is contained, meaning every car has an engine. Relatively in composition, one object must have the other hence the has-a relationship.

2. `Code Re-use` - This can use a code once written on multiple occasions. From the above example, the class engine is once written, can be re-used on another object car since it will still contain the Engine and will require the engine class. 

This saves the programmer having to code the engine class for every car even though the attributes of the cars may be different.



### Implementation on Java

Now, we are going to learn how composition is applied in problem-solving. We will be using the `Intellij` IDE with Java language.

If you do not have [Intellij](https://www.jetbrains.com/idea/download/#section=windows), you can download it from the Jetbrains official Webpage.


**Preview**

We will create three classes—the Main Class, the Parent class, and the child class.
We will be running the programs at the Main class and creating the methods and attributes at the parent and child classes. Therefore, ensure that all your classes are in the same package to ensure your code runs swiftly.

```
package org.kimcode.composition;

public class Engine {
    private String model;
    private int weight;
    private String color;
    private int price;


    public Engine(String model, int weight, String color, int price) {
        this.model = model;
        this.weight = weight;
        this.color = color;
        this.price = price;
    }

    public Engine(String rpm, int weight, String silver) {
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

```
From the above code, we have created a class named `Engine`. We have allocated some attributes and given all the access specifiers `private` to make it only accessible by the class itself or via the getters from another class. We also have getters and setters to enable the attributes accessible from an outside class.

We will now create the parent class, which is the class Vehicle. Finally, we will link the `Class Engine` with the `Class Vehicle` by creating an Engine attribute.

```
package org.kimcode.composition;

public class Vehicle {
    private String name;
    private String color;
    private int price;
    private int wheels;
    private Engine engine;


    public Vehicle(String name, String color, int price, int wheels, Engine engine) {
        this.name = name;
        this.color = color;
        this.price = price;
        this.wheels = wheels;
        this.engine = engine;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getWheels() {
        return wheels;
    }

    public void setWheels(int wheels) {
        this.wheels = wheels;
    }

    public Engine getEngine() {
        return engine;
    }

    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}

```
As you can see from the above class Vehicle, we have treated the child class Engine as an attribute though not. So we have initialized it, created a constructor for it, and created a getter and setter for it, just like any other attribute.

Let us now create the Main class where we will be running and implementing the code. 

```
package org.kimcode.composition;

public class Main {
    public static void main(String[] args) {
        Vehicle benz = new Vehicle("benz", "black", 200, 4,
                new Engine("high", 24,"silver"));
        Engine engine = benz.getEngine();
        System.out.println("I have a "+ benz.getColor()+" "+ benz.getName());
        System.out.println("With a weight of "+ benz.getEngine().getWeight()+" TONNES");
        System.out.println("The Price is "+ engine.getPrice());
    }
}
```
The Main class java enables you to run all the code in the package specified.
You first create an object, the vehicle; for our case, we have a **Benz**. We also have created an Engine.

A preview of the full code as in the Intellij is as shown below:

![Main Page](/engineering-education/composition-in-java/Main.png)

The output of the code is derived through composition.

### Difference between Composition and Inheritance
`Inheritance` is a property where an object acquires all the attributes and behaviour with similar properties, commonly known as `parent object`. 
We are now going to take a look at how composition differs from Inheritance.

1. Composition is based on a `has-a` relationship, while Inheritance is based on an `is-a` relationship.
2. With Inheritance, you can extend your code to only one interface, but with composition, you can re-use your code multiple times.
3. With composition, we can re-use code even with the final class, but with Inheritance, it cannot be achieved. 

Let us now use a code snippet to show how composition is evaluated.

```
class Vehicle{
   String name="V8";
}
class Car extends vehicle {
   String type="Car";
   public static void main(String args[]){
      Car c=new Car();
      System.out.println("Name:"+c.name);
      System.out.println("Type:"+c.type);
   }
}
```

```
public class Student {
}
public class College {
   private Student student;
   public College() {
      this.student = new Student();
   }
}
```

### Conclusion
We have learned that composition can be pretty helpful when coding. By utilizing code, re-use you can have a clean and organized code with maximum use of characters.
The composition also helps locate a bug on your code since the neat arrangement enables straightforward interpretation of code.

#### Summary
From the tutorial above, we have been able to learn the following:
1. Introduced and understood what composition is in Java.
2. Seen some features available in composition.
3. Implementation of Composition using an example.
4. Differentiated Composition and Inheritance.
