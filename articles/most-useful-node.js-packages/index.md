## Most Useful Node.js Packages That you need to Know
Open-source frameworks that form the ecosystem of JavaScript back the power of Node.js. As a Node.js developer, it is practically inevitable to constantly avoid their advantage. With the help of Node.js packages, as a developer, you will conclusively save a lot of time and develop applications that are light, scalable, high speed with tremendous productivity.
Let's have a look at the packages that will assist you to extend your inclination to Node.js application development.
### 1. Express
Express.js is the fastest, unopinionated, and simplest web framework for Node.js. It is very flexible designed for building simple page,multipage and hybrid applications that provide a robust set of features for web and mobile applications. The framework is minimal. It is the leading Node.js framework designed for building web applications and
APIs with robust tooling for HTTP servers. Node.js frameworks such as [`SAILS`](https://www.npmjs.com/package/sails), [`NESTJS`](https://nestjs.com/), [`LOCOMOTIVE`](http://www.locomotivejs.org/) are built on Express. Express is available on the NPM registry.
**Features of Express**
-   Robust routing.
-   Focus on high-quality performance.
-   Superhigh test coverage.
-   HTTP helpers (such as redirection, caching).
-   Content negation.
-   Executable for generating applications quickly.
### 2. Async
Asynchronous is heavily used in Node.js to ensure non-­blocking operations flow. Asynchronous I/O permits other processing to continue even before the first transmission has finished.
It uses a queue to keep track of tasks, allowing you to append additional tasks, attaching extra callbacks, and handling error inside callbacks, making it a more versatile and robust solution for complex dependency management.
Async provides several functions that include usual functional such are '`map`', '`filter`', '`reduce`',' `filter`', '`each`' as well as some common patterns for asynchronous control flow('`parallel`' , '`series`' , '`waterfall`').
**Advantages of using Async in your Node.js app include**
-   It supports inline functions and text strings.
-   Error handling from the dependency queue.
-   Use of AsyncLocalStorge within AsyncJs helps to create asynchronous states within Callbacks and promise chain.
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
In this scenario, we can see it is obvious that functions 1,2, and 4 are asynchronous.
**Other Frameworks related to AsyncJs include**
-   [`Limiter`](https://www.npmjs.com/package/limiter) - Used for
    rate-limiting based on request per `sec/hr`.
-   [`Co-async`](https://www.npmjs.com/package/co-async) - Inspired by
    Async for use with `co` and function generator.
-   [`Neo-async`](https://www.npmjs.com/package/neo-async) - Focus on
    speed implementation of Async.
-   [`Promise-async`](https://www.npmjs.com/package/promise-async) - It is
    an Async version where all methods are generated.
### 3. Browserify
It analyses` require ()` calls in your Node.js application to create a bundle that you can serve up to the browser in a single `<script>` tag. `Require ()` is used to load modules installed by NPM ie `require('module')`. Browsers do not have the `require ()` method defined but Node.js does. With Browserify, you can write code that uses `require ()` just like you would use it in Node.js code. Browserify simply complies commonjs modules for the browser and structure everything neatly together. With Browserify, you don't need to constantly have to go back and forth between your code to analyse which packages and widgets are using the specific scripts, Browserify loads every dependency and bundle them is a single file so that you will only have to make one reference. This way code becomes cleaner for Node.js developers for both front and backend applications. You can use Browserify to Create client-side codebase that is well structured and easy to navigate. If you have not tried Browserify yet, give it a shot in your next Node.js Project and it will rock your application. It is a good choice if you want to keep order between your scripts with ease.
### 4. Lodash
It is a modern JavaScript library that provides utility functions. Lodash is inspired by the famous [`Underscore.js` (http://underscorejs.org/) utility library. Lodash has built-in functions that make Node.js coding easier and cleaner. Instead of writing a common function repeatedly, you can use just a single line code with the help of Lodash.
**Reason why you should choose Lodash**
Lodash makes Node.js coding easier by taking the hassle out of working with common programing functions such as `arrays`, `objects`, `numbers`, `strings`, `date`, etc.
**Lodash Utility modular methods are dignified for:**
-   Interacting arrays, objects, and strings.
-   Manipulating and testing values.
-   Creating composite functions.
**Lodash comes with a handful of benefits to Node.js developers such as**
-   Keeps your code minimal and neat.
-   You only need to remember the Lodash functions hence easier to code.
-   Even the Newbies can understand Lodash.
**Other utility libraries include:**
[`Underscore.js`](https://underscorejs.org/) - It provides useful functional programming helpers without having to extend to any built-in objects. Lodash remains the most dependent Node.js module in NPM listings. Try it out for the backend and use CDN for the frontend.
[`Fultil-js`](https://github.com/smartprocure/futil-js) - Is designed to complement Lodash's functional utilities.
### 5. MomentJs
Moment.js is a lightweight JavaScript development tool for dates and times manipulating. It makes date and time easy to format, parse, validate, and internationalize using clean and concise API. Node.js date objects are not that bad, it only that it requires you to do a lot of coding to do complex parsing, validation, and displaying Date and time objects. Here a few examples of date objects using Moment.js: To use MomentJs with Node.js, install the module using the following command :
`npm install moment`
Then simply use `require ()` in your application as in the following
example:
```js
const moment = require('moment');
const today = moment();
console.log(today.format());
```
**OUTPUT: 2020-08-27T09:21:49+01:00**
MomentJs can still run from the browser. It creates a global moment
object, which is used to access date and time parsing and manipulation
functionality. Include `<script>` as in the example below.
```js
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset ="UTF-8"></meta>
        <title> Momentjs Date Object </title>
    </head>
    <body>
        <script  src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
        <script>
      // You have a 'moment' global here
      const today = moment();
      console.log(today.format());
        </script>
    </body>
</html>
```
MomentJs is an awesome Node.js package. It simplifies date and time
related parsing, manipulation as well as validation. If you have a
Node.js application that uses data and time objects, consider trying
Moment.js. It will help you to solve any date problem in your
application. MomentJs support international languages in you date
objects which is a good thing to have in your application if you are
dealing with multiple language application.
**Other validations and formatting libraries include:**
-   [`Validator.js`](https://github.com/validatorjs/validator.js) - A library for string validators  and sanitizer.
-   [`Express-validator`](https://www.npmjs.com/package/express-validator) -
    It is an Express Middleware for Validator.js.
### 6. Request
Request is a simplified HTTP client that makes it possible to make `http`
calls. It supports HTTPS and follows redirect by default. Request is a fantastic choice if you want an easy to use library to deal with HTTP request in a sane way. If you want to use Promises, you can check out the request-promise library. It is used to describe a request to a server and get a response.
**Request has the following main contractors:**
-   **Body** - The data to send with the request.
-   **Cache** - A sting with the following instanceS: default,
    force-cache, no-cache, no-store, only-if-cached, reload etc.
-   **Credentials** - A sting which include omit, same-origin instance
    properties.
-   **Headers** - It is the `http` headers to send with the request. It is
    passed to the Headers contractor.
-   **Method** - HTTP method such as `GET` `POST` `DELETE`, `PUT`.
-   **Mode** - A string with one of same-origin, no-cors, cors instances.
**Examples of simple Request**
```js
const request = require('request');
request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
});
```
With request, you need less code to accomplish the same task that you
would have used a lot of coding of you were using the HTTP library.
**Other HTTP REST client include**
-   [`Axios`](https://www.npmjs.com/package/axios) - Used promise-based
    HTTP client for Node.js and Browsers.
-   [`Method-override`](https://github.com/expressjs/method-override) -
    Lets you use HTTP verbs such as DELETE and PUT in places where the
    client does not support it.
### 7. Jshint
It is a static code analysis tool to detect errors and potential
problems in JavaScript.
Lining tools help Node.js developers to analyse common bugs in your code
without your focussed attention. Linter analyses the code themselves.
Jshint scans your Node.js program and reports commonly made mistakes and
potential bugs such as syntax errors, leaking variables, implicit type,
conventions, etc.
[`ESLint`](https://eslint.org/) is a similar package example used for
linting (enhancing code quality).
### 8. Morgan
It is an HTTP request logger middleware for Node.js application. Morgan
gives you Insights on how your app is being used and alerts you on
potential errors and issues that could be threats to your application.
Morgan is considered the most reliable HTTP logger by Node.js
developers. You can choose to use
[`Winston`](https://www.npmjs.com/package/winston) as an alternative
library for logging.
### 9. Karma
A Node.js developer, you need to do more testing to your application to
make sure it\'s stable and reliable with good performance. Karma is the
tool for Job Karma. The main goal of karma is to bring a productive
testing environment to developers.
**Why you should choose karma**
-   Tests code in real browsers.
-   Test code is multiple browsers(desktop, mobile, tablets).
-   It tests on real devices such as mobilephone, tablets or even a headless
    phantomJS.
-   Control the whole testing workflow from your command or IDE.
-   It executes tests locally during development.
-   It executes your tests on a continuous integration server.
-   Karma executes your tests after every save.

**Other Node.js testing libraries are:**

-   [`Mocha`](https://www.npmjs.com/package/mocha) - Runs on Node.js and
    browsers to make asynchronous testing simple and fun.
-   [`Chai`](https://www.chaijs.com/) - BDD/TDD assertion library for
    Node.js and Browser that can be paired with any JavaScript testing
    framework.
-   [`Jest`](https://jestjs.io/) - JavaScript Testing framework with a
    focus on simplicity.

### 10. MySQL

It is a Node.js client for MySQL protocol. Before using MySQL to connect
to your database, ensure you have MySQL installed and configured in your
machine.
Then create database and database tables that you work with.

**An example on how to use on how MySQL**
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
From the above example
-   Every method that you invoke on a database connection is queued and
    executed in sequence.
-   To terminate/close the connection use `end()`, this makes sure that
    all the remaining. queries are executed before sending a quit packet
    to the MySql server.

**Other MySQL and helpers frameworks include:**

-   [`Sequelize`](https://www.npmjs.com/package/sequelize) - promised
    based Node.js ORM for Postgres, MySQL, Maria DB, SQLite, and
    Microsoft SQL Server.
-   [`Knex.js`](https://knexjs.org/) - Designed to be flexible, portable
    and fun to run for MSSAL, MySQL, and Oracle, MariaDB, SQLite3 and
    Amazon Redshift.

### 11. Nodemon

A tool for monitoring helps developers based on Node.js applications by
automatically restarting the node application when file changes in the
app directory are detected. With Nodemon, you do not need any additional
changes to your code or method of development. It is a replacement
wrapper for the node. Nodemon is simple to use, you just need to replace
the word node with `nodemon` on the command-line when executing your
`script`. Ie
`nodemon ./server.js localhost 300`

**Example of other monitoring Frameworks include**

-   [`PM2`](https://www.npmjs.com/package/pm2) - Node.js production
    process manager that allows you to keep applications alive forever
    and reload without downtime to facilitate common system admin task.
-   [`Trace`](https://github.com/RisingStack/trace-nodejs) - Designed for
    microservices visualized stack trace platform.
-   [`Forever`](https://www.npmjs.com/package/forever) - CLI tool for
    ensuring that a given Node.js script runs continuously ie forever.

### 12. Restify

It is a Node.js web service framework, which is optimized for building
semantic RESTful web services (API) that are ready for production use at
scale.

**Why you should use Restify**

-   **Production-ready:** Optimizes for introspection and performance.
-   **Debuggable**: Trace problems back to the origin. It is built from
    a post-mortem debugging perspective.
-   **Semantically correct:** It has references littered all-over GitHub
    and the codebase.

**Examples of simple Restify practice**

#### i. SERVER
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
#### ii. CLIENT
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
#### iii. ROUTING
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
**Other Node.js API frameworks include:**

-   [`Actionhero`](http://www.actionherojs.com/) - API framework for both
    TCP sockets, web socket, and HTTP client that create reusable and
    scalable APIs.
-   [`FeathersJS`](http://feathersjs.com/) - A framework REST APIS and
    real-time layer for modern application.
-   [`Loopback`](http://loopback.io/) - Node.js and Typescript framework
    for building APIs and microservices.

### 13. Nodemailer

Nodemailer is Node.js application module that allows easy as cake email
sending.

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
A similar Module includes
[`Express-Mailer`](https://github.com/RGBboy/express-mailer), it sends Emails from your application and response object.

### 14. Gulp

It is a toolkit to automate slow, repetitive tasks that are
time-consuming in Node.js development workflow. These tasks include
cache-busting, optimization, concatenation, minifying files, etc.

**Why Gulp:**
-   It is easy to learn and simple to use.
-   Its integrations are built into major IDEs such as `.NET`, `PHP`, `Node.js`, `Java`.
-   It helps to automate time-consuming tasks in your Node.js development workflow.
Gulp is similar Module to
[`GruntJs`](https://www.npmjs.com/package/grunt) which is used to
automatically perform frequent tasks such are unit testing, Linting.

### 15. Molecular

It is a fast, modern, and powerful progressive microservices framework
for Node.js. It helps Node.js developers to build that are efficient,
reliable, and scalable services.

**Features of Molecular**

-   It uses promise based solutions ie Async/Await compatible.
-   It supports event-driven architecture with balancing.
-   Supports versioned services.
-   It has built-in caching solutions such as memory, memoryLRU, Reds.
-   It has built-in metrics feature with reporters such as Console, CSV,
    Datagod, StatsD.
-   Molecular has built-in tracing features with exporters such as
    Event, Jaeger, Zipkin.
-   It has a built-in service registry and dynamic service discovery.
-   Molecular employs a request-reply concept.
-   It has fault tolerance features such as Fallback, Timeout, Retry,
    Bullhead, Circuit Breaker.

**Other microservices frameworks for Node.js includes**

-   [`Micro`](http://github.com/zeithq/micro) - Asynchronous HTTP
    microservices framework.
-   [`Micro Panda`](https://github.com/zhaoyao91/micro-panda) - Node.js
    toolkit that helps to build microservices.
-   [`Micro -Whalla`](https://github.com/czerwonkabartosz/Micro-Whalla) -
    A framework for writing microservices in Node.js using RPC /IPC.
-   [`Seneca`](http://senecajs.org/) - Node.js microservice toolkit with
    plugins that look after the foundations of your app.
-   [`ServerLess`](https://github.com/serverless/serverless) - Build web,
    mobile, IoT applications with serverless architecture using AWS
    Lambda, Azure functions. Google cloundFuntions etc.

### 16. Agenda

Agenda is a lightweight job queue-scheduling library for Node.js

**Agenda library offers**

-   Even backed job queue.
-   Scheduling with configurable priority, concurrency and repeating.
-   It has promised based API.
-   Agenda is great when developing applications backed by MongoDB.
-   Agenda aims to keep it's codebase small, compact, and light.

**Similar Job scheduling and queuing library are**

-   [`CRON`](https://www.npmjs.com/package/cron) - allow you to execute
    something on a schedule.
-   [`Node Schedule`](https://www.npmjs.com/package/node-schedule) -
    Cron-like and not-clone-like Node.js job scheduler.

**Conclusion**
As a node.js developer, many open-source frameworks will help you
improve your skills to deliver professional applications that are light
and reliable. If you happen to be a Node.js developer, the combination of using
different frameworks in your app will explode you to another level and
you cannot work without Node.js packages in your day-to-day dev Node
development. **WISH YOU HAPPY CODING.**
