---
layout: engineering-education
status: publish
published: true
url: /engineering-education/history-of-nodejs/
title: The History of Node.js
description: Node.js is a runtime server environment that uses JavaScript on the server side and asynchronous programming. It is a free and open source technology that runs on various platforms (Mac OS X, Unix, Windows, etc.)
author: jethro-magaji
date: 2020-08-17T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/history-of-nodejs/hero.jpg
    alt:
---
Today we are going to talk about a revolutionary technology that is being used to build great web apps, it is called  *Node.js*.
You may have probably heard of it or worked with it(or have been curious about it in the past), either way you are welcome to join us as we further explore the History of Node.js in this article. We are going to talk about the history, some of the basics and a few use cases examples that use this revolutionary technology.
<!--more-->
![Nodejs image](https://drive.google.com/uc?export=view&id=1ChxgpCW0JTXiGTeV15QnuVHv-byDCLuO)
[source](https://www.simform.com/nodejs-use-case/)

### What is Node.js?
![Nodejs logo](https://drive.google.com/uc?export=view&id=13udtjL4Xz5YICREzII6hcHiv0xM8a_ds)
[source](https://www.w3schools.com/nodejs/nodejs_intro.asp)

Node.js is a runtime server environment that uses JavaScript on the server side and [asynchronous programming!](https://www.w3schools.com/nodejs/nodejs_intro.asp). It is a free and open source technology that runs on various platforms (Mac OS X, Unix, Windows, etc.)

- **Node.js can:**
    - create, open, read, write, delete, and close files on the server
    - generate the dynamic page content
    - collect form data
    - add, delete, change data in your database

- **Features**
    - Easy to learn
    - Fast
    - No Buffering
    - Consistent source code
    - Massive Library support

### The Early Beginnings
Believe it or not, Node.js is only twelve years old. In comparison, JavaScript is 26 years old and the Web is 32 years old.
[In 2009, Ryan Dahl wrote Node.js about thirteen ago](https://en.wikipedia.org/wiki/Node.js).  At first Nodejs supported only Mac OS X and Mac OS X.Dahl led the development and maintenance and later it was  [sponsored by Joyent](https://en.wikipedia.org/wiki/Node.js). 
The limited possibilities of the most popular web server  ["Apache HTTP Server"](https://en.wikipedia.org/wiki/Apache_HTTP_Server)   in 2009 was criticized by Dahl, because it had to handle a lot of connections concurrently (up to 10,000 and more) and when there was either a blocked code in the entire process or an implied multiple execution stacks in cases of simultaneous connections, this situation had to be resolved by creating code through [sequential programming](https://en.wikipedia.org/wiki/Sequential_algorithm). 
[On 8 November 2009 at the inaugural European JSConf the project was demonstrated by Dahl](https://en.wikipedia.org/wiki/Node.js). Node.js is a combination the V8 JavaScript chrome engine, a low-level I/O API and an event loop. 


### The Evolution
![Nodejs image evolution](https://drive.google.com/uc?export=view&id=1e91n-R0-W4S6UOffTNTnBdqyJKNqzOXN)
[source](https://nodejs.dev/learn/a-brief-history-of-nodejs)

As many browsers competed to offer users the best performance, JavaScript engines also became considerably better. Major browsers worked hard to finding ways to make JavaScript run quicker and offer better support for it.
It wasn't only luck that made Node.js popular today but it was built at the right place and time. It introduces a lot of approaches for JavaScript server-side development and [innovative thinking](https://nodejs.dev/learn/a-brief-history-of-nodejs) that has helped many developers.
Node.js have thousands of open-source libraries and the [npm website](https://www.npmjs.com/) is where most of them hosted. There are alot of developer events and conferences that support the Node.js community,these includes Node Interactive, Node Summit and NodeConf as well as other regional events.
Web frameworks has developed by the [Nodejs open-source community](https://nodejs.org/en/about/community/) to accelerate the development of applications. These frameworks include Connect, Sails.js, Koa.js, Express.js, Feathers.js, socket.io, Derby, Hapi.js, Meteor, and alots more.

**The journey so far**

* **In 2009**
    * The begining of [Node.js](https://nodejs.dev/)
    * [npm](https://www.npmjs.com/) was created
* **In 2010**
    * The begining of [Express](https://expressjs.com/) 
    * The begining of socket.io 
* **In 2011**
    * version 1.0 of npm was released
    * Companies Uber, LinkedIn, etc. started adopting Node.js
    * The begining of [hapi](https://hapi.dev/) started
* **In 2012**
    * Adoption continues and grew rapidly
* **In 2013**
    * [Ghost](https://ghost.org/) was first big blogging platform to use Nodejs
    * The begining of [Koa](https://koajs.com/) 
* **In 2014**
    * [io.js](https://github.com/nodejs/iojs.org) became a major fork of Node.js "The Big Fork", with the purpose of introducing ES6 support and moving faster
* **In 2015**
    * The Node.js Foundation began
    * IO.js is merged back into Node.js
    * npm introduces private modules
    * Node.js 4 (versions 1, 2 and 3 never previously released)
* **In 2016**
    * The leftpad incident
    * The begining of [Yarn](https://yarnpkg.com/) 
    * The begining of Node.js 6
* **In 2017**
    * [npm]((https://www.npmjs.com/)) focuses more on security
    * The begining of Node.js 8
    * HTTP/2
    * [V8](https://v8.dev/) introduces Node.js in its testing suite, officially making Node.js a target for the JS engine, in addition to Chrome
    * Up to3 billion npm downloads every week
* **In 2018**
    * The begining of Node.js 10
    * ES modules .mjs experimental support
* **In 2019**
    * The begining of Node 12 - 13
    * Work on [Deno](https://deno.land/) started to move server-side JS into the next decade with modern JavaScript support
* **In 2020**
    * The begining of Node 14 - 15
    * [GitHub](https://github.com/) (owned by Microsoft) acquired [NPM](https://www.npmjs.com/)

### Setting up Node.js 	
![Nodejs image setup](https://drive.google.com/uc?export=view&id=1zipo06_A5JDQiS3hfqO9TEiIjfwf5eua)
[source](https://www.w3schools.com/nodejs/nodejs_get_started.asp)

**First of all download Node.js**
Installation instructions for Node.js can be viewed at the official Node.js website: https://nodejs.org

After you have downloaded and installed Node.js on your computer, now we can try to display our first program "Hello World" in a web browser.

Let's create our first Node.js file named _"firstfile.js"_, and add then the following code:

> firstfile.js
``` javascript
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
```

The file is saved on your computer:   *C:\Users\YourName\firstfile.js*
This code tells the computer to display "Hello World!" when anyone with a web browser tries to access your computer on port 8080.

**Using Command Line Interface**
[To be able to access Node.js files it must be initiated in the "Command Line Interface" program of your computer.](https://www.w3schools.com/nodejs/nodejs_get_started.asp)
Depending on your operating system, opening the command line interface on your computer would vary. If your are a Windows users, click on the start button and look for "Command Prompt", or you can simply write "cmd" in the search field for quick search.

After opening the 'cmd'go to the folder contains the file _"myfirstfile.js"_, the command line interface window should look something like this:
> [C:\Users\YourName>](https://www.w3schools.com/nodejs/nodejs_get_started.asp)

**Initiating Node.js File**
Before any action can take place the file created must be initiated by Node.js
To start your command line interface, type "node myfirstfile.js" and press enter key:

> **_Initiating "firstfile.js":_**
> C:\Users\YourName>node firstfile.js

Hurray ! your computer is now a server.
Your computer is accessible on port 8080, "Hello World!" is  returned, if anyone tries to access it.
Open your internet browser, and type in: http://localhost:8080

### The Use Cases of Node.js
The usage of Node.js is not only limited to building web applications, but also for implementing various kinds of services.
  * Backends and servers
  * Frontends
  * Developing API
  * Microservices
  * Scripting and automation

Corporate users of Node.js software include GoDaddy, Groupon, IBM, LinkedIn, Microsoft, Netflix, PayPal, Rakuten, SAP, Voxer, Walmart, and Yahoo!.

**Node.js use case Infographic**

![Use cases image](https://drive.google.com/uc?export=view&id=1ozdLz3cdQkas1VttuwkXX4BkY3ehoxuJ)
[source](https://www.simform.com/nodejs-use-case/)

### Additional Readings
[A brief history of nodejs](https://nodejs.dev/learn/a-brief-history-of-nodejs)
[Nodejs get started](https://www.w3schools.com/nodejs/nodejs_get_started.asp)
[Nodejs intro](https://www.w3schools.com/nodejs/nodejs_intro.asp)
[Nodejs](https://en.wikipedia.org/wiki/Node.js)
[Nodejs use cases](https://www.simform.com/nodejs-use-case/)
