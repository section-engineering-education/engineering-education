---
layout: engineering-education
status: publish
published: true
slug: node-environment-variables
title: Environment Variables in NodeJS
description: An overview of data structures in this article, and move on to learn about every data structure, and its implementation in Python throughout this series.
author: saiharsha-balasubramaniam
date: 2020-08-09T00:00:00-12:00
topics: [Node]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/node-environment-variables/hero.jpg
    alt: environment variables
---


Environment Variables are variables that are set by the Operating System. They are decoupled from application logic. They can be accessed from applications and programs through various APIs.
<!--more-->

Node provides a library called **dotenv** to manage and load environment variables. Let us take a look at the purpose of environment variables, how to use them, and their role in a development environment.

### Table of Contents

- [Purpose of Environment Variables](#purpose-of-environment-variables)
- [Environment Variables in Node](#environment-variables-in-node)
- [Environment Variables in Deployment](#environment-variables-in-deployment)
- [Further Reading](#further-reading)

### Purpose of Environment Variables

Environment Variables are important to a software developer for multiple reasons.

- [Separation of Concerns](#separation-of-concerns)
- [Protecting Config Keys](#protecting-config-keys)

#### Separation of Concerns
Separation of Concerns refers to a software design principle that state that computer programs should be divided into distinct sections, such that each section address a separate concern.\_ This means that a developer working on one section needs to have minimal knowledge about other sections. The details of other sections are placed on the sideline.

Application Configuration is a section of the code that should be decoupled from the application. Good software practices state that **app config requires strict separation of config from code**. Such config files can be stored as environment variables.

#### Protecting Config Keys
With the increasing popularity of cloud computing, applications are using **cloud services** and other **external APIs**. Most of these come with config keys for control and access management. If the API keys are added to the application, and the code is pushed to a public repository on GitHub, this could lead to an unmonitored access problem. Unknown parties might end up using your API keys, leading to an unintended bill for your cloud services.

To solve this problem, the config keys can be added as environment variables, and they can be invoked from a closed environment where the application is deployed.

### Environment Variables in Node
In Node, `process.env` is a global variable that is injected during runtime. It is a view of the state of the system environment variables. When we set an environment variable, it is loaded into `process.env` during runtime and can be accessed.

Dotenv is a module provided by Node to load environment variables into `process.env`. Dotenv can be added to your node project by installing it from npm or yarn.

```sh
npm install dotenv

yarn add dotenv
```

In a production environment, the IP address and the port on which it runs might change every single time, depending on the server. Since we cannot hardcode the server port, we can solve it by using `dotenv`.

Create a file called `index.js` and add the following code to it.

```js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.listen(port, () => {
  console.log(`Server is running on the port ${port}.`);
});
```

Suppose we want to use sensitive credentials like username and password in an open-source project, we can use dotenv for that as well.

```js
require("dotenv").config();

const mysql = require("mysql");
let con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});
```

Now, to set the env variables, create a `.env` file at the root of the project directory.

```
DB_HOST=localhost
DB_USER=admin
DB_PASS=password
```

and enter the values of the following variables. This will load these variables into `process.env`.
We can add this `.env` file to `.gitignore` so that our credentials are protected.

### Environment Variables in Deployment
While deploying to services like Vercel, Netlify or Heroku, environment variables can be set so that our deployed apps can access them.

![Netlify Dashboard](/engineering-education/node-environment-variables/netlify-dash.png)

Open the Netlify Dashboard of the app you're about to deploy.

![Netlify Settings](/engineering-education/node-environment-variables/env-vars.png)

Go to **Build and Deploy** -> **Environment Variables**

![Environment Variables](/engineering-education/node-environment-variables/set-vars.png)

Now, set the variables and save.

Your environment variables are successfully set for deployment on Netlify.

### Further Reading
- For detailed documentation and advanced configuration options for the dotenv module, visit the [GitHub Page](https://github.com/motdotla/dotenv).
- Learn how to use environment variables with the [Nuxt Framework](https://nuxtjs.org/api/configuration-env/).
- Read about good software development practices at [The Twelve Factor App](https://12factor.net/).
