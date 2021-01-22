Pure Node.js? Node.js without frameworks? An overview

Are you a Node.js developer, and you frequently use Node.js libraries?  First, there is nothing wrong with using them. However, have you ever thought of using Node.js with no frameworks or external libraries? Yes, it is possible to develop a Node.js application with no NPM registry binaries. This guide aims to discuss an overview of using pure Node.js and its functionalities.

- [Background](#background)
- [An overview](#an-overview)
- [Why should you bother learning raw Node.js?](#why-should-you-bother-learning-raw-nodejs)
- [A pure Node.js HTTP server](#a-pure-nodejs-http-server)
- [Conclusion](#conclusion)

### Background

JavaScript has gained a lot of love from the developers' community. It is diverse and can be applied to any application, from mobile apps, web pages, internet of things, networking, servers, real-time applications, microservices, etc. Thus, JavaScript is a cross-platform language.

The steady growth of JavaScript has led to the development of powerful JavaScript libraries and frameworks such as Node.js.

![Most popular language](/engineering-education/pure-node-js-no-frameworks-or-packages/most-popular-language.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-all-respondents)

Node.js is capable of building super fast and highly scalable applications. It has emerged as one of the Most Popular JavaScript Technologies.

![The most popular technologies](/engineering-education/pure-node-js-no-frameworks-or-packages/popular-technologies.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools-all-respondents3)

It emerged as the most wanted web technology, a survey conducted by [stack overflow](https://insights.stackoverflow.com/survey/2020).

![The most wanted technology](/engineering-education/pure-node-js-no-frameworks-or-packages/most-wanted-technology.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-other-frameworks-libraries-and-tools-wanted3)

Node.js runtime [download metrics](https://nodejs.org/metrics/) speak for themselves.

![Node.js download metrics](/engineering-education/pure-node-js-no-frameworks-or-packages/node-js-download-metrics.jpg)

[Image Source](https://nodejs.org/metrics/)

### An overview

One of the most influential [reasons for Node.js popularity](/engineering-education/why-node-js-is-popular/) is the availability of diverse [open-source frameworks and libraries](/engineering-education/most-useful-nodejs-packages/).

A package is code written by someone else. It is developed to help the community solve day-to-day problems easily and quickly without re-writing code, especially for a large application.

Open-source frameworks, external libraries, and packages are available for most programming languages. Therefore, you only need basic skills to write your application logic. However, one thing makes Node.js unique. It exposes you to running the core Node.js barebones. With vanilla Node.js, you can learn and build apps from scratch with no external frameworks.

Let's take the example of building a Node.js server. In this case, you would use packages such as [Express.js](https://expressjs.com/) to create server routes and manage your HTTP server. Using such a framework is terrific. It makes your server easy to set up, scalable, and easy to manage.

Libraries make your work easier and more efficient by reducing redundant code. Behind the scenes, these libraries are developed using pure Node.js. This way, as you implement your HTTP server, the low-level Node.js logic is hidden from you. In such circumstances, your server logic does not directly interact with vanilla Node.js.

They are reliable but shrink your learning exposure. Of course, you can't learn everything, but it is important to understand how your system works. Therefore, it is a good experience for a developer to learn vanilla Node.js

While learning Node.js, you will typically use packages. As you level up, the urge to learn more might increase, you will realize that you can build APIs and servers using vanilla Node.js, without the use of packages or third-party frameworks. This way, you utilize core Node.js runtime code.

### Why should you bother learning raw Node.js?

As developers, it's hard to imagine a day without using NPM (Node Package Manager). A package manager helps you install packages and use them in your project. Nevertheless, the NPM ecosystem drives you away and makes it tough to learn the pure Node.js functionalities.

With packages, every project becomes scalable, fast to build, and easy to manage. This makes it challenging for professionals to dig deeper. Your application development life cycle is reduced to package names. You call a package function and a set of parameters, and boom, you are done, very easy indeed.

Learning raw Node.js puts you in a position to develop and contribute to these packages. Packages are built based on pure Node.js. Thus, learning pure Node.js puts you in a position to build a package to help other developers in their development workflow.

Packages are open-source, and frequently there will be issues with the packages, such as bugs. With the knowledge of pure Node.js, you stand in a position to address an issue to solve a bug or improve a package. Package code is hosted in GitHub. You can create an issue or a pull request to post your improvement. With that, you become a package contributor, helping the community utilize your skills of using pure Node.js. As a contributor, you understand what happened behind the scene of Node.js packages.

We mentioned packages having bugs, so if you develop an app with vanilla Node.js, How would you run into a bug contributed by a package. Packages have compatibility issues with certain projects due to package versioning specified in the NPM module dependencies. A no package app will not worry about version compatibility. You are the sole manager of your project's functions lifecycle.

The biggest drawback of raw Node.js is that you will have to write so much code provided by Express and other frameworks. You'll have to manage most things and operations on your own.

Building an app without using NPM packages tend to throw away one of the most significant advantages of why developer choose Node.js. (The diversity of open-source packages that form the NMP registry ecosystem makes Node.js a popular technology). The open-source packages code is pretested and solves most of the common problems you would encounter during the development cycle. You could write any functionality from scratch, but that will take you a lot of time, and it's you who will have to test your code. It's certainly hard to ditch away these frameworks.

The biggest drawback of using packages is that a package has a lot of code in it. But you might end only using a small bit of it. Maybe you only need a couple of functions from that library. You will end up having to download the whole package. This will create many unused codes inside your project as the package binaries will be hosted within your project.

When installing a library in your project, its binaries are saved as dependencies in the `node_module` folder. Of course, you need that folder to execute these packages inside your project. Many packages will end up adding many dependencies in the `node_module` folder. That's a couple of bits added to your project.

### A pure Node.js HTTP server

To put the raw Node.js knowledge, I have demonstrated how to create a simple web server. No frameworks, no Node package manager (NPM). Thus no `package.json` file as you have no dependency management — just a text editor and command line and using the functionalities that are core provided by Node.js itself.

Go ahead and install [Node.js runtime](https://nodejs.org/en/) on your computer.

Node.js comes with core modules such as HTTP. With HTTP, we get all the functionality to receive and send server requests. With the following steps and a Node.js server is set.

- Setting up the server

Import the HTTP module. With HTTP, you can perform different server requests such as GET, POST, PUT, or DELETE. Create a variable to store the returned HTTP instance and include a host and server port. In this case, we are using the localhost that is IP address `127.0.0.1`, listening to port 3000.

```js
http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
```

- Create an HTTP server.

Use the `createServer()` method to create a server instance. It takes a callback function as its second argument. The callback takes the arguments: response, and request.

The request object contains information about the client's request, such as a URL. Response object returns the data requested by the client.

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

And you are done. You have created the simplest, purest Node.js server. Simple and straightforward, right? No framework, no NPM, just raw Node.js. Check out a more complex [HTTP server](https://medium.com/@Venpot/my-experiment-with-a-pure-node-js-http-chat-server-and-why-i-destroyed-it-3414a0914420).

### Conclusion

Of course, packages are important. I can't imagine building a web app without using one. They make development a lot easier, faster, and they are scalable. Leaning pure Node.js is of no harm. Furthermore, it is equally important to understand what happened behind the scenes of the packages you include in your project.

Node.js has one of the most up to date [docs](https://nodejs.org/en/docs/guides/). Dive in, learn, and practice the power of pure Node.js. The best way to learn pure Node.js is by practicing to build some projects such as a simple web server.

Try building simple web apps or setting up a [simple API](https://chatbotnewsdaily.com/guess-who-a-chatbot-for-face-detection-and-image-blurring-with-pure-node-js-2c3833835ea1), a [simple server](https://medium.com/@officialrahulmandal/adding-routes-and-logic-to-a-pure-node-js-server-9f995298d984) or a [handy small project](https://levelup.gitconnected.com/fruit-ninja-random-fruit-facts-api-built-with-pure-node-js-5bff9c0e62a5). This way, you will be able to read through Node.js codes and get a grip of what happened behind the scenes of the packages that you use.

Using frameworks or pure Node.js is excellent. When developing an application, use what is most effective depending on the skill set and time. It is equally important to learn pure Node.js. That puts you in a class higher than an ordinary developer with a basic Node.js skillset. You get to solve more problems that a person with no raw Node.js skills can't do.