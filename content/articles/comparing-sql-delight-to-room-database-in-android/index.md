---
layout: engineering-education
status: publish
published: true
url: /comparing-sql-delight-to-room-database-in-android/
title: Comparing SQL Delight to Room Database in Android
description: This tutorial explains how SQL Delight compares to Room Database in Android.
author: joyce-wanjiru
date: 2022-02-01T00:00:00-01:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/comparing-sql-delight-to-room-database-in-android/hero.jpg
    alt: Comparing SQL Delight to Room Database in Android
---
There are several options when it comes to choosing a mobile database framework. We have the Room persistence library, Realm database, and SQL Delight.
<!--more-->
### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is SQL delight database?](#what-is-sql-delight-database)
- [Create an Android Project](#step-1---create-an-android-project)
- [Setting Up the Project](#step-2---setting-up-the-project)
- [Defining the database](#step-3---defining-the-database)
- [Defining the SQL queries](#step-4---defining-the-sql-queries)
- [Defining the data source](#step-5---defining-the-data-source)
- [Defining a viewmodel](#step-6---defining-a-viewmodel)
- [Setting up dagger hilt](#step-7---setting-up-dagger-hilt)
- [Working on the activities](#step-8---working-on-the-activities)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along, you should have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your machine.
- Good knowledge of creating and running Android applications.
- Basic knowledge of the [Kotlin](https://kotlinlang.org/) programming language and View binding.
- A basic understanding of dependency injection with [Dagger Hilt](https://developer.android.com/training/dependency-injection/hilt-android)
- Some basic understanding of ViewModels and Coroutines

### Goals
By the end of this tutorial, the reader will:
- Get to know what SQL Delight is.
- Understand the pros and cons of SQL Delight.
- Use SQL Delight in Android projects. 

### What is SQL delight database?
SQL delight is a database framework just like the Room library. It is cross-platform in nature and generates type-safe classes from the given SQL statements. 

It checks on the database schema, migrations, and SQL statements at compile-time.

#### Pros of using SQL delight
- It generates type-safe code and classes from the different SQL statements.
- It is compatible with Kotlin Multi-platform (KMM) meaning we can use it in both IOS and Android.
- SQL Delight is better when dealing with multi-table databases.

#### Cons of using SQL delight
- We have to write more SQL code compared to the Room database library.

### Getting started with SQL Delight
In this tutorial, we will be creating a simple Android note app with the SQL Delight library.

### Step 1 - Create an Android project
Launch Android Studio and create an empty Android project, as shown below:

![project](/engineering-education/comparing-sql-delight-to-room-database-in-android/new_proj.png)

### Step 2 - Setting up the project
In this step, we will do all the necessary setup for our project.

Add the following plugins in your app-level `build.gradle` file:

```gradle
id 'com.squareup.sqldelight'
id 'kotlin-kapt'
id 'dagger.hilt.android.plugin'
```

Still in your app-level `build.gradle` file, add the following dependencies:

```gradle
// SQL Delight
implementation "com.squareup.sqldelight:android-driver:1.5.2"
implementation "com.squareup.sqldelight:coroutines-extensions-jvm:1.5.2"

// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.2'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.5.2'

// Dagger - Hilt
implementation "com.google.dagger:hilt-android:2.38.1"
kapt "com.google.dagger:hilt-android-compiler:2.38.1"
implementation 'androidx.hilt:hilt-navigation-fragment:1.0.0'

// ViewModel
implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.0'
```

In your project-level `build.gradle` file, add the following classpaths:

```gradle
classpath 'com.squareup.sqldelight:gradle-plugin:1.5.2'
classpath "com.google.dagger:hilt-android-gradle-plugin:2.38.1"
```

We then need to install the SQLDelight plugin in our Android Studio. It generates typesafe Kotlin APIs from SQL, and provides language features for SQL inside the IDE.

Open your *Android Studio >> Settings >> Plugins*, then click on the *marketplace* and search for the plugin:

![plugin](/engineering-education/comparing-sql-delight-to-room-database-in-android/sql_delight_plugin.png)

### Step 3 - Defining the database
In our app-level `build.gradle`, we need to add some settings that notify SQL Delight where it should generate our database and how it should be named. 

Inside the `sqldelight` block, we define the name of our database and pass the app's package name that specifies where the database belongs:

```gradle
dependencies {
    ...
}

sqldelight {
    NotesDatabase {
        packageName = "com.sheecodes.sqldelightdemo"
    }
}
```

### Step 4 - Defining the SQL queries
First, switch from *Android* view to *Project* view. Since the files that define our SQL queries need to be defined in the main source set, we will add the SQL delight file in the `main` package.

Right-click the `main` package and create a directory named `sqldelight` and then add two other directories i.e `sqldelight/demo/notesdb`.

Right-click the `notesdb` directory and using the `SQLDelight` plugin, create an SQL Delight table. 

Enter the name of our table `notesEntity` and select `table` from the options:

![new_table](/engineering-education/comparing-sql-delight-to-room-database-in-android/new_delight_file.png)

It should generate something like this:

```kotlin
CREATE TABLE  notesEntity(

);
```

The way you define tables in SQL is the same in SQL Delight. We can go ahead and add an `id`, `title`, and `description` in our table.

```kotlin
CREATE TABLE  notesEntity(
    id INTEGER NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);
```

SQL Delight will use this code to generate a type-safe kotlin code for us. 

> To include more queries or tables, you can define a new SQL file or just add them below the existing one.

Below our table, we will define the CRUD operations that our app will use i.e *insert, read, update and delete*.

We first write the function name followed by the SQL statement that should be executed when the function is called.

```kotlin
getNoteById: SELECT * FROM notesEntity WHERE id = :id;

getAllNotes: SELECT * FROM notesEntity;

insertNote: INSERT OR REPLACE INTO notesEntity VALUES (?,?,?);

deletePersonById: DELETE FROM notesEntity WHERE id = :id;
```

We should now rebuild the project so that SQL Delight can generate the corresponding classes.

### Step 5 - Defining the data source
First of all, switch from *project* view to *Android* view. In your root package define a new package named `data`. 

In the new directory, define an `Interface` and name it `NoteDataSource`. This interface will contain functions that will help us interact with the database.

```kotlin
interface NoteDataSource {
    suspend fun insertNote(title: String, description: String,id: Long? = null)

    fun getAllNotes(): Flow<List<NotesEntity>>

    suspend fun getNoteById(id: Long): NotesEntity?

    suspend fun deleteNoteById(id: Long)
}
```

The first function, `getAllNotes`, returns a `NotesEntity` which is a class generated by the *SQLDelight* behind the scenes.

Still, inside the `data` package, we need to create an implementation of the `NoteDataSource`. Create a new Kotlin class `NoteDataSourceImpl` that extends the `NoteDataSource`. 

The class will take a reference to our database - `NotesDatabase` as its parameters in its constructor.

As you can remember in our app-level `build.gradle`, we defined our database that was then generated by SQLDelight.

```kotlin
class NoteDataSourceImpl(db: NotesDatabase) : NoteDataSource {
    ...
}
```

Inside this class, we define an object that contains the reference to our `notesEntity` queries:

```kotlin
private val queries = db.notesEntityQueries
```

We then add the implementations of the following functions inside the class:

#### Inserting a note

```kotlin
override suspend fun insertNote(title: String, description: String, id: Long?) {
    return withContext(Dispatchers.IO) {
        queries.insertNote(id, title, description)
    }
}
```

#### Getting all notes

```kotlin
override fun getAllNotes(): Flow<List<NotesEntity>> {
    return queries.getAllNotes().asFlow().mapToList()
}
```

Since we are returning a `Flow` of a list of notes, there is a function in SQLDelight called `asFlow()` that we can append at the end of our query. Still, there will be an error, we simply append `mapToList()` to fix it.

#### Getting a note by id

```kotlin
override suspend fun getNoteById(id: Long): NotesEntity? {
    return withContext(Dispatchers.IO) {
        queries.getNoteById(id).executeAsOneOrNull()
    }
}
```

At the end of the query we append the `executeAsOneOrNull()` because our query may return a null if the note is not found in the database.

#### Deleting a note

```kotlin
override suspend fun deleteNoteById(id: Long) {
    return withContext(Dispatchers.IO) {
        queries.deletePersonById(id)
    }
}
```

Here, we pass the `id` of the note that we wish to delete.

### Step 6 - Defining a viewmodel
In this step, we define a `ViewModel` that will interact with the data source that we have just created.

```kotlin
@HiltViewModel
class NotesViewModel @Inject constructor(private val noteDataSource: NoteDataSource): ViewModel() {

    val notes = noteDataSource.getAllNotes()
    var noteDetails = MutableLiveData<NotesEntity>()

    fun insertNote(title: String, description: String){
        if (title.isNullOrEmpty() || description.isNullOrEmpty()){
            return
        }

        viewModelScope.launch {
            noteDataSource.insertNote(title, description)
        }
    }

    fun deleteNote(id: Long){
        viewModelScope.launch {
            noteDataSource.deleteNoteById(id)
        }
    }

    fun getNoteById(id: Long){
        viewModelScope.launch {
            noteDetails.value = noteDataSource.getNoteById(id)
        }
    }
}
```

### Step 7 - Setting up dagger hilt
Here we will set up dagger hilt so that we can inject our data source and the database.

First, in your `root` package, create a class named `NotesApp` and add `hilt` as follows:

```kotlin
@HiltAndroidApp
class NotesApp : Application()
```

> Don't forget to specify the class as a name in your manifest file.

Define another package and name it `di`. Right-click on the package and create a new `object` file called `AppModule`:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    ...
}
```

We then provide the following dependencies:

1. **Database Driver**

SQLDelight needs the `AndroidSqliteDriver` so that it can create and use the database. Inside the `AndroidSqliteDriver`, we pass the schema (generated), context, and the name of our database, as demonstrated below:

```kotlin
@Provides
@Singleton
fun provideSqlDriver(app: Application): SqlDriver {
    return AndroidSqliteDriver(
        schema = NotesDatabase.Schema,
        context = app,
        name = "notes.db"
    )
}
```

2. **Data source**

Using the driver above, we can construct the data source, as follows:

```kotlin
@Provides
@Singleton
fun providesNotesDataSource(driver: SqlDriver): NoteDataSource {
    return NoteDataSourceImpl(
        NotesDatabase(driver)
    )
}
```

### Step 8 - Working on the activities
Finally, we will define our user activities, one for adding notes and another one for displaying a list of notes.

#### Adding notes
You can create a similar layout that has two `EditText`: one for *note title* and another one for *note description* and *button* to save the note.

![add_note](/engineering-education/comparing-sql-delight-to-room-database-in-android/add_note.png)

In the corresponding activity, add the following code to save a note when the *save* button is clicked:

```kotlin
binding.buttonSave.setOnClickListener {
    val title = binding.edtTitle.text.toString()
    val description = binding.edtDescription.text.toString()

    if (title.isNullOrEmpty() || description.isNullOrEmpty()){
        return@setOnClickListener
    }

    CoroutineScope(Dispatchers.Main).launch {
        viewModel.insertNote(title, description)
        startActivity(Intent(this@AddNoteActivity, MainActivity::class.java))
        finish()
    }
}
```

#### Displaying notes
Create a similar layout that has a `Recyclerview` for displaying the list of notes.

![notes_list](/engineering-education/comparing-sql-delight-to-room-database-in-android/notes_list.png)

> Don't forget to create a corresponding row layout for the `Recyclerview`. 

> Also, make sure you have defined an adapter that your `Recyclerview` will use. The model class that the adapter will use will be the `NotesEntity` that was generated by SQLDelight.

In the corresponding activity, add the following code to display the notes:

```kotlin
CoroutineScope(Dispatchers.Main).launch {
    viewModel.notes.collect { notes ->
        adapter.submitList(notes)
        binding.notesRecycler.adapter = adapter
    }
}
```

#### Deleting a note
If you have set `onClickListeners` to your Recyclerview items, you can call the delete method from the `ViewModel`, this way:

```kotlin
viewModel.deleteNote(note.id)
```

#### Updating a note
If you want to update a note from the function `getNoteById(id: Long)` in the ViewModel, you pass in its id.

### Demo

![demo](/engineering-education/comparing-sql-delight-to-room-database-in-android/demo.png)

### Conclusion
In this tutorial, we have discussed what SQL Delight database is, how it compares to the Room database, and its pros and cons. 

We have then implemented the SQL Delight database in Android by creating a simple note app. 

To get the full code implementation, check out this repository [SQL Delight Demo](https://github.com/sheecodes/SQLDelightDemo).

### Further reading
- [SQL Delight Documentation](https://cashapp.github.io/sqldelight/)
- [Room Database Documentation](https://developer.android.com/training/data-storage/room)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)