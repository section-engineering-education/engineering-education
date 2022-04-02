---
layout: engineering-education
status: publish
published: true
url: /comparing-okios-okhttp3-and-retrofit-in-performing-network-calls/
title: Understanding Okhttp3 and Retrofit in Android
description: This article will help readers understand Retrofit and the okhttp3 library when it comes to conducting network calls in Android.
author: vivian-odhiambo
date: 2022-03-31T00:00:00-04:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/comparing-okios-okhttp3-and-retrofit-in-performing-network-calls/hero.png
    alt: Okhttp3 vs Retrofit in Android Hero Image
---
When designing an Android application, it is vital to understand how to send and manage network requests. Determining the frameworks to use is also critical. 
<!--more-->
Network calls are frequently used to retrieve or change API data/media from a server. This is a typical task in Android development, especially for clients who use dynamic data.

### Understanding Okio's okhttp3 and retrofit
Okio-okhttp3 is a library that works in conjunction with *java.io* and *java.nio* to make data access, storage, and processing considerably easier. It started as a component of *OkHttp*.

Retrofit is a type-safe REST client for Java and Android application development. It consists of interfaces, classes, and methods that provide the required functionalities.

JSON or XML data may be parsed and converted to POJOs (Plain Old Java Objects) using the Retrofit library.

Okio is a simple and fast Android networking library suitable for complex challenges.

### Prerequisites
To follow along with this article, you need to:
- Have a basic understanding of Android programming
- Understand the basics of the Kotlin programming language
- Have basic knowledge of view binding

### Goals
This article primarily compares Okio's okhttp3 library and Retrofit in terms of conducting network calls. 

It also highlights the benefits and drawbacks of both libraries, which library is the best to use, and how both are implemented in Android.

### Advantages of Okio's okhttp3 library
- It is based on `byte string` and `buffers`, which compact a lot of functionality into a simple API. This saves both the processing power and memory.

- Okio features stream types called `bufferSource` and `buffersink` - which operate as `inputStream` and `outputStream` respectively.

- It is simple to construct, use, and test using the two streams.

### Disadvantages of Okio's okhttp3 library
- Processing data may be slow because there is no direct communication with the webserver when making network calls.
- Request cancellation is not supported by the Okio library.
- It cannot handle both synchronous and asynchronous network requests at the same time.

### Advantages of Retrofit library
- In comparison to other network libraries, it is extremely fast.
- It has direct access to the web service and can communicate with it.
- It is simple to use and understand.
- It has the option to make a cancellation request.
- It can handle both post requests and multipart uploads.

### Disadvantages of Retrofit library
- Retrofit is not able to load images. Other libraries, such as Glide and Picasso, are required.
- Retrofit does not support prioritization.

### Which library is the best to use
When comparing the performance of okio's okhttp3 and retrofit in performing network calls, Retrofit would be considered the best. 

This is because retrofit is fast, can communicate directly with the server. This means that no intermediate code is required to convert data from the server to a form that can be understood. 

It also supports request cancellation, which is not available in okio's okhttp3.

Let's get coding!

### Step 1 - Create a new project
To make a new project, go to *File > New*, then *New Project*, and select *Empty activity*. 

Give the project a descriptive name and select *Kotlin* as the preferred programming language.

![New project](/engineering-education/comparing-okios-okhttp3-and-retrofit-in-performing-network-calls/new-project.png)

### Step 2 - Adding necessary dependencies
#### Okio's okhttp3 dependency
Include these dependencies to your app-level `build.gradle` file to set up the project:

```bash
// Okio/Okhttp3 library
implementation 'com.squareup.okhttp3:okhttp:4.9.1'
```

#### Retrofit dependency

