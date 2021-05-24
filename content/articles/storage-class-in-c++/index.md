### Introduction
Each variable has a data type when defined in C++ to help the user understand what type of variable it is. Since we were using the default Storage classes, we didn't identify any storage classes yet. When defining a variable, the compiler assigns a storage class by default.  In C++, storage classes are used to describe the characteristics of a variable and functions. It specifies the scope, lifetime and visibility of variables and functions. These characteristics enable us to track the presence of a variable over the course of a program's execution. In this article, we will look at various storage classes along with code examples that show how they work.

### Prerequisites
To follow through this article, the reader should have:
- A [Codeblocks IDE]() installed.
- An understanding of the C++.

### What is lifetime and visibility?
The term "lifetime" refers to the length of time a variable is active, while "visibility" refers to which parts of code a variable can access depending on the visibility level set. 

### Types of Storage class
In the C++ programming language, there are usually five types of storage classes:

1. Automatic
2. Register
3. Static
4. External
5. Mutable

The following syntax is used to define the storage class for a variable:
Syntax:
```c++
storage_class var_data_type var_name;
```
We can break down the code as shown below:
- storage_class – It is used to specify the storage class to be used.
- var_data_type – It is used to specify the variable’s data type.
- var_name – It is used to specify the variable name.
Let's take a look at how they're all explained with simple examples:

1. **Automatic**
It is the default storage class for all local variables. These local variables are declared inside a function or block. The auto keyword is rarely used in writing program’s. Auto variables can only be accessed within the function or block where they were declared, and they can't be accessed outside of that function or block. They can also be accessed within nested blocks, parent block/function in which the auto variable was declared. To access auto variables outside their scope we use a pointer variable. 

We are required to point to the same memory location where the variables are occupying. Its lifespan is the same as the function's lifetime. When a function's execution is complete, the variable is destroyed. When they are declared, they are given a garbage value by default.

Syntax:
```c++
datatype var_name1 [= value]; // by default if you don’t use auto keyword
```
or
```
auto datatype var_name1 [= value];
```
Example to demonstrate Auto storage class
```c++
#include <iostream>
using namespace std;

void autoStorageClass()
{

  cout << "Demonstration of auto storage class\n";

  // Declare an auto variable
  // We do not need data-type declaratiion
  auto a = 50;
  auto b = 5.2;
  auto c = "AutoStorageClass";
  auto d = 'A';

  // Displaying the auto variables
  cout << a << " \n";
  cout << b << " \n";
  cout << c << " \n";
  cout << d << " \n";
}

int main()
{

  // Demonstrating auto Storage Class
  autoStorageClass();

  return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Auto-storage-class#main.cpp).

Output:
```bash
Demonstration of auto storage class
50
5.2
A
```

2. **Register**
We use the register storage class to declare register variables. The register variable has the same functionality as the auto variable, except that the compiler attempts to store these variables in the microprocessor's register if one is available. If no free registers are available, these are stored solely in memory. This makes operations on register variables much faster than that of other variables stored in memory during runtime. 

To increase the program's run-time, a few variables that need to be accessed regularly in a program are usually declared within the register storage class. Pointers cannot be used to find the address of a register variable. The variable's maximum size is equal to the register's maximum size. We cannot use the ‘&’ operator because it does not have a memory location.

Syntax:
```c++
register datatype var_name1 [= value];
```
Example to demonstrate Register storage class:
```c++
#include <iostream>
using namespace std;

void registerStorageClass()
{

  cout << "Demonstration of register storage class\n";

  // declaration of a register variable
  register char b = 'G';

  //displaying the register variable
  cout << "Value of 'b'"
    << " declared as register: " << b;
}
int main()
{

  // To demonstrate register Storage Class
  registerStorageClass();
  return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Register-storage-class).

