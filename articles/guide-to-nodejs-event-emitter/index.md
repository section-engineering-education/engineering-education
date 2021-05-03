### Introduction
Node.js has an asynchronous event-driven architecture. This allows for designs where events emitted due an action by the user, say click of a button, causes the listener objects to be executed.  
Node.js has a built in module called `Events`. This module has an object `Event Emitter` which we can manipulate to fire/listen to events.  

This article assumes you have basic knowledge in JavaScript, REPL and Node.js installed in your local development environment.

### Event Emitter Class
As we've seen, Event Emitter class is located in the `events` module.  
Event emitter class has `eventEmitter.on()` method which it exposes to allow for function(s) to be attached to emitted events by the object.  

> It's important to note that any event emitting object in Node.js is a member of the Event Emitter class.

Let's begin by importing the EventEmitter class. In your REPL, add the following code snippets:  

```~$ node
Welcome to Node.js v15.12.0.
Type ".help" for more information.
> const events = require('events');
undefined
> const eventEmitter = new events.EventEmitter();
undefined
> 
```

In the above scripts, we first import the `events` module. We then create an instance of the Event Emitter class.
