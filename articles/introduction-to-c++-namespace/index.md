### Introduction
A name can represent only one entity in each scope. Thus, in the same scope, there cannot be two variables with the same name as this can generate compiler errors. Using `namespaces`, we can declare two variables or member functions having the same name in the same scope. This causes several functions to have the same name and all functions can be accessed from anywhere in the program by referencing the name of the namespace. This article will go through namespaces and how they are used in C++.

#### Prerequisites
To follow this article, you’ll need to have:
- [Codeblocks IDE]() to run the code.
- An understanding of the C++ language.
- An understanding of the C++ functions.

#### What is a namespace?
Namespace refers to various blocks that can be created in a program to group all similar objects, and you can refer to all variables, functions, or classes within a block.

#### Some of the features of namespace declarations are:
- Declarations of namespace appear only on a global scale.
- Nesting namespace declarations inside another namespace is possible.
- Namespace declarations do not have permission labels (private, public, and protected) because they are declared in global scopes and can be easily nested in other namespaces.
- Namespace definition does not require a semicolon after the closing curly brackets.
- Namespace definition can be broken into several units.
- Multiple blocks of namespace declarations are allowed for the same name. All the declarations are declared within those blocks in the named scope.

##### Syntax of namespace declaration:
The namespace is a declarative region that specifies different scopes for different functions and variables, so we can use the name of the namespace when one has to refer to one such function of the variable:

```c++
namespace namespacename 
{
   int a, b; // code declarations where 
             // a and b are declared in 
             // namespace_name's scope
}
```
Let's  break down the syntax:
- `namespace` - is the keyword to declare a namespace.
- `namespce_name` - is the name of the namespace.
- `int a, b` - are the variables in the namespace_name’s scope.

To access a variable or  function in a specific namespace, we use the scope resolution operator `::`.
as shown below: 

```c++
namespace_name :: variablename
Namespace_name :: functionname
```
#### How namespace works in c++
When a namespace is declared using the keyword `namespace`,  all the functions, variables, or classes declared inside that namespace belongs to that scope and can be referred to using the `name` of that namespace with the scope resolution operator`::`.

The compiler sends the control to the namespace block when it encounters the scope resolution operator`::`. A namespace can also be defined in multiple scopes and if a namespace is unnamed, the variables and functions specified within them can be explicitly accessed in the same manner that global variables are accessed.
The namespaces in some namespaces may also be nested. To access them we are required to use the scope resolution operator `::` operator the number of times that are there to access them. For example:

```c++
namespace example1{
namespace example2{
namespace example3{
int sample;
}
}
}
```
When we want to access the variable `sample`, we need to use `example1::example2::example3::sample`.

Through this, we can make separate scopes and reuse the same variable names existing in different namespaces in our program. The use of namespace allows us to handle files in multiple libraries.

Up to now, anytime we decided to use a namespace, we had to refer to the namespace functions by including the namespace identifier preceded by the scope resolution operator. However, by using the `using`-directive with the syntax shown below, you can insert an entire namespace into a section of code:

`using  namespace namespacename;`

By doing this it allows the developer to call functions from within the namespace without having to specify the namespace of the function while in the current scope (Generally, until the next closing bracket, or the entire file, if you aren't inside a block of code.) By using a namespace globally, which undermines some of the aims of using a namespace, this convenience can be exploited. The most common example of this use is:

`using namespace std;`

which grants access to the [standard namespace that includes C++ I/O objects `cout` and `cin`](https://students.cs.byu.edu/~cs235ta/references/Cpp/Using%20Namespaces.pdf).

#####  Example 1
Program to illustrate use of namespace:

```c++
#include <iostream>

using namespace std;

namespace no1
{
int fun(){
return 10;
}
}
namespace no2
{
const double x = 200;
double fun() {  return 2*x; }
}
namespace no3
{
class sample
{
public:
void show()
{
cout << "no3::sample::show()\n";
}
};
}
int main()
{
cout << no1::fun()<< '\n';
cout << no2::fun() << '\n';
cout << no2::x << '\n';
no3::sample myObj;
myObj.show();
return 0;
}
```
Go ahead and run the code [here](https://repl.it/@Dawe7/Example-1-of-namespace-in-c#main.cpp).

Output:
```bash
10
400
200
no3::sample::show()
```
In the program above we have described the same function name in two different namespaces, `no1` and `no2`. We have also defined and accessed the class `sample` in another namespace `no3`.  We can access the functions of the various namespaces by the use of the scope resolution operator`::`. As shown in the program, we can access the function `fun()` by using the operator as `no1::fun()`.

##### Example 2
Program to illustrate the use of namespace with the same name:

```c++
#include <iostream>
using namespace std;
namespace sample
{
int x=20;
}
namespace sample
{
int y=50;
}
namespace {
int a=15;
int fun(){
return a;
}
}
int main()
{
cout << "Value of x = "<<sample::x<< '\n';
cout <<"Value of y = "<<sample::y<< '\n';
cout <<"Value returned by the unnamed namespace = "<<fun()<< '\n';
return 0;
}
```

Go ahead and run the code [here](https://repl.it/@Dawe7/use-of-namespace-with-the-same-name#main.cpp).

Output:
```bash
Value of x =20
Value of y =50
Value returned by the unnamed namespace =15
```
In the program above, we can see how we can create several namespaces with the same name. The name `sample` has been used by two namespaces that have different variables. Thus, the variables inside all of them, in the same scope. We can also see how to define the unnamed namespace and access the function `fun()`.

##### Example 3
Program to illustrate nested namespace:

```c++
#include <iostream>

using namespace std;

namespace no1
{
int sample = 10;
namespace no2
{
namespace no3
{
int sample1=sample;
}
}
}
namespace myalias = no1::no2::no3;
namespace demo
{
int gvar = 200;
}
using namespace demo;
int main()
{
cout << "Value of global variable in demo namespace = "<<gvar << "\n";
cout << "Value of sample1 in nested namespace third = "<<myalias::sample1 << "\n";
return 0;
}
```
Go ahead and run the code [here](https://repl.it/@Dawe7/nested-namespace#main.cpp)

Output:

```bash
Value of global variable in demo namespace =200
Value of sample1 in nested namespace third =15
```
In the program above, we can see how nested namespaces can be declared and accessed from outside of the namespace. The way we access a variable in the namespace without the scope resolution operator`::` and use the `using` directive is also demonstrated. We have also seen how we can create the namespace `myalias` that allows us to use it explicitly using the name of the alias.

#### Advantages of namespace

- In one program, namespace helps a lot to define different scopes to provide scope to different identifiers declared within them.
- Using the same variable - the same variable names may be reused in a different program with the help of declaring namespaces.
- Use libraries- Namespaces and named spaces help a lot to use both libraries together, and defining the name using the scope resolution operator, helps determine the variable we try to access.

#### Conclusion 
The benefits of using namespace in our programs are evident as we have seen above. By using namespace, we can prevent conflicts in files with the same variable names and function names within the same program. Using namespace to define similar code in different files and different libraries improves the readability of our code. 