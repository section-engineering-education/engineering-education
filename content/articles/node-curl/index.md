---
layout: engineering-education
status: publish
published: true
url: /node-curl/
title: Making cURL Requests in Node.js
description: In this article, we are going to go through using cURL in Node.js using the `node-libcurl` library. We are going to go through the libraries' introductory functionalities, and in our case, we will look at form submission. This is chosen because it is easier for a beginner to understand.
author: vincent-ngunzulu
date: 2021-06-16T00:00:00-07:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/node-curl/hero.jpg
    alt: cURL requests image example
---

**cURL (client URL)** is a free tool used to make network requests from the terminal using various protocols available. It is very useful when one wants an application to request without necessarily engaging a user e.g checking and validating the access token for using an API. For backend developers like me, it may come in handy when we want to send form data to test our APIs without designing a user interface for a form. Of course, there is Postman but with this, you can customize and have more control over it.

<!--more-->

### Introduction

cURL supports various protocols such as HTTP, FTP, FILE, etc. Other than the command-line, we can use cURL to display responses gotten from the requests on a webpage. An example of a cURL command is shown below:

```bash
curl -o doc.html <url/doc.html>
```

The command makes a request to a server then stores the resulting webpage as `doc.html` or any name one might choose. The `-o` flag is used to add a filename that the webpage will be saved as.

Let's have a look at other commands demonstrating specific selection of a protocol.

```bash
curl section.io
```

CURL uses the HTTP protocol by default. To switch to another protocol, preface the url with the protocol ie:

```bash
curl ftp://section.io
```

We are now using the FTP protocol.

In this article, we are going to go through using cURL in Node.js using the `node-libcurl` library. We are going to go through the libraries' introductory functionalities, and in our case, we will look at form submission. This is chosen because it is easier for a beginner to understand.

> One quick note is that `node-libcurl` is used for native code and not used in a browser. You can use the results gotten from respective requests to do some browser rendering.

#### Prerequisites
For a good understanding of this article's contents, one must have:

1. A basic understanding of JavaScript and Node.js
2. Node.js (npm) installed.

#### Getting into it

We first install the library:

```bash
npm i node-libcurl --save
```

or if using Yarn:

```bash
yarn add node-libcurl
```

We are going to use the `Curl()` class provided by the library to perform the form requests.

To start, create a JavaScript file with your preferred name then write the following snippet in it.

```JavaScript
const querystring = require("querystring");
const { Curl } = require("node-libcurl");
const terminate = curlTest.close.bind(curlTest);
```

Here, we are importing the `Curl()` class and the `querystring` module. The `querystring` allows us to access the **querystring API** which provides functionality for handling URL strings. Finally, the last statement initiates a method of the class for closing a curl request.

```Javascript
const curlTest = new Curl();

curlTest.setOpt(Curl.option.URL, "https://reqres.in/api/users");
curlTest.setOpt(Curl.option.POST, true);
curlTest.setOpt(
	Curl.option.POSTFIELDS,
	querystring.stringify({
		name: "section",
		job: "webdev",
	})
);
```

Next, we initialize the curl class creating an object called `curlTest`.
We set various options using the `setOpt()` method. The first option is for passing in the url where the request will be sent to. The second is for the method and the last is for the POST parameters.

> We use the https://reqres.in/ because it is an API that accepts all the REST Methods. It is helpful if one wants some test responses for his/her projects. Take some time and visit it. The library currently has support for the POST method.

```Javascript
curlTest.on("end", function (statusCode, data, headers) {
	console.info("Status code " + statusCode);
	console.info("***");
	console.info("Our response: " + data);
	console.info("***");
	console.info("Length: " + data.length);
	console.info("***");
	console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));

	this.close();
});
curlTest.on("error", terminate);
```

The snippet above is for showing some info about the request. It logs the status code of the response e.g 404, 200, etc, the response, its length, and the total time taken. In case of an error, it closes the request.

```JavaScript
curlTest.perform();
```

The line above is now used to perform the request hence the name of the method. It initiates the cURL request.

Here is the full code:

```JavaScript
const querystring = require("querystring");
const { Curl } = require("node-libcurl");
const terminate = curlTest.close.bind(curlTest);

const curlTest = new Curl();

curlTest.setOpt(Curl.option.URL, "https://reqres.in/api/users");
curlTest.setOpt(Curl.option.POST, true);
curlTest.setOpt(
	Curl.option.POSTFIELDS,
	querystring.stringify({
		name: "section",
		job: "webdev",
	})
);

curlTest.on("end", function (statusCode, data, headers) {
	console.info("Status code " + statusCode);
	console.info("***");
	console.info("Our response: " + data);
	console.info("***");
	console.info("Length: " + data.length);
	console.info("***");
	console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));

	this.close();
});
curlTest.on("error", terminate);

curlTest.perform();
```

**_The expected output_**

After successfully running the file, we should see an output of the format below.

```bash
Status code 201
***
Our response: {"name":"section","job":"web dev","id":"99","createdAt":"2021-05-30T13:51:11.922Z"}
***
Length: 83
***
Total time taken: 0.633325
```

### Uploading files

Performing file uploads uses the same format only that we add a few more parameters.

```bash
curl.setOpt(Curl.option.URL, '<the-backend-script-url-for-processing-the-upload>');
curl.setOpt(Curl.option.HTTPPOST, [
    { name: '<name-of-input>', file: '<path-in-your-device-directory>', type: '<filetype>' }
]);
```

We add the file path and the type in the parameters field. Also, note that we use HTTPPOST which is used for multipart form upload.

### Conclusion

That was an elementary guide through the libcurl library. However, it is not only limited to form uploads. More functionality on utilities such as handling the file system, handling downloads and much more can be found [here](https://github.com/JCMais/node-libcurl/tree/develop/examples).

In case of any errors, refer to the official documentation [here](https://www.npmjs.com/package/node-libcurl).

In summary, we have seen what cURL is, how to install and use it in Node.js. It is a very helpful and lightweight tool.

Happy coding.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

