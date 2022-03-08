---
layout: engineering-education
status: publish
published: true
url: /implementing-a-repository-kotlin/
title: Implementing a Repository in Android using Kotlin
description: This tutorial will guide the reader on how to implement a repository in Android using Kotlin. A repository allows one to manage different data sources effectively.
author: michael-barasa
date: 2021-08-26T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-a-repository-kotlin/hero.png
    alt: Implementing a Repository in Android using Kotlin
---
A repository is commonly regarded as the single source of truth in an Android application. In other words, it acts as an abstraction over a particular data source. A repository enables an application to consume data without worrying about its origin.
<!--more-->
Some of the common sources of data include local databases, cache, and online servers. Using a repository allows developers to manage data more effectively. It is also much easier to identify bugs or errors since there is the separation of business logic from the UI.

![App Architecture](/engineering-education/implementing-a-repository-kotlin/final-architecture.png)

### Goal 
In this tutorial, we will incorporate a repository in an Android application that uses MVVM architecture. 

### Prerequisites
To follow along, you need some basic understanding of Kotlin. Furthermore, you should have installed [Android Studio](https://developer.android.com/) on your computer. 

Some knowledge of the [MVVM architecture](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/) is also vital. 

You can read more on the different architectural patterns in Android from [here](/engineering-education/architectural-patterns-in-android/).

> Note that the application will retrieve data from `https://jsonplaceholder.typicode.com/posts`.

### Understanding the app data
The first step when building any application is to understand the data source. This phase is critical since it allows developers to structure app components appropriately.

Navigate to `https://jsonplaceholder.typicode.com/posts` on your browser.

You will notice that the link returns data in `JSON` format, as shown below:

![Data Format](/engineering-education/implementing-a-repository-kotlin/data.png)

The data above includes variables such as `userID`, `id`, `title`, and `body`. We will need to declare these variables in the app.

### Getting started
Open `Android Studio` and generate a new project. Choose an `empty` template and click `finish`. You will need to be patient since this process may be time consuming.

When the project completes, Android Studio will display all the required files in a new window.

Before going further, we need to add several permissions and dependencies to our application.

Navigate to the `Manifests/AndroidManifest.xml` file and include the following line to enable internet access:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.wanja.myapplication">
    <uses-permission android:name="android.permission.INTERNET"/>  <!--internet permission-->
```

Next, open the app-level `build.gradle` file and add the following dependencies:

```bash
dependencies {
    implementation 'androidx.lifecycle:lifecycle-extensions:2.2.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    def lifecycle_version = "2.3.1"
    def arch_version = "2.1.0"
    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"
    // LiveData
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle_version"
    // Lifecycles only (without ViewModel or LiveData)
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:$lifecycle_version"
    // Saved state module for ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-savedstate:$lifecycle_version"
    // Annotation processor
    kapt "androidx.lifecycle:lifecycle-compiler:$lifecycle_version"
    // alternately - if using Java8, use the following instead of lifecycle-compiler
    implementation "androidx.lifecycle:lifecycle-common-java8:$lifecycle_version"
    //volley
    implementation 'com.android.volley:volley:1.2.0'
}
```

In the code above, we are importing the `Lifecycle` and `Volley` dependencies. The Lifecycle dependency is responsible for the [MVVM](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/) architecture. It allows us to use elements such as LiveData and ViewModels. 

We will use the `Volley` library to perform a network request to `https://jsonplaceholder.typicode.com/posts`.

Remember to add `kotlin-kapt` at the top of the app-level `build.gradle` file, as shown below:

```bash
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
```

### Creating the data class
A data class allows us to define variables and their values. As noted, the application has four major variables; `userId`, `id`, `title`, and `body`.

In the main package directory, create a new class and name it `Post`.

Add the following code in the `Post` file:

```kt
data class Post(val userId: Int, val id: Int, val title: String, val body: String)
```

As highlighted above, the `Post` class will take the `userID`, `id`, `title`, and `body` as its parameters. Note that the `getters` and `setters` will be generated automatically.

### Creating the repository
The repository allows the application to connect to different data sources. This data is then sent to the main UI.

In the `main` directory, generate a new file and name it as `MainRepository`.

We will retrieve data from an ArrayList, as well as from the Internet. Volley requires a [RequestQueue](https://developer.android.com/training/volley/requestqueue) to perform network requests. Therefore, we will include a `RequestQueue` as a parameter in the `MainRepository` class.

```kt
class MainRepository(var mRequestQueue: RequestQueue) {
}
```

Next, we need to add a `MutableLiveData` object to the application. 

This object will hold data that will be retrieved from the internet:

```kt
 var posts = MutableLiveData<ArrayList<Post>>() //this MutableLiveData will hold an ArrayList of posts
```

Let's create a method that returns a pre-filled `Arraylist`. 

It will simulate data retrieved from the local storage:

```kt
    fun getData(): ArrayList<Post>{ //this method returns an arraylist
        var lst = ArrayList<Post>();
        var post1 = Post(1, 1, "Tom", "Test data")
        var post2 = Post(1, 1, "Thomas", "Tuesday")
        var post3 = Post(1, 1, "Tim", "Going to Mars")
        var post4 = Post(1, 1, "Theranos", "Big five animals")
        lst.add(post1)
        lst.add(post2)
        lst.add(post3)
        lst.add(post4)
        return lst
    }
```

We also need to include a method that retrieves data from the internet, as shown below:

```kt
 fun fetchOnlineData(){
        val url = "https://jsonplaceholder.typicode.com/posts"
        var onlineposts = ArrayList<Post>();

        val jsonArrayRequest = JsonArrayRequest(
            Request.Method.GET, url, null,
            Response.Listener
            { response -> //retrieved data is stored in this response object
                for(a in 0 until  response.length()){ 
                    //this for loop iterates through the retrieved arraylist
                    val obj = response.getJSONObject(a)
                   
                    //retrieve specific variables
                    val userId = obj.getInt("userId") 
                    val id = obj.getInt("id")
                    val title = obj.getString("title")
                    val body = obj.getString("body")

                    var post = Post(userId,id,title,body)
                    onlineposts.add(post) //adding Post objects to an arraylist

                }
                posts.value = onlineposts //updates the mutablelivedata with the retrieved data

            },
            { error ->
                // We handle any errors here
            }
        )
        // Access the RequestQueue through your singleton class.]
        mRequestQueue.add(jsonArrayRequest) 
        //we use the request queue specified in the class contructor.
    }
```

Here is the entire code for the `MainRepository` class:

```kt
import android.util.Log
import androidx.lifecycle.MutableLiveData
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest

class MainRepository(var mRequestQueue: RequestQueue) {
    var posts = MutableLiveData<ArrayList<Post>>()

    fun getData(): ArrayList<Post>{ //local data source
        var lst = ArrayList<Post>();
        var post1 = Post(1, 1, "Tom", "Test data")
        var post2 = Post(1, 1, "Thomas", "Tuesday")
        var post3 = Post(1, 1, "Tim", "Going to Mars")
        var post4 = Post(1, 1, "Theranos", "Big five animals")
        lst.add(post1)
        lst.add(post2)
        lst.add(post3)
        lst.add(post4)
        return lst
    }

    fun fetchOnlineData(){ //online data source
        val url = "https://jsonplaceholder.typicode.com/posts" //our online data source
        var onlineposts = ArrayList<Post>();

        val jsonArrayRequest = JsonArrayRequest(
            Request.Method.GET, url, null,
            Response.Listener
            { response ->
                for(a in 0 until  response.length()){
                    val obj = response.getJSONObject(a)

                    val userId = obj.getInt("userId")
                    val id = obj.getInt("id")
                    val title = obj.getString("title")
                    val body = obj.getString("body")

                    var post = Post(userId,id,title,body)
                    onlineposts.add(post)

                }
                posts.value = onlineposts

            },
            { error ->
                // TODO: Handle error
            }
        )
        // Access the RequestQueue through your singleton class.]
        mRequestQueue.add(jsonArrayRequest)
    }

}
```

### Creating the ViewModel
In this step, we will connect the `MainRepository` above to our `ViewModel`.

Create a new file in the main package directory and name it `MainViewModel`.

Add the following code in the generated `MainViewModel` file:

```kt
class MainViewModel(var mRequestQueue: RequestQueue) : ViewModel() {
    //we include a Volley requestquest as a parameter

    var localposts =  MutableLiveData<ArrayList<Post>>() //this mutable will store local data
    var onlineposts =  MutableLiveData<ArrayList<Post>>() //stores data retrieved from server
    var mainRepository = MainRepository(mRequestQueue) //initializing the MainRepository

    init{ 
        localposts.value = mainRepository.getData()  //fetching local data
        mainRepository.fetchOnlineData() //fetching online data
        onlineposts = mainRepository.posts //updating the onlineposts array with new data
    }

}
```

In the code above, we included a `RequestQueue` in the class constructor. As noted, the `RequestQueue` allows us to perform a `Volley` network request.

We also defined `localposts` and `onlineposts` arrays. These components will store our application data.

The last thing was to initialize the `MainRepository`. We pass the `RequestQueue` as a parameter in this class.

The `init` function is called whenever the ViewModel is initialized. It is, therefore, the perfect place to fetch and load data.

### Creating a ViewModelFactory
A `ViewModelFactory` allows us to pass certain values in the `ViewModel` whenever it is initialized. In our case, we need to pass a `RequestQueue` in the ViewModel's constructor.

In the main directory, create a file called `MainViewModelFactory`.

Add the following code in the generated `MainViewModelFactory`:

```kt
class MainViewModelFactory(var mRequestQueue: RequestQueue): Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if(modelClass.isAssignableFrom(MainViewModel::class.java)){
            return MainViewModel(mRequestQueue) as T
        }
        throw IllegalArgumentException("Unknown class")
    }
}
```

As shown above, the `MainViewModelFactory` requires a `RequestQueue` when it is initialized. This component is then passed down to the `MainViewModel`.

In case the `MainViewModel` is not found, the `MainViewModelFactory` will throw an `IllegalArgumentException`.

### Generating the user interface
The UI enables us to display information to the user. For instance, in our case, the user will view both the local and online data.

We will be using a simple UI to present data to the user.

Navigate to the `res/layout` folder and add the code below:

```xml
    <TextView
        android:id="@+id/content"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="TextView"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
```

The retrieved data will be displayed in the `TextView` highlighted above. Ensure that you allocate this TextView an `id`.

### Completing the MainActivity
This is the final phase of our app. We need to connect all the components that we have discussed above in this activity.

In the `MainActivity` file, declare the following variables:

```kt
    private lateinit var mainViewModel: MainViewModel  //this is our viewmodel
    private lateinit var mainViewModelFactory: MainViewModelFactory // the viewmodelfactory
    private lateinit var mRequestQueue: RequestQueue //requestqueue

```

The `lateinit` keyword enables us to declare variables without assigning them values.

We now need to assign values to the above variables, as demonstrated below:

```kt
mRequestQueue = Volley.newRequestQueue(this) //assigning the requestqueue
mainViewModelFactory = MainViewModelFactory(mRequestQueue) 
//passing the requestque to the viewmodel factory
mainViewModel = ViewModelProviders.of(this, mainViewModelFactory).get(MainViewModel::class.java)
//initializing the viewmodel
``

The next step is to load the data into the `TextView`.

```kt
content.text = "Local Data\n"+mainViewModel.localposts.value!!.toString()
```

In the code above, `content` is the `id` that we assigned to the TextView.

We access the ArrayList storing the local data using `mainViewModel.localposts.value!!`. The data is then converted into a `string` using the `toString()` method.

The next step is to observe the ArrayList storing our online data. We will only update the UI when the app has completed fetching data.

```kt
mainViewModel.onlineposts.observeForever { //observing the mutablelivedata
            if(it.isEmpty()){ //checking if the arraylist is empty
                //do something
            }else{ //displaying data when the arraylist is not empty
                content.text = "Online Data\n"+it.toString() 
                //convert the array into a string
            }
        }
```

Here is the code for the entire `MainActivity`:

```kt
class MainActivity : AppCompatActivity() {
    private lateinit var mainViewModel: MainViewModel
    private lateinit var mainViewModelFactory: MainViewModelFactory
    private lateinit var mRequestQueue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mRequestQueue = Volley.newRequestQueue(this)
        mainViewModelFactory = MainViewModelFactory(mRequestQueue)
        mainViewModel = ViewModelProviders.of(this, mainViewModelFactory).get(MainViewModel::class.java)

        content.text = "Local Data\n"+mainViewModel.localposts.value!!.toString()

        mainViewModel.onlineposts.observeForever {
            if(it.isEmpty()){
                //do something
            }else{
                content.text = "Online Data\n"+it.toString()
            }
        }


    }

}
```

When you test the application, it should display the local data then update the UI with the online posts.

### Conclusion
This article discussed how to implement a repository in an Android application using Kotlin. One huge advantage of a repository is that it supports the separation of business logic which leads to greater productivity.

You can, therefore, use the knowledge and skills gained in this course to craft high-quality Android applications.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/content/authors/peter-kayere/)
