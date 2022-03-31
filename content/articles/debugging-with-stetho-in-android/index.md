---
layout: engineering-education
status: publish
published: true
url: /debugging-with-stetho-in-android/
title: Debugging with Stetho in Android
description: This tutorial takes the reader through the process of debugging network calls in Android with Stetho.
author: anne-sogoli
date: 2022-03-24T00:00:00-09:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/debugging-with-stetho-in-android/hero.jpg
    alt: Debugging with Stetho in Android Hero Image
---
Debugging is one of the crucial processes in software development. Developers aim to find and remove bugs that make the app function abnormally.
<!--more-->
Debugging can be done in different parts of an Android application. In this tutorial, we will focus on debugging network calls with the [Stetho](https://github.com/facebook/stetho) debugging library.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [What is Stetho?](#what-is-stetho)
- [Step 1 - Creating a new project](#step-1---creating-a-new-project)
- [Step 2 - Adding the necessary dependencies](#step-2---adding-the-necessary-dependencies)
  - [Uses of the libraries](#uses-of-the-libraries)
- [Step 3 - Initializing Stetho](#step-3---initializing-stetho)
- [Step 4 - Creating the user interface](#step-4---creating-the-user-interface)
- [Step 5 - Response data class](#step-5---response-data-class)
- [Step 6 - Creating an API interface](#step-6---creating-an-api-interface)
- [Step 7 - Initializing Retrofit and Stetho](#step-7---initializing-retrofit-and-stetho)
  - [Creating the interceptor](#creating-the-interceptor)
- [Step 8 - Making the API call](#step-8---making-the-api-call)
- [Step 9 - Debugging with Stetho](#step-9---debugging-with-stetho)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need:
- Android Studio installed on your machine.
- Knowledge of creating and running Android applications.
- Fundamentals of the Kotlin programming language.
- Making network calls with Retrofit and using Coroutines.

### What is Stetho?
Stetho is an Android debugging library that allows developers to debug their apps with Chrome Dev tools. Stetho can be used to inspect Android SQLite database, but we are not going to do that in this tutorial because Android Studio nowadays comes with an integrated database inspector.

In this tutorial, we are going to create a simple Android app that makes a network call and fetches a random dog image. We will then use Stetho to debug the network calls made from the app.

> The BASE_URL will be - "https://dog.ceo/api/breeds/"
>
> The endpoint will be - "image/random"

### Step 1 - Creating a new project
Open your Android Studio and create a new empty project and give it a name of your choice.

![new-project](/engineering-education/debugging-with-stetho-in-android/new_project.png)

### Step 2 - Adding the necessary dependencies
Open your app-level `build.gradle` file and add the following dependencies:

```bash
//Stetho
implementation 'com.facebook.stetho:stetho:1.6.0'
implementation 'com.facebook.stetho:stetho-okhttp3:1.6.0'

// Retrofit
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.0'

// Glide
implementation 'com.github.bumptech.glide:glide:4.13.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.13.0'
```

#### Uses of the libraries
- Stetho - debugging network calls.
- Retrofit - will help us in making API calls.
- Coroutines - will help us in running the network call in a different light-weight thread.
- Glide - will help us in displaying the image fetched from the API.

### Step 3 - Initializing Stetho
To use Stetho in our project, we need to create a base application class and initialize Stetho. Inside `onCreate` function, call `initializeWithDefaults` and pass a `Context`.

```kotlin
class StethoApp : Application() {
    override fun onCreate() {
        super.onCreate()
        Stetho.initializeWithDefaults(this)
    }
}
```

Navigate to your `AndroidManifest` file and add the name of the base application class that we have just created, without this, our code won't work:

```xml
<uses-permission android:name="android.permission.INTERNET"/>

<application
    android:name=".StethoApp"
    ...
</application>
```

> Don't forget to include the internet permission.

### Step 4 - Creating the user interface
Create a simple layout with an `ImageView` to hold the fetched image, a `Button` to initiate the API call, and a `Progressbar` to indicate the progress of the network call as shown below:

![layout](/engineering-education/debugging-with-stetho-in-android/layout.png)

### Step 5 - Response data class
Create a new model class that will represent the response that we will receive:

```kotlin
data class RandomDogResponse(
    val message: String,
    val status: String
)
```

### Step 6 - Creating an API interface
Create an interface and define the method that will get images of dogs:

```kotlin
interface DogsApiService {
    @GET("image/random")
    suspend fun getRandomDog() : RandomDogResponse
}
```

### Step 7 - Initializing Retrofit and Stetho
Create a new object class where we will initialize Retrofit and Stetho:

```kotlin
object DogsApi {
    const val BASE_URL = "https://dog.ceo/api/breeds/"
    ...
}
```

#### Creating the interceptor
Let's define a client and add the `StethoInterceptor` network interceptor:

```kotlin
private val okHttpClient = OkHttpClient.Builder()
    .addNetworkInterceptor(StethoInterceptor())
    .build()
```

We need to create a Retrofit instance and pass `okHttpClient` as the client:

```kotlin
private val retrofit = Retrofit.Builder()
    .baseUrl(BASE_URL)
    .addConverterFactory(GsonConverterFactory.create())
    .client(okHttpClient)
    .build()
```

Finally, lazily create an instance of the API service:

```kotlin
val dogsApi: DogsApiService by lazy {
    retrofit.create(DogsApiService::class.java)
}
```

Your whole object class implementation should be similar to this:

```kotlin
object DogsApi {
    const val BASE_URL = "https://dog.ceo/api/breeds/"

    private val okHttpClient = OkHttpClient.Builder()
        .addNetworkInterceptor(StethoInterceptor())
        .build()
    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .client(okHttpClient)
        .build()
    val dogsApi: DogsApiService by lazy {
        retrofit.create(DogsApiService::class.java)
    }
}
```

### Step 8 - Making the API call
Navigate to your `MainActivity.kt` file and add the following code that will initiate the API call and display the image fetched from the API:

```kotlin
binding.buttonGet.setOnClickListener {
    binding.progressBar.isVisible = true
    CoroutineScope(Dispatchers.Main).launch {
        try {
            val result = DogsApi.dogsApi.getRandomDog()
            binding.progressBar.isVisible = false
            Glide.with(binding.dogImageView)
                .load(result.message)
                .placeholder(R.drawable.image_placeholder)
                .into(binding.dogImageView)
        } catch (e: Exception) {
            binding.progressBar.isVisible = false
        }
    }
}
```

### Step 9 - Debugging with Stetho
Since the newer version of Chrome browser crashes when using Chrome devTools to debug with Stetho, you may need to downgrade the version of your Google Chrome browser, otherwise, you can opt to use another browser such as Brave or Microsoft Edge.

> Ensure your device (Emulator or physical device) is up and connected and that the app that we need to debug is open.

Launch the browser and type:
- `chrome://inspect/#devices` - if you are using an older version of Google chrome on your machine.
- `edge://inspect/#devices` - for Microsoft edge
- `brave://inspect/#devices` - for Brave browser

![browser](/engineering-education/debugging-with-stetho-in-android/browser.png)

Click on inspect:

![inspect](/engineering-education/debugging-with-stetho-in-android/inspect.png)

You should be able to see the devTool with the layout of your app and on the right side, there will be a panel where we can see the result of our network calls:

![devtool](/engineering-education/debugging-with-stetho-in-android/devtool.png)

On your app, click on the get random dog `Button` and observe the devTool:

![devtool-result](/engineering-education/debugging-with-stetho-in-android/devtool-result.png)

As you can see, the devTool lets you observe:
- The name of the endpoint that you called
- The status of the network call
- Type
- Initiator
- Size and duration of the network call

If you click on it, you will get more insights about the call i.e. you can see the:
- Headers of the response
- A preview of the response
- The actual response e.t.c.

![more-details](/engineering-education/debugging-with-stetho-in-android/more-details.png)

And that is all, with Stetho you can get more insights into your network calls from your Android app.

### Conclusion
In this tutorial, we have created a simple Android app that fetches a random dog image and displays it. We've gone ahead and integrated Stetho debugging library so that we can debug our network calls. Hope you have learned something. Go ahead and read more about this awesome library.

For a full implementation of the demo, you can visit this Github repository: [Debugging With Stetho Demo](https://github.com/anne-sogoli/DebuggingWithStetho)

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
