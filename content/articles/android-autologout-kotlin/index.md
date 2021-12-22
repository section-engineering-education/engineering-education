---
layout: engineering-education
status: publish
published: true
url: /android-autologout-kotlin/
title: Implementing an Auto Logout Feature for Android in Kotlin
description: We will look at the working theory, briefly touch on the GestureDetector and Handler classes, and create an auto-logout app using the two classes.
author: vincent-ngunzulu
date: 2021-12-20T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-autologout-kotlin/hero.jpg
    alt: Implementing an auto-logout feature for Android in Kotlin Hero Image
---
Handling sensitive data in an app may require some checks to see if the user is still active and decide whether or not to keep him/her logged in. We will use a straightforward approach: gesture detectors and the Handler class to set timeout intervals.
<!--more-->
The same logic is being used [here](/engineering-education/autologout-js/), but we will do that for Android. Let us head on straight to the concept.

### Prerequisites
To follow through, you'll need to have these:
- A basic understanding of Kotlin and programming in general (OOP).
- Android/IntellijIDEA (configured for Android development) installed and working in your machine.
- Knowledge of building Android applications.

### What we will be doing
We will be creating an app that displays a dialog asking the user if he/she is still active or not. The method for displaying the dialog will be fired after 15 seconds of inactivity. We check for the user's activeness by checking if he is tapping on the screen. 

We embed our gesture detector on the whole screen and not on individual subclassed views, enabling us to detect gestures that will be the final output.

### The theory of auto logging out in our app
For any gesture detected, the following actions are done:

We first count the number of clicks done at every gesture detected on the screen. For example, if a user scrolls, clicks increase by 1. If he scrolls again, the count is incremented again, making the number of clicks to 2. The same will be done for all other gestures.

Second, the user's active status will be set to true.

Then, we start tracking the user's active status. There is a catch here. To avoid the dialog being displayed many times, we will only call the handler to the dialog display method. We achieve that by calling this method when clicks are 1.

We earlier stated that we would display the dialog after 15 seconds. We split this into 10 seconds and 5 seconds. Once we start detecting inactivity after a user interacts with the app, wait for 10 seconds. After that, deliberately set the active status to false, wait again for 5 seconds, and recheck the active status.

If the user has not interacted with the screen, definitely the status will still be false. Now that it is false, we display the dialog. Otherwise, when he/she interacts with the screen, the active status will be true, so do not display the dialog. It is as simple as that.

Before we start creating the app, we will briefly look at the two 'tools' we will use:
- The `GestureDetector` class contains helper methods to detect gestures such as scrolling, flinging, swiping, etc.
- The `Handler` class enables us to act for a specific duration.

### The GestureDetector class
To detect all common gestures, we implement the `GestureDetector.OnGestureListener` interface. To detect a subset of gestures, we extend the `GestureDetector.SimpleOnGestureListener`. We will use the first option in our application. 

Let's look at this code snippet:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.GestureDetector
import android.view.MotionEvent
import androidx.core.view.GestureDetectorCompat


class MainActivity :
    AppCompatActivity(),
    GestureDetector.OnGestureListener {

    private lateinit var ourDetector: GestureDetectorCompat

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Instantiating the gesture detector
        /*We pass in the application context and an implementation of
         GestureDetector.OnGestureListener as the arguments*/
        ourDetector = GestureDetectorCompat(this, this)

    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        return if (ourDetector.onTouchEvent(event)) {
            true
        } else {
            super.onTouchEvent(event)
        }
    }

    override fun onDown(event: MotionEvent): Boolean {
        //do something
        return true
    }

    override fun onFling(
        event1: MotionEvent,
        event2: MotionEvent,
        velocityX: Float,
        velocityY: Float
    ): Boolean {
        //do something
        return true
    }

    override fun onLongPress(event: MotionEvent) {
        //do something
    }

    override fun onScroll(
        event1: MotionEvent,
        event2: MotionEvent,
        distanceX: Float,
        distanceY: Float
    ): Boolean {
        //do something
        return true
    }

    override fun onShowPress(event: MotionEvent) {
        //do something
    }

    override fun onSingleTapUp(event: MotionEvent): Boolean {
        //do something
        return true
    }
