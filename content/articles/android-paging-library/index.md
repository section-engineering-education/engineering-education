---
layout: engineering-education
status: publish
published: true
url: /android-paging-library/
title: Paging in Android
description: This article takes the reader through integrating the paging library into an Android application. Paging library helps in fetching data in page sets rather than a single list.
author: linus-muema
date: 2021-02-04T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-paging-library/hero.png
    alt: Paging image example
---
With an increase in data, we may need to display it in small amounts in our application. This ensures that the device's resources are not overused. Take for instance a database that receives updates every day. We would not need to display data that was updated a week ago unless the user requests it. 
<!--more-->
A good approach would be to split the data into "pages" and show it to the user one "page" after another. Some restful services like [The Dog API](https://docs.thedogapi.com/) have adopted this technique. In Android, achieving such a workflow has proved to be a tedious process that can get messy if not handled well. 

That is where the [paging library](https://developer.android.com/topic/libraries/architecture/paging) comes into play. It ensures a clean flow of data by observing the user's scrolling process. 

The basic flow is, once a user nears the end of a recyclerview, the library fetches the next set of data and updates the recyclerview. In this tutorial, we shall integrate the paging library into an Android application.

***NOTE: This tutorial uses version 2 of the paging library at the time of publishing. Version 3 is in `alpha` and not suitable for production.***

### Prerequisites
To follow through the article, you will need:
- Android Studio installed
- A basic understanding of Kotlin
- Some experience with the [Room library](/introduction-to-room-db).

### Step 1 — Getting the starter code
You can [download](https://github.com/LinusMuema/kotlin/archive/54d55dbdda3afd9d166e765a3f8107eee2745954.zip) the starter code for this tutorial on GitHub.

In the starter code, we have a `RoomDatabase.Callback` that populates our local database with 50 users on creation. We shall be using this data to demonstrate the paging library.

### Step 2 — Reading data from Room
In the `AppDao` interface, we have a function to read data from our database. It has a return type of `DataSource.Factory<Int, User>`. `DataSource` is used to load our data in form of pages into a `PagedList` once it is requested.

The `Int` tells Room to make use of a `PositionalDataSource` object. `PositionalDataSource` is used when the size of data is known and the data is grouped based on its position. If we were getting data from the network, we would make use of `PageKeyedDataSource`. This is because the data size is only known when we get a response from the network.

### Step 3 — Setting up the adapter
The adapter is used to connect our recyclerview to the paged data. In the `androidkt` directory, create a class called `UsersAdapter` and add the code below.

```kotlin
class UsersAdapter: PagedListAdapter<User, UserViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
    }
}
```

We infer two types in the `PagedListAdapter`: the data type of each list item and the `viewholder`.

In the same file, create the `UserViewHolder` class and make it extend the `RecyclerView.ViewHolder` class.

```kotlin
class UserViewHolder(): RecyclerView.ViewHolder()
```

Add the following to the `onCreateViewHolder` to create the `viewholder` for our list item.

```kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
    return UserViewHolder(ListItemBinding.inflate(LayoutInflater.from(parent.context), parent, false))
}
```

The application uses the [ViewBinding](https://developer.android.com/topic/libraries/view-binding) library so we pass in the binding class to the viewholder.

```kotlin
class UserViewHolder(private val binding: ListItemBinding): RecyclerView.ViewHolder(binding.root)
```

In the `onBindViewHolder`, we take care of binding the data to the viewholder. 

Add the following code:

```kotlin
override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
    holder.bind(getItem(position)!!)
}
```

We use the `getItem` method to get the item in the list based on position. In the `viewholder` class, add the `bind` function to add data to the UI.

```kotlin
fun bind(user: User) {
    binding.name.text = user.name
    binding.phone.text = user.number.toString()
    binding.profile.load(user.image)
}
```

The application has the [coil](https://github.com/coil-kt/coil) image library set up. We load the images using the `load` extension.

In a normal recyclerview setting, this would be the end of it, but we still have an error in our `UsersAdapter` class. The `PagedListAdapter` requires a `diffing` callback.

In the same file, add the following code:

```kotlin
private val DIFF_CALLBACK = object : DiffUtil.ItemCallback<User>() {
    override fun areItemsTheSame(oldItem: User, newItem: User) =
        oldItem.number == newItem.number

    override fun areContentsTheSame(oldItem: User, newItem: User) =
        oldItem == newItem

}
```

We use the `DiffUtil` to check the difference in multiple lists for correct positioning and animations wherever needed. You can go through [this article](https://medium.com/@sienatime/investigating-pagedlistadapter-performance-and-diffutil-970a20285a24) for a better understanding of the purpose of this util class.

Our adapter is now ready to be used.

### Step 4 — Finishing up
In our `MainViewModel`, get an instance of the database in order to access the dao. Then get the datasource and convert it to `LiveData`.

```kotlin
private val dao = AppDatabase.getDatabase(application).dao()
val users = dao.getUsers().toLiveData(pageSize = 10)
```

We pass in the page size to define how many items will be emitted at once. Now, our data will have 5 pages or rather, 5 `PageList` objects will be emitted.

Create an instance of our adapter. Then observe the value in the `MainActivity`. Once a value is emitted, submit the list to the adapter.

```kotlin
viewModel.users.observe(this, { usersAdapter.submitList(it) })
```

Create the binding object for the `MainActivity` and set content layout. Use the binding object to get the recyclerview and set the adapter.

```kotlin
class MainActivity : AppCompatActivity() {

    private val viewModel: MainViewModel by viewModels()
    private lateinit var binding: ActivityMainBinding
    private val usersAdapter = UsersAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)

        viewModel.users.observe(this, { usersAdapter.submitList(it) })
        binding.recycler.adapter = usersAdapter
        setContentView(binding.root)
    }
}
```

Once you run the application, you should get a list of the users.

***NOTE: Don't forget to add internet permission in the application manifest for image downloading.***

### Conclusion
We just went through how you implement the paging library in an Android application. The setup is similar to the recyclerview setup and is also quite simple. The library also ensures a good flow of data when updating your list. Next up we shall check on migrating to paging library version 3. You can go ahead and check the final code on [GitHub](https://github.com/LinusMuema/kotlin/tree/paging-2). 

Feel free to raise any issue or PR.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
