Realm is an open-source, developer-friendly  lightweight mobile database. It can be a good alternative to both SQLite and Coredata. Realm is faster and has tons of new features such as JSON support, a easy to use API, notifications when data changes, it is cross-platform, faster in terms of querying, and it is fully encrypted all of which makes mobile development easy.
In this tutorial, we are going to learn the basics of Realm for Android.

### Prerequisites
- Android Studio Installed
- Good knowledge on creating and running Android applications
- Basic information about the Kotlin programming language.
- Working with ViewModels and Livedata

### SQLite database
Lightweight, open source, structured query base, standalone, offline database for Android devices. It supports embedded relational database features.
The created database will be stored in a the device's local directory and data will be  represented in text format

Android devices are shipped with a built in SQLite database implementation. SQLite is a relational database, which contains tables made of rows and columns, indexes and many more. Relational databases like SQLite have a schema which store information about, tables, relationships, triggers, indexes etc.

Room persistence library is an abstraction library that works on top of SQLite.  It allows more robustness and ease of harnessing the power of SQLite. In other words, the Room  is an (ORM) Object Relational Mapping library.


### Coredata
Coredata is a data persistence framework created and maintained by Apple. Developed for both macOS and iOS Operating Systems. It saves structured data locally on the device. 

Coredata manages an object graph. An object graph is a group of objects that are linked with one another. Keep in mind that Coredata is not a database, it is a framework that manages complex object graphs.


### Realm database
Realm Database can be accessed directly which makes it faster. It stores live objects without the need for an Object Relational Mapping library.

Realm is built from scratch with C++ as its core can run directly on different devices. It stores its data in a native object format whereby objects are represented in the database in a universal table-based format. This makes Realm database easy to use in different languages and platforms.

In this article we will focus on Realm Database in Android with Kotlin

### Why use Realm database
- Build apps quickly
- Build bigger & better apps
- Cross-platform database
- Offline mode when using realm database locally
- Online data sync when using Realm Sync
- Program for more than one app platform
- Faster Queries
- Easy to use

### With Realm Database, we can:
- Define an Object Schema
- Query Realm Database
- Update Live Objects
- Watch for Object Updates
- Always Access the Latest Data

### Transactions in Realm
Realm handles reads and writes of data into the database in terms of transactions. A transaction is a group of read and write operations that are treated as if they were a single operation that can't be split. A transaction can either succeed or not happen at all.

To run a transaction, we can either use `executeTransaction()` or `executeTransactionAsync()` functions . If the code in the function didn't succeed in executing, the transaction is canceled, otherwise, the transaction is committed

You should in most cases use `executeTransaction()` since it will handle errors and close the realm database for you.

### Getting started with Realm in Android
We will be creating a todo appplication to demonstrate the CRUD operations e.g Query, Create, Update and Delete 

### Step 1: Including Realm Dependency
Open build.gradle project level and paste the Realm classpath inside dependencies

``` Gradle
classpath "io.realm:realm-gradle-plugin:10.7.0"
```

Inside app level build.gradle plugins, make sure you add this two dependencies. Be sure to begin with the `kotlin-kapt` plugin before the `realm-android` plugin

``` Gradle
plugins {
    ...
    id 'kotlin-kapt'
    id 'realm-android'
}
```

### Step 2: Creating a Base Application class
This class will contain the `onCreate()` method which will be called once and before any other class, it will be used in the initialization of the realm databases
initialize Realm once each time the application runs.

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

#### Initializing Realm
`Realm.init(this)` 

Before you can use Realm in your app, you must initialize the Realm library. Your application should initialize Realm just once each time the application runs.

#### Openning Realm
Use RealmConfiguration to control the specifics of the realm you would like to open, 

```kotlin
val configuration = RealmConfiguration.Builder()
            .name("todo.db")
            .deleteRealmIfMigrationNeeded()
            .schemaVersion(0)
            .allowWritesOnUiThread(true)
            .allowQueriesOnUiThread(true)
            .build()
```

`Realm.setDefaultConfiguration(configuration)`  - Sets this configuration as the default realm

Use the `readOnly()` method when configuring your realm to make it read-only.

Note: It is important to remember to call the `realm.close()` method when done with a realm instance to free resources. Neglecting to close realms can lead to an OutOfMemoryError.

### Step 3: Registering Your Application Subclass in the Android Manifest

If you create your own Application subclass, We must add the Application subclass to application's AndroidManifest.xml to execute our custom application code.
 Set the android.name property of your manifest's application definition to ensure that Android instantiates
  your Application subclass before any other class when a user launches your application.
```
<application
      android:name=".MyApplicationSubclass"
      ...
   />
```

### Step 4: Define Your Object Model

This Class defines the structure to which our data will be stored in the database

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
The Realm model attributes can have annotations such as `@PrimaryKey` to define the unique attribute and `@Required` to define a must include field.


