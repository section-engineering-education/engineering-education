

## **UNDERSTANDING FUNDAMENTAL PROGRAMMING PRINCIPLES**

Programming is the process of developing computer programs using different tools.
They are divided into two main categories.

 - low-level languages 
 - high-level languages

**Low-level languages** are languages understood by the machine and need little effort to translate into object code.

**~~The two types of low-level languages**~~
**Machine Language**
It uses binary logic since it is the only language that a microprocessor processes.
Machine language is fast to execute since it is already in machine-understandable format.
**Assembly Language**
It uses symbolic representation known as mnemonics (memory aids), which are easy to understand than a machine language.
Programs written in assembly language need an assembler to translate into machine-readable form.

**High-level languages** are close to the human language and can be understood by people who are not experts in programming.
**~~Classification of high-level languages**~~
**Third generation languages**
Their instructions get written in a sequence or in a specific order in which they get executed. It emphasizes the use of control structures. 
Example of 3GL: Fortran, ALGOL, BASIC, C, COBOL, Java, Pascal.
**Fourth-generation languages**
They provide the user with more inbuilt programming tools like a graphical user input interface.
Examples of 4GL: SQL, Oracle, PHP.
**Fifth-generation languages**
They are used in artificial intelligence to make computers that depict human-like intelligence.
Example of 5GL: Mercury, Prolog, OPS5
**Object-oriented programming languages**
They make it easier to develop, debug, reuse and maintain software than other earlier languages.
Example of OOP: C++, Java, Smalltalk, Visual Basic.
**Web scripting languages**
They develop/add pictures to a web page.
Web scripting languages do not have declaration parts neither do they have control structures.
Examples of web scripting languages are JavaScript, XML, Perl, Python, Ruby, Groovy.

**Program Development**
Process of creating software and it's broken down into the following stages
***1. Problem Recognition***
Here, the programmer should understand and interpret the problem
***2. Problem Definition***
The programmer identifies the required input processing activities and output.
The programmer also identifies ways of solving the same problem and picks the best.
Written documentation is required for the design stage
***3. Program Design***
At this stage, the programmer develops a problem-solving project called an algorithm, which is a limited number of logical steps that a program follows to solve a problem.
At this stage tools such as pseudocodes, flowcharts, and decision tables are useful.
***4. Program Coding***
The algorithm gets translated into an equal programming language code.
In program coding, the programmer may use different control structures.
**Program control structures**

> **Sequence control structures**
 Here, the computer reads instructions from a program file from the first line to the last statement. 
 An example of Sequence control structures in pseudocode form
> 
> 
>      START
>     x=1
>     y=1           the output will be 2,4,5 
>     y=y+1
>     m=y^2
>     x=x + m
>     print y, m, x
>     STOP
> 
> 
> Its syntax is

    

START
    statement 1
    statement 2
    .
    .
    .
    statement n
    STOP

> **Selection Control Structures**
>A statement is executed if the condition returns true or false.

The condition must be a Boolean expression.
>There are different types of selection control structures. For example
>**1. If **
>It's used if only one option is available, and when the condition is true, all other options get ignored.
>*Its syntax in general form is: *

    if(condition)Then
    statement to be executed
    if the condition is true
    End If
>**2. If Else**
>It is suitable where there are two available options. for example, if a condition is true, the statement gets executed if it is false, an alternative statement gets executed.
>*Its syntax in general form is:

    if(condition) then
    statement if the condition is true
    else
    statements if the condition is false
    End if
>**3. If Else If (Nested If) **
>It's used where there are more than two options to consider before making a selection.
>*Its syntax in general form is: *

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

 >**Looping control structures**
 >These control structures get designed to execute the same block of code repeatedly until a condition is met.
 >There are different types of looping control structures. For example
 >**1. The while loop**
 >It's used if a condition has to be met before statements within the loop get executed.
 >*Its syntax in general form is: *

     `while(condition)Do
     statement to execute
     end while

> **2. Repeat...until** 
> It allows statements within it to execute at least once and when the condition gets tested and found to be false,
the statements get executed until the condition becomes true.
> *Its syntax in general form is: *

    Repeat
    statements
    until(condition) is true
>**3. For loop**
>In this loop, statements get repeated a predetermined number of times.
>*Its syntax in general form is: *

    For count= Initial value to
     last value does
     statement
    end for
These control structures have different formats in different programming languages. 
 
***5. Program Testing and debugging***
Testing ensures that the program runs as intended and performs the intended actions.
Debugging is the process of checking, detecting, and correcting errors in computer programs.
Errors that may occur in a program are syntax errors and logic errors, etc.
***6. Program Implementations***
It is the actual delivery and installation of the new program and how well it works.

***7. Program Review and Maintainance***
Review and maintenance are important because of the errors encountered after implementation. Proper training of users will reduce the chance of invalid input that can crash the program.

**Program Documentation**

 - It's written text explaining the program development process.
 It helps during future modification of the program.
 
Documentation can either be internal or external.
 - Internal documentation is the written comments in the source program that helps other programmers understand the code statements
External documentation is the reference materials such as user manuals printed as booklets.

**Common Tools Used for Programming Languages**

 **Front-end Development Tools**
 Front-end technology helps to design the user interface of web applications and web pages
 Best tools for front-end web development

     1. Chrome DevTools
     2. HTML5 Boilerplate  
     3. Sass  
     4. AngularJs  
     5. JQuery  
     6. Visual Studio Code  
     7. Git  
     8. Typescript  
     9. NPM (Node Package Manager)  
     10. Grunt

 
**Backend Development Tools**
Backend technology helps to design the server-side operations of web applications and web pages.
Best tools for backend web development

  

    Languages used
     1. Php
     2. Python
     3. JavaScript
     4. java 
     5. Go
     6. Ruby
    Frameworks used
     1. Laravel
     2. Django
     3. Angular
     4. Meteor
     5. Spring
     6. Ruby on Rails
    Database used 
     1. MongoDb
     2. Oracle
     3. MySQL
     4. Postgre SQL
    WebServer
     1. Apache
     2. NGINX
     3. Lighttpd
     4. Microsoft IIS
    Other tools
     1. Docker
     2. Postman
     3. Jira
      

    

 

 ### Conclusion
 Programming, in general, is not easy to learn but the more you keep on practicing the more you get skilled up.
 
### Further reading
  For more inquiries:
 [ Control Structures in programming languages] (https://www.geeksforgeeks.org/control-structures-in-programming-languages/)



