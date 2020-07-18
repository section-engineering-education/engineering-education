# A Simple Guide to Using APIs with Node.js and EJS

**Alternative title: Getting to Grips with APIs: Using Node.js and EJS**

Always wanted to use data from an API (Application Programming Interface) but never knew how? This tutorial will guide you through how to work with your first API using Node.js **Link** and EJS **Link** templating to create a dynamic **(use full-stack instead?)** web app. Don't worry if you've never used JSON before or know very little JavaScript, the guide is aimed at you.

**(Excerpt ends)**

So you've created your [first NodeJS web app](**Link to Converting Static Site article**) but now you want to build on those skills by working with an API. Using your existing knowledge of EJS templating and Node.js, you will be able to work with the Goodreads API to be able to search for, list and return details about books.

**Note:** Don't already have a basic NodeJS web app deployed? Check out my [Converting a Static Site to a Dynamic NodeJS Web App tutorial](**Link to Section article**) which will introduce you to full-stack development.

## Obtaining your API Keys

To be able to use the API, we first need to obtain some keys. This allows the API provider to monitor your usage and ensure you are within their terms of services. 

First, you need to have a Goodreads account. Register on the Goodreads [website](https://www.goodreads.com) if you haven't already done so.

Second, you need to register your app to get the key. Go to [goodreads.com/api/keys](https://www.goodreads.com/api/keys) and fill in the name of the app and the company name (which can just be your name.) 

Don't worry about any of the optional fields. The only one you would need to fill in is the callback URL for authentication which we will cover in part 2. 

Click the update app info button to submit the details. You should now see a key and secret which will be a long string of randomised numbers and letters. We will be adding these shortly into our server.js file so we can access the Goodreads API.

## Installing goodreads-api-node

Now we have our API key and secret for the Goodreads API, we need to tell our server how to access the Goodreads APIs.

The easiest way to do this is to install an API wrapper. The one we will be using is called [goodreads-api-node](https://github.com/baahrens/goodreads-api-node). An API wrapper is code a developer has written to make it easier for us to use the API.

To install goodreads-api-node, type `npm install --save goodreads-api-node` in the terminal and press enter. 

In your server.js file, add `const goodreads = require('goodreads-api-node');` underneath your other required node modules.

Now we need to add your API key and secret using the code below. It is highly advisiable to store these elsewhere so they aren't stolen. One of way doing this is using dotenv which I've done. See **link to Section article which covers dotenv**. 

If you don't want to, replace `process.env.GOODREADS_KEY` and `process.env.GOODREADS_SECRET` which the key and secret you obtained from the Goodreads website.

```js
const myCredentials = {
  key: 'process.env.GOODREADS_KEY',
  secret: 'process.env.GOODREADS_SECRET'
};

const gr = goodreads(myCredentials);
```
If you've added the code correctly, the start of your server.js file (before you've added any routes) should look like:

```js
// Node Modules
const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const goodreads = require('goodreads-api-node');
const app = express();

// Goodreads API - NodeJS
const myCredentials = {
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};
const gr = goodreads(myCredentials);

// Initialising Express
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');
```