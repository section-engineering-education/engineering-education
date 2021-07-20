### Introduction
An operator is a symbol that performs operations on operands. In [PHP(Hypertext Preprocessor)](https://www.php.net/), there are different types of operators depending on the number of operands they take. For example, urinary operators take only one operand. On the contrary, binary operators take two operands.
### Prerequisites
1.  xampp for `Linux` downloaded on your machine. You can download the latest version [here](https://www.apachefriends.org/download.html) or follow [this]() steps on how to download.
2. Little knowledge of PHP._
3.  A text editor like [Visual Studio](https://code.visualstudio.com/download) or any other depending on your taste.
> To run any PHP file, You must first start `Xampp`. This is done using the command below:.
```bash
$ sudo /opt/lampp/lampp start
​
Starting XAMPP for Linux 8.0.5-0...
XAMPP: Starting Apache...ok.
XAMPP: Starting MySQL...ok.
XAMPP: Starting ProFTPD...ok.
```
### Table of contents
- [Different between an Operator and an Operand](#different-between-an-operator-and-an-operand)
- [Creating a PHP file in Xampp](#creating-a-php-file-in-xampp)
- [Arithmetic Operators](#arithmetic-operators)
- [Comparison Operators](#comparison-operators)
- [String Operators](#string-operators)
- [Assignment Operators](#assignment-operators)
### Different between an Operator and an Operand
To understand the difference, let us look at the example below:
```PHP
$num = 10 + 20;`
```  
In the above example,  `+` is the `operator` while `10` and `20` are `Operands`. An  `Operator` is a symbol used to perform operations on operands/variables, while `Operand` is the object being acted upon. For instance, 10 and 20 are being added in the above example. 
> `$(dollar)` sign is used to create a variable `num` which holds the values 10 and 20.
### Creating a PHP file in Xampp
Now that we know what an operator and an operand are, let us start working with them. To do that, we have to create a `PHP file` in xampp. 
After downloading xampp, you will find that a folder called `/opt/lampp/htdocs`  is created. Open the folder by executing the command below:
```bash
$ cd /opt/lampp/htdocs
```
Let us create a folder `operators` in `htdocs` which we will use to store all our files. Execute the command below to create the `operators` folder:
```bash
$ sudo mkdir operators
```
To create a PHP file in `/opt/lampp/htdocs/operators`, use the command:
```bash
$ cd /opt/lampp/htdocs/operators 
$ sudo nano touch example.php
```
The above command will create a PHP file called `example.php` in the operators' folder. We will use this file later. 
### Arithmetic Operators
These are operators that are used on the operator to execute arithmetic operations. There are various Arithmetic operators supported by PHP:
- `Addition Operator(+)`  - It adds two operands.
- `Subtraction Operator(-)` - Subtracts the second operand from the first operand.
- `Muitiplacation Operators (*)` - This multiplies two operands.
- `Division Operator (/)` - Divides numerator by denominator.
- `Increment operator (++)` - Increases integer value by one.
- `Decrement Operator (--)` Decreases an operator value by one.
​
Below is an example to demonstrate PHP Arithmetic operators. Open the file we created (`example.php`) using [Gedit](https://help.gnome.org/users/gedit/stable/), add the following code snippet, and save. To open, navigate in `/opt/lampp/htdocs/operators` the run the command:
```bash
$ sudo gedit example.php
```
- Addition
```php
<?php
$x=50;
$y=30;
echo "x+y = ";
echo $x+$y;
?>
```
To run this code snippet, open your browser at http://localhost/operators/example.php. You should have an output similar to the one below: Do the same for all the operators.
​
Output
```
x+y = 80
```
- Subtraction
```php
<?php
$x=50;
$y=30;
echo "x-y = "; 
echo $x-$y;
?>
```
Output
```
x-y = 20
```  
- Multiplication                             
```php
<?php
$x=50;
$y=30;
echo "x*y = ";
echo $x*$y;
?>
```
Output
```php
x*y = 1500
```
- Division
```php
<?php
$x=50;
$y=30;
echo "x/y = ";
echo $x/$y;
?>
```
Output
```php
x/y = 1.6666666666667
```
- Increment 
```php
<?php
$x=50;
$y=30;
echo "++x = ";
echo $x++$y;
?>
```
Output
```php
++x = 51
```
- Decrement
```php
<?php
$x=50;
$y=30;
echo "--x = ";
echo $x--$y;
?>
```
Output
```php
--x = 50
```
### Comparison Operators
Comparison Operators are used to compare two operands. They either return a true or false Boolean value. If the comparison is correct, it returns true, else it returns false. PHP supports the following comparison operators.
- `Equality (==)` - If both operands are equal, return true; otherwise, return false.
- `Identitical (===)` -Return true if both operands have the same data type and are equal; otherwise, return false. 
- `Not identical(!==)` -If both operands are not equal or have the same data type, return true; otherwise, return false.
- `Greater than (>)` - Return true if the left operand is larger than the right operand; otherwise, return false.
- `Greater than or equal to(>=)` - Return true if the left operand is greater or equal to the right operand; otherwise, return false.
- `Less than (<)` - If the operand on the left is smaller than the operand on the right, return true; otherwise, return false. 
- `Less than or equal(<=)` - If the left operand is smaller than or equal to the right operand, return true; otherwise, return false. 

Let us have a look at a program that illustrate the working of comparison operators:
- Equality
```php
<?php
$x = 100;  
$y = 100;
var_dump($x == $y) ; // returns true because values are equal . ""
?>
```
Output
```
bool(true)
```
- Identical
```php
<?php
$x = 100;  
$y = "100";
var_dump($x === $y).; // returns false because types are not the same
?>
```
Output
```
bool(false)
``` 
- Not identical
```php
<?php
$x = 100;  
$y = "100";
var_dump($x !== $y); // returns true because types are not equal
?>
```
Output
```
bool(true)
```
- Greater than
```php
<?php
$x = 100;  
$y = 100;
var_dump($x > $y); // returns false because $x is not greater than $y
?>
```
Output
```
bool(false)
```
- Less than or equal
```php
<?php
$x = 100;  
$y = 100;
var_dump($x <= $y); // returns true because $x is less than or equal to $y
?>
```
Output
```
bool(true)
```
- Less than
```php
<?php
$x = 100;  
$y = 100;
var_dump($x < $y); // returns false because $x is not less than $y
?>
```
Output
```
bool(false)
```
- Less than or equal
```php
<?php
$x = 100;  
$y = 100;
var_dump($x <= $y); // returns true because $x is less than or equal to $y
?>
```
Output
```
bool(true)  
```
### String Operators
In PHP, we have two string operators. 
The `concatenation operator` ('.')  Which returns the right and left arguments concatenated and the  `concatenation assignment operator`  ('.=')  which appends the right-hand argument to the left-hand argument.
- Concatenation Operator.  The example below demonstrates the use of a `concatenation operator` :
```php
<?php
$a = "Hello ";
$b = $a . "World!"; // here, $b contains "Hello World!"
echo "$b";
?>
```
Output
```php
Hello World! 
```
- Concatenation assignment operator.  The example below demonstrates the use of a `concatenation assignment operator`:
```php
<?php
$a = "Good ";
$a .= "Work!"; // here, $a contains "Good Work!"
echo "$a";
?>
```
Output
```
Good Work! 
```
### Assignment Operators
When writing a value to a variable in PHP, the `assignment` operators are used with numeric values.  `=`  operator assigns the left operand the value of the expression on the right. It is the main assignment operator. In PHP, we have the following types of assignments operators:
- `+= Addition` - It adds and assigns a new value to a variable. 
- `-= Subtraction` - It subtracts and assigns a new value to a value.
- `*= Multiplication`  -It multiplies and assigns a new value to a valuable
- `/=   Division` - It divides and assigns a new value to a variable. 
- `%= modules` - The modulus of two numbers is computed, and the result is assigned to the first. 
​
Below is a program that illustrate the working of assignment operators:
- Addition
```php
<?php
$x = 50; 
$x += 100; // addition
echo "$x";
?>
```
Running the code snippets above yields the output below:
​
Output
```php
150
```
- Subtraction
```php
<?php
$x1 = 100;
$x1-= 50; //subtraction
echo "$x1";
?>
```
Output
```php
50
```
- Multiplication
```php
<?php
$x2 = 150;
$x2*= 2; // multiplacation
echo "$x2";
?>
```
Output
```php
300
```
- Division
```php
<?
$x3 = 200;
$x3/= 2; //division
echo "$x3";
?>
```
Output
```php
100
```
- Modulus
```php
<?php
$x4 = 250;
$x4/= 4; //modulus
echo "$x4";
?>
```
Output
```php
62.5 
```
### Conclusion
In this article, we have looked at:
1. Definition of an operator and an operand.
2. How to create a PHP file in Xampp.
3. Different Operators In PHP
​
Variables and functions are both used with operators to perform various operations.
​
That’s all folks! Happy Learning!
### Further Reading
1. [PHP Operators  Guide](https://www.php.net/manual/en/language.operators.php)
2. [Comparison Operators in PHP](https://www.php.net/manual/en/language.operators.comparison.php)