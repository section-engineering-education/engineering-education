---
layout: engineering-education
status: publish
published: true
url: /android-custom-views-extending-view-subclass/
title: Android - Extending View Subclass
description: In this article will go through how to create a custom View is by extending an existing widget in Android.
author: peter-kayere
date: 2020-11-04T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-custom-views-extending-view-subclass/hero.jpg
    alt: Android custom views image example
---
In a [previous article](/android-custom-views-extending-view/) we discuss the approach of extending a custom view in Android. Another approach to creating a custom View is by extending an existing widget. Extending an existing subclass is relatively easier when compared to extending the whole class.
<!--more-->
This approach gives the developer existing features and styles to customize. This article will go through creating a custom view using this approach.
### Introduction
#### What we will do
We're going to create a color slider. This view resembles a seek bar and so we will extend it. We'll use the view to select the color of a text in a `TextView`.

Let's dive in!

### Prerequisites
To follow through with this tutorial, you will need:
  1. Have [Android Studio](https://developer.android.com/studio) installed.
  2. Basic knowledge of building Android applications.
  3. Basic understanding of Kotlin programming language.

Let's get started

### Step 1 — Creating an Android Project
In this step, we're going to create our application. Open Android Studio and start a new project with an empty activity template. On the next page, give the application a name and select API 21 for minimum SDK. This is because the features we will use require Android version 5.0.

![app name](/engineering-education/android-custom-views-extending-view-subclass/app-name.png)

Click `Finish` and wait for the project build process to finish.

### Step 2 — Creating The Color Slider Class
On your project window,
- Select `File -> New -> Kotlin File/Class`
- On the next screen select class, give it a name, and press *Enter*.

On the newly created file. Add the following code to extend the `SeekBar` class.

```Kotlin
class ColorSlider(context: Context, attrs: AttributeSet): androidx.appcompat.widget.AppCompatSeekBar(context, attrs) {

}
```

We'll use that constructor so that we can add our view through XML. Visit this [page](https://developer.android.com/reference/android/widget/SeekBar?authuser=3) for more details about other constructors.

In this class, add the following member variables.

```Kotlin
private val colors = arrayOf(Color.RED, Color.BLACK, Color.YELLOW, Color.BLUE, Color.GRAY, Color.GREEN)
private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
private var listeners = ArrayList<(Int) -> Unit>()
```

The first variable is an array of colors from which the user will select. The second one is a paint object that we will use to draw custom tick marks. The third one is an array of functions that will run whenever a user selects a particular color.

Next, add an `init` block to perform some customizations on the view upon creation.

```Kotlin
init {
    progressBackgroundTintList = ContextCompat.getColorStateList(context, android.R.color.transparent)
    progressTintList = ContextCompat.getColorStateList(context, android.R.color.transparent)
    splitTrack = false
    max = 5
}
```

Here we set the progress background tint and progress tint to transparent. We also set the split track to false to make the seek bar thumb transparent. We set the maximum value to 5 because our array contains six colors.

We override the `onDraw` method of the seek bar to create custom tick marks.

### Step 3 — Overriding 'onDraw' Method
Now that we have set our view with the desired attributes let's override the `onDraw` method to begin drawing. We will make custom-colored square tick marks. The squares will get colors from the colors array.

Let's get to it!

First, override the `onDraw` method by adding the code below.

```Kotlin
override fun onDraw(canvas: Canvas?) {
    super.onDraw(canvas)
}
```

Here we have to call `super.onDraw` to allow the parent view to draw first. Then create a function to draw the tick marks.

```Kotlin
private fun drawTickMarks(canvas: Canvas?){

}
```

Call the function in the `onDraw` method.

```Kotlin
override fun onDraw(canvas: Canvas?) {
    super.onDraw(canvas)
    drawTickMarks(canvas)
}
```
Add the `drawTickMarks` implementation as shown.

```Kotlin
private fun drawTickMarks(canvas: Canvas?) {
    canvas?.let {
        val w = 24F
        val h = 24F
        val spacing = (width - paddingLeft - paddingRight) / max.toFloat()
        it.translate(paddingLeft.toFloat(), height / 2 .toFloat())
        for (color in colors) {
        paint.color = color
        it.apply {
            drawRect(-w, -h, w, h, paint)
            translate(spacing, 0F)
        }
      }
    }
}
```

In the function, we first check if the canvas is null. We use Kotlin's let function to perform all the tasks. The statement `canvas?.let{}` means that if the canvas is not null, it executes the block's code.

We explicitly declare the width and height of the tick marks to 24 pixels in the let function. The value should be a float. For the spacing between the tick marks, we subtract the left and right padding from the width the divide it by `max`. We obtain all these values from the super class. The spacing value should also be a float.

Before drawing the squares, we use the `translate` method to move the drawing pen to the right position. We then loop through the colors array drawing the squares on the canvas. The `drawRect` method draws the squares given the dimensions and paint object. `translate` moves the pen to the next drawing position.

That's all for the drawing!

In the `init` block, set `onSeekBarChangeListener` by adding this block

```Kotlin
setOnSeekBarChangeListener(object: OnSeekBarChangeListener{
        override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
            listeners.forEach {
                it(colors[progress])
            }
        }

        override fun onStartTrackingTouch(p0: SeekBar?) {
            Log.i("Picker", "Tracking started")
        }

        override fun onStopTrackingTouch(p0: SeekBar?) {
            Log.i("Picker", "Tracking stopped")
        }

})
```

This will run the listener functions every time the seek bar progress changes. We also need to add a member function that we'll use to add listeners to the listener array.

```Kotlin
fun addListener(function: (Int) -> Unit) {
    listeners.add(function)
}
```

That's all we need for the class. Let's now add the view to an XML file.

### Step 4 — Adding the View
Open the `activity_main` file and add the following views.

```xml
<TextView
    android:id="@+id/textView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/Color"
    android:textSize="@android:dimen/app_icon_size"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintVertical_bias="0.45" />

<com.kayere.colorslider.ColorSlider
    android:id="@+id/colorSlider"
    android:layout_width="260dp"
    android:layout_height="wrap_content"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/textView"
    app:layout_constraintVertical_bias="0.11" />
```

As I mentioned earlier, we'll use the color slider to change the color of the text view. For the color slider, you will have to use the package name of your application.

### Step 5 — Finishing The application
Open `MainActivity` file and add this code in the `onCreate` method.

```Kotlin
colorSlider.addListener {
    textView.setTextColor(it)
}
```

This will change the color of the text view every time the user selects a color.

That's it! Build and run the app. The results should resemble the one below.

![App](/engineering-education/android-custom-views-extending-view-subclass/app.gif)

### Conclusion
In this article, we have gone through creating a custom view by extending a widget. We have also seen how we can change the view's appearance by drawing. Creating custom views through this approach is a bit easier.

It gives the application a unique appearance with less work to do. Check this [article](/android-custom-views-extending-view/) for a guide on creating custom views by extending the `View` class. You can find the source code of the application on [GitHub](https://github.com/kayere/color-slider.git). Feel free to raise an issue or a PR if you notice any error.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
