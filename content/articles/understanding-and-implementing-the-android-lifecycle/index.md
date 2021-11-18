---
layout: engineering-education
status: publish
published: true
url: /understanding-and-implementing-the-android-lifecycle/
title: How to Implement the Android LifeCycle Callback Methods
description: This tutorial provides a step-by-step guide on how to implement the Android lifecycle callback methods.
author: antony-gitau
date: 2021-10-26T00:00:00-05:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-and-implementing-the-android-lifecycle/hero.png
    alt: Android LifeCycle Callback Methods Hero Image
---
The Android lifecycle helps developers understand which states activities go through when a user navigates through an app. As a result, we can do proper operations at the right time and avoid crashes and other bugs.
<!--more-->
An Android application has a lifecycle. It crosses through various stages from when a user opens and exits an application.

An application's state helps you manage when a user opens an activity, pauses, resumes, stops, and destroys it.

Callback methods manage these states. You can override these methods to do a particular operation to give the right output to users.

Let's say your application is running in the background, and you wish to save some data. In this case, you have to know about the activity lifecycle. This allows you to implement the right callback to handle the situation.

### Goal
In this tutorial, we will explain different Android application lifecycle callback states. We will discuss all the states that apply in an android activity lifecycle.

We will develop an Android app that showcases where various activity lifecycle callbacks take place. This application will be life-cycle aware to understand which callback is being executed.

### Prerequisites
To follow along, you should have:
- Android Studio installed.
- A good understanding of Android application development.
- Prior knowledge on how to run and use Android Studio Logcat.

### Different activity life-cycle callbacks
Let's now dive in and discuss different Android application life-cycles and see how we can implement them.

First, ensure that Android Studio is running on your computer.

Then create a new project using the `empty activity` template. In this tutorial, we will use Java to build an Android application. Therefore, ensure that you select Java as your preferred programming language.

![Android application language](/engineering-education/understanding-and-implementing-the-android-lifecycle/android-application-language.png)

An Android activity goes through six major lifecycle stages or callbacks. These are: `onCreate()`, `onStart()`, `onResume()`, `onPause()`, `onStop()`, and `onDestroy()`. The system invokes each of these callbacks as an activity enters a new state.

Note that it's not necessary to implement all these lifecycle callbacks in your Android application. As a developer, you should know when to implement each of these callbacks depending on the activity's complexity.

Here is a simplified diagram that illustrates how users interact with an activity lifecycle.

![Activity lifecycle](/engineering-education/understanding-and-implementing-the-android-lifecycle/activity-lifecycle.png)

