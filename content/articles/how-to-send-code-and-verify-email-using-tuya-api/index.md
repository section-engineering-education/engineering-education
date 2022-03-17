### Introduction
The tutorial will concentrate on Tuya's Mail Message API, which will be used to send an email to the user. The project will verify the email with a randomly generated code sent to the entered email.

### Table of contents
- [What is Tuya API](#what-is-tuya-api)
- [How to configure the Tuya API](#how-to-configure-the-tuya-api)
- [Creating a new project](#creating-a-new-project)
- [Building the backend](#building-the-backend)
- [Adding routes to our server](#adding-routes-to-our-server)
- [Using the E-mail Route](#using-the-email-route)  
- [Generating a random code](#generating-a-random-code)
- [Verifying the code](#verifying-the-code)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you are required to have the following:
- A text editor.
- Basic understanding of HTML, JavaScript and Express.

### What is Tuya API?
Tuya API is a RESTful API that allows you to create, read, update and delete data from your Tuya devices. The API is built on top of the [Tuya Cloud](https://developer.tuya.com) platform.

The dependable Tuya Cloud Development is a cost-effective, versatile, and scalable email service that enables sending emails from apps and receiving emails from devices.

### How to configure the Tuya API

In order to get started, we first need to register for an account on the [Tuya Cloud](https://developer.tuya.com/en/). Login to your account and choose the **Platform** drop-down menu and select  **Cloud** -> **Development**.


Register your project by filling in the required fields and click on **Create**:

![create_cloud_project](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/create_cloud_project.png)

IoT Core and Authorization will be displayed by default in the next window which you will fill out and then click the **Authorize** button to finish the process of signing up.

![configuration_wizard](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/configuration_wizard.png)

The next window asks for information about your asset:

![project_configuration](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/project_configuration.png)

Your project is now complete, and you'll get your **Access ID/Client ID** and **Access Secret/Client Secret**:

![email_services](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/email_services.png)

From here, we can now set up our project.

### Creating a new project
Both the frontend and the backend will be available in our project. Here, we shall use html form as our frontend to get email from the user, then make request to Tuya for a secret code to be sent to the given email and then verification. Using Tuya, the backend will send mail and generate random code as well as to hide the code we'll be writing from the end user.

### File Structure:
Use friend-letter to create a working directory for your program. Assuming you've already installed [Node.js](https://nodejs.org/en/), run the following command to create a ` package.json` file for your project:

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
- Creating a randomly selected code to be sent
- Asking Tuya to write an email
- Verifying user's code

Install `express` in your working directory. We will use the `express` framework to manage our backend server:

```bash
$ npm install express --save
```

Let's install `TuyaContext` from `tuya-connector-nodejs`. It is a library that will help us to interact with the Tuya cloud API by handling all server requests:

```bash
$ npm install @tuya/tuya-connector-nodejs
```

Finally, let's install `dotenv` in our project. Dotenv allows you to add environment variables to `.env` files and utilize them in your express (in this example) app with ease. See this [article](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa) for more information about environment variables.

```bash
# install locally (recommended)
$ npm install dotenv --save
```

We can now import `express` and `dotenv` to our `server.js` file:

```JavaScript
import express from "express";
import dotenv from 'dotenv';
```

### Adding routes to our server
Routing describes how client requests are handled by an application's endpoints (URIs). [Basic routing](https://expressjs.com/en/starter/basic-routing.html) is a good place to start if you're new to routing.

Routing is defined using Express app object methods that correspond to HTTP methods, such as `app.get()`, used to handle `GET` requests and `app.post()` for POST requests.

Let's declare our default route in our `server.js` file:

```JavaScript
const port = process.env.PORT || 8000
```

Port `8000` will be the default port that our backend server listens on. In order to show our `index.html` in our public folder, we will visit `http://localhost:8000` in the browser.

Let's add the following routes to our server.js file:

```JavaScript
app.use(express.static('public'));
 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
```

Explanation:

```JavaScript
app.use(express.static('public'));
```

Clients retrieve static files from the server in their current state. Make a new public directory. Express does not enable you to serve static files by default. The above built-in middleware must be used to enable it.

```JavaScript
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
```

We use the `app.get` method to create a route for our front end and handle the `GET` requests. The `res.sendFile` method will send the file at the specified path. In the above example, we use the `sendFile` method to send the `index.html` file from our public folder to the client.

### Using the E-mail Route
Fill in all of the information to create a new `TuyaContext .`Enter our project's accessKey and secretKey.

BaseURLs should be chosen based on the locality:

![baseUrl](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/baseUrl.jpg)

Let's now create a new `TuyaContext` by adding it to our server.js file:

```JavaScript
app.post('/receivecode', async(req, res)=>{
    const tuyaContext = new TuyaContext({
        baseUrl: 'https://openapi.tuyain.com',
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.SECRET_KEY,
    });
});
```

Let's explain our code above:

```JavaScript
app.post('/receivecode', async(req, res)=>{
    //code
});
```

`http://localhost:8000/receivecode/` will be the new URL for emails sent from your local machine.

### Random code generation 
Allowing access to a variable through both routes requires declaring it globally, thus we will declare a variable `verificationCode` to our `server.js` file. So, for example, if the final output is less than 1000, add 1000 to get verification code of four digits:

```JavaScript
verificationCode = Math.floor(Math.random() * 10000)
if(verificationCode<1000){
    verificationCode=verificationCode+1000
} 
```

`tuya.request` can be used to make a request, which we can save it in a data variable.

### Route for verifying the code:
Comparing the user-entered code to the code we provide is a simple operation. When making a request to the backend from the frontend, the verification code will be included in the body:

```JavaScript
app.post('/confirm', async(req, res)=>{
    if(req.body.verificationCode == verificationCode){
        res.send({
            confirm:true
        })    
    }
    else{
        res.send({
            confirm:false
        })  
    }
})
```

If the code is accurate, we will only send **true**. If the code is wrong, we will send **false**. The URL for our verification route will be `http://localhost:8000/confirm/`.

### Creating input fields
In this section, we will create a frontend that will use our backend. We will create a form that will ask the user to enter their email address and code. We will then send the user to a confirmation page. Let's include the following code in our `index.html` file:

```html
<label>Name:</label>
<input id="email" type="email" placeholder="Enter Your Email">
<button onclick="getCode()">Get Code</button>
<p>Code:</p>
<input id="confirm" type="number" placeholder="Enter Code">
<button onclick="confirm()">Verify Code</button> 
```

The `getCode` function will be called when the user clicks the `Get Code` button. The `confirm` function will be called when the user clicks the `Verify Code` button. The `getCode` function will send a request to the backend to send a code to the user's email. The `confirm` function will send a request to the backend to check the code.

This is how our frontend will look like:

![frontend](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/frontend.png)

### Verifying the code
At the same time, we're doing two independent jobs. The `getCode()` function communicates with our server using the email address supplied in the body of the request.

Here,verified data will be returned in the form of either verify:**true** or verify:**false** in response to this request and we will tell the user if they need to provide a verification code. The user will see "VERIFIED" if the code is accurate, and "WRONG CODE" if it is incorrect.

Run the server by running the command:

```bash
$ node server.js
```

On the `http://localhost:8000`, enter the email and click `send`:

![verification code](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/verification-code.png)

Once the user enters the code and clicks `verify code`, it will automatically be verified:

![verified-email](/engineering-education/how-to-send-code-and-verify-email-using-tuya-api/verified-email.jpeg)

My [GitHub repo](https://github.com/Jeddy947/tuya-email-verification) contains fully working code. I have deployed the code to [Heroku](https://tuya-email-verification.herokuapp.com/).

### Conclusion
In this tutorial, we've learned how to send an email with a verification code and verify the code.