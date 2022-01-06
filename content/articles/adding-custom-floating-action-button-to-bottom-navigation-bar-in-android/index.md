### Introduction
Triggering actions in an Android app is a critical factor to consider while designing an Android app. Throughout the number of situations, buttons are thought to fulfill this purpose properly and efficiently.
In an Android application, buttons such as 'compoundButton,' 'ToggleButton,' and 'RadioButton' are employed.
In this scenario, we'll discuss a unique button known as the 'Floating Action Button' (FAB).

Floating Action Buttons, or 'FAB,' are unique from other user interface elements. This button is a circular button with a centralized icon that appears on top of all screen content. It encourages users to take a range of actions, such as adding an item to a to-do list.

The forms of Floating action buttons are:-
- `Regular FABs`- This type of floating action button does not have any extensions and is of standard size.
- `Mini FABs` - This form of FAB are always thought to be employed on a small screen to offer visual variety.
- `Extended FABs` - This type of button is larger and has text labels embedded into it.

### Prerequisites

To follow along, you need:
- Basic understanding of [Kotlin](https://kotlinlang.org/) programming language
- Basic knowledge of the fundamentals of android development.

### Goal
At the end of this tutorial, the reader will be able to understand how to use material design components, how to create a bottom navigation bar, and how to add a floating action button to the bottom navigation bar

### Lets Get Coding

### Step 1: Creating a new project
To create a new project go to File >New >New Project>Empty Activity then next

![creating a project](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/creating_project.jpg)

Give the project a descriptive name, such as FloatingActionButton, and then choose a programming language to use, which in this case is 'kotlin.' Finally, click Finish to complete the project creation.


### Step 2: Adding Material Design Dependencies

To add Material Design Dependencies, click on the Gradle Script file > build.Gradle(Module. app). Under plugins add `id 'kotlin-android-extensions` then under dependencies, add the material design dependencies as shown below, and Sync

```gradle
implementation 'com.google.android.material:material:1.3.0-alpha03'.
```


### Step 3: Creating a menu for BottomNavigationView

To create an Android Resource File, go to the res directory, then New, then Android Resource File. Choose a Resource Type that is the menu from the drop-down menu and give a descriptive file a name, such as 'bottom menu nav,' then click Ok. Assemble your menu as follows:

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
### Step 4: Importing icons
Let's add some icons to our BottomNavigationView now. We'll bring in five icons, four for our BottomNavigationView and one for our Floating Action Button. To achieve this, go to the res directory, right-click on 'drawable', then choose New > Vector Asset from the menu. as seen in the diagram below

![Icons](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/adding_vectors_asset.jpg)

Now go to the clip art icon and click it. Search for a home icon, then choose it and click OK. Change the name to ic home, then click Next and Finish to complete the process.
Follow the same procedure and add the remaining icons that are search icon, person icon, setting  icon and add icon
>Note you can add icons that best fit your needs

### Step 5: Designing The User Interface with FAB
The user interface allows users to interact with the program. It is always necessary to design the user interface, and in our case, the application interface should look like this.

![Ui](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/ui.jpg)

The background of a Floating Action Button should contrast with the application's color scheme. We can do this by customizing the Floating Action Button color using the `color accent` attribute.  

> Note that a `Bottom Navigation Bar` can contain a single task or component. However, it's advisable to include at least three destination icons.


### Step 6: Applying the Required Theme
To use our theme, we use Theme components to change it, under res file, select value then theme/style.xml.
Change the parent = `Theme.MaterialComponents.DayNight.DarkActionBar` to parent=`Theme.MaterialComponents`.Note that `BottomNavigationBar` has a shadow which off course we don,t require.
To remove the shadow, include the following line of code in the `MainActivity.kt` file
```kotlin
bottomNavView.background = null
```

### Step 7: MainActivity Class
The bottom navigation code and floating button implementation should be included in the Main Activity file, as illustrated below.
``` kotlin
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

### Demo
This is the expected output after running your application

![FAB demo](engineering-education/adding-custom-floating-action-button-to-bottom-navigation-bar-in-android/FAB.mp4)

### Conclusion
In this tutorial. we have discussed what is FABs as used in android. The forms of floating action buttons. How to create bottom navigation with FAB and how to implement FABs in android. Get the full implementation of this code on [GitHub](https://github.com/jackline-ke/FloatingActionButton2)

### Reference
-[Material design](https://material.io/components/app-bars-bottom)

-[Android Developers](https://developer.android.com/guide/topics/ui/floating-action-button)
