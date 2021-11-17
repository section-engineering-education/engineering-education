---
layout: engineering-education
status: publish
published: true
url: /android-custom-views-extending-view/
title: Android Custom Views - Extending View Class
description: In this article we will create a simple view that is a colored circle with a border and add it to an XML layout.
author: peter-kayere
date: 2020-10-26T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-custom-views-extending-view/hero.jpg
    alt: Android custom views image example
---
A [view is a basic building block](https://www.studytonight.com/android/introduction-to-views/) of UI (User Interface) in Android. The Android platform has a variety of views. These views tend to meet most applications UI needs. In some cases, these ready-built views don't conform to the application's requirements. In these cases, developers have to create their own custom views.
<!--more-->
### Introduction
There are two approaches to creating custom Views.

These are:
1. By extending the Androids View class.
2. By extending an existing subclass of the View class.

This article will focus on the first approach, i.e., extending the View class. Why would you extend the View class when you can extend an already built subclass? Well for example, in an Android game, most of these applications' views don't resemble any other default view. It shows that the developers probably built their custom views from scratch. That's what we will go through.

We will create a simple view that is a colored circle with a border then add it to an XML layout.

Let's dive in!

### Prerequisites
To follow through with this tutorial you will need to:

  1. Have [Android Studio](https://developer.android.com/studio) installed.
  2. Have a basic knowledge of building Android applications.
  3. Have a basic understanding of Kotlin programming language.

Let's get started!

### Step 1 — Creating an Android Project
In this step, we're going to create our application. Open Android Studio and start a new project with an empty activity template. On the next page, give the application a name and keep the default settings.

![app name](/engineering-education/android-custom-views-extending-view/app-name.png)

Click `Finish` and wait for the project build process to finish.

### Step 2 — Creating our View Class
On your project window,
- Select `File -> New -> Kotlin File/Class`
- On the next screen select class, give it a name, and press enter.

![new class](/engineering-education/android-custom-views-extending-view/new-class.png)

On the newly created file. Add the following code to extend the View class.

```Kotlin
class Circle(context: Context, attr: AttributeSet): View(context, attr){

}
```

The View class has four constructors.
1. `constructor(context: Context)`. This constructor requires the activity context to create the view from Kotlin code.
2. `constructor(context: Context, attrs: AttributeSet)`. This constructor enables one to create a view from the XML code. It's the most popular constructor and the one we have used above.
3. `constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int)`. This constructor creates a view from XML with a style from the theme attribute.
4. `constructor(context: Context, attrs: AttributeSet, defStyleAttr: Int, defStyleRes: Int)`. This constructor creates a view from XML with a style from the theme attribute and/or a style resource.

After declaring the constructor, we now have to override the methods we require to create our view. Let's take a look at the methods.

The first method we'll override is the `onDraw` method. The Android system calls this method when the activity comes to the foreground.

It's in this method where the view draws itself. When Android calls this method, it passes in a canvas object for the view to draw on.

The other method that we will override is the `onMeasure` method. This method allows the view to measure itself before drawing.

Let's override the methods to start drawing.

Add the following code to override the method.

```Kotlin
override fun onDraw(canvas: Canvas?){

}

override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int){
  super.onMeasure(widthMeasureSpec, heightMeasureSpec)
}
```

We'll need a paint object to draw on the canvas. Let's create it as a member of the class. We instantiate it with the `ANTI_ALIAS_FLAG` to make our shapes smooth.

```Kotlin
private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
```

Since we will create our view from XML, let's make the attributes resource file first before we finish our view class.

### Step 3 — Creating Attribute Resource File
This is the file that will tell our view the developer's selection from the layout file.

To create it:
- Go to `File -> New -> Android Resource File`
- Give it a name, then click finish.

![new resource file](/engineering-education/android-custom-views-extending-view/new-resource-file.png)

Add the following code between the resource tags to create the attributes.

```xml
<declare-styleable name="Circle">
    <attr name="circleColor" format="color"/>
    <attr name="borderColor" format="color"/>
    <attr name="borderWidth" format="float"/>
</declare-styleable>
```

This will allow you to specify the circle & border colors and width from the layout file.

Let's go ahead and finish our view class.

### Step 4 — Drawing The View
In this step, we will take the attributes set on the layout and use them to draw our view.

Add the following member variables to the class.

```Kotlin
private var halfWidth = 0
private var halfHeight = 0
private var radius = 0
```

We're going to use half the width and height of the view to determine the center of the circle.

Now add this code to get the attributes.

```Kotlin
private val typedArray = context.theme.obtainStyledAttributes(attr, R.styleable.Circle, 0, 0)
private val circleColor = typedArray.getColor(R.styleable.Circle_circleColor, Color.YELLOW)
private val borderColor = typedArray.getColor(R.styleable.Circle_borderColor, Color.BLACK)
private val borderWidth = typedArray.getFloat(R.styleable.Circle_borderWidth, 2F)
```

In the code above, we get a typed array from the context's theme. We then get the corresponding attributes from the typed array. We also set a default property when no value was passed.

Now let's add the following code to our `onMeasure` method to get the values we need for our view.

```Kotlin
halfHeight = measuredHeight / 2
halfWidth = measuredWidth / 2
radius = halfHeight.coerceAtMost(halfWidth) - borderWidth.toInt()
setMeasuredDimension(measuredWidth, measuredHeight)
```

We set the radius to the smallest measurement between half of the width and height. The `setMeasuredDimension` method stores the values we have measured.

Now in the `onDraw` method, add the code below to draw the circle and its border.

```Kotlin
//drawing the circle
paint.apply { color = circleColor; style = Paint.Style.FILL }
canvas?.drawCircle(halfWidth.toFloat(), halfHeight.toFloat(), radius.toFloat(), paint)
//drawing circle border
paint.apply { color = borderColor; style = Paint.Style.STROKE; strokeWidth = borderWidth}
canvas?.drawCircle(halfWidth.toFloat(), halfHeight.toFloat(), radius.toFloat(), paint)
```

We set the paint color to the `circleColor` variable and the style to fill and draw the circle. The canvas' `drawCircle` method uses the paint object and the dimensions we calculated to draw the colored circle. For the border, we changed the paint style to stroke. This draws a circular border around our colored circle. That's all we need for our view class.

### Step 5 — Adding the View to XML Layout
Open the `activity_main.xml` file and add the view in this format.

```xml
<your-package-name.view-name/>
```

Our code should look something like this.

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

We are done! Build and run your application on an emulator or an Android device. The resulting view should resemble the one below.

![app](/engineering-education/android-custom-views-extending-view/app.png)

### Conclusion
In this article, we've gone through creating a custom view by extending the view class. We have also seen how we can create custom attributes for our views and add them to our layout file. Custom views give an application's UI a unique look and feel. This helps developers build applications with a better user experience. You can get the full code on [GitHub](https://github.com/kayere/android-custom-views.git).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
