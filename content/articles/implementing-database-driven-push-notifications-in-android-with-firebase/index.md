---
layout: engineering-education
status: publish
published: true
url: /database-driven-push-notifications-in-android-with-firebase/
title: Implementing Database Driven Push Notifications in Android with Firebase
description: This tutorial will take the reader through implementing database-driven push notifications in Android with Firebase.
author: joel-kanyi
date: 2022-03-03T00:00:00-06:55
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/database-driven-push-notifications-in-android-with-firebase/hero.jpg
    alt: Database Driven Push Notifications in Android with Firebase Hero Image
---
When you want to give users relevant information about your app's product, push notifications come in helpful.
<!--more-->
Take, for example, an app that deals with giving out and repaying loans. It will be a bad user experience when a user makes a payment and he/she is not notified of the amount paid, balance, and other relevant information.

In this tutorial, we will dive deep into understanding how to send Push notifications based on the Firebase real-time database changes.

### Table of contents
- [Prerequisites](#prerequisites)
- [What are push notifications?](#what-are-push-notifications)
- [When do we need them?](#when-do-we-need-them)
- [Creating a cloud function](#step-1---creating-a-cloud-function)
- [Getting started with Android studio](#step-1---creating-a-cloud-function)
- [Adding necessary dependencies](#step-3---adding-the-necessary-dependencies)
- [Designing the user interface](#step-4---designing-the-user-interface)
- [Creating a notifications service](#step-5---creating-a-notifications-service)
- [Triggering notifications](#step-6---triggering-notifications)
- [Demo](#demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you should have:
- Android Studio installed on your machine.
- Good knowledge of creating and running Android apps.
- Basic knowledge of the [Kotlin](https://kotlinlang.org/) programming language and Viewbinding.
- Basics of [Firebase cloud functions](https://www.section.io/engineering-education/serverless-api-firebase/).
- Basic understanding of [Firebase Realtime Database](https://firebase.google.com/docs/database/android/start).
- Node.js and Firebase CLI installed on your machine.

### What are push notifications?
Messages that show in a user's web browser, mobile phone, or desktop computer are known as push notifications. Businesses use them to communicate timely announcements, deals, and other information to their customers. A user can get these messages from anywhere as long as they are connected to the internet or have their phone or browser open. 

### When do we need them?
Push notifications provide convenience by allowing a user to receive:
- Immediate receipt of transactional receipts - Promotion of products or offers to boost sales.
- Sports scores and news are displayed on their lock screen - Utility notifications such as traffic, weather, and ski snow reports are displayed on their lock screen.
- Improve customer satisfaction.
- Information on flight check-in, changes, and connections.

> On your Firebase console, create a new Firebase project and ensure you have changed your payment plan to Blaze.

### Step 1 - Creating a cloud function
Before we jump into our Android Studio, let's first write a cloud function triggered every time new data is created in the real-time database.

Go to your desktop and create a new folder. Give it a name of your  choice.

Open it in your terminal and key in the following commands:

- `firebase-login` - Logs into Firebase using your Google account.

![firebase login](/engineering-education/database-driven-push-notifications-in-android-with-firebase/firebase-login.png)

- `firebase-init` - Initializes a Firebase project.

![firebase init](/engineering-education/database-driven-push-notifications-in-android-with-firebase/firebase-init.png)

Choose the feature you want to configure for this project - The firebase function.

![firebase feature](/engineering-education/database-driven-push-notifications-in-android-with-firebase/firebase-feature.png)

- For the next step, choose an existing project and select the project you created in the Firebase console.
- Then choose `Javascript` as the language that you will use.
- Next, **do not** allow ESLint.
- In this step, click `Y` to install dependencies with npm.

And that's all, Firebase initialization is completed.

Open the folder with your preferred code editor, for example, VsCode, Atom, or Sublime Text.

Inside the functions directory, open `index.js` and write the following trigger code.

```javascript
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.databaseDrivenPushNotifs = functions.database.ref('/payment/{paymentId}').onCreate(
    (snapshot, context) => {
        admin.database().ref('/device_token').once('value').then(allTokens =>{
            if(allTokens.val()){
                console.log("Token available");
                const token = Object.keys(allTokens.val());
                console.log(token)
                admin.messaging().sendToDevice(token, 
                    {
                        notification: {
                            title: "Payment Received",
                            body: "Dear customer your payment has been received, kindly wait for your balance to update"
                        }
                    }
                );
            }else{
                console.log("Token not available")
            }
        });
    }
);
```

The function uses the real-time database module and listens to the `/payment` reference. This function is triggered when a new payment with a `paymentId` is created.

Inside the function, we read the device token stored in the database and notify the device using the `sendToDevice` method.

> Feel free to customize this function according to your needs.

Once you are done writing the function, it is time to deploy it.

In your code editor terminal, key in the following command to deploy the function - `firebase deploy --only functions`

![deploy function](/engineering-education/database-driven-push-notifications-in-android-with-firebase/deploy-function.png)

If your function was deployed successfully, open your Firebase console and navigate to the Functions section, you should see the deployed function.

![function](/engineering-education/database-driven-push-notifications-in-android-with-firebase/function.png)

### Step 2 - Getting started with Android studio
Open Android Studio and create an empty Android project. 

Once the app is created, link it to the project you created on your Firebase console.

### Step 3 - Adding the necessary dependencies
In your app-level `build.gradle`, add the following dependencies:

```bash
// Firebase functions
implementation 'com.google.firebase:firebase-functions:20.0.1'

// Firebase messaging
implementation 'com.google.firebase:firebase-messaging:20.2.1'

// Firebase Realtime database
implementation platform('com.google.firebase:firebase-bom:29.0.4')
implementation 'com.google.firebase:firebase-database'
```

### Step 4 - Designing the user interface
Create a simple user interface containing two `EditText`s - one for entering a name and another for the amount. Also, include a `Button` that will trigger the notification when the user saves the data in the database. You can design a layout similar to this:

![layout](/engineering-education/database-driven-push-notifications-in-android-with-firebase/layout.png)

### Step 5 - Creating a notifications service
Create a new class called `NotificationService` that extends the `FirebaseMessagingService`. This class will store the device token in the database once the app is launched for the first time. Also, it will display a notification when a message is received.

```kotlin
private const val CHANNEL_ID = "myChannel"

class NotificationService : FirebaseMessagingService() {

    override fun onNewToken(newToken: String) {
        super.onNewToken(newToken)
        val tokenMap = HashMap<String, String>()
        tokenMap["token"] = newToken

        FirebaseDatabase.getInstance().getReference("device_token").child(newToken)
            .setValue(tokenMap)
    }

    @SuppressLint("UnspecifiedImmutableFlag")
    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)

        val title = message.notification?.title
        val body = message.notification?.body

        val notificationManager =
            getSystemService((Context.NOTIFICATION_SERVICE)) as NotificationManager
        val notificationID = Random.nextInt()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel(notificationManager)
        }

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(body)
            .setSmallIcon(R.drawable.ic_baseline_notifications_24)
            .setAutoCancel(true)
            .build()

        notificationManager.notify(notificationID, notification)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel(notificationManager: NotificationManager) {
        val channelName = "channelName"
        val channel = NotificationChannel(CHANNEL_ID, channelName, IMPORTANCE_HIGH).apply {
            description = "My channel description"
            enableLights(true)
            lightColor = Color.GREEN
        }

        notificationManager.createNotificationChannel(channel)
    }
}
```

In your `AndroidManifest.xml`, include the `Service` and add the following action:

```xml
<action android:name="com.google.firebase.MESSAGING_EVENT" />
```

### Step 6 - Triggering notifications
In your `MainActivity` class, inside the `onCreate` method, set an `onClickListener` to the `Button`. This will save the data entered in the `EditTexts` into the database.

```kotlin
binding.buttonPay.setOnClickListener {
    val name = binding.edtName.text.toString()
    val amount = binding.edtAmount.text.toString()

    if (name.isEmpty() || amount.isEmpty()) {
        return@setOnClickListener
    }

    val userDataMap = HashMap<String, String>()
    userDataMap["name"] = name
    userDataMap["amount"] = amount

    FirebaseDatabase.getInstance().getReference("payment").push().setValue(userDataMap)

    Toast.makeText(this, "Data saved", Toast.LENGTH_SHORT).show()
}
```

### Demo
When you run the app and save some data, you should receive a notification that is triggered because some data has been saved in the `/payment` reference.

![demo](/engineering-education/database-driven-push-notifications-in-android-with-firebase/demo.gif)

### Conclusion
With that, you now have a better understanding of database-driven push notifications, how to write a cloud function that triggers the push notification, creating a simple Android app that saves data in the real-time database and receives a notification when the data is saved.

Keep exploring more about push notifications. 

To fully implement the code, check out this repository - [Database driven push notifications](https://github.com/JoelKanyi/DatabaseDrivenPushNotifs).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
