---
layout: engineering-education
status: publish
published: true
url: /animations-in-jetpack-compose/
title: Animations in Jetpack Compose
description: This article will cover how to create and customize animations in Jetpack Compose.
author: jane-njoki
date: 2021-12-23T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/animations-in-jetpack-compose/hero.png
    alt: Animations in Jetpack Compose Hero Image
---
Animations are a way to create a visual effect that is not immediately apparent. Animations make your app feel more alive and interactive.
<!--more-->
Jetpack Compose has a set of flexible and dynamic Interfaces (APIs) that make it simple to add motions in your app's UI thus greatly improving the user experience (UX).

In this tutorial, we will learn how to create simple animations and customize them using Jetpack Compose.

### Prerequisites
To follow along with this tutorial, you will need to:
- Make sure you have the most recent version of [Android Studio](https://developer.android.com/studio) installed on your computer.
- Be familiar with the basic concepts of[Jetpack Compose](https://developer.android.com/jetpack/compose). If you aren't conversant with Compose yet, you can go through [this tutorial on Section](/engineering-education/getting-started-with-jetpack-compose-in-android/).

### Types of animations
Animations in Compose are categorized into two main groups:

#### 1. High level animations
These animations comprise of the most common APIs that are used in the majority of apps. They are designed to abide with the [Android Design Guidelines](https://developer.android.com/design/) and [Material Design Motion](https://material.io/design/motion/).

High level animations are further divided into two groups:

1. **Content change in layouts**: These are applied when you want to animate appearance/disappearance or change content in a layout. They include:
    - AnimationVisibility
    - AnimatedContent
    - Crossfade

2. **State-based animations**: These animations lay their focus on the composition and recomposition of the UI. They use states as the motion determinant. They include:
    - Transition animation such as `rememberInfiniteTransition`
    - `animate<type>AsState`. The `<type>` can take values such as Color, Float, Int, Offset, Size, Value etc based on your use case.

We'll discuss these with examples later in this tutorial.

#### 2. Low level animations

These are the bedrock APIs on which high level APIs are built. 

Let's have a look at layout changes:

#### Animated visibility

```kotlin
@ExperimentalAnimationApi
@Composable
fun AnimVisibility() {
    var isVisible by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        AnimatedVisibility(visible = isVisible) {
            Text(text = "Animating Text")
        }
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = {
            isVisible = !isVisible
        }) {
            Text(text = "Animate")
        }
    }
}
```

In this example, we are animating the visibility of a Text component.

> Note: We are using the `AnimatedVisibility` API which is experimental at the time of writing this tutorial. For this reason, we must annotate the composable with the `@ExperimentalAnimationApi` annotation.

By default, the text animates vertically from the top of its container to the bottom.

### Customizing Animations
Customizing animations refers to the ability to apply certain properties that are not applied to the animation by default. You can use inbuilt classes or create your own custom classes with the desired behavior.

#### Customizing Animated visibility
The `AnimatedVisibility` composable can be customized by providing properties available in the AnimatedVisibility API. These properties include:

- `Visible` - a boolean value that determines whether the content is visible or not.
- `Enter` - an animation that is played when the composable is first shown.
- `Exit` - an nimation that is played when the composable is hidden.
- `Modifier` - modification properties that are applied to the animated composable(s).

Code example:

```kotlin
@ExperimentalAnimationApi
@Composable
fun AnimVisibility() {
    var isVisible by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        AnimatedVisibility(
            visible = isVisible,
            enter = fadeIn(
                // customize with tween AnimationSpec
                animationSpec = tween(
                    durationMillis = 1000,
                    delayMillis = 100,
                    easing = LinearOutSlowInEasing
                )
            ),
            // you can also add animationSpec in fadeOut if need be.
            exit = fadeOut() + shrinkHorizontally(),

            ) {
            Text(text = "Animating Text")
        }
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = {
            isVisible = !isVisible
        }) {
            Text(text = "Animate")
        }
    }
}
```

Here, we are using the `fadeIn` and `fadeOut` animation specs to animate the visibility of the text.

**Tween** is a predefined animation spec that can be used to specify the `delay`, `duration` and the `easing` of the animations. Easing refers to the acceleration of the animation during the start-end interoperation.

Other than tween, we can also use: 
- spring - to create a spring/bouncy animation.
- keyframes - to create a position based animation.
- snap
- repeatable
- infiniteRepeatable - to create an infinite looping animation.

We'll apply and explore these in the state-based animations section.

#### AnimatedContent
This is an extension function of the `Transition` class usually used together with `AnimatedVisibility`. It is used to animate the content of a composable as shown below:

```kotlin
@ExperimentalAnimationApi
@ExperimentalMaterialApi // For material components such as Card.
@Composable
fun AnimContent() {
    var itemExpanded by remember { mutableStateOf(false) }
    val contentTransition = updateTransition(itemExpanded, label = "Expand")

    Card(
        modifier = Modifier.padding(6.dp),
        shape = RoundedCornerShape(12.dp),
        elevation = 4.dp,
        onClick = { itemExpanded = !itemExpanded }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(text = "Hi, Compose!")
            // Add Animated visibility
            contentTransition.AnimatedVisibility(
                visible = { isVisible -> isVisible }
            ) {
                Text(text = "What a beautiful animation!")
            }
            // Add Animated content
            contentTransition.AnimatedContent { targetState ->
                if (targetState) {
                    Text(text = "Expanded")
                } else {
                    Text(text = "Click to expand")
                }
            }
        }
    }
}
```

>💡 **Tip**: We can apply more than one animation to the same composable.

#### Crossfade
Crossfade works by accepting a target and whenever that target changes, it animates the transition between the old and new state.

```kotlin
Crossfade(targetState = myTarget){ myTarget ->
    when(myTarget){
        MyTarget.First -> {
            // render first state
        }
        MyTarget.Second -> {
            // render second state
        }
        ...
    }
}
```

The `"myTarget"` parameter is the state passed to the composable. The best way to define different target states by using `enum` class which makes it easy to switch between them using the `when` expression.

### State-based animations
These are also called `animate as state` animations since they return a state object whose value is changed continuously until the animation is finished. To add on what we mentioned earlier, let's look at the following example that uses `animateDpAsState`.

In this example, we will animate the position of a Box composable using its `xOffSet`. `xOffset` refers to how far the component is placed from the origin point along the x-axis.

The value of xOffset will be determined by the Box's current state, thus we need to create an enum class to define the different possible states.

```kotlin
private enum class MyBoxState { START, END }
```

Initially, we will set the state to `START`.

```kotlin
var myBoxState by remember { mutableStateOf(MyBoxState.START) }
// swap the target value based on the current state
val xOffset by animateDpAsState(
    targetValue = if (myBoxState == MyBoxState.START) 300.dp else 0.dp
)
```

We therefore change the state when the the button is clicked. This will initiate an [intelligent recomposition](https://developer.android.com/jetpack/compose/mental-model#recomposition) of the affected composables.

```kotlin
myBoxState =
    when (myBoxState) {
        MyBoxState.START -> MyBoxState.END
        else -> MyBoxState.START
    }
```

Below is the full code example:

```kotlin
private enum class MyBoxState { START, END }

@Composable
fun AnimMyBox() {
    var myBoxState by remember { mutableStateOf(MyBoxState.START) }

    val xOffset by animateDpAsState(
        targetValue = if (myBoxState == MyBoxState.START) 300.dp else 0.dp
    )

    Column() {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(fraction = 0.1F)

        ) {
            Box(
                modifier = Modifier
                    .height(50.dp)
                    .absoluteOffset(xOffset)
                    .background(Color.DarkGray)
            ) {
                Text(text = "My Box")
            }
        }

        Row(
            modifier = Modifier.fillMaxSize(fraction = 1F),
            horizontalArrangement = Arrangement.Center
        ) {
            Button(onClick = {
                myBoxState =
                    when (myBoxState) {
                        MyBoxState.START -> MyBoxState.END
                        else -> MyBoxState.START
                    }
            }) {
                Text(text = "Animate")
            }
        }
    }
}
```

Just like in the `AnimatedVisibility`, we can customize this further by providing the animationSpec. Let's use `spring` for example.

```kotlin
 val xOffset by animateDpAsState(
        targetValue = if (myBoxState == MyBoxState.START) 0.dp else 300.dp,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessMedium
        )
    )
```

Damping ratio is the ratio of the oscillation damping to the oscillation period. The damping ratio can be specified as a `High`, `Medium`, `Low` bouncy.

### Conclusion
In this tutorial, we have covered the fundamental concepts of animations in Jetpack Compose and how we can customize animations. Compose is still young and evolving. Keep learning to stay up to date with new features and API improvements.

Happy Composing!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
