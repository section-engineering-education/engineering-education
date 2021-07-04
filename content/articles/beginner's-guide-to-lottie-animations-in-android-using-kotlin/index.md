---
layout: engineering-education
status: publish
published: true
url: /beginners-guide-to-lottie-animations-in-android-using-kotlin/
title: Beginner's guide to Lottie animations in Android using Kotlin 
description: This article explains how to use Lottie which is an open-source animation library in Android applications using Kotlin. Lottie is beautiful and helps you achieve a clean UI, therefore achieving a good user experience.
author: carol-musyoka
date: 2021-06-20T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/beginners-guide-to-lottie-animations-in-android-using-kotlin/hero.png
    alt: Beginner's guide to Lottie animations in Android using Kotlin 
---
Designing animations can be tedious and technical for most developers. **Lottie** is an open-source animation library developed by *Airbnb*. It renders Adobe After Effects with BodyMovin. 
<!--more-->
**BodyMovin** is an Adobe After Effects plugin that exports animations to a JSON file. Lottie makes it easy to work with animations without downloading heavy animation files.

It helps developers to achieve a clean UI, therefore achieving a good user experience. Lottie is easy to use, and the files can be accessed on their [website](https://lottiefiles.com/).
Lottie is supported on mobile (Android, iOS, and React Native), web, and desktop applications.

### Why use Lottie
- Simple UI elements: Lottie is light and the JSON files exported are small-sized. 
- Dynamic scenes: you can tell a narrative across several shots, making it interactive.
- Alter animations as you like: the animations offered on Lottie can be altered from speed to color to progress hence meeting the developer's need.
- Improved user experience.
- Pairs well across all mobile devices(in our case), even slow-performing ones, since it is lightweight.
- The animations also have a clear resolution.

### Prerequisites
The reader should have:
- A basic knowledge of developing Android applications.
- A solid understanding of [Kotlin](https://developer.android.com/kotlin?gclid=CjwKCAjwtpGGBhBJEiwAyRZX2kIAPNCmlb-8y8TkwFKq50N3Q2WyrbK_z9z5pdtJ7vNcw4LlHy4MSxoCSMQQAvD_BwE&gclsrc=aw.ds) programming language.
- [Android Studio](https://developer.android.com/studio?gclid=CjwKCAjwtpGGBhBJEiwAyRZX2qdVjJro5K05vugN8QfNBViTy3W1-q_LVgwHMndmCJmFxTZpPiSHuRoCAY8QAvD_BwE&gclsrc=aw.ds) installed.

### Goal
At the end of this tutorial, the reader should understand how to use and implement Lottie animations in Android applications. 

Since the project is a bit wide, we shall only go through all the basics of Lottie animations on the app. 

#### Step one: Create a new Android Studio project
Open Android Studio and select Create *New Project* - > *Empty Activity* and click *Next*. Fill in the required fields and click finish.

#### Step two: Choosing an animation file to use on your app
Head over to Lottie's [website](https://www.lottiefiles.com) and choose the animations of your choice. Most of the animations are free, while others one has to pay to use them. 

Download the .json file. In our project, let us create a res/raw folder. Save the .json animations there. On your android project, create a `res/raw` folder. Right-click on res folder, select *New* -> *Resource package* and name it `raw`. Save the .json animations inside that folder.

#### Step three: Adding Lottie dependencies to the project
In the `build. gradle` (project level), add the Lottie Animation library. Make sure you check out the latest library version and sync the changes.
```gradle
//Lottie Animation
implementation 'com.airbnb.android:lottie:3.4.0'
```
We shall also use other non-related libraries for this project which can be found [here](https://github.com/carolinemusyoka/LottieAnimation).

#### Step four: Designing the project's layout
In this step, we will design our application's layout. The layout will only have three basic elements:
- A Textview contains a heading.
- Buttons will be used for navigation.
- LottieAnimationView.

##### LottieAnimationView
The view is added just like any other element in the layout. Some of the attributes you will come across are like:
- `lottie_loop` - A boolean to ensure that the animation stays in a loop.
- `lottie_speed` - This determines the speed of the animation.
- `lottie_autoplay` - A boolean that starts the animation.
- `lottie_url` - The JSON URL from the website. 

> If you want your animations to rely on the internet, you can use the json URL from the animation on the official website. Saves you space on your app, but it will not work offline. The file is small, so downloading it is recommended.

- `lottie_rawRes` - This contains the bundled animation on your app.
- `lottie_fileName` - If you have added the JSON files to the assets folder, use this instead of `lottie_rawRes`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:app="http://schemas.android.com/apk/res-auto"
xmlns:tools="http://schemas.android.com/tools"
android:layout_width="match_parent"
android:layout_height="match_parent"
android:layout_marginTop="@dimen/margin_16">
  
<TextView
android:id="@+id/titleTv"
android:layout_width="0dp"
android:layout_height="wrap_content"
android:layout_marginStart="16dp"
android:layout_marginEnd="16dp"
android:textAppearance="@style/TextAppearance.AppCompat.Body2"
android:textColor="@color/dark"
app:layout_constraintEnd_toEndOf="parent"
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintTop_toTopOf="parent"/>
  
<TextView
android:id="@+id/subTitleTv"
android:layout_width="0dp"
android:layout_height="wrap_content"
android:layout_marginStart="16dp"
android:layout_marginEnd="16dp"
android:textAppearance="@style/TextAppearance.AppCompat.Headline"
android:textColor="@color/dark"
android:textStyle="bold"
app:layout_constraintEnd_toEndOf="parent"
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintTop_toBottomOf="@+id/titleTv"/>
  
<com.airbnb.lottie.LottieAnimationView
android:id="@+id/img"
android:layout_width="0dp"
android:layout_height="0dp"
android:layout_marginStart="32dp"
android:layout_marginEnd="32dp"
android:adjustViewBounds="true"
app:layout_constraintBottom_toBottomOf="parent"
app:layout_constraintDimensionRatio="1:1"
app:layout_constraintEnd_toEndOf="parent"
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintTop_toTopOf="parent"
app:layout_constraintVertical_bias="0.4"
app:lottie_loop="true"
app:lottie_speed="1"
tools:ignore="ContentDescription"/>
  
<TextView
android:id="@+id/descTV"
android:layout_width="0dp"
android:layout_height="wrap_content"
android:gravity="center"
android:textAppearance="@style/TextAppearance.AppCompat.Body1"
android:textColor="@color/dark"
app:layout_constraintEnd_toEndOf="@+id/img"
app:layout_constraintStart_toStartOf="@+id/img"
app:layout_constraintTop_toBottomOf="@+id/img"/>
  
</androidx.constraintlayout.widget.ConstraintLayout>
```
You can also load the animation “programmatically” from the MainActivity.kt by:

```kotlin
val animationView:LottieAnimationView = findViewById(R.id.animation_view)
animationView.setAnimation("hello-world.json")
animationView.loop(true)
animationView.playAnimation()
```
This function will load the file and parse the animation.

#### Step five: Adding functionality to the application.
Since we use an adapter to display the animation's content, write the following code in your adapter's `bind` function:

```kotlin
fun bind(onBoardingPage: OnboardingPage) {
val res = root.context.resources
root.titleTv?.text = res.getString(onBoardingPage.titleResource)
root.subTitleTv?.text = res.getString(onBoardingPage.subTitleResource)
root.descTV?.text = res.getString(onBoardingPage.descriptionResource)
root.img.setAnimation(onBoardingPage.logoResource)
root.img. playAnimation()
}
```
- `.setAnimation` - This sets the raw animations to the image view.
- `.playAnimation()` - This plays the animation.

Next, in your `Mainctivity.kt` create a `setupAnimation` function and add the following: 

```kotlin
fun setupAnimation(){
val animation = findViewById<LottieAnimationView>(R.id.progressBar)
animation.speed = 2.0F // How fast does the animation play
animation.progress = 50F // Starts the animation from 50% of the beginning
animation.addAnimatorUpdateListener {
// Called every time the frame of the animation changes
}
animation.repeatMode = LottieDrawable.RESTART // Restarts the animation (you can choose to reverse it as well)
animation.cancelAnimation() // Cancels the animation
}
```

- `.speed` - To set the speed at which the animation plays.
- `.progress` - To choose where the animation starts.
- `.repeatMode` - Restarts the animation.

### Errors experienced
When using a class that holds the animation files like this:
```kotlin
enum class OnboardingPage(
@StringRes val titleResource: Int,
@StringRes val subTitleResource: Int,
@StringRes val descriptionResource: Int,
@DrawableRes val logoResource: Int
) {
ONE(R.string.onboarding_slide1_title, R.string.onboarding_slide1_subtitle,R.string.onboarding_slide1_desc, R.raw.comp),
TWO(R.string.onboarding_slide2_title, R.string.onboarding_slide1_subtitle,R.string.onboarding_slide1_desc, R.raw.jump),
THREE(R.string.onboarding_slide3_title, R.string.onboarding_slide1_subtitle,R.string.onboarding_slide1_desc, R.raw.cycling)
}
```
You might come across a lint error in the adapter, on this line:
``` kotlin 
root.img.setAnimation(onBoardingPage.logoResource).
```
If you add the `@SuppressLint` annotation, the project will not run. The error does not necessarily affect the functionality of the app.

### Output
Let us run the app.

![App gif](/engineering-education/beginners-guide-to-lottie-animations-in-android-using-kotlin/app.gif)

You can check out the project on [GitHub](https://github.com/carolinemusyoka/LottieAnimation). In case of any clarification or any problem, do not hesitate to raise an issue in the same repository. [Click here](https://github.com/carolinemusyoka/LottieAnimation/blob/master/app/app-debug.aab?raw=true) to download the app bundle.
### References
- [Lottie](www.lottiefiles.com)
- [Lottie Docs](https://airbnb.io/lottie/)

### Conclusion
Lottie Animations can be used all around the app, from splash screens, onboarding screens, empty state layouts, bottom navigations, and many other ways. Be sure to try out different ways to incorporate it into your app. 

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
