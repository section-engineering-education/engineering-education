### Introduction

[Firebase authentication](https://firebase.google.com/docs/auth) is a technology used to set up service-access permissions. It does so by creating and managing valid user accounts using firebase APIs and Firebase console provided by Google. In this tutorial, you'll learn how to implement firebase authentication in an android application.

### Prerequisites

To follow through with this tutorial you're required to have:

- [Android Studio IDE](https://developer.android.com/studio) installed in your machine
- Knowledge on [constraint layout](https://developer.android.com/training/constraint-layout) in XML
- An active [Google account](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp)

### Step 1 - Creating An Android project

First, we need to create an Android project that we will use in the entire tutorial. To do this, launch android studio and crate an `Empty Activity` project with the following configurations

- **Name** as `Firebase auth`
- **Package name** as `com.<your_name>.firebaseauth` (without spaces)
- **Language** select `Kotlin`
- **Minimum SDK** `select API 21: Android 5.0 (Lollipop)` and finally
- **don't** check `use legacy android support libraries` as doing so will limit us from using some android libraries.

### Step 2 - Sign in to Android studio

For you to access services like firebase in your app, you need to sign into Android studio. This is where the google account comes in.
To sign in, click the icon at the top right corner

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_sign_in_icon.png "Android studio sign in step 1")

By clicking `Sign in` a browser window pops up and prompts you to select an account or create one for Android studio.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_sign_in_choose_account.png "Android studio sign in choose account")

A bunch of permissions is required for you to sign in.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_sign_in_permission.png "Android studio sign in permissions")

Allow the permissions to successfully sign into Android studio. You can now access `Firebase` and `Google cloud platform` services via the Android studio. In our case we only need Firebase.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_sign_in_success.png "Android studio sign in success")

Go back to Android studio and you'll see your email in the account section.

### Step 3 -- Creating a Firebase Project

We need a firebase project that we'll eventually connect with our android app. This project will enable us to access most of the firebase services not limited to Authentication and Analytics. This process involves several stages.

**1**. Open [Firebase](https://firebase.google.com), sign in with your Google account then head to `firebase console` by clicking the button at the top right corner.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_console1.png "Create firebase project")

**2**. To create a new project click `Add project`. This involves three steps.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_create_project_step0.png "Create firebase project")

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_create_project_step1.png "Create firebase project")

We start by giving a name to the project. Let's name it `Firebase-auth`. The project name shouldn't have spaces, instead, use a hyphen.
Just below the name, is a unique id used to identify your project among the millions of firebase projects out there. Click the continue button.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_create_project_step2.png "Create firebase project step 2 of 3")

**3**. Since we're going to use Google analytics in our app, ensure that the analytics switch is checked. hit continue to proceed.
Wait for project creation to finish up.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_create_project_finish_up2.png "Create firebase finish up 3 0f 3")

Now our project is ready to be connected to our app.

### Step 4 - Connecting Firebase project to an android app

There are two ways to connect a firebase project to an android app.

#### 1. Manually adding services configuration file

This can be achieved by downloading the google-services.json file. Then paste into the android project root and adding the necessary dependencies manually.

This process requires you to have a running app so that it sends a signal to firebase servers. This indicates that the project configuration file and dependencies are working as expected. This is noticeably not the best option as it is more complicated compared to method 2.

#### 2. Through Android studio firebase assistant

This is a less complicated and straightforward method that does most of the work for you.
For simplicity purposes, we'll use this method.
Launch firebase assistant by heading to `Tools` >> `firebase`

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_firebase_assistant1.png "launch firebase assistant")

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_firebase_auth1.png "connect  to firebase")

Click `Authentication` >> `Email and password authentication`

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_connect_to_firebase1.png "connect  to firebase")

Click `Connect to Firebase`. You'll be taken to the Firebase website and prompted to choose a project to connect with.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_choose_project_to_connect.png)

Choose `Firebase-auth` we just created.
By so doing, the google-services.json file is automatically downloaded into your project.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_connect_project2.png)

Click `Connect` and you'll see a message like the one below.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_project_connected_to_as.png)

Go back to Android studio to finish up the setup.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_connected_fb_add_auth1.png "accept changes")

