---
layout: engineering-education
status: publish
published: true
url: /image-processing-with-coil-in-android/
title: Image processing with Coil in Android
description: This tutorial takes the reader through how to perform various processes on images in Android using a fast, lightweight, and powerful opensource library known as Coil.
author: noni-diana
date: 2021-06-17T00:00:00-03:00
topics: [Android]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/image-processing-with-coil-in-android/hero.png
    alt: Image processing with Coil in Android
---

### Introduction
An application that doesn't process images, is pretty tedious and weird nowadays. One of the essential skills that an Android developer should have is knowing how to correctly work with images, especially from a remote source. Nevertheless, this can be done in different ways based on the feature you want to implement in your app. In most cases, you might need to perform not only loading but also memory and disk caching, down-sampling the image in memory, re-using Bitmaps, and automatically pausing/canceling requests.

In this tutorial, we will learn how to perform the above-mentioned tasks and many more using a fast, lightweight, and easy-to-use library called Coil. This library is made in 100% Kotlin and has embedded coroutine support which makes it suitable for modern Android development.

### Tutorial prerequisites
Before getting started with this tutorial, make sure that you're conversant with:

- Using Kotlin in Android development.
- Constraint layout's Flow helper widget in creating user interfaces.
- View binding and/or data binding.
- Basics of Kotlin-Coroutines.

### Table of content

- Getting started
    - Coil artifacts
    - Build application UI
    - Enable view binding
- Targets
- Image load requests
- Transition
    - Crossfade
- Transformations
    - Rounded corners
    - Blur effect
    - Circle crop
    - Grayscale effect
    - Combined transformations
- Cancelling Requests
- Memory caching
- Exception handling
- Conclusion

### Getting started
If you haven't already, create an Android project of your choice that we'll use for this tutorial.

#### i). Import Coil in your App
To include Coil in our app, we need either of the following artifacts that are already published on `mavenCentral()`;

>⚠️ **NOTE:** At the time of writing this article, Coil library was in `version 1.2.2`

**1.**

```bash
implementation("io.coil-kt:coil:1.2.2")
```
This is the default artifact/dependency/distribution that comes with `ImageView` extension functions and `Coil` singleton. It highly depends on `io.coil-kt:coil-base`. If you only want to load static images, this is the artifact to go with. You'll understand this better in the latter part of the tutorial.

**2.**
```bash
implementation("io.coil-kt:coil-base:1.2.2")
```
This is the base artifact that is mostly depended on by other artifacts. Unlike `io.coil-kt:coil`, this doesn't include `ImageView` extension functions and `Coil` singleton.

**3.**
```bash
implementation("io.coil-kt:coil-gif:1.2.2")
```
Includes `GIF` decoders that allows you to display GIF images in your app. Animated WEBP requires Android 9.0+ whereas animated HEIF images require Android 11.0+.

**4.**
```bash
implementation("io.coil-kt:coil-svg:1.2.2")
```
Comes with SVGs decoding support.

**5.**
```bash
implementation("io.coil-kt:coil-video:1.2.2")
```
Provides video frames for video codecs that Android supports. A codec is a software that decodes and encodes digital data streams.

The choice of the right artifact to use is based on your feature requirements. Fortunately, more than one dependency can be used in the same project!

With that said, add the following into the module level `build.gradle` file as we'll only work with plain images.

```gradle
dependencies{
    implementation("io.coil-kt:coil:1.2.2")
}
```
Coil requires Java-8 support. To enable this, include the following in your the same file.

```gradle
android {
    compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
}
```
Last but not least, Coil needs internet permission, especially when getting remote images. Add this in the `Manifest` file.
```xml
<uses-permission android:name="android.permission.INTERNET"/>
```
Sync the project.

### Build the Application UI
In this project, we'll use a single `ImageView` and several `Buttons` each representing a function listed in the table of contents. In your `activity_main.xml` file, paste the code below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="match_parent"
        android:layout_height="300dp"
        android:layout_margin="16dp"
        android:src="@drawable/ic_launcher_foreground"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/stateText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="State: Default"
        android:textSize="20sp"
        app:layout_constraintBottom_toTopOf="@+id/flow"
        app:layout_constraintEnd_toEndOf="@+id/imageView"
        app:layout_constraintStart_toStartOf="@+id/imageView"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />

    <androidx.constraintlayout.helper.widget.Flow
        android:id="@+id/flow"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="8dp"
        app:constraint_referenced_ids="circle,rounded,grayScale,crossFade,blur,crop,placeholder,error,combined"
        app:flow_horizontalGap="8dp"
        app:flow_horizontalStyle="packed"
        app:flow_verticalStyle="spread"
        app:flow_wrapMode="chain"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/imageView"
        app:layout_constraintVertical_bias="1" />

    <Button
        android:id="@+id/circle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Circle Trans" />

    <Button
        android:id="@+id/rounded"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="rounded" />

    <Button
        android:id="@+id/grayScale"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Gray scale" />

    <Button
        android:id="@+id/crossFade"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="cross fade" />

    <Button
        android:id="@+id/blur"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="blur" />

    <Button
        android:id="@+id/crop"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="crop" />

    <Button
        android:id="@+id/placeholder"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Placeholder" />

    <Button
        android:id="@+id/error"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Error Image" />

    <Button
        android:id="@+id/combined"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="combined trans" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
