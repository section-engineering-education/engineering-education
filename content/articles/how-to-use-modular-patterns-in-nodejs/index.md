When building applications, you don’t write all your code in one single file. First, this would very hard to manage. This been a large application, it would be very hard for a developer to come back to this code, refactor or extend the application functionalities. However, you can break down this complex application into small reusable parts.

Typically, what developers do is that an application is divided into several logical files. Each file has a different bit of code with certain functionality. This way, it will be easier to maintain your codebase because each file has less code to accomplish a specific task. It is easier to debug and share the code with other developers, this ease application contributions and maintenance.

This concept is common in most programming languages. The concept is called modularity (Modular patterns). In this case, every single file is a module. Let’s say, for example, you are creating a calculator application. In this case, you can have a file that handles addition to another file that handles substation functionality. Each file has a specific arithmetical task.

This is a huge advantage for node.js. When you use JavaScript without frameworks such as Node.js, there is no concept of public and private scope. JavaScript offers local scope, which means the content of a function or an object is private unless specifically exposed to any external module. This might pollute the Global namespace when executing this JavaScript code in the browser. Thus, you need to wrap the functions method in a function scope to enhance privacy and avoid populating the global namespace in the browser.

Node.js does not implement the global namespace. In node.js, Module systems are implemented natively, based on the commonJS specifications. This way, you implement a local namespace within every module. This way, variables and properties are private to a module until explicitly exposed/exported to other modules.

This breaks down the application complexity into manageable units and separating concerns. A modular system provides a scalable framework for building complicated apps.

These patterns can be implemented in several ways, but that depends on the modular programming paradigm of the host programming language.

In Node.js, the concept of Modular patterns has additional features that go beyond the regular module (file) pattern. The Node.js modular functionality can be used to import functions, Classes, Objects, external files, core Node.js modules, and NPM modules.

A node.js can be stateless or stateful:
- Stateless expose stateless entities such as classes objects and methods.
- Stateful exposes a stateful instance of an object such as a database connection, and instance of a third party API service.

This tutorial will focus on creating modules, exporting and importing them to different files using Node.js.

Let’s create some Node.js modules.

