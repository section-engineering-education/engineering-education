---
layout: engineering-education
status: publish
published: true
url: /nodejs-paypal-checkout/
title: Getting Started with Node.js Paypal Checkout Integration
description: This article will go over a step-by-step tutorial on how to integrate Paypal checkout into a Node.js application. We will also render a response when the transaction is successfully canceled.
author: okelo-violet
date: 2021-05-03T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nodejs-paypal-checkout/hero.jpg
    alt: Getting started with Node.js paypal checkout integration example image
---
PayPal is an online payment platform that allows users to transfer funds worldwide. PayPal makes it easier for merchants to accept online payments through their websites. PayPal provides processing for both Visa and Mastercard payments.
<!--more-->
We will learn how to integrate Paypal checkout into a Node.js application. We will also render a response to inform the user when their transaction was canceled.

### Project setup
Create a directory named `paywave`. Change the working directory to the `paywave` directory created above by executing the command below.

```bash
$ mkdir paywave
$ cd paywave
```

To create a Node.js application in the `paywave` directory we created above, execute the command below.

```bash
$ npm init
```

- `npm init` command adds the `package.json` file to our `paywave` directory, making it a Node.js application.

Execute the commands below to install `express`, and `paypal-rest-sdk` into our project.

```bash
$ npm i express
$ npm i paypal-rest-sdk
```

1. In the `paywave` directory, create a new file named `index.js`. 
2. Add the code snippets below to the `index.js` file created above.
   
```javascript
const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': '####yourclientid######',
  'client_secret': '####yourclientsecret#####'
});

const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));


app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
```

To obtain the `client_id` and `client_secret`, login into your PayPal developer account[here](https://developer.paypal.com/) and create a new app as shown in the image below.

![Paypal create a new app](/engineering-education/nodejs-paypal-checkout/paypal-create-app.png)

After creating the app, click on the app name to navigate to the app's detail page, where you will obtain the `client_id` and `client_secret`.

On the app details page, copy the `client_id` and `client_secret` into the `index.js` file we created above.

![Paypal secrete and Id](/engineering-education/nodejs-paypal-checkout/paypal-credentials.png)

#### Creating a sandbox account
Select the account menu item on the sidebar as shown in the image below.

![Paypal account section](/engineering-education/nodejs-paypal-checkout/paypal-account-section.png)

Create a new account that you will use when making the payments in the sandbox account.

![Paypal creating account](/engineering-education/nodejs-paypal-checkout/paypal-create-account.png)

#### Checkout view 
1. In the `paywave` directory, create a file named `index.html`. 
2. Add the code snippet below to the `index.html`. 
   
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>PayPal Node App</title>
</head>
<body>
  <h1>Nike shoes </h1>
  <h2>Buy For $25</h2>
  <form action="/pay" method="post">
    <input type="submit" value="Buy">
  </form>
</body>
</html>
```

The code snippet above the name of the item, buy button, and its price to the user. Whenever a user clicks on the buy button, a Paypal checkout will be initiated.

#### Payment handler
In the `index.js` file, add the code snippet below.

```javascript
app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Redhock Bar Soap",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Washing Bar soap"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});
```

The code snippet above contains the payment details that Paypal uses to initiate a transaction. If the payment initiated successfully, then the user is presented with the page shown in the image below to complete the transaction.

![Complete transaction](/engineering-education/nodejs-paypal-checkout/paypal-checkout.png)

#### Success transaction handler
Whenever the transaction is successful, we should get the transaction details from Paypal. The transaction details obtained from Paypal can be saved in the database for future references. In our case, we print a log of the transaction in the terminal.

In the `index.js` file add the code snippets below to get transaction details from Paypal whenever a transaction is successful.

```javascript
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

// Obtains the transaction details from paypal
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});
```

If the transaction was successful, then a success page will be displayed to the user as shown in the image below.

![Paypal checkout success](/engineering-education/nodejs-paypal-checkout/paypal-success.png)

#### Transaction cancellation
When a user cancels the transaction, we need to render a response to inform the user that the transaction was successfully canceled. To handle the cancellation, add the code snippet below into the `index.js` file.

```javascript
app.get('/cancel', (req, res) => res.send('Cancelled'));
```

- The above route returns a `Cancelled` string to the user whenever a transaction cancellation is successful.
  
### Conclusion
Now that you have learned how to integrate Paypal checkout into a Node.js application, add a success and error page to the application we created. 

The full source for the application can be downloaded [here](https://github.com/okeloviolet/Nodejs-paypal).

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
