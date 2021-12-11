[Ktor](https://ktor.io/) is a server-side framework that helps us build applications in Kotlin. It is a modern asynchronous framework built on top of Kotlin coroutines. It is not only a back-end framework with but also a client, like a network library such as [OkHttp](https://square.github.io/okhttp/) and [Retrofit](https://square.github.io/retrofit/). We can use it to make network requests HTTP requests to an API to get the response back to an application. Adding networking capabilities to an application developed with a traditional UI toolkit or Jetpack Compose is straightforward with the [Ktor client](https://ktor.io/docs/getting-started-ktor-client.html).

One of the closest relatives of Ktor is Retrofit, which is also used to consume and API data in android. Retrofit is a java based android library. It can only be used to develop android based applications. However, it can also be used to create IOS applications. Nevertheless, the Retrofit implementation in these cross platforms remains different.

On the other hand, Ktor is an asynchronous HTTP client that runs on several platforms. Ktor client is designed on various platforms, such as Android, Native (iOS and desktop), JVM, and JavaScript. Ktor is designed on Kotlin multi-platform mobile (KMM). This means you can create both iOS and Android applications with Kotlin and share a huge part of Kotlin code for both platforms.

The Kotlin multi-platform mobile uses Kotlin as the base code. This means you have to use the Kotlin libraries if you want to share these codes across android and iOS. Ktor client is a Kotlin based library, thus making it easier to implement the KMM principles.

### Goal
This guide will help you learn more about Ktor. We will set up Ktor client to make HTTP Requests to a JSON API and display the data response using android studio and Jetpack Compose UI. We will use Jetpack Compose to set up composables. This will allow us to have lesser boilerplate codes while using the Ktor HTTP client. This streamlines and speeds Android UI development.

We will process requests and responses for [this product's JSON data](https://fakestoreapi.com/products) and show the results to the android back-end.

### Prerequisites
To follow along with this tutorial, the following requirements will be essential.

- Have Android Studio installed on your computer. You should also be familiar with how to use the Android Studio.
- Have prior knowledge of working and writing Kotlin based code.
- Basic updating of how to use the Jetpack Compose

### Setting up a Jetpack Compose android project
To use [Jetpack Compose](https://developer.android.com/jetpack/compose), you need to create a project that has a Jetpack Compose toolkit. To do this, navigate to your android studio and create a new project. Select the Empty Jetpack Compose boilerplate.

![compose-activity](/engineering-education/http-requests-with-ktor-client-in-android-jetpack-compose/compose-activity.png)

Once this new project is ready, open your `Androidmanifast.xml` and add internet permission as shown below;

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

This app use API that has data hosted online. The android application needs this permission to access a server and process the API to access the data.

### Adding libraries
Let's now add all the necessary libraries that we need to process and display this data. So we need the following libraries;

- Add the Ktor dependencies.

Ktor has a number of libraries that you can see depending on you processing your API data. In this app, we will use the libraries below;

```kotlin
//Ktor dependencies
def ktor_version = '1.6.4'
implementation "io.ktor:ktor-client-core:$ktor_version"

// HTTP engine => Android The HTTP client used to perform network requests.

implementation "io.ktor:ktor-client-android:$ktor_version"

// Serialization: Processing request and response payloads as JSON and serializing them from/to your data models, using Kotlinx Serialization

implementation "io.ktor:ktor-client-serialization:$ktor_version"

// logging
implementation "io.ktor:ktor-client-logging:$ktor_version"
```

To use Ktor, you first need to add the Ktor core dependency. Then add other dependencies such as the HTTP client engine dependency for processing and performing network requests. Since we are building on android, we are adding android specific functionality. For iOS, we would use an iOS dependency.

`implementation "io.ktor:ktor-client-okhttp:$ktorVersion"` can still provide the same HTTP engine to process the network requests.

We are also adding the Ktor serialization dependency. This will Process request and response payloads as JSON and serialize them from/to your data models, using `kotlinx` Serialization.

You can also add the Ktor logging dependency. This will log everything the Ktor client does. This will help you debug your client and network requests whenever something is not working right. It will always print the requests and responses in the console.

- Add the Kotlinx serialization dependency

We have set the Ktor serialization dependencies to serialize our data. This will allow us to post JSON data to an API or get JSON data from a response into a data class in Kotlinx.

Thus we will use the Kotlinx serialization plugin to serialize and deserialize JSON data.

```kotlin
def serialization_version = '1.3.0'
implementation "org.jetbrains.kotlinx:kotlinx-serialization-json:$serialization_version"
```

We also need to apply these plugins in your `app.gradle` file plugin scaffold.

```kotlin
plugins {
    id 'org.jetbrains.kotlin.plugin.serialization'
}
```

- Add Coil image dependency

[Coil](https://coil-kt.github.io/coil/) Fast, lightweight, and easy to use image loading dependency android backed by Kotlin Coroutines. The data we are using has image URLs. To load these images and show them to our application using Ktor, we need an additional library to parse and load the responses with image URLs.

```kotlin
//Coil Image
implementation "io.coil-kt:coil-compose:1.4.0"
```

- Set up the `build.gradle` project file

To use the above Kotlinx plugin, we need to set up a classpath so that android can find this plugin and use it. So add the following dependency in your `build.gradle` project file.

```kotlin
classpath "org.jetbrains.kotlin:kotlin-serialization:1.5.21"
```

Once the above processes are complete, click `sync now` to download and set up the dependencies and jump into structuring our client app.

### Setting up data models
A model is a data transfer object. It has data classes that represent what we get from an API. We will then process this returned data and show them in Jetpack Compose composable. To set up this data transfer object, create a `Models` package. Create a new Kotlin data class inside this package and name it `ResponseModel`. Here we will represent the data that we want to get from [this API](https://fakestoreapi.com/products).

In this application, we will only get the product's `title`, `body`, and the `image` URL.

Here is how the `ResponseModel` will look like. This will represent the data that is coming from the server.

```kotlin
@Serializable
data class ResponseModel(
    val title: String,
    val description: String,
    val image: String
)
```

Note that we are denoting this class as serializable using `@Serializable`. With that, the serialization Kotlin plugin knows that we want to serialize this class.

Create another data class file in your `Models` package and name it `RequestModel`. This will represent the request data that we want to send to the server.

```kotlin
@Serializable
data class RequestModel(
    val title: String,
    val description: String,
    val image: String
)
```

### Setup the API endpoint
We need to specify the endpoint where this data is coming from. This is just a basic URL that will help us access this JSON data. Go ahead and create a `Network` package. Create a new Kotlin Object file inside this package and name it `ApiRoutes`. This is how we will set out the API endpoint.

```kotlin
object ApiRoutes {

    private const val BASE_URL = "https://fakestoreapi.com"
    const val PRODUCTS = "$BASE_URL/products"
}
```

Here we have a basic domain that hosts this data. We then map this domain to the path where this data is hosted in `/products`.

### Processing the API data
Let's create functions that will now help us process this data so that android can access it and then display the content with Jetpack Compose. Head over to the `Network` package and create a new Kotlin interface, name it `ApiService`, as shown in the code block below.

```kotlin

interface ApiService {

    suspend fun getProducts(): List<ResponseModel>

    suspend fun createProducts(productRequest: RequestModel): ResponseModel?

    companion object {
        fun create(): ApiService {
            return ApiServiceImpl(
                client = HttpClient(Android) {
                    // Logging
                    install(Logging) {
                        level = LogLevel.ALL
                    }
                    // Json
                    install(JsonFeature) {
                        serializer = KotlinxSerializer(json)
                       //or serializer = KotlinxSerializer()
                    }
                    // Timeout
                    install(HttpTimeout) {
                        requestTimeoutMillis = 15000L
                        connectTimeoutMillis = 15000L
                        socketTimeoutMillis = 15000L
                    }
                    // Apply to All Requests
                    defaultRequest {
                        // parameter("api_key", "some_api_key")
                        // Content Type
                        if (method != HttpMethod.Get) contentType(ContentType.Application.Json)
                        accept(ContentType.Application.Json)
                    }
                }
            )
        }

        private val json = kotlinx.serialization.json.Json {
            ignoreUnknownKeys = true
            isLenient = true
            encodeDefaults = false
        }
    }
}
```

Here we are creating two functions, `getProducts()` to return the list of products and `createProducts()` to create a product. So we send a data request to the server and then respond that the `createProducts()` function will return.

We then create an instance of an HTTP client that defines basic information and features about the Ktor client. For example, we are setting the Ktor logging feature. This logs all the Ktor requests and responses that help you while debugging your application. We add the `KotlinxSerializer` to serialize and deserialize the returned JSON data. Also, if the server took a long time to respond, we add `HttpTimeout` that defines the time the server takes to receive a Request, connect to the server timeout, and Socket (read and write) timeout.

Now we need to implement the actual network call using the Ktor client. Create a new `ApiServiceImpl` Kotlin class (call it `ApiServiceImpl`) inside the `Network` package, as shown below.

```kotlin
class ApiServiceImpl(
    private val client: HttpClient
) : ApiService {

    override suspend fun getProducts(): List<ResponseModel> {
        return try {
            client.get { url(ApiRoutes.PRODUCTS) }
        } catch (ex: RedirectResponseException) {
            //3xx - responses
            println("Error: ${ex.response.status.description}")
            emptyList()
        } catch (ex: ClientRequestException) {
            //4xx - responses
            println("Error: ${ex.response.status.description}")
            emptyList()
        } catch (ex: ServerResponseException) {
            //5xx - response
            println("Error: ${ex.response.status.description}")
            emptyList()
        }
    }

    override suspend fun createProducts(productRequest: RequestModel): ResponseModel? {
        return try {

            client.post<ResponseModel> {
                url(ApiRoutes.PRODUCTS)
                body = productRequest
            }
        } catch (ex: RedirectResponseException) {
            //3xx - responses
            println("Error: ${ex.response.status.description}")
            null
        } catch (ex: ClientRequestException) {
            //4xx - responses
            println("Error: ${ex.response.status.description}")
            null
        } catch (ex: ServerResponseException) {
            //5xx - response
            println("Error: ${ex.response.status.description}")
            null
        }
    }
}
```

The above two methods `createProducts()` and `getProducts()` are injected constructors. We are using the `private val client: HttpClientobject` to make network calls to get the list of products from the API endpoint. This sends an asynchronous client to perform HTTP requests that use the Ktor `HttpClientEngine`. In each case, we specify the response type, i.e., `get` and `post`, to send requests and post responses to and from the server.

We are performing this request to a server. Likewise, we are getting data responses from the server. This means a bad request/something that went wrong will make Ktor throw an exception. Thus, we need to handle and catch any exceptions such as Unhandled redirect exceptions, Server error exceptions, and Bad client request exceptions.

### Adding Jetpack Compose UI
We have the data instance ready, we have processed all the requests and responses to the API server. Now we need to populate this returned data into some Jetpack Compose components.

Typically to display a large number of items in an android application, you would set up a Recycler View adapter. With Jetpack Compose, you don't need to set up this adapter since you won't use any XML UIs. Jetpack Compose allows you to use `LazyColumn` that replaces the typical Recycler View adapter. You don't even need a View holder class since Jetpack Compose allows you to achieve the same thing we just a few lines of code. Check this guide to learn more about the [Jetpack Compose LazyColumn](/engineering-education/building-scrollable-and-lazy-components-in-jetpack-compose/)

Let's see how we can set up this list of products using the Jetpack Compose `LazyColumn`. `LazyColumn` allows you to display list items in a vertical orientation. And if you want to achieve the horizontal orientation, you use `LazyRow`.

First, we need to access our client data. Just above the `onCreate()`, add our API data as shown below;

```kotlin
private val apiService by lazy {
    ApiService.create()
}
```

This will create a new instance of the Lazy that uses the specified initialization function initializer and the default thread-safety mode `LazyThreadSafetyMode.SYNCHRONIZED`.

Create an empty `initialValue` that returns an observable snapshot State that produces values over time without a defined data source. This will allow the client to access the data source asynchronously as data is being populated to the set Jetpack Compose states. Also, we will add a `producer` that returns the values of the defined data source. Add the following code block inside the application Theme block.

```kotlin
val products = produceState(
    initialValue = emptyList<ResponseModel>(),
    producer = {
        value = apiService.getProducts()
        }
)
```

Let's now set up the `LazyColumn`. We will do this inside the `Surface{}`.

```kotlin
LazyColumn {
    items(products.value) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(
                    bottom = 6.dp,
                    top = 6.dp,
                )
                .background(Color.Gray)) {

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(4.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                //set the image url
                val painter = rememberImagePainter(
                    data = it.image,
                    builder = {
                        error(R.drawable.ic_launcher_background)
                    }
                )

                Image(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(150.dp),
                    contentScale = ContentScale.Crop,
                    contentDescription = "Coil Image",
                    painter = painter
                )
                Spacer(
                    modifier = Modifier
                        .height(4.dp)
                )
                Text(
                    text = it.title,
                    fontSize = 18.sp
                )
                Spacer(
                    modifier = Modifier
                        .height(4.dp)
                )
                Text (
                    text = it.description,
                    fontSize = 12.sp
                )
            }
        }
    }
}
```

This column represents an actual Recycler View. Here we are using the Jetpack Compose to populate the data to a cleaned and minimalist UI with less code.

We are wrapping each item in a `Box` that has three properties, the `Image` and two `Text` blocks.

First, we will process the returned data and get the value of the `image`. The returned string is a URL that loads an image from the server. To load these images, we are using a Coil image loader. Here we set the image URL, pass the parameter `data` and assign it the value of the returned image URL. This will launch an image request. If return `true`, we proceed with the request and load the image into the Image view using the Painter. This will create a composable that lays out and draws a given Painter. This will attempt to size the composable according to the Painter's intrinsic size and the `Modifier` parameters.

If it returns `false`, we skip executing the request and builder an optional lambda) configure the request, and set an error drawable resources. The Text composable will load the values of product `title` and `description`.

The app is now ready, and you can run it to test if everything works as expected.

![ktor-client](/engineering-education/http-requests-with-ktor-client-in-android-jetpack-compose/ktor-client.png)

### Conclusion
Ktor is used for HTTP requests such as get, post, delete, and update. Ktor is a straightforward, easy-to-use framework language that is entirely built on coroutines. It enables asynchronous programming with minimal boilerplate code.

In this guide, we have learned how we can use the Ktor client and perform HTTP requests. We have used the turned response and displayed the whole list of data using the Jetpack Compose and processed the image responses using Coil. I hope you found these combinations exciting and easy to understand.