---
layout: engineering-education
status: publish
published: true
url: /using-realm-database-in-android/
title: Using Realm Database in Android
description: This tutorial will take the reader through the process of using Realm to store data in Android. Realm is an open-source, developer-friendly, lightweight, and fast mobile database.
author: joel-kanyi
date: 2021-09-05T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-realm-database-in-android/hero.png
    alt: Using Realm Database as an alternative to SQLite and Coredata in Android image
---

[Realm](https://realm.io/) is an open-source, developer-friendly and lightweight mobile database. It can be a good alternative to both SQLite and CoreData.
<!--more-->
Realm is faster and has tons of new features such as JSON support, an easy-to-use API, notifications when the data changes, cross-platform support, faster querying, and it is fully encrypted all of which make mobile development easy.

In this tutorial, we'll explore the fundamentals of Realm for Android.

### Prerequisites
To follow through this tutorial, you should have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your machine.
- Good knowledge of creating and running Android applications.
- Basic information of the [Kotlin](https://kotlinlang.org/) programming language.
- A good understanding of [MVVM architecture](https://en.wikipedia.org/wiki/Model_View_ViewModel) in Android.

### SQLite database
Lightweight, open-source, structured query base, standalone, and offline database for Android devices. It supports embedded relational database features.
The database is stored on the device's local directory and data is represented in text format.

Android devices are shipped with an in-built SQLite database implementation. SQLite is a relational database, that contains tables made of rows and columns, indexes, and many more. Relational databases like SQLite have a schema that stores information about, tables, relationships, triggers, indexes, etc.

Room persistence library is an abstraction library that works on top of SQLite. It allows more robustness and ease of harnessing the power of SQLite. Our database objects are translated into Java objects by the Room library. 

### Core data
Core data is a data persistence library provided by Apple. Developed to support both macOS and iOS Operating Systems. It saves structured data locally on the device. 

Core data manages an object graph. An object graph is a collection of objects that are connected to each other. Keep in mind that CoreData is not a database, it is a framework that manages complex object graphs.

### Realm database
Realm Database can be accessed directly which makes it faster. It stores live objects without the need for an Object Relational Mapping library.

Realm is built from scratch with C++ as its core can run directly on different devices. It stores data in a native object format whereby objects are represented in the database in a universal table-based format. This makes Realm database easy to use in different languages and platforms.

In this tutorial, we will focus on the Realm database in Android with Kotlin.

### Why use Realm database?
- Build robust & better apps quickly
- It is a cross-platform database
- Offline mode when using realm database locally
- Online data sync when using Realm Sync
- Easy and Faster Queries

### With Realm Database, we can:
- Perform object schema definition
- Access data from Realm Database
- Update live objects
- Lookout for object updates
- Always get access to the most recent data

### Transactions in Realm
Realm handles `reads` and `writes` of data into the database in terms of transactions. A transaction is a group of read and write operations that are treated as a single operation that can't be split. A transaction can either succeed or not happen at all.

To run a transaction, we can either use `executeTransaction()` or `executeTransactionAsync()` methods. If the execution fails, the transaction is canceled, otherwise, the transaction is committed.

You should in most cases use `executeTransaction()` since it handles errors and closes the Realm database for you.

### Getting started with Realm in Android
We will be creating a `Todo` application to demonstrate the CRUD operations, i.e Query, Create, Update and Delete.

### Step 1: Including Realm Dependency
Open `build.gradle` file (project level) and paste the Realm class-path dependency.

```gradle
classpath "io.realm:realm-gradle-plugin:10.7.0"
```

Inside app-level `build.gradle` plugins, add these two plugins. Be sure, to begin with the `kotlin-kapt`.

```gradle
plugins {
    ...
    id 'kotlin-kapt'
    id 'realm-android'
}
```

### Step 2: Creating a Base Application class
This class will contain the `onCreate()` method that will be called once and before any other method. It will be used in the initialization of the Realm database each time the application is launched.

```kotlin
class RealmApp : Application() {

    override fun onCreate() {
        super.onCreate()

        Realm.init(this)

        val configuration = RealmConfiguration.Builder()
            .name("todo.db")
            .deleteRealmIfMigrationNeeded()
            .schemaVersion(0)
            .allowWritesOnUiThread(true)
            .allowQueriesOnUiThread(true)
            .build()

        Realm.setDefaultConfiguration(configuration)
    }
}
```

### Code Explanation

#### Initializing Realm - `Realm.init(this)` 

You must first initialize the Realm library before you can utilize it in your project. Each time your application runs, it should initialize Realm only once.

#### Opening and configuring Realm
Use RealmConfiguration to control the specifics of the Realm that you would like to open.

```kotlin
val configuration = RealmConfiguration.Builder()
            .name("todo.db")
            .deleteRealmIfMigrationNeeded()
            .schemaVersion(0)
            .allowWritesOnUiThread(true)
            .allowQueriesOnUiThread(true)
            .build()
```

`Realm.setDefaultConfiguration(configuration)`  - Sets this configuration as the default Realm.

Use the `readOnly()` method when configuring your Realm to make it read-only.

> Note: Always remember to call the `realm.close()` method when done with a realm instance to release resources. Neglecting to close realms can lead to an OutOfMemoryError.

### Step 3: Registering Your Application Subclass in the Android Manifest

To execute our custom application code, you must include your Application subclass to the `AndroidManifest.xml` file. Set the `android.name` property of your manifest's application definition to ensure that when a user runs the application, Android instantiates the Application subclass before any other class.

```xml
<application
      android:name=".MyApplicationSubclass"
      ...
   />
```

### Step 4: Define your Object Model

This class defines the structure in which our data will be stored in the database.

```kotlin
import io.realm.RealmModel
import io.realm.annotations.PrimaryKey
import io.realm.annotations.RealmClass
import io.realm.annotations.Required

@RealmClass
open class Note : RealmModel {
    @PrimaryKey
    var id: String = ""
    
    @Required
    var title: String? = ""
    
    @Required
    var description: String? = ""
}
```

The Realm object should inherit from the `RealmModel` class, provide an empty constructor and use the `open` visibility modifier.

The Realm model attributes can have annotations such as `@PrimaryKey` to define a unique attribute and `@Required` to define a must include field.

### Step 5: Create ViewModel class
This lifecycle aware class will contain all our CRUD operation functions, i.e. Create, Update and Delete 

```kotlin
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import io.realm.Realm
import io.realm.kotlin.deleteFromRealm
import java.util.*

class MainViewModel : ViewModel() {
    private var realm: Realm = Realm.getDefaultInstance()

    val allNotes: LiveData<List<Note>>
        get() = getAllNotes()

    fun addNote(noteTitle: String, noteDescription: String) {
        realm.executeTransaction { r: Realm ->
            val note = r.createObject(Note::class.java, UUID.randomUUID().toString())
            note.title = noteTitle
            note.description = noteDescription

            realm.insertOrUpdate(note)
        }
    }

    private fun getAllNotes(): MutableLiveData<List<Note>> {
        val list = MutableLiveData<List<Note>>()
        val notes = realm.where(Note::class.java).findAll()
        list.value = notes?.subList(0, notes.size)
        return list
    }

    fun updateNote(id: String, noteTitle: String, noteDesc: String) {
        val target = realm.where(Note::class.java)
            .equalTo("id", id)
            .findFirst()

        realm.executeTransaction {
            target?.title = noteTitle
            target?.description = noteDesc
            realm.insertOrUpdate(target)
        }
    }

    fun deleteNote(id: String) {
        val notes = realm.where(Note::class.java)
            .equalTo("id", id)
            .findFirst()

        realm.executeTransaction {
            notes!!.deleteFromRealm()
        }
    }

    fun deleteAllNotes() {
        realm.executeTransaction { r: Realm ->
            r.delete(Note::class.java)
        }
    }
}
```

### Explanation
`var realm: Realm = Realm.getDefaultInstance()` - instantiates the Realm with a default configuration. Once you have opened a realm, you may use the write transaction block to change the items within it.

#### Adding Data Into Realm

```kotlin
fun addNote(noteTitle: String, noteDescription: String) {
        realm.executeTransaction { r: Realm ->
            val note = r.createObject(Note::class.java, UUID.randomUUID().toString())
            note.title = noteTitle
            note.description = noteDescription

            realm.insertOrUpdate(note)
        }
    }
```

When adding data objects into Realm, we perform a transaction in the `executeTransaction` method.

Create an object that will be inserted in the database by using `r.createObject(ObjectClass, PrimaryKey)` to which we pass our model class and the primary key.

With the object that we have created, we can add data by accessing its attribute.

We afterward call the `realm.insertOrUpdate(object)` method to commit the new or updated data into the database.

#### Query data from the Realm database
To query all data from a particular object, we create an object that will store all the RealmResult of the queries. `realm.where(Note::class.java).findAll()` will find all data and store it in the variable meant to hold all the RealmResult.

This result can then be converted into a list because it contains data of the same type.

You can use this line of code to do that:

```kotlin
list.value = notes?.subList(0, notes.size)
```

```kotlin
private fun getAllNotes(): MutableLiveData<List<Note>> {
        val list = MutableLiveData<List<Note>>()
        val notes = realm.where(Note::class.java).findAll()
        list.value = notes?.subList(0, notes.size)
        return list
    }
```

#### Updating data
Updating data is similar to the way we inserted data into realm only that this time, we query data with the respective `id` of the data that we need to update. In our query, we will append `.findFirst()` method to find the first matching instance of the data to be updated.

Then, once a match is found, we will run our transaction inside the `executeTransaction()` method to commit the updated data object.

```kotlin
fun updateNote(id: String, noteTitle: String, noteDesc: String) {
        val target = realm.where(Note::class.java)
            .equalTo("id", id)
            .findFirst()

        realm.executeTransaction {
            target?.title = noteTitle
            target?.description = noteDesc
            realm.insertOrUpdate(target)
        }
    }
```

#### Deleting a Single item of a particular realm object
To delete data from a realm object will also involve querying the particular object that we need to delete using its `id`. Once found, we can use `deleteFromRealm()` method to delete the queried data in the `executeTransaction()` block.

```kotlin
fun deleteNote(id: String) {
        val notes = realm.where(Note::class.java)
            .equalTo("id", id)
            .findFirst()

        realm.executeTransaction {
            notes!!.deleteFromRealm()
        }
    }
```

#### Deleting all data from a realm object
Deleting all data of a particular object is super easy. We call the `executeTransaction` and delete the whole object and all its data using `r.delete(Note::class.java)`

```kotlin
fun deleteAllNotes() {
        realm.executeTransaction { r: Realm ->
            r.delete(Note::class.java)
        }
    }
```    

Finally, we can then call these functions in our `AddNoteActivity.kt` and the `MainActivity.kt` files to perform their respective tasks.

### Step 5: AddNoteActivity
when adding a new note, we can call the function `addNote()` from the ViewModel class.

```kotlin
binding.saveButton.setOnClickListener {
            if (binding.titleEditText.text.toString()
                    .isEmpty() || binding.descriptionEditText.text.toString().isEmpty()
            ) {
                return@setOnClickListener
            } else {
                viewModel.addNote(
                    binding.titleEditText.text.toString(),
                    binding.descriptionEditText.text.toString()
                )

                startActivity(Intent(this, MainActivity::class.java))
                finish()
            }
        }
```

### Step 6: MainActivity
For Querying all notes we can call the `getAllNotes()` from the ViewModel class.

```kotlin
viewModel.allNotes.observe(this, { allNotes ->
            notesAdapter.submitList(allNotes)
            binding.notesRecyclerview.adapter = notesAdapter
        })
```

To delete a note, we have used the swipe to delete ItemTouchHelper which calls the `deleteNote()` function from viewModel class.

```kotlin
override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                viewModel.deleteNote(id!!)
                Toast.makeText(this@MainActivity, "Note deleted successfully", Toast.LENGTH_SHORT)
                    .show()
            }
```

To update a particular note, we will display a dialog that will allow the user to make changes to the selected note.

```kotlin
 private fun createUpdateDialog(note: Note) {
        // It is recommended to use ViewBinding in place of View.findViewById().
        val viewGroup = findViewById<ViewGroup>(android.R.id.content)
        val dialogView: View =
            LayoutInflater.from(this).inflate(R.layout.update_dialog, viewGroup, false)
        val builder = AlertDialog.Builder(this)

        val titleEdtxt: EditText = dialogView.findViewById(R.id.titleEditText_update)
        val descriptionEdtxt: EditText = dialogView.findViewById(R.id.descriptionEditText_update)

        titleEdtxt.setText(note.title)
        descriptionEdtxt.setText(note.description)

        builder.setView(dialogView)
        builder.setTitle("Update Note")

        // use underscores for unused lambda parameters
        builder.setPositiveButton("Update") { _, _ ->
            viewModel.updateNote(
                note.id,
                titleEdtxt.text.toString(),
                descriptionEdtxt.text.toString()
            )
            notesAdapter.notifyDataSetChanged()
        }

        builder.setNegativeButton("Cancel") { _, _ ->
            Toast.makeText(this@MainActivity, "Canceled update", Toast.LENGTH_SHORT).show()
        }

        builder.show()
    }
```    

To Delete all notes in the database, we can use the menu item as shown below:

```kotlin
override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        val inflater = menuInflater
        inflater.inflate(R.menu.delete_all, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == R.id.deleteAll) {
            viewModel.deleteAllNotes()
            notesAdapter.notifyDataSetChanged()
            return true
        }
        return super.onOptionsItemSelected(item)
    }
```    

Here are some screenshots on how the app should look like:

![All Notes](/engineering-education/using-realm-database-in-android/allnotes.png)

![Add Note](/engineering-education/using-realm-database-in-android/addnote.png)

![Update Note](/engineering-education/using-realm-database-in-android/updatenote.png)

Check out the entire project on [this GitHub repository](https://github.com/JoelKanyi/RealmDatabaseDemo).

### Conclusion
Realm is a good alternative to the traditional SQLite database. Keep exploring and trying other capabilities of Realm such as RealmSync. 

Realm Database synchronizes data with MongoDB Realm across the network in a background thread when Realm Sync is enabled. It pushes local data updates to MongoDB Realm and pulls remote changes.

### References:
- [Realm.io](https://realm.io/)
- [MongoDB Realm for Mobile Developers](https://docs.mongodb.com/realm/get-started/introduction-mobile/)
- [MongoDB Realm Android SDK](https://docs.mongodb.com/realm/sdk/android/)

Happy Coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
