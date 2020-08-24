---
layout: engineering-education
status: publish
published: true
url: /engineering-education/10-tips-working-with-nodejs/
title: 10 Tips for Working with Node.js	
description: Discover ten of the common tips you need to know from	
getting started to deploying your first Node.js application.	
author: joseph-chege
date: 2020-08-22T00:00:00-10:00	
topics: [Node.js]	
excerpt_separator: <!--more-->	
images:		
  - url: /engineering-education/10-tips-for-working-with-nodejs/hero.jpg	
    alt: laptop node.js website
---
As a developer getting started with Node.js application development,
there a few basic skills that you need to be familiar with as you move
along to build your first Node.js application.

This article will cover some of the common tips you need to know in order to have a strong background to get started with Node.js application development.

## 1. Understand Node.js Package Manager (NPM)

NPM is an easy to use package manager for the Node.js platform. It helps to install packages and manage versions and dependencies. NPM helps to install the package you want with just a single command. To use NPM, you need Node.js to be installed on your computer. For OS X and Windows, the Node.js installer has an easy to use interface and NPM is included. Developers using Linux need to run the following command in their package manager to set up Node.js and NPM.

```bash
sudo apt-get update

sudo apt-get install node

sudo apt-get install npm
```

You can then verify Npm installation by writing the following in your
terminal `npm -v` or if you realize you have an older version run `npm
install npm -g` (for Windows) or `npm install -g npm\@latest` (for Linux
and Mac) to update to the current Npm version. 

Npm helps to install Node.js modules. For example, you just need to write `npm install` followed by your specified module i.e `npm install express`, once the package is installed you will be able to use `require ()` on your Node.js project and they will run just as if they were built-ins. 

Another important aspect of Npm is dependency management. You can run `npm
install` in your root folder and any listed dependency in your package.json (if you have one) will be installed. This will help mostly when installing Node.js projects from git repositories. For example, `vow` (Node.js testing framework) can be installed from git and its single dependency
`eye` can automatically be installed i.e.

```bash
git clone https://github.com/clonehad/vows.git

cd vows

npm install
```

## 2. Understand A to Z Most Useful Node.js. Modules and Frameworks

The power of Node.js backed by hundreds of packages that make it easier to
write your program. The packages are open source and they are the
ecosystem of Node.js applications. Every Node.js developer will always
interact with these packages to get a more efficient development
workflow.

Here's a list of some of the most useful libraries that will help
you ease the development of Node.js applications.

