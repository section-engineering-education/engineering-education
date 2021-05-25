### Introduction
Node.js is known to be single threaded allowing for the execution of single command at a given time.  
For example, making requests to processor intensive server side code, may block the event loop, slowing the execution of other subsequent requests.
For us to solve this problem, worker threads module was introduced in Node.js v10.5.  

In this tutorial, we walk through the concepts of worker thread, how it works and how it'll help us perform CPU intensive tasks without blocking other requests.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Exploring the worker thread api in Node](#exploring-the-worker-thread-api-in-node)
- [Executing code using worker threads](#executing-code-using-worker-threads)
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
