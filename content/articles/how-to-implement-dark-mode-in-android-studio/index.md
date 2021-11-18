---
layout: engineering-education
status: publish
published: true
url: /how-to-implement-dark-mode-in-android-studio/
title: How to Implement Dark Mode in Android
description: This article will give the reader a guide on how to implement dark mode in Android using Android studio using Kotlin.
author: michael-barasa
date: 2021-01-29T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-implement-dark-mode-in-android-studio/hero.jpg
    alt: Dark mode example image
---
In the recent past, there has been a lot of excitement regarding dark mode. Users can change the entire look and feel of their application with a click of a button. Numerous developers and huge companies such as Google, Facebook, and Twitter have already implemented this feature in their applications.
<!--more-->
### Introduction
The dark mode feature does not need any significant explanation. It's highly likely that you have already used dark mode on your phone or computer at one point. So, we can simply define dark mode as a setting that changes the overall color of your application to black. The dark mode is supported by both mobile and web applications.

Many applications on the Google Play Store are already equipped with this feature. There are even rumors that enabling dark mode helps prolong battery life. Furthermore, it improves the visual appeal of the app, especially for those users with eye problems.

### Goal
To incorporate the dark mode feature into an Android Application using Kotlin.

### Prerequisites
This tutorial is suitable for intermediate learners. Therefore, you must be familiar with the Kotlin programming language, as well as the file or project structure in Android studio.

When it comes to programs, you will need Android Studio installed on your computer. Having a physical Android device is also recommended. This is because we will test the application on our phones.

### Creating the project
Open Android Studio and create a new project. You can give it any name. In my case, the project is called `darkmode`. Then, select an Empty Activity and proceed to the next screen.

>In this window, ensure that you set the minimum SDK as API 21 OR Lollipop. You can then click finish and wait for the project to be set up. This usually takes a few minutes depending on your internet connection.
>Note: That we do not need to install any other dependencies for this tutorial.

### Creating the attrs.xml file
We need to declare our color attributes in an `attrs.xml` file. We will later access our settings from this file rather than the default `colors.xml`.
In the `res/values` folder, create a new resource file and name it `attrs.xml`. Add the following code in this file.

```xml
<resources>
    <declare-styleable name="ds">
       <attr name="background_color" format="color"/>
        <attr name="text_color" format="color"/>
        <attr name="button_color" format="color"/>
    </declare-styleable>
</resources>
```

Here `<declare-styleable name="ds"></declare-styleable>` allows us to add the style attributes of our app. As shown in the code snippet, the app will have elements such as `background_color`, `text_color`, and `button_color`. Ensure that all of these attributes have the `color` format.

### Modifying the style.xml file
We need to add our light and dark themes in the `styles.xml`.

When you open this file, you will realize that there is a pre-existing style named `AppTheme`. This will serve as our light theme. We then add the dark theme style below the `AppTheme`. The next step is to incorporate the elements in the `attrs.xml` file in both themes. This is shown below.

```xml
<resources>
    <!-- Light application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="background_color">#ffff</item>
   <!--        Our app's background colour when light mode is on == white-->
        <item name="text_color">#000</item>
   <!--        Text color is black-->
        <item name="button_color">@color/colorAccent</item>
    </style>

    <!-- dark application theme. -->
    <style name="darkTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">#000</item>
        <item name="colorPrimaryDark">#000</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="background_color">#131313</item>
<!--     Our app's background changes to black when dark mode is activated -->
        <item name="text_color">#ffff</item>
<!--     text and button color change to white to contrast with the app's background-->
        <item name="button_color">#ffff</item>
    </style>

</resources>
```

>Kindly note that the dark theme should already have all the elements described in the light theme but with different colors.

### Creating the UI
In this tutorial, our app will have a simple user interface. The UI will include a switch and a textview. To get started, open the `activity_main.xml`. Change the layout from `ConstraintLayout` to `LinearLayout`.

Remember to set the `orientation` as vertical. Next, add a Switch and `TextView` widgets and position them at the center of the page. Finally, include an id to the Switch widget.

Here is the full code for the `activity_main.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="?attr/background_color"
    android:padding="10dp"
    tools:context=".MainActivity">

    <TextView   // textview widget
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
        android:layout_gravity="center"
        android:layout_marginTop="80dp"
        android:padding="10dp"
        android:textColor="?attr/text_color"
        android:textAlignment="center"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Switch
        android:id="@+id/switchtheme" // Add switch id
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="80dp"
        android:textColor="?attr/text_color"
        android:text="Switch Theme"/>

</LinearLayout>

```

> Remember to set the color of the UI components. As noted, we will access our colors via the `attrs.xml` file we created earlier. We, therefore, use `"?attr/text_color"` to set color to our widgets. Your application will not work if you ignore this crucial aspect.

### Checking state and handling click events
Whenever our app starts, we need to check which theme is enabled by default. We do this by using the `AppCompatDelegate` class. Here is the code snippet to check the app’s theme.

```kotlin
if (AppCompatDelegate.getDefaultNightMode() == AppCompatDelegate.MODE_NIGHT_YES) {
    setTheme(R.style.darkTheme) //when dark mode is enabled, we use the dark theme
} else {
    setTheme(R.style.AppTheme)  //default app theme
}
```

> Please note that you should include the code snippet above immediately after the `onCreate` function or before the activity_main.xml layout is initialized.

Next, we need to handle the click events for our Switch. Remember, we had assigned this component with the id of `switchtheme`. We, therefore, use this id to listen for changes as shown below.

```kotlin
switchtheme.setOnCheckedChangeListener { _, isChecked ->
    if (isChecked) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
    } else {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
    }

}
```

The `isChecked` is a Boolean variable. When is `isChecked` is true, it means that we need to enable the dark theme. This is done using the below code snippet.

```kotlin
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
```

We set the default light theme as shown below.

```kotlin
AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
```

Here is the code for the `MainActivity.kt`.

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.CompoundButton
import androidx.appcompat.app.AppCompatDelegate
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        if (AppCompatDelegate.getDefaultNightMode() == AppCompatDelegate.MODE_NIGHT_YES) {
            setTheme(R.style.darkTheme)
        } else {
            setTheme(R.style.AppTheme)
        }
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        switchtheme.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
            } else {
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
            }

        }
    }
}
```

If you have followed the above steps properly, your app should now have a dark mode. The following gif shows the dark mode in action.

![demo](/engineering-education/how-to-implement-dark-mode-in-android-studio/demo.gif).

### Conclusion
Dark mode is indeed a fun thing to implement in our mobile applications. I hope that this tutorial has equipped you with the required skills and knowledge to work on dark themes.  In case you haven't understood anything, feel free to revisit the above steps.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
