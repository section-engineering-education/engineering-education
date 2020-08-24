---
layout: engineering-education
status: publish
published: true
url: /engineering-education/history-of-nodejs/
title: The History of Node.js
description: Node.js is a runtime server environment that uses JavaScript on the server side and asynchronous programming. It is a free and open source technology that runs on various platforms (Mac OS X, Unix, Windows, etc.)
author: jethro-magaji
date: 2020-08-24T00:00:00-08:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/history-of-nodejs/hero.jpg
    alt: hero example image computer Node.js
---
Today we are going to talk about a revolutionary technology that is being used to build great web applications, it is called  *Node.js*.
You may have probably heard of it or worked with it (or have been curious about it in the past), either way you are welcome to join us as we further explore the History of Node.js in this article. We are going to talk about the history, some of the basics, and a few use case examples that use this revolutionary technology.
<!--more-->
![Nodejs image](/engineering-education/history-of-nodejs/nodejs-use-cases-cover-image.png)
[*Image Source*](https://www.simform.com/nodejs-use-case/)

### What is Node.js?
Node.js is a runtime server environment that uses JavaScript on the server side and [asynchronous programming](https://www.w3schools.com/nodejs/nodejs_intro.asp). It is a free and open source technology that runs on various platforms (Mac OS X, Unix, Windows, etc.)

- **Node.js can:**
    - Create, open, read, write, delete, and close files on the server
    - Generate the dynamic page content
    - Collect form data
    - Add, delete, change data in your database

- **Features**
    - Easy to learn
    - Fast
    - No buffering
    - Consistent source code
    - Massive library support

### The Early Beginnings
Believe it or not, Node.js is only 12 years old. In comparison, JavaScript is 26 years old and the Internet is 32 years old.
In 2009, [Ryan Dahl wrote Node.js](https://en.wikipedia.org/wiki/Node.js). At first Node.js supported only Mac OS X and Linux. Dahl led the development and maintenance and later it was [sponsored by Joyent](https://en.wikipedia.org/wiki/Node.js).

The limited possibilities of the most popular web server at the time ["Apache HTTP Server"](https://en.wikipedia.org/wiki/Apache_HTTP_Server) in 2009 was criticized by Dahl, because it had to handle a lot of connections concurrently (up to 10,000 and more) and when there was any blocked code in the entire process or an implied multiple execution stack in cases of simultaneous connections, it would lead to issues, and this situation had to be resolved by creating code through [sequential programming](https://en.wikipedia.org/wiki/Sequential_algorithm).

On November 8th 2009 at the inaugural European JSConf the Node.js project was [first demonstrated by Dahl](https://en.wikipedia.org/wiki/Node.js). Node.js is a combination the V8 JavaScript chrome engine, a low-level I/O API and an event loop.

### The Evolution
As many browsers competed to offer users the best performance, JavaScript engines also became considerably better. Major browsers worked hard on finding ways to make JavaScript run quicker and offer better support for it.
It wasn't only luck that made Node.js popular today, but it was also built at the right place and time. It introduced a lot of approaches for JavaScript server-side development and [innovative thinking](https://nodejs.dev/learn/a-brief-history-of-nodejs) that has helped many developers.
Node.js has thousands of open-source libraries and the [npm website](https://www.npmjs.com/) is where most of them are hosted.

There are a lot of developer events and conferences that support the Node.js community, these includes Node.js Interactive, Node.js Summit and NodeConf as well as other regional events.

Web frameworks were developed by the [Node.js open-source community](https://nodejs.org/en/about/community/) to accelerate the development of applications. These frameworks include Connect, Sails.js, Koa.js, Express.js, Feathers.js, socket.io, Derby, Hapi.js, Meteor, and a lot more.

**The journey so far**

- **In 2009**
    - The beginning of [Node.js](https://nodejs.dev/)
    - [npm](https://www.npmjs.com/) was created
- **In 2010**
    - The beginning of [Express](https://expressjs.com/)
    - The beginning of socket.io
* **In 2011**
    - Version 1.0 of npm was released
    - Companies Uber, LinkedIn, etc. started adopting Node.js
    - The beginning of [hapi](https://hapi.dev/) started
* **In 2012**
    - Adoption continues and growing rapidly
* **In 2013**
    - [Ghost](https://ghost.org/) was a first big blogging platform to use Nodejs
    - The beginning of [Koa](https://koajs.com/)
* **In 2014**
    - [IO.js](https://github.com/nodejs/iojs.org) became a major fork of Node.js "The Big Fork", with the purpose of introducing ES6 support and moving faster
* **In 2015**
    - The Node.js Foundation began
    - IO.js is merged back into Node.js
    - npm introduces private modules
    - Node.js 4 (versions 1, 2 and 3 never previously released)
* **In 2016**
    - The [leftpad incident](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/)
    - The beginning of [Yarn](https://yarnpkg.com/)
    - The beginning of Node.js 6
* **In 2017**
    - [npm]((https://www.npmjs.com/)) focuses more on security
    - The beginning of Node.js 8
    - HTTP/2
    - [V8](https://v8.dev/) introduces Node.js in its testing suite, officially making Node.js a target for the JS engine, in addition to Chrome
    - Up to 3 billion npm downloads every week
* **In 2018**
    - The beginning of Node.js 10
    - ES modules .mjs experimental support
* **In 2019**
    - The beginning of Node 12 - 13
    - Work on [Deno](https://deno.land/) started to move server-side JS into the next decade with modern JavaScript support
* **In 2020**
    - The beginning of Node 14 - 15
    - [GitHub](https://github.com/) (owned by Microsoft) acquired [npm](https://www.npmjs.com/)

### Setting up Node.js 	
**First of all download Node.js**

Installation instructions for Node.js can be viewed at the official Node.js website: https://nodejs.org

After you have downloaded and installed Node.js on your computer, we can now try to display our first program "Hello World" in a web browser.

Let's create our first Node.js file named *"firstfile.js"*, and add then the following code:

> firstfile.js
``` JavaScript
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
```

The file is saved on your computer: *C:\Users\YourName\firstfile.js*

This code tells the computer to display "Hello World!" when anyone with a web browser tries to access your computer on port 8080.

**Using Command Line Interface**

To be able to access the Node.js files it must be initiated in the ["Command Line Interface" program of your computer.](https://www.w3schools.com/nodejs/nodejs_get_started.asp)
Depending on your operating system, opening the command line interface on your computer would vary. If your are a Windows user, click on the start button and look for "Command Prompt", or you can simply write "cmd" in the search field for a quick search.

After opening the 'cmd' go to the folder containing the file *"myfirstfile.js"*, the command line interface window should look something like this:

`[C:\Users\YourName>]`

**Initiating Node.js File**

Before any action can take place, the file created must be initiated by Node.js

To start your command line interface, type "node myfirstfile.js" and press the Enter key:

***Initiating "firstfile.js":***

`C:\Users\YourName>node firstfile.js`

Hurray! Your computer is now a server.
Your computer is accessible on port 8080, "Hello World!" is returned, if anyone tries to access it.
Open your internet browser, and type in: http://localhost:8080

### The Use Cases of Node.js
Node.js usage is not only limited to building web applications, but it can also be used for implementing various kinds of services such as:
  - Backends and servers
  - Frontends
  - Developing APIs
  - Microservices
  - Scripting and automation

A few corporate users of Node.js software include GoDaddy, Groupon, IBM, LinkedIn, Microsoft, Netflix, PayPal, Rakuten, SAP, Voxer, Walmart, and Yahoo!.

**Node.js use case Infographic**

![Use cases image](/engineering-education/history-of-nodejs/nodejs-use-case-infographic.png)
[*Image Source*](https://www.simform.com/nodejs-use-case/)

### Additional Readings
[A brief history of Node.js](https://nodejs.dev/learn/a-brief-history-of-nodejs)

[Node.js getting started](https://www.w3schools.com/nodejs/nodejs_get_started.asp)

[Node.js intro](https://www.w3schools.com/nodejs/nodejs_intro.asp)

[Node.js](https://en.wikipedia.org/wiki/Node.js)

[Node.js use cases](https://www.simform.com/nodejs-use-case/)
