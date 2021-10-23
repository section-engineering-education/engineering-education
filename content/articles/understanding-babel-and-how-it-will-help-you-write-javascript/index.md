### Introduction
Babel is a JavaScript transpiler that changes over `EcmaScript 5` JavaScript from the forefront to standard JavaScript. `EcmaScript 6` by Babel incorporates all of the most recent javascript elements and headways. This article will give you a prologue to Babel and tell you the best way to utilize it to make javascript simpler to work with.

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
  - [This keyword and the Babel Fat Arrows](#this-keyword-and-the-babel-fat-arrows)
- [Conclusion](#conclusion)
  - [Further Reading](#further-reading)
  - 
### Implementation
Babel comes bundled as a module  through npm: 

```
$ npm install – D babel-cli 
```

There are modules for webpack, swallow, snort, Sublime and Webstorm. So whatever your improvement toolchain is, Babel can be used with it.

### Classification
According to various articles, JavaScript is without style and this furter implies that anything might be the parent of another. 

You might get more information about this in the JavaScript for Smart People course - Object Orientation segment.

A class is an  example object that can be utilized to depict a wide characteristsc of things. 

#### Classes in Babel
This is what an EcmaScript 6 class looks like:
```javascript
class User {

}
let userOne = new User
```

With a bit of elaboration, we get a constructor to work if we run it through Babel:

```javascript
"use strict";
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
let userOne = function User() {
  _classCallCheck(this, userOne);
};
let userOne = new User();
```

We have our `UserOne` project, which serves as a standard prototype constructor. The `_classCallCheck` method adds a touch of safety testing as well.

Apart from if the `userOne` work is regarded as a constructor work, the `_classCallCheck` work is called inside the `userOne` constructor and will cause a mix-up.

### Numeric Strings
As a bonus, EcmaScript 6 introduces a new way to characterize strings. Strings with many lines can be created using the backtick image. This is very helpful for describing JavaScript format types.
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
Fat arrows offer a pleasant language structure for characterizing mysterious capacities.

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

This capacity has not been called. We could call it as demonstrated below: 
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
If we have a single border, then we can be allowed to prohibit the supports for moving ahead of the bolt:

```javascript
a => {return a + 3};
```

we get:

```javascript
(function (a) {
  return a + 3;
});
```

If our capacity contains precisely one line of code, we can exclude the wavy supports inside and out:

```javascript
a => a + 1
```

Results to:

```javascript
(function (a) {
  return a + 1;
});
```

### Further practice
One of these should be used to produce all of the array's constituents.

```javascript
let x = [12, 23, 68];
x.map(ind => alert(ind));
```

gives us:

```javascript
let x = [12, 23, 68]
x.map((ind)=>{
  return console.log(ind);
});
```

### This keyword and the Babel Fat Arrows
 The watchword `this` is the article preceding the spot when the capacity is called in JavaScript. 

This is sensible, however frequently annoying, since it once in a while needs `this` to be hidden in that. Fat bolts bypass `this` by protecting the current worth of `this`.

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
 b: let b = ()=> {
   let _this = this;
    ( ()=> {
      alert(_this);
    })();
 }
};
```

The value of this has been taken care of in a variable inside the conclusion. 

### Conclusion
ECMAScript 6 is over-applied to the highest point of ECMAScript 5. JavaScript in the motor keeps on working as the original, list-readiness language that we are familiar with. When using ECMAScript 6, we get some pleasant accentuation that ultimately means truly plain, standard JavaScript.

This is expected to help the Java/C# people group, which often experiences model inheritance perplexing upon first disclosure. Some of it, like fat bolts, permits us to have a more compact, more contemporary-looking language structure while likewise expanding the helpfulness of JavaScript.

### Further Reading
Additional elements of Babel and EcaScript 6 can be found [here](https://babeljs.io/docs/learn-es2015/)

Happy Coding!
