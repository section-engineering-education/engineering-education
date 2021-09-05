### Integrating Hover SDK for Offline M-Pesa Payments in Android with Kotlin 
Integrating payment modules to an Android app is fun and at the same time hard to know where to start from. Payment is a key feature in many applications that do monetization or have e-commerce features. With the current era, M-PESA payments can be made Online or Offline. 

 ### Introduction
There are different payment gateways on which to choose if you wish to incorporate payment capabilities in your app. You can use Safaricom Daraja API, iPay, Pesapal to name a few; but all these gateways lack one thing - offline payment. Most people own smartphones but are not always connected to the internet. They may need to make transactions such as sending money while not connected to the internet. This is where the Hover SDK comes in.

### What is Hover SDK
Hover SDK is an Android SDK that allows mobile developers to integrate monetary functionality into their apps.
This SDK does not require a connection to the internet; instead, it automates USSD sessions inside an Android app.  

The SDK can run USSD sessions on any mobile network globally. This includes USSD interactions like mobile money payments, buying of airtime, paying bills, purchasing bundles, accessing banking services, and many more.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [How Does Hover Work](#how-does-hover-work)
- [What is an Action](#what-is-an-action)
- [Creating a Hover App in the Hover Dashboard](#creating-a-hover-app-in-the-hover-dashboard)
- [Getting Started](#getting-started)
- [Conclusion](#conclusion)
- [References](#references)


### Prerequisites
To follow through this tutorial, you should have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your machine.
- Good knowledge of creating and running Android applications.
- Basic information of the [Kotlin](https://kotlinlang.org/) programming language.
- Have a Hover account, if you don't have one, you can [Sign Up](https://www.usehover.com/u/sign_up) to get started.

### Goals
In this tutorial we will:
- Get to know how Hover works.
- Create a hover app on the dashboard.
- Learn about Actions, including how to create and customize them. 
- Integrating the SDK into your app.

### How Does Hover Work
Usually, USSD sessions involve a person dialing a given root code and then following the numbered instructions to access the services that he/she wanted. This process is sometimes tiresome because the user may make mistakes in the steps or the USSD session may timeout.

In our case, we need to automate the M-PESA Send Money in Android with the Hover SDK. Here are the steps you can follow to send money to a person while using USSD sessions.
1. Dial `*334#`
2. Press "1" to Choose `Send Money`
3. Once again, press One to Choose `Send Money`
4. Enter the recipient's `Phone Number`
5. Enter the `Amount` you would like to send
6. Enter your `M-PESA PIN`
7. Finally, press "1" to `Accept` the transaction

With Hover SDK, a user doesn't have to go through all these steps to complete a transaction, it automates the USSD transaction.

### What is an Action
The term "action" refers to the path that one takes when using USSD codes. Hover uses the action created to navigate to the device's USSD menu.

Log in to your hover account and click `+  New Action` on the dashboard to create an action. 

[CreatingAction](/engineering-education/integrating-hover-sdk-for-offline-mpesa-payments-in-android-with-kotlin/new_action.png)

Actions consist of:
- A name - in this tutorial you can use “Send Money”.
- A description that is optional.
- Mobile network provider/SIM card that will run the service - you will use Safaricom because M-PESA works with Safaricom.
- Action type - you will use the `USSD` type in this tutorial
- Root code - shortcode used to start the session.

After creating the action, you need to add the steps:
Each screen in a USSD session is represented by a step. The following are examples of different sorts of steps you can follow to Send Money from a USSD session:
- Number - Predefined options, such as inputting "1."
- Variable - Entries that change as the program runs, such as the amount to be sent. Hover's SDK will enter it at runtime.
- PIN prompt - Shows the user a PIN entry screen. 

Here's how you can put the steps together in the Hover dashboard:
-  A `Number` type step to select "1" for Send Money.
-  Again a `Number` type step to select "1" for Send Money.
- A `Variable` step for the recipient's phone number
- A `Variable` step for the amount to be transferred
- Add insert the user's PIN step - when the action is executed on the device, the user is requested to enter their PIN.
- Finally, provide a `Number` step that allows you to select "1" to complete a transaction. 

[AddStepsToAction](/engineering-education/integrating-hover-sdk-for-offline-mpesa-payments-in-android-with-kotlin/add_steps.png)

For the two variables that we have included, you will use the variable names `phoneNumber` and `amount`, to provide values for these steps from your Android Application code.

Once you've saved the action, you may move on to the next step.
On your dashboard, you'll see something similar to this. 

[CreatedAction](/engineering-education/integrating-hover-sdk-for-offline-mpesa-payments-in-android-with-kotlin/hover_app.png)

### Creating a Hover App in the Hover Dashboard
Your Android app is represented by a Hover "app" that runs on Hover's server. A unique API token is assigned to each app built on the hover dashboard.
To create a Hover 'app,' go to your account dashboard and select " + New App":
- Enter your app's name; this will only be used as a reference.
- Enter the name of your app package; it must be the same as the `applicationId` in your app-level `build.gradle`.
- You may specify a webhook URL to which Hover will send a JSON representation of the USSD session information. 

[CreatingHoverApp](/engineering-education/integrating-hover-sdk-for-offline-mpesa-payments-in-android-with-kotlin/hover_app.png)

### Getting Started
With the Hover SDK, we'll create a simple Android app that performs M-PESA Send Money.

### Step 1 — Creating Our Android Application
In this step, create an empty android studio project. You can refer to the screenshot below.

[AndroidStudioProject](/engineering-education/integrating-hover-sdk-for-offline-mpesa-payments-in-android-with-kotlin/new_project.png)

### Step 2 — Setting up the project
To your project-level `build.gradle` repositories, add  `maven { url "http://maven.usehover.com/releases" }`

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "http://maven.usehover.com/releases" }
    }
}
```
To your app-level `build.gradle` add the Hover dependency. 
```gradle
 implementation 'com.hover:android-sdk:1.7.2'
```

In your `AndroidManifest.xml` file, include your API token:
```
<application
    ...
        <meta-data
            android:name="com.hover.ApiKey"
            android:value="Your_Token"/>
</application>
```

While still on the manifest file, don't forget to include the following:
```
<manifest
    ...
        <uses-sdk tools:overrideLibrary="com.hover.sdk" />

        <uses-permission android:name="android.permission.READ_PHONE_STATE"/>

</manifest>
```

### Step 3 — Design our User Interface Layout
In this step, you will design a simple `XML` layout that will prompt the user to input the phone number of the recipient and an amount to transact. Finally, the layout will have a button to initiate the transaction process.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:text="Hover SDK M-PESA Send Money"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/editTextPhoneNumber"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:hint="Phone i.e. 0706003891"
        android:inputType="phone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

    <EditText
        android:id="@+id/editTextAmount"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:hint="Amount"
        android:inputType="number"
        app:layout_constraintEnd_toEndOf="@+id/editTextPhoneNumber"
        app:layout_constraintStart_toStartOf="@+id/editTextPhoneNumber"
        app:layout_constraintTop_toBottomOf="@+id/editTextPhoneNumber" />

    <Button
        android:id="@+id/buttonSend"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:text="Send"
        app:layout_constraintEnd_toEndOf="@+id/editTextAmount"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="@+id/editTextAmount"
        app:layout_constraintTop_toBottomOf="@+id/editTextAmount"/>    
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4 — Initialize Hover in MainActivity
In your `onCreate` method, call `Hover.initialize(this)` to download the action that we created, and to also initialize Hover SDK to use it on your app.

### Step 5 — Run the USSD Session
In this step, once a user clicks on the send button, the USSD Action that you created on the Hover Dashboard is initiated.

```kotlin
binding.buttonSend.setOnClickListener {
            try {
                val intent = HoverParameters.Builder(this)
                    .request("14c45f2e")  //Action ID
                    .extra("phoneNumber", binding.editTextPhoneNumber.text.toString().trim())
                    .extra("amount", binding.editTextAmount.text.toString().trim())
                    .buildIntent()

                startActivityForResult(intent, 0)
            } catch (e: Exception) {
                Toast.makeText(this@MainActivity, "Hover Error", Toast.LENGTH_SHORT).show()
            }
        }
```
Here we create an intent of type `HoverParameters` and chain the following methods:
- `.request("ActionID")` and pass your Action ID that was generated in the hover dashboard.
- `.extra("phoneNumber", PHONE_NUMBER)` and `.extra("amount", AMOUNT)` - this are the runtime variables that you declared while creating the Action.
- Finally, add the `buildIntent()` method to create your `HoverParamater` intent.

After creating the intent, call the `startActivityForResult(intent, 0)` to start it.

>Note: Remember to wrap your code inside a `try...catch` block to handle any exceptions.

### Step 6 — Listening for USSD Session's Information
We override the `onActivityResult()` in our MainActivity to get the results of a processed USSD session. `RESULT_OK` indicates that a request was accepted and is currently being processed by the USSD operator while `RESULT_CANCELED` shows that something went wrong.

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        try {
            if (requestCode == 0 && resultCode == RESULT_OK) {

                Toast.makeText(
                    this,
                    "You will receive an MPESA Confirmation message shortly",
                    Toast.LENGTH_SHORT
                ).show()

            } else if (requestCode == 0 && resultCode == RESULT_CANCELED) {

                Toast.makeText(this, data?.getStringExtra("error"), Toast.LENGTH_SHORT).show()
                Log.d(TAG, "onActivityResult: ${data?.getStringExtra("error")}")
            }
        } catch (e: Exception) {
            Log.d(TAG, "onActivityResult: ${e.localizedMessage}")
        }
    }
```

You can get the `uuid` of a session by doing this:

```kotlin
val uuid = data?.getStringExtra("uuid");
```

### Conclusion
Hover SDK can be integrated into large projects that have payment modules. In the following section of this tutorial, you will learn how to parse a transaction confirmation SMS and send it to the Hover dashboard. Parsing will help us update the status of the transaction as either "succeeded", "failed" or "pending". Keep learning more about Hover SDK. Check out this Github repository to find out the whole implementation [HoverSDKDemo](https://github.com/JoelKanyi/HoverSDKDemo). 
Happy Coding!!!.

### References
- [Hover SDK Official Documentation](https://docs.usehover.com/)

