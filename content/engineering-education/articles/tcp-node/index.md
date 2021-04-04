---
layout: engineering-education
status: publish
published: true
url: /engineering-education/tcp-node/
title: Concepts of TCP, Explained with Node.js
description: Networking is something all of us rely on every day. This article talks about the concepts of TCP explained with Node.js.
author: mike-white
date: 2020-08-28T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/tcp-node/hero.jpg
    alt: node.js tcp example image
---
Networking is a very important part of computing. But how do we do it? A network is a group of computers that are able to talk to each other. The Internet is a famous example of a network.
<!--more-->
For our example today, the computer can just talk to itself. All the examples can be easily modified to run between two different computers.

### What is TCP?
TCP (Transmission Control Protocol) is a protocol for sending information between computers. TCP [guarantees*](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) that all the information will be sent and that it will be received in order. It does this by creating a "handshake" to establish a connection. It looks something like the following:

**Client:** I want to talk to you.

**Server:** Yes. I would very much appreciate sharing communications with you. Are you ready to begin communications?

**Client:** … Yes.

Just like that, we know (to a reasonable degree) that the computer is going to receive the information.

### IP Address
IP Address stands for Internet Protocol Address. Think of it as an address for a computer (or more likely, just your router). Your computer needs to know where to deliver data to, so it uses the IP address to figure that out. IPv4 uses 4 numbers, 0-255, represented as a dotted quad (i.e. "64.233.160.0").

Our example won't use an IP address, because our computer is just going to talk to itself (aka, "localhost"). However, you can easily add an IP address to your code to specify a specific computer to talk to.

### Ports
Another thing we need to do is pick a port for the server to work on. To send a message to a computer over a network, we need to know which port the computer will be listening to. Choosing the correct port is necessary so that the correct program gets the message.  If we send the message to the wrong port, then the application doesn't get the message. It could even go to the wrong program.

Think of it like a post office box. The physical address (this is an analogy for an IP address) tells the USPS which post office to deliver a package to. It still needs a specific post office box number to make sure the right person receives it. If you write the wrong number, there's a chance that the wrong person will receive the package.

Port numbers are between 1 and 65,535. Make sure you don't use a [reserved port](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports). If the port number you picked doesn't work, then just try a different one. This example is going to use port 50,000.

### Protocol
A protocol is a language that computers use to communicate. The protocol helps each computer interpret the data it receives. To make a protocol, we need to think about what the computers need to do. Usually, we create commands, and give arguments to those commands, just like functions.

**Try to design your own protocol before reading on.**

