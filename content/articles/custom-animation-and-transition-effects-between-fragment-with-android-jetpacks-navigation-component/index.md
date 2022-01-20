---
layout: engineering-education
status: publish
published: true
url: /custom-animations-and-transition-effects-between-fragments-in-android/
title: Custom Animations and Transition Effects Between Fragments in Android
description: This tutorial takes the reader through the process of adding custom animations between destinations using the Navigation Components library in Android.
author: joyce-wanjiru
date: 2021-10-29T00:00:00-04:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/custom-animations-and-transition-effects-between-fragments-in-android/hero.png
    alt: Custom Animations and Transition effects Hero Image
---
The Navigation component is part of the Android Jetpack Library and allows you to implement navigation, from simple button clicks to more complicated patterns. This makes it easier for a user to navigate from one destination to another.
<!--more-->
Navigating back and forth between Fragments can sometimes be confusing. With custom transition animations, if a user is heading to a new destination, we can add the respective and descriptive transition animation. Also, when navigating back to the previous Fragment, we can animate the action.

We can add custom transitions to animate the appearance and dismissal of dialog Fragments. Also, we can include shared transition elements in our app to open an image in a new destination.

Transition animations generally improve the app's user experience (UX) which helps to retain users.

### Table of contents
- [Prerequisites](#prerequisites)
- [Transition Animations](#transition-animations)
- [Transition Animation Graph](#transition-animation-graph)
- [Create the Animations Directory](#step-1---creating-an-animation-directory)
- [Creating Transitions](#step-2---creating-transitions)
- [Creating Dialog Animations](#step-3---creating-dialog-animations)
- [Creating Shared Element Transition](#step-4---creating-shared-element-transition)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, you should have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your machine.
- Good knowledge of creating and running Android applications.
- Basic information of the [Kotlin](https://kotlinlang.org/) programming language.
- Basics of setting up and using Navigation Components, you can learn how to use navigation components in [this tutorial](https://www.section.io/engineering-education/android-navigation-components/).

### Transition animations
Transition animations can be of 4 types:
- **Enter** - bringing a new Fragment to NavHostFragment.
- **Exit** - removing the currently displayed Fragment from NavHostFragment.
- **Pop Enter** - when navigating back, this will bring the previous Fragment.
- **Pop Exit** - this will exit the Fragment to give room for the previous Fragment to be visible.

We can also define shared element transition which animates the movement from a clicked image to a new destination. This is useful when you have images and you want to navigate to the details of a particular image. The image expands into a new destination.

With dialogs, we can animate their movement when they are being displayed and when dismissing. We can define `slide-up` and `slide-down` transition animations.

While translating different elements i.e from left, right, up, and down, we can use the following attributes in our animation resource files:
- `fromXDelta` - indicates from what X-axis value we are transitioning from.
- `toXDelta` - indicates to what position in the X-axis.
- `fromYDelta` - indicates from what value of the Y-axis.
- `toYDelta` - indicates to what value of Y-axis we are transitioning to.
- `duration` in milliseconds - this is the time taken for an animation to happen.

### Transition animation graph
![Navigation Graph](/engineering-education/custom-animations-and-transition-effects-between-fragments-in-android/axis.png)

From the graph above:

#### Horizontal Transitions (X-axis)
At `0%`, we can move to the right which is `100%`, or we can move to the left which is `-100%`:
- Moving from `-100%` to `0%` means that our fragment impends from the left. We will use this to enter our Fragment.
- Moving from `0%` to `100%` means that our Fragment is moving to the right side. You can use this to exit our Fragment.
- Moving from `0%` to `-100%` means that our Fragment is moving to the left side. We will use this to remove the current Fragment from NavHostFragment.
- Moving from `100%` to `0%` means that our fragment will come from the right side. This will be used to bring back the initial Fragment.

#### Vertical Transitions (Y-axis)
At `0%` percent, we can move to the top which is `100%`, or we can move downwards to `-100%`:
- Moving from `100%` to `0%` means that our DialogFragment will enter from the bottom. We can use this to create a slide in animation.
- Moving from `0%` to `100%` means that our DialogFragment will move from the center to the bottom. We can use this to create a slide-down animation.
- Moving from `-100%` to `0%` means that our DialogFragment will appear from the top.

### Step 1 - Creating an animation directory
First, create a new resource directory and name it `anim`, this will hold our transition animations.

### Step 2 - Creating transitions
#### Entering a Fragment
This involves bringing a new Fragment into view. This new Fragment will enter from the left side. We therefore need to create an anim called `from_left`. To do so, right-click the anim directory and select `new >> animation layout file`.

```xml
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="-100%" android:toXDelta="0%" android:duration="700"/>
</set>
```

We remove the current Fragment from NavHostFragment so that the new Fragment can be visible. The Fragment will exit towards the right side, we'll create an anim called `to_right`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0%" android:toXDelta="100%" android:duration="700"/>
</set>
```

#### Navigating back to the previous Fragment
First, we'll need to remove the Fragment that is currently being displayed. We'll create an anim called `to_left` that will remove the Fragment towards the left side.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0%" android:toXDelta="-100%" android:duration="700"/>
</set>
```

Bringing back the initial Fragment on NavHostFragment. This Fragment will come from the right side, we'll create an anim called `from_right`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="100%" android:toXDelta="0%" android:duration="700"/>
</set>
```

Navigating back to the previous Fragment is helpful as the top back button is also animated.

#### Adding animations to Fragments
To add the transition animations, in your `NavGraph`, click on an `Action` which you want to animate its transition. On your right, you will see a pane that has a section for adding animations:

![Animation Pane](/engineering-education/custom-animations-and-transition-effects-between-fragments-in-android/animations.png)

For the home Fragment, we'll need to specify the `popEnterAnim` and `popExitAnim` to animate the `ActionBar`/`Toolbar` accordingly.

- In the `enterAnim` attribute, pass `from_left` anim.
- In `exitAnim` pass `to_right` anim.
- In `popEnterAnim` pass `from_right` anim.
- In `popExitAnim` pass `to_left` anim.

For other Fragments whose actions are not navigating to new destinations, a back button is called explicitly.

In the animation panel, you will include:

- In `popEnterAnim` pass `from_right` anim.
- In `popExitAnim` pass `to_left` anim.

### Step 3 - Creating dialog animations
In this step, we will look at how to animate DialogFragments.

#### Showing the dialog
We'll create an anim called `slide_up` to animate our dialog from the bottom to the center of the screen.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromYDelta="100%" android:toYDelta="0%" android:duration="300"/>
</set>
```

#### Dismissing the dialog
We'll create an anim called `slide_down` to animate our Dialog as it dismisses by moving from the center to the bottom of the screen.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromYDelta="0%" android:toYDelta="100%" android:duration="300"/>
</set>
```

#### Adding the animations to a dialog
Adding the animations to a DialogFragment is a little bit different from that of normal Fragments.

First navigate to your `res` >> `values`. In your `theme`, define the following style:

```xml
<style name="DialogFragmentAnimation">
    <item name="android:windowEnterAnimation">@anim/slide_up</item>
    <item name="android:windowExitAnimation">@anim/slide_down</item>
</style>
```

Then in your `DialogFragment`, override the `onActivityCreated` method and add the style that we have defined to the Dialog.

```kotlin
override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        dialog!!.window!!.attributes.windowAnimations = R.style.DialogFragmentAnimation
    }
```

### Step 4 - Creating shared element transition
Here, we will navigate to another Fragment once an image is clicked. The image will expand to a larger image in the other Fragment.

In our first Fragment layout, add an `ImageView`.

We must give the ImageView a `transitionName` - when using the shared transition element, each View needs to have a unique `transitionName` so that Android can determine the views it should perform the transitions on.

```xml
<ImageView
    android:id="@+id/image"
    android:layout_width="120dp"
    android:layout_height="120dp"
    android:transitionName="small_image"
    android:src="@drawable/mountain"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/buttonDialog" />
```

In our second Fragment layout, we'll also include an ImageView - an expansion of the image in the previous Fragment.

We will also give it a different transition name i.e. `large image` and give it different dimensions so that it can cover 3/4 of the screen.

```xml
<ImageView
    android:id="@+id/image"
    android:layout_width="0dp"
    android:layout_height="550dp"
    android:transitionName="large_image"
    android:scaleType="centerCrop"
    android:src="@drawable/mountain"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
```

#### Logic for the first Fragment
In the first Fragment, we will set an `onClickListener` to the ImageView and add the following code to initiate the transition.

```kotlin
binding.image.setOnClickListener {
        val extras = FragmentNavigatorExtras(binding.image to "large_image")

        findNavController().navigate(R.id action_FragmentOne_to_FragmentThree, null, null, extras)
    }
```

We create extras of the type `FragmentNavigatorExtras` where we pass the `id` of the ImageView that is clicked, and then pass the name of transition that we need to transition to. Finally, we perform the navigation and pass the extras.

Make sure you have created an action in your NavGraph that links the first Fragment to the one we're navigating to.

#### Logic for the second Fragment
In the other Fragment, we need to indicate when our animation enters or leaves. Inside the `onCreateView`, include the following lines of code.

```kotlin
val animation = TransitionInflater.from(requireContext()).inflateTransition(android.R.transition.move)

sharedElementEnterTransition = animation
sharedElementReturnTransition = animation
```

### Demo
![Demo](/engineering-education/custom-animations-and-transition-effects-between-fragments-in-android/demo.gif)

### Conclusion
In this tutorial, we have learned what transition animations are, and how to add animations when navigating through destinations. We have also looked at how to animate a DialogFragment's transition, and finally, how to create a shared element transition.

Go ahead and enhance your Android projects with these transitions to increase your app's interactivity. You can visit this repository for reference [FragmentsTransitionsDemo](https://github.com/sheecodes/FragmentsTransitionsDemo).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
