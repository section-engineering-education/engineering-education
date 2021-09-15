Firebase application's security is essential. In this guide, we will learn how we can secure Firebase apps. This tutorial will give you easy steps that you can take to make your application a lot safer. Also, it answers questions on what Firebase is and why security is vital in cloud Firestore.

Based on the rules and conditions you set, some users will be restricted from reading or writing the content.

Next, we're going to dive deeper into how security rules work and look at a simple use case (project) to get you more comfortable building secure, production-ready applications.

### Table of contents
- [What is Firebase?](#what-is-firebase)
- [Why security is important in Cloud Firestore](#why-security-is-important-in-cloud-firestore)
- [Securing your firebase app with the security rules](#securing-your-firebase-app-with-the-security-rules)

### Prerequisites
To follow this tutorial, you will need some JavaScript knowledge. In addition, back-end knowledge is also necessary as it will help you understand various Firebase concepts.

You also need a text editor like Visual Studio Code and Node.js installed on your machine.

### What is Firebase?
Firebase is a Google back-end service that allows developers to build robust Android, Web apps, and IOS  applications. Firebase provides developers with tools and services to help them create quality apps, speed up back-end development, track analytics, and engage users with cloud messaging.

Cloud Firestore is a NoSQL database system that stores data in JSON files. It is a good back-end service that gives you a complete solution about how to take things down during development.

With Firebase, you can perform several sorts of authentication, manage the database, store media file, run analytics, and more.

In every application, data is essential. Firebase has two database services. One is a Real-time database and the other is Cloud Firestore database. In this tutorial, we will concentrate on the Cloud Firestore database.

Popular applications using Firebase include:
- [eBay motors](https://www.ebay.com/)
- [Alibaba](https://www.alibaba.com/)
- [Todoist](https://todoist.com/)
- [The New York Times](https://www.nytimes.com/)

### Why security is important in Cloud Firestore
Regardless of the application you are developing nowadays, you need to store your data in the cloud. In addition, data is stored in the cloud for security purposes.

Cloud Firestore lets you store, sync data across multiple devices, and query your app data in the cloud. It comes with a set of security rules to help you control access and protect user's data.

The security rules are stringent as only approved apps are given read, write, and validate permissions. Security is critical to your application, and you need to make sure you understand how to use the security rules especially when dealing with sensitive data.

This is the best way to stop security and data breaches while providing the expertise to catch vulnerabilities evolved from accessibility.

### Securing your firebase app with the security rules
Security rules protect your data in both real-time databases and Cloud Firestore from unauthorized access.

We will demonstrate how this works by building a simple messaging app using Cloud Firestore.

#### Step 1: Create a Firebase project
To begin, navigate to [Firebase](https://firebase.google.com/) and sign in using your `Gmail` account.

![Firebase](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/firebase.jpg)

After a successful sign-in, navigate to [Google Firebase console](https://console.firebase.google.com/u/0/) and click `add project` button to create a new project. Give your project a name and follow the on-screen steps to finish up.

#### Step 2: Setup Cloud Firestore
In your Firebase console, select Cloud Firestore and you'll be directed to the database section. Then, click `create database` button, to create a new database.

After that, add a collection named `chat` and a document named `message` into it as shown below:

![Create database](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/create-db.jpg)

#### Step 3: Create a basic messaging app
Our project is simple. You only need to create a folder where the messaging app is placed. Then add `index.html` and `script.js` files.

We will also add Firebase to our app. There are two ways to add Firebase on the web:

- The first method is using node package manager (NPM) installed through the terminal in your project folder.

```bash
npm install firebase
```

- The second method is using a content delivery network (CDN) by adding it to your project.

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

![Chat App](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/chatapp.jpg)

#### Step 4: Firebase security rules

##### Read and write rule
To add this rule, navigate to the `rules tab` next to the `data tab` in the Firebase console and you will see the cloud Firestore policy configuration that looks like this:

![Cloud Firestore Policy Configuration](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/cloud-firestone-policy-config.jpg)

To update the Cloud Firestore security policy, click `Edit rules` at the top left corner to change the security rules.

![Edit Rules](/engineering-education/how-to-secure-your-firebase-app-with-firebase-security-rules/edit-rules.jpg)

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

Add the rule below:

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

##### Authenticated required rule
If read/write permission needs to be given to authenticated users, you can use the `request.auth` condition. To achieve this, check if the signed-in user's id (uid) exists or not.

The Cloud Firestore Policy end up looking like this:

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

##### Secure logged-in user data
The logged-in user data should be protected. With this security rule, users can only update their data if their user ID equals the `userId` that already exists in the database.

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
  match /users/userId {
      allow read, write: if request.auth.uid == userId
    }
  }
}
```

You could use a two factor authentication (2FA) by using an email to verify as a second condition using `auth.token.email_verified` as shown below:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
  match /users/userId {
      allow read, write: request.auth.uid == userId
      && request.auth.token.email_verified ==true
    }
  }
}
```

> Note: Cloud Firestore security rules protect data accessibility only if there is an authorization.

### Conclusion
Securing your Firebase application is essential and easy. However, many developers do not secure the databases as they develop Firebase applications, thus making them vulnerable to attacks.

To summarize, this guide has touched on:
- What is Firebase.
- How to create a Firebase application.
- How to set up a Cloud Firestore database.
- Why security is important in Cloud Firestore. 
- Security rules in Cloud Firestore.

Happy coding!
