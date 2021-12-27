### Implementing Custom Searching and Filtering in Firebase Database in Android with Kotlin
Firebase Realtime Database is a NoSQL database that allows us to store and sync data in real-time between users. This is a large JSON object that developers can manage using a single API in real-time.

Query instructions make filtering and searching data with different attributes in relational databases like MySQL and SQLLite very simple. Even when conducting simple data queries, filtering and searching are relatively difficult in Firebase Realtime Database.

### Prerequisites
- Have a basic grasp of the Kotlin programming language
- Be familiar with how to connect your project to Firebase.
- Understand the fundamentals of Android development 

### Goals
This article intends to guide and assist readers in fully comprehending the searching and filtering of firebase real-time database data, as well as all of the implementation and methods necessary to make data searching in a firebase database a success.

### How Firebase Realtime Database Structures its Data
In most databases, data is organized in tables or rows; however, the firebase real-time database, which is a non-structured database (NoSQL), organizes information in JSON format, which is arranged in a tree-like structure called a collection.
To create this tree-like structure, elements called nodes are joined by a general path that is shared by both connected nodes.
A child can be nested in the connected nodes to create a widely nested structure, as seen in the diagram below.

![database](/engineering-education/implementing-custom-searching-and-filtering-in-firebase-database-in-android-with-kotlin/firebase_database.png)

#### Advantages of Firebase Realtime Database
- Ability to access all of the data in the database through a single path.
- Creating a data format in Firebase is simple because you may use an automatically generated ID or define your own.
- A single child path lists all the changes that occur inside the stored data.

#### Disadvantages of Firebase Realtime Database
- Finding a certain item is difficult because there is no query language to use.
- Deleting a specific child item is difficult since it requires searching through all of the data to locate the item to be deleted.

### Ways to Filter and Search Data in Firebase Realtime Database
Even though searching data in a Firebase database is difficult, there are various techniques for searching and filtering data.
These are the criteria:
- use of "id", which is typically used to look for a specific value that has its "id".
- Use of a child path from which any changes to data in the database are listed.
- Use of a variable that can be given as a parameter.
- Employing filtering techniques, such as`orderByChild`.

 ### Methods Used in Filtering Data
 Several methods help in the filtering and sorting of firebase data.
 To perform sorting the below methods are used:

 - `orderByChild` - This method sorts the data according to specified subcollection or child path.
 - `orderByKey` - Performs sorting according to the specified key value.
 - `orderByValue`-  Performs sorting according to the given child value.

Also, filtering is handled by the following methods:-
- `limitToFirst` -The data is filtered starting with the given parameter value.
- `limitToLast` - restricts the data to the last value supplied.
- `startAt` - starts filtering data at the supplied key or value.
- `startAfter` - filters after a key or value is given.
- `equalTo` filters data in a certain key or value category.
- `endAt` - restricts data to the key or value provided.
- `endBefore` - filters data exactly before the value indicated.


Let's get started.

#### Step 1: Create an Empty Project
Go to File -> New -> New Project -> Empty Activity to start a new project from scratch. Next, give your project a descriptive name.

![project](/engineering-education/implementing-custom-searching-and-filtering-in-firebase-database-in-android-with-kotlin/creating_project.png)

#### Step 2: Linking Your Project to Firebase
To gain access to the Firebase database, your project must be connected to Firebase, which can be done in the following manner:

On your browser, search Firebase console -> Add Project ->Enter Project Name -> Choose Default Account for Firebase -> Create project.
 
> Ensure you have enabled Realtime Database.

#### Step 3: Designing User Interface
In this step, we will create a simple layout that will help in displaying data in a list-like manner. We will have an `EditText` that a user can enter a search term. Also, the layout will have two buttons: one for filtering data and another one for searching.

> Note: You must create a row layout that maps how your data will appear in a RecyclerView.
The created user interface should appear as shown below

![user_interface](/engineering-education/implementing-custom-searching-and-filtering-in-firebase-database-in-android-with-kotlin/ui.png)

