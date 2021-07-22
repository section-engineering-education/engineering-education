---
layout: engineering-education
status: publish
published: true
url: /jsdoc-documentation/
title: Documenting JavaScript Code With JSDocs
description: By the end of this tutorial, the reader should have learned how to initialize JSDocs in a JavaScript program and use it in a real-life programming scenario. We will write code snippets that are documented using JSDocs to demonstrate the concept.
author: phina-kersly
date: 2021-07-21T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/jsdoc-documentation/hero.png
    alt: JSDocs documentation image example
---

Suppose you write a block of code for a software today, or a couple of functions to achieve a given functionality. At the moment of writing the code, everything is clear in your mind, and you can understand what every piece and every line does in your code. However, months later, you may look at your code and wonder if you were the one who wrote the code, especially if the code is not documented. 
<!--more-->
Code documentation resolves the issues of forgetting what the code is about and makes it easy for other developers to understand how to use and maintain the software you wrote.
### Why you need JSDocs
As we all know, writing code documentation can be very tedious. Therefore, we need something to cut time. The main idea behind JSDocs is to generate documentation for functions, classes, and methods.

The benefit of using JSDocs for your code is how easy it is to export to HTML. Moreover, it integrates well with IDE's and code editors such as VS Code which has an extension for it.

### Goal
By the end of this tutorial, the reader should have learned how to initialize JSDocs in a JavaScript program and use it in a real-life programming scenario. We will write code snippets that are documented using JSDocs to demonstrate this concept.

### Insight
If you take a look at the function below, it is easy to tell what the function does as it speaks for itself. 

From the function name to its parameters, we can tell that this function calculates the area of a rectangle by taking the length and width as parameters.

```Javascript
function calculateArea(length, width, area) {
	area = length * width;
	return area;
}
```

If we change the function and parameter names, this function could mean something else. We can use the JSDocs documentation API to help us describe the function better than it speaks for itself. 

You add a line of comment starting with an asterisk `*` before the function name to document it:

```Javascript
/**
* function to  calculate the area of a rectangle
*/
function calculateArea(length, width, area){
    area = length * width;
    return area;
}}
```

### JSDocs Annotations
Writing the function name alone is not enough. With JSDocs annotation, we can make things more interesting by documenting parameters as well.

For each parameter, we take note of its type and the description of what it does in the code. The syntax for a function parameter is shown below.

```Javascript
/**
 *
 * @param {parameter type} parameter name - parameter description
 *
 */
```

- Type: parameter type may be a `string`, `integer`, `array`, `floating-point`, etc.
- Name: every parameter must have a name for referencing purposes in the code and when the function is called.
- Description: an explanation of what the parameter is about.

### Project Setup
We have had a glimpse of how to use JSDocs documentation API. To understand more, create a folder and name it `project`. 

Head over to your terminal and run the following commands.

```bash
npm init -y
npm i- dev jsdocs
```

We need a config file to use JSDocs. In the root folder of the application, create a file named `jsodc.json` and paste the following snippet.

```Javascript
{
	"source": {
		"include": ["source"],
		"includePattern": ".js$",
		"excludePattern": "(node_modules/|docs)"
	},
	"plugins": ["plugins/markdown"],
	"templates": {
		"cleverLinks": true,
		"monospaceLinks": true
	},
	"opts": {
		"recurse": true,
		"destination": "./documentation/"
	}
}
```

In the root folder, create a new folder named `source` and add a new file named `index.js` inside it. Here is where we are going to write the code whose documentation is to be generated.

### Creating the Startup Script
Add the snippets below in the Script Object in the `package.json` file:

```Javascript
"doc": "jsdoc -c jsdoc.json"
```

Now run the command `npm run doc` after which you'll see a folder called `documentation` in your root folder. 

At this time, your folder structure should be as shown below:

```
|-- jsdocs.json
|-- package-lock.json
|-- package.json
|-- documentation
|   |-- index.html
|   |-- fonts
|   |-- scripts
|   |-- style
|-- source
    |-- index.js
```

If you open your `index.html` file in the `documentation` folder, you should see the auto generated page where your documentation will go.

![documentation page](/engineering-education/jsdoc-documentation/initial-page.png)

### Documenting data types
JavaScript has various data types like strings, numbers, arrays, and objects. The snippets below show how to document each of them using JSDocs.

- Strings

