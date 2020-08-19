# Express.js

[Node.js]() is a javascript run time environment which can be used to create server side applcations and tools. Node.js is fast, portable and written in Javascript. Common tasks such as handling requests, serving files, handling HTTP verbs (`GET`, `POST`, ...) are not directly supported by Node, this is where Node's rich ecosystem comes to our aid. 

**Express.js is a light web framework which which sits on top of Node and it adds functionality ([middleware]() , [routing](), etc)and simplicity to Node.js.**

When creating a Node.js web application, we write a single javascript application which listens to resquests from the browser, based on the request the function will send back some data or a HTML web page. 

![flow of a request](node.png)

A *request handler* is a javascript function which takes a request and sends an appropriate response. 

Node.js APIs can get complex and writing how to handle a single request can get upto 50 lines of code. Express makes it easier to write web applications with Node.js.

![flow with express](express.png)

## Advantages of using Express wiht Node


