---
layout: engineering-education
status: publish
published: true
url: /collapsing-action-tool-bar-with-android-material-design-in-kotlin/
title: How to Implement Collapsing Toolbar with Material Design in Kotlin
description: This tutorial will walk the reader through how to implement collapsing action toolbar with Material Design in Kotlin.
author: david-maish
date: 2022-03-21T00:00:00-13:25
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/collapsing-action-tool-bar-with-android-material-design-in-kotlin/hero.jpg
    alt: Collapsing Toolbar with Material Design in Kotlin Hero Image
---
A collapsing toolbar layout widget can be used along with a basic toolbar widget to create a more sophisticated version of the regular toolbar. 
<!--more-->
Expanding and collapsing toolbar on-screen scrolling is a fantastic toolbar motion made possible by this widget, it automatically increases the toolbar size set in the app bar layout widget.

In this tutorial, we will build an application that utilizes the collapsing toolbar layout widget, our app will also include the new Android's design support library to create scrolling effects that are eye-catching animations using the palette API. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Setting up the project environment](#setting-up-the-project-environment)
- [Adding the appropriate dependencies](#adding-the-appropriate-dependencies)
- [Designing the XML layout](#designing-the-xml-layout)
- [Writing Kotlin code](#writing-kotlin-code)
- [Testing the application](#testing-the-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader will need the following:
- A basic background knowledge in [Kotlin](https://developer.android.com/courses/android-basics-kotlin/course).
- [Android Studio](https://developer.android.com/studio/index.html) installed on your computer.
- A virtual device (emulator) downloaded in your IDE. (Optional)

### Setting up the project environment
- Open Android studio.
- Click create a `new project`.
- Select `Empty Activity` -> Next in the project template dialogue box.
- Choose a suitable name for the project. In this tutorial, we will name ours “Collapsing Toolbar”.
- Choose `Kotlin` as the default language for the project.
- Click “Finish” to complete the setup.

### Adding the appropriate dependencies
In the “Gradle Scripts”, double-click `build.gradle(Module: app)` and add the following plugin.

```Kotlin
plugin{
  id 'kotlin-android-extensions'
}
```

The plugin above will help you access all elements id's in the XML layout when writing Kotlin code in the main activity.

Ensure you also add the following dependencies.

```Kotlin
//Material
implementation 'com.google.android.material:material:1.2.1'
//Palette
implementation 'androidx.palette:palette-ktx:1.0.0'
```

The two dependencies ensure that Android apps are developed safely and securely and work with color palette API.

### Designing the XML layout
#### Key attributes for our XML
> Note: Please read the following terminologies to understand how the application design layout works.

- `android:fitsSystemWindows` - It configures the view padding to ensure it keeps system windows from being obscured by content when set to `true`.
- `app:layout_scrollFlags` - When set to `scroll|exitUntilCollapsed|snap`, it means that the collapsing toolbar can be in scroll mode; we can enhance it by nested scroll view being scrolled up. Whenever it is fully collapsed, it snaps depending on the severity of the scroll and can return to the expanded mode when the nested scroll view is scrolled down.
- `app:layout_collapseMode` - When set to `Parallax` means that the content advances faster than CollapsingToolbarLayout. When set to `Pin`, it means that, as long as the collapsible toolbar is active, the content will not change. When the bottom of the toolbar is aligned with the bottom of the screen, it begins to move.
- `android:contentInsetStartWithNavigation` - This means that the content of the view in a bar with a navigation button has a minimum inset (like Up) and is only utilized in API levels 24 or greater. 
- `android:justificationMode` - It is a new feature that only applies to devices with Android 8.0 and above that improves the user's experience by making data easier to understand. In our case, we shall set it to “Inter_word”.

#### Key design layouts for our application
- `androidx.coordinator layout` - Depending on the interactions by anchored views, it performs various activities. It will help in anchoring all other layout widgets.
- `AppBarLayout` - It will contain current screen actions. If interested, you can add logos and titles. In our case, it will only have the title of the application. It uses the programming concept of inheritance, where the child will inherit the properties and methods from the parent.
- `Collapsing toolBar layout` - Here a “Frame Layout” collapses after a scrolling flag is specified and snaps the contents whenever it reaches a collapsing limit.
- `Nested scroll view` - This provides a smooth scrolling effect to the contents inside the content area.
- `Linear layout` - This sets the orientation of the content inside the content area to either horizontal or vertical orientation.

#### Designing of the XML
- Start by creating a title resource file in the drawable package. 

Follow these steps below:
Navigate to project -> App -> Res -> Drawable. Right-click drawable file -> New -> Drawable Resource File -> Set file name to `title_background` -> OK. Write the following code. 

```Kotlin
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <gradient
        android:angle="90"
        android:endColor="@android:color/transparent"
        android:startColor="@color/colorDarkSemiTransparent"/>
</shape>
```

The actual layout of the title background should look like the one shown below.

![Title background](/engineering-education/collapsing-action-tool-bar-with-android-material-design-in-kotlin/title-bg.png)

Ensure you change from `selector` to `shape` as shown above. The above code will modify the title background to how it will appear in the collapsing toolbar. It will be rectangle in shape. 

It will also contain multiple colors, i.e., a gradient with the upper-most color of the rectangle being `transparent` and the half bottom-wise of the rectangle being `colorDarkTransparent`, which we have to include in the Res -> Values -> Color as a color resource, i.e.,

```Kotlin
 <color name="colorDarkSemiTransparent">#C6000000</color>
```

- You also need to add a vector asset. This image will be displayed in the collapsing toolbar layout. It will help provide the visible collapsible color effects of the toolbar when entirely collapsed and expanded, i.e., using `palette API`.
Add the image by pasting it in the drawable folder initially copied from the image location. 

You can also [learn more here](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjzgMPAydT1AhWSxYUKHexgDiUQFnoECAIQAQ&url=https%3A%2F%2Fdeveloper.android.com%2Fguide%2Ftopics%2Fgraphics%2Fdrawables&usg=AOvVaw37IK1RuzxHDfhc2kNZIXiY).

- Now in the Res -> Layout -> `Activity main.xml` add this complete code to design the application.

```Kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".MainActivity">
    <com.google.android.material.appbar.AppBarLayout
        android:id="@+id/appBarLayout"
        android:layout_width="match_parent"
        android:layout_height="300dp"
        android:fitsSystemWindows="true"
        android:theme="@style/ThemeOverlay.MaterialComponents.Dark">
        <com.google.android.material.appbar.CollapsingToolbarLayout
            android:id="@+id/collapsingToolbar"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:fitsSystemWindows="true"
            app:contentScrim="@color/purple_200"
            app:expandedTitleMarginBottom="25dp"
            app:expandedTitleMarginStart="15dp"
            app:layout_scrollFlags="scroll|exitUntilCollapsed|snap">
            <ImageView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:contentDescription="@string/app_name"
                android:scaleType="centerCrop"
                android:src="@drawable/image"
                app:layout_collapseMode="parallax"/>
            <View
                android:layout_width="match_parent"
                android:layout_height="100dp"
                android:layout_gravity="bottom"
                android:background="@drawable/title_background"/>
            <Toolbar
                android:id="@+id/toolBarLayout"
                android:layout_width="match_parent"
                android:layout_height="?actionBarSize"
                android:contentInsetStart="0dp"
                android:contentInsetStartWithNavigation="0dp"
                app:layout_collapseMode="pin"
                android:popupTheme="@style/ThemeOverlay.MaterialComponents.Light"/>
        </com.google.android.material.appbar.CollapsingToolbarLayout>
    </com.google.android.material.appbar.AppBarLayout>
    <androidx.core.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:overScrollMode="never"
        app:layout_behavior="com.google.android.material.appbar.AppBarLayout$ScrollingViewBehavior">
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="15dp">
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="0dp"
                android:text="@string/about_david"
                android:textColor="@color/black"
                android:textSize="25sp"
                android:fontFamily="cursive"
                android:textStyle="bold"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/my_story"
                android:textSize="15sp"
                android:textColor="@color/black"
                android:justificationMode="inter_word"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/my_story"
                android:textSize="15sp"
                android:textColor="@color/black"
                android:justificationMode="inter_word"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/my_story"
                android:textSize="15sp"
                android:textColor="@color/black"
                android:justificationMode="inter_word"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/my_story"
                android:textSize="15sp"
                android:textColor="@color/black"
                android:justificationMode="inter_word"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/my_story"
                android:textSize="15sp"
                android:textColor="@color/black"
                android:justificationMode="inter_word"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/my_story"
                android:textSize="15sp"
                android:textColor="@color/black"
                android:justificationMode="inter_word"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/my_story"
                android:textSize="15sp"
                android:textColor="@color/black"
                android:justificationMode="inter_word"/>
        </LinearLayout>
    </androidx.core.widget.NestedScrollView>
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

Your design should look like the image below.

![Design layout preview](/engineering-education/collapsing-action-tool-bar-with-android-material-design-in-kotlin/design.png)


### Writing Kotlin code
#### Displaying contents in the Toolbar layout
In the `Main Activity.kt` write the following code.

```Kotlin
 val toolbar:Toolbar = findViewById(R.id.toolBarLayout)
        setSupportActionBar(toolbar)
        supportActionBar?.setDefaultDisplayHomeAsUpEnabled(true)
```

The code above will first call the toolbar by its id from the XML layout with the help of the android extension we added in the `plugins`. It will then tell the Activity that you'd like to use the functionality of the Toolbar. 

Similar to when you want to set a title to the toolbar, or you want to add icons in the toolbar by setting the `setSupportActionBar(toolbar)` method. We can now display the app-name in the toolbar inside the title_backgroud we designed in the drawable resource file.

#### Toolbar coloring using Palette API
Below the displaying contents in the toolbar layout code, write the following code to enable the toolbar coloring according to the image background.

```Kotlin
 val bitmap: Bitmap = BitmapFactory.decodeResource(resources, R.drawable.image)
        Palette.from(bitmap).generate { palette ->
            if (palette != null){
                collapsingToolbar.setContentScrimColor(palette.getVibrantColor(R.attr.colorPrimary))
            }
        }
```

To use the Palette API, you must first supply it with a bitmap. The API then uses the picture to produce colors, i.e., `Palette.from(bitmap).generate`.
Then we use the if statement to find whether the image has a primary color. If it has the main color (primary color), the color is set to be the content scrim color of the toolbar.

### Testing the application
We need an emulator (virtual device) installed in the computer or an actual physical device. 

Your final app should look like the images below.

![Actual design in a device or Emulator](/engineering-education/collapsing-action-tool-bar-with-android-material-design-in-kotlin/actual.png)

![Collapsed action bar](/engineering-education/collapsing-action-tool-bar-with-android-material-design-in-kotlin/collapsed.png)

![Scrollable Nested layout](/engineering-education/collapsing-action-tool-bar-with-android-material-design-in-kotlin/nested.png)

### Conclusion
We have created a collapsing toolbar and used the design libraries and the Palette API to design catchy color animations. For a scrolling effect on the content, you can also try other elements such as [recycler view](/engineering-education/search/?q=recycler%20view). In the toolbar, you can add elements too, such as a back icon a menu to enhance your coding skills.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
