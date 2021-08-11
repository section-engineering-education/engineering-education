In this tutorial, we are going to learn how to use the Glide library to load images either from the internet (URL) or from `Drawable` image files into an `ImageView` in Android.
<!--more-->

### Prerequisites
To follow through this tutorial, the reader should:
- Have [Android Studio](https://developer.android.com/studio) installed.
- Have a good understanding of the [Kotlin](https://kotlinlang.org/) programming language and [XML](https://developer.android.com/guide/topics/ui/declaring-layout) layout.
- Have a basic understanding of image loading in Android applications.
- Be familiar with [ViewBinding](https://developer.android.com/topic/libraries/view-binding).

### Goal
Before the finish of this tutorial, the reader should be able to:
- Understand what [Glide](https://bumptech.github.io/glide/) is.
- Add an [ImageView](https://developer.android.com/reference/android/widget/ImageView) to an `XML` layout
- Load images using the `Glide` library.

### Introduction  
Loading images in Android applications was difficult and developers had to solve this problem by building various visual representation libraries such as `Glide`, [Picasso](https://square.github.io/picasso/), [Coil](https://coil-kt.github.io/coil/getting_started/) image loader, and [Fresco](https://frescolib.org/docs/). In this article, we will discuss more about the Glide library in detail.

### What is Glide?
As indicated by true documentation, Glide is a quick and productive image loading library for Android focused on smooth scrolling.

It offers a simple to-utilize Programming interface (Application Programming Interface), decent performance and extensible resource decoding pipeline, and programmed resource pooling.

Glide supports fetching, decoding, and displaying video stills, images, and animated GIF images. Its primary focus is on making scrolling and any kind of list of images as smooth and fast as possible. It is additionally successful where you need to fetch, resize, and display remote images.

### Features of Glide
Glide has the following features:
- Image loading - This allows access to images on the internet or from a drawable.
- Circle cropping - Displays an image in a circular view.
- Resizing and scaling - This refers to adjusting the size of an image.
- Center cropping - This is scaling the whole image by re-sampling it.
- Rotation and transformation - Refers to changing the orientation of an image from a point.
- Memory and disk caching - Ensures that images are not downloaded for every particular request.
- Placeholder - Image displayed when a request is in progress.
- Error image - Image displayed when the requested resource fails to load.
- Fading - This is an animation feature offered by Glide.

### Advantages of using Glide over other image loading libraries
- Allows full-size disk caching of images.
- It is generally quicker and more effective than other libraries.
- Offers an efficient multi-threaded network.
- Offers various editing tools.
- It enhances the smooth scrolling of images.
- It supports GIF animation.

### Step 1: Creating a new project in Android Studio
Launch Android Studio and select `New Project` then `Empty Activity project`. Let's name it Glide.

![Creating Project](/engineering-education/loading-image-with-glide-in-android/create-project.png)

Click `Finish` and wait for it to build.

### Step 2: Adding Glide to our project
Add the following dependencies to the app module-level `build.gradle` file:

```gradle
implementation 'com.github.bumptech.glide:glide:4.12.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'
```

Add internet permissions to your project.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

### Step 3: Creating XML layouts
In this step, we are going to design the XML layout consisting of `Buttons` and an `ImageView`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
<ImageView
    android:id="@+id/imageView"
    android:layout_width="match_parent"
    android:layout_height="250dp"
    android:layout_marginStart="8dp"
    android:layout_marginTop="8dp"
    android:layout_marginEnd="8dp"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    tools:srcCompat="@tools:sample/avatars" />
<Button
    android:id="@+id/buttonUrl"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginTop="24dp"
    android:text="URL"
    app:layout_constraintStart_toStartOf="@+id/imageView"
    app:layout_constraintTop_toBottomOf="@+id/imageView" />
<Button
    android:id="@+id/buttonResize"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="32dp"
    android:text="Resize Image"
    app:layout_constraintBottom_toBottomOf="@+id/buttonUrl"
    app:layout_constraintStart_toEndOf="@+id/buttonUrl"
    app:layout_constraintTop_toTopOf="@+id/buttonUrl" />
<Button
    android:id="@+id/buttonFitCenter"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="16dp"
    android:text="FitCenter"
    app:layout_constraintStart_toStartOf="@+id/buttonUrl"
    app:layout_constraintTop_toBottomOf="@+id/buttonUrl" />
<Button
    android:id="@+id/buttonCenterCrop"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="4dp"
    android:text="CenterCrop"
    app:layout_constraintBottom_toBottomOf="@+id/buttonScaling1"
    app:layout_constraintStart_toEndOf="@+id/buttonScaling1"
    app:layout_constraintTop_toTopOf="@+id/buttonScaling1" />
<Button
    android:id="@+id/buttonDrawable"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="16dp"
    android:text="Drawable"
    app:layout_constraintStart_toStartOf="@+id/buttonScaling1"
    app:layout_constraintTop_toBottomOf="@+id/buttonScaling1" />
<Button
    android:id="@+id/buttonPlaceholder"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:text="Placeholder"
    app:layout_constraintBottom_toBottomOf="@+id/buttonDrawable"
    app:layout_constraintStart_toEndOf="@+id/buttonDrawable"
    app:layout_constraintTop_toTopOf="@+id/buttonDrawable" />
<Button
    android:id="@+id/buttonError"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:text="Error"
    app:layout_constraintBottom_toBottomOf="@+id/buttonCircular"
    app:layout_constraintStart_toEndOf="@+id/buttonCircular"
    app:layout_constraintTop_toTopOf="@+id/buttonCircular" />
<Button
    android:id="@+id/buttonCache"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="16dp"
    android:text="Cache"
    app:layout_constraintStart_toStartOf="@+id/buttonDrawable"
    app:layout_constraintTop_toBottomOf="@+id/buttonDrawable" />
<Button
    android:id="@+id/buttonCircleCrop"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:text="CircleCrop"
    app:layout_constraintBottom_toBottomOf="@+id/buttonCache"
    app:layout_constraintStart_toEndOf="@+id/buttonCache"
    app:layout_constraintTop_toTopOf="@+id/buttonCache" />
<Button
    android:id="@+id/buttonTarget"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:text="Target"
    app:layout_constraintStart_toStartOf="@+id/buttonCache"
    app:layout_constraintTop_toBottomOf="@+id/buttonCache" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
### Step 4: Implementing Glide features

#### Loading an image from URL
Glide allows the display of images from links (URL) without downloading them.

```kotlin
val resizeImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0O0260hzKyKursZUTtZAxECP0gSVJ2JXwQ&usqp=CAU"
binding.buttonUrl.setOnClickListener {
Glide.with(this)
    .load(resizeImage)
    .into(binding.imageView)
}
```

#### Loading Drawable Image
Glide allows loading of `Drawable` image files into `ImageViews`.
In the `MainActivity.kt` file, add the following lines of code:

```kotlin
binding.buttonDrawable.setOnClickListener {
Glide.with(this)
    .load(R.drawable.image)
    .into(binding.imageView)
}
```

### Transformations
Transformations in Glide involve taking a resource, transforming it, and returning the changed resource. Transformations are also used to crop and apply filters on images.

### a). CenterCrop
### a). CenterCrop
It scales the image with the end goal that the width of the image coordinates with the given width of the 'ImageView' and the height of the image is greater than the given height or the other way around. This method crops the image to fit into the dimensions of the given `ImageView`.
Center crop is implemented by using the `centerCrop()` method.

```kotlin
binding.buttonCenterCrop.setOnClickListener{
Glide.with(this)
    .load(R.drawable.codingtable)
    .centerCrop()
    .into(binding.imageView)
}
```

### b). FitCenter
Scales the image consistently with the end goal that one of the measurements is equivalent to the given dimension of the 'ImageView' and the other is not exactly the given component of the 'ImageView'

It is implemented by using the `fitCenter()` method.

```kotlin
binding.buttonFitCenter.setOnClickListener {
Glide.with(this)
    .load(R.drawable.codingtable)
    .fitCenter()
    .into(binding.imageView)
}
```

### c) CircleCrop
Just like the FitCenter transformation, `circleCrop` scales the image inside the `ImageView` but the resulting image is masked to a circular outline.

It is implemented by using the `circleCrop()` method.

```kotlin
private val image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_f-3Npwnj40B6u8O8WmcX8swxRqUS8ncQg&usqp=CAU"
binding.buttonCircleCrop.setOnClickListener {
Glide.with(this)
    .load(image)
    .circleCrop()
    .into(binding.imageView)
}
```

### Placeholders
Placeholders are Drawable images shown while the request is in progress. Once the request is completed successfully, the placeholder disappears. However, if the request fails and an error `Drawable` is not set, the placeholder continues to be visible.
If in any case the request fails to load and an error `drawable` is also not set, the placeholder will persist in the `ImageView`.

```kotlin
private val image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_f-3Npwnj40B6u8O8WmcX8swxRqUS8ncQg&usqp=CAU"
binding.buttonPlaceholder.setOnClickListener {
Glide.with(this)
    .load(image)
    .placeholder(R.drawable.placeholder)
    .into(binding.imageView)
}
```

### Errors Images
An error image is an image displayed if the requested URL model is null.
It is also displayed if the requested resource permanently fails to load.

```kotlin
binding.buttonError.setOnClickListener {
Glide.with(this)
    .load("https://encrypted-tbn0.gstatic.com/images?q=tbn")
    .error(R.drawable.error)
    .into(binding.imageView)
}
```

### Image Caching
Glide checks several layers of cache before starting a new request for an image:
1. Active resources - Checks if the requested image is visible in another view.
2. Memory cache - Checks if the image was recently loaded and still in memory.
3. Data - Was the data in this image obtained from the written disk cache before?

#### Loading only from the cache

```kotlin
private val resizeImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0O0260hzKyKursZUTtZAxECP0gSVJ2JXwQ&usqp=CAU"
binding.buttonCache.setOnClickListener {
Glide.with(this)
    .load(resizeImage)
    .onlyRetrieveFromCache(true)
    .into(binding.imageView)
}
```

### Disk Cache Strategies
```kotlin
Glide.with(this)
    .load(yourImageHere)
    .diskCacheStrategy(DiskCacheStrategy.ALL)
    .into(binding.imageView)
```

### Targets
In Glide, targets act as mediators between requests and requestors. They are responsible for displaying placeholders, loading resources, and determining the appropriate dimensions for each request.
Targets act as the interface between the request and the object sending the request. The purpose of targets is displaying placeholders, loading images, and assigning the correct dimensions for each requested image.

```kotlin
binding.buttonTarget.setOnClickListener {
Glide.with(this)
    .asGif()
    .load(R.drawable.meditation)
    .into(object : SimpleTarget<GifDrawable>(){
        override fun onResourceReady(
            resource: GifDrawable,
            transition: Transition<in GifDrawable>?
        ){
            resource.start()
            binding.imageView.setImageDrawable(resource)
        }
    })
}
``` 

### Project Demo

![Demo Project](/loading-image-with-glide-in-android/glide-demo.gif)
 
### Conclusion
Glide is a powerful image loading library that is easy to use.
To learn more about [Glide](https://github.com/bumptech/glide) library, you can visit the [official Glide documentation](https://bumptech.github.io/glide/).

You can access the source code and the images used in this tutorial on [GitHub](https://github.com/Collince-Okeyo/Glide).
