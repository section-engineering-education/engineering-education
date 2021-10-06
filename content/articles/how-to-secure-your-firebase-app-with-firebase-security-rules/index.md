---
layout: engineering-education
status: publish
published: true
url: /how-to-secure-firebase-apps-with-firebase-security-rules/
title: How to Secure Apps with Firebase Security Rules
description: This article will discuss how to secure applications with Firebase security rules. This is essential, especially when creating a scalable app.
author: julie-ruguru
date: 2021-10-01T00:00:00-01:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-secure-firebase-apps-with-firebase-security-rules/hero.jpg
    alt: How to secure Firebase Apps with Firebase security rules image
---
Firebase is among the most popular online databases. In this guide, we will learn how we can secure Firebase apps using various rules. 
<!--more-->
Firebase security rules determine who can read or write on the databases. We will dive deeper into how security rules work by building a simple project. 

### Table of contents
- [What is Firebase?](#what-is-firebase)
- [Why security is important in Cloud Firestore](#why-security-is-important-in-cloud-firestore)
- [Securing your firebase app with the security rules](#securing-your-firebase-app-with-the-security-rules)

### Prerequisites
To follow this tutorial, you will need some JavaScript knowledge. In addition, some back-end knowledge is also necessary as it will help you understand various Firebase concepts.

You also need a text editor like Visual Studio Code and Node.js installed on your machine.

### What is Firebase?
Firebase is a Google back-end service that allows developers to build robust Android, web, and IOS  applications. 

Firebase provides developers with tools and services to help them create quality apps, speed up back-end development, track analytics, and engage users through cloud messaging.

Cloud Firestore is a NoSQL database system that stores data in JSON files. It is an excellent back-end service that helps you save significant time.

With Firebase, you can perform several sorts of authentication, manage the database, store media file, run analytics, and more.

Data is essential in all applications. Firebase has two database services: Real-time database and Cloud Firestore database. 

In this tutorial, we will concentrate on the Cloud Firestore database.

Popular applications using Firebase include:
- [eBay](https://www.ebay.com/)
- [Alibaba](https://www.alibaba.com/)
- [Todoist](https://todoist.com/)
- [The New York Times](https://www.nytimes.com/)

### Why security is important in Cloud Firestore
Some applications require one to store data in the cloud for security reasons.

Cloud Firestore lets you store, sync data across multiple devices, and query your app data in the cloud. It comes with a set of security rules to help you control access and protect user's data.

The security rules are stringent as only approved apps have `read`, `write`, and `validate` permissions. 

Security is critical to your application. Therefore, you should ensure that you understand how to use Firebase rules, especially when dealing with sensitive data.

This is the best way to prevent data breaches, as well as identify vulnerabilities.

### Securing your Firebase app with security rules
Security rules protect your data in both real-time databases and Cloud Firestore from unauthorized access.

We will demonstrate how this works by building a simple messaging app using Cloud Firestore.

### Step 1: Create a new Firebase project
To begin, navigate to [Firebase](https://firebase.google.com/) and sign in using your `Google` account.

![Firebase](/engineering-education/how-to-secure-firebase-apps-with-firebase-security-rules/firebase.jpg)

After a successful sign-in, navigate to [Google Firebase console](https://console.firebase.google.com/u/0/) and click `add project` button to create a new project. 

Name your project appropriately and follow the on-screen steps to finish up.

### Step 2: Setup Cloud Firestore
In your Firebase console, select `Cloud Firestore` and you'll be directed to the database section. 

Then, click the `create database` button, to create a new database.

Add a collection named `chat` and a document named `message` into it, as shown below:

![Create database](/engineering-education/how-to-secure-firebase-apps-with-firebase-security-rules/create-db.jpg)

### Step 3: Create a basic messaging app
Our project is simple. You only need to create a folder where the messaging app is placed. Then add `index.html` and `script.js` files.

We will also add Firebase to our app. There are two ways to add Firebase to web projects:

The first method involves using Node Package Manager (NPM) in your terminal:

```bash
npm install firebase
```

The second method to use a content delivery network (CDN) by adding it to your project:

```html
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js"></script>
```

The `index.html` file contains our HTML code and links to other files. To start the app, copy and paste the code below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Firebase Cloud Firestore</title>
    <link rel="stylesheet" href="">
  </head>
  <body>

    <!-- scripts -->
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js"></script>
    <script src="script.js"></script>
    <header>
        <h2>Firebase ChatApp</h2>
      </header>
  
      <div id="chat">
        <!-- messages will display here -->
        <ul id="messages"></ul>
  
        <!-- form to send message -->
        <form id="message-form">
          <input id="message-input" type="text" />
          <button id="message-btn" type="submit">Send</button>
        </form>
      </div>
  </body>
</html>
```

Below is how the app looks like:

![Chat App](/engineering-education/how-to-secure-firebase-apps-with-firebase-security-rules/chatapp.jpg)

### Step 4: Firebase security rules

#### Read and write rule
To add this rule, navigate to the `rules tab` next to the `data tab` in the Firebase console. 

You will see the Cloud Firestore policy configuration that looks like this:

![Cloud Firestone Policy Configuration](/engineering-education/how-to-secure-firebase-apps-with-firebase-security-rules/cloud-firestone-policy-config.jpg)

To update the Cloud Firestore security policy, click `Edit rules` at the top-left corner to change the security rules.

![Edit Rules](/engineering-education/how-to-secure-firebase-apps-with-firebase-security-rules/edit-rules.jpg)

Syntax:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /<path>/ {
      allow read, write: if <condition>;
    }
  }
}
```

Add the following rule:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
  match /chat/{anything=**} {
  allow read, write: if true;
  }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

This rule will allow all users to read and write data in the `chat` collection.

#### Authenticated required rule
If read/write permission needs to be given to authenticated users, you can use the `request.auth` condition. 

To achieve this, check if the signed-in user's id (uid) exists or not.

The Cloud Firestore Policy ends up looking like this:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
  match /chat/{anything=**} {
  allow read, write: if true;
  }
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

#### Secure logged-in user data
The logged-in user data should always be protected. With this security rule, users can only update their data if they are autheniticated successfully.

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
  match /users/userId {
      allow read, write: if request.auth.uid == userId
    }
  }
}
```

You could use a 2-factor authentication (2FA) for enhanced security. For instance, you can use an email for verification using `auth.token.email_verified`, as shown below:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
  match /users/userId {
      allow read, write: if request.auth.uid == userId
      && request.auth.token.email_verified ==true
    }
  }
}
```

### Conclusion
Securing your Firebase application is essential and easy. However, many developers do not secure the databases which making them vulnerable to attacks.

You can avoid such issues using the Firebase security rules discussed in this article.

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
