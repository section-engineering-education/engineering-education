### Comparing RxKotlin to Kotlin Coroutines in Performing Background Task
RxKotlin is a kotlin library built on top of RxJava that adds a lightweight basic extension function to RxJava, making it easier to deal with from kotlin. Kotlin Coroutines, on the other hand, are little threads that make asynchronous code execution easier.

RxKotlin's main feature is its ability to prevent memory leaks up to 90% by replacing normal Android techniques, which is similar to garbage collection in C.

### Prerequisites
To follow along with is the tutorial:
- Have a basic understanding of the Kotlin programming language.
- Have a basic understanding of Android development.
- Be familiarised with the implementation of Room database concepts.

### Goals
This article will walk the reader through the concept of RxKotlin and how it is used in Android applications, as well as its benefits and drawbacks, including all of the features that distinguish it from kotlin coroutines.


#### Features of RxKotlin
- `Observable` - These are the sequence of data or events that are reacted to example data from web service or introduced by the user.
- `Subscriber` - This is an extension function that is used on an observable variable to ensure that the observer sends an event.
- `Flowable` - This is a framework on RxKotlin which is used when observables emit a huge amount of data that the computer cannot handle.
- `Maybe` -  This is a programming strategy for RxKotlin that emits an error, single value, or no value. It is a good strategy for the database concept which requires things like update and deletion.
- `Disposable` - It is an interface within the RxKotlin library that provides the method `dispose()` that is used to cancel the subscription.

### Advantages of Rxkotlin to Kotlin Coroutines
- It is possible to unsubscribe from an observer in RxKotlin using the built-in class 'Disposable,' which isn't available in the Kotlin coroutine.
- To deal with backpressure, RxKotlin makes use of Flowable. Backpressure occurs when an observable produces a huge amount of data that the user is unable to handle.
- With the help of the 'Maybe' programming method, RxKotlin can provide one output at a time. 

### Disadvantages of RxKotlin
- `observerOn()` and `subscriberOn()` are used in RxKotlin to assign tasks, which can be confusing for programmers.
- The concept of `callback`, which is present in kotlin coroutines, is not considered in RxKotlin.
- Background thread substitution is not obvious in RxKotlin since its implementation makes the code less clean and verbose.

### Getting Started with RxKotlin
To explain the concept and implementation of RxKotlin we'll be using a room database to store and retrieve data using RxKotlin.

### Step 1: Start a New Project
Start the Android Studio IDE and create a new project. Then, as seen below, select an empty activity and click Next. Name the project appropriately, choose Kotlin as the language, and then click OK.

![new project](/engineering-education/comparing-rxkotlin-to-kotlin-coroutines-in-performing-background-task/new_project.png)

### Step 2: Adding RxKotlin and Room database dependencies 
Navigate through the project and select the package `Gradle scripts`. Next select `build.gradle` app-level add the dependencies the following dependencies and sync the project.
```Gradle
//RxKotlin
implementation "io.reactivex.rxjava3:rxandroid:3.0.0"
implementation "io.reactivex.rxjava3:rxkotlin:3.0.1"

 //Room Database
def room_version = "2.4.1"
implementation "androidx.room:room-runtime:$room_version"
kapt "androidx.room:room-compiler:$room_version"
```
> Note: Ensure you add the `Kotlin-Kapt` within plugins

### Step 3: Creating the User Interface
Let's build a user interface that will allow us to display data as well as add data to our room. In the case of data display, data is displayed in a recyclerView that is linked to a row layout. We use edit text and a button to add data.
once you design the user interface it should appear as shown.
- Displaying data

![display_ui](/engineering-education/comparing-rxkotlin-to-kotlin-coroutines-in-performing-background-task/display_ui.png)

- Adding Data

![add ui](/engineering-education/comparing-rxkotlin-to-kotlin-coroutines-in-performing-background-task/add_ui.png)

### Step 4: Setting Up Room Database
To work with the room, we must first set up all of the required properties, which include Entity, Dao, and Database.

