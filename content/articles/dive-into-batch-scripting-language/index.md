---
layout: engineering-education
status: publish
published: true
url: /dive-into-batch-scripting-language/
title: Dive into the Batch Scripting Language
description: In this tutorial we will go through how to
author: ahmad-mardeni
date: 2020-11-24T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dive-into-batch-scripting-language/hero.png
    alt: Batch Scripting example image
---
Batch commands are often used to start programs or to control them in the Windows environment. It can also be used for server installations.
<!--more-->

### Introduction
If you write a sequence of Batch commands and save the file with the extension `.bat` or `.cmd` then the file is called a Batch file.

#### Why Batch programming language?
- **Powerful**: you can execute a lot of complicated operations by one command.
- The commands are **short** so that they are easy to remember and can save your time.

### Prerequisites
Before we dive right in, the reader would need to have the following:
- A good understanding of any programming language.
- A basic understanding of system programming.
- A basic knowledge of the Command Prompt.

### Create a Batch file
Creating a Batch file is very easy, open any text editor then save that file with an extension `.bat`.
If you want to run that file you need to click on it or call it by the command prompt.

### Let's code!
By default, when you run a Batch file it displays every command it's currently executing. In order to turn off this display you have to use:
```batch
@echo off
```

We used the "@" sign to prevent the command from appearing as well.

Now let's create our first Batch file that will list all the files names in a new text file.
```batch
@echo off
dir "E:\Section.io" > D:\list.txt
```

The ">" symbol is used to put the output in a text file instead of the standard output. The **standard output** refers to the standardized streams of data that are produced by the CMD which is a plain text that appears in the CMD.

You can input data from the user by using the arguments %number.

For example:
```batch
@echo off
dir %1 > %2
```

This type of command can't be clicked directly. If you want to run the code above you have to use the command prompt with the following example:

```batch
C:\code D:\ D:\list.txt
```

Where D:\ represents %1 and D:\list.txt represents %2.

Now we will list all of the subfolders as well:

```batch
@echo off
dir /s "E:\Section.io" > D:\list.txt
```

The ability to use the wildcards in a Batch file greatly enhances the power of it. For example, let's display the name of every MP3 file in the C drive:

```batch
@echo off
dir /s "C:\*.mp3"
```

You can use `xcopy` to create a backup for the files:

```batch
@echo off
xcopy %1 %2 /s
```

In the code above you can make a backup of the first folder(%1) files and its subfolders files in the second folder(%2).
To include any hidden file you have to add the `/h` command-line option. Also, you can add `/e` to include any empty subdirectories.

Now let's create a simple script to delete all temporary files with the extension `TMP`:

```batch
@echo off
del %1\*.tmp
```

The execution process of a Batch file is line-by-line. However, you can use the `goto` command that gives you the capability to jump into a particular section of your code.

Now let's build an app that transfers all the files in the subdirectories of a directory to another one.

```batch
xcopy %1 %2 /s /e
if errorlevel 4 goto :memoryislow
if errorlevel 0 goto :exit
: memoryislow
echo Invalid drive or low memory.
goto :exit
:exit
```

The colon represents a label you can jump to.

Now let's talk about the `REM` command that allows you to make a comment in a batch file, anything following the `REM` will be igonred.

Another way to make a comment in a batch file is by using :: instead of `REM`, but be aware that if you are using too many `REM` it may slow down your code because the batch file executes every line of code.

If you want to make changes to the CMD environment variables you can use the `SET` command that provides you the ability to set, delete, or display an environment variable, but be aware that those changes will affect only the current CMD.

Let's take a look at the syntax:

```batch
SET variable=string
REM this is a comment
REM the environment variable can be a new or an existing one.
```

For example, open your terminal then type `SET windir`, it will display `C:\WINDOWS` which is the value of that variable.

You can use a switch `/A` with the `SET` command in order to make some basic arithmetic operations:

|Symbol| Operation|
|---|---|
|   +	|   Addition	|
|   -	|   Subtraction	|
|   *	|   Multiplication	|
|   /	|   Division	|

The syntax will be:
```batch
SET /A variable=arithmetic expression
```

