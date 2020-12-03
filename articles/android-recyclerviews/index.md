---
layout: engineering-education
status: publish
published: true
url: /engineering-education/android-recyclerviews/
title: Basics of Android Recyclerviews
description: This article goes through how to create RecyclerViews. It will address the requirements and classes involved to develop a functioning RecyclerView.
author: linus-muema
date: 2020-11-17T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-recyclerviews/hero.jpg
    alt: Android recyclerviews image
---
Loading vast amounts of data into normal views can lead to high CPU usage. This may lead to the operating system forcibly shutting down the applications. In Android, it is common to display a list of data.
<!--more-->
With more data being presented and dynamically received, developers had to come up with compound views to help display the data. It has not been an easy task.

#### Android RecyclerViews
The dynamic data (that we are referring to) can include data from a network or local database. This again comes with the added problem of resource management.

That's where `ListViews` comes into play. Developers could load text-based data to a compound view using an adapter to increase efficiency. However, this solution didn't address all the problems encountered.

This solution didn't allow the addition of other views to the Compound view. Developers needed to write extra code to facilitate the addition of other Views. This method wasn't very efficient in regards to resource management. Having many `ListViews` in the application still showed a high CPU usage. `RecyclerViews` addressed these issues and brought in other advantages.

Those advantages are listed below:

1. *flexibility* - with `RecyclerViews`, you can create custom layouts for each of the list items. You can also define the orientation and placement of the items.
2. *animations* - `ListViews` had no support for animating the list items. `RecyclerViews` have the `ItemAnimator` class that helps animate the list items.
3. *click listeners* - with `ListViews`, you could only listen to click events, while in `RecyclerViews`, you can listen to various interactions like drag and long-press thanks to the `RecyclerView.OnItemTouchListener` class.
4. *control* - `RecyclerViews` allows the developer to have full control of the list items and their behavior. `ListViews` limited this.

This article goes through how to create `RecyclerViews`. It will address the requirements and classes involved to develop a functioning `RecyclerView`.

To comfortably follow through with this tutorial, you'll need:

- **Android Studio** installed on your machine.
- A basic understanding of **Android development** using **Kotlin** programming language.

##### Components of a RecyclerView
First, let's go through the parts of a `RecyclerView`.

1. ***RecyclerView***: this is the view declared in your activity. It's where the list of data will be displayed.
2. ***Layout Manager***: it defines how the list should organize our data. It could be horizontal, vertical, or a grid layout.
3. ***Adapter***: this connects our data, usually a list, to our `RecyclerView`. It also observes changes in the list and updates the `RecyclerView`.
4. ***ViewHolder***: this holds the View onto which we display the data.

#### Writing the code
Fire up your IDE and create a project with an Empty activity. We'll work in the `MainActivity` class. Once the project build is done, open the app-level `build.gradle` and add the following dependencies.

```gradle
//Glide
kapt 'com.github.bumptech.glide:compiler:4.11.0'
implementation 'com.github.bumptech.glide:glide:4.11.0'

//RecyclerView
implementation 'androidx.recyclerview:recyclerview:1.1.0'
```

We'll use Glide to load images to the `ImageViews`. Don't forget to add `apply plugin: 'kotlin-kapt'` to the top of the gradle file.

Sync the project to load all dependencies.

After gradle syncs, open the `activity_main.xml` file and add the code below.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/parent_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">


    <androidx.recyclerview.widget.RecyclerView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/recyclerview"
        android:layout_margin="10dp"
        tools:listitem="@layout/list_item"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"/>

</LinearLayout>
```

This code adds the `RecyclerView` XML view. We give it an ID of `recyclerview` that we'll use as a reference in the activity. We also add `app:layoutManager` to set a layout manager to our `RecyclerView`.

We can do this using Kotlin as well. Since we need the basic Vertical ListView form, we use `LinearLayoutManager`.

We have three layout managers that we can use. You can learn more about them in their [documentation](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.LayoutManager).

Next up, we'll create the list item layout. It will be a blueprint that the recyclerview will use to draw our list items. All items in the recyclerview will take the layout's form.

In the `res/layout` directory, create a new layout file and give it a name. In our case, we will use `list_item`. This will solve the XML error in our `activity_main.xml` at the `listitem` attribute.

Add the following code:

```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="10dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <androidx.appcompat.widget.AppCompatImageView
            android:id="@+id/profile"
            android:layout_width="100dp"
            android:layout_height="100dp" />

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:layout_margin="10dp"
            android:orientation="vertical">

            <TextView
                android:id="@+id/name"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="5dp"
                android:text="Linus Muema"
                android:textSize="20sp" />


            <TextView
                android:id="@+id/phone"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="5dp"
                android:text="1234567890"
                android:textSize="15sp" />

        </LinearLayout>

    </LinearLayout>

