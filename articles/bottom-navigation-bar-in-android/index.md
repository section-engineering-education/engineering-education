### Bottom Navigation Bar in Android Applications.
This guide will go over integrating a Bottom Navigation Bar in android applications.

### Introduction
A **Bottom Navigation Bar** is a navigation component that enables users to explore and change to different views in an application.
Selecting a bottom navigation icon enables users to switch to a selected view or refresh an active view.
Bottom Navigation Bars make applications more User Friendly. It also eases the development processes by making code more organized.
A Bottom Navigation Bar is used when an application has the following:
* Three to five views.
* Views that need direct access.

Popular mobile applications that use this navigation component are Instagram, Twitter, Youtube, etc.

![Youtube](/engineering-education/bottom-navigation-bar-in-android/youtube.png)


![Instagram](/engineering-education/bottom-navigation-bar-in-android/instagram.png)


![Twitter](/engineering-education/bottom-navigation-bar-in-android/twitter.png)

### Structure of a Bottom Navigation Bar
A Bottom Navigation bar is made up of a container which contains the following:
* Inactive icon
* Inactive text label (optional)
* Active icon
* Active text label


![Structure of a Bottom Navigation Bar](/engineering-education/bottom-navigation-bar-in-android/structure.png)

### Terminologies
 * [Bottom Navigation Bar](https://material.io/develop/android/components/bottom-navigation)- A navigation component that enables users to explore and change to different views in applications.
 * [Dependency](https://developer.android.com/studio/build/dependencies)-  A statement SDK that allows us to add an external library into our projects.
 * [Fragment](https://developer.android.com/reference/android/app/Fragment)-A Fragment is a sub-activity which enables more modular activity design.
* [FragmentManager](https://developer.android.com/reference/android/app/FragmentManager)- A class used to manage and handle transactions in fragments.
* [FragmentTransaction](https://developer.android.com/reference/android/app/FragmentTransaction)- A class used to provide methods to replace, add, or remove fragments.

### Prerequisites

* [Android Studio](https://developer.android.com/studio) installed.

#### Step 1 – Create a new Project.
In this step, we will [create](https://developer.android.com/studio/projects/create-project) a new Android Studio project.

* Open Android Studio. Select *Start a new Android Studio project* and click on *next*.

![Start a new Android Studio project](/engineering-education/bottom-navigation-bar-in-android/start.png)

Select *Empty Activity* and click on *next*.

![Select Empty Activity](/engineering-education/bottom-navigation-bar-in-android/empty.png)

We will name the project **BottomNavigationBar**. Click on *Finish* and wait for the project to build.

![Name the project](/engineering-education/bottom-navigation-bar-in-android/name.png)

#### Step 2 – Creating a Bottom Navigation Bar.
 In this step, we will add a Bottom Navigation Bar to our activity's resource file. 

Add the following dependency in your **app** module level `build.gradle` file:
```gradle
dependencies {
 implementation 'com.android.support:design:28.0.0'
 implementation 'com.android.support:support-v4:28.0.0'
}
```
Select *Sync Now*.

In your XML Layout file, add a Bottom Navigation Bar.
```xml
<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"

 xmlns:app="http://schemas.android.com/apk/res-auto"

 xmlns:tools="http://schemas.android.com/tools"

 android:layout_width="match_parent"

 android:layout_height="match_parent"

 tools:context=".MainActivity">

 <FrameLayout

 android:id="@+id/container_fragment"

 android:layout_width="match_parent"

 android:layout_height="match_parent"

 android:layout_alignParentTop="true"

 android:layout_alignParentBottom="true"

 android:layout_marginStart="0dp"

 android:layout_marginTop="0dp"

 android:layout_marginEnd="0dp"

 android:layout_marginBottom="0dp">

 </FrameLayout>

 <com.google.android.material.bottomnavigation.BottomNavigationView

 android:id="@+id/nav_view"

 android:layout_width="0dp"

 android:layout_height="wrap_content"

 android:layout_marginStart="0dp"

 android:layout_marginEnd="0dp"

 android:background="@color/colorPrimaryDark"

 app:layout_constraintBottom_toBottomOf="parent"

 app:layout_constraintLeft_toLeftOf="parent"

 app:layout_constraintRight_toRightOf="parent"

 app:menu="@menu/bottom_nav_menu" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
A FrameLayout is used to serve as a container for the different fragments.
* **Note: An error for app:menu=”@menu/bottom_nav_menu" is seen.This is because it does not exist. To solve this, click Alt+Enter and select on “Create resource file for bottom_nav_menu.xml“**

![Create a resource file](/engineering-education/google-authentication-for-android/createmenu.png)

This menu will pop up.

![Menu](/engineering-education/google-authentication-for-android/menu.png)

Select *OK*.
The error is fixed.


#### Step 3 - Adding Details and Icons to the Bottom Navigation Bar.
First, let us add the icons required.

In the `res/drawable` directory, right-click on the `drawable` folder. Select *new* and then select **Vector Asset**.

![Vector Asset](/engineering-education/google-authentication-for-android/vector.png)

* Asset type-Provides an option of using a clipart or uploading a local file.

* Name-Name of the icon.

* Size-The dimensions of the clipart

* Color-Provides color options for the clipart.

* Opacity-Deals with the visibility of the icon.

Select on the icon next to clipart. A list of different cliparts is displayed.

![Clipart List](/engineering-education/google-authentication-for-android/list.png)

One can search for a clipart in the search bar and can also choose whether the design of the clipart should be filled or outlined.

We will use the outlined design.


![Favorites](/engineering-education/google-authentication-for-android/favorites.png)

Once a clipart is selected, select on *OK* then *Next*, and finally *Finish.*

We have created an icon.

Next,open the menu file in `res/menu/ bottom_navigation_menu`
Add the following lines of code:
```xml
<?xml version="1.0" encoding="utf-8"?>

<menu xmlns:android="http://schemas.android.com/apk/res/android">
 <item

 android:id="@+id/home"

 android:enabled="true"

 android:icon="@drawable/ic_outline_home_24"

 android:title="Home"/>

 <item

 android:id="@+id/favourites"

 android:enabled="true"

 android:icon="@drawable/ic_baseline_favorite_border_24"

 android:title="Favorites"/>

 <item

 android:id="@+id/search"

 android:enabled="true"

 android:icon="@drawable/ic_outline_search_24"

 android:title="Search"/>

 <item

 android:id="@+id/person"

 android:enabled="true"

 android:icon="@drawable/ic_baseline_person_outline_24"

 android:title="Profile"/>

</menu>
```
The **menu** file serves as a container for menu items. **Item** represents one item on the menu. Each item has a title and an icon.

#### Step 4 – Let's Code.

In our  `MainActivity.java` add the following lines of code:
First, we will initialize the Bottom Navigation Bar.

```java
//Initialize Bottom Navigation Bar

BottomNavigationView bottomNavigationView;

@Override

protected void onCreate(Bundle savedInstanceState) {

 super.onCreate(savedInstanceState);

 setContentView(R.layout.activity_main);

 bottomNavigationView = (BottomNavigationView) findViewById(R.id.nav_view);

}
```
Next, we will set an `OnNavigationItemSelectedListener` which will be called when a menu item in the Bottom Navigation Bar is selected.

```java
public class MainActivity extends AppCompatActivity {

 //Initialize Bottom Navigation Bar

 BottomNavigationView bottomNavigationView;

 private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener

 = new BottomNavigationView.OnNavigationItemSelectedListener() {

 @Override

 public boolean onNavigationItemSelected(@NonNull MenuItem item) {

 return false;

 }

 };

 @Override

 protected void onCreate(Bundle savedInstanceState) {

 super.onCreate(savedInstanceState);

 setContentView(R.layout.activity_main);

 bottomNavigationView = (BottomNavigationView) findViewById(R.id.nav_view);

 //Set onNavigationItemListener

 bottomNavigationView.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);

 }

}
```
**Note: The error displayed on `=new BottomNavigationView.OnNavigationItemSelectedListener()` requires one to implement the methods required.This can is done by pressing Alt+Enter.**

In the `onNavigationItemSelected` method, we will configure the click events which will enable us to open the assigned view.

```java
@Override

public boolean onNavigationItemSelected(@NonNull MenuItem item) {

 switch (item.getItemId()) {

 case R.id.home:

 Home home = new Home();

 ft.replace(R.id.container_fragment, home);

 ft.commit();

 return true;

 case R.id.profile:

 Profile profile = new Profile();

 ft.replace(R.id.container_fragment,profile);

 ft.commit();

 return true;

 case R.id.search:

 Search search = new Search();

 ft.replace(R.id.container_fragment, search);

 ft.commit();

 return true;

 case R.id.favourites:

 Favourites favourites = new Favourites();

 ft.replace(R.id.container_fragment, favourites);

 ft.commit();

 return true;

 }

 return false;

}
```
#### Step-5 Creating A Fragment.
A fragment is a sub-activity.
Fragments are used in bottom navigation bars to simplify the reuse of components and logic in different layouts.
* First, navigate to the `java` package and right-click. Select *new* and navigate to **Fragment** and select **Fragment(Blank)**.
Name the Fragment and select *finish*.

![Home Fragment](/engineering-education/google-authentication-for-android/fragment.png)

That simple.

Let us navigate back to `MainActivity.java`.The fragments have now been added.

Next, we will add a FragmentManager and a FragmentTransaction which will manage the fragment transactions. We will then make the Home fragment to be the default fragment.

In our `onCreate` method add the following lines of code:

```java
//Add FragmentManager & FragmentTransaction.

FragmentManager fragmentManager = getSupportFragmentManager();

FragmentTransaction ft = fragmentManager.beginTransaction();

//Make Home the default fragment

Home home = new Home();

ft.replace(R.id.container_fragment, home);

ft.commit();
```

Lastly, add the following lines of code in the beginning of the `onNavigationItemSelected` method.

```java
FragmentManager fragmentManager = getSupportFragmentManager();

FragmentTransaction ft = fragmentManager.beginTransaction();
```
We are done!

Let’s run the app.


![Home](/engineering-education/google-authentication-for-android/myhome.jpg)

![Favorites](/engineering-education/google-authentication-for-android/favourites.jpg)

![Search](/engineering-education/google-authentication-for-android/search.jpg)


![Profile](/engineering-education/google-authentication-for-android/profile.jpg)


Access the Source code [here](https://github.com/BrianaNzivu/BottomNavigationBar).


Download the Sample Application [here] (https://drive.google.com/file/d/1qeb3z7RfXaMfMl9I4AhQQYDrbhmem2n0/view?usp=sharing).



