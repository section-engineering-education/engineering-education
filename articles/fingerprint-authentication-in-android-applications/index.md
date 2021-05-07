---
layout: engineering-education
status: 
published: 
url: /engineering-education/fingerprint-authentication-in-android-applications/
title: Impleemening Fingerprint Authentication in Android applications.
description: In this article, we will learn how to implement fingerprint authentication in an Android application.
author: briana-nzivu
date: 2021-05-01T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/fingerprint-authentication-in-android-applications/hero.jpg
    alt: Fingerprint authentication
---

Biometrics are body measurements and calculations related to human characteristics. Biometrics is classified into two categories: Physical and behavioral. Physical biometrics is our humanly features such as our fingerprints, iris, and many others. Behavioral is our actions, for example, smiling, hand signs, and others. 
<!--more-->
In turn, biometrics has brought up vast, easy, and secure ways to identify a specific user using their physical traits.

### Introduction.
Let us admit it, typing over eight characters in the name of a password is quite a task, that is, if a user even remembers the password. These days most developers and companies have made it easier for us by using biometrics as a form of authentication. Biometrics, time and again, has proved to be more efficient and less prone to cyber-attacks. Most fields such as Banking, Information Technology, Education, and many others have implemented biometrics into their systems for various purposes. This article will cover one of the biometric ways of authentication, which is using our fingerprint.

### Advantages of Biometrics.
- Biometrics is ser specific in that it is linked to a single individual (unlike a password which anyone can authorize).
- It is very convenient since there is no need to remember or carry anything.
- It is very secure. Biometrics is highly fraud-resistant.

### Disadvantages.
- They are error-prone, sometimes even causing the system to shut down; hence access is limited.
- Biometric devices and in-built biometric features are costly compared to other traditional devices.

### Goal
By the end of this tutorial, the reader should be able to:
- The reader should understand what biometrics is and the various applications of biometrics.
- The reader should understand how to implement fingerprint authentication in android applications.

