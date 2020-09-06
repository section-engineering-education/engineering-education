---
layout: engineering-education
status: publish
published: true
url: /engineering-education/node-vs-nuxt/
title: Node vs Nuxt - The Key Differences
description: .
author: saiharsha-balasubramaniam
date: 2020-09-06T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/node-eslint/hero.jpg
    alt: linters example image ESLint
---

A while ago, traditional server side rendering used to be the norm. All of the HTML is dynamically rendered on the server and sent to the client. Back in those days, websites weren't user-friendly and native.

Today's web consists of single-page applications and universal web-apps. Let us look at the differences between Node.js and Nuxt which are two important technologies used for the web.

<!--more-->

## Table of Contents

- [Why is Node.js Needed](#why-is-node.js-needed)
- [Why is Nuxt Needed](#why-is-nuxt-needed)
- [Node.js-vs-Nuxt](#node.js-vs-nuxt)
- [Create a Node.js App](#create-a-node.js-app)
- [Create a Nuxt App](#create-a-nuxt-app)
- [Further Reading](#further-reading)

### Why is Node.js Needed

JavaScript is a powerful object-oriented programming language that runs within a browser. To harness the power of JS on the server-side, Node.js was created.

Node.js is a server-side JavaScript runtime environment. It is based on the Google V8 engine. Today, it is one of the most popular server-side languages for the web.

Node.js is single threaded and event driven. Node.js is not a framework, but it is an environment. There are many frameworks that are built on top of Node.js, namely Express and Koa. It is also preferred because front-end developers can easily jump into backend development, because they would already know JavaScript.

### Why is Nuxt Needed

Since traditional server-side rendering fails to provide a smooth user experience, client-side rendering became the new standard for web applications. Client-side rendering involves a single HTML file being sent to the client. Now, the entire JavaScript is downloaded and runs on the client to handle interactivity.

This had a few drawbacks with Search Engine Optimization being the most crucial one. The SEO parser isn't able to parse all the DOM elements due to which SEO takes a hit. Here, pages are rendered both on the client and the server-side. This improves SEO and the initial page load times.

Therefore, Nuxt is a framework that is built on top of Vue.js. It accelerates the development of universal web applications. It is versatile and has support for modules to enable Progressive Web App support, multi language support and more.

### Node.js vs Nuxt

|                     | **Node.js**                                                         | **Nuxt**                                                                     |
| ------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| What it is?         | Node.js is a server-side JavaScript runtime environment.            | Nuxt is a framework used for building universally rendered web applications. |
| Primary Use         | Server-side scripting, creating application programming interfaces. | Making single page applications and univerally rendered applications.        |
| Built on            | Chrome V8 Engine                                                    | Vue.js                                                                       |
| Languages Supported | JavaScript, TypeScript                                              | JavaScript, TypeScript                                                       |
| Open-Sourced        | Yes                                                                 | Yes                                                                          |

### Create a Node.js App

Let us create a basic Node.js application.

- To start, create a directory called hello-node.

```
mkdir hello-node

cd hello-node
```

- Now, let us initiate a Node.js application by using the Node Package Manager.

```
npm init
```

![Node App Creation](/engineering-education/node-vs-nuxt/hello-node.png)

- The above command initializes a project and creates a `package.json` file in the current directory. The package.json file is used to manage dependencies of the application.

- Create a new file `index.js`.

- For our script, let us install dependencies using the node package manager.

```
npm i emoji-random node-emoji
```

- Now, let us start writing our Node.js script that prints a random emoji to the console.

```js
// Importing process.stdin to take user input
let std_input = process.stdin;

// Importing packages
let re = require("emoji-random");
let emoji = require("node-emoji");

console.log("1. print");
console.log("2. exit");

// When data is entered into stdin, this block executes
std_input.on("data", (data) => {
  if (data != "exit") {
    let randEmoji = re.random();
    var finalEmoji = emoji.get(randEmoji);

    // Print to the console
    console.log(
      "Here is the " + randEmoji.split(":")[1] + "emoji: " + finalEmoji
    );
    process.exit();
  } else {
    console.log(data);
    console.log("exiting!");
    process.exit();
  }
});
```

- We have thus created a Node.js application.

### Create a Nuxt App

- To create a Nuxt application, we use the `create-nuxt-app` utility.

```
npx create-nuxt-app hello-nuxt
```

![Create Nuxt App](/engineering-education/node-vs-nuxt/create-nuxt-app.png)

- Nuxt creates a folder structure for us. It also takes care of routing. Every `.vue` file under the `pages` folder is a route.

- Let us run the application.

```
npm run dev
```

- The application is initialized and runs on the URL, `localhost:3000`.

![Run Nuxt App](/engineering-education/node-vs-nuxt/npm-run-dev.png)

- The web application can be viewed on the browser.

![Web Application](/engineering-education/node-vs-nuxt/nuxt-app.png)

- To modify our web app, we can start editing the `pages/index.vue` file.

- We have thus created a Nuxt application.

### Further Reading

We saw an overview of the differences between Node.js and Nuxt and created a basic application in both. For learning more about these technologies, take a look at the links below.

- [Reasons to use Nuxt for your web app](https://medium.com/vue-mastery/10-reasons-to-use-nuxt-js-for-your-next-web-application-522397c9366b)
- [Nuxt Documentation](https://nuxtjs.org/guide)
- [Video Tutorials on Nuxt](https://nuxtjs.org/video-courses)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Learn Node.js](https://nodejs.dev/learn)
