In this article, we are going to take a look at variables, data types, and control statements.

### Variables in C#

A variable is a storage location paired with a name, which contains some known or unknown data referred to as a value.

Variables are names of a memory location for storing data types.

Variables are classified into various types based on the type of data stored. They are:

- `int` is used to hold an integer (whole numbers) like 5, 6, 7, 8.

- `char` is used to hold characters like uppercase alphabets, lowercase alphabets, and special characters.

- `string` is used to store text like "C# Language".

- `double` is used to store a fraction or a decimal value. Ex: 3.14

- `bool` is used to hold `true` or `false`.

**Syntax for declaring a variable**:

```C#
<data type> <variable_name> = value;
```

**Data type** is the C# type like `int, double, string, char or bool` while **variable_name** is the name of the variable (like x or name).
The **equal sign (=)** is used to assign the variable with a value. It's called an assignment operator.

**Rules for declaring a variable name:**

- Keywords should not be used as a name for the variable.

- Blank spaces should not be used in a variable name. Instead, you can use an underscore `_`.

- Variable name **must not** start with a digit.


- Variable names can consist of characters, digits, or symbols like underscore(_).

- - C# is case-sensitive as it treats uppercase and lowercase names differently thus **program** and **Program** are different variable names.

### Example

Let's define a variable and assign a value to it immediately.


```C#
int a = 5;
Console.WriteLine(a);
```


Let's define a variable and assign a value to it later..

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

### Examples of C# variables:

```C#
int a = 5;
char letter = 'A';
double num = 3.33;
string text = "Hello World";
bool isCsEasy = true;
```

### Constant variables

The `const` keyword is used to declare variables whose value cannot be changed (it is a read-only value). 

```C#
const int num = 5;
```

Here, the `num` value cannot be changed:

```C#
const int num = 5;
num = 9;//It will display an Error
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

This is the name given to the variable. It should be unique for each entity for the compiler to distinguish it during the execution of the program. You can choose any name for the variables but it should have some meaning to improve the readability of the code.

### C# Data Types

As we had seen earlier in variables, we must specify the data type to store variables, that is:

```C#
int a = 5;                    //storing integer
char letter = 'A';            //storing character
double num = 3.33;            //storing fraction and decimals
string text = "Hello World";  //storing string
bool myBool = true;           //storing boolean(true or false)
```

Data types are used to classify the various types of variables and state the size of data the variable is supposed to store.

Data types are used to classify the various types of variables and state the size of data the variable is supposed to store.

The different data types are:

### 1. Byte

The `byte` data type is used to store whole numbers from -128 to 127.

**Example**:

```C#
byte number = 75;
console.WiteLine(number);//prints out 75
```

### 2. Int

The `int` (integer) data type is used to store whole numbers from -2,147,483,648 to 2,147,483,647.

**Example**:
```C#
int a = 5; 
console.WiteLine(a);//prints out 5
```

### 3. Long

The `long` data type allows you to store whole numbers from -923,372,036,854,775,808 to 9,223,372,036,854,775,807.
We should add a letter **L** at the end of the long number to specify it is a long number.


**Example**:

```C#
long b = 50000000000000L; //stores a long number
console.WiteLine(b);
```

### 4. Float

The `float` is used to store a fractional number and a decimal number of up to 6 decimal digits. We should add an **F** at the end of the decimal number to specify that it is a `float`.

**Example**:

```C#
float c = 0.64737F;
console.WriteLine(c);
```

### 5. Double

The `double` data type stores a fraction and a decimal number of up to 15 decimal digits.

**Example**:

```C#
double d = 4.847376474;
console.WriteLine(d);
```
*Note*: Double data type stores many decimal numbers than float. It is advisable to use double in most of the calculations.

### 6. Char

The `char` type is used to store **one** character.

**Example**:

```C#
char letter='A';
console.WriteLine(letter);
```
### 7. String

The `string` data type is used to store **many** characters.

**Example**:
```C#
string name="My name is Geoffrey";
console.WriteLine(name);

```

### 8. Bool

The `bool` data type is used to store **true** or **false** value.

**Example**:
```C#
bool myBoolean=true;
bool nextBoolean=false;
console.WriteLine(myBoolean);//prints out true
console.WriteLine(nextBoolean);//prints out false
```

### Control Statements 
Control statements help to make decisions in a program, loop(iterate) through the conditions, select and change the flow of the conditions. We are going to look at decision-making or selection statements.


### Decision-making or Selection statements
In this control statements,we need to specify a condition that will be evaluated by the program.
The condition is evaluated as true or false.We use `if-else statement`, `else if statement` and `switch-case statement`.  

**Syntax of if-else Statement**:

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


If the condition is **true**, then the block of code inside the *if* is executed.

The `else statement` is executed only when the *condition* is false.

**Example**:
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

We use this statement when we have multiple conditions to be tested. It is executed when the `if condition` is `false`.

**Syntax of the Else if Statement**:

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

**Example**:

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

**Syntax of the switch-case Statement**:

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

You can read more on Selection statements and jump statements from [here](https://www.geeksforgeeks.org/c-sharp-jump-statements-break-continue-goto-return-and-throw/)

### Takeaways

In this tutorial we looked at:

- Variables and the various types

- Data Types and the various types

- Control statements (If-else statements, else if statements and switch-case statements)

- Example programs in each case for better understanding of the control statements
