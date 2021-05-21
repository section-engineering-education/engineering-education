---
layout: engineering-education
status: publish
published: true
url: /using-picasso-in-android/
title: Using Picasso in Android
description: In this article, we will illustrate the different features offered by Picasso in Android applications such as image resizing, cropping, and rotation.
author: briana-nzivu
date: 2021-01-05T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-picasso-in-android/hero.jpg
    alt: example image Picasso Android applications
---
Visual representation in mobile application development is a growing UI/UX trend. In this current era, most of our minds seem to understand either graphics in motion or pictures rather than words. With time, most mobile applications such as Instagram, Facebook, Twitter, and LinkedIn started implementing visual representation. This was not perfect the first time around.
<!--more-->
### Introduction
Images were of low quality, could neither be downloaded, nor edited, and screens would "freeze" as pictures loaded. As much as it was an improvement in mobile development, it was still hectic. Developers had to solve these problems. Many visual representation libraries such as `Glide`, `Picasso`, `Image loader`, and `Fresco` were then developed. 

In this article, we will discuss **Picasso**. Picasso is a powerful image loading, downloading, and caching library developed by Square. Picasso offers better image quality, disk caching, and simpler syntax to carry out various library features.

### Uses of Picasso
Picasso has the following features:
- Image loading: This refers to accessing an image via a URL.
- Resizing and scaling of images: This refers to adjusting the size of an image.
- Center cropping images: This is scaling a whole image by resampling it.
- Rotation and transformation of images: This refers to changing the orientation of an image from a point.
- Placeholder and error images: This refers to images displayed when there is an error or when an image is being loaded into an `ImageView`.
- Priority requests:  This refers to an option of loading images into an `ImageView` depending on its priority to be displayed, such as a Hero image, can be given the first priority to load an image before other minor image views.
- Memory and disk caching: Caching allows for offline capabilities and less resource usage. It ensures the image is not downloaded every time it is needed.
- Fading: This refers to an animation feature offered by Picasso.
- Supports parallel downloading and request cancellation: Parallel downloading refers to downloading two images at the same time where as request cancellation refers to cancelling image requests.

### Advantages of Picasso
- Picasso offers high quality loaded images.
- Full size caching.
- Picasso supports request cancellation and parallel downloading.
- It is easy to use.
- Picasso offers various editing tools, for example, resizing, cropping, and others.
- Picasso offers efficient multi-threaded networking.

