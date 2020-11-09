---
layout: engineering-education
status: publish
published: true
url: /engineering-education/js-promises-under-the-hood/
title: How JavaScript Promises Work Under The Hood.
description: 
author: adrian-murage
date: 
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/js-promises-under-the-hood/hero.jpg
Introduction    alt: JS Promises under the hood
---
### Introduction
Pure JavaScript has a single thread of execution. Known as the [**main thread**](https://developer.mozilla.org/en-US/docs/Glossary/main_thread) in the browser context. "This means that long-running JavaScript functions can block the thread, leading to an unresponsive page and a bad user experience."[(MDN docs)](https://developer.mozilla.org/en-US/docs/Glossary/main_thread)

Examples of long-running JavaScript functions are those that:
- Fetch data from an API.
- Wait for some time to elapse before executing.

But, the above-mentioned functionality is commonly used in today's web applications. In this guide, you will learn how this functionality is achieved Asynchronously with Web Browser APIs and JavaScript Promises. You will also learn how the two are implemented under the hood.

With an understanding of Asynchronous functionality you should be able to:
1. Run long-running JavaScript functions without blocking the Thread Of Execution.
2. Run functionality related to long-running JavaScript functions once they are completed.
3. Understand what happens under the hood during the entire process.

### Prerequisites
Before you begin this guide you will need:
- An understanding of what happens when [JavaScript executes your code](https://www.section.io/engineering-education/js-execution-under-the-hood/).

### Step 1 - When do you need Asynchronous JavaScript?
```JavaScript
1. function display(data){
2.   console.log(data)
3.   } 
4. const dataFromAPI = fetchAndWait('https://twitter.com/will/tweets/1')
5. //... user can do NOTHING here !
6. //... could be 300ms, could be half a second
7. // they're just clicking and getting nothing
8. display(dataFromAPI)
9. console.log(“Me later!”);
```
In this step, we will consider the block of code above to help you understand how the Synchronous, Single Thread nature of JavaScript is untenable in modern web scenarios.

Line 1: You declare a function, `display()`. You then move on to line 4, since you do not enter the body of a function until it is executed.

Line 4: You declare a constant `dataFromAPI` as the label for the return value of the function on the right of the assignment. In this case `fetchAndWait()` is a **made-up** function that makes a GET request to the Twitter Servers and returns a single tweet.

The wait for the promised tweet begins. 10 milliseconds, 20 milliseconds, 50 milliseconds, 90 milliseconds. At 350 milliseconds the tweet finally arrives. In that intermediate time, you are not allowed to move on and run any further JavaScript code. You are blocked because JavaScript has a Synchronous Thread Of Execution.

Assuming your returned tweet is a string, `"Hello World"`, it is assigned to the constant `dataFromAPI`.

Line 8:  You execute `display()` passing the constant `dataFromAPI` as an argument. You then move into the body of `display()`, push `display()` onto the Call Stack and create a Local Execution Context.

Line 2: You log the value of `dataFromAPI`. You then pop `display()` from the Call Stack, garbage collect the Local Execution Context and move back to the Global Execution Context.

Line 9: You log the string `"Me Later!"`

From the breakdown above, you can spot a clear problem. Such a scenario in a real-world application would render our application unusable. Luckily, there are solutions to this problem. In the next step, we introduce Web Browser APIs and walk through how they solve this problem for us.
