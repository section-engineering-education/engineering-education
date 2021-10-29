---
layout: engineering-education
status: publish
published: true
url: /understanding-babel-and-how-it-will-help-you-write-javascript/
title: Babel in writing Javascript
description: In this tutorial we will take a look of how Babel can be useful in writing javaScript code.
author: robert-wanjau
date: 2021-10-28T00:00:00-11:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-babel-and-how-it-will-help-you-write-javascript/hero.png
    alt:  Babel in writing Javascript Image
---

### Introduction
When you use Babel, you can convert edge JavaScript into plain old ES5 JavaScript that can be run in any browser.(even the old ones). Classes, fat arrows, and multiline strings are among the syntactical sugar that has been added to JavaScript as a result of the introduction of the new ES6 specification.
<!--more-->
In this tutorial we will take a look of how Babel can be useful in writing javaScript code.

### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Implementation](#implementation)
- [Classes](#classes)
  - [Classes in Babel](#classes-in-babel)
- [Multiline Strings](#multiline-strings)
- [Fat Arrows](#fat-arrows)
- [Fat arrows with an exactly single parameter](#fat-arrows-with-an-exactly-single-parameter)
- [Fat Arrows with exactly one line of code](#fat-arrows-with-exactly-one-line-of-code)
  - [Fat arrows in practice](#fat-arrows-in-practice)
  - [Fat Arrows and This(Lexical Scoping)](#fat-arrows-and-thislexical-scoping)
- [Conclusion](#conclusion)
  - [Further Reading](#further-reading)


### Implementation
Babel is distributed as a Node.js node module. Installation of Babel is done via npm.

```
$ npm install – D babel-cli 
```

There are plugins for Webpack, Gulp, Grunt, Sublime, Webstorm, and a variety of other technologies. Babel is likely to be able to integrate with any development toolchain you may be using.

### Classes
JavaScript does not have any classes. The fact that objects inherit directly from one another means that any object can be the parent (superclass) of any other object in the system.

Any function can be a constructor function, and calling it with the `new` keyword will result in the creation of a new object. You may learn more about object orientation in the JavaScript for Smart People course - Object Orientation portion, which is available here.

This is all amazing in JavaScript, but it makes C# and Java devs a nervous, which is understandable. ES6 introduces the class keyword. This allows us to define functions that can only be used as constructors and nothing else.

The term `class` refers to a specific template that can be used to define other objects, as we are all aware. This is an exception to the rule of prototypical inheritance. As a result, we restrict ourselves to only constructing objects from functions that we have specifically determined should be used in this manner.

#### Classes in Babel
This snipet resembles an ES6 class:

```javascript
class Person {}
var dave = new Person
```

When we run it through Babel, we receive nothing more than a constructor function and a little extra decoration.

```javascript
"use strict";
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Person = function Person() {
  _classCallCheck(this, Person);
};
var dave = new Person();
```

The Person function, which may be used as a standard prototype constructor, is already available. With the `_classCallCheck` function, we can perform safety checking as well.

This method is called within the `Person constructor`, and it will throw an error unless the `Person function` is treated as a constructor function, in which case it will return `true`.

### Multiline Strings
In addition, ES6 introduces a new, more concise manner of defining strings. You can construct multiline strings by using the backtick symbol. Using this method is extremely beneficial when creating templates in JavaScript. Here's an example of a straightforward Angular template.

- **Example**

```javascript
var template = `
<div>
  <h1>hello {{name}}</h1>
</div>
`
```

- **Result**

```javascript
var template = "
  <div>
    <h1>hello {{name}}</h1>
  </div>
  ";
  
  ```
### Fat Arrows
The use of `Fat arrows` allows us to define anonymous functions in a readable manner. For instance, we can write  a function like below:
 
- **Example**
 
```javascript
 (x, y) => {return x + y};
```

- **Result**

```javascript
(function (x, y) {
  return x + y;
});

```

It should be noted that this function has not been invoked. If I wanted to invoke it, I could store it to a variable or provide it as an argument to a callback or a promise. 

- **Calling the function**

```javascript
(x, y) => {return x + y} (1,2);
```

- **Result**

```javascript
(function (x, y) {
  return x + y;
})(1, 2);
```

### Fat arrows with an exactly single parameter
When we have exactly one parameter we are allowed to omit the braces preceding the arrow.

```javascript
x => {return x + 1};
```

- **Ressult**

```javascript
(function (x) {
  return x + 1;
});
```

### Fat Arrows with exactly one line of code
If our function contains exactly one line of code (assuming a line ends with a semi-colon) we can omit the curly braces altogether.

```javascript
x => x + 1;
```

- **Result**

```javascript
(function (x) {
  return x + 1;
});
```

#### Fat arrows in practice
Let us use one of these to output all the elements in an array.

```javascript
[1, 2, 99].map(num => console.log(num));
```

- **Result**

```javascript
[1, 2, 99].map(function (num) {
  return console.log(num);
});
```

#### Fat Arrows and This(Lexical Scoping) 
When a function is invoked, the `this` keyword in JavaScript is configured to return the object that is immediately preceding the dot. This is sensible, but it might be inconvenient at times because it necessitates the storage of `this` in that.

A way around `this` is to use a fat arrow, which keeps the current value of `this`. This is referred to as `lexical scoping`.

```javascript
x = {
  y: function() {
    () => {console.log(this)}();
  }
}
```

- **Result**

```javascript
x = {
  y: function y() {
    var _this = this;
    (function () {
      console.log(_this);
    })();
  }
};
```

- We can see that the value of this has been stored in a variable inside the closure.


### Conclusion
A sugary layer on top of `ES5` makes up the majority of `ES6`. Inside, the JavaScript programming language retains its status as the prototype list processing language that we are all too familiar with. 

Aside from some excellent syntax, ES6 provides a transpiler that converts to a rather plain, regular JavaScript in the end. One reason for some of this sugar is to make it easier for Java/C# developers who, at first, may find prototypical inheritance difficult to understand. 

Fat arrows, for example, help us to write more concise and modern-looking code while also improving the functionality of JavaScript.

#### Further Reading
For more features of Babel and ES6, check out [this link](https://babeljs.io/docs/learn-es2015/)

Happy Coding!
