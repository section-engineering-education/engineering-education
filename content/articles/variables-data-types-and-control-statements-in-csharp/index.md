---
layout: engineering-education
status: publish
published: true
url: /variables-data-types-and-control-statements-in-csharp/
title: Variables, Data Types and Control Statements in C# 
description: This tutorial will help the readers understand variables, data types, and control statements (If-else statements, else if statements, and switch-case statements) in C#.
author: geoffrey-mwangi
date: 2021-01-20T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/variables-data-types-and-control-statements-in-csharp/hero.jpg
    alt: Variables, Data Types and Control Statements in C# image
---
In this tutorial, we are going to take a look at variables, data types, and control statements in C# (C-Sharp). C# is a programming language developed by Microsoft that runs on the .NET Framework. It is used to develop web apps, desktop apps, mobile apps, games, and much more.
<!--more-->

### Variables in C#
A variable is a storage location paired with a name, that contains some known or unknown data referred to as a value.

#### Syntax for declaring a variable:

```C#
<data type> <variable_name> = value;
```

Data types are used to specify the type of variable that the variable can hold and state the size of data the variable is supposed to store.

The different data types are:

| Data types |      Size     |  Explanation                           |                         
|------------|:-------------:|--------------------------------------  |
|  byte      |    1 byte	   | stores whole numbers from -128 to 127  |
|  int       |   4 bytes	   | stores whole numbers from -2,147,483,648 to 2,147,483,647   |                                 
|  long      |   8 bytes	   | stores whole numbers from -923,372,036,854,775,808 to 9,223,372,036,854,775,807    |                                        
|  char      |   2 bytes	    |stores a chacter  
|  string    |   2 bytes per character         | stores many characters  |
|  double    |   8 bytes    | stores fraction and decimal numbers of 15 decimal digits  |
|  float     |   4 bytes    | stores fractional numbers and decimal numbers of 6 decimal digits  |
|  bool      |   1 bit      | stores true or false value  |

Let's take a look at each of them:

- **byte**:

The `byte` data type is used to store whole numbers from -128 to 127.

```C#
  byte number = 75;
```

- **int**:

The `int` (integer) data type is used to store whole numbers from -2,147,483,648 to 2,147,483,647.

```C#
  int a = 5; 
```

- **long**:

The `long` data type allows you to store whole numbers from -923,372,036,854,775,808 to 9,223,372,036,854,775,807.

This data type is used when a number is large to be stored in the *int* data type. We should add a letter **L** at the end of the long number to specify it is a long number.

```C#
  long b = 50000000000000L;
```

- **float**:

The `float` stores a fraction number and a decimal number of up to 6 decimal digits. We should add an **F** at the end of the decimal number to specify that it is a float number.

```C#
  float c = 0.64737F;
```

- **double**:

The `double` data type stores a fraction and a decimal number of up to 15 decimal digits.

```C#
  double d = 4.847376474;
```

*Note*: Double data type stores many decimal numbers than float. It is advisable to use double in most of the calculations.

- **char**: 

The `char` type is used to store **one** character.

```C#
  char letter='A';
```

- **string**:

The `string` data type is used to store **many** characters.

```C#
  string name="My name is Geoffrey";
```

- **bool**:

The `bool` data type is used to store **true** or **false** value.

```C#
  bool trueBoolean=true;
  bool falseBoolean=false;
```

### C# Identifiers
This is the name given to the variable. It should be unique for each entity for the compiler to distinguish it during the execution of the program. You can choose any name for the variables but it should have some meaning to improve the readability of the code.

#### Rules for declaring a variable name:
- Keywords should not be used as a name for the variable.

- Blank spaces should not be used in a variable name. Instead, you can use an underscore `_`.

- Variable name **must not** start with a digit.

- Variable names can consist of characters, digits, or symbols like an underscore (_).

- C# is case-sensitive as it treats uppercase and lowercase names differently thus **program** and **Program** are different variable names.

### Examples
Let's define a variable and assign a value to it immediately.

```C#
int a = 5;
Console.WriteLine(a);
```

Let's define a variable and assign a value to it later.

```C#
int b;
b = 5;
Console.WriteLine(b);
```

When we assign a new value to `b`, it will overwrite the current value that is stored in the variable.

```C#
int b = 5; //initializing b as 5
b = 10; // changing the value of be to 10
Console.WriteLine(b);//it will output 10
```

Let's define a string variable and assign a string to it.

```C#
string name = "Sam";
Console.WriteLine(name);
```

### Constant variables
The `const` keyword is used to declare variables whose value cannot be changed (it is a read-only value). 

```C#
const int num = 5;
```

Here, the `num` value cannot be changed:

```C#
const int num = 5;
num = 9; // It will throw an Error
```

