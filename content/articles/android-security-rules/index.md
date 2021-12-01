Security is a fundamental factor in android applications. Maintaining the security of an android application ensures the confidentiality of users' data. In this tutorial, we are going to look at how to secure your android application's data. We are going to see how to secure data while sharing it with other users.

### Reasons for Android Security Rules
The following are the reasons for ensuring the security of an android application:
- To preserve user trust when using the application.
- To maintain the device integrity.
- To keep users' data confidential.

### Prerequisites
To follow through this tutorial, the reader should have the following:
- Android Studio installed and running.
- Basic understanding in building android projects using Kotlin.

### How To Secure Android Applications
The various ways of ensuring security include: 

#### 1. Asking for Users credentials
This is the most basic method for ensuring that your application is secured. User's credentials include passwords, PINs, patterns, and biometrics such as fingerprint and face recognition.
As a developer, you can implement these constraints in the program to help the user secure the data in the application.

#### 2. Enforcing Secure Communication Between Your App and Other Apps

This involves safeguarding the data you are sharing with other applications. While sharing your app's data with another application, you should ensure that your data is secured. There are also instances that your app can share data with a website. This should be done in a secured manner to prevent security breaches.

In enforcing secure communication we imply the concept of implicit intents that involves the communication of your app with other applications. In this scenario, we are going to see how to use implicit intents and non-exported content providers to enforce security while sharing app data with other apps or websites.

In the implicit intents, it is a good practice to show an app chooser when the intent can launch more than two apps on the user's device. This will allow the user to only transfer sensitive information to an application that they fully trust.

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
The intent example above has a simple layout having a button that when clicked, triggers the intent to allow you to choose the app you intend to share your data with.

#### 3. Disallowing Content Providers to Access your App's Data.
A content provider is a class that provides structured access to the data being managed by the Android application. There are various content providers and they must be defined in the `<provider>` element in the manifest.

If you intend to develop an application that runs on Android 4.1.1(API level 16) and below, you should set the [`ContentProvider`](https://developer.android.com/reference/android/content/ContentProvider) permission to false in the manifest to disallow other apps that might be accessing data from your app.

Since the `android:exported` attribute of the [`<provider>`](https://developer.android.com/guide/topics/manifest/provider-element) element is always `true` by default on the Android versions 4.1.1 while false for devices running Android API level 17 and above, setting it to true will ensure that the data being managed by your app is secured. When it's set to `true`, the provider is available for other applications while when it's set to `false`, the provider is not available for other devices.

Permissions are always set in the manifest. Add the following permission in the AndroidManifest.xml to disallow other apps from accessing the `ContentProvider`.

```manifest
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
- `<android:authorities>` - Is a list of one or more URI authorities that gives identity to the data offered by the content provider. The name of authority should use a Java-style naming convention to avoid conflicts for example, `com.example.provider.myaplication`. At least one authority must be specified since there is no default.

- `<android:name>` - Is the name of the content provider you intent to disallow. For example in this case is the [`<FileProvider>`](https://developer.android.com/reference/androidx/core/content/FileProvider) which is a subclass of the `<ContentProvider>` that ensures secure sharing of data associated with an app.

- `<android:exported>` - Its value can either be true or false to show whether the provider is available or not.

Although the [`<provider>`](https://developer.android.com/guide/topics/manifest/provider-element#auth) has various elements, we will only consider the three above for this article.

#### 4. Using up-to-date Services and Dependencies 
In android development, a service is an application component that can perform long-running operations in the background.

Types of Services include:
- Foreground Service - This is a service that performs some operations that the user can notice for example an audio app playing audio.

- Background Service - A service that performs operations that can not be noticed directly by the user.

For instance, if your app uses Google Play Services, you should ensure that it is updated on your device.

Next are the dependencies. Dependencies are the external libraries or local JavaArchive(jar) files included in an Android project. For example, when using Google Firebase to authenticate a user, you add a firebase dependency for authentication in the build.gradle(Module App) as:

```gradle
implementation 'com.google.firebase:firebase-auth:21.0.1'
```
For instance, when using the firebase auth dependency above, it's appropriate to use the updated version.

Dependencies also include libraries like Sofware Development Kits(SDKs) which can be updated directly from Android Studio using the SDK Manager.

>Note: Dependencies are added in the build.gradle in the android studio. Ensure you check the websites of the libraries that your app uses to have the updated version.

Some dependencies are deprecated or are no longer supported. Using them can cause insecurity in your application.

#### 5. Applying The Relevant Network Security Measures When Connecting Your App To The Internet
Network security measures are the tools that are added to a network to secure stored or transmitted data. To secure your app's data as a developer, you should include the following security measures if the app is intended to share data in a network.

The security measures include:
##### 1. Use of SSL traffic
SSL stands for Secure Sockets Layer which is the standard technology for ensuring that an internet connection is secure. It also safeguards any sensitive data that is being shared via the internet.

If you are developing an app that communicates with a web server and the server has a certificate issued by a trusted Certificate Authority, then sending the HTTPS request will be very simple.

HTTPS requests are used when you want to send POST or GET requests to a remote or web server. You must ensure that you are doing so via a secure channel. For example, you want to send a GET request, you will ensure that it is secured as in the code snippet below.
```kotlin
  fun sendGetRequest() {
        val url = URL("http://www.google.com/")

        with(url.openConnection() as HttpURLConnection) {
            requestMethod = "GET"
            println("\nSent 'GET' request to URL : $url; Response Code : $responseCode")
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
Android application security not only entails the security of data being shared across networks but also the security of data stored on the Android device. To learn more about the security of data stored on the device, visit [here](https://developer.android.com/topic/security/best-practices). Finally, in this article, we have only covered the most basic and frequently used security methods.
