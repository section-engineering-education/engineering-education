---
layout: engineering-education
status: publish
published: true
url: /integrating-b2c-mpesa-api-using-node-js/
title: How to Integrate B2C M-Pesa API using Node.js
description: This article will guide you on how to integrate the B2C M-Pesa API in Node.js. The M-Pesa API allows merchants to send money to consumers. 
author: robert-wachira
date: 2021-05-06T00:00:00-08:00
topics: [Node.js, API]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/integrating-b2c-mpesa-api-using-node-js/hero.jpg
    alt: integrating-b2c-mpesa-api-using-node-js
---
M-Pesa can be described as a phone-based mobile banking service. Since its [inauguration](https://en.wikipedia.org/wiki/M-Pesa) in 2007 by Vodafone Group PLC and Safaricom in Kenya, it has expanded to eight more countries in Africa.
<!--more-->
An API (Application Programming Interface) is an intermediary between two software applications that enables them to communicate.

B2C (Business to Consumer) M-Pesa API enables software developers or merchants to send payments to their customers. You can read more about the M-Pesa API from [here](https://www.safaricom.co.ke/business/corporate/m-pesa-payment-services/m-pesa-api).

### Goals
In this article, we will integrate the B2C M-Pesa API in a Node.js RESTful API. We will consume the API using [Swagger](https://swagger.io/).

### Prerequisites
To follow along in this article, it is helpful to have the following:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Some basic knowledge on JavaScript.
- A text editor installed. Preferrably [VScode](https://code.visualstudio.com/)

### Overview
- [Setting up the development server](#setting-up-the-development-server)
- [Getting an access token](#getting-an-access-token)
- [B2C API](#b2c-api)

### Setting up the development server
This article assumes that you have a Safaricom developer account.

If you don't, go through these [steps](/lipa-na-mpesa-online/#creating-a-safaricom-developer-account) to create one.

Also, ensure that you have created at least one application from your developer portal. If you haven't, follow these [guidelines](/lipa-na-mpesa-online/#creating-an-app).

To get started, we will clone the starter project from [here](https://github.com/Roba-W/nodejs-b2c-mpesa-api-starterkit). With all the basic configurations done on the skeleton, our focus throughout the article will be on implementing the core functionalities.

We first need to install the following dependencies:
- [axios](https://www.npmjs.com/package/axios): For handling the requests to the M-Pesa API.
- [dotenv](https://www.npmjs.com/package/dotenv): For loading the environmental variables.
- [express](https://www.npmjs.com/package/express): For providing a faster, and easier way to set up a RESTful API.
- [ngrok](https://www.npmjs.com/package/ngrok): For exposing our localhost server.
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): For serving the API docs to the user interface.

To install these packages, open the starter project in your text editor. Next, launch the terminal in your text editor and run the following command:

```bash
npm install
```

Having installed the dependencies, we can move on to the next step.

> Note that we will be working from the `src/controllers/Mpesa.js` file.

### Getting an access token
All requests to the M-Pesa API must have an access token. It forms the basis for authentication.

To implement this functionality, we will edit the `getAccessToken()` method as follows:

```js
//get access token.
async getAccessToken(req,res,next){
    // get data from headers by destructuring
    let {consumerkey,consumersecret} = req.headers;
    // request url
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    // get a base64 encoded string from a buffer
    let buf = new Buffer.from(`${consumerkey}:${consumersecret}`).toString("base64");
    // authentication string
    let auth = `Basic ${buf}`;
    let response;

    try {

        // send a GET request to the URL
        response = await axios.default.get(url,{
            headers:{
                "Authorization":auth
            }
        });

    } catch (error) {

        // in case of an error, get the code and error message
        let err_code = error.response.status;
        let err_msg = error.response.statusText;

        // send response to client
        return res.status(err_code).send({
            message:err_msg
        });

    }

    // get the access token from server response
    let accessToken  = response.data.access_token;

    // set the status code.
    res.status(200);

    // send the access token to client
    return res.send({
        accessToken
    });
};
```

In the code snippet above, we are:
- Destructuring the `consumerkey` and `consumersecret` from the `headers`.
- Setting the `URL` to send the request.
- Generating a `base64` encoded string from a buffer.
- Composing the authentication string by appending `Basic` before the encoded string.
- Sending the request to M-Pesa API from a `try/catch` block. In case of an error, the error is sent to the client. Otherwise, if there is no error, the access token is sent to the client.

To test it:
- Start the development server by running the following command from the terminal of your text editor:

```bash
npm run dev
```

- In your browser, navigate to `http://localhost:4000/api-docs`.
- Click the `/access-token` section under `Mpesa B2C` tag.
- Click the `Try it out` button.
- To get your `consumer key` and `consumer secret`, visit your [applications page](https://developer.safaricom.co.ke/user/me/apps), select your application, from the `keys` section, then copy and paste them respectively into the section's parameters.
- Click the `Execute` button.
- In case of an error, revisit the steps. Otherwise your server response should resemble the following:

![access_token_response_screenshot](/engineering-education/integrating-b2c-mpesa-api-using-node-js/access-token-response-screenshot.png)

*A screenshot of getting access token server response.*

### B2C API
We can use the access token to access the B2C API.

To do that, we need to modify the `b2c()` method as follows:

```js
//b2c.
async b2c(req,res,next){
// destructure from headers
let {accesstoken,initiatorname,securitycredential,commandid,amount,partya,partyb,remarks}= req.headers;
// url to send request to.
let url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";
// url to expose our local server
let ngrok_url = process.env.NGROK_URL;
// authentication string
let auth = `Bearer ${accesstoken}`;
let response;

try{

    // send the request
    response = await axios.default.post(url,{
    "InitiatorName": initiatorname,
    "SecurityCredential":securitycredential,
    "CommandID": commandid,
    "Amount": amount,
    "PartyA": partya,
    "PartyB": partyb,
    "Remarks": remarks,
    "QueueTimeOutURL": `${ngrok_url}/timeout`,
    "ResultURL": `${ngrok_url}/cb`,
    "Occasion": remarks
    },{
        headers:{
            "Authorization":auth
        }
    })

}catch(error) {

    // in case of an error, get the code and the message.
    let err_code = error.response.status;
    let err_msg = error.response.data.errorMessage;

    // send to the client
    return res.status(err_code).send({
        message:err_msg
    });
}

// set the status code
res.status(200);

// send to the client
return res.send({
    result:response.data
});
};
```

In the above code snippet, we are:
- Destructuring the data sent from the `headers`.
- Setting the URL to send the request to.
- Setting the `ngrok URL`. To get it, ensure that you have [ngrok](https://ngrok.com/) installed. Then open another tab in the terminal of your text editor and run the `npm run ngrok` command. Then, copy the `HTTPS URL` logged in your terminal and paste it appropriately in the `.env` file on the root of your project folder.

- Setting the authentication token by appending `Bearer` before the access token.
- Sending the request from a `try/catch` block. In case of an error, we are getting the status code and the error message and sending them to the client. If no error, we are setting the status code to `200` and sending the response from the request to the client.

To test it:

- We first need to implement the `timeout` URL and the `result` URL. To do that we will edit the `timeout()` and `cb()` methods as follows:

```js
//time-out.
async timeOut(req,res,next){
    console.log("--- request timeout ----");
    console.dir(req.body);
    console.log("--- end of request timeout ---");
};

//callback.
async cb(req,res,next){
    console.log("--- callback request ----");
    let response = req.body.Result;

    if(response.ResultParameters) {
        response.ResultParameters = response.ResultParameters.ResultParameter;
    }

    if(response.ReferenceData) {
        response.ReferenceData = response.ReferenceData.ReferenceItem;
    };

    console.log(response)
    console.log("--- end of callback request ---");
};
```

- Ensure that your development server is running.
- In your browser, navigate to `http://localhost:4000/api-docs` page, and then proceed to the `/b2c` section.
- Click the `Try it out` button.
- Fill in the parameters as follows:
  - For `AccessToken`, Repeat the previous process and copy and paste the access token generated.
  - For `InitiatorName`, copy and paste the `Initiator Name` from your [test credentials page](https://developer.safaricom.co.ke/test_credentials).
  - For `SecurityCredential`, copy the `Security Credential` from the [test credentials page](https://developer.safaricom.co.ke/test_credentials) and paste it in the `Initiator Security Password` input below and click `Generate Credentials`. Copy and paste the long generated text.
  - For `CommandID`, select any from the dropdown.
  - For `Amount`, enter any amount.
  - For `PartyA`, copy and paste the `Shortcode 1` from [test credentials page](https://developer.safaricom.co.ke/test_credentials).
  - For `PartyB`, copy and paste the `Test MSISDN` from [test credentials page](https://developer.safaricom.co.ke/test_credentials).
  - For `Remarks`, enter any text. Keep it short.
- Click the `Execute` button.
- In case of any error, revisit the steps above. Otherwise the following output should resemble your server response.

![b2c_server_response_screenshot](/engineering-education/integrating-b2c-mpesa-api-using-node-js/b2c-server-response-screenshot.png)

*A screenshot of b2c server response.*

The information logged on your console should mimic the following:

![b2c_console_response_screenshot](/engineering-education/integrating-b2c-mpesa-api-using-node-js/b2c-console-response-screenshot.png)

*A screenshot of b2c console response*

### Conclusion
In today's competitive business environment, business processes should be automated to lower costs. The M-Pesa B2C API offers an infrastructure to automate payments from merchants to customers.

To expand your knowledge on the covered topics, check out the following resources:
- [M-Pesa B2C](https://www.safaricom.co.ke/faqs/faq/606)
- [M-Pesa API docs](https://developer.safaricom.co.ke/docs#m-pesa-apis)
- [API documentation using swagger](https://medium.com/wolox/documenting-a-nodejs-rest-api-with-openapi-3-swagger-5deee9f50420)

Happy coding!!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
