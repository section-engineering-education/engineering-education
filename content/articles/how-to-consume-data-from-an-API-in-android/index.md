---
layout: engineering-education
status: publish
published: true
url: /how-to-consume-data-from-an-api-in-android/
title: How To Consume Data From an API in Android
description: This tutorial provides a guideline on how to make an API request based on the user's action. We will make a simple search app that sends a request to the OMDb movie API and receives data.
author: michael-barasa
date: 2021-02-07T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-consume-data-from-an-api-in-android/hero.png
    alt: API image example
---
APIs allow applications to access a huge range of data. In numerous cases, developers usually connect their software to third party APIs. This move enables them to save a significant amount of time. In Android, tools such as Volley and Retrofit allow you to connect to APIs seamlessly.
<!--more-->
### Introduction
Android is among the most popular operating systems in the world. Statistics from Google show that more than a billion devices run Android. Therefore, the ability to utilize APIs in our applications helps us satisfy the needs of many users. 

One of the major factors that we should consider when using APIs is the number of requests. We should desist from making too many network operations. This is because it can increase battery drain and lead to poor user satisfaction. Also, API owners can bar applications that make too many requests.

### Goal
This tutorial provides a guideline on how to make an API request based on the user's action. We will make a simple search app that sends a request to the OMDb movie API and receives data.

### Prerequisites
To understand this tutorial, you must have a basic knowledge of Kotlin. Furthermore, you will need Android Studio installed on your computer.

### Step 1 - Getting started
Launch Android Studio and create a new project with an empty activity, as shown below.

![New Project](/engineering-education/how-to-consume-data-from-an-api-in-android/new-project.png)

Give the project any name, and then click on the `finish` button. Kindly note that the creation of the project usually takes some considerable time. Therefore, you need to be patient.

### Step 2 - Installing dependencies
The next step is to install volley and glide dependencies. We will use volley to handle network requests, while glide will help load images in the application.

Add the following lines in the app level `build.gradle` file.

```bash
Dependencies{
implementation 'com.android.volley:volley:1.1.1'
implementation 'com.github.bumptech.glide:glide:4.11.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.11.0'
}
```

You then click on the `Sync Now` button to download and incorporate the above dependencies in the application.

