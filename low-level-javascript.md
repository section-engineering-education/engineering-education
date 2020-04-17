---
layout: engineering-education
status: publish
published: true
title: Low Level JavaScript "The Magic of asm.js"
description: Low level means fast, and its hard to get faster than pure assembly. Asm.js, or Assembly JavaScript is a subset of normal JavaScript built to take advantage of certain aspects of JavaScript and low level techniques to squeeze every ounce of speed on the web.
author: Nadiv Gold Edelstein
date: 2020-04-17T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:


  - url: /assets/images/education/magic-cards-small.jpg
    alt: Low Level JavaScript asm.js
---
Low level means fast, and its hard to get faster than the pure assembly. Asm.js or Assembly JavaScript is a subset of normal JavaScript built to take advantage of certain aspects of JavaScript and low-level techniques to squeeze every ounce of speed on the web.
<!--more-->

### Opening Sequence
Asm.js is a strict subset of normal JavaScript with some interesting aspects. Unlike most JavaScript dialects, asm.js is a compilation target, not something meant to be coded by hand. Instead, programmers write C or C++ and then translate the semi-compiled source code into asm.js.

### The Trick
Asm takes advantage of many low-level aspects of JavaScript to leverage speed. In this article, we will explore two of the tricks asm employs, and see some of the true power of the web.

#### Types
Before the C or C++ code was compiled to asm.js JavaScript, it looked something like this:
```c++
int add(int a, int b){
	return a + b;
}
```
Optimized by LLVM and passed through  [Emscripten](https://emscripten.org/), a tool that turns C/C++ into asm.js, the above code is turned into:
```javascript
function add(a, b){
	return a | 0 + b | 0
}
```
#### Type Annotations
If you look at compiled asm.js code, you should expect to see the bit-wise or 0 a lot. For example,
```JavaScript
var x = 3 | 0
```
That bit-wise or does something interesting to our value. In this case, it acts as an implicit cast from the floating point `number` to an int `number`. Try this in your console:
```JavaScript
var x = 3.5 | 0
console.log(x) // 3
```
#### From Strongly Typed to Weakly Typed
If you have ever taken an intro to JavaScript course, you will know that all numbers are of type `number`. Try these in your browser's console.
```JavaScript
//would be an int in C/C++
console.log(typeof(3)) //prints number
//would be a float in C/C++
console.log(typeof(3.14)) //prints number
```
The `number` type in JavaScript is an 8-byte IEEE-754 float. Does this mean that our C/C++ code that uses ints get translated into an 8-byte float? Not exactly. JavaScript can actually handle numbers of different sizes and types.
```JavaScript
//here is what the number type normally is
console.log(Float64Array.BYTES_PER_ELEMENT)
//prints 8
```
```JavaScript
//a traditional C/C++ int
console.log(Int8Array.BYTES_PER_ELEMENT)
//prints 1
```
Running both of these in the browser's console gives us 8-bytes for the first, and 1-byte for the second. Armed with this knowledge, we can see how asm.js can translate from the strongly typed variables in C/C++ to weakly typed JavaScript.

### Lightning Round
Asm.js does a lot more under the hood than we'll go in-depth here, but they are still worth noting. Here are some more interesting aspects of asm.js to take into account when trying to optimize JavaScript

 - Asm.js forgoes high level abstractions like JavaScript Objects
 - Asm.js does not create garbage, thus no need to spend time garbage collecting
 - Asm.js takes advantage of worker threads, opening up faster async code
 - Asm.js allows for use of some C/C++ libraries, such as OpenCV and Qhull

### Final Curtain
If you want to see asm.js in action, I recommend the [bananabread demo](https://kripken.github.io/misc-js-benchmarks/banana/index.html) by Mozilla. The game engine was originally written in [C++](https://en.wikipedia.org/wiki/Cube_2:_Sauerbraten), and then compiled into JavaScript to run on the web.

Asm.js is an important tool for unlocking the power of the web. Its uses are endless, from media processing to gaming, to AI, to responsive web apps. Even if you don't use it in your projects, the tricks that asm employs are something that every web dev should know.

If you want to get started using asm.js for your next project, I recommend the [Emscripten tutorial](https://emscripten.org/docs/getting_started/Tutorial.html).

<!--stackedit_data:
eyJoaXN0b3J5IjpbNTgwNDg3MTddfQ==
-->

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/nadiv-gold-edelstein.jpg">Nadiv Gold Edelstein is a sophomore at University of Colorado at Boulder. He enjoys full stack development, teaching computer science, and being strongly opinionated about code.
