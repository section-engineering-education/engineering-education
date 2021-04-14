### Introduction
Streams are objects that allow one to read data from a source or write to a destination in a continuous manner. Node.js has four types of streams; readable, writable, duplex and transform. Each stream is an `eventEmitter` instance that emits different events at several intervals. This article goes through reading and writing data to files using streams.

### Prerequisites
To follow through this article, you'll need to have node.js installed and have a basic knowledge of Javascript.

Let's get started!

What do the different streams do? 
 1. The readable stream is a stream that is used for read operations.
 2. The Writable stream as the name suggests is a stream used for write operations.
 3. A duplex stream is used for both read and write operations. Lastly,
 4. The transform stream is a type of stream that computes the output based on the input.

The streams throw several events since they are `eventEmitter` instances. These events are used to track and monitor the stream. Some of the most commonly used events are;
 1. Data - This event is fired when readable data is available.
 2. Finish - This event is fired when the stream is done writing data.
 3. Error - This event is fired when any error occurs while reading or writing data.
 4. End - This event is fired when the stream is done reading data.

With this information, let's have a look at how we can use a stream to read/write data from/to a file.

### Reading from a stream
Handling streams is quite simple, all we have to do is create the stream and handle the events emitted by the stream. Let's see how;

First create a folder with a name of your choice. Then create a text file inside the folder named "input.txt".

Add the following text in the file,
```
Section partners with university computer science programs across the globe to create a community-generated pool of content which is useful for engineers of every (any) level.
```

Now create a javascript file named "index.js". Add the following code to the file.

```Javascript
const fileStream = require("fs");
var data = "";

const readStream = fileStream.createReadStream("input.txt");

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

In the snippet above, we first import the file stream package which is an inbuilt package in Node.js. We then initialize an empty string variable `data`. The statement that follows creates a read stream through the `createReadStream` method. We then set encoding to [UTF-8](https://en.wikipedia.org/wiki/UTF-8). What follows next handles the necessary events. We use the data event to add data to our data variable. End event is used to output the read data to the console. Error event will log the error when it occurs.

Run the code by writing
```bash
node index
```
on the terminal.

The program should output the data we wrote on the input.txt file.

### Writing to a stream
Now that we have seen how to read data from a stream, let's have a look at how we can write to one instead. The procedure is similar to the one of reading. The only difference is that this time we are supposed to create a write stream instead. 

Replace the code on the index file with the following code.
```Javascript
const fileStream = require("fs");
var data = "Sample text";

const writeStream = fileStream.createWriteStream("output.txt");

writeStream.write(data, "UTF8");

writeStream.end()

writeStream.on("finish", () => {
	console.log("Finished writing");
});

writeStream.on("error", (error) => {
	console.log(error.stack);
});
```
In the above code, we first create a write stream through the `createWriteStream` method. We then use the `write` method to write data to our output file. Next, we call the end function to mark the end of the file. What follows afterwards is implementation of the finish and error events.

Run the application again. You'll notice that `output.txt` file is created and our data is written to it.

That's all for reading and writing using streams. Let's now see how to pipe streams.

### Piping streams
Piping is a mechanism where the output of a stream is used as the input of another stream. How we can achieve this?

Replace the code in index.js file with the code below.
```Javascript
const fileStream = require("fs");

const readStream = fileStream.createReadStream("input.txt");
const writeStream = fileStream.createWriteStream("output.txt");

readStream.pipe(writeStream);

console.log("Program finished");
```

The program is quite simple. All we need to do is initialize the read and write stream, then use the pipe method of the read stream to pipe it to the write stream.

Run the program. The two files should now have similar content.

### Conclusion
In this article, we have gone through using streams to read and write data in files. We have seen how to handle events emitted by streams. We have also seen how to connect read and write streams(pipe). I hope this gives you the information you need to start using streams in your Node.js applications.

Happy coding!