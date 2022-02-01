Push notifications comes in handy when you want to give your app's users timely information based on the product that the app is dealing with. Take, for example, an app that deals with giving out and repaying loans. It will be a bad user experience when a user makes a payment and he/she is not notified of the amount paid, balance, and other relevant information.

In this tutorial, we will understand what Push notifications are and their importance. We will then dive deep into understanding how one can send Push notifications based on changes in the Firebase Realtime Database.

### Table of contents
- [Prerequisites](#prerequisites)
- [What are push notifications?](#what-are-push-notifications?)
- [When do we need them?](#when-do-we-need-them?)
- [Creating a cloud function](#step-1---creating-a-cloud-function)
- [Getting started with Android studio](#step-2---getting-started-with-android-studio)
- [Adding necessary dependencies](#step-3---adding-necessary-dependencies)
- [Designing a user interface](#step-4---designing-a-user-interface)
- [Creating a notifications service](#step-5---creating-a-notifications-service)
- [Triggering notifications](#step-6---triggering-notifications)
- [Demo](demo)
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
Push notifications are messages that appear in a user's web browser, mobile phone, or desktop device. They are used by businesses to send messages, offers, and other information to their clients on time. A subscriber can be anywhere and still receive these messages as long as he/she is connected to the internet or have their phone or browser open. 

### When do we need them?
They provide convenience by allowing a user to receive:
- Immediate receipt of transactional receipts - Promotion of products or offers to boost sales.
- Sports scores and news are displayed on their lock screen - Utility notifications such as traffic, weather, and ski snow reports are displayed on their lock screen.
- Improve customer satisfaction.
- Information on flight check-in, changes, and connections.

> On your Firebase console, create a new Firebase project and make sure you have changed your payment plan to Blaze.

### Step 1 - Creating a cloud function
Before we jump to our Android Studio, let's first write a cloud function that will trigger every time new data is created in the real-time database.

> Make sure you have `Node.js` and Firebase CLI installed. 

Go to your desktop and create a folder, mine will be called - FirebasePushNotifsFunction

Open it in your terminal and key in the following commands:

- `firebase-login` - Logs into Firebase using your Google account.

![firebase-login](/engineering-education/implementing-database-driven-push-notifications-in-android-with-firebase/firebase-login.png)

- `firebase-init` - Initializes a Firebase project.

![firebase-inti](/engineering-education/implementing-database-driven-push-notifications-in-android-with-firebase/firebase-init.png)

- Choose the feature that you want to configure for this project - Firebase function.

![firebase-feature](/engineering-education/implementing-database-driven-push-notifications-in-android-with-firebase/firebase-feature.png)

- For the next step, choose an existing project and select the project that you created in the Firebase console.

- Then choose `Javascript` as the language that you will use.

- Next, do not allow ESLint.

- In this step, click 'Y' to install dependencies with npm.

And that's all, Firebase initialization is completed.

Open the folder with your preferred code editor, for example, VsCode, Atom, or Sublime Text.

Inside the functions directory, open `index.js` and write the following trigger code.

```js
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
                            title: "Payment Recieved",
                            body: "Dear customer your payment has been recieved, kindly wait for your balance to update"
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

The function uses the real-time database module and listens to the "/payment" reference. When a new payment with a 'paymentId' is created, this function is triggered. 

Inside the function, we read the device token stored in the database and send a notification to the device using the `sendToDevice` method.

> Feel free to customize this function according to your needs.

Once you are done writing the function, it is time to deploy it.

In your code editor terminal, write the following command to deploy the function - `firebase deploy --only functions`

![deploy-function](/engineering-education/implementing-database-driven-push-notifications-in-android-with-firebase/deploy-function.png)

If your function is deployed successfully, if you open your Firebase console and navigate to the Functions section, you should see the deployed function

![function](/engineering-education/implementing-database-driven-push-notifications-in-android-with-firebase/function.png)

### Step 2 - Getting started with Android studio
Open your Android Studio and create an empty Android project. 

Once the app is created, link it to the project you created on your Firebase console.

### Step 3 - Adding the necessary dependencies
In your app-level `build.gradle`, add the following dependencies.

```gradle
// Firebase functions
implementation 'com.google.firebase:firebase-functions:20.0.1'

// Firebase messaging
implementation 'com.google.firebase:firebase-messaging:20.2.1'

// Firebase Realtime database
implementation platform('com.google.firebase:firebase-bom:29.0.4')
implementation 'com.google.firebase:firebase-database'
```

### Step 4 - Designing a user interface
Create a simple user interface that will have two `EditText`: one for entering a name and another one for an amount. Also, include a `Button` that will trigger the notification when the user saves the data in the database. You can design a layout similar to this:

![layout](/engineering-education/implementing-database-driven-push-notifications-in-android-with-firebase/layout.png)

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

        val intent = Intent(this, MainActivity::class.java)

        val title = message.notification?.title
        val body = message.notification?.body

        val notificationManager =
            getSystemService((Context.NOTIFICATION_SERVICE)) as NotificationManager
        val notificationID = Random.nextInt()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel(notificationManager)
        }

        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)

        val pendingIntent = PendingIntent.getActivity(this, 0, intent, FLAG_ONE_SHOT)

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(body)
            .setSmallIcon(R.drawable.ic_baseline_notifications_24)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
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

In your `AndroidManifest.xml`, make sure you include the `Service`.

```manifest
<application
    ...

    <service
        android:name=".NotificationService"
        android:exported="false">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>

</application>
```

### Step 6 - Triggering notifications
In your `Mainactivity` class, inside the `onCreate` method, set an `onClickListener` to the `Button`. This will save the data entered in the `EditTexts` into the database.

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
When you run the app and save some data, you should receive a notification that it is triggered because some data has been saved in the "/payment" reference.

![demo](/engineering-education/implementing-database-driven-push-notifications-in-android-with-firebase/demo.gif)

### Conclusion
In this tutorial, we have learned what push notifications are and where they can be applied. We also went ahead and wrote a cloud function that triggers the push notification. Finally, we create a simple android app that saves data in the real-time database and receives a notification when the data is saved. Keep exploring more about push notifications.

To get the full implementation of the code, check out this repository - [Database Driven Push Notifications](https://github.com/JoelKanyi/DatabaseDrivenPushNotifs).

Happy coding!.
