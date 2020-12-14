### Introduction
Most Android applications require local data storage. In the past years, this has been achieved through the use of SQLite database. Room is a persistent library that is part of the android jetpack. It is built on top of SQLite. The room persistent library has many advantages over raw SQLite. One advantage is that it saves a developer from writing a lot of boilerplate code to create and manage databases. It also provides compile-time validation of SQL queries. This means that an application won't compile if there is an SQL query error. This prevents the developer from encountering run time errors. 

This article goes through creating an android application that uses room persistent library to create and manage SQLite databases. We are going to create a simple ToDo list application. The list will be stored locally using the library.

Without further ado. Let's dive in!

### Prerequisites
To follow through with this tutorial, you will need to:
  1. Have [Android Studio](https://developer.android.com/studio) installed.
  2. Have a basic knowledge of building Android applications.
  3. Have a basic understanding of [Kotlin](/engineering-education/kotlin-collections/) programming language, 
  [SQL](https://en.wikipedia.org/wiki/SQL), 
  [MVVM](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin) architecture and Kotlin [coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html).

Let's get started!

### Step 1 — Getting started
In this step, we are going to take a look at what makes up the room database. The main components are:
 1. Entity - An entity is a class that is annotated with the `@Entity` annotation. This class represents a database table.
 2. DAO - A `Data Access Object` is used to map SQL queries to functions. It is an interface annotated with the `@DAO` annotation.
 3. Room Database - This class acts as an access point to the SQL database. The class uses the DAO to issue queries to the SQL database.

With that bit of information, let's start implementing room in our application. First, download the starter application from [github](https://github.com/kayere/To-do/tree/start-up). It is just a basic android application with only the UI logic. Our work will be to build the functionality. After downloading, sync the project to download the necessary dependencies.

With that done, let's now proceed to the main task.

### Step 2 — Creating the Entity
Create a package named `db` and add a Kotlin class inside it. As mentioned earlier, this is the class that we will use to define our table, i.e, its name and column properties.

Add the following code to the class.
```Kotlin
@Entity
data class ToDo( @PrimaryKey val content: String)
```
Since we are going to record a sentence for each to-do item, we only need one field in the table. We annotate the field with `@PrimaryKey` to declare it the primary key for our table. One important property of the primary key is the `autogenerate` parameter. It is a boolean property. We set it to true when the primary key is a value that can autoincrement. For our case, the primary key is a string provided by the user hence we can not apply that property. There are many annotations for table fields. You can read more about the fields [here](https://developer.android.com/training/data-storage/room/defining-data).

### Step 3 — Creating the DAO
Now that we have defined our table, let's go ahead and create functions to query our table. Still, in the `db` package, create another file and name it `DAO`. We need to create three functions. One to get the ToDO list, another to save a ToDo item, and another one to delete a ToDo item.

Add the code below to implement this.
```Kotlin
@Dao
interface Dao {
    @Insert
    fun addItem(todo: ToDo)

    @Query("SELECT * FROM ToDo")
    suspend fun getList()

    @Query("DELETE FROM ToDo WHERE content = :content")
    suspend fun deleteItem(content: String)
}
```
The `DAO` interface has three major annotations used to query the database.
 1. `@Insert` - This is used to insert data into a table. The item passed in the function that is annotated with this function is added to the database.
 2. `@Query` - This is used when one wants to write an SQL statement. It receives an SQL statement as its parameter. We have used this annotation to get all the ToDo items and to delete one item. We use `@query` to delete an item since there is no particular annotation to delete a single item.
 3. `@Delete` - This annotation is used to delete the contents of a database.

We have marked the two functions as suspending so that they do not block the UI.

That's all we need for the DAO. Let's now create the database class.

### Step 4 — Creating the Database class
As mentioned earlier, the database class uses the data access object to issue queries to the database. For this reason, the class must hold a reference to the DAO. Write the code below in the database class

```Kotlin
abstract class ListDatabase : RoomDatabase(){
    abstract fun Dao(): Dao

    companion object {
        @Volatile
        private var INSTANCE: ListDatabase? = null

        fun getDatabase(context: Context): ListDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                        context.applicationContext,
                        ListDatabase::class.java,
                        "list_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
```
 
The class needs to exhibit the singleton feature. To do this, we declare the class as abstract and then use a companion object housing a function to create the database instance. By singleton, we mean that only one database instance should be created during the lifetime of the application's process. Creation of multiple instances may lead to errors in data management. To create the instance, we first declare a variable to hold the instance. Then, in the getDatabase method, we check whether the INSTANCE variable is null, we return it if it is not null. If null we use the Room.databaseBuilder method to create the database. In the method, we pass in the application context, database class, and the database name as parameters. We then update the instance variable before returning the instance.

That is what we need for the database class.

### Step 5 — Creating a Repository
A repository acts as a single source of truth. It is mostly used when an application has multiple sources of data i.e. local and remote sources. We don't really need it in our application but it is a good practice to use it.

Create another kotlin class and name it `Repository`. The class needs to hold a reference to the Data access object.

Add the code below to the class.
```Kotlin
class Repository(private val dao: Dao) {
    fun getList() = dao.getList()

    suspend fun addItem(item: ToDo) = dao.addItem(item)

    suspend fun deleteItem(item: String) = dao.deleteItem(item)
}
```
We are going to call these functions from the view model.

### Step — Finishing up
We are done implementing the room database. What's left is completing the other components of the applications. This does not need much explanation.
First, go to `MAViewModel` and add the following in the `MAViewModel` class.

```Kotlin
val items = repository.getList().asLiveData()

fun addItem(item: ToDo) = runBlocking{ repository.addItem(item) }
    
fun deleteItem(item: String) = runBlocking { repository.deleteItem(item) }
```
Then navigate to `MainActivity` and add the code bellow above `onCreate` method
```Kotlin
val vm: MAViewModel by viewModels { MAViewModelFactory(initDb()) }

  private fun initDb(): Repository {
    val db = ListDatabase.getDatabase(this)
    return Repository(db.Dao())
}
```
This code initializes the database and the view model passing in the required dependencies.

Now we need to add code to respond to the `UI`. Add the following statement to the `setPositiveButton` method of the `AlertDialog`.
```Kotlin
vm.addItem(ToDo(view.item.text.toString()))
```
Then add
```Kotlin
vm.deleteItem(viewHolder.itemView.textView.text.toString())
```
in the `onSwiped` method of the `ItemTouchHelper` class.

Lastly, add the code below in the `onCreate` method to observe and display database contents.
```Kotlin
vm.items.observe(this, {
    todoList.adapter = ListAdapter(it)
})
```

That's all! Build and run the application.

This is how the application should look like.

![final app](/engineering-education/introduction-to-room-db/app.gif)

### Conclusion
In this article, we have gone through the room database. What it is, its advantages, and its basic components. We have also seen how Room contributes to and follows the MVVM architecture. With that, you can now confidently implement room database in a new or existing application. You can find the source code for the full application from [github](https://github.com/kayere/To-do/tree/master)
