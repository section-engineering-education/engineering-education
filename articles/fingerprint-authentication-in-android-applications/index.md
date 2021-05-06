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
Biometrics are body measurements and calculations related to human characteristics. Biometrics is classified into two categories: Physical and Behavioral. 
Physical biometrics is our humanly features such as our fingerprints, iris, and many others. Behavioral is our actions, for example, smiling, hand signs, and others. In turn, biometrics has brought up vast, easy, and secure ways to identify a specific user using their physical traits.
Let us admit it, typing over eight characters in the name of a password is quite a task, that is, if a user even remembers the password. These days most developers and companies have made it easier for us by using biometrics as a form of authentication. Biometrics, time and again, has proved to be more efficient and less prone to cyber-attacks. This article will cover one of the biometric ways of authentication, which is using our fingerprint.

### Advantages of Biometrics.
- Biometrics is linked to a single individual (unlike a password, which a user can use without authorization),
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

![Creat a new Android Studio project](/engineering-education/fingerprint-authentication-in-android-applications/newproject.jpg)

### Step Two: Enable the biometrics permission in the manifest file.
In our `AndroidManifest.xml` file, we will add the biometrics permission statement, which will allow our application to access the inbuilt biometrics features in our devices. Add the following line of code in your AndroidManifest.xml:

```manifest
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```
### Step Three – Adding the biometrics library in our project.
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


