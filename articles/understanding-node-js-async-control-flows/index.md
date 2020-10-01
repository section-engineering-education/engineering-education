Javascript has embraced asynchronous with single thread processing. Every task executes in the order the code is written. Embracing asynchronous promises and callbacks ensure non-blocking operations flow. Asynchronous permits other processing to continue even before the first transmission has finished. This makes it a more versatile and robust solution for event looping on long-running code. Utility modules such as [Async.js](https://github.com/caolan/async) provide powerful functions for working with asynchronous flow control.

To understand how asynchronous work, I want to paint this picture on your mind. Imagine you want to make some lovely scrambled eggs for your breakfast. Do you just walk into the kitchen and get some scrambled eggs? Or are there some several steps you need to follow to make those lovely scrambled eggs? It would typically be best if you took several steps/action before you assumably enjoy your scrambled eggs breakfast. If you are like me, there is how I will make my eggs.

1. Whisk two eggs with some milk, cream, and a pinch of salt together.
2. Heat my nonstick frying pan for a minute.
3. Add some butter and let it melt.
4. Pour in my egg mixture without stirring for 20 seconds.
5. Stir the stir while folding and lifting the mixture over with a wooden spoon.
6. Let the eggs sit for another 20 seconds, then stir and fold again.
7. Repeat until the eggs are soft and slightly runny.
8. Remove from heat and let it sit for 10 seconds.
9. Give it a final stir and serve the eggs with some fresh veggies.

If you look at these steps, there are some breaks that you need to wait before proceeding to the next step. You won't blindly skip those time intervals and hope to get some lovely eggs. Are we still talking about javascript? Please don't eat your eggs. We need to first talk about javascript. Javascript is threaded. Everything is executed in the order of how your code is written. If we write the scrambled eggs steps in javascript, this is how it would look like.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/someScrabbledEggs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Did you see what just happened? Javascript served me the eggs even before heating the pan and pouring the mixture to cook. And there is nothing wrong with javascript. It did what we instructed it to do in a ‘synchronous process.’ Javascript will execute the timeout functions but won't wait to finish because we didn't tell it to. Imagine this coded concept was implemented in a bank system, which means a case where a user can withdraw some money even before he or she deposits to the bank account. This where the control flow concept comes in.

### Control flow

[Control flow](https://caolan.github.io/async/v3/docs.html#controlflow) is the order in which individual statements, instructions, or function calls of an imperative program are executed or evaluated,[Wikipedia](https://en.wikipedia.org/wiki/Control_flow).
This article will guide you on using common async flow functions such as Serial, Parallel, Waterfall, and Queues using [Async.js](https://caolan.github.io/async/v3/) to control the flow of task executions in a scrip.

#### Parallel

[Parallel](https://caolan.github.io/async/v3/docs.html#parallel) tasks mean running multiple functions at the same time without waiting for the previous functions to complete. Once these tasks are completed, their results are passed to a main callback, which returns an array of results. With async.parallel, you do not control what finishes before the other, as your code will be optimized to run tasks simultaneously. Generally, Javascript does not technically execute these multiple tasks simultaneously. What happens it that each task is pushed to an asynchronous event loop with no control of which task will finish before the other but still maintaining a single thread operation.

##### Parameters

- Tasks - collection tasks to run asynchronously.
- Callback - function that runs once the tasks are successfully executed or when one on the tasks returns an error.

**Syntax:** `async.parallel(tasks, callback)`

`async.parallel` method is used to run a collection of tasks in parallel. All the collection of these functions will be the first argument to the `async.parallel`. Each function is passed to a callback. The callback will be called on tasks completion.

The `async.parallel` second argument will return the results of all the functions declared in the first argument. The final callback results can be an array if the asynchronous functions passed on the first argument are arrays. Else, an object result will be invoked if the object properties were declared.

Example of `async.parallel` array.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-parallel-array?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

You can also use objects instead of arrays. Each object property will execute as a function, and its task results will be passed to the main callback, which will return an object result.

Example of using objects instead of an array.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-parallel-objects?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

**Note:** if your task has no timers or does not perform any I/O, the code will run in series, and every task will happen one after the other. If one of the functions returns an error to its callback. The final callback will immediately be invoked to null or with the value of the error output.

[Race](https://caolan.github.io/async/v3/docs.html#race) is a close relative to parallel. `async.race` runs a collection of tasks parallel. Though there is a small difference between race and parallel. As soon as any given function executes successfully, the main callback is invoked immediately with the results of that function.

##### Parameters

- Tasks - an array containing multiple tasks to run asynchronously, every function can execute successfully with an optimal result value.
- Callback - function that runs once the tasks are successfully executed or when one on the tasks returns an error. In a race, this function will get the results or an error of the first function that executes successfully.

**Syntax:** `async.race(tasks, callback)`

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-race?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Queue

A [queue](https://caolan.github.io/async/v3/docs.html#queue) can be used to run tasks asynchronously. A queue is created with a specified concurrency. Queue tasks are executed parallel but with a concurrency limit. A queue object is completed based on an asynchronous operation and passed to a worker. If all workers are in progress, the task is queued until one becomes available. When a worker completes a task, the task callback is called.

#### Parameters

- Worker - workers are invoked with tasks and callbacks. Worker is an asynchronous function. It processes all tasks assigned to the queue. Tasks and callbacks are the main parameters processed by a worker.
- Concurrency - determines the number of worker functions to run parallel during the lifecycle of a queue.

**Syntax:** `async.queue (tasks, concurrency)`

`async.queue` returns a queue object that manages a task. These object properties can be attached to callbacks to listen to specific tasks during the queue lifecycle.
These [queue object properties](https://caolan.github.io/async/v3/docs.html#QueueObject) include.

- Push - it is an async function that adds a task to a queue to be processed within the workers. Once the workers finish processing these tasks, they are called within a callback, which can take a single task or an array of tasks. A push is invoked with a `queue.push(task, [callback])`.
- Drain - it specifies a callback to be called after the last task item of the queue has finished and passed to a worker. Invoked with a `q.drain()` 
- Upshift - add a task to the beginning of a queue. The upshift is called with `queue.unshift (task, [callback])`.

Other common queue objects that can be included in the async queue includes:

- Pause - suspends the queue from processing tasks until `resume ()` is invoked. Pause is called with `queue.pause ()`.
- Paused - takes a Boolean value that determines if a queue is in a paused state.
- Resume - resumes a paused queue task when the queue process was called. Called with `queue.resume()`.
- Kill - it empties the remaining tasks in the queue and forces the queue process to run idle. When this function is called, no more tasks will be pushed to the queue. Invoked with `queue.kill()`.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-queue?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

A queue can take [priority](https://caolan.github.io/async/v3/docs.html#priorityQueue) tasks. But this time, `async.queue` is replaced with `async.queue priority`. `async.Priorityqueue` assigns a priority to a task. A queue is completed in ascending priority order and does not support the unshift object property of a queue.

##### Parameters

Unlike `async.queue`, the task takes three parameters, namely
- The tasks to be pushed in the queue
- A priority number which determines the sequence of the execution, and
- The callback function

**Syntax:** `async.Priorityqueue (tasks, concurrency)`

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-Priorityqueue?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### SERIES

Async [series](https://caolan.github.io/async/v3/docs.html#series) is used to run a collection of tasks in a sequence execution order. It comes in rescue when tasks do not depend on the results of the previous task. If any function within the series functions returns an error to its callback, the whole series stops, and no more functions will be executed. The final callback will immediately be called with the error message.

##### Parameters

- Tasks - take multiple tasks to run asynchronously.
- Callback - a function that takes the results of the tasks returned as an array or an object. Contains all the result arguments that were passed to the task callbacks. It is the final callback and returns results or an error, invoked with `(err, result)`.

**Syntax:** `async.series(tasks, callback)`

If the tasks execute correctly, the callback receives an array result of the completed tasks. Objects can still be used instead of arrays, and each object property runs as a function. That function results will be handed over to the main callback as an object property. An object is a better readable mode to handle the results of a series of tasks.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-series-object?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

**Note:** according to [ECMAScript language specifications](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6), the order of execution of object properties is not defined or specified. This means that the functions will not be executed in the same order as you specified. If you rely on the order of execution of the series functions to work on all platforms, consider using an array instead of an object, as shown in the example below.

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-series-array?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### Waterfall

A [waterfall](https://caolan.github.io/async/v3/docs.html#waterfall) runs an array of multiple asynchronous task functions in series. Waterfall comes to rescue when each task is dependent on the results of the previous tasks.

##### Parameters

- Tasks - an array of tasks to perform asynchronously. The result of each task is passed as an argument to the next task.
- Callback - returns the results of all the completed functions. These will be the result of the final task passed.

**Syntax:** `async.waterfall(tasks, callback)`

The callback of each task contains a null first argument and the results of the subsequent argument. Each function takes the results argument of the previous callback as the first parameter and the final callback.

Example1 using undefined functions

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/async-waterfall-undefined?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Example2 with named functions

<iframe height="400px" width="100%" src="https://repl.it/@kimkimani/waterfall-with-funtions?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Conclusion

Async.js will help you manage the flow of your tasks. It helps to keep your code light and clean. It makes it even easier to debug and handle errors within your script. Async.js makes you realize how simple your code can be to avoid possibilities of running into a [callback hell](http://callbackhell.com/) situation.