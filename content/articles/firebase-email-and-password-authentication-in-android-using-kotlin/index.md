---
layout: engineering-education
status: publish
published: true
url: /firebase-email-and-password-authentication-in-android-using-kotlin/
title: Firebase Email and Password Authentication in Android using Kotlin
description: This article gives the user a guide on how to implement firebase authentication in an android application.
author: eric-gacoki
date: 2021-01-06T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/hero.png
    alt: Firebase authentication in Android
---
[Firebase authentication](https://firebase.google.com/docs/auth) is a technology used to set up service-access permissions. It does so by creating and managing valid user accounts using firebase APIs and Firebase console provided by Google. In this tutorial, you'll learn how to implement firebase authentication in an Android application.
<!--more-->

### Introduction

### Prerequisites

To follow through this tutorial you're required to have:
- [Android Studio IDE](https://developer.android.com/studio) installed in your machine.
- Knowledge on [constraint layout](https://developer.android.com/training/constraint-layout) in XML.
- An active [Google account](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp).

### Step 1 - Creating an Android project
First, we need to create an Android project that we will use in the entire tutorial. To do this, launch Android studio and create an `Empty Activity` project with the following configurations

- **Name** as `Firebase auth`.
- **Package name** as `com.<your_name>.firebaseauth` (without spaces).
- **Language** select `Kotlin`.
- **Minimum SDK** `select API 21: Android 5.0 (Lollipop)` and finally.
- **don't** check `use legacy android support libraries` as doing so will limit us from using some android libraries.

### Step 2 - Sign in to Android studio
You need to sign in to Android studio in order to use services such as Firebase. This is where the Google account comes in.
To sign in, click the icon at the top right corner.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-sign-in-icon.png) 

"Android studio sign in step 1"

By clicking `Sign in` a browser window pops up and prompts you to select an account or create one for Android studio.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-sign-in-choose-account.png)

"Android studio sign in choose account"

A bunch of permissions are required for you to sign in.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-sign-in-permission.png)

"Android studio sign in permissions"

Allow the permissions to successfully sign in to Android studio. You can now access `Firebase` and `Google cloud platform` services via Android studio. 

In our case, we only need Firebase.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-sign-in-success.png)

"Android studio sign in success"

Go back to Android studio and you'll see your email in the account section.

### Step 3 - Creating a Firebase project
We need a Firebase project that we'll eventually connect with our Android app. This project will give us access to most of the Firebase services, not limited to authentication and analytics. 

This process involves several stages.

- Open [Firebase](https://firebase.google.com), sign in with your Google account then head to `firebase console` by clicking the button at the top right corner.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-console1.png)

"Create Firebase project"

- To create a new project click `Add project`. This involves three steps.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-create-project-step0.png)

"Create Firebase project"

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-create-project-step1.png)

"Create Firebase project"

We start by giving a name to the project. Let's name it `Firebase-auth`. The project name shouldn't have spaces, instead, use a hyphen.

Just below the name, is a unique ID used to identify your project among the millions of Firebase projects out there. Click the continue button.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-create-project-step2.png)

"Create Firebase project step 2 of 3"

- Since we're going to use Google analytics in our app, ensure that the analytics switch is checked. Hit continue to proceed.

Wait for project creation to finish up.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-create-project-finish-up2.png)

"Create Firebase finish up 3 0f 3"

Now our project is ready to be connected to our app.

### Step 4 - Connecting Firebase project to an Android app
There are two ways to connect a Firebase project to an Android app.

#### 1. Manually adding services configuration file
This can be achieved by downloading the `google-services.json` file, then pasting it into the Android project root and adding the necessary dependencies manually.

This process requires you to have a running app so that it sends a signal to firebase servers. This indicates that the project configuration file and dependencies are working as expected. This is noticeably not the best option as it is more complicated compared to method 2.

#### 2. Through Android studio Firebase assistant
This is a less complicated and more straightforward method that does most of the work for you. For the sake of simplicity, we'll use this method.

Launch Firebase assistant by heading to `Tools` >> `firebase`

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-firebase-assistant1.png)

"Launch Firebase assistant"

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-firebase-auth1.png)

"Connect to Firebase"

Click `Authentication` >> `Email and password authentication`

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-connect-to-firebase1.png) 

"Connect to Firebase"

Click `Connect to Firebase`. You'll be taken to the Firebase website and prompted to choose a project to connect with.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-choose-project-to-connect.png)