You can see a success notification at the bottom indicating that our app is now connected to firebase.

We're now in the final step of setting up Firebase authentication. Tap `Add firebase authentication` and accept changes to add the respective dependencies. Wait for the Gradle build to finish.

Finally, this is what you should have on the Firebase assistant. You can confirm it by opening the build. Gradle (app level) dependencies.

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/as_connected_fb_and_auth.png "connected firebase")

### One more thing concerning firebase

Since we want to use email and password authentication, we have to enable it in our project's console. To do that navigate to `Authentication` > `sign-in method` then enable email and password authentication. It should look like this

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_enable_auth1.png "enable auth")
![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_enable_auth2.png "enabled auth")

Congratulations! We have finished setting up Firebase authentication.

### Step 5 - Application Code

At this stage, we're going to create the user interface (UI) and the backend for our app. This is where `XML` and `Kotlin` come in we don't need to code the server-side backend as firebase APIs will do that for us. Isn't that awesome?

First of all, we need to keep our app organized. This is referred to as application architecture. Expand the `java` directory `>` right-click on the package name directory `>` add 3 new `packages` namely `extensions`, `utils` and `views`. you'll learn more about them as we proceed.

It should appear like this

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/org_packages.png "organized packages")

Next, we need to refactor `MainActivity.kt` and `activity_main.xml` to `HomeActivity.kt` and  `activity_home.xml` respectively. You can do this by right-clicking on it or by pressing `Shift + F6`. Drag and drop the `HomeActivity.kt` class into views.

### Explanation

Each directory plays an important role in the app's design.

- `extensions` : holds objects that entails Kotlin extension functions. This makes it possible to access and use such functions from any class in the app without creating another instance of their parent.

- `utils`: contains utilities used in the app. In our case, this will only contain firebase utilities.

- `views`: This contains the UI-related classes.  

In advanced architectures like **MVVM**, there are more commonly used packages like the `model` but we're not concerned about them for now.

Right-click on views and add two empty activities namely `CreateAccountActivity` and `SignInActivity`. These two comes with their respective Xml layout files namely `activity_create_account` and `activity_sign_in`.

Right-click extensions directory select new kotlin file or class then select `object`. Set object's name to `Extensions`. Do the same thing on utils where you'll name the object as `FirebaseUtils`.
It should look similar to this ;

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/org_complete.png "packages and directories")

### Writing Code

#### 1). Let's begin with the UI

This is what the users see and use to interact with the app. We'll use Extensive markup language (XML) to create UI elements.

**a).** copy and paste the code below into ***activity_create_account.xml***.

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

In the above code, we've mainly created three `EditTexts` views responsible for taking email and password inputs from the user. The key point is that each of them contains a unique identifier (id) used to refer to it in the entire layout.
We've also created `sign in` and `Create account` buttons. Constraint layout has helped us align views
vertically using vertical-compressed chains. Unlike in linear layout, we don't need to arrange views code in order as they appear in the preview.

**Attention :** if the IDE complain about unresolved references, for instance in

```xml
<Button android:text="@string/sign_in"/>
```

you can resolve the error by navigating to `res` > `values` > `strings` then create a string resource like this

```xml
<string name="sign_in">Sign in</string>
```

Do the same thing to solve the color reference error. Add the desired color resource to the `colors` file.

```xml
<color name="black">#000000</color>
```

### Key points

- ***margin***: this is the field around a view that serves as its part. Think of it as the area surrounding a view. It's always given in density pixels (DP).

- ***Padding***: is the area inside the view which defines how far from the edges is whatever is inside the view.

- Setting ***layout_width = "0dp"*** in a constraint layout means that the view together with its margin will occupy the whole horizontal constraint set. This works best if the view below is constrained horizontally to the one above it.

**b).** copy the code below and paste it to ***activity_sign_in.xml***

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

The UI code above is similar to the previous one. The main views are two `EditTexts` and two `Buttons`. Remember in *SignInActivity* the user doesn't need to enter the password twice unlike when *Creating an account*

**c).** finally copy the code below into ***activity_home.xml***

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

This generates a textView at the top and a signOut button.
Now we're done with the user interface.

