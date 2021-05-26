---
layout: engineering-education
status: publish
published: true
url: /javascript-iterations-which-one-is-faster/
title: JavaScript Iterations - Which One is Faster?
description: This article goes through JavaScript iterations with examples to see which one performs faster when executing.
author: joseph-chege
date: 2020-11-10T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/javascript-iterations-which-one-is-faster/hero.png
    alt: JavaScript iterations example image
---
Loops are a fundamental part of application development. They help you repeat a task or a set of instructions several times. In JavaScript, loops validate a value in a given block of code by checking if the value meets a provided condition.
<!--more-->
The value is executed repeatedly until that condition is met. The condition then evaluates to false. To get a picture of how loops work in JavaScript, assume, let's say to log "hello world" six times. Here is a simple JavaScript code block to do that:

```js
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
console.log("hello world")
```

The code above will correctly repeat the assigned task six times. However, as the number of tasks grows, say 100 hello worlds, the code will get messy affecting code readability.

It's hard to write the same line of code 100 times. Looping through these tasks will affect execution performance drastically. Here is where JavaScript loops come to the rescue. JavaScript can control the above loop better with a few lines of codes.

***For example:***

```js
for (let loop = 0; loop < 6; loop++) {
  console.log("hello world")
}
```

With only two lines of code, we can log six "hello world" strings as we mentioned we wanted to do before. Shorter code means a faster development time, better code readability, and less performance overheads.

JavaScript has different kinds of iterations statements called loops. They include `for`, `while`, `do while`, `for in`, `for of`, and `for each`. They all do the same job, i.e., to repeat an action several times.

They however, have different ways to start and end a loop? When it comes to loops, the most common questions are which loop to use and which one is the fastest?

This guide will discuss each of these loops with simple & basic examples. We will also compare & test each loop's execution performance.

### For Loop
`For` loop is a commonly used loop. If you are a bit familiar with the world of programming, you might have come across a `for` loop statement under other programming languages such as `java`, `c++`, `c`, etc. A `for` statement loops through a specified or fixed number of elements until it meets the specified condition.

A `for statement` consist of the following parts:

```js
for (initializer; condition; increment){
    statement //loop body
}
```

- Initialization expression - it's a variable declaration that initializes a loop counter, i.e., `loop = 0`.
- Condition expression - `for` loop executes when the condition value is true, and if it is false, the loop terminates when `loop < 5`. It's a test condition that determines the number of times a statement will iterate.
- Increment expression - `loop++` updates the loop by increasing or decreasing the loop counter.
- Statement - `console.log ("hello world")` if the condition executes to true, the loop statement is executed until the condition expression `loop < 5` is false.

***For loop example:***

```js
for (let loop = 0; loop < 5; loop++){
  console.log("hello world") //loop body
}
```

### Do While
Repeats a statement until the specified condition is evaluated to be false.

```js
do {
  statement; //loop body
}  while (condition);
```

The statement is checked/executed before the condition. If the condition is true, the loop executes the statement again.

In a `do-while` loop, the next statement executes before the condition rechecks the previously executed statement.

If the condition is true, it executes the statement again until the condition evaluates to false.

```js
let i = 0;
do {
  console.log("hello world");
  i ++;
} while (i < 5);
```

In the example above, `do` iterates before `while` then `i` is incremented until the condition executes to false, i.e., until the loop cycle is no longer less than five: `(i < 5)`.

### While Loop
It loops as long as the condition evaluates to true. When the condition evaluates to false, the loop stops.

`While` checks a condition before executing the specified statement. If the statement executes, the loop retests the condition again. If the condition is false at the first loop cycle, there is a chance the loop will not call a statement.

```js
let i = 0;
while (i < 5) {
  i++;
  console.log(i);
}
```

The above block will run until `i < 5` is not true, and the loop will stop when the value of `i` is `5`. If the condition is always true, the loop will never end. Thus creating an infinite loop, as we will see below:

```js
let i = 0;
while (true) {
  i++;
  console.log('Hello, world!');
}
```

The code above block will execute forever, as the condition will never be false.

### For In
It iterates over named properties of an object key and gets each property value inside the loop. A `for-in` loop has no condition expression and incremental value. The loop executes once per property. Also runs the tests for every number of properties in an object.

