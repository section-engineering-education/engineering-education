---
layout: engineering-education
status: publish
published: true
url: /introduction-to-linux-shell-and-shell-scripting/
title: Introduction to Linux Shell and Shell Scripting
description: This article describes the basics of shell scripting, terminologies used in shell scripting, the advantages, and disadvantages of shell scripting.
author: Dennis-Kariuki
date: 2021-07-11T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-linux-shell-and-shell-scripting/hero.png
    alt: Linux Shell and Shell Scripting example image
        
---
You interact with shell indirectly if you use any major operating system. At the point when you utilize a terminal on Ubuntu, Linux Mint, or some other Linux dissemination, you are interacting with the shell. 
<!--more-->

In this article, I will describe the Linux shells and shell scripting. However, before we can comprehend shell scripting, we must first learn the following terms: **Kernel**, **Shell** and **Terminal**.

### Prerequisites

You will need the following items to follow along with this tutorial:

- A code editor e.g., [Visual Studio Code](https://code.visualstudio.com/download)
- A computer running any Linux Operating system
> In this article, I have used the Ubuntu version 20.04 operating system
- Some knowledge on using Linux Operating Systems

### Table of contents

- [What is the kernel](#what-is-the-kernel)
- [What is a Shell](#what-is-a-shell)
- [Shell Scripting](#shell-scripting)
- [Why do we need shell scripts](#why-do-we-need-shell-scripts)
- [Easy demo of Bash Shell scripting](#easy-demo-of-bash-shell-scripting)

### What is the kernel

The `kernel` is computer software that is at the heart of a computer's operating system, controlling everything in it. It is in charge of the following Linux system's resources:

- File administration
- Management of processes
- Management of I/O
- Device management, memory management, and so forth.

Linus Torvalds is sometimes misidentified as the creator of the Linux operating system, but he is only responsible for the creation of the Linux kernel.

A complete Linux kernel consists of:

- The Kernel
- The GNU system utilities and libraries
- Additional management scripts
- Installation scripts

### What is a Shell

A `shell` is a unique user program that allows users to interact with operating system functions. Shell accepts user-readable commands and converts them to kernel-friendly. It is an interpreter for commands that can read and run commands on keyboards or files. When a user logs in or launches a terminal, the shell is launched.

Shells can be divided into two categories:

1. Command-Line shell
2. Graphical shell

#### Command-Line shell

Shell access is possible through a shell interface shell. A certain tool called 'Terminal' is used to key in human-readable commands like `cat` and `ls` in Linux/macOS or 'command prompt' in Windows, which subsequently carries out tasks. The user is then shown the result on the terminal. This is how an Ubuntu  terminal looks like:

![output](/engineering-education/introduction-to-linux-shell-and-shell-scripting/ubuntu_terminal.png)

The `ls` command is used with the `-l` option in the screenshot above. For a long listing, the files are displayed in the current working directory.

Working with the command line shell can be challenging for beginners since there are so many commands to remember. It is extremely powerful because it allows users to save commands in a file and then execute them all at once. Any repetitious task can be easily automated this way. Batch records in Windows and Shell Scripts in Linux/macOS frameworks are normal names for these documents.

#### Graphical shell

Graphical shells allow the use of a `GUI` program for open, close, move and resize windows, as well as to switch focus between window sizes. Window Operating systems or Ubuntu Operating systems are notable examples of operating systems that provide a graphical user interface (GUI) for interacting with programs. For each activity, the user does not need to enter a command. A typical Ubuntu user interface is shown below:

![output](/engineering-education/introduction-to-linux-shell-and-shell-scripting/ubuntu_GUI.png)

For Linux systems, there are various shells available, such as:

1. **Bourne Again Shell (BASH)**: In Linux systems, it is the most extensively used shell. It is the default login shell on Linux and macOS computers. The system is also Windows-compatible.

2. **C Shell (CSH)**: The C shell is very much like the C programming language's syntax and use.

3. **Korn Shell (KSH)**: The Korn shell also served as the foundation for the POSIX Shell standard requirements, among other things.

Each shell accomplishes the same task, but it recognizes various commands and has distinct built-in functionalities.

### Shell Scripting

Shells are usually interactive, so they accept and execute user commands. However, sometimes we need to regularly execute a range of instructions and we have to enter all commands each time on the terminal.

We can write and execute these commands in the shell to avoid this repetitive work because the shell can take the commands from the files as the input. **Shell Scripts** or **Shell Programs** are the names given to these files. The MS-DOS batch file is similar to the shell scripts. There is an extension to `.sh` in each shell script such as `myscript.sh`.

Shell scripts have the same syntax as other programming languages. If you are familiar with any programming language such as Python, C/C++, or others, they will be easy to create.

The following pieces make up a shell script:

- Shell keywords such as `if, else, and break`
- Shell commands such as `cd, ls, echo, PWD, and touch`
- Functions
- Control flow such as `If...then...else, case and shell loops`

### Why do we need shell scripts?

Shell scripts come in handy for several reasons:

1. To avoid repetitive work and the use of automation
2. Shell scripting is used by system administrators to do routine backups
3. Monitoring of the system
4. Incorporating additional features into the shell

#### Advantages of shell scripts

1. The programmer does not need to move to a different syntax because the command and syntax are identical to those typed directly on the command line
2. Shell scripts are much faster to write than Java scripts
3. Getting started quickly
4. Debugging in real-time

#### Disadvantages of shell scripts

1. Prone to costly blunders, a single blunder can change the directive, perhaps causing harm.
2. Execution time is slow.
3. Design defects in the syntax or implementation of the language
4. Unlike other scripting languages, it is not well suited for large and sophisticated tasks and only provides a limited data structure

### Easy demo of Bash Shell scripting

In this demo, we will do a bash script of incrementing a variable three times with an increment operator.

#### Procedure

1. Open the terminal, move to the desktop directory, and run the following command to create a file and name it as `firstscript.sh`:

```bash
$  touch "name of the file"
```

2. Run the `ls -l` command to view the permissions of the file you have created.

From the command above, the read and write permissions are enabled and no executable permission of the file is enabled.

3. To enable the executable permissions, run the command below:

```bash
$  chmod +x "name of the file"
```

4. Open the file you created  and copy/paste the text below:

```bash
#!/bin/bash

VAR=1

echo "$VAR"


VAR=$((VAR+=1))
echo "$VAR"

VAR=$((VAR+=1))
echo "$VAR"

VAR=$((VAR+=1))
echo "$VAR"
```

5. Run the command below to open the file you created:

```bash
$  ./"your file name"
```

 It will display incremented variables 1 to 4 as shown below.

![output](/engineering-education/introduction-to-linux-shell-and-shell-scripting/bash_script.png)

### Conclusion

In the article, we have learned the basics of shell scripting, understood the terminologies used in shell scripting, the advantages, and disadvantages of shell scripting, and done an example of Bash shell scripting. I urge readers to use the knowledge learned above to create and learn more shell scripts to understand more about shell scripting.

---

Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)