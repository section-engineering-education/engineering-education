---
layout: engineering-education
status: publish
published: true
url: /integrating-hover-sdk-in-android/
title: Integrating Hover SDK for Offline M-Pesa Payments in Android
description: This tutorial will take the reader through the process of integrating the Hover SDK for offline M-Pesa payments in Android. 
author: joel-kanyi
date: 2021-09-22T00:00:00-05:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrating-hover-sdk-in-android/hero.png
    alt: Integrating Hover SDK for Offline M-Pesa Payments Hero Image
---
Integrating payment modules in Android applications is fun but it can be challenging for beginners. E-Payment is a key feature in monetization of e-commerce applications. In the modern world, M-Pesa transactions can be conducted both online and offline.
<!--more-->
There are different payment gateways to choose from when incorporating payment capabilities in your app. 

For instance, you can use Safaricom Daraja API, iPay, Pesapal, and PayPal. Howevever, these gateways lack one thing; offline support.

Most people own smartphones but are not always connected to the internet. They may need to make transactions such as sending money while offline. This is where the `Hover SDK` comes in.

### What is Hover SDK?
Hover is an Android SDK that allows integration of monetary functionalities into mobile apps.

This SDK does not require an internet connection, instead, it automates `USSD` sessions in an Android app.

The SDK can run USSD sessions on any mobile network globally. This includes USSD interactions like mobile money payments, buying airtime, paying bills, purchasing internet bundles, accessing banking services, and many more.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [How Does Hover SDK Work?](#how-does-hover-sdk-work)
- [What is an Action](#what-is-an-action)
- [Creating a Hover App in the Hover Dashboard](#creating-a-hover-app-in-the-hover-dashboard)
- [Implementing Hover in Android](#implementing-hover-in-android)
- [Conclusion](#conclusion)
- [References](#reference)

### Prerequisites
To follow along, you should have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your machine.
- Good knowledge of creating and running Android applications.
- Basic knowledge of the [Kotlin](https://kotlinlang.org/) programming language and View binding.
- A Hover account which you can create [here](https://www.usehover.com/u/sign_up).

### Goals
In this tutorial, we will:
- Get to know how Hover SDK works.
- Create a Hover app.
- Learn about actions, including how to create and customize them. 
- Integrate the Hover SDK into an Android app.

### How Does Hover SDK work?
Usually, USSD sessions involve dialing a given root code and then following the numbered instructions to access the services offered. 

This process is sometimes tiresome because the user may make mistakes or the USSD session may timeout.

In our case, we need to automate the `M-Pesa Send Money` service in Android with the Hover SDK. 

Here are the steps you can follow to send money to a person while using USSD sessions:

1. Dial `*334#`.
2. Press `1` to choose `Send money`.
3. Once again, press `1` to choose `Send money`.
4. Enter the recipient's `phone number`.
5. Enter the `amount` you wish to send.
6. Enter your `M-Pesa PIN`.
7. Finally, press `1` to `accept` and complete the transaction.

With  the Hover SDK, a user does not have to go through all these steps to make a transaction. The USSD session is automated.

### What is an Action?
The term `action` refers to the path taken when using USSD codes. Hover uses the action created to navigate to the device's USSD menu.

Log in to your hover account and click `+ New Action` on the dashboard to create an action. 

![Creating Action](/engineering-education/integrating-hover-sdk-in-android/new_action.png)

Actions consist of:
- A name - in this tutorial we will use `Send Money`.
- A description that is optional.
- Mobile network provider/SIM card that will run the service - we will use [Safaricom](https://www.safaricom.co.ke/personal/) in this tutorial.
- Action type - we will use the `USSD` type.
- Root code - shortcode used to start the session.

After creating the action, you need to add `steps`. Each screen in a USSD session is represented by a step.

The following are examples of different sorts of steps you can follow to Send Money from a USSD session:
- Number - Predefined options, such as inputting 1.
- Variables - Entries that change as the program runs, such as the amount to be sent. Hover SDK will enter them at runtime.
- PIN prompt - Shows the user a PIN entry screen. 

Here's how you can put the steps together in the Hover dashboard:
- A `Number` type step to select "1" for Send Money.
- Again, a `Number` type step to select "1" for Send Money.
- A `Variable` step for the recipient's phone number.
- A `Variable` step for the amount to be transferred.
- Add insert the user's PIN step - when the action is executed on the device, the user is requested to enter their PIN.
- Finally, provide a `Number` step that allows you to select "1" to complete a transaction.

![Add steps to Action](/engineering-education/integrating-hover-sdk-in-android/add_steps.png)

For the two variables that we have included, we will use the variable names `phoneNumber` and `amount` to provide values for these steps at runtime.

Once you've saved the action, you may move on to the next step. On your dashboard, you'll see something similar to this:

![Created Action](/engineering-education/integrating-hover-sdk-in-android/created_action.png)

### Creating a Hover App in the Hover Dashboard
Your Android app is represented by a Hover app that runs on Hover's server. A unique API token is assigned to each app built on the hover dashboard.

To create a Hover app, go to your account dashboard and select `+ New App`:
- Enter your app's name -this will only be used as a reference.
- Enter the name of your app package -it must be the same as the `applicationId` in your app-level `build.gradle` file.
- You may specify a webhook URL to which Hover will send a JSON representation of the USSD session information. 

![Creating Hover App](/engineering-education/integrating-hover-sdk-in-android/hover_app.png)

### Implementing Hover in Android
With the Hover SDK, we'll create a simple Android app that performs the M-Pesa Send Money transaction.

### Step 1 — Creating our Android application
In this step, create an empty Android Studio project, as shown below:

![Android Studio project](/engineering-education/integrating-hover-sdk-in-android/new_project.png)

### Step 2 — Setting up the project
In your project-level `build.gradle` file, add the `Hover` maven repository:

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "http://maven.usehover.com/releases" }
    }
}
```

In your app-level `build.gradle` file, add the Hover dependency:

```gradle
implementation 'com.hover:android-sdk:1.7.2'
```

In your `AndroidManifest.xml` file, include your API token:

```xml
<application
    ...
    <meta-data
        android:name="com.hover.ApiKey"
        android:value="Your_Token"/>
</application>
```

While still in the manifest file, don't forget to include the following permission:

```xml
<manifest
    ...
    <uses-sdk tools:overrideLibrary="com.hover.sdk" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
</manifest>
```

### Step 3 — Design the user interface
In this step, we will design a simple `XML` layout that will prompt the user to input the phone number of the recipient and an amount to transact. 

Finally, the layout will have a button to initiate the transaction process.

```xml
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
        android:layout_marginHorizontal="16dp"
        android:layout_marginTop="16dp"
        android:hint="Phone e.g. 07123456"
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

### Step 4 — Initialize Hover in the MainActivity
In the `onCreate` method, call `Hover.initialize(this)` to download the action that we created and initialize Hover SDK in the app.

### Step 5 — Run the USSD session
In this step, once a user clicks the send button, the USSD Action is initiated.

```kt
binding.buttonSend.setOnClickListener {
            try {
                val intent = HoverParameters.Builder(this)
                    .request("ActionID")
                    .extra("phoneNumber", binding.editTextPhoneNumber.text.toString().trim())
                    .extra("amount", binding.editTextAmount.text.toString().trim())
                    .buildIntent()

                startActivityForResult(intent, 0)
            } catch (e: Exception) {
                Toast.makeText(this@MainActivity, "Hover Error", Toast.LENGTH_SHORT).show()
            }
        }
```

In the code above, we have created an intent of type `HoverParameters` and chained the following methods:

- `.request("ActionID")` and pass your ActionID that was generated in the hover dashboard.
- `.extra("phoneNumber", PHONE_NUMBER)` and `.extra("amount", AMOUNT)` - these are the runtime variables that we declared when creating the Action.
- Finally, we've added the `buildIntent()` method to create a `HoverParamater` intent.

After creating the intent, call the `startActivityForResult(intent, 0)` to start it.

> Note: Remember to wrap your code inside a `try...catch` block to handle any exceptions.

### Step 6 — Listening for USSD Session's information
We override the `onActivityResult()` in our MainActivity to get the results of a processed USSD session. 

`RESULT_OK` indicates that a request was accepted and is being processed by the USSD operator while `RESULT_CANCELED` shows that something went wrong.

```kt
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        try {
            if (requestCode == 0 && resultCode == RESULT_OK) {

                Toast.makeText(this, "You will receive an M-Pesa confirmation message shortly",
                    Toast.LENGTH_SHORT).show()
            } else if (requestCode == 0 && resultCode == RESULT_CANCELED) {

                Toast.makeText(this, data?.getStringExtra("error"), Toast.LENGTH_SHORT).show()
                Log.d(TAG, "onActivityResult: ${data?.getStringExtra("error")}")
            }
        } catch (e: Exception) {
            Log.d(TAG, "onActivityResult: ${e.localizedMessage}")
        }
    }
```

You can get the `universally unique identifier` (UUID) of a session by doing the following:

```kotlin
val uuid = data?.getStringExtra("uuid");
```

### Conclusion
Hover SDK can be integrated into large projects that require payment modules. 

In this tutorial, we have learned how to outline actions, add steps, as well as create hover app on the Hover dashboard. We also integrated the Hover SDK into an Android application.

You can check out [this Github repository](https://github.com/JoelKanyi/HoverSDKDemo) for the whole implementation.

### Further reading
- [Hover SDK Official Documentation](https://docs.usehover.com/)


Happy Coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
