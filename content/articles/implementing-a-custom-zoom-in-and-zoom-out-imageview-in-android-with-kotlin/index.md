---
layout: engineering-education
status: publish
published: true
url: /implementing-custom-zoom-in-imageview-in-android/
title: Implementing a Custom Zoom on ImageView in Android with Kotlin
description: This tutorial takes the reader through the process of implementing a custom zoom in and zoom out ImageView in Android with Kotlin.
author: brandy-odhiambo
date: 2021-12-02T00:00:00-11:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-custom-zoom-in-imageview-in-android/hero.png
    alt: Custom Zoom in ImageView in Android Hero Image
---
Zooming is an in-motion operation done to enlarge or reduce the size of an image or an object in an Android application. It provides a powerful and appealing visual effect to the users.
<!--more-->
### Prerequisites
To best follow along with this tutorial, the reader will need the following:
- Make sure you have Android Studio installed on your computer.
- Knowledge of the fundamental concepts of the Kotlin programming language is required.
- Have basic mathematical knowledge of Matrices.
- Have basic knowledge of creating and running Android applications.

### Importance of zooming in Android
- It gives a view of images that are not concentrated onto the current screen.
- Zoom control allows users to put in place a clear view to all the large and small objects on the screen.
- Zoom provides a way in which users can concentrate on a specified sector of the entire image and study it.

### Creating a customized zooming effect
To successfully create a customized zooming action, several methods should be implemented.

To begin with, let's create a class that extends `AppCompatImageView` and implement the following:
- `View.OnTouchListener`
- `GestureDetector.OnGestureListener`
- `GestureDetector.OnDoubleTapListener`

Within this class, ensure you have declared the following variables that aid in the creation of zooming controls.

```kotlin
var myMatrix: Matrix? = null
private var matrixValue: FloatArray? = null
var mode = NONE // import this constant from the View class

// Scales
var presentScale = 1f
var minimumScale = 1f
var maximumScale = 4f

//Dimensions
var originalWidth = 0f
var originalHeight = 0f
var viewedWidth = 0
var viewedHeight = 0
```

Include the following constructor details in the code structure:

```kotlin
constructor(context: Context) : super(context) {
        constructionDetails(context)
}

constructor(context: Context, @Nullable attrs: AttributeSet?) : super(context, attrs) {
    constructionDetails(context)
}

constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
    context!!, attrs, defStyleAttr
)
```

Create the following method that serves as the foundation for the zooming functionality's creation:

```kotlin
private fun constructionDetails(context: Context){
    super.setClickable(true)

    myContext = context
    myScaleDetector = ScaleGestureDetector(context,ScalingListener())
    myMatrix = Matrix()
    matrixValue = FloatArray(10)
    imageMatrix = myMatrix
    scaleType = ScaleType.MATRIX
    myGestureDetector = GestureDetector(context, this)
    setOnTouchListener(this)
}
```

> Make sure you have declared `myScaleDetector`, `myGestureDetector` and `myContext` as global variables.

To retrieve the `ScaleGestureDetector`, which is usually an interface, we'll create an inner class and implement, `ScaleGestureDetector.SimpleOnScaleGestureListener`. This class will then serve as the scale gesture detector.

```kotlin
private inner class ScalingListener : ScaleGestureDetector.SimpleOnScaleGestureListener(){
    ...
}
```

This class overrides two methods, `onScaleBegin` and `onScale` which contains the general implementation of the `ScaleGestureDetector` interface.

`onScaleBegin` shows the mode level of the zooming which ought to be done.

```kotlin
override fun onScaleBegin(detector: ScaleGestureDetector?): Boolean {
    zoomMode = 2
    return true
}
```

The `onScale` method converts the original picture size to a given scale factor. The following code demonstrates how to use the `onScale` function in its entirety.

```kotlin
override fun onScale(detector: ScaleGestureDetector): Boolean {
    var mScaleFactor = detector.scaleFactor
    val previousScale = mScaleFactor
    presentScale *= mScaleFactor
    if (presentScale > maximumScale) {
        presentScale = maximumScale
        mScaleFactor = maximumScale / previousScale
    } else if (presentScale < minimumScale) {
        presentScale = minimumScale
        mScaleFactor = minimumScale / previousScale
    }
    if (originalWidth * presentScale <= mViewedWidth
        || originalHeight * presentScale <= mViewedHeight
    ) {
        myMatrix!!.postScale(
            mScaleFactor, mScaleFactor, mViewedWidth / 2.toFloat(),
            mViewedHeight / 2.toFloat()
        )
    } else {
        myMatrix!!.postScale(
            mScaleFactor, mScaleFactor,
            detector.focusX, detector.focusY
        )
    }
    fittedTranslation()
    return true
}    
```

The method shown below is used to fix transitions and put matrix value within an array for analysis:

