### Introduction

XMPP - Extensible Messaging and Presence Protocol, originally known as `ejabberd` is an open communication protocol for instant messaging presence information and contact list.  

It is used by almost all large messaging systems such as WhatsApp, Facebook, Google-Doc, e.t.c. This was encrypted by default.

This tutorial will explain the XMPP architecture, how it works, and build a demo server called `ejabberd` using node js and docker. This will establish connections between two clients having XMPP servers running.

### Key takeaways

At the end of this tutorial, you would know the following points;
1. Why XMPP?.
2. Architecture and how it works underline.
3. XMPP Transport
3. Building a demo XMPP server with node js and docker.

If you want to learn stuff, kindly stay tuned, and let's jump into it.

#### Why XMPP?
We do not ask what is a technology but why it exists and what problem does it solve.

This is used to build a very standard messaging protocol using its default encryption principle. 

If XMPP is the backend of your application, it paves way for a lot of clients to talk directly with it.

Like  Google mail, it was made as a decentralized protocol. That is clients can belong to different XMPP servers and still connect. 

#### XMPP architecture

In this section, we look at the architectures of this technology and how it works internally.

There is global addressing with its original name called `jabberId`. This follows the address of `user@domain`.

Also, it was designed using XML streams tags i.e `<stream:stream />`. This is done by sending XML stanzas in each element without waiting for the whole document to be sent fully.

Also, there is a negotiation of features by asking whether the client supports a type of protocol, encryption, etc. This can be done on top of the XMPP protocol.

There are three different XML stanzas that XMPP supports.

1. Messages can be sent with XML tag <message/>
2. The status can also be exchanged like <presence/>
3. Information query which is the request-response like <iq/> tag.

Finally, the whole of XMPP is decentralized. For instance, we have the domain `myxmpp.com` server between two clients. See below how the connection works :)

ClientA concects to xmpp server,

```xml
    <stream:stream
    from='a@myxmpp.com'
    to='myxmpp.com'
    version='1.0'
    xmlns='jabber:client'
    >
```
ClientB connects to xmpp server,

```xml
    <stream:stream
    from='b@myxmpp.com'
    to='myxmpp.com'
    version='1.0'
    xmlns='jabber:client'
    >
```
ClientA sends a message to ClientB through the server

```xml
<message to='b@myxmpp.com'>
    <body>Hello  </body>
</message>
```

ClientB receives the message from ClientA

```xml
<message from='a@myxmpp.com'>
    <body>Hi </body>
</message>
```

ClientA terminates the stream
```xml
</stream:stream'>
``` 
#### XMPP Transport 

XMPP is one of the transport agnostic built on top of Transfer Control Protocol `TCP`. The default port is `5222` that the server runs on.

This server can be blocked by firewalls because it does not like random ports. 

This is avoided by hosting the XMPP server on HTTP with long polling since it only sends a message when the server receives a new request. That is HTTP is not bi-directional and is stateless.

#### XMPP server with nodejs and docker

In this demo, we spin up XMPP server `ejabberd` with docker because that is the easiest way. We will create two users, spin up node js XMPP client to connect to server and chat. 

Docker is required to be installed on the local machine. We have to create an ejabberd instance image using the below command. Navigate to the terminal or bash to run the commands.

This command will run the XMPP server on port `5222` and create its image with the name `ejabberd/ecs`.

```docker
docker run --name ejabberd -p 5222:5222 ejabberd/ecs
```
Note that the server is already listening and make sure it is open.

Open another terminal and let us register the two users with docker commands.

```docker
docker exec -it ejabberd  bin/ejabberdctl register admin localhost mypassword1
```
Successful registration will return a message like `User user1@localhost successfully registered`. 

The keyword `user1` is the name of the first user. While `localhost` is pointing to the local IP of your machine. This can be changed if another address is required.

Let us register another user with the commands below.

```docker
docker exec -it ejabberd  bin/ejabberdctl register myself localhost mypassword2
```
Successful registration will receive a message like `User user2@localhost successfully registered`. 

How do we connect the two clients with the server? This is where node js comes in.

Open your favorite code editor and create a node project using its terminal.

Note: `node` must have been installed on your local computer.

```javascript
npm init .
npm install simple-xmpp
```

The `simple-xmpp` is the library that is required to spin up the XMPP server for connection between clients.

Inside the project directory which has the `package.json`, make `admin.js` and `myself .js` files. 

It is in these files that we write the connection code for the server.

Code for `admin.js` is given in the snippet below;

```javascript
const xmpp = require("simple-xmpp"); 

// this function sends message every 5 seconds
function send(){
    setTimeout(send, 5000);
    xmpp.send("myself @localhost", `hi! Today is ${new Date().toLocaleString()}`)
}

//online
xmpp.on("online", data => {
    console.log("hello, you are live!");
    console.log(`Connected as ${data.jid.user}`);
    send();
});

// on chat
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

However, codes for `myself .js` will be the snippets below;

```javascript
const xmpp = require("simple-xmpp"); 

// this function sends message every 5 seconds
function send(){
    setTimeout(send, 5000);
    xmpp.send("admin@localhost", `hi! Today is ${new Date().toLocaleString()}`)
}

//online
xmpp.on("online", data => {
    console.log("hello, you are live!");
    console.log(`Connected as ${data.jid.user}`);
    send();
});

// on chat
xmpp.on("chat", (from, message) => {
    console.log(`Got a message! ${message} from ${from}`)
})

// connect method requires object with paramters below
xmpp.connect({
    "jid": "myself@localhost",
    "password": "2mypassword2",
    "host": "localhost",
    "port": 5222
})
```
Open to different code editor terminals and run the commands below. Ensure you are inside the project directory.

```javascript
node user1.js
```
Running this command, you will receive the message in the console below;

```
Hey, you are online!
Connected as user1
```
Now run this below in another terminal. Then the message will start sending and a connection is established.

```javascript
node user2.js
```

Immediately the message body of the `send()` function will start popping every 5 seconds.

### Conclusion
In this tutorial, you were introduced to the meaning, underline architecture, and how the XMPP server works. Also, we built a demo on docker using node js which connected two main users. 

Thank you for reading!
