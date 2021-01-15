When watching a game online, we often say that we are streaming. 
Sometimes in the middle of the play time a spinner may start indicating that the video content is loading,
this means that the browser is still trying to get the next video segment( Buffer) from the server. Normally, large video files
like this do not fit in memory. We therefore need to read the content in small chunks and send to the browser. Transferring such data between the two endpoints, such as the browser and the server in small chunks uses the technique of buffering and streaming.
In this tutorial, we will go through the basics of the Node.js buffer and stream module using detailed code examples.

### Prerequisites
1. Node.js is a JavaScript based runtime. A basic of the [JavaScript] programming language and its data types is needed.
   
2. You require Node.js installed on your system. Get the current version [here].

3. To follow allong these code examples, you will need a code editor. I will be using [VS Code]() in my case.



### The Node.js stream module
Streams allow us to access data from the source while the data is actively being transferred to its destination in a more efficient way. They are basically objects that let us read data from the input or write to outputs sequentially.
To explain this better, I am going to use a code example of how streams can increase efficiency in the application performance while giving composability in our code. We already know that any I/O bound tasks in Node.js is asynchronous. Therefore, interacting with the disk or network calls will involve callbacks and functions. This example below is a code that that serves up a file from disk:
```javascript
let http = require("http");
let fs = require("fs");
let server = http.createServer((req,res)=>{
    fs.readFile(__dirname,+"/data.txt",(error,data)=>{
        res.end(data)
    });
});
server.listen(8000,()=>console.log("Our server is running on port 8000"))
```
Using the `fs` Node.js module, we can read a file and serve it over HTTP when a new connection is established to your http server.
The above code raises the concerns of:
1. Before the respose is made back to the client, we need to buffer the entire `data.txt` file into memory in every request. This might not be an issue when the file size is small. When the `data.txt` file is large, the program performance decreases while using alot of memory especially when serving lots of concurrent requests. This is even more worse when users are on low bandwidth and slow network connections.
2. This results in poor user experience as users will need to wait for the whole file to load in memory on the server before recieving the data.

We could re-implement the above code to improve its flaws. First, our callback function containing the `(req,res)` arguments allow us to actually streams. This means we can therefore write this in a much better way using the `fs.createReadStream` instead of the `fs.readFile()` method. Here is an example:
```javascript
 let http = require("http");
 let fs = require("fs");
 let server = require((req,res)=>{
     let stream = fs.createReadStream(__dirname + "/data.txt");
     stream.pipe(res);
 });
 server.listen(8000);
 ```
 Code walkthrough:
 1. The `.pipe()` will be listening for the data and end events from the fs.createReadStream(). This will now write the data from the `data.txt` file in chunks to the clients as they are immediately being recieved. In our case, the file stream is piped to the HTTP response. The return value from the `pipe()` method is the destination stream. We can actually chain multiple pipes like:
   ```javascript
   stream.pipe(destination1).pipe(destination2)
   ```
   this also like: 
   ```javascript
   stream.pipe(destination1);
   destination1.pipe(destination2);
   ```
 2. The advantage of using the `.pipe()` will as well handle the backpressure so that the Node.js server won't buffer chunks when the remote client is on a slow connection.

The traditional way of reading a file is inefficient. The file is first read into memory before processing the request. When using streams, we read it piece by piece, processing its content without keeping the entire file in the memory. Therefore, the advantages of streams include memory efficiency (you do not have to load large amount of data in memory before processing) and time efficiency (it takes less time to start processing). 


### Types of streams in Node.js
In this part I will be discussing the four types of Node.js streams which include the readable, writable, duplex and transform stream.

### Creating readable streams
Readable streams are data emitters that is, we can only pipe from but not into (read or recieve data only). The consumer will read the data when we push (buffer) into it. An example of how a readable stream is created:
```javascript
const Stream = require("stream");
const readableStream = new Stream.Readable();
readableStream.push("this is a readable stream");
readableStream.push("Yet another data push to the readable stream");
readableStream.push(null);
```
In the above code, we can see that readable streams are generators of data where we can write data using the `readableStream.push()` method. The `new Stream.Readable()` will initialize the `readableStream` object before pushing data into it using it using the `readableStream.push()` method. The `readableStream.push(null)` will tell the consumer that our stream object is done outputing the data. 



### Creating writable streams
Writable streams are data recievers that is, we can pipe to but not pipe from them. They recieve inputs in an unidirectional way (simplex).
```javascript
    let Stream = require("stream");
    let writableStream = Stream.Writable();

    writableStream._write = (chunk, encoding, next)=>{
        console.log(chunk);
        next();
    };
    process.stdin.pipe(writableStream);
```
To create a writable stream, we have defined a `writableStream._write` as an arrow function then piped a readable stream into it.
- The `chunk` argument refers to the data written by the producer. 
- Our `encoding` argument is a string with the string encoding.
- The `next` arguments is a callback function that will allow the consumer to write more data.

To write intom our writeable streams, we call `.write(data)` passing along the data we wre writing:
`process.stdout.write("beep beep...");`
If we need to tell the destintion that we are done, we meed to call a `.end()` method. An example using the `fs` module:
```javascript
let fs = require("fs");
let writableStream = new fs.createWriteStream();
writableStream.write("beep ");
writableStream.end();
``` 

### The Duplex streams
The duplex streams are both readable and writable. Both ends of the stream will engage in a two-way (bi directional) way performing both pipe into and pipe from. An example is websockets.
```javascript
a.pipe(b).pipe(a)
```
   
### The Transform streams
They are special type of duplex streams that allow the output to transform its input meaning we calculate the output from the inputs.

### Writable stream
```javascript
const Stream = require("stream");
const writableStream = new Stream.Writable(); 
```
then implement _write:
```javascript
writableStream._write = (chunk, encoding, next)=>{
    console.log(chunk.toString());
    next()
}
```
// Pipe a readable stream in:
process.stdin.pipe(writableStream);

#### Get data from the readable stream using writable
const Stream = require(stream)
const readableStream = new Stream.Readable()
const writableStream = new Stream.Writable()
writableStream._write = (chunk, encoding, next)=>{
    console.log(chunk.toString())
    next()
}

readableStream.pipe(writableStream)
readableStream.push("kk")



### Duplex stream
### Transform stream

### The Node.js buffer module

### Summary
With Node.js, frontend developers can now re-use thier JavaScript skills in the server side programming. Concepts such as buffers and streams are important to understand for any backend developer. In this article, we have discussed the buffer and streams module, looked at various types of these modules and code examples.