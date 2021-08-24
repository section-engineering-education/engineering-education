### Extracting colors from images using palette API(Application Development Interface) in android

User Interface(UI) is very important when developing android apps. Yet, many developers tend to neglect this aspect . A great UI  gives the user a great experience. Colors selection to an app is very crucial to make an app successful. In this tutorial, we will extract colors for use in our app from the image.

### Prerequisites

To follow along with this tutorial, the reader should:
- Have installed `Android Studio` and 	know how to create a project
- Have an understanding of `Kotlin`programming language.s
- Have an understanding on the use of `XML` in designing layouts
- Have anunderstanding of how to use Viewbinding
- `Android Toolbar`
     
### Goal

By the end of this tutorial, the reader will have:
- Have an understanding of what `Palette API` is
- Have an understanding of how the Palette API work
- Know how to set up the Palette API Library
- Know how to extract colors from an image

### Introduction

The palette API library extracts prominent colors from bitmap images. We can then use this in styling our view components in the app. The views will then match the prominent color from the image. For instance, the toolbar, background, or even text. 

### What is Palette?

Palette is a support library in android. It allows you to extract prominent colors from a bitmap image and make use of them in designing the UI of your app.

### Advantages of Using Palette
- It 	provides a helper class to extract prominent colors from an image.
- We can use colors obtained to make elegant application UI designs
- We can customize the Color Palette using some in-build methods. For instance, adding filters and much more.
     


### Step 1. Create a new Android studio project

In your Android Studio, select New Project then Empty Activity. Name it as Palette Demo. Click Finish and wait for it to build.

![CreateProject](/engineering-education/extracting-colors-from-image-using-palette-API-in-android/create_project.png)

### Step 2: Setup the library

Add the following dependency to the app module-level build.gradle file

`implementation("com.android.support:palette-v7:28.0.0")`

### Step 3: Setup the XML layout for our project

In this step, we will design the layout. This layout will contain a ToolBar, an ImageView. , a button, and TextViews.

#### ActivityMain.xml
```

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
       android:textColor="@color/black"
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
       android:textColor="@color/black"
       android:textAllCaps="false"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/lightVibrant" />

   <TextView

       android:id="@+id/lightMuted"
       android:layout_width="match_parent"
       android:layout_height="wrap_content
       android:layout_marginTop="8dp"
       android:gravity="center"
       android:text="Light Muted"
       android:textAllCaps="false"
       android:textSize="18sp"
       android:textColor="@color/black"
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
       android:textColor="@color/black"
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
       android:textColor="@color/black"
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
       android:textColor="@color/black"
       android:textAllCaps="false"
       android:textSize="18sp"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toBottomOf="@+id/darkMuted" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create a Palette

A palette object will allow accessing the prominent colors on an image bitmap. We use palettes to style our application. We achieve this by changing our application color scheme based on the image bitmap in the app.
To create a palette, we generate an instance using `from(Bitmap bitmap)` method. This creates a `Palette.Builder` from a bitmap.
The builder will generate either synchronous palette or asynchronous  palette.

To create a palette on the same thread as the method we are invoking, we use Synchronous palette.
To create a palette on a different thread, we use Asynchronous palette. We then follow with onGenerated() method to access the created palette.
 
To create a synchronous palette, we use:

```
// Synchronous Palette generated and returned
fun createPaletteSync(bitmap: Bitmap): Palette = Palette.from(bitmap).generate()

```

To create an asynchronous palette, we use:

```
// Palette created asynchronously and we use it on another thread using onGenerated() method
fun createPaletteAsync(bitmap: Bitmap) {
   Palette.from(bitmap).generate { palette ->
       // Use generated instance
   }
}
```

To generate a palette, I would suggest using asynchronous generation. Synchronous generation may not create a smooth experience . This is evident on older devices or when the Bitmap object is large. 

### Step 5: Extracting color profiles

A `Target` will define each color extracted.We score the colors against the profile. We do this based on saturation and the number of pixels in the bitmap image.
The palette extracts the following six color profiles using the following methods:
- Light Vibrant : `Palette.getLightVibrantSwatch()`
- Dark Vibrant: `Palette.getDarkVibrantSwatch()`
- Vibrant: `Palette.getVibrantSwatch()`
- Light Muted: `Palette.getLightMutedSwatch()`
- Dark Muted: `Palette.getDrakMutedSwatch()`
- Muted:`1Palette.getMutedSwatch()`
     
We are going to use swatches to get these colors from our bitmap image. We use `Palette.Swatch` object to get each color profile. The palette has other methods for accessing more information about the color profiles. This includes, pixels population. 

For example, 
- `getPopulation()`: gets the amount of pixels represented by this swatch
- `getRgb()`: gets the color RGB value
- `getBodyTextColor()`: gets text color RGB value which is to we display on top of this 	color
- `getTitleTextColor()`: gets text color RGB value which is to we display on top of this 	color
    
The get<Profile>Swatch() methods usually needs no parameter. But, it may return null if a particular profile is not present in the bitmap image. Before accessing a swatch, first, check if it is null to avoid your app crashing. 

The following code checks if the swatch is present in the image bitmap.If it is not present, the default background color will be gray.  
```
if(palette?.lightMutedSwatch != null){
   setBackgroundColor(palette?.lightMutedSwatch!!.rgb
}
else{
    setBackgroundColor(Color.GRAY)
}
```

Here is our main activity code: 
#### ActivityMain.kt

```
package com.roberts.myapplication
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.drawable.BitmapDrawable
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.palette.graphics.Palette
import com.roberts.myapplication.databinding.ActivityMainBinding

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

On running the app, this is what to expect:

![ScreenOne](/engineering-education/extracting-colors-from-image-using-palette-API-in-android/screen_one.png)

![ScreenTwo](/engineering-education/extracting-colors-from-image-using-palette-API-in-android/screen_two.png)

Check out the entire project on [GitHub](https://github.com/robert-muriithi/PaletteApiDemo).

### Conclusions

Palette library is a powerful tool that we can use to make elegant app designs. 
Palette opens doors to infinite possibilities when it comes to the set up of colors and themes. Use this tool to materialize your application as you continue exploring and learning. Happy coding!
