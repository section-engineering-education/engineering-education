---
layout: engineering-education
status: publish
published: true
url: /okio-vs-retrofit/
title: Okio vs Retrofit
description: This article will compare Okio and Retrofit in making network requests in android applications.
author: vivian-odhiambo
date: 2022-01-06T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/okio-vs-retrofit/hero.png
    alt: Okio vs Retrofit Hero Image
---
When designing an Android application, it's important to think about how to send and manage network requests, as well as which frameworks to use. These actions are frequently used to get or change API data or media from a server. This is a typical task in Android development, especially for clients who use dynamic data.
<!--more-->
### what is Okio as compared to retrofit
Okio is a library that works in conjunction with java.io and java. nio to make data access, storage, and processing considerably easier. It started as a component of OkHttp, Android's competent HTTP client. while Retrofit is a REST client for Java and Android application development that is type-safe. Retrofit is a library including interfaces, classes, and methods that provide the functionality required. The retrofit library can parse JSON or XML data and convert it to POJOs (Plain Old Java Objects).
Okio is well-trained and eager to take on new challenges and it is also a fast and easy android networking library.

### Prerequisites
- Have a basic understanding of Android programming
- Understand the basics of the Kotlin programming language

### Goals
This article will lead the reader through the Okio library's concept and how it's used in Android apps, its advantages, and disadvantages, as well as all of the characteristics that set it apart from the Retrofit library.

### Features of Okio
- `BythString` - It's an immutable byte sequence for string data, making it simple to treat binary data as values.
- `Buffer` - It is a modifiable sequence of bytes, such as ArrayList, that makes it simple to read, write, and timeout network requests.

### Advantages of Okio library
- It is based on 'byteString' and 'buffers,' which compact a lot of functionality into a simple API and save both CPU and memory.
- Okio features its stream types called 'bufferSource' and 'buffersink,' which operate as inputStream and outputStream, respectively.
- It is simple to construct, use, and test using the two Streams.

### Disadvantages of Okio library
- Because there is no direct communication with the webserver when making network calls, the process is slow.
- Request cancellation is not supported by the Okio library.
- It can't handle both synchronous and asynchronous network requests at the same time.

Let's get Coding !!

### Step 1: Create a New Project
To make a new project, go to File > New, then New Project, and select Empty activity from the drop-down menu. Then, as shown below, give the project a descriptive name and select 'kotlin' as the language to use.

![new project](/engineering-education/okio-vs-retrofit/new-project.png)

### Step 2: Setting up Okio Library
Since Okio is a component of OkHttp, we'll utilize OkHttp to download any file from the server in this situation. Add the following dependencies to your 'build. gradle' app-level to set up okio.

```gradle
 //okio library
    implementation 'com.squareup.okhttp3:okhttp:4.9.1'
```

### Step 3: Creating the User Interface
It is critical to set up the area where network data is presented. In this example, we will just consider utilizing an imageView to contain the requested image and a button to download the image. The user interface is implemented as follows.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="400dp"
        android:layout_height="400dp"
        android:layout_marginTop="36dp"
        android:scaleType="centerCrop"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/ic_launcher_background" />

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginTop="28dp"
        android:layout_marginEnd="24dp"
        android:text="download Image"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.46"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />

    <ProgressBar
        android:id="@+id/pbImage"
        style="?android:attr/progressBarStyle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.285" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Adding all the Needed Permissions
As okio requires access to the internet as well as permissions to write to external storage, all permissions are always included in the 'Manifest.' The permissions listed below must be provided in the manifest.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

### Step 5: Declaring Required variables
Declare the following variables in the 'MainActivity' to be used later in the implementation of Okio.

```kotlin
//Declaring variables used in the implementation of okio
    var folder: File? = null
    var file: File? = null

// setting the image link
    var imageLink = //"https://venturesafrca.com/wp-content/uploads/2014/10/Android1.jpg"
```

### Step 6:Set an Inner class that downloads the image
Create an innerclass that sets the required views' data.

```kotlin
 // innerclass to download image
    inner class DownloadImage internal constructor(file: File):AsyncTask<Void?,Any?,String>(){
        var imagePath = ""

        // performs task in the background
        override fun doInBackground(vararg p0: Void?): String {
            return imagePath
        }

        // set the image to the image view
        override fun onPostExecute(s: String) {
            super.onPostExecute(s)
            Log.v("Result", s + "")
            Log.d(TAG, "onPostExecute: ")
            imageView.setImageURI(Uri.parse(s))
            progressBar.isVisible = false
        }

        // setting image path with the file path
        init {
            imagePath = file.path
        }
    }
```

### Step 7: Function to Perform Network calls
We'll write and read the requested data using 'bufferSource' as inputStream and 'bufferSink' as outputStream, set the 'URL', create the required files and folders as well as delete the file when it's no longer needed.

```kotlin
fun downloading(view:View){
        binding.pbImage.isVisible = true
        try {
            // setting the request with a Url
            val request = Request.Builder()
                .url(imageLink)
                .build()
             OkHttpClient().newCall(request).enqueue(object:Callback{

                 // executed if there is no response
                override fun onFailure(call: Call, e: IOException) {
                }

                 // Executed if there is a response
                override fun onResponse(call: Call, response: Response)  {
                     // creating folder if it does not exixt
                    if (!folder!!.exists()){
                        val folderCreated:Boolean = folder!!.mkdir()
                        Log.v("folderCreated",folderCreated.toString())
                    }
                     // assigning file path to the created folder
                    file = File(folder!!.path + "/downloadedImage.png")

                     // Deleting file if it exist
                    if (file!!.exists()){
                        val fileDeleted:Boolean = file!!.delete()
                        Log.v("fileDeleted", fileDeleted.toString())
                    }
                     //creating the file
                    val fileCreated = file!!.createNewFile()
                    Log.v("fileCreated",fileCreated.toString())

                     //writing the data using bufferSource as InputStream and bufferSink as OutputStream
                     val sink: BufferedSink = Okio.buffer(Okio.sink(file))
                     sink.writeAll(response.body!!.source())
                     sink.close()
                     //setting the file to the class
                     DownloadImage(file!!).execute()
                 }

            })
        } catch (e: Exception){
            e.printStackTrace()
        }
    }
```

> call the created function within the `onCreate` method like this

```kotlin
binding.button.setOnClickListener {
            downloading(imageView)
        }
```

### Factor to Consider When Choosing a network call library
#### Speed
Retrofit is faster than Okio when it comes to designing an android application that makes faster network calls.

#### Storage
Because Okio uses less CPU and memory, it is the best option to consider.

#### Type of Network call
When you need to make both synchronous and asynchronous network calls in one application, utilize the retrofit library since it supports both synchronous and asynchronous network calls at the same time.

### Conclusion
We have discussed the differences between okio library and Retrofit network calls in this tutorial. okio's advantages and downsides. Features of Okio Library, as well as how to use okio library.

Get the full code on this GitHub [Repository](https://github.com/nia-vee/okioDemo).

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