### Step 5: Create ViewModel class
This lifecycle aware class will contain all our CRUD operation Functions i.e. Create, Update and Delete 

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
`var realm: Realm = Realm.getDefaultInstance()` - instantiates the Realm with a default RealmConfiguration
Once you have opened a realm, you can modify the objects within that realm in a write transaction block.

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

When adding data objects into realm we transaction inside the `executeTransaction` function

Create an object that will be inserted in the database by using this method `r.createObject(ObjectClass, PrimaryKey)` which we pass our model class and the primary key

Then from the object that we have created can add data by accessing its attribute and adding data in them 

We afterwards call the `realm.insertOrUpdate(object)` to commit the newly or updated data into database


#### Query data from the Realm database
To query all data of a particular object, we create an object that will store all the RealmResult of the queries data
`realm.where(Note::class.java).findAll()` will find all data of the paricular object and store then in the created variable that was created to hold all the 
RealmResult

This result can then converted into a list because they are of type RealmResult
You can use this simple line of code to do that 
`list.value = notes?.subList(0, notes.size)`

```kotlin
private fun getAllNotes(): MutableLiveData<List<Note>> {
        val list = MutableLiveData<List<Note>>()
        val notes = realm.where(Note::class.java).findAll()
        list.value = notes?.subList(0, notes.size)
        return list
    }
```


#### Updating data
Updating data is somehow similar to the way we inserted data into realm only that this time, query data with the respective `id` of the data that 
we need to update. In our query we will append `.findFirst()` method to find the first matching instance of the data being updated.

Then once found we will run our transaction inside the `executeTransaction()` method to commit the updated data object

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

#### Deleting A Single data of a paricular realm object
To delete data from a realm object will also involve querying the paricular object we need to delete with its `id` 
Once found we can use `deleteFromRealm()` to deleted the queried data inside the `executeTransaction()` 

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
Deleting all data of a particular object is super easy: we call the `executeTransaction` and delete the whole object and all its data with
`r.delete(Note::class.java)`

```kotlin
fun deleteAllNotes() {
        realm.executeTransaction { r: Realm ->
            r.delete(Note::class.java)
        }
    }
```    

Finally we can then call all this functions in our AddNoteActivity and the MainActivity to do their respective work.

### Step 5: AddNoteActivity
when adding a new note, we can call the function `addNote()` from the ViewModel class

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
For Querying all notes we can call the `getAllNotes()` from the ViewModel class
```kotlin
viewModel.allNotes.observe(this, { allNotes ->
            notesAdapter.submitList(allNotes)
            binding.notesRecyclerview.adapter = notesAdapter
        })
```

Deleting a note, I have used the swipe to delete ItemTouchHelper which calls the `deleteNote()` function from viewModel class
```kotlin
override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                viewModel.deleteNote(id!!)
                Toast.makeText(this@MainActivity, "Note Deleted Successfully", Toast.LENGTH_SHORT)
                    .show()
            }
```

For updating a particular note, we will display a dialog that will give the user a chance to make changes to the selected note
```kotlin
 private fun createUpdateDialog(note: Note) {
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
        builder.setPositiveButton("Update") { _, _ ->
            viewModel.updateNote(
                note.id,
                titleEdtxt.text.toString(),
                descriptionEdtxt.text.toString()
            )
            notesAdapter.notifyDataSetChanged()
        }

        builder.setNegativeButton("Cancel") { _, _ ->
            Toast.makeText(this@MainActivity, "Canceled Update", Toast.LENGTH_SHORT).show()
        }

        builder.show()
    }
```    


Deleting all notes in the database, I have include a optionsMenu
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

Here are some of the screenshots on how the app should look like:

![All Notes](/engineering-education/using-realm-database-as-an-alternative-to-sqlite-and-coredata-in-android/allnotes.png)
![Add Note](/engineering-education/using-realm-database-as-an-alternative-to-sqlite-and-coredata-in-android/addnote.png)
![Update Note](/engineering-education/using-realm-database-as-an-alternative-to-sqlite-and-coredata-in-android/updatenote.jpg)


Check out the entire project on [GitHub](https://github.com/JoelKanyi/RealmDatabaseDemo).

### Conclusion
Realm can be a good alternative to the tradition SQLite database, keep exploring and trey and harnes the full capabilities of Realm such as RealmSyn.
When Realm Sync is enabled, Realm Database synchronizes data with MongoDB Realm over the network in a background thread, pushing local data changes to MongoDB 
Realm and pulling remote changes down. Keep learning 

### References:
- [Realm.io](https://realm.io/)
- [MongoDB Realm for Mobile Developers](https://docs.mongodb.com/realm/get-started/introduction-mobile/)
- [MongoDB Realm Android SDK](https://docs.mongodb.com/realm/sdk/android/)
