---
layout: engineering-education
status: publish
published: true
url: /engineering-education/custom-scroll-bar/
title: Introduction to Buffers and Streams in Node.js
description: In this tutorial, we will go through the basics of the Node.js buffer and stream modules.
author: wilson-gichuhi
date: 2021-02-21T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/node-buffer-streams/hero.jpg
    alt: Introduction to Buffers and Streams in Node.js
---

Streaming videos and games is a norm these days. At times in the middle of the game streaming, a spinner may start indicating that the video content is loading, this means that we are trying to fetch the next video segment( Buffer) from the server. As large video files will not fit in memory, we need to read the content in small chunks and send it to its destination. Transferring such data between two endpoints (such as the server and the browser) in this fashion uses the technique of streaming and buffering. In this tutorial, we will go through the basics of the Node.js buffer and stream modules.

### Prerequisites

1. Node.js is a JavaScript-based runtime. A basic of the [JavaScript](https://www.w3schools.com/js/js_intro.asp) programming language and its data types are needed.

2. You require Node.js installed on your system. Get the current version [here](https://nodejs.org/en/download/).

3. You may need to follow along with these code examples in which case I recommend a text editor such as [VS Code](https://code.visualstudio.com/download).

### The Node.js buffer module

Buffers are useful when interacting with binary data. A buffer is a memory space that stores binary data. For example, using the `fs.readFile()` will return data inform of buffer object to the callback. When a HTTP request is made in a Node.js server, they return data streams temporarily stored in an internal buffer when the client is unable to process the stream all at once.

### Creating a Buffer

Node.js has a built-in class for creating and manipulating Buffers. There are two ways to create a Buffer:

1. Creating a Buffer of a fixed size

   ```js
   const buffer = new Buffer.alloc(1024);
   ```

   The `Buffer` class is available globally. The `alloc()` function is available from the `Buffer` class which takes the size of the buffer as its argument. This creates a size from the passed integer to represent the bytes in memory that the created buffer object will use. In this case, we create a buffer that is 1KB of binary data in size.

2. Creating a Buffer from existing data:
   We use the `from()` method to create a buffer from pre-existing data. An example using a string:

   ```js
   const buffer2 = new Buffer.from('This is a node buffer');
   ```

### Reading from a Buffer

When reading from a buffer, we can either access an individual byte or the entire content. To access a byte, we pass the location or the index of the byte. Since they store the content sequentially, the index starts at `0`. For example:

```js
const buffer3 = new Buffer.from('Hi new buffer!');
// To read the data:
buffer3[0];
```

When using the REPL in Node.js, this should display 72 that corresponds to the `H` in the UTF-8 encoding. This will only read an individual byte. To retrieve all data stored, the buffer object has the `toString()` and the `toJSON()` methods that will return the entire content in the formats. The `toString()` method will convert the bytes of the buffer into a readable string. For example, to output `Hi new buffer` in the REPL:

```js
buffer3.toString();
```

The `toJSON()` method is different as it always returns the data as the integer representation of the byte. For example:

```js
buffer3.toJSON();
```

The REPL return value will be:

```bash
{
  type: 'Buffer',
  data: [
     72, 105,  32, 110, 101,
    119,  32,  98, 117, 102,
    102, 101, 114,  33
  ]
}
```

The JSON object has a property key named `type` that will always be a buffer. This helps to distinguish these types of JSON from other JavaScript JSON objects. The `data` property contains an array of the interger representation of the buffer bytes.

### The Node.js stream module

Streams allow us to access data from the source while the data is actively being transferred to its destination in a more efficient manner. Streams are just abstract object interfaces that let us read data from the input or write to outputs sequentially. To explain this better, I am going to use an example in a moment. We already know that any I/O bound tasks in Node.js are handled asynchronously. Therefore, interacting with the disk or network calls will involve callback functions.
Here is an example code that that serves up a file from disk:

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile(__dirname, +'/data.txt', (error, data) => {
    res.end(data);
  });
});

server.listen(8000, () => console.log('Our server is running on port 8000'));
```

The program explanation:

- The code uses the `fs` module to read a file and serve it over HTTP when a new connection is established.

- Before the response is made back to the client, we need to buffer the entire `data.txt` file into memory in every request.

- This might not be an issue when the file size is small but if the `data.txt` file is large, the program performance decreases while using a lot of memory especially when serving concurrent requests.

- This is even worse when users are on slow network connections. The user experience becomes poor as they need to wait for the entire file to load in memory before receiving the data from the server.

We could re-implement the above code to improve its flaws. First, our callback function containing the `(req,res)` arguments are actually streams. This means we can therefore write this in a much better way using the `fs.createReadStream` instead of the `fs.readFile()` method. Here is an example:

```javascript
const http = require('http');
const fs = require('fs');
const server = require((req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt');
  stream.pipe(res);
});
server.listen(8000);
```

In the program:

- The `.pipe()` method will be listening for the data and end events from the `fs.createReadStream()` and pair the inputs with the outputs.

- This will write the data from the `data.txt` file in chunks to the clients as we immediately receive them.

- In our case, the file stream is piped to the HTTP response, and the return value from the `pipe()` method is the destination stream. The `.pipe()` method will also be responsible for handling the backpressure so that the server won't buffer chunks when the remote client is on a slow connection.

In the next sections, I will discuss the four integral types of Node.js streams which include: readable stream, writable stream, duplex stream, and the transform stream.

### Creating readable streams

Readable streams are data emitters. We can only pipe from but not into them. The consumer will read the data when we push (buffer) into it. An example of how a readable stream is created:

```javascript
const Stream = require('stream');
const readableStream = new Stream.Readable();

readableStream.push('this is a readable stream');
readableStream.push('Yet another data push to the readable stream');
readableStream.push(null);
```

In the above code, we can see that readable streams are generators of data where we can write data using the `readableStream.push()` method. The `new Stream.Readable()` interface will initialize the `readableStream` object before pushing data into it using the `readableStream.push()` method. Passing a `null` in the `readableStream.push(null)` tells the consumer that our stream object is done outputting the data.

### Creating writable streams

Writable streams are data recievers that is, we can pipe to but not pipe from them. They recieve inputs in an unidirectional way (simplex).

```javascript
const Stream = require('stream');
const writableStream = Stream.Writable();

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk);
  next();
};
process.stdin.pipe(writableStream);
```

To create a writable stream, we have defined a `writableStream._write` as an arrow function that we use to pipe a readable stream into it. The `chunk` argument refers to the data written by the emitter. The `next` argument is a callback function that will allow the consumer to write more data. The piping is the process that will allow data flow efficiently.
When we need to write into our writeable streams, we can call `.write(data)`method passing along the data we want to write.
The `fs` module can be used to read from and write to files using a stream interface
Calling the `.end()` method tells the reciever that we are done. Here is an example using the `fs` module:

```javascript
const fs = require('fs');
const writableStream = new fs.createWriteStream();

