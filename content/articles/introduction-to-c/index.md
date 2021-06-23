---
layout: engineering-education
status: draft
published: false
url: /introduction-to-c/
title: Introduction to C programming
description: It covers the history of C, its purpose, where it is used, and how to install and files used in the C and First C program.
author: chandramouli-dasari
date: 2021-06-03T00:00:00-08:10
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-c/hero.png
    alt: Clang image example
---

![Clang image example](/engineering-education/introduction-to-c/hero.png)



### Introduction

C is the one of most popular languages. C is a practical and basic programming language. This "C" is used as a reference for other languages in computer science courses. And as per competitive programming, it is also the most preferable language. When they starting programming or shifting from another programming language then "C" looks like bit difficult 
but this series will explain everything from ground level to high level

### Table of contents

- History of C Program
- Structure of C program
- Installing C in our System
- Writing the First C program
- Files used in C program
- Uses Of C programming

### History of C Program

C is a practical programming language. In the 1970's "C" was developed by Dennis Ritchie and used by the UNIX operating system at Bell Laboratories.

- Why this language named C?
  - Before "C" there is a language called "B" and Some of the Options are derived from "B"
  - B developed at Bell Labs circa 1969 and it was developed by Ken Thompson and Dennis Ritchie and it is used to implement the system software
- What is the purpose of the C language?
  - Early "C" is only used to design and implement the system software. But later some features were add to "C" then it is used to develop portable application software too.


### Structure of C program

`C` program is structured of preprocessor commands, a global declaration section, and one or more functions

```
preprocessor directives

Global declarations
main()
{
 Local declarations
 Statements
 }
 Function 1()
{
 Local declarations
 Statements
 }
 Function N()
{
 Local declarations
 Statements
 }
```

- preprocessor directives

  - Preprocessor directives are lines included in the code of programs preceded by a hash sign `#`
  - One of the most important and commonly used preprocessor commands is `include` which tells the compiler to execute the program

- Functions in C
  - `C` program contains one or more functions.
  - A group of `C` statements and that are executed together is known as Function 
  - `main()` is the most important function and is a part of every `C` program

### Installing C in our System

- In Windows

  - Download [Dev-C++](https://sourceforge.net/projects/orwelldevcpp/) from your favourite browser
  - Open the folder where you downloaded
  - And Install as Normal Application

- In Linux

  - Open a Terminal window. Enter the command this command to install build-essential packages
    `$ Sudo apt-get install build-essential`

- In Mac

  - Open a Terminal window. Enter the command `clang --version`
  - If you want to install or update the Clang compilers, enter the command command `xcode-select --install`
  - You will get a pop up select `INSTALL` and ` Agree`

### Writing the First C program

- In windows

  - Open `Start Menu > All Programs > Bloodshed Dev-C++ > Dev-C++`
  - Then Navigate to `File > New > Source File`.It will navigate to empty space or file where we can write our code 
  

  ```
      #include <stdio.h>
       int main()
       {
        printf("Welcome to Introduction to C programming");
        return 0;
       }
  ```

  - Navigate `File > Save As` to save your file. The select location you want to save and save the source file (the file which you written the code)by changing file type as `C` with the extension of `(*.c)`.

  #### To Run the code

  - select `Execute > Run`. By doing this step the program will start execute and run in a new console
  
- In Linux

  - Open a Text Editor and Enter the Code and save. And Make sure you save the source file (the file which you written the code)by changing the file type as `C` with the extension of `(*.c)`.
  - Open Terminal and Navigate where you saved your file.
  - Enter the command `gcc sampleProgram.c -o sampleProgram`
  - Above command will save the output file as `sampleProgram`

  #### To Run the code

  - In the terminal simply enter the command
    `./sampleProgram` to run your code

- In Mac

  - Open a Text Editor and Enter the Code and save. And Make sure you save the source file (the file which you written the code)by changing file type as `C` with the extension of `(*.c)`.
  - Open Terminal and Navigate where you saved your file.
  - Enter the command `clang sampleProgram.c -o sampleProgram`
  - Above command will save the output file as `sampleProgram`
  
  #### To Run the code
  
  - In the terminal simply enter the command
    `./sampleProgram` to run your code


### Understanding the Code
  ```
      #include <stdio.h>
       int main()
       {
        printf("Welcome to Introduction to C programming");
        return 0;
       }
  ```
  - `#include <stdio.h>`
     - `stido` defined as `Standard Input Output` and also known as `header file`
     - `stdio` command that comes as the first statement in every code 
     - And the most important thing is preprocessor commands begins with symbol `#`
     
  - `int main()`
     - In `C` programming
     - In `C` programming all programs must have the `main()` function and it is known as starting point of the code.For the `main()` the return value is `int`

  - `{}`
     - These brackets are used to combine all statements of the `main` function and the data between these `{}` known as a function body.

  - `printf("Welcome to Introduction to C programming");`
     - `printf` is also a function and which is defined in the `stido.h` file and is used to print the text on the screen


  - `return 0;`
     - This command indicates that there are no errors in our code when the operating system return a value 0 
    
 
_Note: Every statement in the main function must end with `;`_

### Files used in C program

  - Every C program has four kinds of files associated with it

    - Source File
      - File contains source code of the program
      - Extension is `.c`
    - Header File
      - Files contain the set of predefined standard library functions
      - Extension is `.h`
    - Object File
      - These are generated by the compiler 
      - Extension is `.obj`
    - Executable File
      - Executable file is also known as `Binary Executable Files`
      - Extension is `.exe`

### Uses Of C programming
  
  - C language is mainly used for system programming.
  - And To Design and implement end-user applications.
  - C language includes low-level memory access.
  - C language is a set of keywords with a clean structure.
  - C language is used as Basing Building block for many other programming languages
  - C provides dynamic memory allocation 
  
### Conclusion

I hope you learn something new. I covered the history, structure, installation, understanding the code, files used, and uses Of C programming. This the first step of your learning journey of C programming. So this is about the introduction of C programming and in upcoming articles, we will cover some basics concepts in c. until then understand these topics.

BYE, 👋 _HAVE A NICE DAY!_
