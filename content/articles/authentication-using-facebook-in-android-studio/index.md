---
layout: engineering-education
status: publish
published: true
url: /authentication-using-facebook-in-android-studio/
title: Authentication using Facebook in Android Studio
description: This tutorial will guide the readers on how to implement Facebook authentication in Android Studio.
author: michael-johnson-owallah
date: 2021-12-09T00:00:00-09:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/authentication-using-facebook-in-android-studio/hero.jpg
    alt: Authentication using Facebook Hero Image
---
Authentication is essential for securing access to specific online content. A user has to provide proof of their identity.
<!--more-->
In this article, we will discuss how to implement Facebook authentication in Android apps.

### Prerequisites
To follow along, the reader should have:
- Android Studio installed.
- Some basic knowledge of `Kotlin`.
- Some knowledge of authentication using `Firebase`.

### Goal
At the end of this article, the reader will have learned how Facebook authentication works.

### Introduction
When accessing third-party services, most applications require users to identify themselves. One of the popular authentication frameworks is Facebook.

This software giant has an SDK that enables authentication. Therefore, developers can use to ensure that individuals sign in before accessing third-party services.

### Firebase overview
Firebase is also a common system for authentication and data storage. It allows users to authenticate themselves using `emails`, `passwords`, and even `phone numbers`.

The `firebaseAuth.createUserWithEmailAndPassword(email,password)` method authenticates a person using the provided credetials (email and password).

However, Firebase authentication is tedious and challenging to implement. This is why some developers still build their authentication systems from scratch.

### Why Facebook login?
Facebook authentication is superior to other traditional frameworks as follows:

- When individuals sign in using Facebook, they grant your app permission to access information or perform different actions.

- With a Facebook login, the user does not need to create a new account to access your app's content. 

In this tutorial, we will create an application that authenticates users using Facebook. 

The application will also display the user's Facebook details. For instance  `username, email, birthday, gender, and profile pic`.

### Step 1: Getting started
In this step, we will create a project with an `empty activity` template.

In Android Studio, navigate to the top left corner and click on File -> New -> New Project -> Empty Activity.

![creating a project](/engineering-education/authentication-using-facebook-in-android-studio/creating_project.png)

### Step 2: Connecting your application to Firebase
At the top of your `Android Studio`, click on `Tools` then on `Firebase`. On the assistant window that appears on your right select `Authentication`.


You need to select `Facebook` and `connect to Firebase`. The next step is to add `Firebase Authentication` to your app.

On your browser open the `Firebase console` and then select your project. Under `authentication`, click on `Facebook` and enable it.

### Step 3: Facebook for developers
Navigate to https://developers.facebook.com/ and create an account (If you do not have one).

Then click on `my apps` to create a new app. On the drop-down menu, select `Consumer` then click `next`. Enter the `app details` to complete the registration.

On your left, click on `Settings` and select `basic`. You can now copy the `App ID` and `App Secret`. 

Paste these details into the `Firebase console fields` under `Facebook authentication`.

Now, click on the `dashboard` and choose the `Facebook setup` option. Select `Android` and click on next.

![creating a project](/engineering-education/authentication-using-facebook-in-android-studio/facebook_for_developers.png)

### Step 4: Adding dependencies
In your `settings.gradle` file, add `mavenCentral()` under repositories.

In the app level `build.gradle` file, include the following dependencies:

```gradle
//Glide
implementation 'com.github.bumptech.glide:glide:4.12.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'
//Facebook
implementation 'com.facebook.android:facebook-android-sdk:12.1.0'
```

Also, add the following setting in the `build.gradle` file:

```gradle
buildFeatures {
        viewBinding true
    }
```

### Step 5: Generating the Hash Key
Using your `SHA1` key, generate a `hash key` and paste it in the `key hashes option`.

### Step 6: Editing the Manifest and String files
Add the following lines of code to your `Manifest.xml` and `string.xml` files:

**Manifest.xml**
```xml
<uses-permission android:name="android.permission.INTERNET"/>

//in Application
<meta-data android:name="com.facebook.sdk.ApplicationId"
            android:value="@string/facebook_app_id"/>
        <activity android:name="com.facebook.FacebookActivity"
            android:configChanges=
                "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
            android:label="@string/app_name" />
        <activity
            android:name="com.facebook.CustomTabActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="@string/fb_login_protocol_scheme" />
            </intent-filter>
        </activity>
```

**String.xml**
```xml
<string name="facebook_app_id">214268554165523</string>
<string name="fb_login_protocol_scheme">fb214268554165523</string>
```

### Step 8: Creating the user interface
Our user interface will include the following components:

