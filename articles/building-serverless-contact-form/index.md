---
layout: engineering-education
status: publish
published: true
url: /engineering-education/building-serverless-contact-form/
title: Building a Serverless Contact Form with Google Cloud Functions
description: A walk through on how to build a serverless contact form, using google cloud functions. Known as FaaS or functions as a service.
author: saiharsha-balasubramaniam
date: 2020-06-16T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-serverless-contact-form/hero.jpg
    alt: cloud image example server
---
In this post, let’s get a quick hands-on and take a look at how to write and deploy a serverless function.

First off, what is serverless architecture? It essentially means that you write a snippet of code for accomplishing a certain task, and deploy it on the cloud. The need for server software and hardware management by you, as the developer, is eliminated and the cloud service provider takes care of it.
<!--more-->

Fascinating, isn’t it? Just write, deploy, and go! Popular serverless architecture offerings include Google Cloud Functions, AWS Lambda, and Azure Functions. It is also known as Functions as a Service (FaaS).

Now, let’s get look at how we can use this amazing technology for our daily developer needs. We will be building a basic contact form and storing the form data in a database. Well, this usually requires the use of a node server or a remote Cloud Engine instance. But let’s add some serverless magic and make this easier.

### What we'll be doing
- Building a basic HTML form
- Getting those credentials
- Writing the Cloud Function
- Installing the Google Cloud SDK
- Time to Deploy 🔥
- Profit?!

### Building the form
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">    <title>Document</title>
    </head>
    <body>
        <div class="container">
            <!--Section: Contact v.2-->
            <section class="mb-4">
                <!--Section heading-->
                <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                <!--Section description-->
                <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to
                    contact us directly. Our team will come back to you within a matter of hours to help you.</p>
                <div class="row">
                    <!--Grid column-->
                    <div class="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" name="contact-form"
                            action="https://us-central1-artemis-1cc35.cloudfunctions.net/storeFormDetails" method="POST">
                            <!--Grid row-->
                            <div class="row">
                                <!--Grid column-->
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="name" name="name" class="form-control">
                                        <label for="name" class="">Your name</label>
                                    </div>
                                </div>
                                <!--Grid column-->
                                <!--Grid column-->
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="email" name="email" class="form-control">
                                        <label for="email" class="">Your email</label>
                                    </div>
                                </div>
                                <!--Grid column-->
                            </div>
                            <!--Grid row-->
                            <!--Grid row-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="subject" name="subject" class="form-control">
                                        <label for="subject" class="">Subject</label>
                                    </div>
                                </div>
                            </div>
                            <!--Grid row-->
                            <!--Grid row-->
                            <div class="row">
                                <!--Grid column-->
                                <div class="col-md-12">
                                    <div class="md-form">
                                        <textarea type="text" id="message" name="message" rows="2"
                                            class="form-control md-textarea"></textarea>
                                        <label for="message">Your message</label>
                                    </div>
                                </div>
                            </div>
                            <!--Grid row-->
                            <div class="text-center text-md-left">
                                <button type="submit" class="btn btn-primary" onclick="showInput()">Send</a>
                            </div>
                            <div class="status"></div>
                        </form>
                    </div>
                    <!--Grid column-->
                    <!--Grid column-->
                    <div class="col-md-3 text-center">
                        <ul class="list-unstyled mb-0">
                            <li><i class="fas fa-map-marker-alt fa-2x"></i>
                                <p>Coimbatore, Tamil Nadu, India</p>
                            </li>
                            <li><i class="fas fa-phone mt-4 fa-2x"></i>
                                <p>+ 91 42042 04204</p>
                            </li>
                            <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                                <p>johndoe@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <!--Grid column-->
                </div>
            </section>
        </div>
        <!--Section: Contact v.2-->
    </body>
