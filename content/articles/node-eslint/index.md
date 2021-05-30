---
layout: engineering-education
status: publish
published: true
url: /node-eslint/
title: Linting in Node.js using ESLint
description: Introduction to Linters this article will go over linters and how to use ESLint, a popular JavaScript Linter to maintain code quality in projects.
author: saiharsha-balasubramaniam
date: 2020-08-24T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/node-eslint/hero.jpg
    alt: linters example image ESLint
---

A linter is a computer program that analyzes and checks source code. It flags programming errors, indentation errors, formatting errors, bugs, and suspicious constructs.
<!--more-->

### Table of Contents
- [Introducting to Linting](#introduction-to-linting)
- [Advantages of a Linter](#advantages-of-a-linter)
- [ESLint and Node.js](#eslint-and-node)
- [Airbnb Style Guide](#airbnb-style-guide)
- [Further Reading](#further-reading)

### Introduction to Linting
Linters are tools that perform **static code analysis** in software testing.

Static Code Analysis is the analysis of computer software that is performed on static code. It is performed by looking at source code without running it. This process is usually done using a software or an automated tool. Static Code Analysis is done as a part of the programming phase in a typical software engineering workflow.

Linters scan source code and flag code blocks that violate rules. These rules can be aesthetic styling rules, syntactic rules, etc... Linters provide options to define rules or import style guides through a config file.

### Advantages of a Linter
- Linters catch mistakes while writing code.
- They stop mistakes from happening earlier and reduce time used by debugging.
- It reduces costs since critical errors are caught before deployment.
- Helps enforce a style guide across a project, to keep code consistent. This is done by the use of a config file.
- Code reviews are sped up, since basic issues are fixed by the linter.

### ESLint and Node.js
Let us now set up ESLint with Node.js to improve code quality in our projects.

First, initialize a Node.js project.

```js
npm init
```

Now, install the eslint npm package.

```js
npm i --save-dev eslint
```

In order to initialize an ESLint configuration, let us run the command.

```js
./node_modules/.bin/eslint --init
```

This will bring up the ESLint initial setup. The program gives us choices to set up an initial configuration.

- How would you like to use ESLint? -- To check syntax, find problems and enforce code style
- What type of modules does your project use? -- JavaScript Modules (import/export)
- Which framework does your project use? -- None of these
- Does your project use TypeScript? -- No
- Where does your code run? -- Node.js
- Would you like to use a style guide for your project? -- Use a popular style guide. (Select the Google Style Guide)
- What format do you want your config file to be in? -- JSON

ESLint is installed as a developer dependency. Now, let us check the working of ESLint. Create a file called index.js, and enter the following code.

```js
const express = require("express")
```

The code above is analyzed by ESLint and throws the following errors.

![ESLint Error](/engineering-education/node-eslint/eslint-error1.png)

This error is because it isn't good practice to declare and assign a variable and not use it.

![ESLint Error](/engineering-education/node-eslint/eslint-error2.png)

The Google Style Guide recommends the use of single quotes.

![ESLint Error](/engineering-education/node-eslint/eslint-error3.png)

It is good practice to use semi-colons at the end of a line.

Now, to fix the errors we can set up ESLint to automatically fix errors when we save the file. In Visual Studio Code, go to Settings -> Workspace and search for **save**

![VSCode Settings](/engineering-education/node-eslint/vscode-settings.png)

There will be an option, Editor: Code Actions on Save. Click on *Edit in settings.json* and enter the following config.

```json
{
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
}
```

Save the file and you're good to go! Whenever we click on save, ESLint will automatically fix the errors in our project.

### Airbnb Style Guide

A **style guide** defines rules and conventions on how code should be written and organized. Style guides help to maintain a common standard for writing code in projects.

The [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/) is a set of standards launched by Airbnb. It is based on the standards prevalent in JavaScript with some modifications.

To install the latest Airbnb style guide in ESLint,

```js
npx install-peerdeps --dev eslint-config-airbnb
```

This installs the config as a peer dependency.

Now, we should extend the style guide in our ESLint Configuration. In ```.eslintrc.json```,

```json
{
    "extends": [
        "airbnb"
    ],
 }
```

You project will be analyzed according to the Airbnb Style Guide.

### Further Reading
- [NPM - Airbnb ESLint](https://www.npmjs.com/package/eslint-config-airbnb)
- [ESLint Basic Configuration - Medium](https://medium.com/alturasoluciones/eslint-basic-configuration-18b2109d98ec)
- [ESLint Configuration - Docs](https://eslint.org/docs/user-guide/configuring)
- [ESLint Rules and Options](https://eslint.org/docs/rules/)
