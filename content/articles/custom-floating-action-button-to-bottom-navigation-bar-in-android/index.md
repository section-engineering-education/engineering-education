---
layout: engineering-education
status: publish
published: true
url: /custom-floating-action-button-to-bottom-navigation-bar-in-android/
title: Adding a Floating Action Button to Bottom Navigation Bar in Android
description: This tutorial will help the reader understand how to add a floating action button to the bottom navigation bar in Android.
author: jackline-adhiambo
date: 2022-01-27T00:00:00-01:18
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/custom-floating-action-button-to-bottom-navigation-bar-in-android/hero.jpg
    alt: Custom Floating Action Button to Bottom Navigation Bar in Android Hero Image
---
Triggering actions is a critical factor to consider while designing an Android app. In most cases, buttons help to fulfill this purpose.
<!--more-->
Buttons such as *compoundButton, ToggleButton*, and *RadioButton* are commonly used in an Android application.

In this tutorial, we'll discuss the *floating action button* which is denoted by FAB.

Floating action buttons are unique from other user interface elements. They are circular with centralized icons that appear on top of other screen content. These buttons encourage users to take a range of actions, such as adding an item to a to-do list.

The common types of floating action buttons are:
- `Regular FAB`- This type of floating action button does not have any extensions and is of standard size.
- `Mini FAB` - This form of FAB is used on small screens.
- `Extended FABs` - This type of button is larger and has text labels embedded into it.

### Prerequisites
To follow along with this tutorial, you need:
- Some basic understanding of the [Kotlin](https://kotlinlang.org/) programming language.
- Basic knowledge of the fundamentals of Android development.

### Goal
At the end of this tutorial, the reader will understand how to use material design components, how to create a bottom navigation bar, and how to add a floating action button.

Our final UI should look as follows:

![UI](/engineering-education/custom-floating-action-button-to-bottom-navigation-bar-in-android/ui.jpg)

### Step 1 - Creating a new project
To create a new project in Android Studio, go to *File > New > New Project > Empty Activity*, as shown below:

![Creating a project](/engineering-education/custom-floating-action-button-to-bottom-navigation-bar-in-android/creating_project.jpg)

Give the project a descriptive name, such as *FloatingActionButton*, and then select *Kotlin* as your preferred programming language. Finally, click *Finish* to complete the project.

### Step 2 - Adding Material design dependencies
To add Material design dependencies, navigate to the app level *build.Gradle* file. Under *plugins*, add `id 'kotlin-android-extensions`, then under dependencies, add the material design dependencies as shown below, and then click on *Sync*:

```gradle
implementation 'com.google.android.material:material:1.3.0-alpha03' 
```

### Step 3 - Creating a menu for the BottomNavigationView
To create an *Android Resource* file, navigate to the *res* directory and create a new *Android Resource* file. 

Choose *menu* as your preferred *Resource Type* and give a descriptive file name such as `bottom_menu_nav`, then click *Ok*. Use the following code to assemble your menu:

```xml
<?xml version="1.0" encoding="utf-8"?>  
<menu xmlns:android="http://schemas.android.com/apk/res/android">  

      <item android:id="@+id/bnbMenuHome"  
      android:title="Home Icon"  
      android:icon="@drawable/ic_home_bnb"/>  
      
      <item android:id="@+id/bnbMenuSearch"  
      android:title="Search Icon"  
      android:icon="@drawable/ic_search_bnb"/>  
      
      <item android:id="@+id/bnbMenuPerson"  
      android:title="Profile Icon"  
      android:icon="@drawable/ic_person_bnb"/>  
      
      <item android:id="@+id/bnbMenuSetting"  
      android:title="Setting Icon"  
      android:icon="@drawable/ic_settings_bnb"/>  
  
</menu>
```
### Step 4 - Importing icons
Let's add some icons to our *BottomNavigationView*. We will use *five* icons, four for our *BottomNavigationView*, and one for our floating action button. 

To achieve this, navigate to the *res* directory, *right-click* on *drawable*, then choose *New > Vector Asset* from the menu:

![Icons](/engineering-education/custom-floating-action-button-to-bottom-navigation-bar-in-android/adding_vectors_asset.jpg)

Proceed to the *clip art* icon and then click it. Search for a *home* icon, then choose it and change the name to *ic_home_bnb*. Finally, click *Next* and *Finish* to complete the process.

Follow the same procedure and add the remaining *search, person, setting*, and *add* icons.

> Note: you can add icons that best fit your needs.

### Step 5 - Designing the user interface with FAB
The user interface allows users to interact with the app. It is vital to have an appealing UI design. In our case, the application interface should look as follows:

![UI](/engineering-education/custom-floating-action-button-to-bottom-navigation-bar-in-android/ui.jpg)

The floating action button's background should contrast with the application's color scheme. We can do this by customizing the button's color using the `color accent` attribute.  

> Note: a `BottomNavigationBar` can contain a single task or component. However, it's advisable to include at least three destination icons.

### Step 6 - Applying the required theme
We use *Theme* components to change the appearance of our application. Inside the *res* directory, navigate to the *values* folder then to the *theme/style.xml* file.

Change the parent theme from `Theme.MaterialComponents.DayNight.DarkActionBar` to `Theme.MaterialComponents`. 

We also need to remove the shadow applied to the `BottomNavigationBar` by adding the following code in the `MainActivity.kt` file:

```kotlin
bottomNavView.background = null
```

### Step 7 - MainActivity.kt class
The following bottom navigation code and floating button implementation should be included in the *MainActivity.kt* file, as illustrated below:

```kt
class MainActivity : AppCompatActivity() {   
    //declare a variable  
  private lateinit var floatingActionButton: FloatingActionButton  
  
    override fun onCreate(savedInstanceState: Bundle?) {  
      super.onCreate(savedInstanceState)  
      setContentView(R.layout.activity_main)  
  
      bottomNavView.background = null  //Removing the background shadow
      bottomNavView.menu.getItem(2).isEnabled = false  
  
      //creating a toast  
      floatingActionButton = findViewById(R.id.fab)  
      floatingActionButton.setOnClickListener { 
         //showing a toast message when clicked 
         Toast.makeText(this, "FloatingActionButton Clicked", Toast.LENGTH_SHORT).show()  
      }  
  }  
}
```

### Conclusion
In this tutorial. we have discussed the different types of floating action buttons in Android. 

We also learned how to create a bottom navigation bar and incorporate a floating action button into it.

You can find the full code [here](https://github.com/jackline-ke/FloatingActionButton2).

### Further reading
- [Material design](https://material.io/components/app-bars-bottom)
- [Android developers](https://developer.android.com/guide/topics/ui/floating-action-button)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)