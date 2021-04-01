---
layout: engineering-education
status: publish
published: true
url: /engineering-education/string-manipulation/
title: String Manipulation in C
description: The article discusses how to modify strings in the C programming language. This includes discussing functions from the string library.
author: nimra-aftab
date: 2020-09-18T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/string-manipulation/hero.jpg
    alt: string manipulation image example
---
Recall that there are two types of strings in the C programming language. String *variables* can be modified, but string *literals* cannot. This article will discuss how to safely manipulate string variables.
<!--more-->

### String Basics
String *variables* are an array of characters in 'C'. Strings are always null terminated, so the array needs space for the string **and** the null character (`\0`).

```c
/* There are two ways to declare a string variable */
char mystr[4] = "bye"; // '\0' is appended automatically to the end
char mystr2[4] = {'b', 'y', 'e', '\0'};
```
We can change characters in a string by modifying the array elements:

``` c
mystr[0] = 'e'; // mystr is now "eye" instead of "bye"
```

### Identifying a Common Mistake
Suppose we wanted to copy the contents of a string. Here is what beginners often write:

```c
char mystr[6] = "hello";
char newstr[6];
newstr = mystr; // THIS IS INCORRECT.
```

Notice that `newstr ` is an array name. It is **illegal** to use an array name on the left side of the assignment operator (`=`). The only exception to this rule is when we initialize a string **at the same time** as we declare it. So `char mystr[6] = "hello"` is acceptable, but `newstr = mystr` is not.

Luckily, there is a string function in 'C' that can help us to copy strings.

### Introducing the String Library
The string library has functions that can help us manipulate strings. You'll need to add `#include <string.h>` at the beginning of your program to access these functions.

Let's continue to solve the problem of copying the contents of a string. There are two functions that may be able to help us: `strcpy` and `strncpy`. We will look at `strcpy` first.

```c
#include <string.h> // for strcpy()
#include <stdio.h> // for printf()
int main(){
    char mystr[6] = "hello";    
    char newstr[6];
    /* copy the contents of 'mystr' into 'newstr',
    including the null char */
    strcpy(newstr, mystr);
    printf("Now 'newstr' contains %s \n", newstr);
}
```

On my machine, the result is:

```c
Now 'newstr' contains hello
```

What would happen if I made the following change to my program:

```c
#include <string.h>
#include <stdio.h>
int main(){
    char mystr[6] = "hello";    
    char newstr[3]; // CHANGE: newstr only has space for 3 chars
    strcpy(newstr, mystr); // THIS IS UNSAFE!
    printf("Now 'newstr' contains %s \n", newstr);
}
```

We have just done something **no programmer should ever do**. We copied six characters (`"hello"` plus `'\0'`) into an array that only had space for three characters. This *exceeds* array bounds and causes a major vulnerability called [buffer overflow](http://spc.cs.ucdavis.edu/index.php/situations/buffer-overflow).

But when I run this program on my machine, I get the same output as before:

```c
Now 'newstr' contains hello
```

So what happened? We might think that our program is okay because it runs as expected. This is a terrible assumption because our program has a big flaw and 'C' does not warn us.

### Safe Functions in the String Library
Let's consider `strncpy`: a "safe" alternative to `strcpy`. This is because `strncpy` does not exceed array bounds when used properly. Let's edit the example from before to use the `n` family of string functions:

```c
#include <string.h>
int main(){
    char mystr[6] = "hello";
    char newstr[3];
    // Only copy the first two letters of 'mystr'
    strncpy(newstr, mystr, 2);
    newstr[2] = '\0';
    /* strncpy does NOT add a terminating null
    so we must do it ourselves */
    printf("Now 'newstr' contains %s \n", newstr);
}
```
On my machine, the output is:

```c
Now 'newstr' contains he
```

Notice that we only copied two characters into `newstr` so that we could leave room for the null character (`'\0'`). We did *not* exceed array bounds this time.

### Applying Your Knowledge to other Functions
The string library has other functions that allow us to manipulate strings. Some of the common ones are:
- `strchr` (search a string for a character)
- `strcmp` (compare two strings together)
- `strncat` (add `n` characters from one string to another string)

### Additional Resources
For a more exhaustive list of string functions available in 'C', see the [Linux Programmer's Manual](https://man7.org/linux/man-pages/man3/string.3.html).

For more details on the history of the C programming language you can [read this article](/engineering-education/history-of-c-programming-language/).

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)

