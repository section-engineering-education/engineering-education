---
layout: engineering-education
status: publish
published: true
url: /how-to-send-code-and-verify-email-using-tuya-api/
title: How to Verify Emails using Tuya APIs
description: This article will explain how to use the Tuya Mail API to send a random code to a user's email address and verify it using a Node app.
author: jedidah-mwangi
date: 2022-05-19T00:00:00-13:30
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-send-code-and-verify-email-using-tuya-api/hero.jpg
    alt: How to Verify Emails Using Tuya APIs.
---
Email is still one of the most preferred and effective communication channels with most people checking their emails daily. Use of email validation is still the most effective way of preventing spamming. Email verification helps to prevent fraud and increases the ability to validate a sender.
<!--more-->
In this tutorial, we will concentrate on Tuya's mail messaging API, which can be used to send emails to a user. We will create a project that will verify email addresses.

### Table of contents
- [What is Tuya](#what-is-tuya)
- [How to setup Tuya API](#how-to-setup-tuya-api)
- [Creating a new project](#creating-a-new-project)
- [Building the backend](#building-the-backend)
- [Adding routes to our server](#adding-routes-to-our-server)
- [Using the Email Route](#using-the-email-route)
- [Random code generation](#random-code-generation)
- [Verifying the code](#verifying-the-code)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you are required to have some working knowledge of HTML, JavaScript and Express.

### What is Tuya?
Tuya provide APIs and a cloud-based API platform, which gives developers a consistent interface via which they may access Tuya's cloud services. It is relatively easy to create an app that can control "Internet of Things" devices using Tuya's APIs.

The dependable Tuya Mail Service is a cost-effective, versatile, and scalable email service that enables sending emails from apps and receiving emails from devices. We will use the Tuya APIs to send and receive emails in this tutorial.

### How to setup Tuya API
First, we need to create an account on the [Tuya Cloud](https://developer.tuya.com/en/). After creating an account and logging in, go to **IoT Platform** -> **Cloud** -> **Development** -> **Create Cloud Project** to create a Tuya cloud project.

Fill out the form to register your project. For the best experience, choose the **Data Center** geographically closest to you. Then select **Create**:

![create_cloud_project](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/create_cloud_project.png)

The IoT Core and Authorization options will be shown by default in the **Configuration Wizard** window under **Selected API Services**. Choose **Email Service Trial Version API** from the **Select API Services** list, and then click **Authorize** to complete the process:

![configuration_wizard](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/configuration_wizard.png)

Fill in the details of your assets in the next window:

![project_configuration](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/project_configuration.png)

Your cloud project is now ready, and you'll get your **Access ID/Client ID** and **Access Secret/Client Secret**:

![email_services](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/email_services.png)

From here, we can now set up our project locally.

### Creating a new project
We will have both a frontend and a backend/server in this project. The frontend will deal with taking an email adress from the user and making the verification request to the backend.

The backend will handle generating a random code for email verification and making a request to Tuya for sending the verification email. It will also be responsible for verifying the code too. We are generating the code in the server to prevent a user from knowing the generated code.

### Folder structure
Choose a good name for your working directory and navigate to it. Assuming you've already installed [Node.js](https://nodejs.org/en/), run the following command to create a ` package.json` file for your project:

```bash
$ npm init -y
```

The file structure for this project should look like this:

```bash
├── public
    ├── index.html
    ├── script.js
├── server.js
├── package.json
```

Add the `"type": "module"` property to your `package.json` to run the project as a module.

### Building the backend
We will create a server using the [Express](https://express.com/) web framework as a starting point.

Let's start by installing `express` in your working directory. We will use the `express` framework to manage our server:

```bash
$ npm install express --save
```

Let's install the `tuya-connector-nodejs` library which will help us to interact with the Tuya cloud API by handling all server requests:

```bash
$ npm install @tuya/tuya-connector-nodejs
```

After the installation, we can now import `express` and `TuyaContext` in our `server.js` file:

```javascript
import express from "express";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";

const app = express();
app.use(express.json());

const port = 8000;
```

`TuyaContext` is a class that provides an interface to connect to your Tuya cloud project. We also tell express to use the JSON body parser. This allows us to parse the body of the request into a JavaScript object.

We have declared a variable `port` as a constant with a value of `8000`. This variable will hold the port number for our application.

### Adding routes to our server
Routing describes how client requests are handled by an application's endpoints (URIs). [Basic routing](https://expressjs.com/en/starter/basic-routing.html) is a good place to start if you're new to routing.

Routing is defined using Express app object methods that correspond to HTTP methods, such as `app.get()`, used to handle `GET` requests and `app.post()` for POST requests.

Let's declare our default route in our `server.js` file:

```javascript
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
```

Since clients retrieve static files from the server in their original form, we use the `express.static` middleware to serve our `index.html`.

We use the `app.get` method to create a route for our frontend and handle the `GET` requests. The `res.sendFile` method will send the HTML file to the `/` path. In order to show our `index.html` in our public folder, we will visit <http://localhost:8000> in the browser.

### Using the Email route
Fill in all of the information to create a new `TuyaContext`. Enter our project's `accessKey` and `secretKey`. The `BaseUrl` should be chosen based on the locality:

![baseUrl](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/baseUrl.jpg)

Let's now create a new `TuyaContext` by adding it to our `server.js` file:

```javascript
app.post("/sendcode", async (req, res) => {
  const tuyaContext = new TuyaContext({
    baseUrl: "https://openapi.tuyain.com",
    accessKey: "ClIENT-ID-HERE",
    secretKey: "ClIENT-SECRET-HERE",
  });
});
```

> Note: Replace `CLIENT-ID-HERE` and `CLIENT-SECRET-HERE` with your own `accessKey` and `secretKey` from your Tuya Cloud project.

To receive an email from the user (a frontend request), generate a random code snippet, and ask Tuya to send a verification email, the POST method will be utilized. <http://localhost:8000/sendcode/> will be the URL for emails sent from your local machine.

### Random code generation
To access the verification code to both the generator and verification route, we need to declare it as a global variable. Let's declare a variable `verificationCode` in our `server.js` file.

```javascript
let verificationCode;
```

To generate a random number, we will use `Math.floor` and `Math.random` respectively. If the number generated by `Math.random()` is less than 0.1, the code will be three digits. So, when the final output is less than 1000, we will add 1000 to get verification code of four digits.

Add the following lines of code inside the `app.post` route, right under the `tuyaContext` variable:

```javascript
verificationCode = Math.floor(Math.random() * 10000);

if (verificationCode < 1000) {
  verificationCode = verificationCode + 1000;
}
```

### Sending email using Tuya
The `tuyaContext.request` method can be used to make a request, which we can save in a data variable. The request should be a POST request, and the route is our API endpoint, which is `/v1.0/iot-03/messages/mails/actions/push`:

```javascript
const data = await tuyaContext.request({
  method: "POST",
  path: "/v1.0/iot-03/messages/mails/actions/push",
  body: {
    to_address: req.body.emailaddress,
    reply_to_address: "email@example.com",
    template_id: "MAIL_1624531323",
    template_param: `{\"verificationCode\":\"${verificationCode}\"}`,
  },
});
```

Let's look at the parameters included in the request body:
- `to_address`: It's the recipient's email address here. We'll get an email as a result of the request we make from the frontend.
- `reply_to_address`: Emails that the user may react to.
- `template_id : MAIL_1624531323`: Tuya's pre-configured email template id for the correct code.
- `template_param`: The email field. Our code will be included in the `verificationCode: ${verificationCode}` parameter.

### Route for verifying the code
Comparing the user-entered code to the code we provide is a simple operation. When making a request to the backend, the verification code will be included in the body:

```javascript
app.post("/verify", async (req, res) => {
  if (req.body.verificationCode == verificationCode) {
    res.send({
      verify: true,
    });
  } else {
    res.send({
      verify: false,
    });
  }
});
```

If the code is accurate, we will only send a `true`. If the code is wrong, we will send a `false`. The URL for our verification route will be <http://localhost:8000/verify/>.

#### Starting the server
Any Express.js app will involve creating an instance imported from express. This instance can then be used to define what is to be done when certain requests are made from a client, and so forth. However in order to get this app up and running and start listening on a port for requests the `app.listen` method must be called to start the instance.

Add the following lines of code to the `server.js` file:

```javascript
app.listen(port, () => {
  console.log(`Express server currently running on port ${port}`);
});
```

Here, the first parameter is the port number that we want to listen on (`8000`). The second parameter is a callback function that will be called when the server is successfully started.

### Creating input fields
In this section, we will create a simple frontend that we will use with our backend.

For the time being, we'll keep things simple and have simply two inputs: one for email and one for code. We will also include a button for sending a mail request to the backend, and another for running a verification on the code.

Let's include the following code in our `index.html` file:

```html
<p>Name:</p>
<input id="email" type="email" placeholder="Enter Email" />
<button onclick="sendCode()">Send Code</button>
<p>Code:</p>
<input id="verify" type="number" placeholder="Enter Code" />
<button onclick="verifyCode()">Verify Code</button>

<script src="./script.js"></script>
```

The `sendCode()` function will be called when the user clicks the `Send Code` button. The `verifyCode()` function will be called when the user clicks the `Verify Code` button. The `sendCode()` function will send a request to the backend to send a code to the user's email. The `verifyCode()` function will send a request to the backend to check the code.

This is what our frontend will look like:

![frontend](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/frontend.png)

### Verifying the code
With the email address provided in the body of the request, the `sendCode()` method will contact our server. A POST request will be made since it includes a body. We will use `json.stringify()`, to turn the body into JSON, which is what the server can read.

In our `script.js` file, let's add the following function:

```Javascript
const sendCode = () => {
  const email = document.getElementById("email").value
  fetch("/sendcode",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify({
          emailaddress: email
      })
  })
}
```

Here, a POST request will be sent to the server in order to verify the provided code. Verification data will be returned in the form of either `verify:true` or `verify:false` in response to this request. The user will see an alert with "VERIFIED" if the code is accurate, or "WRONG CODE" if it is incorrect.

```javascript
const verifyCode = () => {
  const enteredCode = document.getElementById("verify").value;
  fetch("/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      verificationCode: enteredCode,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.verify) {
        window.alert("VERIFIED");
      } else {
        window.alert("WRONG CODE");
      }
    });
};
```

Run the server by running the command below:

```bash
$ node server.js
```

On <http://localhost:8000>, enter your email and click `send email`. Tuya API will send the code to the supplied email address:

![verification code](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/verification-code.png)

Once the user enters the code and clicks `verify code`, it will automatically be verified:

![verified-email](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/verified-email.jpeg)

[This GitHub repo](https://github.com/Jeddy947/tuya-email-verification) contains the fully working code used in this tutorial. [Click here](https://tuya-email-verification.herokuapp.com/) to see the live version of this code deployed on Heroku.

### Conclusion
In this article, we have discussed how Tuya API works and how we can verify emails using it. Tuya's API does a lot of the hard work making the verification process lighter. Mail Messages is one of numerous Tuya APIs offered. Some of the other APIs include Short Messages, Voice and Text messaging, Weather, Country codes, IoT, and more.

Using an access code and secret code, you can simply make requests using their libraries. The Tuya platform is an excellent resource for obtaining valuable APIs and developing IoT-based gadgets, it might be a good choice to use it for your next project.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
