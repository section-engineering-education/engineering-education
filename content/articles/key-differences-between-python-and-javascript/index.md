---
layout: engineering-education
status: publish
published: true
url: /key-differences-between-python-and-javascript/
title: Key Differences between Python and JavaScript
description: This article will highlight some of the differences between Python and JavaScript. These two languages are used by many developers worldwide.
author: joshua-wainaina
date: 2021-06-16T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/key-differences-between-python-and-javascript/hero.png
    alt: Key Differences between Python and JavaScript
---
Python and JavaScript are important languages used in web development. Python can be used for backend development while JavaScript is used for both frontend and backend development. This article will analyze the key differences between these two languages.
<!--more-->
### Real world application of Python and JavaScript
Python can be used in scientific and specialized applications, as well as in web development. However, JavaScript is widely used in web development.

### Syntax, sentactical and functional differences
Python and JavaScript have different Syntax. 

This is demonstrated below:

#### Code blocks in Python and JavaScript 
In Python, lines of code are put in blocks through indentation.

Example
```python
if  t  > 10:       
     print (t) #code block
```

In JavaScript, brackets can be utilized rather than spaces.

Let's look at an example.
```js
if (t>10)

{
    console.log(t)
}
```

### Definition of variables
When defining a variable in Python, a variable name is written followed by an equal (=) sign. 

Then a value is assigned to the variable. i.e:

```py
<variable_name> = value
x = 56
```

In JavaScript, a keyword `var` is added before the variable name and a semicolon is used to terminate the statement i.e: 

```JavaScript
var <variable_name>  = value;
var k=34;
```

### Variable naming conventions
In Python, the `snake_case` naming style is used. The names should be in `lowercase` and separated by an `underscore`, as shown below.

```python
first_name
```

In JavaScript, `lowerCamelCase` is preferred. The variable name starts with a lowercase letter and every other new word starts with an uppercase letter. 

```JavaScript
myFirstName
```

### Constants in Python and JavaScript
In Python, constants are written in `uppercase` format separated by an underscore. Such as `CONSTANT_NAME`.

For example:

```py
PASS_RATE = 4
```

In JavaScript, a keyword `const` is added before the constant name and a semicolon is used to terminate the statement. ie. `const CONSTANT_NAME = value`; 

```javascript
const AGE=56;
```

### Data types and values in Python and JavaScript

#### Numeric data types
In Python, we have three numeric types that will assist us with accomplishing exact estimations for logical purposes. 

