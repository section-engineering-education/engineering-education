---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-dialogs-in-android-kotlin/
title: Getting Started with Dialogs in Android Kotlin
description: This tutorial takes the reader through creating and implementing dialogs in Android. A dialog is usually a small window that pops out on a devices screen.
author: eric-gacoki
date: 2021-02-14T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-dialogs-in-android-kotlin/hero.png
    alt: Alert Dialogs in Android
---
Android has distinguished techniques for improving user experience. One of them is the use of dialogs. A [Dialog](https://developer.android.com/guide/topics/ui/dialogs) is a brief conversation between the user and the application. It is usually a small window that pops-up on the device's screen.
<!--more-->
Dialogs can be used to prompt actions in some events or pass a message to the user. In this tutorial, we are going to learn how to create and implement dialogs in Android.

### Prerequisites
Before we move on, make sure that you:
- Have [Android Studio](https://developer.android.com/studio) installed on your machine.
- Know how to create Android projects and navigate through the `IDE`.
- Are familiar with `XML` and the `Kotlin` programming language.
- Have basic knowledge of `Data binding`.

### Getting started
Android offers several types of Dialogs which include:
- Alert Dialog
- DatePicker Dialog
- TimePicker Dialog
- Dialog Fragment
- BottomSheet Dialog

In this tutorial, we're going to lay our focus on `AlertDialog`, and we'll mainly cover the following concepts:

- Creating Alert dialogs:
    - Adding title, buttons, message, and an icon.
    - Handle dialog events.

- Customizing Alert dialogs:
    - Creating custom layout resource file.
    - Use of DataBinding to access views.
    - Creating a round-corner-shape dialog.

#### Creating an Android project
Launch Android Studio and create an `Empty Activity` project with the following specifications.

`Name`: *Dialogs in Android*

`Language`: *Kotlin*

`Min-SDK`: *API-21*

### Project setup
#### Adding Dependencies and Plugins
For us to use DataBinding, we have to enable and add the necessary plugin first. Open the app-level `build.gradle` file and add the following in the respective scope.

```bash
plugins {
    id 'kotlin-kapt'
}

// inside the android block add the following

buildFeatures{
    dataBinding true
}
```

*Sync* and wait for the Gradle-build to finish. Once it's done, proceed to set up the UI.

#### Setting up the user interface
In our UI, we need 2 buttons that we'll use to show the Dialogs. Open `activity_main.xml` file and paste the code below.

```xml
<Button
    android:id="@+id/btnShowDefaultDialog"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_margin="10dp"
    android:text="@string/show_dialog"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintVertical_bias="1" />

<Button
    android:id="@+id/btnShowCustomDialog"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_margin="10dp"
    android:text="@string/show_custom_dialog"
    app:layout_constraintBottom_toTopOf="@id/btnShowDefaultDialog"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintVertical_bias="1" />
```

To fix the error about the unresolved reference in the text attribute, create strings in the strings resources as shown below.

```xml
<resources>
    <string name="show_dialog">Show dialog</string>
    <string name="show_custom_dialog">Show custom dialog</string>
</resources>
```

*buttons preview:*

![buttons image](/engineering-education/getting-started-with-dialogs-in-android-kotlin/buttons.png)

As we mentioned earlier, we will use these buttons to show the necessary dialogs. To achieve this, we need DataBinding objects for each view in our layout. 

The beauty of DataBinding is that it autogenerates these objects. We just need to enclose the layout with a `layout` tag as shown below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <!--views are constrained here-->

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

#### Writing Kotlin code
Inside the `MainActivity.kt` file is where we'll write the logic of our app. First, create a mutable variable of type `ActivityMainBinding` that will initially be `null` but be initialized in the `onCreate()` method. 

To learn more about DataBinding please refer to [this article by Michael Barasa](/how-to-use-databinding-in-android-using-kotlin/) or [this Youtube tutorial](https://www.youtube.com/watch?v=MXZz438aCDM&t=6s).

When activities or fragments are destroyed, variables or objects can still be holding a reference to non-existing values. This is called a memory leak which of course can lead to unwanted behavior in our app. 

To avoid this, always de-allocate memory allocated to such objects in the `onDestroy()` method.

The snippet below shows the above-discussed concepts.

```Kotlin
class MainActivity : AppCompatActivity() {
    private var activityMainBinding: ActivityMainBinding? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main)
    }

    override fun onDestroy() {
        activityMainBinding = null
        super.onDestroy()
    }
}
```

### Creating Alert Dialogs
An Alert Dialog is created by instantiating the `AlertDialog` class and then creating a `Builder` for it. There are several types of Alert Dialogs in Android. In this tutorial, we'll create every dialog in its own `function` and the respective one will be called when a button is clicked.

#### A). Default Alert Dialog
This type of dialog is usually rectangular and appears at the center of the screen. We'll discuss its functionalities as we proceed. In the meanwhile, paste the code below inside the `MainActivity` class, just below the `onCreate()` method.

```kotlin
private fun showDefaultDialog() {
        val alertDialog = AlertDialog.Builder(this)
        alertDialog.apply {
            setTitle("Hello")
        }.create().show()
    }
```

The code above creates a dialog with the title "Hello" and shows it on the screen using the `show()` method. If omitted, the dialog won't pop up. You can verify this by calling its function when the button is clicked. Add the code below.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        // add the following three lines
        activityMainBinding?.btnShowDefaultDialog?.setOnClickListener {
            showDefaultDialog()
        }
    }
```

Ensure that there are no errors in your code before running the app. When you click the button, you should get an output similar to the one below.

![empty dialog](/engineering-education/getting-started-with-dialogs-in-android-kotlin/empty-dialog.png)

##### Adding features to a Dialog
Now that we've created a Dialog, we can add functionalities such as:

- `Icon` - This is a small-sized image that appears alongside the title. It usually makes the dialog more informative and attractive.
- `Message` - This is the main content of the alert dialog. It gives a short description of the reason for its pop-up or, prompts the user to make a decision before proceeding.
- `Buttons` - They appear at the bottom part of the dialog. There are three types of buttons namely, `Positive`, `Negative` and `Neutral` buttons. As their names suggest, they are meant to perform the respective actions once clicked. By default, the dialog dismisses once any of the buttons is clicked.
- `View` - this is a layout used in customizing dialogs. We'll learn about this in a moment.

Meanwhile, let us create a Dialog that implements the above features. Create a vector drawable (icon) named `ic_hello`.

Update the `showDefaultDialog()` function to look like the one below.

```kotlin
private fun showDefaultDialog() {
        val alertDialog = AlertDialog.Builder(this)

        alertDialog.apply {
            setIcon(R.drawable.ic_hello)
            setTitle("Hello")
            setMessage("I just wanted to greet you. I hope you are doing great!")
            setPositiveButton("Positive") { _, _ ->
                toast("clicked positive button")
            }
            setNegativeButton("Negative") { _, _ ->
                toast("clicked negative button")
            }
            setNeutralButton("Neutral") { _, _ ->
                toast("clicked neutral button")
            }
        }.create().show()
    }
```

Now, copy and paste the code below just above or below the `showDefaultDialog()` function.

```kotlin
    private fun toast(text: String) = Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
```

**Explanation**

The syntax for creating a button requires us to pass in a listener of type `DialogInterface.OnClickListener` in the lambda function. A `DialogInterface` defines a dialog-type class that can be shown, canceled (or dismissed), and may have buttons that can be clicked. `Kotlin` simplifies this by allowing us to pass in `underscores` for unused arguments in the lambda function.

The function `toast()` is used to show a short `Toast` message with a text passed as the argument when a button is clicked.

Run the app and you should see a dialog similar to the one below.

![default dialog](/engineering-education/getting-started-with-dialogs-in-android-kotlin/default-dialog.png)

Notice that when you click outside the dialog, it dismisses. You can avoid this effect by adding `setCancelable(false)` in the builder.

#### B). Custom Alert Dialogs
Customization is the act of making something appear or behave differently from the default way. Alert Dialog offers us an important method, `setView()` that allows us to use a `Layout` as the `View` for the dialog. Such dialogs are called custom dialogs.

Moving on, create an XML layout resource file named `lay_custom_dialog`. We'll use this layout for the purpose mentioned above.

Open the newly created file and paste the following code

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <View
            android:id="@+id/view"
            android:layout_width="0dp"
            android:layout_height="40dp"
            android:background="#FF0057"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.0"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintVertical_bias="0.0" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/greetings_sent_successfully"
            android:textColor="@color/white"
            android:textSize="20sp"
            app:layout_constraintBottom_toBottomOf="@id/view"
            app:layout_constraintEnd_toEndOf="@id/view"
            app:layout_constraintStart_toStartOf="@id/view"
            app:layout_constraintTop_toTopOf="@id/view" />

        <ImageView
            android:layout_width="0dp"
            android:layout_height="150dp"
            android:layout_margin="10dp"
            android:src="@drawable/ic_hello"
            app:layout_constraintBottom_toTopOf="@+id/btnOk"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/view" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnOk"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_margin="10dp"
            android:backgroundTint="#FF0057"
            android:text="@string/ok"
            android:textStyle="bold"
            app:cornerRadius="20dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

To fix the errors about unresolved references in the "text" attribute, copy and paste the respective string resource below.

```xml
<resources>
    <string name="app_name">Dialogs in Android</string>
    <string name="show_dialog">Show dialog</string>
    <string name="show_custom_dialog">Show custom dialog</string>
    <string name="ok">OK</string>
    <string name="greetings_sent_successfully">Greetings sent successfully</string>
</resources>
```

In the `MainActivity.kt` file, paste the following code just below `showDefaultDialog()` function.

```kotlin
private fun showCustomDialog() {
        val dialogBinding: LayCustomDialogBinding? =
            DataBindingUtil.inflate(
                LayoutInflater.from(this),
                R.layout.lay_custom_dialog,
                null,
                false
            )

        val customDialog = AlertDialog.Builder(this, 0).create()

        customDialog.apply {
            setView(dialogBinding?.root)
            setCancelable(false)
        }.show()

        dialogBinding?.btnOk?.setOnClickListener {
            customDialog.dismiss()
        }
    }
```

Here we've linked the layout and created a non-cancellable dialog that can only be canceled by clicking the `Ok` button.

In the `onCreate()` method, add the following code.

```kotlin
activityMainBinding?.btnShowCustomDialog?.setOnClickListener {
            showCustomDialog()
        }
```

We can customize it further by creating round corners. To achieve this, we'll create a drawable resource file with a round shape then set it as the background for our layout. Create a drawable resource file named `round_corners` and paste the following code in it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="@color/white">
    <corners android:radius="20dp" />
</shape>
```

Remember to set this as the background of the root `ViewGroup` as shown below.

```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/round_corners"
    >
```

Before running the app we need to do the following;

- Create a top-curved shape drawable resource named `curved_view` and set it as the view's background
- Set the color of the dialog window to transparent. This will make the round corners visible as the window background won't be visible.

Paste the code below in the `curved_view.xml` file and `showCustomDialog()` function respectively.

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="#FF0057"/>
    <corners android:topLeftRadius="20dp" android:topRightRadius="20dp"/>
</shape>
```

```kotlin
customDialog.apply {
            window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            setView(dialogBinding?.root)
            setCancelable(false)
        }.show()
```

The rest of the function remains the same.

Now we're done. Run the app and you should see a dialog similar to this one

![round dialog](/engineering-education/getting-started-with-dialogs-in-android-kotlin/round-dialog.png)

### Conclusion
In this tutorial, we've learned how to create, customize, and use Alert Dialogs in Android. As you've seen, dialogs are very simple to implement. You can find the full source code for this tutorial [here](https://github.com/Ericgacoki/dialogs-in-android). 

Check out the [official documentation](https://developer.android.com/guide/topics/ui/dialogs) to learn more about Alert Dialogs and other types of dialogs that Android has to offer.

Happy Coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
