---
layout: engineering-education
status: publish
published: true
url: /coroutines-and-realtime-database-in-firebase-authentication-in-android/
title: How to use Coroutines and Realtime Database For Firebase Authentication in Android
description: This tutorial will take the reader through the process of using Coroutines and Realtime Database for Firebase Authentication in Android.
author: joel-kanyi
date: 2021-12-20T00:00:00-05:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/coroutines-and-realtime-database-in-firebase-authentication-in-android/hero.png
    alt: Coroutines and Realtime Database in Firebase Authentication in Android
---
Firebase Authentication offers backend services, easy-to-use SDKs, and ready-to-use UI frameworks for authenticating users to your app. Firebase Realtime Database can be used to store the user details.
<!--more-->
Since most Android developers don't wish to write their own backends, all of this makes their job easier.

In Android, while making network calls such as user authentication, sending, or querying data from the Firebase database, you shouldn't perform such tasks on the `Main Thread`. You should do such tasks on the `Background Thread` then update the UI accordingly.

Our code appears cleaner with no boilerplate when we use `Coroutines` to do Firebase operations, making it more legible/clear, and improving app productivity in the long term.

### Table of contents
- [Prerequisites](#prerequisites)
- [Coroutines Recap](#coroutines-recap)
- [Create an Android Project](#step-1---create-an-android-project)
- [Setting Up the Project](#step-2---setting-up-the-project)
- [Main Screens](#step-3---main-screens)
- [Designing the User Interface](#step-4---designing-the-user-interface)
- [Creating the Model class](#step-5---creating-the-model-class)
- [Utility Items](#step-6---utility-items)
- [Repository Class](#step-7---repository-class)
- [ViewModel Class](#step-8---viewmodel-class)
- [Registering Activity](#step-9---registering-activity)
- [Login Activity](#step-10---login-activity)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, you will need the following:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your computer.
- A solid understanding of how to create and run Android apps.
- The [Kotlin](https://kotlinlang.org/) programming language's fundamentals.
- Basic knowledge of Kotlin Coroutines.
- Knowledge of using Jetpack Components i.e `Livedata`, `ViewModel` and the `Repository` pattern.
- An understanding of linking an Android project to Firebase: If not, take a look at this article [Firebase Email and Password Authentication](/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/).
- Understand how to use `ViewBinding`.

### Coroutines recap
Kotlin Coroutines manages long-running operations that if they are run on the main thread, they will block it.

In this article, we are going to use the following features of `Coroutines`:

- `withContext` - It uses a provided `Coroutine` context to call the specified suspending block, `suspends` until it completes, then returns the result. It executes the jobs sequentially rather than concurrently. Keep in mind that `withContext` is useful when you have a single job running in the background and wish to return to the task's outcome.

- `await` - While an operation is running, the `await` waits until it completes without necessary blocking the thread.

- `viewModelScope` - Defines a scope that is tied to the ViewModel. Once ViewModel is cleared, the scope will be cancelled.

> To get a more understanding of `Coroutines` check out this article - [Introduction to Kotlin Coroutines](/engineering-education/introduction-to-kotlin-coroutines/).

Let's get started. In this tutorial, we will be creating a simple app that has an authentication feature and stores the user's data in the `Firebase Realtime` database.

> Make sure you have linked your project with `Firebase` and you have enabled `ViewBinding`.

### Step 1 - Create an Android project
Open your Android Studio and create an empty project and give it the name of your choice.

### Step 2 - Setting Up the project
In this step, we will do all the necessary setup for our project

In your `ap-level` build.gradle, add the following dependencies:

```gradle
def lifecycle_version = "2.4.0-alpha03"
def coroutines_version = "1.3.9"

implementation platform('com.google.firebase:firebase-bom:28.4.1')

// Firebase Realtime Database
implementation 'com.google.firebase:firebase-database-ktx'

// Firebase Auth
implementation 'com.google.firebase:firebase-auth-ktx'

// ViewModel
implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"

// Livedata
implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle_version"

// Coroutines
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:$coroutines_version"
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.5.1'
```

Next, we will define the project structure.

Since our app will have several classes, it's good we come up with some directories that will try and separate them.

Right-click the main package and create the following directories: `ui`, `repository`, `viewmodel`, `util`, and `model`.

### Step 3 - Main Screens
In this step, we will create two activities i.e `LoginActivity` and `RegisterActivity`. On the directories that you created, right-click on the `ui` directory and create these two activities.

![Main](/engineering-education/coroutines-and-realtime-database-in-firebase-authentication-in-android/main.png)

### Step 4 - Designing the user interface
After creating the two activities, we will then define what their layout should look like.

The `activity_register.xml` should look as shown below. Feel free to add more fields depending on your use case.

![demo](/engineering-education/coroutines-and-realtime-database-in-firebase-authentication-in-android/demo1.png)

The `activity_login.xml` should look as shown below:

![demo](/engineering-education/coroutines-and-realtime-database-in-firebase-authentication-in-android/demo2.png)

### Step 5 - Creating the model class
Let's define a model class for a user.

```kotlin
data class User(
    val name: String? = "",
    val email: String? = "",
    val phone: String? = ""
)
```

### Step 6 - Utility items
Before we go any further, let's define two items in the `util` directory.

i). `SafeCall` function - This inline function will allow us to make safe network requests.

```kotlin
inline fun <T> safeCall(action: () -> Resource<T>): Resource<T> {
    return try {
        action()
    } catch (e: Exception) {
        Resource.Error(e.message ?: "An unknown Error Occurred")
    }
}
```

ii). `Resource` class - This sealed class will represent the three states of our network calls, either `Loading`, `Success`, or `Error`

```Kotlin
sealed class Resource<T>(val data: T? = null, val message: String? = null) {
    class Success<T>(data: T) : Resource<T>(data)
    class Loading<T>(data: T? = null) : Resource<T>(data)
    class Error<T>(message: String, data: T? = null) : Resource<T>(data, message)
}
```

### Step 7 - Repository class
In this step, we will define our business logic i.e code to register and login users.

In your `repository` directory, create a class named `MainRepository`.

First define the following variables:

```kotlin
private val firebaseAuth = FirebaseAuth.getInstance()
private val databaseReference = FirebaseDatabase.getInstance().getReference("users")
```

#### Registering a user
Let's create a function that will have the logic to register users and store their details in the Firebase database.

```kotlin
suspend fun createUser(userName: String, userEmailAddress: String, userPhoneNum: String, userLoginPassword: String): Resource<AuthResult> {
    return withContext(Dispatchers.IO) {
        safeCall {
            val registrationResult = firebaseAuth.createUserWithEmailAndPassword(userEmailAddress, userLoginPassword).await()

            val userId = registrationResult.user?.uid!!
            val newUser = User(userName, userEmailAddress, userPhoneNum)
            databaseReference.child(userId).setValue(newUser).await()
            Resource.Success(registrationResult)
        }
    }
}
```

#### Explanation
The `createUser` function is a `suspend` function that has a return type of `AuthResult` which is wrapped in the `Resource` class that we created earlier. Inside this function, we make use of coroutine's `withContext` and make sure that our coroutine runs in the `Dispatchers.IO`.

We then use the inline function - `safeCall` that we created in the `util` directory.

Inside the inline function:
- We invoke `firebaseAuth.createUserWithEmailAndPassword(email, password)` and make sure we add the `await()` at the end. The result of the execution is stored in the variable `result`.
- Next, we extract the `uid` of the newly created user and then create an object of the class `User` with all the respective arguments.
- We then invoke `databaseReference.child(uid).setValue(user).await()` to store the user in `Firebase Realtime` database.
- Lastly, we return a successful result.

#### Logging in a User
We also define another suspeding function for logging in  a user:

```kotlin
suspend fun login(email: String, password: String): Resource<AuthResult> {
    return withContext(Dispatchers.IO) {
        safeCall {
            val result = firebaseAuth.signInWithEmailAndPassword(email, password).await()
            Resource.Success(result)
        }
    }
}
```

#### Explanation
Similar to the `register` function, in the `login` function we make sure that we add the `await()` at the end of `firebaseAuth.signInWithEmailAndPassword(email, password)`.

### Step 8 - ViewModel class
Once you are done working on the `MainRepository`, right-click on the `viewmodel` directory and create a new class called `MainViewModel`.

Inside the `ViewModel` we will define some variables to represent the status of creating and logging in a user and also an instance of our `Repository`.

```kotlin
private val _userRegistrationStatus = MutableLiveData<Resource<AuthResult>>()
val userRegistrationStatus: LiveData<Resource<AuthResult>> = _userRegistrationStatus

private val _userSignUpStatus = MutableLiveData<Resource<AuthResult>>()
val userSignUpStatus: LiveData<Resource<AuthResult>> = _userSignUpStatus

private val mainRepository = MainRepository()
```

We then define two functions corresponding to login and register functions as defined in the `Repository`.

```kotlin
fun createUser(userName: String, userEmailAddress: String, userPhoneNum: String, userLoginPassword: String) {
    var error =
        if (userEmailAddress.isEmpty() || userName.isEmpty() || userLoginPassword.isEmpty() || userPhoneNum.isEmpty()) {
            "Empty Strings"
        } else if (!Patterns.EMAIL_ADDRESS.matcher(userEmailAddress).matches()) {
            "Not a valid Email"
        } else null

    error?.let {
        _userRegistrationStatus.postValue(Resource.Error(it))
        return
    }
    _userRegistrationStatus.postValue(Resource.Loading())

    viewModelScope.launch(Dispatchers.Main) {
        val registerResult = mainRepository.createUser(userName = userName, userEmailAddress = userEmailAddress, userPhoneNum = userPhoneNum, userLoginPassword = userLoginPassword)
        _userRegistrationStatus.postValue(registerResult)
    }
}

fun signInUser(userEmailAddress: String, userLoginPassword: String) {
    if (userEmailAddress.isEmpty() || userLoginPassword.isEmpty()) {
        _userSignUpStatus.postValue(Resource.Error("Empty Strings"))
    } else {
        _userSignUpStatus.postValue(Resource.Loading())
        viewModelScope.launch(Dispatchers.Main) {
            val loginResult = mainRepository.login(userEmailAddress, userLoginPassword)
            _userSignUpStatus.postValue(loginResult)
        }
    }
}
```

#### Explanation
In both functions, we call the `Repository` functions inside a `viewModelScope` and make sure we use `Dispatchers.Main` in the `launch` function.

### Step 9 - Registering activity
Once a user clicks on the register button, we call the `registerUser` function in the `ViewModel` passing the necessary parameters. We also observe the status of login as either loading, error, or success.

```kotlin
binding.userRegisterButton.setOnClickListener {
    // the ids might differ based on how you've named your views
    viewModel.createUser(
        binding.edxtUserName.editText?.text.toString(),
        binding.edxtEmailAddress.editText?.text.toString(),
        binding.edxtPhoneNum.editText?.text.toString(),
        binding.edxtPassword.editText?.text.toString()
    )
}
```

Also, we will define an observer to observe the state of the registration:

```kotlin
viewModel.registerStatus.observe(this, Observer {
    when (it) {
        is Resource.Loading -> {
            binding.registerProgress.isVisible = true
        }
        is Resource.Success -> {
            binding.registerProgress.isVisible = false
            Toast.makeText(applicationContext, "Registered Successfully", Toast.LENGTH_SHORT).show()
        }
        is Resource.Error -> {
            binding.registerProgress.isVisible = false
            Toast.makeText(applicationContext, it.message, Toast.LENGTH_SHORT).show()
        }
    }
})
```

### Step 10 - Login activity
Once a user clicks on the login button, we call the `loginUser` function in the `ViewModel` passing the necessary parameters. We also observe the status of login as either loading, error, or success.

```kotlin
binding.buttonLogin.setOnClickListener {
    viewModel.loginUser(
        binding.editTextLoginEmail.editText?.text.toString(),
        binding.editTextLoginPass.editText?.text.toString()
    )
}
```

Also, we will define an observer to observe the state of login:

```kotlin
viewModel.loginStatus.observe(this, Observer {
        when (it) {
            is Resource.Loading -> {
                binding.loginProgressBar.isVisible = true
            }
            is Resource.Success -> {
                binding.loginProgressBar.isVisible = false
                Toast.makeText(applicationContext, "Logged In Successfully", Toast.LENGTH_SHORT).show()
            }
            is Resource.Error -> {
                binding.loginProgressBar.isVisible = false
                Toast.makeText(applicationContext, it.message, Toast.LENGTH_SHORT).show()
            }
        }
})
```

### Conclusion
In this tutorial, we have learned how to run Firebase functions in the background thread with Coroutines. To see the full implementation of this tutorial, feel free to check out this Github repository [Firebase Coroutines Demo](https://github.com/JoelKanyi/FirebaseCoroutinesDemo).

Happy learning!

#### References
- [Kotlin Coroutines](https://github.com/Kotlin/kotlinx.coroutines)
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth/android/password-auth)
- [Firebase Realtime Database Documentation](https://firebase.google.com/docs/database/android/start)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
