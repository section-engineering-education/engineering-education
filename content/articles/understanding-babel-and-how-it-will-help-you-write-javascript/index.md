### Introduction
Babel is a JavaScript transpiler that transforms edge JavaScript to mainstream `EcmaScript 5`JavaScript capable of running in any source code.
All of the new features and enhancements in contemporary javascript are captured by Babel in `EcmaScript 6`.
This post will introduce you to Babel and demonstrate how to use it to assist you in writing javascript.
### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Implementation](#implementation)
- [Classification](#classification)
  - [Classes in Babel](#classes-in-babel)
- [Numeric Strings](#numeric-strings)
- [Fat Arrows](#fat-arrows)
- [Fat bolts with a single boundary](#fat-bolts-with-a-single-boundary)
  - [Further practice](#further-practice)
  - [Fat Arrows and This](#fat-arrows-and-this)
- [Conclusion](#conclusion)
  - [Further Reading](#further-reading)
### Implementation
Babel comes bundled as a hub module. Establishment, as you may expect, is through npm: 
```
$ npm install – D babel-cli 
```
There are modules for webpack, swallow, snort, Sublime, Webstorm, and so forth Whatever your improvement toolchain, Babel can most likely space into it.
### Classification
JavaScript is devoid of style. Things descend from different articles, which means that any item may be the parent of another.
Any limit is a constructor limit, and invoking it with the new expression returns something else.
You may get more information about this in the JavaScript for Smart People course - Object Orientation section.
This is all very nice and JavaScript, but it creates some restlessness in C# and Java designs. They are used to a degree of greater meticulousness, which is why ES6 introduces the class expression. This enables us to see the constraints that should be utilized as constructors.
A class is a remarkable pattern object that can be used to describe a wide variety of things. This is a once-in-a-lifetime instance of archetypal legacy. We restrict ourselves to creating things from constraints that we have specifically chosen to be utilized as needed.
#### Classes in Babel
An ES6 class resembles this:
```javascript
class User {}

let userOne = new User
```
If we run it through Babel we simply get a constructor work, notwithstanding a little embellishment:
```javascript
"use strict";
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Canno call a class as a function");
  }
}
let userOne = function User() {
  _classCallCheck(this, userOne);
};
let userOne = new User();
```
We have our `UserOne` project, which serves as a standard prototype constructor. Additionally, we get a smidgeon of safety checking through the `_classCallCheck` function.
Apart from if the `userOne` work is regarded as a constructor work, the `_classCallCheck` work is called inside the `userOne` constructor and will cause a mix-up.
### Numeric Strings
ES6 additionally has a new, sweet method of characterizing strings. The backtick image allows you to make multiline strings. This is particularly useful when characterizing formats in JavaScript.
- **Example**
```javascript
let temp = `
<p>
  <h4> Hi {{name}}</h4>
</p>
`
```
The following is compiled:
```javascript
let temp = "
  <p>
    <h4>Hi {{name}}</h4>
  </p>
  ";
  ```
### Fat Arrows
Offers a pleasant language structure for characterizing mysterious capacities.

- **Example**
```javascript
 function (a, b) {
  return a + b
  };
```
Results to:
```javascript
((a, b)=> {
  return a + b;
});

```
 This capacity has not been called.We could call it as demonstrated below: 
- **calling the function**
```javascript
let x = (a, b) => {return a + b} (4,5);
```
Gives the following:
```javascript
let x = (function (a, b) {
  return a + b;
})(4, 5);
```
### Fat bolts with a single boundary 
If we have a single border, then can be allowed to prohibit the supports for moving ahead of the bolt:
```javascript
a => {return a + 3};
```
we get:
```javascript
(function (a) {
  return a + 3;
});
```
 If our capacity contains precisely one line of code we can exclude the wavy supports inside and out:
```javascript
a => a + 1
```
Results to:
```javascript
(function (a) {
  return a + 1;
});
```
#### Further practice
We should utilize one of these to yield every one of the components in the array.
```javascript
[12, 23, 68].map(ind => alert(ind));
```
gives us:
```javascript
[12, 23, 68].map(function (ind) {
  return alert(ind);
});
```
#### Fat Arrows and This 
 In JavaScript, the keyword `this` is set to be the article immediately before the speck when the capability is called. This is reasonable, but often vexing, since it sometimes wants `this` to be tucked away in that.
Fat bolts circumvent this by safeguarding the current value of `this`. 
```javascript
a = {
  b:()=>{
    () => {
      alert(this)
      }();
  }
}
```
Results to:
```javascript
a = {
 b: function b() {
   var _this = this;
    (function () {
      alert(_this);
    })();
 }
};
```
 The worth of `this` has been put away in a variable inside the closure
### Conclusion
ECMAScript 6 is primarily a sugar coating applied to the top of ECMAScript 5. JavaScript in the engine continues to function as the archetypal, list-preparation language that we are accustomed to. When we use ECMAScript 6, we get some nice punctuation that eventually translates to genuinely plain, ordinary JavaScript.
A portion of this sugar is intended to benefit the Java/C# community, which upon first discovery frequently encounters prototype legacy befuddling.
Some of it, such as fat bolts, allows us to have a more concise, more contemporary-looking language structure while also increasing the usefulness of JavaScript.
#### Further Reading
Additional elements of Babel and EcaScript 6 can be found [here](https://babeljs.io/docs/learn-es2015/)


Happy Coding!