### Introduction

XMPP - Extensible Messaging and Presence Protocol, known as `ejabberd` is an open communication protocol for instant messaging presence information and contact list.  

It is used by almost all large messaging systems such as WhatsApp, Facebook, Google-Doc, e.t.c. This is encrypted by default.

This tutorial will explain the XMPP architecture, how it works, and build a demo server connection using node js and docker. This will establish connections between two clients having XMPP servers running.

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

Like  Google mail, it was made a decentralized protocol. That is clients can belong to different XMPP servers and still connect. 

#### XMPP architecture

In this section, we look at the architectures of this technology and how it works internally.

There is global addressing with its original name called `jabberId`. This follows the address of `user@domain`.

Also, it was designed using XML streams tags i.e `<stream:stream />`. This is done by sending XML stanzas in each element without waiting for the whole document to be sent fully.

Also, there is a negotiation of features by asking whether the client supports a type of protocol, encryption, etc. This can be done on top of the XMPP protocol.

There are three different XML stanzas that XMPP supports.

1. Messages can be sent with XML tag <message/>
2. The status can also be exchanged like <presence/>
3. Information query which is the request-response like <iq/> tag.

Finally, the whole of XMPP is decentralized. For instance, we have the domain `myxmpp.com` server between two clients. See the instance below on how the connection works :)

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
Client B receives the message from Client A

```xml
<message from='a@myxmpp.com'>
    <body>Hi </body>
</message>
```

ClientA terminates the stream
```xml
</stream:stream'>
``` 

The above code snippet is showing the architecture of this XMPP server. This is how the server connects different clients by using the properties of the `stream` defined.

Every stream tag has `from`, `to`, `version` and `xmlns` parameters. It is the server that pre-populates these arguments based on the client details supplied during registration.

No worries, all of these will soon clear when we build a demo. This


#### XMPP Transport 

XMPP is one of the transport agnostic built on top of Transfer Control Protocol `TCP`. The default port is `5222` that the server runs on.

This server can be blocked by firewalls because it does not like random ports. 

This is avoided by hosting the XMPP server on HTTP with long polling since it only sends a message when the server receives a new request. That is HTTP is not bi-directional and is stateless.

#### XMPP server with nodejs and docker

In this demo, we spin up XMPP server `ejabberd` with docker because that is the easiest way. We will create two users, spin up node js XMPP client to connect to server and chat. 

Docker is required to be installed on the local machine. We have to create an `ejabberd` instance image using the below command. Navigate to the terminal or bash to run the commands.

```docker
docker run --name ejabberd -p 5222:5222 ejabberd/ecs
```

The command above will run the `ejabberd` server which is the XMPP server on port `5222` and create its docker image with the name `ejabberd/ecs`.

Note:) the server is already listening, ensure that it is open.

Open another terminal and register the two clients with these docker commands.

```docker
docker exec -it ejabberd  bin/ejabberdctl register admin localhost mypassword1
```
Docker will execute the registration by going into the `ejbberd/bin/ejabberdctl` directory. Then register a new user with the username and password provided.

The keyword `admin` is the name of the first user. While `localhost` is pointing to the local IP of your machine. 

Note:) This can be changed if another IP address is required or actual domain can also be used.

Upon successfully registering, it will return a message like `User admin@localhost successfully registered`. 

Furthermore, we need to register another user with the commands below.

```docker
docker exec -it ejabberd  bin/ejabberdctl register myself localhost mypassword2
```
Successful registration will receive a message like `User user2@localhost successfully registered`. 

How do we connect the two clients with the server? This is where node js comes in.

Open your favorite code editor and create a node project using its terminal.

Note:) The dependency `node` must have been installed on your local machine.

```javascript
$ npm init .
$ npm install simple-xmpp
```
The JavaScript code snippet above creates a new project directory that contains the `package.json` file. This file tracks all dependencies required for your project.

The `simple-xmpp` installed, is the library required to spin up the XMPP server connection between different clients. And this is installed globally since `--save-dev` command was not given.

Inside the project directory which has the `package.json`, make `admin.js` and `myself .js` files. Inside these files, the connections to the server and other clients will be done.

Code for `admin.js` is given in the snippet below;

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
The `simple-xmpp` library has different arguments that is called. In above code snippets, we called on both the `online` and `chat` arguments from the `on` method.

Once the admin user is connected to the server, the `on` method identifies the connection as `online` and the callback function will be executed.

However, the `on` method of the library will only execute the callback function of `chat` argument if any message is received from the other client.

Furthermore, the `simple-xmpp` library has the `connect` method which has different properties required. 

The `jid` serves as the identity of each client which was returned from the registration above.

All other parameters are the `password`, `host`, and the `port`.

The same connection is required for the other client but with different parameters. Therefore, find the snippets below for `myself.js` file.

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
Now, open to different code editor terminals and run the commands below. 

Ensure you are inside the project directory. From the first terminal, run the code below;

```javascript
node admin.js
```
Running this command, you will receive the message that was logged from the `online` argument of `on` method.

```
Hey, you are online!
Connected as user1
```
Now run this in the second terminal. This will spin up other client server.

```javascript
node myself.js
```
Now that both clients are connected, the message body of the `send()` function will start popping every 5 seconds to both connections.

With this connection, we have achieved the motive of this tutorial.

### Conclusion
In this tutorial, I introduced you to the meaning, underline architecture, and how the XMPP server works. Also, we built a demo connection using node Js and docker was used to spinning up the server image so that we could register clients.

Thank you for reading!
