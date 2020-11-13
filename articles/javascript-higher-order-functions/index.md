
Functional programming is a significant building block for JavaScript as a language. They are some of the common scrips that you will continuously use when building JavaScript applications. Functions set statements to perform tasks. Functions define a task, which you can call and execute whenever you want inside your program.

JavaScript treat a function as an object assigned to values to return a value. They have methods and properties, just like the other objects.

Unlike ordinary objects, a function can be called. A function can be passed as an argument assigned to a value and can be returned by another function. Functions are that fundamental that outside the "normal" functions, JavaScript has high order functions.

Higher-order functions are functions that take other functions as arguments or return functions as their outputs. Often referred to as a callback function. This is a concept that JavaScript uses a lot. Functions that are passed as an argument to another function are what we refer to as callback functions because that function calls it back.

In this guide, we learn about high order function. We will discuss and show you some of the come built-in JavaScript high order functions with examples. These include `filter`, `map`, `for each` and `reduce`.

### Array.prototype.filter

`filter()` allows you to filter things in an array. It is a method that returns an array. It creates a new array of elements. The elements have to pass a test provided by a callback function. The new array composes an input array being tested. This new array created by the `filter()` method takes all the elements that pass a callback function test.

Let's digest this information with examples.

Assume:
1. An array with domestic animals such as

```js
["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"]
```

We want to filter all domestic animals whose names have three-letter.

2. An array of adult ages.

```js
[{name: "Xavier", age: 19},
{name: "Alice", age: 21},
{name: "John", age: 14},
{name: "David", age: 22},
{name: "Amanda", age: 18},
{name: "Amy", age: 20},
{name: "Jesicca", age: 28},
{name: "Alex", age: 15}]
```

We want to filter adult ages 18 and older.

#### Example One: without `filter()` Method

##### Domestic Animals

```js
const Animals = ["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"];
const dAnimals = [];
// we could use a standard for loop
for (let i = 0; i < Animals.length; i++) {
  if (Animals[i].length == 3) {
    dAnimals.push(Animals[i])
  }
}
Or a for of loop
console.log(dAnimals);
```

##### Adult Ages

```js
const adults = [
{name: "Xavier", age: 19},
{name: "Alice", age: 21},
{name: "John", age: 14},
{name: "David", age: 22},
{name: "Amanda", age: 18},
{name: "Amy", age: 20},
{name: "Jesicca", age: 28},
{name: "Alex", age: 15}
];

let anAdult = [];
for(let i = 0; i < adults.length; i++) {
 if(adults[i].age >= 18)  {
    anAdult.push(adults[i]);
  }
}
console.log(anAdult);
```

The examples above log and filter the test as we told it to. However, these methods can get cumbersome. For example, with a big app that has a large number of adults to filter age or other adult elements. The examples are a bit lengthy and need a lot of code setup. We can compose this further using high order functions.

#### Example Two: Using High Order Functions

##### Domestic Animals

```js
const dAnimals = Animals.filter(function(animal) {
  if(animal.length == 3) {
    return true;
  }
});
console.log(dAnimals);
```

##### Adult Ages

```js
const anAdult = adults.filter(function(adult) {
  if(adult.age >= 18) {
    return true;
  }
});
console.log(anAdult);
```

We get the same results. But this time, our code is getting small and compact. No looping any more to iterate the input array to `anAdult.push(adults[i]);`

####  Example Three: Arrow Function

With ES6, it is unbelievable that we can compose this further using the arrow function.

##### Adult Ages

```js
const anAdult = adults.filter(adults => adults.age >= 18);
```

In just one line of code and we get the same results.

So how does `filter()` magically walk us to such satisfying results with just a few lines of code? `filter()` calls the passed callback once for every element being tested. `filter()` accepts the arguments of the callback function. This callback is what holds the value of the element being processed with the syntax below.

```js
let newArray = arr.filter(callback(currentValue[, index, [array]){
    //Return a new array element that passes the callback test
}[, thisArg]);
```

A filter callback function takes the following parameters:
- Element - (the current value) holds the value of the element being processed by the callback test.
- Index - holds the current index of the array element.
- Array object being tested.

Every element that passes the callback, `filter()` return a new array for these elements. That means if no element passes the test, the array return value will be empty. Elements that do not pass the callback test are skipped and not included in the new filtered array.

### Array.prototype.reduce

It is another built-in JavaScript high order function. It uses the `reducer` as a callback function to execute each element of the input array.

