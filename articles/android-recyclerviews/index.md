#### Android RecyclerViews
In android, it is common to display a list of data. With more data to be presented, developers have come with Compound Views to aid in displaying data. It has not been an easy task since most of the data is received dynamically. Dynamic data includes data from a network or local database. Again comes the problem of resource management. Loading vast amounts of data into normal views can lead to high CPU usage. This, in turn, leads to the operating system forcibly shutting down the application. That is where ListViews came in handy. They were able to load text-based data to a Compound view using an adapter to ensure efficiency. However, they did not address all the problems encountered. They did not allow the addition of other views to the Compound view. Developers needed to write extra code to facilitate the addition of other Views. Again they were not very efficient in resource management. Having many ListViews in the application still showed high CPU usage. RecyclerViews addressed these issues and brought in other advantages:

1. *_flexibility_* - with recyclerviews, you can create custom layouts for each of the list items. You can also define the orientation and placement of the items.
2. *_animations_* - listviews had no support for animating the list items. Recyclerviews have the ItemAnimator class, which helps to animate the list items
3. *_click listeners_* - with listviews, you could only listen to click events, while in recyclerviews, you could listen to various interactions like drag, long-press thanks to the RecyclerView.OnItemTouchListener class.
4. *_control_* - recyclerviews allow the developer to have full control of the list items and their behavior. This was limited in ListViews

This article goes through how to create RecyclerViews. It will address the requirements and classes involved to create a functioning RecyclerView. In order to comfortably follow through this tutorial, you need:

- **Android Studio** installed on your machine
- Basic understanding of **Android development** using **Kotlin** programming language

##### Components of a RecyclerView
First, let's go through the parts of a RecyclerView.

1. **_RecyclerView_** : this is the list view declared in your activity. It is where the list of data is to be displayed.
2. **_Layout Manager_** : it defines how data is arranged in your list. It could be horizontal, vertical or grid layout.
3. **_Adapter_** : this connects our data, usually a list, to our recyclerview. It also observes changes in the list and updates the recyclerView.
4. **_ViewHolder_** : this holds the View onto which the data is displayed.

#### Writing the code
Fire up your IDE and create a project with an Empty activity. We will work from the `MainActivity` class. Once the project build is done, open the app level *`build.gradle`* and add the following dependencies.

```gradle
//Glide
kapt 'com.github.bumptech.glide:compiler:4.11.0'
implementation 'com.github.bumptech.glide:glide:4.11.0'

//RecyclerView
implementation 'androidx.recyclerview:recyclerview:1.1.0'
```

We will use Glide to load images to the `ImageViews`. Don't forget to add `apply plugin: 'kotlin-kapt'` to the top of the gradle file. Sync the project to load all dependencies.

After gradle sync, open the `activity_main.xml` file and add the code below.

```xml
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

This adds the RecyclerView xml view. We give it an id of `recyclerview` that we will use as a reference in the activity. We also add `app:layoutManager` to set a layout manager to our recyclerView. This can also be done using Kotlin. Since we need the basic Vertical ListView form, we use `LinearLayoutManager`. We have three layout managers that we can use. You can learn more about them on their [documentation](https://developer.android.com/reference/androidx/recyclerview/widget/RecyclerView.LayoutManager)

Next up, we will create the list item layout. This will be a blue print that will be used to draw our list items. All items in the recyclerview will take the layout's form. In the `res/layout` directory, create a new layout file and give it a name. This will solve the xml error in our `activity_main.xml` at the `listitem` attribute. In our case, we will use `list_item`. Add the following code:

```xml
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

I have used a `CardView` as a parent so that we can have a card of items in my list. Then we add an `ImageView` and two `TextViews` to hold our data. Once you go to the `activity_main.xml` preview pane, the recyclerview preview will have changed from the old listview form to out layout's form. The layout should produce a view similar to the one below.

![List Item](/engineering-education/android-recyclerviews/item.png)

