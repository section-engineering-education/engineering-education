---
layout: engineering-education
status: publish
published: true
url: /nodejs-network-requests-using-axios/
title: Node.js Network requests using Axios
description: This article goes through Axios and how to use it to make network request in Node.js. Axios is a very popular javascript framework used to perform network requests.
author: peter-kayere
date: 2021-05-31T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/nodejs-network-requests-using-axios/hero.jpg
    alt: Node.js Network requests using Axios
---

### Introduction

In the modern technological world, it is very rear to find stand-alone applications. Most applications depend on resources from other applications. These resources are made available through the use of APIs. Servers are no exception. Though servers store their own relevant data, they sometimes need data from other servers. To access the data, servers need a way to communicate with the API(s) of the depended servers. This is where Axios comes in.

Axios is a very popular javascript framework used to perform network requests. Axios works both on the browser and Node.js runtime. Axios is promise based but also allows the modern async/await methods. This article goes through Axios and how to use it to make network request in Node.js.

### Prerequisites

To follow through this article you need to have Node.js installed and understand its basics. How to set up a simple server, and how to do some basic configuration. Go through [this]() article to get yourself up to speed.

Through this article, we are going to make network requests to a free dogs api from our Node.js application. Our application will be sending back the response it receives from the api.

Let's get started!

### Setting up our server

Start by creating a new Node.js project. Create a folder with the name of your choice and run the following commands from the terminal.

```bash
npm init // to create a new package.json file.
npm i express axios async promise // to install express, axios, promises and asyncjs.
```

With that done, let's go ahead and create our server.

Create an index.js file and write the following code in it.

```Javascript
const express = require("express");
const app = express();
const axios = require("axios");

app.listen(2400, () => {
	console.log("Server started at port 2400");
});
```

Run the server using this command.

```bash
node index
```

Now that our server is up and running, let's see what network requests are and what axios allows us to do.

### Getting started with axios

We have mentioned network requests but we haven't said what it is. As the name suggests, network requests are requests sent from a client to a server over the internet. The client in this case can also be another server. Axios allows us to make `HTTP` requests from both the browser and Node.js applications. It allows us to make both `GET` and `POST` requests which are the most used `HTTP` methods.

Let's see how we can make these types of requests.

### Get request

All axios requests are created using the axios object we imported in the first code snippet. The axios object takes an object parameter. The object contains the request url and the http method associated with the request.

Add the following code just before `app.listen` method.

```Javascript
app.get("/async", async (req, res) => {
	try {
		const response = await axios({
			url: "https://dog.ceo/api/breeds/list/all",
			method: "get",
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});
```

In the above code, we have made an endpoint that makes a `GET` request to the dog api. The endpoint then returns the response it receives from the server. The axios object returns a promise but we are able to use the async/await method which makes our code appear sequential. However, you can still use the promise library. This is how the code will look like.

```Javascript
app.get("/promise", (req, res) => {
	axios({
		url: "https://dog.ceo/api/breeds/list/all",
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

Test the two endpoints using postman and observe the output.

Alternatively, instead of writing the url and the method, you can call the method directly from the object and just pass in the url.

Example;

```Javascript
axios.get("https://dog.ceo/api/breeds/list/all")
```

### Post requests

For post requests, axios object takes in the url, method and the body to post. Since the dogs api does not allow us to make post requests, we are just going to have a look at how this request can be made but not with a real API.

To make a post request, all you need to do is to call the post method from the axios object and pass in the body to be posted.

Below is a code example using the async/await method.

```Javascript
app.post("/async/post/name", async (req, res) => {
	try {
		const response = await axios.post("https://namesite.com", {
			name: "Peter",
		});
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});
```

When using promises, the code will be as follows.

```Javascript
app.get("/promise", (req, res) => {
	axios.post("https://dog.ceo/api/breeds/list/all")
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
});
```

### Conclusion

This brings us to the end of our tutorial. In this article, we have gone through what axios is and how to use it to make get and post requests from Node.js. Axios also provides other http requests such put and patch which are not very popular, However, they use the same syntax as the two methods that we have gone through. Hope this helps you get started with axios.

Happy coding!

---

Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
