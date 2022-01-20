---
layout: engineering-education
status: publish
published: true
url: /custom-searching-and-filtering-in-firebase-database-in-android/
title: Implementing Custom Searching and Filtering in Firebase Database in Android
description: This tutorial shows the reader how to implement custom searching and filtering in Firebase Database in Android using Kotlin.
author: brandy-odhiambo
date: 2022-01-20T00:00:00-10:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/custom-searching-and-filtering-in-firebase-database-in-android/hero.jpg
    alt: Implementing Custom Searching and Filtering in Firebase Database in Android
---

Firebase Realtime database is a NoSQL database that allows us to store and sync data in real-time between users. This is a large JSON object that developers can manage using a single API in real-time.

<!--more-->

Query instructions simplify filtering and searching data with different attributes in relational databases like MySQL and SQLite. However, filtering and searching can be relatively complex in the Firebase Realtime database, even when conducting simple data queries.

### Prerequisites
To follow along with this tutorial, you should:
- Have a basic grasp of the Kotlin programming language.
- Understand the fundamentals of Android development.
- Be familiar with how to connect your project to Firebase.

### Goals
This article intends to guide and assist readers in fully comprehending the searching and filtering in firebase real-time database and all of the implementation and methods necessary to make this process a success.

### How Firebase Realtime database is structured
In most databases, data is organized in tables and rows. However, the Firebase Realtime database, a NoSQL database, organizes data in JSON format, which is arranged in a tree-like structure called a collection.

To create this tree-like structure, elements called nodes are joined by a general path shared by both connected nodes.

As seen in the diagram below, a child can be nested in the connected nodes to create a widely nested structure.

![database structure](/engineering-education/custom-searching-and-filtering-in-firebase-database-in-android/firebase_database.png)

### Advantages of Firebase Realtime database
- Ability to access the data in the database through a single path.
- Creating a data format in Firebase is simple because you may use an automatically generated ID or define your own.
- A single child path lists all the changes inside the stored data.
- It is a NoSQL database, which means that it is not limited to relational databases.

### Disadvantages of Firebase Realtime database
- Finding a certain item is difficult because there is no query language to use.
- Deleting a specific child item is difficult since it requires searching through all the data to locate the item to be deleted.

### Ways to Filter and Search data in Firebase Realtime database
Even though searching data in a Firebase database is difficult, there are various techniques for searching and filtering data.

These criteria are:
- Through the use of `id`, which is typically used to look for a specific value that has its `id`.
- Through the use of a child path from which any changes to data in the database are listed.
- Through the use of a variable that can be given as a parameter.
- Employing filtering techniques, such as`orderByChild`.

### Methods Used in Filtering data
Several methods help in the filtering and sorting of firebase data. To perform sorting, the below methods are used:

- `orderByChild` - This method sorts the data according to specified sub-collection or child path.
- `orderByKey` - Performs sorting according to the specified key value.
- `orderByValue`-  sorts data according to the given child value.

Also, filtering is handled by the following methods:
- `limitToFirst` -The data is filtered starting with the given parameter value.
- `limitToLast` - restricts the data to the last value supplied.
- `startAt` - starts filtering data at the supplied key or value.
- `startAfter` - filters after a key or value is given.
- `equalTo` filters data in a certain key or value category.
- `endAt` - restricts data to the key or value provided.
- `endBefore` - filters data exactly before the value indicated.

Let's get started :)

### Step 1: Creating an empty project
Launch Android Studio and create an empty activity project to start a new project from scratch. Next, give your project a descriptive name.

![project](/engineering-education/custom-searching-and-filtering-in-firebase-database-in-android/creating_project.png)

### Step 2: Linking your project to Firebase
To gain access to the Firebase database, your project must be connected to Firebase, which can be done in the following way:

On your browser, search Firebase console, go to `Add project` -> Enter project name -> choose default account for Firebase -> Create project.
 
> Ensure you have enabled the Realtime database.

### Step 3: Designing the user interface
In this step, we will create a simple layout that will help display data in a list-like manner. For example, we will have an `EditText` to enter a search term. Also, the layout will have two buttons: one to filter data and another to search.

> Note: You must create a row layout that maps how your data will appear in a RecyclerView.

The user interface should appear as shown below:

![user_interface](/engineering-education/custom-searching-and-filtering-in-firebase-database-in-android/ui.png)

### Step 4: Creating Model Class and Adapter class
A model class is used to map data in Firebase and establish an access point for that data. The code below demonstrates how to create a model class:

```kotlin
data class Students(
    val id:String? = "",
    val name: String? = "",
    val regno: String? = "",
    val gender:String? = "",
    val amount: Int? = 0,
    val age:Int?= 0
)
```

The adapter class serves as a link between accessed data and RecyclerViews. The code below demonstrates how to create an adapter class:

