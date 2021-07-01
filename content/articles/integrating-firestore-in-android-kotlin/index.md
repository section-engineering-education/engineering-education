---
layout: engineering-education
status: publish
published: true
url: /integrating-firestore-in-android-kotlin/
title: Integrating Cloud Firestore Database in Android using Kotlin
description: With the advancement in technology, the need for cloud-based applications is briskly increasing. This tutorial goes through how to create a Cloud Firestore database and perform Create and Read operations in an Android app.
author: noni-diana
date: 2021-07-01T00:00:00-14:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrating-firestore-in-android-kotlin/hero.png
    alt: Integrating Firestore in Android-Kotlin.
---
Firestore is a cloud-hosted NoSQL database that can be integrated into various platforms (iOS, Android, and web apps) via the respective SDK(s). 

It is a reliable database because it offers flexible data storage structures, expressive querying, offline caching support, improved identity and access management (IAM), and synchronized real-time updates.

Modern apps are expected to run smoothly and offer the best possible user experience and that's exactly what Firestore brings us. In this article, we'll learn how Firestore can be used in an Android app using the Kotlin programming language.

### Prerequisites
To follow through this article, you'll need to have a basic experience in:
- Using [Kotlin](https://kotlinlang.org/).
- General usage of [Android Studio](https://developer.android.com/studio).
- View [binding or data binding](https://developer.android.com/topic/libraries/data-binding).
- [Managing a Google account](https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp).

### Table of contents
- [Introduction to Cloud Firestore.](#how-firestore-stores-data)
- [Creating a Firebase project](#create-a-firebase-project)
- [Creating an Android project](#create-an-android-project)
- [Connect the two projects using the Firebase console](#connect-the-two-projects)
- [Create a Firestore Cloud database](#create-cloud-firestore-database)
- [Upload and Read data](#database-operations)
- [Conclusion](#conclusion)

### How Firestore stores data
Unlike other popular databases, Firestore stores data in a [NoSQL format](https://youtu.be/v_hR4K4auoQ), that is, data is stored in JSON objects within nodes. These nodes are referred to as documents. A document can not exist on its own. There must be a parent container that holds at least one document. This container is referred to as a collection. 

As the database grows, a tree-like structure is formed with the related documents and collections connected to a common collection with the aid of their respective `IDs`. Firestore is unique in that it supports creation of collections inside documents. These buried collections are known as sub-collections.

For instance, to create a `users` database, we'll create a collection called `users` and add documents with `unique` IDs each holding the user's attributes. 
These attributes can be of the following data types:

Boolean, Number, String, Geo point, Binary blob, Cloud Firestore references, Arrays, Map values, and Timestamp.

### Create a Firebase project
Cloud Firestore is among the products that Firebase offers. We, therefore, need to create a Firebase project in which we'll create the database. Go to the [Official Firebase website](https://firebase.google.com/) and log in using your Google account.

Click `Go to console` and tap `+ add project`. This initiates a 3-step process that asks you to set the name for your project, project ID, location, and finally to accept the terms of service.

![Firebase project example](/engineering-education/integrating-firestore-in-android-kotlin/firebase-project-example.png)

### Create an Android project
Now, let's go ahead and create an Android project that we'll later connect with the Firebase project we just created. Launch your IDE and start a new project of your choice.

### Connect the two projects
So far we've created two distinct projects but they both need each other to serve their purpose. To connect Android with Firebase project you'll need to do the following;

#### Download project configurations file from Firebase console
A configuration file is a `JSON` file usually named `google-services.json` that contains information about all apps connected to a Firebase project.

Open Firebase console and tap the project that you want to connect to your App. Just below the project's name is a list of available platforms that you can use. Click the Android logo to proceed.

##### 1. Add Application details
This is the most critical step as it directly takes effect on the configuration file. Copy and paste the package name to avoid typing mistakes. This can be located in the module level `build.gradle` file.

![Add app details](/engineering-education/integrating-firestore-in-android-kotlin/add-app-details.png)

##### 2. Download config file
After registering the app, click `Download google.services.json` to get your configuration file.

![Download config file](/engineering-education/integrating-firestore-in-android-kotlin/download-config-file.png)

Head back to Android Studio and switch to `Project view`. This shows all files and directories in your project. Paste the config file into the `app` folder and sync.

### Load Firebase SDK into our App
Firebase SDK allows us to access services such as Firebase auth, Realtime database, Firebase ML, Firestore among [others](https://firebase.google.com/products-build).

##### 1. Firestore dependencies
Add the following dependency in the module-level `build.gradle` file:

```bash    
// BoM and Firestore

implementation platform('com.google.firebase:firebase-bom:28.0.1')
implementation 'com.google.firebase:firebase-firestore-ktx'
```

This declares Firestore library dependency. BoM (Bill of Materials) is a library that allows us to use Firebase libraries without specifying their versions.

Include this plugin too:
```gradle
plugins{
    id 'com.google.gms.google-services'
}
```

##### 2. Add classpaths (top level build.gradle file)
```bash
dependencies{
    classpath 'com.google.gms:google-services:4.3.8'
}
```

Don't forget to add internet permission in the `Manifest file`:
```xml
<uses-permission android:name="android.permission.INTERNET"/>
```
Sync and wait for the gradle build to complete.

We've successfully connected Firebase project to our Android app. Open Firebase console and you should see something similar to this. Notice the project has a little Android icon at the bottom indicating that it has been connected to Android platform.

![Firebase projects](/engineering-education/integrating-firestore-in-android-kotlin/my-firebase-projects.png)

### Create Cloud Firestore database
Now that the setup is complete, we can proceed to create a Cloud Firestore database by clicking the respective project >> `Firestore database` on the left panel >> `Create database` as shown below.

![Create databse](/engineering-education/integrating-firestore-in-android-kotlin/create-cloud-database.png)

### Firestore Data Security
Firestore uses a variety of rules to control database access. The following are the two commonly used rules.

#### 1. Test rule
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2021, 7, 12);
    }
  }
}
```
This allows all app users to read, write and perform any other data manipulation activity on the database for one month if rules remain unchanged. After this, all users are denied access to the database. Therefore this rule is not recommended for production, but it is preferred for testing purposes.

#### 2. Authentication required
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
Unlike the test rule, this `only` allows [authenticated users](https://www.section.io/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/) to access the database. For a general-level production app, this is the rule to go to.

To learn more about Firebase rules, be sure to check out [Firebase Docs](https://firebase.google.com/docs/rules/basics).

### Building the Application User interface

#### `activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btnUploadData"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginHorizontal="8dp"
        app:layout_constraintVertical_bias="0.85"
        android:text="@string/upload_data"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/btnReadData"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/retrieve_data"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="@+id/btnUploadData"
        app:layout_constraintStart_toStartOf="@+id/btnUploadData"
        app:layout_constraintTop_toBottomOf="@+id/btnUploadData" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
This creates two buttons. They'll be used to trigger an `upload` and `read data` tasks respectively.
Add the missing strings in the `strings.xml` file:

```xml
<resources>
    <string name="upload_data">Upload data</string>
    <string name="retrieve_data">Retrieve data</string>
</resources>
```

### Enable viewBinding
View binding allows us to access views via the binding class of the `XML layout` they belong to.
Add the code block below in the module level `gradle` file and sync your project:

```bash
android{
    ...

    buildFeatures{
        viewBinding true
    }
}
```

### Inflate the UI
```kotlin
const val TAG = "FIRESTORE"

class MainActivity : AppCompatActivity() {
    private var binding: ActivityMainBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding?.root)

        // we'll call functions here
    }
```
Here, we've made use of viewBinding to inflate UI accordingly. We've also declared a global constant variable that will be used as a tag in our log messages.

### Database operations
Using test rules. Operations in a database include Create, Read, Update, and Delete also known as CRUD operations.

#### Create database instance
Create a `Kotlin` class named `FirebaseUtils` and paste the code below in it:
```kotlin
class FirebaseUtils {
        val fireStoreDatabase = FirebaseFirestore.getInstance()
}
```

This serves as an API that allows us to `add`, `get`, `delete`, and `update` collections and documents in the database.

##### 1. Upload data
An upload action will be initiated when the `upload` button is clicked. Paste the following in the `MainActivity.kt` file:
```kotlin
private fun uploadData() {
    binding!!.btnUploadData.setOnClickListener {

        // create a dummy data
        val hashMap = hashMapOf<String, Any>(
            "name" to "John doe",
            "city" to "Nairobi",
            "age" to 24
        )

        // use the add() method to create a document inside users collection
        FirebaseUtils().fireStoreDatabase.collection("users")
            .add(hashMap)
            .addOnSuccessListener {
                Log.d(TAG, "Added document with ID ${it.id}")
            }
            .addOnFailureListener { exception ->
                Log.w(TAG, "Error adding document $exception")
            }
    }
```
Call this function in the `onCreate()` method:
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    ...
    
    uploadData()
}
```
This adds a sample data and Logs the id of the document if the task was successful. Otherwise, an exception is thrown and logged as well. Exceptions can occur when we try to upload without an internet connection and/or permission or if the database rules don't allow us to do so. 

To confirm that the database is up and running, open it on the Firebase console and you should see something like this.

![Saved data](/engineering-education/integrating-firestore-in-android-kotlin/saved-data.png)

Multiple numbers of documents are created based on the number of times we upload. These documents belong to the `users` collection and that's why we have only one collection in our database.

##### 2. Read data
```kotlin
private fun readData{
    binding!!.btnReadData.setOnClickListener {
            FirebaseUtils().fireStoreDatabase.collection("users")
                .get()
                .addOnSuccessListener { querySnapshot ->
                    querySnapshot.forEach { document ->
                        Log.d(TAG, "Read document with ID ${document.id}")
                    }
                }
                .addOnFailureListener { exception ->
                    Log.w(TAG, "Error getting documents $exception")
                }
        }
}
```
Here we've used the `get()` method to retrieve all documents in the `users` collection. Open the Logcat to check if the data is being retrieved successfully or not.

![Logs](/engineering-education/integrating-firestore-in-android-kotlin/logs.png)

### Conclusion
That's it! You can now implement Firestore cloud database in your Android app. This can be advanced further to get input data from the user and upload/retrieve it using [Kotlin coroutines](https://developer.android.com/kotlin/coroutines) for a smooth performance. 

In the next tutorial, we'll look at data modeling and querying techniques and display the actual data in a Recyclerview. The source code for this project can be found on [this Github repository](https://github.com/nonimdiana/integrating-firestore-in-android).

Happy Coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)