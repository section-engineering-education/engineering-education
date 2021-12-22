---
layout: engineering-education
status: publish
published: true
url: /understanding-c++-templates/
title: Understanding C++ Templates
description: In this article, we will learn about templates in C++, class templates, function templates, and how to declare them. A class template is a template that enables the developer to operate with generic data types.
author: dawe-daniel
date: 2021-03-30T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-c++-templates/hero.jpg
    alt: C++ Templates
---
### Introduction
A template is a way of writing a single function or class that can be reused by a group of similar functions or classes. In plain terminology, you can use templates to declare a single function or class that works with different data types. 
<!--more-->
This article will take a look at templates and how to use them for generic programming in C++.

### Prerequisites
To follow this article, you’ll need to have:
- A [Codeblocks IDE](http://www.codeblocks.org/downloads) to run the code.
- An basic understanding of the C++ language.

We can use the concept of templates in two different ways:
1. `Class templates`
2. `Function templates`

### How do templates work?
Templates expand at compile time like macros. The difference is that the compiler does a type check before expanding the template. 

The principle is basic, source code only contains function/class, but many copies of the same function/class can be included in compiled code.

### Class templates
A class template is a template that enables the developer to operate with generic data types. This enables the class to be used on several different data types as per the specifications without the need for each type to be re-written.

Quite often, you'll need a class implementation that is the same for all classes except for the data types used. For each data type, you'd have to declare a separate class or build many member variables and functions within a single class.

The declaration of separate classes that do the same thing for different data types will bloat the code base and make it difficult to manage. Any changes made in one class will need to be reflected in all the similar classes.

Class templates allow you to reuse the same code for all data types. Like normal arguments, we can transfer more than one type of data to templates as arguments if we need to.

### Declaration of a class template
Syntax:
```c++
template <class T>
class class_name
{
   ... .. ...
public:
   T var;
   T functionName(T arg);
   ... .. ...
};
```

Let’s break down the syntax as shown below:

- `template <class T>`- It is the keyword to declare a template.
- `class` - It is a user-defined type.
- `class_name` - It is the class name for the class.
- `T` - This is the argument for the template that is a placeholder for the data type which will be used.
- `var` - It is a variable of the class of the generic data type.
- ` T functionName(T arg)` - It is a function of the generic data type.

### How to create a class template object?
You need to define the data type within the angle brackets `< >` at the time of development to build a class template object as shown below:

```c++
className<dataType> classObject;
```

For example:

```c++
className<int>classObject;
className<float>classObject;
className<string>classObject;
```

Program to illustrate the use of a class template:
```c++
#include <iostream>
using namespace std;
// Creation of generic data type
template <class T>

class sample
{
//Declaration of variables of the class
private:
  T digit1, digit2; 
//constructor of the class
public:
  sample(T d1, T d2) //passing the two digits
  {
    digit1 = d1;
    digit2 = d2;
  }
//Function declaration to find the larger number of the two
T larger();
};
template <class T>
//Function definition outside the class
T sample<T>::larger(){
return(digit1>digit2?digit1:digit2); 

}
int main()
{
//Creation of class template objects
  sample <int> big(120, 80);
//Function call to display the larger digit
cout<<"larger= "<<big.larger();
  
  return 0;
}
```

Go ahead and run the code [here](https://replit.com/@Dawe7/Class-template-in-c#main.cpp).

Output:

```bash
larger= 120
```

In the program above, we first declared the template `template<class T>` and declared two variables `digit1` and `digit2`. Afterward, we created the constructor function`sample()` and passed two arguments. 

We have also created the function definition inside the class `T larger()` which we will use to find the larger number of the two. 

To create the function declaration of `T larger()` outside the class, we first declare the generic data type `template <class T>`. Note that if you create the function declaration outside the class without it, the compiler will generate errors. 

To build the function declaration outside the class template, we first declare the generic return type `T` and then the class name `sample`. Right after the class name, we add `<T>` to tell the compiler that the function’s template  argument is the same one that we are using for the class.

We compare the two digits within the function definition. We have created a class object using the same format we saw before the program:

`  sample <int> big(120, 80);`

Every time we are using the class template, it is required to tell it what data type we are substituting for `T`. In this instance, we are substituting `T` for `int`. 

Afterward, we created the object `big` and passed two integer numbers. We finish the program by calling the function `T larger()`.

### Advantages of class templates
The main advantages of using a class template are:
- You need to define only one class that will operate with various types of data.
- Only those data types for which the template has been used in the application produce instances of this template class at compile time.
- As we have already established, the creation and use of a template class will cut the development efforts and lines of code. It will also decrease the difficulty and time of debugging the software for any problems because you only deal with 1 class.

### Function templates
A [function template](https://bcastudyguide.wordpress.com/unit-4-generic-function) acts similarly to a normal function, with one key difference. A single function template can [interact with different data types at once](https://bcastudyguide.wordpress.com/unit-4-generic-function), but with a single normal function, only one set of data types can work.

Examples of OOP's polymorphism feature are both function overloading and function templates.  If you need to perform similar operations for two or more data types, you use overloading functions to create two functions. 

When several functions perform identical operations, templates are used. Using function templates would be a safer method since you can do the same task with less and more maintainable code

### Declaration of a function template?
The function template starts with the `template` keyword accompanied by the parameter inside the angle brackets `<>` and the function declaration.

Syntax:
```c++
template <class T>
T FunctionName(T arg)
{
   ... .. ...
}
```

Let’s break down the syntax as shown below:
- `template <class T>`- It is the keyword to declare a template.
- `T `- It is a template argument that accepts different data types.

When a data type argument is passed to `FunctionName()`, a new version of `FunctionName()` is created for the given data type by the compiler.
 
Program to illustrate the use of function template:

```c++
// C++ program to ilustrate use of function templates
#include <iostream>
using namespace std;

// template function
template <class T>
T Larger(T d1, T d2)
{
    return (d1 > d2 ? d1 : d2);
}

int main()
{
    //Declaration of variables with different data types
    int x1, x2;
    float y1, y2;
    char z1, z2;

// When two integer numbers are passed to the function template, the larger number is displayed.

    cout << "Enter two integer numbers:\n";
    cin >> x1 >> x2;
    cout << Larger(x1, x2) <<" is larger." << endl;

// When two floating-point numbers are passed to the function template, the larger number is displayed.

    cout << "\nEnter two floating-point numbers:\n";
    cin >> y1 >> y2;
    cout << Larger(y1, y2) <<" is larger." << endl;

// / The character with a greater ASCII value is shown when two characters are passed to the function template.
    cout << "\nEnter two characters:\n";
    cin >> z1 >> z2;
    cout << Larger(z1, z2) << " has a larger ASCII value.";

    return 0;
}
```

Go ahead and run the code [here](https://replit.com/@Dawe7/function-template#main.cpp).

The Output will be:
```bash
Enter two integer numbers:
18 10
18 is larger.
Enter two floating-point numbers:
4.5 9.3
9.3 is larger.
Enter two characters:
a m
m has a larger ASCII value.
```

Our program above takes user input thus for us to view the output, we can use the following values:

Integer numbers: 18, 10
Floating-point numbers: 4.5, 9.3
Characters: a, m

The function template `Large()` is declared in the program above, which accepts two `d1` and `d2` arguments of data type `T`. `T` indicates any type can be an argument. 

The larger of the two arguments is returned by the `Large() function` using a conditional operator.

Variables of three distinct data types are declared within the `main()` function. The variables will then be passed as normal functions to the `Large()` function prototype. 

When we pass an integer to the function template during runtime, the compiler knows that the `Large()` function must accept `int` arguments.

Likewise, when `float` and `char` data are passed, the `Large()` function is generated because it recognizes the argument data types. This way, three identical normal functions were replaced by using a single function prototype.

### Variadic function template
Variadic function templates are functions that [can take multiple numbers of arguments](https://www.geeksforgeeks.org/variadic-function-templates-c). 

Only type-safe templates with a variable number of arguments may be used since the arguments are resolved at runtime. It's a better template to use than the others because the others will only take a limited number of arguments.

Syntax:

```c++
template(typename args)
return_type fun_name(arg variable1, args... variable2)
```

Let’s break down the syntax as shown below:

- `template(typename args)`- It is used to declare variadic function templates.
- `return_type`- It is the return type of the function.
- `fun_name`- It is the name of the function.
- `(arg variable1, args... variables2)`- It is the arguments passed to the function.


**Note:** The `typename arg`, `typename... args` must be inside the angular brackets `<>`. 

Program to illustrate the use of a variadic function template:

```c++
// Program to illustrate working of 
// Variadic function Template 

#include <iostream> 
using namespace std; 

// To handle base case of below recursive 
// Variadic function Template 
void display() 
{ 
	cout << "This is an empty function and "
			"it is called last.\n" ; 
} 

// Variadic function template that takes a
// variable number of arguments and displays 
// all. 
template <typename T, typename... Types> 
void display(T variable1, Types... variable2) 
{ 
	cout << variable1 << endl ; 

	display(variable2...) ; 
} 

// Driver code 
int main() 
{ 
	display(1, 2, 3.14, "You can pass me any "
			"number of arguments", 
				"I will display\n"); 

	return 0; 
} 
```

Go ahead and run the code [here](https://replit.com/@Dawe7/Variadic-function-templates#main.cpp).

Output:

```bash
1
2
3.14
You can pass me any number of arguments
I will display

This is an empty function and it is called last.
```

In the program above, the variadic function templates will work as follows:

`display(1, 2, 3.14, “You can pass me any number of arguments”, “I will display\n”);` is evaluated in the following way:

The compiler will first resolve the statement into:

```c++
cout<< 1 <<endl ;
display(2, 3.14, "You can pass me any number of arguments", 
      "I will display\n");
```

Next, the compiler looks for a `display()` function that can take those arguments and, as a result, the function is executed again in the same way:

```c++
cout<< 2 <<endl ;
display(3.14, "You can pass me any number of arguments", 
      "I will display\n");
```

It is resolved into the following forms once more:

```c++
cout<< 3.14 <<endl ;
display("You can pass me any number of arguments", 
      "I will display\n");
```

```c++
cout<< "You can pass me any number of arguments" <<endl ;
display("I will display\n");
```

```c++
cout<< "I will display\n" <<endl ;
display();
```

The compiler at this point searches for a function overload that fits the empty function, that is, a function that takes no arguments. 

All functions with one or more arguments are matched to the variadic function, while the empty ones are matched to the empty functions.

### Conclusion 
In this article, we have gone through templates in C++, both class and function templates, and how to declare them. In the broader codebase, we use templates for code reusability and software flexibility. 

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
