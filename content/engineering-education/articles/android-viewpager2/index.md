---
layout: engineering-education
status: publish
published: true
url: /engineering-education/android-viewpager2/
title: Android ViewPager2 with TabLayout
description: In this article we will go through the basics of implementing ViewPager2 and TabLayout in an Android application.
author: peter-kayere
date: 2020-11-22T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-viewpager2/hero.jpg
    alt: job scheduling Node.js image example
---
Slide transition between screens is common in Android applications. We can use the navigation components or a swipe-able view to create this transition. A common swipe-able view is `ViewPager2`. The `ViewPager` library has been around for quite a while.
<!--more-->
### Introduction
This view allows the developer to display views or fragments to the user in a swipe-able format. This feature is common in content display applications and in app setups.

`ViewPager2` is often integrated with `TabLayout`. A `TabLayout` indicates the current page and allows a user to switch through pages.

`ViewPager2` is a newer version of the `ViewPager` library. A significant difference from the old library is the use of a `RecyclerView` adapter. With this, views are now recycled. This improves user experience by making smooth transitions and minimizing memory usage.

This article goes through implementing `ViewPager2` and `TabLayout` in an Android application.

Let's dive in!

### Prerequisites
To follow through with this tutorial, you will need to:
  1. Have [Android Studio](https://developer.android.com/studio) installed.
  2. Have a basic knowledge of building Android applications.
  3. Have a basic understanding of [Kotlin](/engineering-education/kotlin-collections/) programming language.

Let's get started!

### Step 1 — Creating an Android Project
In this step, we're going to create our application. Open Android Studio and start a new project using the empty activity template. On the next page, give the application a name and keep the default settings.

![app name](/engineering-education/android-viewpager2/app-name.png)

Click `Finish` and wait for the project build process to finish.

### Step 2 — Adding Views in Xml Layouts
Our `activity_main` layout file will contain only two views. Add them as follows.

```xml
<com.google.android.material.tabs.TabLayout
    android:id="@+id/tabLayout"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="5dp"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"/>

<androidx.viewpager2.widget.ViewPager2
    android:id="@+id/pager"
    android:layout_width="match_parent"
    android:layout_height="0dp"
    android:layout_marginTop="5dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/tabLayout" />
```

We also need to create a layout that we'll display on the `ViewPager2` component. Go to `File -> New -> XML -> Layout XML File` to create the layout file. In the layout file, replace the default `TextView` widget with the one below.

```xml
<TextView
    android:id="@+id/textView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:textColor="@color/black"
    android:textSize="50sp"
    tools:text="TextView"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
```

We're done with the xml files. Let's go ahead and create an adapter for our `ViewPager2` component.

### Step 3 — Creating ViewPager2 adapter
As I mentioned earlier, the `ViewPager2` component uses a recyclerview adapter. The adapter's responsibility is to render data to the `viewPager2` component. The recyclerview adapter adds vertical scroll ability, which was absent in the old `ViewPager`. We will show this ability later in the article.

Let's start creating the adapter.

Go to `File -> New -> Kotlin File/Class`. Select class and name the file `PagerAdapter`.

In the adapter class, add the following code.

```Kotlin
class PagerAdapter(private val context: Context, private val words: List<String>): RecyclerView.Adapter<PagerAdapter.PageHolder>(){

}
```

This adds the constructor and extends the base class `RecyclerView.Adapter`. The base class takes a typed parameter which is a view holder. The `PagerAdapter.PageHolder` class is a view holder class that we are yet to create.

Inside the `PagerAdapter` class, add the `PageHolder` class as an inner class.

```Kotlin
inner class PageHolder(view: View): RecyclerView.ViewHolder(view){

}
```

The class needs to extend the base class `RecyclerView.ViewHolder`. It should also pass in the view it gets as a parameter. A `ViewHolder`, as the name suggests, is a class that holds and describe views that each list item should contain.  We create our view references in this class.

Let's add our view's reference to the view holder.

```Kotlin
inner class PageHolder(view: View): RecyclerView.ViewHolder(view){
      val textView: TextView = view.textView
}
```

Now override the members of the `RecyclerView.Adapter` class. We only need to override these three members.

```Kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PageHolder {

}

override fun onBindViewHolder(holder: PageHolder, position: Int) {

}

override fun getItemCount(): Int {

}
```

Read [this article](/engineering-education/android-recyclerviews/) for a deeper explanation of the methods.

Add the implementation to the methods as shown below.

```Kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PageHolder  =
        PageHolder(LayoutInflater.from(context).inflate(R.layout.page_layout, parent, false))
}

override fun onBindViewHolder(holder: PageHolder, position: Int) {
      holder.textView.text = words[position]
}

override fun getItemCount(): Int = words.size
```

In the `onCreateViewHolder` method, we inflate the `page_layout` layout using a `LayoutInflater`. In the `onBindViewHolder` method, we assign a word from the word list to the `TextView`. The `getItemCount` is a method where we return the size of the word list.

That's all for the adapter.

### Step 4 — Testing the ViewPager2 component
Open `MainActivity.kt` file. In the `onCreate` method, add a list of words.

```Kotlin
val words = arrayListOf("One", "Two", "Three", "Four", "Five")
```

Then add the adapter as shown.

```Kotlin
pager.adapter = PagerAdapter(this, words)
```

That's what we need for the `ViewPager2`. Now build and run the application.

The output should look like this.

![View pager gif](/engineering-education/android-viewpager2/view-pager.gif)

To change the scroll orientation to vertical, add the following statement in the `onCreate` method.

```Kotlin
pager.orientation = ViewPager2.ORIENTATION_VERTICAL
```

It should resemble the demo below.

![vertical orientation gif](/engineering-education/android-viewpager2/vertical-scroll.gif)

### Step 5 — Integrating TabLayout
Now that our view pager is functioning as expected. Let's go ahead and integrate it with `TabLayout`.

To integrate `ViewPager2` with `TabLayout` we need to use a `TabLayoutMediator` class. This was easier with the old ViewPager. We had to use the `TabLayout`'s `setUpWithViewPager` method and pass the `ViewPager2` reference.

The `TabLayoutMediator` class takes in two parameters, the `TabLayout` and `ViewPager2` references.

```Kotlin
TabLayoutMediator(tabLayout, pager)
```

The class then takes a lambda function with two parameters. `TabLayout.Tab` and an integer representing the position of the ViewPagers' pages.

```Kotlin
TabLayoutMediator(tabLayout, pager) {tab, position ->
      tab.text = "${position + 1}"
}.attach()
```

In the function, we set the tabs' text to the position plus one. We add one because the positions start from zero. We attach the components by calling the `attach` method.

Build and run the application. This is how it should look.

![tab layout gif](/engineering-education/android-viewpager2/tab-layout.gif)

Another essential feature of `TabLayout` is the `onTabSelectedListener`. This notifies the listeners whenever a tab's selected, unselected, or reselected. This is useful when one wants to perform some background tasks when the listener fires up. We'll use toasts in our application for demonstration.

Add the following code to implement the feature.

```Kotlin
tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
    override fun onTabSelected(tab: TabLayout.Tab?) {
        Toast.makeText(this@MainActivity, "Tab ${tab?.text} selected", Toast.LENGTH_SHORT).show()
    }

    override fun onTabUnselected(tab: TabLayout.Tab?) {
        Toast.makeText(this@MainActivity, "Tab ${tab?.text} unselected", Toast.LENGTH_SHORT).show()
    }

    override fun onTabReselected(tab: TabLayout.Tab?) {
        Toast.makeText(this@MainActivity, "Tab ${tab?.text} reselected", Toast.LENGTH_SHORT).show()
    }
})
```

Build and rerun the app.

![toasts gif](/engineering-education/android-viewpager2/toasts.gif)

### Conclusion
In this article, we have gone through creating the ViewPager2 component. We have also seen how we can integrate it with a TabLayout. This is a common UI component, and almost all apps that display data in page format use it.

Achieving the slide transition between content screens is relatively easy with the component. You don't need to implement gesture listeners since the component does that for you. You can find the app's source code on [Github](https://github.com/kayere/view-pager-example.git).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
