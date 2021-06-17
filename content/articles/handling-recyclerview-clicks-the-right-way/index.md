---
layout: engineering-education
status: publish
published: true
url: /handling-recyclerview-clicks-the-right-way/
title: Handling RecyclerView Clicks the Right Way
description: When you using a RecyclerView to display a list of data maybe from a server, need may arise of trying to add click listeners to items in the RecyclerView. In this tutorial we'll cover RecyclerView click.
author: joel-kanyi
date: 2021-06-17T00:00:00-00:00
topics: [Android]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/handling-recyclerview-clicks-the-right-way/hero.png
    alt: Handling RecyclerView Clicks the Right Way in Kotlin.
---


# Handling RecyclerView Clicks the Right Way
Many developers tend to handle clicks on a `RecyclerView` the wrong way. There are some ways that we can do this, but for this tutorial we will focus on the most appropriate way.

## Prerequisites
- Know how to create a project in `Android Studio`
- Some good understanding of `Kotlin` (This will be the primary language that we will use)
- Worked with the basic `RecyclerView` to display data from an API (We will be fetching data from a REST API)
- Retrofit
- Some understanding of Jetpack libraries like `ViewModel` and `LiveData`
- Be familiar with `ViewBinding`

## Topics to be covered
- An Overview of  what a `RecyclerView` is.
- `ListAdapter` and `DiffUtil`
- Handling clicks in a `RecyclerView`

