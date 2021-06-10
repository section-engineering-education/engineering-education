---
layout: engineering-education
status: publish
published: true
url: /pure-node-js-no-frameworks-or-packages/
title: Pure Node.js? Node.js without frameworks? An overview
description: This article will help developers understand the nuances in using Node.js without frameworks. There is also a hands-on where we build a HTTP server with pure Node.js.
author: joseph-chege
date: 2021-02-11T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pure-node-js-no-frameworks-or-packages/hero.jpg
    alt: Node.js without frameworks example image
---
Are you a Node.js developer who frequently uses Node.js libraries? Have you ever built an application without using any external Node.js libraries?
<!--more-->
Yes, it is possible to develop a Node.js application with no NPM registry binaries. This guide aims to give an overview on how to use pure Node.js and its functionalities.

### Table of contents
- [Background](#background)
- [An overview](#an-overview)
- [Why should you bother learning pure Node.js?](#why-should-you-bother-learning-pure-nodejs)
- [A pure Node.js HTTP server](#a-pure-nodejs-http-server)
- [Conclusion](#conclusion)

### Background
JavaScript has gotten a lot of love from the developer community. It is diverse and can be used to develop almost any application, from mobile apps, web pages, networking, servers, real-time applications, microservices, etc. Clearly, JavaScript is a cross-platform language.

The steady growth of JavaScript has led to the development of powerful JavaScript libraries and frameworks such as Node.js.

![Most popular language](/engineering-education/pure-node-js-no-frameworks-or-packages/most-popular-language.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-all-respondents)

Node.js is capable of building extremely fast and highly scalable applications. It has emerged as one of the Most Popular JavaScript Technologies.

![The most popular technologies](/engineering-education/pure-node-js-no-frameworks-or-packages/popular-technologies.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools-all-respondents3)

It has emerged as the most wanted web technology, based on a survey conducted by [stack overflow](https://insights.stackoverflow.com/survey/2020).

![The most wanted technology](/engineering-education/pure-node-js-no-frameworks-or-packages/most-wanted-technology.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-other-frameworks-libraries-and-tools-wanted3)

Node.js runtime [download metrics](https://nodejs.org/metrics/) speak for themselves.

![Node.js download metrics](/engineering-education/pure-node-js-no-frameworks-or-packages/node-js-download-metrics.jpg)

[Image Source](https://nodejs.org/metrics/)

### An overview
One of the most influential [reasons for this popularity](/why-node-js-is-popular/) of Node.js is the availability of diverse open-source [frameworks and libraries](/most-useful-nodejs-packages/).

A package (library) is code that has been written by someone else. It is developed to help the community solve day-to-day problems easily and quickly without re-writing code, especially for an extensive application.

Open-source frameworks, external libraries, and packages are available for most programming languages. Therefore, you only need basic skills to write your application logic. However, one thing makes Node.js unique: you can write applications in Node.js without the use of external libraries. With vanilla Node.js, you can learn and build apps from scratch with no external frameworks.

As an example, let’s say you are building a Node.js server. In this case, you would use packages such as [Express.js](https://expressjs.com/) to create server routes and manage your HTTP server. Using such a framework can be terrific. It makes your server easy to set up, scalable, and easy to manage.

Libraries make your work easier and more efficient by reducing redundant code. Behind the scenes, these libraries are developed using pure Node.js. As you implement your HTTP server, the low-level Node.js logic is hidden from you. 

In such circumstances, your server logic does not directly interact with vanilla Node.js. It is important to understand how your system works. Therefore, it is a good experience for a developer to learn vanilla Node.js.

### Why should you bother learning pure Node.js?
As developers, it is hard to write applications without using NPM (Node Package Manager). A package manager helps you install packages and use them in your project. Nevertheless, the NPM ecosystem makes it tough to learn the pure Node.js functionalities.

With packages, every project becomes scalable, fast to build, and easy to manage. However, this makes it challenging for professionals to dig deeper. The life cycle of your application development is reduced to package names. You set a package function and a set of parameters, and boom, you are done. Very easy, indeed.

Learning vanilla Node.js enables you to develop and contribute to these packages. Packages are built using pure Node.js, so learning pure Node.js puts you in a position to build your own package and help other developers in their development workflow.

Packages are open-source, and frequently have issues, such as bugs. When you have some knowledge of pure Node.js, you stand to solve a bug or improve a package. Package code is hosted in GitHub. 

You can create an issue or a pull request to post your improvement. By doing this, you become a package contributor, helping the community utilize your skills with pure Node.js. As a contributor, you understand what happens behind the scenes in Node.js packages.

Packages have compatibility issues with certain projects due to package versioning specified in the NPM module dependencies. A “no-package” app will not have an issue with version compatibility. You are the sole manager of your project's functions lifecycle.

The biggest drawback of using raw Node.js is that you will have to write a lot of code that would be provided otherwise by Express and other frameworks. You'll have to manage most things and operations on your own.

Building an app without using NPM packages means losing one of the most significant advantages that leads many developers to choose Node.js. (The diversity of open-source packages that form the NPM registry ecosystem makes Node.js a popular technology). 

The open-source package code is pre-tested and solves most of the common problems you would encounter during the development cycle. You could write any functionality from scratch, but that will take you a lot of time, and it's you who will have to test your code. It's undoubtedly hard to ditch these frameworks.

The biggest drawback of using packages is that, even if a package has a lot of code in it, you might end up only using a small bit of it. Maybe you only need a couple of functions from that library, but you will have to download the whole package. You’ll end up with a lot of unused code in your project, as the package binaries will be hosted within your project.

When installing a library in your project, its binaries are saved as dependencies in the `node_modules` folder. Of course, you need that folder to execute these packages inside your project. Many packages will end up adding many dependencies in the `node_modules` folder.

### A pure Node.js HTTP server
To put the raw Node.js knowledge into practice, I have demonstrated how to create a simple web server. No frameworks, no Node package manager (NPM). Therefore no `package.json`, file as you have no dependency management — just a text editor and command line and using the functionalities that are core provided by Node.js itself.

Go ahead and install [Node.js runtime](https://nodejs.org/en/) on your computer.

Node.js comes with core modules such as [HTTP](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/). With HTTP, we get all the functionality to receive and send server requests. With the following steps, a Node.js server will be set.

- Setting up the server

Import the HTTP module. With HTTP, you can perform different server requests such as GET, POST, PUT, or DELETE. Create a variable to store the returned HTTP instance and include a host and server port. In this case, we are using the localhost that is IP address `127.0.0.1`, listening to port 3000.

```js
http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
```

- Create an HTTP server.

Use the `createServer()` method to create a server instance. It takes a callback function as its second argument. The callback takes the arguments: response and request.

The request object contains information about the client's request, such as a URL. The response object returns the data requested by the client.

```js
const server = http.createServer();
server.on("request", (request, res) => {
  res.end("Hello World! This is my first pure Node.js server");
});
```

- Listening to the server using the `listen()` method.

If the server connection has been established, the method will return true, meaning the server is now listening to the established connection.

```js
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Test the server by running `node app.js`.

![Pure Node.js server running](/engineering-education/pure-node-js-no-frameworks-or-packages/server-running.jpg)

And it is working. Visit `http://127.0.0.1:3000/` to get the server response.

![Pure Node.js server response](/engineering-education/pure-node-js-no-frameworks-or-packages/server-response.jpg)

You are done. You have created the simplest, purest Node.js server. Simple and straightforward, right? 

No framework, no NPM, just raw Node.js. 

Check out a more complex [HTTP server](https://medium.com/@Venpot/my-experiment-with-a-pure-node-js-http-chat-server-and-why-i-destroyed-it-3414a0914420).

### Conclusion
Node.js has one of the most up to date [docs](https://nodejs.org/en/docs/guides/). The best way to learn vanilla Node.js is by building some practice projects, such as a simple web server.

Try building simple web apps, setting up a [simple API](https://chatbotnewsdaily.com/guess-who-a-chatbot-for-face-detection-and-image-blurring-with-pure-node-js-2c3833835ea1) or [simple server](https://medium.com/@officialrahulmandal/adding-routes-and-logic-to-a-pure-node-js-server-9f995298d984), or a [handy small project](https://levelup.gitconnected.com/fruit-ninja-random-fruit-facts-api-built-with-pure-node-js-5bff9c0e62a5). This way, you will be able to read through Node.js code and get a grip on what happens behind the scenes of the packages that you use.

Both frameworks and vanilla Node.js are excellent choices. It’s just a matter of what you want and need. When developing an application, use what is most effective depending on the skill set and time. 

However, it is incredibly useful to learn pure Node.js. Doing so puts you a step ahead of an ordinary developer with a basic Node.js skillset. You’ll be able to solve problems that a person with no raw Node.js skills cannot. Dive in, learn, and practice the power of pure Node.js.

Happy coding!

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)