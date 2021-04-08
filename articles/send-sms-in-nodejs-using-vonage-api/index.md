---
layout: engineering-education
status: publish
published: true
url: /engineering-education/send-sms-in-nodejs-using-vonage-api/
title: How to send SMS in Node.js using Vonage's SMS API
description: This article provides a step by step guide on how to send sms in Node.js using the Vonage API. Short text messages allow developers and companies to reach out to the target audience quickly. 
author: mercy-weave
date: 2021-04-01T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/send-sms-in-nodejs-using-vonage-api/hero.png
    alt: Sending SMS in Nodejs using vonage's SMS API
---
Short Message Service (SMS) is one of the best marketing strategies that organizations use to communicate with their clients. Using SMS in your mobile or a web application allows you to reach out to more customers since many people check their message inbox than emails. 
<!--more-->
Vonage's SMS API allows programmers to integrate messaging services into an application with ease. The API's benefits include:
- Support for local phone numbers.
- Low latency.
- High delivery rates.
- Modern web technologies support.

### Goal
This article will enable you to integrate SMS functionality into a Node.js application using Vonage's SMS API. 

### Table of contents
+ Introduction
+ Setting up a Vonage account
+ Setting up a Node application
+ Installing dependencies
+ Implementing SMS functionalities
+ Conclusion

