---
layout: engineering-education
status: publish
published: true
url: /introduction-to-c++-namespace/
title: Introduction to C++ Namespaces
description: In this article, we will learn about Namespaces and how they are used in C++. Namespaces refers to various blocks that can be created in a program to group all similar objects, and you can refer to all variables, functions, or classes within a block.
author: dawe-daniel
date: 2021-02-14T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-c++-namespace/hero.jpg
    alt: C++ Namespace Image
---
A name can represent only one entity in each scope. That is why, in the same scope, there cannot be two variables with the same name as this may generate compiler errors. We can declare two variables or member functions that have the same name within the same scope using `namespace`. 
<!--more-->
This will cause several functions to have the same name and we can access all the functions from anywhere in the program by referencing the name of the namespace.  This article will go through namespaces and how they are used in C++.

### Prerequisites
To follow this article, you’ll need to have:
- [Codeblocks IDE](http://www.codeblocks.org/) to run the code.
- A basic understanding of the C++ language.
- A basic understanding of the C++ functions.

### What is a namespace?
[Namespace](https://www.educba.com/c-plus-plus-namespace) refers to various blocks that can be created in a program to group all similar objects, and you can refer to all variables, functions, or classes within a block.

### Some of the features of namespace declarations are:
- Declarations of namespace appear only on a global scale.
- Nesting namespace declarations inside another namespace is possible.
- Namespace declarations do not have permission labels (private, public, and protected) because they are declared in global scopes and can be easily nested in other namespaces.
- Namespace definition does not require a semicolon after the closing curly brackets.
- The definition of a namespace can be divided into multiple units.
- Multiple blocks of namespace declarations are allowed for the same name. Within those blocks in the named scope is where all the declarations are made.

#### Syntax of namespace declaration:
The namespace is a declarative region that specifies different scopes for different functions and variables, so we can use the name of the namespace when one has to refer to one such variable function:

```c++
namespace namespacename 
{
   int m, n; // code declarations where 
             // m and n are declared in 
             // namespace_name's scope
}
```
Let's  break down the syntax:
- `namespace` - is the keyword used to declare a namespace.
- `namespacename` - is the name given to the namespace.
- `int m, n` - are the variables in the namespace_name’s scope.

We use the scope resolution operator `::` to access a variable in a specific namespace,
as shown below: 

```c++
namespace_name :: variablename
Namespace_name :: functionname
```
### How namespace works in C++
When a namespace is declared using the keyword `namespace`,  all the functions, variables, or classes declared inside that namespace belongs to that scope and can be referred to using the `name` of that namespace with the scope resolution operator`::`.

The compiler sends the control to the namespace block when it encounters the scope resolution operator`::`. A namespace can also be defined in multiple scopes and if a namespace is unnamed, the variables and functions specified within them can be explicitly accessed in the same manner that global variables are accessed.

The namespaces in some namespaces may also be nested. To access them we are required to use the scope resolution operator `::` operator the number of times that are there to access them. 

For example:

```c++
namespace example1 {
  namespace example2 {
    namespace example3 {
      int sample;
    }
  }
}
```

When we want to access the variable `sample`, we need to use `example1::example2::example3::sample`.

Through this, we can make separate scopes and reuse the same variable names existing in different namespaces in our program. The use of namespace allows us to handle files in multiple libraries.

Up to now, anytime we decided to use a namespace, we had to refer to the namespace functions by including the namespace identifier preceded by the scope resolution operator. However, by using the `using`- directive with the syntax shown below, you can insert an entire namespace into a section of code:

`using namespace namespacename;`

This allows the developer to call functions from inside the namespace without needing to define the function's namespace when in the current scope. 

Typically, if you are not within a code block, before the next closing bracket, or the whole file. This simplicity can be exploited by using a namespace globally, which contradicts some of the reasons of using a namespace. 

The most common example of this use is: `using namespace std;`, which is used to give access to the namespace called standard that includes C++ I/O objects `cout` and `cin`.

####  Example 1
Program to illustrate working of namespace:

```c++
#include<iostream>
//Importing the  namespace standard
using namespace std;
//Creating namespaces
namespace no1 {
  int fun() {
    return 10;
  }
}

namespace no2 {
  //Declaring a variable in the namespace
  const double x = 200;
  //Function definition within the namespace
  double fun() {
    return 2 * x;
  }
}

namespace no3 {
  // Creating a class in the namespace
  class sample {
    public:
      void show() {
        cout << "no3::sample::show()\n";
      }
  };
}

int main() {

  // Accessing the function within namespace no1
  cout << no1::fun() << '\n';
  // Accessing the function within namespace no2
  cout << no2::fun() << '\n';
  // Accessing the variable x directly
  cout << no2::x << '\n';
  // Creating an object of class sample
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

In the program above we have described the same function name in two different namespaces, `no1` and `no2`. We have also defined and accessed the class `sample` in another namespace `no3`.  

As we have mentioned earlier to access the functions of the various namespaces the scope resolution operator`::` is used. As shown in the program, we can access the function `fun()` by using the operator as `no1::fun()`.

#### Example 2
Program to illustrate the working of namespace with the same name:

```c++
#include <iostream>

using namespace std;
// Creating namespaces with the same name
namespace sample {
  // Declaring variable x within the namespace
  int x = 20;
}

namespace sample {
  //Declaring variable y within the namespace
  int y = 50;
}
// Creating unnamed namespace
namespace {
  //Declaring and initializing a variable
  int a = 15;
  // Function definition within the unnamed namespace
  int fun() {
    return a;
  }
}

int main() {
  // Accessing the variable x within the namespace sample
  cout << "Value of x = " << sample::x << '\n';
  // Accessing the variable y within the namespace sample
  cout << "Value of y = " << sample::y << '\n';
  // Accessing the function within the unnamed namespace
  cout << "Value returned by the unnamed namespace = " << fun() << '\n';
  return 0;
}
```

Go ahead and run the code [here](https://repl.it/@Dawe7/use-of-namespace-with-the-same-name#main.cpp).

Output:
```bash
Value of x = 20
Value of y = 50
Value returned by the unnamed namespace = 15
```

In the program above, we can see how we can create several namespaces with the same name. The name `sample` has been used by two namespaces that have different variables. Therefore we have variables in the same scope, within both of them. We can also see how to define the unnamed namespace and access the function `fun()`.

#### Example 3
Program to illustrate nested namespace:

```c++
#include <iostream>

using namespace std;
//Creating nested namespaces
namespace no1 {
  // Declaring variable within the namespace no1
  int sample = 10;
  namespace no2 {
    namespace no3 {
      // Declaring variable within the namespace no3 
      // that initializes to the variable sample in namespace no1
      int sample1 = sample;
    }
  }
}
//Creating namespace that allows us to use it explicitly to access a variable in the nested namespace
namespace myalias = no1::no2::no3;
//Creating namespace demo and declaring an initialized variable
namespace demo {
  int gvar = 200;
}
//Inserting the entire namespace demo into our code
using namespace demo;

int main() {
  //Accessing the variable without the scope resolution operator as it is a global namespace
  cout << "Value of global variable in demo namespace = " << gvar << "\n";
  //Accessing the value of sample1 using the namespace myalias
  cout << "Value of sample1 in nested namespace third = " << myalias::sample1 << "\n";
  return 0;
}
```

Go ahead and run the code [here](https://repl.it/@Dawe7/nested-namespace#main.cpp).

Output:

```bash
Value of global variable in demo namespace = 200
Value of sample1 in nested namespace third = 10
```

In the program above, we can see how nested namespaces are declared and accessed from outside of the namespace. We also demonstrated the way we access a variable in the namespace without the scope resolution operator`::` and use the `using` directive. We have also seen how we can create the namespace `myalias` that allows us to use it explicitly using the name of the alias.

### Advantages of namespace
- In one program, namespace can help define different scopes to provide scope to different identifiers declared within them.
- By using namespace - the same variable names may be reused in a different program.
- The use of libraries - Namespaces and named spaces help a lot to use both libraries together, and defining the name using the scope resolution operator, helps determine the variable we try to access.

### Conclusion 
We have seen the benefits of using namespace in our programs, with our examples above. By using namespace, we can prevent conflicts in files with the same variable names and function names within the same program. The use of namespace to define identical code in different files and libraries increases our code's readability.

Happy coding!

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)