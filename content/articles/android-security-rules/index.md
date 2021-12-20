---
layout: engineering-education
status: publish
published: true
url: /android-security-rules/
title: Getting the Basics of Android Security Rules
description: This article will help the reader understand the basics of android security to build applications that are secure internally and ensure safety when communicating with other applications.
author: collince-okeyo
date: 2021-12-20T00:00:00-13:40
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-security-rules/hero.png
    alt: Getting the basics of Android security rules Hero Image
---
Security is a fundamental factor in Android applications. Maintaining the security of an Android application ensures the confidentiality of users' data. 
<!--more-->
This article will look at how to secure an Android application's data. Furthermore, we will see how to secure data while sharing it with other users.

### Reasons for Android security rules
Below are a few reasons to ensure the security of an Android application:
- To preserve user trust when using the application.
- To maintain the device integrity.
- To keep users' data confidential.

### Prerequisites
To follow through this tutorial, the reader should have the following:
- Android Studio installed and running.
- Basic understanding of building Android projects using Kotlin.

### How to secure Android applications
The various ways of ensuring security include: 

#### 1. Asking for users credentials
Asking for credentials is the most basic method for securing an application. Passwords, personal identification numbers (PINs), patterns, and biometrics such as fingerprint and face recognition are all examples of user credentials. Ss a developer, you can implement these constraints in the program to help the user secure the data in the application.

#### 2. Secure applications communications 
This process entails protecting the information you share with other apps. While sharing your application's data with another application, you should ensure that your data is secured and the process is done securely. 

There are also instances when an app can share data with a website. Again, this should be done in a secured manner to prevent security breaches.

In enforcing secure communications, we imply the concept of implicit intents that involves your app's communication with other applications. This scenario will show how to use implicit intents and non-exported content providers to enforce security while sharing app data with other apps or websites.

It is good to show an app chooser when the intent can launch more than two apps on the user's device in the implicit intents. Doing so will allow the user only to transfer sensitive information to an application that they fully trust.

App chooser can be implemented as below:
```kotlin
        intentButton.setOnClickListener {
            val intentChoose = Intent(Intent.ACTION_SEND)
            val availableActivities: List<ResolveInfo> = packageManager.queryIntentActivities(intentChoose, PackageManager.MATCH_ALL)

            // Verify that the user has at least two apps that can handle the intent
            if (availableActivities.size > 1) {
                
                //Intent to show app chooser, title can be any string
                val title = resources.getString(R.string.select_title).let { title ->
                    Intent.createChooser(intentChoose, title)
                }
                startActivity(title)
            } else if (intentChoose.resolveActivity(packageManager) != null) {
                startActivity(intentChoose)
            }
        }
```

The intent example above has a simple layout with a button that triggers the intent to choose the app you intend to share your data with.

#### 3. Limit content providers data access 
A content provider is a class that provides structured access to the data being managed by the Android application. Various content providers must be defined in the manifest's `<provider>` element.

If you intend to develop an application that runs on Android 4.1.1 (API level 16) and below, you should set the [`ContentProvider`](https://developer.android.com/reference/android/content/ContentProvider) permission to false in the manifest to disallow other apps that might be accessing data from your app.

Because the ['provider>'](https://developer.android.com/guide/topics/manifest/provider-element)  has an 'android:exported' attribute, setting the element to true ensures that the data managed by your app is secure. 

The element is always 'true' by default on Android versions 4.1.1, while it is false for devices running Android API level 17 and above.  When it is set to `true`, the provider is available for other applications, while when it is set to `false`, the provider is not available for other devices.

Permissions are always set in the manifest. For example, add the following permission in the AndroidManifest.xml to deny other apps access to the `ContentProvider`.

```bash
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.ramgdeveloper.androidsecurityrules">
    
    // Permission to disallow ContentProvider
    
    <application
       
        <provider
            android:authorities="com.developer.androidsecurityrules.fileprovider"
            android:name="androidx.core.content.FileProvider"
            android:exported="false">
            // You can add other elements here.
        </provider>
       
    </application>

</manifest>
```

The `<provider>`attributes have the following elements:
- `<android:authorities>` - Is a list of one or more URI authorities that gives identity to the data offered by the content provider. The authority name should use a Java-style naming convention to avoid conflicts, for example, `com.example.provider.myaplication`. At least one authority must be specified since there is no default.

- `<android:name>` - Is the name of the content provider you intend to disallow. For example, in this case, it is the [`<FileProvider>`](https://developer.android.com/reference/androidx/core/content/FileProvider) which is a subclass of the `<ContentProvider>` that ensures secure sharing of data associated with an app.

- `<android:exported>` - Its value can either be true or false to show whether the provider is available or not.

Although the [`<provider>`](https://developer.android.com/guide/topics/manifest/provider-element#auth) has various elements, we will only consider the three above for this article.

#### 4. Using up-to-date services and dependencies 
In android development, a service is an application component that can perform long-running operations in the background.

Types of services include:
- Foreground Service - This is a service that performs some operations that the user can notice, for example, an audio app playing audio.

Background Service: A service that performs operations that the user cannot notice directly.

For instance, if your app uses Google Play Services, you should ensure that it is updated on your device.

Next are the dependencies. Dependencies are the external libraries or local JavaArchive (jar) files included in an Android project. For example, when using Google Firebase to authenticate a user, you add a firebase dependency for authentication in the **build.gradle(Module App)** as:

```gradle
implementation 'com.google.firebase:firebase-auth:21.0.1'
```
For instance, using the firebase auth dependency above is appropriate to use the updated version. Dependencies also include libraries like Sofware Development Kits (SDKs) which can be updated directly from Android Studio using the SDK Manager.

>Note: Dependencies are added in the `build.gradle` in the Android studio. Because some dependencies are deprecated or no longer supported, make sure you check the websites of the libraries your app requires for the most recent version. 

Some dependencies are deprecated or are no longer supported. Using them can cause insecurity in your application.

#### 5. Applying relevant network security measures when connecting to the internet
Network security measures are the tools added to a network to secure stored or transmitted data. To secure your app's data as a developer, you should include the following security measures if the app is intended to share data in a network.

##### Use of Secure Sockets Layer traffic
SSL stands for Secure Sockets Layer, the standard technology for ensuring a secure internet connection. It also safeguards any sensitive data that is being shared via the internet.

Sending an HTTPS request will be pretty straightforward if you design an app that communicates with a web server with a certificate issued by a trusted Certificate Authority. 

HTTPS requests send POST or GET requests to a remote or web server. You must ensure that you are doing so via a secure channel. For example, you want to send a GET request to secure it, as in the code snippet below.

```kotlin
   // Function for sending a secure GET request
  fun getRequest() {
        // GET request URL
        val requestUrl = URL("https://www.section.io/")
        
        /* Sending secure GET request
        * Opening the connection via HttpURLConnection
        */
        
        with(requestUrl.openConnection() as HttpURLConnection) {
            requestMethod = "GET"
            println("\nSent 'GET' request to URL : $requestUrl; Response Code : $responseCode")
            inputStream.bufferedReader().use { response -> 
                response.lines().forEach { message ->
                    println(message)
                }
            }
        }
    }
```

> Note: For a GET request to be successful, you need to allow internet permissions in the manifest.

```manifest
<uses-permission android:name="android.permission.INTERNET"/>
```

### Conclusion
Android application security entails the security of data being shared across networks and the security of data stored on the Android device. This article only covered the most basic and frequently used security methods. To learn more about data security stored on the device, visit [here](https://developer.android.com/topic/security/best-practices). 

Happy learning!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
