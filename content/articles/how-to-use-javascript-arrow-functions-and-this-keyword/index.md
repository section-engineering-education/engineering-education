---
layout: engineering-education
status: publish
published: true
url: /how-to-use-javascript-arrow-functions-and-this-keyword/
title: How To Use Javascript Arrow Functions & This Keyword
description: This tutorial will explain Javascript arrow functions and the this keyword and how to use it
author: joseph-chege
date: 2021-01-19T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/hero.jpg
    alt: JS Arrow Funcitons and This Keyword tutorial Image
---
ES6 introduced a new way of writing JavaScript functions called arrow function that uses a [fat arrow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) ( => ).
<!--more-->
This guide will discuss how to use the arrow function to write your JavaScript functions. Focusing on converting regular functions to arrow functions as we consider when not to use arrow functions. To understand the arrow functions, it is essential to have prior knowledge of [JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

### What are the arrow functions
It is a sort of an abbreviated way to write compact functions. 

The following are a few facts about arrow functions:
- Using the arrow function, curly braces, parenthesis, function, and return keywords become optional.
- The arrow function has a [lexical scoping](https://stackoverflow.com/questions/1047454/what-is-lexical-scope#:~:text=A%20lexical%20scope%20in%20JavaScript,be%20accessible%20outside%20that%20function.) to `this` context.

One of the main differences between arrow functions and regular functions is that arrow functions can only be anonymous. They are not bound to any identifier. 

Thus they created dynamically. We cannot name an arrow function as we do for the regular functions. However, if you'd like to call or reuse an arrow function, you will need to assign it to a variable.

For example:

```js
// a named regular function
function myFunc(params) {
  // function body
}
```

Arrow functions are always anonymous.

```js
// anonymous arrow function
(params) => {
  // function body
};
```

To call an arrow function and reuse it, you need to store it in a variable, for example:

```js
const myFunc = (params) => {
  // function body
}
```

### How to use arrow functions
One aspect you will recognize frequently is the range of syntaxes usable in the arrow functions. Arrow function have a lot of variations and different syntax depending on your block of code. 

Let’s discuss some of the common ones.

Here is a standard arrow function syntax. 

Arrow functions are denoted with the following syntax:

```js
(paraml, param2, paramN) => {
  statement(s);
};
```

- Param - function arguments/parameters.
- Statement - the body of the function.

When writing an arrow function:
- The keyword function is eliminated.
- The arrow is positioned in between the arguments of the function and the function body.

#### More dynamic arrow functions syntax
Let's try to derive more arrow function syntaxes by converting some regular functions to arrow functions.

Example one: A function with one argument.

```js
function square(a) {
    return a * a;
}
```

Here we have a named function `square()` with a single parameter `a`. As we said, the arrow function takes different syntax variations. This is how we can replicate it using an arrow function.

- No function keyword anymore.

```js
const square = (a) => {
    return a * a;
}
```

- When a function has one parameter, the parentheses are optional.

```js
const square = a => {
    return a * a;
}
```

- An arrow function makes an implicit return; in this case, the return keyword will be optional.

```js
const square = a => {
     a * a;
}
```

- Meaning we can do away with the curly braces.

```js
const square = a => 
     a * a;
```

- Finally, move everything to one line.

```js
const square = a => a * a;
```

Wow, note the difference. The results will be the same, the code gets smaller and more compact, with an arrow function, we arrive at one line of code, and the code's logic remains the same.

From the above examples, passing one parameter can derive a summary of the following syntax.

```js
(singleParam) => { statement }
singleParam => statement
```

If the function body has more than one statement, you need to wrap the function body with the curly brackets and use the return keyword to return the results.

```js
const square = a => {
  const total = a + b;
  return total;
}
```

Example two: A function with multiple parameters.

```js
function sum(x, y) {
  return x + y;
}
```

Curly brackets are optional, and since we have one statement, we can do away with the return keyword.

```js
const sum = (x, y) => x + y;
```

In this case, the function accepts two parameters, `a` and `b`, and returns the expression `a+b`.

Because we have more than one parameter, you need to wrap the parameters with parentheses (`(x,y)`). Otherwise, that will be a syntax error.

We can derive the following syntax.

```js
(paraml, param2) => { statements }
(paraml, param2) => expression
(paraml, param2) => {return expression; }
```

Because more than one parameter requires parentheses, [rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) and [destructing](/object-arrays-destructuring/) parameters can be implemented using an arrow function. 

They both need parentheses.

Example three: A function with an anonymous function.

It is a function with no name. 

Here is an example.

```js
const anonyFunc = function () {
    // function body
};
```

Example four: Anonymous Function with Parameters.

```js
const add = function (a, b) {
    return a + b;
};
```

This is how we can replicate the example above using the arrow function.

```js
const anonyFunc = () => {};
```

With parameters,

```js
const add = (a, b) =>  a + b
};
```

A clear note here is that the anonymous function always uses the parentheses.

**Syntax summary.**

```js
() => { statements }
() => expression

//implicit return
() => { return expression; }
```

Anonymous functions are mostly applied as an argument to another function. Such as a callback. 

For example:

```js
setTimeout(function () {
  console.log("Executed after 3 second");
}, 3000);
```

In this case, the anonymous function is passed as an argument to the `setTimeout()` function. After 3 seconds, the anonymous function will be executed.

This is how we can write the above anonymous function using the arrow function.

```js
setTimeout(() => console.log("Executed after 3 second"), 3000);
```

### Some common applications of arrow functions

#### Arrow functions and callbacks
The arrow function syntax is heavily seen when using [callback functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function).

For example, let's use some of the built-in JavaScript callback functions, such as `filter` and `map`, and see what we can achieve with arrow functions.

Assume you have an array of donors:

```js
const donated = [{name: "Xavier", age: 19, city:"LA", donation: 20},
{name: "David", age: 16, city:"georgia", donation: 20},
{name: "Amanda", age: 18, city:"wahingon DC", donation: 20},
{name: "Amy", age: 20, city:"chicago", donation: 20},
{name: "Jesicca", age: 28 , city:"LA", donation: 20},
{name: "Alex", age: 15, city:"LA", donation: 20}]
```

This is how we can apply `filter` and `map` using the regular function syntax:

```js
const donate = donated.filter(function (donated) {
  if (donated.age >= 18) {
    return true;
  }
});
console.log(" Donors above 18", donate);

const sum = donated.reduce(function (total, amount) {
  return total + amount.donation;
}, 0);
console.log("Total donations", sum);
```

Replicate the logic above using an arrow function.

```js
const donate = donated.filter((donated) => donated.age >= 18);
console.log(" Donors above 18", donate);

const sum = donated.reduce((total, amount) => total + amount.donation, 0);
console.log("Total donations", sum);
```

The arrow function makes the callback function compact and less verbose. This doesn't affect the readable code.

#### Arrow function and `this` context
[`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) represents an object that executes the current function. In short, `this` is defined by the function execution context. Such as how a function is called, it refers to a global object window. For example, when a function is being executed from a global object.

You might have used `this` keyword in a real-life situation without realizing it. Suppose you are walking along with your mother and meet a friend along the way. This is how you would introduce your mom to your friend. ***This is my mother.***

Take a close look at `this` is that sentence. `this` shows a reference to your mother. `this` represents the mother in the current sentence. It is the same way JavaScript uses `this` keyword.

Let see how JavaScript will refer to a mother using `this`.

```js
// an object parent with the property mom_name
const parent = {
  // add property
  mom_name: "Samantha Quinn",

  // create a method to return parent
  mother: function () {
    return "This is my mother.";
  },
};
console.log(parent.mother());
```

Log ***This is my mother*** to the console. But what if we replace "this" in the sentence with JavaScript `this` keyword.

```js
// an object parent with the property mom_name
const parent = {
  mom_name: "Samantha Quinn",
  mother: function () {
    return `${this} is my mother.`;
  },
};
console.log(parent.mother());
```

This will print an object because we didn't reveal the mother's name. We didn't refer to the mother. It executes the object `parent`, but we didn't refer `this` to the property of `parent`.

If we specify the mother's name.

```JS
const parent = {
    mom_name: "Samantha Quinn",
    mother: function () {
        return `${this.mom_name} is my mother`;
    },
};
console.log(parent.mother());
```

***Samantha Quinn is my mother***, will be printed in the console.

In this example, we used the `this` keyword to refer to the `parent`. Meaning `this` refers to its `parent` object. It refers to the context where the anonymous function is called. And this will bind to the `parent` object to return the name of the mother.

What if we use this globally. Let's see that with examples.

```js
function test() {
  console.log(this);
}
test();
```

Run the above call in a browse console. You will get something like:

```js
Window {window: Window, . . . .}
```

![window objects](/engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/window-objects.jpg)

This is because the `test()` is called from a global context, and `this` will refer to a global object. In this case, a global object window is called from the browser. `this` is not defined by the caller. 

Thus, it will turn to the default window object. The Javascript engine will check if `test()` is available in the window object. If not, the engine will add it to the many available Javascript window object methods.

Let's get a little complex. What if we use the arrow function.

```js
const parent = {
  mom_name: "Samantha Quinn",
  mother: () => {
    return `${this.mom_name} is my mother.`;
  },
};
console.log(parent.mother());
```

We get `undefined.....`.

It actually makes sense. In the regular function, a function always defines its `this` value. Arrow functions treat `this` keyword differently. They don't define their own context since it doesn't have its own `this` context. They inherit that from the parent scope whenever you call `this`.

`this` in regular function always refers to the context of the function being called. However, in the arrow function, `this` has nothing to do with the caller of the function. It refers to the scope where the function (the enclosing context) is present. That's why we get undefined.

To understand `this`, let's go through another example.

```js
function User() {
  (this.name = "John Doe"),
    (this.score = 20),
    (this.sayUser = function () {
      // when `this` is accessible
      console.log(this.name);

      function innerFunction() {
        // when `this` refers to the global scope/object
        console.log(this.name);
      }

      innerFunction();
    });
}
let name = new User();
name.sayUser();
```

Output:

```js
John Doe

undefined
```

In the first case, we get the user name because `this.name` is inside `this.sayUser`, which is accessible. The reason is because `this.sayUser` is a method of the object `User`.

On the other hand, the `this.name` inside `innerFunction` function is not accessible. It refers to the global object window where `sayUser` is not defined—thus returning `undefined`.

To solve that, you would typically assign `this` to a variable that doesn't shadow `innerFunction`.

For example:

```js
function User() {
  (this.name = "John Doe"),
    (this.score = 20),
    (this.sayUserName = function () {
      // when `this` is accessible
      console.log(this.name);

      // when `this` refers to the global scope/object
      // a variable that doesn't shadow `innerFunction`
      let self = this;
      function innerFunction() {
        console.log(self.name);
      }

      innerFunction();
    });
}
let name = new User();
name.sayUserName();
```

However, when the `innerFunction` is inside an arrow function, `this` will refer to the parent scope by creating `this` of its own context.

For example:

```js
function User() {
  (this.name = "John Doe"),
    (this.score = 20),
    (this.sayUser = function () {
      // when `this` is accessible
      console.log(this.name);

      let innerFunction = () => {
        // when `this` refers to the global scope/object
        console.log(this.name);
      };

      innerFunction();
    });
}
let name = new User();
name.sayUser();
```

Let's look at the broader scope of how the arrow function binds to this keyword.

Here is an example that uses the regular function.

Execute the examples below with the console. You can use the Google chrome console.

```js
let animals = {
  // add property
  domesticAnimals: ["cat", "dog", "cow", "goat", "sheep", "donkey", "pig", "horse"],
  // add method
  printdomesticAnimals: function () {

    // print after 3 seconds
    setTimeout(function () {
      console.log(this.domesticAnimals.join(" - "));
    }, 3000);
  },
};
animals.printdomesticAnimals();

```

The above example accesses the object's property `domesticAnimals` and prints the domestic animals in 3 seconds. Unfortunately, we ran into an error.

![error](/engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/error.jpg)

`setTimeout()` can't find the `domesticAnimals`, which means the JavaScript engine interprets `domesticAnimals` as `undefined`. Meaning `this` doesn't point to the property `domesticAnimals`. `this` seems to be pointing to somewhere else. 

Does it refer to the:
- inner function context
- the outer (enclosing) function context
- the object context or
- the window context?

The example below will help us to understand where `this` keyword points. We will log `this` inside the context of outer (`printdomesticAnimals()`) and inner (`setTimeout()`) function.

```js
let animals = {
  // add property
  domesticAnimals: ["cat", "dog", "cow", "goat", "sheep", "donkey", "pig", "horse"],
  // add method
  printdomesticAnimals: function () {
         console.log("inside printdomesticAnimals", this);
    // print after 3 seconds
    setTimeout(function () {
      console.log("inside setTimeout", this);
    }, 3000);
  },
};
animals.printdomesticAnimals();
```

![execution context](/engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/this-execution-context.jpg)

`this` inside `printdomesticAnimals()` points to the object `animals` with the `domesticAnimals` property. `this` inside `setTimeout()` points to the window object where property `domesticAnimals` is undefined.

This is where the arrow function comes into play. They don't have their own `this` context. When used inside the outer (enclosing) function, `this` keyword will point to where the function is present. 

In this case, `this` will be attached to the outer context `printdomesticAnimals()` where `setTimeout()` is called. `printdomesticAnimals()` will be the enclosing context where `this` will be attached.

```js
let animals = {
  // add property
  domesticAnimals: ["cat", "dog", "cow", "goat", "sheep", "donkey", "pig", "horse"],
  // add method
  printdomesticAnimals: function () {

    // print after 3 seconds
    setTimeout(() => console.log(this.domesticAnimals.join(" - ")), 3000)
  },
};
animals.printdomesticAnimals();
```

When we use the arrow function, we get the results as we expected.

![inside arrow function](/engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/this-inside-arrow-function.jpg)

#### Arrow functions with object literal
Let's have an example that represents a [JavaScript object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

```js
const sayName = function(){
  return {
    name: "Jonh Doe",
    age: 26,
  };
}
console.log(sayName().name);
```

`sayName()` is a function expression that returns an object that has properties `name` and `age` set to "John Doe" and "26", respectively.

Convert to an arrow function.

```js
const sayName = () => {
  name: "Jonh Doe",
  age: 26,
};

console.log(sayName().name);
```

You should note that when we return the literal object using the arrow function it causes an error. This is because JavaScript can't distinguish if the curly braces represent a block of code or an object.

To solve this, wrap the literal object with parenthesis. 

For example:

```js
const sayName = () => ({
  name: "Jonh Doe",
  age: 26,
});
console.log(sayName().name);
```

### When not to use arrow functions
The arrow functions concept is great, however, they are not ideal across all functional instances. You should be keen on where to apply the arrow function. 

For example, there are some instances that you should avoid using. 

They include:

#### Arrow function can never be a method
For example, this applies to the `mom` example we explained earlier

For example:

```js
// an object parent with the property mom_name
const parent = {
     // add property
  mom_name: "Samantha Quinn",
     // create a method to return parent
  mother: () => {
    return `${this.mom_name} is my mother.`;
  },
};
console.log(parent.mother());
```

Object `parent` has one property, `mom_name`, and one method, `mother`.

In this case, `this.mom_name` return `undefined` because `this` value is equal to the [method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) upon where we call the object property.

As we said earlier, `this` inside an arrow function is equivalent to the global object.

Whenever an arrow function is inside an object, it will derive `this` value from the enclosing lexical scope. Lexical scope, in this case, is the global scope.

`this.mom_name` in the `mother` method is equal to the `window.mom_name` in the web browser. The `window.mom_name` is `undefined` by default. 

Window object doesn’t have the property `mom_name`. Thus `console.log(mom. mother())` will return `undefined` as `this` inherits its eclosing context `mother` where `mom_name` is undefined.

To prevent the `this` value from binding to the global scope, use the regular function inside the object method as follows:

```js
// an object mom with the property mom_name
const parent = {
  // add property
  mom_name: "Samantha Quinn",
  // create a method to return parent
  mother: function () {
    return `${this.mom_name} is my mother.`;
  },
};
console.log(parent.mother());
```

Avoid arrow functions when using a code block with methods. They can be confusing at times due to their lexical scoping. This occurs mostly on object methods, prototype methods, and class methods. `this` is scoped to the parent (window) context.

#### An arrow function can never be a constructor
The value `this` points to its parent does not have a [`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor).

```js
const User = () => {
  (this.name = "John Doe"), (this.age = 20);
};
const user = new User();
console.log(user);

```

When you execute, `this` will throw an error `Uncaught TypeError: User is not a constructor` because arrow functions are not constructable. 

However, a regular function can be `constructors`,

For example:

```js
function User() {
  (this.name = "John Doe"), (this.age = 20);
}
const user = new User();
console.log(user);
```

Using the `new` keyword to create an object in an arrow function will output an error.

#### Click handlers
Suppose I have a button `CLICK ME`.

Here is the code to implement a click me button.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    button {
      font-size: 100px;
    }
    .on {
      background: #ffc600;
    }
  </style>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button id="clicky">CLICK ME</button>
  <script>
// Call the following arrow function when the button is clicked.
    const button = document.querySelector('#clicky'); button.addEventListener('click', () => { this.classList.toggle('on'); });
  </script>
  </button>
</body>
</html>
```

When you click the button, you get an error. But why? This means that `this` in the click event handle is undefined. And will always return undefined. 

Remember what we said about the arrow functions using `this`?. `this`, inside the arrow function, implies that the function does not have a `this` value of its own.

They don't define their own context since it doesn't have its own `this` context. They inherit that from the parent scope whenever you call `this`. The parent scope is the window scope. Thus `this` in the above example will reference the window object. 

`this` is not attached to the element we refer to. The window object doesn't have `.classList.toggle` property. Thus Javascript engine will add the `.classList.toggle` to the window object and set it to undefined. To fix these issues, you would use the regular function where `this` is bound to the element that triggers the click event.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    button {
      font-size: 100px;
    }
    .on {
      background: #ffc600;
    }
  </style>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button id="clicky">CLICK ME</button>
  <script>
    const button = document.querySelector('#clicky'); button.addEventListener('click', function() { this.classList.toggle('on'); });
  </script>
  </button>
</body>
</html>
```

#### Debugging may not be easy
Arrow functions cannot be named. They are anonymous. Anonymous functions are labeled as anonymous during a debugging session.

This doesn't give you any idea what the code block is running. When you run into issues, it may be harder to debug the root cause. When the functions have names, it's simpler to trace back to the problem. With anonymous functions, it adds a level of complexity to debugging.

#### Readability takes a hit
Although arrow functions help with writing short and concise code, it is not necessarily readable. Most programmers are used to the traditional way of writing functions, and arrow functions change this completely. This makes code harder to read and might take a while for someone newer to grasp the code. 

Therefore in such circumstances, developers may choose to use regular functions rather than arrow functions. The primary objective when you compose a function is to create the purest function practicable. Meaning that the function would still return its same value. If you're using regular functions or arrow functions, it doesn't matter. It should be about writing readable and cleaner code always.

### Final Notes
Arrow functions save you some keystrokes when working with the functions. They are especially useful for inline functions, as they pass along the outer `this` context.

With an arrow function:
- No more function keywords are need, and parenthesis are optional as well as curly braces.
- Arrow functions make code shorter, more concise, and less verbose.
- The keyword return would indeed be optional. The Arrow function has an implicit return. Thus no curly braces. If you are using the curly braces, you have to use the return statement.
- Arrow functions are not attached to an identifier (the function name). To call or reuse them, your need to assign them to a variable.
- They are frequently used in callback chaining, promise chaining, array methods, and situations where anonymous (the function has no name) functions would be useful.
- They handle `this` operator a lot more clearly. The Arrow functions shine most whenever you need `this` to be attached to the context and not its own function.

As a beginner, arrow functions seem unfamiliar and hard to read. They take time to understand. As you learn about them, they become convenient and straightforward to implement in your functions.

I hope this guide gives you an overview of applying the fat arrow within your functional code blocks.

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