</html>
```
If you’re struggling to follow along with the above code, refer to the [Mozilla Developer Network docs](https://developer.mozilla.org/en-US/). They have really good documentation for HTML, CSS and JS.

I’ve also used [Bootstrap](https://getbootstrap.com/) for this form for simple styling and a touch of responsiveness.

### Get those credentials
Before venturing out to write our main function, we need some API Tokens and Keys from Google Cloud. We are going to do this in [Firebase](https://firebase.google.com/), which is a web and mobile development platform. We could do the same in [Google Cloud Platform](https://cloud.google.com/) and even access services like Cloud Firestore and Cloud Functions from GCP, but I chose to use Firebase because it is faster to get started and has a clean, aesthetic UI. 😉

First, we need to start up a new project in Firebase. Projects in Firebase are GCP projects that use **Firebase** services. This means that billing and permissions for projects are shared across consoles. A project is like a container with a unique project ID assigned to it.

![Firebase Dashboard](/engineering-education/building-serverless-contact-form/dashboard.jpeg)<br>
Once you’ve started a new project, we need to obtain the API keys and tokens. On the left pane, click the **Settings** icon -> **Project Settings** and select **Service Accounts** tab.

![Firebase, Settings](/engineering-education/building-serverless-contact-form/settings.png)<br>
Now, select **Node.js** and **Generate Private Key**, to generate the admin credentials private key in JavaScript. This private key is used to authenticate us as the admin of the project and give us various permissions. Download the generated private key and store it safely. We will need to import this file later while writing our Cloud Function.

Now, we need to obtain our `firebase_CONFIG` variable from the console. To do this, go to **Settings**, scroll down and you will find a snippet with your firebase config. Copy the `databaseURL` and store it for later use.

### Write the Cloud Function
Now comes the most integral part. Let’s write the Cloud Function.

```javascript
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert({
                /* Paste your Private Key here */
        }),
    databaseURL: /* Paste your databaseURL here */
});
const db = admin.firestore();
exports.storeFormDetails = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;
    db.collection("formDetails").add({
            name: name,
            email: email,
            subject: subject,
            message: message
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding doc: ", error);
        });
}
```

### Explanation
`admin.initializeApp()` → This initializes an instance of your Firebase App as an admin. It takes an object as an argument. We pass the private key and our databaseURL as params.
*Note : Directly pasting the private key isn’t a good practice, since it is a really sensitive piece of information. We could also import it as a JSON file and then use it in our code.*

`admin.firestore()` → Creates a Firestore instance to create in our app.

`storeFormDetails` → This is our main serverless function that is going to be triggered from our web form.
*Important note here is that Cloud Functions already has middleware (like Express), so you can directly parse the request body to obtain your form data 😃*

`db.collection(“formDetails”).add({})` → Creates a database document with an auto-generated ID and adds the passed JSON into it.

### package.json
Cloud Functions uses a package.json file to identify the dependencies of your code and the versions those dependencies need to use. So we also need a package.json file. Create an empty package.json file in the same folder as your index.js file, and paste the following code.

```json
{
    "name": "firestore-function",
    "version": "1.0.0",
    "dependencies": {
        "firebase": "^6.6.1",
        "firebase-admin": "^5.12.0",
        "firebase-functions": "^1.0.2"
    }
}
```

### Install the Google Cloud SDK
Let’s install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts), which provides a CLI and various other tools to create, deploy, and manage our GCP and Firebase Projects.

Go to the above link, and view the installation for your corresponding OS and install the SDK.
*Make sure you include the option to install <strong>Beta Features</strong> in your installer.*

### Time to Deploy!
Deploying Cloud Functions can be done through three ways

- Cloud CLI
- Cloud Shell
- Cloud Console CLI

We’re gonna deploy it through the Cloud CLI. Fire up the terminal/PowerShell and cd into the directory where the index.js and package.json is located (shown as `gcloud beta functions` in the examples below).

```bash
$ gcloud beta functions deploy storeFormDetails --runtime nodejs10 --trigger-http
```

Ensure the function is deployed correctly

```bash
$ gcloud beta functions list
NAME 		 STATUS  TRIGGER 	REGION
storeFormDetails ACTIVE  HTTP Trigger    us-central1
```

This function is a HTTP Trigger-based function, which means that it is triggered by sending a HTTP request. We need the endpoint for the function, so obtain that by using this command.


```bash
$ gcloud beta functions describe sendFormDetails
```

```bash
availableMemoryMb: 256
entryPoint: storeFormDetails
httpsTrigger:url: https://us-central1-<YOUR_PROJECT_ID>.cloudfunctions.net/storeFormDetails
....
status: ACTIVE
timeout: 60s
updateTime: '2018-05-16T00:51:31Z'
versionId: '2'
```

Now, add this URL in the action attribute of your form, with the `METHOD = POST`

### Logging

Now let’s check whether our function is called whenever we click the **Submit** button.
On the Google Cloud Platform Console, search for StackDriver Logging. You can also find it in the Firebase Console.

![Settings, Function Logs](/engineering-education/building-serverless-contact-form/functions.png)

### Profit?!
So we have successfully written and deployed a Cloud Function! We’ve seen an overview of how to do this, but I highly recommend you read the [documentation](https://cloud.google.com/docs) of Google Cloud Platforms and Firebase to get a proper understanding of how these tools and technologies work. Reading documentation and experimenting on things is the hard, yet best way to become an expert programmer.
