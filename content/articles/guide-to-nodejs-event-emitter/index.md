---
layout: engineering-education
status: publish
published: true
url: /guide-to-nodejs-event-emitter/
title: Getting Started with Node.js Event Emitter
description: This tutorial will introduce the basic concepts on Node.js events module. We'll use this module to create an event emitter object which in turn we'll use to create Node.js Events.
author: miller-juma
date: 2021-05-05T00:00:00-16:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/guide-to-nodejs-event-emitter/hero.jpg
   alt: Node.js Event Emitter
---
Node.js has an asynchronous event-driven architecture. This allows designs where events emitted due to an action can cause listener object(s) to be executed. Node.js has a built-in module `events`. This module has an object `Event Emitter` which we can manipulate to listen to events. 
<!--more-->
### Prerequisites
This article assumes you have basic knowledge in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [REPL](https://nodejs.org/api/repl.html), and [Node.js](https://nodejs.org/en/) installed in your local development environment.

### Event emitter object
The `Event Emitter` object lies within the `events` module. It has an `eventEmitter.on()` method which it exposes to allow for function(s) to be attached to emitted events.  

Let's begin by importing the `events` module: 

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

In the scripts above, we first import the `events` module. We then create an instance of the Event Emitter class.  
Alternatively, we can import the `events` module and extend the main class with our custom  `myEventEmitter` class as seen below:

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

> It's important to note that any event emitting object in Node.js is a member of the Event Emitter class.

### Emitting events
The idea of events in Node.js is quite straightforward. Event emitting object emit named events. These events cause the listeners previously registered to be called. 

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
  _events: [Object: null prototype] { event: [Function: c1] },
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

When we emit the `event` event, `myFirstEvent()` and `mySecondEvent()` callbacks should be invoked.  

Output:

```js
--------------------------
> myEventEmitter.emit(`event`);
my first event occurred
hooray, another event has occurred
true
> 
```

### Registering for the event to be fired only one time using `once`
Previously, we discussed that event listeners were invoked each time an event they are attached to is emitted.  
There exist scenarios where we only need to execute these listeners once. In these cases, we make use of the `eventEmitter.once()`.  
Let's take a look at an example:  

```js
--------------------
>myEventEmitter.once('MyOnceEvent', () => console.log('my once event fired')); 

```

Emit `MyOnceEvent` event:

```js
-----------------------
> myEventEmitter.emit('MyOnceEvent');
```

Output:
```bash
my one event fired
```

Let's try to emit this event again:

```js
> myEventEmitter.emit('MyOnceEvent');
```

The event was emitted once and cannot be emitted again, resulting in a blank screen.  

### Registering for the event with callback parameters
The eventEmitter.emit() method allows the listener functions to be passed arguments. Let's take a look at how we can achieve this functionality:  

```js
myEventEmitter.on('status', (statusCode, statusMsg)=> console.log(`Status code = ${code} while message= ${statusMsg}`));
myEventEmitter {
  _events: [Object: null prototype] { status: [Function (anonymous)] },
  _eventsCount: 1,
  _maxListeners: undefined,
  [Symbol(kCapture)]: false
}
> 
```

Pass parameters:
```js
----------------
> myEventEmitter.emit('status', 201, 'created');
> 
```

Output:
```js
Status code =201 while message= created
```

### Error events
Error events are emitted whenever an error occurs within an EventEmitter instance. In case an `eventEmitter` does not have registered error events, an `error` event will be emitted, exiting the Node.js process.  

Let's look at an example:  

```js
---------------------------------------------
> myEmitter.emit('error', new Error('whoops, an error instance!'));
Uncaught [Error: an error instance!] {
  domainEmitter: MyEventEmitter {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    [Symbol(kCapture)]: false
  },
  domainThrown: false
}
> false
> 

```

You will notice that an error is thrown since we don have any listener for the error.

### Unregistering events 
Now that we've seen how we can create events, what if we need to unregister them? To unregister the `event` we created previously, we call the `eventEmitter.off()` method and pass it to the event as seen below: 

```js
myEmitter.off('event', myFirstEvent); // if you try emitting this event, nothing happens
```

### Conclustion
In this tutorial, we discussed the `EventEmitter` object. Using this object, we were able to create an event, fire an event, and listen to it.

We've also briefly looked at the error event, that causes the Node.js process to crash.

Happy coding!!

---
Peer Review Contributions by: [Paul Odhiambo](/engineering-education/authors/odhiambo-paul/)
