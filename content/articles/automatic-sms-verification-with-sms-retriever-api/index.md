---
layout: engineering-education
status: publish
published: true
url: /automatic-sms-verification-in-android/
title: Automatic SMS verification with SMS Retriever API in Android
description: This tutorial will take the reader through the process of setting up an automatic SMS verification in Android. When using SMS Retriever API, users do not need to enter the verification code manually.
author: robert-muriithi
date: 2021-11-23T00:00:00-19:10
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/automatic-sms-verification-in-android/hero.png
    alt: Automatic SMS verification in Android Hero Image
---
Automatic SMS verification can be done with the help of an API called the `SMS Retriever API`. With the use of this API, users do not need to enter the verification code manually nor does the API require any extra app permissions.
<!--more-->
In this tutorial, we'll learn how we can implement this feature in an Android app.

### Prerequisites
To follow along with this tutorial, the reader should:
- Have an understanding of the [`Kotlin`](/engineering-education/search/?q=Kotlin) programming language.
- Know how to design layouts using `XML` in Android studio.
- Have an understanding of `Android Broadcasts`.

### Goal
By the end of this tutorial, the reader should understand:
- What tje SMS Verification process is.
- How to use an automatic SMS verification feature on your app.

### What is SMS Retriever API?
SMS Retriever is an API that allows you to verify users' SMS without forcing them to enter verification codes. With this API, you can extract verification codes for your app. This is done without requesting full SMS reading permissions.

When the user device receives a message, Google play services checks the app hash. It then sends the message text to your app over the SMS Retriever API. The app then reads and extracts the code in the SMS message. This code is usually sent back to the server for verification.

### SMS verification process
For mobile number verification, you need to implement the client side first. Afterwards, the server side, to complete the verification procedure. Usually, you send the user's phone number to the server performing the verification. The server then sends an OTP (one time password) code to the phone number provided.

The SMS Retriever API listens for an SMS containing OTP code. Upon receiving the code, it sends it back to the server to complete the verification process.

### Why use Automatic SMS Retriever API?
- Google abolished all apps using `CALL_LOG` and `READ_SMS` permissions. This is because they violated users privacy. This led to removal of apps using these permissions from play store in January 19th, 2021.
- It provides a smoother and effortless user experience.

### Step 1. Create a new Android studio project

![Create Project](/engineering-education/automatic-sms-verification-in-android/create-project.png)

### Step 2: Add the necessary dependencies
We are going to use the following: 
- Apache Commons - This library will help us extract the code from the SMS message.
- Google Play Services API - This library holds the SMS retrieval class.
- EventBus - To listen for received SMS from the SMS Retrieval API, we'll use a BroadcastReceiver. EventBus is a publisher/subscriber pattern library. We use it to communicate between our BroadcastReceiver and Activity classes.

Add these to the build.gradle file and sync the project:

```bash
implementation 'org.apache.commons:commons-lang3:3.11'
implementation 'com.google.android.gms:play-services-auth:19.2.0'
implementation 'org.greenrobot:eventbus:3.2.0'
```

### Step 3: Setup the XML layout for our project
We'll create an Edit Text in this section. This Edit text will display one-time code obtained from our SMS message.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

        <EditText
            android:id="@+id/editText"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textAlignment="center"
            android:inputType="number"
            android:layout_marginTop="80dp"
            android:layout_marginStart="30dp"
            android:layout_marginEnd="30dp"/>
