### Introduction

C++ provides a constructor, which is a special member function that initializes the objects of its class. They are said to be special because its name is the same as the class name. Constructors are invoked every time an instance of its class is created. Constructors automate the destroying of allocated variables therefore the programmer doesn’t have to create a function call to destroy them.

#### Prerequisites
To follow  this article, you’ll need:
- Basic understanding of C++ language
- Basic understanding of C++ functions
- [Codeblocks](http://www.codeblocks.org/downloads) IDE to run the code.

### What we’ll go through:
1. [ Syntax of constructor functions](#syntax-of-constructor-functons:)
2. [Characteristics of constructor functions](#characteristics-of-constructor-functions)
3. [Types of Constructors](#types-of-constructors)

Syntax of constructor functions
```c++
class integer
{
int a , b;
public:
integer(void); // constructor declaration
……….
};

integer:: integer(void) // constructor definition
{
a=2;
b=2;
}
```
When we created the constructor above, we are assured that the object we create in our program will be automatically initialized. For example, the declaration;

`integer v1;     // v1 is our object`

automatically initialize our object v1 with the data members `a` and `b` to two. With normal member functions, we would be required to write a Y statement to invoke the constructor function and for each of the objects separately. So if we had a large number of objects it would cause us a lot of difficulty and inconvenience.

#### Characteristics of constructor functions.
- Constructors are invoked automatically when we create objects.
- Constructors should be declared in the public section of the Class.
- Constructors cannot return values to the calling program because they do not have return types.
- Constructors should always be non-virtual. They are static functions and in C++ they cannot be virtual.     
- Constructors cannot be inherited because they are called when objects of the class are created therefore it is not realistic to create a base class object using the derived class constructor function.
- we cannot refer to the addresses of constructors because we only require the address of a function to call it and they can never be called directly. Also, the language does not permit it.

**NOTE:** Whenever a Constructor is declared, initialization of the class objects becomes imperative.

#### Types of constructors

1. **Default constructors**
They are constructors that do not pass or accept any parameters. The default constructor for a class C is C::C(). The compiler supplies a default constructor for instances where it is not defined.
Therefore a statement such as :
`integer v1`
invokes the default constructor of the compiler to create the object v1.

 **Example of default constructor**
```c++
// c++ program to illustrate the concept of constructors

// C++ program to illustrate the
// concept of Constructors

#include <iostream>
using namespace std;

class integer
{
public:
int x, y;

// Default Constructor declared
integer()
{
x = 45;
y = 10;
}
};

int main()
{
// Default constructor called automatically
// when the object is created
integer a;
cout << "x: " << a.x << endl
<< "y: " << a.y;
return 0;
}
```
In our program above, the compiler will automatically provide a default constructor implicitly. Hence our program output will be:

x=45
y=10

 2. **Parameterized constructors**

In practice, we may be required to initialize the data elements of different objects with different values. C++ enables us to accomplish this by the use of parameterized constructors which can take parameters when the objects are created

In the program below we are going to illustrate how our constructor integer() will be

```c++
// C++ program to illustrate
// parameterized constructors

#include <iostream>

using namespace std;

class integer 
{
private:
int a, b;
public:
// Parameterized Constructor
integer(int x, int y)
{
a = x;
b = y;
}
int getX()
{
return a;
}
int getY()
{
return b;
}
};
int main()
{

integer v(10, 15); // Constructor called

cout << "a = " << v.getX() ; // values assigned by constructor accessed
cout<< "b = " << v.getY();	

return 0;
}
```
Initial values have to be passed to the object in parameterized constructors and the normal declaration of a statement will not work. We can pass the initial values as arguments by either calling the constructor implicitly or explicitly. 
For example our declaration above, we have declared implicitly as:
	
	integer v(10,15);  // implicit call

This statement passes the values 10 and 15 to our integer object v. we can also pass our values explicitly as follows:

	integer v=integer(10,15); // Explicit call

However, the first method is preferred to the second because it is shorter and easier to apply.

**NOTE:** The arguments of a constructor function cannot be the type of the class to which it belongs to. For instance:

 ```c++
class v
 public:
 v(v);
 };     //is illegal.
 ```

3 **Copy constructors**

When we discussed parameterized constructors, at our last point we stated that the parameters of a constructor function cannot be the type of the class to which it belongs. However, constructors can accept a reference to its class as a parameter. Copy constructors initialize an object using another object which is of the same class.

In C++, copy constructors are called using the cases below:

1. Whenever objects of the class are returned by value.
2. Whenever objects are constructed based on another object which is of the same class.
3. Whenever objects are passed as parameters.

We are required to define our copy constructor functions particularly if an object has runtime allocation of resources or pointers. 

**Example of a copy constructor**
```c++
// C++ program to illustrate
// copy constructor

class integer
{
	int a ,b;
public:
	integer (integer & v) // copy constructor declared
 {
 a=v.a; 
 b=v.b;
}
};
```
**Multiple constructors**

C++ allows us to use the three constructor functions we have discussed in the same class.
For example:
```c++
class complex
{
int a, b;
public:
complex() // default constructor
{
a= 10;
b=45;
}
complex( int x, int y) // parameterized constructor
{
a=x;
b=y;
}
complex( complex & v)	// copy constructor
{
a=v.a;
b=v.b;
}
};
```
- The first constructor function has no values passed by the calling program therefore the constructor assigns itself the data values.
- The second constructor function has parameters in which the function call passes the appropriate values from the main function.
- The third constructor function receives objects as arguments. Copy constructors set the values of the first data element to the value of the corresponding.

**Constructor overloading**

This is whereby more than one constructor function is defined in a class. Overloaded constructors have the same name as the class but with a different number of arguments. They are based on the number and type of parameters passed to the calling function. The compiler will know which constructor requires to be called depending on the arguments passed when the object is created.
```c++
// C++ program to illustrate 
// Constructor overloading 

#include <iostream> 

using namespace std; 

class shape
{ 
int a, b;
public: 
// Constructor with no argument
shape() 
{ 
a= 2;
b= 3; 
} 
// constructor with one argument
shape(int x) 
{ 
a=b=x;
}
// Constructor with two arguments
shape(int x, int y) 
{ 
a= x;
b= y; 
} 
int area(void){
return(a*b);
}
void display() 
{ 
cout<<"area="<< area() <<endl; 
} 
}; 
int main() 
{ 
// Constructor Overloading 
// with two different constructors 
// of class name 
shape s;
shape s2(6);
shape s3( 3, 2); 

s.display(); 
s.display();
s.display();
return 0; 
} 
```
#### Conclusion
In this article, we have gone through the basics of constructor functions and constructor overloading. A constructor is required so that when we create an instance of a class (object) all the functions and variables exist in memory. This allows you to use the class by name alongside all the variables and functions. You’ll notice that they are vital and C++ is meaningless without them.
