# Dive-into-Batch-scripting-language
### Introduction
**Batch** commands are often used to start programs or to control them in the Windows environment. Also, it can be used for server installations.
If you write a sequence of **Batch** commands and save the file with the extension **.bat** or **.cmd** then the file is called **Batch file**.

#### Why Batch programming language?
- **Powerful**: you can execute a lot of complicated operations by one command.
- The commands are **short** so that they are easy to remember.
- Major **time saving**.

### Prerequisites
Before we dive right in, the reader would need to have the following:
- A good understanding of any programming language.
- A basic understanding of system programming.

### Create a Batch file
Creating a **Batch** file is very easy, you have to open any text editor then saving that file with an extension **.bat**.
If you want to run that file you need to click on it or calling it by the command prompt.

### Let's Code!
By default, when you run a **Batch** file it displays every command is currently executing, in order to turn off this display you have to use:
```batch
@echoo off
```
We used "@" sign to made the command apply to itself too. 

Now let's create our first **Batch** file which will list all the files names in a new text file.
```batch
@echoo off
dir "C:\Program Files" > D:\list.txt
```
The ">" symbol is used to make the output in a text file instead of the standard output.

You can input data from the user by using the arguments %number.
For example:
```batch
@echoo off
dir %1 > %2
```
This type of command can not be clicked directly. If you want to run the code above you have to use the command prompt like the following example:
```batch
C:\code D:\ D:\list.txt
```
Where D:\ represents %1 and D:\list.txt represents %2.

Now we will list all of the subfolders as well:
```batch
@echoo off
dir /s "C:\Program Files" > D:\list.txt
```
The ability to use the wildcards in a **Batch** file greatly enhances the power of it. For example, let's make a list of every MP3 file in the C drive:
```batch
@echoo off
dir /s "C:\*.mp3" > D:\list.txt
```
You can use ```xcopy``` to create a backup for the files:
```batch
@echoo off
xcopy %1 %2 /s
```
In the code above you can make a backup of the "first input folder" %1 files and its subfolders files to the second folder %2.
To include any hidden file you have to add the /h command-line option also you can add /e to include any empty subdirectories.

Now let's create a simple code to delete all temporary files with the extension **TMP**:
```batch
@echoo off
del %1\*.tmp
```
The execution process of a **Batch** file is line-by-line. However, you can use "goto" command which gives you the capability to jump into a particular section of your code.

Now let's build an app that transferring all the files in the subdirectories of a directory to another one.
```batch
xcopy %1 %2 /s /e
if errorlevel 4 goto :meomryislow
if errorlevel 0 goto :exit
: meomryislow
echo Invalid drive or low memory.
goto :exit
:exit
```
If you want to make changes to the **CMD** environment variables you can use the **SET** command which provides you the ability to set, delete or display an environment variable, but be aware that those changes will affect only the current CMD. Let's take a look at the syntax of the **SET** command:

```batch
SET variable=string
REM this is a comment
REM the environment variable can be a new or an existing one.
SET /A "variable=arithmetic expression"
SET /P variable=[a string]
```
For example, open your terminal then type ```SET windir```, it will display ```windir=C:\WINDOWS```.

Let's make a simple divid operation that takes the numbers from the user:
```batch
@echo off
set /p x=type the first number:
set /p y=type the seconde number:
set /a z= %x% / %y%
if %y%==0 (
    echo error
) else (
    echo The answer is %z%
)
```
There are a lot of possibilities with **Batch**. For example, you can make a ping request by:
```batch
@echo off
echo please wait
ping google.com -n 1| find "Reply from"
if %errorlevel% GTR 0 echo you are not connected
if not %errorlevel% GTR 0 echo you are connected
```
In the code above we did one ping request on google.com.
The GTR is an expression for "greater than" also you can use the following:
|   Operator	|   Meaning	|
|---	|---	|
|   EQU	|   equal to	|   	
|   NEQ	|   not equal to	|
|   LSS	|   less than	| 
|   LEQ	|   less than or equal to	|   		
|   GEQ	|   greater than or equal to	|   	

Let's create a calculator using **Batch**:
```batch
@echo off
title Calculator
color 2e
:the top
echo Write an expression:
set /p expr=
set /a ans=%expr%
echo %expr%=%ans%
pause
goto :top
```
If you run the code above then the result will be the following:

![](/engineering-education/dive-into-batch-scripting-language/1.PNG)

### Environment variables
We talked about the **SET** command in previous examples, now we are going to extend your knowledge with environment variables by some examples.
#### Delete a variable  
If you type the name of the variable with an equal sign then the variable will be deleted. Like the following:
```batch
SET variablename=
```
#### Permanent Setting 
To make permanent changes you have to use ```SETX```. It extends the ```SET``` command so that any change for the environment variable will be permanent. The command of adding a folder to the path is:
```batch
setx PATH=%PATH%;C:\the-path-you-want-here\
```
The edits made by **SETX** will affect only the next command window, it will not affect the current one, because it writes the variables to the master environment in the registry.

Now let's learn how to detect if the variable name is not found. We have to use %ERRORLEVEL% which will be equal to 1 if the command didn't find the variable name. For example:
```batch
If %ERRORLEVEL% ==1 (echo error) 
```
### Assoc
You can manage files extensions, displays an existing association, or deletes one by the ```assoc``` command. 

For example, if you type ```assoc``` in your terminal, it will display every file associations that exists on your machine.

Another example:
```batch
assoc | find ".doc" > D:\list.txt
```
The file associations now will be in the file lists.txt. The output for the above code will be:
```
.doc=Word.Document.8
.dochtml=wordhtmlfile
.docm=Word.DocumentMacroEnabled.12
.docmhtml=wordmhtmlfile
.docx=Word.Document.12
.docxml=wordxmlfile
```
### Conclusion
In this tutorial, we learned the most important things about the **Batch** scripting language. If you are interested in system programming I recommend you start learning Windows [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7). Unlike most shells, which accept and return text, PowerShell is built on top of the .NET Common Language Runtime (CLR) which accepts and returns .NET objects. However, **Batch** will still very important to run utilities in the Windows environment.
