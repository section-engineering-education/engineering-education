![hero image](/hero-image.png)
 
Title : Integrating Firebase Notifications in React Native

### Introduction:

Notifications are an integral part of a mobile application which when implemented correctly will grab the user's attention and will increase the engagement of your app. Apps like Instagram have used notifications to make users come back to their application when some events like a follower has commented in your post or if some one follows your account.

Firebase offers a service called Firebase Notifications which enables developers to send notifications from the firebase dashboard or from their own server.

In this article we will be looking into how we can integrate Firebase notifications in our React Native application and send notifications from our firebase dashboard.

### Installation Steps

The first step is to create a new React Native Project. Go to your terminal and run the below commands,

```

npx react-native init firebasenotification
cd firebasenotification

```

After creating a new RN project, we have to create a new firebase project and configure it in our RN project.

Go to your firebase console and create a new project or use an already existing project.

Now go into your firebase console, create a new android app for your firebase project.

![firebase dashboard](/firebase-android-1.png)

After doing that, give the name of your React Native project in the app name and click on Register App.

![Register App Name](/firebase-register-2.png)

Download the google-services.json file and paste it in the android --> app folder in your react native project.

![Google Services Location](/google-services-location-4.png)

And then go to build.gradle file in app folder and paste the necessary code.

```gradle
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
       buildToolsVersion = "30.0.2"
        minSdkVersion = 21
        compileSdkVersion = 30
        targetSdkVersion = 30
        ndkVersion = '20.1.5948944'
        googlePlayServicesVersion = '+'
        firebaseVersion = '+'
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.2.2")
        classpath 'com.google.gms:google-services:4.3.10'
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenCentral()
        mavenLocal()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
        }

        google()
        maven { url 'https://www.jitpack.io' }
    }
}


```

Next go to the build.gradle file in android --> app folder and add the below line to the top of the page.

```
apply plugin: 'com.google.gms.google-services'

```

After adding the above line of code, add the below line of code in the dependencies part of build.gradle.

```
  implementation platform('com.google.firebase:firebase-bom:26.4.0') 

```

After successfully configuring firebase in the build.gradle files, we have to install necessary npm packages related to firebase in our RN project.

```

npm i @react-native-firebase/app
npm i @react-native-firebase/messaging

```

After installing these packages related to firebase, we have to install react-native-push notification package.

```
npm i react-native-push-notification

```

### Configuring your react native application

After installing the necessary packages, you have go to the android folder --> app --> src --> main and open the AndroidManifest.xml file.

Inside the file, replace the code to contain the below code.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.firebasenotification" xmlns:tools="http://schemas.android.com/tools">

  <uses-permission android:name="android.permission.INTERNET" />

   <application
      android:name=".MainApplication"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:allowBackup="false"
      android:theme="@style/AppTheme"
      android:hardwareAccelerated="true"
      android:largeHeap="true"
      >
      <meta-data tools:replace="android:resource"      android:name="com.google.firebase.messaging.default_notification_color" android:resource="@android:color/white" />
    <meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@drawable/ic_notification" />
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
        android:launchMode="singleTask"
        android:windowSoftInputMode="adjustResize"
        android:exported="true">
      </activity>
       <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_name"  android:value="Firebase Notifications"/>
       <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_description" android:value="Firebase Notifications"/>
       <meta-data  android:name="com.dieam.reactnativepushnotification.notification_color"   android:resource="@android:color/white"/>
      <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
      <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
       <intent-filter>
          <action android:name="android.intent.action.BOOT_COMPLETED" />
      </intent-filter>
      </receiver>
       <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
      android:exported="false" >
      <intent-filter>
    <action android:name="com.google.firebase.MESSAGING_EVENT" />
      </intent-filter>
      </service>
    </application>
</manifest>

```

After replacing your AndroidManifest.xml with the above code, we have to perform the below steps.

1. We have to grab the FCM token to send notification to the user's mobile.
2. We have to add notification icon to our react native application, so whenever we send notification we can see our apps logo in the notification message.
3. And the last thing we have to do is, we have to setup notification handlers to open our app when it is in background state and in the exited state.

### Grabbing the FCM token

Now we are going to grab the FCM token of the user's mobile. So before grabbing the FCM token we are going to get to know what is a FCM token.

### FCM Token

Firebase cloud messaging (FCM) Token can be described as an unique token or an identification number for a mobile device with which developers can send notifications to that specific device.
So to grab the FCM token of the user's device with React Native, we should use firebase's getToken() function which is available from the @react-native-firebase/messaging package.

So in App.js, create an asynchronous function to get the FCM token of the user's mobile.

```js
import messaging from "@react-native-firebase/messaging";

