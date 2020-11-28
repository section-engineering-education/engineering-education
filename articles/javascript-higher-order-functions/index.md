
Functional programming is a significant building block for JavaScript as a language. They are some of the common scrips that you will continuously use when building JavaScript applications. Functions set statements to perform tasks. Functions define a task, which you can call and execute whenever you want inside your program.

JavaScript treats a [function as an object](https://www.dofactory.com/javascript/function-objects) assigned to values to return a value. They have methods and properties, just like the other objects. Unlike ordinary [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects), a function can be;

- Called.
- Passed as an argument to another function.
- Assigned to a variable as a value.
- Be returned by another function.

Functions are fundamental that outside the "normal" functions, JavaScript has high order functions.

A high order function accepts another function as an argument or returns a function as its output. The concept is commonly referred to as a callback function. A function that takes another function as its argument is what we refer to as a callback function because it calls back that function.
Here is a basic example.
```js
// create a function
function sayName(name, callback) {
console.log("Hello" + " " + name);
callback();
}
// callback function
function callMe() {
console.log("I am a callback function");
}
// passing function as an argument
sayName("John Doe", callMe);
```
Output
```
Hello John Doe
I am a callback function
```
In the example above, `callMe()` is a callback function because it is an argument of `sayName()`. `sayName()` calls it back.

In this guide, we learn about the high order function. We will discuss and show you some of the common built-in JavaScript high order functions with examples. These include `filter`, `map`, `for each`, and `reduce`. To get along with this guide, prior knowledge of [JavaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) and [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) will be important.

### Array.prototype.filter

`filter()` allows you to filter things in an array. It is a method that returns a new array of elements. A callback function tests each element in the input array. The `filter()` method composes all the elements that pass the callback test and returns a new array.

Let's digest this information with examples.

Assume:
1. An array of domestic animals such as

```js
["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"]
```

We want to filter all domestic animals whose names have three-letter.

2. An array of adult ages.

```js
[
  { name: "Xavier", age: 19 },
  { name: "Alice", age: 21 },
  { name: "John", age: 14 },
  { name: "David", age: 22 },
  { name: "Amanda", age: 18 },
  { name: "Amy", age: 20 },
  { name: "Jesicca", age: 28 },
  { name: "Alex", age: 15 },
];

```

We want to filter adults who are 18 years and older.

#### Example One: without `filter()` method
We will perform a filter operation from the above arrays without using a higher-order function.
##### Domestic Animals
Here we have an array `Animals`, filter all the animals whose names has three letters.
```js
const Animals = ["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"];
const dAnimals = [];
// we could use a standard for loop
for (let i = 0; i < Animals.length; i++) {
  if (Animals[i].length == 3) {
    dAnimals.push(Animals[i])
  }
}
console.log(dAnimals);

// [ 'cat', 'dog', 'cow', 'pig' ]
```

##### Adult Ages
Filter all the adults whose their age is 18 years and above.
```js
const adults = [
  { name: "Xavier", age: 19 },
  { name: "Alice", age: 21 },
  { name: "John", age: 14 },
  { name: "David", age: 22 },
  { name: "Amanda", age: 18 },
  { name: "Amy", age: 20 },
  { name: "Jesicca", age: 28 },
  { name: "Alex", age: 15 },
];


let anAdult = [];
for(let i = 0; i < adults.length; i++) {
 if(adults[i].age >= 18)  {
    anAdult.push(adults[i]);
  }
}
console.log(anAdult);

/*[
  { name: 'Xavier', age: 19 },
  { name: 'Alice', age: 21 },
  { name: 'David', age: 22 },
  { name: 'Amanda', age: 18 },
  { name: 'Amy', age: 20 },
  { name: 'Jesicca', age: 28 }
]*/

```

The examples above perform the test as we intended. However, these methods can get cumbersome when the number of elements being processed increases. The codes are a bit lengthy and need a lot of code setup. We can compose this further using high order functions.
#### Example Two: Using High Order Functions
We will perform the filter operation using `filter()` as a high order function.

##### Domestic Animals

```js
const dAnimals = Animals.filter(function(animal) {
  if(animal.length == 3) {
    return true;
  }
});
console.log(dAnimals);

// [ 'cat', 'dog', 'cow', 'pig' ]
```

##### Adult Ages

```js
const anAdult = adults.filter(function(adult) {
  if(adult.age >= 18) {
    return true;
  }
});
console.log(anAdult);

/*[
  { name: 'Xavier', age: 19 },
  { name: 'Alice', age: 21 },
  { name: 'David', age: 22 },
  { name: 'Amanda', age: 18 },
  { name: 'Amy', age: 20 },
  { name: 'Jesicca', age: 28 }
]*/
```

We get the same results. But this time, the code is getting small and compact. No looping any more to iterate the input array. `filter()` calls the passed callback to each element being tested. `filter()` accepts the arguments of the callback function. The callback holds the value of the element being processed with the syntax below.

```js
let newArray = arr.filter(callback(currentValue[, index, [array]){
    //Return a new array element that passes the callback test
}[, thisArg]);
```

A filter callback function takes the following parameters:
- currentValue - (the current value) holds the value of the element being processed by the callback test.
- Index - holds the current index of the array element.
- Array - an object of the array being tested.

####  Example Three: Covert the High Order Function to an Arrow Function

With ES6, we can compose this further using the arrow function. It is an abbreviated way to write compact functions.

Here is a basic example of an arrow function.

##### Basic Syntax
```js
(param1, paramN) => expression
```
##### Basic Example
```js
function sum(x, y) {
  return x + y;
}
```
Replicate the above example using the arrow function.
```js
const sum = (x, y) => x + y;
```
The arrow function uses a different syntax compared to the regular function. However, they do not change the logic. They make the code compact and less verbose. Here is a [guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) that will help you understand the arrow function concept.

Let's replicate `filter()` using arrow function.

```js
const adults = [
  { name: "Xavier", age: 19 },
  { name: "Alice", age: 21 },
  { name: "John", age: 14 },
  { name: "David", age: 22 },
  { name: "Amanda", age: 18 },
  { name: "Amy", age: 20 },
  { name: "Jesicca", age: 28 },
  { name: "Alex", age: 15 },
];

const anAdult = adults.filter(adults => adults.age >= 18);

/*[
  { name: 'Xavier', age: 19 },
  { name: 'Alice', age: 21 },
  { name: 'David', age: 22 },
  { name: 'Amanda', age: 18 },
  { name: 'Amy', age: 20 },
  { name: 'Jesicca', age: 28 }
]*/
```

In just one line of code and we get the same results.

So how does `filter()` magically walk us to such satisfying results with just a few lines of code? Every element that passes the callback, `filter()` return a new array for these elements. That means, if no element passes the test, the array return value will be empty. An element that fails the callback test is skipped and not included in the new filtered array.

### Array.prototype.reduce

It is another built-in JavaScript high order function. It uses `reducer` as a callback function to execute each element of the input array.

The callback takes two parameters, namely:
- Accumulator
- Current value

It doesn't return a new array; instead, it uses a provided callback called `reducer`. When returned, it reduces the input array into a single value. Reducer callback makes this method a high order function.

`reduce()` accept two input parameters
- A callback function (the reducer function).
- Optional InitialValue.

```js
array.reduce(callback[, initialValue])
```

The `reducer` callback function accepts two mandatory arguments

- Accumulator - accumulates the previously returned value returned by the last callback invocation.
- [Current value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) - the value of the current element being processed by the callback.

```js
array.reduce(callback( accumulator, currentValue[, index[, array]){
  // return result from executing something for accumulator or current Value
}[, initialValue]);
```

So have a look, assume an array of numbers:

```js
[5, 6, 7, 8, 9, 10]
```

Imagine getting the sum of these array elements. We can use loops as we demonstrated in the `filter()` method, and we will get the total sum of this array. However, we can opt to optimize the code with just a few lines using `reduce()`. This will make the code clean and less verbose.

Let’s demonstrate with examples.

#### Using Loops (No High Order Function)

```js
const sum = [5, 6, 7, 8, 9, 10];
let total = 0;
for(let i = 0; i < sum.length; i++) {
  total = total + sum[i];
}
console.log(total);
// we get 45
```
In the example above, `i` loops through the provided array elements and returns their sum.
#### Using High Order Function `reducer`

```js
const sum = [5, 6, 7, 8, 9, 10];
const total = sum.reduce((accumulator, currentValue) => {
return accumulator + currentValue;
});
console.log(total);
// we still get 45
```

The callback function will be called five times. The accumulator will hold the last returned callback value. This value will be the next callback initial value.

| Callback  | Accumulator | CurrentValue | CurrentIndex | returned value |
|-----------|-------------|--------------|--------------|----------------|
| 1st call  | 5           | 6            | 1            | 11             |
| 2nd call  | 11          | 7            | 2            | 18             |
| 3rd call  | 18          | 8            | 3            | 26             |
| 4th call  | 26          | 9            | 4            | 35             |
| 5th call  | 35          | 10           | 5            | 45             |

`reduce()` will return the last invoked callback. In this case, 45

It is important to note, for the first callback invocation, the value of the accumulator is the value of the first element in the input array. And the index of the first processed array element is 1, and the value 6. Think about it. It actually makes sense. If you look back to callback syntax, the accumulator takes the first element as the `InitialValue`. If that didn't occur, `reduce()` would calculate the 1st element twice.

Using the optional `InitialValue` argument, we can pass an `InitialValue` value as the second argument to `reduce()`.

```js
const total = sum.reduce((accumulator, currentValue) => {
return accumulator + currentValue;
},10);
console.log(total);
//  we get 55
```

In this case, we assigned `InitialValue` as 10. The callback function will be called six times. And the `InitialValue` will be passed as the first callback. The accumulator will hold the last returned callback value. This value will be the `InitialValue` 10, which we have passed to `reduce()` as a second argument.

| Callback  | Accumulator | CurrentValue | CurrentIndex | returned value |
|-----------|-------------|--------------|--------------|----------------|
| 1st call  | 10          | 5            | 0            | 10             |
| 2nd call  | 10          | 6            | 1            | 15             |
| 3rd call  | 15          | 7            | 2            | 22             |
| 4th call  | 22          | 8            | 3            | 38             |
| 5th call  | 38          | 9            | 4            | 45             |
| 6th call  | 45          | 10           | 5            | 55             |

`reduce()` will return the last invoked callback. In this case, 55.

We can conclude that the first callback would take the first element's value if no initial value passed. If the `InitialValue` is passed, the callback will take the `InitialValue` as the first callback.

### Array.prototype.map

The `map()` method composes a new array by returning the results of a callback function. It executes a provided callback function once for every element provided in the input array. The callback function is applied to all the elements of the input array.

Let’s digest this with examples.

Example one:

Suppose we have an array `[2, 4, 89, 0.67, 7.47, 20]`; we want to multiply every element, let's say by `4`. This is how we can multiply the elements without a high order function.

```js
const inputArray = [2, 4, 89, 0.67, 7.47, 20];
const newArray = [];
for(let i = 0; i < inputArray.length; i++) {
  newArray.push(inputArray[i] * 4);
}
console.log(newArray);
// new array [8, 16, 356, 2.68, 29.88, 80]
```

We can pass a callback as an argument to `map()`. `map()` will multiply all the input elements and return a new array result. With just one line of code, we can use `map()` to get these results as shown in the example below:

```js
const inputArray = [2, 4, 89, 0.67, 7.47, 20];
const newArray = inputArray.map(element => element * 4);
console.log(newArray);
// new array [8, 16, 356, 2.68, 29.88, 80]
```

Example two:

Suppose in our animals array example we want to return all the names as uppercase. `map()` will accept a callback as a mandatory argument and transform each element to Uppercase form. `map()` will take the uppercased elements and return a new array.

```js
const Animals = ["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"];
const upperCasedAnimals = Animals.map((element) => element.toUpperCase());
console.log(upperCasedAnimals);
// new array ['CAT', 'DOG', 'COW', 'GOAT', 'SHEEP', 'DONKEY', 'PIG', 'HORSE']
```

In the examples above, `map()` returns a new array. `map()` build a new array from the retuned callback values.

### For Each

It executes a provided callback function once for each element in [ascending order](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).  `For each` reference to a callback function once.

`For each` takes one mandatory callback function. The function will be called once in each element in ascending order.

The callback takes three Parameters:
- Current value - a mandatory parameter that holds the current element value in the array.
- Index - the array index of the current element array position.
- Array - an optional parameter that holds a complete array from where `for each` was called.

Syntax:

```js
array.forEach(callback (currentValue, index, array) {
  // statement
}[thisArg]);
```

For example:
#### A `for` loop

```js
const Animals = ["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"];
for (let i = 0; i < Animals.length; i++) {
    console.log(Animals[i]);
}

/*
cat
dog
cow
goat
sheep
donkey
pig
horse
*/
```

#### Converting a `for` Loop to a High Order Function Using `for each`

```js
const Animals = ["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"];
Animals.forEach((anim) =>{
  console.log(anim)
})

/*
cat
dog
cow
goat
sheep
donkey
pig
horse
*/
```

### Final Notes

JavaScript is a functional program. You may have used or applied a high-order function in a program without realizing you are using a high order function. High order functions are regular functions with the ability to accept other function arguments or return a function as an output.

If you have ever written a function that takes another function as an argument,

![image title](/articles/javascript-higher-order-functions/function-as-an-argument.png)

Or a function that returns another function,

![image title](/articles/javascript-higher-order-functions/value-of-another-function.png)

you have actually applied a concept of high order function.

I hope this guide helps you understand high order functions and replicate that concept in your programs.
