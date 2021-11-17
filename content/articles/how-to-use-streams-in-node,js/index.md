---
layout: engineering-education
status: publish
published: true
url: /how-to-use-streams-in-node.js/
title: How to use Streams in Node.js
description: Streams are objects that allow one to read data from a source or write to a destination in a continuous manner. In this article, we will go through reading and writing data to files using streams.
author: peter-kayere
date: 2021-05-06T00:00:00-09:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-use-streams-in-node.js/hero.jpg
    alt: Node.js streams example image
---
Streams are objects that allows developers to read/write data to and from a source in a continuous manner. There are four main types of streams in Node.js; readable, writable, duplex and transform. Each stream is an `eventEmitter` instance that emits different events at several intervals. 
<!--more-->
This article will go through reading and writing data to files using streams.
### Prerequisites
To follow this article along, you'll need to have Node.js installed and have a basic knowledge of Javascript.

Let's get started!

What do the different streams do?
1. The readable stream is a stream that is used for read operations.
2. The writable stream as the name suggests is a stream used for write operations.
3. A duplex stream is a stream that performs both read and write operations.
4. A transform stream is a stream that uses it input to compute an output.

The streams throw several events since they are `eventEmitter` instances. These events are used to track and monitor the stream. 

Some of the most commonly used events are:
1.  Data - Data event is emitted when readable data is available.
2.  Finish - Finish event is emitted when the stream is done writing data.
3.  Error - Error event is emitted when an error occurs while reading/writing data.
4.  End - End event is emitted when the read stream has finished reading data.

With this information, let's take a look at how we can use a stream to read/write data from/to a file.

### Reading from a stream
Handling streams is quite simple, all we have to do is create the stream and handle the events emitted by the stream. 

Let's see how we do this;

First create a folder with a name of your choice. Then create a text file inside the folder named "input.txt".

Add the following text in the file,

```bash
Section partners with university computer science programs across the globe to create a community-generated pool of content which is useful for engineers of every (any) level.
```

Now create a JavaScript file named "index.js". 

Add the following code to the file.

```Javascript
const fileSystem = require("fs");
var data = "";

const readStream = fileSystem.createReadStream("input.txt");

readStream.setEncoding("UTF8");

readStream.on("data", (chunk) => {
	data += chunk;
});

readStream.on("end", () => {
	console.log(data);
});

readStream.on("error", (error) => {
	console.log(error.stack);
});
```

In the snippet above the first step is we import the file system package which is an inbuilt package in Node.js. We then initialize an empty string variable `data`. The statement that follows creates a read stream through the `createReadStream` method. 

We then set encoding to [UTF-8](https://en.wikipedia.org/wiki/UTF-8). What follows next handles the necessary events. We use the data event to add data to our data variable. End event is used to output the read data to the console. Error event will log any errors when they occurs.

Run the code by writing:

```bash
node index
```

On the terminal.

The program should output the data we wrote on the input.txt file.

### Writing to a stream
Now that we have seen how to read data from a stream, let's have a look at how we can write to one instead. The procedure is similar to the one of reading. The only difference is that this time we are supposed to create a write stream instead.

Replace the code on the index file with the following code.

```Javascript
const fileSystem = require("fs");
var data = "Sample text";

const writeStream = fileSystem.createWriteStream("output.txt");

writeStream.write(data, "UTF8");

writeStream.end()

writeStream.on("finish", () => {
	console.log("Finished writing");
});

writeStream.on("error", (error) => {
	console.log(error.stack);
});
```

In the code above, we start to create a write stream through the `createWriteStream` method. We then use the `write` method to write data to our output file. 

Next, we call the end function to mark the end of the file. What follows afterwards is the implementation of the finish and error events.

Run the application again. You'll notice that `output.txt` file is created and our data is written to it.

That's all for reading and writing using streams. Let's now see how to pipe streams.

### Piping streams
Piping is a mechanism that involves using the output of another stream input of the other. How we can achieve this?

Replace the code in index.js file with the code below.

```Javascript
const fileSystem = require("fs");

const readStream = fileSystem.createReadStream("input.txt");
const writeStream = fileSystem.createWriteStream("output.txt");

readStream.pipe(writeStream);

console.log("Program finished");
```

The program is quite simple. All we need to do is initialize the read and write stream, then use the pipe method of the read stream to pipe it to the write stream.

Run the program. The two files should now have similar content.

### Conclusion
In this article, we went through how to use streams to read and write data in files. We saw how to handle events emitted by streams. 

We have also went over how to connect read and write streams (pipe). I hope this provides you with the information you need to start using streams in your Node.js applications.

Happy coding!

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
