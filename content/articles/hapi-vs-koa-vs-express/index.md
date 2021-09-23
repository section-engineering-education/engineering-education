---
layout: engineering-education
status: publish
published: true
url: /hapi-vs-koa-vs-express/
title: Hapi vs Koa vs Express
description: In this article we do a comparative analysis of three Node.js frameworks - we explore their advantages, disadvantages, and show an example of how to run a server in each.
author: peter-kayere
date: 2020-09-28T00:00:00-08:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/hapi-vs-koa-vs-express/hero.jpg
    alt: koa koa.js Node.js express hapi framework
---
Node.js has various frameworks, each of which is catered to the varying demands of users and developers. This article will give a comparison between the three major Node.js frameworks, [Express](https://expressjs.com), [Hapi](https://hapi.dev), and [Koa](https://koajs.com).

In this comparison, we will look at the differences between the three frameworks, their histories, advantages and disadvantages, popularity, support and performance.
<!--more-->
For more background on the frameworks, check out the following articles to get a more in depth look before we begin:

- [Introduction to Hapi.js framework](/introduction-to-hapi/)
- [Introduction to Koa.js framework](/introduction-to-koajs/)
- [Introduction to Node.js](/history-of-nodejs/)

### Framework histories
Before we start our in-depth comparison of each framework, let's take a look at how they got started.

#### Hapi.js
Hapi.js was created by the mobile team at Walmart Labs — led by Eran Hammer to handle their traffic for events like Black Friday, since it's one of the busiest shopping days in the U.S. calendar.

Hapi's initial commit was made on August 5th, 2011 and after 5,619 commits, it is currently at version 20.0.0. It was originally built using the Express framework before challenges arose that drove Walmart to make Hapi, its stand-alone framework.

Refer to my [introduction to Hapi.js framework](/introduction-to-hapi/) for a detailed look at Hapi.js.

#### Koa.js
Koa's initial commit was made on August 17th, 2013 by TJ Holowaychuk. The framework was built by the team behind express with the aim of making it smaller, more expressive, and robust. Koa.js is currently at version 2.13.0 with 1,086 commits.

Koa.js is also known for having a smaller footprint compared to other frameworks. Refer to my [introduction to koa.js framework](/introduction-to-koajs/) for a detailed look at Koa.js.

#### Express.js
The Express framework is the oldest of the three. Its initial commit was made by TJ Holowaychuk on June 26th, 2009 and its first release was on the 2nd of January 2010 after around 660 commits.

The two main contributors at the time of its first release were TJ Holowaychuk and Ciaron Jessup. Express.js is currently at version 4.17.1 after 280 releases and 5,592 commits.

### Framework popularity
All these frameworks are widely used by developers worldwide, but still, one might need to know which framework is the most popular. Our popularity comparison will be based on statistics from GitHub and [npm](https://www.npmjs.com)

#### Hapi.js
Hapi.js's GitHub repository has 12.7k stars, 205 contributors, 1.3k forks, and 332 releases.

According to [npm](https://www.npmjs.com/package/hapi), 1,470 packages depend on Hapi.js.

#### Koa.js
Koa.js's GitHub repository has 29.9k stars, 218 contributors, and 2.8k forks.

According to [npm](https://www.npmjs.com/package/koa), 4,678 packages depend on Koa.js.

#### Express.js
Express.js's GitHub repository has 50k stars, 205 contributors, 8.3k forks, and 280 releases.

According to [npm](https://www.npmjs.com/package/express), 45,743 packages depend on Express.js.

### Creating a server
In this section we will look at how the frameworks differ in creating a server. Unlike Hapi, both Koa and Express use a similar logic to create a server.


In Express, you first import the express module, then, instantiate the module and store it in a variable. Then use its listen method to start a server at a certain port.

Let's see a code example to illustrate this.

Make sure to run

```bash
npm install express
```

to install the express module.

Then

```JavaScript
const express = require('express');
const app = express();

app.listen(2400, () => {console.log('Server started at port 2400')});
```

As we mentioned earlier, Koa uses the same logic as Express. We import the Koa module, instantiate, store it in a variable, and then use its listen method to start the server.

The code snippet below shows how we start a server using Koa.js.

First run

```bash
npm install koa
```
to install the koa module.

Then

```JavaScript
const koa = require('koa');
const app = new koa();

app.listen(2400, () => {console.log('Server started at port 2400')});
```

Now let's look at how Hapi stands out. In Hapi, we import the hapi module, then, instead of instantiating the module, we use its server method to create a server by passing an object containing the port and host name.

Then we use the start method to start the server. Let's see a code example.

Run

```bash
npm install @hapi/hapi
```
to install hapi module.

Then

```JavaScript
const hapi = require('@hapi/hapi');
const server = hapi.server({
    port: 3000,
    host: 'localhost'
});

server.start();
console.log('Server running on %s', server.info.uri);
```

### Framework advantages and disadvantages
In this section we are going to highlight some of the advantages and disadvantages of each framework.

#### Hapi.js
##### Advantages
1. Hapi enables one to build a scalable web application or API.
2. Hapi uses plugins which breaks applications in to smaller pieces thus helping with scaling.
3. Hapi provides a deeper control over request handling through the use of context.
4. Hapi provides input/output validation, routing and caching, hence making it a good choice for building REST APIs.
5. Hapi provides good plugins such as [Yar](https://hapi.dev/module/yar/), [Good](https://hapi.dev/module/good/), and [Catbox](https://hapi.dev/module/catbox/), etc.

##### Disadvantages
1. Refactoring in Hapi is manual.
2. Endpoints must be created and tested manually.
3. It restricts developers by using Hapi specific plugins and modules which are not compatible with other frameworks.

#### Koa.js
##### Advantages
1. Koa has a small footprint (about 600 lines of code) therefore making it very light weight.
2. Koa uses try/catch which improves error handling.
3. Koa has a cleaner and more readable asynchronous code.
4. Koa does not use callbacks hence facilitating upstream and downstream flow of controls.
5. Refactoring larger code bases in Koa is easier due to modularization.

##### Disadvantages
1. Koa has a relatively small community.
2. It is not compatible with Express middleware.
3. Koa uses ES6 generators which are not compatible with middleware from other frameworks.

#### Express.js
##### Advantages
1. Express has a large community.
2. Express is simple, flexible, and scalable.
3. Express is fully customizable.
4. It is easy to integrate third party services and middleware.
5. Express has a low learning curve.

##### Disadvantages
1. Express requires a lot of manual labor since endpoints, middleware, etc. need to be created and tested manually.
2. Refactoring larger code bases is very challenging.

### Framework performance
In this section, we will compare the frameworks based on the number of requests that a hello world server can handle in one second.

Hapi.js handles 29,998 requests per second while Express handles 38,510 requests per second.

Koa.js seems to be best in terms of performance since it handles 50,933 requests per second.

### Choosing the right framework for your project
#### Why choose Express.js
Express provides a wide range of functionalities for developing web applications such as single/multi-page applications and even hybrid applications.

Express is also easy to test due to its middleware and routes that modularize projects.

Express.js is also closer to Node.js when compared to the other frameworks, it is only a thin layer to Node.js, making it the best for building applications that require the best performance.

#### Why choose Koa.js
Koa.js was created to be better than Express, therefore, it can do all that Express can do and more. From our performance test, we saw that Koa performs the best since it can handle more requests per second.

This makes it a better choice for web applications and APIs that serve many clients at a time.

#### Why choose Hapi.js
Hapi.js has almost the same capabilities as the other frameworks but its plugin feature is what makes it unique when it comes to selecting frameworks to use.

Hapi has a wide variety of plugins that make it a little bit easier to build APIs with since almost every common task such as routing, logging, caching, and authentication etc. have built-in plugins that have been tested.    

Below are some other points that would help when choosing the right framework for a project:

1. Efficiency demand of the application.
2. The cost of the project.
3. Modules available.
4. The type of project.
5. Scalability.

### Summary
In this article we have done a comparison of the three major Node.js frameworks. We have gone through their histories, popularity, advantages and disadvantages, performance and created a server with each one.

With that, a developer can now choose the framework which best satisfies his/her needs for their application.  

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