If you want to enter the input from a user you can add a switch `/P`, then the batch file will wait for the user to enter a value.

Let's make a simple divide operation that takes the numbers from the user:
```batch
@echo off
set /p x=type the first number:
set /p y=type the second number:
set /a z= %x% / %y%
if %y%==0 (
    echo error
) else (
    echo The answer is %z%
)
```

There are many possibilities with Batch.

For example, you can make a [ping](https://en.wikipedia.org/wiki/Ping_(networking_utility)) request by:
```batch
@echo off
echo please wait
ping google.com -n 1| find "Reply from"
if %errorlevel% GTR 0 echo you are not connected
if not %errorlevel% GTR 0 echo you are connected
```

In the code above we did one ping request on google.com.
The GTR is an expression for "greater than", you can also use the following:

|   Operator	|   Meaning	|
|---	|---	|
|   EQU	|   equal to	|   	
|   NEQ	|   not equal to	|
|   LSS	|   less than	|
|   LEQ	|   less than or equal to	|   		
|   GEQ	|   greater than or equal to	|   	

Let's create a calculator using Batch:
```batch
@echo off
title Calculator
color 2e
:top
echo Write an expression:
set /p expr=
set /a ans=%expr%
echo %expr%=%ans%
pause
goto :top
```

The title allows you to change the name of the window to whatever you want.

You can change the color simply by using the following:

|   Symbol	|   Color	|   Symbol	|  Color 	|
|---	|---	|---	|---	|   	
|   0	|   Black	|   8	|   Gray	|   	   	
|   1	|   Navy	|   9	|   Blue	|   	   	
|   2	|   Green	|   A	|   Lime	|   	   	
|   3	|   Teal	|   B	|   Aqua	|   	   	
|   4	|   Maroon	|   C	|   Red	|   	   	
|   5	|   Purple	|   D	|   Fuchsia	|   	   	
|   6	|   Olive	|   E	|   Yellow	|   	  
|   7	|   Silver	|   F	|   White	|   

In our code we used "2e", the first digit is for the background, and the second one is for the text color.
If you run the code above, you will see the following:

![Calculator](/engineering-education/dive-into-batch-scripting-language/1.PNG)

### Environment variables
We talked about the `SET` command in previous examples, now we are going to build on that knowledge of environment variables with some examples.

#### Delete a variable  
If you type the name of the variable with an equal sign then the variable will be deleted.

Like the following:
```batch
SET variablename=
```

#### Permanent setting
To make permanent changes you have to use `SETX`. It extends the `SET` command so that any change for the environment variable will be permanent.

The command of adding a folder to the path is:
```batch
setx PATH=%PATH%;C:\the-path-you-want-here\
```

The edits made by `SETX` will affect only the next command window. It will not affect the current one, because it writes the variables to the master environment in the registry.

Now let's learn how to detect if the variable name is not found. We have to use %ERRORLEVEL% that will be equal to 1 if the command didn't find the variable name.

For example:
```batch
@echo off
set ahmad
If %ERRORLEVEL% == 1 (echo error)
```

The output will be `error`.

### Assoc
You can manage files extensions, display an existing association, or delete one by the `assoc` command.

For example, if you type `assoc` in your terminal, it will display every file associations that exists on your machine.

Another example:
```batch
assoc | find ".doc" > D:\list.txt
```

The pipe will redirect `assoc` in the input of the `find` and will be used as the second parameter of it.

The file associations output now will be in the file lists.txt:
```batch
.doc=Word.Document.8
.dochtml=wordhtmlfile
.docm=Word.DocumentMacroEnabled.12
.docmhtml=wordmhtmlfile
.docx=Word.Document.12
.docxml=wordxmlfile
```

### Conclusion
In this tutorial, we learned the most important things about the Batch scripting language. If you are interested in system programming. I recommend you learn Windows [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7).

Unlike most shells, that accept and return text, PowerShell is built on top of the .NET Common Language Runtime (CLR) which accepts and returns .NET objects. However, Batch will still be very important to run utilities in the Windows environment.

---
Peer Review Contributions by: [Mike White](/engineering-education/authors/mike-white/)
