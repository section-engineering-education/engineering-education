---
layout: engineering-education
status: publish
published: true
url: /extensible-messaging-and-presence-protocol-with-nodejs-and-docker/
title: Extensible Messaging and Presence Protocol - XMPP with Node.js and Docker
description: This tutorial walks the reader through the concepts of XMPP architecture, how it works, and builds a demo server connection using Node.js and Docker. 
author: arafat-olayiwola
date: 2021-11-30T00:00:00-13:00
topics: [Containers, Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/extensible-messaging-and-presence-protocol-with-nodejs-and-docker/hero.png
    alt: XMPP img docker
---
Extensible Messaging and Presence Protocol (XMPP) is an open communication protocol for instant messaging presence information and contact list maintenance.
<!--more-->
This tutorial walks you through the concepts of XMPP architecture, how it works, and builds a demo server connection using [Node.js](https://nodejs.org/en/docs/) and [docker](https://docs.docker.com/). 

### Table of Contents
- [Prerequisites](#prerequisites)
- [Key Takeaways](#key-takeaways)
- [Why XMPP](#why-xmpp)
- [XMPP Architecture](#xmpp-architecture)
- [XMPP Transport](#xmpp-transport)
- [XMPP Server Demo with Node.js and Docker](#xmpp-server-demo-with-nodejs-and-docker)
- [Conclusion](#conclusion)


### Prerequisites
To follow along with this tutorial with ease, one should meet the following requirements.
- Have a basic understanding of programming in Node.js and docker commands.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- A basic understanding of [Docker](https://www.docker.com/products/docker-desktop).
- A basic understanding of [Node.js](https://nodejs.org/en/download/).

### Key takeaways
By the end of this tutorial, you should understand:
- Why we need XMPP?.
- The underline architecture and how it works.
- XMPP Transport.
- XMPP server demo with Node.js and Docker.

#### Why XMPP?
XMPP short for Extensible Messaging and Presence Protocol is an open standard that supports near-real-time chat and instant messaging by governing XML data exchange over a network.

XMPP allows XML data, in the form of short snippets called stanzas, to be reliably sent from one endpoint to another using the internet's Transmission Control Protocol (TCP), passing through an intermediary server along the way.

>XML, or Extensible Markup Language, provides a framework for storing and organizing plain text data within documents so that the data can be easily interpreted by a wide variety of network endpoints regardless of their hardware or software configuration.

When used on the backend, it gives a direct link through which a couple of clients connect. It has a decentralized protocol, allowing clients who belong to different XMPP servers to communicate with it.

#### XMPP Architecture
In this section, let's look at the architectures of this technology and how it works internally. To facilitate routing across the network, all XMPP addresses are globally addressable.

It was designed using XML streams tags i.e `<stream:stream />`. This is done by sending XML stanzas in each element without waiting for the whole document to be sent fully. 

There is also a negotiation of features by asking whether the client supports a type of protocol, encryption, etc. Again, this can be done on top of the XMPP protocol.

There are three different XML stanzas that XMPP supports. 

The following are the stanzas:
1. Messages can be sent with XML tag <message/>.
2. The status can also be exchanged like <presence/>.
3. Information query which is the request-response like <iq/> tag.

Finally, the whole of XMPP is decentralized. This means no client is directly connected to another. Instead, the connection is achieved by the server as the intermediary between clients. 

Let's assume we have the domain `myxmpp.com` as s server between two clients. The following instances show how a connection will be established:

`ClientA` connects to xmpp server:
```xml
    <stream:stream
    from='a@myxmpp.com'
    to='myxmpp.com'
    version='1.0'
    xmlns='jabber:client'
    >
```

And another client, `ClientB` connects to xmpp server:
```xml
    <stream:stream
    from='b@myxmpp.com'
    to='myxmpp.com'
    version='1.0'
    xmlns='jabber:client'
    >
```

`ClientA` sends a message to `ClientB` through the server:
```xml
<message to='b@myxmpp.com'>
    <body>Hello  </body>
</message>
```

Then `ClientB` receives the message from `ClientA` as follows:
```xml
<message from='a@myxmpp.com'>
    <body>Hi </body>
</message>
```

ClientA terminates the stream:
```xml
</stream:stream>
``` 

The above code snippet shows the architecture of this XMPP server. This is how the server connects different clients by using the properties of the `stream` defined.

Every stream tag has `from`, `to`, `version` and `xmlns` parameters. It is the server that pre-populates these arguments based on the client details supplied during registration. 

No worries, all of these will soon be cleared up when we build a demo.

#### XMPP transport 
XMPP is one of the transport agnostic built on top of Transfer Control Protocol `TCP`. The default port is `5222` that the server runs on. This server can be blocked by firewalls because it does not like random ports. 

This is avoided by hosting the XMPP server on HTTP with long polling since it only sends a message when the server receives a new request. That is, HTTP is not bi-directional and is stateless.

#### XMPP server demo with Node.js and docker
In this demo, we spin up XMPP server `ejabberd` with docker because that is the easiest way. We will create two users, spin up the Node.js XMPP client to connect to the server, and chat. We have to create an `ejabberd` instance image using the command below. 

```bash
docker run --name ejabberd -p 5222:5222 ejabberd/ecs
```

The command above will run the `ejabberd` server, the XMPP server on port `5222`, and create its docker image with `ejabberd/ecs`. 

Now proceed and open another terminal and register the two clients with the docker commands below.

```docker
docker exec -it ejabberd  bin/ejabberdctl register admin localhost mypassword1
```

Docker uses the `ejbberd/bin/ejabberdctl` to register a new user with the provided credentials. The keyword `admin` is the name of the first user. In contrast, `localhost` is pointing to the local IP of your machine. 

> Note: This can be changed if another IP address is required. However, the existing domain can also be used. 

Upon successful registration, it will return a message `User admin@localhost successfully registered`. 

> Note that the output may differ depending on your setup.

Furthermore, we will register another user with the same process.

```docker
docker exec -it ejabberd  bin/ejabberdctl register myself localhost mypassword2
```

Upon successful registration, a message `User user2@localhost successfully registered` is returned. So how do we connect the two clients with the server? 

This is where Node.js comes in. We use the framework to write the server code for the connection between clients.

Open your favorite code editor and create a Node.js project as shown below:  
```javascript
$ npm init .
$ npm install simple-xmpp
```

The JavaScript code snippet above creates a new project directory that contains the `package.json` file. This file tracks all dependencies required for your project. 

The `simple-xmpp` installed is the library required to spin up the XMPP server connection between different clients. This is installed globally since the `--save-dev` command was not given.

Inside the project directory, which has the `package.json`, create `admin.js` and `myself.js` files. We edit these files with server-client connections.

The code for the `admin.js` is given in the snippet below:
```javascript
// we bring in the server library
const xmpp = require("simple-xmpp"); 

// this function recursively call itself by sending the provided message every 5 seconds.
function send(){
    setTimeout(send, 5000);
    xmpp.send("myself @localhost", `hi! Today is ${new Date().toLocaleString()}`)
}

//if online, that is connected to the server the send function will be excuted and log to console
xmpp.on("online", data => {
    console.log("hello, you are live!");
    console.log(`Connected as ${data.jid.user}`);
    send();
});

// if chat was received from other client, the log will be executed
xmpp.on("chat", (from, message) => {
    console.log(`Got a message! ${message} from ${from}`)
})

// connect method requires object with paramters below
xmpp.connect({
    "jid": "admin@localhost",
    "password": "mypassword1",
    "host": "localhost",
    "port": 5222
})
```

The `simple-xmpp` library has different arguments that are called. For example, in the above code snippets, we called on the `online` and `chat` arguments from the `on` method.

Once the admin user is connected to the server, the `on` method identifies the connection as `online` and executes the callback function.

However, the `on` method of the library will only execute the callback function of the `chat` argument if any message is received from the other client. The `simple-xmpp` library has the `connect()` method, requiring different properties. 

The `jid` serves as the identity of each client, which was returned from the registration above. All other parameters are the `password`, `host`, and the `port`. 

The same connection is required for the other client but with different parameters. Therefore, find the snippets below for the `myself.js` file.

```javascript
const xmpp = require("simple-xmpp"); 

function send(){
    setTimeout(send, 5000);
    xmpp.send("admin@localhost", `hi! Today is ${new Date().toLocaleString()}`)
}

xmpp.on("online", data => {
    console.log("hello, you are live!");
    console.log(`Connected as ${data.jid.user}`);
    send();
});

xmpp.on("chat", (from, message) => {
    console.log(`Got a message! ${message} from ${from}`)
})

xmpp.connect({
    "jid": "myself@localhost",
    "password": "mypassword2",
    "host": "localhost",
    "port": 5222
})
```

Now, open to different code editor terminals and run the commands below. Ensure you `cd` into the project directory. 

From the first terminal, run the code below:
```bash
node admin.js
```

Upon running this command, you will receive the message logged from the `online` argument of the `on()` method. 

The log message will be something like this:
```bash
Hey, you are online!
Connected as user1
```

Running this command in the second terminal calls the other client-server.
```bash
node myself.js
```

Now that both clients are connected, the message body of the `send()` function will start popping every `5` seconds to both connections. With this connection, we have achieved the goal of this tutorial.

### Conclusion
This tutorial introduced the concept of the meaning, underline architecture, and how the XMPP server works. We also built a demo connection using Node.js, and docker was used to spinning up the server image to register clients. 

Thank you for reading!

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
