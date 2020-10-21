### Introduction
Android platform has a variety of views. These views tend to meet most applications' UI needs. In some cases, these ready built views don't really conform to the applications requirements. In these cases developers have to create their own views. There are two approaches to creating custom Views. These are:
1. By extending the androids View class.
2. By extending an existing subclass of the View class.

This article will focus on the first approach. Extending the View class. Why extend the View class when you can extend an already built subclass? Take the case of an android game. Most of the views in these applications don't resemble any other default view. This shows that the developers most probably built their view from scratch. That's what we are going to do here.

We are going to create a simple view. That is a colored circle with a border. We are then going to see how we can add this view through an xml layout file.

Let's dive in!

### Prerequisites
To follow through this tutorial you will need to:
1. Have android studio installed. You can install it from [here](https://developer.android.com/studio).
2. Have a basic knowledge of building android applications.
3. Have a basic knowledge of Kotlin programming language.

Let's get started!

### Step 1 — Creating An Android Project
In this step we are going to create our application.
- Open android studio and select new project. 
- Select empty project template and click next.

![empty template](/engineering-education/android-custom-views/empty-template)

- On the next page give the application a name and keep the default settings.

![app name](/engineering-education/android-custom-views/app-name)

- Click finish and wait for build to finish.

### Step 2 — Creating our View Class
On your project window, 
- Select File -> New -> Kotlin File/Class
- On the next screen select class, give it a name and press enter.

![new class](/engineering-education/android-custom-views/new-class)

On the newly created file. Add the following code to extend the View class.
```Kotlin
class Circle(context: Context, attr: AttributeSet): View(context, attr){

}
```

The View class has 4 constructors.
1. `constructor(context: Context)`. This constructor requires the activity context to create the view from Kotlin code.
2. `constructor(context: Context, attrs: AttributeSet)`. This constructor enables one to create a view form xml code. It is the most popular constructor and the one we have used above.
3. `constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int)`. This constructor creates a view from xml with a style from theme attribute.
4. `constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int, defStyleRes: Int)`. This constructor creates a view from xml with a style from theme attribute and /or a style resource.

After declaring the constructor. We now have to override the methods we require to create our view. Let's take a look at the methods.

The first method we will override is the `onDraw` method. The android system calls this method when the activity comes to the foreground. It is in this method where the view draws itself. When android calls this method, it passes in a canvas object for the view to draw on. The other method that we will override is the `onMeasure` method. This method allows the view to measure itself before drawing.

Let's override the methods to start drawing.

Add the following code to override the method.
```Kotlin
override fun onDraw(canvas: Canvas?){

}

 override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int){
    super.onMeasure(widthMeasureSpec, heightMeasureSpec)
 }
```
We will need a paint object to draw on the canvas. Let's create it as a member of the class. We instantiate it with the `ANTI_ALIAS_FLAG` to make our shapes smooth.
```Kotlin
private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
```
Since we are going to create our view from xml. Let's go ahead and make the attributes resource file first before we finish our view class.

### Step 3 — Creating Attribute Resource File
This is the file that will tell our view the selection the developer has made from the layout file. To create it;

- Go to File -> New -> Android Resource File
- Give it a name then click finish.

![new resource file](/engineering-education/android-custom-views/new-resource-file)

Add below code between the resource tags to create the attributes.
```xml
<declare-styleable name="Circle">
    <attr name="circleColor" format="color"/>
    <attr name="borderColor" format="color"/>
    <attr name="borderWidth" format="float"/>
</declare-styleable>
```
This will allow you to specify the circle color, border color and width from the layout file.

Let's go ahead and finish our view class.

### Step 4 — Drawing The View
In this step, we are going to take the attributes set on the layout and use them to draw our view.

Add the following member variables to the class
```Kotlin
private var halfWidth = 0
private var halfHeight = 0
private var radius = 0
``` 
We are going to use the half width and height of the view to determine the center of the circle.

Now add this code to get the attributes.
```Kotlin
private val typedArray = context.theme.obtainStyledAttributes(attr, R.styleable.Circle, 0, 0)
private val circleColor = typedArray.getColor(R.styleable.Circle_circleColor, Color.YELLOW)
private val borderColor = typedArray.getColor(R.styleable.Circle_borderColor, Color.BLACK)
private val borderWidth = typedArray.getFloat(R.styleable.Circle_borderWidth, 2F)
```
In the above code, we get a typed array from the context's theme. We then get the corresponding attributes from the typed array. We also set a default property when no value was passed.

Now let's add the following code to our `onMeasure` method to get the values we need for our view.
```Kotlin
halfHeight = measuredHeight / 2
halfWidth = measuredWidth / 2
radius = halfHeight.coerceAtMost(halfWidth) - borderWidth.toInt()
setMeasuredDimension(measuredWidth, measuredHeight)
```
Radius is set to the smallest measurement between the half width and height. The `setMeasuredDimension` method stores the values we have measured.

Now in the `onDraw` method add below code to draw the circle and its border.
```Kotlin
//drawing the circle
paint.apply { color = circleColor; style = Paint.Style.FILL }
canvas?.drawCircle(halfWidth.toFloat(), halfHeight.toFloat(), radius.toFloat(), paint)
//drawing circle border
paint.apply { color = borderColor; style = Paint.Style.STROKE; strokeWidth = borderWidth}
canvas?.drawCircle(halfWidth.toFloat(), halfHeight.toFloat(), radius.toFloat(), paint)
```
To draw the circle, we set the paint color to the `circleColor` variable and the style to fill. Then the canvas' `drawCircle` method uses the paint object and the dimensions we calculated to draw the colored circle. For the border, we changed the paint style to stroke. This draws a circular border around our colored circle. That's all we need for our view class.

### Step 5 — Adding The View To xml Layout
Open activity_main.xml file and add the view in this format
```xml
<<your-package-name>.<view-name>
 />
```
Below is an example.
```xml
<com.kayere.customviews.Circle
    android:id="@+id/circle"
    android:layout_width="260dp"
    android:layout_height="260dp"
    app:circleColor="#ff0900"
    app:borderWidth="5"
    app:borderColor="@color/colorPrimary"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
```
And we are done! Build and run you application on an emulator or ana ndroid device.

This is how the application is supposed to look like.

![app](/engineering-education/android-custom-views/app)

### Conclusion
In this article, we have gone through creating a custom view by extending the view class. We have also seen how we can create custom attributes for our views and how to add these views to our layour file. Custom views give an application's UI a unique look. This helps developers to build outstanding applications. You can get the full code on [github](https://github.com/kayere/android-custom-views.git).