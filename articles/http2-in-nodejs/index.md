HTTP protocol has been the foundation of internet communication for along time where its architecture is mainly based on the Client/Server model. What web applications have you built where load times suffers when waiting for assets to load and pushing them ahead of time would really help? This is what HTTP/2 aims to solve, improve web efficency. It was released in 2015 with improved features to address the HTTP/1 (version one) limitations. It uses methods such as compression, multiplexing and prioritization. to overcome the HTTP overheads.

### Goal
In this Node.js tutorial, we will learn about HTTP/2 and server push, how it works, and its impact on performance. We will use Node.js to build our HTTP/2 server. Let's begin!

### Prerequisites

To follow along with this tutorial:
1. A basic knowledge of [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) programming.

2. You need a text editor installed on your system. My favorite is [VS Code](https://code.visualstudio.com/download).

3. Install a browser such as [Google Chrome](https://www.google.com/chrome/) on your system.

4. Have [Node.js](https://nodejs.org/en/) installed on your machine.

### A brief on HTTP/2 and Server Push

HTTP/2 will makes our web applications feel faster, simpler, and more robust.It uses new technologies such as multiplexing connections to take away the web's performance bottleneck. The primary goals of HTTP/2 include:
- reducing overheads by compressing the server request headers.

- Performing full request and response multiplexing over a single HTTP or TCP connection.

- Using HTTP/2 Server Push and client caching. 

Check more about this [here](https://developers.google.com/web/fundamentals/performance/http2).
Server push works is what bundles our assets for a single client request into one HTTP/2 response. Instead of waiting for the browser to first load the HTML and determine which assets to download, we can push all the assets to the browser ahead of time. Under the hood, all the streams are initiated via `PUSH_PROMISE` containing HTTP headers of the promised resource. This will signal the server to push the described resources to the client ahead of the response time thus avoiding duplicate requests.

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

```bash
/http2-node-server-push
  node_modules/
|--- index.js
|--- server.crt
|--- server.key
package.json
package.lock.json
```

We will add this npm script into scripts of the `package.json` file to ease our server launch command which uses `nodemon` for auto-reloading:
```JSON
      "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "devstart": "nodemon server.js"
  },
```
From here, we are now ready to implement server push using Express and spdy.

## Implementing HTTP/2 and Server Push 
Import the dependencies. Create the entry `index.js` file in the root of our folder (see project structure above).

In the root of this folder, run the command `npm init -y` to set up a new project by generating an initial `package.json` file. Our project will two dependencies from the npm registry:

- `express`:  Express is a Node.js framework for building web applications and backend APIs.

- `spdy`: spdy is an express compatible module that creates HTTP/2 enabled servers in Node.js

To install the packages using `npm`. Run the command :

`npm install express spdy`



Now we will create an HTTP2 secure server using `spdy` module. This server will serve the index.html file when the request url is “/” and also push all files from the “scripts” directory and “images” directory and the style.css file.
Now run the node server and open up the browser. Open up the developer tool and go to Network tab. Go to the url https://localhost:3000. Normal https server is running on this port. (Since we are using self signed certificate to setup the TLS, chrome will show a warning. Get past that 😃). In the developer tool we will see that the browser has make requests for all files individually. Also in the console of our Node JS server we’ll see we have received requests for all additional resource files.


Now let’s go to https://localhost:3001. The HTTP/2 server is running on that port. Let’s check the Network tab again.
All other requests for script files and image files and stylesheet are received as “Push” from the server. If we check the console in the Node JS server then we will see only one request came this time that is for the url “/”.

### Conclusion
Everyone knows the significance of improving the speed of our web qpplications. With a minimal code, we've implemented a simple Node.js server with HTTP/2 and server push. Server push is extremely powerful and should be 
HTTP/2 is becoming the new web standard with its great features that constantly improves web efficiency while simplifying the development hassle. With features such as server push that enables us to send assets before even waiting for client requests, page load and latency is greatly improved. Check the source code on my [Github repo](https://github.com/Bradley8555/HTTP-2-Server-Push). Happy coding!
