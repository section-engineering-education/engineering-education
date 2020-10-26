### Bottom Navigation Bar in Android Applications.
This article goes through how integrate a Bottom Navigation View. We will use a Navigation Component to add the Navigation Views in Android Applications.

### Introduction
A **Bottom Navigation View** navigation tool that enables users to explore and change to different views in an application.
**Navigation Component** is a set of libraries developed by Google used to manage complex navigation functions like animations, transitions, etc.
Bottom Navigation View was created to make applications more user-friendly during navigation. Before 2017, Fragment Transactions were used to navigate to different fragments in an application. For applications with many fragments, writing fragment transactions became tedious.
In 2017, Google developed the Navigation Component which made the navigation process easier.
Selecting a Bottom Navigation View icon enables users to switch to a selected view or refresh an active view.
We use a Bottom Navigation View when an application has the following:
* Three to five views.
* Views that need direct access.

Popular mobile applications that use this navigation component are Instagram, Twitter, Youtube, etc.

![Youtube](/engineering-education/bottom-navigation-bar-in-android/youtube.jpg)

![Instagram](/engineering-education/bottom-navigation-bar-in-android/instagram.jpg)


![Twitter](/engineering-education/bottom-navigation-bar-in-android/twitter.jpg)

### Structure of a Bottom Navigation Bar
A Bottom Navigation bar is made up of a container which contains the following:
* Inactive icon
* Inactive text label (optional)
* Active icon
* Active text label


![Structure of a Bottom Navigation Bar](/engineering-education/bottom-navigation-bar-in-android/structure.jpg)

### Structure of a Navigation Component.
A  Navigation component consists of the following:
* Navigation graph
* NavHost
* NavController

### Advantages of a Bottom Navigation View using a Navigation Component.

* Makes applications more user friendly.
* Eases the development processes of an application.
* Enables implementing and handling Deep Linking.
* Enables handling of fragment transactions.
* Offers View Model support
* Offers animations and transitions support.


### Disadvantages of a Bottom Navigation View using a Navigation Component.

* Cannot be used in applications with less than three destinations.
* Limited to only Mobiles and Tablets.
* It is difficult to implement a TabLayout




