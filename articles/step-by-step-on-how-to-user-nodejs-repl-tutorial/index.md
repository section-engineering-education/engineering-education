### Introduction

Node.js `Read-Evaluate-Print-Loop`(REPL) is an easy-to-use command-line tool for processing Node.js expressions.
It captures the user's JavaScript code inputs, interprets and evaluates the result of this code, displays the result to the screen, and repeats the process till the user quits the shell.  
It's also important to note that this tool does not require file creation to write codes. It comes with ready to use Node.js development environment.

In this tutorial, we learn the basics of Node.js REPL, how we can use this amazing tool to run scripts without creating `.js` files.

### Table of contents
1. Introduction to REPL
2. Basic Arithmetic operations using REPL
3. Creating methods and variables using REPL

### Prerequisites

This tutorial requires:
1. Node.js Installed in your development local machine.
2. Basic knowledge of JavaScript and Node.js.

### Objectives
At the end of this tutorial, you should be able to use REPL tool to run your Node.js scripts.

### Getting started with REPL

Enter the following in the terminal:

```bash
node
```

**Output:**

```bash
> 
```

Entering the command `node` in the terminal starts the REPL command-line tool indicated by the `>` symbol.  
This symbol acts as an indicator that JavaScript is ready to read and evaluate your code.  

We can test the functionality by printing `hello world` using REPL as shown below:

```bash
node
> let hello = 'hello world';
undefined
> hello
'hello world'  // output
> 
```

In the script, we assign the text `hello world` to a variable called `hello`. Now, on calling this variable `hello`, we get `hello world` as the output on the command shell. You also notice that on pressing ENTER, `undefined` is printed. This is because `hello` variable doesn't return a value.

Now how do we exit REPL?

To exit this tool, press `Ctrl+C` on your keyboard.  

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

As shown in the output, you can as well use `Ctrl+D` or type `.exit`.  

### Executing code using REPL.

As discussed previously, this tool simplifies work by providing a quick way to test Node.js code without creating files.  
> It's also important to note that any valid JavaScript code can be executed using REPL.

#### Performing Arithmetical operations in REPL
In the previous example, we printed 'hello world' string on the screen, in this section let's dive in and look at arithmetics:  

In your terminal, start REPL: 

```bash
node
> 
```

Let's perform basic addition, subtraction,modulus, division and multipliation respectively:

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

#### Performing operations using Node's Math library
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

In REPL, we define `getRandomNumber(args)` and pass it a maximum number. The method uses `Math.floor()` to return a random largest integer less than or equal to a given number.

> It's important to note that `Math.random()` does not provide secure random numbers. Do not use them on security-related tasks.


#### Calling Methods (Functions) Using REPL

Normally, we write functions to handle specific tasks. REPL provides an easy way to handle these methods.   
In JavaScript, we commonly use the `console.log()` global method to print messages. 

Let's enter the following in the prompt: 

```bash
node
> console.log('Hello world');
```

**Output:**

```bash 
Hello world
undefined // this is the return value of this method, console.log()
> 
```

When you press ENTER, the output is displayed as shown above.  

Next, let's create a function to add two numbers:  

```bash
> function addTwoNumbers(firstNumber,lastNumber) {
... console.log(firstNumber+ lastNumber)
... }
undefined
```

We've a function `addTwoNumbers(arguments)` which takes two arguments, `firstNumber` and `lastNumber`.
This function, whenever it's called, logs out the addition of these two numbers.  

**Output:**

```bash
> addTwoNumbers(20,40);
60
undefined
> 
```

We call this method and pass it two parameters, `addTwoNumbers(20,40)`( you're free to pass any integer value).
By pressing ENTER, the result is displayed on the screen as shown above.  


#### Creating Variables using REPL

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

This variable `name` will remain active until you exit the REPL window session. This implies that you can even concatenate this string to another. For instance:

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

In this tutorial, we've seen how we can use the interactive Node.js REPL tool environment. 
We've seen how we can perform different tasks such as basic artihmetic operations and creating functions without the necessity to create a `.js` file.  

### Further reading
Follow [this](https://nodejs.dev/learn/how-to-use-the-nodejs-repl) link for more information.

Happy Coding!!