The callback takes two parameters, namely:
- Accumulator
- Current value

It doesn't return a new array; instead, it uses a provided callback called a `reducer`. When returned, it reduces the input array into one single value from the reduction. Reducer callback makes this method a high order function.

`reduce()` accept two input parameters
- A callback function (the reducer function).
- Optional InitialValue.

```js
array.reduce(callback[, initialValue])
```

The `reducer` callback function accepts two mandatory arguments

- Accumulator - accumulates the previously returned value returned by the last callback invocation. I.e., the initialValue passed to `reduce()` method.
- Current value - the value of the current element being processed by the callback.

```js
array.reduce(callback( accumulator, currentValue[, index[, array]){
  // return result from executing something for accumulator or current Value
}[, initialValue]);
```

So have a look, assume an array of numbers:

```js
[5, 6, 7, 8, 9, 10]
```

Imagine getting the sum of these array elements. We can use loops are we demonstrated in the `filter()` method, and we will get the total sum of this array. However, we can opt to optimize our code with just a few lines using `reduce()`. This will make our code clean and less verbose.

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

It is important to note, for the first invoked callback, the value of the accumulator is the value of the first element in the input array. And the index of the first processed array element is 1 and the value 6, which is the second element. Think about it. It actually makes sense. If you look back to callback syntax, the accumulator takes the first element as the initial value. If this didn't happen, the first value of the array would be counted two times.

Using the optional `InitialValue` argument, we can pass an `InitialValue` value as the second argument to `reduce()`.

```js
const total = sum.reduce((accumulator, currentValue) => {
return accumulator + currentValue;
},10);
console.log(total);
// we get 55
```

In this case, we assigned `InitialValue` as 10. The callback function will be called six times. And the value will be passed as the first callback. The accumulator will hold the last returned callback value; this value will be the initial value 10, which we have passed to `reduce()` as a second argument.

| Callback  | Accumulator | CurrentValue | CurrentIndex | returned value |
|-----------|-------------|--------------|--------------|----------------|
| 1st call  | 10          | 5            | 0            | 10             |
| 2nd call  | 10          | 6            | 1            | 15             |
| 3rd call  | 15          | 7            | 2            | 22             |
| 4th call  | 22          | 8            | 3            | 38             |
| 5th call  | 38          | 9            | 4            | 45             |
| 6th call  | 45          | 10           | 5            | 55             |

`reduce()` will return the last invoked callback. In this case, 55.

We can conclude that, the first callback would take the first element's value if no initial value passed. If the `InitialValue` is passed, the callback will take the `InitialValue` as the first callback.

### Array.prototype.map

The `map()` method creates a new array by calling a callback function. It executes a provided callback function once for every element provided in the input array. The callback function is applied to all the elements of the input array.

Let’s digest this with examples.

Suppose in our previous array of `[2, 4, 89, 0.67, 7.47, 20]`, we want to multiply every element, let's say `4`. This is how we can multiply the elements without a high order function.

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

Suppose in our animal array example we want to return all the names as uppercase. `map()` will accept a callback as a mandatory argument and transform each element to Uppercase form. `map()` will take the uppercased elements and return a new array

```js
const Animals = ["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"];
const upperCasedAnimals = Animals.map((element) => element.toUpperCase());
console.log(upperCasedAnimals);
// new array ['CAT', 'DOG', 'COW', 'GOAT', 'SHEEP', 'DONKEY', 'PIG', 'HORSE']
```

In the example above `map()` creates a new array. It takes the passed callback as an argument. In this case, the argument element will be applied to each element in the input array. `map()` build a new array from the retuned callback values.

### For Each

It executes a provided callback function once for each element in the input array in ascending order. `For each` reference to a callback function once. The callback function calls every member of the input array.

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
console.log(dAnimals);
```

#### Converting a `for` Loop to a High Order Function Using `for each`

```js
const Animals = ["cat", "dog", "cow" ,"goat", "sheep", "donkey", "pig", "horse"];
Animals.forEach((anim) =>{
  console.log(anim)
})
```

### Final Notes

JavaScript is a functional program. You may have used or applied a high-order function in a program without even knowing you are actually using a high order function. High order functions are regular functions with the ability to accept other function arguments or return a function as an output.

If you have ever written a function that takes another function as an argument

![image title](/articles/javascript-higher-order-functions/function-as-an-argument.png)

Or a function that returns another function,

![image title](/articles/javascript-higher-order-functions/value-of-another-function.png)

you have actually applied a concept of high order function.
