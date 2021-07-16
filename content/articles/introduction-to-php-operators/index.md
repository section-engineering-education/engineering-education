### Introduction
An operator is is a symbol that performs operations on operands. In [PHP(Hypertext Preprocessor)](https://www.php.net/), there are different types of operators depending on the number of operands they take. For example, urinary operators take only one operand. On the contrary, binary operators take two operands..

### Prerequisites

1.  Xampp for `Linux` downloaded on your machine. You can download the latest version [here](https://www.apachefriends.org/download.html) or follow [this]() steps on how to download.
2. Little knowledge of PHP

3.  A text editor like [Visual studio](https://code.visualstudio.com/download) or any other depending on your taste.

`NB`
To run any PHP file, You must first start `Xampp`. This is done using this command.

```bash
$ sudo /opt/lampp/lampp start

Starting XAMPP for Linux 8.0.5-0...
XAMPP: Starting Apache...ok.
XAMPP: Starting MySQL...ok.
XAMPP: Starting ProFTPD...ok.
```

### Table of contents
 1. [Different between an Operator and an Operand](#different-between-an-operator-and-an-operand)
 2. [Creating a php file in Xampp](#creating-a-php-file-in-xampp)
 3. [Arithmetic Operators](#arithmetic-operators)
 4. [Comparison Operators](#comparison-operators)
 5. [String Operators](#string-operators)
 6. [Assignment Operators](#assignment-operators)

#### Different between an Operator and an Operand

To understand the difference, let us look at the example below:

```PHP
   $num=10+20;`
 ```  

  In the above example  `+` is the `operator` while `10` and `20` are `Operands`

 An  `Operator` is a symbol used to perform operations on operands/variables. 

 `Operand` is the object being acted upon. 10 and 20 are being added in the above example. 

 NB. `$(dollar)` sigh is used to create a variable `num` which holds the values 10 and 20.

 #### Creating a php file in Xampp

 Now that we know what an operator and an operand are, let us start working with them. To do that, we have to create a `PHP file` in Xampp. 

  After downloading xampp, you will find that a folder called `/opt/lampp/htdocs`  is created. Open the folder by executing the command below:

 ```bash
 $ cd /opt/lampp/htdocs
 ```
 Let us create a folder `operators` in `htdocs` which we will use to store all our files.
Execute the command below to create the `operators` folder:
```bash
$ sudo mkdir operators
```
To create a php file in `/opt/lampp/htdocs/operators`, use the command:

```bash
$ cd /opt/lampp/htdocs/operators 
$ sudo nano touch example.php
```
The above command will create a PHP file called `example.php` in the operators' folder. We will use this file later. 

#### Arithmetic Operators
These are operators that are used on the operator to execute arithmetic operations.

There are various Arithmetic operators supported by PHP:

These are operators that are used on the operator to execute arithmetic operations.
There are various Arithmetic operators supported by PHP:
1. Addition Operator(+)  - It adds two operands.
2. Subtraction Operator(-) - Subtracts the second operand from the first operand.
3. Muitiplacation Operators (*) - These multiplies two operands.
4. Division Operator (/) - Divides numerator by denominator.
5. Increment operator (++) - Increases integer value by one.
6. Decrement Operator (--) Decreases an operator value by one.

Below is an example to demonstrate PHP Arithmetic operators.
Open the file we created (`example.php` ) using [Gedit](https://help.gnome.org/users/gedit/stable/), add the following code snippet, and save. To open, navigate in `/opt/lampp/htdocs/operators` the run the command:
```bash
$ sudo gedit example.php
```

```php
<?php
$x=50;
$y=30;
echo "x+y = ";
echo $x + $y . '<br/>';  
echo "x-y = ";
echo $x - $y . '<br/>'; 
echo "x*y = ";
echo $x * $y . '<br/>';
echo "x/y = ";
echo $x / $y . '<br/>'; 
echo "++x = ";
echo ++$x . '<br/>';
echo "--x = ";
echo --$x . '<br/>';
echo "++y = ";
echo ++$y . '<br/>';
echo "--x = ";
echo --$y . '<br/>';
echo "x++ = ";
echo $x++. '<br/>';
echo "x-- = ";
echo $x--. '<br/>';
echo "y++ = ";
echo $y++ .'<br/>';
echo "y-- = ";
echo $y--. '<br/>';
?>
```
To run this code snipet, open your browser at http://localhost/operators/example.php. You should have an output similar to the one below:
Output

```php
x+y = 80
x-y = 20
x*y = 1500
x/y = 1.6666666666667
++x = 51
--x = 50
++y = 31
--x = 30
x++ = 50
x-- = 51
y++ = 30
y-- = 31
```
#### Comparison Operators
 Comparison Operators are used to compare two operands.  

They either return a true or false Boolean value. If the comparison is correct, it returns true else it returns false.

 PHP supports the following comparison operators.

1. Equality (==) - If both operands are equal, return true; otherwise, return false.

2. Identity (===)-Return true if both operands have the same data type and are equal; otherwise, return false. 

3. Not Identical (!===)-If both operands are not equal or have the same data type, return true; otherwise, return false.

 4. Greater than (>)- Return true if the left operand is larger than the right operand; otherwise, return false.

5. Greater than or equal to(>=)- Return true if the left operand is greater or equal to the right operand; otherwise, return false.

6. Less than (<)- If the operand on the left is smaller than the operand on the right, return true; otherwise, return false. -->

7. Less than or equal(<=) - If the left operand is smaller than or equal to the right operand, return true; otherwise, return false. 

Let us have a look at a program that illustrate the working of comparison operators:
```php
<?php
$x = 100;  
$y = 100;
var_dump($x == $y) ; // returns true because values are equal . ""
echo"<br>";
var_dump($x === $y).'<br/>'; // returns false because types are not equal
echo"<br>";
var_dump($x != $y); // returns false because values are equal
echo"<br>";
var_dump($x !== $y); // returns true because types are not equal
echo"<br>";
var_dump($x > $y); // returns true because $x is greater than $y
echo"<br>";
var_dump($x <= $y); // returns true because $x is less than or equal to $y
echo"<br>";
var_dump($x < $y); // returns true because $x is less than $y
echo"<br>";
var_dump($x <= $y); // returns true because $x is less than or equal to $y
?>
```
Output
```
bool(true)
bool(true)
bool(false)
bool(false)
bool(false)
bool(true)
bool(false)
bool(true)  
```
#### String Operators
In PHP we have two string operators:

The `concatenation operator` ('.')  which returns the right and left arguments concatenated and the  `concatenation assignment operator`  ('.=')  which appends the right-hand argument to the left-hand argument.
- Concatenation Operator.  The example below demonstrates the use of a `concatenation operator` :
```php
$a = "Hello ";
$b = $a . "World!"; // here, $b contains "Hello World!"
echo "$b";
?>
```
Output
```
Hello World! 
```
B. Following `concatenation assignment operator` we have the following Example:
```php
$a = "Good ";
$a .= "Work!"; // here, $a contains "Good Work!"
echo "$a";
?>
```
Output
```
Good Work! 
```
#### Assignment Operators
When writing a value to a variable in PHP, the `assignment` operators are used with numeric values.

  `=` This operator assigns the left operand the value of the expression on the right. It is the main assignment operator

In PHP we have the following types of assignments operators:
   
1) += Addition - It adds and assigns a new value to a variable. 
2) -= Subtraction  - It subtracts and assigns a new value to a value.
3) *=   Multiplication  -It multiplies and assigns a new value to a valuable
 4) /=   Division - It divides and assigns a new value to a variable. 
5) %= modules - The modulus of two numbers is computed and the result is assigned to the first. 

Below is a program that illustrate the working of assignment operators:
```php
<?php
$x = 50; 
$x1 = 100;
$x2 = 150;
$x3 = 200;
$x4 = 250;
$x += 100; // addition
echo "$x <br/>";
$x1-= 50; //subtraction
echo "$x1 <br/>";
$x2*= 2; // multiplacation
echo "$x2 <br/>";
$x3/= 2; //division
echo "$x3 <br/>";
$x4/= 4; //modulus
echo "$x4 <br/>";
?>
```
Running the code snippets above yields the output below:
```
 150
 50
 300
 100
 62.5 
```
### Conclusion
In this article we have looked at:

1. Defination of an operator and an operands.
2. How to create a PHP file in Xampp.
3. Different Operators In PHP

Variables and functions are both used with operators to perform various operations.

That’s all folks! Happy Learning!



