---
layout: engineering-education
status: publish
published: true
url: /understanding-node-js-async-control-flows/
title: Understanding Asynchronous Control Flows in Node.js Using Async.js
description: This article goes through Async flow functions using Async.js to control the flow of task executions. Including serial, parallel, waterfall, & queues.
author: joseph-chege
date: 2020-10-13T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-node-js-async-control-flows/hero.jpg
    alt: Node.js async control flows
---
Asynchronous control flows permit other processing to continue even before the first transmission has finished. JavaScript has embraced asynchronous programming with single thread processing. Every task executes in the order the code has been written. Embracing asynchronous [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and callbacks ensure [non-blocking operations flow](https://stackoverflow.com/questions/10570246/what-is-non-blocking-or-asynchronous-i-o-in-node-js).
<!--more-->
This makes it a more versatile and robust solution for [event looping](/event-loop-explained/) on long-running code. Utility modules like [Async.js](https://github.com/caolan/async) provide functions for working with asynchronous flow control.

To understand how asynchronous programming works, we can use the following example. Suppose you are making scrambled eggs for breakfast. There are several actions/steps to follow.

Below is a sample recipe.

1. Whisk two eggs with some milk, cream, and a pinch of salt.
2. Heat a frying pan for a minute.
3. Melt some butter on the pan.
4. Pour in egg mixture without stirring for 20 seconds.
5. Stir the mixture while folding and lifting with a wooden spoon.
6. Let the eggs sit for another 20 seconds, then stir and fold again.
7. Repeat until the eggs are soft and slightly runny.
8. Remove from heat and let it sit for 10 seconds.
9. Give it a final stir and serve the eggs with some fresh veggies.

If you look at the steps above, there are some periods of waiting before proceeding to the next step. You can't skip those time intervals and hope to get some lovely eggs.

JavaScript is threaded, meaning everything is executed in the order your code is written.

If we wrote the scrambled eggs steps in JavaScript, this is how it would look.

```js
function someScrabbledEggs(callback) {
    console.log('whisk two eggs with some milk cream, and a pinch of salt together');
     setTimeout(function () {
    console.log('heat my non-stick frying pan for 30 seconds');
    }, 3000);
    console.log('add some butter and let it melt ');
     setTimeout(function () {
    console.log('pour in my egg mixture without stirring for 20 seconds');
    }, 2000);
    console.log('stir while folding and lifting the mixture over with a wooden spoon');
    setTimeout(function () {
        console.log('let the eggs sit for another 20 seconds, then stir and fold again');
    }, 2000);
    console.log('repeat until the eggs are soft and slightly runny');
     setTimeout(function () {
    console.log('remove from heat and let it sit for 10 seconds ');
    }, 1000);
    console.log('give it a final stir and serve the eggs with some fresh veggies');
}
someScrabbledEggs();
```

JavaScript served us the eggs even before heating the pan and pouring the mixture to cook.

There is nothing wrong with JavaScript.

It did what we instructed it to do in a `synchronous process`. It will execute the timeout functions but won't wait to finish because we didn't tell it to.

Imagine this coded concept being implemented in a bank system. This could lead to a case where a user may withdraw some money even before he/she deposits it. This is where `control flow` comes into play.

### Control flows
[Control flow](https://en.wikipedia.org/wiki/Control_flow) is the order in which individual statements, instructions, or function calls of an imperative program are executed or evaluated.

This article goes through `async flow` functions using [Async.js](https://caolan.github.io/async/v3/) to control the flow of task executions.

The functions include serial, parallel, waterfall, queues, etc.

#### Parallel
[Parallel](https://caolan.github.io/async/v3/docs.html#parallel) tasks mean running many functions at the same time without waiting for the previous functions to complete. Once these tasks are completed, their results are passed to a main callback, that returns an array of results.

With `async.parallel`, you do not control what function finishes before the other. Your code will be optimized to run tasks simultaneously. Generally, JavaScript does not execute these many tasks simultaneously.

What happens is that each task is pushed to an asynchronous event loop without control of which task will finish before the other. It still maintains a [single thread operation](https://www.tutorialspoint.com/single-threaded-and-multi-threaded-processes).

##### Parallel Parameters
- `Tasks` - a collection of tasks to run asynchronously.
- `Callback` - a function that runs once the tasks are successfully executed or when one returns an error.

**Syntax:** `async.parallel(tasks, callback)`

A collection of functions will be the first argument to the `async.parallel`. Each function is passed to a callback. The callback will be called upon a task's completion.

The `async.parallel` second argument will return the results of all the functions passed as `tasks`. The final callback returns an array if the asynchronous functions passed on the first argument are arrays.

Otherwise, an object result will be invoked if the object properties were declared.

###### Example of `async.parallel` array.

```js
const async = require('async')
//array of tasks
async.parallel([
  function(callback) {
    setTimeout(function() {
      console.log('Task One');
      callback(null, 1);
    }, 200);
  },
  function(callback) {
    setTimeout(function() {
      console.log('Task Two');
      callback(null, 2);
    }, 100);
  }
],
// optional callback
function(err, results) {
  console.log(results);
  // the results array will equal [1, 2] even though the second function had a shorter timeout.
});
```

You can also use objects instead of arrays. Each object property will execute as a function. Its task results will be passed to the main callback, that will return an object.

###### Example of using objects instead of an array.

```js
const async = require('async')
// an example using an object instead of an array
async.parallel({
  task1: function(callback) {
    setTimeout(function() {
      console.log('Task One');
      callback(null, 1);
    }, 200);
  },
  task2: function(callback) {
    setTimeout(function() {
      console.log('Task Two');
      callback(null, 2);
    }, 100);
    }
}, function(err, results) {
  console.log(results);
  // results now equals to: { task1: 1, task2: 2 }
});
```

**Note:** If your task has no timers or does not perform any I/O, the code will run in series. Every task will be executed one after the other.

If one of the functions returns an error to its callback. The final callback will immediately be invoked to null or with the error output.

#### Race
[Race](https://caolan.github.io/async/v3/docs.html#race) is a close relative to parallel. `async.race` runs a collection of tasks in parallel. There is a small difference between race and parallel. Using race as soon as any function executes successfully, the main callback is invoked immediately with the results.

##### Race Parameters
- `Tasks` - an array containing multiple tasks to run asynchronously. Every function can execute successfully with an optimal result value.
- `Callback` - a function that runs once the tasks are successfully executed or when one task returns an error. In a race, this function will get the results or an error of the first function that executes successfully.

**Syntax:** `async.race(tasks, callback)`

```js
const async = require('async')
async.race([
  function (callback) {
    setTimeout(function () {
    console.log('Task One');
    callback(null, 'one');
    }, 300);
  },
  function (callback) {
    setTimeout(function () {
      console.log('Task two');
      callback(null, 'two');
    }, 100);
  },
  function (callback) {
    setTimeout(function () {
      console.log('Task three');
      callback(null, 'three');
    }, 200);
  }
],
  // main callback
  function (err, result) {
    // the result will be equal to 'two' as it finishes earlier than the other 2
    //note the main callback As soon as any task two executes
    console.log('The result is task ', result);
  });
```

#### Queue
A [queue](https://caolan.github.io/async/v3/docs.html#queue) can be used to run tasks asynchronously. It is created with a specified [concurrency](https://en.wikipedia.org/wiki/Concurrency_(computer_science)). Tasks are executed in parallel but with a concurrency limit.

A queue object is completed based on an asynchronous operation and passed to a worker. If all workers are in progress, the task is queued until one becomes available. When a worker completes a task, the task callback is called.

#### Queue Parameters
- `Worker` - workers are invoked with tasks and callbacks. A worker is an asynchronous function. It processes all tasks assigned to the queue. Tasks and callbacks are the main parameters processed by a worker.
- `Concurrency` - determines the number of worker functions to run parallel during the lifecycle of a queue.

**Syntax:** `async.queue (tasks, concurrency)`

`async.queue` returns a queue object that manages a task. These object properties can be attached to callbacks then listens to tasks during the queue lifecycle.

These [queue object properties](https://caolan.github.io/async/v3/docs.html#QueueObject) include:

- **Push** - it is an async function that adds a task to a queue to be processed within the workers. Once the workers finish processing these tasks, they are called within a callback. The callback can take a single task or an array of tasks. A push is invoked with a `queue.push(task, [callback])`.
- **Drain** - it specifies a callback to be called after the last task item of the queue has finished and passed to a worker. Invoked with a `q.drain()`
- **Unshift** - it adds a task to the beginning of a queue. The unshift is called with the `queue.unshift (task, [callback])`.

Other queue objects that can be included in the async queue include:

- **Pause** - suspends the queue from processing tasks until `resume()` is invoked. Pause is called with `queue.pause ()`.
- **Paused** - takes a Boolean value that determines if a queue is in a paused state.
- **Resume** - resumes a paused queue task when the queue process was called. Called with `queue.resume()`.
- **Kill** - it empties the remaining tasks in the queue and forces the queue process to run idle. When this function is called, no more tasks will be pushed to the queue. Invoked with `queue.kill()`.

```js
const async = require('async')
// create a queue object with concurrency 2
const q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

// assign a callback
q.drain(function() {
    console.log('all items have been processed');
});

// assign an error callback
q.error(function(err, task) {
    console.error('task experienced an error');
});

// add some items to the queue
q.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
// callback is optional
q.push({name: 'bar'});

// add some items to the queue (batch-wise)
q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
    console.log('finished processing item');
});

// add some items to the front of the queue
q.unshift({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});
```

A queue can take [priority tasks](https://caolan.github.io/async/v3/docs.html#priorityQueue). But this time, `async.queue` is replaced with `async.queue priority`.

`async.Priorityqueue` assigns a priority to a task. A queue is completed in ascending priority order. It does not support the unshift object property of a queue.

##### Priority Tasks Parameters
Unlike `async.queue`, the task takes three parameters:
- The tasks to be pushed in the queue.
- A priority number which determines the sequence of the execution.
- The callback function.

**Syntax:** `async.Priorityqueue (tasks, concurrency)`

```js
const async = require('async')
// create a queue object with concurrency 1
var q = async.priorityQueue(function(task, callback) {
  console.log('Hello ' + task.name);
  callback();
}, 1);

// assign a callback
q.drain = function() {
  console.log('All items have been processed');
};

// add some items to the queue with priority
q.push({name: 'foo'}, 3, function(err) {
  console.log('Finished processing foo');
});

q.push({name: 'bar'}, 2, function (err) {
  console.log('Finished processing bar');
});

// add some items to the queue (batch-wise) which will have same priority
q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], 1, function(err) {
  console.log('Finished processing item');
});
```

#### Series
[Async series](https://caolan.github.io/async/v3/docs.html#series) is used to run a collection of task executions in a sequence. It comes to the rescue when tasks do not depend on the results of the previous task.

If any function within the series functions returns an error to its callback, the whole series stops. No more functions will be executed. The final callback will immediately be called with the error.

##### Series Parameters
- `Tasks` - takes multiple tasks to run asynchronously.
- `Callback` - a function that returns the results of the tasks as an array or an object. Contains all the result arguments that were passed to the task callbacks. It is the final callback and returns results or an error, invoked with `(err, result)`.

**Syntax:** `async.series(tasks, callback)`

If the tasks execute correctly, the callback receives an array result of the completed tasks. Objects can still be used instead of arrays, and each object property runs as a function.

The function results will be handed over to the main callback as an object property. An object is a better readable mode to handle the results of a series of tasks.

```js
const async = require('async')
async.series({
  1: function(callback) {
    setTimeout(function() {
      console.log('Task 1');
      callback(null, 'one');
    }, 200);
  },
  2: function(callback) {
    setTimeout(function() {
      console.log('Task 2');
      callback(null, 'two');
    }, 300);
  },
  3: function(callback) {
    setTimeout(function() {
      console.log('Task 3');
      callback(null, 'three');
    }, 100);
  },
   4: function(callback) {
    setTimeout(function() {
      console.log('Task 4');
      callback(null, 'four');
    }, 100);
  }
},
function(err, results) {
  console.log(results);
  // results is now equal to: { 1: 'one', 2: 'two', 3:'three' }
});
```

**Note:** According to [ECMAScript language specifications](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6), the order of execution of object properties is not defined or specified.

This means that the functions will not be executed in the same order you specified. If you rely on the order of execution of the series functions, consider using an array instead of an object, as shown in the example below.

```js
const async = require('async')
async.series([
  function(callback) {
    // do some more stuff ...
    console.log('Task one');
    callback(null, 1);
  },
  function(callback) {
    // do some more stuff ...
    console.log('Task two');
    callback(null, 2);
  },
  function(callback) {
    // do some more stuff ...
    console.log('Task three');
    callback(null, 3);
  },
   function(callback) {
    // do some more stuff ...
    console.log('Task four');
    callback(null, 4);
  }
],
 // main/final callback
function(err, results) {
  console.log(results);
  // results is now equal to [1, 2, 3]
});
```

#### Waterfall
A [waterfall](https://caolan.github.io/async/v3/docs.html#waterfall) runs an array of multiple asynchronous task functions in series. It comes in handy when each task is dependent on the results of the previous tasks.

##### Waterfall Parameters
- `Tasks` - an array of tasks to perform asynchronously. The result of each task is passed as an argument to the next task.
- `Callback` - returns the results of all the completed functions. These will be the results of the final task passed as an argument.

**Syntax:** `async.waterfall(tasks, callback)`

The callback of each task contains a null first argument and the results of the subsequent argument. Each function takes the results of the previous callback as the first parameter and the final callback.

###### Example 1 using undefined functions

```js
const async = require('async')
async.waterfall([
  function(callback) {
    callback(null, 'Task 1', 'Task 2');
  },
  function(arg1, arg2, callback) {
    // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
    let arg3 = arg1 + ' and ' + arg2;
    callback(null, arg3);
  },
  function(arg1, callback) {
    // arg1 now equals 'Task1 and Task2'
    arg1 += ' completed';
    callback(null, arg1);
  }
], function(err, result) {
  // result now equals to 'Task1 and Task2 completed'
  console.log(result);
});
```

###### Example 2 with named functions

```js
const async = require('async')
// with named functions:
async.waterfall([
  myFirstFunction,
  mySecondFunction,
  myLastFunction,
], function(err, result) {
  // result now equals 'Task1 and Task2 completed'
  console.log(result);
});

function myFirstFunction(callback) {
  callback(null, 'Task 1', 'Task 2');
}
function mySecondFunction(arg1, arg2, callback) {
  // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
  let arg3 = arg1 + ' and ' + arg2;
  callback(null, arg3);
}
function myLastFunction(arg1, callback) {
  // arg1 now equals 'Task1 and Task2'
  arg1 += ' completed';
  callback(null, arg1);
}
```

### Conclusion
Async.js will help you manage the flow of your tasks. It helps to keep your code light and clean. It makes it easier to debug and handle errors within your script. Async.js makes you realize how simple your code can be by avoiding running into a [callback hell](http://callbackhell.com/).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
