Short Message Service (SMS) is one of the best marketing strategies that organizations can use to keep their clients close.  SMS integration in a mobile or a web application effectively reaches out to customers as most people check their message inbox than emails. SMS are mobile-friendly and can reach a broad demographic cover.
Vonage's SMS API allows programmers to integrate messaging services into an application with ease. Vonage's API's benefits are support local phone numbers, low latency, high delivery rates, and modern web technologies support.
This article will enable you to integrate SMS functionality into a Nodejs application using Vonage SMS API. 

### Table of contents
+ Introduction
+ Setting up a Vonage account
+ Setting up a Node application
+ Installing dependencies
+ Implemeting Sending SMS using Vonage's SMS API
+ Conclusion

### Setting up Vonage account.
1. Navigate to [Vonage's](https://dashboard.nexmo.com/sign-up) website to create an account for free. The platform allows you to have a free trial for $2, after which you will require to pay. 
2. Create your account by supplying your email address and a strong password. 
3. Under the phone number, provide a number for which we will test our application.
4. Since we will use Nodejs, select it as the programming language.
5. Click on SMS, then wait for your account to be set up.

You have successfully created a Vonage account; your dashboard should look like this.
![Vonage's Dashboard](/engineering-education/flutter-folder-organization/dashboard.png)

### Setting up out Node application

#### Init application
Setup up the node application by running the below command:
```bash
npm init
```
This command will create an empty package.json for our application. `package.json` holds the metadata about the project's dependencies, scripts, and version.

#### Install dependencies
Next, we will install the dependencies for our application. We will use `express` as our backend framework for Node, `EJS` as our template engine, `body-parser` to parse HTTP request body, `nexmo API` for sending the message, and `socket.io` to request a delivery report for our messages. To install the dependencies and save them to our package.json, run the below command in your terminal.
```bash
npm install –save express, nexmo, eggs, body-parser, socket.io, fetch
```
#### Nodemon
We will need `nodemon` to continuously watch our application as we develop.  I prefer installing nodemon globally. To install nodemon, run the following command.
```bash
npm install -g nodemon
```
We are all set. Now let us get to the code!
### Implementation
First we need to create out applications entry point file. I will name this as `app.js`. This file will contain out driver code. You can set app’s entry point using the init command or manually set up within the package.json file. In out app.js, we will import our dependencies as shown below:
```js
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const fetch = require("node-fetch");
```

Next, we initialize our application with express and set up our templating engine, EJS.  The EJS allows us to use `.html` extensions for our views. We will add the below code to our  `app.js`:
```js
const app = express()
//Setting up the body parser middleware and ejs template engine
app.set('view-engine', 'html');
app.engine('html', ejs.renderFile);

//public folder setup
app.use(express.static(__dirname + '/public'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

```

Specifying our index route as our app will only have a single page `index.html`.
```js
//index route
app.get('/', (request, response) =>{
    response.render('index.html');
});
```
### Creating our view
We will create a folder called `views` where we will store our view files. Under the folder, we create an `index.html` file where we will have the input fields for holding the phone number and message to be sent. Here is how the `index.html` will look like:
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
![Our application before sending the message](/engineering-education/flutter-folder-organization/text-before-sending.png)

### Client-side javascript driver code
We will create a public folder in the root of our application. In the pulic folder, we will create a `main.js` folder to contain the javascript code for fetching the variables used to trigger the send-SMS functionality.
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
since we have grabbed our send button from the html form, we need to add an even listener to the button to trigger the send message function. The send fucntionality code is as shown  below:
```js
button.addEventListener('click', send, false);
function send() {
    // getting value form the variabled  fetched
    const number = phoneNumber.value.replace(/\D/g, '');// elim inate non numeric characters from out number
    const text = textMessage.value;
    
    // Making post request with the data from our server
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
