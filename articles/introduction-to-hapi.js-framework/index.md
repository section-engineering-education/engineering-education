[Node.js](https://nodejs.com) has increasingly become popular in the software industry. With this comes great urge for developers to create frameworks that make node.js application development easier. There are various frameworks currently available such as [express](https://expressjs.com), [hapi.js](https://hapi.dev) and [Koa](https://koajs.com) just to mention a few. This article discuses about one of the major node.js framework available i.e hapi.js.
<!--more-->
### What is hapi.js
Hapi.js(derived from Http-API) is an open-source node.js framework used to build powerful and scalable web applications. Hapi is commonly used to build Application Programming Interface servers, HTTP-proxy applications and websites.
Hapi.js was created by the mobile team at Walmart Labs — led by Eran Hammer to handle their traffic for events like Black Friday, which is by far one of the busiest days for online shopping in the U.S. calendar.
Hapi was originally built using express framework before facing challenges that drove Walmart to make hapi its own stand-alone framework.

### Hapi.js features
Hapi.js comes with many unique features that enable  developers to build secure, powerful and scalable applications.
Some of these features include;
1. End-to-end code hygiene which help developers write managable, controlable and distributable code.
2. Secure defaults which are updated reqularly. Hapi blocks error messages that may leak information or echo back exploits.
3. Encrypted and signed cookies, secret or key rotation, and HTTP security headers all to enhance security of applications.
4. Introduction of extensive set of official plugins that are ment to replace middlewares used in frameworks such as express.
5. Integrated Authorization and Authentication Architecture which is the most comprehensive authorization API available in node.js.

### Who uses hapi.js
Many companies use hapi.js framework for their websites and web APIs.
Below is a short list of five globally recognised companies that use hapi.js framework.
* Commercetools
* Brainhub.
* Beam.
* PayPal.
* Clinlife.

### Creating a server with hapi.js
Creating a server using hapi.js is quite easy and obviously different from other frameworks.
Let's see how we can create a simple server using hapi.

First run
```
npm init 
```
to create a node package with the name of your choice.

Then open a new terminal and navigate to you app's folder and run 
```
npm install @hapi/hapi
```
to install hapi module.

Afterwards, navigate to the index file on your app's folder using your favourite code editor and write the code below to create the server.

```javascript
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
Hapi uses server.route method to create routes. server.route methods takes an options object. The object has three properties.
1. path - This is the route that will be specified on a url.
2. method - This is the HTTP method that is associated with the route. The methods include GET, POST, PUT, DELETE, and PATCH
3. handler function - This is the function that will run when the route is called. This function takes two parameters, req and reply.

The code example below shows how to create two routes on the server we have created above.

```javascript
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
Add this two routes before server.start method and test them by sending requests from the browser.

### Adding Plugins
One of the features of hapi.js as we saw above was the introductions of plugins that replace middlewares. This helps in extending the server. We use server.register to register a plugin. server.register takes either an object or an array of configurations. Let's use a code example to demonstrate how we add plugins on a hapi server. We will add *good plugin*. This plugin is used for login purpose in hapi.

Go to your index file and add the code below before server.start method

```javascript
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
Hapi.js apps work because one can customize its main building blocks i.e servers, connections, routes, handlers, and plugins to meet his/her requirements. Hapi framework makes node.js application development easier by letting the developer focus more on the critical parts of his/her application rather than the infrastructure details.