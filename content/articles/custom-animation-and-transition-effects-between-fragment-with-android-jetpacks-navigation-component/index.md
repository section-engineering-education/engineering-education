# Custom Animation and Transition Effects between Fragments with Android Jetpack's Navigation Component
The Navigation component of Android Jetpack assists you in implementing navigation, from simple button clicks to more complicated patterns. This makes it easier for a user to go from one location to another. 

Navigating back and forth between Fragments can sometimes be confusing. With custom transition animations, if a user is heading to a new destination, we can add the respective and descriptive transition animation. Also, when navigating back to the previous Fragment, we can add animation to represent this action. We can add custom transitions to animate the showing and dismissal of Dialog Fragments. Also, we can include Shared Transition Elements in our app to open an image in a new Destination.

Transition animations generally improve the app's User Experience(UX) which retains users to your app. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Transition Animations](#transition-animations)
- [Transition Animation Graph](#transition-animation-graph)
- [Create the Animations Directory](#create-the-animations-directory)
- [Creating Transitions for Entering and Exiting our Fragments](#creating-transitions-for-entering-and-exiting-our-fragments)
- [Creating Dialog Animations](#creating-dialog-animations)
- [Creating Shared Element Transition](#creating-shared-element-transition)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow through with this tutorial, you should have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your machine.
- Good knowledge of creating and running Android applications.
- Basic information of the [Kotlin](https://kotlinlang.org/) programming language.
- Basics of setting up and using Navigation Components, you can learn how to use navigation components from the in [Basics of Android Navigation Components](https://www.section.io/engineering-education/android-navigation-components/).

### Transition Animations
Transition animations can be of 4 types:
- Enter  - bringing a new Fragment to NavHostFragment.
- Exit - removing the currently displayed Fragment from NavHostFragment.
- Pop Enter - when navigating back, this will bring the previous Fragment back to NavHostFragment.
- Pop Exit - this will exit the Fragment to give room for the previous Fragment to be visible.

We can also define Shared Element Transition which animates the movement from a clicked picture and move to a new Destination. This is useful when you have items that have pictures and you want to navigate to the details of a particular picture. The picture expands into the new Destination.

With Dialogs, we can animate their movement when they are coming to the foreground and when leaving the screen. We can define slide-up and slide-down transition animations.

While translating different elements i.e from left, right, up, and down, we can use the following attributes in our animation resource files:
- `fromXDelta` - indicates from what X-axis value we are transitioning from. 
- `toXDelta` - indicates to what distance in X-axis.
- `fromYDelta` - indicates from what value of Y-axis. 
- `toYDelta` - indicates to what value of Y-axis we are transitioning to.
- `duration` in milliseconds - this is the time taken for an animation to happen.

### Transition Animation Graph
[!Graph](engineering-education/custom-animation-and-transition-effects-between-fragment-with-android-jetpacks-navigation-component/axis.png)

 From the above graph:
#### Horizontal line is the X-axis
At `0%` percent, we can move to the right which is `100%` or we can move to the left which is `-100%`

- Moving from `-100%` to `0%`, means that our fragment is coming from the left. We will use this to enter our Fragment inside NavHostFragment
- Moving from `0%` to `100%`, means that our Fragment is moving to the right side. You can use this to exit our Fragment outside NavHostFragment.
- Moving from `0%` to `-100%`, means that our Fragment is moving to the left side. We will use this to remove the current Fragment from NavHostFragment. 
- Moving from `100%` to `0%` means that our fragment will come from the right side. This will be used to bring back the initial Fragment

#### Vertical line is Y-axis
At `0%` percent, we can move to top which is `100%` or we can move down which is `-100%`

- Moving from `100%` to `0%`, our DialogFragment will enter from the bottom. We can use this to create a slide in animation.
- Moving from `0%` to `100%`, our DialogFragment will move from the center to the bottom. We can use this to create a slide-down animation. 
- Moving from `-100%` to `0%`, our DialogFragment will come from the top. 

This tutorial assumes you know about integrating Jetpack Navigation Components into your project. To get started, use this article [Navigation Components Article](https://www.section.io/engineering-education/android-navigation-components/) to get started.

### Step 1 - Create an Animation Directory
First, create a new directory in the res package and name it `anim` this will hold our transition animations.

### Step 2 - Creating Transitions for Entering and Exiting our Fragments
#### Entering a Fragment
Bringing a new Fragment so that it can be visible to the user. This new Fragment will come from the left side, we'll create an anim called `from_left`
```Xml
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="-100%" android:toXDelta="0%" android:duration="700"/>
</set>
```

Removing the current Fragment from NavHostFragment so that the new Fragment might be visible.
The Fragment will be removed towards the right side, we'll create an anim called `to_right` 
```Xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0%" android:toXDelta="100%" android:duration="700"/>
</set>
```

#### Navigating Back to the Previous Fragment
First we'll need to remove the Fragment that is currently being displayed.
This Fragment will be exited towards the left side, we'll create an anim called `to_left`
```Xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0%" android:toXDelta="-100%" android:duration="700"/>
</set>
```

Bringing back the Fragment that was initial on NavHostFragment. 
This Fragment will come from the right side, we'll create an anim called `from_right`
```Xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="100%" android:toXDelta="0%" android:duration="700"/>
</set>
```

> Navigating Back to the Previous Fragment will be helpful in the Fragment that is treated as a Home Destination because they will also animate the top back button.

#### Adding Animations to Fragments
To add the transition animations, in your `NavGraph`, click on an `Action` which you want to animate its transition, on your right side, you will see a pane that has a section for adding animations:

[!Animation-Pane](engineering-education/custom-animation-and-transition-effects-between-fragment-with-android-jetpacks-navigation-component/animations.png)

For the home Fragment because that is our start Fragment we'll need to specify the `popEnterAnim` and `popExitAnim` to animate the `ActionBar`/`Toolbar` accordingly.

- In `enterAnim` pass your `from_left` anim
- In `exitAnim` pass your `to_right` anim
- In `popEnterAnim` pass your `from_right` anim
- In `popExitAnim` pass your `to_left` anim


> For other Fragments that are not navigating to new destinations but have `Actions` to go back to the previous Destination. For example, a back button that is called explicitly: in its Animation panel, you will just include: 
- In `popEnterAnim` pass your `from_right` anim
- In `popExitAnim` pass your `to_left` anim

### Step 3 - Creating Dialog Animations
In this step, we will look at how to add animations to the showing and dismissal of Dialogs (DialogFragments)

#### Showing Dialog
Our Dialog will move from the bottom to the center of the screen, and we'll create an anim called `slide_up`
```Xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
<translate android:fromYDelta="100%" android:toYDelta="0%" android:duration="300"/>
</set>
```

#### Dismissing the Dialog
Our Dialog will be dismissed by moving it from the center of the screen to the bottom of the screen, we'll create an anim called `slide_down`
```Xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
<translate android:fromYDelta="0%" android:toYDelta="100%" android:duration="300"/>
</set>
```

#### Adding the Animations a Dialog
Adding the animations to a Dialog is a little bit different from that of normal Fragments.

First go to your `res`, then to `values`. In your `theme` define the following style:
```Xml
 <style name="DialogFragmentAnimation">
        <item name="android:windowEnterAnimation">@anim/slide_up</item>
        <item name="android:windowExitAnimation">@anim/slide_down</item>
    </style>
```

Then in your `DialogFragment`, override the `onActivityCreated` method and add the style that we have defined to the Dialog
```Kotlin
override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        dialog!!.window!!.attributes.windowAnimations = R.style.DialogFragmentAnimation
    }
```

### Step 4 - Creating Shared Element Transition
We will be navigating to another Fragment once an image is clicked, the image will expand to a larger image in the other Fragment. 

In our first Fragment layout, we'll create an `ImageView`.

We must give  the ImageView a `transitionName` - when using Shared Transition Element, each View needs to have a unique `transitionName` name so that Android can determine between which Views it should perform the transition. For our case, we'll give ours `small_image`
```Xml
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


In our second Fragment layout, we'll also include an ImageView that will expand the image that was in the previous Fragment.
We will also give it a different transition name i.e `large image` and give it a different dimension so that it can cover 3/4 of the screen.
```Xml
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

#### Logic for the First Fragment
In the First Fragment, we will set an `onClickListener` to the ImageView and add the following code to initiate the transition.

```Kotlin
binding.image.setOnClickListener {
            val extras = FragmentNavigatorExtras(binding.image to "large_image")

            findNavController().navigate(R.id action_FragmentOne_to_FragmentThree, null, null, extras)
        }
```

We create extras of the type FragmentNavigatorExtras where we pass the `id` of the ImageView that is clicked and then pass the name of transition that we need to transition to. Finally, we perform the navigation and pass the extras

> Make sure you have created an action in your Nav Graph that links the first Fragment to that of what we need to transition to.

#### Logic for the Second Fragment
In the other Fragment we need to indicate when our animation enters or leaves. Inside you `onCreateView` include the following lines of code. 
```Kotlin
val animation = TransitionInflater.from(requireContext()).inflateTransition(android.R.transition.move)

sharedElementEnterTransition = animation
sharedElementReturnTransition = animation
```
### Demo
[!Demo](section-engineering/custom-animation-and-transition-effects-between-fragment-with-android-jetpacks-navigation-component/demo.gif)

### Conclusion
In this tutorial we learned what transition animations are, how to add animations to move back and forth through Destinations, we have also looked at how to animate a DialogFragment's transition and finally, we learned how to create a Shared Transition Element. Go ahead and enhance your awesome Android projects with these transitions to increase your app's interactivity. You can visit this repository for reference [FragmentsTransitionsDemo](https://github.com/FragmentsTransitionDemo).

Happy learning!

### References: 
- [Official Android Documentation](https://developer.android.com/guide/navigation)
