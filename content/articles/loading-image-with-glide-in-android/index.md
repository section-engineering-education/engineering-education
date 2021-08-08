In this tutorial, we are going to learn how to use the Glide library to load images either from the internet (URL) or `Drawable` image files into an `ImageView` in Android.

### Prerequisites
To follow along with this tutorial, the reader should:
- Have [Android Studio](https://developer.android.com/studio) installed.
- Have an understanding of [Kotlin](https://kotlinlang.org/) programming language and [XML](https://developer.android.com/guide/topics/ui/declaring-layout) layout.
- Have a basic understanding of image loading in android applications
- Be familiar with [`ViewBinding`](https://developer.android.com/topic/libraries/view-binding)

### Goal
By the end of this tutorial, the reader will be able to:
- Understand what [`Glide`](https://bumptech.github.io/glide/) is.
- Add an [`ImageView`](https://developer.android.com/reference/android/widget/ImageView) to an `XML` layout
- Load images using the `Glide` library.

### Introduction  
Loading images in Android applications was hard and developers had to solve this problem by building various visual representation libraries such as [`Glide`](https://bumptech.github.io/glide/), [`Picasso`](https://square.github.io/picasso/), [`Coil`](https://coil-kt.github.io/coil/getting_started/) image loader, and [`Fresco`](https://frescolib.org/docs/). In this article, we will discuss `Glide` in detail.

### What is Glide
According to official documentation, Glide is a fast and efficient image loading library for Android focused on smooth scrolling.

It offers an easy-to-use API (Application Development Interface), a performance and extensible resource decoding pipeline, and automatic resource pooling.

Glide supports fetching, decoding, and displaying video stills, images, and animated GIF images. Its primary focus is on making scrolling and any kind of a list of images as smooth and fast as possible. It is also effective where you need to fetch, resize, and display a remote image.  

### Features of Glide
Glide has the following features:
- Image loading - This allows access to images on the internet or from a drawable.
- Circle cropping - Displays an image in a circular view.
- Resizing and scaling - This refers to adjusting the size of an image.
- Center cropping - This is scaling the whole image by re-sampling it.
- Rotation and transformation - Refers to changing the orientation of an image from a point.
- Memory and disk caching - Ensures images are not downloaded for every request.
- Placeholder - Image displayed when a request is in progress.
- Error image - Image displayed when the requested resource fails to load.
- Fading - This is an animation feature offered by Glide.

### Advantages of using Glide
- Allows full-size disk caching of images.
- It is faster than other image-loading libraries like Picasso.
- Offers an efficient multi-threaded network.
- Offers various editing tools like loading, resizing, and cropping.
- It enhances the smooth scrolling of images.
- It supports GIF animation.

### Step 1: Create a new Android Studio Project
Launch Android Studio and select `New Project` then `Empty Activity project`. Let's name it Glide.

Click `Finish` and wait for it to build.

![Creating Project](/loading-image-with-glide-in-android/create-project.png)

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
In this step, we are going to design the XML layout consisting of `Buttons` and and `ImageViews`.

``` Xml
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
    android:id="@+id/buttonScaling1"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="16dp"
    android:text="FitCenter"
    app:layout_constraintStart_toStartOf="@+id/buttonUrl"
    app:layout_constraintTop_toBottomOf="@+id/buttonUrl" />
<Button
    android:id="@+id/buttonScale2"
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
    android:id="@+id/buttonCircular"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"android:layout_marginStart="8dp"
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
Glide enables the display of images from links (URL) without downloading them.
Add the following lines of code in the `MainActivity.kt` file:
```kotlin
binding.buttonUrl.setOnClickListener {
Glide.with(this)
    .load(resizeImage)
    .into(binding.imageView)
}
```
#### Loading Drawable Image
Glide allows loading of `Drawable` image files to `ImageViews`.
In the `MainActivity.kt` file, add the following lines of code:
``` kotlin
binding.buttonDrawable.setOnClickListener {
Glide.with(this)
    .load(R.drawable.image)
    .into(binding.imageView)
}
```
### Transformations
In Glide, transformations take a resource, mutate it, and return the mutated resource. They are also used to crop or apply filters to `Bitmaps`.

### a) CenterCrop
It scales the image so that the width of the image matches the given width of the `ImageView` and the height of the image is greater than the given height or vice versa.
The method then crop the larger dimension of the image to match the given dimension of the `ImageView`.
Is implemented by using the `centerCrop()` method.
``` kotlin
binding.buttonScale2.setOnClickListener{
Glide.with(this)
    .load(R.drawable.codingtable)
    .centerCrop()
    .into(binding.imageView)
}
```
### b) FitCenter
Scales the image uniformly so that one of the dimensions of the image will be equal to the given dimension of the `ImageView` and the other will be less than the given dimension of the `ImageView`.
Is implemented by using the `fitCenter()` method.
``` kotlin
binding.buttonScaling1.setOnClickListener {
Glide.with(this)
    .load(R.drawable.codingtable)
    .fitCenter()
    .into(binding.imageView)
}
```
### c) CircleCrop
Scales the image inside the `ImageView` just like the FitCenter transformation but the resulting image is masked to a circle.
Is implemented by using the `circleCrop()` method. 
``` kotlin
binding.buttonCircular.setOnClickListener {
Glide.with(this)
    .load(image)
    .circleCrop()
    .into(binding.imageView)
}
```
### Placeholders
Placeholders are Drawable images shown while the request is in progress.
Once the request is completed successfully, the placeholder disappears. If the request fails and an error `Drawable` is not set, the placeholder will continue to be visible.
In the `MainActivity.kt` file, add the following lines of code:

``` kotlin
binding.buttonPlaceholder.setOnClickListener {
Glide.with(this)
    .load(image)
    .placeholder(R.drawable.placeholder)
    .into(binding.imageView)
}
```
### Errors Images
Error Drawable images are shown if the requested URL model is null and no fallback `Drawable` is set. Error `Drawable` is also displayed if the requested resource permanently fails to load.
In the `MainActivity.kt` file, add the following lines of code:

``` kotlin
binding.buttonError.setOnClickListener {
Glide.with(this)
    .load("https://encrypted-tbn0.gstatic.com/images?q=tbn")
    .error(R.drawable.error)
    .into(binding.imageView)
}
``` 
### Image Caching
Glide checks many layers of cache before starting a new request for an image:
1. Active resources - Checks if the requested image is visible in another view.
2. Memory cache - Checks if the image was recently loaded and still in memory.
3. Data - Was the data in this image obtained from the written disk cache before?

#### Loading only from the cache
``` kotlin
binding.buttonCache.setOnClickListener {
Glide.with(this)
    .load(resizeImage)
    .onlyRetrieveFromCache(true)
    .into(binding.imageView)
}
```
### Disk Cache Strategies
``` kotlin
Glide.with(this)
    .load(imageUrl)
    .diskCacheStrategy(DiskCacheStrategy.ALL)
    .into(binding.imageView)
```
### Targets
In Glide, targets act as mediators between requests and requestors. They are responsible for displaying placeholders, loading resources, and determining the appropriate dimensions for each request.

In the `MainActivity.kt` file add the following lines of code:

``` kotlin
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
To learn more about [Glide](https://github.com/bumptech/glide) library you can visit the [official glide documentation](https://bumptech.github.io/glide/).

You can access the source code used in this tutorial on [GitHub](https://github.com/Collince-Okeyo/Glide).
