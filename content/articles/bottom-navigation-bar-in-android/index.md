---
layout: engineering-education
status: publish
published: true
url: /bottom-navigation-bar-in-android/
title: Bottom Navigation Bar in Android Applications
description: This article goes through how integrate a Bottom Navigation View using a Navigation Component to add the Navigation Views in an Android applications.
author: briana-nzivu
date: 2020-10-28T00:00:00-19:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/bottom-navigation-bar-in-android/hero.jpg
    alt: example image bottom navigation bar in Android applications
---
A **Bottom Navigation View** navigation tool enables users to explore and change to different views in an application. A **Navigation Component** is a set of libraries developed by Google to manage complex navigation functions like animations, transitions, etc.
<!--more-->
### Introduction
Bottom Navigation View makes applications more user-friendly during navigation. Before 2017, navigation to different fragments in an application used Fragment transactions. For applications with many fragments, writing fragment transactions became tedious.

Google developed the Navigation Component, which made the navigation process more manageable. Selecting a Bottom Navigation View icon enables users to switch to a selected view or refresh an active view.

We use a Bottom Navigation View when an application has the following:
- Three to five views.
- Views that need direct access.

A few popular mobile applications that use this navigation component are Instagram, Twitter, Youtube, etc.

![Instagram](/engineering-education/bottom-navigation-bar-in-android/instagram.jpg)

![Twitter](/engineering-education/bottom-navigation-bar-in-android/twitter.jpg)

![Youtube](/engineering-education/bottom-navigation-bar-in-android/youtube.jpg)

### Structure of a Bottom Navigation Bar
A Bottom Navigation bar is a container that contains the following:
- Inactive icon.
- Inactive text label (optional).
- Active icon.
- Active text label.

![Structure of a Bottom Navigation Bar](/engineering-education/bottom-navigation-bar-in-android/structure.jpg)

### Structure of a Navigation Component
A navigation component consists of the following:
- Navigation graph.
- NavHost.
- NavController.

### Advantages of a Bottom Navigation View using a Navigation Component
- It makes applications more user friendly.
- It eases the development processes of an application.
- It enables implementing and handling Deep Linking.
- It allows the handling of fragment transactions.
- It Offers `ViewModel` support.
- It offers animations and transitions support.

### Disadvantages of a Bottom Navigation View using a Navigation Component
- Applications with less than three destinations cannot use it.
- Limited to only Mobiles and Tablets.
- It is challenging to implement a `TabLayout`

