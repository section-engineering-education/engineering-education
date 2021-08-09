---
layout: engineering-education
status: publish
published: true
url: /exception-handling-in-javascript/
title: The Basics of Exception Handling in JavaScript
description: In this article we will cover what exception handling is, the different types of errors, and the error objects in JavaScript. 
author: judy-nduati
date: 2020-12-16T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/exception-handling-in-javascript/hero.jpg
    alt: JavaScript Exception Handling image example
---
With the use of exceptions, you can responsibly manage some of these problems we face as developers. Exception handling is the process of converting a code error message into a user-friendly error message. It is a necessary step in the development process. 
<!--more-->
In this article, we will go through exception handling in JavaScript.
### Table of Contents
- [What is Exception Handling](#what-is-exception-handling)
- [JavaScript Error Types](#javascript-error-types)
- [How to Handle Exceptions in JavaScript](#how-to-handle-exceptions-in-javascript)

### Prerequisites
Exception handling in JavaScript is an exciting and interactive topic. Therefore, I recommend the reader have a basic understanding of HTML, CSS, and JavaScript.

### What is exception handling
Exception handling is one of the powerful JavaScript features to handle errors and maintain a regular JavaScript code/program flow. 

An exception is an object with an explanation of what went amiss. Also, it discovers where the problem occurred.
Errors occur due to mistakes made by developers, wrong input, or unforeseeable things. 

A few reasons why exceptions occur are listed below:
- Dividing a number by zero: This results in infinity, thus throwing an exception.
- When a requested file does not exist in the system.
- When the user provides the wrong input.
- When the network drops during communication.

If a software engineer fails to plan for failure, then whatever project or code they are working on may not be successful (when an error does occur). That is where [exception handling](https://en.wikipedia.org/wiki/Exception_handling) comes into play. 

When JavaScript encounters an error and raises an exception. The JavaScript translator looks for an exception handling code rather than proceeding to the next statement. In a programming environment, exceptions can be handled, but errors cannot.

### JavaScript error types
Different errors may occur while executing a JavaScript code. There are three types of errors.

1. [**Syntax Errors:**](https://developer.mozilla.org/en-US/docs/Glossary/Syntax_error#:~:text=An%20exception%20caused%20by%20the,you%20trigger%20a%20syntax%20error.) These are errors that cannot be interpreted by the computer. These errors stop the program from working. 

In JavaScript, these errors are:
- Spelling errors (wrong spelling such as fiction instead of function).
- The omission of important characters, such as not using a semicolon to end a statement.
- Use of the wrong indentation.

2. [**Runtime Errors:**](https://www.geeksforgeeks.org/javascript-error-and-exceptional-handling-with-examples/#:~:text=Runtime%20Error%3A%20A%20runtime%20error,also%20known%20as%20the%20exceptions.&amp;text=try%20___%20catch%20method%3A%20JavaScript,operator%20to%20handle%20the%20exception.) These errors take place during execution. The errors get detected when your program runs. It crashes or raises an exception. Thus, exception handlers handle exception errors. 

These errors are often caused by:
- The program not being able to find data because it does not exist.
- The data being an invalid type of data.

3. [**Logical Errors:**](https://study.com/academy/lesson/errors-in-javascript-types-methods-prevention.html) These types of errors do not throw an error or an exception at all. This is because they result from the code not doing what the developer intends it to. It's challenging to find logical errors. They can only be found through thorough testing.

### Error objects
When a runtime error occurs, it stops the code and raises an error object. 

The error object has two properties:
- Name: It gives the error name.
- Message: It sets or returns the error message in the form of a string.

JavaScript uses six types of error objects. These error objects are the foundation of exception handling.

- **EvalError**: The `EvalError` function indicates the error that occurred in the [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) function. It's a global function that evaluates the JavaScript string. JavaScript does not throw this exception anymore.
- **RangeError**: `RangeError` exceptions occur when a numeric value is outside the specified range.
- **ReferenceError**: A `ReferenceError` exception occurs when undeclared variables are used. These exceptions commonly occur due to spelling errors on variables.
- **Syntax Error**: A Syntax Error exception occurs when JavaScript language rules get broken.
- **TypeError**: A `TypeError` exception occurs when a value is different from the one expected.
- **URIError**: A `URIError` exception is raised by [`encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) and [`decodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) methods.

### How to handle exceptions in JavaScript
Know that we now understand what exceptions are. It's time to learn how to handle them to stop our code from crashing. JavaScript handles exceptions in `try-catch-finally` statements and `throw` statements.

#### Key Terms
- A **`try-catch-finally`** statement is a code or program that handles exceptions.
- The **`try`** clause runs the code that generates exceptions.
- The **`catch`** clause catches exceptions that are thrown.
- A **`finally`** clause always gets executed.
- The **`throw`** statement generates exceptions.

To have a complete source code, use this HTML code. Insert the JavaScript code inside the script tag to understand how each exception handling statement works.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Try-Catch-Finally Statement</title>
</head>
<body>
    <script type="text/JavaScript"></script>
     <p>Click the button to see the output</p>
     <button type="button" onclick="myFunction()">Click Here</button>
</body>
</html>
```

#### Throw statements
The `throw statement` is to raise your built-in exceptions.

Below is an example of a `throw` statement:
```js
function myFunction() {
    const x = 50;
    const y = 0;
    try {
        if (y === 0) {
            throw ("This is division by zero error");
        } else {
            const z = x / y;
        }
    } catch (error) {
        alert("Error: " + error);
    }
}
```

#### Try catch statements
The `try` clause has the main code that may generate exceptions. If an exception is raised, the `catch` clause gets executed.

Here is an example of a `try-catch` statement:
```js
function myFunction() {
    const j = 70;
    try {
        allert("The value of j is : " + j);
    } catch (error) {
        alert("Error: " + error.message);
    }
}
```

In the example above, we have made a typo error while calling the in-built `alert()` function. We have misspelled alert to produce an error deliberately. The `catch` clause catches the error and executes the code.

#### Try catch finally statements
The `finally` statement is the last block to be executed. It executes after `try` and `catch` clauses.

Here is an example of `try-catch-finally` statements:
```js
function myFunction() {
    const j = 70;
    try {
        alert("The value of j is : " + j);
    } catch (error) {
        alert("Error: " + error.message);
    } finally {
        alert("Finally: Finally gets executed")
    }
}
```

### Wrapping up
In this article we have learned what exception handling is the different types of errors, and the error objects in JavaScript. We have gone over how we handle exceptions in JavaScript. I hope this article has helped you understand the concept of handling exceptions in JavaScript.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
