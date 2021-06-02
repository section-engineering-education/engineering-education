---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-datastore-in-kotlin/
title: Getting Started with Preference DataStore in Kotlin
description: In this tutorial, we will learn how Jetpack DataStore works. We will work on how to change the UI mode of an app. Datastore uses Kotlin coroutines and flow to store data asynchronously, consistently, transactionally, and to handle data corruption.
author: carol-musyoka
date: 2021-02-21T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-datastore-in-kotlin/hero.jpg
    alt: DataStore in Kotlin example image
---
DataStore is an improved data storage solution by Google to replace SharedPreferences for persisting simple pieces of data such as key-value pairs or typed objects with protocol buffers.
<!--more-->
In this tutorial, we will learn how Jetpack DataStore works. We will work on how to change the UI mode of an app.
### Introduction
Datastore uses Kotlin coroutines and flow to store data asynchronously, consistently, transactionally, and to handle data corruption. It works well with small simple datasets. 

If you are working with large/complex datasets, consider using [Room](https://developer.android.com/training/data-storage/room). This way you will not have to worry about referential integrity or partial updates.

### Prerequisites
- Creating projects in Android Studio.
- Good understanding of Kotlin (as we will use it as our primary language).

### Topics to be covered
- What is Jetpack datastore.
- Key differences between datastore and SharedPreferences.
- How to implement datastore preferences.

#### Shifting from SharedPreferences
SharedPreferences is common among developers, but people are finding better solutions to store data that are more powerful and efficient. It has a few drawbacks that make it a little bit complex to work with.

If you have worked with Sharedpreferences you might have gotten an ANR (Application Not Responding) on your app. The most common reason is the long-running tasks on the main UI-thread. 

This is because when using the app, you try to access the value of a particular key as soon as the app launches. With all that, you have to access Sharedpreferences to read the whole file no matter how large it is, bring the data in memory while all this is happening on the UI thread.

### Why datastore?
- It uses key-value pairs to store simple data.
- Safe to call from the UI thread because the work is moved to Dispatchers.IO
- It is safe from runtime exceptions.
- Handles data migration.
- Has transactional API with strong consistency guarantees.

### Datastore provides two implementations
1. Preference DataStore - stores key-value pairs. It is pretty similar to Sharedpreferences
2. Proto DataStore - stores typed objects. This is by storing data as instances of a custom data type.

#### Less talk, show me the code
We will be adding Jetpack datastore to a project to change the UI mode, ie, from light to dark.

### Step 1: Adding dependencies
Add the following dependency to your build.gradle in your app level.

```kotlin
// Preference DataStore
    implementation "androidx.datastore:datastore-preferences:1.0.0-alpha04"
```

Other important dependencies.

```kotlin
// Architectural Components
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"

// Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.0'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.4.0'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.4.0'

    // Coroutine Lifecycle Scopes
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.2.0"
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:2.2.0"
```

We will see how all these play a role in the app later.

Make sure that you are using the latest version for the stable release of each of these dependencies.

The app is a simple one. We will work on a pre-existing app by changing its UI mode.

### Step 2: Creating a preference manager
Create a class called UIModePreference. This class holds the code that we will be using to read and write the data from the datastore.

```kotlin
package com.carolmusyoka.noteapp.data.datastore

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.preferencesKey
import androidx.datastore.preferences.createDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class UIModePreference(context: Context) {
 //1
    private val dataStore: DataStore<Preferences> = context.createDataStore(
        name = "ui_mode_preference"
    )
 //2
    suspend fun saveToDataStore(isNightMode: Boolean) {
        dataStore.edit { preferences ->
            preferences[UI_MODE_KEY] = isNightMode
        }
    }
 //3
    val uiMode: Flow<Boolean> = dataStore.data
        .map { preferences ->
            val uiMode = preferences[UI_MODE_KEY] ?: false
            uiMode
        }
 //4
    companion object {
        private val UI_MODE_KEY = preferencesKey<Boolean>("ui_mode")
    }

}
```

### Code explanation
#### Creating the datastore
The 1st line basically creates a datastore using the file name `"ui_mode_preference"`. The `createDataStore()` function is extension function created on Context.

#### Writing to the datastore
Preference DataStore provides the `.edit()` function to make it easier to update data. This method will save the UI mode from our activity.

#### Reading data from the datastore
DataStore exposes the stored data in a `Flow` in the preferences object which will emit values whenever the preferences are updated. It also ensures that the data is retrieved on `Dispatcher.IO`. we use `map{}` because we are mapping boolean values(remember we are storing boolean values in our datastore).

#### Storing preference using a key
We have created a key `UI_MODE_KEY` which will store the boolean value for either the light or dark mode. Preferences.preferencesKey() defines a key for each value that you need to store in the `DataStore<Preferences>`

### Step 3: Creating ViewModel class
Create a new ViewModel class called UIViewModel.

```kotlin
class UIViewModel(application: Application):
        AndroidViewModel(application){

    
    private val uiDataStore = UIModePreference(application)

    // 1
    val getUIMode = uiDataStore.uiMode

    // 2
    fun saveToDataStore(isNightMode: Boolean) {
        viewModelScope.launch(Dispatchers.IO) {
            uiDataStore.saveToDataStore(isNightMode)
        }
    }
}
```

#### Reading from the datastore
The 1st line gets the UI mode from the datastore.

#### Writing from the datastore
Since the `saveToDataStore()` from the datastore preference class is a suspend function, it can only be called from a coroutine scope. 

That is why we use viewModelScope.

### Step 4: Working with the mainactivity

```kotlin
override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.ui_menu, menu)

        // Set the item state
        lifecycleScope.launch {
            val isChecked = viewModel.getUIMode.first()
            val item = menu.findItem(R.id.action_night_mode)
            item.isChecked = isChecked
            setUIMode(item, isChecked)
        }
}
    

 
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here.
        return when (item.itemId) {
            R.id.action_night_mode -> {
                item.isChecked = !item.isChecked
                setUIMode(item, item.isChecked)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun setUIMode(item: MenuItem, isChecked: Boolean) {
        if (isChecked) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
            viewModel.saveToDataStore(true)
            item.setIcon(R.drawable.ic_night)

        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
            viewModel.saveToDataStore(false)
            item.setIcon(R.drawable.ic_day)

        }
    }


```

#### Updating preferences
Using `setUIMode()`, we are updating the state of the preference if the icon is checked. We are updating the image icon and the background colour so that the UI is changed.

Once you are done, run the app. 

Here is what you would expect.
![light mode](/engineering-education/getting-started-with-datastore-in-kotlin/light-mode.png)

![dark mode](/engineering-education/getting-started-with-datastore-in-kotlin/dark-mode.png)

You can check out the entire project on [GitHub](https://github.com/carolinemusyoka/NoteApp).

### Conclusion
The Google team is trying to make Android development a little bit easier each day by rolling out new and improved libraries.
They may change or deprecate from time to time and learning about these tools can put us ahead of the curve. 

So keep learning.

Happy coding!!

### Resources
- [Google Developer`s Blog](https://android-developers.googleblog.com/2020/09/prefer-storing-data-with-jetpack.html)
- [Official Documentation](https://developer.android.com/topic/libraries/architecture/datastore)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
