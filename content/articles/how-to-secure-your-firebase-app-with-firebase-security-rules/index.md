Firebase application's security is essential. In this guide, we are going to learn how we can make our apps secure. This tutorial will give you some easy steps that you can take to make your application a lot safer. Also, it answers questions on what Firebase is and why security is vital in Cloud Firestore.

According to the rules you set and the conditions you want the user to read or write, the firebase rules will restrict the content that the user can read or write. Next, we're going to dive deeper into how security rules work and look at a simple use case(project) to get you more comfortable building secure, production-ready applications.

### Table of contents
[What is firebase?](#what-is-firebase)
[Why security is important in Cloud Firestore](#why-security-is-important-in-cloud-firestore)
[Securing your firebase app with the security rules](#securing-your-firebase-app-with-the-security-rules)

### Prerequisites
To follow this tutorial, you will need some JavaScript knowledge. In addition, back-end knowledge is also necessary as it could help you understand various Firebase concepts.

You need a text editor like Visual Studio Code and node.js installed on your computer to follow along.

### What is Firebase?
Firebase is a google back-end application development that allows developers to build Android, web apps, and IOS  applications. Firebase provides developers with tools and services to help them create quality apps, speed up back-end development, track analytics, and engage users with cloud messaging.

Firebase is a NoSQL database system that stores data in JSON files. It gives you a complete solution about how to take things down during development. It is a good back-end solution. With Firebase, you can do all sorts of authentication, manage the database, file storage, run analytics, and more.

In every application, data is essential. Firebase has two database services. One is a Real-time database and Cloud Firestore database. In this tutorial, we will concentrate on the Cloud Firestore database.

Popular applications using Firebase include:
- eBay motors
- Alibaba
- Todoist
- The New York Times

### Why security is important in Cloud Firestore
No matter what application you are developing these days, you want to store your data in the cloud. In addition, data is stored in the cloud for security purposes.
 
Cloud Firestore lets you store, sync, and query your app data in the cloud. You can sync it across multiple devices. It comes with a set of security rules to help you control access and protect user's data.

The security rules are stringent as only approved apps are given read, write, and validate abilities. Security is critical to your application, and you need to make sure you understand how to use the protocols. If you are dealing with sensitive data and you are not very sure of what you are doing. It is necessary to get some help on implementing your security rules from someone who understands them well.

This is the best way to stop security and data breaches while providing the developers with the expertise to catch vulnerabilities evolved from accessibility.

### Securing your firebase app with the security rules
Security rules protect your data in both real-time databases and Cloud Firestore from unauthorized access.

We will demonstrate how this works by building a simple messaging app using Cloud Firestore.

#### Step 1: Create a firebase project
To begin, navigate to [Firebase](https://firebase.google.com/) and sign in using your Gmail account.

![Firebase](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/firebase.jpg)

After a successful sign-in, navigate to [google firebase console](https://console.firebase.google.com/u/0/) and click add project button to create a new project. Give your project a name and follow the steps until you are successful.

#### Step 2: Setup Cloud Firestore
In your Firebase console, choose Cloud Firestore, and you are directed to the database section. Then click on create database button, and your database is created.

After that, you add the collection with the name `chat`. Then add your document with the word `message` into it, as shown below:

![Create database](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/create-db.jpg)

#### Step 3: Create a basic Messaging app
Our project is simple. You only need to create a folder where the messaging app is placed. Then add `index.html` and `script.js` files.

We will also add Firebase to our app. There are two ways to add Firebase on the web:

- The first method is using node package manager (npm). It is installed through the terminal in your project folder.

`npm install firebase`

- The second method is using a content delivery network (CDN) by adding it to your project.

`<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>`

`<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js"></script>`

The index.html file contains our HTML codes and links to other files. To start the app, copy and paste the code below:

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

Below is how the app looks like :

![ChatApp](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/chatapp.jpg)

#### Step 4: Securing Firebase App with Security Rules

##### Adding Rules
You need to secure the firebase app with security rules. Navigate to the `rules tab` next to the `data tab`, and you will see the Cloud Firestone policy configuration looks like this:

![Cloud Firestone Policy Configuration](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/cloud-firestone-policy-config.jpg)

To update the Cloud Firestore security policy, click `Edit rules` at the top left corner to change the security rules.

![Edit Rules](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/edit-rules.jpg)

Then add the rule below:

```Firebase
service cloud.firestore {
  match /databases/{database}/documents {
  match /Chat/{anything=**} {
  allow read, write: if true;
  }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
##### Rules for authenticated users
However, if write permission needs to be given to authenticated users, you can use the'request.auth` condition. To achieve this, check if the signed-in user's id (uid) exists or not.

The Cloud Firestone Policy end up looking like this:

```Firebase
service cloud.firestore {
  match /databases/{database}/documents {
  match /Chat/{anything=**} {
  allow read, write: if true;
  }
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
 
```

##### Secure logged-in user data
The logged-in user data should be protected. With this security rule, users can only update their data if their logged-in user ID equals the `userId` that already exists in the database.

```Firebase
service cloud.firestore {
  match /databases/{database}/documents {
  match /users/userId {
      allow read, write: request.auth.uid != userId
  }
  }
}
```
You could use a two factor authentication (2FA) by using an email to verify as a second condition using `auth.token.email_verified` as shown below:
```Firebase
service cloud.firestore {
  match /databases/{database}/documents {
  match /users/userId {
      allow read, write: request.auth.uid != userId
      && request.auth.token.email_verified ==true
  }
  }
}
```

Cloud Firestore security rules protect data accessibility only if there is an authorization.

### Conclusion
Securing your Firebase application is essential and easy. However, many developers do not secure the databases as they develop Firebase applications, thus making them vulnerable to attacks.

To summarize, this guide has touched on:
- What is Firebase.
- Why security is important in Cloud Firestore.
- How to create a Firebase application
- How to set up a Cloud Firestore database.



