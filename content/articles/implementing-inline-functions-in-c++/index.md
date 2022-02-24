---
layout: engineering-education
status: publish
published: true 
url: /implementing-inline-functions-in-c++/
title: Implementing Inline Functions in C++
description: This article will introduce the reader to inline functions in C++; which is an important domain in programming, and follow it up with a practical demonstration.
author: dawe-daniel
date: 2021-08-26T00:00:00-12:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-inline-functions-in-c++/hero.jpg
    alt: Implementing inline functions hero image
---
One of the primary goals of employing functions in a program is to preserve memory, especially when a function is likely to be called repeatedly. When a function is called, it takes a long time to execute operations such as shifting to calling the function.
<!--more-->
If a function is short, overheads can consume a significant part of its execution time, and the time it takes to jump to the calling function may be longer than the time it takes to execute that function.

Macro definitions; which are mostly referred to as macros are one of the solutions to this issue.

In the C programming language, preprocessor macros are common, but the main disadvantage is that they are not true functions. Thus, the typical error checking process is bypassed during compilation.

This problem is approached differently in C++. C++ introduces a new function called the **inline function** to reduce the time taken to call small functions.

This article will introduce the reader to inline functions in C++; which is an important domain in programming, and follow it up with a practical demonstration.

### Prerequisites
To follow through this article, the reader should have:
- An understanding of the C++ programming language.
- [Codeblocks IDE](https://www.codeblocks.org/downloads/) installed to run the programs.
- An understanding of C++ functions.

### What is an Inline function?
An Inline function is a function that is [expanded in line when it is called, saving time](https://www.transtutors.com/questions/define-an-inline-function-in-c-write-its-syntax-is-it-possible-for-the-c-compiler-to-6904079.htm). The compiler substitutes the corresponding function code for the function call, [reducing the overhead of function calls](https://www.educative.io/edpresso/what-is-a-cpp-inline-function).

> Note: Inlining is a [request to the compiler and not a command](http://web.archive.org/web/20210502053708/https://www.geeksforgeeks.org/inline-functions-cpp). The compiler has the option of ignoring and bypassing the inline request.

#### Syntax:

```c++
Inline function-header
{
function body
}
```

The declaration and definition of the inline function have to be carried out at the same time.

#### Example to demonstrate inline functions:

```c++
#include <iostream>
using namespace std;
inline int cube(int x)
{
	return x*x*x;
}
int main()
{
	cout << "Our cube is: " << cube(3) << "\n";
	return 0;
} 
```

Output: 

```bash
The cube of 3 is: 27
```

This is a simple example that demonstrates an `inline function` that is declared using the inline keyword as a prefix.

### Functions and classes that can be used inline
The inline function can be defined within the class as well. All the functions declared within the class are, in reality, implicitly inlined. As a result, all the constraints that apply to inline functions apply here as well. 

Should you need to declare an inline function explicitly in the class, do so within the class and then define it out of the class with the inline keyword.

Take a look at the example below:

```c++
class x
{
public:
	inline int circle(int x) // use of inline many times
	{
		// This function is inlined by default.
		// function's body
	}
};

```

The technique described above is regarded to be a poor programming technique.

Writing the function prototype inside the class and declaring it as an inline in the function specification is the most efficient programming method.

For example:

```c++
class x
{
public:
	int circle(int x); // make a function declaration
};

inline int X::circle(int x) // make advantage of the inline prefix
{

}
```

This principle is demonstrated in the following program:

```c++
#include <iostream>
using namespace std;
class calculation
{
	int x,y,plus,subtract,mult;
	float divi;
public:
	void getValue();
	void addition();
	void subtraction();
	void multiplication();
	void division();
};
inline void calculation :: getValue()
{
	cout << "Enter first value:";
	cin >> x;
	cout << "Enter second value:";
	cin >> y;
}

inline void calculation :: addition()
{
	plus = x+y;
	cout << "Addition of two numbers: " << x+y << "\n";
}

inline void calculation :: subtraction()
{
	subtract = x-y;
	cout << "Difference of two numbers: " << x-y << "\n";
}

inline void calculation :: multiplication()
{
	mult = x*y;
	cout << "Product of two numbers: " << x*y << "\n";
}

inline void calculation ::division()
{
	divi=x/y;
	cout<<"Division of two numbers: "<<x/y<<"\n" ;
}

int main()
{
	cout << "Program using inline function\n";
	calculation m;
	m.getValue();
	m.addition();
	m.subtraction();
	m.multiplication();
	m.division();
	return 0;
}
```

In the program, we can see how the second technique is applied to implement inline functions within the class.

When we run the program above, it is more effective and performs better.

### Circumstances in which inlining may not be performed by the compiler.
- If a loop is present in a function.
- If a function is recursive.
- If there are static variables in the function.
- If there is a switch command or goto statement in a function.
- If a return statement exists for a [function that does not return values](https://stackoverflow.com/questions/145838/benefits-of-inline-functions-in-c).

### When do we use inline functions?
We can use the inline function to meet our requirements. Here are some helpful suggestions on when to use them:
- When performance is required, developers will use the inline function.
- We can always use the inline function over macros.
- To hide the details of the implementation of the function, developers recommend using the inline keyword well outside the class with the inline function.

### Points to remember when using inline functions
- We must keep inline functions tiny because they are more efficient and produce better outcomes.
- Although inline functions improve efficiency, they should not be used for all functions because putting huge functions inline might lead to code clutter and decrease efficiency.
- Large functions should be defined outside a class declaration using the scope resolution operator `::` since if we define them inside a class definition, they may become inline automatically, reducing the efficiency of our code.

### What's the problem with macros?
Readers who are familiar with the C programming language are aware that it employs macros. All macro calls are replaced directly within the macro code by the preprocessor.

Inline functions should always be used instead of macros. Macros are nearly never necessary in C++; according to Dr. Bjarne Stroustrup, the architect of C++, and they are mistake-prone.

The use of macros in C++ has several drawbacks. A macro has no access to a class's private members. Macros appear to be function calls, however they are not.

Example:

```c++
#include <iostream>
using namespace std;
class X
{
	int a;
public:
#define MAC(X::a) // error
};
```

The inline functions' argument types are checked by the C++ compiler, and any necessary conversions are executed. A preprocessor macro cannot do this. Also, macros are managed by the preprocessor, while [inline functions are managed by the C++ compiler](https://titanwolf.org/Network/Articles/Article?AID=c9c59268-405d-4235-9ecb-bed60f09eae6).

> True, all functions declared inside the class are implicitly inline. And the C++ compiler will call these functions inline. But if the function is virtual, the C++ compiler will not inline it. The reason for this is that virtual function calls are resolved at runtime rather than at compile time.

Another thing to keep in mind is that making the function inline is only effective if the [time spent calling the function is longer than the time spent executing the function body](http://web.archive.org/web/20210502053708/https://www.geeksforgeeks.org/inline-functions-cpp).

An example of an inline function that has no effect:

```c++
inline void display()
{
	cout << "value of X = " << X << endl;
}
```

The aforementioned function takes a long time to run. In general, a function that performs input-output operations should not be considered inline because it takes a long time.

Inlining the `display()` method is of minimal use because the time it takes to perform an `I/O` statement considerably outweighs the overhead of a function call.

If the function is not called inline, the compiler may issue a warning, depending on the compiler you're running. Inline functions are not supported by `Java` and `C#` programming languages.

Inline functions, last but not least, are a key component of C++. When inline functions are utilized correctly, they can improve efficiency. But, when inline functions are used indiscriminately, they cannot.

To put it another way, don't expect the software to improve. Ensure that a few of your functions are inline.

### Merits of inline functions
- There is no overhead associated with function calls.
- The overhead of a function's return call is avoided with inline functions.
- When the function is invoked, It saves time by not having to push and pop variables on the stack.
- When we utilize the inline function, the compiler may be able to apply context-specific optimizations on the function body, which are not available with regular function calls.

### Demerits of inline functions
- Cache misses are caused by large inline routines, which reduce efficiency.
- The overhead of copying the function body everywhere in the code during compilation is insignificant in small programs, but it can make a significant impact in huge code-bases.
- If we need the address of a function in a program, the compiler won't be able to inline it. Because the compiler must allocate storage to a function to provide it with an address. Inline functions do not receive storage and are instead stored in the Symbol table.
- Since inline functions expand the number of the binary executable file, they may cause thrashing. The computer's performance suffers as a result of thrashing in memory, and our code's efficiency suffers as a result.
- If somebody attempted to update the code inside the inline function, all the calling locations would have to be recompiled. Since the compiler would have to update all the code to identify the new. Otherwise, it would keep working as before.
- Additional registers are consumed by the inlined function's added variables. If the number of variables that will use a register rises after inlining, the overhead on register variable resource utilization may increase. This implies that whenever an inline function's body is swapped during a function call, the total set of variables used by the function is also entered. As a result, the number of registers used for variables will be raised. So, if variable counts skyrocket as a result of function inlining, register consumption will undoubtedly suffer.

### Conclusion
In this article, we have taken a look at inline functions, what they are, when to use them, along some practical demonstrations. We have seen how inline functions are more effective than preprocessor macros.

I hope that this tutorial gives you insight and helps you in your future programs.

Happy Coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