### Terminologies
 * [Bottom Navigation Bar](https://material.io/develop/android/components/bottom-navigation)- A navigation component that enables users to explore and change to different views in applications.
 * [Dependency](https://developer.android.com/studio/build/dependencies)-  A statement SDK that allows us to add an external library into our projects.
 * [Fragment](https://developer.android.com/reference/android/app/Fragment)-A Fragment is a sub-activity which enables more modular activity design.
* [Navigation Component](https://developer.android.com/guide/navigation/navigation-getting-started)-A resource file that contains information used for navigation.
* [Navigation Graph](https://developer.android.com/guide/navigation/navigation-getting-started)- A resource file that contains information used for navigation.
* [NavHost](https://codeburst.io/android-tutorial-how-to-implement-android-jetpack-navigation-component-in-your-app-9030518639ac)- An empty container used to display destinations contained in the navigation graph.
* [NavController](https://developer.android.com/guide/navigation/navigation-getting-started)-An object within the NavHost which manages navigation.


### Prerequisites

* [Android Studio](https://developer.android.com/studio) installed.

#### Step 1 – Create a new Project.

* Open Android Studio. Select *Start a new Android Studio project* and click on *next*.

![Start a new Android Studio project](/engineering-education/bottom-navigation-bar-in-android/start.jpg)

Select *Empty Activity* and click on *next*.

![Select Empty Activity](/engineering-education/bottom-navigation-bar-in-android/empty.jpg)

We will name the project **BottomNavigationBar**. Click on *Finish* and wait for the project to build.

![Name the project](/engineering-education/bottom-navigation-bar-in-android/name.jpg)

#### Step 2 – Create a Navigation Graph.
In this step, we will create a Navigation Graph.

Add the following dependencies in your **app** module level `build.gradle` file:
```gradle

dependencies {

implementation 'androidx.navigation:navigation-fragment:2.3.1'
implementation 'androidx.navigation:navigation-ui:2.3.1'
implementation 'androidx.legacy:legacy-support-v4:1.0.0'
}
```
Select *Sync Now*.

Right-click on the res directory, click New and select Android Resource File.
A menu will pop up.

![NavGraph Menu](/engineering-education/bottom-navigation-bar-in-android/navgraph.jpg)

We will name our resource file **nav_graph.**

For the Resource Type select **Navigation** and then click OK.

Next, add the destinations.

### Structure of a destination.


* Name- Indicates whether a destination is as an activity, fragment, or a custom class.

* Label- Name of the destination's Layout resource file.

* ID- Contains an ID used to refer to a destination.

* Layout – The layout resource file of a destination.


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

### Step 3 – Create a Bottom Navigation View.

In this step, we will add the Bottom Navigation View to our activity's resource file.

In your XML Layout file, add a Bottom Navigation View and a NavHost.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingTop="?attr/actionBarSize"
    android:background="@color/white">
    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/nav_view"
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
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toTopOf="@id/nav_view"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/nav_graph" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
A NavHost is an empty container used to display destinations from the navigation graph

**Note: An error for app:menu="@menu/bottom_nav_menu" is seen.This is because it does not exist. To solve this, click Alt+Enter and select "Create resource file for bottom_nav_menu.xml"**


![Create a resource file](/engineering-education/bottom-navigation-bar-in-android/createmenu.jpg)

This menu will pop up.

![Menu](/engineering-education/bottom-navigation-bar-in-android/menu.jpg)

Select *OK*.
The error is fixed.

### Step 4 -Creating A Fragment.
A **Fragment** is a sub-activity.

Fragments are used to simplify the reuse of components and logic in different layouts.

First, navigate to the java directory and right-click. Select *New*, Click on *Fragment*, and select *Fragment(Blank)*.

Name the Fragment and select *Finish.*


That simple.

### Step 5 - Adding Details and Icons to the Bottom Navigation View
First, let us add the icons required.

In the `res/drawable` directory, right-click on the `drawable` folder. Select *new* and then select **Vector Asset**.

![Vector Asset](/engineering-education/bottom-navigation-bar-in-android/vector.jpg)

* Asset type-Provides an option of using a clipart or uploading a local file.

* Name-Name of the icon.

* Size-The dimensions of the clipart

* Color-Provides color options for the clipart.

* Opacity-Deals with the visibility of the icon.

Select on the icon next to clipart. A list of different cliparts is displayed.

![Clipart List](/engineering-education/bottom-navigation-bar-in-android/list.jpg)

One can search for a clipart in the search bar and can also choose whether the design of the clipart should be filled or outlined.

We will use the outlined design.

![Favorites](/engineering-education/bottom-navigation-bar-in-android/favorites.jpg)

Once a clipart is selected, select on *OK* then *Next*, and finally *Finish.*

We have created an icon.

Next,open the menu file in `res/menu/ bottom_navigation_menu`
Add the following lines of code:

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
In our  `MainActivity.java` add the following lines of code:
First, we will initialize the Bottom Navigation view in the Activity's `onCreate` Method

```java
//Initialize Bottom Navigation View

BottomNavigationView navView = findViewById(R.id.bottomNav_view);
```

Next, we will initialize an AppBarConfiguration object which is used to manage the behavior of the icons in the Navigation View.

```java
AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder
```
Next, we will pass the ID of the different destinations in the Bottom Navigation View.
```java
  R.id.navigation_home, R.id.navigation_favourites, R.id.navigation_profile, R.id.navigation_search )
        .build();
```
Then set up the NavController and link it with the Bottom Navigation View.

```java
//Initialize NavController.
NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
NavigationUI.setupWithNavController(navView, navController);
```

We are done!

Let’s run the app.


![Home](/engineering-education/bottom-navigation-bar-in-android/myhome.jpg)

![Favorites](/engineering-education/bottom-navigation-bar-in-android/favourites.png)

![Search](/engineering-education/bottom-navigation-bar-in-android/search.jpg)

![Profile](/engineering-education/bottom-navigation-bar-in-android/profile.jpg)


Access the Source code [here](https://github.com/BrianaNzivu/BottomNavigationBar).

Download the Sample Application [here] (https://drive.google.com/file/d/1UwooVA1SwVelfnnbxm6_ftXWAtX4Te9_/view?usp=sharing).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
