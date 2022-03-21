---
layout: engineering-education
status: publish
published: true
url: /prefilling-room-database-with-json-data-in-android/
title: Prefilling Room Database with JSON Data in Android
description: This tutorial will elaborate on Prefilling Room Database with JSON Data in Android.
author: benta-odek
date: 2022-03-21T00:00:00-21:53
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/prefilling-room-database-with-json-data-in-android/hero.jpg
    alt: Prefilling Room Database with JSON Data in Android Hero Image
---
Most of the time, when designing an app, developers strive to come up with a way to start with a database that already has data in it. Pre-populating the room database with data, which can be material from a prepared database (.db) files in the device's file system or even JSON data. In most cases, a REST query is used to retrieve data from the application backend, but this isn't the case with our application because it's standalone and we only need to have the APK file.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is Pre-populating Room Database with Initial Data](#what-is-pre-populating-room-database-with-initial-data)
- [Getting Started with Pre-populating Room Database](#getting-started-with-pre-populating-room-database)
- [Creating a new project](#step-1---creating-a-new-project)
- [Adding the Necessary dependencies](#step-2---adding-the-necessary-dependencies)
- [Defining the User Interface](#step-3---defining-the-user-interface)
- [Creating Room Database](#step-4---creating-room-database)
- [Adding JSON Data](#step-5---adding-json-data)
- [Creating a Prefilling Class](#step-6---creating-a-prefilling-class)
- [Attaching the callback to the Database](#step-7---attaching-the-callback-to-the-database)
- [Define Viewmodel](#step-8---define-viewmodel)
- [Displaying Data](#step-9---displaying-data)
- [When is it Necessary to Pre-populate a Room Database](#when-is-it-necessary-to-pre-populate-a-room-database)
- [Conclusion](#conclusion)

### Prerequisites
To read along with this tutorial you should:-
- Have a fundamental grasp of Android programming.
- Have a thorough knowledge of the Kotlin programming language.
- ViewModels concept as utilized in Android.

### Goals
This tutorial aims to explain what is pre-populating room database with initial data as used in android. what is a room Callback is and how is it added to the database? How to implement prefilling room database with data and when it is necessary to pre-populate a room database.

### What is Pre-populating Room Database with Initial Data
It is a technique in which an application is launched with existing data in its database, which might be prepared database(.db) files stored on the device's file system or even JSON data.

### Getting Started with Pre-populating Room Database.
In this scenario, let's make an app that functions similarly to a note app, with the exception that we'll just evaluate the note title and description.

### Step 1 - Creating a New Project
To create a new project with the Android Studio IDE, go to File > New > New Project. After that, choose an empty activity and click Next, as seen below. Select Kotlin as the language and click OK after giving the project a suitable name.

![new project](/engineering-education/prefilling-room-database-with-json-data-in-android/new-project.png)

### Step 2 - Adding the Necessary dependencies
Since we shall be working with the room database, we'll need the room database, coroutine, and Kotlin extension dependencies. Therefore, include the following in your `build.gradle` app-level file.
```Gradle
 // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.0'

    // Coroutine Lifecycle Scopes
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.1"
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.4.1"

    //Room Database
    def room_version = "2.4.0"
    implementation "androidx.room:room-runtime:$room_version"
    kapt "androidx.room:room-compiler:$room_version"

    // Kotlin Extensions and Coroutine support for Room
    implementation "androidx.room:room-ktx:2.4.2"
```
### Step 3 - Defining the User Interface
Let us define a user interface that makes use of `RecyclerView` to display the list of data stored in the database.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:gravity="center"
        android:orientation="vertical"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:spanCount="2"
        tools:listitem="@layout/notes_row" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/floatingActionButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        android:clickable="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:srcCompat="@android:drawable/ic_input_add" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
> Make sure to define your recyclerView row that would define how the data is shown in the `RecyclerView`.

### Step 4 - Creating Room Database
Room database is made up of three components: Entity, DAO, and Database. Let's define all three components:

#### Entity
Entity is a data class that functions similarly to a table. We will define an `Entity` that holds a note title and its description.

```kotlin
@Entity(tableName = "Notes_table")
data class NoteEntity(
    val noteTitle:String,
    val noteDescription:String,
    @PrimaryKey(autoGenerate = true)
    var id: Long = 0,
)
```
#### DAO
DAO is a Data Access Object that is used to access the database. It functions by using methods like insert, query, delete, and update.

```kotlin
@Dao
interface NoteDao {
    @Insert(on conflict = OnConflictStrategy.REPLACE)
    suspend fun insertNote(noteEntity: NoteEntity)

    @Delete
    suspend fun deleteNote(noteEntity: NoteEntity)

    @Update
    suspend fun update(noteEntity: NoteEntity)

    @Query("SELECT * FROM Notes_table ORDER BY id ASC")
     fun getAllNotes(): LiveData<List<NoteEntity>>
}
```
### Database
The database is an abstract class that makes use of the data access object instance to perform its functions and for that case, DAO instance should be included.

```kotlin
@Database(entities = [NoteEntity::class], version = 1)
abstract class NoteDatabase : RoomDatabase() {
    abstract val dao:NoteDao

    companion object{
        @Volatile
        private var instance:NoteDatabase? = null

        fun getInstance(context: Context):NoteDatabase?{
            if (instance == null){
                synchronized(NoteDatabase::class.java){
                    instance = Room.databaseBuilder(
                        context.applicationContext,
                        NoteDatabase::class.java,
                        "notes"
                    )
                        
                        .build()
                }
            }
            return instance
        }
    }
}
```
### Step 5 - Adding JSON Data
Here is the JSON data which will be prepopulated into our Room database:

```Json
[
  {
    "note-title":"Title one",
    "note-description":"Description one"
  },
  {
    "note-title":"Title two",
    "note-description":"Description two"
  },
  {
    "note-title":"Title three",
    "note-description":"Description three"
  },
  {
    "note-title":"Title four",
    "note-description":"Description four"
  },
  {
    "note-title":"Title five",
    "note-description":"Description five"
  },
  {
    "note-title":"Title six",
    "note-description":"Description six"
  },
  {
    "note-title":"Title seven",
    "note-description":"Description seven"
  },
  {
    "note-title":"Title eight",
    "note-description":"Description eight"
  },
  {
    "note-title":"Title nine",
    "note-description":"Description nine"
  },
  {
    "note-title":"Title ten",
    "note-description":"Description ten"
  }
]
```

JSON data should be included within the project. This is done by creating a sub-directory called `raw` within the `res` directory then within the created sub-directory, add your JSON File.

![Json](/engineering-education/prefilling-room-database-with-json-data-in-android/json.png)

### Step 6 - Creating a Prefilling Class
Let's create a prefilling class that will contain the database prefilling logic. 

The class takes contexts in the constructor and extends `RoomDatabase.Callback()`. The `Callback` is invoked after all of the tables are built, that is when the database is created.

Inside the class's `onCreate` method, which accepts a database of type `SupportSQLiteDatabase` as a parameter is overridden, and this is where all of the class's functions are called.

```kotlin
class StartingNotes(private val context: Context) :RoomDatabase.Callback() {
    override fun onCreate(db: SupportSQLiteDatabase) {
        super.onCreate(db)
        
        ...
        
    }
} 
```

First, let's create a function to load the JSON file. Inside the `.openRawResource`, we pass the name of the file that contains the JSON data.

```kotlin
private fun loadJSONArray(context: Context):JSONArray?{

    val inputStream = context.resources.openRawResource(R.raw.notes) 

    BufferedReader(inputStream.reader()).use {
        return JSONArray(it.readText())
    }
}
```

Then, let us create a `suspend` function to do the database filling. 

We get the instance of the database's `DAO` so that we can call the insert function. We loop through the JSON result while adding the read data into the database.

```kotlin
private suspend fun fillWithStartingNotes(context: Context){
    
    val dao = NoteDatabase.getInstance(context)?.dao

    try {
        val notes = loadJSONArray(context)
        if (notes != null){
            for (i in 0 until notes.length()){
                 val item = notes.getJSONObject(i)
                val noteTitle = item.getString("note-title")
                val notesDescription = item.getString("note-description")

                val noteEntity = NoteEntity(
                    noteTitle,notesDescription
                )

                dao?.insertNote(noteEntity)
            }
        }
    }

    catch (e:JSONException) {
        Timber.d("fillWithStartingNotes: $e")
    }
}
```

### Step 7 - Attaching the callback to the Database
The prefilling class defined above must be added to the database. This is done with the aid of the `.addCallback()` function when the database instance is created.

```kotlin
fun getInstance(context: Context):NoteDatabase?{
    if (instance == null){
        synchronized(NoteDatabase::class.java){
            instance = Room.databaseBuilder(
                context.applicationContext,
                NoteDatabase::class.java,
                "notes"
            )
            .addCallback(StartingNotes(context))
            .build()
        }
    }

    return instance
}
```
### Step 8 - Define Viewmodel
Let's define a `ViewModel` for our app, the class should have the implementation of the `DAO` methods.

```kotlin
class MainViewModel(private val noteDatabase: NoteDatabase) : ViewModel() {

    val notes = noteDatabase.dao.getAllNotes()

    fun insertNote(noteEntity: NoteEntity){
        viewModelScope.launch{
            noteDatabase.dao.insertNote(noteEntity)
        }
    }
}
```

> In this tutorial, I have not implemented other methods as that is not the main focus of this tutorial.

### Step 9 - Displaying Data
Since the JSON data has already been loaded to the database it should be displayed to the user interface. The data is displayed onto the `recyclerView` that we defined.

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var adapter by lazy { NotesAdapter() }
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val noteDatabase = NoteDatabase.getInstance(this)
        val myViewModelFactory = MyViewModelFactory(noteDatabase!!)

        viewModel = ViewModelProvider(this, myViewModelFactory).get(MainViewModel::class.java)

        viewModel.notes.observe(this, Observer { result ->
            adapter.submitList(result)
            binding.recyclerView.adapter = adapter
        })
    }
}
```

> Make sure you have created an adapter class that acts as a bridge between the user interface and the Room data source. Also, create a ViewModel Factory, which is used to pass arguments to our `ViewModel`. 

### When is it Necessary to Pre-populate a Room Database
- If the program should be launched with a certain set of data.
- If any explanations need to be completed and are stored in a JSON file.
- If the program is complicated and the UI components require a literal explanation.

### Demo
![Demo](/engineering-education/prefilling-room-database-with-json-data-in-android/demo.png)

### Conclusion
In this tutorial, we have gone through what is pre-populating room database with initial data as used in android. what is a room Callback is and how is it added to the database? How to implement prefilling room database with data and when it is necessary to pre-populate a room database.

This GitHub [Repository](https://github.com/benta-odek/PrefillingRoomDbDemo) contains the complete code. 