### 2). Creating the App Logic (using Kotlin)

Logic is what controls the flow of a program. In our app, we need to handle clicks, navigation as well as managing users. All these are interactions the user can perform using the UI. This process involves accessing the UI elements from their respective inflaters. Think of it as connecting the layout to a class responsible for populating it(the layout) on the screen.

There are many ways to achieve this;

- Using [View binding](https://developer.android.com/topic/libraries/view-binding/migration)
- Using [Kotlin synthetics](https://developer.android.com/topic/libraries/view-binding/migration)
- using findViewById<>()

### a). Set up Firebase utils and extensions

Right-click on `utils` **package** >> **new** >> **kotlin file/class** then select **object** . Name it `FirebaseUtils`
Inside this object, we initialize firebase auth and nullable firebase user.

```Kotlin
object FirebaseUtils {
    val firebaseAuth: FirebaseAuth = FirebaseAuth.getInstance()
    val firebaseUser: FirebaseUser? = firebaseAuth.currentUser
}
```

Generally, we should avoid code repetition as much as possible. Kotlin offers a very important type of function called extension functions.
Similar to the one above, create an object named `Extensions`. In here paste the code below that creates a toast with the message passed as the argument during a function call.

```Kotlin
object Extensions {
    fun Activity.toast(msg: String){
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
    }
}

```

### b)

`CreateAccountActivity.kt` is set as the launcher activity in the `manifest file`. This means that it'll appear on the first screen when the user taps the app icon. With that said, open `CreateAccountActivity.kt` in the editor by double-tapping or drag-dropping it.

Here we're going to create an algorithm that will:

- check if there's a signed-in user in that device and if this returns true, we proceed to `HomeActivity` otherwise we stay.

- Handle clicks and check the inputs. Inputs are considered valid if they're not empty, are of the correct format and the password is fairly secure. Note that Firebase auth API will not create an account with an insecure password. As a result, it's a good idea to mix digits, special characters, and letters in the password field and be at least eight characters long.

To keep things simple, we're going to use `Kotlin synthetics` to import our views from the respective layout. This is no longer available by default but we can use it via the kotlin-android-extensions plugin.

Before we proceed make sure you have the following plugin in your build. Gradle (app module level)

```Kotlin
plugins{
       id 'kotlin-android-extensions'
}
```

Inside `CreateAccountActivity.kt`, import kotlin synthetics like this

```Kotlin
import kotlinx.android.synthetic.main.activity_create_account.*
```

Now we can use the view's id to access it!
Paste the code below to `CreateAccountActivity.kt`

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

In the code above, we've created a user using the details provided. we've also handled errors effectively.

### c)

**SignInactivity** is similar to **CreateAccountActivity**. The only major difference is that we'll use firebase `signInWithEmailAndPassword()` function. Inputs are processed the same way as for creating an account.
here is the code for that.

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

**d).**

Let's handle actions that the user can perform when at `HomeActivity`.
paste the code below to `HomeActivity.kt`

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

in the above code, we've signed out the user, showed a toast, and finished the activity. `finish()` means that users will not be taken to the previous activity when they click the back button.

Finally for our app to work as expected, we need to add internet permission in the manifest just before the application tag like this

```Xml
<uses-permission android:name="android.permission.INTERNET" />
```

**Run the App**
Click `shift`+`f10` or the run button just after the devices section. Ensure that the target device has [developer options](https://developer.android.com/studio/debug/dev-options) and `USB debugging` enabled.

Wait for Gradle build to finish, install, and launch your app.
Now we have a running app that can.

- interact with the users effectively
- create a firebase account
- manage the account (user)
- Implement firebase APIs

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/app_three_in_one.png "create account / sign out / sign in")

When you open the users' section in the firebase console you'll find all signed-in users. Each user/account is given a unique id and the password is [hashed](https://firebaseopensource.com/projects/firebase/scrypt/).

![image](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/firebase_authenticated_users.png "firebase authenticated users")

### Conclusion

In this article, we've learned most of the best that Firebase offers particularly authentication. The project we created can be improved further for production apps and it'll still work fine. I can't wait to see what you'll build with Firebase authentication.