</androidx.cardview.widget.CardView>
```

You can see that I have used a `CardView` as a parent to have card items on my list. Then we'll add an `ImageView` and two `TextViews` to hold our data. Once you go to the `activity_main.xml` preview pane, the `RecyclerView` preview will have changed from the old `ListView` form to our layout's form.

The layout should produce a view similar to the one below.

![List Item](/engineering-education/android-recyclerviews/item.png)

Now that we have our `RecyclerView` and the list item layouts set up, we can get the data displayed. You can go ahead and download the contents from [this file](https://github.com/LinusMuema/kotlin/blob/recyclerviews/app/src/main/java/com/moose/androidkt/Data.kt) on GitHub. It generates random users and returns the list of users for us to show in our `RecyclerView`.

We now have to create an adapter that will connect our data to our `RecyclerView`. Go ahead and create a new Kotlin class. We'll name it `ListAdapter`. Add a list of type `User` as a parameter.

Make the class extend `RecyclerView.Adapter`. We also need to add our `ViewHolder` class by [type inferencing](https://kotlinlang.org/spec/type-inference.html).

Since we don't have the class already, create an inner class in our `ListAdapter` class. Give it the name `ListViewHolder`.

We'll get to that a bit later.

```Kotlin
class ListAdapter(private val data: List<User>): RecyclerView.Adapter<ListAdapter.ListViewHolder>() {

      class ListViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

      }
}
```

For the adapter to function well, we need to override three methods. Let's go through each of the methods and see what they do.

#### 1. onCreateViewHolder
The `Recyclerview` invokes this method to create a `ViewHolder`. Since we passed our `ViewHolder` class by type inferencing, this method's return type is the actual `ViewHolder`.

Add the following code in the `ListAdapter` class.

```Kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
    return ListViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.list_item, parent, false))
}
```

We use the layout inflator class to create the view that will hold our data.

#### 2. getItemCount
This method returns the entire count of items in the `RecyclerView` and not just the visible ones. To return the correct value, we set it to return the size of our list.

```Kotlin
    override fun getItemCount(): Int = data.size
```

#### 3. onBindViewHolder
This is the last method to override. This method binds data on the `Viewholder` provided as an argument.

```kotlin
override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
    holder.bind(data[position])
}
```

Here we call a function in our `Viewholder` named `bind`, that takes care of adding the data to the layout's views. We pass in the user object at the specified position in the list.

This ensures that the user object at a specific position will be displayed at the same position in the recyclerView.

Add the following function in the ListViewHolder class.

```Kotlin
fun bind(user: User) {
    Glide.with(itemView.context).load(user.image).into(itemView.profile)
    itemView.name.text = user.name
    itemView.phone.text = user.number.toString()
}
```

This is where the name `RecyclerView` comes from. As you can see, we created the views using `onCreateViewHolder`.

The `RecyclerView` doesn't create a view for every item on our list. What it does do is create views that can only fit onto the screen's viewport and then recycles them.

Let's assume the device can accommodate five views and our data has ten items. The `RecyclerView` creates five views to hold the first five pieces of data. Once a user scrolls, it clear the items that move out of the screen from their views. The `RecyclerView` then uses these views to display the incoming set of data.

When the item at position 1 goes out of the screen, it's removed from the view. The `RecyclerView` uses the now empty view to display the item at position 6 visible on the screen.

This forms a recycling cycle that ensures it displays all data well, and that we don't create extra views. It also ensures the application does not drain the operating system's resources by creating too many views that we will not use.

The last part is to connect the `RecyclerView` to the adapter.

Add the following code to the `onCreate` method in the `MainActivity.kt` file.

```Kotlin
recyclerview.apply {
    setHasFixedSize(true)
    adapter = ListAdapter(Data.get())
}
```

We get the `RecyclerView` by the ID we used in the layout file. We use the `apply` method to perform actions on the `RecyclerView`.

We also assign an adapter to it and call the `Data.get()` function to get a random list of users. The `setHasFixedSize` ensures that the items' views always have the same dimensions.

If the dimensions kept on changing, it would lead to glitches.

With that, our `RecyclerView` is complete. Once you run your application, the `MainActivity` should resemble the one below.

![RecyclerView](/engineering-education/android-recyclerviews/recyclerview.jpg)

#### Conclusion
That's just the basics of Android `RecyclerViews`. There are more methods like `notifyDataSetChanged`, that help us to manage our `Recyclerviews`. Android developers have adopted `RecyclerViews` extensively, and learning how to use them is a huge advantage. Make sure you manage your lists of data by using `RecyclerViews`.

You can go ahead and try out the other layout managers to see how they work and perform. You can find the entire code for this tutorial on [GitHub](https://github.com/LinusMuema/kotlin/tree/recyclerviews) or install a sample application from [Google Drive](https://drive.google.com/file/d/1Nn8xiTcNCk7wlbygPbjxGwW-9ScPUJtr/view?usp=sharing).

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
