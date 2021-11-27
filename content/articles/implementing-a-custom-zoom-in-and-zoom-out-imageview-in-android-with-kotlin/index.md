### Introduction
Zooming is an in-motion operation done to enlarge and reduce the size of an image or object in an android application. It always provides a powerful animated application to the users.

### Importance of including zoom capabilities to android Application.
- It gives a view of images that are not concentrated onto the current screen.
- Zoom control enables users to put in place the view to all the large and small objects on the android screen.
- Zooming give a clear view of the images and objects on android screens.
- Zoom capabilities provide a way in which users can concentrate on a specified sector of the entire image and study it.

### Prerequisites
- Ensure you have Android Studio installed
- Know the fundamental of the kotlin programming language
- Have basic mathematical knowledge of Matrices concept
- Have basic knowledge of creating and running android application

### Creating a Customized Zooming 
To create a customized zooming action, several methods should be implemented for this action to be successful. To begin on this, let us create a class that should extend `AppCompatImageView` and implement the following:

- `View.OnTouchListener`
- `GestureDetector.OnGestureListener`
- `GestureDetector.OnDoubleTapListener`

Within the created class ensure you have declared the following variables that would aid in the creation of these zooming controls.

```kotlin
var myMatrix: Matrix? = null
private var matrixValue: FloatArray? = null
var mode = NONE

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
Now include the following constructor details in the code structure
```kotlin
constructor(context: Context) : super(context) {
        constructionDetails(context)
    }

    constructor(context: Context, @Nullable attrs: AttributeSet?) : super(context, attrs) {
        constructionDetails(context)
    }

    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context!!,
        attrs,
        defStyleAttr
    )
```

Create the following method which serves as the foundation for the zooming functionality's creation.
```kotlin
    private fun constructionDetails(context: Context){
        super.setClickable(true)
        myContext=context
        myScaleDetector= ScaleGestureDetector(context,ScalingListener())
        myMatrix=Matrix()
        matrixValue=FloatArray(10)
        imageMatrix = myMatrix
        scaleType = ScaleType.MATRIX
        myGestureDetector = GestureDetector(context, this)
        setOnTouchListener(this)
    }
```
> Make sure you have declared `myScaleDetector`, `myGestureDetector` and `myContext` variables outside the `onCreate` method.

To retrieve the `ScaleGestureDetector`, which is usually an interface, we'll create an inner class and make sure it implements, `ScaleGestureDetector.SimpleOnScaleGestureListener` This class will then serve as the scale gesture detector.

```kotlin
private inner class ScalingListener : ScaleGestureDetector.SimpleOnScaleGestureListener(){
    ...
}
```

This class overrides two methods that are `onScaleBegin` and `onScale` which contains the general implementation of the `ScaleGestureDetector` interface.

`onScaleBegin` shows the mode level of the zooming which are ought to be done.
```kotlin
        override fun onScaleBegin(detector: ScaleGestureDetector?): Boolean {
            zoomMode = 2
            return true
        }
```

The `onScale` function converts the original picture size to a given scale factor. The following code demonstrates how to use the `onScale` function in its entirety.
```kotlin
override fun onScale(detector: ScaleGestureDetector): Boolean {
            var mScaleFactor = detector.scaleFactor
            val previousScale = mScaleFactor
            presentScale*=mScaleFactor
            if (presentScale > maximumScale) {
                presentScale = maximumScale
                mScaleFactor = maximumScale / previousScale
            }else if (presentScale < minimumScale) {
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

The method used to fix transition and put matrix value within an array for analysis  is as shown below:
```kotlin
    fun fittedTranslation() {
        myMatrix!!.getValues(matrixValue)
        val translationX =
            matrixValue!![Matrix.MTRANS_X]
        val translationY =
            matrixValue!![Matrix.MTRANS_Y]
        val fittedTransX = getFittedTranslation(translationX, mViewedWidth.toFloat(), originalWidth * presentScale)
        val fittedTransY = getFittedTranslation(translationY, mViewedHeight.toFloat(), originalHeight * presentScale)
        if (fittedTransX != 0f || fittedTransY != 0f) myMatrix!!.postTranslate(fittedTransX, fittedTransY)
    }
```

Another important method used to fit the image onto the screen according to its coordinate and provided scale factor is  as shown below:
```kotlin
    private fun putToScreen() {
        availableSCale = 1f
        val factor: Float
        val mDrawable = drawable
        if (mDrawable == null || mDrawable.intrinsicWidth == 0 || mDrawable.intrinsicHeight == 0) return
        val mImageWidth = mDrawable.intrinsicWidth
        val mImageHeight = mDrawable.intrinsicHeight
        val factorX = mViewedWidth.toFloat() / mImageWidth.toFloat()
        val factorY = mViewedHeight.toFloat() / mImageHeight.toFloat()
        factor = factorX.coerceAtMost(factorY)
        myMatrix!!.setScale(factor, factor)
        
        // Centering the image
       var repeatedYSpace = (mViewedHeight.toFloat()
                - factor * mImageHeight.toFloat())
        var repeatedXSpace = (mViewedWidth.toFloat()
                - factor * mImageWidth.toFloat())
        repeatedYSpace /= 2.toFloat()
        repeatedXSpace /= 2.toFloat()
        myMatrix!!.postTranslate(repeatedXSpace, repeatedYSpace)
        originalWidth = mViewedWidth - 2 * repeatedXSpace
        originalHeight = mViewedHeight - 2 * repeatedYSpace
        imageMatrix = myMatrix
  }

```

`getFittedTranslation` is a method that handles the negative coordinates of the image and the case when the image is not zoomed. The below code explains the implementation:
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

Finally, we'll implement the following Zoom control method:

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

Now that we've constructed the customized zoom functionality, we need to know where it applies for it to work. So on to your `ImageView` within the XML file replace the `ImageView` with the package name as shown below:
```XML
<com.odhiambodevelopers.mycustomzoomdemo.CustomeZoom
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
### Demo
![demo](/engineering-education/implementing-a-custom-zoom-in-and-zoom-out-imageview-in-android-with-kotlin/demo1.png)

![demo](/engineering-education/implementing-a-custom-zoom-in-and-zoom-out-imageview-in-android-with-kotlin/demo2.png)

### Conclusion
To summarize this article's content. We have covered the definition of zooming,  the importance of including zoom tools in your Android apps, The listeners that are used in the zooming implementation, as well as how to build a custom zoom-in and zoom-out `ImageView` in Android. To see the full implementation check the following Github repository [MyCustomZoomDemo](https://github.com/brandy-kay/MyCustomZoomDemo).

### Reference
Explore more on [Custom Zooming](https://developer.android.com/training/animation/zoom).
