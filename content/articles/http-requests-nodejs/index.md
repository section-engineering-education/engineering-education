---
layout: engineering-education
status: publish
published: true
url: /http-requests-nodejs/
title: Understanding HTTP Requests in Node.js
description: HyperText Transfer Protocol is mainly used for transmitting multimedia documents and to enhance collaborative and distributed features of an application. In this article, we look at HTTP Requests in detail and use some popular Node.js libraries to perform various processes.
author: lalithnarayan-c
date: 2020-08-18T00:00:00-07:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/http-requests-nodejs/hero.jpg
    alt: nodejs http requests
---
HyperText Transfer Protocol (HTTP) is mainly used for transmitting multimedia documents and to enhance collaborative and distributed features of an application. Being an application layer protocol, it plays a critical role in the overall experience of the application. We have discussed the Application layer and other corresponding layers in detail in this [article](/networking-models-introductory-guide/). Make sure to check it out.
<!--more-->

Developed as a client-server protocol, the application initiates the request and the server is informed about the request. Furthermore, the server decodes the HTTP request and sends it to the corresponding application or server for further processing. This forms the basic nature of data exchange on the web. It is a stateless protocol, which means that the requests are not being kept track of and therefore a user-agent can send any number of requests. The concept of favoring one user-agent over another is not there, ensuring fairness within the internet.

You might be wondering, what type of data is being passed? For example, when your browser makes a call to [section.io](/), the server hosting section.io understands the request. On receiving the request, it sends back the webpage along with images, text, JS files, etc. All of these files are processed by the browser.

### HTTP Model
To gain a better understanding, let's look at the various components associated with HTTP.

![Http model](/engineering-education/http-requests-nodejs/httpmodel.jpg)<br>
*Image source: http://wiki.hashphp.org/HttpPrimer*

The client initiates the connection through a GET request. The server responds with a status code. In this case, it is 200, which means the server is ready for a connection. This is called the HTTP Response.

The next request sent by the client is a POST request, which includes the login details. The server processes it by checking with the database for user details. If a match is found, the user is authorized. Otherwise, the user cannot view any of the pages or information.

The above example considers a direct connection between client and server. What if the client is in India and the server is in the United States? In such a case, there are many systems involved to ensure the successful transmission and reception of requests and responses. The routers, links, etc. all play a defining role. The layered structure of the Internet allows us to modularize operations. Routers are dealt with in the transport and network layers, therefore allowing us to focus on application layer protocols such as HTTP.

Let's look at the components of HTTP that help increase the performance of the protocol.
- **Cache:** When a request is made to a site, all the documents downloaded via HTTP are stored locally, or more commonly, through a distributed network of servers via a content delivery network (CDN). Upon the next request to the same site, it is loaded from the cache directly, thus making the page load must faster.

- **Cookies:** Cookies are small pieces of data that store relevant information about the user. Since HTTP is a stateless protocol, it cannot identify the user directly. Cookies offer a mechanism to identify users and deploy user-specific applications and services.

- **Proxies:** Client-server architecture has many intermediate components. All those operating at the application layer are called proxies. These are used for various purposes such as authentication, logging, filtering users, etc.

### HTTP Requests
Earlier we looked at how HTTP Requests work in the overall picture of the Internet. Let's pay additional attention to the structure of the HTTP request message, and the different types of messages. These messages signify the type of action that the client is requesting the server for.


