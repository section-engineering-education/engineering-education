---
layout: engineering-education
status: publish
published: true
url: /implementing-search-view-in-android/
title: Implementing Search View in Android
description: This tutorial will take the reader through creating and implementing search views in Android. A SearchView is an Android widget that simplifies the process of manoeuvering through a bunch of data trying to find a match.
author: eric-gacoki
date: 2021-04-06T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-search-view-in-android/hero.png
    alt: Search Views in Android
---
When dealing with a vast amount of data, it can sometimes be strenuous to find the piece of data that you want. This problem can be solved by filtering out the necessary data with respect to the `keyword(s)` provided. This is where a `SearchView` comes in. 
<!--more-->
### A). Introduction
A SearchView is an Android widget that simplifies the process of manoeuvering through a bunch of data trying to find a match. This improves the users' experience by saving time.

### B). Objectives
In this tutorial, we will learn how to use a RecyclerView to implement SearchView in Android. The sample data used in this project will be generated explicitly for demo purposes.

### C). Prerequisites
To follow through this tutorial, you'll need to:
- Have [Android Studio](https://developer.android.com/studio) IDE installed on your machine.
- Be dexterous in creating Android applications with: 
    - [Kotlin](https://developer.android.com/kotlin).
    - [Constraint Layout](https://developer.android.com/training/constraint-layout).
    - [Data Binding](https://www.section.io/engineering-education/how-to-use-databinding-in-android-using-kotlin/).

### D). Getting started
First, fire up Android Studio and create an `Empty Activity` project. If you are familiar with creating projects and setting up a RecyclerView, you can jump to `step (H)`.

#### i). Project structure
When the build process is done, expand the package under `app/java/"package-name"` and create three packages named, `adapter`, `model`, and `view` respectively. 

They should look like this.

![packages-image](/engineering-education/implementing-search-view-in-android/directories-collapsed.png)

This aids in organizing the project such that related files belong to the same category. This way robust, production-quality apps can be built rapidly. You can learn more about application architecture [here](https://developer.android.com/jetpack/guide).

With that said, drag and drop the `MainActivity.kt` file into the `view` package.

#### ii). Setting up plugins
Since we're going to use dataBinding, open `build.gradle(Module)` file and add the following plugin inside the plugins scope.

```bash
plugins {
    id 'kotlin-kapt'
}
```

This plugin comes with utilities responsible for dataBinding and needs to be enabled so that it can be used. Add the following inside the Android block (in the same file).

```bash
android {
    ...

    buildFeatures{
       dataBinding true
    }
}
```

Sync the project and wait for the build to finish.

### E). Creating the User Interface
We only need two views in the UI, a SearchView and a RecyclerView. Paste the following code into the `activity_main.xml` file to create them. 

```xml
<SearchView
    android:id="@+id/searchView"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_margin="10dp"
    android:background="#55F5F5F5"
    android:elevation="1dp"
    android:queryHint="Search"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<androidx.recyclerview.widget.RecyclerView
    android:id="@+id/recyclerView"
    android:layout_width="0dp"
    android:layout_height="0dp"
    android:layout_marginVertical="10dp"
    app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="@id/searchView"
    app:layout_constraintHorizontal_bias="0.0"
    app:layout_constraintStart_toStartOf="@id/searchView"
    app:layout_constraintTop_toBottomOf="@+id/searchView" />
```

Remember to enclose the root viewGroup with `<layout> </layout>` tag to generate a binding class for this XML file.

Next, we need to create an item that will be populated in the RecyclerView. Create an xml `layout` file named `row_item.xml` and paste the following code in it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginVertical="10dp"
        android:background="#90F5F5F5"
        android:paddingVertical="10dp">

        <TextView
            android:id="@+id/name"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="20sp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.15"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:text="Eric gacoki" />

        <TextView
            android:id="@+id/age"
            android:layout_width="wrap_content"
            android:layout_height="0dp"
            android:textSize="20sp"
            app:layout_constraintBottom_toBottomOf="@+id/name"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.75"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="@+id/name"
            app:layout_constraintVertical_bias="0.0"
            tools:text="19" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

This creates two `TextViews` that will display a person's name and age respectively. The actual data will be fetched and bound at runtime.

Preview: 

![row-item-image](/engineering-education/implementing-search-view-in-android/row-item.png)

To preview how this will appear in a RecyclerView at runtime, add the following attribute inside the RecyclerView tag.

```xml
<androidx.recyclerview.widget.RecyclerView
    ...

    tools:listitem="@layout/row_item" />
```

Preview: 

![recyclerview-preview-image](/engineering-education/implementing-search-view-in-android/main-ui.png)

### F). Creating the data model
A model is an independent component that is responsible for handling the data of an application. In our case, we need to use a list of data that is of the type `Person`. The `Person` data class holds two non-nullable variables, name and age.

Go ahead and create a data class inside the model package and paste the following code just below the package name.

```kotlin
data class Person(
    val name: String,
    val age: Int
)
```

### G). Setting up RecyclerView adapter
A RecyclerView is a flexible widget that can bind a variety of data with respect to its type. However, there's no specific type of data that should be provided to it. An adapter helps us prepare the RecyclerView to handle the given data. 

Inside the adapter package (created at step D(i)), create a Kotlin class named `PersonAdapter`. This class will extend a RecyclerView adapter and accept an `ArrayList` of type `Person` (the data class created in the previous step). 

Unlike a List, an ArrayList supports the addition and deletion of elements at runtime which is why we're using it.

Copy and paste the code below in the `PersonAdapter.kt` file:

```kotlin
class PersonAdapter(
    var list: ArrayList<Person>
) : RecyclerView.Adapter<PersonAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        return ViewHolder(
            RowItemBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(
            list[position]
        )
    }

    override fun getItemCount(): Int = list.size

    inner class ViewHolder(private var item: RowItemBinding) : RecyclerView.ViewHolder(item.root) {
        fun bind(person: Person) {
            item.name.text = person.name.trim()
            item.age.text = person.age.toString().trim()
        }
    }
}
```

Press `Alt`+`Enter` to fix missing imports. The code above enables the RecyclerView to bind views and populate them with data in the order it appears in the ArrayList. This [tutorial](https://developer.android.com/reference/android/widget/Adapter) elaborates further on how an Adapter works.

### H). How the linear search algorithm works
Just like any other task, searching is a process that requires a series of steps to be performed. In this tutorial, we'll make use of the `Linear search algorithm`. 

First set up two lists, one containing all the data under consideration, and leave the other one empty. We'll therefore loop through the elements in the first list comparing each content with the given keyword. 

In this case, the keyword is the `text` typed by the user in the SearchView. If a match is found, the element containing the match is cloned into the second list and the RecyclerView is updated with the new list. 

When working with a relatively large list or a list of unknown size, it is recommended to update the RecyclerView every time a match is found. 

Otherwise, the app might land into an `ANR` (App Not Responding) situation due to high memory consumption. Also, the newly created list should be cleared when not required for the same reason.

### I). Implementing search algorithm
Moving on, open the `MainActivity.kt` file and paste the following code sequentially as shown.

#### i). Just before the onCreate function
```kotlin
class MainActivity : AppCompatActivity() {

    private var _binding: ActivityMainBinding? = null
    private val binding get() = _binding!!

    private var people: ArrayList<Person> = arrayListOf()
    private var matchedPeople: ArrayList<Person> = arrayListOf()
    private var personAdapter: PersonAdapter = PersonAdapter(people)

    ...
}
```

This declares private global variables that we'll use later. The `people` and `matchedPeople` ArrayLists will hold all data and matched data respectively as explained in `step (H)`.

#### ii). Inside the onCreate function
This is where we bind the UI and the logic of the App.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    _binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
}
```

#### iii). Initialization stage
Here, we need to initialize the RecyclerView and prepare the SearchView. To do so, paste the following code just below `onCreate()`.

```kotlin
private fun initRecyclerView() {

    people = arrayListOf(
        Person("Eric G", 19),
        Person("Reen", 19),
        Person("Jeff", 21),
        Person("Geoffrey", 19),
        Person("Lorem ipsum", 35),
        Person("Paul N", 23),
        Person("Diana", 20),
        Person("Peter", 24),
        Person("Amos", 41),
        Person("Steve", 17),
    )

    personAdapter = PersonAdapter(people).also {
        binding.recyclerView.adapter = it
        binding.recyclerView.adapter!!.notifyDataSetChanged()
    }
    binding.searchView.isSubmitButtonEnabled = true
}
```

In this function, we have initialized the `people` list with ten entities of type `Person`. This list can be as large as desired.

```kotlin
private fun performSearch() {
    binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
        override fun onQueryTextSubmit(query: String?): Boolean {
            search(query)
            return true
        }

        override fun onQueryTextChange(newText: String?): Boolean {
            search(newText)
            return true
        }
    })
}
```

Remember to call the above two functions in the `onCreate()` method as shown in the snippet below.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    ...

    initRecyclerView()
    performSearch()
}
```

#### iv). Understanding the logic behind performSearch function
Have you been wondering how the SearchView knows when the user has typed something? Well, a searchView has an inbuilt function, `setOnQueryTextListener()` that accepts an object of type `OnQueryTextListener` as the argument.

This object is an `interface`, a member of `SearchView` class and contains two member functions, `onQueryTextSubmit()` and `onQueryTextChange()`. 

The two accept a nullable parameter of the type String and must be implemented using the `override` keyword when using the interface.

As the name suggests, `onQueryTextSubmit()` is called when the user clicks the submit button of the SearchView. On the other hand, `onQueryTextChange()` is called every time the text in the SearchView changes. 

The change may be due to the addition or deletion of characters. All in all the two functions call another function, `search()` discussed below.

```kotlin
private fun search(text: String?) {
    matchedPeople = arrayListOf()

    text?.let {
        people.forEach { person ->
            if (person.name.contains(text, true) ||
                person.age.toString().contains(text, true)
            ) {
                matchedPeople.add(person)
            }
        }
        updateRecyclerView()
        if (matchedPeople.isEmpty()) {
            Toast.makeText(this, "No match found!", Toast.LENGTH_SHORT).show()
        }
        updateRecyclerView()
    }
}
```

First, the `matchedPeople` list is cleared or set to an empty arrayList to avoid accumulation of the previous search. If the argument for parameter `text` is not null, a loop is performed for each element in the `people` list to check if the person's name or age contains `text`(query). 

By default, the `contains()` function is sensitive to the case and order of characters in the query. When a match is found, the current person is added to a new list as discussed in `step (H)` above. If no match is found, a toast is shown indicating the same.

In our scenario, the list is relatively small making it suitable to update the RecyclerView after the loop. Otherwise we'd need to call `updateRecyclerView()` function each time a match is found.

#### v). updateRecyclerView() explained
```kotlin
private fun updateRecyclerView() {
        binding.recyclerView.apply {
            personAdapter.list = matchedPeople
            personAdapter.notifyDataSetChanged()
        }
    }
```

This function is responsible for updating the RecyclerView once the check is done. Something a little fancy is that `empty` and `null` are not synonymous! 

A length of zero is considered empty not null. This means that the search function will be called when the length of query text changes from 1 to 0. 

The problem is that nothing will be filtered out and this will result in a 100% match, therefore a clone of the original list will be returned. 

This is not always desired as it can lead to extreme memory consumption. 

It can be avoided by doing either of the following:
- Restricting the search function to only run when the length of the query is greater than zero.
- Disabling `onQueryTextChange()` method by keeping its body empty.

Finally this is how the app should look like:

![results-image](/engineering-education/implementing-search-view-in-android/results.png)

### Conclusion
In this tutorial, we have learned how to create and use a SearchView to filter data in a RecyclerView in Android. This is a good way to improve the overall performance of the application. 

The source code for this tutorial can be found in this [GitHub repository](https://github.com/Ericgacoki/SearchView).

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)