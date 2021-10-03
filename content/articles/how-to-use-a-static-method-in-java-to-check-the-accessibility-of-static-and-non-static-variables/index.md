### Introduction
`Static` keyword is a Java non-access modifier for variables, methods, and code blocks. Static Java variables are only initialized once at the beginning of execution. A single copy is shared amongst all class instances by employing static variables, which may be easily accessed by class name and require no instance. Similarly, the Static method belongs to the class, not the instance and only static but not non-static variables are available.

A static method is associated with a class but not with an instance, and it may be invoked without requiring an instance or object of that class. They are often utility functions, such as those for creating or cloning objects, whereas static properties are useful for caching, fixed-configuration, or any other data that does not need to be copied across instances. In the static method, the method may not have access but only to static data members and static methods of another class or the same class. A static method may also rewrite any static data member's values. On the other hand, Non-static approaches can access any static method and variable without establishing an object instance.

Table of content:
- [How static methods can access static variables](#how-static-methods-can-access-variables)
- [How to access non-static variables inside a static method](#how-to-access-non-static-variables-inside-a-static-method)
- [A program with a static increment method and a non-static variable](#a-program-with-a-static-increment-method-and-a-non-static-variable)
- [Reason why static methods cannot access non–static variables](#reason-why-static-methods-cannot-access-non–static-variables)
- [When to use static methods ](#when-to-use-static-methods)
### How static methods can access static variables
Static methods can access the class variables without utilizing objects (instance) of the class, while only objects can use non-static methods and non-static variables. In static and non-static methods, static methods may be directly accessed. 
> Another thing to remember is that method overriding relies on dynamic binding at runtime, whereas static methods are bonded at compile time with static binding and hence cannot be overridden. 

Only other static variables and methods can be accessed by static methods. Because instance variables and these references have no calling object, static methods can't access or change their values, and static methods can't call non-static methods.

lets look at an example:
```Java
public class Foo {
    public static String bar = "Static variable:";
}
class Example {
    static int z = 6;
 // we have just declared the value a as static and our Main will also be startic
    public static void main(String args[])
    {
//here we will now access the static variable
        System.out.println(foo.bar);
        System.out.print( z);
    }
}
```
OUTPUT
```bash
Static variable: 6
```
### How to access non-static variables inside a static method
Because a non-static variable may only be accessed by generating an object of the class to which it belongs, it cannot be utilized within a static method in Java. When ran, this will result in an error.
```Java
public class Foo {
    public static String bar = "Non-Static variable:";
}
class Example {
    int z = 6;
 // we have just declared the value z as non-static and our Main will also be startic
    public static void main(String args[])
    {
//here we will now access the static variable
        System.out.println(foo.bar);
        System.out.print( z);
    }
}
```
OUTPUT
```bash
prog.java:16: error: non-static variable z cannot be referenced from a static context
    System.out.println("Non - Static variable:" + z);
                                                  ^
1 error
```
### A program with a static increment method and a non-static variable
Let's look at a program with a static increment method and a non-static variable `z`. We will not remove the increment method's comments since this will produce an error and we already know that static methods cannot access non-static variables.
```Java
class Vehicle {

    int z;
 
    // When the class is loaded, it is initialized to zero, but not for each object produced.
    static int c;
 
    // here we create the Constructor
    Vehicle()
    {
 
        // increment the static variable c here 
        c++;
    }
 
    public void printData()
    {
        System.out.println("Variable z = " + z);
        System.out.println("Variable c = " + c);
    }
 
}
 
class Example {
    public static void main(String args[])
    {
 
        // we start by creating an instance
        Vehicle v1 = new Vehicle();
 
        v1.printData();
 
        //we will access variable 'c' by the class name since its static
        Vehicle.c++;
 
        v1.printData();
    }
}

```
OUTPUT
```bash
Variable z = 0
Variable c = 1
Variable z = 0
Variable c = 2
```
### Reason why static methods cannot access non–static variables
Because static methods can be called on classes that haven't been instantiated, they can't use non-static variables (created). Non-static member variables belong to a class instance and are only allocated and assigned values when the instance is created.

The variables don't exist till then, and therefore they can't be referenced. OA non-static variable can only be accessed by an object of the class to which it belongs. There is no way for a non-static member to know which object a static method belongs to. A non-static member has no way of telling which object a static method belongs to.

There's no way for a static method to determine which object a non-static member belongs to. The non-static method does not belong to any object because there is none. As a result, referencing a non-static method from a static context is impossible.
### When to use static methods 
1. The method's code does not rely on instance creation and does not use any instance variables.
2. All of the instance methods must share a certain piece of code.
3. The method's definition should not be altered or overridden.
### Conclusion
You can't declare a static variable inside a method. This means that the static keyword can only be used in class scope, meaning that it has no meaning inside methods.

In Java, we can't override private or static methods. Private methods in Java are only visible to the class in which they are declared, limiting their scope to that class.

Happy coding!