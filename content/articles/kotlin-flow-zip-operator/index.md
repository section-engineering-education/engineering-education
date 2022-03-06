---
layout: engineering-education
status: publish
published: true
url: /kotlin-flow-zip-operator/
title: How to Get Started with Kotlin Flows API Zip Operator 
description: This tutorial will walk the reader through how to get started with Kotlin Flows API Zip Operator for parallel multiple network calls in Android.
author: emmah-lashly
date: 2022-03-06T00:00:00-15:45
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kotlin-flow-zip-operator/hero.jpg
    alt: Kotlin Flows API Zip Operator Hero Image
---
Flow is a fundamental feature in the Kotlin programming language. Understanding it will help you perform some network calls with ease. Since it is built on top of coroutines, it is helpful in managing the main thread. 
<!--more-->
When performing network calls, Kotlin Flows allows for asynchronous emission of data, hence preventing the blocking of threads. This will increase the speed at which the app performs network calls.

Coroutines can be suspended and resumed at some specified points, preventing blocking of threads. That is where flows come in to prevent a task from being suspended because the suspended task might be very crucial.

This tutorial will cover how to use `zip` flow operator to perform a parallel network call. The API we are going to use is the `elephants` API. You can get it from [here](https://elephant-api.herokuapp.com/elephants/).

 ### Table of contents
 - [Prerequisites](#prerequisites)
 - [What is Kotlin flow](#what-is-kotlin-flow)
 - [Kotlin flow operators](#kotlin-flow-operators)
 - [What is a Zip operator](#what-is-a-zip-operator)
 - [Step 1 - Getting started with Android Studio](#step-1---getting-started-with-android-studio)
 - [Step 2 - Adding dependencies](#step-2---adding-dependencies)
 - [Step 3 - Designing User Interface](#step-3---designing-user-interface)
   - [Creating the Recycler row](#creating-the-recycler-row)
   - [Creating RecyclerView Layout](#creating-recyclerview-layout)
 - [Step 4 - Model class](#step-4---model-class)
 - [Step 5 - Creating API Service class](#step-5---creating-api-service-class)
 - [Step 6 - RecyclerView Adapter class](#step-6---recyclerview-adapter-class)
 - [Step 7 - ViewModel class](#step-7---viewmodel-class)
 - [Conclusion](#conclusion)

 ### Prerequisites
 To follow along with this tutorial, the reader will need the following:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your computer.
- Understand how to use [`ViewBinding`](https://developer.android.com/topic/libraries/view-binding).
- [Kotlin](https://kotlinlang.org/) programming language fundamentals.
- A basic knowledge of Kotlin [Coroutines](https://developer.android.com/kotlin/coroutines).
- A basic knowledge in Android Jetpack Components i.e `Livedata`, `ViewModel` and `Repository` patterns.

### What is Kotlin flow
Flow is a coroutine that can emit multiple values over some time. It can also be defined as a Kotlin language feature that serves as a reactive programming framework. 

To learn more about how to create a flow, visit this [article](/engineering-education/introduction-to-kotlin-flows/).

### Kotlin flow operators
These are the operators that decide what happens with the emission of a flow:
- filter -> Filters the values produced by a flow.
- map -> Maps the value of a certain flow to a new value.
- onEach -> It does not return any formal value but returns the previous flow.
- zip -> Is a flow operator that emits a single item after combining the emission of two flow collections via a specified function. 

Flow also has terminal operators that are used to start and terminate the flow. They include, `collect`, `reduce`, and `count`. To learn more about terminal operators, you can visit [here](https://blog.mindorks.com/terminal-operators-in-kotlin-flow).

### What is a Zip operator
A zip operator is a flow operator that emits a single item after combining the emission of two flow collections via a specified function. Enough of theory, let's jump into Android studio and get hands on 💻.

### Step 1 - Getting started with Android Studio
Open your Android Studio IDE and create a new project. Remember to select Kotlin language.

### Step 2 - Adding dependencies
In your app-level `buld.gardle` file, add the following dependencies.

```gradle
    // Lifecycle
    implementation "androidx.lifecycle:lifecycle-extensions:2.2.0"
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:2.4.0"

    // Hilt
    implementation "com.google.dagger:hilt-android:2.38.1"
    kapt "com.google.dagger:hilt-compiler:2.38.1"

    // Retrofit
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

    // Coroutine Lifecycle Scopes
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.0"
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.4.0"

    //Glide for image loading
    implementation 'com.github.bumptech.glide:glide:4.12.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'
```

### Step 3 - Designing the User Interface
We are going to create a simple interface containing an `ImageView` when displaying the image of the elephants and a `TextView` to display the name. Remember to use a `RecyclerView`.

#### Creating the Recycler Row
Go to your `layout` folder and create a new layout resource file then paste the following code.

```xml
<androidx.cardview.widget.CardView
 xmlns:android="http://schemas.android.com/apk/res/android"
 xmlns:app="http://schemas.android.com/apk/res-auto"
 xmlns:tools="http://schemas.android.com/tools"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 app:cardCornerRadius="10dp"
 app:cardElevation="15dp"
 android:layout_margin="10dp">

 <androidx.constraintlayout.widget.ConstraintLayout
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 android:padding="10dp"
 android:elevation="10dp">

 <com.google.android.material.imageview.ShapeableImageView
 android:id="@+id/image"
 android:layout_width="120dp"
 android:layout_height="120dp"
 android:layout_marginStart="8dp"
 android:layout_marginTop="8dp"
 android:src="@drawable/ic_launcher_background"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent" />

 <com.google.android.material.textview.MaterialTextView
 android:id="@+id/textViewName"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:layout_marginStart="24dp"
 android:textSize="18sp"
 android:textStyle="bold"
 android:textColor="#000000"
 android:text="TextView"
 app:layout_constraintBottom_toTopOf="@+id/textViewStatus"
 app:layout_constraintStart_toEndOf="@+id/image"
 app:layout_constraintTop_toTopOf="parent" />

 <com.google.android.material.textview.MaterialTextView
 android:id="@+id/textViewStatus"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:layout_marginStart="24dp"
 android:layout_marginTop="16dp"
 android:textSize="15sp"
 android:textStyle="italic"
 android:textColor="@color/black"
 android:text="TextView"
 app:layout_constraintBottom_toTopOf="@+id/textViewSpecies"
 app:layout_constraintStart_toEndOf="@+id/image"
 app:layout_constraintTop_toBottomOf="@+id/textViewName" />

 <com.google.android.material.textview.MaterialTextView
 android:id="@+id/textViewSpecies"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:layout_marginStart="24dp"
 android:layout_marginTop="24dp"
 android:textSize="15sp"
 android:textStyle="italic"
 android:textColor="@color/black"
 android:text="TextView"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintStart_toEndOf="@+id/image"
 app:layout_constraintTop_toBottomOf="@+id/textViewStatus" />

 </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.cardview.widget.CardView>
```
#### Creating RecyclerView Layout
Add the code below to create a `RecyclerView`. You can use `ConstraintLayout` as your root layout.

```xml
<androidx.recyclerview.widget.RecyclerView
 android:id="@+id/recyclerView"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
 tools:listitem="@layout/elephants_row"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent" />
```

After we have set up our layout, we now want to fetch the data from elephants API using the Zip operator. 

If you are new to using Retrofit and RecyclerView, you can refer [here](/engineering-education/handling-recyclerview-clicks-the-right-way/).

### Step 4 - Model class
In this step, we will create a model class having the name of the elephants, species, sex, and an image (url). We will ignore the rest of the attributes for now.

```kotlin
import com.google.gson.annotations.SerializedName

class Elephants : ArrayList<Elephants.ElephantsItem>(){
    data class ElephantsItem(
        @SerializedName("image")
        val image: String?,
        @SerializedName("name")
        val name: String?,
        @SerializedName("sex")
        val sex: String?,
        @SerializedName("species")
        val species: String?,
    )
}
```

### Step 5 - Creating API service class
This step involves designing an ApiService interface to make API calls using the Retrofit library. The base URL will be `https://elephant-api.herokuapp.com/` and the endpoint will be `elephants/`.

```kotlin
interface ApiService {

    @GET("elephants/")
    fun getElephants(): Call<Elephants>
}

object ElephantsApi{
    const val BASE_URL = "https://elephant-api.herokuapp.com/"

    val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val retrofitService by lazy {
        retrofit.create(ApiService::class.java)
    }
}
```

### Step 6 - RecyclerView adapter class
This is the class that will be responsible for mapping the data from the API to our recycler view. 

```kotlin
class ElephantsAdapter : ListAdapter<Elephants.ElephantsItem, ElephantsAdapter.MyViewHolder>(DiffUtilCallback) {

    object DiffUtilCallback : DiffUtil.ItemCallback<Elephants.ElephantsItem>() {
        override fun areItemsTheSame(
            oldItem: Elephants.ElephantsItem,
            newItem: Elephants.ElephantsItem
        ): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(
            oldItem: Elephants.ElephantsItem,
            newItem: Elephants.ElephantsItem
        ): Boolean {
            return oldItem.id == newItem.id
        }
    }
    inner class MyViewHolder(private val binding: ElephantsRowBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(elephants: Elephants.ElephantsItem?) {

            Glide.with(binding.image)
                .load(elephants?.image)
                .circleCrop()
                .into(binding.image)

            binding.textViewName.text = ("Name: ${elephants?.name}")
            binding.textViewSpecies.text = ("Species: ${elephants?.species}")
            binding.textViewStatus.text = ("Sex: ${elephants?.sex}")
        }
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        return MyViewHolder(ElephantsRowBinding.inflate(LayoutInflater.from(parent.context),
            parent,
            false))
    }
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val elephants = getItem(position)
        holder.bind(elephants)
    }
}
```

In the next step, we will work on the ViewModels class that will hold the Zip operator logic for asynchronous parallel network calls.

### Step 7 - ViewModel class
We will create two ViewModel classes, one of the classes will implement the Zip operator logic to allow fetching of data asynchronously from the API. One ViewModel class will contain two methods i.e., `getAnElephant()` and `getMoreElephants()`. 

The other ViewModel class will have a `zip` operator to allow parallel network calls using the two methods. 

```kotlin
@HiltViewModel
class MainViewModel @Inject constructor(private val elephantsRepository: ElephantsRepository): ViewModel() {

    private val _elephantResult = MutableLiveData<Resource<Elephant>>()
    val elephantResult: LiveData<Resource<Elephant>> = _elephantResult

    // First method
    fun getAnElephant(){
        viewModelScope.launch {
            _elephantResult.value = Resource.Loading()
            _elephantResult.value = elephantsRepository.getAnElephant()
        }
    }

    //Second method
    fun getMoreElephants(){
        viewModelScope.launch {
            _elephantResult.value = Resource.Loading()
            _elephantResult.value = elephantsRepository.getAnElephant()
        }
    }
}
```

> Note how we have used the `zip` operator in the `ElephantsViewModel` class to combine the two methods (`getAnElephant()`,`getMoreElephants()`) for a parallel network call.

```kotlin
class ElephantsViewModel (
    private val elephantsApi: MainViewModel
    ) : ViewModel() {

    private val elephants = MutableLiveData<Resource<List<Elephant>>>()

    init {
        fetchElephants()
    }

    private fun fetchElephants() {
        viewModelScope.launch {
            elephants.postValue(Resource.Loading(null))
            elephantsApi.getAnElephant().zip(elephantsApi.getMoreElephants()) { elephantsFromApi, moreElephantsFromApi ->
                    val allElephantsFromApi = mutableListOf<Elephant>()
                    allElephantsFromApi.addAll(elephantsFromApi)
                    allElephantsFromApi.addAll(moreElephantsFromApi)
                    return@zip allElephantsFromApi
                }
                .flowOn(Dispatchers.Default)
                .catch(e: Exception) { 
                    Log.d(TAG, "fetchElephants: $e.message")
                }
                .collect {
                    elephants.value?.data
                }
        }
    }
}
```

![project demo](/engineering-education/kotlin-flow-zip-operator/kotlin-flow-zip-demo.jpg)

Finally, when two flow collections are zipped by the Zip operator, both the network calls are made in parallel and the results of the two network calls are returned in a single callback once both the network calls are completed. Hence, both the results are returned each at a time.

### Conclusion
In this tutorial, we learned how to use the Kotlin flow Zip operator to perform parallel network calls from an API. We also learned how to use the Retrofit library to fetch the elephants from the API. 

We also used the Zip operator to fetch data from an API and returned the result in a single callback, improving the speed of remote access. 

Happy coding with Kotlin Flows!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
