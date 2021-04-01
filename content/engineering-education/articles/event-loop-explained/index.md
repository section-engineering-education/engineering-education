---
layout: engineering-education
status: publish
published: true
url: /engineering-education/event-loop-explained/
title: The Event Loop Explained
description: The event loop is not just for JavaScript. It is the standard that defines how a web browser front end works. Understanding the event loop is the first step to creating great web-based software.
author: nadiv-gold-edelstein
date: 2020-03-10T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/event-loop-explained/hero.jpg
    alt: event loop explained
---
The event loop is not just for JavaScript. It is the standard that defines how a web browser front end works. Understanding the event loop is the first step to creating great web-based software.
<!--more-->
### Parallel Processing
In the early 2000s, CPU manufacturers hit a wall. At the time, clock cycles were king. The more cycles your CPU could produce, the more instructions it could perform per second, and the faster the machine. With increased cycles came increased heat - too much to dissipate.

Clever manufacturers instead opted to increase the number of cores, allowing for performance-seeking processes to access an entire core, leaving the rest for other tasks. Clever programmers used specialized languages to access these other cores and tease out speed.  Nowadays, those same clever developers use these multiple cores for synchronous tasks, such as background processes or running two applications at once.  

JavaScript (JS) is not that clever. JS is a single-threaded language, meaning that it can access only one core to execute a single line of instructions. This is a big limitation. For example, if there was a timer on a website and another JS event were to happen, such as an animation, the timer would halt while the browser handled the other instructions. This limitation is detrimental for the future of JavaScript development. The solution? The event loop.

### Event Loop

The event loop is not just for JavaScript. It is the standard that defines how a web browser front end works.

![event loop 1](https://media.giphy.com/media/RhBsyPkh1BC87DSIJe/giphy.gif)

The purple ball represents the current state of the event loop. Like a movie, the browser redraws the screen on every frame. Between frames, JavaScript runs. When the script event ends, control is passed back to the browser to redraw any changes that occurred. This keeps animations or UX elements fluid while still computing the JavaScript in the background.  

### Clogging the Drain

In a new tab, try pasting the following code into your [browser's console](https://kb.mailster.co/how-can-i-open-the-browsers-console/). You will have to end the tab's process afterwards.

~~~javascript
while(true){ console.log("Section is cool") }
~~~
Try selecting text or clicking on buttons. Can't? Let's see why.

Here is the event loop while our code is running.

![blocked event loop](https://i.imgur.com/C1P1MR7.jpg)

It is stuck in our JavaScript infinite loop. The website can't re-render or handle other events, like clicks, because we haven't given control back to the browser.

This is called blocking the event loop. Long tasks like loops can unintentionally block the event loop, and make web apps and sites feel slow and unresponsive.

### Unclogging the Drain

Fortunately, we have tools to get around this. Copy this code into a browser console.
~~~javascript
let loop = setInterval(() => {
	console.log("Section is cool")
}, 0)
~~~
In this case, we use `setInterval(foo, 0)`. This adds a callback to the callback queue. Functions like `setInterval`, `setTimeout`,  and *promises* put code in the queue. When all tasks end, JavaScript will start running code in the queue in a first in, first out structure. We can use these asynchronous tools to write non-blocking code.

### Welcome to Hell
Asynchronous JavaScript is not perfect. Some JavaScript developers describe *callback hell* when code contains many functions, usually nested, that add callbacks to the callback queue. This means some functions are not resolved top to bottom, and instead are called at a later time. Take the following code for example:
~~~javascript
function callbackFunction(){
	console.log("called foo")
}
foo(callbackFunction) //calls callbackFunction as async
console.log("finished script")
~~~
While seemingly innocuous, this code has some interesting aspects to it. Due to hoisting (a subject for another article), the function `callbackFunction` is defined. Then we invoke `foo`. This places callbackFunction on the callback stack; "finished script" is now logged. Now that the stack is clear, callbackFunction can be invoked and print "called foo" to the log. We end up with a console log that looks like
~~~
finished script
called foo
~~~
This non-linear execution is difficult to understand, and leads to callback hell and undefined behavior.

### Importance
As browsers and JavaScript engines become faster and more powerful, client-side JavaScript is more efficient. Non-blocking asynchronous code is crucial for responsive web apps that use web/server requests or complex processes during run-time.

Understanding the event loop is the first step to creating great web-based software.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MzQxNTE2MjhdfQ==
-->