### Useful Terminology
- [Bottom Navigation Bar](https://material.io/develop/android/components/bottom-navigation) - a navigation component that enables users to explore and change to different applications' views.
- [Dependency](https://developer.android.com/studio/build/dependencies) - a statement SDK that allows us to add an external library into our projects.
- [Fragment](https://developer.android.com/reference/android/app/Fragment) - a fragment is a sub-activity which enables more modular activity design.
- [Navigation Component](https://developer.android.com/guide/navigation/navigation-getting-started) - a resource file that contains information used for navigation.
- [Navigation Graph](https://developer.android.com/guide/navigation/navigation-getting-started#create-nav-graph) - a resource file that contains all the destinations in an application together with the actions and logical connections required for navigation.
- [NavHost](https://developer.android.com/reference/androidx/navigation/NavHost) - an empty container used to display destinations contained in the navigation graph.
- [NavController](https://developer.android.com/reference/androidx/navigation/NavController) - an object within the `NavHost` that manages navigation.

### Prerequisites
- You should have [Android Studio](https://developer.android.com/studio) installed.
- It would be best to have basic knowledge of creating Android applications.
- A basic knowledge and understanding of Java programming language and XML.

#### Step 1 – Create a New Project
-  Open Android Studio. Select *Start a new Android Studio project* with an Empty Activity. We will name the project **BottomNavigationBar**. Click Finish and wait for the project to build.

![Name the project](/engineering-education/bottom-navigation-bar-in-android/name.jpg)

#### Step 2 – Create a Navigation Graph
In this step, we will create a Navigation Graph. Add the following dependencies in your **app** module level `build.gradle` file:

```gradle
dependencies {
    implementation 'androidx.navigation:navigation-fragment:2.3.1'
    implementation 'androidx.navigation:navigation-ui:2.3.1'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
}
```

Select *Sync Now*.

Right-click the `res` directory, click `New → Android Resource File`.
A menu will pop up.

![NavGraph Menu](/engineering-education/bottom-navigation-bar-in-android/navgraph.jpg)

We will name our resource file **nav_graph.**. For the Resource Type, select **Navigation** and then click `OK`. Next, we will add the destinations.

### Structure of a destination
- ***Name*** - indicates whether a destination is as an activity, fragment, or a custom class.
- ***Label*** - name of the destination's layout resource file.
- ***ID*** - contains an ID used to refer to a destination.
- ***Layout*** – the layout resource file of a destination.

```xml
<?xml version="1.0" encoding="utf-8"?>

<navigation xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   xmlns:tools="http://schemas.android.com/tools"
   android:id="@+id/mobile_navigation"
   app:startDestination="@+id/navigation_home">

   <fragment
       android:id="@+id/navigation_home"
       android:name="com.example.bottomnavigationbar.home"
       android:label="@string/title_home"
       tools:layout="@layout/fragment_home" />

   <fragment
       android:id="@+id/navigation_favourites"
       android:name="com.example.bottomnavigationbar.favourites"
       android:label="@string/title_favourites"
       tools:layout="@layout/fragment_favourites" />

   <fragment
       android:id="@+id/navigation_search"
       android:name="com.example.bottomnavigationbar.search"
       android:label="@string/title_search"
       tools:layout="@layout/fragment_search" />

   <fragment
       android:id="@+id/navigation_profile"
       android:name="com.example.bottomnavigationbar.profile"
       android:label="@string/title_profile"
       tools:layout="@layout/fragment_profile" />

</navigation>
```

#### Step 3 – Create a Bottom Navigation View
In this step, we will add the Bottom Navigation View to our activity's resource file. Add a Bottom Navigation View and a NavHost in your XML Layout file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/myContainer"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingTop="?attr/actionBarSize"
    android:background="@color/white">

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNav_view"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="0dp"
        android:layout_marginEnd="0dp"
        android:background="?android:attr/windowBackground"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:menu="@menu/bottom_nav_menu" />


    <fragment
        android:id="@+id/navHostFragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toTopOf="@id/bottomNav_view"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/nav_graph" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

A NavHost is an empty container used to display destinations from the navigation graph.

**Note: An error for `app:menu="@menu/bottom_nav_menu"` is seen. This is because it does not exist. To solve this, click `Alt`+ `Enter` and select "Create resource file for bottom_nav_menu.xml"**

![Create a resource file](/engineering-education/bottom-navigation-bar-in-android/createmenu.jpg)

This menu will pop up.

![Menu](/engineering-education/bottom-navigation-bar-in-android/menu.jpg)

Select *OK* and the error is fixed.

#### Step 4 - Creating a Fragment
A **Fragment** is a sub-activity. Fragments are used to simplify the reuse of components and logic in different layouts. First, navigate to the Java directory and right-click. Select `New → Fragment →  Fragment(Blank)`.

Name the Fragment and select Finish.

#### Step 5 - Adding Details and Icons to the Bottom Navigation View
First, let us add the icons required. In the `res/drawable` directory, right-click the `drawable` folder.

Select `New → Vector Asset`.

![Vector Asset](/engineering-education/bottom-navigation-bar-in-android/vector.jpg)

- ***Asset type*** - provides an option of using a clipart or uploading a local file.
- ***Name*** - name of the icon.
- ***Size*** - the dimensions of the clipart
- ***Color*** - provides color options for the clipart.
- ***Opacity*** - deals with the visibility of the icon.

Select the icon next to clipart. A list of different clipart is displayed.

![Clipart List](/engineering-education/bottom-navigation-bar-in-android/list.jpg)

One can search for a clipart in the search bar and choose whether the design of the clipart should be filled or outlined. We will use the outlined design.

![Favorites](/engineering-education/bottom-navigation-bar-in-android/favourites.jpg)

Once a clipart is selected, click `OK → Next → Finish`. Open the menu file in `res/menu/bottom_navigation_menu` and add the following lines of code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/navigation_home"
        android:icon="@drawable/ic_outline_home_24"
        android:title="@string/title_home" />
    <item
        android:id="@+id/navigation_search"
        android:icon="@drawable/ic_outline_search_24"
        android:title="@string/title_search" />
    <item
        android:id="@+id/navigation_favourites"
        android:icon="@drawable/ic_baseline_favorite_border_24"
        android:title="@string/title_favourites" />
    <item
        android:id="@+id/navigation_profile"
        android:icon="@drawable/ic_baseline_perm_identity_24"
        android:title="@string/title_profile" />

</menu>

```

The **menu** file serves as a container for menu items. **Item** represents one item on the menu. Each item has a title and an icon.

#### Step 6 - Let's Code.
In our `MainActivity.java` add the following lines of code below:

First, we will initialize the Bottom Navigation view in the Activity's `onCreate` method.
Next, we will initialize an `AppBarConfiguration` object.

It is used to manage the behavior of the icons in the Navigation View. We will then pass the ID of the different destinations in the Bottom Navigation View.

Lastly, we will set up the NavController and link it with the Bottom Navigation View.

```java
        //Initialize Bottom Navigation View.
        BottomNavigationView navView = findViewById(R.id.bottomNav_view);

      //Pass the ID's of Different destinations
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_favourites, R.id.navigation_profile, R.id.navigation_search )
                .build();

        //Initialize NavController.
        NavController navController = Navigation.findNavController(this, R.id.navHostFragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);
```

We are done! Let’s run the app.

![BottomNavigationView](/engineering-education/bottom-navigation-bar-in-android/progress.gif)

Access the source code on [Github](https://github.com/BrianaNzivu/BottomNavigationBar).

Download the sample APK on this [Google Drive](https://drive.google.com/file/d/1UwooVA1SwVelfnnbxm6_ftXWAtX4Te9_/view?usp=sharing).

### To Wrap Up
We just went through the advantages and disadvantages of a Bottom Navigation View and we went through how to integrate a Bottom Navigation View using a Navigation Component to add the Navigation Views in an Android application.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