```kotlin
class StudentsAdapter: ListAdapter<Students, StudentsAdapter.MyHolder>(COMPARATOR) {

// Calculates the difference between the available data and new data
    private object COMPARATOR: DiffUtil.ItemCallback<Students>(){
        override fun areItemsTheSame(oldItem: Students, newItem: Students): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(oldItem: Students, newItem: Students): Boolean {
            return oldItem.id == newItem.id
        }
    }
// An inner class that maps data with the available views
    inner class MyHolder(private val binding: StudentsRowBinding): RecyclerView.ViewHolder(binding.root) {
        fun bind(student: Students?) {
            binding.tvName.text = student?.name
            binding.tvRegNumber.text = student?.regno
            binding.tvAmount.text = student?.amount.toString()
            binding.tvAge.text = student?.age.toString()
            binding.tvGender.text = student?.gender.toString()
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyHolder {
        return MyHolder(StudentsRowBinding.inflate(LayoutInflater.from(parent.context),parent,false))
    }

    override fun onBindViewHolder(holder: MyHolder, position: Int) {
        val student = getItem(position)
        holder.bind(student)
    }
}
```

### Step 5: Displaying data from Firebase
It is crucial to first display the data from Firebase before performing any search or filtering operation.

First, create an instance of `DatabaseReference`.

```kotlin
private lateinit var databaseReference: DatabaseReference
```

Inside your `onCreate`, make sure you have initialized the `databaseReference`.

```kotlin
databaseReference = FirebaseDatabase.getInstance().getReference("students")
```

Define the following method and call it in your `onCreate` method to fetch data.

```kotlin
// fetching all values from firebase
private fun getStudents() {
    databaseReference.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    for (i in snapshot.children) {
                        val student = i.getValue(Students::class.java)
                        if (student != null) {
                            studentsList.add(student)
                        }
                    }
                    studentAdapter.submitList(studentsList)
                    binding.recyclerStudents.adapter = studentAdapter
                } else {
                    Toast.makeText(applicationContext, "Data Does not Exist", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onCancelled(error: DatabaseError) {

            }
        })
}
```

### Step 6: Implementing filtering
Filtering can be accomplished in two ways: 
- Passing the filter parameter or
- Using a common value in the data, such as Gender.

To filter using a standard category, we can define such a function:

```kotlin
// filtering in general
private fun filterGender(){
    // Specifying path and filter category and adding a listener
    databaseReference.orderByChild("gender").equalTo("female").addValueEventListener(object:ValueEventListener{
        override fun onDataChange(snapshot: DataSnapshot) {
            if(snapshot.exists()){
                studentsList.clear()
                for (i in snapshot.children){
                    val female = i.getValue(Students::class.java)
                    studentsList.add(female!!)
                }
                studentAdapter.submitList(studentsList)
                binding.recyclerStudents.adapter = studentAdapter
            } else{
                Toast.makeText(applicationContext, "Data is not found", Toast.LENGTH_SHORT).show()
            }
        }

        override fun onCancelled(error: DatabaseError) {

        }
    })
}
```

To filter using a specific parameter from the list displayed in the RecyclerView. We can search by first defining a method called `filter`.

```kotlin
private  fun filter(e: String) {
    //Declare the array list that holds the filtered values
    val filteredItem = ArrayList<Students>()
    // loop through the array list to obtain the required value
    for (item in studentsList) {
        if (item.name!!.toLowerCase().contains(e.toLowerCase())) {
            filteredItem.add(item)
        }
    }
    // add the filtered value to adapter
    studentAdapter.submitList(filteredItem)
}
```

After that, we can invoke this function inside a `TextWatcher` that listens to every character entered in the `EditText`. This will then loop through the list to see if the entered character can be found.

```kotlin
binding.etSearch.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {

            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {

            }

            override fun afterTextChanged(editable: Editable?) {
                filter(editable.toString())
            }
        })
```

### Step 7: Implementing searching
One can search for data based on a certain value, such as a name. This can be accomplished by defining a method that takes in search terms and performs a search from Firebase.

```kotlin
private fun searchByName(name: String) {
    // adding a value listener to database reference to perform search
    databaseReference.addValueEventListener(object:ValueEventListener{
        override fun onDataChange(snapshot: DataSnapshot) {
            // Checking if the value exists
            if (snapshot.exists()){
                studentsList.clear()
                // looping through the values
                for (i in snapshot.children){
                    val student = i.getValue(Students::class.java)
                    // checking if the name searched is available and adding it to the array list
                    if (student!!.name == name){
                        studentsList.add(student)
                    }
                }
                //setting data to RecyclerView
                studentAdapter.submitList(studentsList)
                binding.recyclerStudents.adapter = studentAdapter
            } else{
                Toast.makeText(applicationContext, "Data does not exist", Toast.LENGTH_SHORT).show()
            }
        }

        override fun onCancelled(error: DatabaseError) {
        }
    })
}
```

When you run the app, you should get the following output:

![demo](/engineering-education/custom-searching-and-filtering-in-firebase-database-in-android/demo.gif)

### Conclusion
In this tutorial, we've discussed how Firebase real-time database structures its data, the different ways we perform searching and filtering, methods used when filtering data, and finally implemented search and filtering in Android.

You can get the complete code implementation of this tutorial on [this GitHub repository](https://github.com/brandy-kay/FirebaseSearchFilteringDemo).

Happy Coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
