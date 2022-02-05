---
layout: engineering-education
status: publish
published: true
url: /how-to-format-form-data-as-json/
title: How To Format Form Data As JSON 
description: This article will be learn how to capture form field data, format them as JSON data and send it to an API endpoint.
author: gisiora-elvis
date: 2022-02-05T00:00:00-00:00
topics: [JavaScript]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-format-form-data-as-json/hero.jpg
    alt: How To Format Form Data As JSON Hero Image
---
The browser [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used to make requests from a web page on the frontend to an API endpoint on the backend. 
<!--more-->
On the other hand the browser [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) provides a precise way of accessing HTML form fields. These two natively support browser APIs making it easy to send requests, but to send data as JSON to an API endpoint this requires an extra work. In this tutorial, you explore a step by step procedure on how to capture form field data, format them as JSON data and send it to an API endpoint.

### Table of contents
- [Goals of this tutorial](#goals-of-this-tutorial)
- [Prerequisites](#prerequisites)
- [The HTML form template](#the-html-form-template)
- [Listening for the form submission](#listening-for-the-form-submission)
- [Reading the form field values with the FormData API](#reading-the-form-field-values-with-the-formdata-api)
- [Formating data to JSON and making a POST request](#formating-data-to-json-and-making-a-post-request)
- [Full code script](#full-code-script)
- [Handling JSON request body in a Nodejs and Express.js API](#handling-json-request-body-in-a-nodejs-and-expressjs-api)
- [Conclusion](#conclusion)

### Goals of this tutorial
By the end of this tutorial, you should have a working HTML form that sends form data as JSON to an API endpoint. In the process, you will learn how to make use of the native browser Fetch and FormData APIs to achieve this goal. In the end, you will have a simple Express Nodejs API which will listen for the request you send and send back the response.

### Prerequisites
To follow along with this tutorial a basic knowledge of the following is required:
- HTML, CSS, and JavaScript
- [Nodejs](https://nodejs.org/en/download/) installed
- Express.js
- A [code editor](https://code.visualstudio.com/download).

### The HTML form template
```html
<form id="sample-form" method="post" action="http://localhost:5500/form">
  <h1>Sample Form</h1>
  <section>
    <fieldset>
      <h3>Gender</h3>
      <ul>
        <li>
          <label for="gender_1">
            <input type="radio" id="gender_1" name="gender" value="Male" />
            Male
          </label>
        </li>
        <li>
          <label for="gender_2">
            <input type="radio" id="gender_2" name="gender" value="Female" />
            Female
          </label>
        </li>
      </ul>
    </fieldset>
    <p>
      <label for="user-fullname">
        <span>Full Name: </span>
        <strong><abbr title="required">*</abbr></strong>
      </label>
      <input type="text" id="user-fullname" name="username" />
    </p>
    <p>
      <label for="user-mail">
        <span>E-mail: </span>
        <strong><abbr title="required">*</abbr></strong>
      </label>
      <input type="email" id="user-mail" name="usermail" />
    </p>
    <p><button type="submit">Submit Form</button></p>
  </section>
</form>
```

![The HTML form](/engineering-education/how-to-format-form-data-as-json/sample-form.png)

A form with 2 radio buttons for selecting male or female gender and 2 input fields, for the full name and email address and a button to submit the form.

### Listening for the form submission
Getting the form by ID.

```js
//Get the form element by id
let sampleForm = document.getElementById("sample-form");
```

When the form’s submit button is clicked the browser dispatches an event, which is captured by the form’s submit event listener. Define the event handler for the form when it's submitted and prevent the default browser behaviour so that you can handle it instead.

```js
//Define the event handler for the form when it's submitted
sampleForm.addEventListener("submit", async (e) => {
  //Prevent browser default behavior
  e.preventDefault();

  // More code here in the next step
}
```

### Reading the form field values with the FormData API
The FormData API provides a precise way of accessing the HTML form field values by passing it a reference to the form element by getting the element attached to the event handler. Then get the URL from the form's `action` attribute. This obtains all the form fields and makes the form field values available as key-value pairs through a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance. Finally, call the `postFormFieldsAsJson()` function (define it in the next step) and pass the `url` and the `formData` instance as arguments.

```js
//Define the event handler for the form when it's submitted
sampleForm.addEventListener("submit", async (e) => {
  //Prevent browser default behavior
  e.preventDefault();

  //Get the entire form fields
  let form = e.currentTarget;

  //Get URL for api endpoint
  let url = form.action;

  try {
    //Form field instance
    let formFields = new FormData(form);

    //Call the `postFormFieldsJson()` function
    let responseData = await postFormFieldsAsJson({ url, formFields });
  } catch (error) {
    // Handle the error here.
    console.error(`An has occured ${error}`);
  }
}
```

### Formating data to JSON and making a POST request
Passing the `FormData` instance directly to `fetch` by default, the request body is formatted as "multipart" and the `Content-Type` on the request header is set to `multipart/form-data`. Convert the FormData instance to a plain object and then into a JSON string.

First create an object from the `formData` instance using the [Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) method.

Using the [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method then format the plain form data as JSON.

Specify the HTTP request method as POST and using the header field of the Fetch API specify that you are sending a JSON body request and accepting JSON responses back.

Then set the request body as JSON created from the form fields.

Finally, send the request and listen for the response. If the response is OK return the response body, otherwise throw an error.

```js
/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // POST request body as JSON string.
    body: formDataJsonString,
  };

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  let res = await fetch(url, fetchOptions);

  //If the response is not ok throw an error (for debugging)
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}
```

### Full code script
This is the full Javascript code with inline comments from the steps above that:
Captures the form fields using the browser FormData API, converts them to JSON and finally send them to an API endpoint using the browser Fetch API.

```js
//Get the form element by id
const sampleForm = document.getElementById("sample-form");

//Add an event listener to the form element and handler for the submit an event.
sampleForm.addEventListener("submit", async (e) => {
  /**
   * Prevent the default browser behaviour of submitting
   * the form so that you can handle this instead.
   */
  e.preventDefault();

  /**
   * Get the element attached to the event handler.
   */
  let form = e.currentTarget;

  /**
   * Take the URL from the form's `action` attribute.
   */
  let url = form.action;

  try {
    /**
     * Takes all the form fields and make the field values
     * available through a `FormData` instance.
     */
    let formData = new FormData(form);

    /**
     * The `postFormFieldsAsJson()` function in the next step.
     */
    let responseData = await postFormFieldsAsJson({ url, formData });

    //Destructure the response data
    let { serverDataResponse } = responseData;

    //Display the response data in the console (for debugging)
    console.log(serverDataResponse);
  } catch (error) {
    //If an error occurs display it in the console (for debugging)
    console.error(error);
  }
});

/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // POST request body as JSON string.
    body: formDataJsonString,
  };

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  let res = await fetch(url, fetchOptions);

  //If the response is not ok throw an error (for debugging)
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}
```

The sample form data (`formDataToJsonString`) object sent as JSON;

```json
{
  "title": "Male",
  "username": "gisioraelvis",
  "usermail": "gisioraelvis@gmail.com"
}
```

### Handling JSON request body in a Nodejs and Express.js API
Implementing a simple API using Nodejs and Express.js, will expose an endpoint where you will be sending the request containing the form data as JSON.

### Setting up the API
Nodejs should be installed on your computer. To check if it is installed, run the following command:

```bash
node -v
```

Otherwise, install it using the following [instructions](https://nodejs.org/en/download/).

While within the project root folder, run the following `npm` command to initialize the Node.js project.

```bash
npm init
```

Fill in the relevant required fields, and then proceed to the next steps.

Alternatively, you can opt to auto initialize the project with NPM default values, in that case, run `npm init -y`. Check this in-depth [npm guide](https://www.section.io/engineering-education/beginner-guide-to-npm/) to understand how to use NPM.

### npm packages used:
- Express - To run the server and expose an endpoint that you will `POST` our request to. Here is a link to [learn more about express.js](https://www.section.io/engineering-education/express/).

- [Nodemon](https://nodemon.io/) - This dev package ensures the server hot reloads as you make changes, so you don’t have to restart the server each time changes are made.

- CORS - Cross-Origin Resource Sharing, allows you to send and accept requests from a different origin, bypassing the default securities applied to RESTful APIs. An awesome article on [using cors in express.js](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/).

### Installing the necessary dependencies
This is are the steps to install the listed Node.js Packages:

```bash
npm install cors express
```
and
```bash
npm install --save-dev nodemon
```

### The Express API/Server code.
```js
let express = require("express");
let app = express();
var cors = require("cors");
//cors to allow cross origin resource sharing
app.use(cors());
//Middleware to parse the body of the request as JSON
app.use(express.json());

//The API endpoint that the form will POST to
app.post("/formdata-as-json", (request, response) => {
  //Destructure the request body
  let resData = {
    serverData: request.body,
  };

  //Console log the response data (for debugging)
  console.log(resData);
  //Send the response as JSON with status code 200 (success)
  response.status(200).json(resData);
});

//Start the server on port 5500
app.listen(5500, () => console.log(`we're live 🎉`));
```

Configure the following start scripts in the package.json file.

```json
"dev": "nodemon api"
```

To start the server run

```bash
npm run dev
```

The console response on the terminal from the API

![The console response on the terminal from the API](/engineering-education/how-to-format-form-data-as-json/console-response-on-terminal-from-api.png)

The console response on the browser
![The console response on browser](/engineering-education/how-to-format-form-data-as-json/console-response-on-browser.png)

For code reference, here is the link to the full project on [GitHub](https://github.com/gisioraelvis/sending-formdata-as-json-using-fetch).

### Conclusion
There you have it! a step by step process on how to format form data as JSON using the browser FormData API and POST it using the browser Fetch API to an API endpoint. You can utilize this newly gained knowledge and skills to develop other applications that make use of these powerful native browser APIs.

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
