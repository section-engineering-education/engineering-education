### Debugging with Stetho in Android
Debugging is one of the crucial processes in development. Developers tend to find code that may be making the app crash and also remove bugs that may make the app function abnormally. Debugging can be done to different parts of an Android app but in this tutorial, we will focus on debugging network calls with the Stetho debugging library.

### Table of contents
- [Prerequisites](#prerequisites)
- [What is Stetho](#what-is-stetho)
- [Creating a new project](#step-1---creating-a-new-project)
- [Adding necessary dependencies](#step-2---adding-necessary-dependencies)
- [Initializing Stetho](#step-3---initializing-stetho)
- [Defining UI](#step-4---defining-ui)
- [Response data class](#step-5---response-data-class)
- [Creating an API interface](#step-6---creating-an-api-interface)
- [Using the StethoInterceptor](#step-7---using-the-stethoInterceptor)
- [Getting a dog](#step-8---getting-a-dog)
- [Debugging with Stetho](#step-9---debugging-with-stetho)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need:
- Android Studio installed.
- Knowledge of creating and running Android applications.
- Fundamentals of Kotlin.
- Making network calls with Retrofit and using Coroutines.

### What is Stetho
Stetho is an Android debug bridge that allows developers to debug their apps with Chrome Dev tools. You can use it to inspect your Android SQLite database but we are not going to do that because Android Studio nowadays comes with an Integrated database inspector.

In this tutorial, we are going to create a simple Android app that makes a network call and fetches a random dog image. We will then use Stetho to debug the network calls made from the app.

The BASE_URL will be - "https://dog.ceo/api/breeds/"
The endpoint will be - "image/random"

### Step 1 - Creating a new project
Open your Android Studio and create a new empty project and give it a name of your choice

![new-project](/engineering-education/debugging-with-stetho-in-android/new-project.png)

### Step 2 - Adding necessary dependencies
Open your app-level `build.gradle` and add the following dependencies

```gradle

//Stetho
implementation 'com.facebook.stetho:stetho:1.6.0'
implementation 'com.facebook.stetho:stetho-okhttp3:1.6.0'

// Retrofit
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.2'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.5.2'

// Glide
implementation 'com.github.bumptech.glide:glide:4.13.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.13.0'
```

#### Uses of the libraries
- Stetho - debugging network calls.
- Retrofit - will help us in making API calls.
- Coroutines - will help us in running the network call in a different thread.
- Glide - will help us in displaying the image of the fetched dog.

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

Go to your `AndroidManifest` and add the name of the class that we have just created, without this, our code won't work.

```manifest
<uses-permission android:name="android.permission.INTERNET"/>

<application
    android:name=".StethoApp"
    ...

</application>
```

> Don't forget to include your internet permissions.

### Step 4 - Defining UI
Create a simple layout with an `ImageView` to hold the fetched image, a `Button` to initiate the API call, and a `Progressbar` to indicate the progress of the network call.

![layout](/engineering-education/debugging-with-stetho-in-android/layout.png)


### Step 5 - Response data class
Create a new model class that will represent the response that we will receive.

```kotlin
data class RandomDogResponse(
    val message: String,
    val status: String
)
```

### Step 6 - Creating an API interface
Create an interface and define the method that will get images of dogs.

```kotlin
interface DogsApiService {
    @GET("image/random")
    suspend fun getRandomDog() : RandomDogResponse
}
```

### Step 7 - Using the StethoInterceptor
Create a new object class where we will initialize Retrofit and Stetho.

```kotlin
object DogsApi {
    const val BASE_URL = "https://dog.ceo/api/breeds/"
    ...
}
````

Now, let's define a client and add the `StethoInterceptor` network interceptor

```kotlin
private val okHttpClient = OkHttpClient.Builder()
    .addNetworkInterceptor(StethoInterceptor())
    .build()
````

We need to create an instance of Retrofit and pass our client.

```kotlin
private val retrofit = Retrofit.Builder()
    .baseUrl(BASE_URL)
    .addConverterFactory(GsonConverterFactory.create())
    .client(okHttpClient)
    .build()
````

Finally, let us lazily create an instance of our API service

```kotlin
val dogsApi: DogsApiService by lazy {
    retrofit.create(DogsApiService::class.java)
}
````

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

### Step 8 - Getting a dog
In your `MainActivity`, inside the click listener of the `Button`, that is where you will make the network call and add the image to the `ImageView` with Glide.

```kotlin
binding.buttonGet.setOnClickListener {
    binding.progressBar.isVisible = true
    CoroutineScope(Dispatchers.Main).launch {
        try {
            val result = DogsApi.dogsApi.getRandomDog()

            binding.progressBar.isVisible = false

            Glide
                .with(binding.dogImageView)
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
Now that the newer version of Chrome browser is broken when using Chrome devTools to debug with Stetho, you may need to downgrade the version of your Google Chrome browser, otherwise, you can pick and use another browser such as Brave or Microsoft Edge.

> Make sure your device is up and connected (Emulator or physical device) and also that the app that we need to debug is open.

Launch the browser and type : 
- `chrome://inspect/#devices` - if you are using an older version of Google chrome in your machine.
- `edge://inspect/#devices` - for Microsoft edge
- `brave://inspect/#devices` - for Brave browser

![browser](/engineering-education/debugging-with-stetho-in-android/browser.png)

Click on inspect

![inspect](/engineering-education/debugging-with-stetho-in-android/browser.png)

You should be able to see the devTool with the layout of your app and on the right side, there will be a panel where we can see the result of our network calls.

![devtool](/engineering-education/debugging-with-stetho-in-android/devtool.png)

On your app, click on the get random dog `Button` and observe the devTool.

![devtool-result](/engineering-education/debugging-with-stetho-in-android/devtool-result.png)

As you can see, the devTool lets you see:
- The name of the endpoint that you called
- The status of the network call
- Type
- Initiator
- Size
- Time 

If you click on it, you will get more insights about the call i.e. you call see the 
- Headers of the response
- A preview of the response
- The actual response
- And others

![more-details](/engineering-education/debugging-with-stetho-in-android/more-details.png)

And that is all, with Stetho you can get more insights into your network calls from your Android app.

### Conclusion
In this tutorial, we have created a simple Android app that fetches a random dog image and displays it. We went ahead and integrated Stetho debugging library so that we can debug our network calls. Hope you have learned something. Go ahead and read more about this awesome library. For a full implementation of the demo, you can visit this Github repository - [Debugging With Stetho Demo](https://github.com/anne-sogoli/DebuggingWithStetho)

Happy coding.
