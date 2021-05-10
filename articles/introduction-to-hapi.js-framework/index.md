---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-hapi/
title: Introduction to hapi.js Framework
description: Hapi.js(derived from Http-API) is an open-source Node.js framework used to build powerful and scalable web applications. We go over what is Hapi.js - what are some of its features.
author: peter-kayere
date: 2020-08-17T00:00:00-08:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-hapi/hero.jpg
    alt: Hapi.js image example laptop
---
[Node.js](https://nodejs.org/en/docs/) has become increasingly popular in the software industry. With this popularity comes a great need for developers to create frameworks that make Node.js application development easier. There are various frameworks currently available such as [express](https://expressjs.com), [hapi.js](https://hapi.dev) and [Koa](https://koajs.com) just to mention a few. This article will focus on one of the major Node.js frameworks available i.e. hapi.js.
<!--more-->
### What is hapi.js?
Hapi.js (derived from Http-API) is an open-source Node.js framework used to build powerful and scalable web applications. Hapi is commonly used to build Application Programming Interface servers, HTTP-proxy applications, and websites.
Hapi.js was created by the mobile team at Walmart Labs — led by Eran Hammer to handle their traffic for events like Black Friday, which is by far one of the busiest days for online shopping on the U.S. calendar.
Hapi was originally built using the express framework before facing challenges that drove Walmart to make hapi, its own stand-alone framework.

### Hapi.js features
Hapi.js comes with many unique features that enable developers to build secure, powerful, and scalable applications.
Some of these features include:
1. End-to-end code hygiene which helps developers write manageable, controllable, and distributable code.
2. Secure defaults which are updated regularly. Hapi blocks error messages that may leak information or echo back exploits.
3. Encrypted and signed cookies, secret or key rotation, and HTTP security headers all meant to enhance the security of applications.
4. An extensive set of official plugins that are meant to replace middleware used in frameworks such as express.
5. Integrated Authorization and Authentication Architecture which is the most comprehensive authorization API available in Node.js.

### Who uses hapi.js?
Many companies use hapi.js framework for their websites and web APIs.
Below is a shortlist of five globally recognized companies that use hapi.js framework.
- Commercetools
- Brainhub
- Beam
- PayPal
- Clinlife

### Creating a Server with hapi.js
Creating a server using hapi.js is quite easy and obviously different from other frameworks.
Let's see how we can create a simple server using hapi.

First, create a directory for your application, then, using the terminal, navigate to the directory of your app and run:

```bash
npm init
```
To create a node package.

Then

```bash
npm install @hapi/hapi
```
to install hapi module.

Afterward, navigate to the index file on your app's folder using your favorite code editor and write the code below to create the server.

```js
const hapi = require('hapi')
const server = new hapi.Server()

//connect the server to port 2400 of localhost
server.connection({
    host: 'localhost',
    port: '2400'
})

//start the server
server.start(error => {
    if (error) throw error
    else console.log('Server running at PORT 2400');
})
```
You can run your server by running node 'name of your index file' on the terminal.

### Creating routes with hapi.js
Hapi uses server.route as a method to create routes. server.route method takes an options object as a parameter. An options object is a JSON object that is used as the default configurations for every route, the object has three main properties.
1. path - This is the route that will be specified on a URL.
2. method - This is the HTTP method that is associated with the route. The methods include GET, POST, PUT, DELETE, and PATCH
3. handler function - This is the function that will run when the route is called. This function takes two parameters, req, and reply.

The code example below shows how to create two routes on the server we have created above.

```js
server.route({
    path: '/',
    method: 'GET',
    handler(req, reply) {
        reply('Welcome to my Hapi.js server');
    }
})

server.route({
    path: '/contact',
    method: 'GET',
    handler(req, reply) {
        reply('Welcome to Contact route');
    }
})
```
Add these two routes before server.start method and test them by sending requests from the browser.

### Adding Plugins
One of the features of hapi.js as we saw above was the introduction of plugins that replaces middleware. This helps in extending the server. We use server.register to register a plugin.

server.register takes either an object or an array of configurations. Let's use a code example to demonstrate how we add plugins on a hapi server. We will add *good plugin*. This plugin is used for login purposes in hapi.

Go to your index file and add the code below before server.start method

```js
server.register({
    register: require('good'),
    options: {
        reporters: {
            myConsoleReporter: [{
                module: 'good - squeeze',
                name: 'Squeeze',
                args: [{
                    log: ‘ * ’,
                    response: ‘ * ’
                }]
            }, {
            module: 'good - console'
            }, 'stdout'],
        }
    }
}, error => {
    if (error) throw error
```

### Summary
Hapi.js apps work because one can customize its main building blocks i.e. the servers, connections, routes, handlers, and plugins to meet his/her requirements. Hapi framework makes Node.js application development easier by letting the developer focus more on the critical parts of his/her application rather than the infrastructure details.
