---
layout: engineering-education
status: publish
published: true
url: /engineering-education/lipa-na-mpesa-online/
title: Implementing Lipa na Mpesa Online using Node.js
description: In this article, we will cover an introduction to Mpesa, we will create a Safaricom developer account, an application, get an OAuth token, and implement Lipa na Mpesa online.
author: kennedy-mwangi
date: 2021-01-07T00:00:00-14:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/lipa-na-mpesa-online/hero.jpg
    alt: Lipa na Mpesa Online image example
---
Mpesa is a mobile money payment service by Safaricom based in Kenya. It was released in 2007 and since then it has become the common means of payment in Kenya. To help developers implement Mpesa in their platforms, Safaricom released the Daraja API. 
<!--more-->
### Introduction to Mpesa
It is a REST-based API that shifts the functionalities of Mpesa to system developers. `Lipa na Mpesa online` is one of the functionalities provided by the Daraja API. It is a service used to initiate Mpesa transactions on behalf of the customer using `STK-PUSH`. This means that the user is only required to enter the PIN. It is applied in e-commerce and bill payment systems among others.

### Prerequisites
- Have a Kenyan based Safaricom phone number.
- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Have some basic knowledge of JavaScript and [Express JS](#https://expressjs.com/).
- Have [Postman](https://www.postman.com/) installed on your computer.

### What will we cover
- [Introduction to Mpesa](#introduction-to-mpesa)
- [Creating a Safaricom developer account](#creating-a-safaricom-developer-account)
- [Creating-an-app](#creating-an-app)
- [Getting an Oauth token](#getting-an-oauth-token)
- [Lipa na Mpesa online](#lipa-na-mpesa-online)

### Creating a Safaricom developer account
Safaricom controls all the operations concerning Mpesa and Daraja API. For you to access Daraja API, you need to have a developer account. The following steps explain how you can create a developer account. Feel free to skip if you already have one.

- Step 1: The first step is to proceed to [Safaricom Developer website](https://developer.safaricom.co.ke/home).
- Step 2: Click on the signup button on the center or visit directly from [here](https://developer.safaricom.co.ke/login-register). Proceed to the signup section.
- Step 3: After registering, a welcome message with further instructions is sent to your email address. In the email, you shall find a confirmation link, click on it and it shall direct you to a password entry page.
- Step 4: Enter your password and confirm it and then click login. On the page that follows, you shall view the credentials that you have entered. If you want to edit the credentials, make sure you do the changes and hit save. Otherwise, you are all set.

### Creating an app
To be able to use the Daraja API, you need to have an app so that you have the required access keys. Creating an app is a very simple process. 

Follow the following steps:
- Step 1: Click on the `My Apps` link on the navbar in the developer portal.
- Step 2: On that page, click the `Add a new app` button.
- Step 3: On the page that follows, enter your preferred app name. Check the `Lipa na Mpesa Sandbox` and then click `create app`. After that, you are all set.

#### Configuring our application
Having set up the developer account and an app, it's time we set up our application. For this article, we shall implement a REST API with Express.js framework. Our end goal is to implement a working endpoint for Lipa na Mpesa online. To handle communication to and from the Daraja API we shall use [Axios](https://www.npmjs.com/package/axios). 

To follow along effectively, clone the finalized project from [here](https://github.com/mwangiKibui/starter-kit-lipa-na-mpesa-online). To test our API, we will use [Postman](https://postman.com). If you are not experienced in postman, feel free to watch this [video](https://www.youtube.com/watch?v=t5n07Ybz7yI).

### Obtaining consumer key and consumer secret
On the portal's apps page, click on the newly created app from the previous process. In the keys section, copy the consumer key and the consumer secret and paste them in your `.env` file respectively as shown:

```javascript
//in the .env file
consumer_key = "your consumer key"
consumer_secret = "your consumer secret"
```

After you have saved the consumer key and the consumer secret, you are set to proceed to the next step of getting an OAuth token. 

### Getting an OAuth token
To make every call to the Daraja API, we need to always supply an OAuth token. For this reason, we shall implement it as middleware to be called every time we are accessing an endpoint. 

The function shall be as follows:

```javascript
 async getOAuthToken(req,res,next){

        let consumer_key = process.env.consumer_key;
        let consumer_secret = process.env.consumer_secret;

        let url = process.env.oauth_token_url;

        //form a buffer of the consumer key and secret
        let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

        let auth = `Basic ${buffer.toString('base64')}`;

        try{

            let {data} = await axios.get(url,{
                "headers":{
                    "Authorization":auth
                }
            });

            req.token = data['access_token'];

            return next();

        }catch(err){

            return res.send({
                success:false,
                message:err['response']['statusText']
            });

        }
        
};
```

- Receiving `req`,`res`,`next` as parameters: Since the function will be called as middleware, we need to pass the appropriate parameters. `req` has access to the request object whereas `res` has access to the response object. `next` is used to execute the next middleware on that particular endpoint.
- Access the environmental variables `consumer_key`,`consumer_secret` and `oauth_token_url`.
- Create a buffer and then encode it to a `base64` string.
- Use a `try`,`catch` block to communicate with the Daraja API. If the request is successful, set the token on the request object, and then execute the next middleware. Otherwise return the error. 

### Lipa na Mpesa online
Having generated an access token, we can now implement our core functionality. Since Express.js is a series of middleware calls, we shall also implement it as a middleware. 

The implementation shall be as follows: 
```javascript 
async lipaNaMpesaOnline(req,res){
        let token = req.token;
        let auth = `Bearer ${token}`;       

        //getting the timestamp
        let timestamp = require('../middleware/timestamp').timestamp;

        let url = process.env.lipa_na_mpesa_url;
        let bs_short_code = process.env.lipa_na_mpesa_shortcode;
        let passkey = process.env.lipa_na_mpesa_passkey;

        let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
        let transcation_type = "CustomerPayBillOnline";
        let amount = "1"; //you can enter any amount
        let partyA = "party-sending-funds"; //should follow the format:2547xxxxxxxx
        let partyB = process.env.lipa_na_mpesa_shortcode;
        let phoneNumber = "party-sending-funds"; //should follow the format:2547xxxxxxxx
        let callBackUrl = "your-ngrok-url/mpesa/lipa-na-mpesa-callback";
        let accountReference = "lipa-na-mpesa-tutorial";
        let transaction_desc = "Testing lipa na mpesa functionality";

        try {

            let {data} = await axios.post(url,{
                "BusinessShortCode":bs_short_code,
                "Password":password,
                "Timestamp":timestamp,
                "TransactionType":transcation_type,
                "Amount":amount,
                "PartyA":partyA,
                "PartyB":partyB,
                "PhoneNumber":phoneNumber,
                "CallBackURL":callBackUrl,
                "AccountReference":accountReference,
                "TransactionDesc":transaction_desc
            },{
                "headers":{
                    "Authorization":auth
                }
            }).catch(console.log);

            return res.send({
                success:true,
                message:data
            });

        }catch(err){

            return res.send({
                success:false,
                message:err['response']['statusText']
            });

        };
};
```

The implementation follows these steps:
- Access the token that we stored in the request object.
- Append Bearer in front of the string to create the authorization string.
- Get the current timestamp.
- Get the lipa na Mpesa URL that is stored as an environmental variable.
- Get your business short code and `passkey`. Proceed to your [test credentials](https://developer.safaricom.co.ke/test_credentials). Then copy and paste the `Lipa Na Mpesa Online Shortcode` as the business short code to your `.env` file and `Lipa Na Mpesa Online Passkey` as the passkey.
- Get the password that is generated from a buffer composed of business short code, passkey, and timestamp. The buffer is then encoded to a `base64` string.
- Set the transaction type to CustomerPayBillOnline that is the only one supported. Don't change it.
- Set the amount to be paid.
- Set the PartyA that is the phone number sending the funds. The phone number should use the `2547xxxxxxxx` format.
- Set the PartyB which is the business short code.
- Set the Phone number that is the phone number sending the funds. Use the format as explained in PartyA.
- Set the callback Url. The callback Url is where the response will be processed. For this particular case we shall use [ngrok](https://ngrok.com/). 

Make sure your server is running with the command:
```bash
npm run dev
```

Then open another tab and run the following command:

```bash
npm run ngrok
```

This will forward you to a particular link such as `http://78066c1c2d6b.ngrok.io`. Copy that link and paste in the callBackUrl variable. 

**Note that the link is different each time you stop and start the server again.**

- Set the account reference which can be any string you set. It references where the money is being paid to.
- Set the transaction description which describes what the transaction is for.
- Use a `try`,`catch` block when communicating with the Daraja API. If the process is successful, return the message from the API. Otherwise return the error from the API.

#### Lipa na Mpesa online callback
When we send a request, the response from the API will be sent through the callback. In case we want to update some records, we update them here based on the response sent back. We implement a simple callback as a method in the class.

```javascript
lipaNaMpesaOnlineCallback(req,res){
        
    //Get the transaction description
    let message = req.body.Body.stkCallback['ResultDesc'];

    return res.send({
        success:true,
        message
    });
        
};
```

- Access the description of the transaction carried out.
- Since ours is just a simple tutorial we return the message sent.

#### Important takeaways
- In our implementation, we are using `ngrok` so that it can expose our localhost server. This implies that if you want to push your app into production, you must change the callback URL to your server domain when hosted online.
- After you have added credentials to the `.env` file, add it to your `.gitignore` file so that you do not expose your credentials when you push your project to GitHub.

### Resources 
- [Node.js](https://nodejs.org/en/)
- [Daraja Api](https://developer.safaricom.co.ke/home)
- [Axios](https://www.npmjs.com/package/axios)
- [Ngrok](https://ngrok.com/)
- [Express js](https://expressjs.com/)
- [Postman](https://www.postman.com/)
- [Nodemon](https://nodemon.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

### Conclusion
Mpesa userbase is rapidly growing, therefore it would be wise for software developers to familiarize themselves with the Daraja API. In this article, we have covered an introduction to Mpesa, we createdd a Safaricom developer account, created an app, got the OAuth token, and implemented Lipa na Mpesa online. Apart from what we have covered here, there are more functionalities in the [documentation](https://developer.safaricom.co.ke/docs). Feel free to check them out.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