### Prerequisites
- [Node.js installed](https://nodejs.org/en/download/).
- Background knowledge of using [Node.js](https://nodejs.dev/learn).

### Creating and importing a function module
To start with, create a project folder and include the `app.js` and `main.js` files as shown below, respectively.

```js
//app.js
const sum = (num1,num2) => {
    return 'The sum is '+(num1+num2);
}
```

```js
//main.js
const  result = sum(10,14)
console.log(result);
```

It is clear that `app.js` want to access function `sum` from `main.js`. When you run `node main.js`, it shows undefined. This is because `sum` is private to `main.js`. And cannot be accessible outside this module unless exposed publically to other modules.

This is how modules are made available when required by other modules.

```js
//app.js
const sum = (num1,num2) => {
    return 'The sum is '+(num1+num2);
}

module.exports = sum 
```

```js
//main.js
// search app.js in present directory
const sum = require('./app.js')

const  result = sum(10,14)
console.log(result); 
```

Here we have a function `sum`. `module.exports` make this function accessible outside of the module wherever we require that module. The object `module` uses the property `exports` to expose the function `sum` natively. The function is now explicitly accessible and can now be invoked in other modules such as `main.js`.

To use this module, you need to import it to another module. `require()` is used to import module `app.js` to module `main.js`.

>Note:  The require() function is synchronous. `require()` caches the value of `module.exports` and returns that same value for all future `require()` calls. if the module should return different values, you should export a function that can be afterward be called to return a new value.

When you run `node main.js`, you’ll get the results as expected.

What if you have different functions and export them to `main.js`. This is how you would use the module system.

```js
//app.js
const sum = (num1,num2) => {
    return 'The sum is '+(num1+num2);
}

const count = (anims) => {
    return 'The number of animals is '+anims.length;
};

const greet = () => {
    console.log("Hello world");
}

module.exports = {
    sum:sum,
    count:count,
    greet:greet
}
```

```js
//main.js
// search app.js in present directory
const myModule = require('./app.js')

const  result = myModule.sum(10,14)
console.log(result); 

const animals = myModule.count(['Sheep','Horse','Tiger','Pigeon'])
console.log(animals);

myModule.greet();
```

In this case, `module.exports` is set to an object with a set of functions as properties you want to export.

The above patterns are called Revealing Module Pattern. This is because you are only exposing the things you want to be public to other modules. It only exposes the final results when the `require()` is run on the other module.

### Exporting and importing a class
```js
// persion.js
// constructor function for the Persion class
function Persion(name) {
    this.age = 21;
    this.name = name;
}
 
// export the class, so other modules can access Persion objects
module.exports = {
    Persion: Persion
}
```

The is a class `Person` containing objects name and age. `Person` is exposed as a property of `module.exports`. We can access the class `Person` by importing the `person.js` module to main.js, as shown below.

```js
// main.js
// import the Persion module
let persions = require('./persion.js');
let Persion = persions.Persion;

// creates a Persion
let persions1 = new Persion("John");

// find the names and ages persions1 in the class Persion
console.log(persions1.name + " is " + persions1.age + " old." );
```

In this case, we create an instance of class `Person` inside `main.js` using the new keyword. Run `node main.js` to log the results in the console.

### Exports
`exports` is a shorthand for `module.exports`. `exports` helps you expose objects and methods. Check this example.

```js
//circle.js
// constant value
const pi = Math.PI

// using the the value to diggrent elements and exposing them to other modules
exports.areaOfaCircle = radiusOfaCircle => (radiusOfaCircle ** 2) * pi
exports.circumferenceOfaCircle = radiusOfaCircle => 2 * radiusOfaCircle * pi
```

The module circle exposes functions `circumferenceOfaCircle` and `areaOfaCircle` using alias `exports`. and find the area and circumference of a circle you need a `const PI`. `Math.PI` provides this mathematical functionality. In this case, `const pi` is private to circle.js. It's only accessible to this module. We need a way to consume `PI` within this module and then expose its elements using `exports`. Let's consume these elements.

```js
//app.js
const circle = require('./app.js')

const r = 21
const area = circle.areaOfaCircle(r)
const circumference = circle.circumferenceOfaCircle(r)

console.log(`Area of the circle is: ${area}`)
console.log(`Circumference of the circle is: ${circumference}`)
```

Run `node app.js` to get the results.

### module.exports VS exports
`exports` is just an alias variable for the convenience of writing lesser code. `exports` behaves as if there is an implicit line of code that assigns it to `module.exports` .ie:

```js
const exports = module.exports = {};
```

This assignment occurs behind the scenes whenever you use  `exports`. variable `exports` is only a pointer to the `module.exports`'s initial value.

This is how you should use `exports`.

```js
exports.areaOfaCircle = radiusOfaCircle => (radiusOfaCircle ** 2) * pi
```

#### Usecase
- `module.exports` is commonly used to expose elements such as functions, objects, and classes at the root level. for example:

```js
module.exports = sum
```

- If you'd rather have a single object that reveals multiple assignments, use the `module.exports` method.

for example:

```js
module.exports = {
    sum:sum,
    count:count,
    greet:greet
}
```

assigning more than one object to `exports` won't work

- `exports` is great when directly exposing named functions such as `exports.areaOfaCircle`.

### Using Node.js core modules
node.js is buddled with a couple of modules such as HTTP [file system](https://nodejs.org/api/fs.html)(fs) etc. To use these modules in your project, you use the `require()` function to access an instance of modules.

For example, using [Node.js HTTP module](https://nodejs.org/api/http.html) to create a simple server.

### Node.js NPM modules
Npm provides open sources packages that you can use within your project. When you install an npm package, dependencies are saved in a node_module folder. For these modules to work, you need to import them using `require()`.

To work with NPM modules, you have to run `npm init -y` to generate `package.json` file. Run `npm install <package name>` to make a package available for your project.

For example, Moment is an NPM module for displing and formatting Node.js dates. Here is how you would use Moment

Rung `npm install moment` to install Moment dependencies for your project.

Using [Moment](https://www.section.io/engineering-education/nodejs-date-and-time-objects-with-moment/) to display today date.

```js
//app.js
const moment = require('moment');
const todayDate = moment();

console.log(
    "The date today is " +
    todayDate.format('dddd, MMMM Do YYYY, h:mm:ss a')
);
```

Run `node app.js` and `The date today is Saturday, May 1st 2021, 4:11:26 pm` (today's date and time) will be logged in the console.

Check out this tutorial to get a grip on how export and import modules are used to build a Node.js project.

- [RESTful Web API in Node.js using PostgresSQL and Express](https://www.section.io/engineering-education/restful-web-api-using-nodejs-postgressql-and-express/)
- [Logging with Winston and Node.js](https://www.section.io/engineering-education/logging-with-winston/)
- [Documenting a Node.js REST API using Swagger](https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/)
- [Uploading Files Using Multer in a Node.js](https://www.section.io/engineering-education/uploading-files-using-multer-nodejs/)

### Conclusion
Module patterns help you implement the art of building node.js projects at scale by dividing them into reusable parts.