```Javascript
/**
 * Documentaion for a string
 * Article Name
 * @type {string}
 */

const articleName = "Javascript Documentation";
```

- Number

```js
/**
 * Documentaion for a Number
 * Article Number
 * @type {number}
 */

const articleNumber = 24;
```

- Array

```Javascript
/**
 * Documentaion for an array
 * Array
 * @type {Array<number>}
 */

const stars = [1, 2, 3, 4, 5];
```

- Object

```Javascript
/**
 * Documentaion for an Object
 * Object
 * @type {{id: number, name: string, class: string}}
 */

var student = {
	id: 23,
	name: "Jane Doe",
	class: "Beginner",
};
```

### Documenting functions
Now that we know how to create JSDocs annotations for types, we can document functions by borrowing the same knowledge. 

We describe what a function does, the parameters it takes, and what it returns.

```Javascript
/**
 * function to  calculate the area of a rectangle
 * @param {number} length - The length of the rectangle
 * @param {number} width - The width of the rectangle
 * @returns {number} - The area of the rectangle
 */
function calculateArea(length, width, area) {
	area = length * width;
	return area;
}
```

### Creating Custom Types
Let us say we want to create a custom data type called `programming language`. We will define the custom type using the `typedef` keyword to specify the language object and the object name.

```Javascript
/**
 * Custom data type defining a programming language
 * @typedef {Object} ProgrammingLanguage
 * @property {number} id - Language id
 * @property {string} name - Language name
 * @property {string} software - Projects it can build
 * @property {number} year - the year it came to life
 */

/**
 * @type {ProgrammingLanguage}
 */

const programmingLanguage = {
	id: 100,
	name: "Javascript",
	software: "Websites",
	year: 1999,
};
```

### Working with Classes
Now let's look at how we document JavaScript classes using JSDocs. 

A JavaScript class usually has a class name, data members, and methods that can be performed on it. The snippet below explains how to work with classes in JSDocs.

```Javascript
/**
 * Class to create a user object
 */
class User {
	/**
	 * @param {Object} userInfo  Information about a user
	 */
	constructor(userInfo) {
		/**
		 * @property {string} name - User name
		 */
		this.name = userInfo.name;

		/**
		 * @property {string} password - User's password
		 */
		this.password = userInfo.password;

		/**
		 * @property {string} email - User's email address
		 */
		this.email = userInfo.email;

		/**
		 * @property {number} age - User's age
		 */
		this.age = userInfo.age;
	}

	/**
	 * @property {Function} sayHello - Greet the group stating user's name
	 * @returns void
	 */
	sayHello() {
		console.log(`Hello section my name is ${this.name}`);
	}
}
```

![Classes](/engineering-education/jsdoc-documentation/class-members.png)

![Classes](/engineering-education/jsdoc-documentation/class-methods.png)

### Looking into Modules
Maybe you're wondering how to work around having different documents and files in the same project. Well, here is where we'll work that out.

You can bring modules in your documentation by importing them into the main `index.js` file in the `source` folder. For instance, we can create a module called `functions`, write our functions in it, and documented it.

Create a file named `functions.js` in the `source` folder and add the snippet below.

```Javascript
/**
 * functions module
 * @module functions
 */

/**
 * function to  calculate the area of a rectangle
 * @param {number} length - The length of the rectangle
 * @param {number} width - The width of the rectangle
 * @returns {number} - The area of the rectangle
 */
exports.area = (length, width) => length * width;

/**
 * Add two numbers
 * @param {number} number1 - First number
 * @param {number} number2 - Second number
 * @returns {number} - Sum of number1 and number2
 */
exports.add = (number1, number2) => number1 + number2;
```

Bring the `functions` module into `index.js` by adding the following line at the top of the file.

```Javascript
const { add, area } = require("./functions");
```

If you run the command `npm run doc`, you will see the module `functions` documented as below:

![modules](/engineering-education/jsdoc-documentation/functions-module.png)

### Conclusion
In this tutorial, we have learned how to use JSDocs to document JavaScript code. We took a look into documenting basic data types, arrays, objects, function parameters, and classes. 

This tutorial gives the topic a beginner-friendly approach with easy-to-understand snippets to enable you to get the maximum knowledge of the concept. 

You can find the code for the snippets in this [file](https://replit.com/@PhinaKersly/JSDOCS?v=1).

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
