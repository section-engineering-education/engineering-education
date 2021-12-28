### Creating a Flipped Box Card in Android Jetpack Compose

Just like how a paper looks when it is flipped on one side, as a developer you may like to create a card that is flipped on one side. This card may be used to display some notes or items in your app.

When using XML to design layouts, this is nearly impossible. With Jetpack Compose, there is no direct Modifier that can be used to achieve this. This is when Canvas in Compose comes in handy.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Creating a Compose Project](#step-1---creating-a-compose-project)
- [Creating Custom Composable](#step-2---creating-custom-composable)
- [Creating a Wrapper Box](#step-3---creating-a-wrapper-box)
- [Working with Canvas](#step-4---working-with-canvas)
- [Items Inside the Card](#step-5---items-inside-the-card)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [References](#references)


### Prerequisites
To follow along with this tutorial, you will need the following:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your computer.
- An understanding of how to create and run Jetpack Compose Android apps.
- Basics of Canvas in Jetpack Compose.
- The [Kotlin](https://kotlinlang.org/) programming language's fundamentals.

### Introduction
When it comes to making custom graphics in Android, Jetpack compose makes it simpler and easier. For this tutorial, we will go through some concepts that we'll use to create a flipped card.

In this tutorial, we will go through some Canvas concepts in Compose, then we will jump directly to create a Flipped Card.

1. Canvas - This is the main Composable that we can use to create our custom graphics.
This is the syntax when it comes to creating a Canvas.
```Kotlin
Canvas(modifier = Modifier.fillMaxSize()) {
    YOUR_CODE
}
```
2. DrawScope - This is like an environment where we can do our graphics drawing.

3. ClipPath - This removes certain regions in Canvas based on a given path.
To do the clipping, here is how we define the `clipPath`.
```Kotlin
clipPath(path) {
    ...
}
```
4. Path - From the current point, `Path` draws a straight line to another given point.
Here is how we can define a path:
```Kotlin
val path = Path().apply {
    ...
}
```

5. LineTo - This creates a line segment from point A to point B. For the `lineTo` function, we pass the X and Y coordinates. 
`lineTo(X,Y)`

- DrawRoundRect - As its name says, the `drawRoundRect` function draws a round rectangle.

```Kotlin
drawRoundRect(
    ...
)
```

Let's get started.

### Step 1 - Creating a compose project
Launch your Android Studio and create an empty compose project.

![compose_proj](/engineering-education/creating-a-flipped-box-card-in-android-jetpack-compose/compose_project.png)

> Make sure you have selected Empty Compose Activity

Give it the name of your choice

![empty_proj](/engineering-education/creating-a-flipped-box-card-in-android-jetpack-compose/empty_proj.png)


### Step 2 - Creating custom composable
In this step, we will create a `Composable` that we will apply some `Canvas` operations. In your `MainActivity`, outside everything, define a `Composable` and name it `FlippedCard`.

For the `Composable` we will define some arguments:
A `modifier` and give it a default `Modifier`.
`cornerRadius` will be around our card.
`cutCornerSize` will be used to cut the top left of the card.
The color that our card will be in. 
I decided to add a color parameter because you may want to display the Cards in a Lazy Column in different colors, that's when you can pass different colors to the Cards.

```Kotlin
@Composable
fun FlippedCard(
    modifier: Modifier = Modifier,
    cornerRadius: Dp = 10.dp,
    cutCornerSize: Dp = 30.dp,
    color: Long
) {
    ...
}
```

### Step 3 - Creating a wrapper box
After creating our `FlippedCard` composable, inside it, we will add a `Box` that will hold our `Canvas` and all its operations.

```Kotlin
Box(
    modifier = modifier.padding(10.dp)
) {
    ...
}
```

### Step 4 - Working with canvas
In this step, inside the `Box` we add a `Canvas`
```Kotlin
Canvas(modifier = Modifier.matchParentSize()) {
    ...
}
```

We make sure we use `matchParentSize` as its size other than `fillMaxSize`. Our `Canvas` needs a fixed size - a size that the `Canvas` know the moment it is called. The `matchParentSize` will give the `Canvas` size immediately after the parent has measured its size. In that case, our parent is the Box.

> After creating the `Canvas`, it gives us a `DrawScope` that we can use to do our `Graphics` operations.

#### Path
Let's create a variable that represents a `Path` that will go through our rectangle.

This will be our graph:

![card_graph](/engineering-education/creating-a-flipped-box-card-in-android-jetpack-compose/card_graph.png)

```kotlin
val path = Path().apply {
    lineTo(size.width - cutCornerSize.toPx(), 0f)
    lineTo(size.width, cutCornerSize.toPx())
    lineTo(size.width, size.height)
    lineTo(0f, size.height)
    close()
}
```

> We make sure our `cutCornerSize` is converted to pixels using the `toPx` method. 

> `size` is the size of the `Canvas`.


- The first line will take the full width and minus the `cutCornerSize`.
- The second line will be the size of that which is to be removed (cutCornerSize).
- The third line will be a line that connects from the small second line. 
- The fourth line will run horizontally, this will be complete, unlike the first line.
- We then close our path using the `close` method.

Once the path is complete, pass it on to the `clipPath` method.

```kotlin
clipPath(path) {
    drawRoundRect(
        color = Color(color),
        size = size,
        cornerRadius = CornerRadius(cornerRadius.toPx())
    )

    drawRoundRect(
        color = Color(ColorUtils.blendARGB(color.toInt(), 0x000000, 0.2f)),
        topLeft = Offset(size.width - cutCornerSize.toPx(), -100f),
        size = Size(cutCornerSize.toPx() + 100f, cutCornerSize.toPx() + 100f),
        cornerRadius = CornerRadius(cornerRadius.toPx())
    )
}
```
> Anything outside the `clipPath` will be cut-off.

Inside the `clipPath`, we draw our two rectangles, the larger one, and another small rectangle. The larger rectangle will take the size of our Canvas. 
The smaller rectangle is drawn on that part of the large rectangle that was cut. We then cut half of the rectangle from the outside. We make the color of the rectangle be of the same color as the card but make it a bit darker by blending the color of the Composable with black in a ratio of "0.2f". 
For the top-left corner, we offset it so that the corner of the top end of the rectangle is not seen. For the size, we make sure it is the size of the `cutCornerSize` but we add the `100f` because we had offset it.

### Step 5 - Items inside the card
Below the `Canvas`, we can add any composables that we want. For this tutorial, we will just add two `Text` composables inside a `Column`. One to represent a title and another one to represent a description.

```kotlin
Column(
    modifier = Modifier
        .fillMaxSize()
        .padding(16.dp)
) {
    Text(
        text = "Compose is Awesome",
        style = MaterialTheme.typography.h6,
        color = Color.White
    )

    Text(
        text = "Lorem ipsum dolor sit amet...",
        style = MaterialTheme.typography.body1,
        color = Color.White
    )
}
```

Finally, we can use our Card by passing a color as its parameter.

```kotlin
setContent {
    FlippedCardDemoTheme {
        Surface(color = MaterialTheme.colors.background) {
            FlippedCardDemoTheme {
                FlippedCard(color = 0xff91a4fc)
            }
        }
    }
}
```

> In some cases, you can have a `LazyColumn` that uses the `FlippedCard` to display a list of items.

### Demo
After running the project, you will see something similar to this:

![demo](/engineering-education/creating-a-flipped-box-card-in-android-jetpack-compose/demo.png)

### Conclusion
In this tutorial, we have learned some basic concepts of Canvas and created a FlippedCard composable. Keep exploring more about the power of Graphics in Compose. To see a full implementation of the FlippedCard, check out this Github repository [Flipped Card Demo](https://github.com/sheecodes/FlippedCardDemo)

Happy coding!!!

### Reference
- [Graphics in Jetpack Compose](https://developer.android.com/jetpack/compose/graphics)
