---
layout: engineering-education
status: publish
published: true
url: /callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/
title: Creating a Callback URL for Safaricom Daraja API with Firebase Cloud Functions in Android
description: This tutorial will guide the reader through the process of creating a callback URL for the Safaricom Daraja API with Firebase Cloud Functions in Android.
author: osir-evaline
date: 2021-11-24T00:00:00-13:45
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/hero.png
    alt: Creating a Callback URL for Safaricom Daraja API with Firebase Cloud Functions in Android hero image
---
Implementing `Lipa-Na-Mpesa` (Pay with MPesa) features in your Android has been made easier with the introduction of the [Daraja API](https://github.com/jumaallan/android-mpesa-api) developed by [Safaricom](https://www.safaricom.co.ke/).
<!--more-->
Many developers wish to receive all the information that Safaricom sends when a user performs a transaction. Some transactions may go through and some others fail. This information is useful in updating records in your application.

As an Android developer, having a callback URL means that you need to have a REST backend that will receive a response. This might be expensive. We can create a simple API with Firebase Cloud Functions that will help us to receive the data for the callback URL.

### Table of contents
- [Prerequisites](#prerequisites)
- [Daraja API Callback URL](#daraja-api-callback-url)
- [Create a project on Firebase Console](#step-1---create-a-project-on-firebase-console)
- [Create a Project on Android Studio](#step-2---create-a-project-on-android-studio)
- [Create a Firebase Cloud Function](#step-3---create-a-firebase-cloud-function)
- [Creating an App in the Safaricom Developers Portal](#step-4---creating-an-app-in-the-safaricom-developers-portal)
- [Designing the layout](#step-5---designing-the-layout)
- [Creating Data Class](#step-6---creating-data-class)
- [Creating M-Pesa Interface](#step-7---creating-m-pesa-interface)
- [Firebase Messaging Service](#step-8---firebase-messaging-service)
- [MainActivity](#step-9---write-mainactivity-code)
- [App Demo](#app-demo)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To complete this tutorial, you must have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your computer.
- Solid understanding of how to create and run Android apps.
- Basic knowledge of [Kotlin](https://kotlinlang.org/) and Coroutines.
- Understanding of Cloud Functions. You can learn how to develop a serverless function in this tutorial [Creating A Serverless Function](https://www.section.io/engineering-education/serverless-api-firebase/).

### Daraja API Callback URL
A callback is an asynchronous API request that comes from the API server and is sent to the client in response to one of the client's previous requests. When using Daraja API, Safaricom requires you to pass a URL that they will return information of the processed transactions from your App.

### Step 1 - Create a project on Firebase Console
First, create a project on Firebase and link it to your Android app. After a successful linking, make sure your project is in the `Blaze` Plan so that we can use Cloud Functions.

![Change To Blaze](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/changetoblaze.png)

### Step 2 - Create a Project on Android Studio
Create an empty Android Project:

![New Project](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/create-android-proj.png)

Add all the necessary dependencies:

```bash
// Daraja API Library
implementation 'com.androidstudy:daraja:1.0.2'

// Firebase Functions
implementation 'com.google.firebase:firebase-functions:20.0.1'

// Firebase Messaging
implementation 'com.google.firebase:firebase-messaging:20.2.1'

// Gson
implementation 'com.google.code.gson:gson:2.8.6'

// Android Kotlin Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.2'
```

### Step 3 - Create a Firebase Cloud Function
We will start by creating a Firebase function, if you don't know how to create one, use this article [Firebase Function](/engineering-education/serverless-api-firebase/) to set it up.

Let's quickly create a Cloud Function that we will use.

Once your project is ready and you have added all the necessary dependencies, open the terminal in your Android Studio and key in the following commands:

1. `npm install -g firebase-tools` - to install Firebase.
2. `firebase login` - Login to your Firebase Function.
3. `firebase init functions` - to initialize your project.
4. Choose, `Use an Existing project`.
5. Choose the project that you want to link the functions, for this tutorial I'll choose `LNMCallback`.
6. For language, choose `Javascript`.
7. For ESLint, just choose `N`.
8. To install dependencies with npm? - Choose `Y`.

Once you see that the Firebase initialization is complete! We're ready to proceed to the next step. We need to install `express body-parser` which is a middleware, for us to be able to read the `body` of an incoming JSON object.

In your Android Studio, switch to project-view and open the `functions` folder in the terminal and paste the following command:

```bash
npm install express body-parser -S
```

Once you've installed the body-parser, you're ready to go. 

In 'index.js,' we need to write the Cloud Function code, erase everything and paste the following code:

```javascript
let functions = require('firebase-functions');
let admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const express = require('express');
const body_parser = require('body-parser');

const app = express();
app.use(body_parser.json());
app.disable('x-powered-by');

app.post('/CallbackUrl', (request, result) => {
    let response = { "ResultCode": 0, "ResultDesc": "Success" }

    result.status(200).json(response);

    let requestBody = request.body;
    let myPayload = JSON.stringify(requestBody)

    // Logs successful function calls
    console.log(myPayload)

    let topicId =  body.Body.stkCallback.CheckoutRequestID

      const sentPayload = {
          data: {
            myPayload,
            },
            topicId : id
        };

         return admin.messaging().send(sentPayload).catch(error=>{
         
            // Logs Failed function calls    
         console.error(error)
         })
})

exports.api = functions.https.onRequest(app);
```

It's time to deploy the function to Firebase after writing the code. Use `firebase deploy --only functions` to deploy the function.

Once the deployment is complete, you should see something like this: 

![Deployed](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/deployed.png)

When you open your Firebase Console, you will be able to see the deployed function.

### Step 4 - Creating an App in the Safaricom Developers Portal
In this step, we'll link our app with Safaricom Daraja API - Lipa Na Mpesa.

Go to [Safaricom developer portal](https://developer.safaricom.co.ke/) and log in. If you don't have an account yet, create one.

Once ready, in the menu bar click on *My Apps* and choose, *Create a new app* and make sure you have ticked **Lipa na M-Pesa Sandbox**.

![New App](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/create-app.png)

> Take note of the `CONSUMER_KEY` and the `CONSUMER_SECRET` because we will use them later in the App.

![Mpesa App](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/mpesa-app.png)

### Step 5 - Designing the layout
In this step, we will create a simple XML layout that will contain an EditText for inputting a phone number and a button to initiate the transaction.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/editTextPhone"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="32dp"
        android:layout_marginEnd="32dp"
        android:hint="@string/phone_number"
        android:importantForAutofill="no"
        android:inputType="phone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.31" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:text="@string/pay"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/editTextPhone" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/lipa_na_m_pesa"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintBottom_toTopOf="@+id/editTextPhone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 6 - Creating Data Class
In this step, we will create a data class that will map our response from the API. 

```kotlin
data class Transaction(
    @SerializedName("Body")
    val body: Body
) {
    data class Body(
        @SerializedName("stkCallback")
        val stkCallback: StkCallback
    ) {
        data class StkCallback(
            @SerializedName("CallbackMetadata")
            val callbackMetadata: CallbackMetadata,
            @SerializedName("CheckoutRequestID")
            val checkoutRequestID: String,
            @SerializedName("MerchantRequestID")
            val merchantRequestID: String,
            @SerializedName("ResultCode")
            val resultCode: Int,
            @SerializedName("ResultDesc")
            val resultDesc: String
        ) {
            data class CallbackMetadata(
                @SerializedName("Item")
                val item: List<Item>
            ) {
                data class Item(
                    @SerializedName("Name")
                    val name: String,
                    @SerializedName("Value")
                    val value: String
                )
            }
        }
    }
}
```

### Step 7 - Creating the M-Pesa interface
In this step, we'll define an interface with two methods. The first method will be called when a transaction is successful, while the second one will be called when a transaction fails due to different reasons such as insufficient balance.

```kotlin
interface MpesaListener {
    fun sendingSuccessful(transactionAmount: String, phoneNumber: String, transactionDate: String, MPesaReceiptNo: String)

    fun sendingFailed(cause: String)
}
```

### Step 8 - Firebase messaging service
In this step, we will create a Firebase Messaging Service class that will do most of the app logic of receiving the response of the API.

```kotlin
class MessagingService : FirebaseMessagingService() {

    override fun onNewToken(p0: String) {
        super.onNewToken(p0)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        if (remoteMessage.data.isNotEmpty()) {
            val myPayload = remoteMessage.data["payload"]
            val gson = Gson()

            val mpesaResponse: Transaction = gson.fromJson(myPayload, Transaction::class.java)

            val topicID = mpesaResponse.body.stkCallback.checkoutRequestID

            if (mpesaResponse.body.stkCallback.resultCode != 0) {
                val cause = mpesaResponse.body.stkCallback.resultDesc
                MainActivity.mpesaListener.sendingFailed(cause)

            } else {
                val infoList: List<Body.StkCallback.CallbackMetadata.Item> =
                    mpesaResponse.body.stkCallback.callbackMetadata.item

                var dateOfTransaction = ""
                var amountTransacted = ""
                var receiptNo = ""
                var phoneNumber = ""

                infoList.forEach { transaction ->
                    if (transaction.name == "MpesaReceiptNumber") {
                        receiptNo = transaction.value
                    }
                    if (transaction.name == "TransactionDate") {
                        dateOfTransaction = transaction.value
                    }
                    if (transaction.name == "PhoneNumber") {
                        phoneNumber = transaction.value
                    }
                    if (transaction.name == "Amount") {
                        amountTransacted = transaction.value
                    }
                }

                MainActivity.mpesaListener.sendingSuccessful(
                    amountTransacted,
                    phoneNumber,
                    extractDate(dateOfTransaction),
                    receiptNo
                )
            }

            FirebaseMessaging.getInstance().unsubscribeFromTopic(topicID)
        }
    }

    private fun extractDate(date: String): String {
        return "${date.subSequence(6, 8)}${date.subSequence(4, 6)} ${
            date.subSequence(0, 4)
        } at ${date.subSequence(8, 10)}:${date.subSequence(10, 12)}:${date.subSequence(12, 14)}"
    }
}
```

In your manifest file, make sure you have included the service that we have created, go to your manifest and paste the following lines of code:

```xml
<application>
...
  <service
      android:name=".MessagingService"
      android:stopWithTask="false"
      android:exported="false">
      <intent-filter>
          <action android:name="com.google.firebase.MESSAGING_EVENT" />
      </intent-filter>
  </service>
</application>
```

### Step 9 - Write MainActivity code
In this step, we will write code that makes use of the [android-mpesa-api](https://github.com/jumaallan/android-mpesa-api) to integrate payment into our app.

#### Initializing the Daraja API
Here, replace the `SECRET_KEY` and the `CONSUMER_SECRET_KEY` with the ones that you were given when you created an App in the Safaricom developers portal.

```kotlin
daraja = Daraja.with("CONSUME_KEY", "CONSUMER_SECRET_KEY", Env.SANDBOX,
    object : DarajaListener<AccessToken> {
        override fun onResult(result: AccessToken) {
            Toast.makeText(applicationContext, result.access_token, Toast.LENGTH_SHORT).show()
        }

        override fun onError(error: String?) {
            Toast.makeText(applicationContext, error.toString(), Toast.LENGTH_SHORT).show()
        }

    })
```

When a user clicks the button, we need the following code to be executed:

```kotlin
findViewById<Button>(R.id.button).setOnClickListener {
    val phoneNumber = phoneNum.text.toString()
    val lnmExpress = LNMExpress(
        "174379",
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
        TransactionType.CustomerPayBillOnline,
        "1",
        phoneNumber,
        "174379",
        phoneNumber,
        "https://us-central1-lnmcallback-c79b4.cloudfunctions.net/api/CallbackUrl",
        "001ABC",
        "Goods Payment"
    )
    ....
```

Here, we pass the phone number and also use 1 as the default amount for the transaction.

> Go to your Firebase console in the Functions section and copy the URL for our API that was generated.

![Function](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/functions-console.png)

In this case, mine is:

`https://us-central1-lnmcallback-c79b4.cloudfunctions.net/api`

Append the word `/CallbackUrl` to the end of the URL, so that the end URL looks like this:

`https://us-central1-lnmcallback-c79b4.cloudfunctions.net/api/CallbackUrl`

This will be our callback URL so that Safaricom can send us the response to transactions that have been initiated. Go and replace `MY_CALLBACK_URL` with the new URL.

### Attaching FirebaseMessaging service
In this step, inside the `onResult` method, we instantiate the `FirebaseMessaging` and subscribe to topics with the `CheckoutRequestID` of the transaction that has been initiated.

```kotlin
daraja.requestMPESAExpress(lnmExpress, object : DarajaListener<LNMResult> {
    override fun onResult(result: LNMResult) {
        FirebaseMessaging.getInstance().subscribeToTopic(result.CheckoutRequestID.toString())
    }

    override fun onError(error: String?) {
        Toast.makeText(applicationContext, "An Error Occurred: $error", Toast.LENGTH_SHORT).show()
    }
})
```

> Make sure your MainActivity implements the interface that we have created and overrides the methods that we have created in it. 

Inside the two methods that we have overridden, we'll define a `CoroutineScope` and add a `Toast` to indicate the success or failure of the transaction.

```kotlin
override fun sendingSuccessful(transactionAmount: String, phoneNumber: String, transactionDate: String, MPesaReceiptNo: String) {
    CoroutineScope(Dispatchers.Main).launch {
        Toast.makeText(
            applicationContext,
            "Transaction Successful\nM-Pesa Receipt No: $MPesaReceiptNo\nTransaction Date: $transactionDate\nTransacting Phone Number: $phoneNumber\nAmount Transacted: $transactionAmount", Toast.LENGTH_LONG).show()
    }
}

override fun sendingFailed(cause: String) {
    CoroutineScope(Dispatchers.Main).launch {
        Toast.makeText(
            applicationContext, "Transaction Failed\nReason: $cause", Toast.LENGTH_LONG
        ).show()
    }
}
```

#### The whole implementation of the MainActivity

```kotlin
class MainActivity : AppCompatActivity(), MpesaListener {

    companion object {
        lateinit var mpesaListener: MpesaListener
    }

    private lateinit var daraja: Daraja

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mpesaListener = this

        val phoneNum = findViewById<EditText>(R.id.editTextPhone)

        daraja = Daraja.with("CONSUME_KEY", "CONSUMER_SECRET_KEY", Env.SANDBOX,
            object : DarajaListener<AccessToken> {
                override fun onResult(result: AccessToken) {
                    Toast.makeText(applicationContext, result.access_token, Toast.LENGTH_SHORT).show()
                }

                override fun onError(error: String?) {
                    Toast.makeText(applicationContext, error.toString(), Toast.LENGTH_SHORT).show()
                }
            })

        findViewById<Button>(R.id.button).setOnClickListener {
            val phoneNumber = phoneNum.text.toString()
            val lnmExpress = LNMExpress(
                "174379",
                "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
                TransactionType.CustomerPayBillOnline,
                "1",
                phoneNumber,
                "174379",
                phoneNumber,
                "https://us-central1-lnmcallback-c79b4.cloudfunctions.net/api/CallbackUrl",
                "001ABC",
                "Goods Payment"
            )

            daraja.requestMPESAExpress(lnmExpress, object : DarajaListener<LNMResult> {
                override fun onResult(result: LNMResult) {
                    FirebaseMessaging.getInstance().subscribeToTopic(result.CheckoutRequestID.toString())
                }

                override fun onError(error: String?) {
                    Toast.makeText(applicationContext, "An Error Occurred: $error", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }

    override fun sendingSuccessful(transactionAmount: String, phoneNumber: String, transactionDate: String, MPesaReceiptNo: String) {
        CoroutineScope(Dispatchers.Main).launch {
            Toast.makeText(
                applicationContext,
                "Transaction Successful\nM-Pesa Receipt No: $MPesaReceiptNo\nTransaction Date: $transactionDate\nTransacting Phone Number: $phoneNumber\nAmount Transacted: $transactionAmount", Toast.LENGTH_LONG).show()

        }
    }

    override fun sendingFailed(cause: String) {
        CoroutineScope(Dispatchers.Main).launch {
            Toast.makeText(
                applicationContext, "Transaction Failed\nReason: $cause", Toast.LENGTH_LONG
            ).show()
        }
    }
}
```

#### App Demo
Upon running the app, it should look like this and you should be able to initiate a transaction:

![Send Success](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/send-success.png)

![Send Failed](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/send-failed.png)

#### Firebase Functions Log
![Functions Logs](/engineering-education/callback-url-for-safaricom-daraja-api-with-firebase-cloud-functions-in-android/successful-transaction.png)

### Conclusion
In this tutorial, we learned how to create a Callback URL, we also saw how to create an App in the Safaricom developers Portal. Finally we used the URL that we created to receive callbacks from transactions. 

It was a long tutorial and I hope you have learned a lot. For a full implementation of the tutorial, check this [Github Repository](https:github.com/osirevaline/LNMCallback.git).

Happy coding!

### References
- [Safaricom Daraja Documentation](https://developer.safaricom.co.ke/)
- [Creating a Serverless API](https://www.section.io/engineering-education/serverless-api-firebase/)



---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
