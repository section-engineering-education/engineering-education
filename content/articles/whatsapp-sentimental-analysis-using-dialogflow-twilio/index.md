---
layout: engineering-education
status: publish
published: true
url: /whatsapp-sentimental-analysis-using-dialogflow-twilio/
title: WhatsApp Sentimental Analysis using Dialogflow Twilio Integration
description: This article will help the reader understand how to perform WhatsApp sentimental analysis using Dialogflow Twilio integration.
author: jethro-magaji
date: 2021-11-14T00:00:00-14:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/hero.jpg
    alt: Dialogflow Twilio Integration Hero Image
---
This tutorial will show you how to build a WhatsApp chatbot that predicts how people feel towards a particular topic using sentiment analysis. 
<!--more-->
We will build this chatbot using [Dialogflow](https://cloud.google.com/dialogflow/docs) and the Google Cloud Natural Language Processing API to analyze the tweets.

We will also use Twilio for WhatsApp integration.

### Prerequisites
To follow along, you'll need:
- A [Twilio](https://www.twilio.com/try-twilio) account.
- A [Google Cloud](https://cloud.google.com/) account.
- A [Twitter developer](https://developer.twitter.com/en) account.
- A [WhatsApp](https://www.whatsapp.com/) account.
- A [Dialogflow](https://dialogflow.cloud.google.com/#/login) account.
- Have [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [ngrok](https://ngrok.com/) installed.

### Creating a Google Cloud account
You will need to [log in](https://accounts.google.com/signin/v2/identifier?service=ahsid&passive=true&continue=https%3A%2F%2Fcloud.google.com%2F_d%2Freturn%3Fcontinue%3Dhttps%253A%252F%252Fcloud.google.com%252F&flowName=GlifWebSignIn&flowEntry=ServiceLogin) or create a [Google Cloud account](https://cloud.google.com/) to use the Cloud Natural Language API. 

Create an account with your credit card details but you won't be charged unless you exceed the free tier limit. 

Additionally, new users get [$300 in free credits](https://cloud.google.com/free/docs/gcp-free-tier/#free-trial).

After you have created your account or signed in, create a `New Project`:

For existing users, navigate to your dashboard `app bar` and click on the current project name dropdown.

![Cloud account](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/cloud-account.png)

Next, click on the `NEW PROJECT` button:

![GCP Project](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/gcp-project.png)

Then, add the required details for your project and click on `CREATE` to generate a new project.

![Google cloud project](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/create-project.png)

Next, you need to enable the Cloud Natural Language API for the project to perform sentiment analysis.

To enable it, find the `Getting Started` card on your new project's main dashboard.

Click on `Explore and Enable APIs`, and search for `Cloud Natural Language API` in the top search bar:

![Cloud NLP](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/cloud-nlp.png)

If you are prompted to activate billing, select `ENABLE BILLING`. You won't be charged anything.

### Building an intent in Dialogflow
Dialogflow, powered by Google, offers a framework for understanding Natural Language. It enables us to create interfaces for communication. 

We will use Dialogflow with a fulfillment webhook. A fulfillment webhook allows you to write JavaScript code in Dialogflow's in-line editor and deploy it as a cloud function. 

We will use this to feature build a conversational experience for the WhatsApp chatbot. If you don’t have a [Dialogflow account](https://dialogflow.cloud.google.com/#/login), you should create one.

Once you are logged in to Dialogflow, create an agent by clicking the **+ Create Agent** button towards the top left of the screen. 

Name your agent and then under the **Google Project** label, select your Google Cloud project to import. Then hit the blue **CREATE** button at the top of the screen.

Note that you need a basic understanding of Dialogflow. Please check out the [official documentation](https://cloud.google.com/dialogflow/docs/).

Next, create an intent for the conversation by clicking the **+** button next to **Intents**. You'll see a screen that looks like this:

![Create Intent](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent.png)

Under the **Training phrases** heading, click the **ADD TRAINING PHRASES** button.

To add a `training phrase` type in a question that a user might ask. For example, How do people feel about Twilio?.

In the above example, the user wants to know more about Twilio. Using Dialogflow Natural Language Processing, we can replace the search word with an entity that accepts different parameters.

Now, the training phrase can be rewritten like this; How do people feel about X? The `X`, in this context, is an entity that can accept any parameter.

To do this, type the phrase: How do people feel about X, and then highlight the letter `X` with your cursor. 

At that point, a dialog with a list of entities will show up. Select `@sys.any` as the entity, as shown in the image below. Press the `return` key to submit the training phrase.

![Training phrases on Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent2.png)

Repeat this process for the following training phrases:

- What is **X**
- Search for **X**
- Rate **X**
- Tell me about **X**

![Intent in Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent3.png)

Feel free to create another intent and add more training phrases.

### Action and parameters
The `X` in the training phrases is an entity type that extracts any parameter from the user expression. 

In other words, we turned `X` into a variable that can represent anything.

Dialogflow provides pre-defined [system entities](https://cloud.google.com/dialogflow/docs/entities-system) that can match common data types. 

For example, there are system entities for matching dates, times, colors, email addresses, and so on. You can also create your own [custom entities](https://cloud.google.com/dialogflow/docs/entities-custom).

![Entity in Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent4.png)

### Responses
We also need to add default responses to the chatbot in case our query does not return any results.

Scroll down to the **Responses** section and click the **ADD RESPONSES** button.

You can add the following statements as default responses for the intent:

- I’m not sure about how people feel about `$sys.any` yet!
- Sorry, I couldn’t get any info on `$sys.any`
- Try searching for another word apart from `$sys.any`

![Responses In Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent5.png)

### Fulfillment
This intent also needs a fulfillment webhook to give the correct responses for the user's query. To make this work, toggle **Enable webhook call for this intent** to *on*.

![Webhook in Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent6.png)

After enabling the webhook, click the blue **SAVE** button at the top of the screen. 

Next, click **Fulfillment** from the left side menu. Set the **Disabled** toggle to the right of the **Inline Editor** to **Enabled**. This allows you to write your webhook code inside the Dialogflow.

![Editor for Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-fullfillment.png)

#### Add code to the inline editor
In the *index.js* file tab, add the following code:

```js
// See https&#x3A;//github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";
const functions = require("firebase-functions");
const language = require("@google-cloud/language");
const httpRequest = require("request-promise-native");
const { dialogflow } = require('actions-on-google');
```

The above code imports all the required dependencies.

Next, replace the placeholder with your actual `project ID`, as shown below:

```javascript hl_lines= "5"
// Create an app instance
const app = dialogflow();
const languageClient = new language.LanguageServiceClient({
   projectId: "YOUR_GCLOUD_PROJECTID"
});
```

The above code creates a new instance of the `Dialogflow` app and an instance of the Natural Language Service client. Note that it requires your project ID to work.

#### Create a Twitter developer account
Before moving on, you’ll need to create a developer account with either your existing Twitter account or a [new account](https://twitter.com/).

Navigate to [developer.twitter.com](https://developer.twitter.com/en/apply-for-access) to create a developer account.

![Twitter developer](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twitter-developer.png)

Fill out the description for your app by selecting its use case and reasons why you want to use the Twitter API. 

It might take some time for your app to be approved because of the high number of applications.

Once your application has been approved, proceed and create an app.

Select **Keys and tokens**, then copy and save your API keys somewhere you can easily retrieve them.

Set up a development environment under `Search Tweets: 30-Days/Sandbox` and name the environment. 

I have named mine as `testing`:

![Dev environment](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twitter-developer2.png)

After obtaining your `Twitter API Key` and `API Secret`, head back to the Dialogflow inline editor. 

In the `index.js` file, add the following code:

```javascript hl_lines=”17 18”
// This is the environment for the Twitter premium search api.
// See: https://developer.twitter.com/en/docs/tweets/search/api-reference/premium-search.html
const TWITTER_ENV = "testing";
// This is the endpoint for the Twitter premium search api.
// See: https://developer.twitter.com/en/docs/tweets/search/api-reference/premium-search.html
const TWITTER_SEARCH_ENDPOINT = "30day";
// Constructed a complete base url for the API call.
const TWITTER_SEARCH_URL = "https://api.twitter.com/1.1/tweets/search/"
   .concat(TWITTER_SEARCH_ENDPOINT)
   .concat("/")
   .concat(TWITTER_ENV)
   .concat(".json");
// Load the API credentials into constants for readability’s sake
const CONSUMER_KEY = 'YOUR_TWITTER_API_KEY';
const CONSUMER_SECRET = 'YOUR_TWITTER_SECRET_KEY';
process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements
```

Next, add the code below:

```javascript
/*
 Filter out the retweets from the results returned from the Twitter premium search API.
* @param searchResults
* @returns {Array}
*/
function filterRetweets(searchResults) {
   let filtered = [];
   searchResults.forEach((result) => {
      if (!result.retweeted_status) {
      // Check if details about a retweet exist, if they do, do not execute this block
      filtered.push(result); // Since this is not a retweet, push it
      }
   });
   return filtered;
}
/*
* Pluck the ids from the result array containing tweet objects returned from the Twitter premium search API.
* @param searchResults
* @returns {Array}
*/
function extractText(searchResults) {
   let tweets = [];
      searchResults.forEach((result) => {
      tweets.push(result.text); // Push the tweet's ID into the array
   });
   return tweets;
}
```

This code defines a helper function that removes all retweets from the search results and saves them to an array. 

The above code also extracts all tweets from the API response and adds them to an array.

Next, add the following code to access the `intent()` method on your app. It passes the name of the intent and two params.

It then sets the input equal to `params.any` and requests the Twitter API.

```js
// The Sentiment intent
app.intent('Sentiment', (agent, params) => {
const inputEntity = params.any;
   let request_options = {
   url: TWITTER_SEARCH_URL,
   oauth: { consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET },
   json: true,
   headers: {
   "content-type": "application/json"
   },
   body: { query: inputEntity.concat(" lang:en"), }
};
// Send a request to the twitter api, then return the results (body)
return httpRequest.post(request_options).then((body) => {
   // Get the results without all the retweets and extract the text of the tweet to be analyzed
   let tweetText = extractText(filterRetweets(body.results));
   // Create a nlpClient request to detect the sentiment of all the tweets fetched
   return languageClient.analyzeSentiment({
      document: {
      content: tweetText.join(" "),
      type: "PLAIN_TEXT"
   }
 }).then(results => {
   // Get the overall document score (all the tweets concatenated together)
   const sentiment = results[0].documentSentiment.score;
   // 0 -> 0.1 is a somewhat neutral score
   if (sentiment >= 0 && sentiment <= 0.1) {
         agent.add(`People have mixed feelings about ${inputEntity}.`);
         // Less than 0 is usually negative
      } else if (sentiment < 0) {
         agent.add(`People feel negatively about ${inputEntity}.`);
         // Greater than 0.1 usually indicates positive.
      } else {
         agent.add(`People feel positively about ${inputEntity}.`);
      }
   }).catch(err => {
      console.log(err);
      agent.add("Sorry, something went wrong.");
   });
   }).catch(err => {
      console.log(err);
      agent.add("Sorry, something went wrong.");
   });
});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
```

The above code submits the response from Twitter to the Natural Language Processing API. 

The NLP returns a sentiment score (results), which you save to a variable.

It also fetches a response from the Action based on whether the score from the NLP API is positive or negative. 

`conv.close` ends the conversation each time the Action responds.

#### Add your code to the package.json file
In your inline editor, switch to the `package.json` tab. 

Copy and paste the following content inside this file:

```json
{
   "name": "dialogflowFirebaseFulfillment",
   "description": "This is the default fulfillment for a Dialogflow agent using Cloud Functions for Firebase",
   "version": "0.0.1",
   "private": true,
   "license": "Apache Version 2.0",
   "author": "Google Inc.",
   "engines": {
   "node": "8"
   },
   "scripts": {
      "start": "firebase serve --only functions:dialogflowFirebaseFulfillment",
      "deploy": "firebase deploy --only functions:dialogflowFirebaseFulfillment"
   },
   "dependencies": {
      "firebase-admin": "^5.13.1",
      "firebase-functions": "^2.0.2",
      "request": "^2.87.0",
      "request-promise-native": "^1.0.5",
      "dialogflow-fulfillment": "^0.5.0",
      "@google-cloud/language": "2.0.0"
   }
}
```

The above content holds all relevant metadata and dependencies for your project.

At this point, you're done setting up your Dialogflow fulfillment webhook. Press the **DEPLOY** button in the inline editor to deploy your cloud function.

### Integrating Twilio with Dialogflow
Create a new directory on your computer. 

In this folder, initialize a Node.js project:

```bash
mkdir whatsapp-sentiments
cd whatsapp-sentiments
npm init -y
```

We need to install the following packages:

- [Nodemon](https://www.npmjs.com/package/nodemon) is a tool that helps develop Node.js based applications by automatically restarting the server whenever file changes.
- The [Dialogflow](https://www.npmjs.com/package/dialogflow) package is an API client for Node.js.
- [Twilio Node Helper library](https://www.npmjs.com/package/twilio) provides access to the Twilio API.
- [Express](https://www.npmjs.com/package/express) lets you structure a web application to handle multiple HTTP requests at a specific URL.
- [Body-parser](https://www.npmjs.com/package/body-parser) is a middleware used to extract the body from incoming requests.
- [UUID](https://www.npmjs.com/package/uuid) is used for identifying information that needs to be unique.

```bash
npm install twilio nodemon express body-parser dialogflow uuid
```

Next, create these files in your_whatsapp-sentiments_ directory:

```bash
touch index.js && touch twilio.js && touch dfservice.js
```

#### Getting your Google Cloud project service keys
In your Google Cloud project dashboard, launch the menu bar, and navigate to the `IAM & ADMIN`, on its drop-down, click on the `Service Accounts`. 

You will see your project ID service account, click on it to open up the service account details. 

Under the `Keys` click on `ADD KEY` and you will see a dialog pop up like the one shown below.

Check the `JSON` key type and click on the `CREATE` button. The JSON file will be downloaded automatically.

![Gcp service account](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/gcp-appengine.png)

#### Setting up Twilio sandbox for WhatsApp
Navigate to the [WhatsApp section of your Twilio Console](https://www.twilio.com/console/sms/whatsapp/learn) to activate the Twilio Sandbox. 

The sandbox allows you to test out the Twilio WhatsApp API using a shared number without waiting for WhatsApp to approve your Twilio number.

After checking the box to activate the sandbox, you will need to send a specific message from your WhatsApp number to the provided universal Twilio WhatsApp number. 

Add the Twilio WhatsApp number to your contact list and send the message. 

After completing this step, you should see the following success screen:

![Twilio WhatsApp sandbox](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twilio-console.png)

#### Adding code to the files
Add the JSON file of your `Google cloud Project service account key` that you recently downloaded to your code directory and rename it to `config.js`.

Go to your main dashboard [Twilio console](https://www.twilio.com/login?g=%2Fconsole%3F_ga%3D2.265740303.1482277847.1606396463-363876625.1593051224&t=f7ede302996c9b6272621fa8b186f084683729fa1eeefc629e066dc7938dfe6a) and find your `Account SID` and `Auth Token`. 

Copy and paste these values into the `config.js` file, as shown below:

![Twilio developer console](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twilio-console2.png)

```js
module.exports = {
   accountSid: 'YOUR_TWILIO_ACCOUNT_SID',
   authToken: 'YOUR_TWILIO_AUTH_TOKEN',
   "DF_LANGUAGE_CODE": "en-US", //Dialogflow default language
   //The rest of the code below will contain all the details of your Google Cloud service account keys
}
```

Replace your `Twilio account SID` and `Auth token` with these placeholders: 'YOUR_TWILIO_ACCOUNT_SID' and 'YOUR_TWILIO_AUTH_TOKEN'.

Add this code in the *index.js* file:

```js
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const DF = require("./dfservice");
const twilio = require('./twilio');
const app = express();
//port for local host
const port = 80;
//creates a new sessionID
const sessionIds = new Map();
```

This code allows your app to use `express`, `body-parser`, `uuid`, `Dialogflow file`, and `Twilio` library.

```js
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/', async(req, res) => {
   const sender = req.body.From;
   const text = req.body.Body;
   const from = req.body.To;
   setSessionAndUser(sender);
   let response;
   try {
      /// Response from Dialogflow
      response = await DF.sendTextQueryToDialogFlow(sessionIds, sender, text);
      /// Response sent to Twilio
      await twilio.sendText(from, response.fulfillmentText || response.queryText, sender).then(m => console.log(m.sid))
   } catch (error) {
      console.log(error)
   }
});
```

```js
/// To check if theres an existing sessionID or not
function setSessionAndUser(senderID) {
   if (!sessionIds.has(senderID)) {
   sessionIds.set(senderID, uuid.v1());
   }
}
app.listen(port, () => console.log(`Magic on ${port}`));
```

Whenever a message is sent, a new session begins and you will see the sender number, the receiver (Universal Twilio number), and the message. 

The text query will be sent to Dialogflow, and then the response is sent to Twilio in form of a fulfillment text and you will receive a WhatsApp message from Twilio.

Add this code in the *dfservice.js* file:

```js
const dialogflow = require('dialogflow');
const config = require('./config');
const credentials = {
   client_email: config.client_email,
   private_key: config.private_key,
};
const sessionClient = new dialogflow.SessionsClient(
   {
      projectId: config.project_id,
      credentials
   }
);
```

```js
module.exports = {
   async sendTextQueryToDialogFlow(sessionIds, sender, text, params = {}) {
   const sessionPath = sessionClient.sessionPath(config.project_id, sessionIds.get(sender));
      ///Request payload
      const request = {
         session: sessionPath,
         queryInput: {
         text: {
         text: text,
         languageCode: config.DF_LANGUAGE_CODE, ///Dialogflow default language
      },
   },
      queryParams: {
         payload: {
         data: params
         }
      }
   };
   const responses = await sessionClient.detectIntent(request);
      return responses[0].queryResult;
   },
      async sendEventToDialogFlow(sessionIds, handleDialogFlowResponse, sender, event, params = {}) {
         const sessionPath = sessionClient.sessionPath(config.GOOGLE_PROJECT_ID, sessionIds.get(sender));
            const request = {
               session: sessionPath,
               queryInput: {
               event: {
               name: event,
               parameters: structjson.jsonToStructProto(params), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
               languageCode: config.DF_LANGUAGE_CODE,
            },
         }
       };
   const responses = await sessionClient.detectIntent(request);
   const result = responses[0].queryResult;
   handleDialogFlowResponse(sender, result);
   }
}
```

The code above sends the text query to Dialogflow using the default request payload that receives the text and sessionPath. 

The intent for the text will be detected and the response will be sent to Twilio.

Add this code in the *twilio.js* file:

```js
const config = require('./config');
const client = require('twilio')(config.accountSid, config.authToken);
   function sendText(from, message, to) {
      console.log(from,message, to);
      return client.messages
         .create({
         from: from,
         body: message,
         to: to
   })
}
module.exports = { sendText }
```

The code above loads the Twilio library and sends a message from the universal Twilio WhatsApp number to your number.

### Creating a webhook with Ngrok
Using Ngrok you can deploy your locally hosted web server to the internet with little effort.

You can download [Ngrok](https://ngrok.com/) Command Line Interface (CLI) to get started.

Open up your command line to run your project on localhost using this command:

```bash
Nodemon index.js
```

After running this command you will get the `Magic on 80` success message.

Next, open up your `Ngrok CLI` and start an HTTP tunnel forwarding to your local port 80 using this command:

```bash
Ngrok http 80
```

On your terminal, you should see this:

![Ngrok terminal](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/ngrok-terminal.png)

Copy the provided URL by Ngrok since we will use it in the webhook.

### Add the webhook to Twilio
Head up to your Twilio console and navigate to the programmable messaging tab.

Navigate to the `sandbox settings` and paste in the `Ngrok URL` in the `WHEN A MESSAGE COMES IN` field and save it. 

Your screen should look like this:

![Twilio WhatsApp sandbox](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twilio-whatapp.png)

### Testing the webhook
You have successfully connected your webhook with Twilio, now you can test the chatbot on WhatsApp by asking it some questions and seeing the responses. 

Here’s what I got:

![WhatsApp chat conversation](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/whatsapp-twilio.png)

![WhatsApp chat conversation](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/whatsapp-twilio2.png)

### Conclusion
Congratulations! You have successfully created a chatbot using Dialogflow, WhatsApp, and Google Cloud Natural Language Processing API that performs sentimental analysis on tweets from Twitter using Twitter’s API. 

With this knowledge, you can now build chatbots for different kinds of applications using an external API, Twilio, Google Cloud APIs, and Dialogflow.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)