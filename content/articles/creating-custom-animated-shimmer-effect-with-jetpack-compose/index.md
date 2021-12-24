The shimmer effect gives an app a wonderful look at the desired parts. It is used as a placeholder when the contents of an app are loading. This content could be from the internet or from phone internal storage. When the data is fetched, the shimmer stops, and the data is displayed.

In this tutorial, we will create an animated shimmer effect in Jetpack Compose

### Prerequisites
To follow along with this tutorial, the reader should:
- Have installed [Android Studio Arctic Fox](https://developer.android.com/studio#downloads) and know how to create Compose projects
- Have an understanding of [Kotlin](https://developer.android.com/kotlin) Programming Language.
- Have an understanding and experience of building apps with [Jetpack Compose](https://developer.android.com/jetpack/compose).

### Goals
By the end of this tutorial, the reader will be able to:
- Create Shimmer Effect with Jetpack Compose
- Create Shimmer grid items
- Customize Shimmer's time, color, and animating it.

### Terminologies
In this tutorial, you will encounter the following Compose terminologies:
- `Modifier` - It is a property that is used to change components appearance
- `Composables` - Functions that programmatically define an app's UI by describing how it should appear
- `Spacer` - It is a component that displays an empty space between objects on the UI
- `Row` - In compose, a `row` aligns items horizontally
- `Column` - Aligns items vertically
- `Easing` - Easing is a way to adjust an animation’s fraction.

Let's get started :)

### Step 1. Creating a new Compose Project
To create a new Compose project, launch Android studio and select `New Project` then `Compose Activity`. Name it `ShimmerDemo` and click on finish to build the project. Wait till the building is finished.

![Create Project](/engineering-education/creating-custom-animated-shimmer-effect-with-jetpack-compose/create-project-step-one.png)

![Create Project](/engineering-education/creating-custom-animated-shimmer-effect-with-jetpack-compose/create-project-step-two.png)

### Step 2. Creating a new Kotlin file and naming it to `Shimmer`
Right-click on the app's package folder and create a new Kotlin file. Name this file `Shimmer` or any other name of your choice.

In this file, we will create a composable function that will define how the Shimmer will appear. 
Inside the function, we declare a list of colors. These colors are going to be used for our brush tool.
The colors are arranged in such a way the lighter color is at the center. This is for giving some visual appeal.

In this tutorial, we will use grey color but for your project, you can use colors of your choice. 

The composable `LoadingShimmerEffect()` function will appear as follows:

```kotlin
@Composable
fun LoadingShimmerEffect(){

   //These colors will be used on the brush and the lightest color should be in the middle
   val gradient = listOf(
       Color.LightGray.copy(alpha = 0.9f),//darker grey (90% opacity)
       Color.LightGray.copy(alpha = 0.3f),//lighter grey (30% opacity)
       Color.LightGray.copy(alpha = 0.9f)
   )
   
   val transition = rememberInfiniteTransition() // animate infinite times

   val translateAnimation = transition.animateFloat( //animate the transion
       initialValue = 0f,
       targetValue = 1000f,
       animationSpec = infiniteRepeatable(
           animation = tween(
               durationMillis = 1000, // duration for the animation
               easing = FastOutLinearInEasing,
           )
       )
   )
   val brush = linearGradient(
       colors = gradient,
       start = Offset(200f, 200f),
       end = Offset(x = translateAnimation.value,
       y =translateAnimation.value)
   )
   ShimmerGridItem(brush = brush)
}
```

The `rememberInfiniteTransition()` is a composable function that animate the shimmer for infinite times. The `translateAnimation` will animate the shimmer with the values provided.

 It takes in `initialValue`,`targetValue` and `animationSpec` parameters. The animation will run from `initialValue` to `tagetValue` and repeat. During the animation, if `initialValue` changes, the animation will restart with new a new value. This also applies when the `targetValue` changes. The animation thus will have no consistency.

You can customize the delay time for your shimmer effect using `durationMillis`. In our case, we specified the value to `1000 milliseconds`. That is equal to 1 second.

For the animation specifications ie, `animationSpec` you can use any animation of your choice. You can specify the data type to be animated, and the animation configuration. 
For `easing`, you can choose any type you wish to apply in your application. To expand more of this, read on [Jetpack Compose Animations](https://developer.android.com/jetpack/compose/animation).

### Step 3: Creating Shimmer Grid Items

Start by creating a `Composable` function and name it `ShimmerGridItem()`.
This function will define how our single shimmer item will appear on the screen. We are going to create a single row containing several shapes. We'll then use these shapes for our shimmer effect.

The code will be as follows:

```kotlin
@Composable
fun ShimmerGridItem(brush: Brush) {
   Row( modifier = Modifier
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

           Spacer(modifier = Modifier.height(10.dp))//creates an empty space between
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

In the above function, we have just created a single row containing all the items we needed. These items are a shape to represent an image placeholder and three more rounded shapes to act as text placeholders.

> Make sure you call the `ShimmerGridItem()` function inside the `LoadingShimmerEffect()` function. 

Upon preview, the row we just created will appear as follows:

![Row](/engineering-education/creating-custom-animated-shimmer-effect-with-jetpack-compose/shimmer-row.png)

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

> NOTE: All the above functions are in the same kotlin file we created. ie. `Shimmer.kt` file

`@Preview` feature is offered by the android studio to offer composable previews. Setting it to true will make the composable function be seen on the design screen. 

That's not all. For you to render the preview on android studio, add the following dependency on `build.gradle(:app)`

```gradle
implementation "androidx.compose.ui:ui-tooling:1.0.5"
```

Sync your project Gradle files and wait for the build to finish. You will be able to see a preview of your design on the design screen. This offers interactiveness of you and the app you are developing. 

This interactive mode has some limitations though. Some of them are:
- There is neither network nor files access.
- Not all `Context` APIs are available.

### Step 4: MainActivity.kt
To run our app on a physical device, make sure you add the following on `MainActivity.kt`.

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

>NOTE: ShimmerTheme is created by android studio. If you gave your app another name, it will appear as `YourclassNameTheme`

Inside the `ShimmerTheme` we created a `column` and repeated the `Shimmer` eight times. This will display our single shimmer grid items eight times.

After the data is fetched succesfully, make sure you stop the shimmer effect. This will allow the data that was being loaded to be displayed on the screen. 

### Conclusion
Creating a shimmer effect in Jetpack Compose is easy. You can create a shimmer effect of your own design, colors, and delay time. Make your app more appealing to users. Continue exploring the new features of Compose.

Keep Composing :)
