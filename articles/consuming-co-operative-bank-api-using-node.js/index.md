---
layout: engineering-education
status: publish
published: true
url: /engineering-education/consuming-co-operative-bank-api-using-node.js/
title: How to consume a Co-operative Bank API using Node.js
description: This article will show you how to consume a Co-operative Bank API using Node.js.
author: kennedy-mwangi
date: 2021-02-05T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/consuming-co-operative-bank-api-using-node.js/hero.jpg
    alt: Consuming Co-operative Bank API
---
Co-operative bank is a financial service institution operating in the East African Community. As of December 2018, it had recorded over 7.8 million users. 
<!--more-->
Co-operative bank API(Application Programming Interface) is a simple REST(Representational State Transfer) based API that enables software developers to handle various financial operations provided by the bank from their applications.

### Goals
In this article, we will consume the Co-operative bank API. We will implement the following operations using a Node.js REST API:
- Getting an access token.
- Sending funds to Mpesa.
- Accessing your account's mini statement.
- Accessing your account's full statement.
- Accessing your account balance.
- Validating your account.

### Prerequisites
To follow along in this article, you need the following:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- [Postman](https://www.postman.com/) installed on your computer.
- A code editor such as Visual Studio Code installed on your computer.
- Basic knowledge of JavaScript.
- Basic knowledge of developing restful APIs using [Express.js](https://expressjs.com/).

### Overview
- [Creating a developer account](#creating-a-developer-account)
- [Creating an application](#creating-an-application)
- [Setting up the development server](#setting-up-the-development-server)
- [Getting an access token](#getting-an-access-token)
- [Sending funds to Mpesa](#sending-funds-to-mpesa)
- [Accessing account mini-statement](#accessing-account-mini-statement)
- [Accessing account full-statement](#accessing-account-full-statement)
- [Accessing account balance](#accessing-account-balance)
- [Validating an account](#validating-an-account)

### Creating a developer account
To create a co-operative bank developer account, follow the following steps:

- Proceed to the [developer page](https://developer.co-opbank.co.ke:9443/store/apis/home).

- On the top right, click [Sign-up](https://developer.co-opbank.co.ke:9443/store/site/pages/sign-up.jag).

- Fill in all the required information on the form and then click `Sign Up`.

- You will be redirected to the login page, on this one, enter your credentials and click `Sign in`.

- After successfully signing in, you will be directed to the [dashboard page](https://developer.co-opbank.co.ke:9443/store/).

### Creating an application
Once you are on the dashboard page, you need to create an application. You will be subscribing to this application for all functionalities that you will be consuming.

To create an application, follow the following steps:

- On the left menu, click [applications](https://developer.co-opbank.co.ke:9443/store/site/pages/applications.jag).

- On the new page, click [add application](https://developer.co-opbank.co.ke:9443/store/site/pages/application-add.jag).

- Enter your preferred name of the application, select `unlimited` for the `Per Token Quota`, briefly describe your application, for `Token Type` choose `OAuth`, and then click `Add`.

- Having added the application successfully, you will be directed to the application page.

### Setting up the development server
To set up the development server, clone this [Github repository](https://github.com/mwangiKibui/co-op-bank-node.js-rest-api).

The development server is fully set up and our role throughout the article is to implement the functionalities.

To install the dependencies needed, open the project from the terminal of your text editor and run the following command:

```bash
npm install
```

The following are the installed dependencies:

- [axios](https://www.npmjs.com/package/axios): For sending requests to the co-operative bank API.

- [dotenv](https://www.npmjs.com/package/dotenv): For loading the environmental variables.

- [express](https://www.npmjs.com/package/express): For setting up the routes and the controllers in the application.

- [ngrok](https://www.npmjs.com/package/ngrok): For exposing our localhost server.

- [nodemon](https://www.npmjs.com/package/nodemon): For listening to changes and restarting the server.

- [unique-string](https://www.npmjs.com/package/unique-string): For generating random strings.

The next step is to get our `CONSUMER KEY ` and `CONSUMER SECRET`. To get them, follow the following steps:

- On the application page from the previous step, click the `Sandbox Keys` tab.

- On the tab, click `Generate keys`. This will generate both the `Consumer Key` and the `Consumer Secret`.

- Copy them and paste them appropriately in the `.env` file at the root of your project folder.

- Having done that, we are set to implement the operations. We will be working from the `src/controllers/Coop.js` file.

### Getting an access token
An access token forms the basis of authentication while using the API. For every operation we carry out on the API we must send an access token.

We will therefore implement it as a middleware meaning that we won't be returning anything but calling the next function on the line. Express.js supports this.

Modify the `getAccessToken` method as follows:

```javascript
async getAccessToken(req,res,next){

// compose a buffer based on consumer key and consumer secret
let buff = new Buffer.from(
  `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
);

// encode the buffer to a base64 string
let buff_data = buff.toString("base64");

// send the request to the api.
let response = await axios
  .default({

    //ignore ssl validation
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    method: "POST", // request method.
    url:"https://developer.co-opbank.co.ke:8243/token", // request url
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // request content type
      Authorization: `Basic ${buff_data}`, // request auth string.
    },
    data: this.data, // request data
  })
  .catch(console.log);

// set the access token to the request object.
req.access_token = response.data.access_token;

//call the next function.
return next();

};
```

Since it will be treated as a middleware, there is no need to implement its respective route.

### Sending funds to Mpesa
From your co-operative bank account, you can be able to send funds directly to [Mpesa](https://www.safaricom.co.ke/personal/m-pesa). The process is entirely simulation since we are in a sandbox environment but the concept is the same in production.

Follow the following steps to implement the functionality:

- From your [dashboard page](https://developer.co-opbank.co.ke:9443/store/), click on [sendToMpesa listing](https://developer.co-opbank.co.ke:9443/store/apis/info?name=SendToM-Pesa&version=1.0.0&provider=admin).

- On the right side of the new page, under `Applications`, select your application, and then click `Subscribe`.

- Modify `sendToMpesa()` method as follows:

```javascript
async sendToMpesa(req,res,next){

// obtain our access token from the request object
let access_token = req.access_token;

// compose the authentication string
let auth = `Bearer ${access_token}`;

// ngrok url: TODO
let cbUrl = "";

// compose the reference no and message ref.
let refNo = uniqueString().slice(0,14);
let msgRef = uniqueString().slice(0,14);

// send the request to the api
let response = await axios.default({

    // ignore ssl validation
    httpsAgent:new https.Agent({
        rejectUnauthorized:false
    }),
    method:'POST', // request method.
    url:"https://developer.co-opbank.co.ke:8243/FundsTransfer/External/A2M/Mpesa/1.0.0/", // request URL
    data:{
        "CallBackUrl": `${cbUrl}/callback`, // callback url
        "Destinations": [
            {
            "MobileNumber": "254791569999", // any mpesa mobile no.
            "Narration": "Supplier Payment", // transaction narration
            "ReferenceNumber": refNo, // the generated refNo
            "Amount": "50" // amount to send.
            }
        ],
        "MessageReference": msgRef, // generated msgRef
        "Source": {
            "Narration": "Supplier Payment", // transaction narration
            "Amount": "50", // amount to send
            "TransactionCurrency": "KES", // currency
            "AccountNumber": "36001873000" // sandbox account no.
        }
    },
    headers:{
        'Authorization':auth // request auth string
    }
}).catch(console.log);


return res.send({
    message:response.data // response
});

};
```

For the above functionality to work, we have to do the following:

- Make sure that for the account number you are using the sandbox account number. Else, it will result in an error.

- From your text editor, open your terminal and run the following command to start the development server:

```bash
npm run dev
```

- Install [ngrok](https://dashboard.ngrok.com/get-started/setup) on your computer if you don't have it yet.

- After successfully installing `ngrok`, open a separate tab on the terminal of your text editor and run the following command to start it:

```bash
npm run ngrok
```

- Copy the HTTPS URL logged and set it as the value for `cbUrl` variable.

- Modify the `callback` method as follows:

```javascript
async callback(req,res,next){

console.log("...request...");

console.log(req.body);

};
```

- Open postman and send a `POST` request to: `http://localhost:4000/send-to-mpesa`. In case you encounter an error, revisit the steps, else your response should resemble the following:

![send-to-mpesa-postman-response](/engineering-education/consuming-co-operative-bank-api-using-node.js/send-to-mpesa-postman-response.png)

- The following should resemble the information logged on your terminal from the callback:

![send-to-mpesa-console-response](/engineering-education/consuming-co-operative-bank-api-using-node.js/send-to-mpesa-console-response.png)

### Accessing account mini-statement
An account mini-statement is used in retrieving at least five previous transactions that were carried out from your bank account.

The co-operative bank API supports this functionality.

To implement it, follow the following steps:

- On your [dashboard page](https://developer.co-opbank.co.ke:9443/store/), click on [AccountMiniStatement listing](https://developer.co-opbank.co.ke:9443/store/apis/info?name=AccountMiniStatement&version=1.0.0&provider=admin).

- On the right side, under `Applications`, select your application, and then click `Subscribe`.

- Modify the `accountMinistatement` method as follows:

```javascript
async accountMinistatement(req,res,next){

// url to send request to
let url = "https://developer.co-opbank.co.ke:8243/Enquiry/MiniStatement/Account/1.0.0/";

//get the access token from the request object and compose the auth string.
let access_token = req.access_token;
let auth = `Bearer ${access_token}`;

// compose the messageReference
let msgRef = uniqueString().slice(0,14);

//send a request to the server.
let response = await axios.default({

    //ignore ssl certificate
    httpsAgent:new https.Agent({
        rejectUnauthorized:false
    }),
    url, // url to send request to.
    method:'POST',// request method.
    data:{
        "MessageReference": `${msgRef}`, // randomly composed string
        "AccountNumber": "36001873000" // sandbox account no
    },
    headers:{
        'Authorization':auth // authentication string
    }
}).catch(console.log);

return res.send({
    message:response.data // response
});

};
```

To test this:

- Ensure that the development server is running from your terminal.

- Proceed to postman and send a `POST` request to: `http://localhost:4000/account-mini-statement`. The response should resemble the following:

![account-mini-statement-postman-response](/engineering-education/consuming-co-operative-bank-api-using-node.js/account-mini-statement-postman-response.png)

### Accessing account full-statement
A full-statement provides all transactions carried out between two different specified dates.

To implement it, follow the following steps:

- From your [dashboard page](https://developer.co-opbank.co.ke:9443/store/), click on [AccountFullStatement listing](https://developer.co-opbank.co.ke:9443/store/apis/info?name=AccountFullStatement&version=1.0.0&provider=admin).

- On the right side under `Applications`, select your application, and click `Subscribe`.

- Modify the `accountFullstatement()` method as follows:

```javascript
async accountFullstatement(req,res,next){

//obtain  the url
let url = "https://developer.co-opbank.co.ke:8243/Enquiry/FullStatement/Account/1.0.0/";

// get the access token from the request object and compose the auth string.
let access_token = req.access_token;
let auth = `Bearer ${access_token}`;

// generate the message ref.
let msgRef = uniqueString().slice(0,14);

// specify the start and end date.
let startDate = "2020-11-01";
let endDate = "2021-03-01";

// send a request.
let response = await axios.default({

    // ignore the ssl certificate
    httpsAgent:new https.Agent({
        rejectUnauthorized:false
    }),
    url, // url to send request to.
    method:'POST', // request method
    data:{
        "MessageReference":`${msgRef}`, // randomly generated string
        "AccountNumber":"36001873000", // sandbox account no
        "StartDate": startDate, // from when
        "EndDate": endDate // to when
    },
    headers:{
        'Authorization':auth // authentication string
    }
}).catch(console.log);

return res.send({
    message:response.data // response
});

};
```

To test this:

- Ensure that the development server is running.

- Head over to postman and send a `POST` request to: `http://localhost:4000/account-full-statement`. The response should resemble the following:

![account-full-statement-postman-response](/engineering-education/consuming-co-operative-bank-api-using-node.js/account-full-statement-postman-response.png)

### Accessing account balance
With the API, we can be able to access the account balance from our account.

To implement the feature, we follow the following steps:

- From your [dashboard page](https://developer.co-opbank.co.ke:9443/store/), click on [AccountBalance listing](https://developer.co-opbank.co.ke:9443/store/apis/info?name=AccountBalance&version=1.0.0&provider=admin).

- On the right side under `Applications`, select your application, and then click `Subscribe`.

- Modify the `accountBalance()` method as follows:

```javascript
async accountBalance(req,res,next){

// url to send request to.
let url = "https://developer.co-opbank.co.ke:8243/Enquiry/AccountBalance/1.0.0/";

// obtain the access token and compose the authentication string.
let access_token = req.access_token;
let auth = `Bearer ${access_token}`;

// compose the message reference
let msgRef = uniqueString().slice(0,14);

// send a request.
let response = await axios.default({

    //ignore ssl validation
    httpsAgent:new https.Agent({
        rejectUnauthorized:false
    }),
    method:'POST', // request method
    url, // url to send request to
    data:{
        "MessageReference":msgRef, // randomly generated string
        "AccountNumber":"36001873000" // sandbox account no
    },
    headers:{
        'Authorization':auth // authentication string
    }
}).catch(console.log);

return res.send({
    message:response.data // response
});

};
```

To test this:
- Make sure that you are using the `sandbox account number`. Else it will return an error.

- Ensure that the development server is running from your terminal.

- Head over to postman and send a `POST` request to: `http://localhost:4000/account-balance`. The response sent should resemble the following:

![account-balance-postman-response](/engineering-education/consuming-co-operative-bank-api-using-node.js/account-balance-postman-response.png)

### Validating an account
With the API, we can identify a valid co-operative bank account. Since we are in the sandbox environment, we are restricted to the default account number for testing. A different one is termed invalid.

To implement it, follow the following steps:

- From your [dashboard page](https://developer.co-opbank.co.ke:9443/store/) click on [AccountValidation listing](https://developer.co-opbank.co.ke:9443/store/apis/info?name=AccountValidation&version=1.0.0&provider=admin).

- On the right side under `Applications`, select your application, and then click `Subscribe`.

- Modify `accountValidation()` method to be as follows:

```javascript
async accountValidation(req,res,next){

// url to send request to
let url = "https://developer.co-opbank.co.ke:8243/Enquiry/Validation/Account/1.0.0/";

// obtain the access token and compose the authentication string.
let access_token = req.access_token;
let auth = `Bearer ${access_token}`;

// compose the message reference.
let msgRef = uniqueString().slice(0,14);

// send a request to the API
let response = await axios.default({

    //ignore ssl certificate.
    httpsAgent:new https.Agent({
        rejectUnauthorized:false
    }),
    url, // url to send request to
    method:'POST', // request method
    data:{
        "MessageReference": msgRef, // randomly generated string
        "AccountNumber": "36001873000" // default sandbox account no
    },
    headers:{
        'Authorization':auth // authentication string
    }
}).catch(console.log);

return res.send({
    message:response.data // response
});

};
```

To test this:

- Ensure that the development server is running from your terminal.

- Head over to postman and send a `POST` request to: `http://localhost:4000/account-validation`. The response sent should resemble the following:

![account-validation-postman-response](/engineering-education/consuming-co-operative-bank-api-using-node.js/account-validation-postman-response.png)

### Summary
In this article, we have implemented the following functionalities from the co-operative bank API on a Node.js restful API:

- [Generating an access token](#generating-an-access-token)
- [Sending funds to Mpesa](#sending-funds-to-Mpesa)
- [Accessing account mini-statement](#accessing-account-mini-statement)
- [Accessing account full-statement](#accessing-account-full-statement)
- [Accessing account balance](#accessing-account-balance)
- [Validating an account](#validating-an-account)

### Conclusion
Co-operative bank API ships various functionalities that previously required lengthy processes.

There are more functionalities provided by the API as shown in the following [listings](https://developer.co-opbank.co.ke:9443/store/).

In case of any query concerning co-operative bank API, or queries of how you can shift to a production environment, feel free to contact the [team](https://twitter.com/Coopbankenya).

You can reach out to me on [Twitter](https://twitter.com/itsmkibui).

Happy coding!!


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)