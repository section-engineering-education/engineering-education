## Objects, Arrays and Destructuring in JavaScript

Objects and arrays are some of the common data types used in JavaScript. Despite being commonly used, many developers have little understanding of the basic concepts of the two data types. The use of objects in places of arrays and vice-versa is common among developers. Let's look at the two data types, their differences and destructuring in each. 

### Introduction

When I was building a simple JavaScript dinosaur game, I quickly came to realize why a good understanding of basic concepts is important. I had to create a character but I had no idea whether to use an object or an array. I had to google things out. 

If you are using a chromium-based browser, you can [run the JavaScript code in your browser](https://developers.google.com/web/tools/chrome-devtools/console/javascript). By the end of this tutorial, you'll understand the basics of objects and arrays, their differences and destructuring in each.

### 1. Objects

Objects are variables that have properties associated with them. They are used to represent "things" in your code .eg. a character, a car,  a building, etc. If you have worked with JSON data you have already worked with objects. Comparing to a real-life situation, let's use a person as the example object. A person has at-least 1 name. The person's name is one property of this object.

### Creating objects and assigning object properties

Objects can be created using `var`, `let` or `const` keywords. Let's create a `person` object and some properties. 

```javascript
var person = {
	name : "Geoffrey",
	role : "Student"
};
```

The `name` and `role` above are the keys to each property and are required when accessing the properties. There are other methods of assigning object properties where the above method is not applicable. A good example of this is when you want to add a function output to an object but the object is defined higher in the code tree. 

### Assignment using dot notation

```javascript
var person = {};

person.name = "Geoffrey";
person.role = "Student";
```
The first line creates an empty object `person` while the following lines add the properties `name` and `role` to the object. 
> Assignment using dot notation is only applicable when using **strings** as the property keys.

### Assignment using square brackets

There are some cases where using dots can't be applied. A good example of this is when you want to add a property to an object using invalid identifiers as the key or when property names are not determined until runtime. When you try to execute the code below, you get a syntax error.

```javascript
var person = {};

person.1 = "Head";
```

The correct way of adding a property using an invalid identifier is by bracket notation.

```javascript
var person = {};

person[1] = "Head";
```

When you use brackets, the invalid identifiers are stringified. Try adding a property with a `string` key to the `person` object using brackets.
```javascript
var person = {};

person[hobby] = "coding";
```
When you execute the code above you get an error. `Uncaught ReferenceError: hobby is not defined
`. This is because anything without quotation marks should be a JavaScript keyword, a number, a boolean or defined somewhere. You can therefore solve the error by either defining `hobby` or using by simply using quotation marks.

```javascript
//By defining hobby
var person = {};
var hobby = "myHobby";

person[hobby] = "coding"; 
```
```javascript
// By using quotation marks
var person = {};

person["hobby"] = "coding";
```
All the keys in the square bracket notation except symbols are converted to strings. This is because objects property names in JavaScript should be a string or a symbol. 

### Accessing object properties
        
Objects properties can be accessed by use of **dot notation** or **square brackets notation**. 

```javascript
// acess using dot nation
person.name;
// access using bracket notation
person["name"];
```
> Properties with multi-word keys can't be accessed using the dot notation. They can only be accessed using bracket notation.

Properties in objects can be deleted using the `delete` operator.

```javascript
delete person.role;
```

### 2. Arrays

Arrays are variables that are used to store multiple items and ordered collections. They use zero-based indexing meaning that the first item in the array is index 0. Arrays can be created using the `var`, `let` or `const` keywords.

```javascript
var fruits = [
	"Bananas",
	"Lemons",
	"Mangoes"
];
```

In arrays, unlike objects, keys are auto-generated. Each item is given a numeric key according to the position in the array.

### Adding items to arrays

Items can be added at the beginning, between and the end of the array. Items can be added at the beginning of an array by using [unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method.

```javascript
fruits.unshift("Watermelon","Plums");
```

The unshift() method adds the items at the beginning of the `fruits` array and returns the length of the array. The first item in your unshift method will be first in the resultant array. 

To add items in between other items, [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method is used. The index of the items before and after the position you want to add the item is passed in the splice() method.

```javascript
fruits.splice(1, 0, "Oranges"); //adds oranges before plums
```
`Oranges` will be added between the second and the first fruit in the array.
 
To add items at the end of the array, use [push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method.

```javascript
fruits.push("Apples");
```

You can remove the last item in the array by using the [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) method and the first using the [shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).

### Accessing items in an array

Items in an array can be accessed by using the bracket notation and passing the item index.

```javascript
fruits[0]; //returns Watermelon
``` 

### Difference between objects and arrays.

Despite assignment and access methods being quite similar, arrays and objects have a set of differences. Objects are used in JavaScript when defining anything that is made up of characteristics. Arrays are used when creating a list of multiple items in a single variable. Arrays use [zero-based indexing](https://en.wikipedia.org/wiki/Zero-based_numbering#:~:text=Zero-based%20numbering%20is%20a,mathematical%20or%20non-programming%20circumstances.) to generate item indexes. This means that the first item in the array is index 0. On the other hand, object property indexes are manually defined.

### 3. Array destructuring

Destructuring is the extracting object properties or array items into independent variables. Destructuring of arrays can be done like this:

```javascript
var fruits = [
	"Bananas",
	"Lemons",
	"Mangoes"
];

var [fruit1, fruit2, fruit3] = fruits;
```
All the fruit items in `fruits` array above are mapped onto each variable defined in the last line. For example, `"Bananas"` is mapped onto `fruit1`. You can also skip values you are not interested in like this:

```javascript
var fruits = [
	"Bananas",
	"Lemons",
	"Mangoes"
];
var [fruit1, , fruit3] = fruits;// skips lemons
```

Destructuring can also be used to define variables in bulk.

```javascript
const [fruit1, fruit2, fruit3] = ["Bananas", "Lemons", "Mangoes"];
```

Variable names can be declared separately from their values to achieve readability.

```javascript
let fruit1, fruit2, fruit3;

[fruit1, fruit2, fruit3] = ["Bananas", "Lemons", "Mangoes"];
```

### 4. Object destructuring

Destructuring in JavaScript objects can be done as follows:

```javascript
var person = {
	name : "Geoffrey",
	role : "Student"
};

const {name, role} = person;
```
The above method only works when the variable names are the same as the object property names. To assign object properties to new variable names, declare them like this.

```javascript
const {name:naming, role:roling} = person;
```

### 5. Swapping variables using destructuring

Destructuring is a common way of doing complex or repetitive work more easily. Besides defining variables in bulk, it can also be used to swap variables.

The commonly used method of swapping variables in JavaScript is by introducing a temporary variable. The temporary variable holds the value of a variable as it gets swapped.

```javascript
let a = 1;
let b = 2;
let temp;

temp = a;
a = b;
b = temp;
```

Destructuring can be used to do the same thing with fewer lines of code.

```javascript
let a = 1;
let b = 2;

[a, b] = [b, a];
```

### Conclusion

Objects are a data-type that has properties or preferences associated with it. If you have worked with JSON data, you have already worked with objects. Arrays are a data-type used to store related items or creating ordered lists. Since objects and arrays build a fraction of a web developer's code, understanding the basic concepts around these data types is important. 
