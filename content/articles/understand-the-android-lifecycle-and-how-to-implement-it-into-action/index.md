Application life-cycles are different states an activity goes through in the Android application. Android life-cycle helps developers understand which states activities go through when a user navigates through our app. As a result, we can do proper operations at the right time and avoid crashes and other bugs. Android application has their own life-cycle. It crosses through various stages from when a user opens and exits an application. The state of an application helps you manage when a user opens an application activity, pauses, resumes, stops, and destroys an activity.

Callback methods manage these states, and you can override those methods to do a particular operation to give the right output to your users.

Let's say your application is going in the background, and you want to save some data such as filled form data. In this case, you have to know about the activity life-cycle and the flow of how exactly the activity life cycle works to implement the right callback to handle that situation.

In this tutorial, we will explain different android application life-cycle callbacks states. We will discuss all the states that apply in an android activity life-cycle. We will develop an android app that showcases when various activity life-cycle callbacks take place. The application will be life-cycle aware to understand which callback is being executed in different application states.

### Prerequisites
- Have android studio installed and configured to run the android application.
- A good understanding of how to build an android application using android studio.
- Prior knowledge on how to run and use android studio Logcat

### Different android application activity life-cycle callbacks
Let's now dive in and discuss different android application life-cycles and see how we can implement them. First, ensure your android studio is running on your computer. Then create a new project using the android provided empty activity. This tutorial will use java to build an android application. To ensure while creating your project, you select java as the application language.

![android-application-language](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/android-application-language.png)

When navigating this callback, and activity life-cycle undergo at least six callback that truck dow the activity life-cycle, from when an activity is launched to when a use exit the activity. This callbacks include `onCreate()`, `onStart()`, `onResume()`, `onPause()`, `onStop()`, and `onDestroy()`. The system invokes each of these callbacks as an activity enters a new state.

When implementing an android application, it's certainly not necessary to implement all these cycles. As a developer, you need to understand your application and know when to implement each of these callbacks depending on the activity complexity. Here is a simplified diagram that illustrates how users interact with an activity life-cycle.

![activity-lifecycle](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/activity-lifecycle.png)

