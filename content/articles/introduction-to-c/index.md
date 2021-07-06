
author: chandramouli-dasari


### Introduction
C is among the most popular programming languages. It is also regarded as a practical and basic programming language. C is commonly used as a reference for other languages in computer science. This article will help you understand various aspects relating to C programming. 

C is a practical programming language. It was developed by Dennis Ritchie in the 1970s and adopted by the UNIX operating system at Bell Laboratories. C is commonly used to develop desktop and console applications on platforms such as Windows.

### Structure of a C program
A `C` program includes preprocessor commands, a global declaration, as well as one or more functions.

```c
/*preprocessor directives*/

/*Global declarations*/

main(){
 /*Local declarations*/
 /*Statements*/
 }

 Function 1(){
  /*Local declarations*/
  /*Statements*/
 }
 Function N(){
  /*Local declarations*/
  /*Statements*/
 }
```

- preprocessor directives - These are lines included in the code of programs preceded by a hash sign `#`. One of the commonly used preprocessor commands is `include` which tells the compiler to execute the program.

- Functions - A `C` program contains one or more functions. A function is basically a group of statements that are executed together. `main()` is the most important function in every `C` program.
s
### Installing C in our System
On Windows, download [Dev-C++](https://sourceforge.net/projects/orwelldevcpp/) from your favourite browser. Then, open the folder where you downloaded the application and install it.

On Linux, open a Terminal window and enter the command below to install build-essential packages:

```bash
    $ Sudo apt-get install build-essential
```

On Mac, open a terminal and enter the `clang --version` command.
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
