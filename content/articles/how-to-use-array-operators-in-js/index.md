---
layout: engineering-education
status: publish
published: true
url: /how-to-use-array-operators-in-js/
title: How to use Array Operators in JavaScript
description: This article will be an introduction to JavaScript arrays, properties of JavaScript arrays, and operations executed on JavaScript arrays.
author: kennedy-mwangi
date: 2020-12-04T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-use-array-operators-in-js/hero.jpg
    alt: Array operators in JavaScript example
---
Arrays are list-like objects used for storing elements in a program. Since JavaScript is not statically typed, an array can hold different types of data.
<!--more-->
#### Prerequisites
It's recommended that the reader have the following background knowledge to follow along with this tutorial:
- Have [Node.js](https://nodejs.org/en/) installed in your computer.
- Have some basic knowledge of JavaScript.

### What we will cover
- [Introduction into JavaScript arrays](#introduction-into-javascript-arrays).
- [Properties of JavaScript arrays](#properties-of-javascript-arrays).
- [Operations on JavaScript arrays](#operations-on-javascript-arrays).

### Introduction into JavaScript arrays
For instance, an array can have integers, strings, and floats at the same time. The number of elements stored in an array is not fixed; it's upon the programmer's preference.

### Properties of JavaScript arrays
- **Length**: It indicates the number of elements in a particular array.

Consider the following array:

```javascript
const fruits = ["mangoes","lemons","avocados"];
```

If we want to know the number of fruits stored in the fruits array we have to access the length property.

```javascript
console.log(fruits.length);
```
Output

```bash
    3
```

Since there are three elements in the fruits array, the output shall be three.

- **Constructor**: It indicates the function that created the array object. Using our previous array of fruits, we can check the constructor property.

```javascript
console.log(fruits.constructor);    
```

Output:

```bash
[Function: Array]
```

`[Function: Array]` is the default constructor value when creating arrays in JavaScript.

- **Prototype**: It allows us to add our own custom operations and properties to the arrays. For example, considering our fruits array, we can opt to implement a function to capitalize each element's first letter. Since there is no such pre-built operation in JavaScript, we can use `prototype`.

```javascript
Array.prototype.toUCase = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i][0].toUpperCase() + this[i].slice(1);
  }
};

//we execute the operation on our array
fruits.toUCase();

console.log(fruits);
```

Output:

```bash
['Mangoes','Lemons','Avocados']
```

### Operations on JavaScript arrays
In JavaScript, arrays are equipped with various operations that make them more usable. We shall discuss the commonly used operations on arrays.

- **concat()**: this joins an element or an array to another array. It then returns a new copy of the array with the joined elements.

Let's examine this with an example:

```javascript
const initial_fruits = ["mangoes","avocados"];

//concat a single fruit.
let new_fruits = initial_fruits.concat("pineapples");
console.log(new_fruits);

//concat an array of fruits
new_fruits = new_fruits.concat(["lemons","oranges"])
console.log(new_fruits);
```

Output:

```bash
['mangoes','avocados','pineapples']
['mangoes','avocados','pineapples','lemons','oranges']
```

- **copyWithin()**: It copies array elements to and from a given target, start, and end index. The three are passed as parameters. It starts copying at a given target with data from the start index passing through until it reaches data of the last index. The last index is exclusive.

```javascript
const initial_fruits = ["mangoes","avocados","lemons","oranges"];
let new_fruits = initial_fruits.copyWithin(2,1,3);
console.log(new_fruits);
```

Output:

```bash
['mangoes','avocados','avocados','lemons']
```

The target is index 2 so it shall start at index 2. It will then copy the data from index 1 to index 3 while still preserving the length of the array.

- **entries()**: It is used to get an iterator object of a key-value pair. The key and the value are usually destructed from the array returned. The key is the index of the element in the array whereas the value is the actual element.

```javascript
const fruits = ["mangoes","lemons"];

for(const [key,value] of fruits.entries()){
    console.log(`key ${key} and its value is ${value}`);
};
```

Output:

```bash
key 0 and its value is mangoes
key 1 and its value is lemons
```

- **every()**: It's used when iterating through all array elements to check if they all meet a given condition. Using this operation, you are guaranteed that all elements of the array will be checked.

```javascript
const fruits = ["mangoes","lemons"];
let result = fruits.every(fruit => fruit[0] === "m" );
console.log(result);
```

Output:

```bash
false
```

From the example above, we want to check if all the fruits in the array start with the letter `m`. So, we implement the `every()` operation on the array. The output shall be false because `lemons` do not satisfy the condition defined.

- **fill()**: It's used to enter a static value into a given array. To use this method, you will have to instantiate the array with the `new Array()` method. The operation receives three parameters, that are the value, start index, and the end index.

The end index is not inclusive, meaning it does not consider that index. It just stops there. Considering that we have created an array of fruits and want to fill it with different fruits at different indexes, we can use the `fill()`.

```javascript
const fruits = new Array(4);
fruits.fill('mangoes',0,1);
fruits.fill('lemons',1,2);
fruits.fill('banana',2,3);
fruits.fill('pineapples',3,4);
console.log(fruits);
```

Output:

```bash
  ['mangoes','lemons','banana','pineapples']
```

As we see above, we instantiate the fruits array with the `new Array()` method and pass in the number of elements we'd like it to have. From there, we fill the array with values using  `fill()` considering the start and end index.

- **filter()**: It creates a new array with elements that meet a particular condition. The condition is placed on all the array elements so that only elements that pass the condition proceed.

For example, in our fruits array, we may want to have an array of fruits with only those that have six letters, here is where we apply `filter()`.

```javascript
let fruits = ["mangoes","lemons",'banana','pineapples'];
let new_fruits = fruits.filter(fruit => fruit.length === 6);
console.log(new_fruits);
```

Output:

```bash
["lemons","banana"]
```

The `new_fruits` array comprises of `lemons` and `banana` since they both have six letters each.

- **find()**: It returns the element of an array that is the first to meet a particular condition.

For instance, if we need to find which fruit is the first to have six letters in the array, we can use the `find()` method.

```javascript
let fruits = ["mangoes","lemons","banana","pineapples"];
let fruit = fruits.find(fruit => fruit.length === 6);
console.log(fruit);
```

Output:

```bash
lemons
```

Since `lemons` is the first fruit to have six letters, the `find()` method returns it.

- **findIndex()**: It returns the index of the first element to meet a particular condition. If the element we are searching for has more than one occurrence, it returns the first index. Considering the previous example, if we want to find the index of the first fruit to have six letters, we use `findIndex()`.

```javascript
let fruits = ["mangoes","lemons","banana","pineapples"];
let index = fruits.findIndex(fruit => fruit.length === 6);
console.log(index);
```

Output:

```bash
1
```

Since lemons was the first fruit to meet the condition, its index will be returned.

- **forEach()**: It's used to execute a function or a callback for each element of an array. It does not change the array meaning that it always returns undefined.

With our previous example, we may intend to `console.log` all the fruits and we can use `forEach()` and execute it as a callback.

```javascript   
let fruits = ["mangoes","lemons","banana"];
fruits.forEach(fruit => console.log(fruit));
```

Output:

```bash
mangoes
lemons
banana
```

- **from()**: It's used to come up with a new array from an iterable object such as an array or a string. For example if we have an array of strings and from there we want to come up with the same fruits but now capitalized, we can use the `from()` method. The method is usually executed on the `Array` instance.

```javascript
let fruits = ["mangoes","lemons","banana"];
let new_fruits = Array.from(fruits,fruit => fruit.toUpperCase());
console.log(new_fruits);
```

Output:

```bash
['MANGOES','LEMONS','BANANA']
```

The `from()` method is executed on the Array instance and receives the iterable object that in this case is `fruits` and a map function. The map function capitalizes each of the elements in the array.

- **includes()**: It's used to check if a particular array contains the specified element. For example if we want to check if the fruits array contains lemons, we can simply use the `includes()` method. The method returns a `Boolean`.

```javascript
let fruits = ["mangoes","lemons","banana"];
let result = fruits.includes("avocado");
console.log(result);
```

Output:

```bash
false
```

Since we don't have avocado as an element in the fruits array, the result shall hold `false`.

- **indexOf()**: It's used in searching the index of the element passed in. For example, if we want to search for bananas in our fruits array and get the index, we can use the `indexOf()` method. If we don't find the element in the array it shall return `-1`.

```javascript
let fruits = ["mangoes","lemons","bananas"];
let index = fruits.indexOf("bananas");
console.log(index);
```

Output:

```bash
2
```

- **isArray()**: Is used to check whether the object passed is an array. It's important to note that even though strings are treated as arrays in JavaScript, the `isArray()` shall return `true` if and only if it's an array, otherwise it shall return `false`.

Considering our previous example, we can illustrate this.

```javascript
let _string = "mangoes,lemons,bananas";
let _array = ["mangoes","lemons","bananas"];
console.log(Array.isArray(_string));
console.log(Array.isArray(_array));
```

Output:

```bash
false
true
```

- **join()**: It's used to join all of the data in the array into a string. For example, if we wanted to convert our array of fruits into a single string, we use the `join()` method.

```javascript
let fruits = ["mangoes","lemons","bananas"];
let fruits_string = fruits.join();
console.log(fruits_string);
```

Output:

```bash
mangoes,lemons,bananas
```

- **keys()**: It returns an iteration array containing the keys of the passed array. The method yields an array and hence you use a `for loop` to iterate over the keys. For example, if we want to show all the keys of our fruits array, we use the `keys()` method.

```javascript
let fruits = ["mangoes","lemons","bananas"];

for(const key of fruits.keys()){
    console.log(`key ${key}`)
};
```

Output:

```bash
key 0
key 1
key 2
```

- **lastIndexOf()**: It usually searches for the index of an element in an array and returns the position of that element. If the item to search occurs more than once, it returns the position of the last occurrence.

It does not receive a function but receives a value instead. Assume that our fruits array has duplicates elements and we want to find the index of the last occurrence of bananas, here we apply the `lastIndexOf()` method.

```javascript
let fruits = ["mangoes","lemons","bananas","apples","bananas"];
let last_index = fruits.lastIndexOf("bananas");
console.log(last_index);
```

Output:

```bash
4
```

Since we have two elements of bananas in the array, it shall pick the index of the last one.

- **map()**: It performs a transformation on each element of the array resulting in the creation of a new array. Let's assume we wanted to mutate our array such that each element has its length appended at the end. We make use of the `map()` method.

```javascript
let fruits = ["mangoes","lemons","bananas"];
let new_fruits = fruits.map(fruit => `${fruit}${fruit.length}`);
console.log(new_fruits);
```

Output:

```bash
['mangoes7','lemons6','bananas7']
```

- **pop()**: It is used to remove the last element of an array and returns the removed element. Using our example, we may want to remove the last fruit from the array. For this purpose, we have to use the `pop()` method.

```javascript
let fruits = ["mangoes","lemons","bananas"];
let last_element = fruits.pop();
console.log(last_element);
console.log(fruits);
```

Output:

```bash
bananas
['mangoes','lemons']
```

- **push()**: It adds an element to the end of the array and returns the new length of the array. With our example, if we have a new fruit we'd like to add into the array, we can use the `push()` method.

```javascript
let fruits = ["mangoes","lemons","bananas"];
let new_length = fruits.push("pineapples");
console.log(new_length);
console.log(fruits);
```

Output:

```bash
4
['mangoes','lemons','bananas','pineapples']
```

- **reduce()**: It reduces the elements of an array to a single value from left to right. The method receives two parameters that represent two values to be reduced. In the function to be executed, you specify the operation to be carried out and the starting value. Using our previous example, we can reduce the array of fruits from left to right and gain a single string using `reduce().`.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let reduced = fruits.reduce((fruit_a,fruit_b) => fruit_a + fruit_b,'');
console.log(reduced);
```

Output:

```bash
mangoeslemonsbananas
```

- **reduceRight()**: This works similar to `reduce()`, only that it reduces from the right to the left. The parameters received and the function to be executed are defined similarly. Using our previous example, we can reduce the array of fruits from the right achieving a different string.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let reduced_right = fruits.reduceRight((fruit_a,fruit_b) => fruit_a + fruit_b,'');
console.log(reduced_right);
```

Output:

```bash
bananaslemonsmangoes
```

- **reverse()**: It reverses the order of elements in an array. The new array returned starts with the elements that were at the end in the original array. From the previous example, we can reverse the fruits such that we have an array that starts with the last element of the fruits array using `reverse()`.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let reversed_fruits = fruits.reverse();
console.log(reversed_fruits);
```

Output:

```bash
['bananas','lemons','mangoes']
```

- **shift()**: It is the opposite of `pop()`. `shift()` removes an element at the beginning of an array and returns that element. For example, in our fruits array, we can remove the first element of the array and get the element removed.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let removed_element = fruits.shift();
console.log(removed_element);
console.log(fruits);
```

Output:

```bash
mangoes
['lemons','bananas']
```

- **slice()**: It selects some portions of an array based on the start and end index and returns the new array with those portions. If the start and end index are not specified, it returns a replica of the original array.

Otherwise if the start index is specified and the end index is not specified, it returns an array from the start index all the way to the end of the array. The end index is not inclusive, its exclusive. Based on our fruits array, we can make a new array from the second index to the third index using `slice()`. We shall specify the third index as `3` because its exclusive.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let new_fruits = fruits.slice(1,3);
console.log(new_fruits);
```

Output:

```bash
['lemons','bananas']
```

- **some()**: It checks if any of the data in the array meets a particular condition. For our fruits array we can check if there are some of the fruits that have eight letters. The `some()` method receives a function specifying the condition. If there are some, it shall return `true` otherwise `false`.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let exists = fruits.some(fruit => fruit.length === 8);
console.log(exists);
```

Output:

```bash
false
```

- **sort()**: This sorts the data inside an array. It receives two parameters that represent the data to be sorted. The function to be executed for sorting depends with the problem at hand.

For example, using our fruits array we may decide to order them according to the number of letters in ascending order using `sort()`.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let sorted_fruits = fruits.sort((fruit_a,fruit_b) => fruit_a.length - fruit_b.length);
console.log(sorted_fruits);
```

Output:

```bash
['lemons','mangoes','bananas']
```

- **splice()**: It removes elements from an array, replacing their positions with other elements of the array. When calling the `splice()`, you specify the start index and the `deleteCount`.

If you omit the `deleteCount`, all of the elements in the array will be deleted. In our example, we delete two elements i.e. the `deleteCount`, starting from index 0 i.e. the start index.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let spliced_fruits = fruits.splice(0,2);
console.log(spliced_fruits);
console.log(fruits);
```

Output:

```bash
['mangoes','lemons']
['bananas']    
```

- **toString()**: It converts the target array to a string and returns the result. In our example, we can decide to convert our fruits array into a single string using `toString()`.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let _string = fruits.toString();
console.log(_string)
```

Output:

```bash
mangoes,lemons,bananas
```

- **unshift**: It is the opposite of `push()`. `unshift()` adds a new element to the beginning of the array and returns the new length. In our example, we can decide to push another fruit to the beginning of the array.

```javascript
let fruits = ['mangoes','lemons','bananas'];
let new_length = fruits.unshift('apples');
console.log(new_length);
console.log(fruits);
```

Output:

```bash
4
['apples','mangoes','lemons','bananas']
```

### Conclusion
Whether you are writing a simple program or solving a complex problem in JavaScript, you will always find it necessary to use arrays.

In this article we have covered an introduction to JavaScript arrays, properties of JavaScript arrays, and operations executed on JavaScript arrays.

You can access the code from [here](https://github.com/mwangiKibui/array-operators-in-js/tree/main).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
