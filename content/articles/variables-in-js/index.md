---
layout: engineering-education
status: publish
published: true
url: /variables-in-javascript/
title: Variables in JavaScript
description: This article will be discussing variables and the various scopes of the variables in JavaScript. We will use the JavaScript console to execute JavaScript code in this tutorial.
author: caroline-gatwiri
date: 2021-01-10T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/variables-in-javascript/hero.jpg
    alt: Variables in JavaScript Image
---
Variables are a way for programmers to name a value in order to reuse it, update it, or keep track of it. In this article, we will go through naming variables, declaring variables, and initializing variables. We will also learn about the different scopes of variables to ensure that we completely understand them.
<!--more-->
### Prerequisites
To follow along with this tutorial, you need a web browser. You can get Google Chrome (one of the most popular) [here](https://www.google.com/chrome/).

### Accessing the JavaScript console
We will use the JavaScript console to execute JavaScript code in this tutorial. To open it in Google Chrome, press `CTRL + Shift + J` on Windows and Linux or `CMD + Option + J` on Mac OS.

### Understanding the scope of variables
Scope determines the accessibility of variables from different parts of your code. 

JavaScript has two types of scopes:
1. Global scope

2. Local scope

#### Global scope
When a variable is *globally scoped*, it means it is available from anywhere in your program. Declaring a variable outside a function or a block outside a function leads to it being globally scoped.

#### Local scope
> In JavaScript, a block is denoted by curly braces. The space between the curly brackets is known as a block. For example, the `if...else, do...while` and `for` loop statements create blocks.

When variables are declared within a function or a block, they are locally scoped. It means that they can only be accessed inside the function or the block they were declared in.

Local scope variables are divided into:

- Function scoped variables: A function scoped variable means that the variable defined within a function will not accessible from outside the function.

- Block scoped variables: A block scoped variable means that the variable defined within a block will not be accessible from outside the block. A block can reside inside a function, and a block scoped variable will not be available outside the block even if the block is inside a function.

### Naming variables in JavaScript
Before you start declaring variables, you should learn how to name them. Below are some of the rules that you should follow. Failing to follow these rules will cause an error.

- Variables should not have spaces.

- Variables should begin with an underscore, a dollar sign, or a letter.

- Variables are very case-sensitive. This means `car_TYPE` is treated as an entirely different variable than one named `car_type`.

- Variables must contain only letters, numbers, underscores, or dollar signs.

- You can't use any JavaScript *reserved words* as a variable name. You can find a list of the reserved words [here](https://www.w3schools.com/js/js_reserved.asp).

### Declaring variables using the keyword var
Variables can be declared using the `var` keyword as shown below:

```JavaScript
var favouriteThing;
```

Upon declaring a variable, you can assign a value to the variable such as a string or a number.

Example:

```JavaScript
var favouriteThing;
favouriteThing = "Icecream!";
```

Declaring and initializing a variable at the same time is also possible using the following syntax.

```JavaScript
var favouriteThing = "Icecream!";
```

Declaring two or more variables in a single statement is also possible. Each declaration is separated by a comma (`,`).

Example:

```JavaScript
var favouriteThing = "Icecream!", bestMovie = "Code Eight";
```

The `var` keyword is used to declare function-scoped variables and globally-scoped variables.

If you use `var` inside a block, the variable will not be a block scoped. It will either be function scoped or globally scoped depending upon where the block is present.

Example:

```JavaScript
var x = 2;

if (x === 2) {
  var x = 3;
  console.log(x); // expected output: 3
}

console.log(x); //expected output: 3
```

### Declaring variables using the keyword let
The main difference between keywords `var` and `let` is that variables declared using `let` are block-scoped, while `var` is function scoped.

Example:

```JavaScript
var a = 20;
{
  let exe = 30;
  console.log(exe); // Expected output: 30
}
console.log(a) // Expected output: 20
console.log(exe); // Uncaught ReferenceError: exe is not defined
```

In the example above, the `exe` variable only exists inside the block, and referencing it outside the block will cause an error `Uncaught ReferenceError: exe is not defined`.

### Declaring variables using the keyword const
A variable declared using the keyword `const` must be initialized immediately with a value, and that value **can't be redeclared**. In other words, using the `const` keyword lets you declare constants that cannot be changed later once you've declared them.

Variables declared using the `const` keyword are block scoped.

Example:

```JavaScript
const pi = 3.14;
pi = 1.5; // Uncaught TypeError: Assignment to constant variable.
```

The error: `Uncaught TypeError: Assignment to constant variable`, informs you that you can't change the value of `pi`.

### Conclusion
In summary, we have learned about variables and how they are declared and used in JavaScript and have gone through different types of variable scopes. I hope you find this guide to JavaScript variables useful.

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
