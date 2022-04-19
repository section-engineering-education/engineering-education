---
layout: engineering-education
status: publish
published: true
url: /time-scheduled-communication-microservice/
title: Building a Time Scheduled Communication Micro-service
description: This article will guide the reader on how to build a Node.js application, configure Twilio on that application and have it automatically sends messages at a predefined time interval.
author: kennedy-mwangi
date: 2022-04-19T00:00:00-17:33
topics: [Node.js, Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/time-scheduled-communication-microservice/hero.jpg
  alt: Time Scheduled Communication Micro-service Node.js Hero Image
---
In this article, we will build a Node.js application that automatically sends messages to users at a specified time interval.
<!--more-->
### Prerequisites
To follow along with this article, you need:

- [Node.js](https://nodejs.org/en/) installed on your computer.
- Some basic knowledge of working with JavaScript.
- A [Twilio](https://www.twilio.com) developer account.

### Table of contents
- [Setting up the application](#setting-up-the-node.js-application)
- [Configuring Twilio on the application](#configuring-twilio-on-the-application)
- [Sending a message using Twilio API](#sending-a-message-using-twilio-api)
- [Automating process flow using node-cron](#automating-process-flow-using-node-cron)
- [Conclusion]

### Setting up the application
To get started, proceed to your preferred working directory and then initialize the project with the following command:

```bash
npm init -y
```

The command above will create a *package.json* file on the project directory with all the default configurations.

In this project, we will need the following dependencies:
- *dotenv*: For loading environmental variables.
- *node-cron*: For running our program on a timely basis.
- *twilio*: For sending messages.
- *nodemon*: For automatically restarting the development server.

Install the dependencies by running the following command:

```bash
npm i --save dotenv node-cron twilio
npm i --save-dev nodemon
```

In the *package.json* file, modify the *scripts* object to include the following properties:

```js
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
}
```

Next, create an *index.js* file on the root project directory. This file will host all the functionalities that we will implement in the subsequent steps.

### Configuring Twilio on the application
To send a message via Twilio API, you need to have your account_sid, auth_token, and Twilio phone number. 

In the project folder, create a *.env* file. The file will host our Twilio credentials or properties.

On the file, add the details below:

```js
TWILIO_ACCOUNT_SID = "your_twilio_account_sid"
TWILIO_AUTH_TOKEN = "your_twilio_auth_token"
TWILIO_PHONE_NUMBER = "your_twilio_phone_no"
```

To access the above credentials, navigate to your [Twilio dashboard](https://console.twilio.com/), under *Project Info*, copy the value of *ACCOUNT SID* and paste it on the file.

Do the same thing for *AUTH TOKEN* and *PHONE NUMBER*.

Once you have the credentials set, we are ready for the next step.

### Sending a message using Twilio
On the *index.js* file:

Import the necessary modules, as shown below:

```js
const twilio = require('twilio');
const dotenv = require('dotenv');
```

Next, load the environmental variables by initializing the *config()* method from *dotenv*:

```js
dotenv.config();
```

Then create a function to send a message:

```js
async function send_message(message){

    // Get the variables
    let accountSid = process.env.TWILIO_ACCOUNT_SID;
    let authToken = process.env.TWILIO_AUTH_TOKEN;
    let senderPhone = process.env.TWILIO_PHONE_NUMBER;

    // Initialize the twilio client
    const client = new twilio(accountSid, authToken);

    // Send a message
    let response = await client.messages.create({
        body: message,
        from: senderPhone,
        to: 'your_phone_number'
    });

    console.log(response);
}
```

In the above function, we are:
- Retrieving our environmental variables.
- Initializing the Twilio client.
- Sending a message using the Twilio client.

On a trial account, the phone number you put in must be verified by Twilio. You can access your verified phone number list from [here](https://console.twilio.com/us1/develop/phone-numbers/manage/verified). 

In case you want to send to a different number than the ones on the list, ensure you add it by clicking the *Add new caller ID* button on the top right.

In case you want to send to more than one party, use an array and separate the phone numbers with a comma as follows:

```js
['phone_number_1','phone_number_2']
```

Below the `send_message` function, add the following code to send a hello message:

```js
send_message("Hello there");
```

We can now run our application using the command below:

```bash
npm run dev
```

Once the function runs, you should receive a *hello there* message on the phone number that you set.

In the next step, we will automate the process (sending messages) on a timely basis.

### Automating process flow using node-cron
Automating the process flow on a timely basis involves sending a message after a specific period. For example: after every hour, minute, second, or even day.

We will implement this functionality using the following steps:

Import the *node_cron* module:

```js
const node_cron = require('node-cron');
```

Write a scheduler to call the function after every five minutes:

```js
node_cron.schedule('*/5 * * * *', () => {
    // Run the function after every five minutes.
    console.log("Running after every five minutes");
    send_message('Hello There!'); 
});
```

Ensure that the `send_message('Hello there!')` function is still running. If it is not, you will need to call the method as demonstrated in the previous step.

You should now receive a *Hello There!* message every five minutes.

### Conclusion
In this article we implemented a time-scheduled micro-service for sending messages. 

You can find this project's code from this [GitHub repository](https://github.com/mwangiKibui/sms_microservice).

### Further reading
- [Twilio message API](https://www.twilio.com/docs/sms/api)
- [node-cron package](https://www.npmjs.com/package/node-cron)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
