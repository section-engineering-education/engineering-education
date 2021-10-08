---
layout: engineering-education
status: publish
published: true
url: /react-native-firebase-email-password-authentication/
title: Email/Password Authentication using Firebase in React Native
description: This tutorial will give readers a detailed guide on how to add Firebase's email/password authentication in a Non-Expo React Native application.
author: mohan-raj
date: 2021-06-14T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-native-firebase-email-password-authentication/hero.jpeg
    alt: React Native Firebase Email Password Authentication Image
---
In this tutorial, we will learn how to authenticate users with their email and password using Firebases authentication module in a Non-Expo React Native application.
<!--more-->
To learn more about Firebase, refer to [this link](https://en.wikipedia.org/wiki/Firebase).

### Prerequisites
The basics of React and React Native will not be covered in this tutorial. If you are not comfortable with the basics, this is a [helpful tutorial](https://reactnative.dev/docs/tutorial).

### Overview
We'll be going through these steps in this article:

1. Development environment.
2. Cloning the starter code.
3. Setting up the Firebase project.
4. Setting up Firebase Authentication.
5. Creating an Account.
6. Sign in to Existing Account.
7. Authenticated Screen.
8. Signout.
9. Recap.

### Development environment
> **IMPORTANT** - We will not be using [Expo](https://expo.io/) in our project.

You can follow [this documentation](https://reactnative.dev/docs/environment-setup) to set up the environment and create a new React app.

> Make sure you're following the React Native CLI Quickstart, not the Expo CLI Quickstart.

![Env Setup](/engineering-education/react-native-firebase-email-password-authentication/env_setup.png)

### Cloning the starter code
To focus more on the authentication module, you can clone the starter code from this [repository](https://github.com/zolomohan/rn-firebase-email-password-auth-starter) on GitHub. Follow the Repository's `README` for instructions.

For the final code, you can look at this [GitHub Repository](https://github.com/zolomohan/rn-firebase-email-password-auth).

This will be the folder structure of the application.

![Folder Structure](/engineering-education/react-native-firebase-email-password-authentication/folder_structure.png)

I've set up 2 screens in the `screens/` directory:

- *Authentication.js*: Screen to sign in or create an account.

- *Authenticated.js*: Screen that the user can see only if he is logged in.

![Screens](/engineering-education/react-native-firebase-email-password-authentication/screens.jpg)

In the *App.js*, the *Authentication* screen is exported. As we write the code, we will conditionally display the *Authenticated* screen after authenticating the user.

### Setting up the Firebase project
Head to the [Firebase console](console.firebase.google.com/u/0/) and sign in to your account.

Create a new project.

![Create New Project](/engineering-education/react-native-firebase-email-password-authentication/firebase_new.png)

Once you create a new project, you'll see the dashboard.

![New Dashboard](/engineering-education/react-native-firebase-email-password-authentication/new_dashboard.png)

Now, click on the Android icon to add an Android app to the Firebase project.

![register_app](/engineering-education/react-native-firebase-email-password-authentication/register_app.png)

You will need the package name of the application to register the application. You can find the package name in the `AndroidManifest.xml` which is located in `android/app/src/main/`.

![Package Name](/engineering-education/react-native-firebase-email-password-authentication/package_name.png)

Now, proceed to the next step, you can download the `google-services.json` file. You should place this file in the `android/app` directory.

This file contains configurations that'll enable your application to access firebase services.

![Download Google Services JSON](/engineering-education/react-native-firebase-email-password-authentication/download_services.json.png)

After adding the file, proceed to the next step. It will ask you to add some configurations to the `build.gradle` files.

First, add the `google-services` plugin as a dependency inside of your `android/build.gradle` file:

```bash
buildscript {
  dependencies {
    // ... other dependencies

    classpath 'com.google.gms:google-services:4.3.3'
  }
}
```

Then, execute the plugin by adding the following to your `android/app/build.gradle` file:

```bash
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

You need to perform some additional steps to configure `Firebase` for `iOS`. Follow [this documentation](https://rnfirebase.io/#3-ios-setup) to set it up.

We should install the `@react-native-firebase/app` package in our app to complete the set up for Firebase.

```bash
npm install @react-native-firebase/app
```

### Setting up Firebase authentication
Head over to the authentication section in the dashboard and click on the `Get Started` button. This will enable the authentication module in your project.

![Get Started Auth](/engineering-education/react-native-firebase-email-password-authentication/auth_get_starterd.png)

Next, you should enable email/password authentication in the sign-in methods. Once you've enabled it, press `Save`.

![Enable Email](/engineering-education/react-native-firebase-email-password-authentication/enabled_email.png)

Let's install the `@react-native-firebase/auth` package in our app.

```bash
npm install @react-native-firebase/auth
```

Let's declare the dependency for the authentication module in the `android/app/build.gradle` file using the [Firebase Android BoM](https://firebase.google.com/docs/android/learn-more?authuser=0#bom)

```bash
dependencies {
    // Add these lines
    implementation platform('com.google.firebase:firebase-bom:26.3.0')
    implementation 'com.google.firebase:firebase-auth'
}
```

With this, the Firebase authentication module is setup in our application.

### Creating an user account
The Firebase `auth` module has a function called `createUserWithEmailAndPassword` that'll help to create a new user in the application with an email and a password.

For example:

```JSX
auth().createUserWithEmailAndPassword('johndoe@gmail.com', 'helloworld123');
```

This will create a new user in the Firebase app with the email ID `johndoe@gmail.com` and his respective password. Two users in the same application can't have the same email ID.

This function will also sign in the user into the application after creating a user account.

In the *App.js*, let's import the `auth` module.

```JSX
import auth from '@react-native-firebase/auth';
```

Let's write a function that will accept an email and a password and call the `createUserWithEmailAndPassword` to create a new user.

The `createUserWithEmailAndPassword` is an asynchronous function.

```JSX
const createUser = (email, password) => {
  try {
    auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error);
  }
};
```

Now, let's pass this function to the *Authentication* screen.

```JSX
return <Authentication createUser={createUser} />;
```

When the user presses the *create* button, we should call this function. We should pass the email and the password from the state to this function when it is called.

```JSX
<Button title="Create" onPress={() => props.createUser(email, password)} />
```

Now, when a user presses this button, the `createUserWithEmailAndPassword` is called with the email and password, and this will create a new user in the Firebase app. If there is any error, we'll display it to the user using `alert()`. 

He/She will also be logged in to the application after the user account is created. To track whether the user is authenticated or not, let's create a state and set the initial value to false.

```JSX
const [authenticated, setAuthenticated] = useState(false);
```

The `onAuthStateChanged` event will be triggered whenever the authentication state of the user changes inside the application.

You can set an event handler for this listener. This handler will receive the `user` object. If the `user` object is `null`, it means the user is signed out, otherwise, they are signed in.

Let's set the `authenticated` state to `true` if the `user` object is not `null` in the `onAuthStateChanged` handler.

```JSX
auth().onAuthStateChanged((user) => {
  if(user) {
    setAutheticated(true);
  }
})
```

Now, let's return the *Authenticated* screen if the user is authenticated in the application.

```JSX
if (authenticated) {
  return <Authenticated />;
}

return <Authentication createUser={createUser} />;
```

### Sign in user
The Firebase `auth` module has a function called `signInWithEmailAndPassword` that'll sign in the user into the application with an email and a password.

For example, this will sign in the user into the app with the email ID:

```JSX
auth().signInWithEmailAndPassword('johndoe@gmail.com', 'helloworld123');
```

Let's write a function that will accept an email and a password and call the `signInWithEmailAndPassword` to sign in the user.

The `signInWithEmailAndPassword` is an asynchronous function.

```JSX
const signin = (email, password) => {
  try {
    auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error);
  }
};
```

Now, let's pass this function to the *Authentication* screen.

```JSX
return <Authentication signin={signin} createUser={createUser} />;
```

When the user presses the *signin* button, we should call this function. We should pass the email and the password from the state to this function when it is called.

```JSX
<Button title="signin" onPress={() => props.signin(email, password)} />
```

Now, when a user presses the *signin* button, the `signInWithEmailAndPassword` is called with the email and password, and this allows the user into the app. If there is any error, we'll display it to the user using `alert()`.

![Signin](/engineering-education/react-native-firebase-email-password-authentication/signin.gif)

### Signout
We should use the `signOut` method in the auth module to sign out a user from the application.

Let's import the `auth` module in *Authenticated.js*.

```JSX
import auth from '@react-native-firebase/auth';
```

Let's call the `signOut` method when the user presses the signout button.

```JSX
<Button title="Signout" onPress={() => auth().signOut()} />
```

Now, when the user presses the button, the auth module will sign the user out from the application. This will trigger the `onAuthStateChanged` listener. The handler will receive `null` instead of the `user` object.

Thus, we should set the authenticated state to `false` if we receive `null`.

```JSX
auth().onAuthStateChanged((user) => {
  if(user) {
    setAuthenticated(true);
  } else {
    setAuthenticated(false);
  }
})
```

![Signout](/engineering-education/react-native-firebase-email-password-authentication/signout.gif)

### Let's Recap
1. We set up our development environment and created a React Native app.

2. We created a Firebase project.

3. We set up the authentication module and enabled email/password authentication in our project.

4. We cloned the starter code.

5. We added the dependencies to the `build.gradle` files.

6. We added a function to create a new user with the `createUserWithEmailAndPassword` method from the `auth` module.

7. We created a state to track the authentication state of the user and used the `onAuthStateChanged` handler to update the state.

8. We added a function to sign in a user with the `signInWithEmailAndPassword` method from the `auth` module.

9. We used the `auth` module to sign the user out from the application from the *Authenticated* screen.

Congratulations, :partying_face: You did it.

Thanks for reading!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)