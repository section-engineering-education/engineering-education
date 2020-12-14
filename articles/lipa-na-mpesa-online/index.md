#### prerequisites
- Have a Kenyan based Safaricom phone number.
- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Have some basic knowledge of JavaScript and using [Express JS](#https://expressjs.com/).
- Have [Postman](https://www.postman.com/) installed on your computer.

### What we shall cover.
- [Introduction to Mpesa.](#introduction-to-mpesa)
- [Creating a Safaricom developer account](#creating-a-safaricom-developer-account)
- [Creating-an-app](#creating-an-app)
- [Getting an Oauth token](#getting-an-oauth-token)
- [Lipa na Mpesa online](#lipa-na-mpesa-online)

### Introduction to Mpesa.

Mpesa is a mobile money payment service by Safaricom based in Kenya. It was released in 2007 and since then has become the common means of payment in Kenya. To help developers implement Mpesa in their platforms, Safaricom released Daraja API. It is a REST-based API that shifts the functionalities of Mpesa to system developers. Lipa na Mpesa online is one of the functionalities provided by Daraja API. It is a service used to initiate Mpesa transactions on behalf of the customer using `STK-PUSH`. This means that the user is only required to enter the PIN. It is applied in e-commerce and bill payment systems among others.

### Creating a Safaricom developer account.

Safaricom controls all the operations concerning Mpesa and  Daraja API. For you to access Daraja API, you need to have a developer account. The following steps explain how you can create a developer account. Feel free to skip if you already have one.

- Step 1: The first step is to proceed to [Safaricom Developer website](#https://developer.safaricom.co.ke/home).

- Step 2: Click on the signup button on the center or visit directly from  [here](#https://developer.safaricom.co.ke/login-register). Proceed to the signup section.

- Step 3: After registering, a welcome message with further instructions is sent to your email address. In the email, you shall find a confirmation link, click on it and it shall direct you to a password entry page.

- Step 4: Enter your password and confirm it and then click login. On the page that follows, you shall view the credentials that you have entered. If you want to edit the credentials, make sure you do the changes and hit save. Else, you are all set.

### Creating an app.

To be able to use Daraja API, you need to have an app so that you have the required access keys. It is a very simple process creating an app, follow the following steps:

- Step 1: Click on my apps link on the navbar up there.

- Step 2: On that page, click the button `Add a new app`.

- Step 3: In the page that follows, Enter your preferred app name, check the `Lipa na Mpesa Sandbox` and then click `create app`. After that, you are all set.

#### Configuring our application.

Having set up the developer account and an app, it's time we set up how our application shall be like. For this article, we shall implement a REST API with express as our Node.js Framework. This means that our end goal is to implement a working endpoint for Lipa na Mpesa online. To handle communication to and  from Daraja API we shall use `request`, a third-party package. To follow along effectively, clone the finalized project from [here](#https://github.com/mwangiKibui/starter-kit-lipa-na-mpesa-online). For testing our API, we shall use [Postman](#https://postman.com). If you are not well aware of it, feel free to watch this [video](#https://www.youtube.com/watch?v=t5n07Ybz7yI)

### Obtaining Consumer Key and Consumer Secret.

On the apps page, click on the newly created app from the previous process. In the Keys section, Copy and paste the Consumer Key and the Consumer Secret in your .env file respectively as shown:

```javascript

//in the .env file

consumer_key = "your consumer key"
consumer_secret = "your consumer secret"

```

After you have saved the Consumer Key and the Consumer Secret, you are set to proceed to the next step of getting an OAuth token. 

### Getting an  OAuth token.

To make every call to Daraja API, we need to always supply an OAuth token. For this reason, we shall implement it as a middleware to be called every time we are accessing an endpoint. The function shall be as follows:


```javascript
getOAuthToken(req,res,next){
        let consumer_key = process.env.consumer_key;
        let consumer_secret = process.env.consumer_secret;

        let url = process.env.oauth_token_url;

        //form a buffer of the consumer key and secret
        let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

        let auth = `Basic ${buffer.toString('base64')}`;

        request({
            url:url,
            headers:{
                "Authorization":auth
            }
        },(error,response,body) => {

            if(error) {
                return res.send({
                    success:false,
                    message:"Error getting oauth token"
                });
            };

            //else we extract the token from the body

            let token = JSON.parse(body)['access_token'];

            req.token = token;
            
            return next();
        });
}
```

- Receiving `req`,`res`,`next` as parameters: Since the function shall be called as a middleware, we need to pass the appropriate parameters. `req` has access to the request object whereas `res` has access to the response object. `next` is used to execute the next middleware on that particular endpoint.

- Access the environmental variables `consumer_key`,`consumer_secret` and `oauth_token_url`.

- Create a buffer and then encode it to a `base64` string.

- Use `request` to communicate with the Daraja API endpoint.

- Receive the `error`,`response` and `body` as a callback. If there is an error, return an error else, parse the body to a `JSON` object, then access the `access_token` key to get the token. Set the token on the request object so that it can be accessed by any other middleware and then execute the next middleware on the line using `next()`.


### Lipa na Mpesa online.

Having generated an access token, we can now implement our core functionality. Since Express is a series of middleware calls, we shall also implement it as a middleware. The implementation shall be as follows: 

```javascript 
lipaNaMpesaOnline(req,res){
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
        let partyA = "your_phone_number"; //should follow the format:2547xxxxxxxx
        let partyB = process.env.lipa_na_mpesa_shortcode;
        let phoneNumber = "your_phone_number"; //should follow the format:2547xxxxxxxx
        let callBackUrl = "{{your_ngrok_url}}/mpesa/lipa-na-mpesa-callback";
        let accountReference = "lipa-na-mpesa-tutorial";
        let transaction_desc = "Testing lipa na mpesa functionality";

        request({
            method:'POST',
            url,
            headers:{
                'Authorization':auth
            },
            json:{
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
            }
        },(error,response,body) => {

            if(error) return res.send({
                success:false,
                message:error
            });

            //else true


            return res.send({
                success:true,
                message:body
            })
        })
}
```

The implementation follows the following steps:

- Access the token which we stored in the request object.
- Append Bearer in front of the string so that to come up with the authorization string.
- Get the current timestamp.
- Get the lipa na Mpesa URL which is stored as an environmental variable.
- Get your business short code and Passkey. To get them, Proceed to  your [test credentials](#https://developer.safaricom.co.ke/test_credentials). Then copy and paste the `Lipa Na Mpesa Online Shortcode` as the business short code to your `.env` file and `Lipa Na Mpesa Online Passkey` as the passkey to your `.env` file.
- Get the password which is generated from a buffer composed of business short code, passkey, and timestamp. The buffer is then encoded to a `base64` string.
- Set the transaction type to CustomerPayBillOnline which is the only one supported. Don't change it.
- Set the amount to be paid.
- Set the PartyA which is the phone number sending the funds. The phone number should use the `2547xxxxxxxx` format.
- Set the PartyB which is the business short code.
- Set the Phone number which is the phone number sending the funds. Use the format as explained in PartyA.
- Set the callback Url. The callback Url is where the response shall be processed. For this particular case we shall use [ngrok](#https://ngrok.com/). Make sure your server is running with the command:

```bash
npm run dev
```

and then open another tab and run the following command:

```bash
npm run ngrok
```

This shall forward you to a particular link such as `http://78066c1c2d6b.ngrok.io`. Copy that link and paste in the callBackUrl variable. Note that the link is always different each time you stop and start the server again.

- Set the account reference which can be any string you set. It references where the money is being paid to.
- Set the transaction description which describes what the transaction is for.
- Use `request` to send the data to the Daraja API. 
- Set the method, headers, and `JSON` body to send.
- Receive the result from the API in form of `error`,`response`,  and `body`. If there is an error, send back the error, else send the body object.

#### Lipa na Mpesa online callback.

When we have sent a request, the response from the API shall be sent through the callback. In case we want to update some records, we update them here based on the response sent back. We implement a 
simple callback as a method on the class.

```javascript
lipaNaMpesaOnlineCallback(req,res){
        
    let message = req.Body.stkCallback.ResultDesc;

    //based on the message you can update some records.

    return res.send({
        success:true,
        message
    });
        
};
```

- Destructure the message sent from the request object.
- Since ours is just a simple tutorial we return the message sent.

#### Important takeaways

- In our implementation, we are using `ngrok` so that it can expose our localhost server. This implies that if you want to push your app into production, you must change the callback Url to your server domain when hosted online.

- After you have added credentials to the `.env` file, add it to your .gitignore file so that you do not expose your credentials when you push your project to GitHub.

### Resources 

- [Node.js](#https://nodejs.org/en/)
- [Daraja Api](#https://developer.safaricom.co.ke/home)
- [Ngrok](#https://ngrok.com/)
- [Express js](#https://expressjs.com/)
- [Postman](#https://www.postman.com/)
- [Nodemon](#https://nodemon.io/)
- [Dotenv](#https://www.npmjs.com/package/dotenv)

### Conclusion.
Mpesa users are rapidly growing hence software developers need to familiarize themselves with Daraja API. In this article, we have covered an introduction to Mpesa, creating a Safaricom developer account, creating an app, getting an OAuth token, and implementing Lipa na Mpesa online. Apart from what we have covered here, there are more functionalities from the [documentation](#https://developer.safaricom.co.ke/docs)