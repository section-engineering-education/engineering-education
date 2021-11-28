#### Using Kotlinx Coroutines in Firebase Authentication and Realtime Database in Android
To authenticate users to your project, Firebase Authentication delivers backend services, easy-to-use SDKs, and ready-to-use UI frameworks. Firebase Realtime Database can be used to store the details of users. Because Android developers do not wish to write their own backends, all of this makes their job easier. 

In Android, while making network calls such as user Authentication, sending, or querying data from Firebase Database; you shouldn't perform such tasks on the `Main Thread`. You should do such tasks on the `Background Thread` and then update the UI accordingly. 

Our code appears cleaner with no boilerplate code when we use `Coroutines` to do Firebase operations, making it more legible and clear, and improving app productivity in the long term. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Coroutines Recap](#coroutines-recap)
- [Create an Android Project](#step-1---create-an-android-project)
- [Setting Up the Project](#step-2---setting-up-the-project)
- [Main Screens](#step-3---main-screens)
- [Designing User Interface](#step-4---designing-user-interface)
- [Model Class](#step-5---model-class)
- [Utility Items](#step-6---utility-items)
- [Repository Class](#step-7---repository-class)
- [ViewModel Class](#step-8---viewmodel-class)
- [Register Activity](#step-9---register-activity)
- [Login Activity](#step-10---login-activity)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To complete this lesson, you must have the following software installed on your computer: 
- [Android Studio](https://developer.android.com/studio/index.html).
- Solid understanding of how to create and run Android apps.
- The [Kotlin](https://kotlinlang.org/) programming language's fundamentals.
- Basic knowledge of Kotlin Coroutines.
- Knowledge of using Jetpack Components i.e `Livedata`, `ViewModel` and the `Repository` Pattern.
- An understanding of linking an Android project to Firebase: If not, take a look at this article [Firebase Email and Password Authentication](https://www.section.io/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/).
- Understand how to use `ViewBinding`.

### Coroutines Recap
Kotlin Coroutines manages long-running operations that if they are ran on the main thread, they will block it. 

In this article, we are going to use the following features of `Coroutines`:
- `withContext` - It uses a provided `Coroutines` context to call the specified suspending block, `suspends` until it completes, then returns the result. It executes the jobs sequentially rather than concurrently. Keep in mind that `withContext` is useful when you have a single job running in the background and wish to return to the task's outcome.

- `await` - While an operation is running, the `await` waits until it completes without necessary blocking the thread.

- `viewModelScope` - Defines a scope that is tied to the ViewModel. Once ViewModel is cleared, the scope will be cancelled.

> To get a more understanding of `Coroutines` check out this article - [Introduction to Kotlin Coroutines](https://www.section.io/engineering-education/introduction-to-kotlin-coroutines/)

Let's get started. In this tutorial, we will be creating a simple app that has an authentication feature and stores the user's data in the `Firebase Realtime` database.

> Make sure you have linked your project with `Firebase` and you have enabled `ViewBinding`


### Step 1 - Create an Android Project
Open your Android Studio and create an empty project and give it the name of your choice.

### Step 2 - Setting Up the Project
In this step, we will do all the necessary setup for our project

In your `ap-level` build.gradle, add the following dependencies
```Gradle
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

Next, we will define the project structure:
Since our app will have several classes, it is good we come up with some directories and will try and separate our classes.
In the main package right click and create the following directories: `ui`, `repository`, `viewmodel`, `util`, and `model`.

### Step 3 - Main Screens
In this step, we will create two activities i.e `LoginActivity` and `RegisterActivity`. On the directories that you created, right-click on the `ui` directory and create these two activities.

[!Main](section-engineering/using-kotlinx-coroutines-in-firebase-authentication-and-realtime-database-in-android/main.png)

### Step 4 - Designing User Interface
After creating the two activities, we will then define what their layout should look like.

#### For the `activity_register.xml`, here is what it should look like, feel free to add more fields depending on your use case.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.RegisterActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="32dp"
        android:text="Sign Up"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/editTextName"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:hint="Name"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="textCapWords" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/editTextEmail"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:hint="Email"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/editTextName">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="textEmailAddress" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/editTextPhone"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:hint="Phone No"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/editTextEmail">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="phone" />
    </com.google.android.material.textfield.TextInputLayout>


    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/editTextPassword"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:hint="Password"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/editTextPhone">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="textPassword" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.button.MaterialButton
        android:id="@+id/buttonRegister"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:padding="12dp"
        android:text="Register"
        app:layout_constraintEnd_toEndOf="@+id/editTextPassword"
        app:layout_constraintStart_toStartOf="@+id/editTextPassword"
        app:layout_constraintTop_toBottomOf="@+id/editTextPassword" />

    <ProgressBar
        android:id="@+id/registerProgress"
        style="?android:attr/progressBarStyle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="@+id/buttonRegister"
        app:layout_constraintStart_toStartOf="@+id/buttonRegister"
        app:layout_constraintTop_toBottomOf="@+id/buttonRegister" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

#### For the `activity_login.xml`, here is how to should look like.
```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.LoginActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="32dp"
        android:text="Sign In"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/editTextLoginEmail"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:hint="Email"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="textEmailAddress" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/editTextLoginPass"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:hint="Password"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/editTextLoginEmail">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="textEmailAddress" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.button.MaterialButton
        android:id="@+id/buttonLogin"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:padding="12dp"
        android:text="Login"
        app:layout_constraintEnd_toEndOf="@+id/editTextLoginPass"
        app:layout_constraintStart_toStartOf="@+id/editTextLoginPass"
        app:layout_constraintTop_toBottomOf="@+id/editTextLoginPass" />

    <ProgressBar
        android:id="@+id/loginProgressBar"
        style="?android:attr/progressBarStyle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/buttonLogin" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5 - Model Class
Let's define a model class for a user.
```Kotlin
data class User(
    val name: String? = "",
    val email: String? = "",
    val phone: String? = ""
)
```

### Step 6 - Utility Items
Before we go any further, let's define two items in the `util` directory

1. `SafeCall` function
This inline function will enable us to make safe network requests.

```Kotlin
inline fun <T> safeCall(action: () -> Resource<T>): Resource<T> {
    return try {
        action()
    } catch (e: Exception) {
        Resource.Error(e.message ?: "An unknown Error Occurred")
    }
}
```

2. `Resource` class
This sealed class will represent the three states of our network calls, either `Loading`, `Success`, or `Error`

```Kotlin
sealed class Resource<T>(val data: T? = null, val message: String? = null) {
    class Success<T>(data: T) : Resource<T>(data)
    class Loading<T>(data: T? = null) : Resource<T>(data)
    class Error<T>(message: String, data: T? = null) : Resource<T>(data, message)
}
```

### Step 7 - Repository Class
In this step, we will define our business logic i.e code to register and login users.

In your `repository` directory, create a class named, `MainRepository`. After defining it, 

First define the following variables
```Kotlin
    private val firebaseAuth = FirebaseAuth.getInstance()
    private val databaseReference = FirebaseDatabase.getInstance().getReference("users")
```

#### Registering a User
Let's define a function that will have the logic to register a user and store his/her details in Firebase Database.
```Kotlin
suspend fun register(name: String, email: String, phone: String, password: String): Resource<AuthResult> {
    return withContext(Dispatchers.IO) {
        safeCall {
            val result = firebaseAuth.createUserWithEmailAndPassword(email, password).await()
            val uid = result.user?.uid!!
            val user = User(name, email, phone)
            databaseReference.child(uid).setValue(user).await()
            Resource.Success(result)
        }
    }
}
```

#### Explanation
The function is a `suspend` function that has a return type of `AuthResult` which is wrapped in the `Resource` class that we defined. Inside the function body, we make use of Coroutine's `withContext` and make sure our Coroutine runs in `Dispatchers.IO` which is a background thread. 

We then use the inline function - `safeCall` that we created in the `util` directory. Inside the inline function:
- We invoke `firebaseAuth.createUserWithEmailAndPassword(email, password)` and make sure we add the `await()` at the end. The result of the execution is stored in the variable `result`.
- Next, we extract the `uid` of the newly created user and then create an object of the class `User` and all the respective arguments.
- We then invoke `databaseReference.child(uid).setValue(user).await()` to store the user in `Firebase Realtime` database.
- We then return a successful result.

#### Login a User
We also define another suspeding function for logging in  a user
```Kotlin
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
The same we have done with the `register` function, we do the same with this `login` function. We make sure we app the `await()` at the end of `firebaseAuth.signInWithEmailAndPassword(email, password)`

### Step 8 - ViewModel Class
Once you are done working on our `MainRepository`, right-click on the `viewmodel` directory and create a new class called `MainViewModel`.

Inside the `ViewModel` we will define some variables to represent the status of creating and logging in a user and also an instance of our `Repository`.

```Kotlin
class MainViewModel : ViewModel() {
    private val _registerStatus = MutableLiveData<Resource<AuthResult>>()
    val registerStatus: LiveData<Resource<AuthResult>> = _registerStatus

    private val _loginStatus = MutableLiveData<Resource<AuthResult>>()
    val loginStatus: LiveData<Resource<AuthResult>> = _loginStatus

    private val repository = MainRepository()

    ...

```

We then define two functions corresponding to login and register functions as defined in the `Repository`

```Kotlin
fun registerUser(name: String, email: String, phone: String, password: String) {
    var error = if (email.isEmpty() || name.isEmpty() || password.isEmpty() || phone.isEmpty()) {
            "Empty Strings"
        } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            "Not a valid Email"
        } else null

        error?.let {
        _registerStatus.postValue(Resource.Error(it))
        return
    }
     _registerStatus.postValue(Resource.Loading())

    viewModelScope.launch(Dispatchers.Main) {
        val result = repository.register(name, email, phone, password)
        _registerStatus.postValue(result)
    }
}

fun loginUser(email: String, password: String) {
    if (email.isEmpty() || password.isEmpty()) {
        loginStatus.postValue(Resource.Error("Empty Strings"))
    } else {
        _loginStatus.postValue(Resource.Loading())
        viewModelScope.launch(Dispatchers.Main) {
            val result = repository.login(email, password)
            _loginStatus.postValue(result)
        }
    }
}
```

#### Explanation
In both functions, we make sure we call the `Repository` functions inside a `viewModelScope` and make sure we use `Dispatchers.Main` in the `launch` function.

### Step 9 - Register Activity
Once a user clicks on the register button, we call the `registerUser` function in the `ViewModel` passing the necessary parameters. We also observe the status of login as either loading, error, or success.

```Kotlin
class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this).get(MainViewModel::class.java)

        binding.buttonRegister.setOnClickListener {
            viewModel.registerUser(
                binding.editTextName.editText?.text.toString(),
                binding.editTextEmail.editText?.text.toString(),
                binding.editTextPhone.editText?.text.toString(),
                binding.editTextPassword.editText?.text.toString()
            )
        }

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
    }
}
```

### Step 10 - Login Activity
Once a user clicks on the Login button, we call the `loginUser` function in the `ViewModel` passing the necessary parameters. We also observe the status of login as either loading, error, or success.

```Kotlin
class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this).get(MainViewModel::class.java)

        binding.buttonLogin.setOnClickListener {
            viewModel.loginUser(
                binding.editTextLoginEmail.editText?.text.toString(),
                binding.editTextLoginPass.editText?.text.toString()
            )
        }

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
    }
}
```

### Demo
[!demo1](section-engineering/using-kotlinx-coroutines-in-firebase-authentication-and-realtime-database-in-android/demo1.png)

[!demo2](section-engineering/using-kotlinx-coroutines-in-firebase-authentication-and-realtime-database-in-android/demo2.png)

### Conclusion
In this tutorial, we have learned how to run Firebase functions in the background thread with Coroutines. To see the full implementation of this tutorial, feel free to check out this Github repository [FirebaseCoroutinesDemo](https://github.com/JoelKanyi/FirebaseCoroutinesDemo).

Happy learning!.

#### References
- [Kotlin Coroutines](https://github.com/Kotlin/kotlinx.coroutines).
- [Firebase Authetication Documentation](https://firebase.google.com/docs/auth/android/password-auth).
- [Firebase Realtime Database Documentation](https://firebase.google.com/docs/database/android/start).
