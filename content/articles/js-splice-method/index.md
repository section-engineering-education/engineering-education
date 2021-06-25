### Javascript .splice() Method
When learning a new language you pass through things you don't understand, in this article i would love to demystify the .splice method used in javascript and show you how you can easily use it.
What is the .splice() method? This is the first question many of us will ask. The splice method is an in-built method for JavaScript Array objects which enables one to update the content of an array by removing or replacing current components with new ones.
This method alters the original array and returns a new array with the removed or replaced elements.
This tutorial will focus on how the .splice() method is used to remove, add and replace elements within an array.

### Using .splice method to remove elements within an array
To make it easier to understand we are going to use the same example to explain how the .splice() method works.
Consider the following scenario: You have an array named **cars**, however some of the names in the array are **bike** names.The example is as follows: 

```js
let cars = ["Sedan", "Coupe", "Mountain-bike", "Commuter-bike"];
```

Above is a mixed array of **cars** and **bike** names.

To remove the bike names from the cars function and add them to a new array at the same time, use the splice() method in the following way: 

```js
let cars = ["Sedan", "Coupe", "Mountain-bike", "Commuter-bike"];
let bikes = cars.splice(2);
console.log(bikes); // ["Mountain-bike", "Commuter-bike"]
```
At least one parameter is required for the splice() method, which is the **start** index where the splice process begins. 
The number **2** is supplied to the procedure in the code above, indicating that .splice() method will begin removing elements from index **2**.
By giving a second integer argument known as **removeCount**, you can specify how many entries you wish to remove from the array. 
If you wish to remove just one element from the array you can do that by using the number 1 as shown in the example below:
```js
let cars = ["Sedan", "Coupe", "Mountain-bike", "Commuter-bike"];
let bikes = cars.splice(2, 1);
console.log(bikes); // ["Mountain-bike"]
console.log(cars); // ["Sedan", "Coupe", "Commuter-bike"]
```
If the **removeCount** parameter is not specified, .splice() method removes all elements from the array's start index to its end index.

### How to use .splice method to delete and add array members
What makes it fun to work with .splice() method is that you can even add new elements right after deleting them with this method.Simply indicate the components you wish to add to the array after the delete count.
The syntax for .splice() method is as follows:
```js
Array.splice(start, removeCount, newItem, newItem, newItem, ...)
```

The following example shows how to delete "Mountain-bike" and "Commuter-bike" from the cars array while adding "Hatchback" and "Wagon":

```js
let cars = ["Sedan", "Coupe", "Mountain-bike", "Commuter-bike"];
let bikes = cars.splice(2, 2, "Hatchback", "Wagon");
console.log(bikes); // ["Mountain-bike", "Commuter-bike"]
console.log(cars); // ["Sedan", "Coupe", "Hatchback", "Wagon"]
```

### How to add new array elements without removing any elements
Finally, by setting the **removeCount** option to **0**, you can add new components without removing any.
If no elements are deleted, the .splice() method produces an empty array.
You have the option of storing the returned empty array in a variable. 
Without deleting existing items, the following example shows how to add a new element "Hatchback" next to "Coupe."
You don't need to retain the returned array because the splice() method returns an empty array: 

```js
let cars = ["Sedan", "Coupe", "Mountain-bike", "Commuter-bike"];
cars.splice(2, 0, "Hatchback");
console.log(cars); 
// ["Sedan", "Coupe", "Hatchback", "Mountain-bike", "Commuter-bike"]
```
The .splice() method called without returning any elements.

### Conclusion
You just learnt how to use the .splice() method.
You did an excellent job! 
The.splice() method approach is normally used when you need to delete or add additional items to an array.
You may also use it to separate an array with mixed content in some cases, like in the example above. 
If you remove **0** elements from the array, the method will return back an empty array.
At any point, you can assign the resulting array to a variable or ignore it.