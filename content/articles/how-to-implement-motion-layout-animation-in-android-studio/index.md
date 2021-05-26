---
layout: engineering-education
status: publish
published: true
url: /how-to-implement-motion-layout-animation-in-android-studio/
title: How to Implement Motion Layout Animation in Android Studio
description: This article takes the reader through implementing motion layout in android. Motion layout allows one to implement complex animations quickly.
author: michael-barasa
date: 2021-02-22T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-implement-motion-layout-animation-in-android-studio/hero.jpg
    alt: Motion layout image example
---
Animation is an essential feature in any application. It helps to improve the look and feel of the software. Animations promote user interactions. For instance, when a user clicks a button, some animation may indicate that an action is performed. MotionLayout will be the focus of this tutorial, which is a layout that allows you to implement animations in your Android app quickly.
<!--more-->
### Introduction to MotionLayout
MotionLayout can be described as a layout that helps you to incorporate and manage animations in your application. This layout is a subclass of the ConstraintLayout. This means that it inherits ConstraintLayout's rich features. ConstraintLayout allows MotionLayout support to older devices using API level 14. 

Some of the animation styles that MotionLayout can implement are keyframes and seekable transitions. Keyframes enable you to customize transitions to fit your needs. On the other hand, seekable transitions allow you to jump at a particular point in the animation. One huge advantage of MotionLayout is that it's fully declarative. This factor is quite critical, especially when building complex applications.

### Goal
To implement animations in an Android application using MotionLayout.

### Prerequisites
To follow along, you will need to have some knowledge of the Kotlin programming language. You should also have [Android Studio 4.0](https://developer.android.com/studio) installed on your computer.

### Step 1 – Creating the project
Open Android studio and create a new project. Choose the `Empty Activity` template since we will be building our layout from scratch. Click `next` and choose `API 14` as your minimum SDK. Remember to set your preferred programming language to `Kotlin`. After completing these settings, click on `finish` to allow the project to be initialized. Note that this process may take some considerable time depending on your computer speed and internet connection.

### Step 2 – Installing dependency
One key dependency that we need in our project is ConstraintLayout. Fortunately, it is included in all Android projects by default.
Therefore, open the app-level `build.gradle` file. In the dependency section, ensure that you are using a version of ConstraintLayout not less than `2.0.0`. This is demonstrated below.

```bash
implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
```
### Step 3 – Switching to MotionLayout
In this phase, we want to shift our default layout from ConstraintLayout to MotionLayout. This will allow us to access additional features such as transitions. Open the activity_main.xml file and switch from the code view to the design tab, as shown in the image below.

![DESIGN](/engineering-education/how-to-implement-motion-layout-animation-in-android-studio/design.png)

Next, navigate to the `component tree` section and `right` click on the ConstraintLayout. A new window will pop up with several options. Select the `Convert to MotionLayout` menu item.

![CONVERT](/engineering-education/how-to-implement-motion-layout-animation-in-android-studio/convert.png)

An `activity_main_scene.xml` is generated when you click the `Convert to MotionLayout` button demonstrated above. Let’s better understand the contents of this file.

The first section is `Transition`.

```xml
<Transition
    motion:constraintSetEnd="@+id/end"
    motion:constraintSetStart="@id/start"
    motion:duration="1000">
    <KeyFrameSet>
    </KeyFrameSet>
</Transition>
```

This section defines how our widgets will move across the screen. For instance, a button can shift from the upper corner to the bottom part of the screen. We use `motion:constraintSetStart` to set where the transition starts. `motion:constraintSetEnd` declares the position where the transition will stop. 

We can also set how long the transition or animation will take using `motion:duration`. Constraints help us position the UI widgets during the animation. For instance, the code snippets below determine where our widgets will be positioned during different transition phases.

```xml
<ConstraintSet android:id="@+id/start">
</ConstraintSet>

<ConstraintSet android:id="@+id/end">
</ConstraintSet>
```

Here is the full layout of the activity_main_scene.xml file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetEnd="@+id/end"
        motion:constraintSetStart="@id/start"
        motion:duration="1000">
       <KeyFrameSet>
       </KeyFrameSet>
    </Transition>

    <ConstraintSet android:id="@+id/start">
    </ConstraintSet>

    <ConstraintSet android:id="@+id/end">
    </ConstraintSet>
</MotionScene>
```

### Step 4 – Adding UI components
We need to include some UI components in our applications to utilize MotionLayout. In this tutorial, we will be adding animation to a Button and ImageView. Copy and paste the following code snippets in the `activity_main.xml` file to include these widgets in the app.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.motion.widget.MotionLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layoutDescription="@xml/activity_main_scene"
    android:background="@color/colorPrimary"
    tools:context=".MainActivity">


    <ImageView
        android:id="@+id/imageView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:srcCompat="@drawable/ic_launcher_foreground"
        tools:layout_editor_absoluteX="119dp"
        tools:layout_editor_absoluteY="290dp" />

    <Button
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Welcome"
        android:backgroundTint="@color/colorAccent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView2"
        tools:layout_editor_absoluteX="192dp" />
</androidx.constraintlayout.motion.widget.MotionLayout>
```

### Step 5 – Animating the views
In the past, we were required to input transition values in the `activity_main_scene.xml` file manually. This was quite cubersome and time-consuming. The introduction of Motion Editor in Android Studio 4.0 helped deal with these challenges.

Okay, let’s use `MotionEditor`.

Open the `activity_main.xml` and switch to the `design` view, then follow the instructions in the following video to animate the views.

<iframe width="478" height="269" src="https://www.youtube.com/embed/h5VVlmBvPGE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Testing
You can test the application by creating an APK and installing it on your phone. You will have completed this tutorial successfully if the `ImageView` zooms out and the button shifts from the bottom to the center of the screen.

![demo](/engineering-education/how-to-implement-motion-layout-animation-in-android-studio/demo.gif)

### Conclusion
Animation is a critical part of any application. MotionLayout makes it easy to incorporate this feature in Android apps. You can, therefore, use this knowledge to develop more appealing applications.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
