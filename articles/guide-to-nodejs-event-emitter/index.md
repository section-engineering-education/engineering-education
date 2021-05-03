### Introduction
Node.js has an asynchronous event-driven architecture. This allows for designs where events emitted due an action by the user, say click of a button, causes the listener objects to be executed.  
Node.js has a built in module called `Events`. This module has an object `Event Emitter` which we can manipulate to fire/listen to events.  

### Prerequisites
This article assumes you have basic knowledge in JavaScript, REPL and Node.js installed in your local development environment.

### Event Emitter Class
As we've seen, Event Emitter class is located/lies in the `events` module.  
Event emitter class has `eventEmitter.on()` method which it exposes to allow for function(s) to be attached to emitted events by the object.  

Let's begin by importing the EventEmitter class. In your REPL, add the following code snippets:  

```js
~$ node
Welcome to Node.js v15.12.0.
Type ".help" for more information.
> const events = require('events');
undefined
> const eventEmitter = new events.EventEmitter();
undefined
> 
```

In the above scripts, we first import the `events` module. We then create an instance of the Event Emitter class.

Alternatively, we can import events module and extend the main class with our custom  `myEventEmitter` class as seen below:
```js

$ node
Welcome to Node.js v15.12.0.
Type ".help" for more information.
> const EventEmitter = require('events');
undefined
> class MyEventEmitter extends EventEmitter {}
undefined
> const myEventEmitter = new MyEmitter();
undefined
> myEventEmitter.on('event', () => {
...   console.log('an event emitted!');
... });

> myEventEmitter.emit('event');

```
Now that we've seen how we can import `eventEmitter` class in our script, let's have a look at how how to emit events:

> It's important to note that any event emitting object in Node.js is a member of the Event Emitter class.

### Emitting Events
The idea of events in Node.js is quite straightforward. Event emitting object emit named events. These events causes the listeners previously registered to be called. 
Let's look at an event emitting example: 

```js
$ node
Welcome to Node.js v15.12.0.
Type ".help" for more information.
> const eventEmitter = require(`events`);
undefined
> class MyEventEmitter extends eventEmitter{}
undefined
> const myEmitter = new MyEventEmitter();
undefined
> function myFirstEvent(){
... console.log(`my first event occurred`);
... }
undefined
> function mySecondEvent(){
... console.log(`hooray, another event has occured`);
... }
undefined
> myEmitter.on('event', myFirstEvent);
MyEventEmitter {
  _events: [Object: null prototype] { eventOne: [Function: c1] },
  _eventsCount: 1,
  _maxListeners: undefined,
  [Symbol(kCapture)]: false
}
> myEmitter.on('event', myFirstEvent);
MyEventEmitter {
  _events: [Object: null prototype] {
    event: [ [Function: myFirstEvent], [Function: myFirstEvent] ]
  },
  _eventsCount: 1,
  _maxListeners: undefined,
  [Symbol(kCapture)]: false
}
> 

```


