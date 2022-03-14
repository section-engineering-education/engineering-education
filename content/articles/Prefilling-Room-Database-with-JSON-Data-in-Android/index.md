### Introduction
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
- [Adding the Class to the Database](#step-7---adding-the-class-to-the-database)
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
It is a technique in which an application is launched with existing data in its database, which might be a prepared database(.db) files stored on the device's file system or even JSON data.

### Getting Started with Pre-populating Room Database.
In this scenario, let's make an app that functions similarly to a note app, with the exception that we'll just evaluate the note title and description.

### Step 1 - Creating a New Project
To create a new project with the Android Studio IDE, go to File > New > New Project. After that, choose an empty activity and click Next, as seen below. Select Kotlin as the language and click OK after giving the project a suitable name.

![new project](/engineering-education/Prefilling-Room-Database-with-JSON-Data-in-Android/new-project.png)

### Step 2 - Adding the Necessary dependencies
Since we shall be working with the room database, we'll need room database dependencies. coroutine dependencies and Kotlin Extensions and Coroutines support for Room Dependencies therefore include the following in your build. Gradle app-level file.
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
The user interface under consideration makes use of'recyclerView' to display data and is defined as follows.
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
> Make sure to define your row that would define how the data is shown in the recycler view.

### Step 4 - Creating a Room Database
Room databases are made up of three instances: entity, dao, and database. Let's define all three of these instances to make our room database.
#### Entity
Entity is a data type that functions similarly to a table, and it is often defined as illustrated below.
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
DAO is a Data Access Object that is used to access database-stored data. It functions by using methods like insert, get, delete, and update.it is an interface which is defined as shown below
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
Database is an abstract class which makes use of the data access object instance to perform its functionality and for that case DAO instance should be included. Database is defined as shown below.
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
To make use of JSON data to perform pre-population to a room database, the JSON data should be included within the project. This is done by creating a subdirectory raw within the res folder then within the subdirectory add your JSON File.

![Json](/engineering-education/Prefilling-Room-Database-with-JSON-Data-in-Android/json.png)

### Step 6 - Creating a Prefilling Class
Let's make a prefilling class that takes contexts in its constructor and extends `RoomDatabase.Callback()`. which is invoked after all of the tables are built. When the database is created, that is. Within the class, the `onCreate` method. which accepts a database of type `SupportSQLiteDatabase` as a parameter is overridden, and this is where all of the class's functions are called.
```kotlin
class StartingNotes(private val context: Context) :RoomDatabase.Callback() {
    override fun onCreate(db: SupportSQLiteDatabase) {
        super.onCreate(db)
        
    }
} 
```
A method which is used to load JSON data is defined as shown below
```kotlin
 // load JSON data
    private fun loadJSONArray(context: Context):JSONArray?{
        //obtain input byte
        val inputStream = context.resources.openRawResource(R.raw.notes) 
        //using Buffered reader to read the inputstream byte
        BufferedReader(inputStream.reader()).use {
            return JSONArray(it.readText())
        }
    }
```
Then, as seen below, a suspend function is defined to conduct the database filling.
```kotlin
    //Filling database with data from JSON
    private suspend fun fillWithStartingNotes(context: Context){
        //obtaining instances of data access object
        val dao = NoteDatabase.getInstance(context)?.dao

        // use try catch to load the necessary data
        try {
            //create a variable that holds the loaded data
            val notes = loadJSONArray(context)
            if (notes != null){
                //looping through the variable as specified fields are loaded with data
                for (i in 0 until notes.length()){
                    //variable to obtain the JSON object
                    val item = notes.getJSONObject(i)
                    //Using the JSON object to assign data
                    val noteTitle = item.getString("note-title")
                    val notesDescription = item.getString("note-description")

                    //data loaded to the entity
                    val noteEntity = NoteEntity(
                        noteTitle,notesDescription
                    )

                    //use dao to insert data into the database
                    dao?.insertNote(noteEntity)
                }
            }
        }
        //error when exception occurs
        catch (e:JSONException) {
            Timber.d("fillWithStartingNotes: $e")
        }
    }
```
### Step 7 - Adding the Class to the Database
Where does the class have to be used now that it's been created? To complete the prefilling feature, the prefilling class defined above must be added to the database. This is done with the aid of the `.addCallback()` function when the database instance is created.
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
The View model is a class that allows data to withstand changes in system settings such as screen rotation and keyboard visibility. The ViewModel factory is used to produce and return  ViewModel objects that have survived system configurations. The ViewModel class extends `ViewModel()` and should include database instance in its constructor. it is implemented shown below
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
### Step 9 - Displaying Data
Since the JSON data has already been loaded to the database it should be displayed to the user interface. The data are displayed onto the `recyclerView` initially defined. The below implementation explains how data is displayed.
```kotlin
class MainActivity : AppCompatActivity() {
    //declaring adapter, ViewModel, and binding
    private lateinit var binding: ActivityMainBinding
    private var adapter by lazy { NotesAdapter() }
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        //instance of database
        val noteDatabase = NoteDatabase.getInstance(this)
        val myViewModelFactory = MyViewModelFactory(noteDatabase!!)

        viewModel = ViewModelProvider(this, myViewModelFactory).get(MainViewModel::class.java)

        //submitting data to the adapter where it is mapped to recyclerview 
        viewModel.notes.observe(this, Observer { result ->
            adapter.submitList(result)
            binding.recyclerView.adapter = adapter
        })
    }
}
```

>Create an adapter that acts as a bridge between the user interface and data sources also, creates a ViewModel Factory which is used to create 

### When is it Necessary to Pre-populate a Room Database
- If the program should be launched with a certain set of data.
- If any explanations need to be completed and are stored in a JSON file.
- If the program is complicated and the UI components require a literal explanation

### Demo
![Demo](/engineering-education/Prefilling-Room-Database-with-JSON-Data-in-Android/demo.png)

### Conclusion
In this tutorial, we have gone through what is pre-populating room database with initial data as used in android. what is a room Callback is and how is it added to the database? How to implement prefilling room database with data and when it is necessary to pre-populate a room database.

This GitHub [Repository](https://github.com/benta-odek/PrefillingRoomDbDemo) contains the complete code. 

