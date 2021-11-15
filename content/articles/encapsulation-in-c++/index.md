### Encapsulation in C++

#### Introduction to Encapsulation
Encapsulation is the method of grouping data and features into a single part. These parts are known as a **class**. It is done to protect straightforward access to the data; instead, the data is accessed via the class's features. One of the most well-known features of **Object-Oriented Programming (OOPs)** is data concealing.
Through the construction of user-limited categories, known as classes, **C++** supports the qualities of encapsulation and data hiding. Encapsulation can be accomplished in two ways.
The following are the details:
Construct public set and set functions for every data component, with the set function setting the data participant's variable and the get function retrieving the data participant's result.
Making all users of the information private.

#### Types of Encapsulation
In OOP, there are three forms of encapsulation as shown below.
* Class encapsulation
* Function encapsulation
* Member variable encapsulation

As the title suggests, all data members are made private under member variable encapsulation. Setters and Getters functions are to be used by any object that wants to change or obtain the value of a data member. Contrarily, some of the functions and constructors in function encapsulation are declared private. The entire class is designated as private in Class Encapsulation.

#### How Encapsulation is Implemented
Encapsulation is implemented in C++ as a class that encapsulates data and the methods that operate on it. Data is typically designated as private so that it cannot be accessed outside of the class. The public functions are defined and may be retrieved by the use of the class's objects.
However, we are unable to openly access private members' data, which is referred to as "data hiding." Data is protected and can be viewed by functions of the class where it is defined when this is performed.
Below is how it is performed.
```#include <iostream>
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
The `goals` attribute is private, which have restricted access.

The `public` `setGoals()` method takes a parameter `(g)` and assigns it to the `goals` attribute `(goals = g)`.

The `public getGoals()` method returns the value of the private goals attribute.

Inside `main()`, we create an object of the `Player` class. Now we can use the `setGoals()` method to set the value of the private attribute to **10**. Then we call the `getGoals()` method on the object to return the value.



### Encapsulation and Abstraction

**Data Abstraction** is a process by which the programmer decides what data will be shown in public; nevertheless, the practical execution of the Abstraction is nothing more than Encapsulation, which is accomplished through the use of access modifiers. 
You may argue that Encapsulation is the Abstraction's implementation.

#### Difference between Abstraction and Encapsulation
* Abstraction itself is a process that involves obtaining information while Encapsulation on the other side involves methods of containing Information.
* Abstraction is a technique for masking undesired data and revealing useful information. Encapsulation, on the other hand, is the process of combining code and data into a unified unit in order to safeguard data from external view.
* Encapsulation involves masking the internal details or mechanics of how an object does something, whereas abstraction allows you to concentrate on what the item does rather than how it does it.
* Abstraction is achieved by the use of abstract classes and interfaces, while Encapsulation on the other hand, is implemented by the use of access modifiers (Public, Protected, and Private).

#### Encapsulation vs Inheritance 
Encapsulation links code to the data it distorts, while inheritance allows a class to inherit the attributes and functions of another class. Encapsulation is exemplified by an ATM that binds together several denominations of bank notes as well as all of the activities necessary to withdraw money. Inheritance may be seen in the classification of vehicles as cars, bikes, buses, trucks, and so on.
Inheritance means that a subclass gets all of its primary class's characteristics and functions. On the other hand, encapsulation states that one class should not have access to another class's private data.


#### Why Encapsulation

Encapsulation is essential to hold the information about an item hidden from the customers of that item.
Details of an item are saved in its records individuals. 
This is the motive we make all of the member variables of a category personal and maximum of the member capabilities public. 
Member variables are made personal so that those can't be at once accessed from out of doors the magnificence (to cover the info of any item of that magnificence like how the records approximately the item is implemented) and so maximum member capabilities are made public to permit the customers to get entry to the records individuals via the one's capabilities.
For example, in an electric kettle, when it is turned on and water in it reaches the boiling point it turns off automatically. We don't know the mechanism behind the kettle turning off which happens inside it and that is encapsulation.

### The Roles of Encapsulation
* Encapsulation in C++ aids in grouping together relevant parts into a unified class, keeping the code clearer and easier to comprehend.
* The user has read and write access to the get() and set() methods. It results in the safekeeping of data.
* The data packaging facilitates growth in general. These packages can be independently tested, debugged, and run without impacting the other elements.
* Data concealing is an excellent approach to keep your data safe from unwanted reach. Therefore, the code's security is enhanced much further.

#### Data Hiding in relation to Encapsulation

The technique of merging data and operations into a unified piece is known as **data hiding**. 
Data hiding is based on the idea of concealing data inside a class in order to restrict straight accessibility from beyond the class. 
It aids programmers in the creation of classes with distinct data sets and functionalities, preventing unwanted infiltration from other program classes.
When it comes to data hiding vs. data encapsulation, data hiding just conceals class data set components, but encapsulation conceals class data sections as well as private functions.
You must now be familiar with access specifiers to comprehend data hiding. 
The data of a class is typically private, whereas the functions are open. 
The data is buried to protect it from unintentional modification.

### Roles of Access Specifiers in Encapsulation

Access modifiers, also referred as **Access specifiers**, are used in C++ to hide data. Class members  can have varied levels of accessibility based on the type of access specifier used. The three types of Access Modifiers namely public Modifiers, Private Modifiers and Protect Modifiers.

#### Private Access Modifiers

When a data component or member function is set private, it can at most be accessible within the class and cannot be viewed by anybody outside the class. When accessed by an object that is not a member of the class, a fault is produced.

#### Public Access Modifiers 

Whereas a public access specifier is applied when creating a class, the base class's public data members change to public members of the derived class, and protected elements become protected in the derived class, but the base class's secret members remain hidden.

#### Protected Access Modifiers

A Protected Access Specifier is a type of access specifier that is unique. When a data function is secured, it behaves similarly to private and may be accessed by class members. It may also be accessible through any of the class's sub-classes. 

```
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

In the above example, we have encapsulated the var `num` using the access specifier private. We have then used the `public` access specifier to make it available from the other classes which in this case is the `main` class.

#### Conclusion
One of the most significant properties of OOP is encapsulation. It allows us to conceal information. As a result, data is more secure and protected from unwanted usage. Encapsulation supports abstraction by allowing us to offer only the appropriate interface to the end-user while hiding all other features.

#### Summary
In the article, the learner has learned the following:
1. Introduced Encapsulation.
2. Differentiated Encapsulation from Abstraction.
3. Roles of Encapsulation.
4. Roles of Access specifiers in Encapsulation.
