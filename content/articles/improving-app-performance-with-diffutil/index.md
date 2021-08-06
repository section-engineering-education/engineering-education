---
layout: engineering-education
status: publish
published: true
url: /improving-app-performance-with-diffutil/
title: Improving Application Performance with DiffUtil
description: This article takes the reader through improving an android app's performance by implementing DiffUtil. DiffUtil is a utility class that computes the variation between two sets of data and returns a list of update operations that change the old list to the new one.
author: maurine-muthoki
date: 2021-07-20T00:00:00-08:14
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/improving-app-performance-with-diffutil/hero.png
    alt: DiffUtil example image
---

The performance of a mobile application is one of the most important aspects in determining the user experience. Performance refers to the capability of an application to load and refresh data on various events. 
<!--more-->
When you want to update data in a RecyclerView, you probably use `notifyOnDataSetChanged()` or `notifyOnItemPositionChanged()` methods. While these methods work well with small amounts of data, it becomes hectic for your app to update and fully reload huge amounts of data.

This easily leads to an ANR (App Not Responding) exception that annoys your application's users. An annoyed user will always give negative feedback!

With the use of `DiffUtil`, we can easily handle changes in a dataset and instantly reflect them on a RecyclerView.

DiffUtil is a utility class that computes the variation between two sets of data and returns a list of update operations that change the old list to the new one. It uses the [Eugene W. Myers'](https://www.nathaniel.ai/myers-diff/) algorithm to figure out how many updates are essential to convert one data set to the other.

Since Myers' technique does not handle objects that have been moved, DiffUtil does a second attempt on the output to identify elements that have been relocated. This saves time and the device's resources while providing a better experience for the user.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Building an Android project](#building-an-android-project)
- [Enabling viewBinding](#enabling-viewbinding)
- [Setting up a RecyclerView](#setting-up-recyclerview)
- [Model Application data](#data-model-for-the-app)
- [Creating DiffUtil Callback class](#creating-diffutil-callback-class)
- [Understanding the DiffUtil callbacks](#understanding-the-diffutil-callbacks)
- [Attaching DiffUtil to an Adapter](#attaching-diffutil-to-an-adapter)
- [Utilizing the Adapter](#utilizing-the-adapter)
- [Testing and debugging the app](#test-the-app)
- [Conclusion](#conclusion)

### Prerequisites
This article assumes that you have prior knowledge on:
1. Creating Android apps using [Android Studio](https://developer.android.com/studio).
2. Basics of the [Kotlin programming language](https://kotlinlang.org/).
3. Working with the imperative paradigm in Android - using `XML` and view groups such as [Constraint Layout](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout).
4. ViewBinding and/or [DataBinding](https://developer.android.com/topic/libraries/data-binding).
5. The basics of an [Android Recyclerview](https://developer.android.com/jetpack/androidx/releases/recyclerview).

### Building an Android project
Open Android Studio and create a project with a template of your choice. Make sure that you select an API version not less than 16 so as to make your app compatible with DiffUtil.

### Enabling viewBinding
ViewBinding allows us to access views and viewGroups from `XML` layout files using their respective binding classes.

```gradle
// in the build.gradle file (module level)
android{
    buildFeatures{
        viewBinding true
    }
}
```

### Setting up RecyclerView
At this point, we're going to create a RecyclerView and set it up with its core components.

#### User Interface
Open your `XML` layout file and paste the following code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <!--NOTE: This file is named activity_main.xml-->

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="8dp"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager" />

    <Button
        android:id="@+id/btnUpdate"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:text="@string/update_data"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="@id/recyclerview"
        app:layout_constraintStart_toStartOf="@id/recyclerview"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.96" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

This includes a button that when clicked, will perform an update operation on the Recyclerview.

#### Row item
This is the unit building block that determines the data representation format in a Recyclerview. It also takes after the data models in the app for compatibility and necessity purposes.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingBottom="8dp">

    <!--NOTE: This file is named student_card.xml-->

    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="8dp">

            <TextView
                android:id="@+id/studentId"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.25"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent"
                tools:text="00" />

            <TextView
                android:id="@+id/studentName"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.25"
                app:layout_constraintStart_toEndOf="@id/studentId"
                app:layout_constraintTop_toTopOf="parent"
                tools:text="Example Name" />

        </androidx.constraintlayout.widget.ConstraintLayout>
    </androidx.cardview.widget.CardView>
</androidx.constraintlayout.widget.ConstraintLayout>
```

Here, we've created a student item card that holds two textViews.

### Data model for the App
A dataset defines the type of data objects that the adapter works with. Create a Koltin data class named `Student` and paste the following.

```kotlin
data class Student(
    val id: String,
    val name: String
)
```

#### Recyclerview Adapter
An adapter does the hard task of connecting the dataset to a Recyclerview. Create a Kotlin class named `StudentAdapter` and paste the following.

```kotlin
class StudentAdapter : RecyclerView.Adapter<StudentAdapter.CardViewHolder>() {
    private var oldList = emptyList<Student>()

    inner class CardViewHolder(val card: StudentCardBinding) : RecyclerView.ViewHolder(card.root)

    override fun getItemCount(): Int = oldList.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CardViewHolder {
        return CardViewHolder(
            StudentCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        )
    }

    override fun onBindViewHolder(holder: CardViewHolder, position: Int) {
        holder.card.apply {
            studentId.text = oldList[position].id
            studentName.text = oldList[position].name
        }
    }
}
```

We'll later use this adapter to implement DiffUtil callbacks.

### Creating DiffUtil Callback class
Now, proceed to create a Kotlin class named `MyDiffUtil` and paste the following.

```kotlin
class MyDiffUtil(
    private val oldList: List<Student>,
    private val newList: List<Student>

) : DiffUtil.Callback() { // extending the Callback class
    override fun getOldListSize(): Int {
        return oldList.size
    }

    override fun getNewListSize(): Int {
        return newList.size
    }

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition].id == newList[newItemPosition].id
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return when {
            oldList[oldItemPosition].id == newList[newItemPosition].id -> true
            oldList[oldItemPosition].name == newList[newItemPosition].name -> true
            else -> false
        }
    }
}
```

### Understanding the DiffUtil callbacks
- `getOldListSize` returns the size of the old list passed in the constructor of the class.
- `getNewListSize` returns the size of the new or updated list passed in the constructor.
- `areItemsTheSame` returns a boolean value, i.e, if items at corresponding positions are the same or not.
- `areContentsTheSame` checks if the content of items at corresponding positions is the same.

> **NOTE:** Both **oldList** and **newList** should hold elements of the same type.

### Attaching DiffUtil to an Adapter
Navigate to the `StudentAdapter.kt` file and create a public function that we'll use to dispatch updates to the adapter.

```kotlin
fun setData(newList: List<Student>) {
    val diffUtil = MyDiffUtil(oldList, newList)
    val diffUtilResults = DiffUtil.calculateDiff(diffUtil)

    oldList = newList
    diffUtilResults.dispatchUpdatesTo(this)
}
```

### Utilizing the Adapter
The adapter is ready to be used. Attach it to the Recyclerview as shown below.

```kotlin
class MainActivity : AppCompatActivity() {
    private var binding: ActivityMainBinding? = null
    private val studentAdapter: StudentAdapter = StudentAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding!!.root)

        updateDataWhenClicked()
        binding!!.recyclerview.apply {
            val newList: List<Student> = listOf(
                Student("1", "Milan Gans"),
                Student("2", "Renda Slaugh"),
                Student("3", "Basil Levison"),
                Student("4", "Tina Travers"),
            )
            adapter = studentAdapter.also { adapter ->
                adapter.setData(newList)
            }
        }
    }

    private fun updateDataWhenClicked() {
        binding!!.btnUpdate.setOnClickListener {
            val newList: List<Student> = listOf(
                Student("1", "Milan Gans"),
                Student("2", "Renda Slaugh"),
                Student("3", "Basil Levison"),
                Student("4", "Tina Travers"),
                Student("5", "Lil Mosey"),
                Student("6", "Maurine Alexa"),
            )
            studentAdapter.setData(newList)
        }
    }
}
```

Here we've initialized the adapter with a dummy list. When the update button is clicked, the RecyclerView is updated with a new dummy list.

> **TIP:** When working on a production project, you should get data from a database, preferably [room database](https://developer.android.com/jetpack/androidx/releases/room) or [a remote database](https://firebase.google.com/docs/firestore).

### Test the App
After running the App, you should see something similar to this;

![App testing image-gif](/engineering-education/improving-app-performance-with-diffutil/app-testing.gif)

Notice that only the new items are updated. This way, the device's resources such as battery and memory are saved. As a result, the users have a quick and seamless experience.

### Conclusion
That's it! You can now boost your app performance using DiffUtil.

For further reading, release notes, or advanced implementation of DiffUtil, please refer to the [official documentation](https://developer.android.com/reference/androidx/recyclerview/widget/DiffUtil) or [this sample project](https://developer.android.com/codelabs/kotlin-android-training-diffutil-databinding#0).

The source code for this tutorial can be found [here](https://github.com/MaurineM/DiffUtil-in-android).

Happy Coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