You may have designed a better protocol (it's good to have short messages). The one we'll use in this example is meant to be easy for a human to read. It has a command and arguments, separated by spaces.

| Command | Argument 1   | Argument 2    |
| ------- | ------------ | ------------- |
| ADD     | first number | second number |
| RESULT  | number       | N/A           |
| ERROR   | reason       | N/A           |

Of course, it's trivial to add more operations. Feel free to do this in your implementation. We'll only be adding in this example.

You always have to consider the possibility that the client will send an invalid command. It would be unfair to the rest of your users if the entire server crashed just because one user messed up. We'll have to be very careful to make sure that doesn't happen. If someone does send an invalid command, we'll respond with `ERROR`.

### Setup
We're going to create a simple calculator application for this example. We'll be using [Node.js](https://nodejs.org/en/) and the [net](https://nodejs.org/api/net.html) library to do this. We'll need two programs: one for the client, and one for the server. The client will ask the server to do a calculation, and the server will send the result back to the client.

We'll call the client program, `client.js`. The server program will be called `server.js`. Create a folder somewhere on your computer, and create both of those files mentioned.

### Server
We'll start by creating a server application and by importing the net library.

```JavaScript
// server.js
const net = require("net"); // import net
```

Next, we'll need to create the server. Luckily, this is super easy:

```JavaScript
// server.js
const net = require("net"); // import net

// create the server
let server = net.createServer(connection => {
    // run all of this when a client connects
    console.log("new connection");
});
```

Great! Let's try running it and... nothing happens. We didn't ask the server to actually wait for a connection. To do this, we'll use `server.listen`. We'll plug in 50,000 as the port number.

```JavaScript
// server.js

// ...

// look for a connection on port 50,000
server.listen(50000, () => {
    console.log("waiting for a connection"); // prints on start
});
```

Now that the server can connect to a client, we want it to do something once it receives data. The net library uses an event system. Inside the block where we define the server, we want to make an event when data is received.

```JavaScript
// server.js
const net = require("net"); // import net

// create the server
let server = net.createServer(connection => {
    // run all of this when a client connects
    console.log("new connection");

    connection.on("data", data => {
        // run this when data is received
        console.log(data.toString()); // prints the data
    });
});

// ...
```

We want to do a little more than print out the data though. We want to an actual calculation. Now, we should implement the protocol in our server.

```JavaScript
//...
    connection.on("data", data => {
        // run this when data is received
        if (data == undefined || data == null) {
			      return;
		    }

		    const dataArgs = data.toString().split(" "); // splits the data into spaces

	      if (dataArgs.length === 0) { // in case there is no command
            connection.write("ERROR no data");
            return; // prevents other code from running
        }
		    const command = dataArgs[0]; // gets the command
        if (command === "ADD") { // add command
            if (dataArgs.length !== 3) { // in case there aren't enough arguments
                connection.write("ERROR incorrect number of arguments");
                return;
			      }

            const op1 = parseInt(dataArgs[1]); // first number
            const op2 = parseInt(dataArgs[2]); // second number
			      const result = (op1 + op2).toString(); // result as a string

			      if (result === "NaN") { // in case the inputs aren't numbers
				        connection.write("ERROR invalid number");
				        return;
			      }

			      connection.write("RESULT " + result);
			      return; // end
		    } else { // invalid command
            connection.write("ERROR invalid command");
            return;
        }
    });

// ...
```

You can run this by typing `node server.js` in a command prompt or a terminal.

### Client
Now that the server is done, we need a program to send information and it needs to connect to the server.

```JavaScript
// client.js
const net = require("net"); // import net
const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
}); // this will be important later

const options = {
    port: 50000,
    // if you want to connect to a different computer you can use host: "HOST"
    // replace HOST with the IP address to connect to
    // otherwise, run the server on the same computer as the client
};

let client = net.connect(options, () => {
    console.log("connected!");
});
```

The rest should be pretty easy. We'll ask for two numbers to be added together, and we'll send it to the server. Then, whenever we receive data back, we'll print the result and repeat the process.

To [read data in Node.js](https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs), we'll need the `readline` module.

```JavaScript
// client.js

// ...

// gets user input and sends it
function newProblem() {    
    let op1 = "";
  	let op2 = "";
  	readline.question("First number: ", (num) => {
    	  if (num == "q") {
    	      client.end();
    	  }
		    op1 = num;

		    readline.question("Second number: ", (num) => {
			      if (num == "q") {
    			      client.end();
  			    }
			      op2 = num;
			      client.write("ADD " + op1 + " " + op2);
		    });
  	});
}

client.on("data", data => {
    console.log(data.toString()); // print out data
    newProblem(); // ask for more input
});

client.on("end", () => { // close everything when done
    console.log("disconnected");
    readline.close();
})

console.log("enter q to quit");
newProblem();
```

Of course, the client can work in whatever way you want it to. If you wanted to create a GUI, you can, as long as the correct data is still being sent to the server.

### Why?
There's already an article about [Socket.io](/engineering-education/understanding-socket/), so why do we need to know this?

Socket.io is really just an abstraction for what we've done here. The difference for us is that we had to create and parse our own protocol. It may be more efficient to use your own protocol than to use Socket.io's abstractions. Socket.io doesn't know what you plan to do, so it plans for anything. It sends an entire object in JSON, even if you only need one property.

You also might not always have Socket.io, so it's nice to know how it works, in case you need to do something like this. At the very least, it's one less dependency you need to have.
