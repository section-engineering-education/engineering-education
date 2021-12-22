---
layout: engineering-education
status: publish
published: true
url: /understanding-abstraction-in-c++/
title: Understanding Abstraction in C++
description: This article will go through an introduction to abstraction along with types and how data abstraction is achieved in C++. Abstraction is the act of representing essential features without including the background details.
author: dawe-daniel
date: 2021-05-26T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-abstraction-in-c++/hero.jpg
    alt: C++ Abstraction Image Example
---
Abstraction is the act of representing [essential features without including the background details](https://askoranswerme.com/69513). `Data abstraction` involves giving the outside environment only the key facts about the data while hiding the background specifics or explanations. In C++, classes provide a great level of data abstraction. 
<!--more-->
### Introduction
They expose enough public methods to the outside environment to allow users to experiment with the object's functionality and manipulate its data. 

For instance, a state without recognizing how the class is implemented internally. The `pow()` function, for example, is used to measure the power of a number without understanding the algorithm it uses. 

In reality, the sorting functions underlying functionality can change between library releases. Your function call will still operate so long as the interface remains the same. 

This article will go through an introduction to abstraction along with types and how data abstraction is achieved in C++.

### Prerequisites
To follow this article, you’ll need to have:
- [Codeblocks IDE](http://www.codeblocks.org/downloads) to run the code.
- A basic understanding of the C++ language.

There are two types of abstraction in the C++ language namely:
1. Control abstraction - The details of abstraction implementation will always be hidden under control and will not be visible.
2. Data abstraction - The details about the data in the program is always concealed in data abstraction.

For the implementation of our very own Abstract data types, we may use classes. For streaming the data, we use the cout object which is of the`output stream class`. 

We can use the permission labels/access specifiers (protected, private, and public) to hide or make them public. By declaring data members as either private or protected, we prevent access to it from outside the program.

#### Strategy designing
Abstraction splits code into implementation and interface. When designing, keep the interface independent of the implementation [so that even though the underlying implementation changes, the interface stays unchanged](https://sceweb.sce.uhcl.edu/helm/WEBPAGE-Cpp/my_files/ObjectOriented/Module-5/module5page.html).

### Examples of Abstraction in C++
We can look at how to promote data abstraction in the C++ programming language using classes, header files, and specifiers below:

#### Example 1
Using classes, we can achieve data abstraction in C++. The Class allows one to group the data members and member functions using the permission labels available. A class will determine the data member that is accessible outside the class and that will not be.

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

In the program above, we have declared the class `circle`. In this class, we have created a variable `radius` that will store the value of the radius acquired from the user. Afterward, we have declared two functions `area` and `circumference` in the public part of the class. 

Finally, in the main function, we created our object c, which belongs to the `circle` class. We used this object to call the area and circumference function to display the area and circumference of the circle.

#### Example 2
In C++, header files could be another form of abstraction. For instance, consider the `pow()` method present in the header file of `math.h`. 

We basically use the `pow()` function from the `math.h` header file. Then we transfer the numbers as arguments. We calculate the power of a number without understanding the algorithm that underpins it.

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

In the program above, we have used a header file `math.h` to include the predefined math functions provided by the c++ language in our code. 

In our program, we have three integer variables: `x`, `power`, and `result`. Afterward, we have used `std::cout` to calculate the square of the given digit and store it in the integer result which we had declared.

#### Example 3
The core principle of implementing abstraction in C++ is permission labels that determine how the data is accessed in a program. To impose restrictions on data members of a class, we can use permission labels as follows:
- Public - Data members and member functions declared as public [can be accessed from anywhere the class is visible](http://belkiss.versatecnologia.com.br/wp-content/uploads/qd7k7g/access-specifiers-in-c++-d4f7b8).
- Private - Data members and member functions declared as private [can only be accessed within the class](https://www.geeksforgeeks.org/access-modifiers-in-c). Outside of the class, they are inaccessible.
- Protected – Data members and member functions [can be accessed by their friend class and derived class only](https://www.mygreatlearning.com/blog/class-in-c).

Using the aspects above given by permission labels, we can implement abstraction. Say, in a class, the members who determine the internal implementation can be classified as private. 

And it is possible to mark the essential details necessary to be provided to the outside world as public. These public members have access to the private members since they are members of the class.

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

Output:

```bash
Sum =  95
```

In the program above, you can see that we are not allowed to directly access the variables `x` and `y`. But you can call the `set()` function to set the values `x` and `y`. The `display()` function is called to display the values `x` and `y`.

### Advantages of data abstraction
- It prevents the user from writing low-level code.
- It prevents duplication of software and increases reusability.
- The internal class implementation can be altered without impacting the user.
- It helps to improve the privacy of an application or program as the user is only presented with relevant information.

### Conclusion
The principle of data abstraction, allows developers to provide only important data. Averting access to the background details of the data. It is used in the approach that relies on the isolation of the code's implementation and interface. I trust you found the article intuitive and of great aid to your future programs.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
