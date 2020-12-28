---
layout: engineering-education
status: publish
published: true
url: /engineering-education/javascript-and-web-apis/
title: How JavaScript Uses Web Browser APIs to Achieve Asynchronisity
description: In this tutorial we will introduce us to Asynchronous JavaScript and walk through how JavaScript uses web browser APIs to achieve asynchronisity.
author: adrian-murage
date: 2020-12-08T00:00:00-17:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/javascript-and-web-apis/hero.jpg
    alt: JavaScripts and Web APIs
---
Pure JavaScript has a single thread of execution. Known as the [main thread](https://developer.mozilla.org/en-US/docs/Glossary/main_thread) in the browser context. This means that long-running JavaScript functions can block the thread, leading to an [unresponsive page](https://developer.mozilla.org/en-US/docs/Glossary/main_thread) and a bad user experience.
<!--more-->

### Introduction
Examples of long-running JavaScript functions are those that:
- Fetch data from an API.
- Wait for some time to elapse before executing.

The above-mentioned functionality is commonly used in today's web applications. In this guide, you will learn how this functionality is achieved asynchronously with web browser APIs.

With an understanding of Asynchronous functionality you should be able to:
1. Run long-running JavaScript functions without blocking the Thread Of Execution.
2. Run functionality related to long-running JavaScript functions once they are completed.
3. Understand what happens during the entire process.

### Prerequisites
Before you begin this guide you will need:
- An understanding of what happens when [JavaScript executes your code](/engineering-education/js-execution-under-the-hood/).

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

In this step, we'll consider the block of code above to help you understand how the Synchronous, Single Thread nature of JavaScript is untenable in modern web scenarios.

Line 1: You declare a function, `display()`. You then move on to line 4, since you do not enter the body of a function until it is executed.

Line 4: You declare a constant, `dataFromAPI`, as the label for the return value of the function on the right of the assignment. In this case `fetchAndWait()`, a **made-up** function that makes a GET request to the Twitter Servers and returns a single tweet.

The wait for the promised tweet begins. 10 milliseconds, 20 milliseconds, 50 milliseconds, 90 milliseconds. At 350 milliseconds the tweet finally arrives. 

In that intermediate time, you are not allowed to move on and run any further JavaScript code. You are blocked because JavaScript has a Synchronous Thread Of Execution.

Assuming your returned tweet is a string, `"Hello World"`, it is assigned to the constant, `dataFromAPI`.

Line 8:  You execute `display()` passing the constant, `dataFromAPI`, as an argument. This execution entails pushing `display()` onto the Call Stack, creating a Local Execution Context and moving to line 2 in the body of `display()`.

Line 2: You log the value of `dataFromAPI`. Then pop `display()` from the Call Stack, garbage collect the Local Execution Context, and move back to the Global Execution Context.

Line 9: You log the string `"Me Later!"`

From the breakdown above, you can spot a clear problem. Such a scenario in a real-world application would render our application unusable as we waited for the response from Twitter's servers. Luckily, there are solutions to this problem. 

In the next step, we introduce Web Browser APIs and walk through how they solve this problem for us.

### Step 2 - Web Browser APIs
```JavaScript
1. function printHello(){
2.   console.log(“Hello”);
3. }
4. function blockFor1Sec(){
5.   //blocks in the JavaScript thread for 1 second
6. }
7. setTimeout(printHello,0);
8. blockFor1Sec();
9. console.log(“Me first!”);
```

In this step, you will see what happens when a web browser API ( `setTimeout()` ) is introduced and how it improves what we had in the previous step.

[setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) and other web browser APIs introduce functionality that happens outside of JavaScript's Global Execution Context. 

If you wish to, you can explore the various APIs [here](https://developer.mozilla.org/en-US/docs/Web/API).

Given that the functionality is outside of JavaScript, we will need to introduce rules around when the return values, if any, are allowed back into JavaScript's Global Execution Context and how exactly JavaScript and the web browser manage that whole process.

Let's walk through the code and see this process in action.

Line 1: You declare a function, `printHello()`. You then move on to line 4.

Line 4: You declare a function, `blockFor1Sec()`. You then move on to line 7.

Line 7: You execute `setTimeout()`, that takes a function, `printHello`, and a time, in milliseconds, after which the function will be executed. This functionality is delegated to the browser, which means that your Thread of Execution is freed. You can then move onto Line 8.

Line 8: You execute `blockFor1Sec()`

The value of the timer was set to zero, meaning that at this point, `printHello()` was ready to execute 1 second ago. But for reasons you will see later it is not allowed back until some conditions are met.

Instead, it is added to a queue known as the [Task Queue](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).

Line 9: You log `"Me first"`

After Line 9, all the synchronous code has executed, your call stack is empty, but the `printHello()` function is still sitting in the Task Queue waiting to be pushed onto the call stack and executed.

For `printHello()` to be allowed back into JavaScript's Global Execution Context:
1. All of the synchronous code must have executed.
2. The call stack must be empty.

The process of checking these rules is referred to as the [Event Loop](/engineering-education/event-loop-explained/).

If the rules are satisfied, functionality sitting on the Task Queue is executed in the order they were added to the queue. First in, first out.

`printHello()` finally executes.

You now have an understanding of how JavaScript uses web browser functionality to achieve Asynchronicity.

### Conclusion
This article does not cover everything on the topic and I encourage you to read the resource linked below. 

Further reading:
[Microtasks and the JavaScript runtime environment](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)

### References
- [MDN web docs](https://developer.mozilla.org/en-US/)

- [JavaScript: The New Hard Parts](https://frontendmasters.com/courses/javascript-new-hard-parts/)

- [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/) 