#### Step 4: Creating Model Class and Adapter Class
A model class is used to map data in Firebase and establish an access point for that data. The code below demonstrates how to create a model class.

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

Adapter Class serves as a link between accessed data and RecyclerViews. The code below demonstrates how to create an adapter class.
```kotlin
class StudentsAdapter:ListAdapter<Students,StudentsAdapter.MyHolder>(COMPARATOR) {

// Calculates the difference between the available data and new data
    private object COMPARATOR:DiffUtil.ItemCallback<Students>(){
        override fun areItemsTheSame(oldItem: Students, newItem: Students): Boolean {
            return oldItem==newItem
        }

        override fun areContentsTheSame(oldItem: Students, newItem: Students): Boolean {
            return oldItem.id == newItem.id
        }

    }
// An innerclass that maps data with the available views
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
#### Step 5: Displaying Data From Firebase
It is critical to first display the data from Firebase before performing any search or filtering operation.

First, create an instance of `DatabaseReference`

`private lateinit var databaseReference: DatabaseReference`

Inside your `onCreate` make sure you have initialized the `databaseReference`.

`databaseReference = FirebaseDatabase.getInstance().getReference("students")`

To fetch data, define the following method and call it in your `onCreate` method.

```kotlin
 // fetching all values from firebase
    private fun getStudents() {
        databaseReference.addValueEventListener(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    if (snapshot.exists()) {
                        for (i in snapshot.children) {
                            val student= i.getValue(Students::class.java)
                            if (student != null) {
                                studentsList.add(student)
                            }
                        }
                        studentAdapter.submitList(studentsList)
                        binding.recyclerStudents.adapter = studentAdapter
                    } else {
                        Toast.makeText(applicationContext, "Data Does not Exist", Toast.LENGTH_SHORT)
                            .show()
                    }
                }

                override fun onCancelled(error: DatabaseError) {}
            })
    }
```

#### Step 6: Implementing Filtering
Filtering can be accomplished in one of two ways: Passing the filter parameter or using a common value in the data, such as Gender.

To filter using a common category, we can define such a function:
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

To filter using a specific parameter, from the list that is being displayed in the recyclerview. We can do the search by first defining a method called `filter`.
```kotlin
  private  fun filter(e: String) {
        //Declaring the array list that holds the filtered values
        val filteredItem = ArrayList<Students>()
        // looping through the array list to obtain the required value
        for (item in studentsList) {
            if (item.name!!.toLowerCase().contains(e.toLowerCase())) {
                filteredItem.add(item)
            }
        }
        // adding the filted value to adapter
        studentAdapter.submitList(filteredItem)
    }
```
After that, we can attach this function inside a `TextWatcher` that listens to every character entered in the `EditText`. This will then loop through the list to see if the entered character can be found.

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
#### Step 7: Implementing Searching
One can opt to search for data based on a certain value, such as a name. This can be accomplished by defining a method that takes in search terms and do the searching from Firebase.
```kotlin
    private fun searchByName(name: String) {
        // adding a value listener to database reference to perform search
        databaseReference.addValueEventListener(object:ValueEventListener{
            override fun onDataChange(snapshot: DataSnapshot) {
                // Checking if the value exists
                if (snapshot.exists()){
                    studentsList.clear()
                    // looping through to values
                    for (i in snapshot.children){
                        val student = i.getValue(Students::class.java)
                        // checking if the name searched is available and adding to the array list
                        if (student!!.name == name){
                            studentsList.add(student)
                        }
                    }
                    //setting data to recyclerview
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
When you run the code you will get the following output:

![demo](/engineering-education/implementing-custom-searching-and-filtering-in-firebase-database-in-android-with-kotlin/demo.gif)

### Conclusion
In this tutorial, we discussed how Firebase Realtime database structures its data, the different ways we do searching and filtering, methods used when filtering data, and finally implemented search and filtering in Android.

Get the full implementation of this article from this GitHub repository [firebasesearchfilteringdemo](https://github.com/brandy-kay/FirebaseSearchFilteringDemo).
