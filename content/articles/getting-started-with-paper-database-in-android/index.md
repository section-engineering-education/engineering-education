---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-paper-database-in-android/
title: Getting Started with Paper Database in Android
description: This tutorial will guide the reader on how to store, retrieve, and delete data in a Paper Database in Android. 
author: brandy-odhiambo
date: 2022-05-05T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-paper-database-in-android/hero.jpg
    alt: Getting Started with Paper Database in Android
---
A database is an organized collection of data that is stored in computer systems. 
<!--more-->
In Android, there are several databases such as SQLite, Room, SQLDlight, Datastore, SharedPreferences, and Realm database.

Although most people think that all databases are composed of fields and records, databases held on Paper contain fields and have no records. An example is the phone book which has no records for each person. Instead, it has the field as the main element of the database.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goal)
- [What is a Paper database?](#what-is-a-paper-database)
- [Advantages of Paper database](#advantages-of-paper-database)
- [Disadvantages of Paper database](#disadvantages-of-paper-database)
- [When to use Paper database](#when-to-use-paper-database)
- [Getting started](#getting-started)
- [Creating a new project](#step-1---creating-a-new-project)
- [Adding dependencies](#step-2---adding-dependencies)
- [Creating the user interface](#step-3---creating-the-user-interface)
- [Initializing Paper in an application class](#step-4---initializing-paper-in-an-application-class)
- [Creating the model class](#step-5---creating-the-model-class)
- [Inserting data to Paper database](#step-6---inserting-data-to-paper-database)
- [Getting all notes](#step-7---getting-all-notes)
- [Deleting all notes](#step-8---deleting-all-notes)
- [Demo](#demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need to:
- Understand the basics of Android development.
- Have basic knowledge of the Kotlin Programming language.
- Be conversant with Kotlin Coroutines.
- Be familiar with the concept of data/view binding.

### Goal
This tutorial aims to explain what Paper database is, where to use it, the advantages and disadvantages of Paper DB, and how to implement it in Android.

### What is a Paper database?
PaperDB is a NoSQL-like database for Java/Kotlin objects on Android that supports automatic schema migration. The goal of PaperDB is to provide an easy-to-use yet fast object storage solution for Android.

It allows users to use Java/Kotlin classes without any annotations, factory methods, or required class extensions. 

Adding or removing fields from data classes is also no longer a chore because all data structure changes are handled automatically.

### Advantages of Paper database
- Since it only takes column data, Paper databases consume less memory as compared to other databases.
- It is easy to implement.
- It is relatively faster than other databases.

### Disadvantages of Paper database
- Huge amount of information cannot be stored within the paper database.
- Querying data from the database is a problem, especially categorical data.

### When to use the Paper database
The Paper database is a great choice when:
- Saving minor details.
- The data to be stored consists of fields.

### Getting started
To understand the concept of the Paper database better, we'll create a note app that adds notes to the database and displays them on a `RecyclerView`.

### Step 1 - Creating a new project
Launch Android Studio and create a new empty activity project. Give the project a descriptive name and select Kotlin as the preferred development language.

![new project](/engineering-education/getting-started-with-paper-database-in-android/new-project.png)

### Step 2 - Adding dependencies
Go to `build.gradle` (app level) and add `paper database` and Kotlin Coroutines dependencies below:

```bash
// paper database
implementation 'io.github.pilgr:paperdb:2.7.2'
// coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.5.2'
```

### Step 3 - Creating the user interface
Since we need to insert data into the database and display it, we need two user interfaces, one to insert the data and the other to display the data. 

They should look as shown below:

![insert data](/engineering-education/getting-started-with-paper-database-in-android/insert-ui.png)

#### Displaying data in the user interface
> Note that you must create the adapter and row item that is mapped to the RecyclerView for the data to be displayed.

![display data](/engineering-education/getting-started-with-paper-database-in-android/display-ui.png)

### Step 4 - Initializing Paper in an Application class
Create a `NoteApp` class that inherits the `Application` class. Override the `onCreate` method and initialize `Paper` database.

This should be done in the Main thread as follows:

```kotlin
class NoteApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Paper.init(this)
    }
}
```

### Step 5 - Creating the Model class
A model class defines the name and properties of the data object(s) held in a paper database. We list all of the essential data within the model class. 

In this case, the model simply has two properties, note title, and note description:

```kotlin
data class Note(
    Val title: String? = null,
    Val description: String? = null
)
```

### Step 6 - Inserting data into Paper database
Define an `ArrayList` variable that will hold the notes:

```kotlin
private lateinit var noteList: ArrayList<Note>
```

Within the `OnCreate` method, the noteList is checked and initialized to an empty ArrayList if it is null:

```kotlin     
noteList = Paper.book().read("notes", ArrayList()) ?: ArrayList()
```

The `Read` method is used to obtain data from the database while the `Write` method is used to insert data into the database.

The `read()` and `write()` methods are thread sensitive and must be called outside of the UI thread. For this reason, we are going to perform insertion within a `CoroutineScope`:

```kotlin
binding.btnSave.setOnClickListener {
    // check if the input fields are empty
    if (binding.etTitle.text.isEmpty() && binding.etDescription.text.isEmpty()){
        return@setOnClickListener
    }
    CoroutineScope(Dispatchers.IO).launch {
        // adding data to the array list
        val note = Note(binding.etTitle.text.toString(), binding.etDescription.text.toString())
        noteList.add(note)
        // inserting data to paper database
        Paper.book().write("notes", noteList)
    }
    // navigating back
    startActivity(Intent(this, MainActivity::class.java))
    finish()
}
```

### Step 7 - Getting all Notes
The `read()` method is used to obtain data from the database and must be called outside of the UI thread:

```kotlin
CoroutineScope(Dispatchers.Main).launch {
    // checks if the array list has data
    notes = Paper.book().read("notes", ArrayList<Note>()) ?: ArrayList<Note>()
    // submitting data to the adapter
    notesAdapter.submitList(notes)
    // setting data to the recyclerView
    binding.noteRecycler.adapter = notesAdapter
}
```

### Step 8 - Deleting all Notes
To perform a delete operation, we use the `delete()` function provided by the Paper library. This function accepts the `key` as an input, checks if the provided `key` has any value, and then performs the action. 

The deletion method is as shown below:

```kotlin
Paper.book().delete("notes")
```

### Demo
Upon running the app, you should expect to see the following:

![demo one](/engineering-education/getting-started-with-paper-database-in-android/demo1.png)

![demo two](/engineering-education/getting-started-with-paper-database-in-android/demo2.png)

![demo three](/engineering-education/getting-started-with-paper-database-in-android/demo3.png)

![demo four](/engineering-education/getting-started-with-paper-database-in-android/demo4.png)

### Conclusion
In this tutorial, we have discussed what Paper database is, its advantages and disadvantages, where to use it, and how to implement Paper databases in Android.

You can get the full implementation of this tutorial on this [GitHub repository](https://github.com/brandy-kay/PaperDbTest).

Happy Coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)