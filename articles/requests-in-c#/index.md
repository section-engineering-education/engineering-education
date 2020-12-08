
## List transformations in JavaScript
In this tutorial, we will be looking at creating new objects and arrays from existing ones. We will look at creating nested data structures, looping and destructuring them. We will also look at transforming data structures by passing them through functions. 

### Prerequisites
To follow through this tutorial, you are required to have at least some basic knowledge in JavaScript objects and arrays.

By the end of this tutorial, you will be able to:
- Nest objects and arrays 
- Loop through the nested data structures
- Destructure nested data structures
- Extract data from objects and arrays using underscore.js

### Step 1 -- Nesting objects and arrays
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
Nesting can also be done using either the dot notation or square bracket notation where necessary.
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
1. creates an object `cars`
2. creates a list `brands` inside the `cars` object
3. using the `push()` method, adds an object with the properties `name` and `origin` inside `brands`
4. using the square notation adds another object at index 1

### Accessing nested data structures
We can access the first item of the nested array `brands` above using the bracket notation as shown below:
```javascript
var car1 = cars.brands[0];

console.log(car1); //{ name: "Ford", origin: "USA"}
```
Dot notation can't be used above as the indexes of an array are numeric and the dot notation only accepts strings only.

We can also access the `name` property of the first object of the `brands` array using the dot notation.
```javascript
var car1Name = cars.brands[0].name;

console.log(car1Name); //Ford
```
### Looping through nested arrays using a `for()` loop
We can loop through nested data structures to get all the objects in them. Let's loop through all the objects in the nested array `brands` we created earlier.
```javascript
function allCars(){
	for (let i = 0; i < cars.brands.length; i++){
    console.log(cars.brands[i])
	};
};

allCars();
//{ name: 'Ford', origin: 'USA' }
//{ name: 'Toyota', origin: 'japan
```
In the code above:
1. we declare a function `allCars`
2. inside it we create a [`for()` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) that loops through `brands` and logs them
3. we call the function `allCars()`

### Looping through nested objects using a `for()` loop
We can get a common property in a nested object using a for loop. Lets's print all the `name` properties of the nested `brands` objects we created earlier.

```javascript
function names(){
    for (var i = 0; i < cars.brands.length; i++){
        console.log(cars.brands[i].name)
    };
};

names(); 
//Ford
//Toyota
```
In the above code:
1. we declare a function `names`
2. we create a for loop that logs each `name` property of the nested object
3. we then call the `names` function

