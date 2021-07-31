---
layout: engineering-education
status: publish
published: true
url: /nodejs-callback-concept/
title: Node.js Callback Concept
description: This article goes through the basics of asynchronous functions in node.js and how to use callbacks to perform tasks asynchronously. Callbacks are functions that are executed immediately an asynchronous function is done executing. 
author: monica-masae
date: 2021-05-17T00:00:00-10:30
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nodejs-callback-concept/hero.jpg
    alt: Callback image example
---
This article will go through the basics of asynchronous functions in Node.js and how to use callbacks to perform tasks asynchronously. A callback is the equivalent of an asynchronous function. Asynchronous functions are also known as non-blocking functions since they do not block the thread on which they are running on. Node.js relies heavily on asynchronous functions.
<!--more-->
### Introduction
This is because servers often receive many requests at a time; if the server was to be synchronous, requests would be processed one at a time which would lead to a bad user experience since the user might have to wait for a long time.

Since asynchronous functions do not block the thread, it might be difficult to track the function or do another task immediately the function is done executing. This is where callbacks come in, callback functions are functions that are passed in asynchronous functions and run immediately after the function. 

### Prerequisites
To follow this article along you will need the following:
- You need to have Node.js installed.
- You need to be familiar with creating and executing functions in Javascript.

Lets code!

### Synchronous functions
Let's first see how synchronous code looks like.

Create a file named **input.txt** with the following text:

```bash
Callbacks are functions that can be called immediately after completion of a task.
```

Then create a Javascript file named **main.js** and write the following code in it. 

```Javascript
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("Program Ended");
```

In the program above, we first import the built-in file system module. We then use the `readFileSync` method to read the file we created earlier. 

This function is synchronous, thus blocks the thread. The console won't output the result until the function is done reading the file.

Run the program through this command,

```bash
$ node main.js
```

The program runs successfully and produces the following output;

![Output](/engineering-education/nodejs-callback-concept/output1.png)

What if the file had a very large amount of data that would take almost a minute or two to complete? Also, we might need to do some other tasks that do not depend on the output of the read file function. 

In this case, waiting for the function to finish reading is not the best solution. It would be best to continue with the other tasks and come back to the function as soon as it is done computing. 

This brings us to asynchronous functions.

#### Asynchronous functions
As mentioned earlier, asynchronous functions are functions that do not block the thread. This means that after the asynchronous function has been invoked, the Node.js runtime continues executing other statements that follow. Oow! Awesome, right? 

This brings about a programming style known as parallelism. This is where two or more tasks are executed simultaneously hence the execution time depends on the longest running task.

Lets look at an example of an asynchronous function.

The file system module also gives us an asynchronous function to read a file. However, unlike the synchronous version, `readFile` does not return anything so we can not store the result.

Let's use the text file we created earlier.

Replace the code in **main.js** file with the following code.

```Javascript
var fs = require("fs");
fs.readFile('input.txt', () => {});
console.log("Program Ended");
```

Run the program again.

Notice that the console prints the program ended even though we have not acquired the result of the read file function. This is because the output can only be accessed at the callback function which we have not implemented yet.

Let's head on to the callbacks now.

### Callback functions
Callbacks are normally used when there is an asynchronous function. They are used to do tasks immediately once an asynchronous function is done executing. If the async function produces a result, the result will be available on the callback as a parameter.

Let's implement a callback.

Replace the `readFile` function with the following.

```Javascript
fs.readFile('input.txt', (err, data) => {
	if (err) return console.error(err)
	console.log(data.toString())
});
```

The callback function that we have added receives two parameters, error and data. The error parameter becomes null when the file has been read successfully. 

Therefore, we first check whether the error parameter contains any value. If true, the callback returns and prints an error in the console. Otherwise, the function prints out the content of the file.

Run the code. 

You should see the following:

![Output](/engineering-education/nodejs-callback-concept/output2.png)

Notice that the program prints "Program ended" before printing the content of the file. This is because the asynchronous function takes some time to complete hence the next statement which prints the "program ended" finishes executing first. 

As soon as the read file function finishes reading the file, the callback function is called and the necessary parameters are passed to it.

### Conclusion
In this article, we have gone through synchronous and asynchronous functions. We have also seen how to use callbacks to do tasks immediately after an asynchronous function is done executing. Callback functions give us a way to track the progress of async functions. 

Async functions on the other hand give us a way of doing tasks in parallel thereby minimizing execution time. This intern makes servers run faster, providing a good user experience. Hope this gives you the information you need to get started.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