```bash
// Retrofit
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

### Step 3 - Creating the user interface
Setting up the region where network data is displayed is crucial. In this example, we'll use a *Textview* to hold the required data and two buttons.

One button will fetch the data using retrofit while the other will use okio's okhttp library.

Below is how the user interface is implemented:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textViewok"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        android:textSize="24sp"
        android:text="Text to be fetched from internet"
        android:textAlignment="center"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/btnRetrofit"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="32dp"
        android:layout_marginEnd="8dp"
        android:text="Load with retrofit"
        android:textAllCaps="false"
        app:layout_constraintEnd_toStartOf="@+id/btnOkhttp3"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textViewok" />

    <Button
        android:id="@+id/btnOkhttp3"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        android:text="Load with okhttp3"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/btnRetrofit"
        app:layout_constraintTop_toTopOf="@+id/btnRetrofit" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

![user interface](/engineering-education/comparing-okios-okhttp3-and-retrofit-in-performing-network-calls/user-interface.png)

> Ensure you add the internet permissions in the manifest, otherwise, the application will crash.

### Step 4 - Setting up the project
#### Retrofit
To provide certain services, we'll require the following classes to set up retrofit:

- **Model**

The Model class is used to illustrate the data format and how it can be transferred to the current user interface. For this case, the model class is as shown below:

```kotlin
data class Dog(
    Val message: String?,
    Val status: String?
)
```

- **Constants**

This class only contains constant values that will not change throughout the program, it is implemented as shown below:

```kotlin
object Constants {
    const Val BASE_URL = "https://dog.ceo/api/breeds/"
}
```

- **ApiService**

Api service is a method-based interface that calls data based on the endpoint of the URL provided. The API service used is as shown below:

```kotlin
interface ApiService {
    @GET("image/random")
    fun getRandomDog() : Call<Dog>
}
```

- **Retrofit Class**

This is a class that uses Retrofit to make network calls based on the data from the predefined API service. 

The *base url* and the *converter factory*, which translates the data appropriately, are required for Retrofit.

This is an object class, as indicated below:

```kotlin
object DogApi {
    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val apiService by lazy {
        retrofit.create(ApiService::class.java)
    }

}
```

#### Okhttp3
To use this library to make network calls, first, create an instance of `OkhttpClient()`, then declare and initialize a *url* variable with the url to be used. 

Finally, create an instance of `Request builder()` to set the provided url:

```kotlin
 val client = OkHttpClient()
        val url = "https://dog.ceo/api/breeds/image/random"
        val request = Request.Builder()
            .url(url)
            .build()
```

### Step 5 - Performing network calls
#### Retrofit
Add an *on-click* listener to the button then access the API service and retrieve the method within the API service using the Retrofit object class.

The callback is alerted of its response or even if an error occurred by communicating to the server using the *enqueue* method.

Data is assigned to the *Textview* when there is a response. However, when there is an error, a message is logged:

```kotlin
 binding.btnRetrofit.setOnClickListener {
           DogApi.apiService.getRandomDog().enqueue(object: Callback<Dog> {
               override fun onResponse(call: Call<Dog>, response: Response<Dog>) {
                   binding.textViewok.text = response.body().toString()
               }

               override fun onFailure(call: Call<Dog>, t: Throwable) {
                   Log.d(TAG, "onFailure: ${t.message}")
               }

           })
       }
```

#### Okio's Okhttp3
Add an `onClickListener()` to `btnOkhttp3`, using the client instance that we have already created in the previous step. 

Next, access the `newcall()` method that would require a request to be passed. Use the *enqueue* method to obtain callback responses or errors.

`onResponse()` checks whether the response is successful. If it is successful, it converts the response to a readable form. 

Okio's okhttp3 would need the data to be set to a *Textview*, but this happens within a `uiThread`. `OnError()` logs the error message:

```kotlin
binding.btnOkhttp3.setOnClickListener {

            client.newCall(request).enqueue(object: okhttp3.Callback{
                override fun onFailure(call: okhttp3.Call, e: IOException) {
                    Log.d(TAG, "onFailure: ${e.message}")
                }

                override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                    if (response.isSuccessful){
                        //converts data to a readable form
                        val jsonData: ResponseBody? = response.body
                        val result = JSONObject(jsonData?.string())

                        //setting data to the ui thread
                        runOnUiThread {
                            binding.textViewok.text = result.toString()
                        }
                    }
                }

            })
        }
```

### Factor to consider when choosing a networking library
#### Speed
Retrofit is faster than Okio's okhttp3 when it comes to designing an Android application that requires fast network calls.

#### Storage
Because Okio's okhttp3 uses less CPU and memory, it is the best option to consider.

#### Type of network call
When you need to make both synchronous and asynchronous network calls in one application, use the Retrofit library.

This is because it supports both synchronous and asynchronous network calls at the same time.

### Conclusion
In this tutorial, we have discussed the differences between Okio's okhttp3 library and Retrofit library in performing network calls. 

We also highlighted the advantages and disadvantages of both libraries, as well as factors to consider when choosing a network call.

You can download the full code from this GitHub [Repository](https://github.com/nia-vee/Okhttp3-Retrofit-Demo).

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)