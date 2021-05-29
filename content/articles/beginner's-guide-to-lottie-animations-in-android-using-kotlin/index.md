
# Introduction

Lottie is an open-source animation library, developed at Airbnb. It renders Adobe After Effects with BodyMovin on mobile(Android, iOS and React Native), web and windows. BodyMovin is an Adobe After Effects plugin that exports animations to a .json file.

  

Designing animations can be tedious and technical for most developers. Lottie makes it easy to work with animations without downloading heavy animation files.

  

Lottie is beautiful and helps you achieve a clean UI, therefore achieving a good user experience. They are easy to use and the files can be found on their site at www.lottiefiles.com

  

# Why use Lottie

  

- Simple UI elements. Lottie is light and the JSON files exported are small-sized. The animations also have a clear resolution.

- Improved user experience.

- Pairs well across all mobile devices(in our case), even slow-performing ones, since it is light-weight

- Dynamic scenes. You can tell a narrative across several shots making it interactive.

- Alter animations to your liking. From speed to colour to progress.

  

This article will share how to implement Lottie animations in onboarding screens using Kotlin.

  

<iframe width="560" height="315" src="https://www.youtube.com/embed/Sw6gz27DLFs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  

Since the project is a bit wide, we shall only go through all the basics of Lottie animations on the app. You can check out the project on Github through [this](https://github.com/carolinemusyoka/LottieAnimation) link to follow along.

  

# Prerequisites

Basic knowledge of android and Kotlin.

  

# Getting Started

  

Create a new android project on Android Studio

  

# 1. Choosing an animation file to use on your app

Head over to www.lottiefiles.com and choose the animations of your choice. Most of the animations are free while others are paid. You can search for your animations from there, and download the .json file.

  

On your android project, create a `res/raw` folder. Save the `.json` animations on there.

  
  

# 2. Adding dependencies

In your `build. gradle` (project level), add the Lottie Animation library. Make sure you check out the latest library version and sync the changes.

  

```gradle

//Lottie Animation

implementation 'com.airbnb.android:lottie:3.4.0'

```

We shall also use other non-related libraries for this project. Which can be found [here](https://github.com/carolinemusyoka/LottieAnimation)

  

# 3. The layout

  

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

The layout has basic elements;

- Textview for heading

- Buttons for navigation

- LottieAnimationView

  
# LottieAnimationView
The view is added just like any other element in the layout. Some of the attributes you shall come across are like:

  

- `lottie_loop`, that is a boolean to ensure that the animation stays on a loop, - `lottie_speed`, that determines the speed of the animation

- `lottie_autoplay`, a boolean that starts the animation

- `lottie_url`, the json url from the website. If you want your animations to rely on the internet, you can just use this attribute, the json url from the animation on the official website. Saves you space on your app, but it won’t work offline. The file is small, so downloading it is recommended.

- `lottie_rawRes`, contains the bundled animation on your app.

- `lottie_fileName`, if you have added the JSON files to the assets folder, use this instead of `lottie_rawRes`

  

You can also load the animation “programmatically” from the MainActivity

  

```kotlin

val animationView:LottieAnimationView = findViewById(R.id.animation_view)

animationView.setAnimation("hello-world.json")

animationView.loop(true)

animationView.playAnimation()
```
- This will load the file and parse the animation .

  

# Functionality

Because I have used an adapter to display the contents of the animation, the functionality is in the adapter, in the `bind` function

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

`.setAnimation`, sets the raw animations to the image view

`.playAnimation()`, plays the animation

  

# 4. MainActivity

If you use the mainActivity to add a function, you will have to create a function to set up the animation.

  

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

You shall use;

`.speed`- for setting how fast the animation plays

-`.progress`- to choose where the animation starts

-`repeatMode` - restarts the animation

  
  

# The error I ran into

When using a class that holds the animation files like this,

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

you might come across a lint error in the adapter,on this line,`root.img.setAnimation(onBoardingPage.logoResource)`. If you add the `@SuppressLint` annotation, the project will not run. The error does not necessarily affect the functionality of the app.

  

# Output

<iframe width="478" height="269" src="https://www.youtube.com/embed/Sw6gz27DLFs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  

# References

- [Lottie](www.lottiefiles.com)

- [Lottie Docs](https://airbnb.io/lottie/)

# Conclusion

Lottie Animations can be used all around the app, from splash screens, onboarding screens, empty state layouts, bottom navigations, etc. Be sure to try out ways to incorporate it into your app. Happy coding!!