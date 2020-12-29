### Introduction

In this article, we are going to look at variables, data types, and control statements. We shall look at different types of variables, data types, and control statements.
### Variables in C#

At some point, we need to utilize some information in our program, we can store it in a memory location and name the memory location as it gets simpler to get to it. We can achieve these by using variables.
Variables are names of a memory location for storing data types.

Variables are classified into various types:
>
- `int` is used to hold an integer(whole numbers) like 5,6,7,8.
- `char` is used to hold a character like 'A'.
- `string` is used to store text like "C# Language".
- `double` is used to store a fraction or a decimal value.
- `bool` is used to hold a true or false value.

### Syntax of declaring a variable.

```C#
<data type> <variable_name> = value;
```
**Data type** is the C# type like `int,double,string,char or bool` while **variable_name** is the name of the variable (like x or name).
The **equal sign** initializes or provides the variable with a value.

**Rules of declaring a variable name:**
- Keywords should not be used as a name for the variable.
- Blank spaces are not used in a variable name(use an underscore `(_)`.
- Variable name **must** not start with a digit.
- Variable names can consist of characters, digits, or symbols like underscore(_).
- C# is case-sensitive as it treats uppercase and lowercase names differently thus **program** and **Program** are different names.

### Example

Creating a variable and assigning the value immediately.

```C#
int a = 5;
Console.WriteLine(a);
```
We have created a variable called **a** that stores an integer **5**.

Creating a variable and assigning the value later.

```C#
int b;
b = 5;
Console.WriteLine(b);

```
This will still print out the value as 5. When we assign a new value in b, it will over right the other value.

```C#
int b = 5; //initializing b as 5
b = 10; // changing the value of be to 10
Console.WriteLine(b);//it will output 10

```

Creating a variable of data type string.

```C#
string name = "Sam";
Console.WriteLine(name);
```

We have created a variable called **name** of data type string and provided it the value `"Sam"`.

### Examples of C# variables:

```C#
int a = 5;
char letter = 'A';
double num = 3.33;
string text = "Hello World";
bool isCsEasy = true;
```
### Constants in variables

Constant is a keyword used to store variables whose value cannot be changed(it is a read-only value). 
It is denoted by `const` keyword:

```C#
const int num = 5;
```
Here,` num` value cannot be changed:

```C#
const int num = 5;
num = 9;//It will display an Error
```

### Displaying variables

We use `Console.WriteLine();` to display or to print out variables. To combine a variable and text, we use the `+` character to separate them. 

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

This will take the value assigned to *a* (which is 2)and add to the value of *b* (which is 5) and `Console.WriteLine()` will print out the answer as 7. 

Similarly, you can add two variables of data type **string**:

```C#
string firstName = "Mike";
string secondName = "Sam";
string fullname =  firstName + secondName;
Console.WriteLine(fullname);//prints out MIke Sam

```

### Declaring multiple variables

```C#
int a,b,c;
a = 2;
b = 5;
c = 7
Console.WriteLine(a + b + c);//prints out the answer as 14

```

### C# Identifiers

This is the name given to the variable. It should be unique for each entity for the compiler to distinguish it during the execution of the program. One can choose any name for the variables but it should have a meaning to what one is writing about.

### C# Data Types

As we had seen earlier in variables, we must specify the data type to store variables, that is:

```C#
int a = 5;                    //storing integer
char letter = 'A';            //storing character
double num = 3.33;            //storing fraction and decimals
string text = "Hello World";  //storing string
bool myBool = true;           //storing boolean(true or false)

```

Data types are so much related to variables and many programmers tend to confuse between the two. Data types classify the various types of variables and state the size of data that they are supposed to store.

Data types are classified into various types:
> 

| Data types |      size     |  Explanation                          |                         
|----------  |:-------------:|--------------------------------------  |
|  byte      |    1 byte     | stores whole numbers from -128 to 127  |
|  int       |   4 bytes     | stores whole numbers from -2,147,483,648 to 2,147,483,647   |                                 
|  long      |   8 bytes     | stores whole numbers from -923,372,036,854,775,808 to 9,223,372,036,854,775,807    |                                        
|  char      |   2 bytes      |stores a chacter  
|  string    |   2 bytes per character         | stores many characters  |
|  double    |   8 bytes    | stores fraction and decimal numbers of 15 decimal digits  |
|  float     |   4 bytes    | stores fractional numbers and decimal numbers of 6 decimal digits  |
|  bool      |   1 bit      | stores true or false value  |
|

Let us look at each of them:

### 1. Byte
The `byte` data type is used to store whole numbers from -128 to 127.

**Example**
```C#
byte number = 75;
console.WiteLine(number);//prints out 75
```

### 2. Int
The `int` (integer) data type is used to store whole numbers from -2,147,483,648 to 2,147,483,647.

**Example**
```C#
int a = 5; 
console.WiteLine(a);//prints out 5
```

### 3. Long
The `long` data type allows you to store whole numbers from -923,372,036,854,775,808 to 9,223,372,036,854,775,807.
This data type is used when a number is large to be stored in the *int* data type. We should add a letter **L** at the end of the long number to specify it is a long number.


**Example**
```C#
long b = 50000000000000L; //stores a long number
console.WiteLine(b);
```

### 4. Float
The `float` store a fraction number and a decimal number of up to 6 decimal digits. We should add an **F** at the end of the decimal number to specify that it is a float number.

**Example**
```C#
float c = 0.64737F;
console.WriteLine(c);
```

### 5. Double
The `double` data type stores a fraction and a decimal number of up to 15 decimal digits.

**Example**
```C#
double d = 4.847376474;
console.WriteLine(d);
```
*Note*: Double data type stores many decimal numbers than float. It is advisable to use double in most of the calculations.

### 6. Char
The `char` type is used to store **one** character.

**Example**
```C#
char letter='A';
console.WriteLine(letter);
```
### 7. String
The `string` data type is used to store **many** characters.

**Example**
```C#
string name="My name is Geoffrey";
console.WriteLine(name);

```

### 8. Bool

The `bool` data type is used to store **true** or **false** value.

**Example**
```C#
bool myBoolean=true;
bool nextBoolean=false;
console.WriteLine(myBoolean);//prints out true
console.WriteLine(nextBoolean);//prints out false
```

### Control Statements 
Control statements help to make decisions in a program, loop(iterate) through the conditions, select and change the flow of the conditions.
There are four types of control statements in C#:
>
- Decision-making statements
- Iteration statements
- Selection statements
- Jump statements

We will look at decision-making statements and selection statements.

### 1. Decision-making statements

This type of condition test the conditions provided evaluating each of them either true or false.We use **if-else Statement** and **else if statement**.  

**Syntax of if-else Statement**
```C#
if (condition)
  {
    statements // block of code to be executed if the condition is true
  }
    else
     {
        statements // block of code to be executed if the condition is false
      }
```
 If the statements in the `if condition` is **true**, the block of code inside the *if condition* is executed.

 The `else statement` is executed only when the *if condition* is false.

 **Example**
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
From the program above, we have set our age as 18. The program first checks for the first condition, that is if the age is less than 15. If it is true, the block of code in the *if condition* is executed otherwise the *else statement* is executed. In our program the if condition is false thus printing out the else statement.
### Else if Statement
This condition is used if the first condition is **False**.

**Syntax of the Else if Statement**
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
**Example**
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
From the program above, we have set our age as 18.Thus,our *if condition* is **false**. The program moves to the next condition,*else if condition* which is also **false**.
Our program executes else statement since both if and else if conditions are **false**.

### 2. Selection Statement

This type of condition statement is used to select a code block out of many. We use the switch-case statement in such a case.

**Syntax of the switch-case Statement**
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
The expression value can either be user input or program generated. When the expression matches with one of the cases, the code block is executed. The **break statement** is used to exit the testing of the cases when the match is found. The **default** condition is executed when any of the cases does not match with the expression on the cases.

### Example of the switch-case Statement
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
From the above program, if the user enters 5, the program will execute *"Friday"*

### Takeaways:
In this tutorial we looked at:
- Variables and the various types
- Data Types and the various types
- Control statements (If-else statements, else if statements and switch-case statements)
- Example programs in each case for better understanding of the control statements