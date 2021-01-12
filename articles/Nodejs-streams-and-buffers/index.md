JavaScript isn't just for the browsers any more. With the Node.js JavaScript runtime, we can build applications outside the browser environment. In this article, we will focus on two core Node.js modules, the Buffer and the Streams.

### Prerequisites
1. Node.js is based on JavaScript. A basic of the JavaScript language is needed here.
2. To explore the code examples, you will need Node.js installed on your system. Get the latest Node.js version [here]

When transferring data between the client and a server, the data is shared between the client and the server by a series of requests and responses connected via a socket. 
You can think of a socket as a channel of communication opened between the client and server IP address to allow data sharing between these two parties. Protocols such as FTP (File Transfer Protocol) and HTTP (HyperText Transfer Protocol) allow the client and server to speak to each other in a common language by providing a set of communication rules. There are numerous kinds of 
protocols. There is also TCP (Transmission Control Protocol) 
which sends data via packets.
What exactly are packets? Packets are small amounts of data being transferred over a network with the structure being determined by the aforementioned protocols. 
Packets commonly include a header and payload with headers comprising of information such as the source, destination, and other details about the packet itself. 
The payload contains the actual data being transferred.
I used to hear packets often in terms of packet loss, which is when some amount of the sent packets fail to meet their destination. Issues with packets can cause 
latency and jitters — resulting in unnatural delays in audio or video.
Streams and Buffers

I’m sure everyone has experienced their streaming services buffering when they have poor internet connection. This relates back to the form of streams and buffering 
I’m discussing in this post. A stream is the data flow between two points and the buffers are the small collections of data being transferred between them.
As opposed to downloading a full file, waiting for the download to complete, and then having access to the entirety of the media; streaming allows you to access the 
data as it is actively transferred to your client endpoint. Since streaming sends small bits of data at a time, it does not require the collecting and sending all of 
the information before use.
Instead, the buffers act as a temporary storage spot for smaller chunks of data. Once the buffer is full, it is passed along the stream. Buffering in a negative
 connotation comes from slow connections that have to wait to receive these chunks of data before it can process and display the information. Your computer receives 
a buffer full of data, this section is processed and played, and then it has to wait again for an additional buffer of information.
Connecting this all to Node.js
Node.js allows a user to create streams and introduced the buffer class for utilization with server-side code. The Buffer class is similar to an array and deals 
with binary data directly. So buffers are the method you can send and receive data via streams. Node.js has a few different types of streams — writable, readable, 
duplex, and transform.


### Conclusion