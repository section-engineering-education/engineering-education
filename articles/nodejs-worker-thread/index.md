### Introduction
Node.js is known to be single threaded allowing for the execution of single command at a given time.  
For example, making requests to processor intensive server side code, may block the event loop, slowing the execution of other subsequent requests.
For us to solve this problem, worker threads module was introduced in Node.js v10.5.  

In this tutorial, we walk through the concepts of worker thread, how it works and how it'll help us perform CPU intensive tasks without blocking other requests.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Exploring the worker thread api in Node](#exploring-the-worker-thread-api-in-node)
- [Using worker threads](using-worker-threads)
- [How worker threads work](#how-worker-threads-work)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Prerequisites
1. [Node.js](https://nodejs.org/en/download/) installed in your development environment
2. Basics of JavaScript synchronous and asynchronous programming.
3. Solid understanding how Node.js works.

### Objectives
At the end of this Node.js worker threads, you should be able to:

- understand how Node.js worker threads work.
- use woker threads.
- Get the best out of worker threads.
- understand the concpet of worker thread pooling.

### Exploring the worker thread api in Node
Node.js comes with the `worker_threads` module. This module helps in running JavaScript codes in parallel.  
Worker threads are responsible for handling CPU intensive tasks by transferring `ArrayBuffer` instances.  

They have proven to be the best solution for CPU performance due to the following features:
1. They run single process with multiple threads.
2. Executing one event loop per thread
3. Running single JS Engine instance per thread
4. Executing single Node.js instance per thread

### How worker threads work
Worker thread works by executing a piece of code specified by the main thread. Each worker executes in isolation from other workers.
However, these workers are able to pass message back and forth as required via a message channel.   

Parent worker uses the `worker.postMessage()` to write message to a channel while child worker uses `parentPort.postMessage()` function.  
Since JavaScript doesn't support concurrency, Node.js worker make use of [v8](https://v8docs.nodesource.com/node-0.8/d5/dda/classv8_1_1_isolate.html) allowing worker to run in complete isolation from other existing workers.  

### Using worker threads








