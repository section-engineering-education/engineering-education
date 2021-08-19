Fresco was created by Facebook engineers to make efficient use of memory and improves productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.

### Introduction
Fresco is a logical build-in system for displaying images in mobile applications.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet
- Internal storage and resources and present a placeholder until the image arrives.

So let's talk more about Fresco in this article.

### Prerequisites
- Have Android Studio installed.
- Have a basic knowledge of building Android applications.
- Have a basic understanding of the Kotlin programming language
- An understanding on how to use ViewBinding

### What is Fresco
Fresco is a logical built-in system for displaying and managing image URLs in the android application. It generally caches the image in a memory-efficient manner. The most important feature is to display a placeholder image until the image arrives from the URL this saves on data and makes efficient use of CPU. 

### Some of the libraries used to load the image on the android application
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke HttpUrlConnection. Although there are also utility libraries that link into Google's Volley project or Square's OkHttp library. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like Retrofit, OkHttp, and Leak Canary. The developers of this collection placed a strong emphasis on the work's simplicity and readability. Because of the minimalistic approach, the .apk file size is kept is only 121 Kb. The library also keeps track of how many methods are in use.

### Features Of Fresco
#### Image Caching
Libraries like Picasso and Glide give a way to clear cache completely or even eliminating specific images. Also it is possible to manage it more precisely by using the signature function and custom key.

Fresco memory cache is in three-level:

- Ready images for display or post-processing are decoded with the help of Bitmap
- compressed images are stored in the original state within the memory through the help of encoded memory cache
- presence of a disk that stores compressed images in the original state in local storage.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of image in the cache, get the cached image and even delete them.

#### Image Transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced picture manipulation tools are found in Fresco. The majority of these can be used in an XML layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files; it can't make an image bigger and can only shrink it to 1/8 of its original size. Fresco, like other loaders, can be used with pre-built transformation libraries. A custom implementation of the Postprocessor class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIFs and WebPs is an issue. Because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing of frames as well as managing their memory.

#### Streaming
Streaming is a criterion that present images in a low resolution at a previous instant ,then progressively upgrades the quality as more image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URI, and the app will automatically update its display as new data arrives.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU, it entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down. Fresco is used to place images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen, which improves the app's running time. Fresco allows the app to run on low-end devices without constantly struggling to keep their image memory under control.

#### Drawing
Fresco Drawee is a technique used to display a placeholder until the image has loaded so that it can be displayed automatically when it arrives. When the image exits the screen, its memory is automatically released.

Drawee provides several features: -

- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or in a circle
- display a custom overlay if users happen to press the image.
- Ability to display custom background, overlays, or progress bar on the image.

### Advantage of Fresco in android application
- Fresco makes efficient use of memory
- Improves image productivity through streaming
- Make use of simpleDraweeView which show a placeholder until the image loads instead of traditional imageView

### Getting Started