```kotlin
fun fittedTranslation() {
    myMatrix!!.getValues(matrixValue) // get matrix values
    val translationX = matrixValue!![Matrix.MTRANS_X]
    val translationY = matrixValue!![Matrix.MTRANS_Y]

    val fittedTransX = getFittedTranslation(translationX, mViewedWidth.toFloat(), originalWidth * presentScale) // get fitted translation
    val fittedTransY = getFittedTranslation(translationY, mViewedHeight.toFloat(), originalHeight * presentScale)

    if (fittedTransX != 0f || fittedTransY != 0f) myMatrix!!.postTranslate(fittedTransX, fittedTransY) // post fitted translation
}
```

Another important method used to fit the image onto the screen based on its coordinates and the scale factor provided is as shown below:

```kotlin
private fun putToScreen() {
    availableSCale = 1f
    val factor: Float
    val mDrawable = drawable
    // return if there is no drawable or thee dimensions are 0
    if (mDrawable == null || mDrawable.intrinsicWidth == 0 || mDrawable.intrinsicHeight == 0) return

    val mImageWidth = mDrawable.intrinsicWidth
    val mImageHeight = mDrawable.intrinsicHeight
    val factorX = mViewedWidth.toFloat() / mImageWidth.toFloat()
    val factorY = mViewedHeight.toFloat() / mImageHeight.toFloat()

    factor = factorX.coerceAtMost(factorY)
    myMatrix!!.setScale(factor, factor)
    
    // Centering the image
    var repeatedYSpace = (mViewedHeight.toFloat() - factor * mImageHeight.toFloat())
    var repeatedXSpace = (mViewedWidth.toFloat() - factor * mImageWidth.toFloat())
    repeatedYSpace /= 2.toFloat()
    repeatedXSpace /= 2.toFloat()
    myMatrix!!.postTranslate(repeatedXSpace, repeatedYSpace)
    originalWidth = mViewedWidth - 2 * repeatedXSpace
    originalHeight = mViewedHeight - 2 * repeatedYSpace
    imageMatrix = myMatrix
}
```

`getFittedTranslation` is a method that handles the negative coordinates of the image and the case when the image is not zoomed. 

The following snippet shows its implementation:

```kotlin
private fun getFittedTranslation(mTranslate: Float,vSize: Float, cSize: Float): Float {
    val minimumTranslation: Float
    val maximumTranslation: Float
    if (cSize <= vSize) { // case: NOT ZOOMED
        minimumTranslation = 0f
        maximumTranslation = vSize - cSize
    } else { //CASE: ZOOMED
        minimumTranslation = vSize - cSize
        maximumTranslation = 0f
    }
    if (mTranslate < minimumTranslation) {
        return -mTranslate + minimumTranslation
    }
    if (mTranslate > maximumTranslation) {
        return -mTranslate + maximumTranslation
    }

    return 0F
}
```

Finally, we'll implement the following `onTouch` zoom control method. This method is used to handle the touch events.

```kotlin
override fun onTouch(mView: View, mMouseEvent: MotionEvent): Boolean {
        myScaleDetector!!.onTouchEvent(mMouseEvent)
        myGestureDetector!!.onTouchEvent(mMouseEvent)
        val currentPoint = PointF(mMouseEvent.x, mMouseEvent.y)

        val mDisplay = this.display
        val mLayoutParams = this.layoutParams
        mLayoutParams.width = mDisplay.width
        mLayoutParams.height = mDisplay.height
        this.layoutParams = mLayoutParams

        when (mMouseEvent.action) {
            MotionEvent.ACTION_DOWN -> {
                lastPoint.set(currentPoint)
                startPoint.set(lastPoint)
                zoomMode = 1
            }
            MotionEvent.ACTION_MOVE -> if (zoomMode == 1) {
                val changeInX = currentPoint.x - lastPoint.x
                val changeInY = currentPoint.y - lastPoint.y
                val fixedTranslationX = getFixDragTrans(changeInX, viewedWidth.toFloat(), originalWidth * availableSCale)
                val fixedTranslationY = getFixDragTrans(changeInY, viewedHeight.toFloat(), originalHeight * availableSCale)
                myMatrix!!.postTranslate(fixedTranslationX, fixedTranslationY)
                fittedTranslation()
                lastPoint[currentPoint.x] = currentPoint.y
            }
            MotionEvent.ACTION_POINTER_UP -> zoomMode = 0
        }
        imageMatrix = myMatrix
        return false
}
```

Now that we've constructed the customized zoom functionality, we need to know where it applies for it to work. On your `ImageView` within the XML file, replace the `ImageView` with the package name as shown below:

```xml
<com.odhiambodevelopers.mycustomzoomdemo.CustomZoom
        android:id="@+id/android"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/robot"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
```

> Note: Your package name might be different from the one shown above.

### Demo
Run the app and try to zoom in and out. It should work as shown below:

![Image not zoomed](/engineering-education/implementing-custom-zoom-in-imageview-in-android/demo1.png)

![Zoomed image](/engineering-education/implementing-custom-zoom-in-imageview-in-android/demo2.png)

### Conclusion
In this tutorial, we have learned what zooming is and how to implement a custom zoom functionality in an ImageView in Android using Kotlin.

To see the full code implementation, check out [this GitHub repository](https://github.com/brandy-kay/MyCustomZoomDemo).

Happy coding!

### Reference
Explore more on [Custom Zooming](https://developer.android.com/training/animation/zoom).

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