const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log(token);
  } catch (e) {
    console.log(error);
  }
};
```

Now to get the FCM Token in the console, we are going to use this function in an useEffect hook which has an empty dependency array so that we get the FCM token when the screen loads for the first time. So below is the entire code of App.js.

```js
import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

import messaging from "@react-native-firebase/messaging";

const App = () => {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFCMToken();
  }, []);
  return (
    <SafeAreaView>
      <Text>Firebase Notification tutorial</Text>
    </SafeAreaView>
  );
};

export default App;
```

### Notification icon maker

Each app has its own logo. By default notifications will be sent without our app's logo.

So if we want to add our logo to the notifications, we have to go to the below link and make notification icons and use them inside our react native project.

[Notification Icon Maker tool](https://romannurik.github.io/AndroidAssetStudio/icons-notification.html#source.type=clipart&source.clipart=ac_unit&source.space.trim=1&source.space.pad=0&name=ic_stat_ac_unit)

In this website, we can create our notification icons. So you have to drag and drop your logo on to the website and change the name given at the bottom left to "ic_notification" and click on download button. You will get a zip file.

![Notification Maker](/notification-5.png)

The most important thing about creating a notification icon is,
you have to have a transparent background in your logo that is your background should not have any background color. If you have a background color like black or white, your notification icon will look like below.

![Notification Error](/notification-rectangle-6.png)

Now what you have to do is, unzip the zip file and paste the folder contents in android folder --> app--> src --> res folder.
You will see a folder structure like below.

![Notification Structure](/notification-structure-7.png)

### Handling Notification Events

Now the next step is to handle notification events. So there can be two scenarios while handling notifications.

1. When app is in background state
2. When app is in exit state.
   (We can not get notifications when app is running or in foreground state)

So to handle both of these notification states we are going to add some firebase messaging code to our App.js.

In App.js, in the useEffect hook add the below code.

```js
messaging().onMessage(async (remoteMessage) => {
  console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
});

messaging().onNotificationOpenedApp((remoteMessage) => {
  console.log("onNotificationOpenedApp: ", JSON.stringify(remoteMessage));
});

messaging()
  .getInitialNotification()
  .then((remoteMessage) => {
    if (remoteMessage) {
      console.log(
        "Notification caused app to open from quit state:",
        JSON.stringify(remoteMessage)
      );
    }
  });
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});
```

So in the above code we are handling the events like,

1. What should happen when the user clicks on the notification.
2. What should happen when app is in exit state.

After doing this, our App.js code will look like below.

```js

import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFCMToken();

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>Firebase Notification tutorial</Text>
    </SafeAreaView>
  );
};

export default App;



```


After doing all the above things, run the below command in the terminal to run the app in your emulator.

```
npm run android

```

Once app is up and running, in the console you will get the FCM token. Copy that token to use it in the firebase dashboard.

![FCM Token](/fcm-token-10.png)

Now as we got the user mobile's FCM token we can use this to send notifications from the firebase dashboard.

### Sending Notifications from firebase dashboard

In the firebase dashboard go to the cloud messaging section.

![Cloud Messaging](/cloud-messaging-8.png)

Now click on "send your first message" button and then fill the notification title and message in the firebase dashboard.

![Test Message](/send-test-message-9.png)

Then click on "send test message" button, you will be asked to fill the FCM token in it. You have to paste the FCM token you copied from the React Native console and paste it in there.

![Fill FCM Token](/fcm-token-in-console-11.png)

Now click on test button and you will receive a notification in your emulator with the title, description and the logo of your app.

![Notification in Mobile](/notification-13.png)

So we have successfully integrated notifications in our React Native application.

### Important factors to consider about Firebase Notifications.

1. You will not get notifications if your app is in the foreground that is if your app is running. You will get notifications only when the app is in background or in exit state.

2. You can setup a server and then listen to user events and then send personalized notifications.

### Conclusion

In this article, we have seen how to configure our React native application with a Firebase project, use a notification icon maker to add logo to our notification message and we saw how we can send notifications from Firebase console.

You can find all the code used in this article in the below GitHub link.

[Github Link For Code](https://github.com/Gautham495/Firebase-notifications)

First time Author Details:

```

title : Gautham
type : authors
Twitter :  https://twitter.com/GauthamVijay495
Linkedin : https://www.linkedin.com/in/gautham-vijayan
Website :  https://gautham-portfolio.netlify.app/

```

Gautham is a Frontend React JS and React Native Mobile developer who is an undergrad at National Institute of Technology, Tiruchirappalli. He has made multiple apps with React Native and which is being used by people around the world.