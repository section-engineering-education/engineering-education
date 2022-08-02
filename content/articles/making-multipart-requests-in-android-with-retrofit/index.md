---
layout: engineering-education
status: publish
published: true
url: /making-multipart-requests-in-android-with-retrofit/
title: How to Make Multipart Requests in Android with Retrofit
description: This tutorial will help the reader understand how to make a multipart request in Android using Kotlin and Retrofit.
author: esther-wanjiru
date: 2022-06-15T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/making-multipart-requests-in-android-with-retrofit/hero.jpg
  alt: How to make Multipart Requests in Android with Retrofit Hero Image
---
A multipart request is an HTTP request that HTTP clients create to send files and data to an HTTP server.
<!--more-->
A multipart message is made up of several parts. One part consists of a header and a body. The body can be any type of media and can contain text or binary data. A multipart media type can be included in a part.

Retrofit supports requests that are in parts. In this tutorial, we will make a basic multipart request to a *Ktor* backend that accepts user profiles. 

### Prerequisites
To follow along with this tutorial, the reader will need:
- A solid understanding of how to create and run Android apps.
- Android Studio installed.
- Some basic knowledge of the Kotlin programming language.
- How to use Retrofit to make network requests. 

### What is a multipart request
MIME, an Internet standard that extends the format of emails, is the source of multipart. Multipart requests combine one or more sets of data into a single, boundary-separated body. 

These requests are typically used for file uploads and transferring multiple types of data in a single request (for example, a file along with a JSON object). A multipart request is an HTTP request that HTTP clients create to send files and data to an HTTP server. Browsers and HTTP clients frequently use it to upload files to the server. 

### Getting started
In this tutorial, we will try and simulate how a user registers in an app. A user usually selects a profile image and enters some details to register. This data is then uploaded to a server where the user is authenticated.

This is what a multipart request looks like when you create it on a Ktor backend:

```kotlin
fun Route.registerAccount(
    userService: UserService
) {
    val gson by inject<Gson>()
    post("/api/user/create") {
        val multiPart = call.receiveMultipart()
        var createUserRequest: CreateUserRequest? = null
        var fileName: String? = null
        multiPart.forEachPart { partData ->
            when (partData) {
                is PartData.FormItem -> {
                    if (partData.name == "user_data") {
                        createUserRequest = gson.fromJson(partData.value, CreateUserRequest::class.java)
                    }
                }

                is PartData.FileItem -> {
                    fileName = partData.save(Constants.USER_PICTURES_PATH)
                }

                is PartData.BinaryItem -> Unit
            }
        }

        val postPictureUrl = "${Constants.BASE_URL}profile_pictures/$fileName"

        createUserRequest?.let { request ->
            val createUserAcknowledged = userService.createUser(
                imageUrl = userPictureUrl,
                request = request
            )

            if (createUserAcknowledged) {
                call.respond(
                    HttpStatusCode.OK,
                    BasicApiResponse<Unit>(
                        successful = true
                    )
                )
            } else {
                File("${Constants.USER_PICTURES_PATH}/${fileName}").delete()
                call.respond(
                    HttpStatusCode.InternalServerError
                )
            }

        } ?: kotlin.run {
            call.respond(HttpStatusCode.BadRequest)
            return@post
        }
    }
}
```

PartData which represents form-data entry which could be:
- FormItem: Represents a multipart form item e.g user input data.
- FileItem: Represents a file content e.g a picture, document, etc.
- BinaryItem: Represents a binary item.

### Step 1 - Creating the project
Open Android Studio and create an empty project as shown below: 

[!New Project](/engineering-education/making-multipart-requests-in-android-with-retrofit/new-project.png)

### Step 2 - Add necessary dependencies
In your `app-level` build.gradle file, add the following dependencies.

```kotlin
// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.2'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.5.2'

// Retrofit
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
implementation "com.squareup.okhttp3:okhttp:5.0.0-alpha.2"
implementation "com.squareup.okhttp3:logging-interceptor:5.0.0-alpha.2"

// Coil
implementation("io.coil-kt:coil-compose:1.4.0")
```

### Step 3 - Defining the multipart request
We will need to define the response that we are going to retrieve, as shown below:

```kotlin
data class BasicApiResponse<T>(
    val message: String? = null,
    val successful: Boolean,
    val data: T? = null
)
```

Then, in your `ApiService` file, define the following *POST* method:

```kotlin
@Multipart
@POST("/api/user/create")
suspend fun createUser(
    @Part userData: MultipartBody.Part,
    @Part profileImage: MultipartBody.Part
): BasicApiResponse<Unit>
```

The first part will take user registration details while the second part will fetch the profile image.

### Step 4 - Making the request
In your repository class, define the method to create a user object. It will take the image's `Uri` and user details.

```kotlin
    suspend fun createUser(
        email: String,
        name: String,
        phone: String,
        password: String,
        imageUri: Uri?
    ): SimpleResource {
        val request = CreateUserRequest(email, name, phone, password)
        val file = Uri.fromFile(
            File(
                context.cacheDir,
                context.contentResolver.getFileName(imageUri!!)
            )
        ).toFile()

        return try {
            val response = api.createUser(
                userData = MultipartBody.Part
                    .createFormData(
                        "user_data",
                        gson.toJson(request)
                    ),
                profileImage = MultipartBody.Part
                    .createFormData(
                        name = "profile_image",
                        filename = file.name,
                        body = file.asRequestBody()
                    )
            )

            if (response.successful) {
                Resource.Success(Unit)
            } else {
                response.message?.let { Resource.Error(it) } ?: Resource.Error("Unknown error")
            }

        } catch (e: IOException) {
            Resource.Error(
                message = "Oops! couldn't reach server, check your internet connection."
            )
        } catch (e: HttpException) {
            Resource.Error(
                message = "Oops! something went wrong. Please try again"
            )
        }
    }
```

### Step 5 - Viewmodel
In your `ViewModel`, create a wrapper method that calls the `createUser` method from the repository, passing all the required parameters.

```kotlin
fun register() {
    if (chosenImageUri.value == null) {
        Log.d("TAG", "register: No image picked, please pick an photo")
        return
    }

    if (emailState.value.isBlank() || nameState.value.isBlank() || phoneState.value.isBlank() || passwordState.value.isBlank()) {
        Log.d("TAG", "register: Fields cannot be blank")
        return
    }

    viewModelScope.launch { //launching a Couroutine scope
        _isLoading.value = true
        val result = repository.createUser(
            email = emailState.value,
            name = nameState.value,
            phone = phoneState.value,
            password = passwordState.value,
            imageUri = chosenImageUri.value
        )

        when (result) {
            is Resource.Success -> {
                Log.d("TAG", "register: Successfully created post")
            }
            is Resource.Error -> {
                Log.d("TAG", "register: ${result.message}")
            }
            else -> {}
        }
        _isLoading.value = false
    }
}
```

From here, create your screen and call the `ViewModel` `register` function, parsing the actual arguments.

### Conclusion
In this brief tutorial, we have learned what a multipart request is and what it looks like in a Ktor backend route. 

We also went ahead and created a multipart request to the route using the Retrofit library. Check out this GitHub repository for the full implementation of this tutorial.

- [MultipartRequestDemo](https://github.com/essy-shiro/MultipartRequestDemo)


Happy coding!

### Further reading 
- [Retrofit Documention](https://square.github.io/retrofit/2.x/retrofit/index.html?retrofit2/http/Part.html)


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)