[Image Source](https://developer.android.com/guide/components/activities/activity-lifecycle)
Let's discuss this activity life-cycle and see how we can implement them with an actual android application.

### onCreate()
Even though a developer chooses which callback to implement in a certain activity, `onCreate()` is one that you can't leave behind. It is a must you include it in every activity that you want your application to fire up. So why must you use `onCreate()`?

- It's the first method called when we launch an activity from the home screen or intent. It is a default callback, automatically created when you create a new activity.
- It's the only method that is required for the developer to implement activity logic that should only happen once, such as initializing a ViewModel.

When creating this application, android studio automatically creates a class named the `MainActivity.java` file. It contains an `onCreate()` callback. It is called when a user first opens the application.

When an application is installed on a device, it is in a `doesn't exit state`. This means the activity is dead and is referred to as does not exist. Once a user opens the application, the life-cycle begins, and the activity is brought in the foreground. In this case, `onCreate()` is immediately called to fire up the application. It may contain components such as the XML files, i.e., the activity UI.

Here is a sample code that shows how an `onCreate()` method is implemented. I have added a log and a toast that we will use to read the activity states later in this guide.

On your `MainActivity.java`, make sure your `onCreate()`  has the lines below to print a toast and a log message.

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

At this step, your activity is not yet visible and remains at this state until the `onCreate()` function finishes, then it quickly moves to the next state.

### onStart()

When an application is started, the system will invoke an `onStart()` method. At this point, this method is called very first to make the activity visible to the user.

Here is how `onStart()` is implimeted.

```java
@Override
protected void onStart() {

    Toast.makeText(this, "onStart MainActivity", Toast.LENGTH_SHORT).show();
        Log.d(TAG, "onStart MainActivity");
        
    super.onStart();
}
```

`onStart()` can be called several times during the application life-cycle. This method can be called when for example, a user opens another activity and then back presses to the previous activity.

During the activity life-cycle `onStop()` function is called. This means some resources are released. `onStart()` can be called to initialize such resources.

### onResume()
Once `onStart()` is called `onResume()` is immediately called. Evey component associated with this activity is bough to the foreground state, and the activity is now considered interactive.

```java
@Override
protected void onResume() {

    Toast.makeText(this, "onResume MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onResume MainActivity");

    super.onResume();
}
```

At this point, the activity remains in the foreground state unless something happens to the application, such as overly (multi-window mode application) interaction from other applications such as a phone call on when a user navigates to another activity.

### onPause()
Immediately the user switch to another activity or a multi-window mode application, the `onPause()` is called. At this point, the activity has lost focus and is running in the background.

This will pause the activity and then release some resources that this activity is consuming, and you don't need them at the moment. This includes animation transitions. Operations that are not required are all paused.

```java
@Override
protected void onPause() {

    Toast.makeText(this, "onPause MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onPause MainActivity");

    super.onPause();
}
```

When `onPause()` is called, you might release some resources from memory. Make sure you initialize them again during the `onResume()`. `onPause()` is a very brief callback that allows transition to other activities. So any heavy execution should not be executed during this method as this will delay the application transition to other activities leading to a bad user experience.

### onStop()
At this point, most of the activity processes have been stopped, but the activity is not dead yet. It is running in the background, and the activity is not visible.

This cycle usually occurs after the `onPause()` is executed due to the user switching to other activities or press the home button. In such situations, it is used to release heavy resources and perform massive shutdown operations not needed while the activity is not visible. Since `onPause()` is brief, `onStop()` can be used to save data to other channels such as databases.

```java
@Override
protected void onStop() {

    Toast.makeText(this, "onStop MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onStop MainActivity");

    super.onStop();
}
```

Note: At this time, this activity is not destroyed yet. The activity instances are saved in a backstack. This means all stated are still active, including the views. This way, when a user opens it again, the application will not load all instances again. Instead, it will get them from memory. This includes android application views such as the edit text view.

### onRestart()
Since the activity states still exit, `onRestart()` can be called when the user restarts that activity. This means the activity will go back to the main screen and the user can resume interacting with its components again.

Like we said earlier, the `onCreate()` is only called once during a complete activity life-cycle. So when the `onRestart()` is executed the activity will resume by executing the `onStart()` then `onResume()` and the cycle continues.

```java
@Override
protected void onRestart() {

    Toast.makeText(this, "onRestart MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onRestart MainActivity");

    super.onRestart();
}
```

### onDestroy()
This is the final call back that the activity will receive immediately after the activity becomes non-existence. The method will be called in case of situations such as a change in the configuration states such as screen rotation or language settings. This will result in the android system temporarily destroy that activity. Then recreate it with the set configurations.

```java
@Override
protected void onDestroy() {

    Toast.makeText(this, "onDestroy MainActivity", Toast.LENGTH_SHORT).show();
    Log.d(TAG, "onDestroy MainActivity");

    super.onDestroy();
}
```

At this time, the activity will shut down. And when the activity is opened again, the same life-cycle process will be repeated.

### Testing the application activity life-cycle
To demonstrate this, we will execute this application and read our Logcat to see how these different methods are executed. At this point, your `MainActivity.java` should resemble this image.

![MainActivity code](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/code.png)

To test this, we will add another activity so that we can be able to read these methods as they change from point A to B.
On you, android studio, create a new empty activity and call it `Activity2.java` We will add the same code as we added in the MainActivity. However, we change the Toat and Log messages as shown below.

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

On your MainActivity, we will have a method that will help us switch to Activity2. So add the following code in your MainActivity class.

```java
public void gotoActivity2(View view) {
    Intent intent = new Intent(this, Activity2.class);
    startActivity(intent);

}
```

The above intent will assist us in executing and navigate to Activity2. To execute this method, we will add a button. On your `activity_main.xml` file, add this button and s simple text view.

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

This is how the application should look like once run on an android device.

![mainactivity-screen)](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/mainactivity-screen.png)