Output:
```bash
Demonstration of register storage class
Value of b declared as register: G
```
3. **Static**
This storage class is used to declare static variables. The static variables preserve their value even when they are out of their scope. They are initialized once and exist till the program is terminated. The memory for the static variable is allocated only once, and no new memory is allocated because they are not re-declared. 

Anywhere in the code, we can access global static variables. The compiler assigns the value 0 to them by default. When we use static on a class data member in C++, we cause only one copy of that member to be shared by all objects of its class.

Syntax:
```c++
static datatype var_name1 [= value];
```
Example to demonstrate Static storage class:
```c++
#include <iostream>
using namespace std;

// Function that contains static variables
// memory is retained during execution
int staticFun()
{
  cout << "For static variables: ";
  static int count = 0;
  count++;
  return count;
}

// Function containing non-static variables
// memory is destroyed
int nonStaticFun()
{
  cout << "For Non-Static variables: ";

  int count = 0;
  count++;
  return count;
}

int main()
{

  // Calling the static variables parts
  cout << staticFun() << "\n";
  cout << staticFun() << "\n";
  ;

  // Calling the non-static variables parts

  cout << nonStaticFun() << "\n";
  ;
  cout << nonStaticFun() << "\n";
  ;
  return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Static-storage-class#main.cpp).
Output:
```bash
For static variables: 1
For static variables: 2
For Non-Static variables: 1
For Non-Static variables: 1
```
4. **External**
We require this storage class when we want the variables to be shared across multiple files. Extern variables have a global scope and are visible outside the file in which we have declared them. It is also visible to all programs and is used if two or more files are sharing the same variable or function. 
The extern variables have the same lifetime as the program in which they were declared. A regular global variable may also be rendered extern by using the ‘extern' keyword before its declaration or description in any function or block.
When you use ‘extern,' the variable cannot be initialized because all it does is point the variable name to a previously specified storage location.
Syntax:
```c++
extern datatype var_name1;
```
Example to demonstrate Static storage class:
```c++
#include <iostream>
using namespace std;

// Declaring the variable which is to
// be made extern an initial value can
// also be initialized to m
int m;
void externStorageClass()
{

  cout << "Demonstration of extern class\n";

  // Telling the compiler that the variable
  // m is an extern variable. It has been
  // defined elsewhere (above the main
  // function)
  extern int m;

  // displaying the extern variables
  cout << "Value of 'm' "
    << "declared, as extern: " << m << "\n";

  // value of 'm' modified
  m = 5;

  // displaying the modified values of
  // extern variables
  cout
    << "Modified value of 'm'"
    << " declared as extern: \n"
    << m;
}

int main()
{

  // Demonstration of extern Storage Class
  externStorageClass();

  return 0;
}

```
Go ahead and run the code [here](https://replit.com/@Dawe7/Extern-storage-class#main.cpp).
Output:
```bash
Demonstration of extern class
Value of ‘m’ declared as extern: 0
Modified value of ‘m’ declared as extern: 5
```
5. **Mutable**
Only class objects have the mutable specifier, which enables a member of an object to override a const member function. That is, a const member function can modify a mutable member. Even if you don't want the function to update other members of the class/struct, you can need to change one or more data members of the class/struct using the const function. The mutable keyword makes this task simple to complete.

Syntax:
```c++

```
Example to demonstrate Static storage class:
```c++
#include <iostream>
using std::cout;

class Test {
public:
  int m;

  // Defining mutable variable n
  // which can be modified
  mutable int n;

  Test()
  {
    m = 5;
    n = 20;
  }
};

int main()
{
  // Our t1 is set to constant
  const Test t1;

  // We are trying to change the value
  t1.n = 50;
  cout << t1.n;

  // Not commenting below the lines
  // will throw errors
  // t1.m = 8;
  // cout << t1.m;
  return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Mutable-storage-class#main.cpp).
Output:
```bash
50
```
### Conclusion
You should now understand what different storage classes in C++ are and how to implement them after going through the above C++ programs. I hope you find this blog to be useful and insightful.

Happy coding!

