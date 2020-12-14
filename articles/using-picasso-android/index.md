This article will illustrate the different features offered by Picasso in Android applications.

### Introduction
Visual representation in mobile application development is a growing UI/UX trend. In this current era, most of our minds seem to understand either graphics in motion or pictures than words. With time, most mobile applications, for example, Instagram, Facebook, Twitter, LinkedIn, etc, started implementing visual representation. It was not perfect the first time. Images were of low quality, could neither be downloaded nor edited, and screens would "freeze" as pictures loaded. As much as it was an improvement in mobile development, it was still hectic. Developers had to solve these problems. Many visual representation libraries such as `Glide`, `Picasso`, `Image loader`, `Fresco`, etc ,were developed. In his article, we will discuss **Picasso**. **Picasso** is a powerful image loading, downloading, and caching library developed by Square. Picasso offers better image quality, disk caching, and simpler syntax to carry out various library features.

### Uses of Picasso
Picasso has the following features:
- Image loading.
- Resizing and Scaling of images. 
- Center Cropping images.
- Rotation and Transformation of images. 
- Placeholder and Error images
- Priority requests
- Memory and disk Caching.
- Fading
- Supports parallel downloading and request cancellation. 

### Advantages of Picasso.
- Picasso offers high quality loaded images. 
- Full size caching. 
- Picasso supports request cancellation and parallel downloading. 
- It is easy to use. .
- Picasso offers various editing tools, for example, resizing, cropping, and others. 
- Picasso offers efficient multithreaded networking.