</LinearLayout>
```

### Sending the mobile number to the server
In this step, you have to get the user's phone number from the `EditText`. Send it to your verification server which should return the one-time code. Because I don't have a verification server yet, we're not going to use that method in this article. We'll send the SMS from another phone. The SMS will contain a four-digit code.

This code will be extracted and displayed on the EditText we added in `activity_main.xml`.

To perform SMS verification on a server, check out [SMS Verification on Server](https://developers.google.com/identity/sms-retriever/verify).

### Step 4: Getting an instance of the SmsRetriverClient
We'll first get an instance of the SmsRetrieverClient. This is followed by invoking initSmsRetriever instance function and adding `onSuccessListener` and `onFailureListener` to the task. We wrap all these in one function.

```kotlin
private fun initSmsListener() {
    smsClient.startSmsRetriever()
        .addOnSuccessListener {
            //You can perform your tasks here
        }.addOnFailureListener { failure ->
            failure.printStackTrace()
            Toast.makeText(this, failure.message, Toast.LENGTH_SHORT).show()
        }
}
```

The above function is called in the `onCreate()` method.

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var smsClient: SmsRetrieverClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        smsClient = SmsRetriever.getClient(this)
        
        initSmsListener()
    }
```

Our API will transmit a `SmsRetriever.SMS RETRIEVED ACTION` intent to the app. This happens in the event a device receives a message containing the code. This intent holds the SMS message and background processing status.

To deal with this, we'll create a BroadcastReceiver class:

```kotlin
class MessageBroadcastReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (SmsRetriever.SMS_RETRIEVED_ACTION == intent?.action) {
            val data = intent.extras
            if (data != null) {
                val status = data[SmsRetriever.EXTRA_STATUS] as Status
                var timedOut = false
                var otpCode: String? = null

                when (status.statusCode) {
                    CommonStatusCodes.SUCCESS -> {
                        val appMessage = data[SmsRetriever.EXTRA_SMS_MESSAGE] as String
                        otpCode = appMessage
                    }
                    CommonStatusCodes.TIMEOUT -> {
                        timedOut = true
                    }
                }
                EventBus.getDefault().post(RetrievalEvent(timedOut, otpCode.toString()))
            }
        }
    }
}
```

On the `onReceive()` method, first we check the status of `SMS Retriever` background processing. We also construct an instance of the `RetrievalEvent` class. This is the event class that `EventBus` will send to our `Subscriber`. The class `RetrievalEvent` will be a data class.