## Introduction
A `RecyclerView` is a great widget to display a list of data items. The `RecyclerView` class supports the display of a collection of data. It is a modernized version of the ListView and the GridView classes provided by the Android framework. If it is your first time creating a `RecyclerView` you can take a look at this article. [Basics of Android Recyclerviews](https://www.section.io/engineering-education/android-recyclerviews/)

## What is a ListAdapter?
According to the official documentation: 
```A ListAdapter is a RecyclerView.Adapter base class for presenting List data in a RecyclerView, including computing diffs between Lists on a background thread.```

While using a `LiveData<List>`,  a ListAdapter provides an easy way to provide data to the adapter.You can use submitList(POJO) when new lists data is available.
ListAdapter handles addition and removal of items without the need to redraw the entire view. It also animate those changes.


## What is a DiffUtil?
According to the official documentation:
```DiffUtil is a utility class that can calculate the difference between two lists and output a list of update operations that converts the first list into the second one. It can be used to calculate updates for a RecyclerView Adapter.```

`DiffUtil` is the class that actually removes the need for calling the `notifyDataSetChanged()` method. We overrride two of its methods `areItemsTheSame(oldItem: Pojo, newItem: Pojo)` and `areContentsTheSame(oldItem: Pojo, newItem: Pojo)`. The first method checks if the two objects are the same (for example based on ids). While the second checks if the data between the two objects is the same.
`DiffUtil` is the secret ingredient that makes it possible for `ListAdapter` to change the items in the list.

### Enough with talks, lets code
We'll be fetching Memes from  https://api.imgflip.com/get_memes API and display them in a `RecyclerView` then we'll add click listener to handle clicks on each row.

### Step 1: Make sure you have created your project

![create_project](/handling-recyclerview-clicks-the-right-way/create_project.png)

### Step 2: Adding necessary dependencies
Add the following dependencies in your app level build.gradle
  ```gradle
  //Retrofit and Gson Converter for Networking
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

    //Glide for Image Loading
    implementation 'com.github.bumptech.glide:glide:4.12.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'

    //ViewModels and LiveData
    def lifecycle_version = "2.3.1"
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle_version"
    kapt "androidx.lifecycle:lifecycle-compiler:$lifecycle_version"
  ```

Retrofit will help us in making an API call and GsonConverter will play a role of converting JSON strings to Java objects.

Also enable `ViewBinding` in the app level build.gradle
    ```gradle
    buildFeatures{
            viewBinding true
    }
    ```
 
`ViewBinding` generates a Java class that replaces the need for findViewById in your code.

### Step 3: Create layouts for both the recyler row and the recyclerView
First lets design recycler_row.xml which will have an `ImageView` that will display Meme photo and also a `TextView` to display Meme name.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
 xmlns:app="http://schemas.android.com/apk/res-auto"
 xmlns:tools="http://schemas.android.com/tools"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 android:layout_margin="5dp"
 app:cardElevation="5dp"
 app:cardCornerRadius="15dp">

 <androidx.constraintlayout.widget.ConstraintLayout
 android:layout_width="match_parent"
 android:layout_height="match_parent">

 <androidx.appcompat.widget.AppCompatImageView
 android:id="@+id/imageView"
 android:layout_width="0dp"
 android:layout_height="200dp"
 android:scaleType="centerInside"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 tools:srcCompat="@tools:sample/backgrounds/scenic" />
 
 <TextView
 android:id="@+id/memeName"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:layout_marginTop="16dp"
 android:layout_marginBottom="8dp"
 android:textAppearance="@style/TextAppearance.AppCompat.Medium"
 android:textStyle="bold"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="@+id/imageView"
 app:layout_constraintStart_toStartOf="@+id/imageView"
 app:layout_constraintTop_toBottomOf="@+id/imageView"
 tools:text="Drake Hotline Bling" />

 </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.cardview.widget.CardView>
```

For our activity_main.xml we have a `RecyclerView`, a `ProgressBar` and a `TextView` that will set display an error when our API call fails.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
 xmlns:app="http://schemas.android.com/apk/res-auto"
 xmlns:tools="http://schemas.android.com/tools"
 android:layout_width="match_parent"
 android:layout_height="match_parent"
 tools:context=".MainActivity">

 <androidx.recyclerview.widget.RecyclerView
 android:id="@+id/recyclerView"
 android:layout_width="0dp"
 android:layout_height="0dp"
 app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 tools:listitem="@layout/recycler_row" />

 <ProgressBar
 android:id="@+id/progressBar"
 style="?android:attr/progressBarStyle"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:visibility="gone"
 app:layout_constraintBottom_toBottomOf="@+id/recyclerView"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent" />

 <TextView
 android:id="@+id/textViewFailed"
 android:layout_width="0dp"
 android:layout_height="wrap_content"
 android:gravity="center_horizontal"
 android:textAlignment="center"
 android:visibility="gone"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="@+id/recyclerView"
 tools:text="TextView" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: In this step we will come up with our model class - Meme.kt
```kotlin
package com.kanyideveloper.recyclerviewitemclicksdemo

import com.google.gson.annotations.SerializedName

data class Memes(
    @SerializedName("data")
    val `data`: Data?,
    @SerializedName("success")
    val success: Boolean?
)

data class Data(
    @SerializedName("memes")
    val memes: List<Meme?>?
)

data class Meme(
    @SerializedName("box_count")
    val boxCount: Int?,
    @SerializedName("height")
    val height: Int?,
    @SerializedName("id")
    val id: String?,
    @SerializedName("name")
    val name: String?,
    @SerializedName("url")
    val url: String?,
    @SerializedName("width")
    val width: Int?
)

```

In this model class(Meme) what we need interested in is the Meme name (name) and the Meme image(url).
### Step 5: Lets design our ApiService for making the API call

```kotlin
package com.kanyideveloper.recyclerviewitemclicksdemo

import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

interface ApiService {
    @GET("get_memes")
    fun getPhotos(): Call<Memes>
}

object MemesApi {
    private const val BASE_URL = "https://api.imgflip.com/"

    private val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val apiService: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }
}
```

### Step 6: Lets create our Adapter class that will do all stuffs on clicks

```kotlin
package com.kanyideveloper.recyclerviewitemclicksdemo

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.kanyideveloper.recyclerviewitemclicksdemo.databinding.RecyclerRowBinding

