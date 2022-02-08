### Introduction
Intents are an android element that facilitates moving from one screen to another.

This tutorial will be a step-by-step guide on creating an application utilizing intents and understanding more concepts related to intents.

### Objectives
By the end of this tutorial, you should have learned the following;
1. What exactly is the intent? 
2. Different types of intent
3. How can you construct a full intent?
4. How to Incorporate Intents into Your Application
5. What is malicious intent, and how to cuff it?
6. What does intent resolution mean in Android?

### Prerequisites
- Install the latest Android Studio on your machine. [Download here](https://developer.android.com/studio#downloads).
> `Note:` Choose your best option for Android depending on the operating system running on your machine. At least make sure your machine has at least 8GB of RAM because while building a project, it strains the memory and slows down your PC. Hence, the greater the memory, the faster the project is completed.

- Have basic knowledge in [kotlin](https://developer.android.com/courses/android-basics-kotlin/course) language
- Learn how to start an Android project from scratch. [ClickHere](https://www.section.io/engineering-education/first-android-app/) to learn.

### Table of contents
- [A brief walkthrough to intents](#a-brief-walkthrough-to-intents) 
- [Types of Intents](#types-of-intents)
- [A complete intent structure guide](#a-complete-intent-structure-guide)
- [Examples of implicit and explicit intents](#examples-of-implicit-and-explicit-intents)
- [How to identify malicious intents](#how-to-identify-malicious-intents)
- [Intent resolution](#intent-resolution)
- [Conclusion](#conclusion)

Let's get started!!

## A brief walkthrough to intents
The intent is usually a command that helps in navigating through an application activity (screen) in either of the following ways:
Launching a new activity
Initiating services
Transmitting a broadcast receiver
Passing on information between two or more screens

**Intents use methods such as;**
1. Context.startActivity(); used to start a new activity or to activate an existing one.
2. Context.startService(); services are initiated using this reserved method and send modified instructions to an already running service.
3. Context.sendBroadcast(); using this method, the broadcast receivers are systematically chosen by the intent object, and the intended information is sent to them.

Intents can also be defined as sequential messages that allow application components to ask other Android features for support. Similarly, two applications on the same device maximally utilize intent to share information. An action, for example, can initiate an external activity such as capturing an image using a camera or getting data from memory.

## Types of Intents.
Intents are broadly categorized into; 
1. Implicit Intents - The element in the application is not specified via implicit intent. In this situation, intent offers information on the components accessible from the system that ought to be executed. For example, a button will take you to the intended application when you click it. Suppose your device has more than one sharing application. In that case, the options box will appear and display all applications with sharing capabilities. App choice is made depending on which mode the user is most comfortable with, among other personal considerations like the security of the data, e.t.c.

2. Explicit Intents - It connects elements of the same application. I.e., all the components reside in the same application. Using explicit purpose, you can pass data from one activity to another. For example, a button will direct you to a device file manager when you click it, and you can view the media inside the device memory.

## A complete intent structure guide
A complete intent object should have a bundle that stores data that helps the application determine which activity it should first start and information that an element in the same application uses to conduct an operation in the correct procedure.

### Key terminologies used in intent structuring
- `Element name` - This is an additional bit of information. Still, it's the most important because it helps make an intent explicit, indicating that the intent must only be delivered to the app element defined by the element name. If an intent didn't have an element name, it would be implicit. In this case, the system decides which element should receive the intent first following the last available intent data.

- `Action` - It is a string that indicates the general action that should be carried out by intent. Actions are like variables, which means you can declare your own to be used by the application's intents. Examples
of action used when building intent include 
```kotlin
private const Val ACTION_EDIT = "com.Davis.action.EDIT"
```
The code edits information only when the identifiers to be edited are declared.
> Make sure to include the package name of your application before any custom actions you write, e.g., ***`com.davis`*** is a package name.
- `Data` - It indicates the intent data's explicit type.
In most cases, the type is deduced from the data itself.
You can disable that processing and force the explicit type by setting that attribute. The URI is the most crucial element of data because it holds the data's whereabouts to be processed by the intent of a particular activity.

- `Category` - It is descriptive information that states the elements appropriate to steer the intent.
For an example of categories in intents
; CATEGORY_EMBED - Functioning within a primary activity container is possible.
CATEGORY_DESK_DOCK - Whenever the device is connected to a car dock, an activity is launched.

- `Extras` - It refers to collecting any extra data.
It is used to supply the component with more information.
For instance, if we have an action to send e-mail messages, we could enter additional data to provide a subject, body, and other information relating to the message being sent. E.g.,
```Kotlin
private const Val EXTRA_EMAIL = "com.Davis.EXTRA_EMAIL" 
```
The code above is a String[] containing the different e-mail addresses to which the message should be sent.

- `Flags` - In the Intent class, they are used as an identifier for an intent.
Depending on how an activity is flagged, the Android OS may know how to begin and how to proceed with that activity.


## Examples of implicit and explicit intents
We will implement the two types of intent since we have to create an illumination application.

### Step 1: Creating a new android studio project
- Open the android studio application on your computer.
- In the introductory dialog box, *`select start a new project`*.
- Select *` Empty activity`* as your project template. Click *` next`* to proceed to the next steps.
![Creating a new empty activity](engineering-education/getting-started-with-intents-in-android-development-using-kotlin/actity.jpg)

- Edit the application name and enter your own, e.g., enter intent.
- Select *` Kotlin`* as your default language in this project.
- Select a minimum SDK depending on **how many devices will be able to run your application**. The Android Studio will help you know the percentage of existing devices with the SDK selected.
- Click *` finish`* to complete setting up the android studio and wait a few seconds for it to build up your project.

![Configuring your project](engineering-education/getting-started-with-intents-in-android-development-using-kotlin/configure.jpg)


### Step 2: Working with main activity.xml file
- On your left side of your Android Studio layout; *`select project`* -> *`app folder`* -> *`res folder`* -> *`layout folder`*  -> double click the *`activity_main.xml`*.
- Add the following code to design the user interface:
```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="375dp"
        android:layout_height="295dp"
        android:layout_marginStart="10dp"
        android:layout_marginTop="16dp"
        android:layout_marginBottom="20dp"
        android:src="@drawable/car"
        app:layout_constraintBottom_toTopOf="@id/rl1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
    <RelativeLayout
        android:id="@+id/rl1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="10dp"
        android:layout_marginRight="10dp"
        android:layout_marginBottom="20dp"
        app:layout_constraintBottom_toTopOf="@id/rl2"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        tools:layout_editor_absoluteX="17dp">

        <androidx.cardview.widget.CardView
            android:id="@+id/cardViewY"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginLeft="10dp"
            android:layout_marginTop="8dp"
            android:layout_marginBottom="8dp"
            app:cardBackgroundColor="@color/teal_200"
            app:cardCornerRadius="16dp">
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_margin="2dp"
                    android:text="@string/explicit_intent"
                    android:textSize="15sp"
                    android:textColor="@color/black" />

                <LinearLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="center_horizontal"
                    android:orientation="horizontal">

                    <Button
                        android:id="@+id/btnGallery"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginHorizontal="10dp"
                        android:text="Gallery" />

                    <Button
                        android:id="@+id/btnCamera"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginLeft="30dp"
                        android:text="Camera" />
                </LinearLayout>
            </LinearLayout>
        </androidx.cardview.widget.CardView>
    </RelativeLayout>

    <RelativeLayout
        android:id="@+id/rl2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="10dp"
        android:layout_marginRight="10dp"
        android:layout_marginBottom="10dp"
        android:orientation="horizontal"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        tools:layout_editor_absoluteX="17dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentLeft="true"
            android:layout_centerHorizontal="true"
            android:layout_centerVertical="true"
            android:layout_marginEnd="49dp"
            android:layout_toStartOf="@+id/btnShare"
            android:text="@string/implicit_intent"
            android:textColor="@color/black"
            android:textSize="15sp"/>

        <Button
            android:id="@+id/btnShare"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerHorizontal="true"
            android:text="share" />
    </RelativeLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```
> **Note:** You may opt to use vector assets instead of buttons by adding them to the drawable resource file. Then add an image view in the XML layout and reference the image using the `src` method.

Your design should look similar to the one shown below.

![Examples of intents design](engineering-education/getting-started-with-intents-in-android-development-using-kotlin/design.jpg)

### Step 3: Working with `Activity main.kt`.
Before we work with the main_activity.kt, we will add additional code to our app files to ensure that it will meet our objective fully.
- In the *`Grandle Scripts`* -> *`build.grandle`*  add the following code snippet; 
```Kotlin
 buildFeatures{
        viewBinding true
    }
```
> Ensure to click the `Sync Now` tab above the layout to ensure the grandle files are updated. The background is mostly navy blue, making it easy to notice the popup message. 
- In the Android *` manifests folder*` -> double click *`AndroidManifest.xml`* add the following permissions to be able to access the device media and the camera application
```kotlin
<uses-permission android:name=
"android. permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

- To make your application functional on click events, now add the following code to the *`app`* -> *`java`* -> *`com.david.intent(package)`* -> double click *`MainActivity`*.

```kotlin
class MainActivity : AppCompatActivity() {
    private val my_request_code: Int = 0
    private lateinit var imageView: ImageView
    var binding: ActivityMainBinding? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding!!.root)

        binding!!.btnGallery.setOnClickListener {
            Intent(Intent.ACTION_GET_CONTENT).also {
                it.type = "image/*"
                startActivityForResult(it, 0)
            }
        }

        binding!!.btnCamera.setOnClickListener {
            val snapPhotoIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            if (snapPhotoIntent.resolveActivity(this.packageManager) != null) {
                startActivityForResult(snapPhotoIntent, my_request_code)
            } else {
                Toast.makeText(this, "Unable to execute Camera", Toast.LENGTH_SHORT).show()
            }
        }

        binding!!.btnShare.setOnClickListener {
            val sendIntent: Intent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, "I am sharing ->")
                type = "text/plain"
            }
            val shareIntent = Intent.createChooser(sendIntent, "Share with?")
            startActivity(shareIntent)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK && requestCode == 0) {
            val bitmap = data?.extras?.get("data") as Bitmap
            val uri = data.data
            imageView.setImageURI(uri)
            imageView.setImageBitmap(bitmap)
        }
    }
}
```
-  Run your application. Learn [here](https://developer.android.com/training/basics/firstapp/running-app).


- To get the total working codes, click [here](https://github.com/davidginmaina/getting-started-with-intents).

## How to identify malicious intents
Your app can use intents to traverse components or conduct an action on behalf of another app.

Illegal intents are realised when an application's extras of a provided intent are unparcelled by an app to create a nested intent and StrictMode violation ocurs.

In Kotlin, the following code is a programmatic way to detect an unsafe intent;

```kotlin
fun onCreate() {
    StrictMode.setVmPolicy
    (new StrictMode.VmPolicy.Builder()
        .detectUnsafeIntentLaunch()
        .penaltyDialogue //Whenever a fault happens, a pop up with violation details appears.
        .penaltyLog()
        .penaltyDeath() //Immediately terminate the current application when the violation condition is triggered.
        .build());
}
```
> **Note:** *In newer versions of android i.e., version 12 and using the `detectAll()` method in declaring `VmPolicy`, function `detectUnsafeIntentLaunch` is involuntary invoked*

## Intent resolution
The act of searching for relevant application components for your intents is known as intent resolution.
Intent resolutions are primarily used in implicit intent because they do not offer the component name, which aids a system in looking for an application component name that can conduct the activities.
The system performs the following steps to obtain the component name;
- Action Test: Here, the system ascertains whether or not the intended action and the intents in the intent filter match. The test is successful if they are both identical. Everything else fails.
- Category test: Here, the system compares the category name to that specified in the intent filter. This test is passed if both are identical, else it fails.
- Data Test: Here, the system compares the data in the Intent MIME with information in the intent filter. It succeeds this check if it is identical; else, it fails

## Conclusion
In this tutorial, we have discussed intents, the existing types of intents, and examples in an application in the most precise way to show you how you can implement them in your android projects.
We have also explained how intents are essential because of their numerous uses in navigating between applications with two or more screens (activities).

This tutorial is also recommended for beginners and intermediate people looking forward to building their knowledge of Android intents.

You have leveled up your droiding skills!!