Now that we have our recyclerView and the list item layouts set up, we can go ahead and get the data to be displayed. You can go ahead and download the contents from [this file](https://github.com/LinusMuema/kotlin/blob/recyclerviews/app/src/main/java/com/moose/androidkt/Data.kt) on Github. It generates random user's and returns the list of users for us to display in our recyclerView.

We now have to create an adapter that will connect our data to our recyclerView. Go ahead and create a new kotlin class. We will name ours `ListAdapter`. Add a list of type `User` as a parameter. Make the class extend `RecyclerView.Adapter`. We also need to add our `ViewHolder` class by [type inferencing](https://kotlinlang.org/spec/type-inference.html). Since we do not have the class already, create an inner class in our `ListAdapter` class. Give it the name `ListViewHolder`. We'll get to it later.

```kotlin
class ListAdapter(private val data: List<User>): RecyclerView.Adapter<ListAdapter.ListViewHolder>() {

      class ListViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

      }
}
```

For the adapter to function well, we need to override three methods. Let's go through each of the methods and see what they do.

#### 1. `onCreateViewHolder`
This method is invoked in order to create a `ViewHolder`. Since we passed our viewholder class by type inferencing, the return type of this method is the actual viewholder. Go ahead and add the following code in the ListAdapter class.

```kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
    return ListViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.list_item, parent, false))
}
```

We use the layout inflater class to create the view that will hold our data.

#### 2. `getItemCount`
This method returns the entire count of items in the recyclerView and not just the visible ones. In order to return the correct value, we set it to return the size of our list.

```kotlin
    override fun getItemCount(): Int = data.size
```

#### 3. `onBindViewHolder`
This is the last method to override. This method binds data on the viewholder provided as an arguement.

```kotlin
override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
    holder.bind(data[position])
}
```

Here we call a function in our viewholder named `bind` which takes care of adding data to the views in the layout. We pass in the user object at the specified position in the list. This ensures that the user object at a specific position will be displayed at the same position in the recyclerView. Add the following function in the ListViewHolder class.

```koltin
fun bind(user: User) {
    Glide.with(itemView.context).load(user.image).into(itemView.profile)
    itemView.name.text = user.name
    itemView.phone.text = user.number.toString()
}
```

And here is where the name `RecyclerView` comes from. You see, we created the views using onCreateViewHolder. The recyclerView does not create a view for every item in our list. What happens is that it creates views that can fit on to the screens viewport only and recycles them. Let's assume the device can accommodate 5 views and our data has 10 items. The recyclerView creates 5 views to hold the first 5 pieces of data. Once a user starts scrolling, the items that move out of the screen are cleared from their views, and the views are used to display the incoming set of data. So when the item at position 1 goes out of the screen, it is removed from the view. That now empty view is used to display item at position 6 which is now visible on the screen. This forms a recycling cycle that ensures all data is displayed well and we don't create extra views. It also makes sure the application does not drain the operating system's resource by creating many views that are not used.

The last part is now connecting the recyclerView to the adapter. Add the following code to the `onCreate` method in the `MainActivity.kt` file.

```kotlin
recyclerview.apply {
    setHasFixedSize(true)
    adapter = ListAdapter(Data.get())
}
```
We get the recyclerview by the id we used in the layout file. We use the `apply` method to perform actions on the recyclerView. We also assing an adapter to it and call the `Data.get()` function to get a random list of users. The `setHasFixedSize` ensures that the items views always have the same dimensions. If the dimensions kept on changing, it would lead to glitches. And with that, our recyclerView is complete. Once you run your application, the MainActivity should resemble the one below.

![RecyclerView](/engineering-education/android-recyclerviews/recyclerview.jpg)

#### Conclusion
That's just the basics of android recyclerviews. There are more methods like `notifyDataSetChanged` which help us to manage our recyclerviews. RecyclerViews have been greatly adopted by android developers and learning how to use them is a great advantage. You should ensure to manage your lists of data by making use of recyclerviews. You can go ahead and try out the other layout managers to see how they work and performance. The full code for this tutorial can be found on [Github](https://github.com/LinusMuema/kotlin/tree/recyclerviews). An installation apk can be found on [Google Drive](https://drive.google.com/file/d/1Nn8xiTcNCk7wlbygPbjxGwW-9ScPUJtr/view?usp=sharing)
