Websockets are becoming very common in the mordern web development environment. Most web developers nowadays want to develop real-time web applications or custimise their existing applications to become real-time in order to satisfy their users needs appropriately. This is where websockets play a major role.
<!--more-->

### What is a websocket?
Websocket is a computer communication protocol that enables full-duplex communication between the client and server over a single TCP connection.
Websocket protocol which is located at layer 7 of the OSI model enables interaction between a web browser or other client applications and a web server with lower overhead than half-duplex alternatives such as http polling hence promoting real-time data transfer between the two.

### What is socket. io?
Socket.io is a javascript library that enables real-time, bi-directional and event driven communication between the client and server.
Socket.io consists of two similar APIs i.e
1. A node.js server API.
2. A Javascript client API which can also be run from node.js.

[Socket.io](http://socket.io) uses engine.io under the hood to establish conection and to exchange data between client and server. Engine.io is used for the server side implimentation whereas engine.io-client is used for the client side implimentation.

### Socket.io release
Socket.io version 1.0 wich was it's major release version was released on 28th of may, 2014. The project contained two parts before version 1.0 i.e a transport handling implimentation and a high-level API. With the major release, transport handling has been moved to Engine.io which allows developers to build new real-time APIs for the real-time web without reinvention.
Apart from that, socket.io introduced the following changes:
1. Binary streaming support.
2. Improved horizontal scalling support.
3. Socket.io-streams module to support node.js streams.

### Setting up socket. io on the server side
Setting up socket.io on a node.js server is just a simple as adding event listeners to a http.server instance.
lets look at a code example

```javascript
const server = require('net').createServer()
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    // new client connection
    socket.emit('connect', {message: 'a new client connected'})
})

server.listen(2400)
```
Socket.io can also be attached to other HTTP frameworks.
below code snippet shows how to attach socket.io to [express.js](http://expressjs.com) framework.

```javascript
const express = require('express')
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    // new client connection
    socket.emit('connect', {message: 'a new client connected'})
})

server.listen(2400)
```
below code snippet shows how to attach socket.io to a [hapi](https://hapi.dev) framework.

```javascript
const server = require('hapi').createServer(2400);
const io = require('socket.io')(server.listener);

io.on('connection', (socket) => {
    // new client connection
    socket.emit('connect', {message: 'a new client connected'})
});

server.start();
```
### Setting up socket. io on client side
For a socket.io client to connect to socket.io server, socket.io.js script needs to be added in the body tag of a the client html page.
here is an example code

```html
<script src="/socket.io/socket.io.js"></script> 
```

Below code snippet makes a connection to the server. It uses local host as an example.

```html
<script>  
        var socket = io.connect("http://localhost:2400");
</script>
```
### Socket. io client-server communication
Socket.io is event based meaning that the client and server communicate through events. Both client and server can emit and listen to events and each event contains a body which in most cases is a JSON object.
Below is an example tweet event emitted by a node.js server and listened by the client.

```javascript
io.on("connection", (socket) => {
    const tweet = {source: 'Peter', text: "Hello, world!"};
    socket.emit('tweer', tweet)
})
```
this is how the client's browser listens for the event

```javascript
socket.on("tweet", (tweet) => {
    console.log("tweet from", tweet.source);
    console.log("content:", tweet.text);
});
```
We can send any JSON object to and from the server. This includes strings, numbers, arrays and booleans. We can also send Node.js Buffer objects starting with Socket.io 1.0.

### Summary
Socket.IO has played an important role in the popular adoption of Node.js by making WebSockets both accessible and reliable. Version 1.0 represents a major step in its evolution and the extraction of Engine.IO has opened up some interesting possibilities for the Node.js ecosystem.
