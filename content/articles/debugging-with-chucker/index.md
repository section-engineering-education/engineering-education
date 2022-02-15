Working with OkHttp to perform network calls is always easy but the problem comes when you want to debug and see if the task is successful or not. Chucker becomes very helpful when you want to debug when using the OkHttp library. [Chucker](https://github.com/ChuckerTeam/chucker) is a very simple to integrate android debugging library unlike [Timber](https://www.section.io/engineering-education/planting-timber-logs-the-right-way/) and [Stetho](http://facebook.github.io/stetho/).

You might be wondering what debugging is in Android development. Debugging can be defined as the process of analyzing a code of a program to detect and remove potential errors that might cause your app to crash. 

 ### Table of contents
 - [Prerequisites](#prerequisites)
 - [What is Chucker](#what-is-chucker)
 - [What is OkHttp](#what-is-okhttp)
 - [Getting Started](#getting-started)
 - [Adding Dependencies](#adding-dependencies)
 - [Features of Chucker Library](#features-of-chucker-library)
 - [Configuring Chucker](#configuring-chucker)
 - [Conclussion](#conclussion)

 ### Prerequisites
  To follow through this tutorial, you must have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your computer.
- The basics of using [Kotlin](https://kotlinlang.org/) programming language.
- Basic knowledge of Kotlin [Coroutines](https://developer.android.com/kotlin/coroutines).

### What is Chucker
Chucker is an open-source Android debugging library produced and is being maintained by the Chucker team. It is used to simplify the inspection of HTTP(S) requests that are fired by your Android application. It works as an OkHttp interceptor by providing a user interface for inspecting and sharing the OkHttp events inside your application.

When you integrate your app with Chucker, your app will display a push notification displaying a summary of HTTP activities that are in progress. 

[notification](/engineering-education/debugging-with-chucker/chucker-notification.jpg)

When you tap on the notification, a complete UI of Chucker launches.
 
[chucker ui](/engineering-education/debugging-with-chucker/chucker-ui.png)

You can suppress the notification from showing and launch the Chucker UI directly from within their interface. This is because when installing/building your app in Android studio, Chucker 'app' is installed alongside yours.

### What is OkHttp
OkHttp is built on top of HTTP. We can define HTTP as the protocol that governs how modern applications communicate over a network. It can either be via a secured channel(HTTPS) or an unsecured channel(HTTP).

Therefore, OkHttp can be defined as an open-source library used to send and receive HTTP-based network requests efficiently. For further reading on OkHttp, please refer [here](https://square.github.io/okhttp/)

### Getting Started

To get started with Chucker, open your Android Studio and create a new project. In this case, we will use a project with a simple UI having a `TextView` for displaying display the response from the internet.

### Adding Dependencies
In your app-level `build.gradle` file, add the following dependencies;

```gradle
    // Chucker
    debugImplementation "com.github.chuckerteam.chucker:library:3.5.2"
    releaseImplementation "com.github.chuckerteam.chucker:library-no-op:3.5.2"

    // define a BOM and its version
    implementation(platform("com.squareup.okhttp3:okhttp-bom:4.9.3"))

    // define any required OkHttp artifacts without version
    implementation 'com.squareup.okhttp3:okhttp'
    implementation 'com.squareup.okhttp3:logging-interceptor'

    //Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.5.2'
```
Chucker has two libraries i.e `com.github.chuckerteam.chucker:library` and `com.github.chuckerteam.chucker:library-no-op`. The latter is used to isolate Chucker from the release build. This means if you fail to add the second library, Chucker will still work but it will be present in your release build which is not encouraged due to some reasons that we shall discuss below.

Also, ensure Java 8 support is enabled by ensuring that the code below is present in your app-level `build.dradle` file inside the `android` block.

In the dependencies, we have added the OkHttp library because Chucker works with its interceptor. The Coroutines library is added because OkHttp involves network calls. Network calls should be done in the background thread since they take some time before the response is returned. This might block the main thread if done in the main thread.

Using Chucker is very simple because once you have added the library to your gradle file you will be ready to use it. We can then plug the `ChuckerInterceptor` into our OkHttp client.

```kotlin
// OkHttp client
val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(ChuckerInterceptor(this))
            .build()
```

This is enough to allow Chucker record all the HTTP tasks that are being done by your OkHttp client in your app.

### Features of Chucker Library
The following are the features of Chucker that makes it the best choice for debugging applications that use the Okhttp client:

- Chucker is very easy to integrate since it only requires you to add two lines of library codes in your `build.gradle` file.
- There is no customization needed when using Chucker.
- It is compatible with OkHTTP 4.
- Compatible with API level 21 and higher hence can support a wide range of Android devices.
- Ensures empty release artifact due to `library-no-op` library.
- It has support for the showing of images in the HTTP responses. 
- It has support custom decode of HTTP bodies. 

### Configuring Chucker 
With the instance of `ChuckerCollector`, you can customize Chucker according to your needs.
Use the following code snippet to create an instance of `ChuckerCollector`.

```kotlin
// Chucker Collector
val myChuckerCollector = ChuckerCollector(
    context = this,                 // Context on which you are
    showNotification = true,        // Boolean for showing Notification, set to true to show and false otherwise
    retentionPeriod = RetentionManager.Period.ONE_WEEK  // Period taken to retain the collected data, can be an hour, day or week
)
```
After creating the collector, we can then create the `ChuckerInterceptor` which we will plug into the `OkHttpClient` Builder.

In the final part, we will create our OkHttp request and make asynchronous network calls by creating a `Call` object using the `enqueue` method.

> Note: Remember to make the network calls inside a Coroutine scope.

```kotlin
val request = Request.Builder()
            .url("https://elephant-api.herokuapp.com/elephants/")
            .build()

        // OkHttp request should run in the Background thread hence Coroutines
        CoroutineScope(Dispatchers.IO).launch {

                        // To access the TextView, switch to the Main thread
                        CoroutineScope(Dispatchers.Main).launch {
                            binding.textView.text = myResponse
                        }
                    }
                }
            })
        }
```

Here is the full implementation of our `MainActivity.kt` class.

```kotlin

        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
       /* val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(ChuckerInterceptor(this))
            .build()*/

        // Chucker Collector
        val myChuckerCollector = ChuckerCollector(
            context = this,// Context on which you are
            showNotification = true, // Boolean for showing Notification
            retentionPeriod = RetentionManager.Period.ONE_WEEK // Period taken to retain the collected data
        )

        // OkHttp Client
        val client = OkHttpClient.Builder()
            .addInterceptor(myChuckerInterceptor)
            .build()

        // OkHttp network request
        val request = Request.Builder()
            .url("https://elephant-api.herokuapp.com/elephants/")
            .build()

        // OkHttp request should run in the Background thread
        CoroutineScope(Dispatchers.IO).launch {

            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    e.printStackTrace()
                }

                override fun onResponse(call: Call, response: Response) {
                    if (response.isSuccessful) {
                        val myResponse: String? = response.body?.string()

                        // To access the TextView, switch to the Main thread
                        CoroutineScope(Dispatchers.Main).launch {
                            binding.textView.text = myResponse
                        }
                    }
                }
            })
        }
    }
}
```
[demo project](/engineering-education/debugging-with-chucker/chucker-demo.gif)

### Conclussion
In this tutorial, we learned how to use Chucker when debugging. You can read further on mapping the JSON response to Kotlin objects using [Gson](https://github.com/google/gson) library. Chucker is very simple to use and very efficient in debugging when performing network calls with OkHttp Client just as we have seen above. Don't forget to look at the other debugging libraries like Timber and Stetho because they are also very useful in certain scenarios.

Happy Coding!
