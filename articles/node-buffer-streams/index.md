When watching a game online, we often say that we are streaming. 
Sometimes in the middle of the play time a spinner may start indicating that the video content is loading,
this means that the browser is still trying to get the next video segment( Buffer) from the server. Normally, large video files
like this do not fit in memory. We therefore need to read the content in small chunks and send to the browser. Transferring such data between the two endpoints, such as the browser and the server in small chunks uses the technique of buffering and streaming.
In this tutorial, we will go through the basics of the Node.js buffer and stream module using detailed code examples.

### Prerequisites
1. Node.js is a JavaScript based runtime. A basic of the [JavaScript] programming language is needed.
   
2. You require Node.js installed on your system. Get the current version [here].

3. To follow allong these code examples, you will need a code editor. I will be using [VS Code]() in my case.



### The Node.js stream module
Streams allow us to access data from the source while the data is actively being transferred to its destination. They are basically objects that let us read data from the source (server) to the destination(browser) even in low bandwith
Streams are objects that let us read and write data from source to the destination.
In Node.js, each type of stream is an instance of the `EventEmitter`.

### Why Streams matters in Node.js
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
 1. The `.pipe()` will be listening for the data and end events from the fs.createReadStream(). This will now write the write the data from the `data.txt` file in chunks to the clients as they are immediately being recieved.
 2. 

### Types
In the next sections, I will be discussing about the types of streams which include:
1. Readable stream -- read from the meaning you recieve from them
2. Writable stream --they're recieving inputs
   Readable and writable are simplex meaning they are unidirectional

3. Duplex stream
   
4. Transform stream


### Readable stream

### Writable stream
### Duplex stream
### Transform stream

### The Node.js buffer module

### Summary
With Node.js, frontend developers can now re-use thier JavaScript skills in the server side programming. Concepts such as buffers and streams are important to understand for any backend developer. In this article, we have discussed the buffer and streams module, looked at various types of these modules and code examples.