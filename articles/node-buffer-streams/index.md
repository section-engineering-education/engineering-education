When watching a game online, we often say that we are streaming. At times in the middle of the game streaming, a spinner may start indicating that the video content is loading, this means that we are trying to fetch the next video segment( Buffer) from the server. As large video files like will not fit in memory, we need to read the content in small chunks and send it to its destination. Transferring such data between two endpoints (such as the server and the browser) in this fashion uses the technique of streaming and buffering. In this tutorial, we will go through the basics of the Node.js buffer and stream modules.

### Prerequisites
1. Node.js is a JavaScript based runtime. A basic of the [JavaScript]() programming language and its data types is needed.
   
2. You require Node.js installed on your system. Get the current version [here]().

3. You may need to follow along  with these code examples in which case I recommend a text editor such as [VS Code]().

### The Node.js buffer module

In the next part, we will be switching our focus to the stream module in Node.js.

### The Node.js stream module
Streams allow us to access data from the source while the data is actively being transferred to its destination in a more efficient manner. Streams are just abstract object interfaces that let us read data from the input or write to outputs sequentially. To explain this better, I am going to use an example in a moment. We already know that any I/O bound tasks in Node.js is handled asynchronously. Therefore, interacting with the disk or network calls will involve callback functions. 
Here is an example code that that serves up a file from disk:

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    fs.readFile(__dirname, +"/data.txt", (error,data)=>{
        res.end(data);
    });
});

server.listen(8000,()=>console.log("Our server is running on port 8000"));
```
The program explanation:
- The code uses the `fs` module to read a file and serve it over HTTP when a new connection is established. 
  
- Before the respose is made back to the client, we need to buffer the entire `data.txt` file into memory in every request. 
  
- This might not be an issue when the file size is small but if the `data.txt` file is large, the program performance decreases while using alot of memory especially when serving concurrent requests. 
  
- This is even more worse when users are on slow network connections. The use experience becomes poor as they need to wait for the entire file to load in memory before recieving the data from the server.

We could re-implement the above code to improve its flaws. First, our callback function containing the `(req,res)` arguments are actually streams. This means we can therefore write this in a much better way using the `fs.createReadStream` instead of the `fs.readFile()` method. Here is an example:
```javascript
 const http = require("http");
 const fs = require("fs");
 const server = require((req, res) => {
     const stream = fs.createReadStream(__dirname + "/data.txt");
     stream.pipe(res);
 });
 server.listen(8000);
 ```
 In the program:
 - The `.pipe()` method will be listening for the data and end events from the `fs.createReadStream()` and pair the inputs with the outputs. 

 - This will write the data from the `data.txt` file in chunks to the clients as we immediately recieve them. 

 - In our case, the file stream is piped to the HTTP response and the return value from the `pipe()` method is the destination stream. The `.pipe()` method will also be responsible of handling the backpressure so that the server won't buffer chunks when the remote client is on a slow connection.

In the next sections, I will discuss the four integral types of Node.js streams which include: readable stream, writable stream, duplex stream and the transform stream.

### Creating readable streams
Readable streams are data emitters. We can only pipe from but not into them. The consumer will read the data when we push (buffer) into it. An example of how a readable stream is created:

```javascript
const Stream = require("stream");
const readableStream = new Stream.Readable();

readableStream.push("this is a readable stream");
readableStream.push("Yet another data push to the readable stream");
readableStream.push(null);
```
In the above code, we can see that readable streams are generators of data where we can write data using the `readableStream.push()` method. The `new Stream.Readable()` interface will initialize the `readableStream` object before pushing data into it using it using the `readableStream.push()` method. passin a `null` in the `readableStream.push(null)` tells the consumer that our stream object is done outputing the data.



### Creating writable streams
Writable streams are data recievers that is, we can pipe to but not pipe from them. They recieve inputs in an unidirectional way (simplex).
```javascript
    const Stream = require("stream");
    const writableStream = Stream.Writable();

    writableStream._write = (chunk, encoding, next)=>{
        console.log(chunk);
        next();
    };
    process.stdin.pipe(writableStream);
```
To create a writable stream, we have defined a `writableStream._write` as an arrow function that we use to pipe a readable stream into it. The `chunk` argument refers to the data written by the emitter. The `next` arguments is a callback function that will allow the consumer to write more data. The piping is the process that will allow data flow in an efficient manner.
When we need to write into our writeable streams, we can call `.write(data)`method passing along the data we want to write.
The `fs` module can be used to read from and write to files using a stream interface
Calling the `.end()` method tells the reciever that we are done. Here is an example using the `fs` module:
```javascript
const fs = require("fs");
const writableStream = new fs.createWriteStream();

// Pipe a readable stream
writableStream.write("data one");
writableStream.end();
``` 

### The Duplex streams
The duplex streams are both readable and writable. Both ends of the stream will will interact performing both pipe into and pipe from.```javascripta.pipe(b).pipe(a)```
I will be demonstrating this using a simple HTTP server as they recieve a request and send a response, a perfect example of duplex that is, a readable stream as the request and the writable stream as the response.

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
The `req` param is a readable stream that will be processed when recieved as a request.
We will then send a `res` which is a writable stream.
The `req.setEncoding` will get the data as `utf8` string. /// use it before reading the stream
Readable streams emit "data" events once a listener is added. Using the `.on` method will read our body in chunks and store it in the body, triggered by the data event.
The `end` event is triggered when nothing is left to read in a readable stream
We listen on the server then


   
### The Transform streams
They are special type of duplex streams that allow the output to transform its input meaning we calculate the output from the inputs.

### Summary
Streaming and buffering allows us to read data piece by piece while processing its content. This proves to be more memory efficient as you do not have to load large data. The end result is a more performant applicaton (it will take less time to start processing) even for users on slow network connections. In the context of the backend developers, they help us write an idiomati composable code that handles I/O tasks in a scalable manner.

### Extra Resources

- [The Node.js streams handbook](https://github.com/substack/stream-handbook).
  
- [Node.js buffer documentation](https://nodejs.org/api/buffer.html).

- [Node.js streams documentation](https://nodejs.org/api/stream.html).