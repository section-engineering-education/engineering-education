
# Introduction to Shell Scripting
![](https://www.etlhive.com/wp-content/uploads/2017/06/Shell-Scripting-Image.jpg )
## Shell Scripting
The shell is a program which provides the user with an interface for the user to use the operating system's functions through some commands. A shell script is a program that is used to perform specific tasks. Shell scripts contain the commands as mentioned above, and they are used to avoid repetitive work. You can write a script to automate a set of instructions to be executed one after the other, instead of typing in the commands one after the other *n* number of times. We learn the commands for BASH (Bourne Again SHell) which is the most widely used shell, and this is the default in most of the Linux systems. Most of the servers use Linux as their operating system. Shell scripting is useful for DevOps and backend development.

If you are familiar with a programming language like python or C, then it should be pretty easy to get started with shell scripting. This article can be used as a "cheat sheet" as well.

A typical script looks like this.
	
	#!/bin/bash
	echo Welcome!! Please Enter Your Name
	read name
	echo Hello $name
Lets examine the above code
>#!/bin/bash

If a line starts with `#!` then it is used to tell the os which interpreter to use to execute the file. There are many shell interpreters like ksh, zsh(macOS), csh(C shell), ssh(secure shell), etc. The above line asks the system to use the bash interpreter.
>echo Welcome!! Please Enter your Name

The `echo` keyword is used outputting the strings it is being passed as arguments. It outputs onto the STDOUT.
> read name

The `read ` command is used to receive input while running the script. When we wrote `read name` it initialized a variable named `name` and stored the input in it.
>echo Hello $name

The `$` symbol is used to print the **value** of a variable, in the above case, it prints whatever input was given in the previous step.

You have looked at how a typical shell script looks like, now let's see how to execute the file.
1. Save the file with a `.sh` extension 
2. To execute the file, first, we need to give it execute permissions to do this.
		
		chmod +x filepath/filename.sh 
3. Execute the file we can do it in the following ways. If you are using a GUI file navigation system, right-click on the file and click on `run` or `execute`. If you are using the terminal, `./filename.sh`  will execute the script (make sure you are in the correct directory!).
![img](0.png)
Let's discuss shell scripting in a little more details



<!Spell Check Completed>


## Variables

Variables in shell scripting are similar to variables in general programming languages, they are used as a pointer to the actual data. Variables do not have to be declared, as compared to programming languages like C, but if you try to read from an *undeclared*variable then you will not get intended results.

	my_name="Rohan Reddy"
	echo $my_name
Naming Conventions of variables
1. All caps and underscores for exported variables and constants, when they are shared across multiple scripts. Ex: `JOB_ID`, `PROCESS_NAME`
2. All lowercase and underscores for all variables that are scoped to a single script. Ex: `max_amount` , `i`.
3. Use leading underscore for private variables and functions, can be used where functions share the same variables without clashing with similary named variables in the code. Ex: `_debug

**When we are declaring variables, make sure there are no spaces before and after `=` , `a=12` is correct `a = 12` throws an error**.

#### Special Keywords and Variables
* $PWD, this variable contains the value of the **Present Working Directory**.
* **Arguments passed from the command line** can be accessed by using $0, $1, $2, ... notation. $0 is the name of the script itself, $1 is the first argument, $2 is the second argument and so on. 
	* `./script 1 2 3 `
	* $0 = scriptname
	* first_argument = $1 #we can assign it to variables
	* `$#` this variable contains the number of arguments supplied to the script.
* `$?` The exit status of the last command executed. Most commands return 0 if they were successful and 1 if they were unsuccessful.
* Comments in shell scripting start with `#` symbol.

## Control-flow Constructs

### If-else statements
Useful for decision making, we can use it like a typical if-else ladder and use nested if-else statements, similar to programming languages.
	
Simple If statement
	
	if [expression]
		statement
	fi
Simple If-else statement

	if [expression]
	then 
		command1
	else
		command2
	fi
if-else_if-else statement
	
	if [expression]
	then
		statement1
	elif [expression2]
	then 
		statement2
	else
		statement3
	fi
Nested if statements
	
	if[expression1]
	then 
		if [expression2]
			then
				statement1
			else
				statement2
		fi
	else
		statement3
	fi
### Switch-Case 
The switch statement is a multiway branch statement. It provides an easy way to dispatch execution to different parts of code based on the value of the expression. In shell scripting we have the `case` command for this.

	case "$var" in
		#case 1
		pattern_1) statement_1;;
		
		#case 2
		patter_2) statement_2;;
	esac
Example:
	
	id=1
	case $id in 
		#case 1
		1) echo "ID is 1";;
		#case 2
		2) echo "ID is 2";;
	esac

### Loops
Loops are powerful tools which help us execute a set of commands repeatedly.

**While loop** executes the given commands until the given condition becomes false.
	
	while condition
	do 
		statement
	done
Example
	
	#!/bin/sh
	cars=10
	while [ "$cars" -gt 0 ]
	do
		cars=`expr $cars - 1`
		echo $cars
	done
*When writing shell scripts, please keep in mind where spaces should come and where there should be no spaces.*

**For loop** is an  efficient way of writing loops. 
Syntax
	
	for i in range
	do
		command
	done
Examples
We can loop over a range of numbers, loop over an array of numbers or loop over the output from a command.
	
							Example 1
	for i in 1 2 3 4 5
	do 
		echo $i   #prints 1 to 5
	done
							Example 2
	for i in {1..5}
	do
		echo $i 	#can be used to specify range 
	done
							Example 3
	#!/bin/bash
	for (( c=1; c<=5; c++ ))	#this is one of the ways we can write loops which is similar to C style loops
	do								  
	   echo "Welcome $c times"
	done					


**`break`** and **`continue`** keywords can be used with the same meaning as any programming languages. `break` is is used to stop the execution of a loop, and `continue` can be used to cause the loop to execute the next iteration.

*We'll talk about more advanced topics like `sed` , `awk` and regular expressions in the next post.*

Image Credits

* [https://www.etlhive.com/wp-content/uploads/2017/06/Shell-Scripting-Image.jpg](https://www.etlhive.com/wp-content/uploads/2017/06/Shell-Scripting-Image.jpg)


Resources and References

* [The Linux Documentation Project](https://www.tldp.org/LDP/Bash-Beginners-Guide/html/)
* [https://www.tutorialspoint.com/unix](https://www.tutorialspoint.com/unix)