If you are completely new to EventBus, consider learning more about it [here](https://greenrobot.org/eventbus/).

#### RetrievalEvent

```kotlin
data class RetrievalEvent (
    val timedOut: Boolean,
    val message: String
    )
```

The properties of this data class is set to the retrieved SMS message. This is done if the background processing was successful. A timeout usually occurs if no message is received within 5 minutes. If it occurs, timeout is set to true. Then, send the event to the listening subscriber.

### Step 5: Register the BroadcastReceiver on Android Manifest
In your app's `AndroidManifest.xml` file, register `BroadcastReceiver`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest 
    ...     >

    <application
        ...     >

        <receiver
            android:name=".MessageBroadcastReceiver"
            android:exported="true">
            <intent-filter>
                <action android:name="com.google.android.gms.auth.api.phone.SMS_RETRIEVED"/>
            </intent-filter>
        </receiver>
    </application>

</manifest>
```

Next, in our `MainActivity class`, we'll register, unregister, and implement our subscribers. The `onReceiveSms()` method will be invoked when an event is posted. It is usually annotated with the `@Subscribe` annotation.

Registering and unregistering receivers is usually done on `onStart()` and `onStop()` methods respectively. The `substringAfterLast()` function is used to extract the code sent through SMS.

> NOTE: Always remember to register and unregister members to avoid memory leaks.

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var smsClient: SmsRetrieverClient
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        smsClient = SmsRetriever.getClient(this)

        //uncomment this to generate your app hash string. You can view the hash string on your log cat when you run the app
        /* val appSignatureHelper = SignatureHelper(this)
        Log.d("SIGNATURE",appSignatureHelper.appSignature.toString())*/

        initSmsListener()
    }
    
     override fun onStart() {
        super.onStart()
        EventBus.getDefault().register(this)
    }

    override fun onStop() {
        EventBus.getDefault().unregister(this)
        super.onStop()
    }
    
    private fun initSmsListener() {
        smsClient.startSmsRetriever()
            .addOnSuccessListener {
                Toast.makeText(
                    this, "Waiting for sms message",
                    Toast.LENGTH_SHORT
                ).show()
            }.addOnFailureListener { failure ->
                Toast.makeText(
                    this, failure.localizedMessage,
                    Toast.LENGTH_SHORT
                ).show()
            }
    }

    @Subscribe
    fun onReceiveSms(retrievalEvent: RetrievalEvent) {
        val code: String =
            StringUtils.substringAfterLast(retrievalEvent.message, "is").replace(":", "")
                .trim().substring(0, 4)

        runOnUiThread {
            if (!retrievalEvent.timedOut) {
                binding.editText.setText(code)
            } else {
                Toast.makeText(this, "Failed", Toast.LENGTH_SHORT).show()
            }
        }
        initSmsListener()
    }
}
```

### Computing your app's hash string
To generate the hash string, you can use the following methods:
- Use [Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756?visit_id=637672247631770776-2285078183&rd=1).
- Use `SignatureHelper class`. This class will help to generate our app's hash string. After using this class to obtain the hash string, always remove it.

```kotlin
    /**
     * This is a helper class to generate your message hash to be included in your SMS message.
     *
     * Without the correct hash, your app won't receive the message callback. This only needs to be
     * generated once per app and stored. Then you can remove this helper class from your code.
     */
class SignatureHelper(context: Context?) :
    ContextWrapper(context) {
    // For each signature create a compatible hash
     /**
       * Get all the app signatures for the current package
       */
    val appSignature: ArrayList<String>
        get() {
            val appCodes = ArrayList<String>()
            try {
                // Get all package signatures for the current package
                val myPackageName = packageName
                val myPackageManager = packageManager
                val signatures = myPackageManager.getPackageInfo(myPackageName,PackageManager.GET_SIGNATURES).signatures                                      
                // For each signature create a compatible hash
                for (signature in signatures) {
                    val hash = hash(myPackageName, signature.toCharsString())                      
                    if (hash != null) {
                        appCodes.add(String.format("%s", hash))
                    }
                }
            } catch (e: PackageManager.NameNotFoundException) {
                Log.d(TAG,"Package not found",e)                             
            }
            return appCodes
        }

    companion object {
        private const val HASH_TYPE = "SHA-256"
        const val HASHED_BYTES = 9
        const val BASE64_CHAR = 11
        private fun hash(pkgName: String, signature: String): String? {
            val appInfo = "$pkgName $signature"
            try {
                val messageDigest =  MessageDigest.getInstance(HASH_TYPE)                   
                messageDigest.update(appInfo.toByteArray(StandardCharsets.UTF_8))
                var myHashSignature = messageDigest.digest()
                // truncated into HASHED_BYTES
                myHashSignature = Arrays.copyOfRange(myHashSignature,0,HASHED_BYTES)                                                                       
                // encode into Base64
                var base64Hash = Base64.encodeToString(myHashSignature,Base64.NO_PADDING or Base64.NO_WRAP)                                          
                base64Hash = base64Hash.substring(0, BASE64_CHAR)
                Log.d(TAG, String.format("pkg: %s -- hash: %s", pkgName, base64Hash))                             
                return base64Hash
            } catch (error: NoSuchAlgorithmException) {
                Log.e(TAG, "Algorithm not Found", error)
            }
            return null
        }
    }
}
```

Finally, remember that the format you should use on your message is as follows: 
- The message should be less than 140 bytes.
- The message should have the OTP code.
- Your message should end with your app's 11-character hash string.

The following is an example

```bash
Your Sms Retriever Api code is: 6647
u0tUcRo4UQ7
```

### Demo Screens
Upon running the app, this is what to expect:

![Screen One](/engineering-education/automatic-sms-verification-in-android/screen-one.png)

You can find the whole project on [GitHub here](https://github.com/robert-muriithi/SmsRetriverApiDemo.git).

### Conclusion
Automatic Retriever API is a library that helps in detecting and extracting OTP code. This code is usually sent back to the server for verification. This API performs the task without requiring the user to provide permissions for the app. This makes the user's onboarding experience smooth and appealing.

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
