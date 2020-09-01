---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-koajs/
title: Introduction to the Koa.js Framework
description: Koa.js is an open-source Node.js framework used to build developer-friendly and expressive web applications and APIs. We go over what Koa.js is, and some of its features.
author: peter-kayere
date: 2020-08-31T00:00:00-08:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-koajs/hero.jpg
    alt: koa koajs javascript JavaScript node nodejs node.js framework
---
In my previous article, about an introduction to [hapi.js framework](https://www.section.io/engineering-education/introduction-to-hapi/), I mentioned [Koa.js](https://www.koajs.com), another major node.js framework. This article will give an introduction to the framework, its features and a tutorial of how to create a simple server using this framework.
<!--more-->
### What is Koa.js?
Koa.js is an open source node.js web framework that was designed by the team behind express. This framework was build with the aim of making smaller, more expressive and robust foundations for web applications and APIs. Koa uses asycnchronus functions to help eliminate the need for callbacks and significantly improve error handling. Koa does not bundle midlewares within its core, and provides a refined suite of methods that fasten the process of making servers and makes it exciting.

### Koa.js features
As it is with all available frameworks, Koa.js also has its own unique features that make it more expressive and developer-friendly.
Here are a highlight of some of the features in Koa.
1. Koa.js is modern and future-proof - Unlike other Node.js frameworks, Koa.js build is based on ES6 which makes development of complex applications simpler by providing a bunch of new classes and modules. This helps developers to create maintainable applications.
2. Koa.js uses ES6 generators to simplify synchronous programming and facilitate flow of controls. This generators can also be used as functions to control code execution on the same stack
3. Koa.js has a small footprint as compared to other Node.js frameworks. This helps developers to write thinner and better middlewares.
4. Koa.js has a built-in catchall for errors that help prevent website crashes.
5. Koa.js uses a Context object which is an encapsulation of request and response objects.

### Who uses Koa.js
Many companies use Koa.js framework for their websites and web APIs.
Below is a short list of five globally recognized companies that use Koa.js framework.
1. Paralect
2. Pubu
3. Bulb
4. GAPO
5. Clovis                                             

### Creating a server using Koa.js framework
Since we now have an idea of what Koa.js is and have seen some of its features, lets get practical and see how to create a simple server with this new framework.

First, create a new directory for your application, then, using the terminal, navigate to the directory of your app and run:

```bash
npm init
```
To create a node package.

Then

```bash
npm i koa
```
to install Koa.js

Afterward, navigate to the index file on your app's directory using your favorite code editor and write the code below to create the server.

```js
const koa = require('koa')
const app = new koa()

app.listen(2400, () => {console.log('Server running at PORT 2400')})
```
The code used to create the server is pretty straight forward, just import the koa module and use its listen method. To start the server, run node 'name of your index file' on the terminal.

### creating routes using koa.js
Unlike its predecessor, Express, Koa.js does not handle routing by default. Instead it uses a middleware library Known as Koa Router. So, for as to implement routes in our server, we will first need to run 

```bash
npm install koa-router
```
to install Koa router library.

Then import the Koa router module on you index file and add your desired routes.
Below is a code example to demonstrate route creation using Koa.js.

```js
const koa = require('koa')
const koaRouter = require('koa-router')// importing Koa-Router

const app = new koa()
const router = new koaRouter()

router.get('home', '/', (context) => {
  context.body = "Welcome to my Koa.js Server"
})

app.use(router.routes())
  .use(router.allowedMethods())// registering routes to the application

app.listen(2400, () => console.log('Server running at PORT 2400'))
```
Start the server again and test the route by sending request from the browser.

### Handling responses in Koa.js
As we mentioned earlier, Koa response objects are embedded in its context object. This means that we access the response object from the context object.
Lets use a route definition like the one above to demonstrate handling responses.

```js
router.get('home', '/', (context) => {
  context.status = 200 //This is the response status
  coontext.body   = "Welcome to my Koa.js Server" // This is the response body
})
```
### Handling errors in Koa.js
To handle errors in Koa, add an error middleware early in your index file. It must be defined early because only errors defined after the middleware can be caught.
The code below includes the error middleware in our server.

```js
const koa = require('koa')
const koaRouter = require('koa-router')// importing Koa-Router

const app = new koa()
const router = new koaRouter()

app.use( async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})

router.get('home', '/', (context) => {
  context.body = "Welcome to my Koa.js Server"
})

app.use(router.routes())
  .use(router.allowedMethods())// registering routes to the application

app.listen(2400, () => console.log('Server running at PORT 2400'))
```
To test this, lets modify the home route method to throw an error when the route is called.

```js
...

router.get('home', '/', (context) => {
  context.throw('Sample error message', 500)
})

...
```
Now run the server again and call the endpoint using a browser.

### Summary
In this article we have learnt about Koa.js, what it is, its features and how to create servers with the framework. Through creating the simple server, we have also seen its unique syntax and some of its new features in action. Koa.js is a new node.js framework and has been adopted by some globally recognized companies.
Any web developer who feels like trying out a new framework should consider Koa.js.