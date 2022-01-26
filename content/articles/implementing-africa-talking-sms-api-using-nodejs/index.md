---
layout: engineering-education
status: publish
published: true
url: /implementing-africa-talking-sms-api-using-nodejs/
title: Implementing Africa's Talking SMS API using Node.js
description: This article will guide the reader on how to incorporate Africa Talking API in a RESTful API. This framework allows one to send and receive SMSes.
author: kennedy-mwangi
date: 2022-01-26T01:00:00-10:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-africa-talking-sms-api-using-nodejs/hero.jpg
    alt: Implementing Africa's talking SMS API using Node.js Hero Image
---
In this article, we will implement Africas Talking SMS API on a RESTful API using TypeScript and Node.js.
<!--more-->
Africa's Talking SMS API is an infrastructure provided by [Africa's Talking](https://africastalking.com/) to enable software platforms to communicate with their users through SMS.

By the end of this article, we will have created a RESTful API that sends a message, receives incoming messages, and shows a delivery report for a delivered message.

### Prerequisites
To follow along with this tutorial, you need:
- Some basic knowledge of TypeScript.
- [Node.js](https://nodejs.org/en/) installed on your computer.

### Table of contents
- [Setting up an account](#setting-up-an-account)
- [Setting up the Node.js application](#setting-up-the-nodejs-application)
- [Sending an SMS](#sending-an-sms)
- [Receiving an SMS](#receiving-an-sms)
- [Receiving delivery reports](#receiving-delivery-reports)
- [Conclusion](#conclusion)

### Setting up an account
If you already have an account with Africa's Talking login from [here](https://account.africastalking.com/auth/login). On the redirected [page](https://account.africastalking.com/), click on [Go to sandbox app](https://account.africastalking.com/apps/sandbox)

If you don't have an account, visit the registration page from [here](https://account.africastalking.com/auth/register), enter the required details and click *Register*.

Verify your email address by clicking on the link sent to your email address. On the redirected dashboard [page](https://account.africastalking.com/), click on [Go to sandbox app](https://account.africastalking.com/apps/sandbox).

### Setting up the Node.js application
We will use the following third-party packages:
- [ngrok](https://www.npmjs.com/package/ngrok): For exposing our local development server to Africa's Talking SMS API.
- [express](https://www.npmjs.com/package/express): For setting up the RESTful architecture using Node.js. Express is preferred due to its simplicity and efficiency.
- [africastalking-ts](https://www.npmjs.com/package/africastalking-ts): For consuming Africa's Talking SMS API with TypeScript support.

Proceed to your desired project location and run the following command to initialize your node project with default configurations:

```bash
npm init -y
```

Install the above packages by running the following command:

```bash
npm i ngrok express africastalking-ts
```

To enable TypeScript support on our project, install the following `dev` dependencies:

```bash
npm i --save-dev @types/express @types/node ts-node typescript
```

In *package.json*, under *scripts*, add the following:

```js
"start":"ts-node ./src/index.ts", // For starting the development server
"ngrok":"ngrok http 3000" // For starting the ngrok server
```

Create an *src* directory inside the project folder, as demonstrated below:

```bash
mkdir src
```

Proceed to the *src* directory, and create an *index.ts* file:

```bash
touch index.ts
```

### Sending an SMS
In the *src/index.ts* file:

Import *express* with the corresponding types: *Application*, *Request*, and *Response*:

```ts
import express,{Application,Request,Response} from 'express';
```

Next, import *Client* from the *africastalking* package:

```ts
import {Client}  from 'africastalking-ts';
```

Then initialize a *Client* using your *apiKey* and *username*:

```ts
const africasTalking = new Client({
    apiKey:"your_api_key",
    username:"sandbox"
});
```

To get your API key:

Navigate to your [Sandbox's page](https://account.africastalking.com/apps/sandbox), on the left menu, click on *Settings* and then *API Key*.

Enter your password and then click *Generate*. Copy the generated *API Key* and paste it into the above code.

Since we will be in a *sandbox* environment, our username will be *sandbox*. We can now initialize the *express* application:

```ts
const app:Application = express();
```

We also need to parse incoming requests with JSON payloads, as shown below:

```ts
app.use(express.json());
```

We use the following code to parse incoming requests with URL encoded payloads:

```ts
app.use(express.urlencoded({extended:true}));
```

Next, set up a `get` route to send a message:

```ts
app.get('/send-a-message', (req:Request, res:Response) => {
    try{
        await africasTalking.sendSms({
            to:["your-phone-number-with-currency-code"], // Your phone number
            message:"Hello there, We are on sandbox", // Your message
            from:"your-shortcode-or-alphanumeric" // Your shortcode or alphanumeric
        });
        return res.status(200).json({message:"Well done message sent"}); // Success message
    }catch(error){
        return res.status(500).json({message:"An error occurred"}); // Error message
    }
})
```

In the above code, we are calling the *sendSMS* function from *africasTalking* client on a *try/catch* block since it's *promise-based*.

Inside the *sendSMS* function, we are sending the following parameters:
- *to*: The Recipient's mobile phone number. Ensure you include your country code.
- *message*: Short message you wish to deliver.
- *shortcode/alphanumeric*: A shortcode is meant for sending and receiving messages whereas an alphanumeric is meant for only sending messages. To generate a shortcode:

Navigate to your [sandbox app](https://account.africastalking.com/apps/sandbox). On the left pane, Click on *SMS*.

Next, press on the *Shortcodes* button, and then [*Create shortcode*](https://account.africastalking.com/apps/sandbox/sms/shortcodes/create).

Enter your preferred *Shortcode* ranging from `4` to `5` digits and submit it. Once accepted, copy the `shortcode` and paste it into the above configuration.

In case you wish to create an alphanumeric, follow the same steps as in the prior step using the `shortcode`.

Click on *Alphanumerics* and then on [*Create alphanumeric*](https://account.africastalking.com/apps/sandbox/sms/alphanumerics/create).

Enter any preferred alphanumeric and then click *Submit*. Once successfully created, it should be listed in the table.

Start the application and listen on port *3000*:

```ts
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
```

Run the following command to start the development server:

```bash
npm run start
```

To view the message sent, we must launch the simulator. Navigate back to your [sandbox page](https://account.africastalking.com/apps/sandbox) and on the left pane, click on *Launch Simulator*.

In the proceeding popup, enter your phone number and then click *Launch*. You will receive a phone simulator with the following interface:

![Simulator-interface](/engineering-education/implementing-africa-talking-sms-api-using-nodejs/simulator-interface.png)

From your browser, visit *http://localhost:3000/send-a-message*. If everything is okay, you will receive the following:

![message-sent-response](/engineering-education/implementing-africa-talking-sms-api-using-nodejs/message-sent-response.png)

You will also see a new message in the simulator:

![simulator-new-message](/engineering-education/implementing-africa-talking-sms-api-using-nodejs/simulator-new-message.png)

If you got an error, please revisit the above steps.

### Receiving an SMS
We first need to add a route to listen to incoming messages:

```ts
app.post('/incoming-messages', (req:Request,res:Response) => {
    const data = req.body;
    console.log(`Received message \n`,data);
    res.sendStatus(200);
});
```

In the above code, we have set a *POST* route. In it, we are simply logging the received message and sending a `successful` status.

The route must be a *POST* route for the API server to reach it successfully. Restart the development server by pressing *CTRL+C* and then executing the following command:

```bash
npm run dev
```

Next, open a separate tab on your terminal and start *ngrok* using the below command:

```bash
npm run ngrok
```

To receive an SMS, we will need to add a *callback*. The *callback* will be our exposed server by `ngrok`.

Copy the *HTTPS URL* that is logged when you started ngrok e.g *https://e9ab-102-222-146-62.ngrok.io*

From your [Sandbox page](https://account.africastalking.com/apps/sandbox), on the left pane, click on *SMS*.

In the resulting dropdown, click on *SMS Callback URLs*, and then click *Incoming Messages*.

In the resulting form, paste in your `callback url` and then append */incoming-messages* to target the route, and then click *Submit*.

To receive the incoming message, we will have to send a test message. You must also ensure that you are using a shortcode while sending a message because it enables you to send and receive the message. You won't receive the message when using alphanumeric.

Ensure that you have launched your simulator.

Click on the *SMS* tab on the simulator. In the resulting screen, click on the floating action button and then select *New message*.

Enter your shortcode on the *To* input, and then your *Message* below, and then hit *Send*. In your console, you should receive data with a similar format as shown below:

```js
{
  linkId: 'specific-link-id',
  text: 'your-message',
  to: 'your-shortcode',
  id: 'specific message id',
  date: 'date sent',
  from: 'your-phone-number'
}
```

In a production application, you can configure the server to notify you in case of a new message.

### Receiving delivery reports
Delivery reports are yielded every time you send an SMS and it successfully reaches its recipient.

We will start by adding a route to listen for delivery reports:

```ts
app.post('/delivery-reports',(req:Request,res:Response) => {
    const data = req.body;
    console.log(`Received delivery report `,data);
    res.sendStatus(200);
});
```

In the above code, we are getting the data sent from the API and logging it to the console.

Restart your development server by pressing *CTRL+C* and then running the command below:

```bash
npm run dev
```

Copy the *HTTPS* URL you used in the previous step and proceed to your [Sandbox page](https://account.africastalking.com/apps/sandbox). On the left pane, click on *SMS*, *SMS Callback URLs*, and then *Delivery Reports*.

In the next form, paste the *HTTPS* link and append */delivery-reports*. Then click *Submit*.

Ensure you have launched the simulator.

To get a delivery report, we will have to send an SMS. In your browser, navigate to *http://localhost:3000/send-a-message*.

Once you have sent the message successfully, you will receive the following response which will be logged on your console:

```js
{
  phoneNumber: 'your-phone-number',
  retryCount: '0',
  id: 'unique-id',
  status: 'Success',
  networkCode: 'random-number'
}
```

In a production application, you can generate a report once every message is marked as delivered.

### Conclusion
In this article, we have implemented the SMS API from Africa's Talking using the following use-cases:

- [Sending a message](#sending-a-message)
- [Receiving incoming message](#receiving-incoming-message)
- [Getting delivery reports](#getting-delivery-report)

Feel free to access the entire code from this [GitHub repository](https://github.com/mwangiKibui/africastalking-sms-api-nodejs-ts).


### Further reading
- [Ngrok](https://ngrok.com/docs)
- [Express JS Rest API With TypeScript](/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/)
- [Africa's Talking SMS API](https://developers.africastalking.com/tutorials?products=sms)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
