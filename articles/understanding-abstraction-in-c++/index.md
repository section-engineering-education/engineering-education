### Introduction
`Abstraction` is the act of representing essential features without including the background details.  `Data abstraction` refers to providing only essential information about the data to the outside world. And hiding the background details or explanations. In C++, classes provide a great level of data abstraction. They provide enough public methods to the outside world to play with the functionality of the object and to manipulate object data. For example, a state without actually knowing how the class has been implemented internally. For example, the `pow()` function is used to calculate the power of a number without knowing the algorithm the function follows. In fact, the underlying implementation of the sorting functionality could change between releases of the library. And as long as the interface stays the same, your function call will still work. This article will go through an introduction to abstraction along with types and how data abstraction is achieved in C++.

### Prerequisites
To follow this article, you’ll need to have:
- A [Codeblocks IDE]() to run the code.
- A basic understanding of the C++ language.

There are two types of abstraction in the C++ language namely:
- Control abstraction
The details of abstraction implementation will always be hidden under control and will not be visible.
- Data abstraction
The information about the data in the code will always be concealed in data abstraction.

We can use classes for the implementation of our own Abstract data type. For streaming the data, we use the cout object of the output stream class. We can use the permission labels/access specifiers (protected, private, and public) to hide them.  By declaring data members as either private or protected to prevent access from outside the program.
 
**Strategy designing**
Abstraction splits code into implementation and interface. But you'll have to keep the interface independent of the implementation when designing the part. So that if you change the underlying implementation, the interface will remain intact.

### Examples of Abstraction in C++
Here, we can see how, through classes, header files, and specifiers, we can achieve data abstraction in C++ programming.

#### Example 1
Using classes, we can implement Abstraction in C++. The Class allows one to group the data members and member functions using the permission labels available. A class will determine which data member will be accessible to the outside world and which is not.

Program to illustrate data abstraction using classes:
```c++
#include <iostream>
#define PI 3.142

using namespace std;
// declaring class
class circle 
{
private :
float radius; // private variables radius
public :
// function to get value of radius from the user
void get_radius(void) 
{
cout<<"Enter radius of circle"<<endl;
cin>>radius;
}
// declaring function to calculate area of the circle
float area(void)
{
return(PI*radius*radius);
}
// declaring function to calculate circumference of the circle
float circumference(void)
{
return(PI*2*radius);
}
};
//implementation of the class
int main ()
{
// creating object of declared class
circle c; 
c.get_radius();
cout << " AREA = " << c.area() << endl ;
cout << " CIRCUMFERENCE = " << c.circumference() << endl ;
return 0 ;
}
```
Output:
```bash
 AREA  =  50.272
 CIRCUMFERENCE  = 25.136
```
In the above program,  we have declared the class `circle`. In this class, we have created a variable `radius` that will store the value of the radius acquired from the user. Afterward, we have declared two functions `area` and `circumference` in the public part of the class. Finally, in the main function, we created an object of the class `circle` called `c`. we used this object to call the area and circumference function to display the area and circumference of the circle.

#### Example 2
Header files could well be one more type of abstraction in C++. For instance, consider the `pow()` method present in the header file of `math.h`. We simply call the function `pow()` present in the `math.h` header file. Then we transfer the numbers as arguments. We calculate the power of a number without understanding the underlying algorithm according to which it works.

Program to illustrate data abstraction using header files:
```c++
#include <iostream>
#include <math.h>

using namespace std ;
int main ()
{
int a = 5 ;
int power = 2 ;
int result = pow ( a , power ) ;// pow(n,power) is the power function to calculate power
cout << " Square of a = " << result << std::endl ;
return 0 ;
}
```

Output:
```bash
The square of a is : 25
```
In the program above, we have used a header file `math.h` to include the predefined math functions provided by the c++ language in our code. We have created three integer variables `x`, `power`, and `result` in our program. Afterward, we have used std::cout to calculate the square of the given digit and store it in the integer result which we had declared.

#### Example 3
The core principle of implementing abstraction in C++ is permission labels which determine how the data is accessed in a program. To impose restrictions on class members, we can use permission labels as follows:

- Public - Data members and member functions declared as public can be accessed from anywhere the class is visible.
- Private -  Data members and member functions declared as private can only be accessed within the class. They are not possible to be accessed from outside the class.
- Protected – Data members and member functions can be accessed by their friend class and derived class only.

Using the above aspects given by permission labels, we can implement abstraction. Say, in a class, the members who determine the internal implementation can be classified as private. And it is possible to mark the essential details necessary to be provided to the outside world as public. And since they are within the class, these public members can access the private members.

Program to illustrate abstraction using permission labels:
```c++
#include <iostream> 
using namespace std; 

class abstraction 
{ 
  private: 
    int x, y; 

  public: 
  
    // method to set values of 
    // private members 
    void set(int m, int n) 
    { 
      x = m; 
      y = n; 
    } 
    
    void display() 
    { 
      cout<<"x = " <<x << endl; 
      cout<<"y = " << y << endl; 
    } 
}; 

int main() 
{ 
  abstraction sp; 
  sp.set(20, 30); 
  sp.display(); 
  return 0; 
} 
```
Go ahead run the code [here]()
Output:
```bash
Sum =  95
```
In the above program, you can see that we are not allowed to directly access the variables `x` and `y`. But you can call the `set()` function to set the values `x` and `y`. The `display()` function is called to display the values `x` and `y`.

### Advantages of data abstraction
- It prevents the user avoid writing low-level code.
- It prevents duplication of software and increases reusability.
- The internal class implementation can be altered without impacting the user. 
- It helps to improve the privacy of an application or program as the user is only presented with relevant information.

### Conclusion 
The principle of data abstraction, allows developers to provide only important data. Preventing access to the background details of the data. It is used in the approach that relies on the isolation of the code's implementation and interface. I hope you found this article insightful and helpful to your future programs.

Happy coding!