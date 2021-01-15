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