```js
for(variable in object) {
//statement
}
```

The main advantage of `for-in` over the other loops is its capacity to loop through an object.

```js
const person = {
  name: "bunny",
  age:" 28",
  city: "LA",
  maritalstatus: true
}
for(let info in person)
console.log(`${info}: ${person[info]}`)
```

`For-in` will invoke the loop above the same number of times as the number of properties you add in the object `person`. It's a better solution to loop through objects.

### For Of
It repeats through iterables such as `strings`, `arrays`, `maps`, and `set`. `For-of`, loops through items in a collection such as an array.

It's very similar to the `for-in`, except this time we are using the `of` keyword and passing in an iterable instead of an object. `For-of` will not work with Objects because they are not iterable.

```js
for(variable of iterable) {
    //statement
}
```

`For-in` also works with arrays as it uses an index for each value in the array. The following example shows the difference in the results of `for-in` and `for-of` to iterate over array elements.

```js
let arr = [1, 3, 5, 7, 9];
console.log("for in");
for (let number in arr) {
  console.log(number);
  //0 1 2 3 4
};
console.log("for of");
for (let number of arr) {
  console.log(number);
  //1 3 5 7 9
};
```

To get the values, we would have to reference the original array and use square brackets to define the index of the value.

```js
let arr = [1, 3, 5, 7, 9];
for (let number in arr) {
console.log(arr[number]);
  //1 3 5 7 9
};
```

A better solution would be to use `for-of`. This statement iterates a collection of elements in an array and gives the values of an array without having to refer to the original array.

```js
let arr = [1, 3, 5, 7, 9];
console.log("for of");
for (let number of arr) {
  console.log(number);
  //1 3 5 7 9
};
```

### For Each
It executes a provided function once for each array element in ascending order. When it comes to looping through arrays `for-each` function is ideal, and it's simple to use.

```js
const animals = [ "dog", "cat", "mouse", "wolf", "chicken", "rabbit"];
  animals.forEach(function(anim){
  console.log(anim)
})
```

The callback function executes the first element in the array then the second to the last element in the array. You can rewrite the function using the arrow function, as shown below.

```js
const animals = [ "dog", "cat", "mouse", "wolf", "chicken", "rabbit"];
  animals.forEach(anim => {
  console.log(anim)
})
```

`For-each` references to a callback function once. The callback function calls every single element in the array in order.

```js
array.forEach(callback (currentValue, index, array) {
  // statement
}[thisArg]);

```

#### Parameters
- Callback - the function to be called once each element are in order.
- Current value - a mandatory parameter that holds the current element value in the array.

```js
const animals = ["dog", "cat", "mouse", "wolf", "chicken", "rabbit"];
animals.forEach((anim) => {
  console.log(anim)
})
```

- Index - the array index of the current element array position.

```js
const animals = ["dog", "cat", "mouse", "wolf", "chicken", "rabbit"];
  animals.forEach((anim, index) => {
  console.log(`index: ${index}, value: ${anim}`)
})
```

- Array - an optional parameter that holds a complete array from where for-each was called.

```js
const animals = ["dog", "cat", "mouse", "wolf", "chicken", "rabbit"];
  animals.forEach((anim, index, array) => {
  console.log(array)
})
```

- `ThisArg` - this is an optional parameter that holds the context `this` to be passed when executing the callback function.

`For-each`'s deal is to iterate over array elements without breaking the array list. It executes each array element simultaneously without side effects such as mutability of the scope variable.

