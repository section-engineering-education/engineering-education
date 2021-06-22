### Introduction
Each variable has a data type when defined in C++ to help the user understand what type of variable it is. Since we were using the default Storage classes, we didn't identify any storage classes yet. When defining a variable, the compiler assigns a storage class by default. We use storage classes in C++ to express the variables and methods characteristics. It also specifies the [scope, lifetime, and visibility of variables and functions](https://www.opensourceforu.com/2011/10/joy-of-programming-scope-lifetime-and-visibility-in-c). These characteristics enable us to track the presence of a variable over the course of a program's execution. This article will look at various storage classes and code examples that show how they work.

### Prerequisites
To follow through this article, the reader should have:
- A [Codeblocks IDE](https://www.codeblocks.org/downloads/) installed.
- An understanding of the C++ language.

### What is lifetime and visibility?
The length of time a variable is active is referred to as its lifetime. Visibility refers to which parts of code a variable can access depending on the visibility level set.

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
It is the default storage class for all local variables. These [local variables are declared inside a function or block](https://www.tutorialspoint.com/cprogramming/c_scope_rules.html). When writing programs, the auto keyword is hardly used. Auto variables can only be accessed [within the function or block where they were declared](https://simple2code.com/cplusplus-tutorial/cpp-storage-classes-with-examples). They can't be accessed outside of that function or block. We can also access them within nested blocks, as well as the parent block where the declaration of the auto variable is. A pointer variable is used to [access auto variables outside their scope](https://www.edureka.co/blog/cpp-storage-classes).

We are required to point to the same region in memory where the variables are stored. Its lifespan is the same as the function's lifetime. When a function's execution is complete, the variable is destroyed. By default, they are given a garbage value whenever declared.

Syntax:
```c++
datatype var_name1 [= value]; // by default if you don’t use auto keyword
```
or
```
auto datatype var_name1 [= value];
```
Example to show Auto storage class
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
To declare register variables, we use the register storage class. The register variable functions similarly to the auto variable, with the exception that [the compiler tries to store these variables in the microprocessor's register if one is available](https://mu.ac.in/wp-content/uploads/2021/01/Imperative-Programming-1.pdf). If no free registers are available, these are stored solely in memory. This makes operations on register variables much faster than that of other variables stored in memory during runtime. 

A few variables that need to be accessed regularly in a program are usually declared within the register storage class. This is to increase the program's run-time.  A register variable's address cannot be found via pointers. The variable's largest size is equal to the register's largest size. We cannot use the ‘&’ operator because there is no memory location for it.

Syntax:
```c++
register datatype var_name1 [= value];
```
Example to show Register storage class:
```c++
#include <iostream>
using namespace std;

void registerStorageClass()
{

	cout << "Demonstration of register storage class\n";

	// declaration of a register variable
	register char c = 'G';

	//Lets dispkay the register variable
	cout << "Value of 'c' which is"
		<< " declared as register: " << c;
}
int main()
{

	// Demonstrating the Storage Class
	registerStorageClass();
	return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/Register-storage-class).

Output:
```bash
Demonstration of register storage class
Value of c which is declared as register: G
```
3. **Static**
Static variables are declared using this storage class. Static variables keep their [value even when they are outside of their scope](https://www.edureka.co/blog/cpp-storage-classes). They are initialized once and exist till the program is terminated. The memory for the static variable is only allocated once, and no more memory is allocated because it is not re-declared.

Anywhere in the code, we can access global static variables. The compiler assigns the value 0 to them by default. In C++, when we use static on a class data member, only one [copy of that member is shared by all objects in that class](https://www.programmersought.com/article/1402752485).
Syntax:
```c++
static datatype var_name1 [= value];
```
Example to show Static storage class:
```c++
#include <iostream>
using namespace std;

// Function that contains static variables
// memory is retained during execution
int staticFun()
{
	cout << "Static variables: ";
	static int count = 0;
	count++;
	return count;
}

// Function that contains non-static variables
// Destroying memory
int nonStaticFun()
{
	cout << "Non-Static variables: ";

	int count = 0;
	count++;
	return count;
}

int main()
{

	// Printing the static variables parts
	cout << staticFun() << "\n";
	cout << staticFun() << "\n";
	;

	// Printing the non-static variables parts

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
static variables: 1
static variables: 2
Non-Static variables: 1
Non-Static variables: 1
```
4. **External**
When we want the variables to be shared across several files, we need this storage class. Extern variables have a global scope and can be seen outside of the file where they were declared. All programs can see it, and it's utilized when the same variable or function is shared by two or more files  
The lifetime of the extern variables is the same as the [lifetime of the program in which they were declared](https://progforperf.github.io/Expert_C_Programming.pdf). A regular global variable may also be rendered extern [by using the ‘extern' keyword before its declaration or description in any function or block](https://mu.ac.in/wp-content/uploads/2021/01/Imperative-Programming-1.pdf).
The variable cannot be initialized when you use 'extern,' because all it does is [point the variable name to a previously determined storage address](https://www.edureka.co/blog/cpp-storage-classes).
Syntax:
```c++
extern datatype var_name1;
```
Example to show Static storage class:
```c++
#include <iostream>
using namespace std;

// Declaring the variable which is to
// be made extern an initial value can
// also be initialized to m
int m;
void externStorageClass()
{

	cout << "Demonstrating extern class\n";

	// We tell compiler that variable
	// m is an extern variable. It's been defined somewhere else (above the main function)
	extern int m;

	// printing the extern variables
	cout << "Value of 'm'which is "
		<< "declared as extern: " << m << "\n";

	// value of 'm' modified
	m = 5;

	// printing the modified values of
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
Value of ‘m’ which is declared as extern: 0
Modified value of ‘m’ declared as extern: 5
```
5. **Mutable**
Only class objects have the mutable specifier, which enables a member of an object to override a const member function. That is, a const member function can change a mutable member. Even if you don't want the function to update other members of the class/struct, you can need to change one or more data members. This is done using the const function. The mutable keyword makes this task simple to complete.

Syntax:
```c++
mutable datatype var_name1 [= value];
```
Example to show Static storage class:
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
In this article, we discuss the different methods that we can put in place storage class's in C++ programs as well as what they are and their roles. With that, you should create programs that use storage classes to express the attributes of variables and methods. I yearn that you find this article intuitive and useful in your future programs.

Happy coding!