Choose the `Firebase-auth` we just created. By so doing, the `google-services.json` file is automatically downloaded into your project.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-connect-project2.png)

Click `Connect` and you'll see a message like the one below.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-project-connected-to-as.png)

Go back to Android studio to finish up the setup.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-connected-fb-add-auth1.png)

"Accept changes"

You can see a success notification at the bottom indicating that our app is now connected to Firebase.

We're now in the final step of setting up Firebase authentication. Tap `Add firebase authentication` and accept changes to add the respective dependencies. Wait for the Gradle build to finish.

Finally, this is what you should have on the Firebase assistant. You can confirm it by opening the `build.gradle` (app level) dependencies.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as-connected-fb-and-auth.png)

"Connected firebase"

### One more thing concerning Firebase
Since we want to use email and password authentication, we have to enable it in our project's console. To do that navigate to `Authentication` > `sign-in method` then enable email and password authentication. It should look like this.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-enable-auth1.png)

"Enable auth"

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-enable-auth2.png)

"Enabled auth"

Congratulations! We have finished setting up Firebase authentication.

### Step 5 - Application code
At this stage, we're going to create the user interface (UI) and the backend for our app. This is where `XML` and `Kotlin` come in. We don't need to code the server-side backend as the irebase APIs will do that for us. Isn't that awesome?

First of all, we need to keep our app organized. This is referred to as [application architecture](/web-application-architectures-101/). Expand the `java` directory `>` right-click on the package name directory `>` add 3 new `packages` namely `extensions`, `utils` and `views`. 

We'll learn more about them as we proceed.

It should appear like this:

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/org-packages.png)

"Organized packages"

Next, we need to refactor `MainActivity.kt` and `activity_main.xml` to `HomeActivity.kt` and  `activity_home.xml` respectively. You can do this by right-clicking on it or by pressing `Shift + F6`. Drag and drop the `HomeActivity.kt` class into views.

### Explanation
Each directory plays an important role in the app's design.

- `extensions`: Holds objects that entails Kotlin extension functions. This makes it possible to access and use such functions from any class in the app without creating another instance of their parent.

- `utils`: Contains utilities used in the app. In our case, this will only contain Firebase utilities.

- `views`: This contains the UI-related classes.  

In advanced architectures like **MVVM**, there are more commonly used packages like the `model` but we will not be concerned about them for now.

Right-click on views and add two empty activities namely `CreateAccountActivity` and `SignInActivity`. These two come with their respective Xml layout files namely `activity_create_account` and `activity_sign_in`.

Right-click extensions directory and select new Kotlin file or class then select `object`. Set object's name to `Extensions`. 

Do the same thing on utils where we'll name the object as `FirebaseUtils`.

It should look similar to this:

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/org-complete.png)

"Packages and directories"

### Writing code
### 1). Let's begin with the UI
This is what the users will see and use to interact with the app. We'll use the Extensive markup language (XML) to create the UI elements.

Copy and paste the code below into ***activity_create_account.xml***.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:chainUseRtl="true"
    tools:context=".views.CreateAccountActivity"
    tools:ignore="Autofill">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/create_account"
        android:textAlignment="center"
        android:textColor="@color/black"
        android:textSize="20sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/etEmail"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

   <EditText
        android:id="@+id/etEmail"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:hint="@string/email"
        android:inputType="textEmailAddress"
        android:padding="10dp"
        app:layout_constraintBottom_toTopOf="@id/etPassword"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_chainStyle="packed" />

    <EditText
        android:id="@+id/etPassword"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginBottom="20dp"
        android:hint="@string/password"
        android:inputType="textPassword"
        android:maxLength="8"
        android:padding="10dp"
        app:layout_constraintBottom_toTopOf="@id/etConfirmPassword"
        app:layout_constraintEnd_toEndOf="@id/etEmail"
        app:layout_constraintStart_toStartOf="@id/etEmail"
        app:layout_constraintTop_toBottomOf="@id/etEmail" />

    <EditText
        android:id="@+id/etConfirmPassword"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginBottom="20dp"
        android:hint="@string/confirm_password"
        android:inputType="textPassword"
        android:maxLength="8"
        android:padding="10dp"
        app:layout_constraintBottom_toTopOf="@id/btnCreateAccount"
        app:layout_constraintEnd_toEndOf="@id/etPassword"
        app:layout_constraintStart_toStartOf="@id/etPassword"
        app:layout_constraintTop_toBottomOf="@id/etPassword" />

    <Button
        android:id="@+id/btnCreateAccount"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginVertical="20dp"
        android:text="@string/create_account"
        app:layout_constraintBottom_toTopOf="@id/btnSignIn2"
        app:layout_constraintEnd_toEndOf="@id/etConfirmPassword"
        app:layout_constraintStart_toStartOf="@id/etConfirmPassword"
        app:layout_constraintTop_toBottomOf="@id/etConfirmPassword" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/or"
        android:textAlignment="center"
        android:textColor="@color/black"
        android:textSize="16sp"
        app:layout_constraintBottom_toTopOf="@+id/btnSignIn2"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/btnCreateAccount" />

    <Button
        android:id="@+id/btnSignIn2"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginVertical="20dp"
        android:backgroundTint="@color/black"
        android:text="@string/sign_in"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="@id/btnCreateAccount"
        app:layout_constraintStart_toStartOf="@id/btnCreateAccount"
        app:layout_constraintTop_toBottomOf="@id/btnCreateAccount" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

