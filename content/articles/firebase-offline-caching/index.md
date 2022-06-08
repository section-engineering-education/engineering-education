---
layout: engineering-education
status: publish
published: true
url: /firebase-offline-caching/
title: Implementing Offline Caching In Room For Data Fetched From Firebase Using Kotlin
description: In this tutorial, we will learn how to implement offline caching in Firebase with the Room persistence library.
author: stephen-odhiambo
date: 2022-05-04T00:00:00-12:58
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/firebase-offline-caching/hero.png
    alt: Implementing Offline Caching In Room For Data Fetched From Firebase Using Kotlin Hero Image
---
Firebase is a platform that provides remote services like a real-time database that allows users to store and access data remotely on a real-time basis. Accessing remote data requires a stable internet connection. 
<!--more-->
In some cases, there may be a need for an app user to access the remote data while offline. This is where offline caching comes in.

Room persistence library allows offline caching even for data from Firebase's real-time database. Although Firebase provides the ability to access data offline, there is a limitation to the size of data that can be cached which is 10MB maximum.

In this tutorial, we will learn how to implement offline caching in Firebase with the Room persistence library. We will build an application with a clean Architecture that fetches data from a real-time database and caches it to the local database before presenting it to the user in the interface.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Room database recap](#room-database-recap)
- [Getting started](#getting-started)
- [Setting up the project](#setting-up-the-project)
  - [Step 1 - Creating model class](#step-1---creating-model-class)
  - [Step 2 - Defining utility items](#step-2---defining-utility-items)
  - [Step 3 - Creating data classes](#step-3---creating-data-classes)
  - [Creating DAO interface](#creating-dao-interface)
  - [Creating database class](#creating-database-class)
  - [Step 4 - Repository class](#step-4---repository-class)
  - [Step 5 - Adapter class](#step-5---adapter-class)
  - [Step 6 - ViewModelClass class](#step-6---viewmodelclass-class)
  - [Step 7 - MainActivity class](#step-7---mainactivity-class)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you must have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your computer.
- The basics of using [Kotlin](https://kotlinlang.org/) programming language.
- Knowledge in [Coroutines](https://developer.android.com/kotlin/coroutines).
- A basic understanding of [Firebase Realtime Database](https://firebase.google.com/docs/database/android/start).
- Basics of [Room](https://developer.android.com/training/data-storage/room) persistence library.

### Room database recap
Room is a persistent database library that is built on top of the SQLite database. It allows for storing data locally and even caching remote data to be accessed offline on Android devices.

Offline caching leverages various benefits to your app's users not only limited to offline access of data but also faster data access. When the data is locally cached in your android device, the speed of access will be increased since the data is locally available. 

With the Room persistence library, you can enable offline caching by temporarily storing the data fetched from the remote service first before presenting it to the user. This way, the user can continually have a view of the data without necessarily sending queries to the remote database every time. 

To help you learn more about using Room, you can refer to this article [here](https://www.section.io/engineering-education/introduction-to-room-db/)

### Getting started
In this tutorial, we will create an app that stores data in a firebase real-time database. We will then learn how to fetch the data, cache it with the Room persistence library, and display it on the screen.

> Make sure that you have linked your project with Firebase and ViewBinding is also enabled. To get started with Firebase, you can refer [here](https://www.section.io/engineering-education/firebase-email-and-password-authentication-in-android-using-kotlin/).

### Setting up the project
After you have created an Android project in your Android studio and linked it with Firebase, we can now set up the project. We first start by adding the necessary dependencies. 

In your app-level `build.gradle` file, add the following dependencies:

```gradle

    //Firebase RealTimeDatabase
    implementation 'com.google.firebase:firebase-database-ktx'
    //Glide
    implementation 'com.github.bumptech.glide:glide:4.13.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.13.0'
    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"
    // Livedata
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle_version"
    // Coroutines
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:$coroutines_version"
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.5.1'
    // Room
    implementation "androidx.room:room-runtime:2.4.2"
    kapt "androidx.room:room-compiler:2.4.2"
```

The app we are going to build will have many classes. To avoid confusion and maintain clean code, we will create packages that will separate the classes. 

Right-click on the main/root directly and create the following packages; `ui`, `util`, `repository`, `viewmodel`, `adapter`, `model`, `data`(`local`). Data has a sub-package for holding the local database.

The project build will have a single screen that has a `RecyclerView` for displaying the data fetched from the real-time database, a `Progressbar`, and a `SearchView`.

Now that we have set the project structure, we can dive into implementation.

#### Step 1 - Creating model class
The model class is a data class whose main purpose is to hold the data that is being fetched from the Firebase real-time database. Since we want to cache the data using Room, we must annotate the model class with the `@Entity` class. 

This class will serve both as the remote and local data class. 

Optionally, you can as well create a separate model data class and annotate it with `@Entity`. This model class will hold the data from [this](https://drive.google.com/file/d/1j_Oyh3Yce2WR5JqB1wPtUF1UMZePbN0l/view?usp=sharing) JSON file. 

You should import this file into your Firebase real-time database using the code below:

```kotlin
@Entity(tableName = "items")
data class ItemsEntity (
    @PrimaryKey(autoGenerate = true) val id: Int?,
    val itemImage: String? = null,
    val itemName: String? = null,
    val itemOldPrice: String? = null,
    val itemPrice: String? = null
)
```

#### Step 2 - Defining utility items
In the `util` package, define the following utility items. The utility package is for defining utility methods constants that can be reused in various classes.

```kotlin
sealed class Resource<T>(val data: T? = null, val message: String? = null) {
    class Success<T>(data: T) : Resource<T>(data)
    class Loading<T>(data: T? = null) : Resource<T>(data)
    class Error<T>(message: String, data: T? = null) : Resource<T>(data, message)
}
```
This sealed class will help us in handling the three states of our real-time database network calls i.e `Loading`, `Success`, and `Error`.

#### Step 3 - Creating data classes
We will define our `DAO` and `Database` classes in the `data` package.

#### Creating DAO interface
DAO is an interface that has methods for manipulating the local database. It should look like the one below:

```kotlin
@Dao
interface ItemsDao {
    // Method for inserting items into our DB
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItems(items: ItemsEntity)

    // Method for getting all items from the DB
    @Query("SELECT * FROM items ORDER BY id ASC ")
    fun getAllItems(): Flow<List<ItemsEntity>>
    
    // Method for searching an item from the DB
    @Query("SELECT * FROM items WHERE itemName LIKE :searchQuery")
    fun searchDatabase(searchQuery: String): Flow<List<ItemsEntity>>
}
```

#### Creating database class
This class has a single method that returns the object of our DAO.

```kotlin
@Database(
    entities = [ItemsEntity::class],
    version = 1
)
abstract class ItemsDatabase: RoomDatabase() {
    abstract fun getItemsDao(): ItemsDao
}
```

#### Step 4 - Repository class
This class will have the business logic for fetching the data and caching it for offline access. In the `repository` package, create a repository class and name it `ItemsRepository`.

```kotlin
import androidx.lifecycle.LiveData
import com.google.firebase.database.*
import kotlinx.coroutines.flow.Flow
import timber.log.Timber
import javax.inject.Inject
class ItemsRepository (private val itemsDao: ItemsDao) {
    private var databaseReference: DatabaseReference = FirebaseDatabase.getInstance().getReference("items")
    private var items: ArrayList<ItemsEntity> = arrayListOf()

    fun getAllItems(): Flow<List<ItemsEntity>> {
        return itemsDao.getAllItems()
    }

    suspend fun insertItems(items: ItemsEntity){
        return itemsDao.insertItems(items)
    }

    fun searchDatabase(searchQuery: String): Flow<List<ItemsEntity>> {
        return itemsDao.searchDatabase(searchQuery)
    }

    init {
        databaseReference.addValueEventListener(object : ValueEventListener {
            override fun onCancelled(p0: DatabaseError) {
            }

            override fun onDataChange(p0: DataSnapshot) {

                items = ArrayList()
                if (p0.exists()) {
                    for (i in p0.children) {
                        val itm = i.getValue(ItemsEntity::class.java)
                        items.add(itm!!)
                    }
                    Resource.Success("Data fetched successfully")
                }
                else{
                    Resource.Error("Unknown error occurred", null)
                    // binding.progressBar.isVisible = true
                    //binding.button2.isVisible = true
                }
            }
        })
    }
}
```

#### Step 5 - Adapter class
This class is for displaying the items in a `RecyclerView`. We shall create this class inside the `adapter` package. The purpose of this class is to make a `View` for every item that is fetched from the Firebase real-time database. 

In case you are new to creating `RecyclerView` and adapters, you can refer [here](https://www.section.io/engineering-education/handling-recyclerview-clicks-the-right-way/) where it's wholly covered.

```kotlin
 class ShoppingAdapter(private var itemsEntityList: ArrayList<ItemsEntity>): ListAdapter<ItemsEntity, ShoppingAdapter.MyViewHolder>(
     DiffUtiCallback) {

    object DiffUtiCallback: DiffUtil.ItemCallback<ItemsEntity>() {
        override fun areItemsTheSame(oldItem: ItemsEntity, newItem: ItemsEntity): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(oldItem: ItemsEntity, newItem: ItemsEntity): Boolean {
            return oldItem.id == newItem.id
        }
    }

    inner class MyViewHolder(private val binding: ItemsRowBinding): RecyclerView.ViewHolder(binding.root) {
        @SuppressLint("SetTextI18n")
        fun bind(itemsEntity: ItemsEntity?) {
            Glide.with(binding.itemImageView).load(itemsEntity?.itemImage).placeholder(R.drawable.ic_rolling_0_7s_128px).into(binding.itemImageView)

            binding.nameTv.text = itemsEntity?.itemName
            binding.itemPrice.text = "Ksh: ${itemsEntity?.itemPrice}"
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        return MyViewHolder(ItemsRowBinding.inflate(LayoutInflater.from(parent.context),parent, false))
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val items = getItem(position)
        holder.bind(items)
        itemsEntityList.add(items)
    }
}
```

#### Step 6 - ViewModelClass class
This class is responsible for storing and managing UI data. In the `viewmodel` package, we will create the `MainViewModel` class as shown below:

```kotlin
class MainViewModel (private val repository:ItemsRepository) : ViewModel() {
    var items: LiveData<Resource<List<ItemsEntity>>>? = null

    // Called the moment ViewModel is created
    init {
        getItems()
    }

    private fun getItems() {
        viewModelScope.launch {
            items = repository.getAllItems()
        }
    }
}
```

The final part involves displaying the data in the UI which we shall implement inside our `MainActivity` class.

#### Step 7 - MainActivity class
In this class, we will implement the logic of displaying the data fetched from the real-time database to the layout.

First, we will create the instance of our adapter and ViewModel classes as shown below:

```kotlin
    private val adapter by lazy { PostAdapter() }
    private val viewModel: MainViewModel by viewModels()
```

After creating the instances, we will use them to display the data to the layout. Below is the full implementation of the MainActivity class:

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
     private val adapter by lazy { PostAdapter() }
    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()
        subscribeToPostsObserver()

    }

    private fun subscribeToPostsObserver(){
        viewModel.items?.observe(this, Observer { result ->
            when (result){
                is Resource.Loading<*> ->{
                    binding.progressBar2.isVisible = true
                }
                is Resource.Success<*> -> {
                    binding.progressBar2.isVisible = false
                    val posts  = result.data
                    adapter.submitList(posts)
                    binding.recyclerView.adapter = adapter
                }
                is Resource.Error<*> -> {
                    binding.progressBar2.isVisible = false
                    Snackbar.make(binding.root, result.message.toString(), Snackbar.LENGTH_LONG).show()
                }
            }
        })
    }
}
```
![Project Demo](/engineering-education/firebase-offline-caching/screen-layout.png)

### Conclusion
In this article, we looked at how to offline cache data from Firebase's real-time database with Room. Room persistence library can also be used with Retrofit to cache data fetched from the internet. 

This feature can also be implemented using other Android database libraries like [realm](https://www.section.io/engineering-education/using-realm-database-in-android/).

Happy Coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)