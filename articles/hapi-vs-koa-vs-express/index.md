Node.js has various frameworks each of which is catered to the demands of users and developers. This article will give a comparison between the three major node.js frameworks i.e [express](https://expressjs.com), [hapi](https://hapi.dev) and [koa](https://koajs.com). In the comparison we will look at the difference between the three frameworks, their histories, advantages and disadvantages, popularity, support and performance. 
<!--more-->
### Framework histories
Before we start our in-depth comparison, lets take a look at a brief history of the frameworks.

#### Hapi.js
Hapi.js was created by the mobile team at Walmart Labs — led by Eran Hammer to handle their traffic for events like Black Friday, which is by far one of the busiest days for online shopping on the U.S. calendar.
Hapi's initial commit was made on August 5th, 2011 and 5,619 commits later, it is currently at version 20.0.0. It was originally built using the express framework before facing challenges that drove Walmart to make hapi, its own stand-alone framework. Refer to my previous article on an [introduction to Hapi.js framework](https://www.section.io/engineering-education/introduction-to-hapi/) for a detailed look at Hapi.js framework
#### Koa.js
Koa's initial commit was made on August 17th, 2013 by TJ Holowaychuk. The framework was build by the team behind express with the aim of making a smaller, more expressive and more robust framework. Koa.js is currently at version 2.13.0 with 1,086 commits. Koa.js is also known for having a smaller footprint compared to other frameworks. Refer to my previous article on an [introduction to koa.js framework](https://www.section.io/engineering-education/introduction-to-koajs/) for a detailed look at Koa.js framework
#### Express.js
Express framework is the oldest of the three. Its initial commit was made by TJ Holowaychuk on 26th June, 2009 and its first release was on the 2nd of January 2010 after around 660 commits. The two main contributors at the time of its first release were TJ Holowaychuk and Ciaron Jessup. Express.js is currently at version 4.17.1 after 280 releases and 5,592 commits.

### Framework popularity
Both the frameworks are widely used by developers world wide, but still, one might need to know which framework is more popular than the other(s). In this section we will have a look at that. Our popularity comparison will be based on statistics from github and [npm](https://www.npmjs.com)

#### Hapi.js
Hapi.js's github repository has 12.7k stars, 205 contributors, 1.3k forks and 332 releases.
According to [npm](https://www.npmjs.com/package/hapi), 1,470 packages depend on Hapi.js.
#### Koa.js
Koa.js's github repository has 29.9k stars, 218 contributors and 2.8k forks.
According to [npm](https://www.npmjs.com/package/koa), 4,678 packages depend on Koa.js.
#### Express.js
Express.js's github repository has 50k stars, 205 contributors, 8.3k forks and 280 releases.
According to [npm](https://www.npmjs.com/package/express), 45,743 packages depend on Express.js.

### Creating a server
In this section we will have a look at how the frameworks differ in creating a server. Unlike Hapi, both Koa and Express use a similar logic to create a server.

In Express, You first import the express module, then, instantiate the module and store it in a variable. Then use its listen method to start a server at a certain port.
Lets see a code example to illustrate this.

```Javascript
const express = require('express')
const app = express()

app.listen(2400, () => {console.log('Server started at port 2400')})
```
As we mentioned earlier, Koa uses the same logic as express. We import the Koa module, instantiate and store it in a variable and then use its listen method to start the server.
The code snippet below shows how we start a server using Koa.js.

```Javascript
const koa = require('koa')
const app = koa()

app.listen(2400, () => {console.log('Server started at port 2400')})
```
Now lets look at how hapi stands out. In Hapi, we import the hapi module, then, instead of instantiating the module, we use its server method to create a server and then use it connection method to connect the server to a specific port. Then we use start method to start the server.
Lets see a code example.

```Javascript
const hapi = require('hapi')
const server = new hapi.Server()

server.connection({
    host: 'localhost',
    port: '2400'
})

server.start(error => {
    if (error) throw error
    else console.log('Server running at PORT 2400');
})
```

### Framework advantages and disadvantages
In this section we are going to highlight some of the advantages and disadvantages of each framework.

#### Hapi.js
##### Advantages
1. Hapi enables one to build a scallable Web application or API.
2. Hapi uses plugins which helps in scaling.
3. Hapi can also be used in conjuction with front-end frameworks like vue and react to build single-page web applications.
4. Hapi provides a deeper control over request handling through the use of context.
5. Hapi provides input/output validation, routing and caching hence making it a good choice for building REST APIs. 
6. Hapi provides good plugins such as yar, good, catbox etc.
##### Disadvantages
1. Refactoring in Hapi is manual.
2. Endpoints must be created and tested manually.
3. It restricts developers to using Hapi specific plugins and modules which are not compatible with other frameworks.

#### Koa.js
##### Advantages
1. Koa has a small footprint hence very light weight.
2. Koa has a good user experience.
3. Koa uses try/catch which improves error handling.
4. Koa has a cleaner and more readable asynchronous code.
5. Koa does not use callbacks hence facilitating upstream and downstream flow of controls.
##### Disadvantages
1. Koa has a relatively small community.
2. It is not compatible with middlewares build using express style.
3. Koa uses ES6 generators which are not compatible with middlewares from other framework.

#### Express.js
##### Advantages
1. Express has a large community.
2. Express is simple, flexible and scalable.
3. Express is fully customizable.
4. It is easy to intergrate third party services and middlewares.
5. Express has a low learning curve.
##### Disadvantages
1. Express requires alot of manual labour.
2. Refactoring bigger code bases is very challenging.

### Framework performance
In this section, we will compare the frameworks based on the number of hello world request that a server build by each framework can handle in one second.
Hapi.js handles 29,998 requests per second while Express handles 38,510 requests per second.
Koa.js seems to be best performing since it handles 50,933 requests per second.

### Summary
In this article we have done a comparison of the three major node.js frameworks. We have gone through their histories, popularity, advantages and disadvantages, performance and creating a server. With that, one can now choose the framework which best satisfies his/her needs for his application.  