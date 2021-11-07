---
layout: engineering-education
status: publish
published: true
url: /nodejs-repl-tutorial/
title: Getting Started with Node.js REPL
description: This tutorial will introduce and explain the Node.js REPL environment and how we can use this tool to run and debug JavaScript.
author: odiwuor-amos
date: 2021-05-19T00:00:00-15:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/nodejs-repl-tutorial/hero.jpg
    alt: Node.js REPL example image
---
Node.js `Read-Eval-Print-Loop` (REPL) is an easy-to-use command-line tool, used for processing Node.js expressions. It captures the user's JavaScript code inputs, interprets, and evaluates the result of this code. It displays the result to the screen, and repeats the process till the user quits the shell. 
<!--more-->
It is also important to note that this tool does not require file creation to write code. REPL comes ready to use with the Node.js development environment.

A REPL has the following:
- A read function, which accepts an expression from the user and parses it into a data structure in memory.
- An eval function, which takes the data structure and evaluates the expression.
- A print function, which prints the result.
- A loop function, which runs the three commands above until termination

In this tutorial, we will learn the basics of Node.js REPL and how we can use this amazing tool to run scripts without creating `.js` files.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with REPL](#getting-started-with-repl)
- [Executing code using REPL](#executing-code-using-repl)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Prerequisites
This tutorial requires:
1. Having [Node.js](https://nodejs.org/en/download/) installed in your development local machine.
2. Basic knowledge of [JavaScript](/engineering-education/search/?q=javascript) and [Node.js](/engineering-education/search/?q=node.js).

### Objectives
At the end of this tutorial, you should be able to:
1. Understand the basics of the Node.js REPL tool.
2. Perform various arithmetic operations.
3. Create and use functions within the REPL. 
4. Create global variables.

### Getting started with REPL
Enter the following in the terminal:

```bash
node
```

**Output:**

```bash
> 
```

Entering the command `node` in the terminal starts the REPL command-line tool indicated by the `>` symbol. This symbol acts as an indicator that JavaScript is ready to read and evaluate your code.  

We can test the functionality by printing `hello world` using REPL as shown below:

```bash
node
> let hello = 'hello world';
undefined
> hello
'hello world'  // output
> 
```

In the script, we assign the text `hello world` to a variable called `hello`. Now, on calling this variable `hello`, we get `hello world` as the output on the command shell. You will also notice that upon pressing ENTER, `undefined` is printed. 

> JavaScript functions always return something. If you don't specify something to return in the function, 'undefined' is returned by default. This doesn't affect anything, you can ignore it.  

To exit the REPL, press `Ctrl+C` on your keyboard.  

**Output:**

```bash
> let hello = 'hello world';
undefined
> hello
'hello world'
> 
(To exit, press Ctrl+C again or Ctrl+D or type .exit)
> 
```

As shown in the output, you can use `Ctrl+D` or type `.exit` as well.  

### Executing code using REPL
As discussed previously, this tool simplifies work by providing a quick way to test Node.js code without creating files.

> It's also important to note that any valid JavaScript code can be executed using REPL.

#### Performing Arithmetical operations in REPL
In the previous example, we printed `hello world` string on the screen, in this section let's dive in and look at arithmetics:  

In your terminal, start REPL: 

```bash
node
> 
```

Let's perform basic addition, subtraction, modulus, division and multiplication respectively:

**Output:**  

```bash
> 2+2
4
> 5-2
3
> 10%3
1
> 20/2
10
> 10*2
20
> 
```

#### Performing operations using Node.js's Math library
Math library is an object with defined methods and properties. We can therefore use these features to perform some arithmetics.  

Example:

```bash
> function getRandomNumber(maximum) {
... let result = Math.random()*maximum;
... return Math.floor(result);
... }
undefined

```

**Output:**

```bash
> console.log(getRandomNumber(20));
12
undefined
> 
```

In REPL, we define `getRandomNumber(args)` and pass it a maximum number. The method uses `Math.floor()` to return a large random integer less than or equal to a given number.

> It's important to note that `Math.random()` does not provide secure random numbers. Do not use them on security-related tasks.


#### Calling methods (Functions) using REPL
Normally, we write functions to handle specific tasks. REPL provides an easy way to handle these methods. In JavaScript, we commonly use the `console.log()` global method to print messages. 

Let's enter the following in the prompt: 

```bash
node
> console.log('Hello world');
```

**Output:**

```bash 
Hello world
undefined # this is the return value of this method, console.log()
> 
```

When you press ENTER, the output is displayed as shown above.  

Next, let's create a function to add two numbers:  

```bash
> function addTwoNumbers(firstNumber,lastNumber) {
... console.log(firstNumber + lastNumber)
... }
undefined
```

We have a function `addTwoNumbers(arguments)` which takes two arguments, `firstNumber` and `lastNumber`. This function, whenever it's called, logs out the addition of these two numbers.  

**Output:**

```bash
> addTwoNumbers(20,40);
60
undefined
> 
```

We call this method and pass it two parameters, `addTwoNumbers(20,40)` (you're free to pass any integer value). By pressing ENTER, the result will be displayed on the screen as shown above.  


#### Creating variables using REPL
Creating variables works the same as it would in your`.js` file.

Let's look at an example:  

```bash
node
> let name = 'john doe';
```

Output on calling `name` and pressing ENTER:

```bash
undefined
> name
'john doe'
> 
```

This variable `name` will remain active until you exit the REPL window session. This implies that you can even concatenate this string to another. 

For instance:

```bash
node
> let name = 'john doe';
undefined
> name
'john doe'
> name+ ' is a student at Stanford';
'john doe is a student at Stanford'
> 

```

### Conclusion
In this tutorial, we've seen how we can use the interactive Node.js REPL tool environment. We have performed various arithmetic operations using REPL. 

We also imported the [Math](https://mathjs.org/) library into our REPL environment and accessed several methods to perform arithmetic operations such as generating a random number. 

We learned how to create and use various methods and variables in the REPL. We noted that these are defined the same way as they would be in the .js files. We also observed that the variables created remain accessible until the REPL session is terminated.

### Further reading
You can follow these links to learn more about Node.js REPL:
- [Node.js Official Documentation](https://nodejs.dev/learn/how-to-use-the-nodejs-repl)  
- [Await keyword in REPL](https://nodejs.org/api/repl.html#repl_await_keyword)  
- [JavaScript Shells](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Shells)  

Happy coding!!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/) and [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/).