### Disadvantages of Picasso
- Picasso does not support GIF animation on a simple image view.
- [Glide](https://github.com/bumptech/glide) loads images faster than Picasso.

### Useful terminology
- [Library](https://developer.android.com/studio/projects/android-library#:~:text=An%20Android%20library%20is%20structurally,files%2C%20and%20an%20Android%20manifest.&text=AAR%20files%20can%20contain%20C,app%20module's%20C%2FC%2B%2B%20code) - This refers to a file that compiles into an Android Archive (AAR) file used as a dependency.
- [Caching](https://appmattus.medium.com/caching-made-simple-on-android-d6e024e3726b) - The process of storing data in a temporary storage area (cache).
- [Multi-thread networking](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)) This refers to the ability to work on multiple tasks at the same time.
- Bitmap - This refers to a digital image composed of a matrix and dots used to store digital photos.

### Prerequisites
- Have [Android Studio](https://developer.android.com/studio) installed.
- The reader should have a beginner level understanding of Java and XML.  
- The reader should have basic understanding of image loading in Android applications.


### Step 1 – Create a new AndroidStudio project
- Open Android studio. Select Start new Android Studio Project ->  Empty Activity ->. Let us name the **Picasso**. Click Finish and wait for the project to build.

![Name the project](/engineering-education/using-picasso-in-android/name.jpg)

### Step 2 - Adding Picasso to our project
Add the following dependency to the app module-level build.gradle file:
```gradle
  implementation 'com.squareup.picasso:picasso:2.71828'
```

Add internet permission to your application.

```manifest
<uses-permission android:name="android.permission.INTERNET />
```

#### Step 3 – Design the XML layout resource file
In this step, we will design our layout for our application. Our layout will contain an ImageView, that will display our image and nine buttons, each with a different function to illustrate Picasso's features.

```xml
<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	 xmlns:app="http://schemas.android.com/apk/res-auto"
	 xmlns:tools="http://schemas.android.com/tools"
	 android:layout_width="match_parent"
	 android:layout_height="match_parent"
	 tools:context=".MainActivity"
	 android:background="@color/white">

	 <ImageView
	 android:id="@+id/myImageView"
	 android:layout_width="300dp"
	 android:layout_height="200dp"
	 app:layout_constraintBottom_toBottomOf="parent"
	 app:layout_constraintEnd_toEndOf="parent"
	 app:layout_constraintHorizontal_bias="0.495"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toTopOf="parent"
	 app:layout_constraintVertical_bias="0.03" />

	 <Button
	 android:id="@+id/showUrl"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="54dp"
	 android:layout_marginLeft="54dp"
	 android:layout_marginTop="72dp"
	 android:layout_marginEnd="19dp"
	 android:layout_marginRight="19dp"
	 android:layout_marginBottom="37dp"
	 android:text="URL"
	 app:layout_constraintBottom_toTopOf="@+id/showRotation"
	 app:layout_constraintEnd_toEndOf="parent"
	 app:layout_constraintStart_toEndOf="@+id/showError"
	 app:layout_constraintTop_toBottomOf="@+id/myImageView" />

	 <Button
	 android:id="@+id/showDrawable"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="4dp"
	 android:layout_marginLeft="4dp"
	 android:layout_marginTop="80dp"
	 android:layout_marginEnd="44dp"
	 android:layout_marginRight="44dp"
	 android:layout_marginBottom="29dp"
	 android:text="Drawable"
	 app:layout_constraintBottom_toTopOf="@+id/showScaling"
	 app:layout_constraintEnd_toStartOf="@+id/showError"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toBottomOf="@+id/myImageView" />

	 <Button
	 android:id="@+id/showPlaceholder"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="132dp"
	 android:layout_marginLeft="132dp"
	 android:layout_marginEnd="23dp"
	 android:layout_marginRight="23dp"
	 android:text="Placeholder"
	 app:layout_constraintBottom_toBottomOf="parent"
	 app:layout_constraintEnd_toStartOf="@+id/showCallback"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toTopOf="parent"
	 app:layout_constraintVertical_bias="0.682" />

	 <Button
	 android:id="@+id/showError"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginTop="72dp"
	 android:layout_marginBottom="37dp"
	 android:text="Error"
	 app:layout_constraintBottom_toTopOf="@+id/showTarget"
	 app:layout_constraintEnd_toEndOf="parent"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toBottomOf="@+id/myImageView" />

	 <Button
	 android:id="@+id/showResize"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="4dp"
	 android:layout_marginLeft="4dp"
	 android:layout_marginEnd="40dp"
	 android:layout_marginRight="40dp"
	 android:text="Resize"
	 app:layout_constraintBottom_toBottomOf="parent"
	 app:layout_constraintEnd_toStartOf="@+id/showPlaceholder"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toTopOf="parent"
	 app:layout_constraintVertical_bias="0.682" />

	 <Button
	 android:id="@+id/showRotation"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="288dp"
	 android:layout_marginLeft="288dp"
	 android:layout_marginEnd="16dp"
	 android:layout_marginRight="16dp"
	 android:text="Rotation"
	 app:layout_constraintBottom_toBottomOf="parent"
	 app:layout_constraintEnd_toEndOf="parent"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toTopOf="parent"
	 app:layout_constraintVertical_bias="0.546" />

	 <Button
	 android:id="@+id/showCallback"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="296dp"
	 android:layout_marginLeft="296dp"
	 android:layout_marginEnd="4dp"
	 android:layout_marginRight="4dp"
	 android:text="Callback"
	 app:layout_constraintBottom_toBottomOf="parent"
	 app:layout_constraintEnd_toEndOf="parent"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toTopOf="parent"
	 app:layout_constraintVertical_bias="0.682" />

	 <Button
	 android:id="@+id/showTarget"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="148dp"
	 android:layout_marginLeft="148dp"
	 android:layout_marginEnd="49dp"
	 android:layout_marginRight="49dp"
	 android:text="TArget"
	 app:layout_constraintBottom_toBottomOf="parent"
	 app:layout_constraintEnd_toStartOf="@+id/showRotation"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toTopOf="parent"
	 app:layout_constraintVertical_bias="0.546" />

	 <Button
	 android:id="@+id/showScaling"
	 android:layout_width="wrap_content"
	 android:layout_height="wrap_content"
	 android:layout_marginStart="4dp"
	 android:layout_marginLeft="4dp"
	 android:layout_marginEnd="56dp"
	 android:layout_marginRight="56dp"
	 android:text="Scale"
	 app:layout_constraintBottom_toBottomOf="parent"
	 app:layout_constraintEnd_toStartOf="@+id/showTarget"
	 app:layout_constraintStart_toStartOf="parent"
	 app:layout_constraintTop_toTopOf="parent"
	 app:layout_constraintVertical_bias="0.546" />

	</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3 – Initialize objects
In our `MainActivity` class, initialize the image view and the buttons that are in the layout resource file.

```java
ImageView imageView;
int i = 0;
Button buttonDrawableImage,buttonUrlImage, buttonErrorImage, buttonPlaceholderImage, buttonCallback, buttonResizeImage, buttonRotateImage, buttonScaleImage, buttonTarget;
```

### Step 4 – Create a custom method
First, we will set an `OnClickListener` for all the buttons. Afterward, create a method called `initializeView`. 

This method will contain the code required to illustrate the following features of Picasso:
- Resizing an image.
- Scaling an image.
- Loading a Drawable image.
- Placeholder.
- Callback methods.
- Errors.
- Rotate.
- Target.
- URL.

### A) Resizing an image
 **Resizing** refers to adjusting the size of an image by cropping, scaling, etc. Picasso allows us to resize images before displaying an image using the `resize()` method and setting the desired height and width. In our `MainActivity.java`, add the following lines of code;

```java
// In the initializeView method
buttonResizeImage = (Button) findViewById(R.id.showResize); buttonResizeImage.setOnClickListener(this);

// In the onClick method
case R.id.showResize:
Picasso.get().load(R.drawable.image).resize(200, 200).into(imageView);
	 break;
```
### B) Scaling an image
**Scaling** is resizing a whole image by resampling it. In this project, we will sample three ways, those being: **Fit**, **Center Crop**, and **Center Inside**. 

We will use `centerCrop()`, `centerInside()` and the `fit()` method.

**Note: The `fit ()` method is not used together with the `resize()` method since it has in-built dimensions. `centerCrop()` and `centerInside()` methods are used together with the `resize()` method.**

In our `MainActivity.java`, add the following lines of code in the `onClick` method.

```java
case R.id.showScaling:
    if (i == 3)
        i = 1;
    else {
        if (i == 3) {
            Picasso.get().load(R.drawable.image).resize(200, 200).centerInside().into(imageView);
            Toast.makeText(getApplicationContext(), "Scale:Center Inside", Toast.LENGTH_SHORT).show();
        } else if (i == 2) {
            Picasso.get().load(R.drawable.image).resize(200, 200).centerCrop().into(imageView);
            Toast.makeText(getApplicationContext(), "Scale:Center Crop", Toast.LENGTH_SHORT).show();
        } else if (i == 1) {
            Picasso.get().load(R.drawable.image).fit().into(imageView);
            Toast.makeText(getApplicationContext(), "Scale:Fit", Toast.LENGTH_SHORT).show();
        }
        i++;
    }
    break;
 ```

### C) Loading a drawable image
Loading a drawable image is a basic feature offered by Picasso. Other than assigning an image view on the XML manually, one can easily assign an image through Picasso. In our `MainActivity.java` file, add the following lines of code.

```java
// In the initializeView method
buttonDrawableImage = (Button) findViewById(R.id.showDrawable); buttonDrawableImage.setOnClickListener(this);

// In the onClick method
 switch (view.getId()) {
	 case R.id.showDrawable:
	 Picasso.get().load(R.drawable.image).into(imageView);
	 break;
```

### D) Placeholder
A placeholder usually is a drawable image displayed before an image is loaded into an image view. This feature comes in handy, especially if an image takes time to be loaded. 

In our `MainActivity.java`, in the `onClick` method, add the following lines of code:
```java
// In the initializeView method
buttonPlaceholderImage = (Button) findViewById(R.id.showPlaceholder); buttonPlaceholderImage.setOnClickListener(this);

// In the onClick method
 case R.id.showPlaceholder:
	 Picasso.get().load(R.drawable.placeholder).into(imageView);
	 break;
```

### E) Callback methods
Picasso provides callback methods to keep track and show the status of a loaded image and display a text/toast accordingly. We have displayed a toast message to show either an image is loaded successfully or an error. 

In our `MainActivity.java` file, add the following lines of code:
```java
// In the initializeView method
 buttonCallback = (Button) findViewById(R.id.showCallBack); buttonCallback.setOnClickListener(this);

// In the onClick method
case R.id.showCallback:
    Picasso.get().load("www.google.com").error(R.mipmap.ic_launcher).into(imageView, new Callback() {
        @Override
        public void onSuccess() {
            Log.d("TAG", "onSuccess");
        }
        @Override
        public void onError(Exception exception) {
            Toast.makeText(getApplicationContext(), "Cannot fetch data error", Toast.LENGTH_SHORT).show();
        }
    });
    break;
```

### F) Errors
An error drawable is usually displayed when an image is not loaded successfully. We use the `error()` method. In our `MainActivity.java` file, add the following lines of code:

```java
// In the initializeView method
buttonErrorImage = (Button) findViewById(R.id.showError); buttonErrorImage.setOnClickListener(this);

// In the onClick method
case R.id.showError:
 Picasso.get().load("www.google.com").placeholder(R.drawable.placeholder).error(R.drawable.error).into(imageView);
 break;
```

### G) Rotate
This refers to changing the orientation of an image by degrees from a point (0,0). A `rotate()` method is normally used. In our `MainActivity.java` file, add the following lines of code:

```java
// In the initializeView method
buttonRotateImage = (Button) findViewById(R.id.showRotate); buttonRotateImage.setOnClickListener(this);

// In the onClick method
case R.id.showRotate:
	 Picasso.get().load(R.drawable.image).rotate(90f).into(imageView);
	 break;
```  

### H) Targets  
Targets combine image loading, callbacks, and errors. They return bitmap images. Targets normally use `onBitmapLoaded()`, `onBitmapFailed()` and on `Prepared()` methods. 

In our `MainActivity.java` file, add the following lines of code:
```java
// In the initializeView method
buttonTarget = (Button) findViewById(R.id.showTarget); buttonTarget.setOnClickListener(this);

// In the onClick method
case R.id.showTarget:
 Picasso.get().load("https://cdn.journaldev.com/wp-content/uploads/2017/01/android-constraint-layout-sdk-tool-install.png").placeholder(R.drawable.placeholder).error(R.drawable.error).into(myTarget);
 break;
```

Next, create a `Target` object with it's respective methods.

```java
  private Target myTarget = new Target() {
        @Override
        public void onBitmapLoaded(Bitmap myBitmap, Picasso.LoadedFrom from) {

            imageView.setImageBitmap(myBitmap);
        }

        @Override
        public void onBitmapFailed(Exception exception, Drawable drawablerror) {
            imageView.setImageDrawable(drawablerror);
        }

        @Override
        public void onPrepareLoad(Drawable drawablePlaceHoler) {
            imageView.setImageDrawable(drawablePlaceHoler);
        }
    };
```

### I) Loading an image from an URL
Rather than downloading images, we can simply display the images through picasso using a link without downloading them. We normally use a load() method for this. 

In our `MainActivity.java` file, add the following lines of code:

```java
 String url = "https://www.pexels.com/photo/low-angle-photo-of-woman-leaning-on-metal-railing-3621953/";

 // In the initializeView method
 buttonUrlImage = (Button) findViewById(R.id.showUrl);
 buttonUrlImage.setOnClickListener(this);

// In the onClick method
case R.id.showUrl:
 Picasso.get().load(url).into(imageView);
 break;
```

**Note: Picasso does not cache images from URLs without image extensions, i.e if the image URL does not end with `.png`, `.jpg` etc.**

We are done! Let us run the app.


![Picasso](/engineering-education/using-picasso-in-android/app.gif)

### Conclusion.
Picasso is a powerful image loading library with various features. We have discussed scaling, resizing, targets, callbacks, and the rest. Instead of manually implementing all these features with a bunch of code, why not use Picasso, which is easy to use and offers better syntax. 

Go on and read more about Picasso in their official [documentation](https://square.github.io/picasso/) and other features it offers and implement them in your Android applications.

Access the source code on [GitHub](https://github.com/BrianaNzivu/EngineeringEducation/tree-save/main/Picasso).

Download the sample APK from Google [Drive](https://drive.google.com/file/d/1wkweiHuBYV5jwncJbYRWRcRxxzrXCwGk/view?usp=sharing).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
