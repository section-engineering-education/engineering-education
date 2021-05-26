---
layout: engineering-education
status: publish
published: true
url: /nodejs-worker-thread/
title: Getting Started with Node.js Worker Thread
description: This tutorial will introduce the basic concepts on Node.js worker thread. The worker thread helps in executing CPU-intensive tasks without blocking other requests. 
author: miller-juma
date: 2021-05-26T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/nodejs-worker-thread/hero.jpg
   alt: Node.js worker thread
---
Node.js is known to be single-threaded, allowing for the execution of single command at a given time. For example, executing processor intensive server-side code may block the event loop, slowing the execution of other subsequent requests.
<!--more-->
### Introduction
For us to solve this problem, the worker threads module was introduced in Node.js v10.5. 

In this tutorial, we will walk through the concepts of the worker thread, how it works and how it'll help us perform CPU-intensive tasks without blocking other requests.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Exploring the worker thread api in Node](#exploring-the-worker-thread-api-in-node)
- [How worker threads work](#how-worker-threads-work)
- [Using worker threads](using-worker-threads)
- [Creating and executing new workers](#creating-and-executing-new-workers)
- [Conclusion](#conclusion)

### Prerequisites
1. [Node.js](https://nodejs.org/en/download/) installed in your development environment
2. Basics of JavaScript synchronous and asynchronous programming.
3. Solid understanding of how Node.js works.

### Objectives
At the end of this Node.js worker threads, you should be able to:
- Understand how Node.js worker threads work.
- Use worker threads.
- Get the best out of worker threads.
- Understand the concept of worker thread pooling.

### Exploring the worker thread API in Node.js
Node.js comes with the `worker_threads` module. This module helps in running JavaScript codes in parallel.  
Worker threads are responsible for handling CPU-intensive tasks by transferring `ArrayBuffer` instances.  

They have proven to be the best solution for CPU performance due to the following features:
1. They run a single process with multiple threads.
2. Executing one event loop per thread.
3. Running single JS Engine instance per thread.
4. Executing single Node.js instance per thread.

### How worker threads work
The worker thread works by executing a piece of code specified by the main thread. Each worker executes in isolation from other workers. However, these workers can pass a message back and forth as required via a message channel.   

Parent worker uses the `worker.postMessage()` to write message to a channel while child worker uses `parentPort.postMessage()` function.  

Since JavaScript doesn't support concurrency, Node.js worker makes use of [V8](https://v8docs.nodesource.com/node-0.8/d5/dda/classv8_1_1_isolate.html) allowing the worker to run in complete isolation from other existing workers.  

### Using worker threads
In this section, let's create a worker thread example and pass it on to some dummy data.

```js
//add this code snippet to main.js

const { Worker } = require('worker_threads')

const runService = (WorkerData) => {
    return new Promise((resolve, reject) => {
    
        // import workerExample.js script..
    
        const worker = new Worker('./workerExample.js', { WorkerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`stopped with  ${code} exit code`));
        })
    })
}

const run = async () => {
    const result = await runService('hello John Doe')
    console.log(result);
}

run().catch(err => console.error(err))

```

```js
// add this to workerExample.js file.
const { WorkerData, parentPort } = require('worker_threads')
parentPort.postMessage({ welcome: WorkerData })
```
**Output**

```bash

{ welcome: 'hello John Doe' }

```

In our `main.js` script, we begin by importing `Worker` from `worker_threads`, then passing the `data(filename)` for the worker to process. 

The next step involves listening to message events from the worker thread as seen in the `workerExample.js` service.  

This worker service has the `WorkerData` sent from our main application and a way to send back processed data via `parentPort`. This object (`parentPort`) has `postMessage()` that we use to pass processed data.  

> Worker threads also provide ways to share a memory, using the `SharedArrayBuffer instances` as we had seen before. 
> Remember sharing memory could also be achieved by transferring `ArrayBuffer instances`.

### Creating and executing new workers
In this section, let's take a look at CPU intensive example, generating a [Fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) sequence. 

This task, if generated without the worker threads, would block the main thread as the `nth` term increases.

```js
//
In your `index.js` file, add the following:
const {Worker} = require("worker_threads");

let number = 10;

const worker = new Worker("./myWorker.js", {workerData: {num: number}});

worker.once("message", result => {
    console.log(`${number}th Fibonacci No: ${result}`);
});

worker.on("error", error => {
    console.log(error);
});

worker.on("exit", exitCode => {
    console.log(`It exited with code ${exitCode}`);
})

console.log("Execution in main thread");
```

```js
//add this script in myWorker.js file
const {parentPort, workerData} = require("worker_threads");

parentPort.postMessage(getFibonacciNumber(workerData.num))

function getFibonacciNumber(num) {
    if (num === 0) {
        return 0;
    }
    else if (num === 1) {
        return 1;
    }
    else {
        return getFibonacciNumber(num - 1) + getFibonacciNumber(num - 2);
    }
}
```

**Output**

```bash
Execution in the main thread
10th Fibonacci No: 55
It exited with code 0

```

In the `index.js` file, we create a worker thread from an instance of the `Worker` class as we had seen in the previous example.  

To get results, we listen to 3 events, 
- `message` that is executed when a worker posts a message.
- `exit` event that is being triggered in case the worker stops the execution.
- `error` is triggered when an error occurs.

Our last line in the `index.js`,

```js
console.log("Execution in main thread");
``` 

This is an execution in the main thread that would be executed as we wait for the results from the worker as seen in the above output.

We can therefore handle any other task without worrying about blocking the main thread as long as a CPU intensive task is handled in the worker thread.

### Conclusion
Node.ja has always been criticized due to its performance when it comes to CPU-intensive tasks. The introduction of worker threads has improved the power of Node.js by effectively taking care of these shortcomings.  

For more information about worker threads, visit its official documentation [here](https://nodejs.org/api/worker_threads.html#worker_threads_worker_threads).

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
