---
layout: engineering-education
status: publish
published: true
url: /function-pointers-in-c++/
title: Function Pointers in C++
description: This article introduces the reader to the working and examples of function pointers in C++. Function pointers are pointers that point to functions by storing their starting address or entry point of the block of memory containing the instructions.
author: dawe-daniel
date: 2021-06-25T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/function-pointers-in-c++/hero.jpg
    alt: C++ Function Pointer Image Example
---
To point to data, pointers are used. Like normal data pointers, we have `function pointers` that point to `functions`. The address of a function is stored in a function pointer. 
<!--more-->
### Introduction 
They store the starting address or entry point of the memory block comprising all the instructions of a function in greater detail. We use function pointers for several tasks. One example is to prevent code redundancy, which is what most programmers seek to achieve.

For example, if you're writing a `sort()` function, you may want to give the function's caller the option of sorting data in ascending or descending order. Some programmers may need to sort in ascending or descending order, while others may prefer something between. Function pointers allow the programmer to choose how to sort the data. 

Callbacks, event-driven programs, and so on are all applications of function pointers. This article will explain how the function pointer works and give you several examples, as well as code samples.

### Prerequisites
To follow through this article, the reader should:
- Have [Codeblocks IDE](https://www.codeblocks.org/downloads/) installed.
- Have a basic understanding of the C++ language.
- Have a basic knowledge of C++ functions.

### The Basic syntax of function pointers

```c++
void (*fun_ptr)(int);
       fun_ptr = &fun;
```

We can think of function pointers like normal C++ functions. Where void is the function's return type. `*fun_ptr` is a pointer to a function that takes one `int` argument. It's as if we are declaring a function called `*fun_ptr` which takes `int` and returns `void`. 

The key to writing the declaration for a function pointer is to think of it as a function declaration, but with `*fun_name` instead of `func_name`. The pointer symbol `*` precedes the declaration of the function pointer. Because the function pointer can accept many parameters, it can point to any function that accepts two `integer` arguments and returns `void`.

### Address of a function
To get the address of a function, we must first state the function's name. There is no need for us to call the function. 

Consider the example below:

```c++
#include <iostream>  
using namespace std;  
int main()  
{  
  std::cout << "The address of function main(): " <<&main<< std::endl;  
  return 0;  
}  
```

In the program above, we're displaying the address of our main() function. We only listed the name of the function, no brackets, and no parameters to print the address of the main() function. As a result, a function's address is simply its name without any brackets or parameters.

### Facts on function pointers that you should know
- Unlike other pointers, a function pointer points to code rather than data. The start of executable code is commonly stored in a function pointer.
- We don't use function pointers to allocate or de-allocate memory as we do with normal pointers.
- The name of a function may also be used to find the address of that function as we had seen in the program above. 
- Regular pointers can be used with an array of function pointers in the same manner that regular pointers can.
- In place of a switch case, function pointers can be utilized.
- A function pointer, like a data pointer, can be supplied as an argument and returned from a function.

### Calling a function indirectly
With the use of a function pointer, we may use the name of a function to call it. The syntax for calling the function via the function pointer is the same as for calling it directly.

Let's take a look at some code examples:

### Example 1
```c++
#include <iostream>  
using namespace std;  
int add(int x , int y)  
{  
    return x+y;  
}  
int main()  
{  
 int (*funcptr)(int,int);  // Declaration of function pointer
 funcpointr=add; // In this case we are pointing to the add function  

 int sum=funcpointr(7,10);  
 std::cout << "Sum=" <<sum<< std::endl;  
  return 0;  
}  
```

Go ahead and run the code [here](https://replit.com/@Dawe7/calling-functions-indirectly#main.cpp)
Output:

```bash
Sum value is : 17
```

We declare the function pointer, `int (*funcptr)(int,int)`, and then store the address of the `add()` function in `funcptr` in the preceding program. This means that the address of the `add()` method is stored in `funcptr`. We can now use `funcptr` to invoke the `add()` method. The `add()` function is called by the phrase `funcptr(7,10)`, and the result is put in the `sum` variable.

### Example 2
```c++
#include <iostream>  
using namespace std;  
void printname(char *name)  
{  
    std::cout << "Name:" <<name<< std::endl;  
}  
  
int main()  
{  
    char x[30];  // array declaration  
    void (*ptr)(char*);  // function pointer declaration  
    ptr=printname;  // storing the address of printname in ptr.  
    std::cout << "Enter name: " << std::endl;  
    cin>>x;  
    cout<<x<<endl;  
    ptr(x);  // calling printname() function  
   return 0;  
}  
```

Go ahead and run the code [here](https://replit.com/@Dawe7/example-2-funcptr#main.cpp)

Output:
```bash
Enter name:
Daniel
Daniel
Name: Daniel
```

We define the function `printname()` in the preceding program, which takes a `char` pointer as an argument. We declared our function pointer as `void (*ptr)(char*)`. 

We are setting the address of the `printname()` function to ptr with the expression `ptr=printname`. We can now use the `ptr` statement to call the `printname()` methods. We get the output above after entering the name as `Daniel`.

### Passing function pointers as arguments
We can pass function pointer's as arguments in our programs as shown below:
```c++
#include <iostream>  
using namespace std;  
void function1()  
{  
    cout<<"function1 is called";  
}  
void function2(void (*funcptr)())  
{  
    funcptr();  
}  
int main()  
{  
  function2(function1);  
  return 0;  
}  
```

Go ahead and run the code [here](https://replit.com/@Dawe7/Funcptr-as-arguments#main.cpp)

Output:
```bash
 function 1 is called
```

In the program above, we have passed a function pointer as an argument to the `function2()` function. The address of `function1()` is provided to the func2() function by the `main()` method. The `function2()` function is indirectly invoking the `function1()` function in this manner.

### Conclusion
In this article we have gone through function pointers. We have seen the importance of function pointers, where they are used, and how they make our programs easier to develop and maintain. 

I hope you found this article easy to read, intuitive, and applicable in your day-to-day work.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)