ES6 introduced a new way of writing JavaScript functions called arrow function that uses a [fat arrow =>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). It is a sort of an abbreviated way to write compact functions. When writing a JavaScript function, you would regularly use a function keyword to declare a function.

For example:

The following blocks of code calculate the sum of two numbers.

```js
// function declaration
function sum (a, b) {
  return a + b;
}
```

##### Regular Functions

```js
// function expression
const sum = function (a, b) {
  return a + b;
};
console.log(sum(12, 30));
```

##### Arrow Function
The arrow function allows you to write a function without using the regular `function` keyword's syntax. It makes functions shorter.

```js
const sum = (a, b) => a + b;
console.log(sum(12, 30));
```

The above examples are equivalent to the `sum()` function and give us the same results.

This guide will discuss how to use the arrow function to write your JavaScript functions. To understand arrow functions, it is essential to have prior knowledge of [JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

### Arrow Function Syntax
Arrow function has a lot of variations and different syntax depending on your block of code. An arrow function depends on the number of arguments/parameters passed to a function and the return keyword (the function's body).

Before looking at some different ways to write the arrow function, you need to note that JavaScript has different ways to write a function. They include a named function and an anonymous function. In this case, arrow functions can only be an anonymous function. We cannot name an arrow function as we do for the regular functions.

For example;

```js
// a named regular function
function myFunction(params) {
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

To call an arrow function and reuse it, you need to store it in a variable, for example;

```js
const myFunction = (params) => {
  // function body
}
```

Here is a standard arrow function syntax

```js
(paraml, param2, paramN) => {
  statement(s);
};
```

- Param - functions arguments/parameters
- Statement - the body of the function

#### Arrow Function with One Argument

```js
function square(a) {
    return a * a;
}
```

Here we have a named function `square()` with a single parameter `a`. As we said, the arrow function takes different syntax variations. This is how we can replicate using an arrow function.

- No function keyword anymore.

```js
const square = (a) => {
    return a * a;
}
```

- When a function has one parameter, parenthesis are optional.

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

- And finally, move everything to one line.

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

#### Arrow Function with Multiple Parameters

```js
function sum(x, y) {
  return x + y;
}
```
Curly brackets are optional, and since we have one statement, we can do away we the return keyword.

```js
const sum = (x, y) => x + y;
```

In this case, the functions accept two parameters, `a` and `b`, and return the expression `a+b`

Since we have more than one parameter, you have to wrap the parameters with the parenthesis, `(x,y)`. Otherwise, that will be the syntax error.

We can derive the following syntax.

```js
(paraml, param2) => { statements }
(paraml, param2) => expression
(paraml, param2) => {return expression; }
```

Because more than one parameter requires parenthesis, [rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) and [destructing](/engineering-education/object-arrays-destructuring/) parameters can be implemented using an arrow function. They both need parenthesis.

#### Anonymous Function
It is  a function with no name. Here is an example.

```js
const anonyFunc = function () {
    // function body
};
```

##### Anonymous Function with Parameters

```js
const add = function (a, b) {
    return a + b;
};
```

This is how we can replicate the above example using the arrow function.

```js
const anonyFunc = () => {};
```

With parameters,

```js
const add = (a, b) =>  a + b
};
```

A clear note here is that the anonymous function always uses the parenthesis.

**Syntax summary.**

```js
() => { statements }
() => expression

//implicit return
() => { return expression; }
```

Anonymous functions are mostly applied as an argument to another function. I.e., a callback.

```js
setTimeout(function () {
  console.log("Executed after 3 second");
}, 3000);
```

In this case, the anonymous function is passed as an argument to the `setTimeout()` function. The anonymous function will be executed after 3 seconds.

This is how we can write the above anonymous function using the arrow function.

```js
setTimeout(() => console.log("Executed after 3 second"), 3000);
```

### Arrow Function and Callbacks
The arrow syntax is heavily seen when using [callback functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function).
For example, let's use some of the build JavaScript callback function, such as `filter` and `map`, and see what we can achieve with arrow functions.

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

const sum = donated.reduce(function (total, amout) {
  return total + amout.donation;
}, 0);
console.log("Total donations", sum);
```

Replicate the above logic using an arrow function.

```js
const donate = donated.filter((donated) => donated.age >= 18);
console.log(" Donors above 18", donate);

const sum = donated.reduce((total, amout) => total + amout.donation, 0);
console.log("Total donationds", sum);
```

The arrow function makes the callback function compact and less verbose. This doesn't affect the code is readable.

### Arrow Functions with Object Literal
Let's have an example that represents [JavaScrip object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

```js
const sayName = function(){
  return {
    name: "Jonh Doe",
    age: 26,
  };
}
console.log(sayName().name);
```

`sayName()` is a function expression that returns an object that has properties `name` and `age` set to "John Doe" and "20", respectively.

Convert to an arrow function.

```js
const sayName = () => {
  name: "Jonh Doe",
  age: 26,
};

console.log(sayName().name);
```

You should note that, when we return the literal object using the arrow function cause an error. This is because JavaScript can't distinguish if the curly braces represent a block of code or an object.

To solve this, wrap the literal object with parenthesis. For example;

```js
const sayName = () => ({
  name: "Jonh Doe",
  age: 26,
});
console.log(sayName().name);
```

### Arrow Function and `this` Context

[`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) represents an object that executes the current function. In short, `this` is defined by the function execution context. I.e., how a function is called, it refers to a global object window. I.e., when a function is being executed from a global object.

You might have used `this` keyword in real-life without ever realizing you are using `this` keyword. Suppose you are walking along with your mom and meet a friend along the way. This is how you would introduce your mom to your friend. ***This is my mother.***

Take a close look at `this` is that sentence. `this` shows a reference to your mother. `this` represents the mother in the current sentence. It is the same way JavaScript uses `this` keyword.

Let see how JavaScript will refer to a mother using `this`.

```js
// an object mom with the property mom_name
const mom = {
  // add property
  mom_name: "Samantha Quinn",

  // create a method to return mom
  mother: function () {
    return "This is my mother.";
  },
};
console.log(mom.mother());
```

This log ***This is my mother*** to the console. But what if we replace "this" in the sentence with JavaScript `this` keyword.

```js
// an object mom with the property mom_name
const mom = {
  mom_name: "Samantha Quinn",
  mother: function () {
    return `${this} is my mother.`;
  },
};
console.log(mom.mother());
```

This will print an object because we didn't reveal the mother's name. We didn't refer to the mother. It executes the object `mom`, but we didn't refer `this` to the property of `mom`.

If we specify the mother's name.

```JS
const mom = {
    mom_name: "Samantha Quinn",
    mother: function () {
        return `${this.mom_name} is my mother`;
    },
};
console.log(mom.mother());
```

***Samantha Quinn is my mother***, will be printed in the console.

In this example, we used `this` keyword to refer to the `mom`. Meaning `this` refers to its `mom` object. It refers to the context where the anonymous function is called. And this will bind to the `mom` object to return the name of the mother.

What if we use this globally. Let's see that with examples

```js
function test() {
  console.log(this);
}
test();
```

Run the above call in a browse console. You will get something like;

```js
Window {window: Window, …}
```

This is because the `test()` is called from a global context, and `this` will refer to a global object. In this case, a global object window from the browser. `this` is not defined by the caller. Thus, it will turn to the default abject window.

Let's get a little complex. What if we use the arrow function.

```js
const mom = {
  mom_name: "Samantha Quinn",
  mother: () => {
    return `${this.mom_name} is my mother.`;
  },
};
console.log(mom.mother());
```

We get `undefined.....`.

It actually makes sense. In the regular function, a function always defines its `this` value. Arrow functions treat `this` keyword differently.

They don't define their own context since it doesn't have its own `this` context. They inherit that from the parent scope whenever you call `this`.

As we said, `this` in regular function always refers to the context of the function being called. However, in the arrow function, `this` has nothing to do with the caller of the function. It refers to the scope where the function is present. That's why we get undefined.

In this case, the regular function will refer to the caller of the function, which is the object `mom`. The arrow function will refer to the scope of the function itself where the property `mom` is defined. And  Execute within the context of where the function is being called.

In short, it binds `this` keyword to an object where the function is defined.

To understand `this`, let's have another example.

```js
function User() {
  (this.name = "John Doe"),
    (this.age = 20),
    (this.sayUser = function () {
      // `this` is accessible
      console.log(this.age);

      function innerFunc() {
        // `this` refers to the global object
        console.log(this.age);
      }

      innerFunc();
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

In the first case, we get the user name because `this.name` is inside the function `this.sayUser` which is accessible. The reason, because `this.sayUser` is a method of object `User`.

On the hand, `this.name` inside `innerFunc` function is not accessible. it refers to the global object window where `sayUser` is not defined. Thus returning `undefined`. Reason, `this` of function `innerFunc` shadows `this` of `sayUser`.

To solve that you would typically assign `this` to a variable that doesn't shadow `innerFunc`.

For example;

```js
function User() {
  (this.name = "John Doe"),
    (this.age = 20),
    (this.sayUserName = function () {
      // `this` is accessible
      console.log(this.name);
      let self = this;
      function innerFunc() {
        // `this` refers to the global object
        console.log(self.name);
      }

      innerFunc();
    });
}
let name = new User();
name.sayUserName();
```

However, when `innerFunc` is inside an arrow function, `this` will refer to the parent scope by creating `this` of its own context.

For example;

```js
function User() {
  (this.name = "John Doe"),
    (this.age = 20),
    (this.sayUser = function () {
      // `this` is accessible
      console.log(this.name);

      let innerFunc = () => {
        // `this` refers to the global object
        console.log(this.name);
      };

      innerFunc();
    });
}
let name = new User();
name.sayUser();
```

### Final Notes
Arrow functions saves you some keystrokes when working with the functions. They are especially useful for inline functions, as they pass along the outer `this` context.

However, you should be keen on where to apply the arrow function. For example, there are some instances that you should avoid using. They include;

#### An Arrow Function can Never be a Method
For example, this applies to the mom example we explaind earlier i.e.;

```js
// an object mom with the property mom_name
const mom = {
     // add property
  mom_name: "Samantha Quinn",
     // create a method to return mom
  mother: () => {
    return `${this.mom_name} is my mother.`;
  },
};
console.log(mom.mother());
```

In this case, `mom.mother()` return `undefined` because `this` value is equal to the [method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) upon where we call the object. As we said earlier, `this` inside an arrow function is equal to the outer scope's value, equivalent to the global object.

#### An Arrow Function can Never be a Constructor

The value `this` points to its parent, the do not have a [`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor).

```js
const User = () => {
  (this.name = "John Doe"), (this.age = 20);
};
const user = new User();
console.log(user);

```

When you execute, `this` will throw an error That the `Uncaught TypeError: User is not a constructor` because arrow functions are not constructable. However regular function can be `constructors`,

For example;

```js
function User() {
  (this.name = "John Doe"), (this.age = 20);
}
const user = new User();

console.log(user);
```

Using the `new` keyword to create an object in an arrow function will output an error.

With an arrow function:
- No function keyword is required.
- Parenthesis are optional (with one parameter).
- Curly braces are optional.
- The return keyword becomes optional. Arrow function has an implicit return without curly braces. If you use the curly braces, you have to use the return statement.
- There is no difference between calling an arrow function and a regular function.
- It makes code shorter, more concise, and less verbose.
- They work best withcall back functions.
- They cannot be a method or a constructor.
- They manage `this` operator much more straightforward. They are anonymous and change the way `this` bind in a function.

As a beginner, arrow functions seem unfamiliar and hard to read. They take time to understand. As you learn about them, they become very handy and straightforward to implement in your functions.

I hope this guide gives you an overview of how to apply the fat arrow within your functions.