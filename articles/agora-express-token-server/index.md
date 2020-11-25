In this tutorial, we will be building a server using Node.js and Express to generate Agora Authentication Tokens.

### Goals
By the end of this tutorial, you’ll know how Agora authentication works and how to set up a Node.js server with Express to dispatch Agora Authentication Tokens.

### Agora
Founded in 2014, Agora.io is a service provider for real-time voice and video. Its core technology is real-time communication (RTC).
Agora provides SDKs to build apps that require real-time engagement like:

- Audio/Video Calls

- Interactive Livestreaming (Audio/ Video)

- Interactive Gaming

- Real-Time Messaging (which is in BETA at the time of writing this article)

Agora is a paid service, but the first 10,000 minutes are free every month. You can check their pricing [here](https://www.agora.io/en/pricing/).

If you'd like to learn more about Agora, visit their [website](https://www.agora.io/en/) or read [this article](https://equalocean.com/analysis/201904121773).

### Overview
We'll be going through these steps in this article:

1. Creating an Agora account
2. Types of Authentication in Agora
3. Development environment
4. Setting up the Server
5. Building Agora Tokens
6. Recap

> If you want to take a look at the final code, check out the [GitHub Repo](https://github.com/zolomohan/react-native-agora-livestreaming-app).

### Prerequisites
The fundamentals of Node.js and Express will not be covered in this tutorial. If you don't know the fundamentals, please refer to [some tutorials](https://reactnative.dev/docs/tutorial) before beginning with this project.

### Creating an Agora account
Head to Agora and create an account. You can reach the signup page from [here](https://sso.agora.io/en/v2/signup).

Fill in the details and create an account or you can signup with Google, GitHub, or Cocos. Once you've signed up, you'll see the dashboard.

![Agora Dashboard](/engineering-education/react-native-agora-livestreaming-app/agora_dashboard.png)

Click on New Project.

You'll see this form. Fill out the Project Name and set the Authentication Mechanism to Testing.

![Agora New Project Form](/engineering-education/react-native-agora-livestreaming-app/agora_new_project.png)

Once you hit on submit, it'll create a new project and you should see it on the Project Management Console.

![Agora Project Management Console](/engineering-education/react-native-agora-livestreaming-app/agora_project_management_console.png)

Now, click on the closed eye icon near the App ID to reveal it and copy that App ID. We'll need this later while setting up Agora in our app.

### Development environment
You need Node.js installed on your machine to set up an Express server. You can download and install Node.js from [here](https://nodejs.org/en/).

### Setting up the Server
Let's install `Express` using `NPM`.

```bash
npm install express
```

Now, we can import `express` in our code to create a simple server module that will listen on port 3000.

```JavaScript
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Agora Auth Token Server"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));
```

You can start the server by running:

```bash
node index.js
```

This server will be listening on port 3000 and when you hit the `'/'` endpoint, it will send "Agora Auth Token Server".

To generate an Agora Authentication Token, we need to install the `agora-access-token` package.

```bash
npm install agora-access-token
```

Let's import this into our code.

```JavaScript
const Agora = require("agora-access-token");
```

### RTC Token
Now, let's add a POST handler for a new endpoint called `'/rtctoken'`.

```JavaScript
app.post("/rtctoken", (req, res) => {
  // Generate Token Here
});
```

When someone requests this endpoint, we will generate an RTC Token and send it back to them.

The `agora-access-token` provides a class called `RtcTokenBuilder` which has a method called `buildTokenWithUid`.

The `buildTokenWithUid` method requires 6 arguments.

1. App ID
2. App Certificate
3. Channel ID
4. User ID
5. User Role
6. Expiration Time

We have the App ID and the App Certificate from the project management console. We will get the Channel ID and the User Role from the request. We will generate a random User ID and set the expiration time of the token in the server.

> Make sure the User ID you generate here is the same as the Optional UID you pass to the SDK in the front-end while joining the channel.

```JavaScript
const appID = "<-- Your App ID Here -->";
const appCertificate = "<-- Your App Certificate Here -->";
```

Let's generate a random User ID. Agora accepts a 32-bit unsigned integer with a value ranging from 1 to (2^32-1) as the User ID.
For the sake of simplicity, let's limit the range to 100,000.

```JavaScript
const uid = Math.floor(Math.random() * 100000);
```

Let's generate the expiration time of the token. You need to provide a timestamp for the expiration time. So let's get the current timestamp using `Date.now()` and add the time (in seconds) from when we want the token to expire.

```JavaScript
const expirationTimeInSeconds = 3600;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
```

There are two types of roles in a channel, Publisher and Subscriber.

- A Publisher is someone who streams audio/video in the channel and also receives audio/video from other publishers.

- A Subscriber will not be able to stream audio/video but can recieve audio/video streams from publishers.

For Example, In the case of a Video Conference, everyone is a publisher. But in case of a Livestream, only some users will be publishers while the others will be subscribers.

We should get whether the user is a Publisher or Subscriber in the request body. The `agora-access-token` provides constants for Publisher and Subscriber.

```JavaScript
const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
```

We should also get the Channel ID from the request body.

```JavaScript
const channel = req.body.channel;
```

Let's pass these data to `buildTokenWithUid` to generate the Token.

```JavaScript
const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, privilegeExpiredTs);
```

Now, Let's return the User ID and the Token as the response.

```JavaScript
res.send({ uid, token });
```

Final Code:

```JavaScript
app.post("/rtctoken", (req, res) => {
  const appID = "e004df68b67841a1b6ea7c08b7225814";
  const appCertificate = "521c7307f1d547e080c34585dd20662e";
  const uid = Math.floor(Math.random() * 100000);
  const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const channel = req.body.channel;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, privilegeExpiredTs);
  res.send({ uid, token });
});
```

### RTM Token
Now, let's add a POST handler for a new endpoint called `'/rtmtoken'`.

```JavaScript
app.post("/rtmtoken", (req, res) => {
  // Generate Token Here
});
```

When someone requests this endpoint, we will generate an RTM Token and send it back to them.

The `agora-access-token` provides a class called `RtmTokenBuilder` which has a method called `buildToken`.

The `buildToken` method requires 5 arguments.

1. App ID
2. App Certificate
3. User Account
4. User Role
5. Expiration Time

We have the App ID and the App Certificate from the project management console.

```JavaScript
const appID = "<-- Your App ID Here -->";
const appCertificate = "<-- Your App Certificate Here -->";
```

We should get the User Account from the request.

```JavaScript
const uid = req.body.user;
```

Let's generate the expiration time of the token. You need to provide a timestamp for the expiration time. So let's get the current timestamp using `Date.now()` and add the time (in seconds) from when we want the token to expire.

```JavaScript
const expirationTimeInSeconds = 3600;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
```

There's only one role in RTM, which is an RTM User.

```JavaScript
const role = Agora.RtmRole.Rtm_User;
```

Let's pass these data to `buildToken` to generate the token.

```JavaScript
const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate, uid, role, privilegeExpiredTs);
```

Now, Let's return the User ID and the Token as the response.

```JavaScript
res.send({ uid, token });
```

Final Code:

```JavaScript
app.post("/rtmtoken", (req, res) => {
  const appID = "e004df68b67841a1b6ea7c08b7225814";
  const appCertificate = "521c7307f1d547e080c34585dd20662e";
  const uid = req.body.user;
  const role = Agora.RtmRole.Rtm_User;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate, uid, role, privilegeExpiredTs);
  res.send({ uid, token });
});
```