A [Flow]() is a helper widget that allows us to align views within it without constraining each referenced view. The code above adds buttons in a horizontally-packed, vertically spread, chained flow. In between the image view and the flow is a TextView that indicates the current state of the image.
See the preview below:

![Design preview](/engineering-education/image-processing-with-coil-in-android/design-preview.png)

### Images sources
Coil supports three main sources of images;

#### i). URL
This uses a link to a remote image that you want to load into a target.
```kotlin
// for instance
imageView.load("https://example.images/example.png")
```

#### ii). Drawable resource
Loads images from within the project files.
```kotlin
imageView.load(R.drawable.image)
```

#### iii). File resource
Makes use of a given image from the host device.
```kotlin
imageView.load(File("/path/to/image"))
```

### What's the `load()` function ?
`load()` is an extension function that extends the `ImageView` class. This way, we can access it with the dot(.) notation on any imageView in the project. It provides a request builder lambda where Most of the manipulation functions are applied.

### Enabling view binding
viewBinding allows us to access views in the UI in a more simplified way. It makes use of binding classes generated by the viewBinding library. To enable this, add this code in the module level `gradle.build` script and sync.

```gradle
android{
    buildFeatures{
        viewBinding true
    }
}
```
Now we are good to go!

### Image processing functionalities
Here we'll listen for button clicks and perform the respective action. To start with, open `MainActivity.kt` and paste the following starter code.

```kotlin
class MainActivity : AppCompatActivity() {
    private var _binding: ActivityMainBinding? = null
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        supportActionBar?.hide()
        super.onCreate(savedInstanceState)
        _binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // we'll handle clicks here
    }
}
```
Here we've inflated the UI using viewBinding.

### Targets
A target is nothing but the intended destination of something. In this case, the target is an imageView that receives the result of a `load()` function.

### Load builder
A `build()` function initiates the `load()` function associated with it. Image request/load is a disposable task used to track the progress, result as well as state of the task. This way a request can be canceled/disposed before completion.

### Write an Image loading code

Here we're going to use the URL technique to load an image onto a target. Since this will include several operations, it's a good idea to separate the sample links from the main code.

Create a class named `ImageLink.kt` and paste the code below in it.

```kotlin
class ImageLinks {
    // array of links to free images on the internet
    private val links = arrayListOf<String>(
        "https://images.freeimages.com/images/large-previews/825/linked-hands-1308777.jpg",
        "https://images.unsplash.com/photo-1541443131876-44b03de101c5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=mathieu-renier-4WBvCqeMaDE-unsplash.jpg",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=roberto-nickson-zu95jkyrGtw-unsplash.jpg",
        "https://www.cnet.com/a/img/XtH050ErlMIQxKn_HYUx2plJnDc=/940x528/2020/12/17/c9a829c8-69d6-4299-b2d0-cf9624aa7556/2021-acura-tlx-a-spec-65.jpg",
        "https://cdn.jdpower.com/JDPA_2021%20Acura%20TLX%20Advance%20Red%20Front%20View.jpg",
        "https://s3-us-east-2.amazonaws.com/matter-blog/2020/09/People_Person_Cover_Image.png",
        "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/other/ant_man_ver5.jpg"
    )

    fun randomLink(): String {
        return links.random()
    }
}
```
The above `randomLink()` returns a randomly selected link whenever we call it. This ensures that we don't use the same image in every process (discussed below).

### States indication
Open `MainActivity.kt` file and paste the following code just below `onCreate()` method.

```kotlin
private fun updateState(newState: String){
    binding.stateText.text = "State: $newState"
}
```
The above function sets the new state to help us identify the latest action performed on the image (discussed below).

### Transitions
A transition is the duration incurred when switching states.

#### Crossfade
This is an animated transition that visualizes the changes on an imageView. It does so by changing the opacity from `0 t0 1` withing a given period.

```kotlin
// trigerred when crossfade button is clicked...(this applies to other snippets as well)
binding.crossFade.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.load(link) {
        crossfade(750) // 75th percentile of a second
        build()
    }
    // set current state
    updateState("cross fade")
}
```
Crossfade duration is determined by the time (in microseconds) passed in the `crossfade()` function.

