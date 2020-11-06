---
layout: engineering-education
status: publish
published: true
url: /engineering-education/list-transformations-js/
title: List transformations in JavaScript
description: This tutorial guides
author: geoffrey-mungai
date: 2020-10-01T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/list-transformations-js/hero.jpg
    alt: image build a Jekyll site
---
In this tutorial, we will be looking at creating new objects and arrays from existing ones. We will look at creating nested data structures, looping, and destructuring them. We will also look at transforming data structures by passing them through functions.
<!--more-->
### Prerequisites

To follow through with this tutorial, you are required to know JavaScript [objects and arrays](https://www.section.io/engineering-education/object-arrays-destructuring/).

By the end of this tutorial, you will be able to:
- Nest objects and arrays.
- Loop through the nested data structures.
- Destructure nested data structures.
- Transform objects and arrays using underscore.js.

## Step 1 -- Nesting objects and arrays

Data structures can be nested to avoid the declaration of many variables. Multiple objects and/or arrays can be held by a single variable and can be accessed using [dot notation and bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors).
```javascript
const cars = {
    'brands': [
        {
            name: "Ford",
            origin: "USA"
        },
        {
            name: "Toyota",
            origin: "Japan"
        }
    ]
}
```
We create an object `cars` and nest an array `brands` inside it. We also add 2 objects inside the `brands` array.
Nesting can also be done using either the dot notation or square bracket notation where applicable.
```javascript
const cars = {};

cars.brands = [];

cars.brands.push({
  name: "Ford",
  origin: "USA"
});
cars.brands[1] = {
  name: "Toyota",
  origin: "japan"
};
```
The above code:
1. Creates an object `cars`.
2. Creates an empty list `brands` inside the `cars` object using dot notation.
3. Using the [`push()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method, adds an object with the properties `name` and `origin` inside `brands`.
4. Using the square notation adds another object at index 1.

### Accessing nested data structures

We can access the first item of the nested array `brands` above using the bracket notation as shown below:
```javascript
var car1 = cars.brands[0];

console.log(car1); //{ name: "Ford", origin: "USA"}
```

We can also access the `name` property of the first object of the `brands` array using the dot notation.
```javascript
var car1Name = cars.brands[0].name;

console.log(car1Name); //Ford
```
### Looping through nested arrays using a `for()` loop

Let us loop through all the objects in the nested array `brands` we created earlier.
```javascript
function allCars(brands){
	for (let i = 0; i < brands.length; i++){
    console.log(brands[i])
	};
};

allCars(cars.brands);
//{ name: 'Ford', origin: 'USA' }
//{ name: 'Toyota', origin: 'japan
```
In the code above:
1. We declare a function `allCars()` with a parameter `brands`.
2. Inside it, we create a [`for()` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) that loops through `brands` and logs them.
3. We call the function `allCars()`and pass an argument `cars.brands`.

### Accessing nested objects properties using a `for()` loop

We can get common properties in nested objects using a for loop. Let us log all the `name` properties of the nested brand objects.

```javascript
function names(brands){
    for (var i = 0; i < brands.length; i++){
        console.log(brands[i].name)
    };
};

names(cars.brands);
//Ford
//Toyota
```
In the above code:
1. We declare a function `names()` with a parameter `brands`.
2. We create a for loop that logs each `name` property of the nested objects.
3. We then call the `names()` function and pass an argument `cars.brands`.

### Looping through nested objects properties using a `for ...in` loop

If we want to get all the properties of a nested object, we can use a [`for ...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop. Let's loop through all the properties of the nested `brands` array.

```javascript
function everything (brands){
    for(var i =0; i< brands.length; i++){
        for (var property in brands[i]){
            console.log(brands[i][property])
        }
    }
};

everything(cars.brands);
//Ford
//USA
//Toyota
//Japan
```
In the above code:
1. We declare a function `everything()` with a parameter `brands`.
2. Inside `everything()`, we create a [`for()` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) that loops through all the items in the `brands` array.
3. Inside the `for()` loop, we create a [`for ...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop that loops through all the object properties.
The for-in loop, assigns each [enumerable property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) of the object to the variable `key` and then logs it.
4. We call the function `everything()` and pass an argument `cars.brands`.

### Destructuring a nested data structure

Destructuring can be used to extract data from nested objects and arrays. We can extract the two `brands` objects we created earlier and assign them to new variables.
```javascript
const {
  brands: [
      brand1,
	  brand2
	]
} = cars;

console.log(brand1, brand2); //{name: 'Ford', origin: 'USA'} {name: 'Toyota', origin: 'Japan'}
```
We can also extract the `name` and `origin` properties of the **first** object in the `brands` array.
```javascript
const [
    {
      name,
      origin
   }
  ] = cars.brands;

console.log(name, origin) //Ford USA
```
We extract the `name` and `origin` properties into variables `name` and `origin`.

We can also extract all the `name` and `origin` properties of the objects in the `brands` array.

```javascript
const [
    {
      name,
      origin
    },
    {
      name: name1,
      origin: origin1
    }
  ] = cars.brands;

console.log(name, name1, origin, origin1); //Ford Toyota USA Japan
```
In the code above:
- We extract the `name` and `origin` properties of the first object into variables `name` and `origin`.
- We assign the individual object properties to new variable names `name1` and `origin1`.

We use destructuring to assign the value of the property on the left side (`name`) to the variable on the right side (`name1`). You can learn more about destructuring [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

## Step 2 -- List transformations with functions

We can create new objects and arrays by passing existing data structures through functions. Let's create a function that takes in an array and transforms it to create a new array.
```javascript
function splitName(name) {
    return {
      lastName: name.split(' ')[1],
    };
  };
```
The function `splitName()` takes in some text and splits it using the [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) method, which:
1. splits the text by spaces.
2. returns an array with the split pieces of text.

`splitName()` then accesses the 2nd item in the array and assigns it as the value of `lastName` in the `splitName()` return object.

Let us then create an array that will be passed to this function.
```javascript
var namesList = ['Jon Doe', 'Jane Dove', 'Joe Bloggs'];
```
We also need an array to hold the values from `splitName`. Let us create this variable.
```javascript
var halfNames = [];
```
To pass all the items in the `names` array to `splitName()`, we will use a `for` loop.
```javascript
for(var i = 0; i < namesList.length; i++){
  nameObj = splitName(namesList[i])
  halfNames.push(nameObj);
}

console.log(halfNames); //[ { lastName: 'Doe' }, { lastName: 'Dove' }, { lastName: 'Bloggs' } ]
```
The `for` loop above:
1. Loops through `namesList` array.
2. Passes each item in `namesList` through `splitName()`.
3. Using the [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method appends the objects returned by `splitName()` to the `halfNames` array.

We can reduce the lines of code in the `for` loop above by calling `splitName()` inside the `push()` method.
```javascript
for(var i = 0; i < namesList.length; i++){
    halfNames.push(splitName(namesList[i]));
}

console.log(halfNames); //[ { lastName: 'Doe' }, { lastName: 'Dove' }, { lastName: 'Bloggs' } ]
```

## Step 3 -- List transformations using underscore.js

[Underscore.Js](http://underscorejs.org) is a JavaScript library that provides many methods and functions for dealing with arrays, objects and functions. It can be used to do many operations with a few lines of code.

To run underscore.js on a browser, import it under `<script>` html tags as shown below.
```js
<script src="https://pagecdn.io/lib/underscore/1.11.0/underscore-min.js" type="text/javascript"></script>
```
You can install it in [Node.js](https://nodejs.org/en/) via [npm](https://www.npmjs.com).
```bash
$ npm install underscore
```
To use underscore.js in our code, we will need to initialize it. To do this in Node.JS, add the following code at the top of the file.
```javascript
var _ = require('underscore');
```

### Looping with `_.each()`

[`_.each()`](http://underscorejs.org#each) is an underscore.js function that is used to loop through and perform actions to lists. It takes two arguments:
1. The iteratee, which is a list of objects.
2. A [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function).

The code below shows looping through an array using `_.each()`.
```javascript
const numbers = ['one', 'two', 'three'];

_.each(numbers, function(number){
  console.log(number)
  }
);

//one
//two
//three
```
The function `_.each()` above:
1. Loops through the `numbers` array passing each number to the callback function.
2. The callback function then logs each number to the console.

### Looping with `_.map()`

[`_.map()`](http://underscorejs.org/#map) is an underscore.js function that produces new arrays by passing each value in a list through a transformation function. It takes two arguments:
1. The iteratee, which is a list of objects.
2. A transformation function.

The code below shows looping through an array of numbers using `_.map()`.
```javascript
const numbersList = [2,4,6,8];

var doubleNumbers = _.map(numbersList, function(number){
  return number * 2
  }
);

console.log(doubleNumbers); //[ 4, 8, 12, 16 ]
```
In the above code:
1. `_.map()` loops through `numbersList` passing each number into the transformation function.
2. The transformation function then multiplies the number by 2.
3. The resultant array is then stored as `doubleNumbers`.

`_.map()` can also be used to transform objects.
```javascript
const numberObj = {1: 'one', 2: 'two', 3: 'three'};

var doubleNumbers = _.map(numberObj,function(value, key){
  return key*2
  }
);

console.log(doubleNumbers); //[ 2, 4, 6 ]
```
In the code above:
1. `_.map()` loops through all the properties of the iteratee (`numberObj`) passing each to the transformation function. The properties passed are inverted .ie the key becomes the value.
2. The function multiplies the `key` of the passed property by 2.
3. The resultant values are then saved as an array `doubleNumbers`.

### Filtering data using `_.filter()`

[`_.filter()`](http://underscorejs.org#filter) is an underscore.js function that returns a list of objects that pass a certain condition. This function can be used to find certain properties in a large array. The function takes two arguments:
1. The iteratee, which is a list of objects.
2. A [predicate](https://codepen.io/Universalist/post/predicates-in-javascript), which is a function holding the truth condition.

We can filter all odd numbers in an array of numbers using `_.filter()` as shown below:
```javascript
const numbersList = [1,2,3,4,5,6,7,8,9,10];

var oddsList = _.filter(numbersList, function(number){
    return number % 2 !== 0
  }
);

console.log(oddsList); //[ 1, 3, 5, 7, 9 ]
```
In the code above:
1. We pass a list of numbers `numbersList` to `_.filter()`.
2. We then declare a predicate function that takes in a `number` and checks whether the number is indivisible by 2.
3. The numbers that pass the condition above are saved as `oddsList`.

We can also filter a nested array.
```javascript
var peopleList = [
  {
    name: 'john',
    age: 20,
  },
  {
    name: 'Jane',
    age: 17
  },
  {
    name: 'Peter',
    age: 22,
  }
]

var adultsList = _.filter(peopleList, function(personObject){
  return personObject.age > 18
});

console.log(adultsList); //[ { name: 'john', age: 20 }, { name: 'Peter', age: 22 } ]
```
In the code above:
1. We create a nested array of objects `peopleList`.
2. We pass `peopleList` to `_.filter()`.
3. We then declare a predicate function that takes in a `personObject` and checks if the property `age` is greater than the value 18.
4. The objects that pass the above condition are then saved as `adultsList`.

### Conclusion

We have looked at the various methods of list transformations. There are other methods other than the ones we looked at. Underscore.js has many more easy to read and implement functions. I would recommend you check them out on [their website](http://underscorejs.org).
