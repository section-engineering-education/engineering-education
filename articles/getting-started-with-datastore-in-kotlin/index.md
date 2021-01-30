# Getting started with Preference DataStore in Kotlin

![image ](/engineering-education/getting-started-with-datastore-in-kotlin/blog-image.jpg)

In this tutorial, you will learn how Jetpack DataStore works. We will work on how to change the UI mode of an app.

**Prerequisites;**
- Creating projects in android studio.
- Good understanding of Kotlin(we will use it as the primary language)

**Topics to be covered**
- What is jetpack datastore
- key differences between datastore and SharedPreferences
- how to implement datastore preferences

### Introduction
DataStore is an improved data storage solution by Google to replace SharedPreferences for persisting simple pieces of data such as key-value pairs or typed objects with protocol buffers.
Datastore uses Kotlin coroutines and flow to store data asynchronously, consistently, transactionally, and even handle data corruption. It works well with small simple datasets. If you are working with large/complex datasets, consider using [Room](https://developer.android.com/training/data-storage/room). This way you will not worry about referential integrity or partial updates.

#### Shifting from SharedPreferences

SharedPreferences is common among developers, but people are finding better solutions to store data that are more powerful and efficient. It has a few drawbacks that make it a little bit complex to work with.
If you have worked with Sharedpreferences you might have gotten an ANR(Application Not Responding) on your app. The most common reason is the long-running tasks on the main UI-thread. This is because when using the app, you try to access the value of a particular key as soon as the app launches. With all that, you have to access Sharedpreferences to read the whole file no matter how large it is, bring the data in memory while all this is happening on the UI thread.

## Why datastore?
- It uses key-value pairs to store simple data.
- Safe to call from the UI thread because the work is moved to Dispatchers.IO
- It is safe from runtime exceptions.
- Handles data migration.
- Has transactional API with strong consistency guarantees.

**Datastore provides two implementations:**
- Preference DataStore - stores key-value pairs. it is pretty similar to Sharedpreferences
- Proto DataStore - stores typed objects. this is by storing data as instances of a custom data type

**Less talk, show me the code**
We will be adding jetpack datastore to a project to change the UI mode, ie, from light to dark.


### Step 1: adding dependencies

Add the following dependency to your build.gradle in your app level
```kotlin
// Preference DataStore
    implementation "androidx.datastore:datastore-preferences:1.0.0-alpha04"
```

other important dependencies

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

### **Code explanation**
**1: creating the datastore.**
The 1st line basically creates a datastore using the file name `"ui_mode_preference"`. The `createDataStore()` function is extension function created on Context.

**2: writing to the datastore.**
Preference DataStore provides the `.edit()` function to make it easier to update data. This method will save the UI mode from our activity.

**3: Reading data from the datastore**
DataStore exposes the stored data in a `Flow` in the preferences object which will emit values whenever the preferences are updated. It also ensures that the data is retrieved on `Dispatcher.IO`. we use `map{}` because we are mapping boolean values(remember we are storing boolean values in our datastore).

**4: storing preference using a key.**
We have created a key `UI_MODE_KEY` which will store the boolean value for either the light or dark mode. Preferences.preferencesKey() defines a key for each value that you need to store in the `DataStore<Preferences>`


### Step 3: Creating ViewModel class
Create a new ViewModel class called UIViewModel

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

**1:Reading from the datastore**
the 1st line gets the UI mode from the datastore.

**2: Writing from the datastore**
Since the `saveToDataStore()` from the datastore preference class is a suspend function, it can only be called from a coroutine scope. That is why we use viewModelScope.

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

**1: Updating preferences**

Using `setUIMode()`, we are updating the state of the preference if the icon is checked.
we are updating the image icon and the background colour so that the UI is changed.

Once you are done, run the app. Here is what you would expect.
![light mode](/engineering-education/getting-started-with-datastore-in-kotlin/light-mode.png)
![dark mode](/engineering-education/getting-started-with-datastore-in-kotlin/dark-mode.png)


You can check out the entire project on [GitHub]( https://github.com/carolinemusyoka/NoteApp)

**Resources**
- [Google Developer`s Blog](https://android-developers.googleblog.com/2020/09/prefer-storing-data-with-jetpack.html)
- [Official Documentation](https://developer.android.com/topic/libraries/architecture/datastore)

**Conclusion.**
The Google team is trying to make android development a little bit easier each day by rolling out new and improved libraries.
They may change or deprecate from time to time and learning about these tools can put us ahead of the curve. So keep learning.


Happy coding!!






