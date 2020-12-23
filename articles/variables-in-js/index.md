Variables are a way for programmers to name a value to reuse it, update it, or keep track of it. In this article, we will go through naming variables, declaring them, and initializing them. We are also going to touch on the scope of variables to ensure that we completely understand variables.

### Prerequisites
To follow along with this tutorial, you need a web browser. You can get Google Chrome [here](https://www.google.com/chrome/)

### Accessing the JavaScript Console
We will use the JavaScript console to execute the JavaScript code in this tutorial. To open it in Google Chrome, press `Ctrl + Shift + J` on Windows and Linux and `Cmd + Option + J` in Mac OS.

### Understanding the scope of variables
Scope determines the accessibility of variables from different parts of your code.
Javascript has two types of scopes, which are:
1. Global scope
2. Local scope

**1. Global scope**

When a variable is *globally scoped*, it means it is available anywhere in your program. Declaring a variable outside a function or block leads to it being added to the global scope automatically.

**2. Local scope**

When variables are declared within a function or block, they are locally scoped. It means they can only be used inside the function or block they belong in.

Local scope variables are divided into:
- Function scoped variables
- Block scope variables

**a.Function scoped variables**

A function scoped variable means that the variable defined within the function is not accessible from outside the function.

**b.Block scoped variables**

In JavaScript a block is denoted by curly braces. The space between the curly brackets is known as a block.
For example: the `if...else, do...while` and `for` loop statements create blocks.

When a variable is block-scoped, it means that it exists only inside the block where it was defined.

`let` and `const` keywords are used in block scoping a variable. If you use `var` in a block scope, the variable will not be block scoped. It will either be function scoped or globally scoped depending upon where the block is present. 

### Naming Variables In JavaScript
Before you start declaring variables, you should first learn how to name them first. Below are some of the rules that one should follow. Failing to do so will cause an error.

- Variables should not have spaces.
- Variables should begin with an underscore, a dollar sign or a letter.
- Variables are very case-sensitive. This means `car_TYPE` is treated as an entirely different variable than one named `car_type`
- Variables must contain only letters, numbers, underscores, or dollar signs.
- You can't use any JavaScript *reserved words* as a variable name. Reserved words include; private, public, enum etc.

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

`let` keyword permits you to declare block scope variables.
The main difference between keywords `var` and `let` is that variables declared using `let` are block-scoped, while `var` is function scoped.

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
The difference between the `const` and other keywords used to declare variables is that a variable declared using the keyword `const` must be initialized immediately with a value, and that value **can't be redeclared**. 

`const` keyword permits you to declare block scope variables.

Example:
```javascript
const pi = 3.14;
pi = 1.5; //SyntaxError: Identifier 'pi' has already been declared
```
The error: `SyntaxError: Identifier 'pi' has already been declared`, informs you that you can't change the value of `pi`. 

Using the `const` keyword lets you declare constants that should not be changed in your code.

### Conclusion
In summary, we have learnt about variables and how they are declared and used in JavaScript. We have gone through different types of variable scopes.

If you are a beginner, this may not be very clear, but you will get there with practice.
