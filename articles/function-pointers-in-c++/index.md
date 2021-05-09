### Introduction 
Pointers are used to point to data. Like normal data pointers, we have `function pointers` which point to `functions`. Function pointers store the address of a function. In greater detail, they store the starting address or entry point of the block of memory containing all the instructions in a function. We use function pointers for several tasks. One example is to prevent code redundancy, which is what most programmers seek to achieve. For example, if you're writing a `sort()` function, you may want to give the function's caller the option of sorting data in ascending or descending order. Some programmers may need to sort in ascending or descending order, while others may prefer something in between. Function pointers allow the programmer to choose how to sort the data. Callbacks, event-driven programs, and so on are all applications of function pointers. This article will introduce the reader to the working and examples of the function pointer along with code examples.

### Prerequisites
To follow through this article, the reader should:
- Have [Codeblocks IDE](https://www.codeblocks.org/downloads/) installed.
- Have a basic knowledge in the C++ language.
- Have a basic knowledge in C++ functions.

### Basic syntax of function pointers
```c++
void (*fun_ptr)(int);
       fun_ptr = &fun;
```
We think of function pointers like normal C++ functions. Where `void` is the return type of the function. `*fun_ptr` is a pointer to a function taking one arguement of the type `int`. It's as if we are declaring a function called `*fun_ptr` which takes int and returns void. The key to writing the declaration for a function pointer is that we are writing out the declaration of a function but with `*fun_name` where you would normally place `func_name`. The declaration of the function pointer is preceded by the pointer symbol `*`. The function pointer can take more than one argument thus it can point to any function which takes two `integer`arguments and return `void`.

### Address of a function


