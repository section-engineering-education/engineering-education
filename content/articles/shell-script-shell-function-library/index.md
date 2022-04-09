---
layout: engineering-education
status: publish
published: true
url: /shell-script-shell-function-library/
title: Shell Script to Demonstrate the use of the Shell Function Library
description: This article will explain to the reader what a script is, how to create one using the open script, and then demonstrate the use of the Shell Function Library using Bash scripts in Linux distributions.
author: nicasious-githinji
date: 2021-08-25T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/shell-script-shell-function-library/hero.png
    alt: Shell Script Shell Function Library
---
A good computer program has various lines of code in it. These code snippets can sometimes be repeated and used multiple times in the program. To simplify the process and reduce errors, functions are used to group repetitive pieces of code.
<!--more-->
In shell scripting, functions library may be called from any location in the development environment, making shell scripting less laborious and helpful when trying to reduce errors.

### Introduction
This article will take you through how to create a simple shell script function and how to use it.

### Goals
By the end of this article, the reader will have understood:
- What a function is and what function libraries are.
- How to create a shell function.
- How to use functions from the library and then demonstrate how to use bash script as a function library.

### Prerequisites
To better understand this tutorial, the reader is expected to have some prior background knowledge, mainly with:
- How to use an interactive Unix/Linux shell.
- Understanding some Unix/Linux commands.
- Minimal programming knowledge - using variables and functions.

### Table of contents
- [Shell function](#shell-function)
- [How to create a function](#how-to-create-a-function)
- [Why use the function Library](#why-use-the-function-library)
- [Creating a function library](#creating-a-function-library)
- [Using functions from the Library](#using-functions-from-the-library)
- [A simple demo using Bash script as a fuction library](a-simple-demo-using-bash-script-as-a-function-library)
- [Usage of Shell function Library](#usage-of-shell-function-library)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Shell function
A [shell script](/engineering-education/introduction-to-shell-scripting/) is a computer program designed to be run by a [Unix/Linux shell](/engineering-education/introduction-to-linux-shell-and-shell-scripting/). This script can perform operations such as file manipulation, program execution, and printing text.

To execute these tasks, some pieces of code can be used repeatedly in the program. To make this process easier we can group these into a `Function`, which allows them to be called and reused multiple times within the program.

### How to create a function
A function is a block of code that carries out a certain activity. A function can be called and reused. In shell scripting, functions are analogous to other programming languages' subroutines, procedures, and functions.

Simply enter the following code to create a function:

```bash
function_name () { 
   list of commands
}
```

Your function's name is `function_name`, and you'll call it by that name throughout your scripts. The name of the function must be preceded by parentheses and a series of instructions surrounded by braces.

Below is an example to show the use of a function:

```bash
Hello () {
   echo "Hello World"
}

Hello
``` 

Save the script above in your Linux system as `test.sh` and then run it in the terminal by writing `./test.sh`

The script above will display the following output.

```bash
Hello World
```

In C/C++, a shell function library is similar to a header file, whereas, in Python, it is similar to a module. The current script must be aware of the function's location. 

To be able to use the functions, we must additionally add the file's location to the Environment variables, or run the script in the terminal to temporarily load the function library into the current shell. Shell script functions are similar to regular shell scripts in that they only define functions.

### Why use the function library
The most important reason for having a function library is for reusability. We require functions in a function library for the following reasons.

1. Sometimes we require logic to address [looping logic](https://docs.oracle.com/cd/E13214_01/wli/docs102/bpguide/bpguideWhile.html). For example, in Oracle applications, whenever a concurrent request is sent, we usually click on the Refresh button to retrieve the most recent data about the concurrent program's status. Or, we may create a function and place it in the function library so it can be used in other scripts.

2. We could need a collection of functions to deal with an excel file, a CSV file, an XML file, or a properties file at times. This is the situation when we wish to work with several test automation scripts. 

When the functions are developed, they can be reused wherever they are needed in several test automation scripts. We may need to interact with these files for a variety of reasons, including test data iterations, spreadsheet verification, and so on.

3. Some firms develop functions for each of the application's business functions, which can then be utilized to create other test script combinations.

> Another advantage is that once these functions are exposed, they become central, so any changes made to them are reflected in any scripts that utilizes them.
             
### Creating a function library
Let's look at how to create a function library with an Open script from OATS.

To construct a function library, follow these steps.
1. Open the file open script.
2. Select New from the File menu.
3. Click Next after selecting a project type.
4. Check the box labeled `Create a script as function library`.

![How to create a Script as a Function Library](/engineering-education/shell-script-shell-function-library/create_script_as_function_library.png)

5. Next, type the name of the function library you want to use.
6. Enter the desired package name, which may be the name of your company or a generic package name that we produce for every Java program.
7. Enter your preferred Class name, which should be similar to the name of your function library.

![How to enter a class name](/engineering-education/shell-script-shell-function-library/class_name_entry.png)

8. Finish by clicking the Finish button.

After the function library has been built, the end-user may add the functions that they want to utilize in automation scripts.

### Using functions from the library
The following are the steps when using the function library:
- Any new automation script can be created.
- Make your way to the Assets section.
- Click Add after selecting the script's node.

![How to add a script](/engineering-education/shell-script-shell-function-library/adding_scripts_node.png)

- Enter the path to the function library we generated.
- Give it a suitable alias name (this name will be used in the scripts to call the functions )
- All functions in the function library are now ready for usage.

#### A simple demo using Bash script as a function library
The first step in this procedure is to build a shared library file that contains all of the script's functionalities. Make a function library file called `myfuncs.sh` in this directory.

```bash
function addem
{
   echo $[ $1 + $2 ]
}

function multem
{
  echo $[ $1 * $2 ]
}

function divem
{
  if [ $2 -ne 0 ]
  then
     echo $[ $1 / $2 ] 
  else
     echo -1 
  fi
}
```

Simply add the following line to a shell script to launch the myfuncs library file:

Next, include the `myfuncs.sh` library file in the script file that uses these functions. There is a problem with the scope of shell functions at this time. 

Shell functions, like environment variables, are only valid for the duration of the shell session in which they are specified. The function will not appear in the current script if you try to run the library file like a normal script file.

```bash
./myfuncs.sh

result=$(addem 5 10)
echo "The reslut is $result"
```

> In this example, `myfuncs.sh` and `test13.sh` are both located in the same directory. If not, you must access the file using the appropriate path.

### Usage of shell function library
The shell function library is relatively basic, but it is dependent on the user's usability and order of choice since it has the potential to seriously disrupt the code structure. If the user needs to alter the function, they may forget where it is kept. 

Shell function libraries are a fantastic method to become organized quickly and easily. It simplifies the process of memorizing or rewriting code over and over. 

It may save a lot of time and effort by allowing you to do things quickly and simply. This functionality of the Linux shell may be extremely useful in terms of increasing user productivity and maximizing time spent scripting files.

### Conclusion
In this article, we have learned what a script is, how to create one using the open script, and then demonstrated the use of the Shell Function Library using Bash scripts in Linux distributions. 

I urge the reader to continue researching this article for further knowledge on automation using function libraries.

Happy coding!

### Further reading
- [Introduction to shell scrpting](/engineering-education/introduction-to-shell-scripting/)
- [Dive into the Batch Scripting Language](/engineering-education/dive-into-batch-scripting-language/)
- [Introduction to Linux Shell and Shell Scripting](/engineering-education/introduction-to-linux-shell-and-shell-scripting/)

---
Peer Review Contributions by: [Rabo James Bature](/engineering-education/authors/rabo-james-bature/)
