---
layout: engineering-education
status: publish
published: true
url: /encapsulation-in-c-plus-plus/
title: Encapsulation in C++
description: This article will help you understand Encapsulation in C++.
author: jacob-omukaga
date: 2022-02-18T00:00:00-08:12
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/encapsulation-in-c-plus-plus/hero.jpeg
    alt: Encapsulation in C++ Hero Image
---
Encapsulation is the method of grouping data and features into a single part. 
This part is known as a **class**. It is done to protect straightforward access to the data. 
<!--more-->
Encapsulation is one of the **Object-Oriented Programming (OOPs)** features.
Construction of user-limited classes in **C++** supports encapsulation and data hiding. 

### Table of contents
- [Encapsulation and Abstraction](#encapsulation-and-abstraction)
- [Difference between Abstraction and Encapsulation](#difference-between-abstraction-and-encapsulation)
- [Encapsulation vs Inheritance](#incapsulation-vs-inheritance)
- [How Encapsulation is Implemented](#how-encapsulation-is-implemented)
- [Why Encapsulation](#why-encapsulation)
- [Types of Encapsulation](#types-of-encapsulation)
- [The Role of Encapsulation](#the-role-of-encapsulation)
- [Data Hiding in relation to Encapsulation](#data-hiding-in-relation-to-encapsulation)
- [Roles of Access specifiers in Encapsulation](#roles-of-access-specifiers-in-encapsulation)
- [Real Life Examples of Encapsulation](#real-Life-examples-of-encapsulation)
- [Conclusion](#conlusion)
- [Further Reading](#further-reading)

### Encapsulation and abstraction
**Data Abstraction** is a process by which the programmer decides what data is to be shown in public; nevertheless, the practical execution of the Abstraction is nothing more than Encapsulation, which is accomplished through the use of access modifiers. 
You may argue that Encapsulation is the Abstraction's implementation.

### Difference between abstraction and encapsulation
- Abstraction itself is a process that involves obtaining information, while Encapsulation, on the other side, involves methods of containing Information.
- Abstraction is a technique for masking undesired data and revealing useful information. On the other hand, Encapsulation is the process of combining code and data into a unified unit to safeguard data from an external view.
- Encapsulation involves masking the internal details or mechanics of how an object does something. In contrast, abstraction allows you to concentrate on what the item does rather than how it does it.
- Abstraction is achieved by using abstract classes and interfaces, while Encapsulation, is implemented by using access modifiers (Public, Protected, and Private).

### Encapsulation vs. inheritance 
Encapsulation links a code to the data it distorts. Inheritance allows a class to inherit the attributes and functions of another class. Encapsulation is exemplified by an ATM that binds several denominations of banknotes and all the activities necessary to withdraw money. 

Inheritance may be seen in the classification of vehicles like cars, bikes, buses, trucks, etc.
Inheritance means that a subclass gets its primary class's characteristics and functions. Encapsulation states that one class should not access another class's private data.

### How encapsulation is implemented
Encapsulation is implemented in C++ as a class that encapsulates data and the methods that operate on it. Data is typically designated as private so that it cannot be accessed outside of the class. 

The public functions are defined and may be retrieved by using the class's objects.
However, we cannot openly access private members' data, which is referred to as "data hiding." Data is protected and can be viewed by functions of the class where it is defined when this is performed.
Below is how it is performed.

```c++
#include <iostream>
using namespace std;

class Player {
  private:
    // Private attribute
    int Goals;

  public:
    // Setter
    void setGoals(int g) {
      Goals = g;
    }
    // Getter
    int getGoals() {
      return Goals;
    }
};

int main() {
  Player myObj;
  myObj.setGoals(10);
  cout << myObj.getGoals();
  return 0;
}
```

The `goals` attribute is private, which has restricted access.
The `public` `setGoals()` method takes a parameter `(g)` and assigns it to the `goals` attribute `(goals = g)`.
The `public getGoals()` method returns the value of the private goals attribute.
Inside `main()`, we create an object of the `Player` class. Now we can use the `setGoals()` method to set the value of the private attribute to **10**. Then we call the `getGoals()` method on the object to return the value.

### Why encapsulation
Encapsulation is essential in holding the information about an item hidden from its users.
This is the motive that makes all of the member variables of a category personal and maximum of the member capabilities public. 

Member variables are made personal so that those can't be at once accessed from outside the class. So maximum member capabilities are made public to permit the users to enter the records of individuals via their own capabilities.
For example, when you turn on an electric kettle, and the water reaches the boiling point, it turns off automatically. We don't know the mechanism behind the kettle turning off. What happens inside is encapsulation.

### Types of encapsulation
In OOP, there are three forms of encapsulation, as shown below.
- Class encapsulation.
- Function encapsulation.
- Member variable encapsulation. 

As the title suggests, all data members are made private under member variable encapsulation. Set and Get functions are used by any object that wants to change or obtain the value of a data member. Contrarily, some of the functions and constructors in function encapsulation are declared private. The entire class is designated as private in Class Encapsulation.

### The roles of encapsulation
- Encapsulation in C++ aids in grouping relevant parts together into a unified class, keeping the code clearer and easier to comprehend.
- The user has read and write access to the get() and set() methods. It results in the safekeeping of data.
- The data packaging facilitates growth in general. These packages can be independently tested, debugged, and run without affecting the other elements.
- Data concealing is an excellent approach to keep your data safe from unwanted reach. Therefore, the code's security is enhanced much further.

### Data hiding with encapsulation
The technique of merging data and operations into a unified piece is known as **data hiding**. 
Data hiding is based on the idea of concealing data inside a class to restrict straight accessibility from beyond the class. 

Data hiding helps programmers in the creation of classes with distinct data sets and functionalities. It prevents unwanted infiltration from other program classes.
Data hiding conceals class data set components, but encapsulation conceals class data sections as well as private functions.

You must now be familiar with access specifiers to comprehend data hiding. 
The class data is typically private, whereas the functions are open. 
The data is buried to protect it from unintentional modification.

### Roles of access specifiers in encapsulation
Access specifiers are used to hide data in C++. Class members can have varying levels of accessibility based on the type of access specifier used. The three types of Access Modifiers are public Modifiers, Private Modifiers, and Protect Modifiers.

#### Private access modifiers
When a data component or member function is set private, it can be accessed and cannot be viewed by anybody outside the class. A fault is produced when accessed by an object that is not a member of the class.

#### Public access modifiers
Whereas a public access specifier is applied when creating a class, the base class's public data members change to public members of the derived class, and protected elements become protected in the derived class. Still, the base class's secret members remain hidden.

#### Protected access modifiers
A Protected Access Specifier is a type of unique access specifier. When a data function is secured, it behaves similarly to private and may be accessed by class members. It may also be accessed through any of the class's sub-classes. 

```c++
#include <iostream> 
using namespace std; 
class Example { 
    private: 
        int num; 
        
    public:
        void set(int input1) 
        { 
            num = input1; 
        } 
    int get() 
        { 
            return num; 
        } 
}; 
int main() 
{ 
    Example obj; 
    obj.set(10);
    cout << obj.get() << endl; 
    return 0; 
} 
```

In the above example, we have encapsulated the var `num` using private access specifier. We have then used the `public` access specifier to make it available from the other classes, which is the `main` class.

### Real life examples of encapsulation
1. Automated vending machine: A vending machine automatically processes customer requests, and the device itself serves the drink. In this case, the automated vending machine is the class. It comprises data (drinks) and operations (service mechanism) encased in the vending machine. This is referred to as encapsulation.
2. Washing machine: What's the purpose of the power button? It turns the machine on in all cases. But have you ever considered what happens inside the washing machine after it is turned on? That's what encapsulation is all about. The object is wrapped, and its inside features are concealed.

### Conclusion
One of the most significant properties of OOP is encapsulation. It allows us to conceal information. As a result, data is more secure and protected from unwanted usage. Encapsulation supports abstraction by offering only the appropriate interface to the end-user while hiding all other features.

### Further reading
- [Encapsulation in C++](https://www.programiz.com/cpp-programming/encapsulation#:~:text=Encapsulation%20is%20one%20of%20the,also%20helps%20in%20data%20hiding.)
- [Real Life Examples of Encapsulation](https://www.sitesbay.com/cpp/cpp-encapsulation)
- [Inheritance in C++](https://www.programiz.com/cpp-programming/inheritance#:~:text=Inheritance%20is%20one%20of%20the,additional%20features%20of%20its%20own.)
- [Abstraction](https://www.section.io/engineering-education/understanding-abstraction-in-c++/)

---
Peer Review Contributions by: [Mohamed Alghadban](/engineering-education/authors/mohamed-alghadban/)