### Step 3 - Reviewing the Movie API
We will be sending and receiving data from the [OMDb](http://www.omdbapi.com/) API for this tutorial. Before going further, it is essential to understand how to access the data, the site rules, and the data structure.

#### Data access
For us to access data, we need to create an account on the OMDb website. This process requires a valid email. You can sign up from [here](http://www.omdbapi.com/apikey.aspx). Kindly note that this tutorial uses the free account option, which has a daily limit of 1,000 requests.

After registration, an API key is sent to your email inbox.

#### Site rules
One needs to include an API key while making a request to the OMDb API. For instance, the correct link is shown below.

```Kotlin
val url = "http://www.omdbapi.com/?t=${input}&apikey=${your_key}"
```

The input variable will allow us to search different movies in the OMDb API. The key is usually placed at the end of the url.

### Step 4 - Layout design
The application will have a simple layout like the one shown below.

![App Layout](/engineering-education/how-to-consume-data-from-an-api-in-android/layout.jpg)

We will use a `LinearLayout` to arrange different components on the screen. Note that the layout’s orientation is set to vertical. Here is the code for `activity-main.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

  <LinearLayout
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical">

    <EditText
        android:id="@+id/userinput"
        android:layout_margin="10dp"
        android:padding="17dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

    <Button
        android:id="@+id/search"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:text="Search"
        android:backgroundTint="@color/colorAccent"/>


    <ImageView
        android:id="@+id/image"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

    <TextView
        android:id="@+id/name"
        android:layout_margin="10dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

    <TextView
        android:id="@+id/plot"
        android:layout_margin="10dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</LinearLayout>
</ScrollView>
```

In the above layout, we have assigned an ID to our components. We will use these unique values in the `MainActivity.kt` file.

The `EditText` widget allows us to get the user’s input. When clicked, the search button will initiate a request to the OMDb API. The `ImageView` and `TextViews` will display the data returned from the server.

### Step 5 - Connecting to the API
This tutorial shows how you to make simple API requests. Therefore, all our logic is in the `MainActivity` file rather than in a separate component such as a `ViewModel`. In case you want to learn more about the MVVM architecture in Android, you can read this [article](/implementing-mvvm-architecture-in-android-using-kotlin/).

We need to do the following things in the `MainActivity`.
- Initiate a `requestQueue`.
- Make an API request.
- Parse data to UI components.

A `RequestQueue` helps us manage HTTP requests. You can learn more about the `RequestQueue` from [here](https://developer.android.com/training/volley/requestqueue).

We initiate a `requestQueue` by adding the following lines immediately after setting a content view.

```kotlin
setContentView(R.layout.activity_main)
val appnetwork = BasicNetwork(HurlStack())
val appcache = DiskBasedCache(cacheDir, 1024 * 1024) // 1MB cap
requestQueue = RequestQueue(appcache, appnetwork).apply {
    start()
}
```

The `appnetwork` variable allows the application to use an HTTP client.

The next step is to add a click listener to our `search` button. The user will make an API call by clicking this button.

```Kotlin
search.setOnClickListener {
    var input = userinput.text.toString()
    fetchData(input)
}
```

The input variable stores the user's search term. This value is then passed to the `fetchData` method as a parameter.
Let’s create the `fetchData` method.

```kotlin
fun fetchData( input: String){
    val url = "http://www.omdbapi.com/?t=${input}&apikey=cebd9b53"
    val jsonObjectRequest = JsonObjectRequest(Request.Method.GET, url, null,
        { response ->
         if(response.get("Response")=="False"){
             name.text = "Incorrect detail"
         }else {
             Glide.with(this).load(response.getString("Poster")).into(image)
             plot.text = response.getString("Plot")
             name.text = response.getString("Title")+"\n\n"+"Writer: "+response.getString("Writer")
         }
        },
        { error ->
            Log.d("vol",error.toString())
        }
    )

    requestQueue.add(jsonObjectRequest)
}
```

The `fetchData` function requires a string (user's input) as a parameter. This string is then joined to the url as `=${input}`.
We are using a `JsonObjectRequest` because our application returns a single Movie object rather than a list. We use an `if-else` statement to handle different states in the `jsonObjectRequest` lambda function. If the request is successful, we extract the data and parse it to the components.

```Kotlin
Glide.with(this).load(response.getString("Poster")).into(image)
plot.text = response.getString("Plot")
name.text = response.getString("Title")+"\n\n"+"Writer: "+response.getString("Writer")
```

The Glide library helps load the image to the `ImageView`.

An error message is also logged in case the network request fails. This helps in the debugging process.

```Kotlin
{ error ->
    Log.d("vol",error.toString())
}
```

Finally, the `jsonObjectRequest` is added to the `requestQueue`.

```Kotlin
requestQueue.add(jsonObjectRequest)
```

Here is the code for the `MainActivity.kt`.

```kotlin
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.BasicNetwork
import com.android.volley.toolbox.DiskBasedCache
import com.android.volley.toolbox.HurlStack
import com.android.volley.toolbox.JsonObjectRequest
import com.bumptech.glide.Glide
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {
    lateinit var requestQueue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val appnetwork = BasicNetwork(HurlStack())
        val appcache = DiskBasedCache(cacheDir, 1024 * 1024) // 1MB cap
        requestQueue = RequestQueue(appcache, appnetwork).apply {
            start()
        }


        search.setOnClickListener {
            var input = userinput.text.toString()
            fetchData(input)
        }


    }

    fun fetchData( input: String){
        val url = "http://www.omdbapi.com/?t=${input}&apikey=cebd9b53"
        val jsonObjectRequest = JsonObjectRequest(Request.Method.GET, url, null,
            { response ->
             if(response.get("Response")=="False"){
                 name.text = "Incorrect detail"
             }else {
                 Glide.with(this).load(response.getString("Poster")).into(image)
                 plot.text = response.getString("Plot")
                 name.text = response.getString("Title")+"\n\n"+"Writer: "+response.getString("Writer")
             }
            },
            { error ->
                Log.d("vol",error.toString())
            }
        )

        requestQueue.add(jsonObjectRequest)
    }
}
```

> Kindly note that before testing the application, we need to grant it access to the internet. We should also allow the application to use cleartext traffic. This step is essential, especially if the API source does not have an SSL certificate.

To allow these permissions, open the manifest file. Add the following statement immediately after ` package="your-package-name">`.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

In the same file, scroll to the application section and add `android:usesCleartextTraffic="true"`.

We can now compile and run the application on our phones.

![App Gif](/engineering-education/how-to-consume-data-from-an-api-in-android/app.gif)

### Conclusion
From the above tutorial, we have learned:

- How to review APIs.
- How to modify urls.
- How to make API requests.

You can, therefore, use this knowledge to develop more complex applications.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