class MemesAdapter(private val onClickListener: OnClickListener) :
    ListAdapter<Meme, MemesAdapter.MyViewHolder>(MyDiffUtil) {

    companion object MyDiffUtil : DiffUtil.ItemCallback<Meme>() {
        override fun areItemsTheSame(oldItem: Meme, newItem: Meme): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(oldItem: Meme, newItem: Meme): Boolean {
            return oldItem.id == newItem.id
        }
    }

    inner class MyViewHolder(private val binding: RecyclerRowBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(meme: Meme?) {
            Glide.with(binding.imageView)
                .load(meme?.url)
                .into(binding.imageView)

            binding.memeName.text = meme?.name
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        return MyViewHolder(
            RecyclerRowBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val meme = getItem(position)
        holder.itemView.setOnClickListener {
            onClickListener.onClick(meme)
        }
        holder.bind(meme)
    }

    class OnClickListener(val clickListener: (meme: Meme) -> Unit) {
        fun onClick(meme: Meme) = clickListener(meme)
    }
}
```

### Code Explanation
```kotlin
class OnClickListener(val clickListener: (meme: Meme) -> Unit) {
    fun onClick(meme: Meme) = clickListener(meme)
}
```

We have created a class called `OnClickListener` that takes in a lambda with
one Meme item as a parameter in its Constructor. This class contains a matching function called `onClick` that will set to the lambda parameter. All this creates a sort of a named lambda

```kotlin
class MemesAdapter(private val onClickListener: OnClickListener) :
    ListAdapter<Meme, MemesAdapter.MyViewHolder>(MyDiffUtil) 
```
Then we have added an onClickListener property on the Constructor of the `MemesAdapter`


```kotlin
holder.itemView.setOnClickListener {
            onClickListener.onClick(meme)
}
```

We finish our work in MemesAdapter by calling our `onClickListener` inside the `itemView's` onClickListener in `onBindViewHolder` with a Meme from the `ViewHolder`


### Step 7: In our ViewModel class
```kotlin
package com.kanyideveloper.recyclerviewitemclicksdemo

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainViewModel : ViewModel() {

    private val _reponse = MutableLiveData<Memes>()
    val response: LiveData<Memes>
        get() = _reponse

    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean>
        get() = _loading

    private val _failed = MutableLiveData<String>()
    val failed: LiveData<String>
        get() = _failed

    init {
        _loading.value = true
        getApiResponse()
    }

    private fun getApiResponse() {
        MemesApi.apiService.getPhotos().enqueue(object : Callback<Memes> {
            override fun onResponse(call: Call<Memes>, response: Response<Memes>) {
                _reponse.value = response.body()
                _loading.value = false
            }

            override fun onFailure(call: Call<Memes>, t: Throwable) {
                _loading.value = false
                _failed.value = t.localizedMessage
            }
        })
    }
}
```

### Step 8: Lets Work on our MainActivity
```kotlin
package com.kanyideveloper.recyclerviewitemclicksdemo

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.kanyideveloper.recyclerviewitemclicksdemo.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val viewModel by lazy { ViewModelProvider(this).get(MainViewModel::class.java) }
    private lateinit var adapter: MemesAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        adapter = MemesAdapter(MemesAdapter.OnClickListener { photo -> Toast.makeText(applicationContext, "${photo.name}", Toast.LENGTH_SHORT).show() })

        viewModel.response.observe(this, Observer { meme ->
            val list = meme.data?.memes
            adapter.submitList(list)
            binding.recyclerView.adapter = adapter
        })

        viewModel.loading.observe(this, Observer { loading ->
            binding.progressBar.isVisible = loading
        })

        viewModel.failed.observe(this, Observer { failed ->
            binding.textViewFailed.text = failed
            binding.textViewFailed.isVisible = true
        })
    }
}
```

 ```kotlin
 adapter = MemesAdapter(MemesAdapter.OnClickListener { photo ->
            Toast.makeText(applicationContext, "${photo.name}", Toast.LENGTH_SHORT).show()
  })
 ```

 In the MemesAdapter instance, we'll add MemesAdapter `OnClickListener` object to the MemesAdapter Constructor which returns a passed in Meme from the Adapter. For now we can try and Toast the name of the clicked Meme. On other scenarios one may need to navigate to other activities or fragments and display details of the clicked item.

### Step 9: Some Demo Screens
Once you done, run the app. Here is what you should expect
![recyclerview](/handling-recyclerview-clicks-the-right-way/recyclerview.jpg)
![recyclerview_clicked](/handling-recyclerview-clicks-the-right-way/recyclerview_clicked.jpg)


You can check the entire project on [GitHub]( https://github.com/JoelKanyi/RecyclerViewItemClicksDemo)

### Conclusion
That's not all about `Recyclerviews` clicks, keep exploring. Through this article, I hope you have got an idea on how to handle clicks on your `Recyclerviews`.

Keeping skilling up and happy coding!!!

### Resources
- [Android Official Documentation]( https://developer.android.com/reference/androidx/recyclerview/widget/ListAdapter)