In the code above, we've created three `EditTexts` views responsible for taking email and password inputs from the user. The key point is that each of them contains a unique identifier (ID) used to refer to it in the entire layout.


We've also created `sign in` and `Create account` buttons. Constraint layout has helped us align views vertically using `vertical-compressed chains`. Unlike in linear layout, we don't need to arrange views code in order as they appear in the preview.

**Attention:** If the IDE complains about unresolved references, for instance in:

```xml
<Button android:text="@string/sign_in"/>
```

You can resolve the error by navigating to `res` > `values` > `strings` then create a string resource like this.

```xml
<string name="sign_in">Sign in</string>
```

Do the same thing to solve the color reference error. Add the desired color resource to the `colors` file.

```xml
<color name="black">#000000</color>
```

### Key points
- ***margin***: This is the field around a view that serves as its part. Think of it as the area surrounding a view. It's always given in density pixels (DP).

- ***Padding***: This is the area inside the view that defines how far from the edges is whatever is inside the view.

Setting ***layout_width = "0dp"*** in constraint layout means that the view together with its margin will occupy the whole horizontal constraint set. This works best if the view below is constrained horizontally to the one above it.

Copy the code below and paste it to ***activity_sign_in.xml***.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".views.SignInActivity"
    tools:ignore="Autofill, LabelFor">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/sign_in"
        android:textAlignment="center"
        android:textColor="@color/black"
        android:textSize="20sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/etSignInEmail"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

  <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/or"
        android:textAlignment="center"
        android:textColor="@color/black"
        android:textSize="16sp"
        app:layout_constraintBottom_toTopOf="@+id/btnCreateAccount2"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/btnSignIn" />

    <EditText
        android:id="@+id/etSignInEmail"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginHorizontal="20dp"
        android:layout_marginVertical="20dp"
        android:hint="@string/email"
        android:inputType="textEmailAddress"
        android:padding="10dp"
        app:layout_constraintBottom_toTopOf="@+id/etSignInPassword"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_chainStyle="packed" />

    <EditText
        android:id="@+id/etSignInPassword"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginVertical="20dp"
        android:hint="@string/password"
        android:inputType="textPassword"
        android:maxLength="8"
        android:padding="10dp"
        app:layout_constraintBottom_toTopOf="@+id/btnSignIn"
        app:layout_constraintEnd_toEndOf="@+id/etSignInEmail"
        app:layout_constraintStart_toStartOf="@+id/etSignInEmail"
        app:layout_constraintTop_toBottomOf="@+id/etSignInEmail" />

    <Button
        android:id="@+id/btnSignIn"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginVertical="20dp"
        android:backgroundTint="@color/black"
        android:text="@string/sign_in"
        app:layout_constraintBottom_toTopOf="@+id/btnCreateAccount2"
        app:layout_constraintEnd_toEndOf="@+id/etSignInPassword"
        app:layout_constraintStart_toStartOf="@+id/etSignInPassword"
        app:layout_constraintTop_toBottomOf="@+id/etSignInPassword" />

    <Button
        android:id="@+id/btnCreateAccount2"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginVertical="20dp"
        android:text="@string/create_account"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="@+id/btnSignIn"
        app:layout_constraintStart_toStartOf="@+id/btnSignIn"
        app:layout_constraintTop_toBottomOf="@+id/btnSignIn" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

The UI code above is similar to the previous one. The main views are two `EditTexts` and two `Buttons`. Remember in *SignInActivity* the user doesn't need to enter the password twice unlike when *Creating an account*.