// Pipe a readable stream
writableStream.write('data one');
writableStream.end();
```

### The Duplex streams

The duplex streams are both readable and writable. Both ends of the stream will interact performing both pipe into and pipe from.
I will be demonstrating this using a simple HTTP server as they receive a request and send a response, a perfect example of a duplex that is, a readable stream as the request and the writable stream as the response.

```javascript
const http = require("http");
const server = http.createServer((req,res)=>{
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk)=>{
        body + = chunk;
    });
    req.on("end", ()=>{
        console.log(body);
        try{
            res.write("Hello world");
            res.end();
        }
        catch(error){
            res.statusCode = 400;
            return res.end(`An error occured, ${error.message}`)
        }
    })
})
```

The code walkthrough:

- The `req` param is a readable stream that will be processed once it's received as a request.

- A `res` object will be sent back as the response which is a writable stream.

- The `req.setEncoding` gets the encoded data as a `utf8` string and the readable streams emit data events once a listener is added. Using the `.on()` method will read our body in chunks and store it in the body triggered by the data event.

- The `end` event is triggered when nothing is left to read in a readable stream.

### The Transform streams

They are a special type of duplex streams that allow the output to transform its input meaning we calculate the output from the inputs. They can modify data while being read or written. For example, during file compression, we can read compressed data and read the decompressed data to and from the file. For more information on this, check the [official documentation](https://nodejs.org/api/stream.html).

### Summary

Streaming and buffering allow us to read data piece by piece while processing its content. This proves to be more memory efficient as you do not have to load large data. The two concepts are fundamental in Node.js applications by handling I/O tasks in a composable and efficient manner.

### Extra Resources

- [The Node.js streams handbook](https://github.com/substack/stream-handbook).

- [Node.js buffer documentation](https://nodejs.org/api/buffer.html).

- [Node.js streams documentation](https://nodejs.org/api/stream.html).

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
