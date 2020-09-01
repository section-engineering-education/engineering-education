The power of Node.js is backed by open-source frameworks that form the ecosystem of JavaScript. As a Node.js developer, it is practically impossible to constantly avoid their advantage. With the help of Node.js packages, as a developer, you will conclusively save a lot of time and develop applications that are light, scalable and high speed with tremendous productivity. 

Let's have a look at packages that will assist you to extend your Node.js development skills.

## 1. Express
Express.js is the fastest, unopinionated, and simplest web framework for Node.js. It is very flexibly designed for building simple page, multi-page and hybrid applications that provide a robust set of features for web and mobile applications. The framework is minimal. It is the leading Node.js framework designed for building web applications and APIs with robust tooling for HTTP servers. 

Node.js frameworks such as [`Sails`](https://www.npmjs.com/package/sails), [`Hapi`](https://www.section.io/engineering-education/introduction-to-hapi/) and [`NestJS`](https://nestjs.com/) are built on Express. Express is available on the NPM registry.

### Features of Express
-   Robust routing.
-   Focus on high-quality performance.
-   Superhigh test coverage.
-   HTTP helpers (such as redirection and caching).
-   Content negation.
-   Executable for generating applications quickly.

## 2. AsyncJS
Asynchronous is heavily used in Node.js to ensure non-blocking operations flow. Asynchronous I/O permits other processing to continue even before the first transmission has finished.

It uses a queue to keep track of tasks, allowing you to append additional tasks, attach extra callbacks and handle errors with callbacks. This makes it a more versatile and robust solution for complex dependency management.

AsyncJS provides several functions that include usual functions such as '`map`', '`filter`', '`reduce`',' `filter`' and '`each`' as well as some common patterns for asynchronous flow control functions such as ('`parallel`' , '`series`' and '`waterfall`').

### Advantages of using AsyncJS in your Node.js App Include
-   It supports inline functions and text strings.
-   Error handling from the dependency queue.
-   Use of AsyncLocalStorge within AsyncJS helps to create asynchronous states           within callbacks and promise chain.
-   A collection of Async functions helps to control the flow through the script.
-   Helps to integrate AsyncResource with EvenEmitter.

Example of `async/await` in Node.js:
```js
async function myFunction(inputValue) {
    try {
        const a = await asyncFunc1('value');
        const b = await asyncFunc2(a);
        const c = syncFunc3(b);
        return await asyncFunc4(c);
    } catch (ex) {
        // handle exception
    }
}
```
In this scenario, functions 1, 2 and 4 are asynchronous.

### Other Frameworks Related to AsyncJS Include
-   [`Limiter`](https://www.npmjs.com/package/limiter) - Used for rate-limiting based on request per `sec/hr`.
-   [`Co-async`](https://www.npmjs.com/package/co-async) - Inspired by Async for use with `co` and function generator.
-   [`Neo-async`](https://www.npmjs.com/package/neo-async) - Focus on speed implementation of Async.

## 3. Browserify
Browersify analyses `require()` calls in your Node.js application to create a bundle that you can serve up to the browser in a single `<script>` tag. `Require()` is used to load modules installed by NPM i.e. `require('module')`. Browsers do not have the `require()` method defined but Node.js does. With Browserify, you can write code that uses `require()` just like you would use it in Node.js code. 

Browserify simply compiles commonJS modules for the browser and structures everything neatly together. With Browserify, you don't need to constantly have to go back and forth between your code to analyse which packages and widgets are using specific scripts. Browserify loads every dependency and bundle them is a single file so that you will only have to make one reference.

This way, code becomes cleaner for Node.js developers for both front and back-end applications. You can use Browserify to create client-side codebase that is well structured and easy to navigate. 

If you have not tried Browserify yet, give it a shot in your next Node.js project and it will rock your application. It is a good choice if you want to keep order between your scripts.

## 4. Lodash

Lodash is a modern JavaScript library that provides utility functions. Lodash is inspired by the famous [`Underscore.js`](https://www.npmjs.com/package/underscore) utility library. Lodash has built-in functions that make Node.js coding easier and cleaner. Instead of writing a common function repeatedly, you can use just a single line code with the help of Lodash.

### Reason why you should choose Lodash

Lodash makes Node.js coding easier by taking the hassle out of working with common programing functions such as `arrays`, `objects`, `numbers`, `strings` and `date` etc.

### Lodash Utility Modular Methods Are Dignified For:
-   Interacting arrays, objects, and strings.
-   Manipulating and testing values.
-   Creating composite functions.

### Lodash Comes with a Handful of Benefits to Node.js Developers Such as
-   Keeps your code minimal and neat.
-   You only need to remember the Lodash functions hence easier to code.
-   Even new programmers can understand Lodash.

### Other Utility Libraries Include:

-   [`Underscore.js`](https://underscorejs.org/) - Underscore.js provides useful functional programming helpers without having to extend any built-in objects.
-   [`Futil`](https://github.com/smartprocure/futil-js) - Futil is designed to complement Lodash's functional utilities.

Lodash remains one of the most downloaded Node.js modules in the NPM repository. Try it out in the back-end and use their CDN for the front-end.

## 5. Moment.js

Moment.js is a lightweight JavaScript development tool for date and time manipulatation. It makes dates and times easy to format, parse, validate, and internationalize using a clean and concise API. 

Node.js date objects are not that bad but it requires a lot of coding for complex parsing, validation, and displaying date and time objects. 

To use Moment.js with Node.js, install the module using the command `npm install moment`. Then simply use `require()` in your application as in the following example:

```js
const moment = require('moment');
const today = moment();
console.log(today.format());
```
**OUTPUT: 2020-08-27T09:21:49+01:00**

Moment.js can still run from the browser. It creates a global moment object, which is used to access date and time parsing and manipulation. Include `<script>` as in the example below.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset ="UTF-8"></meta>
        <title> MomentJS Date Object </title>
    </head>
    <body>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
        <script>
        // You have a 'moment' global here
         const today = moment();
         console.log(today.format());
        </script>
    </body>
</html>
```
Moment.js is an awesome Node.js package. It simplifies date and time parsing, manipulation and validation. If you have a Node.js application that uses date and time objects, consider trying Moment.js. It will help you to solve any date and time problems in your application. 

Moment.js supports international languages for different time and date formats which is a good thing to have in your application if you are developing an application with multiple languages.

### Other Validator and Formatting Libraries Include:
-   [`Validator.js`](https://github.com/validatorjs/validator.js) - Validator.js is a library for string validators and sanitising.
-   [`Express-validator`](https://www.npmjs.com/package/express-validator) - Express-validator is an Express middleware for Validator.js.
    
## 6. Request
Request is a simplified HTTP client that makes it possible to make `http` calls. It supports HTTPS and follows redirect by default. Request is a fantastic choice if you want an easy to use library to deal with HTTP requests in a sane way. 

If you want to use promises, you can check out the request-promise library. It is used to describe a request to a server and get a response.

### Request has the following main contractors:
-   Body - is the data to send with the request.
-   Cache - is a sting with the following instances: default, force-cache, no-cache, no-store, only-if-cached and reload etc.
-   Credentials - are a sting which includes omit and same-origin instance properties.
-   Headers - are the `http` headers to send with the request. It is passed to the headers contractor.
-   Method - are HTTP methods such as `GET` `POST` `DELETE` and `PUT`.
-   Mode - is a string with one of same-origin, no-cors or cors instances.

**Example of a simple Request**
```js
const request = require('request');
request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
});
```
With request, you need less code to accomplish the same task if you were using the HTTP library.

### Other HTTP REST Client Libraries Include**
-   [`Axios`](https://www.npmjs.com/package/axios) - Uses promise-based HTTP client for Node.js and Browsers.
-   [`Method-override`](https://github.com/expressjs/method-override) -
    Lets you use HTTP verbs such as DELETE and PUT in places where the
    client does not support it.
    
### 7. JSHint
JSHint is a static code analysis tool to detect errors and potential problems in JavaScript. Linting tools help Node.js developers to analyse common bugs in their code without focused attention. Linters analyses the code themselves. 

JSHint scans your Node.js program and reports commonly made mistakes and potential bugs such as syntax errors, leaking variables, implicit type and conventions etc. 

[`ESLint`](https://www.section.io/engineering-education/node-eslint/) is similar to JShint package, used for linting (enhancing code quality).

## 8. Morgan
Morgan is an HTTP request logger middleware for Node.js applications. Morgan gives you insights on how your app is being used and alerts you on potential errors and issues that could be threats to your application. Morgan is considered the most reliable HTTP logger by Node.js developers.

You can choose to use [`Winston`](https://www.npmjs.com/package/winston) as an alternative library for logging.

## 9. Karma
As a Node.js developer, you need to test your application to make sure it is stable and reliable with good performance. Karma is the tool for the job. The main goal of karma is to bring a productive testing environment to developers.

### Why You Should Choose Karma**
-   Tests code in real browsers.
-   Tests code in multiple browsers (desktop, mobile phones and tablets).
-   It tests on real devices such as mobile phones, tablets or even headless PhantomJS.
-   Controls the whole testing workflow from your command or IDE.
-   It executes tests locally during development.
-   It executes your tests on a continuous integration server.
-   Karma executes your tests after every save.

### Other Node.js Testing Libraries Are:
-   [`Mocha`](https://www.npmjs.com/package/mocha) - runs on Node.js and browsers to make asynchronous testing simple and fun.
-   [`Chai`](https://www.chaijs.com/) - is a BDD/TDD assertion library for Node.js and browsers that can be paired with any JavaScript testing framework.
-   [`Jest`](https://jestjs.io/) - is a JavaScript testing framework with a focus on simplicity.

## 10. MySQL
MySQL is a Node.js client for the MySQL protocol. Before using MySQL to connect to your database, ensure you have MySQL installed and configured in your machine. Then create a database and database tables that you can work with.

**An Example on How to Use MySQL with Node.js**

```js
//use require() to include MySql library 
var mysqldb = require('mysql');
//you need to create a connection to the database
//make sure you replace 'user' and 'password' with your correct values
//create connection
var connection = mysqldb.createConnection({
    host: 'localhost',
    user: 'you',
    password: 'passwordgoeshere',
    database: 'mydb'
});
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
connection.end();
//terminate connection
//executes the remaining queries
//send quit packet to your MySal server
//end
```
From the above example:
-   Every method that you invoke on a database connection is queued and executed in sequence.
-   To terminate/close the connection use `end()`, this makes sure that all the remaining queries are executed before sending a quit packet to the MySQL server.

### Other MySQL and Helper Frameworks Include:
-   [`Sequelize`](https://www.npmjs.com/package/sequelize) - a promised based Node.js ORM for Postgres, MySQL, Maria DB, SQLite, and Microsoft SQL Server.
-   [`Knex.js`](https://knexjs.org/) - is designed to be flexible, portable and fun to run for MSSAL, MySQL, Oracle, MariaDB, SQLite3 and Amazon Redshift.

### Some [`MongoDB and Helper`](https://www.mongodb.com/) Frameworks Include
-   [`Mongoose`](https://www.npmjs.com/package/mongoose) - is a MongoDB object modeling tool designed to work in an asynchronous environment.
-   [`Mongoose Paginate v2`](https://www.npmjs.com/package/mongoose-paginate-v2) - is a customizable cursor based pagination plugin for Mongoose.

## 11. Nodemon
Nodemon is a monitoring tool and it helps Node.js developers by automatically restarting the application when file changes in the app directory are detected. With Nodemon, you do not need any additional code or development method changes. It is a replacement wrapper for node. 

Nodemon is simple to use. You just need to replace the word node with `nodemon` on the command-line when executing your `script`, i.e. `nodemon ./server.js localhost 300`

### Example of Other Monitoring Frameworks Include
-   [`PM2`](https://www.npmjs.com/package/pm2) - is a Node.js process manager that allows you to keep applications alive forever and reload them without downtime to facilitate common system admin tasks.
-   [`Trace`](https://github.com/RisingStack/trace-nodejs) - is designed for microservices and is a visualized stack trace platform.
-   [`Forever`](https://www.npmjs.com/package/forever) - is a CLI tool for ensuring that a given Node.js script runs continuously i.e. forever.

## 12. Restify
Restify is a Node.js web service framework, which is optimized for building semantic and RESTful web services (APIs) that are ready for production use at scale.

### Why You Should Use Restify
-   Production-ready - Optimized for introspection and performance.
-   Debuggable - Trace problems back to the origin. It is built from a post-mortem debugging perspective.
-   Semantically correct - It has references littered all-over GitHub and the codebase.

### Restify Examples

#### i. Server
```js
var restify = require('restify');
const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
```
#### ii. Client
```js
var assert = require('assert');
var clients = require('restify-clients');
var client = clients.createJsonClient({
    url: 'http://localhost:8080',
    version: '~1.0'
});
client.get('/echo/mark', function (err, req, res, obj) {
    assert.ifError(err);
    console.log('Server returned: %j', obj);
});
```
#### iii. Routing
```js
function send(req, res, next) {
    res.send('hello ' + req.params.name);
    return next();
}
server.post('/hello', function create(req, res, next) {
    res.send(201, Math.random().toString(36).substr(3, 8));
    return next();
});
server.put('/hello', send);
server.get('/hello/:name', send);
server.head('/hello/:name', send);
server.del('hello/:name', function rm(req, res, next) {
    res.send(204);
    return next();
});
```
### Other Node.js API Frameworks Include:
-   [`Actionhero`](https://www.npmjs.com/package/actionhero) - is an API framework for both TCP sockets, web sockets and HTTP clients that creates reusable APIs.
-   [`FeathersJS`](https://www.npmjs.com/package/@feathersjs/feathers) - is a framework for REST APIs and is a real-time layer for modern applications.
-   [`Loopback`](https://www.npmjs.com/package/loopback) - is a Node.js and Typescript framework for building APIs and microservices.
### 13. [Nodemailer](https://www.section.io/engineering-education/node-mailer/)
[Nodemailer](https://www.section.io/engineering-education/node-mailer/) is a Node.js application module that allows easy as cake email sending.

**Example of how Nodemailer works**
```js
use strict";
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
main().catch(console.error);
```
[`Express-Mailer`](https://github.com/RGBboy/express-mailer) is a similar module to Nodemailer used to send emails from your application and response object.

## 14. Gulp
Gulp is a toolkit to automate slow, repetitive tasks that are time-consuming in Node.js development workflow. These tasks include cache-busting, optimization, concatenation and minifying files etc.

### Why Gulp
-   It is easy to learn and simple to use.
-   Its integrations are built into major IDEs such as `.NET`, `PHP`, `Node.js` and `Java`.
-   It helps to automate time-consuming tasks in your Node.js development workflow.

Gulp is similar module to [`GruntJS`](https://www.npmjs.com/package/grunt) which is used to automatically perform frequent tasks such are unit testing and linting.

## 15. Molecular
Molecular is a fast, modern, and powerful progressive microservices framework for Node.js. It helps Node.js developers to build applications that are efficient, reliable, and scalable.

### Features of Molecular
-   It uses promise based solutions i.e. Async/Await compatible.
-   It supports event-driven architecture with balancing.
-   Supports versioned services.
-   It has built-in caching solutions such as memory, memoryLRU and Reds.
-   It has built-in metrics feature with reporters such as Console, CSV, Datagod and StatsD.
-   Molecular has built-in tracing features with exporters such as Event, Jaeger and Zipkin.
-   It has a built-in service registry and dynamic service discovery.
-   Molecular employs a request-reply concept.
-   It has fault tolerance features such as Fallback, Timeout, Retry, Bullhead and Circuit Breaker.

**Other Microservices Frameworks for Node.js Includes**
-   [`Micro`](https://www.npmjs.com/package/micro) - is an Asynchronous HTTP microservices framework.
-   [`Micro Panda`](https://github.com/zhaoyao91/micro-panda) - is a Node.js toolkit that helps to build microservices.
-   [`Seneca`](https://www.npmjs.com/package/seneca) - is a Node.js microservice toolkit with plugins that look after the foundations of your app.
-   [`ServerLess`](https://github.com/serverless/serverless) - builds web, mobile and IoT applications with serverless architectures using AWS Lambda, Azure functions and Google Cloud Functions etc.

## 16. Agenda
Agenda is a lightweight job queue-scheduling library for Node.js.

### The Agenda Library Offers**
-   Even backed job queue.
-   Scheduling with configurable priority, concurrency and repeating.
-   It has a promised based API.
-   Agenda is great when developing applications backed by MongoDB.
-   Agenda aims to keep its codebase small, compact, and light.

### Similar Job Scheduling and Queuing Libraries Are
-   [`Cron`](https://www.npmjs.com/package/cron) - allows you to execute commands on a schedule.
-   [`Node Schedule`](https://www.npmjs.com/package/node-schedule) - is a cron-like Node.js job scheduler.

## Conclusion

As a Node.js developer, many open-source frameworks will help you improve your skills to deliver professional applications that are light and reliable. 

If you happen to be a Node.js developer, the combination of using different frameworks in your app will propel you to another level. You cannot work without Node.js packages in your day-to-day Node development. 

I wish you a happy time coding.