```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
 xmlns:app="http://schemas.android.com/apk/res-auto"
 xmlns:tools="http://schemas.android.com/tools"
 android:layout_width="match_parent"
 android:layout_height="match_parent"
 tools:context=".MainActivity">

 <ImageView
 android:id="@+id/profile_pic"
 android:layout_width="150dp"
 android:layout_height="150dp"
 android:layout_marginTop="32dp"
 android:scaleType="centerCrop"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 android:src="@drawable/com_facebook_favicon_blue"/>

 <TextView
 android:id="@+id/user_name"
 android:layout_width="0dp"
 android:layout_height="wrap_content"
 android:layout_marginTop="16dp"
 android:textColor="@color/black"
 android:padding="10dp"
 android:text="Name"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toBottomOf="@+id/profile_pic" />

 <TextView
 android:id="@+id/user_gender"
 android:layout_width="0dp"
 android:layout_height="wrap_content"
 android:layout_marginTop="16dp"
 android:textColor="@color/black"
 android:padding="10dp"
 android:text="Gender"
 app:layout_constraintEnd_toEndOf="@+id/user_name"
 app:layout_constraintStart_toStartOf="@+id/user_name"
 app:layout_constraintTop_toBottomOf="@+id/user_name" />

 <TextView
 android:id="@+id/user_b_day"
 android:layout_width="0dp"
 android:layout_height="wrap_content"
 android:layout_marginTop="16dp"
 android:padding="10dp"
 android:textColor="@color/black"
 android:text="Birthday"
 app:layout_constraintEnd_toEndOf="@+id/user_gender"
 app:layout_constraintStart_toStartOf="@+id/user_gender"
 app:layout_constraintTop_toBottomOf="@+id/user_gender" />

 <TextView
 android:id="@+id/user_email"
 android:layout_width="0dp"
 android:layout_height="wrap_content"
 android:layout_marginTop="16dp"
 android:padding="10dp"
 android:textColor="@color/black"
 android:text="Email"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="@+id/user_b_day"
 app:layout_constraintTop_toBottomOf="@+id/user_b_day" />

 <View
 android:id="@+id/view"
 android:layout_width="150dp"
 android:layout_height="2dp"
 android:layout_marginTop="32dp"
 android:background="@color/black"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toBottomOf="@+id/user_email" />

 <TextView
 android:id="@+id/textView5"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:layout_marginStart="8dp"
 android:text="Sign in with:"
 android:textColor="@color/black"
 android:textSize="16sp"
 android:textStyle="bold"
 app:layout_constraintBottom_toBottomOf="@+id/view"
 app:layout_constraintStart_toEndOf="@+id/view"
 app:layout_constraintTop_toTopOf="@+id/view" />

 <View
 android:id="@+id/view2"
 android:layout_width="150dp"
 android:layout_height="2dp"
 android:layout_marginStart="8dp"
 android:background="@color/black"
 app:layout_constraintBottom_toBottomOf="@+id/view"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toEndOf="@+id/textView5"
 app:layout_constraintTop_toTopOf="@+id/view" />

 <com.facebook.login.widget.LoginButton
 android:id="@+id/login_button"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:layout_marginTop="24dp"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toBottomOf="@+id/textView5" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Note that we have imported `<com.facebook.login.widget.LoginButton/>` from the Facebook authentication package.

### Step 9: MainActivity
We need to include some logic in the `MainActivity.kt` file. Note that I have explained the following code using in-line comments.

```kotlin
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.facebook.*
import com.facebook.login.LoginResult
import com.thecalvary.facebooklogindemo.databinding.ActivityMainBinding
import org.json.JSONObject
import java.util.*

private const val TAG = "MainActivity"
class MainActivity : AppCompatActivity() {

//To avoid findViewById, we use view binding.
    private lateinit var binding: ActivityMainBinding

//Declare the Facebook callbackmanager    
    private lateinit var callBackManager: CallbackManager
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view: View = binding.root
        setContentView(view)
        
//Now initialize the callbackmanager

        callBackManager = CallbackManager.Factory.create()
        
//set the login button with permissions to read and add to a list all user data 

        binding.loginButton.setReadPermissions(listOf("email","public_profile","user_gender","user_birthday"))
        
//A callback is registered when the login button is clicked.
//The callback can return an error or success message. It can also be canceled

        binding.loginButton.registerCallback(callBackManager, object : FacebookCallback<LoginResult>{
            override fun onCancel() { // this method is invoked when the request is cancelled
                Toast.makeText(this@MainActivity,
                    "Cancelled",
                    Toast.LENGTH_SHORT).show() } 

            override fun onError(error: FacebookException) {
                Toast.makeText(this@MainActivity, "$error", Toast.LENGTH_SHORT).show() }
                //Incase of an error, the above message is displayed.
            override fun onSuccess(result: LoginResult) {
                val graphRequest = GraphRequest.newMeRequest(result?.accessToken){`object` ,response ->
                getFacebookData(`object`)
                }
                val parameters = Bundle()
                parameters.putString("fields", "id,email,birthday,gender,name")
                graphRequest.parameters = parameters
                graphRequest.executeAsync()
            } })
    }
//This function gets the users' Facebook data.
//This includes the username, email, birthday, gender, and profile picture.
//As they appear on Facebook

    private fun getFacebookData(jsonObject: JSONObject?) {
        val profilePic = "https://graph.facebook.com/${jsonObject
?.getString("id")}/picture?width=500&height=500"
        Glide.with(this)
            .load(profilePic)
            .into(binding.profilePic)

        val name = jsonObject?.getString("name")
        val birthday = jsonObject?.getString("birthday")
        val gender = jsonObject?.getString("gender")
        val email = jsonObject?.getString("email")

        binding.userName.text = "Name: ${name}"
        binding.userEmail.text = "Email: ${email}"
        binding.userBDay.text = "Birthday: ${birthday}"
        binding.userGender.text = "Gender: ${gender}"
}
     override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        callBackManager.onActivityResult(requestCode, resultCode, data) }
}
```

When you run the above application, you should be able to access Facebook authentication.

### Conclusion
In this tutorial, we have discussed some basic aspects of Facebook Authentication. You can, therefore, use this knowledge to craft other beautiful applications.

### Further reading
- [Facebook for developers](https://developers.facebook.com/)
- [Firebase](https://console.firebase.google.com/)


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)