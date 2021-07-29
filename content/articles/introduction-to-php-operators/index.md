---
layout: engineering-education
status: publish
published: true
url: /introduction-to-php-operators/
title: Introduction to PHP Operators
description: In this article, we will talk about the PHP operators, the differences between an operator and an operand and a lot more.
author: serah-muthoni
date: 2021-07-29T00:00:00-07:32
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/introduction-to-php-operators/hero.png 
   alt: Introduction to PHP Operators example image
---
An operator is a symbol that performs operations on operands. In [PHP (Hypertext Preprocessor)](https://www.php.net/), there are different types of operators depending on the number of operands they take. For example, urinary operators take only one operand. On the contrary, binary operators take two operands.
<!--more-->

### Prerequisites
To follow along with this tutorial, you need to have:
- `Xampp` downloaded on your machine. I will guide you on how to download.
- A basic knowledge of PHP.
- A text editor like [Visual Studio](https://code.visualstudio.com/download).

> I will use Linux in this tutorial, but you are free to use Windows as well.
### Table of contents
- [Installing Xampp](#installing-xampp)
- [Differences between an Operator and an Operand](#differences-between-an-operator-and-an-operand)
- [Creating a PHP file in Xampp](#creating-a-php-file-in-xampp)
- [Arithmetic Operators](#arithmetic-operators)
- [Comparison Operators](#comparison-operators)
- [String Operators](#string-operators)
- [Assignment Operators](#assignment-operators)
### Installing Xampp
To execute PHP operators programs, you need to access a web server in which the PHP programs will be running. Therefore you need to either download LAMP, MAMP, or XAMPP depending on the Operating System that you are using. In my case, I am using `Ubuntu Linux`. 

We will download the latest version of Xampp [here](https://www.apachefriends.org/download.html).

After successfully downloading Xampp, navigate to where it was downloaded and open in terminal to install the package. In my case, it was downloaded in the `downloads` folder.

You need to first make the package executable using the chmod command before installing. To do that, execute the command below in the terminal.
```bash
sudo chmod 755 xampp-linux-x64-8.0.8-1-installer.run
```

You will not see any output after executing the command above. To verify that we have executed the permission, run the command below:
```bash
ls -l xampp-linux-x64-8.0.8-1-installer.run
```

##### Output
```bash
-rwxr-xr-x 1 sarah sarah 159498085 Ado 28 23:22 xampp-linux-x64-8.0.8-1-installer.run
```

Now run the installer by executing the command below:
```bash
$ sudo ./xampp-linux-x64-8.0.8-1-installer.run
```

You should have something similar to the image below:

![xampp installer](/engineering-education/introduction-to-php-operators/image1.png)

Continue clicking `Next` until you are done with the installation progress.

![xampp setup](/engineering-education/introduction-to-php-operators/image2.png)

Once the installation is finished, move to the `Manage Servers tab` and click `Start All` to start all the services. You can change their status by selecting Start or Stop.

![xampp servers](/engineering-education/introduction-to-php-operators/image3.png)

Alternatively, you can start the services by using the command below:
```bash
$ sudo /opt/lampp/lampp start
```

##### Output
```bash
Starting XAMPP for Linux 8.0.5-0...
XAMPP: Starting Apache...ok.
XAMPP: Starting MySQL...ok.
XAMPP: Starting ProFTPD...ok.
```

Let's now verify that the installation was successful. Open your browser at http://localhost/dashboard. You should see something like this:

![dashboard](/engineering-education/introduction-to-php-operators/image4.png)

Congrats! You have successfully prepared the environment for your PHP Operators programs. 

A folder `/opt/lampp/htdocs` has been created after installing Xampp. This is where we will create our PHP files.

### Differences between an Operator and an Operand
To understand the difference, let us look at the example below:
```PHP
$num = 10 + 20;
```  
In the example above, `+` is the `operator` while `10` and `20` are `Operands`. An  `Operator` is a symbol used to perform operations on operands/variables, while `Operand` is the object being acted upon. For instance, 10 and 20 are being added in the above example. 

> `$(dollar)` sign is used to create a variable `num` which holds the values 10 and 20.

### Creating a PHP file in Xampp
Now that we know what an operator and an operand are, let us start working with them. To do that, we have to create a `PHP file` in xampp. 
Open `/opt/lampp/htdocs` folder by executing the command below:
```bash
cd /opt/lampp/htdocs
```
Let us create a folder `operators` in `htdocs` which we will use to store all our files. Execute the command below to create the `operators` folder:
```bash
sudo mkdir operators
```
To create a PHP file in `/opt/lampp/htdocs/operators`, use the command:
```bash
cd /opt/lampp/htdocs/operators 
sudo nano touch example.php
```

The above command will create a PHP file called `example.php` in the operators' folder. We will use this file later. 

### Arithmetic Operators
These are operators that are used on the operator to execute arithmetic operations. There are various Arithmetic operators supported by PHP:
- `Addition Operator (+)`  - It adds two operands.
- `Subtraction Operator (-)` - Subtracts the second operand from the first operand.
- `Multiplication Operators (*)` - This multiplies two operands.
- `Division Operator (/)` - Divides numerator by denominator.
- `Increment operator (++)` - Increases integer value by one.
- `Decrement Operator (--)` - Decreases an operator value by one.

Below is an example to demonstrate PHP Arithmetic operators. Open the file we created (`example.php`) using [Gedit](https://help.gnome.org/users/gedit/stable/), add the following code snippet, and save. To open, navigate in `/opt/lampp/htdocs/operators` then run the command:
```bash
sudo gedit example.php
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

To run this code snippet, open your browser at `http://localhost/operators/example.php`. You should have an output similar to the one below:

#### Output
```bash
x+y = 80
```

Do the same for all the operators.

- Subtraction
```php
<?php
$x=50;
$y=30;
echo "x-y = "; 
echo $x-$y;
?>
```
#### Output
```bash
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
#### Output
```bash
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
#### Output
```bash
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
#### Output
```bash
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
#### Output
```bash
--x = 50
```

### Comparison Operators
Comparison Operators are used to comparing two operands. They either return a true or false Boolean value. If the comparison is correct, it returns true, else it returns false. PHP supports the following comparison operators:
- `Equality (==)` - If both operands are equal, return true; otherwise, return false.
- `Identical (===)` - Return true if both operands have the same data type and are equal; otherwise, return false. 
- `Not identical (!==)` - If both operands are not equal or have the same data type, return true; otherwise, return false.
- `Greater than (>)` - Return true if the left operand is larger than the right operand; otherwise, return false.
- `Greater than or equal to (>=)` - Return true if the left operand is greater or equal to the right operand; otherwise, return false.
- `Less than (<)` - If the operand on the left is smaller than the operand on the right, return true; otherwise, return false. 
- `Less than or equal(<=)` - If the left operand is smaller than or equal to the right operand, return true; otherwise, return false. 

Let us have a look at a program that illustrate the working of comparison operators:

- Equality
```php
<?php
$x = 100;  
$y = 100;
var_dump($x == $y) ; // returns true because values are equal.
?>
```
#### Output
```bash
bool(true)
```
- Identical
```php
<?php
$x = 100;  
$y = "100";
var_dump($x === $y).; // returns false because types are not the same.
?>
```
#### Output
```bash
bool(false)
``` 
- Not identical
```php
<?php
$x = 100;  
$y = "100";
var_dump($x !== $y); // returns true because types are not equal.
?>
```
#### Output
```bash
bool(true)
```
- Greater than
```php
<?php
$x = 100;  
$y = 100;
var_dump($x > $y); // returns false because $x is not greater than $y.
?>
```
#### Output
```bash
bool(false)
```
- Less than or equal
```php
<?php
$x = 100;  
$y = 100;
var_dump($x <= $y); // returns true because $x is less than or equal to $y.
?>
```
#### Output
```bash
bool(true)
```
- Less than
```php
<?php
$x = 100;  
$y = 100;
var_dump($x < $y); // returns false because $x is not less than $y.
?>
```
#### Output
```bash
bool(false)
```
- Less than or equal
```php
<?php
$x = 100;  
$y = 100;
var_dump($x <= $y); // returns true because $x is less than or equal to $y.
?>
```
#### Output
```bash
bool(true)  
```
### String Operators
In PHP, we have two string operators. 
The `concatenation operator` ('.')  Which returns the right and left arguments concatenated and the  `concatenation assignment operator`  ('.=')  which appends the right-hand argument to the left-hand argument.

- Concatenation Operator. The example below demonstrates the use of a `concatenation operator`:
```php
<?php
$a = "Hello ";
$b = $a . "World!"; // here, $b contains "Hello World!"
echo "$b";
?>
```
#### Output
```bash
Hello World! 
```
- Concatenation assignment operator. The example below demonstrates the use of a `concatenation assignment operator`:
```php
<?php
$a = "Good ";
$a .= "Work!"; // here, $a contains "Good Work!"
echo "$a";
?>
```
#### Output
```bash
Good Work! 
```

### Assignment Operators
When writing a value to a variable in PHP, the `assignment` operators are used with numeric values. `=` operator assigns the left operand the value of the expression on the right. It is the main assignment operator. In PHP, we have the following types of assignments operators:
- `+= Addition` - It adds and assigns a new value to a variable. 
- `-= Subtraction` - It subtracts and assigns a new value to a value.
- `*= Multiplication` - It multiplies and assigns a new value to a value.
- `/=   Division` - It divides and assigns a new value to a variable. 
- `%= modules` - The modulus of two numbers is computed, and the result is assigned to the first. 

Below is a program that illustrate the working of assignment operators:

- Addition
```php
<?php
$x = 50; 
$x += 100; // addition
echo "$x";
?>
```
#### Output
```bash
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
#### Output
```bash
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
#### Output
```bash
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
#### Output
```bash
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
#### Output
```bash
62.5 
```

### Conclusion
In this article, we have looked at:
1. How to downlaod Xampp and run it.
2. Definition of an operator and an operand.
3. How to create a PHP file in Xampp.
4. Different Operators.

Variables and functions are both used with operators to perform various operations.

That’s all folks! Happy Learning!

### Further Reading
- [PHP Operators  Guide](https://www.php.net/manual/en/language.operators.php)
- [Comparison Operators in PHP](https://www.php.net/manual/en/language.operators.comparison.php)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
