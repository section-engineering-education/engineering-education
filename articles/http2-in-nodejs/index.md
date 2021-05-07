HTTP has been the de facto protocol for communication in world wide web for along time. It is mainly based on the Client/Server architecture model. 
In 2015, the second release with improved features known as HTTP/2 was released to address its limitations by using methods such as compression, multiplexing,
and prioritization.


### Goal
In this Node.js tutorial, we will learn about HTTP/2 and server push, how it works, and its impact on performance. Let's begin!

### Prerequisites

To follow along with this tutorial:
1. A basic knowledge of [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) programming.

2. You need a text editor installed on your system. My favorite is [VS Code](https://code.visualstudio.com/download).

3. Install a browser such as [Google Chrome](https://www.google.com/chrome/) on your system.

4. Have [Node.js](https://nodejs.org/en/) installed on your machine.

### Main Goals of HTTP/2:



### Setting Up Our Project

Open your IDE and create a folder named `HTTP2ServerPush`. In the root of this folder, run the command `npm init -y` to set up a new project by generating an initial `package.json` file. 
Our project will two dependencies from the npm registry:

- `express`:  Express is a Node.js framework for building web applications and backend APIs.

- `spdy`: spdy is an express compatible module that creates HTTP/2 enabled servers in Node.js

To install the packages using `npm`. Run the command :

`npm install express spdy`

Increase the speed and efficiency of delivering web content by reducing page load latency.

### Generating server keys

### Adding spdy library for HTTP/2 support

### Project Demo
_______________________________________________________________________________
### Conclusion
HTTP/2 is becoming the new web standard with its great features that constantly improves web efficiency while simplifying the development hassle. 
With features such as server push that enables us to send assets before even waiting for client requests, page load and latency is greatly improved. 
Check the source code on my [Github repo](https://github.com/Bradley8555/HTTP-2-Server-Push). Happy coding!
