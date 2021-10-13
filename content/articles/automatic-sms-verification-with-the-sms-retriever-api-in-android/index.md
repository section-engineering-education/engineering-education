
### Automatic SMS Verification 

The SMS Retriever API is usually used to perform user verification via text message. It does not need the user to input the codes  nor does it need any extra app permissions. This feature implemented on an android application gives a user a smooth experience. It also makes the app simple to use.
Let`s learn how to use this feature in our app!

### Prerequisites

To follow along with this tutorial, the reader should:
- Have an understanding of `Kotlin` programming language
- Know how to design layouts using `XML` in android studio
- Have an understanding of `Android Broadcasts`

### Goal

By the end of this tutorial, the reader will have :
- What is the SMS Verification process
- How to use an automatic SMS verification feature on your app.

### Introduction

 This API allows you to verify users' SMS without forcing them to enter verification codes. With this API, you can extract verification codes for your app.  This is done without requesting full SMS reading permissions.
 When the user device receives a message, Google play services check the app hash. It then sends the message text to your app over the SMS Retriever API. The app then reads and extracts the code in the SMS message. This code is usually sent back to the server for verification.

### SMS Verification process

For mobile number verification, you need to implement the client side first. Afterwards, the server side, to complete the verification procedure. Usually, you send the user's phone number to the server performing verification. The server then sends an OTP code to the phone number. The SMS Retriever API starts listening for an SMS containing OTP code. After receiving the code, send it back to your server to complete the verification process.

### Why use Automatic SMS Retriever API

- Google abolished all apps using `CALL_LOG` and `READ_SMS` permissions. This is because they violated of users privacy. This led to removal of apps  using these permissions from play store in January 19th, 2021.
- Users experience is smooth and almost effortless when using the app with this feature

### Step 1. Create a new Android studio project

![Create Project](/automatic-sms-verification-with-the-sms-retriever-api-in-android/create-project.png)


### Step2: Put dependencies on build.gradle file

We are going to use the following: 
- Apache Commons - We are going to use this library to help us extract the code from the SMS message.
- Google Play Services API - This library holds the SMS retrieval class
- EventBus - To listen for received SMS from the SMS Retrieval API, we'll use a BroadcastReceiver. EventBus is a publisher/subscriber pattern library. We use it to communicate between our BroadcastReceiver and Activity classes.

### Step 3: Setup the XML layout for our project

We'll create an Edit Text in this section. This Edit text will display one-time code obtained from our SMS message.

### Sending the mobile number to your server

In this step, you have to get the user's phone number from the `EditText`. Send this code to your verification server which will send you the one-time code. Because I don't have a verification server, I'm not going to use that method in this article. I'm going to send the SMS from another phone. The SMS I'll send will include a four-digit code. This code will be extracted and displayed on the Edit text we made in activity main.xml.
We will tackle this later in the article.

After you get the user's phone number, send it to your verification server in whatever way you choose.
Your server generates a verification code and sends to the phone number you entered. To perform SMS verification on a server, check out [SMS Verification on Server]. (https://developers.google.com/identity/sms-retriever/verify)

### Step 4: Getting an instance of the SmsRetriverClient object

We'll first create an instance of the SmsRetrieverClient object. Then invoke its initSmsRetriever instance function. We'll finally add `onSuccess` and `onFailure` Listeners to the Task. We wrap the code in a function for later use.

The above function is invoked on the `onCreate()` method.

The Play Services library we deployed before will broadcast a `SmsRetriever.SMS RETRIEVED ACTION` intent to the app. This happens in the event a device receives a message containing the code. This intent carries the SMS message text as well as the status of the background processing.
To deal with this, we'll make a BroadcastReceiver class:

On the `onReceive()` method, first check the status of `SMS Retriever` background processing. We also construct an instance of the `RetrievalEvent` class. This is the event class that `EventBus` will send to our `Subscriber`. The, class `RetrievalEvent` will be a data class. If you are completely new to [EventBus](https://greenrobot.org/eventbus/), please read on it. 

### RetrievalEvent

We set the property of the `RetrievalEvent` class to the SMS message we've retrieved. We do this if the background processing was successful. If a timeout occurs, we set timeout to true otherwise. Then, send the event to the listening subscriber.

**Note:** Timeouts occur if messages are not processed within 5 minutes. This happens during SMS Retrieval API's processing.

### Step 5: Register the BroadcastReceiver on AndroidManifest file

In your app's `AndroidManifest.xml` file, register `BroadcastReceiver`.


### Implementing subscriber

Next, in our `MainActivity class`, we'll register, unregister, and implement our subscribers. The `onReceiveSms()` method will be invoked when an event is posted. It is usually annotated with the `@Subscribe` annotation.
Registering and unregistering receiver is usually  done on `onStart()` and `onStop()` methods respectively. The `substringAfterLast()` function is used to extract the code sent through SMS. The code will the be display in our Edit Text.

**Note**: Always remember to register and unregister members to avoid memory leaks

### Computing your app's hash string

To generate the hash string, you can use the following methods: 

- Use [Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756?visit_id=637672247631770776-2285078183&rd=1)
- Use `SignatureHelper class`. This class will help to generate our app's hash string. If you use the helper class, make sure to remove it after you've obtained the hash string. Avoid using hash strings calculated on client side for you verification messages.

In our case, we are going to use the `SignatureHelper class` to generate our app's hash string. The hash string generated will appear on the `logcat`. 

Finally, remember that the format you should use on your message is as follows: 
- The message should be less than 140 bytes.
- The message should have the OTP code.
- Your message should end with you app's 11-character hash string 

The following is an example

```
Your Sms Retriever Api code is: 6647
u0tUcRo4UQ7

```

### Demo Screens

On running the app, this is what to expect:

![Screen One](/automatic-sms-verification-with-the-sms-retriever-api-in-android/screen-one.png)

You can find the whole project on [GitHub](https://github.com/robert-muriithi/SmsRetriverApiDemo.git)

### Conclusions

Automatic Retriever API is a library that helps in detecting and extracting OTP code. This code is usually sent back to the server for verification. This API performs the task without requiring the user to provide permissions for the app. This makes the user's onboarding experience is smooth and nice. 


Happy coding!



