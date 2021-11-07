---
layout: engineering-education
status: publish
published: true
url: /operators-in-csharp/
title: Operators in C#
description: In this article, we will go over the various operators in C# and see how they are used to utilize the functionality they offer.
author: lewis-macharia
date: 2021-07-02T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/operators-in-csharp/hero.png
    alt: Operators C# example image
---
An operator is a symbol that instructs the compiler to perform particular mathematical or logical computations. This is what makes up any programming languages foundation. Subsequently, the C# language's usefulness is deficient without the utilization of operators. 
<!--more-->
### Introduction
Operators enable us to execute various actions on operands. In C#, operators are classified according to their functionality:
1. [Arithmetic operators](#arithmetic-operators)
2. [Assignment operators](#assignment-operators)
3. [Comparison operators](#comparison-operators)
4. [Bitwise operators](#bitwise-operators)
5. [Relational operators](#relational-operators)
6. [Logical operators](#logical-operators)
7. [Miscellaneous operators](#miscellaneous-operators)

### Arithmetic operators
The arithmetic operators are `binary ` and `unary operators` that solve mathematical operations on the operand. Binary operators operate with two operands while unary operators operate with only one operand. 

The following are the Binary operators that fall within this category:
1. **Substruction**: The `-`  operator takes two operands and subtracts them. Consider the case of x-y.
2. **Addition**: The `+` operator takes two operands and adds them together. Consider the expression x+y.
3. **Division**: The `/` operator divides the first operand by the second operand. Consider the example of x/y.
4. **Multiplication**: When two operands are multiplied, the `*` operator is used. Take into account x*y.  
5. **modulus**: The `%` operator returns the remainder when the first operand is divided by the second operand. For example, x % y.

The following are the unary operators that fall within this category:
1. **Increment**: The `++` operator raises the value of an integer by one. Consider the expression K++.
2. **Decrement**: The `--` operator lowers the value of an integer by one. Consider the expression K--.

The program below shows the use of the Arithmetic operators:

```c#
using System;
namespace Arithmetic
{
    class example
    {
        static void Main(string[] args)
        {

           int result, unary;
            int a = 21, b = 6;

            result = (a + b);
            Console.WriteLine("Addition Operator: " + result);

            result = (a - b);
            Console.WriteLine("Subtraction Operator: " + result);

            result = (a * b);
            Console.WriteLine("Multiplication Operator: " + result);

            result = (a / b);
            Console.WriteLine("Division Operator: " + result);

            result = (a % b);
            Console.WriteLine("Module Operator: " + result);

            unary= a++;
            Console.WriteLine("A is {0} and unary is {1}", a, unary);
            
            unary= a--;
            Console.WriteLine("A is {0} and  unary is {1}", a, unary);
        }
    }
}
```

The output of all the arithmetic operations program is:

```bash
Addition Operator: 27
Subtraction Operator: 15
Multiplication Operator: 126
Division Operator: 3
Module Operator: 3
A is 22 and unary is 21
A is 21 and  unary is 22
```

### Assignment operators
With assignment operators, a new value is assigned to a variable, property, event or indexer to the C# programming language.

Bitwise logical operations, operations on integral operands, and operations on Boolean operands may all be done with assignment operators.

There are eleven types of assignment operators namely:
1. **Add assignment** (`+=`): The `+` and `=` operators are combined in this operator. This operator allocates the results to the left variable after adding the current value to the right variable.
2. **Multiple assignment** (`*=`): The `*` and `=` operators are combined in this operator. After multiplying the variable's current value at left by the value at right, this operator sends the result to the variable at the left.
3. **Division assignment** (`/=`): The `/` and `=` operators are combined in this operator. This operator divides the left-hand variable's current value by the right-hand variable's value, then assigns the result to the left-hand variable.
4. **Simple assignment** (`=`): This operator assigns the right variable value to the left variable.
5. **Subtract assignment** (`-=`): This operator is a mixture of the operators `-` and `=`. This operator subtracts the current value of the left-hand variable from the right-hand variable's value before assigning the result to the left-hand variable.
6. **Modulus assignment** (`%=`): This operator is made up of the operators `%` and `=`. The current value of the right-most variable is multiplied by this operator, then the result is assigned to the left most variant.
7. **Left shift assignment** (`<<=`): This operator is a mixture of operators `<<` and `=`. The current variable values are moved to the left by that operator first and then the results are assigned to the variable.
8. **Right shift assignment** (`>>=`): This operator is a mixture of the operators `>>` and `=`. After right shifting the current variable value left by the value right, this operator will transfer the result to the variable left.
9. **Bitwise AND assignment** (`&=`): This operator is a mixture of the operators `&` and `=`. The result will be sent by this operator to the left variable after bit by bit AND the current value of the variable to the left.
10. **Bitwise inclusive OR** (`|=`): The operator is a mixture of operators `|` and `=`. Initially, the variable's current value to the left is "Bitwise with OR" and then assigns it to the variable on the right.
11. **Bitwise exclusive OR** (`^=`): This operator is a mixture of the operators `^` and `=`. The result of the operator will send the variable left to the variaible with the value right after "Bitwise Exclusive ORing."

The program below shows all the assignment operators in use:

```c#
using System;
namespace Assignment_operator
{
    class example
    {
        static void Main(string[] args)
        {
            int x = 35;

            x += 8;
            Console.WriteLine("Add Assignment Operator: " + x);
            x -= 7;
            Console.WriteLine("Subtract Assignment Operator: " + x);
            x *= 5;
            Console.WriteLine("Multiply Assignment Operator: " + x);
            x /= 3;
            Console.WriteLine("Division Assignment Operator: " + x);
            x = 2;
            x %= 4;
            Console.WriteLine("Modulous Assignment Operator: " + x);
            x = 4;
            x <<= 6;
            Console.WriteLine("Left Shift Assignment Operator: " + x);
            x = 60;
            x >>= 5;
            Console.WriteLine("Right Shift Assignment Operator: " + x);
            x = 10;
            x &= 6;
            Console.WriteLine("Bitwise AND Assignment Operator: " + x);
            x = 10;
            x ^= 3;
            Console.WriteLine("Bitwise Exclusive OR Assignment Operator: " + x);
            x |= 7;
            Console.WriteLine("Bitwise Inclusive OR Assignment Operator: " + x);

        }
    }
}
```

The output of the program above is:

```bash
Add Assignment Operator: 43
Subtract Assignment Operator: 36
Multiply Assignment Operator: 180
Division Assignment Operator: 60
Modulous Assignment Operator: 2
Left Shift Assignment Operator: 256
Right Shift Assignment Operator: 1
Bitwise AND Assignment Operator: 2
Bitwise Exclusive OR Assignment Operator: 9
Bitwise Inclusive OR Assignment Operator: 15
```
### Bitwise operators
There are six bitwise operators in C# that function at the bit level or execute bit-by-bit operations. 

The bitwise operators are as follows:
1. **Bitwise AND** (`&`): Takes two operands and performs AND on each bit of the two integers. AND results only when both bits are 1. (bitwise OR) takes two operands and performs OR on each bit of the two values. OR returns 1 if either of the two bits is 1.
2. **Bitwise OR** (`|`): Takes two operands and performs OR on each bit of the two integers. OR returns 1 if either of the two bits is 1. 
3. **Bitwise XOR** (`^`). Takes two operands and performs an XOR on each bit of the two integers. If the two bits are different, the result of XOR is 1.
4. **Left shift** (`<<`). Takes the binary representation of two integers and shifts the individual bits of the first operand to the left. The amount of places to shift is determined by the second operand.
5. **Right (`>>`)**: Takes the binary representation of two integers and shifts the first operand's bits to the right. The second operand determines the number of places to shift.

The program below shows all the Bitwise operators in use:

```c#
using System;
namespace Bitwise_operators
{

    class example
    {
        static void Main(string[] args)
        {
            int a = 3, b = 9, outcome;
            outcome = a & b;
            Console.WriteLine("Bitwise AND: " + outcome);
            outcome = a | b;
            Console.WriteLine("Bitwise OR: " + outcome);
            outcome = a ^ b;
            Console.WriteLine("Bitwise XOR: " + outcome);
            outcome = ~a;
            Console.WriteLine("Bitwise Complement: " + outcome);
            outcome = a << 3;
            Console.WriteLine("Bitwise Left Shift: " + outcome);
            outcome = a >> 3;
            Console.WriteLine("Bitwise Right Shift: " + outcome);

        }
    }
}
```

This is the output:

```bash
Bitwise AND: 1
Bitwise OR: 11
Bitwise XOR: 10
Bitwise Complement: -4
Bitwise Left Shift: 24
Bitwise Right Shift: 0
```

### Relational operators
When two values are compared, relational operators are utilized.

The following are the relational operators:
1. **Equal To** (`==`): If so, it will come back true. False is returned otherwise. For example, 5==5 is going to come back true.
2. **Not Equal To** (`!=`) The operator determines if the two operands are equal. The output is true if it's wrong. False is returned otherwise. It's the `==` operator's exact boolean complement. 5!=5 will, for example, return false.
3. **Greater Than** (`>`): This operator detects whether the first operand is bigger than the second. It returns true if this is the case.
4. **Less Than** (`<`): This operator determines if the first operand is smaller than the second. If this is the case, it returns true. Otherwise, false is returned. 65 < 5, for instance, will return false.
5. **Greater Than Equal To** (`>=`). This operator detects if the first operand exceeds or equals the second operand If so, the output will be true. Otherwise, false is returned. 5>=5 will, for example, yields true.
6. **Less Than Equal To** (`<=`) The operator detects if the first operand is equal to or below the second operand. If so, the output will be true. Otherwise, false is returned. 5=5 will, for example, also yield true.

The program below shows all the relational operators in use:

```c#
using System;
namespace Relational_operators
{

    class examples
    {
        static void Main(string[] args)
        {
            bool outcome;
            int a = 6, b = 12;
            outcome = (a == b);
            Console.WriteLine("Equal to Operator: " + outcome);
            outcome = (a > b);
            Console.WriteLine("Greater than Operator: " + outcome);
            outcome = (a < b);
            Console.WriteLine("Less than Operator: " + outcome);
            outcome = (a >= b);
            Console.WriteLine("Greater than or Equal to: " + outcome);
            outcome = (a <= b);
            Console.WriteLine("Lesser than or Equal to: " + outcome);
            outcome = (a != b);
            Console.WriteLine("Not Equal to Operator: " + outcome);
        }
    }
}
```

This is the output:

```bash
Equal to Operator: False
Greater than Operator: False
Less than Operator: True
Greater than or Equal to: False
Lesser than or Equal to: True
Not Equal to Operator: True
```

### Conditional operators
A ternary operator is a simplified form of the if-else expression. The term ternary comes from the fact that it contains three operands. Contingent upon the value of a Boolean articulation, it will return one of two outcomes.

The conditional operator code:

```bash
 condition ? first_expression : second_expression; 
```

The syntax explanation:
**Condition**- It must be tested to see if it is true or untrue.

**First expression**- If the boolean expression results to true, it is assessed and the result is obtained.

**Second expression**- If the boolean expression results to false, it is assessed and the outcome is determined.

The program below shows all the conditional operators in use:

```c#
using System;
namespace Conditional_operators
{

    class example
    {
        static void Main(string[] args)
        {
            int a=6, b=7, outcome;
            outcome = a>b ? a:b;
            Console.WriteLine("final outcome: " + outcome);
            outcome = a < b ? a : b;
            Console.WriteLine("final outcome: " + outcome);
        }
    }
}
```

This is the output:

```bash
final outcome: 7
final outcome: 6
```

### Logical operators
They're used to integrate two or more conditions/constraints or to supplement the evaluation of the original condition. The following is a list of them.

1. **logical OR** (`||`): When one (or both) of the requirements in question are met, the ‘||' operator returns true. Otherwise, false is returned. For example, x || y returns true (i.e. non-zero). Of course, when both x and y are true, it returns true.
2. **Logical NOT** (`!`): If the condition in question is not met, the ‘!' operator returns true. Otherwise, false is returned.
3. **Logical AND** (`&&`): When both of the criteria in question are met, the ‘&&' operator returns true. Otherwise, false is returned. When both a and b are true, for example, a && b yields true (i.e. non-zero).

The program below shows all the logical operators in use:

```c#

using System;
namespace Logical_operators
{

    class example
    {
        static void Main(string[] args)
        {
            bool n = true, m = false, outcome;
            outcome = n && m;
            Console.WriteLine("AND Operator: " + outcome);
            outcome = n || m;
            Console.WriteLine("OR Operator: " + outcome);
            outcome = !n;
            Console.WriteLine("NOT Operator: " + outcome);

        }
    }
}
```

This is the output:

```bash
AND Operator: False
OR Operator: True
NOT Operator: False
```

### Miscellaneous operators
- **sizeof()**: In this operator, the size of a data type is returned.
- **Typeof()**: In this operator, the type of a class is returned.
- **&**: In this operator, the address of a variable is returned.
- **Is**: Determines whether or not an item is of a specific type.
- **As**: If the cast fails, it is not raised as an exception.

The program below shows the Bitwise operators in use:

```c#
using System;

namespace OperatorsAppl
{

    class Program
    {

        static void Main(string[] args)
        { 
            Console.WriteLine("The size of int is {0}", sizeof(int));
            Console.WriteLine("The size of short is {0}", sizeof(short));
            Console.WriteLine("The size of double is {0}", sizeof(double));
            int a, b;
            a = 20;
            b = (a == 1) ? 10 : 20;
            Console.WriteLine("Value of b is {0}", b);

            b = (a == 20) ? 10 : 20;
            Console.WriteLine("Value of b is {0}", b);
        }
    }
}
```

This is the output:

```bash
The size of int is 4
The size of short is 2
The size of double is 8
Value of b is 20
Value of b is 10
```

### Conclusion
In this tutorial we have learned about the many types of operators in the C# programming language in this session.

We also learned how to use these operators as well as their symbols. Operators are commonly used to declare conditions in decision-making statements, to employ loops, and to conduct algebraic operations.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
