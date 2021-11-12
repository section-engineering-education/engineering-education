---
layout: engineering-education
status: publish
published: true
url: /understanding-babel-and-how-it-will-help-you-write-javascript/
title: Understanding Babel and How it will Help you Write JavaScript
description: This tutorial provides a look into Babel and how useful it can be when writing JavaScript code. ES6 provides a transpiler that converts to a rather plain, regular JavaScript in the end.
author: robert-wanjau
date: 2021-11-03T00:00:00-16:24
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-babel-and-how-it-will-help-you-write-javascript/hero.png
    alt:  Babel in writing Javascript Image
---
Babel enables a programmer to convert edge JavaScript into plain old ES5 JavaScript that can run in any browser, including the older ones. Among the most common syntactical sugars added to JavaScript due to the new ES6 are Classes, fat arrows, and multiline strings.
<!--more-->
This tutorial will provide a look into Babel and how useful it can be when writing JavaScript code.

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
Babel is distributed as a Node.js node module whose installation is done via npm. To install Babel, you need to run the command below in your terminal.

```bash
$ npm install – D babel-cli 
```

There are plugins for Webpack, Gulp, Grunt, Sublime, Webstorm, and a variety of other technologies. Thus, Babel is likely to be able to integrate with any development toolchain you may be using.

### Classes
JavaScript does not have any classes. However, the fact that objects inherit directly from one another means that any object can be the parent (superclass) of any other object in the system.

Any function can be a constructor function, and calling it with the `new` keyword will create a new object. You may learn more about object orientation in the official documentation, available [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS).

This is all amazing in JavaScript, but it makes C# and Java developers nervous, which is understandable. So ES6 introduces the `class` keyword. This allows us to define functions that can only be used as constructors and nothing else.

The term `class` refers to a specific template that can be used to define other objects, as we are all aware. This is an exception to the rule of prototypical inheritance. 

As a result, we restrict ourselves to only constructing objects from functions that we have specifically determined how it should be used in this manner.

#### Classes in Babel
This snippet resembles an ES6 class:

```JavaScript
class Person {}
var dave = new Person
```

When we run it through Babel, we receive nothing more than a constructor function and a little extra decoration.

```JavaScript
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

The `Person function`, which may be used as a standard prototype constructor, is already available. With the `_classCallCheck` function, we can perform safety checking as well.

This method is called within the `Person constructor`, and it will throw an error unless the `Person function` is treated as a constructor function, in which case it will return `true`.

### Multiline strings
In addition, ES6 introduces a new, more concise manner of defining strings. You can construct multiline strings by using the backtick symbol. 

Using this method is extremely beneficial when creating templates in JavaScript. Here is an example of a straightforward Angular template.

#### Example

```JavaScript
var template = `
<div>
  <h1>hello {{name}}</h1>
</div>
`
```

#### Result

```JavaScript
var template = "
  <div>
    <h1>hello {{name}}</h1>
  </div>
  ";
```

### Fat Arrows
`Fat Arrows` are also known as `arrow Functions`. They are a relatively new way to write concise JavaScript functions. The ECMAScript 6 specifications introduced them, and they have since become a widely used ES6 feature. 

The fat arrow `=>` operator allows us to quickly define JavaScript functions with or without parameters using arrow functions. The use of `Fat arrows` allows us to define anonymous functions in a readable manner. 

For instance, we can write a function like the below:
 
#### Example
 
```JavaScript
 (x, y) => {return x + y};
```

#### Result

```JavaScript
(function (x, y) {
  return x + y;
});

```

It should be noted that this function has not been invoked. If we want to invoke it, we store it to a variable or provide an argument for a callback or a promise. 

#### Calling the function

```JavaScript
(x, y) => {return x + y} (1,2);
```

#### Result

```JavaScript
(function (x, y) {
  return x + y;
})(1, 2);
```

### Fat arrows with an exact single parameter
When we have exactly one parameter, we are allowed to omit the braces preceding the arrow.

```JavaScript
x => {return x + 1};
```

#### Result

```JavaScript
(function (x) {
  return x + 1;
});
```

### Fat Arrows with exactly one line of code
If our function contains exactly one line of code (assuming a line ends with a semi-colon), we can omit the curly braces altogether.

```JavaScript
x => x + 1;
```

#### Result

```JavaScript
(function (x) {
  return x + 1;
});
```

#### Fat arrows in practice
Let us use one of these to output all the elements in an array.

```JavaScript
[1, 2, 99].map(num => console.log(num));
```

#### Result

```JavaScript
[1, 2, 99].map(function (num) {
  return console.log(num);
});
```

#### Fat Arrows and this (Lexical Scoping) 
When a function is invoked, the `this` keyword in JavaScript is configured to return the object immediately preceding the dot. This is sensible, but it might sometimes be inconvenient because it necessitates the storage of `this` in such a context.

A way around `this is to use a fat arrow`, which keeps `this`'s current value. This is referred to as `lexical scoping`.

```JavaScript
x = {
  y: function() {
    () => {console.log(this)}();
  }
}
```

#### Result

```JavaScript
x = {
  y: function y() {
    var _this = this;
    (function () {
      console.log(_this);
    })();
  }
};
```

- We can see that the value of this, that has been stored in a variable inside the closure.


### Conclusion
A sugary layer on top of `ES5` makes up the majority of `ES6`. The JavaScript programming language retains its status as the prototype [list processing language](https://www.tutorialspoint.com/lisp/index). 

Apart from some excellent syntax, ES6 provides a transpiler that converts to a rather plain, regular JavaScript in the end. One reason for these sugars is to make it easier for Java/C# developers.

Who may first find prototypical inheritance challenging to understand. Fat arrows, for example, help us to write more concise and modern-looking code while also improving the functionality of JavaScript.

#### Further Reading
For more features of Babel and ES6, check out [this link](https://babeljs.io/docs/learn-es2015/).

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
