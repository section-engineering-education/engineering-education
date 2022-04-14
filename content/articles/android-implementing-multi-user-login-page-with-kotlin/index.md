# [Android] Implementing Multi-User Login Page with Kotlin, Firebase Authentication and Firebase Realtime Database, Using Firebase DataSnapShot, on Android.

### Introduction

This tutorial will show you how to use Firebase Authentication and the Realtime database to implement a multi-user login page using the DataSnapShot instance to retrieve users’ data from the Firebase Realtime Database.

Building multi-user applications helps to accommodate users of different levels on the same application, thereby preventing the building of different instances of the same application for different users. Building a multi-user login page on an application facilitates the creation of multi-user applications, as the login page serves as an entry point to other parts of many secured applications, which means from the login page when the user supplies the right credentials, he/she will be pointed to the right section of the application.

### **Key takeaways**

- Understanding how to connect Firebase to your app.
- Understanding how to create a Multi-user login page.
- Implementing multi-user(admin, userlvl1, userlvl2) capabilities of an android application using DataSnapShot.

### Table of Content

- Create a new project on Android Studio
- Import dependencies for your project
- Link your project with Firebase
- Create the multi-user login page.
- Run your project

**Prerequisites**

To successfully follow this tutorial, you have to be equipped with the following:

1. A computer with minimum of 4gb RAM 

 2.  Latest [Android Studio](https://developer.android.com/studio) installed.

 3.  Have a basic knowledge of programming.

 4.  Have a basic understanding of Kotlin programming language.

1. Have a working internet connection

If you have all those ready, then let's get started!

### Create a new project on Android Studio

To create a new project, click on your Android Studio and allow it to load:

![Screenshot (124).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(124).png)

On the welcome screen select new project.

![Screenshot (125).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(125).png)

Select an empty activity and click next.

![Screenshot (126).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(126).png)

On the next screen, name your project. In this tutorial, my project is called "multi-login." Choose the language you wish to use and write the project. This project is built with Kotlin. Then select your minimum SDK and click Finish.

![Screenshot (128).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(128).png)

Wait for your project to build successfully.

![Screenshot (130).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(130).png)

### Import Dependencies

To import dependencies for this project, go to your "build.gradle app module," then import them.

```jsx
apply plugin: 'kotlin-android-extensions'
```

This plugin helps to call the app components by their ids. Then go ahead and synchronize your project.

### Link Your Project With Firebase

To achieve what we want in this project, we need a database and a server where users' data can be stored and retrieved from any user registered on the platform. Firebase can solve this for us.

To link the project with Firebase, click on "tools" on your menu bar, then select "Firebase."

![Screenshot (129).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(129).png)

Select the authentication option. In the drop-down, select “Authenticate using a custom authentication system [KOTLIN]”.

![Screenshot (132).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(132).png)

On the next screen, select "Connect to Firebase". This will lead you to the browser where you will connect your app to Firebase.

![Screenshot (134).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(134).png)

Before you can connect your app to Firebase, you may be required to build your app. Go ahead and click on ‘Build’ button on the pop-up menu.

![Screenshot (134).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(134)%201.png)

After a successful build, you will be redirected to the browser and to your Firebase console.

![Screenshot (135).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(135).png)

On your Firebase console, select ‘Add Project’ to add your new project. On the next screen, agree to the prompts and continue.

![Screenshot (136).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(136).png)

![Screenshot (140).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(140).png)

After following the steps above, you have successfully connected your android app firebase.

![Screenshot (143).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(143).png)

Head back to the Android Studio. There you'll see a pop-up message that confirms that you have connected your app to Firebase. Then go ahead and click the "Add the Firebase Authentication SDK to your app" button so you can add the Authentication SDK to your project. Follow the prompts below to proceed, then allow your gradle files to synchronize with your project.

![Screenshot (144).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(144).png)

![Screenshot (146).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(146).png)

Still on the assistant menu, click on ‘Realtime Database’, then select ‘Get started with Realtime Database [KOTLIN]. The next screen will show that your app has already been connected to Firebase, what to do next is to add the Realtime Database to your app by selecting ‘Add the Realtime Database SDK to your app’.

![Screenshot (148).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(148).png)

![Screenshot (149).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(149).png)

Next, we return to the browser, open the Firebase console, where we can see or firebase projects, and then select the project you're working on, in my case,'multi-login.’

![Screenshot (150).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(150).png)

Select Realtime Database from the menu and follow the prompts. Also, click on Authentication. Under sign-in method, choose Email/Password. Follow the prompts on the images below, then click Save.

![Screenshot (151).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(151).png)

![Screenshot (152).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(152).png)

![Screenshot (153).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(153).png)

![Screenshot (154).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(154).png)

### Create the multi-user login page.

For creating this multi-user login page, our project will contain four activities, which are the mainactivity, admin, lecturer, and student activities. All are empty activities, but for the purpose of clarity, only the mainactivity and admin activities will be programmed, where the admin can add users, so you can understand the illustration. Also, a "User" data class with four fields will be created.

Before you proceed, make sure you have synchronized your project successfully and your gradle file has the necessary plugins and dependencies imported. Below is how your ‘app Module build.gradle file’ should look.

```kotlin
dependencies {

    implementation 'androidx.core:core-ktx:1.7.0'
    implementation 'androidx.appcompat:appcompat:1.4.1'
    implementation 'com.google.android.material:material:1.5.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.3'
    implementation 'com.google.firebase:firebase-auth-ktx:21.0.3'
    implementation 'com.google.firebase:firebase-database-ktx:20.0.4'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'

    apply plugin: 'kotlin-android-extensions'
}
```

For the main activity, the code below implements the login, which takes user data and validates it on Firebase, where the data is in the database and read as a DataSnapshot instance.

A DataSnapshot instance contains data from a Firebase Database location. Any time you read database data, you receive the data as a DataSnapshot.

If the user data matches what is on the database and the user-type matches what was supplied on the drop-down menu, then the user will be directed to either the Admin, Student, or Lecturer activity, thereby helping not to bother to create instances of the same app for different users.

### Below is the activity_main.xml code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:app="http://schemas.android.com/apk/res-auto"
xmlns:tools="http://schemas.android.com/tools"
android:layout_width="match_parent"
android:layout_height="match_parent"

tools:context=".MainActivity">

<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="73dp"
        android:text="Login"
        android:textSize="48sp"
        android:typeface="serif"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Spinner
        android:id="@+id/userchioce"
        android:layout_width="323dp"
        android:layout_height="50dp"
        android:layout_marginTop="14dp"
        android:entries="@array/users_list"
        android:prompt="@string/users"
        android:spinnerMode="dropdown"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/loginpassword" />

    <EditText
        android:id="@+id/loginpassword"
        android:layout_width="323dp"
        android:layout_height="50dp"
        android:layout_marginTop="11dp"
        android:drawableStart="@drawable/ic_baseline_lock_24"
        android:ems="10"
        android:hint="Password"
        android:inputType="textPassword"
        android:textSize="22sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/loginEmail"
        app:passwordToggleEnabled="true"
        app:passwordToggleTint="#AB47BC" />

    <Button
        android:id="@+id/loginbtn"
        android:layout_width="134dp"
        android:layout_height="50dp"
        android:layout_marginTop="460dp"
        android:text="Login"
        android:textAllCaps="false"
        android:background="@drawable/rounded"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:ignore="UnknownId" />

    <EditText
        android:id="@+id/loginEmail"
        android:layout_width="323dp"
        android:layout_height="50dp"
        android:layout_marginTop="68dp"
        android:drawableStart="@drawable/ic_baseline_email_24"
        android:ems="10"
        android:hint="Email"
        android:inputType="textEmailAddress"
        android:textSize="22sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

</androidx.constraintlayout.widget.ConstraintLayout>
</ScrollView>
```

To implement the rounded button, navigate to the "res" folder, open the ‘drawable’ folder, then create your shape XML file. In this case, I named it rounded.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">

    android:shape="rectangle">
    <solid
        android:color="@color/purple_200"
        />
    <corners
        android:radius="18dp"
        />

</shape>
```

To get the spinner (which is the drop-down menu) working, navigate into your "res" folder, select "values", then open the "strings.xml" file and add the code below, between the resources tag. This will add values to the spinner.

```xml
<string name="users">Select User</string>
    <string-array name="users_list">
        <item>Admin</item>
        <item>Lecturer</item>
        <item>Student</item>
    </string-array>
```

To get the password vector asset and the email vector asset, go to File, select New, and click on Vector Asset. Then choose the two assets.

### Below is the Mainactivity.kt code.

```kotlin
package com.example.multi_login

import android.app.ProgressDialog
import android.content.ContentValues
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        loginbtn.setOnClickListener {
            loginUser()
        }

    }

   

    private fun loginUser() {
        val Password: String = loginpassword?.text.toString()
        val Email: String = loginEmail?.text.toString()

        when {
            TextUtils.isEmpty(Email) -> Toast.makeText(this, "Enter Email or Username", Toast.LENGTH_LONG).show()
            TextUtils.isEmpty(Password) -> Toast.makeText(this, "Enter Password", Toast.LENGTH_LONG).show()

            else -> {
                val progressDialog = ProgressDialog(this)
                progressDialog.setTitle("Login")
                progressDialog.setMessage("Authenticating...")
                progressDialog.setCanceledOnTouchOutside(false)
                progressDialog.show()
                val mAuth: FirebaseAuth = FirebaseAuth.getInstance()

                mAuth.signInWithEmailAndPassword(Email, Password).addOnCompleteListener { task ->
                    if (task.isSuccessful) {

                        val uid = FirebaseAuth.getInstance().currentUser!!.uid

                        val rootRef = FirebaseDatabase.getInstance().reference
                        val uidRef = rootRef.child("Users").child(uid)
                        val spin: String = userchioce.selectedItem.toString()
                        val valueEventListener: ValueEventListener = object : ValueEventListener {
                            override fun onDataChange(dataSnapshot: DataSnapshot) {
                                when {
                                    dataSnapshot.child("users").getValue(String::class.java) == "Admin" -> {
                                        if (spin.equals("Admin")){
                                            val intent = Intent(this@MainActivity,Admin::class.java)
                                            startActivity(intent)}
                                        else{
                                            Toast.makeText(this@MainActivity, "Select Your User-Type", Toast.LENGTH_SHORT)
                                                .show()
                                        }
                                    }

                                    dataSnapshot.child("users").getValue(String::class.java) == "Lecturer" -> {
                                        if (spin.equals("Lecturer")) {
                                            val intent = Intent(this@MainActivity, Lecturer::class.java)
                                            startActivity(intent)
                                        }else{
                                            Toast.makeText(this@MainActivity, "Select Your User-Type", Toast.LENGTH_SHORT)
                                                .show()
                                        }
                                    }
                                    dataSnapshot.child("users").getValue(String::class.java) == "Student" -> {
                                        if (spin.equals("Student")) {
                                            val intent = Intent(this@MainActivity, Student::class.java)
                                            startActivity(intent)
                                        }else{
                                            Toast.makeText(this@MainActivity, "Select Your User-Type", Toast.LENGTH_SHORT)
                                                .show()
                                        }
                                    }
                                }
                            }

                            override fun onCancelled(databaseError: DatabaseError) {
                                Log.d(ContentValues.TAG, databaseError.message)
                            }
                        }
                        uidRef.addListenerForSingleValueEvent(valueEventListener)
                        progressDialog.dismiss()
                    } else {
                        val message = task.exception!!.toString()
                        Toast.makeText(this, "not registered $message", Toast.LENGTH_LONG)
                            .show()
                        FirebaseAuth.getInstance().signOut()
                        progressDialog.dismiss()
                    }
                }
            }

        }

    }
}
```

### Admin Activity

Below is the code for admin activity, where the admin can add users to the Realtime database and also delete users, but in this tutorial you can only add users.

Before creating the Admin activity, create a data class. In this tutorial, I named it "User," so it will be a User.kt class, which holds the user’s data as strings, which is sent to the Firebase database, as the code is seen below.

### User.kt Data class code

```kotlin
package com.example.multi_login

data class User(val firstname: String? = null, val lastname: String? = null, val username: String? = null, val email: String? = null, val users: String? = null )
```

### activity_admin.xml code

Below is the code for the Admin activity’s interface.

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"

    tools:context=".Admin">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <Button
            android:id="@+id/deletebtn"
            android:layout_width="105dp"
            android:layout_height="52dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginStart="240dp"
            android:layout_marginTop="584dp"
            android:background="@drawable/rounded"
            android:backgroundTint="@color/teal_200"
            android:text="Delete"
            android:textSize="11sp"
            app:iconPadding="4dp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/textView2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="88dp"
            android:text="Admin Register Users"
            android:textSize="30sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <EditText
            android:id="@+id/firstName"
            android:layout_width="360dp"
            android:layout_height="50dp"
            android:layout_marginTop="37dp"

            android:hint="First Name"
            android:paddingLeft="20dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/textView2" />

        <EditText
            android:id="@+id/lastName"
            android:layout_width="360dp"
            android:layout_height="50dp"
            android:layout_marginTop="20dp"

            android:hint="Last Name"
            android:paddingLeft="20dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.49"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/firstName" />

        <EditText
            android:id="@+id/regusername"
            android:layout_width="360dp"
            android:layout_height="50dp"
            android:layout_marginTop="20dp"

            android:hint="Username"
            android:paddingLeft="20dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.509"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/lastName" />

        <EditText
            android:id="@+id/emailreg"
            android:layout_width="360dp"
            android:layout_height="50dp"
            android:layout_marginTop="20dp"

            android:hint="email"
            android:inputType="textEmailAddress"
            android:paddingLeft="20dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.49"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/regusername" />

        <EditText
            android:id="@+id/regpassword"
            android:layout_width="360dp"
            android:layout_height="50dp"
            android:layout_marginTop="20dp"

            android:hint="Password"
            android:inputType="textPassword"
            android:paddingLeft="20dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.49"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/emailreg" />

        <Spinner

            android:id="@+id/userchoicereg"
            android:layout_width="360dp"
            android:layout_height="50dp"

            android:layout_marginTop="20dp"
            android:entries="@array/users_list"
            android:paddingLeft="20dp"
            android:prompt="@string/users"
            android:spinnerMode="dropdown"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.509"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/regpassword" />

        <Button
            android:id="@+id/registerBtn"
            android:layout_width="105dp"
            android:layout_height="52dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginStart="72dp"
            android:layout_marginTop="584dp"
            android:background="@drawable/rounded"
            android:backgroundTint="@color/teal_200"
            android:text="Register"
            android:textSize="11sp"
            app:iconPadding="4dp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</ScrollView>
```

### Admin activity code:

```kotlin
package com.example.multi_login

import android.app.ProgressDialog
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import kotlinx.android.synthetic.main.activity_admin.*

class Admin : AppCompatActivity() {
    private lateinit var database: DatabaseReference
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_admin)

        registerBtn.setOnClickListener {
            createAccount()
        }

    }
    private fun createAccount() {
        val password = regpassword.text.toString()
        val username = regusername.text.toString()
        val email = emailreg.text.toString()
        val lastname = lastName.text.toString()
        val firstname = firstName.text.toString()
        val spin: String = userchoicereg.selectedItem.toString()
        val users = spin

        when {
            TextUtils.isEmpty(password) -> Toast.makeText(this, "password is required.", Toast.LENGTH_LONG).show()
            TextUtils.isEmpty(username) -> Toast.makeText(this, "Username is required.", Toast.LENGTH_LONG).show()
            TextUtils.isEmpty(email) -> Toast.makeText(this, "email is required.", Toast.LENGTH_LONG).show()
            TextUtils.isEmpty(lastname) -> Toast.makeText(this, "surname is required.", Toast.LENGTH_LONG).show()
            TextUtils.isEmpty(firstname) -> Toast.makeText(this, "firstname is required.", Toast.LENGTH_LONG).show()
            TextUtils.isEmpty(users) -> Toast.makeText(this, "User Type is required.", Toast.LENGTH_LONG).show()

            else -> {

                val progressDialog = ProgressDialog(this)
                progressDialog.setTitle("Registering")
                progressDialog.setMessage("wait for registration to complete")
                progressDialog.setCanceledOnTouchOutside(false)
                progressDialog.show()

                val mAuth: FirebaseAuth = FirebaseAuth.getInstance()

                mAuth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if (task.isSuccessful) {

                            saveuserinfo()
                            progressDialog.dismiss()
                        } else {
                            val message = task.exception!!.toString()
                            Toast.makeText(this, "not registered $message", Toast.LENGTH_LONG)
                                .show()
                            mAuth.signOut()
                            progressDialog.dismiss()
                        }

                    }
            }
        }
    }

    fun saveuserinfo() {

        val Users = userchoicereg.selectedItem.toString()
        val Firstname = firstName.text.toString()
        val Lastname = lastName.text.toString()
        val Username = regusername.text.toString()
        val Email = emailreg.text.toString()

        val progressDialog = ProgressDialog(this)

        database = FirebaseDatabase.getInstance().getReference("Users")
        val user = User(Firstname, Lastname, Username, Email, Users)

        val uid = FirebaseAuth.getInstance().currentUser!!.uid
        database.child(uid).setValue(user).addOnCompleteListener { task ->

            if (task.isSuccessful) {
                firstName.text.clear()
                lastName.text.clear()
                regusername.text.clear()
                regpassword.text.clear()
                emailreg.text.clear()
                progressDialog.dismiss()
                Toast.makeText(this, "Account has been created", Toast.LENGTH_LONG).show()

            } else {
                val message = task.exception!!.toString()
                Toast.makeText(this, "not registered $message", Toast.LENGTH_LONG).show()
                FirebaseAuth.getInstance().signOut()
                progressDialog.dismiss()
            }
        }
    }
}
```

### Student Activity

The student activity is an empty activity.

### Student.kt code

```kotlin
package com.example.multi_login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class Student : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_student)
    }
}
```

### activity_student.xml code

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Student">

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Lecturer Activity

The lecturer activity is also an empty activity

### Lecturer.kt code

```kotlin
package com.example.multi_login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class Lecturer : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lecturer)
    }
}
```

### activity_lecturer.xml code

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Lecturer">

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Run your project

Before you run your project, head to your Firebase console, click on authentication, and add a user. This user will be the default admin of your app who can login at the first start of the app into the admin dashboard and create users. This default admin can then be deleted as the main admin of the app takes charge.

![Screenshot (157).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(157).png)

![Screenshot (159).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(159).png)

Copy the User Id and head into the Realtime Database. Create a node called "Users". Directly under it, create another node and place the User Id as the key. Under the User Id node, add the user details, which are email, firstname, lastname, username, and users, in a key/value format, as seen below.

![Screenshot (160).png](/engineering-education/android-implementing-multi-user-login-page-with-kotlin/Screenshot_(160).png)

Then run your app on your emulator, or external Android device, create two or more users of different user types, and try to log in with these new users.

With this, you have successfully created a multi-user login page using Firebase database and Firebase authentication, which directs a user to the right user activity, given the user-data that was submitted on registration, which is determined by the data content retrieved by a DataSnapshot.