### Setting up Vonage account.
1. Navigate to [Vonage's](https://dashboard.nexmo.com/sign-up) website to create an account for free. The platform allows you to have a free trial for $2, after which you will be required to pay. 
2. Create an account by inputting your email address and a strong password. 
3. In the phone number field, provide a valid number that we will use to test the application.
4. Since we will use Node.js, select it as the target programming language.
5. Click on SMS, then wait for your account to be set up.

You have successfully created a Vonage account; your dashboard should look like this.

![Vonage's Dashboard](/engineering-education/flutter-folder-organization/dashboard.png)

### Creating the Node application
**Init application**

Setup up the node application by running the following command:

```bash
npm init
```

This command will create an empty `package.json` file for our application. It will hold the project's metadata which includes dependencies, scripts, and version.

**Install dependencies**

Next, we will install the required dependencies. 
>We will use `express` as our backend framework for Node, `EJS` as our template engine, `body-parser` to parse HTTP request body, `nexmo API` for sending the message, and `socket.io` to request a delivery report for our messages. 

To install these dependencies, run the following command in your terminal.

```bash
npm install –save express, nexmo, eggs, body-parser, socket.io, fetch
```

**Nodemon**

We will need `nodemon` to help us monitor changes and restart the server.  I prefer installing `nodemon` globally. To install nodemon, run the following command.

```bash
npm install -g nodemon
```

We are all set. Now, let's start coding!

### Implementation
Firstly, we need to create our application's entry point file. I will name this as `app.js`. 

> You can set the app's entry point using the `init` command or manually set up within the `package.json` file. 

In the `app.js`, we will import our dependencies, as shown below:

```js
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const fetch = require("node-fetch");
```

Next, we initialize the application with `express` and set up our templating engine, `EJS`.  `EJS` allows us to use `.html` extensions for our views. We will add the following code to the  `app.js` file:

```js
const app = express()
//Setting up the body parser middleware and ejs template engine
app.set('view-engine', 'html');
app.engine('html', ejs.renderFile);

//public folder setup
app.use(express.static(__dirname + '/public'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true});
```

Specify the `index` route as `index.html` since the app will only have a single page `

```js
//index route
app.get('/', (request, response) =>{
    response.render('index.html');
});
```
### Creating our view
We will create a folder called `views` where we will store our template files. In the folder, create an `index.html` file. It will contain the input fields for the `phone number` and `message` to be sent. Here is the code for the `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Send SMS APP</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div class="container">
        <h2>Send Message</h2>
        <!-- phone number input field -->
        <input type="tel" name="number" class="input" id ="number" placeholder="Enter phone number">

        <!-- message input field -->
        <textarea  rows="4" cols="50"  name="msg" id ="message" placeholder="Enter message here..."></textarea>

        <!-- submit button -->
        <div class="button-container">
            <button type="button" id ="button" value="Send">Send Message</button>
        </div>
       
        <!-- Socket.io response in a paragraph -->
        <p class="response"></p>
    </div>

    <!-- link to js scripts and socket -->
    <script src="/socket.io/socket.io.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```
![Our application before sending the message](/engineering-education/send-sms-in-nodejs-using-vonage-api/text-before-sending.png)

### Client-side javascript driver code
We will create a public folder in the root of our application. In the public folder, we will create a `main.js` file to contain the JavaScript code for fetching the variables used to trigger the send-SMS functionality.
```js
// phone number
const phoneNumber= document.getElementById('number'),

//message to send
textMessage = document.getElementById('message'),

//send button
button = document.getElementById('button'),

//response field
response = document.querySelector(".respose");
```

### Adding the send functionality
Since we have added a `send button` in the html form, we need to attach an `EventListener` to the button to trigger the `send` function. The code for this functionality is shown below.

```js
button.addEventListener('click', send, false);
function send() {
    // getting value form the variabled  fetched
    const number = phoneNumber.value.replace(/\D/g, '');// eliminate non-numeric characters
    const text = textMessage.value;
    
    // Making a post request with the data to the our server
    fetch('/', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        // convert the request body into a string
        body: JSON.stringify({ number, text })
    }).then(function (res){
        //log the response
        console.log(res);
    }).catch(function(err){ //cathc any error found
        //console log the error
        console.log(err);
    });
}
```
### Implemeting Nexmo
First we will initialize Nexmo by supplyoing out apiKey and secret
```js
//init out nexmo
const nexmo = new Nexmo({
    apiKey: 'YOUR API-KEY',
    apiSecret: 'API-SECRET',
}, {debug:true});
```
We need to catch the post on the server since the fetch API makes a post request. In our `app.js`,  we will add the following code to catch the post request and use Nexmo to send the message to the number specified in the request body.
```js
//catch post from our main js
app.post('/', (request, response) =>{
    const phoneNumber = request.body.number;
    const textMessage = request.body.text;

    const from = 'Vonage APIs';
    const to = phoneNumber;
    const text =  textMessage;
    nexmo.message.sendSms(from, to, text, {type:'unicode'}, (error,responseData) =>{
        if(error){
            console.log(error)
        }else{
            console.dir(responseData);
            //get phone number into an object to be sent to the client
            const data = {
                number: responseData.messages[0]['to']
            }
            //send response to client using socket 
            io.emit('smsStatus', data);
        }
    });
});
```
Next, we will send the response data to the client to show if the SMS was sent successfully or not. To do this, we will send the response data from nexmo to the client in the `main.js` file using `io.emit()` function. You could find more about this function [here](https://socket.io/docs/v3/).
```js
io.emit('smsStatus', data)
```
 To receive the data and embed into out index page, we use the below code in `main.js` file:
```js
const socket = io();
socket.on('smsStatus', function(data){
    if(data.error){
        //in case of an error response
        response.innerHTML = '<strong>Success!</strong><h5>Text message sent to ' + data.error + '</h5>';
    }else{
          // if the sms is sent successfully
        response.innerHTML = '<strong>Failed!</strong><h5>Text message sent to ' + data.number + '</h5>';
    }
});

```
![Success message](/engineering-education/flutter-folder-organization/text-before-sending.png)

To start our server, we will define a port from where our application will run on localhost. 
```js
//Port number
const port = 3000;

//start server
const server = app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});
```
![Text message in web messages application](/engineering-education/flutter-folder-organization/text-in-sms-app.png)

### Conclusion
To conclude, we learned how to set up Vonage's SMS API by creating an account, setting up the API, and using the API to send messages to a  number provided. Note that the number used for testing must be registered under your account, if you have not upgraded your account to premium. We also learned how to use sockets.io to communicate between our server and client application. You can find the complete application code [here.](https://github.com/mercymeave/code-space/tree/main/node-text-app).

### Further Reading
+ Vonage API: https://developer.nexmo.com/messaging/sms/overview
+ Socket.io: https://socket.io/
+ Fetch API: https://dev.to/attacomsian/introduction-to-javascript-fetch-api-4f4c

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)