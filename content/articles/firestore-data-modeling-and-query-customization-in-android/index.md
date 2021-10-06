---
layout: engineering-education
status: publish
published: true
url: /firestore-data-modeling-and-query-customization-in-android/
title: Firestore Data Modeling and Query Customization in Android
description: This tutorial will guide you on how to use Firestore to model data and customize queries in your Android app.
author: noni-diana
date: 2021-09-28T00:00:00-04:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/firestore-data-modeling-and-query-customization-in-android/hero.png
    alt: Firestore data modeling and query customization in Android image
---
Firestore database is a modern, object-based database that stores data in JSON format. In this tutorial, we will learn how to prepare data, design the database, and perform simple and complex queries using the Android platform.
<!--more-->
### Prerequisites
To follow along with this tutorial, you will need the following:
- Android Studio installed on your computer.
- Basic knowledge of Kotlin and [Coroutines](https://www.section.io/engineering-education/introduction-to-kotlin-coroutines/).
- Be familiar with the [Firebase Console](https://firebase.google.com/).

### Creating data models
A data model describes the data that is stored in a database. A good model allows you to structure the data in a way that is easy to use and understand. This makes the database more maintainable.

#### Firestore data model
In Firestore, data is stored in collections identified by a unique path. Each collection contains documents, which are `key-value` pairs. 

A document can contain any number of `fields`, including `sub-documents` and `sub-collections`.

### Implementing Firestore in Android
First, create a new project in Android Studio.

Then head to the [Firebase console](https://console.firebase.google.com) and create a new firebase project. 

This will require you to have a Google account. Note that you must use the same account to sign into Android Studio and the Firebase console.

If you are not familiar with creating firebase projects, you can read more about it [here](https://firebase.google.com/docs/projects/overview).

Next open the `Firestore` tab and click on the `create database` button. This will create a new Firestore database.

It's important to use the `test rules` to ensure that the database is working correctly before you deploy the project. This is done by clicking on the `test rules` button.

> Warning: Test rules allow anyone to access the database. This is, therefore, not recommended for production use. Instead, you should use secure rules and authentication to restrict access to the database.

Finally in this step, we need to connect our app to Firebase. Click on the `Tools` tab in Android Studio, select `Firebase` then connect the projects by clicking the `Connect to Firebase` button. 

This will take you to the Firebase console where you need to select the project we just created.

After doing so, navigate back to Android Studio, add `Firestore SDK` by clicking the `add cloud Firestore` button in the `Firebase assistant`.

#### Creating a database instance
In your activity file, add a `FirebaseFirestore` instance, as shown below:

```kotlin
lateinit var database: FirebaseFirestore

override fun onCreate(savedInstanceState: Bundle?) {
    database = FirebaseFirestore.getInstance()
}
```

### Designing the database
Moving on, we need to populate our database with data that we will execute queries against.

#### Example use case
Let's take an example of an agricultural farm in which we have a collection of crops that can be categorized into fruits, vegetables, and trees. 

To design a Firestore database for this, we need to create a collection named `farm` that holds a document named `crops`. This document will hold sub-collections named `fruits`, `vegetables`, and `trees`.

It should look as shown below:

![Database design](/engineering-education/firestore-data-modeling-and-query-customization-in-android/database-design.png)

You can design this using the console or using the code which will be discussed in this tutorial.

#### Designing the app UI
Add the following code to your layout file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:padding="8dp"
    android:layout_height="match_parent" >
    <!--let's keep things simple 😎-->
    <Button
        android:id="@+id/btnSaveData"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Save data"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.85" />

    <Button
        android:id="@+id/btnReadData"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Read data"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/btnSaveData"
        app:layout_constraintVertical_bias="0.5" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

#### Designing the app data model
Based on the use case described above, we need to create an `enum class` for the `crop` category and a `data class` to define the structure of the `crops` object/document.

**Enum class**

```kotlin
enum class CropCategory {
    FRUIT, VEGETABLE, TREE
}
```

**Data class**

```kotlin
data class Crop(
    val name: String,
    var count: Int,
    val category: CropCategory
)
```

#### Generating dummy data
Here, we will create random data for our database. In a production project, you would probably get inputs from the user.

In your activity file, create a function that will be triggered when the `Save data` button is clicked.

```kotlin
private fun handleClicks() {
    binding.btnSaveData.setOnClickListener {
        // Create Sample data for demonstration purposes

        val crops = arrayListOf<Crop>(
            Crop("Apple", 10, CropCategory.FRUIT),
            Crop("Apricots", 5, CropCategory.FRUIT),
            Crop("Avocado", 8, CropCategory.FRUIT),
            Crop("Banana", 24, CropCategory.FRUIT),
            Crop("Blackberries", 16, CropCategory.FRUIT),

            Crop("Broccoli", 3, CropCategory.VEGETABLE),
            Crop("Brooklime", 20, CropCategory.VEGETABLE),
            Crop("Brussels sprouts", 10, CropCategory.VEGETABLE),
            Crop("Cabbage   Brassica", 15, CropCategory.VEGETABLE),

            Crop("White Ash", 5, CropCategory.TREE),
            Crop("Bigot Aspen", 1, CropCategory.TREE),
            Crop("Quaking Aspen", 3, CropCategory.TREE),
            Crop("Basswood", 1, CropCategory.TREE),
            Crop("American Beech", 3, CropCategory.TREE)
        )
    }
}
```

Remember to call this function in the `onCreate` method of your `MainActivity`.

#### Saving data to Firestore
Create a function named `saveData` and add the following code:

```kotlin
private fun saveData(crops: ArrayList<Crop>) {
    // NOTE: This should be done in a ViewModel

    val cropsDoc: DocumentReference = database.collection("farm")
        .document("crops")

    crops.forEach { crop ->
        when (crop.category) {
            CropCategory.FRUIT -> {
                cropsDoc.collection("fruits").add(crop)
            }
            CropCategory.VEGETABLE -> {
                cropsDoc.collection("vegetables").add(crop)
            }
            // this is a Tree
            else -> {
                cropsDoc.collection("trees").add(crop)
            }
        }
    }
}
```

Here, we have used the `crops` document reference (cropsDoc) to save every crop in the respective sub-collection.

We will call the `saveData` function and pass the `crops` array to a coroutine when the `btnSaveData` button is clicked, as demonstrated below:

```kotlin
// Launch a Coroutine to run the save-data Job

CoroutineScope(Dispatchers.IO).launch {
    saveData(crops)
}
```

### Testing the application
After opening the app on your device, click `btnSaveData` button and then navigate to the `Firebase console` to confirm whether the upload is working as expected.

> Note: Multiple clicks will produce duplicate data although each document has a unique id. This is good for testing purposes but not for production.

You should expect to see something similar to this:

![Saved data](/engineering-education/firestore-data-modeling-and-query-customization-in-android/saved-data.png)

### Performing Queries
To query the data, we will use the `get()` method of the `DocumentReference` class. This method returns a `DocumentSnapshot` object.

#### Firestore query operators
The following operators are available for data querying:

- (<) Less than
- (>=) Greater than or equal to
- (==) Equal to
- (>) Greater than
- (<=) Less than or equal to
- (array-contains) Checks if the value is present in the array.

The comparison operator is explicitly named in the method for Android-based database queries.

These operators are used in the `where()` method as one of the parameters together with the field to filter on and the value to compare against.

You might have noticed a warning in the firebase console indicating that the `crops` document will not appear in queries since it doesn't exist. This because it only consist of collections. To fix this, add at least one document to it.

#### Simple queries
These queries involve a single action and condition. For example, to query for documents in the `fruits` collection, we can use the following code:

```kotlin
val docReference = database.collection("farm/crops/fruits")
docReference.get()
```

If you had already queried for the same data and cached the result, you can switch the data source as shown below:

```kotlin
val docReference = database.collection("farm/crops/fruits")
docReference.get(Source.CACHE)
```

To track a query's state or progress, we can use the `addOnCompleteListener` lambda function that allows you to handle events such as the success or failure of the query.

```kotlin
val docReference = database.collection("farm/crops/fruits")
docReference.get().addOnCompleteListener { queryTask ->
    when {
        queryTask.isSuccessful -> {
            // handle success event
        }
        queryTask.isCanceled -> {
            // handle cancellation event
        }
        else -> {
            // handle any other event
        }
    }
}
```

To get a specific document, we can use the `get()` method and pass the document id as a parameter. 

This is very useful when deleting or updating the fields but you must provide an accurate id.

```kotlin
val documentId = "THEDOCID" // This can be gotten from a previous query
val doc = database.collection("farm/crop/fruits").document().get(documentId)
```

#### Compound queries
In compound queries, we can combine multiple conditions to form a single query. This is useful when we want to perform a query that returns specific documents. 

We can also create objects for performing complex queries.

For example, to query for all documents in the `fruits` collection that have a `count` greater than 15, we can use the following code:

```kotlin
val TAG = "MainActivity"
val docReference = database.collection("farm/crops/fruits")

docReference.whereGreaterThan("count", 15).get().addOnSuccessListener {querySnapshot ->
    for (doc in querySnapshot) {
        Log.d(TAG, "id: ${doc.id} name: ${doc.data.getValue("name")}")
    }
}
```

The code above returns two fruits, `Blackberries` and `Banana` because their count satisfies the condition. Refer to the [dummy data](#generate-dummy-data) to confirm.

![Query -Greater than](/engineering-education/firestore-data-modeling-and-query-customization-in-android/custom-query-greater-than.png)

Multiple operators can be chained to form a more specific query. For example, we can get all documents in the `fruits` collection that have a `count` greater than `5` but less than `20`.

```kotlin
val TAG = "MainActivity"
val docReference = database.collection("farm/crops/fruits")
// this serves as a range operator
docReference.whereGreaterThan("count", 5).whereLessThan("count", 20).get().addOnSuccessListener {querySnapshot ->
    for (doc in querySnapshot) {
        Log.d(TAG, "id: ${doc.id} name: ${doc.data.getValue("name")}")
    }
}
```

> Note that you can not filter fields that do not belong to the same document.

#### Indexing custom operators
Indexes are used to make queries more efficient. Firestore automatically creates indexes as data is saved. However, for custom queries, we need to create indexes for the fields involved.

This is done by navigating to the `indexes` tab in the firebase console and clicking on the `Add index` button. At least two fields must be selected.

Another way to create indexes is to run the app and you'll get a link in the LogCat's `debug` section that directs you to the console and fills the fields for you. This is highly recommended for accuracy and simplicity.

The order of the conditions/filter operations is important since the result of the first one is passed to the next one in the chain. 

Therefore, you should always start with less specific or the most relevant conditions.

### Conclusion
In this tutorial, we have covered the fundamental concepts of modeling data in Firestore and how to query it. 

The knowledge gained in this tutorial can be used to build a robust and scalable application. Keep practicing to gain a better understanding of custom queries and indexing.

Happy Coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
