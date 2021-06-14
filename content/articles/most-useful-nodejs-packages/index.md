---
layout: engineering-education
status: publish
published: true
url: /most-useful-nodejs-packages/
title: Most Useful Node.js Packages
description: This article will cover the most useful Node.js packages such as Express, Async, Browserify, and Lodash.
author: joseph-chege
date: 2020-09-08T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:		
  - url: /engineering-education/most-useful-nodejs-packages/hero.jpg
    alt: Useful Node.js packages
---
The power of [Node.js](/history-of-nodejs/) is backed by open-source frameworks that form the ecosystem of JavaScript. As a Node.js developer, it is practically impossible to constantly avoid their advantage. With the help of Node.js packages, as a developer, you will conclusively save a lot of time and develop applications that are light, scalable, and high speed with tremendous productivity. [Check beginner's guide on getting started with NPM](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/).
<!--more-->
Let's have a look at packages that will assist you in extending your Node.js development skills.

### 1. Express
[Express.js](https://expressjs.com/) is the fastest, unopinionated, and simplest web framework for Node.js. It was flexibly created to build simple pages, multi-pages, and hybrid apps with robust features for web and mobile development. The framework is small with undisputed performances benefits. It is the leading Node.js framework designed to help you build web apps and APIs with powerful tooling for HTTP servers.

Node.js frameworks such as [`Sails`](https://www.npmjs.com/package/sails), [`Hapi`](/introduction-to-hapi/) and [`NestJS`](https://nestjs.com/) are built on Express. Express is available on the NPM registry.

#### Features of Express
-   Robust routing.
-   Focus on high-quality performance.
-   Superhigh test coverage.
-   HTTP helpers (such as redirection and caching).
-   Content negation.
-   Executable for developing apps and APIs faster.

### 2. AsyncJS
[Asynchronous](https://en.wikipedia.org/wiki/Async/await) is heavily used in Node.js to ensure a non-blocking operations flow. Asynchronous I/O permits other processing to continue even before the first transmission has finished.

It uses queues to monitor your workflow, allowing you to append additional tasks, attach extra callbacks, and handle errors with callbacks. This makes it a more versatile and robust solution for complex dependency management.

AsyncJS provides several functions that include usual functions such as '`map`', '`filter`', '`reduce`',' `filter`' and '`each`' as well as some common patterns for asynchronous flow control functions such as ('`parallel`' , '`series`' and '`waterfall`'). More details on [AsyncFunction](https://caolan.github.io/async/v3/global.html#AsyncFunction) here.

#### Advantages of using AsyncJS in your Node.js App Include
-   It supports inline functions and text strings.
-   Error handling from the dependency queue.
-   Use of AsyncLocalStorge within AsyncJS helps to create asynchronous states within callbacks and promise chain.
-   A collection of Async functions helps to control the flow through the script.
-   Help you avoid memory leaks.
-   Helps to integrate AsyncResource with EvenEmitter.
-   AsyncJS supports asynchronous functions.

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

#### Other Frameworks Related to AsyncJS Include
-   [`Limiter`](https://www.npmjs.com/package/limiter) - is used for rate-limiting based on request per `sec/hr`.
-   [`Co-async`](https://www.npmjs.com/package/co-async) - is inspired by Async for use with `co` and function generator. [Async v3](https://caolan.github.io/async/v3/)
-   [`Neo-async`](https://www.npmjs.com/package/neo-async) - focus on speed implementation of Async.

### 3. Browserify
[Browersify](http://browserify.org/) analyzes `require()` calls in your Node.js application to create a bundle that you can serve up to the browser in a single `<script>` tag. `Require()` is used to load modules installed by NPM i.e. `require('module')`. Browsers do not have the `require()` method defined but Node.js does. With Browserify, you can write code that uses `require()` just like you would use it in Node.js code.

Browserify simply compiles commonJS modules for the browser and structures everything neatly together. With Browserify, you don't need to constantly go back and forth between your code to analyze which packages and widgets are using specific scripts. Browserify loads every dependency and bundles them is a single file so that you will only have to make one reference.

This way, code becomes cleaner for Node.js developers for both front and back-end applications. You can use Browserify to create a client-side codebase that is well structured and easy to navigate.

If you have not tried Browserify yet, give it a shot in your next Node.js project and it will rock your application. It is a good choice if you want to keep order between your scripts.

### 4. Lodash
[Lodash](https://lodash.com/) is a modern JavaScript library that provides utility functions. Lodash is inspired by the famous [`Underscore.js`](https://www.npmjs.com/package/underscore) utility library. Lodash has built-in functions that make Node.js coding easier and cleaner. Instead of writing a common function repeatedly, you can use just a single line of code with the help of Lodash.

#### Reasons why you Should Choose Lodash
Lodash makes Node.js coding easier by taking the hassle out of working with common programing functions such as `arrays`, `objects`, `numbers`, `strings`, and `date` etc.

#### Lodash Utility Modular Methods are Dignified for
-   Interacting arrays, objects, and strings.
-   Manipulating and testing values.
-   Creating composite functions.

#### Lodash Comes with a Handful of Benefits to Node.js Developers Such as
-   Keeping your code minimal and neat.
-   You only need to remember the Lodash functions, making it easier to code.
-   Even new programmers can understand Lodash.

#### Other Utility Libraries Include
-   [`Underscore.js`](https://underscorejs.org/) - Underscore.js provides useful functional programming helpers without having to extend any built-in objects.
-   [`Futil`](https://github.com/smartprocure/futil-js) - Futil is designed to complement Lodash's functional utilities.

Lodash remains one of the most downloaded Node.js modules in the NPM repository. Try it out in the back-end and use their CDN for the front-end.

### 5. Moment.js
[Moment.js](https://momentjs.com/) is a lightweight JavaScript development tool for date and time manipulation. It makes dates and times easy to format, parse, validate, and internationalize using a clean and concise API.

Node.js date objects are not that bad but it requires a lot of coding for complex parsing, validation, and displaying date and time objects.

To use Moment.js with Node.js, install the module using the command `npm install moment`. Then simply use `require()` in your application as in the following example:

```js
const moment = require('moment');
const today = moment();
console.log(today.format());
```
**OUTPUT: 2020-08-27T09:21:49+01:00**

Moment.js can still run from the browser. It creates a global moment object, which is used to access date and time parsing, and manipulation. Include `<script>` as in the example below.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
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

Moment.js is an awesome Node.js package. It simplifies date and time parsing, manipulation and validation. If you have a Node.js application that uses date and time objects, consider trying Moment.js. It will help you solve any date and time problems in your application.

Moment.js supports international languages for different time and date formats which is a good thing to have in your application if you are developing an application with multiple languages.

#### Other Validator and Formatting Libraries Include
-   [`Validator.js`](https://github.com/validatorjs/validator.js) - Validator.js is a library for string validators and sanitizing.
-   [`Express-validator`](https://www.npmjs.com/package/express-validator) - Express-validator is an Express middleware for Validator.js.

### 6. Axios
[Axios](https://github.com/axios/axios) is an HTTP client API framework that supports promises to perform a request. Requests are used to make a communication with the server, then a framework like Axios will return a response with a promise to whether your request was fulfilled or rejected. Axios performs requests such as `GET`, `POST`, `DELETE` and `PUT`.

#### Why You Should Choose Axios
-  Allows you to make simultaneous requests
-  Axios supports promised base requests
-  Transforms responses and requests to JSON data
-  Requests and responses interceptions
-  Support HTTP requests for Node.js apps
-  Supports HTTP requests from the browsers i.e. [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
-  Has security support against cross-site request forgery ([XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery)).

Axios is gaining a lot of popularity among many developers. This is due to its strong third-party extensions such as [`Axios-fetch`](https://github.com/lifeomic/axios-fetch), [`Axios-debug-log`](https://github.com/Gerhut/axios-debug-log),
[`Axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter),
[`Axios-api-versioning`](https://github.com/Weffe/axios-api-versioning),
[`Axios-vcr`](https://github.com/nettofarah/axios-vcr) and many more.

#### Other HTTP REST Client Libraries Include
-   [`Method-override`](https://github.com/expressjs/method-override) - Lets you use HTTP methods such as `DELETE`, `POST` and `GET` provided from `getter` options.

### 7. JSHint
[JSHint](https://jshint.com/about/) is a static analysis tool for JavaScript. It detects errors and potential problems in code. Linting tools help Node.js developers analyze common bugs in their code without their focused attention. Linters analyses the code for them.

JSHint scans your Node.js program and reports commonly made mistakes and potential bugs such as syntax errors, leaking variables, implicit type, and conventions etc.

[`ESLint`](/node-eslint/) is similar to JShint package, used for linting (enhancing code quality).

### 8. Morgan
[Morgan](https://www.npmjs.com/package/morgan) is an HTTP request logger middleware for Node.js applications, named after [Dexter](https://en.wikipedia.org/wiki/Dexter_Morgan). Morgan gives you insights on how your app is being used and alerts you on potential errors and issues that could be threats to your application. Morgan is considered the most reliable HTTP logger by Node.js developers.

You can choose to use [`Winston`](https://www.npmjs.com/package/winston) as an alternative library for logging.

### 9. Karma
As a Node.js developer, you need to test your application to make sure it is stable, reliable, and showcasing good performance. [Karma](https://www.npmjs.com/package/karma) is the tool for this job. The main aim of Karma is to provide developers a productive testing environment.

#### Why You Should Choose Karma
-   Tests code in real browsers
-   Tests code in multiple browsers (desktop, mobile phones and tablets)
-   It tests on real devices such as mobile phones, tablets or even headless PhantomJS
-   Controls the whole testing workflow from your command or IDE
-   Karma executes your tests after every save
-   It executes tests locally during development
-   It executes your tests on a continuous integration server

For more information on Karma refer to the [Karma documentation](https://www.npmjs.com/package/karma).

#### Other Node.js Testing Libraries Include
-   [`Mocha`](https://www.npmjs.com/package/mocha) - helps you to carry out asynchronous tests
-   [`Chai`](https://www.chaijs.com/) - is a BDD/TDD assertion library for Node.js and browsers that can be paired with any JavaScript testing framework
-   [`Jest`](https://jestjs.io/) - JavaScript testing framework which focuses on simplicity

### 10. MySQL
[MySQL](https://en.wikipedia.org/wiki/MySQL) is a Node.js client for the MySQL protocol. Before using MySQL to connect to your database, ensure you have [MySQL installed and configured](https://dev.mysql.com/doc/mysql-getting-started/en/) in your machine. Then create a database and database table that you can work with. Check instructions on how to create [MySQL database and tables](https://www.guru99.com/how-to-create-a-database.html).

#### An Example on how to use MySQL with Node.js
**myexample.js**

```js
//use require() to include MySql library
const {createConnection} = require('mysql');
//you need to create a connection to the database
//make sure you replace 'user' and 'password' with your correct values
//create connection
const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my_database",
})
connection.query(`select * from names`, function (err, result, fields) {
//log error
    if (err) {
        return console.log(err);
    }
// log results    
    return console.log(result);
})
connection.end();
//terminate connection
//executes the remaining queries
//send quit packet to your MySql server
//end
```

Run `node myexample.js` to get the output.

From the example above:
-   Every method that you invoke on a database connection is queued and executed in sequence.
-   To terminate/close the connection use `end()`, this makes sure that all the remaining queries are executed before sending a quit packet to the MySQL server.

#### Other MySQL and Helper Frameworks Include:
-   [`Sequelize`](https://www.npmjs.com/package/sequelize) - a promised based Node.js Object-Relation Mapping for MySQL, SQLite, Maria DB, Postgres, and Microsoft SQL Server.
-   [`Knex.js`](https://knexjs.org/) - is designed to be flexible, portable, and fun to run for MSSAL, MySQL, Oracle, MariaDB, SQLite3, and Amazon Redshift.

#### Some Mongo Database and Helper Frameworks Include
-   [`Mongoose`](https://www.npmjs.com/package/mongoose) - is a [MongoDB](https://www.mongodb.com/) object modeling tool for asynchronous environments.
-   [`Mongoose Paginate v2`](https://www.npmjs.com/package/mongoose-paginate-v2) - used for pagination query for Mongoose.

### 11. Nodemon
[Nodemon](https://www.npmjs.com/package/nodemon) is a monitoring tool and it helps Node.js developers by automatically restarting an application when file changes in the app directory are detected. With Nodemon, you do not need any additional code or development method changes. It is a replacement wrapper for Node.js.

Nodemon is simple to use. To get started, install Nodemon globally to your system path by running `npm install -g nodemon` or `npm install --save-dev nodemon` to install it locally as a development dependency.

For global installations, you need to replace the word node with `nodemon` on the command-line when executing your `script`, i.e. `nodemon ./server.js localhost 300` but for local installations, you need to use `npx nodemon`, i.e. `npx nodemon ./server.js localhost 300`.

#### Example of Other Monitoring Frameworks Include
-   [`PM2`](https://www.npmjs.com/package/pm2) - is a Node.js process manager that allows you to keep applications alive forever and reload with no downtime.
-   [`Trace`](https://github.com/RisingStack/trace-nodejs) - is designed for microservices and is a visualized stack trace platform.
-   [`Forever`](https://www.npmjs.com/package/forever) - is a CLI tool that ensures Node.js scripts runs continuously i.e. forever.

### 12. Restify
[Restify](http://restify.com/) is a Node.js web service framework, which is optimized for building semantic and RESTful web services (APIs) that are ready for production use at scale.

#### Why You Should Use Restify
-   Production-ready - Optimized for introspection and performance.
-   Debuggable - Traces problems back to the origin. It is built from a post-mortem debugging perspective.
-   Semantically correct - It has references littered all-over GitHub and the codebase.

#### The Applications of Restify
##### i. [Build a server](http://restify.com/docs/server-api/)

It is easier and handy to set up a server using the Restify framework.

##### ii. [Client API](https://www.npmjs.com/package/restify-clients)
Restify supports three clients namely

-   JsonClient - Restify's highest-level client that maps direct to HTTP with `PUT`, `GET` and `POST` methods.
-   StringClient - deals with raw HTTP by default. JsonClient is built on StringClient.
-   HttPClient - Restify's lowest-level client for steaming with Restify.

To get started install `restify-clients` extension using command `npm install restify-clients`.

##### iii. [Routing](https://github.com/ukayani/restify-router)
Defines your routes using Router interfaces and apply them to a Restify server instances. To get started routing run command `$npm install --save restify-router`.

#### Other Node.js API Frameworks Include:
-   [`Actionhero`](https://www.npmjs.com/package/actionhero) - is an API framework for both TCP sockets, web sockets, and HTTP clients that creates reusable APIs.
-   [`FeathersJS`](https://www.npmjs.com/package/@feathersjs/feathers) - is a framework for REST APIs and is a real-time layer for modern applications.
-   [`Loopback`](https://loopback.io/doc/en/lb4/Getting-started.html) - is a Node.js and Typescript framework for creating APIs and microservices.

### 13. Nodemailer
[Nodemailer](/node-mailer/) is a Node.js application module that allows easy as pie email sending.

#### Example of how Nodemailer works

```js
"use strict";
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
*[Code source](https://nodemailer.com/about/)*

[Express-Mailer](https://github.com/RGBboy/express-mailer) is a similar module to Nodemailer used to send emails from your application and response object.

### 14. Gulp
[Gulp](https://gulpjs.com/) is a toolkit to automate slow and repetitive tasks that are time-consuming in the Node.js development workflow. These tasks include cache-busting, optimization, concatenation, and minifying files etc.

#### Why Gulp
-   It is simple to learn and easy to apply.
-   Its integrations are built into major IDEs such as `.NET`, `PHP`, `Node.js`, and `Java`.
-   It helps to automate time-consuming tasks in your Node.js development workflow.

Gulp is a similar module to [`GruntJS`](https://www.npmjs.com/package/grunt) which is used to automate common tasks which include compilation, unit testing, and linting.

### 15. Molecular
[Molecular](https://moleculer.services/) is a fast and modern powerful microservices library for Node.js. It helps Node.js developers to build applications that are efficient, reliable, and scalable.

#### Features of Molecular
-   It uses promise based solutions i.e. Async/Await compatible.
-   It supports event-driven architecture with balancing.
-   Supports versioned services.
-   It has built-in caching solutions such as memory, memoryLRU, and Reds.
-   It has built-in metrics feature with reporters such as Console, CSV, Datagod, and StatsD.
-   Molecular has built-in tracing features with exporters such as Event, Jaeger, and Zipkin.
-   It has a built-in service registry and dynamic service discovery.
-   Molecular employs a request-reply concept.
-   It has fault tolerance features such as Fallback, Timeout, Retry, Bullhead, and Circuit Breaker.

#### Other Microservices Frameworks for Node.js Includes
-   [`Micro`](https://www.npmjs.com/package/micro) - is an Asynchronous HTTP microservices framework.
-   [`Micro Panda`](https://github.com/zhaoyao91/micro-panda) - is a Node.js toolkit that helps build microservices.
-   [`Seneca`](https://www.npmjs.com/package/seneca) - is a Node.js microservice toolkit with plugins that helps to organize the logic of your app.
-   [`ServerLess`](https://github.com/serverless/serverless) - builds web, mobile, and IoT applications with serverless architectures using AWS Lambda, Azure functions, and Google Cloud functions etc.

### 16. Agenda
[Agenda](https://github.com/agenda/agenda) is a lightweight job queue-scheduling library for Node.js.

#### The Agenda Library Offers
-   Even backed job queue.
-   Schedule and configure priority, concurrency, and repeating.
-   It has a promised based API.
-   Agenda is great when developing applications backed by MongoDB.
-   Agenda aims to keep its codebase small, compact, and light.

#### Similar Job Scheduling and Queuing Libraries are
-   [`Cron`](https://www.npmjs.com/package/cron) - allows you to execute commands on a schedule.
-   [`Node Schedule`](https://www.npmjs.com/package/node-schedule) - is a cron-like Node.js job scheduler.

### Conclusion
As a Node.js developer, there are many open-source frameworks that will help you improve your skills on delivering professional applications that are lightweight and reliable.

If you happen to be a Node.js developer, the combination of using different frameworks in your app will propel you to another level. You cannot work without Node.js packages in your day-to-day Node.js development.

I wish you a happy time coding.

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
