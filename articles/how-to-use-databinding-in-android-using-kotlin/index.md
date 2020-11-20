If you wonder whether there is a way to link the `UI` directly to the `data source`, you are in the right place. Repeating the dreaded `findViewbyID` statement in your code is so boring. It takes so much time that you may even forget your variables&#39; IDs. Well, there is a solution. It&#39;s called `data binding`. We will learn how to implement this concept in this tutorial.

### Introduction

Without going any further, it&#39;s essential to understand what `data binding` is and it's advantages. The `data binding library` is part of Android [Jetpack](https://developer.android.com/jetpack?gclid=CjwKCAiA7939BRBMEiwA-hX5J_CccPJR43xoH9ZS_RjsiGrlztDm11gCNpp3dD1qsmhtknCk06NXSBoCnmEQAvD_BwE&gclsrc=aw.ds) utilities. According to the Android Developer Documentation, the `data binding` library allows users to bind `layouts` and `UI` components to data sources declaratively.

The `data binding` library seeks to eliminate something like this:

```
findViewByIdR.id.name).apply {
text = viewModel.name
}
```

And introduce something like this.

```
TextView
     android:text="@{viewmodel.name}";
```

### The goal of the tutorial

In this project, we will create a simple `Notes app` in Android using `Kotlin`. As you guessed, the app will make use of the `data binding library`. At the end of the tutorial, your application should be similar to the one shown in the video.

<iframe width="478" height="269" src="https://www.youtube.com/embed/HJP8cuwBAh8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Prerequisites

Note that this tutorial is directed to those who have some experience in android programming using `Kotlin`. You can download the full source code [here]

### 1. Installing the required dependencies

Launch android studio and create a new project. Once the project is ready, go to the `Gradle scripts` folder and open `build.gradle (module: app)`. Add `buildFeatures` and set `databinding` as `true`. This notifies the Android system that our app uses data binding. Therefore, the proper files will be generated.

```
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

In the same `build.gradle` file, add the `lifecycle` library to your `dependencies`. This library will help connect the `UI` to a `ViewModel` and `LiveData`. You care read more about `MVVM` architecture [here](https://www.section.io/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/).

```
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

```
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
```

### 2. Model

In your primary folder, please create a new package and name it as a `model`. Then create a `Note.kt` file in this package. As shown, the `data class NoteItem` only holds two variables (`title` and `description`). These values are required whenever the class is initialized.

```
package com.wanja.notesapp.model

data class NoteItem(
    var title: String,
    var description: String
)
```

### 3. ViewModel

The `ViewModel` makes it easy to update data changes on the `UI`. It also protects the data from being destroyed when the screen orientation changes. Create a package named `viewmodels` in your main folder. Generate a new file name it `MainViewModel.kt`. The file will contain the following variables.

```
    val isStringEmpty = MutableLiveData<Boolean>()
    @Bindable
    val inputTitle = MutableLiveData<String>()
    @Bindable
    val inputDescription = MutableLiveData<String>()
    val list = MutableLiveData<ArrayList<NoteItem>>()
    private val arraylst = ArrayList<NoteItem>()
```

The `isStringEmpty` variable is a `Boolean`. It will help determine whether or not the user&#39;s input is empty. The `inputTitle` and `inputdescription` will store the user&#39;s data. The values stored in these variables will change according to the user&#39;s input since we are using `MutableLiveData`. The list will store the `NoteItem arraylist`. It&#39;s capable of refreshing itself when it detects that the arraylist&#39;s contents have changed.

The `NotesViewModel` also contains three major methods; `init`, `addData`, and `clearData`.

The `init` method will initialize the `isStringEmpty` variable by assigning it with the value of `false`. This method launches automatically once the `NotesViewModel` is created.

```
    init {
        isStringEmpty.value = false
    }
```

The `addData` method takes the user input and checks if it is empty. The `isStringEmpty` variable is updated to `true` if the data is empty. Else, the data is entered into a `NoteItem` object and passed to the `arraylst`. The `arraylst` is then stored in `list.`

```
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

```
    fun clearData(){
        arraylst.clear()
        list.value = arraylst
    }
```

Note: To use the `bindable` component, the `NotesViewModel` must extend the `Observable` class. You will then need to implement the methods below.

```
    override fun addOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback?) {
    }

    override fun removeOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback?) {
    }
```

Your final NotesViewModel should look as follows.

```
package com.wanjamike.co.notesapp.viewmodel

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

This class helps initialize the `ViewModel`. The `ViewModelFactory` is particularly vital if your application uses multiple viewmodels.

In the same `viewmodels` package, create a file named `NotesViewModelFactory` and add the code below. The `NotesViewModel` will throw an Exception in case the ViewModel is not found.

```
package com.wanjamike.co.notesapp.viewmodel

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

Let&#39;s create the app `UI` before finalizing with the `MainActivity`. Since this is a `Notes App`, we need to allow the user to `enter`, `save`, and `clear` data. Therefore, the application will have two `EditTexts` and `two Buttons`. Whatever the user types will be displayed in a `TextView` on the click of the `submit` button. The app UI is shown below.

To include `data binding` in the UI, enclose all content with `<layout></layout>.` The `ViewModel` is introduced to the `layout` in the `<data></data>` section, as shown. Ensure that the `type` value points to the specific folder that has the required `ViewModel`.

```
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

//other UI components
</layout>
```

The `EditText` widgets will be bound to the NotesViewModel using `@={NotesViewModel.inputTitle}` statement.

```
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

The `submit` and `clear` buttons will connect to the NotesViewModel by `@{()->NotesViewModel.addData()}` statement. This is illustrated below.

```
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

We will use the TextView with the id of `content` to display the user&#39;s input. Here is the full code for the activity\_main.xml.

```
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

<!--       android:onClick="@{()->CrudViewModel.saveOrUpdate()}"-->

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

In this class, we need to initialize the `NotesViewModel` and the `ActivityMain` data binding. The `lateinit` allows variables to be initialized at a later stage. The `NotesViewModelFactory` is initialized first and then passed to the `NotesViewModel` as a parameter. The `databinding` is also assigned the required `viewmodel` and `lifecycleowner`.

```
 databinding = DataBindingUtil.setContentView(this,R.layout.activity_main)
 val factory = NotesViewModelFactory()         
 viewModel = ViewModelProviders.of(this, factory).get(NotesViewModel::class.java)
 databinding.notesViewModel = viewModel
 databinding.life
```

We will observe the list in the NotesViewModel using the following commands.

```
        viewModel.list.observe(this, Observer{
            databinding.content.text = it.toString()
    })
```

We will observe the `isStringEmpty` variable to determine if the user has clicked the `submit` button without entering data. A `Toast` message will appear in case the user inputs are empty.

```
 viewModel.isStringEmpty.observe(this, Observer{
            if(it==true){
                Toast.makeText(this, "No Notes Detected",Toast.LENGTH_SHORT).show();
            }
        })
```

The completed `MainActivity.kt` is shown below.

```
package com.wanja.notesapp

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

When you run your application, it should show appear as in the video below.

<iframe width="478" height="269" src="https://www.youtube.com/embed/HJP8cuwBAh8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion

As a developer, data binding will allow you to save time by eliminating boilerplate code. The UI components are updated automatically in case of any data changes. This functionality enables you to create high quality and productive applications.

### References

[Android Developer Documentation](https://developer.android.com/topic/libraries/data-binding/start)