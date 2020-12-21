# Understanding Variables In Javascript

## Introduction
Variables are a way for programmers to name a value to reuse it, update it, or keep track of it.
In this article, we will go through naming variables, declaring them, and initializing them.
We are also going to touch on the scope of variables to ensure that we understand variables fully.

## Prerequisites
To follow along with this tutorial, you need a web browser. You can get Google Chrome [here](https://www.google.com/chrome/)

### Accessing the JavaScript Console
We will use the JavaScript console to execute the JavaScript code in this tutorial. To open it in Google Chrome, press `Ctrl + Shift + J` on Windows and Linux and `Cmd + Option + J` in Mac OS.

### Understanding the scope of variables
Scope determines the accessibility of variables, objects, and functions from different parts of your code.
Javascript has two types of scopes, which are:
1. Global scope
2. Local scope

**1. Global scope**

When a variable is *globally scoped*, it means it is available anywhere in your program. 
Declaring a variable outside a function leads to it being ade to the global scope automatically.
Global scope uses `var` key word to declare variables.

**2. Local scope**

When variables are declared within a function they become locally scoped, that means they can only be called inside the function.
Local scope variables are divided into:
- function scoped variables
- block scope variables

**a.Function scoped variables**

When you say a variable is function scoped, it means that the variable defined within the function is not accessible from outside the function.
To define a locally scoped variable we use the `var` keyword.


**b.Block scoped variables**

In JavaScript a block is denoted by curly braces, the space between the curly brackets is what is known as a block.
For example: the `if...else, do...while` and `for` loop statements create blocks.

When a variable is block-scoped, it means that it exists inside the block, it was defined.

`let` and `const` keywords are used in defining the block scope.

### Naming Variables In JavaScript
Before you start declaring variables, you should first learn how to name them first. Below are some of the rules that one should follow to ensure that your JavaScript code is easy to understand and work with. Variable names;
- should not have spaces.
- should begin with an underscore, a dollar sign or a letter.
- are very case-sensitive. This means `car_TYPE` is treated as an entirely different variable than one named `car_type`
- must contain only letters, numbers, underscores, or dollar signs.
- You can't use any JavaScript *reserved words* as a variable name, reserved words include; private, public, enum etc.

### Declaring variables using the keyword `var`

Variables can be declared using the `var` keyword as shown below:

```javascript
var favouriteThing;
```
Upon declaring a variable, you can assign the variable a value such as a string or a number.

Example:
```javascript
var favouriteThing;
favouriteThing = "Icecream!";
```
Declaring a variable and at the same time initializing it is also possible using the following syntax;
```javascript
var favouriteThing = "Icecream";
```
Declaring two or more variables using the same statement is also possible.
Each declaration is separated by a comma (,).

Example:
```javascript
var favouriteThing = "Icecream" ,
    bestMovie = "Code Eight";
```

The `var` keyword declares both a function-scoped and globally-scoped variable and can initialize it to a value.

Example:
```javascript
var x = 2;

if (x === 2) {
  var x = 3;

  console.log(x);
  // expected output: 3
}

console.log(x);
//expected output: 3
```

### Declaring variables using the keyword `let`
`let` keyword can be used to declare one or more variables. 
The main difference between keywords `var` and `let` is that variables declared using `let` are block-scoped, while `var` is both globally-scoped and function scoped.

Example:
```javascript
var a = 20, b = 10;
{
  let exe = a;
  a = b;
  b = exe;
}
console.log(exe); // ReferenceError: exe is not defined
```
In the above example, `exe` variable only exists inside the block, and referencing it outside the block gets you a ` ReferenceError: exe is not defined`.

### Declaring variables using the keyword  `const`
The keyword `const` works the same as the `let` keyword. The difference between the variable declared using the keyword `const` must be initialized immediately and with a value, and that value **can't be redeclared**.

Example:
```javascript
const p = 3.14;
p = 1.5; //SyntaxError: Identifier 'p' has already been declared
```
The error: `SyntaxError: Identifier 'p' has already been declared`, informs you that you can't change the value of `p`. 
Using the `const` keyword lets you declare variables or constants that should not be changed in your code.

### Conclusion
In summary, we have learnt about variables, how they are declared and used.
We have gone through different types of variable scopes.  At first, all this may not be very clear, especially if you are a beginner, but you will get there with practice.