### Looping through nested objects properties using a `for ...in` loop
If we want to get all the properties of a nested object, we can use a [`for ...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop. Let's loop through all the properties of the nested `brands` array.
```javascript
function everything (){
    for(var i =0; i< game.suspects.length; i++){
        for (var key in game.suspects[i]){
            console.log(game.suspects[i][key])
        }
    }
};

everything();
```
In the above code:
1. we declare a function `everything`
2. inside it, we create a  [`for()` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)  that loops through all the items in the `brands` array
3. inside it, we create a  [`for ...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop that loops through all the object properties
4. we call the function `everything()`

### Destructuring a nested data structure

Destructuring can be used to extract data from nested objects and arrays. We can extract the two `brands` objects we created earlier into two new variables.
```javascript
const {
  brands: [
      brand1,
	  brand2
	]
} = cars;

console.log(brand1, brand2); //{name: 'Ford', origin: 'USA'} {name: 'Toyota', origin: 'Japan'}
```
We can also extract the `name` and `origin` properties of the **first** `brands` array.
```javascript
const [
    {
      name,
      origin
   }
  ] = cars.brands;

console.log(name, origin) //Ford USA
```
We can also extract all the `name` and `origin`  properties of the `brands` array.
```javascript
const [
    {
      name: name1,
      color: origin1
    },
    {
      name: name2,
      color: origin2
    }
  ] = cars.brands;

console.log(name1, name2, origin1, origin2) //Ford Toyota USA Japan
```
We assign the individual object properties to new variable names. We use destructuring to assign the value of the property on the left side .eg `name` to the variable in the right side .eg `name1`. You can learn more on destructuring [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

### Step 2 -- List transformations with functions
We can create objects and arrays by passing existing data structures through functions. 
```javascript
function SplitName(name) {
    return {
      name: name,
      lastName: name.split(' ')[1],
    };
  };
```
The function `SplitName` takes in some text and splits it into two in the first space using the [`split()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split). Lets then create an array that will be passed to this function.
```javascript
var namesList = ['Jon Doe', 'Jane Dove', 'Joe Bloggs'];
```
We also need an array to hold the values from `SplitName`.
```javascript
var HalfNames = [];
```
To pass all the items in the `names` array to the `SplitName` function, we will use a `for` loop.
```javascript
  for(var i = 0; i < namesList.length; i++){
   nameObj = SplitName(namesList[i])
   HalfNames.push(nameObj);
  }
```
The `for` loop above:
1. loops through `namesList` array
2. passes each item in`namesList` through the `SplitName()` function
3. using the [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method appends the objects returned by `SplitName()` to the `HalfNames` array

We can reduce the lines of code in the `for` loop above by calling the `SplitName()` function inside the `push()` method.
```javascript
  for(var i = 0; i < names.length; i++){
    namesList.push(SplitName(names[i]));
   }
```
### Step 3 -- List transformations using underscore.js
[Underscore.Js](http://underscorejs.org) is a JavaScript library that provides many methods and functions for dealing with arrays, objects and functions. It can be used to do many operations with few lines of code.

You can install it in [Node.js](https://nodejs.org/en/) via [npm](https://www.npmjs.com).
```bash
$ npm install underscore
```
To run underscore.js on a browser, import it under `<script>` html tags as shown below.
```js
<script src="https://pagecdn.io/lib/underscore/1.11.0/underscore-min.js" type="text/javascript"></script>
```
To use underscore.js in our code, we'll need to initialize it. If you are running on Node.JS, add the following code at the top of the file.
```javascript
var  _ = require('underscore');
```

### Looping with `_.each`
[`_.each`](http://underscorejs.org#each) is an underscore.js function that is used to loop through and perform actions to lists. It takes two arguments:
1. the iteratee, which is a list of objects
2. a [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

The code below shows looping through an array using `_.each`.
```javascript
_.each(['on your marks', 'get ready', 'go'],
  function(action){console.log(action)}
);
```
The code above loops through the passed array items and logs them to the console.

Therefore we can also use `_.each` function to loop through the `names` array and add items to the `namesList` array we created [earlier in step 2](#step-2----list-transformations-with-functions).
```javascript
  _.each(names, function(name) {
    namesList.push(SplitName(name)); 
    });
```
### Looping with `_.map`
[`_.map`](http://underscorejs.org/#map) is an underscore.js function that produces new arrays by passing each value in a list through a transformation function. It takes two arguments:
1. an iteratee, which is a list of objects
2. a transformation function

The code below shows looping through an array of numbers using `_.map`.
```javascript
var numbersList = _.map([2,4,6,8], function(number){return number * 2})
console.log(numbersList)
```
In the above code:
1. `_.map` loops through all the numbers passing each into the transformation function
2. the transformation function then multiplies the number with 2
3. the resultant array is then stored as `numbersList`

`_.map` can also be used to transform objects.
```javascript
var numbers = _.map({1: 'one', 2: 'two', 3: 'three'},
  function(num, key){
    return key*2
})
console.log(numbers)
```
In the code above:
1. `_.map` loops through all the properties of the iteratee passing each to the transformation function
2. the function multiplies the `key` of the passed property with 2
3. the resultant values are then saved as `numbers`

### Filtering data using `_.filter`
[`_.filter`](http://underscorejs.org#filter) is an underscore.js function that returns a list of objects that pass a certain condition. This function can be used to find certain properties in a large array. The function takes two arguments:
1. the iteratee, which is a list of objects
2. a [predicate](https://codepen.io/Universalist/post/predicates-in-javascript), which is a function holding the truth condition

We can filter all odd numbers in an array of numbers using `_.filter` as shown below:
```javascript
var oddsList = _.filter([1,2,3,4,5,6,7,8,9,10], function(number){
  return number %2 == 1
})

console.log(oddsList)
```
In the code above:
1. we pass a list of numbers 1 to 10 to the `_.filter` function. 
2. we then declare a predicate function that takes in a `number` and checks whether the number is odd.
3. the numbers that pass the condition above are saved as `oddsList`

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
})

console.log(adultsList);
```
In the code above:
1. we create a nested array of objects `peopleList`
2. we pass `peopleList` to the `_.filter` function
3. we then declare a predicate function that takes in a `personObject` and checks if the age is greater than  the value 18
4. the objects that pass the above condition are then saved as `adultsList`

### Conclusion
We have looked at the various methods of list transformations. There are other methods other than the ones we looked at. Underscore.js has many more easy to read and implement functions. I would recommend you check them out in [their website](http://underscorejs.org).