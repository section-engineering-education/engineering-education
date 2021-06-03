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

C is a procedural programming language. C is probably the most widely known programming language and Basic language. It is used as the reference language for computer science courses and used in competitive programming all over the world, and it's probably the language that people feel difficult when they are starting programming, and this series I will explain everything from ground level to high level

### Table of contents

- History of C Program
- Structure of C program
- Installing C in our System
- Writing the First C program
- Files used in C program
- Uses Of C programming

### History of C Program

C is a procedural programming language. It was developed in the early 1970s by Dennis Ritchie at Bell Laboratories and used by the UNIX operating system.

- Why this language named C ?
  - It was named `C` because many features were derived from an earlier language called `B`
- What is the purpose of the C language?
  - `C` was designed for implementing system software and later it was widely used for developing portable application software too.

### Structure of C program

`C` program is composed of preprocessor commands, a global declaration section, and one or more functions

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
  - function is defined as a group of `C` statements that are executed together.
  - `main()` is the most important function and is a part of every `C` program

### Installing C in our System

- In Windows

  - Download [Dev-C++](https://sourceforge.net/projects/orwelldevcpp/) from your favourite browser
  - Open the folder where you downloaded
  - And Install as Normal Application

- In Linux

  - Open a Terminal window. Enter the command this command to install build-essential packages
    `$ sudo apt-get install build-essential`

- In Mac
  - Open a Terminal window. Enter the command `clang --version`
  - If you want to install or update the Clang compilers, enter the command command `xcode-select --install`
  - You will get a pop up select `INSTALL` and ` Agree`

### Writing the First C program

- In windows

  - Open `Start Menu > All Programs > Bloodshed Dev-C++ > Dev-C++`
  - Then Navigate to `File > New > Source File`.This will open up an area where you be able to type your code.

  ```
      #include <stdio.h>
       int main()
       {
        printf("Welcome to Introduction to C programming");
        return 0;
       }
  ```

  - Navigate `File > Save As` to save your file. Select save location and name your file Make sure you change the file type to a `C` source file `(*.c)`.

  #### To Run the code

  - To run your code, select `Execute > Run`. This will start the program and should bring up a new console

- In Linux

  - Open a Text Editor and Enter the Code and save. And Make sure you change the file type to a `C` source file `(*.c)`.
  - Open Terminal and Navigate where you saved your file.
  - Enter the command `gcc sampleProgram.c -o sampleProgram`
  - Above command will save the output file as `sampleProgram`

  #### To Run the code

  - In terminal simply enter the command
    `./sampleProgram` to run your code

- In Mac
- Open a Text Editor and Enter the Code and save. And Make sure you change the file type to a `C` source file `(*.c)`.
  - Open Terminal and Navigate where you saved your file.
  - Enter the command `clang sampleProgram.c -o sampleProgram`
  - Above command will save the output file as `sampleProgram`
  #### To Run the code
  - In terminal simply enter the command
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
     - `stido` means `Standard Input Output` and it is a `header file`
     - This is a preprocessor command that comes as the first statement in our code. All preprocessor commands start with `#`
     
  - `int main()`
     - Every `C` program contains `main()` which is the starting point of the program.` int` is the return value of `main()`

  - `{}`
     - The two curly brackets are used to group all the related statements of the `main` function. All the statements between `{}` form the function body
  
  - `printf("Welcome to Introduction to C programming");`
     - `printf` is also a function and which is defined in the `stido.h` file and is used to print the text on the screen


  - `return 0;`
     - This `return` command is used to return value 0 to the operating system which indicates that zero errors or no errors
 
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
  
  - C language is primarily used for system programming.
  - C is widely used to implement end-user applications.
  - C language includes low-level memory access.
  - A simple set of keywords and a clean style.
  
### Conclusion

I hope you learn something new. I covered the history, structure, installation, understanding the code, files used, and uses Of C programming. This the first step of your learning journey of C programming. So this is about the introduction of C programming and in upcoming articles, we will cover some basics concepts in c. until then understand these topics.

BYE 👋 _HAVE A NICE DAY!_
