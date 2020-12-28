---
layout: engineering-education
status: publish
published: true
url: /engineering-education/rest-api/
title: REST APIs - Introductory guide
description: Introduction to REST APIs, what are they, why do we need them and how do they work. Representational state transfer is a software architectural style that defines a set of constraints to be used for creating Web services.
author: priyank-kumar
date: 2020-06-26T00:00:00-07:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/rest-api/hero.jpg
    alt: rest api example image

---
REST API (Representational state transfer) is an API that uses HTTP requests for communication with web services. APIs are Application Programming Interface and allow one piece of software to talk to another.
<!--more-->

### What is REST API? A Simple Guide With Examples.
The API acts as a layer between your application and external service. You do not need to know the internal structure and features of the service, you just send a certain simple command and receive data in a predetermined format.

REST API (Representational state transfer) is an API that uses HTTP requests for communication with web services. For Example, If you are a user and you are requesting the current temperature in New York City, then you will get a response from the server-side either in XML or Json which is Javascript Object Notation format.

We can define REST as Representational State Transfer. REST is an architectural style as well as an approach for communications purposes that are often used in various web services development. To understand it in a better way we can take an example of a shopkeeper and a customer, The Customer will request the shopkeeper for a particular product and in response, he will get a product.

### Why do we need REST API's?
REST API's are based on Client-Server architecture.

Consider a scenario where you are using the Weather App. Now, obviously, this application needs a lot of Input data, as the data present in the application is never static. Either it is the temperature that gets updated on a frequent basis, or various cities showing different temperatures at various times of the day. It’s never static which implies the fact that data is always changing in these types of applications.

Now, from where we are getting this Data?

The Data is received from the Server or a Cloud-based Web-Server. So, the client requests the server for the required information, via an API, and then, the server sends a response to the client.

So the Data which we get from the server has a format which can be JSON, XML, or Both. The Data is formatted because we don't want the response to be an unstructured HTML Web Page.


### Principles of REST API.
Well, there are six ground principles laid down by Dr. Fielding who was the one to define the REST API design in 2000. Below are the six guiding principles of [REST](https://en.wikipedia.org/wiki/Representational_state_transfer):

### Stateless
The requests sent from a client to a server will contain all the required information to make the server understand the requests sent from the client. This can be either a part of URL,  query-string parameters, body, or even headers. The URL is used to uniquely identify the resource and the body holds the state of the requesting resource. Once the server processes the request, a response is sent to the client through body, status or headers

### Client-Server
The client-server architecture enables a uniform interface and separates clients from the servers.  This enhances the portability across multiple platforms as well as the scalability of the server components.

### Uniform Interface
To obtain the uniformity throughout the application, REST has the following four interface constraints:
- Resource identification
- Resource Manipulation using representations
- Self-descriptive messages
- Hypermedia as the engine of application state

### Cacheability
As on the World Wide Web, clients and intermediaries can cache responses. Responses must, implicitly or explicitly, define themselves as either cacheable or non-cacheable to prevent clients from providing stale or inappropriate data in response to further requests. Well-managed caching partially or completely eliminates some client-server interactions, further improving scalability and performance.

### Layered system
A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way. If a proxy or load balancer is placed between the client and server, it won't affect their communications and there won't be a need to update the client or server code. Intermediary servers can improve system scalability by enabling load balancing and by providing shared caches. Also, security can be added as a layer on top of the web services, and then clearly separate business logic from security logic. Adding security as a separate layer enforces security policies. Finally, it also means that a server can call multiple other servers to generate a response to the client.

### Code on demand
Servers can temporarily extend or customize the functionality of a client by transferring executable code: for example, compiled components such as Java applets, or client-side scripts such as JavaScript.

### Python Code Example

All of us working with the technology of the web, do CRUD operations. When I say CRUD operations, I mean that we create a resource, read a resource, update a resource and delete a resource. Now, to do these actions, you can actually use the HTTP methods, which are nothing but the REST API Methods.
Create -> Post
Read -> Get
Update -> Put
Delete -> Delete

```
import requests
response = requests.get('https://google.com/')
print(response)
```
Output
```
<Response [200]>
```

Request returns а Response, a powerful object for inspecting the results of the request. Using Response, you can examine the headers and contents of the response, get a dictionary with data from JSON in the response, and also determine how successful our access to the server was by the response code from it. In our example, the response code was 200, which means that the request was successful. To read more About Response code you can visit [this article](/engineering-education/http-code-cheat-sheet/) to get a better idea.


One More Example

```
import requests
from requests.exceptions import HTTPError
try:
    response = requests.get('https://httpbin.org/get')
    response.raise_for_status()
    # access JSOn content
    jsonResponse = response.json()
    print("Entire JSON response")
    print(jsonResponse)
except HTTPError as http_err:
    print(f'HTTP error occurred: {http_err}')
except Exception as err:
    print(f'Other error occurred: {err}')
```
the output for Above will be

```
Entire JSON response
{'args': {}, 'headers': {'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate', 'Host': 'httpbin.org', 'User-Agent': 'python-requests/2.23.0', 'X-Amzn-Trace-Id': 'Root=1-5ee224f0-00d97b8010a0e880281b3000'}, 'origin': '34.80.78.202', 'url': 'https://httpbin.org/get'}
```    


### Further Reading
[REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
