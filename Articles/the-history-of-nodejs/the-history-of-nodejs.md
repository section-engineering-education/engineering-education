![Hero image](https://drive.google.com/uc?export=view&id=1JWA1q1lTVb8Vy2EfYUSQrOmtdZ7ICuv8)


# THE HISTORY OF NODE.JS
![Nodejs image](https://drive.google.com/uc?export=view&id=1ChxgpCW0JTXiGTeV15QnuVHv-byDCLuO)
Today we are going to talk about a revolutionary technology that is used to build great web apps, it’s called  **_“Node.js”_**. You might have probably heard or not heard of it or worked or not worked with it, either ways you are welcome to this article. Here, we are going to talk about the history, basics and use cases about this revolutionary technology.

### What is Node.js?
![Nodejs logo](https://drive.google.com/uc?export=view&id=13udtjL4Xz5YICREzII6hcHiv0xM8a_ds)

Node.js is an open source server environment that is free and runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.) which uses JavaScript on the server.
Node.js uses asynchronous programming!

* **Node.js can easily:**
    * generate the dynamic page content
    * create, open, read, write, delete, and close files on the server
    * collect form data
    * add, delete, modify data in your database

* **Features**
    * Fast
    * No Buffering
    * Easy to learn
    * Massive Library support
    * Consistent source code



### The Early Beginnings
Believe it or not, Node.js is only twelve years old. In comparison, JavaScript is 26 years old and the Web is 32 years old.
Node.js was written initially by Ryan Dahl in 2009, about thirteen years after the introduction of the first server-side JavaScript environment, Netscape's LiveWire Pro Web. The initial release supported only Linux and Mac OS X. Its development and maintenance was led by Dahl and later sponsored by Joyent. 
Dahl criticized the limited possibilities of the most popular web server in 2009, Apache HTTP Server, to handle a lot of concurrent connections (up to 10,000 and more) and the most common way of creating code (sequential programming), when code either blocked the entire process or implied multiple execution stacks in the case of simultaneous connections. 
Dahl demonstrated the project at the inaugural European JSConf on 8 November 2009. Node.js combined Google's V8 JavaScript engine, an event loop, and a low-level I/O API. 


### The Evolution
![Nodejs image evolution](https://drive.google.com/uc?export=view&id=1e91n-R0-W4S6UOffTNTnBdqyJKNqzOXN)

JavaScript engines also became considerably better as many browsers competed to offer users the best performance. Development teams behind major browsers worked hard to offer better support for JavaScript and find ways to make JavaScript run faster. The engine that Node.js uses under the hood, V8 (also known as Chrome V8 for being the open-source JavaScript engine of The Chromium Project), improved significantly due to this competition.
Node.js happened to be built in the right place and right time, but luck isn't the only reason why it is popular today. It introduces a lot of innovative thinking and approaches for JavaScript server-side development that has already helped many developers.
There are thousands of open-source libraries for Node.js, most of them hosted on the npm website. The Node.js developer community has two main mailing lists and the IRC channel #node.js on freenode. There are multiple developer conferences and events that support the Node.js community, including NodeConf, Node Interactive, and Node Summit as well as a number of regional events.
The open-source community has developed web frameworks to accelerate the development of applications. Such frameworks include Connect, Express.js, Feathers.js, socket.io, Koa.js, Hapi.js, Sails.js, Meteor, Derby, and many others. Various packages have also been created for interfacing with other languages or runtime environments such as Microsoft .NET. 

**Timeline**

* **2009**
    * Node.js is born
    * The first form of npm is created
* **2010**
    * Express is born
    * socket.io is born
* **2011**
    * npm hits version 1.0
    * Larger companies start adopting Node.js: LinkedIn, Uber, etc.
    * hapi is born
* **2012**
    * Adoption continues very rapidly
* **2013**
    * First big blogging platform using Node.js: Ghost
    * Koa is born
* **2014**
    * The Big Fork: io.js is a major fork of Node.js, with the goal of introducing ES6 support and moving faster
* **2015**
    * The Node.js Foundation is born
    * IO.js is merged back into Node.js
    * npm introduces private modules
    * Node.js 4 (versions 1, 2 and 3 never previously released)
* **2016**
    * The leftpad incident
    * Yarn is born
    * Node.js 6
* **2017**
    * npm focuses more on security
    * Node.js 8
    * HTTP/2
    * V8 introduces Node.js in its testing suite, officially making Node.js a target for the JS engine, in addition to Chrome
    * 3 billion npm downloads every week
* **2018**
    * Node.js 10
    * ES modules .mjs experimental support
* **2019**
    * Node 12 - 13
    * Work on Deno started to move server-side JS into the next decade with modern JavaScript support
* **2020**
    * Node 14 - 15
    * GitHub (owned by Microsoft) acquired NPM



### Setting up Node.js 	
![Nodejs image setup](https://drive.google.com/uc?export=view&id=1zipo06_A5JDQiS3hfqO9TEiIjfwf5eua)

**Download Node.js**
The official Node.js website has installation instructions for Node.js: https://nodejs.org

Once you have downloaded and installed Node.js on your computer, let's try to display "Hello World" in a web browser.
Create a Node.js file named _"myfirst.js"_, and add the following code:

> myfirst.js
``` javascript
const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);
```
Save the file on your computer: _C:\Users\Your Name\myfirst.js_
The code tells the computer to write "Hello World!" if anyone (e.g. a web browser) tries to access your computer on port 8080.

**Command Line Interface**
Node.js files must be initiated in the "Command Line Interface" program of your computer.
How to open the command line interface on your computer depends on the operating system. For Windows users, press the start button and look for "Command Prompt", or simply write "cmd" in the search field.

Navigate to the folder that contains the file _"myfirst.js"_, the command line interface window should look something like this:
> C:\Users\Your Name>
 
**Initiate the Node.js File**
The file you have just created must be initiated by Node.js before any action can take place.
Start your command line interface, write node myfirst.js and hit enter:

> **_Initiate "myfirst.js":_**
> C:\Users\Your Name>node myfirst.js
  
Hurray ! now, your computer works as a server!
If anyone tries to access your computer on port 8080, they will get a "Hello World!" message in return!
Start your internet browser, and type in the address: http://localhost:8080

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



Additional Readings
[A breif history of nodejs](https://nodejs.dev/learn/a-brief-history-of-nodejs)
[Nodejs get started](https://www.w3schools.com/nodejs/nodejs_get_started.asp)
[Nodejs intro](https://www.w3schools.com/nodejs/nodejs_intro.asp)
[Nodejs](https://en.wikipedia.org/wiki/Node.js)
[Nodejs use cases](https://www.simform.com/nodejs-use-case/)

###### About the Author
![Author img](https://drive.google.com/uc?export=view&id=1EwjWDVXcT8rVrhCWN0-jyCxg8Lq50xH_)
Jethro Magaji is a student at kaduna state university with Frontend Development and UX/UI Design skills, He is passionate and enthusiastic about Blockchain technology and also uses creative thinking to solve business problems using a user-centered approach. He spends most of his time either learning a new skill or teaching others what he loves doing best.