Finally copy the code below into ***activity_home.xml***.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/you_are_signed_in"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        app:layout_constraintBottom_toTopOf="@+id/btnSignOut"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.546" />

    <Button
        android:id="@+id/btnSignOut"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/sign_out"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

This generates a `textView` at the top and a signOut button.

Now we're done with the user interface.

### 2). Creating the app logic (using Kotlin)
Logic is what controls the flow of a program. In our app, we need to handle clicks, navigation, as well as managing users. All these are interactions the user can perform using the UI. This process involves accessing the UI elements from their respective inflaters. Think of it as connecting the layout to a class responsible for populating it (the layout) on the screen.

There are many ways to achieve this:
- Using [View binding](https://developer.android.com/topic/libraries/view-binding/migration).
- Using [Kotlin synthetics](https://developer.android.com/topic/libraries/view-binding/migration).
- Using findViewById<>()

#### A) Set up Firebase utils and extensions
Right-click on `utils` **package** >> **new** >> **kotlin file/class** then select **object**. Name it `FirebaseUtils`.
Inside this object, we initialize `FirebaseAuth` and nullable `firebaseUser`.

```Kotlin
object FirebaseUtils {
    val firebaseAuth: FirebaseAuth = FirebaseAuth.getInstance()
    val firebaseUser: FirebaseUser? = firebaseAuth.currentUser
}
```

Generally, we should avoid code repetition as much as possible. Kotlin offers a very important type of function called extension functions.

Similar to the one above, create an object named `Extensions`. In here, paste the code below to create a toast with the argument as the message.

```Kotlin
object Extensions {
    fun Activity.toast(msg: String){
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
    }
}
```

#### B) Set the launcher
`CreateAccountActivity.kt` is set as the launcher activity in the `manifest file`. This means that it'll appear as the first screen when the user taps the app icon. With that said, open `CreateAccountActivity.kt` in the editor by double-tapping or drag-dropping it.

Here we're going to create an algorithm that will:

- Check if there's a signed-in user, in that device and if this returns true, we proceed to `HomeActivity` otherwise we stay.

- Handle clicks and check the inputs. Inputs are considered valid if they are not empty, are of the correct format, and the password is fairly secure. Note that Firebase auth API will not create an account with an insecure password. As a result, it's a good idea to mix digits, special characters, and letters in the password field and be at least eight characters long.

To keep things simple, we're going to use `Kotlin synthetics` to import our views from the respective layout. This is no longer available by default but we can use it via the kotlin-android-extensions plugin.

Before we proceed, make sure you have the following plugin in your `build.gradle` (app module level).

```bash
plugins{
       id 'kotlin-android-extensions'
}
```

Inside `CreateAccountActivity.kt`, import Kotlin synthetics like this:

```Kotlin
import kotlinx.android.synthetic.main.activity_create_account.*
```

Now we can use the view's ID to access it!

Paste the code below to `CreateAccountActivity.kt`:

```Kotlin
/** press ctrl+ alt+ enter to fix missing imports **/

import android.content.Intent
import android.os.Bundle
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_create_account.*

class CreateAccountActivity : AppCompatActivity() {
    lateinit var userEmail: String
    lateinit var userPassword: String
    lateinit var createAccountInputsArray: Array<EditText>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_account)
        createAccountInputsArray = arrayOf(etEmail, etPassword, etConfirmPassword)
        btnCreateAccount.setOnClickListener {
            signIn()
        }

        btnSignIn2.setOnClickListener {
            startActivity(Intent(this, SignInActivity::class.java))
            toast("please sign into your account")
            finish()
        }
    }

    /* check if there's a signed-in user*/

    override fun onStart() {
        super.onStart()
        val user: FirebaseUser? = firebaseAuth.currentUser
        user?.let {
            startActivity(Intent(this, HomeActivity::class.java))
            toast("welcome back")
        }
    }

    private fun notEmpty(): Boolean = etEmail.text.toString().trim().isNotEmpty() &&
            etPassword.text.toString().trim().isNotEmpty() &&
            etConfirmPassword.text.toString().trim().isNotEmpty()

    private fun identicalPassword(): Boolean {
        var identical = false
        if (notEmpty() &&
            etPassword.text.toString().trim() == etConfirmPassword.text.toString().trim()
        ) {
            identical = true
        } else if (!notEmpty()) {
            createAccountInputsArray.forEach { input ->
                if (input.text.toString().trim().isEmpty()) {
                    input.error = "${input.hint} is required"
                }
            }
        } else {
            toast("passwords are not matching !")
        }
        return identical
    }

    private fun signIn() {
        if (identicalPassword()) {
            // identicalPassword() returns true only  when inputs are not empty and passwords are identical
            userEmail = etEmail.text.toString().trim()
            userPassword = etPassword.text.toString().trim()

            /*create a user*/
            firebaseAuth.createUserWithEmailAndPassword(userEmail, userPassword)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        toast("created account successfully !")
                        sendEmailVerification()
                        startActivity(Intent(this, HomeActivity::class.java))
                        finish()
                    } else {
                        toast("failed to Authenticate !")
                    }
                }
        }
    }

    /* send verification email to the new user. This will only
    *  work if the firebase user is not null.
    */

    private fun sendEmailVerification() {
        firebaseUser?.let {
            it.sendEmailVerification().addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    toast("email sent to $userEmail")
                }
            }
        }
    }
}
```

In the code above, we've created a user using the details provided. We've also handled errors effectively.

#### C) Create account activity
**SignInactivity** is similar to **CreateAccountActivity**. The only difference is that we'll use the Firebase `signInWithEmailAndPassword()` function. Inputs are processed the same way as when creating an account.

Here is the code for that:

```Kotlin
/** include your package here **/

import android.content.Intent
import android.os.Bundle
import android.widget.EditText
/** fix missing imports **/
import kotlinx.android.synthetic.main.activity_sign_in.*

class SignInActivity : AppCompatActivity() {
    lateinit var signInEmail: String
    lateinit var signInPassword: String
    lateinit var signInInputsArray: Array<EditText>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)

        signInInputsArray = arrayOf(etSignInEmail, etSignInPassword)
        btnCreateAccount2.setOnClickListener {
            startActivity(Intent(this, CreateAccountActivity::class.java))
            finish()
        }

        btnSignIn.setOnClickListener {
            signInUser()
        }
    }

    private fun notEmpty(): Boolean = signInEmail.isNotEmpty() && signInPassword.isNotEmpty()

    private fun signInUser() {
        signInEmail = etSignInEmail.text.toString().trim()
        signInPassword = etSignInPassword.text.toString().trim()

        if (notEmpty()) {
            firebaseAuth.signInWithEmailAndPassword(signInEmail, signInPassword)
                .addOnCompleteListener { signIn ->
                    if (signIn.isSuccessful) {
                        startActivity(Intent(this, HomeActivity::class.java))
                        toast("signed in successfully")
                        finish()
                    } else {
                        toast("sign in failed")
                    }
                }
        } else {
            signInInputsArray.forEach { input ->
                if (input.text.toString().trim().isEmpty()) {
                    input.error = "${input.hint} is required"
                }
            }
        }
    }
}
```

#### D) Handle actions
Let's handle actions that the user can perform when at `HomeActivity`.

Paste the code below to `HomeActivity.kt`:

```Kotlin
class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
// sign out a user

        btnSignOut.setOnClickListener {
            firebaseAuth.signOut()
            startActivity(Intent(this, CreateAccountActivity::class.java))
            toast("signed out")
            finish()
        }
    }
}
```

In the code above, we've signed out the user, showed a toast, and finished the activity. `finish()` means that users will not be taken to the previous activity when they click the back button.

Finally, for our app to work as expected, we need to add internet permission in the manifest just before the application tag like this.

```Xml
<uses-permission android:name="android.permission.INTERNET" />
```

**Run the App**

Click `shift`+`f10` or the run button just after the devices section. Ensure that the target device has [developer options](https://developer.android.com/studio/debug/dev-options) and `USB debugging` enabled.

Wait for the Gradle build to finish, install, and launch your app.

Now we have a running app that can.

- Interact with the users effectively.
- Create a Firebase account.
- Manage the account (user).
- Implement firebase APIs.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/app-three-in-one.png)

"Create account/sign out/sign in"

When you open the users' section in the Firebase console you'll find all signed-in users. Each user/account is given a unique ID and the password is [hashed](https://firebaseopensource.com/projects/firebase/scrypt/).

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase-authenticated-users.png)

"Firebase authenticated users"

### Conclusion
In this article, we've learned some of the best that Firebase has to offer and particularly authentication. The project we created can be improved further for production apps and it'll still work fine. I can't wait to see what you'll build with Firebase authentication.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