### Displaying variables
We use `Console.WriteLine();` to display or to print out variables. To combine a variable and text, we use the `+` operator.

```C#
string course = "Computer Science";
Console.WriteLine("I am a" + course + "student");
```

### Adding two variables
```C#
int a,b,c;
a = 2;
b = 5;
c = a + b;// 2 + 5
Console.WriteLine(c);//prints out 7
```

This will take the value assigned to *a* (which is 2) and add to the value of *b* (which is 5) and `Console.WriteLine()` will print out the answer as 7. 

Similarly, you can add two variables of data type **string** and that will concatnate both the strings.

```C#
string firstName = "Mike";
string secondName = "Sam";
string fullname =  firstName + secondName;
Console.WriteLine(fullname);//prints out MIke Sam
```

### Control statements
Control statements help make decisions in a program, loop (iterate) through statements, select and change the flow of the conditions. We are going to look at decision-making or selection statements.

There are three types of control statements in C#:
- Decision making statements or Selection statements
- Iteration statements
- Jump statements

We will look at decision making statements or selection statements. You can read more on selection statements, jump statements, and iteration statements from [here](https://freeasphosting.net/csharp-tutorial-control-statements.html)

### Decision-making or Selection statements
In decision-making statements, we need to specify a condition that'll be evaluated by the program.

If the condition is evaluated as true, the specified code block will be executed. If not, we can either specify another code block that must be executed or not do anything. 

We use `if-else statement`, `else if statement` and `switch-case statement` to perform these actions.

#### Syntax of if-else Statement:

```C#
if (condition)
{
  // block of code to be executed if the condition is true
}
else
{
   // block of code to be executed if the condition is false
}
```

If the condition is **true**, then the block of code inside the *if* is executed.

The `else statement` is executed only when the *condition* is false.

#### Example:
 ```C#
int age = 18;
if (age < 15) 
   {
    Console.WriteLine("You are young.");
   } 
    else 
    {
     Console.WriteLine("You are old.");
    }
//the program outputs "You are old"
```

From the program above, we have set our age as 18. Thus, our *if condition* is evaluated to **false**. The program moves to the next condition, *else if condition* which is also evaluated to **false**.

### Else if Statement
We use this statement when we have multiple conditions to be tested. The `else-if` condition is executed if the `if condition` is evaluvated as `false`.

#### Syntax of the Else if Statement:
```C#
if (condition1)
  {
    statements // block of code to be executed if condition1 is true
  }
    else if (condition2)
      {
        statements // block of code to be executed if condition1 is false and condition2 is true
      }
    else
      {
        statements //block of code to be executed if both condition1 and condition2 is false
      }
```

#### Example:

```C#
int age = 18;
if (age < 10) 
  {
    Console.WriteLine("You are a child.");
  } 
    else if (age < 17) 
      {
        Console.WriteLine("You are a teenager.");
      } 
        else 
          {
            Console.WriteLine("You are old.");
          }
      //Prints out "You are old"
```

From the program above, we have set our age as 18. Thus, our *if condition* is evaluated to **false**. The program moves to the next condition, *else if condition* which is also evaluated to **false**.

Our program executes the else statement since both if and the else if conditions are **false**.

### Switch-case Statement
We use the `switch` statement to test a variable and compare it to multiple cases.

#### Syntax of the switch-case Statement:

```C#
switch(expression) 
{
  case 1:
    // code block
    break;
  case 2:
    // code block
    break;
  default:
    // code block
    break;
}
```

When the expression matches with one of the cases, that particular code block is executed. The **break** statement is used to exit from the code block. The **default** condition is executed when none of the cases match with the expression.

#### Example:

```C#
//The program gets input from the user and determines the day as per the number entered by the user
using System;
namespace hello
{
 class hello
 {
   static void Main(string[] args)
   {
   Console.WriteLine("Enter a number to give you the day");
   int day = Convert.ToInt32(Console.ReadLine());
   switch (day) 
   {
     case 1:
       Console.WriteLine("Monday");
       break;
     case 2:
       Console.WriteLine("Tuesday");
       break;
     case 3:
       Console.WriteLine("Wednesday");
       break;
     case 4:
       Console.WriteLine("Thursday");
       break;
     case 5:
       Console.WriteLine("Friday");
       break;
     case 6:
       Console.WriteLine("Saturday");
       break;
     case 7:
       Console.WriteLine("Sunday");
       break;
     default:
       Console.WriteLine("Invalid Input");
       break;
       }
   }
 }
}
```

For the above program, if the user enters 5, the program will execute *"Friday"*.

### Key takeaways
In this tutorial we looked at:

- Variables and the various data types.

- How to declare and name a variable. 

- Control statements (If-else statements, else if statements, and switch-case statements).

Happy Coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
