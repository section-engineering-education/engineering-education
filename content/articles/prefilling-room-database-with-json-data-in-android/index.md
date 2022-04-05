---
layout: engineering-education
status: publish
published: true
url: /prefilling-room-database-with-json-data-in-android/
title: Prefilling Room Database with JSON Data in Android
description: This tutorial will elaborate on Prefilling Room Database with JSON Data in Android.
author: benta-odek
date: 2022-04-05T00:00:00-11:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/prefilling-room-database-with-json-data-in-android/hero.png
    alt: Prefilling Room Database with JSON Data in Android Hero Image
---
When designing an app, developers strive to develop a way to start with a database that already has data in it.
<!--more-->
This is done by pre-populating the room database with data, which can be material from a prepared database (.db) files in the device's file system or even JSON data.

In most cases, a REST query is used to retrieve data from the application backend, but this is not the case with our application because it is standalone, and we only need to have the APK file.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is pre-populating Room database with initial data](#what-is-pre-populating-room-database-with-initial-data)
- [Getting started with pre-populating Room database](#getting-started-with-pre-populating-room-database)
- [Creating a new project](#step-1---creating-a-new-project)
- [Adding the necessary dependencies](#step-2---adding-the-necessary-dependencies)
- [Defining the User Interface](#step-3---defining-the-user-interface)
- [Creating Room database](#step-4---creating-room-database)
- [Adding JSON data](#step-5---adding-json-data)
- [Creating a Prefilling class](#step-6---creating-a-prefilling-class)
- [Attaching the callback to the database](#step-7---attaching-the-callback-to-the-database)
- [Define ViewModel](#step-8---define-viewmodel)
- [Displaying data](#step-9---displaying-data)
- [When is it necessary to pre-populate a Room database](#when-is-it-necessary-to-pre-populate-a-room-database)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you should have:
- a fundamental grasp of Android programming.
- thorough knowledge of the Kotlin programming language.
- understanding of the [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) as utilized in Android.
- an IDE installed, preferably [Android Studio](https://developer.android.com/studio).

### Goals
This tutorial aims to explain:
- pre-populating Room database with initial data as used in Android.
- room callbacks, and how they are added to the database
- how to implement prefilling room database with data.
- when it is necessary to pre-populate a room database.

### What is pre-populating
It is a technique in which an application launches with existing data in its database, which might be prepared (.db) files stored on the device's file system or even JSON data.

### Getting started with pre-populating Room database.
In this scenario, let us make an app that functions similarly to a note app, except that we will evaluate the note title and description.

#### Step one: Creating a new project
To create a new project with the Android Studio IDE:
1. Go to File -> New -> New Project.
2. Choose an `Empty activity` and click `Next`, as seen below.
3. Select `Kotlin` as the language and click `OK` after giving the project a suitable name.

![new project](/engineering-education/prefilling-room-database-with-json-data-in-android/new-project.png)

#### Step two: Adding the necessary dependencies
Since we shall be working with the Room database, we will need the `room database`, `Coroutine`, and Kotlin extension dependencies. Therefore, include the following in your `build.gradle` app-level file.

```gradle
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

#### Step three: Defining the User Interface (UI)
Let us design a user interface that makes use of `RecyclerView` to display the list of data stored in the database.

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

>Make sure to define your `recyclerView` row that would define how the data is shown in the `RecyclerView`.

#### Step four - Creating a Room database
Room database comprises three components: `Entity`, `DAO`, and `Database`. Let us define all three components:

##### Entity
An entity is a data class that functions similarly to a table. We will define an `Entity` that holds a note title and its description.

```kotlin
@Entity(tableName = "Notes_table")
data class NoteEntity(
    val noteTitle:String,
    val noteDescription:String,
    @PrimaryKey(autoGenerate = true)
    var id: Long = 0,
)
```

##### DAO
Data Access Object(DAO) is used to access the database. It functions by using methods like `insert`, `query`, `delete`, and `update`.

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

##### Database
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

#### Step five: Adding JSON data
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

> JSON data should be included within the project, which is done by creating a sub-directory called `raw` within the `res` directory. Then within the created sub-directory, add your JSON File.

![Json](/engineering-education/prefilling-room-database-with-json-data-in-android/json.png)

#### Step six: Creating a prefilling class
Let us create a prefilling class that will contain the prefilling database logic.

The class takes contexts in the constructor and extends `RoomDatabase.Callback()`. The callback is invoked after all of the tables are built, that is, during the database creation.

Inside the class's `onCreate` method, is overridden and this is where all the class's functions are called. It accepts a database of type `SupportSQLiteDatabase` as a parameter.

```kotlin
class StartingNotes(private val context: Context) :RoomDatabase.Callback() {
    override fun onCreate(db: SupportSQLiteDatabase) {
        super.onCreate(db)
        ...
    }
}
```

First, let's create a function to load the JSON file. Inside the `.openRawResource`, we pass the file's name that contains the JSON data.

```kotlin
private fun loadJSONArray(context: Context):JSONArray?{

    val inputStream = context.resources.openRawResource(R.raw.notes)

    BufferedReader(inputStream.reader()).use {
        return JSONArray(it.readText())
    }
}
```

Then, let us create a `suspend` function to do the database filling. We get the instance of the database's `DAO` so that we can call the insert function. We loop through the JSON result while adding the read data into the database.

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

#### Step seven: Attaching the callback to the database
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

#### Step eight: Define ViewModel
Let us define a `ViewModel` for our app. The class should have the implementation of the DAO methods.

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

> I have not implemented other methods in this tutorial as that is not the main focus.

#### Step nine: Displaying data
Since the JSON data has already been loaded to the database, it should be displayed to the user interface. The data is displayed onto the `recyclerView` that we defined.

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

> Ensure you have created an adapter class that connects the user interface and the Room data source. Also, create a ViewModel Factory to pass arguments to our `ViewModel`.

### When is it necessary to pre-populate a Room database
- If the program should be launched with a particular set of data.
- Any explanations need to be completed and stored in a JSON file.
- If the program is complicated and the UI components require a literal explanation.
-
### Demo
![Demo](/engineering-education/prefilling-room-database-with-json-data-in-android/demo.jpeg)

This GitHub [Repository](https://github.com/benta-odek/PrefillingRoomDbDemo) contains the complete code.

### Wrapping up
In this tutorial, we have gone through pre-populating room database with initial data used in Android.

We have also covered room callbacks, how they are added to the database, and how to implement prefilling Room database with data and when it is necessary to pre-populate a room database.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
