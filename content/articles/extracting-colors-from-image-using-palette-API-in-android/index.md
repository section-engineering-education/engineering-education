---
layout: engineering-education
status: publish
published: true
url: /extracting-colors-from-image-using-palette-api-in-android/
title: Extracting Colors from Images using the Palette API in Android
description: This tutorial will take the reader through the process of extracting colors from images using the Palette API in Android. Palette is a powerful support library for Android that allows you to extract prominent colors from images and apply them to your UI.
author: robert-muriithi
date: 2021-09-13T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/extracting-colors-from-image-using-palette-api-in-android/hero.png
    alt: Extracting Colors from Images using the Palette API in Android image
---

User Interface (UI) is very important when developing Android apps. Many developers tend to neglect this aspect. A great UI  gives the user a great experience. Color selection in an app is very crucial in making it successful.
<!--more-->
In this tutorial, we will extract colors to use in our app from an image.

### Prerequisites
To follow along with this tutorial, the reader should:
- Have `Android Studio` installed and know how to create Android projects.
- Have a good understanding of the [Kotlin](https://developer.android.com/kotlin) programming language.
- Have a good understanding of `XML`.
- Be able to use [ViewBinding](https://developer.android.com/topic/libraries/view-binding).
- Have a basic knowledge on `Android Toolbar`.

### Goals
By the end of this tutorial, the reader should:
- Have an understanding of what `Palette API` is.
- Know how to set up the Palette API library.
- Know how to extract colors from an image using the Palette API.

### What is Palette?
Palette is a support library in Android. It extracts prominent colors from Bitmap images. We can use it in styling view components in the app. 

The views matche the prominent color from the image. For instance, the toolbar, background, or even text color.

### Advantages of Using Palette API
- It provides a helper class to extract prominent colors from an image.
- We can use colors obtained to make elegant application UI designs.
- We can customize the color Palette using in-build methods. For instance, adding filters and much more.

### Step 1. Create a new Android project
Launch Android Studio, select `New Project` then `Empty Activity`. Name it `Palette Demo`. Click *finish* and wait for it to build.

![Create Project](/engineering-education/extracting-colors-from-image-using-palette-api-in-android/create_project.png)

### Step 2: Set up the Palette library
Add the following dependency in the app-module level `build.gradle` file.

```gradle
implementation("com.android.support:palette-v7:28.0.0")
```

### Step 3: Set up the layout for our project
In this step, we will design the UI. This will contain a `ToolBar`, an `ImageView`, a `Button`, and `TextViews`.

#### ActivityMain.xml file
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   xmlns:tools="http://schemas.android.com/tools"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   tools:context=".MainActivity">

   <com.google.android.material.appbar.AppBarLayout

       android:id="@+id/appBarLayout"
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:theme="@style/Theme.MyApplication.AppBarOverlay"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toTopOf="parent">
       
       <androidx.appcompat.widget.Toolbar
           android:id="@+id/toolbar"
           android:layout_width="match_parent"
           android:layout_height="?attr/actionBarSize"
           android:background="?attr/colorPrimary"
           app:popupTheme="@style/Theme.MyApplication.PopupOverlay" />
   </com.google.android.material.appbar.AppBarLayout>

   <ImageView
       android:id="@+id/imageView"
       android:layout_width="match_parent"
       android:layout_height="250dp"
       android:src="@drawable/index"
       app:layout_constraintTop_toBottomOf="@+id/appBarLayout"
       tools:layout_editor_absoluteX="26dp" />

   <Button
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:text="Change Toolbar Color"
       android:textSize="18sp"
       android:layout_marginTop="8dp"
       android:textAllCaps="false"
       android:id="@+id/change_toolbar_color_btn"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/imageView"/>

   <TextView
       android:id="@+id/lightVibrant"
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:layout_marginTop="8dp"
       android:gravity="center"
       android:text="Light Vibrant"
       android:textAllCaps="false"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/change_toolbar_color_btn" />

   <TextView
       android:id="@+id/vibrant"
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:layout_marginTop="8dp"
       android:gravity="center"
       android:text="Vibrant"
       android:textAllCaps="false"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/lightVibrant" />

   <TextView
       android:id="@+id/lightMuted"
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:layout_marginTop="8dp"
       android:gravity="center"
       android:text="Light Muted"
       android:textAllCaps="false"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/vibrant" />

   <TextView
       android:id="@+id/muted"
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:layout_marginTop="8dp"
       android:gravity="center"
       android:text="Muted"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/lightMuted" />

   <TextView
       android:id="@+id/darkMuted"
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:layout_marginTop="8dp"
       android:gravity="center"
       android:text="Dark Muted"
       android:textAllCaps="false"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/muted" />

   <TextView
       android:id="@+id/darkVibrant"
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:layout_marginTop="8dp"
       android:gravity="center"
       android:text="Dark Vibrant"
       android:textAllCaps="false"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/darkMuted" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create a Palette object
A palette object allows us to access the prominent colors in an image bitmap. We use palettes to style our application by changing the application's color scheme based on the image bitmap.

To create a palette, we generate an instance using `from(bitmap: Bitmap)` method. This creates a `Builder` from a bitmap. 

The builder either generates synchronous or asynchronous palettes. To create a palette on the same thread as the method we are invoking, we use synchronous palette .To create a palette on another thread, we use asynchronous palette. 

The`onGenerated()` method is used to access the palette.
 
To create a synchronous palette, we use:

```kotlin
// Synchronous Palette generated and returned
fun createPaletteSync(bitmap: Bitmap): Palette = Palette.from(bitmap).generate()
```

To create an asynchronous palette, we use:

```kotlin
// Palette created asynchronously. We use it on another thread using onGenerated() method
fun createPaletteAsync(bitmap: Bitmap) {
   Palette.from(bitmap).generate { palette ->
       // Use the generated instance
   }
}
```

To generate a palette, I would suggest using asynchronous technique. Synchronous generation may not create a smooth experience. This is evident on older devices or when the Bitmap object is relatively large.

### Step 5: Extracting color profiles
A `Target` defines each color extracted. We score the colors against the profile. This is done based on the saturation and the number of pixels in the bitmap image.

The palette extracts the following **six color profiles** using the respective methods:
- Light Vibrant : `Palette.getLightVibrantSwatch()`
- Dark Vibrant: `Palette.getDarkVibrantSwatch()`
- Vibrant: `Palette.getVibrantSwatch()`
- Light Muted: `Palette.getLightMutedSwatch()`
- Dark Muted: `Palette.getDarkMutedSwatch()`
- Muted: `Palette.getMutedSwatch()`

We are going to use swatches to get colors from the bitmap image. We use `Palette.Swatch` object to get each color profile. The palette has other methods for accessing more information about the color profiles.

They include:
- `getPopulation` gets the amount of pixels represented by this swatch.
- `getRgb` gets the color RGB value.
- `getBodyTextColor` and `getTitleTextColor` get text color RGB value for use over the swatch’s color.

The `get<Profile>Swatch` method usually needs no parameter. But, it may return null if a particular profile is not present in the bitmap image. Before accessing a swatch, first, check if it is null or not to prevent your app from crashing.

The following code checks if the swatch is present in the image bitmap. Otherwise, the default background color is set to Gray.

```kotlin
if(palette?.lightMutedSwatch != null){
   setBackgroundColor(palette?.lightMutedSwatch!!.rgb
}
else{
    setBackgroundColor(Color.GRAY)
}
```

Here is the main activity's code:

#### ActivityMain.kt file
```kotlin
// Press Alt + Enter to import the libraries

class MainActivity : AppCompatActivity() {

   private lateinit var binding: ActivityMainBinding
   private val TAG = "MainActivity"
   
   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)

       binding = ActivityMainBinding.inflate(layoutInflater)
       setContentView(binding.root)

       setSupportActionBar(binding.toolbar)
       createPaletteAsync((ContextCompat.getDrawable(this,R.drawable.index) as BitmapDrawable).bitmap)
   }

   private fun createPaletteAsync(bitmap: Bitmap) {
       Palette.from(bitmap).generate(){ palette ->
           // Change toolbar background color
           binding.changeToolbarColorBtn.setOnClickListener {
               binding.toolbar.setBackgroundColor(palette?.vibrantSwatch!!.rgb)
           }

           binding.lightVibrant.apply {
               setBackgroundColor(palette?.lightVibrantSwatch!!.rgb)
           }

           binding.vibrant.apply {
               setBackgroundColor(palette?.vibrantSwatch!!.rgb)
           }

           binding.lightMuted.apply {
               if(lightVibrantSwatch != null ){
                   setBackgroundColor(palette?.lightMutedSwatch!!.rgb)
               }
               else{
                   setBackgroundColor(Color.Grey)
               }
           }

           binding.muted.apply {
               setBackgroundColor(palette?.mutedSwatch!!.rgb)
           }   

           binding.darkMuted.apply {
               setBackgroundColor(palette?.darkMutedSwatch!!.rgb)
           }

           binding.darkVibrant.apply {
               setBackgroundColor(palette?.darkVibrantSwatch!!.rgb)
           }
       }
   }
}
```

### Demo Screens
Upon running the app, this is what to expect:

![Screen one](/engineering-education/extracting-colors-from-image-using-palette-api-in-android/screen_one.png)

![Screen two](/engineering-education/extracting-colors-from-image-using-palette-api-in-android/screen_two.png)

### Conclusion
The Palette library is a powerful tool that we can use to make elegant UI designs in Android apps. It opens doors to infinite possibilities when it comes to the set up of colors and themes. 

Use this tool to materialize your application as you continue exploring and learning.

Check out the entire project on [this GitHub repository](https://github.com/robert-muriithi/PaletteApiDemo).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
