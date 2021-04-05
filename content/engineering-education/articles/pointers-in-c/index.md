---
layout: engineering-education
status: publish
published: true
url: /engineering-education/pointers-in-c/
title: Pointers in C
description: Pointers are a hard concept to grasp for a lot of new programmers. This article will help you understand what pointers are in C and how to use them.   
author: nimra-aftab
date: 2020-09-01T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pointers-in-c/hero.jpg
    alt: c pointers c++ variable
---
Pointers are common in the C programming language. Since C does not have built-in [arrays](https://en.wikipedia.org/wiki/Array_data_structure) and strings, programmers use pointers instead. This article will give you a basic introduction to what pointer variables are.
<!--more-->

### An Introduction to Pointers
Every variable in your program uses up at least one byte in the computer memory. Each byte has an address. *Pointer variables* store the address of a byte in memory. A *pointer* points to something--an `int`, `double`, `char`, etc. To declare a *pointer variable* we use an asterisk (*). We use ampersand (&) to get the address of the variable being pointed at.

```c
int i = 5;
int *p;
p = &i; /* We say p 'is a pointer to' i */
```

Notice that we had to declare the variable type of `p` : a pointer to an integer, or type `int *`.
A common mistake is to say the pointer variable declared above is `*p`.  The variable above is **not** declared as `*p`. It is the variable `p` of type `int *`. In fact, `*p` means something else: it says to dereference the pointer `p`. When we **dereference** a pointer, we access what is being stored at the memory address. Here's a sample program:

```c
#include <stdio.h>
int main(){
    int i = 5;
    int *p;
    p = &i; /* p points to i */
    printf(" The value of i is %d \n", *p); // Dereferencing p gives i
    printf(" The memory address of i is %p\n ", p);
    return 0;
}
```

Here's the output when I run it on my machine:

```c
 The value of i is 5
 The memory address of i is 0x7ffee9dbe958
```

### Arrays: A Pointer to the First Element
An array in C can only hold one data type (eg: `int`, `char`, etc.).  The name of the array points to the first element. We can dereference the pointer to set the element at index 0.

```c
int myarray[2]; /* Declare an array that holds 2 integers*/
/* Since myarray is a pointer to the first element in the
array, we can dereference it */
*myarray = 10; /* Stores 10 in myarray[0] */
```

We can use **pointer arithmetic** to access any element of an array. Recall that a pointer is an address. Since addresses are numbers, we can add or subtract them. When we perform pointer arithmetic, we need to know the size of the variable being pointed at. In our case, `myarray` is a pointer to an integer, and integers are 4 bytes.

Suppose we now want to set the second element (or index 1) of `myarray` to 20.

```c
*(myarray + 1) = 20; /* Stores 20 in myarray[1]*/
```

Performing `myarray + 1` moves the pointer to the next address for an integer, which is 4 bytes away. Then we dereference the pointer and set the integer being pointed at to 20.

Note that we can also access any element *i* of the array by calling `myarray[i]`. But you should know that this is equal to `*(myarray + i)` as described above.

### Strings and Pointers
There are two types of strings in C: *string literals* and *string variables*.

String *literals* are of the type `char *` since they point to the first character in the string. String literals never change, and they contain characters within double quotes.

```c
char *a;
a = "Hello, world"; /* a points to the character 'H' */
```

In contrast, string *variables* may change throughout your program. String variables are an array of characters. Since string variables are arrays, the name of the string points to the first character. The array is terminated by the null character ( `'\0'` ).  

```c
char myString [3];
myString[0] = 'P';
myString[1] = 'i';
myString[2] = '\0';
*myString = 'H'; // myString is a pointer to the character 'H'
```
### Putting Your Knowledge to Use
You've learned that pointers are memory addresses. Arrays use pointers, and we can dereference pointers to access elements of an array. Strings are arrays too, so we can manipulate them with pointers as well. I recommend that you read *C Programming: A Modern Approach* by K. N. King for further reference. The book also has exercises and programs that you can test out.

### Sources and Further Reading
[C Programming: A Modern Approach by K. N. King](http://knking.com/books/c/)

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)