### Prerequisites.
- The reader should be able to build basic Android applications.
- The reader should have basic knowledge of XML and Kotlin programming languages.
- The reader should have [Android Studio](https://developer.android.com/studio?gclid=Cj0KCQjwp86EBhD7ARIsAFkgakhSirHOm4QNJmMxF6ymWW0O1lJuWBfyvW5sVQRWJSlhAc6uGLdCBSwaAjBoEALw_wcB&gclsrc=aw.ds) installed.
- An Android mobile phone which has inbuilt biometric features, especially a fingerprint scanner.

### Step One: Create a new Android Studio project.
In his step, we will create a new Android studio project. Open Android Studio and select start a new Android Studio Project -> Empty Activity. We will name the project **FingerprintAuthentication.** Select *Finish* and wait for the project to build.

![Create a new Android Studio project](/engineering-education/fingerprint-authentication-in-android-applications/new.jpg)

### Step Two: Enable the biometrics permission in the manifest file.
In our `AndroidManifest.xml` file, we will add the biometrics permission statement, which will allow our application to access the inbuilt biometrics features in our devices. Add the following line of code in your AndroidManifest.xml:

```manifest
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```
### Step Three – Adding the biometrics library to our project.
Add the following dependencies to your app-level `build.gradle` file.

```gradle
def biometricLibraryVersion = "1.0.1"
implementation "androidx.biometric:biometric:$biometricLibraryVersion"
```

### Step Four: Create a new Empty Activity.
Since our application will require us to use biometrics to access a top-secret activity, we will create an activity that will contain a secret message. Right-click the java directory and select New -> Activity -> Empty Activity. Let us name our new activity **Secret.** Click *Finish.*
Our Secret Activity's UI will only contain a Textview which will display an optional message.

activity_secret.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Secret">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="62dp"
        android:layout_marginLeft="62dp"
        android:layout_marginTop="348dp"
        android:layout_marginEnd="63dp"
        android:layout_marginRight="63dp"
        android:layout_marginBottom="349dp"
        android:text="TOP SECRET MESSAGE :)"
        android:textSize="25dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout />
```
### Step four – Update MainActivity.java
In this step, we will write code that will enable our Activity to authenticate a user using biometrics to access our top-secret Activity.
Our code will contain the following functions:
- An `onAuthenticationError` function, which provides the outcome of a failed authentication instance.
- An `onAuthenticationSucceeded` function, which provides the outcome of a successful authentication instance.
- An `onCreate` function, which will contain an onClickListener that will bring up the Biometric prompt. Also, we will include some details to our biometric prompt in this function.
- A `notifyUser` function that will display a Toast message whenever called in another function.
- A `getCancellationSignal` function, which will handle cancellations made by the user.
- A `checkBiometricSupport` function will check whether a particular Android device has inbuilt biometrics support, whether they are enabled in the phone's settings, and whether the user has accepted the app's permission to access the biometrics.

```kotlin
package com.example.fingerprintauthentication
import android.app.KeyguardManager
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.biometrics.BiometricPrompt
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CancellationSignal
import android.widget.Button
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.app.ActivityCompat
class MainActivity : AppCompatActivity() {

    private var cancellationSignal: CancellationSignal? = null
    private val  authenticationCallback: BiometricPrompt.AuthenticationCallback
    get() =
        @RequiresApi(Build.VERSION_CODES.P)
        object: BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationError(errorCode: Int, errString: CharSequence?) {
                super.onAuthenticationError(errorCode, errString)
                notifyUser("Authentication error: $errString")
            }
            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult?) {
                super.onAuthenticationSucceeded(result)
                notifyUser("Authentication Success!")
                startActivity(Intent(this@MainActivity, Secret::class.java))
            }
        }
    @RequiresApi(Build.VERSION_CODES.P)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        checkBiometricSupport()
        val button = findViewById<Button>(R.id.btn_authenticate)
        button.setOnClickListener{
            val biometricPrompt : BiometricPrompt = BiometricPrompt.Builder(this)
                .setTitle("Title")
                .setSubtitle("Authenticaion is required")
                .setDescription("Fingerprint Authentication")
                .setNegativeButton("Cancel", this.mainExecutor, DialogInterface.OnClickListener { dialog, which ->
                }).build()
            biometricPrompt.authenticate(getCancellationSignal(), mainExecutor, authenticationCallback)
        }
    }
    private fun notifyUser(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
    private fun getCancellationSignal(): CancellationSignal {
        cancellationSignal = CancellationSignal()
        cancellationSignal?.setOnCancelListener {
            notifyUser("Authentication was cancelled by the user")
        }
        return cancellationSignal as CancellationSignal
    }
    private fun checkBiometricSupport(): Boolean {
        val keyguardManager : KeyguardManager = getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
        if(!keyguardManager.isKeyguardSecure) {
            notifyUser("Fingerprint hs not been enabled in settings.")
            return false
        }
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.USE_BIOMETRIC) !=PackageManager.PERMISSION_GRANTED) {
            notifyUser("Fingerprint hs not been enabled in settings.")
            return false
        }
        return if (packageManager.hasSystemFeature(PackageManager.FEATURE_FINGERPRINT)) {
            true
        } else true
    }
}
```

We are done!
Let's run our app.

![Fingerprintt authentication](/engineering-education/fingerprint-authentication-in-android-applications/screen.gif)

### To wrap up
We have learned how to implement biometrics in an android application. We have also known the advantages and disadvantages of using biometrics. Read more about biometrics from the official Android developer's [page](https://developer.android.com/jetpack/androidx/releases/biometric) and practice.

Remember, practice makes perfect.

You can access the tutorial's code on [GitHub](https://github.com/BrianaNzivu/EngineeringEducation/tree/main/FingerprintAuthentication). You can also download the sample APK on [Google Drive](https://drive.google.com/file/d/1X1l4JD1UeC20tgOAwKsjF-gf1dxs-Y5x/view?usp=sharing).
For any query or clarification, do not hesitate to raise an issue in this [repository](https://github.com/BrianaNzivu/EngineeringEducation/tree/main/FingerprintAuthentication).

Till next time! 

Happy Coding!



