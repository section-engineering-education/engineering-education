---
layout: engineering-education
status: publish
published: true
url: /nodejs-network-requests-using-axios/
title: Node.js Network Requests using Axios
description: This article shows how to use Axios to make network request in Node.js. Axios is a very popular JavaScript framework used to perform network requests.
author: peter-kayere
date: 2021-06-14T00:00:00-11:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/nodejs-network-requests-using-axios/hero.jpg
    alt: Node.js Network requests using Axios
---
In the modern technological world, it is very rare to find stand-alone applications. Most applications depend on resources from other applications. These resources are made available through the use of APIs. Servers are no exception. Though servers store their own relevant data, they sometimes need data from other servers. To access the data, servers need a way to communicate with the API(s) of the depended servers. This is where Axios comes in.
<!--more-->
### Introduction
Axios is a very popular JavaScript framework used to perform network requests. Axios works both on the browser and Node.js runtime. Axios is promise based but also allows the modern async/await methods. This article goes through Axios and how to use it to make network request in Node.js.

### Prerequisites
To follow this article, you need to have Node.js installed and to understand the basics such as how to set up a simple server and to configure it. Go through [this](/engineering-education/building-a-basic-api-with-nodejs/) Node.js introduction article to get yourself up to speed.

Through this article, we are going to make network requests to a free JSON placeholder API from our Node.js application. Our application will be sending back the response it receives from the API.

Let's get started!

### Setting up our server
Start by creating a new Node.js project. Create a folder with the name of your choice and run the following commands from the terminal.

```bash
npm init
npm i express axios
```

`npm init` initializes a new node.js application whereas the second command installs `express` and `axios`.

With that done, let's go ahead and create our server.

Create an index.js file and write the following code in it.

```JavaScript
const express = require("express");
const app = express();
const axios = require("axios").create({baseUrl: "https://jsonplaceholder.typicode.com/"});

app.listen(2400, () => {
	console.log("Server started at port 2400");
});
```

Here, we import the required dependencies, i.e. express and axios. In the axios import, we use the create method to specify the base URL, this is the URL that our axios object will prepend to all our requests.

Run the server using this command.

```bash
node index
```

Now that our server is up and running, let's see what network requests are and what axios allows us to do.

### Getting started with axios
We have mentioned network requests but we haven't said what that is. As the name suggests, network requests are requests sent from a client to a server over the internet. The client in this case can also be another server. Axios allows us to make `HTTP` requests from both the browser and Node.js applications. It allows us to make both `GET` and `POST` requests which are the most used `HTTP` methods.

Let's see how we can make these types of requests.

### GET request
All axios requests are created using the axios object we imported in the first code snippet. The axios object takes an object parameter. The object contains the request URL and the HTTP method associated with the request.

Add the following code just before `app.listen` method.

```JavaScript
app.get("/async", async (req, res) => {
	try {
		const response = await axios({
			url: "users",
			method: "get",
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});
```

In the above code, we have made an endpoint that makes a `GET` request to the JSON placeholder API. The endpoint then returns the response it receives from the server. The axios object returns a promise but we are able to use the async/await method which makes our code appear sequential. However, you can still use the promise library. This is how the code will look like.

```JavaScript
app.get("/promise", (req, res) => {
	axios({
		url: "users",
		method: "get",
	})
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});
```

Test the two endpoints using Postman and observe the output.

Alternatively, instead of writing the URL and the method, you can call the method directly from the object and just pass in the URL.

Example;

```JavaScript
axios.get("users")
```

### POST requests
For POST requests, the axios object takes in the URL, method and the body to POST.

To make a POST request, all you need to do is to call the POST method from the axios object and pass in the body to be posted.

Below is a code example using the async/await method.

```JavaScript
app.post("/async/post/", async (req, res) => {
	try {
		const response = await axios.post("posts", {
			title: "Foo",
			body: "bar",
			userID: 1
		});
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});
```

When using promises, the code will be as follows:

```JavaScript
app.get("/promise/post", (req, res) => {
	axios.post("posts", {
		title: "Foo",
		body: "bar",
		userID: 1
	})
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});
```

### Conclusion
This brings us to the end of our tutorial. In this article, we have gone through what axios is and how to use it to make GET and POST requests from Node.js. Axios also provides other HTTP requests such PUT and PATH but they are not very popular however, they use the same syntax as the two methods that we have gone through. Hope this helps you get started with axios.

Happy coding!

---

Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
