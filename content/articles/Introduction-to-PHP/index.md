---
layout: engineering-education
status: publish
published: true
url: /introduction-to-php/
title: Getting Started with PHP
description: A tutorial that introduces us to the PHP programming language. We will look at how to declare variables, conditional statements and code commenting in PHP.
author: erastus-muriithi
date: 2021-03-12T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-php/hero.png
    alt: PHP example image
---
[PHP](https://www.php.net/) (Hypertext Pre-processor) is a web server-side programming language. It enables developers to build web applications that interact with databases.
<!--more-->
### Why PHP?
PHP can be used to do many things. Let's look at some of the reasons why PHP is used:
- PHP is platform-independent. Therefore it can run on major operating systems. ie. Mac OS, Windows, or Linux.
- It can run on all modern servers such as Apache.
- PHP can be integrated with databases like [MariaDb](https://mariadb.org/).
- It is easy to learn and implement.
- PHP frameworks are used by web developers to build web apps faster. 

Here are some of the most popular PHP frameworks:
- [Yii 2](https://www.yiiframework.com/) -- A generic PHP framework used when developing web applications with many ties.
- [Laravel](https://laravel.com/) --  A PHP framework designed to make web apps easier and faster for developers.
- [FuelPHP](https://fuelphp.com/) -- A PHP framework that supports data-oriented web applications.

### Prerequisites
Before starting this tutorial, make sure you have installed Xampp. You can download Xampp [here](https://www.apachefriends.org/download.html). 

**In this tutorial, we will be using Ubuntu**. 

Once the installation is complete, a `/opt/lampp` folder will be created.

Start Xampp by running the following command:

```bash
$ sudo /opt/lampp/lampp start

Starting XAMPP for Linux 7.4.10-0...
XAMPP: Starting Apache...ok.
XAMPP: Starting MySQL...ok.
XAMPP: Starting ProFTPD...ok.
```

### Creating the PHP files
Navigate to `/opt/lampp/htdocs` and create a new folder `hello`.  This is where we will have our PHP files. Open a terminal and run the command below.

```bash
$ cd /opt/lampp/htdocs
$ sudo mkdir hello
$ cd hello
```

Then, create a new file `index.php` in `/opt/lampp/htdocs/hello` using this command.

```bash
$ sudo touch index.php
```

Then, open the file using [Gedit](https://wiki.gnome.org/Apps/Gedit) by running the following command.

```bash
$ sudo gedit index.php
```

### A hello world program
We are going to write a simple PHP program. Let's look at the basic syntax of a PHP program. PHP code is written between `<?php>` and `?>` tags in a PHP files as shown below.

```php
<?php
//php code is written here
?>
```

In the `index.php` you created above put the following code:

```php
<?php
 echo "<h1>Hello world!</h1>";
?>
```

We use the `echo` statement to display output on the screen. In the code above, we use the `echo` statement to display a HTML heading.

To run this code, open your browser at http://localhost/hello here, we append the folder name .ie `hello` to the base URL (http://localhost/).

You should see something like this image on your browser:

![php helloworld!](/engineering-education/introduction-to-php/helloworld.png)

Congratulations! You have written your first PHP program.

### Variables in PHP
Variables are containers used for holding data types. When writing variable names, always make sure they start with a letter or an underscore but not a number.

In PHP, variables are created by writing the dollar ($) sign followed by the variable name. Let us look at a simple example.

```php
<?php
$txt = "how old are you?";
$x = 25;
$y = 67;
?>
```

In this code, `txt` is a variable holding a string `how old are you?`, variable `x` holds the number `25`, and variable `y` holds the number `67`.

### Conditional statements in PHP
Conditional statements are used to perform some actions if a certain condition is adhered to. 

They include:
- `if` statement - used to execute some code if a given condition is `True`.
- `if... else` statement -  the `if` block is used to execute some code if a certain condition is true. If the condition is false, then the `else` block executes another block of code.
This statement executes some code based on the true or false state of the condition.
- `if... elseif...else` statement - It is like the `if ...else` statement, but with the ability to check for multiple conditions.

Let's put each statement above in place:

### 1. The if statement
Below is a syntax for an `if` statement.

```php
if(condition){
 //code to execute
}
```

Let's look at an example.

```php
<?php
$age = 15;

if ($age < 18) {
 echo "a kid!";
}
?>
```

Running this code gives `"a kid!"` as the output.

### 2. The if...else statement
The syntax of an if else block looks like this:

```php
if(condition){
  //code to execute if condition is true
}
else {
  //code to execute if condition is false
}
```

A simple implementation of the snippet above would look like this:

```php
<?php
$age = 18;
if($age < 18){
 echo "a kid!";
}
else {
 echo "so youth!";
}
?>
```

The output should be: `"so youth!"`. This is because the variable `age` is not less than 18. If we assign a value like 17 to variable `age` the output becomes `"a kid!"`

### 3. if... elseif... else statement
The syntax of this statement looks as shown below.

```php
if (condition) {
  // code to execute if condition is true;
} elseif (condition_2) {
 // code to execute if condition_2 is true
} else {
 // code to execute if none of the above are true
}
```

Implementing the above in a program would look like like this:

```php
<?php
$age = "18";

if($age < "18"){
 echo "a kid!";
}
elseif($age > "35"){
 echo "a parent?";
}
else{}
 echo"a youth!";
?>
```

Since the variable `age` is equal to `18` the output of the code above is: `"a youth!"`.

### Comments In PHP
Code commenting in PHP may be done for many reasons. For example, it can be used for documentation. A commented line is not executed as a part of the program.

There are 2 types of comments.

### 1. Single line comments
This is a comment spanning a single line. Look at the example below.

```php
<?php
 // this is an example of a single-line comment.
 echo"The output is:";
 # this is another one.
?>
```
As shown above, you can use 2 backslashes (`//`) or a hashtag (`#`) for single line comments.

### 2. Multi-line or block comment
This is a comment spanning many lines. Here, you can use the symbols `/*` to open and `*/` to close the comment as shown below.

```php
<?php
 echo "hello!!"
 /*
  This is a comment,
  that should span many lines
  */
?>
```

### Conclusion
In this tutorial, we have looked at the following:
- The syntax of a basic PHP program.
- Declaring variables in PHP.
- Using conditional statements.
- Code commenting in PHP.

Have a good `PHP` coding ahead.

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