[Image Source](https://developer.android.com/guide/components/activities/activity-lifecycle)

Let's discuss this activity's lifecycle and implement them in an actual Android application.

### onCreate()
The `onCreate()` callback is compulsory in all Android applications. It is the first method called when we launch an activity from the home screen or intent. In other words, it is a default callback that is automatically created when you create a new activity.

It's the only method that developers need to implement activity logic that should only happen once, such as initializing a `ViewModel`.

Android Studio automatically creates a class named the `MainActivity.java` file. This class contains an `onCreate()` callback. It is called when a user first opens the application.

When an application is installed on a device, it is in a `doesn't exist state`. This means the activity is dead.

Once a user opens the application, the lifecycle begins. The activity is brought to the foreground. In this case, `onCreate()` is immediately called to fire up the application. It may contain components such as the activity UI.

Here is a sample code that shows how an `onCreate()` method is implemented. I have added a `Log` and a `Toast` that we will use to read the activity's states later in this guide.

In your `MainActivity.java`, make sure your `onCreate()` method has the lines below to print a `Toast` and `Log` message.

```java
private static final String TAG = "MainActivity";

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Toast.makeText(this, "onCreate MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onCreate MainActivity");
}
```

In this step, your activity is not yet visible. It remains in this state until the `onCreate()` function finishes, then it quickly moves to the next state.

### onStart()
When an application is started, the system will invoke an `onStart()` method. This callback is invoked to make the activity visible to the user.

Here is how `onStart()` is implemented.

```java
@Override
protected void onStart() {

    Toast.makeText(this, "onStart MainActivity", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onStart MainActivity");

    super.onStart();
}
```

`onStart()` can be called several times during an application's lifecycle. For example, this method can be called when a user opens another activity and then navigates back to the previous activity.

During the activity's lifecycle, the `onStop()` function is called. This means that some resources are released. The `onStart()` method can be invoked to initialize such resources.

### onResume()
Once `onStart()` is called, `onResume()` is immediately invoked. Every component associated with this activity is brought to the foreground state. The activity is now considered interactive.

```java
@Override
protected void onResume() {

    Toast.makeText(this, "onResume MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onResume MainActivity");
    super.onResume();

}
```

At this point, the activity remains in the foreground state unless something happens to the application. This may include overly (multi-window mode application) interaction from other applications such as a phone call or when a user navigates to another activity.

### onPause()
`onPause()` is called when the user switches to another activity or a multi-window mode application. At this point, the activity has lost focus and is running in the background.

This callback will pause the activity and release some resources that this activity was consuming. All un-required operations are paused.

```java
@Override
protected void onPause() {

    Toast.makeText(this, "onPause MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onPause MainActivity");

    super.onPause();
}
```

When `onPause()` is called, you might release some resources from memory. However, make sure that you initialize them again during the `onResume()` callback.

`onPause()` is a brief callback that allows transition to other activities. So, intensive computations should not be executed during this stage. This may delay the application from transitioning to other activities thus leading to a poor user experience.

### onStop()
At this point, most of the activity processes have been stopped. However, the activity is still running in the background.

This life-cycle usually occurs after the `onPause()` method is executed due to the user switching to other activities or pressing the home button.

In such situations, it is used to release heavy resources and stop intensive operations that are not required while the activity is invisible.

Since `onPause()` is brief, `onStop()` can be used to save data to other channels such as databases.

```java
@Override
protected void onStop() {

    Toast.makeText(this, "onStop MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onStop MainActivity");

    super.onStop();
}
```

Note: At this time, this activity is not destroyed yet. The activity instances are saved in a back stack. This means all stated are still active, including the views.

When a user opens it again, the application will not reload all instances. Instead, it will retrieve them from memory. This includes UI components such as the `TextViews`.

### onRestart()
Since the activity's states still exist, the `onRestart()` method can be called when the user restarts the activity. This means the activity will go back to the main screen and the user can resume interacting with its components.

As discussed, the `onCreate()` function is only called once in an activity's life-cycle. So, when the `onRestart()` method is executed, the activity will resume by executing the `onStart()` then `onResume()`.

```java
@Override
protected void onRestart() {

    Toast.makeText(this, "onRestart MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onRestart MainActivity");

    super.onRestart();
}
```

### onDestroy()
This is the final callback that the activity will receive when it is stopped.

The method is called when there is a change in the configuration states such as screen rotation or language settings. The Android system will destroy the activity, then recreate it with the set configurations.

```java
@Override
protected void onDestroy() {

    Toast.makeText(this, "onDestroy MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onDestroy MainActivity");

    super.onDestroy();
}
```

### Testing the activity's lifecycle
We will execute this application and read our Logcat messages to see how these different methods are executed. At this point, your `MainActivity.java` should have the following code:

![MainActivity code](/engineering-education/understanding-and-implementing-the-android-lifecycle/code.png)

To test the app, we will add another activity so that we can read these methods as they change from point A to B.

In Android Studio, create another `empty` activity and call it `Activity2.java` We will add the same code as in the `MainActivity.java` file. However, we will change the `Toast` and `Log` messages, as shown below:

```java
public class Activity2 extends AppCompatActivity {

    private static final String TAG = "Activity2";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_2);
        Toast.makeText(this, "onCreate Activity2", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onCreate Activity2");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Toast.makeText(this, "onStart Activity2", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onStart Activity2");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Toast.makeText(this, "onRestart Activity2", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onRestart Activity2");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Toast.makeText(this, "onResume Activity2", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onResume Activity2");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Toast.makeText(this, "onPause Activity2", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onPause Activity2");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Toast.makeText(this, "onStop Activity2", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onStop Activity2");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Toast.makeText(this, "onDestroy Activity2", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onDestroy Activity2");
    }
}
```

In your MainActivity, add the following method to help us navigate between the activities:

```java
public void gotoActivity2(View view) {
    Intent intent = new Intent(this, Activity2.class);
    startActivity(intent);

}
```

The intent above will assist us in executing and navigating to Activity2. To execute this method, we will add a button in the `activity_main.xml`, as highlighted below:

```xml
<TextView
    android:id="@+id/text"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Watch the Log in Android Studio when you run the application"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintVertical_bias="0.056" />

<Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="52dp"
    android:layout_marginEnd="50dp"
    android:layout_marginStart="50dp"
    android:layout_weight="50"
    android:onClick="gotoActivity2"
    android:text="go to Activity2"
    app:layout_constraintTop_toBottomOf="@+id/text"
    tools:layout_editor_absoluteX="15dp" />
```

This is how the application should look like on your Android device:

![MainActivity screen)](/engineering-education/understanding-and-implementing-the-android-lifecycle/mainactivity-screen.png)

Before running this application, make sure you open the Logcat window in Android Studio:

![Logcat](/engineering-education/understanding-and-implementing-the-android-lifecycle/logcat.png)

Immediately after the app is launched, the following methods are executed sequentially:

![First methods](/engineering-education/understanding-and-implementing-the-android-lifecycle/first-methods.png)

The app begins by executing the `onCreate()` function. At this stage, the application's components are not yet visible.

The `onStart()` method is then called, followed by `onResume()`. In this lifecycle, the user can interact with the UI components.

Let's now navigate to `activity2` by clicking the `go-to Activity2` Button.

At this moment, `Activity2` is blocking the `MainActivity`. This means that the `MainActivity` will be paused using the `onPause()` callback. This is highlighted below:

![OnPause main activity](/engineering-education/understanding-and-implementing-the-android-lifecycle/onpause-main-activity.png)

It shows that when the user switched to `Activity2`, `MainActivity` was paused. At this point, `MainActivity` will be saved in a back stack.

When `Activity2` is brought to the foreground, `onStop()` will also be called on `Mainctivity`. This is because the Android system is releasing any resources that `MainActivity` is not using.

![Switching activities logs](/engineering-education/understanding-and-implementing-the-android-lifecycle/switching-activities-logs.png)

Note that MainActivity is not destroyed. This means that its states are saved in the memory, and we can retrieve them. To do so, navigate back to the previous activity and watch the Logcat messages.

![OnRestart main activity](/engineering-education/understanding-and-implementing-the-android-lifecycle/onrestart-main-activity.png)

As you can see, three methods are executed here: `onRestart()`, `onStart()`, and `onResume()`.

When you `back press`, it means you are exiting the activity, and the callbacks will execute as shown below:

![OnDestroy main activity](/engineering-education/understanding-and-implementing-the-android-lifecycle/ondestroy-main-activity.png)

As you can see, when exiting the application, `onDestroy()` is not called first. The activity still follows its lifecycle.

### Conclusion
As a developer, you should wisely choose what to execute when a certain method or callback is executed. You might not end up using all these callbacks in one application.

This tutorial has helped you learn the different lifecycle stages in an Android application.

I hope you find this tutorial helpful.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
