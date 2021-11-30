 ### Authentication Using Facebook in Android Studio
 Authentication is essential for securing access to online content. The user, thus, has to provide proof of their identity.

In this article, we will be discussing Facebook Authentication on android apps.

### What you need to have
To follow in this article, the reader should equip themselves with the following:
- Have an installed functional `Android Studio IDE`
- Have some basic knowledge in `Kotlin`
- Have some basic Know-how on Creating projects in `Android Studio`
- Have some basic knowledge of authentication with `Firebase`
### What You will Know
At the end of this article the reader will have learned the following:
- An understanding of Facebook Authentication.
- Know-how on the creation of `Facebook Developer` account
- Know-how on the creation of projects on the `Facebook Developers` console
### Introduction
When accessing third-party services, not only the user should identify themselves. The app should receive authority to act on behalf of the user.
Among the ways to deal with authentication today is Facebook Authentication.
Facebook has provided an authentication SDK. This SDK enables authentication to access third-party services by use of `Facebook Login`
### An Overview of Other Authentication Forms
Firebase has provided other ways to offer authentication to third-party content. For instance the use of `Email and Password`
This is through `firebaseAuth.createUserWithEmailAndPassword(email,password)`
This process, yet, is somewhat tedious as it involves the user creating an account. Later then they can use the details to log in to the app.
### Why Facebook Login?
The Superiority of Facebook Login above the other traditional authentication are as follows:
- When users sign in to your app with Facebook, they grant your app permission. This permission can allow your app to access information. Your app can also perform actions on Facebook on behalf of the user.
- With a Facebook login, the user does not need to create a new account before accessing content on your app. At the click of a button, the user is immediately identified. That is if they have a prior Facebook account) then the login.
## Enough on the much theory. Now let us make things happen!

In our example, we will be creating an application that authenticates with Facebook. The application will also display the user's Facebook details. For instance  `username, email, birthday, gender and profile pic`.
### Step 1: Creation of a Project
In this step, we will create a project with an empty activity in Android Studio.
In your Android Studio, at the top left corner, click on File -> New -> New Project -> Empty Activity
![creating a project](/engineering-education/authentication-with-facebook-in-android-studio/creating_project.png)
You click on next then give your project a name of your choice. 


### Step 2: Connecting your Application to Firebase
At the top of your android studio, click on Tools.
Click on firebase. On the assistant window that appears on your right select Authentication.
You then select Facebook.
Go ahead and click on Connect to Firebase. You then click on Add Firebase Authentication to your app.

On your browser open the Firebase console and select your project. Under authentication click on Facebook and enable it.
### Step 3: Facebook for Developers
Head over to https://developers.facebook.com/ and create an account (If you do not have one).
Then click on my apps and create a new app. on the drop-down select Consumer then click next.
Enter the app details and click next.
On your left click on Settings and select basic. You can now copy the App ID and App Secret. Paste these into the firebase console fields under Facebook authentication.
Now click on the dashboard and select the Facebook setup option. Select Android and click on next.
![creating a project](/engineering-education/authentication-with-facebook-in-android-studio/facebook_for_developers.png)
Under the first step, click next.
### Step 4: Adding Dependencies
In your settings.gradle file, add `mavenCentral()` under repositories.

```In your build.gradle(Module.app) add the following dependencies:
implementation 'com.github.bumptech.glide:glide:4.12.0'
//Glide
annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'
implementation 'com.facebook.android:facebook-android-sdk:12.1.0'
 ```

 Add the following to your build.gradle(Module.app) under Android
 ```
buildFeatures {
        viewBinding true
    }
 ```
### Step 5: More App Details on Facebook Developers
Add your package and default activity class names in the fields provided. Click on next.

### Step 6: Hash Key Generation
Using your SHA1 key, generate a hash key and paste it on the `key hashes option`

### Step 7: Editing the Manifest and String files
Add the following lines of code to your Manifest and String files:
``` Manifest
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

``` Strings
<string name="facebook_app_id">214268554165523</string>
<string name="fb_login_protocol_scheme">fb214268554165523</string>
```

### Step 8: XML Layout
We will now create our User Interface 

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

### Step 9: The Code
We will now write our code in the MainActivity

```Kotlin
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
//Declare it as bellow
    private lateinit var binding: ActivityMainBinding
//Declare the Facebook callbackmanager    
    private lateinit var callBackManager: CallbackManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view: View = binding.root
        setContentView(view)
        
//Now Initialize the callbackmanager

        callBackManager = CallbackManager.Factory.create()
        
//set the login button with permissions to read and ad to a list all user data you want to get   

        binding.loginButton.setReadPermissions(listOf("email","public_profile","user_gender","user_birthday"))
        
//now after the login button is clicked a callback is registered.
//This callback can return an error, success or can be cancelled

        binding.loginButton.registerCallback(callBackManager, object : FacebookCallback<LoginResult>{
            override fun onCancel() {
                Toast.makeText(this@MainActivity,
                    "Cancelled",
                    Toast.LENGTH_SHORT).show() }

            override fun onError(error: FacebookException) {
                Toast.makeText(this@MainActivity, "$error", Toast.LENGTH_SHORT).show() }

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
//This function gets the users facebook data.
//This includes the username, email, birthday, gener and the ptofile picture.
//As they appear in facebook

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

### Output
After running your app, this should be your expected output:
![Demo](/engineering-education/authentication-with-facebook-in-android-studio/20211115174442.mp4)

### Conclusion
Facebook Authentication entails so much more than this. We scratched the surface.
Keep Exploring and studying.

### Resources
[Facebook for developers](https://developers.facebook.com/)
[Firebase](https://console.firebase.google.com/)
