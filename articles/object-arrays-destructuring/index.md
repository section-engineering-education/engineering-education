---
layout: engineering-education
status: publish
published: true
url: /engineering-education/object-arrays-destructuring/
title: Objects, Arrays, and Destructuring in JavaScript
description: This article goes over objects, arrays, and destructuring in JavaScript, to help developers have a better understanding of the basics.
author: geoffrey-mungai
date: 2020-10-06T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/object-arrays-destructuring/hero.jpg
    alt: object arrays destructuring example image
---
Objects and arrays are some of the common data types used in JavaScript. Despite being commonly used, many developers have little understanding of the basic concepts of the two data types. The use of objects in place of arrays and vice-versa is common among developers. Let us look at the two data types, their differences, and destructuring in each.
<!--more-->

### Introduction
This article is meant to serve as an introduction to the basic concepts of objects and arrays when working with JavaScript. If you are using a chromium-based browser, you can [run the JavaScript code in your browser](https://developers.google.com/web/tools/chrome-devtools/console/javascript). By the end of this tutorial, you'll understand the basics of objects and arrays, their differences, and destructuring in each.

### 1. Objects
Objects are variables that have properties associated with them. They are used to represent "things" in your code. For example, a character, a car, a building, etc. If you have worked with JSON data you have already worked with objects. Comparing it to a real-life situation, let's use a person as the example object. A person has at-least 1 name. The person's name is one property of this object.

### Creating objects and assigning object properties
Objects can be created using `var`, `let`, or `const` keywords. Let's create a `person` object and some properties.

```JavaScript
var person = {
	name : "Geoffrey",
	role : "Student"
};
```

The `name` and `role` above are the keys to each property and are required when accessing the properties. There are other methods of assigning object properties where the above method is not applicable. A good example of this is when you want to add a function output to an object but the object is defined higher in the code tree.

### Assignment using dot notation

```JavaScript
var person = {};

person.name = "Geoffrey";
person.role = "Student";
```

The first line creates an empty object `person` while the following lines add the properties `name` and `role` to the object.

> Assignment using dot notation is only applicable when using **strings** as the property keys.

### Assignment using square brackets
There are some cases where using dot notation can't be applied. Here are some good examples:
- When adding a property to an object using a key starting with an invalid identifier like:
	- a sign or a symbol
	- a number
- When property names are not determined until runtime.

When we try to execute the code below, you will see we get a syntax error.

```JavaScript
var person = {};

person.1 = "Head";
```

The correct way of adding a property using an invalid identifier is by bracket notation.

```JavaScript
var person = {};

person[1] = "Head";
```

When we use brackets, the invalid identifiers are stringified. Try adding a property with a `string` key to the `person` object using brackets.

```JavaScript
var person = {};

person[hobby] = "coding";
```

When we execute the code above we get an error. `Uncaught ReferenceError: hobby is not defined`.
This is because anything without quotation marks in JavaScript should be either:
- a JavaScript keyword
- number
- Boolean
- defined somewhere

You can therefore solve the error by either defining `hobby` or by simply using quotation marks.

```JavaScript
// by defining hobby
var person = {};
var hobby = "myHobby";

person[hobby] = "coding";
```

```JavaScript
// by using quotation marks
var person = {};

person["hobby"] = "coding";
```

All the keys in the square bracket notation (except symbols) are converted to strings. This is because objects property names in JavaScript should be a string or a symbol.

### Accessing object properties
Objects properties can be accessed by the use of **dot notation** or **square brackets notation**.

```JavaScript
// access using dot nation
person.name;
// access using bracket notation
person["name"];
```

> Properties with multi-word keys can't be accessed using the dot notation. They can only be accessed using bracket notation.

Properties in objects can be deleted using the `delete` operator.

```JavaScript
delete person.role;
```

### 2. Arrays
Arrays are variables used to store multiple items and ordered collections. They use zero-based indexing meaning that the first item in the array is index 0. Arrays can be created using the `var`, `let`, or `const` keywords.

```JavaScript
var fruits = [
	"Bananas",
	"Lemons",
	"Mangoes"
];
```

In arrays, unlike objects, keys are auto-generated. Each item is given a numeric key according to the position in the array.

### Adding items to arrays
Items can be added at the beginning, between, and the end of the array. Items can be added at the beginning of an array by using the [unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method.

```JavaScript
fruits.unshift("Watermelon","Plums");
```

The unshift() method adds the items at the beginning of the `fruits` array and returns the length of the array. The first item in your unshift method will be first in the resultant array.

To add items in between other items, the [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method is used. The splice() method takes 3 arguments:

- position to insert the new item
- number of items to remove from the array
- the item(s) to insert into the array

```JavaScript
fruits.splice(1, 0, "Oranges"); // adds oranges at index 1
```

`Oranges` will be added at index 1 and 0 (zero) items will be removed from the array.

To add items at the end of the array, use [push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method.


```JavaScript
fruits.push("Apples");
```

You can remove the last item in the array by using the [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) method and the first using the [shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).

### Accessing items in an array
Items in an array can be accessed by using the bracket notation and passing the item index.

```JavaScript
fruits[0]; // returns Watermelon
```

### Difference between objects and arrays
Despite assignment and access methods being quite similar, arrays and objects have a set of differences. Objects are used in JavaScript when defining anything that is made up of characteristics.

Arrays are used when creating a list of multiple items in a single variable. Arrays use [zero-based indexing](https://en.wikipedia.org/wiki/Zero-based_numbering#:~:text=Zero-based%20numbering%20is%20a,mathematical%20or%20non-programming%20circumstances.) to generate item indexes. This means that the first item in the array is index 0. On the other hand, object property indexes are manually defined.

### 3. Array destructuring
Destructuring is the extracting of object properties or array items into independent variables. Destructuring of arrays can be done like this:

```JavaScript
var fruits = [
	"Bananas",
	"Lemons",
	"Mangoes"
];

var [fruit1, fruit2, fruit3] = fruits;
```

All the fruit items in the `fruits` array above are mapped onto each variable defined in the last line. For example, `"Bananas"` is mapped onto `fruit1`. You can also skip values you are not interested in like this:

```JavaScript
var fruits = [
	"Bananas",
	"Lemons",
	"Mangoes"
];
var [fruit1, , fruit3] = fruits;// skips lemons
```

Destructuring can also be used to define variables in bulk.

```JavaScript
const [fruit1, fruit2, fruit3] = ["Bananas", "Lemons", "Mangoes"];
```

Variable names can be declared separately from their values to achieve readability.

```JavaScript
let fruit1, fruit2, fruit3;

[fruit1, fruit2, fruit3] = ["Bananas", "Lemons", "Mangoes"];
```

### 4. Object destructuring
Destructuring in JavaScript objects can be done as follows:

```JavaScript
var person = {
	name : "Geoffrey",
	role : "Student"
};

const {name, role} = person;
```

The above method only works when the variable names are the same as the object property names. To assign object properties to new variable names, declare them like this.

```JavaScript
const {name:naming, role:roling} = person;
```

### 5. Swapping variables using destructuring
Destructuring is a common way of doing complex or repetitive work easily. Besides being used to define variables in bulk, it can also be used to swap variables.

The commonly used method of swapping variables in JavaScript is by introducing a temporary variable. The temporary variable holds the value of a variable as it gets swapped.

```JavaScript
let a = 1;
let b = 2;
let temp;

temp = a;
a = b;
b = temp;
```

Destructuring can be used to do the same thing with fewer lines of code.

```JavaScript
let a = 1;
let b = 2;

[a, b] = [b, a];
```

### Conclusion
Objects are a data-type that has properties or preferences associated with it. Arrays are a data-type used to store related items or creating ordered lists. Since objects and arrays make up a fraction of a web developer's code, understanding the basic concepts around these data types and how they work is important to understand.

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
