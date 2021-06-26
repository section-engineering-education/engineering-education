### Table of content


- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Build an Android project](#build-an-android-project)
- [Enable viewBinding](#enable-viewbinding)
- [Set up a RecyclerView](#set-up-recyclerview)
- [Model Application data](#data-model-for-the-app)
- [Create DiffUtil Callback class](#create-diffutil-callback-class)
- [Understanding the DiffUtil callbacks](#understanding-the-diffutil-callbacks)
- [Attach DiffUtil to an Adapter](#attach-diffutil-to-an-adapter)
- [Testing and debugging the app](#test-the-app)
- [Conclusion](#conclusion)

### Introduction


The performance of a mobile application is one of the most important aspects in determining the user experience. Performance refers to the app's capability to load and refresh data on various events.

Most of the time, when you want to update data in a RecyclerView, you probably use notifyOnDataSetChanged() or notifyOnItemPositionChanged() methods. While these work pretty fine with a small amount of data, it becomes hectic for your app to update and fully reload huge amounts of data. This easily leads to ANR (App Not Respondin) exception that annoys your application users. An annoyed user will always give negative feedback!

#### How can we solve this problem?


With the use of `DiffUtil` we can easily handle changes in a dataset and instantly reflect them on a RecyclerView.

DiffUtil is a utility class that computes the variation between two sets of data and returns a list of update operations that changes the old list to the new one. It uses the [Eugene W. Myers']() algorithm to figure out how many updates are essential to convert one data set to the other. Since Myers' technique does not handle objects that have been moved, DiffUtil does a second attempt on the output to identify elements that have been relocated, saving time and the device's resources while providing a better experience for the user. 

### Prerequisites


This article assumes that you have prior knowledge on:

1. Creating Android apps using Android Studio.
2. Basics of [Kotlin programming language](https://kotlinlang.org/).
3. Working with the imperative paradigm in Android - using `XML` and view groups such as [Constraint Layout](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout).
4. ViewBinding and/or [DataBinding](https://developer.android.com/topic/libraries/data-binding).
5. The basics of an [Android Recyclerview](https://developer.android.com/jetpack/androidx/releases/recyclerview).

### Build an Android project


Open Android Studio and create a project of your choice. Make sure that you select an API version not less than 16 to make your app compatible with DiffUtil.

### Enable viewBinding


viewBinding allows us to access views and viewGroups in XML layout files using their respective binding classes.

```bash
// in the build.gradle file (module level)
android{
    buildFeatures{
        viewBinding true
    }
}
```

### Set up RecyclerView

At this point, we're going to create a RecyclerView and set it up with it's core components.

#### User Interface


Open your XML layout file and paste the following code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

<!--NOTE: This file is named activity_main.xml-->

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="8dp"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager" />

    <Button
        android:id="@+id/btnUpdate"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:text="@string/update_data"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="@id/recyclerview"
        app:layout_constraintStart_toStartOf="@id/recyclerview"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.96" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
This includes a button that, when clicked, will perform an update operation on the Recyclerview. 

#### Row item


This is the unit building block that determines the data representation format in a Recyclerview. It also takes effect on data models in the app for compatibility and necessity purposes.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingBottom="8dp">

    <!--NOTE: This file is named student_card.xml-->

    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="8dp">

            <TextView
                android:id="@+id/studentId"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.25"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent"
                tools:text="00" />

            <TextView
                android:id="@+id/studentName"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.25"
                app:layout_constraintStart_toEndOf="@id/studentId"
                app:layout_constraintTop_toTopOf="parent"
                tools:text="Example Name" />

        </androidx.constraintlayout.widget.ConstraintLayout>
    </androidx.cardview.widget.CardView>
</androidx.constraintlayout.widget.ConstraintLayout>
```
Here we've created a student item card that holds two textViews.

### Data model for the App


A dataset defines the type of data objects that the adapter works with. Create a Koltin data class named `Student` and paste the following.

```kotlin
data class Student(
    val id: String,
    val name: String
)
```
#### Recyclerview Adapter


An adapter does the hard task of connecting the dataset with a Recyclerview. Create a Kotlin class named `StudentAdapter` and paste the following.

```kotlin
class StudentAdapter : RecyclerView.Adapter<StudentAdapter.CardViewHolder>() {
    private var oldList = emptyList<Student>()

    inner class CardViewHolder(val card: StudentCardBinding) : RecyclerView.ViewHolder(card.root)

    override fun getItemCount(): Int = oldList.size

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CardViewHolder {
        return CardViewHolder(
            StudentCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        )
    }

    override fun onBindViewHolder(holder: CardViewHolder, position: Int) {
        holder.card.apply {
            studentId.text = oldList[position].id
            studentName.text = oldList[position].name
        }
    }
}
```
We'll later use this adapter to implement DiffUtil callback.

### Create DiffUtil Callback class


Now, proceed to create a Kotlin class named `MyDiffUtil` and paste the following.

```koltin
class MyDiffUtil(
    private val oldList: List<Student>,
    private val newList: List<Student>

) : DiffUtil.Callback() { // extending the Callback class
    override fun getOldListSize(): Int {
        return oldList.size
    }

    override fun getNewListSize(): Int {
        return newList.size
    }

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return oldList[oldItemPosition].id == newList[newItemPosition].id
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        return when {
            oldList[oldItemPosition].id == newList[newItemPosition] -> true
            oldList[oldItemPosition].name == newList[newItemPosition].name -> true
            else -> false
        }
    }
}
```

### Understanding the DiffUtil callbacks


```kotlin
override fun getOldListSize(): Int { }
```
Returns the size of the old list passed in the constructor of the class.

```kotlin
override fun getNewListSize(): Int { }

```
Returns the size of the new or updated list passed in the constructor.

```kotlin
override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean { }
```
This returns a Boolean value on checking if items at corresponding positions are the same or not. 

```kotlin
override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean { }
```
Checks if the content of items at corresponding positions is the same.

>**NOTE:** Both oldList and newList should hold elements of the same type.

### Attach DiffUtil to an Adapter


Navigate to StudentAdapter file and create a public function that we'll use to dispatch updates to the adapter.

```kotlin
fun setData(newList: List<Student>) {
    val diffUtil = MyDiffUtil(oldList, newList)
    val diffUtilResults = DiffUtil.calculateDiff(diffUtil)

    oldList = newList
    diffUtilResults.dispatchUpdatesTo(this)
}
```

### Utilize the Adapter


Now, the adapter is ready to be used. Attach it to the Recyclerview as shown.

```kotlin
class MainActivity : AppCompatActivity() {
    private var binding: ActivityMainBinding? = null
    private val studentAdapter: StudentAdapter = StudentAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding!!.root)

        updateDataWhenClicked()
        binding!!.recyclerview.apply {
            val newList: List<Student> = listOf(
                Student("1", "Milan Gans"),
                Student("2", "Renda Slaugh"),
                Student("3", "Basil Levison"),
                Student("4", "Tina Travers"),
            )
            adapter = studentAdapter.also { adapter ->
                adapter.setData(newList)
            }
        }
    }

    private fun updateDataWhenClicked() {
        binding!!.btnUpdate.setOnClickListener {
            val newList: List<Student> = listOf(
                Student("1", "Milan Gans"),
                Student("2", "Renda Slaugh"),
                Student("3", "Basil Levison"),
                Student("4", "Tina Travers"),
                Student("5", "Lil Mosey"),
                Student("6", "Maurine Alexa"),
            )
            studentAdapter.setData(newList)
        }
    }
}
```

Here we've initialized the adapter with a dummy list. When the update button is clicked, the RecyclerView is updated with a new dummy list.

>**TIP:** When working on a production project, you should get data from a database, preferably [room database](https://developer.android.com/jetpack/androidx/releases/room) or [a remote database](https://firebase.google.com/docs/firestore).

### Test the App


After running the App, you should see something similar to this;
![App testing image]()

Notice that only the new items are updated. This way the device resources such as battery and memory are saved. As a result, the users have a quick and seamless experience. 

### Conclusion


That's it! Congratulation!, you can now boost your app performance using DiffUtil. For further reading, release notes, or advanced implementation of DiffUtil, please refer to the [official documentation](https://developer.android.com/reference/androidx/recyclerview/widget/DiffUtil) or [this sample project](https://developer.android.com/codelabs/kotlin-android-training-diffutil-databinding#0).
