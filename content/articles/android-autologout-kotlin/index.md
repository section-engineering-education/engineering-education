Handling sensitive data in an app may require some checks to see if the user is still active and decide whether to keep him logged in or not. We will use a very simple approach to do that - using gesture detectors and the Handler class to set timeout intervals. The same logic is being used [here](https://www.section.io/engineering-education/autologout-js/), but we will do that for Android. Let's head on straight to the concept.

### Prerequisites
To follow through, you need to have these:

1. A basic understanding of Kotlin and programming in general(OOP).
2. Android/IntellijIDEA(configured for Android development) installed and working in your machine.
3. Knowledge of how Android works.

### What we will be doing

We will be creating an app that displays a dialog asking the user if he/she is still active or not. The method for displaying the dialog will be fired after 15 seconds of inactivity. We check for the user's activeness by checking if he is doing some tapping on the screen. We embed our gesture detector on the whole screen and not on individual subclassed views. This enables us to detect gestures done on the whole screen.

### The theory of auto logging out in our app

For any gesture detected, the following actions are done.

We first count the number of clicks. This will be done at every gesture detected on the screen. For example, if a user scrolls, the number of clicks is increased by 1. If he scrolls again, the count is incremented again making the number of clicks to 2. The same will be done for all other gestures.

Second, the user's active status will be set to `true`.

Lastly, we start tracking the user's active status. There is a catch here. To avoid the dialog being displayed many times, we will only call the handler to the dialog display method only once. We achieve that by calling this method when the number of clicks is 1.

We earlier stated that we will display the dialog after 15 seconds. We split this into 10 seconds and 5 seconds. That is, once we start detecting inactivity after a user interacts with the app, wait for 10 seconds. After that, deliberately set the active status to `false`, wait again for 5 seconds, and check the active status again. If the user has not interacted with the screen, definitely the status will still be `false`. Now that it is `false`, we display the dialog. Otherwise, when he/she interacts with the screen, the active status will be `true`, so don't display the dialog. It is as simple as that.

Before we start creating the app, we will first briefly look at the two 'tools' we will use:

1. **The GestureDetector class** - It contains helper methods for detecting gestures such as scrolling, flinging, swiping, etc.
2. **The Handler class** - It simply enables us to perform an action after a certain duration has elapsed.

### The GestureDetector class
To detect all common gestures, we implement the `GestureDetector.OnGestureListener` interface. To detect a subset of gestures, we extend the `GestureDetector.SimpleOnGestureListener`. We will use the first option in our application. Let's look at this snippet:

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
        return true
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
        return true
    }

    override fun onSingleTapUp(event: MotionEvent): Boolean {
        //do something
        return true
    }
```

The first thing we note is that our Activity class extends the interface(`GestureDetector.OnGestureListener`). And since it is an interface, we have to use all methods provided by it as you can see. We override them to put in our custom code. In the `onCreate()` method, we instantiate the gesture detector and then pass in the current application context and an implementation of GestureDetector.OnGestureListener as the arguments.

In all the overridden methods, you will notice two similarities - they take in a `MotionEvent` object and return `true`. The `MotionEvent` is used to report movement events happening in the Activity. We return `true` to show that the event has been detected. For the `onFling()` and the `onScroll()` methods, we pass in extra parameters that are used for detecting the position where the two gestures were performed. They may be important when creating products like games etc. We will not use them for our article.

For more information on the GestureDetector class, follow through this [link](https://developer.android.com/training/gestures/detector#kotlin) pointing to the official documentation.

### The Handler class
It is used when we want to perform a certain action like calling a method, opening an activity, sending an SMS, etc after a certain time has elapsed. Take this snippet as an example.

```kotlin
Handler(Looper.getMainLooper()).postDelayed({
    //the method(callback method) to be called
    displayDialog()
}, 5000)
```

In the `Handler` class' constructor, we pass in a `postDelayed()` method from the `Looper`'s `getMainLooper()` method. A Looper is used to run a message loop for a thread(according to the official documentation). The `getMainLooper()`, as the name suggests, gets the looper running in an application's main thread.

The `postDelayed()` method enables a [Runnable](https://developer.android.com/reference/java/lang/Runnable) to run after a specified amount of time. The `Runnable`, in this case, it may be a method. Check this code.

```kotlin
public final boolean postDelayed (Runnable outRunnable,  Object ourObject, long delayTime)
```

It has three parameters:

1. The Runnable interface, which cannot be null.
2. An Object instance that is used to cancel the runnable. It can be null.
3. A long type that stores the time, in milliseconds, to wait before calling the runnable.

Read more about the Handler class [here](https://developer.android.com/reference/android/os/Handler#createAsync(android.os.Looper,%20android.os.Handler.Callback)).

### Creating the app

Now that we have looked at the theory and what we will be using in our article, we will then go ahead to create our application.
Choose the *Empty Activity* option, set your preferred name(I called mine **AutoLogout**), choose the language as Kotlin, and then Finish.

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
        return true
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
        return true
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

After importing the required packages, we then declare the variable to hold our detector object, instantiate the values to hold the number of clicks, delay time, and the user's active status. The overridden methods are implemented as we discussed beforehand only that we pass in a `startDetection()` method to each of them. Let's see what the `startDetection()` method does.

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

Here is where the inactivity detection starts. We begin by setting the user's active status to `true` and increasing the number of clicks by 1. A conditional check is done to allow listening for clicks only once after the first one was passed in.

Moving to the `startListener()` method.

```kotlin
    fun startListener() {
        //check the user's activeness after a specified time in milliseconds
        Handler(Looper.getMainLooper()).postDelayed({
            checkActiveness()
        }, timeset)
    }
```

We call the method for checking for the user's activeness after the time stored in the `timeset` variable(10 seconds) elapses. The method is called `checkActiveness()` discussed next.

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

If the user is still inactive, show the dialog, reset the number of clicks to 0 to start the detection in case the dialog is dismissed by the user and gestures are detected. If active, set the clicks to 0 again to allow the detection to start as the user clicks/taps the screen.

> View more about dialogs in [this](https://www.section.io/engineering-education/getting-started-with-dialogs-in-android-kotlin/) EngEd article.

That's it in a few paragraphs. Note that we have to do some touches on the screen for the methods to start firing. If you don't want to necessarily wait until someone touches the screen, you can call the `startDetection()` method in the Activity's `onCreate()` method too after instantiating the gesture detector.

### Layout XML(activity_main.xml) file

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

Run the app and do some touches, scrolls, and wait for 15 seconds to check the feature. Also, do the same before the seconds elapse and check. Change the numbers and check too.

### Further practice
Now, this was for one screen. What if you wanted to implement it on many screens? Would you rewrite the code in each Activity? Definitely, no. So get some coffee and write an inheritable(extendable) class which you can call on any screen. You can also make the function open another activity instead of the dialog. Also, you can implement a counter for the last 5 seconds and then later do a certain action like opening a Login screen.

### Conclusion
We looked at the theory of the working, briefly touched on the `GestureDetector` and `Handler` classes, and finally created an auto-logout app using the two classes. Hope you had a great read.

Happy coding!