-   [Express](http://expressjs.com/): It is a web application framework for
    Node.js that handles robust APIs and Web servers.

-   [Gulp](https://www.npmjs.com/package/gulp): Helps to automate
    development workflow. It helps to automate simple tasks in the
    development of web applications.

-   [Moment](https://www.npmjs.com/package/moment): An insubstantial
    JavaScript date library for parsing, validating, manipulating, and
    formatting dates.

-   [Async](https://caolan.github.io/async/v3/): It is a utility module 
    that provides powerful straightforward functions for working with asynchronous JavaScript.

-   [Lodash](https://lodash.com/): Makes JavaScript easier by taking out
    the irritation of working with arrays, numbers, objects, strings,
    etc.

-   [JSHint](https://www.npmjs.com/package/jshint): Detect
    errors and potential problems in your Node.js (JavaScript) code. You can easily adjust it in the environment you expect your code to execute.

-   [Cheerio](https://cheerio.js.org/): Commonly used for web page
    scraping. It implements the subset of jQuery and removes `DOM`
    inconsistency and browser cleverness to extract API endpoint URLs
    from web pages.

-   [Browserify](https://github.com/browserify/browserify): It analyses
    `require ()` calls in your Node.js application to create a bundle that
    you can serve the browser in a single `<script>` tag.

-   [Nodemailer](https://nodemailer.com/about/): Allows (easy as cake)
    emails sending.

You can have a look at more available library on
[GitHub](https://github.com/aravindnc/A-to-Z-List-of-Useful-Node.js-Modules)

## 3. HTTP module for your Node.js. server

Node.js. has a built-in module called HTTP (Hypertext Transfer
Protocol). It helps in making requests as a client and running the
server to accept requests and return responses. In this case, when you
visit a webpage from a browser, you make a request to another computer
(webserver) via the internet, which then provides you the webpage
response. The webserver receives HTTP requests from the client, which
listens to a server port and provides an HTTP response for example a
HTML Page. To use HTTP and client server in Node.js you must use `require
('http');`. Let's look at a simple Hello World HTTP Server module that
will listen on port no 3000.
```js
var http = require('http')

var server = http.createServer((function(request, response) {

    response.writeHead(200, { "Content-Type\": "text/plain" });

    response.end("Hello World\n");

}));
server.listen(3000);
```
When you type localhost:3000 on your browser, The Output will be Hello
World.

Check [MORE](https://www.section.io/engineering-education/http-requests-nodejs/) on working HTTP with Node.js.

## 4. Embracing asynchronous Node.js functions

Asynchronous is heavily used in Node.js to ensure non-blocking
operations flow. It enables a system to handle thousands of concurrent
requests and process gigabytes of data with a small amount of RAM. Asynchronous I/O permits other processing to continue even before the first transmission has finished. Asynchronous helps to avoid the so-called "Call-back Hell"

Example of async/await in Node.js:
```js
async function myFunction(inputValue) {

    try {

        const a = await asyncFunc1('value');

        const b = await asyncFunc2(a);

        const c = syncFunc3(b);

        return await asyncFunc4(c);

    } catch (ex) {

        *// handle exception*

    }

}
```
In this scenario, we can see it is obvious that functions 1,2and 4 are
asynchronous.

## 5. Handling Node.js Errors

> The common Node.js errors are:![Node.js_error_types](/engineering-education/10-tips-for-working-with-node.js/node.js_error_types.png)

In Node.js, errors are handled through exceptions. For example, if we
have an error that would occur when we divide a number by zero, our
Node.js application will crash, so then we need to handle the error to
continue with the normal execution of our application i.e.
```js
try {

    var m = 1;

    var n = 1 / 0;

} catch (err) {

    *//Handle the error here.*

    *//the application does do something to execute the error without having to make our application crash*

}
```

## 6. Debugging Node.js Programs

Each code for developing an application must go around several debugging
techniques. Node.js developers interest must find a way on
how to handle bugs that may arise during application development. The
commonly used approach for debugging Node.js. application is `console.log`
```js
*// writing a hello world to console: *
console.log(\"hello world\");
```
`Console.log` is provided by internet browsers such as Chrome DevTool, it
have debug protocols ported into a Node.js module and can be used to
debug Node apps. It requires you to    `install node -inspector` (`npm install
-g node -inspector`) then run ` node-debug app.js --debug-brk` it will
open up Chrome Developer Tool and you can start debugging your app. You
can as well use Node.js built-in debugger by running `node debug app.js`.
Alternatively, use `watchers` in `expressions` and `variables`. To start
watching an `expression`, include `watch ('my expression');` the command
`watcher` will print active watchers. To remove a watcher you can use line
`unwatch ('my expression');` Remember to check
out [MORE](https://www.section.io/engineering-education/debug-nodejs-vscode/)
ON SECTION.IO efficient ware to deal with bugs from your app.

## 7. Always keep your code simple and light

It is important to keep the Node.js codebase compact and shallow to
reduce the latency and speed up the response time of the application. Some devices are slower and their latencies are higher thus
you need to keep the code small, well-arranged executions and light. These
same ideas should be applied to your server code as well. While writing
your Node.js code ensure proper and appropriate naming of things for
better referencing. This will serve as Documentation of your application
and make it easier to go back to your code when changes are required.
Better code quality helps in easier code maintainability

## 8. Security practices for your server

As you get started with Node.js, try to secure your application by
proper coding, tooling, and operations.

The main practices that will help to develop secure Node.js application include

-   Set up the secure HTTP headers.

-   Do a static review of your codebase.

-   Handle error carefully (error codes and stack traces).

-   Regularly use strict mode i.e. restricted variant, undeletable
    properties, validation, and authentication.

-   Do proper session management such as HTTP only.

-   Set cookie scope and cookie flags.

-   Avoid command injection.

-   Check for any vulnerabilities using `retire.js`. Retire.js will assist
    you to recognize module versions with associated vulnerabilities,
    install it using command `npm install -g retire`, later after running
    it, retire command will scan any vulnerability present in your
    application.

-   Constantly audit all the modules you have in your Node.js.
    Application using CLI Node Security Platform. Node Security CLI uses
    Command `nsp`, which allows auditing of `package.json` or
    `npm-shrinkwrap.json` to check unsafe modules. Run `npm install nsp -global` from your application project directory `nsp check` to start the check.

Subsequently, practice testing before application deployment to make
sure that your app passes all security demands.

## 9. Deploying your Node.js. application

After finishing application development processes, testing its features and security preferences , your Node.js application is now ready for production. The most common Node.js deployment ways are
either PaaS provider such as Heroku and [DigitalOcean](https://www.section.io/engineering-education/deploying-nodejs-web-app/) or
using [Docker](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

Let's look in brief how to deploy to Heroku;

To get started on Heroku with Node.js.
Download Heroku CLI for your app. You need to have Node.js version to be
higher than 8 check `node -v`

Then confirm that that Heroku is installed by running `heroku -v` then
`heroku login` to start your Heroku server account. Ensure you have git
installed (`git install`) and usable on the top-level directory of your
application. Use `git status` command to check if git exists on your
directory. If not, make a git directory (`git init`) then `git add`. 
Now you need to commit the files you have added to git by `git commit -m` "initial
commit" command. Now you can create the Heroku application using command
`heroku create`, this will create a git remote that is connected to your
git repository. You can now deploy your application to the Heroku
server, use `git push heroku master`. You can then `heroku open` to open
your application on your browser.
Check [MORE](https://www.section.io/engineering-education/deploying-nodejs-web-app/) on
how to deploy your first Node.js application 

## 10 Monitoring your Node.js application

Monitoring helps to get the insights of your production application to ensure a fast, stable and reliable system. Insights are critical in helping
to detect performance problems of your system. As a developer, you need
to know your system downtimes even before your customers start to
complain about how your system is faulty thus you need real-time
alerting for you to be notified immediately. Proper monitoring helps to
get insight features of your application's behaviour. You need to know
how much time does your app takes to run each function in the production
environment. In addition, if you are using microservices, you need to
monitor network connections and lower delays in the communication
between two services. Node.js application monitoring has two main segments:

### i. Server monitoring

This revolves around your host machine. You need to constantly be
checking:

-   Disk space.

-   CPU memory.

-   CPU Time.

-   CPU profiling.

-   Network.

### ii. Application monitoring

This revolves around monitoring the health of your application instances
such as

-   Databases.

-   Handling Requests.

-   Response Time.

-   Server Requests.

Node.js monitoring frameworks include:

[Hapi](https://github.com/hapijs/hapi), [Mojito](https://mojito.mx/docs/home), [Geddy](https://github.com/geddy/geddy), [Restify](http://restify.com/),

[Trace](https://trace.risingstack.com/), [Derby](https://derbyjs.com/), [Express](https://expressjs.com/), [Flatiron](https://github.com/flatiron/flatiron),

[Koa](https://koajs.com/), [Zabbix](https://www.zabbix.com/) , e.t.c

## Conclusion

As a Node.js developer, there are many concepts you need to be familiar
with for you to have a good Node.js application. Check out what you need
to know, learn, and be able to apply that in your system and all will be
good. Wish you the best as you learn to work with Node.js.
