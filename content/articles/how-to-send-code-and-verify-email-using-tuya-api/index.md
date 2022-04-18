### Introduction
Email is still one of the most preferred and effective communication channels, with most people checking their emails daily. Less percentage of email addresses collected are accurate, this bad data is mostly due to human error. Use of email validation is still the most effective way to ensure collection of quality data. Email verification helps to prevent fraud and increases the ability to protect sender's reputation.

In this tutorial, we will concentrate on Tuya's mail messaging API, which can be used to send an email to a user. We will create a project that will verify the email address.

### Table of contents
- [What is Tuya](#what-is-tuya)
- [How to setup Tuya API](#how-to-setup-tuya-api)
- [Creating a new project](#creating-a-new-project)
- [Building the backend](#building-the-backend)
- [Adding routes to our server](#adding-routes-to-our-server)
- [Using the E-mail Route](#using-the-email-route)
- [Generating a random code](#generating-a-random-code)
- [Verifying the code](#verifying-the-code)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you are required to have the following:

- A code editor.
- Some understanding of HTML, JavaScript and Express.

### What is Tuya?
Tuya provide APIs and a cloud-based API platform, which gives developers a consistent interface via which they may access Tuya's cloud services.

It is much easier to create an app that can control "Internet of Things" devices using Tuya's APIs.

The dependable Tuya Cloud Development is a cost-effective, versatile, and scalable email service that enables sending emails from apps and receiving emails from devices. We will use the Tuya APIs to send and receive emails in this tutorial.

### How to setup Tuya API
First, we need to create an account on the [Tuya Cloud](https://developer.tuya.com/en/). After creating an account and logging in, go to **Platform** drop-down menu, **Cloud** -> **Development** -> **Create Cloud Project**.

Fill out the form to register your project. For the best experience, choose the **Data Center** closest to you. Select **Create**:

![create_cloud_project](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/create_cloud_project.png)

The IoT Core and Authorization options will be shown by default in the **Configuration Wizard** window under **Selected API Services**. Choose **Email Service Trial Version API** from the **Select API Services** list, and then click **Authorize** to complete the process:

![configuration_wizard](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/configuration_wizard.png)

Fill in the details of your asset in the next window:

![project_configuration](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/project_configuration.png)

Your project is now complete, and you'll get your **Access ID/Client ID** and **Access Secret/Client Secret**:

![email_services](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/email_services.png)

From here, we can now set up our project.

### Creating a new project
We will have both frontend and backend in this project. The frontend will deal with taking emails from the user and making the request to the backend. Backend will handle making request to tuya for sending mail and generating random code. It will verify the code too. We are using the backend to prevent a user from knowing the code that we will generate to send.

### Folder Structure
Choose a good name for your working directory and navigate to it. Assuming you've already installed [Node.js](https://nodejs.org/en/), run the following command to create a ` package.json` file for your project:

```bash
$ npm init
```

The file structure for this project will look like this:

```
├── public
    ├── index.html
    ├── script.js
├── server.js
├── package.json
```

### Building the backend
Create a server using the [express](https://express.com/) web framework as a starting point. These are some of the duties that will fall to the server:

- Creating a randomly selected code to be sent to the user.
- Asking Tuya to write an email.
- Verifying a user's code.

Then install `express` in your working directory. We will use the `express` framework to manage our backend server:

```bash
$ npm install express --save
```

Let's install `TuyaContext` from `tuya-connector-nodejs` which is a library that will help us to interact with the Tuya cloud API by handling all server requests:

```bash
$ npm install @tuya/tuya-connector-nodejs
```

Finally, let's install `dotenv` in our project. Dotenv allows you to add environment variables to `.env` files and utilize them in your express (in this example) app with ease. See this [article](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa) for more information about environment variables.

```bash
$ npm install dotenv --save
```

We can now import `express`, `TuyaContext` and `dotenv` to our `server.js` file:

```javascript
import express from "express";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import dotenv from 'dotenv';
```

### Adding routes to our server
Routing describes how client requests are handled by an application's endpoints (URIs). [Basic routing](https://expressjs.com/en/starter/basic-routing.html) is a good place to start if you're new to routing.

Routing is defined using Express app object methods that correspond to HTTP methods, such as `app.get()`, used to handle `GET` requests and `app.post()` for POST requests.

Let's declare our default route in our `server.js` file:

```javascript
const port = process.env.PORT || 8000;
```

Port `8000` will be the default port that our backend server listens on. In order to show our `index.html` in our public folder, we will visit `http://localhost:8000` in the browser.

Let's add the following routes to our server.js file:

```javascript
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
```

Explanation:

```javascript
app.use(express.static('public'));
```

Clients retrieve static files from the server in their current state. Make a new public directory. Express does not enable you to serve static files by default. The above built-in middleware must be used to enable it.

```javascript
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
```

We use the `app.get` method to create a route for our front end and handle the `GET` requests. The `res.sendFile` method will send the file at the specified path. In the above example, we use the `sendFile` method to send the `index.html` file from our public folder to the client.

### Using the Email route
Fill in all of the information to create a new `TuyaContext`. Enter our project's accessKey and secretKey.

BaseURLs should be chosen based on the locality:

![baseUrl](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/baseUrl.jpg)

Let's now create a new `TuyaContext` by adding it to our `server.js` file:

```javascript
app.post("/receivecode", async (req, res) => {
  const tuyaContext = new TuyaContext({
    baseUrl: "https://openapi.tuyain.com",
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY,
  });
});
```

To receive an email from the user (a frontend request), generate random code, and ask Tuya to send mail, the 'POST' route will be utilized. <http://localhost:8000/receivecode/> will be the new URL for emails sent from your local machine.

### Random code generation
Allowing access to a variable through both routes requires declaring it globally, thus we will declare a variable `verificationCode` to our `server.js` file. To generate a random number, use `Math.floor` and `Math.random`, respectively. If the number is less than 0.1, the code will be three digits. So, for example, if the final output is less than 1000, add 1000 to get verification code of four digits:

```javascript
verificationCode = Math.floor(Math.random() * 10000);

if (verificationCode < 1000) {
  verificationCode = verificationCode + 1000;
}
```

### Requesting Tuya
The `tuya.request` method can be used to make a request, which we can save in a data variable. The method of the request is `POST`, and the route is our API endpoint, which is `/v1.0/iot-03/messages/mails/actions/push`:

```javascript
const data = await tuya.request({
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

Let's look at the parameters introduced in our code above:

- `to_address`: It's the recipient's email address here. We'll get an email as a result of the request we make from the frontend to the backend.
- `reply_to_address`: Emails that the user may react to.
- `template_id`: `MAIL_1624531323` is Tuya's pre-configured email template id for the correct code.
- `template_param`: It's the email field. Our code will be included in the `verificationCode: $verificationCode` parameter.

### Route for verifying the code:
Comparing the user-entered code to the code we provide is a simple operation. When making a request to the backend from the frontend, the verification code will be included in the body:

```javascript
app.post("/confirm", async (req, res) => {
  if (req.body.verificationCode == verificationCode) {
    res.send({
      verify:true
    })    
  }
  else{
    res.send({
      verify:false
    })  
  }
});
```

If the code is accurate, we will only send a `true`. If the code is wrong, we will send a `false`. The URL for our verification route will be <http://localhost:8000/confirm/>.

### Creating input fields
In this section, we will create a frontend that we will use with our backend. For the time being, we'll keep things simple and have simply two inputs: one for email and one for code. One button for sending a mail request to the backend, and another for running a code checker on the code.

Let's include the following code in our `index.html` file:

```html
<p>Name:</p>
<input id="email" type="email" placeholder="Enter Email">
<button onclick=sendCode()>Send Code</button>
<p>Code:</p>
<input id="verify" type="number" placeholder="Enter Code">
<button onclick=verifyCode()>Verify Code</button>
```

The `sendCode()` function will be called when the user clicks the `Get Code` button. The `verifyCode()` function will be called when the user clicks the `Verify Code` button. The `sendCode()` function will send a request to the backend to send a code to the user's email. The `verifyCode()` function will send a request to the backend to check the code.

This is how our frontend will look like:

![frontend](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/frontend.png)

### Verifying the code
Here, we're doing two separate tasks at the same time. With the email address provided in the body of the request, the `sendCode()` method contacts our server. A POST request will be made since it includes a body. For example, using `json.stringify()`, you can turn the body into JSON, which is what the server can read.

In our `script.js` file, let's add the following functions:

```JavaScript
const sendCode = ()=>{
  const email = document.getElementById("email").value
  fetch("http://localhost:8000/",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          emailaddress: email
      })
  })
}
```

Here, a POST request will be sent to the server in order to verify the provided code. Verification data will be returned in the form of either `verify:true` or `verify:false` in response to this request. We will tell the user if they need to provide a verification code. The user will see "VERIFIED" if the code is accurate, and "WRONG CODE" if it is incorrect.

```javascript
const verifyCode = () =>{
  const enteredCode = document.getElementById("verify").value
  fetch("http://localhost:8000/verify",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          verificationCode : enteredCode
      })
  })
  .then(function(response){
      return response.json()
  })
  .then(function(data){
      if(data.verify){
          window.alert("VERIFIED")
      }
      else{
          window.alert("WRONG CODE")
      }
  }) 
}
```

Run the server by running the command:

```bash
$ node server.js
```

On the <http://localhost:8000>, enter the email and click `send email`. Tuya API will send the code to the supplied email address:

![verification code](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/verification-code.png)

Once the user enters the code and clicks `verify code`, it will automatically be verified:

![verified-email](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/verified-email.jpeg)

[This GitHub repo](https://github.com/Jeddy947/tuya-email-verification) contains the fully working code used in this tutorial. I have deployed the code to [Heroku](https://tuya-email-verification.herokuapp.com/).

### Conclusion
In this article, we have discussed how Tuya API works and how we can verify our emails using it. Tuya's API does a lot of the hard work. Mail Messages is one of numerous Tuya APIs offered. Some of the other APIs include Short Messages, Voice and Text messaging, Weather, Country codes, IoT, and more.

Using access code and secret code, you can simply make requests using their libraries. The Tuya platform is an excellent resource for obtaining valuable APIs and developing IoT-based gadgets, therefore I strongly advise you to have a look at it.
