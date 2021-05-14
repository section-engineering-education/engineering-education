---
layout: engineering-education
status: publish
published: true
url: /react-native-razorpay/
title: React Native Razorpay Integration
description: This tutorial provides readers with a detailed guide on how to implement Razorpay in a React Native application with the help of a Express server.
author: mohan-raj
date: 2021-01-04T00:00:00-05:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-native-razorpay/hero.jpg
    alt: React Native and Razorpay
---
In this tutorial, we will build a React Native application to accept payments from users by integrating Razorpay in our application. We will also build a Node.js (Express) server to handle sensitive information and processes that should not be exposed or handled from the mobile application.
<!--more-->

### Razorpay
Founded in 2014, [Razorpay](https://www.crunchbase.com/organization/razorpay) is a payment gateway service. Razorpay enables you to access payment modes like credit and debit cards, UPI, and popular mobile wallets. These payment options can be implemented in your app.

Therefore, if you are building an application that targets an Indian audience and requires a payment gateway, Razorpay is the preferred choice.

If you'd like to learn more about Razorpay, read [this blog post](https://razorpay.com/blog/best-payment-gateway-india/).

### Goals
By the end of this tutorial, you will know:

- The steps required to initiate and complete a Razorpay transaction.

- How to create a Razorpay order from a Node.js server.

- How to integrate Razorpay checkout to a React Native app.

- How to verify Razorpay payments.

### Prerequisites
In this tutorial, we'll be working on the application and the server. The application will be built using `React Native`, and the server will be built using `Node.js` and `Express`.

If you are not comfortable with these technologies, refer to these articles below before proceeding with this project.

- [React Native Tutorial](https://reactnative.dev/docs/tutorial).
- [Node.js & Express Tutorial](https://medium.com/@jaeger.rob/introduction-to-nodes-express-js-db5617047150).

You should also deploy the server to use it from the app. You can deploy your server in DigitalOcean or other alternatives.

Here is an [article](engineering-education/deploying-nodejs-web-app/) on how to deploy a Node.js app on DigitalOcean.

### Overview
We'll be going through these steps in this article:

1. Creating a Razorpay account.
2. Development environment.
3. Cloning the starter code.
4. Installing dependencies.
5. Creating a Razorpay Order.
6. Adding the Razorpay Checkout.
7. Verifying Transaction.
8. Payment Capture.
9. Payments Log.
10. Recap.

### Creating a Razorpay account
Head to the Razorpay website and create an account. You can reach the signup page from [here](https://dashboard.razorpay.com/signup?captcha=invisible).

![Razorpay Signup Page](/engineering-education/react-native-razorpay/signup-page.png)

Once you've signed up with all the necessary information, you'll see the dashboard.

![Razorpay Dashboard](/engineering-education/react-native-razorpay/razorpay_dashboard.png)

Scroll down the navigation bar and select Settings.
![Razorpay Setting](/engineering-education/react-native-razorpay/razorpay_settings.png)

In the Settings tab, you'll see a section called API keys. Enter that section and click on the Generate `Test Key` button.

![Razorpay API Keys](/engineering-education/react-native-razorpay/razorpay_apikeys.png)

The website will display a modal with the Test API Key and a Secret Key. We'll need the keys in our app and our server.

> The secret key will be displayed only once and you won't be able to find it again, so make a copy of it now. The Test API Key and the Secret key must be kept safe.

![API Keys modal](/engineering-education/react-native-razorpay/razorpay_newkey.png)

### Development environment
> **IMPORTANT** - We will not be using Expo in our project. This is because the Razorpay checkout is a wrapper around the native SDK, so it doesn't work with Expo which doesn't support native modules.

You can follow [this](https://reactnative.dev/docs/environment-setup) documentation to set up the non-expo environment.

Make sure you're following the React Native CLI Quickstart, not the Expo CLI Quickstart.

![Env Setup](/engineering-education/react-native-razorpay/env_setup.png)

### Cloning the starter code
To focus more on the Razorpay Transactions, I've prepared a starter code. You can clone it from [this repository](https://github.com/zolomohan/rn-razorpay-app-starter) on GitHub. Follow the Repository's README for instructions.

If you'd like to take a look at the final code, please refer to [this GitHub Repository](https://github.com/zolomohan/rn-razorpay-section-io-final).

I've set up a checkout screen in the starter code that will fetch random products from [fakestoreapi.com](https://fakestoreapi.com/).

Checkout Screen:

![Starter Page](/engineering-education/react-native-razorpay/starter_page.jpeg)

### Installing dependencies
You can install these dependencies in advance or while going through the article.

```JSON
"axios": "^0.21.0",
"react": "16.13.1",
"react-native": "0.63.4",
"react-native-razorpay": "^2.2.1"
```

To install a dependency, run:
```bash
npm i --save <package-name>
```

After installing the packages, for iOS, go into your `ios/` directory, and run:
```bash
pod install
```

> **IMPORTANT FOR ANDROID**
>
> As you add more native dependencies to your project, it may bump you over the 64K method limit on the Android build system. Once you reach this limit, you will start to see the following error while building your Android application.
>
> `Execution failed for task ':app:mergeDexDebug'.`
>
> Use [this documentation](https://rnfirebase.io/enabling-multidex) to enable multidexing.
> To learn more about multidex, view the official [Android documentation](https://developer.android.com/studio/build/multidex#mdex-gradle).

### Razorpay payment process
There are four steps in the Razorpay payment process.

1. Creating an order.
2. Checkout.
3. Verifying transaction.
4. Payment capture.

Here is a diagram to represent the payment flow.

![Razorpay Payment Flow Sequence Diagram](/engineering-education/react-native-razorpay/razorpay_payment_flow.png)

*Image Source: Razorpay official documentation*

### STEP 1: Creating an order
Every payment can be associated with an order to help prevent multiple payments. Once payment is captured, the order will be marked as paid.

You can learn more about orders [here](https://razorpay.com/docs/api/orders/).

#### Server side
Razorpay provides a node package to work with it's APIs. Working with their APIs require the API Key and the Secret Key.

It's not a good idea to expose these keys in the app, so we will write a server and make our app request this server to create an order.

Let's start with building the server.

> You'll need Node.js to set up an Express server. You can download Node.js from [here](https://nodejs.org/en/).
> To test the server, I'll be using [Postman](https://www.postman.com/) to make requests to this server. You can download it from [here](https://www.postman.com/downloads/).

For extra information on how to create a [mock server with Postman](/guide-to-create-mock-server/) visit the link provided.

Let's install `Express` using `NPM`.

```bash
npm install express
```

We can now import `express` in our code to create a simple server module that'll listen on port 3000.

```JavaScript
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Razorpay Server"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Razorpay Server listening at Port ${port}`));
```

You can start the server by running:
```bash
node index.js
```

This server will be listening on port 3000, and when you hit the `'/'` endpoint, it'll send `"Razorpay Server"`.

Now that we have the server setup let's install the `razorpay` package.

```bash
npm install razorpay
```

Let's import `razorpay` into our code.

```JavaScript
const Razorpay = require("razorpay");
```

After importing the package, the next step is to create an instance of `Razorpay`. To initialize the instance, we need the API key and the Secret Key. It's not a good idea to leave the keys in the code. A perfect option is to set environment variables and use them in the code.

If you'd like to learn more about environment variables, refer to [this article](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786).

```JavaScript
const razorpay = new Razorpay({
  key_id: process.env.APIKEY,
  key_secret: process.env.SECRETKEY,
});
```

Let's add a POST request handler for a new endpoint called "/createOrder" to create an order and return the created order as the response.

```JavaScript
app.post("/createOrder", (req, res) => {
  // Create an Order
});
```

When the app requests this endpoint, the server will request Razporpay's API to create an order.

The `razorpay` package provides a function to create an order. The amount and currency are mandatory details required to create an order. The app that requests this endpoint should provide these details in the request body.

> The amount must be provided in the base denomination. For example, the amount must be in paisa for INR. 1 Rupee = 100 Paisa.

You can learn more about the create order API [here](https://razorpay.com/docs/api/orders/#create-an-order).

>Let's write the code to create an order.

```JavaScript
app.post("/createOrder", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount,
    currency: req.body.currency,
  });
  res.send(order);
});
```

Let's run this as a local server and test it with Postman.

Request Body:

```JSON
{
  "amount": 50000,
  "currency": "INR"
}
```

Response:

```JSON
{
  "id": "order_G99PhGAo41rsFB",
  "entity": "order",
  "amount": 50000,
  "amount_paid": 0,
  "amount_due": 50000,
  "currency": "INR",
  "receipt": null,
  "offer_id": null,
  "status": "created",
  "attempts": 0,
  "notes": [],
  "created_at": 1607125999
}
```

![Create Order Request](/engineering-education/react-native-razorpay/create_order_request.png)

Now, deploy this server so that we can create an order from our app.

#### Client side
We need to request our server's `/createOrder` endpoint to create a Razorpay order from our app.

Let's write a function to request our server's endpoint. I'm using Axios to make requests from the app.

You can learn more about Axios [here](https://www.npmjs.com/package/axios).

```JavaScript
const createOrder = async () => {
  const { data } = await axios.post(
    'https://<-- Your Server URL Here -->/createOrder',
    {
      amount: product.price * 100,
      currency: 'INR',
    },
  );
  return data;
};
```

In the app's starter code, you'll find a function called `onPay`. This function will get called when the user presses the buy button.

Let's call the `createOrder` function from `onPay`.

```JavaScript
const onPay = async () => {
  setPaymentProcessing(true);
  // Step 1: Create Order
  const order = await createOrder();

  setPaymentProcessing(false);
};
```

This will create an order, and we'll have the order ID. We need to pass this order ID to the checkout component in the next step, and we'll also need this to verify the transaction (if the transaction in the next step is successful).

### Step 2: Checkout
Let's install `react-native-razorpay` in our app.

```bash
npm install react-native-razorpay
```

#### iOS
After the package is installed, `cd` into `ios/` and run:

```bash
cd ios && pod install
```

Now, open `Podfile` to change the platform version from `9.0` to `10.0` in the Podfile.

To open `Podfile`, run:

```bash
$ open podfile
```

#### Android
We need to import the native package into `android/app/src/main/java/com/[project name]/MainApplication.java`.

```Java
import com.razorpay.rn.RazorpayPackage;
```

>NOTE: If you are using React Native version `>=0.60`, you should skip the step below. This is because versions greater than `0.60` have auto-linking.

Add `new RazorpayPackage()` to the list returned by the `getPackages()` method.

```Java
protected List<ReactPackage> getPackages() {
  @SuppressWarnings("UnnecessaryLocalVariable")
  List<ReactPackage> packages = new PackageList(this).getPackages();    // Packages that cannot be autolinked yet can be added here
  packages.add(new RazorpayPackage());
  return packages;
}
```

Append the following lines to the `settings.gradle` file.

```Java
include ':react-native-razorpay'
project(':react-native-razorpay').projectDir = new File(rootProject.projectDir,   '../node_modules/react-native-razorpay/android')
```

Add the following lines in the `dependencies` section of your `app/build.gradle` file.

```Java
implementation project(':react-native-razorpay')
```

> The minimum target SDK for the React Native Razorpay is 19. If your project targets an SDK below 19, bump up the minSDK target in `android/build.gradle`.

Let's import RazorpayCheckout in `App.js`.

```JavaScript
import RazorpayCheckout from 'react-native-razorpay';
```

Next, we need to call the `RazorpayCheckout.open` method with the payment `options`. This method returns a JS Promise.

In the options, we need to pass the API Key, the Order ID, product details, and the UI's theme color. We can also pass user information to prefill the form.

Create a new file called `config.js` and add your API key to it, as shown below.

```JavaScript
export const RazorpayApiKey = "<-- Your API Key here -->"
```

> Do not forget to add `config.js` to `.gitignore` if you are using a git repository.

```JavaScript
import { RazorpayApiKey } from './config';

var options = {
  name: product.title,
  image: product.image,
  description: product.description,
  order_id: order.id,
  key: RazorpayApiKey,
  prefill: {
    email: 'useremail@example.com',
    contact: '9191919191',
    name: 'John Doe',
  },
  theme: { color: '#a29bfe' },
};
```

Now, let's call the `RazorpayCheckout.open` method and pass the `options` to it.

```JavaScript
RazorpayCheckout.open(options)
  .then(console.log)
  .catch(console.log);
```

This will open the checkout form for the transaction with all the available payment methods.

![Checkout Form](/engineering-education/react-native-razorpay/checkout_form.jpeg)

You can learn about the test card details [here](https://razorpay.com/docs/payment-gateway/test-card-details/).

When you are working on test mode, you'll see an additional screen that'll let you simulate a successful and failed transaction.

![Test Page](/engineering-education/react-native-razorpay/test_page.jpeg)

When the transaction is successful, the transaction details are passed to the `.then()`. We need to verify the payment using the transaction details.

### STEP 3: Verify the transaction
This step allows you to check the authenticity of the details returned from the checkout form for successful payments.

#### Server Side
We will add a new endpoint called `/verifyPayment` to verify the transaction on the server.

Let's add a POST request handler for a new endpoint called "/verifyPayment".

```JavaScript
app.post('/verifyPayment', (req, res) => {
  // Verify Payment
});
```

To verify the `razorpay_signature` returned to you by the checkout form, we need to use the [SHA256 algorithm](https://en.wikipedia.org/wiki/SHA-2) to construct an [HMAC](https://en.wikipedia.org/wiki/HMAC) hex digest of the `razorpay_payment_id` and the `order_id` and check if it's the same as the `razorpay_signature` returned from the checkout form.

> Do not use the order ID returned from the checkout form to construct the signature. You must use the order ID that you passed to the checkout form to construct the signature.

```JavaScript
app.post("/verifyPayment", (req, res) => {
  const { orderID, transaction } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.SECRETKEY)
    .update(`${orderID}|${transaction.razorpay_payment_id}`)
    .digest("hex");

  res.send({ validSignature: generatedSignature === transaction.razorpay_signature });
});
```

#### Client Side
Let's write a function to request the `/validPayment` endpoint of our server with the order ID and the transaction.

```JavaScript
const verifyPayment = async (orderID, transaction) => {
  const { data } = await axios.post(
    'https://<-- Your Server URL Here -->/verifySignature',
    {
      orderID: orderID,
      transaction: transaction,
    },
  );
  return data.validSignature;
};
```

Let's call this in the `.then()` of the Razorpay checkout. Once the response from the `/verifyPayment` endpoint comes back, we'll display it in an alert modal.

```JavaScript
RazorpayCheckout.open(options)
  .then(async (transaction) => {
    const validSignature = await verifyPayment(order.id, transaction);
    alert('Is Valid Payment: ' + validSignature);
  })
  .catch(console.log);
```

![Alert Modal](/engineering-education/react-native-razorpay/alert_modal.jpeg)

### STEP 4: Payment capture
When a user makes a payment, it usually flows through the following states:

- Created.

- Authorized.

- Captured.

- Refunded.

- Failed.

The following state diagram depicts the payment states:

![Payment State](/engineering-education/react-native-razorpay/payment_states.png)

*Image Source: Razorpay official documentation*

By default, once the user completes a payment, it is automatically moved to a captured state. However, the payment can remain in the authorized state in some scenarios.

You can learn more about Payment Capture [here](https://razorpay.com/docs/payment-gateway/payments/capture-settings/).

### Payments Log
You can check the received payments in the Razorpay dashboard.

![Razorpay Payments Dashboard](/engineering-education/react-native-razorpay/razorpay_payments.png)

You can learn more about the Razorpay Dashboard and how to use it in [this article](https://razorpay.com/blog/how-to-use-razorpay-dashboard/).

### Let's Recap
1. We set up our Razorpay Account.

2. We acquired the API key and the Secret key from the dashboard.

3. We cloned the starter code.

4. We created a server endpoint to create a Razorpay order.

5. We requested the endpoint from our app to create an order and got the order object as the response.

6. We installed the React Native Razorpay checkout package.

7. We passed the API key, order ID, product information, and user information to the checkout form.

8. We created a server endpoint to verify the authenticity of the transaction.

9. We requested the server endpoint from our app with the order ID and the transaction details.

10. We displayed whether the transaction was authentic to the user.

Congratulations, :partying_face: You did it.

Thanks for reading!

---
Peer Review Contributions by: [Michael Barasa](/engineering-education/authors/michael-barasa/)
