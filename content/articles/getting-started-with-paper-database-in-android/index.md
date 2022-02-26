### Getting Started with Paper Database

### Introduction
A database is an organized collection of data that are stored electrically in computer systems. In android, there are several databases like SQLite which comprises of room and SQLDlight, Datastore, SharedPreference, and Realm database. Even though most people tend to think that all databases are computerized there are databases held on paper example is the phone book which has no records for each person rather it has the main element of the database that is the field which is a name and phone number.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is Paper Database](#what-is-paper-database)
- [Advantages of Paper Database](#advantages-of-paper-database)
- [Disadvantages of Paper Database](#disadvantages-of-paper-database)
- [Where to use Paper Database](#where-to-use-paper-database)
- [Getting Started](#getting-started)
- [Creating a new project](#step-1---creating-a-new-project)
- [Adding Dependencies](#step-2---adding-dependencies)
- [Creating the User Interface](#step-3---creating-the-user-interface)
- [Initializing Paper in an Application Class](#step-4---initializing-paper-in-an-application-class)
- [The Model Class](#step-5---the-model-class)
- [Inserting Data to Paper Database](#step-6---inserting-data-to-paper-database)
- [Getting all notes](#step-7---getting-all-notes)
- [Deleting all Notes](#step-8---deleting-all-notes)
- [Demo](demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial ensure to:
- Understand the basic knowledge of Android development.
- Have Basic Knowledge of Kotlin Programming language.
- Know kotlin Coroutines.
- Be familiarised with the concept of binding.

### Goals
This tutorial aims to explain to readers what is paper database is used in android, where to use a paper database, advantages & disadvantages of Paper DB, and how to implement it in android.

### What is Paper Database 
PaperDB is a NoSQL-like store for Java/Kotlin objects on Android that supports automatic schema migration. The goal of PaperDB is to provide an easy-to-use yet fast object storage solution for Android. It allows users to use Java/Kotlin classes without any annotations, factory methods, or required class extensions. Adding or removing fields from data classes is also no longer a chore because all data structure changes are handled automatically.

### Advantages of Paper Database
- Since it only takes column data, paper databases consume less memory as compared to other databases.
- It easy to implement. 
- It is faster than other databases.

### Disadvantages of Paper Database
- Huge amount of information cannot be stored within the paper database.
- Querying data from the database is a problem, especially categorical data.

### Where to use Paper Database
- When saving minor details.
- When the data to be stored consists of fields.
 
### Getting Started 
To better understand the concept of a paper database, we'll make a note app that adds notes to the database and displays the information in a `Recyclerview`.

### Step 1 - Creating a new project
To begin a new project, go to File > New >New project, pick Empty activity from the menu, and then hit Next. Give your project a descriptive name. Select Kotlin as the language and click Finish.

![new project](/engineering-education/getting-started-with-paper-database-in-android/new-project.png)

### Step 2 - Adding Dependencies
Go to `build. Gradle app level and add `paper database` and kotlin coroutine dependencies below

```gradle
//paper database
    implementation 'io.github.pilgr:paperdb:2.7.2'
//coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.5.2'
```
### Step 3 - Creating the User Interface
Since we need to insert data into a database and display the data, there are two user interface, one to insert the data into the database and the other to display the data. which should look as shown below:

#### Inserting data User Interface

![insert](/engineering-education/getting-started-with-paper-database-in-android/insert-ui.png)

#### Displaying data User Interface
> Note that you must build the row that is mapped to the recycler view for it to be displayed.

![display](/engineering-education/getting-started-with-paper-database-in-android/display-ui.png)

### Step 4 - Initializing Paper in an Application Class
Create an NoteApp that inherits the `Application` class, override the `onCreate` method and within the method initialize `Paper`, this should be done in a UI thread like this.
```kotlin
class NoteApp:Application() {
    override fun onCreate() {
        super.onCreate()
        Paper.init(applicationContext)
    }
}
```
### Step 5 - The Model Class
A model class acts as a point of access to data held in a paper database. We list all of the essential data within the model class; in this case, the model simply has two items: note title and note description.
```kotlin
data class Notes(
    Val title: String? = null,
    Val description: String? = null
)
```
### Step 6 - Inserting Data to Paper Database
Define an `ArrayList` variable that will hold the notes - `private lateinit var noteList:ArrayList<Notes>`

Within the `OnCreate` method, the ArrayList variable is checked for any data that has been inserted initially if it does not contain any, it is initialized to an empty ArrayList.
```kotlin
// check if the array list has data if not it is initialized to an empty array list
         
noteList = Paper.book().read("notes",ArrayList()) ?: ArrayList()
```
The Read method is used to obtain data from the database, while the Write method is used to insert data into the database. The methods `read()` and `write()` are thread safe and must be called outside of the UI thread. For this case, we are going to perform insert action within a `Coroutinescope`. 

```kotlin
binding.btnSave.setOnClickListener {
            //checks if the inserting field are empty
            if (binding.etTitle.text.isEmpty() && binding.etDescription.text.isEmpty()){
                return@setOnClickListener
            }
           CoroutineScope(Dispatchers.IO).launch {
               //adding data to the array list
               val note = Notes(binding.etTitle.text.toString(),binding.etDescription.text.toString())
               noteList.add(note)
               //inserting data to paper database
               Paper.book().write("notes",noteList)
           }
            //Navigating back
            startActivity(Intent(this,MainActivity::class.java))
            finish()
        }
```
> Ensure that binding is enabled in your project.

### Step 7 - Getting all notes
Since getting all notes uses the `read()` method which should be called outside of the UI thread. This action will be done in the main thread.
```kotlin
 CoroutineScope(Dispatchers.Main).launch {
            //checks if the array list has data
            notes = Paper.book().read("notes",ArrayList<Notes>()) ?: ArrayList<Notes>()
            //submiting data to the adapter
            notesAdapter.submitList(notes)
            //setting data to the recyclerView
            binding.noteRecycler.adapter =notesAdapter

        }
```
> Note: You must create an adapter and initialize it also defines an ArrayList variable to hold the notes.

### Step 8 - Deleting all Notes
To do a delete operation The deletion function in the Paper library accepts the key as an input, checks if the provided key has any value, and then performs the action. The deletion method is as shown below:
```kotlin
Paper.book().delete("notes")
```
### Demo

![demo1](/engineering-education/getting-started-with-paper-database-in-android/demo1.png)

![demo2](/engineering-education/getting-started-with-paper-database-in-android/demo2.png)

![demo3](/engineering-education/getting-started-with-paper-database-in-android/demo3.png)

![demo4](/engineering-education/getting-started-with-paper-database-in-android/demo4.png)

### Conclusion
In this tutorial, we have discussed what is database and paper databases as used in android, the advantages, and disadvantages of the paper database, where to use the paper database, and how to implement paper databases in android.

You can get the full implementation of this tutorial on this GitHub repository [Paper Database](https://github.com/brandy-kay/PaperDbTest).
