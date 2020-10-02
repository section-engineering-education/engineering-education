Javascript has embraced asynchronous programming with single thread processing. Every task executes in the order the code is written. Embracing asynchronous promises and callbacks ensure non-blocking operations flow. Asynchronous permits other processing to continue even before the first transmission has finished. This makes it a more versatile and robust solution for event looping on long-running code. Utility modules like [Async.js](https://github.com/caolan/async) provide functions for working with asynchronous flow control.

To understand how asynchronous programming works, we can use the following example. Suppose you are making scrambles eggs for breakfast. There are several actions/steps to follow. Below is a sample recipe.

1. Whisk two eggs with some milk, cream, and a pinch of salt.
2. Heat a frying pan for a minute.
3. Melt some butter on the pan.
4. Pour in egg mixture without stirring for 20 seconds.
5. Stir the mixture while folding and lifting with a wooden spoon.
6. Let the eggs sit for another 20 seconds, then stir and fold again.
7. Repeat until the eggs are soft and slightly runny.
8. Remove from heat and let it sit for 10 seconds.
9. Give it a final stir and serve the eggs with some fresh veggies.

If you look at these steps, there are some breaks that you need to wait before proceeding to the next step. You can't skip those time intervals and hope to get some lovely eggs. Javascript is threaded. Everything is executed in the order of how your code is written. If we wrote the scrambled eggs steps in javascript, this is how it would look like.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/someScrabbledEggs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Javascript served me the eggs even before heating the pan and pouring the mixture to cook. And there is nothing wrong with javascript. It did what we instructed it to do in a ‘`synchronous process`. It will execute the timeout functions but won't wait to finish because we didn't tell it to. Imagine this coded concept was implemented in a bank system. This can lead to a case where a user can withdraw some money even before he/she deposits it. This where `control flow` comes in.

### Control flows
[Control flow](https://caolan.github.io/async/v3/docs.html#controlflow) is the order in which individual statements, instructions, or function calls of an imperative program are executed or evaluated. ([Wikipedia](https://en.wikipedia.org/wiki/Control_flow))

This article goes through `async flow` functions using [Async.js](https://caolan.github.io/async/v3/) to control the flow of task executions. The functions include Serial, Parallel, Waterfall, Queues, etc.

#### Parallel
[Parallel](https://caolan.github.io/async/v3/docs.html#parallel) tasks mean running many functions at the same time without waiting for the previous functions to complete. Once these tasks are completed, their results are passed to a main callback, which returns an array of results. With `async.parallel`, you do not control what finishes before the other. Your code will be optimized to run tasks simultaneously. Generally, Javascript does not technically execute these many tasks simultaneously. What happens is that each task is pushed to an asynchronous event loop without control of which task will finish before the other. It still maintains a single thread operation.

##### Parameters
- `Tasks` - a collection of tasks to run asynchronously.
- `Callback` - a function that runs once the tasks are successfully executed or when one returns an error.

**Syntax:** `async.parallel(tasks, callback)`

A collection of functions will be the first argument to the `async.parallel`. Each function is passed to a callback. The callback will be called on tasks completion.

The `async.parallel` second argument will return the results of all the functions passed as `tasks`. The final callback returns an array if the asynchronous functions passed on the first argument are arrays. Else, an object result will be invoked if the object properties were declared.

Example of `async.parallel` array.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-parallel-array?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

You can also use objects instead of arrays. Each object property will execute as a function. Its task results will be passed to the main callback, which will return an object.

Example of using objects instead of an array.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-parallel-objects?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

**Note:** if your task has no timers or does not perform any I/O, the code will run in series. Every task will be executed one after the other. If one of the functions returns an error to its callback. The final callback will immediately be invoked to null or with the error output.

#### Race
[Race](https://caolan.github.io/async/v3/docs.html#race) is a close relative to parallel. `async.race` runs a collection of tasks parallel. There is a small difference between race and parallel. As soon as any function executes successfully, the main callback is invoked immediately with the results.

##### Parameters
- `Tasks` - an array containing multiple tasks to run asynchronously. Every function can execute successfully with an optimal result value.
- `Callback` - a function that runs once the tasks are successfully executed or when one task returns an error. In a race, this function will get the results or an error of the first function that executes successfully.

**Syntax:** `async.race(tasks, callback)`

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-race?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Queue
A [queue](https://caolan.github.io/async/v3/docs.html#queue) can be used to run tasks asynchronously. It is created with a specified concurrency. Tasks are executed parallel but with a concurrency limit. A queue object is completed based on an asynchronous operation and passed to a worker. If all workers are in progress, the task is queued until one becomes available. When a worker completes a task, the task callback is called.

#### Parameters
- `Worker` - workers are invoked with tasks and callbacks. Worker is an asynchronous function. It processes all tasks assigned to the queue. Tasks and callbacks are the main parameters processed by a worker.
- `Concurrency` - determines the number of worker functions to run parallel during the lifecycle of a queue.

**Syntax:** `async.queue (tasks, concurrency)`

`async.queue` returns a queue object that manages a task. These object properties can be attached to callbacks then listen to tasks during the queue lifecycle.
These [queue object properties](https://caolan.github.io/async/v3/docs.html#QueueObject) include:

- Push - it is an async function that adds a task to a queue to be processed within the workers. Once the workers finish processing these tasks, they are called within a callback. The callback can take a single task or an array of tasks. A push is invoked with a `queue.push(task, [callback])`.
- Drain - it specifies a callback to be called after the last task item of the queue has finished and passed to a worker. Invoked with a `q.drain()`
- Upshift - it adds a task to the beginning of a queue. The upshift is called with `queue.unshift (task, [callback])`.

Other queue objects that can be included in the async queue include:

- Pause - suspends the queue from processing tasks until `resume()` is invoked. Pause is called with `queue.pause ()`.
- Paused - takes a Boolean value that determines if a queue is in a paused state.
- Resume - resumes a paused queue task when the queue process was called. Called with `queue.resume()`.
- Kill - it empties the remaining tasks in the queue and forces the queue process to run idle. When this function is called, no more tasks will be pushed to the queue. Invoked with `queue.kill()`.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-queue?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

A queue can take [priority tasks](https://caolan.github.io/async/v3/docs.html#priorityQueue). But this time, `async.queue` is replaced with `async.queue priority`. `async.Priorityqueue` assigns a priority to a task. A queue is completed in ascending priority order. It does not support the unshift object property of a queue.

##### Parameters
Unlike `async.queue`, the task takes three parameters:
- The tasks to be pushed in the queue
- A priority number which determines the sequence of the execution, and
- The callback function

**Syntax:** `async.Priorityqueue (tasks, concurrency)`

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-Priorityqueue?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Series
[Async series](https://caolan.github.io/async/v3/docs.html#series) is used to run a collection of task executions in a sequence. It comes in rescue when tasks do not depend on the results of the previous task. If any function within the series functions returns an error to its callback, the whole series stops. No more functions will be executed. The final callback will immediately be called with the error.

##### Parameters
- `Tasks` - takes multiple tasks to run asynchronously.
- `Callback` - a function that returns the results of the tasks as an array or an object. Contains all the result arguments that were passed to the task callbacks. It is the final callback and returns results or an error, invoked with `(err, result)`.

**Syntax:** `async.series(tasks, callback)`

If the tasks execute correctly, the callback receives an array result of the completed tasks. Objects can still be used instead of arrays, and each object property runs as a function. The function results will be handed over to the main callback as an object property. An object is a better readable mode to handle the results of a series of tasks.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-series-object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

**Note:** according to [ECMAScript language specifications](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6), the order of execution of object properties is not defined or specified. This means that the functions will not be executed in the same order as you specified. If you rely on the order of execution of the series functions, consider using an array instead of an object, as shown in the example below.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-series-array?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Waterfall
A [waterfall](https://caolan.github.io/async/v3/docs.html#waterfall) runs an array of multiple asynchronous task functions in series. It comes in handy when each task is dependent on the results of the previous tasks.

##### Parameters
- `Tasks` - an array of tasks to perform asynchronously. The result of each task is passed as an argument to the next task.
- `Callback` - returns the results of all the completed functions. These will be the results of the final task passed as an argument.

**Syntax:** `async.waterfall(tasks, callback)`

The callback of each task contains a null first argument and the results of the subsequent argument. Each function takes the results of the previous callback as the first parameter and the final callback.

Example 1 using undefined functions

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-waterfall-undefined?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Example 2 with named functions

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/waterfall-with-funtions?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Conclusion
Async.js will help you manage the flow of your tasks. It helps to keep your code light and clean. It makes it even easier to debug and handle errors within your script. Async.js makes you realize how simple your code can be to avoid running into a [callback hell](http://callbackhell.com/).