```

The first thing we note is that our Activity class extends the interface (`GestureDetector.OnGestureListener`). Since it is an interface, we have to use all its methods, as you can see. We override them to put in our custom code. In the `onCreate()` method, we instantiate the gesture detector and then pass it in the current application context and implementation of GestureDetector.OnGestureListener as the arguments.

In all the overridden methods, you will notice two similarities - they take in a MotionEvent object and return true. The MotionEvent is used to report movement events happening in the Activity. We return `true` to show that the detection of this event. For the `onFling()` and the `onScroll()` methods, we pass in extra parameters used to detect the position where the two gestures were performed. 

They may be necessary when creating products like games and others. We will not use them for our article. For more information on the GestureDetector class, follow this [link](https://developer.android.com/training/gestures/detector#kotlin) pointing to the official documentation.

### The Handler class
This class is used when we want to perform a particular action like calling a method, opening an activity, sending an SMS after a specific time has elapsed. 

Take this snippet as an example:

```kotlin
Handler(Looper.getMainLooper()).postDelayed({
    //the method(callback method) to be called
    displayDialog()
}, 5000)
```

In the `Handler` class' constructor, we pass in a `postDelayed()` method from Looper's `getMainLooper()` method. A Looper is used to run a message loop for a thread. The `getMainLooper()`, as the name suggests, gets the looper running in an application's main thread.

The `postDelayed()` method enables a [Runnable](https://developer.android.com/reference/java/lang/Runnable) to run after a specified amount of time. The Runnable, in this case, may be a method. Check this code.

```kotlin
public final boolean postDelayed (Runnable outRunnable,  Object ourObject, long delayTime)
```

It has three parameters:
1. The Runnable interface, which cannot be null.
2. An Object instance is used to cancel the runnable. It can be null.
3. A long type that stores the time, in milliseconds, to wait before calling the runnable.

Read more about the Handler class [here](https://developer.android.com/reference/android/os/Handler#createAsync(android.os.Looper,%20android.os.Handler.Callback)).

### Creating the app
Now that we have looked at the theory and what we will be using in our article, we will go ahead to create our application. Choose the *Empty Activity* option, set your preferred name (I called mine **AutoLogout**), choose the language as Kotlin, and then Finish.

#### Modifying the MainActivity.kt file
Copy and paste the following code to your *MainActivity.kt* file after your package name declaration.

```kotlin
import android.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.GestureDetector
import android.view.MotionEvent
import androidx.core.view.GestureDetectorCompat


class MainActivity :
    AppCompatActivity(),
    GestureDetector.OnGestureListener {

    private lateinit var ourDetector: GestureDetectorCompat
    private var timeset: Long = 10000
    private var noOfClicks: Int = 0
    private var isActive: Boolean = false


    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Instantiating the gesture detector
        /*We pass in the application context and an implementation of
         GestureDetector.OnGestureListener as the arguments*/
        ourDetector = GestureDetectorCompat(this, this)

    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        return if (ourDetector.onTouchEvent(event)) {
            true
        } else {
            super.onTouchEvent(event)
        }
    }

    override fun onDown(event: MotionEvent): Boolean {
        startDetection()
        return true
    }

    override fun onFling(
        event1: MotionEvent,
        event2: MotionEvent,
        velocityX: Float,
        velocityY: Float
    ): Boolean {
        startDetection()
        return true
    }

    override fun onLongPress(event: MotionEvent) {
        startDetection()
    }

    override fun onScroll(
        event1: MotionEvent,
        event2: MotionEvent,
        distanceX: Float,
        distanceY: Float
    ): Boolean {
        startDetection()
        return true
    }

    override fun onShowPress(event: MotionEvent) {
        startDetection()
    }

    override fun onSingleTapUp(event: MotionEvent): Boolean {
        startDetection()
        return true
    }

    //a method to start detection
    fun startDetection() {
        //set the user's active status to true then increase the number of clicks by 1
        isActive = true
        noOfClicks++

        //dont listen more than once
        //simply do nothing :)
        if (noOfClicks > 1) {

        } else if (noOfClicks == 1) {
            startListener()
        }
    }

    fun startListener() {
        //check the user's activeness after a specified time in milliseconds
        Handler(Looper.getMainLooper()).postDelayed({
            //displayDialog()
            checkActiveness()
        }, timeset)
    }

    fun checkActiveness() {
        /*set the active status to false deliberately
        and wait for 5 seconds to see if it will change to true
        */
        isActive = false
        Handler(Looper.getMainLooper()).postDelayed({

            displayDialog()
        }, 5000)
    }

    fun displayDialog() {
        //if the user is still inactive, show the dialog
        /*reset the number of clicks to zero to start
        the detection  incase the dialog is dismissed*/
        if (isActive == false) {
            noOfClicks = 0
            val displayDialog = AlertDialog.Builder(this)
            displayDialog.apply {
                setTitle("Autologout")
                setMessage("It seems you have you have been away for a while. Would you like us to sign you out?")
                setPositiveButton("Yes, Sign out") { _, _ ->

                }
                setNegativeButton("Keep me in") { _, _ ->

                }
            }.create().show()
        } else {
            /*if active, set the clicks to zero also
            to allow the detection to start as the user clicks/taps the screen
             */
            noOfClicks = 0
        }
    }
}
```

After importing the required packages, we then declare the variable to hold our detector object, instantiate the values to hold the number of clicks, delay time, and the user's active status. The overridden methods are implemented as we discussed beforehand, only that we pass in a `startDetection()` method to each of them. Let us see what the `startDetection()` method does.

```kotlin
    //a method to start detection
    fun startDetection() {
        //set the user's active status to true then increase the number of clicks by 1
        isActive = true
        noOfClicks++

        //dont listen more than once
        //simply do nothing :)
        if (noOfClicks > 1) {

        } else if (noOfClicks == 1) {
            startListener()
        }
    }