These are: 
1. [int](https://problemsolvingwithpython.com/04-Data-Types-and-Variables/04.01-Numeric-Data-Types/#integers).  
2. [float](https://problemsolvingwithpython.com/04-Data-Types-and-Variables/04.01-Numeric-Data-Types/#floating-point-numbers). 
3. [complex](https://problemsolvingwithpython.com/04-Data-Types-and-Variables/04.01-Numeric-Data-Types/#complex-numbers).

In JavaScript, we have two numeric types, `Numbers `and `BigInt`. The two whole numbers and casting point numbers are just viewed as numbers. 

1. [numbers](https://www.tutorialsteacher.com/javascript/javascript-number)
2. [bigint](https://javascript.info/bigint)

### None and Null in Python and JavaScript 
In Python, when a variable doesn't have an assigned value, it is referred to as `None`. In JavaScript, we use `null` for such variables.

### The undefined value
In Python, one cannot declare a variable without an initial value. 

In Javascript, we have a unique worth that is allocated consequently. When a variable is declared without assigning an initial value, it prints out `undefined`, as shown below: 

```JavaScript
var k; // should print undefined
```

### Primitive data types
Python has four primitive data types:
1.  [Integers](https://www.codesansar.com/python-programming/fundamental-or-primitive-data-types.htm#integer).
2. [Float](https://www.codesansar.com/python-programming/fundamental-or-primitive-data-types.htm#float).
3. [Boolean](https://www.codesansar.com/python-programming/fundamental-or-primitive-data-types.htm#bool).
4. [Strings](https://www.codesansar.com/python-programming/fundamental-or-primitive-data-types.htm#string).

On the other hand, JavaScript has six primitive data types:
1. [undefined](https://www.educba.com/javascript-undefined/?source=leftnav).
2. [strings](https://www.educba.com/string-in-javascript/?source=leftnav).
3. [Number](https://www.educba.com/javascript-number/?source=leftnav).
4. [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
5. [Boolean](https://www.educba.com/javascript-boolean/?source=leftnav). 
6. [symbol](https://flaviocopes.com/javascript-symbols/#:~:text=Symbol%20is%20a%20primitive%20data,private%20and%20for%20internal%20use.).

### Comments 
Comments help to improve code readability. For example, one may comment on a line for future reference. <!--A commented line is not executed as part of the code. -->

1. Single-line comments
In Python, a hashtag (`#`) is used to comment on a single line.

```python
# this is a  single-line comment in python
```

In JavaScript, double slashes (`//`) are used to comment on a single line, as shown below.

```javascript
//this is a single-line comment in JavaScript
```

2. Multiple line comments
These are comments spanning many lines. When writing multiple comments in python, we start every single line with a hashtag (`#`) as shown below:

```python
# this is a   
# multiple lines 
# comment
# as used in Python`
```

When writing multiple line comments in JavaScript, we use symbols (`/*`) to open and  (`*/`) to close a comment:

```javascript
/*
 This is  a multi-line comment
that span many lines
*/ 
```

### Built-in data structures
1. Tuples
Tuples in Python are similar to lists but immutable. They store information that should not be changed.

In JavaScript, we don't have an inherent construction with such qualities.

2. List and Arrays-->

Lists are utilized in python to store a progression of qualities in a similar structure.

```py
number = [3, 4,5]
```

An array is the equivalent version of this in JavaScript.

```javascript
var number = [3,4,5]
```

### Comparing values and types
In Python, the double equal (`==`) operator is used to compare if two values and their data types are equal.

```python
11 == 11 #True
11 == 10 #False
```

As shown above, `11 == 11` is true, while` 11 == 10` is false.

In JavaScript, a triple equivalent ('===') operator is utilized to check if two qualities and their information types are equivalent. 

```javascript
5===5  //true
5==='5'  //false
```

### Logical operators
In Python, there are three logical operators:  
1. and  
2. or  
3. not

JavaScript also has three logical operators:
1. &&  -- logical and.
2. ||  -- logical or.
3. !  --logical not.

### Type operators
To check the object type in Python, we use the (`type()`) function as shown below:

```python
type(instance)
```

To check the type of object in JavaScript we use `type of operator`, as highlighted below:

```javascript
type of instance
```

### Inputs and outputs
`Input` is a function that requests the user for some feedback.

`Output`, on the other hand, is used to print out a specific message.

### Inputs
In Python, the `input()` function is used to ask for user input.

Example
```python
name = input (" Enter your name : ")
```

In JavaScript, you can get the user's input using a small prompt with `window.prompt(message)` and then assign the result to a variable.

```javascript
var input =window.prompt ("enter a Number :")
```

### Outputs
In Python, we use the `print()` to show particular results.

Example
```python
num1 = input("Enter the first  number : ")
num2 = input("Enter a second  number : ")
num3 = input("Enter a third number : ")
result = num1 + num2 + num3
print(result)
```

In JavaScript, we print a value in the console using the `console.log()` function and parse the values within the parenthesis.

Example
```javascript
console.log("My name is John:");
```

### Conditional statements
Conditional statements are used to act if a certain condition is true or false.

1. if statement
In Python, indentation is relied upon to indicate the lines of code that belong to a conditional statement.

```python
if condition:
     #code
```

Let's look at an example:

```python
age = 10
if age < 18:
    print('kid you are!')
```     

In JavaScript, the condition is enclosed in parenthesis and the code enclosed within curly braces:

```javascript
if (condition)

    {
        code
    }
```

An example of a JavaScript codesnippet would look like:

```javascript
if (hour > 4) {
  task = "Clean the compound";
}
```

2. if-else statement
In Python, a colon `(:)` is written after the `else` keyword.

```python
if condition:

    #if code

else :

    #else code
```

Let's look at an example:

```python
age = 34
if age < 18:
    print('kid you are!')
else:
    print('You are not a kid')
```

In JavaScript, the code that belongs to the `else `clause is enclosed in curly braces.

```javascript
if (condition)

    {
        if code
    }

else 

    {
        else code
    }
```

Let's look at an example.

```javascript
var time = new Date().getHours();
if (time < 5) {
  task = "Cleaning the house";
} else {
  task = "Feeding the sheep";
}
```

3. Multiple conditions 
In Python, `elif` keyword is used when dealing with multiple conditions. After every condition we write a `semicolon``(:)` and the code that belongs to the condition is indented in the next line.

```python

if condition1:

    code

elif condition2:

    code

elif condition3:

    code

else:

    code
```

Let's look at an example.

```python
age = 40
if age < 18:
    print('kid you are!')
elif age >=18 and age < 29:
    print('You are a young star!')
elif age >=29 and age < 35:
    print('You are middle aged!')
else:
    print('You are above middle age !')
```

In JavaScript, the `else if` keyword is used when dealing with multiple conditions. The conditions are surrounded by parenthesis.

```javascript
if(condition1)

    {
        //code
    }

else if(condition2)

    {
       // code
    }

else if (condition3)

    {
        //code
    }

else

    {
        //code
    }
```

Let's look at an example.
```javascript
var time = new Date().getHours();
if (time < 5) {
  task = "Cleaning the house";
} else if (time < 15) {
  task = "Feeding the sheep";
} else {
  task = "Watching a movie";
}
```

4. Switch
Python does not have this type of built-in control structure i.e `switch`

In JavaScript, a switch is utilized to pick what happens depending on user specification.

```javascript
switch(expression)

    {
        case 1:
        code
        break;

        case 2:
        code
        break;

        case 3:
        code
        break;

        default:
        code
    }
```

Let's look at an example.
```js
switch (new Month().getMonth()) {
  case 1:
    month = "January";
    break;
  case 2:
    month = "April";
    break;
  case 3:
    month = "May";
    break;
  case 4:
    month = "June";
    break;
  case 5:
    month = "August";
    break;
  case 6:
    month = "September";
    break;
  default:
  No such a month;
}    
```

### Loops
A loop is a control structure that repeats a series of instructions until a specified condition is reached.

### For Loops
We can write a `for` loop in Python as shown below.
```python
for x in range(k):

    code
```

The syntax when writing a for loop in JavaScript is as follows.

```javascript
for(var x = 1; x >n ; x++)

{

        code
}
```

### While loop
It is a pre-test loop in which the condition is evaluated before the loop executes.

In Python, we compose the watchword `while` trailed by the `condition`, and afterward, a colon `(:)`.

```python 
while condition: code 
```

In JavaScript, we use brackets, as shown below.

```javascript
while(condition){
    code
}
```

### Do-while loops
This is a post-test loop. The condition is evaluated after the loop executes. In Python, we do not have such a control structure `(do-while loop)`

In JavaScript, this loop will always be executed once.

```javascript 

do { code } while (condition); 

```

### Functions 
A function is a block of code that plays out a specific undertaking. 

In Python, we utilize a watchword `def` which is trailed by the name of the function, as demonstrated below: 

```python
 def function_name ( x1 , x2 , x3 , ...):
      code 
```

In JavaScript, we use the `function` keyword to create a method.

```javascript 
function function_name (x1,x2,x3,...)
        {

            code
        }
```

### Object Oriented Programming (OOP)
OOP is the development of programs in terms of objects that interact with one another.

Both Python and JavaScript support Object-Oriented programming.

The syntax of defining a class in both Python and JavaScript is almost the same, there only is a slight difference.

In `Python` a `colon` is written after the keyword class whereas curly` braces` are used in `Javascript`.

Python                              
```python
class Rectangle:

    code
```

JavaScript
```javascript
class Rectangle

{

    code
}
```

### Constructor and attributes
A constructor is a member function of a class that executes automatically whenever an object is created.

In Python, a constructor that instantiates the new example is known as `init` with two driving and the following highlights. 

```python
 class Rectangle:

        def _init _(self , length , width):
            self.length= length
            self.width=width 

```

In JavaScript, a constructor is written, as shown below:

```javascript
class Rectangle

{

    constructor(length,width){
        this.length=length;
        this.width=width;

    }
}
```

>Note: In python, we use `self` to refer to an instance of a class.

For example:
```python 

self.attribute= esteem 
```

While in JavaScript we use `this` to allude to an occurrence of a class. 
Such as: 
```javascript

this.attribute=value; 

```

### Conclusion
Although Python and JavaScript have numerous differences, Python is much easier to understand than JavaScript due to its unique syntax.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)