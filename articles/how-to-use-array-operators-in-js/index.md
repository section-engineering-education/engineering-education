#### Prequisites
- Have Node.js installed in your computer. If you don't have it, you can download it from [here](https://nodejs.org/en/)
- Have some familiarity with JavaScript

### What we shall do:
- [Introduction into JavaScript arrays](#introduction-into-javascript-arrays).
- [Properties of JavaScript arrays](#properties-of-javascript-arrays).
- [Operations on JavaScript arrays](#operations-on-javascript-arrays).

### Introduction into JavaScript arrays.
Arrays are list like objects for storing elements in a program. Since JavaScript is not statically typed, an array can hold different types of data. For example an array can have intergers, strings and floats at the same time. The number of elements to be stored in an array are also not fixed, they are upon the precedence of the programmer. 

### Properties of JavaScript arrays.
- **Length**. It indates the number of elements in a particular array. Consider the following array:

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

Since there are three elements in the fruits array, the sample output shall be three.

- **Constructor**. It is used to indicate the function that created the array object. Using our previous array of fruits we check the constructor property.

```javascript
    console.log(fruits.constructor);    
```
Output

```bash
    [Function: Array]
```

[Function: Array] is the default constructor value when creating arrays.

- **Prototype**. It allows us to be able to add our own custom operations and properties to the arrays. For example considering the fruits array we have, we can opt to implement a function to capitalize the first letter of each element of the array. Since there is no such pre-build operation in JavaScript, we can use the prototype.

```javascript
    Array.prototype.toUCase = function() {
    for (i = 0; i < this.length; i++) {
      this[i] = this[i][0].toUpperCase() + this[i].slice(1);
    }
    };

    //we execute the operation on our array
    fruits.toUcase();

    console.log(fruits);

```

Output

```bash
    ['Mangoes','Lemons','Avocados']
```

### Operations on JavaScript arrays.

In JavaScript, arrays are equipped with various operations that make them more usable. We shall discuss the commonly used operations on JavaScript arrays. 

- **concat()**. It joins an element or an array to an array and then returns the new copy of an array. Lets examine with an example:

```javascript

    const initial_fruits = ["mangoes","avocados"];

    //concat a single fruit.
    let new_fruits = initial_fruits.concat("pineapples");

    console.log(new_fruits);

    //concat an array of fruits

    new_fruits = new_fruits.concat(["lemons","oranges"])

    console.log(new_fruits);

```
Output

```bash
    ['mangoes','avocados','pineapples']
    ['mangoes','avocados','pineapples','lemons','oranges']
```
- **copyWithin()**. It copies array elements to and from a given target, start and end index. The three are passed as parameters. It starts copying at a given target with data from the start index passing through untill it reaches data of last index. The last index is exclusive.

```javascript
    const initial_fruits = ["mangoes","avocados","lemons","oranges"];

    let new_fruits = initial_fruits.copyWithin(2,1,3);

    console.log(new_fruits);
```
Output

```bash
    ['mangoes','avocados','avocados','lemons']
```

The target is index 2 so it shall start at index 2 and then shall copy the data from index 1 to index 3 while still preserving the length of the array.

- **entries()**. It is used to get an iteration object of the key and the value. The key is the index whereas the value is the data at that particular index.

```javascript
    const fruits = ["mangoes","lemons"];

    for(const [key,value] of fruits.entries()){
        console.log(`key ${key}, value ${value}`);
    };
```

Output.

```bash
    key 0 and its value is mangoes
    key 1 and its value is lemons
```
The operation returns an array of key and value, and so when you are iterating you will have to destructure. Keys start at 0.

- **every()**. It is used when iterating through all elements of an array to check if they all satisfy a given condition. Using this operation you are guaranteed that all elements of the array will be checked.

```javascript
    const fruits = ["mangoes","lemons"];

    let result;

    result = fruits.every(fruit => fruit[0] === "m" );

    console.log(result);

```

Output

```bash
    false
```
From the above, we want to check if all the fruits we have in the array start with letter m. So, we implement the `every()` operation on the array and if the first letter is an m. The result variable stores the output. The output shall be false because lemons does not start with an m.

- **fill()**. It is used to enter a static value on a given array. For you to use this method, you will have to instanciate the array with the `new Array()` method. The operation receives three parameters which are value, start index and the end index. The end index is not inclusive, meaning it does not take into account that index, it just stops there. Considering we have created an array of fruits and we want to fill it with different fruits at different indexes we can use the `fill()`.

```javascript
    const fruits = new Array(4);

    fruits.fill('mangoes',0,1);

    fruits.fill('lemons',1,2);

    fruits.fill('banana',2,3);

    fruits.fill('pineapples',3,4);

    console.log(fruits);
```
Output.

```bash
    ['mangoes','lemons','banana','pineapples']
```
From above, we instanciate the fruits array with the `new Array()` method. It receives the length of the array we want to create. From there, we fill the array with values using the `fill()` with respect to the start and end index.

- **filter()**. It creates a new array with elements that satisfy a particular condition. The condition is placed on all the elements of the array so that only elements that pass the condition proceed. For example, in our fruits array, we may want to have an array of fruits which have only six letters, here we apply `filter()`.

```javascript
    let fruits = ["mangoes","lemons",'banana','pineapples'];

    let new_fruits = fruits.filter(fruit => fruit.length === 6);

    console.log(new_fruits);
```

Output

```bash
    ["lemons","banana"]
```

The new_fruits array shall comprise of lemons and banana since they both have six letters each.

- **find()**. It returns the element of an array which is the first to meet a particular condition. For example, if we need to find which is first fruit to have six letters in the array, we can use the `find()` method.

```javascript
    let fruits = ["mangoes","lemons","banana","pineapples"];

    let fruit = fruits.find(fruit => fruit.length === 6);

    console.log(fruit);
```
Output.

```bash
    lemons
```
Since lemons is the first fruit to have six letters, the `find()` shall find it and then return it.

- **findIndex()**. It returns the index of the first element to meet a particular condition in an array. If the element we are searching for has more than one occurrence, it returns the first index. Considering the previous example, we may want to find the index of the first fruit to have six letters, we use the `findIndex()`.

```javascript
   let fruits = ["mangoes","lemons","banana","pineapples"];

   let index = fruits.findIndex(fruit => fruit.length === 6);

   console.log(index);
```
Output

```bash
    1
```
Since lemons is the first fruit to meet the condition, its index shall be returned.

- **forEach()**. It used to execute a function or a callback for each element of an array. It does not mutate an array meaning that it always returns undefined. In our previous example, we may intend to `console.log` all the fruits and hence we can use `forEach()` and execute it as a callback.

```javascript   
    let fruits = ["mangoes","lemons","banana"];

    fruits.forEach(fruit => console.log(fruit));
```
Output

```bash
    mangoes
    lemons
    banana
```
- **from()**. It is used to come up with a new array from an iterable object such as an array or a string. For example if we have an array of strings and from there we want to come up with the same fruits but now capitalized, we can use the `from()` method. The method is usually executed on the `Array` instance.

```javascript
    let fruits = ["mangoes","lemons","banana"];

    let new_fruits = Array.from(fruits,fruit => fruit.toUpperCase());

    console.log(new_fruits);
```
Output

```bash
    ['MANGOES','LEMONS','BANANA']
```
The from method is executed on the Array instance and receives the iterable object, for this case is fruits and a map function and for this case we are only capitalizing the fruit.

- **includes()**. It is used to check if a particular array contains a specified element. For example if we want to check if the fruits array contains lemons, we can simply use the `includes()` method. The method returns a `Boolean`.

```javascript
    let fruits = ["mangoes","lemons","banana"];

    let result = fruits.includes("avocado");

    console.log(result);
```

Output

```bash
    false
```
Since we do not have avocado as an element in the fruits array, the result shall hold `false`.

- **indexOf()**. It is usually used in searching for an element in an array and then returning its index. For example, if we want to search for bananas in our fruits array and get the index we use the `indexOf()` method. If else we do not find the element in the array it shall return `-1`.

```javascript
    let fruits = ["mangoes","lemons","bananas"];

    let index = fruits.indexOf("bananas");
    
    console.log(index);
```
Output

```bash
    2
```
- **isArray()**. It is used to check whether the object passed is an array. It is important to note that even though strings are treated as arrays in JavaScript, the `isArray()` shall return `true` if and only if it is an array else it shall return `false`. Considering our previous example, we can illustrate this.

```javascript
    let _string = "mangoes,lemons,bananas";

    let _array = ["mangoes","lemons","bananas"];

    console.log(Array.isArray(_string));

    console.log(Array.isArray(_array));
```

Output

```bash
    false
    true
```

- **join()**. It is used to join all of the data in the array in to a string. For example, if we wanted to convert our array of fruits into a single string, we use the `join()` method. 

```javascript
    let fruits = ["mangoes","lemons","bananas"];

    let fruits_string = fruits.join();

    console.log(fruits_string);
```

Output

```bash
    mangoes,lemons,bananas
```
- **keys()**. It returns an iteration array containing the keys of the passed array. The method yields an array and hence you use a `for loop` to iterate over the keys. For example, if we want to show all the keys of our fruits array, we use the `keys()` method.

```javascript
    let fruits = ["mangoes","lemons","bananas"];

    for(const key of fruits.keys()){
        console.log(`key ${0}`)
    };
```
Output

```bash
    key 0
    key 1
    key 2
```
- **lastIndexOf()**. It usually searches for index of an element in an array and returns the position of that element. It's uniqueness is that if the item to search for occurs more than once, it returns the position of last occurrence. It does not receive a function, it receives a value. Assume that our fruits array has duplicates elements and we want to find the index of last occurrence of bananas, here we apply the `lastIndexOf()` method.

```javascript
    let fruits = ["mangoes","lemons","bananas","apples","bananas"];

    let last_index = fruits.lastIndexOf("bananas");

    console.log(last_index);
```
Output

```
    4
```
Since we have two elements of bananas in the array, it shall pick the index of the last one.

- **map()**. Performs a mutation on each element of the array resulting to creation of a new array. Lets assume we wanted to mutate our array such that each element has its length appended at the end. For this we need to use the `map()` method.

```javascript
    let fruits = ["mangoes","lemons","bananas"];

    let new_fruits = fruits.map(fruit => `${fruit}${fruit.length}`);

    console.log(new_fruits);
```

Output

```bash
    ['mangoes7','lemons6','bananas7']
```
- **pop()**. It is used to remove the last element of an array. It returns the removed element. From our example, we may want to remove the last fruit from the fruits array. For this purpose, we have to use the `pop()` method.

```javascript

    let fruits = ["mangoes","lemons","bananas"];

    let last_element = fruits.pop();

    console.log(last_element);

    console.log(fruits);

```
Output

```bash
    bananas
    ['mangoes','lemons']
```

- **push()**. It adds an element to the end of the array and returns the new length of the array. From our example, if we have a new fruit we want to add we can simply use the `push()` method.

```javascript
    let fruits = ["mangoes","lemons","bananas"];

    let new_length = fruits.push("pineapples");

    console.log(new_length);

    console.log(fruits);
```
Output

```bash
    4
    ['mangoes','lemons','bananas','pineapples']
```

- **reduce()**. It reduces the elements of an array to a single value. It is done from left to right. It is usually implied when you want to reduce in an array from left to right. The method receives two parameters which symbolize two values to be reduced. In the function to be executed you specify the operation to be carried out and the starting point value. From our previous example, we can reduce the array of fruits from left to right and gain a single string using `reduce().`.

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let reduced = fruits.reduce((fruit_a,fruit_b) => fruit_a + fruit_b,'');

    console.log(reduced);
```
Output

```bash
    mangoeslemonsbananas
```
- **reduceRight()**. It functions same as `reduce()`, only that for `reduceRight()` it reduces from the right to the left. The parameters received and the function to be executed are defined similarly. From our previous example, we can reduce the array of fruits from the right achieving a different string.

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let reduced_right = fruits.reduceRight((fruit_a,fruit_b) => fruit_a + fruit_b,'');

    console.log(reduced_right);
```
Output

```bash
    bananaslemonsmangoes
```

- **reverse()**. It reverses the order of elements in an array. In such a way that the new array starts with the elements that were at the end in the original array. From the previous example, we can reverse the fruits such that we form an array that starts with the last element of fruits array using `reverse()`.

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let reversed_fruits = fruits.reverse();

    console.log(reversed_fruits);
```
Output

```bash
    ['bananas','lemons','mangoes']
```

- **shift()**. Opposite of `pop()`, `shift()` removes an element at the beginning of an array and returns that element. For example, in our fruits array, we can remove the first element of the array and get the element removed. 

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let removed_element = fruits.shift();

    console.log(removed_element);

    console.log(fruits);
```
Output

```bash
    mangoes
    ['lemons','bananas']
```
- **slice()**. It selects some portions of an array based on the start and end index and returns the new array with those portions. If the start and end index are not specified, it returns a replica of the original array. Else if the start index is specified and the end index is not specified, it returns from an array from the start index all the way to the end of the array. The end index is not inclusive, its exclusive. Based on our fruits array we can make a new array from the second index to the third index using `slice()`. We shall specify the third index as `3` because its exclusive.

```javascript
    let fruits = ['mangoes','lemons','bananas'];
    
    let new_fruits = fruits.slice(1,3);

    console.log(new_fruits);
```
Output

```bash
    ['lemons','bananas']
```

- **some()**. It checks if some of the data in the array meet a particular condition. It must not be all, but some of them. For our fruits array we can check if there are some of the fruits which have eight letters. `some()` method receives a function specifying the condition. If there are some, it shall return `true` else `false`.

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let exists = fruits.some(fruit => fruit.length === 8);

    console.log(exists);
```
Output

```bash
    false
```
- **sort()**. It sorts the data of an array. It receives two parameters which symbolize the data to be sorted. The function to be executed for sorting depends with the problem at hand. For example, using our fruits array we may decide to order them according to the number of letters  in ascending order using `sort()`.

```javascript

    let fruits = ['mangoes','lemons','bananas'];

    let sorted_fruits = fruits.sort((fruit_a,fruit_b) => fruit_a.length - fruit_b.length);

    console.log(sorted_fruits);

```
Output

```bash
    ['lemons','mangoes','bananas']
```

- **splice()**. It removes elements from an array, replacing in their positions other elements of the array. When calling the `splice()`, you specify the start index and the deleteCount. If you omit the deleteCount, all of the elements in the array shall be deleted. In our example, we can delete two  elements (deleteCount) starting from index 0 (start index).

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let spliced_fruits = fruits.splice(0,2);
    
    console.log(spliced_fruits);

    console.log(fruits);
```
Output

```bash
    ['mangoes','lemons']
    ['bananas']    
```
- **toString()**. It converts the target array to a string and returns the result. In our example, we can decide to convert our fruits array into a single string using `toString()`.

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let _string = fruits.toString();

    console.log(_string)
```
Output

```bash
    mangoes,lemons,bananas
```
- **unshift**. Opposite of `push()`, `unshift()` adds new element to the beginning of the array and returns the new length. In our example, we can decide to push another fruit to the beginning of the array.

```javascript
    let fruits = ['mangoes','lemons','bananas'];

    let new_length = fruits.unshift('apples');

    console.log(new_length);

    console.log(fruits);
```
Output

```bash
    4
    ['apples','mangoes','lemons','bananas']
```

### Conclusion
In this article we have covered introduction to JavaScript arrays, properties of JavaScript arrays and operations executed on JavaScript arrays.