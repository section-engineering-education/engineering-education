---
layout: engineering-education
status: publish
published: true
url: /javascript-hoisting/
title: A Primer on JavaScript Hoisting
description: Hoisting is when the JavaScript compiler changes the placement of variables and function in your code.
author: nadiv-gold-edelstein
date: 2020-03-19T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/javascript-hoisting/hero.jpg
    alt: javascript hoisting
---
JavaScript is similar to an interpreted language. JS compiles one line at a time, and then runs that line. To ensure that each function can access all the variables in its scope, JS moves variables from the scope they were defined in to the outer scope above it.
<!--more-->

### Introduction
I personally know many JavaScript (JS) developers who are missing out on some of the more basic concepts. I can't blame them; JS is a quirky language, and a lot education about it skips out on some of the higher-level JS principles, like [the event loop](/event-loop-explained/), even if they are crucial to writing good JavaScript code. In this article, we will explore *hoisting*, a JS fundamental that will impact every line of code you will ever write.

### Hoist the Mainsail
In short, hoisting is when the JS compiler changes the placement of variables and function in your code. We will explore why this happens a little later, but for now, take a look at this code:
~~~javascript
"use strict" //enables strict mode, where undeclared variables can not be used
b = "Section is cool" //variable is changed here
alert(b) //variable is used here
var b //variable is declared here
~~~
You can run it on [repl.it here](https://repl.it/@NadivGold/Hoisting1).
As you can see, this works and alerts `Section is cool` just fine. But why? The variable is declared at the bottom of the code. We expect it to either not print anything, or print undefined. Try commenting out the line "var b" to see that nothing is alerted without it.

This is an example of hoisting. JS restructures the above code into:
~~~javascript
"use strict"
var b //variable is declared here
b = "Section is cool" //variable is changed here
alert(b) //variable is used here
~~~
JavaScript hoists the variable declaration to the top of our code.

### Why JavaScript Edits Your Code

JS is similar to an [interpreted language](https://en.wikipedia.org/wiki/Interpreted_language); it is a Just-In-Time compiled language (but that's outside the scope of this article). JS compiles one line at a time, and then runs that line. To ensure that each function can access all the variables in its scope, JS moves variables from the scope they were defined in to the outer scope above it. This is necessary when defining new variables in the middle of a scope instead of the top of that scope.

Before C99, C programmers had to declare all local variables they needed at the beginning of the scope, and not anywhere else. Modern languages now support variable declarations anywhere,

Here's another good example of hoisting to help you understand the concept. Try it out it [here](https://repl.it/@NadivGold/Hoisting2).
~~~javascript
for(var i =  0; i <  5; i++){
	console.log(i)
}
console.log(i)
~~~
In truly compiled languages, the bottom log would throw an error as `i` was only declared inside the for loop, but JS hoisted `i` to the outer scope - outside the for loop, allowing us to access the variable.

With hoisting, JS changes the above example to look like:
~~~javascript
var i //now initialized in the outer scope.
for(i = 0; i <  5; i++){
	console.log(i)
}
console.log(i)
~~~
### It Gets Worse
Using your knowledge of hoisting, what does the following code do?
~~~javascript
function printMessage(){
	console.log(msg)
	var msg = "Section is cool"
}
printMessage()
~~~
If you guessed `undefined`, you'd be right. You can test it out [here](https://repl.it/@NadivGold/Hoisting3).

Here's what JS sees:
~~~javascript
function printMessage(){
	var msg
	console.log(msg)
	msg = "Section is cool"
}
printMessage()
~~~
As we can see, only declarations are hoisted, and initializing stays where it is.
### Raising Functions
Certain functions also get hoisted. Let's take a look at this code:
~~~javascript
printMessage()
function printMessage(){
	var msg = "Section is cool"
	console.log(msg)
}
~~~
In other languages, the compiler would be mad at us for calling a function before we declared it, but JS is nice enough to move our function to the top of the scope, and before the `printMessage()` function call. You can view the live version [here](https://repl.it/@NadivGold/Hoisting4).

### Straight as an Arrow Function

Use [ES6](https://www.w3schools.com/js/js_es6.asp)? One of the nicest things ES6 has added to the language are arrow functions, like:
~~~javascript
const printMessage = ()  =>  {
	console.log("Section is cool")
}
printMessage()
~~~
These look like normal functions, work like normal functions, and for the most part, they behave like normal functions. They are not, however, hoisted like normal functions.

 Lets see what happens when we move the `printMessage()` function call above our function, like we did above.
~~~javascript
printMessage()
const printMessage = ()  =>  {
	console.log("Section is cool")
}
~~~
We get a lot of red errors. Check it for yourself [here](https://repl.it/@NadivGold/Hoisting5).

### Let

If this is still confusing, I don't blame you.  For our last example, let us check out `let`. This is one of the other ways to declare variables in JS. We'll reuse a previous example:
~~~javascript
for(let i =  0; i <  5; i++){
	console.log(i)
}
console.log(i)
~~~
As always, you can try it out [here](https://repl.it/@NadivGold/Hoisting6).

`let` declares a variable just in the scope. It 'cancels' hoisting. This is why running the above code works fine for 0 through 4, but throws errors when we try to access `i` outside of the scope. The `let` keyword is very useful if you keep scopes in mind.

### But Wait, There's More

There are even more corner cases with hoisting that you'll run across, and while it's not necessary to write code that accounts for all of hoisting's shenanigans, it is still helpful to keep this knowledge in the back of your mind.

Hoisting may seem complicated and unavoidable, and it is, but now you should have some more tools to better understand and write this quirky language we all love.  
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQyMzgwNjY5OV19
-->
