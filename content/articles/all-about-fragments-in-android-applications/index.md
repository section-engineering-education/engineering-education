---
layout: engineering-education
status: publish
published: true
url: /all-about-fragments-in-android-applications/
title: Introduction to Fragments in Android Applications
description: In this tutorial we will learn how to add fragments and navigate across different screens in an Android application to enrich your UI design.
author: michael-barasa
date: 2021-01-05T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/all-about-fragments-in-android-applications/hero.png
    alt: Fragments in Android Applications image
---
According to the Android [documentation](https://developer.android.com/guide/fragments), a fragment is a part of applications user interface that is bound to an activity. Fragments have their lifecycle and layouts or UI components. Fragments help enrich your UI design, pass data between different screens, and adapt to different device configurations. 
<!--more-->
Unlike activities, fragments are usable. This means that they can be used to showcase different messages or functions to the user. These functionalities or features allow you to develop more interactive applications.

### What are fragments?
Before going any further, it's essential to understand what fragments are or mean. As we stated above, a fragment is a part of application's user interface that is bound to an activity. Fragments also have their logic and can thus, accept and handle different events. Fragments are beneficial since they allow code to be divided into smaller and more manageable chunks. 

This simplifies the debugging process.

### Fragment lifecycle
Just like activities, fragments also have a lifecycle. This component tracks the fragments in all aspects of their lifecycle. This includes when they are `initialized`, `started`, `created`, `resumed`, and `destroyed`. A `LifecycleObserver` allows the developer to detect when a specific fragment is active. As a result, certain actions can be executed. For instance, an app can display a `Snackbar` or `Toast` message.

Alternatively, callback methods can also help in the management of the fragment's lifecycle. These functions include `onCreate`, `onStart`, `onResume`, `onPause`, `onStop`, and `onDestroy`. The callback methods are called depending on the fragment's state.

Such as listed below:
`onCreate` - This method is called to initialize or add the fragment to the host activity. The layout is also inflated in this stage. All elements initialized in this method are usually preserved whenever the fragment is paused.
`onStart` - In this step, the fragment is visible or active. Users can interact with different UI components.
`onPause` -  The activity is paused, which causes the fragment to bear a similar state. The `onPause` is called when a fragment is replaced or when the user chooses to navigate backward.
`onResume` - In this phase, the fragment is reactivated.
`onStop` - The fragment is stopped and the UI hidden from the user.
`onDetach` and `onDestroy` - All of the fragment's instances and processes are destroyed.

The image below shows how the fragment lifecycle methods are classified.

![fragment lifecycle](/engineering-education/all-about-fragments-in-android-applications/fragment-view-lifecycle.png)

*[Image Source](https://developer.android.com/images/guide/fragments/fragment-view-lifecycle.png)*

### Fragment and activity context
`Context` is an important aspect of Android development. It allows you to start different activities, processes, and even displays certain messages to the user.
 
The activity context is returned by using the `getActivity` method. Note that this method is only applicable when the fragment is active. Using the `getActivity` function when the fragment is paused returns a null value.

### Implementing back stack in fragments
`Back stack` allows users to navigate back to the previous activity or fragment. In Activities, back stack is implemented automatically. In fragments, back stack needs to be declared manually using the `addToBackStack` method. 

It should also be stated before the fragment transaction is committed, as shown below. The `addToBackStack` function requires an optional string value as a parameter.

```Kotlin
fragmentTransaction.add(R.id.question_fragment, fragment);
fragmentTransation.addToBackStack(null);
fragmentTransaction.committ();
```

### Fragment communication
The general rule is that fragments should not communicate with other fragments directly. This ensures that the fragments remain self-contained. 

However, one-time values can be shared using the `FragmentResult` API. A result listener should be set on the fragment that is passing the data. 

This is executed using the statement below.

```kotlin
    setFragmentResultListener("key") { key, bundle ->
        // any value can be passed as a parameter
        val result = bundle.getString("bundle_Key")
        // the value is retrieved from the Bundle.
    }
```

The code below is used to retrieve the values in the second fragment.

```kotlin
    setFragmentResult("requestKey", bundleOf("bundle_Key" to result));
```

You can learn more about communication with fragments from [here](https://developer.android.com/guide/fragments/communicate).

### Prerequisites
This tutorial is suitable for beginners. You must have the following.
1.  Android Studio installed.
2.  Some basic knowledge in Kotlin.

### Goal
To create a simple mobile app that demonstrates how fragments are used in Android.

### 1. Creating the project
Create a new empty activity project in Android studio and name it as `NavExample.` Ensure that you select `Kotlin` as your preferred programming language.

![launch project](/engineering-education/all-about-fragments-in-android-applications/launch-project.png)

### 2. Create a navigation graph
A navigation graph outlines all the actions, destinations, and logical connections in an application. It helps you determine how the user will navigate through the application.

Go to res folder and create a new Android resource file. Name it `navigation.xml.`

![navigation graph](/engineering-education/all-about-fragments-in-android-applications/navigation-graph.png)

After you have created the navigation file, a new dialog will appear prompting you to install several dependencies. 

Press *Ok*.

### 3. NavHost fragment
The `NavHost` fragment acts as a container or host for all the fragments. In other words, any fragment that is displayed to the user is hosted in this `NavHost` container. The `NavHost` fragment is usually created in the primary activity (where the fragments need to be displayed). In our case, the primary activity layout is the `activity_main.xml.`

Therefore, navigate to the `res/layout` folder and open the `activity_main.xml.` Delete the `TextView` and replace it with the `NavHost` Fragment component, as shown below.

```Xml
<fragment
    android:id="@+id/navhostfragment"
    android:name="androidx.navigation.fragment.NavHostFragment"
    android:layout_width="match_parent"
    app:navGraph="@navigation/navigation"
    app:defaultNavHost="true"
    android:layout_height="match_parent"/>
```

Setting `app:defaultNavHost="true"` allows the `Navhost` fragment to handle system back keys.

### 4. Creating the fragments
The app will have three fragments. The first fragment will display a question and some buttons to the user. When individuals click on the yes or no buttons, they are redirected to the correct or wrong fragments depending on their answer.

Here is the code for the `fragment_question.xml`.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".QuestionFragment">

   <LinearLayout
       android:layout_width="match_parent"
       android:orientation="vertical"
       android:layout_gravity="center_vertical"
       android:layout_height="wrap_content">
       <TextView
           android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:textSize="24sp"
           android:textColor="#000"
           android:layout_marginTop="60dp"
           android:layout_gravity="center_horizontal"
           android:text="Is the moon a planet?"/>

       <LinearLayout
           android:layout_width="wrap_content"
           android:layout_marginTop="60dp"
           android:layout_gravity="center"
           android:layout_height="wrap_content">

           <Button
               android:id="@+id/yesbutton"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:backgroundTint="#4CAF50"
               android:layout_marginEnd="30dp"
               android:text="Yes"/>

           <Button
               android:id="@+id/nobutton"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:backgroundTint="#FF5722"
               android:layout_marginStart="30dp"
               android:text="No"/>

       </LinearLayout>

   </LinearLayout>

</FrameLayout>
```

The `fragment_correct.xml` code is shown below.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".CorrectFragment">

    <LinearLayout
        android:layout_width="match_parent"
        android:orientation="vertical"
        android:layout_gravity="center"
        android:background="@color/colorAccent"
        android:layout_height="wrap_content">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textAlignment="center"
            android:textColor="#000"
            android:layout_margin="20dp"
            android:layout_gravity="center_horizontal"
            android:text="Congratulations.\n\n That is the corect answer!"
            android:textSize="24sp"/>

        <Button
            android:id="@+id/tryagain"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="30dp"
            android:layout_gravity="center_horizontal"
            android:backgroundTint="@color/colorAccent"
            android:text="Another round"
            />

    </LinearLayout>
</FrameLayout>
```

Finally, the `fragment_wrong.xml` code is listed below.

```Xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".WrongFragment">

    <LinearLayout
        android:layout_width="match_parent"
        android:orientation="vertical"
        android:layout_gravity="center"
        android:background="#F44336"
        android:layout_height="wrap_content">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textAlignment="center"
            android:textColor="#000"
            android:layout_margin="20dp"
            android:layout_gravity="center_horizontal"
            android:text="Fail.\n\n That is an incorrect answer!"
            android:textSize="24sp"/>

        <Button
            android:id="@+id/tryagain"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="30dp"
            android:layout_gravity="center_horizontal"
            android:backgroundTint="@color/colorAccent"
            android:text="Try Again"
            />

    </LinearLayout>

</FrameLayout>
```

### 5. Linking components in the navigation graph
In this step, we need to determine how users will navigate through the application. The default fragment will be the `QuestionFragment.` Therefore, open the `navigation.xml` file. Go to the `new destination` icon and add the `questionFragment` as the starting point. 

You can then add the `correctFragment` and `wrongFragment`. Link the `questionFragment` to the correct fragment using the provided arrow.

Similarly, draw an arrow from the `correctFragment` and `wrongFragment` to the `questionFragment`. This basically means that we can navigate to and from the `main` fragment. Your final navigation graph should look, as shown below.

![final nav graph](/engineering-education/all-about-fragments-in-android-applications/final-graph.png)

### 6. Handling events
In this tutorial, we will mainly be handling click events. When a user presses a button, they need to be redirected to a certain destination or fragment. 

Let's jump in.

Open the `QuestionFragment.kt` file and modify the `onCreateView` function.

```Kotlin
return inflater.inflate(R.layout._fragment_question_, container, false)
```

To:

```Kotlin
val root = inflater.inflate(R.layout._fragment_question_, container, false)
```

The modification above allows us to access the views we declared in the `fragment_question.xml` file. We are focusing on the `two` buttons since they will help navigate to the other fragments. 

We handle their `onClick` events, as shown below. The `navigation controller` allows us to access all the fragments and relationships defined in the `navigation.xml` file.

```Kotlin
root.yesbutton.setOnClickListener {view:View->
    Navigation.findNavController(view).navigate(R.id.action_questionFragment_to_correctFragment)
       //the user will navigate to the correctFragment when the yes button is clicked

}

root.nobutton.setOnClickListener {view:View->
    Navigation.findNavController(view).navigate(R.id.action_questionFragment_to_wrongFragment)
     //the user will navigate to the wrongFragment when the no button is clicked
}
```

Users will navigate across different fragments depending on the guidelines in the navigation graph.

Here is the code for the other fragments:

**QuestionFragment:**
```Kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import kotlinx.android.synthetic.main.fragment_question.view.*

class QuestionFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView( //the fragment is initialized and bound to the nav host activity.
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
       val root = inflater.inflate(R.layout.fragment_question, container, false)

        root.yesbutton.setOnClickListener {view:View->
            Navigation.findNavController(view).navigate(R.id.action_questionFragment_to_correctFragment)
        }

        root.nobutton.setOnClickListener {view:View->
            Navigation.findNavController(view).navigate(R.id.action_questionFragment_to_wrongFragment)
        }
        return root //return the main UI
    }

}
```

**WrongFragment:**
```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import kotlinx.android.synthetic.main.fragment_correct.view.*
class WrongFragment : Fragment() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
       val root = inflater.inflate(R.layout.fragment_wrong, container, false)
      // we access the widget's id using the application's root.
        root.tryagain.setOnClickListener {view:View->
            Navigation.findNavController(view).navigate(R.id.action_wrongFragment_to_questionFragment2)
            //we use the findNavController to navigate across different fragments
        }

        return root; //return main ui
    }
}
```

**CorrectFargment:**
This fragment only shows when a user answers the question correctly. It also offers the user an opportunity to navigate to the previous fragment.

```Kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import kotlinx.android.synthetic.main.fragment_question.view.*

class QuestionFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
       val root = inflater.inflate(R.layout.fragment_question, container, false)

        root.yesbutton.setOnClickListener {view:View-> //setting on click listener on yesbutton
            Navigation.findNavController(view).navigate(R.id.action_questionFragment_to_correctFragment)

        }

        root.nobutton.setOnClickListener {view:View-> //setting on click listener on nobutton
            Navigation.findNavController(view).navigate(R.id.action_questionFragment_to_wrongFragment)
        }   
        return root // return the entire fragment
    }
}
```

### 7. Results
The final application should look, as shown below.

<iframe width="478" height="269" src="https://www.youtube.com/embed/SEDgdO_irHg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion
In this tutorial, we have learned how to add fragments and navigate across different screens. You are, therefore, ready to work on other productive applications. 

You can download the full project from [here](https://github.com/WanjaMIKE/NavExample).

### References
- [Fragments](https://developer.android.com/guide/fragments/lifecycle)

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)