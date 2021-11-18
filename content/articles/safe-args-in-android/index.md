---
layout: engineering-education
status: publish
published: true
url: /safe-args-in-android/
title: Sharing Data using SafeArgs in Android-Kotlin
description: This article will guide the reader on how to share predefined and custom data types in arguments across destinations in an Android app using SafeArgs.
author: eric-gacoki
date: 2021-06-25T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/safe-args-in-android/hero.png
    alt: SafeArgs in Android example image
---
Data sharing in Android involves passing arguments between fragments in navigation action. This not only enhances communication between the destinations involved but also establishes a continuous flow of the application.
<!--more-->
### Introduction
In the past few years, Android developers have made use of the Android Bundle class which was one of the techniques of sharing data across activities. 

This came with a bunch of cons among which is the tedious work the developer had to do, the unreliability due to the manual approach, and lack of type safety that could easily crash the application.

The Navigation components API, (part of [Jetpack](https://developer.android.com/jetpack) libraries) is a MAD (Modern Android Development) approach that solves these problems by introducing `SafeArgs` - a plugin that allows you to pass data in a more efficient, safe, and encapsulated way.

#### Prerequisites
To follow through this tutorial, you need to be familiar with:
- Basic usage of [Android studio](/engineering-education/search/?q=Android%20studio).
- [Kotlin programming](/engineering-education/search/?q=Kotlin).
- Imperative paradigm concepts in Android development.
- View binding and/or data binding.

#### Table of contents
In this tutorial, we're going to:
- [Create an Android project](#create-an-android-project)
- [Enable viewBinding](#enable-viewbinding)
- [Create two Fragments](#create-two-fragments)
- [Design a navigation graph](#creating-the-navigation-graph)
- [Set up SafeArgs](#set-up-safeargs)
- [Define arguments](#how-can-you-define-an-argument)
- [Pass values to predefined data type arguments](#passing-values-to-the-argument)
- [Receive the argument at the destination fragment](#receive-the-argument-at-the-destination)
- [Share custom arguments](#sharing-custom-arguments)
- [Create custom data object](#creating-a-custom-object-argument)
- [Receive parcel at the destination](#receive-the-parcel-in-fragmentbkt)
- [Conclude](#conclusion)

### Create an Android project
Fire up Android Studio and create an Empty Activity project with the following configurations.

![New project](/engineering-education/safe-args-in-android/new-project.png)

Double-check to make sure that the package name is as shown. Otherwise you'll have to configure your project to make it compatible with the code used in this tutorial.

### Enable viewBinding
View binding allows us to access views in the XML file via the respective binding class and the view's id. Open the app-level `build.gradle` file and paste the following inside the android scope and sync the project.

```bash
android {
    ...

     buildFeatures{
        viewBinding true
    }
}
```

You can learn more about view binding [here](https://developer.android.com/topic/libraries/view-binding).

### Create two Fragments
Moving on, we need at least two fragments that we'll use to pass arguments across when navigating. Right-click on the project's main package directory and create two empty fragments namely `FragmentA` and `FragmentB`. 

Let's nickname them A and B to keep things simple. The two should have their corresponding XML files namely `fragment_a.xml` and `fragment_b.xml` respectively.

#### Starter code setup
The following is the initial code that we'll build on.

#### i). FragmentA.kt
```Kotlin
class FragmentA: Fragment() {
    private var binding : FragmentABinding? = null
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentABinding.inflate(layoutInflater)
       return binding.apply {

           // We'll write the rest logic here

        }?.root
    }
}
```

Here, we've inflated the fragment using view binding.

#### ii). fragment_a.xml
```xml
<Button
    android:id="@+id/btnShareData"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_marginHorizontal="8dp"
    android:text="Share data"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="1.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintVertical_bias="0.9" />
```

This serves as the UI for FragmentA. The above code creates a button that will later be used to trigger a navigation action when clicked.

#### iii). FragmentB.kt
```Kotlin
class FragmentB : Fragment() {
    private var binding: FragmentBBinding? = null
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentBBinding.inflate(layoutInflater)
        return binding.apply {

            // We'll update the UI after receiving the arguments here

        }?.root
    }
}
```

This serves a similar purpose as that of FragmentA.

#### iv). fragment_b.mxl
```xml
<TextView
    android:id="@+id/textView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:textSize="20sp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    tools:text="Argument text" />
```

The above textView will be used to display data after a successful arrival discussed in the latter part of the tutorial 😎.

### Creating the navigation graph
A navigation graph popularly known as nav-graph controls and visualizes how we maneuver between the fragments. To create a nav-graph, switch to Resource Management on the left side panel and select `navigation`. 

Click the `+` button and create a new graph named `my_nav`. This will prompt you to automatically add the respective dependencies.

![Accept dependencies](/engineering-education/safe-args-in-android/accept-dependencies.png)

Click `OK` and you'll be good to go.

Alternatively, you can manually add the following dependencies in the app-level `build.gradle` file.

```bash
    implementation 'androidx.navigation:navigation-fragment-ktx:2.3.5'
    implementation 'androidx.navigation:navigation-ui-ktx:2.3.5'
```

#### Add destinations in the Nav-graph
Destinations are the screens or rather fragments included in a particular navigation graph. Go ahead and paste the following code in the `my_nav.xml` file we just created.

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/my_nav"
    app:startDestination="@id/fragmentA">

    <fragment
        android:id="@+id/fragmentA"
        android:name="com.demo.safeargs.FragmentA"
        android:label="Fragment A"
        tools:layout="@layout/fragment_a">
        <action
            android:id="@+id/action_fragmentA_to_fragmentB"
            app:destination="@id/fragmentB" />
    </fragment>

    <fragment
        android:id="@+id/fragmentB"
        android:name="com.demo.safeargs.FragmentB"
        android:label="Fragment B"
        tools:layout="@layout/fragment_b" />
</navigation>
```

This adds two destinations, sets `fragmentA` as the initial fragment, and creates a navigation action from A to B.

#### Create the host for our Navigation graph
Now that we've created a graph, it's time to set the activity that will serve as the parent and the entry point for our app. This involves adding a nav host fragment in the activity's XML file as shown below.

#### activity_main.xml
```xml
<fragment
    android:id="@+id/nav_host_fragment"
    android:name="androidx.navigation.fragment.NavHostFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:defaultNavHost="true"
    app:navGraph="@navigation/my_nav" />
```

**NOTE:** Android Studio will complain and suggest that you should use a `FragmentContainerView` instead of a fragment tag. I found out that addressing the warning results in weird unexpected crashes discussed in [this Google issue tracker](https://issuetracker.google.com/issues/142847973#comment11).

#### MainActivity.kt
This inflates the UI with nav-graph and updates the toolbar with respect to the current destination.

```Kotlin
class MainActivity : AppCompatActivity() {
    private var binding: ActivityMainBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding!!.root)

        setupActionBarWithNavController(findNavController(R.id.nav_host_fragment))
    }
    // Update action bar with the nav controller
    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment)
        return navController.navigateUp() ||  super.onSupportNavigateUp()
    }
}
```

### Set up SafeArgs
Now we're ready to take a flight with safe args, but before then, let's first pack our bags.

This involves loading the required dependencies and plugins. Add the following classpath in the project-level `build.gradle` file.

```bash
dependencies {
    ...

    // build configurations that will be applied to all the modules in the project.

    classpath "androidx.navigation:navigation-safe-args-gradle-plugin:2.3.5"
}
```

In your module-level `build.gradle` file, add the following plugin.

```gradle
plugins {
    ...

    // safe args plugin
    id 'androidx.navigation.safeargs'
}
```

Check if you have Java-8 support enabled as most Gradle plugins (including safe-args) require JDK 8.

```bash
android {
    ...

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }
}
```

It is recommended to fully rebuild and clean your project after syncing to make sure that navigation component tools are generated.

#### What argument types does SafeArgs support?
The data attached to a navigation operation is referred to as an argument. Arguments can take different types but not all types are supported by SafeArgs.

The following is a list of supported data types.

Predefined types:
- Boolean
- String
- Integer
- Float
- Long
  
Custom types:
- Custom Parcelable
- Custom Serializable
- Custom Enum
- Resource Reference

### How can you define an argument?
To add an argument to a nav-action, select the destination fragment in the navigation graph preview and click `+` on the attributes panel. A dialog will pop up as shown below.

![Add integer argument](/engineering-education/safe-args-in-android/add-int-argument.png)

This can be used to define attributes such as `name`, `type`, `nullability`, and the `default value` where applicable. In the example above, we've created ***myAge*** which is an ***Integer*** whose default value is ***1***.

By clicking `Add`, the following tag is auto-added.

```xml
<!-- inside fragment B tag -->
<argument
    android:name="myAge"
    app:argType="integer"
    android:defaultValue="1" />
```

### Passing values to the argument
Think of a scenario where you need to order a pizza to be delivered to you. You'll have to place an order before delivery. Similarly, when we want to pass data from `A` to `B`, `B` must first need the data, that is, there must be an argument in `B` and a path connecting `A` to `B`. This path is the navigation action that we've already created. 

Moving on, declare an action variable and assign `19` to it for example. Remember the value must align with the type of the argument. In this case, we can only pass integers, otherwise, a type mismatch exception will be thrown. 

Paste the following in the `onCreate()` method in `FragmentA.kt` file.

```Kotlin
// trigger an action when the button is clicked
binding?.btnShareData?.setOnClickListener {
    val action = FragmentADirections.actionFragmentAToFragmentB().setMyAge(20)
    // navigate to FragmentB
    findNavController().navigate(action)
}
```

### Receive the argument at the destination
Now, our pizza delivery is in progress. We need to prepare to receive it upon arrival. 

Head to `FragmentB.kt` and update the code to:
```Kotlin
class FragmentB : Fragment() {
    private var binding: FragmentBBinding? = null
    private val args: FragmentBArgs by navArgs<FragmentBArgs>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentBBinding.inflate(layoutInflater)
        return binding.apply {

            val age = args.myAge.toString()
            binding?.textView?.text = "My age is: $age"

        }?.root
    }
}
```

Here we've declared a variable `args` that takes the argument(s) associated with FragmentB. We've also set the value of the textView to the value contained in `args`.

Similarly, we can share other data types as well.

### Sharing custom arguments
Other than predefined data types, SafeArgs allows us to pass objects of our desired type. To demonstrate this, we're going to pass a person object using a custom Parcelable argument. 

This way we can share different data types under the hood of one type. Add the following plugin to add `Parcelize` to your project.

```bash
plugins {
    ...

    id 'kotlin-parcelize'
}
```

This plugin provides a Parcelable implementation generator that automatically generates parcels for classes annotated with `@Parcelize` annotation. Such classes must extend `Parcelable` which is an Android specific interface where we serialize objects ourselves.

Create a data class `Person` that implements the above information.

```Kotlin
import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class Person(
    val name: String,
    val age: Int
): Parcelable
```

An object of the class above will have two attributes, name and age.

#### Creating a custom object Argument
A parcelable argument is created the same way as predefined types only that we select the Parcelable class as its type.

![Add custom argument](/engineering-education/safe-args-in-android/add-custom-argument.png)

Alternatively, we can add the argument tag below.

```xml
<!--Inside fragmentB tag (you can opt to replace the previous one)-->
<argument
    android:name="person"
    app:argType="com.demo.safeargs.Person" />
```

#### Modify share action in FragmentA.kt
First, we need to instantiate the Person class then pass it in the action's parameter.

```Kotlin
binding?.btnShareData?.setOnClickListener {
    // create a person object
    val person = Person("Eric", 19)
    val action = FragmentADirections.actionFragmentAToFragmentB(person)
    findNavController().navigate(action)
}
```

### Receive the parcel in FragmentB.kt
Similar to what we did before, we'll receive and display the value of the argument in a textView.

```Kotlin
...
return binding.apply {

    val personParcel = args.person
    binding?.textView?.text = "My Name is: ${personParcel.name}\nI\'m ${personParcel.age} years old."

}?.root
```

### Conclusion 
In this tutorial, we've learned how SafeArgs can be used to pass or share data across destinations. Note that it is not recommended to pass large amounts of data since argument size is limited in Android. 

In such a case, I'd recommend you to use a [ViewModel](https://developer.android.com/reference/androidx/lifecycle/ViewModel) as discussed in [this blog](https://developer.android.com/topic/libraries/architecture/viewmodel#sharing). The source code for this project can be found [on my GitHub](https://github.com/Ericgacoki/safe-args).

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
