
Today, you will build a WhatsApp chatbot that will tell you how people feel about a topic based on sentiment analysis of tweets on that topic. You will build this chatbot using [Dialogflow](https://cloud.google.com/dialogflow/docs) and the Google Cloud Natural Language Processing API to analyze the tweets, and Twilio for WhatsApp integration.

### Prerequisites

- A free [Twilio](https://www.twilio.com/try-twilio) Account
- A [Google Cloud](https://cloud.google.com/) Account
- A [Twitter developer](https://developer.twitter.com/en) Account
- A [WhatsApp](https://www.whatsapp.com/) Account
- A [Dialogflow](https://dialogflow.cloud.google.com/#/login) Account
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
- An installation of [ngrok](https://ngrok.com/)

### Creating a Google Cloud account

You will need to [log in](https://accounts.google.com/signin/v2/identifier?service=ahsid&passive=true&continue=https%3A%2F%2Fcloud.google.com%2F_d%2Freturn%3Fcontinue%3Dhttps%253A%252F%252Fcloud.google.com%252F&flowName=GlifWebSignIn&flowEntry=ServiceLogin) or create a [Google Cloud account](https://cloud.google.com/) to use the Cloud Natural Language API. Create an account with your credit card details but you won’t be charged unless you exceed the free tier limit. Additionally, new users get [$300 in free credits](https://cloud.google.com/free/docs/gcp-free-tier/#free-trial).

After you have created your account or signed in, create a “New Project”:

For existing users go to your dashboard app bar and click on the current project name dropdown.

![Cloud account](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/cloud-account.png)

Next, click on the “NEW PROJECT” button.

![GCP Project](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/gcp-project.png)

Then, add the required details for your project and click on “CREATE” to create a new project.

![Google cloud project](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/create-project.png "An image on creating a Google Cloud project.")

Next, you will need to enable the Cloud Natural Language API for the project to perform sentiment analysis.

To enable it, find the “Getting Started” card on your new project’s main dashboard, click on “Explore and Enable APIs”, and search for “Cloud Natural Language API” in the top search bar:

![Cloud NLP](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/cloud-nlp.png "An image on enabling Cloud Natural Language API")

If you see a modal telling you to enable billing, select “ENABLE BILLING”. You won't be charged anything, but you need to tell Google Cloud Platform to link this API to your payment method.

### Building an intent in Dialogflow

Dialogflow, powered by Google, offers an application for understanding Natural Language that enables us to create interfaces for communication. You’re going to use Dialogflow with a fulfillment webhook. A fulfillment webhook allows you to write JavaScript code in the Dialogflow in-line editor and deploy it as a cloud function. You’ll use this to build a conversational experience for the WhatsApp chatbot. If you don’t have a [Dialogflow account](https://dialogflow.cloud.google.com/#/login) you can create one.

Once logged in to Dialogflow, create an agent by clicking the **+ Create Agent** button towards the top left of the screen. Give your agent a name and then under the **Google Project** label, select your Google Cloud project for importing. To finish, hit the blue **CREATE** button at the top of the screen.

You will need a basic understanding of Dialogflow. If you will need to read up, please check out the [official documentation](https://cloud.google.com/dialogflow/docs/).

Next, create an intent for the conversation by clicking the **+** button next to **Intents**. You’ll see a screen that looks like this:

![Create Intent](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent.png "create intent screen")

Under the **Training phrases** heading, click the **ADD TRAINING PHRASES** button.

To add a training phrase type in a phrase that a user might ask, for example: “How do people feel about “Twilio”?.

In this example, the user wants to know more about “Twilio”, but it could be any other search word or phrase. Using Dialogflow Natural Language Processing you can replace the search word with an entity that can carry any parameter.

Now, the training can be rewritten like this; How do people feel about “X”? The “X” here is an entity that can carry any parameter.

To do this, type the phrase: “How do people feel about X” and then highlight the letter “X” with your cursor. At that point, a dialog with a list of entities will show up. Select `@sys.any` as the entity, as shown in the image below. Hit the `return` key to submit the training phrase.

![Training phrases on Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent2.png "Adding Dialoflow training phrases image")

Repeat this process for the following training phrases:

- What is **X**
- Search for **X**
- Rate **X**
- Tell me about **X**

![Intent in Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent3.png "An image showing how to adding training phrases to an intent in Dialogflow")

Do feel free to create another intent and add training phrases of your choice if you feel the need to.

### Action and parameters

The “X” in the training phrases is an entity type that extracts any parameter from the user expression. So, we turned `X` into a variable that can represent anything.

Dialogflow provides pre-defined [system entities](https://cloud.google.com/dialogflow/docs/entities-system) that can match many common types of data. For example, there are system entities for matching dates, times, colors, email addresses, and so on. You can also create your own [custom entities](https://cloud.google.com/dialogflow/docs/entities-custom) for matching custom data.

![Entity in Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent4.png "An image showing how to creating an entity in Dialogflow")

### Responses

You need to also add default responses to the chatbot in the case that there’s no result for the query made.

Scroll down past where you added the training phrases to a section titled **Responses**. Click the button that says **ADD RESPONSES**.

You can add the following statements as default responses for the intent:

- I’m not sure about how people feel about `$sys.any` yet!
- Sorry, I couldn’t get any info on `$sys.any`
- Try searching for another word apart from `$sys.any`

![Responses In Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent5.png "An image showing how to adding default responses In Dialogflow")

### Fulfillment

This intent will also need a fulfillment webhook in order to give the correct responses for the query made by the user. To make this work, toggle **Enable webhook call for this intent** to be _on_.

![Webhook in Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-intent6.png "An image showing how to enable webhook in Dialogflow")

After enabling the webhook, click the blue **SAVE** button at the top of the screen. Next, click **Fulfillment** from the left side menu. Switch the **Disabled** toggle to the right of the title **Inline Editor,** to **Enabled**. This allows you to write your webhook code right inside of Dialogflow.

![Editor for Dialogflow](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/dialogflow-fullfillment.png "An image showing how to enabling the Inline Editor for Dialogflow")

#### _Add your code to the inline editor_

In the_index.js_ file tab, add the following code:

```javascript
// See https&#x3A;//github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";
const functions = require("firebase-functions");
const language = require("@google-cloud/language");
const httpRequest = require("request-promise-native");
const { dialogflow } = require('actions-on-google');
```

The code imports all the required dependencies.

Below the above code, add the following, taking care to replace the placeholder with your actual project ID, as shown on the highlighted line:

```javascript hl_lines=”5”
// Create an app instance
const app = dialogflow();
const languageClient = new language.LanguageServiceClient({
   projectId: "YOUR_GCLOUD_PROJECTID"
});
```

This code creates a new instance of the Dialogflow app and an instance of the Natural Language Service client. It requires your project ID to work.

#### Create a Twitter developer account

Before moving on, you’ll need to create a developer account with either your existing Twitter account or a [new account](https://twitter.com/).

Then, go to [developer.twitter.com](https://developer.twitter.com/en/apply-for-access) to create a developer account.

![Twitter developer](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twitter-developer.png "Twitter developer account application image")

Fill out the description of use for your app by selecting the use case for your app and writing out the reasons you want to use the Twitter API. It might take some time for your application to be approved because of the high number of applications.

Once your application has been approved, head back to Create an App by naming your app and describing how your app will be used.

Then select **Keys and tokens**, then copy and save your API keys somewhere you can easily retrieve them.

Set up a development environment under “Search Tweets: 30-Days/Sandbox” and name the environment. I have named mine “testing”:

![Dev environment](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twitter-developer2.png "An image on setting up a dev environment on a twitter developer account")

After obtaining your Twitter API Key and API Secret, head back to the Dialogflow inline editor. In the_index.js_ file, add the following code below what you have so far, replacing the placeholder API and secret values with the ones you just obtained from Twitter.

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

Continuing on, add the following code beneath the existing code:

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

This code defines a helper function that removes all retweets from the search results and saves them to an array. The code also extracts all the tweets from the API response and saves them to an array.

Next, copy the following code and paste it below what exists so far in order to call the `intent()` method on your app. It passes the name of the intent you created_Sentiment_ and two params, then sets the input equal to params.any and makes a request to the Twitter API using what the user said to the Action and API credentials.

```javascript
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

This code submits the response from Twitter to the Natural Language Processing API. The NLP returns a sentiment score (results), which you save to a variable and returns a response from the Action based on whether the score from the NLP API is positive or negative. `conv.close` ends the conversation each time the Action responds.

#### Add your code to the package.json file

In your inline editor, switch to the tab called package.json. Copy and paste the following json inside this file:

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

This code holds all the relevant metadata and dependencies for your project.

At this point, you’re done setting up your Dialogflow fulfillment webhook. Press the **DEPLOY** button below the inline editor to deploy your cloud function.

### Integrating Twilio with Dialogflow

Create a new directory on your computer, change into it, and initialize a new Node.js project:

```bash
mkdir whatsapp-sentiments
cd whatsapp-sentiments
npm init -y
```

Using the command below, install the following packages:

- [Nodemon](https://www.npmjs.com/package/nodemon) is a tool that helps develop NodeJs based applications by automatically restarting the node application when file changes in the directory are detected.
- The [Dialogflow](https://www.npmjs.com/package/dialogflow) package is an API client for Node.js.
- [Twilio Node Helper Library](https://www.npmjs.com/package/twilio) provides access to the Twilio API.
- [Express](https://www.npmjs.com/package/express) lets you structure a web application to handle multiple different HTTP requests at a specific URL.
- [Body-parser](https://www.npmjs.com/package/body-parser) is a middleware used to extract the body from the incoming requests.
- [UUID](https://www.npmjs.com/package/uuid) is used for identifying information that needs to be unique.

```bash
npm install twilio nodemon express body-parser dialogflow uuid
```

Next, create these files in your_whatsapp-sentiments_ directory:

```bash
touch index.js && touch twilio.js && touch dfservice.js
```

#### Getting your Google Cloud project service keys

Head to your Google Cloud project dashboard. Open up the menu bar, and go to the “IAM & ADMIN”, on its drop-down click on the “Service Accounts”. Then you will see your project ID service account, click on it to open up the service account details, under the “Keys” click on “ADD KEY” and you will see a dialog pop up like this below, check the “JSON” key type, once you click on “CREATE” the JSON file will be downloaded automatically.

![Gcp service account](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/gcp-appengine.png "An image showing how to download a JSON service account key")

#### Setting up Twilio sandbox for WhatsApp

Go to the [WhatsApp section of your Twilio Console](https://www.twilio.com/console/sms/whatsapp/learn) to activate the Twilio Sandbox for WhatsApp. The sandbox allows you to test out the Twilio WhatsApp API using a universal shared number without the need to wait for WhatsApp to approve your Twilio number.

After checking the box to activate the sandbox, they will ask you to send a specific message from your WhatsApp number to the provided universal Twilio WhatsApp number. Add the Twilio WhatsApp number to your contact list and send the message. After completing this step, you will get this success screen:

![Twilio WhatsApp sandbox](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twilio-console.png "A image  showing success message for Twilio WhatsApp sandbox.")

#### Adding code to the files

Add the JSON file of your ‘Google cloud Project service account key’ you recently downloaded to your code directory and rename it to “_config.js_”.

Go to your main dashboard [Twilio console](https://www.twilio.com/login?g=%2Fconsole%3F_ga%3D2.265740303.1482277847.1606396463-363876625.1593051224&t=f7ede302996c9b6272621fa8b186f084683729fa1eeefc629e066dc7938dfe6a) and find your** “Account SID” and “Auth Token”. Copy and paste these values into the “_config.js_” file. Your “_config.js”_ file should look like this:

![Twilio developer console](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twilio-console2.png "Twilio console image")

```javascript
module.exports = {
   accountSid: 'YOUR_TWILIO_ACCOUNT_SID',
   authToken: 'YOUR_TWILIO_AUTH_TOKEN',
   "DF_LANGUAGE_CODE": "en-US", //Dialogflow default language
   //The rest of the code below will contain all the details of your Google Cloud service account keys
}
```

Replace your Twilio account SID and Auth token with these placeholders; 'YOUR_TWILIO_ACCOUNT_SID' and 'YOUR_TWILIO_AUTH_TOKEN'

Add this code in the “_index.js”_ file

```javascript
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

This code allows your app to use the express, body-parser, uuid, Dialogflow file and Twilio library.

```javascript
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

```javascript
/// To check if theres an existing sessionID or not
function setSessionAndUser(senderID) {
   if (!sessionIds.has(senderID)) {
   sessionIds.set(senderID, uuid.v1());
   }
}
app.listen(port, () => console.log(`Magic on ${port}`));
```

Whenever a message is sent, a new session begins and you will see the sender number, the receiver (Universal Twilio number), and the message. The text query will be sent to Dialogflow, and then the response is sent to Twilio in form of a fulfillment text and you will receive a WhatsApp message from Twilio.

Add this code in the “_dfservice.js”_ file

```javascript
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

```javascript
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

The code above sends the text query to Dialogflow using the Dialogflow default request payload that receives the text and sessionPath. The intent for the text will be detected and the response for the intent will be sent to Twilio.

Add this code in the “twilio.js”_ file

```javascript
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

Using Ngrok you can make your locally hosted web server deployed to the internet with little effort.

You can download [Ngrok](https://ngrok.com/) Command Line Interface (CLI) to get started.

Open up your command line to run your project on localhost using this command:

```bash
Nodemon index.js
```

After running this command you will get a success message of “Magic on 80”.

Next, open up your Ngrok CLI and start an HTTP tunnel forwarding to your local port 80 using this command:

```bash
Ngrok http 80
```

On your terminal you should see this:

![Ngrok terminal](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/ngrok-terminal.png "An image of a command line interface of Ngrok")

Copy the URL provided by Ngrok, you are going to use it for your webhook.

### Add the webhook to Twilio

Head up to your Twilio console and navigate to the programmable messaging tab and go to the sandbox settings, paste in the Ngrok URL in the “WHEN A MESSAGE COMES IN” field and save it, your screen should look like this:

![Twilio WhatsApp sandbox](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/twilio-whatapp.png "An image of a screen showing Twilio WhatsApp webhook settings ")

### Testing the webhook

You have successfully connected your webhook with Twilio, now you can test the chatbot on WhatsApp by asking it some questions and see the response you will get. Here’s what I got:

![WhatsApp chat conversation](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/whatsapp-twilio.png "An image showing WhatsApp chat conversation using Twilio integration")![WhatsApp chat conversation](/engineering-education/whatsapp-sentimental-analysis-using-dialogflow-twilio/whatsapp-twilio2.png "An image showing WhatsApp chat conversation using Twilio integration")

### Conclusion

Congratulations! You have successfully created a chatbot using Dialogflow, WhatsApp, and Google Cloud Natural Language Processing API that performs sentimental analysis on tweets from Twitter using Twitter’s API. With this knowledge, you can nowbuild chatbots for different kinds of applications using an external API, Twilio, Google Cloud APIs, and Dialogflow.
_I would like to give [Major League Hackathon (MLH)](https://mlh.io/) credits for organizing a Local Host event on building a sentimental analysis chatbot for Actions on Google using Dialogflow._
