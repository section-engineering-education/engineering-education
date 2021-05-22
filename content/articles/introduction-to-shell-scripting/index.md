---
layout: engineering-education
status: publish
published: true
url: /introduction-to-shell-scripting/
title: Introduction to Shell Scripting
description: A shell script is a computer program designed to be run by the Unix shell. Typical operations performed by shell scripts include file manipulation, program execution, and printing text.
author: rohan-reddy
date: 2020-06-20T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-shell-scripting/hero.jpg
    alt: shell scripting example image
---
If you are familiar with a programming language like python or C, then it should be pretty easy to get started with shell scripting. This article can be used as a "cheat sheet" as well.
<!--more-->

![Shell Scripting](/engineering-education/introduction-to-shell-scripting/shell-scripting-image.png)<br>
*Image Source:[etlhive](https://www.etlhive.com/wp-content/uploads/2017/06/Shell-Scripting-Image.jpg)*

### Shell Scripting
The shell is a program that provides the user with an interface to use the operating system's functions through some commands. A shell script is a program that is used to perform specific tasks.

Shell scripts are mostly used to avoid repetitive work. You can write a script to automate a set of instructions to be executed one after the other, instead of typing in the commands one after the other *n* number of times.

In this article, we'll go through some commands for BASH (Bourne Again SHell), which is the most widely used shell and also the default in most Linux systems, which most servers use as their operating system. Shell scripting is particularly useful for DevOps and backend development.

### Basic example
A typical script might look like this:
```
#!/bin/bash
echo "Welcome!! Please Enter Your Name"
read name
echo "Hello $name"
```

Let's break down the above code:

```
#!/bin/bash
```

A line starting with `#!` is used to tell the os which interpreter to use to execute the file. There are many shell interpreters like ksh, zsh(macOS), csh(C shell), ssh(secure shell), etc. The above line asks the system to use the bash interpreter.

```
echo "Welcome!! Please Enter your Name"
````

The `echo` keyword is used to output the strings that it is being passed as arguments. It outputs onto the **[stdout](https://en.wikipedia.org/wiki/Standard_streams)**.

```
read name
```

The `read` command is used to receive input while running the script. When we wrote `read name` it initialized a variable named `name` and stored the input in it.

```
echo "Hello $name"
```

The `$` symbol is used to print the **value** of a variable. In the above example, it prints whatever input was given in the previous step.

### Executing the file
Now that we have seen what a typical shell script looks like, let's look at how to execute the file.
1. Save the file with a `.sh` extension
2. To execute the file, first we need to give it execute permissions.
   ```
   chmod +x filepath/filename.sh
   ```
3. To execute the file, we can do it in the following ways
	- If you are using a GUI file navigation system, right-click on the file and click on `run` or `execute`.
	- If you are using the terminal, `./filename.sh` will execute the script. (Make sure you are in the correct directory!)
	![Screenshot](/engineering-education/introduction-to-shell-scripting/shell-scripting-image.png)

Now, let's discuss shell scripting in a little more detail.

### Variables
Variables in shell scripting are similar to variables in general programming languages; they are used as a pointer to the actual data. Variables do not have to be declared, as compared to programming languages like C, but if you try to read from an *undeclared* variable, then you will not get intended results.

```
my_name="Rohan Reddy"
echo $my_name
```

#### Naming conventions of variables
1. All caps and underscores for exported variables and constants, when they are **shared across multiple scripts**. Ex: `JOB_ID`, `PROCESS_NAME`
2. All lowercase and underscores for all variables that are **scoped to a single script**. Ex: `max_amount` , `i`.
3. Use leading underscore for **private variables and functions**; can be used where functions share the same variables without clashing with similarly named variables in the code. Ex: `_debug`

**When you are declaring variables, make sure there are no spaces before and after `=`.** (`a=12` is correct; `a = 12` throws an error.)

### Special Keywords and Variables
`$PWD`, this variable contains the value of the **Present Working Directory**

Arguments passed from the **command line** can be accessed by using `$0`, `$1`, `$2`, … notation. `$0` is the name of the script itself, `$1` is the first argument, `$2` is the second argument and so on.

```
./script 1 2 3
```
**Note:** These variables not only work from the command line, but also with functions. You should use functions to organize your bash code just like your would in another language. Variables can be passed to functions just like you do with the command line, using `$1`, `$2`, etc.

At the end of your script, try something like:
```
if [ -z "$@" ]; then
	main
else
	"$@"
fi
```
This will allow you to test individual functions like `./myscript.sh function1` or `./myscript.sh function2 arg1`, and have your "main" entry function run by default.

- `$0 = scriptname`
- `first_argument = $1`: We can assign it to variables<br>
- `$#`: This variable contains the number of arguments supplied to the script.
- `$?`: The exit status of the last command executed. Most commands return 0 if they were successful and 1 if they were unsuccessful.
- Comments in shell scripting start with `#` symbol.



### Control-flow Constructs

#### *If-else statements*
**Simple if statement**
```
if [expression]
		statement
	if
```

**Simple if-else statement**
```
if [expression]
	then
		command1
	else
		command2
	if
```

**if-else_if-else statement**
```
if [expression]
	then
		statement1
	else [expression2]
	then
		statement2
	else
		statement3
	if
```

**Nested if statements**
```
if[expression1]
	then
		if [expression2]
			then
				statement1
			else
				statement2
		if
	else
		statement3
	if
```

### Switch-Case

The switch statement is a multiway branch statement. It provides an easy way to dispatch execution to different parts of code based on the value of the expression. In shell scripting, we have the `case` command for this.

```
case "$var" in
		#case 1
		pattern_1) statement_1;;

		#case 2
		patter_2) statement_2;;
case
```

**Example:**

```
id=1
case $id in
	#case 1
	1) echo "ID is 1";;
	#case 2
	2) echo "ID is 2";;
case
```

### Loops
Loops are powerful tools that help us execute a set of commands repeatedly.

**While loop** executes the given commands until the given condition becomes false.

```
while condition
	do
		statement
	done
```

**Example:**

```
#!/bin/sh
	cars=10
	while [ "$cars" -gt 0 ]
	do
		cars=`expr $cars - 1`
		echo $cars
	done
```
*When writing shell scripts, be mindful of where spaces should exist and where there should be no spaces.*

**For loop** is an efficient way of writing loops. Syntax:

```
for i in range
	do
		command
	done
```

### Examples
We can loop over a range of numbers, loop over an array of numbers, or loop over the output from a command.

**Example 1:**
```
for i in 1 2 3 4 5
	do
		echo $i   #prints 1 to 5
	done
```

**Example 2:**
```
for i in {1..5}
	do
		echo $i 	#can be used to specify range
	done
```

**Example 3:**

```
#!/bin/bash
	for (( c=1; c<=5; c++ ))	#this is one of the ways we can write loops which is similar to C-style loops
	do
	   echo "Welcome $c times"
	done
```

### Break & Continue

**`break`** and **`continue`** keywords can be used with the same meaning as any programming languages. `break` is used to stop the execution of a loop, and `continue` can be used to cause the loop to execute the next iteration.

*We'll talk about more advanced topics like `sed`, `awk` and regular expressions in the next post.*

### More Helpful Tips
#### Debugging
Putting set `-o xtrace` and `set -o errexit` can often help debug bash scripts. xtrace will print each bash line as they run, and errexit will exit the script if a command returns a status of something other than 0. '$?' will show the last status code.

For example, include this at the top of your scripts:
```
test -z "${DEBUG}" || set -o xtrace
set -o errexit
```
The first line checks if a DEBUG environment variable is set, and if it is, it will print each bash line. The second makes the script exit when there was an error on a command.

### Important Note
There are many scripting languages, and nearly any programming language can be used to write scripts (python, ruby, go, javascript, etc.). These have many advantages over bash with regard to data manipulation and simplicity. Bash has the advantage of running on nearly any Linux machine without prior install effort. Always consider the complexity of your scripting task and ask if it's really necessary to use bash. Bash should largely be reserved for tasks where another language would be cumbersome.

### Additional Resources and References

- [The Linux Documentation Project](https://www.tldp.org/LDP/Bash-Beginners-Guide/html/)
- [https://www.tutorialspoint.com/unix](https://www.tutorialspoint.com/unix)
- [ShellCheck](https://github.com/koalaman/shellcheck) -  can be installed as a VS Code extension to catch many bash errors that are easy to make.
