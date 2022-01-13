### How To Use The FormData and Fetch API to Submit Data As JSON Data To An API Endpoint

The browser [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is used to make requests from a web page on the front end to an API endpoint on the back end. The [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) on the other hand provides a precise way of accessing HTML form fields. Both of these two natively supported browser APIs make it easy to send requests, but to send data as JSON to an API endpoint extra bit of work is needed. In this tutorial, we explore a step by step procedure on how to capture form field data, format them as JSON data and send it to an API endpoint.

### Steps

Here are the steps we are going to follow to achieve our goal

1. [Listen for form submission](#Listen-for-form-submission).
2. [Reading the form field values with the browser FormData API](#reading-the-form-field-values-with-the-browser-formdata-api).
3. [Formatting the data as JSON](#formatting-the-data-as-json)
4. [POST the JSON data to a URL endpoint with Fetch API as request body data](#post-the-json-data-to-a-url-endpoint-with-fetch-api-as-request-body-data).
5. [Handling JSON request body with Express Nodejs API](#handling-json-request-body-with-express-nodejs-api).

### Goal

By the end of this tutorial, we will have a working HTML form that sends form data as JSON to an API endpoint. In the process, we will make use of the native browser Fetch and FormData APIs to achieve our goal. As a bonus, we have a simple Express Nodejs API which will listen for the request we send and send back the response.

### Prerequisites

It’s assumed you have prior experience with HTML, CSS and JS.

### This is the HTML form we will be working with.

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

The sample form we will be working with.
![The HTML form](sample-form.png)

Let us dive in.

## Step 1: Listen for form submission.

When the form’s submit button is clicked the browser dispatches an event. We get the form by ID and listen for this submit event.

```js
//Get the form element by id
let exampleForm = document.getElementById("sample-form");
//Add an event listener to the form element
exampleForm.addEventListener("submit", handleFormSubmit);
```

In the next step we define the `handleFormSubmit()` event handler function.

### Step 2: Reading the form field values with the FormData API.

The FormData API provides a precise way of accessing the HTML form field values by passing it a reference to the form element.
Let's define the event handler for the form when it's submitted and prevent the default browser behaviour so that we can handle it ourselves instead. We then get the element attached to the event handler. Then grab the URL from the form's `action` attribute. This obtains all the form fields and makes the form field values available as key-value pairs through a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance. Finally, we call the `postFormFieldsAsJson()` function(We'll define it in the next step) and pass the `url` and the `formData` instance as arguments.

```js
//Function to handle submission
async function handleFormSubmit(e) {
  //Prevent browser default behavior
  e.preventDefault();

  //Get the enitere form fields
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

### Step 3: Format the data as JSON and make a POST request to a URL endpoint with Fetch API.

Passing the `FormData` instance directly to `fetch` by default the request body is formatted as "multipart" and the `Content-Type` on the request header is set to `multipart/form-data`. Since we aim to send the request body as JSON, we convert the FormData` instance to a plain object and then into a JSON string.

We first create an object from the the `formData` instance using the The [Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) method.

Using the The [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method we then format the plain form data as JSON.

We then specify the HTTP request method as POST and using the header field of the Fetch API specify that we are sending a JSON body request and accepting JSON responses back.

We then set the request body as JSON created from the form fields.

We finally send the request and listen for the response. If the response was not OK, we throw an error otherwise, if the response was OK, return the response body.

```js
//Helper function to POST data as JSON
async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  let formDataAsObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataToJsonString = JSON.stringify(formDataAsObject);

  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Specify we are sending and accepting JSON data
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    //Request body as JSON string.
    body: formDataToJsonString,
  };

  //Send the request to the API with the options we defined above.
  let res = await fetch(url, fetchOptions);

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}
```

### Full script code

This is the full js script with inline comments from the steps above that:

1. Captures the form fields using the browser FormData API
2. Converts them to JSON.
3. Finally send them to an API endpoint using the browser Fetch API.

```js
//Get the form element by id
let sampleForm = document.getElementById("sample-form");

//Add an event listener to the form element
sampleForm.addEventListener("submit", handleFormSubmit);

/**
 * Event handler for the form submit an event.
 */
async function handleFormSubmit(e) {
  /**
   * Prevent the default browser behaviour of submitting
   * the form so that we can handle this instead.
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
    let formFields = new FormData(form);

    /**
     * We'll define the `postFormFieldsAsJson()` function in the next step.
     */

    let responseData = await postFormFieldsAsJson({ url, formFields });
  } catch (error) {
    // Handle the error here.
    console.error(`An error has occured ${error}`);
  }
}

/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  let formDataAsObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataToJsonString = JSON.stringify(formDataAsObject);

  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify we're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    // POST request body as JSON string.
    body: formDataToJsonString,
  };

  //Send the request to the API with the above-defined options.
  let res = await fetch(url, fetchOptions);

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}
```

> Link to code on [Github](https://github.com/gisioraelvis/sending-formdata-as-json-using-fetch)

The sample form data (`formDataToJsonString`) object sent as JSON;

```json
{
  "title": "Male",
  "username": "gisioraelvis",
  "usermail": "gisioraelvis@gmail.com"
}
```

### Bonus: Handling JSON request body in a Nodejs and Express.js API

As a bonus we are going to implement a simple API using Nodejs and Express.js, this will expose an endpoint where we will be sending our request.

### Setting up the API

Must have Node.js on your machine. To check run the following command in the terminal.

```
node -v
```

While within the project root folder, run the following `npm` command to initialize the Node.js project.

```
npm init
```

Fill in the relevant required fields, and then proceed to the next steps.

Alternatively, you can opt to auto initialize the project with NPM default values, in that case, run `npm init -y`. Check this in-depth [npm guide](https://www.section.io/engineering-education/beginner-guide-to-npm/) to understand how to use NPM.

### npm packages used:

- Express - To run the server and expose an endpoint that we will `POST` our request to. Here is a link to [learn more about express.js](https://www.section.io/engineering-education/express/).

- [Nodemon](https://nodemon.io/) - This dev package ensures the server hot reloads as you make changes, so you don’t have to restart the server each time changes are made.

- CORS - Cross-Origin Resource Sharing, allows us to send and accept requests from a different origin, bypassing the default securities applied to RESTful APIs. An awesome article on [using cors in express.js](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/).

### Installing the necessary dependencies

This is are the steps to install the listed Node.js Packages:

```
npm install cors express
```

and

```
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
app.listen(5500, () => console.log("we're live 🎉"));
```


Configure the following start scripts in the package.json file.

```json
"dev": "nodemon api"
```

To start the server run

```
npm run dev
```

The console response on the terminal from the API

![The console response on the terminal from the API](console-response-on-terminal-from-api.png)

The console response on the browser
![The console response on browser](console-response-on-browser.png)

> For code reference, here is the full project link on [GitHub](https://github.com/gisioraelvis/sending-formdata-as-json-using-fetch).

### Conclusion

There you have it! the step by step process to use the FormData API with Fetch API and POST the form data as JSON to an API endpoint. You can utilize this newly gained knowledge and skills to craft other powerful applications that make use of these powerful native browser APIs.

Happy coding!!