```

Here is where the inactivity detection starts. We begin by setting the user's active status to `true` and increasing the number of clicks by 1. A conditional check allows listening for clicks only once after the first one was passed.

Moving to the `startListener()` method.

```kotlin
    fun startListener() {
        //check the user's activeness after a specified time in milliseconds
        Handler(Looper.getMainLooper()).postDelayed({
            checkActiveness()
        }, timeset)
    }
```

We call the method to check for user's activeness after the time stored in the `timeset` variable(10 seconds) elapses. The method is called `checkActiveness()` discussed next.

```kotlin
    fun checkActiveness() {
        /*set the active status to false deliberately
        and wait for 5 seconds to see if it will change to true
        */
        isActive = false
        Handler(Looper.getMainLooper()).postDelayed({

            displayDialog()
        }, 5000)
    }
```

After the 10 seconds, set the active status to false deliberately and wait for 5 seconds to see if it will change to `true`. If it's still `false`, display the dialog as we will see in the final method, `displayDialog()`.

```kotlin
fun displayDialog() {
        //if the user is still inactive, show the dialog
        /*reset the number of clicks to zero to start
        the detection  incase the dialog is dismissed*/
        if (isActive == false) {
            noOfClicks = 0
            val displayDialog = AlertDialog.Builder(this)
            displayDialog.apply {
                setTitle("Autologout")
                setMessage("It seems you have you have been away for a while. Would you like us to sign you out?")
                setPositiveButton("Yes, Sign out") { _, _ ->

                }
                setNegativeButton("Keep me in") { _, _ ->

                }
            }.create().show()
        } else {
            /*if active, set the clicks to zero also
            to allow the detection to start as the user clicks/taps the screen
             */
            noOfClicks = 0
        }
    }
```

If the user is still inactive, show the dialog and reset the number of clicks to 0 to start the detection. If the user and gestures dismiss, the dialog is detected. If active, set the clicks to 0 again to allow the detection to start as the user clicks/taps the screen.

> View more about dialogs in [this](/engineering-education/getting-started-with-dialogs-in-android-kotlin/) EngEd article.

**Note that we have to do some touches on the screen for the methods to start firing.**

If you do not want to wait until someone touches the screen, you can call the `startDetection()` method in the Activity's `onCreate()` method as well after instantiating the gesture detector.

### Layout XML (activity_main.xml) file
This is the XML code. It contains a TextView displaying "*Hello there. You will be logged out after 15 seconds*".

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">
    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello there. You will be logged out after 15 seconds"
            android:id="@+id/sampleTxt"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent" android:paddingLeft="15dp" android:paddingRight="15dp"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

You can find the sample APK to this project [here](https://drive.google.com/file/d/1HzbdZfBlbM2cubW230K7zcFoh47HVgxD/view?usp=sharing). The whole project is open-sourced also. Make contributions to it via this [GitHub](https://github.com/vinstex/android-autologout) link.

Run the app, do some touches, scrolls, and wait 15 seconds to checkout the feature. Also, do the same before the seconds elapse and check. Change the numbers and check again.

### Further practice
Now, this was for one screen. What if you wanted to implement it on many screens? Would you rewrite the code in each Activity? Definitely, not. So get some coffee and write an inheritable(extendable) class you can call on any screen. 

You can also make the function open another activity instead of the dialog. You can implement a counter for the last 5 seconds and then later do a particular action like opening a Login screen.

### Conclusion
We looked at the working theory, briefly touched on the GestureDetector and Handler classes, and finally created an auto-logout app using the two classes. Hope you had a great read.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