#### HTTP Request Message
![source: https://slideplayer.com/slide/13130365/](/engineering-education/http-requests-nodejs/request_message.jpg)<br>
*Image source: https://slideplayer.com/slide/13130365/*

Various parameters define the request message. For example, we have the request method, which indicates the type of action to be performed against the resource. The URL indicates the destination's address. HTTP version implies the level of security and features available. The header lines carry information about access-control, type of connection, details about the sender, etc. This is necessary to establish a secure and efficient connection.

Finally, the body includes the data that needs to be transmitted to the server for processing. Let's consider some of the main request methods that are available.  

### Method and Description
- **GET:** GET method is used to establish connections and receive info from the server. It is used while making API calls, where no modification of data is involved.
- **POST:** The POST method is generally used to send data inside the entity-body section. Authentication, File Uploads, etc. are all done via POST method requests.
- **DELETE:** This method is used to delete resources on the server.
- **PUT:** This method is used to replace existing resources on the server with the updated resources.
- **HEAD:** Functions similarly to GET, but sends the message request without the entity-body. This is used in cases when the server must not return the message-body in the response. Or in cases when the files being accessed are too large to be transmitted.
- **OPTIONS:** This method is used when the client wants to understand the various communication methods that the server supports.
- **TRACE:** Used for testing purposes. The message is sent from the client to the server, and the route is logged.

### HTTP Libraries in Node.js
There are many HTTP libraries available for Node.js developers, each of which is intended to ease the management of HTTP requests. Some of the more commonly used libraries include:
- `http`
- `fetch`
- [Axios](https://www.npmjs.com/package/axios)
- `node-fetch`
- [`Got`](https://www.npmjs.com/package/got)

### Code implementation
#### http module
The `http` module is available natively with Node.js; there is no additional installation required. The data is initially converted into a string using the stringify function. The HTTP options specify the headers, destination address, and request method type.

Next, we use `http.request` to send the data to the server and await the response. The response is stored in the `req` variable, and upon error, it is logged into the console. On successful transmission, the data is posted to the server.

```jsx

const data = querystring.stringify({
  'msg': 'Hello World!'
});

const options = {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Access-Control-Allow-Origin': '*'
        },
    }

const req = http.request(options, (res) => {
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
    })

req.on('error', (error) => {
        console.error(error)
    })

req.write(data)
req.end()
```

### fetch
The `fetch` module is also built-in and is usually used for making API calls. Fetch predominantly uses the concept of promises. Promises are objects that represent a point in time when the completion or failure of an asynchronous task occurs. Errors in any `then` statements are caught by the `catch` statement. Therefore, error handling is much more simplified.


```jsx
const url = 'https://my-json-server.typicode.com/lalith1403/jsonemaillist/list'
```

```jsx
fetch(url)
    .then(data=>{return data.json()})
    .then(res=>{console.log(res)})
    .catch(err => {console.log(err)})
```
### Axios
[Axios](https://www.npmjs.com/package/axios) is one of the most popular libraries used for making requests. Axios needs to be installed using npm.

```jsx
npm install axios --save
```
Axios provides further control over the request and simplifies the entire process of making requests and error handling. It provides many features like response timeouts, automatic JSON transformation, progress indicators, etc. All of these features enable developers to gain more control over network calls.

```jsx
import axios from 'axios'

const url = 'https://my-json-server.typicode.com/lalith1403/jsonemaillist/list';
axios.get(url, headers: {
                'Access-Control-Allow-Origin': '*'
            })
    .then(data=>console.log(data))
    .catch(err => console.log(err))
```
The headers are mentioned within the `get` function and there is no need to JSONify the received data. Axios does it automatically for us.

### Got

[`Got`](https://www.npmjs.com/package/got) is a powerful library that supports many application-layer protocols along with HTTP. It has a ton of features for all the network calls one may deal with. Some of the prominent features of Got are:
- Pagination API
- Request Cancellation
- Support for Streams: Streams are specialized data structures designed to ensure efficient lower-level system calls.

```jsx
const got = require('got');

(async () => {
  try {
    const response = await got('https://my-json-server.typicode.com/lalith1403/jsonemaillist/list');
    console.log(response.body);
} catch (error) {
    console.log(error.response.body);
  }
})();
```

### Conclusion
We have looked at the HTTP Request in detail and have used some Node.js libraries to perform HTTP Requests. The overall picture that one needs to keep in mind while learning these libraries is the overall structure of the Internet. Do refer to the earlier [article](/networking-models-introductory-guide/) on Networking Models to gain a better understanding on how to build amazing projects. Be Legendary.
