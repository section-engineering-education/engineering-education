---
layout: engineering-education
status: publish
published: true
url: /engineering-education/react-native-firebase-google-authentication/
title: Google OAuth using Firebase in React Native
description: This tutorial will give readers a detailed guide on how to implement Google OAuth using Firebase in a Non-Expo React Native Application.
author: mohan-raj
date: 2021-21-28T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/react-native-firebase-google-authentication/hero.jpg
    alt: Google OAuth using Firebase in React Native Image
---

OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords. [coursehero.com. N.p., n.d. Web. 16 Mar. 2021.](https://www.coursehero.com/file/56229675/oaithtxt).
<!--more-->

In this tutorial, we will learn how to authenticate users with their Google accounts using the authentication module in Firebase in a Non-Expo React Native application.

To learn more about Firebase, refer to [Wikipedia](https://en.wikipedia.org/wiki/Firebase).

### Prerequisites

The basics of React and React Native will not be covered in this tutorial. If you are not comfortable with the basics, this is a [helpful tutorial](https://reactnative.dev/docs/tutorial).

### Overview

1. [Development environment](#development-environment).
2. [Cloning the starter code](#cloning-the-starter-code).
3. [Setting up the Firebase project](#setting-up-the-firebase-project).
4. [Setting up Firebase Authentication](#setting-up-firebase-authentication).
5. [Sign-in](#sign-in)
6. [Display authenticated screen](#display-authenticated-screen)
7. [Sign out](#sign-out)
8. [Recap](#lets-recap)

### Development environment

> **IMPORTANT** - We will not be using [Expo](https://expo.io/) in our project.

You can follow [this documentation](https://reactnative.dev/docs/environment-setup) to set up the environment and create a new React app.

Make sure you're following the React Native CLI Quickstart and not the Expo CLI Quickstart.

![Env Setup](/engineering-education/react-native-firebase-google-authentication/env_setup.png)

### Cloning the starter code

To focus more on the authentication module, You can clone the starter code from this [repository](https://github.com/zolomohan/react-native-firebase-google-auth-starter) on GitHub. Follow the Repository's README for instructions.

For the final code, refer to this [GitHub Repository](https://github.com/zolomohan/react-native-firebase-google-auth).

Folder Structure of the repository:

![Folder Structure](/engineering-education/react-native-firebase-google-authentication/folder_structure.png)

I've set up 2 screens in the `screens/` directory:

- _Authentication.js_: Screen with a Google Sign-in button to initiate the sign-in process.

- _Authenticated.js_: User can see this screen only if he is logged in.

![Screens](/engineering-education/react-native-firebase-google-authentication/screens.jpg)

### Setting up the Firebase project

Head to the [Firebase console](console.firebase.google.com/u/0/), sign in to your account and then create a new project.

![Create New Project](/engineering-education/react-native-firebase-google-authentication/firebase_new.png)

You'll see the dashboard after you create a new project.

![New Dashboard](/engineering-education/react-native-firebase-google-authentication/new_dashboard.png)

Click on the Android icon to add an android app to your Firebase project.

![register_app](/engineering-education/react-native-firebase-google-authentication/register_app.png)

You'll need the package name of the application to register the application.

You can find the package name in the `AndroidManifest.xml` file which is located in `android/app/src/main/`.

![Package Name](/engineering-education/react-native-firebase-google-authentication/package_name.png)

You will also need the Debug signing certificate `SHA-1`. You can get that by running the following command in the project directory.

```bash
cd android && ./gradlew signingReport
```

This will generate the signing certificate of the application. You will get similar output like this:

```bash
Task :app:signingReport
Variant: debugUnitTest
Config: debug
Store: C:\Users\Mohan\.android\debug.keystore
Alias: AndroidDebugKey
MD5: 5F:BB:9E:98:5E:E7:E6:29:19:28:61:4F:42:B9:74:AB
SHA1: 9E:61:75:0E:5C:F4:EB:B4:EB:9D:B3:13:5F:50:D6:AB:2E:4E:12:0D
SHA-256: 6C:BB:49:66:18:B9:7F:74:49:B5:56:D0:24:43:6A:1B:41:91:97:A3:2E:7C:4A:6E:59:40:8F:5C:74:6F:CC:93
Valid until: Friday, December 23, 2050
```

> Make sure you are copying the `SHA1` from `Task :app:signingReport` and not from any other Task.

Copy the `SHA1` value and paste it into the Firebase console.

Now, Proceed to the next step, you can download the `google-services.json` file. You should place this file in the `android/app` directory.

This file contains configurations that'll enable your application to access firebase services.

![Download Google Services JSON](/engineering-education/react-native-firebase-google-authentication/download_services.json.png)

After adding the file, proceed to the next step. It will ask you to add some configurations to the `build.gradle` files.

First, add the `google-services` plugin as a dependency inside of your `android/build.gradle` file:

```gradle
buildscript {
  dependencies {
    // ... other dependencies
    classpath 'com.google.gms:google-services:4.3.3'
  }
}
```

Then, execute the plugin by adding the following to your `android/app/build.gradle` file:

```Gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

You need to perform some additional steps to configure `Firebase` for `iOS`. Follow [this documentation](https://rnfirebase.io/#3-ios-setup) to set it up.

Finally, We should install the `@react-native-firebase/app` package in our app to complete the set up for Firebase.

```bash
npm install @react-native-firebase/app
```

### Setting up Firebase Authentication

Head over to the Authentication section in the dashboard and click on the `Get Started` button. This will enable the authentication module in your project.

![Get Started Auth](/engineering-education/react-native-firebase-google-authentication/auth_get_starterd.png)

Next, you should enable phone authentication in the sign-in methods. Once you've enabled it, press save.

![Signin-method](/engineering-education/react-native-firebase-google-authentication/google-enable.png)

Now, let's head to the application and install the auth module.

Let's install the `@react-native-firebase/auth` package in our app.

```bash
npm install @react-native-firebase/auth
```

Let's declare the dependency for the authentication module in the `android/app/build.gradle` file using the [Firebase Android BoM](https://firebase.google.com/docs/android/learn-more?authuser=0#bom)

```gradle
dependencies {
    // Add these lines
    implementation platform('com.google.firebase:firebase-bom:26.3.0')
    implementation 'com.google.firebase:firebase-auth'
}
```

With this, the firebase authentication module is set up in our application.

### Sign-in

The [`google-signin`](https://github.com/react-native-google-signin/google-signin) library provides a wrapper around the official Google login library.

We should use this library to create a credential, and then sign-in with Firebase.

Before triggering a sign-in request, you must initialize the Google SDK using your `webClientId` which can be found in the `google-services.json` file in `android/app` as the `client/oauth_client/client_id` property.

![Oauth Client ID](/engineering-education/react-native-firebase-google-authentication/oauth_id.png)

In _App.js_, Let's import the `google-signin` library and the Firebase `auth` module.

```JSX
import auth from '@react-native-firebase/auth`;
import { GoogleSignin } from '@react-native-community/google-signin';
```

You should call the `GoogleSignin.configure` method with the `webClientId` to initialize the SDK. You should do this outside the `App()` function.

```JSX
GoogleSignin.configure({
  webClientId:
    '260759292128-4h94uja4bu3ad9ci5qqagubi6k1m0jfv.apps.googleusercontent.com',
});
```

Now, that we have initialized the Google SDK, let's work on authenticating the user.

In the starter code, I've set up a function called `onGoogleButtonPress` in the _App.js_ file. This function is passed down to the _Authentication_ screen as a prop, and then, it is set as the `onPress` property of the Google Sign-in button. Thus, this function in the _App.js_ file will be called when the Google sign-in button is pressed by the user.

Let's write the code to sign-in the user in the `onGoogleButtonPress` function.

```JSX
async function onGoogleButtonPress() {
  // Sign-in Process here
}
```

First, we should get the user's `idToken` from Google using the `GoogleSignin.signIn()` method. It's an async function, this let's use the `await` keyword to wait for the Promise to get resolved.

```JSX
// Get the users ID token
const { idToken } = await GoogleSignin.signIn();
```

Now, we should create a Google credential using the `idToken`.

```JSX
// Create a Google credential with the token
const googleCredential = auth.GoogleAuthProvider.credential(idToken);
```

With the Google credential that we have created for the user, we should use the `signInWithCredential` method from the Firebase auth module to sign-in the user into the app.

```JSX
// Sign-in the user with the credential
return auth().signInWithCredential(googleCredential);
```

This is the complete code for the `onGoogleButtonPress` function.

```JSX
async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
```

### Display Authenticated Screen

The `onAuthStateChanged` event will be triggered whenever the authentication state of the user changes inside the application.

You can set an event handler for this listener. This handler will receive the `user` object. If the `user` object is `null`, it means the user is signed-out, otherwise, they are signed-in.

You can access the current authenticated user's details using `auth().currentUser` from anywhere in the application. The user object will contain the `displayName`, `email`, and `photoURL` which were copied from Google to Firebase.

To learn more about the user object, refer to this [documentation](https://rnfirebase.io/reference/auth/user).

Let's create a state to track whether the user is authenticated or not. We should set the default value to `false`.

```JSX
const [authenticated, setAutheticated] = useState(false);
```

Let's set the `authenticated` state to `true` if the `user` object is not `null` in the `onAuthStateChanged` handler.

```JSX
auth().onAuthStateChanged((user) => {
  if(user) {
    setAutheticated(true);
  }
})
```

If the user is authenticated, we should display the _Authenticated_ screen.

```JSX
if (authenticated) {
  return <Authenticated />;
}

return <Authentication onGoogleButtonPress={onGoogleButtonPress} />;
```

I'm using `auth().currentUser` in the _Authenticated_ screen to display the email ID, name, and the user's profile picture.

```JSX
const user = auth().currentUser;
return (
  <View style={styles.screen}>
    <Text style={styles.title}>You're Logged In</Text>
    <Image source={{ uri: user?.photoURL }} style={styles.image} />
    <Text style={styles.text}>{user?.displayName}</Text>
    <Text style={styles.text}>{user?.email}</Text>
    <View style={{ marginTop: 30 }}>
      <Button title="Signout" onPress={() => auth().signOut()} />
    </View>
  </View>
);
```

![Auth Screen](/engineering-education/react-native-firebase-google-authentication/auth_screen.gif)

### Sign out

We should use the `signOut` method in the auth module to sign out a user from the application.

Let's import the `auth` module in _Authenticated.js_.

```JSX
import auth from '@react-native-firebase/auth';
```

Let's call the `signOut` method when the user presses the signout button.

```JSX
<Button title="Signout" onPress={() => auth().signOut()} />
```

Now, when the user presses the button, the auth module will sign out the user from the application. This will trigger the `onAuthStateChanged` listener. The handler will receive `null` instead of the `user` object.

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

![Signout](/engineering-education/react-native-firebase-google-authentication/signout.gif)

### Let's Recap

1. We set up our development environment and created a React Native app.

2. We cloned the starter code.

3. We created a Firebase project and enabled Google authentication in our project.

4. We installed the required packages and we added the dependencies to the `build.gradle` files.

5. We configured the Google SDK and signed in the user when the user presses the Google sign-in button.

6. We created a state to track the authentication state of the user and used the `onAuthStateChanged` handler to update the state.

7. We displayed the _Authenticated_ screen when the user has been authenticated.

8. We used the `auth` module to sign out the user from the application from the _Authenticated_ screen.

Congratulations, :partying_face: You did it.

Thanks for Reading!
