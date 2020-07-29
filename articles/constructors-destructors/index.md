# Constructors and Destructors (C++)

![hero-image](/engineering-education/constructors-destructors/hero.jpg)
Photo by [Fabian Grohs](https://unsplash.com/@grohsfabian?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/developer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

While programming, the objects which hold certain data members and member functions have to be initialized before operating on them. It is usually done by member functions which initialize data members to predefined values. But there is a special member function in which the object initializes itself automatically when it is first constructed. This special member function is called a **constructor**. Substantially, a constructor defines a value to data members of the class. **A constructor is a special member function that is used to initialize objects of a class instantaneously when it is constructed.**

### Using and Declaring a Constructor
- A constructor is a member function which has the same name as that of the class.
- It is defined like any other member functions (both inside or outside) of the class.
- Since a constructor just defines value to a data member, there's no return type to it.
- They are called automatically when the objects are created.
- They should be declared in the public section of the class. 
- **Declaration Syntax:** Consider the class name and constructor name to be **demo**. Let **a** and **b** be two integer variables.
```
        class demo
				{
					private:
						int a,b;
					public:
						demo()
							{
						    a=1;
						    b=2;
                            }
                };
```

##### C++ program to demonstrate the use of a constructor
Consider the program to find the area of a circle. The name of the class will be **demo**. The two member functions will be declared, one for **input** and one for **output**. Since the name of the constructor should be the same as that of the class, the name of the constructor will also be **demo**. When the constructor demo is declared, the initialization of the class objects is done automatically. 
 ```  
#include <iostream>
#include<conio.h>
using namespace std;
 
class demo
{
   private:
      double radius, pi;
    public:
      void input(double r);
      double output();
      demo();  
};
 
demo::demo(void)    //constructor definition outside the class
{
    pi=3.142;
}
void demo::input(double r)
{
   radius=r;
}
double demo::output(void) 
{
   return (pi*radius*radius);
}

int main() 
{
   demo d1;
 
   d1.input(5.5); 
   cout<<"Area of the circle is : "<<d1.output()<<"sq.units"<<"\n";
   return 0;
   getch();
}
```
The output of the above program is:
```
Area of the circle is : 95.0455sq.units
```
The above program can also be written by defining the constructor inside the class. The code segment for defining the constructor inside the class is as follows:
```
class demo
{
    
   private:
      double radius, pi;
    public:
      void input(double r);
      double output();
      demo()        //constructor definition inside the class
            {
                pi=3.142;
            }
};
```
### Types of Constructors
- **Default Constructor** : *A constructor which does not have any arguments is called Default Constructor*. It is also called a ‘Zero Argument Constructor’. In a default constructor, every object in the class is initialized to the same set of values. It is not possible to initialize different objects with different initial values. This is one of the disadvantages of default constructor.
**Syntax:**
Consider a class with the name **world**. The default constructor for this class would be:
```
world :: world()   //default constructor without any arguments
```
**Note:** Any constructor with arguments is not a default constructor.
 
- **Parameterized constructor** : *To avoid the infeasibility of default constructor to accept arguments, we use parameterized constructor. A constructor which can accept one or more arguments is called a Parameterized Constructor.* It works the same way as default constructor but the difference is that it can hold arguments. They are also called automatically once the objects are created. Another attribute of parameterized constructors is that they can be overloaded.  
**Syntax:**
Consider a class with the name world. The parameterized constructor for this class would be:
```
world :: world(int a, int b)     //parameterized constructor 
                                        with arguments
```

- **Copy Constructor** : *Copy Constructor is a type of parameterized constructor in which the properties of one object can be copied to another object.* It is used to initialize an object with the values of already existing objects. Copy constructor is invoked when an existing object is passed as a parameter. 
**Note:** Copy constructors cannot be invoked explicitly.
**Syntax:** 
Consider a class with the name **world**. The copy constructor for this class would be:
```
world :: world(world &ptr)        //copy constructor
```
Where, ptr is the pointer to the class object.  

### Invoking(Calling) Constructors
**1. Explicit Call**
Explicit call is a method of invoking constructors in which the declaration of an object is done by using **assignment operator(=)**, constructor name followed by argument list.
**Syntax:**
```
constructor_name object_name=constructor_name(argument list);
```
##### C++ program to demonstrate the use of explicit call
Consider the program to calculate the area of the circle. The name of the class and constructor will be **demo**. The constructor will be parameterized by taking one argument. Here, **d1** acts as the object which transfers the value **5.5** explicitly to the constructor.
```
#include <iostream>
#include<conio.h>
using namespace std;
 
class demo
{
   		private:
      			double radius, area;
    		public:
      	   		demo(double r)
   		{
    			radius=r;
   		} 
   		void output()
   		{
    			area=3.142*radius*radius;
			cout<<"The area of the circle is: "<<area<<"sq.units"<<"\n";
   		}
};
 
int main() 
{
   		demo d1=demo(5.5);
   		d1.output();
  		return 0;
  		getch();
}
```
The output of the above program will be:
```
The area of the circle is: 95.0455sq.units
```
**2. Implicit Call**
Implicit call is a method of invoking constructors in which the declaration of an object is done and is then followed by an argument list.
**Syntax:**
```
constructor_name object_name(argument list);
```
##### C++ program to demonstrate the use of implicit call
Consider the program to calculate the area of the circle. The name of the class and constructor will be **demo**. The constructor will be parameterized by taking one argument. Here, **d1** acts as the object which transfers the value **5.5** implicitly to the constructor. 
```
#include <iostream>
#include<conio.h>
using namespace std;
 
class demo
{
   		private:
      			double radius, area;
    		public:
      	   		demo(double r)
   		{
    			radius=r;
   		} 
   		void output()
   		{
    			area=3.142*radius*radius;
			cout<<"The area of the circle is: "<<area<<"sq.units"<<"\n";
   		}
};
 
int main() 
{
   		demo d1(5.5);
   		d1.output();
  		return 0;
  		getch();
}
```
The output of the above program will be:
```
The area of the circle is: 95.0455sq.units
```
**Note:** For different values, different objects have to be initialized in the main function.

### Constructor Overloading
We know that constructors are used for initializing data members of the class. They can also be used for initializing specific input values to the data members. But this cannot be done by using default constructors, since they do not take any arguments. So, for this to happen the default constructors have to be overloaded i.e they should be initialized with additional arguments. The object initialization has to be done by keeping the number of arguments in mind. The compiler then decides which constructor to invoke depending on the argument list. Look at this simple segment. Consider the class name and constructor name to be **demo.**
```
	class demo
{
    private:
	       ... data members of the class... 
    public:
       		demo()                 //default constructor
            { }                         
            demo(argument list)   //parameterized constructor
       	    {
            ...operations on the variables...
       	    }
};
```
Consider **d1** and **d2** to be the objects. When the object **d1** is created, default constructor is invoked and when the object **d2** is created with some arguments, parameterized constructor is invoked.
```
int main() 
{
   		demo d1(), d2(argument list)
  		return 0;
  		getch();
}
```
### Destructors                                                    
As mentioned in the introduction, constructor is a special member function which is instantaneously called whenever an object is created. Likewise, **a destructor is a type of function which is instantaneously called whenever an object is destroyed.** By doing so, it deallocates the values initialized to a variable and also its memory. They have no return value. They do not take any arguments and so they cannot be overloaded. It has the same name as the class (like a constructor) but is preceded by **tilde mark**(symbolized as ~). Look at the following code snippet to see how a destructor works.
```
	class demo
{
			private:
				int a,b,c;
			public:
				demo();         //constructor
				~demo();       //destructor
};
```

### Additional Resources
[C++ Class Constructor and Destructor](https://www.tutorialspoint.com/cplusplus/cpp_constructor_destructor.htm)
[Difference between Constructor and Destructor in C++](https://www.geeksforgeeks.org/difference-between-constructor-and-destructor-in-c/)