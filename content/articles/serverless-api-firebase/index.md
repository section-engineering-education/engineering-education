---
layout: engineering-education
status: publish
published: true
url: /serverless-api-firebase/
title: Build a Serverless API using Firebase Functions
description: This article walks a beginner through creating, writing and deploying a simple RESTful API using the firebase-cli tools onto a publicly hosted link.
author: saiharsha-balasubramaniam
date: 2020-07-08T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/serverless-api-firebase/hero.jpg
    alt: serverless api firebase image

---
If you're into JAMstack, you'd know that robust APIs are extremely important for a better developer experience!
<!--more-->

### Table of Contents

- [Introduction](#introduction)
- [Prerequisites and Installation](#prerequisites-and-installation)
- [Login and Initialize](#login-and-initialize)
- [Write the API](#write-the-api)
- [Deploy](#deploy)
- [Test much](#test-much)
- [Conclusion](#conclusion)

### Introduction
For beginners and for small scale applications, **building an API backend** and **deploying** it on the web can be a tedious task sometimes. If you choose to deploy it in a **Virtual Machine** in any of the cloud services like Google Cloud, Azure, or AWS, it can be daunting to set up.

One more downside to this is that since a virtual machine is an **Infrastructure as a Service** (IaaS), you'd be charged by the hour. You would essentially be charged for the time the VM is running, regardless of whether you're making API calls or not.🙁

Enter, Serverless Functions...

![Serverless](/engineering-education/serverless-api-firebase/serverless.jpeg)

No, it's not like you think. Serverless functions do run on a server. But they're called so because it eliminates the need for managing the software and hardware of the server. It is as simple as copying and pasting code and hitting **deploy**.

Sounds amazing, right? Let's build a basic serverless API and deploy it through the firebase CLI.🔥

### Prerequisites and Installation

Let's get started. First, please install Node from [here](https://nodejs.org/en/).

- Now, once you're done installing, let's initialize our project.
- Create a new directory for your project.
- Open up a terminal, cd to the project directory, and type `npm init`
![Node Initialization](/engineering-education/serverless-api-firebase/npm-setup.png)
- For now, accept the default options and let the project be initialized.
- Install firebase by typing, `npm install -g firebase-tools`
- Awesome!

### Login and Initialize

#### Login and Validate
- Login to Firebase by entering this command, `firebase login`
- It will open a window in the browser. You can log in there.
- Return to the terminal once you've logged in.

#### Initialize
Let's initialize a project in firebase.

- Type `firebase init`
![Firebase Initialization](/engineering-education/serverless-api-firebase/firebase-init.png)
- When it asks for what CLI features are needed, just choose Firebase Functions for now.
![Firebase Setup](/engineering-education/serverless-api-firebase/functions-setup.png)
- It will ask to connect to a project, create a new one, and drop in a name of your choice.
- Choose **`JavaScript`** as the language for functions.
- Choose to not use `ESLint`, as we don't really need it now.
- Now, our firebase project is ready!
![Project Setup](/engineering-education/serverless-api-firebase/project-setup.png)

### Write the API
Now, let's jump into the programming part.

In your project directory, the **`functions/index.js`** file is the entry point of your function. That's the file that will always be executed. We have to edit only this file. So let's start editing!

```javascript {linenos=inline,linenostart=1}
const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors({ origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/hello", (req, res) => {
    console.log("hello!")
    res.send("hello!")
})

app.get("/world", (req, res) => {
    console.log("world!")
    res.send("world!")
})

exports.app = functions.https.onRequest(app)
```

**A brief explanation of this code**
- **Lines 1-4** -> We import the needed packages
- **Lines 6-9** -> We initialize express, and set options for CORS handling.
- **Lines 11-14** -> This is our main api route, **`/hello`**. If we send a request to /hello, we'll get a server response that says, **"hello!"**
- **Lines 16-19** -> This is our main api route, **`/world`**. If we send a request to /world, we'll get a server response that says, **"world!"**
- **Line 21** -> This line is a Firebase Functions **method** that says that the function would be **triggered** if a HTTP Request is sent to the function URL.

Thus, we have a very basic API with two routes. Let's go on and deploy it!

First though, we have to specify the function dependencies in our **`package.json`**. Now proceed to the package.json file **within the functions folder**, and append the following lines within the dependencies object.

```json
    "axios": "^0.19.2",
    "beautiful-dom": "^1.0.7",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1"
```

### Deploy
Let's deploy our function! Enter the command, `firebase deploy` in the terminal.

![Firebase, Deploy](/engineering-education/serverless-api-firebase/deploy.png)

You have successfully deployed the API! Yay! Now get your API URL from the [Firebase Console](https://console.firebase.google.com).

### Test, test, test
Now that we have deployed our API, we also need to test whether it behaves properly. For this, we can use the amazing API testing tool [Postman](https://www.postman.com/downloads/), which is a GUI tool for API testing, or CURL, which is a CLI utility for sending HTTP requests.

Install and open Postman, and with the request type as GET, enter the URL of your function, and try sending a request to "/world".

You'd get a response that looks something like this:

![API Response](/engineering-education/serverless-api-firebase/api-res.png)

The API works really well. You could also try to send a request to "/hello" and check it out.

**Note:** There's also a way by which you can deploy your API locally and test it before deploying it to the web by running the command, `firebase emulators:start`. Check these docs for more info -> [Link](https://firebase.google.com/docs/functions/get-started)

### Conclusion
We have successfully written and deployed a super simple API onto Firebase! We could also make use of Firebase’s Firestore and other features and integrate them into functions. We can create powerful APIs and deploy them with the command or a click of a button!
