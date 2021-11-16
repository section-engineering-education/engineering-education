---
layout: engineering-education
status: publish
published: true
url: /view-binding-in-android/
title: How to use View Binding in Android
description: This article will provide a step-by-step guide on how to implement view binding in Android using Kotlin.
author: lorna-moraa
date: 2021-10-26T00:00:00-03:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/view-binding-in-android/hero.jpg
    alt: View Binding Hero Image
---
View binding allows a developer to incorporate significant interaction in an application. This concept seeks to eliminate the findViewById keyword. Removing such boilerplate code allows developers to be more productive.
<!--more-->
A binding class is usually generated for each layout file when using view binding. The binding class stores all the references to particular views.

The generated binding class has a nearly similar name as the `layout.xml` file. For instance, the binding class name for `detail_main.xml` is `DetailMainBinding`. This naming technique helps avoid confusion and mistakes.

View binding is null-safe and fast. It allows developers to avoid common errors during programming.

### Goal
This tutorial will help you understand the concept of view binding in Android using Kotlin.

### Prerequisites
To follow along, you should have:
- A basic understanding of the Kotlin programming language.
- [Android Studio](https://developer.android.com/studio) installed on your computer.

### Advantages of view binding
View binding has several advantages. First, it supports null safety. This feature prevents developers from calling non-existent views or ids. As a result, it prevents the app from sudden crashes.

Secondly, view binding helps to reduce boilerplate code. In the past, developers had to make significant use of the `findViewById` keyword. Therefore, a significant amount of time was wasted on these operations. View binding seeks to eliminate such challenges.

View binding also facilitates type safety. The binding class that is generated matches the views declared in the layout file. Once again, this feature prevents an application from crashing.

### Step 1 - Creating the project
Launch Android Studio and create a new empty project. Note that this process may take some time depending on your computer's properties.

![Empty Project](/engineering-education/view-binding-in-android/empty-project.png)

### Step 2 - Adding the required dependency
After the project is generated, navigate to the app-level `build.gradle` file and add the following code:

```gradle
buildFeatures{
        viewBinding true
    }
```

Then click on the `sync now` button to update the project.

### Step 3 - Preparing the UI
Let's declare several buttons and `TextViews` in the `activity_main.xml` file, as demonstrated below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/welcome"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        android:layout_margin="20dp"
        android:layout_gravity="center"/>

    <TextView
        android:id="@+id/login"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Login"
        android:layout_margin="20dp"
        android:layout_gravity="center"/>

    <Button
        android:id="@+id/send_data"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Send data"
        android:layout_margin="20dp"
        android:backgroundTint="@color/colorAccent"
        android:layout_gravity="center"/>/>

</LinearLayout>
```

### Step 4 - Accessing the UI components
In this step, we need to access the UI components that we defined in the `activity_main.xml` file. We will define and initialize the binding class in the `MainActivity`.

Open the `MainActivity` file and incorporate the following changes:

```kt
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding  //defining the binding class

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater) //initializing the binding class
        setContentView(binding.root) // we now set the contentview as the binding.root

        binding.welcome.text = "Hallo and welcome"
    }
}
```

In the code above, we can refer to the `TextView` using `binding.welcome` instead of `findViewById`. The `.text` aspect allows us to change the TextView's contents.

To access the `send_data` button that we defined earlier, we use the code below:

```kt
binding.send_Data.setOnClickListener{
    //perform an operation
    //send_Data is the button's id
}
```

### Step 5 - Using view binding in fragments
Fragments are common components of many applications. Developers prefer fragments due to their lifecycle callbacks and behavior. Fragments can also be easily added and removed from activities.

Incorporating view binding in fragments can lead to an enhanced user experience.

For simplicity, let's create a new Android project. This time we will choose `Fragment + ViewModel` as the default template.

![Fragment](/engineering-education/view-binding-in-android/fragment.png)

As usual, we need to allow view binding in the app-level `build.gradle` file.

```gradle
     buildFeatures{
        viewBinding true
    }
```

Let's add the following UI components to the fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".ui.main.MainFragment">

    <!-- The fragments have the following TextViews -->

    <TextView
        android:id="@+id/message"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="MainFragment"/>

    <TextView
        android:id="@+id/content"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hallo there. This is a fragment"/>

</LinearLayout>
```

Always ensure that the required UI elements have an id.

When we navigate to the `MainFragment.kt` file, you will see the following code:

```kt
class MainFragment : Fragment() {

    companion object {
        fun newInstance() = MainFragment()
    }

    private lateinit var viewModel: MainViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View {
        return inflater.inflate(R.layout.main_fragment, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
```

We need to make several changes to the code above. For starters, we must define and initialize the binding class. We should also replace `return inflater.inflate(R.layout.main_fragment, container, false)` with the generated binding class.

Let's first create a new binding variable and set it to null, as demonstrated below:

```kt
private var fragbinding = MainFragmentBinding? = null
```

Secondly, we need to replace the `return inflater.inflate(R.layout.main_fragment, container, false)` with the code snippet below:

```kt
fragbinding = MainFragmentBinding.inflate(inflater, container, false)
return fragbinding.root
```

We will then return the root class from the binding, as shown above:

Here is the complete code for the `MainFragment`:

```kt
class MainFragment : Fragment() {

    companion object {
        fun newInstance() = MainFragment()
    }

    private lateinit var viewModel: MainViewModel
    private var fragbinding = MainFragmentBinding? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View {
        fragbinding = MainFragmentBinding.inflate(inflater, container, false)
        return fragbinding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)
        // TODO: Use the ViewModel

        //we can access our UI components, as shown below
        fragbinding.message.text = "Hello there"
        fragbinding.content.text = "This is an example of view binding in Android"
    }

}
```

### Conclusion
In this tutorial, we have learned how to use view binding in activities and fragment. The huge advantage of the view binding feature is that it saves a significant amount of time, as well as eliminates boilerplate code.

You can use the knowledge gained from this course to craft beautiful and quality applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