It's not chainable and always returns an undefined value. It's also a high order function. If you are interested in learning more, head out to this [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

### Nested Loops
A code block that has a loop inside another loop is called a nested loop.

***For example:***

```js
for (let i = 0; i < 5; i++) {
   for (let j = 0; j < 5; j++) {
      console.log(`i = ${i}, j = ${j}`);
   }
}
```

### Loops Break and Continue
#### Break Statement
A break identifier terminates an iterating loop, i.e., the below examples closes a loop that iterates over array elements. The loop terminates when iteration finds an index of a specified value.

***Example 1***

```js
const animals = ["dog", "cat", "mouse", "wolf", "chicken", "rabbit"];
  for (let i = 0; i <animals.length; i++) {
    if (animals[i]==="wolf") break;
    console.log(`index:${i}, value: ${animals[i]}`)
}
```

The loop terminates when the index value of the animals array is equal to `wolf`. The loop will stop after testing the value `wolf`. This means that the loop will not print the `wolf` in the console.

***Example 2***
Break a `while` loop when the loop value is `3`.

```js
let n = 0;
while (n < 10) {
  if (n ==3 )
    break;
  n++;
  console.log(n)
}
```

The `while` loop will stop when the loop value is equal to `3`. Unlike `For` loop, the breakpoint value `3` will be included in the log message before the iteration stops.

`While` loops execute the condition `(n < 10)` before executing the statement. `While` loop executes a statement only when the condition is true. When the statement is invoked the `while` controls the loop by retesting the condition again until `n == 3` become false.

### Continue Statement
A continue statement break a loop, check a specified condition and then proceed to the next iteration until the loop condition expression returns false.

The loop skips a value specified in the continue statement condition. For example, to loop over some numbers and get the even numbers, we need a continue statement to break the loop whenever we iterate odd numbers.

```js
for (let i = 1; i <= 10; i++){
  if (i % 2 == 1) continue;
  console.log(i)
}
```

Every time `i` iterates, it will check the value and if the value is an odd number, the loop will break and test the next value.

The `Continue` statement will loop the current iteration and continue as long as `i` is an even number until `i <= 10` is met.

***Note: there is no way to break out of `for each` loop.***

### Labeled Loop Statement
A label identifies a loop. It's simply naming a loop or a block of code in JavaScript. A label statement can be added inside a loop as an identifier to interrupt the iteration execution.

These statements are called labels. These labels can then be used to refer to the code snippets later on. For instance, to add a `myloop` label to a loop block, add a semicolon to the end of the label name as shown below.

```js
myloop:
for (let i = 1; i <= 10; i++){
  console.log(i);
}
```

The `myloop` statement can be used to refer to our code later on. For example whenever a break or continue statements are needed.

```js
myloop:
for (let i = 1; i <= 10; i++){
  if (i % 2 == 1) continue myloop;
  console.log(i);
}
```

The code above results nothing different, as the results will be the same as when no label was used.

In loops, labels come into play when using nested loops to specify the loop to be altered. The label will determine exactly which loop to break or allow to continue.

***For example:***

```js
loopOne: for (let i = 0; i <=5; i++) {
  loopTwo: for (let j = 0; j <=5; j++) {
  if (i === 3) continue loopOne;
  if (j === 3) break loopTwo;
  console.log(`i = ${i}, j = ${j}`);
  }
}
```

In the example above:
- Every loop will perform five iterations.
- `loopOne` will always break when `i === 3`, skip the value `3`, and continue with the loop execution until `i <=5`. It will log values 1, 2, 4, and 5.
- `loopTwo` will always break and stop the iteration at `j === 3`. It will log values 1, 2, and 3.

### Speed Comparison
We will traverse through an array using one array method with the same arrays size and an equal number of iterations to compare each loop's execution time. To get the best results, we will use different test methods.

#### Using .time() and .timeEnd() Functions

```js
//number of iterations
// use 100 iterations

const iterations = 100
// add an empty array size equal to the number of iterations
const arraySize = new Array(iterations)

console.log("Starting speed/execution test performance with  arraySize iterations" , iterations);
console.log("arraySize", + arraySize.length)

//for
console.time("for")
for (let i = 0; i <iterations; i++) {}
console.timeEnd("for");

//while
console.time("while")
let i = 0;
while (i < iterations) {
  i++;
}
console.timeEnd("while");

//do...while
console.time("do...while")
let ie = 0;
do {ie++;}
while (ie < iterations);
console.timeEnd("do...while");

//for...in
console.time("for...in")
for (let ele in arraySize){}
console.timeEnd("for...in");

//for...of
console.time("for...of")
for (let ele of arraySize){}
console.timeEnd("for...of");

//for...each
console.time("for...each")
arraySize.forEach(value=> "")
console.timeEnd("for...each");
```

##### Results

```js
arraySize iterations 100
for: 0.968ms
while: 0.047ms
do...while: 0.045ms
for...of: 0.113ms
for...each: 0.065ms
```

The results are quite eye-catching with `while`, `do-while`, and `for` comparatively faster. To get a clear picture and more desirable result to try to increase the number of iterations.

```js
arraySize iterations 1000
for: 0.519ms
while: 0.129ms
do...while: 0.215ms
for...of: 1.012ms
for...each: 0.103ms

arraySize iterations 10000
for: 1.038ms
while: 1.418ms
do...while: 1.784ms
for...of: 4.314ms
for...each: 0.323ms

arraySize iterations 100000
for: 17.362ms
while: 8.722ms
do...while: 9.565ms
for...of: 29.333ms
for...each: 1.160ms

arraySize iterations 1000000
for: 17.613ms
while: 13.025ms
do...while: 13.498ms
for...of: 96.863ms
for...each: 12.207ms

arraySize iterations 10000000
for: 51.083ms
while: 42.198ms
do...while: 46.366ms
for...of: 762.958ms
for...each: 115.888ms

arraySize iterations 100000000
for: 358.317ms
while: 344.164ms
do...while: 349.297ms
for...of: 14124.834ms
for...each: 11820.696ms
```

As the number of iterations increases, the results become quite comparable, and again the old `for` loop is giving stiff competition to the `while` and `do-while` loops. On the other hand, `for` of loop seems to lag behind.

##### Nested Loop Performance

```js
const iterations = 100000
// add an empty array size equal to the number of iterations
const arraySize = new Array(iterations)
console.log("arraySize", + arraySize.length)

//nested loop
console.time("nested loop")
for (let i = 0; i < iterations; i++) {
   for (let j = 0; j < iterations; j++) {
   }
}
console.timeEnd("nested loop");
```

Created a separate code block because the nested loop creates performance overhead as the number of iterations increases.

Test the loop up to 100000 iterations.

##### Results

```js
arraySize 100: 3.554ms
arraySize 1000: 71.934ms
arraySize 10000: 490.257ms
arraySize 100000: 36745.962ms
arraySize 100000: 38987.654ms
```

#### Using Performance Observer perf_hooks
These will log several performances for every loop and then output each loop's average time to complete the assigned task.

```js
const { PerformanceObserver, performance } = require('perf_hooks');
let arraySize = 1000000;
let iterations = 100;

console.log("Starting performance test with %d array size and %d iterations", arraySize, iterations);
let values = {
    ForIn: 0,
    ForOf: 0,
    ForEach: 0,
    For: 0,
    While: 0,
    DoWhile: 0
}
const obs = new PerformanceObserver((items) => {
let entry = items.getEntries()[0];
console.log(entry.name, entry.duration);
    values[entry.name] += entry.duration;
    performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });
function generateArray() {
    let arr = [];
    for (let i = 0; i < arraySize; i++) {
        arr[i] = 'val' + i;
    }
    return arr;
}
for (let i = 0; i < iterations; i++) {
    let arr = generateArray();

    //for.......each
performance.mark('A');
    arr.forEach((val) => {
        let x = val + 1;
    });
performance.mark('B');
performance.measure('ForEach', 'A', 'B');

    //For....In
performance.mark('A');
    for (const val in arr) {
        let x = val + 1;
    }
performance.mark('B');
performance.measure('ForIn', 'A', 'B');

    //For.....Of
performance.mark('A');
    for (const val of arr) {
        let x = val + 1;
    }
performance.mark('B');
performance.measure('ForOf', 'A', 'B');

    //for loop
performance.mark('A');
    for (let i = 0; i < arr.length; i++) {
        let x = arr[i] + 1;
    }
performance.mark('B');
performance.measure('For', 'A', 'B');

    //while
performance.mark('A');
let i = 0;
while (i < arr.length) {
  i++;
  let x = arr[i] + 1;
}
performance.mark('B');
performance.measure('While', 'A', 'B');

    //do....while
performance.mark('A');
let j = 0;
do {j++;let x = arr[j] + 1;}
while (j< arr.length);
performance.mark('B');
performance.measure('DoWhile', 'A', 'B');

console.log(Object.entries(values).sort((a, b) => {
    return a[1] - b[1];
}).map(obj => {
    obj[1] /= iterations;
    return obj;
}))};
```

##### Results

```js
[
  [ 'For', 108.80030800999994 ],
  [ 'While', 110.42406587 ],
  [ 'DoWhile', 110.85779098000005 ],
  [ 'ForOf', 113.78390201000003 ],
  [ 'ForEach', 339.78870798000025 ],
  [ 'ForIn', 1214.0874350800002 ]
]
```

This is a more transparent result. Again the old `for` loop dominates the loops list. `Do-while` and `while` still have comparable performance.

I included `for-in` in this example. It seems to take the longest time to finish the loops. Unlike the other loops (logs the array values), `for-in` logs the index of the array element.

This makes it slower. `For in` is specially reserved to loops through an unspecified number of object properties.

The way you write a loop statements has a slight difference in iteration performance. For example, using the fast `for` loop, we can derive the following statements.

#### Using Incremental
```js
for (let i = 0; i <array.length; i++) {}
```

#### Using Decremental
```js
for (let i = 0; i <array.length; i--) {}
```

#### Cached Length
```js
for ( let i = 1, l = array.length; i <= l; i++ ) {}
```

Or

```js
let i = 0;
const max = array.length;
for(; i < max; i++) {}
```

Or

```js
let l = arr.length;
for (let x = 0; x < l; x++) {}
```

#### Var vs Let
```js
for (let i = 0; i <array.length; i++) {}
for (var i = 0; i <array.length; i++) {}
```

#### The Ugly For Loop
```js
for (let i=n; i-- != 0; ) {}
```

#### Function Call Loop
```js
for ( let i = 1; i <= array.length; i++ ) {}
```

#### Other Options
```js
for (let i=n; i >=0; i--) {}
for (let i=n; i--; ) {}
```

##### Performance Summary
```js
const iterations = 50000
const arraySize = new Array(iterations)
console.log("arraySize", + arraySize.length)

//for ++
console.time("++")
for (let i = 0; i < arraySize.length; i++) {}
console.timeEnd("++");

// for --
console.time("--")
for (let i = arraySize.length; i <0; i--) {}
console.timeEnd("--");

//var
console.time("var ++")
for (var i = 0; i <arraySize.length; i++) {}
console.timeEnd("var ++");

//var --
console.time("var --")
for (var i = arraySize.length; i <0; i--) {}
console.timeEnd("var --");

//cached lenth
console.time("cached ++")
let j = arraySize.length;
for (let i = 0; i < j; i++) {}
console.timeEnd("cached ++");

console.time("cached --")
let k = arraySize.length;
for (let i = k; i < 0; i--) {}
console.timeEnd("cached --");

//the ugly for loop
console.time("ugly for loop ")
for (let i=arraySize.length; i-- != 0; ) {}
console.timeEnd("ugly for loop ");

//function call Loop
console.time("function call Loop ")
for ( let i = 1; i <= arraySize.length; i++ ) {}
console.timeEnd("function call Loop ");

// option 1
console.time("option 1")
for (let i= arraySize.length; i >=0; i--) {}
console.timeEnd("option 1");

//option 2
console.time("option 2")
for (let i= arraySize.length; i--; ) {}
console.timeEnd("option 2");
```

##### Results

```js
arraySize 50000
++: 4.634ms
--: 0.038ms
var ++: 5.345ms
var --: 0.041ms
cached ++: 5.257ms
cached --: 0.044ms
ugly for loop : 6.868ms
function call Loop : 6.307ms
option 1: 3.130ms
option 2: 5.086ms
```

### Closing Notes
- `For`, `while` and `do-while` have close performance results. Neither of the loops is significantly faster or slower.
- `For-each` is ideal for functional codes.
- `For-in` is ideal for unspecified object properties. Avoid it when using array data.
- Be keen on the condition statement when using `while` to perform a loop.
- Nested loops are significantly slower; avoid them when a loop has a large number of iterations to perform.
- Decreasing the amount of work done per iteration and the number of loops increases loop performance.
- Performance is not the only thing that matters. Code readability and maintainability are key. Fewer lines of codes mean reduced performance overheads and a shorter development period.
- Choose a loop that fits your application model and makes sure they align with your requirements to get desirable results.

***Note***: The above performance results will vary depending on the browser, computer model and operating system you are using to test the loops.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