#### Entity
This is a data class that is used to represent the table and all the content it holds is implemented as shown below.
```kotlin
@Entity(tableName = "Details_table")
data class DetailsEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val name: String? = null,
    val weight: String? = null
)
```
#### The Data Access Object
This is a class that contains all of the methods that will be used to connect with other applications. It is implemented as follows:
```kotlin
@Dao
interface DetailsDao {
    @Insert
    fun insertDetails(details: DetailsEntity)

    @Delete
    fun deleteDetails(details: DetailsEntity)

    @Query("SELECT * FROM Details_table ORDER BY id ASC")
    fun getAllDetails(): List<DetailsEntity>

    @Update
    fun updateDetails(details: DetailsEntity)
    abstract fun findCheese(s: String): List<DetailsEntity>
}
```
#### Database Class
The database is in the application's backend. The code below illustrates how the application database should be designed and implemented.
```kotlin
@Database(entities = [DetailsEntity::class], exportSchema = false, version = 1)
abstract class DetailsDatabase :RoomDatabase() {
    abstract val detailsDao: DetailsDao

    companion object {

        @Volatile
        private var INSTANCE: DetailsDatabase? = null

        fun getInstance(context: Context): DetailsDatabase {
            synchronized(this) {
                var instance = INSTANCE

                if (instance == null) {
                    instance = Room.databaseBuilder(context.applicationContext,
                        DetailsDatabase::class.java,
                        "notes_database").fallbackToDestructiveMigration().build()

                    INSTANCE = instance
                }
                return instance
            }
        }
    }
}
```
### Step 5: Creating Adapter Class
The adapter class is used to connect the entity of the room database to the views to effectively show data. It's done in the way that's shown below.
```kotlin
class DetailsAdapter : ListAdapter<DetailsEntity, DetailsAdapter.MyViewHolder>(DiffUtilCallback) {

    //Compare old and new data
    object DiffUtilCallback : DiffUtil.ItemCallback<DetailsEntity>() {
        override fun areItemsTheSame(oldItem: DetailsEntity, newItem: DetailsEntity): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(oldItem: DetailsEntity, newItem: DetailsEntity): Boolean {
            return oldItem.id == newItem.id
        }
    }

    //Connects the data with the views
    inner class MyViewHolder(private val binding: RxRowBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(details: DetailsEntity?) {
            binding.tvName.text = details?.name
            binding.tvWeight.text = details?.weight
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        return MyViewHolder(
            RxRowBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        )
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val note = getItem(position)
        holder.bind(note)
    }
}
```

### Step 6: Implementing RxKotlin to Add data to Room
When conducting data addition, we have the option of using coroutines or RxKotlin, both of which allow us to do it in the background. To accomplish this in RxKotlin, we'll create a function to assist us in performing this procedure and then load the subscription into the 'onCreate' method. The following is an example of how it's done.
```kotlin
private fun addingDetails(context: Context): Flowable<List<Long>> {
        return Maybe.fromAction<List<Long>>(){
            // creating database instance
            val database = DetailsDatabase.getInstance(context = context).detailsDao

            //Adding data using the data class
            val details = DetailsEntity(0,binding.edtName.text.toString(),binding.edtWeight.text.toString())
            //inserting data
            database.insertDetails(details)
        }.toFlowable() // using flowable to handle huge data emission
            .observeOn(AndroidSchedulers.mainThread())  //placing observer to the main thread
            .subscribeOn(Schedulers.io()) //subscribing to the io thread
            .doOnComplete {
                Toast.makeText(context, "Completed", Toast.LENGTH_SHORT).show()
            }
            .doOnError {
                Toast.makeText(context, "Error Occured", Toast.LENGTH_SHORT).show()
            }
    }
``` 
> Make sure you declare the instance using the example of the database instance.

- Loading subscription
```kotlin
  override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        //creating database instance
        detailsDatabase = DetailsDatabase.getInstance(applicationContext)
        detailsDao = detailsDatabase.detailsDao

        // adding click listener to button
        binding.btnAdd.setOnClickListener {
            if (binding.edtName.text.toString().isEmpty()){
                binding.edtName.error = "Required"
                return@setOnClickListener
            } else if (binding.edtWeight.text.toString().isEmpty()){
                binding.edtWeight.error = "Required"
                return@setOnClickListener
            }
            else{

                // load subscription using disposable
                val loadDisposable = addingDetails(this).subscribe()
                compositeDisposable.add(loadDisposable)

                // shifting to the next activity
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
            }
        }
    }
```
### Step 7: Using RxKotlin to display data
Data should be presented once it has been entered into the database. To display data, we follow the steps outlined below.
```kotlin
 // setting data to the recyclerview
    private fun dataDisplay(context: Context): Flowable<List<Long>> {
        return Maybe.fromAction<List<Long>>(){

            //creating and submiting list to the recyclerview
            val myList = detailsDao.getAllDetails()
            adapter.submitList(myList)
            binding.detailsRecycler.adapter = adapter

        }.toFlowable()
            .observeOn(AndroidSchedulers.mainThread())
            .subscribeOn(Schedulers.io())
            .doOnComplete {
                Toast.makeText(context, "Added", Toast.LENGTH_SHORT).show()
            }
            .doOnError {
                Toast.makeText(context, "Error Occured", Toast.LENGTH_SHORT).show()
            }
    }
```
When the program is run you should expect the below output:

![demo](/engineering-education/comparing-rxkotlin-to-kotlin-coroutines-in-performing-background-task/demo.mp4)

### Conclusion
We have discussed the differences between RxKotlin and Kotlin Coroutines in this tutorial. Rxkotlin's advantages and downsides. Terms used in the RxKotlin implementation, as well as how to use RxKotlin.

Get the full code on this GitHub [Repository](https://github.com/benta-odek/RxKotlin).
