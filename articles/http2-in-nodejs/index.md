HTTP has been the de facto protocol for communication in world wide web for along time. It is mainly based on the Client/Server architecture model. In 2015, the second release with improved features known as HTTP/2 was released to address its limitations by using methods such as compression, multiplexing and prioritization.


### Goal
In this Node.js tutorial, we will learn about HTTP/2 and server push, how it works, and its impact on performance. Let's begin!

### Prerequisites

To follow along with this tutorial:
1. A basic knowledge of [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) programming.

2. You need a text editor installed on your system. My favorite is [VS Code](https://code.visualstudio.com/download).

3. Install a browser such as [Google Chrome](https://www.google.com/chrome/) on your system.

4. Have [Node.js](https://nodejs.org/en/) installed on your machine.

### A brief on HTTP/2 and Server Push

Server push works is what bundles our assets into one HTTP/2 call. Under the hood, the server issues a `PUSH_PROMISE`. Client browser can then use it without even depending on if the main HTML file needs it where the client is required to match the received push promises to make them look like a regular HTTP/2 GET calls.

### Setting Up Our Project

First things first, we need to generate a key and a certificate as HTTP/2 will use HTTPS encryption by default. Go ahead and Google search “ssl key generation” or use the steps below:

- create a folder and name it `http2-node-server-push`:

```bash 
$ mkdir http2-node-server-push
```

- Navigate and open the `http2-node-server-push` folder in your IDE:
```bash
$ cd http2-node-server-push && code .
```
- finally, run the following command to generate a certificate and a key:

```bash
$ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
```
The command creates three SSL files:
server.crt
server.key

We will be reading from `server` and `server.crt` files in your Node.js server script.


For our boilerplate Node.js code, we need to create a package.json file and install our application dependencies:
- Run the command ```npm init -y``` to ... and ...```npm i express spdy``` to ...

To restart our development server, we will use a nodemon package. Run the command `npm i -D nodemon` to install it as a development dependency. Our project structure now looks like:

```
/http2-node-server-push
  /node_modules
  - index.js
  - package.json
  - package.lock.json
  - server.crt
  - server.key
```
We will add this npm script into scripts of the `package.json` file to ease our server launch command which uses `nodemon` for auto-reloading:
```JSON
      "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "devstart": "nodemon server.js"
  },
```
From here, we are now ready to implement server push using Express and spdy.

Implementing a Server Push HTTP/2 Server with Node.js and Express.js
Import the dependencies. Create the entry `index.js` file in the root of our folder (see project structure above).

In the root of this folder, run the command `npm init -y` to set up a new project by generating an initial `package.json` file. Our project will two dependencies from the npm registry:

- `express`:  Express is a Node.js framework for building web applications and backend APIs.

- `spdy`: spdy is an express compatible module that creates HTTP/2 enabled servers in Node.js

To install the packages using `npm`. Run the command :

`npm install express spdy`

### Generating server keys

### Adding spdy library for HTTP/2 and Server Push


Now we will create an HTTP2 secure server using `spdy` module. This server will serve the index.html file when the request url is “/” and also push all files from the “scripts” directory and “images” directory and the style.css file.
Now run the node server and open up the browser. Open up the developer tool and go to Network tab. Go to the url https://localhost:3000. Normal https server is running on this port. (Since we are using self signed certificate to setup the TLS, chrome will show a warning. Get past that 😃). In the developer tool we will see that the browser has make requests for all files individually. Also in the console of our Node JS server we’ll see we have received requests for all additional resource files.


Now let’s go to https://localhost:3001. The HTTP/2 server is running on that port. Let’s check the Network tab again.
All other requests for script files and image files and stylesheet are received as “Push” from the server. If we check the console in the Node JS server then we will see only one request came this time that is for the url “/”.

### Conclusion
Server push is extremely powerful and should be 
HTTP/2 is becoming the new web standard with its great features that constantly improves web efficiency while simplifying the development hassle. With features such as server push that enables us to send assets before even waiting for client requests, page load and latency is greatly improved. Check the source code on my [Github repo](https://github.com/Bradley8555/HTTP-2-Server-Push). Happy coding!
