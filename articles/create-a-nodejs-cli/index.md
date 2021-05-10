---
layout: engineering-education
status: publish
published: true
url: /engineering-education/create-a-nodejs-cli/
title: Creating Command Line Interfaces using Node.js
description: In this tutorial we will create a simple CLI application that takes two arguments to understand CLI basics.
author: daniel-katungi
date: 2020-10-16T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/create-a-nodejs-cli/hero.png
    alt: example image Node.js CLI
---
The command line or the terminal is a powerful tool used by a lot of developers. It allows developers to interact with the operating system using commands. These commands are passed as input strings of text.
<!--more-->
A lot of tools used by developers have a terminal CLI or command line interface. Using the command line is easy and direct hence why a lot of people prefer using it.

Creating a CLI application is not a challenging task. This has helped make them more popular.

Some of the most popular command line interface applications are project generators like [create-react-app](https://www.npmjs.com/package/create-react-app) for generating a React.js boilerplate application, [angular CLI](https://www.npmjs.com/package/@angular/cli) for creating an Angular.js project, and [Vue CLI](https://www.npmjs.com/package/@vue/cli) for Vue.js applications.

The above examples are a bit more complex in functionality and can be confusing. Yet, the basics are still the same. They all have Node.js as a common factor.

Getting started with CLI applications using Node.js couldn't be easier. To tackle the basics, let's create a simple CLI application that takes two arguments `joke` or `quote`, and generates a joke or a quote.

### The Shebang
First things first, the starting point of any CLI application point is a line called the Shebang.

In Node.js the shebang looks something like this:

```JavaScript
#!/usr/bin/env node
```

The shebang tells the operating system what type of code is in the script. It also tells which interpreter it should assign to the script. If it were a Python script, it would look something like this:

```python
#!/usr/bin/env py
```

The shebang, is only applicable in Unix/Linux operating systems. It should always be the first line of the entry file.

### Project Setup
To get started, let's setup our project and Node.js environment.

In the terminal, enter:

```bash
mkdir node-cli
cd node-cli
npm init -y
```

NOTE: passing the `-y` flag to npm init, will instantiate a new npm project and set everything to default and yes.

This will generate our package.json file.

Next up, let's install all the packages we will make use of in the project.

- [axios](https://www.npmjs.com/package/axios) for making our network requests.
- [chalk](https://www.npmjs.com/package/chalk) for making our user interface better looking and stylish.
- [yargs](https://www.npmjs.com/package/yargs) for all our options and argument parsing.

Let's go ahead and install them:

```bash
    npm i axios chalk yargs
```

### Getting the jokes and quotes
Let's setup the jokes and quotes. We will be using a [quote-generator-api](https://quotes.rest/) and [jokes-generator-api](https://official-joke-api.appspot.com/). We will fetch the individual jokes and display them on the terminal when the user asks for them.

Let's create a file called `index.js` that will be the entry point to our application.

We will create two functions that will do the fetching using axios.

```JavaScript
#!/usr/bin/env node

const axios = require("axios");
const chalk = require("chalk");

function getJoke() {
 axios({
 method: "get",
 url: "https://official-joke-api.appspot.com/random_joke",
 })
 .then((res) => {
 const setup = chalk.cyan(res.data.setup);
 const punchline = chalk.green(res.data.punchline);
 console.log(`${setup} - ${punchline}`);
 })
 .catch((err) => {
 const log = chalk.red(err);
 console.log(log);
 });
}

function getQuote() {
axios({
    method: 'get',
    url: "http://quotes.stormconsultancy.co.uk/random.json",
}).then((res)=> {
    const randomQuote = chalk.cyan(res.data.quote);
    const randomAuthor = chalk.green(res.data.author);
    const log = `${randomQuote} - ${randomAuthor}`;
    console.log(log);
}).catch((err)=>{
    const errorLog = chalk.red(err);
    console.log(errorLog);
});
}
```

**Note:** We are using chalk to color our logs and get a colorful output. We setup an empty string called `url` so that when the user selects quotes, we load in the quote API URL and the same goes for jokes.

For now, the code won't work because we're not calling any of the functions.

### Understanding option/command/argument parsing
A good example of option parsing is when we passed `-y` to our `npm init` command to set everything to default.

The commands used in CLI applications often come with other options or flags. They extend the functionality of the application like in the example above.

A common application of options is when asking for user input that determines the output of the application.

Node.js comes with a built-in app interface for the process module called `process.argv`. It takes in the arguments passed, invokes a method, and returns an array with all the arguments passed into the main process.

Using `process.arg` might be tedious and not beginner friendly so we will use [yargs](https://www.npmjs.com/package/yargs) to help us process the options.

Yargs offers a lot of options that make it very powerful and widely used. Some of them include `.command()`, `.help()`, `.example()`, `.usage()`, and others. To read more on the different capabilities of the options, see the yargs [docs](https://github.com/yargs/yargs).

**Note:** Yargs works with Node.js versions higher than version 8. It does not work with version 8 or lower.

We will be making use of the command option to allow us to invoke a function when the set command is triggered. The syntax for this is:

```JavaScript
const argv = require("yargs");
argv.command(
  "name of command",
  "description of the command",
  functionA,
  functionB
).argv;
```

**Note:** `functionA` will define the command arguments, then `functionB` will implement the function.

In our project we need two commands, let's set them up:

```JavaScript
const argv = require("yargs");
argv.command(
  "joke",
  "Fetching your joke",
  (yargs) => {},
  (argv) => {
    getJoke();
  }
).argv;

argv.command(
  "quote",
  "Fetching a quote",
  (yargs) => {},
  (argv) => {
    getQuote();
  }
).argv;
```

To get a joke or quote run:

```bash
node index.js joke
```

```bash
node index.js quote
```

### Finishing Up
Our full code now looks like this:

```JavaScript
#!/usr/bin/env node

const axios = require("axios");
const chalk = require("chalk");
const argv = require("yargs");

function getJoke() {
  axios({
    method: "get",
    url: "https://official-joke-api.appspot.com/random_joke",
  })
    .then((res) => {
      const setup = chalk.cyan(res.data.setup);
      const punchline = chalk.green(res.data.punchline);
      console.log(`${setup} - ${punchline}`);
    })
    .catch((err) => {
      const log = chalk.red(err);
      console.log(log);
    });
}

function getQuote() {
  axios({
    method: "get",
    url: "http://quotes.stormconsultancy.co.uk/random.json",
  })
    .then((res) => {
      const randomQuote = chalk.cyan(res.data.quote);
      const randomAuthor = chalk.green(res.data.author);
      const log = `${randomQuote} - ${randomAuthor}`;
      console.log(log);
    })
    .catch((err) => {
      const errorLog = chalk.red(err);
      console.log(errorLog);
    });
}

argv.command(
  "joke",
  "Fetching your joke",
  (yargs) => {},
  (argv) => {
    getJoke();
  }
).argv;

argv.command(
  "quote",
  "Fetching a quote",
  (yargs) => {},
  (argv) => {
    getQuote();
  }
).argv;
argv.help();
```

The result will look like this:
![image title](/engineering-education/create-a-nodejs-cli/terminal.png)

We also added the help command to provide a default `--help/help` flag to give options to our application.

### Conclusion
In this article, we went through how to setup a CLI script using Node.js. We also went through what the shebang is and why it is important in CLI applications.

Finally, we learned how to pass arguments and commands to the application. As a bonus, we used chalk to make our output looks nice and colorful.

You can get the full code [here](https://github.com/katungi/Node-CLI-Section).

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