### Disadvantages of Picasso.
- Picasso does not support GIF animation on a simple image view. 
- [Glide](https://github.com/bumptech/glide) loads images faster than Picasso.

### Useful Terminology
- [Picasso](https://square.github.io/picasso/) - a powerful image loading, downloading, and caching library developed by Square.
- [Library](https://developer.android.com/studio/projects/android-library#:~:text=An%20Android%20library%20is%20structurally,files%2C%20and%20an%20Android%20manifest.&text=AAR%20files%20can%20contain%20C,app%20module's%20C%2FC%2B%2B%20code) - This refers to a file that compiles into an Android Archive (AAR) file used as a dependency. 
- [Caching](https://appmattus.medium.com/caching-made-simple-on-android-d6e024e3726b) - The process of storing data in a temporary storage area(cache).
- [Multithread networking](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)) This refers to the ability to work on multiple tasks at the same time.
- Bitmap - This refers to a digital image composed of a matrix and dots used to store digital photos. 

### Prerequisites
- It would be best to have [Android Studio](https://developer.android.com/studio) installed.
- A basic knowledge and understanding of XML and Java programming language.  
- A basic understanding of image loading in android applications.
- A basic experience and knowledge of developing and creating Android applications.

### Step 1 – Create a new AndroidStudio Project
- Open Android studio. Select Start new Android Studio Project -->  Empty Activity -->. Let us name the **Picasso**. Click Finish and wait for the project to build.

![Name the project](/engineering-education/using-picasso-in-android/name.jpg)

### Step 2 - Adding Picasso to our project.
Add the following dependency to the app module-level build.gradle file:

```gradle
  implementation 'com.squareup.picasso:picasso:2.71828'
```
Add internet permission to you application.

```manifest
<uses-permission android:name="android.permission.INTERNET />
```

#### Step 3 – Design the XML layout resource file.
 In this step, we will design the UI for our mobile application. Our layout will contain an ImageView, which will display our image and nine buttons, each with a different function to illustrate Picasso's features.

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

### Step 3 – Initialize objects. 
In our `MainActivity` class, initialize the image view and the buttons that are in the layout resource file.
```java
 ImageView imageView;
 int i = 0;
 Button buttonDrawableImage,buttonUrlImage, buttonErrorImage, buttonPlaceholderImage, buttonCallback, buttonResizeImage, buttonRotateImage, buttonScaleImage,       buttonTarget;
```

### Step 4 – Create a custom method.
 First, we will set an `OnClickListener` for all the buttons. Afterward, create a method called `initializeView`. This method will contain the code required to illustrate the following features of Picasso:
- Resizing an image. 
- Scaling an image.
- Loading a Drawable image.
- Placeholder.
- Callback methods. 
- Errors.
- Rotate.
- Target.
- URL.

### a)Resizing an image.
 **Resizing** refers to adjusting the size of an image by cropping, scaling, and others. Picasso allows us to resize images before displaying an image using the `resize()` method and setting the desired height and width. In our `MainActivity.java`, in the `initializeView` method, add the following lines of code; 

```java

buttonResizeImage = (Button) findViewById(R.id.showResize); buttonResizeImage.setOnClickListener(this); 

case R.id.showResize:
Picasso.get().load(R.drawable.image).resize(200, 200).into(imageView);
	 break;
```
### b)Scaling an image.
**Scaling** is resizing a whole image by resampling it. In this project, we will sample three ways, which are: **Fit**, **Center Crop**, and **Center Inside**. We will use `centerCrop()`, `centerInside()` and `fit()` method. 

**Note: The `fit ()` method is not used together with the `resize()` method since it has in-built dimensions. `centerCrop()` and `centerInside()` methods are used together with the `resize()` method.

In our `MainActivity.java`, add the following lines of code in the `initializeView` method.
```java
 case R.id.showScaling:

                if (i == 3)
                    i = 1;

                else {
                    if (i == 1) {
                        Picasso.get().load(R.drawable.image).fit().into(imageView);
                        Toast.makeText(getApplicationContext(), "Scale:Fit", Toast.LENGTH_SHORT).show();
                    } else if (i == 2) {
                        Picasso.get().load(R.drawable.image).resize(200, 200).centerCrop().into(imageView);
                        Toast.makeText(getApplicationContext(), "Scale:Center Crop", Toast.LENGTH_SHORT).show();
                    } else if (i == 3) {
                        Picasso.get().load(R.drawable.image).resize(200, 200).centerInside().into(imageView);
                        Toast.makeText(getApplicationContext(), "Scale:Center Inside", Toast.LENGTH_SHORT).show();
                    }
                    i++;
                }
                break;
 ```

### c)Loading a Drawable image.
Loading a drawable image is a basic feature offered by Picasso. Other than assigning an image view on the XML manually, one can easily assign an image through Picasso. In our `MainActivity.java`, in the `initializeView` method, add the following lines of code;
```java
buttonDrawableImage = (Button) findViewById(R.id.showDrawable); buttonDrawableImage.setOnClickListener(this); 
 switch (view.getId()) {
	 case R.id.showDrawable:
	 Picasso.get().load(R.drawable.image).into(imageView);
	 break;
```
### d)Placeholder
A placeholder usually is a drawable image displayed before an image is loaded into an image view. This feature comes in handy, especially if an image takes time to be loaded. In our `MainActivity.java`, in the `initializeView` method, add the following lines of code;

```java
buttonPlaceholderImage = (Button) findViewById(R.id.showPlaceholder); buttonPlaceholderImage.setOnClickListener(this);

 case R.id.showPlaceholder:
	 Picasso.get().load(R.drawable.placeholder).into(imageView);
	 break;
```
### e)Callback methods.
Picasso provides callback methods to keep track and show a loaded image's status and display a text/toast accordingly. We have displayed a toast message to show either an image is loaded successfully or an error. In our `MainActivity.java`, in the `initializeView` method, add the following lines of code;
```java
 buttonCallback = (Button) findViewById(R.id.showCallBack); buttonCallback.setOnClickListener(this); 

 case R.id.showCallback:
                Picasso.get().load("www.google.com").error(R.mipmap.ic_launcher).into(imageView, new Callback() {
                    @Override
                    public void onSuccess() {
                        Log.d("TAG", "onSuccess");
                        Toast.makeText(getApplicationContext(), "Succeful", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onError(Exception e) {
                        Toast.makeText(getApplicationContext(), "An error has occurred", Toast.LENGTH_SHORT).show();
                    }

                });
                break;
```
### f)Errors
An error drawable is usually displayed when an image is not loaded successfully. We use the `error()` method. In our `MainActivity.java`, in the `initializeView` method, add the following lines of code; 

```java
buttonErrorImage = (Button) findViewById(R.id.showError); buttonErrorImage.setOnClickListener(this); 

 case R.id.showError:
	 Picasso.get().load("www.google.com").placeholder(R.drawable.placeholder).error(R.drawable.error).into(imageView);
	 break;
```
### g)Rotate
This refers to changing the orientation of an image by degrees from a point (0,0). A `rotate()` method is normally used. 
```java
buttonRotateImage = (Button) findViewById(R.id.showRotate); buttonRotateImage.setOnClickListener(this); 

case R.id.showRotate: 
	 Picasso.get().load(R.drawable.image).rotate(90f).into(imageView);
	 break;
```  
### h)Targets  
Targets combine image loading, callbacks, and errors. Targets return bitmap images. Targets normally use `onBitmapLoaded()`, `onBitmapFailed()` and on `Prepared()` methods. In our `MainActivity.java`, outside `initializeView` method, add the following lines of code:
```java
buttonTarget = (Button) 
findViewById(R.id.showTarget); buttonTarget.setOnClickListener(this); 

 case R.id.showTarget:
	 Picasso.get().load("https://cdn.journaldev.com/wp-content/uploads/2017/01/android-constraint-layout-sdk-tool-install.png").placeholder(R.drawable.placeholder).error(R.drawable.error).into(myTarget);
	 break;
```
Next creat a `Target` object with it's respective methods.
```java
 private Target myTarget = new Target() {
	 @Override
	 public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
	 
	 imageView.setImageBitmap(bitmap);
	 }
	 
	 @Override
	 public void onBitmapFailed(Exception e, Drawable errorDrawable) {
	 imageView.setImageDrawable(errorDrawable);
	 }
	 
	 @Override
	 public void onPrepareLoad(Drawable placeHolderDrawable) {
	 imageView.setImageDrawable(placeHolderDrawable);
	 }
};
```
### i)Loading an image from a URL.
Rather than downloading images, we can simply display the images through picasso using a link without downloading them. We normally use a load() method. In the `MainActivity.java` class in the `initializeView` method add the following lines of code:

```java
 String url = "https://www.pexels.com/photo/low-angle-photo-of-woman-leaning-on-metal-railing-3621953/";
 buttonUrlImage = (Button) findViewById(R.id.showUrl);
 buttonUrlImage.setOnClickListener(this);

 case R.id.showUrl:
	 Picasso.get().load(url).into(imageView);
	 break;
```
The final code in the `MainActivity .java` class.
```java
package com.example.picasso;

import androidx.appcompat.app.AppCompatActivity;

import android.content.pm.PackageInfo;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    ImageView imageView;
    int i = 0;
    Button buttonDrawableImage, buttonUrlImage, buttonErrorImage, buttonPlaceholderImage, buttonCallback, buttonResizeImage, buttonRotateImage, buttonScaleImage, buttonTarget;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeView();

    }

    private void initializeView() {

        imageView = (ImageView) findViewById(R.id.myImageView);
        buttonUrlImage = (Button) findViewById(R.id.showUrl);
        buttonScaleImage = (Button) findViewById(R.id.showScaling);
        buttonTarget = (Button) findViewById(R.id.showTarget);
        buttonDrawableImage = (Button) findViewById(R.id.showDrawable);
        buttonPlaceholderImage = (Button) findViewById(R.id.showPlaceholder);
        buttonCallback = (Button) findViewById(R.id.showCallback);
        buttonResizeImage = (Button) findViewById(R.id.showResize);
        buttonRotateImage = (Button) findViewById(R.id.showRotation);
        buttonErrorImage = (Button) findViewById(R.id.showError);


        buttonUrlImage.setOnClickListener(this);
        buttonDrawableImage.setOnClickListener(this);
        buttonPlaceholderImage.setOnClickListener(this);
        buttonCallback.setOnClickListener(this);
        buttonResizeImage.setOnClickListener(this);
        buttonErrorImage.setOnClickListener(this);
        buttonRotateImage.setOnClickListener(this);
        buttonScaleImage.setOnClickListener(this);
        buttonTarget.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {

        String url = "https://www.pexels.com/photo/low-angle-photo-of-woman-leaning-on-metal-railing-3621953/";

        switch (view.getId()) {
            case R.id.showDrawable:
                Picasso.get().load(R.drawable.image).into(imageView);
                break;
            case R.id.showPlaceholder:
                Picasso.get().load(R.drawable.placeholder).into(imageView);
                break;
            case R.id.showUrl:
                Picasso.get().load(url).into(imageView);
                break;
            case R.id.showError:
                Picasso.get().load("www.google.com").placeholder(R.drawable.placeholder).error(R.drawable.error).into(imageView);
                break;
            case R.id.showCallback:
                Picasso.get().load("www.google.com").error(R.mipmap.ic_launcher).into(imageView, new Callback() {
                    @Override
                    public void onSuccess() {
                        Log.d("TAG", "onSuccess");
                        Toast.makeText(getApplicationContext(), "Succeful", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onError(Exception e) {
                        Toast.makeText(getApplicationContext(), "An error has occurred", Toast.LENGTH_SHORT).show();
                    }

                });
                break;
            case R.id.showResize:
                Picasso.get().load(R.drawable.image).resize(200, 200).into(imageView);
                break;
            case R.id.showRotation:
                Picasso.get().load(R.drawable.image).rotate(90f).into(imageView);
                break;
            case R.id.showScaling:

                if (i == 3)
                    i = 1;

                else {
                    if (i == 1) {
                        Picasso.get().load(R.drawable.image).fit().into(imageView);
                        Toast.makeText(getApplicationContext(), "Scale:Fit", Toast.LENGTH_SHORT).show();
                    } else if (i == 2) {
                        Picasso.get().load(R.drawable.image).resize(200, 200).centerCrop().into(imageView);
                        Toast.makeText(getApplicationContext(), "Scale:Center Crop", Toast.LENGTH_SHORT).show();
                    } else if (i == 3) {
                        Picasso.get().load(R.drawable.image).resize(200, 200).centerInside().into(imageView);
                        Toast.makeText(getApplicationContext(), "Scale:Center Inside", Toast.LENGTH_SHORT).show();
                    }
                    i++;
                }
                break;

            case R.id.showTarget:
                Picasso.get().load("https://cdn.journaldev.com/wp-content/uploads/2017/01/android-constraint-layout-sdk-tool-install.png").placeholder(R.drawable.placeholder).error(R.drawable.error).into(myTarget);
                break;
        }
    }

    private Target myTarget = new Target() {
        @Override
        public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {

            imageView.setImageBitmap(bitmap);
        }

        @Override
        public void onBitmapFailed(Exception e, Drawable errorDrawable) {
            imageView.setImageDrawable(errorDrawable);
        }

        @Override
        public void onPrepareLoad(Drawable placeHolderDrawable) {
            imageView.setImageDrawable(placeHolderDrawable);
        }
    };
}
```
We are done! Let us run the app.
![Picasso](/engineering-education/using-picasso-in-android/name.gif)

### Conclusion. 
Picasso is a powerful image loading library with various features. We have discussed scaling, resizing, targets, callbacks, and the rest. Instead of manually implementing all these features with a bunch of code, why not use Picasso, which is easy to use and offers better syntax. Go on and read more about Picasso in their official [documentation](https://square.github.io/picasso/) and other features offered by Picasso and implement them in Android Applications. 

Access the source code on [Github](https://github.com/BrianaNzivu/EngineeringEducation/tree-save/main/Picasso).
Download the sample APK from Google [Drive](https://drive.google.com/file/d/1wkweiHuBYV5jwncJbYRWRcRxxzrXCwGk/view?usp=sharing). 