### Transformations
Image transformations are manipulation techniques that can be applied to an imageView. Coil supports the following transformations.

#### i). Rounded corners
This creates curved corners on an image. The level of roundness is determined by the floating value passed in the `RoundedCornersTransformation()` function.

```kotlin
binding.rounded.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.load(link) {
        transformations(
            RoundedCornersTransformation(8F)
        )
        build()
    }
    updateState("Rounded")
}
```

#### ii). Blur
This refers to degrade in the quality of the image.
```kotlin
binding.blur.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.load(link) {
        transformations(
            BlurTransformation(this@MainActivity,radius = 8f),
        )
        build()
    }
    updateState("Blur")
}
```
 The higher the blur radius, the blurry the image. Blurring can be helpful when we don't want users to  see some images clearly for instance when the service requires premium access only.
 
#### iii). Circle crop
Forms a circular-shaped image within the available dimensions from which coil determines the radius of the image.

```kotlin
binding.circle.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.load(link) {
        transformations(
            CircleCropTransformation()
        )
        build()
    }
    updateState("Circle Crop")
}
```

#### iv). Grayscale
This refers to a decolorized format of the image. All colors are turned to either black or white.

```kotlin
binding.grayScale.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.load(link) {
        transformations(
            GrayscaleTransformation(),
        )
        build()
    }
    updateState("Grayscale")
}
```

#### v). Placeholder
As the name suggests, placeholders are images that are pre-set to appear on an imageView before the actual image is set. When a request is successfully completed, the placeholder is instantly replaced. For this reason, it might not be visually detected especially when an image request is done pretty fast.

```kotlin
binding.placeholder.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.load(link){
        /* create a drawable resource to use here */
        placeholder(R.drawable.ic_placeholder)
        build()
    }
    updateState("Placeholder")
}
```

#### vi). Crop
Allows us to hard-code dimensions or the size of an image. Note that unlike in `XML`, we don't specify the measurement unit when using Coil's `size()` function as the default unit is pixels.

```kotlin
binding.crop.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.apply {
        scaleType = ImageView.ScaleType.CENTER_CROP
        load(link) {
            size(300, 300)
        }
    }
}
```

#### vii). Combined transformations
In some cases, you may want to apply more than just one transformation on the same image at the same time. This can be achieved as shown below.

```kotlin
binding.combined.setOnClickListener {
    val link = ImageLinks().randomLink()
    binding.imageView.load(link) {
        crossfade(750)
        transformations(
            CircleCropTransformation(),
            GrayscaleTransformation() // e.t.c
        )
        build()
    }
    updateState("Combined State")
}
```
Notice the use of commas to separate transformations.

### Cancelling Requests
A network request might at times be unnecessary to proceed especially if it takes too long to respond. Request cancellation is also referred to as disposal. See the snippet below.

```kotlin
imageView.load(link){
        ...

    }.dispose()
```
This frees resources associated with the request and cancels any work in progress. This method is [idempotent](https://en.wikipedia.org/wiki/Idempotence) meaning that multiple applications do not affect the result of the first application.

### Memory Caching
Caching makes it possible to display remote images even when the internet connection is lost. For this to happen, the image must have been fetched at least in one instance with an internet connection. Coil makes use of `OkHttp` which is an `HTTP client` that supports the `SPDY` protocol. Refer to **[official documentation](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-cache/)** for further reading.

### Exception handling
Keeping track of a request is important as it helps in handling errors encountered during the process. Coil uses a `listener()` function that accepts two lambdas, `onSucecess` and `onError`. 

```kotlin
// handle error button click
binding.error.setOnClickListener {
    binding.imageView.load("https://a/bad/link") {
        listener(
            // pass two arguments
            onSuccess = { _, _ ->
                Toast.makeText(this@MainActivity, "Success", Toast.LENGTH_SHORT).show()
            },
            onError = { request: ImageRequest, throwable: Throwable ->
                request.error
                Toast.makeText(this@MainActivity, "$throwable", Toast.LENGTH_SHORT).show()
            })
        // setup error image
        error(R.drawable.ic_error_image)
        
    }
}
```
An error image is used to indicate that something went wrong when resolving the request.

<!--
### Project results
Include a gif image here-->

### Conclusion
Congratulations! you can now comfortably use `Coil` to process images in Android. In the next tutorial, we'll learn about other awesome libraries, their use cases, and how they compare to Coil. The source code for this tutorial can be found [on Github](https://github.com/nanimdiana/image-processing-with-coil)

Enjoy Coding!

---
Peer Review Contributions by: [](/engineering-education/authors//)