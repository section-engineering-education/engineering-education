---
layout: engineering-education
status: publish
published: true
url: /creating-custom-animated-shimmer-effect-with-jetpack-compose/
title: Creating a Custom Animated Shimmer Effect with Jetpack Compose
description: This tutorial takes the reader through the process of creating a custom animated shimmer effect with Jetpack Compose.
author: Kirwa-Elyjah
date: 2022-01-19T00:00:00-04:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-custom-animated-shimmer-effect-with-jetpack-compose/hero.png
    alt: Creating Custom Animated Shimmer Effect with Jetpack Compose
---
The shimmer effect gives an appealing appearance on specific parts in an application. It is used as a placeholder when the content of the app is loading.
<!--more-->
This content could be from the internet or from the device's local storage. When the data is fetched, the shimmer effect stops, and the data is displayed.

In this tutorial, we will create an animated shimmer effect in Jetpack Compose.

### Prerequisites
To follow along with this tutorial, the reader should:
- Have [Android Studio](https://developer.android.com/studio#downloads) installed.
- Have an understanding of the [Kotlin](https://developer.android.com/kotlin) programming language.
- Have an understanding and experience of building Android apps using [Jetpack Compose](https://developer.android.com/jetpack/compose).

### Goals
By the end of this tutorial, the reader will be able to:
- Create Shimmer effect with Jetpack Compose.
- Create Shimmer grid items.
- Customize Shimmer's time, color, and animate it.

### Terminologies
In this tutorial, you will encounter the following Compose terminologies:
- `Modifier` - This property is used to change a component's appearance.
- `Composables` - Functions that programmatically define an app's UI. They describe how it should appear.
- `Spacer` - It is a component that displays an empty space between objects on the UI.
- `Row` - In Compose, a `row` aligns items horizontally.
- `Column` - Aligns items vertically.
- `Easing` - Easing is a way to adjust an animation's fraction. It determines the acceleration of the animation during the start-end interoperation.

Let's get started.

### Step 1 - Creating a new Compose project
To create a new Compose project, launch Android Studio and select `New Project` then `Compose Activity`. Name it `ShimmerDemo` and click on `finish` to build the project.

Wait till the building is finished.

![Create Project-1](/engineering-education/creating-custom-animated-shimmer-effect-with-jetpack-compose/create-project-step-one.png)

![Create Project-2](/engineering-education/creating-custom-animated-shimmer-effect-with-jetpack-compose/create-project-step-two.png)

### Step 2 - Creating a new Kotlin file
Right-click on the app's package folder and create a new Kotlin file. Name this file `Shimmer` or any other name of your choice.

In the `Shimmer` file, we will create a composable function that will define how the Shimmer will appear.

We'll declare a list of colors to be used for our brush tool in a function. The colors are arranged in such a way that the lighter color is at the center. This gives some visual appeal.

In this tutorial, we will use grey color but for your project, you can use colors of your choice.

The composable `LoadingShimmerEffect()` function will look as follows:

```kotlin
@Composable
fun LoadingShimmerEffect(){

   //These colors will be used on the brush. The lightest color should be in the middle

   val gradient = listOf(
       Color.LightGray.copy(alpha = 0.9f), //darker grey (90% opacity)
       Color.LightGray.copy(alpha = 0.3f), //lighter grey (30% opacity)
       Color.LightGray.copy(alpha = 0.9f)
   )
   
   val transition = rememberInfiniteTransition() // animate infinite times

   val translateAnimation = transition.animateFloat( //animate the transition
       initialValue = 0f,
       targetValue = 1000f,
       animationSpec = infiniteRepeatable(
           animation = tween(
               durationMillis = 1000, // duration for the animation
               easing = FastOutLinearInEasing
           )
       )
   )
   val brush = linearGradient(
       colors = gradient,
       start = Offset(200f, 200f),
       end = Offset(x = translateAnimation.value,
       y = translateAnimation.value)
   )
   ShimmerGridItem(brush = brush)
}
```

The `rememberInfiniteTransition()` is a composable function that animates the shimmer infinitely. The `translateAnimation` will animate the shimmer with the provided values.

`translateAnimation` takes in `initialValue`, `targetValue` and `animationSpec` parameters. The animation will run from `initialValue` to `targetValue` and repeat.

During the animation, if the `initialValue` changes, the animation will restart with the new value. This also applies when the `targetValue` changes. The animation will thus, have no consistency.

You can customize the delay time for your shimmer effect using `durationMillis`. In our case, we specified the value to `1000 milliseconds`. That is equal to 1 second.

For the animation specifications, you can use any `animationSpec` of your choice. You can specify the data type to be animated, as well as the animation configuration.

For `easing`, you can choose any type you wish to apply in your application. To expand more of this, read on [Jetpack Compose animations](https://www.section.io/engineering-education/animations-in-jetpack-compose/).

### Step 3 - Creating Shimmer grid items
Start by creating a `Composable` function named `ShimmerGridItem()`. This function will define how our single shimmer item will appear on the screen. 

We are going to create a single row containing several shapes. We'll then use these shapes for our shimmer effect.

The code will be as follows:

```kotlin
@Composable
fun ShimmerGridItem(brush: Brush) {
   Row(modifier = Modifier
       .fillMaxSize()
       .padding(all = 10.dp), verticalAlignment = Alignment.Top) {

       Spacer(modifier = Modifier
           .size(80.dp)
           .clip(RoundedCornerShape(10.dp))
           .background(brush)
       )
       Spacer(modifier = Modifier.width(10.dp))
       Column(verticalArrangement = Arrangement.Center) {
           Spacer(modifier = Modifier
               .height(20.dp)
               .clip(RoundedCornerShape(10.dp))
               .fillMaxWidth(fraction = 0.5f)
               .background(brush)
           )

           Spacer(modifier = Modifier.height(10.dp)) //creates an empty space between
           Spacer(modifier = Modifier
               .height(20.dp)
               .clip(RoundedCornerShape(10.dp))
               .fillMaxWidth(fraction = 0.7f)
               .background(brush)
           )

           Spacer(modifier = Modifier.height(10.dp)) //creates an empty space between 
           Spacer(modifier = Modifier
               .height(20.dp)
               .clip(RoundedCornerShape(10.dp))
               .fillMaxWidth(fraction = 0.9f)
               .background(brush))
       }
   }
}
```

In the above function, we have created a single row containing all the items we needed. These items are a shape to represent an image placeholder and three more rounded shapes to act as text placeholders.

> Make sure you call the `ShimmerGridItem()` method inside the `LoadingShimmerEffect()` function. 

Upon preview, the row we just created will appear as follows:

![Row preview](/engineering-education/creating-custom-animated-shimmer-effect-with-jetpack-compose/shimmer-row.png)

### Previewing
Previewing on the screen is done as follows:

```kotlin
@Composable
@Preview(showBackground = true)
fun ShimmerPreview(){
   ShimmerGridItem(brush = linearGradient(
       listOf(
           Color.LightGray.copy(alpha = 0.9f),
           Color.LightGray.copy(alpha = 0.4f),
           Color.LightGray.copy(alpha = 0.9f)
       )
     )
   )
}
```

> NOTE: All the above functions are in the same Kotlin file we created. ie. `Shimmer.kt`.

`@Preview` feature is provided by the Android Studio to offer composable previews. Setting it to true will make the composable function to appear on the design screen.

If the preview doesn't render, add the following dependency in the app-level `build.gradle`.

```gradle
implementation "androidx.compose.ui:ui-tooling:1.0.5"
```

Sync your project and wait for the build to finish. You will be able to see a preview of your design on the design screen. This offers interaction between you and the composables. 

This interactive mode has some limitations though. Some of them are:
- There is neither network nor files access.
- Not all `Context` APIs are available.

### Step 4 - MainActivity.kt
To run our app on a physical device/emulator, make sure you add the following in the `MainActivity.kt` file.

```kotlin
class MainActivity : ComponentActivity() {
   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)
       setContent {
           ShimmerTheme {
               Column {
                   repeat(8) {
                       Shimmer()
                   }
               }
           }
       }
   }
}
```

> NOTE: `ShimmerTheme` is created by Android Studio. If you gave your app another name, it will appear as `YourAppNameTheme`

Inside the `ShimmerTheme` we created a `column` and repeated the `Shimmer` eight times. This will display our single shimmer grid items eight times.

After the data is fetched successfully, make sure you stop the shimmer effect. This will allow the data to be displayed on the screen.

### Conclusion
Creating a shimmer effect in Jetpack Compose is easy. You can create a shimmer effect of your own design, colors, and delay time to make your app more appealing to users. 

Happy Composing!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
