### Introduction 
Pointers are used to point to data. Like normal data pointers, we have `function pointers` that point to `functions`. Function pointers store the address of a function. In greater detail, they store the starting address or entry point of the block of memory containing all the instructions in a function. We use function pointers for several tasks. One example is to prevent code redundancy, which is what most programmers seek to achieve. For example, if you're writing a `sort()` function, you may want to give the function's caller the option of sorting data in ascending or descending order. Some programmers may need to sort in ascending or descending order, while others may prefer something between. Function pointers allow the programmer to choose how to sort the data. Callbacks, event-driven programs, and so on are all applications of function pointers. This article will introduce the reader to the working and examples of the function pointer along with code examples.

### Prerequisites
To follow through this article, the reader should:
- Have [Codeblocks IDE](https://www.codeblocks.org/downloads/) installed.
- Have a basic knowledge of the C++ language.
- Have a basic knowledge of C++ functions.

### The Basic syntax of function pointers
```c++
void (*fun_ptr)(int);
       fun_ptr = &fun;
```
We think of function pointers like normal C++ functions. Where `void` is the return type of the function. `*fun_ptr` is a pointer to a function taking one argument of the type `int`. It's as if we are declaring a function called `*fun_ptr` which takes `int` and returns `void`. The key to writing the declaration for a function pointer is that we are writing out the declaration of a function. But with `*fun_name` where you would place `func_name`. The declaration of the function pointer is preceded by the pointer symbol `*`. The function pointer can take more than one argument thus it can point to any function which takes two `integer` arguments and return `void`.

### Address of a function
To get the address of a function, we are required to mention the name of the function. We do not need to call the function. Take an example below:

```c++
#include <iostream>  
using namespace std;  
int main()  
{  
  std::cout << "Address of a main() function is : " <<&main<< std::endl;  
  return 0;  
}  
```

We're displaying the address of a main() function in the program above. We only listed the name of the function, no brackets, and no parameters to print the address of a main() function. As a result, the address of a function is the name of the function without any brackets or parameters.

### Interesting facts about function pointers
- A function pointer, unlike other pointers, points to code rather than data. A function pointer usually stores the start of executable code.
- We don't use function pointers to allocate or de-allocate memory as we do with normal pointers.
- The name of a function may also be used to find the address of that function as we had seen in the program above. 
- An array of function pointers can be used in the same way that regular pointers are used. The program in our point 5 will show this for easier understanding.
- Function pointers can be used in place of a switch case. We can take a look at the example below to understand this better:

```c++
#include <stdio.h>
void add(int m, int n)
{
	printf("Addition = %d\n", m+n);
}
void subtract(int m, int n)
{
	printf("Subtraction = %d\n", m-n);
}
void multiply(int m, int n)
{
	printf("Multiplication = %d\n", m*n);
}

int main()
{
	// fun_ptr_arr is an array of the function pointers
	void (*fun_ptr_arr[])(int, int) = {add, subtract, multiply};
	unsigned int ch, m = 35, n = 10;

	printf("Enter Choice: 0 to add, 1 to minus and 2 "
			"to multiply\n");
	scanf("%d", &ch);

	if (ch > 2) return 0;

	(*fun_ptr_arr[ch])(m, n);

	return 0;
}
```
Go ahead and run the code [here](https://replit.com/@Dawe7/switch-case#main.cpp)
Output:
```bash
Enter Choice: 0 to add, 1 to minus and 2 to multiply
```
In the program above, the user is asked to choose between o, 1, and 2 to perform different operations thus emulating a switch case. 
-  Like normal data pointers, a function pointer can be passed as an argument and can also be returned from a function.

### Calling a function indirectly
We can use the name of a function to call the function with the aid of a function pointer. The syntax for calling the function through the function pointer is the same as for calling the function normally.

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
 int (*funcptr)(int,int);  // function pointer declaration  
 funcptr=add; // function pointer is pointing to the add function  
 int sum=funcptr(7,10);  
 std::cout << "The sum=" <<sum<< std::endl;  
  return 0;  
}  
```
Go ahead and run the code [here](https://replit.com/@Dawe7/calling-functions-indirectly#main.cpp)
Output:
```bash
Sum value is : 17
```
We declare the function pointer, `int (*funcptr)(int,int)`, and then store the address of the `add()` function in `funcptr` in the preceding program. This means that the address of the `add()` method is stored in `funcptr`. We can now use funcptr to invoke the add() method. The `add()` function is called by the phrase `funcptr(7,10)`, and the result is put in the `sum` variable.

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
We define the function `printname()` in the preceding program, which takes a `char` pointer as an argument. The function pointer is declared as `void (*ptr)(char*)`. We are setting the address of the `printname()` function to ptr with the expression `ptr=printname`. We can now use the `ptr` statement to call the `printname()` methods. We get the output above after entering the name as `Daniel`.

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
In the program above, the function pointer is passed as an argument to the `function2()` function. The address of `function1()` is provided to the func2() function by the `main()` method. The `function2()` function is indirectly invoking the `function1()` function in this manner.

### Conclusion
This article has gone through function pointers. We have seen the importance of function pointers through where they are used and how they make our programs easier to develop and maintain. I hope you found this article easy to read, intuitive, and applicable in your day-to-day work.

Happy Coding!