### Integrating B2C Mpesa API using Node.js

Mpesa can be described as a phone-based mobile banking service. Since its inauguration in 2007 by Vodafone Group PLC and Safaricom in Kenya, it has expanded to eight more countries in Africa.

An API (Application Programming Interface) is an intermediary between two software applications that enables them to communicate.

B2C Mpesa API enables software developers to integrate the functionality of merchants sending payments to their customers in their applications.

### Goals

In this article, we will integrate the B2C Mpesa API to a Node.js RESTful API. We will consume the API using [swagger](https://swagger.io/).

### Prerequisites

To follow along in this article, it is helpful to have the following:

- [Node.js](https://nodejs.org/en/) installed on your computer.
- Some basic knowledge working with JavaScript.
- A text editor installed.

### Overview

- [Setting up the development server](#setting-up-the-development-server)
- [Getting an access token](#getting-an-access-token)
- [B2c API](#b2c-api)

### Setting up the development server

This article assumes that you have a Safaricom developer account.

If you don't, go through these [steps](/engineering-education/lipa-na-mpesa-online/#creating-a-safaricom-developer-account).

Also, ensure that you have created at least one application from your developer portal. If you don't have any, follow this [guidelines](/engineering-education/lipa-na-mpesa-online/#creating-an-app).

To get started, we will clone the project skeleton from [here](https://github.com/Roba-W/nodejs-b2c-mpesa-api-starterkit). With all the basic configuration done on the skeleton, our focus throughout the article will be implementing the core functionalities.

To start with, we need to install the following dependencies:

- [axios](https://www.npmjs.com/package/axios): For handling the requests to the Mpesa API.
- [dotenv](https://www.npmjs.com/package/dotenv): For loading the environmental variables.
- [express](https://www.npmjs.com/package/express): For providing a faster, and easier to work with set up for the restful API.
- [ngrok](https://www.npmjs.com/package/ngrok): For exposing our localhost server.
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): For serving the API docs to the user interface.

To do that, open your cloned project skeleton in your text editor. Open the terminal of your text editor and run the following command:

```bash
npm install
```

Having installed the dependencies, you are okay to move on to the next step.

We will be working from the `src/controllers/Mpesa.js` file.

### Getting an access token

For any request to the Mpesa API, an access token is a requirement. It forms the basis for authentication.

To implement the functionality, we will edit the `getAccessToken()` method as follows:

```js
//get access token.
async getAccessToken(req,res,next){
    // get data from headers by destructuring
    let {consumerkey,consumersecret} = req.headers;
    // request url
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    // base64 encoded string from a buffer
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

From above:

- Destructuring the `consumerkey` and `consumersecret` from the `headers`.
- Setting the URL to send the request to.
- Generating a `base64` encoded string from a buffer.
- Composing the authentication string by appending `Basic` before the encoded string.
- Sending the request to Mpesa API from a `try/catch` block. In case of an error, the error is sent to the client. Else if there is no error, the access token is sent to the client.

To test it:

- Start the development server by running the following command from the terminal of your text editor:

```bash
npm run dev
```

- In your browser, open `http://localhost:4000/api-docs`.
- Click the `/access-token` section under `Mpesa B2C` tag.
- Click the `Try it out` button.
- To get your `consumer key` and `consumer secret`, visit your [applications page](https://developer.safaricom.co.ke/user/me/apps), select your application, from the keys section copy and paste them respectively into the section's parameters.
- Click the `Execute` button.
- In case of an error, revisit the steps. Else your server response should resemble the following:

![access_token_response_screenshot](/engineering-education/integrating-b2c-mpesa-api-using-node-js/access-token-response-screenshot.png)

_A screenshot of getting access token server response_

### B2c API

With the access token functionality implemented, we are set to implement the B2C API.
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

From above:

- Destructure all the data sent from the `headers`.
- Set the URL to send the request to.
- Set the ngrok URL. To get it, ensure that you have [ngrok](https://ngrok.com/) installed. With ngrok installed, open another tab in the terminal of your text editor and run the following command:

```bash
npm run ngrok
```

Copy the HTTPS URL logged in your terminal and paste it appropriately in the `.env` file on the root of your project folder.

- Set the authentication token by appending `Bearer` before the access token.
- Send the request from a `try/catch` block. In case of an error, get the status code and the error message and send them to the client. Else if no error, set the status code to `200` and send the response from the request to the client.

To test it:

- First, we need to implement the `timeout` URL and the `result` URL we are sending with the request. To do that we will edit the `timeout()` and `cb()` methods as follows:

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

- Ensure that your development server is running from the terminal of your text editor.
- In your browser, in the previous opened `http://localhost:4000/api-docs` page, proceed to the `/b2c` section.
- Click the `Try it out` button.
- Fill in the parameters as follows:
  - For `AccessToken`, Repeat the previous process and copy and paste the access token generated.
  - For `InitiatorName`, copy and paste the `Initiator Name` from your [test credentials page](https://developer.safaricom.co.ke/test_credentials).
  - For `SecurityCredential`, copy the `Security Credential` from the [test credentials page](https://developer.safaricom.co.ke/test_credentials) paste it in the `Initiator Security Password` input below and click `Generate Credentials`. Copy and paste the long generated text.
  - For `CommandID`, select any from the dropdown.
  - For `Amount`, enter any amount.
  - For `PartyA`, copy and paste the `Shortcode 1` from [test credentials page](https://developer.safaricom.co.ke/test_credentials).
  - For `PartyB`, copy and paste the `Test MSISDN` from [test credentials page](https://developer.safaricom.co.ke/test_credentials).
  - For `Remarks`, enter any text. Keep it short.
- Click the `Execute` button.
- In case of any error, revisit the steps. Else, the following should resemble your server response.

![b2c_server_response_screenshot](/engineering-education/integrating-b2c-mpesa-api-using-node-js/b2c-server-response-screenshot.png)

_A screenshot of b2c server response_

and information logged on your console should mimic the following:

![b2c_console_response_screenshot](/engineering-education/integrating-b2c-mpesa-api-using-node-js/b2c-console-response-screenshot.png)

_A screenshot of b2c console response_

### Summary

In this article, we have implemented the following functionalities from Mpesa API:

- [Getting an access token](#getting-an-access-token)
- [B2c API](#b2c-api)

The finalized code can be accessed from [here](https://github.com/Roba-W/restful-nodejs-b2c-mpesa-api). Feel free to give the project a star.

### Conclusion

In such a competitive business environment of today, different business processes need to be automated to mitigate costs. The Mpesa B2C API has come to the rescue by offering an infrastructure to automate payments from merchants to customers.

To expand your knowledge on the covered topics, check out the following resources:

- [Mpesa B2C](https://www.safaricom.co.ke/faqs/faq/606)
- [Mpesa API docs](https://developer.safaricom.co.ke/docs#m-pesa-apis)
- [API documentation using swagger](https://medium.com/wolox/documenting-a-nodejs-rest-api-with-openapi-3-swagger-5deee9f50420)

You can always reach out to the Safaricom development team via [mail](mailto:apisupport@safaricom.co.ke).

Happy coding!!
