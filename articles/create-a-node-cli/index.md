# Creating Command Line Interfaces using Node.js

The command line or the terminal is a powerful tool used by a lot of developers. It allows developers to interact with the operating system using commands.These commands are passed as input strings of text.

A lot of tools used by developers have a terminal CLI or command line interface. Using the command line is easy and direct hence why a lot of people prefer using it.

Creating a CLI application is not a challenging task. This advantage has helped make them more popular. 

Some of the most popular command line interface applications are project generators like [create-react-app](https://www.npmjs.com/package/create-react-app) for generating a React.js boilerplate application, [angular CLI](https://www.npmjs.com/package/@angular/cli) for creating an Angular.js project and [Vue CLI](https://www.npmjs.com/package/@vue/cli) for Vue.js applications.

The above examples are a bit more complex in functionality and can be confusing. Yet, the basics are still the same. They all have Node.js as a common factor.

Getting started with CLI applications using Node.js couldn't be easier. To tackle the basics, let's create a simple CLI application that takes two arguments `joke` or `quote` and generates a joke or a quote.

## The Shebang

First things first, the starting point of any CLI application point is a line called the Shebang.

In Node.js the shebang looks something like this:

```javascript
#!/usr/bin/env node

```

The shebang tells the operating system what type of code is in the script. It also tells which interpreter it should assign to the script. If it were a python script, it would look something like this:

```python
#!/usr/bin/env py
```

The shebang, is only applicable in Unix/Linux operating systems. It should always be the first line of the entry file.

### Project Setup

To get started, let's setup our project and Node.js environment. In the terminal, enter:

```terminal
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

```terminal
    npm i axios chalk yargs
```

### Getting the jokes and quotes

Let's setup the jokes and quotes. We will be using a [quote-generator-api](https://quotes.rest/) and [jokes-generator-api](https://official-joke-api.appspot.com/). We will fetch the individual jokes and display them on the terminal when the user asks for them.

We will create two functions that will do the fetching using axios.

```javascript
#!/usr/bin/env node

const axios = require("axios");
const chalk = require("chalk");

let url = "";

function getJoke() {
  url = "https://official-joke-api.appspot.com/random_joke";
 axios({
 method: "get",
 url: url,
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
})
```

Note: We are using chalk to color our logs and get a colorful output. We setup an empty string called `url` so that when the user selects quotes, we load in the quote API URL and the same goes for jokes.

For now, the code won't work because we're not calling any of the functions.

## Understanding option/command/argument parsing

A good example of option parsing is when we passed _-y_ to our _npm init_ command to set everything to default.

The commands used in CLI applications often come with other options or flags. They extend the functionality of the application like in the example above.

A common application of options is when asking for user input which determines the output of the application.

Node.js comes with an in-built app interface for the process module called `process.argv`. It takes in the arguments passed, invokes a method and returns an array with all the arguments passed into the main process.

Using _process.arg_ might be tedious and not beginner friendly so we will use [yargs](https://www.npmjs.com/package/yargs) to help us process the options.

Yargs offers a lot of options that make it very powerful and widely used. Some of them include `.command()`, `.help()`, `.example()`, `.usage()` and others. To read more on the different capabilities of the options see the yargs [docs](https://github.com/yargs/yargs).

We will be making use of the command option to allow us to invoke a function when the set command is triggered. The syntax for this is:

```javascript
const argv = require("yargs");
argv.command(
  "name of command",
  "description of the command",
  functionA,
  functionB
).argv;
```

Note: _functionA_ will define the command arguments, then _functionB_ will implement the function.

In our project we need two commands, let's set them up

```javascript
const argv = require("yargs");
argv.command(
  "joke",
  "Fetching your joke",
  (yargs) => {},
  (argv) => {}
).argv;

argv.command(
  "quote",
  "Fetching a quote",
  (yargs) => {},
  (argv) => {}
).argv;
```

Finally, let's pass in our functions to enable the jokes and quotes to be displayed.

```javascript
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
    getQuotes();
  }
).argv;
```

To get a joke or quote run:

```terminal
node index.js joke
```

```terminal
node index.js quote
```

## Finishing Up

Our full code now looks like this:

```javascript
#!/usr/bin/env node

const axios = require("axios");
const chalk = require("chalk");
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
argv.help();
```

The result will look like this:
![image title](terminal.png)

We also added the help command to provide a default `--help/help` flag to give options to our application.

### Conclusion

In this article, we went through how to setup a CLI script using Node.js. We also went through what the shebang is and why it is important in CLI applications. 

Finally, we learned how to pass arguments and commands to the application. As a bonus, we used chalk to make our output looks nice and colorful.

You can get the full code [here](https://github.com/katungi/Node-CLI-Section)
