---
layout: engineering-education
status: publish
published: true
url: /understanding-fundamentals-programming-principles/
title: Understanding Fundamental Programming Principles
description: This article deals with different steps of program development, and various programming languages used as they have a unique sequence, order, and rules of writing characters.
author: christine-muthoni
date: 2021-10-18T00:00:00-06:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-fundamentals-programming-principles/hero.jpg
    alt: Understanding Fundamental Programming Principles Hero Image
---
Programming is the process of developing computer programs using different languages and tools. This article deals with different steps of program development, and various programming languages used as they have a unique sequence, order, and rules of writing characters.
<!--more-->
By understanding fundamental programming principles, you familiarize yourself with these different programming languages and the stages of creating a software.

### Table of contents
- [Programming languages](#programming-languages)
- [Program development](#program-development)
- [Program documentation](#program-documentation)
- [Common tools used for programming languages](#common-tools-used-for-programming-languages)
- [Conclusion](#conclusion)

### Programming languages
There are two main categories of programming languages:
1. Low-level languages.
2. High-level languages.

### Low-level languages
Machines understand low-level languages and need little effort to translate them into object code.

#### Classification of low-level languages
##### Machine language
Machine language uses binary logic since it is the only language that a microprocessor understand. Machine language is fast to execute since it is already in machine-readable format.

##### Assembly language
It uses symbolic representation known as mnemonics (memory aids), which are easy to understand than a machine language. Programs written in assembly language need an assembler to translate to machine-readable form.

### High-level languages
High-level languages are close to the human language and are understandable by people who are not experts in programming.

#### Classification of high-level languages
##### Third-generation languages
Their instructions get written in a sequence or in a specific order in which they get executed. It emphasizes the use of control structures.

Examples of Third-generation languages are Fortran, ALGOL, BASIC, C, COBOL, Java, Pascal.

##### Fourth-generation languages
They provide the user with more inbuilt programming tools like a graphical user interface.

Examples of fourth-generation languages are SQL, Oracle, PHP.

##### Fifth-generation languages
They are used in artificial intelligence to make computers that depict human-like intelligence.

Examples of fifth-generation languages are Mercury, Prolog, OPS5

##### Object-oriented programming languages
They make it easier to develop, debug, reuse, and maintain software compared to earlier languages.

Examples of OOP are C++, Java, Smalltalk, Visual Basic.

##### Web scripting languages
They develop/add pictures to a web page. Web scripting languages do not have declaration parts neither do they have control structures.

Examples of web scripting languages are JavaScript, XML, Perl, Python, Ruby, Groovy.

### Program development
Program Development refers to the process of creating software, and it is categorized into the following stages:
1. Problem recognition - Here, the programmer should understand and interpret the problem.
2. Problem definition - The programmer identifies the required input, processing activities, and output. The programmer also identifies ways of solving the same problem and picks the best. Written documentation is required for the design stage.
3. Program Design - At this stage, the programmer develops a problem-solving project called an algorithm, a limited number of logical steps that a program follows to solve a problem. At this stage, tools such as pseudocodes, flowcharts, and decision tables are helpful.
4. Program Coding - The algorithm gets translated into an equal programming language code. In program coding, the programmer may use different control structures.

#### Program control structures
##### Sequence control
Here, the computer reads instructions from a program file from the first statement to the last.

Below is an example of Sequence control structures in pseudo-code form:

```bash
START
x=1
y=1           the output will be 2,4,5
y=y+1
m=y^2
x=x + m
print y, m, x
STOP
```

Its syntax is:

```bash
START
statement 1
statement 2
.
.
.
statement n
STOP
```

##### Selection control structures
A statement is executed if the condition returns `true` or `false`.

The condition must be a Boolean expression.

There are different types of selection control structures.

For example:

##### 1. If
The statement if is used when only one option is available.

When the condition is true, all other options get ignored.

Its syntax in general form is:

```bash
if(condition)Then
statement to be executed
if the condition is true
End If
```

##### 2. If Else
It is suitable when there are two available options.

For example, if a condition is `true`, the statement gets executed, if it is `false`, an alternative statement gets executed.

Its syntax in general form is:

```bash
if(condition) then
statement if the condition is true
else
statements if the condition is false
End if
```

##### 3. If Else If (Nested If)
The If Else If statement is used when there are more than two options to consider before making a selection.

Its syntax in general form is:

```bash
if (condition) then
statement 1
else if (condition 2) then
statement 2
.
.
.
else if (condition n-1) then
statement n
end if
end if
end if
```

#### Looping control structures
These control structures get designed to execute the same block of code repeatedly until a condition is met.

There are different types of looping control structures.

For example:

##### 1. The while loop
The `while` loop is used if a condition is met before statements within the loop get executed. Its syntax in general form is:

```bash
while(condition)Do
statement to execute
end while
```

##### 2. Repeat-until
It allows statements to execute at least once.

The statements get executed until the condition becomes true.

Its syntax in general form is:

```bash
Repeat
statements
until(condition) is true
```

##### 3. For loop
In this loop, statements get repeated a predetermined number of times.

Its syntax in general form is:

```bash
For count = Initial value to
last value does
statement
end for
```

> Note: These control structures have different formats in different programming languages.

For further reading, you can check this [article](https://www.geeksforgeeks.org/control-structures-in-programming-languages/).

#### Program testing and debugging
Testing ensures that the program runs as intended and performs the intended actions.

Debugging is the process of checking, detecting, and correcting errors in computer programs.

Errors that may occur in a program are syntax errors and logic errors.

#### Program implementations
It is the actual delivery and installation of the new program and how well it works.

#### Program review and maintenance
Review and maintenance are essential because of the errors encountered after implementation.

Proper training of users will reduce the chance of invalid input that can crash the program.

### Program documentation
Program documentation is written text explaining the program development process.

It helps during future modification of the program.

Documentation can either be internal or external.

Internal documentation is the written comments in the source program that helps other programmers understand the code.

External documentation is the reference materials such as user manuals printed as booklets.

### Standard tools used for programming languages
#### Front-end development tools
Front-end technology helps to design the user interface of web applications and web pages.

The best tools for front-end web development are:
- Chrome DevTools
- HTML5 Boilerplate
- Sass
- AngularJs
- JQuery
- Visual Studio Code
- Git
- NPM (Node Package Manager)
- Grunt

#### Backend development tools
Backend technology helps to design the server-side operations of web applications and web pages.

The best tools for backend web development are:

Languages:
- Php
- Python
- JavaScript
- Java
- Go
- Ruby

Frameworks:
- Laravel
- Django
- Angular
- Meteor
- Spring
- Ruby on Rails

Databases:
- MongoDB
- Oracle
- MySQL
- Postgre SQL

WebServers:
- Apache
- NGINX
- Lighttpd
- Microsoft IIS

Other tools:
- Docker
- Postman
- Jira

### Conclusion
To wrap up, we have discussed the fundamental principles of programming, and the primary tools used in programming.

Programming is common in our day-to-day lives as different languages are used in most technical aspects.

For one to venture into programming, one must have a passion for it.

It is a step-by-step process that takes time to learn and to skill up.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
