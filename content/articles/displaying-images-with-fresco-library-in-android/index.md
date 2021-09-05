---
layout: engineering-education
status: publish
published: true
url: /displaying-images-with-fresco-library-in-android/
title: Displaying Images with Fresco Library in Android
description: This tutorial takes the reader through the process of loading images with the Fresco library in Android. Fresco is a powerful collection of methods majorly used to display images, GIFs, and WEBPs on mobile devices.
author: brandy-odhiambo
date: 2021-09-05T00:00:00-04:54
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/displaying-images-with-fresco-library-in-android/hero.png
    alt: Displaying Images with Fresco library in Android image
---
Fresco was created by Facebook engineers to make efficient use of memory and improve productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.
<!--more-->
Fresco is a collection of build-in methods majorly used to display images, GIFs, and WEBPs on mobile devices.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet (URL).
- Internal storage and resources and present a placeholder until the image is loaded.

### Prerequisites
To follow through this tutorial, you need to:
- Have Android Studio installed on your machine.
- Ensure you are conversant with Android application development essential ideas.
- Understand the Kotlin programming language fundamentals.
- Be able to use ViewBinding.

### What is Fresco?
Fresco is a graphics library for displaying and managing images in Android applications. It caches the image in a memory-efficient manner. One of the most important features is that it displays a placeholder image until the image loads from the URL. This saves on data and makes efficient use of the CPU. 

### Advantages of Fresco in android application
- Fresco makes efficient use of memory.
- Improves image productivity through streaming.
- Makes use of `simpleDraweeView` which shows a placeholder until the image loads instead of the traditional imageView.

### Some of the libraries used to load images in android applications
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke `HttpUrlConnection`. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like `Retrofit`, `OkHttp`, and Leak canary. The developers of this library placed a strong emphasis on its simplicity. Because of the minimalistic approach, the `.apk` file size is relatively minimal. The library also keeps track of how many methods are in use.

### Features of Fresco
#### Image caching
Libraries like Picasso and Glide give a way to completely clear the cache or even eliminate specific images. Some functions and keys make it possible to manage image caching more appropriately and with great advantages.

Fresco memory cache is in three-levels:
- Ready images for display or post-processing are decoded with the help of Bitmap.
- Compressed images are stored in the original state within the memory with the help of an encoded memory cache.
- Local storage stores compressed images in their original state.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of images in the cache, get the cached image and even delete them.

#### Image transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced image manipulation tools are found in Fresco. The majority of these can be used in an `XML` layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files, can't zoom an image, and can only shrink it to 1/8 of its original size. Fresco can be used with pre-built transformation libraries. A custom implementation of the `PostProcessor` class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIF and WebPs is an issue because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing frames as well as managing their memory.

#### Streaming
Streaming is a criterion that presents images in a low resolution at a previous instance, then progressively upgrades the quality as the image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URL, and the app will automatically update its display as the image is downloaded.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU. It entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an Android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down, Fresco places images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen. This improves the application's performance.

Fresco allows the app to run on low-end devices without constantly struggling to keep its image memory under control.

#### Drawing
Fresco drawee is a technique used to display a placeholder until the image is loaded so that it can be displayed automatically upon arrival. When the image exits the screen, its memory is automatically released.

Drawee provides several features:
- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or a circle outline.
- Display a custom overlay when the image is pressed.
- Ability to display a progress bar on the image.

### Getting started with Fresco
#### Creating project
In this step, we need to create an empty Android Studio project.

![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

#### Adding the necessary dependencies
To use Fresco in our project, we will need to add the Fresco library.

For playing animations like GIF, we will also add the required dependency.

```gradle
// Fresco library
implementation 'com.facebook.fresco:fresco:2.5.0'
    
// Fresco Animation library
implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

#### Creating base application class
In this step, we will create a class that will be used to initialize Fresco once during the application lifetime.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

#### Enabling internet permission
Internet permission is required as images will be fetched from the internet.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest file, don't forget to include the name of the base application class we just created.

```xml
<application android:name=".MyApp" >
</application>
```

#### Creating a layout
Within your XML code, add a custom namespace on the upper level of the layout. This gives access to fresco features whenever we need to display images.

```xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

##### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the internet. The line below gives a clear implementation.

```xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

##### Add Round corners and circular outline
- Round corners

```xml
<com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
```
  
- Circle image (using XML)

```xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

#### Loading Gif Animation
Animation is the capability to load GIF and WebPs images in Android. This feature is primarily provided by Fresco, For one to use it within the application, the method `setAutoPlayAnimation()` is set to `true`.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```

#### Streaming JPEG images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in Android by setting the method `setProgressiveRenderingEnabled()` to `true`.

```kotlin
val imageRequest= ImageRequestBuilder
            .newBuilderWithSource(Uri.parse("https://image.ec21.com/image/algsorcings/oimg_GC09912344_CA09912371/Fresh-Cut-Flowers-From-Kenya.jpg"))
            .setProgressiveRenderingEnabled(true)
            .build()

        binding.streamingimage.controller=Fresco.newDraweeControllerBuilder()
            .setImageRequest(imageRequest)
            .setOldController(binding.streamingimage.controller)
            .build()
```

#### Loading images from the internet 
Loading images from the network is also a feature provided by Fresco. This allows users to obtain the necessary image from the network directly. To have this capability, the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

#### Adding a circular shape to an image (using Kotlin)
Without all the procedures of adding a dependency to enable the use of circular imageView, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

#### Image Transformation
Fresco makes use of the in-built library to perform different transformations for instance applying rotation and resizing.

##### Rotation
You can rotate images by specifying an angle of rotation in the image request, like so:
```xml
.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))
```

##### Resizing
The main aim of resizing is to alter the image within the memory but does not necessarily change it. To resize, pass a `ResizeOptions` object when constructing an image request.
```xml
setResizeOptions(ResizeOptions(50,50))
```
#### Adding a progressbar
To have an idea if the image is loading, it is appropriate to add a progress bar that shows if the image is on a loading process. Add the following line of code in your `XML` layout. 

```xml
fresco:progressBarImage="@drawable/progress_bar"
```

When you run the app, you should expect to see the following output:

![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

### Conclusion
In this tutorial, we have learned how to add Fresco library to an Android app. We have also learned about streaming, adding GIF animations, loading, placeholders, and adding a circular shape to an image. Keep exploring and building amazing apps with this powerful library.

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

Happy coding!

### References
- [Fresco official documentation](https://frescolib.org/).

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
