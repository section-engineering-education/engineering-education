---
layout: engineering-education
status: publish
published: true
url: /npm-packages/
title: Create and Deploy NPM Packages
description: Introduction to Node.js modules and a hands-on 'how to' create and deploy a Node.js module to the npm registry.
author: saiharsha-balasubramaniam
date: 2020-09-28T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/npm-packages/hero.jpg
    alt: NPM Node Package Manager
---

Node.js is a popular server-side language that is used by millions of developers worldwide. While building Node.js projects, we use various packages that make development easier. All of these packages are managed by the Node Package Manager.
<!--more-->

To learn more about Node.js, check out [this](/history-of-nodejs/) amazing article about Node.js by [Section.io](https://section.io) contributor, [Jethro Magaji](/engineering-education/authors/jethro-magaji/).

### Table of Contents
- [Introduction](#introduction)
- [Create an NPM Account](#create-an-npm-account)
- [Let's Code](#let's-code)
- [Deployment](#deployment)
- [Using the Package](#using-the-package)
- [Further Reading](#further-reading)

### Introduction
A package manager is software that manages versions, packages and dependencies for your project. When a project grows in scale, a package manager helps to manage dependencies. It works perfectly across versions and even in collaborative projects. It cuts costs by reducing dependency problems across developer teams.

To install Node.js packages, we use the [NPM registry](https://www.npmjs.com/), which is a centralized repository of packages. In this article, we will learn how to create a Node.js package and deploy it on the NPM registry for public use.

For more background on Node.js and various related technologies, check out some amazing [Section.io](/) articles below:

- [Most Useful Node.js Packages](/most-useful-nodejs-packages/)
- [Building a Node.js Application Using Docker](/building-a-nodejs-application-using-docker/)
- [Linting in Node.js using ESLint](/node-eslint/)
- [APIs in Node.js vs Python - A Comparison](/node-vs-python/)

### Create an NPM Account
To get started, let's create an NPM account.

- Go to the [npmjs website](https://www.npmjs.com/) and click on the **sign up** button.

![npmjs Webpage](/engineering-education/npm-packages/npmjs-homepage.png)

*[Image Source](https://www.npmjs.com/)*

- Enter a username, email address, and password.

![Create NPM Account](/engineering-education/npm-packages/npm-signup.png)

*[Image Source](https://www.npmjs.com/)*

- Now, you have to verify your account. Check the inbox of the email address that you provided and click on the verification email. This will verify your npm account.

- You have successfully created an NPM account, and can start publishing packages.

- You need to sign in to your npm account on your console to start publishing packages.

- To do this, open a new folder and start your terminal. Enter the command:

```bash
npm login
```

- Now, enter your username, password and email ID.

![NPM Login](/engineering-education/npm-packages/npm-login.png)

- We have successfully signed in.

### Let's Code
- Every package published to the NPM registry should have a **`package.json`** file. Let's start by initializing a package.json file.

- The minimum requirements of a `package.json` file is a name and a version. Let's enter those pieces of information into the file.

```json
{
  "name": "clist-node",
  "version": "1.0.0"
}
```

- Enter a different name in package.json because every NPM package should have a unique name.

- In our sample NPM package, we are going to use the axios package for making API calls. Install it by using this command:

```bash
npm i axios
```

*Note: To learn more about Axios, check out its NPM package page [here](https://www.npmjs.com/package/axios).*

- We'll be using the [clist API](https://clist.by/) that returns a list of contests like hackathons, programming contests, etc..,

- Create an account on the [clist website](https://clist.by/api/v1/doc/) and get an API key.

- The entry point of our package would be the **`index.js`** file. Create a file named index.js in the same directory.

```js
// module.exports exports the function getContests as a promise and exposes it as a module.
// we can import an exported module by using require().
module.exports = async function getContests() {
  const axios = require("axios"); // Importing the Axios module to make API requests
  var result;

  const username; // Insert Your Username here
  const api_key; //Insert API key here

  await axios // Making a GET request using axios and requesting information from the API
    .get(
      "https://clist.by/api/v1/json/contest/?username=" + username + "&api_key=" + api_key + "&limit=20&end__gt=2020-09-19T00%3A00%3A00"
    )
    .then((response) => { // If the GET request is successful, this block is executed
      return response; // The response of the API call is passed on to the next block
    })
    .then((contests) => { // In this block, we store the response data into a variable 'result'
      result = contests.data.objects;
    })
    .catch((err) => {
      console.log(err); // Error handler
    });
  return result; // The contest data is returned
};
```

*Note: This package requires an API key to run. Therefore, it might not run directly if you install it.*

Now that we've programmed the package, it's time to deploy it.

### Deployment
- To deploy the package, enter the command:

```bash
npm publish
```

![NPM Publish](/engineering-education/npm-packages/npm-publish.png)

- In a moment, you'll get an email from the NPM registry indicating that your package has been successfully published!

### Using the Package
- Let's install and test our package.

- Open a new folder and initialize a **`package.json`** by using the command:

```bash
npm init -y
```

*Note: The -y option creates a package.json without an interactive process.*

- Now, let's install our published npm package.

```bash
npm i clist-node
```

- Create an index.js file and let's code.

```js
const clist = require("clist-node"); // import the installed package

clist()
  .then((res) => {
    // If the function successfully retrieves the data, it enters this block
    console.log(res); // Print the contest data on the console
  })
  .catch((err) => {
    console.log(err); // Error handler
  });
```

- Run this file by using the command:

```bash
node index.js
```

- The contest data from our NPM package would be printed out on the console. The retrieved data can be used to dynamically render elements on our front-end, store them in a database or process the data further. The possibilities are endless.

![Result](/engineering-education/npm-packages/result.png)

- We have successfully deployed and tested our NPM package!

### Conclusion
To summarize what we did:

- Created an NPM Account from [npmjs.org](npmjs.org).
- Login to the terminal using your npm credentials using the command, `npm login`.
- Initialized the `package.json` file using the `npm init -y` command.
- Wrote code.
- Deployed the package using, `npm publish`.
- Use your deployed package using `npm i <package-name>`.

###  Further Readings
For more knowledge on NPM packages and JavaScript, check out the articles below.

- [NPM Documentation](https://docs.npmjs.com/)
- [Async/Await vs Promises in JS](https://levelup.gitconnected.com/async-await-vs-promises-4fe98d11038f)
- HTTP Requests - [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
