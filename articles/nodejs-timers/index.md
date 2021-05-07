
### Introduction
Node.js has several utilities that we can use to schedule the execution of our codes.
Unlike most Node.js modules, the timer module is not imported. The methods are globally accessible to provide conformity with the JavaScript browser API.
In this tutorial, we look at the Node.js timer module, how we can use this utility to control the execution of our codes.

### Table of contents

1.Scheduling timers
2.Cancelling timers
3.Summary

### Prerequisites
1. [Node.js](https://nodejs.org/en/download/) Installed in your development environment. In this tutorial we use v15.12.
2. Basic JavaScript knowledge. 

### Goal

At the end of this tutorial, you should be able to control the execution of some blocks of your code. 

### Scheduling timers using setTimeout() method 

As discussed earlier, Node.js API provides utilities enabling us to execute code at a later time based on our requirements. 

In this section, we look at Node.js `setTimeout()` method.   
This method is used to schedule the execution of code after a given period in **milliseconds**.     

Syntax:

```js
let timeoutId = setTimeout(func[, delay, argument1, argument2, ...]);// option 1
let timeoutId = setTimeout(func[, delay]); //option 2
let timeoutId = setTimeout(code[, delay]); //option 3

``` 

Example: 

```js


function myTimerFunction(argument) 
{ 
    console.log(`argument was => ${argument}`);
} 

setTimeout(myTimerFunction('John Doe'), 5000);

```

In the above example, we've defined `myTimerFunction()` method.  
This method is then called inside a `setTimeout()` method,executd after 5 seconds. Output:

```bash
"argument was => John Doe"
```

> NOTE: setTimeout() in Node is slightly different from window.setTimeout() in JavaScript API as it doesn't accept strings.
> It's also important to note that `setTimeout()` cannot be fully relied on due to other factors coming into play such as code [blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/). ### Scheduling timers using setInterval() method Unlike `setTimeout()`, this method is used to execute code multiple times. For instance, [section](section.io) company may send out newsletters to its [Edge as a Service](https://www.section.io/saas-edge-solutions/) customers weekly. This is an example of where the `setInterval()` method comes in. It's an infinite loop that will execute as long as it's not exited (halted).  
 
It has the following syntax: 

```js
let intervalId = setInterval(callbackFunction, [delay, argument1, argument2, ...]); //option 1
let intervalId = setInterval(callbackFunction[, delayDuration]); // option 2
let intervalId = setInterval(code, [delayDuration]); //option 3

```
Let's look at an example:


```js
function intervalFunction() 
{ 
    console.log('This interval is printed after 2 seconds!');
} 

setInterval(intervalFunction, 2000);

```

Output after 20 seconds: 

```bash
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds!
This interval is printed after 2 seconds! 
```
In the above example, `intervalFunction()` is being executed every 2 seconds until it's exited (stopped).

### Scheduling timers using setImmediate() method 

The `setImmediate()` method is used to execute code at the end of the loop cycle.
In simple terms, this method breaks tasks that take longer to execute to run a callback function initiated by other operations such as events.

setImmediate() function has the following syntax: 
``` js
let immediateId = setImmediate(callbackFunction, [param1, param2, ...]);
let immediateId = setImmediate(callbackFunction);
```
Let's look at an example: 

```js
console.log('before set immediate function is called'); 

setImmediate((arg) => { console.log(`executing the immediate function: ${arg}`);
}); 

console.log('after immediate function has been executed');
``` 

Output:

```bash
before a set immediate function is called
after the immediate function has been executed
executing the immediate function: undefined
```
While executing this method, you're likely to encounter an error as seen below, otherwise, skip this part:

```js
before a set immediate function is called
error: ReferenceError: setImmediate is not defined
``` 

To fix this issue, simply add the following scripts on top of the script:

```js
window.setImmediate = window.setTimeout;
```
With basic knowledge in `setImmediate()`, let's look at a slightly advanced example with nested functions: 

In `timer.js` script file, add the following: 

```js

setImmediate(function functionA()
    { setImmediate(function functionB()
    { console.log(10); 
    setImmediate(function functionD()
    { console.log(20); }); }); 
    setImmediate(function functionC()
    { console.log(30); 
    setImmediate(function functionE() 
    { console.log(40);
    });
  });
});


console.log('You have started set immediate:...');
```

Output: 
```bash

You have started set immediate:...
10
30
20
40
```
In the script above, we have called several queued methods, i.e `functionA()`,`functionB`,`functionC` , `functionD`, and` functionE`.
They are all executed upon the completion of an event loop. Nested callbacks are not executed ***immediately***, until the following loop.
This explains why we have unordered output. 


### Cancelling timers

Now that we've learned how to schedule tasks, what if we need to stop/cancel schedules?
These 3 methods that we've discussed i.e `setTimeout()`, `setImmediate()`, and `setInterval()` return timer object.
When this timer object is passed to the `clear()` method, the execution of these methods is stopped altogether. 

Example:

```js

let timeoutObject = setTimeout(() => { console.log('Timebout');}, 3000);
let intervalTimerObject = setInterval(() => { console.log('Interval');}, 5000);
let immediateTimerObject = setImmediate(() => { console.log('Immediate');}); 

clearTimeout(timeoutObject);
clearInterval(intervalTimerObject);
clearImmediate(immediateTimerObject);
```
### Conclusion
In this tutorial, we've seen the process of scheduling tasks using the Node.js timer module. We've seen how to set timeouts, set interval timers for recurring tasks, and how to bypass long operations using set immediate.  
We've also seen how we can halt these operations using the `clear()` method for each respective method.
You can also get more information about Node.js timer [here](https://nodejs.org/en/docs/guides/timers-in-node/) and working codebase on [github](https://github.com/owinowendy/node-timers).

Happy coding!!
---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