### Step 1: Creating Project
In this step, we need to create an empty Android studio project.
![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

### Step 2: Adding Necessary Dependencies
To use fresco in our project will need to add the fresco library.
For playing animations like GIF, we will also add the required dependency.

```Gradle
    // Fresco library
    implementation 'com.facebook.fresco:fresco:2.5.0'
    
    // Fresco Animation library
    implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

### Step 3: Creating Base Application Class
In this step, we will create a class that will be used to initialize Fresco once.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

### Step 4: Enabling Internet Permission
Here we will be required to enable internet permission as an image will be fetched from the internet.

```
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest don't forget to include the name of the base application class we created

```
<application
       android:name=".MyApp"
</application>
```

### Step 5: Creating a Layout
In your layout XML, add a custom namespace to the top-level element.
This is needed to access the custom fresco attributes which allows you to control how the image is loaded and displayed.

```Xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

#### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the network. It can added with the following line of code.

```Xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

#### Add Round corners and circles
- Round Circle Image
```Xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

 - Round Corners
  ```Xml
  <com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
  ```

### Step 6: Loading Gif Animation
Animation is the capability to load GIFs and WebPs in an android application, this feature is primarily provided by Fresco, For one to use it within his android application, the method `setAutoPlayAnimation()` is set to be true.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```            

### Step 7: Streaming JPEG Images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in the android application by setting the method `setProgressiveRenderingEnabled()` to true.

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

### Step 8: Loading Image From the internet 
Loading images from the network is also a feature provided by fresco, This always allows users to have the capability to obtain the necessary image from the network directly. To have this capability the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

### Step 9: Adding a circular shape to an image
Without all the procedures of adding a dependency to enable the use of circular image view, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

### Step 10: Image Transformation
Fresco makes use of the in-build library to perform different transformations for instance to apply rotation and resizing the below lines of code is included to explain more on the transformations.

#### Rotation
You can rotate images by specifying a rotation angle in the image request, like so:

`.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))`

#### Resizing
Resizing does not modify the original file, it just resizes an encoded image in memory, prior to being decoded. To resize, pass a ResizeOptions object when constructing an ImageRequest

`setResizeOptions(ResizeOptions(50,50))`

### Step 11: Adding a progressbar
To have an idea if the image is loading, it would be appropriate to add a progress bar which shows if the image is on a loading process. The below line of code in your XML explains how to include a progress bar 

```Xml
fresco:progressBarImage="@drawable/progress_bar"

```

When you run the project one should expect to see the following outputs
![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

### Conclusion
Fresco is a unique library that offers features such as animations, streaming, image loading, and transformation. Explore more on the other features provided by Fresco from their official documentation to help you in your android development process.

Keep Learning.

### References
- [Fresco Official Documentation](https://frescolib.org/).Fresco was created by Facebook engineers to make efficient use of memory and improves productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.

### Introduction
Fresco is a logical build-in system for displaying images in mobile applications.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet
- Internal storage and resources and present a placeholder until the image arrives.

So let's talk more about Fresco in this article.

### Prerequisites
- Have Android Studio installed.
- Have a basic knowledge of building Android applications.
- Have a basic understanding of the Kotlin programming language
- An understanding on how to use ViewBinding

### What is Fresco
Fresco is a logical built-in system for displaying and managing image URLs in the android application. It generally caches the image in a memory-efficient manner. The most important feature is to display a placeholder image until the image arrives from the URL this saves on data and makes efficient use of CPU. 

### Some of the libraries used to load the image on the android application
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke HttpUrlConnection. Although there are also utility libraries that link into Google's Volley project or Square's OkHttp library. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like Retrofit, OkHttp, and Leak Canary. The developers of this collection placed a strong emphasis on the work's simplicity and readability. Because of the minimalistic approach, the .apk file size is kept is only 121 Kb. The library also keeps track of how many methods are in use.

### Features Of Fresco
#### Image Caching
Libraries like Picasso and Glide give a way to clear cache completely or even eliminating specific images. Also it is possible to manage it more precisely by using the signature function and custom key.

Fresco memory cache is in three-level:

- Ready images for display or post-processing are decoded with the help of Bitmap
- compressed images are stored in the original state within the memory through the help of encoded memory cache
- presence of a disk that stores compressed images in the original state in local storage.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of image in the cache, get the cached image and even delete them.

#### Image Transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced picture manipulation tools are found in Fresco. The majority of these can be used in an XML layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files; it can't make an image bigger and can only shrink it to 1/8 of its original size. Fresco, like other loaders, can be used with pre-built transformation libraries. A custom implementation of the Postprocessor class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIFs and WebPs is an issue. Because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing of frames as well as managing their memory.

#### Streaming
Streaming is a criterion that present images in a low resolution at a previous instant ,then progressively upgrades the quality as more image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URI, and the app will automatically update its display as new data arrives.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU, it entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down. Fresco is used to place images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen, which improves the app's running time. Fresco allows the app to run on low-end devices without constantly struggling to keep their image memory under control.

#### Drawing
Fresco Drawee is a technique used to display a placeholder until the image has loaded so that it can be displayed automatically when it arrives. When the image exits the screen, its memory is automatically released.

Drawee provides several features: -

- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or in a circle
- display a custom overlay if users happen to press the image.
- Ability to display custom background, overlays, or progress bar on the image.

### Advantage of Fresco in android application
- Fresco makes efficient use of memory
- Improves image productivity through streaming
- Make use of simpleDraweeView which show a placeholder until the image loads instead of traditional imageView

### Getting Started

### Step 1: Creating Project
In this step, we need to create an empty Android studio project.
![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

### Step 2: Adding Necessary Dependencies
To use fresco in our project will need to add the fresco library.
For playing animations like GIF, we will also add the required dependency.

```Gradle
    // Fresco library
    implementation 'com.facebook.fresco:fresco:2.5.0'
    
    // Fresco Animation library
    implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

### Step 3: Creating Base Application Class
In this step, we will create a class that will be used to initialize Fresco once.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

### Step 4: Enabling Internet Permission
Here we will be required to enable internet permission as an image will be fetched from the internet.

```
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest don't forget to include the name of the base application class we created

```
<application
       android:name=".MyApp"
</application>
```

### Step 5: Creating a Layout
In your layout XML, add a custom namespace to the top-level element.
This is needed to access the custom fresco attributes which allows you to control how the image is loaded and displayed.

```Xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

#### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the network. It can added with the following line of code.

```Xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

#### Add Round corners and circles
- Round Circle Image
```Xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

 - Round Corners
  ```Xml
  <com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
  ```

### Step 6: Loading Gif Animation
Animation is the capability to load GIFs and WebPs in an android application, this feature is primarily provided by Fresco, For one to use it within his android application, the method `setAutoPlayAnimation()` is set to be true.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```            

### Step 7: Streaming JPEG Images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in the android application by setting the method `setProgressiveRenderingEnabled()` to true.

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

### Step 8: Loading Image From the internet 
Loading images from the network is also a feature provided by fresco, This always allows users to have the capability to obtain the necessary image from the network directly. To have this capability the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

### Step 9: Adding a circular shape to an image
Without all the procedures of adding a dependency to enable the use of circular image view, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

### Step 10: Image Transformation
Fresco makes use of the in-build library to perform different transformations for instance to apply rotation and resizing the below lines of code is included to explain more on the transformations.

#### Rotation
You can rotate images by specifying a rotation angle in the image request, like so:

`.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))`

#### Resizing
Resizing does not modify the original file, it just resizes an encoded image in memory, prior to being decoded. To resize, pass a ResizeOptions object when constructing an ImageRequest

`setResizeOptions(ResizeOptions(50,50))`

### Step 11: Adding a progressbar
To have an idea if the image is loading, it would be appropriate to add a progress bar which shows if the image is on a loading process. The below line of code in your XML explains how to include a progress bar 

```Xml
fresco:progressBarImage="@drawable/progress_bar"

```

When you run the project one should expect to see the following outputs
![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

### Conclusion
Fresco is a unique library that offers features such as animations, streaming, image loading, and transformation. Explore more on the other features provided by Fresco from their official documentation to help you in your android development process.

Keep Learning.

### References
- [Fresco Official Documentation](https://frescolib.org/).Fresco was created by Facebook engineers to make efficient use of memory and improves productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.

### Introduction
Fresco is a logical build-in system for displaying images in mobile applications.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet
- Internal storage and resources and present a placeholder until the image arrives.

So let's talk more about Fresco in this article.

### Prerequisites
- Have Android Studio installed.
- Have a basic knowledge of building Android applications.
- Have a basic understanding of the Kotlin programming language
- An understanding on how to use ViewBinding

### What is Fresco
Fresco is a logical built-in system for displaying and managing image URLs in the android application. It generally caches the image in a memory-efficient manner. The most important feature is to display a placeholder image until the image arrives from the URL this saves on data and makes efficient use of CPU. 

### Some of the libraries used to load the image on the android application
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke HttpUrlConnection. Although there are also utility libraries that link into Google's Volley project or Square's OkHttp library. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like Retrofit, OkHttp, and Leak Canary. The developers of this collection placed a strong emphasis on the work's simplicity and readability. Because of the minimalistic approach, the .apk file size is kept is only 121 Kb. The library also keeps track of how many methods are in use.

### Features Of Fresco
#### Image Caching
Libraries like Picasso and Glide give a way to clear cache completely or even eliminating specific images. Also it is possible to manage it more precisely by using the signature function and custom key.

Fresco memory cache is in three-level:

- Ready images for display or post-processing are decoded with the help of Bitmap
- compressed images are stored in the original state within the memory through the help of encoded memory cache
- presence of a disk that stores compressed images in the original state in local storage.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of image in the cache, get the cached image and even delete them.

#### Image Transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced picture manipulation tools are found in Fresco. The majority of these can be used in an XML layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files; it can't make an image bigger and can only shrink it to 1/8 of its original size. Fresco, like other loaders, can be used with pre-built transformation libraries. A custom implementation of the Postprocessor class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIFs and WebPs is an issue. Because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing of frames as well as managing their memory.

#### Streaming
Streaming is a criterion that present images in a low resolution at a previous instant ,then progressively upgrades the quality as more image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URI, and the app will automatically update its display as new data arrives.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU, it entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down. Fresco is used to place images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen, which improves the app's running time. Fresco allows the app to run on low-end devices without constantly struggling to keep their image memory under control.

#### Drawing
Fresco Drawee is a technique used to display a placeholder until the image has loaded so that it can be displayed automatically when it arrives. When the image exits the screen, its memory is automatically released.

Drawee provides several features: -

- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or in a circle
- display a custom overlay if users happen to press the image.
- Ability to display custom background, overlays, or progress bar on the image.

### Advantage of Fresco in android application
- Fresco makes efficient use of memory
- Improves image productivity through streaming
- Make use of simpleDraweeView which show a placeholder until the image loads instead of traditional imageView

### Getting Started

### Step 1: Creating Project
In this step, we need to create an empty Android studio project.
![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

### Step 2: Adding Necessary Dependencies
To use fresco in our project will need to add the fresco library.
For playing animations like GIF, we will also add the required dependency.

```Gradle
    // Fresco library
    implementation 'com.facebook.fresco:fresco:2.5.0'
    
    // Fresco Animation library
    implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

### Step 3: Creating Base Application Class
In this step, we will create a class that will be used to initialize Fresco once.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

### Step 4: Enabling Internet Permission
Here we will be required to enable internet permission as an image will be fetched from the internet.

```
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest don't forget to include the name of the base application class we created

```
<application
       android:name=".MyApp"
</application>
```

### Step 5: Creating a Layout
In your layout XML, add a custom namespace to the top-level element.
This is needed to access the custom fresco attributes which allows you to control how the image is loaded and displayed.

```Xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

#### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the network. It can added with the following line of code.

```Xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

#### Add Round corners and circles
- Round Circle Image
```Xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

 - Round Corners
  ```Xml
  <com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
  ```

### Step 6: Loading Gif Animation
Animation is the capability to load GIFs and WebPs in an android application, this feature is primarily provided by Fresco, For one to use it within his android application, the method `setAutoPlayAnimation()` is set to be true.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```            

### Step 7: Streaming JPEG Images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in the android application by setting the method `setProgressiveRenderingEnabled()` to true.

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

### Step 8: Loading Image From the internet 
Loading images from the network is also a feature provided by fresco, This always allows users to have the capability to obtain the necessary image from the network directly. To have this capability the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

### Step 9: Adding a circular shape to an image
Without all the procedures of adding a dependency to enable the use of circular image view, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

### Step 10: Image Transformation
Fresco makes use of the in-build library to perform different transformations for instance to apply rotation and resizing the below lines of code is included to explain more on the transformations.

#### Rotation
You can rotate images by specifying a rotation angle in the image request, like so:

`.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))`

#### Resizing
Resizing does not modify the original file, it just resizes an encoded image in memory, prior to being decoded. To resize, pass a ResizeOptions object when constructing an ImageRequest

`setResizeOptions(ResizeOptions(50,50))`

### Step 11: Adding a progressbar
To have an idea if the image is loading, it would be appropriate to add a progress bar which shows if the image is on a loading process. The below line of code in your XML explains how to include a progress bar 

```Xml
fresco:progressBarImage="@drawable/progress_bar"

```

When you run the project one should expect to see the following outputs
![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

### Conclusion
Fresco is a unique library that offers features such as animations, streaming, image loading, and transformation. Explore more on the other features provided by Fresco from their official documentation to help you in your android development process.

Keep Learning.

### References
- [Fresco Official Documentation](https://frescolib.org/).Fresco was created by Facebook engineers to make efficient use of memory and improves productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.

### Introduction
Fresco is a logical build-in system for displaying images in mobile applications.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet
- Internal storage and resources and present a placeholder until the image arrives.

So let's talk more about Fresco in this article.

### Prerequisites
- Have Android Studio installed.
- Have a basic knowledge of building Android applications.
- Have a basic understanding of the Kotlin programming language
- An understanding on how to use ViewBinding

### What is Fresco
Fresco is a logical built-in system for displaying and managing image URLs in the android application. It generally caches the image in a memory-efficient manner. The most important feature is to display a placeholder image until the image arrives from the URL this saves on data and makes efficient use of CPU. 

### Some of the libraries used to load the image on the android application
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke HttpUrlConnection. Although there are also utility libraries that link into Google's Volley project or Square's OkHttp library. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like Retrofit, OkHttp, and Leak Canary. The developers of this collection placed a strong emphasis on the work's simplicity and readability. Because of the minimalistic approach, the .apk file size is kept is only 121 Kb. The library also keeps track of how many methods are in use.

### Features Of Fresco
#### Image Caching
Libraries like Picasso and Glide give a way to clear cache completely or even eliminating specific images. Also it is possible to manage it more precisely by using the signature function and custom key.

Fresco memory cache is in three-level:

- Ready images for display or post-processing are decoded with the help of Bitmap
- compressed images are stored in the original state within the memory through the help of encoded memory cache
- presence of a disk that stores compressed images in the original state in local storage.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of image in the cache, get the cached image and even delete them.

#### Image Transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced picture manipulation tools are found in Fresco. The majority of these can be used in an XML layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files; it can't make an image bigger and can only shrink it to 1/8 of its original size. Fresco, like other loaders, can be used with pre-built transformation libraries. A custom implementation of the Postprocessor class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIFs and WebPs is an issue. Because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing of frames as well as managing their memory.

#### Streaming
Streaming is a criterion that present images in a low resolution at a previous instant ,then progressively upgrades the quality as more image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URI, and the app will automatically update its display as new data arrives.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU, it entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down. Fresco is used to place images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen, which improves the app's running time. Fresco allows the app to run on low-end devices without constantly struggling to keep their image memory under control.

#### Drawing
Fresco Drawee is a technique used to display a placeholder until the image has loaded so that it can be displayed automatically when it arrives. When the image exits the screen, its memory is automatically released.

Drawee provides several features: -

- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or in a circle
- display a custom overlay if users happen to press the image.
- Ability to display custom background, overlays, or progress bar on the image.

### Advantage of Fresco in android application
- Fresco makes efficient use of memory
- Improves image productivity through streaming
- Make use of simpleDraweeView which show a placeholder until the image loads instead of traditional imageView

### Getting Started

### Step 1: Creating Project
In this step, we need to create an empty Android studio project.
![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

### Step 2: Adding Necessary Dependencies
To use fresco in our project will need to add the fresco library.
For playing animations like GIF, we will also add the required dependency.

```Gradle
    // Fresco library
    implementation 'com.facebook.fresco:fresco:2.5.0'
    
    // Fresco Animation library
    implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

### Step 3: Creating Base Application Class
In this step, we will create a class that will be used to initialize Fresco once.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

### Step 4: Enabling Internet Permission
Here we will be required to enable internet permission as an image will be fetched from the internet.

```
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest don't forget to include the name of the base application class we created

```
<application
       android:name=".MyApp"
</application>
```

### Step 5: Creating a Layout
In your layout XML, add a custom namespace to the top-level element.
This is needed to access the custom fresco attributes which allows you to control how the image is loaded and displayed.

```Xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

#### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the network. It can added with the following line of code.

```Xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

#### Add Round corners and circles
- Round Circle Image
```Xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

 - Round Corners
  ```Xml
  <com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
  ```

### Step 6: Loading Gif Animation
Animation is the capability to load GIFs and WebPs in an android application, this feature is primarily provided by Fresco, For one to use it within his android application, the method `setAutoPlayAnimation()` is set to be true.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```            

### Step 7: Streaming JPEG Images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in the android application by setting the method `setProgressiveRenderingEnabled()` to true.

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

### Step 8: Loading Image From the internet 
Loading images from the network is also a feature provided by fresco, This always allows users to have the capability to obtain the necessary image from the network directly. To have this capability the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

### Step 9: Adding a circular shape to an image
Without all the procedures of adding a dependency to enable the use of circular image view, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

### Step 10: Image Transformation
Fresco makes use of the in-build library to perform different transformations for instance to apply rotation and resizing the below lines of code is included to explain more on the transformations.

#### Rotation
You can rotate images by specifying a rotation angle in the image request, like so:

`.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))`

#### Resizing
Resizing does not modify the original file, it just resizes an encoded image in memory, prior to being decoded. To resize, pass a ResizeOptions object when constructing an ImageRequest

`setResizeOptions(ResizeOptions(50,50))`

### Step 11: Adding a progressbar
To have an idea if the image is loading, it would be appropriate to add a progress bar which shows if the image is on a loading process. The below line of code in your XML explains how to include a progress bar 

```Xml
fresco:progressBarImage="@drawable/progress_bar"

```

When you run the project one should expect to see the following outputs
![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

### Conclusion
Fresco is a unique library that offers features such as animations, streaming, image loading, and transformation. Explore more on the other features provided by Fresco from their official documentation to help you in your android development process.

Keep Learning.

### References
- [Fresco Official Documentation](https://frescolib.org/).Fresco was created by Facebook engineers to make efficient use of memory and improves productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.

### Introduction
Fresco is a logical build-in system for displaying images in mobile applications.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet
- Internal storage and resources and present a placeholder until the image arrives.

So let's talk more about Fresco in this article.

### Prerequisites
- Have Android Studio installed.
- Have a basic knowledge of building Android applications.
- Have a basic understanding of the Kotlin programming language
- An understanding on how to use ViewBinding

### What is Fresco
Fresco is a logical built-in system for displaying and managing image URLs in the android application. It generally caches the image in a memory-efficient manner. The most important feature is to display a placeholder image until the image arrives from the URL this saves on data and makes efficient use of CPU. 

### Some of the libraries used to load the image on the android application
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke HttpUrlConnection. Although there are also utility libraries that link into Google's Volley project or Square's OkHttp library. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like Retrofit, OkHttp, and Leak Canary. The developers of this collection placed a strong emphasis on the work's simplicity and readability. Because of the minimalistic approach, the .apk file size is kept is only 121 Kb. The library also keeps track of how many methods are in use.

### Features Of Fresco
#### Image Caching
Libraries like Picasso and Glide give a way to clear cache completely or even eliminating specific images. Also it is possible to manage it more precisely by using the signature function and custom key.

Fresco memory cache is in three-level:

- Ready images for display or post-processing are decoded with the help of Bitmap
- compressed images are stored in the original state within the memory through the help of encoded memory cache
- presence of a disk that stores compressed images in the original state in local storage.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of image in the cache, get the cached image and even delete them.

#### Image Transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced picture manipulation tools are found in Fresco. The majority of these can be used in an XML layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files; it can't make an image bigger and can only shrink it to 1/8 of its original size. Fresco, like other loaders, can be used with pre-built transformation libraries. A custom implementation of the Postprocessor class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIFs and WebPs is an issue. Because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing of frames as well as managing their memory.

#### Streaming
Streaming is a criterion that present images in a low resolution at a previous instant ,then progressively upgrades the quality as more image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URI, and the app will automatically update its display as new data arrives.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU, it entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down. Fresco is used to place images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen, which improves the app's running time. Fresco allows the app to run on low-end devices without constantly struggling to keep their image memory under control.

#### Drawing
Fresco Drawee is a technique used to display a placeholder until the image has loaded so that it can be displayed automatically when it arrives. When the image exits the screen, its memory is automatically released.

Drawee provides several features: -

- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or in a circle
- display a custom overlay if users happen to press the image.
- Ability to display custom background, overlays, or progress bar on the image.

### Advantage of Fresco in android application
- Fresco makes efficient use of memory
- Improves image productivity through streaming
- Make use of simpleDraweeView which show a placeholder until the image loads instead of traditional imageView

### Getting Started

### Step 1: Creating Project
In this step, we need to create an empty Android studio project.
![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

### Step 2: Adding Necessary Dependencies
To use fresco in our project will need to add the fresco library.
For playing animations like GIF, we will also add the required dependency.

```Gradle
    // Fresco library
    implementation 'com.facebook.fresco:fresco:2.5.0'
    
    // Fresco Animation library
    implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

### Step 3: Creating Base Application Class
In this step, we will create a class that will be used to initialize Fresco once.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

### Step 4: Enabling Internet Permission
Here we will be required to enable internet permission as an image will be fetched from the internet.

```
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest don't forget to include the name of the base application class we created

```
<application
       android:name=".MyApp"
</application>
```

### Step 5: Creating a Layout
In your layout XML, add a custom namespace to the top-level element.
This is needed to access the custom fresco attributes which allows you to control how the image is loaded and displayed.

```Xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

#### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the network. It can added with the following line of code.

```Xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

#### Add Round corners and circles
- Round Circle Image
```Xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

 - Round Corners
  ```Xml
  <com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
  ```

### Step 6: Loading Gif Animation
Animation is the capability to load GIFs and WebPs in an android application, this feature is primarily provided by Fresco, For one to use it within his android application, the method `setAutoPlayAnimation()` is set to be true.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```            

### Step 7: Streaming JPEG Images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in the android application by setting the method `setProgressiveRenderingEnabled()` to true.

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

### Step 8: Loading Image From the internet 
Loading images from the network is also a feature provided by fresco, This always allows users to have the capability to obtain the necessary image from the network directly. To have this capability the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

### Step 9: Adding a circular shape to an image
Without all the procedures of adding a dependency to enable the use of circular image view, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

### Step 10: Image Transformation
Fresco makes use of the in-build library to perform different transformations for instance to apply rotation and resizing the below lines of code is included to explain more on the transformations.

#### Rotation
You can rotate images by specifying a rotation angle in the image request, like so:

`.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))`

#### Resizing
Resizing does not modify the original file, it just resizes an encoded image in memory, prior to being decoded. To resize, pass a ResizeOptions object when constructing an ImageRequest

`setResizeOptions(ResizeOptions(50,50))`

### Step 11: Adding a progressbar
To have an idea if the image is loading, it would be appropriate to add a progress bar which shows if the image is on a loading process. The below line of code in your XML explains how to include a progress bar 

```Xml
fresco:progressBarImage="@drawable/progress_bar"

```

When you run the project one should expect to see the following outputs
![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

### Conclusion
Fresco is a unique library that offers features such as animations, streaming, image loading, and transformation. Explore more on the other features provided by Fresco from their official documentation to help you in your android development process.

Keep Learning.

### References
- [Fresco Official Documentation](https://frescolib.org/).Fresco was created by Facebook engineers to make efficient use of memory and improves productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.

### Introduction
Fresco is a logical build-in system for displaying images in mobile applications.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet
- Internal storage and resources and present a placeholder until the image arrives.

So let's talk more about Fresco in this article.

### Prerequisites
- Have Android Studio installed.
- Have a basic knowledge of building Android applications.
- Have a basic understanding of the Kotlin programming language
- An understanding on how to use ViewBinding

### What is Fresco
Fresco is a logical built-in system for displaying and managing image URLs in the android application. It generally caches the image in a memory-efficient manner. The most important feature is to display a placeholder image until the image arrives from the URL this saves on data and makes efficient use of CPU. 

### Some of the libraries used to load the image on the android application
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke HttpUrlConnection. Although there are also utility libraries that link into Google's Volley project or Square's OkHttp library. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like Retrofit, OkHttp, and Leak Canary. The developers of this collection placed a strong emphasis on the work's simplicity and readability. Because of the minimalistic approach, the .apk file size is kept is only 121 Kb. The library also keeps track of how many methods are in use.

### Features Of Fresco
#### Image Caching
Libraries like Picasso and Glide give a way to clear cache completely or even eliminating specific images. Also it is possible to manage it more precisely by using the signature function and custom key.

Fresco memory cache is in three-level:

- Ready images for display or post-processing are decoded with the help of Bitmap
- compressed images are stored in the original state within the memory through the help of encoded memory cache
- presence of a disk that stores compressed images in the original state in local storage.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of image in the cache, get the cached image and even delete them.

#### Image Transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced picture manipulation tools are found in Fresco. The majority of these can be used in an XML layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files; it can't make an image bigger and can only shrink it to 1/8 of its original size. Fresco, like other loaders, can be used with pre-built transformation libraries. A custom implementation of the Postprocessor class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIFs and WebPs is an issue. Because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing of frames as well as managing their memory.

#### Streaming
Streaming is a criterion that present images in a low resolution at a previous instant ,then progressively upgrades the quality as more image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URI, and the app will automatically update its display as new data arrives.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU, it entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down. Fresco is used to place images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen, which improves the app's running time. Fresco allows the app to run on low-end devices without constantly struggling to keep their image memory under control.

#### Drawing
Fresco Drawee is a technique used to display a placeholder until the image has loaded so that it can be displayed automatically when it arrives. When the image exits the screen, its memory is automatically released.

Drawee provides several features: -

- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or in a circle
- display a custom overlay if users happen to press the image.
- Ability to display custom background, overlays, or progress bar on the image.

### Advantage of Fresco in android application
- Fresco makes efficient use of memory
- Improves image productivity through streaming
- Make use of simpleDraweeView which show a placeholder until the image loads instead of traditional imageView

### Getting Started

### Step 1: Creating Project
In this step, we need to create an empty Android studio project.
![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

### Step 2: Adding Necessary Dependencies
To use fresco in our project will need to add the fresco library.
For playing animations like GIF, we will also add the required dependency.

```Gradle
    // Fresco library
    implementation 'com.facebook.fresco:fresco:2.5.0'
    
    // Fresco Animation library
    implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

### Step 3: Creating Base Application Class
In this step, we will create a class that will be used to initialize Fresco once.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

### Step 4: Enabling Internet Permission
Here we will be required to enable internet permission as an image will be fetched from the internet.

```
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest don't forget to include the name of the base application class we created

```
<application
       android:name=".MyApp"
</application>
```

### Step 5: Creating a Layout
In your layout XML, add a custom namespace to the top-level element.
This is needed to access the custom fresco attributes which allows you to control how the image is loaded and displayed.

```Xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

#### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the network. It can added with the following line of code.

```Xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

#### Add Round corners and circles
- Round Circle Image
```Xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

 - Round Corners
  ```Xml
  <com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
  ```

### Step 6: Loading Gif Animation
Animation is the capability to load GIFs and WebPs in an android application, this feature is primarily provided by Fresco, For one to use it within his android application, the method `setAutoPlayAnimation()` is set to be true.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```            

### Step 7: Streaming JPEG Images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in the android application by setting the method `setProgressiveRenderingEnabled()` to true.

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

### Step 8: Loading Image From the internet 
Loading images from the network is also a feature provided by fresco, This always allows users to have the capability to obtain the necessary image from the network directly. To have this capability the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

### Step 9: Adding a circular shape to an image
Without all the procedures of adding a dependency to enable the use of circular image view, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

### Step 10: Image Transformation
Fresco makes use of the in-build library to perform different transformations for instance to apply rotation and resizing the below lines of code is included to explain more on the transformations.

#### Rotation
You can rotate images by specifying a rotation angle in the image request, like so:

`.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))`

#### Resizing
Resizing does not modify the original file, it just resizes an encoded image in memory, prior to being decoded. To resize, pass a ResizeOptions object when constructing an ImageRequest

`setResizeOptions(ResizeOptions(50,50))`

### Step 11: Adding a progressbar
To have an idea if the image is loading, it would be appropriate to add a progress bar which shows if the image is on a loading process. The below line of code in your XML explains how to include a progress bar 

```Xml
fresco:progressBarImage="@drawable/progress_bar"

```

When you run the project one should expect to see the following outputs
![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

### Conclusion
Fresco is a unique library that offers features such as animations, streaming, image loading, and transformation. Explore more on the other features provided by Fresco from their official documentation to help you in your android development process.

Keep Learning.

### References
- [Fresco Official Documentation](https://frescolib.org/).Fresco was created by Facebook engineers to make efficient use of memory and improves productivity. Fresco was open-sourced for the first time in early 2015. This library is used by firms including Wikipedia, Twitter, and Redfin for their Android apps, Facebook included.

### Introduction
Fresco is a logical build-in system for displaying images in mobile applications.

It covers up the issues of image loading and displaying, reducing the tedious work to worry about the logic used to load the image from:
- Internet
- Internal storage and resources and present a placeholder until the image arrives.

So let's talk more about Fresco in this article.

### Prerequisites
- Have Android Studio installed.
- Have a basic knowledge of building Android applications.
- Have a basic understanding of the Kotlin programming language
- An understanding on how to use ViewBinding

### What is Fresco
Fresco is a logical built-in system for displaying and managing image URLs in the android application. It generally caches the image in a memory-efficient manner. The most important feature is to display a placeholder image until the image arrives from the URL this saves on data and makes efficient use of CPU. 

### Some of the libraries used to load the image on the android application
#### Glide
Fetching, decoding, and displaying videos, pictures, and animated GIFs are all supported by Glide. Glide comes with a versatile API that lets developers integrate it with any network stack. Glide's default stack is based on a bespoke HttpUrlConnection. Although there are also utility libraries that link into Google's Volley project or Square's OkHttp library. Glide's main goal is to make scrolling easier.

#### Picasso
Square founded it, and it's known in the Android world for libraries like Retrofit, OkHttp, and Leak Canary. The developers of this collection placed a strong emphasis on the work's simplicity and readability. Because of the minimalistic approach, the .apk file size is kept is only 121 Kb. The library also keeps track of how many methods are in use.

### Features Of Fresco
#### Image Caching
Libraries like Picasso and Glide give a way to clear cache completely or even eliminating specific images. Also it is possible to manage it more precisely by using the signature function and custom key.

Fresco memory cache is in three-level:

- Ready images for display or post-processing are decoded with the help of Bitmap
- compressed images are stored in the original state within the memory through the help of encoded memory cache
- presence of a disk that stores compressed images in the original state in local storage.

With the help of the image pipeline class, Fresco manages the cache which provides the capability to check the existence of image in the cache, get the cached image and even delete them.

#### Image Transformation
Picasso provides built-in transformations like resize, center crop, center inside, and rotation. Glide transformation works similar to that of Picasso. The most advanced picture manipulation tools are found in Fresco. The majority of these can be used in an XML layout to indicate the appropriate characteristics. Applying them is more difficult from a code standpoint.

Furthermore, certain common tools have restrictions. Resize, for example, can only be used with JPEG files; it can't make an image bigger and can only shrink it to 1/8 of its original size. Fresco, like other loaders, can be used with pre-built transformation libraries. A custom implementation of the Postprocessor class is required to create your transformation.

### Fresco distinguishable features
#### Animation
The consideration of mobile application animations like GIFs and WebPs is an issue. Because each frame is a large bitmap and every animation series is a frame. Fresco is primarily responsible for loading and disposing of frames as well as managing their memory.

#### Streaming
Streaming is a criterion that present images in a low resolution at a previous instant ,then progressively upgrades the quality as more image is downloaded. It is always advantageous for users on a slow network. Glide, Picasso, and other Android image displaying libraries do not support streaming, but Fresco does. All you have to do is specify a URI, and the app will automatically update its display as new data arrives.

#### Loading
Fresco uses pipeline as a technique to load images from local storage or resource to save data and CPU, it entails a three-level cache with two in memory and one in internal storage.

#### Memory
To avoid the problem of an android bitmap taking up a lot of memory, resulting in frequent runs of the java garbage collector and app slowing down. Fresco is used to place images in a special region of Android memory and ensures that images are automatically released from memory when they are no longer displayed on the screen, which improves the app's running time. Fresco allows the app to run on low-end devices without constantly struggling to keep their image memory under control.

#### Drawing
Fresco Drawee is a technique used to display a placeholder until the image has loaded so that it can be displayed automatically when it arrives. When the image exits the screen, its memory is automatically released.

Drawee provides several features: -

- Scaling the image to a point of focus.
- Capability to retry image loading by tapping the placeholder.
- Technique to display the image in rounded corners or in a circle
- display a custom overlay if users happen to press the image.
- Ability to display custom background, overlays, or progress bar on the image.

### Advantage of Fresco in android application
- Fresco makes efficient use of memory
- Improves image productivity through streaming
- Make use of simpleDraweeView which show a placeholder until the image loads instead of traditional imageView

### Getting Started

### Step 1: Creating Project
In this step, we need to create an empty Android studio project.
![New Project](/engineering-education/displaying-images-with-fresco-library-in-android/new_project.png)

### Step 2: Adding Necessary Dependencies
To use fresco in our project will need to add the fresco library.
For playing animations like GIF, we will also add the required dependency.

```Gradle
    // Fresco library
    implementation 'com.facebook.fresco:fresco:2.5.0'
    
    // Fresco Animation library
    implementation 'com.facebook.fresco:animated-gif:2.5.0'
```

### Step 3: Creating Base Application Class
In this step, we will create a class that will be used to initialize Fresco once.

```kotlin
class MyApp: Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }
}
```

### Step 4: Enabling Internet Permission
Here we will be required to enable internet permission as an image will be fetched from the internet.

```
<uses-permission android:name="android.permission.INTERNET"/>
```

Within the Manifest don't forget to include the name of the base application class we created

```
<application
       android:name=".MyApp"
</application>
```

### Step 5: Creating a Layout
In your layout XML, add a custom namespace to the top-level element.
This is needed to access the custom fresco attributes which allows you to control how the image is loaded and displayed.

```Xml
xmlns:fresco="http://schemas.android.com/apk/res-auto"
```

#### Add a placeholder
A placeholder is displayed temporarily before the image is loaded from the network. It can added with the following line of code.

```Xml
fresco:placeholderImage="@drawable/ic_launcher_background"
```

#### Add Round corners and circles
- Round Circle Image
```Xml
<com.facebook.drawee.view.SimpleDraweeView
  app:roundingBorderColor="@color/black"
  fresco:roundAsCircle="true"
  fresco:roundingBorderWidth="1dp"/>
```

 - Round Corners
  ```Xml
  <com.facebook.drawee.view.SimpleDraweeView
  fresco:roundedCornerRadius="5dp"
  fresco:roundingBorderWidth="1dp"
  fresco:roundingBorderColor="@color/red"/>
  ```

### Step 6: Loading Gif Animation
Animation is the capability to load GIFs and WebPs in an android application, this feature is primarily provided by Fresco, For one to use it within his android application, the method `setAutoPlayAnimation()` is set to be true.

```kotlin
binding.animimage.controller = Fresco.newDraweeControllerBuilder()
            .setImageRequest(ImageRequest.fromUri("https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"))
            .setAutoPlayAnimations(true)
            .build()
```            

### Step 7: Streaming JPEG Images
Streaming gives the capability to load an image in low resolution and improves it to high resolution as more of its contrast is loaded. Fresco gives a way to use streaming in the android application by setting the method `setProgressiveRenderingEnabled()` to true.

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

### Step 8: Loading Image From the internet 
Loading images from the network is also a feature provided by fresco, This always allows users to have the capability to obtain the necessary image from the network directly. To have this capability the method `setImageURI()` is used by passing the image link to the method.

```kotlin
binding.networkimage.setImageURI("https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg")
```

### Step 9: Adding a circular shape to an image
Without all the procedures of adding a dependency to enable the use of circular image view, Fresco provides the ability to shape an image in a circular view by adding the following line of code.

```kotlin
binding.circularimage.setImageURI("https://www.worldatlas.com/r/w1200/upload/79/70/5a/shutterstock-549814942.jpg")
```

### Step 10: Image Transformation
Fresco makes use of the in-build library to perform different transformations for instance to apply rotation and resizing the below lines of code is included to explain more on the transformations.

#### Rotation
You can rotate images by specifying a rotation angle in the image request, like so:

`.setRotationOptions(RotationOptions.forceRotation(RotationOptions.ROTATE_90))`

#### Resizing
Resizing does not modify the original file, it just resizes an encoded image in memory, prior to being decoded. To resize, pass a ResizeOptions object when constructing an ImageRequest

`setResizeOptions(ResizeOptions(50,50))`

### Step 11: Adding a progressbar
To have an idea if the image is loading, it would be appropriate to add a progress bar which shows if the image is on a loading process. The below line of code in your XML explains how to include a progress bar 

```Xml
fresco:progressBarImage="@drawable/progress_bar"

```

When you run the project one should expect to see the following outputs
![demo](/engineering-education/displaying-images-with-fresco-library-in-android/demo.gif)

Check out the entire project on [GitHub](https://github.com/brandy-kay/FrescoLibraryDemo).

### Conclusion
Fresco is a unique library that offers features such as animations, streaming, image loading, and transformation. Explore more on the other features provided by Fresco from their official documentation to help you in your android development process.

Keep Learning.

### References
- [Fresco Official Documentation](https://frescolib.org/).