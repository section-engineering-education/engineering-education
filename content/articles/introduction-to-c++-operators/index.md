---
layout: engineering-education
status: publish
published: true
url: /introduction-to-c++-operators/
title: Introduction to C++ Operators
description: In this article we will go through the basics of operators in C++. Operators are symbols that help us perform specific mathematical and logical operand computations.
author: dawe-daniel
date: 2021-01-26T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-constructors-in-c++/hero.jpg
    alt: Introduction to C++ Operators image
---
Operators are symbols that help us perform specific mathematical and logical operand computations. C++ has several types of operators built-in to the language. This article will go through the commonly used operators.
<!--more-->
### Prerequisites
To follow this article, you will need to have:
- A basic understanding of the C++ language.

- [Codeblocks IDE](http://www.codeblocks.org/downloads) to run the code.

### Overview
1. [Operator and operand definition](#operator-and-operand-definition)

2. [Assignment operators](#assignment-operators)

3. [Arithmetic operators](#arithmetic-operators)

4. [Relational operators](#relational-operators)

5. [Logical operators](#logical-operators)

6. [Bitwise operators](#bitwise-operators)


### Operator and operand definition
An operator is a symbol that tells the compiler that it should execute a certain mathematical or logical manipulation. They are used in [programs to modify data and variables](https://www.studytonight.com/c/operators-in-c.php).

Operand on the other hand is any numerical value, variable, and constant on which a program makes an operation.

For example, consider the statement below:

```bash
a = x+y;
```

Here, `+` is the addition operator, and `x` and `y` are operands.

The addition operator instructs the compiler to add both `x` and `y` operands.

### Assignment operators
They are used to assign a variable with a value. On the left-hand side of the assignment operator, the operand is a variable, while on the right-hand side, the operand is a value. 

The value being assigned to the variable must be identical to the data type of the variable, or an error would be produced by the compiler.

Types of assignment operators:
- `=` - It is used to assign the value on the right of the assignment operator to the variable.

- `+=` - It is a combination of the operators `+` and `=`. First, the value of the variable is added to the right-hand value, and then the result is assigned to the variable.

- `-=` - It is a combination of the operators `-` and `=`. First, it subtracts the value from the variable's value on the right-hand side and then applies the result to the variable.

- `*=` - It is a combination of the operators `*` and `=`. First, the value of the variable is multiplied by the value on the right-hand side, and then the result is applied to the variable.

- `/=` - It is a combination of the operators `/` and `=`. First, the value of the variable is divided by the right-hand value and then the result is assigned to the variable.

- `%=` - It is a combination of the operators `%` and `=`. First, the remainder of the current value of the variable is found dividing by the right-hand value, and then the result is assigned to the variable.

Program to illustrate the working of assignment operators:

```c++
#include <iostream>
using namespace std;

int main() {
	int a = 6;
	int b = 3;

	cout << "a = " << (a += b)<< endl; // a = a + b
	cout << "a = " << (a -= b)<< endl; // a = a - b
	cout << "a = " << (a *= b)<< endl; // a = a * b
	cout << "a = " << (a /= b)<< endl; // a = a / b
	cout << "a = " << (a %= b)<< endl; // a = a % b

	return 0;
}
```

Output:

```bash
a = 9
a = 6
a = 18
a = 6
a = 0
```

In the program above, when the first code is executed 9 is assigned to `a`. When the program executes the second line it takes `a` as 9 instead of 6. Therefore the value of `a` throughout the program depends on the result of the last line of code executed before it.

### Arithmetic operators
Arithmetic operators are operators that are used for operand mathematical/arithmetic operations.

Types of mathematical operators:
- Unary operators - They operate with one operand. For example: `++` , `--`.

- Binary operators – They operate with two operands. For example: `+` ,` –` , `* `, `/`.

There are two unary operators used when increasing and decreasing scalar values. They can be used either before the variable (prefix: ++n) or after the variable (postfix: n++). 

In prefix mode, it increments (adds 1) first then uses the value, while in postfix it uses the value first and then increments. The same applies to the decrement (subtracts 1) operator.

Binary operators are classified as follows:
- `+` (Addition) – Adds two operands.

- `–` (Subtraction) – Subtracts two operands.

- `*` (Multiplication) – Multiplies two operands.

- `/` (Division) – Divides the operands and passes the result as the quotient value. 

- `%` (Modulus operation) – Gives the remainder as the result after division.

Program to illustrate the working of arithmetic operators:

```c++
#include <iostream>
using namespace std;

int main() {
	int x=5;
	int y=3;

	cout << "x + y = " << (x + y) << endl;
	cout << "x - y = " << (x - y) << endl;
	cout << "x * y = " << (x * y) << endl;
	cout << "x / y = " << (x / y) << endl;
	cout << "x % y = " << (x % y) << endl;
	cout<<" ++x : "<< ++x <<endl;
	cout<<" --x : "<< --x <<endl;
  cout<<" x++ : "<< x++ <<endl;
  cout<<" x-- : "<< x-- <<endl;
	cout<<" ++y : "<< ++y <<endl;
	cout<<" --y : "<< --y <<endl;
	cout<<" y++ : "<< y++ <<endl;
	cout<<" y-- : "<< y-- <<endl;

	return 0;
}
```

Output:

```bash
x + y = 8
x - y = 2
x * y = 15
x / y = 1
x % y = 2
++x : 6
--x : 5
x++ : 5
x-- : 6
++y : 4
--y : 3
y++ : 3
y-- : 4
```

### Relational operators
Relational operators are used when comparing the values of operands. If the condition is true, 1 will be returned, and if it is false, 0.

- `==` Is Equal To – It confirms whether or not the two operands given are equal. If true it returns 1 and when false it returns 0.

- `! =` Not Equal To – It confirms whether or not the two operands given are equal. If true it returns 1 and when false it returns 0.

- `>` Greater Than - It confirms whether the operand on the left is or is not greater than the operand on the right. If true it returns 1 and when false it returns 0.

- `< ` Less Than - It confirms if the operand on the left is lower than the one on the right. If true it returns 1 and when false it returns 0.

- `>=` Greater Than or Equal To - It confirms if the operand on the left is greater than the operand on the right or equal to it. If true it returns 1 and when false it returns 0.

- `<=` Less Than or Equal To - It confirms if the operand on the left is less than the operand on the right or equal to it. If true it returns 1 and when false it returns 0.

Program to illustrate how relational operators work:

```c++
#include <iostream>
using namespace std;
int main()
{
	int X, Y;
	X=5;
	Y=3;
	
	// equal to
	if (X == Y) {
		cout << "X == Y";
	}
	else {
		cout << "X != Y\n";
	}
	
	// not equal to
	if (X != Y) {
		cout << "X != Y\n";
	}
	else {
		cout << "X == Y\n";
	}
	
	// greater than example
	if (X > Y) {
		cout << "X > Y\n";
	}
	else {
		cout << "X < Y\n";
	}
	
	// less than example
	if (X < Y) {
		cout << "X < Y\n";
	}
	else {
		cout << "X > Y\n";
	}
	
	// greater than or equal to
	if (X >= Y) {
		cout << "X >= Y\n";
	}
	else {
		cout << "X < || != Y\n";
	}
	
	// lesser than or equal to
	if (X <= Y) {
		cout << "X <= Y\n";
	}
	else {
		cout << "X > || != Y\n";
	}
	
	return 0;
}
```

Output:

```bash
X != Y
X != Y
X > Y
X > Y
X >= Y
X > || != Y
```


### Logical operators
These are used to incorporate two or more conditions or to supplement the initial condition evaluation under consideration. If the expression under consideration is true, it returns 1. Otherwise, it returns 0.

Logical operators in C++:

- `&&` Logical AND.- It returns true when both conditions under consideration are met. Otherwise, returns false.

- `||` Logical OR. - It returns true if one or both of the conditions under consideration is met. Otherwise, false returns.

- `! ` – If the condition under consideration is not satisfied, it returns true. Otherwise, returns false.

Program to illustrate how Logical operators work:

```c++
#include <iostream>
using namespace std;

int main()
{
	int w,x,y,z;
	w=20;
	x=5;
	y=10;
	z=10;

	if (w > x && y == z) {
		cout << "w is greater than x AND y is equal to z"<<endl;
	}
	else {
		cout << "AND condition not satisfied"<<endl;
	}
	
	if (w > x || y == z) {
		cout << "w is greater than x OR y is equal to z"<<endl;
	}
	else {
		cout << "Neither w is greater than x nor y is equal to z"<<endl;
	}
	
	if (!w) {
		cout << "w is zero"<<endl;
	}
	else {
		cout << "w is NOT zero"<<endl;
	}
	return 0;
}
```

Output:

```bash
w is greater than x AND y is equal to z
w is greater than x OR y is equal to z
w is NOT zero
```

The Logical `&&` operator evaluates to 1 because both operands are true. The logical `||` operator also evaluates to 1 because one of the operands is true. The logical `!` operator evaluates to false because the operand is false.

### Bitwise operators
Bitwise operators are used on individual bits to perform operations. They are used beside `int` and `char` data types. These operations require the individual bits to be checked, set, or moved. They are needed since arithmetic operations at the bit-level are carried out by the Arithmetic-Logic Unit (ALU) present in the computer's CPU.

Types of bitwise operators:

- `&` Bitwise AND - It takes two digits as operands and does AND on the two numbers each bit. The AND output is 1 only when all of the bits are 1.

- `|` Bitwise OR - It takes two digits as operands and does OR on the two numbers each bit.

If either of the two bits is 1, the output of the OR will be 1, otherwise, a 0 gets returned.

- `^` Bitwise XOR - Takes two digits as operands and executes XOR on the two numbers each bit. If its two bits are distinct, so XOR's result is 1. Or else, a 0 will be returned.

- `~` Bitwise NOT - A number is taken and all bits of it are inverted.

- `<<` Bitwise Shift Left - It takes two digits, moves the first operand's bits to the left, and the second operand determines the number of positions to shift.

- `>>` Bitwise Shift Right- It takes two digits, moves the first operand's bits right, and the second operand determines the number of positions to shift.

Program to illustrate the code working of bitwise operators:

```c++
#include <iostream>
using namespace std;

main() {
	unsigned int a = 60; // 60 = 0011 1100 
	unsigned int b = 13; // 13 = 0000 1101
	int x = 0; 

	x = a & b; // 12 = 0000 1100
	cout << "The value of x: " << x << endl ;

	x = a | b; // 61 = 0011 1101
	cout << "The value of x: " << x << endl ;

	x = a ^ b; // 49 = 0011 0001
	cout << "The value of x: " << x << endl ;

	x = ~a; // -61 = 1100 0011
	cout << "The value of x: " << x << endl ;

	x = a << 2; // 240 = 1111 0000
	cout << "The value of x: " << x << endl ;

	x = a >> 2; // 15 = 0000 1111
	cout << "The value of x: " << x << endl ;
	return 0;
}
```

Output:

```bash
The value of x: 12
The value of x: 61
The value of x: 49
The value of x: -61
The value of x: 240
The value of x: 15
```

In the program above we compare the individual bits of the two integers `60` and `13` that we have.  As we had stated before bitwise operators perform operations on individual bits. Our integers `60` and `13` in binary format is `0011 1100` and `0000 1101`. The program returns a new integer from the binary digits formed after comparison. For example in the `&` operator we have:

```bash
60 = 0011 1100
&
13 = 0000 1101
________________
12  = 0000 1100   //result after comparison
```

Here, when we perform the `&` operation, it first compares each of the individual bits of the integers `60` and `13`. The program will return a 1 anywhere both of the individual bits of the two integers have a 1. If both of them do not have a `1`, a `0` will return. 

Afterward, the binary digits formed from the comparison will convert to an integer. Thus, `0000 1100` is the result of the comparison to `12`.   

The bitwise OR `|` operator performs the following operation when the program is executed:

```bash
60 = 0011 1100
|
13 = 0000 1101
________________
61  = 0011 1101  //result after comparison
```

Here, when we perform the `|` operation, it first compares each of the individual bits of the integers `60` and `13`. The program returns a 1 if either of the individual bits of the two integers has a 1. 

If neither of them have a `1`, a `0` will be returned. Afterwards, the binary digits formed from the comparison will convert to an integer. Thus, `0011 1101` is the result of the comparison `61`.

The bitwise XOR `^` operator performs the following operation when the program is executed:

```bash
60 = 0011 1100
^
13 = 0000 1101
_______________
49  = 0011 0001  //result after comparison
```

Here, when we perform the `^` operation, it first compares each of the individual bits of the integers `60` and `13`. If the two bits are distinct, the XOR's result is 1. 

Otherwise, a 0 will return. Afterwards, the binary digits formed from the comparison will convert to an integer. Thus, `0011 0001` is the result of the comparison `49`.

The bitwise NOT `~` operator performs the following operation when the program is executed:

```bash
~60 = 0011 1100
________________
-61 = 1100 0011   //result after inverting
```

Here, it is somewhat different from the ones we've looked at so far. It only takes an operand after it compares, rather than taking operands on both of the sides. For any individual bit, the `~` operator inverts a number: from 0 to 1 and from 1 to 0. 

When the individual bits of 60 are inverted, a new binary digit is formed. `1100 0011` is the binary digit formed after inverting the individual bits of `60` and `1100 0011` in integer form is `-61`.

The bitwise SHIFT LEFT `<<` operator performs the following operation when the program is executed:

```bash
60 = 0011 1100
60<<2
11 1100
0  		 // The two bits being shifted to the left
0
```

Here, instead of comparing the individual bits of two integers, they shift the bits of an integer. The integer we want to shift, we place on the left side of the [Bitwise SHIFT LEFT operator](https://computerscience4beginners.wordpress.com/2016/09/27/bitwise-operators). 

On the right, we place the number we want to shift by. So, for example, `60 << 2`  will shift `2` bits of our integer `60` to the `left`. If we begin with a positive number (0) on the left, then all the empty spaces are filled with a 0 and if it starts with a negative number where the leftmost bit is a 1, all empty spaces are filled with 1. 

The 2 open bits of memory that remain are replaced with zeros as shown below:

```bash
60<<2
11 1100
0
0
= 11 1100 00  // The leftmost bit being a 1, two one's are added to replace the shifted bits
_____________
= 1111 0000 = 240 //result after shifting
```

Afterward, the binary digits formed is `1111 0000` are converted to decimal to become `240`.

The bitwise SHIFT RIGHT `>>` operator performs the following operation when the program is executed:

```bash
60 = 0011 1100
60>>2
0011 11
0	//The two bits being shifted to the right
0
```

Here, instead of comparing the individual bits of two integers, they shift the bits of an integer. The integer we want to shift, we place on the left side of the [Bitwise SHIFT RIGHT operator](https://computerscience4beginners.wordpress.com/2016/09/27/bitwise-operators). 

On the right, we place the number to shift by. So, for example, `60 >> 2`  will shift `2` bits of our integer `60` to the `left`. If we begin with a positive number (0) on the right, then all the empty spaces are filled with a 0 and if it starts with a negative number where the rightmost bit is a 1, all empty spaces are filled with 1. 

The 2 open bits of memory that remain are replaced with one's as shown below:

```bash
60>>2
0011 11
0
0
= 0000 1111  // The rightmost bit is a 1, two ones are added to replace the shifted bits
_____________
= 0000 1111 = 15   //result after shifting
```

### Conclusion
In this article, we got to explore operators provided by the C++ language. You need to know each operator as a beginner, when, and how to use it. With that, you should be able to perform any operation of mathematical and logical computation in your program with ease.

Happy Coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
