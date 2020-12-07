---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-use-databinding-in-android-using-kotlin/
title: Databinding in Android using Kotlin
description: In this tutorial we will learn how to implement data binding in Andriod using Kotlin.
author: michael-barasa
date: 2020-12-03T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-use-databinding-in-android-using-kotlin/hero.png
    alt: Databinding Android Kotlin image
---
If you have ever wondered if there is a way to link the `UI` directly to the `data source`?  You are in the right place. Repeating the dreaded `findViewbyID` statement in your code can be tedious.
<!--more-->
It takes so much time that one may end up forgetting variables' IDs. Well, there is a solution. That solution is `data binding`. We will learn how to implement this concept in this tutorial.

### Introduction
Without going any further, it's essential to understand what `data binding` is and it's advantages. The `data binding library` is part of Android [Jetpack](https://developer.android.com/jetpack?gclid=CjwKCAiA7939BRBMEiwA-hX5J_CccPJR43xoH9ZS_RjsiGrlztDm11gCNpp3dD1qsmhtknCk06NXSBoCnmEQAvD_BwE&gclsrc=aw.ds) utilities.

According to the Android developer documentation, the `data binding` library allows users to bind `layouts` and `UI` components to data sources declaratively.

The `data binding` library seeks to eliminate something like this:

```Kotlin
findViewById(R.id.name).apply {
text = viewModel.name
}
```

By introducing this.

```Xml
<TextView
     android:text="@{viewmodel.name}"/>
```

### The goal of the tutorial
In this project, we will create a simple `Notes app` in Android using `Kotlin`. As you guessed, the app will make use of the `data binding` library.

At the end of the tutorial, your application should be similar to the one shown in the video below.

<iframe width="478" height="269" src="https://www.youtube.com/embed/HJP8cuwBAh8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Prerequisites
This tutorial is intended for those who have some experience in Android programming using `Kotlin`. You can download the full source code [here](https://github.com/WanjaMIKE/SimpleNotesApp).

### 1. Installing the required dependencies
Launch Android studio and create a new project. Once the project is ready, go to the `Gradle scripts` folder and open `build.gradle (module: app)`.

Add `buildFeatures` and set `databinding` to `true`. This notifies the `Android` system that our app uses data binding. Therefore, the proper files will be generated.

```bash
buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        buildFeatures {
            dataBinding true
        }
    }
}
```

In the same `build.gradle` file, add the `lifecycle` library to your `dependencies`. This library helps connect the `UI` to a `ViewModel` and `LiveData`.

Read more about `MVVM` architecture [here](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/).

```bash
dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
    implementation 'androidx.lifecycle:lifecycle-extensions:2.2.0'
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'com.google.android.material:material:1.2.0'
}
```

Remember to add `apply plugin: kotlin-kapt` at the top of the file.

```bash
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
```

### 2. Model
In your primary folder, create a new package and name it `model`. Then create a `Note.kt` file in this package.

As shown, the data class `NoteItem` only holds two variables (`title` and `description`). These values are required to initialize the class.

```Kotlin
data class NoteItem(
    var title: String,
    var description: String
)
```

### 3. ViewModel
The `ViewModel` makes it easy to update data changes on the `UI`.

Create a package named `viewmodels` in your main folder.

Then create a new file and name it `MainViewModel.kt`. The file will contain the following variables.

```Kotlin
    val isStringEmpty = MutableLiveData<Boolean>()
    @Bindable
    val inputTitle = MutableLiveData<String>()
    @Bindable
    val inputDescription = MutableLiveData<String>()
    val list = MutableLiveData<ArrayList<NoteItem>>()
    private val arraylst = ArrayList<NoteItem>()
```

The `isStringEmpty` variable is a `Boolean`. It will help determine whether or not the user's input is empty.

The `inputTitle` and `inputdescription` variables will store the user's data. The values stored in these variables will change according to the user's input; hence, we use `MutableLiveData`.

The list will store the `NoteItem arraylst`. It's capable of refreshing itself when it detects a change in its content.

The `NotesViewModel` also contains three important methods; `init`, `addData`, and `clearData`.

The `init` method will initialize the `isStringEmpty` variable to `false`. This method launches automatically once the `NotesViewModel` is created.

```Kotlin
    init {
        isStringEmpty.value = false
    }
```

The `addData` method takes the user input and checks if it's empty.

The `isStringEmpty` variable is updated to `true` if the data is empty.

Otherwise, the data is entered into a `NoteItem` object and passed to the `arraylst`.

The `arraylst` is then stored in `list.`

```Kotlin
 fun addData() {
        val title = inputTitle.value!!
        val description = inputDescription.value!!
        if(title.isBlank()|| description.isBlank()){
            isStringEmpty.value = true
        }else{
            inputTitle.value = " "
            inputDescription.value = " "
            var noteItem =NoteItem(title, description)
            arraylst.add(noteItem)
            list.value = arraylst
        }

    }
```

The `clearData` function resets the `arraylst` and `list`, as shown below.

```Kotlin
    fun clearData(){
        arraylst.clear()
        list.value = arraylst
    }
```

*Note: To use the `bindable` component, the `NotesViewModel` must extend the `Observable` class. You will then need to implement the methods below.*

```Kotlin
    override fun addOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback?) {
    }

    override fun removeOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback?) {
    }
```

Your final `NotesViewModel` file should look like this.

```Kotlin
import androidx.databinding.Bindable
import androidx.databinding.Observable
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.wanja.notesapp.model.NoteItem

import java.util.*
import kotlin.collections.ArrayList

class NotesViewModel(): ViewModel(), Observable {
    val isStringEmpty = MutableLiveData<Boolean>()
    @Bindable
    val inputTitle = MutableLiveData<String>()
    @Bindable
    val inputDescription = MutableLiveData<String>()
    val list = MutableLiveData<ArrayList<NoteItem>>()
    private val arraylst = ArrayList<NoteItem>()

    init {
        isStringEmpty.value = false
    }

    fun addData() {
        val title = inputTitle.value!!
        val description = inputDescription.value!!
        if(title.isBlank()|| description.isBlank()){
            isStringEmpty.value = true
        }else{
            inputTitle.value = " "
            inputDescription.value = " "
            var noteItem =NoteItem(title, description)
            arraylst.add(noteItem)
            list.value = arraylst
        }

    }

    fun clearData(){
        arraylst.clear()
        list.value = arraylst
    }

    override fun addOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback?) {
    }

    override fun removeOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback?) {
    }
}
```

### 4. ViewModelFactory
In the same `viewmodels` package, create a file named `NotesViewModelFactory` and add the code below.

The `NotesViewModelFactory` will throw an Exception in case the ViewModel is not found.

```Kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import java.lang.IllegalArgumentException

class NotesViewModelFactory(): ViewModelProvider.Factory{
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if(modelClass.isAssignableFrom(NotesViewModel::class.java)){
            return NotesViewModel() as T
        }
        throw IllegalArgumentException ("UnknownViewModel")
    }
}
```

### 5. User Interface
Let's create the app UI before finalizing with the `MainActivity`.

Since this is a Notes App, we need to allow the user to enter, save, and clear data. Therefore, the application will have two `EditTexts` and two `Buttons`.

Whatever the user types will be displayed in a `TextView` on the click of the `submit` button. The app UI is shown below.

To include `data binding` in the UI, enclose all content with `<layout></layout>.`

The `ViewModel` is introduced to the `layout` in the `<data></data>` section, as shown. Ensure that the `type` value points to the specific folder that has the required `ViewModel`.

```Xml
<layout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    >

<data>
    <variable
        name="NotesViewModel"
        type="com.wanjamike.co.notesapp.viewmodel.NotesViewModel" />
</data>

<!--other UI components-->
</layout>
```

The `EditText` widgets will be bound to the `NotesViewModel` using `@={NotesViewModel.inputTitle}` statement.

```Xml
 <EditText
        android:id="@+id/editTextTextPersonName2"
        android:layout_width="match_parent"
        android:layout_marginEnd="40dp"
        android:layout_marginStart="40dp"
        android:layout_height="wrap_content"
        android:layout_marginBottom="36dp"
        android:text="@={NotesViewModel.inputTitle}"
        android:ems="10"
        android:inputType="textPersonName"
        android:hint="Description" />

<EditText
        android:id="@+id/editTextTextPersonName"
        android:layout_width="match_parent"
        android:layout_marginEnd="40dp"
        android:layout_marginStart="40dp"
        android:layout_height="wrap_content"
        android:layout_marginBottom="24dp"
        android:ems="10"
        android:text="@={NotesViewModel.inputDescription}"
        android:inputType="textPersonName"
        android:hint="Title" />
```

The `submit` and `clear` buttons will connect to the NotesViewModel by `@{()->NotesViewModel.addData()}` statement.

This is illustrated below.

```Xml
 <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:backgroundTint="@color/colorAccent"
        android:layout_gravity="center"
        android:layout_marginEnd="20dp"
        android:onClick="@{()->NotesViewModel.addData()}"
        android:text="Submit"/>

<Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:backgroundTint="#E91E63"
        android:layout_gravity="center"
        android:layout_marginStart="20dp"
        android:onClick="@{()->NotesViewModel.clearData()}"
        android:text="Clear"/>
```

We'll use the `TextView` with the ID `content` to display the user's input.

Here is the full code for the `activity_main.xml`.

```Xml
<?xml version="1.0" encoding="utf-8"?>

<layout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    >

<data>
    <variable
        name="NotesViewModel"
        type="com.wanjamike.co.notesapp.viewmodel.NotesViewModel" />
</data>

<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="16dp"
        android:text="Enter Notes" />

    <EditText
        android:id="@+id/editTextTextPersonName2"
        android:layout_width="match_parent"
        android:layout_marginEnd="40dp"
        android:layout_marginStart="40dp"
        android:layout_height="wrap_content"
        android:layout_marginBottom="36dp"
        android:text="@={NotesViewModel.inputTitle}"
        android:ems="10"
        android:inputType="textPersonName"
        android:hint="Description" />

    <EditText
        android:id="@+id/editTextTextPersonName"
        android:layout_width="match_parent"
        android:layout_marginEnd="40dp"
        android:layout_marginStart="40dp"
        android:layout_height="wrap_content"
        android:layout_marginBottom="24dp"
        android:ems="10"
        android:text="@={NotesViewModel.inputDescription}"
        android:inputType="textPersonName"
        android:hint="Title" />


   <LinearLayout
       android:layout_gravity="center"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content">
       <Button
           android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:backgroundTint="@color/colorAccent"
           android:layout_gravity="center"
           android:layout_marginEnd="20dp"
           android:onClick="@{()->NotesViewModel.addData()}"
           android:text="Submit"/>

       <Button
           android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:backgroundTint="#E91E63"
           android:layout_gravity="center"
           android:layout_marginStart="20dp"
           android:onClick="@{()->NotesViewModel.clearData()}"
           android:text="Clear"/>
   </LinearLayout>


    <View
        android:id="@+id/divider"
        android:layout_width="match_parent"
        android:layout_height="2dp"
        android:layout_marginTop="10dp"
        android:layout_marginBottom="10dp"
        android:background="?android:attr/listDivider" />

    <TextView
        android:id="@+id/content"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:hint="Content Appears here"
        android:textSize="18dp"
        android:letterSpacing="0.1"
        android:padding="10dp"
        android:layout_marginBottom="4dp" />
</LinearLayout>
</layout>
```

### 6. MainActivity
In this class, we need to initialize the `NotesViewModel` and the `ActivityMain` data binding.

The `lateinit` allows variables to be initialized at a later stage.

The `NotesViewModelFactory` is initialized first and then passed to the `NotesViewModel` as a parameter.

The `databinding` is also assigned the required `viewmodel` and `lifecycleowner`.

```Kotlin
 databinding = DataBindingUtil.setContentView(this,R.layout.activity_main)
 val factory = NotesViewModelFactory()         
 viewModel = ViewModelProviders.of(this, factory).get(NotesViewModel::class.java)
 databinding.notesViewModel = viewModel
 databinding.life
```

We will observe the list in the `NotesViewModel` using the following commands.

```Kotlin
        viewModel.list.observe(this, Observer{
            databinding.content.text = it.toString()
    })
```

We'll observe the `isStringEmpty` variable to determine if the user has clicked the `submit` button without entering data. A `Toast` message will appear in case the user inputs are empty.

```Kotlin
 viewModel.isStringEmpty.observe(this, Observer{
            if(it == true){
                Toast.makeText(this, "No Notes Detected",Toast.LENGTH_SHORT).show();
            }
        })
```

The complete `MainActivity.kt` is shown below.

```Kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.wanja.notesapp.databinding.ActivityMainBinding
import com.wanjamike.co.notesapp.viewmodel.NotesViewModel
import com.wanjamike.co.notesapp.viewmodel.NotesViewModelFactory

class MainActivity : AppCompatActivity() {
    private lateinit var viewModel: NotesViewModel
    private lateinit var databinding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        databinding = DataBindingUtil.setContentView(this,R.layout.activity_main)
        val factory = NotesViewModelFactory()
        viewModel = ViewModelProviders.of(this, factory).get(NotesViewModel::class.java)
        databinding.notesViewModel = viewModel
        databinding.lifecycleOwner = this
        viewModel.list.observe(this, Observer{
            databinding.content.text = it.toString()
    })
        viewModel.isStringEmpty.observe(this, Observer{
            if(it==true){
                Toast.makeText(this, "No Notes Detected",Toast.LENGTH_SHORT).show();
            }
        })
    }
}
```

When you run your application, it should appear as in the video below.

<iframe width="478" height="269" src="https://www.youtube.com/embed/HJP8cuwBAh8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion
As a developer, data binding will allow you to save time by eliminating boilerplate code. The UI components are updated automatically in case of any data changes. This functionality enables you to create both high quality and productive applications.

### References
[Android Developer Documentation](https://developer.android.com/topic/libraries/data-binding/start)

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
