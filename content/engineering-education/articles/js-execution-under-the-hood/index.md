---
layout: engineering-education
status: publish
published: true
url: /engineering-education/js-execution-under-the-hood/
title: What Happens When JavaScript Runs My Code?
description: This guide will walk you through what happens when the JavaScript (a single-threaded language) engine runs your code.
author: adrian-murage
date: 2020-10-29T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/js-execution-under-the-hood/hero.jpg
    alt: JS execution under the hood
---
### Introduction
JavaScript is a single-threaded language, where only one command executes at a time. It has a Synchronous model of execution, where each line is executed line by line, top to bottom. In this guide, you will learn what happens as the JavaScript engine threads down your code.
<!--more-->
### Prerequisites
Before you begin this guide you'll need the following:

- An understanding of [JavaScript Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

### Step 1 — What happens when JavaScript executes my code?
```JavaScript
1. const num = 3;
2. function multiplyBy2 (inputNumber){
3.     const result = inputNumber*2;
4.     return result;
5.     }
6. const name = "Will"
```

In this step, you will walk through the lines of code above like the JavaScript engine would. This is to help you understand what happens when you execute the code above.

As soon as you start executing your code, there are two halves to that process:

1. One, the process of stepping through your code line by line, top to bottom. Referred to as the **Thread Of Execution**.
2. Two, the storage of the bits of data that you announce as you go through your code's execution in live **Memory**. Referred to as the **Variable Environment**.

Together, known as an **Execution Context**. Where a context is a space to do something. In this case, it is a space where you will execute your code, hence it being called the execution context.

There are two types of Execution contexts:
1. Global Execution Context.
2. Local Execution Context.

Below is a table that illustrates your Global Execution Context before code execution.

![Global Execution Context before you execute js code](/engineering-education/js-execution-under-the-hood/global_execution_context_before_executing_js_code.jpg)

For each line, there will be a visual representation of what the Global Execution Context looks like at that moment.

Line 1: Save in memory a constant, **num**, as the label for an integer, **3**.

![Global Execution Context when line one is executed](/engineering-education/js-execution-under-the-hood/step_one_line_one.jpg)

Line 2: You reach a JavaScript keyword, [**function**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

The function keyword means, save in memory **multiplyBy2**, as the label for the functionality of the function, `multiplyBy2()` (denoted as -f- in the image).

This process is also known as **defining/declaring** a function.

![Global Execution Context when line two is executed](/engineering-education/js-execution-under-the-hood/step_one_line_two.jpg)

At this point, if you were to run:
```JavaScript
console.log(multiplyBy2.toString());
```

You would see the source code for `multiplyBy2()`.

To understand what `toString()` does see [the MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Location/toString)

From line 2, you will then move on to line 6 and not line 3.

This is because in JavaScript you **do not** go into the body of a function until it is called. And our function `multiplyBy2()` in this case, is defined, but was never called.

Line 6: Save in memory a constant, **name**, as the label for a string, **"Will"**.

![Global Execution Context when line six is executed](/engineering-education/js-execution-under-the-hood/step_one_line_six.jpg)

In the next step, you will see:
- When a Local Execution Context is created.
- What happens under the hood during that process.

### Step 2 — What happens when a function is executed in JavaScript?
```JavaScript
1. const num = 3;
2. function multiplyBy2 (inputNumber){
3.     const result = inputNumber*2;
4.     return result;
5.     }
6. const output = multiplyBy2(4);
```

As you execute functions, you will switch Execution Contexts. From Global to Local, and back to Global.

This switching of Execution Contexts raises, in JavaScript, an issue of tracking where one is in their Thread Of Execution.

To keep track of this, JavaScript uses a [**Call Stack**](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack).

You now have a third element to the execution of your JavaScript code, the Call Stack. The image below illustrates the three elements before any code is executed.

![Call Stack illustration](/engineering-education/js-execution-under-the-hood/call_stack_intro.jpg)

You will now get to see exactly how the call stack comes into play here.

Line 1: Save in memory a constant, **num**, as the label for an integer, **3**.

Line 2: Save in memory **multiplyBy2**, as the label for the functionality of the function, `multiplyBy2()`.

Line 6: Save in memory a constant, **output**, as the label for whatever the result of the function  `multiplyBy2()` returns after executing.

At this point, you call: `multiplyBy2()`.

This adds `multiplyBy2()` to the call stack. It creates a Local Execution Context for the execution of the code inside `multiplyBy2()`.

As illustrated in the image below.

![Add multiplyBy2() to call stack](/engineering-education/js-execution-under-the-hood/call_stack_add_multiplyBy2.jpg)

Once inside the Local Execution Context, you carry on with the two parts of an Execution context.

The code executed in this case is the body of `multiplyBy2()`. In JavaScript, you go into the body of a function when it is called.

Line 3: Save in memory a constant, **result**, as the label for the product of the argument **inputNumber** and an integer **2**, an integer, **8**.

Line 4: The [**return**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) keyword then ends the function execution and specifies a value to be returned to the function caller.

![Local Execution Context](/engineering-education/js-execution-under-the-hood/local_execution_context.jpg)

You then return to the Global Execution Context.

A few things happen when you do:
- JavaScript [**Garbage Collects**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management) the Local Execution Context's Variable Environment (Memory).
- The Call Stack is cleared.
- The return value is assigned to the constant **output**.

The image below illustrates the Global Execution Context after all this is done.

![After Garbage Collection](/engineering-education/js-execution-under-the-hood/after_garbage_collection.jpg)

Once all the lines of code are executed, JavaScript garbage collects the Global Execution Context's Variable Environment (Memory).

This brings you back to where you started as illustrated below.

![Global Execution Context after you execute js code](/engineering-education/js-execution-under-the-hood/global_execution_context_after_executing_js_code.jpg)

Congratulations! You now know exactly what happens when JavaScript executes your code.

### Citations & Resources
[Frontend Masters - JavaScript: The New Hard Parts](https://frontendmasters.com/courses/javascript-new-hard-parts/)

[MDN Web Docs](https://developer.mozilla.org/en-US/)

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
