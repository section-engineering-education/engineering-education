In this tutorial, we will learn how to get a user input in a Node.js CLI application. To do this, you'll need to listen to STDIN ("standard input", i.e. your keyboard), which Node.js exposes for you as `process.stdin`, a readable stream.

Streams are a way of dealing with I/O. You can learn more about it in this [documentation](https://nodejs.org/api/stream.html). We'll use the `readline` module which is wrapper around standard I/O.

### Project Setup

To get started, let’s setup our project and Node.js environment. You can download Node.js from [here](https://nodejs.org/en/).

Create a new directory called `node-cli-input`. Inside the directory, run:

```bash
npm init -y
```

This will generate a `package.json` file.

Next up, let’s instal the `readline` package.

```bash
npm install readline
```

### Let's code

Create a new JavaScript file called `index.js`.

Next, we should import the `readline` package into our `index.js` file.

```JavaScript
const readline = require('readline');
```

We should create a new readline inteface object using the `readline.createInterface()` method and configure the readable and writable streams. Let's set the input and output streams to `process.stdin` and `process.stdout` respectively.

```JavaScript
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

We can ask a question to the user using the `rl.question()` method. The `rl.question()` method takes 2 arguments:

- **String**: This string will be displayed as the question to the user.

- **Callback Function**: The `rl.question()` method will wait until the user provides an input. Once the user provides an input, the callback function will be executed. The callback function will get the user's input as an argument.

> NOTE: We should close the streams using `rl.close()` method inside the callback function. If not closed, the process will remain in an idle state.

For example:

```JavaScript
rl.question("What is your favorite color? ", (input) => {
  console.log(input);
  rl.close();
});
```

Output:

![Simple Question Output](question_example.png)

You can add an event listener for the `close` streams event using the `rl.on()` method.

```JavaScript
rl.on('close', () => {
  console.log('Streams Closed')
})
```

Output:

![Close Streams](streams_closed.png)

### Callback Hell

The problem with the `rl.question()` method is, it doesn't return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Thus, we can't use [async/await](https://javascript.info/async-await) to pause the flow of the program until the user provides the input.

If you want to get multiple user inputs in sequence, you have to do it withing a callback function, like this:

```JavaScript
rl.question("Question 1? ", (answer1) => {
  // do stuff

  rl.question("Question 2? ", (answer2) => {
    // do stuff

    rl.question("Question 3? ", (answer3) => {
      // do stuff

      rl.question("Question 4? ", (answer4) => {
        console.log(answer1, answer2, answer3, answer4);
        rl.close();
      });
    });
  });
});
```

As you can see, this can quickly get out of control and the code will get hard to manage.