---
layout: engineering-education
status: publish
published: true
url: /adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/
title: How to Add a Custom Floating Action Button to Bottom Navigation in Android
description: This article will guide the reader on how to add a custom floating action button to the bottom navigation bar in Android.
author: 
date: 2021-11-30T00:00:00-08:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/hero.jpg
    alt: Custom Floating Action Button Hero Image
---
Floating Action Buttons or FAB are different from other UI elements. FAB is a circular-shaped button with a centralized icon. 
<!--more-->
This button appears on top of all screen content. It promotes different actions including adding an item to a list.

### Prerequisites
To follow along, you need:
- Some basic knowledge in [Kotlin](https://kotlinlang.org/).
- Some understanding of Android Studio. 

### Goal
This tutorial will accomplish the following objectives:
- Using material design components. 
- Creating a bottom navigation bar.
- Adding a custom floating action button at the center of a bottom navigation bar.

### Introduction
In this article, we will create an application that will have a floating action button at the center of a bottom navigation bar.

A bottom navigation bar usually contains different buttons and icons. To make it more appealing, we will add a floating action button.

A floating action button helps to attract the user's attention. This is because it appears on top of other UI content. 

### Getting started
The three forms of FAB are regular, mini and extended floating action buttons.

In this tutorial. we will focus on the regular FAB centered in a Bottom Navigation Bar.

The background of a Floating Action Button should contrast with the application's color scheme. 

We can do this by customizing the Floating Action Button color using the `colorAccent` attribute.

Bottom Navigation Bar is imported from the `material design` library. It is usually added using `BottomNavigationView`. 

In your app-level `build.gradle` file, ensure that you have the `material design` library. 

> Note that a `Bottom Navigation Bar` can contain a single task or component. However, it's advisable to include at least three destination icons.

### Step 1: Create a new project
- To create a new project, click on File followed by New then Project
- Select Empty Activity then click Next

![creating a project](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/creating_project.png)

- Give a name to your new project for example, floatingActionButton
- On the same window, on Languages, select Kotlin as the language
- Then click Finish

### Step 2: Add Material Design Dependencies
- To add a Material Design Dependencies, click on the Gradle Script file.
- Then click on the build.gradle(Module.app).
- Under plugins add id 'kotlin-android-extensions'.
- Under dependencies, add the material design dependencies.
 ```gradle
    implementation 'com.google.android.material:material:1.3.0-alpha03'.
  ``` 
![adding dependency](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/adding_dependency.png)       
- On the top right corner of the same window, click on Sync Now to sync the dependency to our project. 

### Step 3: Import icons 
- Here we are going to import some icons for our bottomNavigationView.
- We will import 5 icons, 4 for our bottomNavigationView and 1 for our Floating Action Button.
- On the res file, right click on drawable followed by New then Vector Asset.
![creating a project](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/ading_vectorsAsset.png)
- On the Clip Art, click on the clip art icon.
- Search for a home icon select it then click Ok.
- Change the Name to ic_home then click Next.
- On the next window, click Finish. 
- We are going to use the same process to import the four other icons: search icon, person icon, setting icon and add icon.
- The add icon is what we are going to add to our Floating Action Button.
- If we have imported the five icons, we are good to go.

### Step 4: Create a menu for BottomNavigationView
- On the res file, right click on it -> New -> Android Resource File.
![creating a res file](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/adding_android_resource_file.png)
- On the Resource Type select menu.
- Give your a file name for example bottom_menu_nav, then cick Ok.
![bottom_menu_nav](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/bottom_menu_nav.png)
- We can then see the design. 
- Click on the code so that in the xml file, we can create the single items that will on our menu.
- Create your menu layout as follows:

``` xml
 <?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    
    <item android:id="@+id/bottomMenuHomeIcon"
        android:title="Home Icon"
        android:icon="@drawable/ic_home_bootom"/>

    <item android:id="@+id/bottomMenuSearchIcon"
        android:title="Search Icon"
        android:icon="@drawable/ic_search_bottom"/>

    <item android:id="@+id/bottomMenuPersonIcon"
        android:title="Profile Icon"
        android:icon="@drawable/ic_person_bottom"/>

    <item android:id="@+id/bottomMenuSettingIcon"
        android:title="Setting Icon"
        android:icon="@drawable/ic_settings_bottom"/>
</menu>
```
- The output:
![bottom_menu_nav_output](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/bottom_menu_nav_xml.png)

### Step 5: Let us go to activity_main.xml
- Remove the textView with the text "Hello World"
- Change the ConstraintLayout to CoordinatorLayout.
- Add the followwing code:

``` xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.bottomappbar.BottomAppBar
        android:id="@+id/bottomBar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:fabCradleMargin="20dp"
        app:fabCradleVerticalOffset="10dp"
        app:fabCradleRoundedCornerRadius="20dp"
        android:layout_gravity="bottom">

        <com.google.android.material.bottomnavigation.BottomNavigationView
            android:id="@+id/bottomNavationView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_marginEnd="16dp"
            android:background="@android:color/transparent"
            app:menu="@menu/bottom_menu_nav"/>
    </com.google.android.material.bottomappbar.BottomAppBar>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/ic_add_fab"
        app:layout_anchor="@+id/bottomBar"/>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
- To use our own theme, we use Theme components and to change that, under res file, select value then theme/style.xml.
![theme](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/theme.png)
- Change the parent="Theme.MaterialComponents.DayNight.DarkActionBar" to  parent="Theme.MaterialComponents"
- When we change that,the theme of our design will change.
- The output:
![theme_output](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/theme_output.png)

- Let us stick to our default theme.
- We can see that our bottomNavigationBar has a shadow.
- To remove that, in our MainActivity.kt, we add the following line of code
   "bottomNavView.background = null"

``` kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bottomNavView.background = null
    }
}
```
- In our xml file design we will still see it but when we start our app it won't be there.
- We now have to align our items in the bottomNavigationBar. Thus we add a placeholder to our bottom_nav_menu.

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item android:id="@+id/bottomMenuHomeIcon"
        android:title="Home Icon"
        android:icon="@drawable/ic_home_bootom"/>

    <item android:id="@+id/bottomMenuSearchIcon"
        android:title="Search Icon"
        android:icon="@drawable/ic_search_bottom"/>

    <item android:id="@+id/bottomMenuPlaceholder"
         android:title=""/>

    <item android:id="@+id/bottomMenuPersonIcon"
        android:title="Profile Icon"
        android:icon="@drawable/ic_person_bottom"/>

    <item android:id="@+id/bottomMenuSettingIcon"
        android:title="Setting Icon"
        android:icon="@drawable/ic_settings_bottom"/>

</menu>
```
### Step 5: Creating a Toast
- Write the following code to your MainActivity.kt

```kotlin
class MainActivity : AppCompatActivity() {

    //declare a variable
    private lateinit var floatingActionButton: FloatingActionButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bottomNavationView.background = null
        bottomNavationView.menu.getItem(2).isEnabled = false
 
        //creating a toast
        floatingActionButton = findViewById(R.id.fab)
        floatingActionButton.setOnClickListener {
            Toast.makeText(this, "FloatingActionButton", Toast.LENGTH_SHORT).show()
        }
    }
}
```
### Output
This is the expected output after running your application
![FAB demo](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/FAB.mp4)

### Conclusion
Floatng Action Button has more than what we have covered in this article. Keep exploring and learn more.

### Reference
-[material design](https://material.io/components/app-bars-bottom)

-[android developers](https://developer.android.com/guide/topics/ui/floating-action-button)


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
