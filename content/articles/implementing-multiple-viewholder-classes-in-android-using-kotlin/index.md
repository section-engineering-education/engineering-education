---
layout: engineering-education
status: publish
published: true
url: /implementing-multiple-viewholders-in-android-using-kotlin/
title: Implementing Multiple ViewHolders in Android using Kotlin
description: This tutorial takes the reader through the process of implementing multiple ViewHolders in Android using Kotlin. Multiple ViewHolders allows us to display different types of items in the same RecyclerView.
author: maurine-muthoki
date: 2021-11-06T00:00:00-02:27
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-multiple-viewholders-in-android-using-kotlin/hero.png
    alt: Implementing multiple ViewHolders in Android hero image
---
In the imperative programming paradigm in Android, a RecyclerView is a widget used to display scrollable items. Normally, developers use a single type of item to populate data in the RecyclerView.
<!--more-->
Have you ever asked yourself how you can employ different types of data items in the same RecyclerView while maintaining a seamless experience?

This is where multiple ViewHolders come in. They allow us to pass different data objects during the RecyclerView callbacks. This way we can create more interactive and scalable applications.

### Prerequisites
To follow along with this tutorial, you need to:
- Install [Android Studio IDE](https://developer.android.com/studio/index.html), preferably the latest version.
- Be familiar with the Android RecyclerView.
- Have a basic knowledge of Kotlin and ViewBinding.

### Goals
By the end of this tutorial, you will be able to:
- Understand why we need more than one ViewHolder class.
- Implement two-typed ViewHolders in a single adapter.
- Manage RecyclerView callback methods and their interactions.

### Case description
To demonstrate how we can use multiple ViewHolder classes, we will create a simple application that displays a list of landmarks. The landmark item can contain an image or not. 

### Getting started
Create an empty project in Android Studio and give it a name of your choice.

### Creating the row items
"Row" items are the layout files that form a unit item in the RecyclerView. Usually, we would use a single row item for each RecyclerView. Nevertheless, we can use more than one row item for the same RecyclerView. This is the main goal of using multiple viewHolders where each corresponds to a single layout.

#### Layout for item with image
To begin with, create a layout file named **landmark_with_image.xml** and paste the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="8dp">

    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:cardCornerRadius="8dp">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <ImageView
                android:id="@+id/landmarkImage"
                android:layout_width="match_parent"
                android:layout_height="200dp"
                android:layout_marginBottom="10dp"
                android:scaleType="centerCrop"
                android:src="@drawable/ic_launcher_foreground"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

            <TextView
                android:id="@+id/landmarkWithImageTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                android:text="Test Title"
                android:textSize="20sp"
                android:textStyle="bold"
                app:layout_constraintEnd_toEndOf="@id/landmarkImage"
                app:layout_constraintHorizontal_bias="0.025"
                app:layout_constraintStart_toStartOf="@id/landmarkImage"
                app:layout_constraintTop_toBottomOf="@id/landmarkImage" />

            <TextView
                android:id="@+id/landmarkWithImageDesc"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginVertical="8dp"
                android:layout_marginEnd="8dp"
                android:maxLines="3"
                android:textSize="16sp"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="@id/landmarkImage"
                app:layout_constraintHorizontal_bias="0.0"
                app:layout_constraintStart_toStartOf="@id/landmarkWithImageTitle"
                app:layout_constraintTop_toBottomOf="@id/landmarkWithImageTitle"
                tools:text="@tools:sample/lorem/random" />
        </androidx.constraintlayout.widget.ConstraintLayout>
    </androidx.cardview.widget.CardView>
</androidx.constraintlayout.widget.ConstraintLayout>
```

The code above generates a cardView with an image and two textViews, one for the title and one for the description.

preview:

![Item with image](/engineering-education/implementing-multiple-viewholders-in-android-using-kotlin/item-with-image.png)

#### Layout for an item without image
Create a layout file named **landmark_without_image.xml** and paste the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="8dp">

    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:cardCornerRadius="8dp">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/landmarkTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Landmark Title"
                android:textSize="20sp"
                android:textStyle="bold"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.025"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

            <TextView
                android:id="@+id/landmarkDesc"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginVertical="8dp"
                android:layout_marginEnd="8dp"
                android:maxLines="3"
                android:textSize="16sp"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="@id/landmarkTitle"
                app:layout_constraintTop_toBottomOf="@id/landmarkTitle"
                tools:text="@tools:sample/lorem/random" />
        </androidx.constraintlayout.widget.ConstraintLayout>
    </androidx.cardview.widget.CardView>
</androidx.constraintlayout.widget.ConstraintLayout>
```

Unlike the previous layout, the one above does not contain an image.

preview:

![Item without image](/engineering-education/implementing-multiple-viewholders-in-android-using-kotlin/item-without-image.png)

> Note: You can create as many layouts as you wish, based on the use case. The more the layouts, the more the viewHolders required.

### Setting up the RecyclerView
In the **activity_main.xml** file, add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/landmarkRecyclerview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        tools:listitem="@layout/landmark_without_image" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

preview:

![RecyclerView preview](/engineering-education/implementing-multiple-viewholders-in-android-using-kotlin/recyclerview-preview.png)

### Categorizing the items
As mentioned earlier, a landmark item can take either of the layouts above depending on whether it has an image or not.

```kotlin
enum class HasImage {
    TRUE, FALSE
}
```

The above is an enum class used to determine the category of the landmark. Ideally, this will tell the adapter what kind of item to bind in the RecyclerView at a given position.

### Landmark data model
Each item should have a generic structure/model defined by a data class.

```kotlin
data class Landmark(
    val title: String,
    val desc: String,
    var resource: Int?,
    val hasImage: HasImage
)
```

### Setting up RecyclerView adapter
An adapter class is responsible for populating the RecyclerView accordingly with the data provided.

```kotlin
class LandmarkAdapter(private var landmarks: ArrayList<Landmark>) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

}
```

> Note: The above viewHolder argument is not confined to a custom type. Instead, we have used the viewHolder from the inbuilt RecyclerView class. This allows us to apply many viewHolders in our adapter.

```kotlin
override fun getItemCount(): Int = landmarks.size
```

This method notifies the adapter of how many items to generate, usually the size of the data collection.

Moving on, we'll create two viewHolder classes for the two layout files we created earlier.

#### ViewHolder for landmarks with image

```kotlin
inner class LandmarkWithImageViewHolder(private val landmarkWithImage: LandmarkWithImageBinding) : 
    RecyclerView.ViewHolder(landmarkWithImage.root) {
    fun bind(landmark: Landmark) {
        landmarkWithImage.landmarkImage.setImageResource(landmark.resource!!)
        landmarkWithImage.landmarkWithImageTitle.text = landmark.title
        landmarkWithImage.landmarkWithImageDesc.text = landmark.desc
    }
}
```

#### ViewHolder for landmark without image

```kotlin
inner class LandmarkWithoutImageViewHolder(private val landmarkWithoutImage: LandmarkWithoutImageBinding) :
    RecyclerView.ViewHolder(landmarkWithoutImage.root) {
    fun bind(landmark: Landmark) {
        landmarkWithoutImage.landmarkTitle.text = landmark.title
        landmarkWithoutImage.landmarkDesc.text = landmark.desc
    }
}
```

The above viewHolders hold items of their respective type. They are called in other methods discussed below.

#### Determine the type of item
The following method is used to determine the type of item in a particular position.

```kotlin
override fun getItemViewType(position: Int): Int {
    return if (landmarks[position].hasImage == HasImage.TRUE) HASIMAGE else NOIMAGE
}
```

These constants (return values) are defined in an object as shown below:

```kotlin
private object Const{
    const val HASIMAGE = 0 // random unique value
    const val NOIMAGE = 1
}
```

#### onCreateViewHolder method
This is where we return a viewHolder based on the type of the view item provided by the `getItemViewType` method.

```kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
    return if (viewType == HASIMAGE) {
        val view =
            LandmarkWithImageBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        LandmarkWithImageViewHolder(view)
    } else {
        val view =
            LandmarkWithoutImageBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        LandmarkWithoutImageViewHolder(view)
    }
}
```

#### onBindViewHolder method
When binding the data, we need to first check the type of an item relative to its position then pass it to the respective holder's `bind` function. The holder is explicitly cast based on the viewType.

```kotlin
override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
    if (getItemViewType(position) == HASIMAGE){
        (holder as LandmarkWithImageViewHolder).bind(landmarks[position])
    } else{
        (holder as LandmarkWithoutImageViewHolder).bind(landmarks[position])
    }
}
```

### Generating data
The following is dummy data used for demonstration purposes. Ideally, you should retrieve structured data from a real database.

```kotlin
class LandmarkModel {
    companion object {
        fun getLandmarks(): ArrayList<Landmark> = arrayListOf(
            Landmark("Mt. Kenya", "This is a mountain in Kenya 1", null, HasImage.FALSE),
            Landmark("Mt. Kenya", "This is a mountain in Kenya 2", null, HasImage.FALSE),
            Landmark("Mt. Kenya", "This is a mountain in Kenya 3", null, HasImage.FALSE),
            Landmark(
                "Mt. Kenya", "This is a mountain in Kenya 4", R.drawable.ic_launcher_background,
                HasImage.TRUE
            ),
            Landmark("Mt. Kenya", "This is a mountain in Kenya 5", null, HasImage.FALSE),
            Landmark(
                "Mt. Kenya", "This is a mountain in Kenya 6", R.drawable.ic_launcher_foreground,
                HasImage.TRUE
            ),
            Landmark("Mt. Kenya", "This is a mountain in Kenya 7", null, HasImage.FALSE),
            Landmark("Mt. Kenya", "This is a mountain in Kenya 8", null, HasImage.FALSE)
        )
    }
}
```

The images referenced above, are generated by default when starting a project. You can use your images of choice as well.

### populating the RecyclerView
The final step is to populate the RecyclerView with the data.

In the **MainActivity.kt** file, paste the following code:

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var mainBinding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // remember to set this value to null in the onDestroy method to avoid memory leaks.
        mainBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(mainBinding.root)
        
        val landmarks = LandmarkModel.getLandmarks()
        mainBinding.landmarkRecyclerview.apply {
            adapter = LandmarkAdapter(landmarks)
        }
    }
}
```

### Testing the App
upon running the app, you should expect to see something similar to this.

![Test App](/engineering-education/implementing-multiple-viewholders-in-android-using-kotlin/test-app.png)

### Conclusion
In this tutorial, we have learned the fundamental concepts of displaying different types of items in a single RecyclerView with the use of multiple viewHolders. The knowledge gained in this tutorial can be applied to other more sophisticated use cases with the same goal.

You can find the full code implementation in this [github repository](https://github.com/MaurineM/multiple-view-holders).

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