Now we can run this application and start testing our implementation.

So make sure you have an emulator ready or an android device connected to your laptop to run this application. Before running this application, make sure you open your android Logcat, Switch to the device running the application, and select Debug mode.

![logcat](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/logcat.png)

Once the application run, watch your Logcat messages. Let's now try to understand how the methods are called in the life-cycle of an activity.

Immediately after the run, the following methods are executed in the following sequence, as shown in the Logcat messages.

![first-methods](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/first-methods.png)

When the app opens, it starts by executing the `onCreate()`. Bu note, the application components are not yet visible. Immediately `onStart()` is called the screen components get visible the `onResume()`  is called, and a user can start interacting with these components.

This indicates that once the application is opened, the MainActivity will be executed. Thus `onCreate()` is first called to initialize this activity. Immediately `onStart()`  and `onResume()` methods are called, the application is then brought to the foreground.

To understand this point deeper, watch this slow GIF and note how the toast messages change when a callback is executed.

![callback-toast-messages](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/callback-toast-messages.gif)

As you can see, the activity components such as Button and Text views are now visible, and a user can start interacting with the screen. The application will saty in this state unless the user navigates to another activity.

So let's now navigate to activity2 by clicking the `go-to Activity2` Button.

At this moment, Activity2 is blocking the activity behind it, which is the MainActivity. This means the MainActivity will instantly pause by calling the `onPause()`. This is well listed by the Logcat messages.

![onpause-main-activity](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/onpause-main-activity.png)

It shows that when the user switched to Activity2, MainActivity was paused. At this point, MAinactivy will be saved in a backstack. When Activity2 is brought to the foreground, `onStop()` will also be called on Mainctivity. This is because the android system is releasing any resources that the MainActivity is not using. This activity is now running in the background.

![switching-activities-logs](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/switching-activities-logs.png)

Note that MainActivity is not destroyed, and it is still very active. This means its states are saved in the memory, and we can retrieve them. To do so, back press your android device, and watch the Logcat messages.

![onrestart-main-activity](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/onrestart-main-activity.png)

As you can see, three methods are executed here `onRestart()`, `onStart()`, and `onResume()`. `onRestart()` will bring this activity to life from the android system memory. Also, note that `onCreate()` was not executed as the activity was still alive. Thus `onCreate()` was already executed and its instance saved in the memory. When you go back `onStart()`, and `onResume()` are called to load the activity to foreground and `onResume()` is the active method.

Also, the above methods (`onPause()` and `onStop()` ) will also be executed if you happen to click the Home button. The application is running in the background and so do the activity. And when you resume to that application, `onRestart()`, `onStart()`, and `onResume()` will be executed.

Go ahead and back press your android phone button as you watch the Logcats. You should note that `onResume()` is the active method. So when you back press, the next cycle will be executed.

When you back press, it means you are exiting the activity, and the callbacks will execute as shown below.

![ondestroy-main-activity](/engineering-education/understand-the-android-lifecycle-and-how-to-implement-it-into-action/ondestroy-main-activity.png)

As you can see, when exiting the application, `onDestroy()` is not called first. The activity is still following its life cycle. So at first, the application was in the foreground, and `onResume()` is active. To exit the application the callback will be executed in this sequence `onPause()`, `onStop()`, and `onDestroy()`.
Once `onDestroy()` is called, the activity becomes non-existent.

### Conclusion
That's how an activity life-cycle works. As a developer, you should wisely choose what to execute when a certain method is called. So you might end up not using all these callbacks in one application. The main idea here is not to show you how to make the app but to make you understand the life cycle of activity, how it works and how it can be implemented in an android application.

I hope you find this tutorial helpful.