### Adding A Centered Custom Floating Action Button To Bottom Navigation Bar(Android)
A Floating Action Button varies from other buttons. FAB is a circular shape button with a centralized icon that appears in front of all screen content. This promotes users action, including adding an item to an existing list.

### What we need
- Have some knowledge in `Kotlin`
- Know how to create an Android project in `Android Studio`
- Know how to create a bottomNavigationBar

### Goal
- Adding a material design component. 
- Creating a bottom navigation bar.
- Adding a centered floating action button to a bottom navigation bar.

### Introduction
In this tutorial we are going to learn how to add a custom floating action button to a bottom navigation bar.

A bottom navigation bar is a bar that usually appears at the bottom of a screen. It contains destination icon. To make it more appealing, we add a floating action button.
 
Floating action button(FAB) is a circular shaped button that has a centered icon in it. It usually appears in front of a screen and performs an action in an application when triggered.
  
### What is a Floating Action Button
There are three forms of FAB; Regular, Mini and Extended floating action button. In this article we are going to focus on the regular FAB centered in a Bottom Navigation Bar.

The area behind the Floating Action Button should contrast with application's color scheme. We can do this by customizing the Floating Action Button color. This is usually colored by colorAccent attribute. We can customize the colorAccent attribute with the theme color palette.

### What is a Bottom Navigation Bar
Bottom Navigation Bar it is a view that comes from Material Design Library. It is usually added using BottomNavigationView. In your build.gradle, make sure you have design support library. It can contain only a single task. Yet, it is advisable that it should contain at least three destination icons.

### Coding
Let us dive into coding and create our custom Floating Action Button.

### Step 1: Create new project
- Click on File -> New -> New Project
- Select Empty Activity then click Next
![creating a project](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/creating_project.png)
- Give a name to your new project for example, floatingActionButton
- On the same window, on Languages, select Kotlin as the language
- Then click Finish

### Step 2: Add Material Design Dependencies
- Click on the Gradle Script file.
- Then click on the build.gradle(Module.floatingActionButton.app).
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
- On the res file, right click on drawable-> New -> Vector Asset.
![creating a project](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/ading_vectorsAsset.png)
- On the Clip Art, click on the clip art icon.
- Search for a home icon select it then click Ok.
- Change the Name to ic_home then click Next.
- On the next window, click Finish. 
- We are going to use the same process to import the four other icons: search icon, person icon, setting icon and add icon.
- The add icon is what we are going to add to our Floating Action Button.
- If we have imported the five icons, we are good to go.

### Step 4: Let us create a Menu for our bottomNavigationView
- On the res file, right click on it -> New -> Android Resource File.
![creating a res file](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/adding_android_resource_file.png)
- On the Resource Type select menu.
- Give your a file name for example bottom_menu_nav, then cick Ok.
![bottom_menu_nav](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/bottom_menu_nav.png)
- We can then see the design. 
- Click on the code so that in the xml file, we can create the single items that will on our menu.
- Write the following xml code:

``` xml
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
            android:id="@+id/bottomNavView"
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

    <item android:id="@+id/bnbMenuHome"
        android:title="Home Icon"
        android:icon="@drawable/ic_home_bnb"/>

    <item android:id="@+id/bnbMenuSearch"
        android:title="Search Icon"
        android:icon="@drawable/ic_search_bnb"/>

    <item android:id="@+id/bnbMenuPlaceholder"
         android:title=""/>

    <item android:id="@+id/bnbMenuPerson"
        android:title="Profile Icon"
        android:icon="@drawable/ic_person_bnb"/>

    <item android:id="@+id/bnbMenuSetting"
        android:title="Setting Icon"
        android:icon="@drawable/ic_settings_bnb"/>

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

        bottomNavView.background = null
        bottomNavView.menu.getItem(2).isEnabled = false
 
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
This is not the only thing to know about floating action buttons. Keep exploring and learn more.

### Reference
-[material design](https://material.io/components/app-bars-bottom)
-[android developers](https://developer.android.com/guide/topics/ui/floating-action-button)

